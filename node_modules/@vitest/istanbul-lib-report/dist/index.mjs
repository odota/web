import e from "./file-writer.mjs";
import { getDefault as t } from "./watermarks.mjs";
import n from "./context.mjs";
import r from "./report-base.mjs";
import i from "./reports/clover/index.mjs";
import a from "./reports/cobertura/index.mjs";
import o from "./reports/html/index.mjs";
import s from "./reports/html-spa/index.mjs";
import c from "./reports/json-summary/index.mjs";
import l from "./reports/json/index.mjs";
import u from "./reports/lcovonly/index.mjs";
import d from "./reports/lcov/index.mjs";
import f from "./reports/none/index.mjs";
import p from "./reports/teamcity/index.mjs";
import m from "./reports/text-lcov/index.mjs";
import h from "./reports/text-summary/index.mjs";
import g from "./reports/text/index.mjs";
import { isAbsolute as _ } from "node:path";
import { pathToFileURL as v } from "node:url";
//#region src/index.ts
function createContext(e) {
	return new n(e);
}
function getDefaultWatermarks() {
	return t();
}
const y = {
	clover: i,
	cobertura: a,
	html: o,
	"html-spa": s,
	json: l,
	"json-summary": c,
	lcov: d,
	lcovonly: u,
	none: f,
	teamcity: p,
	text: g,
	"text-lcov": m,
	"text-summary": h
};
function getBuiltinReport(e) {
	return Object.hasOwn(y, e) ? y[e] : void 0;
}
function unwrapDefault(e) {
	return typeof e == "object" && e && "default" in e ? e.default : e;
}
function create(e, t) {
	let n = getBuiltinReport(e);
	if (!n) throw Error(`Unknown report "${e}". Use createAsync() to load custom reports.`);
	return new n(t ?? {});
}
async function createAsync(e, t) {
	let n = getBuiltinReport(e);
	if (!n && (n = unwrapDefault(await (_(e) ? import(v(e).href) : import(e))), typeof n == "object" && n && "__esModule" in n && (n = unwrapDefault(n)), typeof n != "function")) throw TypeError(`Custom report "${e}" must export a report class as its default export (ESM) or module.exports (CommonJS)`);
	return new n(t ?? {});
}
//#endregion
export { e as FileWriter, r as ReportBase, create, createAsync, createContext, getDefaultWatermarks };
