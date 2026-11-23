import { walk as e } from "estree-walker";
import { dirname as t, resolve as n } from "node:path";
import { fileURLToPath as r } from "node:url";
import { LEAST_UPPER_BOUND as i, TraceMap as a, allGeneratedPositionsFor as o, originalPositionFor as s, sourceContentFor as c } from "@jridgewell/trace-mapping";
import { readFileSync as l } from "node:fs";
import { readFile as u } from "node:fs/promises";
import d from "js-tokens";
//#region src/ast.ts
function getWalker() {
	let t = !1;
	function onIgnore(e) {
		t = e;
	}
	function walk$1(n, r, i, a) {
		return e(n, {
			enter(e) {
				if (t !== !1) return;
				let n = getIgnoreHint(e);
				if (n === "next") return onIgnore(e);
				switch (isSkipped(e) && e.type !== "LogicalExpression" && onIgnore(e), e.type) {
					case "FunctionDeclaration": return a.onFunctionDeclaration(e);
					case "FunctionExpression": return i && e.id?.name && i.includes(e.id.name) ? onIgnore(e) : a.onFunctionExpression(e);
					case "MethodDefinition": return a.onMethodDefinition(e);
					case "Property": return a.onProperty(e);
					case "ArrowFunctionExpression": return e.body?.type === "ParenthesizedExpression" && (e.body = e.body.expression), a.onArrowFunctionExpression(e);
					case "ExpressionStatement": return a.onExpressionStatement(e);
					case "BreakStatement": return a.onBreakStatement(e);
					case "ContinueStatement": return a.onContinueStatement(e);
					case "DebuggerStatement": return a.onDebuggerStatement(e);
					case "ReturnStatement": return a.onReturnStatement(e);
					case "ThrowStatement": return a.onThrowStatement(e);
					case "TryStatement": return a.onTryStatement(e);
					case "ForStatement": return a.onForStatement(e);
					case "ForInStatement": return a.onForInStatement(e);
					case "ForOfStatement": return a.onForOfStatement(e);
					case "WhileStatement": return a.onWhileStatement(e);
					case "DoWhileStatement": return a.onDoWhileStatement(e);
					case "WithStatement": return a.onWithStatement(e);
					case "LabeledStatement": return a.onLabeledStatement(e);
					case "VariableDeclarator": return a.onVariableDeclarator(e);
					case "ClassBody": {
						let t = e;
						if (i) {
							for (let e of t.body) if (e.type === "MethodDefinition" || e.type === "ClassMethod") {
								let t = e.key.type === "Identifier" && e.key.name;
								t && i.includes(t) && setSkipped(e);
							}
							t.body = t.body.filter((e) => !isSkipped(e));
						}
						return a.onClassBody(t);
					}
					case "IfStatement": {
						let t = [];
						return e.consequent.type !== "BlockStatement" && (e.consequent = {
							type: "BlockStatement",
							body: [e.consequent],
							start: e.consequent.start,
							end: e.consequent.end
						}), e.alternate && e.alternate.type !== "BlockStatement" && (e.alternate = {
							type: "BlockStatement",
							body: [e.alternate],
							start: e.alternate.start,
							end: e.alternate.end
						}), n === "if" ? setSkipped(e.consequent) : t.push(e.consequent), n === "else" && e.alternate ? setSkipped(e.alternate) : n !== "if" && n !== "else" && t.push(e.alternate), a.onIfStatement(e, t);
					}
					case "SwitchStatement": {
						let t = [];
						for (let n of e.cases) getIgnoreHint(n) !== "next" && t.push(n);
						return a.onSwitchStatement(e, t);
					}
					case "ConditionalExpression": {
						let t = [];
						return e.consequent.type === "ParenthesizedExpression" && (e.consequent = e.consequent.expression), e.alternate.type === "ParenthesizedExpression" && (e.alternate = e.alternate.expression), getIgnoreHint(e.consequent) === "next" ? setSkipped(e.consequent) : t.push(e.consequent), getIgnoreHint(e.alternate) === "next" ? setSkipped(e.alternate) : t.push(e.alternate), a.onConditionalExpression(e, t);
					}
					case "LogicalExpression": {
						if (isSkipped(e)) return;
						let t = [];
						function visit(e) {
							if (e.type === "ParenthesizedExpression") return visit(e.expression);
							if (e.type === "LogicalExpression" && (setSkipped(e), getIgnoreHint(e) !== "next")) return visit(e.left), visit(e.right);
							t.push(e);
						}
						return visit(e), a.onLogicalExpression(e, t);
					}
					case "AssignmentPattern": return a.onAssignmentPattern(e);
					case "ClassMethod": return a.onClassMethod(e);
					case "ObjectMethod": return a.onObjectMethod(e);
				}
			},
			leave(e) {
				e === t && (t = !1);
			}
		});
		function getIgnoreHint(e) {
			for (let t of r) if (t.loc.end === e.start) return t.type;
			return null;
		}
	}
	return {
		walk: walk$1,
		onIgnore
	};
}
const f = new WeakSet();
function getFunctionName(e) {
	if (e.type === "Identifier") return e.name;
	if ("id" in e && e.id) return getFunctionName(e.id);
	if ("key" in e && e.key) return getFunctionName(e.key);
}
function setSkipped(e) {
	f.add(e);
}
function isSkipped(e) {
	return f.has(e);
}
//#endregion
//#region src/coverage-map.ts
function createCoverageMapData(e, i) {
	let a = {}, o = t(e);
	for (let t of i.sources) {
		let i = e;
		t && (i = t.startsWith("file://") ? r(t) : n(o, t)), a[i] = {
			path: i,
			statementMap: {},
			fnMap: {},
			branchMap: {},
			s: {},
			f: {},
			b: {},
			meta: {
				lastBranch: 0,
				lastFunction: 0,
				lastStatement: 0,
				seen: {},
				fnNames: new Map()
			}
		};
	}
	return a;
}
function addFunction(e) {
	let t = e.coverageMapData[e.filename], n = t.meta, r = `f:${cacheKey(e.decl)}`, i = n.seen[r];
	if (i == null) {
		i = n.lastFunction, n.lastFunction++, n.seen[r] = i;
		let a = e.name;
		if (a) {
			let e = a, t = (n.fnNames.get(e) || 0) + 1;
			for (a = t > 1 ? `${e}_${t}` : e; n.fnNames.has(a);) t++, a = `${e}_${t}`;
			n.fnNames.set(e, t), a !== e && n.fnNames.set(a, 0);
		}
		t.fnMap[i] = {
			name: a || `(anonymous_${i})`,
			decl: pickLocation(e.decl),
			loc: pickLocation(e.loc),
			line: e.loc.start.line
		};
	}
	t.f[i] ||= 0, t.f[i] += e.covered || 0;
}
function addStatement(e) {
	let t = e.coverageMapData[e.filename], n = t.meta, r = `s:${cacheKey(e.loc)}`, i = n.seen[r];
	i ?? (i = n.lastStatement, n.lastStatement++, n.seen[r] = i, t.statementMap[i] = pickLocation(e.loc)), t.s[i] = e.covered || 0;
}
function addBranch(e) {
	let t = e.coverageMapData[e.filename], n = t.meta, r = ["b", ...e.locations.map(cacheKey)].join(":"), i = n.seen[r];
	i ?? (i = n.lastBranch, n.lastBranch++, n.seen[r] = i, t.branchMap[i] = {
		loc: pickLocation(e.loc),
		type: e.type,
		locations: e.locations.map((e) => pickLocation(e)),
		line: e.loc.start.line
	}), t.b[i] || (t.b[i] = Array(e.locations.length).fill(0)), e.covered?.forEach((e, n) => {
		t.b[i][n] !== void 0 && (t.b[i][n] += e);
	});
}
function pickLocation(e) {
	return {
		start: {
			line: e.start.line,
			column: e.start.column
		},
		end: {
			line: e.end.line,
			column: e.end.column
		}
	};
}
function cacheKey(e) {
	return `${e.start.line}:${e.start.column}:${e.end.line}:${e.end.column}`;
}
//#endregion
//#region src/ignore-hints.ts
const p = /^\s*(?:istanbul|[cv]8|node:coverage)\s+ignore\s+(if|else|next|file)(?=\W|$)/, m = /(?:istanbul|[cv]8|node:coverage)\s+ignore\s+(if|else|next|file)(?=\W|$)/, h = /\s*(?:istanbul|[cv]8|node:coverage)\s+ignore\s+(start|stop)(?=\W|$)/, g = /\r?\n/g;
function getIgnoreHints(e) {
	if (!m.test(e)) return [];
	let t = [], n = d(e), r = 0, i = !1;
	for (let e of n) {
		if (i && e.type !== "WhiteSpace" && e.type !== "LineTerminatorSequence") {
			let e = t.at(-1);
			e && (e.loc.end = r), i = !1;
		}
		if (e.type === "SingleLineComment" || e.type === "MultiLineComment") {
			let n = {
				start: r,
				end: r + e.value.length
			}, a = e.value.replace(/^\/\*\*/, "").replace(/^\/\*/, "").replace(/\*\*\/$/, "").replace(/\*\/$/, "").replace(/^\/\//, "").match(p)?.[1];
			if (a === "file") return [{
				type: "file",
				loc: {
					start: 0,
					end: 0
				}
			}];
			(a === "if" || a === "else" || a === "next") && (t.push({
				type: a,
				loc: n
			}), i = !0);
		}
		r += e.value.length;
	}
	return t;
}
function getIgnoredLines(e) {
	if (!e) return new Set();
	let t = [], n = 0;
	for (let r of e.split(g)) {
		n++;
		let e = r.match(h);
		if (e) {
			if (e[1] === "stop") {
				let e = t.at(-1);
				e && e.stop === Infinity && (e.stop = n);
				continue;
			}
			t.push({
				start: n,
				stop: Infinity
			});
		}
	}
	let r = new Set();
	for (let e of t) for (let t = e.start; t <= e.stop && (r.add(t), !(t >= n)); t++);
	return r;
}
//#endregion
//#region src/location.ts
const _ = /(\w+|\s|[^\w\s])/g, v = /#\s*sourceMappingURL=(.*)\s*$/m, y = "data:application/json;base64,";
var Locator = class {
	#e = [0];
	#t;
	#n;
	#r = new Map();
	constructor(e, t, n) {
		for (let t = 0; t < e.length; t++) e.charCodeAt(t) === 10 && this.#e.push(t + 1);
		this.#t = t, this.#n = n;
	}
	reset() {
		this.#r.clear(), this.#e = [0];
	}
	offsetToNeedle(e) {
		let t = 0, n = this.#e.length - 1;
		for (; t <= n;) {
			let r = t + n >> 1;
			this.#e[r] <= e ? t = r + 1 : n = r - 1;
		}
		return {
			line: n + 1,
			column: e - this.#e[n]
		};
	}
	getLoc(e) {
		let t = this.offsetToNeedle(e.start), n = getPosition(t, this.#t);
		if (n === null) return null;
		let r = this.offsetToNeedle(e.end);
		--r.column;
		let a = getPosition(r, this.#t);
		if (a === null) {
			for (let e = r.line; e >= t.line && a === null; e--) a = getPosition({
				line: e,
				column: Infinity
			}, this.#t);
			if (a === null) return null;
		}
		let l = {
			start: n,
			end: a
		}, u = o(this.#t, {
			source: l.end.filename,
			line: l.end.line,
			column: l.end.column + 1,
			bias: i
		});
		if (u.length === 0) l.end.column = Infinity;
		else for (let e of u) {
			if (e.line === null) continue;
			let t = s(this.#t, e);
			if (t.line === l.end.line) {
				l.end = {
					...t,
					filename: t.source
				};
				break;
			}
		}
		let d = l.start.filename, f = this.#r.get(d);
		return f || (f = getIgnoredLines(c(this.#t, d) ?? tryReadFileSync(d)), this.#r.set(d, f)), f.has(l.start.line) ? null : l;
	}
	getSourceLines(e, t) {
		let r = this.#t.resolvedSources.findIndex((e) => e === t || n(this.#n, e) === t), i = this.#t.sourcesContent?.[r];
		if (i == null) return null;
		let a = i.split("\n").slice(e.start.line - 1, e.end.line);
		return a[0] = a[0].slice(e.start.column), a[a.length - 1] = a[a.length - 1].slice(0, e.end.column), a.join("\n");
	}
};
function getPosition(e, t) {
	let n = s(t, e);
	return n.source ?? (n = s(t, {
		column: e.column,
		line: e.line,
		bias: i
	})), n.source == null ? null : {
		line: n.line,
		column: n.column,
		filename: n.source
	};
}
function createEmptySourceMap(e, t) {
	let n = [];
	for (let [e, r] of t.split("\n").entries()) {
		let t = r.match(_) || [], i = [], a = 0;
		for (let n of t) i.push([
			a,
			0,
			e,
			a
		]), a += n.length;
		n.push(i);
	}
	return {
		version: 3,
		mappings: n,
		file: e,
		sources: [e],
		sourcesContent: [t],
		names: []
	};
}
async function getInlineSourceMap(e, r) {
	let i = r.match(v)?.[1];
	if (!i) return null;
	try {
		if (i.includes(y)) {
			let e = i.split(y).at(-1) || "", t = atob(e);
			return JSON.parse(t);
		}
		let r = t(e), a = await u(n(r, i), "utf-8");
		return JSON.parse(a);
	} catch {
		return null;
	}
}
function tryReadFileSync(e) {
	try {
		return l(e, "utf8");
	} catch {
		return;
	}
}
function normalize(e, t = 2e6) {
	if (e.functions.length === 0) return [];
	let n = 0, r = e.functions.flatMap((e) => e.ranges.map((e) => ({
		start: e.startOffset,
		end: e.endOffset,
		count: e.count,
		area: e.endOffset - e.startOffset,
		order: n++
	}))), i = 0;
	for (let e of r) e.end > i && (i = e.end);
	return i <= t ? normalizeWithHitsArray(r, i) : normalizeWithEventSweep(r);
}
function normalizeWithHitsArray(e, t) {
	e.sort((e, t) => {
		let n = t.area - e.area;
		return n === 0 ? e.end - t.end : n;
	});
	let n = new Uint32Array(t);
	for (let t of e) n.fill(t.count, t.start, t.end);
	let r = [], i = 0;
	for (let e = 1; e <= n.length; e++) {
		let t = e === n.length, a = t ? null : n[e], o = n[i];
		(a !== o || t) && (r.push({
			start: i,
			end: e - 1,
			count: o
		}), i = e);
	}
	return r;
}
function normalizeWithEventSweep(e) {
	let t = [];
	for (let n of e) n.start < n.end && (t.push({
		offset: n.start,
		range: n,
		isStart: !0
	}), t.push({
		offset: n.end,
		range: n,
		isStart: !1
	}));
	t.sort((e, t) => e.offset - t.offset);
	let n = [], r = [], i = t.length > 0 ? t[0].offset : 0, a = 0;
	for (; a < t.length;) {
		let e = t[a].offset;
		if (n.length > 0 && i < e) {
			let t = getMostSpecificRange(n).count, a = r.at(-1);
			a && a.end + 1 === i && a.count === t ? a.end = e - 1 : r.push({
				start: i,
				end: e - 1,
				count: t
			});
		}
		for (; a < t.length && t[a].offset === e;) {
			let e = t[a];
			e.isStart ? n.push(e.range) : n.splice(n.indexOf(e.range), 1), a++;
		}
		i = e;
	}
	return r;
}
function getMostSpecificRange(e) {
	let t = e[0];
	for (let n = 1; n < e.length; n++) {
		let r = e[n];
		(r.area < t.area || r.area === t.area && r.end > t.end || r.area === t.area && r.end === t.end && r.order > t.order) && (t = r);
	}
	return t;
}
function getCount(e, t) {
	let n = 0, r = t.length - 1;
	for (; n <= r;) {
		let i = Math.floor((n + r) / 2), a = t[i];
		if (a.start <= e.startOffset && e.startOffset <= a.end) return a.count;
		e.startOffset < a.start ? r = i - 1 : n = i + 1;
	}
	return 0;
}
//#endregion
//#region src/coverage-mapper.ts
var b = class CoverageMapper {
	locator;
	coverageMapData;
	ranges;
	wrapperLength;
	directory;
	onIgnoreNode;
	ignoreNode;
	ignoreSourceCode;
	constructor(e, t, n, r, i, a, o, s) {
		this.locator = e, this.coverageMapData = t, this.ranges = n, this.wrapperLength = r, this.directory = i, this.onIgnoreNode = a, this.ignoreNode = o, this.ignoreSourceCode = s;
	}
	static async create(e, n) {
		let i = r(e.coverage.url), o = t(i), s = new a(e.sourceMap || await getInlineSourceMap(i, e.code) || createEmptySourceMap(i, e.code));
		return new CoverageMapper(new Locator(e.code, s, o), createCoverageMapData(i, s), normalize(e.coverage), e.wrapperLength || 0, o, n, e.ignoreNode, e.ignoreSourceCode);
	}
	onFunction(e, t) {
		if (this.#t(e, "function")) return;
		let n = this.locator.getLoc(t.loc);
		if (n === null) return;
		let r = this.locator.getLoc(t.decl);
		if (r === null) return;
		let i = getCount({
			startOffset: e.start + this.wrapperLength,
			endOffset: e.end + this.wrapperLength
		}, this.ranges);
		if (this.ignoreSourceCode) {
			let t = this.locator.getLoc(e) || n, r = this.locator.getSourceLines(t, this.#e(t));
			if (r != null && this.ignoreSourceCode(r, "function", {
				start: {
					line: t.start.line,
					column: t.start.column
				},
				end: {
					line: t.end.line,
					column: t.end.column
				}
			})) return;
		}
		addFunction({
			coverageMapData: this.coverageMapData,
			covered: i,
			loc: n,
			decl: r,
			filename: this.#e(n),
			name: getFunctionName(e)
		});
	}
	onStatement(e, t) {
		if (this.#t(t || e, "statement")) return;
		let n = this.locator.getLoc(e);
		if (n === null) return;
		let r = getCount({
			startOffset: (t || e).start + this.wrapperLength,
			endOffset: (t || e).end + this.wrapperLength
		}, this.ranges);
		if (this.ignoreSourceCode) {
			let e = t && this.locator.getLoc(t) || n, r = this.locator.getSourceLines(e, this.#e(e));
			if (r != null && this.ignoreSourceCode(r, "statement", {
				start: {
					line: e.start.line,
					column: e.start.column
				},
				end: {
					line: e.end.line,
					column: e.end.column
				}
			})) return;
		}
		addStatement({
			coverageMapData: this.coverageMapData,
			loc: n,
			covered: r,
			filename: this.#e(n)
		});
	}
	onBranch(e, t, n) {
		if (this.#t(t, "branch")) return;
		let r = this.locator.getLoc(t);
		if (r === null) return;
		let i = [], a = [];
		for (let e of n) {
			if (!e) {
				i.push({
					start: {
						line: void 0,
						column: void 0
					},
					end: {
						line: void 0,
						column: void 0
					}
				});
				let e = getCount({
					startOffset: t.start + this.wrapperLength,
					endOffset: t.end + this.wrapperLength
				}, this.ranges), n = a.at(-1) || 0;
				a.push(e - n);
				continue;
			}
			let n = this.locator.getLoc(e);
			n !== null && i.push(n);
			let r = +(e.type === "BlockStatement");
			a.push(getCount({
				startOffset: e.start + r + this.wrapperLength,
				endOffset: e.end - r + this.wrapperLength
			}, this.ranges));
		}
		if (e === "if" && i.length > 0 && (i[0] = r), i.length !== 0) {
			if (this.ignoreSourceCode) {
				let e = this.locator.getSourceLines(r, this.#e(r));
				if (e != null && this.ignoreSourceCode(e, "branch", {
					start: {
						line: r.start.line,
						column: r.start.column
					},
					end: {
						line: r.end.line,
						column: r.end.column
					}
				})) return;
			}
			addBranch({
				coverageMapData: this.coverageMapData,
				loc: r,
				locations: i,
				type: e,
				covered: a,
				filename: this.#e(r)
			});
		}
	}
	generate() {
		return this.locator.reset(), this.coverageMapData;
	}
	#e(e) {
		let t = e.start.filename || e.end.filename;
		if (!t) throw Error(`Missing original filename for ${JSON.stringify(e, null, 2)}`);
		return t.startsWith("file://") ? r(t) : n(this.directory, t);
	}
	#t(e, t) {
		if (!this.ignoreNode) return !1;
		let n = this.ignoreNode(e, t);
		return n === "ignore-this-and-nested-nodes" && this.onIgnoreNode(e), n;
	}
};
//#endregion
//#region src/index.ts
async function convert(e) {
	let t = getIgnoreHints(e.code);
	if (t.length === 1 && t[0].type === "file") return {};
	let n = getWalker(), r = await b.create(e, n.onIgnore), i = await e.ast;
	return n.walk(i, t, e.ignoreClassMethods, {
		onFunctionDeclaration(e) {
			r.onFunction(e, {
				loc: e.body,
				decl: e.id || {
					...e,
					end: e.start + 1
				}
			});
		},
		onFunctionExpression(e) {
			isCovered(e) || r.onFunction(e, {
				loc: e.body,
				decl: e.id || {
					...e,
					end: e.start + 1
				}
			});
		},
		onArrowFunctionExpression(e) {
			r.onFunction(e, {
				loc: e.body,
				decl: {
					...e,
					end: e.start + 1
				}
			}), e.body.type !== "BlockStatement" && r.onStatement(e.body, e);
		},
		onMethodDefinition(e) {
			e.value.type === "FunctionExpression" && setCovered(e.value), r.onFunction(e, {
				loc: e.value.body,
				decl: e.key
			});
		},
		onProperty(e) {
			e.value.type === "FunctionExpression" && (setCovered(e.value), r.onFunction(e, {
				loc: e.value.body,
				decl: e.key
			}));
		},
		onClassMethod(e) {
			let t = {
				type: "FunctionExpression",
				start: e.start,
				end: e.end,
				body: {
					type: "BlockStatement",
					start: e.body.start,
					end: e.body.end,
					body: []
				},
				params: [],
				id: e.key.type === "Identifier" ? {
					type: "Identifier",
					name: e.key.name,
					start: e.key.start,
					end: e.key.end
				} : null
			};
			r.onFunction(t, {
				loc: t.body,
				decl: {
					start: e.key.start,
					end: e.key.end
				}
			});
		},
		onObjectMethod(e) {
			let t = {
				type: "FunctionExpression",
				start: e.start,
				end: e.end,
				body: {
					type: "BlockStatement",
					start: e.body.start,
					end: e.body.end,
					body: []
				},
				params: [],
				id: e.key.type === "Identifier" ? {
					type: "Identifier",
					name: e.key.name,
					start: e.key.start,
					end: e.key.end
				} : null
			};
			r.onFunction(t, {
				loc: t.body,
				decl: {
					start: e.key.start,
					end: e.key.end
				}
			});
		},
		onBreakStatement: (e) => r.onStatement(e),
		onContinueStatement: (e) => r.onStatement(e),
		onDebuggerStatement: (e) => r.onStatement(e),
		onReturnStatement: (e) => r.onStatement(e),
		onThrowStatement: (e) => r.onStatement(e),
		onTryStatement: (e) => r.onStatement(e),
		onForStatement: (e) => r.onStatement(e),
		onForInStatement: (e) => r.onStatement(e),
		onForOfStatement: (e) => r.onStatement(e),
		onWhileStatement: (e) => r.onStatement(e),
		onDoWhileStatement: (e) => r.onStatement(e),
		onWithStatement: (e) => r.onStatement(e),
		onLabeledStatement: (e) => r.onStatement(e),
		onExpressionStatement(e) {
			(e.expression.type !== "Literal" || e.expression.value !== "use strict") && r.onStatement(e);
		},
		onVariableDeclarator(e) {
			e.init && r.onStatement(e.init, e);
		},
		onClassBody(e) {
			for (let t of e.body) (t.type === "PropertyDefinition" || t.type === "ClassProperty" || t.type === "ClassPrivateProperty") && t.value && r.onStatement(t.value);
		},
		onIfStatement(e, t) {
			r.onBranch("if", e, t), r.onStatement(e);
		},
		onConditionalExpression(e, t) {
			r.onBranch("cond-expr", e, t);
		},
		onLogicalExpression(e, t) {
			r.onBranch("binary-expr", e, t);
		},
		onSwitchStatement(e, t) {
			r.onBranch("switch", e, t), r.onStatement(e);
		},
		onAssignmentPattern(e) {
			r.onBranch("default-arg", e, [e.right]);
		}
	}), r.generate();
}
const x = new WeakSet();
function setCovered(e) {
	x.add(e);
}
function isCovered(e) {
	return x.has(e);
}
//#endregion
export { convert, convert as default };
