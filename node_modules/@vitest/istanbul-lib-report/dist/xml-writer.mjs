function attrString(e) {
	return Object.entries(e || {}).map(([e, t]) => ` ${e}="${t}"`).join("");
}
var XMLWriter = class {
	constructor(e) {
		this.cw = e, this.stack = [];
	}
	indent(e) {
		return this.stack.map(() => "  ").join("") + e;
	}
	openTag(e, t) {
		let n = this.indent(`<${e + attrString(t)}>`);
		this.cw.println(n), this.stack.push(e);
	}
	closeTag(e) {
		if (this.stack.length === 0) throw Error(`Attempt to close tag ${e} when not opened`);
		let t = this.stack.pop(), n = `</${e}>`;
		if (t !== e) throw Error(`Attempt to close tag ${e} when ${t} was the one open`);
		this.cw.println(this.indent(n));
	}
	inlineTag(e, t, n) {
		let r = "<" + e + attrString(t);
		r += n ? `>${n}</${e}>` : "/>", r = this.indent(r), this.cw.println(r);
	}
	closeAll() {
		this.stack.slice().reverse().forEach((e) => {
			this.closeTag(e);
		});
	}
};
//#endregion
export { XMLWriter as default };
