import { a as namespaces, i as enabled, n as disable, o as humanize, r as enable$1, t as createDebug$1 } from "./core.js";
//#region src/plain.ts
function formatArgs(diff, args) {
	args[0] = `${this.namespace} ${args[0]} +${this.humanize(diff)}`;
}
const defaultOptions = {
	useColors: false,
	color: "",
	formatArgs,
	formatters: { 
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
j(v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return `[UnexpectedJSONParseError]: ${error.message}`;
		}
	} },
	inspectOpts: {},
	humanize,
	log: console.debug || console.log || (() => {})
};
function createDebug(namespace, options) {
	return createDebug$1(namespace, Object.assign({}, defaultOptions, options));
}
function load() {
	let r;
	try {
		r = localStorage.getItem("debug") || localStorage.getItem("DEBUG");
	} catch (_unused) {}
	if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
	return r || "";
}
function save(namespaces) {
	try {
		if (namespaces) localStorage.setItem("debug", namespaces);
		else localStorage.removeItem("debug");
	} catch (_unused2) {}
}
/**
* Enables a debug mode by namespaces. This can include modes
* separated by a colon and wildcards.
*/
function enable(namespaces) {
	save(namespaces);
	enable$1(namespaces);
}
enable$1(load());
//#endregion
export { createDebug, disable, enable, enabled, namespaces };
