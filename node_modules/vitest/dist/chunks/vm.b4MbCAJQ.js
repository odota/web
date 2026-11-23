import { fileURLToPath, pathToFileURL } from 'node:url';
import v8 from 'node:v8';
import vm, { isContext, runInContext } from 'node:vm';
import { l as loadEnvironment, a as listenForErrors, e as emitModuleRunner } from './init.CO4AB7HZ.js';
import { distDir } from '../path.js';
import { createCustomConsole } from './console.CQZ877Hi.js';
import fs__default from 'node:fs';
import { createRequire, Module, isBuiltin } from 'node:module';
import { d as dirname, k as extname, b as basename, C as CSS_LANGS_RE, l as KNOWN_ASSET_RE, t as toArray, m as splitFileAndPostfix, n as normalize, o as isBareImport, r as resolve } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { l as lookupPackageScopeType } from './resolver.BzpmeQeT.js';
import { initSync, parse } from 'es-module-lexer';
import { dirname as dirname$1 } from 'node:path';
import { V as VITEST_VM_CONTEXT_SYMBOL, s as startVitestModuleRunner, c as createNodeImportMeta } from './index.Bi0NXYPf.js';
import { getDefaultRequestStubs } from '../module-evaluator.js';
import { b as setupEnv } from './setup-common.CqAQCXzx.js';
import { p as provideWorkerState } from './utils.DYj33du9.js';

/**
* Worker-wide cache of V8 code cache buffers for externalized modules.
*
* vm pools create a fresh executor per test file, so every externalized
* module is compiled and evaluated again in each fresh context. The compiled
* code has no per-context state — reusing its V8 code cache skips the
* re-parse/re-compile while the evaluation still happens per context.
*
* Entries are keyed by the module identifier and guarded by the exact source
* text, so an invalidated module that produces different code simply replaces
* its entry.
*/
class CodeCache {
	entries = /* @__PURE__ */ new Map();
	get(identifier, source) {
		const entry = this.entries.get(identifier);
		if (entry && entry.source === source) return entry.data;
	}
	/**
	* Stores the code cache produced by `produce` unless an entry for the same
	* source already exists. A `produce` failure is recorded as an empty entry,
	* so it is not retried on every fresh context.
	*/
	store(identifier, source, produce) {
		const entry = this.entries.get(identifier);
		if (entry && entry.source === source) return;
		let data;
		try {
			data = produce();
		} catch {
			data = void 0;
		}
		this.entries.set(identifier, {
			source,
			data
		});
	}
	delete(identifier) {
		this.entries.delete(identifier);
	}
	clear() {
		this.entries.clear();
	}
}
/**
* `node:v8` as seen inside the vm context: changing V8 flags invalidates every
* code cache produced so far, so `setFlagsFromString` also empties ours.
*/
function createV8ModuleWithCacheReset(v8, codeCache) {
	const patched = Object.create(Object.getPrototypeOf(v8), Object.getOwnPropertyDescriptors(v8));
	patched.setFlagsFromString = function setFlagsFromString(flags) {
		v8.setFlagsFromString(flags);
		codeCache.clear();
	};
	return patched;
}

