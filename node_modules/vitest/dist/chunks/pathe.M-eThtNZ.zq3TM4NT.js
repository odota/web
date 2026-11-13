// TODO: this is all copy pasted from Vite - can they expose a module that exports only constants?
const KNOWN_ASSET_TYPES = [
	"apng",
	"bmp",
	"png",
	"jpe?g",
	"jfif",
	"pjpeg",
	"pjp",
	"gif",
	"svg",
	"ico",
	"webp",
	"avif",
	"mp4",
	"webm",
	"ogg",
	"mp3",
	"wav",
	"flac",
	"aac",
	"woff2?",
	"eot",
	"ttf",
	"otf",
	"webmanifest",
	"pdf",
	"txt"
];
const KNOWN_ASSET_RE = new RegExp(`\\.(${KNOWN_ASSET_TYPES.join("|")})$`);
const CSS_LANGS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
/**
* Prefix for resolved Ids that are not valid browser import specifiers
*/
const VALID_ID_PREFIX = `/@id/`;
/**
* Plugins that use 'virtual modules' (e.g. for helper functions), prefix the
* module ID with `\0`, a convention from the rollup ecosystem.
* This prevents other plugins from trying to process the id (like node resolution),
* and core features like sourcemaps can use this info to differentiate between
* virtual modules and regular files.
* `\0` is not a permitted char in import URLs so we have to replace them during
* import analysis. The id will be decoded back before entering the plugins pipeline.
* These encoded virtual ids are also prefixed by the VALID_ID_PREFIX, so virtual
* modules in the browser end up encoded as `/@id/__x00__{id}`
*/
const NULL_BYTE_PLACEHOLDER = `__x00__`;

