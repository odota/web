import e from "../../report-base.mjs";
//#region src/reports/json-summary/index.ts
var JsonSummaryReport = class extends e {
	constructor(e) {
		super(), this.file = e.file || "coverage-summary.json", this.contentWriter = null, this.first = !0;
	}
	onStart(e, t) {
		this.contentWriter = t.writer.writeFile(this.file), this.contentWriter.write("{");
	}
	writeSummary(e, t) {
		let n = this.contentWriter;
		this.first ? this.first = !1 : n.write(","), n.write(JSON.stringify(e)), n.write(": "), n.write(JSON.stringify(t)), n.println("");
	}
	onSummary(e) {
		e.isRoot() && this.writeSummary("total", e.getCoverageSummary());
	}
	onDetail(e) {
		this.writeSummary(e.getFileCoverage().path, e.getCoverageSummary());
	}
	onEnd() {
		let e = this.contentWriter;
		e.println("}"), e.close();
	}
};
//#endregion
export { JsonSummaryReport as default };
