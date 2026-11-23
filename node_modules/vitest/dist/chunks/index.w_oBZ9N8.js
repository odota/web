import * as chai from 'chai';
import { createHook } from 'node:async_hooks';
import { t as takeCoverageInsideWorker } from './coverage.9iqXE2gN.js';
import { r as rpc } from './rpc.Uhkwr2NM.js';
import { l as loadDiffConfig, a as loadSnapshotSerializers } from './setup-common.CqAQCXzx.js';
import { g as getWorkerState } from './utils.DYj33du9.js';
import { T as TestRunner } from './index.CZzC1gGg.js';

function setupChaiConfig(config) {
	Object.assign(chai.config, config);
}

async function resolveSnapshotEnvironment(config, moduleRunner) {
	if (!config.snapshotEnvironment) {
		const { VitestNodeSnapshotEnvironment } = await import('./node.B9mkVmLH.js');
		return new VitestNodeSnapshotEnvironment();
	}
	const mod = await moduleRunner.import(config.snapshotEnvironment);
	if (typeof mod.default !== "object" || !mod.default) throw new Error("Snapshot environment module must have a default export object with a shape of `SnapshotEnvironment`");
	return mod.default;
}

const IGNORED_TYPES = /* @__PURE__ */ new Set([
	"DNSCHANNEL",
	"ELDHISTOGRAM",
	"PerformanceObserver",
	"RANDOMBYTESREQUEST",
	"SIGNREQUEST",
	"STREAM_END_OF_STREAM",
	"TCPWRAP",
	"TIMERWRAP",
	"TLSWRAP",
	"ZLIB"
]);
const STDIO_TYPES = /* @__PURE__ */ new Set(["PIPEWRAP", "TTYWRAP"]);
function detectAsyncLeaks(testFile, projectName) {
	const resources = /* @__PURE__ */ new Map();
	const hook = createHook({
		init(asyncId, type, triggerAsyncId, resource) {
			if (IGNORED_TYPES.has(type)) return;
			let stack = "";
			const limit = Error.stackTraceLimit;
			// VitestModuleEvaluator's async wrapper of node:vm causes out-of-bound stack traces, simply skip it.
			// Crash fixed in https://github.com/vitejs/vite/pull/21585
			try {
				Error.stackTraceLimit = 100;
				stack = (/* @__PURE__ */ new Error("VITEST_DETECT_ASYNC_LEAKS")).stack || "";
			} catch {
				return;
			} finally {
				Error.stackTraceLimit = limit;
			}
			// a builtin loaded on first use can create pending promises at the module level
			if (stack.includes("node:internal/bootstrap/realm")) return;
			if (!stack.includes(testFile)) {
				const trigger = resources.get(triggerAsyncId);
				if (!trigger) return;
				stack = trigger.stack;
			}
			let isActive = isActiveDefault;
			if ("hasRef" in resource) {
				const ref = new WeakRef(resource);
				isActive = () => ref.deref()?.hasRef() ?? false;
			}
			resources.set(asyncId, {
				type,
				stack,
				projectName,
				filename: testFile,
				isActive,
				handle: STDIO_TYPES.has(type) ? new WeakRef(resource) : void 0
			});
		},
		destroy(asyncId) {
			if (resources.get(asyncId)?.type !== "PROMISE") resources.delete(asyncId);
		},
		promiseResolve(asyncId) {
			resources.delete(asyncId);
		}
	});
	hook.enable();
	return async function collect() {
		await new Promise((resolve) => setImmediate(resolve));
		hook.disable();
		const leaks = [];
		for (const resource of resources.values()) if (resource.isActive() && !isStdioHandle(resource.handle?.deref())) leaks.push({
			stack: resource.stack,
			type: resource.type,
			filename: resource.filename,
			projectName: resource.projectName
		});
		resources.clear();
		return leaks;
	};
}
function isActiveDefault() {
	return true;
}
function isStdioHandle(handle) {
	if (!handle) return false;
	return [
		process.stdin,
		process.stdout,
		process.stderr
	].some((stream) => stream._handle === handle);
}

