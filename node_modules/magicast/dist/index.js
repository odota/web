import { a as MagicastError, i as parseModule, n as generateCode, o as detectCodeFormat, r as parseExpression, t as builders } from "./builders-CDdrUKLb.js";
import "./core.js";
import { promises } from "node:fs";
//#region src/file.ts
async function loadFile(filename, options = {}) {
	const contents = await promises.readFile(filename, "utf8");
	options.sourceFileName = options.sourceFileName ?? filename;
	return parseModule(contents, options);
}
async function writeFile(node, filename, options) {
	const ast = "$ast" in node ? node.$ast : node;
	const { code, map } = generateCode(ast, options);
	await promises.writeFile(filename, code);
	if (map) await promises.writeFile(`${filename}.map`, map);
}
//#endregion
export { MagicastError, builders, detectCodeFormat, generateCode, loadFile, parseExpression, parseModule, writeFile };
