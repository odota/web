import { isBuiltin, createRequire } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { ssrModuleExportsKey, ssrImportMetaKey, ssrImportKey, ssrDynamicImportKey, ssrExportAllKey } from 'vite/module-runner';
import { Traces } from './traces.js';

const performanceNow = performance.now.bind(performance);
class ModuleDebug {
	executionStack = [];
	startCalculateModuleExecutionInfo(filename, options) {
		const startTime = performanceNow();
		this.executionStack.push({
			filename,
			startTime,
			subImportTime: 0
		});
		return () => {
			const duration = performanceNow() - startTime;
			const currentExecution = this.executionStack.pop();
			if (currentExecution == null) throw new Error("Execution stack is empty, this should never happen");
			const selfTime = duration - currentExecution.subImportTime;
			if (this.executionStack.length > 0) this.executionStack.at(-1).subImportTime += duration;
			return {
				startOffset: options.startOffset,
				external: options.external,
				importer: options.importer,
				duration,
				selfTime
			};
		};
	}
}

const isWindows = process.platform === "win32";
// Compiled scripts of inlined modules, shared across vm contexts: vm pools
// evaluate every module again in each fresh context, but the compiled script
// holds no per-context state (Vite rewrites dynamic imports to
// `__vite_ssr_dynamic_import__`, so no per-context import callback is baked
// in) — only its evaluation has to happen per context. Keyed by module id
// (`mock:` ids stay distinct from their originals) and Vite environment: one
// worker can run files of different environments, which transform the same id
// differently.
const vmInlineScriptCache = /* @__PURE__ */ new Map();
function getVmInlineScript(environment, id, wrappedCode, options) {
	const key = `${environment}:${id}`;
	let script = vmInlineScriptCache.get(key);
	if (!script) {
		script = new vm.Script(wrappedCode, options);
		vmInlineScriptCache.set(key, script);
	}
	return script;
}
class VitestModuleEvaluator {
	options;
	stubs = {};
	env;
	vm;
	compiledFunctionArgumentsNames;
	compiledFunctionArgumentsValues = [];
	getterTracker;
	static EXPORTS_MAX_INVOCATIONS = 1e6;
	primitives;
	debug = new ModuleDebug();
	_otel;
	_evaluatedModules;
	constructor(vmOptions, options = {}) {
		this.options = options;
		this._otel = options.traces || new Traces({ enabled: false });
		this.env = options.metaEnv ?? createImportMetaEnvProxy();
		this.vm = vmOptions;
		this.stubs = getDefaultRequestStubs(vmOptions?.context);
		this._evaluatedModules = options.evaluatedModules;
		if (options.compiledFunctionArgumentsNames) this.compiledFunctionArgumentsNames = options.compiledFunctionArgumentsNames;
		if (options.compiledFunctionArgumentsValues) this.compiledFunctionArgumentsValues = options.compiledFunctionArgumentsValues;
		if (vmOptions) this.primitives = vm.runInContext("({ Object, Proxy, Reflect })", vmOptions.context);
		else this.primitives = {
			Object,
			Proxy,
			Reflect
		};
		this.getterTracker = options.getterTracker;
	}
	convertIdToImportUrl(id) {
		// TODO: vitest returns paths for external modules, but Vite returns file://
		// REMOVE WHEN VITE 6 SUPPORT IS OVER
		// unfortunately, there is a bug in Vite where ID is resolved incorrectly, so we can't return files until the fix is merged
		// https://github.com/vitejs/vite/pull/20449
		if (!isWindows || isBuiltin(id) || /^(?:node:|data:|http:|https:|file:)/.test(id)) return id;
		const [filepath, query] = id.split("?");
		if (query) return `${pathToFileURL(filepath).toString()}?${query}`;
		return pathToFileURL(filepath).toString();
	}
	async runExternalModule(id) {
		if (id in this.stubs) return this.stubs[id];
		const file = this.convertIdToImportUrl(id);
		const importer = (this._evaluatedModules?.getModuleById(id)?.importers)?.values().next().value;
		const filename = id.startsWith("file://") ? fileURLToPath(id) : id;
		const finishModuleExecutionInfo = this.debug.startCalculateModuleExecutionInfo(filename, {
			startOffset: 0,
			external: true,
			importer
		});
		const namespace = await this._otel.$("vitest.module.external", { attributes: { "code.file.path": file } }, () => this.vm ? this.vm.externalModulesExecutor.import(file) : import(file)).finally(() => {
			this.options.moduleExecutionInfo?.set(filename, finishModuleExecutionInfo());
		});
		if (!this.shouldInterop(file, namespace)) return namespace;
		const { mod, defaultExport } = interopModule(namespace);
		const { Proxy, Reflect } = this.primitives;
		return new Proxy(mod, {
			get(mod, prop) {
				if (prop === "default") return defaultExport;
				return mod[prop] ?? defaultExport?.[prop];
			},
			has(mod, prop) {
				if (prop === "default") return defaultExport !== void 0;
				return prop in mod || defaultExport && prop in defaultExport;
			},
			getOwnPropertyDescriptor(mod, prop) {
				const descriptor = Reflect.getOwnPropertyDescriptor(mod, prop);
				if (descriptor) return descriptor;
				if (prop === "default" && defaultExport !== void 0) return {
					value: defaultExport,
					enumerable: true,
					configurable: true
				};
			}
		});
	}
	async runInlinedModule(context, code, module) {
		return this._otel.$("vitest.module.inline", (span) => this._runInlinedModule(context, code, module, span));
	}
	_createCJSGlobals(context, module, span) {
		const { Reflect, Proxy, Object } = this.primitives;
		const exportsObject = context[ssrModuleExportsKey];
		const SYMBOL_NOT_DEFINED = Symbol("not defined");
		let moduleExports = SYMBOL_NOT_DEFINED;
		// this proxy is triggered only on exports.{name} and module.exports access
		// inside the module itself. imported module is always "exports"
		const cjsExports = new Proxy(exportsObject, {
			get: (target, p, receiver) => {
				if (Reflect.has(target, p)) return Reflect.get(target, p, receiver);
				return Reflect.get(Object.prototype, p, receiver);
			},
			getPrototypeOf: () => Object.prototype,
			set: (_, p, value) => {
				span.addEvent(`cjs export proxy is triggered for ${String(p)}`);
				// treat "module.exports =" the same as "exports.default =" to not have nested "default.default",
				// so "exports.default" becomes the actual module
				if (p === "default" && this.shouldInterop(module.file, { default: value }) && cjsExports !== value) {
					span.addEvent("`exports.default` is assigned, copying values");
					exportAll(cjsExports, value);
					exportsObject.default = value;
					return true;
				}
				if (!Reflect.has(exportsObject, "default")) exportsObject.default = {};
				// returns undefined, when accessing named exports, if default is not an object
				// but is still present inside hasOwnKeys, this is Node behaviour for CJS
				if (moduleExports !== SYMBOL_NOT_DEFINED && isPrimitive(moduleExports)) {
					span.addEvent(`\`exports.${String(p)}\` is assigned, but module.exports is a primitive. assigning "undefined" values instead to comply with ESM`);
					defineExport(exportsObject, p, () => void 0);
					return true;
				}
				if (!isPrimitive(exportsObject.default)) exportsObject.default[p] = value;
				if (p !== "default") defineExport(exportsObject, p, () => value);
				return true;
			}
		});
		return {
			exports: cjsExports,
			module: {
				set exports(value) {
					span.addEvent("`module.exports` is assigned directly, copying all properties to `exports`");
					exportAll(cjsExports, value);
					exportsObject.default = value;
					moduleExports = value;
				},
				get exports() {
					return cjsExports;
				}
			},
			require: this.createRequire(context[ssrImportMetaKey].url),
			__filename: context[ssrImportMetaKey].filename,
			__dirname: context[ssrImportMetaKey].dirname
		};
	}
	async _runInlinedModule(context, code, module, span) {
		const meta = context[ssrImportMetaKey];
		meta.env = this.env;
		const globalNamespace = this.vm?.context || globalThis;
		// `import.meta` defines evaluated by the runtime defines script;
		// `import.meta.env.*` entries are applied through `process.env` instead
		const metaDefines = globalNamespace.__vitest_worker__?.metaDefines;
		if (metaDefines) for (const key in metaDefines) {
			const segments = key.split(".");
			let target = meta;
			for (let i = 0; i < segments.length - 1; i++) target = target[segments[i]] || (target[segments[i]] = {});
			target[segments[segments.length - 1]] = metaDefines[key];
		}
		if (this.options.getCurrentTestFilepath?.() === module.file) Object.defineProperty(meta, "vitest", { 
		// @ts-expect-error injected untyped global
get: () => globalNamespace.__vitest_index__ });
		span.setAttribute("code.file.path", meta.filename);
		const __vite_ssr_exportName__ = context.__vite_ssr_exportName__ || ((name, getter) => Object.defineProperty(context[ssrModuleExportsKey], name, {
			enumerable: true,
			configurable: true,
			get: getter
		}));
		let __vite_track_exportName__;
		const getterTracker = this.getterTracker;
		if (getterTracker) __vite_track_exportName__ = getterTracker.createTracker(module.id, __vite_ssr_exportName__);
		const argumentsList = [
			ssrModuleExportsKey,
			ssrImportMetaKey,
			ssrImportKey,
			ssrDynamicImportKey,
			ssrExportAllKey,
			"__vite_ssr_exportName__"
		];
		const argumentsValues = [
			context[ssrModuleExportsKey],
			context[ssrImportMetaKey],
			context[ssrImportKey],
			context[ssrDynamicImportKey],
			context[ssrExportAllKey],
			__vite_track_exportName__ || __vite_ssr_exportName__
		];
		// TODO@discuss switch the default in Vitest 6(?)
		// backwards compat for vite-node
		const injectCjsGlobals = this.options.injectCjsGlobals !== false || module.meta?.moduleType === "cjs";
		if (injectCjsGlobals) {
			const cjsGlobals = this._createCJSGlobals(context, module, span);
			argumentsList.push("__filename", "__dirname", "module", "exports", "require");
			argumentsValues.push(cjsGlobals.__filename, cjsGlobals.__dirname, cjsGlobals.module, cjsGlobals.exports, cjsGlobals.require);
		}
		if (this.compiledFunctionArgumentsNames) argumentsList.push(...this.compiledFunctionArgumentsNames);
		if (this.compiledFunctionArgumentsValues) argumentsValues.push(...this.compiledFunctionArgumentsValues);
		span.setAttribute("vitest.module.arguments", argumentsList);
		// add 'use strict' since ESM enables it by default
		const codeDefinition = `'use strict';async (${argumentsList.join(",")})=>{{`;
		const wrappedCode = `${codeDefinition}${code}\n}}`;
		const options = {
			// use original id for auto spy module (vi.mock(..., { spy: true }))
			filename: module.id.startsWith("mock:") ? module.id.slice(5) : module.id,
			lineOffset: 0,
			columnOffset: -codeDefinition.length
		};
		// this will always be 1 element because it's cached after load
		const importer = module.importers.values().next().value;
		// Initialize execution info in case worker exited before module evaluation finished
		this.options.moduleExecutionInfo?.set(options.filename, {
			duration: 0,
			selfTime: 0,
			startOffset: codeDefinition.length,
			importer
		});
		const finishModuleExecutionInfo = this.debug.startCalculateModuleExecutionInfo(options.filename, {
			startOffset: codeDefinition.length,
			importer
		});
		try {
			await (this.vm ? getVmInlineScript(this.options.getEnvironmentName?.() ?? "", module.id, wrappedCode, options).runInContext(this.vm.context) : vm.runInThisContext(wrappedCode, options))(...argumentsValues);
		} catch (error) {
			if (!injectCjsGlobals) throw enhanceMissingCjsGlobalsError(error);
			throw error;
		} finally {
			// moduleExecutionInfo needs to use Node filename instead of the normalized one
			// because we rely on this behaviour in coverage-v8, for example
			this.options.moduleExecutionInfo?.set(options.filename, finishModuleExecutionInfo());
		}
	}
	createRequire(url) {
		if (url.startsWith("data:")) {
			const _require = (id) => {
				throw new SyntaxError(`require() is not supported in virtual modules. Trying to call require("${id}") in ${url}`);
			};
			_require.resolve = _require;
			return _require;
		}
		return this.vm ? this.vm.externalModulesExecutor.createRequire(url) : createRequire(url);
	}
	shouldInterop(path, mod) {
		if (this.options.interopDefault === false) return false;
		// never interop ESM modules
		// TODO: should also skip for `.js` with `type="module"`
		return !path.endsWith(".mjs") && "default" in mod;
	}
}
function createImportMetaEnvProxy() {
	// packages/vitest/src/node/plugins/index.ts:146
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
function updateStyle(id, css) {
	if (typeof document === "undefined") return;
	const element = document.querySelector(`[data-vite-dev-id="${id}"]`);
	if (element) {
		element.textContent = css;
		return;
	}
	const head = document.querySelector("head");
	const style = document.createElement("style");
	style.setAttribute("type", "text/css");
	style.setAttribute("data-vite-dev-id", id);
	style.textContent = css;
	head?.appendChild(style);
}
function removeStyle(id) {
	if (typeof document === "undefined") return;
	const sheet = document.querySelector(`[data-vite-dev-id="${id}"]`);
	if (sheet) document.head.removeChild(sheet);
}
function createHotContext() {
	return {
		data: {},
		accept: () => {},
		acceptExports: () => {},
		prune: () => {},
		dispose: () => {},
		decline: () => {},
		invalidate: () => {},
		on: () => {},
		off: () => {},
		send: () => {}
	};
}
const defaultClientStub = {
	injectQuery: (id) => id,
	createHotContext,
	updateStyle: () => {},
	removeStyle: () => {}
};
function getDefaultRequestStubs(context) {
	if (!context) return { "/@vite/client": {
		...defaultClientStub,
		updateStyle,
		removeStyle
	} };
	return { "/@vite/client": vm.runInContext(`(defaultClient) => ({ ...defaultClient, createHotContext: ${createHotContext.toString()}, updateStyle: ${updateStyle.toString()}, removeStyle: ${removeStyle.toString()} })`, context)(defaultClientStub) };
}
function exportAll(exports, sourceModule) {
	// #1120 when a module exports itself it causes
	// call stack error
	if (exports === sourceModule) return;
	if (isPrimitive(sourceModule) || Array.isArray(sourceModule) || sourceModule instanceof Promise) return;
	for (const key in sourceModule) if (key !== "default" && !(key in exports)) try {
		defineExport(exports, key, () => sourceModule[key]);
	} catch {}
}
// keep consistency with Vite on how exports are defined
function defineExport(exports, key, value) {
	Object.defineProperty(exports, key, {
		enumerable: true,
		configurable: true,
		get: value
	});
}
function isPrimitive(v) {
	return !(typeof v === "object" || typeof v === "function") || v == null;
}
function interopModule(mod) {
	if (isPrimitive(mod)) return {
		mod: { default: mod },
		defaultExport: mod
	};
	let defaultExport = "default" in mod ? mod.default : mod;
	if (!isPrimitive(defaultExport) && defaultExport.__esModule) {
		mod = defaultExport;
		if ("default" in defaultExport) defaultExport = defaultExport.default;
	}
	return {
		mod,
		defaultExport
	};
}
const CJS_GLOBALS_REFERENCE_ERROR_RE = /^(module|exports|require|__filename|__dirname) is not defined$/;
const ESM_HINTS = {
	module: "use \"export\" declarations instead of \"module.exports\"",
	exports: "use \"export\" declarations instead of \"exports\"",
	require: "use \"import\" declarations or \"createRequire(import.meta.url)\" instead of \"require\"",
	__filename: "use \"import.meta.filename\" instead of \"__filename\"",
	__dirname: "use \"import.meta.dirname\" instead of \"__dirname\""
};
function enhanceMissingCjsGlobalsError(error) {
	if (error == null || typeof error !== "object") return error;
	const referenceError = error;
	if (referenceError.name !== "ReferenceError" || typeof referenceError.message !== "string") return error;
	// the message is anchored, so already enhanced errors are not enhanced twice
	const name = referenceError.message.match(CJS_GLOBALS_REFERENCE_ERROR_RE)?.[1];
	if (!name) return error;
	const message = `${referenceError.message}\n\n"${name}" is a CommonJS variable that is not available in ES modules, and "injectCjsGlobals" is disabled. If this module is meant to be an ES module, ${ESM_HINTS[name]}. If it is meant to be a CommonJS module, use the ".cjs" file extension, set "type": "commonjs" in the nearest package.json, or externalize it with "server.deps.external".`;
	if (typeof referenceError.stack === "string") referenceError.stack = referenceError.stack.replace(referenceError.message, message);
	referenceError.message = message;
	return error;
}
const VALID_ID_PREFIX = `/@id/`;
const NULL_BYTE_PLACEHOLDER = `__x00__`;
function wrapId(id) {
	return id.startsWith(VALID_ID_PREFIX) ? id : VALID_ID_PREFIX + id.replace("\0", NULL_BYTE_PLACEHOLDER);
}
function unwrapId(id) {
	return id.startsWith(VALID_ID_PREFIX) ? id.slice(VALID_ID_PREFIX.length).replace(NULL_BYTE_PLACEHOLDER, "\0") : id;
}

export { VitestModuleEvaluator, createImportMetaEnvProxy, getDefaultRequestStubs, isPrimitive, unwrapId, wrapId };
