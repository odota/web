import { readFileSync } from 'node:fs';
import module$1, { isBuiltin } from 'node:module';
import { pathToFileURL } from 'node:url';
import { EvaluatedModules, ModuleRunner } from 'vite/module-runner';
import { e as environments, b as VitestTransport } from './index.Bi0NXYPf.js';
import { r as resolve } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { b as serializeValue, c as createStackString, p as parseStacktrace } from './source-map.DakdQc29.js';
import { w } from './tinyrainbow.Do8I1XRG.js';
import { Traces } from '../traces.js';
import { o as onCancel, V as VitestEvaluatedModules, a as rpcDone, c as createRuntimeRpc } from './rpc.Uhkwr2NM.js';
import { s as setupInspect } from './inspector.CvyFGlXm.js';
import { E as EnvironmentTeardownError } from './utils.DYj33du9.js';

function isBuiltinEnvironment(env) {
	return env in environments;
}
const isWindows = process.platform === "win32";
const _loaders = /* @__PURE__ */ new Map();
function createEnvironmentLoader(root, rpc) {
	const cachedLoader = _loaders.get(root);
	if (!cachedLoader || cachedLoader.isClosed()) {
		_loaders.delete(root);
		const evaluatedModules = new EvaluatedModules();
		const moduleRunner = new ModuleRunner({
			hmr: false,
			sourcemapInterceptor: "prepareStackTrace",
			transport: new VitestTransport({
				async fetchModule(id, importer, options) {
					const result = await rpc.fetch(id, importer, "__vitest__", options);
					if ("cached" in result) return {
						code: readFileSync(result.tmp, "utf-8"),
						...result
					};
					if (isWindows && "externalize" in result)
 // TODO: vitest returns paths for external modules, but Vite returns file://
					// https://github.com/vitejs/vite/pull/20449
					result.externalize = isBuiltin(id) || /^(?:node:|data:|http:|https:|file:)/.test(id) ? result.externalize : pathToFileURL(result.externalize).toString();
					return result;
				},
				async resolveId(id, importer) {
					return rpc.resolve(id, importer, "__vitest__");
				}
			}, evaluatedModules, /* @__PURE__ */ new WeakMap())
		});
		_loaders.set(root, moduleRunner);
	}
	return _loaders.get(root);
}
async function loadNativeEnvironment(name, root, traces) {
	const packageId = name[0] === "." || name[0] === "/" ? pathToFileURL(resolve(root, name)).toString() : import.meta.resolve(`vitest-environment-${name}`, pathToFileURL(root).toString());
	return resolveEnvironmentFromModule(name, packageId, await traces.$("vitest.runtime.environment.import", () => import(packageId)));
}
function resolveEnvironmentFromModule(name, packageId, pkg) {
	if (!pkg || !pkg.default || typeof pkg.default !== "object") throw new TypeError(`Environment "${name}" is not a valid environment. Path "${packageId}" should export default object with a "setup" or/and "setupVM" method.`);
	const environment = pkg.default;
	if (environment.transformMode != null && environment.transformMode !== "web" && environment.transformMode !== "ssr") throw new TypeError(`Environment "${name}" is not a valid environment. Path "${packageId}" should export default object with a "transformMode" method equal to "ssr" or "web", received "${environment.transformMode}".`);
	if (environment.transformMode) {
		console.warn(`The Vitest environment ${environment.name} defines the "transformMode". This options was deprecated in Vitest 4 and will be removed in the next major version. Please, use "viteEnvironment" instead.`);
		// keep for backwards compat
		environment.viteEnvironment ??= environment.transformMode === "ssr" ? "ssr" : "client";
	}
	return environment;
}
async function loadEnvironment(name, root, rpc, traces, viteModuleRunner) {
	if (isBuiltinEnvironment(name)) return { environment: environments[name] };
	if (!viteModuleRunner) return { environment: await loadNativeEnvironment(name, root, traces) };
	const loader = createEnvironmentLoader(root, rpc);
	const packageId = name[0] === "." || name[0] === "/" ? resolve(root, name) : (await traces.$("vitest.runtime.environment.resolve", () => rpc.resolve(`vitest-environment-${name}`, void 0, "__vitest__")))?.id ?? resolve(root, name);
	return {
		environment: resolveEnvironmentFromModule(name, packageId, await traces.$("vitest.runtime.environment.import", () => loader.import(packageId))),
		loader
	};
}

