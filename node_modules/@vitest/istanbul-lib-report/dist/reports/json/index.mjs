import e from "../../report-base.mjs";
//#region src/reports/json/index.ts
var JsonReport = class extends e {
	constructor(e) {
		super(), this.file = e.file || "coverage-final.json", this.first = !0;
	}
	onStart(e, t) {
		this.contentWriter = t.writer.writeFile(this.file), this.contentWriter.write("{");
	}
	onDetail(e) {
		let t = e.getFileCoverage(), n = t.path, r = this.contentWriter;
		this.first ? this.first = !1 : r.write(","), r.write(JSON.stringify(n)), r.write(": "), r.write(JSON.stringify(t)), r.println("");
	}
	onEnd() {
		let e = this.contentWriter;
		e.println("}"), e.close();
	}
};
//#endregion
export { JsonReport as default };
