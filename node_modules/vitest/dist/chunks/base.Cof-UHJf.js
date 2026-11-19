import { runInThisContext } from 'node:vm';
import { s as spyModule } from './spy.DDMXghXv.js';
import { r as resolveTestRunner, a as resolveSnapshotEnvironment, d as detectAsyncLeaks, s as setupChaiConfig } from './index.w_oBZ9N8.js';
import { l as loadEnvironment, e as emitModuleRunner, a as listenForErrors } from './init.CO4AB7HZ.js';
import { n as nativeImports, g as getEvaluatedImports, c as collectDependencies } from './module-dependencies._2Eei3FO.js';
import { Traces } from '../traces.js';
import { V as VitestEvaluatedModules } from './rpc.Uhkwr2NM.js';
import { s as startVitestModuleRunner, c as createNodeImportMeta } from './index.Bi0NXYPf.js';
import { performance as performance$1 } from 'node:perf_hooks';
import { s as startCoverageInsideWorker, a as stopCoverageInsideWorker } from './coverage.9iqXE2gN.js';
import { i as index, g as globalExpect, v as vi } from './index.CZzC1gGg.js';
import { c as closeInspector } from './inspector.CvyFGlXm.js';
import { s as startTests, p as publicCollect } from './run.CjdgFZiW.js';
import { createRequire, syncBuiltinESMExports } from 'node:module';
import timers from 'node:timers';
import timersPromises from 'node:timers/promises';
import util from 'node:util';
import { K as KNOWN_ASSET_TYPES } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { s as setupCommonEnv, b as setupEnv } from './setup-common.CqAQCXzx.js';
import { g as getWorkerState, r as resetModules, p as provideWorkerState, a as getSafeWorkerState } from './utils.DYj33du9.js';

