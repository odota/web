import e from "../../report-base.mjs";
import t from "../html/index.mjs";
import n from "../lcovonly/index.mjs";
//#region src/reports/lcov/index.ts
var LcovReport = class extends e {
	constructor(e) {
		super(), this.lcov = new n({
			file: "lcov.info",
			...e
		}), this.html = new t({ subdir: "lcov-report" });
	}
};
[
	"Start",
	"End",
	"Summary",
	"SummaryEnd",
	"Detail"
].forEach((e) => {
	let t = "on" + e;
	LcovReport.prototype[t] = function(...e) {
		let n = this.lcov, r = this.html;
		n[t] && n[t](...e), r[t] && r[t](...e);
	};
});
//#endregion
export { LcovReport as default };
