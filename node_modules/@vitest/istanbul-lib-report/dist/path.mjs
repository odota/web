import e from "node:path";
//#region src/path.ts
let t = e.parse, n = e.sep;
const r = t, i = n;
function makeRelativeNormalizedPath(e, n) {
	let r = t(e), i = r.root, a, o = r.base, s, c;
	return n === "\\" && (c = i.indexOf(":\\"), c >= 0 && (i = i.substring(0, c + 2))), a = r.dir.substring(i.length), e === "" ? [] : (n !== "/" && (s = new RegExp(n.replace(/\W/g, "\\$&"), "g"), a = a.replace(s, "/"), o = o.replace(s, "/")), a = a === "" ? o : `${a}/${o}`, a.substring(0, 1) === "/" && (a = a.substring(1)), a = a.split(/\/+/), a);
}
var a = class Path {
	constructor(e) {
		if (Array.isArray(e)) this.v = e;
		else if (typeof e == "string") this.v = makeRelativeNormalizedPath(e, n);
		else throw Error(`Invalid Path argument must be string or array:${e}`);
	}
	toString() {
		return this.v.join("/");
	}
	hasParent() {
		return this.v.length > 0;
	}
	parent() {
		if (!this.hasParent()) throw Error("Unable to get parent for 0 elem path");
		let e = this.v.slice();
		return e.pop(), new Path(e);
	}
	elements() {
		return this.v.slice();
	}
	name() {
		return this.v.slice(-1)[0];
	}
	contains(e) {
		let t;
		if (e.length > this.length) return !1;
		for (t = 0; t < e.length; t += 1) if (this.v[t] !== e.v[t]) return !1;
		return !0;
	}
	ancestorOf(e) {
		return e.contains(this) && e.length !== this.length;
	}
	descendantOf(e) {
		return this.contains(e) && e.length !== this.length;
	}
	commonPrefixPath(e) {
		let t = this.length > e.length ? e.length : this.length, n, r = [];
		for (n = 0; n < t && this.v[n] === e.v[n]; n += 1) r.push(this.v[n]);
		return new Path(r);
	}
	static compare(e, t) {
		let n = e.length, r = t.length;
		if (n < r) return -1;
		if (n > r) return 1;
		let i = e.toString(), a = t.toString();
		return i < a ? -1 : +(i > a);
	}
	static tester = {
		setParserAndSep(e, r) {
			t = e, n = r;
		},
		reset() {
			t = r, n = i;
		}
	};
};
[
	"push",
	"pop",
	"shift",
	"unshift",
	"splice"
].forEach((e) => {
	Object.defineProperty(a.prototype, e, { value(...t) {
		return this.v[e].apply(this.v, t);
	} });
}), Object.defineProperty(a.prototype, "length", {
	enumerable: !0,
	get() {
		return this.v.length;
	}
});
//#endregion
export { a as default };
