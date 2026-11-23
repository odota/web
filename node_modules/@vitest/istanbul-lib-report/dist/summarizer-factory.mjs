import e from "./path.mjs";
import { BaseNode as t, BaseTree as n } from "./tree.mjs";
import { createCoverageSummary as r } from "@vitest/istanbul-lib-coverage";
//#region src/summarizer-factory.ts
var i = class ReportNode extends t {
	constructor(e, t) {
		super(), this.path = e, this.parent = null, this.fileCoverage = t, this.children = [];
	}
	static createRoot(t) {
		let n = new ReportNode(new e([]));
		return t.forEach((e) => {
			n.addChild(e);
		}), n;
	}
	addChild(e) {
		e.parent = this, this.children.push(e);
	}
	asRelative(e) {
		return e.substring(0, 1) === "/" ? e.substring(1) : e;
	}
	getQualifiedName() {
		return this.asRelative(this.path.toString());
	}
	getRelativeName() {
		let t = this.getParent(), n = this.path, r, i, a = t ? t.path : new e([]);
		if (a.ancestorOf(n)) {
			for (r = new e(n.elements()), i = 0; i < a.length; i += 1) r.shift();
			return this.asRelative(r.toString());
		}
		return this.asRelative(this.path.toString());
	}
	getParent() {
		return this.parent;
	}
	getChildren() {
		return this.children;
	}
	isSummary() {
		return !this.fileCoverage;
	}
	getFileCoverage() {
		return this.fileCoverage;
	}
	getCoverageSummary(e) {
		let t = `c_${e ? "files" : "full"}`, n;
		if (Object.prototype.hasOwnProperty.call(this, t)) return this[t];
		if (!this.isSummary()) n = this.getFileCoverage().toSummary();
		else {
			let t = 0;
			n = r(), this.getChildren().forEach((r) => {
				e && r.isSummary() || (t += 1, n.merge(r.getCoverageSummary(e)));
			}), t === 0 && e && (n = null);
		}
		return this[t] = n, n;
	}
}, ReportTree = class extends n {
	constructor(e, t) {
		super(e);
		let maybePrefix = (e) => {
			t && !e.isRoot() && e.path.unshift(t);
		};
		this.visit({
			onDetail: maybePrefix,
			onSummary(e) {
				maybePrefix(e), e.children.sort((e, t) => {
					let n = e.path.toString(), r = t.path.toString();
					return n < r ? -1 : +(n > r);
				});
			}
		});
	}
};
function findCommonParent(t) {
	return t.reduce((e, t) => e.commonPrefixPath(t), t[0] || new e([]));
}
function findOrCreateParent(e, t, n = () => {}) {
	let r = t[e.toString()];
	return r || (r = new i(e), t[e.toString()] = r, n(e, r)), r;
}
function toDirParents(e) {
	let t = Object.create(null);
	return e.forEach((e) => {
		findOrCreateParent(e.path.parent(), t).addChild(new i(e.path, e.fileCoverage));
	}), Object.values(t);
}
function addAllPaths(e, t, n, r) {
	findOrCreateParent(n.parent(), t, (n, r) => {
		n.hasParent() ? addAllPaths(e, t, n, r) : e.push(r);
	}).addChild(r);
}
function foldIntoOneDir(e, t) {
	let { children: n } = e;
	return n.length === 1 && !n[0].fileCoverage ? (n[0].parent = t, foldIntoOneDir(n[0], t)) : (e.children = n.map((t) => foldIntoOneDir(t, e)), e);
}
function pkgSummaryPrefix(e, t) {
	if (e.some((e) => e.path.length === 0)) return t.length === 0 ? "root" : t.name();
}
var SummarizerFactory = class {
	constructor(t, n = "pkg") {
		this._coverageMap = t, this._defaultSummarizer = n, this._initialList = t.files().map((n) => ({
			filePath: n,
			path: new e(n),
			fileCoverage: t.fileCoverageFor(n)
		})), this._commonParent = findCommonParent(this._initialList.map((e) => e.path.parent())), this._commonParent.length > 0 && this._initialList.forEach((e) => {
			e.path.splice(0, this._commonParent.length);
		});
	}
	get defaultSummarizer() {
		return this[this._defaultSummarizer];
	}
	get flat() {
		return this._flat ||= new ReportTree(i.createRoot(this._initialList.map((e) => new i(e.path, e.fileCoverage)))), this._flat;
	}
	_createPkg() {
		let e = toDirParents(this._initialList);
		return e.length === 1 ? new ReportTree(e[0]) : new ReportTree(i.createRoot(e), pkgSummaryPrefix(e, this._commonParent));
	}
	get pkg() {
		return this._pkg ||= this._createPkg(), this._pkg;
	}
	_createNested() {
		let e = Object.create(null), t = [];
		this._initialList.forEach((n) => {
			let r = new i(n.path, n.fileCoverage);
			addAllPaths(t, e, n.path, r);
		});
		let n = t.map((e) => foldIntoOneDir(e));
		return n.length === 1 ? new ReportTree(n[0]) : new ReportTree(i.createRoot(n));
	}
	get nested() {
		return this._nested ||= this._createNested(), this._nested;
	}
};
//#endregion
export { i as ReportNode, ReportTree, SummarizerFactory as default };
