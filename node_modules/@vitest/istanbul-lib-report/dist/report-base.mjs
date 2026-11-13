//#region src/report-base.ts
const e = Symbol("ReportBase.#summarizer");
var ReportBase = class {
	constructor(t = {}) {
		this[e] = t.summarizer;
	}
	execute(t) {
		t.getTree(this[e]).visit(this, t);
	}
};
//#endregion
export { ReportBase as default };
