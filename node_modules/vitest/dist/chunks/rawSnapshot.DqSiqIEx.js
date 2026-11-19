import { f as isObject, h as getCallLastIndex } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { p as positionToOffset, o as offsetToLineNumber, l as lineSplitRE } from './offset.Dy-5Fdfn.js';
import { g as getDefaultExportFromCjs, f as format } from './index.D0heQG4v.js';
import { g as getSerializers } from './plugins.DPQHVT0p.js';

var naturalCompare$1 = {exports: {}};

var hasRequiredNaturalCompare;

function requireNaturalCompare () {
	if (hasRequiredNaturalCompare) return naturalCompare$1.exports;
	hasRequiredNaturalCompare = 1;
	/*
	 * @version    1.4.0
	 * @date       2015-10-26
	 * @stability  3 - Stable
	 * @author     Lauri Rooden (https://github.com/litejs/natural-compare-lite)
	 * @license    MIT License
	 */


	var naturalCompare = function(a, b) {
		var i, codeA
		, codeB = 1
		, posA = 0
		, posB = 0
		, alphabet = String.alphabet;

		function getCode(str, pos, code) {
			if (code) {
				for (i = pos; code = getCode(str, i), code < 76 && code > 65;) ++i;
				return +str.slice(pos - 1, i)
			}
			code = alphabet && alphabet.indexOf(str.charAt(pos));
			return code > -1 ? code + 76 : ((code = str.charCodeAt(pos) || 0), code < 45 || code > 127) ? code
				: code < 46 ? 65               // -
				: code < 48 ? code - 1
				: code < 58 ? code + 18        // 0-9
				: code < 65 ? code - 11
				: code < 91 ? code + 11        // A-Z
				: code < 97 ? code - 37
				: code < 123 ? code + 5        // a-z
				: code - 63
		}


		if ((a+="") != (b+="")) for (;codeB;) {
			codeA = getCode(a, posA++);
			codeB = getCode(b, posB++);

			if (codeA < 76 && codeB < 76 && codeA > 66 && codeB > 66) {
				codeA = getCode(a, posA, posA);
				codeB = getCode(b, posB, posA = i);
				posB = i;
			}

			if (codeA != codeB) return (codeA < codeB) ? -1 : 1
		}
		return 0
	};

	try {
		naturalCompare$1.exports = naturalCompare;
	} catch (e) {
		String.naturalCompare = naturalCompare;
	}
	return naturalCompare$1.exports;
}

var naturalCompareExports = requireNaturalCompare();
var naturalCompare = /*@__PURE__*/getDefaultExportFromCjs(naturalCompareExports);