const cleanupListeners = /* @__PURE__ */ new Set();
const moduleRunnerListeners = /* @__PURE__ */ new Set();
function onCleanup(cb) {
	cleanupListeners.add(cb);
}
async function cleanup() {
	await Promise.all(Array.from(cleanupListeners, (l) => l()));
}
function onModuleRunner(cb) {
	moduleRunnerListeners.add(cb);
}
function emitModuleRunner(moduleRunner) {
	moduleRunnerListeners.forEach((l) => l(moduleRunner));
}

// Store globals in case tests overwrite them
const processListeners = process.listeners.bind(process);
const processOn = process.on.bind(process);
const processOff = process.off.bind(process);
const dispose = [];
function listenForErrors(state) {
	dispose.forEach((fn) => fn());
	dispose.length = 0;
	function catchError(err, type, event) {
		const worker = state();
		// if there is another listener, assume that it's handled by user code
		// one is Vitest's own listener
		if (processListeners(event).length > 1) return;
		const error = serializeValue(err);
		if (typeof error === "object" && error != null) {
			error.VITEST_TEST_NAME = worker.current?.type === "test" ? worker.current.name : void 0;
			if (worker.filepath) error.VITEST_TEST_PATH = worker.filepath;
		}
		state().rpc.onUnhandledError(error, type);
	}
	const uncaughtException = (e) => catchError(e, "Uncaught Exception", "uncaughtException");
	const unhandledRejection = (e) => catchError(e, "Unhandled Rejection", "unhandledRejection");
	processOn("uncaughtException", uncaughtException);
	processOn("unhandledRejection", unhandledRejection);
	dispose.push(() => {
		processOff("uncaughtException", uncaughtException);
		processOff("unhandledRejection", unhandledRejection);
	});
}

class GetterTracker {
	static EXPORTS_MAX_INVOCATIONS = 1e6;
	invocations = /* @__PURE__ */ new Map();
	excessiveInvocations = /* @__PURE__ */ new Map();
	createTracker(moduleId, defineExport) {
		return (name, getter) => {
			const key = `${moduleId}:${name}`;
			defineExport(name, () => {
				const count = (this.invocations.get(key) || 0) + 1;
				this.invocations.set(key, count);
				if (count > GetterTracker.EXPORTS_MAX_INVOCATIONS && !this.excessiveInvocations.has(key)) this.excessiveInvocations.set(key, {
					moduleId,
					exportName: name
				});
				return getter();
			});
		};
	}
	resetInvocations() {
		this.invocations.clear();
		this.excessiveInvocations.clear();
	}
	getExcessiveInvocations() {
		return [...this.excessiveInvocations.values()];
	}
}

const resolvingModules = /* @__PURE__ */ new Set();
async function execute(method, ctx, worker, traces) {
	const prepareStart = performance.now();
	const cleanups = [setupInspect(ctx)];
	// RPC is used to communicate between worker (be it a thread worker or child process or a custom implementation) and the main thread
	const rpc = ctx.rpc;
	try {
		// do not close the RPC channel so that we can get the error messages sent to the main thread
		cleanups.push(async () => {
			await Promise.all(rpc.$rejectPendingCalls(({ method, reject }) => {
				reject(new EnvironmentTeardownError(`[vitest-worker]: Closing rpc while "${method}" was pending`));
			}));
		});
		const state = {
			ctx,
			// here we create a new one, workers can reassign this if they need to keep it non-isolated
			evaluatedModules: new VitestEvaluatedModules(),
			resolvingModules,
			moduleExecutionInfo: /* @__PURE__ */ new Map(),
			dependencies: ctx.config.experimental.recordDependencies ? /* @__PURE__ */ new Set() : void 0,
			config: ctx.config,
			// this is set later by vm or base
			environment: null,
			durations: {
				environment: 0,
				prepare: prepareStart,
				fetch: 0
			},
			rpc,
			onCancel,
			onCleanup: onCleanup,
			providedContext: ctx.providedContext,
			onFilterStackTrace(stack) {
				return createStackString(parseStacktrace(stack));
			},
			metaEnv: ctx.metaEnv,
			getterTracker: ctx.config.benchmark.enabled && !ctx.config.benchmark.suppressExportGetterWarnings ? new GetterTracker() : void 0
		};
		const methodName = method === "collect" ? "collectTests" : "runTests";
		if (!worker[methodName] || typeof worker[methodName] !== "function") throw new TypeError(`Test worker should expose "runTests" method. Received "${typeof worker.runTests}".`);
		await worker[methodName](state, traces);
	} finally {
		await rpcDone().catch(() => {});
		await Promise.all(cleanups.map((fn) => fn())).catch(() => {});
	}
}
function run(ctx, worker, traces) {
	return execute("run", ctx, worker, traces);
}
function collect(ctx, worker, traces) {
	return execute("collect", ctx, worker, traces);
}
async function teardown() {
	await cleanup();
}

