import module$1, { isBuiltin } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { automockModule, createManualModuleSource, collectModuleExports } from '@vitest/mocker/transforms';
import { c as cleanUrl, e as createDefer, i as isAbsolute } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { p as parse } from './acorn.C1kjbUFw.js';
import { t as toBuiltin } from './modules.BJuCwlRJ.js';
import { B as BareModuleMocker, n as normalizeModuleId } from './index.Bi0NXYPf.js';
import 'node:fs';
import './utils.DYj33du9.js';
import '../path.js';
import 'node:path';
import '../module-evaluator.js';
import 'node:vm';
import 'vite/module-runner';
import '../traces.js';
import 'node:async_hooks';
import '@vitest/mocker';
import '@vitest/mocker/redirect';
import 'node:console';

class NativeModuleMocker extends BareModuleMocker {
	wrapDynamicImport(moduleFactory) {
		if (typeof moduleFactory !== "function") return moduleFactory;
		// Node.js can evaluate the module outside of the importer's async chain,
		// so the stack of an import error would not point at the import
		const importer = /* @__PURE__ */ new Error("import location");
		return new Promise((resolve, reject) => {
			this.resolveMocks().finally(() => {
				moduleFactory().then(resolve, (error) => reject(addImporterFrame(error, importer)));
			});
		});
	}
	resolveMockedModule(url, parentURL) {
		// don't mock modules inside of packages because there is
		// a high chance that it uses `require` which is not mockable
		// because we use top-level await in "manual" mocks.
		// for the sake of consistency we don't support mocking anything at all
		if (parentURL.includes("/node_modules/")) return;
		const filename = url.startsWith("file://") ? fileURLToPath(url) : url;
		const moduleId = normalizeModuleId(filename);
		const mockedModule = this.getDependencyMock(moduleId);
		if (!mockedModule) return;
		if (mockedModule.type === "redirect") return {
			url: pathToFileURL(mockedModule.redirect).toString(),
			shortCircuit: true
		};
		if (mockedModule.type === "automock" || mockedModule.type === "autospy") return {
			url: injectQuery(url, parentURL, `mock=${mockedModule.type}`),
			shortCircuit: true
		};
		if (mockedModule.type === "manual") return {
			url: injectQuery(url, parentURL, "mock=manual"),
			shortCircuit: true
		};
	}
	loadAutomock(url, result) {
		const filename = url.startsWith("file://") ? fileURLToPath(url) : url;
		const moduleId = cleanUrl(normalizeModuleId(filename));
		let source;
		if (isBuiltin(moduleId)) {
			const builtinModule = getBuiltinModule(moduleId);
			const exports = Object.keys(builtinModule);
			source = `
import * as builtinModule from '${toBuiltin(moduleId)}?mock=actual'

${exports.map((key, index) => {
				return `
const __${index} = builtinModule["${key}"]
export { __${index} as "${key}" }
`;
			}).join("")}`;
		} else source = result.source?.toString();
		if (source == null) return;
		const mockType = url.includes("mock=automock") ? "automock" : "autospy";
		const transformedCode = transformCode(source, result.format || "module", moduleId);
		try {
			const ms = automockModule(transformedCode, mockType, (code) => parse(code, {
				sourceType: "module",
				ecmaVersion: "latest"
			}), { id: moduleId });
			return {
				format: "module",
				source: `${ms.toString()}\n//# sourceMappingURL=${genSourceMapUrl(ms.generateMap({
					hires: "boundary",
					source: moduleId
				}))}`,
				shortCircuit: true
			};
		} catch (cause) {
			throw new Error(`Cannot automock '${url}' because it failed to parse.`, { cause });
		}
	}
	loadManualMock(url, result) {
		const filename = url.startsWith("file://") ? fileURLToPath(url) : url;
		const moduleId = cleanUrl(normalizeModuleId(filename));
		// should not be possible
		if (this.getDependencyMock(moduleId)?.type !== "manual") {
			console.warn(`Vitest detected unregistered manual mock ${moduleId}. This is a bug in Vitest. Please, open a new issue with reproduction.`);
			return;
		}
		if (isBuiltin(moduleId)) {
			const builtinModule = getBuiltinModule(toBuiltin(moduleId));
			const exports = Object.keys(builtinModule);
			return {
				format: "module",
				source: createManualModuleSource(moduleId, exports),
				shortCircuit: true
			};
		}
		if (!result.source) return;
		const transformedCode = transformCode(result.source.toString(), result.format || "module", moduleId);
		if (transformedCode == null) return;
		const format = result.format?.startsWith("module") ? "module" : "commonjs";
		try {
			// we parse the module with es/cjs-module-lexer to find the original exports -- we assume the same ones are returned from the factory
			// injecting new keys is not supported (and should not be advised anyway)
			const exports = collectModuleExports(moduleId, transformedCode, format);
			return {
				format: "module",
				source: createManualModuleSource(moduleId, exports),
				shortCircuit: true
			};
		} catch (cause) {
			throw new Error(`Failed to mock '${url}'. See the cause for more information.`, { cause });
		}
	}
	processedModules = /* @__PURE__ */ new Map();
	checkCircularManualMock(url) {
		const filename = url.startsWith("file://") ? fileURLToPath(url) : url;
		const id = cleanUrl(normalizeModuleId(filename));
		this.processedModules.set(id, (this.processedModules.get(id) ?? 0) + 1);
		// the module is mocked and requested a second time, let's resolve
		// the factory function that will redefine the exports later
		if (this.originalModulePromises.has(id)) {
			const factoryPromise = this.factoryPromises.get(id);
			this.originalModulePromises.get(id)?.resolve({ __factoryPromise: factoryPromise });
		}
	}
	originalModulePromises = /* @__PURE__ */ new Map();
	factoryPromises = /* @__PURE__ */ new Map();
	// potential performance improvement:
	// store by URL, not ids, no need to call url.*to* methods and normalizeModuleId
	getFactoryModule(id) {
		const mock = this.getMockerRegistry().getById(id);
		if (!mock || mock.type !== "manual") throw new Error(`Mock ${id} wasn't registered. This is probably a Vitest error. Please, open a new issue with reproduction.`);
		const mockResult = mock.resolve();
		if (mockResult instanceof Promise) {
			// to avoid circular dependency, we resolve this function as {__factoryPromise} in `checkCircularManualMock`
			// when it's requested the second time. then the exports are exposed as `undefined`,
			// but later redefined when the promise is actually resolved
			const promise = createDefer();
			promise.finally(() => {
				this.originalModulePromises.delete(id);
			});
			mockResult.then(promise.resolve, promise.reject).finally(() => {
				this.factoryPromises.delete(id);
			});
			this.factoryPromises.set(id, mockResult);
			this.originalModulePromises.set(id, promise);
			// Node.js on windows processes all the files first, and then runs them
			// unlike Node.js logic on Mac and Unix where it also runs the code while evaluating
			// So on Linux/Mac this `if` won't be hit because `checkCircularManualMock` will resolve it
			// And on Windows, the `checkCircularManualMock` will never have `originalModulePromises`
			// because `getFactoryModule` is not called until the evaluation phase
			// But if we track how many times the module was transformed,
			// we can deduce when to return `__factoryPromise` to support circular modules
			if ((this.processedModules.get(id) ?? 0) > 1) {
				this.processedModules.set(id, (this.processedModules.get(id) ?? 1) - 1);
				promise.resolve({ __factoryPromise: mockResult });
			}
			return promise;
		}
		return mockResult;
	}
	importActual(rawId, importer) {
		const resolvedId = import.meta.resolve(rawId, pathToFileURL(importer).toString());
		const url = new URL(resolvedId);
		url.searchParams.set("mock", "actual");
		return import(url.toString());
	}
	importMock(rawId, importer) {
		const resolvedId = import.meta.resolve(rawId, pathToFileURL(importer).toString());
		// file is already mocked
		if (resolvedId.includes("mock=")) return import(resolvedId);
		const filename = fileURLToPath(resolvedId);
		const external = !isAbsolute(filename) || this.isModuleDirectory(resolvedId) ? normalizeModuleId(rawId) : null;
		// file is not mocked, automock or redirect it
		const redirect = this.findMockRedirect(filename, external, rawId);
		if (redirect) return import(pathToFileURL(redirect).toString());
		const url = new URL(resolvedId);
		url.searchParams.set("mock", "automock");
		return import(url.toString());
	}
}
const replacePercentageRE = /%/g;
function injectQuery(url, importer, queryToInject) {
	const { search, hash } = new URL(url.replace(replacePercentageRE, "%25"), importer);
	return `${cleanUrl(url)}?${queryToInject}${search ? `&${search.slice(1)}` : ""}${hash ?? ""}`;
}
let __require;
function getBuiltinModule(moduleId) {
	__require ??= module$1.createRequire(import.meta.url);
	return __require(`${moduleId}?mock=actual`);
}
function genSourceMapUrl(map) {
	if (typeof map !== "string") map = JSON.stringify(map);
	return `data:application/json;base64,${Buffer.from(map).toString("base64")}`;
}
function transformCode(code, format, filename) {
	if (format.includes("typescript")) {
		if (!module$1.stripTypeScriptTypes) throw new Error(`Cannot parse '${filename}' because "module.stripTypeScriptTypes" is not supported. Module mocking requires Node.js 22.15 or higher. This is NOT a bug of Vitest.`);
		return module$1.stripTypeScriptTypes(code);
	}
	return code;
}
function addImporterFrame(error, importer) {
	const lines = importer.stack?.split("\n") || [];
	const index = lines.findIndex((line) => line.includes("wrapDynamicImport"));
	const frame = index === -1 ? void 0 : lines[index + 1];
	const file = frame?.match(/\(?([^()\s]+):\d+:\d+\)?$/)?.[1];
	if (!frame || !file || frame.includes("node:")) return error;
	const asyncFrame = frame.replace(/^(\s*)at /, "$1at async ");
	const seen = /* @__PURE__ */ new Set();
	let current = error;
	while (current instanceof Error && !seen.has(current)) {
		seen.add(current);
		const stack = current.stack;
		// older Node.js versions keep the async frame of the import themselves
		if (typeof stack === "string" && !stack.split("\n").some((line) => line.includes("at async ") && line.includes(file))) current.stack = `${stack}\n${asyncFrame}`;
		current = current.cause;
	}
	return error;
}

export { NativeModuleMocker };
