//#region src/data-properties.ts
function dataProperties(e, t) {
	t.forEach((t) => {
		Object.defineProperty(e.prototype, t, {
			enumerable: !0,
			get() {
				return this.data[t];
			}
		});
	});
}
//#endregion
//#region src/percent.ts
function percent(e, t) {
	let n;
	return t > 0 ? (n = 1e5 * e / t, Math.floor(n / 10) / 100) : 100;
}
//#endregion
//#region src/coverage-summary.ts
function blankSummary() {
	let empty = () => ({
		total: 0,
		covered: 0,
		skipped: 0,
		pct: "Unknown"
	});
	return {
		lines: empty(),
		statements: empty(),
		functions: empty(),
		branches: empty(),
		branchesTrue: empty()
	};
}
function assertValidSummary(e) {
	if (!(e && e.lines && e.statements && e.functions && e.branches)) throw Error("Invalid summary coverage object, missing keys, found:" + Object.keys(e).join(","));
}
var CoverageSummary = class {
	data;
	constructor(e) {
		this.data = e ? isCoverageSummary(e) ? e.data : e : blankSummary(), assertValidSummary(this.data);
	}
	merge(e) {
		return [
			"lines",
			"statements",
			"branches",
			"functions",
			"branchesTrue"
		].forEach((t) => {
			let n = e[t];
			if (n) {
				let e = this[t];
				e.total += n.total, e.covered += n.covered, e.skipped += n.skipped, e.pct = percent(e.covered, e.total);
			}
		}), this;
	}
	toJSON() {
		return this.data;
	}
	isEmpty() {
		return this.lines.total === 0;
	}
};
dataProperties(CoverageSummary, [
	"lines",
	"statements",
	"functions",
	"branches",
	"branchesTrue"
]);
function isCoverageSummary(e) {
	return e instanceof CoverageSummary || typeof e == "object" && !!e && typeof e.data == "object" && typeof e.isEmpty == "function" && typeof e.merge == "function";
}
//#endregion
//#region src/file-coverage.ts
function emptyCoverage(e, t) {
	let n = {
		path: e,
		statementMap: {},
		fnMap: {},
		branchMap: {},
		s: {},
		f: {},
		b: {}
	};
	return t && (n.bT = {}), n;
}
function assertValidObject(e) {
	if (!(e && e.path && e.statementMap && e.fnMap && e.branchMap && e.s && e.f && e.b)) throw Error("Invalid file coverage object, missing keys, found:" + Object.keys(e).join(","));
}
const keyFromLoc = ({ start: e, end: t }) => `${e.line}|${e.column}|${t.line}|${t.column}`, isObj = (e) => !!e && typeof e == "object", isLineCol = (e) => isObj(e) && typeof e.line == "number" && typeof e.column == "number", isLoc = (e) => isObj(e) && isLineCol(e.start) && isLineCol(e.end), getLoc = (e) => isLoc(e) ? e : isLoc(e.loc) ? e.loc : null, findNearestContainer = (e, t) => {
	let n = getLoc(e);
	if (!n) return null;
	let r = null, i = null, a = null;
	for (let [e, o] of Object.entries(t)) {
		let t = getLoc(o);
		if (!t) continue;
		let s = [
			n.start.line - t.start.line,
			n.start.column - t.start.column,
			t.end.line - n.end.line,
			t.end.column - n.end.column
		];
		if (s[0] < 0 || s[2] < 0 || s[0] === 0 && s[1] < 0 || s[2] === 0 && s[3] < 0) continue;
		if (r === null) {
			i = s, r = o, a = e;
			continue;
		}
		let c = s[0] < i[0] || s[0] === 0 && s[1] < i[1], l = s[2] < i[2] || s[2] === 0 && s[3] < i[3];
		(c || l) && (i = s, r = o, a = e);
	}
	return a;
}, addHits = (e, t) => typeof e == "number" && typeof t == "number" ? e + t : Array.isArray(e) && Array.isArray(t) ? e.map((e, n) => (e || 0) + (t[n] || 0)) : null, addNearestContainerHits = (e, t, n, r) => {
	let i = findNearestContainer(e, n);
	return i ? addHits(t, r[i]) : t;
}, mergeProp = (e, t, n, r, i = keyFromLoc) => {
	let a = {};
	for (let [n, r] of Object.entries(e)) {
		let e = t[n];
		a[i(e)] = [r, e];
	}
	let o = {};
	for (let [e, t] of Object.entries(n)) {
		let n = r[e];
		o[i(n)] = [t, n];
	}
	let s = {};
	for (let [e, t] of Object.entries(a)) {
		let i = t[0], a = t[1], c = o[e];
		i = c ? addHits(i, c[0]) : addNearestContainerHits(a, i, r, n), s[e] = [i, a];
	}
	for (let [n, r] of Object.entries(o)) {
		let i = r[0], a = r[1];
		s[n] || (i = addNearestContainerHits(a, i, t, e), s[n] = [i, a]);
	}
	let c = {}, l = {};
	return Object.values(s).forEach(([e, t], n) => {
		c[n] = e, l[n] = t;
	}), [c, l];
}, e = /^\(anonymous_(\d+)\)$/;
function renameConflictingFns(t) {
	let n = new Set();
	for (let [r, i] of Object.entries(t)) {
		if (!n.has(i.name)) {
			n.add(i.name);
			continue;
		}
		let a = e.exec(i.name), o;
		if (a) {
			let e = Number(a[1]) + 1;
			for (o = `(anonymous_${e})`; n.has(o);) o = `(anonymous_${++e})`;
		} else {
			let e = 2;
			for (o = `${i.name}_${e}`; n.has(o);) o = `${i.name}_${++e}`;
		}
		t[r] = {
			...i,
			name: o
		}, n.add(o);
	}
}
var FileCoverage = class {
	data;
	constructor(e, t = !1) {
		if (!e) throw Error("Coverage must be initialized with a path or an object");
		if (typeof e == "string") this.data = emptyCoverage(e, t);
		else if (isFileCoverage(e)) this.data = e.data;
		else if (typeof e == "object") this.data = e;
		else throw Error("Invalid argument to coverage constructor");
		assertValidObject(this.data);
	}
	getLineCoverage() {
		let e = this.data.statementMap, t = this.data.s, n = Object.create(null);
		return Object.entries(t).forEach(([t, r]) => {
			if (!e[t]) return;
			let { line: i } = e[t].start, a = n[i];
			(a === void 0 || a < r) && (n[i] = r);
		}), n;
	}
	getUncoveredLines() {
		let e = this.getLineCoverage(), t = [];
		return Object.entries(e).forEach(([e, n]) => {
			n === 0 && t.push(e);
		}), t;
	}
	getBranchCoverageByLine() {
		let e = this.branchMap, t = this.b, n = {};
		return Object.entries(e).forEach(([e, r]) => {
			let i = r.line || r.loc.start.line, a = t[e];
			n[i] = n[i] || [], n[i].push(...a);
		}), Object.entries(n).forEach(([e, t]) => {
			let r = t.filter((e) => e > 0), i = r.length / t.length * 100;
			n[e] = {
				covered: r.length,
				total: t.length,
				coverage: i
			};
		}), n;
	}
	toJSON() {
		return this.data;
	}
	merge(e) {
		if (e.all === !0) return;
		if (this.all === !0) {
			this.data = e.data;
			return;
		}
		let [t, n] = mergeProp(this.s, this.statementMap, e.s, e.statementMap);
		this.data.s = t, this.data.statementMap = n;
		let keyFromLocProp = (e) => keyFromLoc(e.loc), keyFromLocationsProp = (e) => keyFromLoc(e.locations[0]), [r, i] = mergeProp(this.f, this.fnMap, e.f, e.fnMap, keyFromLocProp);
		renameConflictingFns(i), this.data.f = r, this.data.fnMap = i;
		let [a, o] = mergeProp(this.b, this.branchMap, e.b, e.branchMap, keyFromLocationsProp);
		if (this.data.b = a, this.data.branchMap = o, this.bT && e.bT) {
			let [t] = mergeProp(this.bT, this.branchMap, e.bT, e.branchMap, keyFromLocationsProp);
			this.data.bT = t;
		}
	}
	computeSimpleTotals(e) {
		let t = this[e];
		typeof t == "function" && (t = t.call(this));
		let n = Object.keys(t).length, r = Object.values(t).filter((e) => !!e).length;
		return {
			total: n,
			covered: r,
			skipped: 0,
			pct: percent(r, n)
		};
	}
	computeBranchTotals(e) {
		let t = this[e], n = {
			total: 0,
			covered: 0,
			skipped: 0,
			pct: 0
		};
		return Object.values(t).forEach((e) => {
			n.covered += e.filter((e) => e > 0).length, n.total += e.length;
		}), n.pct = percent(n.covered, n.total), n;
	}
	resetHits() {
		let e = this.s, t = this.f, n = this.b, r = this.bT;
		Object.keys(e).forEach((t) => {
			e[t] = 0;
		}), Object.keys(t).forEach((e) => {
			t[e] = 0;
		}), Object.keys(n).forEach((e) => {
			n[e].fill(0);
		}), r && Object.keys(r).forEach((e) => {
			r[e].fill(0);
		});
	}
	toSummary() {
		let e = {
			lines: this.computeSimpleTotals("getLineCoverage"),
			functions: this.computeSimpleTotals("f"),
			statements: this.computeSimpleTotals("s"),
			branches: this.computeBranchTotals("b")
		};
		return this.bT && (e.branchesTrue = this.computeBranchTotals("bT")), new CoverageSummary(e);
	}
};
dataProperties(FileCoverage, [
	"path",
	"statementMap",
	"fnMap",
	"branchMap",
	"s",
	"f",
	"b",
	"bT",
	"all"
]);
function isFileCoverage(e) {
	return e instanceof FileCoverage || typeof e == "object" && !!e && typeof e.data == "object" && typeof e.toSummary == "function" && typeof e.getLineCoverage == "function";
}
//#endregion
//#region src/coverage-map.ts
function isCoverageMap(e) {
	return e instanceof t || typeof e == "object" && !!e && typeof e.data == "object" && typeof e.fileCoverageFor == "function" && typeof e.addFileCoverage == "function";
}
function loadMap(e) {
	let t = Object.create(null);
	return e && Object.entries(e).forEach(([e, n]) => {
		t[e] = n instanceof FileCoverage ? n : new FileCoverage(n);
	}), t;
}
var t = class CoverageMap {
	data;
	constructor(e) {
		this.data = e instanceof CoverageMap ? e.data : isCoverageMap(e) ? loadMap(e.data) : loadMap(e);
	}
	merge(e) {
		let t = e instanceof CoverageMap ? e : new CoverageMap(e);
		Object.values(t.data).forEach((e) => {
			this.addFileCoverage(e);
		});
	}
	filter(e) {
		Object.keys(this.data).forEach((t) => {
			e(t) || delete this.data[t];
		});
	}
	toJSON() {
		return this.data;
	}
	files() {
		return Object.keys(this.data);
	}
	fileCoverageFor(e) {
		let t = this.data[e];
		if (!t) throw Error(`No file coverage available for: ${e}`);
		return t;
	}
	addFileCoverage(e) {
		let t = new FileCoverage(e), { path: n } = t;
		this.data[n] ? this.data[n].merge(t) : this.data[n] = t;
	}
	getCoverageSummary() {
		let e = new CoverageSummary();
		return Object.values(this.data).forEach((t) => {
			e.merge(t.toSummary());
		}), e;
	}
};
//#endregion
//#region src/index.ts
function createCoverageSummary(e) {
	return e && e instanceof CoverageSummary ? e : new CoverageSummary(e);
}
function createCoverageMap(e) {
	return e && e instanceof t ? e : new t(e);
}
function createFileCoverage(e) {
	return e && e instanceof FileCoverage ? e : new FileCoverage(e);
}
const n = { FileCoverage };
//#endregion
export { n as classes, createCoverageMap, createCoverageSummary, createFileCoverage };
