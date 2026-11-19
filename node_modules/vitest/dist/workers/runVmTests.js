import { createRequire } from 'node:module';
import { performance } from 'node:perf_hooks';
import timers from 'node:timers';
import timersPromises from 'node:timers/promises';
import util from 'node:util';
import { K as KNOWN_ASSET_TYPES } from '../chunks/pathe.M-eThtNZ.zq3TM4NT.js';
import { s as setupChaiConfig, r as resolveTestRunner, a as resolveSnapshotEnvironment, d as detectAsyncLeaks } from '../chunks/index.w_oBZ9N8.js';
import { s as startCoverageInsideWorker, a as stopCoverageInsideWorker } from '../chunks/coverage.9iqXE2gN.js';
import { i as index, g as globalExpect } from '../chunks/index.CZzC1gGg.js';
import { g as getEvaluatedImports, c as collectDependencies } from '../chunks/module-dependencies._2Eei3FO.js';
import { c as closeInspector } from '../chunks/inspector.CvyFGlXm.js';
import { s as startTests, p as publicCollect } from '../chunks/run.CjdgFZiW.js';
import { s as setupCommonEnv } from '../chunks/setup-common.CqAQCXzx.js';
import { g as getWorkerState } from '../chunks/utils.DYj33du9.js';
import 'chai';
import 'node:async_hooks';
import '../chunks/rpc.Uhkwr2NM.js';
import 'vite/module-runner';
import '../chunks/source-map.DakdQc29.js';
import '../chunks/index.D0heQG4v.js';
import '../chunks/tinyrainbow.Do8I1XRG.js';
import '../chunks/index.DmDMHCg8.js';
import '../chunks/coverage.jGCktcGP.js';
import '../chunks/spy.DDMXghXv.js';
import '../chunks/display.BlTmubjj.js';
import '../task-utils.js';
import '../chunks/plugins.DPQHVT0p.js';
import '../chunks/rawSnapshot.DqSiqIEx.js';
import '../chunks/offset.Dy-5Fdfn.js';
import 'tinybench';
import 'expect-type';
import 'node:url';
import '../path.js';
import 'node:path';

async function run(method, files, config, moduleRunner, traces, syncBuiltinESMExports) {
	const workerState = getWorkerState();
	await traces.$("vitest.runtime.global_env", () => setupCommonEnv(config));
	Object.defineProperty(globalThis, "__vitest_index__", {
		value: index,
		enumerable: false,
		configurable: true,
		writable: true
	});
	const viteEnvironment = workerState.environment.viteEnvironment || workerState.environment.name;
	globalExpect.setState({ environment: workerState.environment.name });
	if (viteEnvironment === "client") {
		const _require = createRequire(import.meta.url);
		// always mock "required" `css` files, because we cannot process them
		_require.extensions[".css"] = resolveCss;
		_require.extensions[".scss"] = resolveCss;
		_require.extensions[".sass"] = resolveCss;
		_require.extensions[".less"] = resolveCss;
		// since we are using Vite, we can assume how these will be resolved
		KNOWN_ASSET_TYPES.forEach((type) => {
			_require.extensions[`.${type}`] = resolveAsset;
		});
		process.env.SSR = "";
	} else process.env.SSR = "1";
	// @ts-expect-error not typed global for patched timers
	globalThis.__vitest_required__ = {
		util,
		timers,
		timersPromises,
		syncBuiltinESMExports
	};
	await traces.$("vitest.runtime.coverage.start", () => startCoverageInsideWorker(config.coverage, moduleRunner, { isolate: false }));
	if (config.chaiConfig) setupChaiConfig(config.chaiConfig);
	const [testRunner, snapshotEnvironment] = await Promise.all([traces.$("vitest.runtime.runner", () => resolveTestRunner(config, moduleRunner, traces)), traces.$("vitest.runtime.snapshot.environment", () => resolveSnapshotEnvironment(config, moduleRunner))]);
	config.snapshotOptions.snapshotEnvironment = snapshotEnvironment;
	// the callback captures this file's runner: unsubscribe once the run is
	// over, or every finished file's world stays reachable from the worker's
	// cancel listeners for the lifetime of the worker
	const offCancel = workerState.onCancel((reason) => {
		closeInspector(config);
		testRunner.cancel?.(reason);
	});
	// unlike other pools, the vm pool creates the environment inside the
	// prepare window; subtract it so `prepare` excludes the environment
	// load time in every pool
	workerState.durations.prepare = performance.now() - workerState.durations.prepare - workerState.durations.environment;
	const { vi } = index;
	// modules loaded before the first file are shared by every file in this worker
	const dependencies = workerState.dependencies;
	const preparedModules = new Set(dependencies);
	const getImports = getEvaluatedImports(workerState.evaluatedModules);
	try {
		await traces.$(`vitest.test.runner.${method}`, async () => {
			for (const file of files) {
				workerState.filepath = file.filepath;
				dependencies?.clear();
				if (method === "run") {
					const collectAsyncLeaks = config.detectAsyncLeaks ? detectAsyncLeaks(file.filepath, workerState.ctx.projectName) : void 0;
					await traces.$(`vitest.test.runner.${method}.module`, { attributes: { "code.file.path": file.filepath } }, () => startTests([file], testRunner));
					if (dependencies) workerState.rpc.onTestModuleDependencies(file.filepath, collectDependencies(getImports, preparedModules, dependencies));
					const leaks = await collectAsyncLeaks?.();
					if (leaks?.length) workerState.rpc.onAsyncLeaks(leaks);
				} else await traces.$(`vitest.test.runner.${method}.module`, { attributes: { "code.file.path": file.filepath } }, () => publicCollect([file], testRunner));
				// reset after tests, because user might call `vi.setConfig` in setupFile
				vi.resetConfig();
				// mocks should not affect different files
				vi.restoreAllMocks();
				moduleRunner.mocker?.reset();
				// fake timers patch the worker's `process`, which outlives this file
				vi.useRealTimers();
			}
		});
	} finally {
		offCancel();
	}
	await traces.$("vitest.runtime.coverage.stop", () => stopCoverageInsideWorker(config.coverage, moduleRunner, { isolate: false }));
}
function resolveCss(mod) {
	mod.exports = "";
}
function resolveAsset(mod, url) {
	mod.exports = url;
}

export { run };
