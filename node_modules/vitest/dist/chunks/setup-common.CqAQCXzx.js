import { s as setSafeTimers } from './source-map.DakdQc29.js';
import { a as addSerializer } from './plugins.DPQHVT0p.js';

let globalSetup = false;
async function setupCommonEnv(config) {
	setupDefines(config);
	if (globalSetup) return;
	globalSetup = true;
	setSafeTimers();
	if (config.globals) (await import('./globals.ZKtKSkEf.js')).registerApiGlobally();
}
function setupDefines(config) {
	for (const key in config.defines) globalThis[key] = config.defines[key];
}
function setupEnv(env, metaEnv) {
	for (const key in env) metaEnv[key] = env[key];
}
async function loadDiffConfig(config, moduleRunner) {
	if (typeof config.diff === "object") return config.diff;
	if (typeof config.diff !== "string") return;
	const diffModule = await moduleRunner.import(config.diff);
	if (diffModule && typeof diffModule.default === "object" && diffModule.default != null) return diffModule.default;
	else throw new Error(`invalid diff config file ${config.diff}. Must have a default export with config object`);
}
async function loadSnapshotSerializers(config, moduleRunner) {
	const files = config.snapshotSerializers;
	(await Promise.all(files.map(async (file) => {
		const mo = await moduleRunner.import(file);
		if (!mo || typeof mo.default !== "object" || mo.default === null) throw new Error(`invalid snapshot serializer file ${file}. Must export a default object`);
		const config = mo.default;
		if (typeof config.test !== "function" || typeof config.serialize !== "function" && typeof config.print !== "function") throw new TypeError(`invalid snapshot serializer in ${file}. Must have a 'test' method along with either a 'serialize' or 'print' method.`);
		return config;
	}))).forEach((serializer) => addSerializer(serializer));
}

export { loadSnapshotSerializers as a, setupEnv as b, loadDiffConfig as l, setupCommonEnv as s };
