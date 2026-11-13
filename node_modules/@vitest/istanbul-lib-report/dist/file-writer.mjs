import e from "node:path";
import t from "node:fs";
//#region src/file-writer.ts
var ContentWriter = class {
	colorize(e, t) {
		return e;
	}
	println(e) {
		this.write(`${e}\n`);
	}
	close() {}
}, FileContentWriter = class extends ContentWriter {
	constructor(e) {
		super(), this.fd = e;
	}
	write(e) {
		t.writeSync(this.fd, e);
	}
	close() {
		t.closeSync(this.fd);
	}
};
let n = !1, r = "";
var ConsoleWriter = class extends ContentWriter {
	write(e) {
		n ? r += e : process.stdout.write(e);
	}
	colorize(e, t) {
		let n = {
			low: "31;1",
			medium: "33;1",
			high: "32;1"
		};
		return n[t] && supportsColor() ? `\u001b[${n[t]}m${e}\u001b[0m` : e;
	}
};
function supportsColor(e = process.stdout, t = process.env) {
	let n = t.FORCE_COLOR;
	return n === void 0 ? t.NO_COLOR !== void 0 || t.NODE_DISABLE_COLORS !== void 0 ? !1 : !!(e.isTTY && e.hasColors?.()) : n !== "0" && n !== "false";
}
var i = class FileWriter {
	constructor(e) {
		if (!e) throw Error("baseDir must be specified");
		this.baseDir = e;
	}
	static startCapture() {
		n = !0;
	}
	static stopCapture() {
		n = !1;
	}
	static getOutput() {
		return r;
	}
	static resetOutput() {
		r = "";
	}
	writerForDir(t) {
		if (e.isAbsolute(t)) throw Error(`Cannot create subdir writer for absolute path: ${t}`);
		return new FileWriter(`${this.baseDir}/${t}`);
	}
	copyFile(n, r, i) {
		if (e.isAbsolute(r)) throw Error(`Cannot write to absolute path: ${r}`);
		r = e.resolve(this.baseDir, r), t.mkdirSync(e.dirname(r), { recursive: !0 });
		let a;
		a = i ? i + t.readFileSync(n, "utf8") : t.readFileSync(n), t.writeFileSync(r, a);
	}
	writeFile(n) {
		if (n === null || n === "-") return new ConsoleWriter();
		if (e.isAbsolute(n)) throw Error(`Cannot write to absolute path: ${n}`);
		return n = e.resolve(this.baseDir, n), t.mkdirSync(e.dirname(n), { recursive: !0 }), new FileContentWriter(t.openSync(n, "w"));
	}
};
//#endregion
export { i as default, supportsColor };
