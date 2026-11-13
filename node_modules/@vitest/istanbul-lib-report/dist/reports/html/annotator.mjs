import e from "./insertion-text.mjs";
//#region src/reports/html/annotator.ts
const t = /</g, n = />/g, r = /&/g;
var i = /\u0001/g, a = /\u0002/g;
function title(e) {
	return " title=\"" + e + "\" ";
}
function customEscape(e) {
	return e = String(e), e.replace(r, "&amp;").replace(t, "&lt;").replace(n, "&gt;").replace(i, "<").replace(a, ">");
}
function annotateLines(e, t) {
	let n = e.getLineCoverage();
	n && Object.entries(n).forEach(([e, n]) => {
		let r = t[e];
		r && (r.covered = n > 0 ? "yes" : "no", r.hits = n);
	});
}
function annotateStatements(e, t) {
	let n = e.s, r = e.statementMap;
	Object.entries(n).forEach(([e, n]) => {
		let i = r[e], a = n > 0 ? "yes" : "no", o = i.start.column, s = i.end.column + 1, c = i.start.line, l = i.end.line, u = "span class=\"" + (i.skip ? "cstat-skip" : "cstat-no") + "\"" + title("statement not covered") + "", d;
		a === "no" && t[c] && (l !== c && (s = t[c].text.originalLength()), d = t[c].text, d.wrap(o, u, o < s ? s : d.originalLength(), "/span"));
	});
}
function annotateFunctions(e, t) {
	let n = e.f, r = e.fnMap;
	n && Object.entries(n).forEach(([e, n]) => {
		let i = r[e], a = n > 0 ? "yes" : "no", o = i.decl || i.loc, s = o.start.column, c = o.end.column + 1, l = o.start.line, u = o.end.line, d = "span class=\"" + (i.skip ? "fstat-skip" : "fstat-no") + "\"" + title("function not covered") + "", f;
		a === "no" && t[l] && (u !== l && (c = t[l].text.originalLength()), f = t[l].text, f.wrap(s, d, s < c ? c : f.originalLength(), "/span"));
	});
}
function annotateBranches(e, t) {
	let n = e.b, r = e.branchMap;
	n && Object.entries(n).forEach(([e, n]) => {
		let i = n.reduce((e, t) => e + t, 0), a = r[e].locations, o, s, c, l, u, d, f, p, m, h;
		if (i > 0 || i === 0 && n.length === 1) for (r[e].type === "if" && n.length === 2 && a.length === 1 && n[1] === 0 && (a[1] = {
			start: {},
			end: {}
		}), o = 0; o < n.length && o < a.length; o += 1) {
			if (s = n[o], c = a[o], l = c.start.column, u = c.end.column + 1, d = c.start.line, f = c.end.line, p = "span class=\"branch-" + o + " " + (c.skip ? "cbranch-skip" : "cbranch-no") + "\"" + title("branch not covered") + "", m = "/span", s === 0 && d === void 0 && r[e].type === "if") {
				let e = a[o - 1];
				l = e.start.column, u = e.end.column + 1, d = e.start.line, f = e.end.line;
			}
			s === 0 && t[d] && (f !== d && (u = t[d].text.originalLength()), h = t[d].text, r[e].type === "if" ? h.insertAt(l, "span class=\"" + (c.skip ? "skip-if-branch" : "missing-if-branch") + "\"" + title((o === 0 ? "if" : "else") + " path not taken") + "" + (o === 0 ? "I" : "E") + "/span", !0, !1) : h.wrap(l, p, l < u ? u : h.originalLength(), m));
		}
	});
}
function annotateSourceCode(t, n) {
	let r, i;
	try {
		let a = n.getSource(t.path).split(/(?:\r?\n)|\r/), o = 0, s = a.map((t) => (o += 1, {
			line: o,
			covered: "neutral",
			hits: 0,
			text: new e(t, !0)
		}));
		return s.unshift({
			line: 0,
			covered: null,
			text: new e("")
		}), annotateLines(t, s), annotateBranches(t, s), annotateFunctions(t, s), annotateStatements(t, s), s.shift(), r = s.map((e) => customEscape(e.text.toString()) || "&nbsp;"), i = s.map((e) => ({
			covered: e.covered,
			hits: e.hits > 0 ? e.hits + "x" : "&nbsp;"
		})), {
			annotatedCode: r,
			lineCoverage: i,
			maxLines: s.length
		};
	} catch (e) {
		return r = [e.message], i = [{
			covered: "no",
			hits: 0
		}], String(e.stack || "").split(/\r?\n/).forEach((e) => {
			r.push(e), i.push({
				covered: "no",
				hits: 0
			});
		}), {
			annotatedCode: r,
			lineCoverage: i,
			maxLines: r.length
		};
	}
}
//#endregion
export { annotateSourceCode as default };
