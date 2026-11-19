import { f as format$1, p as plugins, c as createDOMElementFilter } from './index.D0heQG4v.js';

const { AsymmetricMatcher, DOMCollection, DOMElement, Immutable, ReactElement, ReactTestComponent } = plugins;
const PLUGINS = [
	ReactTestComponent,
	ReactElement,
	DOMElement,
	DOMCollection,
	Immutable,
	AsymmetricMatcher
];
function stringify(object, maxDepth = 10, { maxLength, filterNode, ...options } = {}) {
	const MAX_LENGTH = maxLength ?? 1e4;
	let result;
	// Convert string selector to filter function
	const filterFn = typeof filterNode === "string" ? createNodeFilterFromSelector(filterNode) : filterNode;
	const plugins = filterFn ? [
		ReactTestComponent,
		ReactElement,
		createDOMElementFilter(filterFn),
		DOMCollection,
		Immutable,
		AsymmetricMatcher
	] : PLUGINS;
	try {
		result = format$1(object, {
			maxDepth,
			escapeString: false,
			// min: true,
			plugins,
			...options
		});
	} catch {
		result = format$1(object, {
			callToJSON: false,
			maxDepth,
			escapeString: false,
			// min: true,
			plugins,
			...options
		});
	}
	// Prevents infinite loop https://github.com/vitest-dev/vitest/issues/7249
	return result.length >= MAX_LENGTH && maxDepth > 1 ? stringify(object, Math.floor(Math.min(maxDepth, Number.MAX_SAFE_INTEGER) / 2), {
		maxLength,
		filterNode,
		...options
	}) : result;
}
function createNodeFilterFromSelector(selector) {
	const ELEMENT_NODE = 1;
	const COMMENT_NODE = 8;
	return (node) => {
		// Filter out comments
		if (node.nodeType === COMMENT_NODE) return false;
		// Filter out elements matching the selector
		if (node.nodeType === ELEMENT_NODE && node.matches) try {
			return !node.matches(selector);
		} catch {
			return true;
		}
		return true;
	};
}
const formatRegExp = /%[sdjifoOc%]/g;
function format(args, options = {}) {
	const formatArg = (item) => inspect(item, options);
	if (typeof args[0] !== "string") {
		const objects = [];
		for (let i = 0; i < args.length; i++) objects.push(formatArg(args[i]));
		return objects.join(" ");
	}
	const len = args.length;
	let i = 1;
	const template = args[0];
	let str = String(template).replace(formatRegExp, (x) => {
		if (x === "%%") return "%";
		if (i >= len) return x;
		switch (x) {
			case "%s": {
				const value = args[i++];
				if (typeof value === "bigint") return `${value.toString()}n`;
				if (typeof value === "number" && value === 0 && 1 / value < 0) return "-0";
				if (typeof value === "object" && value !== null) {
					if (typeof value.toString === "function" && value.toString !== Object.prototype.toString) return value.toString();
					return formatArg(value);
				}
				return String(value);
			}
			case "%d": {
				const value = args[i++];
				if (typeof value === "bigint") return `${value.toString()}n`;
				if (typeof value === "symbol") return "NaN";
				return Number(value).toString();
			}
			case "%i": {
				const value = args[i++];
				if (typeof value === "bigint") return `${value.toString()}n`;
				return Number.parseInt(String(value)).toString();
			}
			case "%f": return Number.parseFloat(String(args[i++])).toString();
			case "%o":
			case "%O": return formatArg(args[i++]);
			case "%c":
				i++;
				return "";
			case "%j": try {
				return JSON.stringify(args[i++]);
			} catch (err) {
				const m = err.message;
				if (m.includes("circular structure") || m.includes("cyclic structures") || m.includes("cyclic object")) return "[Circular]";
				throw err;
			}
			default: return x;
		}
	});
	for (let x = args[i]; i < len; x = args[++i]) if (x === null || typeof x !== "object") str += ` ${typeof x === "symbol" ? x.toString() : x}`;
	else str += ` ${formatArg(x)}`;
	return str;
}
function inspect(obj, options) {
	const { truncate, multiline, ...stringifyOptions } = options ?? {};
	const prettyFormatOptions = {
		singleQuote: true,
		quoteKeys: false,
		min: true,
		spacingInner: " ",
		spacingOuter: " ",
		printBasicPrototype: false,
		compareKeys: null,
		...multiline ? {
			min: false,
			spacingInner: void 0,
			spacingOuter: void 0
		} : {}
	};
	const threshold = truncate ?? 0;
	const formatted = stringify(obj, void 0, {
		...prettyFormatOptions,
		...stringifyOptions,
		maxLength: threshold || void 0
	});
	if (threshold === 0 || formatted.length <= threshold) return formatted;
	// if stringify's adaptive maxDepth (down to 1) fails to truncate enough,
	// - for known types (e.g. string, object, array, etc), apply best effort truncation.
	// - for other values, fallback to maxDepth = 0 which should can show minimal output.
	const type = Object.prototype.toString.call(obj);
	if (typeof obj === "string") {
		let end = threshold - 1;
		if (end > 0 && isHighSurrogate(formatted[end - 1])) end = end - 1;
		return `'${formatted.slice(1, end)}…'`;
	}
	if (type === "[object Array]" || type === "[object Object]" || type === "[object Set]" || type === "[object Map]") return stringifyByMaxWidth(obj, threshold, {
		...prettyFormatOptions,
		...stringifyOptions,
		maxDepth: 1
	});
	return stringify(obj, void 0, {
		...prettyFormatOptions,
		...stringifyOptions,
		maxDepth: 0
	});
}
function truncateString(string, maxLength) {
	if (string.length <= maxLength) return string;
	let end = maxLength - 1;
	if (isHighSurrogate(string[end - 1])) end = end - 1;
	return `${string.slice(0, end)}…`;
}
function stringifyByMaxWidth(object, threshold, options) {
	function evaluate(x) {
		return stringify(object, void 0, {
			...options,
			maxWidth: x
		});
	}
	return evaluate(binarySearch(0, threshold, (x) => evaluate(x).length <= threshold));
}
// find max(x \in [x, y) | f(x) = true)
// if f(x0) is false, then returns x0.
function binarySearch(x0, x1, f) {
	while (x0 + 1 < x1) {
		const x = Math.floor((x0 + x1) / 2);
		if (f(x)) x0 = x;
		else x1 = x;
	}
	return x0;
}
// https://github.com/chaijs/loupe/pull/79
function isHighSurrogate(char) {
	return char >= "\ud800" && char <= "\udbff";
}

export { formatRegExp as a, format as f, inspect as i, stringify as s, truncateString as t };