/**
* Get original stacktrace without source map support the most performant way.
* - Create only 1 stack frame.
* - Rewrite prepareStackTrace to bypass "support-stack-trace" (usually takes ~250ms).
*/
function createSimpleStackTrace(options) {
	const { message = "$$stack trace error", stackTraceLimit = 1 } = options || {};
	const limit = Error.stackTraceLimit;
	const prepareStackTrace = Error.prepareStackTrace;
	Error.stackTraceLimit = stackTraceLimit;
	Error.prepareStackTrace = (e) => e.stack;
	const stackTrace = new Error(message).stack || "";
	Error.prepareStackTrace = prepareStackTrace;
	Error.stackTraceLimit = limit;
	return stackTrace;
}
function notNullish(v) {
	return v != null;
}
function assertTypes(value, name, types) {
	const receivedType = typeof value;
	if (!types.includes(receivedType)) throw new TypeError(`${name} value must be ${types.join(" or ")}, received "${receivedType}"`);
}
function isPrimitive(value) {
	return value === null || typeof value !== "function" && typeof value !== "object";
}
function slash(path) {
	return path.replace(/\\/g, "/");
}
const postfixRE = /[?#].*$/;
function cleanUrl(url) {
	return url.replace(postfixRE, "");
}
function splitFileAndPostfix(path) {
	const file = cleanUrl(path);
	return {
		file,
		postfix: path.slice(file.length)
	};
}
const externalRE = /^(?:[a-z]+:)?\/\//;
const isExternalUrl = (url) => externalRE.test(url);
/**
* Prepend `/@id/` and replace null byte so the id is URL-safe.
* This is prepended to resolved ids that are not valid browser
* import specifiers by the importAnalysis plugin.
*/
function wrapId(id) {
	return id.startsWith(VALID_ID_PREFIX) ? id : VALID_ID_PREFIX + id.replace("\0", NULL_BYTE_PLACEHOLDER);
}
/**
* Undo {@link wrapId}'s `/@id/` and null byte replacements.
*/
function unwrapId(id) {
	return id.startsWith(VALID_ID_PREFIX) ? id.slice(VALID_ID_PREFIX.length).replace(NULL_BYTE_PLACEHOLDER, "\0") : id;
}
function withTrailingSlash(path) {
	if (path.at(-1) !== "/") return `${path}/`;
	return path;
}
function filterOutComments(s) {
	const result = [];
	let commentState = "none";
	for (let i = 0; i < s.length; ++i) if (commentState === "singleline") {
		if (s[i] === "\n") commentState = "none";
	} else if (commentState === "multiline") {
		if (s[i - 1] === "*" && s[i] === "/") commentState = "none";
	} else if (commentState === "none") {
		if (s[i] === "/" && s[i + 1] === "/") commentState = "singleline";
		else if (s[i] === "/" && s[i + 1] === "*") {
			commentState = "multiline";
			i += 2;
		} else result.push(s[i]);
	}
	return result.join("");
}
const bareImportRE = /^(?![a-z]:)[\w@](?!.*:\/\/)/i;
function isBareImport(id) {
	return bareImportRE.test(id);
}
function toArray(array) {
	array ??= [];
	if (Array.isArray(array)) return array;
	return [array];
}
function isObject(item) {
	return item != null && typeof item === "object" && !Array.isArray(item);
}
function isFinalObj(obj) {
	return obj === Object.prototype || obj === Function.prototype || obj === RegExp.prototype;
}
function getType(value) {
	return Object.prototype.toString.apply(value).slice(8, -1);
}
function collectOwnProperties(obj, collector) {
	const collect = typeof collector === "function" ? collector : (key) => collector.add(key);
	Object.getOwnPropertyNames(obj).forEach(collect);
	Object.getOwnPropertySymbols(obj).forEach(collect);
}
function getOwnProperties(obj) {
	const ownProps = /* @__PURE__ */ new Set();
	if (isFinalObj(obj)) return [];
	collectOwnProperties(obj, ownProps);
	return Array.from(ownProps);
}
const defaultCloneOptions = { forceWritable: false };
function deepClone(val, options = defaultCloneOptions) {
	return clone(val, /* @__PURE__ */ new WeakMap(), options);
}
function clone(val, seen, options = defaultCloneOptions) {
	let k, out;
	if (seen.has(val)) return seen.get(val);
	if (Array.isArray(val)) {
		out = Array.from({ length: k = val.length });
		seen.set(val, out);
		while (k--) out[k] = clone(val[k], seen, options);
		return out;
	}
	if (Object.prototype.toString.call(val) === "[object Object]") {
		out = Object.create(Object.getPrototypeOf(val));
		seen.set(val, out);
		// we don't need properties from prototype
		const props = getOwnProperties(val);
		for (const k of props) {
			const descriptor = Object.getOwnPropertyDescriptor(val, k);
			if (!descriptor) continue;
			const cloned = clone(val[k], seen, options);
			if (options.forceWritable) Object.defineProperty(out, k, {
				enumerable: descriptor.enumerable,
				configurable: true,
				writable: true,
				value: cloned
			});
			else if ("get" in descriptor) Object.defineProperty(out, k, {
				...descriptor,
				get() {
					return cloned;
				}
			});
			else Object.defineProperty(out, k, {
				...descriptor,
				value: cloned
			});
		}
		return out;
	}
	return val;
}
function noop() {}
function objectAttr(source, path, defaultValue = void 0) {
	// a[3].b -> a.3.b
	const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
	let result = source;
	for (const p of paths) {
		result = new Object(result)[p];
		if (result === void 0) return defaultValue;
	}
	return result;
}
function createDefer() {
	let resolve = null;
	let reject = null;
	const p = new Promise((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	});
	p.resolve = resolve;
	p.reject = reject;
	return p;
}
/**
* If code starts with a function call, will return its last index, respecting arguments.
* This will return 25 - last ending character of toMatch ")"
* Also works with callbacks
* ```
* toMatch({ test: '123' });
* toBeAliased('123')
* ```
*/
function getCallLastIndex(code) {
	let charIndex = -1;
	let inString = null;
	let startedBracers = 0;
	let endedBracers = 0;
	let beforeChar = null;
	while (charIndex <= code.length) {
		beforeChar = code[charIndex];
		charIndex++;
		const char = code[charIndex];
		if ((char === "\"" || char === "'" || char === "`") && beforeChar !== "\\") {
			if (inString === char) inString = null;
			else if (!inString) inString = char;
		}
		if (!inString) {
			if (char === "(") startedBracers++;
			if (char === ")") endedBracers++;
		}
		if (startedBracers && endedBracers && startedBracers === endedBracers) return charIndex;
	}
	return null;
}
function isNegativeNaN(val) {
	if (!Number.isNaN(val)) return false;
	const f64 = /* @__PURE__ */ new Float64Array(1);
	f64[0] = val;
	return new Uint32Array(f64.buffer)[1] >>> 31 === 1;
}
function toString(v) {
	return Object.prototype.toString.call(v);
}
function isPlainObject(val) {
	return toString(val) === "[object Object]" && (!val.constructor || val.constructor.name === "Object");
}
function isMergeableObject(item) {
	return isPlainObject(item) && !Array.isArray(item);
}
function ordinal(i) {
	const j = i % 10;
	const k = i % 100;
	if (j === 1 && k !== 11) return `${i}st`;
	if (j === 2 && k !== 12) return `${i}nd`;
	if (j === 3 && k !== 13) return `${i}rd`;
	return `${i}th`;
}
/**
* Deep merge :P
*
* Will merge objects only if they are plain
*
* Do not merge types - it is very expensive and usually it's better to case a type here
*/
function deepMerge(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();
	if (source === void 0) return target;
	if (isMergeableObject(target) && isMergeableObject(source)) Object.keys(source).forEach((key) => {
		if (key === "__proto__" || key === "constructor" || key === "prototype") return;
		const _source = source;
		if (isMergeableObject(_source[key])) {
			if (!target[key]) target[key] = {};
			deepMerge(target[key], _source[key]);
		} else target[key] = _source[key];
	});
	return deepMerge(target, ...sources);
}
function unique(array) {
	return Array.from(new Set(array));
}
function sanitizeFilePath(s) {
	// oxlint-disable-next-line no-control-regex
	return s.replace(/[\x00-\x2C\x2E\x2F\x3A-\x40\x5B-\x60\x7B-\x7F]+/g, "-");
}

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}