// this should only be used in Node
let globalSetup = false;
async function setupGlobalEnv(config, environment) {
	await setupCommonEnv(config);
	Object.defineProperty(globalThis, "__vitest_index__", {
		value: index,
		enumerable: false
	});
	globalExpect.setState({ environment: environment.name });
	if (globalSetup) return;
	globalSetup = true;
	if ((environment.viteEnvironment || environment.name) === "client") {
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
	if (!config.disableConsoleIntercept) await setupConsoleLogSpy();
}
function resolveCss(mod) {
	mod.exports = "";
}
function resolveAsset(mod, url) {
	mod.exports = url;
}
async function setupConsoleLogSpy() {
	const { createCustomConsole } = await import('./console.CQZ877Hi.js');
	globalThis.console = createCustomConsole();
}

// browser shouldn't call this!
async function run(method, files, config, moduleRunner, environment, traces) {
	const workerState = getWorkerState();
	const [testRunner] = await Promise.all([
		traces.$("vitest.runtime.runner", () => resolveTestRunner(config, moduleRunner, traces)),
		traces.$("vitest.runtime.global_env", () => setupGlobalEnv(config, environment)),
		traces.$("vitest.runtime.coverage.start", () => startCoverageInsideWorker(config.coverage, moduleRunner, { isolate: config.isolate })),
		traces.$("vitest.runtime.snapshot.environment", async () => {
			if (!workerState.config.snapshotOptions.snapshotEnvironment) workerState.config.snapshotOptions.snapshotEnvironment = await resolveSnapshotEnvironment(config, moduleRunner);
		})
	]);
	const offCancel = workerState.onCancel((reason) => {
		closeInspector(config);
		testRunner.cancel?.(reason);
	});
	workerState.durations.prepare = performance$1.now() - workerState.durations.prepare;
	// modules loaded before the first file are shared by every file in this worker
	const dependencies = workerState.dependencies;
	const preparedModules = new Set(dependencies);
	const getImports = config.experimental.viteModuleRunner === false ? nativeImports.getImports : getEvaluatedImports(workerState.evaluatedModules);
	try {
		await traces.$(`vitest.test.runner.${method}`, async () => {
			for (const file of files) {
				if (config.isolate) {
					moduleRunner.mocker?.reset();
					resetModules(workerState.evaluatedModules, true);
				}
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
			}
		});
	} finally {
		offCancel();
	}
	await traces.$("vitest.runtime.coverage.stop", () => stopCoverageInsideWorker(config.coverage, moduleRunner, { isolate: config.isolate }));
}

let _moduleRunner;
const evaluatedModules = new VitestEvaluatedModules();
const moduleExecutionInfo = /* @__PURE__ */ new Map();
async function startModuleRunner(options) {
	if (_moduleRunner) return _moduleRunner;
	const state = () => getSafeWorkerState() || options.state;
	process.exit = (code = process.exitCode || 0) => {
		const filepath = state().filepath;
		throw new Error(`process.exit unexpectedly called with "${code}"${filepath ? ` (test file: ${filepath})` : ""}`);
	};
	listenForErrors(state);
	if (options.state.config.experimental.viteModuleRunner === false) {
		const root = options.state.config.root;
		let mocker;
		if (options.state.config.experimental.nodeLoader !== false) {
			// this additionally imports acorn/magic-string
			const { NativeModuleMocker } = await import('./nativeModuleMocker.Dh5azSB4.js');
			mocker = new NativeModuleMocker({
				async resolveId(id, importer) {
					// TODO: use import.meta.resolve instead
					return state().rpc.resolve(id, importer, "__vitest__");
				},
				root,
				moduleDirectories: state().config.deps.moduleDirectories || ["/node_modules/"],
				traces: options.traces || new Traces({ enabled: false }),
				getCurrentTestFilepath() {
					return state().filepath;
				},
				spyModule
			});
		}
		// imported lazily (pulls in `local-pkg`) so it stays out of the default
		// worker startup graph; only the `viteModuleRunner: false` path needs it
		const { NativeModuleRunner } = await import('./nativeModuleRunner.9xPIMzi7.js').then(function (n) { return n.n; });
		_moduleRunner = new NativeModuleRunner(root, mocker);
		return _moduleRunner;
	}
	_moduleRunner = startVitestModuleRunner(options);
	return _moduleRunner;
}
let _currentEnvironment;
let _environmentModules = [];
let _environmentTime;
// the files reported by the resolve hook are added here when the module runner is disabled
let _nativeDependencies;
let _canRecordDependencies = true;
function recordNativeImport(url, parentURL) {
	const file = nativeImports.record(url, parentURL);
	if (file) _nativeDependencies?.add(file);
}
/** @experimental */
async function setupBaseEnvironment(context) {
	if (context.config.experimental.viteModuleRunner === false) {
		const { setupNodeLoaderHooks } = await import('./native.upB-V0CK.js');
		const recordDependencies = context.config.experimental.recordDependencies;
		_canRecordDependencies = await setupNodeLoaderHooks(context, recordDependencies ? recordNativeImport : void 0);
		// until the tests start, the imports belong to the environment
		_nativeDependencies = recordDependencies ? /* @__PURE__ */ new Set() : void 0;
	}
	const startTime = performance.now();
	const { environment: { name: environmentName, options: environmentOptions }, rpc, config } = context;
	setupEnv(config.env, context.metaEnv);
	const otel = context.traces;
	const { environment, loader } = await loadEnvironment(environmentName, config.root, rpc, otel, context.config.experimental.viteModuleRunner);
	_currentEnvironment = environment;
	_environmentModules = loader ? Array.from(loader.evaluatedModules.idToModuleMap.keys()) : _nativeDependencies ?? [];
	const env = await otel.$("vitest.runtime.environment.setup", { attributes: {
		"vitest.environment": environment.name,
		"vitest.environment.vite_environment": environment.viteEnvironment || environment.name
	} }, () => environment.setup(globalThis, environmentOptions || config.environmentOptions || {}));
	_environmentTime = performance.now() - startTime;
	if (config.chaiConfig) setupChaiConfig(config.chaiConfig);
	return async () => {
		await otel.$("vitest.runtime.environment.teardown", () => env.teardown(globalThis));
		await loader?.close();
	};
}
/** @experimental */
async function runBaseTests(method, state, traces) {
	const { ctx } = state;
	state.environment = _currentEnvironment;
	state.durations.environment = _environmentTime;
	// state has new context, but we want to reuse existing ones
	state.evaluatedModules = evaluatedModules;
	state.moduleExecutionInfo = moduleExecutionInfo;
	if (!_canRecordDependencies)
 // a test file without a record always runs
	state.dependencies = void 0;
	for (const id of _environmentModules) state.dependencies?.add(id);
	if (_nativeDependencies) _nativeDependencies = state.dependencies;
	provideWorkerState(globalThis, state);
	// we could load @vite/env, but it would take ~8ms, while this takes ~0,02ms
	if (state.config.serializedDefines) try {
		runInThisContext(`(() =>{\n${state.config.serializedDefines}})()`, {
			lineOffset: 1,
			filename: "virtual:load-defines.js"
		});
	} catch (error) {
		throw new Error(`Failed to load custom "defines": ${error.message}`);
	}
	ctx.files.forEach((i) => {
		const filepath = i.filepath;
		(state.evaluatedModules.fileToModulesMap.get(filepath) || []).forEach((module) => {
			state.evaluatedModules.invalidateModule(module);
		});
	});
	const moduleRunner = await startModuleRunner({
		state,
		evaluatedModules: state.evaluatedModules,
		spyModule,
		createImportMeta: createNodeImportMeta,
		traces
	});
	emitModuleRunner(moduleRunner);
	await run(method, ctx.files, ctx.config, moduleRunner, _currentEnvironment, traces);
}

export { runBaseTests as r, setupBaseEnvironment as s };
