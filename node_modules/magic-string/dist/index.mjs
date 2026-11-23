import { encode, encodeRangeMappings } from "@jridgewell/sourcemap-codec";
//#region src/BitSet.ts
var BitSet = class BitSet {
	constructor(arg) {
		this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
	}
	add(n) {
		this.bits[n >> 5] |= 1 << (n & 31);
	}
	has(n) {
		return !!(this.bits[n >> 5] & 1 << (n & 31));
	}
	forEach(fn) {
		const bits = this.bits;
		for (let w = 0; w < bits.length; w++) {
			let word = bits[w];
			while (word) {
				const lowest = word & -word;
				fn((w << 5) + 31 - Math.clz32(lowest));
				word ^= lowest;
			}
		}
	}
};
//#endregion
//#region src/Chunk.ts
var Chunk = class Chunk {
	constructor(start, end, content) {
		this.start = start;
		this.end = end;
		this.original = content;
		this.intro = "";
		this.outro = "";
		this.content = content;
		this.storeName = false;
		this.edited = false;
		this.replacesUntil = -1;
		this.replacedFrom = -1;
		this.previous = null;
		this.next = null;
	}
	appendLeft(content) {
		this.outro += content;
	}
	appendRight(content) {
		this.intro = this.intro + content;
	}
	clone() {
		const chunk = new Chunk(this.start, this.end, this.original);
		chunk.intro = this.intro;
		chunk.outro = this.outro;
		chunk.content = this.content;
		chunk.storeName = this.storeName;
		chunk.edited = this.edited;
		chunk.replacesUntil = this.replacesUntil;
		chunk.replacedFrom = this.replacedFrom;
		return chunk;
	}
	contains(index) {
		return this.start < index && index < this.end;
	}
	eachNext(fn) {
		fn(this);
		let chunk = this.next;
		while (chunk) {
			fn(chunk);
			chunk = chunk.next;
		}
	}
	eachPrevious(fn) {
		fn(this);
		let chunk = this.previous;
		while (chunk) {
			fn(chunk);
			chunk = chunk.previous;
		}
	}
	edit(content, storeName, contentOnly) {
		this.content = content;
		if (!contentOnly) {
			this.intro = "";
			this.outro = "";
		}
		this.storeName = storeName;
		this.edited = true;
		return this;
	}
	prependLeft(content) {
		this.outro = content + this.outro;
	}
	prependRight(content) {
		this.intro = content + this.intro;
	}
	reset() {
		this.intro = "";
		this.outro = "";
		this.replacesUntil = -1;
		this.replacedFrom = -1;
		if (this.edited) {
			this.content = this.original;
			this.storeName = false;
			this.edited = false;
		}
	}
	split(index) {
		const sliceIndex = index - this.start;
		const originalBefore = this.original.slice(0, sliceIndex);
		const originalAfter = this.original.slice(sliceIndex);
		this.original = originalBefore;
		const newChunk = new Chunk(index, this.end, originalAfter);
		newChunk.outro = this.outro;
		this.outro = "";
		this.end = index;
		if (this.edited) {
			newChunk.edit("", false, true);
			newChunk.replacedFrom = this.replacedFrom;
		} else this.content = originalBefore;
		newChunk.next = this.next;
		if (newChunk.next) newChunk.next.previous = newChunk;
		newChunk.previous = this;
		this.next = newChunk;
		return newChunk;
	}
	toString() {
		return this.intro + this.content + this.outro;
	}
	trimEnd(rx) {
		this.outro = this.outro.replace(rx, "");
		if (this.outro.length) return true;
		const trimmed = this.content.replace(rx, "");
		if (trimmed.length) {
			if (trimmed !== this.content) {
				if (this.edited) this.edit(trimmed, this.storeName, true);
				else this.split(this.start + trimmed.length).edit("", void 0, true);
			}
			return true;
		} else {
			this.edit("", void 0, true);
			this.intro = this.intro.replace(rx, "");
			if (this.intro.length) return true;
		}
	}
	trimStart(rx) {
		this.intro = this.intro.replace(rx, "");
		if (this.intro.length) return true;
		const trimmed = this.content.replace(rx, "");
		if (trimmed.length) {
			if (trimmed !== this.content) {
				if (this.edited) this.edit(trimmed, this.storeName, true);
				else {
					this.split(this.end - trimmed.length);
					this.edit("", void 0, true);
				}
			}
			return true;
		} else {
			this.edit("", void 0, true);
			this.outro = this.outro.replace(rx, "");
			if (this.outro.length) return true;
		}
	}
};
//#endregion
//#region src/MagicStringError.ts
/**
* The single error type thrown by MagicString.
*
* Every message is prefixed with `[MagicString]` so its source is obvious at a
* glance, and is kept short and consistent in tone.
*/
var MagicStringError = class extends Error {
	name = "MagicStringError";
	constructor(message, options) {
		super(`[MagicString] ${message}`, options);
	}
};
//#endregion
//#region src/SourceMap.ts
function getBtoa() {
	/* v8 ignore next -- environment fallback, unreachable when `btoa` is present */
	if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
	const buffer = globalThis["Buffer"];
	if (buffer) return (str) => buffer.from(str, "utf-8").toString("base64");
	return () => {
		throw new MagicStringError("unsupported environment: `btoa` or `Buffer` is required");
	};
	/* v8 ignore stop */
}
const btoa = /* #__PURE__ */ getBtoa();
var SourceMap = class {
	constructor(properties) {
		this.version = 3;
		this.file = properties.file;
		this.sources = properties.sources;
		this.sourcesContent = properties.sourcesContent;
		this.names = properties.names;
		this.mappings = typeof properties.mappings === "string" ? properties.mappings : encode(properties.mappings);
		if (typeof properties.x_google_ignoreList !== "undefined") this.x_google_ignoreList = properties.x_google_ignoreList;
		if (typeof properties.debugId !== "undefined") this.debugId = properties.debugId;
		if (typeof properties.rangeMappings !== "undefined") {
			let shouldOutputRangeMapping = false;
			for (const line of properties.rangeMappings) if (line.length !== 0) {
				shouldOutputRangeMapping = true;
				break;
			}
			if (shouldOutputRangeMapping) this.rangeMappings = encodeRangeMappings(properties.rangeMappings);
		}
	}
	/**
	* Returns the equivalent of `JSON.stringify(map)`
	*/
	toString() {
		return JSON.stringify(this);
	}
	/**
	* Returns a DataURI containing the sourcemap. Useful for doing this sort of thing:
	* `generateMap(options?: SourceMapOptions): SourceMap;`
	*/
	toUrl() {
		return `data:application/json;charset=utf-8;base64,${btoa(this.toString())}`;
	}
};
//#endregion
//#region src/utils/getLocator.ts
function getLocator(source) {
	const lineOffsets = [0];
	for (let i = source.indexOf("\n"); i !== -1; i = source.indexOf("\n", i + 1)) lineOffsets.push(i + 1);
	return function locate(index) {
		let i = 0;
		let j = lineOffsets.length;
		while (i < j) {
			const m = i + j >> 1;
			if (index < lineOffsets[m]) j = m;
			else i = m + 1;
		}
		const line = i - 1;
		return {
			line,
			column: index - lineOffsets[line]
		};
	};
}
//#endregion
//#region src/utils/getRelativePath.ts
function getRelativePath(from, to) {
	const fromParts = from.split(/[/\\]/);
	const toParts = to.split(/[/\\]/);
	fromParts.pop();
	while (fromParts[0] === toParts[0]) {
		fromParts.shift();
		toParts.shift();
	}
	if (fromParts.length) {
		let i = fromParts.length;
		while (i--) fromParts[i] = "..";
	}
	return fromParts.concat(toParts).join("/");
}
//#endregion
//#region src/utils/guessIndent.ts
function guessIndent(code) {
	const lines = code.split("\n");
	const tabbed = lines.filter((line) => /^\t+/.test(line));
	const spaced = lines.filter((line) => /^ {2,}/.test(line));
	if (tabbed.length === 0 && spaced.length === 0) return null;
	if (tabbed.length >= spaced.length) return "	";
	const min = spaced.reduce((previous, current) => {
		const numSpaces = /^ +/.exec(current)[0].length;
		return Math.min(numSpaces, previous);
	}, Infinity);
	return " ".repeat(min);
}
//#endregion
//#region src/utils/isObject.ts
const toString = Object.prototype.toString;
function isObject(thing) {
	return toString.call(thing) === "[object Object]";
}
const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const intToChar = /* #__PURE__ */ (() => {
	const chars = /* @__PURE__ */ new Uint8Array(64);
	for (let i = 0; i < 64; i++) chars[i] = BASE64_CHARS.charCodeAt(i);
	return chars;
})();
const COMMA = 44;
const SEMICOLON = 59;
const BUFFER_SIZE = 16384;
const FLUSH_THRESHOLD = 16348;
const scratch = /* #__PURE__ */ new Uint8Array(BUFFER_SIZE);
function writeVlq(pos, num) {
	num = num < 0 ? -num << 1 | 1 : num << 1;
	do {
		let clamped = num & 31;
		num >>>= 5;
		if (num > 0) clamped |= 32;
		scratch[pos++] = intToChar[clamped];
	} while (num > 0);
	return pos;
}
const decoder = /* #__PURE__ */ new TextDecoder();
var MappingsEncoder = class {
	constructor() {
		this.out = "";
		this.pos = 0;
		this.lines = [];
		this.buffered = 0;
		this.needsComma = false;
		this.prevGenColumn = 0;
		this.prevSourceIndex = 0;
		this.prevSourceLine = 0;
		this.prevSourceColumn = 0;
		this.prevNameIndex = 0;
	}
	endLine(segments) {
		this.lines.push(segments);
		this.buffered += segments.length + 1;
		if (this.buffered >= 4096) this.drain(null);
	}
	segments(segments) {
		this.drain(segments);
	}
	finish(segments) {
		this.drain(segments);
		this.flush();
		return this.out;
	}
	drain(trailing) {
		const lines = this.lines;
		const lineCount = lines.length;
		for (let l = 0; l <= lineCount; l++) {
			const line = l < lineCount ? lines[l] : trailing;
			if (line === null) break;
			for (let i = 0; i < line.length; i++) {
				if (this.pos > FLUSH_THRESHOLD) this.flush();
				const segment = line[i];
				if (this.needsComma) scratch[this.pos++] = COMMA;
				this.needsComma = true;
				this.pos = writeVlq(this.pos, segment[0] - this.prevGenColumn);
				this.prevGenColumn = segment[0];
				this.pos = writeVlq(this.pos, segment[1] - this.prevSourceIndex);
				this.prevSourceIndex = segment[1];
				this.pos = writeVlq(this.pos, segment[2] - this.prevSourceLine);
				this.prevSourceLine = segment[2];
				this.pos = writeVlq(this.pos, segment[3] - this.prevSourceColumn);
				this.prevSourceColumn = segment[3];
				if (segment.length === 5) {
					this.pos = writeVlq(this.pos, segment[4] - this.prevNameIndex);
					this.prevNameIndex = segment[4];
				}
			}
			if (l < lineCount) {
				if (this.pos > FLUSH_THRESHOLD) this.flush();
				scratch[this.pos++] = SEMICOLON;
				this.needsComma = false;
				this.prevGenColumn = 0;
			}
		}
		lines.length = 0;
		this.buffered = 0;
		this.flush();
	}
	flush() {
		this.out += decoder.decode(scratch.subarray(0, this.pos));
		this.pos = 0;
	}
};
//#endregion
//#region src/utils/Mappings.ts
const NEWLINE_CHAR$1 = 10;
function isWordCode(code) {
	return code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code === 95;
}
var Mappings = class {
	constructor(hires, encoder = null) {
		this.hires = hires;
		this.generatedCodeLine = 0;
		this.generatedCodeColumn = 0;
		this.raw = [];
		this.rawSegments = this.raw[this.generatedCodeLine] = [];
		this.rawRangeMappingsIndices = [];
		this.rawRangeMappings = hires === "experimental-range" ? [this.rawRangeMappingsIndices] : void 0;
		this.encoder = encoder;
	}
	nextLine() {
		if (this.encoder === null) {
			this.generatedCodeLine += 1;
			this.raw[this.generatedCodeLine] = this.rawSegments = [];
		} else {
			this.encoder.endLine(this.rawSegments);
			this.rawSegments = [];
			this.generatedCodeLine += 1;
		}
		this.generatedCodeColumn = 0;
		if (this.rawRangeMappings) this.rawRangeMappings[this.generatedCodeLine] = this.rawRangeMappingsIndices = [];
	}
	/**
	* Emits the mappings for one MagicString: its intro, every chunk (with the
	* chunk's own intro/outro) and its outro. `sourceIndex === -1` means the
	* string has no source of its own, so its content only advances the
	* generated position without mapping anything.
	*/
	addMagicString(magicString, sourceIndex, nameIndex) {
		const { original } = magicString;
		const locate = getLocator(original);
		if (magicString.intro) this.advance(magicString.intro);
		magicString.firstChunk.eachNext((chunk) => {
			if (chunk.intro.length) this.advance(chunk.intro);
			if (sourceIndex === -1) this.advance(chunk.content);
			else if (chunk.edited) {
				const name = chunk.storeName ? nameIndex.get(original.slice(chunk.start, chunk.replacesUntil)) : void 0;
				this.addEdit(sourceIndex, chunk.content, locate(chunk.start), name ?? -1);
			} else this.addUneditedChunk(sourceIndex, chunk, original, locate(chunk.start), magicString.sourcemapLocations);
			if (chunk.outro.length) this.advance(chunk.outro);
		});
		if (magicString.outro) this.advance(magicString.outro);
	}
	addEdit(sourceIndex, content, loc, nameIndex) {
		if (content.length) {
			const contentLengthMinusOne = content.length - 1;
			let contentLineEnd = content.indexOf("\n", 0);
			let previousContentLineEnd = -1;
			while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
				const segment = [
					this.generatedCodeColumn,
					sourceIndex,
					loc.line,
					loc.column
				];
				if (nameIndex >= 0) segment.push(nameIndex);
				this.rawSegments.push(segment);
				this.nextLine();
				previousContentLineEnd = contentLineEnd;
				contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
			}
			const segment = [
				this.generatedCodeColumn,
				sourceIndex,
				loc.line,
				loc.column
			];
			if (nameIndex >= 0) segment.push(nameIndex);
			this.rawSegments.push(segment);
			this.advance(content.slice(previousContentLineEnd + 1));
		}
	}
	addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
		const end = chunk.end;
		let i = chunk.start;
		if (this.hires) {
			const boundary = this.hires === "boundary";
			const experimentalRange = this.hires === "experimental-range";
			const encoder = experimentalRange ? null : this.encoder;
			let charInHiresBoundary = false;
			while (i < end) {
				if (encoder !== null && this.rawSegments.length >= 4096) {
					encoder.segments(this.rawSegments);
					this.rawSegments.length = 0;
				}
				if (experimentalRange && i + 1 >= end) this.rawSegments.push([
					this.generatedCodeColumn,
					sourceIndex,
					loc.line,
					loc.column
				]);
				const code = original.charCodeAt(i);
				if (code === NEWLINE_CHAR$1) {
					loc.line += 1;
					loc.column = 0;
					this.nextLine();
					charInHiresBoundary = false;
				} else {
					if (boundary) {
						if (isWordCode(code)) {
							if (!charInHiresBoundary) {
								this.rawSegments.push([
									this.generatedCodeColumn,
									sourceIndex,
									loc.line,
									loc.column
								]);
								charInHiresBoundary = true;
							}
						} else {
							this.rawSegments.push([
								this.generatedCodeColumn,
								sourceIndex,
								loc.line,
								loc.column
							]);
							charInHiresBoundary = false;
						}
					} else if (experimentalRange) {
						if (i === chunk.start) {
							this.rawRangeMappingsIndices.push(this.rawSegments.length);
							this.rawSegments.push([
								this.generatedCodeColumn,
								sourceIndex,
								loc.line,
								loc.column
							]);
						}
					} else this.rawSegments.push([
						this.generatedCodeColumn,
						sourceIndex,
						loc.line,
						loc.column
					]);
					loc.column += 1;
					this.generatedCodeColumn += 1;
				}
				i += 1;
			}
		} else {
			const bits = sourcemapLocations.bits;
			while (i < end) {
				let newline = original.indexOf("\n", i);
				if (newline === -1 || newline > end) newline = end;
				if (newline > i) {
					this.rawSegments.push([
						this.generatedCodeColumn,
						sourceIndex,
						loc.line,
						loc.column
					]);
					for (let w = i + 1 >> 5, last = newline - 1 >> 5; w <= last; w++) {
						let word = bits[w];
						if (!word) continue;
						const base = w << 5;
						while (word) {
							const lowest = word & -word;
							const index = base + 31 - Math.clz32(lowest);
							if (index > i && index < newline) {
								const offset = index - i;
								this.rawSegments.push([
									this.generatedCodeColumn + offset,
									sourceIndex,
									loc.line,
									loc.column + offset
								]);
							}
							word ^= lowest;
						}
					}
					loc.column += newline - i;
					this.generatedCodeColumn += newline - i;
				}
				if (newline === end) break;
				loc.line += 1;
				loc.column = 0;
				this.nextLine();
				i = newline + 1;
			}
		}
	}
	advance(str) {
		if (!str) return;
		const lastNewline = str.lastIndexOf("\n");
		for (let i = str.indexOf("\n"); i !== -1; i = str.indexOf("\n", i + 1)) this.nextLine();
		this.generatedCodeColumn += str.length - lastNewline - 1;
	}
};
//#endregion
//#region src/MagicString.ts
const n = "\n";
const NEWLINE_CHAR = "\n".charCodeAt(0);
const CR_CHAR = "\r".charCodeAt(0);
const warned = {
	insertLeft: false,
	insertRight: false,
	storeName: false
};
/**
* Expands the `$` substitution patterns that `String.prototype.replace` accepts
* in a string replacement.
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
*
* `captures` holds the capture groups in order, so `captures[0]` is `$1`.
* `namedCaptures` is `undefined` when the pattern has no named groups, and
* `$<name>` is then literal text - which is also the case for a string search
* value, where there are no groups of either kind.
*/
function expandReplacement(replacement, matched, position, str, captures, namedCaptures) {
	if (!replacement.includes("$")) return replacement;
	let result = "";
	let index = 0;
	while (index < replacement.length) {
		const dollar = replacement.indexOf("$", index);
		if (dollar === -1) {
			result += replacement.slice(index);
			break;
		}
		result += replacement.slice(index, dollar);
		const char = replacement[dollar + 1];
		let expansion = "$";
		let consumed = 1;
		if (char === "$") consumed = 2;
		else if (char === "&") {
			expansion = matched;
			consumed = 2;
		} else if (char === "`") {
			expansion = str.slice(0, position);
			consumed = 2;
		} else if (char === "'") {
			expansion = str.slice(position + matched.length);
			consumed = 2;
		} else if (char === "<" && namedCaptures !== void 0) {
			const close = replacement.indexOf(">", dollar + 2);
			if (close !== -1) {
				expansion = namedCaptures[replacement.slice(dollar + 2, close)] ?? "";
				consumed = close + 1 - dollar;
			}
		} else if (char >= "0" && char <= "9") {
			const second = replacement[dollar + 2];
			const double = second >= "0" && second <= "9" ? Number(char + second) : NaN;
			const single = Number(char);
			if (double >= 1 && double <= captures.length) {
				expansion = captures[double - 1] ?? "";
				consumed = 3;
			} else if (single >= 1 && single <= captures.length) {
				expansion = captures[single - 1] ?? "";
				consumed = 2;
			}
		}
		result += expansion;
		index = dollar + consumed;
	}
	return result;
}
var MagicString = class MagicString {
	/**
	* Wraps `string` for editing; every index passed to the editing methods refers to this original string.
	*/
	constructor(string, options = {}) {
		const chunk = new Chunk(0, string.length, string);
		Object.defineProperties(this, {
			original: {
				writable: true,
				value: string
			},
			outro: {
				writable: true,
				value: ""
			},
			intro: {
				writable: true,
				value: ""
			},
			firstChunk: {
				writable: true,
				value: chunk
			},
			lastChunk: {
				writable: true,
				value: chunk
			},
			lastSearchedChunk: {
				writable: true,
				value: chunk
			},
			byStart: {
				writable: true,
				value: /* @__PURE__ */ new Map([[0, chunk]])
			},
			byEnd: {
				writable: true,
				value: /* @__PURE__ */ new Map([[string.length, chunk]])
			},
			filename: {
				writable: true,
				value: options.filename
			},
			indentExclusionRanges: {
				writable: true,
				value: options.indentExclusionRanges
			},
			sourcemapLocations: {
				writable: true,
				value: new BitSet()
			},
			storedNames: {
				writable: true,
				value: /* @__PURE__ */ new Set()
			},
			indentStr: {
				writable: true,
				value: void 0
			},
			ignoreList: {
				writable: true,
				value: options.ignoreList
			},
			offset: {
				writable: true,
				value: options.offset || 0
			},
			hasMovedChunks: {
				writable: true,
				value: false
			}
		});
	}
	/**
	* Adds the specified character index (with respect to the original string) to sourcemap mappings, if `hires` is false.
	*/
	addSourcemapLocation(char) {
		this.sourcemapLocations.add(char);
	}
	/**
	* Appends the specified content to the end of the string.
	*/
	append(content) {
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this.outro += content;
		return this;
	}
	/**
	* Appends the specified content at the index in the original string.
	* If a range *ending* with index is subsequently moved, the insert will be moved with it.
	* See also `s.prependLeft(...)`.
	*/
	appendLeft(index, content) {
		index = this._resolveIndex(index);
		if (index < 0 || index > this.original.length) throw new MagicStringError(`index ${index} is out of bounds`);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this._split(index);
		const chunk = this.byEnd.get(index);
		if (chunk) chunk.appendLeft(content);
		else this.intro += content;
		return this;
	}
	/**
	* Appends the specified content at the index in the original string.
	* If a range *starting* with index is subsequently moved, the insert will be moved with it.
	* See also `s.prependRight(...)`.
	*/
	appendRight(index, content) {
		index = this._resolveIndex(index);
		if (index < 0 || index > this.original.length) throw new MagicStringError(`index ${index} is out of bounds`);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this._split(index);
		const chunk = this.byStart.get(index);
		if (chunk) chunk.appendRight(content);
		else this.outro += content;
		return this;
	}
	/**
	* Returns an independent copy: the chunk list, string-level intro/outro,
	* sourcemap locations, stored names, indent exclusion ranges, `offset`,
	* `filename` and `ignoreList` are all copied; later edits to either string
	* do not affect the other.
	*/
	clone() {
		const cloned = new MagicString(this.original, {
			filename: this.filename,
			ignoreList: this.ignoreList,
			offset: this.offset
		});
		let originalChunk = this.firstChunk;
		let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
		while (originalChunk) {
			cloned.byStart.set(clonedChunk.start, clonedChunk);
			cloned.byEnd.set(clonedChunk.end, clonedChunk);
			const nextOriginalChunk = originalChunk.next;
			const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
			if (nextClonedChunk) {
				clonedChunk.next = nextClonedChunk;
				nextClonedChunk.previous = clonedChunk;
				clonedChunk = nextClonedChunk;
			}
			originalChunk = nextOriginalChunk;
		}
		cloned.lastChunk = clonedChunk;
		if (this.indentExclusionRanges) cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
		cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
		cloned.storedNames = new Set(this.storedNames);
		cloned.intro = this.intro;
		cloned.outro = this.outro;
		cloned.hasMovedChunks = this.hasMovedChunks;
		return cloned;
	}
	/**
	* Generates a sourcemap object with raw mappings in array form, rather than encoded as a string.
	* Useful if you need to manipulate the sourcemap further, but most of the time you will use `generateMap` instead.
	*/
	generateDecodedMap(options) {
		options = options || {};
		const mappings = new Mappings(options.hires);
		const names = this._generateMappings(mappings);
		return {
			...this._mapProperties(options, names),
			mappings: mappings.raw,
			rangeMappings: mappings.rawRangeMappings
		};
	}
	/**
	* Generates a version 3 sourcemap.
	*/
	generateMap(options) {
		options = options || {};
		const encoder = new MappingsEncoder();
		const mappings = new Mappings(options.hires, encoder);
		const names = this._generateMappings(mappings);
		return new SourceMap({
			...this._mapProperties(options, names),
			mappings: encoder.finish(mappings.rawSegments),
			rangeMappings: mappings.rawRangeMappings
		});
	}
	/** @internal */
	_generateMappings(mappings) {
		const names = [...this.storedNames];
		mappings.addMagicString(this, 0, new Map(names.map((name, i) => [name, i])));
		return names;
	}
	/** @internal */
	_mapProperties(options, names) {
		return {
			file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
			sources: [options.source ? getRelativePath(options.file || "", options.source) : options.file || ""],
			sourcesContent: options.includeContent ? [this.original] : void 0,
			names,
			x_google_ignoreList: this.ignoreList ? [0] : void 0
		};
	}
	/** @internal */
	_ensureindentStr() {
		if (this.indentStr === void 0) this.indentStr = guessIndent(this.original);
	}
	/** @internal */
	_getRawIndentString() {
		this._ensureindentStr();
		return this.indentStr;
	}
	/**
	* Returns the indentation string guessed from the original content, falling back to a single tab character.
	* This is the value `s.indent()` uses when no prefix is supplied.
	*/
	getIndentString() {
		this._ensureindentStr();
		return this.indentStr ?? "	";
	}
	indent(indentStr, options) {
		const pattern = /^[^\r\n]/gm;
		if (isObject(indentStr)) {
			options = indentStr;
			indentStr = void 0;
		}
		if (indentStr === void 0) {
			this._ensureindentStr();
			indentStr = this.indentStr || "	";
		}
		if (indentStr === "") return this;
		const resolvedIndentStr = indentStr;
		options = options || {};
		const isExcluded = new BitSet();
		if (options.exclude) (typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude).forEach((exclusion) => {
			for (let i = exclusion[0]; i < exclusion[1]; i += 1) isExcluded.add(i);
		});
		let shouldIndentNextCharacter = options.indentStart !== false;
		const indentPiece = (str) => {
			if (str === "") return str;
			const indented = str.replace(pattern, (match, offset) => offset > 0 || shouldIndentNextCharacter ? `${resolvedIndentStr}${match}` : match);
			shouldIndentNextCharacter = str[str.length - 1] === "\n";
			return indented;
		};
		this.intro = indentPiece(this.intro);
		let charIndex = 0;
		let chunk = this.firstChunk;
		const indentAt = (index) => {
			shouldIndentNextCharacter = false;
			if (index === chunk.start) chunk.appendRight(resolvedIndentStr);
			else {
				this._splitChunk(chunk, index);
				chunk = chunk.next;
				chunk.prependRight(resolvedIndentStr);
			}
		};
		while (chunk) {
			const end = chunk.end;
			if (!isExcluded.has(chunk.start)) chunk.intro = indentPiece(chunk.intro);
			if (chunk.edited) {
				if (!isExcluded.has(chunk.start)) chunk.content = indentPiece(chunk.content);
				else if (chunk.content) shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
			} else if (options.exclude) {
				charIndex = chunk.start;
				while (charIndex < end) {
					if (!isExcluded.has(charIndex)) {
						const char = this.original.charCodeAt(charIndex);
						if (char === NEWLINE_CHAR) shouldIndentNextCharacter = true;
						else if (char !== CR_CHAR && shouldIndentNextCharacter) indentAt(charIndex);
					}
					charIndex += 1;
				}
			} else {
				charIndex = chunk.start;
				while (charIndex < end) {
					if (!shouldIndentNextCharacter) {
						const nextLine = this.original.indexOf(n, charIndex);
						if (nextLine === -1 || nextLine >= end) break;
						shouldIndentNextCharacter = true;
						charIndex = nextLine + 1;
						continue;
					}
					const char = this.original.charCodeAt(charIndex);
					if (char === NEWLINE_CHAR || char === CR_CHAR) {
						charIndex += 1;
						continue;
					}
					indentAt(charIndex);
					charIndex += 1;
				}
			}
			if (!isExcluded.has(chunk.end - 1)) chunk.outro = indentPiece(chunk.outro);
			charIndex = chunk.end;
			chunk = chunk.next;
		}
		this.outro = indentPiece(this.outro);
		return this;
	}
	/** @internal */
	insert() {
		throw new MagicStringError("insert() is deprecated, use appendLeft() or prependRight()");
	}
	/** @internal */
	insertLeft(index, content) {
		if (!warned.insertLeft) {
			console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead");
			warned.insertLeft = true;
		}
		return this.appendLeft(index, content);
	}
	/** @internal */
	insertRight(index, content) {
		if (!warned.insertRight) {
			console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead");
			warned.insertRight = true;
		}
		return this.prependRight(index, content);
	}
	/**
	* Moves the characters from `start` and `end` to `index`.
	*
	* `affinity` controls where the range is anchored at `index`. With the
	* default `'right'`, it is inserted before the content that starts at `index`;
	* with `'left'`, it is inserted after the content that ends at `index`. The
	* two differ only when other content has already been moved to that boundary,
	* mirroring the `appendLeft`/`appendRight` distinction.
	*/
	move(start, end, index, affinity = "right") {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		index = this._resolveIndex(index);
		if (start === end) return this;
		if (start < 0 || end > this.original.length || index < 0 || index > this.original.length) throw new MagicStringError(`range ${start}–${end} is out of bounds`);
		if (start > end) throw new MagicStringError(`end must be greater than start (start: ${start}, end: ${end})`);
		if (index >= start && index <= end) throw new MagicStringError("cannot move a selection inside itself");
		this._split(start);
		this._split(end);
		this._split(index);
		const first = this.byStart.get(start);
		const last = this.byEnd.get(end);
		if (!first || !last) throw new MagicStringError(`range ${start}–${end} is out of bounds`);
		if (this.hasMovedChunks) {
			let cursor = first;
			while (cursor !== last) {
				cursor = cursor.next;
				if (!cursor || cursor.start < start || cursor.end > end) throw new MagicStringError(`cannot move ${start} to ${end} because an earlier move split that range`);
			}
		}
		const oldLeft = first.previous;
		const oldRight = last.next;
		let newLeft;
		let newRight;
		if (affinity === "left") {
			newLeft = this.byEnd.get(index) ?? null;
			if (!newLeft) {
				if (first === this.firstChunk) return this;
				newRight = this.firstChunk;
			} else {
				if (newLeft.next === first) return this;
				newRight = newLeft.next;
			}
		} else {
			newRight = this.byStart.get(index) ?? null;
			if (!newRight) {
				if (last === this.lastChunk) return this;
				newLeft = this.lastChunk;
			} else {
				if (newRight.previous === last) return this;
				newLeft = newRight.previous;
			}
		}
		if (oldLeft) oldLeft.next = oldRight;
		if (oldRight) oldRight.previous = oldLeft;
		if (newLeft) newLeft.next = first;
		if (newRight) newRight.previous = last;
		if (!oldLeft) this.firstChunk = oldRight;
		if (!oldRight) {
			this.lastChunk = oldLeft;
			this.lastChunk.next = null;
		}
		first.previous = newLeft;
		last.next = newRight || null;
		if (!newLeft) this.firstChunk = first;
		if (!newRight) this.lastChunk = last;
		this.hasMovedChunks = true;
		return this;
	}
	/**
	* Replaces the characters from `start` to `end` with `content`, along with the appended/prepended content in
	* that range. The same restrictions as `s.remove()` apply.
	*
	* The fourth argument is optional. It can have a storeName property - if true, the original name will be stored
	* for later inclusion in a sourcemap's names array - and a contentOnly property which determines whether only
	* the content is overwritten, or anything that was appended/prepended to the range as well.
	*
	* It may be preferred to use `s.update(...)` instead if you wish to avoid overwriting the appended/prepended content.
	*/
	overwrite(start, end, content, options) {
		if (options === true) {
			if (!warned.storeName) {
				console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string");
				warned.storeName = true;
			}
			return this.update(start, end, content, {
				storeName: true,
				overwrite: true
			});
		}
		const optionObject = typeof options === "object" && options ? options : {};
		return this.update(start, end, content, {
			...optionObject,
			overwrite: !optionObject.contentOnly
		});
	}
	/**
	* Replaces the characters from `start` to `end` with `content`. The same restrictions as `s.remove()` apply.
	*
	* The fourth argument is optional. It can have a storeName property - if true, the original name will be stored
	* for later inclusion in a sourcemap's names array - and an overwrite property which determines whether only
	* the content is overwritten, or anything that was appended/prepended to the range as well.
	*/
	update(start, end, content, options) {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		if (start < 0) throw new MagicStringError(`start ${start} is out of bounds`);
		if (end > this.original.length) throw new MagicStringError(`end ${end} is out of bounds`);
		if (start === end) throw new MagicStringError(`cannot overwrite a zero-length range at ${start}, use appendLeft() or prependRight()`);
		if (start > end) throw new MagicStringError(`end must be greater than start (start: ${start}, end: ${end})`);
		this._split(start);
		this._split(end);
		if (options === true) {
			if (!warned.storeName) {
				console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string");
				warned.storeName = true;
			}
			options = { storeName: true };
		}
		const optionObject = typeof options === "object" && options ? options : {};
		const storeName = optionObject.storeName || false;
		const overwrite = optionObject.overwrite || false;
		if (storeName) this.storedNames.add(this.original.slice(start, end));
		const first = this.byStart.get(start);
		for (let chunk = first; chunk.end < end;) {
			const next = chunk.next;
			if (next === null || next !== this.byStart.get(chunk.end)) throw new MagicStringError("cannot overwrite across a split point");
			chunk = next;
		}
		for (let chunk = first.next; chunk !== null && chunk.start < end; chunk = chunk.next) {
			chunk.edit("", false, !overwrite);
			chunk.replacesUntil = -1;
			chunk.replacedFrom = start;
		}
		first.edit(content, storeName, !overwrite);
		first.replacesUntil = end;
		first.replacedFrom = -1;
		return this;
	}
	/**
	* Prepends the string with the specified content.
	*/
	prepend(content) {
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this.intro = content + this.intro;
		return this;
	}
	/**
	* Same as `s.appendLeft(...)`, except that the inserted content will go *before* any previous appends or prepends at index
	*/
	prependLeft(index, content) {
		index = this._resolveIndex(index);
		if (index < 0 || index > this.original.length) throw new MagicStringError(`index ${index} is out of bounds`);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this._split(index);
		const chunk = this.byEnd.get(index);
		if (chunk) chunk.prependLeft(content);
		else this.intro = content + this.intro;
		return this;
	}
	/**
	* Same as `s.appendRight(...)`, except that the inserted content will go *before* any previous appends or prepends at `index`
	*/
	prependRight(index, content) {
		index = this._resolveIndex(index);
		if (index < 0 || index > this.original.length) throw new MagicStringError(`index ${index} is out of bounds`);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this._split(index);
		const chunk = this.byStart.get(index);
		if (chunk) chunk.prependRight(content);
		else this.outro = content + this.outro;
		return this;
	}
	/**
	* Removes the characters from `start` to `end` (of the original string, **not** the generated string).
	* Content appended or prepended at positions strictly inside the range is removed with it, while
	* content attached at `start` or `end` is preserved — use `s.overwrite(start, end, '')` to remove
	* the range including its edge inserts.
	* Repeated removals and removals with partially overlapping ranges are allowed.
	*/
	remove(start, end) {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		if (start === end) return this;
		if (start < 0 || end > this.original.length) throw new MagicStringError(`range ${start}–${end} is out of bounds`);
		if (start > end) throw new MagicStringError(`end must be greater than start (start: ${start}, end: ${end})`);
		this._split(start);
		this._split(end);
		let chunk = this.byStart.get(start);
		while (chunk) {
			if (chunk.start > start) chunk.intro = "";
			if (chunk.end < end) chunk.outro = "";
			chunk.edit("", false, true);
			chunk.replacesUntil = -1;
			chunk.replacedFrom = -1;
			chunk = end > chunk.end ? this.byStart.get(chunk.end) : void 0;
		}
		return this;
	}
	/**
	* Reset the modified characters from `start` to `end` (of the original string, **not** the generated string).
	*/
	reset(start, end) {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		if (start === end) return this;
		if (start < 0 || end > this.original.length) throw new MagicStringError(`range ${start}–${end} is out of bounds`);
		if (start > end) throw new MagicStringError(`end must be greater than start (start: ${start}, end: ${end})`);
		this._split(start);
		this._split(end);
		let chunk = this.byStart.get(start);
		while (chunk) {
			chunk.reset();
			chunk = end > chunk.end ? this.byStart.get(chunk.end) : void 0;
		}
		return this;
	}
	/**
	* Returns the last character of the generated string, or `''` if it is empty.
	*/
	lastChar() {
		if (this.outro.length) return this.outro[this.outro.length - 1];
		let chunk = this.lastChunk;
		while (chunk) {
			if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
			if (chunk.content.length) return chunk.content[chunk.content.length - 1];
			if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
			chunk = chunk.previous;
		}
		if (this.intro.length) return this.intro[this.intro.length - 1];
		return "";
	}
	/**
	* Returns everything after the last newline in the generated string, or the whole string if there is no newline.
	*/
	lastLine() {
		let lineIndex = this.outro.lastIndexOf(n);
		if (lineIndex !== -1) return this.outro.slice(lineIndex + 1);
		let lineStr = this.outro;
		let chunk = this.lastChunk;
		while (chunk) {
			if (chunk.outro.length > 0) {
				lineIndex = chunk.outro.lastIndexOf(n);
				if (lineIndex !== -1) return chunk.outro.slice(lineIndex + 1) + lineStr;
				lineStr = chunk.outro + lineStr;
			}
			if (chunk.content.length > 0) {
				lineIndex = chunk.content.lastIndexOf(n);
				if (lineIndex !== -1) return chunk.content.slice(lineIndex + 1) + lineStr;
				lineStr = chunk.content + lineStr;
			}
			if (chunk.intro.length > 0) {
				lineIndex = chunk.intro.lastIndexOf(n);
				if (lineIndex !== -1) return chunk.intro.slice(lineIndex + 1) + lineStr;
				lineStr = chunk.intro + lineStr;
			}
			chunk = chunk.previous;
		}
		lineIndex = this.intro.lastIndexOf(n);
		if (lineIndex !== -1) return this.intro.slice(lineIndex + 1) + lineStr;
		return this.intro + lineStr;
	}
	/**
	* Returns the content of the generated string that corresponds to the slice
	* between `start` and `end` of the original string, walking the generated
	* string from the chunk holding `start` to the chunk holding `end`. Throws
	* if either index falls inside replaced content. After `move()`, a range
	* whose end now comes before its start in the output yields `''`.
	*/
	slice(start = 0, end = this.original.length - this.offset) {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		let result = "";
		let chunk;
		if (this.hasMovedChunks) {
			chunk = this.firstChunk;
			while (chunk && (chunk.start > start || chunk.end <= start)) {
				if (chunk.start < end && chunk.end >= end || end === 0 && chunk.start === 0) return result;
				chunk = chunk.next;
			}
		} else {
			if (start >= end) return result;
			chunk = this._chunkAt(start);
		}
		if (chunk && chunk.edited && chunk.start !== start) throw new MagicStringError(`cannot use edited character ${start} as slice start anchor`);
		const startChunk = chunk;
		while (chunk) {
			if (end === 0 && chunk.start === 0) break;
			if (chunk.intro && (startChunk !== chunk || chunk.start === start)) result += chunk.intro;
			const containsEnd = chunk.start < end && chunk.end >= end;
			if (containsEnd && chunk.edited && chunk.end !== end) throw new MagicStringError(`cannot use edited character ${end} as slice end anchor`);
			const sliceStart = startChunk === chunk ? start - chunk.start : 0;
			const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
			result += chunk.content.slice(sliceStart, sliceEnd);
			if (chunk.outro && (!containsEnd || chunk.end === end)) result += chunk.outro;
			if (containsEnd) break;
			chunk = chunk.next;
		}
		return result;
	}
	/**
	* Returns a clone of `s`, with all content before the `start` and `end` characters of the original string removed.
	*/
	snip(start, end) {
		const clone = this.clone();
		clone.remove(-clone.offset, start);
		clone.remove(end, clone.original.length - clone.offset);
		return clone;
	}
	/**
	* Applies `offset`, resolves a negative index from the end of `original` as
	* `update`/`remove` always have, and rejects anything that is not an integer.
	* Bounds are checked by the caller, because the methods report them differently.
	*
	* @internal
	*/
	_resolveIndex(index) {
		const resolved = index + this.offset;
		if (!Number.isInteger(resolved)) throw new MagicStringError(`index must be an integer, got ${index}`);
		if (resolved < 0 && this.original.length !== 0) return Math.max(0, resolved + this.original.length);
		return resolved;
	}
	/**
	* The chunk whose original range holds `index` (`chunk.start <= index < chunk.end`),
	* or `undefined` when `index` is at or past the end. Searches from the last
	* visited chunk so that scans over nearby indices stay cheap.
	*
	* @internal
	*/
	_chunkAt(index) {
		let chunk = this.byStart.get(index);
		if (chunk) return chunk;
		chunk = this.lastSearchedChunk;
		const searchForward = index >= chunk.end;
		while (chunk && !chunk.contains(index)) chunk = searchForward ? this.byStart.get(chunk.end) : this.byEnd.get(chunk.start);
		if (chunk) this.lastSearchedChunk = chunk;
		return chunk;
	}
	/** @internal */
	_split(index) {
		if (this.byStart.get(index) || this.byEnd.get(index)) return;
		let chunk = this.lastSearchedChunk;
		let previousChunk = chunk;
		const searchForward = index > chunk.end;
		while (chunk) {
			if (chunk.contains(index)) return this._splitChunk(chunk, index);
			chunk = searchForward ? this.byStart.get(chunk.end) : this.byEnd.get(chunk.start);
			if (chunk === previousChunk) return;
			previousChunk = chunk;
		}
	}
	/** @internal */
	_splitChunk(chunk, index) {
		if (chunk.edited && chunk.content.length) {
			const loc = getLocator(this.original)(index);
			throw new MagicStringError(`cannot split a chunk that has already been edited (${loc.line}:${loc.column} – "${chunk.original}")`);
		}
		const newChunk = chunk.split(index);
		this.byEnd.set(index, chunk);
		this.byStart.set(index, newChunk);
		this.byEnd.set(newChunk.end, newChunk);
		if (chunk === this.lastChunk) this.lastChunk = newChunk;
		this.lastSearchedChunk = chunk;
		return true;
	}
	/**
	* Returns the generated string.
	*/
	toString() {
		let str = this.intro;
		let chunk = this.firstChunk;
		while (chunk) {
			str += chunk.toString();
			chunk = chunk.next;
		}
		return str + this.outro;
	}
	/**
	* Returns true if the resulting source is empty (disregarding white space).
	*/
	isEmpty() {
		if (this.intro.length && this.intro.trim()) return false;
		let chunk = this.firstChunk;
		while (chunk) {
			if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim()) return false;
			chunk = chunk.next;
		}
		if (this.outro.length && this.outro.trim()) return false;
		return true;
	}
	/**
	* Returns the length of the generated string, counting only content attached to the original characters.
	* Content outside the string body (`s.prepend()`/`s.append()`, and inserts before the first or after the last
	* character) is not counted, so this can differ from `s.toString().length`.
	*/
	length() {
		let chunk = this.firstChunk;
		let length = 0;
		while (chunk) {
			length += chunk.intro.length + chunk.content.length + chunk.outro.length;
			chunk = chunk.next;
		}
		return length;
	}
	/**
	* Removes empty lines from the start and end.
	*/
	trimLines() {
		return this.trim("[\\r\\n]");
	}
	/**
	* Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the start and end.
	*/
	trim(charType) {
		return this.trimStart(charType).trimEnd(charType);
	}
	/** @internal */
	trimEndAborted(charType) {
		const rx = new RegExp(`${charType || "\\s"}+$`);
		this.outro = this.outro.replace(rx, "");
		if (this.outro.length) return true;
		let chunk = this.lastChunk;
		do {
			const end = chunk.end;
			const aborted = chunk.trimEnd(rx);
			if (chunk.end !== end) {
				const next = chunk.next;
				if (this.lastChunk === chunk) this.lastChunk = next;
				this.byEnd.set(chunk.end, chunk);
				this.byStart.set(next.start, next);
				this.byEnd.set(next.end, next);
			}
			if (aborted) return true;
			chunk = chunk.previous;
		} while (chunk);
		this.intro = this.intro.replace(rx, "");
		return this.intro.length > 0;
	}
	/**
	* Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the end.
	*/
	trimEnd(charType) {
		this.trimEndAborted(charType);
		return this;
	}
	/** @internal */
	trimStartAborted(charType) {
		const rx = new RegExp(`^${charType || "\\s"}+`);
		this.intro = this.intro.replace(rx, "");
		if (this.intro.length) return true;
		let chunk = this.firstChunk;
		do {
			const end = chunk.end;
			const aborted = chunk.trimStart(rx);
			if (chunk.end !== end) {
				const next = chunk.next;
				if (chunk === this.lastChunk) this.lastChunk = next;
				this.byEnd.set(chunk.end, chunk);
				this.byStart.set(next.start, next);
				this.byEnd.set(next.end, next);
			}
			if (aborted) return true;
			chunk = chunk.next;
		} while (chunk);
		this.outro = this.outro.replace(rx, "");
		return this.outro.length > 0;
	}
	/**
	* Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the start.
	*/
	trimStart(charType) {
		this.trimStartAborted(charType);
		return this;
	}
	/**
	* Indicates if the string has been changed.
	*/
	hasChanged() {
		if (this.intro || this.outro) return true;
		let outputIndex = 0;
		let chunk = this.firstChunk;
		while (chunk) {
			if (chunk.intro || chunk.outro) return true;
			if (!chunk.edited && chunk.start === outputIndex) outputIndex = chunk.end;
			else {
				if (!this.original.startsWith(chunk.content, outputIndex)) return true;
				outputIndex += chunk.content.length;
			}
			chunk = chunk.next;
		}
		return outputIndex !== this.original.length;
	}
	/**
	* Whether the original range [start, end) has had any of its characters
	* removed. `replace`/`replaceAll` search `original`, so a match can land on
	* text that is no longer in the output - overwriting it would resurrect the
	* removed characters, so such matches are skipped instead.
	*
	* @internal
	*/
	_hasRemovedContent(start, end) {
		const atBoundary = this.byStart.get(start);
		if (atBoundary && start === end) {
			const previous = this.byEnd.get(start);
			return !!previous && previous.content === "" && atBoundary.content === "";
		}
		let chunk = this._chunkAt(start);
		while (chunk && chunk.start < end) {
			if (chunk.content === "" && (chunk.replacedFrom < start || this.byStart.get(chunk.replacedFrom).replacesUntil < chunk.end)) return true;
			chunk = this.byStart.get(chunk.end);
		}
		return false;
	}
	/** @internal */
	_replaceRegexp(searchValue, replacement) {
		function getReplacement(match, index, str) {
			if (typeof replacement === "string") return expandReplacement(replacement, match[0], index, str, match.slice(1), match.groups);
			else return match.groups === void 0 ? replacement(match[0], ...match.slice(1), index, str) : replacement(match[0], ...match.slice(1), index, str, match.groups);
		}
		const replaceMatch = (match) => {
			/* v8 ignore next 2 -- `match.index` is always defined for matches from `matchAll` */
			if (match.index == null) return false;
			if (this._hasRemovedContent(match.index, match.index + match[0].length)) return false;
			const replacement = getReplacement(match, match.index, this.original);
			if (replacement === match[0]) return true;
			if (match[0].length === 0) this.appendRight(match.index - this.offset, replacement);
			else this.overwrite(match.index - this.offset, match.index + match[0].length - this.offset, replacement);
			return true;
		};
		if (searchValue.global) {
			searchValue.lastIndex = 0;
			for (const match of this.original.matchAll(searchValue)) replaceMatch(match);
		} else {
			const match = this.original.match(searchValue);
			if (match && !replaceMatch(match)) {
				const global = new RegExp(searchValue.source, `${searchValue.flags}g`);
				for (const next of this.original.matchAll(global)) if (replaceMatch(next)) break;
			}
		}
		return this;
	}
	/** @internal */
	_replaceString(string, replacement) {
		const { original } = this;
		let index = original.indexOf(string);
		while (index !== -1) {
			if (this._hasRemovedContent(index, index + string.length)) {
				index = original.indexOf(string, index + string.length);
				continue;
			}
			if (typeof replacement === "function") replacement = replacement(string, index, original);
			else replacement = expandReplacement(replacement, string, index, original, [], void 0);
			if (string !== replacement) {
				if (string.length === 0) this.appendRight(index - this.offset, replacement);
				else this.overwrite(index - this.offset, index + string.length - this.offset, replacement);
			}
			break;
		}
		return this;
	}
	/**
	* String replacement with RegExp or string.
	*/
	replace(searchValue, replacement) {
		if (typeof searchValue === "string") return this._replaceString(searchValue, replacement);
		return this._replaceRegexp(searchValue, replacement);
	}
	/** @internal */
	_replaceAllString(string, replacement) {
		const { original } = this;
		const stringLength = string.length;
		if (stringLength === 0) {
			for (let index = 0; index <= original.length; index += 1) {
				if (this._hasRemovedContent(index, index)) continue;
				const _replacement = typeof replacement === "function" ? replacement("", index, original) : expandReplacement(replacement, "", index, original, [], void 0);
				if (_replacement !== "") this.appendRight(index - this.offset, _replacement);
			}
			return this;
		}
		for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
			if (this._hasRemovedContent(index, index + stringLength)) continue;
			const previous = original.slice(index, index + stringLength);
			const _replacement = typeof replacement === "function" ? replacement(previous, index, original) : expandReplacement(replacement, previous, index, original, [], void 0);
			if (previous !== _replacement) this.overwrite(index - this.offset, index + stringLength - this.offset, _replacement);
		}
		return this;
	}
	/**
	* Same as `s.replace`, but replace all matched strings instead of just one.
	*/
	replaceAll(searchValue, replacement) {
		if (typeof searchValue === "string") return this._replaceAllString(searchValue, replacement);
		if (!searchValue.global) throw new MagicStringError("replaceAll() requires a global RegExp");
		return this._replaceRegexp(searchValue, replacement);
	}
};
//#endregion
//#region src/Bundle.ts
const hasOwnProp = Object.prototype.hasOwnProperty;
var Bundle = class Bundle {
	constructor(options = {}) {
		this.intro = options.intro || "";
		this.separator = options.separator !== void 0 ? options.separator : "\n";
		this.sources = [];
		this.uniqueSources = [];
		this.uniqueSourceIndexByFilename = /* @__PURE__ */ new Map();
	}
	/**
	* Adds the specified source to the bundle, which can either be a `MagicString` object directly,
	* or an options object that holds a magic string `content` property and optionally provides
	* a `filename` for the source within the bundle, as well as an optional `ignoreList` hint
	* (which defaults to `false`). The `filename` is used when constructing the source map for the
	* bundle, to identify this `source` in the source map's `sources` field. The `ignoreList` hint
	* is used to populate the `x_google_ignoreList` extension field in the source map, which is a
	* mechanism for tools to signal to debuggers that certain sources should be ignored by default
	* (depending on user preferences).
	*/
	addSource(source) {
		if (source instanceof MagicString) return this.addSource({
			content: source,
			filename: source.filename,
			separator: this.separator
		});
		if (!isObject(source) || !source.content) throw new MagicStringError("addSource() requires a `content` property that is a MagicString");
		const content = source.content;
		const record = {
			content,
			filename: hasOwnProp.call(source, "filename") ? source.filename : content.filename,
			ignoreList: hasOwnProp.call(source, "ignoreList") ? source.ignoreList : content.ignoreList,
			indentExclusionRanges: hasOwnProp.call(source, "indentExclusionRanges") ? source.indentExclusionRanges : content.indentExclusionRanges,
			separator: source.separator ?? this.separator
		};
		if (record.filename) {
			const index = this.uniqueSourceIndexByFilename.get(record.filename);
			if (index === void 0) {
				this.uniqueSourceIndexByFilename.set(record.filename, this.uniqueSources.length);
				this.uniqueSources.push({
					filename: record.filename,
					content: content.original
				});
			} else if (content.original !== this.uniqueSources[index].content) throw new MagicStringError(`duplicate filename "${record.filename}" with different content, use unique filenames`);
		}
		this.sources.push(record);
		return this;
	}
	/**
	* Appends `str` as a new source without a filename. Only `options.separator` is read, and it defaults to `''`
	* rather than to the bundle separator.
	*/
	append(str, options) {
		this.addSource({
			content: new MagicString(str),
			separator: options && options.separator || ""
		});
		return this;
	}
	/**
	* Returns an independent copy of the bundle: every source's `MagicString` is cloned, so later edits to either
	* bundle do not affect the other.
	*/
	clone() {
		const bundle = new Bundle({
			intro: this.intro,
			separator: this.separator
		});
		this.sources.forEach((source) => {
			bundle.addSource({
				filename: source.filename,
				content: source.content.clone(),
				ignoreList: source.ignoreList,
				indentExclusionRanges: source.indentExclusionRanges,
				separator: source.separator
			});
		});
		return bundle;
	}
	/**
	* Flattens the bundle into a single `MagicString`, so the concatenated result can be
	* processed further with the full `MagicString` API. The returned string's `original`
	* is the concatenation of every source's `original`, and all existing edits, inserts,
	* intros, outros and separators are preserved as inserted content, so its `toString()`
	* equals the bundle's `toString()` and its sourcemap maps back to that combined original.
	*
	* Because a `MagicString` maps to a single source, per-source `filename`s are not carried
	* over; generate the bundle's map before flattening if you need the multi-source mapping.
	*/
	toMagicString() {
		const combined = new MagicString(this.sources.map((source) => source.content.original).join(""));
		let offset = 0;
		let pending = this.intro;
		let first = null;
		let last = null;
		const byStart = /* @__PURE__ */ new Map();
		const byEnd = /* @__PURE__ */ new Map();
		let hasMovedChunks = false;
		for (const [i, source] of this.sources.entries()) {
			const magicString = source.content;
			const separator = i > 0 ? source.separator : "";
			if (magicString.original.length === 0) {
				pending += separator + magicString.toString();
				continue;
			}
			pending += separator + magicString.intro;
			let sourceFirst = null;
			let previous = null;
			let originalChunk = magicString.firstChunk;
			while (originalChunk) {
				const chunk = originalChunk.clone();
				chunk.start += offset;
				chunk.end += offset;
				if (chunk.replacesUntil !== -1) chunk.replacesUntil += offset;
				if (chunk.replacedFrom !== -1) chunk.replacedFrom += offset;
				chunk.previous = previous;
				chunk.next = null;
				if (previous) previous.next = chunk;
				byStart.set(chunk.start, chunk);
				byEnd.set(chunk.end, chunk);
				sourceFirst ??= chunk;
				previous = chunk;
				originalChunk = originalChunk.next;
			}
			const sourceLast = previous;
			sourceFirst.intro = pending + sourceFirst.intro;
			pending = "";
			sourceLast.outro += magicString.outro;
			if (last) {
				last.next = sourceFirst;
				sourceFirst.previous = last;
			} else first = sourceFirst;
			last = sourceLast;
			magicString.sourcemapLocations.forEach((index) => {
				if (index < magicString.original.length) combined.sourcemapLocations.add(index + offset);
			});
			magicString.storedNames.forEach((name) => combined.storedNames.add(name));
			if (magicString.hasMovedChunks) hasMovedChunks = true;
			offset += magicString.original.length;
		}
		if (!first || !last) {
			combined.intro = pending;
			return combined;
		}
		if (pending) last.outro += pending;
		combined.firstChunk = first;
		combined.lastChunk = last;
		combined.lastSearchedChunk = first;
		combined.byStart = byStart;
		combined.byEnd = byEnd;
		combined.hasMovedChunks = hasMovedChunks;
		return combined;
	}
	/**
	* Generates a sourcemap object with raw mappings in array form, rather than encoded as a string.
	* Takes the same options as `generateMap`.
	*/
	generateDecodedMap(options = {}) {
		const mappings = new Mappings(options.hires);
		const { names, x_google_ignoreList } = this._generateMappings(mappings);
		return {
			...this._mapProperties(options, names, x_google_ignoreList),
			mappings: mappings.raw,
			rangeMappings: mappings.rawRangeMappings
		};
	}
	/**
	* Generates a version 3 sourcemap covering every source that has a `filename`.
	* Options are as per `MagicString#generateMap`, except that `includeContent` can also be a per-source function.
	*/
	generateMap(options = {}) {
		const encoder = new MappingsEncoder();
		const mappings = new Mappings(options.hires, encoder);
		const { names, x_google_ignoreList } = this._generateMappings(mappings);
		return new SourceMap({
			...this._mapProperties(options, names, x_google_ignoreList),
			mappings: encoder.finish(mappings.rawSegments),
			rangeMappings: mappings.rawRangeMappings
		});
	}
	/** @internal */
	_generateMappings(mappings) {
		let x_google_ignoreList;
		const storedNames = /* @__PURE__ */ new Set();
		this.sources.forEach((source) => source.content.storedNames.forEach((name) => storedNames.add(name)));
		const names = [...storedNames];
		const nameIndex = new Map(names.map((name, i) => [name, i]));
		if (this.intro) mappings.advance(this.intro);
		this.sources.forEach((source, i) => {
			if (i > 0) mappings.advance(source.separator);
			const sourceIndex = source.filename ? this.uniqueSourceIndexByFilename.get(source.filename) ?? -1 : -1;
			mappings.addMagicString(source.content, sourceIndex, nameIndex);
			if (source.ignoreList && sourceIndex !== -1) {
				if (x_google_ignoreList === void 0) x_google_ignoreList = [];
				x_google_ignoreList.push(sourceIndex);
			}
		});
		return {
			names,
			x_google_ignoreList
		};
	}
	/** @internal */
	_mapProperties(options, names, x_google_ignoreList) {
		return {
			file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
			sources: this.uniqueSources.map((source) => {
				return options.file ? getRelativePath(options.file, source.filename) : source.filename;
			}),
			sourcesContent: this.uniqueSources.map((source) => {
				return (typeof options.includeContent === "function" ? options.includeContent(source) : options.includeContent) ? source.content : null;
			}),
			names,
			x_google_ignoreList
		};
	}
	/**
	* Returns the most common indent string among the sources, falling back to a tab.
	*/
	getIndentString() {
		const indentStringCounts = /* @__PURE__ */ new Map();
		this.sources.forEach((source) => {
			const indentStr = source.content._getRawIndentString();
			if (indentStr == null) return;
			indentStringCounts.set(indentStr, (indentStringCounts.get(indentStr) ?? 0) + 1);
		});
		return [...indentStringCounts.entries()].sort(([, a], [, b]) => b - a)[0]?.[0] ?? "	";
	}
	/**
	* Prefixes each line of every source and of the intro with `indentStr`, guessed with `getIndentString()`
	* when not supplied. Each source's `indentExclusionRanges` are left unindented.
	*/
	indent(indentStr) {
		if (!arguments.length) indentStr = this.getIndentString();
		if (indentStr === "") return this;
		let trailingNewline = !this.intro || this.intro.slice(-1) === "\n";
		this.sources.forEach((source, i) => {
			const indentStart = trailingNewline || i > 0 && /\r?\n$/.test(source.separator);
			source.content.indent(indentStr, {
				exclude: source.indentExclusionRanges,
				indentStart
			});
			trailingNewline = source.content.lastChar() === "\n";
		});
		if (this.intro) this.intro = indentStr + this.intro.replace(/^[^\r\n]/gm, (match, index) => {
			return index > 0 ? indentStr + match : match;
		});
		return this;
	}
	/**
	* Prepends `str` to the bundle's intro.
	*/
	prepend(str) {
		this.intro = str + this.intro;
		return this;
	}
	/**
	* Returns the intro followed by every source's generated string, joined by their separators.
	*/
	toString() {
		const body = this.sources.map((source, i) => {
			return (i > 0 ? source.separator : "") + source.content.toString();
		}).join("");
		return this.intro + body;
	}
	/**
	* Returns true if the bundle's output is empty (disregarding white space).
	*/
	isEmpty() {
		if (this.intro.length && this.intro.trim()) return false;
		if (this.sources.some((source, i) => {
			return i > 0 && source.separator.trim() !== "" || !source.content.isEmpty();
		})) return false;
		return true;
	}
	/**
	* Returns the length of the bundle's output; unlike `MagicString#length`, this equals `bundle.toString().length`.
	*/
	length() {
		return this.sources.reduce((length, source, i) => {
			return length + (i > 0 ? source.separator.length : 0) + source.content.length() + source.content.intro.length + source.content.outro.length;
		}, this.intro.length);
	}
	/**
	* Removes empty lines from the start and end.
	*/
	trimLines() {
		return this.trim("[\\r\\n]");
	}
	/**
	* Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the start and end.
	*/
	trim(charType) {
		return this.trimStart(charType).trimEnd(charType);
	}
	/**
	* Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the start.
	*/
	trimStart(charType) {
		const rx = new RegExp(`^${charType || "\\s"}+`);
		this.intro = this.intro.replace(rx, "");
		if (!this.intro) for (let i = 0; i < this.sources.length; i += 1) {
			const source = this.sources[i];
			if (i > 0) {
				source.separator = source.separator.replace(rx, "");
				if (source.separator) break;
			}
			if (source.content.trimStartAborted(charType)) break;
		}
		return this;
	}
	/**
	* Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the end.
	*/
	trimEnd(charType) {
		const rx = new RegExp(`${charType || "\\s"}+$`);
		for (let i = this.sources.length - 1; i >= 0; i -= 1) {
			const source = this.sources[i];
			if (source.content.trimEndAborted(charType)) return this;
			if (i > 0) {
				source.separator = source.separator.replace(rx, "");
				if (source.separator) return this;
			}
		}
		this.intro = this.intro.replace(rx, "");
		return this;
	}
};
//#endregion
export { Bundle, MagicString, MagicString as default, MagicStringError, SourceMap };