const _UNC_REGEX = /^[/\\]{2}/;
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
const _EXTNAME_RE = /.(\.[^./]+|\.)$/;
const normalize = function(path) {
  if (path.length === 0) {
    return ".";
  }
  path = normalizeWindowsPath(path);
  const isUNCPath = path.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path);
  const trailingSeparator = path[path.length - 1] === "/";
  path = normalizeString(path, !isPathAbsolute);
  if (path.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path += "/";
  }
  if (_DRIVE_LETTER_RE.test(path)) {
    path += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path}`;
    }
    return `//${path}`;
  }
  return isPathAbsolute && !isAbsolute(path) ? `/${path}` : path;
};
const join = function(...segments) {
  let path = "";
  for (const seg of segments) {
    if (!seg) {
      continue;
    }
    if (path.length > 0) {
      const pathTrailing = path[path.length - 1] === "/";
      const segLeading = seg[0] === "/";
      const both = pathTrailing && segLeading;
      if (both) {
        path += seg.slice(1);
      } else {
        path += pathTrailing || segLeading ? seg : `/${seg}`;
      }
    } else {
      path += seg;
    }
  }
  return normalize(path);
};
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const extname = function(p) {
  if (p === "..") return "";
  const match = _EXTNAME_RE.exec(normalizeWindowsPath(p));
  return match && match[1] || "";
};
const relative = function(from, to) {
  const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
const basename = function(p, extension) {
  const segments = normalizeWindowsPath(p).split("/");
  let lastSegment = "";
  for (let i = segments.length - 1; i >= 0; i--) {
    const val = segments[i];
    if (val) {
      lastSegment = val;
      break;
    }
  }
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};

export { unique as A, objectAttr as B, CSS_LANGS_RE as C, noop as D, createSimpleStackTrace as E, sanitizeFilePath as F, deepMerge as G, withTrailingSlash as H, wrapId as I, isExternalUrl as J, KNOWN_ASSET_TYPES as K, unwrapId as L, relative as a, basename as b, cleanUrl as c, dirname as d, createDefer as e, isObject as f, getType as g, getCallLastIndex as h, isAbsolute as i, join as j, extname as k, KNOWN_ASSET_RE as l, splitFileAndPostfix as m, normalize as n, isBareImport as o, isPrimitive as p, notNullish as q, resolve as r, slash as s, toArray as t, deepClone as u, getOwnProperties as v, filterOutComments as w, ordinal as x, assertTypes as y, isNegativeNaN as z };
