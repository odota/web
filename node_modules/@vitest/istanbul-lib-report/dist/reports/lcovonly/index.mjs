import e from "../../report-base.mjs";
import t from "node:path";
//#region src/reports/lcovonly/index.ts
var LcovOnlyReport = class extends e {
	constructor(e) {
		super(), e ||= {}, this.file = e.file || "lcov.info", this.projectRoot = e.projectRoot || process.cwd(), this.contentWriter = null;
	}
	onStart(e, t) {
		this.contentWriter = t.writer.writeFile(this.file);
	}
	onDetail(e) {
		let n = e.getFileCoverage(), r = this.contentWriter, i = n.f, a = n.fnMap, o = n.getLineCoverage(), s = n.b, c = n.branchMap, l = e.getCoverageSummary();
		r.println("TN:");
		let u = t.relative(this.projectRoot, n.path);
		r.println("SF:" + u), Object.values(a).forEach((e) => {
			let t = e.decl || e.loc;
			r.println("FN:" + [t.start.line, e.name].join(","));
		}), r.println("FNF:" + l.functions.total), r.println("FNH:" + l.functions.covered), Object.entries(a).forEach(([e, t]) => {
			let n = i[e];
			r.println("FNDA:" + [n, t.name].join(","));
		}), Object.entries(o).forEach((e) => {
			r.println("DA:" + e.join(","));
		}), r.println("LF:" + l.lines.total), r.println("LH:" + l.lines.covered), Object.entries(s).forEach(([e, t]) => {
			let n = c[e];
			if (n) {
				let { line: i } = n.loc.start;
				t.forEach((t, n) => {
					r.println("BRDA:" + [
						i,
						e,
						n,
						t
					].join(","));
				});
			} else console.warn("Missing coverage entries in", u, e);
		}), r.println("BRF:" + l.branches.total), r.println("BRH:" + l.branches.covered), r.println("end_of_record");
	}
	onEnd() {
		this.contentWriter.close();
	}
};
//#endregion
export { LcovOnlyReport as default };
