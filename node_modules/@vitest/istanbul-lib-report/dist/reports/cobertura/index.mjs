import e from "../../report-base.mjs";
import { escape as t } from "../../html-escape.mjs";
import n from "node:path";
//#region src/reports/cobertura/index.ts
function rate(e) {
	let { pct: t } = e;
	return typeof t == "number" ? t / 100 : NaN;
}
var CoberturaReport = class extends e {
	constructor(e) {
		super(), e ||= {}, this.cw = null, this.xml = null, this.timestamp = e.timestamp || Date.now().toString(), this.projectRoot = e.projectRoot || process.cwd(), this.file = e.file || "cobertura-coverage.xml";
	}
	onStart(e, t) {
		this.cw = t.writer.writeFile(this.file), this.xml = t.getXMLWriter(this.cw), this.writeRootStats(e);
	}
	onEnd() {
		this.xml.closeAll(), this.cw.close();
	}
	writeRootStats(e) {
		let t = e.getCoverageSummary();
		this.cw.println("<?xml version=\"1.0\" ?>"), this.cw.println("<!DOCTYPE coverage SYSTEM \"http://cobertura.sourceforge.net/xml/coverage-04.dtd\">"), this.xml.openTag("coverage", {
			"lines-valid": t.lines.total,
			"lines-covered": t.lines.covered,
			"line-rate": rate(t.lines),
			"branches-valid": t.branches.total,
			"branches-covered": t.branches.covered,
			"branch-rate": rate(t.branches),
			timestamp: this.timestamp,
			complexity: "0",
			version: "0.1"
		}), this.xml.openTag("sources"), this.xml.inlineTag("source", void 0, this.projectRoot), this.xml.closeTag("sources"), this.xml.openTag("packages");
	}
	onSummary(e) {
		let n = e.getCoverageSummary(!0);
		n && (this.xml.openTag("package", {
			name: e.isRoot() ? "main" : t(asJavaPackage(e)),
			"line-rate": rate(n.lines),
			"branch-rate": rate(n.branches)
		}), this.xml.openTag("classes"));
	}
	onSummaryEnd(e) {
		e.getCoverageSummary(!0) && (this.xml.closeTag("classes"), this.xml.closeTag("package"));
	}
	onDetail(e) {
		let r = e.getFileCoverage(), i = e.getCoverageSummary(), a = r.getBranchCoverageByLine();
		this.xml.openTag("class", {
			name: t(asClassName(e)),
			filename: n.relative(this.projectRoot, r.path),
			"line-rate": rate(i.lines),
			"branch-rate": rate(i.branches)
		}), this.xml.openTag("methods");
		let o = r.fnMap, s = createUniqueNamer();
		Object.entries(o).forEach(([e, { name: n, decl: i, loc: a }]) => {
			let o = r.f[e], c = (i || a).start;
			this.xml.openTag("method", {
				name: t(s(n)),
				hits: o,
				signature: "()V"
			}), this.xml.openTag("lines"), this.xml.inlineTag("line", {
				number: c.line,
				hits: o
			}), this.xml.closeTag("lines"), this.xml.closeTag("method");
		}), this.xml.closeTag("methods"), this.xml.openTag("lines");
		let c = r.getLineCoverage();
		Object.entries(c).forEach(([e, t]) => {
			let n = {
				number: e,
				hits: t,
				branch: "false"
			}, r = a[e];
			r && (n.branch = "true", n["condition-coverage"] = r.coverage + "% (" + r.covered + "/" + r.total + ")"), this.xml.inlineTag("line", n);
		}), this.xml.closeTag("lines"), this.xml.closeTag("class");
	}
};
function asJavaPackage(e) {
	return e.getRelativeName().replace(/\//g, ".").replace(/\\/g, ".").replace(/\.$/, "");
}
function asClassName(e) {
	return e.getRelativeName().replace(/.*[\\/]/, "");
}
const r = /^\(anonymous_(\d+)\)$/;
function createUniqueNamer() {
	let e = new Set();
	return (t) => {
		let n = t || "(anonymous)";
		if (!e.has(n)) return e.add(n), n;
		let i = r.exec(n);
		if (i) {
			let t = Number(i[1]) + 1, n = `(anonymous_${t})`;
			for (; e.has(n);) t += 1, n = `(anonymous_${t})`;
			return e.add(n), n;
		}
		let a = 2, o = `${n}_${a}`;
		for (; e.has(o);) a += 1, o = `${n}_${a}`;
		return e.add(o), o;
	};
}
//#endregion
export { CoberturaReport as default };