// default import: `flushCompileCache` only exists since Node 22.10, a named
// import would fail to link on older versions
function createImportMetaEnvProxy() {
	const booleanKeys = [
		"DEV",
		"PROD",
		"SSR"
	];
	return new Proxy(process.env, {
		get(_, key) {
			if (typeof key !== "string") return;
			if (booleanKeys.includes(key)) return !!process.env[key];
			return process.env[key];
		},
		set(_, key, value) {
			if (typeof key !== "string") return true;
			if (booleanKeys.includes(key)) process.env[key] = value ? "1" : "";
			else process.env[key] = value;
			return true;
		}
	});
}
const importMetaEnvProxy = createImportMetaEnvProxy();
const __vitest_worker_response__ = true;
const memoryUsage = process.memoryUsage.bind(process);
let reportMemory = false;
const streams = [{ write: process.stdout.write.bind(process.stdout) }, { write: process.stderr.write.bind(process.stderr) }];
// In worker threads stdio is proxied to the parent over a MessagePort with a
// backpressure protocol: a chunk stays buffered inside the worker until the
// parent acks the previous one. The pool starts `runner.stop()` as soon as it
// receives `testfileFinished`, and `thread.terminate()` halts the worker before
// buffered chunks are ever posted, losing output. An empty write's callback
// only fires after every previously buffered chunk has been acked, so awaiting
// it before signaling completion guarantees the output reached the parent.
// A cheap no-op for forks, where stdio goes through OS pipes.
function flushStdio() {
	const flush = (stream) => new Promise((resolve) => {
		try {
			stream.write("", () => resolve(void 0));
		} catch {
			resolve(void 0);
		}
	});
	return Promise.all(streams.map((stream) => flush(stream)));
}
let traces;
/** @experimental */
function init(worker) {
	let runPromise;
	let isRunning = false;
	let workerTeardown;
	let setupContext;
	let poolId;
	worker.on(onMessage);
	if (worker.onModuleRunner) onModuleRunner(worker.onModuleRunner);
	function send(response) {
		worker.post(worker.serialize ? worker.serialize(response) : response);
	}
	async function onMessage(rawMessage) {
		const message = worker.deserialize ? worker.deserialize(rawMessage) : rawMessage;
		if (message?.__vitest_worker_request__ !== true) return;
		switch (message.type) {
			case "start": {
				process.env.VITEST_POOL_ID = String(message.poolId);
				process.env.VITEST_WORKER_ID = String(message.workerId);
				reportMemory = message.options.reportMemory;
				poolId = message.poolId;
				if (message.context.config.disableColors) w();
				traces ??= await new Traces({
					enabled: message.traces.enabled,
					sdkPath: message.traces.sdkPath
				}).waitInit();
				const { environment, config, pool } = message.context;
				const context = traces.getContextFromCarrier(message.traces.otelCarrier);
				// record telemetry as part of "start"
				traces.recordInitSpan(context);
				try {
					setupContext = {
						environment,
						config,
						pool,
						rpc: createRuntimeRpc(worker),
						metaEnv: importMetaEnvProxy,
						projectName: config.name || "",
						traces
					};
					workerTeardown = await traces.$("vitest.runtime.setup", { context }, () => worker.setup?.(setupContext));
					send({
						type: "started",
						__vitest_worker_response__
					});
				} catch (error) {
					send({
						type: "started",
						__vitest_worker_response__,
						error: serializeValue(error)
					});
				}
				break;
			}
			case "run":
				// Prevent concurrent execution if worker is already running
				if (isRunning) {
					send({
						type: "testfileFinished",
						__vitest_worker_response__,
						error: serializeValue(/* @__PURE__ */ new Error("[vitest-worker]: Worker is already running tests"))
					});
					return;
				}
				try {
					process.env.VITEST_WORKER_ID = String(message.context.workerId);
				} catch (error) {
					return send({
						type: "testfileFinished",
						__vitest_worker_response__,
						error: serializeValue(error),
						usedMemory: reportMemory ? memoryUsage().heapUsed : void 0
					});
				}
				isRunning = true;
				try {
					const tracesContext = traces.getContextFromCarrier(message.otelCarrier);
					runPromise = traces.$("vitest.runtime.run", {
						context: tracesContext,
						attributes: {
							"vitest.worker.specifications": traces.isEnabled() ? getFilesWithLocations(message.context.files) : [],
							"vitest.worker.id": message.context.workerId
						}
					}, () => run({
						...setupContext,
						...message.context,
						concurrencyId: poolId
					}, worker, traces).catch((error) => serializeValue(error)));
					const error = await runPromise;
					await flushStdio();
					send({
						type: "testfileFinished",
						__vitest_worker_response__,
						error,
						usedMemory: reportMemory ? memoryUsage().heapUsed : void 0
					});
				} finally {
					runPromise = void 0;
					isRunning = false;
				}
				break;
			case "collect":
				// Prevent concurrent execution if worker is already running
				if (isRunning) {
					send({
						type: "testfileFinished",
						__vitest_worker_response__,
						error: serializeValue(/* @__PURE__ */ new Error("[vitest-worker]: Worker is already running tests"))
					});
					return;
				}
				try {
					process.env.VITEST_WORKER_ID = String(message.context.workerId);
				} catch (error) {
					return send({
						type: "testfileFinished",
						__vitest_worker_response__,
						error: serializeValue(error),
						usedMemory: reportMemory ? memoryUsage().heapUsed : void 0
					});
				}
				isRunning = true;
				try {
					const tracesContext = traces.getContextFromCarrier(message.otelCarrier);
					runPromise = traces.$("vitest.runtime.collect", {
						context: tracesContext,
						attributes: {
							"vitest.worker.specifications": traces.isEnabled() ? getFilesWithLocations(message.context.files) : [],
							"vitest.worker.id": message.context.workerId
						}
					}, () => collect({
						...setupContext,
						...message.context,
						concurrencyId: poolId
					}, worker, traces).catch((error) => serializeValue(error)));
					const error = await runPromise;
					await flushStdio();
					send({
						type: "testfileFinished",
						__vitest_worker_response__,
						error,
						usedMemory: reportMemory ? memoryUsage().heapUsed : void 0
					});
				} finally {
					runPromise = void 0;
					isRunning = false;
				}
				break;
			case "stop": {
				await runPromise;
				// Persist this worker's compile cache before the parent tears the
				// worker down — forks are SIGTERM'd and never reach Node's exit-time
				// flush, so without this the cache stays write-only for them. Runs
				// even when teardown throws (the compiled modules are still worth
				// persisting). A no-op when the cache is disabled or was fully loaded
				// from disk, and cheap (~tens of ms) otherwise, so every worker can
				// afford it.
				const persistCompileCache = () => {
					try {
						module$1.flushCompileCache?.();
					} catch {}
				};
				try {
					const context = traces.getContextFromCarrier(message.otelCarrier);
					const error = await traces.$("vitest.runtime.teardown", { context }, async () => {
						const error = await teardown().catch((error) => serializeValue(error));
						await workerTeardown?.();
						return error;
					});
					await traces.finish();
					persistCompileCache();
					await flushStdio();
					send({
						type: "stopped",
						error,
						__vitest_worker_response__
					});
				} catch (error) {
					persistCompileCache();
					await flushStdio();
					send({
						type: "stopped",
						error: serializeValue(error),
						__vitest_worker_response__
					});
				}
				worker.teardown?.();
				break;
			}
		}
	}
}
function getFilesWithLocations(files) {
	return files.flatMap((file) => {
		if (!file.testLocations) return file.filepath;
		return file.testLocations.map((location) => {
			return `${file}:${location}`;
		});
	});
}

export { listenForErrors as a, emitModuleRunner as e, init as i, loadEnvironment as l };
