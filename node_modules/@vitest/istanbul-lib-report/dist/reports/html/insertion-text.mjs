//#region src/reports/html/insertion-text.ts
const e = /[ \f\n\r\t\v\u00A0\u2028\u2029]/;
var InsertionText = class {
	constructor(e, t) {
		this.text = e, this.origLength = e.length, this.offsets = [], this.consumeBlanks = t, this.startPos = this.findFirstNonBlank(), this.endPos = this.findLastNonBlank();
	}
	findFirstNonBlank() {
		let t = -1, n = this.text, r = n.length, i = 0;
		for (; i < r; i += 1) if (!n.charAt(i).match(e)) {
			t = i;
			break;
		}
		return t;
	}
	findLastNonBlank() {
		let t = this.text, n = t.length, r = t.length + 1, i;
		for (i = n - 1; i >= 0; --i) if (!t.charAt(i).match(e)) {
			r = i;
			break;
		}
		return r;
	}
	originalLength() {
		return this.origLength;
	}
	insertAt(e, t, n, r) {
		r = r === void 0 ? this.consumeBlanks : r, e = e > this.originalLength() ? this.originalLength() : e, e = e < 0 ? 0 : e, r && (e <= this.startPos && (e = 0), e > this.endPos && (e = this.origLength));
		let i = t.length, a = this.findOffset(e, i, n), o = e + a, s = this.text;
		return this.text = s.substring(0, o) + t + s.substring(o), this;
	}
	findOffset(e, t, n) {
		let r = this.offsets, i, a = 0, o = 0;
		for (; o < r.length && (i = r[o], (i.pos < e || i.pos === e && !n) && (a += i.len), !(i.pos >= e)); o += 1);
		return i && i.pos === e ? i.len += t : r.splice(o, 0, {
			pos: e,
			len: t
		}), a;
	}
	wrap(e, t, n, r, i) {
		return this.insertAt(e, t, !0, i), this.insertAt(n, r, !1, i), this;
	}
	wrapLine(e, t) {
		this.wrap(0, e, this.originalLength(), t);
	}
	toString() {
		return this.text;
	}
};
//#endregion
export { InsertionText as default };
