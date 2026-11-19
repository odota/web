import module$1 from 'node:module';
import { fileURLToPath } from 'node:url';
import { s as slash } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { distDir } from '../path.js';

const vitestDistDir = `${slash(distDir)}/`;
/**
* Ids of the roots and of every module reachable from them through the runtime import edges.
*/
function collectDependencies(getImports, ...roots) {
	const visited = /* @__PURE__ */ new Set();
	const queue = [];
	for (const ids of roots) for (const id of ids) if (!visited.has(id)) {
		visited.add(id);
		queue.push(id);
	}
	while (queue.length) {
		const imports = getImports(queue.pop());
		if (!imports) continue;
		for (const id of imports) if (!visited.has(id)) {
			visited.add(id);
			queue.push(id);
		}
	}
	return Array.from(visited);
}
function getEvaluatedImports(evaluatedModules) {
	return (id) => evaluatedModules.getModuleById(id)?.imports;
}
class NativeImportGraph {
	imports = /* @__PURE__ */ new Map();
	/**
	* Returns the imported file, or `undefined` if the import is not tracked.
	*/
	record(url, parentURL) {
		if (!url.startsWith("file:") || url.includes("/node_modules/")) return;
		const file = slash(fileURLToPath(url));
		const importer = parentURL.startsWith("file:") ? slash(fileURLToPath(parentURL)) : parentURL;
		// Vitest imports every test file, its edges would connect unrelated test files
		if (!importer.startsWith(vitestDistDir)) {
			let imports = this.imports.get(importer);
			if (!imports) this.imports.set(importer, imports = /* @__PURE__ */ new Set());
			imports.add(file);
		}
		return file;
	}
	getImports = (id) => this.imports.get(id);
}
/**
* Import edges of the modules loaded with native `import`, reported by a Node.js resolve hook.
* Node.js never loads a module twice, so the edges are kept as long as the thread runs.
*/
const nativeImports = new NativeImportGraph();
let trackingNativeImports = false;
/**
* Registers a resolve hook that records the native imports of this thread.
* Returns `false` if the runtime has no synchronous module hooks.
*/
function trackNativeImports() {
	if (!trackingNativeImports && typeof module$1.registerHooks === "function") {
		module$1.registerHooks({ resolve(specifier, context, nextResolve) {
			const result = nextResolve(specifier, context);
			if (context.parentURL) nativeImports.record(result.url, context.parentURL);
			return result;
		} });
		trackingNativeImports = true;
	}
	return trackingNativeImports;
}

export { collectDependencies as c, getEvaluatedImports as g, nativeImports as n, trackNativeImports as t };
