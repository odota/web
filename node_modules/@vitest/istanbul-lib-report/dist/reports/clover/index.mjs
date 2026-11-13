import e from "../../report-base.mjs";
//#region src/reports/clover/index.ts
var CloverReport = class extends e {
	constructor(e) {
		super(), this.cw = null, this.xml = null, this.file = e.file || "clover.xml";
	}
	onStart(e, t) {
		this.cw = t.writer.writeFile(this.file), this.xml = t.getXMLWriter(this.cw), this.writeRootStats(e, t);
	}
	onEnd() {
		this.xml.closeAll(), this.cw.close();
	}
	getTreeStats(e, t) {
		let n = {
			packages: 0,
			files: 0,
			classes: 0
		};
		return e.visit(t.getVisitor({
			onSummary(e, t) {
				e.getCoverageSummary(!0) && (t.packages += 1);
			},
			onDetail(e, t) {
				t.classes += 1, t.files += 1;
			}
		}), n), n;
	}
	writeRootStats(e, t) {
		this.cw.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>"), this.xml.openTag("coverage", {
			generated: Date.now().toString(),
			clover: "3.2.0"
		}), this.xml.openTag("project", {
			timestamp: Date.now().toString(),
			name: "All files"
		});
		let n = e.getCoverageSummary();
		this.xml.inlineTag("metrics", {
			statements: n.lines.total,
			coveredstatements: n.lines.covered,
			conditionals: n.branches.total,
			coveredconditionals: n.branches.covered,
			methods: n.functions.total,
			coveredmethods: n.functions.covered,
			elements: n.lines.total + n.branches.total + n.functions.total,
			coveredelements: n.lines.covered + n.branches.covered + n.functions.covered,
			complexity: 0,
			loc: n.lines.total,
			ncloc: n.lines.total,
			...this.getTreeStats(e, t)
		});
	}
	writeMetrics(e) {
		this.xml.inlineTag("metrics", {
			statements: e.lines.total,
			coveredstatements: e.lines.covered,
			conditionals: e.branches.total,
			coveredconditionals: e.branches.covered,
			methods: e.functions.total,
			coveredmethods: e.functions.covered
		});
	}
	onSummary(e) {
		if (e.isRoot()) return;
		let t = e.getCoverageSummary(!0);
		t && (this.xml.openTag("package", { name: asJavaPackage(e) }), this.writeMetrics(t));
	}
	onSummaryEnd(e) {
		e.isRoot() || this.xml.closeTag(this.xml.stack[this.xml.stack.length - 1]);
	}
	onDetail(e) {
		let t = e.getFileCoverage(), n = e.getCoverageSummary(), r = t.getBranchCoverageByLine();
		this.xml.openTag("file", {
			name: asClassName(e),
			path: t.path
		}), this.writeMetrics(n);
		let i = t.getLineCoverage();
		Object.entries(i).forEach(([e, t]) => {
			let n = {
				num: e,
				count: t,
				type: "stmt"
			}, i = r[e];
			i && (n.type = "cond", n.truecount = i.covered, n.falsecount = i.total - i.covered), this.xml.inlineTag("line", n);
		}), this.xml.closeTag("file");
	}
};
function asJavaPackage(e) {
	return e.getRelativeName().replace(/\//g, ".").replace(/\\/g, ".").replace(/\.$/, "");
}
function asClassName(e) {
	return e.getRelativeName().replace(/.*[\\/]/, "");
}
//#endregion
export { CloverReport as default };