async function getTestRunnerConstructor(config, moduleRunner) {
	if (!config.runner) return TestRunner;
	const mod = await moduleRunner.import(config.runner);
	if (!mod.default && typeof mod.default !== "function") throw new Error(`Runner must export a default function, but got ${typeof mod.default} imported from ${config.runner}`);
	return mod.default;
}
async function resolveTestRunner(config, moduleRunner, traces) {
	const testRunner = new (await (getTestRunnerConstructor(config, moduleRunner)))(config);
	// inject private executor to every runner
	Object.defineProperty(testRunner, "moduleRunner", {
		value: moduleRunner,
		enumerable: false,
		configurable: false
	});
	if (!testRunner.config) testRunner.config = config;
	if (!testRunner.importFile) throw new Error("Runner must implement \"importFile\" method.");
	if ("__setTraces" in testRunner) testRunner.__setTraces(traces);
	const [diffOptions] = await Promise.all([loadDiffConfig(config, moduleRunner), loadSnapshotSerializers(config, moduleRunner)]);
	testRunner.config._diffOptions = diffOptions;
	// patch some methods, so custom runners don't need to call RPC
	const originalOnTaskUpdate = testRunner.onTaskUpdate;
	testRunner.onTaskUpdate = async (task, events) => {
		const p = rpc().onTaskUpdate(task, events);
		await originalOnTaskUpdate?.call(testRunner, task, events);
		return p;
	};
	// patch some methods, so custom runners don't need to call RPC
	const originalOnTestAnnotate = testRunner.onTestAnnotate;
	testRunner.onTestAnnotate = async (test, annotation) => {
		const p = rpc().onTaskArtifactRecord(test.id, {
			type: "internal:annotation",
			location: annotation.location,
			annotation
		});
		const overriddenResult = await originalOnTestAnnotate?.call(testRunner, test, annotation);
		const vitestResult = await p;
		return overriddenResult || vitestResult.annotation;
	};
	const originalOnTestArtifactRecord = testRunner.onTestArtifactRecord;
	testRunner.onTestArtifactRecord = async (test, artifact) => {
		const p = rpc().onTaskArtifactRecord(test.id, artifact);
		const overriddenResult = await originalOnTestArtifactRecord?.call(testRunner, test, artifact);
		const vitestResult = await p;
		return overriddenResult || vitestResult;
	};
	const originalOnCollectStart = testRunner.onCollectStart;
	testRunner.onCollectStart = async (file) => {
		await rpc().onQueued(file);
		await originalOnCollectStart?.call(testRunner, file);
	};
	const originalOnCollected = testRunner.onCollected;
	testRunner.onCollected = async (files) => {
		const state = getWorkerState();
		files.forEach((file) => {
			file.prepareDuration = state.durations.prepare;
			file.environmentLoad = state.durations.environment;
			// should be collected only for a single test file in a batch
			state.durations.prepare = 0;
			state.durations.environment = 0;
		});
		// Strip function conditions from retry config before sending via RPC
		// Functions cannot be cloned by structured clone algorithm
		const sanitizeRetryConditions = (task) => {
			if (task.retry && typeof task.retry === "object" && typeof task.retry.condition === "function")
 // Remove function condition - it can't be serialized
			task.retry = {
				...task.retry,
				condition: void 0
			};
			if (task.tasks) task.tasks.forEach(sanitizeRetryConditions);
		};
		files.forEach(sanitizeRetryConditions);
		rpc().onCollected(files);
		await originalOnCollected?.call(testRunner, files);
	};
	const originalOnAfterRun = testRunner.onAfterRunFiles;
	testRunner.onAfterRunFiles = async (files) => {
		const state = getWorkerState();
		const coverage = await takeCoverageInsideWorker(config.coverage, moduleRunner);
		if (coverage) rpc().onAfterSuiteRun({
			coverage,
			testFiles: files.map((file) => file.name).sort(),
			environment: state.environment.viteEnvironment || state.environment.name,
			projectName: state.ctx.projectName
		});
		await originalOnAfterRun?.call(testRunner, files);
	};
	const originalOnAfterRunTask = testRunner.onAfterRunTask;
	testRunner.onAfterRunTask = async (test) => {
		if (config.bail && test.result?.state === "fail") {
			if (1 + await rpc().getCountOfFailedTests() >= config.bail) {
				rpc().onCancel("test-failure");
				testRunner.cancel?.("test-failure");
			}
		}
		await originalOnAfterRunTask?.call(testRunner, test);
	};
	return testRunner;
}

export { resolveSnapshotEnvironment as a, detectAsyncLeaks as d, resolveTestRunner as r, setupChaiConfig as s };