function interopCommonJsModule(interopDefault, mod) {
	if (isPrimitive(mod) || Array.isArray(mod) || mod instanceof Promise) return {
		keys: [],
		moduleExports: {},
		defaultExport: mod
	};
	if (interopDefault !== false && "__esModule" in mod && !isPrimitive(mod.default)) {
		const defaultKets = Object.keys(mod.default);
		const moduleKeys = Object.keys(mod);
		const allKeys = /* @__PURE__ */ new Set([...defaultKets, ...moduleKeys]);
		allKeys.delete("default");
		// the namespace always provides its own synthetic 'module.exports'
		// export, shadowing a real property of that name (Node parity)
		allKeys.delete("module.exports");
		return {
			keys: Array.from(allKeys),
			moduleExports: new Proxy(mod, { get(mod, prop) {
				return mod[prop] ?? mod.default?.[prop];
			} }),
			defaultExport: mod
		};
	}
	return {
		keys: Object.keys(mod).filter((key) => key !== "default" && key !== "module.exports"),
		moduleExports: mod,
		defaultExport: mod
	};
}
function isPrimitive(obj) {
	return !(obj != null && (typeof obj === "object" || typeof obj === "function"));
}
const SyntheticModule = vm.SyntheticModule;
const SourceTextModule = vm.SourceTextModule;
// `SourceTextModule#hasAsyncGraph` marks the Node 24.9+ vm APIs required to
// load an ES module graph synchronously (`moduleRequests`, `linkRequests`,
// `instantiate`, synchronously-completing `evaluate`) — the same APIs Node
// itself uses for require(esm)
const supportsSyncEsmEvaluate = typeof SourceTextModule?.prototype.hasAsyncGraph === "function";
let lexerInitialized = false;
// Returns true when `source` contains ESM syntax: static import/export
// statements or `import.meta` (dynamic import is allowed in CJS and does not
// count). Returns false when the lexer cannot parse the source at all —
// native ESM would fail on it as well, so the CJS error should surface.
function hasEsmSyntax(source) {
	if (!lexerInitialized) {
		initSync();
		lexerInitialized = true;
	}
	try {
		return parse(source)[3];
	} catch {
		return false;
	}
}
// mirrors Node's require(esm) error codes so user-side catches work uniformly
function createRequireAsyncModuleError(identifier, detail) {
	const error = /* @__PURE__ */ new Error(`require() cannot be used to load ES Module ${identifier}: ${detail}. Use import() instead.`);
	error.code = "ERR_REQUIRE_ASYNC_MODULE";
	return error;
}
function createConcurrentRequireError(identifier) {
	const error = /* @__PURE__ */ new Error(`Cannot require() ES Module ${identifier} synchronously: it is currently being loaded by a concurrent import(). Await that import before calling require(), or import this module instead of requiring it.`);
	error.code = "ERR_REQUIRE_ESM";
	return error;
}
let activeVmExecutor;
function setActiveVmExecutor(executor) {
	activeVmExecutor = executor;
}
async function activeImportModuleDynamically(specifier, referencer) {
	if (!activeVmExecutor) throw new Error(`Cannot import "${specifier}": the test context was torn down.`);
	return activeVmExecutor.importModuleDynamically(specifier, referencer);
}
// Node never collects a vm context in which multiple scripts installed
// closures, and `vm.SourceTextModule`s are pinned by the realm's base object
// list: the ContextifyContext/ModuleWrap wrappers keep the whole context
// reachable even through forced full GCs, so a long-lived vm worker
// accumulates every test file's world until it hits `vmMemoryLimit` and gets
// recycled, destroying the worker's compile caches with it. Clearing what the
// test file added to the global object (and the DOM) caps what a pinned
// context retains. Pristine globals are kept so that work queued before the
// teardown (jsdom events, worker-scoped fixture cleanups) can still run.
const captureKeysScript = new vm.Script(`Object.getOwnPropertyNames(globalThis).concat(Object.getOwnPropertySymbols(globalThis))`, { filename: "virtual:vitest-capture-context-keys.js" });
function captureContextKeys(context) {
	try {
		return new Set(captureKeysScript.runInContext(context));
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
const stripScript = new vm.Script(`(initialKeys) => {
  const g = globalThis
  try { g.document.body.textContent = '' } catch {}
  try { g.document.head.textContent = '' } catch {}
  let keys = []
  try { keys = Object.getOwnPropertyNames(g).concat(Object.getOwnPropertySymbols(g)) } catch {}
  for (const key of keys) {
    if (initialKeys.has(key)) continue
    try { delete g[key] } catch {}
  }
}`, { filename: "virtual:vitest-strip-context.js" });
function stripDisposedContext(context, initialKeys) {
	try {
		stripScript.runInContext(context)(initialKeys);
	} catch {}
}

const _require = createRequire(import.meta.url);
// Thrown when the CJS parser rejects a .js file that may contain ESM syntax.
// `loadCommonJSModule` catches it and retries the file as an ES module,
// mirroring Node's own require() ESM-syntax fallback for .js files without
// an ESM package scope. The original error is in `cause`.
class CjsParseError extends SyntaxError {
	name = "CjsParseError";
	constructor(cause) {
		super(cause.message, { cause });
	}
}
const requiresCache = /* @__PURE__ */ new WeakMap();
// Compiled scripts of commonjs modules, shared across vm contexts: only the
// evaluation has to happen per context. No invalidation is needed because
// watch mode reruns destroy the worker.
const cjsScriptCache = /* @__PURE__ */ new Map();
class CommonjsExecutor {
	context;
	requireCache = /* @__PURE__ */ new Map();
	publicRequireCache = this.createProxyCache();
	moduleCache = /* @__PURE__ */ new Map();
	builtinCache = Object.create(null);
	extensions = Object.create(null);
	fs;
	codeCache;
	Module;
	interopDefault;
	shouldRequireAsEsm;
	requireEsm;
	// .js files that the ESM-syntax fallback already loaded as ES modules,
	// so later require() calls skip the guaranteed-to-fail CJS parse
	esmSyntaxFallbackFiles = /* @__PURE__ */ new Set();
	constructor(options) {
		this.context = options.context;
		this.fs = options.fileMap;
		this.codeCache = options.codeCache;
		this.interopDefault = options.interopDefault;
		this.shouldRequireAsEsm = options.shouldRequireAsEsm;
		this.requireEsm = options.requireEsm;
		const primitives = vm.runInContext("({ Object, Array, Error })", this.context);
		// oxlint-disable-next-line typescript/no-this-alias
		const executor = this;
		this.Module = class Module$1 {
			exports;
			isPreloading = false;
			id;
			filename;
			loaded;
			parent;
			children = [];
			path;
			paths = [];
			constructor(id = "", parent) {
				this.exports = primitives.Object.create(primitives.Object.prototype);
				// in our case the path should always be resolved already
				this.path = dirname(id);
				this.id = id;
				this.filename = id;
				this.loaded = false;
				this.parent = parent;
			}
			get require() {
				const require = requiresCache.get(this);
				if (require) return require;
				const _require = Module$1.createRequire(this.id);
				requiresCache.set(this, _require);
				return _require;
			}
			static getSourceMapsSupport = () => ({
				enabled: false,
				nodeModules: false,
				generatedCode: false
			});
			static setSourceMapsSupport = () => {
				// noop
			};
			static register = () => {
				throw new Error(`[vitest] "register" is not available when running in Vitest.`);
			};
			static registerHooks = () => {
				throw new Error(`[vitest] "registerHooks" is not available when running in Vitest.`);
			};
			_compile(code, filename) {
				const cjsModule = Module$1.wrap(code);
				const codeCache = executor.codeCache;
				let script = cjsScriptCache.get(filename);
				if (!script) {
					const cachedData = codeCache?.get(filename, cjsModule);
					// the dynamic import callback is a static function (the executor is
					// resolved when it is called), so the compiled script holds no
					// per-context state and can be reused by every vm context
					try {
						script = new vm.Script(cjsModule, {
							filename,
							cachedData,
							importModuleDynamically: activeImportModuleDynamically
						});
					} catch (error) {
						if (error instanceof SyntaxError && executor.canFallbackToEsm(filename)) throw new CjsParseError(error);
						throw error;
					}
					if (cachedData && script.cachedDataRejected) codeCache.delete(filename);
					// @ts-expect-error mark script with current identifier
					script.identifier = filename;
					cjsScriptCache.set(filename, script);
				}
				const fn = script.runInContext(executor.context);
				const __dirname = dirname(filename);
				executor.requireCache.set(filename, this);
				try {
					fn.call(this.exports, this.exports, this.require, this, filename, __dirname);
					return this.exports;
				} finally {
					this.loaded = true;
					// store after execution so the code cache carries the compiled
					// module body, not only the lazily-parsed wrapper
					codeCache?.store(filename, cjsModule, () => script.createCachedData());
				}
			}
			// exposed for external use, Node.js does the opposite
			static _load = (request, parent, _isMain) => {
				return Module$1.createRequire(parent?.filename ?? request)(request);
			};
			static wrap = (script) => {
				return Module$1.wrapper[0] + script + Module$1.wrapper[1];
			};
			static wrapper = new primitives.Array("(function (exports, require, module, __filename, __dirname) { ", "\n});");
			static builtinModules = Module.builtinModules;
			static findSourceMap = Module.findSourceMap;
			static SourceMap = Module.SourceMap;
			static syncBuiltinESMExports = Module.syncBuiltinESMExports;
			static _cache = executor.publicRequireCache;
			static _extensions = executor.extensions;
			static createRequire = (filename) => {
				return executor.createRequire(filename);
			};
			static runMain = () => {
				throw new primitives.Error("[vitest] \"runMain\" is not implemented.");
			};
			// @ts-expect-error not typed
			static _resolveFilename = Module._resolveFilename;
			// @ts-expect-error not typed
			static _findPath = Module._findPath;
			// @ts-expect-error not typed
			static _initPaths = Module._initPaths;
			// @ts-expect-error not typed
			static _preloadModules = Module._preloadModules;
			// @ts-expect-error not typed
			static _resolveLookupPaths = Module._resolveLookupPaths;
			// @ts-expect-error not typed
			static globalPaths = Module.globalPaths;
			static isBuiltin = Module.isBuiltin;
			static constants = Module.constants;
			static enableCompileCache = Module.enableCompileCache;
			static getCompileCacheDir = Module.getCompileCacheDir;
			static flushCompileCache = Module.flushCompileCache;
			static stripTypeScriptTypes = Module.stripTypeScriptTypes;
			static findPackageJSON = Module.findPackageJSON;
			static Module = Module$1;
		};
		this.extensions[".js"] = this.requireJs;
		this.extensions[".json"] = this.requireJson;
	}
	requireJs = (m, filename) => {
		const content = this.fs.readFile(filename);
		const code = content.startsWith("#!") ? `//${content.slice(2)}` : content;
		m._compile(code, filename);
	};
	requireJson = (m, filename) => {
		const code = this.fs.readFile(filename);
		m.exports = JSON.parse(code);
	};
	static cjsConditions;
	static getCjsConditions() {
		if (!CommonjsExecutor.cjsConditions) CommonjsExecutor.cjsConditions = parseCjsConditions(process.execArgv, process.env.NODE_OPTIONS, supportsSyncEsmEvaluate);
		return CommonjsExecutor.cjsConditions;
	}
	createRequire = (filename) => {
		const _require = createRequire(filename);
		const resolve = (id, options) => {
			return _require.resolve(id, {
				...options,
				// Works on Node 22.12+ where _resolveFilename supports conditions.
				// Silently ignored on older Node versions.
				conditions: CommonjsExecutor.getCjsConditions()
			});
		};
		const require = ((id) => {
			const resolved = resolve(id);
			if (extname(resolved) === ".node" || isBuiltin(resolved)) return this.requireCoreModule(resolved);
			if (this.shouldRequireAsEsm(resolved)) return this.requireEsm(resolved);
			const module = new this.Module(resolved);
			return this.loadCommonJSModule(module, resolved);
		});
		require.resolve = resolve;
		require.resolve.paths = _require.resolve.paths;
		Object.defineProperty(require, "extensions", {
			get: () => this.extensions,
			set: () => {},
			configurable: true
		});
		require.main = void 0;
		require.cache = this.publicRequireCache;
		return require;
	};
	createProxyCache() {
		return new Proxy(Object.create(null), {
			defineProperty: () => true,
			deleteProperty: () => true,
			set: () => true,
			get: (_, key) => this.requireCache.get(key),
			has: (_, key) => this.requireCache.has(key),
			ownKeys: () => Array.from(this.requireCache.keys()),
			getOwnPropertyDescriptor() {
				return {
					configurable: true,
					enumerable: true
				};
			}
		});
	}
	// very naive implementation for Node.js require
	loadCommonJSModule(module, filename) {
		const cached = this.requireCache.get(filename);
		if (cached) return cached.exports;
		if (this.esmSyntaxFallbackFiles.has(filename)) return this.requireEsm(filename);
		const extension = this.findLongestRegisteredExtension(filename);
		const loader = this.extensions[extension] || this.extensions[".js"];
		try {
			loader(module, filename);
		} catch (error) {
			if (error instanceof CjsParseError) return this.fallbackRequireEsm(filename, error);
			throw error;
		}
		return module.exports;
	}
	canFallbackToEsm(filename) {
		return supportsSyncEsmEvaluate && extname(filename) === ".js";
	}
	fallbackRequireEsm(filename, parseError) {
		let exports;
		try {
			exports = this.requireEsm(filename);
		} catch (esmError) {
			// both parsers rejected the file — surface the original CJS error
			if (esmError instanceof SyntaxError) throw parseError.cause;
			throw esmError;
		}
		this.esmSyntaxFallbackFiles.add(filename);
		return exports;
	}
	findLongestRegisteredExtension(filename) {
		const name = basename(filename);
		let currentExtension;
		let index;
		let startIndex = 0;
		// oxlint-disable-next-line no-cond-assign
		while ((index = name.indexOf(".", startIndex)) !== -1) {
			startIndex = index + 1;
			if (index === 0) continue;
			currentExtension = name.slice(index);
			if (this.extensions[currentExtension]) return currentExtension;
		}
		return ".js";
	}
	getCoreSyntheticModule(identifier) {
		if (this.moduleCache.has(identifier)) return this.moduleCache.get(identifier);
		const exports = this.require(identifier);
		const keys = Object.keys(exports);
		const module = new SyntheticModule([...keys, "default"], () => {
			for (const key of keys) module.setExport(key, exports[key]);
			module.setExport("default", exports);
		}, {
			context: this.context,
			identifier
		});
		this.moduleCache.set(identifier, module);
		return module;
	}
	syncBuiltinESMExports() {
		Module.syncBuiltinESMExports();
		for (const [identifier, module] of this.moduleCache) {
			if (!isBuiltin(identifier) || module.status !== "evaluated") continue;
			const exports = this.require(identifier);
			for (const key of Object.keys(module.namespace)) if (key !== "default") module.setExport(key, exports[key]);
		}
	}
	getCjsSyntheticModule(path, identifier) {
		if (this.moduleCache.has(identifier)) return this.moduleCache.get(identifier);
		const exports = this.require(path);
		// TODO: technically module should be parsed to find static exports, implement for strict mode in #2854
		const { keys, moduleExports, defaultExport } = interopCommonJsModule(this.interopDefault, exports);
		const module = new SyntheticModule([
			...keys,
			"default",
			"module.exports"
		], function() {
			for (const key of keys) this.setExport(key, moduleExports[key]);
			this.setExport("default", defaultExport);
			// the raw module.exports value, mirroring the handling of the
			// 'module.exports' export name in require(esm) interop:
			// https://nodejs.org/api/esm.html#commonjs-namespaces
			this.setExport("module.exports", exports);
		}, {
			context: this.context,
			identifier
		});
		this.moduleCache.set(identifier, module);
		return module;
	}
	// TODO: use this in strict mode, when available in #2854
	// private _getNamedCjsExports(path: string): Set<string> {
	//   const cachedNamedExports = this.cjsNamedExportsMap.get(path)
	//   if (cachedNamedExports) {
	//     return cachedNamedExports
	//   }
	//   if (extname(path) === '.node') {
	//     const moduleExports = this.require(path)
	//     const namedExports = new Set(Object.keys(moduleExports))
	//     this.cjsNamedExportsMap.set(path, namedExports)
	//     return namedExports
	//   }
	//   const code = this.fs.readFile(path)
	//   const { exports, reexports } = parseCjs(code, path)
	//   const namedExports = new Set(exports)
	//   this.cjsNamedExportsMap.set(path, namedExports)
	//   for (const reexport of reexports) {
	//     if (isNodeBuiltin(reexport)) {
	//       const exports = this.require(reexport)
	//       if (exports !== null && typeof exports === 'object') {
	//         for (const e of Object.keys(exports)) {
	//           namedExports.add(e)
	//         }
	//       }
	//     }
	//     else {
	//       const require = this.createRequire(path)
	//       const resolved = require.resolve(reexport)
	//       const exports = this._getNamedCjsExports(resolved)
	//       for (const e of exports) {
	//         namedExports.add(e)
	//       }
	//     }
	//   }
	//   return namedExports
	// }
	require(identifier) {
		if (extname(identifier) === ".node" || isBuiltin(identifier)) return this.requireCoreModule(identifier);
		if (this.shouldRequireAsEsm(identifier)) return this.requireEsm(identifier);
		const module = new this.Module(identifier);
		return this.loadCommonJSModule(module, identifier);
	}
	requireCoreModule(identifier) {
		const normalized = identifier.replace(/^node:/, "");
		if (this.builtinCache[normalized]) return this.builtinCache[normalized].exports;
		const moduleExports = _require(identifier);
		if (identifier === "node:module" || identifier === "module") {
			const module = new this.Module("/module.js");
			module.exports = this.Module;
			this.builtinCache[normalized] = module;
			return module.exports;
		}
		if (normalized === "v8" && this.codeCache) {
			const module = new this.Module("/v8.js");
			module.exports = createV8ModuleWithCacheReset(moduleExports, this.codeCache);
			this.builtinCache[normalized] = module;
			return module.exports;
		}
		this.builtinCache[normalized] = _require.cache[normalized];
		// TODO: should we wrap module to rethrow context errors?
		return moduleExports;
	}
}
// The "module-sync" exports condition (added in Node 22.12/20.19 when
// require(esm) was unflagged) can resolve to ESM files. When require(esm)
// is supported (Node 24.9+), the condition is included, matching Node.
// Otherwise our CJS vm.Script executor cannot handle the resolved ESM
// files, so the condition is excluded by passing explicit CJS conditions
// to require.resolve (Node 22.12+).
// Must be a Set because Node's internal resolver calls conditions.has().
function parseCjsConditions(execArgv, nodeOptions, requireEsmSupported = false) {
	const conditions = [
		"node",
		"require",
		"node-addons"
	];
	if (requireEsmSupported) conditions.push("module-sync");
	const args = [...execArgv, ...nodeOptions?.split(/\s+/) ?? []];
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		const eqMatch = arg.match(/^(?:--conditions|-C)=(.+)$/);
		if (eqMatch) conditions.push(eqMatch[1]);
		else if ((arg === "--conditions" || arg === "-C") && i + 1 < args.length) conditions.push(args[++i]);
	}
	if (!requireEsmSupported) return new Set(conditions.filter((c) => c !== "module-sync"));
	return new Set(conditions);
}

// `hasAsyncGraph` only exists on SourceTextModule — a SyntheticModule is
// synchronous by definition (its evaluation callback is sync)
function moduleHasAsyncGraph(module) {
	return module instanceof SourceTextModule && module.hasAsyncGraph();
}
const dataURIRegex = /^data:(?<mime>text\/javascript|application\/json|application\/wasm)(?:;(?<encoding>charset=utf-8|base64))?,(?<code>.*)$/;
function parseDataUri(identifier) {
	const match = identifier.match(dataURIRegex);
	if (!match || !match.groups) throw new Error("Invalid data URI");
	const { mime, encoding } = match.groups;
	let code = match.groups.code;
	if (mime === "application/wasm") {
		if (!encoding) throw new Error("Missing data URI encoding");
		if (encoding !== "base64") throw new Error(`Invalid data URI encoding: ${encoding}`);
		return {
			mime,
			code: Buffer.from(code, "base64")
		};
	}
	if (!encoding || encoding === "charset=utf-8") code = decodeURIComponent(code);
	else if (encoding === "base64") code = Buffer.from(code, "base64").toString();
	else throw new Error(`Invalid data URI encoding: ${encoding}`);
	return {
		mime,
		code
	};
}
function getContextExecutor(mod) {
	const vmContext = mod.context?.[VITEST_VM_CONTEXT_SYMBOL];
	if (!vmContext) throw new Error(`Cannot import "${mod.identifier}": its vm context was torn down.`);
	return vmContext.externalModulesExecutor;
}
async function staticImportModuleDynamically(specifier, referencer) {
	return getContextExecutor(referencer).importModuleDynamically(specifier, referencer);
}
function staticInitializeImportMeta(meta, mod) {
	meta.url = mod.identifier;
	if (mod.identifier.startsWith("file:")) {
		const filename = fileURLToPath(mod.identifier);
		meta.filename = filename;
		meta.dirname = dirname$1(filename);
	}
	meta.resolve = (specifier, importer) => {
		return getContextExecutor(mod).resolve(specifier, importer != null ? importer.toString() : mod.identifier);
	};
}
class EsmExecutor {
	executor;
	moduleCache = /* @__PURE__ */ new Map();
	esmLinkMap = /* @__PURE__ */ new WeakMap();
	linkQueue = Promise.resolve();
	context;
	#httpIp = IPnumber("127.0.0.0");
	constructor(executor, options) {
		this.executor = executor;
		this.context = options.context;
	}
	async evaluateModule(m) {
		// a module that failed to evaluate keeps living in the cache — rethrow
		// its error instead of silently returning an unusable namespace
		if (m.status === "errored") throw m.error;
		await this.linkModule(m);
		if (m.status === "linked") await m.evaluate();
		return m;
	}
	// Roots are linked one at a time: Node's link() does not wait for a
	// dependency that another root is still linking, and instantiate() then
	// fails on it. Sharing the queue with all roots keeps cycle handling to
	// Node's own single-root linker, which never has to wait.
	linkModule(m) {
		const pending = this.esmLinkMap.get(m);
		if (pending) return pending;
		if (m.status !== "unlinked" && m.status !== "linking") return Promise.resolve();
		const linking = this.linkQueue.then(() => {
			if (m.status === "unlinked") return m.link(this.linker);
		});
		this.esmLinkMap.set(m, linking);
		this.linkQueue = linking.catch(() => {});
		return linking;
	}
	linker = (identifier, referencer) => this.executor.resolveModule(identifier, referencer.identifier);
	async createEsModule(fileURL, getCode) {
		const cached = this.moduleCache.get(fileURL);
		if (cached) return cached;
		const promise = this.loadEsModule(fileURL, getCode);
		this.moduleCache.set(fileURL, promise);
		return promise;
	}
	loadEsModule(fileURL, getCode) {
		const code = getCode();
		if (code instanceof Promise) return code.then((content) => this.createModule(fileURL, content));
		return this.createModule(fileURL, code);
	}
	createModule(fileURL, code) {
		const module = fileURL.endsWith(".json") ? this.createJsonModule(fileURL, code) : this.createSourceTextModule(fileURL, code);
		this.moduleCache.set(fileURL, module);
		return module;
	}
	createSourceTextModule(fileURL, code) {
		const codeCache = this.executor.codeCache;
		let cachedData = codeCache?.get(fileURL, code);
		const options = {
			identifier: fileURL,
			context: this.context,
			// static callbacks: Node keeps them registered for as long as the
			// module's host-defined-options symbol is alive, so a closure here would
			// retain this executor (and the whole test file's world) beyond the
			// file's lifetime. The executor is recovered from the module's context
			// at call time instead.
			importModuleDynamically: staticImportModuleDynamically,
			initializeImportMeta: staticInitializeImportMeta
		};
		let m;
		if (cachedData) try {
			m = new SourceTextModule(code, {
				...options,
				cachedData
			});
		} catch (error) {
			// unlike vm.Script, a module throws when V8 rejects the cache (e.g. the
			// V8 flags changed at runtime): compile from source instead
			if (error?.code !== "ERR_VM_MODULE_CACHED_DATA_REJECTED") throw error;
			codeCache.delete(fileURL);
			cachedData = void 0;
		}
		m ??= new SourceTextModule(code, options);
		// the code cache of a SourceTextModule must be created before evaluation
		if (!cachedData) {
			const created = m;
			codeCache?.store(fileURL, code, () => created.createCachedData());
		}
		return m;
	}
	// Loads an ES module graph synchronously for require(esm), mirroring Node's
	// own behaviour on Node 24.9+. The graph is collected into a local scratch
	// map first and committed to the module cache only after the whole graph is
	// proven to be synchronously evaluable, so a failed require() does not
	// poison the cache for a later import() of the same file.
	requireEsModuleSync(rootIdentifier) {
		const cachedRoot = this.moduleCache.get(rootIdentifier);
		if (cachedRoot) return this.reuseSyncModule(rootIdentifier, cachedRoot);
		const scratch = /* @__PURE__ */ new Map();
		const worklist = [rootIdentifier];
		while (worklist.length > 0) {
			const identifier = worklist.pop();
			if (scratch.has(identifier)) continue;
			const cached = this.moduleCache.get(identifier);
			if (cached) {
				scratch.set(identifier, {
					module: this.reuseSyncModule(identifier, cached),
					commit: false
				});
				continue;
			}
			const disposition = identifier.startsWith("data:") ? this.materializeSyncDataModule(identifier) : this.executor.materializeSyncModule(identifier, identifier === rootIdentifier);
			if (disposition.kind === "ready") {
				scratch.set(identifier, {
					module: disposition.module,
					commit: false
				});
				continue;
			}
			if (disposition.kind === "json") {
				scratch.set(identifier, {
					module: this.createJsonModule(identifier, disposition.code),
					commit: true
				});
				continue;
			}
			const module = this.createSourceTextModule(identifier, disposition.code);
			if (module.hasTopLevelAwait()) throw createRequireAsyncModuleError(identifier, "the module uses top-level await");
			const deps = [];
			for (const request of module.moduleRequests) {
				const depIdentifier = this.executor.resolveSyncSpecifier(request.specifier, identifier);
				deps.push(depIdentifier);
				if (!scratch.has(depIdentifier)) worklist.push(depIdentifier);
			}
			scratch.set(identifier, {
				module,
				deps,
				commit: true
			});
		}
		for (const entry of scratch.values()) if (entry.deps) entry.module.linkRequests(entry.deps.map((dep) => scratch.get(dep).module));
		const root = scratch.get(rootIdentifier);
		if (root.deps) root.module.instantiate();
		if (moduleHasAsyncGraph(root.module)) {
			// top-level await is rejected per module during the walk, so this is a
			// defensive check that an async graph never reaches the sync evaluate
			let culprit = rootIdentifier;
			for (const [identifier, entry] of scratch) if (entry.deps && entry.module.hasTopLevelAwait()) {
				culprit = identifier;
				break;
			}
			throw createRequireAsyncModuleError(rootIdentifier, culprit === rootIdentifier ? "the module uses top-level await" : `its dependency uses top-level await (${culprit})`);
		}
		for (const [identifier, entry] of scratch) if (entry.commit && !this.moduleCache.has(identifier)) this.moduleCache.set(identifier, entry.module);
		// with no top-level await in the graph, evaluate() fulfills synchronously
		// and an evaluation error lands on `status`/`error`, not on the promise
		root.module.evaluate().catch(() => {});
		if (root.module.status === "errored") throw root.module.error;
		if (root.module.status !== "evaluated") throw new Error(`[vitest] Expected synchronous evaluation to complete for ${rootIdentifier}, but module status is "${root.module.status}". This is a bug in Vitest.`);
		return root.module;
	}
	// A cached module is reusable by the sync walker only when it is settled:
	// anything else (a pending Promise or a module in 'unlinked' → 'evaluating')
	// is a concurrent import() mid-flight that a synchronous require() can
	// neither await nor safely link against.
	reuseSyncModule(identifier, cached) {
		if (cached instanceof Promise) throw createConcurrentRequireError(identifier);
		if (cached.status === "errored") throw cached.error;
		if (cached.status !== "evaluated") throw createConcurrentRequireError(identifier);
		// a module with top-level await reports 'evaluated' as soon as evaluate()
		// is called, while its async evaluation may still be pending — and even a
		// settled async graph is never allowed in require() (Node parity)
		if (moduleHasAsyncGraph(cached)) throw createRequireAsyncModuleError(identifier, "the module uses top-level await");
		return cached;
	}
	materializeSyncDataModule(identifier) {
		const { mime, code } = parseDataUri(identifier);
		if (mime === "application/wasm") throw createRequireAsyncModuleError(identifier, "WebAssembly modules cannot be loaded synchronously");
		if (mime === "application/json") return {
			kind: "json",
			code
		};
		return {
			kind: "source",
			code
		};
	}
	createJsonModule(identifier, code) {
		return new SyntheticModule(["default"], function() {
			this.setExport("default", JSON.parse(code));
		}, {
			context: this.context,
			identifier
		});
	}
	async createWebAssemblyModule(fileUrl, getCode) {
		const cached = this.moduleCache.get(fileUrl);
		if (cached) return cached;
		const m = this.loadWebAssemblyModule(getCode(), fileUrl);
		this.moduleCache.set(fileUrl, m);
		return m;
	}
	async createNetworkModule(fileUrl) {
		// https://nodejs.org/api/esm.html#https-and-http-imports
		if (fileUrl.startsWith("http:")) {
			const url = new URL(fileUrl);
			if (url.hostname !== "localhost" && url.hostname !== "::1" && (IPnumber(url.hostname) & IPmask(8)) !== this.#httpIp) throw new Error(
				// we don't know the importer, so it's undefined (the same happens in --pool=threads)
				`import of '${fileUrl}' by undefined is not supported: http can only be used to load local resources (use https instead).`
			);
		}
		return this.createEsModule(fileUrl, () => fetch(fileUrl).then((r) => r.text()));
	}
	async loadWebAssemblyModule(source, identifier) {
		const cached = this.moduleCache.get(identifier);
		if (cached) return cached;
		const wasmModule = await WebAssembly.compile(source);
		const exports = WebAssembly.Module.exports(wasmModule);
		const imports = WebAssembly.Module.imports(wasmModule);
		const moduleLookup = {};
		for (const { module } of imports) if (moduleLookup[module] === void 0) moduleLookup[module] = await this.executor.resolveModule(module, identifier);
		const evaluateModule = (module) => this.evaluateModule(module);
		return new SyntheticModule(exports.map(({ name }) => name), async function() {
			const importsObject = {};
			for (const { module, name } of imports) {
				if (!importsObject[module]) importsObject[module] = {};
				await evaluateModule(moduleLookup[module]);
				importsObject[module][name] = moduleLookup[module].namespace[name];
			}
			const wasmInstance = new WebAssembly.Instance(wasmModule, importsObject);
			for (const { name } of exports) this.setExport(name, wasmInstance.exports[name]);
		}, {
			context: this.context,
			identifier
		});
	}
	cacheModule(identifier, module) {
		this.moduleCache.set(identifier, module);
	}
	resolveCachedModule(identifier) {
		return this.moduleCache.get(identifier);
	}
	async createDataModule(identifier) {
		const cached = this.moduleCache.get(identifier);
		if (cached) return cached;
		const { mime, code } = parseDataUri(identifier);
		if (mime === "application/wasm") {
			const module = this.loadWebAssemblyModule(code, identifier);
			this.moduleCache.set(identifier, module);
			return module;
		}
		if (mime === "application/json") {
			const module = this.createJsonModule(identifier, code);
			this.moduleCache.set(identifier, module);
			return module;
		}
		return this.createEsModule(identifier, () => code);
	}
}
function IPnumber(address) {
	const ip = address.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
	if (ip) return (+ip[1] << 24) + (+ip[2] << 16) + (+ip[3] << 8) + +ip[4];
	throw new Error(`Expected IP address, received ${address}`);
}
function IPmask(maskSize) {
	return -1 << 32 - maskSize;
}

const CLIENT_ID = "/@vite/client";
const CLIENT_FILE = pathToFileURL(CLIENT_ID).href;
class ViteExecutor {
	options;
	esm;
	constructor(options) {
		this.options = options;
		this.esm = options.esmExecutor;
	}
	resolve = (identifier) => {
		if (identifier === CLIENT_ID) return identifier;
	};
	get workerState() {
		return this.options.context.__vitest_worker__;
	}
	async createViteModule(fileUrl) {
		if (fileUrl === CLIENT_FILE || fileUrl === CLIENT_ID) return this.createViteClientModule();
		const cached = this.esm.resolveCachedModule(fileUrl);
		if (cached) return cached;
		return this.esm.createEsModule(fileUrl, async () => {
			try {
				const result = await this.options.transform(fileUrl);
				if (result.code) return result.code;
			} catch (cause) {
				// rethrow vite error if it cannot load the module because it's not resolved
				if (typeof cause === "object" && cause.code === "ERR_LOAD_URL" || typeof cause?.message === "string" && cause.message.includes("Failed to load url")) {
					const error = new Error(`Cannot find module '${fileUrl}'`, { cause });
					error.code = "ERR_MODULE_NOT_FOUND";
					throw error;
				}
			}
			throw new Error(`[vitest] Failed to transform ${fileUrl}. Does the file exist?`);
		});
	}
	createViteClientModule() {
		const identifier = CLIENT_ID;
		const cached = this.esm.resolveCachedModule(identifier);
		if (cached) return cached;
		const stub = this.options.viteClientModule;
		const moduleKeys = Object.keys(stub);
		const module = new SyntheticModule(moduleKeys, function() {
			moduleKeys.forEach((key) => {
				this.setExport(key, stub[key]);
			});
		}, {
			context: this.options.context,
			identifier
		});
		this.esm.cacheModule(identifier, module);
		return module;
	}
	canResolve = (fileUrl) => {
		if (fileUrl === CLIENT_FILE) return true;
		const config = this.workerState.config.deps?.web || {};
		const [modulePath] = fileUrl.split("?");
		if (config.transformCss && CSS_LANGS_RE.test(modulePath)) return true;
		if (config.transformAssets && KNOWN_ASSET_RE.test(modulePath)) return true;
		if (toArray(config.transformGlobPattern).some((pattern) => pattern.test(modulePath))) return true;
		return false;
	};
}

const { existsSync } = fs__default;
// always defined when we use vm pool
const nativeResolve = import.meta.resolve;
// a relative ESM specifier resolves by plain URL join — Node's resolver adds
// no information for these (it does not check existence and relative
// specifiers never consult package.json), but it re-derives the package
// scope on every uncached call, re-parsing large `exports` maps. Restricted
// to a conservative charset so anything URL-special falls back to Node.
const SIMPLE_RELATIVE_SPECIFIER_RE = /^\.{1,2}\/[\w\-./]+$/;
// TODO: improve Node.js strict mode support in #2854
class ExternalModulesExecutor {
	options;
	cjs;
	esm;
	vite;
	context;
	fs;
	codeCache;
	resolvers = [];
	#networkSupported = null;
	constructor(options) {
		this.options = options;
		this.context = options.context;
		this.fs = options.fileMap;
		this.codeCache = options.codeCache;
		this.esm = new EsmExecutor(this, { context: this.context });
		setActiveVmExecutor(this);
		this.cjs = new CommonjsExecutor({
			context: this.context,
			fileMap: options.fileMap,
			codeCache: options.codeCache,
			interopDefault: options.interopDefault,
			shouldRequireAsEsm: this.shouldRequireAsEsm,
			requireEsm: this.requireEsm
		});
		this.vite = new ViteExecutor({
			esmExecutor: this.esm,
			context: this.context,
			transform: options.transform,
			viteClientModule: options.viteClientModule
		});
		this.resolvers = [this.vite.resolve];
	}
	syncBuiltinESMExports() {
		this.cjs.syncBuiltinESMExports();
	}
	async import(identifier) {
		const module = await this.createModule(identifier);
		await this.esm.evaluateModule(module);
		return module.namespace;
	}
	require(identifier) {
		return this.cjs.require(identifier);
	}
	createRequire(identifier) {
		return this.cjs.createRequire(identifier);
	}
	#esmSyntaxCache = /* @__PURE__ */ new Map();
	// require() dispatches to the sync ESM loader only for files that are
	// explicitly marked as ESM (.mjs or a "type": "module" package scope).
	// JSON files keep the CJS json loader for Node require() parity — the
	// extension wins over the package scope.
	shouldRequireAsEsm = (resolvedPath) => {
		if (!supportsSyncEsmEvaluate) return false;
		const information = this.getModuleInformation(resolvedPath);
		if (information.type !== "module" || information.path.endsWith(".json")) return false;
		if (information.path.endsWith(".mjs")) return true;
		// A .js file in an ESM package scope may still contain plain CJS code —
		// Node evaluates it as ESM with injected CJS module variables (module,
		// require, __filename), which a vm SourceTextModule cannot emulate.
		// Files without ESM syntax keep loading through the CJS executor; a
		// false negative here is corrected by its ESM-syntax fallback.
		let syntax = this.#esmSyntaxCache.get(information.path);
		if (syntax == null) {
			syntax = hasEsmSyntax(this.fs.readFile(information.path));
			this.#esmSyntaxCache.set(information.path, syntax);
		}
		return syntax;
	};
	requireEsm = (resolvedPath) => {
		const { url } = this.getModuleInformation(resolvedPath);
		const namespace = this.esm.requireEsModuleSync(url).namespace;
		// Node parity: an ES module can define its own require() result with an
		// export named "module.exports"
		return "module.exports" in namespace ? namespace["module.exports"] : namespace;
	};
	resolveSyncSpecifier = (specifier, referencer) => {
		const resolved = this.resolve(specifier, referencer);
		if (resolved instanceof Promise) throw createRequireAsyncModuleError(referencer, `"${specifier}" cannot be resolved synchronously`);
		return resolved;
	};
	// the sync counterpart of `createModule`, used by the require(esm) graph
	// walker. `forceEsmSource` loads a 'commonjs'-typed file as ES module
	// source — the CJS executor requests this after its parser rejected a .js
	// file that contains ESM syntax.
	materializeSyncModule = (identifier, forceEsmSource) => {
		const information = this.getModuleInformation(identifier);
		const { type, path } = information;
		this.assertModuleExists(information);
		switch (type) {
			case "builtin": return {
				kind: "ready",
				module: this.cjs.getCoreSyntheticModule(identifier)
			};
			case "module":
			case "commonjs":
				if (type === "commonjs" && !forceEsmSource) return {
					kind: "ready",
					module: this.cjs.getCjsSyntheticModule(path, identifier)
				};
				if (path.endsWith(".json")) return {
					kind: "json",
					code: this.fs.readFile(path)
				};
				return {
					kind: "source",
					code: this.fs.readFile(path)
				};
			case "data":
 // data: URIs are materialized by the ESM executor before it consults
			// the external executor
			throw new Error(`[vitest] Unexpected data: module ${identifier} in the sync module walker. This is a bug in Vitest.`);
			case "vite": throw createRequireAsyncModuleError(identifier, "the module is transformed by Vite, which is asynchronous");
			case "wasm": throw createRequireAsyncModuleError(identifier, "WebAssembly modules cannot be loaded synchronously");
			case "network": throw createRequireAsyncModuleError(identifier, "network modules cannot be loaded synchronously");
			default: return type;
		}
	};
	// dynamic import can be used in both ESM and CJS, so we have it in the executor
	importModuleDynamically = async (specifier, referencer) => {
		const module = await this.resolveModule(specifier, referencer.identifier);
		return await this.esm.evaluateModule(module);
	};
	resolveModule = async (specifier, referencer) => {
		let identifier = this.resolve(specifier, referencer);
		if (identifier instanceof Promise) identifier = await identifier;
		return await this.createModule(identifier);
	};
	resolve(specifier, parent) {
		for (const resolver of this.resolvers) {
			const id = resolver(specifier, parent);
			if (id) return id;
		}
		if (SIMPLE_RELATIVE_SPECIFIER_RE.test(specifier) && parent.startsWith("file://")) return new URL(specifier, parent).href;
		// resolution of externalized modules is stable for the lifetime of the
		// worker (like fileMap/packageCache), while fresh vm contexts re-resolve
		// every import edge
		const cache = this.options.resolveCache;
		const key = cache ? `${parent}\n${specifier}` : void 0;
		if (cache) {
			const cached = cache.get(key);
			if (cached !== void 0) return cached;
		}
		// import.meta.resolve can be asynchronous in older +18 Node versions
		const resolved = nativeResolve(specifier, parent);
		if (cache && typeof resolved === "string") cache.set(key, resolved);
		return resolved;
	}
	getModuleInformation(identifier) {
		const cached = this.options.moduleInfoCache?.get(identifier);
		if (cached) return cached;
		const info = this.resolveModuleInformation(identifier);
		this.options.moduleInfoCache?.set(identifier, info);
		return info;
	}
	resolveModuleInformation(identifier) {
		if (identifier.startsWith("data:")) return {
			type: "data",
			url: identifier,
			path: identifier
		};
		const { file, postfix } = splitFileAndPostfix(identifier);
		const extension = extname(file);
		if (extension === ".node" || isBuiltin(identifier)) return {
			type: "builtin",
			url: identifier,
			path: identifier
		};
		if (this.isNetworkSupported && (identifier.startsWith("http:") || identifier.startsWith("https:"))) return {
			type: "network",
			url: identifier,
			path: identifier
		};
		const isFileUrl = identifier.startsWith("file://");
		const pathUrl = isFileUrl ? fileURLToPath(file) : file;
		const fileUrl = isFileUrl ? identifier : `${pathToFileURL(file)}${postfix}`;
		let type;
		if (this.vite.canResolve(fileUrl)) type = "vite";
		else if (extension === ".mjs") type = "module";
		else if (extension === ".cjs") type = "commonjs";
		else if (extension === ".wasm")
 // still experimental on NodeJS --experimental-wasm-modules
		// cf. ESM_FILE_FORMAT(url) in https://nodejs.org/docs/latest-v20.x/api/esm.html#resolution-algorithm
		type = "wasm";
		else type = lookupPackageScopeType(normalize(pathUrl)) === "esm" ? "module" : "commonjs";
		return {
			type,
			path: pathUrl,
			url: fileUrl
		};
	}
	// create ERR_MODULE_NOT_FOUND on our own since latest NodeJS's import.meta.resolve doesn't throw on non-existing namespace or path
	// https://github.com/nodejs/node/pull/49038
	assertModuleExists(information) {
		const { type, path } = information;
		if (type === "module" || type === "commonjs" || type === "wasm") information.exists ??= existsSync(path);
		if (information.exists === false) {
			const error = /* @__PURE__ */ new Error(`Cannot find ${isBareImport(path) ? "package" : "module"} '${path}'`);
			error.code = "ERR_MODULE_NOT_FOUND";
			throw error;
		}
	}
	createModule(identifier) {
		const information = this.getModuleInformation(identifier);
		const { type, url, path } = information;
		this.assertModuleExists(information);
		switch (type) {
			case "data": return this.esm.createDataModule(identifier);
			case "builtin": return this.cjs.getCoreSyntheticModule(identifier);
			case "vite": return this.vite.createViteModule(url);
			case "wasm": return this.esm.createWebAssemblyModule(url, () => this.fs.readBuffer(path));
			case "module": return this.esm.createEsModule(url, () => this.fs.readFile(path));
			case "commonjs": return this.cjs.getCjsSyntheticModule(path, identifier);
			case "network": return this.esm.createNetworkModule(url);
			default: return type;
		}
	}
	get isNetworkSupported() {
		if (this.#networkSupported == null) {
			if (process.execArgv.includes("--experimental-network-imports")) this.#networkSupported = true;
			else if (process.env.NODE_OPTIONS?.includes("--experimental-network-imports")) this.#networkSupported = true;
			else this.#networkSupported = false;
		}
		return this.#networkSupported;
	}
}

const { promises, readFileSync } = fs__default;
class FileMap {
	fsCache = /* @__PURE__ */ new Map();
	fsBufferCache = /* @__PURE__ */ new Map();
	async readFileAsync(path) {
		const cached = this.fsCache.get(path);
		if (cached != null) return cached;
		const source = await promises.readFile(path, "utf-8");
		this.fsCache.set(path, source);
		return source;
	}
	readFile(path) {
		const cached = this.fsCache.get(path);
		if (cached != null) return cached;
		const source = readFileSync(path, "utf-8");
		this.fsCache.set(path, source);
		return source;
	}
	readBuffer(path) {
		const cached = this.fsBufferCache.get(path);
		if (cached != null) return cached;
		const buffer = readFileSync(path);
		this.fsBufferCache.set(path, buffer);
		return buffer;
	}
}

const entryFile = pathToFileURL(resolve(distDir, "workers/runVmTests.js")).href;
const fileMap = new FileMap();
const packageCache = /* @__PURE__ */ new Map();
const codeCache = new CodeCache();
const resolveCache = /* @__PURE__ */ new Map();
const moduleInfoCache = /* @__PURE__ */ new Map();
async function runVmTests(method, state, traces) {
	const { ctx, rpc } = state;
	const beforeEnvironmentTime = performance.now();
	const { environment, loader } = await loadEnvironment(ctx.environment.name, ctx.config.root, rpc, traces, true);
	state.environment = environment;
	loader?.evaluatedModules.idToModuleMap.forEach((_, id) => state.dependencies?.add(id));
	// let the server transform this file's import graph while this worker is
	// busy setting up the environment (jsdom takes ~0.5s per worker) —
	// the server is otherwise idle during that window on a cold start.
	if (environment.prewarmModules !== false) rpc.prewarmModuleGraph(environment.viteEnvironment || environment.name, ctx.files.map((file) => file.filepath)).catch(() => {});
	if (!environment.setupVM) {
		const envName = ctx.environment.name;
		const packageId = envName[0] === "." ? envName : `vitest-environment-${envName}`;
		throw new TypeError(`Environment "${ctx.environment.name}" is not a valid environment. Path "${packageId}" doesn't support vm environment because it doesn't provide "setupVM" method.`);
	}
	const vm = await traces.$("vitest.runtime.environment.setup", { attributes: {
		"vitest.environment": environment.name,
		"vitest.environment.vite_environment": environment.viteEnvironment || environment.name
	} }, () => environment.setupVM(ctx.environment.options || ctx.config.environmentOptions || {}));
	state.durations.environment = performance.now() - beforeEnvironmentTime;
	process.env.VITEST_VM_POOL = "1";
	if (!vm.getVmContext) throw new TypeError(`Environment ${environment.name} doesn't provide "getVmContext" method. It should return a context created by "vm.createContext" method.`);
	const context = vm.getVmContext();
	if (!isContext(context)) throw new TypeError(`Environment ${environment.name} doesn't provide a valid context. It should be created by "vm.createContext" method.`);
	// this is unfortunately needed for our own dependencies
	// we need to find a way to not rely on this by default
	// because browser doesn't provide these globals
	context.process = process;
	context.global = context;
	// TODO: don't hardcode setImmediate in fake timers defaults
	context.setImmediate = setImmediate;
	context.clearImmediate = clearImmediate;
	// captured before vitest installs its own globals (worker state, console,
	// mocker, executor symbol): they reference the test file's module graph, so
	// the teardown strip must treat them as removable, not as pristine. The
	// globals above are kept, work a test file didn't await may still use them
	const initialContextKeys = captureContextKeys(context);
	provideWorkerState(context, state);
	context.console = state.config.disableConsoleIntercept ? console : createCustomConsole(state);
	const stubs = getDefaultRequestStubs(context);
	const externalModulesExecutor = new ExternalModulesExecutor({
		context,
		fileMap,
		codeCache,
		resolveCache,
		moduleInfoCache,
		packageCache,
		transform: rpc.transform,
		viteClientModule: stubs["/@vite/client"]
	});
	process.exit = (code = process.exitCode || 0) => {
		const filepath = state.filepath;
		throw new Error(`process.exit unexpectedly called with "${code}"${filepath ? ` (test file: ${filepath})` : ""}`);
	};
	listenForErrors(() => state);
	const moduleRunner = startVitestModuleRunner({
		context,
		evaluatedModules: state.evaluatedModules,
		state,
		externalModulesExecutor,
		createImportMeta: createNodeImportMeta,
		traces
	});
	emitModuleRunner(moduleRunner);
	Object.defineProperty(context, VITEST_VM_CONTEXT_SYMBOL, {
		value: {
			context,
			externalModulesExecutor
		},
		configurable: true,
		enumerable: false,
		writable: false
	});
	context.__vitest_mocker__ = moduleRunner.mocker;
	setupEnv(ctx.config.env, state.metaEnv);
	if (ctx.config.serializedDefines) try {
		runInContext(ctx.config.serializedDefines, context, { filename: "virtual:load-defines.js" });
	} catch (error) {
		throw new Error(`Failed to load custom "defines": ${error.message}`);
	}
	await moduleRunner.mocker.initializeSpyModule();
	const { run } = await moduleRunner.import(entryFile);
	try {
		await run(method, ctx.files, ctx.config, moduleRunner, traces, () => externalModulesExecutor.syncBuiltinESMExports());
	} finally {
		await traces.$("vitest.runtime.environment.teardown", () => vm.teardown?.());
		// unregisters the runner from Vite's `Error.prepareStackTrace` interceptor:
		// its module-level cache holds `evaluatedModules` of every runner it has
		// seen, which would otherwise keep each test file's entire module graph
		// (and with it the vm context) alive for the lifetime of the worker
		await moduleRunner.close();
		stripDisposedContext(context, initialContextKeys);
		setActiveVmExecutor(void 0);
	}
}
function setupVmWorker(context) {
	if (context.config.experimental.viteModuleRunner === false) throw new Error(`Pool "${context.pool}" cannot run with "experimental.viteModuleRunner: false". Please, use "threads" or "forks" instead.`);
	// V8's isolate-level compilation cache keeps evaluated `vm.SourceTextModule`s
	// (and everything their module state references) alive until a
	// memory-pressure GC clears the cache, which in practice means every test
	// file's world accumulates until the worker hits `vmMemoryLimit`. The
	// compiled-code caching the flag disables is already covered by the
	// worker's own script and code caches.
	v8.setFlagsFromString("--no-compilation-cache");
}

export { runVmTests as r, setupVmWorker as s };