// TODO: rewrite and clean up
function testNameToKey(testName, count) {
	return `${testName} ${count}`;
}
function keyToTestName(key) {
	if (!/ \d+$/.test(key)) throw new Error("Snapshot keys must end with a number.");
	return key.replace(/ \d+$/, "");
}
// Evaluate a snapshot file's content into its snapshot key/value pairs.
function evaluateSnapshotFile(filepath, content) {
	const data = Object.create(null);
	try {
		new Function("exports", content)(data);
	} catch (cause) {
		throw new Error(`Invalid snapshot file, please manually fix or delete it: ${filepath}`, { cause });
	}
	return data;
}
// Add extra line breaks at beginning and end of multiline snapshot
// to make the content easier to read.
function addExtraLineBreaks(string) {
	return string.includes("\n") ? `\n${string}\n` : string;
}
// Remove extra line breaks at beginning and end of multiline snapshot.
// Instead of trim, which can remove additional newlines or spaces
// at beginning or end of the content from a custom serializer.
function removeExtraLineBreaks(string) {
	return string.length > 2 && string[0] === "\n" && string.endsWith("\n") ? string.slice(1, -1) : string;
}
// export const removeLinesBeforeExternalMatcherTrap = (stack: string): string => {
//   const lines = stack.split('\n')
//   for (let i = 0; i < lines.length; i += 1) {
//     // It's a function name specified in `packages/expect/src/index.ts`
//     // for external custom matchers.
//     if (lines[i].includes('__EXTERNAL_MATCHER_TRAP__'))
//       return lines.slice(i + 1).join('\n')
//   }
//   return stack
// }
const escapeRegex = true;
const printFunctionName = false;
function serialize(val, indent = 2, formatOverrides = {}) {
	return normalizeNewlines(format(val, {
		escapeRegex,
		indent,
		plugins: getSerializers(),
		printFunctionName,
		...formatOverrides
	}));
}
function escapeBacktickString(str) {
	// a raw CR inside a template literal is read back as LF
	return str.replace(/`|\\|\$\{/g, "\\$&").replace(/\r/g, "\\r");
}
function printBacktickString(str) {
	return `\`${escapeBacktickString(str)}\``;
}
function normalizeNewlines(string) {
	return string.replace(/\r\n|\r/g, "\n");
}
async function saveSnapshotFile(environment, snapshotData, snapshotPath) {
	const snapshots = Object.keys(snapshotData).sort(naturalCompare).map((key) => `exports[${printBacktickString(key)}] = ${printBacktickString(normalizeNewlines(snapshotData[key]))};`);
	const content = `${environment.getHeader()}\n\n${snapshots.join("\n\n")}\n`;
	const oldContent = await environment.readSnapshotFile(snapshotPath);
	if (oldContent != null && oldContent === content) return;
	await environment.saveSnapshotFile(snapshotPath, content);
}
function deepMergeArray(target = [], source = []) {
	const mergedOutput = Array.from(target);
	source.forEach((sourceElement, index) => {
		const targetElement = mergedOutput[index];
		if (Array.isArray(target[index])) mergedOutput[index] = deepMergeArray(target[index], sourceElement);
		else if (isObject(targetElement)) mergedOutput[index] = deepMergeSnapshot(target[index], sourceElement);
		else
 // Source does not exist in target or target is primitive and cannot be deep merged
		mergedOutput[index] = sourceElement;
	});
	return mergedOutput;
}
/**
* Deep merge, but considers asymmetric matchers. Unlike base util's deep merge,
* will merge any object-like instance.
* Compatible with Jest's snapshot matcher. Should not be used outside of snapshot.
*
* @example
* ```ts
* toMatchSnapshot({
*   name: expect.stringContaining('text')
* })
* ```
*/
function deepMergeSnapshot(target, source) {
	if (isObject(target) && isObject(source)) {
		const mergedOutput = { ...target };
		Object.keys(source).forEach((key) => {
			if (isObject(source[key]) && !source[key].$$typeof) {
				if (!(key in target)) Object.assign(mergedOutput, { [key]: source[key] });
				else mergedOutput[key] = deepMergeSnapshot(target[key], source[key]);
			} else if (Array.isArray(source[key])) mergedOutput[key] = deepMergeArray(target[key], source[key]);
			else Object.assign(mergedOutput, { [key]: source[key] });
		});
		return mergedOutput;
	} else if (Array.isArray(target) && Array.isArray(source)) return deepMergeArray(target, source);
	return target;
}
class DefaultMap extends Map {
	defaultFn;
	constructor(defaultFn, entries) {
		super(entries);
		this.defaultFn = defaultFn;
	}
	get(key) {
		if (!this.has(key)) this.set(key, this.defaultFn(key));
		return super.get(key);
	}
}
class CounterMap extends DefaultMap {
	constructor() {
		super(() => 0);
	}
	// compat for jest-image-snapshot https://github.com/vitest-dev/vitest/issues/7322
	// `valueOf` and `Snapshot.added` setter allows
	//   snapshotState.added = snapshotState.added + 1
	// to function as
	//   snapshotState.added.total_ = snapshotState.added.total() + 1
	_total;
	valueOf() {
		return this._total = this.total();
	}
	increment(key) {
		if (typeof this._total !== "undefined") this._total++;
		this.set(key, this.get(key) + 1);
	}
	total() {
		if (typeof this._total !== "undefined") return this._total;
		let total = 0;
		for (const x of this.values()) total += x;
		return total;
	}
}
/* @__NO_SIDE_EFFECTS__ */
function memo(fn) {
	const cache = /* @__PURE__ */ new Map();
	return (arg) => {
		if (!cache.has(arg)) cache.set(arg, fn(arg));
		return cache.get(arg);
	};
}

async function saveInlineSnapshots(environment, snapshots) {
	const MagicString = (await import('magic-string')).default;
	const files = new Set(snapshots.map((i) => i.file));
	await Promise.all(Array.from(files).map(async (file) => {
		const snaps = snapshots.filter((i) => i.file === file);
		const code = await environment.readSnapshotFile(file);
		if (code == null) throw new Error(`cannot read ${file} when saving inline snapshot`);
		const s = new MagicString(code);
		for (const snap of snaps) replaceInlineSnap(code, s, positionToOffset(code, snap.line, snap.column), snap.snapshot, snap.assertionName);
		const transformed = s.toString();
		if (transformed !== code) await environment.saveSnapshotFile(file, transformed);
	}));
}
const defaultStartObjectRegex = /(?:toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot)\s*\(\s*(?:\/\*[\s\S]*\*\/\s*|\/\/.*(?:[\n\r\u2028\u2029]\s*|[\t\v\f \xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF]))*\{/;
function escapeRegExp(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const buildStartObjectRegex = memo((assertionName) => {
	const replaced = defaultStartObjectRegex.source.replace("toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot", escapeRegExp(assertionName));
	return new RegExp(replaced);
});
function replaceObjectSnap(code, s, index, newSnap, assertionName) {
	let _code = code.slice(index);
	const startMatch = (assertionName ? buildStartObjectRegex(assertionName) : defaultStartObjectRegex).exec(_code);
	if (!startMatch) return false;
	_code = _code.slice(startMatch.index);
	let callEnd = getCallLastIndex(_code);
	if (callEnd === null) return false;
	callEnd += index + startMatch.index;
	const shapeEnd = getObjectShapeEndIndex(code, index + startMatch.index + startMatch[0].length);
	const snap = `, ${prepareSnapString(newSnap, code, index)}`;
	if (shapeEnd === callEnd)
 // toMatchInlineSnapshot({ foo: expect.any(String) })
	s.appendLeft(callEnd, snap);
	else
 // toMatchInlineSnapshot({ foo: expect.any(String) }, ``)
	s.overwrite(shapeEnd, callEnd, snap);
	return true;
}
function getObjectShapeEndIndex(code, index) {
	let startBraces = 1;
	let endBraces = 0;
	while (startBraces !== endBraces && index < code.length) {
		const s = code[index++];
		if (s === "{") startBraces++;
		else if (s === "}") endBraces++;
	}
	return index;
}
function prepareSnapString(snap, source, index) {
	const lineNumber = offsetToLineNumber(source, index);
	const indent = source.split(lineSplitRE)[lineNumber - 1].match(/^\s*/)[0] || "";
	const indentNext = indent.includes("	") ? `${indent}\t` : `${indent}  `;
	const lines = snap.trim().replace(/\\/g, "\\\\").split(/\n/g);
	const isOneline = lines.length <= 1;
	const quote = "`";
	if (isOneline) return `${quote}${lines.join("\n").replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}${quote}`;
	return `${quote}\n${lines.map((i) => i ? indentNext + i : "").join("\n").replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}\n${indent}${quote}`;
}
const defaultMethodNames = ["toMatchInlineSnapshot", "toThrowErrorMatchingInlineSnapshot"];
// on webkit, the line number is at the end of the method, not at the start
function getCodeStartingAtIndex(code, index, methodNames) {
	for (const name of methodNames) {
		const adjusted = index - name.length;
		if (adjusted >= 0 && code.slice(adjusted, index) === name) return {
			code: code.slice(adjusted),
			index: adjusted
		};
	}
	return {
		code: code.slice(index),
		index
	};
}
const defaultStartRegex = /(?:toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot)\s*\(\s*(?:\/\*[\s\S]*\*\/\s*|\/\/.*(?:[\n\r\u2028\u2029]\s*|[\t\v\f \xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF]))*[\w$]*(['"`)])/;
const buildStartRegex = memo((assertionName) => {
	const replaced = defaultStartRegex.source.replace("toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot", escapeRegExp(assertionName));
	return new RegExp(replaced);
});
function replaceInlineSnap(code, s, currentIndex, newSnap, assertionName) {
	const { code: codeStartingAtIndex, index } = getCodeStartingAtIndex(code, currentIndex, assertionName ? [assertionName] : defaultMethodNames);
	const startMatch = (assertionName ? buildStartRegex(assertionName) : defaultStartRegex).exec(codeStartingAtIndex);
	const firstKeywordMatch = (assertionName ? new RegExp(escapeRegExp(assertionName)) : /toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot/).exec(codeStartingAtIndex);
	if (!startMatch || startMatch.index !== firstKeywordMatch?.index) return replaceObjectSnap(code, s, index, newSnap, assertionName);
	const quote = startMatch[1];
	const startIndex = index + startMatch.index + startMatch[0].length;
	const snapString = prepareSnapString(newSnap, code, index);
	if (quote === ")") {
		s.appendRight(startIndex - 1, snapString);
		return true;
	}
	const endMatch = new RegExp(`(?:^|[^\\\\])${quote}`).exec(code.slice(startIndex));
	if (!endMatch) return false;
	const endIndex = startIndex + endMatch.index + endMatch[0].length;
	s.overwrite(startIndex - 1, endIndex, snapString);
	return true;
}
const INDENTATION_REGEX = /^([^\S\n]*)\S/m;
function stripSnapshotIndentation(inlineSnapshot) {
	// Find indentation if exists.
	const match = inlineSnapshot.match(INDENTATION_REGEX);
	if (!match || !match[1])
 // No indentation.
	return inlineSnapshot;
	const indentation = match[1];
	const lines = inlineSnapshot.split(/\n/g);
	if (lines.length <= 2)
 // Must be at least 3 lines.
	return inlineSnapshot;
	if (lines[0].trim() !== "" || lines.at(-1)?.trim() !== "")
 // If not blank first and last lines, abort.
	return inlineSnapshot;
	for (let i = 1; i < lines.length - 1; i++) if (lines[i] !== "") {
		if (lines[i].indexOf(indentation) !== 0)
 // All lines except first and last should either be blank or have the same
		// indent as the first line (or more). If this isn't the case we don't
		// want to touch the snapshot at all.
		return inlineSnapshot;
		lines[i] = lines[i].substring(indentation.length);
	}
	// Last line is a special case because it won't have the same indent as others
	// but may still have been given some indent to line up.
	lines[lines.length - 1] = "";
	// Return inline snapshot, now at indent 0.
	inlineSnapshot = lines.join("\n");
	return inlineSnapshot;
}

async function saveRawSnapshots(environment, snapshots) {
	await Promise.all(snapshots.map(async (snap) => {
		if (!snap.readonly) await environment.saveSnapshotFile(snap.file, snap.snapshot);
	}));
}

export { CounterMap as C, DefaultMap as D, saveInlineSnapshots as a, saveRawSnapshots as b, serialize as c, addExtraLineBreaks as d, evaluateSnapshotFile as e, deepMergeSnapshot as f, stripSnapshotIndentation as g, keyToTestName as k, normalizeNewlines as n, removeExtraLineBreaks as r, saveSnapshotFile as s, testNameToKey as t };
