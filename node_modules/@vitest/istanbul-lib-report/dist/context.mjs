import e from "./file-writer.mjs";
import { Visitor as t } from "./tree.mjs";
import n from "./summarizer-factory.mjs";
import { getDefault as r } from "./watermarks.mjs";
import i from "./xml-writer.mjs";
import a from "node:fs";
//#region src/context.ts
function defaultSourceLookup(e) {
	try {
		return a.readFileSync(e, "utf8");
	} catch (t) {
		throw Error(`Unable to lookup source: ${e} (${t.message})`);
	}
}
function normalizeWatermarks(e = {}) {
	return Object.entries(r()).forEach(([t, n]) => {
		let r = t, i = e[r];
		(!Array.isArray(i) || i.length !== 2) && (e[r] = n);
	}), e;
}
var Context = class {
	constructor(e) {
		this.dir = e.dir || "coverage", this.watermarks = normalizeWatermarks(e.watermarks), this.sourceFinder = e.sourceFinder || defaultSourceLookup, this._summarizerFactory = new n(e.coverageMap, e.defaultSummarizer), this.data = {};
	}
	getWriter() {
		return this.writer;
	}
	getSource(e) {
		return this.sourceFinder(e);
	}
	classForPercent(e, t) {
		let n = this.watermarks[e];
		return n ? t < n[0] ? "low" : t >= n[1] ? "high" : "medium" : "unknown";
	}
	getXMLWriter(e) {
		return new i(e);
	}
	getVisitor(e) {
		return new t(e);
	}
	getTree(e = "defaultSummarizer") {
		return this._summarizerFactory[e];
	}
};
Object.defineProperty(Context.prototype, "writer", {
	enumerable: !0,
	get() {
		return this.data.writer || (this.data.writer = new e(this.dir)), this.data.writer;
	}
});
//#endregion
export { Context as default };
