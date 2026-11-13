import e from "../../report-base.mjs";
//#region src/reports/text-summary/index.ts
var TextSummaryReport = class extends e {
	constructor(e) {
		super(), e ||= {}, this.file = e.file || null;
	}
	onStart(e, t) {
		let n = e.getCoverageSummary(), r = t.writer.writeFile(this.file), printLine = function(e) {
			let i = lineForKey(n, e), a = n[e].pct, o = t.classForPercent(e, typeof a == "number" ? a : NaN);
			r.println(r.colorize(i, o));
		};
		r.println(""), r.println("=============================== Coverage summary ==============================="), printLine("statements"), printLine("branches"), printLine("functions"), printLine("lines"), r.println("================================================================================"), r.close();
	}
};
function lineForKey(e, t) {
	let n = e[t], r = t.substring(0, 1).toUpperCase() + t.substring(1);
	r.length < 12 && (r += "                   ".substring(0, 12 - r.length));
	let i = [
		r,
		":",
		`${n.pct}%`,
		"(",
		n.covered + "/" + n.total,
		")"
	].join(" "), a = n.skipped;
	return a > 0 ? i + ", " + a + " ignored" : i;
}
//#endregion
export { TextSummaryReport as default };
