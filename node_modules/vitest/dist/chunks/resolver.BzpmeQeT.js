import fs__default from 'node:fs';
import { b as basename, j as join, d as dirname } from './pathe.M-eThtNZ.zq3TM4NT.js';

const packageScopeTypeCache = /* @__PURE__ */ new Map();
// mirrors LOOKUP_PACKAGE_SCOPE from the ESM resolution algorithm:
// the lookup stops at the first package.json and never crosses
// the "node_modules" boundary, so typeless dependencies don't
// inherit the `type` field of the user's project
function lookupPackageScopeType(directory) {
	const visited = [];
	let result = "none";
	let current = directory;
	while (current) {
		const cached = packageScopeTypeCache.get(current);
		if (cached) {
			result = cached;
			break;
		}
		if (basename(current) === "node_modules") break;
		visited.push(current);
		const packageJsonPath = join(current, "package.json");
		if (tryStatSync(packageJsonPath)?.isFile()) {
			try {
				const packageJson = JSON.parse(stripBomTag(fs__default.readFileSync(packageJsonPath, "utf8")));
				if (packageJson.type === "module") result = "esm";
				else if (packageJson.type === "commonjs") result = "cjs";
			} catch {}
			break;
		}
		const parent = dirname(current);
		if (parent === current) break;
		current = parent;
	}
	visited.forEach((dir) => packageScopeTypeCache.set(dir, result));
	return result;
}
function stripBomTag(content) {
	if (content.charCodeAt(0) === 65279) return content.slice(1);
	return content;
}
function tryStatSync(file) {
	try {
		// The "throwIfNoEntry" is a performance optimization for cases where the file does not exist
		return fs__default.statSync(file, { throwIfNoEntry: false });
	} catch {}
}

export { lookupPackageScopeType as l };
