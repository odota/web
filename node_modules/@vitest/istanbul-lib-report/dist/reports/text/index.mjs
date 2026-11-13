import e from "../../report-base.mjs";
function classForPercent(e, t, n) {
	return e.classForPercent(t, typeof n == "number" ? n : NaN);
}
function padding(e, t) {
	let n = "", r;
	for (t ||= " ", r = 0; r < e; r += 1) n += t;
	return n;
}
function fill(e, t, n, r) {
	r ||= 0, e = String(e);
	let i = r * 1, a = t - i, o = padding(i), s = "";
	if (a > 0) {
		let t = e.length, r;
		if (a >= t) r = padding(a - t);
		else {
			r = "...";
			let i = a - r.length;
			e = e.substring(t - i), n = !0;
		}
		s = n ? r + e : e + r;
	}
	return o + s;
}
function formatName(e, t, n) {
	return fill(e, t, !1, n);
}
function formatPct(e, t) {
	return fill(e, t || 7, !0, 0);
}
function nodeMissing(e) {
	if (e.isSummary()) return "";
	let t = e.getCoverageSummary(), n = t.isEmpty() ? 0 : t.lines.pct, r, i = e.getFileCoverage();
	if (n === 100) {
		let e = i.getBranchCoverageByLine();
		r = Object.entries(e).map(([e, { coverage: t }]) => [e, t === 100]);
	} else r = Object.entries(i.getLineCoverage());
	let a = !0, o = r.reduce((e, [t, n]) => {
		if (n) a = !0;
		else {
			let n = parseInt(t);
			a ? (e.push([n]), a = !1) : e[e.length - 1][1] = n;
		}
		return e;
	}, []).map((e) => {
		let { length: t } = e;
		return t === 1 ? e[0] : `${e[0]}-${e[1]}`;
	});
	return [].concat(...o).join(",");
}
function nodeName(e) {
	return e.getRelativeName() || "All files";
}
function depthFor(e) {
	let t = 0, n = e.getParent();
	for (; n;) t += 1, n = n.getParent();
	return t;
}
function nullDepthFor() {
	return 0;
}
function findWidth(e, t, n, r = nullDepthFor) {
	let i = 0;
	function compareWidth(e) {
		i = Math.max(i, 1 * r(e) + n(e).length);
	}
	let a = {
		onSummary: compareWidth,
		onDetail: compareWidth
	};
	return e.visit(t.getVisitor(a)), i;
}
function makeLine(e, t) {
	let n = padding(e, "-"), r = padding(7, "-"), i = [];
	return i.push(n), i.push(r), i.push(padding(8, "-")), i.push(r), i.push(r), i.push(padding(t, "-")), i.join(" | ".replace(/ /g, "-")) + "-";
}
function tableHeader(e, t) {
	let n = [];
	return n.push(formatName("File", e, 0)), n.push(formatPct("% Stmts")), n.push(formatPct("% Branch", 8)), n.push(formatPct("% Funcs")), n.push(formatPct("% Lines")), n.push(formatName("Uncovered Line #s", t)), n.join(" | ") + " ";
}
function isFull(e) {
	return e.statements.pct === 100 && e.branches.pct === 100 && e.functions.pct === 100 && e.lines.pct === 100;
}
function skipReason(e, t, n) {
	return t && e.isEmpty() ? "empty" : n && isFull(e) ? "full" : null;
}
function hiddenTableCounts(e, t, n, r) {
	if (!r) return null;
	let i = {
		full: 0,
		empty: 0,
		shown: 0
	};
	return e.visit(t.getVisitor({ onDetail(e) {
		let t = e.getCoverageSummary();
		skipReason(t, n, r) ? t.isEmpty() ? i.empty += 1 : i.full += 1 : i.shown += 1;
	} })), i.shown === 0 && i.full + i.empty > 0 ? i : null;
}
function fileNoun(e) {
	return e === 1 ? "file" : "files";
}
function tableRow(e, t, n, r, i, a, o, s) {
	let c = nodeName(e), l = e.getCoverageSummary(), u = l.isEmpty();
	if (skipReason(l, a, o)) return "";
	let d = {
		statements: u ? 0 : l.statements.pct,
		branches: u ? 0 : l.branches.pct,
		functions: u ? 0 : l.functions.pct,
		lines: u ? 0 : l.lines.pct
	}, f = u ? function(e) {
		return e;
	} : function(e, r) {
		return n(e, classForPercent(t, r, d[r]));
	}, p = [];
	return p.push(f(formatName(c, r, i), "statements")), p.push(f(formatPct(d.statements), "statements")), p.push(f(formatPct(d.branches, 8), "branches")), p.push(f(formatPct(d.functions), "functions")), p.push(f(formatPct(d.lines), "lines")), p.push(n(formatName(nodeMissing(e), s), d.lines === 100 ? "medium" : "low")), p.join(" | ") + " ";
}
var TextReport = class extends e {
	constructor(e) {
		super(e), e ||= {};
		let { maxCols: t } = e;
		this.file = e.file || null, this.maxCols = t ?? (process.stdout.columns || 80), this.cw = null, this.skipEmpty = e.skipEmpty, this.skipFull = e.skipFull, this.hideTable = !1;
	}
	onStart(e, t) {
		this.cw = t.writer.writeFile(this.file);
		let n = hiddenTableCounts(e, t, this.skipEmpty, this.skipFull);
		if (this.hideTable = n !== null, n) {
			this.cw.println("No files with missing coverage."), n.full > 0 && this.cw.println(`${n.full} ${fileNoun(n.full)} fully covered.`), n.empty > 0 && this.cw.println(`${n.empty} empty ${fileNoun(n.empty)} skipped.`);
			return;
		}
		if (this.nameWidth = Math.max(4, findWidth(e, t, nodeName, depthFor)), this.missingWidth = Math.max(17, findWidth(e, t, nodeMissing)), this.maxCols > 0) {
			let e = this.maxCols - 62;
			if (this.nameWidth > e) this.nameWidth = e, this.missingWidth = 17;
			else if (this.nameWidth < e) {
				let e = this.maxCols - (this.nameWidth + 45);
				this.missingWidth > e && (this.missingWidth = e);
			}
		}
		let r = makeLine(this.nameWidth, this.missingWidth);
		this.cw.println(r), this.cw.println(tableHeader(this.nameWidth, this.missingWidth)), this.cw.println(r);
	}
	onSummary(e, t) {
		if (this.hideTable) return;
		let n = depthFor(e), r = tableRow(e, t, this.cw.colorize.bind(this.cw), this.nameWidth, n, this.skipEmpty, this.skipFull, this.missingWidth);
		r && this.cw.println(r);
	}
	onDetail(e, t) {
		return this.onSummary(e, t);
	}
	onEnd() {
		this.hideTable || this.cw.println(makeLine(this.nameWidth, this.missingWidth)), this.cw.close();
	}
};
//#endregion
export { TextReport as default };
