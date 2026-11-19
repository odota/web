import fs__default from 'node:fs';
import { n as normalize, m as splitFileAndPostfix$1, j as join, o as isBareImport } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { i as isBuiltin, a as isBrowserExternal, t as toBuiltin } from './modules.BJuCwlRJ.js';
import { E as EnvironmentTeardownError, a as getSafeWorkerState } from './utils.DYj33du9.js';
import { pathToFileURL, URL as URL$1 } from 'node:url';
import { distDir } from '../path.js';
import { VitestModuleEvaluator, unwrapId } from '../module-evaluator.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { isAbsolute, resolve } from 'node:path';
import vm from 'node:vm';
import { MockerRegistry, mockObject, RedirectedModule, AutomockedModule } from '@vitest/mocker';
import { findMockRedirect } from '@vitest/mocker/redirect';
import * as viteModuleRunner from 'vite/module-runner';
import { Traces } from '../traces.js';
import { createRequire } from 'node:module';
import { Console } from 'node:console';

class BareModuleMocker {
	options;
	static pendingIds = [];
	spyModule;
	primitives;
	registries = /* @__PURE__ */ new Map();
	mockContext = { callstack: null };
	_otel;
	constructor(options) {
		this.options = options;
		this._otel = options.traces;
		this.primitives = {
			Object,
			Error,
			Function,
			RegExp,
			Symbol: globalThis.Symbol,
			Array,
			Map
		};
		if (options.spyModule) this.spyModule = options.spyModule;
	}
	get root() {
		return this.options.root;
	}
	get moduleDirectories() {
		return this.options.moduleDirectories || [];
	}
	getMockerRegistry() {
		const suite = this.getSuiteFilepath();
		if (!this.registries.has(suite)) this.registries.set(suite, new MockerRegistry());
		return this.registries.get(suite);
	}
	reset() {
		for (const registry of this.registries.values()) for (const url of registry.keys()) this.invalidateModuleById(registry.get(url).id);
		this.registries.clear();
		BareModuleMocker.pendingIds = [];
	}
	invalidateModuleById(_id) {
		// implemented by mockers that control the module runner
	}
	isModuleDirectory(path) {
		return this.moduleDirectories.some((dir) => path.includes(dir));
	}
	getSuiteFilepath() {
		return this.options.getCurrentTestFilepath() || "global";
	}
	createError(message, codeFrame) {
		const Error = this.primitives.Error;
		const error = new Error(message);
		Object.assign(error, { codeFrame });
		return error;
	}
	async resolveId(rawId, importer) {
		return this._otel.$("vitest.mocker.resolve_id", { attributes: {
			"vitest.module.raw_id": rawId,
			"vitest.module.importer": rawId
		} }, async (span) => {
			const result = await this.options.resolveId(rawId, importer);
			if (!result) {
				span.addEvent("could not resolve id, fallback to unresolved values");
				const id = normalizeModuleId(rawId);
				span.setAttributes({
					"vitest.module.id": id,
					"vitest.module.url": rawId,
					"vitest.module.external": id,
					"vitest.module.fallback": true
				});
				return {
					id,
					url: rawId,
					external: id
				};
			}
			// external is node_module or unresolved module
			// for example, some people mock "vscode" and don't have it installed
			const external = !isAbsolute(result.file) || this.isModuleDirectory(result.file) ? normalizeModuleId(rawId) : null;
			const id = normalizeModuleId(result.id);
			span.setAttributes({
				"vitest.module.id": id,
				"vitest.module.url": result.url,
				"vitest.module.external": external ?? false
			});
			return {
				...result,
				id,
				external
			};
		});
	}
	registeringMocks;
	async resolveMocks() {
		if (BareModuleMocker.pendingIds.length) {
			const pendingIds = BareModuleMocker.pendingIds;
			BareModuleMocker.pendingIds = [];
			const registration = this.registerMocks(pendingIds, this.registeringMocks).finally(() => {
				if (this.registeringMocks === registration) this.registeringMocks = void 0;
			});
			this.registeringMocks = registration;
		}
		await this.registeringMocks;
	}
	async registerMocks(pendingIds, previous) {
		await previous?.catch(() => {});
		const resolveMock = async (mock) => {
			return {
				mock,
				...await this.resolveId(mock.id, mock.importer)
			};
		};
		// group consecutive mocks of the same action type together,
		// resolve in parallel inside each group, but run groups sequentially
		// to preserve mock/unmock ordering
		const groups = groupByConsecutiveAction(pendingIds);
		for (const group of groups) {
			// apply in queue order: two mocks of the same path can resolve out of
			// order, and the last queued one must win
			const resolvedGroup = await Promise.all(group.map(resolveMock));
			for (const { mock, id, url, external } of resolvedGroup) {
				if (mock.action === "unmock") this.unmockPath(id);
				if (mock.action === "mock") this.mockPath(mock.id, id, url, external, mock.type, mock.factory);
			}
		}
	}
	// public method to avoid circular dependency
	getMockContext() {
		return this.mockContext;
	}
	// path used to store mocked dependencies
	getMockPath(dep) {
		return `mock:${dep}`;
	}
	getDependencyMock(id) {
		return this.getMockerRegistry().getById(fixLeadingSlashes(id));
	}
	getDependencyMockByUrl(url) {
		return this.getMockerRegistry().get(url);
	}
	findMockRedirect(mockPath, external, rawId) {
		return findMockRedirect(this.root, mockPath, external, rawId);
	}
	mockObject(object, mockExportsOrModuleType, moduleType) {
		let mockExports;
		if (mockExportsOrModuleType === "automock" || mockExportsOrModuleType === "autospy") {
			moduleType = mockExportsOrModuleType;
			mockExports = void 0;
		} else mockExports = mockExportsOrModuleType;
		moduleType ??= "automock";
		const createMockInstance = this.spyModule?.createMockInstance;
		if (!createMockInstance) throw this.createError("[vitest] `spyModule` is not defined. This is a Vitest error. Please open a new issue with reproduction.");
		return mockObject({
			globalConstructors: this.primitives,
			createMockInstance,
			type: moduleType
		}, object, mockExports);
	}
	unmockPath(id) {
		this.getMockerRegistry().deleteById(id);
		this.invalidateModuleById(id);
	}
	mockPath(originalId, id, url, external, mockType, factory) {
		const registry = this.getMockerRegistry();
		if (mockType === "manual") registry.register("manual", originalId, id, url, factory);
		else if (mockType === "autospy") registry.register("autospy", originalId, id, url);
		else {
			const redirect = this.findMockRedirect(id, external, originalId);
			if (redirect) registry.register("redirect", originalId, id, url, redirect);
			else registry.register("automock", originalId, id, url);
		}
		// every time the mock is registered, we remove the previous one from the cache
		this.invalidateModuleById(id);
	}
	async importActual(_rawId, _importer, _callstack) {
		throw new Error(`importActual is not implemented`);
	}
	async importMock(_rawId, _importer, _callstack) {
		throw new Error(`importMock is not implemented`);
	}
	queueMock(id, importer, factoryOrOptions) {
		const mockType = getMockType(factoryOrOptions);
		BareModuleMocker.pendingIds.push({
			action: "mock",
			id,
			importer,
			factory: typeof factoryOrOptions === "function" ? factoryOrOptions : void 0,
			type: mockType
		});
	}
	queueUnmock(id, importer) {
		BareModuleMocker.pendingIds.push({
			action: "unmock",
			id,
			importer
		});
	}
}
function getMockType(factoryOrOptions) {
	if (!factoryOrOptions) return "automock";
	if (typeof factoryOrOptions === "function") return "manual";
	return factoryOrOptions.spy ? "autospy" : "automock";
}
// unique id that is not available as "$bare_import" like "test"
// https://nodejs.org/api/modules.html#built-in-modules-with-mandatory-node-prefix
const prefixedBuiltins = /* @__PURE__ */ new Set([
	"node:sea",
	"node:sqlite",
	"node:test",
	"node:test/reporters"
]);
const isWindows$1 = process.platform === "win32";
// transform file url to id
// virtual:custom -> virtual:custom
// \0custom -> \0custom
// /root/id -> /id
// /root/id.js -> /id.js
// C:/root/id.js -> /id.js
// C:\root\id.js -> /id.js
// TODO: expose this in vite/module-runner
function normalizeModuleId(file) {
	if (prefixedBuiltins.has(file)) return file;
	// if it's not in the root, keep it as a path, not a URL
	return slash(file).replace(/^\/@fs\//, isWindows$1 ? "" : "/").replace(/^node:/, "").replace(/^\/+/, "/").replace(/^file:\//, "/");
}
const windowsSlashRE = /\\/g;
function slash(p) {
	return p.replace(windowsSlashRE, "/");
}
function groupByConsecutiveAction(mocks) {
	const groups = [];
	for (const mock of mocks) {
		const last = groups.at(-1);
		if (last?.[0].action === mock.action) last.push(mock);
		else groups.push([mock]);
	}
	return groups;
}
const multipleSlashRe = /^\/+/;
// module-runner incorrectly replaces file:///path with `///path`
function fixLeadingSlashes(id) {
	if (id.startsWith("//")) return id.replace(multipleSlashRe, "/");
	return id;
}

// copied from vite
// https://github.com/vitejs/vite/blob/4417b4f305623b2850bd6ae6553834c017694672/packages/vite/src/shared/utils.ts
// https://github.com/vitejs/vite/blob/4417b4f305623b2850bd6ae6553834c017694672/packages/vite/src/node/utils.ts
const postfixRE = /[?#].*$/;
const trailingSeparatorRE = /[?&]$/;
function cleanUrl(url) {
	return url.replace(postfixRE, "");
}
function splitFileAndPostfix(path) {
	const file = cleanUrl(path);
	return {
		file,
		postfix: path.slice(file.length)
	};
}
function injectQuery(url, queryToInject) {
	const { file, postfix } = splitFileAndPostfix(url);
	return `${file}?${queryToInject}${postfix[0] === "?" ? `&${postfix.slice(1)}` : /* hash only */ postfix}`;
}
function removeQuery(url, queryToRemove) {
	return url.replace(new RegExp(`([?&])${queryToRemove}(?:&|$)`), "$1").replace(trailingSeparatorRE, "");
}

const spyModulePath = resolve(distDir, "spy.js");
class VitestMocker extends BareModuleMocker {
	moduleRunner;
	options;
	filterPublicKeys;
	// factories that run in the current async context, the innermost is last
	factoryContexts = new AsyncLocalStorage();
	pendingFactories = /* @__PURE__ */ new Map();
	waitListeners = /* @__PURE__ */ new Set();
	constructor(moduleRunner, options) {
		super(options);
		this.moduleRunner = moduleRunner;
		this.options = options;
		const context = this.options.context;
		if (context) this.primitives = vm.runInContext("({ Object, Error, Function, RegExp, Symbol, Array, Map })", context);
		const Symbol = this.primitives.Symbol;
		this.filterPublicKeys = [
			"__esModule",
			Symbol.asyncIterator,
			Symbol.hasInstance,
			Symbol.isConcatSpreadable,
			Symbol.iterator,
			Symbol.match,
			Symbol.matchAll,
			Symbol.replace,
			Symbol.search,
			Symbol.split,
			Symbol.species,
			Symbol.toPrimitive,
			Symbol.toStringTag,
			Symbol.unscopables
		];
	}
	get evaluatedModules() {
		return this.moduleRunner.evaluatedModules;
	}
	async initializeSpyModule() {
		if (this.spyModule) return;
		this.spyModule = await this.moduleRunner.import(spyModulePath);
	}
	invalidateModuleById(id) {
		const mockId = this.getMockPath(id);
		this.pendingFactories.delete(mockId);
		const node = this.evaluatedModules.getModuleById(mockId);
		if (node) {
			this.evaluatedModules.invalidateModule(node);
			node.mockedExports = void 0;
		}
	}
	getMockContext() {
		return { callstack: (this.factoryContexts.getStore()?.findLast((context) => this.pendingFactories.has(context.mockId)))?.callstack ?? null };
	}
	/**
	* Whether the factory of this mock runs in the current async context,
	* or waits for a factory that runs in it. Such imports get the original module.
	* The callstack cannot tell it: all imports from one module share the same array.
	*/
	isResolvingMock(mockId) {
		if (!this.pendingFactories.has(mockId)) return false;
		const factories = this.currentFactories();
		return factories.includes(mockId) || this.waitsForFactories(mockId, factories);
	}
	/**
	* Whether the module is still evaluating and waits for a factory
	* that runs in the current async context.
	*/
	isWaitingForFactory(mod) {
		return !!mod.promise && !mod.evaluated && this.waitsForFactories(mod.id);
	}
	/**
	* Waits for the module evaluation. If the module starts to wait
	* for a factory that waits for it, the factory gets the partial exports.
	*/
	awaitEvaluation(mod, request) {
		if (!mod.promise || mod.evaluated) return request();
		const factories = this.currentFactories();
		if (!factories.length) return request();
		let onWait;
		const cycle = new Promise((resolve) => {
			onWait = () => {
				if (this.waitsForFactories(mod.id, factories)) resolve(mod.exports);
			};
		});
		this.waitListeners.add(onWait);
		return Promise.race([request(), cycle]).finally(() => this.waitListeners.delete(onWait));
	}
	currentFactories() {
		return (this.factoryContexts.getStore() ?? []).map((context) => context.mockId);
	}
	waitsForFactories(id, factories = this.currentFactories()) {
		const queue = [...factories];
		const visited = new Set(factories);
		// a factory that waits for the current one makes everything that waits for it wait too
		while (queue.length) {
			const waiting = this.pendingFactories.get(queue.pop())?.waiting;
			if (waiting?.has(id)) return true;
			waiting?.forEach((waiter) => {
				if (this.pendingFactories.has(waiter) && !visited.has(waiter)) {
					visited.add(waiter);
					queue.push(waiter);
				}
			});
		}
		return false;
	}
	ensureModule(id, url) {
		const node = this.evaluatedModules.ensureModule(id, url);
		// TODO
		node.meta = {
			id,
			url,
			code: "",
			file: null,
			invalidate: false
		};
		return node;
	}
	callFunctionMock(id, url, mock, callstack) {
		const node = this.ensureModule(id, url);
		if (node.exports) return Promise.resolve(node.exports);
		return this.resolveMockOnce(id, callstack, () => this.resolveFunctionMock(node, mock));
	}
	resolveMockOnce(id, callstack, resolve) {
		const contexts = this.factoryContexts.getStore() ?? [];
		const waiting = [...callstack, ...contexts.map((context) => context.mockId)];
		const pending = this.pendingFactories.get(id);
		if (pending) {
			waiting.forEach((waiter) => pending.waiting.add(waiter));
			this.waitListeners.forEach((onWait) => onWait());
			return pending.promise;
		}
		const factory = {
			promise: this.factoryContexts.run([...contexts, {
				mockId: id,
				callstack
			}], resolve).finally(() => {
				if (this.pendingFactories.get(id) === factory) this.pendingFactories.delete(id);
				if (!this.pendingFactories.size)
 // an enabled storage slows down every promise on Node 22
				this.factoryContexts.disable();
			}),
			waiting: new Set(waiting)
		};
		this.pendingFactories.set(id, factory);
		return factory.promise;
	}
	async resolveAutomock(url, mockId, evaluatedNode, callstack, type) {
		const Object = this.primitives.Object;
		// we have to define a separate object that will copy all properties into itself
		// and can't just use the same `exports` define automatically by Vite before the evaluator
		const exports = Object.create(null);
		Object.defineProperty(exports, Symbol.toStringTag, {
			value: "Module",
			configurable: true,
			writable: true
		});
		const node = this.ensureModule(mockId, this.getMockPath(evaluatedNode.url));
		node.meta = evaluatedNode.meta;
		node.file = evaluatedNode.file;
		node.mockedExports = exports;
		const mod = await this.moduleRunner.cachedRequest(url, node, callstack, void 0, true);
		this.mockObject(mod, exports, type);
		return exports;
	}
	async resolveFunctionMock(node, mock) {
		const exports = await mock.resolve();
		const moduleExports = new Proxy(exports, { get: (target, prop) => {
			const val = target[prop];
			// 'then' can exist on non-Promise objects, need nested instanceof check for logic to work
			if (prop === "then") {
				if (target instanceof Promise) return target.then.bind(target);
			} else if (!(prop in target)) {
				if (this.filterPublicKeys.includes(prop)) return;
				throw this.createError(`[vitest] No "${String(prop)}" export is defined on the "${mock.raw}" mock. Did you forget to return it from "vi.mock"?
If you need to partially mock a module, you can use "importOriginal" helper inside:
`, `vi.mock(import("${mock.raw}"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    // your mocked methods
  }
})`);
			}
			return val;
		} });
		node.exports = moduleExports;
		return moduleExports;
	}
	async importActual(rawId, importer, callstack) {
		const { url } = await this.resolveId(rawId, importer);
		const actualUrl = injectQuery(url, "_vitest_original");
		const node = await this.moduleRunner.fetchModule(actualUrl, importer);
		return await this.moduleRunner.cachedRequest(node.url, node, callstack || [importer], void 0, true);
	}
	async importMock(rawId, importer) {
		const { id, url, external } = await this.resolveId(rawId, importer);
		let mock = this.getDependencyMock(id);
		if (!mock) {
			const redirect = this.findMockRedirect(id, external, rawId);
			if (redirect) mock = new RedirectedModule(rawId, id, rawId, redirect);
			else mock = new AutomockedModule(rawId, id, rawId);
		}
		if (mock.type === "automock" || mock.type === "autospy") {
			const node = await this.moduleRunner.fetchModule(url, importer);
			const mod = await this.moduleRunner.cachedRequest(url, node, [importer], void 0, true);
			const Object = this.primitives.Object;
			return this.mockObject(mod, Object.create(Object.prototype), mock.type);
		}
		if (mock.type === "manual") {
			const mockId = this.getMockPath(id);
			return this.callFunctionMock(mockId, this.getMockPath(url), mock, [importer, mockId]);
		}
		const node = await this.moduleRunner.fetchModule(mock.redirect);
		return this.moduleRunner.cachedRequest(mock.redirect, node, [importer], void 0, true);
	}
	async requestWithMockedModule(url, evaluatedNode, callstack, mock) {
		return this._otel.$("vitest.mocker.evaluate", async (span) => {
			const mockId = this.getMockPath(evaluatedNode.id);
			span.setAttributes({
				"vitest.module.id": mockId,
				"vitest.mock.type": mock.type,
				"vitest.mock.id": mock.id,
				"vitest.mock.url": mock.url,
				"vitest.mock.raw": mock.raw
			});
			if (mock.type === "automock" || mock.type === "autospy") {
				const cache = this.evaluatedModules.getModuleById(mockId);
				if (cache?.mockedExports) {
					// while the original module evaluates, only its own imports get the partial object, like in a cycle
					const isSelfImport = callstack.includes(evaluatedNode.id) || this.isResolvingMock(mockId);
					if (!this.pendingFactories.has(mockId) || isSelfImport) return cache.mockedExports;
				}
				return this.resolveMockOnce(mockId, [...callstack, mockId], () => this.resolveAutomock(url, mockId, evaluatedNode, callstack, mock.type));
			}
			if (mock.type === "manual" && !callstack.includes(mockId) && !callstack.includes(url) && !this.isResolvingMock(mockId)) return this.callFunctionMock(mockId, this.getMockPath(url), mock, [...callstack, mockId]);
			else if (mock.type === "redirect" && !callstack.includes(mock.redirect)) {
				span.setAttribute("vitest.mock.redirect", mock.redirect);
				return mock.redirect;
			}
		});
	}
	async mockedRequest(url, evaluatedNode, callstack) {
		const mock = this.getDependencyMock(evaluatedNode.id);
		if (!mock) return;
		return this.requestWithMockedModule(url, evaluatedNode, callstack, mock);
	}
}

class VitestTransport {
	options;
	evaluatedModules;
	callstacks;
	constructor(options, evaluatedModules, callstacks) {
		this.options = options;
		this.evaluatedModules = evaluatedModules;
		this.callstacks = callstacks;
	}
	async invoke(event) {
		if (event.type !== "custom") return { error: /* @__PURE__ */ new Error(`Vitest Module Runner doesn't support Vite HMR events.`) };
		if (event.event !== "vite:invoke") return { error: /* @__PURE__ */ new Error(`Vitest Module Runner doesn't support ${event.event} event.`) };
		const { name, data } = event.data;
		if (name === "getBuiltins")
 // we return an empty array here to avoid client-side builtin check,
		// as we need builtins to go through `fetchModule`
		return { result: [] };
		if (name !== "fetchModule") return { error: /* @__PURE__ */ new Error(`Unknown method: ${name}. Expected "fetchModule".`) };
		try {
			return { result: await this.options.fetchModule(...data) };
		} catch (cause) {
			if (cause instanceof EnvironmentTeardownError) {
				const [id, importer] = data;
				let message = `Cannot load '${id}'${importer ? ` imported from ${importer}` : ""} after the environment was torn down. This is not a bug in Vitest.`;
				const moduleNode = importer ? this.evaluatedModules.getModuleById(importer) : void 0;
				const callstack = moduleNode ? this.callstacks.get(moduleNode) : void 0;
				if (callstack) message += ` The last recorded callstack:\n- ${[
					...callstack,
					importer,
					id
				].reverse().join("\n- ")}`;
				const error = new EnvironmentTeardownError(message);
				if (cause.stack) error.stack = cause.stack.replace(cause.message, error.message);
				return { error };
			}
			return { error: cause };
		}
	}
}

const createNodeImportMeta = (modulePath) => {
	if (!viteModuleRunner.createDefaultImportMeta) throw new Error(`createNodeImportMeta is not supported in this version of Vite.`);
	const defaultMeta = viteModuleRunner.createDefaultImportMeta(modulePath);
	const href = defaultMeta.url;
	const importMetaResolver = createImportMetaResolver() ?? defaultMeta.resolve;
	return {
		...defaultMeta,
		main: false,
		resolve(id, parent) {
			return importMetaResolver(id, parent ?? href);
		}
	};
};
function createImportMetaResolver() {
	if (!import.meta.resolve) return;
	return (specifier, importer) => import.meta.resolve(specifier, importer);
}
// @ts-expect-error overriding private method
class VitestModuleRunner extends viteModuleRunner.ModuleRunner {
	vitestOptions;
	mocker;
	moduleExecutionInfo;
	_otel;
	_callstacks;
	constructor(vitestOptions) {
		const options = vitestOptions;
		const evaluatedModules = options.evaluatedModules;
		const callstacks = /* @__PURE__ */ new WeakMap();
		const transport = new VitestTransport(options.transport, evaluatedModules, callstacks);
		super({
			transport,
			hmr: false,
			evaluatedModules,
			sourcemapInterceptor: "prepareStackTrace",
			createImportMeta: vitestOptions.createImportMeta
		}, options.evaluator);
		this.vitestOptions = vitestOptions;
		this._callstacks = callstacks;
		this._otel = vitestOptions.traces || new Traces({ enabled: false });
		this.moduleExecutionInfo = options.getWorkerState().moduleExecutionInfo;
		this.mocker = options.mocker || new VitestMocker(this, {
			spyModule: options.spyModule,
			context: options.vm?.context,
			traces: this._otel,
			resolveId: options.transport.resolveId,
			get root() {
				return options.getWorkerState().config.root;
			},
			get moduleDirectories() {
				return options.getWorkerState().config.deps.moduleDirectories || [];
			},
			getCurrentTestFilepath() {
				return options.getWorkerState().filepath;
			}
		});
		if (options.vm) options.vm.context.__vitest_mocker__ = this.mocker;
		else Object.defineProperty(globalThis, "__vitest_mocker__", {
			configurable: true,
			writable: true,
			value: this.mocker
		});
	}
	/**
	* Vite checks that the module has exports emulating the Node.js behaviour,
	* but Vitest is more relaxed.
	*
	* We should keep the Vite behavior when there is a `strict` flag.
	* @internal
	*/
	processImport(exports) {
		return exports;
	}
	async import(rawId, options) {
		const resolved = await this._otel.$("vitest.module.resolve_id", { attributes: { "vitest.module.raw_id": rawId } }, async (span) => {
			const result = await this.vitestOptions.transport.resolveId(rawId);
			if (result) span.setAttributes({
				"vitest.module.url": result.url,
				"vitest.module.file": result.file,
				"vitest.module.id": result.id
			});
			return result;
		});
		const url = resolved ? resolved.url : rawId;
		if (options?.invalidate) {
			const module = this.evaluatedModules.getModuleByUrl(url);
			if (module?.evaluated) this.evaluatedModules.invalidateModule(module);
		}
		return super.import(url);
	}
	async fetchModule(url, importer) {
		return await this.cachedModule(url, importer);
	}
	_cachedRequest(url, module, callstack = [], metadata) {
		this.vitestOptions.getWorkerState().dependencies?.add(module.id);
		return this.mocker.awaitEvaluation(module, () => super.cachedRequest(url, module, callstack, metadata));
	}
	/**
	* @internal
	*/
	async cachedRequest(url, mod, callstack = [], metadata, ignoreMock = false) {
		// Track for a better error message if dynamic import is not resolved properly
		this._callstacks.set(mod, callstack);
		// the factory imports a module that waits for this factory, treat it as a cycle
		if (mod.exports && this.mocker.isWaitingForFactory(mod)) return mod.exports;
		if (ignoreMock) return this._cachedRequest(url, mod, callstack, metadata);
		let mocked;
		if (mod.meta && "mockedModule" in mod.meta) {
			const mockId = this.mocker.getMockPath(mod.id);
			const currentMock = this.mocker.getDependencyMock(mod.id);
			// bypass mock and force "importActual" behavior when:
			// - mock was removed by doUnmock (stale mockedModule in meta)
			if (!currentMock) {
				const node = await this.fetchModule(injectQuery(url, "_vitest_original"));
				return this._cachedRequest(node.url, node, callstack, metadata);
			}
			if (callstack.includes(mockId) || this.mocker.isResolvingMock(mockId) || callstack.includes(url) || "redirect" in currentMock && callstack.includes(currentMock.redirect)) {
				const node = await this.fetchModule(injectQuery(url, "_vitest_original"));
				return this._cachedRequest(node.url, node, callstack, metadata);
			}
			if (currentMock.type === "automock" || currentMock.type === "autospy") {
				const freshNode = await this.fetchModule(injectQuery(url, "_vitest_original"));
				mocked = await this.mocker.requestWithMockedModule(url, freshNode, callstack, currentMock);
			} else mocked = await this.mocker.requestWithMockedModule(url, mod, callstack, currentMock);
		} else mocked = await this.mocker.mockedRequest(url, mod, callstack);
		if (typeof mocked === "string") {
			const node = await this.fetchModule(mocked);
			return this._cachedRequest(mocked, node, callstack, metadata);
		}
		if (mocked != null && typeof mocked === "object") return mocked;
		return this._cachedRequest(url, mod, callstack, metadata);
	}
	/** @internal */
	_invalidateSubTreeById(ids, invalidated = /* @__PURE__ */ new Set()) {
		for (const id of ids) {
			if (invalidated.has(id)) continue;
			const node = this.evaluatedModules.getModuleById(id);
			if (!node) continue;
			invalidated.add(id);
			const subIds = Array.from(this.evaluatedModules.idToModuleMap).filter(([, mod]) => mod.importers.has(id)).map(([key]) => key);
			if (subIds.length) this._invalidateSubTreeById(subIds, invalidated);
			this.evaluatedModules.invalidateModule(node);
		}
	}
}

const platform = process.platform;
const bareVitestRegexp = /^@?vitest(?:\/|$)/;
const normalizedDistDir = normalize(distDir);
const relativeIds = {};
const externalizeMap = /* @__PURE__ */ new Map();
function getRelativeDistDir(root) {
	const normalizedRoot = normalize(root).replace(/\/+$/, "") || "/";
	const rootPrefix = normalizedRoot === "/" ? normalizedRoot : `${normalizedRoot}/`;
	return normalizedDistDir.startsWith(rootPrefix) ? normalizedDistDir.slice(normalizedRoot.length) : "";
}
// all Vitest imports always need to be externalized
function getCachedVitestImport(id, state) {
	if (id.startsWith("/@fs/") || id.startsWith("\\@fs\\")) id = id.slice(platform === "win32" ? 5 : 4);
	if (externalizeMap.has(id)) return {
		externalize: externalizeMap.get(id),
		type: "module"
	};
	// always externalize Vitest because we import from there before running tests
	// so we already have it cached by Node.js
	const root = state().config.root;
	const relativeRoot = relativeIds[root] ?? (relativeIds[root] = getRelativeDistDir(root));
	if (id.includes(distDir) || id.includes(normalizedDistDir)) {
		const { file, postfix } = splitFileAndPostfix$1(id);
		// Vite resolves the Windows drive letter in upper case, but Node.js caches
		// modules by URL, so keep the drive letter Vitest itself was loaded with
		const path = file.startsWith(normalizedDistDir) ? distDir + file.slice(normalizedDistDir.length) : file;
		const externalize = id.startsWith("file://") ? id : `${pathToFileURL(path)}${postfix}`;
		externalizeMap.set(id, externalize);
		return {
			externalize,
			type: "module"
		};
	}
	if (relativeRoot && relativeRoot !== "/" && id.startsWith(relativeRoot)) {
		const { file, postfix } = splitFileAndPostfix$1(id);
		const path = join(root, file);
		const externalize = `${pathToFileURL(path)}${postfix}`;
		externalizeMap.set(id, externalize);
		return {
			externalize,
			type: "module"
		};
	}
	if (bareVitestRegexp.test(id)) {
		externalizeMap.set(id, id);
		return {
			externalize: id,
			type: "module"
		};
	}
	return null;
}

const { readFileSync } = fs__default;
const VITEST_VM_CONTEXT_SYMBOL = "__vitest_vm_context__";
const cwd = process.cwd();
const isWindows = process.platform === "win32";
function startVitestModuleRunner(options) {
	const traces = options.traces;
	const state = () => getSafeWorkerState() || options.state;
	const rpc = () => state().rpc;
	// Wall time the worker spends blocked on server round-trips, measured as the
	// union of in-flight intervals: sibling imports await fetches concurrently,
	// so summing individual call durations would overcount the blocked time.
	let fetchesInflight = 0;
	let fetchesBusyStart = 0;
	async function trackFetchTime(fetchPromise) {
		if (fetchesInflight++ === 0) fetchesBusyStart = performance.now();
		try {
			return await fetchPromise;
		} finally {
			if (--fetchesInflight === 0) state().durations.fetch += performance.now() - fetchesBusyStart;
		}
	}
	const environment = () => {
		const environment = state().environment;
		return environment.viteEnvironment || environment.name;
	};
	const vm = options.context && options.externalModulesExecutor ? {
		context: options.context,
		externalModulesExecutor: options.externalModulesExecutor
	} : void 0;
	// A fresh worker pays one sequential `fetch` round-trip per module in its
	// test files' import graphs, even when the server has already processed
	// them. So the module runner asks the server once for everything it has on
	// disk for its first run request, and answers those fetches locally. Modules
	// that only later files import are fetched one by one. Keeping the snapshot
	// for the runner's lifetime is safe because a worker doesn't outlive a run,
	// and the scheduled rerun picks up a file edited during a run.
	let warmModules;
	function fetchWarmModules() {
		warmModules ??= rpc().fetchWarmModules(environment(), state().ctx.files.map((file) => file.filepath)).catch(() => null);
		return warmModules;
	}
	// setup files are re-evaluated before every test file, so a reused worker
	// resolves them and their `vi.mock` paths again each time
	const resolvedIds = /* @__PURE__ */ new Map();
	async function resolveId(id, importer) {
		const key = `${environment()}\0${importer ?? ""}\0${id}`;
		if (resolvedIds.has(key)) return resolvedIds.get(key);
		const resolved = rpc().resolve(id, importer, environment());
		resolvedIds.set(key, resolved);
		resolved.then((value) => resolvedIds.set(key, value), () => resolvedIds.delete(key));
		return resolved;
	}
	const evaluator = options.evaluator || new VitestModuleEvaluator(vm, {
		traces,
		metaEnv: state().metaEnv,
		evaluatedModules: options.evaluatedModules,
		get moduleExecutionInfo() {
			return state().moduleExecutionInfo;
		},
		get interopDefault() {
			return state().config.deps.interopDefault;
		},
		get injectCjsGlobals() {
			return state().config.injectCjsGlobals;
		},
		getCurrentTestFilepath: () => state().filepath,
		getEnvironmentName: environment,
		getterTracker: state().getterTracker
	});
	const moduleRunner = new VitestModuleRunner({
		spyModule: options.spyModule,
		evaluatedModules: options.evaluatedModules,
		evaluator,
		traces,
		mocker: options.mocker,
		transport: {
			async fetchModule(id, importer, options) {
				const resolvingModules = state().resolvingModules;
				if (isWindows) {
					if (id[1] === ":") {
						// The drive letter is different for whatever reason, we need to normalize it to CWD
						if (id[0] !== cwd[0] && id[0].toUpperCase() === cwd[0].toUpperCase()) id = (cwd[0].toUpperCase() === cwd[0] ? id[0].toUpperCase() : id[0].toLowerCase()) + id.slice(1);
						// always mark absolute windows paths, otherwise Vite will externalize it
						id = `/@id/${id}`;
					}
				}
				const vitest = getCachedVitestImport(id, state);
				if (vitest) return vitest;
				// strip _vitest_original query added by importActual so that
				// the plugin pipeline sees the original import id (e.g. virtual modules' load hook)
				const isImportActual = id.includes("_vitest_original");
				if (isImportActual) id = removeQuery(id, "_vitest_original");
				const rawId = unwrapId(id);
				resolvingModules.add(rawId);
				try {
					if (VitestMocker.pendingIds.length || moduleRunner.mocker.registeringMocks) await moduleRunner.mocker.resolveMocks();
					if (!isImportActual) {
						const resolvedMock = moduleRunner.mocker.getDependencyMockByUrl(id);
						if (resolvedMock?.type === "manual" || resolvedMock?.type === "redirect") return {
							code: "",
							file: null,
							id: resolvedMock.id,
							url: resolvedMock.url,
							invalidate: false,
							// the module node outlives the test file, so it must not keep the mock factory alive
							mockedModule: true
						};
					}
					if (isBuiltin(rawId)) return {
						externalize: rawId,
						type: "builtin"
					};
					if (isBrowserExternal(rawId)) return {
						externalize: toBuiltin(rawId),
						type: "builtin"
					};
					// if module is invalidated, the worker will be recreated,
					// so cached is always true in a single worker
					if (!isImportActual && options?.cached) return { cache: true };
					// only dependency fetches consult the snapshot: by the time the
					// first dependency is requested, the entry file is transformed and
					// its import graph is connected on the server, so the snapshot
					// actually covers the file's transitive dependencies
					if (importer != null) {
						const warm = await trackFetchTime(fetchWarmModules());
						// the null prototype is not preserved by the IPC serialization, so
						// ids like "constructor" must not fall through to Object.prototype
						const warmResult = warm && (Object.hasOwn(warm, id) ? warm[id] : Object.hasOwn(warm, rawId) ? warm[rawId] : void 0);
						if (warmResult) {
							if ("tmp" in warmResult) try {
								return {
									code: readFileSync(warmResult.tmp, "utf-8"),
									...warmResult
								};
							} catch {}
							else return warmResult;
						}
					}
					const otelCarrier = traces?.getContextCarrier();
					const result = await trackFetchTime(rpc().fetch(id, importer, environment(), options, otelCarrier));
					if ("cached" in result) return {
						code: readFileSync(result.tmp, "utf-8"),
						...result
					};
					return result;
				} catch (cause) {
					// rethrow vite error if it cannot load the module because it's not resolved
					if (typeof cause === "object" && cause != null && cause.code === "ERR_LOAD_URL" || typeof cause?.message === "string" && cause.message.includes("Failed to load url") || typeof cause?.message === "string" && cause.message.startsWith("Cannot find module '")) {
						const error = new Error(`Cannot find ${isBareImport(id) ? "package" : "module"} '${id}'${importer ? ` imported from ${importer}` : ""}`, { cause });
						error.code = "ERR_MODULE_NOT_FOUND";
						throw error;
					}
					throw cause;
				} finally {
					resolvingModules.delete(rawId);
				}
			},
			resolveId
		},
		getWorkerState: state,
		vm,
		createImportMeta: options.createImportMeta
	});
	return moduleRunner;
}

// SEE https://github.com/jsdom/jsdom/blob/master/lib/jsdom/living/interfaces.js
const LIVING_KEYS = [
	"DOMException",
	"EventTarget",
	"NamedNodeMap",
	"Node",
	"Attr",
	"Element",
	"DocumentFragment",
	"DOMImplementation",
	"Document",
	"XMLDocument",
	"CharacterData",
	"Text",
	"CDATASection",
	"ProcessingInstruction",
	"Comment",
	"DocumentType",
	"NodeList",
	"RadioNodeList",
	"HTMLCollection",
	"HTMLOptionsCollection",
	"DOMStringMap",
	"DOMTokenList",
	"StyleSheetList",
	"HTMLElement",
	"HTMLHeadElement",
	"HTMLTitleElement",
	"HTMLBaseElement",
	"HTMLLinkElement",
	"HTMLMetaElement",
	"HTMLStyleElement",
	"HTMLBodyElement",
	"HTMLHeadingElement",
	"HTMLParagraphElement",
	"HTMLHRElement",
	"HTMLPreElement",
	"HTMLUListElement",
	"HTMLOListElement",
	"HTMLLIElement",
	"HTMLMenuElement",
	"HTMLDListElement",
	"HTMLDivElement",
	"HTMLAnchorElement",
	"HTMLAreaElement",
	"HTMLBRElement",
	"HTMLButtonElement",
	"HTMLCanvasElement",
	"HTMLDataElement",
	"HTMLDataListElement",
	"HTMLDetailsElement",
	"HTMLDialogElement",
	"HTMLDirectoryElement",
	"HTMLFieldSetElement",
	"HTMLFontElement",
	"HTMLFormElement",
	"HTMLHtmlElement",
	"HTMLImageElement",
	"HTMLInputElement",
	"HTMLLabelElement",
	"HTMLLegendElement",
	"HTMLMapElement",
	"HTMLMarqueeElement",
	"HTMLMediaElement",
	"HTMLMeterElement",
	"HTMLModElement",
	"HTMLOptGroupElement",
	"HTMLOptionElement",
	"HTMLOutputElement",
	"HTMLPictureElement",
	"HTMLProgressElement",
	"HTMLQuoteElement",
	"HTMLScriptElement",
	"HTMLSelectElement",
	"HTMLSlotElement",
	"HTMLSourceElement",
	"HTMLSpanElement",
	"HTMLTableCaptionElement",
	"HTMLTableCellElement",
	"HTMLTableColElement",
	"HTMLTableElement",
	"HTMLTimeElement",
	"HTMLTableRowElement",
	"HTMLTableSectionElement",
	"HTMLTemplateElement",
	"HTMLTextAreaElement",
	"HTMLUnknownElement",
	"HTMLFrameElement",
	"HTMLFrameSetElement",
	"HTMLIFrameElement",
	"HTMLEmbedElement",
	"HTMLObjectElement",
	"HTMLParamElement",
	"HTMLVideoElement",
	"HTMLAudioElement",
	"HTMLTrackElement",
	"HTMLFormControlsCollection",
	"SVGElement",
	"SVGGraphicsElement",
	"SVGSVGElement",
	"SVGTitleElement",
	"SVGAnimatedString",
	"SVGNumber",
	"SVGStringList",
	"Event",
	"CloseEvent",
	"CustomEvent",
	"MessageEvent",
	"ErrorEvent",
	"HashChangeEvent",
	"PopStateEvent",
	"StorageEvent",
	"ProgressEvent",
	"PageTransitionEvent",
	"SubmitEvent",
	"UIEvent",
	"FocusEvent",
	"InputEvent",
	"MouseEvent",
	"KeyboardEvent",
	"TouchEvent",
	"CompositionEvent",
	"WheelEvent",
	"BarProp",
	"External",
	"Location",
	"History",
	"Screen",
	"Crypto",
	"Performance",
	"Navigator",
	"PluginArray",
	"MimeTypeArray",
	"Plugin",
	"MimeType",
	"FileReader",
	"FormData",
	"Blob",
	"File",
	"FileList",
	"ValidityState",
	"DOMParser",
	"XMLSerializer",
	"XMLHttpRequestEventTarget",
	"XMLHttpRequestUpload",
	"XMLHttpRequest",
	"WebSocket",
	"NodeFilter",
	"NodeIterator",
	"TreeWalker",
	"AbstractRange",
	"Range",
	"StaticRange",
	"Selection",
	"Storage",
	"CustomElementRegistry",
	"ShadowRoot",
	"MutationObserver",
	"MutationRecord",
	"Uint8Array",
	"Uint16Array",
	"Uint32Array",
	"Uint8ClampedArray",
	"Int8Array",
	"Int16Array",
	"Int32Array",
	"Float32Array",
	"Float64Array",
	"ArrayBuffer",
	"DOMRectReadOnly",
	"DOMRect",
	"Image",
	"Audio",
	"Option",
	"CSS"
];
const OTHER_KEYS = [
	"addEventListener",
	"alert",
	"blur",
	"cancelAnimationFrame",
	"close",
	"confirm",
	"createPopup",
	"dispatchEvent",
	"document",
	"focus",
	"frames",
	"getComputedStyle",
	"history",
	"innerHeight",
	"innerWidth",
	"length",
	"localStorage",
	"location",
	"matchMedia",
	"moveBy",
	"moveTo",
	"name",
	"navigator",
	"open",
	"outerHeight",
	"outerWidth",
	"pageXOffset",
	"pageYOffset",
	"parent",
	"postMessage",
	"print",
	"prompt",
	"removeEventListener",
	"requestAnimationFrame",
	"resizeBy",
	"resizeTo",
	"screen",
	"screenLeft",
	"screenTop",
	"screenX",
	"screenY",
	"scroll",
	"scrollBy",
	"scrollLeft",
	"scrollTo",
	"scrollTop",
	"scrollX",
	"scrollY",
	"self",
	"sessionStorage",
	"stop",
	"top",
	"Window",
	"window"
];
const KEYS = LIVING_KEYS.concat(OTHER_KEYS);

const skipKeys = [
	"window",
	"self",
	"top",
	"parent"
];
function getWindowKeys(global, win, additionalKeys = []) {
	const keysArray = [...additionalKeys, ...KEYS];
	return new Set(keysArray.concat(Object.getOwnPropertyNames(win)).filter((k) => {
		if (skipKeys.includes(k)) return false;
		if (k in global) return keysArray.includes(k);
		return true;
	}));
}
function isClassLikeName(name) {
	return name[0] === name[0].toUpperCase();
}
function populateGlobal(global, win, options = {}) {
	const { bindFunctions = false } = options;
	const keys = getWindowKeys(global, win, options.additionalKeys);
	const originals = /* @__PURE__ */ new Map();
	const overriddenKeys = /* @__PURE__ */ new Set([...KEYS, ...options.additionalKeys || []]);
	const overrideObject = /* @__PURE__ */ new Map();
	for (const key of keys) {
		const boundFunction = bindFunctions && typeof win[key] === "function" && !isClassLikeName(key) && win[key].bind(win);
		if (overriddenKeys.has(key) && key in global) {
			// capture the descriptor instead of the value to avoid invoking native
			// lazy getters such as Node's `localStorage`, which warns when accessed
			// without `--localstorage-file`
			const descriptor = Object.getOwnPropertyDescriptor(global, key) ?? {
				value: global[key],
				configurable: true,
				writable: true,
				enumerable: true
			};
			originals.set(key, descriptor);
		}
		Object.defineProperty(global, key, {
			get() {
				if (overrideObject.has(key)) return overrideObject.get(key);
				if (boundFunction) return boundFunction;
				return win[key];
			},
			set(v) {
				overrideObject.set(key, v);
				// propagate changes to underlying window implementation,
				// which can affect other window API behavior internally, e.g.
				// updating `innerWidth` affects `matchMedia("(max-width: *)")` on happy-dom.
				win[key] = v;
			},
			configurable: true
		});
	}
	global.window = global;
	global.self = global;
	global.top = global;
	global.parent = global;
	if (global.global) global.global = global;
	// rewrite defaultView to reference the same global context
	if (global.document && global.document.defaultView) Object.defineProperty(global.document, "defaultView", {
		get: () => global,
		enumerable: true,
		configurable: true
	});
	skipKeys.forEach((k) => keys.add(k));
	return {
		keys,
		skipKeys,
		originals
	};
}

var edge = {
	name: "edge-runtime",
	viteEnvironment: "ssr",
	async setupVM() {
		const { EdgeVM } = await import('@edge-runtime/vm');
		const vm = new EdgeVM({ extend: (context) => {
			context.global = context;
			context.Buffer = Buffer;
			return context;
		} });
		return {
			getVmContext() {
				return vm.context;
			},
			teardown() {
				// nothing to teardown
			}
		};
	},
	async setup(global) {
		const { EdgeVM } = await import('@edge-runtime/vm');
		const vm = new EdgeVM({ extend: (context) => {
			context.global = context;
			context.Buffer = Buffer;
			KEYS.forEach((key) => {
				if (key in global) context[key] = global[key];
			});
			return context;
		} });
		const { keys, originals } = populateGlobal(global, vm.context, { bindFunctions: true });
		return { teardown(global) {
			keys.forEach((key) => delete global[key]);
			originals.forEach((d, k) => Object.defineProperty(global, k, d));
		} };
	}
};

async function teardownWindow(win) {
	if (win.close && win.happyDOM.abort) {
		await win.happyDOM.abort();
		win.close();
	} else win.happyDOM.cancelAsync();
}
var happy = {
	name: "happy-dom",
	viteEnvironment: "client",
	async setupVM({ happyDOM = {} }) {
		const { Window } = await import('happy-dom');
		let win = new Window({
			...happyDOM,
			console: console && globalThis.console ? globalThis.console : void 0,
			url: happyDOM.url || "http://localhost:3000",
			settings: {
				...happyDOM.settings,
				disableErrorCapturing: true
			}
		});
		// TODO: browser doesn't expose Buffer, but a lot of dependencies use it
		win.Buffer = Buffer;
		// inject structuredClone if it exists
		if (typeof structuredClone !== "undefined" && !win.structuredClone) win.structuredClone = structuredClone;
		return {
			getVmContext() {
				return win;
			},
			async teardown() {
				await teardownWindow(win);
				win = void 0;
			}
		};
	},
	async setup(global, { happyDOM = {} }) {
		// happy-dom v3 introduced a breaking change to Window, but
		// provides GlobalWindow as a way to use previous behaviour
		const { Window, GlobalWindow } = await import('happy-dom');
		const win = new (GlobalWindow || Window)({
			...happyDOM,
			console: console && global.console ? global.console : void 0,
			url: happyDOM.url || "http://localhost:3000",
			settings: {
				...happyDOM.settings,
				disableErrorCapturing: true
			}
		});
		const { keys, originals } = populateGlobal(global, win, {
			bindFunctions: true,
			// jsdom doesn't support fetch API, but happy-dom does
			additionalKeys: [
				"Request",
				"Response",
				"MessagePort",
				"fetch",
				"Headers",
				"AbortController",
				"AbortSignal",
				"URL",
				"URLSearchParams",
				"FormData"
			]
		});
		return { async teardown(global) {
			await teardownWindow(win);
			keys.forEach((key) => delete global[key]);
			originals.forEach((d, k) => Object.defineProperty(global, k, d));
		} };
	}
};

function catchWindowErrors(window) {
	let userErrorListenerCount = 0;
	function throwUnhandlerError(e) {
		if (userErrorListenerCount === 0 && e.error != null) {
			e.preventDefault();
			process.emit("uncaughtException", e.error);
		}
	}
	const addEventListener = window.addEventListener.bind(window);
	const removeEventListener = window.removeEventListener.bind(window);
	window.addEventListener("error", throwUnhandlerError);
	window.addEventListener = function(...args) {
		if (args[0] === "error") userErrorListenerCount++;
		return addEventListener.apply(this, args);
	};
	window.removeEventListener = function(...args) {
		if (args[0] === "error" && userErrorListenerCount) userErrorListenerCount--;
		return removeEventListener.apply(this, args);
	};
	return function clearErrorHandlers() {
		window.removeEventListener("error", throwUnhandlerError);
	};
}
let NodeFormData_;
let NodeBlob_;
let NodeRequest_;
function getResourceOptions(jsdom, resources, userAgent) {
	const ResourceLoader = jsdom.ResourceLoader;
	// jsdom 28 replaced ResourceLoader with a resources options object.
	if (!ResourceLoader) return { resources: userAgent ? { userAgent } : resources };
	return {
		resources: resources ?? (userAgent ? new ResourceLoader({ userAgent }) : void 0),
		userAgent
	};
}
var jsdom = {
	name: "jsdom",
	viteEnvironment: "client",
	async setupVM({ jsdom = {} }) {
		// delay initialization because it takes ~1s
		NodeFormData_ = globalThis.FormData;
		NodeBlob_ = globalThis.Blob;
		NodeRequest_ = globalThis.Request;
		const jsdomModule = await import('jsdom');
		const { CookieJar, JSDOM, VirtualConsole } = jsdomModule;
		const { html = "<!DOCTYPE html>", userAgent, url = "http://localhost:3000", contentType = "text/html", pretendToBeVisual = true, includeNodeLocations = false, runScripts = "dangerously", resources, console = false, cookieJar = false, ...restOptions } = jsdom;
		let virtualConsole;
		if (console && globalThis.console) {
			virtualConsole = new VirtualConsole();
			// jsdom <27
			if ("sendTo" in virtualConsole) virtualConsole.sendTo(globalThis.console);
			else virtualConsole.forwardTo(globalThis.console);
		}
		let dom = new JSDOM(html, {
			pretendToBeVisual,
			runScripts,
			url,
			virtualConsole,
			cookieJar: cookieJar ? new CookieJar() : void 0,
			includeNodeLocations,
			contentType,
			...getResourceOptions(jsdomModule, resources, userAgent),
			...restOptions
		});
		const clearAddEventListenerPatch = patchAddEventListener(dom.window);
		const clearWindowErrors = catchWindowErrors(dom.window);
		const utils = createCompatUtils(dom.window);
		// TODO: browser doesn't expose Buffer, but a lot of dependencies use it
		dom.window.Buffer = Buffer;
		dom.window.jsdom = dom;
		dom.window.Request = createCompatRequest(utils);
		dom.window.URL = createJSDOMCompatURL(utils);
		for (const name of [
			"structuredClone",
			"BroadcastChannel",
			"MessageChannel",
			"MessagePort",
			"TextEncoder",
			"TextDecoder"
		]) {
			const value = globalThis[name];
			if (typeof value !== "undefined" && typeof dom.window[name] === "undefined") dom.window[name] = value;
		}
		for (const name of [
			"fetch",
			"Response",
			"Headers",
			"AbortController",
			"AbortSignal",
			"URLSearchParams"
		]) {
			const value = globalThis[name];
			if (typeof value !== "undefined") dom.window[name] = value;
		}
		return {
			getVmContext() {
				return dom.getInternalVMContext();
			},
			teardown() {
				clearAddEventListenerPatch();
				clearWindowErrors();
				dom.window.close();
				dom = void 0;
			}
		};
	},
	async setup(global, { jsdom = {} }) {
		// delay initialization because it takes ~1s
		NodeFormData_ = globalThis.FormData;
		NodeBlob_ = globalThis.Blob;
		NodeRequest_ = globalThis.Request;
		const jsdomModule = await import('jsdom');
		const { CookieJar, JSDOM, VirtualConsole } = jsdomModule;
		const { html = "<!DOCTYPE html>", userAgent, url = "http://localhost:3000", contentType = "text/html", pretendToBeVisual = true, includeNodeLocations = false, runScripts = "dangerously", resources, console = false, cookieJar = false, ...restOptions } = jsdom;
		let virtualConsole;
		if (console && globalThis.console) {
			virtualConsole = new VirtualConsole();
			// jsdom <27
			if ("sendTo" in virtualConsole) virtualConsole.sendTo(globalThis.console);
			else virtualConsole.forwardTo(globalThis.console);
		}
		const dom = new JSDOM(html, {
			pretendToBeVisual,
			runScripts,
			url,
			virtualConsole,
			cookieJar: cookieJar ? new CookieJar() : void 0,
			includeNodeLocations,
			contentType,
			...getResourceOptions(jsdomModule, resources, userAgent),
			...restOptions
		});
		const clearAddEventListenerPatch = patchAddEventListener(dom.window);
		const { keys, originals } = populateGlobal(global, dom.window, { bindFunctions: true });
		const clearWindowErrors = catchWindowErrors(global);
		const utils = createCompatUtils(dom.window);
		global.jsdom = dom;
		global.Request = createCompatRequest(utils);
		global.URL = createJSDOMCompatURL(utils);
		return { teardown(global) {
			clearAddEventListenerPatch();
			clearWindowErrors();
			dom.window.close();
			delete global.jsdom;
			keys.forEach((key) => delete global[key]);
			originals.forEach((d, k) => Object.defineProperty(global, k, d));
		} };
	}
};
function createCompatRequest(utils) {
	class Request extends NodeRequest_ {
		constructor(...args) {
			const [input, init] = args;
			if (init?.body != null) {
				const compatInit = { ...init };
				if (init.body instanceof utils.window.Blob) compatInit.body = utils.makeCompatBlob(init.body);
				if (init.body instanceof utils.window.FormData) compatInit.body = utils.makeCompatFormData(init.body);
				super(input, compatInit);
			} else super(...args);
		}
		static [Symbol.hasInstance](instance) {
			return instance instanceof NodeRequest_;
		}
	}
	return Request;
}
function createJSDOMCompatURL(utils) {
	class URL extends URL$1 {
		static createObjectURL(blob) {
			if (blob instanceof utils.window.Blob) {
				const compatBlob = utils.makeCompatBlob(blob);
				return URL$1.createObjectURL(compatBlob);
			}
			return URL$1.createObjectURL(blob);
		}
		static [Symbol.hasInstance](instance) {
			return instance instanceof URL$1;
		}
	}
	return URL;
}
// jsdom keeps Blob bytes on an internal "impl" object and exposes no synchronous
// public way to read them, so this reaches into its generated bindings
function createBlobImplGetter(window) {
	const _require = createRequire(import.meta.url);
	// jsdom 28.1 moved the generated bindings; jsdom has no "exports" map, so both subpaths resolve
	for (const id of ["jsdom/lib/generated/idl/utils.js", "jsdom/lib/jsdom/living/generated/utils.js"]) try {
		const { implForWrapper } = _require(id);
		if (typeof implForWrapper === "function") return implForWrapper;
	} catch {}
	// jsdom < 30.1 also stores the impl under an own Symbol("impl")
	const implSymbol = Object.getOwnPropertySymbols(new window.Blob())[0];
	return (blob) => blob[implSymbol];
}
let getBlobImpl;
function createCompatUtils(window) {
	getBlobImpl ??= createBlobImplGetter(window);
	const utils = {
		window,
		makeCompatFormData(formData) {
			const nodeFormData = new NodeFormData_();
			formData.forEach((value, key) => {
				if (value instanceof window.Blob) nodeFormData.append(key, utils.makeCompatBlob(value));
				else nodeFormData.append(key, value);
			});
			return nodeFormData;
		},
		makeCompatBlob(blob) {
			const impl = getBlobImpl(blob);
			if (!impl) throw new TypeError("Vitest cannot read the bytes of a jsdom Blob. This is a Vitest bug, please report it with your jsdom version.");
			// jsdom 28 renamed `_buffer` to `_bytes`
			return new NodeBlob_([impl._bytes ?? impl._buffer], { type: blob.type });
		}
	};
	return utils;
}
function patchAddEventListener(window) {
	const abortControllers = /* @__PURE__ */ new WeakMap();
	const JSDOMAbortSignal = window.AbortSignal;
	const JSDOMAbortController = window.AbortController;
	const originalAddEventListener = window.EventTarget.prototype.addEventListener;
	function getJsdomAbortController(signal) {
		if (!abortControllers.has(signal)) {
			const jsdomAbortController = new JSDOMAbortController();
			signal.addEventListener("abort", () => {
				jsdomAbortController.abort(signal.reason);
			});
			abortControllers.set(signal, jsdomAbortController);
		}
		return abortControllers.get(signal);
	}
	window.EventTarget.prototype.addEventListener = function addEventListener(type, callback, options) {
		if (typeof options === "object" && options?.signal != null) {
			const { signal, ...otherOptions } = options;
			// - this happens because AbortSignal is provided by Node.js,
			// but jsdom APIs require jsdom's AbortSignal, while Node APIs
			// (like fetch and Request) require a Node.js AbortSignal
			// - disable narrow typing with "as any" because we need it later
			if (!(signal instanceof JSDOMAbortSignal)) {
				const jsdomCompatOptions = Object.create(null);
				Object.assign(jsdomCompatOptions, otherOptions);
				jsdomCompatOptions.signal = getJsdomAbortController(signal).signal;
				return originalAddEventListener.call(this, type, callback, jsdomCompatOptions);
			}
		}
		return originalAddEventListener.call(this, type, callback, options);
	};
	return () => {
		window.EventTarget.prototype.addEventListener = originalAddEventListener;
	};
}

// some globals we do not want, either because deprecated or we set it ourselves
const denyList = /* @__PURE__ */ new Set([
	"GLOBAL",
	"root",
	"global",
	"Buffer",
	"ArrayBuffer",
	"Uint8Array"
]);
const nodeGlobals = /* @__PURE__ */ new Map();
function populateNodeGlobals() {
	if (nodeGlobals.size !== 0) return;
	const names = Object.getOwnPropertyNames(globalThis);
	const length = names.length;
	for (let i = 0; i < length; i++) {
		const globalName = names[i];
		if (!denyList.has(globalName)) {
			const descriptor = Object.getOwnPropertyDescriptor(globalThis, globalName);
			if (!descriptor) throw new Error(`No property descriptor for ${globalName}, this is a bug in Vitest.`);
			nodeGlobals.set(globalName, descriptor);
		}
	}
}
var node = {
	name: "node",
	viteEnvironment: "ssr",
	prewarmModules: false,
	// this is largely copied from jest's node environment
	async setupVM() {
		populateNodeGlobals();
		const vm = await import('node:vm');
		let context = vm.createContext();
		let global = vm.runInContext("this", context);
		const contextGlobals = new Set(Object.getOwnPropertyNames(global));
		for (const [nodeGlobalsKey, descriptor] of nodeGlobals) if (!contextGlobals.has(nodeGlobalsKey)) {
			if (descriptor.configurable) Object.defineProperty(global, nodeGlobalsKey, {
				configurable: true,
				enumerable: descriptor.enumerable,
				get() {
					// @ts-expect-error: no index signature
					const val = globalThis[nodeGlobalsKey];
					// override lazy getter
					Object.defineProperty(global, nodeGlobalsKey, {
						configurable: true,
						enumerable: descriptor.enumerable,
						value: val,
						// accessor globals like `performance` and `localStorage` (Node 25+) are assignable when they have a setter
						writable: descriptor.writable === true || typeof descriptor.set === "function"
					});
					return val;
				},
				set(val) {
					// override lazy getter
					Object.defineProperty(global, nodeGlobalsKey, {
						configurable: true,
						enumerable: descriptor.enumerable,
						value: val,
						writable: true
					});
				}
			});
			else if ("value" in descriptor) Object.defineProperty(global, nodeGlobalsKey, {
				configurable: false,
				enumerable: descriptor.enumerable,
				value: descriptor.value,
				writable: descriptor.writable
			});
			else Object.defineProperty(global, nodeGlobalsKey, {
				configurable: false,
				enumerable: descriptor.enumerable,
				get: descriptor.get,
				set: descriptor.set
			});
		}
		global.global = global;
		global.Buffer = Buffer;
		global.ArrayBuffer = ArrayBuffer;
		// TextEncoder (global or via 'util') references a Uint8Array constructor
		// different than the global one used by users in tests. This makes sure the
		// same constructor is referenced by both.
		global.Uint8Array = Uint8Array;
		return {
			getVmContext() {
				return context;
			},
			teardown() {
				context = void 0;
				global = void 0;
			}
		};
	},
	async setup(global) {
		global.console.Console = Console;
		return { teardown(global) {
			delete global.console.Console;
		} };
	}
};

const environments = {
	node,
	jsdom,
	"happy-dom": happy,
	"edge-runtime": edge
};

export { BareModuleMocker as B, VITEST_VM_CONTEXT_SYMBOL as V, VitestModuleRunner as a, VitestTransport as b, createNodeImportMeta as c, environments as e, normalizeModuleId as n, populateGlobal as p, startVitestModuleRunner as s };
