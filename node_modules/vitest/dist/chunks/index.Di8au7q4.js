import { promises, existsSync, mkdirSync, writeFileSync, linkSync, renameSync, rmSync, chmodSync, readFileSync, statfsSync, realpathSync, statSync, readdirSync } from 'node:fs';
import url, { pathToFileURL, fileURLToPath } from 'node:url';
import { c as cleanUrl, r as resolve, k as extname, d as dirname, j as join, l as KNOWN_ASSET_RE, H as withTrailingSlash, I as wrapId, i as isAbsolute, J as isExternalUrl, L as unwrapId, a as relative, A as unique, s as slash, t as toArray, b as basename, p as isPrimitive, n as normalize, G as deepMerge, e as createDefer, u as deepClone } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { N as NativeModuleRunner, i as isPackageExists, r as resolveModule } from './nativeModuleRunner.9xPIMzi7.js';
import { glob, isDynamicPattern } from 'tinyglobby';
import { $ } from './tinyrainbow.Do8I1XRG.js';
import * as vite from 'vite';
import { createServer, normalizePath, isFileLoadingAllowed, fetchModule, parseAst, searchForWorkspaceRoot, version, isRunnableDevEnvironment, mergeConfig, resolveConfig as resolveConfig$1 } from 'vite';
import { a as defaultPort, c as configFiles, d as defaultBrowserPort, b as defaultInspectPort } from './constants.DLYM6cZY.js';
import { c as configDefaults, e as benchmarkConfigDefaults } from './defaults.B1FCaFfh.js';
import { b as isWindows, i as isForceColor, a as isTTY } from './env.BKKtU2WC.js';
import * as os from 'node:os';
import os__default, { availableParallelism, homedir, tmpdir } from 'node:os';
import crypto from 'node:crypto';
import { isBuiltin, builtinModules, createRequire } from 'node:module';
import { rootDir, distDir } from '../path.js';
import { i as isBuiltin$1, a as isBrowserExternal, t as toBuiltin } from './modules.BJuCwlRJ.js';
import MagicString from 'magic-string';
import { findMockRedirect, hoistMocksPlugin, automockPlugin } from '@vitest/mocker/node';
import { Console } from 'node:console';
import { Writable } from 'node:stream';
import { stripVTControlCharacters } from 'node:util';
import { i as inspect } from './display.BlTmubjj.js';
import { performance as performance$1 } from 'node:perf_hooks';
import { T as TraceMap, o as originalPositionFor, i as generatedPositionFor, j as eachMapping, k as stackIgnorePatterns, e as parseErrorStacktrace } from './source-map.DakdQc29.js';
import { x } from 'tinyexec';
import { C as validateTags, A as limitConcurrency, D as shuffle } from './run.CjdgFZiW.js';
import { createDebug } from 'obug';
import { createFileTask as createFileTask$1, createTaskName, calculateSuiteHash, convertTasksToEvents, hasFailed, generateFileHash } from '../task-utils.js';
import { readFile, mkdir, writeFile, rm, stat } from 'node:fs/promises';
import { l as lookupPackageScopeType } from './resolver.BzpmeQeT.js';
import * as esModuleLexer from 'es-module-lexer';
import { ssrImportKey, ssrModuleExportsKey, ssrExportAllKey, ssrImportMetaKey, ModuleRunner } from 'vite/module-runner';
import path, { resolve as resolve$1 } from 'node:path';
import { p as positionToOffset, l as lineSplitRE } from './offset.Dy-5Fdfn.js';
import { k as errorBanner, c as F_POINTER, l as divider, q as truncateString, w as withLabel, e as formatProjectName } from './utils.BBk_icFG.js';
import { VitestModuleEvaluator } from '#module-evaluator';
import pm from 'picomatch';
import { t as trackNativeImports, c as collectDependencies, n as nativeImports, g as getEvaluatedImports } from './module-dependencies._2Eei3FO.js';
import { g as getCoverageFilesDirectory } from './coverage.jGCktcGP.js';
import { isAgent, isCI, provider } from 'std-env';
import process$1 from 'node:process';
import { isatty } from 'node:tty';
import EventEmitter$1, { EventEmitter } from 'node:events';
import { c as createBirpc } from './index.DmDMHCg8.js';
import { fork } from 'node:child_process';
import { Worker } from 'node:worker_threads';
import { v as version$1 } from './cac.BYbt0aJp.js';
import { g as getDefaultExportFromCjs } from './index.D0heQG4v.js';
import require$$0 from 'readline';
import require$$0$1 from 'events';

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
      if (k !== 'default' && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  });
  return Object.freeze(n);
}

// port from nanoid
// https://github.com/ai/nanoid
const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
function nanoid(size = 21) {
	let id = "";
	let i = size;
	while (i--) id += urlAlphabet[Math.random() * 64 | 0];
	return id;
}

/// <reference types="../types/index.d.ts" />

// (c) 2020-present Andrea Giammarchi

const {parse: $parse, stringify: $stringify} = JSON;
const {keys} = Object;

const Primitive = String;   // it could be Number
const primitive = 'string'; // it could be 'number'

const ignore$1 = {};
const object = 'object';

const noop = (_, value) => value;

const primitives = value => (
  value instanceof Primitive ? Primitive(value) : value
);

const Primitives = (_, value) => (
  typeof value === primitive ? new Primitive(value) : value
);

const resolver = (input, lazy, parsed, $) => output => {
  for (let ke = keys(output), {length} = ke, y = 0; y < length; y++) {
    const k = ke[y];
    const value = output[k];
    if (value instanceof Primitive) {
      const tmp = input[+value];
      if (typeof tmp === object && !parsed.has(tmp)) {
        parsed.add(tmp);
        output[k] = ignore$1;
        lazy.push({ o: output, k, r: tmp });
      }
      else
        output[k] = $.call(output, k, tmp);
    }
    else if (output[k] !== ignore$1)
      output[k] = $.call(output, k, value);
  }
  return output;
};

const set = (known, input, value) => {
  const index = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
};

/**
 * Converts a specialized flatted string into a JS value.
 * @param {string} text
 * @param {(this: any, key: string, value: any) => any} [reviver]
 * @returns {any}
 */
const parse = (text, reviver) => {
  const input = $parse(text, Primitives).map(primitives);
  const $ = reviver || noop;

  let value = input[0];

  if (typeof value === object && value) {
    const lazy = [];
    const revive = resolver(input, lazy, new Set, $);
    value = revive(value);

    let i = 0;
    while (i < lazy.length) {
      // it could be a lazy.shift() but that's costly
      const {o, k, r} = lazy[i++];
      o[k] = $.call(o, k, revive(r));
    }
  }

  return $.call({'': value}, '', value);
};

/**
 * Converts a JS value into a specialized flatted string.
 * @param {any} value
 * @param {((this: any, key: string, value: any) => any) | (string | number)[] | null | undefined} [replacer]
 * @param {string | number | undefined} [space]
 * @returns {string}
 */
const stringify = (value, replacer, space) => {
  const $ = replacer && typeof replacer === object ?
            (k, v) => (k === '' || -1 < replacer.indexOf(k) ? v : void 0) :
            (replacer || noop);
  const known = new Map;
  const input = [];
  const output = [];
  let i = +set(known, input, $.call({'': value}, '', value));
  let firstRun = !i;
  while (i < input.length) {
    firstRun = true;
    output[i] = $stringify(input[i++], replace, space);
  }
  return '[' + output.join(',') + ']';
  function replace(key, value) {
    if (firstRun) {
      firstRun = !firstRun;
      return value;
    }
    const after = $.call(this, key, value);
    switch (typeof after) {
      case object:
        if (after === null) return after;
      case primitive:
        return known.get(after) || set(known, input, after);
    }
    return after;
  }
};

async function createViteServer(inlineConfig) {
	// Vite prints an error (https://github.com/vitejs/vite/issues/14328)
	// But Vitest works correctly either way
	const error = console.error;
	console.error = (...args) => {
		if (typeof args[0] === "string" && args[0].includes("WebSocket server error:")) return;
		error(...args);
	};
	const server = await createServer(inlineConfig);
	console.error = error;
	return server;
}
function isFileServingAllowed(configOrUrl, urlOrServer) {
	const config = typeof urlOrServer === "string" ? configOrUrl : urlOrServer.config;
	const url = typeof urlOrServer === "string" ? urlOrServer : configOrUrl;
	if (!config.server.fs.strict) return true;
	const filePath = fsPathFromUrl(url);
	return isFileLoadingAllowed(config, filePath);
}
const FS_PREFIX = "/@fs/";
const VOLUME_RE = /^[A-Z]:/i;
function fsPathFromId(id) {
	const fsPath = normalizePath(id.startsWith(FS_PREFIX) ? id.slice(5) : id);
	return fsPath[0] === "/" || VOLUME_RE.test(fsPath) ? fsPath : `/${fsPath}`;
}
function fsPathFromUrl(url) {
	return fsPathFromId(cleanUrl(url));
}

// AST walker module for ESTree compatible trees


// An ancestor walk keeps an array of ancestor nodes (including the
// current node) and passes them to the callback as third parameter
// (and also as state parameter when no other state is present).
function ancestor(node, visitors, baseVisitor, state, override) {
  var ancestors = [];
  if (!baseVisitor) { baseVisitor = base
  ; }(function c(node, st, override) {
    var type = override || node.type;
    var isNew = node !== ancestors[ancestors.length - 1];
    if (isNew) { ancestors.push(node); }
    visitNode(baseVisitor, type, node, st, c);
    if (visitors[type]) { visitors[type](node, st || ancestors, ancestors); }
    if (isNew) { ancestors.pop(); }
  })(node, state, override);
}

function skipThrough(node, st, c) { c(node, st); }
function ignore(_node, _st, _c) {}

function visitNode(baseVisitor, type, node, st, c) {
  if (baseVisitor[type] == null) { throw new Error(("No walker function defined for node type " + type)) }
  baseVisitor[type](node, st, c);
}

// Node walkers.

var base = {};

base.Program = base.BlockStatement = base.StaticBlock = function (node, st, c) {
  for (var i = 0, list = node.body; i < list.length; i += 1)
    {
    var stmt = list[i];

    c(stmt, st, "Statement");
  }
};
base.Statement = skipThrough;
base.EmptyStatement = ignore;
base.ExpressionStatement = base.ParenthesizedExpression = base.ChainExpression =
  function (node, st, c) { return c(node.expression, st, "Expression"); };
base.IfStatement = function (node, st, c) {
  c(node.test, st, "Expression");
  c(node.consequent, st, "Statement");
  if (node.alternate) { c(node.alternate, st, "Statement"); }
};
base.LabeledStatement = function (node, st, c) { return c(node.body, st, "Statement"); };
base.BreakStatement = base.ContinueStatement = ignore;
base.WithStatement = function (node, st, c) {
  c(node.object, st, "Expression");
  c(node.body, st, "Statement");
};
base.SwitchStatement = function (node, st, c) {
  c(node.discriminant, st, "Expression");
  for (var i = 0, list = node.cases; i < list.length; i += 1) {
    var cs = list[i];

    c(cs, st);
  }
};
base.SwitchCase = function (node, st, c) {
  if (node.test) { c(node.test, st, "Expression"); }
  for (var i = 0, list = node.consequent; i < list.length; i += 1)
    {
    var cons = list[i];

    c(cons, st, "Statement");
  }
};
base.ReturnStatement = base.YieldExpression = base.AwaitExpression = function (node, st, c) {
  if (node.argument) { c(node.argument, st, "Expression"); }
};
base.ThrowStatement = base.SpreadElement =
  function (node, st, c) { return c(node.argument, st, "Expression"); };
base.TryStatement = function (node, st, c) {
  c(node.block, st, "Statement");
  if (node.handler) { c(node.handler, st); }
  if (node.finalizer) { c(node.finalizer, st, "Statement"); }
};
base.CatchClause = function (node, st, c) {
  if (node.param) { c(node.param, st, "Pattern"); }
  c(node.body, st, "Statement");
};
base.WhileStatement = base.DoWhileStatement = function (node, st, c) {
  c(node.test, st, "Expression");
  c(node.body, st, "Statement");
};
base.ForStatement = function (node, st, c) {
  if (node.init) { c(node.init, st, "ForInit"); }
  if (node.test) { c(node.test, st, "Expression"); }
  if (node.update) { c(node.update, st, "Expression"); }
  c(node.body, st, "Statement");
};
base.ForInStatement = base.ForOfStatement = function (node, st, c) {
  c(node.left, st, "ForInit");
  c(node.right, st, "Expression");
  c(node.body, st, "Statement");
};
base.ForInit = function (node, st, c) {
  if (node.type === "VariableDeclaration") { c(node, st); }
  else { c(node, st, "Expression"); }
};
base.DebuggerStatement = ignore;

base.FunctionDeclaration = function (node, st, c) { return c(node, st, "Function"); };
base.VariableDeclaration = function (node, st, c) {
  for (var i = 0, list = node.declarations; i < list.length; i += 1)
    {
    var decl = list[i];

    c(decl, st);
  }
};
base.VariableDeclarator = function (node, st, c) {
  c(node.id, st, "Pattern");
  if (node.init) { c(node.init, st, "Expression"); }
};

base.Function = function (node, st, c) {
  if (node.id) { c(node.id, st, "Pattern"); }
  for (var i = 0, list = node.params; i < list.length; i += 1)
    {
    var param = list[i];

    c(param, st, "Pattern");
  }
  c(node.body, st, node.expression ? "Expression" : "Statement");
};

base.Pattern = function (node, st, c) {
  if (node.type === "Identifier")
    { c(node, st, "VariablePattern"); }
  else if (node.type === "MemberExpression")
    { c(node, st, "MemberPattern"); }
  else
    { c(node, st); }
};
base.VariablePattern = ignore;
base.MemberPattern = skipThrough;
base.RestElement = function (node, st, c) { return c(node.argument, st, "Pattern"); };
base.ArrayPattern = function (node, st, c) {
  for (var i = 0, list = node.elements; i < list.length; i += 1) {
    var elt = list[i];

    if (elt) { c(elt, st, "Pattern"); }
  }
};
base.ObjectPattern = function (node, st, c) {
  for (var i = 0, list = node.properties; i < list.length; i += 1) {
    var prop = list[i];

    if (prop.type === "Property") {
      if (prop.computed) { c(prop.key, st, "Expression"); }
      c(prop.value, st, "Pattern");
    } else if (prop.type === "RestElement") {
      c(prop.argument, st, "Pattern");
    }
  }
};

base.Expression = skipThrough;
base.ThisExpression = base.Super = base.MetaProperty = ignore;
base.ArrayExpression = function (node, st, c) {
  for (var i = 0, list = node.elements; i < list.length; i += 1) {
    var elt = list[i];

    if (elt) { c(elt, st, "Expression"); }
  }
};
base.ObjectExpression = function (node, st, c) {
  for (var i = 0, list = node.properties; i < list.length; i += 1)
    {
    var prop = list[i];

    c(prop, st);
  }
};
base.FunctionExpression = base.ArrowFunctionExpression = base.FunctionDeclaration;
base.SequenceExpression = function (node, st, c) {
  for (var i = 0, list = node.expressions; i < list.length; i += 1)
    {
    var expr = list[i];

    c(expr, st, "Expression");
  }
};
base.TemplateLiteral = function (node, st, c) {
  for (var i = 0, list = node.quasis; i < list.length; i += 1)
    {
    var quasi = list[i];

    c(quasi, st);
  }

  for (var i$1 = 0, list$1 = node.expressions; i$1 < list$1.length; i$1 += 1)
    {
    var expr = list$1[i$1];

    c(expr, st, "Expression");
  }
};
base.TemplateElement = ignore;
base.UnaryExpression = base.UpdateExpression = function (node, st, c) {
  c(node.argument, st, "Expression");
};
base.BinaryExpression = base.LogicalExpression = function (node, st, c) {
  c(node.left, st, "Expression");
  c(node.right, st, "Expression");
};
base.AssignmentExpression = base.AssignmentPattern = function (node, st, c) {
  c(node.left, st, "Pattern");
  c(node.right, st, "Expression");
};
base.ConditionalExpression = function (node, st, c) {
  c(node.test, st, "Expression");
  c(node.consequent, st, "Expression");
  c(node.alternate, st, "Expression");
};
base.NewExpression = base.CallExpression = function (node, st, c) {
  c(node.callee, st, "Expression");
  if (node.arguments)
    { for (var i = 0, list = node.arguments; i < list.length; i += 1)
      {
        var arg = list[i];

        c(arg, st, "Expression");
      } }
};
base.MemberExpression = function (node, st, c) {
  c(node.object, st, "Expression");
  if (node.computed) { c(node.property, st, "Expression"); }
};
base.ExportNamedDeclaration = base.ExportDefaultDeclaration = function (node, st, c) {
  if (node.declaration)
    { c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression"); }
  if (node.source) { c(node.source, st, "Expression"); }
  if (node.attributes)
    { for (var i = 0, list = node.attributes; i < list.length; i += 1)
      {
        var attr = list[i];

        c(attr, st);
      } }
};
base.ExportAllDeclaration = function (node, st, c) {
  if (node.exported)
    { c(node.exported, st); }
  c(node.source, st, "Expression");
  if (node.attributes)
    { for (var i = 0, list = node.attributes; i < list.length; i += 1)
      {
        var attr = list[i];

        c(attr, st);
      } }
};
base.ImportAttribute = function (node, st, c) {
  c(node.value, st, "Expression");
};
base.ImportDeclaration = function (node, st, c) {
  for (var i = 0, list = node.specifiers; i < list.length; i += 1)
    {
    var spec = list[i];

    c(spec, st);
  }
  c(node.source, st, "Expression");
  if (node.attributes)
    { for (var i$1 = 0, list$1 = node.attributes; i$1 < list$1.length; i$1 += 1)
      {
        var attr = list$1[i$1];

        c(attr, st);
      } }
};
base.ImportExpression = function (node, st, c) {
  c(node.source, st, "Expression");
  if (node.options) { c(node.options, st, "Expression"); }
};
base.ImportSpecifier = base.ImportDefaultSpecifier = base.ImportNamespaceSpecifier = base.Identifier = base.PrivateIdentifier = base.Literal = ignore;

base.TaggedTemplateExpression = function (node, st, c) {
  c(node.tag, st, "Expression");
  c(node.quasi, st, "Expression");
};
base.ClassDeclaration = base.ClassExpression = function (node, st, c) { return c(node, st, "Class"); };
base.Class = function (node, st, c) {
  if (node.id) { c(node.id, st, "Pattern"); }
  if (node.superClass) { c(node.superClass, st, "Expression"); }
  c(node.body, st);
};
base.ClassBody = function (node, st, c) {
  for (var i = 0, list = node.body; i < list.length; i += 1)
    {
    var elt = list[i];

    c(elt, st);
  }
};
base.MethodDefinition = base.PropertyDefinition = base.Property = function (node, st, c) {
  if (node.computed) { c(node.key, st, "Expression"); }
  if (node.value) { c(node.value, st, "Expression"); }
};

function groupBy(collection, iteratee) {
	return collection.reduce((acc, item) => {
		const key = iteratee(item);
		acc[key] ||= [];
		acc[key].push(item);
		return acc;
	}, {});
}
function stdout() {
	// @ts-expect-error Node.js maps process.stdout to console._stdout
	// oxlint-disable-next-line no-console
	return console._stdout || process.stdout;
}
function escapeRegExp(s) {
	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function wildcardPatternToRegExp(pattern) {
	return new RegExp(`^${pattern.split("*").map(escapeRegExp).join(".*")}$`, "i");
}
function createIndexLocationsMap(source) {
	const map = /* @__PURE__ */ new Map();
	let index = 0;
	let line = 1;
	let column = 1;
	for (const char of source) {
		map.set(index++, {
			line,
			column
		});
		if (char === "\n" || char === "\r\n") {
			line++;
			column = 0;
		} else column++;
	}
	return map;
}
function createLocationsIndexMap(source) {
	const map = /* @__PURE__ */ new Map();
	let index = 0;
	let line = 1;
	let column = 1;
	for (const char of source) {
		map.set(`${line}:${column}`, index++);
		if (char === "\n" || char === "\r\n") {
			line++;
			column = 0;
		} else column++;
	}
	return map;
}

function createDebugger(namespace) {
	const debug = createDebug(namespace);
	if (debug.enabled) return debug;
}

async function getSpecificationsOptions(specifications) {
	const environments = /* @__PURE__ */ new WeakMap();
	const tags = /* @__PURE__ */ new WeakMap();
	// reuse if projects have the same test files
	const files = /* @__PURE__ */ new Map();
	await Promise.all(specifications.map(async (spec) => {
		// browser pool handles its own environment
		if (spec.pool === "browser") return;
		const docblock = await getSpecificationDocblock(spec, files);
		tags.set(spec, docblock.tags);
		environments.set(spec, docblock.environment);
	}));
	return {
		environments,
		tags
	};
}
async function getSpecificationDocblock(spec, files) {
	if (spec._docblock) return spec._docblock;
	const filepath = spec.moduleId;
	let code = files?.get(filepath);
	if (!code) {
		code = promises.readFile(filepath, "utf-8").catch(() => "");
		files?.set(filepath, code);
	}
	const { env = spec.project.config.environment || "node", envOptions, tags = [] } = detectCodeBlock(await code);
	spec._docblock = {
		environment: {
			name: env,
			options: envOptions ? { [env === "happy-dom" ? "happyDOM" : env]: envOptions } : null
		},
		tags
	};
	return spec._docblock;
}
function detectCodeBlock(content) {
	const env = content.match(/@(?:vitest|jest)-environment\s+([\w-]+)\b/)?.[1];
	let envOptionsJson = content.match(/@(?:vitest|jest)-environment-options\s+(.+)/)?.[1];
	if (envOptionsJson?.endsWith("*/"))
 // Trim closing Docblock characters the above regex might have captured
	envOptionsJson = envOptionsJson.slice(0, -2);
	const envOptions = JSON.parse(envOptionsJson || "null");
	const tags = [];
	let tagMatch;
	// oxlint-disable-next-line no-cond-assign
	while (tagMatch = content.match(/(\/\/|\*)\s*@module-tag\s+([\w\-/]+)\b/)) {
		tags.push(tagMatch[2]);
		content = content.slice(tagMatch.index + tagMatch[0].length);
	}
	return {
		env,
		envOptions,
		tags
	};
}

const hash = crypto.hash ?? ((algorithm, data, outputEncoding) => crypto.createHash(algorithm).update(data).digest(outputEncoding));

class VitestResolver {
	options;
	externalizeConcurrentCache = /* @__PURE__ */ new Map();
	externalizeCache = /* @__PURE__ */ new Map();
	constructor(cacheDir, config) {
		// sorting to make cache consistent
		const inline = config.server.deps?.inline;
		if (Array.isArray(inline)) inline.sort();
		const external = config.server.deps?.external;
		if (Array.isArray(external)) external.sort();
		this.options = {
			moduleDirectories: config.deps.moduleDirectories?.sort(),
			inlineFiles: config.setupFiles.flatMap((file) => {
				if (file.startsWith("file://")) return file;
				const resolvedId = resolve(file);
				return [resolvedId, pathToFileURL(resolvedId).href];
			}),
			cacheDir,
			inline,
			external
		};
	}
	wasExternalized(file) {
		const normalizedFile = normalizeId(file);
		if (!this.externalizeCache.has(normalizedFile)) return false;
		return this.externalizeCache.get(normalizedFile) ?? false;
	}
	async shouldExternalize(file) {
		const normalizedFile = normalizeId(file);
		if (this.externalizeCache.has(normalizedFile)) return this.externalizeCache.get(normalizedFile);
		return shouldExternalize(normalizeId(file), this.options, this.externalizeConcurrentCache).then((result) => {
			this.externalizeCache.set(normalizedFile, result);
			return result;
		}).finally(() => {
			this.externalizeConcurrentCache.delete(normalizedFile);
		});
	}
}
function normalizeId(id) {
	if (id.startsWith("/@fs/")) id = id.slice(isWindows ? 5 : 4);
	return id;
}
const BUILTIN_EXTENSIONS = /* @__PURE__ */ new Set([
	".mjs",
	".cjs",
	".node",
	".wasm"
]);
const ESM_EXT_RE = /\.(es|esm|esm-browser|esm-bundler|es6|module)\.js$/;
const ESM_FOLDER_RE = /\/(es|esm)\/(.*\.js)$/;
const defaultInline = [
	/virtual:/,
	/\.[mc]?ts$/,
	/[?&](init|raw|url|inline)\b/,
	KNOWN_ASSET_RE,
	/^(?!.*node_modules).*\.mjs$/,
	/^(?!.*node_modules).*\.cjs\.js$/,
	/vite\w*\/dist\/client\/env.mjs/
];
const depsExternal = [/\/node_modules\/.*\.cjs\.js$/, /\/node_modules\/.*\.mjs$/];
function guessCJSversion(id) {
	if (ESM_EXT_RE.test(id)) {
		for (const i of [
			id.replace(ESM_EXT_RE, ".mjs"),
			id.replace(ESM_EXT_RE, ".umd.js"),
			id.replace(ESM_EXT_RE, ".cjs.js"),
			id.replace(ESM_EXT_RE, ".js")
		]) if (existsSync(i)) return i;
	}
	if (ESM_FOLDER_RE.test(id)) {
		for (const i of [
			id.replace(ESM_FOLDER_RE, "/umd/$1"),
			id.replace(ESM_FOLDER_RE, "/cjs/$1"),
			id.replace(ESM_FOLDER_RE, "/lib/$1"),
			id.replace(ESM_FOLDER_RE, "/$1")
		]) if (existsSync(i)) return i;
	}
}
// The code from https://github.com/unjs/mlly/blob/c5bcca0cda175921344fd6de1bc0c499e73e5dac/src/syntax.ts#L51-L98
async function isValidNodeImport(id) {
	// clean url to strip off `?v=...` query etc.
	// node can natively import files with query params, so externalizing them is safe.
	id = cleanUrl(id);
	const extension = extname(id);
	if (BUILTIN_EXTENSIONS.has(extension)) return true;
	if (extension !== ".js") return false;
	id = id.replace("file:///", "");
	if (lookupPackageScopeType(dirname(id)) === "esm") return true;
	if (/\.(?:\w+-)?esm?(?:-\w+)?\.js$|\/esm?\//.test(id)) return false;
	try {
		await esModuleLexer.init;
		const code = await promises.readFile(id, "utf8");
		const [, , , hasModuleSyntax] = esModuleLexer.parse(code);
		return !hasModuleSyntax;
	} catch {
		return false;
	}
}
const ESM_SYNTAX_MARKERS = [
	ssrImportKey,
	ssrModuleExportsKey,
	ssrExportAllKey,
	ssrImportMetaKey,
	"__vite_ssr_exportName__"
];
const CJS_GLOBALS_REFERENCE_RE = /\b(?:module|exports|require|__filename|__dirname)\b/;
// mirrors the Node.js module detection algorithm: the file extension wins,
// then the `type` field in the package scope, then the presence of
// ESM syntax. the ssr transform always rewrites static imports/exports and
// `import.meta` into `__vite_ssr_` helpers, so the transformed code is
// checked first: it reflects the compiled output (type-only imports are
// already erased), and a module without the markers cannot be an ES module.
// a marker hit is then confirmed against the lexed source because the
// transform preserves comments and strings that can mention the markers.
// dynamic imports never count because they are allowed in CommonJS modules
async function detectModuleType(file, code, loadSource) {
	if (file) {
		const filepath = cleanUrl(file);
		const extension = extname(filepath);
		if (extension === ".cjs" || extension === ".cts") return "cjs";
		if (extension === ".mjs" || extension === ".mts") return "esm";
		const scopeType = lookupPackageScopeType(dirname(filepath));
		if (scopeType !== "none") return scopeType;
	}
	if (!ESM_SYNTAX_MARKERS.some((marker) => code.includes(marker))) return "cjs";
	// a false "esm" verdict can only break modules that reference the CommonJS
	// variables, so the source is read and lexed only when both signals appear
	if (!CJS_GLOBALS_REFERENCE_RE.test(code)) return "esm";
	const source = loadSource ? await loadSource() : null;
	if (source != null) try {
		await esModuleLexer.init;
		const [, , , hasModuleSyntax] = esModuleLexer.parse(source);
		if (!hasModuleSyntax) return "cjs";
	} catch {}
	return "esm";
}
async function shouldExternalize(id, options, cache) {
	if (!cache.has(id)) cache.set(id, _shouldExternalize(id, options));
	return cache.get(id);
}
async function _shouldExternalize(id, options) {
	if (isBuiltin(id)) return id;
	// data: should be processed by native import,
	// since it is a feature of ESM.
	// also externalize network imports since nodejs allows it when --experimental-network-imports
	if (id.startsWith("data:") || /^(?:https?:)?\/\//.test(id)) return id;
	const moduleDirectories = options?.moduleDirectories || ["/node_modules/"];
	if (matchPattern(id, moduleDirectories, options?.inline)) return false;
	if (options?.inlineFiles && options?.inlineFiles.includes(id)) return false;
	if (matchPattern(id, moduleDirectories, options?.external)) return id;
	// Unless the user explicitly opted to inline them, externalize Vite deps.
	// They are too big to inline by default.
	if (options?.cacheDir && id.includes(options.cacheDir)) return id;
	const isLibraryModule = moduleDirectories.some((dir) => id.includes(dir));
	id = isLibraryModule && options?.fallbackCJS ? guessCJSversion(id) || id : id;
	if (matchPattern(id, moduleDirectories, defaultInline)) return false;
	if (matchPattern(id, moduleDirectories, depsExternal)) return id;
	if (isLibraryModule && await isValidNodeImport(id)) return id;
}
function matchPattern(id, moduleDirectories, patterns) {
	if (patterns == null) return false;
	if (patterns === true) return true;
	for (const ex of patterns) if (typeof ex === "string") {
		if (moduleDirectories.some((dir) => id.includes(join(dir, ex)))) return true;
	} else if (ex.test(id)) return true;
	return false;
}

// this is copy pasted from vite
function normalizeResolvedIdToUrl(environment, resolvedId) {
	const root = environment.config.root;
	const depsOptimizer = environment.depsOptimizer;
	let url;
	// normalize all imports into resolved URLs
	// e.g. `import 'foo'` -> `import '/@fs/.../node_modules/foo/index.js'`
	if (resolvedId.startsWith(withTrailingSlash(root)))
 // in root: infer short absolute path from root
	url = resolvedId.slice(root.length);
	else if (depsOptimizer?.isOptimizedDepFile(resolvedId) || resolvedId !== "/@react-refresh" && path.isAbsolute(resolvedId) && existsSync(cleanUrl(resolvedId)))
 // an optimized deps may not yet exists in the filesystem, or
	// a regular file exists but is out of root: rewrite to absolute /@fs/ paths
	url = path.posix.join("/@fs/", resolvedId);
	else url = resolvedId;
	// if the resolved id is not a valid browser import specifier,
	// prefix it to make it valid. We will strip this before feeding it
	// back into the transform pipeline
	if (url[0] !== "." && url[0] !== "/") url = wrapId(resolvedId);
	return url;
}

const restoringMethods = /* @__PURE__ */ new Set([
	"unmock",
	"doUnmock",
	"importActual"
]);
function getStaticMocks(environment, id, transformResult) {
	return transformResult?.__vitestStaticMocks ?? environment.pluginContainer.getModuleInfo(id)?.meta?.vitestStaticMocks;
}
/**
* Resolves the static `vi.mock` calls of `importer` and the calls that load the original module.
*/
async function resolveStaticMocks(environment, config, importer, mocks) {
	const result = {
		replaced: /* @__PURE__ */ new Set(),
		redirects: [],
		restored: /* @__PURE__ */ new Set()
	};
	if (!mocks?.length) return result;
	const resolvedIds = await Promise.all(mocks.map(async (mock) => {
		return (await environment.pluginContainer.resolveId(mock.specifier, importer).catch(() => null))?.id;
	}));
	mocks.forEach((mock, index) => {
		const id = resolvedIds[index];
		if (id && restoringMethods.has(mock.method)) result.restored.add(id);
	});
	mocks.forEach((mock, index) => {
		if (mock.method !== "mock") return;
		const id = resolvedIds[index];
		const replaces = id != null && !result.restored.has(id);
		if (mock.hasFactory) {
			if (replaces && !mock.factoryLoadsOriginal) result.replaced.add(id);
			return;
		}
		// without a factory the mock is either redirected to `__mocks__` or
		// generated from the original; options like `{ spy: true }` always use the original
		const redirect = findRedirect(config, mock.specifier, id);
		if (redirect) {
			result.redirects.push(redirect);
			if (replaces && mock.automock) result.replaced.add(id);
		}
	});
	return result;
}
// mirrors how the module mocker picks the `__mocks__` file
function findRedirect(config, specifier, resolvedId) {
	const id = resolvedId ?? specifier;
	const moduleDirectories = config.deps.moduleDirectories ?? ["/node_modules/"];
	const external = !isAbsolute(id) || moduleDirectories.some((dir) => id.includes(dir)) ? specifier : null;
	return findMockRedirect(config.root, cleanUrl(id), external, specifier);
}

const debugFs = createDebugger("vitest:cache:fs");
const saveCachePromises = /* @__PURE__ */ new Map();
const readFilePromises = /* @__PURE__ */ new Map();
class ModuleTransformService {
	resolver;
	config;
	fsCache;
	traces;
	tmpProjectDir;
	tmpDirectories = /* @__PURE__ */ new Set();
	fsCacheEnabled;
	// the module type is only needed by the evaluator to decide if CJS
	// variables should be provided to the module, so don't waste time
	// on the detection when every module receives them
	detectModuleType;
	constructor(resolver, config, fsCache, traces, tmpProjectDir) {
		this.resolver = resolver;
		this.config = config;
		this.fsCache = fsCache;
		this.traces = traces;
		this.tmpProjectDir = tmpProjectDir;
		this.fsCacheEnabled = config.fsModuleCache === true;
		this.detectModuleType = config.injectCjsGlobals === false;
	}
	async fetch(url, importer, environment, makeTmpCopies, options, otelCarrier) {
		await this.traces.waitInit();
		const context = otelCarrier ? this.traces.getContextFromCarrier(otelCarrier) : void 0;
		return this.traces.$("vitest.module.transform", context ? { context } : {}, (span) => this.fetchInSpan(span, url, importer, environment, makeTmpCopies, options));
	}
	/**
	* Transforms the module like `environment.transformRequest`, but reads and
	* populates the `fsModuleCache` when it is enabled. Returns `null` for externalized modules.
	*/
	async transform(id, environment) {
		await this.traces.waitInit();
		// the module graph keeps the url of the first request, so it has to be the url that workers import
		const url = normalizeResolvedIdToUrl(environment, id);
		const result = await this.traces.$("vitest.module.transform", (span) => this.fetchInSpan(span, url, void 0, environment));
		// externalized modules are loaded by Node without a transform, like in a normal run
		if ("externalize" in result) return null;
		if ("id" in result) {
			const transformResult = environment.moduleGraph.getModuleById(result.id)?.transformResult;
			if (transformResult) return transformResult;
		}
		return environment.transformRequest(url);
	}
	async fetchInSpan(trace, url, importer, environment, makeTmpCopies, options) {
		if (url.startsWith("data:")) {
			trace.setAttribute("vitest.module.external", url);
			return {
				externalize: url,
				type: "builtin"
			};
		}
		if (url === "/@vite/client" || url === "@vite/client") {
			trace.setAttribute("vitest.module.external", url);
			return {
				externalize: "/@vite/client",
				type: "module"
			};
		}
		const isFileUrl = url.startsWith("file://");
		if (isExternalUrl(url) && !isFileUrl) {
			trace.setAttribute("vitest.module.external", url);
			return {
				externalize: url,
				type: "network"
			};
		}
		// handle unresolved id of dynamic import skipped by Vite import analysis
		if (url[0] !== "/") {
			const resolved = await environment.pluginContainer.resolveId(url, importer);
			if (resolved) url = normalizeResolvedIdToUrl(environment, resolved.id);
		}
		const moduleGraphModule = await environment.moduleGraph.ensureEntryFromUrl(unwrapId(url));
		const cached = !!moduleGraphModule.transformResult;
		if (moduleGraphModule.file) trace.setAttribute("code.file.path", moduleGraphModule.file);
		if (options?.cached && cached) return { cache: true };
		const externalize = await this.resolver.shouldExternalize(moduleGraphModule.id);
		if (externalize) return {
			externalize,
			type: "module"
		};
		const cachePath = await this.getCachePath(environment, moduleGraphModule);
		// full fs caching is disabled, but we still want to keep tmp files if makeTmpCopies is enabled
		// this is primarily used by the forks pool to avoid using process.send(bigBuffer)
		if (cachePath == null) {
			const result = await this.fetchAndProcess(environment, url, importer, moduleGraphModule, options);
			this.recordResult(trace, result);
			if (!makeTmpCopies || !("code" in result)) return result;
			const transformResult = moduleGraphModule.transformResult;
			const tmpPath = transformResult?.__vitestTmp;
			if (typeof tmpPath === "string") return getCachedResult(result, tmpPath);
			const tmpDir = join(this.tmpProjectDir, environment.name);
			if (!this.tmpDirectories.has(tmpDir)) {
				if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true });
				this.tmpDirectories.add(tmpDir);
			}
			const tmpFile = join(tmpDir, hash("sha1", result.id, "hex"));
			return this.cacheResult(result, tmpFile, transformResult).then((result) => {
				if (transformResult) transformResult.__vitestTmp = tmpFile;
				return result;
			});
		}
		if (saveCachePromises.has(cachePath)) return saveCachePromises.get(cachePath).then((result) => {
			this.recordResult(trace, result);
			return result;
		});
		const cachedModule = await this.getCachedModule(cachePath, environment, moduleGraphModule, importer);
		if (cachedModule) {
			this.recordResult(trace, cachedModule);
			return cachedModule;
		}
		const result = await this.fetchAndProcess(environment, url, importer, moduleGraphModule, options);
		const imports = this.getCachedImports(environment, moduleGraphModule);
		const map = moduleGraphModule.transformResult?.map;
		const mappings = map && !("version" in map) && map.mappings === "";
		const coverageData = this.fsCache.getCoverageData(environment, moduleGraphModule.id);
		const cachedResult = await this.cacheResult(result, cachePath, moduleGraphModule.transformResult, imports, !!mappings, coverageData);
		// remember where the code is stored on disk so that repeat fetches and the
		// `fetchWarmModules` snapshot can point at it in this session already, not
		// only after the cache is read back in the next one
		if ("code" in result && moduleGraphModule.transformResult) moduleGraphModule.transformResult.__vitestTmp = cachePath;
		return cachedResult;
	}
	getCachedImports(environment, node) {
		const imports = {
			urls: [],
			ids: {}
		};
		node.importedModules.forEach(({ url, id }) => {
			if (id == null) return;
			imports.urls.push(url);
			if (id !== urlToId(environment, url)) imports.ids[url] = id;
		});
		return imports;
	}
	recordResult(trace, result) {
		if ("externalize" in result) trace.setAttributes({
			"vitest.fetched_module.external": result.externalize,
			"vitest.fetched_module.type": result.type
		});
		if ("id" in result) {
			trace.setAttributes({
				"vitest.fetched_module.invalidate": result.invalidate,
				"vitest.fetched_module.id": result.id,
				"vitest.fetched_module.url": result.url,
				"vitest.fetched_module.cache": false
			});
			if (result.file) trace.setAttribute("code.file.path", result.file);
		}
		if ("code" in result) trace.setAttribute("vitest.fetched_module.code_length", result.code.length);
	}
	async getCachePath(environment, moduleGraphModule) {
		if (!this.fsCacheEnabled || this.fsCache.getCacheRoot(this.config) == null) return null;
		const moduleId = moduleGraphModule.id;
		const memoryCacheKey = this.fsCache.getMemoryCachePath(environment, moduleId);
		// undefined means there is no key in memory
		// null means the file should not be cached
		if (memoryCacheKey !== void 0) return memoryCacheKey;
		const fileContent = await this.readFileContentToCache(environment, moduleGraphModule);
		return this.fsCache.generateCachePath(this.config, environment, moduleGraphModule.id, fileContent);
	}
	async readFileContentToCache(environment, moduleGraphModule) {
		if (moduleGraphModule.file && !isVirtualFile(moduleGraphModule.file)) {
			const result = await this.readFileConcurrently(moduleGraphModule.file);
			if (result != null) return result;
		}
		const loadResult = await environment.pluginContainer.load(moduleGraphModule.id);
		if (typeof loadResult === "string") return loadResult;
		if (loadResult != null) return loadResult.code;
		return "";
	}
	async getCachedModule(cachePath, environment, moduleGraphModule, importer) {
		if (moduleGraphModule.transformResult?.__vitestTmp) {
			if (!existsSync(moduleGraphModule.transformResult.__vitestTmp)) {
				debugFs?.(`cached file ${moduleGraphModule.transformResult.__vitestTmp} disappeared, re-transforming`);
				moduleGraphModule.transformResult.__vitestTmp = void 0;
				return;
			}
			return {
				cached: true,
				file: moduleGraphModule.file,
				id: moduleGraphModule.id,
				tmp: moduleGraphModule.transformResult.__vitestTmp,
				url: moduleGraphModule.url,
				invalidate: false,
				moduleType: await this.cachedModuleType(moduleGraphModule.file, moduleGraphModule.transformResult.code, moduleGraphModule.transformResult)
			};
		}
		const cachedModule = await this.fsCache.getCachedModule(cachePath);
		if (!cachedModule) return;
		const importedModules = await this.resolveCachedImports(environment, cachedModule);
		if (!importedModules) return;
		// Notify coverage provider that cached results were read
		if (cachedModule.hasCoverageData) this.fsCache.restoreCoverageData(environment, cachedModule.id, cachedModule.coverageData);
		// keep the module graph in sync
		let map = extractSourceMap(cachedModule.code);
		if (map && cachedModule.file) map.file = cachedModule.file;
		// mappings is a special source map identifier in rollup
		if (!map && cachedModule.mappings) map = { mappings: "" };
		const moduleType = cachedModule.moduleType;
		moduleGraphModule.transformResult = {
			code: cachedModule.code,
			map,
			ssr: true,
			deps: cachedModule.deps,
			dynamicDeps: cachedModule.dynamicDeps,
			__vitestTmp: cachePath,
			__vitestModuleType: moduleType,
			__vitestStaticMocks: cachedModule.staticMocks
		};
		// we populate the module graph to make the watch mode work because it relies on importers
		if (importer) {
			const environmentNode = environment.moduleGraph.getModuleById(importer);
			if (environmentNode) moduleGraphModule.importers.add(environmentNode);
		}
		for (const moduleNode of importedModules) {
			moduleNode.importers.add(moduleGraphModule);
			moduleGraphModule.importedModules.add(moduleNode);
		}
		return {
			cached: true,
			file: cachedModule.file,
			id: cachedModule.id,
			tmp: cachePath,
			url: moduleGraphModule.url,
			invalidate: false,
			moduleType
		};
	}
	// the cached code imports the urls that Vite resolved when the module was
	// transformed, so the entry is stale once any of them points elsewhere
	async resolveCachedImports(environment, cachedModule) {
		const safeModulePaths = getSafeModulePaths(environment);
		const { urls, ids } = cachedModule.imports;
		const importedModules = await Promise.all(urls.map(async (url) => {
			const id = Object.hasOwn(ids, url) ? ids[url] : urlToId(environment, url);
			const moduleNode = await environment.moduleGraph.ensureEntryFromUrl(url).catch(() => null);
			if (!moduleNode || moduleNode.id !== id || url.startsWith("/@fs/") && moduleNode.file != null && !existsSync(moduleNode.file)) {
				debugFs?.(`${$.red("[stale]")} ${cachedModule.id} imports ${url}, which no longer resolves to ${id}`);
				return null;
			}
			// import analysis marks out-of-root imports as safe to load from
			// outside `server.fs.allow`; a cached importer never goes through it
			if (url.startsWith("/@fs/") && moduleNode.file) safeModulePaths?.add(moduleNode.file);
			return moduleNode;
		}));
		const resolved = importedModules.filter((moduleNode) => moduleNode != null);
		if (resolved.length === importedModules.length) return resolved;
	}
	async fetchAndProcess(environment, url, importer, moduleGraphModule, options) {
		const result = processResultSource(environment, await fetchModule(environment, url, importer, {
			...options,
			inlineSourceMap: false
		}).catch(handleRollupError));
		if ("code" in result) result.moduleType = await this.cachedModuleType(result.file, result.code, moduleGraphModule.transformResult);
		const transformResult = moduleGraphModule.transformResult;
		if (transformResult && moduleGraphModule.id) transformResult.__vitestStaticMocks ??= getStaticMocks(environment, moduleGraphModule.id) ?? null;
		return result;
	}
	sourceLoader(file) {
		if (!file || isVirtualFile(file)) return;
		return () => this.readFileConcurrently(file);
	}
	// the module type is a pure function of the module, so detect it at most once
	// and memoize the verdict on the transform result. repeat fetches, the on-disk
	// cache (`cached`), and the `fetchWarmModules` snapshot all reuse it instead of
	// re-detecting. a no-op unless `injectCjsGlobals` is disabled — otherwise every
	// module receives the CJS globals and the type is irrelevant.
	async cachedModuleType(file, code, transformResult) {
		if (!this.detectModuleType) return;
		const moduleType = transformResult?.__vitestModuleType ?? await detectModuleType(file, code, this.sourceLoader(file));
		if (transformResult) transformResult.__vitestModuleType = moduleType;
		return moduleType;
	}
	async cacheResult(result, cachePath, transformResult, imports, mappings = false, coverageData) {
		const returnResult = "code" in result ? getCachedResult(result, cachePath) : result;
		if (saveCachePromises.has(cachePath)) return saveCachePromises.get(cachePath);
		const savePromise = this.fsCache.saveCachedModule(cachePath, result, transformResult, imports, mappings, coverageData).then(() => returnResult).catch((error) => {
			debugFs?.(`failed to cache ${cachePath}, serving it inline: ${error}`);
			return result;
		}).finally(() => {
			saveCachePromises.delete(cachePath);
		});
		saveCachePromises.set(cachePath, savePromise);
		return savePromise;
	}
	readFileConcurrently(file) {
		if (!readFilePromises.has(file)) readFilePromises.set(
			file,
			// virtual file can have a "file" property
			readFile(file, "utf-8").catch(() => null).finally(() => {
				readFilePromises.delete(file);
			})
		);
		return readFilePromises.get(file);
	}
}
// \x00 is a virtual file convention
function isVirtualFile(file) {
	return file.startsWith("\0") || file.startsWith("virtual:");
}
// inverts the url that import analysis writes for a resolved id
function urlToId(environment, url) {
	if (url.startsWith("/@fs/")) return fsPathFromId(url);
	if (url[0] === "/") return environment.config.root + url;
	return url;
}
// Vite keeps the set out of its public types
function getSafeModulePaths(environment) {
	return environment.getTopLevelConfig().safeModulePaths;
}
let SOURCEMAPPING_URL = "sourceMa";
SOURCEMAPPING_URL += "ppingURL";
const MODULE_RUNNER_SOURCEMAPPING_SOURCE = "//# sourceMappingSource=vite-generated";
function processResultSource(environment, result) {
	if (!("code" in result)) return result;
	const node = environment.moduleGraph.getModuleById(result.id);
	if (node?.transformResult)
 // this also overrides node.transformResult.code which is also what the module
	// runner does under the hood by default (we disable source maps inlining)
	inlineSourceMap(node.transformResult);
	return {
		...result,
		code: node?.transformResult?.code || result.code
	};
}
const OTHER_SOURCE_MAP_REGEXP = new RegExp(`//# ${SOURCEMAPPING_URL}=data:application/json[^,]+base64,([A-Za-z0-9+/=]+)$`, "gm");
// we have to inline the source map ourselves, because
// - we don't need //# sourceURL since we are running code in VM
//   - important in stack traces and the V8 coverage
// - we need to inject an empty line for --inspect-brk
function inlineSourceMap(result) {
	const map = result.map;
	let code = result.code;
	if (!map || !("version" in map) || code.includes(MODULE_RUNNER_SOURCEMAPPING_SOURCE)) return result;
	// to reduce the payload size, we only inline vite node source map, because it's also the only one we use
	OTHER_SOURCE_MAP_REGEXP.lastIndex = 0;
	if (OTHER_SOURCE_MAP_REGEXP.test(code)) code = code.replace(OTHER_SOURCE_MAP_REGEXP, "");
	const sourceMap = { ...map };
	// If the first line is not present on source maps, add simple 1:1 mapping ([0,0,0,0], [1,0,0,0])
	// so that debuggers can be set to break on first line
	if (sourceMap.mappings[0] === ";") sourceMap.mappings = `AAAA,CAAA${sourceMap.mappings}`;
	result.code = `${code.trimEnd()}\n${MODULE_RUNNER_SOURCEMAPPING_SOURCE}\n//# ${SOURCEMAPPING_URL}=${genSourceMapUrl(sourceMap)}\n`;
	return result;
}
function genSourceMapUrl(map) {
	if (typeof map !== "string") map = JSON.stringify(map);
	return `data:application/json;base64,${Buffer.from(map).toString("base64")}`;
}
function getCachedResult(result, tmp) {
	return {
		cached: true,
		file: result.file,
		id: result.id,
		tmp,
		url: result.url,
		invalidate: result.invalidate,
		moduleType: result.moduleType
	};
}
const MODULE_RUNNER_SOURCEMAPPING_REGEXP = new RegExp(`//# ${SOURCEMAPPING_URL}=data:application/json;base64,(.+)`);
function extractSourceMap(code) {
	const pattern = `//# ${SOURCEMAPPING_URL}=data:application/json;base64,`;
	const lastIndex = code.lastIndexOf(pattern);
	if (lastIndex === -1) return null;
	const mapString = MODULE_RUNNER_SOURCEMAPPING_REGEXP.exec(code.slice(lastIndex))?.[1];
	if (!mapString) return null;
	const sourceMap = JSON.parse(Buffer.from(mapString, "base64").toString("utf-8"));
	// remove source map mapping added by "inlineSourceMap" to keep the original behaviour of transformRequest
	if (sourceMap.mappings.startsWith("AAAA,CAAA;"))
 // 9 because we want to only remove "AAAA,CAAA", but keep ; at the start
	sourceMap.mappings = sourceMap.mappings.slice(9);
	return sourceMap;
}
// serialize rollup error on server to preserve details as a test error
function toRollupError(e) {
	if (e instanceof Error && ("plugin" in e || "frame" in e || "id" in e)) return {
		name: e.name,
		message: e.message,
		stack: e.stack,
		cause: e.cause,
		__vitest_rollup_error__: {
			plugin: e.plugin,
			id: e.id,
			loc: e.loc,
			frame: e.frame
		}
	};
}
function handleRollupError(e) {
	throw toRollupError(e) ?? e;
}

const debug$2 = createDebugger("vitest:ast-collect-info");
const verbose = createDebugger("vitest:ast-collect-verbose");
const INTERMEDIATE_CALL_PROPERTIES = /* @__PURE__ */ new Set([
	"each",
	"for",
	"skipIf",
	"runIf",
	"extend",
	"scoped",
	"override"
]);
function isTestFunctionName(name) {
	return name === "it" || name === "test" || name.startsWith("test") || name.endsWith("Test");
}
function isVitestFunctionName(name) {
	return name === "describe" || name === "suite" || isTestFunctionName(name);
}
function astParseFile(filepath, code) {
	const ast = parseAst(code);
	if (verbose) verbose("Collecting", filepath, code);
	else debug$2?.("Collecting", filepath);
	const definitions = [];
	const getName = (callee) => {
		if (!callee) return null;
		if (callee.type === "Identifier") return callee.name;
		if (callee.type === "CallExpression") return getName(callee.callee);
		if (callee.type === "TaggedTemplateExpression") return getName(callee.tag);
		if (callee.type === "MemberExpression") {
			// A computed access like `it[1].call(it[2])` is not a Vitest call.
			if (callee.computed) return null;
			if (callee.object?.type === "Identifier" && isVitestFunctionName(callee.object.name)) return callee.object?.name;
			if (callee.object?.name?.startsWith("__vite_ssr_") || callee.object?.name?.startsWith("__vi_import_") || callee.object?.object?.name?.startsWith("__vite_ssr_") && callee.object?.property?.name === "Vitest") return getName(callee.property);
			// call as `__vite_ssr__.test.skip()` or `describe.concurrent.each()`
			return getName(callee.object);
		}
		// unwrap (0, ...)
		if (callee.type === "SequenceExpression" && callee.expressions.length === 2) {
			const [e0, e1] = callee.expressions;
			if (e0.type === "Literal" && e0.value === 0) return getName(e1);
		}
		return null;
	};
	const getProperties = (callee) => {
		if (!callee) return [];
		if (callee.type === "Identifier") return [];
		if (callee.type === "CallExpression") return getProperties(callee.callee);
		if (callee.type === "TaggedTemplateExpression") return getProperties(callee.tag);
		if (callee.type === "MemberExpression") {
			const props = getProperties(callee.object);
			if (callee.property?.name) props.push(callee.property.name);
			return props;
		}
		return [];
	};
	ancestor(ast, { CallExpression(node) {
		const { callee } = node;
		const name = getName(callee);
		if (!name) return;
		if (!isVitestFunctionName(name)) {
			verbose?.(`Skipping ${name} (unknown call)`);
			return;
		}
		const properties = getProperties(callee);
		const property = callee?.property?.name;
		// intermediate calls like .each(), .for() will be picked up in the next iteration
		if (property && INTERMEDIATE_CALL_PROPERTIES.has(property)) return;
		// skip properties on return values of calls - e.g., test('name', fn).skip()
		if (callee.type === "MemberExpression" && callee.object?.type === "CallExpression") return;
		// derive mode from the full chain (handles any order like .skip.concurrent or .concurrent.skip)
		let mode = "run";
		for (const prop of properties) if (prop === "skip" || prop === "only" || prop === "todo") mode = prop;
		else if (prop === "skipIf" || prop === "runIf") mode = "skip";
		let concurrent = properties.includes("concurrent") || void 0;
		let start;
		const end = node.end;
		// .each or (0, __vite_ssr_exports_0__.test)()
		if (callee.type === "CallExpression" || callee.type === "SequenceExpression" || callee.type === "TaggedTemplateExpression") start = callee.end;
		else start = node.start;
		const messageNode = node.arguments?.[0];
		if (messageNode == null) {
			verbose?.(`Skipping node at ${node.start} because it doesn't have a name`);
			return;
		}
		let message;
		if (messageNode?.type === "Literal" || messageNode?.type === "TemplateLiteral") message = code.slice(messageNode.start + 1, messageNode.end - 1);
		else {
			message = code.slice(messageNode.start, messageNode.end);
			if (message.endsWith(".name")) message = message.slice(0, -5);
		}
		if (message.startsWith("0,")) message = message.slice(2);
		message = message.replace(/\(0\s?,\s?__vite_ssr_import_\d+__.(\w+)\)/g, "$1").replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "").replace(/__vi_import_\d+__\./g, "");
		const parentCalleeName = typeof callee?.callee === "object" && callee?.callee.type === "MemberExpression" && callee?.callee.property?.name;
		let isDynamicEach = parentCalleeName === "each" || parentCalleeName === "for";
		if (!isDynamicEach && callee.type === "TaggedTemplateExpression") {
			const property = callee.tag?.property?.name;
			isDynamicEach = property === "each" || property === "for";
		}
		// Extract options from the second argument if it's an options object
		const tags = [];
		const secondArg = node.arguments?.[1];
		if (secondArg?.type === "ObjectExpression") for (const prop of secondArg.properties || []) {
			if (prop.type !== "Property" || prop.key?.type !== "Identifier") continue;
			const keyName = prop.key.name;
			if (keyName === "tags") {
				const tagsValue = prop.value;
				if (tagsValue?.type === "Literal" && typeof tagsValue.value === "string") tags.push(tagsValue.value);
				else if (tagsValue?.type === "ArrayExpression") {
					for (const element of tagsValue.elements || []) if (element?.type === "Literal" && typeof element.value === "string") tags.push(element.value);
				}
			} else if (prop.value?.type === "Literal") {
				if ((keyName === "skip" || keyName === "only" || keyName === "todo") && prop.value.value === true) mode = keyName;
				else if (keyName === "concurrent" && typeof prop.value.value === "boolean") concurrent = prop.value.value;
			}
		}
		debug$2?.("Found", name, message, `(${mode})`, tags.length ? `[${tags.join(", ")}]` : "");
		definitions.push({
			start,
			end,
			name: message,
			type: properties.includes("describe") || properties.includes("suite") || !isTestFunctionName(name) ? "suite" : "test",
			mode,
			task: null,
			dynamic: isDynamicEach,
			concurrent,
			tags
		});
	} });
	return {
		ast,
		definitions
	};
}
function createFailedFileTask(project, filepath, error, options) {
	const config = project.serializedConfig;
	const pool = options?.pool ?? config.pool;
	const file = {
		...createFileTask$1(filepath, config.root, config.name, pool, void 0, {
			typecheck: pool === "typescript",
			__vitest_label__: config.mergeReportsLabel
		}),
		mode: "run",
		start: 0,
		end: 0,
		result: {
			state: "fail",
			errors: serializeError(error)
		}
	};
	file.file = file;
	return file;
}
function serializeError(error) {
	if (error?.__vitest_rollup_error__) return [error];
	return [toRollupError(error) ?? {
		name: error.name,
		stack: error.stack,
		message: error.message
	}];
}
function createFileTask(project, testFilepath, code, requestMap, filepath, fileTags, options) {
	const { definitions, ast } = astParseFile(testFilepath, code);
	const config = project.serializedConfig;
	const pool = options?.pool ?? config.pool;
	const file = {
		...createFileTask$1(filepath, config.root, config.name, pool, void 0, {
			typecheck: pool === "typescript",
			__vitest_label__: config.mergeReportsLabel
		}),
		mode: "run",
		start: ast.start,
		end: ast.end,
		tags: fileTags || []
	};
	file.file = file;
	const indexMap = createIndexLocationsMap(code);
	const map = requestMap && new TraceMap(requestMap);
	let lastSuite = file;
	const updateLatestSuite = (index) => {
		while (lastSuite.suite && lastSuite.end < index) lastSuite = lastSuite.suite;
		return lastSuite;
	};
	definitions.sort((a, b) => a.start - b.start).forEach((definition) => {
		const latestSuite = updateLatestSuite(definition.start);
		let mode = definition.mode;
		if (latestSuite.mode !== "run")
 // inherit suite mode, if it's set
		mode = latestSuite.mode;
		const processedLocation = indexMap.get(definition.start);
		let location;
		if (map && processedLocation) {
			const originalLocation = originalPositionFor(map, {
				line: processedLocation.line,
				column: processedLocation.column
			});
			if (originalLocation.column != null) {
				verbose?.(`Found location for`, definition.type, definition.name, `${processedLocation.line}:${processedLocation.column + 1}`, "->", `${originalLocation.line}:${originalLocation.column + 1}`);
				location = {
					line: originalLocation.line,
					column: originalLocation.column + 1
				};
			} else debug$2?.("Cannot find original location for", definition.type, definition.name, `${processedLocation.column}:${processedLocation.line}`);
		} else debug$2?.("Cannot find original location for", definition.type, definition.name, `${definition.start}`);
		// Inherit tags from parent suite and merge with own tags
		const parentTags = latestSuite.tags || [];
		const taskTags = unique([...parentTags, ...definition.tags]);
		const concurrent = definition.concurrent ?? latestSuite.concurrent;
		if (definition.type === "suite") {
			const task = {
				type: definition.type,
				id: "",
				suite: latestSuite,
				file,
				tasks: [],
				mode,
				each: definition.dynamic,
				concurrent,
				name: definition.name,
				fullName: createTaskName([latestSuite.fullName, definition.name]),
				fullTestName: createTaskName([latestSuite.fullTestName, definition.name]),
				end: definition.end,
				start: definition.start,
				location,
				dynamic: definition.dynamic,
				meta: {},
				tags: taskTags
			};
			definition.task = task;
			latestSuite.tasks.push(task);
			if (mode === "only") markAncestorsContainOnly(latestSuite);
			lastSuite = task;
			return;
		}
		validateTags(config, taskTags);
		const task = {
			type: definition.type,
			id: "",
			suite: latestSuite,
			file,
			each: definition.dynamic,
			concurrent,
			mode,
			context: {},
			name: definition.name,
			fullName: createTaskName([latestSuite.fullName, definition.name]),
			fullTestName: createTaskName([latestSuite.fullTestName, definition.name]),
			end: definition.end,
			start: definition.start,
			location,
			dynamic: definition.dynamic,
			meta: {},
			timeout: 0,
			annotations: [],
			artifacts: [],
			benchmarks: [],
			tags: taskTags
		};
		definition.task = task;
		latestSuite.tasks.push(task);
		if (mode === "only") markAncestorsContainOnly(latestSuite);
	});
	calculateSuiteHash(file);
	markDynamicTests(file.tasks);
	if (!file.tasks.length) file.result = {
		state: "fail",
		errors: [{
			name: "Error",
			message: `No test suite found in file ${filepath}`
		}]
	};
	return {
		file,
		definitions
	};
}
async function astCollectTests(project, filepath) {
	return (await astCollectFileInformation(project, filepath)).file;
}
async function astCollectFileInformation(project, filepath, options) {
	const request = await transformSSR(project, filepath);
	const testFilepath = relative(project.config.root, filepath);
	if (!request) {
		debug$2?.("Cannot parse", testFilepath, "(vite didn't return anything)");
		return {
			file: createFailedFileTask(project, filepath, /* @__PURE__ */ new Error(`Failed to parse ${testFilepath}. Vite didn't return anything.`), options),
			filepath,
			parsed: "",
			map: null,
			definitions: []
		};
	}
	const { file, definitions } = createFileTask(project, testFilepath, request.code, request.map, filepath, request.fileTags, options);
	return {
		file,
		filepath,
		parsed: request.code,
		map: request.map,
		definitions
	};
}
async function transformSSR(project, filepath) {
	// Read original file content to extract pragmas (environment, tags)
	const originalCode = await promises.readFile(filepath, "utf-8").catch(() => "");
	const { env: pragmaEnv, tags: fileTags } = detectCodeBlock(originalCode);
	// Use environment from pragma if defined, otherwise fall back to config
	const environment = pragmaEnv || project.config.environment;
	const env = environment === "jsdom" || environment === "happy-dom" ? project.vite.environments.client : project.vite.environments.ssr;
	const transformResult = await project._transformService.transform(filepath, env);
	return transformResult ? {
		...transformResult,
		fileTags
	} : null;
}
// Walk up from the suite a task was added to, marking each ancestor as
// containing an `only` task. Stops at the first already-marked ancestor (its
// own ancestors are already marked), keeping the total work linear.
function markAncestorsContainOnly(suite) {
	let current = suite;
	while (current && !current.containsOnly) {
		current.containsOnly = true;
		current = current.suite;
	}
}
function markDynamicTests(tasks) {
	for (const task of tasks) {
		if (task.dynamic) task.id += "-dynamic";
		if ("tasks" in task) markDynamicTests(task.tasks);
	}
}
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const kReplacers = /* @__PURE__ */ new Map([
	["%i", "\\d+?"],
	["%#", "\\d+?"],
	["%d", "[\\d.eE+-]+?"],
	["%f", "[\\d.eE+-]+?"],
	["%s", ".+?"],
	["%j", ".+?"],
	["%o", ".+?"],
	["%%", "%"]
]);
function escapeTestName(label, dynamic) {
	if (!dynamic) return escapeRegex(label);
	// Replace object access patterns ($value, $obj.a) with %s first
	let pattern = label.replace(/\$[a-z_.]+/gi, "%s");
	pattern = escapeRegex(pattern);
	// Replace percent placeholders with their respective regex
	pattern = pattern.replace(/%[i#dfsjo%]/g, (m) => kReplacers.get(m) || m);
	return pattern;
}

function getDefaultMaxWorkers(watch) {
	const count = availableParallelism();
	return watch ? Math.max(Math.floor(count / 2), 1) : Math.max(count - 1, 1);
}
function resolveMaxWorkers(value) {
	if (typeof value === "string" && value.trim().endsWith("%")) {
		const count = availableParallelism();
		const byPercentage = Math.round(Number.parseInt(value) / 100 * count);
		return Math.max(1, Math.min(count, byPercentage));
	}
	return Number(value);
}

const LogLevels = {
	silent: 0,
	error: 1,
	warn: 2,
	info: 3
};
function clearScreen(logger) {
	const repeatCount = process.stdout.rows - 2;
	const blank = repeatCount > 0 ? "\n".repeat(repeatCount) : "";
	logger.clearScreen(blank);
}
let lastType;
let lastMsg;
let sameCount = 0;
// Only initialize the timeFormatter when the timestamp option is used, and
// reuse it across all loggers
let timeFormatter;
function getTimeFormatter() {
	timeFormatter ??= new Intl.DateTimeFormat(void 0, {
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	});
	return timeFormatter;
}
// This is copy-pasted and needs to be synced from time to time. Ideally, Vite's `createLogger` should accept a custom `console`
// https://github.com/vitejs/vite/blob/main/packages/vite/src/node/logger.ts?rgh-link-date=2024-10-16T23%3A29%3A19Z
// When Vitest supports only Vite 6 and above, we can use Vite's `createLogger({ console })`
// https://github.com/vitejs/vite/pull/18379
function createViteLogger(console, level = "info", options = {}) {
	const loggedErrors = /* @__PURE__ */ new WeakSet();
	const { prefix = "[vite]", allowClearScreen = true } = options;
	const thresh = LogLevels[level];
	const canClearScreen = allowClearScreen && process.stdout.isTTY && !process.env.CI;
	const clear = canClearScreen ? clearScreen : () => {};
	function format(type, msg, options = {}) {
		if (options.timestamp) {
			let tag = "";
			if (type === "info") tag = $.cyan($.bold(prefix));
			else if (type === "warn") tag = $.yellow($.bold(prefix));
			else tag = $.red($.bold(prefix));
			const environment = options.environment ? `${options.environment} ` : "";
			return `${$.dim(getTimeFormatter().format(/* @__PURE__ */ new Date()))} ${tag} ${environment}${msg}`;
		} else return msg;
	}
	function output(type, msg, options = {}) {
		if (thresh >= LogLevels[type]) {
			const method = type === "info" ? "log" : type;
			if (options.error) loggedErrors.add(options.error);
			if (canClearScreen) {
				if (type === lastType && msg === lastMsg) {
					sameCount++;
					clear(console);
					console[method](format(type, msg, options), $.yellow(`(x${sameCount + 1})`));
				} else {
					sameCount = 0;
					lastMsg = msg;
					lastType = type;
					if (options.clear) clear(console);
					console[method](format(type, msg, options));
				}
			} else console[method](format(type, msg, options));
		}
	}
	const warnedMessages = /* @__PURE__ */ new Set();
	const logger = {
		hasWarned: false,
		info(msg, opts) {
			output("info", msg, opts);
		},
		warn(msg, opts) {
			logger.hasWarned = true;
			output("warn", msg, opts);
		},
		warnOnce(msg, opts) {
			if (warnedMessages.has(msg)) return;
			logger.hasWarned = true;
			output("warn", msg, opts);
			warnedMessages.add(msg);
		},
		error(msg, opts) {
			logger.hasWarned = true;
			output("error", msg, opts);
		},
		clearScreen(type) {
			if (thresh >= LogLevels[type]) clear(console);
		},
		hasErrorLogged(error) {
			return loggedErrors.has(error);
		}
	};
	return logger;
}
// silence warning by Vite for statically not analyzable dynamic import
function silenceViteWarnings(logger, browserMode) {
	return {
		...logger,
		warn(msg, options) {
			if (msg.includes("The above dynamic import cannot be analyzed by Vite")) return;
			if (!browserMode && msg.includes("has been externalized for browser compatibility")) return;
			logger.warn(msg, options);
		}
	};
}

function sortPluginsByEnforce(plugins) {
	const pre = [];
	const normal = [];
	const post = [];
	for (const plugin of plugins) if (plugin.enforce === "pre") pre.push(plugin);
	else if (plugin.enforce === "post") post.push(plugin);
	else normal.push(plugin);
	return [
		...pre,
		...normal,
		...post
	];
}
function BrowserLoaderPlugin(captures, harness) {
	return [{
		name: "vitest:browser:loader",
		// `pre` so the browser plugins injected via `applyToEnvironment` land before
		// Vite's internal resolver in the `client` environment (so e.g. the
		// `vitest/browser` virtual module wins over the node stub resolution).
		enforce: "pre",
		async config(viteConfig) {
			const browser = viteConfig.test?.browser;
			if (!browser?.enabled) return;
			// The provider can be configured at the project level or per instance
			// (e.g. connect mode). All instances in a project share one provider
			// (validated in `resolveTestConfig`), so any instance's server factory
			// builds the shared server.
			const provider = browser.provider ?? browser.instances?.find((instance) => instance.provider)?.provider;
			if (!provider || typeof provider.serverFactory !== "function") throw new Error(`Browser Mode was enabled, but provider was not specified anywhere. See https://vitest.dev/guide/browser/#configuration`);
			const contribution = await provider.serverFactory();
			captures.browserContribution = contribution;
			const browserConfig = await contribution.config(viteConfig, harness);
			const logLevel = viteConfig.logLevel ?? "warn";
			const logger = createViteLogger(harness.logger, logLevel, { allowClearScreen: false });
			return {
				...browserConfig,
				customLogger: {
					...logger,
					info(message, options) {
						if (message.includes("dependency optimized: ") || message.includes("dependencies optimized: ") || message.includes("optimized dependencies changed. reloading"))
 // escalate from `info` to `warn` so it shows up on Vitest's default logLevel `warn`
						logger.warn(message, options);
						else logger.info(message, options);
						if (message.includes("optimized dependencies changed. reloading")) logger.warn([$.yellow(`\n${$.bold("[vitest]")} Vite unexpectedly reloaded a test. This may cause tests to fail, lead to flaky behaviour or duplicated test runs.\n`), $.yellow(`For a stable experience, add the newly optimized dependencies to your config's ${$.bold("`optimizeDeps.include`")} field manually.\n`)].join(""));
					}
				}
			};
		},
		applyToEnvironment(environment) {
			const contribution = captures.browserContribution;
			if (contribution && environment.name === "client")
 // `post` browser plugins are injected by `vitest:browser:loader:post`
			// instead, so they run after the `post` plugins of the main pipeline
			// rather than at this `pre` position. For example, the mocker's
			// `vitest:browser:esm-injector` must run after `vitest:mocks`, which is
			// added by the main pipeline and is not part of `contribution.plugins`.
			return sortPluginsByEnforce(contribution.plugins.filter((plugin) => plugin.enforce !== "post"));
			return false;
		},
		configureServer: {
			order: "pre",
			async handler(server) {
				await captures.browserContribution?.configureServer(server);
			}
		},
		transformIndexHtml: {
			order: "pre",
			async handler(html, ctx) {
				return captures.browserContribution?.transformIndexHtml(ctx);
			}
		}
	}, {
		name: "vitest:browser:loader:post",
		enforce: "post",
		applyToEnvironment(environment) {
			const contribution = captures.browserContribution;
			if (contribution && environment.name === "client") return sortPluginsByEnforce(contribution.plugins.filter((plugin) => plugin.enforce === "post"));
			return false;
		}
	}];
}
const deferredListen = /* @__PURE__ */ new WeakMap();
function listenClusterServer(server) {
	const deferred = deferredListen.get(server);
	if (!deferred) return Promise.resolve();
	deferred.listening ??= server.listen(deferred.port).then(() => {
		deferredListen.delete(server);
	}, (error) => {
		deferred.listening = void 0;
		throw error;
	});
	return deferred.listening;
}
async function createClusterServer(vitest, viteConfig, config, children) {
	const contribution = config._browserContribution;
	if (!contribution) {
		const server = await createViteServer(viteConfig);
		if (config.api.port != null) await server.listen(config.api.port);
		return { server };
	}
	const parent = contribution.createParent({
		config,
		vitest
	});
	contribution.parent = parent;
	// Start browser launches now so their latency overlaps Vite server creation.
	// Entries that cannot run browser tests are skipped because they will never
	// initialize a provider that could adopt and close the prepared browser.
	const harness = vitest._harness;
	for (const child of children) {
		if (child.hidden || child.hasTestFiles === false || child.projectConfig.typecheck.enabled && child.projectConfig.typecheck.only) continue;
		// The Vite server is shared, but each child carries its own resolved
		// provider and browser options, so it must be prewarmed independently.
		const projectConfig = child.projectConfig;
		const prewarm = projectConfig.browser.provider?.prewarm;
		// the pool runs at most `maxWorkers` browser instances at a time,
		// the rest would only sit idle until their project gets a turn
		if (!prewarm || harness._prewarmedBrowsers >= projectConfig.maxWorkers) continue;
		harness._prewarmedBrowsers++;
		prewarm({
			config: projectConfig,
			vitest
		});
	}
	const server = await createViteServer(viteConfig);
	// listen on startup only for `api`/`ui`, otherwise on the first browser launch
	// (collect-only processes never listen, so Vite never starts a dependency scan)
	if (config._apiRequested) await server.listen(config.api.port);
	else {
		deferredListen.set(server, { port: config.api.port });
		// Vite runs plugin buildStart hooks on listen; global setup and --changed
		// transform modules before the first browser launch
		await server.environments.client.pluginContainer.buildStart();
	}
	contribution.setupRpc(parent);
	return {
		server,
		parent
	};
}

function generateCssFilenameHash(filepath) {
	return hash("sha1", filepath, "hex").slice(0, 6);
}
function generateScopedClassName(strategy, name, filename) {
	// should be configured by Vite defaults
	if (strategy === "scoped") return null;
	if (strategy === "non-scoped") return name;
	return `_${name}_${generateCssFilenameHash(filename)}`;
}

const API_TOKEN_FILE = ".vitest-secret-token";
// Follows env-paths' user data directory conventions:
// https://github.com/sindresorhus/env-paths/blob/v4.0.0/index.js
function getUserDataDir() {
	if (process.platform === "win32") return process.env.LOCALAPPDATA || join(homedir(), "AppData/Local");
	if (process.platform === "darwin") return join(homedir(), "Library/Application Support");
	return process.env.XDG_DATA_HOME || join(homedir(), ".local/share");
}
function readPublishedToken(tokenPath) {
	try {
		return readFileSync(tokenPath, "utf-8").trim() || void 0;
	} catch {
		return;
	}
}
function resolveTokenFromPath(tokenPath) {
	const published = readPublishedToken(tokenPath);
	if (published) return {
		token: published,
		tokenCreated: false
	};
	const dir = dirname(tokenPath);
	mkdirSync(dir, {
		recursive: true,
		mode: 448
	});
	const token = crypto.randomUUID();
	const pendingPath = join(dir, `${API_TOKEN_FILE}.${process.pid}.${crypto.randomUUID()}`);
	writeFileSync(pendingPath, `${token}\n`, { mode: 384 });
	let tokenCreated = true;
	try {
		// linking fails when another process already published, which keeps a single winner
		linkSync(pendingPath, tokenPath);
	} catch (error) {
		if (error.code === "EEXIST") tokenCreated = false;
		else renameSync(pendingPath, tokenPath);
	} finally {
		rmSync(pendingPath, { force: true });
	}
	const winner = readPublishedToken(tokenPath);
	if (!tokenCreated && !winner) {
		writeFileSync(tokenPath, `${token}\n`, { mode: 384 });
		tokenCreated = true;
	}
	try {
		chmodSync(dir, 448);
		chmodSync(tokenPath, 384);
	} catch {}
	return {
		token: (tokenCreated ? token : winner) ?? token,
		tokenCreated
	};
}
function resolveApiToken(root) {
	const tokenPaths = [join(getUserDataDir(), "vitest", API_TOKEN_FILE), join(searchForWorkspaceRoot(root), "node_modules/.vitest", API_TOKEN_FILE)];
	for (const tokenPath of tokenPaths) try {
		return {
			...resolveTokenFromPath(tokenPath),
			tokenPath
		};
	} catch {}
	throw new Error(`Failed to create Vitest API token at ${tokenPaths.join(" or ")}`);
}

function resolveTestCacheDir(root, testConfig, viteCacheDir) {
	const name = testConfig.name;
	const label = typeof name === "string" ? name : name?.label || "";
	const baseDir = slash(viteCacheDir || "node_modules/.vite");
	return resolve(root, baseDir, "vitest", hash("sha1", label, "hex"));
}
function normalizeUIOptions(ui) {
	return typeof ui === "object" ? ui : { enabled: ui };
}
function resolveOptimizerConfig(testOptions_, viteOptions) {
	const testOptions = testOptions_ || {};
	let optimizeDeps;
	if (testOptions.enabled !== true) {
		testOptions.enabled ??= false;
		optimizeDeps = {
			// experimental in Vite >2.9.2, entries remains to help with older versions
			disabled: true,
			entries: []
		};
	} else {
		const currentInclude = testOptions.include || viteOptions?.include || [];
		const exclude = [
			"vitest",
			"react",
			"vue",
			...testOptions.exclude || viteOptions?.exclude || []
		];
		const runtime = currentInclude.filter((n) => n.endsWith("jsx-dev-runtime") || n.endsWith("jsx-runtime"));
		exclude.push(...runtime);
		const include = (testOptions.include || viteOptions?.include || []).filter((n) => !exclude.includes(n));
		optimizeDeps = {
			...viteOptions,
			...testOptions,
			noDiscovery: true,
			disabled: false,
			entries: [],
			exclude,
			include
		};
	}
	// `optimizeDeps.disabled` is deprecated since v5.1.0-beta.1
	// https://github.com/vitejs/vite/pull/15184
	if (optimizeDeps.disabled) {
		optimizeDeps.noDiscovery = true;
		optimizeDeps.include = [];
	}
	delete optimizeDeps.disabled;
	return optimizeDeps;
}
function deleteDefineConfig(viteConfig) {
	const defines = {};
	const scriptDefines = {};
	if (viteConfig.define) {
		delete viteConfig.define["process.env"];
		delete viteConfig.define.process;
		delete viteConfig.define.global;
	}
	for (const key in viteConfig.define) {
		const val = viteConfig.define[key];
		// vitest sets this identity replacement to defeat vite:client-inject,
		// it has to stay in the config
		if (key === "process.env.NODE_ENV" && val === "process.env.NODE_ENV") continue;
		let replacement;
		try {
			replacement = typeof val === "string" ? JSON.parse(val) : val;
		} catch {
			// a reference to code, like "__VAR__": "process.env.VAR";
			// the defines script evaluates the raw value at runtime
			scriptDefines[key] = val;
			delete viteConfig.define[key];
			continue;
		}
		if (key.startsWith("import.meta.env.")) {
			const envKey = key.slice(16);
			process.env[envKey] = replacement;
			delete viteConfig.define[key];
		} else if (key.startsWith("process.env.")) {
			const envKey = key.slice(12);
			process.env[envKey] = replacement;
			delete viteConfig.define[key];
		} else if (!key.includes(".")) {
			defines[key] = replacement;
			delete viteConfig.define[key];
		} else {
			scriptDefines[key] = val;
			delete viteConfig.define[key];
		}
	}
	return {
		defines,
		scriptDefines
	};
}
// TODO: use Vite's own defaults once they are exported (request upstream)
// copied from Vite 8.3 https://github.com/vitejs/vite/blob/v8.3.4/packages/vite/src/node/server/index.ts#L1254-L1261
const VITE_DEFAULT_FS_DENY = [
	".env",
	".env.*",
	"*.{crt,pem,key,p12,pfx,cer,der}",
	".npmrc",
	".yarnrc.yml",
	"**/.git/**"
];
// Vite drops its default `server.fs.deny` once any value is set,
// so the defaults are kept explicitly when the user didn't set one.
function appendApiTokenFsDeny(viteConfig) {
	viteConfig.server ??= {};
	viteConfig.server.fs ??= {};
	viteConfig.server.fs.deny = [...viteConfig.server.fs.deny ?? VITE_DEFAULT_FS_DENY, API_TOKEN_FILE];
}
function resolveFsAllow(projectRoot, rootConfigFile) {
	if (!rootConfigFile) return [searchForWorkspaceRoot(projectRoot), rootDir];
	return [
		dirname(rootConfigFile),
		searchForWorkspaceRoot(projectRoot),
		rootDir
	];
}
function getDefaultResolveOptions() {
	return {
		// by default Vite resolves `module` field, which is not always a native ESM module
		// setting this option can bypass that and fallback to cjs version
		mainFields: [],
		// same for `module` condition and Vite 5 doesn't even allow excluding it,
		// but now it's possible since Vite 6.
		conditions: getDefaultServerConditions()
	};
}
function getDefaultServerConditions() {
	if (Number(version.split(".")[0]) >= 6) return vite.defaultServerConditions.filter((c) => c !== "module");
	return ["node"];
}

function ModuleRunnerTransform() {
	let testConfig;
	// make sure Vite always applies the module runner transform
	return {
		name: "vitest:environments-module-runner",
		config: {
			order: "post",
			handler(config) {
				testConfig = config.test || {};
				// In browser mode the `client` environment serves test code to a real
				// browser via native ESM, so it must NOT be module-runner-transformed.
				// `ssr`/`__vitest__` keep the transform (node-side global setup + watch
				// run there). Note: jsdom/happy-dom (node mode) also uses `client` and
				// DOES need the transform, hence the `browser.enabled` gate.
				const browserEnabled = !!config.test?.browser?.enabled;
				config.environments ??= {};
				const names = new Set(Object.keys(config.environments));
				names.add("client");
				names.add("ssr");
				const pool = config.test?.pool;
				if (pool === "vmForks" || pool === "vmThreads") names.add("__vitest_vm__");
				for (const name of names) {
					config.environments[name] ??= {};
					const environment = config.environments[name];
					// other environments consumed by the browser are not run by Vitest
					if (browserEnabled && name !== "client" && environment.consumer === "client") continue;
					environment.dev ??= {};
					// vm tests run using the native import mechanism
					if (name === "__vitest_vm__") {
						environment.dev.moduleRunnerTransform = false;
						environment.consumer = "client";
					} else if (name === "client" && browserEnabled) environment.dev.moduleRunnerTransform = false;
					else environment.dev.moduleRunnerTransform = true;
					if (name !== "client" || !browserEnabled) environment.dev.preTransformRequests = false;
					environment.keepProcessEnv = true;
				}
			}
		},
		configEnvironment: {
			order: "post",
			handler(name, config) {
				if (name === "__vitest__") return;
				// In browser mode the `client` environment (and any other environment
				// consumed by the browser) is browser-managed: don't apply node-runner
				// externalization / `optimizeDeps` to it (that would discard the browser
				// `optimizeDeps.include`, e.g. `vitest > expect-type`).
				if (testConfig.browser?.enabled && (name === "client" || config.consumer === "client")) return;
				const optimizerOptions = name === "__vitest_vm__" ? void 0 : testConfig?.deps?.optimizer?.[name];
				config.optimizeDeps = resolveOptimizerConfig(optimizerOptions, config.optimizeDeps);
				if (name === "__vitest_vm__") return;
				config.resolve ??= {};
				// remove Vite's externalization logic because we have our own (unfortunately)
				config.resolve.external = [...builtinModules, ...builtinModules.filter((m) => !m.startsWith("node:")).map((m) => `node:${m}`)];
				// by setting `noExternal` to `true`, we make sure that
				// Vite will never use its own externalization mechanism
				// to externalize modules and always resolve static imports
				// in both SSR and Client environments
				config.resolve.noExternal = true;
			}
		}
	};
}

function VitestProjectResolver(harness) {
	let browserEnabled = false;
	const plugin = {
		name: "vitest:resolve-root",
		enforce: "pre",
		config: {
			order: "post",
			handler(config) {
				browserEnabled = !!config.test?.browser?.enabled;
				return { base: "/" };
			}
		},
		async resolveId(id, _, { ssr }) {
			if (id === "vitest" || id.startsWith("@vitest/") || id.startsWith("vitest/")) {
				// the browser pre-bundles vitest, and the optimizer's copy must win
				// so the tester and the test files share one module instance
				if (browserEnabled && this.environment?.name === "client") return;
				return await harness.getVitest().vite.pluginContainer.resolveId(id, void 0, {
					skip: /* @__PURE__ */ new Set([plugin]),
					ssr
				});
			}
		}
	};
	return plugin;
}
function VitestCoreResolver() {
	let root;
	let browserEnabled = false;
	return {
		name: "vitest:resolve-core",
		enforce: "pre",
		config: {
			order: "post",
			handler(config) {
				browserEnabled = !!config.test?.browser?.enabled;
				return { base: "/" };
			}
		},
		configResolved(config) {
			root = config.root;
		},
		async resolveId(id) {
			// the browser pre-bundles vitest, and the optimizer's copy must win
			// so the tester and the test files share one module instance
			if (browserEnabled && this.environment?.name === "client") return;
			if (id === "vitest") return resolve(distDir, "index.js");
			if (id.startsWith("@vitest/") || id.startsWith("vitest/"))
 // ignore actual importer, we want it to be resolved relative to the root
			return this.resolve(id, join(root, "index.html"), { skipSelf: true });
		}
	};
}
function VitestBuiltinResolver() {
	return {
		name: "vitest:resolve-builtin",
		enforce: "pre",
		applyToEnvironment(environment) {
			return environment.config.consumer === "client" && environment.config.dev.moduleRunnerTransform;
		},
		async resolveId(id, importer, options) {
			if (!isBuiltin$1(id)) return;
			const resolved = await this.resolve(id, importer, {
				...options,
				skipSelf: true
			});
			// Vite replaces builtins with a browser shim, but the module runner can import them
			if (resolved && isBrowserExternal(resolved.id)) return {
				id,
				external: true
			};
			return resolved;
		}
	};
}

function ViteConfigPlugin(harness) {
	let root;
	return [
		{
			name: "vitest:config:server-defaults",
			config: {
				// These static server toggles must be visible to other plugins that
				// read `server.hmr` in their own `config` hook: `@vitejs/plugin-react`
				// turns React Fast Refresh off only when it sees HMR disabled.
				// A `post` hook (in `vitest:config:server`) runs after such plugins,
				// so set them here in a `pre` hook instead.
				order: "pre",
				handler() {
					return { server: {
						hmr: false,
						open: false
					} };
				}
			}
		},
		{
			name: "vitest:config",
			enforce: "pre",
			configResolved(config) {
				root = config.root;
			},
			config(viteConfig) {
				const testConfig = viteConfig.test || {};
				const resolveOptions = getDefaultResolveOptions();
				const browserEnabled = !!testConfig.browser?.enabled;
				// move `test.alias` to Vite's `resolve.alias`
				const alias = testConfig.alias;
				delete testConfig.alias;
				const config = browserEnabled ? { resolve: { alias } } : {
					define: { 
					// disable replacing `process.env.NODE_ENV` with static string by vite:client-inject
"process.env.NODE_ENV": "process.env.NODE_ENV" },
					resolve: {
						...resolveOptions,
						alias
					}
				};
				config.environments = {
					ssr: { resolve: resolveOptions },
					__vitest__: {
						dev: {},
						resolve: resolveOptions
					}
				};
				if (viteConfig.oxc !== false) {
					viteConfig.oxc ??= {};
					// Lowest target Vitest supports is Node22
					viteConfig.oxc.target ??= "node22";
				}
				if (!("rolldownVersion" in vite) && viteConfig.esbuild !== false) {
					viteConfig.esbuild ??= {};
					// Lowest target Vitest supports is Node22
					viteConfig.esbuild.target ??= "node22";
					viteConfig.esbuild.sourcemap = "external";
					// Enables using ignore hint for coverage providers with @preserve keyword
					viteConfig.esbuild.legalComments = "inline";
				}
				const classNameStrategy = typeof testConfig.css !== "boolean" && testConfig.css?.modules?.classNameStrategy || "stable";
				if (!browserEnabled && classNameStrategy !== "scoped") {
					config.css ??= {};
					config.css.modules ??= {};
					if (config.css.modules) config.css.modules.generateScopedName = (name, filename) => {
						return generateScopedClassName(classNameStrategy, name, relative(root, filename));
					};
				}
				config.customLogger = createViteLogger(harness.logger, viteConfig.logLevel || "warn", { allowClearScreen: false });
				config.customLogger = silenceViteWarnings(config.customLogger, browserEnabled);
				return config;
			}
		},
		{
			name: "vitest:config:server",
			enforce: "post",
			config: {
				order: "post",
				handler(viteConfig) {
					// `vitest:test-config` has resolved `test.api` by now: both hooks
					// have the same order and `TestConfigPlugin` always comes earlier
					const testConfig = viteConfig.test ?? {};
					const isBrowserEnabled = !!testConfig.browser?.enabled;
					const api = testConfig.api;
					const server = { ...api };
					if (!isBrowserEnabled) server.preTransformRequests = false;
					// Always disable the websocket server in middlewareMode
					if (!isBrowserEnabled && api.middlewareMode) server.ws = false;
					else if (viteConfig.server && "ws" in viteConfig.server) viteConfig.server.ws = void 0;
					return { server };
				}
			}
		},
		ModuleRunnerTransform(),
		VitestBuiltinResolver()
	];
}

function CoverageTransform(harness) {
	return {
		name: "vitest:coverage-transform",
		enforce: "post",
		transform(srcCode, id) {
			return harness.getVitest().coverageProvider?.onFileTransform?.(srcCode, id, this);
		}
	};
}

const cssLangs = "\\.(?:css|less|sass|scss|styl|stylus|pcss|postcss)(?:$|\\?)";
const cssLangRE = new RegExp(cssLangs);
const cssModuleRE = new RegExp(`\\.module${cssLangs}`);
const cssInlineRE = /[?&]inline(?:&|$)/;
function isCSS(id) {
	return cssLangRE.test(id);
}
function isCSSModule(id) {
	return cssModuleRE.test(id);
}
// inline css requests are expected to just return the
// string content directly and not the proxy module
function isInline(id) {
	return cssInlineRE.test(id);
}
function getCSSModuleProxyReturn(strategy, filename) {
	if (strategy === "non-scoped") return "style";
	return `\`_\${style}_${generateCssFilenameHash(filename)}\``;
}
function CSSEnablerPlugin() {
	let viteConfig;
	const shouldProcessCSS = (id) => {
		const { css } = viteConfig.test;
		if (typeof css === "boolean") return css;
		if (toArray(css.exclude).some((re) => re.test(id))) return false;
		if (toArray(css.include).some((re) => re.test(id))) return true;
		return false;
	};
	return [{
		name: "vitest:css-disable",
		enforce: "pre",
		transform(_code, id) {
			if (!isCSS(id)) return;
			// css plugin inside Vite won't do anything if the code is empty
			// but it will put __vite__updateStyle anyway
			if (!shouldProcessCSS(id)) return { code: "" };
		}
	}, {
		name: "vitest:css-empty-post",
		enforce: "post",
		configResolved(config) {
			viteConfig = config;
		},
		transform(_, id) {
			if (!isCSS(id) || shouldProcessCSS(id)) return;
			if (isCSSModule(id) && !isInline(id)) return { code: `export default new Proxy(Object.create(null), {
            get(_, style) {
              return ${getCSSModuleProxyReturn(typeof viteConfig.test.css !== "boolean" && viteConfig.test.css.modules?.classNameStrategy || "stable", relative(viteConfig.test.root, id))};
            },
          })` };
			return { code: "export default \"\"" };
		}
	}];
}

// Copyright 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023 Simon Lydell
// License: MIT.
var HashbangComment, Identifier, JSXIdentifier, JSXPunctuator, JSXString, JSXText, KeywordsWithExpressionAfter, KeywordsWithNoLineTerminatorAfter, LineTerminatorSequence, MultiLineComment, Newline, NumericLiteral, Punctuator, RegularExpressionLiteral, SingleLineComment, StringLiteral, Template, TokensNotPrecedingObjectLiteral, TokensPrecedingExpression, WhiteSpace, jsTokens$1;
RegularExpressionLiteral = /\/(?![*\/])(?:\[(?:[^\]\\\n\r\u2028\u2029]+|\\.)*\]?|[^\/[\\\n\r\u2028\u2029]+|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/yu;
Punctuator = /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y;
Identifier = /(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]+|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/yu;
StringLiteral = /(['"])(?:[^'"\\\n\r]+|(?!\1)['"]|\\(?:\r\n|[^]))*(\1)?/y;
NumericLiteral = /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y;
Template = /[`}](?:[^`\\$]+|\\[^]|\$(?!\{))*(`|\$\{)?/y;
WhiteSpace = /[\t\v\f\ufeff\p{Zs}]+/yu;
LineTerminatorSequence = /\r?\n|[\r\u2028\u2029]/y;
MultiLineComment = /\/\*(?:[^*]+|\*(?!\/))*(\*\/)?/y;
SingleLineComment = /\/\/.*/y;
HashbangComment = /^#!.*/;
JSXPunctuator = /[<>.:={}]|\/(?![\/*])/y;
JSXIdentifier = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/yu;
JSXString = /(['"])(?:[^'"]+|(?!\1)['"])*(\1)?/y;
JSXText = /[^<>{}]+/y;
TokensPrecedingExpression = /^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/;
TokensNotPrecedingObjectLiteral = /^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/;
KeywordsWithExpressionAfter = /^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/;
KeywordsWithNoLineTerminatorAfter = /^(?:return|throw|yield)$/;
Newline = RegExp(LineTerminatorSequence.source);
jsTokens$1 = function*(input, {jsx = false} = {}) {
	var braces, firstCodePoint, isExpression, lastIndex, lastSignificantToken, length, match, mode, nextLastIndex, nextLastSignificantToken, parenNesting, postfixIncDec, punctuator, stack;
	({length} = input);
	lastIndex = 0;
	lastSignificantToken = "";
	stack = [
		{tag: "JS"}
	];
	braces = [];
	parenNesting = 0;
	postfixIncDec = false;
	if (match = HashbangComment.exec(input)) {
		yield ({
			type: "HashbangComment",
			value: match[0]
		});
		lastIndex = match[0].length;
	}
	while (lastIndex < length) {
		mode = stack[stack.length - 1];
		switch (mode.tag) {
			case "JS":
			case "JSNonExpressionParen":
			case "InterpolationInTemplate":
			case "InterpolationInJSX":
				if (input[lastIndex] === "/" && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken))) {
					RegularExpressionLiteral.lastIndex = lastIndex;
					if (match = RegularExpressionLiteral.exec(input)) {
						lastIndex = RegularExpressionLiteral.lastIndex;
						lastSignificantToken = match[0];
						postfixIncDec = true;
						yield ({
							type: "RegularExpressionLiteral",
							value: match[0],
							closed: match[1] !== void 0 && match[1] !== "\\"
						});
						continue;
					}
				}
				Punctuator.lastIndex = lastIndex;
				if (match = Punctuator.exec(input)) {
					punctuator = match[0];
					nextLastIndex = Punctuator.lastIndex;
					nextLastSignificantToken = punctuator;
					switch (punctuator) {
						case "(":
							if (lastSignificantToken === "?NonExpressionParenKeyword") {
								stack.push({
									tag: "JSNonExpressionParen",
									nesting: parenNesting
								});
							}
							parenNesting++;
							postfixIncDec = false;
							break;
						case ")":
							parenNesting--;
							postfixIncDec = true;
							if (mode.tag === "JSNonExpressionParen" && parenNesting === mode.nesting) {
								stack.pop();
								nextLastSignificantToken = "?NonExpressionParenEnd";
								postfixIncDec = false;
							}
							break;
						case "{":
							Punctuator.lastIndex = 0;
							isExpression = !TokensNotPrecedingObjectLiteral.test(lastSignificantToken) && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken));
							braces.push(isExpression);
							postfixIncDec = false;
							break;
						case "}":
							switch (mode.tag) {
								case "InterpolationInTemplate":
									if (braces.length === mode.nesting) {
										Template.lastIndex = lastIndex;
										match = Template.exec(input);
										lastIndex = Template.lastIndex;
										lastSignificantToken = match[0];
										if (match[1] === "${") {
											lastSignificantToken = "?InterpolationInTemplate";
											postfixIncDec = false;
											yield ({
												type: "TemplateMiddle",
												value: match[0]
											});
										} else {
											stack.pop();
											postfixIncDec = true;
											yield ({
												type: "TemplateTail",
												value: match[0],
												closed: match[1] === "`"
											});
										}
										continue;
									}
									break;
								case "InterpolationInJSX":
									if (braces.length === mode.nesting) {
										stack.pop();
										lastIndex += 1;
										lastSignificantToken = "}";
										yield ({
											type: "JSXPunctuator",
											value: "}"
										});
										continue;
									}
							}
							postfixIncDec = braces.pop();
							nextLastSignificantToken = postfixIncDec ? "?ExpressionBraceEnd" : "}";
							break;
						case "]":
							postfixIncDec = true;
							break;
						case "++":
						case "--":
							nextLastSignificantToken = postfixIncDec ? "?PostfixIncDec" : "?UnaryIncDec";
							break;
						case "<":
							if (jsx && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken))) {
								stack.push({tag: "JSXTag"});
								lastIndex += 1;
								lastSignificantToken = "<";
								yield ({
									type: "JSXPunctuator",
									value: punctuator
								});
								continue;
							}
							postfixIncDec = false;
							break;
						default:
							postfixIncDec = false;
					}
					lastIndex = nextLastIndex;
					lastSignificantToken = nextLastSignificantToken;
					yield ({
						type: "Punctuator",
						value: punctuator
					});
					continue;
				}
				Identifier.lastIndex = lastIndex;
				if (match = Identifier.exec(input)) {
					lastIndex = Identifier.lastIndex;
					nextLastSignificantToken = match[0];
					switch (match[0]) {
						case "for":
						case "if":
						case "while":
						case "with":
							if (lastSignificantToken !== "." && lastSignificantToken !== "?.") {
								nextLastSignificantToken = "?NonExpressionParenKeyword";
							}
					}
					lastSignificantToken = nextLastSignificantToken;
					postfixIncDec = !KeywordsWithExpressionAfter.test(match[0]);
					yield ({
						type: match[1] === "#" ? "PrivateIdentifier" : "IdentifierName",
						value: match[0]
					});
					continue;
				}
				StringLiteral.lastIndex = lastIndex;
				if (match = StringLiteral.exec(input)) {
					lastIndex = StringLiteral.lastIndex;
					lastSignificantToken = match[0];
					postfixIncDec = true;
					yield ({
						type: "StringLiteral",
						value: match[0],
						closed: match[2] !== void 0
					});
					continue;
				}
				NumericLiteral.lastIndex = lastIndex;
				if (match = NumericLiteral.exec(input)) {
					lastIndex = NumericLiteral.lastIndex;
					lastSignificantToken = match[0];
					postfixIncDec = true;
					yield ({
						type: "NumericLiteral",
						value: match[0]
					});
					continue;
				}
				Template.lastIndex = lastIndex;
				if (match = Template.exec(input)) {
					lastIndex = Template.lastIndex;
					lastSignificantToken = match[0];
					if (match[1] === "${") {
						lastSignificantToken = "?InterpolationInTemplate";
						stack.push({
							tag: "InterpolationInTemplate",
							nesting: braces.length
						});
						postfixIncDec = false;
						yield ({
							type: "TemplateHead",
							value: match[0]
						});
					} else {
						postfixIncDec = true;
						yield ({
							type: "NoSubstitutionTemplate",
							value: match[0],
							closed: match[1] === "`"
						});
					}
					continue;
				}
				break;
			case "JSXTag":
			case "JSXTagEnd":
				JSXPunctuator.lastIndex = lastIndex;
				if (match = JSXPunctuator.exec(input)) {
					lastIndex = JSXPunctuator.lastIndex;
					nextLastSignificantToken = match[0];
					switch (match[0]) {
						case "<":
							stack.push({tag: "JSXTag"});
							break;
						case ">":
							stack.pop();
							if (lastSignificantToken === "/" || mode.tag === "JSXTagEnd") {
								nextLastSignificantToken = "?JSX";
								postfixIncDec = true;
							} else {
								stack.push({tag: "JSXChildren"});
							}
							break;
						case "{":
							stack.push({
								tag: "InterpolationInJSX",
								nesting: braces.length
							});
							nextLastSignificantToken = "?InterpolationInJSX";
							postfixIncDec = false;
							break;
						case "/":
							if (lastSignificantToken === "<") {
								stack.pop();
								if (stack[stack.length - 1].tag === "JSXChildren") {
									stack.pop();
								}
								stack.push({tag: "JSXTagEnd"});
							}
					}
					lastSignificantToken = nextLastSignificantToken;
					yield ({
						type: "JSXPunctuator",
						value: match[0]
					});
					continue;
				}
				JSXIdentifier.lastIndex = lastIndex;
				if (match = JSXIdentifier.exec(input)) {
					lastIndex = JSXIdentifier.lastIndex;
					lastSignificantToken = match[0];
					yield ({
						type: "JSXIdentifier",
						value: match[0]
					});
					continue;
				}
				JSXString.lastIndex = lastIndex;
				if (match = JSXString.exec(input)) {
					lastIndex = JSXString.lastIndex;
					lastSignificantToken = match[0];
					yield ({
						type: "JSXString",
						value: match[0],
						closed: match[2] !== void 0
					});
					continue;
				}
				break;
			case "JSXChildren":
				JSXText.lastIndex = lastIndex;
				if (match = JSXText.exec(input)) {
					lastIndex = JSXText.lastIndex;
					lastSignificantToken = match[0];
					yield ({
						type: "JSXText",
						value: match[0]
					});
					continue;
				}
				switch (input[lastIndex]) {
					case "<":
						stack.push({tag: "JSXTag"});
						lastIndex++;
						lastSignificantToken = "<";
						yield ({
							type: "JSXPunctuator",
							value: "<"
						});
						continue;
					case "{":
						stack.push({
							tag: "InterpolationInJSX",
							nesting: braces.length
						});
						lastIndex++;
						lastSignificantToken = "?InterpolationInJSX";
						postfixIncDec = false;
						yield ({
							type: "JSXPunctuator",
							value: "{"
						});
						continue;
				}
		}
		WhiteSpace.lastIndex = lastIndex;
		if (match = WhiteSpace.exec(input)) {
			lastIndex = WhiteSpace.lastIndex;
			yield ({
				type: "WhiteSpace",
				value: match[0]
			});
			continue;
		}
		LineTerminatorSequence.lastIndex = lastIndex;
		if (match = LineTerminatorSequence.exec(input)) {
			lastIndex = LineTerminatorSequence.lastIndex;
			postfixIncDec = false;
			if (KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken)) {
				lastSignificantToken = "?NoLineTerminatorHere";
			}
			yield ({
				type: "LineTerminatorSequence",
				value: match[0]
			});
			continue;
		}
		MultiLineComment.lastIndex = lastIndex;
		if (match = MultiLineComment.exec(input)) {
			lastIndex = MultiLineComment.lastIndex;
			if (Newline.test(match[0])) {
				postfixIncDec = false;
				if (KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken)) {
					lastSignificantToken = "?NoLineTerminatorHere";
				}
			}
			yield ({
				type: "MultiLineComment",
				value: match[0],
				closed: match[1] !== void 0
			});
			continue;
		}
		SingleLineComment.lastIndex = lastIndex;
		if (match = SingleLineComment.exec(input)) {
			lastIndex = SingleLineComment.lastIndex;
			postfixIncDec = false;
			yield ({
				type: "SingleLineComment",
				value: match[0]
			});
			continue;
		}
		firstCodePoint = String.fromCodePoint(input.codePointAt(lastIndex));
		lastIndex += firstCodePoint.length;
		lastSignificantToken = firstCodePoint;
		postfixIncDec = false;
		yield ({
			type: mode.tag.startsWith("JSX") ? "JSXInvalid" : "Invalid",
			value: firstCodePoint
		});
	}
	return void 0;
};

//#region src/js-tokens.ts
const FILL_COMMENT = " ";
function stripLiteralFromToken(token, fillChar, filter) {
	if (token.type === "SingleLineComment") return FILL_COMMENT.repeat(token.value.length);
	if (token.type === "MultiLineComment") return token.value.replace(/[^\n]/g, FILL_COMMENT);
	if (token.type === "StringLiteral") {
		if (!token.closed) return token.value;
		const body = token.value.slice(1, -1);
		if (filter(body)) return token.value[0] + fillChar.repeat(body.length) + token.value[token.value.length - 1];
	}
	if (token.type === "NoSubstitutionTemplate") {
		const body = token.value.slice(1, -1);
		if (filter(body)) return `\`${body.replace(/[^\n]/g, fillChar)}\``;
	}
	if (token.type === "RegularExpressionLiteral") {
		const body = token.value;
		if (filter(body)) return body.replace(/\/(.*)\/(\w?)$/g, (_, $1, $2) => `/${fillChar.repeat($1.length)}/${$2}`);
	}
	if (token.type === "TemplateHead") {
		const body = token.value.slice(1, -2);
		if (filter(body)) return `\`${body.replace(/[^\n]/g, fillChar)}\${`;
	}
	if (token.type === "TemplateTail") {
		const body = token.value.slice(0, -2);
		if (filter(body)) return `}${body.replace(/[^\n]/g, fillChar)}\``;
	}
	if (token.type === "TemplateMiddle") {
		const body = token.value.slice(1, -2);
		if (filter(body)) return `}${body.replace(/[^\n]/g, fillChar)}\${`;
	}
	return token.value;
}
function optionsWithDefaults(options) {
	return {
		fillChar: " ",
		filter: (() => true)
	};
}
/**
* Strip literal from code.
*/
function stripLiteral(code, options) {
	let result = "";
	const _options = optionsWithDefaults();
	for (const token of jsTokens$1(code, { jsx: false })) result += stripLiteralFromToken(token, _options.fillChar, _options.filter);
	return result;
}

// so people can reassign envs at runtime
// import.meta.env.VITE_NAME = 'app' -> process.env.VITE_NAME = 'app'
function MetaEnvReplacerPlugin() {
	return {
		name: "vitest:meta-env-replacer",
		enforce: "pre",
		transform(code, id) {
			if (!/\bimport\.meta\.env\b/.test(code)) return null;
			let s = null;
			const envs = stripLiteral(code).matchAll(/\bimport\.meta\.env\b/g);
			for (const env of envs) {
				s ||= new MagicString(code);
				const startIndex = env.index;
				const endIndex = startIndex + env[0].length;
				s.overwrite(startIndex, endIndex, `Object.assign(/* istanbul ignore next */ globalThis.__vitest_worker__?.metaEnv ?? import.meta.env)`);
			}
			if (s) return {
				code: s.toString(),
				map: s.generateMap({
					hires: "boundary",
					// Remove possible query parameters, e.g. vue's "?vue&type=script&src=true&lang.ts"
					source: cleanUrl(id)
				})
			};
		}
	};
}

const newLineRegExp = /\r?\n/;
const errCodeRegExp = /error TS(?<errCode>\d+)/;
async function makeTscErrorInfo(errInfo) {
	const [errFilePathPos = "", ...errMsgRawArr] = errInfo.split(":");
	if (!errFilePathPos || errMsgRawArr.length === 0 || errMsgRawArr.join("").length === 0) return ["unknown filepath", null];
	const errMsgRaw = errMsgRawArr.join("").trim();
	// get filePath, line, col
	const [errFilePath, errPos] = errFilePathPos.slice(0, -1).split("(");
	if (!errFilePath || !errPos) return ["unknown filepath", null];
	const [errLine, errCol] = errPos.split(",");
	if (!errLine || !errCol) return [errFilePath, null];
	// get errCode, errMsg
	const execArr = errCodeRegExp.exec(errMsgRaw);
	if (!execArr) return [errFilePath, null];
	const errCodeStr = execArr.groups?.errCode ?? "";
	if (!errCodeStr) return [errFilePath, null];
	const line = Number(errLine);
	const col = Number(errCol);
	const errCode = Number(errCodeStr);
	return [errFilePath, {
		filePath: errFilePath,
		errCode,
		line,
		column: col,
		errMsg: errMsgRaw.slice(`error TS${errCode} `.length)
	}];
}
async function getRawErrsMapFromTsCompile(tscErrorStdout) {
	const rawErrsMap = /* @__PURE__ */ new Map();
	(await Promise.all(tscErrorStdout.split(newLineRegExp).reduce((prev, next) => {
		if (!next) return prev;
		else if (next[0] !== " ") prev.push(next);
		else prev[prev.length - 1] += `\n${next}`;
		return prev;
	}, []).map((errInfoLine) => makeTscErrorInfo(errInfoLine)))).forEach(([errFilePath, errInfo]) => {
		if (!errInfo) return;
		if (!rawErrsMap.has(errFilePath)) rawErrsMap.set(errFilePath, [errInfo]);
		else rawErrsMap.get(errFilePath)?.push(errInfo);
	});
	return rawErrsMap;
}

// the V8 fatal output of a checker that ran out of memory
const OOM_OUTPUT_PATTERN = /JavaScript heap out of memory|Reached heap limit|Allocation failed/i;
class TypeCheckError extends Error {
	message;
	stacks;
	name = "TypeCheckError";
	constructor(message, stacks) {
		super(message);
		this.message = message;
		this.stacks = stacks;
	}
}
class Typechecker {
	project;
	_onParseStart;
	_onParseEnd;
	_onWatcherRerun;
	_result = {
		files: [],
		sourceErrors: [],
		time: 0
	};
	_startTime = 0;
	_output = "";
	_tests = {};
	process;
	files = [];
	constructor(project) {
		this.project = project;
	}
	setFiles(files) {
		this.files = files;
	}
	onParseStart(fn) {
		this._onParseStart = fn;
	}
	onParseEnd(fn) {
		this._onParseEnd = fn;
	}
	onWatcherRerun(fn) {
		this._onWatcherRerun = fn;
	}
	async collectFileTests(filepath) {
		return astCollectFileInformation(this.project, filepath, { pool: "typescript" });
	}
	getFiles() {
		return this.files;
	}
	async collectTests() {
		const tests = (await Promise.all(this.getFiles().map((filepath) => this.collectFileTests(filepath)))).reduce((acc, data) => {
			if (!data) return acc;
			acc[data.filepath] = data;
			return acc;
		}, {});
		this._tests = tests;
		return tests;
	}
	markPassed(file) {
		if (!file.result?.state) file.result = { state: "pass" };
		const markTasks = (tasks) => {
			for (const task of tasks) {
				if ("tasks" in task) markTasks(task.tasks);
				if (!task.result?.state && (task.mode === "run" || task.mode === "queued")) task.result = { state: "pass" };
			}
		};
		markTasks(file.tasks);
	}
	async prepareResults(output) {
		// Detect if tsc output is help text instead of error output
		// This happens when tsconfig.json is missing and tsc can't find any config
		if (output.includes("The TypeScript Compiler - Version") || output.includes("COMMON COMMANDS")) {
			const { typecheck } = this.project.config;
			const msg = `TypeScript compiler returned help text instead of type checking results.
This usually means the tsconfig file was not found.

Possible solutions:
  1. Ensure '${typecheck.tsconfig || "tsconfig.json"}' exists in your project root\n  2. If using a custom tsconfig, verify the path in your Vitest config:\n     test: { typecheck: { tsconfig: 'path/to/tsconfig.json' } }\n  3. Check that the tsconfig file is valid JSON`;
			throw new Error(msg);
		}
		const typeErrors = await this.parseTscLikeOutput(output);
		const testFiles = new Set(this.getFiles());
		if (!this._tests) this._tests = await this.collectTests();
		const sourceErrors = [];
		const files = [];
		testFiles.forEach((path) => {
			const { file, definitions, map, parsed } = this._tests[path];
			const errors = typeErrors.get(path);
			files.push(file);
			if (!errors) {
				this.markPassed(file);
				return;
			}
			const sortedDefinitions = [...definitions.sort((a, b) => b.start - a.start)];
			// has no map for ".js" files that use // @ts-check
			const traceMap = map && new TraceMap(map);
			const indexMap = createLocationsIndexMap(parsed);
			const markState = (task, state) => {
				task.result = { state: task.mode === "run" || task.mode === "only" ? state : task.mode };
				if (task.suite) markState(task.suite, state);
				else if (task.file && task !== task.file) markState(task.file, state);
			};
			errors.forEach(({ error, originalError }) => {
				const processedPos = traceMap ? findGeneratedPosition(traceMap, {
					line: originalError.line,
					column: originalError.column,
					source: basename(path)
				}) : originalError;
				const line = processedPos.line ?? originalError.line;
				const column = processedPos.column ?? originalError.column;
				const index = indexMap.get(`${line}:${column}`);
				const definition = index != null && sortedDefinitions.find((def) => def.start <= index && def.end >= index);
				const suite = definition ? definition.task : file;
				const state = suite.mode === "run" || suite.mode === "only" ? "fail" : suite.mode;
				const errors = suite.result?.errors || [];
				suite.result = {
					state,
					errors
				};
				errors.push(error);
				if (state === "fail") {
					if (suite.suite) markState(suite.suite, "fail");
					else if (suite.file && suite !== suite.file) markState(suite.file, "fail");
				}
			});
			this.markPassed(file);
		});
		typeErrors.forEach((errors, path) => {
			if (!testFiles.has(path)) sourceErrors.push(...errors.map(({ error }) => error));
		});
		return {
			files,
			sourceErrors,
			time: performance$1.now() - this._startTime
		};
	}
	async parseTscLikeOutput(output) {
		const errorsMap = await getRawErrsMapFromTsCompile(output);
		const typesErrors = /* @__PURE__ */ new Map();
		errorsMap.forEach((errors, path) => {
			const filepath = resolve(this.project.config.root, path);
			const suiteErrors = errors.map((info) => {
				const limit = Error.stackTraceLimit;
				Error.stackTraceLimit = 0;
				// Some expect-type errors have the most useful information on the second line e.g. `This expression is not callable.\n  Type 'ExpectString<number>' has no call signatures.`
				const errMsg = info.errMsg.replace(/\r?\n\s*(Type .* has no call signatures)/g, " $1");
				const error = new TypeCheckError(errMsg, [{
					file: filepath,
					line: info.line,
					column: info.column,
					method: ""
				}]);
				Error.stackTraceLimit = limit;
				return {
					originalError: info,
					error: {
						name: error.name,
						message: errMsg,
						stacks: error.stacks,
						stack: ""
					}
				};
			});
			typesErrors.set(filepath, suiteErrors);
		});
		return typesErrors;
	}
	async stop() {
		this.process?.kill();
		this.process = void 0;
	}
	async ensurePackageInstalled(ctx, checker) {
		if (checker !== "tsc" && checker !== "vue-tsc") return;
		const packageName = checker === "tsc" ? "typescript" : "vue-tsc";
		await ctx.packageInstaller.ensureInstalled(packageName, ctx.config.root);
	}
	getExitCode() {
		return this.process?.exitCode != null && this.process.exitCode;
	}
	getSignal() {
		return this.process?.signalCode ?? null;
	}
	getChecker() {
		return this.project.config.typecheck.checker;
	}
	getOutput() {
		return this._output;
	}
	async spawn() {
		const { root, watch, typecheck } = this.project.config;
		const args = ["--pretty", "false"];
		if (typecheck.build) args.unshift("--build");
		else args.push("--noEmit", "--incremental", "--tsBuildInfoFile", join(process.versions.pnp ? join(os__default.tmpdir(), this.project.hash) : distDir, "tsconfig.tmp.tsbuildinfo"));
		// use builtin watcher because it's faster
		if (watch) args.push("--watch");
		if (typecheck.allowJs) args.push("--allowJs", "--checkJs");
		if (typecheck.tsconfig) {
			if (!typecheck.build) args.push("-p");
			args.push(resolve(root, typecheck.tsconfig));
		}
		this._output = "";
		this._startTime = performance$1.now();
		const child = x(typecheck.checker, args, {
			nodeOptions: {
				cwd: root,
				stdio: "pipe"
			},
			throwOnError: false
		});
		this.process = child.process;
		let rerunTriggered = false;
		let dataReceived = false;
		return new Promise((resolve, reject) => {
			if (!child.process || !child.process.stdout) {
				reject(/* @__PURE__ */ new Error(`Failed to initialize ${typecheck.checker}. This is a bug in Vitest - please, open an issue with reproduction.`));
				return;
			}
			let resolved = false;
			child.process.stdout.on("data", (chunk) => {
				dataReceived = true;
				this._output += chunk;
				if (!watch) return;
				if (this._output.includes("File change detected") && !rerunTriggered) {
					this._onWatcherRerun?.();
					this._startTime = performance$1.now();
					this._result.sourceErrors = [];
					this._result.files = [];
					this._tests = null;
					rerunTriggered = true;
				}
				if (/Found \w+ errors*. Watching for/.test(this._output)) {
					rerunTriggered = false;
					this.prepareResults(this._output).then((result) => {
						this._result = result;
						this._onParseEnd?.(result);
					});
					this._output = "";
				}
			});
			// Also capture stderr for configuration errors like missing tsconfig
			child.process.stderr?.on("data", (chunk) => {
				this._output += chunk;
			});
			const timeout = setTimeout(() => reject(/* @__PURE__ */ new Error(`${typecheck.checker} spawn timed out`)), this.project.config.typecheck.spawnTimeout);
			let winTimeout;
			function onError(cause) {
				if (resolved) return;
				clearTimeout(timeout);
				clearTimeout(winTimeout);
				resolved = true;
				reject(new Error("Spawning typechecker failed - is typescript installed?", { cause }));
			}
			child.process.once("spawn", () => {
				this._onParseStart?.();
				child.process?.off("error", onError);
				clearTimeout(timeout);
				if (process.platform === "win32") {
					// on Windows, the process might be spawned but fail to start,
					// so we wait for the "close" event instead of resolving right away.
					// `start` awaits the process anyway; the watch process never exits,
					// so resolve it after a grace period
					if (watch) winTimeout = setTimeout(() => {
						resolved = true;
						resolve({ result: child });
					}, 200);
				} else {
					resolved = true;
					resolve({ result: child });
				}
			});
			if (process.platform === "win32") child.process.once("close", (code) => {
				// an OOM abort writes only to stderr, but the checker did start;
				// `start` awaits the process and reports the crash from its output
				if (code != null && code !== 0 && !dataReceived && !OOM_OUTPUT_PATTERN.test(this._output)) onError(/* @__PURE__ */ new Error(`The ${typecheck.checker} command exited with code ${code}.`));
				else if (!resolved) {
					clearTimeout(winTimeout);
					resolved = true;
					resolve({ result: child });
				}
			});
			child.process.once("error", onError);
		});
	}
	async start() {
		if (this.process) return;
		const { watch } = this.project.config;
		const { result: child } = await this.spawn();
		if (!watch) {
			await child;
			this._result = await this.prepareResults(this._output);
			await this._onParseEnd?.(this._result);
		}
	}
	getResult() {
		return this._result;
	}
	getTestFiles() {
		return Object.values(this._tests || {}).map((i) => i.file);
	}
	getTestPacksAndEvents() {
		const packs = [];
		const events = [];
		for (const { file } of Object.values(this._tests || {})) {
			const result = convertTasksToEvents(file);
			packs.push(...result.packs);
			events.push(...result.events);
		}
		return {
			packs,
			events
		};
	}
}
function findGeneratedPosition(traceMap, { line, column, source }) {
	const found = generatedPositionFor(traceMap, {
		line,
		column,
		source
	});
	if (found.line !== null) return found;
	// find the next source token position when the exact error position doesn't exist in source map.
	// this can happen, for example, when the type error is in the comment "// @ts-expect-error"
	// and comments are stripped away in the generated code.
	const mappings = [];
	eachMapping(traceMap, (m) => {
		if (m.source === source && m.originalLine !== null && m.originalColumn !== null && (line === m.originalLine ? column < m.originalColumn : line < m.originalLine)) mappings.push(m);
	});
	const next = mappings.sort((a, b) => a.originalLine === b.originalLine ? a.originalColumn - b.originalColumn : a.originalLine - b.originalLine).at(0);
	if (next) return {
		line: next.generatedLine,
		column: next.generatedColumn
	};
	return {
		line: null,
		column: null
	};
}

// use Logger with custom Console to capture entire error printing
function capturePrintError(error, ctx, options) {
	let output = "";
	const writable = new Writable({ write(chunk, _encoding, callback) {
		output += String(chunk);
		callback();
	} });
	const console = new Console(writable);
	return {
		nearest: printError(error, ctx, {
			error: console.error.bind(console),
			highlight: ctx.logger.highlight.bind(ctx.logger)
		}, {
			showCodeFrame: false,
			...options
		})?.nearest,
		output
	};
}
function printError(error, ctx, logger, options) {
	const project = options.project ?? ctx.coreWorkspaceProject ?? ctx.projects[0];
	return printErrorInner(error, project, {
		logger,
		type: options.type,
		showCodeFrame: options.showCodeFrame,
		screenshotPaths: options.screenshotPaths,
		printProperties: options.verbose,
		parseErrorStacktrace(error) {
			if (error.stacks) {
				if (options.fullStack) return error.stacks;
				else return error.stacks.filter((stack) => {
					return !stackIgnorePatterns.some((p) => stack.file.match(p));
				});
			}
			// browser stack trace needs to be processed differently,
			// so there is a separate method for that
			if (project.browser) return project.browser.parseErrorStacktrace(error, {
				frameFilter: project.config.onStackTrace,
				ignoreStackEntries: options.fullStack ? [] : void 0
			});
			// node.js stack trace already has correct source map locations
			return parseErrorStacktrace(error, {
				frameFilter: project.config.onStackTrace,
				ignoreStackEntries: options.fullStack ? [] : void 0
			});
		}
	});
}
function printErrorInner(error, project, options) {
	const { showCodeFrame = true, type, printProperties = true } = options;
	const logger = options.logger;
	let e = error;
	if (isPrimitive(e)) e = {
		message: String(error).split(/\n/g)[0],
		stack: String(error)
	};
	if (!e) {
		const error = /* @__PURE__ */ new Error("unknown error");
		e = {
			message: e ?? error.message,
			stack: error.stack
		};
	}
	// Error may have occurred even before the configuration was resolved
	if (!project) {
		printErrorMessage(e, logger);
		return;
	}
	const stacks = options.parseErrorStacktrace(e);
	const nearest = error instanceof TypeCheckError ? error.stacks[0] : stacks.find((stack) => {
		// we are checking that this module was processed by us at one point
		try {
			return Object.values(project.vite.environments || {}).some((environment) => {
				return [...environment.moduleGraph.getModulesByFile(stack.file)?.values() || []].some((module) => !!module.transformResult);
			}) && existsSync(stack.file);
		} catch {
			return false;
		}
	});
	if (type) printErrorType(type, project.vitest);
	printErrorMessage(e, logger);
	if (options.screenshotPaths?.length) {
		const uniqueScreenshots = Array.from(new Set(options.screenshotPaths));
		const length = uniqueScreenshots.length;
		logger.error(`\nFailure screenshot${length > 1 ? "s" : ""}:`);
		logger.error(uniqueScreenshots.map((p) => `  - ${$.dim(relative(process.cwd(), p))}`).join("\n"));
		if (!e.diff) logger.error();
	}
	if (e.codeFrame) logger.error(`${e.codeFrame}\n`);
	if ("__vitest_rollup_error__" in e) {
		// https://github.com/vitejs/vite/blob/95020ab49e12d143262859e095025cf02423c1d9/packages/vite/src/node/server/middlewares/error.ts#L25-L36
		const err = e.__vitest_rollup_error__;
		logger.error([
			err.plugin && `  Plugin: ${$.magenta(err.plugin)}`,
			err.id && `  File: ${$.cyan(err.id)}${err.loc ? `:${err.loc.line}:${err.loc.column}` : ""}`,
			err.frame && $.yellow(err.frame.split(/\r?\n/g).map((l) => ` `.repeat(2) + l).join(`\n`))
		].filter(Boolean).join("\n"));
	}
	// E.g. AssertionError from assert does not set showDiff but has both actual and expected properties
	if (e.diff) logger.error(`\n${e.diff}\n`);
	// if the error provide the frame
	if (e.frame) logger.error($.yellow(e.frame));
	else printStack(logger, project, stacks, nearest, printProperties ? getErrorProperties(e) : {}, (s) => {
		if (showCodeFrame && s === nearest && nearest) {
			const sourceCode = readFileSync(nearest.file, "utf-8");
			logger.error(generateCodeFrame(sourceCode.length > 1e5 ? sourceCode : logger.highlight(nearest.file, sourceCode), 4, s));
		}
	});
	const testPath = e.VITEST_TEST_PATH;
	const testName = e.VITEST_TEST_NAME;
	// testName has testPath inside
	if (testPath) logger.error($.red(`This error originated in "${$.bold(relative(project.config.root, testPath))}" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.`));
	if (testName) logger.error($.red(`The last test to run before this error was "${$.bold(testName)}". This means either:
- the error was thrown while Vitest was running this test, or
- the error was thrown after the test completed, and this was the most recent test at that point.`));
	if (e.cause != null) {
		let cause = e.cause;
		if (typeof cause !== "object" || cause === null) {
			const causeStr = String(cause);
			cause = {
				name: "Caused by",
				message: causeStr,
				stack: causeStr
			};
		} else if (!("name" in cause)) cause = {
			...cause,
			name: "Caused by"
		};
		else cause.name = `Caused by: ${cause.name}`;
		printErrorInner(cause, project, {
			showCodeFrame: false,
			logger: options.logger,
			parseErrorStacktrace: options.parseErrorStacktrace
		});
	}
	handleImportOutsideModuleError(e.stack || "", logger);
	return { nearest };
}
function printErrorType(type, ctx) {
	ctx.logger.error(`\n${errorBanner(type)}`);
}
const skipErrorProperties = /* @__PURE__ */ new Set([
	"cause",
	"stacks",
	"type",
	"showDiff",
	"ok",
	"operator",
	"diff",
	"codeFrame",
	"actual",
	"expected",
	"diffOptions",
	"runnerError",
	"sourceURL",
	"column",
	"line",
	"fileName",
	"lineNumber",
	"columnNumber",
	"VITEST_TEST_NAME",
	"VITEST_TEST_PATH",
	"__vitest_rollup_error__",
	"__vitest_error_context__",
	"__vitest_test_syntax_error__",
	...Object.getOwnPropertyNames(Error.prototype),
	...Object.getOwnPropertyNames(Object.prototype)
]);
function getErrorProperties(e) {
	const errorObject = Object.create(null);
	if (e.name === "AssertionError") return errorObject;
	for (const key of Object.getOwnPropertyNames(e))
 // print the original stack if it was ever changed manually by the user
	if (key === "stack" && e[key] != null && typeof e[key] !== "string") errorObject[key] = e[key];
	else if (key !== "stack" && !skipErrorProperties.has(key)) errorObject[key] = e[key];
	return errorObject;
}
const esmErrors = ["Cannot use import statement outside a module", "Unexpected token 'export'"];
function handleImportOutsideModuleError(stack, logger) {
	if (!esmErrors.some((e) => stack.includes(e))) return;
	const path = normalize(stack.split("\n")[0].trim());
	let name = path.split("/node_modules/").pop() || "";
	if (name[0] === "@") name = name.split("/").slice(0, 2).join("/");
	else name = name.split("/")[0];
	if (name) printModuleWarningForPackage(logger, path, name);
	else printModuleWarningForSourceCode(logger, path);
}
function printModuleWarningForPackage(logger, path, name) {
	logger.error($.yellow(`Module ${path} seems to be an ES Module but shipped in a CommonJS package. You might want to create an issue to the package ${$.bold(`"${name}"`)} asking them to ship the file in .mjs extension or add "type": "module" in their package.json.

As a temporary workaround you can try to inline the package by updating your config:

` + $.gray($.dim("// vitest.config.js")) + "\n" + $.green(`export default {
  test: {
    server: {
      deps: {
        inline: [
          ${$.yellow($.bold(`"${name}"`))}
        ]
      }
    }
  }
}\n`)));
}
function printModuleWarningForSourceCode(logger, path) {
	logger.error($.yellow(`Module ${path} seems to be an ES Module but shipped in a CommonJS package. To fix this issue, change the file extension to .mjs or add "type": "module" in your package.json.`));
}
function printErrorMessage(error, logger) {
	const errorName = error.name || "Unknown Error";
	if (!error.message) {
		logger.error(error);
		return;
	}
	if (error.message.length > 5e3)
 // Protect against infinite stack trace in tinyrainbow
	logger.error(`${$.red($.bold(errorName))}: ${error.message}`);
	else logger.error($.red(`${$.bold(errorName)}: ${error.message}`));
}
function printStack(logger, project, stack, highlight, errorProperties, onStack) {
	for (const frame of stack) {
		const color = frame === highlight ? $.cyan : $.gray;
		const path = relative(project.config.root, frame.file);
		logger.error(color(` ${$.dim(F_POINTER)} ${[frame.method, `${path}:${$.dim(`${frame.line}:${frame.column}`)}`].filter(Boolean).join(" ")}`));
		onStack?.(frame);
	}
	if (stack.length) logger.error();
	if (hasProperties(errorProperties)) {
		logger.error($.red($.dim(divider())));
		const propertiesString = inspect(errorProperties);
		logger.error($.red($.bold("Serialized Error:")), $.gray(propertiesString));
	}
}
function hasProperties(obj) {
	// oxlint-disable-next-line no-unreachable-loop
	for (const _key in obj) return true;
	return false;
}
function generateCodeFrame(source, indent = 0, loc, range = 2) {
	const start = typeof loc === "object" ? positionToOffset(source, loc.line, loc.column) : loc;
	const end = start;
	const lines = source.split(lineSplitRE);
	const nl = /\r\n/.test(source) ? 2 : 1;
	let count = 0;
	let res = [];
	const columns = process.stdout?.columns || 80;
	for (let i = 0; i < lines.length; i++) {
		count += lines[i].length + nl;
		if (count >= start) {
			for (let j = i - range; j <= i + range || end > count; j++) {
				if (j < 0 || j >= lines.length) continue;
				const lineLength = lines[j].length;
				const strippedContent = stripVTControlCharacters(lines[j]);
				if (strippedContent.startsWith("//# sourceMappingURL")) continue;
				// too long, maybe it's a minified file, skip for codeframe
				if (strippedContent.length > 200) return "";
				const truncatedLine = truncateString(lines[j].replace(/\t/g, " "), columns - 5 - indent).trimEnd();
				res.push(lineNo(j + 1) + (truncatedLine ? " " + truncatedLine : truncatedLine));
				if (j === i) {
					// push underline
					const pad = start - (count - lineLength) + (nl - 1);
					const length = Math.max(1, end > count ? lineLength - pad : end - start);
					res.push(lineNo() + " ".repeat(pad + 1) + $.red("^".repeat(length)));
				} else if (j > i) {
					if (end > count) {
						const length = Math.max(1, Math.min(end - count, lineLength));
						res.push(lineNo() + " " + $.red("^".repeat(length)));
					}
					count += lineLength + 1;
				}
			}
			break;
		}
	}
	if (indent) res = res.map((line) => " ".repeat(indent) + line);
	return res.join("\n");
}
function lineNo(no = "") {
	return $.gray(`${String(no).padStart(3, " ")}|`);
}

function MocksPlugins(options = {}) {
	const normalizedDistDir = normalize(distDir);
	return [hoistMocksPlugin({
		filter(id) {
			if (id.includes(normalizedDistDir)) return false;
			if (options.filter) return options.filter(id);
			return true;
		},
		codeFrameGenerator(node, id, code) {
			return generateCodeFrame(code, 4, node.start + 1);
		}
	}), automockPlugin()];
}

const metaUrlLength = 15;
const locationString = "self.location".padEnd(metaUrlLength, " ");
// Vite transforms new URL('./path', import.meta.url) to new URL('/path.js', import.meta.url)
// This makes "href" equal to "http://localhost:3000/path.js" in the browser, but if we keep it like this,
// then in tests the URL will become "file:///path.js".
// To battle this, we replace "import.meta.url" with "self.location" in the code to keep the browser behavior.
function NormalizeURLPlugin() {
	return {
		name: "vitest:normalize-url",
		enforce: "post",
		transform(code) {
			if (this.environment.name !== "client" || !code.includes("new URL") || !code.includes("import.meta.url")) return;
			const cleanString = stripLiteral(code);
			const assetImportMetaUrlRE = /\bnew\s+URL\s*\(\s*(?:'[^']+'|"[^"]+"|`[^`]+`)\s*,\s*(?:'' \+ )?import\.meta\.url\s*(?:,\s*)?\)/g;
			let updatedCode = code;
			let match;
			// oxlint-disable-next-line no-cond-assign
			while (match = assetImportMetaUrlRE.exec(cleanString)) {
				const { 0: exp, index } = match;
				const metaUrlIndex = index + exp.indexOf("import.meta.url");
				updatedCode = updatedCode.slice(0, metaUrlIndex) + locationString + updatedCode.slice(metaUrlIndex + metaUrlLength);
			}
			return {
				code: updatedCode,
				map: null
			};
		}
	};
}

class ServerModuleRunner extends ModuleRunner {
	environment;
	config;
	constructor(environment, transformService, config) {
		super({
			hmr: false,
			transport: { async invoke(event) {
				if (event.type !== "custom") throw new Error(`Vitest Module Runner doesn't support Vite HMR events.`);
				const { name, data } = event.data;
				if (name === "getBuiltins") return await environment.hot.handleInvoke(event);
				if (name !== "fetchModule") return { error: /* @__PURE__ */ new Error(`Unknown method: ${name}. Expected "fetchModule".`) };
				try {
					const result = await transformService.fetch(data[0], data[1], environment, false, data[2]);
					if ("tmp" in result) {
						const code = await readFile(result.tmp, "utf-8");
						return { result: {
							...result,
							code
						} };
					}
					return { result };
				} catch (error) {
					return { error };
				}
			} }
		}, new VitestModuleEvaluator());
		this.environment = environment;
		this.config = config;
	}
	async import(rawId) {
		const resolved = await this.environment.pluginContainer.resolveId(rawId, this.config.root);
		if (!resolved) return super.import(rawId);
		// Vite will make "@vitest/coverage-v8" into "@vitest/coverage-v8.js" url
		// instead of using an actual file path-like URL, so we resolve it here first
		const url = normalizeResolvedIdToUrl(this.environment, resolved.id);
		return super.import(url);
	}
}
// Override the SSR environment's runner so user `configureServer` hooks that
// call `server.environments.ssr.runner.import(...)` get Vitest's module runner.
function installSsrModuleRunner(server, transformService, config) {
	const ssrEnvironment = server.environments.ssr;
	if (!isRunnableDevEnvironment(ssrEnvironment)) return;
	const ssrRunner = new ServerModuleRunner(ssrEnvironment, transformService, config);
	Object.defineProperty(ssrEnvironment, "runner", {
		value: ssrRunner,
		writable: true,
		configurable: true
	});
}

// Runs `pre` so it sits before user plugins, whose `configureServer` hooks may
// rely on `server.environments.ssr.runner` being Vitest's module runner.
function SsrRunnerFixerPlugin(harness) {
	return {
		name: "vitest:ssr-module-runner-fixer",
		enforce: "pre",
		configureServer: {
			order: "pre",
			handler(server) {
				const vitest = harness.getVitest();
				installSsrModuleRunner(server, vitest._transformService, vitest.config);
			}
		}
	};
}

function VitestCorePlugin(harness) {
	return [
		{
			name: "vitest:config:append",
			enforce: "post",
			options() {
				this.meta.watchMode = false;
			},
			config: {
				order: "post",
				handler(viteConfig) {
					const root = resolve(viteConfig.test?.root || viteConfig.root || process.cwd());
					appendApiTokenFsDeny(viteConfig);
					return {
						base: "/",
						root,
						cacheDir: resolveTestCacheDir(root, viteConfig.test || {}, viteConfig.cacheDir),
						build: { 
						// Vitest doesn't use outputDir, but this value affects what folders are watched
						// https://github.com/vitejs/vite/pull/16453
emptyOutDir: false }
					};
				}
			},
			configResolved: {
				order: "post",
				handler(viteConfig) {
					// During resolution so Vite uses the real fs when watch is off (a cached
					// snapshot misses runtime-generated files); the default is applied later
					// by `resolveTestConfig`, hence the `??`.
					const server = viteConfig.server;
					if (!(viteConfig.test?.watch ?? configDefaults.watch)) server.watch = null;
					else {
						server.watch ??= {};
						// chokidar fsevents is unstable on macos when emitting the "ready" event
						if (process.platform === "darwin" && false);
					}
				}
			}
		},
		...CSSEnablerPlugin(),
		...MocksPlugins(),
		CoverageTransform(harness),
		VitestCoreResolver(),
		NormalizeURLPlugin(),
		MetaEnvReplacerPlugin(),
		SsrRunnerFixerPlugin(harness),
		{
			name: "vitest:ui-injector",
			enforce: "post",
			async configResolved(config) {
				if (normalizeUIOptions(config.test.ui).enabled) {
					await harness.packageInstaller.ensureInstalled("@vitest/ui", resolve(config.root), harness.version);
					const uiPlugin = (await import('@vitest/ui')).default(harness);
					// @ts-expect-error mutate readonly
					config.plugins.push(uiPlugin);
				}
			}
		}
	];
}

// `name` must stay unique per project, `projects` would redefine the whole
// workspace, and `root` would re-root the project onto the declaring config
const NON_INHERITED_OPTIONS = [
	"name",
	"projects",
	"root"
];
// the root `globalSetup` already runs once per test run; a non-root
// config (a shared config or a container) keeps it because nothing else runs it
const NON_INHERITED_ROOT_OPTIONS = [...NON_INHERITED_OPTIONS, "globalSetup"];
/**
* Every plugin that modifies the `test` config during Vite config resolution.
* Projects that share the declaring config's Vite server run the same hooks
* through `resolveTestOptions` instead of resolving through Vite.
*
* `project` is only set for inline projects that extend another config.
* `sharedServer` is only set by `resolveTestOptions`: it carries the values
* that are normally derived from the resolving config's Vite options, which
* a shared server resolved once for its whole cluster.
*/
function TestConfigPlugin(harness, captures, cliOptions, globalConfig, project, sharedServer) {
	let testConfig;
	const noExternal = [];
	const external = [];
	let noExternalAll = false;
	return [{
		// The CLI plugin overwrites config values with CLI options, making them
		// available in the next plugin. We have to do this via plugins because of watch mode.
		name: "vitest:config:cli",
		enforce: "pre",
		config: {
			order: "pre",
			handler(config) {
				const { browser, ...options } = cliOptions;
				const configUI = config.test?.ui;
				// We don't want to use Vite's merge because we want to OVERRIDE options
				// By default, Vite extends arrays, for example, but CLI options should have the priority
				config.test = deepMerge({}, config.test ?? {}, options);
				// `deepMerge` cannot merge a boolean `ui` with an object
				if (configUI != null && options.ui != null) config.test.ui = {
					...normalizeUIOptions(configUI),
					...normalizeUIOptions(options.ui)
				};
				// apply browser CLI options only if the config already has the browser config and not disabled manually,
				// but let the API create it for a root config without projects (the CLI can't set `provider` or `instances`)
				const createsRootBrowserConfig = !globalConfig && !config.test.projects && !!(browser?.provider || browser?.instances);
				if (browser && (config.test.browser || createsRootBrowserConfig) && (config.test.browser?.enabled !== false || browser.enabled)) config.test.browser = mergeConfig(config.test.browser ?? {}, browser);
				// an extending project removes the non-inherited values it doesn't
				// define itself before any other `config` hook can set them
				if (!project) return;
				// the project's own `tags` replace the inherited array so tags can be overridden
				if (project.options.test?.tags) config.test.tags = project.options.test.tags;
				const nonInheritedOptions = project.extendsTrueRootConfig ? NON_INHERITED_ROOT_OPTIONS : NON_INHERITED_OPTIONS;
				for (const key of nonInheritedOptions) if (project.options.test?.[key] !== void 0) config.test[key] = project.options.test[key];
				else delete config.test[key];
			}
		}
	}, {
		name: "vitest:test-config",
		config: {
			order: "post",
			handler(config) {
				config.test ??= {};
				testConfig = config.test;
				const moduleDirectories = testConfig.deps?.moduleDirectories || [];
				const envModuleDirectories = process.env.VITEST_MODULE_DIRECTORIES || process.env.npm_config_VITEST_MODULE_DIRECTORIES;
				if (envModuleDirectories) moduleDirectories.push(...envModuleDirectories.split(","));
				const normalized = moduleDirectories.map((dir) => {
					if (dir[0] !== "/") dir = `/${dir}`;
					if (!dir.endsWith("/")) dir += "/";
					return normalize(dir);
				});
				if (!normalized.includes("/node_modules/")) normalized.push("/node_modules/");
				testConfig.deps ??= {};
				testConfig.deps.moduleDirectories = normalized;
				const isBrowserEnabled = !!testConfig.browser?.enabled;
				if (config.define) delete config.define["import.meta.vitest"];
				// We inject the defines at runtime in non-browser tests,
				// but keep the original behaviour in the browser mode
				const resolvedTestConfig = testConfig;
				if (isBrowserEnabled) resolvedTestConfig.defines = {};
				else if (sharedServer) {
					resolvedTestConfig.defines = sharedServer.defines;
					resolvedTestConfig._scriptDefines = sharedServer.scriptDefines;
				} else {
					const { defines, scriptDefines } = deleteDefineConfig(config);
					resolvedTestConfig.defines = defines;
					resolvedTestConfig._scriptDefines = scriptDefines;
				}
				const apiRequested = !!(normalizeUIOptions(testConfig.ui).enabled || testConfig.api);
				const api = resolveApiServerConfig(testConfig, isBrowserEnabled ? harness._browserLastPort++ : defaultPort, harness.logger);
				testConfig.api = api;
				resolvedTestConfig._apiRequested = apiRequested;
				if (globalConfig) {
					api.token = globalConfig.api.token;
					api.tokenCreated = globalConfig.api.tokenCreated;
				}
			}
		},
		configEnvironment: {
			order: "post",
			handler(name, config) {
				if (name === "__vitest_vm__" || name === "__vitest__") return;
				// In browser mode the `client` environment is browser-managed
				if (name === "client" && testConfig.browser?.enabled) return;
				config.resolve ??= {};
				const envNoExternal = resolveViteResolveOptions("noExternal", config.resolve, testConfig.deps?.moduleDirectories);
				if (envNoExternal === true) noExternalAll = true;
				else if (envNoExternal.length) noExternal.push(...envNoExternal);
				const envExternal = resolveViteResolveOptions("external", config.resolve, testConfig.deps?.moduleDirectories);
				if (envExternal !== true && envExternal.length) external.push(...envExternal);
			}
		},
		configResolved: {
			order: "pre",
			handler(config) {
				const options = sharedServer?.moduleRunnerOptions ?? {
					inlineAll: noExternalAll,
					inline: noExternal,
					external
				};
				captures.moduleRunnerOptions = options;
				const testConfig = config.test;
				testConfig.server ??= {};
				testConfig.server.deps ??= {};
				if (testConfig.server.deps.inline !== true) {
					if (options.inlineAll) testConfig.server.deps.inline = true;
					else if (options.inline.length) {
						testConfig.server.deps.inline ??= [];
						testConfig.server.deps.inline.push(...options.inline);
					}
				}
				if (options.external.length) {
					testConfig.server.deps.external ??= [];
					testConfig.server.deps.external.push(...options.external);
				}
			}
		}
	}];
}
/**
* Applies the `test` mutations of `TestConfigPlugin` to a project that shares
* the declaring config's Vite server: the same hooks run on a bare config
* object instead of going through Vite's resolution.
*/
function resolveTestOptions(test, context) {
	const viteConfig = { test };
	const plugins = TestConfigPlugin(context.harness, {}, context.cliOptions, context.globalConfig, context.project, context.sharedServer);
	const env = {
		command: "serve",
		mode: test.mode || "test"
	};
	for (const plugin of plugins) {
		plugin.config?.handler(viteConfig, env);
		plugin.configResolved?.handler(viteConfig);
	}
	return viteConfig.test;
}
function resolveViteResolveOptions(key, options, moduleDirectories) {
	if (Array.isArray(options[key])) {
		// mergeConfig will merge a custom `true` into an array
		if (options[key].some((p) => p === true)) return true;
		return options[key].map((dep) => processWildcard(dep, moduleDirectories));
	} else if (typeof options[key] === "string" || options[key] instanceof RegExp) return [options[key]].map((dep) => processWildcard(dep, moduleDirectories));
	else if (typeof options[key] === "boolean") return true;
	return [];
}
function processWildcard(dep, moduleDirectories) {
	if (typeof dep !== "string") return dep;
	if (typeof dep === "string" && dep.includes("*")) {
		const directories = (moduleDirectories || ["/node_modules/"]).map((r) => escapeRegExp(r));
		return new RegExp(`(${directories.join("|")})${dep.replace(/\*/g, "[\\w/]+")}`);
	}
	return dep;
}

function ProjectRootPlugin(projectRoot) {
	return {
		name: "vitest:project-root",
		enforce: "pre",
		config: {
			order: "pre",
			handler(viteConfig) {
				// Vite resolves a relative root against the cwd, which is the root of the workspace
				viteConfig.root = viteConfig.root ? resolve(projectRoot, viteConfig.root) : projectRoot;
				if (viteConfig.test?.root) viteConfig.test.root = resolve(projectRoot, viteConfig.test.root);
			}
		}
	};
}
function WorkspaceVitestPlugin(harness, globalViteConfig) {
	return [
		{
			name: "vitest:project",
			enforce: "post",
			options() {
				this.meta.watchMode = false;
			},
			config(viteConfig) {
				const testConfig = viteConfig.test || {};
				const root = testConfig.root || viteConfig.root;
				appendApiTokenFsDeny(viteConfig);
				return {
					base: "/",
					root,
					cacheDir: resolveTestCacheDir(resolve(root || process.cwd()), testConfig, viteConfig.cacheDir),
					server: {
						open: false,
						fs: { allow: globalViteConfig.server.fs.allow }
					}
				};
			},
			configResolved(config) {
				// project servers never watch; the top-level server owns the watcher
				config.server.watch = null;
			}
		},
		SsrRunnerFixerPlugin(harness),
		MetaEnvReplacerPlugin(),
		...CSSEnablerPlugin(),
		CoverageTransform(harness),
		...ViteConfigPlugin(harness),
		...MocksPlugins(),
		VitestProjectResolver(harness),
		NormalizeURLPlugin()
	];
}

function getOutputFile(config, reporter) {
	if (!config?.outputFile) return;
	if (typeof config.outputFile === "string") return config.outputFile;
	return config.outputFile[reporter];
}
function createDefinesScript(define) {
	if (!define) return "";
	const serializedDefine = serializeDefine(define);
	if (serializedDefine === "{}") return "";
	return `
const defines = ${serializedDefine}
const metaDefines = {}
Object.keys(defines).forEach((key) => {
  if (key.startsWith('import.meta.env.')) {
    process.env[key.slice('import.meta.env.'.length)] = defines[key]
    return
  }
  if (key.startsWith('import.meta.')) {
    metaDefines[key.slice('import.meta.'.length)] = defines[key]
    return
  }
  const segments = key.split('.')
  let target = globalThis
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (i === segments.length - 1) {
      target[segment] = defines[key]
    } else {
      target = target[segment] || (target[segment] = {})
    }
  }
})
globalThis.__vitest_worker__.metaDefines = metaDefines
  `;
}
/**
* Like `JSON.stringify` but keeps raw string values as a literal
* in the generated code. For example: `"window"` would refer to
* the global `window` object directly.
*/
function serializeDefine(define) {
	const userDefine = {};
	for (const key in define) {
		// vitest sets this to avoid vite:client-inject plugin
		if (key === "process.env.NODE_ENV" && define[key] === "process.env.NODE_ENV") continue;
		userDefine[key] = define[key];
	}
	let res = `{`;
	const keys = Object.keys(userDefine).sort();
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const val = userDefine[key];
		res += `${JSON.stringify(key)}: ${handleDefineValue(val)}`;
		if (i !== keys.length - 1) res += `, `;
	}
	return `${res}}`;
}
function handleDefineValue(value) {
	if (typeof value === "undefined") return "undefined";
	if (typeof value === "string") return value;
	return JSON.stringify(value);
}

class BenchmarkManager {
	project;
	constructor(project) {
		this.project = project;
	}
	// Resolve a user-supplied path against the project root. Reject paths that
	// escape the project root: `bench.from()` accepts arbitrary input, and we
	// never want a benchmark file to be able to read or clobber files outside
	// the workspace.
	resolve(relativePath) {
		const root = this.project.config.root;
		const absolute = isAbsolute(relativePath) ? resolve(relativePath) : resolve(root, relativePath);
		const rootWithSep = root.endsWith("/") ? root : `${root}/`;
		if (absolute !== root && !absolute.startsWith(rootWithSep)) throw new Error(`Benchmark artifact path "${relativePath}" resolves outside the project root (${root}). Paths passed to \`writeResult\` and \`bench.from()\` must point inside the project.`);
		return absolute;
	}
	async readResult(relativePath) {
		const path = this.resolve(relativePath);
		if (!existsSync(path)) return null;
		return JSON.parse(await readFile(path, "utf-8"));
	}
	async writeResult(relativePath, data) {
		const absolute = this.resolve(relativePath);
		await mkdir(dirname(absolute), { recursive: true });
		await writeFile(absolute, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
	}
}

function serializeConfig(project) {
	const { config, globalConfig, viteConfig } = project;
	const optimizer = config.deps?.optimizer || {};
	return {
		// TODO: remove functions from environmentOptions
		environmentOptions: config.environmentOptions,
		isolate: config.isolate,
		maxWorkers: config.maxWorkers,
		base: config.base,
		logHeapUsage: config.logHeapUsage,
		runner: config.runner,
		bail: config.bail,
		defines: config.defines,
		chaiConfig: config.chaiConfig,
		taskTitleValueFormatTruncate: config.taskTitleValueFormatTruncate,
		setupFiles: config.setupFiles,
		allowOnly: config.allowOnly,
		testTimeout: config.testTimeout,
		testNamePattern: config.testNamePattern,
		hookTimeout: config.hookTimeout,
		clearMocks: config.clearMocks,
		mockReset: config.mockReset,
		restoreMocks: config.restoreMocks,
		unstubEnvs: config.unstubEnvs,
		unstubGlobals: config.unstubGlobals,
		maxConcurrency: config.maxConcurrency,
		pool: config.pool,
		expect: config.expect,
		snapshotSerializers: config.snapshotSerializers,
		api: {
			allowExec: config.api.allowExec,
			allowWrite: config.api.allowWrite
		},
		diff: serializeDiffOptions(config.diff),
		retry: config.retry,
		repeats: config.repeats,
		disableConsoleIntercept: config.disableConsoleIntercept,
		root: config.root,
		name: config.name,
		color: config.color,
		globals: config.globals,
		injectCjsGlobals: config.injectCjsGlobals,
		snapshotEnvironment: config.snapshotEnvironment,
		passWithNoTests: config.passWithNoTests,
		coverage: ((coverage) => {
			const reportsDirectory = resolve$1(globalConfig.root, coverage.reportsDirectory);
			return {
				reportsDirectory,
				coverageFilesDirectory: getCoverageFilesDirectory(reportsDirectory, globalConfig.shard),
				provider: coverage.provider,
				enabled: coverage.enabled,
				customProviderModule: "customProviderModule" in coverage ? coverage.customProviderModule : void 0,
				htmlDir: coverage.htmlDir,
				autoAttachSubprocess: coverage.autoAttachSubprocess ?? false
			};
		})(config.coverage),
		fakeTimers: config.fakeTimers,
		deps: {
			web: config.deps.web || {},
			optimizer: Object.entries(optimizer).reduce((acc, [name, option]) => {
				acc[name] = { enabled: option?.enabled ?? false };
				return acc;
			}, {}),
			interopDefault: config.deps.interopDefault,
			moduleDirectories: config.deps.moduleDirectories
		},
		snapshotOptions: {
			// TODO: store it differently, not on the config
			snapshotEnvironment: void 0,
			updateSnapshot: globalConfig.snapshotOptions.updateSnapshot,
			snapshotFormat: { ...globalConfig.snapshotOptions.snapshotFormat },
			expand: config.snapshotOptions.expand ?? globalConfig.snapshotOptions.expand
		},
		sequence: {
			shuffle: config.sequence.shuffle,
			concurrent: config.sequence.concurrent,
			// `seed` and `sequencer` drive cross-project file ordering, so they are
			// resolved from the root config and shared across all projects.
			seed: globalConfig.sequence.seed,
			hooks: config.sequence.hooks,
			setupFiles: config.sequence.setupFiles
		},
		inspect: globalConfig.inspect,
		inspectBrk: globalConfig.inspectBrk,
		inspector: globalConfig.inspector,
		detectAsyncLeaks: globalConfig.detectAsyncLeaks,
		watch: config.watch,
		includeTaskLocation: config.includeTaskLocation ?? globalConfig.includeTaskLocation,
		env: {
			...viteConfig?.env,
			...config.env
		},
		browser: ((browser) => {
			const provider = project.browser?.provider;
			return {
				name: browser.name,
				headless: browser.headless,
				ui: browser.ui,
				detailsPanelPosition: browser.detailsPanelPosition ?? "right",
				viewport: browser.viewport,
				screenshotFailures: browser.screenshotFailures,
				locators: {
					testIdAttribute: browser.locators.testIdAttribute,
					exact: browser.locators.exact,
					errorFormat: browser.locators.errorFormat
				},
				providerOptions: provider?.name === "playwright" ? { actionTimeout: provider?.options?.actionTimeout } : {},
				trackUnhandledErrors: browser.trackUnhandledErrors ?? true,
				importMapMocks: browser.importMapMocks,
				trace: browser.trace.mode,
				traceView: browser.traceView
			};
		})(config.browser),
		standalone: config.standalone,
		printConsoleTrace: config.printConsoleTrace ?? globalConfig.printConsoleTrace,
		benchmark: {
			enabled: config.benchmark.enabled,
			retainSamples: config.benchmark.retainSamples,
			provider: config.benchmark.provider,
			suppressExportGetterWarnings: config.benchmark.suppressExportGetterWarnings,
			projectName: config.benchmark.projectName
		},
		// the browser initialized them via `@vite/env` import
		serializedDefines: config.browser.enabled ? "" : project._serializedDefines || "",
		fsModuleCache: config.fsModuleCache ?? false,
		experimental: {
			importDurations: config.experimental.importDurations,
			viteModuleRunner: config.experimental.viteModuleRunner ?? true,
			nodeLoader: config.experimental.nodeLoader ?? true,
			recordDependencies: !!globalConfig.experimental.recordDependencies && !!globalConfig.cache,
			// browser mode records its own trace through `browser.traceView`
			traceTimeline: !!config.experimental.traceTimeline && !config.browser.enabled,
			openTelemetry: config.experimental.openTelemetry
		},
		tags: config.tags || [],
		tagsFilter: config.tagsFilter,
		strictTags: config.strictTags ?? true,
		mergeReportsLabel: config.mergeReportsLabel,
		slowTestThreshold: config.slowTestThreshold ?? globalConfig.slowTestThreshold ?? configDefaults.slowTestThreshold,
		disableColors: isAgent && !isForceColor(),
		attachmentsDir: config.attachmentsDir
	};
}
const serializableDiffKeys = [
	"aAnnotation",
	"aIndicator",
	"bAnnotation",
	"bIndicator",
	"commonIndicator",
	"contextLines",
	"emptyFirstOrLastLinePlaceholder",
	"expand",
	"includeChangeCounts",
	"omitAnnotationLines",
	"printBasicPrototype",
	"maxDepth",
	"truncateThreshold",
	"truncateAnnotation"
];
// `diff` can be an inline object containing color/compareKeys functions
// (`DiffOptions`). Those functions are not structured-cloneable (threads pool)
// and are silently dropped over `child_process` IPC (forks pool), so passing
// the raw object to workers throws `DataCloneError`. Forward only the
// serializable fields declared by `SerializedDiffOptions`, and only the ones
// actually set — explicit `undefined` values would override the diff defaults
// when the worker merges the options. The function-based options still
// require the file-path form, which workers import locally.
function serializeDiffOptions(diff) {
	if (diff == null || typeof diff === "string") return diff;
	const result = {};
	for (const key of serializableDiffKeys) if (diff[key] !== void 0) result[key] = diff[key];
	return result;
}

async function loadGlobalSetupFiles(runner, globalSetup) {
	const globalSetupFiles = toArray(globalSetup);
	return Promise.all(globalSetupFiles.map((file) => loadGlobalSetupFile(file, runner)));
}
async function loadGlobalSetupFile(file, runner) {
	const m = await runner.import(file);
	for (const exp of [
		"default",
		"setup",
		"teardown"
	]) if (m[exp] != null && typeof m[exp] !== "function") throw new Error(`invalid export in globalSetup file ${file}: ${exp} must be a function`);
	if (m.default) return {
		file,
		setup: m.default
	};
	else if (m.setup || m.teardown) return {
		file,
		setup: m.setup,
		teardown: m.teardown
	};
	else throw new Error(`invalid globalSetup file ${file}. Must export setup, teardown or have a default export`);
}

function getWorkerMemoryLimit(config) {
	if (config.vmMemoryLimit) return config.vmMemoryLimit;
	return 1 / config.maxWorkers;
}
/**
* Converts a string representing an amount of memory to bytes.
*
* @param input The value to convert to bytes.
* @param percentageReference The reference value to use when a '%' value is supplied.
*/
function stringToBytes(input, percentageReference) {
	if (input === null || input === void 0) return input;
	if (typeof input === "string") {
		if (Number.isNaN(Number.parseFloat(input.slice(-1)))) {
			let [, numericString, trailingChars] = input.match(/(.*?)([^0-9.-]+)$/) || [];
			if (trailingChars && numericString) {
				const numericValue = Number.parseFloat(numericString);
				trailingChars = trailingChars.toLowerCase();
				switch (trailingChars) {
					case "%":
						input = numericValue / 100;
						break;
					case "kb":
					case "k": return numericValue * 1e3;
					case "kib": return numericValue * 1024;
					case "mb":
					case "m": return numericValue * 1e3 * 1e3;
					case "mib": return numericValue * 1024 * 1024;
					case "gb":
					case "g": return numericValue * 1e3 * 1e3 * 1e3;
					case "gib": return numericValue * 1024 * 1024 * 1024;
				}
			}
		} else input = Number.parseFloat(input);
	}
	if (typeof input === "number") {
		if (input <= 1 && input > 0) {
			if (percentageReference) return Math.floor(input * percentageReference);
			else throw new Error("For a percentage based memory limit a percentageReference must be supplied");
		} else if (input > 1) return Math.floor(input);
		else throw new Error("Unexpected numerical input for \"memoryLimit\"");
	}
	return null;
}

class FilesNotFoundError extends Error {
	code = "VITEST_FILES_NOT_FOUND";
	constructor() {
		super(`No test files found`);
	}
}
class GitNotFoundError extends Error {
	code = "VITEST_GIT_NOT_FOUND";
	constructor() {
		super("Could not find Git root. Have you initialized git with `git init`?");
	}
}
class GitCommandError extends Error {
	code = "VITEST_GIT_COMMAND_FAILED";
	constructor(args, stderr) {
		super(`Command \`git ${args.join(" ")}\` failed:\n${stderr}`);
	}
}
class BrowserConnectionError extends Error {
	code = "VITEST_BROWSER_CONNECTION_CLOSED";
}
class LocationFilterFileNotFoundError extends Error {
	code = "VITEST_LOCATION_FILTER_FILE_NOT_FOUND";
	constructor(filename) {
		super(`Couldn't find file ${filename}. Note when specifying the test location you have to specify the full test filename.`);
	}
}
class IncludeTaskLocationDisabledError extends Error {
	code = "VITEST_INCLUDE_TASK_LOCATION_DISABLED";
	constructor() {
		super("Received line number filters while `includeTaskLocation` option is disabled");
	}
}
class RangeLocationFilterProvidedError extends Error {
	code = "VITEST_RANGE_LOCATION_FILTER_PROVIDED";
	constructor(filter) {
		super(`Found "-" in location filter ${filter}.  Note that range location filters are not supported.  Consider specifying the exact line numbers of your tests.`);
	}
}

const debug$1 = createDebugger("vitest:browser:pool");
const PROVIDER_CLOSE_TIMEOUT = 3e4;
function createBrowserPool(vitest) {
	// every browser instance is a worker; at most `maxWorkers` of them are open
	const workers = /* @__PURE__ */ new Map();
	const activeWorkers = /* @__PURE__ */ new Set();
	const queue = [];
	const exitPromises = /* @__PURE__ */ new Set();
	let maxWorkers = 1;
	let exclusiveRunning = false;
	function getThreadsCount(project) {
		if (!project.config.browser.headless || !project.browser?.provider?.supportsParallelism) return 1;
		const { maxWorkers, providedOptions } = project.config;
		if (providedOptions.maxWorkers) return maxWorkers;
		// if there are more than ~12 threads (optimistically), the main thread chokes
		// https://github.com/vitest-dev/vitest/issues/7871
		return Math.min(12, maxWorkers);
	}
	// `maxWorkers` is also the budget of pages shared by the active instances:
	// every instance gets a fair share, and pages above the core count only
	// add contention and memory
	function getPageAllowance(worker) {
		let openPages = 0;
		for (const active of activeWorkers) openPages += active.pageCount;
		const share = Math.ceil(maxWorkers / Math.max(activeWorkers.size, 1));
		const free = Math.max(0, maxWorkers - openPages);
		return Math.max(1, Math.min(worker.maxPages, share, worker.pageCount + free));
	}
	function stopWorker(worker) {
		workers.delete(worker.project);
		const exit = worker.stop({ keepWarm: true }).catch((error) => {
			vitest.logger.error(`Failed to close the browser for the "${worker.project.name}" project.`, error);
		}).finally(() => {
			exitPromises.delete(exit);
		});
		exitPromises.add(exit);
	}
	// the user watches the pages of a headed instance, so it stays open
	function canEvict(project) {
		return project.config.browser.headless;
	}
	function countEvictableWorkers() {
		let count = 0;
		for (const worker of workers.values()) if (canEvict(worker.project)) count++;
		return count;
	}
	function evictIdleWorker(except) {
		// the map keeps the least recently used worker first
		for (const worker of workers.values()) if (worker !== except && !activeWorkers.has(worker) && canEvict(worker.project)) {
			debug$1?.("closing the idle browser of %s to free a worker slot", worker.project.name);
			stopWorker(worker);
			return true;
		}
		return false;
	}
	// an instance that still has an idle browser runs first, so a slot
	// is not freed by closing the browser of an instance that runs next
	function nextTaskIndex() {
		const head = queue[0];
		const index = queue.findIndex((task) => {
			const worker = workers.get(task.project);
			return task.exclusive === head.exclusive && !!worker && !activeWorkers.has(worker);
		});
		return index === -1 ? 0 : index;
	}
	function schedule() {
		while (queue.length) {
			if (exclusiveRunning || activeWorkers.size >= maxWorkers) return;
			const index = nextTaskIndex();
			const task = queue[index];
			if (task.exclusive && activeWorkers.size > 0) return;
			let worker = workers.get(task.project);
			if (worker && activeWorkers.has(worker)) return;
			const required = worker || !canEvict(task.project) ? 0 : 1;
			while (countEvictableWorkers() + required > maxWorkers) if (!evictIdleWorker(worker)) break;
			if (!worker) {
				debug$1?.("creating a worker for project %s", task.project.name);
				worker = new BrowserWorker(task.project, {
					getMaxPages: getThreadsCount,
					getPageAllowance
				});
				workers.set(task.project, worker);
			}
			queue.splice(index, 1);
			activeWorkers.add(worker);
			exclusiveRunning = task.exclusive;
			const current = worker;
			worker.runTests(task.method, task.files).then(() => task.result.resolve(), (error) => task.result.reject(error)).finally(() => {
				activeWorkers.delete(current);
				exclusiveRunning = false;
				workers.delete(current.project);
				workers.set(current.project, current);
				schedule();
				// the finished instance released its share of the page budget
				activeWorkers.forEach((active) => active.grow());
			});
		}
	}
	function cancel() {
		for (const task of queue.splice(0)) task.result.resolve();
		workers.forEach((worker) => worker.cancel());
	}
	async function runTests(method, specs, options) {
		maxWorkers = options.maxWorkers;
		let isCancelled = false;
		vitest.onCancel(() => {
			isCancelled = true;
			cancel();
		});
		const groupedFiles = await groupSpecifications(specs);
		const tasks = await Promise.all(Array.from(groupedFiles.entries(), async ([project, files]) => {
			await project._initBrowserProvider();
			const provider = project.browser?.provider;
			if (!provider) throw new TypeError(`The browser was not initialized${project.name ? ` for the "${project.name}" project` : ""}. This is a bug in Vitest. Please, open a new issue with reproduction.`);
			if (isCancelled) return;
			debug$1?.("provider is ready for %s project", project.name);
			vitest.state.clearFiles(project, files.map((f) => f.filepath));
			return {
				project,
				files,
				method,
				exclusive: !provider.supportsParallelism || !provider.mocker && project.config.browser.importMapMocks !== true,
				result: createDefer()
			};
		}));
		if (isCancelled) return;
		const parallelTasks = [];
		const exclusiveTasks = [];
		for (const task of tasks) {
			if (!task) return;
			if (task.exclusive) exclusiveTasks.push(task);
			else parallelTasks.push(task);
		}
		// exclusive instances go last so they don't stall the parallel ones
		const ordered = [...parallelTasks, ...exclusiveTasks];
		queue.push(...ordered);
		schedule();
		const errors = (await Promise.allSettled(ordered.map((task) => task.result))).filter((result) => result.status === "rejected").map((result) => result.reason);
		if (errors.length === 1) throw errors[0];
		if (errors.length > 1) throw new AggregateError(errors, "Errors occurred while running browser tests.");
	}
	async function close() {
		for (const task of queue.splice(0)) task.result.resolve();
		const stopping = Array.from(workers.values(), (worker) => worker.stop());
		workers.clear();
		activeWorkers.clear();
		await Promise.all([...stopping, ...exitPromises]);
		// pages can be opened outside of the pool (`vitest.standalone`)
		await Promise.all(vitest.projects.map((project) => closeProvider(project)));
		vitest._browserSessions.sessionIds.forEach((sessionId) => {
			vitest._browserSessions.close(sessionId);
		});
		vitest.projects.forEach((project) => {
			project.browser?.state.orchestrators.forEach((orchestrator) => {
				orchestrator.$close();
			});
		});
		debug$1?.("browser pool closed all providers");
	}
	return {
		runTests,
		close
	};
}
async function groupSpecifications(specs) {
	const groupedFiles = /* @__PURE__ */ new Map();
	// browser instances of a project share the same test files
	const code = /* @__PURE__ */ new Map();
	const docblocks = await Promise.all(specs.map((spec) => getSpecificationDocblock(spec, code)));
	specs.forEach((spec, index) => {
		const { project, moduleId, testLines, testIds, testNames, testNamePattern, testTagsFilter } = spec;
		const files = groupedFiles.get(project) || [];
		files.push({
			filepath: moduleId,
			testLocations: testLines,
			testIds,
			testNames,
			testNamePattern,
			testTagsFilter,
			fileTags: docblocks[index].tags
		});
		groupedFiles.set(project, files);
	});
	return groupedFiles;
}
async function closeProvider(project, options) {
	const browser = project.browser;
	if (!browser?.provider) return;
	debug$1?.("closing the browser provider of %s", project.name);
	// a frozen or crashed browser never answers the close message;
	// don't wait for it forever, the browser process is killed
	// when this process exits anyway
	let timer;
	await Promise.race([browser.closeBrowserProvider(options).finally(() => clearTimeout(timer)), new Promise((resolve) => {
		timer = setTimeout(() => {
			project.vitest.logger.warn(`The browser did not close within ${PROVIDER_CLOSE_TIMEOUT}ms. The browser process will be killed when the process exits.`);
			resolve();
		}, PROVIDER_CLOSE_TIMEOUT);
		timer.unref();
	})]);
}
function escapePathToRegexp(path) {
	return path.replace(/[/\\.?*()^${}|[\]+]/g, "\\$&");
}
class BrowserWorker {
	project;
	options;
	_queue = [];
	_method = "run";
	_promise;
	_error;
	_providedContext;
	// every page this worker opened or adopted, busy ones are running a file
	sessions = /* @__PURE__ */ new Set();
	busySessions = /* @__PURE__ */ new Set();
	openingSessions = /* @__PURE__ */ new Set();
	readySessions;
	started = false;
	_maxPages = 1;
	_parallel = false;
	_traces;
	_otel;
	constructor(project, options) {
		this.project = project;
		this.options = options;
		this._traces = project.vitest._traces;
		this._otel = this._traces.startContextSpan("vitest.browser");
		this._otel.span.setAttributes({
			"vitest.project": project.name,
			"vitest.browser.provider": project.config.browser.provider?.name
		});
		this.readySessions = project._browserReadySessions;
	}
	cancel() {
		this._queue = [];
		this._otel.span.end();
	}
	reject(error, sessionId) {
		// if user cancels the test run manually, ignore the error and exit gracefully
		if (!this.project.vitest.isCancelling || !(error instanceof BrowserConnectionError)) this._error ??= error;
		if (sessionId) this.busySessions.delete(sessionId);
		this.cancel();
		// other pages finish the file they are running first
		if (!this.busySessions.size) this.settle();
	}
	settle() {
		const promise = this._promise;
		const error = this._error;
		this._promise = void 0;
		this._error = void 0;
		this._otel.span.end();
		if (error) promise?.reject(error);
		else promise?.resolve();
	}
	get orchestrators() {
		return this.project.browser.state.orchestrators;
	}
	get pageCount() {
		return this.sessions.size;
	}
	get maxPages() {
		return this._maxPages;
	}
	async runTests(method, files) {
		const promise = this._promise ??= createDefer();
		if (!files.length) {
			debug$1?.("no tests found, finishing test run immediately");
			promise.resolve();
			return promise;
		}
		this._method = method;
		this._queue.push(...files);
		// the provider is closed when the pool frees the slot of an idle instance,
		// so a worker that reopens the instance starts a new one
		await this.project._initBrowserProvider();
		if (!this._queue.length) {
			debug$1?.("the run was cancelled while the provider was starting");
			this._promise = void 0;
			promise.resolve();
			return promise;
		}
		this.started = true;
		this._maxPages = this.options.getMaxPages(this.project);
		// decided once per instance: the budget can add pages later, and a provider
		// that cannot share state between pages (persistent context) needs to know upfront
		this._parallel = this._maxPages > 1;
		this._providedContext = stringify(this.project.getProvidedContext());
		for (const sessionId of [...this.readySessions]) {
			if (!this._queue.length) break;
			this.readySessions.delete(sessionId);
			// the page was closed while it was idle
			if (!this.orchestrators.has(sessionId)) {
				this.sessions.delete(sessionId);
				continue;
			}
			this.sessions.add(sessionId);
			this.runNextTest(method, sessionId);
		}
		await this.openPages().catch((error) => this.reject(error));
		debug$1?.("all sessions are created");
		return promise;
	}
	// opens more pages when the budget allows it, e.g. after another instance finished
	grow() {
		if (!this.started || !this._promise || !this._queue.length) return;
		this.openPages().catch((error) => this.reject(error));
	}
	// a page that was closed or crashed is gone from the orchestrators,
	// but this worker would still count it as open
	pruneClosedSessions() {
		for (const sessionId of this.sessions) {
			if (this.openingSessions.has(sessionId) || this.busySessions.has(sessionId)) continue;
			if (!this.readySessions.has(sessionId) || !this.orchestrators.has(sessionId)) {
				debug$1?.("[%s] the page is closed, forgetting the session", sessionId);
				this.sessions.delete(sessionId);
				this.readySessions.delete(sessionId);
			}
		}
	}
	async openPages() {
		const method = this._method;
		this.pruneClosedSessions();
		// open the minimum amount of tabs
		// if there is only 1 file running, we don't need 8 tabs running
		const allowance = this.options.getPageAllowance(this);
		// pages that are still opening will take the next queued files
		const unassigned = this._queue.length - this.openingSessions.size;
		const count = Math.min(allowance - this.sessions.size, unassigned);
		if (count <= 0) {
			debug$1?.("all pages are open, not creating more");
			return;
		}
		const parallel = this._parallel;
		const promises = [];
		for (let i = 0; i < count; i++) {
			const sessionId = crypto.randomUUID();
			this.sessions.add(sessionId);
			this.openingSessions.add(sessionId);
			const project = this.project.name;
			debug$1?.("[%s] creating session for %s", sessionId, project);
			const page = this._traces.$(`vitest.browser.open`, {
				context: this._otel.context,
				attributes: { "vitest.browser.session_id": sessionId }
			}, () => this.openPage(sessionId, { parallel })).then(() => {
				this.openingSessions.delete(sessionId);
				// start running tests on the page when it's ready
				this.runNextTest(method, sessionId);
			}, (error) => {
				this.openingSessions.delete(sessionId);
				this.sessions.delete(sessionId);
				throw error;
			});
			promises.push(page);
		}
		await Promise.all(promises);
	}
	async stop(options) {
		this.cancel();
		const sessions = this.project.vitest._browserSessions;
		const sessionIds = [...this.sessions];
		const orchestrators = sessionIds.map((sessionId) => {
			const orchestrator = this.orchestrators.get(sessionId);
			this.orchestrators.delete(sessionId);
			sessions.destroySession(sessionId);
			return orchestrator;
		});
		this.sessions.clear();
		this.busySessions.clear();
		this.readySessions.clear();
		await closeProvider(this.project, options);
		sessionIds.forEach((sessionId) => sessions.close(sessionId));
		orchestrators.forEach((orchestrator) => orchestrator?.$close());
	}
	async openPage(sessionId, options) {
		await this.project._openBrowserPage(sessionId, {
			reject: (error) => this.reject(error, sessionId),
			parallel: options.parallel
		});
	}
	// stable slot id (1..maxWorkers) assigned to each session/orchestrator on its
	// first run, exposed to the test runner as both `concurrencyId` and `workerId`.
	// the id lives on the session, so it is freed when the session disconnects, and
	// the used set is derived from the live orchestrators, so it stays within maxWorkers
	getConcurrencyId(sessionId) {
		const sessions = this.project.vitest._browserSessions;
		const session = sessions.getSession(sessionId);
		if (session?.concurrencyId) return session.concurrencyId;
		const used = /* @__PURE__ */ new Set();
		for (const id of this.sessions) {
			const concurrencyId = sessions.getSession(id)?.concurrencyId;
			if (concurrencyId) used.add(concurrencyId);
		}
		let concurrencyId = 1;
		while (used.has(concurrencyId)) concurrencyId++;
		if (session) session.concurrencyId = concurrencyId;
		return concurrencyId;
	}
	getOrchestrator(sessionId) {
		const orchestrator = this.orchestrators.get(sessionId);
		if (!orchestrator) throw new Error(`Orchestrator not found for session ${sessionId}. This is a bug in Vitest. Please, open a new issue with reproduction.`);
		return orchestrator;
	}
	finishSession(sessionId) {
		this.busySessions.delete(sessionId);
		this.readySessions.add(sessionId);
		// the last page finished running tests
		if (!this.busySessions.size) {
			this.settle();
			debug$1?.("[%s] all tests finished running", sessionId);
		} else debug$1?.(`did not finish sessions for ${sessionId}: |busy - %s| |overall - %s|`, [...this.busySessions].join(", "), [...this.sessions].join(", "));
	}
	runNextTest(method, sessionId) {
		const file = this._queue.shift();
		if (!file) {
			debug$1?.("[%s] no more tests to run", sessionId);
			// we don't need to cleanup testers if isolation is enabled,
			// because cleanup is done at the end of every test
			if (this.project.config.isolate) {
				this.finishSession(sessionId);
				return;
			}
			this.getOrchestrator(sessionId).cleanupTesters().catch((error) => this.reject(error)).finally(() => this.finishSession(sessionId));
			return;
		}
		if (!this._promise) throw new Error(`Unexpected empty queue`);
		const orchestrator = this.getOrchestrator(sessionId);
		this.busySessions.add(sessionId);
		debug$1?.("[%s] run test %s", sessionId, file);
		// warm the transform cache while the iframe is booting so the test
		// file import doesn't wait for the transform; mirrors the URL the
		// tester will request (see `importFile` in the browser runner)
		const fileUrl = `/${/^\w:/.test(file.filepath) ? "@fs/" : ""}${file.filepath}`.replace(/\/+/g, "/");
		this.project.vite.transformRequest(fileUrl).catch(() => {});
		this.setBreakpoint(sessionId, file.filepath).then(() => {
			this._traces.$(`vitest.browser.run`, {
				context: this._otel.context,
				attributes: { "code.file.path": file.filepath }
			}, async () => {
				const concurrencyId = this.getConcurrencyId(sessionId);
				return orchestrator.createTesters({
					method,
					files: [file],
					// this will be parsed by the test iframe, not the orchestrator
					// so we need to stringify it first to avoid double serialization
					providedContext: this._providedContext || "[{}]",
					otelCarrier: this._traces.getContextCarrier(),
					concurrencyId,
					// in the browser there is a single tab per orchestrator,
					// so the worker id matches the concurrency slot
					workerId: concurrencyId
				});
			}).then(async () => {
				debug$1?.("[%s] test %s finished running", sessionId, file);
				await maybeCollectChromiumGarbage(this.project, sessionId);
				this.runNextTest(method, sessionId);
			}).catch((error) => {
				// if user cancels the test run manually, ignore the error and exit gracefully
				if (this.project.vitest.isCancelling && error instanceof BrowserConnectionError) {
					debug$1?.("[%s] browser connection was closed", sessionId);
					this.reject(error, sessionId);
					return;
				}
				debug$1?.("[%s] error during %s test run: %s", sessionId, file, error);
				this.reject(new Error(`Failed to run the test ${file.filepath}.`, { cause: error }), sessionId);
			});
		}).catch((err) => this.reject(err, sessionId));
	}
	async setBreakpoint(sessionId, file) {
		if (!this.project.config.inspector.waitForDebugger) return;
		const provider = this.project.browser?.provider;
		if (!provider) return;
		const browser = this.project.config.browser.name;
		if (shouldIgnoreDebugger(provider.name, browser)) {
			debug$1?.("[$s] ignoring debugger in %s browser because it is not supported", sessionId, browser);
			return;
		}
		if (!provider.getCDPSession) throw new Error("Unable to set breakpoint, CDP not supported");
		debug$1?.("[%s] set breakpoint for %s", sessionId, file);
		const session = await provider.getCDPSession(sessionId);
		await session.send("Debugger.enable", {});
		await session.send("Debugger.setBreakpointByUrl", {
			lineNumber: 0,
			urlRegex: escapePathToRegexp(file)
		});
	}
}
function shouldIgnoreDebugger(provider, browser) {
	if (provider === "webdriverio") return browser !== "chrome" && browser !== "edge";
	return browser !== "chromium";
}
// Best-effort workaround for chromium/playwright bug
// https://issues.chromium.org/issues/530892387
// Trigger gc on lower disk (default to 4GB)
const chromiumGCDiskThreshold = process.env.VITEST_CHROMIUM_GC_DISK_THRESHOLD_GB ? Number(process.env.VITEST_CHROMIUM_GC_DISK_THRESHOLD_GB) * 1024 ** 3 : 4 * 1024 ** 3;
const forceChromiumGC = !!process.env.VITEST_CHROMIUM_GC_FORCE;
const debugGC = createDebugger("vitest:browser:gc");
async function maybeCollectChromiumGarbage(project, sessionId) {
	// trigger only on linux/chromium/playwright
	const provider = project.browser?.provider;
	if (!provider || !forceChromiumGC && process.platform !== "linux" || provider.name !== "playwright" || project.config.browser.name !== "chromium" || !project.config.isolate || !provider.getCDPSession) return;
	const start = performance.now();
	const diagnostics = {
		statfsBeforeMs: void 0,
		statfsAfterMs: void 0,
		cdpSessionMs: void 0,
		cdpSendMs: void 0,
		cdpDetachMs: void 0,
		forced: forceChromiumGC
	};
	try {
		// Playwright enables --disable-dev-shm-usage by default, which makes
		// Chromium use TMPDIR or /tmp for shared memory files.
		// https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/chromium/chromiumSwitches.ts
		// https://source.chromium.org/chromium/chromium/src/+/main:base/files/file_util_posix.cc
		const tempDirectory = process.env.TMPDIR || "/tmp";
		let operationStart = performance.now();
		const fsStats = statfsSync(tempDirectory);
		diagnostics.statfsBeforeMs = performance.now() - operationStart;
		const available = fsStats.bavail * fsStats.bsize;
		diagnostics.availableBytesBefore = available.toString();
		diagnostics.thresholdBytes = chromiumGCDiskThreshold.toString();
		diagnostics.tempDirectory = tempDirectory;
		diagnostics.triggered = available < chromiumGCDiskThreshold;
		if (available >= chromiumGCDiskThreshold) return;
		operationStart = performance.now();
		// `detach` is available only internally and not on CDPSession type
		const cdp = await provider.getCDPSession(sessionId);
		diagnostics.cdpSessionMs = performance.now() - operationStart;
		try {
			operationStart = performance.now();
			await cdp.send("HeapProfiler.collectGarbage");
			diagnostics.cdpSendMs = performance.now() - operationStart;
		} finally {
			operationStart = performance.now();
			await cdp.detach().catch((error) => {
				debugGC?.("[%s] failed to detach Chromium CDP session: %s", sessionId, error);
			});
			diagnostics.cdpDetachMs = performance.now() - operationStart;
		}
		if (debugGC?.enabled) {
			operationStart = performance.now();
			const fsStatsAfter = statfsSync(tempDirectory);
			diagnostics.statfsAfterMs = performance.now() - operationStart;
			diagnostics.availableBytesAfter = (fsStatsAfter.bavail * fsStatsAfter.bsize).toString();
		}
		const availableGiB = available / 1024 ** 3;
		const thresholdGiB = chromiumGCDiskThreshold / 1024 ** 3;
		debugGC?.("[%s] Low disk space detected in %s (%s GiB available, %s GiB threshold). Vitest triggered Chromium garbage collection to prevent browser crashes.", sessionId, tempDirectory, availableGiB.toFixed(1), thresholdGiB.toFixed(1));
	} catch (error) {
		// don't surface if fs or cdp fails
		debugGC?.("[%s] failed to collect Chromium garbage: %s", sessionId, error);
	} finally {
		diagnostics.totalMs = performance.now() - start;
		debugGC?.("[%s] Chromium garbage collection check: %O", sessionId, diagnostics);
	}
}

// externalize verdicts served during this session, shared with fresh workers
// via `fetchWarmModules`. Only verdicts for already-resolved urls are stored:
// an unresolved specifier (a runtime-variable dynamic import of a bare name)
// resolves through the requesting environment's plugin container, so its
// verdict is importer-specific and cannot be shared.
// Keyed by the DevEnvironment, not the server: a leading-slash url still
// resolves to its id through that environment's plugin container, so a plugin
// that resolves conditionally (e.g. on `this.environment`) can externalize the
// same url in one environment and inline it in another — sharing the verdict
// across environments would serve the wrong one. Per-environment keying also
// drops the verdicts on a server restart, since environments are recreated.
const warmExternals = /* @__PURE__ */ new WeakMap();
function createMethodsRPC(project, methodsOptions = {}) {
	const vitest = project.vitest;
	const cacheFs = methodsOptions.cacheFs ?? false;
	project.vitest.state.metadata[project.name] ??= {
		externalized: {},
		duration: {},
		tmps: {}
	};
	if (project.config.dumpDir && !existsSync(project.config.dumpDir)) mkdirSync(project.config.dumpDir, { recursive: true });
	project.vitest.state.metadata[project.name].dumpDir = project.config.dumpDir;
	function getEnvironment(environmentName) {
		const environment = project.vite.environments[environmentName];
		if (!environment) throw new Error(`The environment ${environmentName} was not defined in the Vite config.`);
		return environment;
	}
	async function fetchModule(url, importer, environment, options, otelCarrier, accountModuleDuration = true) {
		const state = project.vitest.state;
		const start = performance.now();
		return await project._transformService.fetch(url, importer, environment, cacheFs, options, otelCarrier).then((result) => {
			const metadata = state.metadata[project.name];
			if ("externalize" in result) {
				metadata.externalized[url] = result.externalize;
				// builtins and network urls are already resolved inside the worker
				// without a round-trip, only module externalizations are worth sharing
				if (result.type === "module" && url[0] === "/") {
					let externals = warmExternals.get(environment);
					if (!externals) {
						externals = Object.create(null);
						warmExternals.set(environment, externals);
					}
					externals[url] = result;
				}
			}
			if ("tmp" in result) metadata.tmps[url] = result.tmp;
			if (accountModuleDuration) {
				const duration = performance.now() - start;
				metadata.duration[url] ??= [];
				metadata.duration[url].push(duration);
			}
			return result;
		});
	}
	return {
		async fetch(url, importer, environmentName, options, otelCarrier) {
			return fetchModule(url, importer, getEnvironment(environmentName), options, otelCarrier);
		},
		async fetchWarmModules(environmentName, files) {
			const environment = project.vite.environments[environmentName];
			if (!environment) throw new Error(`The environment ${environmentName} was not defined in the Vite config.`);
			const warm = Object.create(null);
			// walk the import graphs of the requested files instead of dumping the
			// whole module graph — in large (watch) sessions the graph accumulates
			// modules this worker will never load
			const moduleGraph = environment.moduleGraph;
			const queue = [];
			for (const file of [...files, ...project.config.setupFiles]) {
				const nodes = moduleGraph.getModulesByFile(file);
				if (nodes) queue.push(...nodes);
			}
			const seen = /* @__PURE__ */ new Set();
			while (queue.length) {
				const node = queue.pop();
				if (seen.has(node)) continue;
				seen.add(node);
				queue.push(...node.importedModules);
				const transformResult = node.transformResult;
				if (!transformResult || node.id == null) continue;
				// the transformed code is already stored on disk either by the forks
				// pool (`cacheFs`) or by `fsModuleCache` — the worker can
				// read the file itself instead of fetching each module separately.
				// invalidated modules lose `transformResult` and drop out automatically
				const tmp = transformResult.__vitestTmp;
				if (typeof tmp !== "string") continue;
				const entry = {
					cached: true,
					file: node.file,
					id: node.id,
					tmp,
					url: node.url,
					invalidate: false,
					moduleType: transformResult.__vitestModuleType
				};
				warm[node.url] = entry;
				if (node.id !== node.url) warm[node.id] = entry;
			}
			const externals = warmExternals.get(environment);
			if (externals) for (const url in externals) warm[url] ??= externals[url];
			return warm;
		},
		async prewarmModuleGraph(environmentName, files) {
			const environment = getEnvironment(environmentName);
			const moduleGraph = environment.moduleGraph;
			function getNodeMocks(node) {
				return getStaticMocks(environment, node.id, node.transformResult);
			}
			const resolvedMocks = /* @__PURE__ */ new Map();
			function resolveNodeMocks(node) {
				let mocks = resolvedMocks.get(node.id);
				if (!mocks) {
					mocks = resolveStaticMocks(environment, project.config, node.id, getNodeMocks(node));
					resolvedMocks.set(node.id, mocks);
				}
				return mocks;
			}
			// `import()` targets load on demand; a hoisted file's imports are all
			// rewritten to `import()`, so none of them count
			function getDynamicOnlyIds(node) {
				const result = node.transformResult;
				if (!result?.dynamicDeps?.length || getNodeMocks(node)) return;
				const staticDeps = new Set(result.deps);
				const dynamicOnly = new Set(result.dynamicDeps.filter((dep) => !staticDeps.has(dep)));
				if (!dynamicOnly.size) return;
				const ids = /* @__PURE__ */ new Set();
				for (const child of node.importedModules) if (child.id != null && dynamicOnly.has(child.url)) ids.add(child.id);
				return ids;
			}
			async function load(url, importer) {
				try {
					const fetchResult = await fetchModule(url, importer, environment, void 0, void 0, false);
					if ("id" in fetchResult) return moduleGraph.getModuleById(fetchResult.id);
				} catch {}
			}
			async function walkNode(node, skip) {
				const dynamicOnly = getDynamicOnlyIds(node);
				const children = [];
				for (const child of node.importedModules) {
					if (child.id == null || skip.has(child.id) || dynamicOnly?.has(child.id)) continue;
					skip.add(child.id);
					if (child.transformResult) children.push(walkNode(child, skip));
					else children.push(load(child.url, node.id ?? void 0).then((loaded) => loaded && walkNode(loaded, skip)));
				}
				if (children.length) await Promise.all(children);
			}
			async function walkRoot(root, setupMocks) {
				const { replaced, redirects } = await resolveNodeMocks(root);
				const skip = /* @__PURE__ */ new Set([
					...setupMocks,
					...replaced,
					root.id
				]);
				await Promise.all([walkNode(root, skip), ...redirects.map(async (redirect) => {
					const loaded = await load(redirect, root.id ?? void 0);
					if (loaded && !skip.has(loaded.id)) {
						skip.add(loaded.id);
						await walkNode(loaded, skip);
					}
				})]);
			}
			async function loadRoots(file) {
				const nodes = moduleGraph.getModulesByFile(file);
				if (nodes?.size) return Promise.all(Array.from(nodes, async (node) => node.transformResult ? node : load(node.url, void 0))).then((roots) => roots.filter((root) => root != null));
				const root = await load(file, void 0);
				return root ? [root] : [];
			}
			const setupRoots = await Promise.all(project.config.setupFiles.map(loadRoots));
			// mocks from setup files apply to every test file of the project
			const setupMocks = /* @__PURE__ */ new Set();
			for (const root of setupRoots.flat()) (await resolveNodeMocks(root)).replaced.forEach((id) => setupMocks.add(id));
			await Promise.all([...setupRoots.flat().map((root) => walkRoot(root, /* @__PURE__ */ new Set())), ...files.map(async (file) => {
				const roots = await loadRoots(file);
				await Promise.all(roots.map((root) => walkRoot(root, setupMocks)));
			})]);
		},
		async resolve(id, importer, environmentName) {
			const environment = project.vite.environments[environmentName];
			if (!environment) throw new Error(`The environment ${environmentName} was not defined in the Vite config.`);
			const resolved = await environment.pluginContainer.resolveId(id, importer);
			if (!resolved) return null;
			const file = cleanUrl(resolved.id);
			if (resolved.external) return {
				file,
				// this is only used by the module mocker and it always
				// standardizes the id to mock "node:url" and "url" at the same time
				url: isBuiltin$1(resolved.id) ? toBuiltin(resolved.id) : resolved.id,
				id: resolved.id
			};
			return {
				file: cleanUrl(resolved.id),
				url: normalizeResolvedIdToUrl(environment, resolved.id),
				id: resolved.id
			};
		},
		snapshotSaved(snapshot) {
			vitest.snapshot.add(snapshot);
		},
		resolveSnapshotPath(testPath) {
			return vitest.snapshot.resolvePath(testPath, { config: project.serializedConfig });
		},
		async transform(id) {
			const environment = project.vite.environments.__vitest_vm__;
			if (!environment) throw new Error(`The VM environment was not defined in the Vite config. This is a bug in Vitest. Please, open a new issue with reproduction.`);
			const url = normalizeResolvedIdToUrl(environment, fileURLToPath(id));
			return { code: (await environment.transformRequest(url).catch(handleRollupError))?.code };
		},
		async onQueued(file) {
			if (methodsOptions.collect) vitest.state.collectFiles(project, [file]);
			else await vitest._testRun.enqueued(project, file);
		},
		async onCollected(files) {
			if (methodsOptions.collect) vitest.state.collectFiles(project, files);
			else await vitest._testRun.collected(project, files);
		},
		onAfterSuiteRun(meta) {
			vitest.coverageProvider?.onAfterSuiteRun(meta);
		},
		async onTestBenchmark(testId, benchmark) {
			return vitest._testRun.recordBenchmark(testId, benchmark);
		},
		async readBenchmarkResult(relativePath) {
			return project.benchmark.readResult(relativePath);
		},
		async writeBenchmarkResult(relativePath, data) {
			return project.benchmark.writeResult(relativePath, data);
		},
		async onTaskArtifactRecord(testId, artifact) {
			return vitest._testRun.recordArtifact(testId, artifact);
		},
		async onTaskUpdate(packs, events) {
			if (methodsOptions.collect) vitest.state.updateTasks(packs);
			else await vitest._testRun.updated(packs, events);
		},
		async onUserConsoleLog(log) {
			if (methodsOptions.collect) vitest.state.updateUserLog(log);
			else await vitest._testRun.log(log);
		},
		onUnhandledError(err, type) {
			vitest.state.catchError(err, type);
		},
		onAsyncLeaks(leaks) {
			vitest.state.catchLeaks(leaks);
		},
		onTestModuleDependencies(filepath, dependencies) {
			vitest.cache._dependencies.record(project, filepath, dependencies);
		},
		onCancel(reason) {
			vitest.cancelCurrentRun(reason);
		},
		getCountOfFailedTests() {
			return vitest.state.getCountOfFailedTests();
		},
		ensureModuleGraphEntry(id, importer) {
			const filepath = id.startsWith("file:") ? fileURLToPath(id) : id;
			const importerPath = importer.startsWith("file:") ? fileURLToPath(importer) : importer;
			// environment itself doesn't matter
			const moduleGraph = project.vite.environments.__vitest__?.moduleGraph;
			if (!moduleGraph) {
				// TODO: is it possible?
				console.error("no module graph for", id);
				return;
			}
			const importerNode = moduleGraph.getModuleById(importerPath) || moduleGraph.createFileOnlyEntry(importerPath);
			const moduleNode = moduleGraph.getModuleById(filepath) || moduleGraph.createFileOnlyEntry(filepath);
			if (!moduleGraph.idToModuleMap.has(importerPath)) {
				importerNode.id = importerPath;
				moduleGraph.idToModuleMap.set(importerPath, importerNode);
			}
			if (!moduleGraph.idToModuleMap.has(filepath)) {
				moduleNode.id = filepath;
				moduleGraph.idToModuleMap.set(filepath, moduleNode);
			}
			// this is checked by the "printError" function - TODO: is there a better way?
			moduleNode.transformResult = {
				code: " ",
				map: null
			};
			importerNode.importedModules.add(moduleNode);
			moduleNode.importers.add(importerNode);
		}
	};
}

var RunnerState = /* @__PURE__ */ function(RunnerState) {
	RunnerState["IDLE"] = "idle";
	RunnerState["STARTING"] = "starting";
	RunnerState["STARTED"] = "started";
	RunnerState["START_FAILURE"] = "start_failure";
	RunnerState["STOPPING"] = "stopping";
	RunnerState["STOPPED"] = "stopped";
	return RunnerState;
}(RunnerState || {});
const START_TIMEOUT = 6e4;
const STOP_TIMEOUT = 6e4;
/** @experimental */
class PoolRunner {
	worker;
	/** Exposed to test runner as `VITEST_POOL_ID`. Value is between 1-`maxWorkers`. */
	poolId = void 0;
	project;
	environment;
	_lastTestFiles;
	_state = RunnerState.IDLE;
	_operationLock = null;
	_terminatePromise = createDefer();
	_eventEmitter = new EventEmitter();
	_offCancel;
	_rpc;
	_otel = null;
	_traces;
	get isTerminated() {
		return this._state === RunnerState.STOPPED;
	}
	waitForTerminated() {
		return this._terminatePromise;
	}
	get isStarted() {
		return this._state === RunnerState.STARTED;
	}
	constructor(options, worker) {
		this.worker = worker;
		this.project = options.project;
		this.environment = options.environment;
		const vitest = this.project.vitest;
		this._lastTestFiles = [];
		this._traces = vitest._traces;
		if (this._traces.isEnabled()) {
			const { span: workerSpan, context } = this._traces.startContextSpan("vitest.worker");
			this._otel = {
				span: workerSpan,
				workerContext: context,
				files: []
			};
			this._otel.span.setAttributes({
				"vitest.worker.name": this.worker.name,
				"vitest.project": this.project.name,
				"vitest.environment": this.environment.name
			});
		}
		this._rpc = createBirpc(createMethodsRPC(this.project, {
			collect: options.method === "collect",
			cacheFs: worker.cacheFs
		}), {
			eventNames: ["onCancel"],
			post: (request) => {
				if (this._state !== RunnerState.STOPPING && this._state !== RunnerState.STOPPED) this.postMessage(request);
			},
			on: (callback) => this._eventEmitter.on("rpc", callback),
			timeout: -1
		});
		this._offCancel = vitest.onCancel((reason) => this._rpc.onCancel(reason));
	}
	/**
	* "reconfigure" can only be called if `environment` is different, since different project always
	* requires a new PoolRunner instance.
	*/
	reconfigure(task) {
		this.environment = task.context.environment;
		this._otel?.span.setAttribute("vitest.environment", this.environment.name);
	}
	postMessage(message) {
		// Only send messages when runner is active (not fully stopped)
		// Allow sending during STOPPING state for the 'stop' message itself
		if (this._state !== RunnerState.STOPPED) return this.worker.send(message);
	}
	startTracesSpan(name) {
		const traces = this._traces;
		if (!this._otel) return traces.startSpan(name);
		const { span, context } = traces.startContextSpan(name, this._otel.workerContext);
		this._otel.currentContext = context;
		const end = span.end.bind(span);
		span.end = (endTime) => {
			this._otel.currentContext = void 0;
			return end(endTime);
		};
		return span;
	}
	request(method, context) {
		this._lastTestFiles = context.files.map((f) => f.filepath);
		this._otel?.files.push(...this._lastTestFiles);
		return this.postMessage({
			__vitest_worker_request__: true,
			type: method,
			context,
			otelCarrier: this.getOTELCarrier()
		});
	}
	getOTELCarrier() {
		const activeContext = this._otel?.currentContext || this._otel?.workerContext;
		return activeContext ? this._traces.getContextCarrier(activeContext) : void 0;
	}
	async start(options) {
		// Wait for any ongoing operation to complete
		if (this._operationLock) await this._operationLock;
		if (this._state === RunnerState.STARTED || this._state === RunnerState.STARTING) return;
		if (this._state === RunnerState.STOPPED) throw new Error("[vitest-pool-runner]: Cannot start a stopped runner");
		// Create operation lock to prevent concurrent start/stop
		this._operationLock = createDefer();
		let startSpan;
		const startedAt = performance.now();
		try {
			this._state = RunnerState.STARTING;
			await this._traces.$(`vitest.${this.worker.name}.start`, { context: this._otel?.workerContext }, () => this.worker.start());
			// Attach event listeners AFTER starting worker to avoid issues
			// if worker.start() fails
			this.worker.on("error", this.emitWorkerError);
			this.worker.on("exit", this.emitUnexpectedExit);
			this.worker.on("message", this.emitWorkerMessage);
			startSpan = this.startTracesSpan("vitest.worker.start");
			const startPromise = this.withTimeout(this.waitForStart(), START_TIMEOUT);
			const globalConfig = this.project.vitest.config.experimental.openTelemetry;
			const projectConfig = this.project.config.experimental.openTelemetry;
			const tracesEnabled = projectConfig?.enabled ?? globalConfig?.enabled === true;
			const tracesSdk = projectConfig?.sdkPath ?? globalConfig?.sdkPath;
			this.postMessage({
				type: "start",
				poolId: this.poolId,
				workerId: options.workerId,
				__vitest_worker_request__: true,
				options: { reportMemory: this.worker.reportMemory ?? false },
				context: {
					environment: {
						name: this.environment.name,
						options: this.environment.options
					},
					config: this.project.serializedConfig,
					pool: this.worker.name
				},
				traces: {
					enabled: tracesEnabled,
					sdkPath: tracesSdk,
					otelCarrier: this.getOTELCarrier()
				}
			});
			await startPromise;
			this._state = RunnerState.STARTED;
			// record how long it took to spawn this worker, load its bundle and set up the
			// environment, so the reporter can surface the cost of `isolate: true`
			const { state } = this.project.vitest;
			state.startupTime += performance.now() - startedAt;
			state.workersSpawned += 1;
		} catch (error) {
			this._state = RunnerState.START_FAILURE;
			startSpan?.recordException(error);
			throw error;
		} finally {
			startSpan?.end();
			this._operationLock.resolve();
			this._operationLock = null;
		}
	}
	async stop(options) {
		// Wait for any ongoing operation to complete
		if (this._operationLock) await this._operationLock;
		if (this._state === RunnerState.STOPPED || this._state === RunnerState.STOPPING) return;
		this._otel?.span.setAttribute("vitest.worker.files", this._otel.files);
		if (this._state === RunnerState.IDLE) {
			this._otel?.span.end();
			this._state = RunnerState.STOPPED;
			return;
		}
		// Create operation lock to prevent concurrent start/stop
		this._operationLock = createDefer();
		try {
			this._state = RunnerState.STOPPING;
			// Remove exit and error listeners early to avoid "unexpected exit" and
			// channel teardown errors during shutdown
			this.worker.off("exit", this.emitUnexpectedExit);
			this.worker.off("error", this.emitWorkerError);
			const stopSpan = this.startTracesSpan("vitest.worker.stop");
			await this.withTimeout(new Promise((resolve) => {
				const onStop = (response) => {
					if (response.type === "stopped") {
						if (response.error) {
							stopSpan.recordException(response.error);
							this.project.vitest.state.catchError(response.error, "Teardown Error");
						}
						resolve();
						this.off("message", onStop);
					}
				};
				// Don't wait for graceful exit's response when force exiting
				if (options?.force) return onStop({
					type: "stopped",
					__vitest_worker_response__: true
				});
				this.on("message", onStop);
				this.postMessage({
					type: "stop",
					__vitest_worker_request__: true,
					otelCarrier: this.getOTELCarrier()
				});
			}), STOP_TIMEOUT).finally(() => {
				stopSpan.end();
			});
			this._eventEmitter.removeAllListeners();
			this._offCancel();
			this._rpc.$close(/* @__PURE__ */ new Error("[vitest-pool-runner]: Pending methods while closing rpc"));
			// Stop the worker process (this sets _fork/_thread to undefined)
			// Worker's event listeners (error, message) are implicitly removed when worker terminates
			await this._traces.$(`vitest.${this.worker.name}.stop`, { context: this._otel?.workerContext }, () => this.worker.stop());
			this._state = RunnerState.STOPPED;
		} catch (error) {
			// Ensure we transition to stopped state even on error
			this._state = RunnerState.STOPPED;
			throw error;
		} finally {
			this._lastTestFiles = [];
			this._operationLock.resolve();
			this._operationLock = null;
			this._otel?.span.end();
			this._terminatePromise.resolve();
		}
	}
	on(event, callback) {
		this._eventEmitter.on(event, callback);
	}
	off(event, callback) {
		this._eventEmitter.off(event, callback);
	}
	emitWorkerError = (maybeError) => {
		const error = maybeError instanceof Error ? maybeError : new Error(String(maybeError));
		this._eventEmitter.emit("error", error);
	};
	emitWorkerMessage = (response) => {
		try {
			const message = this.worker.deserialize(response);
			if (typeof message === "object" && message != null && message.__vitest_worker_response__) this._eventEmitter.emit("message", message);
			else this._eventEmitter.emit("rpc", message);
		} catch (error) {
			this._eventEmitter.emit("error", error);
		}
	};
	emitUnexpectedExit = (code, signal) => {
		const hasCode = typeof code === "number";
		const errorDetails = hasCode || signal ? `with ${hasCode ? `exit code ${code} ` : ""}${signal ? `signal ${signal} ` : ""}` : "";
		const testFileDetails = this._lastTestFiles.length ? ` while running test file${this._lastTestFiles.length === 1 ? "" : "s"} ${this._lastTestFiles.join(", ")}` : "";
		const error = /* @__PURE__ */ new Error(`Worker exited unexpectedly ${errorDetails}during ${this._state} state${testFileDetails}`);
		this._state = RunnerState.STOPPED;
		this._eventEmitter.emit("error", error);
	};
	waitForStart() {
		return new Promise((resolve, reject) => {
			const cleanup = () => {
				this.off("message", onStart);
				this.off("error", onError);
			};
			function onStart(message) {
				if (message.type === "started") {
					cleanup();
					if (message.error) reject(message.error);
					else resolve();
				}
			}
			// The worker can die before it ever reports back (e.g. an invalid
			// `execArgv` makes Node exit immediately). Reject as soon as that
			// happens instead of waiting for the start timeout to elapse.
			function onError(error) {
				cleanup();
				reject(error);
			}
			this.on("message", onStart);
			this.on("error", onError);
		});
	}
	withTimeout(promise, timeout) {
		return new Promise((resolve_, reject_) => {
			const timer = setTimeout(() => reject(/* @__PURE__ */ new Error("[vitest-pool-runner]: Timeout waiting for worker to respond")), timeout);
			function resolve(value) {
				clearTimeout(timer);
				resolve_(value);
			}
			function reject(error) {
				clearTimeout(timer);
				reject_(error);
			}
			promise.then(resolve, reject);
		});
	}
}

// After a worker dies, its remaining stdio is drained into the parent-side
// readables asynchronously. Waiting for `end`/`close` before unpiping ensures
// the tail of the output still reaches the shared logger streams.
function streamFlushed(stream) {
	if (stream.readableEnded || stream.destroyed) return Promise.resolve();
	return new Promise((resolve) => {
		stream.once("end", resolve);
		stream.once("close", resolve);
	});
}

const SIGKILL_TIMEOUT = 500;
// how long a failed pipe write may wait for the process's 'exit' event
// before it is reported as the worker error itself
const PIPE_ERROR_EXIT_GRACE = 1e3;
/** @experimental */
class ForksPoolWorker {
	name = "forks";
	cacheFs = true;
	entrypoint;
	execArgv;
	env;
	_fork;
	stdout;
	stderr;
	_errorEmitter = new EventEmitter();
	_pipeErrorTimer;
	constructor(options) {
		this.execArgv = options.execArgv;
		this.env = options.env;
		this.stdout = options.project.vitest.logger.outputStream;
		this.stderr = options.project.vitest.logger.errorStream;
		/** Loads {@link file://./../../../runtime/workers/forks.ts} */
		this.entrypoint = resolve$1(options.distPath, "workers/forks.js");
	}
	on(event, callback) {
		if (event === "error") this._errorEmitter.on("error", callback);
		else this.fork.on(event, callback);
	}
	off(event, callback) {
		if (event === "error") this._errorEmitter.off("error", callback);
		else this.fork.off(event, callback);
	}
	send(message) {
		this.fork.send(message);
	}
	async start() {
		this._fork ||= fork(this.entrypoint, [], {
			env: this.env,
			execArgv: this.execArgv,
			stdio: "pipe",
			serialization: "advanced"
		});
		this._fork.on("error", this.emitError);
		// `end: false`: the logger streams are shared by every worker, so one
		// ending worker stream must not end them for everyone else
		if (this._fork.stdout) {
			this.stdout.setMaxListeners(1 + this.stdout.getMaxListeners());
			this._fork.stdout.pipe(this.stdout, { end: false });
		}
		if (this._fork.stderr) {
			this.stderr.setMaxListeners(1 + this.stderr.getMaxListeners());
			this._fork.stderr.pipe(this.stderr, { end: false });
		}
	}
	async stop() {
		const fork = this.fork;
		const waitForExit = new Promise((resolve) => {
			if (fork.exitCode != null) resolve();
			else fork.once("exit", resolve);
		});
		/*
		* If process running user's code does not stop on SIGTERM, send SIGKILL.
		* This is similar to
		* - https://github.com/jestjs/jest/blob/25a8785584c9d54a05887001ee7f498d489a5441/packages/jest-worker/src/workers/ChildProcessWorker.ts#L463-L477
		* - https://github.com/tinylibs/tinypool/blob/40b4b3eb926dabfbfd3d0a7e3d1222d4dd1c0d2d/src/runtime/process-worker.ts#L56
		*/
		const sigkillTimeout = setTimeout(() => fork.kill("SIGKILL"), SIGKILL_TIMEOUT);
		fork.kill();
		await waitForExit;
		clearTimeout(sigkillTimeout);
		if (fork.stdout) {
			await streamFlushed(fork.stdout);
			fork.stdout.unpipe(this.stdout);
			this.stdout.setMaxListeners(this.stdout.getMaxListeners() - 1);
		}
		if (fork.stderr) {
			await streamFlushed(fork.stderr);
			fork.stderr.unpipe(this.stderr);
			this.stderr.setMaxListeners(this.stderr.getMaxListeners() - 1);
		}
		this._fork = void 0;
	}
	deserialize(data) {
		return data;
	}
	emitError = (error) => {
		// A write into a dying child process fails with EPIPE (or a closed IPC
		// channel) and can be observed before the process's 'exit' event,
		// especially on macOS. The exit event knows the exit code, the signal and
		// the affected test files, so hold the write error and let the 'exit'
		// listeners report instead. The timer covers a broken channel whose
		// process never exits; a process that exited while the error was held was
		// already reported through the exit event, and a process whose listeners
		// were detached is being shut down deliberately — drop the error in both
		// cases.
		const code = error.code;
		if (code === "EPIPE" || code === "ERR_IPC_CHANNEL_CLOSED") {
			if (this._pipeErrorTimer) return;
			this._pipeErrorTimer = setTimeout(() => {
				this._pipeErrorTimer = void 0;
				const fork = this._fork;
				if (fork && fork.exitCode == null && fork.signalCode == null && this._errorEmitter.listenerCount("error")) this._errorEmitter.emit("error", error);
			}, PIPE_ERROR_EXIT_GRACE);
			this._pipeErrorTimer.unref();
			return;
		}
		this._errorEmitter.emit("error", error);
	};
	get fork() {
		if (!this._fork) throw new Error(`The child process was torn down or never initialized. This is a bug in Vitest.`);
		return this._fork;
	}
}

/** @experimental */
class ThreadsPoolWorker {
	name = "threads";
	entrypoint;
	execArgv;
	env;
	_thread;
	stdout;
	stderr;
	constructor(options) {
		this.execArgv = options.execArgv;
		this.env = options.env;
		this.stdout = options.project.vitest.logger.outputStream;
		this.stderr = options.project.vitest.logger.errorStream;
		/** Loads {@link file://./../../../runtime/workers/threads.ts} */
		this.entrypoint = resolve$1(options.distPath, "workers/threads.js");
	}
	on(event, callback) {
		this.thread.on(event, callback);
	}
	off(event, callback) {
		this.thread.off(event, callback);
	}
	send(message) {
		this.thread.postMessage(message);
	}
	async start() {
		// This can be called multiple times if the runtime is shared.
		this._thread ||= new Worker(this.entrypoint, {
			env: this.env,
			execArgv: this.execArgv,
			stdout: true,
			stderr: true
		});
		// `end: false`: the logger streams are shared by every worker, so one
		// ending worker stream must not end them for everyone else
		this.stdout.setMaxListeners(1 + this.stdout.getMaxListeners());
		this._thread.stdout.pipe(this.stdout, { end: false });
		this.stderr.setMaxListeners(1 + this.stderr.getMaxListeners());
		this._thread.stderr.pipe(this.stderr, { end: false });
	}
	async stop() {
		const thread = this.thread;
		// `terminate()` makes node drain the stdio still queued on the worker's
		// message port into these readables; keep the pipes attached until the
		// streams end so late output still reaches the logger streams
		const flushed = Promise.all([streamFlushed(thread.stdout), streamFlushed(thread.stderr)]);
		await thread.terminate();
		await flushed;
		thread.stdout.unpipe(this.stdout);
		this.stdout.setMaxListeners(this.stdout.getMaxListeners() - 1);
		thread.stderr.unpipe(this.stderr);
		this.stderr.setMaxListeners(this.stderr.getMaxListeners() - 1);
		this._thread = void 0;
	}
	deserialize(data) {
		return data;
	}
	get thread() {
		if (!this._thread) throw new Error(`The worker thread was torn down or never initialized. This is a bug in Vitest.`);
		return this._thread;
	}
}

/** @experimental */
class TypecheckPoolWorker {
	name = "typecheck";
	project;
	_eventEmitter = new EventEmitter$1();
	constructor(options) {
		this.project = options.project;
	}
	async start() {
		// noop, onMessage handles it
	}
	async stop() {
		// noop, onMessage handles it
	}
	canReuse() {
		return true;
	}
	send(message) {
		onMessage(message, this.project).then((response) => {
			if (response) this._eventEmitter.emit("message", response);
		});
	}
	on(event, callback) {
		this._eventEmitter.on(event, callback);
	}
	off(event, callback) {
		this._eventEmitter.off(event, callback);
	}
	deserialize(data) {
		return data;
	}
}
const __vitest_worker_response__ = true;
const runners = /* @__PURE__ */ new WeakMap();
async function onMessage(message, project) {
	if (message?.__vitest_worker_request__ !== true) return;
	let runner = runners.get(project.vitest);
	if (!runner) {
		runner = createRunner(project.vitest);
		runners.set(project.vitest, runner);
	}
	let runPromise;
	switch (message.type) {
		case "start": return {
			type: "started",
			__vitest_worker_response__
		};
		case "run":
			runPromise = runner.runTests(message.context.files, project).catch((error) => error);
			return {
				type: "testfileFinished",
				error: await runPromise,
				__vitest_worker_response__
			};
		case "collect":
			runPromise = runner.collectTests(message.context.files, project).catch((error) => error);
			return {
				type: "testfileFinished",
				error: await runPromise,
				__vitest_worker_response__
			};
		case "stop":
			await runPromise;
			return {
				type: "stopped",
				__vitest_worker_response__
			};
	}
	throw new Error(`Unexpected message ${JSON.stringify(message, null, 2)}`);
}
function createRunner(vitest) {
	const promisesMap = /* @__PURE__ */ new WeakMap();
	const rerunTriggered = /* @__PURE__ */ new WeakSet();
	async function onParseEnd(project, { files, sourceErrors }) {
		const checker = project.typechecker;
		const { packs, events } = checker.getTestPacksAndEvents();
		await vitest._testRun.updated(packs, events);
		if (!project.config.typecheck.ignoreSourceErrors) sourceErrors.forEach((error) => vitest.state.catchError(error, "Unhandled Source Error"));
		// The typechecker child process (tsc/vue-tsc) can terminate without producing
		// a complete set of diagnostics: a non-zero exit code, or being killed by a
		// signal (e.g. SIGABRT from an out-of-memory abort, which surfaces as exit
		// 134). We must not report the run as passing in that case, otherwise real
		// type errors slip through as a false green.
		if (!hasFailed(files) && !sourceErrors.length) {
			const exitCode = checker.getExitCode();
			const signal = checker.getSignal();
			if (exitCode || signal) {
				const output = checker.getOutput();
				const looksLikeOom = signal === "SIGABRT" || OOM_OUTPUT_PATTERN.test(output);
				let message;
				if (signal || looksLikeOom) {
					const reason = signal ? `was terminated by signal ${signal}` : `exited with code ${exitCode}`;
					message = `The ${checker.getChecker()} process ${reason} before type checking finished.`;
					if (looksLikeOom) message += " This usually means it ran out of memory — try increasing the limit with NODE_OPTIONS=--max-old-space-size.";
					if (output) message += `\n\n${output}`;
				} else
 // a plain non-zero exit with diagnostics we couldn't attribute to a
				// file (e.g. a tsconfig error) — surface the checker output as-is
				message = output;
				const error = new Error(message);
				error.stack = "";
				vitest.state.catchError(error, "Typecheck Error");
			}
		}
		promisesMap.get(project)?.resolve();
		rerunTriggered.delete(project);
		// triggered by TSC watcher, not Vitest watcher, so we need to emulate what Vitest does in this case
		if (vitest.config.watch && !vitest.runningPromise) {
			const modules = files.map((file) => vitest.state.getReportedEntity(file)).filter((e) => e?.type === "module");
			const state = vitest.isCancelling ? "interrupted" : modules.some((m) => !m.ok()) ? "failed" : "passed";
			await vitest.report("onTestRunEnd", modules, [], state);
			await vitest.report("onWatcherStart", files, [...project.config.typecheck.ignoreSourceErrors ? [] : sourceErrors, ...vitest.state.getUnhandledErrors()]);
		}
	}
	async function createWorkspaceTypechecker(project, files) {
		const checker = project.typechecker ?? new Typechecker(project);
		if (project.typechecker) return checker;
		project.typechecker = checker;
		checker.setFiles(files);
		checker.onParseStart(async () => {
			const files = checker.getTestFiles();
			for (const file of files) await vitest._testRun.enqueued(project, file);
			await vitest._testRun.collected(project, files);
		});
		checker.onParseEnd((result) => onParseEnd(project, result));
		checker.onWatcherRerun(async () => {
			rerunTriggered.add(project);
			if (!vitest.runningPromise) {
				vitest.state.clearErrors();
				await vitest.report("onWatcherRerun", files, "File change detected. Triggering rerun.");
			}
			await checker.collectTests();
			const testFiles = checker.getTestFiles();
			for (const file of testFiles) await vitest._testRun.enqueued(project, file);
			await vitest._testRun.collected(project, testFiles);
			const { packs, events } = checker.getTestPacksAndEvents();
			await vitest._testRun.updated(packs, events);
		});
		return checker;
	}
	async function startTypechecker(project, files) {
		if (project.typechecker) return;
		const checker = await createWorkspaceTypechecker(project, files);
		await checker.collectTests();
		await checker.start();
	}
	async function collectTests(specs, project) {
		const files = specs.map((spec) => spec.filepath);
		const checker = await createWorkspaceTypechecker(project, files);
		checker.setFiles(files);
		await checker.collectTests();
		const testFiles = checker.getTestFiles();
		vitest.state.collectFiles(project, testFiles);
	}
	async function runTests(specs, project) {
		const promises = [];
		const files = specs.map((spec) => spec.filepath);
		const promise = createDefer();
		// check that watcher actually triggered rerun
		const triggered = await new Promise((resolve) => {
			const _i = setInterval(() => {
				if (!project.typechecker || rerunTriggered.has(project)) {
					resolve(true);
					clearInterval(_i);
				}
			});
			setTimeout(() => {
				resolve(false);
				clearInterval(_i);
			}, 500).unref();
		});
		// Re-run but wasn't triggered by tsc
		if (promisesMap.has(project) && !triggered) return promisesMap.get(project);
		if (project.typechecker && !triggered) {
			const testFiles = project.typechecker.getTestFiles();
			for (const file of testFiles) await vitest._testRun.enqueued(project, file);
			await vitest._testRun.collected(project, testFiles);
			await onParseEnd(project, project.typechecker.getResult());
		}
		promises.push(promise);
		promisesMap.set(project, promise);
		promises.push(startTypechecker(project, files));
		await Promise.all(promises);
	}
	return {
		runTests,
		collectTests
	};
}

/** @experimental */
class VmForksPoolWorker extends ForksPoolWorker {
	name = "vmForks";
	reportMemory = true;
	entrypoint;
	constructor(options) {
		super({
			...options,
			execArgv: [...options.execArgv, "--experimental-vm-modules"]
		});
		/** Loads {@link file://./../../../runtime/workers/vmForks.ts} */
		this.entrypoint = resolve$1(options.distPath, "workers/vmForks.js");
	}
	canReuse() {
		return true;
	}
}

/** @experimental */
class VmThreadsPoolWorker extends ThreadsPoolWorker {
	name = "vmThreads";
	reportMemory = true;
	entrypoint;
	constructor(options) {
		super({
			...options,
			execArgv: [...options.execArgv, "--experimental-vm-modules"]
		});
		/** Loads {@link file://./../../../runtime/workers/vmThreads.ts} */
		this.entrypoint = resolve$1(options.distPath, "workers/vmThreads.js");
	}
	canReuse() {
		return true;
	}
}

const WORKER_START_TIMEOUT = 9e4;
class Pool {
	options;
	logger;
	maxWorkers = 0;
	workerIds = /* @__PURE__ */ new Map();
	queue = [];
	activeTasks = [];
	sharedRunners = [];
	exitPromises = [];
	_isCancelling = false;
	constructor(options, logger) {
		this.options = options;
		this.logger = logger;
	}
	setMaxWorkers(maxWorkers) {
		this.maxWorkers = maxWorkers;
		this.workerIds = new Map(Array.from({ length: maxWorkers }).fill(0).map((_, i) => [i + 1, true]));
	}
	async run(task, method) {
		// Prevent new tasks from being queued during cancellation
		if (this._isCancelling) throw new Error("[vitest-pool]: Cannot run tasks while pool is cancelling");
		// Every runner related failure should make this promise reject so that it's picked by pool.
		// This resolver is used to make the error handling in recursive queue easier.
		const testFinish = withResolvers();
		this.queue.push({
			task,
			resolver: testFinish,
			method
		});
		this.schedule();
		await testFinish.promise;
	}
	async schedule() {
		if (this.queue.length === 0 || this.activeTasks.length >= this.maxWorkers) return;
		const { task, resolver, method } = this.queue.shift();
		try {
			let isMemoryLimitReached = false;
			const runner = this.getPoolRunner(task, method);
			// `setMaxWorkers` can replace the map for the next group before this id is freed
			const workerIds = this.workerIds;
			const poolId = runner.poolId ?? this.getConcurrencyId();
			runner.poolId = poolId;
			const activeTask = {
				task,
				resolver,
				method,
				cancelTask
			};
			this.activeTasks.push(activeTask);
			// active tasks receive cancel signal and shut down gracefully
			async function cancelTask(options) {
				if (options?.force) await runner.stop({ force: true });
				await runner.waitForTerminated();
				resolver.reject(/* @__PURE__ */ new Error("Cancelled"));
			}
			const onFinished = (message) => {
				if (message?.__vitest_worker_response__ && message.type === "testfileFinished") {
					if (task.memoryLimit && message.usedMemory) isMemoryLimitReached = message.usedMemory >= task.memoryLimit;
					if (message.error) this.options.state.catchError(message.error, "Test Run Error");
					runner.off("message", onFinished);
					runner.off("error", onTaskError);
					resolver.resolve();
				}
			};
			function onTaskError(error) {
				runner.off("message", onFinished);
				runner.off("error", onTaskError);
				resolver.reject(new Error(`[vitest-pool]: Worker ${task.worker} emitted error.`, { cause: error }));
			}
			runner.on("message", onFinished);
			runner.on("error", onTaskError);
			if (!runner.isStarted) {
				const id = setTimeout(() => resolver.reject(/* @__PURE__ */ new Error(`[vitest-pool]: Timeout starting ${task.worker} runner.`)), WORKER_START_TIMEOUT);
				await runner.start({ workerId: task.context.workerId }).catch((error) => resolver.reject(new Error(`[vitest-pool]: Failed to start ${task.worker} worker for test files ${formatFiles(task)}.`, { cause: error }))).finally(() => clearTimeout(id));
			}
			let span;
			if (!resolver.isRejected) {
				span = runner.startTracesSpan(`vitest.worker.${method}`);
				// Start running the test in the worker
				runner.request(method, task.context);
			}
			await resolver.promise.catch((error) => span?.recordException(error)).finally(() => span?.end());
			const index = this.activeTasks.indexOf(activeTask);
			if (index !== -1) this.activeTasks.splice(index, 1);
			if (!task.isolate && !runner.isTerminated && !isMemoryLimitReached && this.queue[0]?.task.isolate === false && isEqualRunner(runner, this.queue[0].task)) {
				this.sharedRunners.push(runner);
				return this.schedule();
			}
			// Runner terminations are started but not awaited until the end of full run.
			// Runner termination can also already start from task cancellation.
			if (!runner.isTerminated) {
				const id = setTimeout(() => this.logger.error(`[vitest-pool]: Timeout terminating ${task.worker} worker for test files ${formatFiles(task)}.`), this.options.teardownTimeout);
				this.exitPromises.push(runner.stop({ force: resolver.isRejected }).then(() => clearTimeout(id)).catch((error) => this.logger.error(`[vitest-pool]: Failed to terminate ${task.worker} worker for test files ${formatFiles(task)}.`, error)));
			}
			workerIds.set(poolId, true);
		} 
		// This is mostly to avoid zombie workers when/if Vitest internals run into errors
catch (error) {
			return resolver.reject(error);
		}
		return this.schedule();
	}
	async cancel() {
		// Force exit if previous cancel is still on-going
		// for example when user does 'CTRL+c' twice in row
		const force = this._isCancelling;
		// Set flag to prevent new tasks from being queued
		this._isCancelling = true;
		const pendingTasks = this.queue.splice(0);
		if (pendingTasks.length) {
			const error = /* @__PURE__ */ new Error("Cancelled");
			pendingTasks.forEach((task) => task.resolver.reject(error));
		}
		await Promise.all(this.activeTasks.map((task) => task.cancelTask({ force })));
		this.activeTasks = [];
		await Promise.all(this.sharedRunners.map((runner) => runner.stop()));
		this.sharedRunners = [];
		await Promise.all(this.exitPromises);
		this.exitPromises = [];
		this.workerIds.forEach((_, id) => this.freeWorkerId(id));
		// Reset flag after cancellation completes
		this._isCancelling = false;
	}
	async close() {
		await this.cancel();
	}
	getPoolRunner(task, method) {
		if (task.isolate === false) {
			const index = this.sharedRunners.findIndex((runner) => isEqualRunner(runner, task));
			if (index !== -1) {
				const runner = this.sharedRunners.splice(index, 1)[0];
				runner.reconfigure(task);
				return runner;
			}
		}
		const options = {
			distPath: this.options.distPath,
			project: task.project,
			method,
			environment: task.context.environment,
			env: task.env,
			execArgv: task.execArgv
		};
		switch (task.worker) {
			case "forks": return new PoolRunner(options, new ForksPoolWorker(options));
			case "vmForks": return new PoolRunner(options, new VmForksPoolWorker(options));
			case "threads": return new PoolRunner(options, new ThreadsPoolWorker(options));
			case "vmThreads": return new PoolRunner(options, new VmThreadsPoolWorker(options));
			case "typescript": return new PoolRunner(options, new TypecheckPoolWorker(options));
		}
		const customPool = task.project.config.poolRunner;
		if (customPool != null && customPool.name === task.worker) return new PoolRunner(options, customPool.createPoolWorker(options));
		throw new Error(`Runner ${task.worker} is not supported. Test files: ${formatFiles(task)}.`);
	}
	getConcurrencyId() {
		let concurrencyId;
		this.workerIds.forEach((state, id) => {
			if (state && concurrencyId == null) {
				concurrencyId = id;
				this.workerIds.set(id, false);
			}
		});
		if (concurrencyId == null) throw new Error("Cannot set concurrency id because there are no valid free ids.");
		return concurrencyId;
	}
	freeWorkerId(id) {
		this.workerIds.set(id, true);
	}
}
function withResolvers() {
	let resolve = () => {};
	let reject = (_error) => {};
	const resolver = {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject: (reason) => {
			resolver.isRejected = true;
			reject(reason);
		},
		isRejected: false
	};
	return resolver;
}
function formatFiles(task) {
	return task.context.files.map((file) => file.filepath).join(", ");
}
function isEqualRunner(runner, task) {
	if (task.isolate) throw new Error("Isolated tasks should not share runners");
	if (runner.worker.name !== task.worker || runner.project !== task.project) return false;
	// by default, check that the environments are the same
	// some workers (like vmThreads/vmForks) do not need this check
	if (!runner.worker.canReuse) return isEnvironmentEqual(task.context.environment, runner.environment);
	return runner.worker.canReuse(task);
}
function isEnvironmentEqual(env1, env2) {
	if (env1.name !== env2.name) return false;
	return deepEqual(env1.options, env2.options);
}
function deepEqual(obj1, obj2) {
	if (obj1 === obj2) return true;
	if (obj1 == null || obj2 == null) return obj1 === obj2;
	if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (const key of keys1) if (!Object.hasOwn(obj2, key) || !deepEqual(obj1[key], obj2[key])) return false;
	return true;
}

const suppressWarningsPath = resolve(rootDir, "./suppress-warnings.cjs");
function getFilePoolName(project) {
	if (project.config.browser.enabled) return "browser";
	return project.config.pool;
}
function createPool(ctx) {
	const pool = new Pool({
		distPath: ctx.distPath,
		teardownTimeout: ctx.config.teardownTimeout,
		state: ctx.state
	}, ctx.logger);
	const options = resolveOptions(ctx);
	const Sequencer = ctx.config.sequence.sequencer;
	const sequencer = new Sequencer(ctx);
	let browserPool;
	async function executeTests(method, specs, invalidates) {
		ctx.onCancel(() => pool.cancel());
		if (ctx.config.shard) {
			if (!ctx.config.passWithNoTests && ctx.config.shard.count > specs.length) throw new Error(`--shard <count> must be a smaller than count of test files. Resolved ${specs.length} test files for --shard=${ctx.config.shard.index}/${ctx.config.shard.count}.`);
			specs = await sequencer.shard(Array.from(specs));
		}
		const taskGroups = [];
		let workerId = 1;
		const sorted = await sequencer.sort(specs);
		const { environments, tags } = await getSpecificationsOptions(specs);
		const groups = groupSpecs(sorted, environments);
		const projectEnvs = /* @__PURE__ */ new WeakMap();
		const projectExecArgvs = /* @__PURE__ */ new WeakMap();
		for (const group of groups) {
			if (!group) continue;
			const taskGroup = [];
			const browserSpecs = [];
			taskGroups.push({
				tasks: taskGroup,
				maxWorkers: group.maxWorkers,
				browserSpecs
			});
			for (const specs of group.specs) {
				const { project, pool } = specs[0];
				if (pool === "browser") {
					browserSpecs.push(...specs);
					continue;
				}
				const environment = environments.get(specs[0]);
				if (!environment) throw new Error(`Cannot find the environment. This is a bug in Vitest.`);
				let env = projectEnvs.get(project);
				if (!env) {
					env = {
						...process$1.env,
						...options.env,
						...ctx.config.env,
						...project.config.env
					};
					// V8 serializes compile-cached scripts without the source positions
					// that precise coverage relies on, so the compile cache must stay off
					// for the v8 provider (and custom providers, whose mechanism we can't
					// assume) in workers and any process they spawn. istanbul instruments
					// the source at transform time, so the cache is harmless there and the
					// boot speedup is kept.
					if (ctx.config.coverage.enabled && ctx.config.coverage.provider !== "istanbul") {
						delete env.NODE_COMPILE_CACHE;
						env.NODE_DISABLE_COMPILE_CACHE = "1";
					}
					// env are case-insensitive on Windows, but spawned processes don't support it
					if (isWindows) for (const name in env) env[name.toUpperCase()] = env[name];
					projectEnvs.set(project, env);
				}
				let execArgv = projectExecArgvs.get(project);
				if (!execArgv) {
					const conditions = resolveConditions(project);
					execArgv = [
						...options.execArgv,
						...conditions,
						...project.config.execArgv
					];
					projectExecArgvs.set(project, execArgv);
				}
				taskGroup.push({
					context: {
						files: specs.map((spec) => ({
							filepath: spec.moduleId,
							fileTags: tags.get(spec),
							testLocations: spec.testLines,
							testNamePattern: spec.testNamePattern,
							testIds: spec.testIds,
							testNames: spec.testNames,
							testTagsFilter: spec.testTagsFilter
						})),
						// Vitest's own pools don't read it, but a custom pool whose worker outlives a run can use it
						invalidates,
						providedContext: project.getProvidedContext(),
						workerId: workerId++,
						environment
					},
					project,
					env,
					execArgv,
					worker: pool,
					isolate: project.config.isolate,
					memoryLimit: getMemoryLimit(ctx.config, pool) ?? null
				});
			}
		}
		const results = [];
		for (const { tasks, browserSpecs, maxWorkers } of taskGroups) {
			pool.setMaxWorkers(maxWorkers);
			const promises = tasks.map(async (task) => {
				if (ctx.isCancelling) return ctx.state.cancelFiles(task.context.files, task.project);
				try {
					await pool.run(task, method);
				} catch (error) {
					// Intentionally cancelled
					if (ctx.isCancelling && error instanceof Error && error.message === "Cancelled") ctx.state.cancelFiles(task.context.files, task.project);
					else throw error;
				}
			});
			if (browserSpecs.length) {
				browserPool ??= createBrowserPool(ctx);
				promises.push(browserPool.runTests(method, browserSpecs, { maxWorkers }));
			}
			const groupResults = await Promise.allSettled(promises);
			results.push(...groupResults);
		}
		const errors = results.filter((result) => result.status === "rejected").map((result) => result.reason);
		if (errors.length > 0) throw new AggregateError(errors, "Errors occurred while running tests. For more information, see serialized error.");
	}
	return {
		name: "default",
		runTests: (files, invalidates) => executeTests("run", files, invalidates),
		collectTests: (files, invalidates) => executeTests("collect", files, invalidates),
		async close() {
			await Promise.all([
				pool.close(),
				browserPool?.close(),
				...ctx.projects.map((project) => project.typechecker?.stop())
			]);
		}
	};
}
function resolveOptions(ctx) {
	return {
		execArgv: [
			...process$1.execArgv.filter((execArg) => execArg.startsWith("--cpu-prof") || execArg.startsWith("--heap-prof") || execArg.startsWith("--diagnostic-dir")),
			"--experimental-import-meta-resolve",
			...globalThis.Deno || process$1.versions.pnp ? [] : ["--require", suppressWarningsPath]
		],
		env: {
			TEST: "true",
			VITEST: "true",
			NODE_ENV: process$1.env.NODE_ENV || "test",
			VITEST_MODE: ctx.config.watch ? "WATCH" : "RUN",
			FORCE_TTY: isatty(1) ? "true" : ""
		}
	};
}
function resolveConditions(project) {
	// in addition to resolve.conditions Vite also adds production/development,
	// see: https://github.com/vitejs/vite/blob/af2aa09575229462635b7cbb6d248ca853057ba2/packages/vite/src/node/plugins/resolve.ts#L1056-L1080
	const viteMajor = Number(version.split(".")[0]);
	const viteConfig = project.vite.config;
	return [...new Set(viteMajor >= 6 ? viteConfig.ssr.resolve?.conditions ?? [] : [
		"production",
		"development",
		...viteConfig.resolve.conditions ?? []
	])].filter((condition) => {
		if (condition === "production") return viteConfig.isProduction;
		if (condition === "development") return !viteConfig.isProduction;
		return true;
	}).map((condition) => {
		if (viteMajor >= 6 && condition === "development|production") return viteConfig.isProduction ? "production" : "development";
		return condition;
	}).flatMap((c) => ["--conditions", c]);
}
function getMemoryLimit(config, pool) {
	if (pool !== "vmForks" && pool !== "vmThreads") return null;
	const memory = process$1.constrainedMemory?.() || os.totalmem();
	const limit = getWorkerMemoryLimit(config);
	if (typeof memory === "number") return stringToBytes(limit, config.watch ? memory / 2 : memory);
	// If totalmem is not supported we cannot resolve percentage based values like 0.5, "50%"
	if (typeof limit === "number" && limit > 1 || typeof limit === "string" && limit.at(-1) !== "%") return stringToBytes(limit);
	// just ignore "memoryLimit" value because we cannot detect memory limit
	return null;
}
function groupSpecs(specs, environments) {
	const groups = [];
	// Files without file parallelism but without explicit sequence.groupOrder
	const sequential = {
		specs: [],
		maxWorkers: 1
	};
	// Type tests are run in a single group, per project
	const typechecks = {};
	const serializedEnvironmentOptions = /* @__PURE__ */ new Map();
	function getSerializedOptions(env) {
		const options = serializedEnvironmentOptions.get(env);
		if (options) return options;
		const serialized = JSON.stringify(env.options);
		serializedEnvironmentOptions.set(env, serialized);
		return serialized;
	}
	function isEqualEnvironments(a, b) {
		const aEnv = environments.get(a);
		const bEnv = environments.get(b);
		if (!aEnv && !bEnv) return true;
		if (!aEnv || !bEnv || aEnv.name !== bEnv.name) return false;
		if (!aEnv.options && !bEnv.options) return true;
		if (!aEnv.options || !bEnv.options) return false;
		return getSerializedOptions(aEnv) === getSerializedOptions(bEnv);
	}
	specs.forEach((spec) => {
		if (spec.pool === "typescript") {
			typechecks[spec.project.name] ||= [];
			typechecks[spec.project.name].push(spec);
			return;
		}
		const order = spec.project.config.sequence.groupOrder;
		const isolate = spec.project.config.isolate;
		// Files that have disabled parallelism and default groupOrder are set into their own group
		if (isolate === true && order === 0 && spec.project.config.maxWorkers === 1) return sequential.specs.push([spec]);
		const maxWorkers = spec.project.config.maxWorkers;
		groups[order] ||= {
			specs: [],
			maxWorkers
		};
		// Multiple projects with different maxWorkers but same groupOrder
		if (groups[order].maxWorkers !== maxWorkers) {
			const last = groups[order].specs.at(-1)?.at(-1)?.project.name;
			throw new Error(`Projects "${last}" and "${spec.project.name}" have different 'maxWorkers' but same 'sequence.groupOrder'.\nProvide unique 'sequence.groupOrder' for them.`);
		}
		// Non-isolated single worker can receive all files at once.
		// vm pools are excluded: their `isolate: false` comes from config
		// resolution rather than the user, because their isolation is a fresh VM
		// context per run request — batching files into a single run request
		// would share one context across all of them.
		if (isolate === false && maxWorkers === 1 && spec.pool !== "vmThreads" && spec.pool !== "vmForks") {
			const previous = groups[order].specs[0]?.[0];
			if (previous && previous.project.name === spec.project.name && isEqualEnvironments(spec, previous)) return groups[order].specs[0].push(spec);
		}
		groups[order].specs.push([spec]);
	});
	let order = Math.max(0, ...groups.keys()) + 1;
	for (const projectName in typechecks) {
		const maxWorkers = typechecks[projectName][0].project.config.maxWorkers;
		const previous = groups[order - 1];
		if (previous && previous.typecheck && maxWorkers !== previous.maxWorkers) order += 1;
		groups[order] ||= {
			specs: [],
			maxWorkers,
			typecheck: true
		};
		groups[order].specs.push(typechecks[projectName]);
	}
	if (sequential.specs.length) groups.push(sequential);
	return groups;
}

/**
* Glob files inside a project's working directory.
*
* Resolves with `node:path` (not `pathe`) so the Windows drive-letter casing
* stays consistent with Vite's, and keeps slashes normalized.
*/
async function globProjectFiles(include, exclude, cwd) {
	return (await glob(include, {
		dot: true,
		cwd,
		ignore: exclude,
		expandDirectories: false
	})).map((file) => slash(path.resolve(cwd, file)));
}
function isInSourceTestCode(code) {
	return code.includes("import.meta.vitest");
}
/**
* Glob a project's test files, including in-source test files from
* `includeSource` that actually contain `import.meta.vitest`. Typecheck test
* files are not included.
*/
async function globProjectTestFiles(include, exclude, includeSource, cwd) {
	const testFiles = await globProjectFiles(include, exclude, cwd);
	if (includeSource?.length) {
		const files = await globProjectFiles(includeSource, exclude, cwd);
		await Promise.all(files.map(async (file) => {
			try {
				if (isInSourceTestCode(await readFile(file, "utf-8"))) testFiles.push(file);
			} catch {
				return null;
			}
		}));
	}
	return testFiles;
}
/**
* Keep the test files that match the CLI filters. With no filters, every file matches.
*/
function filterTestFiles(testFiles, filters, dir) {
	if (!filters.length) return testFiles;
	if (process.platform === "win32") filters = filters.map((f) => slash(f));
	return testFiles.filter((t) => {
		const testFile = relative(dir, t).toLocaleLowerCase();
		return filters.some((f) => {
			// if filter is a full file path, we should include it if it's in the same folder
			if (isAbsolute(f) && t.startsWith(f)) return true;
			const relativePath = f.endsWith("/") ? join(relative(dir, f), "/") : relative(dir, f);
			return testFile.includes(f.toLocaleLowerCase()) || testFile.includes(relativePath.toLocaleLowerCase());
		});
	});
}

class TestSpecification {
	/**
	* The task id associated with the test module.
	*/
	taskId;
	/**
	* The test project that the module belongs to.
	*/
	project;
	/**
	* The id of the module in the Vite module graph. It is usually an absolute file path.
	*/
	moduleId;
	/**
	* The current test pool. It's possible to have multiple pools in a single test project with `typecheck.enabled`.
	*/
	pool;
	/**
	* Line numbers of the test locations to run.
	*/
	testLines;
	/**
	* Regular expression pattern to filter test names.
	*/
	testNamePattern;
	/**
	* The ids of tasks inside of this specification to run.
	*/
	testIds;
	/**
	* The full names of the tests inside of this specification to run, including the parent suites separated with `>`.
	*/
	testNames;
	/**
	* The tags of tests to run.
	*/
	testTagsFilter;
	/** @internal */
	_docblock;
	/**
	* This class represents a test suite for a test module within a single project.
	* @internal
	*/
	constructor(project, moduleId, pool, testLinesOrOptions, taskIdOverride) {
		const projectName = project.config.name;
		this.taskId = taskIdOverride ?? generateFileHash(relative(project.config.root, moduleId), projectName, {
			typecheck: pool === "typescript",
			__vitest_label__: project.config.mergeReportsLabel
		});
		this.project = project;
		this.moduleId = moduleId;
		this.pool = pool;
		if (Array.isArray(testLinesOrOptions)) this.testLines = testLinesOrOptions;
		else if (testLinesOrOptions && typeof testLinesOrOptions === "object") {
			this.testLines = testLinesOrOptions.testLines;
			this.testNamePattern = testLinesOrOptions.testNamePattern;
			this.testIds = testLinesOrOptions.testIds;
			this.testNames = testLinesOrOptions.testNames;
			this.testTagsFilter = testLinesOrOptions.testTagsFilter;
		}
	}
	/**
	* Test module associated with the specification. This will be `undefined` if tests have not been run yet.
	*/
	get testModule() {
		const task = this.project.vitest.state.idMap.get(this.taskId);
		if (!task) return;
		return this.project.vitest.state.getReportedEntity(task);
	}
	toJSON() {
		return [
			{
				name: this.project.config.name,
				root: this.project.config.root
			},
			this.moduleId,
			{
				pool: this.pool,
				testLines: this.testLines,
				testIds: this.testIds,
				testNames: this.testNames,
				testNamePattern: this.testNamePattern,
				testTagsFilter: this.testTagsFilter
			}
		];
	}
}

class TestProject {
	/**
	* The global Vitest instance.
	*/
	vitest;
	/**
	* Resolved global configuration. If there are no workspace projects, this will be the same as `config`.
	*/
	globalConfig;
	/**
	* Browser instance if the browser is enabled. This is initialized when the tests run for the first time.
	*/
	browser;
	/**
	* Temporary directory for the project. This is unique for each project. Vitest stores transformed content here.
	*/
	tmpDir;
	benchmark = new BenchmarkManager(this);
	config;
	viteConfig;
	vite;
	hash;
	/** @internal */ typechecker;
	/** @internal */ _resolver;
	/** @internal */ _transformService;
	/** @internal */ _serializedDefines;
	/** @internal */ _sharedViteServer = false;
	/** @internal */ testFilesList = null;
	/** @internal */ _browserReadySessions = /* @__PURE__ */ new Set();
	runner;
	closingPromise;
	typecheckFilesList = null;
	_globalSetups;
	_provided = {};
	constructor(vitest, server, viteConfig, projectConfig) {
		this.vitest = vitest;
		this.globalConfig = vitest.config;
		this.tmpDir = join(tmpdir(), nanoid());
		this.vite = server;
		this.viteConfig = viteConfig;
		this.config = projectConfig;
		this.hash = generateHash(this.config.root + this.config.name);
		this._provideObject(projectConfig.provide);
	}
	/** @internal */
	_initializeRunners(server) {
		this._serializedDefines = createDefinesScript(this.config._scriptDefines);
		this._resolver = new VitestResolver(server.config.cacheDir, this.config);
		this._transformService = new ModuleTransformService(this._resolver, this.config, this.vitest.cache._modules, this.vitest._traces, this.tmpDir);
		const environment = server.environments.__vitest__;
		this.runner = this.config.experimental.viteModuleRunner === false ? new NativeModuleRunner(this.config.root) : new ServerModuleRunner(environment, this._transformService, this.config);
	}
	// "provide" is a property, not a method to keep the context when destructed in the global setup,
	// making it a method would be a breaking change, and can be done in Vitest 3 at minimum
	/**
	* Provide a value to the test context. This value will be available to all tests with `inject`.
	*/
	provide = (key, value) => {
		try {
			structuredClone(value);
		} catch (err) {
			throw new Error(`Cannot provide "${key}" because it's not serializable.`, { cause: err });
		}
		this._provided[key] = value;
	};
	/**
	* Get the provided context. The project context is merged with the global context.
	*/
	getProvidedContext() {
		if (this.isRootProject()) return this._provided;
		return {
			...(this._instanceParent ?? this.vitest.getRootProject()).getProvidedContext(),
			...this._provided
		};
	}
	/**
	* Creates a new test specification. Specifications describe how to run tests.
	* @param moduleId The file path
	*/
	createSpecification(moduleId, locationsOrOptions, pool, taskIdOverride) {
		return new TestSpecification(this, moduleId, pool || getFilePoolName(this), locationsOrOptions, taskIdOverride);
	}
	toJSON() {
		return {
			name: this.name,
			serializedConfig: this.serializedConfig,
			context: this.getProvidedContext()
		};
	}
	/**
	* The name of the project or an empty string if not set.
	*/
	get name() {
		return this.config.name || "";
	}
	/**
	* The color used when reporting tasks of this project.
	*/
	get color() {
		return this.config.color;
	}
	/**
	* Serialized project configuration. This is the config that tests receive.
	*/
	get serializedConfig() {
		return this._serializeOverriddenConfig();
	}
	/**
	* Check if this is the root project. The root project is the one that has the root config.
	*/
	isRootProject() {
		return this.vitest.getRootProject() === this;
	}
	/**
	* Whether the project reuses the Vite server of the config that declared it
	* (see the `sharedViteServer` option). The project that owns the server
	* reports `false` even when other projects reuse it.
	*/
	get sharedViteServer() {
		return this._sharedViteServer;
	}
	/** @internal */
	async _initializeGlobalSetup() {
		if (this._globalSetups) return;
		// the project that declares browser instances runs their inherited global setup once
		const parent = this._instanceParent;
		await parent?._initializeGlobalSetup();
		const globalSetup = parent ? toArray(this.config.globalSetup).filter((file) => !parent.config.globalSetup.includes(file)) : this.config.globalSetup;
		const native = this.runner instanceof NativeModuleRunner;
		// global setup is imported by this process, so its imports are only known to a resolve hook
		const canRecord = !native || !this.vitest.config.experimental.recordDependencies || !this.config.globalSetup.length || trackNativeImports();
		this._globalSetups = await loadGlobalSetupFiles(this.runner, globalSetup);
		if (canRecord) this.vitest.cache._dependencies.recordGlobalSetup(this, collectDependencies(native ? nativeImports.getImports : getEvaluatedImports(this.runner.evaluatedModules), this.config.globalSetup));
		for (const globalSetupFile of this._globalSetups) {
			const teardown = await globalSetupFile.setup?.(this);
			if (teardown == null || !!globalSetupFile.teardown) continue;
			if (typeof teardown !== "function") throw new TypeError(`invalid return value in globalSetup file ${globalSetupFile.file}. Must return a function`);
			globalSetupFile.teardown = teardown;
		}
	}
	onTestsRerun(cb) {
		this.vitest.onTestsRerun(cb);
	}
	/** @internal */
	async _teardownGlobalSetup() {
		if (!this._globalSetups) return;
		for (const globalSetupFile of [...this._globalSetups].reverse()) await globalSetupFile.teardown?.();
	}
	/**
	* Get all files in the project that match the globs in the config and the filters.
	* @param filters String filters to match the test files.
	*/
	async globTestFiles(filters = []) {
		return this.vitest._traces.$("vitest.config.resolve_include_project", async (span) => {
			const dir = this.config.dir || this.config.root;
			const { include, exclude, includeSource } = this.config;
			const typecheck = this.config.typecheck;
			span.setAttributes({
				cwd: dir,
				include,
				exclude,
				includeSource,
				typecheck: typecheck.enabled ? typecheck.include : []
			});
			const [testFiles, typecheckTestFiles] = await Promise.all([typecheck.enabled && typecheck.only ? [] : this.globAllTestFiles(include, exclude, includeSource, dir), typecheck.enabled ? this.typecheckFilesList || this.globFiles(typecheck.include, typecheck.exclude, dir) : []]);
			this.typecheckFilesList = typecheckTestFiles;
			return {
				testFiles: filterTestFiles(testFiles, filters, dir),
				typecheckTestFiles: filterTestFiles(typecheckTestFiles, filters, dir)
			};
		});
	}
	async globAllTestFiles(include, exclude, includeSource, cwd) {
		if (this.testFilesList) return this.testFilesList;
		const testFiles = await globProjectTestFiles(include, exclude, includeSource, cwd);
		this.testFilesList = testFiles;
		return testFiles;
	}
	isBrowserEnabled() {
		return !!this.config.browser?.enabled;
	}
	markTestFile(testPath) {
		this.testFilesList?.push(testPath);
	}
	/** @internal */
	_removeCachedTestFile(testPath) {
		if (this.testFilesList) this.testFilesList = this.testFilesList.filter((file) => file !== testPath);
	}
	/**
	* Returns if the file is a test file. Requires `.globTestFiles()` to be called first.
	* @internal
	*/
	_isCachedTestFile(testPath) {
		return !!this.testFilesList && this.testFilesList.includes(testPath);
	}
	/**
	* Returns if the file is a typecheck test file. Requires `.globTestFiles()` to be called first.
	* @internal
	*/
	_isCachedTypecheckFile(testPath) {
		return !!this.typecheckFilesList && this.typecheckFilesList.includes(testPath);
	}
	/** @internal */
	globFiles(include, exclude, cwd) {
		return globProjectFiles(include, exclude, cwd);
	}
	/**
	* Test if a file matches the test globs. This does the actual glob matching if the test is not cached, unlike `isCachedTestFile`.
	*/
	matchesTestGlob(moduleId, source) {
		if (this._isCachedTestFile(moduleId)) return true;
		const relativeId = relative(this.config.dir || this.config.root, moduleId);
		if (pm.isMatch(relativeId, this.config.exclude, { dot: true })) return false;
		if (pm.isMatch(relativeId, this.config.include, { dot: true })) {
			this.markTestFile(moduleId);
			return true;
		}
		if (this.config.includeSource?.length && pm.isMatch(relativeId, this.config.includeSource, { dot: true })) {
			const code = source?.() || readFileSync(moduleId, "utf-8");
			if (isInSourceTestCode(code)) {
				this.markTestFile(moduleId);
				return true;
			}
		}
		return false;
	}
	/**
	* The parent browser project that owns this cluster's single Vite server.
	* Set on the primary (the hidden parent of a browser cluster) at server
	* creation; instance siblings get their own `ProjectBrowser` view via
	* `_parentBrowser.spawn`.
	* @internal
	*/
	_parentBrowser;
	/** @internal */
	_parent;
	/** @internal */
	get _instanceParent() {
		return this._parent?._parentBrowser ? this._parent : void 0;
	}
	/**
	* Closes the project and all associated resources. This can only be called once; the closing promise is cached until the server restarts.
	* If the resources are needed again, create a new project.
	*/
	close() {
		if (!this.closingPromise) this.closingPromise = Promise.all([
			this.vite.close(),
			this.typechecker?.stop(),
			this.clearTmpDir()
		].filter(Boolean)).then(() => {
			if (!this.runner.isClosed()) return this.runner.close();
		}).then(() => {
			this._provided = {};
		});
		return this.closingPromise;
	}
	/**
	* Import a file using Vite module runner.
	* @param moduleId The ID of the module in Vite module graph
	*/
	import(moduleId) {
		return this.runner.import(moduleId);
	}
	/** @internal */
	_getViteEnvironments() {
		return Object.values(this.vite.environments || {});
	}
	/** @internal */
	async _openBrowserPage(sessionId, pool) {
		const provider = this.browser?.provider;
		if (!this.browser || !provider) throw new Error(`browser is not initialized`);
		const resolvedUrls = this.browser.vite.resolvedUrls;
		const origin = resolvedUrls?.local[0] ?? resolvedUrls?.network[0];
		if (!origin) throw new Error(`Can't find browser origin URL for project "${this.name}"`);
		const url = new URL("/__vitest_test__/", origin);
		url.searchParams.set("sessionId", sessionId);
		const otelCarrier = this.vitest._traces.getContextCarrier();
		this.vitest._browserSessions.sessionIds.add(sessionId);
		const sessionPromise = this.vitest._browserSessions.createSession(sessionId, this, pool, { otelCarrier });
		const pagePromise = provider.openPage(sessionId, url.toString(), { parallel: pool.parallel ?? false });
		await Promise.all([sessionPromise, pagePromise]);
	}
	/** @internal */
	async _standalone() {
		// headless pages are opened by the first run, within the `maxWorkers` limit
		if (!this.isBrowserEnabled() || this.config.browser.headless) return;
		await this._initBrowserProvider();
		if (!this.browser) return;
		const sessionId = crypto.randomUUID();
		await this._openBrowserPage(sessionId, { reject: (error) => {
			this.vitest.state.catchError(error, "Browser Error");
		} });
		this._browserReadySessions.add(sessionId);
	}
	_serializeOverriddenConfig() {
		// TODO: serialize the config _once_ or when needed
		const config = serializeConfig(this);
		if (!this.vitest.configOverride) return config;
		return deepMerge(config, this.vitest.configOverride);
	}
	async clearTmpDir() {
		try {
			await rm(this.tmpDir, { recursive: true });
		} catch {}
	}
	/** @internal */
	_initBrowserProvider = deduped(async () => {
		if (!this.isBrowserEnabled() || this.browser?.provider) return;
		// The browser server is created eagerly with the project, so `this.browser`
		// is already set here; bind the port if startup did not, then init the provider.
		if (this.browser) {
			await listenClusterServer(this.vite);
			await this.vitest.report("onBrowserInit", this);
		}
		await this.browser?.initBrowserProvider(this);
	});
	_provideObject(context) {
		for (const _providedKey in context) {
			const providedKey = _providedKey;
			this.provide(providedKey, context[providedKey]);
		}
	}
	/** @internal */
	static _createBasicProject(vitest) {
		const project = new TestProject(vitest, vitest.vite, vitest.viteConfig, vitest.config);
		project.runner = vitest.runner;
		project._resolver = vitest._resolver;
		project._transformService = vitest._transformService;
		project._serializedDefines = createDefinesScript(vitest.config._scriptDefines);
		return project;
	}
	/**
	* Create a sibling project that shares server-derived resources (Vite server,
	* runner, resolver, transform service) with a primary project. The sibling has its own
	* distinct `projectConfig`, but the same `viteConfig` reference as the primary.
	*
	* Used for browser-instance and benchmark variants whose entries share a
	* `viteConfig` reference with a primary project entry.
	*
	* @internal
	*/
	static _spawnSibling(parent, config) {
		const sibling = new TestProject(parent.vitest, parent.vite, parent.viteConfig, config);
		sibling.runner = parent.runner;
		sibling._resolver = parent._resolver;
		sibling._transformService = parent._transformService;
		sibling._parent = parent;
		sibling._serializedDefines = parent._serializedDefines;
		return sibling;
	}
}
function deduped(cb) {
	let _promise;
	return ((...args) => {
		if (!_promise) _promise = cb(...args).finally(() => {
			_promise = void 0;
		});
		return _promise;
	});
}
function generateHash(str) {
	let hash = 0;
	if (str.length === 0) return `${hash}`;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	return `${hash}`;
}

const debug = createDebugger("vitest:projects");
// vitest.config.*
// vite.config.*
// vitest.unit.config.*
// vite.unit.config.*
// vitest.unit-test.config.*
const CONFIG_REGEXP = /^vite(?:st)?(?:\.[\w-]+)?\.config\./;
// CLI options that can override per-project test config.
// Not all options are allowed to be overridden.
const PROJECT_CLI_OVERRIDES = [
	"logHeapUsage",
	"detectAsyncLeaks",
	"allowOnly",
	"sequence",
	"testTimeout",
	"pool",
	"update",
	"globals",
	"expandSnapshotDiff",
	"disableConsoleIntercept",
	"retry",
	"repeats",
	"testNamePattern",
	"passWithNoTests",
	"bail",
	"isolate",
	"printConsoleTrace",
	"inspect",
	"inspectBrk",
	"fileParallelism",
	"maxWorkers",
	"tagsFilter",
	"browser",
	"experimental",
	"fsModuleCache",
	"fsModuleCachePath"
];
/**
* Resolve the full list of project entries for the current Vitest run.
*
* - If the user declared `test.projects`, each declared project gets its own
*   resolved Vite config plus per-project Vitest test config.
* - Otherwise the root config is used as the single base entry.
* - A file-based project whose config declares `projects` itself is a
*   container: like the root, it doesn't run tests and is replaced by the
*   projects it declares (recursively).
* - Browser instances expand each entry with `browser.enabled` into one entry
*   per instance (sharing `viteConfig` with the parent).
* - Benchmarks add a benchmark variant for each entry whose
*   `benchmark.enabled` is true (sharing `viteConfig` with its non-benchmark
*   counterpart).
* - The `--project` filter is applied at the end so error messages can list
*   every name that was considered (including instance- and benchmark-derived).
*/
async function resolveProjectEntries(harness, globalViteConfig, globalConfig, definitions, options = {}) {
	const throwIfEmpty = options.throwIfEmpty ?? true;
	const existingNames = options.existingNames;
	// `definitions: []` is treated as "user declared workspace but it's empty"
	// `definitions === undefined` means "no workspace declared" and
	// falls through to the default root-project entry.
	let baseEntries;
	if (definitions !== void 0) {
		debug?.(`resolving ${definitions.length} project definitions declared by ${globalViteConfig.configFile ?? globalConfig.root}`);
		const cliOverrides = PROJECT_CLI_OVERRIDES.reduce((acc, name) => {
			if (name in globalConfig.cliOptions) acc[name] = globalConfig.cliOptions[name];
			return acc;
		}, {});
		const containerConfigFiles = [];
		baseEntries = await resolveDeclaredProjectEntries({
			harness,
			rootViteConfig: globalViteConfig,
			rootConfig: globalConfig,
			parentViteConfig: globalViteConfig,
			parentConfig: globalConfig,
			cliOverrides,
			ancestors: [],
			chain: globalViteConfig.configFile ? [safeRealpath(globalViteConfig.configFile)] : [],
			containerConfigFiles
		}, definitions);
		if (containerConfigFiles.length)
 // appended rather than assigned so `injectTestProjects` containers
		// are also watched
		globalConfig._containerConfigFiles = [...globalConfig._containerConfigFiles || [], ...containerConfigFiles];
	} else {
		debug?.(`no projects declared, the root config is the only project`);
		baseEntries = [{
			viteConfig: globalViteConfig,
			projectConfig: globalConfig
		}];
	}
	// Ensure project names are unique across declared projects (and any
	// already-existing projects passed via `existingNames`, which the inject
	// path uses to forbid clashes with the active workspace). Include config
	// file paths in the error when available (matches the old workspace-mode
	// duplicate-name diagnostic).
	const seenNames = /* @__PURE__ */ new Map();
	for (const entry of baseEntries) {
		const name = entry.projectConfig.name;
		if (existingNames?.has(name)) throw new Error(`Project name "${name}" is not unique. All projects should have unique names. Make sure your configuration is correct.`);
		const existing = seenNames.get(name);
		if (existing) {
			// inline entries carry the configFile they extend, which doesn't say
			// where the project is declared, so they are reported without a file
			const entryFile = !entry.inline && entry.viteConfig.configFile ? relative(globalConfig.root, entry.viteConfig.configFile) : "";
			const existingFile = !existing.inline && existing.viteConfig.configFile ? relative(globalConfig.root, existing.viteConfig.configFile) : "";
			const filesError = baseEntries.length > 1 && (entryFile || existingFile) ? [
				"\n\nYour config matched these files:\n",
				baseEntries.filter((e) => !e.inline && e.viteConfig.configFile).map((e) => ` - ${relative(globalConfig.root, e.viteConfig.configFile)}`).join("\n"),
				"\n\n"
			].join("") : " ";
			throw new Error([
				`Project name "${name}"`,
				entryFile ? ` from "${entryFile}"` : "",
				" is not unique.",
				existingFile ? ` The project is already defined by "${existingFile}".` : "",
				filesError,
				"All projects should have unique names. Make sure your configuration is correct."
			].join(""));
		}
		seenNames.set(name, entry);
	}
	const seenNamesSet = new Set(seenNames.keys());
	// --project filter applied after expansion so all candidate names are known.
	const filtered = applyProjectFilter(globalConfig, expandBenchmarksInEntries(expandBrowserInstancesInEntries(globalConfig, baseEntries, seenNamesSet), seenNamesSet, !!globalConfig.cliOptions.benchmarkOnly));
	// If the user declared `projects` (or workspace files) but the filter
	// excluded every candidate, throw with the projects definition included so
	// callers see what was tried. Skipped for the runtime `injectTestProjects`
	// path where filtering injected projects out is expected.
	const filterMatched = filtered.some((entry) => !entry.hidden);
	if (throwIfEmpty && definitions && !filterMatched) throw new Error([
		"No projects were found. Make sure your configuration is correct. ",
		globalConfig.project.length ? `The filter matched no projects: ${globalConfig.project.join(", ")}. ` : "",
		`The projects definition: ${JSON.stringify(definitions.map((p, index) => typeof p === "string" ? p : p instanceof Promise ? "Promise" : typeof p === "function" ? p.name : { name: p.test?.name ?? index }), null, 4)}.`
	].join(""));
	debug?.(`resolved projects: ${filtered.filter((e) => !e.hidden).map((e) => projectLabel(e.projectConfig.name)).join(", ")}`);
	await applyBrowserOptimizeDeps(harness, filtered, globalConfig._cliFilters ?? []);
	return filtered;
}
async function applyBrowserOptimizeDeps(harness, entries, cliFilters) {
	const groups = /* @__PURE__ */ new Map();
	for (const entry of entries) {
		const { viteConfig } = entry;
		let group = groups.get(viteConfig);
		if (!group) {
			group = [];
			groups.set(viteConfig, group);
		}
		group.push(entry);
	}
	// Most projects in a group share identical glob inputs (the `dir`/`root` is
	// always the same and cannot be overridden by an instance option), so cache
	// the result per unique input set to avoid re-globbing the same files.
	const fileListCache = /* @__PURE__ */ new Map();
	const globTestFiles = (config) => {
		const cwd = config.dir || config.root;
		const key = JSON.stringify([
			config.include,
			config.exclude,
			config.includeSource,
			cwd
		]);
		let fileList = fileListCache.get(key);
		if (!fileList) {
			fileList = globProjectTestFiles(config.include, config.exclude, config.includeSource, cwd);
			fileListCache.set(key, fileList);
		}
		return fileList;
	};
	await Promise.all(Array.from(groups, async ([viteConfig, projectEntries]) => {
		const projectConfigs = projectEntries.map((entry) => entry.projectConfig);
		const contribution = projectConfigs.find((config) => config._browserContribution)?._browserContribution;
		if (!contribution) return;
		const fileLists = await Promise.all(projectConfigs.map(globTestFiles));
		projectEntries.forEach((entry, index) => {
			const config = projectConfigs[index];
			entry.hasTestFiles = filterTestFiles(fileLists[index], cliFilters, config.dir || config.root).length > 0;
		});
		const testFiles = [...new Set(fileLists.flat())];
		debug?.(`aggregating browser optimizeDeps from ${testFiles.length} test files of ${projectEntries.map((e) => projectLabel(e.projectConfig.name)).join(", ")}`);
		const optimizeDeps = await contribution.resolveOptimizeDeps(projectConfigs, testFiles, harness);
		viteConfig.optimizeDeps = { ...mergeConfig({ optimizeDeps: viteConfig.optimizeDeps }, { optimizeDeps }).optimizeDeps };
		viteConfig.environments.client.optimizeDeps = { ...viteConfig.optimizeDeps };
	}));
}
async function resolveDeclaredProjectEntries(context, definitions) {
	const { parentViteConfig, parentConfig } = context;
	const { configFiles, projectConfigs, nonConfigDirectories } = await resolveTestProjectConfigs(parentViteConfig, parentConfig, definitions);
	const concurrent = limitConcurrency(os__default.availableParallelism() || 5);
	const fileProjects = [...configFiles, ...nonConfigDirectories];
	const promises = [];
	projectConfigs.forEach((options, index) => {
		const ownServerReason = getOwnServerReason(context, options);
		if (ownServerReason === void 0) {
			debug?.(`inline project ${inlineProjectLabel(options, index)} shares the Vite server of ${parentViteConfig.configFile ?? parentConfig.root}`);
			promises.push(Promise.resolve().then(() => resolveSharedServerEntry(context, options, index)));
			return;
		}
		debug?.(`inline project ${inlineProjectLabel(options, index)} resolves its own Vite config: ${ownServerReason}`);
		const configRoot = parentConfig.root;
		// if extends a config file, resolve the file path
		const configFile = typeof options.extends === "string" ? resolve(configRoot, options.extends) : options.extends !== false ? parentViteConfig.configFile || false : false;
		// `test.root` overrides the top level `root`, so the entry carries a
		// single resolved root; both are resolved relative to the declaring
		// config's root (like other options), and inline configs without a
		// root use the same root as the declaring config
		const { root: testRoot, ...test } = options.test ?? {};
		const customRoot = testRoot ?? options.root;
		const root = customRoot ? resolve(configRoot, customRoot) : configRoot;
		promises.push(concurrent(() => resolveSingleProjectEntry(context, {
			...options,
			test,
			root,
			configFile
		}, index)));
	});
	for (const path of fileProjects) {
		// if the file leads to the declaring config itself, reuse the already
		// resolved pair: the root (or the container) also runs as a regular project
		if (parentViteConfig.configFile === path) {
			debug?.(`project at ${path} is the declaring config itself, reusing its resolved config`);
			promises.push(Promise.resolve({
				viteConfig: parentViteConfig,
				projectConfig: parentConfig,
				ancestors: context.ancestors.length > 1 ? context.ancestors.slice(0, -1) : void 0
			}));
			continue;
		}
		const configFile = path.endsWith("/") ? false : path;
		const projectRoot = path.endsWith("/") ? path : dirname(path);
		debug?.(`project at ${path} resolves its own Vite config: file and directory projects never share the server`);
		promises.push(concurrent(() => resolveSingleProjectEntry(
			context,
			// an inline `root` would take priority over the `root` in the config file
			{
				configFile,
				plugins: [ProjectRootPlugin(projectRoot)]
			},
			path
		)));
	}
	const settled = await Promise.allSettled(promises);
	const errors = [];
	const entries = [];
	for (const result of settled) if (result.status === "rejected") errors.push(result.reason);
	else entries.push(result.value);
	if (errors.length) throw new AggregateError(errors, "Failed to initialize projects. There were errors during projects setup. See below for more details.");
	return flattenContainerEntries(context, entries);
}
/**
* Replace container entries (file-based configs that declare `projects`) with
* the projects they declare, recursively. A container behaves like the root
* config: it doesn't run tests and never gets a Vite server; its projects
* extend it by default and their names are prefixed with the container's name.
*/
async function flattenContainerEntries(context, entries) {
	const result = [];
	for (const entry of entries) {
		const definitions = entry.projectConfig.projects;
		// inline projects cannot declare `projects`; the declaring config's own
		// entry (emitted when it references its own config file) is kept as-is —
		// its `projects` are the definitions currently being resolved
		if (entry.inline || definitions === void 0 || entry.projectConfig === context.parentConfig) {
			result.push(entry);
			continue;
		}
		const configFile = entry.viteConfig.configFile;
		const relativeFile = configFile ? relative(context.rootConfig.root, configFile) : entry.projectConfig.name;
		debug?.(`config "${relativeFile}" is a container declaring ${definitions.length} project definitions, it doesn't run tests itself`);
		let chain = context.chain;
		if (configFile) {
			const realConfigFile = safeRealpath(configFile);
			if (chain.includes(realConfigFile)) throw new Error([
				`Found a circular "projects" definition: `,
				[...chain, realConfigFile].map((file) => `"${relative(context.rootConfig.root, file)}"`).join(" -> "),
				". Make sure your configuration is correct."
			].join(""));
			chain = [...chain, realConfigFile];
			context.containerConfigFiles.push(configFile);
		}
		const children = await resolveDeclaredProjectEntries({
			...context,
			parentViteConfig: entry.viteConfig,
			parentConfig: entry.projectConfig,
			ancestors: [...context.ancestors, entry.projectConfig.name],
			chain
		}, definitions);
		// the raw config was only needed to resolve this container's projects,
		// which are all known by now; the resolved container config outlives this
		// resolution (children keep its server alive), so don't let it retain the
		// raw copy for the whole session
		entry.projectConfig._rawTestConfig = void 0;
		if (!children.length) throw new Error(`No projects were found in "${relativeFile}". Make sure your configuration is correct.`);
		result.push(...children);
	}
	return result;
}
function safeRealpath(path) {
	try {
		return realpathSync(path);
	} catch {
		return path;
	}
}
function inheritRootViteOverrides(rootConfig, options) {
	// `plugins` are already initialised, keeping them would break isolation
	const { plugins: _plugins, ...rootViteOverrides } = rootConfig.viteOverrides;
	// cloned so plugins that mutate inherited arrays in place don't share
	// them between the root and every project
	const inherited = deepClone(rootViteOverrides);
	// `tagsFilter` is CLI-only; `PROJECT_CLI_OVERRIDES` applies it per project
	delete inherited.test?.tagsFilter;
	// `browser` describes the instances of a single project; inheriting it
	// would create duplicate instance names (the `--browser` flags have the
	// same guard in `vitest:config:cli`)
	delete inherited.test?.browser;
	return mergeConfig(inherited, options);
}
// test options that reach the Vite config during a project's resolution:
// `alias` is hoisted into `resolve.alias`, `css` configures CSS processing
// and scoped class names, `mode` selects env files and plugin behavior,
// `root` anchors the server, and `browser` selects a browser server
const VITE_AFFECTING_TEST_OPTIONS = [
	"alias",
	"browser",
	"css",
	"mode",
	"root"
];
function projectLabel(name) {
	return name ? `"${name}"` : "(root)";
}
function inlineProjectLabel(options, index) {
	const name = options.test?.name;
	const label = typeof name === "string" ? name : name?.label;
	return label ? `"${label}"` : `at index ${index}`;
}
function getOwnServerReason(context, options) {
	if (!context.rootConfig.sharedViteServer) return "`sharedViteServer` is disabled";
	const rawParentTest = context.parentConfig._rawTestConfig;
	if (rawParentTest === void 0) return "the raw `test` options of the declaring config are not available";
	if (options.extends !== void 0 && options.extends !== true) {
		if (!(typeof options.extends === "string" && context.parentViteConfig.configFile !== void 0 && resolve(context.parentConfig.root, options.extends) === context.parentViteConfig.configFile)) return "`extends` doesn't point to the declaring config";
	}
	for (const key in options) {
		if (key === "test" || key === "extends") continue;
		const value = options[key];
		if (value === void 0) continue;
		if (key === "plugins" && hasNoPlugins(value)) continue;
		// `define` is applied at runtime and doesn't affect the server
		if (key === "define") continue;
		return `\`${key}\` changes the Vite config`;
	}
	// an inherited `browser` config makes the project a browser project, which
	// needs its own browser server; other inherited values are safe
	if (rawParentTest.browser) return "the inherited `browser` config needs a browser server";
	const test = options.test;
	if (!test) return;
	const affecting = VITE_AFFECTING_TEST_OPTIONS.find((option) => test[option] !== void 0);
	if (affecting) return `\`test.${affecting}\` affects the Vite config`;
	// the dependency optimizer state (scanned deps, rewritten import URLs)
	// belongs to the server, and `deps.moduleDirectories` configures the
	// server's `resolve` options
	const deps = test.deps;
	if (deps?.optimizer !== void 0) return "`test.deps.optimizer` affects the Vite config";
	if (deps?.moduleDirectories !== void 0) return "`test.deps.moduleDirectories` affects the Vite config";
}
// covers `plugins: condition ? [plugin()] : []`
function hasNoPlugins(plugins) {
	return Array.isArray(plugins) && plugins.every((plugin) => !plugin || Array.isArray(plugin) && hasNoPlugins(plugin));
}
function countPluginNames(plugins) {
	const counts = /* @__PURE__ */ new Map();
	for (const plugin of plugins) if (plugin.name) counts.set(plugin.name, (counts.get(plugin.name) || 0) + 1);
	return counts;
}
function warnDuplicateInheritedPlugins(logger, projectConfig, projectViteConfig, parentViteConfig, configFile, root) {
	const parentCounts = countPluginNames(parentViteConfig.plugins);
	const duplicates = [];
	for (const [name, count] of countPluginNames(projectViteConfig.plugins)) {
		// a duplicate already present in the declaring config is not caused by `extends`
		const parentCount = parentCounts.get(name) || 0;
		if (count > 1 && parentCount > 0 && count > parentCount) duplicates.push(name);
	}
	if (!duplicates.length) return;
	logger.warn(withLabel("yellow", "Vitest", [
		`The "${projectConfig.name}" project applies the same plugin multiple times: ${duplicates.map((name) => `"${name}"`).join(", ")}. `,
		`Since Vitest 5, an inline project extends the config file that declares it by default, so the plugins from "${relative(root, configFile)}" already apply to this project and don't need to be listed again.\n`,
		`Remove the duplicated plugins from the project, or set \`extends: false\` to not inherit the declaring config. `,
		`Setting the \`extends\` option explicitly hides this warning.`
	].join("")));
}
// `deleteDefineConfig` always drops these
const DROPPED_DEFINE_KEYS = [
	"process.env",
	"process",
	"global"
];
// mirrors `deleteDefineConfig`: a string is a code replacement unless it parses as JSON
function parseDefineValue(value) {
	if (typeof value !== "string") return {
		parsed: true,
		value
	};
	try {
		return {
			parsed: true,
			value: JSON.parse(value)
		};
	} catch {
		return { parsed: false };
	}
}
// the runtime part of `deleteDefineConfig` for a project that shares the parent server
function resolveSharedProjectDefines(define, parentConfig) {
	if (!define) return {
		defines: parentConfig.defines,
		scriptDefines: parentConfig._scriptDefines
	};
	let defines = parentConfig.defines;
	let scriptDefines = parentConfig._scriptDefines;
	const copyDefines = () => {
		if (defines === parentConfig.defines) defines = { ...parentConfig.defines };
		return defines;
	};
	for (const key in define) {
		// `import.meta.vitest` is injected per test file for in-source testing
		if (DROPPED_DEFINE_KEYS.includes(key) || key === "import.meta.vitest") continue;
		const result = parseDefineValue(define[key]);
		if (result.parsed && key.startsWith("import.meta.env.")) process.env[key.slice(16)] = result.value;
		else if (result.parsed && key.startsWith("process.env.")) process.env[key.slice(12)] = result.value;
		else if (result.parsed && !key.includes(".")) copyDefines()[key] = result.value;
		else {
			if (scriptDefines === void 0 || scriptDefines === parentConfig._scriptDefines) scriptDefines = { ...parentConfig._scriptDefines };
			scriptDefines[key] = define[key];
			if (key in defines)
 // the script runs before the runtime defines are assigned,
			// an inherited value would override the entry
			delete copyDefines()[key];
		}
	}
	return {
		defines,
		scriptDefines
	};
}
/**
* Resolve an inline project that shares the declaring config's Vite server.
* Instead of re-executing the config file through Vite, the project's options
* are merged onto the declaring config's raw `test` options and run through
* the same `TestConfigPlugin` hooks a full resolution applies.
*/
function resolveSharedServerEntry(context, options, index) {
	const { harness, rootConfig, parentViteConfig, parentConfig, cliOverrides } = context;
	// the base is cloned so children never share mutable values with each other
	// or with the captured config; `mergeConfig` applies the same rules Vite
	// uses when the extending project is resolved with `configFile` (inline
	// values win, arrays are concatenated)
	const merged = mergeConfig({ test: deepClone(parentConfig._rawTestConfig) }, { test: options.test ?? {} }).test;
	const { defines, scriptDefines } = resolveSharedProjectDefines(options.define, parentConfig);
	const mergedOptions = resolveTestOptions(merged, {
		harness,
		cliOptions: cliOverrides,
		globalConfig: rootConfig,
		project: {
			options,
			extendsTrueRootConfig: parentConfig === rootConfig
		},
		sharedServer: {
			defines,
			scriptDefines,
			moduleRunnerOptions: parentConfig._moduleRunnerOptions
		}
	});
	mergedOptions.name = resolveProjectName(mergedOptions.name, index, context.ancestors.at(-1));
	return {
		viteConfig: parentViteConfig,
		projectConfig: resolveTestConfig(harness.logger, mergedOptions, parentViteConfig, parentConfig),
		inline: true,
		sharedServer: true,
		ancestors: context.ancestors.length ? [...context.ancestors] : void 0
	};
}
async function resolveSingleProjectEntry(context, options, workspacePath) {
	const { harness, rootViteConfig, rootConfig, parentViteConfig, parentConfig, cliOverrides } = context;
	const { configFile, ...restOptions } = options;
	const captures = {};
	// only inline entries (keyed by their index) extend another config;
	// file-based projects own all of their values
	const isInlineEntry = typeof workspacePath === "number";
	const inheritsParentConfig = isInlineEntry && options.extends !== false && typeof options.extends !== "string";
	// the root `globalSetup` runs once per test run, so it is stripped from
	// projects extending the root config file (directly or via `extends: true`
	// at the top level); a container's `globalSetup` stays inherited because
	// nothing else runs it, like any other non-root extended config
	const extendsTrueRootConfig = inheritsParentConfig && parentConfig === rootConfig || !!configFile && configFile === rootViteConfig.configFile;
	const projectInline = {
		...inheritsParentConfig && parentConfig === rootConfig ? inheritRootViteOverrides(rootConfig, restOptions) : restOptions,
		configFile,
		configLoader: parentViteConfig.inlineConfig.configLoader,
		// this will make "mode": "test" inside defineConfig
		mode: options.test?.mode || options.mode || parentConfig.mode,
		plugins: [
			CaptureRawTestConfig(captures, rootConfig.sharedViteServer),
			...TestConfigPlugin(harness, captures, cliOverrides, rootConfig, isInlineEntry ? {
				options,
				extendsTrueRootConfig
			} : void 0),
			...options.plugins || [],
			...WorkspaceVitestPlugin(harness, parentViteConfig),
			...BrowserLoaderPlugin(captures, harness)
		]
	};
	const projectViteConfig = await resolveConfig$1(projectInline, "serve");
	// inherit the declaring config's resolved env as defaults; a project's own
	// env wins, like every other option a project can override
	for (const key in parentViteConfig.env) projectViteConfig.env[key] ??= parentViteConfig.env[key];
	const mergedOptions = projectViteConfig.test ?? {};
	// resolved after `viteResolveConfig` so a plugin can still set `test.name`
	mergedOptions.name = resolveProjectName(mergedOptions.name, workspacePath, context.ancestors.at(-1));
	const projectConfig = resolveTestConfig(harness.logger, mergedOptions, projectViteConfig, parentConfig);
	projectViteConfig.test = projectConfig;
	if (inheritsParentConfig && options.extends === void 0 && configFile) warnDuplicateInheritedPlugins(harness.logger, projectConfig, projectViteConfig, parentViteConfig, configFile, rootConfig.root);
	// The browser provider's contribution (captured during this resolution by the
	// `vitest:browser:loader` plugin) is carried on the resolved config + entry so
	// server creation can build the single shared Vite server.
	projectConfig._browserContribution = captures.browserContribution;
	projectConfig._rawTestConfig = captures.rawTestConfig;
	projectConfig._moduleRunnerOptions = captures.moduleRunnerOptions;
	// `captures` lives as long as the server that keeps its plugins,
	// so it should not hold onto the config
	captures.rawTestConfig = void 0;
	debug?.(`resolved the Vite config of project "${projectConfig.name}" (${configFile || projectViteConfig.root})`);
	return {
		viteConfig: projectViteConfig,
		projectConfig,
		inline: isInlineEntry,
		ancestors: context.ancestors.length ? [...context.ancestors] : void 0
	};
}
function expandBrowserInstancesInEntries(globalConfig, entries, names) {
	// non-browser entries first, then each browser parent followed by its instances
	const result = [];
	const browserEntries = [];
	for (const entry of entries) if (entry.projectConfig.browser.enabled) browserEntries.push(entry);
	else result.push(entry);
	for (const entry of browserEntries) {
		const { projectConfig, viteConfig } = entry;
		const parentName = projectConfig.name;
		const instances = projectConfig.browser.instances ?? [];
		if (instances.length === 0 || isEntryExcludedByFilter(globalConfig.project, parentName, entry.ancestors)) {
			debug?.(`browser project ${projectLabel(parentName)} is dropped: ${instances.length === 0 ? "it has no instances" : "it is excluded by the --project filter"}`);
			continue;
		}
		const parentMatches = matchesEntryFilter(globalConfig.project, parentName, entry.ancestors);
		const filteredInstances = instances.filter((instance) => parentMatches ? !isExcludedByProjectFilter(globalConfig.project, instance.name) : matchesProjectFilter(globalConfig.project, instance.name));
		if (!filteredInstances.length) {
			debug?.(`browser project ${projectLabel(parentName)} is dropped: no instances match the --project filter`);
			continue;
		}
		// Keep the parent in the entry list as `hidden` so a `TestProject` is
		// created (instances link to it via `_parent` for the browser provider).
		// The parent's name is removed from `names` because the instance names
		// take its place in the user-facing project list.
		names.delete(parentName);
		result.push({
			...entry,
			hidden: true
		});
		debug?.(`browser project ${projectLabel(parentName)} expands into instances: ${filteredInstances.map((i) => `"${i.name}"`).join(", ")}`);
		filteredInstances.forEach((instance, index) => {
			const browser = instance.browser;
			if (!browser) {
				const nth = index + 1;
				throw new Error(`The browser configuration must have a "browser" property. The ${nth}${nth === 2 ? "nd" : nth === 3 ? "rd" : "th"} item in "browser.instances" doesn't have it. Make sure your${projectConfig.name ? ` "${projectConfig.name}"` : ""} configuration is correct.`);
			}
			const name = instance.name;
			if (name == null) throw new Error(`The browser configuration must have a "name" property. This is a bug in Vitest. Please, open a new issue with reproduction`);
			if (instance.provider?.name != null && projectConfig.browser.provider?.name != null && instance.provider?.name !== projectConfig.browser.provider?.name) throw new Error(`The instance cannot have a different provider from its parent. The "${name}" instance specifies "${instance.provider?.name}" provider, but its parent has a "${projectConfig.browser.provider?.name}" provider.`);
			const provider = instance.provider?.name ?? projectConfig.browser.provider?.name ?? "preview";
			// Browser-mode CDP only features:
			if (provider === "preview" || !isChromiumName(provider, browser)) {
				const browserConfig = `
{
  browser: {
    provider: ${provider}(),
    instances: [
      ${(filteredInstances || []).map((i) => `{ browser: '${i.browser}' }`).join(",\n      ")}
    ],
  },
}
          `.trim();
				const preferredProvider = provider === "preview" ? "playwright" : provider;
				const correctExample = `
{
  browser: {
    provider: ${preferredProvider}(),
    instances: [
      { browser: '${preferredProvider === "playwright" ? "chromium" : "chrome"}' }
    ],
  },
}
          `.trim();
				if (projectConfig.coverage.enabled && projectConfig.coverage.provider === "v8") {
					const coverageExample = `
{
  coverage: {
    provider: 'istanbul',
  },
}
            `.trim();
					throw new Error(`@vitest/coverage-v8 does not work with\n${browserConfig}\n\nUse either:\n${correctExample}\n\n...or change your coverage provider to:\n${coverageExample}\n`);
				}
				if (globalConfig.inspect || globalConfig.inspectBrk) {
					const inspectOption = `--inspect${globalConfig.inspectBrk ? "-brk" : ""}`;
					throw new Error(`${inspectOption} does not work with\n${browserConfig}\n\nUse either:\n${correctExample}\n\n...or disable ${inspectOption}\n`);
				}
			}
			if (names.has(name)) throw new Error([
				`Cannot define a nested project for a ${browser} browser. The project name "${name}" was already defined. `,
				"If you have multiple instances for the same browser, make sure to define a custom \"name\". ",
				"All projects should have unique names. Make sure your configuration is correct."
			].join(""));
			names.add(name);
			const clonedConfig = cloneProjectConfigForBrowserInstance(projectConfig, instance);
			clonedConfig.name = name;
			result.push({
				viteConfig,
				projectConfig: clonedConfig,
				ancestors: entry.ancestors
			});
		});
	}
	return result;
}
/**
* For each benchmark-enabled entry (or every entry when `benchmarkOnly`), inject
* an additional benchmark variant entry. The new entry shares `viteConfig` with
* its non-benchmark counterpart and carries its own benchmark-shaped
* `projectConfig`.
*/
function expandBenchmarksInEntries(entries, names, benchmarkOnly) {
	let lastGroupOrder = Math.max(0, ...entries.map((e) => e.projectConfig.sequence.groupOrder));
	const result = [...entries];
	for (const entry of entries) {
		const benchmark = entry.projectConfig.benchmark;
		if (!benchmark.enabled && !benchmarkOnly || entry.hidden) continue;
		const name = entry.projectConfig.name ? `${entry.projectConfig.name} (bench)` : "bench";
		if (names.has(name)) throw new Error(`Cannot create a benchmark project because the name "${name}" is already in use.`);
		names.add(name);
		debug?.(`benchmark project "${name}" is added for ${projectLabel(entry.projectConfig.name)}`);
		const benchmarkConfig = {
			...entry.projectConfig,
			name,
			include: benchmark.include,
			exclude: benchmark.exclude,
			includeSource: benchmark.includeSource,
			coverage: {
				...entry.projectConfig.coverage,
				enabled: false
			},
			maxWorkers: 1,
			maxConcurrency: 1,
			testTimeout: entry.projectConfig.testTimeout < 6e4 ? 6e4 : entry.projectConfig.testTimeout,
			hookTimeout: entry.projectConfig.hookTimeout < 12e4 ? 12e4 : entry.projectConfig.hookTimeout,
			// `enabled` because the original entry might not be benchmark-enabled (when
			// forced by `--benchmark`); `projectName` carries the parent's name so the
			// runtime can substitute it into `${projectName}` placeholders inside
			// `writeResult` / `bench.from()` paths.
			benchmark: {
				...benchmark,
				enabled: true,
				projectName: entry.projectConfig.name ?? ""
			},
			sequence: {
				...entry.projectConfig.sequence,
				concurrent: false,
				// benchmarks should always run in a separate isolated group
				groupOrder: ++lastGroupOrder
			},
			typecheck: {
				...entry.projectConfig.typecheck,
				enabled: false
			}
		};
		// disable benchmark in the original entry
		benchmark.enabled = false;
		result.push({
			viteConfig: entry.viteConfig,
			projectConfig: benchmarkConfig,
			ancestors: entry.ancestors,
			sharedServer: entry.sharedServer
		});
	}
	return result;
}
function applyProjectFilter(globalConfig, entries) {
	const filter = globalConfig.project;
	if (!filter.length) return entries;
	const browserClusterViteConfigs = new Set(entries.filter((e) => e.hidden).map((e) => e.viteConfig));
	return entries.filter((entry) => {
		if (entry.hidden) return true;
		if (browserClusterViteConfigs.has(entry.viteConfig))
 // Browser instance: already filtered during expansion.
		return true;
		const matches = matchesEntryFilter(filter, entry.projectConfig.name, entry.ancestors);
		if (!matches) debug?.(`project ${projectLabel(entry.projectConfig.name)} is dropped by the --project filter: ${filter.join(", ")}`);
		return matches;
	});
}
function cloneProjectConfigForBrowserInstance(parentConfig, { browser, ...config }) {
	const { locators, viewport, testerHtmlPath, headless, screenshotDirectory, screenshotFailures, fileParallelism, maxWorkers, browser: _browser, name, provider, ...overrideConfig } = config;
	const currentBrowser = parentConfig.browser;
	const clonedConfig = deepClone(parentConfig);
	return mergeConfig({
		...clonedConfig,
		maxWorkers: fileParallelism === false ? 1 : maxWorkers != null ? resolveMaxWorkers(maxWorkers) : clonedConfig.maxWorkers,
		browser: {
			...parentConfig.browser,
			locators: locators ? {
				testIdAttribute: locators.testIdAttribute ?? currentBrowser.locators.testIdAttribute,
				exact: locators.exact ?? currentBrowser.locators.exact,
				errorFormat: locators.errorFormat ?? currentBrowser.locators.errorFormat
			} : parentConfig.browser.locators,
			viewport: viewport ?? currentBrowser.viewport,
			testerHtmlPath: testerHtmlPath ?? currentBrowser.testerHtmlPath,
			screenshotDirectory: screenshotDirectory ?? currentBrowser.screenshotDirectory,
			screenshotFailures: screenshotFailures ?? currentBrowser.screenshotFailures,
			headless: headless ?? currentBrowser.headless,
			provider: provider ?? currentBrowser.provider,
			name: browser,
			instances: []
		},
		// If there is no include or exclude or includeSource pattern in browser.instances[], we should use the that's pattern from the parent project
		include: overrideConfig.include && overrideConfig.include.length > 0 ? [] : clonedConfig.include,
		exclude: overrideConfig.exclude && overrideConfig.exclude.length > 0 ? [] : clonedConfig.exclude,
		includeSource: overrideConfig.includeSource && overrideConfig.includeSource.length > 0 ? [] : clonedConfig.includeSource
	}, overrideConfig);
}
function matchesEntryFilter(filter, name, ancestors) {
	if (!filter.length) return true;
	if (isEntryExcludedByFilter(filter, name, ancestors)) return false;
	const positives = filter.filter((project) => !project.startsWith("!"));
	if (!positives.length) return true;
	const names = [name, ...ancestors || []];
	return positives.some((project) => {
		const regexp = wildcardPatternToRegExp(project);
		return names.some((candidate) => regexp.test(candidate));
	});
}
function isEntryExcludedByFilter(filter, name, ancestors) {
	return isExcludedByProjectFilter(filter, name) || !!ancestors?.some((ancestor) => isExcludedByProjectFilter(filter, ancestor));
}
async function resolveTestProjectConfigs(parentViteConfig, parentConfig, projectsDefinition) {
	// project configurations that were specified directly
	const projectsOptions = [];
	// custom config files that were specified directly or resolved from a directory
	const projectsConfigFiles = [];
	// custom glob matches that should be resolved as directories or config files
	const projectsGlobMatches = [];
	// directories that don't have a config file inside, but should be treated as projects
	const nonConfigProjectDirectories = [];
	for (const definition of projectsDefinition) if (typeof definition === "string") {
		const stringOption = definition.replace("<rootDir>", () => parentConfig.root);
		// if the string doesn't contain a glob, we can resolve it directly
		// ['./vitest.config.js']
		if (!isDynamicPattern(stringOption)) {
			const file = resolve(parentConfig.root, stringOption);
			if (!existsSync(file)) throw new Error(`Projects definition references a non-existing file or a directory: ${file}`);
			const stats = statSync(file);
			// user can specify a config file directly
			if (stats.isFile()) {
				const name = basename(file);
				if (!CONFIG_REGEXP.test(name)) throw new Error(`The file "${relative(parentConfig.root, file)}" must start with "vitest.config"/"vite.config" or match the pattern "(vitest|vite).*.config.*" to be a valid project config.`);
				projectsConfigFiles.push(file);
			} else if (stats.isDirectory()) {
				const configFile = resolveDirectoryConfig(file);
				if (configFile) projectsConfigFiles.push(configFile);
				else {
					const directory = file.at(-1) === "/" ? file : `${file}/`;
					nonConfigProjectDirectories.push(directory);
				}
			} else
 // should never happen
			throw new TypeError(`Unexpected file type: ${file}`);
		} else projectsGlobMatches.push(stringOption);
	} else if (typeof definition === "function") projectsOptions.push(await definition({
		command: "serve",
		mode: parentViteConfig.mode,
		isPreview: false,
		isSsrBuild: false
	}));
	else projectsOptions.push(await definition);
	if (projectsGlobMatches.length) {
		const globOptions = {
			absolute: true,
			dot: true,
			onlyFiles: false,
			cwd: parentConfig.root,
			expandDirectories: false,
			ignore: [
				"**/node_modules/**",
				"**/*.timestamp-*",
				"**/.DS_Store"
			]
		};
		const projectsFs = await glob(projectsGlobMatches, globOptions);
		debug?.(`projects glob ${projectsGlobMatches.map((p) => `"${p}"`).join(", ")} matched ${projectsFs.length} paths`);
		projectsFs.forEach((path) => {
			// directories are allowed with a glob like `packages/*`
			// in this case every directory is treated as a project
			if (path.endsWith("/")) {
				const configFile = resolveDirectoryConfig(path);
				if (configFile) projectsConfigFiles.push(configFile);
				else nonConfigProjectDirectories.push(path);
			} else {
				const name = basename(path);
				if (!CONFIG_REGEXP.test(name)) throw new Error(`The projects glob matched a file "${relative(parentConfig.root, path)}", but it should also either start with "vitest.config"/"vite.config" or match the pattern "(vitest|vite).*.config.*".`);
				projectsConfigFiles.push(path);
			}
		});
	}
	return {
		projectConfigs: projectsOptions,
		nonConfigDirectories: nonConfigProjectDirectories,
		configFiles: Array.from(new Set(projectsConfigFiles))
	};
}
function resolveDirectoryConfig(directory) {
	const files = new Set(readdirSync(directory));
	// default resolution looks for vitest.config.* or vite.config.* files
	// this simulates how `findUp` works in packages/vitest/src/node/create.ts:29
	const configFile = configFiles.find((file) => files.has(file));
	if (configFile) return resolve(directory, configFile);
	return null;
}
function resolveProjectName(name, workspacePath, containerLabel) {
	let { label, color } = typeof name === "string" ? { label: name } : {
		label: "",
		...name
	};
	if (!label) {
		if (typeof workspacePath === "number") label = workspacePath.toString();
		else {
			const dir = workspacePath.endsWith("/") ? workspacePath.slice(0, -1) : dirname(workspacePath);
			const pkgJsonPath = resolve(dir, "package.json");
			if (existsSync(pkgJsonPath)) label = JSON.parse(readFileSync(pkgJsonPath, "utf-8")).name;
			if (typeof label !== "string" || !label) label = basename(dir);
		}
	}
	// Projects declared by a container config are namespaced by the container's
	// name: the "unit" project of an "app" container is named "app (unit)".
	if (containerLabel) label = `${containerLabel} (${label})`;
	return {
		label,
		color
	};
}
async function attachProjectsFromEntries(vitest, entries) {
	// For each unique `viteConfig`, the "primary" project owns the server.
	// Siblings (browser instance variants, benchmark variants) share it via `_parent`.
	const primaryByViteConfig = /* @__PURE__ */ new Map();
	const childrenByViteConfig = /* @__PURE__ */ new Map();
	for (const entry of entries) {
		const children = childrenByViteConfig.get(entry.viteConfig) ?? [];
		children.push(entry);
		childrenByViteConfig.set(entry.viteConfig, children);
	}
	// every entry with the root `viteConfig` (the default project, its
	// browser/benchmark variants, shared-server projects) attaches to
	// `coreWorkspaceProject`
	if (vitest.vite) {
		if (!vitest.coreWorkspaceProject) {
			vitest.coreWorkspaceProject = TestProject._createBasicProject(vitest);
			// a browser-enabled root owns the parent browser project
			// so instance siblings can attach to it
			if (vitest._rootBrowserParent) vitest.coreWorkspaceProject._parentBrowser = vitest._rootBrowserParent;
		}
		primaryByViteConfig.set(vitest.vite.config, vitest.coreWorkspaceProject);
	}
	const projects = [];
	for (const entry of entries) {
		const { viteConfig, projectConfig, hidden } = entry;
		const primary = primaryByViteConfig.get(viteConfig);
		if (primary) {
			if (hidden) continue;
			// Default-project no-browser case: the entry's `projectConfig` IS the
			// root's resolved config.
			if (primary === vitest.coreWorkspaceProject && projectConfig === vitest.config) {
				projects.push(vitest.coreWorkspaceProject);
				continue;
			}
			// a shared-server project reuses only the Vite server
			if (entry.sharedServer) {
				debug?.(`project ${projectLabel(projectConfig.name)} reuses the Vite server of ${projectLabel(primary.name)} with its own module runner`);
				const project = new TestProject(vitest, primary.vite, viteConfig, projectConfig);
				project._sharedViteServer = true;
				project._initializeRunners(primary.vite);
				projects.push(project);
				continue;
			}
			debug?.(`project ${projectLabel(projectConfig.name)} shares the Vite server and module runner of ${projectLabel(primary.name)}`);
			const sibling = TestProject._spawnSibling(primary, projectConfig);
			// Browser-instance siblings share the primary's single (browser) Vite
			// server; each gets its own `ProjectBrowser` view onto it.
			if (primary._parentBrowser) sibling.browser = primary._parentBrowser.spawn(sibling);
			projects.push(sibling);
			continue;
		}
		// Workspace project with its own `viteConfig`: own a fresh Vite server. For
		// a browser cluster this is the single server shared by `project.vite` and
		// `project.browser.vite`.
		debug?.(`creating a Vite server for project ${projectLabel(projectConfig.name)}`);
		const children = childrenByViteConfig.get(viteConfig) ?? [];
		const { server, parent } = await createClusterServer(vitest, viteConfig, projectConfig, children);
		const project = new TestProject(vitest, server, viteConfig, projectConfig);
		// a shared entry can create the container's server on first use,
		// but the server still belongs to the declaring config
		project._sharedViteServer = !!entry.sharedServer;
		project._initializeRunners(server);
		if (parent) project._parentBrowser = parent;
		primaryByViteConfig.set(viteConfig, project);
		if (!hidden) projects.push(project);
	}
	return projects;
}
/**
* Public entry point used by `injectTestProject` to add projects at runtime.
* Resolves entries from the given definitions and attaches `TestProject`s with
* their Vite servers.
*/
async function resolveAndAttachProjects(harness, definitions) {
	debug?.(`injecting ${definitions.length} project definitions at runtime`);
	const vitest = harness.getVitest();
	return attachProjectsFromEntries(vitest, await resolveProjectEntries(harness, vitest.viteConfig, vitest.config, definitions, {
		// filtering an injected project out is expected at runtime (the user can
		// call `injectTestProjects` with a name that doesn't match the active filter;
		// we just return an empty list).
		throwIfEmpty: false,
		existingNames: new Set(vitest.projects.map((p) => p.name))
	}));
}
function isChromiumName(provider, name) {
	if (provider === "playwright") return name === "chromium";
	return name === "chrome" || name === "edge";
}

class BaseSequencer {
	ctx;
	constructor(ctx) {
		this.ctx = ctx;
	}
	// async so it can be extended by other sequencers
	async shard(files) {
		const { config } = this.ctx;
		const { index, count } = config.shard;
		const [shardStart, shardEnd] = this.calculateShardRange(files.length, index, count);
		return Array.from(files, (spec) => {
			const specPath = resolve(slash(config.root), slash(spec.moduleId))?.slice(config.root.length);
			return {
				spec,
				hash: hash("sha1", specPath, "hex")
			};
		}).sort((a, b) => a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0).slice(shardStart, shardEnd).map(({ spec }) => spec);
	}
	// async so it can be extended by other sequencers
	async sort(files) {
		const cache = this.ctx.cache;
		const results = new Map(files.map((spec) => [spec, cache.getTestSpecificationResult(spec)]));
		// the size is only a fallback for files without results
		const sizes = files.some((spec) => !results.get(spec)) ? await getFileSizes(files) : /* @__PURE__ */ new Map();
		return [...files].sort((a, b) => {
			// "sequence.groupOrder" is higher priority
			const groupOrderDiff = a.project.config.sequence.groupOrder - b.project.config.sequence.groupOrder;
			if (groupOrderDiff !== 0) return groupOrderDiff;
			// Projects run sequential
			if (a.project.name !== b.project.name) return a.project.name < b.project.name ? -1 : 1;
			// Isolated run first
			if (a.project.config.isolate && !b.project.config.isolate) return -1;
			if (!a.project.config.isolate && b.project.config.isolate) return 1;
			const aState = results.get(a);
			const bState = results.get(b);
			if (!aState || !bState) {
				const sizeA = sizes.get(a.moduleId);
				const sizeB = sizes.get(b.moduleId);
				// run unknown first
				if (sizeA == null || sizeB == null) return sizeA == null && sizeB != null ? -1 : sizeB == null && sizeA != null ? 1 : 0;
				// run larger files first
				return sizeB - sizeA;
			}
			// run failed first
			if (aState.failed && !bState.failed) return -1;
			if (!aState.failed && bState.failed) return 1;
			// run longer first
			return bState.duration - aState.duration;
		});
	}
	// Calculate distributed shard range [start, end] distributed equally
	calculateShardRange(filesCount, index, count) {
		const baseShardSize = Math.floor(filesCount / count);
		const remainderTestFilesCount = filesCount % count;
		if (remainderTestFilesCount >= index) {
			const shardSize = baseShardSize + 1;
			return [shardSize * (index - 1), shardSize * index];
		}
		const shardStart = remainderTestFilesCount * (baseShardSize + 1) + (index - remainderTestFilesCount - 1) * baseShardSize;
		return [shardStart, shardStart + baseShardSize];
	}
}
async function getFileSizes(files) {
	const sizes = /* @__PURE__ */ new Map();
	const moduleIds = new Set(files.map((spec) => spec.moduleId));
	await Promise.all(Array.from(moduleIds, async (moduleId) => {
		try {
			const stats = await stat(moduleId);
			sizes.set(moduleId, stats.size);
		} catch {}
	}));
	return sizes;
}

class RandomSequencer extends BaseSequencer {
	async sort(files) {
		const { sequence } = this.ctx.config;
		return shuffle(files, sequence.seed);
	}
}

var jsTokens_1;
var hasRequiredJsTokens;

function requireJsTokens () {
	if (hasRequiredJsTokens) return jsTokens_1;
	hasRequiredJsTokens = 1;
	// Copyright 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023 Simon Lydell
	// License: MIT.
	var Identifier, JSXIdentifier, JSXPunctuator, JSXString, JSXText, KeywordsWithExpressionAfter, KeywordsWithNoLineTerminatorAfter, LineTerminatorSequence, MultiLineComment, Newline, NumericLiteral, Punctuator, RegularExpressionLiteral, SingleLineComment, StringLiteral, Template, TokensNotPrecedingObjectLiteral, TokensPrecedingExpression, WhiteSpace;
	RegularExpressionLiteral = /\/(?![*\/])(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\\]).|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/yu;
	Punctuator = /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y;
	Identifier = /(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/yu;
	StringLiteral = /(['"])(?:(?!\1)[^\\\n\r]|\\(?:\r\n|[^]))*(\1)?/y;
	NumericLiteral = /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y;
	Template = /[`}](?:[^`\\$]|\\[^]|\$(?!\{))*(`|\$\{)?/y;
	WhiteSpace = /[\t\v\f\ufeff\p{Zs}]+/yu;
	LineTerminatorSequence = /\r?\n|[\r\u2028\u2029]/y;
	MultiLineComment = /\/\*(?:[^*]|\*(?!\/))*(\*\/)?/y;
	SingleLineComment = /\/\/.*/y;
	JSXPunctuator = /[<>.:={}]|\/(?![\/*])/y;
	JSXIdentifier = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/yu;
	JSXString = /(['"])(?:(?!\1)[^])*(\1)?/y;
	JSXText = /[^<>{}]+/y;
	TokensPrecedingExpression = /^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/;
	TokensNotPrecedingObjectLiteral = /^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/;
	KeywordsWithExpressionAfter = /^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/;
	KeywordsWithNoLineTerminatorAfter = /^(?:return|throw|yield)$/;
	Newline = RegExp(LineTerminatorSequence.source);
	jsTokens_1 = function*(input, {jsx = false} = {}) {
		var braces, firstCodePoint, isExpression, lastIndex, lastSignificantToken, length, match, mode, nextLastIndex, nextLastSignificantToken, parenNesting, postfixIncDec, punctuator, stack;
		({length} = input);
		lastIndex = 0;
		lastSignificantToken = "";
		stack = [
			{tag: "JS"}
		];
		braces = [];
		parenNesting = 0;
		postfixIncDec = false;
		while (lastIndex < length) {
			mode = stack[stack.length - 1];
			switch (mode.tag) {
				case "JS":
				case "JSNonExpressionParen":
				case "InterpolationInTemplate":
				case "InterpolationInJSX":
					if (input[lastIndex] === "/" && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken))) {
						RegularExpressionLiteral.lastIndex = lastIndex;
						if (match = RegularExpressionLiteral.exec(input)) {
							lastIndex = RegularExpressionLiteral.lastIndex;
							lastSignificantToken = match[0];
							postfixIncDec = true;
							yield ({
								type: "RegularExpressionLiteral",
								value: match[0],
								closed: match[1] !== void 0 && match[1] !== "\\"
							});
							continue;
						}
					}
					Punctuator.lastIndex = lastIndex;
					if (match = Punctuator.exec(input)) {
						punctuator = match[0];
						nextLastIndex = Punctuator.lastIndex;
						nextLastSignificantToken = punctuator;
						switch (punctuator) {
							case "(":
								if (lastSignificantToken === "?NonExpressionParenKeyword") {
									stack.push({
										tag: "JSNonExpressionParen",
										nesting: parenNesting
									});
								}
								parenNesting++;
								postfixIncDec = false;
								break;
							case ")":
								parenNesting--;
								postfixIncDec = true;
								if (mode.tag === "JSNonExpressionParen" && parenNesting === mode.nesting) {
									stack.pop();
									nextLastSignificantToken = "?NonExpressionParenEnd";
									postfixIncDec = false;
								}
								break;
							case "{":
								Punctuator.lastIndex = 0;
								isExpression = !TokensNotPrecedingObjectLiteral.test(lastSignificantToken) && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken));
								braces.push(isExpression);
								postfixIncDec = false;
								break;
							case "}":
								switch (mode.tag) {
									case "InterpolationInTemplate":
										if (braces.length === mode.nesting) {
											Template.lastIndex = lastIndex;
											match = Template.exec(input);
											lastIndex = Template.lastIndex;
											lastSignificantToken = match[0];
											if (match[1] === "${") {
												lastSignificantToken = "?InterpolationInTemplate";
												postfixIncDec = false;
												yield ({
													type: "TemplateMiddle",
													value: match[0]
												});
											} else {
												stack.pop();
												postfixIncDec = true;
												yield ({
													type: "TemplateTail",
													value: match[0],
													closed: match[1] === "`"
												});
											}
											continue;
										}
										break;
									case "InterpolationInJSX":
										if (braces.length === mode.nesting) {
											stack.pop();
											lastIndex += 1;
											lastSignificantToken = "}";
											yield ({
												type: "JSXPunctuator",
												value: "}"
											});
											continue;
										}
								}
								postfixIncDec = braces.pop();
								nextLastSignificantToken = postfixIncDec ? "?ExpressionBraceEnd" : "}";
								break;
							case "]":
								postfixIncDec = true;
								break;
							case "++":
							case "--":
								nextLastSignificantToken = postfixIncDec ? "?PostfixIncDec" : "?UnaryIncDec";
								break;
							case "<":
								if (jsx && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken))) {
									stack.push({tag: "JSXTag"});
									lastIndex += 1;
									lastSignificantToken = "<";
									yield ({
										type: "JSXPunctuator",
										value: punctuator
									});
									continue;
								}
								postfixIncDec = false;
								break;
							default:
								postfixIncDec = false;
						}
						lastIndex = nextLastIndex;
						lastSignificantToken = nextLastSignificantToken;
						yield ({
							type: "Punctuator",
							value: punctuator
						});
						continue;
					}
					Identifier.lastIndex = lastIndex;
					if (match = Identifier.exec(input)) {
						lastIndex = Identifier.lastIndex;
						nextLastSignificantToken = match[0];
						switch (match[0]) {
							case "for":
							case "if":
							case "while":
							case "with":
								if (lastSignificantToken !== "." && lastSignificantToken !== "?.") {
									nextLastSignificantToken = "?NonExpressionParenKeyword";
								}
						}
						lastSignificantToken = nextLastSignificantToken;
						postfixIncDec = !KeywordsWithExpressionAfter.test(match[0]);
						yield ({
							type: match[1] === "#" ? "PrivateIdentifier" : "IdentifierName",
							value: match[0]
						});
						continue;
					}
					StringLiteral.lastIndex = lastIndex;
					if (match = StringLiteral.exec(input)) {
						lastIndex = StringLiteral.lastIndex;
						lastSignificantToken = match[0];
						postfixIncDec = true;
						yield ({
							type: "StringLiteral",
							value: match[0],
							closed: match[2] !== void 0
						});
						continue;
					}
					NumericLiteral.lastIndex = lastIndex;
					if (match = NumericLiteral.exec(input)) {
						lastIndex = NumericLiteral.lastIndex;
						lastSignificantToken = match[0];
						postfixIncDec = true;
						yield ({
							type: "NumericLiteral",
							value: match[0]
						});
						continue;
					}
					Template.lastIndex = lastIndex;
					if (match = Template.exec(input)) {
						lastIndex = Template.lastIndex;
						lastSignificantToken = match[0];
						if (match[1] === "${") {
							lastSignificantToken = "?InterpolationInTemplate";
							stack.push({
								tag: "InterpolationInTemplate",
								nesting: braces.length
							});
							postfixIncDec = false;
							yield ({
								type: "TemplateHead",
								value: match[0]
							});
						} else {
							postfixIncDec = true;
							yield ({
								type: "NoSubstitutionTemplate",
								value: match[0],
								closed: match[1] === "`"
							});
						}
						continue;
					}
					break;
				case "JSXTag":
				case "JSXTagEnd":
					JSXPunctuator.lastIndex = lastIndex;
					if (match = JSXPunctuator.exec(input)) {
						lastIndex = JSXPunctuator.lastIndex;
						nextLastSignificantToken = match[0];
						switch (match[0]) {
							case "<":
								stack.push({tag: "JSXTag"});
								break;
							case ">":
								stack.pop();
								if (lastSignificantToken === "/" || mode.tag === "JSXTagEnd") {
									nextLastSignificantToken = "?JSX";
									postfixIncDec = true;
								} else {
									stack.push({tag: "JSXChildren"});
								}
								break;
							case "{":
								stack.push({
									tag: "InterpolationInJSX",
									nesting: braces.length
								});
								nextLastSignificantToken = "?InterpolationInJSX";
								postfixIncDec = false;
								break;
							case "/":
								if (lastSignificantToken === "<") {
									stack.pop();
									if (stack[stack.length - 1].tag === "JSXChildren") {
										stack.pop();
									}
									stack.push({tag: "JSXTagEnd"});
								}
						}
						lastSignificantToken = nextLastSignificantToken;
						yield ({
							type: "JSXPunctuator",
							value: match[0]
						});
						continue;
					}
					JSXIdentifier.lastIndex = lastIndex;
					if (match = JSXIdentifier.exec(input)) {
						lastIndex = JSXIdentifier.lastIndex;
						lastSignificantToken = match[0];
						yield ({
							type: "JSXIdentifier",
							value: match[0]
						});
						continue;
					}
					JSXString.lastIndex = lastIndex;
					if (match = JSXString.exec(input)) {
						lastIndex = JSXString.lastIndex;
						lastSignificantToken = match[0];
						yield ({
							type: "JSXString",
							value: match[0],
							closed: match[2] !== void 0
						});
						continue;
					}
					break;
				case "JSXChildren":
					JSXText.lastIndex = lastIndex;
					if (match = JSXText.exec(input)) {
						lastIndex = JSXText.lastIndex;
						lastSignificantToken = match[0];
						yield ({
							type: "JSXText",
							value: match[0]
						});
						continue;
					}
					switch (input[lastIndex]) {
						case "<":
							stack.push({tag: "JSXTag"});
							lastIndex++;
							lastSignificantToken = "<";
							yield ({
								type: "JSXPunctuator",
								value: "<"
							});
							continue;
						case "{":
							stack.push({
								tag: "InterpolationInJSX",
								nesting: braces.length
							});
							lastIndex++;
							lastSignificantToken = "?InterpolationInJSX";
							postfixIncDec = false;
							yield ({
								type: "JSXPunctuator",
								value: "{"
							});
							continue;
					}
			}
			WhiteSpace.lastIndex = lastIndex;
			if (match = WhiteSpace.exec(input)) {
				lastIndex = WhiteSpace.lastIndex;
				yield ({
					type: "WhiteSpace",
					value: match[0]
				});
				continue;
			}
			LineTerminatorSequence.lastIndex = lastIndex;
			if (match = LineTerminatorSequence.exec(input)) {
				lastIndex = LineTerminatorSequence.lastIndex;
				postfixIncDec = false;
				if (KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken)) {
					lastSignificantToken = "?NoLineTerminatorHere";
				}
				yield ({
					type: "LineTerminatorSequence",
					value: match[0]
				});
				continue;
			}
			MultiLineComment.lastIndex = lastIndex;
			if (match = MultiLineComment.exec(input)) {
				lastIndex = MultiLineComment.lastIndex;
				if (Newline.test(match[0])) {
					postfixIncDec = false;
					if (KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken)) {
						lastSignificantToken = "?NoLineTerminatorHere";
					}
				}
				yield ({
					type: "MultiLineComment",
					value: match[0],
					closed: match[1] !== void 0
				});
				continue;
			}
			SingleLineComment.lastIndex = lastIndex;
			if (match = SingleLineComment.exec(input)) {
				lastIndex = SingleLineComment.lastIndex;
				postfixIncDec = false;
				yield ({
					type: "SingleLineComment",
					value: match[0]
				});
				continue;
			}
			firstCodePoint = String.fromCodePoint(input.codePointAt(lastIndex));
			lastIndex += firstCodePoint.length;
			lastSignificantToken = firstCodePoint;
			postfixIncDec = false;
			yield ({
				type: mode.tag.startsWith("JSX") ? "JSXInvalid" : "Invalid",
				value: firstCodePoint
			});
		}
		return void 0;
	};
	return jsTokens_1;
}

var jsTokensExports = requireJsTokens();
var jsTokens = /*@__PURE__*/getDefaultExportFromCjs(jsTokensExports);

// src/index.ts
var reservedWords = {
  keyword: [
    "break",
    "case",
    "catch",
    "continue",
    "debugger",
    "default",
    "do",
    "else",
    "finally",
    "for",
    "function",
    "if",
    "return",
    "switch",
    "throw",
    "try",
    "var",
    "const",
    "while",
    "with",
    "new",
    "this",
    "super",
    "class",
    "extends",
    "export",
    "import",
    "null",
    "true",
    "false",
    "in",
    "instanceof",
    "typeof",
    "void",
    "delete"
  ],
  strict: [
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "yield"
  ]
}, keywords = new Set(reservedWords.keyword), reservedWordsStrictSet = new Set(reservedWords.strict), sometimesKeywords = /* @__PURE__ */ new Set(["as", "async", "from", "get", "of", "set"]);
function isReservedWord(word) {
  return word === "await" || word === "enum";
}
function isStrictReservedWord(word) {
  return isReservedWord(word) || reservedWordsStrictSet.has(word);
}
function isKeyword(word) {
  return keywords.has(word);
}
var BRACKET = /^[()[\]{}]$/, getTokenType = function(token) {
  if (token.type === "IdentifierName") {
    if (isKeyword(token.value) || isStrictReservedWord(token.value) || sometimesKeywords.has(token.value))
      return "Keyword";
    if (token.value[0] && token.value[0] !== token.value[0].toLowerCase())
      return "IdentifierCapitalized";
  }
  return token.type === "Punctuator" && BRACKET.test(token.value) ? "Bracket" : token.type === "Invalid" && (token.value === "@" || token.value === "#") ? "Punctuator" : token.type;
};
function getCallableType(token) {
  if (token.type === "IdentifierName")
    return "IdentifierCallable";
  if (token.type === "PrivateIdentifier")
    return "PrivateIdentifierCallable";
  throw new Error("Not a callable token");
}
var colorize = (defs, type, value) => {
  let colorize2 = defs[type];
  return colorize2 ? colorize2(value) : value;
}, highlightTokens = (defs, text, jsx) => {
  let highlighted = "", lastPotentialCallable = null, stackedHighlight = "";
  for (let token of jsTokens(text, { jsx })) {
    let type = getTokenType(token);
    if (type === "IdentifierName" || type === "PrivateIdentifier") {
      lastPotentialCallable && (highlighted += colorize(defs, getTokenType(lastPotentialCallable), lastPotentialCallable.value) + stackedHighlight, stackedHighlight = ""), lastPotentialCallable = token;
      continue;
    }
    if (lastPotentialCallable && (token.type === "WhiteSpace" || token.type === "LineTerminatorSequence" || token.type === "Punctuator" && (token.value === "?." || token.value === "!"))) {
      stackedHighlight += colorize(defs, type, token.value);
      continue;
    }
    if (stackedHighlight && !lastPotentialCallable && (highlighted += stackedHighlight, stackedHighlight = ""), lastPotentialCallable) {
      let type2 = token.type === "Punctuator" && token.value === "(" ? getCallableType(lastPotentialCallable) : getTokenType(lastPotentialCallable);
      highlighted += colorize(defs, type2, lastPotentialCallable.value) + stackedHighlight, stackedHighlight = "", lastPotentialCallable = null;
    }
    highlighted += colorize(defs, type, token.value);
  }
  return highlighted;
};
function highlight(code, options = { jsx: false, colors: {} }) {
  return code && highlightTokens(options.colors || {}, code, options.jsx);
}

const HIGHLIGHT_SUPPORTED_EXTS = new Set(["js", "ts"].flatMap((lang) => [
	`.${lang}`,
	`.m${lang}`,
	`.c${lang}`,
	`.${lang}x`,
	`.m${lang}x`,
	`.c${lang}x`
]));
function highlightCode(id, source) {
	const ext = extname(id);
	if (!HIGHLIGHT_SUPPORTED_EXTS.has(ext)) return source;
	const isJsx = ext.endsWith("x");
	return highlight(source, {
		jsx: isJsx,
		colors: getDefs($)
	});
}
function getDefs(c) {
	const Invalid = (text) => c.white(c.bgRed(c.bold(text)));
	return {
		Keyword: c.magenta,
		IdentifierCapitalized: c.yellow,
		Punctuator: c.yellow,
		StringLiteral: c.green,
		NoSubstitutionTemplate: c.green,
		MultiLineComment: c.gray,
		SingleLineComment: c.gray,
		RegularExpressionLiteral: c.cyan,
		NumericLiteral: c.blue,
		TemplateHead: (text) => c.green(text.slice(0, text.length - 2)) + c.cyan(text.slice(-2)),
		TemplateTail: (text) => c.cyan(text.slice(0, 1)) + c.green(text.slice(1)),
		TemplateMiddle: (text) => c.cyan(text.slice(0, 1)) + c.green(text.slice(1, text.length - 2)) + c.cyan(text.slice(-2)),
		IdentifierCallable: c.blue,
		PrivateIdentifierCallable: (text) => `#${c.blue(text.slice(1))}`,
		Invalid,
		JSXString: c.green,
		JSXIdentifier: c.yellow,
		JSXInvalid: Invalid,
		JSXPunctuator: c.yellow
	};
}

const PAD = "      ";
const ESC = "\x1B[";
const ERASE_DOWN = `${ESC}J`;
const ERASE_SCROLLBACK = `${ESC}3J`;
const CURSOR_TO_START = `${ESC}1;1H`;
const HIDE_CURSOR = `${ESC}?25l`;
const SHOW_CURSOR = `${ESC}?25h`;
const CLEAR_SCREEN = "\x1Bc";
class Logger {
	outputStream;
	errorStream;
	_clearScreenPending;
	_highlights = /* @__PURE__ */ new Map();
	cleanupListeners = [];
	console;
	ctx;
	constructor(outputStream = process.stdout, errorStream = process.stderr) {
		this.outputStream = outputStream;
		this.errorStream = errorStream;
		this.console = new Console({
			stdout: outputStream,
			stderr: errorStream
		});
		this._highlights.clear();
		if (this.outputStream.isTTY) this.outputStream.write(HIDE_CURSOR);
	}
	setVitest(vitest) {
		this.ctx = vitest;
		this.addCleanupListeners();
		this.registerUnhandledRejection();
		return this;
	}
	log(...args) {
		this._clearScreen();
		this.console.log(...args);
	}
	error(...args) {
		this._clearScreen();
		this.console.error(...args);
	}
	warn(...args) {
		this._clearScreen();
		this.console.warn(...args);
	}
	clearFullScreen(message = "") {
		if (!this.ctx.config.clearScreen) {
			this.console.log(message);
			return;
		}
		if (message) this.console.log(`${CLEAR_SCREEN}${ERASE_SCROLLBACK}${message}`);
		else this.outputStream.write(`${CLEAR_SCREEN}${ERASE_SCROLLBACK}`);
	}
	clearScreen(message, force = false) {
		if (!this.ctx.config.clearScreen) {
			this.console.log(message);
			return;
		}
		this._clearScreenPending = message;
		if (force) this._clearScreen();
	}
	_clearScreen() {
		if (this._clearScreenPending == null) return;
		const log = this._clearScreenPending;
		this._clearScreenPending = void 0;
		this.console.log(`${CURSOR_TO_START}${ERASE_DOWN}${log}`);
	}
	printError(err, options = {}) {
		printError(err, this.ctx, this, options);
	}
	formatError(err, options = {}) {
		return capturePrintError(err, this.ctx, options);
	}
	deprecate(message) {
		this.error($.bold($.bgYellow(" DEPRECATED ")), $.yellow(message));
	}
	clearHighlightCache(filename) {
		if (filename) this._highlights.delete(filename);
		else this._highlights.clear();
	}
	highlight(filename, source) {
		if (this._highlights.has(filename)) return this._highlights.get(filename);
		const code = highlightCode(filename, source);
		this._highlights.set(filename, code);
		return code;
	}
	printNoTestTagsFound() {
		this.error($.bgRed(" ERROR "), $.red("No test tags found in any project. Exiting with code 1."));
	}
	printTags() {
		const vitest = this.ctx;
		const rootProject = vitest.getRootProject();
		const projects = [rootProject, ...vitest.projects.filter((p) => p !== rootProject)];
		if (!projects.some((p) => p.config.tags && p.config.tags.length > 0)) {
			process.exitCode = 1;
			return this.printNoTestTagsFound();
		}
		for (const project of projects) {
			if (project.name) this.log(formatProjectName(project, ""));
			project.config.tags.forEach((tag) => {
				const tagLog = `${tag.name}${tag.description ? `: ${tag.description}` : ""}`;
				this.log(`  ${tagLog}`);
			});
		}
	}
	printNoTestFound(filters) {
		const config = this.ctx.config;
		// test files were found, but none of them depend on the changed files
		const noAffectedTests = !!this.ctx._sourceFilterResult?.total;
		// test files were found, but none of them failed in the last run
		const noFailedTests = !!this.ctx._failedFilterResult?.total;
		const message = noFailedTests ? "No failed tests found" : !noAffectedTests ? "No test files found" : config.related?.length ? "No affected test files found" : "No changed files found";
		if (config.watch && (noAffectedTests || noFailedTests)) this.log(`${message}\n`);
		else if (config.watch) this.log($.red(`${message}. You can change the file name pattern by pressing "p"\n`));
		else if (config.passWithNoTests) this.log(`${message}, exiting with code 0\n`);
		else this.error($.red(`${message}, exiting with code 1\n`));
		if (noAffectedTests || noFailedTests) return;
		const comma = $.dim(", ");
		if (filters?.length) this.console.error($.dim("filter: ") + $.yellow(filters.join(comma)));
		const projectsFilter = toArray(config.project);
		if (projectsFilter.length) this.console.error($.dim("projects: ") + $.yellow(projectsFilter.join(comma)));
		this.ctx.projects.forEach((project) => {
			const config = project.config;
			if (!project.isRootProject() && project.name) this.console.error(`\n${formatProjectName(project)}\n`);
			if (config.include) this.console.error($.dim("include: ") + $.yellow(config.include.join(comma)));
			if (config.exclude) this.console.error($.dim("exclude:  ") + $.yellow(config.exclude.join(comma)));
			if (config.typecheck.enabled) {
				this.console.error($.dim("typecheck include: ") + $.yellow(config.typecheck.include.join(comma)));
				this.console.error($.dim("typecheck exclude: ") + $.yellow(config.typecheck.exclude.join(comma)));
			}
		});
		this.console.error();
	}
	printBanner() {
		this.log();
		const color = this.ctx.config.watch ? "blue" : "cyan";
		const mode = this.ctx.config.watch ? "DEV" : "RUN";
		this.log(withLabel(color, mode, `v${this.ctx.version} `) + $.gray(this.ctx.config.root));
		const seed = this.ctx.getSeed();
		if (seed != null) this.log(PAD + $.gray(`Running tests with seed "${seed}"`));
		const resolvedUrls = this.ctx.vite.resolvedUrls;
		const origin = resolvedUrls?.local[0] ?? resolvedUrls?.network[0];
		if (origin && this.ctx.config._apiRequested) {
			if (this.ctx.config.ui) {
				const url = new URL(this.ctx.config.uiBase, origin);
				url.searchParams.set("token", this.ctx.config.api.token);
				this.log(PAD + $.dim($.green(`UI started at ${url}`)));
			} else this.log(PAD + $.dim($.green(`API started at ${new URL("/", origin)}`)));
		}
		if (this.ctx.coverageProvider) this.log(PAD + $.dim("Coverage enabled with ") + $.yellow(this.ctx.coverageProvider.name));
		if (this.ctx.config.standalone) this.log($.yellow(`\nVitest is running in standalone mode. Edit a test file to rerun tests.\n`));
		else this.log();
	}
	printUnhandledErrors(errors) {
		const errorMessage = $.red($.bold(`\nVitest caught ${errors.length} unhandled error${errors.length > 1 ? "s" : ""} during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.`));
		this.error(errorBanner("Unhandled Errors"));
		this.error(errorMessage);
		errors.forEach((err) => {
			this.printError(err, {
				fullStack: err.name !== "EnvironmentTeardownError",
				type: err.type || "Unhandled Error"
			});
		});
		this.error($.red(divider()));
	}
	printSourceTypeErrors(errors) {
		const errorMessage = $.red($.bold(`\nVitest found ${errors.length} error${errors.length > 1 ? "s" : ""} not related to your test files.`));
		this.log(errorBanner("Source Errors"));
		this.log(errorMessage);
		errors.forEach((err) => {
			this.printError(err, { fullStack: true });
		});
		this.log($.red(divider()));
	}
	getColumns() {
		return "columns" in this.outputStream ? this.outputStream.columns : 80;
	}
	onTerminalCleanup(listener) {
		this.cleanupListeners.push(listener);
	}
	addCleanupListeners() {
		const cleanup = () => {
			this.cleanupListeners.forEach((fn) => fn());
			if (this.outputStream.isTTY) this.outputStream.write(SHOW_CURSOR);
		};
		const onExit = (signal, exitCode) => {
			cleanup();
			// Interrupted signals don't set exit code automatically.
			// Use same exit code as node: https://nodejs.org/api/process.html#signal-events
			if (process.exitCode === void 0) process.exitCode = exitCode !== void 0 ? 128 + exitCode : Number(signal);
			// Timeout to flush stderr
			setTimeout(() => process.exit(), 1);
		};
		process.once("SIGINT", onExit);
		process.once("SIGTERM", onExit);
		process.once("exit", onExit);
		this.ctx.onClose(() => {
			process.off("SIGINT", onExit);
			process.off("SIGTERM", onExit);
			process.off("exit", onExit);
			cleanup();
		});
	}
	registerUnhandledRejection() {
		const onUnhandledRejection = (err) => {
			process.exitCode = 1;
			this.printError(err, {
				fullStack: true,
				type: "Unhandled Rejection"
			});
			this.error("\n\n");
			process.exit();
		};
		process.on("unhandledRejection", onUnhandledRejection);
		this.ctx.onClose(() => {
			process.off("unhandledRejection", onUnhandledRejection);
		});
	}
}

const __dirname$1 = url.fileURLToPath(new URL(".", import.meta.url));
class VitestPackageInstaller {
	isPackageExists(name, options) {
		return isPackageExists(name, options);
	}
	async ensureInstalled(dependency, root, version) {
		if (process.env.VITEST_SKIP_INSTALL_CHECKS) return true;
		if (process.versions.pnp) {
			const targetRequire = createRequire(__dirname$1);
			try {
				targetRequire.resolve(dependency, { paths: [root, __dirname$1] });
				return true;
			} catch {}
		}
		if (/* @__PURE__ */ isPackageExists(dependency, { paths: [root, __dirname$1] })) return true;
		process.stderr.write(withLabel("red", "MISSING DEPENDENCY", `Cannot find dependency '${dependency}'\n\n`));
		if (!isTTY) return false;
		const { install } = await (await Promise.resolve().then(function () { return index; })).default({
			type: "confirm",
			name: "install",
			message: $.reset(`Do you want to install ${$.green(dependency)}?`)
		});
		if (install) {
			const packageName = version ? `${dependency}@${version}` : dependency;
			await (await import('./index.BoyTG_B7.js')).installPackage(packageName, { dev: true });
			// TODO: somehow it fails to load the package after installation, remove this when it's fixed
			process.stderr.write($.yellow(`\nPackage ${packageName} installed, re-run the command to start.\n`));
			process.exit();
			return true;
		}
		return false;
	}
}

class PluginHarness {
	logger;
	packageInstaller;
	vitest;
	version = version$1;
	/**
	* @internal
	*/
	_browserLastPort = defaultBrowserPort;
	/**
	* @internal
	*/
	_prewarmedBrowsers = 0;
	constructor(logger = new Logger(), packageInstaller = new VitestPackageInstaller()) {
		this.logger = logger;
		this.packageInstaller = packageInstaller;
	}
	setVitest(vitest) {
		this.vitest = vitest;
		return this;
	}
	getVitest() {
		if (!this.vitest) throw new Error(`Don't have access to the "vitest" instance yet. This is a bug in Vitest.`);
		return this.vitest;
	}
}

const builtinVCSProviders = /* @__PURE__ */ new Set(["git", "mtime"]);
function resolvePath(path, root) {
	// local-pkg (mlly)'s resolveModule("./file", { paths: ["/some/root"] }) tries
	// /some/file
	// /some/file.js
	// /some/root/file
	// /some/root/file.js
	// etc.
	// but we don't want to resolve files from parent directories,
	// so we ensure passing "/" suffix such as "/some/root/"
	// https://github.com/unjs/mlly/blob/401d42983f6f3a9112658d67b0a92ba4fb1d7efa/src/resolve.ts#L104-L110
	return normalize(/* @__PURE__ */ resolveModule(path, { paths: [join(root, "/")] }) ?? resolve(root, path));
}
function findConfigFile(root) {
	for (const configFile of configFiles) {
		const configPath = resolve(root, configFile);
		if (existsSync(configPath)) return configPath;
	}
	// if not found, then there is no config to find.
	// `false` will stop vite from trying to find it again
	return false;
}
function parseInspector(inspect) {
	if (typeof inspect === "boolean" || inspect === void 0) return {};
	if (typeof inspect === "number") return { port: inspect };
	if (/https?:\//.test(inspect)) throw new Error(`Inspector host cannot be a URL. Use "host:port" instead of "${inspect}"`);
	const [host, port] = inspect.split(":");
	if (!port) return { host };
	return {
		host,
		port: Number(port) || defaultInspectPort
	};
}
function resolveApiServerConfig(config, defaultPort, logger) {
	const isBrowserEnabled = !!config.browser?.enabled;
	let api;
	if (normalizeUIOptions(config.ui).enabled && !config.api) api = { port: defaultPort };
	else if (config.api === true) api = { port: defaultPort };
	else if (typeof config.api === "number") api = { port: config.api };
	if (typeof config.api === "object") {
		if (api) {
			if (config.api.port) api.port = config.api.port;
			if (config.api.strictPort) api.strictPort = config.api.strictPort;
			if (config.api.host) api.host = config.api.host;
		} else api = { ...config.api };
	}
	if (api) {
		if (api.port == null && !api.middlewareMode) api.port = defaultPort;
	} else api = { middlewareMode: true };
	if (api && isBrowserEnabled) {
		// Always force middlewareMode to false in browser mode
		api.middlewareMode = false;
		// The browser server is standalone, so it always needs a port even when the
		// user didn't configure `api`/`ui` (in which case `api` defaulted above)
		if (api.port == null) api.port = defaultPort;
	}
	// if the API server is exposed to network, disable write operations by default
	if (!api.middlewareMode && api.host && api.host !== "localhost" && api.host !== "127.0.0.1") {
		if (api.allowWrite == null && api.allowExec == null) logger.error($.yellow(`${$.bgYellow(" WARNING ")} API server is exposed to network, disabling write and exec operations by default for security reasons. This can cause some APIs to not work as expected. Set \`browser.api.allowExec\` manually to hide this warning. See https://vitest.dev/config/api for more details.`));
		api.allowWrite ??= false;
		api.allowExec ??= false;
	} else {
		api.allowWrite ??= true;
		api.allowExec ??= true;
	}
	return api;
}
/**
* Records which options the user provided explicitly. Must be computed from
* the raw user config sources BEFORE `configDefaults` is merged in - the
* merged object cannot distinguish a default from a user-provided value.
*/
function captureProvidedOptions(...sources) {
	return {
		pool: sources.some((source) => source?.pool != null),
		isolate: sources.some((source) => source?.isolate != null),
		environment: sources.some((source) => source?.environment != null || source?.dom),
		fsModuleCache: sources.some((source) => source?.fsModuleCache != null || (source?.experimental)?.fsModuleCache != null),
		silent: sources.some((source) => source?.silent != null),
		maxWorkers: sources.some((source) => source?.maxWorkers != null)
	};
}
// warn only once, check one PER PROCESS, not per instance,
// that's why it's on a module-level
let warnedTypeCheck = false;
/**
* Resolve Vitest's test config for a single Vite resolved config (root or a single project).
*
* This is the internal single-config resolver. The top-level `resolveConfig`
* orchestrates the full pipeline (root + projects + browser/benchmark expansion).
*
* `globalConfig` is the resolved root config, passed when resolving a project.
*/
function resolveTestConfig(logger, options, viteConfig, globalConfig) {
	if (options.dom) {
		if (viteConfig.test?.environment != null && viteConfig.test.environment !== "happy-dom") logger.warn(withLabel("yellow", "Vitest", `Your config.test.environment ("${viteConfig.test.environment}") conflicts with --dom flag ("happy-dom"), ignoring "${viteConfig.test.environment}"`));
		options.environment = "happy-dom";
	}
	// provenance must be captured from the raw options BEFORE `configDefaults`
	// is merged in - the merged object cannot distinguish a default from a
	// user-provided value; `viteConfig.test` is not resolved yet at this point,
	// the call sites assign the resolved config to it after this function returns
	const providedOptions = captureProvidedOptions(options, viteConfig.test);
	const resolved = deepMerge({}, configDefaults, options);
	resolved.root = viteConfig.root;
	resolved.providedOptions = providedOptions;
	const uiOptions = normalizeUIOptions(options.ui);
	resolved.ui = !!uiOptions.enabled;
	resolved.uiOptions = { theme: uiOptions.theme ?? "auto" };
	// These options are resolved once for the whole run using the root config.
	// Coverage is shared by reference: each project's setup/test/config files are
	// appended to the same exclude list below, keeping them out of the report.
	if (globalConfig) {
		resolved.coverage = globalConfig.coverage;
		resolved.attachmentsDir = globalConfig.attachmentsDir;
		resolved.mergeReportsLabel = globalConfig.mergeReportsLabel;
		resolved.watch = globalConfig.watch;
	}
	if (!statSync(resolved.root, { throwIfNoEntry: false })?.isDirectory()) throw new Error(`Root path does not exist or is not a directory: ${resolved.root}`);
	resolved.mode ??= viteConfig.mode ?? "test";
	if (resolved.retry && typeof resolved.retry === "object" && typeof resolved.retry.condition === "function") {
		logger.warn($.yellow("Warning: retry.condition function cannot be used inside a config file. Use a RegExp pattern instead, or define the function in your test file."));
		resolved.retry = {
			...resolved.retry,
			condition: void 0
		};
	}
	if (options.pool && typeof options.pool !== "string") {
		resolved.pool = options.pool.name;
		resolved.poolRunner = options.pool;
	}
	if ("poolOptions" in resolved) logger.deprecate("`test.poolOptions` was removed in Vitest 4. All previous `poolOptions` are now top-level options. Please, refer to the migration guide: https://v4.vitest.dev/guide/migration#pool-rework");
	if ("workspace" in resolved) throw new Error("The `test.workspace` option was removed in Vitest 4. Please, migrate to `test.projects` instead. See https://vitest.dev/guide/projects for examples.");
	resolved.pool ??= "forks";
	resolved.project = toArray(resolved.project);
	resolved.provide ??= {};
	// shallow copy tags array to avoid mutating user config
	resolved.tags = [...resolved.tags || []];
	const definedTags = /* @__PURE__ */ new Set();
	resolved.tags.forEach((tag) => {
		if (!tag.name || typeof tag.name !== "string") throw new Error(`Each tag defined in "test.tags" must have a "name" property, received: ${JSON.stringify(tag)}`);
		if (definedTags.has(tag.name)) throw new Error(`Tag name "${tag.name}" is already defined in "test.tags". Tag names must be unique.`);
		if (/\s/.test(tag.name)) throw new Error(`Tag name "${tag.name}" is invalid. Tag names cannot contain spaces.`);
		if (/[!()*|&]/.test(tag.name)) throw new Error(`Tag name "${tag.name}" is invalid. Tag names cannot contain "!", "*", "&", "|", "(", or ")".`);
		if (/^\s*(?:and|or|not)\s*$/i.test(tag.name)) throw new Error(`Tag name "${tag.name}" is invalid. Tag names cannot be a logical operator like "and", "or", "not".`);
		if (typeof tag.retry === "object" && typeof tag.retry.condition === "function") throw new TypeError(`Tag "${tag.name}": retry.condition function cannot be used inside a config file. Use a RegExp pattern instead, or define the function in your test file.`);
		if (tag.priority != null && (typeof tag.priority !== "number" || tag.priority < 0)) throw new TypeError(`Tag "${tag.name}": priority must be a non-negative number.`);
		definedTags.add(tag.name);
	});
	resolved.name = typeof options.name === "string" ? options.name : options.name?.label || "";
	resolved.color = typeof options.name !== "string" ? options.name?.color : void 0;
	if (resolved.environment === "browser") throw new Error(`Looks like you set "test.environment" to "browser". To enable Browser Mode, use "test.browser.enabled" instead.`);
	resolved.benchmark = {
		...benchmarkConfigDefaults,
		...resolved.benchmark
	};
	if (resolved.benchmark.provider) resolved.benchmark.provider = resolvePath(resolved.benchmark.provider, resolved.root);
	const inspector = resolved.inspect || resolved.inspectBrk;
	resolved.inspector = {
		...resolved.inspector,
		...parseInspector(inspector),
		enabled: !!inspector,
		waitForDebugger: options.inspector?.waitForDebugger ?? !!resolved.inspectBrk
	};
	if (viteConfig.base !== "/") resolved.base = viteConfig.base;
	resolved.clearScreen = resolved.clearScreen ?? viteConfig.clearScreen ?? true;
	if (options.shard) {
		if (resolved.watch) throw new Error("You cannot use --shard option with enabled watch");
		const [indexString, countString] = options.shard.split("/");
		const index = Math.abs(Number.parseInt(indexString, 10));
		const count = Math.abs(Number.parseInt(countString, 10));
		if (Number.isNaN(count) || count <= 0) throw new Error("--shard <count> must be a positive number");
		if (Number.isNaN(index) || index <= 0 || index > count) throw new Error("--shard <index> must be a positive number less then <count>");
		resolved.shard = {
			index,
			count
		};
	}
	if (resolved.standalone && !resolved.watch) throw new Error(`Vitest standalone mode requires --watch`);
	if (resolved.mergeReports && resolved.watch) throw new Error(`Cannot merge reports with --watch enabled`);
	resolved.maxWorkers = resolved.maxWorkers ? resolveMaxWorkers(resolved.maxWorkers) : getDefaultMaxWorkers(resolved.watch);
	// `browser.fileParallelism` was replaced by the top-level `fileParallelism`. Map
	// it (only when browser is enabled, since it was a browser-only option) so
	// existing configs keep working instead of being silently ignored.
	const browserOptions = options.browser;
	const browserFileParallelism = browserOptions?.enabled ? browserOptions.fileParallelism : void 0;
	if (browserFileParallelism !== void 0) logger.deprecate("`browser.fileParallelism` is deprecated. Use the top-level `fileParallelism` option instead.");
	if (!(options.fileParallelism ?? browserFileParallelism ?? true))
 // ignore user config, parallelism cannot be implemented without limiting workers
	resolved.maxWorkers = 1;
	if (resolved.maxConcurrency === 0) {
		logger.console.warn($.yellow(`The option "maxConcurrency" cannot be set to 0. Using default value ${configDefaults.maxConcurrency} instead.`));
		resolved.maxConcurrency = configDefaults.maxConcurrency;
	}
	if (resolved.inspect || resolved.inspectBrk) {
		if (resolved.maxWorkers !== 1) {
			const inspectOption = `--inspect${resolved.inspectBrk ? "-brk" : ""}`;
			throw new Error(`You cannot use ${inspectOption} without "--no-file-parallelism"`);
		}
	}
	resolved.browser ??= {};
	const browser = resolved.browser;
	if (browser.enabled) {
		const instances = browser.instances;
		if (!browser.instances) browser.instances = [];
		// The whole project shares a single browser Vite server, so every instance
		// must use the same provider. Validate that here and hoist the provider to
		// the project level so the cluster resolves one even when it is only set per
		// instance (e.g. connect mode). Because the provider is uniform, any
		// instance's server factory represents the whole project.
		const providerNames = /* @__PURE__ */ new Set();
		// It's possible to provide the same name and sneak in a different factory
		const providerFactories = /* @__PURE__ */ new Set();
		if (browser.provider?.name) {
			providerNames.add(browser.provider.name);
			providerFactories.add(browser.provider.serverFactory);
		}
		for (const instance of browser.instances) if (instance.provider?.name) {
			providerNames.add(instance.provider.name);
			providerFactories.add(instance.provider.serverFactory);
		}
		if (providerNames.size > 1 || providerFactories.size > 1) throw new Error(`All browser instances within a project must use the same provider, but found: ${[...providerNames].join(", ")}. Use a single provider for the project, or move the instances into separate projects.`);
		browser.provider ??= browser.instances.find((instance) => instance.provider)?.provider;
		// use `chromium` by default when the preview provider is specified
		// for a smoother experience. if chromium is not available, it will
		// open the default browser anyway
		if (!browser.instances.length && browser.provider?.name === "preview") browser.instances = [{ browser: "chromium" }];
		if (browser.name && instances?.length) {
			// --browser=chromium filters configs to a single one
			browser.instances = browser.instances.filter((instance) => instance.browser === browser.name);
			// if `instances` were defined, but now they are empty,
			// let's throw an error because the filter is invalid
			if (!browser.instances.length) throw new Error([`"browser.instances" was set in the config, but the array is empty. Define at least one browser config.`, ` The "browser.name" was set to "${browser.name}" which filtered all configs (${instances.map((c) => c.browser).join(", ")}). Did you mean to use another name?`].join(""));
		}
		browser.instances.forEach((instance) => {
			instance.name ??= resolved.name ? `${resolved.name} (${instance.browser})` : instance.browser;
		});
	}
	if (resolved.coverage.enabled && resolved.coverage.provider === "istanbul" && resolved.experimental?.viteModuleRunner === false) throw new Error(`"Istanbul" coverage provider is not compatible with "experimental.viteModuleRunner: false". Please, enable "viteModuleRunner" or switch to "v8" coverage provider.`);
	if (browser.enabled && resolved.detectAsyncLeaks) logger.console.warn($.yellow("The option \"detectAsyncLeaks\" is not supported in browser mode and will be ignored."));
	resolved.coverage.reporter = resolveCoverageReporters(resolved.coverage.reporter);
	if (isAgent) {
		// default to `skipFull` and add `text-summary` reporter when `text` reporter is used on agents
		const text = resolved.coverage.reporter.find(([name]) => name === "text");
		const textSummary = resolved.coverage.reporter.find(([name]) => name === "text-summary");
		if (text) {
			text[1] = {
				skipFull: true,
				...text[1]
			};
			if (!textSummary) resolved.coverage.reporter.push(["text-summary", {}]);
		}
	}
	// CLI options are merged into the test config
	if (options.sinceLastRun) {
		if (resolved.cache === false) throw new Error("The \"--since-last-run\" flag requires the \"cache\" option to store the dependencies of the test files.");
		resolved.changed ||= true;
		resolved.experimental ??= {};
		resolved.experimental.recordDependencies = true;
		resolved.experimental.vcsProvider = "mtime";
	}
	if (resolved.coverage.changed === void 0 && resolved.changed !== void 0) resolved.coverage.changed = resolved.changed;
	if (resolved.coverage.enabled && resolved.coverage.reportsDirectory) {
		const reportsDirectory = resolve(resolved.root, resolved.coverage.reportsDirectory);
		if (reportsDirectory === resolved.root || reportsDirectory === process.cwd()) throw new Error(`You cannot set "coverage.reportsDirectory" as ${reportsDirectory}. Vitest needs to be able to remove this directory before test run`);
		if (resolved.coverage.htmlDir) resolved.coverage.htmlDir = resolve(resolved.root, resolved.coverage.htmlDir);
		// infer default htmlDir based on builtin reporter's html output location
		if (!resolved.coverage.htmlDir) {
			const htmlReporter = resolved.coverage.reporter.find(([name]) => name === "html" || name === "html-spa");
			if (htmlReporter) {
				const [, options] = htmlReporter;
				const subdir = options && typeof options === "object" && "subdir" in options && typeof options.subdir === "string" ? options.subdir : void 0;
				resolved.coverage.htmlDir = resolve(reportsDirectory, subdir || ".");
			} else if (resolved.coverage.reporter.find(([name]) => name === "lcov")) resolved.coverage.htmlDir = resolve(reportsDirectory, "lcov-report");
		}
	}
	if (resolved.coverage.enabled && resolved.coverage.provider === "custom" && resolved.coverage.customProviderModule) resolved.coverage.customProviderModule = resolvePath(resolved.coverage.customProviderModule, resolved.root);
	resolved.expect ??= {};
	resolved.deps ??= {};
	resolved.deps.moduleDirectories ??= [];
	resolved.deps.optimizer ??= {};
	// `deps.optimizer` is keyed by Vite environment name, so `web` is a valid
	// key when the user declares that environment themselves
	// (`vite.environments.web`) - only the Vitest 3 alias for `client` is
	// silently ignored
	if (resolved.deps.optimizer.web && !viteConfig.environments.web) logger.deprecate("`deps.optimizer.web` is deprecated. Use `deps.optimizer.client` instead (or `deps.optimizer.ssr` for `node` and `edge` environments).");
	resolved.deps.optimizer.ssr ??= {};
	resolved.deps.optimizer.ssr.enabled ??= false;
	resolved.deps.optimizer.client ??= {};
	resolved.deps.optimizer.client.enabled ??= false;
	resolved.deps.web ??= {};
	resolved.deps.web.transformAssets ??= true;
	resolved.deps.web.transformCss ??= true;
	resolved.deps.web.transformGlobPattern ??= [];
	resolved.setupFiles = toArray(resolved.setupFiles || []).map((file) => resolvePath(file, resolved.root));
	resolved.globalSetup = toArray(resolved.globalSetup || []).map((file) => resolvePath(file, resolved.root));
	if (resolved.coverage.include) resolved.coverage.include = resolved.coverage.include.map((pattern) => {
		if (isDynamicPattern(pattern)) return pattern;
		// Convert patterns like ["src", "packages/server"] to ["src/**", "packages/server/**"]
		return pattern.endsWith("/") ? `${pattern}**` : `${pattern}/**`;
	});
	// Add hard-coded default coverage exclusions. These cannot be overridden by user config.
	// Override original exclude array for cases where user re-uses same object in test.exclude.
	resolved.coverage.exclude = [
		...resolved.coverage.exclude,
		...resolved.setupFiles.map((file) => `${resolved.coverage.allowExternal ? "**/" : ""}${relative(resolved.root, file)}`),
		...resolved.include.filter((pattern) => !pattern.startsWith("!")),
		resolved.config && slash(resolved.config),
		...configFiles,
		"**/virtual:*",
		"**/__x00__*",
		"**/node_modules/**"
	].filter((pattern) => typeof pattern === "string");
	if (resolved.cliExclude) resolved.exclude.push(...resolved.cliExclude);
	if (resolved.runner) resolved.runner = resolvePath(resolved.runner, resolved.root);
	resolved.attachmentsDir = resolve(resolved.root, resolved.attachmentsDir ?? ".vitest/attachments");
	if (resolved.snapshotEnvironment) resolved.snapshotEnvironment = resolvePath(resolved.snapshotEnvironment, resolved.root);
	resolved.testNamePattern = resolved.testNamePattern ? resolved.testNamePattern instanceof RegExp ? resolved.testNamePattern : new RegExp(resolved.testNamePattern) : void 0;
	if (resolved.snapshotFormat && "plugins" in resolved.snapshotFormat) {
		resolved.snapshotFormat.plugins = [];
		// TODO: support it via separate config (like DiffOptions) or via `Function.toString()`
		if (typeof resolved.snapshotFormat.compareKeys === "function") throw new TypeError(`"snapshotFormat.compareKeys" function is not supported.`);
	}
	const UPDATE_SNAPSHOT = resolved.update || process.env.UPDATE_SNAPSHOT;
	resolved.snapshotOptions = {
		expand: resolved.expandSnapshotDiff ?? false,
		snapshotFormat: resolved.snapshotFormat || {},
		updateSnapshot: UPDATE_SNAPSHOT === "all" || UPDATE_SNAPSHOT === "new" || UPDATE_SNAPSHOT === "none" ? UPDATE_SNAPSHOT : isCI && !UPDATE_SNAPSHOT ? "none" : UPDATE_SNAPSHOT ? "all" : "new",
		resolveSnapshotPath: options.resolveSnapshotPath,
		// resolved inside the worker
		snapshotEnvironment: null
	};
	resolved.snapshotSerializers ??= [];
	resolved.snapshotSerializers = resolved.snapshotSerializers.map((file) => resolvePath(file, resolved.root));
	if (options.resolveSnapshotPath) delete resolved.resolveSnapshotPath;
	resolved.execArgv ??= [];
	resolved.pool ??= "threads";
	if (resolved.pool === "vmForks" || resolved.pool === "vmThreads" || resolved.pool === "typescript") resolved.isolate = false;
	// `browser.isolate` was replaced by the top-level `isolate` option. Map it
	// (only when browser is enabled, since it was a browser-only option) so
	// existing configs keep working instead of silently falling back to the
	// isolated default (which is much slower).
	const browserIsolate = browser.enabled ? browser.isolate : void 0;
	if (browserIsolate !== void 0) {
		logger.deprecate("`browser.isolate` is deprecated. Use the top-level `isolate` option instead.");
		if (options.isolate === void 0) resolved.isolate = browserIsolate;
	}
	if (process.env.VITEST_MAX_WORKERS) {
		resolved.maxWorkers = Number.parseInt(process.env.VITEST_MAX_WORKERS);
		resolved.providedOptions.maxWorkers = true;
	}
	if (typeof resolved.diff === "string") resolved.diff = resolvePath(resolved.diff, resolved.root);
	if (options.related) resolved.related = toArray(options.related).map((file) => resolve(resolved.root, file));
	/*
	* Reporters can be defined in many different ways:
	* { reporter: 'json' }
	* { reporter: { onFinish() { method() } } }
	* { reporter: ['json', { onFinish() { method() } }] }
	* { reporter: [[ 'json' ]] }
	* { reporter: [[ 'json' ], 'html'] }
	* { reporter: [[ 'json', { outputFile: 'test.json' } ], 'html'] }
	*/
	if (resolved.reporters) {
		if (!Array.isArray(resolved.reporters)) {
			// Reporter name, e.g. { reporters: 'json' }
			if (typeof resolved.reporters === "string") resolved.reporters = [[resolved.reporters, {}]];
			else resolved.reporters = [resolved.reporters];
		} else {
			const reporters = resolved.reporters;
			resolved.reporters = [];
			for (const reporter of reporters) if (Array.isArray(reporter))
 // Reporter with options, e.g. { reporters: [ [ 'json', { outputFile: 'test.json' } ] ] }
			resolved.reporters.push([reporter[0], reporter[1] || {}]);
			else if (typeof reporter === "string")
 // Reporter name in array, e.g. { reporters: ["html", "json"]}
			resolved.reporters.push([reporter, {}]);
			else
 // Inline reporter, e.g. { reporter: [{ onFinish() { method() } }] }
			resolved.reporters.push(reporter);
		}
	} else resolved.reporters = [];
	// it is passed down as "vitest --reporter ../reporter.js"
	const reportersFromCLI = options.reporter;
	const cliReporters = toArray(reportersFromCLI || []).map((reporter) => {
		// ./reporter.js || ../reporter.js, but not .reporters/reporter.js
		if (/^\.\.?\//.test(reporter)) return resolve(process.cwd(), reporter);
		return reporter;
	});
	if (cliReporters.length) {
		// When CLI reporters are specified, preserve options from config file
		const configReportersMap = /* @__PURE__ */ new Map();
		// Build a map of reporter names to their options from the config
		for (const reporter of resolved.reporters) if (Array.isArray(reporter)) {
			const [reporterName, reporterOptions] = reporter;
			if (typeof reporterName === "string") configReportersMap.set(reporterName, reporterOptions);
		}
		resolved.reporters = Array.from(new Set(toArray(cliReporters))).filter(Boolean).map((reporter) => [reporter, configReportersMap.get(reporter) || {}]);
	}
	// only the root resolves the label; projects receive the root's value above
	if (!globalConfig) {
		resolved.mergeReportsLabel = process.env.VITEST_BLOB_LABEL;
		for (const reporter of resolved.reporters) if (Array.isArray(reporter) && reporter[0] === "blob") {
			const options = reporter[1];
			if (options && typeof options.label === "string") resolved.mergeReportsLabel = options.label;
		}
	}
	if (resolved.changed) resolved.passWithNoTests ??= true;
	if (resolved.browser.enabled)
 // browser mode renders real CSS in the page
	resolved.css = true;
	resolved.css ??= {};
	if (typeof resolved.css === "object") {
		resolved.css.modules ??= {};
		resolved.css.modules.classNameStrategy ??= "stable";
	}
	if (resolved.cache !== false) {
		// projects inherit the root option, so only the root config warns
		if (!globalConfig && resolved.cache && typeof resolved.cache.dir === "string") logger.deprecate(`"cache.dir" is deprecated and has no effect. Use Vite's "cacheDir" instead if you want to change the cache directory. Note that the cache is written to "cacheDir/vitest".`);
		resolved.cache = { dir: viteConfig.cacheDir };
	}
	resolved.sequence ??= {};
	if (resolved.sequence.shuffle && typeof resolved.sequence.shuffle === "object") {
		const { files, tests } = resolved.sequence.shuffle;
		resolved.sequence.sequencer ??= files ? RandomSequencer : BaseSequencer;
		resolved.sequence.shuffle = tests;
	}
	if (!resolved.sequence?.sequencer)
 // CLI flag has higher priority
	resolved.sequence.sequencer = resolved.sequence.shuffle ? RandomSequencer : BaseSequencer;
	resolved.sequence.groupOrder ??= 0;
	resolved.sequence.hooks ??= "stack";
	resolved.sequence.seed ??= Date.now();
	resolved.typecheck = {
		...configDefaults.typecheck,
		...resolved.typecheck
	};
	resolved.typecheck ??= {};
	resolved.typecheck.enabled ??= false;
	if (resolved.typecheck.enabled && !warnedTypeCheck) {
		warnedTypeCheck = true;
		logger.console.warn($.yellow("Testing types with tsc and vue-tsc is an experimental feature.\nBreaking changes might not follow SemVer, please pin Vitest's version when using it."));
	}
	resolved.browser.enabled ??= false;
	resolved.browser.headless ??= isCI;
	// disable in headless mode by default, and if CI is detected
	resolved.browser.ui ??= resolved.browser.headless === true ? false : !isCI;
	resolved.browser.commands ??= {};
	resolved.browser.detailsPanelPosition ??= "right";
	if (resolved.browser.screenshotDirectory) resolved.browser.screenshotDirectory = resolve(resolved.root, resolved.browser.screenshotDirectory);
	if (resolved.inspector.enabled) resolved.browser.trackUnhandledErrors ??= false;
	resolved.browser.viewport ??= {};
	resolved.browser.viewport.width ??= 414;
	resolved.browser.viewport.height ??= 896;
	resolved.browser.locators ??= {};
	resolved.browser.locators.testIdAttribute ??= "data-testid";
	resolved.browser.locators.exact ??= true;
	resolved.browser.locators.errorFormat ??= "all";
	if (typeof resolved.browser.provider === "string") {
		const source = `@vitest/browser-${resolved.browser.provider}`;
		throw new TypeError(`The \`browser.provider\` configuration was changed to accept a factory instead of a string. Add an import of "${resolved.browser.provider}" from "${source}" instead. See: https://vitest.dev/config/browser/provider`);
	}
	const isPreview = resolved.browser.provider?.name === "preview";
	if (!isPreview && resolved.browser.enabled && provider === "stackblitz") throw new Error(`stackblitz environment does not support the ${resolved.browser.provider?.name} provider. Please, use "@vitest/browser-preview" instead.`);
	if (isPreview && resolved.browser.screenshotFailures === true) {
		console.warn($.yellow([
			`Browser provider "preview" doesn't support screenshots, `,
			`so "browser.screenshotFailures" option is forcefully disabled. `,
			`Set "browser.screenshotFailures" to false or remove it from the config to suppress this warning.`
		].join("")));
		resolved.browser.screenshotFailures = false;
	} else resolved.browser.screenshotFailures ??= !isPreview && !resolved.browser.ui;
	if (resolved.browser.provider && resolved.browser.provider.options == null) resolved.browser.provider.options = {};
	if ("api" in resolved.browser) logger.deprecate("`test.browser.api` was deprecated in Vitest 5. Use `test.api` instead.");
	// enable includeTaskLocation by default in UI mode
	if (resolved.browser.enabled) {
		if (resolved.browser.ui) resolved.includeTaskLocation ??= true;
	} else if (resolved.ui) resolved.includeTaskLocation ??= true;
	if (typeof resolved.browser.trace === "string" || !resolved.browser.trace) resolved.browser.trace = { mode: resolved.browser.trace || "off" };
	const traceView = resolved.browser.traceView;
	const traceViewOptions = typeof traceView === "object" ? traceView : void 0;
	if (traceViewOptions?.enabled != null) logger.deprecate("`browser.traceView.enabled` is deprecated. Use `browser.traceView.mode` instead.");
	const traceViewMode = typeof traceView === "string" ? traceView : typeof traceView === "object" ? traceView.mode ?? (traceView.enabled === void 0 ? "failure-only" : traceView.enabled ? "on" : "off") : traceView === void 0 ? "failure-only" : traceView ? "on" : "off";
	resolved.browser.traceView = {
		enabled: traceViewMode !== "off",
		mode: traceViewMode,
		recordCanvas: traceViewOptions?.recordCanvas ?? false,
		inlineImages: traceViewOptions?.inlineImages ?? false,
		ariaSnapshot: traceViewOptions?.ariaSnapshot ?? true
	};
	if (resolved.browser.enabled && resolved.browser.traceView.mode === "on") resolved.browser.detailsPanelPosition = "bottom";
	if (resolved.browser.trace.tracesDir != null) resolved.browser.trace.tracesDir = resolvePath(resolved.browser.trace.tracesDir, resolved.root);
	if (toArray(resolved.reporters).some((reporter) => {
		if (Array.isArray(reporter)) return reporter[0] === "html";
		return false;
	})) resolved.includeTaskLocation ??= true;
	resolved.server ??= {};
	resolved.server.deps ??= {};
	if (resolved.server.debug?.dump || process.env.VITEST_DEBUG_DUMP) {
		const userFolder = resolved.server.debug?.dump || process.env.VITEST_DEBUG_DUMP;
		resolved.dumpDir = resolve(resolved.root, typeof userFolder === "string" && userFolder !== "true" ? userFolder : ".vitest-dump", resolved.name || "root");
	}
	resolved.testTimeout ??= resolved.browser.enabled ? 15e3 : 5e3;
	resolved.hookTimeout ??= resolved.browser.enabled ? 3e4 : 1e4;
	resolved.experimental ??= {};
	resolved.sharedViteServer ??= true;
	if (resolved.experimental.openTelemetry?.sdkPath) {
		const sdkPath = resolve(resolved.root, resolved.experimental.openTelemetry.sdkPath);
		resolved.experimental.openTelemetry.sdkPath = pathToFileURL(sdkPath).toString();
	}
	if (resolved.experimental.openTelemetry?.browserSdkPath) {
		const browserSdkPath = resolve(resolved.root, resolved.experimental.openTelemetry.browserSdkPath);
		resolved.experimental.openTelemetry.browserSdkPath = browserSdkPath;
	}
	resolved.experimental.importDurations ??= {};
	resolved.experimental.importDurations.print ??= false;
	resolved.experimental.importDurations.failOnDanger ??= false;
	if (resolved.experimental.importDurations.limit == null) {
		const shouldCollect = resolved.experimental.importDurations.print || resolved.experimental.importDurations.failOnDanger || resolved.ui;
		resolved.experimental.importDurations.limit = shouldCollect ? 10 : 0;
	}
	resolved.experimental.importDurations.thresholds ??= {};
	resolved.experimental.importDurations.thresholds.warn ??= 100;
	resolved.experimental.importDurations.thresholds.danger ??= 500;
	const diagnostics = resolved.experimental.diagnostics ?? true;
	resolved.experimental.diagnostics = typeof diagnostics === "boolean" ? {
		isolate: diagnostics,
		environment: diagnostics,
		import: diagnostics,
		transform: diagnostics
	} : {
		isolate: diagnostics.isolate ?? true,
		environment: diagnostics.environment ?? true,
		import: diagnostics.import ?? true,
		transform: diagnostics.transform ?? true
	};
	if (typeof resolved.experimental.vcsProvider === "string" && !builtinVCSProviders.has(resolved.experimental.vcsProvider)) resolved.experimental.vcsProvider = resolvePath(resolved.experimental.vcsProvider, resolved.root);
	// `experimental.fsModuleCache` / `experimental.fsModuleCachePath` were promoted to
	// the top-level `fsModuleCache` / `fsModuleCachePath` options.
	const legacyExperimental = options.experimental;
	if (legacyExperimental?.fsModuleCache != null) {
		logger.deprecate("`experimental.fsModuleCache` is deprecated. Use the top-level `fsModuleCache` option instead.");
		if (options.fsModuleCache === void 0) resolved.fsModuleCache = legacyExperimental.fsModuleCache;
	}
	if (legacyExperimental?.fsModuleCachePath != null) {
		logger.deprecate("`experimental.fsModuleCachePath` is deprecated. Use the top-level `fsModuleCachePath` option instead.");
		if (options.fsModuleCachePath === void 0) resolved.fsModuleCachePath = legacyExperimental.fsModuleCachePath;
	}
	resolved.fsModuleCache ??= true;
	if (resolved.fsModuleCachePath) resolved.fsModuleCachePath = resolve(resolved.root, resolved.fsModuleCachePath);
	return resolved;
}
/**
* Captures `config.test` before any Vitest plugin modifies it. Inline projects
* that share this config's Vite server resolve against the captured value
* instead of re-executing the config file (`sharedViteServer`).
*
* Must be the first inline plugin. The consumer must clear
* `captures.rawTestConfig` after storing it because the server retains the plugin.
*/
function CaptureRawTestConfig(captures, capture) {
	return {
		name: "vitest:capture-raw-test-config",
		enforce: "pre",
		config: {
			order: "pre",
			handler(config) {
				if (!(capture ?? config.test?.sharedViteServer ?? true)) return;
				const { projects, ...test } = config.test ?? {};
				// the captured config is only read when this config's inline
				// projects are resolved; without `projects` there is nothing to
				// read it (`injectTestProjects` then resolves through Vite instead)
				if (projects === void 0) return;
				// cloned so mutations from later hooks and from the test-config
				// resolution never reach the captured value; `projects` is left out
				// because it is never inherited and can be the largest part of the config
				captures.rawTestConfig = deepClone(test);
			}
		}
	};
}
function resolveConfigPath(root, options) {
	if (options.config === false) return false;
	if (options.config) return resolveModule(options.config, { paths: [root] }) ?? resolve(root, options.config);
	return findConfigFile(root);
}
async function resolveConfig(options = {}, viteOverrides = {}, pluginsHarness = new PluginHarness(), cliFilters = []) {
	// We clone CLI Options and Vite overrides to reuse when a watch mode is triggered.
	const cliOptionsCopy = deepMerge({}, options);
	const viteOverridesCopy = deepMerge({}, viteOverrides);
	const configPath = resolveConfigPath(
		// try to find the config relative to `--root` or process.cwd()
		resolve(options.root || process.cwd()),
		options
	);
	options.config = configPath;
	const captures = {};
	const inlineConfig = mergeConfig({
		configFile: configPath,
		configLoader: options.configLoader,
		mode: options.mode || "test",
		plugins: [
			CaptureRawTestConfig(captures, cliOptionsCopy.sharedViteServer),
			...TestConfigPlugin(pluginsHarness, captures, cliOptionsCopy),
			...ViteConfigPlugin(pluginsHarness),
			...VitestCorePlugin(pluginsHarness),
			...BrowserLoaderPlugin(captures, pluginsHarness)
		]
	}, viteOverrides);
	const rootViteConfig = await resolveConfig$1(inlineConfig, "serve");
	const rootConfig = resolveTestConfig(pluginsHarness.logger, rootViteConfig.test || {}, rootViteConfig);
	rootViteConfig.test = rootConfig;
	rootViteConfig.server.fs.allow.push(...resolveFsAllow(rootViteConfig.root, rootViteConfig.configFile));
	// the server has been created, we don't need to override vite.server options
	const { token, tokenCreated } = resolveApiToken(rootViteConfig.root);
	rootConfig.api.token = token;
	rootConfig.api.tokenCreated = tokenCreated;
	if (rootConfig.ui && rootConfig.open) {
		// Note: `tokenCreated` is only an approximation of "the browser is not
		// authenticated yet". If the user clears cookies while the token file
		// persists, the clean URL will block until they re-open the `?token=`
		// URL printed in the terminal.
		if (rootConfig.api.tokenCreated) {
			// First run that generated the token: no browser holds the auth
			// cookie yet, so open the authenticated URL to set it. A new tab
			// here is fine since no clean-URL tab exists to reuse.
			const url = new URL(rootConfig.uiBase, "http://localhost");
			url.searchParams.set("token", rootConfig.api.token);
			rootViteConfig.server.open = `${url.pathname}${url.search}`;
		} else
 // Subsequent runs: open the clean UI base URL (without `?token=`)
		// rather than the authenticated URL printed by the logger. On macOS,
		// `openBrowser` reuses an existing tab whose URL matches via substring
		// and reloads it (Vite's `bin/openChrome.js`). Since the 302 redirect
		// strips the token, an already-authenticated tab lives at the clean
		// URL, so opening the clean URL matches and reloads it; opening the
		// token URL would never match and would spawn a new tab on every
		// restart.
		rootViteConfig.server.open = rootConfig.uiBase;
	}
	rootConfig.cliOptions = cliOptionsCopy;
	rootConfig.viteOverrides = viteOverridesCopy;
	rootConfig._browserContribution = captures.browserContribution;
	rootConfig._cliFilters = cliFilters;
	// projects never inherit `tagsFilter` and `browser` from the programmatic
	// config (see `inheritRootViteOverrides`), so remove them from the base too
	if (captures.rawTestConfig) {
		const overridesTest = viteOverridesCopy.test;
		if (overridesTest?.tagsFilter !== void 0) delete captures.rawTestConfig.tagsFilter;
		if (overridesTest?.browser !== void 0) delete captures.rawTestConfig.browser;
	}
	// the root keeps the config for the whole session so `injectTestProjects`
	// can resolve shared-server projects at any point
	rootConfig._rawTestConfig = captures.rawTestConfig;
	rootConfig._moduleRunnerOptions = captures.moduleRunnerOptions;
	// `captures` lives as long as the server that keeps its plugins,
	// so it should not hold onto the config
	captures.rawTestConfig = void 0;
	rootConfig.resolvedProjects = await resolveProjectEntries(pluginsHarness, rootViteConfig, rootConfig, rootConfig.projects);
	return rootViteConfig;
}
function resolveCoverageReporters(configReporters) {
	// E.g. { reporter: "html" }
	if (!Array.isArray(configReporters)) return [[configReporters, {}]];
	const resolvedReporters = [];
	for (const reporter of configReporters) if (Array.isArray(reporter))
 // E.g. { reporter: [ ["html", { skipEmpty: true }], ["lcov"], ["json", { file: "map.json" }] ]}
	resolvedReporters.push([reporter[0], reporter[1] || {}]);
	else
 // E.g. { reporter: ["html", "json"]}
	resolvedReporters.push([reporter, {}]);
	return resolvedReporters;
}
function matchesProjectFilter(projects, name) {
	// no filters applied, any project can be included
	if (!projects.length) return true;
	if (isExcludedByProjectFilter(projects, name)) return false;
	const positives = projects.filter((project) => !project.startsWith("!"));
	return !positives.length || positives.some((project) => {
		return wildcardPatternToRegExp(project).test(name);
	});
}
function isExcludedByProjectFilter(projects, name) {
	if (!projects.length) return false;
	return projects.some((project) => {
		if (!project.startsWith("!")) return false;
		const positivePattern = project.slice(1);
		return wildcardPatternToRegExp(positivePattern).test(name);
	});
}

var prompts$2 = {};

var kleur;
var hasRequiredKleur;

function requireKleur () {
	if (hasRequiredKleur) return kleur;
	hasRequiredKleur = 1;

	const { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;

	const $ = {
		enabled: !NODE_DISABLE_COLORS && TERM !== 'dumb' && FORCE_COLOR !== '0',

		// modifiers
		reset: init(0, 0),
		bold: init(1, 22),
		dim: init(2, 22),
		italic: init(3, 23),
		underline: init(4, 24),
		inverse: init(7, 27),
		hidden: init(8, 28),
		strikethrough: init(9, 29),

		// colors
		black: init(30, 39),
		red: init(31, 39),
		green: init(32, 39),
		yellow: init(33, 39),
		blue: init(34, 39),
		magenta: init(35, 39),
		cyan: init(36, 39),
		white: init(37, 39),
		gray: init(90, 39),
		grey: init(90, 39),

		// background colors
		bgBlack: init(40, 49),
		bgRed: init(41, 49),
		bgGreen: init(42, 49),
		bgYellow: init(43, 49),
		bgBlue: init(44, 49),
		bgMagenta: init(45, 49),
		bgCyan: init(46, 49),
		bgWhite: init(47, 49)
	};

	function run(arr, str) {
		let i=0, tmp, beg='', end='';
		for (; i < arr.length; i++) {
			tmp = arr[i];
			beg += tmp.open;
			end += tmp.close;
			if (str.includes(tmp.close)) {
				str = str.replace(tmp.rgx, tmp.close + tmp.open);
			}
		}
		return beg + str + end;
	}

	function chain(has, keys) {
		let ctx = { has, keys };

		ctx.reset = $.reset.bind(ctx);
		ctx.bold = $.bold.bind(ctx);
		ctx.dim = $.dim.bind(ctx);
		ctx.italic = $.italic.bind(ctx);
		ctx.underline = $.underline.bind(ctx);
		ctx.inverse = $.inverse.bind(ctx);
		ctx.hidden = $.hidden.bind(ctx);
		ctx.strikethrough = $.strikethrough.bind(ctx);

		ctx.black = $.black.bind(ctx);
		ctx.red = $.red.bind(ctx);
		ctx.green = $.green.bind(ctx);
		ctx.yellow = $.yellow.bind(ctx);
		ctx.blue = $.blue.bind(ctx);
		ctx.magenta = $.magenta.bind(ctx);
		ctx.cyan = $.cyan.bind(ctx);
		ctx.white = $.white.bind(ctx);
		ctx.gray = $.gray.bind(ctx);
		ctx.grey = $.grey.bind(ctx);

		ctx.bgBlack = $.bgBlack.bind(ctx);
		ctx.bgRed = $.bgRed.bind(ctx);
		ctx.bgGreen = $.bgGreen.bind(ctx);
		ctx.bgYellow = $.bgYellow.bind(ctx);
		ctx.bgBlue = $.bgBlue.bind(ctx);
		ctx.bgMagenta = $.bgMagenta.bind(ctx);
		ctx.bgCyan = $.bgCyan.bind(ctx);
		ctx.bgWhite = $.bgWhite.bind(ctx);

		return ctx;
	}

	function init(open, close) {
		let blk = {
			open: `\x1b[${open}m`,
			close: `\x1b[${close}m`,
			rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
		};
		return function (txt) {
			if (this !== void 0 && this.has !== void 0) {
				this.has.includes(open) || (this.has.push(open),this.keys.push(blk));
				return txt === void 0 ? this : $.enabled ? run(this.keys, txt+'') : txt+'';
			}
			return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt+'') : txt+'';
		};
	}

	kleur = $;
	return kleur;
}

var action$1;
var hasRequiredAction$1;

function requireAction$1 () {
	if (hasRequiredAction$1) return action$1;
	hasRequiredAction$1 = 1;

	action$1 = (key, isSelect) => {
	  if (key.meta && key.name !== 'escape') return;

	  if (key.ctrl) {
	    if (key.name === 'a') return 'first';
	    if (key.name === 'c') return 'abort';
	    if (key.name === 'd') return 'abort';
	    if (key.name === 'e') return 'last';
	    if (key.name === 'g') return 'reset';
	  }

	  if (isSelect) {
	    if (key.name === 'j') return 'down';
	    if (key.name === 'k') return 'up';
	  }

	  if (key.name === 'return') return 'submit';
	  if (key.name === 'enter') return 'submit'; // ctrl + J

	  if (key.name === 'backspace') return 'delete';
	  if (key.name === 'delete') return 'deleteForward';
	  if (key.name === 'abort') return 'abort';
	  if (key.name === 'escape') return 'exit';
	  if (key.name === 'tab') return 'next';
	  if (key.name === 'pagedown') return 'nextPage';
	  if (key.name === 'pageup') return 'prevPage'; // TODO create home() in prompt types (e.g. TextPrompt)

	  if (key.name === 'home') return 'home'; // TODO create end() in prompt types (e.g. TextPrompt)

	  if (key.name === 'end') return 'end';
	  if (key.name === 'up') return 'up';
	  if (key.name === 'down') return 'down';
	  if (key.name === 'right') return 'right';
	  if (key.name === 'left') return 'left';
	  return false;
	};
	return action$1;
}

var strip$1;
var hasRequiredStrip$1;

function requireStrip$1 () {
	if (hasRequiredStrip$1) return strip$1;
	hasRequiredStrip$1 = 1;

	strip$1 = str => {
	  const pattern = ['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'].join('|');
	  const RGX = new RegExp(pattern, 'g');
	  return typeof str === 'string' ? str.replace(RGX, '') : str;
	};
	return strip$1;
}

var src;
var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src;
	hasRequiredSrc = 1;

	const ESC = '\x1B';
	const CSI = `${ESC}[`;
	const beep = '\u0007';

	const cursor = {
	  to(x, y) {
	    if (!y) return `${CSI}${x + 1}G`;
	    return `${CSI}${y + 1};${x + 1}H`;
	  },
	  move(x, y) {
	    let ret = '';

	    if (x < 0) ret += `${CSI}${-x}D`;
	    else if (x > 0) ret += `${CSI}${x}C`;

	    if (y < 0) ret += `${CSI}${-y}A`;
	    else if (y > 0) ret += `${CSI}${y}B`;

	    return ret;
	  },
	  up: (count = 1) => `${CSI}${count}A`,
	  down: (count = 1) => `${CSI}${count}B`,
	  forward: (count = 1) => `${CSI}${count}C`,
	  backward: (count = 1) => `${CSI}${count}D`,
	  nextLine: (count = 1) => `${CSI}E`.repeat(count),
	  prevLine: (count = 1) => `${CSI}F`.repeat(count),
	  left: `${CSI}G`,
	  hide: `${CSI}?25l`,
	  show: `${CSI}?25h`,
	  save: `${ESC}7`,
	  restore: `${ESC}8`
	};

	const scroll = {
	  up: (count = 1) => `${CSI}S`.repeat(count),
	  down: (count = 1) => `${CSI}T`.repeat(count)
	};

	const erase = {
	  screen: `${CSI}2J`,
	  up: (count = 1) => `${CSI}1J`.repeat(count),
	  down: (count = 1) => `${CSI}J`.repeat(count),
	  line: `${CSI}2K`,
	  lineEnd: `${CSI}K`,
	  lineStart: `${CSI}1K`,
	  lines(count) {
	    let clear = '';
	    for (let i = 0; i < count; i++)
	      clear += this.line + (i < count - 1 ? cursor.up() : '');
	    if (count)
	      clear += cursor.left;
	    return clear;
	  }
	};

	src = { cursor, scroll, erase, beep };
	return src;
}

var clear$1;
var hasRequiredClear$1;

function requireClear$1 () {
	if (hasRequiredClear$1) return clear$1;
	hasRequiredClear$1 = 1;

	function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

	const strip = requireStrip$1();

	const _require = requireSrc(),
	      erase = _require.erase,
	      cursor = _require.cursor;

	const width = str => [...strip(str)].length;
	/**
	 * @param {string} prompt
	 * @param {number} perLine
	 */


	clear$1 = function (prompt, perLine) {
	  if (!perLine) return erase.line + cursor.to(0);
	  let rows = 0;
	  const lines = prompt.split(/\r?\n/);

	  var _iterator = _createForOfIteratorHelper(lines),
	      _step;

	  try {
	    for (_iterator.s(); !(_step = _iterator.n()).done;) {
	      let line = _step.value;
	      rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
	    }
	  } catch (err) {
	    _iterator.e(err);
	  } finally {
	    _iterator.f();
	  }

	  return erase.lines(rows);
	};
	return clear$1;
}

var figures_1$1;
var hasRequiredFigures$1;

function requireFigures$1 () {
	if (hasRequiredFigures$1) return figures_1$1;
	hasRequiredFigures$1 = 1;

	const main = {
	  arrowUp: '↑',
	  arrowDown: '↓',
	  arrowLeft: '←',
	  arrowRight: '→',
	  radioOn: '◉',
	  radioOff: '◯',
	  tick: '✔',
	  cross: '✖',
	  ellipsis: '…',
	  pointerSmall: '›',
	  line: '─',
	  pointer: '❯'
	};
	const win = {
	  arrowUp: main.arrowUp,
	  arrowDown: main.arrowDown,
	  arrowLeft: main.arrowLeft,
	  arrowRight: main.arrowRight,
	  radioOn: '(*)',
	  radioOff: '( )',
	  tick: '√',
	  cross: '×',
	  ellipsis: '...',
	  pointerSmall: '»',
	  line: '─',
	  pointer: '>'
	};
	const figures = process.platform === 'win32' ? win : main;
	figures_1$1 = figures;
	return figures_1$1;
}

var style$1;
var hasRequiredStyle$1;

function requireStyle$1 () {
	if (hasRequiredStyle$1) return style$1;
	hasRequiredStyle$1 = 1;

	const c = requireKleur();

	const figures = requireFigures$1(); // rendering user input.


	const styles = Object.freeze({
	  password: {
	    scale: 1,
	    render: input => '*'.repeat(input.length)
	  },
	  emoji: {
	    scale: 2,
	    render: input => '😃'.repeat(input.length)
	  },
	  invisible: {
	    scale: 0,
	    render: input => ''
	  },
	  default: {
	    scale: 1,
	    render: input => `${input}`
	  }
	});

	const render = type => styles[type] || styles.default; // icon to signalize a prompt.


	const symbols = Object.freeze({
	  aborted: c.red(figures.cross),
	  done: c.green(figures.tick),
	  exited: c.yellow(figures.cross),
	  default: c.cyan('?')
	});

	const symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default; // between the question and the user's input.


	const delimiter = completing => c.gray(completing ? figures.ellipsis : figures.pointerSmall);

	const item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : '+' : figures.line);

	style$1 = {
	  styles,
	  render,
	  symbols,
	  symbol,
	  delimiter,
	  item
	};
	return style$1;
}

var lines$1;
var hasRequiredLines$1;

function requireLines$1 () {
	if (hasRequiredLines$1) return lines$1;
	hasRequiredLines$1 = 1;

	const strip = requireStrip$1();
	/**
	 * @param {string} msg
	 * @param {number} perLine
	 */


	lines$1 = function (msg, perLine) {
	  let lines = String(strip(msg) || '').split(/\r?\n/);
	  if (!perLine) return lines.length;
	  return lines.map(l => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
	};
	return lines$1;
}

var wrap$1;
var hasRequiredWrap$1;

function requireWrap$1 () {
	if (hasRequiredWrap$1) return wrap$1;
	hasRequiredWrap$1 = 1;
	/**
	 * @param {string} msg The message to wrap
	 * @param {object} opts
	 * @param {number|string} [opts.margin] Left margin
	 * @param {number} opts.width Maximum characters per line including the margin
	 */

	wrap$1 = (msg, opts = {}) => {
	  const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(' ').join('') : opts.margin || '';
	  const width = opts.width;
	  return (msg || '').split(/\r?\n/g).map(line => line.split(/\s+/g).reduce((arr, w) => {
	    if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width) arr[arr.length - 1] += ` ${w}`;else arr.push(`${tab}${w}`);
	    return arr;
	  }, [tab]).join('\n')).join('\n');
	};
	return wrap$1;
}

var entriesToDisplay$1;
var hasRequiredEntriesToDisplay$1;

function requireEntriesToDisplay$1 () {
	if (hasRequiredEntriesToDisplay$1) return entriesToDisplay$1;
	hasRequiredEntriesToDisplay$1 = 1;
	/**
	 * Determine what entries should be displayed on the screen, based on the
	 * currently selected index and the maximum visible. Used in list-based
	 * prompts like `select` and `multiselect`.
	 *
	 * @param {number} cursor the currently selected entry
	 * @param {number} total the total entries available to display
	 * @param {number} [maxVisible] the number of entries that can be displayed
	 */

	entriesToDisplay$1 = (cursor, total, maxVisible) => {
	  maxVisible = maxVisible || total;
	  let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
	  if (startIndex < 0) startIndex = 0;
	  let endIndex = Math.min(startIndex + maxVisible, total);
	  return {
	    startIndex,
	    endIndex
	  };
	};
	return entriesToDisplay$1;
}

var util$1;
var hasRequiredUtil$1;

function requireUtil$1 () {
	if (hasRequiredUtil$1) return util$1;
	hasRequiredUtil$1 = 1;

	util$1 = {
	  action: requireAction$1(),
	  clear: requireClear$1(),
	  style: requireStyle$1(),
	  strip: requireStrip$1(),
	  figures: requireFigures$1(),
	  lines: requireLines$1(),
	  wrap: requireWrap$1(),
	  entriesToDisplay: requireEntriesToDisplay$1()
	};
	return util$1;
}

var prompt$2;
var hasRequiredPrompt$1;

function requirePrompt$1 () {
	if (hasRequiredPrompt$1) return prompt$2;
	hasRequiredPrompt$1 = 1;

	const readline = require$$0;

	const _require = requireUtil$1(),
	      action = _require.action;

	const EventEmitter = require$$0$1;

	const _require2 = requireSrc(),
	      beep = _require2.beep,
	      cursor = _require2.cursor;

	const color = requireKleur();
	/**
	 * Base prompt skeleton
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */


	class Prompt extends EventEmitter {
	  constructor(opts = {}) {
	    super();
	    this.firstRender = true;
	    this.in = opts.stdin || process.stdin;
	    this.out = opts.stdout || process.stdout;

	    this.onRender = (opts.onRender || (() => void 0)).bind(this);

	    const rl = readline.createInterface({
	      input: this.in,
	      escapeCodeTimeout: 50
	    });
	    readline.emitKeypressEvents(this.in, rl);
	    if (this.in.isTTY) this.in.setRawMode(true);
	    const isSelect = ['SelectPrompt', 'MultiselectPrompt'].indexOf(this.constructor.name) > -1;

	    const keypress = (str, key) => {
	      let a = action(key, isSelect);

	      if (a === false) {
	        this._ && this._(str, key);
	      } else if (typeof this[a] === 'function') {
	        this[a](key);
	      } else {
	        this.bell();
	      }
	    };

	    this.close = () => {
	      this.out.write(cursor.show);
	      this.in.removeListener('keypress', keypress);
	      if (this.in.isTTY) this.in.setRawMode(false);
	      rl.close();
	      this.emit(this.aborted ? 'abort' : this.exited ? 'exit' : 'submit', this.value);
	      this.closed = true;
	    };

	    this.in.on('keypress', keypress);
	  }

	  fire() {
	    this.emit('state', {
	      value: this.value,
	      aborted: !!this.aborted,
	      exited: !!this.exited
	    });
	  }

	  bell() {
	    this.out.write(beep);
	  }

	  render() {
	    this.onRender(color);
	    if (this.firstRender) this.firstRender = false;
	  }

	}

	prompt$2 = Prompt;
	return prompt$2;
}

var text$1;
var hasRequiredText$1;

function requireText$1 () {
	if (hasRequiredText$1) return text$1;
	hasRequiredText$1 = 1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

	function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

	const color = requireKleur();

	const Prompt = requirePrompt$1();

	const _require = requireSrc(),
	      erase = _require.erase,
	      cursor = _require.cursor;

	const _require2 = requireUtil$1(),
	      style = _require2.style,
	      clear = _require2.clear,
	      lines = _require2.lines,
	      figures = _require2.figures;
	/**
	 * TextPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {String} [opts.style='default'] Render style
	 * @param {String} [opts.initial] Default value
	 * @param {Function} [opts.validate] Validate function
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {String} [opts.error] The invalid error label
	 */


	class TextPrompt extends Prompt {
	  constructor(opts = {}) {
	    super(opts);
	    this.transform = style.render(opts.style);
	    this.scale = this.transform.scale;
	    this.msg = opts.message;
	    this.initial = opts.initial || ``;

	    this.validator = opts.validate || (() => true);

	    this.value = ``;
	    this.errorMsg = opts.error || `Please Enter A Valid Value`;
	    this.cursor = Number(!!this.initial);
	    this.cursorOffset = 0;
	    this.clear = clear(``, this.out.columns);
	    this.render();
	  }

	  set value(v) {
	    if (!v && this.initial) {
	      this.placeholder = true;
	      this.rendered = color.gray(this.transform.render(this.initial));
	    } else {
	      this.placeholder = false;
	      this.rendered = this.transform.render(v);
	    }

	    this._value = v;
	    this.fire();
	  }

	  get value() {
	    return this._value;
	  }

	  reset() {
	    this.value = ``;
	    this.cursor = Number(!!this.initial);
	    this.cursorOffset = 0;
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.value = this.value || this.initial;
	    this.done = this.aborted = true;
	    this.error = false;
	    this.red = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  validate() {
	    var _this = this;

	    return _asyncToGenerator(function* () {
	      let valid = yield _this.validator(_this.value);

	      if (typeof valid === `string`) {
	        _this.errorMsg = valid;
	        valid = false;
	      }

	      _this.error = !valid;
	    })();
	  }

	  submit() {
	    var _this2 = this;

	    return _asyncToGenerator(function* () {
	      _this2.value = _this2.value || _this2.initial;
	      _this2.cursorOffset = 0;
	      _this2.cursor = _this2.rendered.length;
	      yield _this2.validate();

	      if (_this2.error) {
	        _this2.red = true;

	        _this2.fire();

	        _this2.render();

	        return;
	      }

	      _this2.done = true;
	      _this2.aborted = false;

	      _this2.fire();

	      _this2.render();

	      _this2.out.write('\n');

	      _this2.close();
	    })();
	  }

	  next() {
	    if (!this.placeholder) return this.bell();
	    this.value = this.initial;
	    this.cursor = this.rendered.length;
	    this.fire();
	    this.render();
	  }

	  moveCursor(n) {
	    if (this.placeholder) return;
	    this.cursor = this.cursor + n;
	    this.cursorOffset += n;
	  }

	  _(c, key) {
	    let s1 = this.value.slice(0, this.cursor);
	    let s2 = this.value.slice(this.cursor);
	    this.value = `${s1}${c}${s2}`;
	    this.red = false;
	    this.cursor = this.placeholder ? 0 : s1.length + 1;
	    this.render();
	  }

	  delete() {
	    if (this.isCursorAtStart()) return this.bell();
	    let s1 = this.value.slice(0, this.cursor - 1);
	    let s2 = this.value.slice(this.cursor);
	    this.value = `${s1}${s2}`;
	    this.red = false;

	    if (this.isCursorAtStart()) {
	      this.cursorOffset = 0;
	    } else {
	      this.cursorOffset++;
	      this.moveCursor(-1);
	    }

	    this.render();
	  }

	  deleteForward() {
	    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
	    let s1 = this.value.slice(0, this.cursor);
	    let s2 = this.value.slice(this.cursor + 1);
	    this.value = `${s1}${s2}`;
	    this.red = false;

	    if (this.isCursorAtEnd()) {
	      this.cursorOffset = 0;
	    } else {
	      this.cursorOffset++;
	    }

	    this.render();
	  }

	  first() {
	    this.cursor = 0;
	    this.render();
	  }

	  last() {
	    this.cursor = this.value.length;
	    this.render();
	  }

	  left() {
	    if (this.cursor <= 0 || this.placeholder) return this.bell();
	    this.moveCursor(-1);
	    this.render();
	  }

	  right() {
	    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
	    this.moveCursor(1);
	    this.render();
	  }

	  isCursorAtStart() {
	    return this.cursor === 0 || this.placeholder && this.cursor === 1;
	  }

	  isCursorAtEnd() {
	    return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
	  }

	  render() {
	    if (this.closed) return;

	    if (!this.firstRender) {
	      if (this.outputError) this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
	      this.out.write(clear(this.outputText, this.out.columns));
	    }

	    super.render();
	    this.outputError = '';
	    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.red ? color.red(this.rendered) : this.rendered].join(` `);

	    if (this.error) {
	      this.outputError += this.errorMsg.split(`\n`).reduce((a, l, i) => a + `\n${i ? ' ' : figures.pointerSmall} ${color.red().italic(l)}`, ``);
	    }

	    this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
	  }

	}

	text$1 = TextPrompt;
	return text$1;
}

var select$1;
var hasRequiredSelect$1;

function requireSelect$1 () {
	if (hasRequiredSelect$1) return select$1;
	hasRequiredSelect$1 = 1;

	const color = requireKleur();

	const Prompt = requirePrompt$1();

	const _require = requireUtil$1(),
	      style = _require.style,
	      clear = _require.clear,
	      figures = _require.figures,
	      wrap = _require.wrap,
	      entriesToDisplay = _require.entriesToDisplay;

	const _require2 = requireSrc(),
	      cursor = _require2.cursor;
	/**
	 * SelectPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Array} opts.choices Array of choice objects
	 * @param {String} [opts.hint] Hint to display
	 * @param {Number} [opts.initial] Index of default value
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {Number} [opts.optionsPerPage=10] Max options to display at once
	 */


	class SelectPrompt extends Prompt {
	  constructor(opts = {}) {
	    super(opts);
	    this.msg = opts.message;
	    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
	    this.warn = opts.warn || '- This option is disabled';
	    this.cursor = opts.initial || 0;
	    this.choices = opts.choices.map((ch, idx) => {
	      if (typeof ch === 'string') ch = {
	        title: ch,
	        value: idx
	      };
	      return {
	        title: ch && (ch.title || ch.value || ch),
	        value: ch && (ch.value === undefined ? idx : ch.value),
	        description: ch && ch.description,
	        selected: ch && ch.selected,
	        disabled: ch && ch.disabled
	      };
	    });
	    this.optionsPerPage = opts.optionsPerPage || 10;
	    this.value = (this.choices[this.cursor] || {}).value;
	    this.clear = clear('', this.out.columns);
	    this.render();
	  }

	  moveCursor(n) {
	    this.cursor = n;
	    this.value = this.choices[n].value;
	    this.fire();
	  }

	  reset() {
	    this.moveCursor(0);
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    if (!this.selection.disabled) {
	      this.done = true;
	      this.aborted = false;
	      this.fire();
	      this.render();
	      this.out.write('\n');
	      this.close();
	    } else this.bell();
	  }

	  first() {
	    this.moveCursor(0);
	    this.render();
	  }

	  last() {
	    this.moveCursor(this.choices.length - 1);
	    this.render();
	  }

	  up() {
	    if (this.cursor === 0) {
	      this.moveCursor(this.choices.length - 1);
	    } else {
	      this.moveCursor(this.cursor - 1);
	    }

	    this.render();
	  }

	  down() {
	    if (this.cursor === this.choices.length - 1) {
	      this.moveCursor(0);
	    } else {
	      this.moveCursor(this.cursor + 1);
	    }

	    this.render();
	  }

	  next() {
	    this.moveCursor((this.cursor + 1) % this.choices.length);
	    this.render();
	  }

	  _(c, key) {
	    if (c === ' ') return this.submit();
	  }

	  get selection() {
	    return this.choices[this.cursor];
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(clear(this.outputText, this.out.columns));
	    super.render();

	    let _entriesToDisplay = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage),
	        startIndex = _entriesToDisplay.startIndex,
	        endIndex = _entriesToDisplay.endIndex; // Print prompt


	    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)].join(' '); // Print choices

	    if (!this.done) {
	      this.outputText += '\n';

	      for (let i = startIndex; i < endIndex; i++) {
	        let title,
	            prefix,
	            desc = '',
	            v = this.choices[i]; // Determine whether to display "more choices" indicators

	        if (i === startIndex && startIndex > 0) {
	          prefix = figures.arrowUp;
	        } else if (i === endIndex - 1 && endIndex < this.choices.length) {
	          prefix = figures.arrowDown;
	        } else {
	          prefix = ' ';
	        }

	        if (v.disabled) {
	          title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
	          prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + ' ' : '  ') + prefix;
	        } else {
	          title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
	          prefix = (this.cursor === i ? color.cyan(figures.pointer) + ' ' : '  ') + prefix;

	          if (v.description && this.cursor === i) {
	            desc = ` - ${v.description}`;

	            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
	              desc = '\n' + wrap(v.description, {
	                margin: 3,
	                width: this.out.columns
	              });
	            }
	          }
	        }

	        this.outputText += `${prefix} ${title}${color.gray(desc)}\n`;
	      }
	    }

	    this.out.write(this.outputText);
	  }

	}

	select$1 = SelectPrompt;
	return select$1;
}

var toggle$1;
var hasRequiredToggle$1;

function requireToggle$1 () {
	if (hasRequiredToggle$1) return toggle$1;
	hasRequiredToggle$1 = 1;

	const color = requireKleur();

	const Prompt = requirePrompt$1();

	const _require = requireUtil$1(),
	      style = _require.style,
	      clear = _require.clear;

	const _require2 = requireSrc(),
	      cursor = _require2.cursor,
	      erase = _require2.erase;
	/**
	 * TogglePrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Boolean} [opts.initial=false] Default value
	 * @param {String} [opts.active='no'] Active label
	 * @param {String} [opts.inactive='off'] Inactive label
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */


	class TogglePrompt extends Prompt {
	  constructor(opts = {}) {
	    super(opts);
	    this.msg = opts.message;
	    this.value = !!opts.initial;
	    this.active = opts.active || 'on';
	    this.inactive = opts.inactive || 'off';
	    this.initialValue = this.value;
	    this.render();
	  }

	  reset() {
	    this.value = this.initialValue;
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    this.done = true;
	    this.aborted = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  deactivate() {
	    if (this.value === false) return this.bell();
	    this.value = false;
	    this.render();
	  }

	  activate() {
	    if (this.value === true) return this.bell();
	    this.value = true;
	    this.render();
	  }

	  delete() {
	    this.deactivate();
	  }

	  left() {
	    this.deactivate();
	  }

	  right() {
	    this.activate();
	  }

	  down() {
	    this.deactivate();
	  }

	  up() {
	    this.activate();
	  }

	  next() {
	    this.value = !this.value;
	    this.fire();
	    this.render();
	  }

	  _(c, key) {
	    if (c === ' ') {
	      this.value = !this.value;
	    } else if (c === '1') {
	      this.value = true;
	    } else if (c === '0') {
	      this.value = false;
	    } else return this.bell();

	    this.render();
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(clear(this.outputText, this.out.columns));
	    super.render();
	    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.value ? this.inactive : color.cyan().underline(this.inactive), color.gray('/'), this.value ? color.cyan().underline(this.active) : this.active].join(' ');
	    this.out.write(erase.line + cursor.to(0) + this.outputText);
	  }

	}

	toggle$1 = TogglePrompt;
	return toggle$1;
}

var datepart$1;
var hasRequiredDatepart$1;

function requireDatepart$1 () {
	if (hasRequiredDatepart$1) return datepart$1;
	hasRequiredDatepart$1 = 1;

	class DatePart {
	  constructor({
	    token,
	    date,
	    parts,
	    locales
	  }) {
	    this.token = token;
	    this.date = date || new Date();
	    this.parts = parts || [this];
	    this.locales = locales || {};
	  }

	  up() {}

	  down() {}

	  next() {
	    const currentIdx = this.parts.indexOf(this);
	    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
	  }

	  setTo(val) {}

	  prev() {
	    let parts = [].concat(this.parts).reverse();
	    const currentIdx = parts.indexOf(this);
	    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
	  }

	  toString() {
	    return String(this.date);
	  }

	}

	datepart$1 = DatePart;
	return datepart$1;
}

var meridiem$1;
var hasRequiredMeridiem$1;

function requireMeridiem$1 () {
	if (hasRequiredMeridiem$1) return meridiem$1;
	hasRequiredMeridiem$1 = 1;

	const DatePart = requireDatepart$1();

	class Meridiem extends DatePart {
	  constructor(opts = {}) {
	    super(opts);
	  }

	  up() {
	    this.date.setHours((this.date.getHours() + 12) % 24);
	  }

	  down() {
	    this.up();
	  }

	  toString() {
	    let meridiem = this.date.getHours() > 12 ? 'pm' : 'am';
	    return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
	  }

	}

	meridiem$1 = Meridiem;
	return meridiem$1;
}

var day$1;
var hasRequiredDay$1;

function requireDay$1 () {
	if (hasRequiredDay$1) return day$1;
	hasRequiredDay$1 = 1;

	const DatePart = requireDatepart$1();

	const pos = n => {
	  n = n % 10;
	  return n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th';
	};

	class Day extends DatePart {
	  constructor(opts = {}) {
	    super(opts);
	  }

	  up() {
	    this.date.setDate(this.date.getDate() + 1);
	  }

	  down() {
	    this.date.setDate(this.date.getDate() - 1);
	  }

	  setTo(val) {
	    this.date.setDate(parseInt(val.substr(-2)));
	  }

	  toString() {
	    let date = this.date.getDate();
	    let day = this.date.getDay();
	    return this.token === 'DD' ? String(date).padStart(2, '0') : this.token === 'Do' ? date + pos(date) : this.token === 'd' ? day + 1 : this.token === 'ddd' ? this.locales.weekdaysShort[day] : this.token === 'dddd' ? this.locales.weekdays[day] : date;
	  }

	}

	day$1 = Day;
	return day$1;
}

var hours$1;
var hasRequiredHours$1;

function requireHours$1 () {
	if (hasRequiredHours$1) return hours$1;
	hasRequiredHours$1 = 1;

	const DatePart = requireDatepart$1();

	class Hours extends DatePart {
	  constructor(opts = {}) {
	    super(opts);
	  }

	  up() {
	    this.date.setHours(this.date.getHours() + 1);
	  }

	  down() {
	    this.date.setHours(this.date.getHours() - 1);
	  }

	  setTo(val) {
	    this.date.setHours(parseInt(val.substr(-2)));
	  }

	  toString() {
	    let hours = this.date.getHours();
	    if (/h/.test(this.token)) hours = hours % 12 || 12;
	    return this.token.length > 1 ? String(hours).padStart(2, '0') : hours;
	  }

	}

	hours$1 = Hours;
	return hours$1;
}

var milliseconds$1;
var hasRequiredMilliseconds$1;

function requireMilliseconds$1 () {
	if (hasRequiredMilliseconds$1) return milliseconds$1;
	hasRequiredMilliseconds$1 = 1;

	const DatePart = requireDatepart$1();

	class Milliseconds extends DatePart {
	  constructor(opts = {}) {
	    super(opts);
	  }

	  up() {
	    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
	  }

	  down() {
	    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
	  }

	  setTo(val) {
	    this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
	  }

	  toString() {
	    return String(this.date.getMilliseconds()).padStart(4, '0').substr(0, this.token.length);
	  }

	}

	milliseconds$1 = Milliseconds;
	return milliseconds$1;
}

var minutes$1;
var hasRequiredMinutes$1;

function requireMinutes$1 () {
	if (hasRequiredMinutes$1) return minutes$1;
	hasRequiredMinutes$1 = 1;

	const DatePart = requireDatepart$1();

	class Minutes extends DatePart {
	  constructor(opts = {}) {
	    super(opts);
	  }

	  up() {
	    this.date.setMinutes(this.date.getMinutes() + 1);
	  }

	  down() {
	    this.date.setMinutes(this.date.getMinutes() - 1);
	  }

	  setTo(val) {
	    this.date.setMinutes(parseInt(val.substr(-2)));
	  }

	  toString() {
	    let m = this.date.getMinutes();
	    return this.token.length > 1 ? String(m).padStart(2, '0') : m;
	  }

	}

	minutes$1 = Minutes;
	return minutes$1;
}

var month$1;
var hasRequiredMonth$1;

function requireMonth$1 () {
	if (hasRequiredMonth$1) return month$1;
	hasRequiredMonth$1 = 1;

	const DatePart = requireDatepart$1();

	class Month extends DatePart {
	  constructor(opts = {}) {
	    super(opts);
	  }

	  up() {
	    this.date.setMonth(this.date.getMonth() + 1);
	  }

	  down() {
	    this.date.setMonth(this.date.getMonth() - 1);
	  }

	  setTo(val) {
	    val = parseInt(val.substr(-2)) - 1;
	    this.date.setMonth(val < 0 ? 0 : val);
	  }

	  toString() {
	    let month = this.date.getMonth();
	    let tl = this.token.length;
	    return tl === 2 ? String(month + 1).padStart(2, '0') : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
	  }

	}

	month$1 = Month;
	return month$1;
}

var seconds$1;
var hasRequiredSeconds$1;

function requireSeconds$1 () {
	if (hasRequiredSeconds$1) return seconds$1;
	hasRequiredSeconds$1 = 1;

	const DatePart = requireDatepart$1();

	class Seconds extends DatePart {
	  constructor(opts = {}) {
	    super(opts);
	  }

	  up() {
	    this.date.setSeconds(this.date.getSeconds() + 1);
	  }

	  down() {
	    this.date.setSeconds(this.date.getSeconds() - 1);
	  }

	  setTo(val) {
	    this.date.setSeconds(parseInt(val.substr(-2)));
	  }

	  toString() {
	    let s = this.date.getSeconds();
	    return this.token.length > 1 ? String(s).padStart(2, '0') : s;
	  }

	}

	seconds$1 = Seconds;
	return seconds$1;
}

var year$1;
var hasRequiredYear$1;

function requireYear$1 () {
	if (hasRequiredYear$1) return year$1;
	hasRequiredYear$1 = 1;

	const DatePart = requireDatepart$1();

	class Year extends DatePart {
	  constructor(opts = {}) {
	    super(opts);
	  }

	  up() {
	    this.date.setFullYear(this.date.getFullYear() + 1);
	  }

	  down() {
	    this.date.setFullYear(this.date.getFullYear() - 1);
	  }

	  setTo(val) {
	    this.date.setFullYear(val.substr(-4));
	  }

	  toString() {
	    let year = String(this.date.getFullYear()).padStart(4, '0');
	    return this.token.length === 2 ? year.substr(-2) : year;
	  }

	}

	year$1 = Year;
	return year$1;
}

var dateparts$1;
var hasRequiredDateparts$1;

function requireDateparts$1 () {
	if (hasRequiredDateparts$1) return dateparts$1;
	hasRequiredDateparts$1 = 1;

	dateparts$1 = {
	  DatePart: requireDatepart$1(),
	  Meridiem: requireMeridiem$1(),
	  Day: requireDay$1(),
	  Hours: requireHours$1(),
	  Milliseconds: requireMilliseconds$1(),
	  Minutes: requireMinutes$1(),
	  Month: requireMonth$1(),
	  Seconds: requireSeconds$1(),
	  Year: requireYear$1()
	};
	return dateparts$1;
}

var date$1;
var hasRequiredDate$1;

function requireDate$1 () {
	if (hasRequiredDate$1) return date$1;
	hasRequiredDate$1 = 1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

	function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

	const color = requireKleur();

	const Prompt = requirePrompt$1();

	const _require = requireUtil$1(),
	      style = _require.style,
	      clear = _require.clear,
	      figures = _require.figures;

	const _require2 = requireSrc(),
	      erase = _require2.erase,
	      cursor = _require2.cursor;

	const _require3 = requireDateparts$1(),
	      DatePart = _require3.DatePart,
	      Meridiem = _require3.Meridiem,
	      Day = _require3.Day,
	      Hours = _require3.Hours,
	      Milliseconds = _require3.Milliseconds,
	      Minutes = _require3.Minutes,
	      Month = _require3.Month,
	      Seconds = _require3.Seconds,
	      Year = _require3.Year;

	const regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
	const regexGroups = {
	  1: ({
	    token
	  }) => token.replace(/\\(.)/g, '$1'),
	  2: opts => new Day(opts),
	  // Day // TODO
	  3: opts => new Month(opts),
	  // Month
	  4: opts => new Year(opts),
	  // Year
	  5: opts => new Meridiem(opts),
	  // AM/PM // TODO (special)
	  6: opts => new Hours(opts),
	  // Hours
	  7: opts => new Minutes(opts),
	  // Minutes
	  8: opts => new Seconds(opts),
	  // Seconds
	  9: opts => new Milliseconds(opts) // Fractional seconds

	};
	const dfltLocales = {
	  months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
	  monthsShort: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
	  weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
	  weekdaysShort: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
	};
	/**
	 * DatePrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Number} [opts.initial] Index of default value
	 * @param {String} [opts.mask] The format mask
	 * @param {object} [opts.locales] The date locales
	 * @param {String} [opts.error] The error message shown on invalid value
	 * @param {Function} [opts.validate] Function to validate the submitted value
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */

	class DatePrompt extends Prompt {
	  constructor(opts = {}) {
	    super(opts);
	    this.msg = opts.message;
	    this.cursor = 0;
	    this.typed = '';
	    this.locales = Object.assign(dfltLocales, opts.locales);
	    this._date = opts.initial || new Date();
	    this.errorMsg = opts.error || 'Please Enter A Valid Value';

	    this.validator = opts.validate || (() => true);

	    this.mask = opts.mask || 'YYYY-MM-DD HH:mm:ss';
	    this.clear = clear('', this.out.columns);
	    this.render();
	  }

	  get value() {
	    return this.date;
	  }

	  get date() {
	    return this._date;
	  }

	  set date(date) {
	    if (date) this._date.setTime(date.getTime());
	  }

	  set mask(mask) {
	    let result;
	    this.parts = [];

	    while (result = regex.exec(mask)) {
	      let match = result.shift();
	      let idx = result.findIndex(gr => gr != null);
	      this.parts.push(idx in regexGroups ? regexGroups[idx]({
	        token: result[idx] || match,
	        date: this.date,
	        parts: this.parts,
	        locales: this.locales
	      }) : result[idx] || match);
	    }

	    let parts = this.parts.reduce((arr, i) => {
	      if (typeof i === 'string' && typeof arr[arr.length - 1] === 'string') arr[arr.length - 1] += i;else arr.push(i);
	      return arr;
	    }, []);
	    this.parts.splice(0);
	    this.parts.push(...parts);
	    this.reset();
	  }

	  moveCursor(n) {
	    this.typed = '';
	    this.cursor = n;
	    this.fire();
	  }

	  reset() {
	    this.moveCursor(this.parts.findIndex(p => p instanceof DatePart));
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.error = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  validate() {
	    var _this = this;

	    return _asyncToGenerator(function* () {
	      let valid = yield _this.validator(_this.value);

	      if (typeof valid === 'string') {
	        _this.errorMsg = valid;
	        valid = false;
	      }

	      _this.error = !valid;
	    })();
	  }

	  submit() {
	    var _this2 = this;

	    return _asyncToGenerator(function* () {
	      yield _this2.validate();

	      if (_this2.error) {
	        _this2.color = 'red';

	        _this2.fire();

	        _this2.render();

	        return;
	      }

	      _this2.done = true;
	      _this2.aborted = false;

	      _this2.fire();

	      _this2.render();

	      _this2.out.write('\n');

	      _this2.close();
	    })();
	  }

	  up() {
	    this.typed = '';
	    this.parts[this.cursor].up();
	    this.render();
	  }

	  down() {
	    this.typed = '';
	    this.parts[this.cursor].down();
	    this.render();
	  }

	  left() {
	    let prev = this.parts[this.cursor].prev();
	    if (prev == null) return this.bell();
	    this.moveCursor(this.parts.indexOf(prev));
	    this.render();
	  }

	  right() {
	    let next = this.parts[this.cursor].next();
	    if (next == null) return this.bell();
	    this.moveCursor(this.parts.indexOf(next));
	    this.render();
	  }

	  next() {
	    let next = this.parts[this.cursor].next();
	    this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex(part => part instanceof DatePart));
	    this.render();
	  }

	  _(c) {
	    if (/\d/.test(c)) {
	      this.typed += c;
	      this.parts[this.cursor].setTo(this.typed);
	      this.render();
	    }
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(clear(this.outputText, this.out.columns));
	    super.render(); // Print prompt

	    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join('')].join(' '); // Print error

	    if (this.error) {
	      this.outputText += this.errorMsg.split('\n').reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
	    }

	    this.out.write(erase.line + cursor.to(0) + this.outputText);
	  }

	}

	date$1 = DatePrompt;
	return date$1;
}

var number$1;
var hasRequiredNumber$1;

function requireNumber$1 () {
	if (hasRequiredNumber$1) return number$1;
	hasRequiredNumber$1 = 1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

	function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

	const color = requireKleur();

	const Prompt = requirePrompt$1();

	const _require = requireSrc(),
	      cursor = _require.cursor,
	      erase = _require.erase;

	const _require2 = requireUtil$1(),
	      style = _require2.style,
	      figures = _require2.figures,
	      clear = _require2.clear,
	      lines = _require2.lines;

	const isNumber = /[0-9]/;

	const isDef = any => any !== undefined;

	const round = (number, precision) => {
	  let factor = Math.pow(10, precision);
	  return Math.round(number * factor) / factor;
	};
	/**
	 * NumberPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {String} [opts.style='default'] Render style
	 * @param {Number} [opts.initial] Default value
	 * @param {Number} [opts.max=+Infinity] Max value
	 * @param {Number} [opts.min=-Infinity] Min value
	 * @param {Boolean} [opts.float=false] Parse input as floats
	 * @param {Number} [opts.round=2] Round floats to x decimals
	 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
	 * @param {Function} [opts.validate] Validate function
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {String} [opts.error] The invalid error label
	 */


	class NumberPrompt extends Prompt {
	  constructor(opts = {}) {
	    super(opts);
	    this.transform = style.render(opts.style);
	    this.msg = opts.message;
	    this.initial = isDef(opts.initial) ? opts.initial : '';
	    this.float = !!opts.float;
	    this.round = opts.round || 2;
	    this.inc = opts.increment || 1;
	    this.min = isDef(opts.min) ? opts.min : -Infinity;
	    this.max = isDef(opts.max) ? opts.max : Infinity;
	    this.errorMsg = opts.error || `Please Enter A Valid Value`;

	    this.validator = opts.validate || (() => true);

	    this.color = `cyan`;
	    this.value = ``;
	    this.typed = ``;
	    this.lastHit = 0;
	    this.render();
	  }

	  set value(v) {
	    if (!v && v !== 0) {
	      this.placeholder = true;
	      this.rendered = color.gray(this.transform.render(`${this.initial}`));
	      this._value = ``;
	    } else {
	      this.placeholder = false;
	      this.rendered = this.transform.render(`${round(v, this.round)}`);
	      this._value = round(v, this.round);
	    }

	    this.fire();
	  }

	  get value() {
	    return this._value;
	  }

	  parse(x) {
	    return this.float ? parseFloat(x) : parseInt(x);
	  }

	  valid(c) {
	    return c === `-` || c === `.` && this.float || isNumber.test(c);
	  }

	  reset() {
	    this.typed = ``;
	    this.value = ``;
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    let x = this.value;
	    this.value = x !== `` ? x : this.initial;
	    this.done = this.aborted = true;
	    this.error = false;
	    this.fire();
	    this.render();
	    this.out.write(`\n`);
	    this.close();
	  }

	  validate() {
	    var _this = this;

	    return _asyncToGenerator(function* () {
	      let valid = yield _this.validator(_this.value);

	      if (typeof valid === `string`) {
	        _this.errorMsg = valid;
	        valid = false;
	      }

	      _this.error = !valid;
	    })();
	  }

	  submit() {
	    var _this2 = this;

	    return _asyncToGenerator(function* () {
	      yield _this2.validate();

	      if (_this2.error) {
	        _this2.color = `red`;

	        _this2.fire();

	        _this2.render();

	        return;
	      }

	      let x = _this2.value;
	      _this2.value = x !== `` ? x : _this2.initial;
	      _this2.done = true;
	      _this2.aborted = false;
	      _this2.error = false;

	      _this2.fire();

	      _this2.render();

	      _this2.out.write(`\n`);

	      _this2.close();
	    })();
	  }

	  up() {
	    this.typed = ``;

	    if (this.value === '') {
	      this.value = this.min - this.inc;
	    }

	    if (this.value >= this.max) return this.bell();
	    this.value += this.inc;
	    this.color = `cyan`;
	    this.fire();
	    this.render();
	  }

	  down() {
	    this.typed = ``;

	    if (this.value === '') {
	      this.value = this.min + this.inc;
	    }

	    if (this.value <= this.min) return this.bell();
	    this.value -= this.inc;
	    this.color = `cyan`;
	    this.fire();
	    this.render();
	  }

	  delete() {
	    let val = this.value.toString();
	    if (val.length === 0) return this.bell();
	    this.value = this.parse(val = val.slice(0, -1)) || ``;

	    if (this.value !== '' && this.value < this.min) {
	      this.value = this.min;
	    }

	    this.color = `cyan`;
	    this.fire();
	    this.render();
	  }

	  next() {
	    this.value = this.initial;
	    this.fire();
	    this.render();
	  }

	  _(c, key) {
	    if (!this.valid(c)) return this.bell();
	    const now = Date.now();
	    if (now - this.lastHit > 1000) this.typed = ``; // 1s elapsed

	    this.typed += c;
	    this.lastHit = now;
	    this.color = `cyan`;
	    if (c === `.`) return this.fire();
	    this.value = Math.min(this.parse(this.typed), this.max);
	    if (this.value > this.max) this.value = this.max;
	    if (this.value < this.min) this.value = this.min;
	    this.fire();
	    this.render();
	  }

	  render() {
	    if (this.closed) return;

	    if (!this.firstRender) {
	      if (this.outputError) this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
	      this.out.write(clear(this.outputText, this.out.columns));
	    }

	    super.render();
	    this.outputError = ''; // Print prompt

	    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered].join(` `); // Print error

	    if (this.error) {
	      this.outputError += this.errorMsg.split(`\n`).reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
	    }

	    this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
	  }

	}

	number$1 = NumberPrompt;
	return number$1;
}

var multiselect$1;
var hasRequiredMultiselect$1;

function requireMultiselect$1 () {
	if (hasRequiredMultiselect$1) return multiselect$1;
	hasRequiredMultiselect$1 = 1;

	const color = requireKleur();

	const _require = requireSrc(),
	      cursor = _require.cursor;

	const Prompt = requirePrompt$1();

	const _require2 = requireUtil$1(),
	      clear = _require2.clear,
	      figures = _require2.figures,
	      style = _require2.style,
	      wrap = _require2.wrap,
	      entriesToDisplay = _require2.entriesToDisplay;
	/**
	 * MultiselectPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Array} opts.choices Array of choice objects
	 * @param {String} [opts.hint] Hint to display
	 * @param {String} [opts.warn] Hint shown for disabled choices
	 * @param {Number} [opts.max] Max choices
	 * @param {Number} [opts.cursor=0] Cursor start position
	 * @param {Number} [opts.optionsPerPage=10] Max options to display at once
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */


	class MultiselectPrompt extends Prompt {
	  constructor(opts = {}) {
	    super(opts);
	    this.msg = opts.message;
	    this.cursor = opts.cursor || 0;
	    this.scrollIndex = opts.cursor || 0;
	    this.hint = opts.hint || '';
	    this.warn = opts.warn || '- This option is disabled -';
	    this.minSelected = opts.min;
	    this.showMinError = false;
	    this.maxChoices = opts.max;
	    this.instructions = opts.instructions;
	    this.optionsPerPage = opts.optionsPerPage || 10;
	    this.value = opts.choices.map((ch, idx) => {
	      if (typeof ch === 'string') ch = {
	        title: ch,
	        value: idx
	      };
	      return {
	        title: ch && (ch.title || ch.value || ch),
	        description: ch && ch.description,
	        value: ch && (ch.value === undefined ? idx : ch.value),
	        selected: ch && ch.selected,
	        disabled: ch && ch.disabled
	      };
	    });
	    this.clear = clear('', this.out.columns);

	    if (!opts.overrideRender) {
	      this.render();
	    }
	  }

	  reset() {
	    this.value.map(v => !v.selected);
	    this.cursor = 0;
	    this.fire();
	    this.render();
	  }

	  selected() {
	    return this.value.filter(v => v.selected);
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    const selected = this.value.filter(e => e.selected);

	    if (this.minSelected && selected.length < this.minSelected) {
	      this.showMinError = true;
	      this.render();
	    } else {
	      this.done = true;
	      this.aborted = false;
	      this.fire();
	      this.render();
	      this.out.write('\n');
	      this.close();
	    }
	  }

	  first() {
	    this.cursor = 0;
	    this.render();
	  }

	  last() {
	    this.cursor = this.value.length - 1;
	    this.render();
	  }

	  next() {
	    this.cursor = (this.cursor + 1) % this.value.length;
	    this.render();
	  }

	  up() {
	    if (this.cursor === 0) {
	      this.cursor = this.value.length - 1;
	    } else {
	      this.cursor--;
	    }

	    this.render();
	  }

	  down() {
	    if (this.cursor === this.value.length - 1) {
	      this.cursor = 0;
	    } else {
	      this.cursor++;
	    }

	    this.render();
	  }

	  left() {
	    this.value[this.cursor].selected = false;
	    this.render();
	  }

	  right() {
	    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
	    this.value[this.cursor].selected = true;
	    this.render();
	  }

	  handleSpaceToggle() {
	    const v = this.value[this.cursor];

	    if (v.selected) {
	      v.selected = false;
	      this.render();
	    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
	      return this.bell();
	    } else {
	      v.selected = true;
	      this.render();
	    }
	  }

	  toggleAll() {
	    if (this.maxChoices !== undefined || this.value[this.cursor].disabled) {
	      return this.bell();
	    }

	    const newSelected = !this.value[this.cursor].selected;
	    this.value.filter(v => !v.disabled).forEach(v => v.selected = newSelected);
	    this.render();
	  }

	  _(c, key) {
	    if (c === ' ') {
	      this.handleSpaceToggle();
	    } else if (c === 'a') {
	      this.toggleAll();
	    } else {
	      return this.bell();
	    }
	  }

	  renderInstructions() {
	    if (this.instructions === undefined || this.instructions) {
	      if (typeof this.instructions === 'string') {
	        return this.instructions;
	      }

	      return '\nInstructions:\n' + `    ${figures.arrowUp}/${figures.arrowDown}: Highlight option\n` + `    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection\n` + (this.maxChoices === undefined ? `    a: Toggle all\n` : '') + `    enter/return: Complete answer`;
	    }

	    return '';
	  }

	  renderOption(cursor, v, i, arrowIndicator) {
	    const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + ' ' + arrowIndicator + ' ';
	    let title, desc;

	    if (v.disabled) {
	      title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
	    } else {
	      title = cursor === i ? color.cyan().underline(v.title) : v.title;

	      if (cursor === i && v.description) {
	        desc = ` - ${v.description}`;

	        if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
	          desc = '\n' + wrap(v.description, {
	            margin: prefix.length,
	            width: this.out.columns
	          });
	        }
	      }
	    }

	    return prefix + title + color.gray(desc || '');
	  } // shared with autocompleteMultiselect


	  paginateOptions(options) {
	    if (options.length === 0) {
	      return color.red('No matches for this query.');
	    }

	    let _entriesToDisplay = entriesToDisplay(this.cursor, options.length, this.optionsPerPage),
	        startIndex = _entriesToDisplay.startIndex,
	        endIndex = _entriesToDisplay.endIndex;

	    let prefix,
	        styledOptions = [];

	    for (let i = startIndex; i < endIndex; i++) {
	      if (i === startIndex && startIndex > 0) {
	        prefix = figures.arrowUp;
	      } else if (i === endIndex - 1 && endIndex < options.length) {
	        prefix = figures.arrowDown;
	      } else {
	        prefix = ' ';
	      }

	      styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
	    }

	    return '\n' + styledOptions.join('\n');
	  } // shared with autocomleteMultiselect


	  renderOptions(options) {
	    if (!this.done) {
	      return this.paginateOptions(options);
	    }

	    return '';
	  }

	  renderDoneOrInstructions() {
	    if (this.done) {
	      return this.value.filter(e => e.selected).map(v => v.title).join(', ');
	    }

	    const output = [color.gray(this.hint), this.renderInstructions()];

	    if (this.value[this.cursor].disabled) {
	      output.push(color.yellow(this.warn));
	    }

	    return output.join(' ');
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);
	    super.render(); // print prompt

	    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(' ');

	    if (this.showMinError) {
	      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
	      this.showMinError = false;
	    }

	    prompt += this.renderOptions(this.value);
	    this.out.write(this.clear + prompt);
	    this.clear = clear(prompt, this.out.columns);
	  }

	}

	multiselect$1 = MultiselectPrompt;
	return multiselect$1;
}

var autocomplete$1;
var hasRequiredAutocomplete$1;

function requireAutocomplete$1 () {
	if (hasRequiredAutocomplete$1) return autocomplete$1;
	hasRequiredAutocomplete$1 = 1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

	function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

	const color = requireKleur();

	const Prompt = requirePrompt$1();

	const _require = requireSrc(),
	      erase = _require.erase,
	      cursor = _require.cursor;

	const _require2 = requireUtil$1(),
	      style = _require2.style,
	      clear = _require2.clear,
	      figures = _require2.figures,
	      wrap = _require2.wrap,
	      entriesToDisplay = _require2.entriesToDisplay;

	const getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);

	const getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);

	const getIndex = (arr, valOrTitle) => {
	  const index = arr.findIndex(el => el.value === valOrTitle || el.title === valOrTitle);
	  return index > -1 ? index : undefined;
	};
	/**
	 * TextPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Array} opts.choices Array of auto-complete choices objects
	 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
	 * @param {Number} [opts.limit=10] Max number of results to show
	 * @param {Number} [opts.cursor=0] Cursor start position
	 * @param {String} [opts.style='default'] Render style
	 * @param {String} [opts.fallback] Fallback message - initial to default value
	 * @param {String} [opts.initial] Index of the default value
	 * @param {Boolean} [opts.clearFirst] The first ESCAPE keypress will clear the input
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {String} [opts.noMatches] The no matches found label
	 */


	class AutocompletePrompt extends Prompt {
	  constructor(opts = {}) {
	    super(opts);
	    this.msg = opts.message;
	    this.suggest = opts.suggest;
	    this.choices = opts.choices;
	    this.initial = typeof opts.initial === 'number' ? opts.initial : getIndex(opts.choices, opts.initial);
	    this.select = this.initial || opts.cursor || 0;
	    this.i18n = {
	      noMatches: opts.noMatches || 'no matches found'
	    };
	    this.fallback = opts.fallback || this.initial;
	    this.clearFirst = opts.clearFirst || false;
	    this.suggestions = [];
	    this.input = '';
	    this.limit = opts.limit || 10;
	    this.cursor = 0;
	    this.transform = style.render(opts.style);
	    this.scale = this.transform.scale;
	    this.render = this.render.bind(this);
	    this.complete = this.complete.bind(this);
	    this.clear = clear('', this.out.columns);
	    this.complete(this.render);
	    this.render();
	  }

	  set fallback(fb) {
	    this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
	  }

	  get fallback() {
	    let choice;
	    if (typeof this._fb === 'number') choice = this.choices[this._fb];else if (typeof this._fb === 'string') choice = {
	      title: this._fb
	    };
	    return choice || this._fb || {
	      title: this.i18n.noMatches
	    };
	  }

	  moveSelect(i) {
	    this.select = i;
	    if (this.suggestions.length > 0) this.value = getVal(this.suggestions, i);else this.value = this.fallback.value;
	    this.fire();
	  }

	  complete(cb) {
	    var _this = this;

	    return _asyncToGenerator(function* () {
	      const p = _this.completing = _this.suggest(_this.input, _this.choices);

	      const suggestions = yield p;
	      if (_this.completing !== p) return;
	      _this.suggestions = suggestions.map((s, i, arr) => ({
	        title: getTitle(arr, i),
	        value: getVal(arr, i),
	        description: s.description
	      }));
	      _this.completing = false;
	      const l = Math.max(suggestions.length - 1, 0);

	      _this.moveSelect(Math.min(l, _this.select));

	      cb && cb();
	    })();
	  }

	  reset() {
	    this.input = '';
	    this.complete(() => {
	      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
	      this.render();
	    });
	    this.render();
	  }

	  exit() {
	    if (this.clearFirst && this.input.length > 0) {
	      this.reset();
	    } else {
	      this.done = this.exited = true;
	      this.aborted = false;
	      this.fire();
	      this.render();
	      this.out.write('\n');
	      this.close();
	    }
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.exited = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    this.done = true;
	    this.aborted = this.exited = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  _(c, key) {
	    let s1 = this.input.slice(0, this.cursor);
	    let s2 = this.input.slice(this.cursor);
	    this.input = `${s1}${c}${s2}`;
	    this.cursor = s1.length + 1;
	    this.complete(this.render);
	    this.render();
	  }

	  delete() {
	    if (this.cursor === 0) return this.bell();
	    let s1 = this.input.slice(0, this.cursor - 1);
	    let s2 = this.input.slice(this.cursor);
	    this.input = `${s1}${s2}`;
	    this.complete(this.render);
	    this.cursor = this.cursor - 1;
	    this.render();
	  }

	  deleteForward() {
	    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
	    let s1 = this.input.slice(0, this.cursor);
	    let s2 = this.input.slice(this.cursor + 1);
	    this.input = `${s1}${s2}`;
	    this.complete(this.render);
	    this.render();
	  }

	  first() {
	    this.moveSelect(0);
	    this.render();
	  }

	  last() {
	    this.moveSelect(this.suggestions.length - 1);
	    this.render();
	  }

	  up() {
	    if (this.select === 0) {
	      this.moveSelect(this.suggestions.length - 1);
	    } else {
	      this.moveSelect(this.select - 1);
	    }

	    this.render();
	  }

	  down() {
	    if (this.select === this.suggestions.length - 1) {
	      this.moveSelect(0);
	    } else {
	      this.moveSelect(this.select + 1);
	    }

	    this.render();
	  }

	  next() {
	    if (this.select === this.suggestions.length - 1) {
	      this.moveSelect(0);
	    } else this.moveSelect(this.select + 1);

	    this.render();
	  }

	  nextPage() {
	    this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
	    this.render();
	  }

	  prevPage() {
	    this.moveSelect(Math.max(this.select - this.limit, 0));
	    this.render();
	  }

	  left() {
	    if (this.cursor <= 0) return this.bell();
	    this.cursor = this.cursor - 1;
	    this.render();
	  }

	  right() {
	    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
	    this.cursor = this.cursor + 1;
	    this.render();
	  }

	  renderOption(v, hovered, isStart, isEnd) {
	    let desc;
	    let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : ' ';
	    let title = hovered ? color.cyan().underline(v.title) : v.title;
	    prefix = (hovered ? color.cyan(figures.pointer) + ' ' : '  ') + prefix;

	    if (v.description) {
	      desc = ` - ${v.description}`;

	      if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
	        desc = '\n' + wrap(v.description, {
	          margin: 3,
	          width: this.out.columns
	        });
	      }
	    }

	    return prefix + ' ' + title + color.gray(desc || '');
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(clear(this.outputText, this.out.columns));
	    super.render();

	    let _entriesToDisplay = entriesToDisplay(this.select, this.choices.length, this.limit),
	        startIndex = _entriesToDisplay.startIndex,
	        endIndex = _entriesToDisplay.endIndex;

	    this.outputText = [style.symbol(this.done, this.aborted, this.exited), color.bold(this.msg), style.delimiter(this.completing), this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)].join(' ');

	    if (!this.done) {
	      const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(item, this.select === i + startIndex, i === 0 && startIndex > 0, i + startIndex === endIndex - 1 && endIndex < this.choices.length)).join('\n');
	      this.outputText += `\n` + (suggestions || color.gray(this.fallback.title));
	    }

	    this.out.write(erase.line + cursor.to(0) + this.outputText);
	  }

	}

	autocomplete$1 = AutocompletePrompt;
	return autocomplete$1;
}

var autocompleteMultiselect$1;
var hasRequiredAutocompleteMultiselect$1;

function requireAutocompleteMultiselect$1 () {
	if (hasRequiredAutocompleteMultiselect$1) return autocompleteMultiselect$1;
	hasRequiredAutocompleteMultiselect$1 = 1;

	const color = requireKleur();

	const _require = requireSrc(),
	      cursor = _require.cursor;

	const MultiselectPrompt = requireMultiselect$1();

	const _require2 = requireUtil$1(),
	      clear = _require2.clear,
	      style = _require2.style,
	      figures = _require2.figures;
	/**
	 * MultiselectPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Array} opts.choices Array of choice objects
	 * @param {String} [opts.hint] Hint to display
	 * @param {String} [opts.warn] Hint shown for disabled choices
	 * @param {Number} [opts.max] Max choices
	 * @param {Number} [opts.cursor=0] Cursor start position
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */


	class AutocompleteMultiselectPrompt extends MultiselectPrompt {
	  constructor(opts = {}) {
	    opts.overrideRender = true;
	    super(opts);
	    this.inputValue = '';
	    this.clear = clear('', this.out.columns);
	    this.filteredOptions = this.value;
	    this.render();
	  }

	  last() {
	    this.cursor = this.filteredOptions.length - 1;
	    this.render();
	  }

	  next() {
	    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
	    this.render();
	  }

	  up() {
	    if (this.cursor === 0) {
	      this.cursor = this.filteredOptions.length - 1;
	    } else {
	      this.cursor--;
	    }

	    this.render();
	  }

	  down() {
	    if (this.cursor === this.filteredOptions.length - 1) {
	      this.cursor = 0;
	    } else {
	      this.cursor++;
	    }

	    this.render();
	  }

	  left() {
	    this.filteredOptions[this.cursor].selected = false;
	    this.render();
	  }

	  right() {
	    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
	    this.filteredOptions[this.cursor].selected = true;
	    this.render();
	  }

	  delete() {
	    if (this.inputValue.length) {
	      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
	      this.updateFilteredOptions();
	    }
	  }

	  updateFilteredOptions() {
	    const currentHighlight = this.filteredOptions[this.cursor];
	    this.filteredOptions = this.value.filter(v => {
	      if (this.inputValue) {
	        if (typeof v.title === 'string') {
	          if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
	            return true;
	          }
	        }

	        if (typeof v.value === 'string') {
	          if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
	            return true;
	          }
	        }

	        return false;
	      }

	      return true;
	    });
	    const newHighlightIndex = this.filteredOptions.findIndex(v => v === currentHighlight);
	    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
	    this.render();
	  }

	  handleSpaceToggle() {
	    const v = this.filteredOptions[this.cursor];

	    if (v.selected) {
	      v.selected = false;
	      this.render();
	    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
	      return this.bell();
	    } else {
	      v.selected = true;
	      this.render();
	    }
	  }

	  handleInputChange(c) {
	    this.inputValue = this.inputValue + c;
	    this.updateFilteredOptions();
	  }

	  _(c, key) {
	    if (c === ' ') {
	      this.handleSpaceToggle();
	    } else {
	      this.handleInputChange(c);
	    }
	  }

	  renderInstructions() {
	    if (this.instructions === undefined || this.instructions) {
	      if (typeof this.instructions === 'string') {
	        return this.instructions;
	      }

	      return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
	    }

	    return '';
	  }

	  renderCurrentInput() {
	    return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray('Enter something to filter')}\n`;
	  }

	  renderOption(cursor, v, i) {
	    let title;
	    if (v.disabled) title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);else title = cursor === i ? color.cyan().underline(v.title) : v.title;
	    return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ' + title;
	  }

	  renderDoneOrInstructions() {
	    if (this.done) {
	      return this.value.filter(e => e.selected).map(v => v.title).join(', ');
	    }

	    const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];

	    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
	      output.push(color.yellow(this.warn));
	    }

	    return output.join(' ');
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);
	    super.render(); // print prompt

	    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(' ');

	    if (this.showMinError) {
	      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
	      this.showMinError = false;
	    }

	    prompt += this.renderOptions(this.filteredOptions);
	    this.out.write(this.clear + prompt);
	    this.clear = clear(prompt, this.out.columns);
	  }

	}

	autocompleteMultiselect$1 = AutocompleteMultiselectPrompt;
	return autocompleteMultiselect$1;
}

var confirm$1;
var hasRequiredConfirm$1;

function requireConfirm$1 () {
	if (hasRequiredConfirm$1) return confirm$1;
	hasRequiredConfirm$1 = 1;

	const color = requireKleur();

	const Prompt = requirePrompt$1();

	const _require = requireUtil$1(),
	      style = _require.style,
	      clear = _require.clear;

	const _require2 = requireSrc(),
	      erase = _require2.erase,
	      cursor = _require2.cursor;
	/**
	 * ConfirmPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Boolean} [opts.initial] Default value (true/false)
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {String} [opts.yes] The "Yes" label
	 * @param {String} [opts.yesOption] The "Yes" option when choosing between yes/no
	 * @param {String} [opts.no] The "No" label
	 * @param {String} [opts.noOption] The "No" option when choosing between yes/no
	 */


	class ConfirmPrompt extends Prompt {
	  constructor(opts = {}) {
	    super(opts);
	    this.msg = opts.message;
	    this.value = opts.initial;
	    this.initialValue = !!opts.initial;
	    this.yesMsg = opts.yes || 'yes';
	    this.yesOption = opts.yesOption || '(Y/n)';
	    this.noMsg = opts.no || 'no';
	    this.noOption = opts.noOption || '(y/N)';
	    this.render();
	  }

	  reset() {
	    this.value = this.initialValue;
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    this.value = this.value || false;
	    this.done = true;
	    this.aborted = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  _(c, key) {
	    if (c.toLowerCase() === 'y') {
	      this.value = true;
	      return this.submit();
	    }

	    if (c.toLowerCase() === 'n') {
	      this.value = false;
	      return this.submit();
	    }

	    return this.bell();
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(clear(this.outputText, this.out.columns));
	    super.render();
	    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)].join(' ');
	    this.out.write(erase.line + cursor.to(0) + this.outputText);
	  }

	}

	confirm$1 = ConfirmPrompt;
	return confirm$1;
}

var elements$1;
var hasRequiredElements$1;

function requireElements$1 () {
	if (hasRequiredElements$1) return elements$1;
	hasRequiredElements$1 = 1;

	elements$1 = {
	  TextPrompt: requireText$1(),
	  SelectPrompt: requireSelect$1(),
	  TogglePrompt: requireToggle$1(),
	  DatePrompt: requireDate$1(),
	  NumberPrompt: requireNumber$1(),
	  MultiselectPrompt: requireMultiselect$1(),
	  AutocompletePrompt: requireAutocomplete$1(),
	  AutocompleteMultiselectPrompt: requireAutocompleteMultiselect$1(),
	  ConfirmPrompt: requireConfirm$1()
	};
	return elements$1;
}

var hasRequiredPrompts$2;

function requirePrompts$2 () {
	if (hasRequiredPrompts$2) return prompts$2;
	hasRequiredPrompts$2 = 1;
	(function (exports) {

		const $ = exports;

		const el = requireElements$1();

		const noop = v => v;

		function toPrompt(type, args, opts = {}) {
		  return new Promise((res, rej) => {
		    const p = new el[type](args);
		    const onAbort = opts.onAbort || noop;
		    const onSubmit = opts.onSubmit || noop;
		    const onExit = opts.onExit || noop;
		    p.on('state', args.onState || noop);
		    p.on('submit', x => res(onSubmit(x)));
		    p.on('exit', x => res(onExit(x)));
		    p.on('abort', x => rej(onAbort(x)));
		  });
		}
		/**
		 * Text prompt
		 * @param {string} args.message Prompt message to display
		 * @param {string} [args.initial] Default string value
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {function} [args.onState] On state change callback
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.text = args => toPrompt('TextPrompt', args);
		/**
		 * Password prompt with masked input
		 * @param {string} args.message Prompt message to display
		 * @param {string} [args.initial] Default string value
		 * @param {function} [args.onState] On state change callback
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.password = args => {
		  args.style = 'password';
		  return $.text(args);
		};
		/**
		 * Prompt where input is invisible, like sudo
		 * @param {string} args.message Prompt message to display
		 * @param {string} [args.initial] Default string value
		 * @param {function} [args.onState] On state change callback
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.invisible = args => {
		  args.style = 'invisible';
		  return $.text(args);
		};
		/**
		 * Number prompt
		 * @param {string} args.message Prompt message to display
		 * @param {number} args.initial Default number value
		 * @param {function} [args.onState] On state change callback
		 * @param {number} [args.max] Max value
		 * @param {number} [args.min] Min value
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {Boolean} [opts.float=false] Parse input as floats
		 * @param {Number} [opts.round=2] Round floats to x decimals
		 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.number = args => toPrompt('NumberPrompt', args);
		/**
		 * Date prompt
		 * @param {string} args.message Prompt message to display
		 * @param {number} args.initial Default number value
		 * @param {function} [args.onState] On state change callback
		 * @param {number} [args.max] Max value
		 * @param {number} [args.min] Min value
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {Boolean} [opts.float=false] Parse input as floats
		 * @param {Number} [opts.round=2] Round floats to x decimals
		 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.date = args => toPrompt('DatePrompt', args);
		/**
		 * Classic yes/no prompt
		 * @param {string} args.message Prompt message to display
		 * @param {boolean} [args.initial=false] Default value
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.confirm = args => toPrompt('ConfirmPrompt', args);
		/**
		 * List prompt, split intput string by `seperator`
		 * @param {string} args.message Prompt message to display
		 * @param {string} [args.initial] Default string value
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {string} [args.separator] String separator
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input, in form of an `Array`
		 */


		$.list = args => {
		  const sep = args.separator || ',';
		  return toPrompt('TextPrompt', args, {
		    onSubmit: str => str.split(sep).map(s => s.trim())
		  });
		};
		/**
		 * Toggle/switch prompt
		 * @param {string} args.message Prompt message to display
		 * @param {boolean} [args.initial=false] Default value
		 * @param {string} [args.active="on"] Text for `active` state
		 * @param {string} [args.inactive="off"] Text for `inactive` state
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.toggle = args => toPrompt('TogglePrompt', args);
		/**
		 * Interactive select prompt
		 * @param {string} args.message Prompt message to display
		 * @param {Array} args.choices Array of choices objects `[{ title, value }, ...]`
		 * @param {number} [args.initial] Index of default value
		 * @param {String} [args.hint] Hint to display
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.select = args => toPrompt('SelectPrompt', args);
		/**
		 * Interactive multi-select / autocompleteMultiselect prompt
		 * @param {string} args.message Prompt message to display
		 * @param {Array} args.choices Array of choices objects `[{ title, value, [selected] }, ...]`
		 * @param {number} [args.max] Max select
		 * @param {string} [args.hint] Hint to display user
		 * @param {Number} [args.cursor=0] Cursor start position
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.multiselect = args => {
		  args.choices = [].concat(args.choices || []);

		  const toSelected = items => items.filter(item => item.selected).map(item => item.value);

		  return toPrompt('MultiselectPrompt', args, {
		    onAbort: toSelected,
		    onSubmit: toSelected
		  });
		};

		$.autocompleteMultiselect = args => {
		  args.choices = [].concat(args.choices || []);

		  const toSelected = items => items.filter(item => item.selected).map(item => item.value);

		  return toPrompt('AutocompleteMultiselectPrompt', args, {
		    onAbort: toSelected,
		    onSubmit: toSelected
		  });
		};

		const byTitle = (input, choices) => Promise.resolve(choices.filter(item => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase()));
		/**
		 * Interactive auto-complete prompt
		 * @param {string} args.message Prompt message to display
		 * @param {Array} args.choices Array of auto-complete choices objects `[{ title, value }, ...]`
		 * @param {Function} [args.suggest] Function to filter results based on user input. Defaults to sort by `title`
		 * @param {number} [args.limit=10] Max number of results to show
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {String} [args.initial] Index of the default value
		 * @param {boolean} [opts.clearFirst] The first ESCAPE keypress will clear the input
		 * @param {String} [args.fallback] Fallback message - defaults to initial value
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */


		$.autocomplete = args => {
		  args.suggest = args.suggest || byTitle;
		  args.choices = [].concat(args.choices || []);
		  return toPrompt('AutocompletePrompt', args);
		}; 
	} (prompts$2));
	return prompts$2;
}

var dist;
var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

	function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

	const prompts = requirePrompts$2();

	const passOn = ['suggest', 'format', 'onState', 'validate', 'onRender', 'type'];

	const noop = () => {};
	/**
	 * Prompt for a series of questions
	 * @param {Array|Object} questions Single question object or Array of question objects
	 * @param {Function} [onSubmit] Callback function called on prompt submit
	 * @param {Function} [onCancel] Callback function called on cancel/abort
	 * @returns {Object} Object with values from user input
	 */


	function prompt() {
	  return _prompt.apply(this, arguments);
	}

	function _prompt() {
	  _prompt = _asyncToGenerator(function* (questions = [], {
	    onSubmit = noop,
	    onCancel = noop
	  } = {}) {
	    const answers = {};
	    const override = prompt._override || {};
	    questions = [].concat(questions);
	    let answer, question, quit, name, type, lastPrompt;

	    const getFormattedAnswer = /*#__PURE__*/function () {
	      var _ref = _asyncToGenerator(function* (question, answer, skipValidation = false) {
	        if (!skipValidation && question.validate && question.validate(answer) !== true) {
	          return;
	        }

	        return question.format ? yield question.format(answer, answers) : answer;
	      });

	      return function getFormattedAnswer(_x, _x2) {
	        return _ref.apply(this, arguments);
	      };
	    }();

	    var _iterator = _createForOfIteratorHelper(questions),
	        _step;

	    try {
	      for (_iterator.s(); !(_step = _iterator.n()).done;) {
	        question = _step.value;
	        var _question = question;
	        name = _question.name;
	        type = _question.type;

	        // evaluate type first and skip if type is a falsy value
	        if (typeof type === 'function') {
	          type = yield type(answer, _objectSpread({}, answers), question);
	          question['type'] = type;
	        }

	        if (!type) continue; // if property is a function, invoke it unless it's a special function

	        for (let key in question) {
	          if (passOn.includes(key)) continue;
	          let value = question[key];
	          question[key] = typeof value === 'function' ? yield value(answer, _objectSpread({}, answers), lastPrompt) : value;
	        }

	        lastPrompt = question;

	        if (typeof question.message !== 'string') {
	          throw new Error('prompt message is required');
	        } // update vars in case they changed


	        var _question2 = question;
	        name = _question2.name;
	        type = _question2.type;

	        if (prompts[type] === void 0) {
	          throw new Error(`prompt type (${type}) is not defined`);
	        }

	        if (override[question.name] !== undefined) {
	          answer = yield getFormattedAnswer(question, override[question.name]);

	          if (answer !== undefined) {
	            answers[name] = answer;
	            continue;
	          }
	        }

	        try {
	          // Get the injected answer if there is one or prompt the user
	          answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : yield prompts[type](question);
	          answers[name] = answer = yield getFormattedAnswer(question, answer, true);
	          quit = yield onSubmit(question, answer, answers);
	        } catch (err) {
	          quit = !(yield onCancel(question, answers));
	        }

	        if (quit) return answers;
	      }
	    } catch (err) {
	      _iterator.e(err);
	    } finally {
	      _iterator.f();
	    }

	    return answers;
	  });
	  return _prompt.apply(this, arguments);
	}

	function getInjectedAnswer(injected, deafultValue) {
	  const answer = injected.shift();

	  if (answer instanceof Error) {
	    throw answer;
	  }

	  return answer === undefined ? deafultValue : answer;
	}

	function inject(answers) {
	  prompt._injected = (prompt._injected || []).concat(answers);
	}

	function override(answers) {
	  prompt._override = Object.assign({}, answers);
	}

	dist = Object.assign(prompt, {
	  prompt,
	  prompts,
	  inject,
	  override
	});
	return dist;
}

var prompts$1 = {};

var action;
var hasRequiredAction;

function requireAction () {
	if (hasRequiredAction) return action;
	hasRequiredAction = 1;

	action = (key, isSelect) => {
	  if (key.meta && key.name !== 'escape') return;
	  
	  if (key.ctrl) {
	    if (key.name === 'a') return 'first';
	    if (key.name === 'c') return 'abort';
	    if (key.name === 'd') return 'abort';
	    if (key.name === 'e') return 'last';
	    if (key.name === 'g') return 'reset';
	  }
	  
	  if (isSelect) {
	    if (key.name === 'j') return 'down';
	    if (key.name === 'k') return 'up';
	  }

	  if (key.name === 'return') return 'submit';
	  if (key.name === 'enter') return 'submit'; // ctrl + J
	  if (key.name === 'backspace') return 'delete';
	  if (key.name === 'delete') return 'deleteForward';
	  if (key.name === 'abort') return 'abort';
	  if (key.name === 'escape') return 'exit';
	  if (key.name === 'tab') return 'next';
	  if (key.name === 'pagedown') return 'nextPage';
	  if (key.name === 'pageup') return 'prevPage';
	  // TODO create home() in prompt types (e.g. TextPrompt)
	  if (key.name === 'home') return 'home';
	  // TODO create end() in prompt types (e.g. TextPrompt)
	  if (key.name === 'end') return 'end';

	  if (key.name === 'up') return 'up';
	  if (key.name === 'down') return 'down';
	  if (key.name === 'right') return 'right';
	  if (key.name === 'left') return 'left';

	  return false;
	};
	return action;
}

var strip;
var hasRequiredStrip;

function requireStrip () {
	if (hasRequiredStrip) return strip;
	hasRequiredStrip = 1;

	strip = str => {
	  const pattern = [
	    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
	    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
	  ].join('|');

	  const RGX = new RegExp(pattern, 'g');
	  return typeof str === 'string' ? str.replace(RGX, '') : str;
	};
	return strip;
}

var clear;
var hasRequiredClear;

function requireClear () {
	if (hasRequiredClear) return clear;
	hasRequiredClear = 1;

	const strip = requireStrip();
	const { erase, cursor } = requireSrc();

	const width = str => [...strip(str)].length;

	/**
	 * @param {string} prompt
	 * @param {number} perLine
	 */
	clear = function(prompt, perLine) {
	  if (!perLine) return erase.line + cursor.to(0);

	  let rows = 0;
	  const lines = prompt.split(/\r?\n/);
	  for (let line of lines) {
	    rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
	  }

	  return erase.lines(rows);
	};
	return clear;
}

var figures_1;
var hasRequiredFigures;

function requireFigures () {
	if (hasRequiredFigures) return figures_1;
	hasRequiredFigures = 1;

	 const main = {
	  arrowUp: '↑',
	  arrowDown: '↓',
	  arrowLeft: '←',
	  arrowRight: '→',
	  radioOn: '◉',
	  radioOff: '◯',
	  tick: '✔',	
	  cross: '✖',	
	  ellipsis: '…',	
	  pointerSmall: '›',	
	  line: '─',	
	  pointer: '❯'	
	};	
	const win = {
	  arrowUp: main.arrowUp,
	  arrowDown: main.arrowDown,
	  arrowLeft: main.arrowLeft,
	  arrowRight: main.arrowRight,
	  radioOn: '(*)',
	  radioOff: '( )',	
	  tick: '√',	
	  cross: '×',	
	  ellipsis: '...',	
	  pointerSmall: '»',	
	  line: '─',	
	  pointer: '>'	
	};	
	const figures = process.platform === 'win32' ? win : main;	

	 figures_1 = figures;
	return figures_1;
}

var style;
var hasRequiredStyle;

function requireStyle () {
	if (hasRequiredStyle) return style;
	hasRequiredStyle = 1;

	const c = requireKleur();
	const figures = requireFigures();

	// rendering user input.
	const styles = Object.freeze({
	  password: { scale: 1, render: input => '*'.repeat(input.length) },
	  emoji: { scale: 2, render: input => '😃'.repeat(input.length) },
	  invisible: { scale: 0, render: input => '' },
	  default: { scale: 1, render: input => `${input}` }
	});
	const render = type => styles[type] || styles.default;

	// icon to signalize a prompt.
	const symbols = Object.freeze({
	  aborted: c.red(figures.cross),
	  done: c.green(figures.tick),
	  exited: c.yellow(figures.cross),
	  default: c.cyan('?')
	});

	const symbol = (done, aborted, exited) =>
	  aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;

	// between the question and the user's input.
	const delimiter = completing =>
	  c.gray(completing ? figures.ellipsis : figures.pointerSmall);

	const item = (expandable, expanded) =>
	  c.gray(expandable ? (expanded ? figures.pointerSmall : '+') : figures.line);

	style = {
	  styles,
	  render,
	  symbols,
	  symbol,
	  delimiter,
	  item
	};
	return style;
}

var lines;
var hasRequiredLines;

function requireLines () {
	if (hasRequiredLines) return lines;
	hasRequiredLines = 1;

	const strip = requireStrip();

	/**
	 * @param {string} msg
	 * @param {number} perLine
	 */
	lines = function (msg, perLine) {
	  let lines = String(strip(msg) || '').split(/\r?\n/);

	  if (!perLine) return lines.length;
	  return lines.map(l => Math.ceil(l.length / perLine))
	      .reduce((a, b) => a + b);
	};
	return lines;
}

var wrap;
var hasRequiredWrap;

function requireWrap () {
	if (hasRequiredWrap) return wrap;
	hasRequiredWrap = 1;

	/**
	 * @param {string} msg The message to wrap
	 * @param {object} opts
	 * @param {number|string} [opts.margin] Left margin
	 * @param {number} opts.width Maximum characters per line including the margin
	 */
	wrap = (msg, opts = {}) => {
	  const tab = Number.isSafeInteger(parseInt(opts.margin))
	    ? new Array(parseInt(opts.margin)).fill(' ').join('')
	    : (opts.margin || '');

	  const width = opts.width;

	  return (msg || '').split(/\r?\n/g)
	    .map(line => line
	      .split(/\s+/g)
	      .reduce((arr, w) => {
	        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
	          arr[arr.length - 1] += ` ${w}`;
	        else arr.push(`${tab}${w}`);
	        return arr;
	      }, [ tab ])
	      .join('\n'))
	    .join('\n');
	};
	return wrap;
}

var entriesToDisplay;
var hasRequiredEntriesToDisplay;

function requireEntriesToDisplay () {
	if (hasRequiredEntriesToDisplay) return entriesToDisplay;
	hasRequiredEntriesToDisplay = 1;

	/**
	 * Determine what entries should be displayed on the screen, based on the
	 * currently selected index and the maximum visible. Used in list-based
	 * prompts like `select` and `multiselect`.
	 *
	 * @param {number} cursor the currently selected entry
	 * @param {number} total the total entries available to display
	 * @param {number} [maxVisible] the number of entries that can be displayed
	 */
	entriesToDisplay = (cursor, total, maxVisible)  => {
	  maxVisible = maxVisible || total;

	  let startIndex = Math.min(total- maxVisible, cursor - Math.floor(maxVisible / 2));
	  if (startIndex < 0) startIndex = 0;

	  let endIndex = Math.min(startIndex + maxVisible, total);

	  return { startIndex, endIndex };
	};
	return entriesToDisplay;
}

var util;
var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;

	util = {
	  action: requireAction(),
	  clear: requireClear(),
	  style: requireStyle(),
	  strip: requireStrip(),
	  figures: requireFigures(),
	  lines: requireLines(),
	  wrap: requireWrap(),
	  entriesToDisplay: requireEntriesToDisplay()
	};
	return util;
}

var prompt$1;
var hasRequiredPrompt;

function requirePrompt () {
	if (hasRequiredPrompt) return prompt$1;
	hasRequiredPrompt = 1;

	const readline = require$$0;
	const { action } = requireUtil();
	const EventEmitter = require$$0$1;
	const { beep, cursor } = requireSrc();
	const color = requireKleur();

	/**
	 * Base prompt skeleton
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */
	class Prompt extends EventEmitter {
	  constructor(opts={}) {
	    super();

	    this.firstRender = true;
	    this.in = opts.stdin || process.stdin;
	    this.out = opts.stdout || process.stdout;
	    this.onRender = (opts.onRender || (() => void 0)).bind(this);
	    const rl = readline.createInterface({ input:this.in, escapeCodeTimeout:50 });
	    readline.emitKeypressEvents(this.in, rl);

	    if (this.in.isTTY) this.in.setRawMode(true);
	    const isSelect = [ 'SelectPrompt', 'MultiselectPrompt' ].indexOf(this.constructor.name) > -1;
	    const keypress = (str, key) => {
	      let a = action(key, isSelect);
	      if (a === false) {
	        this._ && this._(str, key);
	      } else if (typeof this[a] === 'function') {
	        this[a](key);
	      } else {
	        this.bell();
	      }
	    };

	    this.close = () => {
	      this.out.write(cursor.show);
	      this.in.removeListener('keypress', keypress);
	      if (this.in.isTTY) this.in.setRawMode(false);
	      rl.close();
	      this.emit(this.aborted ? 'abort' : this.exited ? 'exit' : 'submit', this.value);
	      this.closed = true;
	    };

	    this.in.on('keypress', keypress);
	  }

	  fire() {
	    this.emit('state', {
	      value: this.value,
	      aborted: !!this.aborted,
	      exited: !!this.exited
	    });
	  }

	  bell() {
	    this.out.write(beep);
	  }

	  render() {
	    this.onRender(color);
	    if (this.firstRender) this.firstRender = false;
	  }
	}

	prompt$1 = Prompt;
	return prompt$1;
}

var text;
var hasRequiredText;

function requireText () {
	if (hasRequiredText) return text;
	hasRequiredText = 1;
	const color = requireKleur();
	const Prompt = requirePrompt();
	const { erase, cursor } = requireSrc();
	const { style, clear, lines, figures } = requireUtil();

	/**
	 * TextPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {String} [opts.style='default'] Render style
	 * @param {String} [opts.initial] Default value
	 * @param {Function} [opts.validate] Validate function
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {String} [opts.error] The invalid error label
	 */
	class TextPrompt extends Prompt {
	  constructor(opts={}) {
	    super(opts);
	    this.transform = style.render(opts.style);
	    this.scale = this.transform.scale;
	    this.msg = opts.message;
	    this.initial = opts.initial || ``;
	    this.validator = opts.validate || (() => true);
	    this.value = ``;
	    this.errorMsg = opts.error || `Please Enter A Valid Value`;
	    this.cursor = Number(!!this.initial);
	    this.cursorOffset = 0;
	    this.clear = clear(``, this.out.columns);
	    this.render();
	  }

	  set value(v) {
	    if (!v && this.initial) {
	      this.placeholder = true;
	      this.rendered = color.gray(this.transform.render(this.initial));
	    } else {
	      this.placeholder = false;
	      this.rendered = this.transform.render(v);
	    }
	    this._value = v;
	    this.fire();
	  }

	  get value() {
	    return this._value;
	  }

	  reset() {
	    this.value = ``;
	    this.cursor = Number(!!this.initial);
	    this.cursorOffset = 0;
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.value = this.value || this.initial;
	    this.done = this.aborted = true;
	    this.error = false;
	    this.red = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  async validate() {
	    let valid = await this.validator(this.value);
	    if (typeof valid === `string`) {
	      this.errorMsg = valid;
	      valid = false;
	    }
	    this.error = !valid;
	  }

	  async submit() {
	    this.value = this.value || this.initial;
	    this.cursorOffset = 0;
	    this.cursor = this.rendered.length;
	    await this.validate();
	    if (this.error) {
	      this.red = true;
	      this.fire();
	      this.render();
	      return;
	    }
	    this.done = true;
	    this.aborted = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  next() {
	    if (!this.placeholder) return this.bell();
	    this.value = this.initial;
	    this.cursor = this.rendered.length;
	    this.fire();
	    this.render();
	  }

	  moveCursor(n) {
	    if (this.placeholder) return;
	    this.cursor = this.cursor+n;
	    this.cursorOffset += n;
	  }

	  _(c, key) {
	    let s1 = this.value.slice(0, this.cursor);
	    let s2 = this.value.slice(this.cursor);
	    this.value = `${s1}${c}${s2}`;
	    this.red = false;
	    this.cursor = this.placeholder ? 0 : s1.length+1;
	    this.render();
	  }

	  delete() {
	    if (this.isCursorAtStart()) return this.bell();
	    let s1 = this.value.slice(0, this.cursor-1);
	    let s2 = this.value.slice(this.cursor);
	    this.value = `${s1}${s2}`;
	    this.red = false;
	    if (this.isCursorAtStart()) {
	      this.cursorOffset = 0;
	    } else {
	      this.cursorOffset++;
	      this.moveCursor(-1);
	    }
	    this.render();
	  }

	  deleteForward() {
	    if(this.cursor*this.scale >= this.rendered.length || this.placeholder) return this.bell();
	    let s1 = this.value.slice(0, this.cursor);
	    let s2 = this.value.slice(this.cursor+1);
	    this.value = `${s1}${s2}`;
	    this.red = false;
	    if (this.isCursorAtEnd()) {
	      this.cursorOffset = 0;
	    } else {
	      this.cursorOffset++;
	    }
	    this.render();
	  }

	  first() {
	    this.cursor = 0;
	    this.render();
	  }

	  last() {
	    this.cursor = this.value.length;
	    this.render();
	  }

	  left() {
	    if (this.cursor <= 0 || this.placeholder) return this.bell();
	    this.moveCursor(-1);
	    this.render();
	  }

	  right() {
	    if (this.cursor*this.scale >= this.rendered.length || this.placeholder) return this.bell();
	    this.moveCursor(1);
	    this.render();
	  }

	  isCursorAtStart() {
	    return this.cursor === 0 || (this.placeholder && this.cursor === 1);
	  }

	  isCursorAtEnd() {
	    return this.cursor === this.rendered.length || (this.placeholder && this.cursor === this.rendered.length + 1)
	  }

	  render() {
	    if (this.closed) return;
	    if (!this.firstRender) {
	      if (this.outputError)
	        this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
	      this.out.write(clear(this.outputText, this.out.columns));
	    }
	    super.render();
	    this.outputError = '';

	    this.outputText = [
	      style.symbol(this.done, this.aborted),
	      color.bold(this.msg),
	      style.delimiter(this.done),
	      this.red ? color.red(this.rendered) : this.rendered
	    ].join(` `);

	    if (this.error) {
	      this.outputError += this.errorMsg.split(`\n`)
	          .reduce((a, l, i) => a + `\n${i ? ' ' : figures.pointerSmall} ${color.red().italic(l)}`, ``);
	    }

	    this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
	  }
	}

	text = TextPrompt;
	return text;
}

var select;
var hasRequiredSelect;

function requireSelect () {
	if (hasRequiredSelect) return select;
	hasRequiredSelect = 1;

	const color = requireKleur();
	const Prompt = requirePrompt();
	const { style, clear, figures, wrap, entriesToDisplay } = requireUtil();
	const { cursor } = requireSrc();

	/**
	 * SelectPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Array} opts.choices Array of choice objects
	 * @param {String} [opts.hint] Hint to display
	 * @param {Number} [opts.initial] Index of default value
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {Number} [opts.optionsPerPage=10] Max options to display at once
	 */
	class SelectPrompt extends Prompt {
	  constructor(opts={}) {
	    super(opts);
	    this.msg = opts.message;
	    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
	    this.warn = opts.warn || '- This option is disabled';
	    this.cursor = opts.initial || 0;
	    this.choices = opts.choices.map((ch, idx) => {
	      if (typeof ch === 'string')
	        ch = {title: ch, value: idx};
	      return {
	        title: ch && (ch.title || ch.value || ch),
	        value: ch && (ch.value === undefined ? idx : ch.value),
	        description: ch && ch.description,
	        selected: ch && ch.selected,
	        disabled: ch && ch.disabled
	      };
	    });
	    this.optionsPerPage = opts.optionsPerPage || 10;
	    this.value = (this.choices[this.cursor] || {}).value;
	    this.clear = clear('', this.out.columns);
	    this.render();
	  }

	  moveCursor(n) {
	    this.cursor = n;
	    this.value = this.choices[n].value;
	    this.fire();
	  }

	  reset() {
	    this.moveCursor(0);
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    if (!this.selection.disabled) {
	      this.done = true;
	      this.aborted = false;
	      this.fire();
	      this.render();
	      this.out.write('\n');
	      this.close();
	    } else
	      this.bell();
	  }

	  first() {
	    this.moveCursor(0);
	    this.render();
	  }

	  last() {
	    this.moveCursor(this.choices.length - 1);
	    this.render();
	  }

	  up() {
	    if (this.cursor === 0) {
	      this.moveCursor(this.choices.length - 1);
	    } else {
	      this.moveCursor(this.cursor - 1);
	    }
	    this.render();
	  }

	  down() {
	    if (this.cursor === this.choices.length - 1) {
	      this.moveCursor(0);
	    } else {
	      this.moveCursor(this.cursor + 1);
	    }
	    this.render();
	  }

	  next() {
	    this.moveCursor((this.cursor + 1) % this.choices.length);
	    this.render();
	  }

	  _(c, key) {
	    if (c === ' ') return this.submit();
	  }

	  get selection() {
	    return this.choices[this.cursor];
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);
	    else this.out.write(clear(this.outputText, this.out.columns));
	    super.render();

	    let { startIndex, endIndex } = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage);

	    // Print prompt
	    this.outputText = [
	      style.symbol(this.done, this.aborted),
	      color.bold(this.msg),
	      style.delimiter(false),
	      this.done ? this.selection.title : this.selection.disabled
	          ? color.yellow(this.warn) : color.gray(this.hint)
	    ].join(' ');

	    // Print choices
	    if (!this.done) {
	      this.outputText += '\n';
	      for (let i = startIndex; i < endIndex; i++) {
	        let title, prefix, desc = '', v = this.choices[i];

	        // Determine whether to display "more choices" indicators
	        if (i === startIndex && startIndex > 0) {
	          prefix = figures.arrowUp;
	        } else if (i === endIndex - 1 && endIndex < this.choices.length) {
	          prefix = figures.arrowDown;
	        } else {
	          prefix = ' ';
	        }

	        if (v.disabled) {
	          title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
	          prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + ' ' : '  ') + prefix;
	        } else {
	          title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
	          prefix = (this.cursor === i ? color.cyan(figures.pointer) + ' ' : '  ') + prefix;
	          if (v.description && this.cursor === i) {
	            desc = ` - ${v.description}`;
	            if (prefix.length + title.length + desc.length >= this.out.columns
	                || v.description.split(/\r?\n/).length > 1) {
	              desc = '\n' + wrap(v.description, { margin: 3, width: this.out.columns });
	            }
	          }
	        }

	        this.outputText += `${prefix} ${title}${color.gray(desc)}\n`;
	      }
	    }

	    this.out.write(this.outputText);
	  }
	}

	select = SelectPrompt;
	return select;
}

var toggle;
var hasRequiredToggle;

function requireToggle () {
	if (hasRequiredToggle) return toggle;
	hasRequiredToggle = 1;
	const color = requireKleur();
	const Prompt = requirePrompt();
	const { style, clear } = requireUtil();
	const { cursor, erase } = requireSrc();

	/**
	 * TogglePrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Boolean} [opts.initial=false] Default value
	 * @param {String} [opts.active='no'] Active label
	 * @param {String} [opts.inactive='off'] Inactive label
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */
	class TogglePrompt extends Prompt {
	  constructor(opts={}) {
	    super(opts);
	    this.msg = opts.message;
	    this.value = !!opts.initial;
	    this.active = opts.active || 'on';
	    this.inactive = opts.inactive || 'off';
	    this.initialValue = this.value;
	    this.render();
	  }

	  reset() {
	    this.value = this.initialValue;
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    this.done = true;
	    this.aborted = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  deactivate() {
	    if (this.value === false) return this.bell();
	    this.value = false;
	    this.render();
	  }

	  activate() {
	    if (this.value === true) return this.bell();
	    this.value = true;
	    this.render();
	  }

	  delete() {
	    this.deactivate();
	  }
	  left() {
	    this.deactivate();
	  }
	  right() {
	    this.activate();
	  }
	  down() {
	    this.deactivate();
	  }
	  up() {
	    this.activate();
	  }

	  next() {
	    this.value = !this.value;
	    this.fire();
	    this.render();
	  }

	  _(c, key) {
	    if (c === ' ') {
	      this.value = !this.value;
	    } else if (c === '1') {
	      this.value = true;
	    } else if (c === '0') {
	      this.value = false;
	    } else return this.bell();
	    this.render();
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);
	    else this.out.write(clear(this.outputText, this.out.columns));
	    super.render();

	    this.outputText = [
	      style.symbol(this.done, this.aborted),
	      color.bold(this.msg),
	      style.delimiter(this.done),
	      this.value ? this.inactive : color.cyan().underline(this.inactive),
	      color.gray('/'),
	      this.value ? color.cyan().underline(this.active) : this.active
	    ].join(' ');

	    this.out.write(erase.line + cursor.to(0) + this.outputText);
	  }
	}

	toggle = TogglePrompt;
	return toggle;
}

var datepart;
var hasRequiredDatepart;

function requireDatepart () {
	if (hasRequiredDatepart) return datepart;
	hasRequiredDatepart = 1;

	class DatePart {
	  constructor({token, date, parts, locales}) {
	    this.token = token;
	    this.date = date || new Date();
	    this.parts = parts || [this];
	    this.locales = locales || {};
	  }

	  up() {}

	  down() {}

	  next() {
	    const currentIdx = this.parts.indexOf(this);
	    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
	  }

	  setTo(val) {}

	  prev() {
	    let parts = [].concat(this.parts).reverse();
	    const currentIdx = parts.indexOf(this);
	    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
	  }

	  toString() {
	    return String(this.date);
	  }
	}

	datepart = DatePart;
	return datepart;
}

var meridiem;
var hasRequiredMeridiem;

function requireMeridiem () {
	if (hasRequiredMeridiem) return meridiem;
	hasRequiredMeridiem = 1;

	const DatePart = requireDatepart();

	class Meridiem extends DatePart {
	  constructor(opts={}) {
	    super(opts);
	  }

	  up() {
	    this.date.setHours((this.date.getHours() + 12) % 24);
	  }

	  down() {
	    this.up();
	  }

	  toString() {
	    let meridiem = this.date.getHours() > 12 ? 'pm' : 'am';
	    return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
	  }
	}

	meridiem = Meridiem;
	return meridiem;
}

var day;
var hasRequiredDay;

function requireDay () {
	if (hasRequiredDay) return day;
	hasRequiredDay = 1;

	const DatePart = requireDatepart();

	const pos = n => {
	  n = n % 10;
	  return n === 1 ? 'st'
	       : n === 2 ? 'nd'
	       : n === 3 ? 'rd'
	       : 'th';
	};

	class Day extends DatePart {
	  constructor(opts={}) {
	    super(opts);
	  }

	  up() {
	    this.date.setDate(this.date.getDate() + 1);
	  }

	  down() {
	    this.date.setDate(this.date.getDate() - 1);
	  }

	  setTo(val) {
	    this.date.setDate(parseInt(val.substr(-2)));
	  }

	  toString() {
	    let date = this.date.getDate();
	    let day = this.date.getDay();
	    return this.token === 'DD' ? String(date).padStart(2, '0')
	         : this.token === 'Do' ? date + pos(date)
	         : this.token === 'd' ? day + 1
	         : this.token === 'ddd' ? this.locales.weekdaysShort[day]
	         : this.token === 'dddd' ? this.locales.weekdays[day]
	         : date;
	  }
	}

	day = Day;
	return day;
}

var hours;
var hasRequiredHours;

function requireHours () {
	if (hasRequiredHours) return hours;
	hasRequiredHours = 1;

	const DatePart = requireDatepart();

	class Hours extends DatePart {
	  constructor(opts={}) {
	    super(opts);
	  }

	  up() {
	    this.date.setHours(this.date.getHours() + 1);
	  }

	  down() {
	    this.date.setHours(this.date.getHours() - 1);
	  }

	  setTo(val) {
	    this.date.setHours(parseInt(val.substr(-2)));
	  }

	  toString() {
	    let hours = this.date.getHours();
	    if (/h/.test(this.token))
	      hours = (hours % 12) || 12;
	    return this.token.length > 1 ? String(hours).padStart(2, '0') : hours;
	  }
	}

	hours = Hours;
	return hours;
}

var milliseconds;
var hasRequiredMilliseconds;

function requireMilliseconds () {
	if (hasRequiredMilliseconds) return milliseconds;
	hasRequiredMilliseconds = 1;

	const DatePart = requireDatepart();

	class Milliseconds extends DatePart {
	  constructor(opts={}) {
	    super(opts);
	  }

	  up() {
	    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
	  }

	  down() {
	    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
	  }

	  setTo(val) {
	    this.date.setMilliseconds(parseInt(val.substr(-(this.token.length))));
	  }

	  toString() {
	    return String(this.date.getMilliseconds()).padStart(4, '0')
	                                              .substr(0, this.token.length);
	  }
	}

	milliseconds = Milliseconds;
	return milliseconds;
}

var minutes;
var hasRequiredMinutes;

function requireMinutes () {
	if (hasRequiredMinutes) return minutes;
	hasRequiredMinutes = 1;

	const DatePart = requireDatepart();

	class Minutes extends DatePart {
	  constructor(opts={}) {
	    super(opts);
	  }

	  up() {
	    this.date.setMinutes(this.date.getMinutes() + 1);
	  }

	  down() {
	    this.date.setMinutes(this.date.getMinutes() - 1);
	  }

	  setTo(val) {
	    this.date.setMinutes(parseInt(val.substr(-2)));
	  }

	  toString() {
	    let m = this.date.getMinutes();
	    return this.token.length > 1 ? String(m).padStart(2, '0') : m;
	  }
	}

	minutes = Minutes;
	return minutes;
}

var month;
var hasRequiredMonth;

function requireMonth () {
	if (hasRequiredMonth) return month;
	hasRequiredMonth = 1;

	const DatePart = requireDatepart();

	class Month extends DatePart {
	  constructor(opts={}) {
	    super(opts);
	  }

	  up() {
	    this.date.setMonth(this.date.getMonth() + 1);
	  }

	  down() {
	    this.date.setMonth(this.date.getMonth() - 1);
	  }

	  setTo(val) {
	    val = parseInt(val.substr(-2)) - 1;
	    this.date.setMonth(val < 0 ? 0 : val);
	  }

	  toString() {
	    let month = this.date.getMonth();
	    let tl = this.token.length;
	    return tl === 2 ? String(month + 1).padStart(2, '0')
	           : tl === 3 ? this.locales.monthsShort[month]
	             : tl === 4 ? this.locales.months[month]
	               : String(month + 1);
	  }
	}

	month = Month;
	return month;
}

var seconds;
var hasRequiredSeconds;

function requireSeconds () {
	if (hasRequiredSeconds) return seconds;
	hasRequiredSeconds = 1;

	const DatePart = requireDatepart();

	class Seconds extends DatePart {
	  constructor(opts={}) {
	    super(opts);
	  }

	  up() {
	    this.date.setSeconds(this.date.getSeconds() + 1);
	  }

	  down() {
	    this.date.setSeconds(this.date.getSeconds() - 1);
	  }

	  setTo(val) {
	    this.date.setSeconds(parseInt(val.substr(-2)));
	  }

	  toString() {
	    let s = this.date.getSeconds();
	    return this.token.length > 1 ? String(s).padStart(2, '0') : s;
	  }
	}

	seconds = Seconds;
	return seconds;
}

var year;
var hasRequiredYear;

function requireYear () {
	if (hasRequiredYear) return year;
	hasRequiredYear = 1;

	const DatePart = requireDatepart();

	class Year extends DatePart {
	  constructor(opts={}) {
	    super(opts);
	  }

	  up() {
	    this.date.setFullYear(this.date.getFullYear() + 1);
	  }

	  down() {
	    this.date.setFullYear(this.date.getFullYear() - 1);
	  }

	  setTo(val) {
	    this.date.setFullYear(val.substr(-4));
	  }

	  toString() {
	    let year = String(this.date.getFullYear()).padStart(4, '0');
	    return this.token.length === 2 ? year.substr(-2) : year;
	  }
	}

	year = Year;
	return year;
}

var dateparts;
var hasRequiredDateparts;

function requireDateparts () {
	if (hasRequiredDateparts) return dateparts;
	hasRequiredDateparts = 1;

	dateparts = {
	  DatePart: requireDatepart(),
	  Meridiem: requireMeridiem(),
	  Day: requireDay(),
	  Hours: requireHours(),
	  Milliseconds: requireMilliseconds(),
	  Minutes: requireMinutes(),
	  Month: requireMonth(),
	  Seconds: requireSeconds(),
	  Year: requireYear(),
	};
	return dateparts;
}

var date;
var hasRequiredDate;

function requireDate () {
	if (hasRequiredDate) return date;
	hasRequiredDate = 1;

	const color = requireKleur();
	const Prompt = requirePrompt();
	const { style, clear, figures } = requireUtil();
	const { erase, cursor } = requireSrc();
	const { DatePart, Meridiem, Day, Hours, Milliseconds, Minutes, Month, Seconds, Year } = requireDateparts();

	const regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
	const regexGroups = {
	  1: ({token}) => token.replace(/\\(.)/g, '$1'),
	  2: (opts) => new Day(opts), // Day // TODO
	  3: (opts) => new Month(opts), // Month
	  4: (opts) => new Year(opts), // Year
	  5: (opts) => new Meridiem(opts), // AM/PM // TODO (special)
	  6: (opts) => new Hours(opts), // Hours
	  7: (opts) => new Minutes(opts), // Minutes
	  8: (opts) => new Seconds(opts), // Seconds
	  9: (opts) => new Milliseconds(opts), // Fractional seconds
	};

	const dfltLocales = {
	  months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
	  monthsShort: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
	  weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
	  weekdaysShort: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
	};


	/**
	 * DatePrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Number} [opts.initial] Index of default value
	 * @param {String} [opts.mask] The format mask
	 * @param {object} [opts.locales] The date locales
	 * @param {String} [opts.error] The error message shown on invalid value
	 * @param {Function} [opts.validate] Function to validate the submitted value
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */
	class DatePrompt extends Prompt {
	  constructor(opts={}) {
	    super(opts);
	    this.msg = opts.message;
	    this.cursor = 0;
	    this.typed = '';
	    this.locales = Object.assign(dfltLocales, opts.locales);
	    this._date = opts.initial || new Date();
	    this.errorMsg = opts.error || 'Please Enter A Valid Value';
	    this.validator = opts.validate || (() => true);
	    this.mask = opts.mask || 'YYYY-MM-DD HH:mm:ss';
	    this.clear = clear('', this.out.columns);
	    this.render();
	  }

	  get value() {
	    return this.date
	  }

	  get date() {
	    return this._date;
	  }

	  set date(date) {
	    if (date) this._date.setTime(date.getTime());
	  }

	  set mask(mask) {
	    let result;
	    this.parts = [];
	    while(result = regex.exec(mask)) {
	      let match = result.shift();
	      let idx = result.findIndex(gr => gr != null);
	      this.parts.push(idx in regexGroups
	        ? regexGroups[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales })
	        : result[idx] || match);
	    }

	    let parts = this.parts.reduce((arr, i) => {
	      if (typeof i === 'string' && typeof arr[arr.length - 1] === 'string')
	        arr[arr.length - 1] += i;
	      else arr.push(i);
	      return arr;
	    }, []);

	    this.parts.splice(0);
	    this.parts.push(...parts);
	    this.reset();
	  }

	  moveCursor(n) {
	    this.typed = '';
	    this.cursor = n;
	    this.fire();
	  }

	  reset() {
	    this.moveCursor(this.parts.findIndex(p => p instanceof DatePart));
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.error = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  async validate() {
	    let valid = await this.validator(this.value);
	    if (typeof valid === 'string') {
	      this.errorMsg = valid;
	      valid = false;
	    }
	    this.error = !valid;
	  }

	  async submit() {
	    await this.validate();
	    if (this.error) {
	      this.color = 'red';
	      this.fire();
	      this.render();
	      return;
	    }
	    this.done = true;
	    this.aborted = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  up() {
	    this.typed = '';
	    this.parts[this.cursor].up();
	    this.render();
	  }

	  down() {
	    this.typed = '';
	    this.parts[this.cursor].down();
	    this.render();
	  }

	  left() {
	    let prev = this.parts[this.cursor].prev();
	    if (prev == null) return this.bell();
	    this.moveCursor(this.parts.indexOf(prev));
	    this.render();
	  }

	  right() {
	    let next = this.parts[this.cursor].next();
	    if (next == null) return this.bell();
	    this.moveCursor(this.parts.indexOf(next));
	    this.render();
	  }

	  next() {
	    let next = this.parts[this.cursor].next();
	    this.moveCursor(next
	      ? this.parts.indexOf(next)
	      : this.parts.findIndex((part) => part instanceof DatePart));
	    this.render();
	  }

	  _(c) {
	    if (/\d/.test(c)) {
	      this.typed += c;
	      this.parts[this.cursor].setTo(this.typed);
	      this.render();
	    }
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);
	    else this.out.write(clear(this.outputText, this.out.columns));
	    super.render();

	    // Print prompt
	    this.outputText = [
	      style.symbol(this.done, this.aborted),
	      color.bold(this.msg),
	      style.delimiter(false),
	      this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), [])
	          .join('')
	    ].join(' ');

	    // Print error
	    if (this.error) {
	      this.outputText += this.errorMsg.split('\n').reduce(
	          (a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
	    }

	    this.out.write(erase.line + cursor.to(0) + this.outputText);
	  }
	}

	date = DatePrompt;
	return date;
}

var number;
var hasRequiredNumber;

function requireNumber () {
	if (hasRequiredNumber) return number;
	hasRequiredNumber = 1;
	const color = requireKleur();
	const Prompt = requirePrompt();
	const { cursor, erase } = requireSrc();
	const { style, figures, clear, lines } = requireUtil();

	const isNumber = /[0-9]/;
	const isDef = any => any !== undefined;
	const round = (number, precision) => {
	  let factor = Math.pow(10, precision);
	  return Math.round(number * factor) / factor;
	};

	/**
	 * NumberPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {String} [opts.style='default'] Render style
	 * @param {Number} [opts.initial] Default value
	 * @param {Number} [opts.max=+Infinity] Max value
	 * @param {Number} [opts.min=-Infinity] Min value
	 * @param {Boolean} [opts.float=false] Parse input as floats
	 * @param {Number} [opts.round=2] Round floats to x decimals
	 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
	 * @param {Function} [opts.validate] Validate function
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {String} [opts.error] The invalid error label
	 */
	class NumberPrompt extends Prompt {
	  constructor(opts={}) {
	    super(opts);
	    this.transform = style.render(opts.style);
	    this.msg = opts.message;
	    this.initial = isDef(opts.initial) ? opts.initial : '';
	    this.float = !!opts.float;
	    this.round = opts.round || 2;
	    this.inc = opts.increment || 1;
	    this.min = isDef(opts.min) ? opts.min : -Infinity;
	    this.max = isDef(opts.max) ? opts.max : Infinity;
	    this.errorMsg = opts.error || `Please Enter A Valid Value`;
	    this.validator = opts.validate || (() => true);
	    this.color = `cyan`;
	    this.value = ``;
	    this.typed = ``;
	    this.lastHit = 0;
	    this.render();
	  }

	  set value(v) {
	    if (!v && v !== 0) {
	      this.placeholder = true;
	      this.rendered = color.gray(this.transform.render(`${this.initial}`));
	      this._value = ``;
	    } else {
	      this.placeholder = false;
	      this.rendered = this.transform.render(`${round(v, this.round)}`);
	      this._value = round(v, this.round);
	    }
	    this.fire();
	  }

	  get value() {
	    return this._value;
	  }

	  parse(x) {
	    return this.float ? parseFloat(x) : parseInt(x);
	  }

	  valid(c) {
	    return c === `-` || c === `.` && this.float || isNumber.test(c)
	  }

	  reset() {
	    this.typed = ``;
	    this.value = ``;
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    let x = this.value;
	    this.value = x !== `` ? x : this.initial;
	    this.done = this.aborted = true;
	    this.error = false;
	    this.fire();
	    this.render();
	    this.out.write(`\n`);
	    this.close();
	  }

	  async validate() {
	    let valid = await this.validator(this.value);
	    if (typeof valid === `string`) {
	      this.errorMsg = valid;
	      valid = false;
	    }
	    this.error = !valid;
	  }

	  async submit() {
	    await this.validate();
	    if (this.error) {
	      this.color = `red`;
	      this.fire();
	      this.render();
	      return;
	    }
	    let x = this.value;
	    this.value = x !== `` ? x : this.initial;
	    this.done = true;
	    this.aborted = false;
	    this.error = false;
	    this.fire();
	    this.render();
	    this.out.write(`\n`);
	    this.close();
	  }

	  up() {
	    this.typed = ``;
	    if(this.value === '') {
	      this.value = this.min - this.inc;
	    }
	    if (this.value >= this.max) return this.bell();
	    this.value += this.inc;
	    this.color = `cyan`;
	    this.fire();
	    this.render();
	  }

	  down() {
	    this.typed = ``;
	    if(this.value === '') {
	      this.value = this.min + this.inc;
	    }
	    if (this.value <= this.min) return this.bell();
	    this.value -= this.inc;
	    this.color = `cyan`;
	    this.fire();
	    this.render();
	  }

	  delete() {
	    let val = this.value.toString();
	    if (val.length === 0) return this.bell();
	    this.value = this.parse((val = val.slice(0, -1))) || ``;
	    if (this.value !== '' && this.value < this.min) {
	      this.value = this.min;
	    }
	    this.color = `cyan`;
	    this.fire();
	    this.render();
	  }

	  next() {
	    this.value = this.initial;
	    this.fire();
	    this.render();
	  }

	  _(c, key) {
	    if (!this.valid(c)) return this.bell();

	    const now = Date.now();
	    if (now - this.lastHit > 1000) this.typed = ``; // 1s elapsed
	    this.typed += c;
	    this.lastHit = now;
	    this.color = `cyan`;

	    if (c === `.`) return this.fire();

	    this.value = Math.min(this.parse(this.typed), this.max);
	    if (this.value > this.max) this.value = this.max;
	    if (this.value < this.min) this.value = this.min;
	    this.fire();
	    this.render();
	  }

	  render() {
	    if (this.closed) return;
	    if (!this.firstRender) {
	      if (this.outputError)
	        this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
	      this.out.write(clear(this.outputText, this.out.columns));
	    }
	    super.render();
	    this.outputError = '';

	    // Print prompt
	    this.outputText = [
	      style.symbol(this.done, this.aborted),
	      color.bold(this.msg),
	      style.delimiter(this.done),
	      !this.done || (!this.done && !this.placeholder)
	          ? color[this.color]().underline(this.rendered) : this.rendered
	    ].join(` `);

	    // Print error
	    if (this.error) {
	      this.outputError += this.errorMsg.split(`\n`)
	          .reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
	    }

	    this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
	  }
	}

	number = NumberPrompt;
	return number;
}

var multiselect;
var hasRequiredMultiselect;

function requireMultiselect () {
	if (hasRequiredMultiselect) return multiselect;
	hasRequiredMultiselect = 1;

	const color = requireKleur();
	const { cursor } = requireSrc();
	const Prompt = requirePrompt();
	const { clear, figures, style, wrap, entriesToDisplay } = requireUtil();

	/**
	 * MultiselectPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Array} opts.choices Array of choice objects
	 * @param {String} [opts.hint] Hint to display
	 * @param {String} [opts.warn] Hint shown for disabled choices
	 * @param {Number} [opts.max] Max choices
	 * @param {Number} [opts.cursor=0] Cursor start position
	 * @param {Number} [opts.optionsPerPage=10] Max options to display at once
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */
	class MultiselectPrompt extends Prompt {
	  constructor(opts={}) {
	    super(opts);
	    this.msg = opts.message;
	    this.cursor = opts.cursor || 0;
	    this.scrollIndex = opts.cursor || 0;
	    this.hint = opts.hint || '';
	    this.warn = opts.warn || '- This option is disabled -';
	    this.minSelected = opts.min;
	    this.showMinError = false;
	    this.maxChoices = opts.max;
	    this.instructions = opts.instructions;
	    this.optionsPerPage = opts.optionsPerPage || 10;
	    this.value = opts.choices.map((ch, idx) => {
	      if (typeof ch === 'string')
	        ch = {title: ch, value: idx};
	      return {
	        title: ch && (ch.title || ch.value || ch),
	        description: ch && ch.description,
	        value: ch && (ch.value === undefined ? idx : ch.value),
	        selected: ch && ch.selected,
	        disabled: ch && ch.disabled
	      };
	    });
	    this.clear = clear('', this.out.columns);
	    if (!opts.overrideRender) {
	      this.render();
	    }
	  }

	  reset() {
	    this.value.map(v => !v.selected);
	    this.cursor = 0;
	    this.fire();
	    this.render();
	  }

	  selected() {
	    return this.value.filter(v => v.selected);
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    const selected = this.value
	      .filter(e => e.selected);
	    if (this.minSelected && selected.length < this.minSelected) {
	      this.showMinError = true;
	      this.render();
	    } else {
	      this.done = true;
	      this.aborted = false;
	      this.fire();
	      this.render();
	      this.out.write('\n');
	      this.close();
	    }
	  }

	  first() {
	    this.cursor = 0;
	    this.render();
	  }

	  last() {
	    this.cursor = this.value.length - 1;
	    this.render();
	  }
	  next() {
	    this.cursor = (this.cursor + 1) % this.value.length;
	    this.render();
	  }

	  up() {
	    if (this.cursor === 0) {
	      this.cursor = this.value.length - 1;
	    } else {
	      this.cursor--;
	    }
	    this.render();
	  }

	  down() {
	    if (this.cursor === this.value.length - 1) {
	      this.cursor = 0;
	    } else {
	      this.cursor++;
	    }
	    this.render();
	  }

	  left() {
	    this.value[this.cursor].selected = false;
	    this.render();
	  }

	  right() {
	    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
	    this.value[this.cursor].selected = true;
	    this.render();
	  }

	  handleSpaceToggle() {
	    const v = this.value[this.cursor];

	    if (v.selected) {
	      v.selected = false;
	      this.render();
	    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
	      return this.bell();
	    } else {
	      v.selected = true;
	      this.render();
	    }
	  }

	  toggleAll() {
	    if (this.maxChoices !== undefined || this.value[this.cursor].disabled) {
	      return this.bell();
	    }

	    const newSelected = !this.value[this.cursor].selected;
	    this.value.filter(v => !v.disabled).forEach(v => v.selected = newSelected);
	    this.render();
	  }

	  _(c, key) {
	    if (c === ' ') {
	      this.handleSpaceToggle();
	    } else if (c === 'a') {
	      this.toggleAll();
	    } else {
	      return this.bell();
	    }
	  }

	  renderInstructions() {
	    if (this.instructions === undefined || this.instructions) {
	      if (typeof this.instructions === 'string') {
	        return this.instructions;
	      }
	      return '\nInstructions:\n'
	        + `    ${figures.arrowUp}/${figures.arrowDown}: Highlight option\n`
	        + `    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection\n`
	        + (this.maxChoices === undefined ? `    a: Toggle all\n` : '')
	        + `    enter/return: Complete answer`;
	    }
	    return '';
	  }

	  renderOption(cursor, v, i, arrowIndicator) {
	    const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + ' ' + arrowIndicator + ' ';
	    let title, desc;

	    if (v.disabled) {
	      title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
	    } else {
	      title = cursor === i ? color.cyan().underline(v.title) : v.title;
	      if (cursor === i && v.description) {
	        desc = ` - ${v.description}`;
	        if (prefix.length + title.length + desc.length >= this.out.columns
	          || v.description.split(/\r?\n/).length > 1) {
	          desc = '\n' + wrap(v.description, { margin: prefix.length, width: this.out.columns });
	        }
	      }
	    }

	    return prefix + title + color.gray(desc || '');
	  }

	  // shared with autocompleteMultiselect
	  paginateOptions(options) {
	    if (options.length === 0) {
	      return color.red('No matches for this query.');
	    }

	    let { startIndex, endIndex } = entriesToDisplay(this.cursor, options.length, this.optionsPerPage);
	    let prefix, styledOptions = [];

	    for (let i = startIndex; i < endIndex; i++) {
	      if (i === startIndex && startIndex > 0) {
	        prefix = figures.arrowUp;
	      } else if (i === endIndex - 1 && endIndex < options.length) {
	        prefix = figures.arrowDown;
	      } else {
	        prefix = ' ';
	      }
	      styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
	    }

	    return '\n' + styledOptions.join('\n');
	  }

	  // shared with autocomleteMultiselect
	  renderOptions(options) {
	    if (!this.done) {
	      return this.paginateOptions(options);
	    }
	    return '';
	  }

	  renderDoneOrInstructions() {
	    if (this.done) {
	      return this.value
	        .filter(e => e.selected)
	        .map(v => v.title)
	        .join(', ');
	    }

	    const output = [color.gray(this.hint), this.renderInstructions()];

	    if (this.value[this.cursor].disabled) {
	      output.push(color.yellow(this.warn));
	    }
	    return output.join(' ');
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);
	    super.render();

	    // print prompt
	    let prompt = [
	      style.symbol(this.done, this.aborted),
	      color.bold(this.msg),
	      style.delimiter(false),
	      this.renderDoneOrInstructions()
	    ].join(' ');
	    if (this.showMinError) {
	      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
	      this.showMinError = false;
	    }
	    prompt += this.renderOptions(this.value);

	    this.out.write(this.clear + prompt);
	    this.clear = clear(prompt, this.out.columns);
	  }
	}

	multiselect = MultiselectPrompt;
	return multiselect;
}

var autocomplete;
var hasRequiredAutocomplete;

function requireAutocomplete () {
	if (hasRequiredAutocomplete) return autocomplete;
	hasRequiredAutocomplete = 1;

	const color = requireKleur();
	const Prompt = requirePrompt();
	const { erase, cursor } = requireSrc();
	const { style, clear, figures, wrap, entriesToDisplay } = requireUtil();

	const getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
	const getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
	const getIndex = (arr, valOrTitle) => {
	  const index = arr.findIndex(el => el.value === valOrTitle || el.title === valOrTitle);
	  return index > -1 ? index : undefined;
	};

	/**
	 * TextPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Array} opts.choices Array of auto-complete choices objects
	 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
	 * @param {Number} [opts.limit=10] Max number of results to show
	 * @param {Number} [opts.cursor=0] Cursor start position
	 * @param {String} [opts.style='default'] Render style
	 * @param {String} [opts.fallback] Fallback message - initial to default value
	 * @param {String} [opts.initial] Index of the default value
	 * @param {Boolean} [opts.clearFirst] The first ESCAPE keypress will clear the input
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {String} [opts.noMatches] The no matches found label
	 */
	class AutocompletePrompt extends Prompt {
	  constructor(opts={}) {
	    super(opts);
	    this.msg = opts.message;
	    this.suggest = opts.suggest;
	    this.choices = opts.choices;
	    this.initial = typeof opts.initial === 'number'
	      ? opts.initial
	      : getIndex(opts.choices, opts.initial);
	    this.select = this.initial || opts.cursor || 0;
	    this.i18n = { noMatches: opts.noMatches || 'no matches found' };
	    this.fallback = opts.fallback || this.initial;
	    this.clearFirst = opts.clearFirst || false;
	    this.suggestions = [];
	    this.input = '';
	    this.limit = opts.limit || 10;
	    this.cursor = 0;
	    this.transform = style.render(opts.style);
	    this.scale = this.transform.scale;
	    this.render = this.render.bind(this);
	    this.complete = this.complete.bind(this);
	    this.clear = clear('', this.out.columns);
	    this.complete(this.render);
	    this.render();
	  }

	  set fallback(fb) {
	    this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
	  }

	  get fallback() {
	    let choice;
	    if (typeof this._fb === 'number')
	      choice = this.choices[this._fb];
	    else if (typeof this._fb === 'string')
	      choice = { title: this._fb };
	    return choice || this._fb || { title: this.i18n.noMatches };
	  }

	  moveSelect(i) {
	    this.select = i;
	    if (this.suggestions.length > 0)
	      this.value = getVal(this.suggestions, i);
	    else this.value = this.fallback.value;
	    this.fire();
	  }

	  async complete(cb) {
	    const p = (this.completing = this.suggest(this.input, this.choices));
	    const suggestions = await p;

	    if (this.completing !== p) return;
	    this.suggestions = suggestions
	      .map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }));
	    this.completing = false;
	    const l = Math.max(suggestions.length - 1, 0);
	    this.moveSelect(Math.min(l, this.select));

	    cb && cb();
	  }

	  reset() {
	    this.input = '';
	    this.complete(() => {
	      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
	      this.render();
	    });
	    this.render();
	  }

	  exit() {
	    if (this.clearFirst && this.input.length > 0) {
	      this.reset();
	    } else {
	      this.done = this.exited = true; 
	      this.aborted = false;
	      this.fire();
	      this.render();
	      this.out.write('\n');
	      this.close();
	    }
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.exited = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    this.done = true;
	    this.aborted = this.exited = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  _(c, key) {
	    let s1 = this.input.slice(0, this.cursor);
	    let s2 = this.input.slice(this.cursor);
	    this.input = `${s1}${c}${s2}`;
	    this.cursor = s1.length+1;
	    this.complete(this.render);
	    this.render();
	  }

	  delete() {
	    if (this.cursor === 0) return this.bell();
	    let s1 = this.input.slice(0, this.cursor-1);
	    let s2 = this.input.slice(this.cursor);
	    this.input = `${s1}${s2}`;
	    this.complete(this.render);
	    this.cursor = this.cursor-1;
	    this.render();
	  }

	  deleteForward() {
	    if(this.cursor*this.scale >= this.rendered.length) return this.bell();
	    let s1 = this.input.slice(0, this.cursor);
	    let s2 = this.input.slice(this.cursor+1);
	    this.input = `${s1}${s2}`;
	    this.complete(this.render);
	    this.render();
	  }

	  first() {
	    this.moveSelect(0);
	    this.render();
	  }

	  last() {
	    this.moveSelect(this.suggestions.length - 1);
	    this.render();
	  }

	  up() {
	    if (this.select === 0) {
	      this.moveSelect(this.suggestions.length - 1);
	    } else {
	      this.moveSelect(this.select - 1);
	    }
	    this.render();
	  }

	  down() {
	    if (this.select === this.suggestions.length - 1) {
	      this.moveSelect(0);
	    } else {
	      this.moveSelect(this.select + 1);
	    }
	    this.render();
	  }

	  next() {
	    if (this.select === this.suggestions.length - 1) {
	      this.moveSelect(0);
	    } else this.moveSelect(this.select + 1);
	    this.render();
	  }

	  nextPage() {
	    this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
	    this.render();
	  }

	  prevPage() {
	    this.moveSelect(Math.max(this.select - this.limit, 0));
	    this.render();
	  }

	  left() {
	    if (this.cursor <= 0) return this.bell();
	    this.cursor = this.cursor-1;
	    this.render();
	  }

	  right() {
	    if (this.cursor*this.scale >= this.rendered.length) return this.bell();
	    this.cursor = this.cursor+1;
	    this.render();
	  }

	  renderOption(v, hovered, isStart, isEnd) {
	    let desc;
	    let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : ' ';
	    let title = hovered ? color.cyan().underline(v.title) : v.title;
	    prefix = (hovered ? color.cyan(figures.pointer) + ' ' : '  ') + prefix;
	    if (v.description) {
	      desc = ` - ${v.description}`;
	      if (prefix.length + title.length + desc.length >= this.out.columns
	        || v.description.split(/\r?\n/).length > 1) {
	        desc = '\n' + wrap(v.description, { margin: 3, width: this.out.columns });
	      }
	    }
	    return prefix + ' ' + title + color.gray(desc || '');
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);
	    else this.out.write(clear(this.outputText, this.out.columns));
	    super.render();

	    let { startIndex, endIndex } = entriesToDisplay(this.select, this.choices.length, this.limit);

	    this.outputText = [
	      style.symbol(this.done, this.aborted, this.exited),
	      color.bold(this.msg),
	      style.delimiter(this.completing),
	      this.done && this.suggestions[this.select]
	        ? this.suggestions[this.select].title
	        : this.rendered = this.transform.render(this.input)
	    ].join(' ');

	    if (!this.done) {
	      const suggestions = this.suggestions
	        .slice(startIndex, endIndex)
	        .map((item, i) =>  this.renderOption(item,
	          this.select === i + startIndex,
	          i === 0 && startIndex > 0,
	          i + startIndex === endIndex - 1 && endIndex < this.choices.length))
	        .join('\n');
	      this.outputText += `\n` + (suggestions || color.gray(this.fallback.title));
	    }

	    this.out.write(erase.line + cursor.to(0) + this.outputText);
	  }
	}

	autocomplete = AutocompletePrompt;
	return autocomplete;
}

var autocompleteMultiselect;
var hasRequiredAutocompleteMultiselect;

function requireAutocompleteMultiselect () {
	if (hasRequiredAutocompleteMultiselect) return autocompleteMultiselect;
	hasRequiredAutocompleteMultiselect = 1;

	const color = requireKleur();
	const { cursor } = requireSrc();
	const MultiselectPrompt = requireMultiselect();
	const { clear, style, figures } = requireUtil();
	/**
	 * MultiselectPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Array} opts.choices Array of choice objects
	 * @param {String} [opts.hint] Hint to display
	 * @param {String} [opts.warn] Hint shown for disabled choices
	 * @param {Number} [opts.max] Max choices
	 * @param {Number} [opts.cursor=0] Cursor start position
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 */
	class AutocompleteMultiselectPrompt extends MultiselectPrompt {
	  constructor(opts={}) {
	    opts.overrideRender = true;
	    super(opts);
	    this.inputValue = '';
	    this.clear = clear('', this.out.columns);
	    this.filteredOptions = this.value;
	    this.render();
	  }

	  last() {
	    this.cursor = this.filteredOptions.length - 1;
	    this.render();
	  }
	  next() {
	    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
	    this.render();
	  }

	  up() {
	    if (this.cursor === 0) {
	      this.cursor = this.filteredOptions.length - 1;
	    } else {
	      this.cursor--;
	    }
	    this.render();
	  }

	  down() {
	    if (this.cursor === this.filteredOptions.length - 1) {
	      this.cursor = 0;
	    } else {
	      this.cursor++;
	    }
	    this.render();
	  }

	  left() {
	    this.filteredOptions[this.cursor].selected = false;
	    this.render();
	  }

	  right() {
	    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
	    this.filteredOptions[this.cursor].selected = true;
	    this.render();
	  }

	  delete() {
	    if (this.inputValue.length) {
	      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
	      this.updateFilteredOptions();
	    }
	  }

	  updateFilteredOptions() {
	    const currentHighlight = this.filteredOptions[this.cursor];
	    this.filteredOptions = this.value
	      .filter(v => {
	        if (this.inputValue) {
	          if (typeof v.title === 'string') {
	            if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
	              return true;
	            }
	          }
	          if (typeof v.value === 'string') {
	            if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
	              return true;
	            }
	          }
	          return false;
	        }
	        return true;
	      });
	    const newHighlightIndex = this.filteredOptions.findIndex(v => v === currentHighlight);
	    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
	    this.render();
	  }

	  handleSpaceToggle() {
	    const v = this.filteredOptions[this.cursor];

	    if (v.selected) {
	      v.selected = false;
	      this.render();
	    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
	      return this.bell();
	    } else {
	      v.selected = true;
	      this.render();
	    }
	  }

	  handleInputChange(c) {
	    this.inputValue = this.inputValue + c;
	    this.updateFilteredOptions();
	  }

	  _(c, key) {
	    if (c === ' ') {
	      this.handleSpaceToggle();
	    } else {
	      this.handleInputChange(c);
	    }
	  }

	  renderInstructions() {
	    if (this.instructions === undefined || this.instructions) {
	      if (typeof this.instructions === 'string') {
	        return this.instructions;
	      }
	      return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
	    }
	    return '';
	  }

	  renderCurrentInput() {
	    return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray('Enter something to filter')}\n`;
	  }

	  renderOption(cursor, v, i) {
	    let title;
	    if (v.disabled) title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
	    else title = cursor === i ? color.cyan().underline(v.title) : v.title;
	    return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ' + title
	  }

	  renderDoneOrInstructions() {
	    if (this.done) {
	      return this.value
	        .filter(e => e.selected)
	        .map(v => v.title)
	        .join(', ');
	    }

	    const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];

	    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
	      output.push(color.yellow(this.warn));
	    }
	    return output.join(' ');
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);
	    super.render();

	    // print prompt

	    let prompt = [
	      style.symbol(this.done, this.aborted),
	      color.bold(this.msg),
	      style.delimiter(false),
	      this.renderDoneOrInstructions()
	    ].join(' ');

	    if (this.showMinError) {
	      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
	      this.showMinError = false;
	    }
	    prompt += this.renderOptions(this.filteredOptions);

	    this.out.write(this.clear + prompt);
	    this.clear = clear(prompt, this.out.columns);
	  }
	}

	autocompleteMultiselect = AutocompleteMultiselectPrompt;
	return autocompleteMultiselect;
}

var confirm;
var hasRequiredConfirm;

function requireConfirm () {
	if (hasRequiredConfirm) return confirm;
	hasRequiredConfirm = 1;
	const color = requireKleur();
	const Prompt = requirePrompt();
	const { style, clear } = requireUtil();
	const { erase, cursor } = requireSrc();

	/**
	 * ConfirmPrompt Base Element
	 * @param {Object} opts Options
	 * @param {String} opts.message Message
	 * @param {Boolean} [opts.initial] Default value (true/false)
	 * @param {Stream} [opts.stdin] The Readable stream to listen to
	 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
	 * @param {String} [opts.yes] The "Yes" label
	 * @param {String} [opts.yesOption] The "Yes" option when choosing between yes/no
	 * @param {String} [opts.no] The "No" label
	 * @param {String} [opts.noOption] The "No" option when choosing between yes/no
	 */
	class ConfirmPrompt extends Prompt {
	  constructor(opts={}) {
	    super(opts);
	    this.msg = opts.message;
	    this.value = opts.initial;
	    this.initialValue = !!opts.initial;
	    this.yesMsg = opts.yes || 'yes';
	    this.yesOption = opts.yesOption || '(Y/n)';
	    this.noMsg = opts.no || 'no';
	    this.noOption = opts.noOption || '(y/N)';
	    this.render();
	  }

	  reset() {
	    this.value = this.initialValue;
	    this.fire();
	    this.render();
	  }

	  exit() {
	    this.abort();
	  }

	  abort() {
	    this.done = this.aborted = true;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  submit() {
	    this.value = this.value || false;
	    this.done = true;
	    this.aborted = false;
	    this.fire();
	    this.render();
	    this.out.write('\n');
	    this.close();
	  }

	  _(c, key) {
	    if (c.toLowerCase() === 'y') {
	      this.value = true;
	      return this.submit();
	    }
	    if (c.toLowerCase() === 'n') {
	      this.value = false;
	      return this.submit();
	    }
	    return this.bell();
	  }

	  render() {
	    if (this.closed) return;
	    if (this.firstRender) this.out.write(cursor.hide);
	    else this.out.write(clear(this.outputText, this.out.columns));
	    super.render();

	    this.outputText = [
	      style.symbol(this.done, this.aborted),
	      color.bold(this.msg),
	      style.delimiter(this.done),
	      this.done ? (this.value ? this.yesMsg : this.noMsg)
	          : color.gray(this.initialValue ? this.yesOption : this.noOption)
	    ].join(' ');

	    this.out.write(erase.line + cursor.to(0) + this.outputText);
	  }
	}

	confirm = ConfirmPrompt;
	return confirm;
}

var elements;
var hasRequiredElements;

function requireElements () {
	if (hasRequiredElements) return elements;
	hasRequiredElements = 1;

	elements = {
	  TextPrompt: requireText(),
	  SelectPrompt: requireSelect(),
	  TogglePrompt: requireToggle(),
	  DatePrompt: requireDate(),
	  NumberPrompt: requireNumber(),
	  MultiselectPrompt: requireMultiselect(),
	  AutocompletePrompt: requireAutocomplete(),
	  AutocompleteMultiselectPrompt: requireAutocompleteMultiselect(),
	  ConfirmPrompt: requireConfirm()
	};
	return elements;
}

var hasRequiredPrompts$1;

function requirePrompts$1 () {
	if (hasRequiredPrompts$1) return prompts$1;
	hasRequiredPrompts$1 = 1;
	(function (exports) {
		const $ = exports;
		const el = requireElements();
		const noop = v => v;

		function toPrompt(type, args, opts={}) {
		  return new Promise((res, rej) => {
		    const p = new el[type](args);
		    const onAbort = opts.onAbort || noop;
		    const onSubmit = opts.onSubmit || noop;
		    const onExit = opts.onExit || noop;
		    p.on('state', args.onState || noop);
		    p.on('submit', x => res(onSubmit(x)));
		    p.on('exit', x => res(onExit(x)));
		    p.on('abort', x => rej(onAbort(x)));
		  });
		}

		/**
		 * Text prompt
		 * @param {string} args.message Prompt message to display
		 * @param {string} [args.initial] Default string value
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {function} [args.onState] On state change callback
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.text = args => toPrompt('TextPrompt', args);

		/**
		 * Password prompt with masked input
		 * @param {string} args.message Prompt message to display
		 * @param {string} [args.initial] Default string value
		 * @param {function} [args.onState] On state change callback
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.password = args => {
		  args.style = 'password';
		  return $.text(args);
		};

		/**
		 * Prompt where input is invisible, like sudo
		 * @param {string} args.message Prompt message to display
		 * @param {string} [args.initial] Default string value
		 * @param {function} [args.onState] On state change callback
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.invisible = args => {
		  args.style = 'invisible';
		  return $.text(args);
		};

		/**
		 * Number prompt
		 * @param {string} args.message Prompt message to display
		 * @param {number} args.initial Default number value
		 * @param {function} [args.onState] On state change callback
		 * @param {number} [args.max] Max value
		 * @param {number} [args.min] Min value
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {Boolean} [opts.float=false] Parse input as floats
		 * @param {Number} [opts.round=2] Round floats to x decimals
		 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.number = args => toPrompt('NumberPrompt', args);

		/**
		 * Date prompt
		 * @param {string} args.message Prompt message to display
		 * @param {number} args.initial Default number value
		 * @param {function} [args.onState] On state change callback
		 * @param {number} [args.max] Max value
		 * @param {number} [args.min] Min value
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {Boolean} [opts.float=false] Parse input as floats
		 * @param {Number} [opts.round=2] Round floats to x decimals
		 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
		 * @param {function} [args.validate] Function to validate user input
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.date = args => toPrompt('DatePrompt', args);

		/**
		 * Classic yes/no prompt
		 * @param {string} args.message Prompt message to display
		 * @param {boolean} [args.initial=false] Default value
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.confirm = args => toPrompt('ConfirmPrompt', args);

		/**
		 * List prompt, split intput string by `seperator`
		 * @param {string} args.message Prompt message to display
		 * @param {string} [args.initial] Default string value
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {string} [args.separator] String separator
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input, in form of an `Array`
		 */
		$.list = args => {
		  const sep = args.separator || ',';
		  return toPrompt('TextPrompt', args, {
		    onSubmit: str => str.split(sep).map(s => s.trim())
		  });
		};

		/**
		 * Toggle/switch prompt
		 * @param {string} args.message Prompt message to display
		 * @param {boolean} [args.initial=false] Default value
		 * @param {string} [args.active="on"] Text for `active` state
		 * @param {string} [args.inactive="off"] Text for `inactive` state
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.toggle = args => toPrompt('TogglePrompt', args);

		/**
		 * Interactive select prompt
		 * @param {string} args.message Prompt message to display
		 * @param {Array} args.choices Array of choices objects `[{ title, value }, ...]`
		 * @param {number} [args.initial] Index of default value
		 * @param {String} [args.hint] Hint to display
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.select = args => toPrompt('SelectPrompt', args);

		/**
		 * Interactive multi-select / autocompleteMultiselect prompt
		 * @param {string} args.message Prompt message to display
		 * @param {Array} args.choices Array of choices objects `[{ title, value, [selected] }, ...]`
		 * @param {number} [args.max] Max select
		 * @param {string} [args.hint] Hint to display user
		 * @param {Number} [args.cursor=0] Cursor start position
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.multiselect = args => {
		  args.choices = [].concat(args.choices || []);
		  const toSelected = items => items.filter(item => item.selected).map(item => item.value);
		  return toPrompt('MultiselectPrompt', args, {
		    onAbort: toSelected,
		    onSubmit: toSelected
		  });
		};

		$.autocompleteMultiselect = args => {
		  args.choices = [].concat(args.choices || []);
		  const toSelected = items => items.filter(item => item.selected).map(item => item.value);
		  return toPrompt('AutocompleteMultiselectPrompt', args, {
		    onAbort: toSelected,
		    onSubmit: toSelected
		  });
		};

		const byTitle = (input, choices) => Promise.resolve(
		  choices.filter(item => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
		);

		/**
		 * Interactive auto-complete prompt
		 * @param {string} args.message Prompt message to display
		 * @param {Array} args.choices Array of auto-complete choices objects `[{ title, value }, ...]`
		 * @param {Function} [args.suggest] Function to filter results based on user input. Defaults to sort by `title`
		 * @param {number} [args.limit=10] Max number of results to show
		 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
		 * @param {String} [args.initial] Index of the default value
		 * @param {boolean} [opts.clearFirst] The first ESCAPE keypress will clear the input
		 * @param {String} [args.fallback] Fallback message - defaults to initial value
		 * @param {function} [args.onState] On state change callback
		 * @param {Stream} [args.stdin] The Readable stream to listen to
		 * @param {Stream} [args.stdout] The Writable stream to write readline data to
		 * @returns {Promise} Promise with user input
		 */
		$.autocomplete = args => {
		  args.suggest = args.suggest || byTitle;
		  args.choices = [].concat(args.choices || []);
		  return toPrompt('AutocompletePrompt', args);
		}; 
	} (prompts$1));
	return prompts$1;
}

var lib;
var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;

	const prompts = requirePrompts$1();

	const passOn = ['suggest', 'format', 'onState', 'validate', 'onRender', 'type'];
	const noop = () => {};

	/**
	 * Prompt for a series of questions
	 * @param {Array|Object} questions Single question object or Array of question objects
	 * @param {Function} [onSubmit] Callback function called on prompt submit
	 * @param {Function} [onCancel] Callback function called on cancel/abort
	 * @returns {Object} Object with values from user input
	 */
	async function prompt(questions=[], { onSubmit=noop, onCancel=noop }={}) {
	  const answers = {};
	  const override = prompt._override || {};
	  questions = [].concat(questions);
	  let answer, question, quit, name, type, lastPrompt;

	  const getFormattedAnswer = async (question, answer, skipValidation = false) => {
	    if (!skipValidation && question.validate && question.validate(answer) !== true) {
	      return;
	    }
	    return question.format ? await question.format(answer, answers) : answer
	  };

	  for (question of questions) {
	    ({ name, type } = question);

	    // evaluate type first and skip if type is a falsy value
	    if (typeof type === 'function') {
	      type = await type(answer, { ...answers }, question);
	      question['type'] = type;
	    }
	    if (!type) continue;

	    // if property is a function, invoke it unless it's a special function
	    for (let key in question) {
	      if (passOn.includes(key)) continue;
	      let value = question[key];
	      question[key] = typeof value === 'function' ? await value(answer, { ...answers }, lastPrompt) : value;
	    }

	    lastPrompt = question;

	    if (typeof question.message !== 'string') {
	      throw new Error('prompt message is required');
	    }

	    // update vars in case they changed
	    ({ name, type } = question);

	    if (prompts[type] === void 0) {
	      throw new Error(`prompt type (${type}) is not defined`);
	    }

	    if (override[question.name] !== undefined) {
	      answer = await getFormattedAnswer(question, override[question.name]);
	      if (answer !== undefined) {
	        answers[name] = answer;
	        continue;
	      }
	    }

	    try {
	      // Get the injected answer if there is one or prompt the user
	      answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : await prompts[type](question);
	      answers[name] = answer = await getFormattedAnswer(question, answer, true);
	      quit = await onSubmit(question, answer, answers);
	    } catch (err) {
	      quit = !(await onCancel(question, answers));
	    }

	    if (quit) return answers;
	  }

	  return answers;
	}

	function getInjectedAnswer(injected, deafultValue) {
	  const answer = injected.shift();
	    if (answer instanceof Error) {
	      throw answer;
	    }

	    return (answer === undefined) ? deafultValue : answer;
	}

	function inject(answers) {
	  prompt._injected = (prompt._injected || []).concat(answers);
	}

	function override(answers) {
	  prompt._override = Object.assign({}, answers);
	}

	lib = Object.assign(prompt, { prompt, prompts, inject, override });
	return lib;
}

var prompts;
var hasRequiredPrompts;

function requirePrompts () {
	if (hasRequiredPrompts) return prompts;
	hasRequiredPrompts = 1;
	function isNodeLT(tar) {
	  tar = (Array.isArray(tar) ? tar : tar.split('.')).map(Number);
	  let i=0, src=process.versions.node.split('.').map(Number);
	  for (; i < tar.length; i++) {
	    if (src[i] > tar[i]) return false;
	    if (tar[i] > src[i]) return true;
	  }
	  return false;
	}

	prompts =
	  isNodeLT('8.6.0')
	    ? requireDist()
	    : requireLib();
	return prompts;
}

var promptsExports = requirePrompts();
var prompt = /*@__PURE__*/getDefaultExportFromCjs(promptsExports);

var index = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: prompt
}, [promptsExports]);

export { generateCodeFrame as A, BaseSequencer as B, printStack as C, LocationFilterFileNotFoundError as D, GitCommandError as E, ForksPoolWorker as F, GitNotFoundError as G, VitestResolver as H, IncludeTaskLocationDisabledError as I, createClusterServer as J, attachProjectsFromEntries as K, Logger as L, ModuleTransformService as M, TestProject as N, resolveAndAttachProjects as O, PluginHarness as P, RandomSequencer as Q, RangeLocationFilterProvidedError as R, ServerModuleRunner as S, ThreadsPoolWorker as T, createPool as U, VitestPackageInstaller as V, astCollectTests as W, createFailedFileTask as X, matchesProjectFilter as Y, nanoid as Z, stdout as _, BrowserConnectionError as a, FilesNotFoundError as b, TypecheckPoolWorker as c, VmForksPoolWorker as d, VmThreadsPoolWorker as e, createDebugger as f, createMethodsRPC as g, createViteLogger as h, escapeTestName as i, getFilePoolName as j, isFileServingAllowed as k, resolveConfig as l, resolveFsAllow as m, findConfigFile as n, parse as o, prompt as p, getSpecificationDocblock as q, resolveApiServerConfig as r, stringify as s, resolveStaticMocks as t, getStaticMocks as u, hash as v, resolveCoverageReporters as w, createIndexLocationsMap as x, getOutputFile as y, groupBy as z };
