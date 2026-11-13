import e from "../../report-base.mjs";
//#region src/reports/teamcity/index.ts
var TeamcityReport = class extends e {
	constructor(e) {
		super(), e ||= {}, this.file = e.file || null, this.blockName = e.blockName || "Code Coverage Summary";
	}
	onStart(e, t) {
		let n = e.getCoverageSummary(), r = t.writer.writeFile(this.file);
		r.println(""), r.println("##teamcity[blockOpened name='" + this.blockName + "']"), r.println(lineForKey(n.statements.covered, "CodeCoverageAbsBCovered")), r.println(lineForKey(n.statements.total, "CodeCoverageAbsBTotal")), r.println(lineForKey(n.branches.covered, "CodeCoverageAbsRCovered")), r.println(lineForKey(n.branches.total, "CodeCoverageAbsRTotal")), r.println(lineForKey(n.functions.covered, "CodeCoverageAbsMCovered")), r.println(lineForKey(n.functions.total, "CodeCoverageAbsMTotal")), r.println(lineForKey(n.lines.covered, "CodeCoverageAbsLCovered")), r.println(lineForKey(n.lines.total, "CodeCoverageAbsLTotal")), r.println("##teamcity[blockClosed name='" + this.blockName + "']"), r.close();
	}
};
function lineForKey(e, t) {
	return "##teamcity[buildStatisticValue key='" + t + "' value='" + e + "']";
}
//#endregion
export { TeamcityReport as default };
