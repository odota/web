import * as fs from 'node:fs';
import fs__default, { promises, existsSync, writeFileSync, mkdirSync, readFileSync, statSync, readdirSync } from 'node:fs';
import { r as resolveCoverageProviderModule, g as getCoverageFilesDirectory, C as CoverageProviderMap } from './coverage.jGCktcGP.js';
import { o as parse, s as stringify, k as isFileServingAllowed, q as getSpecificationDocblock, t as resolveStaticMocks, u as getStaticMocks, f as createDebugger, v as hash, w as resolveCoverageReporters, x as createIndexLocationsMap, y as getOutputFile, z as groupBy, A as generateCodeFrame, C as printStack, R as RangeLocationFilterProvidedError, I as IncludeTaskLocationDisabledError, D as LocationFilterFileNotFoundError, E as GitCommandError, G as GitNotFoundError, H as VitestResolver, M as ModuleTransformService, l as resolveConfig$1, J as createClusterServer, S as ServerModuleRunner, K as attachProjectsFromEntries, N as TestProject, O as resolveAndAttachProjects, Q as RandomSequencer, b as FilesNotFoundError, U as createPool, W as astCollectTests, X as createFailedFileTask, Y as matchesProjectFilter, Z as nanoid, L as Logger, V as VitestPackageInstaller, P as PluginHarness, _ as stdout, p as prompt } from './index.Di8au7q4.js';
import { readFile, writeFile, rename, stat, unlink, rm, mkdir, readdir, copyFile } from 'node:fs/promises';
import os__default, { tmpdir, hostname } from 'node:os';
import { j as join, b as basename, d as dirname, i as isAbsolute, r as resolve, D as noop, e as createDefer, c as cleanUrl, a as relative, s as slash, F as sanitizeFilePath, t as toArray, x as ordinal, G as deepMerge, p as isPrimitive, k as extname, n as normalize$1, u as deepClone } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { T as TraceMap, o as originalPositionFor, p as parseStacktrace, e as parseErrorStacktrace, b as serializeValue } from './source-map.DakdQc29.js';
import { v as version } from './cac.BYbt0aJp.js';
import { performance as performance$1 } from 'node:perf_hooks';
import { c as createBirpc } from './index.DmDMHCg8.js';
import require$$0$3 from 'events';
import require$$1$1 from 'https';
import require$$2$1 from 'http';
import require$$3 from 'net';
import require$$4 from 'tls';
import require$$1 from 'crypto';
import require$$0$2 from 'stream';
import require$$7 from 'url';
import require$$0 from 'zlib';
import require$$0$1 from 'buffer';
import require$$2 from 'util';
import { g as getDefaultExportFromCjs } from './index.D0heQG4v.js';
import { A as API_PATH, d as defaultBrowserPort } from './constants.DLYM6cZY.js';
import { i as isBuiltin } from './modules.BJuCwlRJ.js';
import crypto, { createHash } from 'node:crypto';
import { distDir } from '../path.js';
import { A as limitConcurrency, B as createTagsFilter } from './run.CjdgFZiW.js';
import { N as NativeModuleRunner } from './nativeModuleRunner.9xPIMzi7.js';
import { getTestName, hasFailed, hasFailedSnapshot, getTests, getSuites, getTasks, getFullName, createFileTask, generateFileHash, interpretTaskModes, convertTasksToEvents } from '../task-utils.js';
import { Traces } from '../traces.js';
import { $ } from './tinyrainbow.Do8I1XRG.js';
import { searchForWorkspaceRoot } from 'vite';
import { w as withLabel, F as F_TREE_NODE_MIDDLE, a as F_TREE_NODE_END, f as formatTimeString, t as taskFail, s as separator, b as F_CHECK, c as F_POINTER, d as F_DOWN_RIGHT, e as formatProjectName, g as getStateSymbol, n as noun, p as padSummaryTitle, r as renderSnapshotSummary, h as getStateString$1, i as formatTime, j as countTestErrors, k as errorBanner, l as divider, m as F_RIGHT, o as getCols } from './utils.BBk_icFG.js';
import module$1 from 'node:module';
import path, { resolve as resolve$1, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import pm from 'picomatch';
import { glob } from 'tinyglobby';
import { a as coverageConfigDefaults } from './defaults.B1FCaFfh.js';
import { a as isTTY, b as isWindows } from './env.BKKtU2WC.js';
import { stripVTControlCharacters } from 'node:util';
import { isCI } from 'std-env';
import assert from 'node:assert';
import { x, NonZeroExitError } from 'tinyexec';
import readline from 'node:readline';
import { a as saveInlineSnapshots, e as evaluateSnapshotFile, s as saveSnapshotFile, b as saveRawSnapshots } from './rawSnapshot.DqSiqIEx.js';

async function saveSnapshotUpdates(snapshots) {
	const updatesByFile = /* @__PURE__ */ new Map();
	const saves = [];
	for (const [environment, updates] of snapshots) {
		for (const update of updates) {
			const fileUpdates = updatesByFile.get(update.file) ?? [];
			if (fileUpdates.length === 0) updatesByFile.set(update.file, fileUpdates);
			fileUpdates.push(update);
		}
		for (const [file, fileUpdates] of updatesByFile) {
			const updates = Object.groupBy(fileUpdates.values(), (snapshot) => snapshot.type);
			if (updates.inline) saves.push(saveInlineSnapshots(environment, updates.inline));
			if (updates.file) {
				let data;
				if (environment.readSnapshotFileData) data = await environment.readSnapshotFileData(file);
				else {
					const content = await environment.readSnapshotFile(file);
					data = content == null ? null : evaluateSnapshotFile(file, content);
				}
				const snapshotData = Object.assign(Object.create(null), data);
				for (const snapshot of updates.file) snapshotData[snapshot.key] = snapshot.snapshot;
				saves.push(saveSnapshotFile(environment, snapshotData, file));
			}
			if (updates.raw) saves.push(saveRawSnapshots(environment, updates.raw));
		}
	}
	await Promise.all(saves);
}

class SnapshotManager {
	options;
	summary;
	extension = ".snap";
	constructor(options) {
		this.options = options;
		this.clear();
	}
	clear() {
		this.summary = emptySummary(this.options);
	}
	add(result) {
		addSnapshotResult(this.summary, result);
	}
	resolvePath(testPath, context) {
		return (this.options.resolveSnapshotPath || (() => {
			return join(join(dirname(testPath), "__snapshots__"), `${basename(testPath)}${this.extension}`);
		}))(testPath, this.extension, context);
	}
	resolveRawPath(testPath, rawPath) {
		return isAbsolute(rawPath) ? rawPath : resolve(dirname(testPath), rawPath);
	}
}
function emptySummary(options) {
	return {
		added: 0,
		failure: false,
		filesAdded: 0,
		filesRemoved: 0,
		filesRemovedList: [],
		filesUnmatched: 0,
		filesUpdated: 0,
		matched: 0,
		total: 0,
		unchecked: 0,
		uncheckedKeysByFile: [],
		unmatched: 0,
		updated: 0,
		didUpdate: options.updateSnapshot === "all"
	};
}
function addSnapshotResult(summary, result) {
	if (result.added) summary.filesAdded++;
	if (result.fileDeleted) summary.filesRemoved++;
	if (result.unmatched) summary.filesUnmatched++;
	if (result.updated) summary.filesUpdated++;
	summary.added += result.added;
	summary.matched += result.matched;
	summary.unchecked += result.unchecked;
	if (result.uncheckedKeys && result.uncheckedKeys.length > 0) summary.uncheckedKeysByFile.push({
		filePath: result.filepath,
		keys: result.uncheckedKeys
	});
	summary.unmatched += result.unmatched;
	summary.updated += result.updated;
	summary.total += result.added + result.matched + result.unmatched + result.updated;
}

var bufferUtil = {exports: {}};

var constants;
var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;

	const BINARY_TYPES = ['nodebuffer', 'arraybuffer', 'fragments'];
	const hasBlob = typeof Blob !== 'undefined';

	if (hasBlob) BINARY_TYPES.push('blob');

	constants = {
	  BINARY_TYPES,
	  CLOSE_TIMEOUT: 30000,
	  EMPTY_BUFFER: Buffer.alloc(0),
	  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
	  hasBlob,
	  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
	  kListener: Symbol('kListener'),
	  kStatusCode: Symbol('status-code'),
	  kWebSocket: Symbol('websocket'),
	  NOOP: () => {}
	};
	return constants;
}

var hasRequiredBufferUtil;

function requireBufferUtil () {
	if (hasRequiredBufferUtil) return bufferUtil.exports;
	hasRequiredBufferUtil = 1;

	const { EMPTY_BUFFER } = requireConstants();

	const FastBuffer = Buffer[Symbol.species];

	/**
	 * Merges an array of buffers into a new buffer.
	 *
	 * @param {Buffer[]} list The array of buffers to concat
	 * @param {Number} totalLength The total length of buffers in the list
	 * @return {Buffer} The resulting buffer
	 * @public
	 */
	function concat(list, totalLength) {
	  if (list.length === 0) return EMPTY_BUFFER;
	  if (list.length === 1) return list[0];

	  const target = Buffer.allocUnsafe(totalLength);
	  let offset = 0;

	  for (let i = 0; i < list.length; i++) {
	    const buf = list[i];
	    target.set(buf, offset);
	    offset += buf.length;
	  }

	  if (offset < totalLength) {
	    return new FastBuffer(target.buffer, target.byteOffset, offset);
	  }

	  return target;
	}

	/**
	 * Masks a buffer using the given mask.
	 *
	 * @param {Buffer} source The buffer to mask
	 * @param {Buffer} mask The mask to use
	 * @param {Buffer} output The buffer where to store the result
	 * @param {Number} offset The offset at which to start writing
	 * @param {Number} length The number of bytes to mask.
	 * @public
	 */
	function _mask(source, mask, output, offset, length) {
	  for (let i = 0; i < length; i++) {
	    output[offset + i] = source[i] ^ mask[i & 3];
	  }
	}

	/**
	 * Unmasks a buffer using the given mask.
	 *
	 * @param {Buffer} buffer The buffer to unmask
	 * @param {Buffer} mask The mask to use
	 * @public
	 */
	function _unmask(buffer, mask) {
	  for (let i = 0; i < buffer.length; i++) {
	    buffer[i] ^= mask[i & 3];
	  }
	}

	/**
	 * Converts a buffer to an `ArrayBuffer`.
	 *
	 * @param {Buffer} buf The buffer to convert
	 * @return {ArrayBuffer} Converted buffer
	 * @public
	 */
	function toArrayBuffer(buf) {
	  if (buf.length === buf.buffer.byteLength) {
	    return buf.buffer;
	  }

	  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
	}

	/**
	 * Converts `data` to a `Buffer`.
	 *
	 * @param {*} data The data to convert
	 * @return {Buffer} The buffer
	 * @throws {TypeError}
	 * @public
	 */
	function toBuffer(data) {
	  toBuffer.readOnly = true;

	  if (Buffer.isBuffer(data)) return data;

	  let buf;

	  if (data instanceof ArrayBuffer) {
	    buf = new FastBuffer(data);
	  } else if (ArrayBuffer.isView(data)) {
	    buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
	  } else {
	    buf = Buffer.from(data);
	    toBuffer.readOnly = false;
	  }

	  return buf;
	}

	bufferUtil.exports = {
	  concat,
	  mask: _mask,
	  toArrayBuffer,
	  toBuffer,
	  unmask: _unmask
	};

	/* istanbul ignore else  */
	if (!process.env.WS_NO_BUFFER_UTIL) {
	  try {
	    const bufferUtil$1 = require('bufferutil');

	    bufferUtil.exports.mask = function (source, mask, output, offset, length) {
	      if (length < 48) _mask(source, mask, output, offset, length);
	      else bufferUtil$1.mask(source, mask, output, offset, length);
	    };

	    bufferUtil.exports.unmask = function (buffer, mask) {
	      if (buffer.length < 32) _unmask(buffer, mask);
	      else bufferUtil$1.unmask(buffer, mask);
	    };
	  } catch (e) {
	    // Continue regardless of the error.
	  }
	}
	return bufferUtil.exports;
}

var limiter;
var hasRequiredLimiter;

function requireLimiter () {
	if (hasRequiredLimiter) return limiter;
	hasRequiredLimiter = 1;

	const kDone = Symbol('kDone');
	const kRun = Symbol('kRun');

	/**
	 * A very simple job queue with adjustable concurrency. Adapted from
	 * https://github.com/STRML/async-limiter
	 */
	class Limiter {
	  /**
	   * Creates a new `Limiter`.
	   *
	   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
	   *     to run concurrently
	   */
	  constructor(concurrency) {
	    this[kDone] = () => {
	      this.pending--;
	      this[kRun]();
	    };
	    this.concurrency = concurrency || Infinity;
	    this.jobs = [];
	    this.pending = 0;
	  }

	  /**
	   * Adds a job to the queue.
	   *
	   * @param {Function} job The job to run
	   * @public
	   */
	  add(job) {
	    this.jobs.push(job);
	    this[kRun]();
	  }

	  /**
	   * Removes a job from the queue and runs it if possible.
	   *
	   * @private
	   */
	  [kRun]() {
	    if (this.pending === this.concurrency) return;

	    if (this.jobs.length) {
	      const job = this.jobs.shift();

	      this.pending++;
	      job(this[kDone]);
	    }
	  }
	}

	limiter = Limiter;
	return limiter;
}

var permessageDeflate;
var hasRequiredPermessageDeflate;

function requirePermessageDeflate () {
	if (hasRequiredPermessageDeflate) return permessageDeflate;
	hasRequiredPermessageDeflate = 1;

	const zlib = require$$0;

	const bufferUtil = requireBufferUtil();
	const Limiter = requireLimiter();
	const { kStatusCode } = requireConstants();

	const FastBuffer = Buffer[Symbol.species];
	const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
	const kPerMessageDeflate = Symbol('permessage-deflate');
	const kTotalLength = Symbol('total-length');
	const kCallback = Symbol('callback');
	const kBuffers = Symbol('buffers');
	const kError = Symbol('error');

	//
	// We limit zlib concurrency, which prevents severe memory fragmentation
	// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
	// and https://github.com/websockets/ws/issues/1202
	//
	// Intentionally global; it's the global thread pool that's an issue.
	//
	let zlibLimiter;

	/**
	 * permessage-deflate implementation.
	 */
	class PerMessageDeflate {
	  /**
	   * Creates a PerMessageDeflate instance.
	   *
	   * @param {Object} [options] Configuration options
	   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
	   *     for, or request, a custom client window size
	   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
	   *     acknowledge disabling of client context takeover
	   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
	   *     calls to zlib
	   * @param {Boolean} [options.isServer=false] Create the instance in either
	   *     server or client mode
	   * @param {Number} [options.maxPayload=0] The maximum allowed message length
	   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
	   *     use of a custom server window size
	   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
	   *     disabling of server context takeover
	   * @param {Number} [options.threshold=1024] Size (in bytes) below which
	   *     messages should not be compressed if context takeover is disabled
	   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
	   *     deflate
	   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
	   *     inflate
	   */
	  constructor(options) {
	    this._options = options || {};
	    this._threshold =
	      this._options.threshold !== undefined ? this._options.threshold : 1024;
	    this._maxPayload = this._options.maxPayload | 0;
	    this._isServer = !!this._options.isServer;
	    this._deflate = null;
	    this._inflate = null;

	    this.params = null;

	    if (!zlibLimiter) {
	      const concurrency =
	        this._options.concurrencyLimit !== undefined
	          ? this._options.concurrencyLimit
	          : 10;
	      zlibLimiter = new Limiter(concurrency);
	    }
	  }

	  /**
	   * @type {String}
	   */
	  static get extensionName() {
	    return 'permessage-deflate';
	  }

	  /**
	   * Create an extension negotiation offer.
	   *
	   * @return {Object} Extension parameters
	   * @public
	   */
	  offer() {
	    const params = {};

	    if (this._options.serverNoContextTakeover) {
	      params.server_no_context_takeover = true;
	    }
	    if (this._options.clientNoContextTakeover) {
	      params.client_no_context_takeover = true;
	    }
	    if (this._options.serverMaxWindowBits) {
	      params.server_max_window_bits = this._options.serverMaxWindowBits;
	    }
	    if (this._options.clientMaxWindowBits) {
	      params.client_max_window_bits = this._options.clientMaxWindowBits;
	    } else if (this._options.clientMaxWindowBits == null) {
	      params.client_max_window_bits = true;
	    }

	    return params;
	  }

	  /**
	   * Accept an extension negotiation offer/response.
	   *
	   * @param {Array} configurations The extension negotiation offers/reponse
	   * @return {Object} Accepted configuration
	   * @public
	   */
	  accept(configurations) {
	    configurations = this.normalizeParams(configurations);

	    this.params = this._isServer
	      ? this.acceptAsServer(configurations)
	      : this.acceptAsClient(configurations);

	    return this.params;
	  }

	  /**
	   * Releases all resources used by the extension.
	   *
	   * @public
	   */
	  cleanup() {
	    if (this._inflate) {
	      this._inflate.close();
	      this._inflate = null;
	    }

	    if (this._deflate) {
	      const callback = this._deflate[kCallback];

	      this._deflate.close();
	      this._deflate = null;

	      if (callback) {
	        callback(
	          new Error(
	            'The deflate stream was closed while data was being processed'
	          )
	        );
	      }
	    }
	  }

	  /**
	   *  Accept an extension negotiation offer.
	   *
	   * @param {Array} offers The extension negotiation offers
	   * @return {Object} Accepted configuration
	   * @private
	   */
	  acceptAsServer(offers) {
	    const opts = this._options;
	    const accepted = offers.find((params) => {
	      if (
	        (opts.serverNoContextTakeover === false &&
	          params.server_no_context_takeover) ||
	        (params.server_max_window_bits &&
	          (opts.serverMaxWindowBits === false ||
	            (typeof opts.serverMaxWindowBits === 'number' &&
	              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
	        (typeof opts.clientMaxWindowBits === 'number' &&
	          (typeof params.client_max_window_bits === 'number'
	            ? opts.clientMaxWindowBits > params.client_max_window_bits
	            : !params.client_max_window_bits))
	      ) {
	        return false;
	      }

	      return true;
	    });

	    if (!accepted) {
	      throw new Error('None of the extension offers can be accepted');
	    }

	    if (opts.serverNoContextTakeover) {
	      accepted.server_no_context_takeover = true;
	    }
	    if (opts.clientNoContextTakeover) {
	      accepted.client_no_context_takeover = true;
	    }
	    if (typeof opts.serverMaxWindowBits === 'number') {
	      accepted.server_max_window_bits = opts.serverMaxWindowBits;
	    }
	    if (typeof opts.clientMaxWindowBits === 'number') {
	      accepted.client_max_window_bits = opts.clientMaxWindowBits;
	    } else if (
	      accepted.client_max_window_bits === true ||
	      opts.clientMaxWindowBits === false
	    ) {
	      delete accepted.client_max_window_bits;
	    }

	    return accepted;
	  }

	  /**
	   * Accept the extension negotiation response.
	   *
	   * @param {Array} response The extension negotiation response
	   * @return {Object} Accepted configuration
	   * @private
	   */
	  acceptAsClient(response) {
	    const params = response[0];

	    if (
	      this._options.clientNoContextTakeover === false &&
	      params.client_no_context_takeover
	    ) {
	      throw new Error('Unexpected parameter "client_no_context_takeover"');
	    }

	    if (!params.client_max_window_bits) {
	      if (typeof this._options.clientMaxWindowBits === 'number') {
	        params.client_max_window_bits = this._options.clientMaxWindowBits;
	      }
	    } else if (
	      this._options.clientMaxWindowBits === false ||
	      (typeof this._options.clientMaxWindowBits === 'number' &&
	        params.client_max_window_bits > this._options.clientMaxWindowBits)
	    ) {
	      throw new Error(
	        'Unexpected or invalid parameter "client_max_window_bits"'
	      );
	    }

	    return params;
	  }

	  /**
	   * Normalize parameters.
	   *
	   * @param {Array} configurations The extension negotiation offers/reponse
	   * @return {Array} The offers/response with normalized parameters
	   * @private
	   */
	  normalizeParams(configurations) {
	    configurations.forEach((params) => {
	      Object.keys(params).forEach((key) => {
	        let value = params[key];

	        if (value.length > 1) {
	          throw new Error(`Parameter "${key}" must have only a single value`);
	        }

	        value = value[0];

	        if (key === 'client_max_window_bits') {
	          if (value !== true) {
	            const num = +value;
	            if (!Number.isInteger(num) || num < 8 || num > 15) {
	              throw new TypeError(
	                `Invalid value for parameter "${key}": ${value}`
	              );
	            }
	            value = num;
	          } else if (!this._isServer) {
	            throw new TypeError(
	              `Invalid value for parameter "${key}": ${value}`
	            );
	          }
	        } else if (key === 'server_max_window_bits') {
	          const num = +value;
	          if (!Number.isInteger(num) || num < 8 || num > 15) {
	            throw new TypeError(
	              `Invalid value for parameter "${key}": ${value}`
	            );
	          }
	          value = num;
	        } else if (
	          key === 'client_no_context_takeover' ||
	          key === 'server_no_context_takeover'
	        ) {
	          if (value !== true) {
	            throw new TypeError(
	              `Invalid value for parameter "${key}": ${value}`
	            );
	          }
	        } else {
	          throw new Error(`Unknown parameter "${key}"`);
	        }

	        params[key] = value;
	      });
	    });

	    return configurations;
	  }

	  /**
	   * Decompress data. Concurrency limited.
	   *
	   * @param {Buffer} data Compressed data
	   * @param {Boolean} fin Specifies whether or not this is the last fragment
	   * @param {Function} callback Callback
	   * @public
	   */
	  decompress(data, fin, callback) {
	    zlibLimiter.add((done) => {
	      this._decompress(data, fin, (err, result) => {
	        done();
	        callback(err, result);
	      });
	    });
	  }

	  /**
	   * Compress data. Concurrency limited.
	   *
	   * @param {(Buffer|String)} data Data to compress
	   * @param {Boolean} fin Specifies whether or not this is the last fragment
	   * @param {Function} callback Callback
	   * @public
	   */
	  compress(data, fin, callback) {
	    zlibLimiter.add((done) => {
	      this._compress(data, fin, (err, result) => {
	        done();
	        callback(err, result);
	      });
	    });
	  }

	  /**
	   * Decompress data.
	   *
	   * @param {Buffer} data Compressed data
	   * @param {Boolean} fin Specifies whether or not this is the last fragment
	   * @param {Function} callback Callback
	   * @private
	   */
	  _decompress(data, fin, callback) {
	    const endpoint = this._isServer ? 'client' : 'server';

	    if (!this._inflate) {
	      const key = `${endpoint}_max_window_bits`;
	      const windowBits =
	        typeof this.params[key] !== 'number'
	          ? zlib.Z_DEFAULT_WINDOWBITS
	          : this.params[key];

	      this._inflate = zlib.createInflateRaw({
	        ...this._options.zlibInflateOptions,
	        windowBits
	      });
	      this._inflate[kPerMessageDeflate] = this;
	      this._inflate[kTotalLength] = 0;
	      this._inflate[kBuffers] = [];
	      this._inflate.on('error', inflateOnError);
	      this._inflate.on('data', inflateOnData);
	    }

	    this._inflate[kCallback] = callback;

	    this._inflate.write(data);
	    if (fin) this._inflate.write(TRAILER);

	    this._inflate.flush(() => {
	      const err = this._inflate[kError];

	      if (err) {
	        this._inflate.close();
	        this._inflate = null;
	        callback(err);
	        return;
	      }

	      const data = bufferUtil.concat(
	        this._inflate[kBuffers],
	        this._inflate[kTotalLength]
	      );

	      if (this._inflate._readableState.endEmitted) {
	        this._inflate.close();
	        this._inflate = null;
	      } else {
	        this._inflate[kTotalLength] = 0;
	        this._inflate[kBuffers] = [];

	        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
	          this._inflate.reset();
	        }
	      }

	      callback(null, data);
	    });
	  }

	  /**
	   * Compress data.
	   *
	   * @param {(Buffer|String)} data Data to compress
	   * @param {Boolean} fin Specifies whether or not this is the last fragment
	   * @param {Function} callback Callback
	   * @private
	   */
	  _compress(data, fin, callback) {
	    const endpoint = this._isServer ? 'server' : 'client';

	    if (!this._deflate) {
	      const key = `${endpoint}_max_window_bits`;
	      const windowBits =
	        typeof this.params[key] !== 'number'
	          ? zlib.Z_DEFAULT_WINDOWBITS
	          : this.params[key];

	      this._deflate = zlib.createDeflateRaw({
	        ...this._options.zlibDeflateOptions,
	        windowBits
	      });

	      this._deflate[kTotalLength] = 0;
	      this._deflate[kBuffers] = [];

	      this._deflate.on('data', deflateOnData);
	    }

	    this._deflate[kCallback] = callback;

	    this._deflate.write(data);
	    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
	      if (!this._deflate) {
	        //
	        // The deflate stream was closed while data was being processed.
	        //
	        return;
	      }

	      let data = bufferUtil.concat(
	        this._deflate[kBuffers],
	        this._deflate[kTotalLength]
	      );

	      if (fin) {
	        data = new FastBuffer(data.buffer, data.byteOffset, data.length - 4);
	      }

	      //
	      // Ensure that the callback will not be called again in
	      // `PerMessageDeflate#cleanup()`.
	      //
	      this._deflate[kCallback] = null;

	      this._deflate[kTotalLength] = 0;
	      this._deflate[kBuffers] = [];

	      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
	        this._deflate.reset();
	      }

	      callback(null, data);
	    });
	  }
	}

	permessageDeflate = PerMessageDeflate;

	/**
	 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
	 *
	 * @param {Buffer} chunk A chunk of data
	 * @private
	 */
	function deflateOnData(chunk) {
	  this[kBuffers].push(chunk);
	  this[kTotalLength] += chunk.length;
	}

	/**
	 * The listener of the `zlib.InflateRaw` stream `'data'` event.
	 *
	 * @param {Buffer} chunk A chunk of data
	 * @private
	 */
	function inflateOnData(chunk) {
	  this[kTotalLength] += chunk.length;

	  if (
	    this[kPerMessageDeflate]._maxPayload < 1 ||
	    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
	  ) {
	    this[kBuffers].push(chunk);
	    return;
	  }

	  this[kError] = new RangeError('Max payload size exceeded');
	  this[kError].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
	  this[kError][kStatusCode] = 1009;
	  this.removeListener('data', inflateOnData);

	  //
	  // The choice to employ `zlib.reset()` over `zlib.close()` is dictated by the
	  // fact that in Node.js versions prior to 13.10.0, the callback for
	  // `zlib.flush()` is not called if `zlib.close()` is used. Utilizing
	  // `zlib.reset()` ensures that either the callback is invoked or an error is
	  // emitted.
	  //
	  this.reset();
	}

	/**
	 * The listener of the `zlib.InflateRaw` stream `'error'` event.
	 *
	 * @param {Error} err The emitted error
	 * @private
	 */
	function inflateOnError(err) {
	  //
	  // There is no need to call `Zlib#close()` as the handle is automatically
	  // closed when an error is emitted.
	  //
	  this[kPerMessageDeflate]._inflate = null;

	  if (this[kError]) {
	    this[kCallback](this[kError]);
	    return;
	  }

	  err[kStatusCode] = 1007;
	  this[kCallback](err);
	}
	return permessageDeflate;
}

var validation = {exports: {}};

var hasRequiredValidation;

function requireValidation () {
	if (hasRequiredValidation) return validation.exports;
	hasRequiredValidation = 1;

	const { isUtf8 } = require$$0$1;

	const { hasBlob } = requireConstants();

	//
	// Allowed token characters:
	//
	// '!', '#', '$', '%', '&', ''', '*', '+', '-',
	// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
	//
	// tokenChars[32] === 0 // ' '
	// tokenChars[33] === 1 // '!'
	// tokenChars[34] === 0 // '"'
	// ...
	//
	// prettier-ignore
	const tokenChars = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
	  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
	  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
	];

	/**
	 * Checks if a status code is allowed in a close frame.
	 *
	 * @param {Number} code The status code
	 * @return {Boolean} `true` if the status code is valid, else `false`
	 * @public
	 */
	function isValidStatusCode(code) {
	  return (
	    (code >= 1000 &&
	      code <= 1014 &&
	      code !== 1004 &&
	      code !== 1005 &&
	      code !== 1006) ||
	    (code >= 3000 && code <= 4999)
	  );
	}

	/**
	 * Checks if a given buffer contains only correct UTF-8.
	 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
	 * Markus Kuhn.
	 *
	 * @param {Buffer} buf The buffer to check
	 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
	 * @public
	 */
	function _isValidUTF8(buf) {
	  const len = buf.length;
	  let i = 0;

	  while (i < len) {
	    if ((buf[i] & 0x80) === 0) {
	      // 0xxxxxxx
	      i++;
	    } else if ((buf[i] & 0xe0) === 0xc0) {
	      // 110xxxxx 10xxxxxx
	      if (
	        i + 1 === len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i] & 0xfe) === 0xc0 // Overlong
	      ) {
	        return false;
	      }

	      i += 2;
	    } else if ((buf[i] & 0xf0) === 0xe0) {
	      // 1110xxxx 10xxxxxx 10xxxxxx
	      if (
	        i + 2 >= len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i + 2] & 0xc0) !== 0x80 ||
	        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
	        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
	      ) {
	        return false;
	      }

	      i += 3;
	    } else if ((buf[i] & 0xf8) === 0xf0) {
	      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
	      if (
	        i + 3 >= len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i + 2] & 0xc0) !== 0x80 ||
	        (buf[i + 3] & 0xc0) !== 0x80 ||
	        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
	        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
	        buf[i] > 0xf4 // > U+10FFFF
	      ) {
	        return false;
	      }

	      i += 4;
	    } else {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * Determines whether a value is a `Blob`.
	 *
	 * @param {*} value The value to be tested
	 * @return {Boolean} `true` if `value` is a `Blob`, else `false`
	 * @private
	 */
	function isBlob(value) {
	  return (
	    hasBlob &&
	    typeof value === 'object' &&
	    typeof value.arrayBuffer === 'function' &&
	    typeof value.type === 'string' &&
	    typeof value.stream === 'function' &&
	    (value[Symbol.toStringTag] === 'Blob' ||
	      value[Symbol.toStringTag] === 'File')
	  );
	}

	validation.exports = {
	  isBlob,
	  isValidStatusCode,
	  isValidUTF8: _isValidUTF8,
	  tokenChars
	};

	if (isUtf8) {
	  validation.exports.isValidUTF8 = function (buf) {
	    return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
	  };
	} /* istanbul ignore else  */ else if (!process.env.WS_NO_UTF_8_VALIDATE) {
	  try {
	    const isValidUTF8 = require('utf-8-validate');

	    validation.exports.isValidUTF8 = function (buf) {
	      return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
	    };
	  } catch (e) {
	    // Continue regardless of the error.
	  }
	}
	return validation.exports;
}

var receiver;
var hasRequiredReceiver;

function requireReceiver () {
	if (hasRequiredReceiver) return receiver;
	hasRequiredReceiver = 1;

	const { Writable } = require$$0$2;

	const PerMessageDeflate = requirePermessageDeflate();
	const {
	  BINARY_TYPES,
	  EMPTY_BUFFER,
	  kStatusCode,
	  kWebSocket
	} = requireConstants();
	const { concat, toArrayBuffer, unmask } = requireBufferUtil();
	const { isValidStatusCode, isValidUTF8 } = requireValidation();

	const FastBuffer = Buffer[Symbol.species];

	const GET_INFO = 0;
	const GET_PAYLOAD_LENGTH_16 = 1;
	const GET_PAYLOAD_LENGTH_64 = 2;
	const GET_MASK = 3;
	const GET_DATA = 4;
	const INFLATING = 5;
	const DEFER_EVENT = 6;

	/**
	 * HyBi Receiver implementation.
	 *
	 * @extends Writable
	 */
	class Receiver extends Writable {
	  /**
	   * Creates a Receiver instance.
	   *
	   * @param {Object} [options] Options object
	   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
	   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
	   *     multiple times in the same tick
	   * @param {String} [options.binaryType=nodebuffer] The type for binary data
	   * @param {Object} [options.extensions] An object containing the negotiated
	   *     extensions
	   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
	   *     client or server mode
	   * @param {Number} [options.maxBufferedChunks=0] The maximum number of
	   *     buffered data chunks
	   * @param {Number} [options.maxFragments=0] The maximum number of message
	   *     fragments
	   * @param {Number} [options.maxPayload=0] The maximum allowed message length
	   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
	   *     not to skip UTF-8 validation for text and close messages
	   */
	  constructor(options = {}) {
	    super();

	    this._allowSynchronousEvents =
	      options.allowSynchronousEvents !== undefined
	        ? options.allowSynchronousEvents
	        : true;
	    this._binaryType = options.binaryType || BINARY_TYPES[0];
	    this._extensions = options.extensions || {};
	    this._isServer = !!options.isServer;
	    this._maxBufferedChunks = options.maxBufferedChunks | 0;
	    this._maxFragments = options.maxFragments | 0;
	    this._maxPayload = options.maxPayload | 0;
	    this._skipUTF8Validation = !!options.skipUTF8Validation;
	    this[kWebSocket] = undefined;

	    this._bufferedBytes = 0;
	    this._buffers = [];

	    this._compressed = false;
	    this._payloadLength = 0;
	    this._mask = undefined;
	    this._fragmented = 0;
	    this._masked = false;
	    this._fin = false;
	    this._opcode = 0;

	    this._totalPayloadLength = 0;
	    this._messageLength = 0;
	    this._numFragments = 0;
	    this._fragments = [];

	    this._errored = false;
	    this._loop = false;
	    this._state = GET_INFO;
	  }

	  /**
	   * Implements `Writable.prototype._write()`.
	   *
	   * @param {Buffer} chunk The chunk of data to write
	   * @param {String} encoding The character encoding of `chunk`
	   * @param {Function} cb Callback
	   * @private
	   */
	  _write(chunk, encoding, cb) {
	    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

	    if (
	      this._maxBufferedChunks > 0 &&
	      this._buffers.length >= this._maxBufferedChunks
	    ) {
	      cb(
	        this.createError(
	          RangeError,
	          'Too many buffered chunks',
	          false,
	          1008,
	          'WS_ERR_TOO_MANY_BUFFERED_PARTS'
	        )
	      );
	      return;
	    }

	    this._bufferedBytes += chunk.length;
	    this._buffers.push(chunk);
	    this.startLoop(cb);
	  }

	  /**
	   * Consumes `n` bytes from the buffered data.
	   *
	   * @param {Number} n The number of bytes to consume
	   * @return {Buffer} The consumed bytes
	   * @private
	   */
	  consume(n) {
	    this._bufferedBytes -= n;

	    if (n === this._buffers[0].length) return this._buffers.shift();

	    if (n < this._buffers[0].length) {
	      const buf = this._buffers[0];
	      this._buffers[0] = new FastBuffer(
	        buf.buffer,
	        buf.byteOffset + n,
	        buf.length - n
	      );

	      return new FastBuffer(buf.buffer, buf.byteOffset, n);
	    }

	    const dst = Buffer.allocUnsafe(n);

	    do {
	      const buf = this._buffers[0];
	      const offset = dst.length - n;

	      if (n >= buf.length) {
	        dst.set(this._buffers.shift(), offset);
	      } else {
	        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
	        this._buffers[0] = new FastBuffer(
	          buf.buffer,
	          buf.byteOffset + n,
	          buf.length - n
	        );
	      }

	      n -= buf.length;
	    } while (n > 0);

	    return dst;
	  }

	  /**
	   * Starts the parsing loop.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  startLoop(cb) {
	    this._loop = true;

	    do {
	      switch (this._state) {
	        case GET_INFO:
	          this.getInfo(cb);
	          break;
	        case GET_PAYLOAD_LENGTH_16:
	          this.getPayloadLength16(cb);
	          break;
	        case GET_PAYLOAD_LENGTH_64:
	          this.getPayloadLength64(cb);
	          break;
	        case GET_MASK:
	          this.getMask();
	          break;
	        case GET_DATA:
	          this.getData(cb);
	          break;
	        case INFLATING:
	        case DEFER_EVENT:
	          this._loop = false;
	          return;
	      }
	    } while (this._loop);

	    if (!this._errored) cb();
	  }

	  /**
	   * Reads the first two bytes of a frame.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  getInfo(cb) {
	    if (this._bufferedBytes < 2) {
	      this._loop = false;
	      return;
	    }

	    const buf = this.consume(2);

	    if ((buf[0] & 0x30) !== 0x00) {
	      const error = this.createError(
	        RangeError,
	        'RSV2 and RSV3 must be clear',
	        true,
	        1002,
	        'WS_ERR_UNEXPECTED_RSV_2_3'
	      );

	      cb(error);
	      return;
	    }

	    const compressed = (buf[0] & 0x40) === 0x40;

	    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
	      const error = this.createError(
	        RangeError,
	        'RSV1 must be clear',
	        true,
	        1002,
	        'WS_ERR_UNEXPECTED_RSV_1'
	      );

	      cb(error);
	      return;
	    }

	    this._fin = (buf[0] & 0x80) === 0x80;
	    this._opcode = buf[0] & 0x0f;
	    this._payloadLength = buf[1] & 0x7f;

	    if (this._opcode === 0x00) {
	      if (compressed) {
	        const error = this.createError(
	          RangeError,
	          'RSV1 must be clear',
	          true,
	          1002,
	          'WS_ERR_UNEXPECTED_RSV_1'
	        );

	        cb(error);
	        return;
	      }

	      if (!this._fragmented) {
	        const error = this.createError(
	          RangeError,
	          'invalid opcode 0',
	          true,
	          1002,
	          'WS_ERR_INVALID_OPCODE'
	        );

	        cb(error);
	        return;
	      }

	      this._opcode = this._fragmented;
	    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
	      if (this._fragmented) {
	        const error = this.createError(
	          RangeError,
	          `invalid opcode ${this._opcode}`,
	          true,
	          1002,
	          'WS_ERR_INVALID_OPCODE'
	        );

	        cb(error);
	        return;
	      }

	      this._compressed = compressed;
	    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
	      if (!this._fin) {
	        const error = this.createError(
	          RangeError,
	          'FIN must be set',
	          true,
	          1002,
	          'WS_ERR_EXPECTED_FIN'
	        );

	        cb(error);
	        return;
	      }

	      if (compressed) {
	        const error = this.createError(
	          RangeError,
	          'RSV1 must be clear',
	          true,
	          1002,
	          'WS_ERR_UNEXPECTED_RSV_1'
	        );

	        cb(error);
	        return;
	      }

	      if (
	        this._payloadLength > 0x7d ||
	        (this._opcode === 0x08 && this._payloadLength === 1)
	      ) {
	        const error = this.createError(
	          RangeError,
	          `invalid payload length ${this._payloadLength}`,
	          true,
	          1002,
	          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
	        );

	        cb(error);
	        return;
	      }
	    } else {
	      const error = this.createError(
	        RangeError,
	        `invalid opcode ${this._opcode}`,
	        true,
	        1002,
	        'WS_ERR_INVALID_OPCODE'
	      );

	      cb(error);
	      return;
	    }

	    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
	    this._masked = (buf[1] & 0x80) === 0x80;

	    if (this._isServer) {
	      if (!this._masked) {
	        const error = this.createError(
	          RangeError,
	          'MASK must be set',
	          true,
	          1002,
	          'WS_ERR_EXPECTED_MASK'
	        );

	        cb(error);
	        return;
	      }
	    } else if (this._masked) {
	      const error = this.createError(
	        RangeError,
	        'MASK must be clear',
	        true,
	        1002,
	        'WS_ERR_UNEXPECTED_MASK'
	      );

	      cb(error);
	      return;
	    }

	    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
	    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
	    else this.haveLength(cb);
	  }

	  /**
	   * Gets extended payload length (7+16).
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  getPayloadLength16(cb) {
	    if (this._bufferedBytes < 2) {
	      this._loop = false;
	      return;
	    }

	    this._payloadLength = this.consume(2).readUInt16BE(0);
	    this.haveLength(cb);
	  }

	  /**
	   * Gets extended payload length (7+64).
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  getPayloadLength64(cb) {
	    if (this._bufferedBytes < 8) {
	      this._loop = false;
	      return;
	    }

	    const buf = this.consume(8);
	    const num = buf.readUInt32BE(0);

	    //
	    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
	    // if payload length is greater than this number.
	    //
	    if (num > Math.pow(2, 53 - 32) - 1) {
	      const error = this.createError(
	        RangeError,
	        'Unsupported WebSocket frame: payload length > 2^53 - 1',
	        false,
	        1009,
	        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
	      );

	      cb(error);
	      return;
	    }

	    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
	    this.haveLength(cb);
	  }

	  /**
	   * Payload length has been read.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  haveLength(cb) {
	    if (this._payloadLength && this._opcode < 0x08) {
	      this._totalPayloadLength += this._payloadLength;
	      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
	        const error = this.createError(
	          RangeError,
	          'Max payload size exceeded',
	          false,
	          1009,
	          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
	        );

	        cb(error);
	        return;
	      }
	    }

	    if (this._masked) this._state = GET_MASK;
	    else this._state = GET_DATA;
	  }

	  /**
	   * Reads mask bytes.
	   *
	   * @private
	   */
	  getMask() {
	    if (this._bufferedBytes < 4) {
	      this._loop = false;
	      return;
	    }

	    this._mask = this.consume(4);
	    this._state = GET_DATA;
	  }

	  /**
	   * Reads data bytes.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  getData(cb) {
	    let data = EMPTY_BUFFER;

	    if (this._payloadLength) {
	      if (this._bufferedBytes < this._payloadLength) {
	        this._loop = false;
	        return;
	      }

	      data = this.consume(this._payloadLength);

	      if (
	        this._masked &&
	        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
	      ) {
	        unmask(data, this._mask);
	      }
	    }

	    if (this._opcode > 0x07) {
	      this.controlMessage(data, cb);
	      return;
	    }

	    if (this._maxFragments > 0 && ++this._numFragments > this._maxFragments) {
	      const error = this.createError(
	        RangeError,
	        'Too many message fragments',
	        false,
	        1008,
	        'WS_ERR_TOO_MANY_BUFFERED_PARTS'
	      );

	      cb(error);
	      return;
	    }

	    if (this._compressed) {
	      this._state = INFLATING;
	      this.decompress(data, cb);
	      return;
	    }

	    if (data.length) {
	      //
	      // This message is not compressed so its length is the sum of the payload
	      // length of all fragments.
	      //
	      this._messageLength = this._totalPayloadLength;
	      this._fragments.push(data);
	    }

	    this.dataMessage(cb);
	  }

	  /**
	   * Decompresses data.
	   *
	   * @param {Buffer} data Compressed data
	   * @param {Function} cb Callback
	   * @private
	   */
	  decompress(data, cb) {
	    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

	    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
	      if (err) return cb(err);

	      if (buf.length) {
	        this._messageLength += buf.length;
	        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
	          const error = this.createError(
	            RangeError,
	            'Max payload size exceeded',
	            false,
	            1009,
	            'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
	          );

	          cb(error);
	          return;
	        }

	        this._fragments.push(buf);
	      }

	      this.dataMessage(cb);
	      if (this._state === GET_INFO) this.startLoop(cb);
	    });
	  }

	  /**
	   * Handles a data message.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  dataMessage(cb) {
	    if (!this._fin) {
	      this._state = GET_INFO;
	      return;
	    }

	    const messageLength = this._messageLength;
	    const fragments = this._fragments;

	    this._totalPayloadLength = 0;
	    this._messageLength = 0;
	    this._fragmented = 0;
	    this._numFragments = 0;
	    this._fragments = [];

	    if (this._opcode === 2) {
	      let data;

	      if (this._binaryType === 'nodebuffer') {
	        data = concat(fragments, messageLength);
	      } else if (this._binaryType === 'arraybuffer') {
	        data = toArrayBuffer(concat(fragments, messageLength));
	      } else if (this._binaryType === 'blob') {
	        data = new Blob(fragments);
	      } else {
	        data = fragments;
	      }

	      if (this._allowSynchronousEvents) {
	        this.emit('message', data, true);
	        this._state = GET_INFO;
	      } else {
	        this._state = DEFER_EVENT;
	        setImmediate(() => {
	          this.emit('message', data, true);
	          this._state = GET_INFO;
	          this.startLoop(cb);
	        });
	      }
	    } else {
	      const buf = concat(fragments, messageLength);

	      if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
	        const error = this.createError(
	          Error,
	          'invalid UTF-8 sequence',
	          true,
	          1007,
	          'WS_ERR_INVALID_UTF8'
	        );

	        cb(error);
	        return;
	      }

	      if (this._state === INFLATING || this._allowSynchronousEvents) {
	        this.emit('message', buf, false);
	        this._state = GET_INFO;
	      } else {
	        this._state = DEFER_EVENT;
	        setImmediate(() => {
	          this.emit('message', buf, false);
	          this._state = GET_INFO;
	          this.startLoop(cb);
	        });
	      }
	    }
	  }

	  /**
	   * Handles a control message.
	   *
	   * @param {Buffer} data Data to handle
	   * @return {(Error|RangeError|undefined)} A possible error
	   * @private
	   */
	  controlMessage(data, cb) {
	    if (this._opcode === 0x08) {
	      if (data.length === 0) {
	        this._loop = false;
	        this.emit('conclude', 1005, EMPTY_BUFFER);
	        this.end();
	      } else {
	        const code = data.readUInt16BE(0);

	        if (!isValidStatusCode(code)) {
	          const error = this.createError(
	            RangeError,
	            `invalid status code ${code}`,
	            true,
	            1002,
	            'WS_ERR_INVALID_CLOSE_CODE'
	          );

	          cb(error);
	          return;
	        }

	        const buf = new FastBuffer(
	          data.buffer,
	          data.byteOffset + 2,
	          data.length - 2
	        );

	        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
	          const error = this.createError(
	            Error,
	            'invalid UTF-8 sequence',
	            true,
	            1007,
	            'WS_ERR_INVALID_UTF8'
	          );

	          cb(error);
	          return;
	        }

	        this._loop = false;
	        this.emit('conclude', code, buf);
	        this.end();
	      }

	      this._state = GET_INFO;
	      return;
	    }

	    if (this._allowSynchronousEvents) {
	      this.emit(this._opcode === 0x09 ? 'ping' : 'pong', data);
	      this._state = GET_INFO;
	    } else {
	      this._state = DEFER_EVENT;
	      setImmediate(() => {
	        this.emit(this._opcode === 0x09 ? 'ping' : 'pong', data);
	        this._state = GET_INFO;
	        this.startLoop(cb);
	      });
	    }
	  }

	  /**
	   * Builds an error object.
	   *
	   * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
	   * @param {String} message The error message
	   * @param {Boolean} prefix Specifies whether or not to add a default prefix to
	   *     `message`
	   * @param {Number} statusCode The status code
	   * @param {String} errorCode The exposed error code
	   * @return {(Error|RangeError)} The error
	   * @private
	   */
	  createError(ErrorCtor, message, prefix, statusCode, errorCode) {
	    this._loop = false;
	    this._errored = true;

	    const err = new ErrorCtor(
	      prefix ? `Invalid WebSocket frame: ${message}` : message
	    );

	    Error.captureStackTrace(err, this.createError);
	    err.code = errorCode;
	    err[kStatusCode] = statusCode;
	    return err;
	  }
	}

	receiver = Receiver;
	return receiver;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex" }] */

var sender;
var hasRequiredSender;

function requireSender () {
	if (hasRequiredSender) return sender;
	hasRequiredSender = 1;

	const { Duplex } = require$$0$2;
	const { randomFillSync } = require$$1;
	const {
	  types: { isUint8Array }
	} = require$$2;

	const PerMessageDeflate = requirePermessageDeflate();
	const { EMPTY_BUFFER, kWebSocket, NOOP } = requireConstants();
	const { isBlob, isValidStatusCode } = requireValidation();
	const { mask: applyMask, toBuffer } = requireBufferUtil();

	const kByteLength = Symbol('kByteLength');
	const maskBuffer = Buffer.alloc(4);
	const RANDOM_POOL_SIZE = 8 * 1024;
	let randomPool;
	let randomPoolPointer = RANDOM_POOL_SIZE;

	const DEFAULT = 0;
	const DEFLATING = 1;
	const GET_BLOB_DATA = 2;

	/**
	 * HyBi Sender implementation.
	 */
	class Sender {
	  /**
	   * Creates a Sender instance.
	   *
	   * @param {Duplex} socket The connection socket
	   * @param {Object} [extensions] An object containing the negotiated extensions
	   * @param {Function} [generateMask] The function used to generate the masking
	   *     key
	   */
	  constructor(socket, extensions, generateMask) {
	    this._extensions = extensions || {};

	    if (generateMask) {
	      this._generateMask = generateMask;
	      this._maskBuffer = Buffer.alloc(4);
	    }

	    this._socket = socket;

	    this._firstFragment = true;
	    this._compress = false;

	    this._bufferedBytes = 0;
	    this._queue = [];
	    this._state = DEFAULT;
	    this.onerror = NOOP;
	    this[kWebSocket] = undefined;
	  }

	  /**
	   * Frames a piece of data according to the HyBi WebSocket protocol.
	   *
	   * @param {(Buffer|String)} data The data to frame
	   * @param {Object} options Options object
	   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
	   *     FIN bit
	   * @param {Function} [options.generateMask] The function used to generate the
	   *     masking key
	   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
	   *     `data`
	   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
	   *     key
	   * @param {Number} options.opcode The opcode
	   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
	   *     modified
	   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
	   *     RSV1 bit
	   * @return {(Buffer|String)[]} The framed data
	   * @public
	   */
	  static frame(data, options) {
	    let mask;
	    let merge = false;
	    let offset = 2;
	    let skipMasking = false;

	    if (options.mask) {
	      mask = options.maskBuffer || maskBuffer;

	      if (options.generateMask) {
	        options.generateMask(mask);
	      } else {
	        if (randomPoolPointer === RANDOM_POOL_SIZE) {
	          /* istanbul ignore else  */
	          if (randomPool === undefined) {
	            //
	            // This is lazily initialized because server-sent frames must not
	            // be masked so it may never be used.
	            //
	            randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
	          }

	          randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
	          randomPoolPointer = 0;
	        }

	        mask[0] = randomPool[randomPoolPointer++];
	        mask[1] = randomPool[randomPoolPointer++];
	        mask[2] = randomPool[randomPoolPointer++];
	        mask[3] = randomPool[randomPoolPointer++];
	      }

	      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
	      offset = 6;
	    }

	    let dataLength;

	    if (typeof data === 'string') {
	      if (
	        (!options.mask || skipMasking) &&
	        options[kByteLength] !== undefined
	      ) {
	        dataLength = options[kByteLength];
	      } else {
	        data = Buffer.from(data);
	        dataLength = data.length;
	      }
	    } else {
	      dataLength = data.length;
	      merge = options.mask && options.readOnly && !skipMasking;
	    }

	    let payloadLength = dataLength;

	    if (dataLength >= 65536) {
	      offset += 8;
	      payloadLength = 127;
	    } else if (dataLength > 125) {
	      offset += 2;
	      payloadLength = 126;
	    }

	    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);

	    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
	    if (options.rsv1) target[0] |= 0x40;

	    target[1] = payloadLength;

	    if (payloadLength === 126) {
	      target.writeUInt16BE(dataLength, 2);
	    } else if (payloadLength === 127) {
	      target[2] = target[3] = 0;
	      target.writeUIntBE(dataLength, 4, 6);
	    }

	    if (!options.mask) return [target, data];

	    target[1] |= 0x80;
	    target[offset - 4] = mask[0];
	    target[offset - 3] = mask[1];
	    target[offset - 2] = mask[2];
	    target[offset - 1] = mask[3];

	    if (skipMasking) return [target, data];

	    if (merge) {
	      applyMask(data, mask, target, offset, dataLength);
	      return [target];
	    }

	    applyMask(data, mask, data, 0, dataLength);
	    return [target, data];
	  }

	  /**
	   * Sends a close message to the other peer.
	   *
	   * @param {Number} [code] The status code component of the body
	   * @param {(String|Buffer)} [data] The message component of the body
	   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
	   * @param {Function} [cb] Callback
	   * @public
	   */
	  close(code, data, mask, cb) {
	    let buf;

	    if (code === undefined) {
	      buf = EMPTY_BUFFER;
	    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
	      throw new TypeError('First argument must be a valid error code number');
	    } else if (data === undefined || !data.length) {
	      buf = Buffer.allocUnsafe(2);
	      buf.writeUInt16BE(code, 0);
	    } else {
	      const length = Buffer.byteLength(data);

	      if (length > 123) {
	        throw new RangeError('The message must not be greater than 123 bytes');
	      }

	      buf = Buffer.allocUnsafe(2 + length);
	      buf.writeUInt16BE(code, 0);

	      if (typeof data === 'string') {
	        buf.write(data, 2);
	      } else if (isUint8Array(data)) {
	        buf.set(data, 2);
	      } else {
	        throw new TypeError('Second argument must be a string or a Uint8Array');
	      }
	    }

	    const options = {
	      [kByteLength]: buf.length,
	      fin: true,
	      generateMask: this._generateMask,
	      mask,
	      maskBuffer: this._maskBuffer,
	      opcode: 0x08,
	      readOnly: false,
	      rsv1: false
	    };

	    if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, buf, false, options, cb]);
	    } else {
	      this.sendFrame(Sender.frame(buf, options), cb);
	    }
	  }

	  /**
	   * Sends a ping message to the other peer.
	   *
	   * @param {*} data The message to send
	   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
	   * @param {Function} [cb] Callback
	   * @public
	   */
	  ping(data, mask, cb) {
	    let byteLength;
	    let readOnly;

	    if (typeof data === 'string') {
	      byteLength = Buffer.byteLength(data);
	      readOnly = false;
	    } else if (isBlob(data)) {
	      byteLength = data.size;
	      readOnly = false;
	    } else {
	      data = toBuffer(data);
	      byteLength = data.length;
	      readOnly = toBuffer.readOnly;
	    }

	    if (byteLength > 125) {
	      throw new RangeError('The data size must not be greater than 125 bytes');
	    }

	    const options = {
	      [kByteLength]: byteLength,
	      fin: true,
	      generateMask: this._generateMask,
	      mask,
	      maskBuffer: this._maskBuffer,
	      opcode: 0x09,
	      readOnly,
	      rsv1: false
	    };

	    if (isBlob(data)) {
	      if (this._state !== DEFAULT) {
	        this.enqueue([this.getBlobData, data, false, options, cb]);
	      } else {
	        this.getBlobData(data, false, options, cb);
	      }
	    } else if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, data, false, options, cb]);
	    } else {
	      this.sendFrame(Sender.frame(data, options), cb);
	    }
	  }

	  /**
	   * Sends a pong message to the other peer.
	   *
	   * @param {*} data The message to send
	   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
	   * @param {Function} [cb] Callback
	   * @public
	   */
	  pong(data, mask, cb) {
	    let byteLength;
	    let readOnly;

	    if (typeof data === 'string') {
	      byteLength = Buffer.byteLength(data);
	      readOnly = false;
	    } else if (isBlob(data)) {
	      byteLength = data.size;
	      readOnly = false;
	    } else {
	      data = toBuffer(data);
	      byteLength = data.length;
	      readOnly = toBuffer.readOnly;
	    }

	    if (byteLength > 125) {
	      throw new RangeError('The data size must not be greater than 125 bytes');
	    }

	    const options = {
	      [kByteLength]: byteLength,
	      fin: true,
	      generateMask: this._generateMask,
	      mask,
	      maskBuffer: this._maskBuffer,
	      opcode: 0x0a,
	      readOnly,
	      rsv1: false
	    };

	    if (isBlob(data)) {
	      if (this._state !== DEFAULT) {
	        this.enqueue([this.getBlobData, data, false, options, cb]);
	      } else {
	        this.getBlobData(data, false, options, cb);
	      }
	    } else if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, data, false, options, cb]);
	    } else {
	      this.sendFrame(Sender.frame(data, options), cb);
	    }
	  }

	  /**
	   * Sends a data message to the other peer.
	   *
	   * @param {*} data The message to send
	   * @param {Object} options Options object
	   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
	   *     or text
	   * @param {Boolean} [options.compress=false] Specifies whether or not to
	   *     compress `data`
	   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
	   *     last one
	   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
	   *     `data`
	   * @param {Function} [cb] Callback
	   * @public
	   */
	  send(data, options, cb) {
	    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
	    let opcode = options.binary ? 2 : 1;
	    let rsv1 = options.compress;

	    let byteLength;
	    let readOnly;

	    if (typeof data === 'string') {
	      byteLength = Buffer.byteLength(data);
	      readOnly = false;
	    } else if (isBlob(data)) {
	      byteLength = data.size;
	      readOnly = false;
	    } else {
	      data = toBuffer(data);
	      byteLength = data.length;
	      readOnly = toBuffer.readOnly;
	    }

	    if (this._firstFragment) {
	      this._firstFragment = false;
	      if (
	        rsv1 &&
	        perMessageDeflate &&
	        perMessageDeflate.params[
	          perMessageDeflate._isServer
	            ? 'server_no_context_takeover'
	            : 'client_no_context_takeover'
	        ]
	      ) {
	        rsv1 = byteLength >= perMessageDeflate._threshold;
	      }
	      this._compress = rsv1;
	    } else {
	      rsv1 = false;
	      opcode = 0;
	    }

	    if (options.fin) this._firstFragment = true;

	    const opts = {
	      [kByteLength]: byteLength,
	      fin: options.fin,
	      generateMask: this._generateMask,
	      mask: options.mask,
	      maskBuffer: this._maskBuffer,
	      opcode,
	      readOnly,
	      rsv1
	    };

	    if (isBlob(data)) {
	      if (this._state !== DEFAULT) {
	        this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
	      } else {
	        this.getBlobData(data, this._compress, opts, cb);
	      }
	    } else if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, data, this._compress, opts, cb]);
	    } else {
	      this.dispatch(data, this._compress, opts, cb);
	    }
	  }

	  /**
	   * Gets the contents of a blob as binary data.
	   *
	   * @param {Blob} blob The blob
	   * @param {Boolean} [compress=false] Specifies whether or not to compress
	   *     the data
	   * @param {Object} options Options object
	   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
	   *     FIN bit
	   * @param {Function} [options.generateMask] The function used to generate the
	   *     masking key
	   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
	   *     `data`
	   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
	   *     key
	   * @param {Number} options.opcode The opcode
	   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
	   *     modified
	   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
	   *     RSV1 bit
	   * @param {Function} [cb] Callback
	   * @private
	   */
	  getBlobData(blob, compress, options, cb) {
	    this._bufferedBytes += options[kByteLength];
	    this._state = GET_BLOB_DATA;

	    blob
	      .arrayBuffer()
	      .then((arrayBuffer) => {
	        if (this._socket.destroyed) {
	          const err = new Error(
	            'The socket was closed while the blob was being read'
	          );

	          //
	          // `callCallbacks` is called in the next tick to ensure that errors
	          // that might be thrown in the callbacks behave like errors thrown
	          // outside the promise chain.
	          //
	          process.nextTick(callCallbacks, this, err, cb);
	          return;
	        }

	        this._bufferedBytes -= options[kByteLength];
	        const data = toBuffer(arrayBuffer);

	        if (!compress) {
	          this._state = DEFAULT;
	          this.sendFrame(Sender.frame(data, options), cb);
	          this.dequeue();
	        } else {
	          this.dispatch(data, compress, options, cb);
	        }
	      })
	      .catch((err) => {
	        //
	        // `onError` is called in the next tick for the same reason that
	        // `callCallbacks` above is.
	        //
	        process.nextTick(onError, this, err, cb);
	      });
	  }

	  /**
	   * Dispatches a message.
	   *
	   * @param {(Buffer|String)} data The message to send
	   * @param {Boolean} [compress=false] Specifies whether or not to compress
	   *     `data`
	   * @param {Object} options Options object
	   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
	   *     FIN bit
	   * @param {Function} [options.generateMask] The function used to generate the
	   *     masking key
	   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
	   *     `data`
	   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
	   *     key
	   * @param {Number} options.opcode The opcode
	   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
	   *     modified
	   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
	   *     RSV1 bit
	   * @param {Function} [cb] Callback
	   * @private
	   */
	  dispatch(data, compress, options, cb) {
	    if (!compress) {
	      this.sendFrame(Sender.frame(data, options), cb);
	      return;
	    }

	    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

	    this._bufferedBytes += options[kByteLength];
	    this._state = DEFLATING;
	    perMessageDeflate.compress(data, options.fin, (_, buf) => {
	      if (this._socket.destroyed) {
	        const err = new Error(
	          'The socket was closed while data was being compressed'
	        );

	        callCallbacks(this, err, cb);
	        return;
	      }

	      this._bufferedBytes -= options[kByteLength];
	      this._state = DEFAULT;
	      options.readOnly = false;
	      this.sendFrame(Sender.frame(buf, options), cb);
	      this.dequeue();
	    });
	  }

	  /**
	   * Executes queued send operations.
	   *
	   * @private
	   */
	  dequeue() {
	    while (this._state === DEFAULT && this._queue.length) {
	      const params = this._queue.shift();

	      this._bufferedBytes -= params[3][kByteLength];
	      Reflect.apply(params[0], this, params.slice(1));
	    }
	  }

	  /**
	   * Enqueues a send operation.
	   *
	   * @param {Array} params Send operation parameters.
	   * @private
	   */
	  enqueue(params) {
	    this._bufferedBytes += params[3][kByteLength];
	    this._queue.push(params);
	  }

	  /**
	   * Sends a frame.
	   *
	   * @param {(Buffer | String)[]} list The frame to send
	   * @param {Function} [cb] Callback
	   * @private
	   */
	  sendFrame(list, cb) {
	    if (list.length === 2) {
	      this._socket.cork();
	      this._socket.write(list[0]);
	      this._socket.write(list[1], cb);
	      this._socket.uncork();
	    } else {
	      this._socket.write(list[0], cb);
	    }
	  }
	}

	sender = Sender;

	/**
	 * Calls queued callbacks with an error.
	 *
	 * @param {Sender} sender The `Sender` instance
	 * @param {Error} err The error to call the callbacks with
	 * @param {Function} [cb] The first callback
	 * @private
	 */
	function callCallbacks(sender, err, cb) {
	  if (typeof cb === 'function') cb(err);

	  for (let i = 0; i < sender._queue.length; i++) {
	    const params = sender._queue[i];
	    const callback = params[params.length - 1];

	    if (typeof callback === 'function') callback(err);
	  }
	}

	/**
	 * Handles a `Sender` error.
	 *
	 * @param {Sender} sender The `Sender` instance
	 * @param {Error} err The error
	 * @param {Function} [cb] The first pending callback
	 * @private
	 */
	function onError(sender, err, cb) {
	  callCallbacks(sender, err, cb);
	  sender.onerror(err);
	}
	return sender;
}

var eventTarget;
var hasRequiredEventTarget;

function requireEventTarget () {
	if (hasRequiredEventTarget) return eventTarget;
	hasRequiredEventTarget = 1;

	const { kForOnEventAttribute, kListener } = requireConstants();

	const kCode = Symbol('kCode');
	const kData = Symbol('kData');
	const kError = Symbol('kError');
	const kMessage = Symbol('kMessage');
	const kReason = Symbol('kReason');
	const kTarget = Symbol('kTarget');
	const kType = Symbol('kType');
	const kWasClean = Symbol('kWasClean');

	/**
	 * Class representing an event.
	 */
	class Event {
	  /**
	   * Create a new `Event`.
	   *
	   * @param {String} type The name of the event
	   * @throws {TypeError} If the `type` argument is not specified
	   */
	  constructor(type) {
	    this[kTarget] = null;
	    this[kType] = type;
	  }

	  /**
	   * @type {*}
	   */
	  get target() {
	    return this[kTarget];
	  }

	  /**
	   * @type {String}
	   */
	  get type() {
	    return this[kType];
	  }
	}

	Object.defineProperty(Event.prototype, 'target', { enumerable: true });
	Object.defineProperty(Event.prototype, 'type', { enumerable: true });

	/**
	 * Class representing a close event.
	 *
	 * @extends Event
	 */
	class CloseEvent extends Event {
	  /**
	   * Create a new `CloseEvent`.
	   *
	   * @param {String} type The name of the event
	   * @param {Object} [options] A dictionary object that allows for setting
	   *     attributes via object members of the same name
	   * @param {Number} [options.code=0] The status code explaining why the
	   *     connection was closed
	   * @param {String} [options.reason=''] A human-readable string explaining why
	   *     the connection was closed
	   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
	   *     connection was cleanly closed
	   */
	  constructor(type, options = {}) {
	    super(type);

	    this[kCode] = options.code === undefined ? 0 : options.code;
	    this[kReason] = options.reason === undefined ? '' : options.reason;
	    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
	  }

	  /**
	   * @type {Number}
	   */
	  get code() {
	    return this[kCode];
	  }

	  /**
	   * @type {String}
	   */
	  get reason() {
	    return this[kReason];
	  }

	  /**
	   * @type {Boolean}
	   */
	  get wasClean() {
	    return this[kWasClean];
	  }
	}

	Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true });
	Object.defineProperty(CloseEvent.prototype, 'reason', { enumerable: true });
	Object.defineProperty(CloseEvent.prototype, 'wasClean', { enumerable: true });

	/**
	 * Class representing an error event.
	 *
	 * @extends Event
	 */
	class ErrorEvent extends Event {
	  /**
	   * Create a new `ErrorEvent`.
	   *
	   * @param {String} type The name of the event
	   * @param {Object} [options] A dictionary object that allows for setting
	   *     attributes via object members of the same name
	   * @param {*} [options.error=null] The error that generated this event
	   * @param {String} [options.message=''] The error message
	   */
	  constructor(type, options = {}) {
	    super(type);

	    this[kError] = options.error === undefined ? null : options.error;
	    this[kMessage] = options.message === undefined ? '' : options.message;
	  }

	  /**
	   * @type {*}
	   */
	  get error() {
	    return this[kError];
	  }

	  /**
	   * @type {String}
	   */
	  get message() {
	    return this[kMessage];
	  }
	}

	Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true });
	Object.defineProperty(ErrorEvent.prototype, 'message', { enumerable: true });

	/**
	 * Class representing a message event.
	 *
	 * @extends Event
	 */
	class MessageEvent extends Event {
	  /**
	   * Create a new `MessageEvent`.
	   *
	   * @param {String} type The name of the event
	   * @param {Object} [options] A dictionary object that allows for setting
	   *     attributes via object members of the same name
	   * @param {*} [options.data=null] The message content
	   */
	  constructor(type, options = {}) {
	    super(type);

	    this[kData] = options.data === undefined ? null : options.data;
	  }

	  /**
	   * @type {*}
	   */
	  get data() {
	    return this[kData];
	  }
	}

	Object.defineProperty(MessageEvent.prototype, 'data', { enumerable: true });

	/**
	 * This provides methods for emulating the `EventTarget` interface. It's not
	 * meant to be used directly.
	 *
	 * @mixin
	 */
	const EventTarget = {
	  /**
	   * Register an event listener.
	   *
	   * @param {String} type A string representing the event type to listen for
	   * @param {(Function|Object)} handler The listener to add
	   * @param {Object} [options] An options object specifies characteristics about
	   *     the event listener
	   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
	   *     listener should be invoked at most once after being added. If `true`,
	   *     the listener would be automatically removed when invoked.
	   * @public
	   */
	  addEventListener(type, handler, options = {}) {
	    for (const listener of this.listeners(type)) {
	      if (
	        !options[kForOnEventAttribute] &&
	        listener[kListener] === handler &&
	        !listener[kForOnEventAttribute]
	      ) {
	        return;
	      }
	    }

	    let wrapper;

	    if (type === 'message') {
	      wrapper = function onMessage(data, isBinary) {
	        const event = new MessageEvent('message', {
	          data: isBinary ? data : data.toString()
	        });

	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else if (type === 'close') {
	      wrapper = function onClose(code, message) {
	        const event = new CloseEvent('close', {
	          code,
	          reason: message.toString(),
	          wasClean: this._closeFrameReceived && this._closeFrameSent
	        });

	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else if (type === 'error') {
	      wrapper = function onError(error) {
	        const event = new ErrorEvent('error', {
	          error,
	          message: error.message
	        });

	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else if (type === 'open') {
	      wrapper = function onOpen() {
	        const event = new Event('open');

	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else {
	      return;
	    }

	    wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
	    wrapper[kListener] = handler;

	    if (options.once) {
	      this.once(type, wrapper);
	    } else {
	      this.on(type, wrapper);
	    }
	  },

	  /**
	   * Remove an event listener.
	   *
	   * @param {String} type A string representing the event type to remove
	   * @param {(Function|Object)} handler The listener to remove
	   * @public
	   */
	  removeEventListener(type, handler) {
	    for (const listener of this.listeners(type)) {
	      if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
	        this.removeListener(type, listener);
	        break;
	      }
	    }
	  }
	};

	eventTarget = {
	  CloseEvent,
	  ErrorEvent,
	  Event,
	  EventTarget,
	  MessageEvent
	};

	/**
	 * Call an event listener
	 *
	 * @param {(Function|Object)} listener The listener to call
	 * @param {*} thisArg The value to use as `this`` when calling the listener
	 * @param {Event} event The event to pass to the listener
	 * @private
	 */
	function callListener(listener, thisArg, event) {
	  if (typeof listener === 'object' && listener.handleEvent) {
	    listener.handleEvent.call(listener, event);
	  } else {
	    listener.call(thisArg, event);
	  }
	}
	return eventTarget;
}

var extension;
var hasRequiredExtension;

function requireExtension () {
	if (hasRequiredExtension) return extension;
	hasRequiredExtension = 1;

	const { tokenChars } = requireValidation();

	/**
	 * Adds an offer to the map of extension offers or a parameter to the map of
	 * parameters.
	 *
	 * @param {Object} dest The map of extension offers or parameters
	 * @param {String} name The extension or parameter name
	 * @param {(Object|Boolean|String)} elem The extension parameters or the
	 *     parameter value
	 * @private
	 */
	function push(dest, name, elem) {
	  if (dest[name] === undefined) dest[name] = [elem];
	  else dest[name].push(elem);
	}

	/**
	 * Parses the `Sec-WebSocket-Extensions` header into an object.
	 *
	 * @param {String} header The field value of the header
	 * @return {Object} The parsed object
	 * @public
	 */
	function parse(header) {
	  const offers = Object.create(null);
	  let params = Object.create(null);
	  let mustUnescape = false;
	  let isEscaping = false;
	  let inQuotes = false;
	  let extensionName;
	  let paramName;
	  let start = -1;
	  let code = -1;
	  let end = -1;
	  let i = 0;

	  for (; i < header.length; i++) {
	    code = header.charCodeAt(i);

	    if (extensionName === undefined) {
	      if (end === -1 && tokenChars[code] === 1) {
	        if (start === -1) start = i;
	      } else if (
	        i !== 0 &&
	        (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
	      ) {
	        if (end === -1 && start !== -1) end = i;
	      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
	        if (start === -1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }

	        if (end === -1) end = i;
	        const name = header.slice(start, end);
	        if (code === 0x2c) {
	          push(offers, name, params);
	          params = Object.create(null);
	        } else {
	          extensionName = name;
	        }

	        start = end = -1;
	      } else {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	    } else if (paramName === undefined) {
	      if (end === -1 && tokenChars[code] === 1) {
	        if (start === -1) start = i;
	      } else if (code === 0x20 || code === 0x09) {
	        if (end === -1 && start !== -1) end = i;
	      } else if (code === 0x3b || code === 0x2c) {
	        if (start === -1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }

	        if (end === -1) end = i;
	        push(params, header.slice(start, end), true);
	        if (code === 0x2c) {
	          push(offers, extensionName, params);
	          params = Object.create(null);
	          extensionName = undefined;
	        }

	        start = end = -1;
	      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
	        paramName = header.slice(start, i);
	        start = end = -1;
	      } else {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	    } else {
	      //
	      // The value of a quoted-string after unescaping must conform to the
	      // token ABNF, so only token characters are valid.
	      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
	      //
	      if (isEscaping) {
	        if (tokenChars[code] !== 1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }
	        if (start === -1) start = i;
	        else if (!mustUnescape) mustUnescape = true;
	        isEscaping = false;
	      } else if (inQuotes) {
	        if (tokenChars[code] === 1) {
	          if (start === -1) start = i;
	        } else if (code === 0x22 /* '"' */ && start !== -1) {
	          inQuotes = false;
	          end = i;
	        } else if (code === 0x5c /* '\' */) {
	          isEscaping = true;
	        } else {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }
	      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
	        inQuotes = true;
	      } else if (end === -1 && tokenChars[code] === 1) {
	        if (start === -1) start = i;
	      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
	        if (end === -1) end = i;
	      } else if (code === 0x3b || code === 0x2c) {
	        if (start === -1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }

	        if (end === -1) end = i;
	        let value = header.slice(start, end);
	        if (mustUnescape) {
	          value = value.replace(/\\/g, '');
	          mustUnescape = false;
	        }
	        push(params, paramName, value);
	        if (code === 0x2c) {
	          push(offers, extensionName, params);
	          params = Object.create(null);
	          extensionName = undefined;
	        }

	        paramName = undefined;
	        start = end = -1;
	      } else {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	    }
	  }

	  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
	    throw new SyntaxError('Unexpected end of input');
	  }

	  if (end === -1) end = i;
	  const token = header.slice(start, end);
	  if (extensionName === undefined) {
	    push(offers, token, params);
	  } else {
	    if (paramName === undefined) {
	      push(params, token, true);
	    } else if (mustUnescape) {
	      push(params, paramName, token.replace(/\\/g, ''));
	    } else {
	      push(params, paramName, token);
	    }
	    push(offers, extensionName, params);
	  }

	  return offers;
	}

	/**
	 * Builds the `Sec-WebSocket-Extensions` header field value.
	 *
	 * @param {Object} extensions The map of extensions and parameters to format
	 * @return {String} A string representing the given object
	 * @public
	 */
	function format(extensions) {
	  return Object.keys(extensions)
	    .map((extension) => {
	      let configurations = extensions[extension];
	      if (!Array.isArray(configurations)) configurations = [configurations];
	      return configurations
	        .map((params) => {
	          return [extension]
	            .concat(
	              Object.keys(params).map((k) => {
	                let values = params[k];
	                if (!Array.isArray(values)) values = [values];
	                return values
	                  .map((v) => (v === true ? k : `${k}=${v}`))
	                  .join('; ');
	              })
	            )
	            .join('; ');
	        })
	        .join(', ');
	    })
	    .join(', ');
	}

	extension = { format, parse };
	return extension;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex|Readable$", "caughtErrors": "none" }] */

var websocket;
var hasRequiredWebsocket;

function requireWebsocket () {
	if (hasRequiredWebsocket) return websocket;
	hasRequiredWebsocket = 1;

	const EventEmitter = require$$0$3;
	const https = require$$1$1;
	const http = require$$2$1;
	const net = require$$3;
	const tls = require$$4;
	const { randomBytes, createHash } = require$$1;
	const { Duplex, Readable } = require$$0$2;
	const { URL } = require$$7;

	const PerMessageDeflate = requirePermessageDeflate();
	const Receiver = requireReceiver();
	const Sender = requireSender();
	const { isBlob } = requireValidation();

	const {
	  BINARY_TYPES,
	  CLOSE_TIMEOUT,
	  EMPTY_BUFFER,
	  GUID,
	  kForOnEventAttribute,
	  kListener,
	  kStatusCode,
	  kWebSocket,
	  NOOP
	} = requireConstants();
	const {
	  EventTarget: { addEventListener, removeEventListener }
	} = requireEventTarget();
	const { format, parse } = requireExtension();
	const { toBuffer } = requireBufferUtil();

	const kAborted = Symbol('kAborted');
	const protocolVersions = [8, 13];
	const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
	const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

	/**
	 * Class representing a WebSocket.
	 *
	 * @extends EventEmitter
	 */
	class WebSocket extends EventEmitter {
	  /**
	   * Create a new `WebSocket`.
	   *
	   * @param {(String|URL)} address The URL to which to connect
	   * @param {(String|String[])} [protocols] The subprotocols
	   * @param {Object} [options] Connection options
	   */
	  constructor(address, protocols, options) {
	    super();

	    this._binaryType = BINARY_TYPES[0];
	    this._closeCode = 1006;
	    this._closeFrameReceived = false;
	    this._closeFrameSent = false;
	    this._closeMessage = EMPTY_BUFFER;
	    this._closeTimer = null;
	    this._errorEmitted = false;
	    this._extensions = {};
	    this._paused = false;
	    this._protocol = '';
	    this._readyState = WebSocket.CONNECTING;
	    this._receiver = null;
	    this._sender = null;
	    this._socket = null;

	    if (address !== null) {
	      this._bufferedAmount = 0;
	      this._isServer = false;
	      this._redirects = 0;

	      if (protocols === undefined) {
	        if (!options || options.protocols === undefined) {
	          protocols = [];
	        } else if (Array.isArray(options.protocols)) {
	          protocols = options.protocols;
	        } else {
	          protocols = [options.protocols];
	        }
	      } else if (!Array.isArray(protocols)) {
	        if (typeof protocols === 'object' && protocols !== null) {
	          options = protocols;

	          if (options.protocols === undefined) {
	            protocols = [];
	          } else if (Array.isArray(options.protocols)) {
	            protocols = options.protocols;
	          } else {
	            protocols = [options.protocols];
	          }
	        } else {
	          protocols = [protocols];
	        }
	      }

	      initAsClient(this, address, protocols, options);
	    } else {
	      this._autoPong = options.autoPong;
	      this._closeTimeout = options.closeTimeout;
	      this._isServer = true;
	    }
	  }

	  /**
	   * For historical reasons, the custom "nodebuffer" type is used by the default
	   * instead of "blob".
	   *
	   * @type {String}
	   */
	  get binaryType() {
	    return this._binaryType;
	  }

	  set binaryType(type) {
	    if (!BINARY_TYPES.includes(type)) return;

	    this._binaryType = type;

	    //
	    // Allow to change `binaryType` on the fly.
	    //
	    if (this._receiver) this._receiver._binaryType = type;
	  }

	  /**
	   * @type {Number}
	   */
	  get bufferedAmount() {
	    if (!this._socket) return this._bufferedAmount;

	    return this._socket._writableState.length + this._sender._bufferedBytes;
	  }

	  /**
	   * @type {String}
	   */
	  get extensions() {
	    return Object.keys(this._extensions).join();
	  }

	  /**
	   * @type {Boolean}
	   */
	  get isPaused() {
	    return this._paused;
	  }

	  /**
	   * @type {Function}
	   */
	  /* istanbul ignore next */
	  get onclose() {
	    return null;
	  }

	  /**
	   * @type {Function}
	   */
	  /* istanbul ignore next */
	  get onerror() {
	    return null;
	  }

	  /**
	   * @type {Function}
	   */
	  /* istanbul ignore next */
	  get onopen() {
	    return null;
	  }

	  /**
	   * @type {Function}
	   */
	  /* istanbul ignore next */
	  get onmessage() {
	    return null;
	  }

	  /**
	   * @type {String}
	   */
	  get protocol() {
	    return this._protocol;
	  }

	  /**
	   * @type {Number}
	   */
	  get readyState() {
	    return this._readyState;
	  }

	  /**
	   * @type {String}
	   */
	  get url() {
	    return this._url;
	  }

	  /**
	   * Set up the socket and the internal resources.
	   *
	   * @param {Duplex} socket The network socket between the server and client
	   * @param {Buffer} head The first packet of the upgraded stream
	   * @param {Object} options Options object
	   * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
	   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
	   *     multiple times in the same tick
	   * @param {Function} [options.generateMask] The function used to generate the
	   *     masking key
	   * @param {Number} [options.maxBufferedChunks=0] The maximum number of
	   *     buffered data chunks
	   * @param {Number} [options.maxFragments=0] The maximum number of message
	   *     fragments
	   * @param {Number} [options.maxPayload=0] The maximum allowed message size
	   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
	   *     not to skip UTF-8 validation for text and close messages
	   * @private
	   */
	  setSocket(socket, head, options) {
	    const receiver = new Receiver({
	      allowSynchronousEvents: options.allowSynchronousEvents,
	      binaryType: this.binaryType,
	      extensions: this._extensions,
	      isServer: this._isServer,
	      maxBufferedChunks: options.maxBufferedChunks,
	      maxFragments: options.maxFragments,
	      maxPayload: options.maxPayload,
	      skipUTF8Validation: options.skipUTF8Validation
	    });

	    const sender = new Sender(socket, this._extensions, options.generateMask);

	    this._receiver = receiver;
	    this._sender = sender;
	    this._socket = socket;

	    receiver[kWebSocket] = this;
	    sender[kWebSocket] = this;
	    socket[kWebSocket] = this;

	    receiver.on('conclude', receiverOnConclude);
	    receiver.on('drain', receiverOnDrain);
	    receiver.on('error', receiverOnError);
	    receiver.on('message', receiverOnMessage);
	    receiver.on('ping', receiverOnPing);
	    receiver.on('pong', receiverOnPong);

	    sender.onerror = senderOnError;

	    //
	    // These methods may not be available if `socket` is just a `Duplex`.
	    //
	    if (socket.setTimeout) socket.setTimeout(0);
	    if (socket.setNoDelay) socket.setNoDelay();

	    if (head.length > 0) socket.unshift(head);

	    socket.on('close', socketOnClose);
	    socket.on('data', socketOnData);
	    socket.on('end', socketOnEnd);
	    socket.on('error', socketOnError);

	    this._readyState = WebSocket.OPEN;
	    this.emit('open');
	  }

	  /**
	   * Emit the `'close'` event.
	   *
	   * @private
	   */
	  emitClose() {
	    if (!this._socket) {
	      this._readyState = WebSocket.CLOSED;
	      this.emit('close', this._closeCode, this._closeMessage);
	      return;
	    }

	    if (this._extensions[PerMessageDeflate.extensionName]) {
	      this._extensions[PerMessageDeflate.extensionName].cleanup();
	    }

	    this._receiver.removeAllListeners();
	    this._readyState = WebSocket.CLOSED;
	    this.emit('close', this._closeCode, this._closeMessage);
	  }

	  /**
	   * Start a closing handshake.
	   *
	   *          +----------+   +-----------+   +----------+
	   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
	   *    |     +----------+   +-----------+   +----------+     |
	   *          +----------+   +-----------+         |
	   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
	   *          +----------+   +-----------+   |
	   *    |           |                        |   +---+        |
	   *                +------------------------+-->|fin| - - - -
	   *    |         +---+                      |   +---+
	   *     - - - - -|fin|<---------------------+
	   *              +---+
	   *
	   * @param {Number} [code] Status code explaining why the connection is closing
	   * @param {(String|Buffer)} [data] The reason why the connection is
	   *     closing
	   * @public
	   */
	  close(code, data) {
	    if (this.readyState === WebSocket.CLOSED) return;
	    if (this.readyState === WebSocket.CONNECTING) {
	      const msg = 'WebSocket was closed before the connection was established';
	      abortHandshake(this, this._req, msg);
	      return;
	    }

	    if (this.readyState === WebSocket.CLOSING) {
	      if (
	        this._closeFrameSent &&
	        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
	      ) {
	        this._socket.end();
	      }

	      return;
	    }

	    this._sender.close(code, data, !this._isServer, (err) => {
	      //
	      // This error is handled by the `'error'` listener on the socket. We only
	      // want to know if the close frame has been sent here.
	      //
	      if (err) return;

	      this._closeFrameSent = true;

	      if (
	        this._closeFrameReceived ||
	        this._receiver._writableState.errorEmitted
	      ) {
	        this._socket.end();
	      }
	    });

	    this._readyState = WebSocket.CLOSING;
	    setCloseTimer(this);
	  }

	  /**
	   * Pause the socket.
	   *
	   * @public
	   */
	  pause() {
	    if (
	      this.readyState === WebSocket.CONNECTING ||
	      this.readyState === WebSocket.CLOSED
	    ) {
	      return;
	    }

	    this._paused = true;
	    this._socket.pause();
	  }

	  /**
	   * Send a ping.
	   *
	   * @param {*} [data] The data to send
	   * @param {Boolean} [mask] Indicates whether or not to mask `data`
	   * @param {Function} [cb] Callback which is executed when the ping is sent
	   * @public
	   */
	  ping(data, mask, cb) {
	    if (this.readyState === WebSocket.CONNECTING) {
	      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
	    }

	    if (typeof data === 'function') {
	      cb = data;
	      data = mask = undefined;
	    } else if (typeof mask === 'function') {
	      cb = mask;
	      mask = undefined;
	    }

	    if (typeof data === 'number') data = data.toString();

	    if (this.readyState !== WebSocket.OPEN) {
	      sendAfterClose(this, data, cb);
	      return;
	    }

	    if (mask === undefined) mask = !this._isServer;
	    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
	  }

	  /**
	   * Send a pong.
	   *
	   * @param {*} [data] The data to send
	   * @param {Boolean} [mask] Indicates whether or not to mask `data`
	   * @param {Function} [cb] Callback which is executed when the pong is sent
	   * @public
	   */
	  pong(data, mask, cb) {
	    if (this.readyState === WebSocket.CONNECTING) {
	      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
	    }

	    if (typeof data === 'function') {
	      cb = data;
	      data = mask = undefined;
	    } else if (typeof mask === 'function') {
	      cb = mask;
	      mask = undefined;
	    }

	    if (typeof data === 'number') data = data.toString();

	    if (this.readyState !== WebSocket.OPEN) {
	      sendAfterClose(this, data, cb);
	      return;
	    }

	    if (mask === undefined) mask = !this._isServer;
	    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
	  }

	  /**
	   * Resume the socket.
	   *
	   * @public
	   */
	  resume() {
	    if (
	      this.readyState === WebSocket.CONNECTING ||
	      this.readyState === WebSocket.CLOSED
	    ) {
	      return;
	    }

	    this._paused = false;
	    if (!this._receiver._writableState.needDrain) this._socket.resume();
	  }

	  /**
	   * Send a data message.
	   *
	   * @param {*} data The message to send
	   * @param {Object} [options] Options object
	   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
	   *     text
	   * @param {Boolean} [options.compress] Specifies whether or not to compress
	   *     `data`
	   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
	   *     last one
	   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
	   * @param {Function} [cb] Callback which is executed when data is written out
	   * @public
	   */
	  send(data, options, cb) {
	    if (this.readyState === WebSocket.CONNECTING) {
	      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
	    }

	    if (typeof options === 'function') {
	      cb = options;
	      options = {};
	    }

	    if (typeof data === 'number') data = data.toString();

	    if (this.readyState !== WebSocket.OPEN) {
	      sendAfterClose(this, data, cb);
	      return;
	    }

	    const opts = {
	      binary: typeof data !== 'string',
	      mask: !this._isServer,
	      compress: true,
	      fin: true,
	      ...options
	    };

	    if (!this._extensions[PerMessageDeflate.extensionName]) {
	      opts.compress = false;
	    }

	    this._sender.send(data || EMPTY_BUFFER, opts, cb);
	  }

	  /**
	   * Forcibly close the connection.
	   *
	   * @public
	   */
	  terminate() {
	    if (this.readyState === WebSocket.CLOSED) return;
	    if (this.readyState === WebSocket.CONNECTING) {
	      const msg = 'WebSocket was closed before the connection was established';
	      abortHandshake(this, this._req, msg);
	      return;
	    }

	    if (this._socket) {
	      this._readyState = WebSocket.CLOSING;
	      this._socket.destroy();
	    }
	  }
	}

	/**
	 * @constant {Number} CONNECTING
	 * @memberof WebSocket
	 */
	Object.defineProperty(WebSocket, 'CONNECTING', {
	  enumerable: true,
	  value: readyStates.indexOf('CONNECTING')
	});

	/**
	 * @constant {Number} CONNECTING
	 * @memberof WebSocket.prototype
	 */
	Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
	  enumerable: true,
	  value: readyStates.indexOf('CONNECTING')
	});

	/**
	 * @constant {Number} OPEN
	 * @memberof WebSocket
	 */
	Object.defineProperty(WebSocket, 'OPEN', {
	  enumerable: true,
	  value: readyStates.indexOf('OPEN')
	});

	/**
	 * @constant {Number} OPEN
	 * @memberof WebSocket.prototype
	 */
	Object.defineProperty(WebSocket.prototype, 'OPEN', {
	  enumerable: true,
	  value: readyStates.indexOf('OPEN')
	});

	/**
	 * @constant {Number} CLOSING
	 * @memberof WebSocket
	 */
	Object.defineProperty(WebSocket, 'CLOSING', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSING')
	});

	/**
	 * @constant {Number} CLOSING
	 * @memberof WebSocket.prototype
	 */
	Object.defineProperty(WebSocket.prototype, 'CLOSING', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSING')
	});

	/**
	 * @constant {Number} CLOSED
	 * @memberof WebSocket
	 */
	Object.defineProperty(WebSocket, 'CLOSED', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSED')
	});

	/**
	 * @constant {Number} CLOSED
	 * @memberof WebSocket.prototype
	 */
	Object.defineProperty(WebSocket.prototype, 'CLOSED', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSED')
	});

	[
	  'binaryType',
	  'bufferedAmount',
	  'extensions',
	  'isPaused',
	  'protocol',
	  'readyState',
	  'url'
	].forEach((property) => {
	  Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
	});

	//
	// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
	// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
	//
	['open', 'error', 'close', 'message'].forEach((method) => {
	  Object.defineProperty(WebSocket.prototype, `on${method}`, {
	    enumerable: true,
	    get() {
	      for (const listener of this.listeners(method)) {
	        if (listener[kForOnEventAttribute]) return listener[kListener];
	      }

	      return null;
	    },
	    set(handler) {
	      for (const listener of this.listeners(method)) {
	        if (listener[kForOnEventAttribute]) {
	          this.removeListener(method, listener);
	          break;
	        }
	      }

	      if (typeof handler !== 'function') return;

	      this.addEventListener(method, handler, {
	        [kForOnEventAttribute]: true
	      });
	    }
	  });
	});

	WebSocket.prototype.addEventListener = addEventListener;
	WebSocket.prototype.removeEventListener = removeEventListener;

	websocket = WebSocket;

	/**
	 * Initialize a WebSocket client.
	 *
	 * @param {WebSocket} websocket The client to initialize
	 * @param {(String|URL)} address The URL to which to connect
	 * @param {Array} protocols The subprotocols
	 * @param {Object} [options] Connection options
	 * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether any
	 *     of the `'message'`, `'ping'`, and `'pong'` events can be emitted multiple
	 *     times in the same tick
	 * @param {Boolean} [options.autoPong=true] Specifies whether or not to
	 *     automatically send a pong in response to a ping
	 * @param {Number} [options.closeTimeout=30000] Duration in milliseconds to wait
	 *     for the closing handshake to finish after `websocket.close()` is called
	 * @param {Function} [options.finishRequest] A function which can be used to
	 *     customize the headers of each http request before it is sent
	 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
	 *     redirects
	 * @param {Function} [options.generateMask] The function used to generate the
	 *     masking key
	 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
	 *     handshake request
	 * @param {Number} [options.maxBufferedChunks=262144] The maximum number of
	 *     buffered data chunks
	 * @param {Number} [options.maxFragments=16384] The maximum number of message
	 *     fragments
	 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
	 *     size
	 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
	 *     allowed
	 * @param {String} [options.origin] Value of the `Origin` or
	 *     `Sec-WebSocket-Origin` header
	 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
	 *     permessage-deflate
	 * @param {Number} [options.protocolVersion=13] Value of the
	 *     `Sec-WebSocket-Version` header
	 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
	 *     not to skip UTF-8 validation for text and close messages
	 * @private
	 */
	function initAsClient(websocket, address, protocols, options) {
	  const opts = {
	    allowSynchronousEvents: true,
	    autoPong: true,
	    closeTimeout: CLOSE_TIMEOUT,
	    protocolVersion: protocolVersions[1],
	    maxBufferedChunks: 256 * 1024,
	    maxFragments: 16 * 1024,
	    maxPayload: 100 * 1024 * 1024,
	    skipUTF8Validation: false,
	    perMessageDeflate: true,
	    followRedirects: false,
	    maxRedirects: 10,
	    ...options,
	    socketPath: undefined,
	    hostname: undefined,
	    protocol: undefined,
	    protocols: undefined,
	    timeout: undefined,
	    method: 'GET',
	    host: undefined,
	    path: undefined,
	    port: undefined
	  };

	  websocket._autoPong = opts.autoPong;
	  websocket._closeTimeout = opts.closeTimeout;

	  if (!protocolVersions.includes(opts.protocolVersion)) {
	    throw new RangeError(
	      `Unsupported protocol version: ${opts.protocolVersion} ` +
	        `(supported versions: ${protocolVersions.join(', ')})`
	    );
	  }

	  let parsedUrl;

	  if (address instanceof URL) {
	    parsedUrl = address;
	  } else {
	    try {
	      parsedUrl = new URL(address);
	    } catch {
	      throw new SyntaxError(`Invalid URL: ${address}`);
	    }
	  }

	  if (parsedUrl.protocol === 'http:') {
	    parsedUrl.protocol = 'ws:';
	  } else if (parsedUrl.protocol === 'https:') {
	    parsedUrl.protocol = 'wss:';
	  }

	  websocket._url = parsedUrl.href;

	  const isSecure = parsedUrl.protocol === 'wss:';
	  const isIpcUrl = parsedUrl.protocol === 'ws+unix:';
	  let invalidUrlMessage;

	  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isIpcUrl) {
	    invalidUrlMessage =
	      'The URL\'s protocol must be one of "ws:", "wss:", ' +
	      '"http:", "https:", or "ws+unix:"';
	  } else if (isIpcUrl && !parsedUrl.pathname) {
	    invalidUrlMessage = "The URL's pathname is empty";
	  } else if (parsedUrl.hash) {
	    invalidUrlMessage = 'The URL contains a fragment identifier';
	  }

	  if (invalidUrlMessage) {
	    const err = new SyntaxError(invalidUrlMessage);

	    if (websocket._redirects === 0) {
	      throw err;
	    } else {
	      emitErrorAndClose(websocket, err);
	      return;
	    }
	  }

	  const defaultPort = isSecure ? 443 : 80;
	  const key = randomBytes(16).toString('base64');
	  const request = isSecure ? https.request : http.request;
	  const protocolSet = new Set();
	  let perMessageDeflate;

	  opts.createConnection =
	    opts.createConnection || (isSecure ? tlsConnect : netConnect);
	  opts.defaultPort = opts.defaultPort || defaultPort;
	  opts.port = parsedUrl.port || defaultPort;
	  opts.host = parsedUrl.hostname.startsWith('[')
	    ? parsedUrl.hostname.slice(1, -1)
	    : parsedUrl.hostname;
	  opts.headers = {
	    ...opts.headers,
	    'Sec-WebSocket-Version': opts.protocolVersion,
	    'Sec-WebSocket-Key': key,
	    Connection: 'Upgrade',
	    Upgrade: 'websocket'
	  };
	  opts.path = parsedUrl.pathname + parsedUrl.search;
	  opts.timeout = opts.handshakeTimeout;

	  if (opts.perMessageDeflate) {
	    perMessageDeflate = new PerMessageDeflate({
	      ...opts.perMessageDeflate,
	      isServer: false,
	      maxPayload: opts.maxPayload
	    });
	    opts.headers['Sec-WebSocket-Extensions'] = format({
	      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
	    });
	  }
	  if (protocols.length) {
	    for (const protocol of protocols) {
	      if (
	        typeof protocol !== 'string' ||
	        !subprotocolRegex.test(protocol) ||
	        protocolSet.has(protocol)
	      ) {
	        throw new SyntaxError(
	          'An invalid or duplicated subprotocol was specified'
	        );
	      }

	      protocolSet.add(protocol);
	    }

	    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
	  }
	  if (opts.origin) {
	    if (opts.protocolVersion < 13) {
	      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
	    } else {
	      opts.headers.Origin = opts.origin;
	    }
	  }
	  if (parsedUrl.username || parsedUrl.password) {
	    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
	  }

	  if (isIpcUrl) {
	    const parts = opts.path.split(':');

	    opts.socketPath = parts[0];
	    opts.path = parts[1];
	  }

	  let req;

	  if (opts.followRedirects) {
	    if (websocket._redirects === 0) {
	      websocket._originalIpc = isIpcUrl;
	      websocket._originalSecure = isSecure;
	      websocket._originalHostOrSocketPath = isIpcUrl
	        ? opts.socketPath
	        : parsedUrl.host;

	      const headers = options && options.headers;

	      //
	      // Shallow copy the user provided options so that headers can be changed
	      // without mutating the original object.
	      //
	      options = { ...options, headers: {} };

	      if (headers) {
	        for (const [key, value] of Object.entries(headers)) {
	          options.headers[key.toLowerCase()] = value;
	        }
	      }
	    } else if (websocket.listenerCount('redirect') === 0) {
	      const isSameHost = isIpcUrl
	        ? websocket._originalIpc
	          ? opts.socketPath === websocket._originalHostOrSocketPath
	          : false
	        : websocket._originalIpc
	          ? false
	          : parsedUrl.host === websocket._originalHostOrSocketPath;

	      if (!isSameHost || (websocket._originalSecure && !isSecure)) {
	        //
	        // Match curl 7.77.0 behavior and drop the following headers. These
	        // headers are also dropped when following a redirect to a subdomain.
	        //
	        delete opts.headers.authorization;
	        delete opts.headers.cookie;

	        if (!isSameHost) delete opts.headers.host;

	        opts.auth = undefined;
	      }
	    }

	    //
	    // Match curl 7.77.0 behavior and make the first `Authorization` header win.
	    // If the `Authorization` header is set, then there is nothing to do as it
	    // will take precedence.
	    //
	    if (opts.auth && !options.headers.authorization) {
	      options.headers.authorization =
	        'Basic ' + Buffer.from(opts.auth).toString('base64');
	    }

	    req = websocket._req = request(opts);

	    if (websocket._redirects) {
	      //
	      // Unlike what is done for the `'upgrade'` event, no early exit is
	      // triggered here if the user calls `websocket.close()` or
	      // `websocket.terminate()` from a listener of the `'redirect'` event. This
	      // is because the user can also call `request.destroy()` with an error
	      // before calling `websocket.close()` or `websocket.terminate()` and this
	      // would result in an error being emitted on the `request` object with no
	      // `'error'` event listeners attached.
	      //
	      websocket.emit('redirect', websocket.url, req);
	    }
	  } else {
	    req = websocket._req = request(opts);
	  }

	  if (opts.timeout) {
	    req.on('timeout', () => {
	      abortHandshake(websocket, req, 'Opening handshake has timed out');
	    });
	  }

	  req.on('error', (err) => {
	    if (req === null || req[kAborted]) return;

	    req = websocket._req = null;
	    emitErrorAndClose(websocket, err);
	  });

	  req.on('response', (res) => {
	    const location = res.headers.location;
	    const statusCode = res.statusCode;

	    if (
	      location &&
	      opts.followRedirects &&
	      statusCode >= 300 &&
	      statusCode < 400
	    ) {
	      if (++websocket._redirects > opts.maxRedirects) {
	        abortHandshake(websocket, req, 'Maximum redirects exceeded');
	        return;
	      }

	      req.abort();

	      let addr;

	      try {
	        addr = new URL(location, address);
	      } catch (e) {
	        const err = new SyntaxError(`Invalid URL: ${location}`);
	        emitErrorAndClose(websocket, err);
	        return;
	      }

	      initAsClient(websocket, addr, protocols, options);
	    } else if (!websocket.emit('unexpected-response', req, res)) {
	      abortHandshake(
	        websocket,
	        req,
	        `Unexpected server response: ${res.statusCode}`
	      );
	    }
	  });

	  req.on('upgrade', (res, socket, head) => {
	    websocket.emit('upgrade', res);

	    //
	    // The user may have closed the connection from a listener of the
	    // `'upgrade'` event.
	    //
	    if (websocket.readyState !== WebSocket.CONNECTING) return;

	    req = websocket._req = null;

	    const upgrade = res.headers.upgrade;

	    if (upgrade === undefined || upgrade.toLowerCase() !== 'websocket') {
	      abortHandshake(websocket, socket, 'Invalid Upgrade header');
	      return;
	    }

	    const digest = createHash('sha1')
	      .update(key + GUID)
	      .digest('base64');

	    if (res.headers['sec-websocket-accept'] !== digest) {
	      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
	      return;
	    }

	    const serverProt = res.headers['sec-websocket-protocol'];
	    let protError;

	    if (serverProt !== undefined) {
	      if (!protocolSet.size) {
	        protError = 'Server sent a subprotocol but none was requested';
	      } else if (!protocolSet.has(serverProt)) {
	        protError = 'Server sent an invalid subprotocol';
	      }
	    } else if (protocolSet.size) {
	      protError = 'Server sent no subprotocol';
	    }

	    if (protError) {
	      abortHandshake(websocket, socket, protError);
	      return;
	    }

	    if (serverProt) websocket._protocol = serverProt;

	    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

	    if (secWebSocketExtensions !== undefined) {
	      if (!perMessageDeflate) {
	        const message =
	          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
	          'was requested';
	        abortHandshake(websocket, socket, message);
	        return;
	      }

	      let extensions;

	      try {
	        extensions = parse(secWebSocketExtensions);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Extensions header';
	        abortHandshake(websocket, socket, message);
	        return;
	      }

	      const extensionNames = Object.keys(extensions);

	      if (
	        extensionNames.length !== 1 ||
	        extensionNames[0] !== PerMessageDeflate.extensionName
	      ) {
	        const message = 'Server indicated an extension that was not requested';
	        abortHandshake(websocket, socket, message);
	        return;
	      }

	      try {
	        perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Extensions header';
	        abortHandshake(websocket, socket, message);
	        return;
	      }

	      websocket._extensions[PerMessageDeflate.extensionName] =
	        perMessageDeflate;
	    }

	    websocket.setSocket(socket, head, {
	      allowSynchronousEvents: opts.allowSynchronousEvents,
	      generateMask: opts.generateMask,
	      maxBufferedChunks: opts.maxBufferedChunks,
	      maxFragments: opts.maxFragments,
	      maxPayload: opts.maxPayload,
	      skipUTF8Validation: opts.skipUTF8Validation
	    });
	  });

	  if (opts.finishRequest) {
	    opts.finishRequest(req, websocket);
	  } else {
	    req.end();
	  }
	}

	/**
	 * Emit the `'error'` and `'close'` events.
	 *
	 * @param {WebSocket} websocket The WebSocket instance
	 * @param {Error} The error to emit
	 * @private
	 */
	function emitErrorAndClose(websocket, err) {
	  websocket._readyState = WebSocket.CLOSING;
	  //
	  // The following assignment is practically useless and is done only for
	  // consistency.
	  //
	  websocket._errorEmitted = true;
	  websocket.emit('error', err);
	  websocket.emitClose();
	}

	/**
	 * Create a `net.Socket` and initiate a connection.
	 *
	 * @param {Object} options Connection options
	 * @return {net.Socket} The newly created socket used to start the connection
	 * @private
	 */
	function netConnect(options) {
	  options.path = options.socketPath;
	  return net.connect(options);
	}

	/**
	 * Create a `tls.TLSSocket` and initiate a connection.
	 *
	 * @param {Object} options Connection options
	 * @return {tls.TLSSocket} The newly created socket used to start the connection
	 * @private
	 */
	function tlsConnect(options) {
	  options.path = undefined;

	  if (!options.servername && options.servername !== '') {
	    options.servername = net.isIP(options.host) ? '' : options.host;
	  }

	  return tls.connect(options);
	}

	/**
	 * Abort the handshake and emit an error.
	 *
	 * @param {WebSocket} websocket The WebSocket instance
	 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
	 *     abort or the socket to destroy
	 * @param {String} message The error message
	 * @private
	 */
	function abortHandshake(websocket, stream, message) {
	  websocket._readyState = WebSocket.CLOSING;

	  const err = new Error(message);
	  Error.captureStackTrace(err, abortHandshake);

	  if (stream.setHeader) {
	    stream[kAborted] = true;
	    stream.abort();

	    if (stream.socket && !stream.socket.destroyed) {
	      //
	      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
	      // called after the request completed. See
	      // https://github.com/websockets/ws/issues/1869.
	      //
	      stream.socket.destroy();
	    }

	    process.nextTick(emitErrorAndClose, websocket, err);
	  } else {
	    stream.destroy(err);
	    stream.once('error', websocket.emit.bind(websocket, 'error'));
	    stream.once('close', websocket.emitClose.bind(websocket));
	  }
	}

	/**
	 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
	 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
	 *
	 * @param {WebSocket} websocket The WebSocket instance
	 * @param {*} [data] The data to send
	 * @param {Function} [cb] Callback
	 * @private
	 */
	function sendAfterClose(websocket, data, cb) {
	  if (data) {
	    const length = isBlob(data) ? data.size : toBuffer(data).length;

	    //
	    // The `_bufferedAmount` property is used only when the peer is a client and
	    // the opening handshake fails. Under these circumstances, in fact, the
	    // `setSocket()` method is not called, so the `_socket` and `_sender`
	    // properties are set to `null`.
	    //
	    if (websocket._socket) websocket._sender._bufferedBytes += length;
	    else websocket._bufferedAmount += length;
	  }

	  if (cb) {
	    const err = new Error(
	      `WebSocket is not open: readyState ${websocket.readyState} ` +
	        `(${readyStates[websocket.readyState]})`
	    );
	    process.nextTick(cb, err);
	  }
	}

	/**
	 * The listener of the `Receiver` `'conclude'` event.
	 *
	 * @param {Number} code The status code
	 * @param {Buffer} reason The reason for closing
	 * @private
	 */
	function receiverOnConclude(code, reason) {
	  const websocket = this[kWebSocket];

	  websocket._closeFrameReceived = true;
	  websocket._closeMessage = reason;
	  websocket._closeCode = code;

	  if (websocket._socket[kWebSocket] === undefined) return;

	  websocket._socket.removeListener('data', socketOnData);
	  process.nextTick(resume, websocket._socket);

	  if (code === 1005) websocket.close();
	  else websocket.close(code, reason);
	}

	/**
	 * The listener of the `Receiver` `'drain'` event.
	 *
	 * @private
	 */
	function receiverOnDrain() {
	  const websocket = this[kWebSocket];

	  if (!websocket.isPaused) websocket._socket.resume();
	}

	/**
	 * The listener of the `Receiver` `'error'` event.
	 *
	 * @param {(RangeError|Error)} err The emitted error
	 * @private
	 */
	function receiverOnError(err) {
	  const websocket = this[kWebSocket];

	  if (websocket._socket[kWebSocket] !== undefined) {
	    websocket._socket.removeListener('data', socketOnData);

	    //
	    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
	    // https://github.com/websockets/ws/issues/1940.
	    //
	    process.nextTick(resume, websocket._socket);

	    websocket.close(err[kStatusCode]);
	  }

	  if (!websocket._errorEmitted) {
	    websocket._errorEmitted = true;
	    websocket.emit('error', err);
	  }
	}

	/**
	 * The listener of the `Receiver` `'finish'` event.
	 *
	 * @private
	 */
	function receiverOnFinish() {
	  this[kWebSocket].emitClose();
	}

	/**
	 * The listener of the `Receiver` `'message'` event.
	 *
	 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
	 * @param {Boolean} isBinary Specifies whether the message is binary or not
	 * @private
	 */
	function receiverOnMessage(data, isBinary) {
	  this[kWebSocket].emit('message', data, isBinary);
	}

	/**
	 * The listener of the `Receiver` `'ping'` event.
	 *
	 * @param {Buffer} data The data included in the ping frame
	 * @private
	 */
	function receiverOnPing(data) {
	  const websocket = this[kWebSocket];

	  if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
	  websocket.emit('ping', data);
	}

	/**
	 * The listener of the `Receiver` `'pong'` event.
	 *
	 * @param {Buffer} data The data included in the pong frame
	 * @private
	 */
	function receiverOnPong(data) {
	  this[kWebSocket].emit('pong', data);
	}

	/**
	 * Resume a readable stream
	 *
	 * @param {Readable} stream The readable stream
	 * @private
	 */
	function resume(stream) {
	  stream.resume();
	}

	/**
	 * The `Sender` error event handler.
	 *
	 * @param {Error} The error
	 * @private
	 */
	function senderOnError(err) {
	  const websocket = this[kWebSocket];

	  if (websocket.readyState === WebSocket.CLOSED) return;
	  if (websocket.readyState === WebSocket.OPEN) {
	    websocket._readyState = WebSocket.CLOSING;
	    setCloseTimer(websocket);
	  }

	  //
	  // `socket.end()` is used instead of `socket.destroy()` to allow the other
	  // peer to finish sending queued data. There is no need to set a timer here
	  // because `CLOSING` means that it is already set or not needed.
	  //
	  this._socket.end();

	  if (!websocket._errorEmitted) {
	    websocket._errorEmitted = true;
	    websocket.emit('error', err);
	  }
	}

	/**
	 * Set a timer to destroy the underlying raw socket of a WebSocket.
	 *
	 * @param {WebSocket} websocket The WebSocket instance
	 * @private
	 */
	function setCloseTimer(websocket) {
	  websocket._closeTimer = setTimeout(
	    websocket._socket.destroy.bind(websocket._socket),
	    websocket._closeTimeout
	  );
	}

	/**
	 * The listener of the socket `'close'` event.
	 *
	 * @private
	 */
	function socketOnClose() {
	  const websocket = this[kWebSocket];

	  this.removeListener('close', socketOnClose);
	  this.removeListener('data', socketOnData);
	  this.removeListener('end', socketOnEnd);

	  websocket._readyState = WebSocket.CLOSING;

	  //
	  // The close frame might not have been received or the `'end'` event emitted,
	  // for example, if the socket was destroyed due to an error. Ensure that the
	  // `receiver` stream is closed after writing any remaining buffered data to
	  // it. If the readable side of the socket is in flowing mode then there is no
	  // buffered data as everything has been already written. If instead, the
	  // socket is paused, any possible buffered data will be read as a single
	  // chunk.
	  //
	  if (
	    !this._readableState.endEmitted &&
	    !websocket._closeFrameReceived &&
	    !websocket._receiver._writableState.errorEmitted &&
	    this._readableState.length !== 0
	  ) {
	    const chunk = this.read(this._readableState.length);

	    websocket._receiver.write(chunk);
	  }

	  websocket._receiver.end();

	  this[kWebSocket] = undefined;

	  clearTimeout(websocket._closeTimer);

	  if (
	    websocket._receiver._writableState.finished ||
	    websocket._receiver._writableState.errorEmitted
	  ) {
	    websocket.emitClose();
	  } else {
	    websocket._receiver.on('error', receiverOnFinish);
	    websocket._receiver.on('finish', receiverOnFinish);
	  }
	}

	/**
	 * The listener of the socket `'data'` event.
	 *
	 * @param {Buffer} chunk A chunk of data
	 * @private
	 */
	function socketOnData(chunk) {
	  if (!this[kWebSocket]._receiver.write(chunk)) {
	    this.pause();
	  }
	}

	/**
	 * The listener of the socket `'end'` event.
	 *
	 * @private
	 */
	function socketOnEnd() {
	  const websocket = this[kWebSocket];

	  websocket._readyState = WebSocket.CLOSING;
	  websocket._receiver.end();
	  this.end();
	}

	/**
	 * The listener of the socket `'error'` event.
	 *
	 * @private
	 */
	function socketOnError() {
	  const websocket = this[kWebSocket];

	  this.removeListener('error', socketOnError);
	  this.on('error', NOOP);

	  if (websocket) {
	    websocket._readyState = WebSocket.CLOSING;
	    this.destroy();
	  }
	}
	return websocket;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^WebSocket$" }] */

var stream;
var hasRequiredStream;

function requireStream () {
	if (hasRequiredStream) return stream;
	hasRequiredStream = 1;

	requireWebsocket();
	const { Duplex } = require$$0$2;

	/**
	 * Emits the `'close'` event on a stream.
	 *
	 * @param {Duplex} stream The stream.
	 * @private
	 */
	function emitClose(stream) {
	  stream.emit('close');
	}

	/**
	 * The listener of the `'end'` event.
	 *
	 * @private
	 */
	function duplexOnEnd() {
	  if (!this.destroyed && this._writableState.finished) {
	    this.destroy();
	  }
	}

	/**
	 * The listener of the `'error'` event.
	 *
	 * @param {Error} err The error
	 * @private
	 */
	function duplexOnError(err) {
	  this.removeListener('error', duplexOnError);
	  this.destroy();
	  if (this.listenerCount('error') === 0) {
	    // Do not suppress the throwing behavior.
	    this.emit('error', err);
	  }
	}

	/**
	 * Wraps a `WebSocket` in a duplex stream.
	 *
	 * @param {WebSocket} ws The `WebSocket` to wrap
	 * @param {Object} [options] The options for the `Duplex` constructor
	 * @return {Duplex} The duplex stream
	 * @public
	 */
	function createWebSocketStream(ws, options) {
	  let terminateOnDestroy = true;

	  const duplex = new Duplex({
	    ...options,
	    autoDestroy: false,
	    emitClose: false,
	    objectMode: false,
	    writableObjectMode: false
	  });

	  ws.on('message', function message(msg, isBinary) {
	    const data =
	      !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;

	    if (!duplex.push(data)) ws.pause();
	  });

	  ws.once('error', function error(err) {
	    if (duplex.destroyed) return;

	    // Prevent `ws.terminate()` from being called by `duplex._destroy()`.
	    //
	    // - If the `'error'` event is emitted before the `'open'` event, then
	    //   `ws.terminate()` is a noop as no socket is assigned.
	    // - Otherwise, the error is re-emitted by the listener of the `'error'`
	    //   event of the `Receiver` object. The listener already closes the
	    //   connection by calling `ws.close()`. This allows a close frame to be
	    //   sent to the other peer. If `ws.terminate()` is called right after this,
	    //   then the close frame might not be sent.
	    terminateOnDestroy = false;
	    duplex.destroy(err);
	  });

	  ws.once('close', function close() {
	    if (duplex.destroyed) return;

	    duplex.push(null);
	  });

	  duplex._destroy = function (err, callback) {
	    if (ws.readyState === ws.CLOSED) {
	      callback(err);
	      process.nextTick(emitClose, duplex);
	      return;
	    }

	    let called = false;

	    ws.once('error', function error(err) {
	      called = true;
	      callback(err);
	    });

	    ws.once('close', function close() {
	      if (!called) callback(err);
	      process.nextTick(emitClose, duplex);
	    });

	    if (terminateOnDestroy) ws.terminate();
	  };

	  duplex._final = function (callback) {
	    if (ws.readyState === ws.CONNECTING) {
	      ws.once('open', function open() {
	        duplex._final(callback);
	      });
	      return;
	    }

	    // If the value of the `_socket` property is `null` it means that `ws` is a
	    // client websocket and the handshake failed. In fact, when this happens, a
	    // socket is never assigned to the websocket. Wait for the `'error'` event
	    // that will be emitted by the websocket.
	    if (ws._socket === null) return;

	    if (ws._socket._writableState.finished) {
	      callback();
	      if (duplex._readableState.endEmitted) duplex.destroy();
	    } else {
	      ws._socket.once('finish', function finish() {
	        // `duplex` is not destroyed here because the `'end'` event will be
	        // emitted on `duplex` after this `'finish'` event. The EOF signaling
	        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
	        callback();
	      });
	      ws.close();
	    }
	  };

	  duplex._read = function () {
	    if (ws.isPaused) ws.resume();
	  };

	  duplex._write = function (chunk, encoding, callback) {
	    if (ws.readyState === ws.CONNECTING) {
	      ws.once('open', function open() {
	        duplex._write(chunk, encoding, callback);
	      });
	      return;
	    }

	    ws.send(chunk, callback);
	  };

	  duplex.on('end', duplexOnEnd);
	  duplex.on('error', duplexOnError);
	  return duplex;
	}

	stream = createWebSocketStream;
	return stream;
}

requireStream();

requireExtension();

requirePermessageDeflate();

requireReceiver();

requireSender();

var subprotocol;
var hasRequiredSubprotocol;

function requireSubprotocol () {
	if (hasRequiredSubprotocol) return subprotocol;
	hasRequiredSubprotocol = 1;

	const { tokenChars } = requireValidation();

	/**
	 * Parses the `Sec-WebSocket-Protocol` header into a set of subprotocol names.
	 *
	 * @param {String} header The field value of the header
	 * @return {Set} The subprotocol names
	 * @public
	 */
	function parse(header) {
	  const protocols = new Set();
	  let start = -1;
	  let end = -1;
	  let i = 0;

	  for (i; i < header.length; i++) {
	    const code = header.charCodeAt(i);

	    if (end === -1 && tokenChars[code] === 1) {
	      if (start === -1) start = i;
	    } else if (
	      i !== 0 &&
	      (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
	    ) {
	      if (end === -1 && start !== -1) end = i;
	    } else if (code === 0x2c /* ',' */) {
	      if (start === -1) {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }

	      if (end === -1) end = i;

	      const protocol = header.slice(start, end);

	      if (protocols.has(protocol)) {
	        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
	      }

	      protocols.add(protocol);
	      start = end = -1;
	    } else {
	      throw new SyntaxError(`Unexpected character at index ${i}`);
	    }
	  }

	  if (start === -1 || end !== -1) {
	    throw new SyntaxError('Unexpected end of input');
	  }

	  const protocol = header.slice(start, i);

	  if (protocols.has(protocol)) {
	    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
	  }

	  protocols.add(protocol);
	  return protocols;
	}

	subprotocol = { parse };
	return subprotocol;
}

requireSubprotocol();

requireWebsocket();

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex$", "caughtErrors": "none" }] */

var websocketServer;
var hasRequiredWebsocketServer;

function requireWebsocketServer () {
	if (hasRequiredWebsocketServer) return websocketServer;
	hasRequiredWebsocketServer = 1;

	const EventEmitter = require$$0$3;
	const http = require$$2$1;
	const { Duplex } = require$$0$2;
	const { createHash } = require$$1;

	const extension = requireExtension();
	const PerMessageDeflate = requirePermessageDeflate();
	const subprotocol = requireSubprotocol();
	const WebSocket = requireWebsocket();
	const { CLOSE_TIMEOUT, GUID, kWebSocket } = requireConstants();

	const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

	const RUNNING = 0;
	const CLOSING = 1;
	const CLOSED = 2;

	/**
	 * Class representing a WebSocket server.
	 *
	 * @extends EventEmitter
	 */
	class WebSocketServer extends EventEmitter {
	  /**
	   * Create a `WebSocketServer` instance.
	   *
	   * @param {Object} options Configuration options
	   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
	   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
	   *     multiple times in the same tick
	   * @param {Boolean} [options.autoPong=true] Specifies whether or not to
	   *     automatically send a pong in response to a ping
	   * @param {Number} [options.backlog=511] The maximum length of the queue of
	   *     pending connections
	   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
	   *     track clients
	   * @param {Number} [options.closeTimeout=30000] Duration in milliseconds to
	   *     wait for the closing handshake to finish after `websocket.close()` is
	   *     called
	   * @param {Function} [options.handleProtocols] A hook to handle protocols
	   * @param {String} [options.host] The hostname where to bind the server
	   * @param {Number} [options.maxBufferedChunks=262144] The maximum number of
	   *     buffered data chunks
	   * @param {Number} [options.maxFragments=16384] The maximum number of message
	   *     fragments
	   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
	   *     size
	   * @param {Boolean} [options.noServer=false] Enable no server mode
	   * @param {String} [options.path] Accept only connections matching this path
	   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
	   *     permessage-deflate
	   * @param {Number} [options.port] The port where to bind the server
	   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
	   *     server to use
	   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
	   *     not to skip UTF-8 validation for text and close messages
	   * @param {Function} [options.verifyClient] A hook to reject connections
	   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
	   *     class to use. It must be the `WebSocket` class or class that extends it
	   * @param {Function} [callback] A listener for the `listening` event
	   */
	  constructor(options, callback) {
	    super();

	    options = {
	      allowSynchronousEvents: true,
	      autoPong: true,
	      maxBufferedChunks: 256 * 1024,
	      maxFragments: 16 * 1024,
	      maxPayload: 100 * 1024 * 1024,
	      skipUTF8Validation: false,
	      perMessageDeflate: false,
	      handleProtocols: null,
	      clientTracking: true,
	      closeTimeout: CLOSE_TIMEOUT,
	      verifyClient: null,
	      noServer: false,
	      backlog: null, // use default (511 as implemented in net.js)
	      server: null,
	      host: null,
	      path: null,
	      port: null,
	      WebSocket,
	      ...options
	    };

	    if (
	      (options.port == null && !options.server && !options.noServer) ||
	      (options.port != null && (options.server || options.noServer)) ||
	      (options.server && options.noServer)
	    ) {
	      throw new TypeError(
	        'One and only one of the "port", "server", or "noServer" options ' +
	          'must be specified'
	      );
	    }

	    if (options.port != null) {
	      this._server = http.createServer((req, res) => {
	        const body = http.STATUS_CODES[426];

	        res.writeHead(426, {
	          'Content-Length': body.length,
	          'Content-Type': 'text/plain'
	        });
	        res.end(body);
	      });
	      this._server.listen(
	        options.port,
	        options.host,
	        options.backlog,
	        callback
	      );
	    } else if (options.server) {
	      this._server = options.server;
	    }

	    if (this._server) {
	      const emitConnection = this.emit.bind(this, 'connection');

	      this._removeListeners = addListeners(this._server, {
	        listening: this.emit.bind(this, 'listening'),
	        error: this.emit.bind(this, 'error'),
	        upgrade: (req, socket, head) => {
	          this.handleUpgrade(req, socket, head, emitConnection);
	        }
	      });
	    }

	    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
	    if (options.clientTracking) {
	      this.clients = new Set();
	      this._shouldEmitClose = false;
	    }

	    this.options = options;
	    this._state = RUNNING;
	  }

	  /**
	   * Returns the bound address, the address family name, and port of the server
	   * as reported by the operating system if listening on an IP socket.
	   * If the server is listening on a pipe or UNIX domain socket, the name is
	   * returned as a string.
	   *
	   * @return {(Object|String|null)} The address of the server
	   * @public
	   */
	  address() {
	    if (this.options.noServer) {
	      throw new Error('The server is operating in "noServer" mode');
	    }

	    if (!this._server) return null;
	    return this._server.address();
	  }

	  /**
	   * Stop the server from accepting new connections and emit the `'close'` event
	   * when all existing connections are closed.
	   *
	   * @param {Function} [cb] A one-time listener for the `'close'` event
	   * @public
	   */
	  close(cb) {
	    if (this._state === CLOSED) {
	      if (cb) {
	        this.once('close', () => {
	          cb(new Error('The server is not running'));
	        });
	      }

	      process.nextTick(emitClose, this);
	      return;
	    }

	    if (cb) this.once('close', cb);

	    if (this._state === CLOSING) return;
	    this._state = CLOSING;

	    if (this.options.noServer || this.options.server) {
	      if (this._server) {
	        this._removeListeners();
	        this._removeListeners = this._server = null;
	      }

	      if (this.clients) {
	        if (!this.clients.size) {
	          process.nextTick(emitClose, this);
	        } else {
	          this._shouldEmitClose = true;
	        }
	      } else {
	        process.nextTick(emitClose, this);
	      }
	    } else {
	      const server = this._server;

	      this._removeListeners();
	      this._removeListeners = this._server = null;

	      //
	      // The HTTP/S server was created internally. Close it, and rely on its
	      // `'close'` event.
	      //
	      server.close(() => {
	        emitClose(this);
	      });
	    }
	  }

	  /**
	   * See if a given request should be handled by this server instance.
	   *
	   * @param {http.IncomingMessage} req Request object to inspect
	   * @return {Boolean} `true` if the request is valid, else `false`
	   * @public
	   */
	  shouldHandle(req) {
	    if (this.options.path) {
	      const index = req.url.indexOf('?');
	      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

	      if (pathname !== this.options.path) return false;
	    }

	    return true;
	  }

	  /**
	   * Handle a HTTP Upgrade request.
	   *
	   * @param {http.IncomingMessage} req The request object
	   * @param {Duplex} socket The network socket between the server and client
	   * @param {Buffer} head The first packet of the upgraded stream
	   * @param {Function} cb Callback
	   * @public
	   */
	  handleUpgrade(req, socket, head, cb) {
	    socket.on('error', socketOnError);

	    const key = req.headers['sec-websocket-key'];
	    const upgrade = req.headers.upgrade;
	    const version = +req.headers['sec-websocket-version'];

	    if (req.method !== 'GET') {
	      const message = 'Invalid HTTP method';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
	      return;
	    }

	    if (upgrade === undefined || upgrade.toLowerCase() !== 'websocket') {
	      const message = 'Invalid Upgrade header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	      return;
	    }

	    if (key === undefined || !keyRegex.test(key)) {
	      const message = 'Missing or invalid Sec-WebSocket-Key header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	      return;
	    }

	    if (version !== 13 && version !== 8) {
	      const message = 'Missing or invalid Sec-WebSocket-Version header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message, {
	        'Sec-WebSocket-Version': '13, 8'
	      });
	      return;
	    }

	    if (!this.shouldHandle(req)) {
	      abortHandshake(socket, 400);
	      return;
	    }

	    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
	    let protocols = new Set();

	    if (secWebSocketProtocol !== undefined) {
	      try {
	        protocols = subprotocol.parse(secWebSocketProtocol);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Protocol header';
	        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	        return;
	      }
	    }

	    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
	    const extensions = {};

	    if (
	      this.options.perMessageDeflate &&
	      secWebSocketExtensions !== undefined
	    ) {
	      const perMessageDeflate = new PerMessageDeflate({
	        ...this.options.perMessageDeflate,
	        isServer: true,
	        maxPayload: this.options.maxPayload
	      });

	      try {
	        const offers = extension.parse(secWebSocketExtensions);

	        if (offers[PerMessageDeflate.extensionName]) {
	          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
	          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
	        }
	      } catch (err) {
	        const message =
	          'Invalid or unacceptable Sec-WebSocket-Extensions header';
	        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	        return;
	      }
	    }

	    //
	    // Optionally call external client verification handler.
	    //
	    if (this.options.verifyClient) {
	      const info = {
	        origin:
	          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
	        secure: !!(req.socket.authorized || req.socket.encrypted),
	        req
	      };

	      if (this.options.verifyClient.length === 2) {
	        this.options.verifyClient(info, (verified, code, message, headers) => {
	          if (!verified) {
	            return abortHandshake(socket, code || 401, message, headers);
	          }

	          this.completeUpgrade(
	            extensions,
	            key,
	            protocols,
	            req,
	            socket,
	            head,
	            cb
	          );
	        });
	        return;
	      }

	      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
	    }

	    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
	  }

	  /**
	   * Upgrade the connection to WebSocket.
	   *
	   * @param {Object} extensions The accepted extensions
	   * @param {String} key The value of the `Sec-WebSocket-Key` header
	   * @param {Set} protocols The subprotocols
	   * @param {http.IncomingMessage} req The request object
	   * @param {Duplex} socket The network socket between the server and client
	   * @param {Buffer} head The first packet of the upgraded stream
	   * @param {Function} cb Callback
	   * @throws {Error} If called more than once with the same socket
	   * @private
	   */
	  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
	    //
	    // Destroy the socket if the client has already sent a FIN packet.
	    //
	    if (!socket.readable || !socket.writable) return socket.destroy();

	    if (socket[kWebSocket]) {
	      throw new Error(
	        'server.handleUpgrade() was called more than once with the same ' +
	          'socket, possibly due to a misconfiguration'
	      );
	    }

	    if (this._state > RUNNING) return abortHandshake(socket, 503);

	    const digest = createHash('sha1')
	      .update(key + GUID)
	      .digest('base64');

	    const headers = [
	      'HTTP/1.1 101 Switching Protocols',
	      'Upgrade: websocket',
	      'Connection: Upgrade',
	      `Sec-WebSocket-Accept: ${digest}`
	    ];

	    const ws = new this.options.WebSocket(null, undefined, this.options);

	    if (protocols.size) {
	      //
	      // Optionally call external protocol selection handler.
	      //
	      const protocol = this.options.handleProtocols
	        ? this.options.handleProtocols(protocols, req)
	        : protocols.values().next().value;

	      if (protocol) {
	        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
	        ws._protocol = protocol;
	      }
	    }

	    if (extensions[PerMessageDeflate.extensionName]) {
	      const params = extensions[PerMessageDeflate.extensionName].params;
	      const value = extension.format({
	        [PerMessageDeflate.extensionName]: [params]
	      });
	      headers.push(`Sec-WebSocket-Extensions: ${value}`);
	      ws._extensions = extensions;
	    }

	    //
	    // Allow external modification/inspection of handshake headers.
	    //
	    this.emit('headers', headers, req);

	    socket.write(headers.concat('\r\n').join('\r\n'));
	    socket.removeListener('error', socketOnError);

	    ws.setSocket(socket, head, {
	      allowSynchronousEvents: this.options.allowSynchronousEvents,
	      maxBufferedChunks: this.options.maxBufferedChunks,
	      maxFragments: this.options.maxFragments,
	      maxPayload: this.options.maxPayload,
	      skipUTF8Validation: this.options.skipUTF8Validation
	    });

	    if (this.clients) {
	      this.clients.add(ws);
	      ws.on('close', () => {
	        this.clients.delete(ws);

	        if (this._shouldEmitClose && !this.clients.size) {
	          process.nextTick(emitClose, this);
	        }
	      });
	    }

	    cb(ws, req);
	  }
	}

	websocketServer = WebSocketServer;

	/**
	 * Add event listeners on an `EventEmitter` using a map of <event, listener>
	 * pairs.
	 *
	 * @param {EventEmitter} server The event emitter
	 * @param {Object.<String, Function>} map The listeners to add
	 * @return {Function} A function that will remove the added listeners when
	 *     called
	 * @private
	 */
	function addListeners(server, map) {
	  for (const event of Object.keys(map)) server.on(event, map[event]);

	  return function removeListeners() {
	    for (const event of Object.keys(map)) {
	      server.removeListener(event, map[event]);
	    }
	  };
	}

	/**
	 * Emit a `'close'` event on an `EventEmitter`.
	 *
	 * @param {EventEmitter} server The event emitter
	 * @private
	 */
	function emitClose(server) {
	  server._state = CLOSED;
	  server.emit('close');
	}

	/**
	 * Handle socket errors.
	 *
	 * @private
	 */
	function socketOnError() {
	  this.destroy();
	}

	/**
	 * Close the connection when preconditions are not fulfilled.
	 *
	 * @param {Duplex} socket The socket of the upgrade request
	 * @param {Number} code The HTTP response status code
	 * @param {String} [message] The HTTP response body
	 * @param {Object} [headers] Additional HTTP response headers
	 * @private
	 */
	function abortHandshake(socket, code, message, headers) {
	  //
	  // The socket is writable unless the user destroyed or ended it before calling
	  // `server.handleUpgrade()` or in the `verifyClient` function, which is a user
	  // error. Handling this does not make much sense as the worst that can happen
	  // is that some of the data written by the user might be discarded due to the
	  // call to `socket.end()` below, which triggers an `'error'` event that in
	  // turn causes the socket to be destroyed.
	  //
	  message = message || http.STATUS_CODES[code];
	  headers = {
	    Connection: 'close',
	    'Content-Type': 'text/html',
	    'Content-Length': Buffer.byteLength(message),
	    ...headers
	  };

	  socket.once('finish', socket.destroy);

	  socket.end(
	    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
	      Object.keys(headers)
	        .map((h) => `${h}: ${headers[h]}`)
	        .join('\r\n') +
	      '\r\n\r\n' +
	      message
	  );
	}

	/**
	 * Emit a `'wsClientError'` event on a `WebSocketServer` if there is at least
	 * one listener for it, otherwise call `abortHandshake()`.
	 *
	 * @param {WebSocketServer} server The WebSocket server
	 * @param {http.IncomingMessage} req The request object
	 * @param {Duplex} socket The socket of the upgrade request
	 * @param {Number} code The HTTP response status code
	 * @param {String} message The HTTP response body
	 * @param {Object} [headers] The HTTP response headers
	 * @private
	 */
	function abortHandshakeOrEmitwsClientError(
	  server,
	  req,
	  socket,
	  code,
	  message,
	  headers
	) {
	  if (server.listenerCount('wsClientError')) {
	    const err = new Error(message);
	    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);

	    server.emit('wsClientError', err, socket, req);
	  } else {
	    abortHandshake(socket, code, message, headers);
	  }
	}
	return websocketServer;
}

var websocketServerExports = requireWebsocketServer();
var WebSocketServer = /*@__PURE__*/getDefaultExportFromCjs(websocketServerExports);

function getTestFileEnvironment(project, testFile, browser = false) {
	if (browser) return project.vite.environments.client;
	else for (const name in project.vite.environments) {
		const env = project.vite.environments[name];
		if (env.moduleGraph.getModuleById(testFile)) return env;
	}
}

async function getModuleGraph(ctx, projectName, testFilePath, viteEnvironment) {
	const project = ctx.getProjectByName(projectName);
	const environment = findModuleGraphEnvironment(project, testFilePath, viteEnvironment);
	if (!environment) throw new Error(`Cannot find environment for ${testFilePath}`);
	const collector = createModuleGraphCollector(project, environment);
	const roots = collector.add(testFilePath);
	return {
		modules: collector.data.modules,
		roots
	};
}
function findModuleGraphEnvironment(project, testFilePath, viteEnvironment) {
	if (viteEnvironment) return project.vite.environments[viteEnvironment];
	return project.config.experimental.viteModuleRunner === false ? project.vite.environments.__vitest__ : getTestFileEnvironment(project, testFilePath, project.config.browser.enabled);
}
function createModuleGraphCollector(project, environment) {
	const data = {
		modules: {},
		rootsByTestFile: {}
	};
	const browser = project.config.browser.enabled;
	const seen = /* @__PURE__ */ new Map();
	function addExternal(id) {
		data.modules[id] ??= {
			external: true,
			imports: []
		};
		return id;
	}
	function get(mod) {
		if (!mod || !mod.id) return;
		if (mod.id === "\0vitest/browser" || mod.id.includes("plugin-vue:export-helper")) return;
		if (seen.has(mod)) return seen.get(mod);
		const id = clearId(mod.id);
		seen.set(mod, id);
		if (id.startsWith("__vite-browser-external:")) return addExternal(id.slice(24));
		if (isBuiltin(id)) return addExternal(id);
		const external = project._resolver.wasExternalized(id);
		if (typeof external === "string") return addExternal(external);
		if (browser && mod.file?.includes(project.browser.vite.config.cacheDir)) return addExternal(id);
		data.modules[id] = {
			external: false,
			imports: []
		};
		data.modules[id].imports = Array.from(mod.importedModules).filter((i) => i.id && !i.id.includes("/vitest/dist/")).map((m) => get(m)).filter((id) => id != null);
		return id;
	}
	// graph roots of the test file including setup files
	function add(testFilePath) {
		const roots = [testFilePath, ...project.config.setupFiles].map((file) => get(environment.moduleGraph.getModuleById(file))).filter((id) => id != null);
		data.rootsByTestFile[testFilePath] = roots;
		return roots;
	}
	return {
		data,
		add
	};
}
function clearId(id) {
	return id?.replace(/\?v=\w+$/, "") || "";
}

// Serialization support utils.
function cloneByOwnProperties(value) {
	// Clones the value's properties into a new Object. The simpler approach of
	// Object.assign() won't work in the case that properties are not enumerable.
	return Object.getOwnPropertyNames(value).reduce((clone, prop) => {
		clone[prop] = value[prop];
		return clone;
	}, {});
}
/**
* Replacer function for serialization methods such as JS.stringify() or
* flatted.stringify().
*/
function stringifyReplace(key, value) {
	if (value instanceof Error) {
		const cloned = cloneByOwnProperties(value);
		return {
			name: value.name,
			message: value.message,
			stack: value.stack,
			...cloned
		};
	} else return value;
}

function isValidApiRequest(config, req) {
	const url = new URL(req.url ?? "", "http://localhost");
	// validate token. token is injected in ui/tester/orchestrator html, which is cross origin protected.
	try {
		const token = url.searchParams.get("token");
		if (token && crypto.timingSafeEqual(Buffer.from(token), Buffer.from(config.api.token))) return true;
	} 
	// an error is thrown when the length is incorrect
catch {}
	return false;
}

function setup(ctx, _server) {
	const wss = new WebSocketServer({
		noServer: true,
		// Emit one message per event loop, allowing the server to fairly distribute
		// received messages from clients in the main thread.
		// Otherwise, a client that floods its connection will saturate the main thread,
		// delaying message handling, leading to timeouts.
		allowSynchronousEvents: false
	});
	const clients = /* @__PURE__ */ new Map();
	(_server || ctx.vite).httpServer?.on("upgrade", (request, socket, head) => {
		if (!request.url) return;
		const { pathname } = new URL(request.url, "http://localhost");
		if (pathname !== API_PATH) return;
		if (!isValidApiRequest(ctx.config, request)) {
			socket.destroy();
			return;
		}
		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit("connection", ws, request);
			setupClient(ws);
		});
	});
	function setupClient(ws) {
		const rpc = createBirpc({
			getFiles() {
				return ctx.state.getFiles();
			},
			getPaths() {
				return ctx.state.getPaths();
			},
			async readTestFile(id) {
				if (!ctx.state.filesMap.has(id) || !existsSync(id)) return null;
				return promises.readFile(id, "utf-8");
			},
			async saveTestFile(id, content) {
				if (!ctx.state.filesMap.has(id) || !existsSync(id)) throw new Error(`Test file "${id}" was not registered, so it cannot be updated using the API.`);
				// silently ignore write attempts if not allowed
				if (!ctx.config.api.allowWrite) return;
				return promises.writeFile(id, content, "utf-8");
			},
			async rerun(files, resetTestNamePattern) {
				// silently ignore exec attempts if not allowed
				if (!ctx.config.api.allowExec) return;
				await ctx.rerunFiles(files, void 0, true, resetTestNamePattern);
			},
			async rerunTask(id) {
				// silently ignore exec attempts if not allowed
				if (!ctx.config.api.allowExec) return;
				await ctx.rerunTask(id);
			},
			getConfig() {
				return ctx.serializedRootConfig;
			},
			getResolvedProjectLabels() {
				return ctx.projects.map((p) => ({
					name: p.name,
					color: p.color
				}));
			},
			async getExternalResult(moduleId, testFileTaskId) {
				const testModule = ctx.state.getReportedEntityById(testFileTaskId);
				if (!testModule) return;
				if (!isFileServingAllowed(testModule.project.vite.config, moduleId)) return;
				const result = {};
				try {
					result.source = await promises.readFile(moduleId, "utf-8");
				} catch {}
				return result;
			},
			async getTransformResult(projectName, moduleId, testFileTaskId) {
				const project = ctx.getProjectByName(projectName);
				const testModule = ctx.state.getReportedEntityById(testFileTaskId);
				if (!testModule || !isFileServingAllowed(project.vite.config, moduleId)) return;
				const browser = !!project.config.browser.enabled;
				const environment = getTestFileEnvironment(project, testModule.moduleId, browser);
				const moduleNode = environment?.moduleGraph.getModuleById(moduleId);
				if (!environment || !moduleNode?.transformResult) return;
				const result = moduleNode.transformResult;
				try {
					result.source = result.source || (moduleNode.file ? await promises.readFile(moduleNode.file, "utf-8") : void 0);
				} catch {}
				// TODO: store this in HTML reporter separately
				const transformDuration = ctx.state.metadata[projectName]?.duration[moduleNode.url]?.[0];
				if (transformDuration != null) result.transformTime = transformDuration;
				try {
					const diagnostic = await ctx.experimental_getSourceModuleDiagnostic(moduleId, testModule);
					result.modules = diagnostic.modules;
					result.untrackedModules = diagnostic.untrackedModules;
				} catch {}
				return result;
			},
			async getModuleGraph(project, id, viteEnvironment) {
				return getModuleGraph(ctx, project, id, viteEnvironment);
			},
			async updateSnapshot(file) {
				// silently ignore exec/write attempts if not allowed
				// this function both executes the code and write snapshots
				if (!ctx.config.api.allowExec || !ctx.config.api.allowWrite) return;
				if (!file) await ctx.updateSnapshot();
				else await ctx.updateSnapshot([file.filepath]);
			},
			getUnhandledErrors() {
				return ctx.state.getUnhandledErrors();
			},
			async getTestFiles() {
				return (await ctx.globTestSpecifications()).map((spec) => [
					{
						name: spec.project.config.name,
						root: spec.project.config.root
					},
					spec.moduleId,
					{ pool: spec.pool }
				]);
			}
		}, {
			post: (msg) => ws.send(msg),
			on: (fn) => ws.on("message", fn),
			eventNames: [
				"onUserConsoleLog",
				"onFinished",
				"onFinishedReportCoverage",
				"onCollected",
				"onTaskUpdate",
				"onTestRemoved"
			],
			serialize: (data) => stringify(data, stringifyReplace),
			deserialize: parse,
			timeout: -1
		});
		clients.set(ws, rpc);
		ws.on("close", () => {
			clients.delete(ws);
			rpc.$close(/* @__PURE__ */ new Error("[vitest-api]: Pending methods while closing rpc"));
		});
	}
	ctx.reporters.push(new WebSocketReporter(ctx, wss, clients));
}
class WebSocketReporter {
	ctx;
	wss;
	clients;
	start = 0;
	end = 0;
	constructor(ctx, wss, clients) {
		this.ctx = ctx;
		this.wss = wss;
		this.clients = clients;
	}
	onTestModuleCollected(testModule) {
		if (this.clients.size === 0) return;
		this.clients.forEach((client) => {
			client.onCollected?.([testModule.task])?.catch?.(noop);
		});
	}
	onTestRunStart(specifications) {
		if (this.clients.size === 0) return;
		this.start = performance$1.now();
		const serializedSpecs = specifications.map((spec) => spec.toJSON());
		this.clients.forEach((client) => {
			client.onSpecsCollected?.(serializedSpecs)?.catch?.(noop);
		});
	}
	async onTestCaseAnnotate(testCase, annotation) {
		if (this.clients.size === 0) return;
		this.clients.forEach((client) => {
			client.onTestAnnotate?.(testCase.id, annotation)?.catch?.(noop);
		});
	}
	async onTestCaseArtifactRecord(testCase, artifact) {
		if (this.clients.size === 0) return;
		this.clients.forEach((client) => {
			client.onTestArtifactRecord?.(testCase.id, artifact)?.catch?.(noop);
		});
	}
	async onTaskUpdate(packs, events) {
		if (this.clients.size === 0) return;
		this.clients.forEach((client) => {
			client.onTaskUpdate?.(packs, events)?.catch?.(noop);
		});
	}
	onTestRemoved(trigger) {
		if (this.clients.size === 0) return;
		this.clients.forEach((client) => {
			client.onTestRemoved?.(trigger)?.catch?.(noop);
		});
	}
	sum(items, cb) {
		return items.reduce((total, next) => {
			return total + Math.max(cb(next) || 0, 0);
		}, 0);
	}
	onTestRunEnd(testModules, unhandledErrors) {
		if (!this.clients.size) return;
		const files = testModules.map((testModule) => testModule.task);
		const errors = [...unhandledErrors];
		this.end = performance$1.now();
		const blobs = this.ctx.state.blobs;
		// Execution time is either sum of all runs of `--merge-reports` or the current run's time
		const executionTime = blobs?.executionTimes ? this.sum(blobs.executionTimes, (time) => time) : this.end - this.start;
		this.clients.forEach((client) => {
			client.onFinished?.(files, errors, void 0, executionTime)?.catch?.(noop);
		});
	}
	onFinishedReportCoverage() {
		this.clients.forEach((client) => {
			client.onFinishedReportCoverage?.()?.catch?.(noop);
		});
	}
	onUserConsoleLog(log) {
		this.clients.forEach((client) => {
			client.onUserConsoleLog?.(log)?.catch?.(noop);
		});
	}
}

class BrowserSessions {
	sessions = /* @__PURE__ */ new Map();
	sessionIds = /* @__PURE__ */ new Set();
	// a page can outlive the close of its session and reconnect
	closedSessionIds = /* @__PURE__ */ new Set();
	getSession(sessionId) {
		return this.sessions.get(sessionId);
	}
	destroySession(sessionId) {
		this.sessions.delete(sessionId);
	}
	close(sessionId) {
		this.sessions.delete(sessionId);
		this.sessionIds.delete(sessionId);
		this.closedSessionIds.add(sessionId);
	}
	createSession(sessionId, project, pool, options) {
		// this promise waits until the orchestrator is ready to accept RPC calls
		const defer = createDefer();
		let isConnected = false;
		let isReady = false;
		const timeout = setTimeout(() => {
			defer.reject(/* @__PURE__ */ new Error(`Failed to connect to the browser session "${sessionId}" [${project.name}] within the timeout.`));
		}, project.config.browser.connectTimeout ?? 6e4).unref();
		const resolveIfReady = () => {
			if (!isConnected || !isReady) return;
			defer.resolve();
			clearTimeout(timeout);
		};
		this.sessions.set(sessionId, {
			project,
			otelCarrier: options?.otelCarrier,
			// assigned by the pool on the session's first run, freed when it disconnects
			concurrencyId: 0,
			connected: () => {
				isConnected = true;
				resolveIfReady();
			},
			ready: () => {
				isReady = true;
				resolveIfReady();
			},
			// this fails the whole test run and cancels the pool
			fail: (error) => {
				defer.resolve();
				clearTimeout(timeout);
				pool.reject(error);
			}
		});
		return defer;
	}
}

const builtinEnvironments = /* @__PURE__ */ new Set([
	"node",
	"jsdom",
	"happy-dom",
	"edge-runtime"
]);
const clientEnvironments = /* @__PURE__ */ new Set(["jsdom", "happy-dom"]);
const noMocks = /* @__PURE__ */ new Set();
/**
* Finds test specifications that statically depend on any of the changed files.
*/
class AffectedModulesResolver {
	vitest;
	specs;
	existsCache = /* @__PURE__ */ new Map();
	transformConcurrency = os__default.availableParallelism();
	activeTransforms = 0;
	transformQueue = [];
	related = [];
	// set while `getDependencies` walks the graph
	walked;
	constructor(vitest, specs) {
		this.vitest = vitest;
		this.specs = specs;
	}
	// the graph is only known after transforming it, so it is walked once without changes
	async getDependencies() {
		this.walked = /* @__PURE__ */ new Set();
		await this.getAffectedSpecifications([]);
		const files = new Set(Array.from(this.walked, (id) => cleanUrl(id)));
		this.walked = void 0;
		return Array.from(files, (file) => ({ file }));
	}
	async getAffectedSpecifications(related) {
		this.related = related;
		const specs = this.specs;
		if (this.dependsOnConfig(this.vitest.vite.config.configFileDependencies)) return specs;
		// the module graph, and so the dependency edges, are per project
		const specsByProject = /* @__PURE__ */ new Map();
		for (const spec of specs) {
			let projectSpecs = specsByProject.get(spec.project);
			if (!projectSpecs) specsByProject.set(spec.project, projectSpecs = []);
			projectSpecs.push(spec);
		}
		const affected = await Promise.all(Array.from(specsByProject, ([project, projectSpecs]) => this.findAffectedInProject(project, projectSpecs)));
		const affectedSpecs = new Set(affected.flat());
		return specs.filter((spec) => affectedSpecs.has(spec));
	}
	async findAffectedInProject(project, specs) {
		if (this.dependsOnConfig(project.vite.config.configFileDependencies) || this.dependsOnConfig(getEnvFiles(project))) return specs;
		// global setup and environments are loaded by Vitest itself, not by the test's module runner
		const vitestWalk = new GraphWalk(new ProjectGraph(project, project.vite.environments.__vitest__, this), this.related);
		const vitestFiles = this.filterLocalSourceFiles([...project.config.globalSetup, await this.resolveEnvironmentFile(project, project.config.environment)]);
		const environmentFiles = await Promise.all(specs.map((spec) => this.getSpecificationEnvironmentFile(spec)));
		await vitestWalk.add([...vitestFiles, ...environmentFiles.filter((file) => file != null)], noMocks);
		// if global setup or a setup file is changed, run all specs
		const affectedByVitest = vitestWalk.getAffected(noMocks);
		if (vitestFiles.some((file) => affectedByVitest.has(file))) return specs;
		// walk the graph of the environment that runs the test, so the run reuses the transforms
		const affected = [];
		const related = new Set(this.related);
		const snapshotContext = { config: project.serializedConfig };
		const environments = await Promise.all(specs.map((spec) => this.getViteEnvironment(spec)));
		const specsByEnvironment = /* @__PURE__ */ new Map();
		specs.forEach((spec, index) => {
			// always run the spec if environment file is updated
			const environmentFile = environmentFiles[index];
			if (environmentFile && affectedByVitest.has(environmentFile) || related.has(this.getSnapshotFile(spec, snapshotContext))) {
				affected.push(spec);
				return;
			}
			let environmentSpecs = specsByEnvironment.get(environments[index]);
			if (!environmentSpecs) specsByEnvironment.set(environments[index], environmentSpecs = []);
			environmentSpecs.push(spec);
		});
		const affectedInEnvironments = await Promise.all(Array.from(specsByEnvironment, ([environment, environmentSpecs]) => this.findAffectedInEnvironment(project, environment, environmentSpecs)));
		return [...affected, ...affectedInEnvironments.flat()];
	}
	getSnapshotFile(spec, context) {
		const path = this.vitest.snapshot.resolvePath(spec.moduleId, context);
		return resolve(spec.project.config.root, path);
	}
	// mirrors the `viteEnvironment` of the builtin environments, custom ones are only known in the worker
	async getViteEnvironment(spec) {
		const environments = spec.project.vite.environments;
		if (spec.pool === "browser") return environments.ssr;
		const { environment } = await getSpecificationDocblock(spec);
		return clientEnvironments.has(environment.name) && environments.client || environments.ssr;
	}
	async findAffectedInEnvironment(project, environment, specs) {
		const graph = new ProjectGraph(project, environment, this);
		const config = project.config;
		// setup files are walked without mocks: a mock only applies to the files loaded after it
		const setupFiles = this.filterLocalSourceFiles(config.setupFiles);
		const projectFiles = this.filterLocalSourceFiles([
			...setupFiles,
			...config.snapshotSerializers,
			config.runner,
			config.snapshotEnvironment,
			typeof config.diff === "string" ? config.diff : void 0
		]);
		const walk = new GraphWalk(graph, this.related);
		await walk.add(projectFiles, noMocks);
		// the project files are fully walked at this point, so later walks can't change the result
		const affectedByProjectFiles = walk.getAffected(noMocks);
		if (projectFiles.some((file) => affectedByProjectFiles.has(file))) return specs;
		// mocks from setup files apply to every test file of the project
		const projectMocks = /* @__PURE__ */ new Set();
		(await Promise.all(setupFiles.map((file) => graph.getMocks(file)))).forEach(({ mocked }) => mocked.forEach((id) => projectMocks.add(id)));
		const specMocks = /* @__PURE__ */ new Map();
		await Promise.all(specs.map(async (spec) => {
			const { mocked, restored } = await graph.getMocks(spec.moduleId);
			if (!mocked.size && !restored.size) return;
			const specMocked = /* @__PURE__ */ new Set([...projectMocks, ...mocked]);
			restored.forEach((id) => specMocked.delete(id));
			specMocks.set(spec, specMocked);
		}));
		await Promise.all(specs.map((spec) => walk.add([spec.moduleId], specMocks.get(spec) ?? projectMocks)));
		const affected = walk.getAffected(projectMocks);
		// a test can load a module that a setup file mocks, so its walk is not limited by those mocks
		const affectedWithoutMocks = specMocks.size ? walk.getAffected(noMocks) : affected;
		return specs.filter((spec) => {
			const mocked = specMocks.get(spec);
			if (!mocked) return affected.has(spec.moduleId);
			return affectedWithoutMocks.has(spec.moduleId) && walk.reachesChange(spec.moduleId, mocked, affectedWithoutMocks);
		});
	}
	dependsOnConfig(configDependencies) {
		return !!configDependencies?.some((file) => this.related.includes(file));
	}
	filterLocalSourceFiles(files) {
		return files.filter((file) => !!file && this.isLocalSourceFile(file));
	}
	async getSpecificationEnvironmentFile(spec) {
		if (spec.pool === "browser") return null;
		const { environment } = await getSpecificationDocblock(spec);
		if (environment.name === spec.project.config.environment) return null;
		const file = await this.resolveEnvironmentFile(spec.project, environment.name);
		return file && this.isLocalSourceFile(file) ? file : null;
	}
	// mirrors how the environment is loaded in the worker
	async resolveEnvironmentFile(project, name) {
		if (builtinEnvironments.has(name)) return null;
		const root = project.config.root;
		if (name[0] === "." || isAbsolute(name)) return resolve(root, name);
		const resolved = await project.vite.environments.__vitest__.pluginContainer.resolveId(`vitest-environment-${name}`, void 0).catch(() => null);
		return resolved ? cleanUrl(resolved.id) : resolve(root, name);
	}
	// an existing file outside of node_modules, dependency changes are not tracked
	isLocalSourceFile(filepath) {
		if (filepath.includes("node_modules")) return false;
		const cached = this.existsCache.get(filepath);
		if (cached !== void 0) return cached;
		const exists = existsSync(filepath);
		this.existsCache.set(filepath, exists);
		return exists;
	}
	// limit concurrency to lower peak memory usage on large graphs
	async withTransformLimit(fn) {
		if (this.activeTransforms >= this.transformConcurrency) await new Promise((resolve) => this.transformQueue.push(resolve));
		this.activeTransforms++;
		try {
			return await fn();
		} finally {
			this.activeTransforms--;
			this.transformQueue.shift()?.();
		}
	}
}
// files loaded into `import.meta.env`, mirrors Vite's `loadEnv`
function getEnvFiles(project) {
	const { envDir, mode } = project.vite.config;
	if (typeof envDir !== "string") return [];
	return [
		".env",
		".env.local",
		`.env.${mode}`,
		`.env.${mode}.local`
	].map((file) => resolve(envDir, file));
}
/**
* Transforms every module of a project's Vite environment at most once, no matter how many walks reach it.
*/
class ProjectGraph {
	project;
	environment;
	resolver;
	modules = /* @__PURE__ */ new Map();
	constructor(project, environment, resolver) {
		this.project = project;
		this.environment = environment;
		this.resolver = resolver;
	}
	getModule(id) {
		let node = this.modules.get(id);
		if (!node) {
			node = this.loadModule(id);
			this.modules.set(id, node);
		}
		return node;
	}
	/**
	* Modules that are never loaded when `id` hoists its mocks, and modules that `id` loads even if they are mocked.
	*/
	async getMocks(id) {
		const node = await this.getModule(id);
		return {
			mocked: node?.mocked ?? /* @__PURE__ */ new Set(),
			restored: node?.restored ?? /* @__PURE__ */ new Set()
		};
	}
	// a module that fails to load is treated as affected, so its tests run and report the error
	async loadModule(id) {
		try {
			return await this.transformModule(id);
		} catch {
			return {
				dependencies: [],
				watchedFiles: [],
				mocked: /* @__PURE__ */ new Set(),
				restored: /* @__PURE__ */ new Set(),
				failed: true
			};
		}
	}
	async transformModule(id) {
		const transformed = this.environment.moduleGraph.getModuleById(id)?.transformResult || await this.resolver.withTransformLimit(() => this.project._transformService.transform(id, this.environment));
		if (!transformed) return null;
		const { replaced, redirects, restored } = await resolveStaticMocks(this.environment, this.project.config, id, getStaticMocks(this.environment, id, transformed));
		// `deps` only has the imports, the other modules were added by plugins with `addWatchFile`
		const imports = /* @__PURE__ */ new Set([...transformed.deps || [], ...transformed.dynamicDeps || []]);
		const dependencies = [];
		const watchedFiles = [];
		let failed = false;
		// ids keep the query, so `./file.txt?raw` is walked as its own module
		this.environment.moduleGraph.getModuleById(id)?.importedModules.forEach((imported) => {
			// a dynamic import of a missing file can be caught, a static one always fails
			if (isMissingFile(imported) && transformed.deps?.includes(imported.url)) failed = true;
			else if (imported.id && imported.file && this.resolver.isLocalSourceFile(imported.file)) (imports.has(imported.url) ? dependencies : watchedFiles).push(imported.id);
		});
		[...redirects, ...restored].forEach((file) => {
			if (this.resolver.isLocalSourceFile(file) && !dependencies.includes(file)) dependencies.push(file);
		});
		return {
			dependencies,
			watchedFiles,
			mocked: new Set(Array.from(replaced, (mockedId) => cleanUrl(mockedId))),
			restored: new Set(Array.from(restored, (restoredId) => cleanUrl(restoredId))),
			failed
		};
	}
}
// in SSR, Vite keeps an import it can't resolve as is, a bare one can still be loaded by Node
function isMissingFile(mod) {
	return mod.id?.[0] === "." || mod.meta?.["vite:alias"]?.noResolved === true;
}
/**
* Walks the module graph once for every root, skipping a module only when every walk that reaches it mocks it.
*/
class GraphWalk {
	graph;
	dependencies = /* @__PURE__ */ new Map();
	importers = /* @__PURE__ */ new Map();
	// modules mocked by every root that reaches the module, so they are not walked from it
	mockedByAll = /* @__PURE__ */ new Map();
	changed;
	constructor(graph, related) {
		this.graph = graph;
		this.changed = new Set(related);
	}
	async add(roots, mocked) {
		await Promise.all(roots.map((root) => this.addModule(root, mocked)));
	}
	// modules that import a changed file through modules that are not in `mocked`
	getAffected(mocked) {
		const affected = /* @__PURE__ */ new Set();
		for (const id of this.changed) if (!mocked.has(id)) affected.add(id);
		const queue = [...affected];
		while (queue.length) {
			const importedBy = this.importers.get(queue.pop());
			if (!importedBy) continue;
			for (const importer of importedBy) if (!affected.has(importer) && !mocked.has(importer)) {
				affected.add(importer);
				queue.push(importer);
			}
		}
		return affected;
	}
	// whether `id` imports a changed file without passing through `mocked`,
	// only modules in `affected` can lead to a change
	reachesChange(id, mocked, affected) {
		const visited = /* @__PURE__ */ new Set([id]);
		const stack = [id];
		while (stack.length) {
			const current = stack.pop();
			if (this.changed.has(current)) return true;
			for (const dep of this.dependencies.get(current) ?? []) if (affected.has(dep) && !mocked.has(dep) && !visited.has(dep)) {
				visited.add(dep);
				stack.push(dep);
			}
		}
		return false;
	}
	async addModule(id, mocked) {
		const previous = this.mockedByAll.get(id);
		if (previous) {
			if (isSubset(previous, mocked)) return;
			mocked = new Set([...previous].filter((mockedId) => mocked.has(mockedId)));
		}
		this.mockedByAll.set(id, mocked);
		const node = await this.graph.getModule(id);
		if (!node) return;
		this.graph.resolver.walked?.add(id);
		node.watchedFiles.forEach((file) => this.graph.resolver.walked?.add(file));
		// a file imported with a query is a separate module
		if (node.failed || this.changed.has(cleanUrl(id))) this.changed.add(id);
		this.dependencies.set(id, node.watchedFiles.length ? [...node.dependencies, ...node.watchedFiles] : node.dependencies);
		node.watchedFiles.forEach((file) => this.addImporter(file, id));
		await Promise.all(node.dependencies.map((dep) => {
			this.addImporter(dep, id);
			return mocked.has(dep) ? void 0 : this.addModule(dep, mocked);
		}));
	}
	addImporter(id, importer) {
		let importedBy = this.importers.get(id);
		if (!importedBy) this.importers.set(id, importedBy = /* @__PURE__ */ new Set());
		importedBy.add(importer);
	}
}
function isSubset(subset, set) {
	for (const item of subset) if (!set.has(item)) return false;
	return true;
}

const debug$2 = createDebugger("vitest:cache:tag");
// https://bford.info/cachedir/
const CACHEDIR_TAG = `Signature: 8a477f597d28d172789f06886806bc55
# This file is a cache directory tag created by Vitest.
# For information about cache directory tags see https://bford.info/cachedir/
`;
const taggedDirs = /* @__PURE__ */ new Set();
/**
* Marks a directory that Vitest owns as a cache, so backup tools and task runners
* can skip it. An existing tag is never overwritten. The directory must exist.
*/
function tagCacheDir(dir) {
	if (taggedDirs.has(dir)) return;
	taggedDirs.add(dir);
	try {
		writeFileSync(join(dir, "CACHEDIR.TAG"), CACHEDIR_TAG, { flag: "wx" });
	} catch (error) {
		// the tag is optional and must never fail the run
		if (error?.code !== "EEXIST") debug$2?.(`failed to tag ${dir} as a cache directory: ${error}`);
	}
}
/**
* Tags the directory again the next time it is used, after it was removed.
*/
function forgetCacheDirTag(dir) {
	taggedDirs.delete(dir);
}

const debugFs = createDebugger("vitest:cache:fs");
const debugMemory = createDebugger("vitest:cache:memory");
const cacheComment = "\n//# vitestCache=";
const cacheCommentLength = 17;
const METADATA_FILE = "_metadata.json";
// Default location of the module cache. It lives inside `node_modules` at the
// workspace root so it's shared by every project and is naturally invalidated
// whenever dependencies are reinstalled.
const DEFAULT_CACHE_DIRNAME = ".vitest-cache";
const parallelFsCacheRead = /* @__PURE__ */ new Map();
class FileSystemModuleCache {
	vitest;
	/**
	* Each project can point its module cache at a different directory with
	* `fsModuleCachePath`; projects that don't override it fall back to the root
	* cache. We still keep a single metadata file (in the root cache) for the whole
	* workspace because
	* - projects can reference files between each other
	* - lockfile changes are reflected for the whole workspace, not just for a single project
	*/
	rootCache;
	metadataFilePath;
	version = "1.0.0-beta.9";
	fsCacheRoots = /* @__PURE__ */ new WeakMap();
	fsEnvironmentHashMap = /* @__PURE__ */ new WeakMap();
	fsCacheKeyGenerators = /* @__PURE__ */ new WeakMap();
	warnedDeprecatedIgnore = /* @__PURE__ */ new Set();
	// this exists only to avoid the perf. cost of reading a file and generating a hash again
	// surprisingly, on some machines this has negligible effect
	fsCacheKeys = /* @__PURE__ */ new WeakMap();
	constructor(vitest) {
		this.vitest = vitest;
		this.rootCache = vitest.config.fsModuleCachePath || join(searchForWorkspaceRoot(vitest.viteConfig.root), "node_modules", DEFAULT_CACHE_DIRNAME);
		this.metadataFilePath = join(this.rootCache, METADATA_FILE);
	}
	defineCacheKeyGenerator(config, callback) {
		let generators = this.fsCacheKeyGenerators.get(config);
		if (!generators) {
			generators = /* @__PURE__ */ new Set();
			this.fsCacheKeyGenerators.set(config, generators);
		}
		generators.add(callback);
	}
	// A plugin can exclude itself from the cache key via `api.vitest.ignoreFsModuleCache`.
	ignoresFsModuleCache(plugin) {
		const api = plugin.api?.vitest;
		if (api?.ignoreFsModuleCache === true) return true;
		if (api?.experimental?.ignoreFsModuleCache === true) {
			if (!this.warnedDeprecatedIgnore.has(plugin.name)) {
				this.warnedDeprecatedIgnore.add(plugin.name);
				this.vitest.logger.deprecate(`The plugin "${plugin.name}" sets \`api.vitest.experimental.ignoreFsModuleCache\`, which is deprecated. Use \`api.vitest.ignoreFsModuleCache\` instead.`);
			}
			return true;
		}
		return false;
	}
	async clearCache(log = true) {
		const fsCachePaths = [this.rootCache, ...this.vitest.projects.map((r) => r.config.fsModuleCachePath || this.rootCache)];
		const uniquePaths = Array.from(new Set(fsCachePaths));
		uniquePaths.forEach(forgetCacheDirTag);
		await Promise.all(uniquePaths.map((directory) => removeDirectory(directory)));
		if (log) this.vitest.logger.log(`[cache] cleared fs module cache at ${uniquePaths.join(", ")}`);
	}
	readCachedFileConcurrently(cachedFilePath) {
		if (!parallelFsCacheRead.has(cachedFilePath)) parallelFsCacheRead.set(cachedFilePath, readFile(cachedFilePath, "utf-8").then((code) => {
			const matchIndex = code.lastIndexOf(cacheComment);
			if (matchIndex === -1) {
				debugFs?.(`${$.red("[empty]")} ${cachedFilePath} exists, but doesn't have a ${cacheComment} comment, transforming by vite instead`);
				return;
			}
			return {
				code,
				meta: this.fromBase64(code.slice(matchIndex + cacheCommentLength))
			};
		}).finally(() => {
			parallelFsCacheRead.delete(cachedFilePath);
		}));
		return parallelFsCacheRead.get(cachedFilePath);
	}
	async getCachedModule(cachedFilePath) {
		if (!existsSync(cachedFilePath)) {
			debugFs?.(`${$.red("[empty]")} ${cachedFilePath} doesn't exist, transforming by vite first`);
			return;
		}
		const fileResult = await this.readCachedFileConcurrently(cachedFilePath);
		if (!fileResult) return;
		const { code, meta } = fileResult;
		debugFs?.(`${$.green("[read]")} ${meta.id} is cached in ${cachedFilePath}`);
		return {
			id: meta.id,
			file: meta.file,
			code,
			imports: meta.imports,
			mappings: meta.mappings,
			moduleType: meta.moduleType,
			deps: meta.deps,
			dynamicDeps: meta.dynamicDeps,
			staticMocks: meta.staticMocks,
			hasCoverageData: meta.hasCoverageData,
			coverageData: meta.hasCoverageData ? await readCoverageData(cachedFilePath) : void 0
		};
	}
	async saveCachedModule(cachedFilePath, fetchResult, transformResult, imports = {
		urls: [],
		ids: {}
	}, mappings = false, coverageData) {
		if ("code" in fetchResult) {
			const result = {
				file: fetchResult.file,
				id: fetchResult.id,
				imports,
				mappings,
				moduleType: fetchResult.moduleType,
				deps: transformResult?.deps,
				dynamicDeps: transformResult?.dynamicDeps,
				staticMocks: transformResult?.__vitestStaticMocks,
				hasCoverageData: coverageData !== void 0
			};
			debugFs?.(`${$.yellow("[write]")} ${fetchResult.id} is cached in ${cachedFilePath}`);
			await Promise.all([result.hasCoverageData && atomicWriteFile(getCoverageDataPath(cachedFilePath), JSON.stringify(coverageData)), atomicWriteFile(cachedFilePath, `${fetchResult.code}${cacheComment}${this.toBase64(result)}`)]);
		}
	}
	getCoverageData(environment, id) {
		const coverageProvider = this.vitest.coverageProvider;
		if (!this.vitest.config.coverage.enabled || !coverageProvider?.requiresTransform?.(id)) return;
		return coverageProvider.getModuleCacheData?.(environment, id);
	}
	/**
	* Passes the data of the coverage provider back to it when the cached module is used
	*/
	restoreCoverageData(environment, id, data) {
		this.vitest.coverageProvider?.restoreModuleCacheData?.(environment, id, data);
	}
	toBase64(obj) {
		const json = stringify(obj);
		return Buffer.from(json).toString("base64");
	}
	fromBase64(obj) {
		const json = Buffer.from(obj, "base64").toString("utf-8");
		return parse(json);
	}
	invalidateCachePath(environment, id) {
		debugFs?.(`cache for ${id} in ${environment.name} environment is invalidated`);
		this.fsCacheKeys.get(environment)?.delete(id);
	}
	invalidateAllCachePaths(environment) {
		debugFs?.(`the ${environment.name} environment cache is invalidated`);
		this.fsCacheKeys.get(environment)?.clear();
	}
	getMemoryCachePath(environment, id) {
		const result = this.fsCacheKeys.get(environment)?.get(id);
		if (result != null) debugMemory?.(`${$.green("[read]")} ${id} was cached in ${result}`);
		else if (result === null) debugMemory?.(`${$.green("[read]")} ${id} was bailed out`);
		return result;
	}
	/** Returns null when the cache directory cannot be created. */
	getCacheRoot(vitestConfig) {
		if (this.fsCacheRoots.has(vitestConfig)) return this.fsCacheRoots.get(vitestConfig) ?? null;
		let cacheRoot = vitestConfig.fsModuleCachePath || this.rootCache;
		try {
			mkdirSync(cacheRoot, { recursive: true });
			tagCacheDir(cacheRoot);
		} catch (error) {
			const reason = error instanceof Error ? error.message : String(error);
			this.vitest.logger.warn(withLabel("yellow", "Vitest", `fsModuleCache is enabled, but its directory "${cacheRoot}" could not be created (${reason}). Continuing without caching modules on disk. Set \`fsModuleCache: false\` to disable the cache and this warning.`));
			cacheRoot = null;
		}
		this.fsCacheRoots.set(vitestConfig, cacheRoot);
		return cacheRoot;
	}
	generateCachePath(vitestConfig, environment, id, fileContent) {
		const cacheRoot = this.getCacheRoot(vitestConfig);
		if (cacheRoot == null) return null;
		// bail out if file has a glob import because it depends on other files
		// TODO: figure out a way to still support it
		if (hasGlobImport(fileContent, environment.config.consumer)) {
			this.saveMemoryCache(environment, id, null);
			debugMemory?.(`${$.yellow("[write]")} ${id} was bailed out because it has a glob import`);
			return null;
		}
		let hashString = "";
		for (const generator of this.fsCacheKeyGenerators.get(vitestConfig) || []) {
			const result = generator({
				environment,
				id,
				sourceCode: fileContent
			});
			if (typeof result === "string") hashString += result;
			if (result === false) {
				this.saveMemoryCache(environment, id, null);
				debugMemory?.(`${$.yellow("[write]")} ${id} was bailed out by a custom generator`);
				return null;
			}
		}
		const config = environment.config;
		// coverage provider is dynamic, so we also clear the whole cache if
		// vitest.enableCoverage/vitest.disableCoverage is called
		const coverageProvider = this.vitest.coverageProvider;
		const coverageAffectsCache = this.vitest.config.coverage.enabled && coverageProvider?.requiresTransform?.(id) ? `${coverageProvider.name}@${coverageProvider.version}` : "false";
		let environmentHash = this.fsEnvironmentHashMap.get(environment);
		if (!environmentHash) {
			const cacheConfig = JSON.stringify({
				root: config.root,
				// at the moment, Vitest always forces base to be /
				base: config.base,
				mode: config.mode,
				consumer: config.consumer,
				resolve: config.resolve,
				injectCjsGlobal: vitestConfig.injectCjsGlobals,
				// plugins can have different options, so this is not the best key,
				// but we cannot access the options because there is no standard API for it
				plugins: config.plugins.filter((p) => !this.ignoresFsModuleCache(p)).map((p) => p.name),
				// in case local plugins change
				// configFileDependencies also includes configFile
				configFileDependencies: config.configFileDependencies.map((file) => tryReadFileSync(file)),
				environment: environment.name,
				// this affects Vitest CSS plugin
				css: vitestConfig.css
			}, (_, value) => {
				if (typeof value === "function" || value instanceof RegExp) return value.toString();
				return value;
			});
			// everything in the key that does not depend on the module, as one digest
			environmentHash = hash("sha1", (process.env.NODE_ENV ?? "") + this.version + cacheConfig, "hex");
			this.fsEnvironmentHashMap.set(environment, environmentHash);
		}
		// cached code imports optimized deps from `cacheDir` with `?v=<browserHash>`;
		// read live because the optimizer can re-run after `environmentHash` is memoized
		const depsOptimizer = environment.depsOptimizer;
		const optimizerHash = depsOptimizer ? environment.config.cacheDir + depsOptimizer.metadata.browserHash : "";
		hashString += id + fileContent + environmentHash + coverageAffectsCache + optimizerHash;
		const cacheKey = hash("sha1", hashString, "hex");
		const fsResultPath = join(cacheRoot, cacheKey);
		debugMemory?.(`${$.yellow("[write]")} ${id} generated a cache in ${fsResultPath}`);
		this.saveMemoryCache(environment, id, fsResultPath);
		return fsResultPath;
	}
	saveMemoryCache(environment, id, cache) {
		let environmentKeys = this.fsCacheKeys.get(environment);
		if (!environmentKeys) {
			environmentKeys = /* @__PURE__ */ new Map();
			this.fsCacheKeys.set(environment, environmentKeys);
		}
		environmentKeys.set(id, cache);
	}
	async readMetadata() {
		// metadata is shared between every project in the workspace, so we always read it from the root cache
		if (!existsSync(this.metadataFilePath)) return;
		try {
			const content = await readFile(this.metadataFilePath, "utf-8");
			return JSON.parse(content);
		} catch {}
	}
	async writeMetadata(lockfileHash) {
		try {
			if (!existsSync(this.rootCache)) mkdirSync(this.rootCache, { recursive: true });
			tagCacheDir(this.rootCache);
			await writeFile(this.metadataFilePath, JSON.stringify({ lockfileHash }, null, 2), "utf-8");
		} catch (error) {
			// Recording the metadata is best-effort and losing the file shouldn't
			// abort the entire execution
			debugFs?.(`failed to write fs cache metadata: ${error}`);
		}
	}
	// before vitest starts running tests, we check that the lockfile wasn't updated
	// if it was, we nuke the previous cache in case a custom plugin was updated
	// or a new version of vite/vitest is installed
	// for the same reason we also cache config file content, but that won't catch changes made in external plugins
	async ensureCacheIntegrity() {
		if (![this.vitest.getRootProject(), ...this.vitest.projects].some((p) => p.config.fsModuleCache)) return;
		const metadata = await this.readMetadata();
		const currentLockfileHash = getLockfileHash(this.vitest.vite.config.root);
		// no metadata found, just store a new one, don't reset the cache
		if (!metadata) {
			debugFs?.(`fs metadata file was created with hash ${currentLockfileHash}`);
			await this.writeMetadata(currentLockfileHash);
			return;
		}
		// if lockfile didn't change, don't do anything
		if (metadata.lockfileHash === currentLockfileHash) return;
		// lockfile changed, let's clear all caches
		await this.clearCache(false);
		await this.writeMetadata(currentLockfileHash);
		this.vitest.vite.config.logger.info(`fs cache was cleared because lockfile has changed`, {
			timestamp: true,
			environment: $.yellow("[vitest]")
		});
		debugFs?.(`fs cache was cleared because lockfile has changed`);
	}
}
/**
* Performs an atomic write operation using the write-then-rename pattern.
*
* Why we need this:
* - Ensures file integrity by never leaving partially written files on disk
* - Prevents other processes from reading incomplete data during writes
* - Particularly important for test files where incomplete writes could cause test failures
*
* The implementation writes to a temporary file first, then renames it to the target path.
* This rename operation is atomic on most filesystems (including POSIX-compliant ones),
* guaranteeing that other processes will only ever see the complete file.
*
* Added in https://github.com/vitest-dev/vitest/pull/7531
*/
async function atomicWriteFile(realFilePath, data) {
	const dir = dirname(realFilePath);
	const tmpFilePath = join(dir, `.tmp-${Date.now()}-${Math.random().toString(36).slice(2)}`);
	try {
		await writeFile(tmpFilePath, data, "utf-8");
		await rename(tmpFilePath, realFilePath);
	} finally {
		try {
			if (await stat(tmpFilePath)) await unlink(tmpFilePath);
		} catch {}
	}
}
async function removeDirectory(directory) {
	// parallel processes can clear the same cache at once; moving it away first
	// keeps their removal from racing with another process recreating it
	const detachedPath = `${directory}.tmp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
	try {
		await rename(directory, detachedPath);
	} catch (error) {
		if (error?.code === "ENOENT") return;
		// Windows can refuse to rename a directory with open files
		await rm(directory, {
			force: true,
			recursive: true
		});
		return;
	}
	await rm(detachedPath, {
		force: true,
		recursive: true
	});
}
// lockfile hash resolution taken from vite
// since this is experimental, we don't ask to expose it
const lockfileFormats = [
	{
		path: "node_modules/.package-lock.json",
		checkPatchesDir: "patches",
		manager: "npm"
	},
	{
		// Yarn non-PnP
		path: "node_modules/.yarn-state.yml",
		checkPatchesDir: false,
		manager: "yarn"
	},
	{
		// Yarn v3+ PnP
		path: ".pnp.cjs",
		checkPatchesDir: ".yarn/patches",
		manager: "yarn"
	},
	{
		// Yarn v2 PnP
		path: ".pnp.js",
		checkPatchesDir: ".yarn/patches",
		manager: "yarn"
	},
	{
		// yarn 1
		path: "node_modules/.yarn-integrity",
		checkPatchesDir: "patches",
		manager: "yarn"
	},
	{
		path: "node_modules/.pnpm/lock.yaml",
		// Included in lockfile
		checkPatchesDir: false,
		manager: "pnpm"
	},
	{
		path: ".rush/temp/shrinkwrap-deps.json",
		// Included in lockfile
		checkPatchesDir: false,
		manager: "pnpm"
	},
	{
		path: "bun.lock",
		checkPatchesDir: "patches",
		manager: "bun"
	},
	{
		path: "bun.lockb",
		checkPatchesDir: "patches",
		manager: "bun"
	}
].sort((_, { manager }) => {
	return process.env.npm_config_user_agent?.startsWith(manager) ? 1 : -1;
});
const lockfilePaths = lockfileFormats.map((l) => l.path);
function getLockfileHash(root) {
	const lockfilePath = lookupFile(root, lockfilePaths);
	let content = lockfilePath ? fs__default.readFileSync(lockfilePath, "utf-8") : "";
	if (lockfilePath) {
		const normalizedLockfilePath = lockfilePath.replaceAll("\\", "/");
		const lockfileFormat = lockfileFormats.find((f) => normalizedLockfilePath.endsWith(f.path));
		if (lockfileFormat.checkPatchesDir) {
			// Default of https://github.com/ds300/patch-package
			const baseDir = lockfilePath.slice(0, -lockfileFormat.path.length);
			const stat = tryStatSync(join(baseDir, lockfileFormat.checkPatchesDir));
			if (stat?.isDirectory()) content += stat.mtimeMs.toString();
		}
	}
	return hash("sha256", content, "hex").substring(0, 8).padEnd(8, "_");
}
function lookupFile(dir, fileNames) {
	while (dir) {
		for (const fileName of fileNames) {
			const fullPath = join(dir, fileName);
			if (tryStatSync(fullPath)?.isFile()) return fullPath;
		}
		const parentDir = dirname(dir);
		if (parentDir === dir) return;
		dir = parentDir;
	}
}
// Vite expands these templates into `import.meta.glob` calls
const dynamicImportTemplateRE = /\bimport\s*\(\s*`[^`]*\$\{/;
const newUrlTemplateRE = /\bnew\s+URL\s*\(\s*`[^`]*\$\{[^`]*`\s*,\s*import\.meta\.url\b/;
function hasGlobImport(code, consumer) {
	if (code.includes("import.meta.glob")) return true;
	if (!code.includes("${")) return false;
	return dynamicImportTemplateRE.test(code) || consumer === "client" && newUrlTemplateRE.test(code);
}
function tryReadFileSync(file) {
	try {
		return readFileSync(file, "utf-8");
	} catch {
		return "";
	}
}
function tryStatSync(file) {
	try {
		// The "throwIfNoEntry" is a performance optimization for cases where the file does not exist
		return fs__default.statSync(file, { throwIfNoEntry: false });
	} catch {}
}
async function readCoverageData(cachedFilePath) {
	try {
		return JSON.parse(await readFile(getCoverageDataPath(cachedFilePath), "utf-8"));
	} catch {}
}
function getCoverageDataPath(cachedFilePath) {
	return `${cachedFilePath}.coverage.json`;
}

const debug$1 = createDebugger("vitest:cache:results");
const RESULTS_VERSION = 1;
class ResultsCache {
	vitest;
	projects = /* @__PURE__ */ new Map();
	legacyResults;
	recordedModules = /* @__PURE__ */ new WeakSet();
	path;
	// the version of the file that this process read or wrote last
	fileStamp;
	constructor(vitest) {
		this.vitest = vitest;
		this.path = vitest.config.cache ? resolve(vitest.viteConfig.cacheDir, "results.json") : null;
	}
	get(specification) {
		const project = this.projects.get(specification.project.name);
		return (specification.pool === "typescript" ? project?.typecheck : project?.files)?.get(this.getFilePath(specification));
	}
	getByLegacyKey(key) {
		if (!this.legacyResults) {
			this.legacyResults = /* @__PURE__ */ new Map();
			for (const [name, { files }] of this.projects) for (const [file, result] of files) this.legacyResults.set(`${name}:${file}`, result);
		}
		return this.legacyResults.get(key);
	}
	async read() {
		const path = this.path;
		const stamp = path ? await getFileStamp(path) : void 0;
		// the file does not exist, or this process already has its content
		if (!path || !stamp || stamp === this.fileStamp) return;
		this.fileStamp = stamp;
		try {
			const { version, projects } = JSON.parse(await readFile(path, "utf-8"));
			if (version !== RESULTS_VERSION) {
				debug$1?.(`ignored ${this.path}, the version ${version} is not supported`);
				return;
			}
			const results = /* @__PURE__ */ new Map();
			for (const name in projects) {
				const { files, typecheck } = projects[name];
				results.set(name, {
					files: new Map(Object.entries(files ?? {})),
					typecheck: new Map(Object.entries(typecheck ?? {}))
				});
			}
			this.projects = results;
			this.legacyResults = void 0;
		} catch (error) {
			debug$1?.(`failed to read ${this.path}: ${error}`);
		}
	}
	async update(specifications, startTime) {
		// another process could write new results after this one read the file
		await this.read();
		let changed = false;
		for (const specification of specifications) {
			const testModule = specification.testModule;
			const state = testModule?.state();
			// a file that did not start in this run still has the module of a previous run
			if (!testModule || this.recordedModules.has(testModule) || !isFinalState(state)) continue;
			this.recordedModules.add(testModule);
			const project = this.getProjectResults(specification.project.name);
			const results = testModule.meta().typecheck ? project.typecheck : project.files;
			const file = this.getFilePath(specification);
			const previous = results.get(file);
			const failed = state === "failed";
			const duration = Math.max(testModule.diagnostic().duration, 0);
			let record;
			if (!isPartialRun(this.vitest, specification, testModule.task)) {
				record = {
					failed,
					duration,
					lastRun: startTime
				};
				if (failed) setFailedTests(record, getFailedTests(testModule));
			} else if (failed) {
				record = {
					duration,
					...previous,
					failed
				};
				// a file that failed outside of tests stays a whole-file failure until a complete run
				if (!previous?.failed || previous.failedTests) setFailedTests(record, mergeFailedTests(previous?.failedTests, testModule));
			} else if (previous?.failedTests) {
				record = { ...previous };
				setFailedTests(record, mergeFailedTests(previous.failedTests, testModule));
				record.failed = !!record.failedTests;
			} else if (!previous) record = {
				failed,
				duration
			};
			else continue;
			results.set(file, record);
			changed = true;
		}
		if (changed) {
			this.legacyResults = void 0;
			await this.write();
		}
	}
	async clear() {
		this.projects.clear();
		this.legacyResults = void 0;
		this.fileStamp = void 0;
		if (this.path && existsSync(this.path)) {
			await rm(this.path, { force: true });
			this.vitest.logger.log("[cache] cleared results cache at", this.path);
		}
	}
	getFilePath(specification) {
		return getRootRelativePath(this.vitest.config.root, specification.moduleId);
	}
	getProjectResults(name) {
		let project = this.projects.get(name);
		if (!project) {
			project = {
				files: /* @__PURE__ */ new Map(),
				typecheck: /* @__PURE__ */ new Map()
			};
			this.projects.set(name, project);
		}
		return project;
	}
	async write() {
		if (!this.path) return;
		const projects = Object.create(null);
		for (const [name, { files, typecheck }] of this.projects) projects[name] = {
			files: files.size ? Object.fromEntries(files) : void 0,
			typecheck: typecheck.size ? Object.fromEntries(typecheck) : void 0
		};
		const results = {
			version: RESULTS_VERSION,
			projects
		};
		try {
			const cacheDir = dirname(this.path);
			await mkdir(cacheDir, { recursive: true });
			// the cache is in "cacheDir/vitest/<hash>", Vitest owns the "vitest" directory
			tagCacheDir(dirname(cacheDir));
			await atomicWriteFile(this.path, JSON.stringify(results));
			this.fileStamp = await getFileStamp(this.path);
		} catch (error) {
			debug$1?.(`failed to write ${this.path}: ${error}`);
		}
	}
}
function isFinalState(state) {
	return state === "passed" || state === "failed" || state === "skipped";
}
function setFailedTests(record, failedTests) {
	if (failedTests) record.failedTests = failedTests;
	else delete record.failedTests;
}
// returns true if a failure happened outside of tests, for example in a hook
function collectTests(suite, collected) {
	if (suite.errors().length) return true;
	for (const child of suite.children) {
		if (child.type === "suite") {
			if (collectTests(child, collected)) return true;
			continue;
		}
		const state = child.result().state;
		if (state === "failed") collected.failed.push(child.fullName);
		else if (state === "passed") collected.passed.push(child.fullName);
	}
	return false;
}
function getFailedTests(testModule) {
	const collected = {
		failed: [],
		passed: []
	};
	if (collectTests(testModule, collected) || !collected.failed.length) return;
	return collected.failed;
}
// the known failures after a partial run; a test that did not run keeps its state
function mergeFailedTests(previous, testModule) {
	const collected = {
		failed: [],
		passed: []
	};
	if (collectTests(testModule, collected)) return;
	const names = new Set(previous);
	for (const name of collected.passed) names.delete(name);
	for (const name of collected.failed) names.add(name);
	return names.size ? Array.from(names) : void 0;
}
// a partial run does not prove that the whole file passes
function isPartialRun(vitest, specification, task) {
	return !!(vitest.isCancelling || task.containsOnly || specification.testLines?.length || specification.testIds?.length || specification.testNames?.length || specification.testNamePattern || specification.testTagsFilter?.length || vitest.getGlobalTestNamePattern() || vitest.config.tagsFilter?.length);
}
// relative to the root, so the cache is the same in CI and locally
function getRootRelativePath(root, file) {
	// "relative" normalizes both paths, which is slow for thousands of files
	if (file.startsWith(root) && file[root.length] === "/") return file.slice(root.length + 1);
	return relative(root, file);
}
// every write replaces the file, so a write by another process changes the inode
async function getFileStamp(path) {
	const stats = await stat(path).catch(() => void 0);
	return stats && `${stats.ino}:${stats.mtimeMs}:${stats.size}`;
}

const debug = createDebugger("vitest:cache:dependencies");
const DEPENDENCIES_VERSION = 2;
/**
* Stores the modules that every test file loaded during its last run.
*/
class DependenciesCache {
	vitest;
	projects = /* @__PURE__ */ new Map();
	// recorded during the current run, merged into `projects` by `update`
	recordedFiles = /* @__PURE__ */ new Map();
	recordedGlobalSetup = /* @__PURE__ */ new Map();
	path;
	fileStamp;
	constructor(vitest) {
		this.vitest = vitest;
		this.path = vitest.config.cache && vitest.config.experimental.recordDependencies ? resolve(vitest.viteConfig.cacheDir, "dependencies.json") : null;
	}
	get(project) {
		return this.projects.get(project.name);
	}
	record(project, filepath, dependencies) {
		if (!this.path) return;
		let files = this.recordedFiles.get(project.name);
		if (!files) this.recordedFiles.set(project.name, files = /* @__PURE__ */ new Map());
		files.set(filepath, this.resolveFiles(project, dependencies));
	}
	recordGlobalSetup(project, dependencies) {
		if (this.path && dependencies.length) this.recordedGlobalSetup.set(project.name, this.resolveFiles(project, dependencies));
	}
	async read() {
		const path = this.path;
		const stamp = path ? await getFileStamp(path) : void 0;
		if (!path || !stamp || stamp === this.fileStamp) return;
		this.fileStamp = stamp;
		try {
			const { version, projects } = JSON.parse(await readFile(path, "utf-8"));
			if (version !== DEPENDENCIES_VERSION) {
				debug?.(`ignored ${path}, the version ${version} is not supported`);
				return;
			}
			const root = this.vitest.config.root;
			const result = /* @__PURE__ */ new Map();
			for (const name in projects) {
				const { modules, config, globalSetup, files } = projects[name];
				const absoluteModules = modules.map((file) => resolve(root, file));
				result.set(name, {
					modules: absoluteModules,
					moduleIndex: new Map(absoluteModules.map((file, index) => [file, index])),
					config,
					globalSetup,
					files: new Map(Object.entries(files))
				});
			}
			this.projects = result;
		} catch (error) {
			debug?.(`failed to read ${path}: ${error}`);
		}
	}
	async update(specifications, startTime) {
		if (!this.recordedFiles.size && !this.recordedGlobalSetup.size) return;
		await this.read();
		const projects = new Set(specifications.map((spec) => spec.project));
		projects.add(this.vitest.getRootProject());
		for (const project of projects) {
			const dependencies = this.getProjectDependencies(project.name);
			dependencies.config = {
				at: startTime,
				deps: this.intern(dependencies, getConfigFiles(project))
			};
		}
		for (const [name, files] of this.recordedGlobalSetup) {
			const project = this.getProjectDependencies(name);
			project.globalSetup = {
				at: startTime,
				deps: this.intern(project, files)
			};
		}
		for (const specification of specifications) {
			const files = this.recordedFiles.get(specification.project.name)?.get(specification.moduleId);
			const task = specification.testModule?.task;
			if (!files || !task) continue;
			const project = this.getProjectDependencies(specification.project.name);
			const file = getRootRelativePath(this.vitest.config.root, specification.moduleId);
			const previous = project.files.get(file);
			// a partial run skips tests, so it can miss their dynamic imports,
			// without a previous record the file keeps having none and always runs
			if (!isPartialRun(this.vitest, specification, task)) project.files.set(file, {
				at: startTime,
				deps: this.intern(project, files)
			});
			else if (previous) project.files.set(file, {
				at: previous.at,
				deps: Array.from(/* @__PURE__ */ new Set([...previous.deps, ...this.intern(project, files)]))
			});
		}
		this.recordedFiles.clear();
		this.recordedGlobalSetup.clear();
		await this.write();
	}
	async clear() {
		this.projects.clear();
		this.fileStamp = void 0;
		if (this.path && existsSync(this.path)) {
			await rm(this.path, { force: true });
			this.vitest.logger.log("[cache] cleared dependencies cache at", this.path);
		}
	}
	// the files of the modules, with the files that plugins watch for them
	resolveFiles(project, dependencies) {
		const files = /* @__PURE__ */ new Set();
		const add = (file) => {
			if (isAbsolute(file) && !file.includes("node_modules")) files.add(file);
		};
		// without the module runner, plugins do not transform the modules and cannot watch files
		const watchedByPlugins = project.config.experimental.viteModuleRunner !== false;
		for (const id of dependencies) {
			add(cleanUrl(id));
			if (!watchedByPlugins) continue;
			for (const environment of Object.values(project.vite.environments)) {
				const node = environment.moduleGraph.getModuleById(id);
				const transformed = node?.transformResult;
				if (!transformed) continue;
				const imports = /* @__PURE__ */ new Set([...transformed.deps || [], ...transformed.dynamicDeps || []]);
				node.importedModules.forEach((imported) => {
					if (imported.file && !imports.has(imported.url)) add(imported.file);
				});
				break;
			}
		}
		return Array.from(files);
	}
	intern(project, files) {
		return files.map((file) => {
			let index = project.moduleIndex.get(file);
			if (index === void 0) {
				index = project.modules.push(file) - 1;
				project.moduleIndex.set(file, index);
			}
			return index;
		});
	}
	getProjectDependencies(name) {
		let project = this.projects.get(name);
		if (!project) {
			project = {
				modules: [],
				moduleIndex: /* @__PURE__ */ new Map(),
				files: /* @__PURE__ */ new Map()
			};
			this.projects.set(name, project);
		}
		return project;
	}
	async write() {
		if (!this.path) return;
		const root = this.vitest.config.root;
		const projects = Object.create(null);
		for (const [name, { modules, config, globalSetup, files }] of this.projects) projects[name] = {
			modules: modules.map((file) => getRootRelativePath(root, file)),
			config,
			globalSetup,
			files: Object.fromEntries(files)
		};
		const dependencies = {
			version: DEPENDENCIES_VERSION,
			projects
		};
		try {
			const cacheDir = dirname(this.path);
			await mkdir(cacheDir, { recursive: true });
			tagCacheDir(dirname(cacheDir));
			await atomicWriteFile(this.path, JSON.stringify(dependencies));
			this.fileStamp = await getFileStamp(this.path);
		} catch (error) {
			debug?.(`failed to write ${this.path}: ${error}`);
		}
	}
}
// the files that run every test when they change, only the ones that exist
function getConfigFiles(project) {
	const files = /* @__PURE__ */ new Set([
		...project.vitest.vite.config.configFileDependencies || [],
		...project.vite.config.configFileDependencies || [],
		...getEnvFiles(project)
	]);
	return Array.from(files).filter((file) => existsSync(file));
}

class VitestCache {
	vitest;
	/** @internal */
	_results;
	/** @internal */
	_modules;
	/** @internal */
	_dependencies;
	fileStats = /* @__PURE__ */ new Map();
	warnedMethods = /* @__PURE__ */ new Set();
	/** @internal */
	constructor(vitest) {
		this.vitest = vitest;
		this._results = new ResultsCache(vitest);
		this._modules = new FileSystemModuleCache(vitest);
		this._dependencies = new DependenciesCache(vitest);
	}
	/**
	* Returns the result of the test file from the previous test runs.
	*/
	getTestSpecificationResult(specification) {
		return this._results.get(specification);
	}
	/**
	* @deprecated Use `getTestSpecificationResult(specification)` instead.
	*/
	getFileTestResults(key) {
		this.deprecate("getFileTestResults", "Use \"getTestSpecificationResult(specification)\" instead.");
		return this._results.getByLegacyKey(key);
	}
	/**
	* @deprecated Vitest does not cache file sizes anymore. Read the size from the file system instead.
	*/
	getFileStats(key) {
		this.deprecate("getFileStats", "Read the size from the file system instead.");
		if (!this.fileStats.has(key)) this.fileStats.set(key, this.readFileStats(key));
		return this.fileStats.get(key);
	}
	/** @internal */
	async _load() {
		await Promise.all([this._results.read(), this._modules.ensureCacheIntegrity()]);
	}
	/** @internal */
	async _update(specifications, startTime) {
		await Promise.all([this._results.update(specifications, startTime), this._dependencies.update(specifications, startTime)]);
	}
	/** @internal */
	async _clear() {
		await Promise.all([
			this._results.clear(),
			this._dependencies.clear(),
			this._modules.clearCache()
		]);
	}
	readFileStats(key) {
		for (const project of this.vitest.projects) {
			const prefix = `${project.name}:`;
			if (!key.startsWith(prefix)) continue;
			try {
				const file = resolve(this.vitest.config.root, key.slice(prefix.length));
				const stats = statSync(file, { throwIfNoEntry: false });
				if (stats) return { size: stats.size };
			} catch {}
		}
	}
	deprecate(method, message) {
		if (!this.warnedMethods.has(method)) {
			this.warnedMethods.add(method);
			this.vitest.logger.deprecate(`"vitest.cache.${method}" is deprecated. ${message}`);
		}
	}
}

/**
* Finds test specifications that loaded any of the changed files during their last recorded run.
* A specification without a record is always affected.
*/
class RecordedModulesResolver {
	vitest;
	specs;
	specsByProject = /* @__PURE__ */ new Map();
	constructor(vitest, specs) {
		this.vitest = vitest;
		this.specs = specs;
		for (const spec of specs) {
			let projectSpecs = this.specsByProject.get(spec.project);
			if (!projectSpecs) this.specsByProject.set(spec.project, projectSpecs = []);
			projectSpecs.push(spec);
		}
	}
	async getDependencies() {
		await this.vitest.cache._dependencies.read();
		const root = this.vitest.config.root;
		const recordedAt = /* @__PURE__ */ new Map();
		const add = (dependencies, record) => {
			for (const index of record.deps) {
				const file = dependencies.modules[index];
				const previous = recordedAt.get(file);
				if (!recordedAt.has(file) || previous !== void 0 && record.at < previous) recordedAt.set(file, record.at);
			}
		};
		for (const [project, specs] of this.specsByProject) {
			const dependencies = this.vitest.cache._dependencies.get(project);
			if (dependencies?.config) add(dependencies, dependencies.config);
			if (dependencies?.globalSetup) add(dependencies, dependencies.globalSetup);
			for (const spec of specs) {
				const record = dependencies?.files.get(getRootRelativePath(root, spec.moduleId));
				if (record && dependencies) add(dependencies, record);
				else if (!recordedAt.has(spec.moduleId))
 // a test file without a record has no known time, so it always runs
				recordedAt.set(spec.moduleId, void 0);
			}
		}
		return Array.from(recordedAt, ([file, at]) => ({
			file,
			recordedAt: at
		}));
	}
	async getAffectedSpecifications(related) {
		if (dependsOnConfig(this.vitest.vite.config.configFileDependencies, related)) return this.specs;
		await this.vitest.cache._dependencies.read();
		const affected = /* @__PURE__ */ new Set();
		for (const [project, projectSpecs] of this.specsByProject) this.findAffectedInProject(project, projectSpecs, related).forEach((spec) => affected.add(spec));
		return this.specs.filter((spec) => affected.has(spec));
	}
	findAffectedInProject(project, specs, related) {
		if (dependsOnConfig(project.vite.config.configFileDependencies, related) || dependsOnConfig(getEnvFiles(project), related)) return specs;
		const dependencies = this.vitest.cache._dependencies.get(project);
		if (!dependencies) return specs;
		const changed = /* @__PURE__ */ new Set();
		for (const file of related) {
			const index = dependencies.moduleIndex.get(file);
			if (index !== void 0) changed.add(index);
		}
		if (project.config.globalSetup.length) {
			const globalSetup = dependencies.globalSetup;
			if (!globalSetup || globalSetup.deps.some((index) => changed.has(index))) return specs;
		}
		const root = this.vitest.config.root;
		return specs.filter((spec) => {
			const record = dependencies.files.get(getRootRelativePath(root, spec.moduleId));
			return !record || record.deps.some((index) => changed.has(index));
		});
	}
}
function dependsOnConfig(configDependencies, related) {
	return !!configDependencies?.some((file) => related.includes(file));
}

function createModulesResolver(vitest, specifications) {
	const specs = Array.from(specifications);
	return vitest.config.experimental.recordDependencies ? new RecordedModulesResolver(vitest, specs) : new AffectedModulesResolver(vitest, specs);
}

const THRESHOLD_KEYS = [
	"lines",
	"functions",
	"statements",
	"branches"
];
const GLOBAL_THRESHOLDS_KEY = "global";
const DEFAULT_PROJECT = Symbol.for("default-project");
async function getCoverageProvider(options, loader) {
	const coverageModule = await resolveCoverageProviderModule(options, loader);
	if (coverageModule) return coverageModule.getProvider();
	return null;
}
class BaseCoverageProvider {
	ctx;
	name;
	version;
	options;
	globCache = /* @__PURE__ */ new Map();
	autoUpdateMarker = "\n// __VITEST_COVERAGE_MARKER__";
	globMatchers;
	coverageFiles = /* @__PURE__ */ new Map();
	coverageFilesDirectory;
	reportsDirectoryLock;
	roots = [];
	changedFiles;
	_initialize(ctx) {
		this.ctx = ctx;
		if (ctx.version !== this.version) ctx.logger.warn($.yellow(`Loaded ${$.inverse($.yellow(` vitest@${ctx.version} `))} and ${$.inverse($.yellow(` @vitest/coverage-${this.name}@${this.version} `))}.
Running mixed versions is not supported and may lead into bugs
Update your dependencies and make sure the versions match.`));
		const config = ctx._coverageOptions;
		this.globMatchers = void 0;
		this.options = {
			...coverageConfigDefaults,
			// User's options
			...config,
			// Resolved fields
			provider: this.name,
			reportsDirectory: resolve(ctx.config.root, config.reportsDirectory || coverageConfigDefaults.reportsDirectory),
			reporter: resolveCoverageReporters(config.reporter || coverageConfigDefaults.reporter),
			thresholds: config.thresholds && {
				...config.thresholds,
				lines: config.thresholds["100"] ? 100 : config.thresholds.lines,
				branches: config.thresholds["100"] ? 100 : config.thresholds.branches,
				functions: config.thresholds["100"] ? 100 : config.thresholds.functions,
				statements: config.thresholds["100"] ? 100 : config.thresholds.statements
			}
		};
		this.coverageFilesDirectory = getCoverageFilesDirectory(this.options.reportsDirectory, this.ctx.config.shard);
		this.reportsDirectoryLock = new ReportsDirectoryLock(resolve(this.options.reportsDirectory));
		// If --project filter is set pick only roots of resolved projects
		this.roots = ctx.config.project?.length ? [...new Set(ctx.projects.map((project) => project.config.root))] : [ctx.config.root];
	}
	/**
	* Check if file matches `coverage.include` but not `coverage.exclude`
	*/
	isIncluded(_filename, root) {
		const roots = root ? [root] : this.roots;
		const filename = slash(cleanUrl(_filename));
		const cacheHit = this.globCache.get(filename);
		if (cacheHit !== void 0) return cacheHit;
		const matchingRoot = roots.find((root) => filename.startsWith(`${slash(root)}/`) || filename === slash(root));
		// File outside project root with default allowExternal
		if (this.options.allowExternal === false && !matchingRoot) {
			this.globCache.set(filename, false);
			return false;
		}
		// Files outside roots can be matched by absolute or "../" patterns
		const candidates = matchingRoot ? [relative(matchingRoot, filename)] : [filename, ...roots.map((root) => relative(root, filename))];
		const { matchExclude, matchInclude } = this.getGlobMatchers();
		if (candidates.some(matchExclude)) {
			this.globCache.set(filename, false);
			return false;
		}
		// By default `coverage.include` matches all files, except "coverage.exclude"
		let included = candidates.some(matchInclude);
		if (included && this.changedFiles) included = this.changedFiles.includes(filename);
		this.globCache.set(filename, included);
		return included;
	}
	/**
	* Compile `coverage.include`/`coverage.exclude` into reusable matchers once.
	* `picomatch.isMatch(file, patterns, options)` recompiles the patterns on
	* every call, which dominates the filtering step on large test suites.
	*/
	getGlobMatchers() {
		if (!this.globMatchers) {
			const exclude = this.options.exclude;
			const include = this.options.include;
			this.globMatchers = {
				matchExclude: exclude.length ? pm(exclude, { dot: true }) : () => false,
				matchInclude: include ? pm(include, {
					dot: true,
					ignore: exclude
				}) : () => true
			};
		}
		return this.globMatchers;
	}
	async getUntestedFilesByRoot(testedFiles, include, root) {
		const tested = new Set(testedFiles.map((file) => slash(file)));
		let includedFiles = await glob(include, {
			cwd: root,
			ignore: this.options.exclude,
			absolute: true,
			dot: true,
			onlyFiles: true
		});
		// Run again through picomatch as tinyglobby's exclude pattern is different ({ "exclude": ["math"] } should ignore "src/math.ts")
		includedFiles = includedFiles.filter((file) => !tested.has(file) && this.isIncluded(file, root));
		if (this.changedFiles) {
			const included = new Set(includedFiles);
			includedFiles = this.changedFiles.filter((file) => included.has(file));
		}
		return includedFiles.map((file) => slash(path.resolve(root, file)));
	}
	async getUntestedFiles(testedFiles) {
		if (this.options.include == null) return [];
		const rootMapper = this.getUntestedFilesByRoot.bind(this, testedFiles, this.options.include);
		return (await Promise.all(this.roots.map(rootMapper))).flatMap((files) => files);
	}
	createCoverageMap() {
		throw new Error("BaseReporter's createCoverageMap was not overwritten");
	}
	async generateReports(_, __) {
		throw new Error("BaseReporter's generateReports was not overwritten");
	}
	async parseConfigModule(_) {
		throw new Error("BaseReporter's parseConfigModule was not overwritten");
	}
	resolveOptions() {
		return this.options;
	}
	async clean(clean = true) {
		await this.reportsDirectoryLock.acquire();
		if (clean && existsSync(this.options.reportsDirectory)) await promises.rm(this.options.reportsDirectory, {
			recursive: true,
			force: true,
			maxRetries: 10
		});
		if (existsSync(this.coverageFilesDirectory)) await promises.rm(this.coverageFilesDirectory, {
			recursive: true,
			force: true,
			maxRetries: 10
		});
		await promises.mkdir(this.coverageFilesDirectory, { recursive: true });
		this.coverageFiles = /* @__PURE__ */ new Map();
	}
	onAfterSuiteRun({ coverage, environment, projectName, testFiles }) {
		if (!coverage) return;
		if (typeof coverage !== "string") throw new TypeError(`Expected string coverage payload, received ${typeof coverage}, ${JSON.stringify(coverage)}`);
		const filename = coverage;
		let entry = this.coverageFiles.get(projectName || DEFAULT_PROJECT);
		if (!entry) {
			entry = {};
			this.coverageFiles.set(projectName || DEFAULT_PROJECT, entry);
		}
		const testFilenames = testFiles.join();
		entry[environment] ??= {};
		// If there's a result from previous run, overwrite it
		entry[environment][testFilenames] = filename;
	}
	async readCoverageFiles({ onFileRead, onFinished, onDebug }) {
		let index = 0;
		const total = this.coverageFiles.size;
		for (const [projectName, coveragePerProject] of this.coverageFiles.entries()) for (const [environment, coverageByTestfiles] of Object.entries(coveragePerProject)) {
			const filenames = Object.values(coverageByTestfiles);
			const project = this.ctx.getProjectByName(projectName);
			for (const chunk of this.toSlices(filenames, this.options.processingConcurrency)) {
				if (onDebug.enabled) {
					index += chunk.length;
					onDebug(`Reading coverage results ${index}/${total}`);
				}
				await Promise.all(chunk.map(async (filename) => {
					const contents = await promises.readFile(filename, "utf-8");
					onFileRead(JSON.parse(contents));
				}));
			}
			await onFinished(project, environment);
		}
	}
	async cleanAfterRun() {
		try {
			this.coverageFiles = /* @__PURE__ */ new Map();
			await promises.rm(this.coverageFilesDirectory, { recursive: true });
			// Remove empty reports directory, e.g. when only text-reporter is used
			if (readdirSync(this.options.reportsDirectory).length === 0) await promises.rm(this.options.reportsDirectory, { recursive: true });
		} finally {
			await this.reportsDirectoryLock.release();
		}
	}
	async onTestRunStart(specifications) {
		if (this.options.changed) try {
			const changedFiles = await this.ctx.vcs.findChangedFiles({
				root: this.ctx.config.root,
				changedSince: this.options.changed,
				resolver: createModulesResolver(this.ctx, specifications)
			});
			this.changedFiles = changedFiles;
		} catch {
			this.changedFiles = void 0;
		}
		else if (this.ctx.config.changed) this.changedFiles = this.ctx.config.related;
		if (this.changedFiles) this.globCache.clear();
	}
	async onTestFailure() {
		if (!this.options.reportOnFailure) await this.cleanAfterRun();
	}
	async reportCoverage(coverageMap, { allTestsRun }) {
		await this.generateReports(coverageMap || this.createCoverageMap(), allTestsRun);
		if (!(!this.options.cleanOnRerun && this.ctx.config.watch)) await this.cleanAfterRun();
	}
	async reportThresholds(coverageMap, allTestsRun) {
		const resolvedThresholds = this.resolveThresholds(coverageMap);
		this.checkThresholds(resolvedThresholds);
		if (this.options.thresholds?.autoUpdate && allTestsRun) {
			if (!this.ctx.vite.config.configFile) throw new Error("Missing configurationFile. The \"coverage.thresholds.autoUpdate\" can only be enabled when configuration file is used.");
			const configFilePath = this.ctx.vite.config.configFile;
			const configModule = await this.parseConfigModule(configFilePath);
			await this.updateThresholds({
				thresholds: resolvedThresholds,
				configurationFile: configModule,
				onUpdate: () => writeFileSync(configFilePath, configModule.generate().code.replace(this.autoUpdateMarker, ""), "utf-8")
			});
		}
	}
	/**
	* Constructs collected coverage and users' threshold options into separate sets
	* where each threshold set holds their own coverage maps. Threshold set is either
	* for specific files defined by glob pattern or global for all other files.
	*/
	resolveThresholds(coverageMap) {
		const resolvedThresholds = [];
		const files = coverageMap.files();
		const globalCoverageMap = this.createCoverageMap();
		for (const key of Object.keys(this.options.thresholds)) {
			if (key === "perFile" || key === "autoUpdate" || key === "100" || THRESHOLD_KEYS.includes(key)) continue;
			const glob = key;
			const globEntry = this.options.thresholds[glob];
			const globThresholds = resolveGlobThresholds(globEntry);
			const globCoverageMap = this.createCoverageMap();
			const matcher = pm(glob);
			const matchingFiles = files.filter((file) => matcher(relative(this.ctx.config.root, file)));
			for (const file of matchingFiles) {
				const fileCoverage = coverageMap.fileCoverageFor(file);
				globCoverageMap.addFileCoverage(fileCoverage);
			}
			resolvedThresholds.push({
				name: glob,
				coverageMap: globCoverageMap,
				thresholds: globThresholds,
				...resolvePerFile(globEntry)
			});
		}
		// Global threshold is for all files, even if they are included by glob patterns
		for (const file of files) {
			const fileCoverage = coverageMap.fileCoverageFor(file);
			globalCoverageMap.addFileCoverage(fileCoverage);
		}
		resolvedThresholds.unshift({
			name: GLOBAL_THRESHOLDS_KEY,
			coverageMap: globalCoverageMap,
			thresholds: {
				branches: this.options.thresholds?.branches,
				functions: this.options.thresholds?.functions,
				lines: this.options.thresholds?.lines,
				statements: this.options.thresholds?.statements
			},
			...resolvePerFile(this.options.thresholds)
		});
		return resolvedThresholds;
	}
	/**
	* Check collected coverage against configured thresholds. Sets exit code to 1 when thresholds not reached.
	*/
	checkThresholds(allThresholds) {
		for (const { coverageMap, thresholds, perFile, perFileThresholds, name } of allThresholds) {
			const groups = [];
			if (!perFile) groups.push({
				file: null,
				thresholds,
				summary: coverageMap.getCoverageSummary(),
				name: name === GLOBAL_THRESHOLDS_KEY ? name : `"${name}"`
			});
			if (perFile) for (const file of coverageMap.files().sort()) groups.push({
				file,
				thresholds,
				summary: coverageMap.fileCoverageFor(file).toSummary(),
				name: name === GLOBAL_THRESHOLDS_KEY ? name : `"${name}"`
			});
			if (perFileThresholds) for (const file of coverageMap.files().sort()) groups.push({
				file,
				thresholds: perFileThresholds,
				summary: coverageMap.fileCoverageFor(file).toSummary(),
				name: "per-file"
			});
			for (const group of groups) {
				if (group.thresholds.branches === void 0 && group.thresholds.functions === void 0 && group.thresholds.lines === void 0 && group.thresholds.statements === void 0) continue;
				this.reportThresholdViolations(group.thresholds, group.summary, group.file, group.name);
			}
		}
	}
	reportThresholdViolations(thresholds, summary, file, label) {
		for (const thresholdKey of THRESHOLD_KEYS) {
			const threshold = thresholds[thresholdKey];
			if (threshold === void 0) continue;
			/**
			* Positive thresholds are treated as minimum coverage percentages (X means: X% of lines must be covered),
			* while negative thresholds are treated as maximum uncovered counts (-X means: X lines may be uncovered).
			*/
			if (threshold >= 0) {
				const coverage = summary.data[thresholdKey].pct;
				if (coverage < threshold) {
					process.exitCode = 1;
					let errorMessage = `ERROR: Coverage for ${thresholdKey} (${coverage}%) does not meet ${label} threshold (${threshold}%)`;
					if (file) errorMessage += ` for ${relative("./", file).replace(/\\/g, "/")}`;
					this.ctx.logger.error(errorMessage);
				}
			} else {
				const uncovered = summary.data[thresholdKey].total - summary.data[thresholdKey].covered;
				const absoluteThreshold = threshold * -1;
				if (uncovered > absoluteThreshold) {
					process.exitCode = 1;
					let errorMessage = `ERROR: Uncovered ${thresholdKey} (${uncovered}) exceed ${label} threshold (${absoluteThreshold})`;
					if (file) errorMessage += ` for ${relative("./", file).replace(/\\/g, "/")}`;
					this.ctx.logger.error(errorMessage);
				}
			}
		}
	}
	/**
	* Check if current coverage is above configured thresholds and bump the thresholds if needed
	*/
	async updateThresholds({ thresholds: allThresholds, onUpdate, configurationFile }) {
		let updatedThresholds = false;
		const config = resolveConfig(configurationFile);
		assertConfigurationModule(config);
		for (const { coverageMap, thresholds, name, perFile } of allThresholds) {
			const summaries = perFile ? coverageMap.files().map((file) => coverageMap.fileCoverageFor(file).toSummary()) : [coverageMap.getCoverageSummary()];
			// A `perFile` glob may match no files; skip it instead of writing
			// Infinity thresholds from `Math.min(...[])`.
			if (summaries.length === 0) continue;
			const thresholdsToUpdate = [];
			for (const key of THRESHOLD_KEYS) {
				const threshold = thresholds[key] ?? 100;
				/**
				* Positive thresholds are treated as minimum coverage percentages (X means: X% of lines must be covered),
				* while negative thresholds are treated as maximum uncovered counts (-X means: X lines may be uncovered).
				*/
				if (threshold >= 0) {
					const actual = Math.min(...summaries.map((summary) => summary[key].pct));
					if (actual > threshold) thresholdsToUpdate.push([
						key,
						actual,
						threshold
					]);
				} else {
					const absoluteThreshold = threshold * -1;
					const actual = Math.max(...summaries.map((summary) => summary[key].total - summary[key].covered));
					if (actual < absoluteThreshold) {
						// If everything was covered, set new threshold to 100% (since a threshold of 0 would be considered as 0%)
						const updatedThreshold = actual === 0 ? 100 : actual * -1;
						thresholdsToUpdate.push([
							key,
							updatedThreshold,
							threshold
						]);
					}
				}
			}
			if (thresholdsToUpdate.length === 0) continue;
			updatedThresholds = true;
			const thresholdFormatter = typeof this.options.thresholds?.autoUpdate === "function" ? this.options.thresholds?.autoUpdate : (value) => value;
			for (const [threshold, newValue, previousValue] of thresholdsToUpdate) {
				const formattedValue = thresholdFormatter(newValue, previousValue);
				if (name === GLOBAL_THRESHOLDS_KEY) config.test.coverage.thresholds[threshold] = formattedValue;
				else {
					const glob = config.test.coverage.thresholds[name];
					glob[threshold] = formattedValue;
				}
			}
		}
		if (updatedThresholds) {
			this.ctx.logger.log("Updating thresholds to configuration file. You may want to push with updated coverage thresholds.");
			onUpdate();
		}
	}
	async mergeReports(coverageMaps) {
		const coverageMap = this.createCoverageMap();
		for (const coverage of coverageMaps) coverageMap.merge(coverage);
		await this.generateReports(coverageMap, true);
	}
	hasTerminalReporter(reporters) {
		return reporters.some(([reporter]) => reporter === "text" || reporter === "text-summary" || reporter === "text-lcov" || reporter === "teamcity");
	}
	toSlices(array, size) {
		return array.reduce((chunks, item) => {
			const index = Math.max(0, chunks.length - 1);
			const lastChunk = chunks[index] || [];
			chunks[index] = lastChunk;
			if (lastChunk.length >= size) chunks.push([item]);
			else lastChunk.push(item);
			return chunks;
		}, []);
	}
	// TODO: should this be abstracted in `project`/`vitest` instead?
	// if we decide to keep `viteModuleRunner: false`, we will need to abstract transformation in both main thread and tests
	// custom --import=module.registerHooks need to be transformed as well somehow
	async transformFile(url, project, viteEnvironment, isTransformedByVite = true) {
		const config = project.config;
		// vite is disabled, should transform manually if possible
		if (config.experimental.viteModuleRunner === false || !isTransformedByVite) {
			const pathname = url.split("?")[0];
			const filename = pathname.startsWith("file://") ? fileURLToPath(pathname) : pathname;
			const extension = path.extname(filename);
			if (!(extension === ".ts" || extension === ".mts" || extension === ".cts")) return {
				code: await promises.readFile(filename, "utf-8"),
				map: null
			};
			if (!module$1.stripTypeScriptTypes) throw new Error(`Cannot parse '${url}' because "module.stripTypeScriptTypes" is not supported. TypeScript coverage requires Node.js 22.15 or higher. This is NOT a bug of Vitest.`);
			const isTransform = process.execArgv.includes("--experimental-transform-types") || config.execArgv.includes("--experimental-transform-types") || process.env.NODE_OPTIONS?.includes("--experimental-transform-types") || config.env?.NODE_OPTIONS?.includes("--experimental-transform-types");
			const code = await promises.readFile(filename, "utf-8");
			return {
				// `transform` mode will inject source maps comment at the end
				code: module$1.stripTypeScriptTypes(code, { mode: isTransform ? "transform" : "strip" }),
				map: null
			};
		}
		return project.vite.environments[viteEnvironment].transformRequest(url);
	}
	createUncoveredFileTransformer(ctx) {
		const rootProject = ctx.getRootProject();
		const projects = /* @__PURE__ */ new Set([...ctx.projects, rootProject]);
		return async (filename) => {
			let lastError;
			for (const project of projects) {
				const root = project.config.root;
				if (!filename.startsWith(root) && !filename.startsWith(`/${root}`) && project !== rootProject) continue;
				try {
					const environment = project.config.environment;
					const viteEnvironment = environment === "jsdom" || environment === "happy-dom" || project.isBrowserEnabled() ? "client" : "ssr";
					return await this.transformFile(filename, project, viteEnvironment);
				} catch (err) {
					lastError = err;
				}
			}
			// All vite servers failed to transform the file
			throw lastError;
		};
	}
}
function resolvePerFile(thresholds) {
	if (!thresholds || typeof thresholds !== "object" || !("perFile" in thresholds)) return {
		perFile: false,
		perFileThresholds: null
	};
	const { perFile } = thresholds;
	if (perFile === true) return {
		perFile: true,
		perFileThresholds: null
	};
	if (perFile && typeof perFile === "object") return {
		perFile: false,
		perFileThresholds: resolveGlobThresholds(perFile)
	};
	return {
		perFile: false,
		perFileThresholds: null
	};
}
/**
* Narrow down `unknown` glob thresholds to resolved ones
*/
function resolveGlobThresholds(thresholds) {
	if (!thresholds || typeof thresholds !== "object") return {};
	if (100 in thresholds && thresholds[100] === true) return {
		lines: 100,
		branches: 100,
		functions: 100,
		statements: 100
	};
	return {
		lines: "lines" in thresholds && typeof thresholds.lines === "number" ? thresholds.lines : void 0,
		branches: "branches" in thresholds && typeof thresholds.branches === "number" ? thresholds.branches : void 0,
		functions: "functions" in thresholds && typeof thresholds.functions === "number" ? thresholds.functions : void 0,
		statements: "statements" in thresholds && typeof thresholds.statements === "number" ? thresholds.statements : void 0
	};
}
function assertConfigurationModule(config) {
	try {
		// @ts-expect-error -- Intentional unsafe null pointer check as wrapped in try-catch
		if (typeof config.test.coverage.thresholds !== "object") throw new TypeError("Expected config.test.coverage.thresholds to be an object");
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(`Unable to parse thresholds from configuration file: ${message}`);
	}
}
function resolveConfig(configModule) {
	const mod = configModule.exports.default;
	try {
		// Check for "export default { test: {...} }"
		if (mod.$type === "object") return mod;
		// "export default defineConfig(...)"
		let config = resolveDefineConfig(mod);
		if (config) return config;
		// "export default mergeConfig(..., defineConfig(...))"
		if (mod.$type === "function-call" && mod.$callee === "mergeConfig") {
			config = resolveMergeConfig(mod);
			if (config) return config;
		}
	} catch (error) {
		// Reduce magicast's verbose errors to readable ones
		throw new Error(error instanceof Error ? error.message : String(error));
	}
	throw new Error("Failed to update coverage thresholds. Configuration file is too complex.");
}
function resolveDefineConfig(mod) {
	if (mod.$type === "function-call" && mod.$callee === "defineConfig") {
		// "export default defineConfig({ test: {...} })"
		if (mod.$args[0].$type === "object") return mod.$args[0];
		if (mod.$args[0].$type === "arrow-function-expression") {
			if (mod.$args[0].$body.$type === "object")
 // "export default defineConfig(() => ({ test: {...} }))"
			return mod.$args[0].$body;
			// "export default defineConfig(() => mergeConfig({...}, ...))"
			const config = resolveMergeConfig(mod.$args[0].$body);
			if (config) return config;
		}
	}
}
function resolveMergeConfig(mod) {
	if (mod.$type === "function-call" && mod.$callee === "mergeConfig") for (const arg of mod.$args) {
		const config = resolveDefineConfig(arg);
		if (config) return config;
	}
}
class ReportsDirectoryLock {
	reportsDirectory;
	lockFile;
	constructor(reportsDirectory) {
		this.reportsDirectory = reportsDirectory;
		const hash = createHash("sha256").update(reportsDirectory).digest("hex").slice(0, 16);
		this.lockFile = resolve(tmpdir(), `vitest-coverage-${hash}.lock`);
	}
	async acquire() {
		if (await this.tryWrite()) return;
		const owner = await this.readOwner();
		// We already hold the lock for this directory (e.g. watch-mode reruns).
		if (owner?.pid === process.pid) return;
		// Another running Vitest owns this directory.
		if (owner && isProcessAlive(owner.pid)) throw this.inUseError(owner);
		// The lock was left behind by a process that no longer exists. Reclaim it.
		await promises.rm(this.lockFile, { force: true });
		if (!await this.tryWrite()) throw this.inUseError(await this.readOwner());
	}
	async release() {
		if ((await this.readOwner())?.pid === process.pid) await promises.rm(this.lockFile, { force: true });
	}
	async tryWrite() {
		const payload = JSON.stringify({
			pid: process.pid,
			reportsDirectory: this.reportsDirectory
		});
		try {
			// `wx` fails with EEXIST if the file already exists, so only one process wins.
			await promises.writeFile(this.lockFile, payload, { flag: "wx" });
			return true;
		} catch (error) {
			if (error.code === "EEXIST") return false;
			throw error;
		}
	}
	async readOwner() {
		try {
			const owner = JSON.parse(await promises.readFile(this.lockFile, "utf-8"));
			return typeof owner?.pid === "number" ? owner : null;
		} catch {
			return null;
		}
	}
	inUseError(owner) {
		return /* @__PURE__ */ new Error(`The coverage report directory "${this.reportsDirectory}" is already in use by another Vitest process${owner ? ` (pid ${owner.pid})` : ""}. Running coverage for multiple Vitest processes in the same directory at the same time is not supported, because they would delete each other's reports.\nGive each run its own "coverage.reportsDirectory" (e.g. --coverage.reportsDirectory=coverage-${process.pid}) or run them sequentially.`);
	}
}
function isProcessAlive(pid) {
	try {
		// Sending signal 0 checks if the process exists without actually killing it:
		// https://nodejs.org/api/process.html#processkillpid-signal
		process.kill(pid, 0);
		return true;
	} catch (error) {
		// ESRCH means the process is gone. Treat anything else (e.g. EPERM) as alive
		// so we never reclaim a lock from a process that is still running.
		return error.code !== "ESRCH";
	}
}

// this function receives the module diagnostic with the location of imports
// and populates it with collected import durations; the duration is injected
// only if the current module is the one that imported the module
// if testModule is not defined, then Vitest aggregates durations of ALL collected test modules
function collectModuleDurationsDiagnostic(moduleId, state, moduleDiagnostic, testModule) {
	if (!moduleDiagnostic) return {
		modules: [],
		untrackedModules: []
	};
	const modules = [];
	const modulesById = {};
	const allModules = [...moduleDiagnostic.modules, ...moduleDiagnostic.untracked];
	const visitedByFiles = {};
	// this aggregates the times for _ALL_ tests if testModule is not passed
	// so if the module was imported in separate tests, the time will be accumulated
	for (const files of testModule ? [[testModule.task]] : state.filesMap.values()) for (const file of files) {
		const importDurations = file.importDurations;
		if (!importDurations) continue;
		const currentModule = state.getReportedEntity(file);
		if (!currentModule) continue;
		const visitedKey = currentModule.project.config.isolate === false ? "non-isolate" : file.id;
		if (!visitedByFiles[visitedKey]) visitedByFiles[visitedKey] = /* @__PURE__ */ new Set();
		const visited = visitedByFiles[visitedKey];
		allModules.forEach(({ resolvedId, resolvedUrl }) => {
			const durations = importDurations[resolvedId];
			// do not accumulate if module was already visited by suite (or suites in non-isolate mode)
			if (!durations || visited.has(resolvedId)) return;
			const importer = getModuleImporter(moduleId, durations, currentModule);
			modulesById[resolvedId] ??= {
				selfTime: 0,
				totalTime: 0,
				transformTime: 0,
				external: durations.external,
				importer
			};
			// only track if the current module imported this module,
			// otherwise it was imported instantly because it's cached
			if (importer === moduleId) {
				visited.add(resolvedId);
				modulesById[resolvedId].selfTime += durations.selfTime;
				modulesById[resolvedId].totalTime += durations.totalTime;
				// don't aggregate
				modulesById[resolvedId].transformTime = state.metadata[currentModule.project.name]?.duration[resolvedUrl]?.[0];
			}
		});
	}
	// if module was imported twice in the same file,
	// show only one time - the second should be shown as 0
	const visitedInFile = /* @__PURE__ */ new Set();
	moduleDiagnostic.modules.forEach((diagnostic) => {
		const durations = modulesById[diagnostic.resolvedId];
		if (!durations) return;
		if (visitedInFile.has(diagnostic.resolvedId)) modules.push({
			...diagnostic,
			selfTime: 0,
			totalTime: 0,
			transformTime: 0,
			external: durations.external,
			importer: durations.importer
		});
		else {
			visitedInFile.add(diagnostic.resolvedId);
			modules.push({
				...diagnostic,
				...durations
			});
		}
	});
	const untracked = [];
	moduleDiagnostic.untracked.forEach((diagnostic) => {
		const durations = modulesById[diagnostic.resolvedId];
		if (!durations) return;
		if (visitedInFile.has(diagnostic.resolvedId)) untracked.push({
			selfTime: 0,
			totalTime: 0,
			transformTime: 0,
			external: durations.external,
			importer: durations.importer,
			resolvedId: diagnostic.resolvedId,
			resolvedUrl: diagnostic.resolvedUrl,
			url: diagnostic.rawUrl
		});
		else {
			visitedInFile.add(diagnostic.resolvedId);
			untracked.push({
				...durations,
				resolvedId: diagnostic.resolvedId,
				resolvedUrl: diagnostic.resolvedUrl,
				url: diagnostic.rawUrl
			});
		}
	});
	return {
		modules,
		untrackedModules: untracked
	};
}
function getModuleImporter(moduleId, durations, testModule) {
	if (durations.importer === moduleId) return moduleId;
	if (!durations.importer) {
		if (moduleId === testModule.moduleId) return testModule.moduleId;
		return testModule.project.config.setupFiles.includes(moduleId) ? moduleId : durations.importer;
	}
	return durations.importer;
}
// the idea of this is very simple
// it parses the source code to extract import/export statements
// it parses SSR transformed file to extract __vite_ssr_import__ and __vite_ssr_dynamic_import__
// it combines the two by looking at the original positions of SSR primitives
// in the end, we are able to return a list of modules that were imported by this module
// mapped to their IDs in Vite's module graph
async function collectSourceModulesLocations(moduleId, moduleGraph) {
	const transformResult = moduleGraph.getModuleById(moduleId)?.transformResult;
	if (!transformResult || !transformResult.ssr) return;
	const map = transformResult.map;
	if (!map || !("version" in map) || !map.sources.length) return;
	const sourceImports = map.sources.reduce((acc, sourceId, index) => {
		const source = map.sourcesContent?.[index];
		if (source != null) acc[sourceId] = parseSourceImportsAndExports(source);
		return acc;
	}, {});
	const transformImports = await parseTransformResult(moduleGraph, transformResult);
	const traceMap = map && "version" in map && new TraceMap(map);
	const modules = {};
	const untracked = [];
	transformImports.forEach((row) => {
		const original = traceMap && originalPositionFor(traceMap, row.start);
		if (original && original.source != null) {
			// if there are several at the same position, this is a bug
			// probably caused by import.meta.glob imports returning incorrect positions
			// all the new import.meta.glob imports come first, so only the last module on this line is correct
			const sourceImport = sourceImports[original.source].get(`${original.line}:${original.column}`);
			if (sourceImport) {
				if (modules[sourceImport.rawUrl]) {
					// remove imports with a different resolvedId
					const differentImports = modules[sourceImport.rawUrl].filter((d) => d.resolvedId !== row.resolvedId);
					untracked.push(...differentImports);
					modules[sourceImport.rawUrl] = modules[sourceImport.rawUrl].filter((d) => d.resolvedId === row.resolvedId);
				}
				modules[sourceImport.rawUrl] ??= [];
				modules[sourceImport.rawUrl].push({
					start: sourceImport.start,
					end: sourceImport.end,
					startIndex: sourceImport.startIndex,
					endIndex: sourceImport.endIndex,
					rawUrl: sourceImport.rawUrl,
					resolvedId: row.resolvedId,
					resolvedUrl: row.resolvedUrl
				});
			}
		}
	});
	return {
		modules: Object.values(modules).flat(),
		untracked
	};
}
function fillSourcesMap(syntax, sourcesMap, source, indexMap) {
	const splitSeparator = `${syntax} `;
	const splitSources = source.split(splitSeparator);
	const chunks = [];
	let index = 0;
	for (const chunk of splitSources) {
		chunks.push({
			chunk,
			startIndex: index
		});
		index += chunk.length + splitSeparator.length;
	}
	chunks.forEach(({ chunk, startIndex }) => {
		const normalized = chunk.replace(/'/g, "\"");
		const startQuoteIdx = normalized.indexOf("\"");
		if (startQuoteIdx === -1) return;
		const endQuoteIdx = normalized.indexOf("\"", startQuoteIdx + 1);
		if (endQuoteIdx === -1) return;
		const staticSyntax = {
			startIndex: startIndex + startQuoteIdx,
			endIndex: startIndex + endQuoteIdx + 1,
			start: indexMap.get(startIndex + startQuoteIdx),
			end: indexMap.get(startIndex + endQuoteIdx + 1),
			rawUrl: normalized.slice(startQuoteIdx + 1, endQuoteIdx)
		};
		// -7 to include "import "
		for (let i = startIndex - 7; i < staticSyntax.endIndex; i++) {
			const location = indexMap.get(i);
			if (location) sourcesMap.set(`${location.line}:${location.column}`, staticSyntax);
		}
	});
}
// this function tries to parse ESM static import and export statements from
// the source. if the source is not JS/TS, but supports static ESM syntax,
// then this will also find them because it' only checks the strings, it doesn't parse the AST
function parseSourceImportsAndExports(source) {
	if (!source.includes("import ") && !source.includes("export ")) return /* @__PURE__ */ new Map();
	const sourcesMap = /* @__PURE__ */ new Map();
	const indexMap = createIndexLocationsMap(source);
	fillSourcesMap("import", sourcesMap, source, indexMap);
	fillSourcesMap("export", sourcesMap, source, indexMap);
	return sourcesMap;
}
async function parseTransformResult(moduleGraph, transformResult) {
	const code = transformResult.code;
	const regexp = /(?:__vite_ssr_import__|__vite_ssr_dynamic_import__)\("([^"]+)"/g;
	const lineColumnMap = createIndexLocationsMap(code);
	const importPositions = [];
	let match;
	// oxlint-disable-next-line no-cond-assign
	while (match = regexp.exec(code)) {
		const startIndex = match.index;
		const endIndex = match.index + match[0].length - 1;
		importPositions.push({
			raw: match[1],
			startIndex,
			endIndex
		});
	}
	return (await Promise.all(importPositions.map(async ({ startIndex, endIndex, raw }) => {
		const position = lineColumnMap.get(startIndex);
		const endPosition = lineColumnMap.get(endIndex);
		const moduleNode = await moduleGraph.getModuleByUrl(raw);
		if (!position || !endPosition || !moduleNode || !moduleNode.id) return;
		return {
			resolvedId: moduleNode.id,
			resolvedUrl: moduleNode.url,
			start: position,
			end: endPosition,
			startIndex,
			endIndex
		};
	}))).filter((n) => n != null);
}

class BlobReporter {
	start = 0;
	ctx;
	options;
	coverage;
	constructor(options) {
		this.options = options;
	}
	onInit(ctx) {
		if (ctx.config.watch) throw new Error("Blob reporter is not supported in watch mode");
		this.ctx = ctx;
		this.start = performance.now();
		this.coverage = void 0;
	}
	onCoverage(coverage) {
		this.coverage = coverage;
	}
	async onTestRunEnd(testModules, unhandledErrors) {
		const executionTime = performance.now() - this.start;
		const files = testModules.map((testModule) => testModule.task);
		const errors = [...unhandledErrors];
		const coverage = this.coverage;
		const environmentModules = {};
		this.ctx.projects.forEach((project) => {
			const serializedProject = {
				environments: {},
				external: []
			};
			Object.entries(project.vite.environments).forEach(([environmentName, environment]) => {
				serializedProject.environments[environmentName] = serializeEnvironmentModuleGraph(environment);
			});
			for (const [id, value] of project._resolver.externalizeCache.entries()) if (typeof value === "string") serializedProject.external.push([id, value]);
			environmentModules[project.name] = serializedProject;
		});
		const content = stringify([
			this.ctx.version,
			files,
			errors,
			coverage,
			executionTime,
			environmentModules
		]);
		let outputFile = this.options.outputFile ?? getOutputFile(this.ctx.config, "blob");
		if (outputFile) {
			outputFile = resolve(this.ctx.config.root, outputFile);
			const dir = dirname(outputFile);
			if (!existsSync(dir)) await mkdir(dir, { recursive: true });
			await writeFile(outputFile, content, "utf-8");
		} else {
			const report = this.ctx.createReport("blob");
			const shard = this.ctx.config.shard;
			outputFile = [
				"blob",
				this.ctx.config.mergeReportsLabel,
				shard ? `${shard.index}-${shard.count}` : ""
			].filter(Boolean).join("-");
			outputFile = `${sanitizeFilePath(outputFile)}.json`;
			await report.writeFile(outputFile, content, "utf-8");
			outputFile = resolve(report.root, outputFile);
		}
		this.ctx.logger.log("blob report written to", outputFile);
	}
}
async function readBlobs(currentVersion, blobsDirectory, projectsArray) {
	// using process.cwd() because --merge-reports can only be used in CLI
	const resolvedDir = resolve(process.cwd(), blobsDirectory);
	const promises = (await readdir(resolvedDir)).map(async (filename) => {
		const fullPath = resolve(resolvedDir, filename);
		if (!(await stat(fullPath)).isFile()) throw new TypeError(`vitest.mergeReports() expects all paths in "${blobsDirectory}" to be files generated by the blob reporter, but "${filename}" is not a file`);
		const content = await readFile(fullPath, "utf-8");
		const [version, files, errors, coverage, executionTime, environmentModules] = parse(content);
		if (!version) throw new TypeError(`vitest.mergeReports() expects all paths in "${blobsDirectory}" to be files generated by the blob reporter, but "${filename}" is not a valid blob file`);
		return {
			version,
			files,
			errors,
			coverage,
			file: filename,
			executionTime,
			environmentModules
		};
	});
	const blobs = await Promise.all(promises);
	if (!blobs.length) throw new Error(`vitest.mergeReports() requires at least one blob file in "${blobsDirectory}" directory, but none were found`);
	const versions = new Set(blobs.map((blob) => blob.version));
	if (versions.size > 1) throw new Error(`vitest.mergeReports() requires all blob files to be generated by the same Vitest version, received\n\n${blobs.map((b) => `- "${b.file}" uses v${b.version}`).join("\n")}`);
	if (!versions.has(currentVersion)) throw new Error(`the blobs in "${blobsDirectory}" were generated by a different version of Vitest. Expected v${currentVersion}, but received v${blobs[0].version}`);
	// Restore module graph
	const projects = Object.fromEntries(projectsArray.map((p) => [p.name, p]));
	blobs.forEach((blob) => {
		Object.entries(blob.environmentModules).forEach(([projectName, modulesByProject]) => {
			const project = projects[projectName];
			if (!project) return;
			modulesByProject.external.forEach(([id, externalized]) => {
				project._resolver.externalizeCache.set(id, externalized);
			});
			Object.entries(modulesByProject.environments).forEach(([environmentName, moduleGraph]) => {
				const environment = project.vite.environments[environmentName];
				deserializeEnvironmentModuleGraph(environment, moduleGraph);
			});
		});
	});
	return {
		files: blobs.flatMap((blob) => blob.files).sort((f1, f2) => {
			return (f1.result?.startTime || 0) - (f2.result?.startTime || 0);
		}),
		errors: blobs.flatMap((blob) => blob.errors),
		coverages: blobs.map((blob) => blob.coverage),
		executionTimes: blobs.map((blob) => blob.executionTime)
	};
}
function serializeEnvironmentModuleGraph(environment) {
	const idTable = [];
	const idMap = /* @__PURE__ */ new Map();
	const getIdIndex = (id) => {
		const existing = idMap.get(id);
		if (existing != null) return existing;
		const next = idTable.length;
		idMap.set(id, next);
		idTable.push(id);
		return next;
	};
	const modules = [];
	for (const [id, mod] of environment.moduleGraph.idToModuleMap.entries()) {
		// Vite can generate module with `file = ""` for module id "#..."
		// when the actual module doesn't exist (e.g. resolve failure or mocked module)
		if (mod.file == null) continue;
		const importedIds = [];
		for (const importedNode of mod.importedModules) if (importedNode.id !== null) importedIds.push(getIdIndex(importedNode.id));
		modules.push([
			getIdIndex(id),
			getIdIndex(mod.file),
			getIdIndex(mod.url),
			importedIds
		]);
	}
	return {
		idTable,
		modules
	};
}
function deserializeEnvironmentModuleGraph(environment, serialized) {
	const nodesById = /* @__PURE__ */ new Map();
	serialized.modules.forEach(([id, file, url]) => {
		const moduleId = serialized.idTable[id];
		const filePath = serialized.idTable[file];
		const urlPath = serialized.idTable[url];
		// `createFileOnlyEntry('')` normalizes the file to ".". This keeps
		// the graph usable, but doesn't perfectly round-trip Vite's `file = ""`
		// nodes for ids like "#...".
		// We may just do moduleNode.file = filePath in the future.
		const moduleNode = environment.moduleGraph.createFileOnlyEntry(filePath);
		moduleNode.url = urlPath;
		moduleNode.id = moduleId;
		moduleNode.transformResult = {
			// print error checks that transformResult is set
			code: " ",
			map: null
		};
		environment.moduleGraph.idToModuleMap.set(moduleId, moduleNode);
		nodesById.set(moduleId, moduleNode);
	});
	serialized.modules.forEach(([id, _file, _url, importedIds]) => {
		const moduleId = serialized.idTable[id];
		const moduleNode = nodesById.get(moduleId);
		importedIds.forEach((importedIdIndex) => {
			const importedId = serialized.idTable[importedIdIndex];
			const importedNode = nodesById.get(importedId);
			moduleNode.importedModules.add(importedNode);
			importedNode.importers.add(moduleNode);
		});
	});
}

class HangingProcessReporter {
	whyRunning;
	async onInit() {
		this.whyRunning = await import('why-is-node-running').then((mod) => mod.default);
	}
	onProcessTimeout() {
		this.whyRunning?.();
	}
}

function createReport(ctx, scope) {
	const root = ctx.config.root;
	const vitestDir = resolve$1(root, ".vitest");
	const reportDir = resolve$1(vitestDir, scope);
	fs.mkdirSync(reportDir, { recursive: true });
	return {
		root: reportDir,
		async clean(force = false) {
			if (fs.existsSync(reportDir)) {
				// Do not delete results when run with --merge-reports, unless forced to.
				// In test runs with --shard, it's possible that users do some other handling for
				// the reports after 'vitest --merge-reports' run. For example upload all the '.vitest/attachments'.
				if (ctx.config.mergeReports && !force) return;
				await rm(reportDir, {
					recursive: true,
					force: true
				});
			}
			await mkdir(reportDir);
		},
		async readFile(filename, encoding = "utf8") {
			return await readFile(resolve$1(vitestDir, scope, filename), encoding);
		},
		async readdir() {
			return await readdir(resolve$1(vitestDir, scope));
		},
		async writeFile(filename, content, encoding = "utf8") {
			await writeFile(resolve$1(vitestDir, scope, filename), content, encoding);
		},
		async delete(filename) {
			await rm(resolve$1(vitestDir, scope, filename), {
				recursive: true,
				force: true
			});
		}
	};
}

const DOM_ENVIRONMENTS = /* @__PURE__ */ new Set(["jsdom", "happy-dom"]);
/** Minimum summed environment setup time before the hint is worth printing. */
const MIN_ENVIRONMENT_TIME = 2e3;
/** Minimum share of the project's tracked time spent setting up environments. */
const MIN_ENVIRONMENT_SHARE = .25;
/**
* A hint has to be worth acting on: the estimated saving must be noticeable.
* Run-to-run noise of real suites is commonly a few percent, so anything below
* ~5% of the wall time cannot even be confirmed by trying the change - except
* on long runs, where 10 seconds is worth attention regardless of percentage.
*/
function isSavingWorthHinting(saving, executionTime) {
	if (saving < 250) return false;
	return saving >= executionTime * .05 || saving >= 1e4;
}
/** Minimum summed import time before the hint is worth printing. */
const MIN_IMPORT_TIME = 2e3;
/** Minimum share of the project's tracked time spent importing modules. */
const MIN_IMPORT_SHARE = .25;
/**
* Minimum fraction of module fetches that re-evaluate an already evaluated
* module. Below this the test files import mostly disjoint graphs and
* reusing workers would not meaningfully reduce the import work.
*/
const MIN_IMPORT_DUPLICATION = .2;
/**
* Detects projects where test files repeatedly evaluate the same module
* graph. Typical for barrel-file imports: every test file pulls hundreds of
* shared modules to use a few of them, and `isolate: true` re-evaluates that
* graph for every file. The duplication is measured from the server-side
* fetch counts, so suites with disjoint per-file graphs - where reusing
* workers would not help - stay quiet.
*/
function getImportDiagnostics(projects) {
	const diagnostics = [];
	for (const project of projects) {
		if (project.pool !== "forks" && project.pool !== "threads" || !project.isolate || project.isolateProvided || project.browser || project.fileCount <= project.parallelism || project.importTime < MIN_IMPORT_TIME || project.trackedTime <= 0 || project.importTime / project.trackedTime < MIN_IMPORT_SHARE) continue;
		const parallelism = Math.max(1, project.parallelism);
		let totalFetches = 0;
		let avoidableFetches = 0;
		for (const count of project.fetchCounts) {
			totalFetches += count;
			// reused workers still fetch a module once per lane that needs it
			avoidableFetches += Math.max(0, count - parallelism);
		}
		if (totalFetches === 0) continue;
		const duplication = avoidableFetches / totalFetches;
		if (duplication < MIN_IMPORT_DUPLICATION) continue;
		// imports are spread across the worker lanes, so the reducible wall time
		// is the duplicated share of the summed import time divided by lanes
		const estimatedSaving = project.importTime * duplication / parallelism;
		if (!isSavingWorthHinting(estimatedSaving, project.executionTime)) continue;
		diagnostics.push({
			name: project.name,
			importTime: project.importTime,
			share: project.importTime / project.trackedTime,
			totalFetches,
			uniqueModules: project.fetchCounts.length,
			duplication,
			estimatedSaving
		});
	}
	return diagnostics;
}
/**
* Estimates the wall-clock time saved by evaluating shared modules once per
* worker instead of once per test file. `moduleSelfTimes` holds, per module,
* the module's own evaluation time in every test file that evaluated it.
* Reused workers keep ~`parallelism` evaluations of each module (one per
* lane); the rest of the summed time is avoidable and spread across the
* lanes.
*/
function estimateModuleEvaluationSaving(moduleSelfTimes, parallelism) {
	const lanes = Math.max(1, parallelism);
	let avoidable = 0;
	for (const times of moduleSelfTimes) {
		if (times.length <= lanes) continue;
		let sum = 0;
		for (const time of times) sum += time;
		avoidable += sum * (times.length - lanes) / times.length;
	}
	return avoidable / lanes;
}
/** Minimum summed transform time before the hint is worth printing. */
const MIN_TRANSFORM_TIME = 2e3;
/** Minimum share of the project's tracked time spent transforming modules. */
const MIN_TRANSFORM_SHARE = .25;
/**
* Detects projects that spend the run transforming modules. Without the fs
* module cache every `vitest run` starts from scratch and transforms the
* whole module graph again; `fsModuleCache` persists the results on disk so
* repeated runs skip them.
*/
function getTransformDiagnostics(projects) {
	return projects.filter((project) => {
		if (project.fsModuleCache || project.fsModuleCacheProvided || project.transformTime < MIN_TRANSFORM_TIME || project.trackedTime <= 0 || project.transformTime / project.trackedTime < MIN_TRANSFORM_SHARE) return false;
		// the next run skips the persisted transforms, so the (mostly serial,
		// main-thread) transform time itself bounds the saving
		return isSavingWorthHinting(project.transformTime, project.executionTime);
	}).map((project) => ({
		name: project.name,
		transformTime: project.transformTime,
		share: project.transformTime / project.trackedTime
	}));
}
/**
* Detects projects where re-creating a DOM environment for every test file
* dominates the run. With an isolating pool the environment is set up once
* per file; `vmThreads`/`vmForks` set it up once per worker while still
* giving every file a fresh VM context.
*/
function getEnvironmentDiagnostics(projects) {
	return projects.filter((project) => {
		if (!DOM_ENVIRONMENTS.has(project.environment) || project.pool !== "forks" && project.pool !== "threads" || !project.isolate || project.browser || project.poolProvided || project.environmentCount <= 1 || project.environmentTime < MIN_ENVIRONMENT_TIME || project.trackedTime <= 0 || project.environmentTime / project.trackedTime < MIN_ENVIRONMENT_SHARE) return false;
		// setups are spread across the worker lanes; a vm pool would still pay
		// one setup per lane, so the reducible wall time is the rest
		const parallelism = Math.max(1, project.parallelism);
		return isSavingWorthHinting(project.environmentTime / parallelism - project.environmentTime / project.environmentCount, project.executionTime);
	}).map((project) => ({
		name: project.name,
		environment: project.environment,
		environmentTime: project.environmentTime,
		environmentCount: project.environmentCount,
		share: project.environmentTime / project.trackedTime,
		suggestIsolate: !project.isolateProvided
	}));
}

function computeDurationBreakdown(input) {
	const sums = {
		transform: 0,
		setup: 0,
		import: 0,
		tests: 0,
		environment: 0,
		worker: 0,
		typecheck: input.typecheckTime
	};
	for (const file of input.files) {
		// setup and collect wall times include the time the worker spent waiting
		// for module transforms; report that wait as its own "transform" phase so
		// every phase is a disjoint sum of per-worker time
		const setupFetch = file.setupFetchDuration || 0;
		const collectFetch = file.collectFetchDuration || 0;
		sums.transform += setupFetch + collectFetch;
		sums.setup += Math.max((file.setupDuration || 0) - setupFetch, 0);
		sums.import += Math.max((file.collectDuration || 0) - collectFetch, 0);
		sums.tests += file.result?.duration || 0;
		sums.environment += file.environmentLoad || 0;
		sums.worker += file.prepareDuration || 0;
	}
	const entries = Object.entries(sums);
	const total = entries.reduce((acc, [, time]) => acc + time, 0);
	return {
		total,
		phases: entries.map(([name, time]) => ({
			name,
			time,
			percent: total > 0 ? time / total * 100 : 0
		})).filter((phase) => phase.percent >= .5).sort((a, b) => b.time - a.time)
	};
}
function formatDurationBreakdown(breakdown) {
	return breakdown.phases.map((phase) => `${phase.name} ${formatPercent(phase.percent)}`).join(", ");
}
function formatPercent(percent) {
	// sub-1% shares round to "1%" instead of a misleading "0%"
	return `${Math.max(1, Math.round(percent))}%`;
}

const BENCH_TABLE_HEAD = [
	"hz",
	"min",
	"max",
	"mean",
	"p75",
	"p99",
	"p995",
	"p999",
	"rme",
	"samples"
];
function formatBenchNumber(number) {
	const res = String(number.toFixed(number < 100 ? 4 : 2)).split(".");
	return res[0].replace(/(?=(?:\d{3})+$)\B/g, ",") + (res[1] ? `.${res[1]}` : "");
}
// Plain-text rendering of the benchmark table (no ANSI colors, no indent).
// Used by the junit reporter to embed benchmark data in <system-out>.
function renderBenchmarkTableText(benchmarks, columnName = "name") {
	const lines = [];
	for (const benchmark of benchmarks) {
		const { tasks } = benchmark;
		if (tasks.length === 0) continue;
		if (lines.length > 0) lines.push("");
		const rows = tasks.map(renderBenchmarkRow);
		const head = [columnName, ...BENCH_TABLE_HEAD];
		const widths = computeBenchColumnWidths(head, rows);
		lines.push(padBenchRow(head, widths).join("  "));
		for (const task of tasks) {
			let row = padBenchRow(renderBenchmarkRow(task), widths).join("  ");
			if (task.rank === 1 && tasks.length > 1) row += "   fastest";
			if (task.rank === tasks.length && tasks.length > 2) row += "   slowest";
			lines.push(row);
		}
	}
	return lines.join("\n");
}
function renderBenchmarkRow(task) {
	return [
		task.name,
		formatBenchNumber(task.throughput.mean || 0),
		formatBenchNumber(task.latency.min || 0),
		formatBenchNumber(task.latency.max || 0),
		formatBenchNumber(task.latency.mean || 0),
		formatBenchNumber(task.latency.p75 || 0),
		formatBenchNumber(task.latency.p99 || 0),
		formatBenchNumber(task.latency.p995 || 0),
		formatBenchNumber(task.latency.p999 || 0),
		`\u00B1${(task.latency.rme || 0).toFixed(2)}%`,
		String(task.latency.samplesCount || 0)
	];
}
function computeBenchColumnWidths(header, rows) {
	const allRows = [header, ...rows];
	return Array.from(header, (_, i) => Math.max(...allRows.map((row) => stripVTControlCharacters(row[i]).length)));
}
function padBenchRow(row, widths) {
	return row.map((v, i) => i === 0 ? v.padEnd(widths[i]) : v.padStart(widths[i]));
}

function getTraceAttemptKey(trace) {
	return `${trace.repeats}:${trace.retry}`;
}
function groupTraceAttempts(traces) {
	const grouped = /* @__PURE__ */ new Map();
	for (const trace of traces) {
		const key = getTraceAttemptKey(trace);
		const group = grouped.get(key);
		if (group) group.push(trace);
		else grouped.set(key, [trace]);
	}
	const merged = /* @__PURE__ */ new Map();
	for (const [key, traces] of grouped) merged.set(key, {
		...traces[0],
		entries: normalizeTraceEntries(traces.flatMap((trace) => trace.entries))
	});
	return merged;
}
function normalizeTraceEntries(entries) {
	const merged = [];
	const startMap = /* @__PURE__ */ new Map();
	const parents = [];
	for (const entry of entries) {
		const range = entry.range;
		if (!range) {
			merged.push({
				...entry,
				depth: parents.length
			});
			continue;
		}
		if (range.phase === "start") {
			startMap.set(range.id, merged.length);
			merged.push({
				...entry,
				depth: parents.length
			});
			parents.push(range.id);
			continue;
		}
		// when range.phase === 'end'
		const index = startMap.get(range.id);
		if (index == null) {
			// unpaired range shouldn't happen but just leave it there
			merged.push({
				...entry,
				depth: 0
			});
			continue;
		}
		// Keep the start timestamp for positioning, but derive display duration
		// from the end event timestamp.
		const start = merged[index];
		merged[index] = {
			...start,
			...entry,
			startTime: start.startTime,
			duration: entry.startTime - start.startTime
		};
		parents.pop();
	}
	return merged;
}

function formatTraceTimeline(artifacts, { retryIndex, repeatIndex }, root) {
	const traces = artifacts.flatMap((artifact) => artifact.type === "internal:browserTrace" ? [artifact.data] : []);
	const attempt = groupTraceAttempts(traces).get(getTraceAttemptKey({
		retry: retryIndex,
		repeats: repeatIndex
	}));
	if (!attempt) return;
	// the test end is already shown by the error location
	const visible = attempt.entries.filter((step) => step.name !== "vitest:onAfterRetryTask");
	if (!visible.length) return;
	const shown = visible.slice(-10);
	const prefixes = getTreePrefixes(shown);
	const headerRow = { cells: [
		"step",
		"locator",
		"start",
		"duration",
		"location"
	] };
	const rows = [headerRow, ...shown.map((step, i) => formatStep(step, prefixes[i], root))];
	const widths = headerRow.cells.map((_, i) => Math.max(...rows.map((row) => row.cells[i].length)));
	const hasLocator = shown.some((step) => step.element?.locator);
	const lines = rows.map((row) => {
		// the last column is left unpadded so rows have no trailing spaces inside its color codes
		const [name, locator, start, duration, location] = row.cells.map((cell, i) => i === 4 ? cell : i === 2 || i === 3 ? cell.padStart(widths[i]) : cell.padEnd(widths[i]));
		if (row === headerRow) {
			const locatorColumn = hasLocator ? `${locator}  ` : "";
			return $.dim(`  ${name}  ${locatorColumn}${start}  ${duration}  ${location}`);
		}
		const text = `  ${name}  ${hasLocator ? `${colorCell(locator, $.cyan)}  ` : ""}${start}  ${colorCell(duration)}  ${colorCell(location, $.dim)}`;
		return row.status === "fail" ? $.red(text) : text;
	});
	const omitted = visible.length - shown.length;
	if (omitted) lines.splice(1, 0, $.dim(`  ... ${omitted} earlier ${omitted === 1 ? "step" : "steps"}`));
	const header = [];
	if (attempt.retry) header.push(`retry ${attempt.retry}`);
	if (attempt.repeats) header.push(`repeat ${attempt.repeats}`);
	return [`\n${header.length ? `Trace (${header.join(", ")}):` : "Trace:"}`, ...lines].join("\n");
}
function getTreePrefixes(steps) {
	const hasNextSibling = steps.map((step, i) => {
		return steps.slice(i + 1).find((other) => other.depth <= step.depth)?.depth === step.depth;
	});
	const lastAtDepth = [];
	return steps.map((step, i) => {
		lastAtDepth[step.depth] = i;
		if (step.depth === 0) return "";
		let prefix = "";
		for (let level = 1; level < step.depth; level++) prefix += hasNextSibling[lastAtDepth[level]] ? "│   " : "    ";
		return `${prefix}${hasNextSibling[i] ? F_TREE_NODE_MIDDLE : F_TREE_NODE_END} `;
	});
}
function formatStep(step, prefix, root) {
	const location = step.location && `${relative(root, step.location.file)}:${step.location.line}:${step.location.column}`;
	return {
		cells: [
			`${prefix}${formatStepName(step.name)}`,
			step.element?.locator || "-",
			`+${formatMs(step.startTime)}`,
			step.duration == null ? "-" : formatMs(step.duration),
			location || "-"
		],
		status: step.status
	};
}
function colorCell(cell, format = (text) => text) {
	return cell.trim() === "-" ? $.dim(cell) : format(cell);
}
function formatMs(ms) {
	return `${Math.round(ms)}ms`;
}
function formatStepName(name) {
	return name.startsWith("vitest:") ? name.slice(7) : name;
}

const BADGE_PADDING = "       ";
class BaseReporter {
	start = 0;
	end = 0;
	watchFilters;
	failedUnwatchedFiles = [];
	isTTY;
	ctx = void 0;
	renderSucceed = false;
	verbose = false;
	silent;
	_filesInWatchMode = /* @__PURE__ */ new Map();
	_timeStart = formatTimeString(/* @__PURE__ */ new Date());
	_perProjectBenchmarks = /* @__PURE__ */ new Map();
	_printedSuites = /* @__PURE__ */ new Set();
	constructor(options = {}) {
		this.isTTY = options.isTTY ?? isTTY;
		this.silent = options.silent;
	}
	onInit(ctx) {
		this.ctx = ctx;
		this.silent ??= this.ctx.config.silent;
		this.ctx.logger.printBanner();
	}
	log(...messages) {
		this.ctx.logger.log(...messages);
	}
	error(...messages) {
		this.ctx.logger.error(...messages);
	}
	relative(path) {
		return relative(this.ctx.config.root, path);
	}
	onTestRunStart(_specifications) {
		this.start = performance$1.now();
		this._timeStart = formatTimeString(/* @__PURE__ */ new Date());
		this._perProjectBenchmarks.clear();
	}
	onTestRunEnd(testModules, unhandledErrors, _reason) {
		const files = testModules.map((testModule) => testModule.task);
		const errors = [...unhandledErrors];
		this.end = performance$1.now();
		if (!files.length && !errors.length) this.ctx.logger.printNoTestFound(this.ctx.filenamePattern);
		else {
			this.printPerProjectBenchmarks();
			this.reportSummary(files, errors);
		}
	}
	onTestCaseResult(testCase) {
		if (testCase.result().state === "failed") this.logFailedTask(testCase.task);
	}
	onTestCaseBenchmark(testCase, benchmark) {
		const projectName = testCase.project.name || "";
		for (const task of benchmark.tasks) {
			if (!task.perProject) continue;
			const benchKey = `${testCase.module.relativeModuleId} > ${testCase.fullName} > ${task.name}`;
			let projectMap = this._perProjectBenchmarks.get(benchKey);
			if (!projectMap) {
				projectMap = /* @__PURE__ */ new Map();
				this._perProjectBenchmarks.set(benchKey, projectMap);
			}
			projectMap.set(projectName, task);
		}
	}
	onTestSuiteResult(testSuite) {
		if (testSuite.state() === "failed") this.logFailedTask(testSuite.task);
	}
	onTestModuleEnd(testModule) {
		if (testModule.state() === "failed") this.logFailedTask(testModule.task);
		this.printTestModule(testModule);
	}
	logFailedTask(task) {
		if (this.silent === "passed-only") for (const log of task.logs || []) this.onUserConsoleLog(log, "failed");
	}
	printTestModule(testModule) {
		const moduleState = testModule.state();
		if (moduleState === "queued" || moduleState === "pending") return;
		this._printedSuites.clear();
		let testsCount = 0;
		let failedCount = 0;
		let skippedCount = 0;
		let todoCount = 0;
		// delaying logs to calculate the test stats first
		// which minimizes the amount of for loops
		const logs = [];
		const originalLog = this.log.bind(this);
		this.log = (msg) => logs.push(msg);
		const visit = (suiteState, children) => {
			for (const child of children) if (child.type === "suite") {
				const suiteState = child.state();
				// Skipped suites are hidden when --hideSkippedTests, print otherwise
				if (!this.ctx.config.hideSkippedTests || suiteState !== "skipped" || child.task.mode === "todo") this.printTestSuite(child);
				visit(suiteState, child.children);
			} else {
				const testResult = child.result();
				testsCount++;
				if (testResult.state === "failed") failedCount++;
				else if (testResult.state === "skipped") {
					if (child.options.mode === "todo") todoCount++;
					else skippedCount++;
				}
				if (this.ctx.config.hideSkippedTests && suiteState === "skipped" && child.options.mode !== "todo")
 // Skipped suites are hidden when --hideSkippedTests
				continue;
				this.printTestCase(moduleState, child);
			}
		};
		try {
			visit(moduleState, testModule.children);
		} finally {
			this.log = originalLog;
		}
		this.log(this.getModuleLog(testModule, {
			tests: testsCount,
			failed: failedCount,
			skipped: skippedCount,
			todo: todoCount
		}));
		logs.forEach((log) => this.log(log));
	}
	printTestCase(moduleState, test) {
		const testResult = test.result();
		const { duration = 0 } = test.diagnostic() || {};
		const padding = this.getTestIndentation(test.task);
		const suffix = this.getTestCaseSuffix(test);
		// perProject tasks still appear in the inline table — they're additionally
		// aggregated in the cross-project section at the end of the run
		const inlineBenchmarks = test.benchmarks().filter((b) => b.tasks.length > 0);
		if (testResult.state === "failed") {
			this.printAncestorSuites(test);
			this.log($.red(` ${padding}${taskFail} ${this.getTestName(test.task, separator)}`) + suffix);
		} else if (duration > this.ctx.config.slowTestThreshold) {
			this.printAncestorSuites(test);
			this.log(` ${padding}${$.yellow($.dim(F_CHECK))} ${this.getTestName(test.task, separator)}${suffix}`);
		} else if (this.ctx.config.hideSkippedTests && testResult.state === "skipped" && test.options.mode !== "todo") ; else if (this.renderSucceed || moduleState === "failed" || inlineBenchmarks.length) {
			this.printAncestorSuites(test);
			this.log(` ${padding}${this.getStateSymbol(test)} ${this.getTestName(test.task, separator)}${suffix}`);
		}
		if (inlineBenchmarks.length > 0) this.printBenchmarkTable(inlineBenchmarks, padding);
	}
	getModuleLog(testModule, counts) {
		let state = $.dim(`${counts.tests} test${counts.tests > 1 ? "s" : ""}`);
		if (counts.failed) state += $.dim(" | ") + $.red(`${counts.failed} failed`);
		if (counts.skipped) state += $.dim(" | ") + $.yellow(`${counts.skipped} skipped`);
		if (counts.todo) state += $.dim(" | ") + $.gray(`${counts.todo} todo`);
		let suffix = $.dim("(") + state + $.dim(")") + this.getDurationPrefix(testModule.task);
		const diagnostic = testModule.diagnostic();
		if (diagnostic.heap != null) suffix += $.magenta(` ${Math.floor(diagnostic.heap / 1024 / 1024)} MB heap used`);
		return ` ${this.getEntityPrefix(testModule)} ${testModule.task.name} ${suffix}`;
	}
	printTestSuite(testSuite) {
		if (!this.renderSucceed) return;
		this.printSuiteEntry(testSuite);
	}
	printSuiteEntry(testSuite) {
		if (this._printedSuites.has(testSuite.id)) return;
		this._printedSuites.add(testSuite.id);
		const indentation = "  ".repeat(getIndentation(testSuite.task));
		const tests = Array.from(testSuite.children.allTests());
		const state = this.getStateSymbol(testSuite);
		this.log(` ${indentation}${state} ${testSuite.name} ${$.dim(`(${tests.length})`)}`);
	}
	// When a test line is emitted while renderSucceed is off (e.g. slow tests
	// or inline benchmarks in CI), its parent describe suites were never printed
	// by the outer visitor. Walk up and print any that are still missing so the
	// nesting matches what the TTY output would show.
	printAncestorSuites(test) {
		if (this.renderSucceed) return;
		const suites = [];
		let parent = test.parent;
		while (parent.type === "suite" && !this._printedSuites.has(parent.id)) {
			suites.push(parent);
			parent = parent.parent;
		}
		for (let i = suites.length - 1; i >= 0; i--) this.printSuiteEntry(suites[i]);
	}
	getTestName(test, _separator) {
		return test.name;
	}
	getFullName(test, separator) {
		if (test === test.file) return test.name;
		let name = test.file.name;
		if (test.location) name += $.dim(`:${test.location.line}`);
		name += separator;
		name += getTestName(test, separator);
		return name;
	}
	getTestIndentation(test) {
		return "  ".repeat(getIndentation(test));
	}
	printAnnotations(test, console, padding = 0) {
		const annotations = test.annotations();
		if (!annotations.length) return;
		const PADDING = " ".repeat(padding);
		const groupedAnnotations = {};
		annotations.forEach((annotation) => {
			const { location, type } = annotation;
			let group;
			if (location) {
				const file = relative(test.project.config.root, location.file);
				group = `${$.gray(`${file}:${location.line}:${location.column}`)} ${$.bold(type)}`;
			} else group = $.bold(type);
			groupedAnnotations[group] ??= [];
			groupedAnnotations[group].push(annotation);
		});
		for (const group in groupedAnnotations) {
			this[console](`${PADDING}${$.blue(F_POINTER)} ${group}`);
			groupedAnnotations[group].forEach(({ message }) => {
				this[console](`${PADDING}  ${$.blue(F_DOWN_RIGHT)} ${message}`);
			});
		}
	}
	getEntityPrefix(entity) {
		let title = this.getStateSymbol(entity);
		if (entity.project.name) title += ` ${formatProjectName(entity.project, "")}`;
		if (entity.meta().typecheck) title += ` ${$.bgBlue($.bold(" TS "))}`;
		const label = this.ctx.state.blobs && entity.task.file.meta.__vitest_label__;
		if (label) title += ` ${$.bgCyan($.bold(` ${label} `))}`;
		return title;
	}
	getTestCaseSuffix(testCase) {
		const { heap, retryCount, repeatCount } = testCase.diagnostic() || {};
		const testResult = testCase.result();
		let suffix = this.getDurationPrefix(testCase.task);
		if (retryCount != null && retryCount > 0) suffix += $.yellow(` (retry x${retryCount})`);
		if (repeatCount != null && repeatCount > 0) suffix += $.yellow(` (repeat x${repeatCount})`);
		if (heap != null) suffix += $.magenta(` ${Math.floor(heap / 1024 / 1024)} MB heap used`);
		if (testResult.state === "skipped" && testResult.note) suffix += $.dim($.gray(` [${testResult.note}]`));
		return suffix;
	}
	getStateSymbol(test) {
		return getStateSymbol(test.task);
	}
	getDurationPrefix(task) {
		const duration = task.result?.duration && Math.round(task.result?.duration);
		if (duration == null) return "";
		return (duration > this.ctx.config.slowTestThreshold ? $.yellow : $.green)(` ${duration}${$.dim("ms")}`);
	}
	onWatcherStart(files = this.ctx.state.getFiles(), errors = this.ctx.state.getUnhandledErrors()) {
		if (errors.length > 0 || hasFailed(files)) this.log(withLabel("red", "FAIL", "Tests failed. Watching for file changes..."));
		else if (this.ctx.isCancelling) this.log(withLabel("red", "CANCELLED", "Test run cancelled. Watching for file changes..."));
		else this.log(withLabel("green", "PASS", "Waiting for file changes..."));
		const hints = [$.dim("press ") + $.bold("h") + $.dim(" to show help")];
		if (hasFailedSnapshot(files)) {
			hints.unshift($.dim("press ") + $.bold($.yellow("u")) + $.dim(" to update snapshot"));
			hints.unshift($.dim("press ") + $.bold($.yellow("i")) + $.dim(" to review snapshot fails"));
		} else hints.push($.dim("press ") + $.bold("q") + $.dim(" to quit"));
		this.log(BADGE_PADDING + hints.join($.dim(", ")));
	}
	onWatcherRerun(files, trigger) {
		this.watchFilters = files;
		this.failedUnwatchedFiles = this.ctx.state.getTestModules().filter((testModule) => !files.includes(testModule.task.filepath) && testModule.state() === "failed");
		// Update re-run count for each file
		files.forEach((filepath) => {
			let reruns = this._filesInWatchMode.get(filepath) ?? 0;
			this._filesInWatchMode.set(filepath, ++reruns);
		});
		let banner = trigger ? $.dim(`${this.relative(trigger)} `) : "";
		if (files.length === 1) {
			const rerun = this._filesInWatchMode.get(files[0]) ?? 1;
			banner += $.blue(`x${rerun} `);
		}
		this.ctx.logger.clearFullScreen();
		this.log(withLabel("blue", "RERUN", banner));
		if (this.ctx.configOverride.project) this.log(BADGE_PADDING + $.dim(" Project name: ") + $.blue(toArray(this.ctx.configOverride.project).join(", ")));
		if (this.ctx.filenamePattern) this.log(BADGE_PADDING + $.dim(" Filename pattern: ") + $.blue(this.ctx.filenamePattern.join(", ")));
		if (this.ctx.configOverride.testNamePattern) this.log(BADGE_PADDING + $.dim(" Test name pattern: ") + $.blue(String(this.ctx.configOverride.testNamePattern)));
		this.log("");
		for (const testModule of this.failedUnwatchedFiles) this.printTestModule(testModule);
	}
	onUserConsoleLog(log, taskState) {
		if (!this.shouldLog(log, taskState)) return;
		const output = log.type === "stdout" ? this.ctx.logger.outputStream : this.ctx.logger.errorStream;
		const write = (msg) => output.write(msg);
		let headerText = "unknown test";
		const task = log.taskId ? this.ctx.state.idMap.get(log.taskId) : void 0;
		if (task) headerText = this.getFullName(task, separator);
		else if (log.taskId && log.taskId !== "__vitest__unknown_test__") headerText = log.taskId;
		write($.gray(log.type + $.dim(` | ${headerText}\n`)) + log.content);
		if (log.origin) {
			// browser logs don't have an extra end of line at the end like Node.js does
			if (log.browser) write("\n");
			const project = task ? this.ctx.getProjectByName(task.file.projectName || "") : this.ctx.getRootProject();
			const stack = log.browser ? project.browser?.parseStacktrace(log.origin) || [] : parseStacktrace(log.origin);
			const highlight = task && stack.find((i) => i.file === task.file.filepath);
			for (const frame of stack) {
				const color = frame === highlight ? $.cyan : $.gray;
				const path = relative(project.config.root, frame.file);
				const positions = [frame.method, `${path}:${$.dim(`${frame.line}:${frame.column}`)}`].filter(Boolean).join(" ");
				write(color(` ${$.dim(F_POINTER)} ${positions}\n`));
			}
		}
		write("\n");
	}
	onTestRemoved(trigger) {
		this.log($.yellow("Test removed...") + (trigger ? $.dim(` [ ${this.relative(trigger)} ]\n`) : ""));
	}
	shouldLog(log, taskState) {
		if (this.silent === true) return false;
		if (this.silent === "passed-only" && taskState !== "failed") return false;
		if (this.ctx.config.onConsoleLog) {
			const task = log.taskId ? this.ctx.state.idMap.get(log.taskId) : void 0;
			const entity = task && this.ctx.state.getReportedEntity(task);
			if (this.ctx.config.onConsoleLog(log.content, log.type, entity) === false) return false;
		}
		return true;
	}
	onServerRestart(reason) {
		this.log($.bold($.magenta(reason === "config" ? "\nRestarting due to config changes..." : "\nRestarting Vitest...")));
	}
	reportSummary(files, errors) {
		this.printErrorsSummary(files, errors);
		const leakCount = this.printLeaksSummary();
		this.reportTestSummary(files, errors, leakCount);
	}
	printSourceFilterSummary() {
		const result = this.ctx._sourceFilterResult;
		const related = this.ctx.config.related;
		if (!result || !related) return;
		const sources = related.length === 1 && !this.ctx.config.changed ? relative(this.ctx.config.root, related[0]) : `${related.length} ${this.ctx.config.changed ? "changed " : ""}${noun(related.length, "file", "files")}`;
		const failed = result.failed ? `, ${result.failed} previously failed` : "";
		this.log(padSummaryTitle("Affected"), `${result.affected} of ${result.total} test files`, $.dim(`(related to ${sources}${failed})`));
	}
	printLastFailedSummary() {
		const result = this.ctx._failedFilterResult;
		if (!result) return;
		this.log(padSummaryTitle("Last Failed"), `${result.selected} of ${result.total} test files`);
	}
	reportTestSummary(files, errors, leakCount) {
		this.log();
		const affectedFiles = [...this.failedUnwatchedFiles.map((m) => m.task), ...files];
		const tests = getTests(affectedFiles);
		const snapshotOutput = renderSnapshotSummary(this.ctx.config.root, this.ctx.snapshot.summary);
		for (const [index, snapshot] of snapshotOutput.entries()) {
			const title = index === 0 ? "Snapshots" : "";
			this.log(`${padSummaryTitle(title)} ${snapshot}`);
		}
		if (snapshotOutput.length > 1) this.log();
		this.log(padSummaryTitle("Test Files"), getStateString$1(affectedFiles));
		this.printSourceFilterSummary();
		this.printLastFailedSummary();
		this.log(padSummaryTitle("Tests"), getStateString$1(tests));
		if (this.ctx.projects.some((c) => c.config.typecheck.enabled)) {
			const failed = tests.filter((t) => t.meta?.typecheck && t.result?.errors?.length);
			this.log(padSummaryTitle("Type Errors"), failed.length ? $.bold($.red(`${failed.length} failed`)) : $.dim("no errors"));
		}
		if (errors.length) this.log(padSummaryTitle("Errors"), $.bold($.red(`${errors.length} error${errors.length > 1 ? "s" : ""}`)));
		if (leakCount) this.log(padSummaryTitle("Leaks"), $.bold($.red(`${leakCount} leak${leakCount > 1 ? "s" : ""}`)));
		this.log(padSummaryTitle("Start at"), this._timeStart);
		const collectTime = sum(files, (file) => file.collectDuration);
		const testsTime = sum(files, (file) => file.result?.duration);
		const setupTime = sum(files, (file) => file.setupDuration);
		if (this.watchFilters) this.log(padSummaryTitle("Duration"), formatTime(collectTime + testsTime + setupTime));
		else {
			const blobs = this.ctx.state.blobs;
			// Execution time is either sum of all runs of `--merge-reports` or the current run's time
			const executionTime = blobs?.executionTimes ? sum(blobs.executionTimes, (time) => time) : this.end - this.start;
			const breakdown = computeDurationBreakdown({
				files,
				typecheckTime: sum(this.ctx.projects, (project) => project.typechecker?.getResult().time)
			});
			// percentages are relative to the sum of all tracked phases: phases run
			// in parallel workers, so their sum is not comparable to the wall time
			const timers = breakdown.total > 0 ? formatDurationBreakdown(breakdown) : "";
			this.log(padSummaryTitle("Duration"), formatTime(executionTime) + (timers ? $.dim(` (${timers})`) : ""));
			if (blobs?.executionTimes) this.log(padSummaryTitle("Per blob") + blobs.executionTimes.map((time) => ` ${formatTime(time)}`).join(""));
		}
		this.reportImportDurations();
		if (!(this.reportEnvironmentDiagnostic(files) || this.reportImportDiagnostic(files) || this.reportTransformDiagnostic(files))) this.reportIsolateDiagnostic(files);
		this.log();
	}
	/**
	* Surfaces the cost of re-creating a DOM environment for every test file:
	* with an isolating pool, `jsdom`/`happy-dom` are imported and set up once
	* per file. When that repeated setup dominates the run, hint that a `vm`
	* pool sets the environment up once per worker while keeping per-file
	* isolation, and that `isolate: false` shares it across files.
	*/
	reportEnvironmentDiagnostic(files) {
		// merged blob reports replay durations of past runs: no environments were
		// created by this process
		if (this.ctx.config.watch || this.ctx.state.blobs || !this.ctx.config.experimental.diagnostics.environment) return false;
		const executionTime = this.end - this.start;
		const maxWorkers = this.ctx.config.maxWorkers;
		const inputs = this.ctx.projects.map((project) => {
			const projectFiles = files.filter((file) => (file.projectName || "") === project.name);
			let environmentTime = 0;
			let environmentCount = 0;
			let trackedTime = 0;
			for (const file of projectFiles) {
				if (file.environmentLoad) {
					environmentTime += file.environmentLoad;
					environmentCount++;
				}
				trackedTime += trackedFileTime(file);
			}
			return {
				name: project.name,
				environment: project.config.environment,
				pool: project.config.pool,
				isolate: project.config.isolate,
				browser: project.config.browser.enabled,
				poolProvided: project.config.providedOptions.pool,
				isolateProvided: project.config.providedOptions.isolate,
				environmentTime,
				environmentCount,
				trackedTime,
				parallelism: Math.max(1, Math.min(environmentCount, maxWorkers)),
				executionTime
			};
		});
		const diagnostics = getEnvironmentDiagnostics(inputs);
		if (!diagnostics.length) return false;
		for (const diagnostic of diagnostics) {
			const project = this.ctx.projects.find((p) => p.name === diagnostic.name);
			this.log();
			this.log(padSummaryTitle("Environment"), formatProjectName(project) + $.yellow(`${diagnostic.environment} was created ${diagnostic.environmentCount} times`) + $.dim(` · ${formatTime(diagnostic.environmentTime)} total, ${Math.round(diagnostic.share * 100)}% of tracked time`));
			const alternative = diagnostic.suggestIsolate ? $.dim(" (keeps per-file isolation) or ") + $.yellow("isolate: false") + $.dim(" (shares it across files)") : $.dim(" (keeps per-file isolation)");
			this.log(padSummaryTitle(""), $.dim("create it once per worker with ") + $.yellow(`pool: 'vmThreads'`) + alternative);
			this.log(padSummaryTitle(""), $.dim("learn more: https://vitest.dev/guide/improving-performance#test-environments"));
		}
		return true;
	}
	/**
	* Surfaces repeated evaluation of the same module graph: with `isolate: true`
	* every test file re-imports its whole graph, so suites where files share
	* most of their modules (typically through barrel files) pay the graph cost
	* once per file. The duplication is measured from server-side fetch counts,
	* so suites with disjoint per-file graphs stay quiet.
	*/
	reportImportDiagnostic(files) {
		if (this.ctx.config.watch || this.ctx.state.blobs || !this.ctx.config.experimental.diagnostics.import) return false;
		const executionTime = this.end - this.start;
		const maxWorkers = this.ctx.config.maxWorkers;
		const inputs = this.ctx.projects.map((project) => {
			const projectFiles = files.filter((file) => (file.projectName || "") === project.name);
			let importTime = 0;
			let trackedTime = 0;
			for (const file of projectFiles) {
				// the transform wait is subtracted because `isolate: false` only avoids
				// re-evaluating modules, the server transforms each of them once either way
				importTime += Math.max((file.collectDuration || 0) - (file.collectFetchDuration || 0), 0);
				trackedTime += trackedFileTime(file);
			}
			const durations = this.ctx.state.metadata[project.name]?.duration;
			return {
				name: project.name,
				pool: project.config.pool,
				isolate: project.config.isolate,
				browser: project.config.browser.enabled,
				isolateProvided: project.config.providedOptions.isolate,
				importTime,
				trackedTime,
				fetchCounts: durations ? Object.values(durations).map((times) => times.length) : [],
				fileCount: projectFiles.length,
				parallelism: Math.max(1, Math.min(projectFiles.length, maxWorkers)),
				executionTime
			};
		});
		const diagnostics = getImportDiagnostics(inputs);
		if (!diagnostics.length) return false;
		for (const diagnostic of diagnostics) {
			const project = this.ctx.projects.find((p) => p.name === diagnostic.name);
			this.log();
			this.log(padSummaryTitle("Import"), formatProjectName(project) + $.yellow(`${diagnostic.uniqueModules} modules were evaluated ${diagnostic.totalFetches} times`) + $.dim(` · ${formatTime(diagnostic.importTime)} total, ${Math.round(diagnostic.share * 100)}% of tracked time`));
			this.log(padSummaryTitle(""), $.dim(`~${formatTime(diagnostic.estimatedSaving)} faster with `) + $.yellow("isolate: false") + $.dim(" — shared modules are evaluated once per worker instead of once per file"));
			this.log(padSummaryTitle(""), $.dim("learn more: https://vitest.dev/guide/improving-performance#test-isolation"));
		}
		return true;
	}
	/**
	* Surfaces transform-dominated runs: without the fs module cache every
	* `vitest run` transforms the whole module graph from scratch. Enabling
	* `fsModuleCache` persists the results so the next run skips them.
	*/
	reportTransformDiagnostic(files) {
		if (this.ctx.config.watch || this.ctx.state.blobs || !this.ctx.config.experimental.diagnostics.transform) return false;
		const executionTime = this.end - this.start;
		const inputs = this.ctx.projects.map((project) => {
			const projectFiles = files.filter((file) => (file.projectName || "") === project.name);
			let transformTime = 0;
			let trackedTime = 0;
			for (const file of projectFiles) {
				transformTime += (file.setupFetchDuration || 0) + (file.collectFetchDuration || 0);
				trackedTime += trackedFileTime(file);
			}
			return {
				name: project.name,
				transformTime,
				trackedTime,
				fsModuleCache: project.config.fsModuleCache === true,
				fsModuleCacheProvided: project.config.providedOptions.fsModuleCache,
				executionTime
			};
		});
		const diagnostics = getTransformDiagnostics(inputs);
		if (!diagnostics.length) return false;
		for (const diagnostic of diagnostics) {
			const project = this.ctx.projects.find((p) => p.name === diagnostic.name);
			this.log();
			this.log(padSummaryTitle("Transform"), formatProjectName(project) + $.yellow(`transforming modules took ${formatTime(diagnostic.transformTime)}`) + $.dim(` · ${Math.round(diagnostic.share * 100)}% of tracked time, re-done on every run`));
			this.log(padSummaryTitle(""), $.dim("persist transforms across runs with ") + $.yellow("fsModuleCache: true"));
			if (isCI) this.log(padSummaryTitle(""), $.dim("on CI this only helps when the cache directory is persisted between runs"));
			this.log(padSummaryTitle(""), $.dim("learn more: https://vitest.dev/guide/improving-performance#caching-between-reruns"));
		}
		return true;
	}
	/**
	* Surfaces the cost of `isolate: true`: with isolation enabled Vitest spawns a
	* fresh worker (and re-creates the test environment) for every test file. When
	* that repeated startup cost is significant, hint that `isolate: false` would
	* reuse workers across files.
	*/
	reportIsolateDiagnostic(files) {
		// opt-out via `experimental.diagnostics.isolate`; the timers it relies on
		// are only shown for a full (non-watch) run
		if (this.ctx.config.watch || !this.ctx.config.experimental.diagnostics.isolate) return;
		const state = this.ctx.state;
		const numWorkers = state.workersSpawned;
		// only meaningful when at least one non-browser project isolates workers
		// without the user having explicitly chosen isolation
		const isolates = this.ctx.projects.some((project) => project.config.isolate && !project.config.browser.enabled && !project.config.providedOptions.isolate);
		if (!numWorkers || !isolates) return;
		const numFiles = files.length;
		// `startupTime` is the summed (across workers) time spent spawning the worker,
		// loading its bundle and setting up the environment. The environment setup is
		// already part of this window, so it is not added separately.
		const startupTime = state.startupTime;
		const avgStartup = startupTime / numWorkers;
		// with `isolate: false` the same files would run in ~`parallelism` reused
		// workers instead of spawning a fresh worker for every file
		const parallelism = Math.max(1, Math.min(numFiles, this.ctx.config.maxWorkers));
		// nothing was actually spawned per-file (e.g. a single worker handled everything)
		if (numWorkers <= parallelism) return;
		// Spawns are spread across ~`parallelism` lanes, so the wall-clock cost is the
		// summed startup divided by parallelism. Reusing workers leaves ~1 spawn per
		// lane, so the reducible wall-clock time is the rest.
		const wallStartup = startupTime / parallelism;
		// Reused workers also keep evaluated modules alive, so every module a later
		// file would re-evaluate is saved as well. Per-module evaluation times are
		// only collected when `experimental.importDurations` is enabled — without
		// them the spawn saving is reported as a lower bound ("at least").
		const measuresModules = this.ctx.config.experimental.importDurations.limit > 0;
		let moduleSavings = 0;
		if (measuresModules) {
			// vm pools re-create the module graph per VM context regardless of
			// `isolate`, so only files of `forks`/`threads` projects count
			const eligibleProjects = new Set(this.ctx.projects.filter((project) => (project.config.pool === "forks" || project.config.pool === "threads") && project.config.isolate && !project.config.browser.enabled && !project.config.providedOptions.isolate).map((project) => project.name));
			const moduleSelfTimes = /* @__PURE__ */ new Map();
			for (const file of files) {
				if (!eligibleProjects.has(file.projectName || "") || !file.importDurations) continue;
				for (const moduleId in file.importDurations) {
					let times = moduleSelfTimes.get(moduleId);
					if (!times) {
						times = [];
						moduleSelfTimes.set(moduleId, times);
					}
					times.push(file.importDurations[moduleId].selfTime);
				}
			}
			moduleSavings = estimateModuleEvaluationSaving(moduleSelfTimes.values(), parallelism);
		}
		const estimatedSavings = wallStartup - avgStartup + moduleSavings;
		if (!isSavingWorthHinting(estimatedSavings, this.end - this.start)) return;
		this.log();
		this.log(padSummaryTitle("Isolate"), $.yellow(`${numWorkers} workers spawned`) + $.dim(` · ~${formatTime(avgStartup)} startup each (spawn + environment, per file)`));
		this.log(padSummaryTitle(""), $.dim(`${measuresModules ? "" : "at least "}~${formatTime(estimatedSavings)} faster with `) + $.yellow("isolate: false") + $.dim(measuresModules ? " — reuses workers across files and evaluates shared modules once per worker" : " — reuses workers across files instead of one per file"));
	}
	reportImportDurations() {
		const { print, failOnDanger, thresholds } = this.ctx.config.experimental.importDurations;
		if (!print && !failOnDanger) return;
		const testModules = this.ctx.state.getTestModules();
		const allImports = [];
		for (const testModule of testModules) {
			const importDurations = testModule.diagnostic().importDurations;
			for (const filePath in importDurations) {
				const duration = importDurations[filePath];
				allImports.push({
					importedModuleId: filePath,
					testModule,
					selfTime: duration.selfTime,
					totalTime: duration.totalTime,
					external: duration.external
				});
			}
		}
		if (allImports.length === 0) return;
		let dangerImportsCount = 0;
		let hasWarnImports = false;
		let totalSelfTime = 0;
		let totalTotalTime = 0;
		for (const imp of allImports) {
			if (imp.totalTime >= thresholds.danger) dangerImportsCount++;
			if (imp.totalTime >= thresholds.warn) hasWarnImports = true;
			totalSelfTime += imp.selfTime;
			totalTotalTime += imp.totalTime;
		}
		// Determine if we should print
		const shouldFail = failOnDanger && dangerImportsCount > 0;
		if (!(print === true || print === "on-warn" && hasWarnImports || shouldFail)) return;
		const sortedImports = allImports.sort((a, b) => b.totalTime - a.totalTime);
		const maxTotalTime = sortedImports[0].totalTime;
		const limit = this.ctx.config.experimental.importDurations.limit;
		const topImports = sortedImports.slice(0, limit);
		const slowestImport = sortedImports[0];
		this.log();
		this.log($.bold("Import Duration Breakdown") + $.dim(` (Top ${limit})`));
		this.log();
		this.log($.dim(`${"Module".padEnd(50)} ${"Self".padStart(6)} ${"Total".padStart(6)}`));
		// if there are multiple files, it's highly possible that some of them will import the same large file
		// we group them to show the distinction between those files more easily
		//     Import Duration Breakdown (Top 10)
		//
		//     Module                                              Self     Total
		//     .../fields/FieldFile/__tests__/FieldFile.spec.ts     7ms    1.01s  ████████████████████
		//      ↳ tests/support/components/index.ts                 0ms     861ms █████████████████░░░
		//      ↳ tests/support/components/renderComponent.ts      59ms     861ms █████████████████░░░
		//     ...s__/apps/desktop/form-updater.desktop.spec.ts     8ms     991ms ████████████████████
		//     ...sts__/apps/mobile/form-updater.mobile.spec.ts    11ms     990ms ████████████████████
		//     shared/components/Form/__tests__/Form.spec.ts        5ms     988ms ████████████████████
		//      ↳ tests/support/components/index.ts                 0ms     935ms ███████████████████░
		//      ↳ tests/support/components/renderComponent.ts      61ms     935ms ███████████████████░
		//     ...ditor/features/link/__test__/LinkForm.spec.ts     7ms     972ms ███████████████████░
		//      ↳ tests/support/components/renderComponent.ts      56ms     936ms ███████████████████░
		const groupedImports = Object.entries(
			groupBy(topImports, (i) => i.testModule.id)
			// the first one is always the highest because the modules are already sorted
		).sort(([, imps1], [, imps2]) => imps2[0].totalTime - imps1[0].totalTime);
		for (const [_, group] of groupedImports) group.forEach((imp, index) => {
			const barWidth = 20;
			const filledWidth = Math.round(imp.totalTime / maxTotalTime * barWidth);
			const bar = $.cyan("█".repeat(filledWidth)) + $.dim("░".repeat(barWidth - filledWidth));
			// only show the arrow if there is more than 1 group
			const pathDisplay = this.ellipsisPath(imp.importedModuleId, imp.external, groupedImports.length > 1 && index > 0);
			this.log(`${pathDisplay} ${this.importDurationTime(imp.selfTime)} ${this.importDurationTime(imp.totalTime)}  ${bar}`);
		});
		this.log();
		this.log($.dim("Total imports: ") + allImports.length);
		this.log($.dim("Slowest import (total-time): ") + formatTime(slowestImport.totalTime));
		this.log($.dim("Total import time (self/total): ") + formatTime(totalSelfTime) + $.dim(" / ") + formatTime(totalTotalTime));
		// Fail if danger threshold exceeded
		if (shouldFail) {
			this.log();
			this.ctx.logger.error(`ERROR: ${dangerImportsCount} import(s) exceeded the danger threshold of ${thresholds.danger}ms`);
			process.exitCode = 1;
		}
	}
	importDurationTime(duration) {
		const { thresholds } = this.ctx.config.experimental.importDurations;
		return (duration >= thresholds.danger ? $.red : duration >= thresholds.warn ? $.yellow : (c) => c)(formatTime(duration).padStart(6));
	}
	ellipsisPath(path, external, nested) {
		const pathDisplay = this.relative(path);
		const color = external ? $.magenta : (c) => c;
		const slicedPath = pathDisplay.slice(-44);
		let title = "";
		if (pathDisplay.length > slicedPath.length) title += "...";
		if (nested) title = ` ${F_DOWN_RIGHT} ${title}`;
		title += slicedPath;
		return color(title.padEnd(50));
	}
	printErrorsSummary(files, errors) {
		const suites = getSuites(files);
		const tests = getTests(files);
		const failedSuites = suites.filter((i) => i.result?.errors);
		const failedTests = tests.filter((i) => i.result?.state === "fail");
		const failedTotal = countTestErrors(failedSuites) + countTestErrors(failedTests);
		// TODO: error divider should take into account merged errors for counting
		let current = 1;
		const errorDivider = () => this.error(`${$.red($.dim(divider(`[${current++}/${failedTotal}]`, void 0, 1)))}\n`);
		if (failedSuites.length) {
			this.error(`\n${errorBanner(`Failed Suites ${failedSuites.length}`)}\n`);
			this.printTaskErrors(failedSuites, errorDivider);
		}
		if (failedTests.length) {
			this.error(`\n${errorBanner(`Failed Tests ${failedTests.length}`)}\n`);
			this.printTaskErrors(failedTests, errorDivider);
		}
		if (errors.length) {
			this.ctx.logger.printUnhandledErrors(errors);
			this.error();
		}
	}
	printLeaksSummary() {
		const leaks = this.ctx.state.leakSet;
		if (leaks.size === 0) return 0;
		const leakWithStacks = /* @__PURE__ */ new Map();
		// Leaks can be duplicate, where type and position are identical
		for (const leak of leaks) {
			const stacks = parseStacktrace(leak.stack);
			if (stacks.length === 0) continue;
			const key = `${this.relative(leak.filename)}:${stacks[0].line}:${stacks[0].column}:${leak.type}`;
			if (leakWithStacks.has(key)) continue;
			leakWithStacks.set(key, {
				leak,
				stacks
			});
		}
		this.error(`\n${errorBanner(`Async Leaks ${leakWithStacks.size}`)}\n`);
		for (const { leak, stacks } of leakWithStacks.values()) {
			const filename = this.relative(leak.filename);
			this.ctx.logger.error($.red(`${leak.type} leaking in ${filename}`));
			try {
				const sourceCode = readFileSync(stacks[0].file, "utf-8");
				this.ctx.logger.error(generateCodeFrame(sourceCode.length > 1e5 ? sourceCode : this.ctx.logger.highlight(stacks[0].file, sourceCode), void 0, stacks[0]));
			} catch {}
			printStack(this.ctx.logger, this.ctx.getProjectByName(leak.projectName), stacks, stacks[0], {});
		}
		return leakWithStacks.size;
	}
	printPerProjectBenchmarks() {
		if (this._perProjectBenchmarks.size === 0) return;
		let hasComparable = false;
		for (const projectMap of this._perProjectBenchmarks.values()) if (projectMap.size > 1) {
			hasComparable = true;
			break;
		}
		if (!hasComparable) return;
		this.log("");
		this.log(divider($.bold($.bgBlue(` Cross-Project Benchmark Comparison `)), null, null, $.blue));
		for (const [benchName, projectMap] of this._perProjectBenchmarks) {
			const tasks = [...projectMap.entries()].sort((a, b) => a[1].latency.mean - b[1].latency.mean).map(([projectName, task], index) => ({
				...task,
				name: projectName,
				rank: index + 1
			}));
			if (tasks.length <= 1) continue;
			this.log("");
			this.log(`  ${$.dim(benchName)}`);
			this.printBenchmarkTable([{
				name: benchName,
				tasks
			}], "", "project");
		}
		this.log("");
	}
	printBenchmarkTable(benchmarks, basePadding, columnName = "name") {
		let printedCount = 0;
		for (const benchmark of benchmarks) {
			const { tasks } = benchmark;
			if (tasks.length === 0) continue;
			if (printedCount > 0) this.log("");
			const rows = tasks.map((t) => renderBenchmarkRow(t));
			const tableHead = [columnName, ...BENCH_TABLE_HEAD];
			const widths = computeBenchColumnWidths(tableHead, rows);
			const indent = ` ${basePadding}  `;
			this.log(`${indent}${padBenchRow(tableHead, widths).map($.bold).join("  ")}`);
			printedCount++;
			for (const task of tasks) {
				const padded = padBenchRow(renderBenchmarkRow(task), widths);
				let row = [
					padded[0],
					$.blue(padded[1]),
					$.cyan(padded[2]),
					$.cyan(padded[3]),
					$.cyan(padded[4]),
					$.cyan(padded[5]),
					$.cyan(padded[6]),
					$.cyan(padded[7]),
					$.cyan(padded[8]),
					$.dim(padded[9]),
					$.dim(padded[10])
				].join("  ");
				if (task.rank === 1 && tasks.length > 1) row += $.bold($.green("   fastest"));
				if (task.rank === tasks.length && tasks.length > 2) row += $.bold($.gray("   slowest"));
				this.log(`${indent}${row}`);
			}
		}
	}
	printTaskErrors(tasks, errorDivider) {
		const errorsQueue = [];
		for (const task of tasks)
 // Merge identical errors
		for (const { error, attempt } of getErrorsWithAttempt(task)) {
			let previous;
			if (error.stack) previous = errorsQueue.find((item) => {
				if (item.error.stack !== error.stack || item.error.diff !== error.diff) return false;
				const itemTask = item.sources[0].task;
				const currentProjectName = task?.projectName || task.file?.projectName || "";
				const projectName = itemTask?.projectName || itemTask.file?.projectName || "";
				const currentAnnotations = task.type === "test" && task.annotations;
				const itemAnnotations = itemTask.type === "test" && itemTask.annotations;
				return projectName === currentProjectName && deepEqual(currentAnnotations, itemAnnotations);
			});
			if (previous) previous.sources.push({
				task,
				attempt
			});
			else errorsQueue.push({
				error,
				sources: [{
					task,
					attempt
				}]
			});
		}
		for (const { error, sources } of errorsQueue) {
			const tasks = sources.map(({ task }) => task);
			const attemptsByTask = /* @__PURE__ */ new Map();
			for (const { task, attempt } of sources) attemptsByTask.set(task, [...attemptsByTask.get(task) ?? [], attempt]);
			const screenshotPaths = [...attemptsByTask].flatMap(([task, attempts]) => [...new Set(attempts)].flatMap((attempt) => attempt ? getFailureScreenshotPaths(task, attempt) : []));
			for (const [task, attempts] of attemptsByTask) {
				const filepath = task?.filepath || "";
				const projectName = task?.projectName || task.file?.projectName || "";
				const project = this.ctx.projects.find((p) => p.name === projectName);
				let name = this.getFullName(task, separator);
				const attemptLabel = formatErrorAttempts(task, attempts);
				if (attemptLabel) name += $.dim(` (${attemptLabel})`);
				if (filepath) name += $.dim(` [ ${this.relative(filepath)} ]`);
				const label = this.ctx.state.blobs && task.file?.meta?.__vitest_label__;
				this.ctx.logger.error(`${$.bgRed($.bold(" FAIL "))} ${formatProjectName(project)}${label ? `${$.bgCyan($.bold(` ${label} `))} ` : ""}${name}`);
			}
			this.ctx.logger.printError(error, {
				project: this.ctx.getProjectByName(tasks[0].file.projectName || ""),
				verbose: this.verbose,
				screenshotPaths
			});
			for (const [task, attempts] of attemptsByTask) for (const attempt of attempts) {
				const timeline = task.type === "test" && attempt && formatTraceTimeline(task.artifacts, attempt, this.ctx.config.root);
				if (timeline) this.error(`${timeline}\n`);
			}
			if (tasks[0].type === "test" && tasks[0].annotations.length) {
				const test = this.ctx.state.getReportedEntity(tasks[0]);
				this.printAnnotations(test, "error", 1);
				this.error();
			}
			errorDivider();
		}
	}
}
function formatErrorAttempts(task, attempts) {
	const showAttempt = (task.result?.attempts?.length ?? 0) > 1;
	return [...Map.groupBy(attempts, (attempt) => attempt)].map(([attempt, occurrences]) => {
		const label = showAttempt && attempt ? formatAttempt(attempt) : "";
		const count = occurrences.length > 1 ? `${occurrences.length} times` : "";
		return count && label ? `${count} in ${label}` : count || label;
	}).filter(Boolean).join(", ");
}
function formatAttempt({ repeatIndex, retryIndex }) {
	const repeat = repeatIndex ? `${ordinal(repeatIndex)} repeat` : "";
	const retry = retryIndex ? `${ordinal(retryIndex)} retry` : "";
	if (repeat && retry) return `${retry} of ${repeat}`;
	return repeat || retry || "initial run";
}
function getErrorsWithAttempt(task) {
	const attempts = task.result?.attempts;
	if (!attempts?.length) return (task.result?.errors ?? []).map((error) => ({ error }));
	return attempts.flatMap((attempt) => (attempt.errors ?? []).map((error) => ({
		error,
		attempt
	})));
}
function getFailureScreenshotPaths(task, attempt) {
	if (task.type !== "test") return [];
	const paths = [];
	for (const artifact of task.artifacts) if (artifact.type === "internal:failureScreenshot" && artifact.attachments.length && artifact.retryIndex === attempt.retryIndex && artifact.repeatIndex === attempt.repeatIndex) paths.push(artifact.attachments[0].originalPath);
	return paths;
}
function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);
	if (keysA.length !== keysB.length) return false;
	for (const key of keysA) if (!Object.hasOwn(b, key) || !deepEqual(a[key], b[key])) return false;
	return true;
}
function sum(items, cb) {
	return items.reduce((total, next) => {
		return total + Math.max(cb(next) || 0, 0);
	}, 0);
}
/**
* Summed time of all tracked phases of a file. The transform wait is part of
* `setupDuration`/`collectDuration`, so it is not added separately.
*/
function trackedFileTime(file) {
	return (file.environmentLoad || 0) + (file.setupDuration || 0) + (file.collectDuration || 0) + (file.prepareDuration || 0) + (file.result?.duration || 0);
}
function getIndentation(suite, level = 1) {
	if (suite.suite && !("filepath" in suite.suite)) return getIndentation(suite.suite, level + 1);
	return level;
}

/** Minimum time between two renders, no matter how many scheduled renders were called */
const DEFAULT_RENDER_THRESHOLD_MS = 100;
/** Interval between automatic renders. If no test state changes happened, this will increase just duration field */
const DEFAULT_RENDER_INTERVAL_MS = 1e3;
const ESC$1 = "\x1B[";
const CLEAR_LINE = `${ESC$1}K`;
const MOVE_CURSOR_ONE_ROW_UP = `${ESC$1}1A`;
const SYNC_START = `${ESC$1}?2026h`;
const SYNC_END = `${ESC$1}?2026l`;
/**
* Renders content of `getWindow` at the bottom of the terminal and
* forwards all other intercepted `stdout` and `stderr` logs above it.
*/
class WindowRenderer {
	options;
	streams;
	buffer = [];
	renderInterval = void 0;
	renderScheduled = false;
	windowHeight = 0;
	started = false;
	finished = false;
	cleanups = [];
	constructor(options) {
		this.options = {
			...options,
			threshold: options.threshold ?? DEFAULT_RENDER_THRESHOLD_MS,
			interval: options.interval ?? DEFAULT_RENDER_INTERVAL_MS
		};
		// Capture the original write methods early, before intercepting these
		this.streams = {
			output: options.logger.outputStream.write.bind(options.logger.outputStream),
			error: options.logger.errorStream.write.bind(options.logger.errorStream)
		};
		this.cleanups.push(this.interceptStream(process.stdout, "output"), this.interceptStream(process.stderr, "error"));
		// Intercept calls to custom VitestOptions.stdout and stderr streams
		if (options.logger.outputStream !== process.stdout) this.cleanups.push(this.interceptStream(options.logger.outputStream, "output"));
		if (options.logger.errorStream !== process.stderr) this.cleanups.push(this.interceptStream(options.logger.errorStream, "error"));
		// Write buffered content on unexpected exits, e.g. direct `process.exit()` calls
		this.options.logger.onTerminalCleanup(() => {
			this.flushBuffer();
			this.stop();
		});
	}
	start() {
		this.started = true;
		this.finished = false;
		this.renderInterval = setInterval(() => this.schedule(), this.options.interval).unref();
	}
	stop() {
		this.cleanups.splice(0).map((fn) => fn());
		clearInterval(this.renderInterval);
	}
	/**
	* Write all buffered output and stop buffering.
	* All intercepted writes are forwarded to actual write after this.
	*/
	finish() {
		this.finished = true;
		this.flushBuffer();
		clearInterval(this.renderInterval);
	}
	/**
	* Queue new render update
	*/
	schedule() {
		if (!this.renderScheduled) {
			this.renderScheduled = true;
			this.flushBuffer();
			if (this.options.threshold) setTimeout(() => {
				this.renderScheduled = false;
			}, this.options.threshold).unref();
			else this.renderScheduled = false;
		}
	}
	flushBuffer() {
		if (this.buffer.length === 0) return this.render();
		let current;
		// Concatenate same types into a single render
		for (const next of this.buffer.splice(0)) {
			if (!current) {
				current = next;
				continue;
			}
			if (current.type !== next.type) {
				this.render(current.message, current.type);
				current = next;
				continue;
			}
			current.message += next.message;
		}
		if (current) this.render(current?.message, current?.type);
	}
	render(message, type = "output") {
		this.write(SYNC_START);
		if (this.finished) {
			this.clearWindow();
			this.write(message || "", type);
			return this.write(SYNC_END);
		}
		const windowContent = this.options.getWindow();
		const rowCount = getRenderedRowCount(windowContent, this.options.logger.getColumns());
		let padding = this.windowHeight - rowCount;
		if (padding > 0 && message) padding -= getRenderedRowCount([message], this.options.logger.getColumns());
		this.clearWindow();
		if (message) this.write(message, type);
		if (padding > 0) this.write("\n".repeat(padding));
		this.write(windowContent.join("\n"));
		this.write(SYNC_END);
		this.windowHeight = rowCount + Math.max(0, padding);
	}
	clearWindow() {
		if (this.windowHeight === 0) return;
		this.write(CLEAR_LINE);
		for (let i = 1; i < this.windowHeight; i++) this.write(`${MOVE_CURSOR_ONE_ROW_UP}${CLEAR_LINE}`);
		this.windowHeight = 0;
	}
	interceptStream(stream, type) {
		const original = stream.write;
		// @ts-expect-error -- not sure how 2 overloads should be typed
		stream.write = (chunk, _, callback) => {
			if (chunk) {
				if (this.finished || !this.started) this.write(chunk.toString(), type);
				else this.buffer.push({
					type,
					message: chunk.toString()
				});
			}
			callback?.();
		};
		return function restore() {
			stream.write = original;
		};
	}
	write(message, type = "output") {
		this.streams[type](message);
	}
}
/** Calculate the actual row count needed to render `rows` into `stream` */
function getRenderedRowCount(rows, columns) {
	let count = 0;
	for (const row of rows) {
		const text = stripVTControlCharacters(row);
		count += Math.max(1, Math.ceil(text.length / columns));
	}
	return count;
}

const DURATION_UPDATE_INTERVAL_MS = 100;
const FINISHED_TEST_CLEANUP_TIME_MS = 1e3;
/**
* Reporter extension that renders summary and forwards all other logs above itself.
* Intended to be used by other reporters, not as a standalone reporter.
*/
class SummaryReporter {
	ctx;
	options;
	renderer;
	modules = emptyCounters();
	tests = emptyCounters();
	maxParallelTests = 0;
	/** Currently running test modules, may include finished test modules too */
	runningModules = /* @__PURE__ */ new Map();
	/** ID of finished `this.runningModules` that are currently being shown */
	finishedModules = /* @__PURE__ */ new Map();
	startTime = "";
	currentTime = 0;
	duration = 0;
	durationInterval = void 0;
	onInit(ctx, options = {}) {
		this.ctx = ctx;
		this.options = {
			verbose: false,
			...options
		};
		this.renderer = new WindowRenderer({
			logger: ctx.logger,
			getWindow: () => this.createSummary(),
			interval: this.options.interval,
			threshold: this.options.threshold
		});
		this.ctx.onClose(() => {
			clearInterval(this.durationInterval);
			this.renderer.stop();
		});
	}
	onTestRunStart(specifications) {
		this.runningModules.clear();
		this.finishedModules.clear();
		this.modules = emptyCounters();
		this.tests = emptyCounters();
		this.startTimers();
		this.renderer.start();
		this.modules.total = specifications.length;
	}
	onTestRunEnd() {
		this.runningModules.clear();
		this.finishedModules.clear();
		this.renderer.finish();
		clearInterval(this.durationInterval);
	}
	onTestModuleQueued(module) {
		// When new test module starts, take the place of previously finished test module, if any
		if (this.finishedModules.size) {
			const finished = this.finishedModules.keys().next().value;
			this.removeTestModule(finished);
		}
		this.runningModules.set(module.id, initializeStats(module));
		this.renderer.schedule();
	}
	onTestModuleCollected(module) {
		let stats = this.runningModules.get(module.id);
		if (!stats) {
			stats = initializeStats(module);
			this.runningModules.set(module.id, stats);
		}
		const total = Array.from(module.children.allTests()).length;
		this.tests.total += total;
		stats.total = total;
		this.maxParallelTests = Math.max(this.maxParallelTests, this.runningModules.size);
		this.renderer.schedule();
	}
	startStep(stats, name) {
		const step = {
			name,
			visible: false,
			startTime: performance.now(),
			onFinish: () => {}
		};
		stats.step?.onFinish?.();
		stats.step = step;
		if (!Number.isFinite(this.ctx.config.slowTestThreshold)) return;
		const timeout = setTimeout(() => {
			step.visible = true;
		}, this.ctx.config.slowTestThreshold).unref();
		step.onFinish = () => clearTimeout(timeout);
	}
	onHookStart(options) {
		const stats = this.getStepStats(options.entity);
		if (stats) this.startStep(stats, options.name);
	}
	onHookEnd(options) {
		const stats = this.getStepStats(options.entity);
		if (stats?.step?.name !== options.name) return;
		stats.step.onFinish();
		stats.step.visible = false;
	}
	onTestCaseReady(test) {
		// Track slow running tests only on verbose mode
		if (!this.options.verbose) return;
		const stats = this.runningModules.get(test.module.id);
		if (!stats || stats.tests.has(test.id)) return;
		const slowTest = {
			name: test.name,
			visible: false,
			startTime: performance.now(),
			onFinish: () => {}
		};
		const timeout = Number.isFinite(this.ctx.config.slowTestThreshold) ? setTimeout(() => {
			slowTest.visible = true;
		}, this.ctx.config.slowTestThreshold).unref() : void 0;
		slowTest.onFinish = () => {
			slowTest.step?.onFinish();
			clearTimeout(timeout);
		};
		stats.tests.set(test.id, slowTest);
	}
	onTestCaseResult(test) {
		const stats = this.runningModules.get(test.module.id);
		if (!stats) return;
		stats.tests.get(test.id)?.onFinish();
		stats.tests.delete(test.id);
		stats.completed++;
		const result = test.result();
		if (result?.state === "passed") {
			// Check if this is an expected failure (test.fails && passed)
			if (test.options.fails) this.tests.expectedFail++;
			else this.tests.passed++;
		} else if (result?.state === "failed") this.tests.failed++;
		else if (!result?.state || result?.state === "skipped") {
			if (test.options.mode === "todo") this.tests.todo++;
			else this.tests.skipped++;
		}
		this.renderer.schedule();
	}
	onTestModuleEnd(module) {
		const state = module.state();
		this.modules.completed++;
		if (state === "passed") this.modules.passed++;
		else if (state === "failed") this.modules.failed++;
		else if (module.task.mode === "todo" && state === "skipped") this.modules.todo++;
		else if (state === "skipped") this.modules.skipped++;
		// Keep finished tests visible in summary for a while if there are more tests left.
		// When a new test starts in onTestModuleQueued it will take this ones place.
		// This reduces flickering by making summary more stable.
		if (this.modules.total - this.modules.completed > this.maxParallelTests) this.finishedModules.set(module.id, setTimeout(() => {
			this.removeTestModule(module.id);
		}, FINISHED_TEST_CLEANUP_TIME_MS).unref());
		else
 // Run is about to end as there are less tests left than whole run had parallel at max.
		// Remove finished test immediately.
		this.removeTestModule(module.id);
		this.renderer.schedule();
	}
	getStepStats(entity) {
		// Track slow running hooks only on verbose mode
		if (!this.options.verbose) return;
		const module = entity.type === "module" ? entity : entity.module;
		const stats = this.runningModules.get(module.id);
		if (!stats) return;
		return entity.type === "test" ? stats.tests.get(entity.id) : stats;
	}
	createSummary() {
		const summary = [""];
		for (const testFile of Array.from(this.runningModules.values()).sort(sortRunningModules)) {
			const typecheck = testFile.meta.typecheck ? `${$.bgBlue($.bold(" TS "))} ` : "";
			const label = this.ctx.state.blobs && testFile.meta.__vitest_label__ ? `${$.bgCyan($.bold(` ${testFile.meta.__vitest_label__} `))} ` : "";
			summary.push($.bold($.yellow(` ${F_POINTER} `)) + formatProjectName({
				name: testFile.projectName,
				color: testFile.projectColor
			}) + typecheck + label + testFile.filename + $.dim(!testFile.completed && !testFile.total ? " [queued]" : ` ${testFile.completed}/${testFile.total}`));
			const slowTasks = [testFile.step, ...testFile.tests.values()].filter((t) => t != null && t.visible);
			for (const [index, task] of slowTasks.entries()) {
				const elapsed = this.currentTime - task.startTime;
				const icon = index === slowTasks.length - 1 ? F_TREE_NODE_END : F_TREE_NODE_MIDDLE;
				summary.push($.bold($.yellow(`   ${icon} `)) + task.name + $.bold($.yellow(` ${formatTime(Math.max(0, elapsed))}`)));
				if (task.step?.visible) summary.push($.bold($.yellow(`      ${F_TREE_NODE_END} `)) + task.step.name);
			}
		}
		if (this.runningModules.size > 0) summary.push("");
		summary.push(padSummaryTitle("Test Files") + getStateString(this.modules));
		summary.push(padSummaryTitle("Tests") + getStateString(this.tests));
		summary.push(padSummaryTitle("Start at") + this.startTime);
		summary.push(padSummaryTitle("Duration") + formatTime(this.duration));
		summary.push("");
		return summary;
	}
	startTimers() {
		const start = performance.now();
		this.startTime = formatTimeString(/* @__PURE__ */ new Date());
		this.durationInterval = setInterval(() => {
			this.currentTime = performance.now();
			this.duration = this.currentTime - start;
		}, DURATION_UPDATE_INTERVAL_MS).unref();
	}
	removeTestModule(id) {
		if (!id) return;
		const testFile = this.runningModules.get(id);
		testFile?.step?.onFinish();
		testFile?.tests?.forEach((test) => test.onFinish());
		this.runningModules.delete(id);
		clearTimeout(this.finishedModules.get(id));
		this.finishedModules.delete(id);
	}
}
function emptyCounters() {
	return {
		completed: 0,
		passed: 0,
		failed: 0,
		skipped: 0,
		todo: 0,
		expectedFail: 0,
		total: 0
	};
}
function getStateString(entry) {
	return [
		entry.failed ? $.bold($.red(`${entry.failed} failed`)) : null,
		$.bold($.green(`${entry.passed} passed`)),
		entry.expectedFail ? $.cyan(`${entry.expectedFail} expected fail`) : null,
		entry.skipped ? $.yellow(`${entry.skipped} skipped`) : null,
		entry.todo ? $.gray(`${entry.todo} todo`) : null
	].filter(Boolean).join($.dim(" | ")) + $.gray(` (${entry.total})`);
}
function sortRunningModules(a, b) {
	if ((a.projectName || "") > (b.projectName || "")) return 1;
	if ((a.projectName || "") < (b.projectName || "")) return -1;
	return a.filename.localeCompare(b.filename);
}
function initializeStats(module) {
	return {
		total: 0,
		completed: 0,
		filename: module.task.name,
		projectName: module.project.name,
		projectColor: module.project.color,
		tests: /* @__PURE__ */ new Map(),
		meta: module.task.meta
	};
}

class DefaultReporter extends BaseReporter {
	options;
	summary;
	constructor(options = {}) {
		super(options);
		this.options = {
			summary: true,
			...options
		};
		if (!this.isTTY) this.options.summary = false;
		if (this.options.summary) this.summary = new SummaryReporter();
	}
	onTestRunStart(specifications) {
		if (this.isTTY) {
			if (this.renderSucceed === void 0) this.renderSucceed = !!this.renderSucceed;
			if (this.renderSucceed !== true) this.renderSucceed = specifications.length <= 1;
		}
		super.onTestRunStart(specifications);
		this.summary?.onTestRunStart(specifications);
	}
	onTestRunEnd(testModules, unhandledErrors, reason) {
		super.onTestRunEnd(testModules, unhandledErrors, reason);
		this.summary?.onTestRunEnd();
	}
	onTestModuleQueued(file) {
		this.summary?.onTestModuleQueued(file);
	}
	onTestModuleCollected(module) {
		this.summary?.onTestModuleCollected(module);
	}
	onTestModuleEnd(module) {
		super.onTestModuleEnd(module);
		this.summary?.onTestModuleEnd(module);
	}
	onTestCaseReady(test) {
		this.summary?.onTestCaseReady(test);
	}
	onTestCaseResult(test) {
		super.onTestCaseResult(test);
		this.summary?.onTestCaseResult(test);
	}
	onHookStart(hook) {
		this.summary?.onHookStart(hook);
	}
	onHookEnd(hook) {
		this.summary?.onHookEnd(hook);
	}
	onInit(ctx) {
		super.onInit(ctx);
		this.summary?.onInit(ctx, {
			verbose: this.verbose,
			...this.options.summaryOptions
		});
	}
}

class DotReporter extends BaseReporter {
	renderer;
	tests = /* @__PURE__ */ new Map();
	finishedTests = /* @__PURE__ */ new Set();
	onInit(ctx) {
		super.onInit(ctx);
		if (this.isTTY) {
			this.renderer = new WindowRenderer({
				logger: ctx.logger,
				getWindow: () => this.createSummary()
			});
			this.ctx.onClose(() => this.renderer?.stop());
		}
	}
	// Ignore default logging of base reporter
	printTestModule() {}
	onTestRunStart(_specifications) {
		super.onTestRunStart(_specifications);
		this.renderer?.start();
	}
	onWatcherRerun(files, trigger) {
		this.tests.clear();
		this.renderer?.start();
		super.onWatcherRerun(files, trigger);
	}
	onTestRunEnd(testModules, unhandledErrors, reason) {
		if (this.isTTY) {
			const finalLog = formatTests(Array.from(this.tests.values()));
			this.ctx.logger.log(finalLog);
		} else this.ctx.logger.log();
		this.tests.clear();
		this.renderer?.finish();
		super.onTestRunEnd(testModules, unhandledErrors, reason);
	}
	onTestModuleCollected(module) {
		for (const test of module.children.allTests())
 // Dot reporter marks pending tests as running
		this.onTestCaseReady(test);
	}
	onTestCaseReady(test) {
		if (this.finishedTests.has(test.id)) return;
		this.tests.set(test.id, test.result().state || "run");
		this.renderer?.schedule();
	}
	onTestCaseResult(test) {
		const result = test.result().state;
		// On non-TTY the finished tests are printed immediately
		if (!this.isTTY && result !== "pending") this.ctx.logger.outputStream.write(formatTests([result]));
		super.onTestCaseResult(test);
		this.finishedTests.add(test.id);
		this.tests.set(test.id, result || "skipped");
		this.renderer?.schedule();
	}
	onTestModuleEnd(testModule) {
		super.onTestModuleEnd(testModule);
		if (!this.isTTY) return;
		const columns = this.ctx.logger.getColumns();
		if (this.tests.size < columns) return;
		const finishedTests = Array.from(this.tests).filter((entry) => entry[1] !== "pending");
		if (finishedTests.length < columns) return;
		// Remove finished tests from state and render them in static output
		const states = [];
		let count = 0;
		for (const [id, state] of finishedTests) {
			if (count++ >= columns) break;
			this.tests.delete(id);
			states.push(state);
		}
		this.ctx.logger.log(formatTests(states));
		this.renderer?.schedule();
	}
	createSummary() {
		return [formatTests(Array.from(this.tests.values())), ""];
	}
}
// These are compared with reference equality in formatTests
const pass = {
	char: "·",
	color: $.green
};
const fail = {
	char: "x",
	color: $.red
};
const pending = {
	char: "*",
	color: $.yellow
};
const skip = {
	char: "-",
	color: (char) => $.dim($.gray(char))
};
function getIcon(state) {
	switch (state) {
		case "passed": return pass;
		case "failed": return fail;
		case "skipped": return skip;
		default: return pending;
	}
}
/**
* Format test states into string while keeping ANSI escapes at minimal.
* Sibling icons with same color are merged into a single c.color() call.
*/
function formatTests(states) {
	let currentIcon = pending;
	let count = 0;
	let output = "";
	for (const state of states) {
		const icon = getIcon(state);
		if (currentIcon === icon) {
			count++;
			continue;
		}
		output += currentIcon.color(currentIcon.char.repeat(count));
		// Start tracking new group
		count = 1;
		currentIcon = icon;
	}
	output += currentIcon.color(currentIcon.char.repeat(count));
	return output;
}

// we prepend `test.name` to the default title when set, custom titles don't follow this logic
// we need to know when the user provides a custom one, so this is handled outside `defaultOptions`
const DEFAULT_TITLE = "Vitest Test Report";
const defaultOptions = {
	onWritePath: defaultOnWritePath,
	displayAnnotations: true,
	jobSummary: {
		enabled: true,
		outputPath: process.env.GITHUB_STEP_SUMMARY,
		fileLinks: {
			repository: process.env.GITHUB_REPOSITORY,
			commitHash: process.env.GITHUB_SHA,
			workspacePath: process.env.GITHUB_WORKSPACE
		}
	}
};
class GithubActionsReporter {
	ctx = void 0;
	options;
	constructor(options = {}) {
		this.options = deepMerge(Object.create(null), defaultOptions, options);
	}
	onInit(ctx) {
		this.ctx = ctx;
	}
	onTestCaseAnnotate(testCase, annotation) {
		if (!annotation.location || this.options.displayAnnotations === false) return;
		const type = getTitle(annotation.type);
		const formatted = formatMessage({
			command: getType(annotation.type),
			properties: {
				file: annotation.location.file,
				line: String(annotation.location.line),
				column: String(annotation.location.column),
				...type && { title: type }
			},
			message: stripVTControlCharacters(annotation.message)
		});
		this.ctx.logger.log(`\n${formatted}`);
	}
	onTestRunEnd(testModules, unhandledErrors) {
		const files = testModules.map((testModule) => testModule.task);
		const errors = [...unhandledErrors];
		// collect all errors and associate them with projects
		const projectErrors = new Array();
		for (const error of errors) projectErrors.push({
			project: this.ctx.getRootProject(),
			title: "Unhandled error",
			error
		});
		for (const file of files) {
			const tasks = getTasks(file);
			const project = this.ctx.getProjectByName(file.projectName || "");
			for (const task of tasks) {
				if (task.result?.state !== "fail") continue;
				const title = getFullName(task, " > ");
				for (const error of task.result?.errors ?? []) projectErrors.push({
					project,
					title: project.name ? `[${project.name}] ${title}` : title,
					error
				});
			}
		}
		// format errors via `printError`
		for (const { project, title, error } of projectErrors) {
			const result = this.ctx.logger.formatError(error, { project });
			const stack = result?.nearest;
			if (!stack) continue;
			const formatted = formatMessage({
				command: "error",
				properties: {
					file: this.options.onWritePath(stack.file),
					title,
					line: String(stack.line),
					column: String(stack.column)
				},
				message: stripVTControlCharacters(result.output)
			});
			this.ctx.logger.log(`\n${formatted}`);
		}
		if (this.options.jobSummary.enabled === true && this.options.jobSummary.outputPath) {
			const summary = renderSummary(collectSummaryData(testModules, this.ctx.config), this.options.jobSummary.title, this.options.jobSummary.fileLinks);
			try {
				writeFileSync(this.options.jobSummary.outputPath, summary, { flag: "a" });
			} catch (error) {
				this.ctx.logger.warn("Could not write summary to `options.summary.outputPath`", error);
			}
		}
	}
}
const BUILT_IN_TYPES = [
	"notice",
	"error",
	"warning"
];
function getTitle(type) {
	if (BUILT_IN_TYPES.includes(type)) return;
	return type;
}
function getType(type) {
	if (BUILT_IN_TYPES.includes(type)) return type;
	return "notice";
}
function defaultOnWritePath(path) {
	return path;
}
// workflow command formatting based on
// https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-error-message
// https://github.com/actions/toolkit/blob/f1d9b4b985e6f0f728b4b766db73498403fd5ca3/packages/core/src/command.ts#L80-L85
function formatMessage({ command, properties, message }) {
	let result = `::${command}`;
	Object.entries(properties).forEach(([k, v], i) => {
		result += i === 0 ? " " : ",";
		result += `${k}=${escapeProperty(v)}`;
	});
	result += `::${escapeData(message)}`;
	return result;
}
function escapeData(s) {
	return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function escapeProperty(s) {
	return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}
function collectSummaryData(testModules, config) {
	const summaryData = {
		name: config.name || null,
		fileStats: {
			failed: 0,
			passed: 0
		},
		testsStats: {
			failed: 0,
			passed: 0,
			expectedFail: 0,
			skipped: 0,
			todo: 0
		},
		flakyTests: []
	};
	for (const module of testModules) {
		const flakyTests = {
			path: {
				relative: module.relativeModuleId,
				absolute: module.moduleId
			},
			tests: []
		};
		switch (module.task.result?.state) {
			case "fail":
				summaryData.fileStats.failed += 1;
				break;
			case "pass": summaryData.fileStats.passed += 1;
		}
		for (const test of module.children.allTests()) {
			switch (test.task.mode) {
				case "skip":
					summaryData.testsStats.skipped += 1;
					break;
				case "todo":
					summaryData.testsStats.todo += 1;
					break;
				default: switch (test.task.result?.state) {
					case "fail":
						summaryData.testsStats.failed += 1;
						break;
					case "pass": if (test.task.fails) summaryData.testsStats.expectedFail += 1;
					else summaryData.testsStats.passed += 1;
				}
			}
			const diagnostic = test.diagnostic();
			if (diagnostic?.flaky) {
				const retriesAllowed = typeof test.options.retry === "number" ? test.options.retry : test.options.retry?.count ?? diagnostic.retryCount;
				const retriesRatio = diagnostic.retryCount / retriesAllowed;
				flakyTests.tests.push({
					retries: {
						allowed: retriesAllowed,
						count: diagnostic.retryCount,
						ratio: retriesRatio
					},
					line: test.task.location?.line,
					testName: test.task.fullTestName
				});
			}
		}
		if (flakyTests.tests.length > 0) {
			flakyTests.tests.sort((a, b) => b.retries.ratio - a.retries.ratio);
			summaryData.flakyTests.push(flakyTests);
		}
	}
	return summaryData;
}
function createGitHubFileLinkCreator(fileLinks) {
	const repository = fileLinks?.repository;
	const commitHash = fileLinks?.commitHash;
	const workspacePath = fileLinks?.workspacePath;
	if (repository !== void 0 && commitHash !== void 0 && workspacePath !== void 0) return (path, line) => {
		const lineFragment = line !== void 0 ? `#L${line}` : "";
		return `https://github.com/${repository}/blob/${commitHash}/${relative(workspacePath, path)}${lineFragment}`;
	};
	return () => null;
}
function mdLink(text, url) {
	return url === null ? text : `[${text}](${url})`;
}
function renderStats({ fileStats, testsStats }) {
	const SEPARATOR_SYMBOL = " · ";
	const fileInfoTotal = fileStats.failed + fileStats.passed;
	const primaryInfoTotal = testsStats.failed + testsStats.passed + testsStats.expectedFail;
	const secondaryInfoTotal = testsStats.skipped + testsStats.todo;
	const fileInfo = [];
	const primaryInfo = [];
	const secondaryInfo = [];
	if (fileStats.failed > 0) fileInfo.push(`❌ **${fileStats.failed} ${noun(fileStats.failed, "failure", "failures")}**`);
	if (fileStats.passed > 0) fileInfo.push(`✅ **${fileStats.passed} ${noun(fileStats.passed, "pass", "passes")}**`);
	fileInfo.push(`${fileInfoTotal} total`);
	if (testsStats.failed > 0) primaryInfo.push(`❌ **${testsStats.failed} ${noun(testsStats.failed, "failure", "failures")}**`);
	if (testsStats.passed > 0) primaryInfo.push(`✅ **${testsStats.passed} ${noun(testsStats.passed, "pass", "passes")}**`);
	if (testsStats.expectedFail > 0) primaryInfo.push(`🔵 **${testsStats.expectedFail} expected ${noun(testsStats.expectedFail, "failure", "failures")}**`);
	primaryInfo.push(`${primaryInfoTotal} total`);
	if (testsStats.skipped > 0) secondaryInfo.push(`${testsStats.skipped} ${noun(testsStats.skipped, "skip", "skips")}`);
	if (testsStats.todo > 0) secondaryInfo.push(`${testsStats.todo} ${noun(testsStats.todo, "todo", "todos")}`);
	let output = `\n### Summary\n\n- **Test Files**: ${fileInfo.join(SEPARATOR_SYMBOL)}\n- **Test Results**: ${primaryInfo.join(SEPARATOR_SYMBOL)}\n`;
	if (secondaryInfo.length > 0) {
		secondaryInfo.push(`${secondaryInfoTotal} total`);
		output += `- **Other**: ${secondaryInfo.join(SEPARATOR_SYMBOL)}\n`;
	}
	return output;
}
function renderSummary(summaryData, title, fileLinks) {
	const fileLinkCreator = createGitHubFileLinkCreator(fileLinks);
	let summary = `## ${title ?? (summaryData.name ? `(${summaryData.name}) ${DEFAULT_TITLE}` : DEFAULT_TITLE)}\n${renderStats(summaryData)}`;
	if (summaryData.flakyTests.length > 0) {
		summary += "\n### Flaky Tests\n\nThese tests passed only after one or more retries, indicating potential instability.\n";
		for (const flakyTests of summaryData.flakyTests) {
			summary += `\n##### \`${flakyTests.path.relative}\` (${flakyTests.tests.length} flaky tests)\n`;
			for (const flakyTest of flakyTests.tests) {
				const retriesText = `passed on retry ${flakyTest.retries.count} out of ${flakyTest.retries.allowed}`;
				summary += `\n- ${mdLink(`\`${flakyTest.testName}\``, fileLinkCreator(flakyTests.path.absolute, flakyTest.line))} (${flakyTest.retries.ratio >= .8 ? `**${retriesText}**` : retriesText})`;
			}
			summary += "\n";
		}
	}
	if (!summary.endsWith("\n")) summary += "\n";
	return summary;
}

const StatusMap = {
	fail: "failed",
	only: "pending",
	pass: "passed",
	run: "pending",
	skip: "skipped",
	todo: "todo",
	queued: "pending"
};
class JsonReporter {
	start = 0;
	ctx;
	options;
	coverageMap;
	constructor(options) {
		this.options = options;
	}
	onInit(ctx) {
		this.ctx = ctx;
		this.start = Date.now();
		this.coverageMap = void 0;
	}
	onCoverage(coverageMap) {
		this.coverageMap = coverageMap;
	}
	async onTestRunEnd(testModules) {
		const files = testModules.map((testModule) => testModule.task);
		const suites = getSuites(files);
		const numTotalTestSuites = suites.length;
		const tests = getTests(files);
		const numTotalTests = tests.length;
		const numFailedTestSuites = suites.filter((s) => s.result?.state === "fail").length;
		const numPendingTestSuites = suites.filter((s) => s.result?.state === "run" || s.result?.state === "queued" || s.mode === "todo").length;
		const numPassedTestSuites = numTotalTestSuites - numFailedTestSuites - numPendingTestSuites;
		const numFailedTests = tests.filter((t) => t.result?.state === "fail").length;
		const numPassedTests = tests.filter((t) => t.result?.state === "pass").length;
		const numPendingTests = tests.filter((t) => t.result?.state === "run" || t.result?.state === "queued" || t.mode === "skip" || t.result?.state === "skip").length;
		const numTodoTests = tests.filter((t) => t.mode === "todo").length;
		const testResults = [];
		const success = !!(files.length > 0 || this.ctx.config.passWithNoTests) && numFailedTestSuites === 0 && numFailedTests === 0;
		const { filterMeta } = this.options;
		for (const file of files) {
			const tests = getTests([file]);
			let startTime = tests.reduce((prev, next) => Math.min(prev, next.result?.startTime ?? Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY);
			if (startTime === Number.POSITIVE_INFINITY) startTime = this.start;
			const endTime = tests.reduce((prev, next) => Math.max(prev, (next.result?.startTime ?? 0) + (next.result?.duration ?? 0)), startTime);
			const assertionResults = tests.map((t) => {
				const ancestorTitles = [];
				let iter = t.suite;
				while (iter) {
					ancestorTitles.push(iter.name);
					iter = iter.suite;
				}
				ancestorTitles.reverse();
				return {
					ancestorTitles,
					fullName: t.name ? [...ancestorTitles, t.name].join(" ") : ancestorTitles.join(" "),
					status: StatusMap[t.result?.state || t.mode] || "skipped",
					title: t.name,
					duration: t.result?.duration,
					failureMessages: t.result?.errors?.map((e) => e.stack || e.message) || [],
					location: t.location,
					meta: filterMeta ? (() => {
						const filtered = {};
						for (const key in t.meta) {
							const value = t.meta[key];
							if (filterMeta(key, value)) filtered[key] = value;
						}
						return filtered;
					})() : t.meta,
					tags: t.tags || [],
					benchmarks: t.benchmarks
				};
			});
			if (tests.some((t) => t.result?.state === "run" || t.result?.state === "queued")) this.ctx.logger.warn("WARNING: Some tests are still running when generating the JSON report.This is likely an internal bug in Vitest.Please report it to https://github.com/vitest-dev/vitest/issues");
			const hasFailedTests = tests.some((t) => t.result?.state === "fail");
			testResults.push({
				assertionResults,
				startTime,
				endTime,
				status: file.result?.state === "fail" || hasFailedTests ? "failed" : "passed",
				message: file.result?.errors?.[0]?.message ?? "",
				name: file.filepath
			});
		}
		const result = {
			numTotalTestSuites,
			numPassedTestSuites,
			numFailedTestSuites,
			numPendingTestSuites,
			numTotalTests,
			numPassedTests,
			numFailedTests,
			numPendingTests,
			numTodoTests,
			snapshot: this.ctx.snapshot.summary,
			startTime: this.start,
			success,
			testResults,
			coverageMap: this.coverageMap
		};
		const resultString = JSON.stringify(result);
		const outputFile = this.options.outputFile ?? getOutputFile(this.ctx.config, "json");
		if (outputFile) {
			const reportFile = resolve(this.ctx.config.root, outputFile);
			const outputDirectory = dirname(reportFile);
			if (!existsSync(outputDirectory)) await promises.mkdir(outputDirectory, { recursive: true });
			await promises.writeFile(reportFile, resultString, "utf-8");
			this.ctx.logger.log(`JSON report written to ${reportFile}`);
		} else if (this.options.stdout) this.ctx.logger.log(resultString);
		else {
			const report = this.ctx.createReport("json");
			await report.writeFile("output.json", resultString);
			this.ctx.logger.log(`JSON report written to ${resolve(report.root, "output.json")}`);
		}
	}
}

class IndentedLogger {
	baseLog;
	currentIndent = "";
	constructor(baseLog) {
		this.baseLog = baseLog;
	}
	indent() {
		this.currentIndent += "    ";
	}
	unindent() {
		this.currentIndent = this.currentIndent.substring(0, this.currentIndent.length - 4);
	}
	log(text) {
		return this.baseLog(this.currentIndent + text);
	}
}

function flattenTasks$1(task, baseName = "", suiteName = "", ancestorSeparator = " > ") {
	if (task.type === "suite") {
		const newBase = baseName ? `${baseName}${ancestorSeparator}${task.name}` : task.name;
		const newSuiteName = suiteName || task.name;
		return task.tasks.flatMap((child) => flattenTasks$1(child, newBase, newSuiteName, ancestorSeparator));
	} else {
		const fullName = baseName ? `${baseName}${ancestorSeparator}${task.name}` : task.name;
		return [{
			...task,
			name: fullName,
			_leafName: task.name,
			_classname: baseName,
			_suitename: suiteName
		}];
	}
}
// https://gist.github.com/john-doherty/b9195065884cdbfd2017a4756e6409cc
function removeInvalidXMLCharacters(value, removeDiscouragedChars) {
	let regex = /([\0-\x08\v\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
	value = String(value || "").replace(regex, "");
	{
		// remove everything discouraged by XML 1.0 specifications
		regex = /* @__PURE__ */ new RegExp("([\\x7F-\\x84]|[\\x86-\\x9F]|[\\uFDD0-\\uFDEF]|\\uD83F[\\uDFFE\\uDFFF]|(?:\\uD87F[\\uDFFE\\uDFFF])|\\uD8BF[\\uDFFE\\uDFFF]|\\uD8FF[\\uDFFE\\uDFFF]|(?:\\uD93F[\\uDFFE\\uDFFF])|\\uD97F[\\uDFFE\\uDFFF]|\\uD9BF[\\uDFFE\\uDFFF]|\\uD9FF[\\uDFFE\\uDFFF]|\\uDA3F[\\uDFFE\\uDFFF]|\\uDA7F[\\uDFFE\\uDFFF]|\\uDABF[\\uDFFE\\uDFFF]|(?:\\uDAFF[\\uDFFE\\uDFFF])|\\uDB3F[\\uDFFE\\uDFFF]|\\uDB7F[\\uDFFE\\uDFFF]|(?:\\uDBBF[\\uDFFE\\uDFFF])|\\uDBFF[\\uDFFE\\uDFFF](?:[\\0-\\t\\v\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))", "g");
		value = value.replace(regex, "");
	}
	return value;
}
function escapeXML(value) {
	return removeInvalidXMLCharacters(stripVTControlCharacters(String(value)).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
}
function executionTime(durationMS) {
	return (durationMS / 1e3).toLocaleString("en-US", {
		useGrouping: false,
		maximumFractionDigits: 10
	});
}
function getDuration(task) {
	return executionTime(task.result?.duration ?? 0);
}
class JUnitReporter {
	ctx;
	reportFile;
	baseLog;
	logger;
	_timeStart = /* @__PURE__ */ new Date();
	fileFd;
	options;
	constructor(options) {
		this.options = { ...options };
		this.options.includeConsoleOutput ??= true;
		this.options.stackTrace ??= true;
	}
	async onInit(ctx) {
		this.ctx = ctx;
		const outputFile = this.options.outputFile ?? getOutputFile(this.ctx.config, "junit");
		if (outputFile) {
			this.reportFile = resolve(this.ctx.config.root, outputFile);
			const outputDirectory = dirname(this.reportFile);
			if (!existsSync(outputDirectory)) await promises.mkdir(outputDirectory, { recursive: true });
		} else if (!this.options.stdout) {
			const report = this.ctx.createReport("junit");
			this.reportFile = resolve(report.root, "output.xml");
		}
		if (this.reportFile) {
			const fileFd = await promises.open(this.reportFile, "w+");
			this.fileFd = fileFd;
			this.baseLog = async (text) => {
				if (!this.fileFd) this.fileFd = await promises.open(this.reportFile, "w+");
				await promises.writeFile(this.fileFd, `${text}\n`);
			};
		} else this.baseLog = async (text) => this.ctx.logger.log(text);
		this._timeStart = /* @__PURE__ */ new Date();
		this.logger = new IndentedLogger(this.baseLog);
	}
	async writeElement(name, attrs, children) {
		const pairs = [];
		for (const key in attrs) {
			const attr = attrs[key];
			if (attr === void 0) continue;
			pairs.push(`${key}="${escapeXML(attr)}"`);
		}
		await this.logger.log(`<${name}${pairs.length ? ` ${pairs.join(" ")}` : ""}>`);
		this.logger.indent();
		await children.call(this);
		this.logger.unindent();
		await this.logger.log(`</${name}>`);
	}
	async writeLogs(task, type) {
		if (task.logs == null || task.logs.length === 0) return;
		const logType = type === "err" ? "stderr" : "stdout";
		const logs = task.logs.filter((log) => log.type === logType);
		if (logs.length === 0) return;
		await this.writeElement(`system-${type}`, {}, async () => {
			for (const log of logs) await this.baseLog(escapeXML(log.content));
		});
	}
	async writeSystemOut(task) {
		const logs = this.options.includeConsoleOutput && task.logs ? task.logs.filter((log) => log.type === "stdout") : [];
		const benchmarks = task.type === "test" ? task.benchmarks : [];
		if (logs.length === 0 && benchmarks.length === 0) return;
		await this.writeElement("system-out", {}, async () => {
			for (const log of logs) await this.baseLog(escapeXML(log.content));
			if (benchmarks.length > 0) {
				if (logs.length > 0) await this.baseLog("");
				await this.baseLog(escapeXML(renderBenchmarkTableText(benchmarks)));
			}
		});
	}
	applyTemplate(template, vars) {
		if (typeof template === "function") return template(vars);
		return template.replace(/\{filename\}/g, () => vars.filename).replace(/\{filepath\}/g, () => vars.filepath).replace(/\{basename\}/g, () => vars.basename).replace(/\{classname\}/g, () => vars.classname).replace(/\{title\}/g, () => vars.title).replace(/\{suitename\}/g, () => vars.suitename).replace(/\{displayName\}/g, () => vars.displayName);
	}
	async writeTasks(tasks, filename, fileAbsPath) {
		for (const task of tasks) {
			const fileBasename = task.file ? basename(task.file.filepath) : basename(fileAbsPath);
			const templateVars = {
				filename: task.file?.name ?? filename,
				filepath: task.file?.filepath ?? fileAbsPath,
				basename: fileBasename,
				classname: task._classname ?? "",
				title: task._leafName ?? task.name,
				suitename: task._suitename ?? "",
				displayName: task.file?.projectName ?? ""
			};
			let classname = filename;
			if (this.options.classnameTemplate) classname = this.applyTemplate(this.options.classnameTemplate, templateVars);
			const testcaseName = this.options.titleTemplate ? this.applyTemplate(this.options.titleTemplate, templateVars) : task.name;
			await this.writeElement("testcase", {
				classname,
				file: this.options.addFileAttribute ? filename : void 0,
				name: testcaseName,
				time: getDuration(task)
			}, async () => {
				await this.writeSystemOut(task);
				if (this.options.includeConsoleOutput) await this.writeLogs(task, "err");
				if (task.mode === "skip" || task.mode === "todo") await this.logger.log("<skipped/>");
				if (task.type === "test" && task.annotations.length) {
					await this.logger.log("<properties>");
					this.logger.indent();
					for (const annotation of task.annotations) {
						await this.logger.log(`<property name="${escapeXML(annotation.type)}" value="${escapeXML(annotation.message)}">`);
						await this.logger.log("</property>");
					}
					this.logger.unindent();
					await this.logger.log("</properties>");
				}
				if (task.result?.state === "fail") {
					const errors = task.result.errors || [];
					for (const error of errors) await this.writeErrorElement("failure", error, { project: this.ctx.getProjectByName(task.file?.projectName ?? "") });
				}
			});
		}
	}
	resolveSuiteNameTemplate(file, filename) {
		if (!this.options.suiteNameTemplate) return filename;
		const fileBasename = basename(file.filepath);
		const firstSuiteName = file.tasks.find((t) => t.type === "suite")?.name ?? fileBasename;
		const vars = {
			filepath: file.filepath,
			filename,
			basename: fileBasename,
			displayName: file.projectName ?? "",
			title: firstSuiteName
		};
		if (typeof this.options.suiteNameTemplate === "function") return this.options.suiteNameTemplate(vars);
		return this.options.suiteNameTemplate.replace(/\{filepath\}/g, () => vars.filepath).replace(/\{filename\}/g, () => vars.filename).replace(/\{basename\}/g, () => vars.basename).replace(/\{displayName\}/g, () => vars.displayName).replace(/\{title\}/g, () => vars.title);
	}
	async writeErrorElement(elementName, error, errorOptions) {
		await this.writeElement(elementName, {
			message: error?.message,
			type: error?.name
		}, async () => {
			if (!error || !this.options.stackTrace) return;
			const result = this.ctx.logger.formatError(error, errorOptions);
			await this.baseLog(escapeXML(result.output.trim()));
		});
	}
	async writeUnhandledErrorsTestsuite(unhandledErrors, testModules) {
		await this.writeElement("testsuite", {
			name: "vitest unhandled errors",
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			hostname: this.options.hostname || hostname(),
			tests: unhandledErrors.length,
			failures: 0,
			errors: unhandledErrors.length,
			skipped: 0,
			time: "0"
		}, async () => {
			// Stable order across runs — workers/projects report errors concurrently.
			const sortedErrors = [...unhandledErrors].sort((a, b) => {
				const ka = `${a.VITEST_TEST_PATH ?? ""}\0${a.type ?? ""}\0${a.name ?? ""}\0${a.message ?? ""}`;
				const kb = `${b.VITEST_TEST_PATH ?? ""}\0${b.type ?? ""}\0${b.name ?? ""}\0${b.message ?? ""}`;
				return ka < kb ? -1 : ka > kb ? 1 : 0;
			});
			for (const error of sortedErrors) {
				const errorTitle = error.type || error.name || "Unhandled Error";
				// Only attribute when the path resolves to exactly one module — when
				// multiple projects share a file, errors lack a project identifier and
				// we can't disambiguate without one (tracked for follow-up).
				const matches = error.VITEST_TEST_PATH ? testModules.filter((m) => m.task.filepath === error.VITEST_TEST_PATH) : [];
				const owningModule = matches.length === 1 ? matches[0] : void 0;
				await this.writeElement("testcase", {
					classname: "vitest unhandled errors",
					file: this.options.addFileAttribute && error.VITEST_TEST_PATH ? relative(this.ctx.config.root, error.VITEST_TEST_PATH) : void 0,
					name: error.message ? `${errorTitle}: ${error.message}` : errorTitle,
					time: "0"
				}, async () => {
					await this.writeErrorElement("error", error, { project: owningModule?.project });
				});
			}
		});
	}
	async onTestRunEnd(testModules, unhandledErrors = []) {
		const files = testModules.map((testModule) => testModule.task);
		const separator = this.options.ancestorSeparator ?? " > ";
		await this.logger.log("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>");
		const transformed = files.map((file) => {
			const tasks = file.tasks.flatMap((task) => flattenTasks$1(task, "", "", separator));
			const stats = tasks.reduce((stats, task) => {
				return {
					passed: stats.passed + Number(task.result?.state === "pass"),
					failures: stats.failures + Number(task.result?.state === "fail"),
					skipped: stats.skipped + Number(task.mode === "skip" || task.mode === "todo")
				};
			}, {
				passed: 0,
				failures: 0,
				skipped: 0
			});
			// inject failed suites to surface errors during beforeAll/afterAll
			const suites = getSuites(file);
			for (const suite of suites) if (suite.result?.errors) {
				tasks.push(suite);
				stats.failures += 1;
			}
			// If there are no tests, but the file failed to load, we still want to report it as a failure
			if (tasks.length === 0 && file.result?.state === "fail") {
				stats.failures = 1;
				tasks.push({
					id: file.id,
					type: "test",
					name: file.name,
					fullName: file.name,
					fullTestName: file.name,
					mode: "run",
					result: file.result,
					meta: {},
					timeout: 0,
					// NOTE: not used in JUnitReporter
					context: null,
					suite: null,
					file: null,
					annotations: [],
					artifacts: [],
					benchmarks: []
				});
			}
			return {
				...file,
				tasks,
				stats
			};
		});
		const stats = transformed.reduce((stats, file) => {
			stats.tests += file.tasks.length;
			stats.failures += file.stats.failures;
			stats.time += file.result?.duration || 0;
			return stats;
		}, {
			name: this.options.suiteName || "vitest tests",
			tests: 0,
			failures: 0,
			errors: unhandledErrors.length,
			time: 0
		});
		stats.tests += unhandledErrors.length;
		// Plain byte compare (not localeCompare) so output is identical across machines and ICU versions.
		const orderedSuites = transformed.map((file, i) => {
			const filename = relative(this.ctx.config.root, file.filepath);
			return {
				file,
				filename,
				suiteName: this.resolveSuiteNameTemplate(files[i], filename)
			};
		}).sort((a, b) => a.suiteName < b.suiteName ? -1 : a.suiteName > b.suiteName ? 1 : 0);
		await this.writeElement("testsuites", {
			...stats,
			time: executionTime(stats.time)
		}, async () => {
			for (const { file, filename, suiteName } of orderedSuites) await this.writeElement("testsuite", {
				name: suiteName,
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				hostname: this.options.hostname || hostname(),
				tests: file.tasks.length,
				failures: file.stats.failures,
				errors: 0,
				skipped: file.stats.skipped,
				time: getDuration(file)
			}, async () => {
				await this.writeTasks(file.tasks, filename, file.filepath);
			});
			if (unhandledErrors.length) await this.writeUnhandledErrorsTestsuite(unhandledErrors, testModules);
		});
		if (this.reportFile) this.ctx.logger.log(`JUNIT report written to ${this.reportFile}`);
		await this.fileFd?.close();
		this.fileFd = void 0;
	}
}

class MinimalReporter extends DefaultReporter {
	renderSucceed = false;
	constructor(options = {}) {
		super({
			...options,
			summary: false
		});
	}
	onInit(ctx) {
		if (this.silent == null && !ctx.config.providedOptions.silent) this.silent = "passed-only";
		super.onInit(ctx);
	}
	onTestRunStart(specifications) {
		super.onTestRunStart(specifications);
		this.renderSucceed = false;
	}
	printTestModule(testModule) {
		if (testModule.state() !== "failed") return;
		super.printTestModule(testModule);
	}
	printTestCase(moduleState, test) {
		if (test.result().state === "failed") super.printTestCase(moduleState, test);
	}
}

function yamlString(str) {
	if (!str) return "";
	return `"${str.replace(/"/g, "\\\"")}"`;
}
function tapString(str) {
	return str.replace(/\\/g, "\\\\").replace(/#/g, "\\#").replace(/\n/g, " ");
}
class TapReporter {
	ctx;
	logger;
	onInit(ctx) {
		this.ctx = ctx;
		this.logger = new IndentedLogger(ctx.logger.log.bind(ctx.logger));
	}
	static getComment(task) {
		if (task.mode === "skip") return " # SKIP";
		else if (task.mode === "todo") return " # TODO";
		else if (task.result?.duration != null) return ` # time=${task.result.duration.toFixed(2)}ms`;
		else return "";
	}
	logErrorDetails(error, stack) {
		const errorName = error.name || "Unknown Error";
		this.logger.log(`name: ${yamlString(String(errorName))}`);
		this.logger.log(`message: ${yamlString(String(error.message))}`);
		if (stack)
 // For compatibility with tap-mocha-reporter
		this.logger.log(`stack: ${yamlString(`${stack.file}:${stack.line}:${stack.column}`)}`);
	}
	logTasks(tasks) {
		this.logger.log(`1..${tasks.length}`);
		for (const [i, task] of tasks.entries()) {
			const id = i + 1;
			const ok = task.result?.state === "pass" || task.mode === "skip" || task.mode === "todo" ? "ok" : "not ok";
			const comment = TapReporter.getComment(task);
			if (task.type === "suite" && task.tasks.length > 0) {
				this.logger.log(`${ok} ${id} - ${tapString(task.name)}${comment} {`);
				this.logger.indent();
				this.logTasks(task.tasks);
				this.logger.unindent();
				this.logger.log("}");
			} else {
				this.logger.log(`${ok} ${id} - ${tapString(task.name)}${comment}`);
				const project = this.ctx.getProjectByName(task.file.projectName || "");
				if (task.type === "test" && task.annotations) {
					this.logger.indent();
					task.annotations.forEach(({ type, message }) => {
						this.logger.log(`# ${type}: ${message}`);
					});
					this.logger.unindent();
				}
				if (task.result?.state === "fail" && task.result.errors) {
					this.logger.indent();
					task.result.errors.forEach((error) => {
						const stack = (task.file.pool === "browser" ? project.browser?.parseErrorStacktrace(error) || [] : parseErrorStacktrace(error, { frameFilter: this.ctx.config.onStackTrace }))[0];
						this.logger.log("---");
						this.logger.log("error:");
						this.logger.indent();
						this.logErrorDetails(error);
						this.logger.unindent();
						if (stack) this.logger.log(`at: ${yamlString(`${stack.file}:${stack.line}:${stack.column}`)}`);
						if (error.showDiff) {
							this.logger.log(`actual: ${yamlString(error.actual)}`);
							this.logger.log(`expected: ${yamlString(error.expected)}`);
						}
					});
					this.logger.log("...");
					this.logger.unindent();
				}
			}
		}
	}
	onTestRunEnd(testModules) {
		const files = testModules.map((testModule) => testModule.task);
		this.logger.log("TAP version 13");
		this.logTasks(files);
	}
}

function flattenTasks(task, baseName = "") {
	const base = baseName ? `${baseName} > ` : "";
	if (task.type === "suite" && task.tasks.length > 0) return task.tasks.flatMap((child) => flattenTasks(child, `${base}${task.name}`));
	else return [{
		...task,
		name: `${base}${task.name}`
	}];
}
class TapFlatReporter extends TapReporter {
	onInit(ctx) {
		super.onInit(ctx);
	}
	onTestRunEnd(testModules) {
		this.ctx.logger.log("TAP version 13");
		const flatTasks = testModules.flatMap((testModule) => flattenTasks(testModule.task));
		this.logTasks(flatTasks);
	}
}

class TreeReporter extends DefaultReporter {
	verbose = true;
	renderSucceed = true;
}

class VerboseReporter extends DefaultReporter {
	verbose = true;
	renderSucceed = true;
	printTestModule(_module) {
		// don't print test module, only print tests
	}
	onTestCaseResult(test) {
		super.onTestCaseResult(test);
		const testResult = test.result();
		if (this.ctx.config.hideSkippedTests && testResult.state === "skipped" && test.options.mode !== "todo") return;
		let title = ` ${this.getEntityPrefix(test)} `;
		title += test.module.task.name;
		if (test.location) title += $.dim(`:${test.location.line}`);
		title += separator;
		title += getTestName(test.task, separator);
		title += this.getTestCaseSuffix(test);
		this.log(title);
		if (testResult.state === "failed") testResult.errors.forEach((error) => this.log($.red(`   ${F_RIGHT} ${error.message}`)));
		if (test.annotations().length) {
			this.log();
			this.printAnnotations(test, "log", 3);
			this.log();
		}
		const inlineBenchmarks = test.benchmarks().filter((b) => b.tasks.length > 0);
		if (inlineBenchmarks.length > 0) this.printBenchmarkTable(inlineBenchmarks, "");
	}
}

const ReportersMap = {
	default: DefaultReporter,
	agent: MinimalReporter,
	minimal: MinimalReporter,
	blob: BlobReporter,
	verbose: VerboseReporter,
	dot: DotReporter,
	json: JsonReporter,
	tap: TapReporter,
	"tap-flat": TapFlatReporter,
	junit: JUnitReporter,
	tree: TreeReporter,
	"hanging-process": HangingProcessReporter,
	"github-actions": GithubActionsReporter
};

async function loadCustomReporterModule(path, runner) {
	let customReporterModule;
	try {
		customReporterModule = await runner.import(path);
	} catch (customReporterModuleError) {
		throw new Error(`Failed to load custom Reporter from ${path}`, { cause: customReporterModuleError });
	}
	if (customReporterModule.default === null || customReporterModule.default === void 0) throw new Error(`Custom reporter loaded from ${path} was not the default export`);
	return customReporterModule.default;
}
function createReporters(reporterReferences, ctx) {
	const runner = ctx.runner;
	const promisedReporters = reporterReferences.map(async (referenceOrInstance) => {
		if (Array.isArray(referenceOrInstance)) {
			const [reporterName, reporterOptions] = referenceOrInstance;
			if (reporterName === "html") {
				await ctx.packageInstaller.ensureInstalled("@vitest/ui", ctx.config.root, ctx.version);
				return new (await (loadCustomReporterModule("@vitest/ui/reporter", runner)))(reporterOptions);
			} else if (reporterName in ReportersMap) {
				const BuiltinReporter = ReportersMap[reporterName];
				return new BuiltinReporter(reporterOptions);
			} else return new (await (loadCustomReporterModule(reporterName, runner)))(reporterOptions);
		}
		return referenceOrInstance;
	});
	return Promise.all(promisedReporters);
}

function parseFilter(filter) {
	const colonIndex = filter.lastIndexOf(":");
	if (colonIndex === -1) return { filename: filter };
	const [parsedFilename, lineNumber] = [filter.substring(0, colonIndex), filter.substring(colonIndex + 1)];
	if (/^\d+$/.test(lineNumber)) return {
		filename: parsedFilename,
		lineNumber: Number.parseInt(lineNumber)
	};
	else if (/^\d+-\d+$/.test(lineNumber)) throw new RangeLocationFilterProvidedError(filter);
	else return { filename: filter };
}
function groupFilters(filters) {
	const groupedFilters_ = groupBy(filters, (f) => f.filename);
	return Object.fromEntries(Object.entries(groupedFilters_).map((entry) => {
		const [filename, filters] = entry;
		return [filename, filters.map((f) => f.lineNumber).filter((l) => l !== void 0)];
	}));
}

/**
* Reports a dependency as changed when its modification time is newer than the run that recorded it.
* A dependency without a recorded time is always changed.
*/
class MtimeVCSProvider {
	async findChangedFiles(options) {
		const dependencies = await options.resolver.getDependencies();
		return (await Promise.all(dependencies.map(async ({ file, recordedAt }) => {
			if (recordedAt == null) return file;
			const stats = await stat(file).catch(() => null);
			return !stats || stats.mtimeMs > recordedAt ? file : null;
		}))).filter((file) => file != null);
	}
}

class VitestSpecifications {
	vitest;
	_cachedSpecs = /* @__PURE__ */ new Map();
	constructor(vitest) {
		this.vitest = vitest;
	}
	getModuleSpecifications(moduleId) {
		const _cached = this.getCachedSpecifications(moduleId);
		if (_cached) return _cached;
		const specs = [];
		for (const project of this.vitest.projects) {
			if (project._isCachedTestFile(moduleId)) specs.push(project.createSpecification(moduleId));
			if (project._isCachedTypecheckFile(moduleId)) specs.push(project.createSpecification(moduleId, [], "typescript"));
		}
		specs.forEach((spec) => this.ensureSpecificationCached(spec));
		return specs;
	}
	async getRelevantTestSpecifications(filters = []) {
		const specifications = await this.filterTestsBySource(await this.globTestSpecifications(filters));
		if (this.vitest.config.cliOptions.lastFailed) return this.filterFailedTests(specifications);
		return specifications;
	}
	async globTestSpecifications(filters = []) {
		const files = [];
		const dir = process.cwd();
		const parsedFilters = filters.map((f) => parseFilter(f));
		// Require includeTaskLocation when a location filter is passed
		if (!this.vitest.config.includeTaskLocation && parsedFilters.some((f) => f.lineNumber !== void 0)) throw new IncludeTaskLocationDisabledError();
		const testLines = groupFilters(parsedFilters.map((f) => ({
			...f,
			filename: resolve(dir, f.filename)
		})));
		// Key is file and val specifies whether we have matched this file with testLocation
		const testLocHasMatch = {};
		await Promise.all(this.vitest.projects.map(async (project) => {
			const { testFiles, typecheckTestFiles } = await project.globTestFiles(parsedFilters.map((f) => f.filename));
			testFiles.forEach((file) => {
				const lines = testLines[file];
				testLocHasMatch[file] = true;
				const spec = project.createSpecification(file, lines);
				this.ensureSpecificationCached(spec);
				files.push(spec);
			});
			typecheckTestFiles.forEach((file) => {
				const lines = testLines[file];
				testLocHasMatch[file] = true;
				const spec = project.createSpecification(file, lines, "typescript");
				this.ensureSpecificationCached(spec);
				files.push(spec);
			});
		}));
		Object.entries(testLines).forEach(([filepath, loc]) => {
			if (loc.length !== 0 && !testLocHasMatch[filepath]) throw new LocationFilterFileNotFoundError(relative(dir, filepath));
		});
		return files;
	}
	clearCache(moduleId) {
		if (moduleId) this._cachedSpecs.delete(moduleId);
		else this._cachedSpecs.clear();
	}
	invalidateDocblock(moduleId) {
		this._cachedSpecs.get(moduleId)?.forEach((spec) => {
			spec._docblock = void 0;
		});
	}
	getCachedSpecifications(moduleId) {
		return this._cachedSpecs.get(moduleId);
	}
	ensureSpecificationCached(spec) {
		const file = spec.moduleId;
		const specs = this._cachedSpecs.get(file) || [];
		const index = specs.findIndex((_s) => _s.project === spec.project && _s.pool === spec.pool);
		if (index === -1) {
			specs.push(spec);
			this._cachedSpecs.set(file, specs);
		} else specs.splice(index, 1, spec);
		return specs;
	}
	async filterTestsBySource(specs) {
		this.vitest._sourceFilterResult = void 0;
		const resolver = createModulesResolver(this.vitest, specs);
		if (this.vitest.config.changed && !this.vitest.config.related) {
			const related = await this.vitest.vcs.findChangedFiles({
				root: this.vitest.config.root,
				changedSince: this.vitest.config.changed,
				resolver
			});
			this.vitest.config.related = Array.from(new Set(related));
		}
		const related = this.vitest.config.related;
		if (!related) return specs;
		const forceRerunTriggers = this.vitest.config.forceRerunTriggers;
		const matcher = forceRerunTriggers.length ? pm(forceRerunTriggers, { dot: true }) : void 0;
		if (matcher && related.some((file) => matcher(file))) return specs;
		const failedSpecs = this.getFailedSpecifications(specs);
		// don't run anything if no related sources are found
		// if we are in watch mode, we want to process all tests
		if (!this.vitest.config.watch && !related.length) {
			this.vitest._sourceFilterResult = {
				affected: failedSpecs.length,
				total: specs.length,
				failed: failedSpecs.length
			};
			return failedSpecs;
		}
		const affected = /* @__PURE__ */ new Set([...await resolver.getAffectedSpecifications(related), ...failedSpecs]);
		const affectedSpecs = specs.filter((spec) => affected.has(spec));
		this.vitest._sourceFilterResult = {
			affected: affectedSpecs.length,
			total: specs.length,
			failed: failedSpecs.length
		};
		return affectedSpecs;
	}
	// a failure can have a cause outside the recorded files, so the file runs until it passes
	getFailedSpecifications(specs) {
		if (!this.vitest.config.changed || !(this.vitest.vcs instanceof MtimeVCSProvider)) return [];
		return specs.filter((spec) => this.vitest.cache.getTestSpecificationResult(spec)?.failed);
	}
	filterFailedTests(specs) {
		const failed = [];
		for (const spec of specs) {
			const result = this.vitest.cache.getTestSpecificationResult(spec);
			if (!result?.failed) continue;
			failed.push(result.failedTests ? spec.project.createSpecification(
				spec.moduleId,
				// "file:line" filters are the only options a globbed specification can have
				{
					testNames: result.failedTests,
					testLines: spec.testLines
				},
				spec.pool
			) : spec);
		}
		this.vitest._failedFilterResult = {
			selected: failed.length,
			total: specs.length
		};
		return failed;
	}
}

class ReportedTaskImplementation {
	/**
	* Task instance.
	* @internal
	*/
	task;
	/**
	* The project associated with the test or suite.
	*/
	project;
	/**
	* Unique identifier.
	* This ID is deterministic and will be the same for the same test across multiple runs.
	* The ID is based on the project name, module url and test order.
	*/
	id;
	/**
	* Location in the module where the test or suite is defined.
	*/
	location;
	/** @internal */
	constructor(task, project) {
		this.task = task;
		this.project = project;
		this.id = task.id;
		this.location = task.location;
	}
	/**
	* Checks if the test did not fail the suite.
	* If the test is not finished yet or was skipped, it will return `true`.
	*/
	ok() {
		const result = this.task.result;
		return !result || result.state !== "fail";
	}
	/**
	* Custom metadata that was attached to the test during its execution.
	*/
	meta() {
		return this.task.meta;
	}
	/**
	* Console logs recorded during the test execution.
	*/
	logs() {
		return [...this.task.logs || []];
	}
	/**
	* Creates a new reported task instance and stores it in the project's state for future use.
	* @internal
	*/
	static register(task, project) {
		const state = new this(task, project);
		storeTask(project, task, state);
		return state;
	}
}
class TestCase extends ReportedTaskImplementation {
	#fullName;
	type = "test";
	/**
	* Direct reference to the test module where the test or suite is defined.
	*/
	module;
	/**
	* Name of the test.
	*/
	name;
	/**
	* Options that the test was initiated with.
	*/
	options;
	/**
	* Parent suite. If the test was called directly inside the module, the parent will be the module itself.
	*/
	parent;
	/**
	* Tags associated with the test.
	*/
	tags;
	/** @internal */
	constructor(task, project) {
		super(task, project);
		this.name = task.name;
		this.module = getReportedTask(project, task.file);
		const suite = this.task.suite;
		if (suite) this.parent = getReportedTask(project, suite);
		else this.parent = this.module;
		this.options = buildOptions(task);
		this.tags = this.options.tags || [];
	}
	/**
	* Full name of the test including all parent suites separated with `>`.
	*/
	get fullName() {
		if (this.#fullName === void 0) {
			if (this.parent.type !== "module") this.#fullName = `${this.parent.fullName} > ${this.name}`;
			else this.#fullName = this.name;
		}
		return this.#fullName;
	}
	/**
	* Test results.
	* - **pending**: Test was collected, but didn't finish running yet.
	* - **passed**: Test passed successfully
	* - **failed**: Test failed to execute
	* - **skipped**: Test was skipped during collection or dynamically with `ctx.skip()`.
	*/
	result() {
		const result = this.task.result;
		const mode = result?.state || this.task.mode;
		if (!result && (mode === "skip" || mode === "todo")) return {
			state: "skipped",
			note: void 0,
			errors: void 0
		};
		if (!result || result.state === "run" || result.state === "queued") return {
			state: "pending",
			errors: void 0
		};
		const state = result.state === "fail" ? "failed" : result.state === "pass" ? "passed" : "skipped";
		if (state === "skipped") return {
			state,
			note: result.note,
			errors: void 0
		};
		if (state === "passed") return {
			state,
			errors: result.errors
		};
		return {
			state,
			errors: result.errors || []
		};
	}
	/**
	* Individual results for every retry and repeat attempt.
	*/
	attempts() {
		return (this.task.result?.attempts || []).map((attempt) => ({
			state: attempt.state === "pass" ? "passed" : attempt.state === "fail" ? "failed" : "skipped",
			errors: attempt.errors,
			duration: attempt.duration,
			startTime: attempt.startTime,
			retryIndex: attempt.retryIndex,
			repeatIndex: attempt.repeatIndex
		}));
	}
	/**
	* Test annotations added via the `task.annotate` API during the test execution.
	*/
	annotations() {
		return [...this.task.annotations];
	}
	/**
	* @experimental
	*
	* Test artifacts recorded via the `recordArtifact` API during the test execution.
	*/
	artifacts() {
		return [...this.task.artifacts];
	}
	/**
	* @experimental
	*
	* A list of benchmarks performed during the test.
	*/
	benchmarks() {
		return [...this.task.benchmarks];
	}
	/**
	* Useful information about the test like duration, memory usage, etc.
	* Diagnostic is only available after the test has finished.
	*/
	diagnostic() {
		const result = this.task.result;
		// startTime should always be available if the test has properly finished
		if (!result || !result.startTime) return;
		const duration = result.duration || 0;
		return {
			slow: duration > this.project.globalConfig.slowTestThreshold,
			heap: result.heap,
			duration,
			startTime: result.startTime,
			retryCount: result.retryCount ?? 0,
			repeatCount: result.repeatCount ?? 0,
			flaky: !!result.retryCount && result.state === "pass" && result.retryCount > 0
		};
	}
	/**
	* Returns a new test specification that can be used to filter or run this specific test case.
	*/
	toTestSpecification() {
		const isTypecheck = this.module.task.meta.typecheck === true;
		return this.project.createSpecification(this.module.moduleId, { testIds: [this.id] }, isTypecheck ? "typescript" : void 0);
	}
}
class TestCollection {
	#task;
	#project;
	constructor(task, project) {
		this.#task = task;
		this.#project = project;
	}
	/**
	* Returns the test or suite at a specific index.
	*/
	at(index) {
		if (index < 0) index = this.size + index;
		return getReportedTask(this.#project, this.#task.tasks[index]);
	}
	/**
	* The number of tests and suites in the collection.
	*/
	get size() {
		return this.#task.tasks.length;
	}
	/**
	* Returns the collection in array form for easier manipulation.
	*/
	array() {
		return Array.from(this);
	}
	/**
	* Filters all tests that are part of this collection and its children.
	*/
	*allTests(state) {
		for (const child of this) if (child.type === "suite") yield* child.children.allTests(state);
		else if (state) {
			if (state === child.result().state) yield child;
		} else yield child;
	}
	/**
	* Filters only the tests that are part of this collection.
	*/
	*tests(state) {
		for (const child of this) {
			if (child.type !== "test") continue;
			if (state) {
				if (state === child.result().state) yield child;
			} else yield child;
		}
	}
	/**
	* Filters only the suites that are part of this collection.
	*/
	*suites() {
		for (const child of this) if (child.type === "suite") yield child;
	}
	/**
	* Filters all suites that are part of this collection and its children.
	*/
	*allSuites() {
		for (const child of this) if (child.type === "suite") {
			yield child;
			yield* child.children.allSuites();
		}
	}
	*[Symbol.iterator]() {
		for (const task of this.#task.tasks) yield getReportedTask(this.#project, task);
	}
}
class SuiteImplementation extends ReportedTaskImplementation {
	/**
	* Collection of suites and tests that are part of this suite.
	*/
	children;
	/** @internal */
	constructor(task, project) {
		super(task, project);
		this.children = new TestCollection(task, project);
	}
	/**
	* Errors that happened outside of the test run during collection, like syntax errors.
	*/
	errors() {
		return this.task.result?.errors || [];
	}
}
class TestSuite extends SuiteImplementation {
	#fullName;
	type = "suite";
	/**
	* Name of the test or the suite.
	*/
	name;
	/**
	* Direct reference to the test module where the test or suite is defined.
	*/
	module;
	/**
	* Parent suite. If suite was called directly inside the module, the parent will be the module itself.
	*/
	parent;
	/**
	* Options that suite was initiated with.
	*/
	options;
	/** @internal */
	constructor(task, project) {
		super(task, project);
		this.name = task.name;
		this.module = getReportedTask(project, task.file);
		const suite = this.task.suite;
		if (suite) this.parent = getReportedTask(project, suite);
		else this.parent = this.module;
		this.options = buildOptions(task);
	}
	/**
	* Checks the running state of the suite.
	*/
	state() {
		return getSuiteState(this.task);
	}
	/**
	* Returns a new test specification that can be used to filter or run this specific test suite.
	*/
	toTestSpecification() {
		const isTypecheck = this.module.task.meta.typecheck === true;
		const testIds = Array.from(this.children.allTests(), (test) => test.id);
		return this.project.createSpecification(this.module.moduleId, { testIds }, isTypecheck ? "typescript" : void 0);
	}
	/**
	* Full name of the suite including all parent suites separated with `>`.
	*/
	get fullName() {
		if (this.#fullName === void 0) {
			if (this.parent.type !== "module") this.#fullName = `${this.parent.fullName} > ${this.name}`;
			else this.#fullName = this.name;
		}
		return this.#fullName;
	}
}
class TestModule extends SuiteImplementation {
	type = "module";
	/**
	* The Vite environment that processes files on the server.
	*
	* Can be empty if test module did not run yet.
	*/
	viteEnvironment;
	/**
	* This is usually an absolute UNIX file path.
	* It can be a virtual ID if the file is not on the disk.
	* This value corresponds to the ID in the Vite's module graph.
	*/
	moduleId;
	/**
	* Module id relative to the project. This is the same as `task.name`.
	*/
	relativeModuleId;
	/** @internal */
	constructor(task, project) {
		super(task, project);
		this.moduleId = task.filepath;
		this.relativeModuleId = task.name;
		if (typeof task.viteEnvironment === "string") this.viteEnvironment = project.vite.environments[task.viteEnvironment];
	}
	/**
	* Returns a new test specification that can be used to filter or run this specific test module.
	*/
	toTestSpecification(testCases) {
		const isTypecheck = this.task.meta.typecheck === true;
		return this.project.createSpecification(this.moduleId, testCases?.length ? { testIds: testCases.map((t) => t.id) } : void 0, isTypecheck ? "typescript" : void 0);
	}
	/**
	* Checks the running state of the test file.
	*/
	state() {
		if (this.task.result?.state === "queued") return "queued";
		return getSuiteState(this.task);
	}
	/**
	* Useful information about the module like duration, memory usage, etc.
	* If the module was not executed yet, all diagnostic values will return `0`.
	*/
	diagnostic() {
		const setupDuration = this.task.setupDuration || 0;
		const collectDuration = this.task.collectDuration || 0;
		const prepareDuration = this.task.prepareDuration || 0;
		return {
			environmentSetupDuration: this.task.environmentLoad || 0,
			prepareDuration,
			collectDuration,
			setupDuration,
			duration: this.task.result?.duration || 0,
			heap: this.task.result?.heap,
			importDurations: this.task.importDurations ?? {},
			concurrencyId: this.task.concurrencyId,
			workerId: this.task.workerId
		};
	}
}
function buildOptions(task) {
	return {
		each: task.each,
		fails: task.type === "test" && task.fails,
		concurrent: task.concurrent,
		shuffle: task.shuffle,
		retry: task.retry,
		repeats: task.repeats,
		tags: task.tags,
		timeout: task.type === "test" ? task.timeout : void 0,
		// runner types are too broad, but the public API should be more strict
		// the queued state exists only on Files and this method is called
		// only for tests and suites
		mode: task.mode
	};
}
function storeTask(project, runnerTask, reportedTask) {
	project.vitest.state.reportedTasksMap.set(runnerTask, reportedTask);
}
function getReportedTask(project, runnerTask) {
	const reportedTask = project.vitest.state.getReportedEntity(runnerTask);
	if (!reportedTask) throw new Error(`Task instance was not found for ${runnerTask.type} "${runnerTask.name}"`);
	return reportedTask;
}
function getSuiteState(task) {
	const mode = task.mode;
	const state = task.result?.state;
	if (mode === "skip" || mode === "todo" || state === "skip" || state === "todo") return "skipped";
	if (state == null || state === "run" || state === "only") return "pending";
	if (state === "fail") return "failed";
	if (state === "pass") return "passed";
	throw new Error(`Unknown suite state: ${state}`);
}
function experimental_getRunnerTask(entity) {
	return entity.task;
}

function isAggregateError(err) {
	if (typeof AggregateError !== "undefined" && err instanceof AggregateError) return true;
	return err instanceof Error && "errors" in err;
}
class StateManager {
	filesMap = /* @__PURE__ */ new Map();
	pathsSet = /* @__PURE__ */ new Set();
	idMap = /* @__PURE__ */ new Map();
	taskFileMap = /* @__PURE__ */ new WeakMap();
	errorsSet = /* @__PURE__ */ new Set();
	leakSet = /* @__PURE__ */ new Set();
	reportedTasksMap = /* @__PURE__ */ new WeakMap();
	blobs;
	/**
	* Total time spent starting test workers (spawning the process/thread, loading
	* the worker bundle and setting up the test environment). Used to surface the
	* cost of `isolate: true`, which spawns a fresh worker per test file.
	*/
	startupTime = 0;
	/** Number of test workers that were started during the run. */
	workersSpawned = 0;
	metadata = {};
	onUnhandledError;
	/** @internal */
	_data = { timeoutIncreased: false };
	constructor(options) {
		this.onUnhandledError = options.onUnhandledError;
	}
	catchError(error, type) {
		if (isAggregateError(error)) return error.errors.forEach((error) => this.catchError(error, type));
		if (typeof error === "object" && error !== null) error.type = type;
		else error = {
			type,
			message: error
		};
		const _error = error;
		if (_error && typeof _error === "object" && _error.code === "VITEST_PENDING") {
			const task = this.idMap.get(_error.taskId);
			if (task) {
				task.mode = "skip";
				task.result ??= { state: "skip" };
				task.result.state = "skip";
				task.result.note = _error.note;
			}
			return;
		}
		if (!this.onUnhandledError || this.onUnhandledError(error) !== false) this.errorsSet.add(error);
	}
	catchLeaks(leaks) {
		leaks.forEach((leak) => this.leakSet.add(leak));
	}
	clearErrors() {
		this.errorsSet.clear();
		this.leakSet.clear();
	}
	getUnhandledErrors() {
		return Array.from(this.errorsSet);
	}
	getPaths() {
		return Array.from(this.pathsSet);
	}
	/**
	* Return files that were running or collected.
	*/
	getFiles(keys) {
		if (keys) return keys.map((key) => this.filesMap.get(key)).flat().filter((file) => file && !file.local);
		return Array.from(this.filesMap.values()).flat().filter((file) => !file.local).sort((f1, f2) => {
			// print typecheck files first
			if (f1.meta?.typecheck && f2.meta?.typecheck) return 0;
			if (f1.meta?.typecheck) return -1;
			return 1;
		});
	}
	getTestModules(keys) {
		return this.getFiles(keys).map((file) => this.getReportedEntity(file));
	}
	getFilepaths() {
		return Array.from(this.filesMap.keys());
	}
	getFailedFilepaths() {
		return this.getFiles().filter((i) => i.result?.state === "fail").map((i) => i.filepath);
	}
	collectPaths(paths = []) {
		paths.forEach((path) => {
			this.pathsSet.add(path);
		});
	}
	collectFiles(project, files = []) {
		files.forEach((file) => {
			const existing = this.filesMap.get(file.filepath) || [];
			const currentFile = existing.find((i) => i.projectName === file.projectName && i.meta.typecheck === file.meta.typecheck && i.meta.__vitest_label__ === file.meta.__vitest_label__);
			// keep logs for the previous file because it should always be initiated before the collections phase
			// which means that all logs are collected during the collection and not inside tests
			if (currentFile) file.logs = currentFile.logs;
			const otherFiles = existing.filter((i) => i !== currentFile);
			otherFiles.push(file);
			this.filesMap.set(file.filepath, otherFiles);
			this.updateId(file, project);
		});
	}
	clearFiles(project, paths = []) {
		paths.forEach((path) => {
			const files = this.filesMap.get(path);
			const fileTask = createFileTask(path, project.config.root, project.config.name);
			fileTask.local = true;
			TestModule.register(fileTask, project);
			this.idMap.set(fileTask.id, fileTask);
			if (!files) {
				this.filesMap.set(path, [fileTask]);
				return;
			}
			const filtered = files.filter((file) => file.projectName !== project.config.name);
			// always keep a File task, so we can associate logs with it
			if (!filtered.length) this.filesMap.set(path, [fileTask]);
			else this.filesMap.set(path, [...filtered, fileTask]);
		});
	}
	updateId(task, project) {
		if (this.idMap.get(task.id) === task) return;
		if (task.type === "suite" && "filepath" in task) TestModule.register(task, project);
		else if (task.type === "suite") TestSuite.register(task, project);
		else TestCase.register(task, project);
		this.idMap.set(task.id, task);
		if (task.type === "suite") task.tasks.forEach((task) => {
			this.updateId(task, project);
		});
	}
	getReportedEntity(task) {
		return this.reportedTasksMap.get(task);
	}
	getReportedEntityById(taskId) {
		const task = this.idMap.get(taskId);
		return task ? this.reportedTasksMap.get(task) : void 0;
	}
	updateTasks(packs) {
		for (const [id, result, meta] of packs) {
			const task = this.idMap.get(id);
			if (task) {
				task.result = result;
				task.meta = meta;
				// skipped with new PendingError
				if (result?.state === "skip") task.mode = "skip";
			}
		}
	}
	updateUserLog(log) {
		const task = log.taskId && this.idMap.get(log.taskId);
		if (task) {
			if (!task.logs) task.logs = [];
			task.logs.push(log);
		}
	}
	getCountOfFailedTests() {
		return Array.from(this.idMap.values()).filter((t) => t.result?.state === "fail").length;
	}
	cancelFiles(files, project) {
		// if we don't filter existing modules, they will be overridden by `collectFiles`
		const nonRegisteredFiles = files.filter(({ filepath }) => {
			const relativePath = relative(project.config.root, filepath);
			const id = generateFileHash(relativePath, project.name);
			return !this.idMap.has(id);
		});
		this.collectFiles(project, nonRegisteredFiles.map((file) => createFileTask(file.filepath, project.config.root, project.config.name)));
	}
}

function populateProjectsTags(rootProject, projects) {
	// Include root project if not already in the list
	const allProjects = projects.includes(rootProject) ? projects : [rootProject, ...projects];
	// Collect all tags from all projects (first definition wins)
	const globalTags = /* @__PURE__ */ new Map();
	for (const project of allProjects) for (const tag of project.config.tags || []) if (!globalTags.has(tag.name)) globalTags.set(tag.name, tag);
	// Add missing tags to each project (without overriding local definitions)
	for (const project of allProjects) {
		const projectTagNames = new Set(project.config.tags.map((t) => t.name));
		for (const [tagName, tagDef] of globalTags) if (!projectTagNames.has(tagName)) project.config.tags.push(tagDef);
	}
}

var convertSourceMap$1 = {};

var hasRequiredConvertSourceMap;

function requireConvertSourceMap () {
	if (hasRequiredConvertSourceMap) return convertSourceMap$1;
	hasRequiredConvertSourceMap = 1;
	(function (exports) {

		Object.defineProperty(exports, 'commentRegex', {
		  get: function getCommentRegex () {
		    // Groups: 1: media type, 2: MIME type, 3: charset, 4: encoding, 5: data.
		    return /^\s*?\/[\/\*][@#]\s+?sourceMappingURL=data:(((?:application|text)\/json)(?:;charset=([^;,]+?)?)?)?(?:;(base64))?,(.*?)$/mg;
		  }
		});


		Object.defineProperty(exports, 'mapFileCommentRegex', {
		  get: function getMapFileCommentRegex () {
		    // Matches sourceMappingURL in either // or /* comment styles.
		    return /(?:\/\/[@#][ \t]+?sourceMappingURL=([^\s'"`]+?)[ \t]*?$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*?(?:\*\/){1}[ \t]*?$)/mg;
		  }
		});

		var decodeBase64;
		if (typeof Buffer !== 'undefined') {
		  if (typeof Buffer.from === 'function') {
		    decodeBase64 = decodeBase64WithBufferFrom;
		  } else {
		    decodeBase64 = decodeBase64WithNewBuffer;
		  }
		} else {
		  decodeBase64 = decodeBase64WithAtob;
		}

		function decodeBase64WithBufferFrom(base64) {
		  return Buffer.from(base64, 'base64').toString();
		}

		function decodeBase64WithNewBuffer(base64) {
		  if (typeof value === 'number') {
		    throw new TypeError('The value to decode must not be of type number.');
		  }
		  return new Buffer(base64, 'base64').toString();
		}

		function decodeBase64WithAtob(base64) {
		  return decodeURIComponent(escape(atob(base64)));
		}

		function stripComment(sm) {
		  return sm.split(',').pop();
		}

		function readFromFileMap(sm, read) {
		  var r = exports.mapFileCommentRegex.exec(sm);
		  // for some odd reason //# .. captures in 1 and /* .. */ in 2
		  var filename = r[1] || r[2];

		  try {
		    var sm = read(filename);
		    if (sm != null && typeof sm.catch === 'function') {
		      return sm.catch(throwError);
		    } else {
		      return sm;
		    }
		  } catch (e) {
		    throwError(e);
		  }

		  function throwError(e) {
		    throw new Error('An error occurred while trying to read the map file at ' + filename + '\n' + e.stack);
		  }
		}

		function Converter (sm, opts) {
		  opts = opts || {};

		  if (opts.hasComment) {
		    sm = stripComment(sm);
		  }

		  if (opts.encoding === 'base64') {
		    sm = decodeBase64(sm);
		  } else if (opts.encoding === 'uri') {
		    sm = decodeURIComponent(sm);
		  }

		  if (opts.isJSON || opts.encoding) {
		    sm = JSON.parse(sm);
		  }

		  this.sourcemap = sm;
		}

		Converter.prototype.toJSON = function (space) {
		  return JSON.stringify(this.sourcemap, null, space);
		};

		if (typeof Buffer !== 'undefined') {
		  if (typeof Buffer.from === 'function') {
		    Converter.prototype.toBase64 = encodeBase64WithBufferFrom;
		  } else {
		    Converter.prototype.toBase64 = encodeBase64WithNewBuffer;
		  }
		} else {
		  Converter.prototype.toBase64 = encodeBase64WithBtoa;
		}

		function encodeBase64WithBufferFrom() {
		  var json = this.toJSON();
		  return Buffer.from(json, 'utf8').toString('base64');
		}

		function encodeBase64WithNewBuffer() {
		  var json = this.toJSON();
		  if (typeof json === 'number') {
		    throw new TypeError('The json to encode must not be of type number.');
		  }
		  return new Buffer(json, 'utf8').toString('base64');
		}

		function encodeBase64WithBtoa() {
		  var json = this.toJSON();
		  return btoa(unescape(encodeURIComponent(json)));
		}

		Converter.prototype.toURI = function () {
		  var json = this.toJSON();
		  return encodeURIComponent(json);
		};

		Converter.prototype.toComment = function (options) {
		  var encoding, content, data;
		  if (options != null && options.encoding === 'uri') {
		    encoding = '';
		    content = this.toURI();
		  } else {
		    encoding = ';base64';
		    content = this.toBase64();
		  }
		  data = 'sourceMappingURL=data:application/json;charset=utf-8' + encoding + ',' + content;
		  return options != null && options.multiline ? '/*# ' + data + ' */' : '//# ' + data;
		};

		// returns copy instead of original
		Converter.prototype.toObject = function () {
		  return JSON.parse(this.toJSON());
		};

		Converter.prototype.addProperty = function (key, value) {
		  if (this.sourcemap.hasOwnProperty(key)) throw new Error('property "' + key + '" already exists on the sourcemap, use set property instead');
		  return this.setProperty(key, value);
		};

		Converter.prototype.setProperty = function (key, value) {
		  this.sourcemap[key] = value;
		  return this;
		};

		Converter.prototype.getProperty = function (key) {
		  return this.sourcemap[key];
		};

		exports.fromObject = function (obj) {
		  return new Converter(obj);
		};

		exports.fromJSON = function (json) {
		  return new Converter(json, { isJSON: true });
		};

		exports.fromURI = function (uri) {
		  return new Converter(uri, { encoding: 'uri' });
		};

		exports.fromBase64 = function (base64) {
		  return new Converter(base64, { encoding: 'base64' });
		};

		exports.fromComment = function (comment) {
		  var m, encoding;
		  comment = comment
		    .replace(/^\/\*/g, '//')
		    .replace(/\*\/$/g, '');
		  m = exports.commentRegex.exec(comment);
		  encoding = m && m[4] || 'uri';
		  return new Converter(comment, { encoding: encoding, hasComment: true });
		};

		function makeConverter(sm) {
		  return new Converter(sm, { isJSON: true });
		}

		exports.fromMapFileComment = function (comment, read) {
		  if (typeof read === 'string') {
		    throw new Error(
		      'String directory paths are no longer supported with `fromMapFileComment`\n' +
		      'Please review the Upgrading documentation at https://github.com/thlorenz/convert-source-map#upgrading'
		    )
		  }

		  var sm = readFromFileMap(comment, read);
		  if (sm != null && typeof sm.then === 'function') {
		    return sm.then(makeConverter);
		  } else {
		    return makeConverter(sm);
		  }
		};

		// Finds last sourcemap comment in file or returns null if none was found
		exports.fromSource = function (content) {
		  var m = content.match(exports.commentRegex);
		  return m ? exports.fromComment(m.pop()) : null;
		};

		// Finds last sourcemap comment in file or returns null if none was found
		exports.fromMapFileSource = function (content, read) {
		  if (typeof read === 'string') {
		    throw new Error(
		      'String directory paths are no longer supported with `fromMapFileSource`\n' +
		      'Please review the Upgrading documentation at https://github.com/thlorenz/convert-source-map#upgrading'
		    )
		  }
		  var m = content.match(exports.mapFileCommentRegex);
		  return m ? exports.fromMapFileComment(m.pop(), read) : null;
		};

		exports.removeComments = function (src) {
		  return src.replace(exports.commentRegex, '');
		};

		exports.removeMapFileComments = function (src) {
		  return src.replace(exports.mapFileCommentRegex, '');
		};

		exports.generateMapFileComment = function (file, options) {
		  var data = 'sourceMappingURL=' + file;
		  return options && options.multiline ? '/*# ' + data + ' */' : '//# ' + data;
		}; 
	} (convertSourceMap$1));
	return convertSourceMap$1;
}

var convertSourceMapExports = requireConvertSourceMap();
var convertSourceMap = /*@__PURE__*/getDefaultExportFromCjs(convertSourceMapExports);

// based on vite
// https://github.com/vitejs/vite/blob/84079a84ad94de4c1ef4f1bdb2ab448ff2c01196/packages/vite/src/node/server/sourcemap.ts#L149
function extractSourcemapFromFile(code, filePath) {
	try {
		const map = (convertSourceMap.fromSource(code) || convertSourceMap.fromMapFileSource(code, createConvertSourceMapReadMap(filePath)))?.toObject();
		return map ? { map } : void 0;
	} catch {
		return;
	}
}
function createConvertSourceMapReadMap(originalFileName) {
	return (filename) => {
		// convertSourceMap can detect invalid filename from comments.
		// fallback to empty source map to avoid errors.
		const targetPath = path.resolve(path.dirname(originalFileName), filename);
		if (existsSync(targetPath)) return readFileSync(targetPath, "utf-8");
		return "{}";
	};
}

const types = {
    'application/andrew-inset': ['ez'],
    'application/appinstaller': ['appinstaller'],
    'application/applixware': ['aw'],
    'application/appx': ['appx'],
    'application/appxbundle': ['appxbundle'],
    'application/atom+xml': ['atom'],
    'application/atomcat+xml': ['atomcat'],
    'application/atomdeleted+xml': ['atomdeleted'],
    'application/atomsvc+xml': ['atomsvc'],
    'application/atsc-dwd+xml': ['dwd'],
    'application/atsc-held+xml': ['held'],
    'application/atsc-rsat+xml': ['rsat'],
    'application/automationml-aml+xml': ['aml'],
    'application/automationml-amlx+zip': ['amlx'],
    'application/bdoc': ['bdoc'],
    'application/calendar+xml': ['xcs'],
    'application/ccxml+xml': ['ccxml'],
    'application/cdfx+xml': ['cdfx'],
    'application/cdmi-capability': ['cdmia'],
    'application/cdmi-container': ['cdmic'],
    'application/cdmi-domain': ['cdmid'],
    'application/cdmi-object': ['cdmio'],
    'application/cdmi-queue': ['cdmiq'],
    'application/cpl+xml': ['cpl'],
    'application/cu-seeme': ['cu'],
    'application/cwl': ['cwl'],
    'application/dash+xml': ['mpd'],
    'application/dash-patch+xml': ['mpp'],
    'application/davmount+xml': ['davmount'],
    'application/dicom': ['dcm'],
    'application/docbook+xml': ['dbk'],
    'application/dssc+der': ['dssc'],
    'application/dssc+xml': ['xdssc'],
    'application/ecmascript': ['ecma'],
    'application/emma+xml': ['emma'],
    'application/emotionml+xml': ['emotionml'],
    'application/epub+zip': ['epub'],
    'application/exi': ['exi'],
    'application/express': ['exp'],
    'application/fdf': ['fdf'],
    'application/fdt+xml': ['fdt'],
    'application/font-tdpfr': ['pfr'],
    'application/geo+json': ['geojson'],
    'application/gml+xml': ['gml'],
    'application/gpx+xml': ['gpx'],
    'application/gxf': ['gxf'],
    'application/gzip': ['gz'],
    'application/hjson': ['hjson'],
    'application/hyperstudio': ['stk'],
    'application/inkml+xml': ['ink', 'inkml'],
    'application/ipfix': ['ipfix'],
    'application/its+xml': ['its'],
    'application/java-archive': ['jar', 'war', 'ear'],
    'application/java-serialized-object': ['ser'],
    'application/java-vm': ['class'],
    'application/javascript': ['*js'],
    'application/json': ['json', 'map'],
    'application/json5': ['json5'],
    'application/jsonml+json': ['jsonml'],
    'application/ld+json': ['jsonld'],
    'application/lgr+xml': ['lgr'],
    'application/lost+xml': ['lostxml'],
    'application/mac-binhex40': ['hqx'],
    'application/mac-compactpro': ['cpt'],
    'application/mads+xml': ['mads'],
    'application/manifest+json': ['webmanifest'],
    'application/marc': ['mrc'],
    'application/marcxml+xml': ['mrcx'],
    'application/mathematica': ['ma', 'nb', 'mb'],
    'application/mathml+xml': ['mathml'],
    'application/mbox': ['mbox'],
    'application/media-policy-dataset+xml': ['mpf'],
    'application/mediaservercontrol+xml': ['mscml'],
    'application/metalink+xml': ['metalink'],
    'application/metalink4+xml': ['meta4'],
    'application/mets+xml': ['mets'],
    'application/mmt-aei+xml': ['maei'],
    'application/mmt-usd+xml': ['musd'],
    'application/mods+xml': ['mods'],
    'application/mp21': ['m21', 'mp21'],
    'application/mp4': ['*mp4', '*mpg4', 'mp4s', 'm4p'],
    'application/msix': ['msix'],
    'application/msixbundle': ['msixbundle'],
    'application/msword': ['doc', 'dot'],
    'application/mxf': ['mxf'],
    'application/n-quads': ['nq'],
    'application/n-triples': ['nt'],
    'application/node': ['cjs'],
    'application/octet-stream': [
        'bin',
        'dms',
        'lrf',
        'mar',
        'so',
        'dist',
        'distz',
        'pkg',
        'bpk',
        'dump',
        'elc',
        'deploy',
        'exe',
        'dll',
        'deb',
        'dmg',
        'iso',
        'img',
        'msi',
        'msp',
        'msm',
        'buffer',
    ],
    'application/oda': ['oda'],
    'application/oebps-package+xml': ['opf'],
    'application/ogg': ['ogx'],
    'application/omdoc+xml': ['omdoc'],
    'application/onenote': [
        'onetoc',
        'onetoc2',
        'onetmp',
        'onepkg',
        'one',
        'onea',
    ],
    'application/oxps': ['oxps'],
    'application/p2p-overlay+xml': ['relo'],
    'application/patch-ops-error+xml': ['xer'],
    'application/pdf': ['pdf'],
    'application/pgp-encrypted': ['pgp'],
    'application/pgp-keys': ['asc'],
    'application/pgp-signature': ['sig', '*asc'],
    'application/pics-rules': ['prf'],
    'application/pkcs10': ['p10'],
    'application/pkcs7-mime': ['p7m', 'p7c'],
    'application/pkcs7-signature': ['p7s'],
    'application/pkcs8': ['p8'],
    'application/pkix-attr-cert': ['ac'],
    'application/pkix-cert': ['cer'],
    'application/pkix-crl': ['crl'],
    'application/pkix-pkipath': ['pkipath'],
    'application/pkixcmp': ['pki'],
    'application/pls+xml': ['pls'],
    'application/postscript': ['ai', 'eps', 'ps'],
    'application/provenance+xml': ['provx'],
    'application/pskc+xml': ['pskcxml'],
    'application/raml+yaml': ['raml'],
    'application/rdf+xml': ['rdf', 'owl'],
    'application/reginfo+xml': ['rif'],
    'application/relax-ng-compact-syntax': ['rnc'],
    'application/resource-lists+xml': ['rl'],
    'application/resource-lists-diff+xml': ['rld'],
    'application/rls-services+xml': ['rs'],
    'application/route-apd+xml': ['rapd'],
    'application/route-s-tsid+xml': ['sls'],
    'application/route-usd+xml': ['rusd'],
    'application/rpki-ghostbusters': ['gbr'],
    'application/rpki-manifest': ['mft'],
    'application/rpki-roa': ['roa'],
    'application/rsd+xml': ['rsd'],
    'application/rss+xml': ['rss'],
    'application/rtf': ['rtf'],
    'application/sbml+xml': ['sbml'],
    'application/scvp-cv-request': ['scq'],
    'application/scvp-cv-response': ['scs'],
    'application/scvp-vp-request': ['spq'],
    'application/scvp-vp-response': ['spp'],
    'application/sdp': ['sdp'],
    'application/senml+xml': ['senmlx'],
    'application/sensml+xml': ['sensmlx'],
    'application/set-payment-initiation': ['setpay'],
    'application/set-registration-initiation': ['setreg'],
    'application/shf+xml': ['shf'],
    'application/sieve': ['siv', 'sieve'],
    'application/smil+xml': ['smi', 'smil'],
    'application/sparql-query': ['rq'],
    'application/sparql-results+xml': ['srx'],
    'application/sql': ['sql'],
    'application/srgs': ['gram'],
    'application/srgs+xml': ['grxml'],
    'application/sru+xml': ['sru'],
    'application/ssdl+xml': ['ssdl'],
    'application/ssml+xml': ['ssml'],
    'application/swid+xml': ['swidtag'],
    'application/tei+xml': ['tei', 'teicorpus'],
    'application/thraud+xml': ['tfi'],
    'application/timestamped-data': ['tsd'],
    'application/toml': ['toml'],
    'application/trig': ['trig'],
    'application/ttml+xml': ['ttml'],
    'application/ubjson': ['ubj'],
    'application/urc-ressheet+xml': ['rsheet'],
    'application/urc-targetdesc+xml': ['td'],
    'application/voicexml+xml': ['vxml'],
    'application/wasm': ['wasm'],
    'application/watcherinfo+xml': ['wif'],
    'application/widget': ['wgt'],
    'application/winhlp': ['hlp'],
    'application/wsdl+xml': ['wsdl'],
    'application/wspolicy+xml': ['wspolicy'],
    'application/xaml+xml': ['xaml'],
    'application/xcap-att+xml': ['xav'],
    'application/xcap-caps+xml': ['xca'],
    'application/xcap-diff+xml': ['xdf'],
    'application/xcap-el+xml': ['xel'],
    'application/xcap-ns+xml': ['xns'],
    'application/xenc+xml': ['xenc'],
    'application/xfdf': ['xfdf'],
    'application/xhtml+xml': ['xhtml', 'xht'],
    'application/xliff+xml': ['xlf'],
    'application/xml': ['xml', 'xsl', 'xsd', 'rng'],
    'application/xml-dtd': ['dtd'],
    'application/xop+xml': ['xop'],
    'application/xproc+xml': ['xpl'],
    'application/xslt+xml': ['*xsl', 'xslt'],
    'application/xspf+xml': ['xspf'],
    'application/xv+xml': ['mxml', 'xhvml', 'xvml', 'xvm'],
    'application/yang': ['yang'],
    'application/yin+xml': ['yin'],
    'application/zip': ['zip'],
    'application/zip+dotlottie': ['lottie'],
    'audio/3gpp': ['*3gpp'],
    'audio/aac': ['adts', 'aac'],
    'audio/adpcm': ['adp'],
    'audio/amr': ['amr'],
    'audio/basic': ['au', 'snd'],
    'audio/midi': ['mid', 'midi', 'kar', 'rmi'],
    'audio/mobile-xmf': ['mxmf'],
    'audio/mp3': ['*mp3'],
    'audio/mp4': ['m4a', 'mp4a', 'm4b'],
    'audio/mpeg': ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
    'audio/ogg': ['oga', 'ogg', 'spx', 'opus'],
    'audio/s3m': ['s3m'],
    'audio/silk': ['sil'],
    'audio/wav': ['wav'],
    'audio/wave': ['*wav'],
    'audio/webm': ['weba'],
    'audio/xm': ['xm'],
    'font/collection': ['ttc'],
    'font/otf': ['otf'],
    'font/ttf': ['ttf'],
    'font/woff': ['woff'],
    'font/woff2': ['woff2'],
    'image/aces': ['exr'],
    'image/apng': ['apng'],
    'image/avci': ['avci'],
    'image/avcs': ['avcs'],
    'image/avif': ['avif'],
    'image/bmp': ['bmp', 'dib'],
    'image/cgm': ['cgm'],
    'image/dicom-rle': ['drle'],
    'image/dpx': ['dpx'],
    'image/emf': ['emf'],
    'image/fits': ['fits'],
    'image/g3fax': ['g3'],
    'image/gif': ['gif'],
    'image/heic': ['heic'],
    'image/heic-sequence': ['heics'],
    'image/heif': ['heif'],
    'image/heif-sequence': ['heifs'],
    'image/hej2k': ['hej2'],
    'image/ief': ['ief'],
    'image/jaii': ['jaii'],
    'image/jais': ['jais'],
    'image/jls': ['jls'],
    'image/jp2': ['jp2', 'jpg2'],
    'image/jpeg': ['jpg', 'jpeg', 'jpe'],
    'image/jph': ['jph'],
    'image/jphc': ['jhc'],
    'image/jpm': ['jpm', 'jpgm'],
    'image/jpx': ['jpx', 'jpf'],
    'image/jxl': ['jxl'],
    'image/jxr': ['jxr'],
    'image/jxra': ['jxra'],
    'image/jxrs': ['jxrs'],
    'image/jxs': ['jxs'],
    'image/jxsc': ['jxsc'],
    'image/jxsi': ['jxsi'],
    'image/jxss': ['jxss'],
    'image/ktx': ['ktx'],
    'image/ktx2': ['ktx2'],
    'image/pjpeg': ['jfif'],
    'image/png': ['png'],
    'image/sgi': ['sgi'],
    'image/svg+xml': ['svg', 'svgz'],
    'image/t38': ['t38'],
    'image/tiff': ['tif', 'tiff'],
    'image/tiff-fx': ['tfx'],
    'image/webp': ['webp'],
    'image/wmf': ['wmf'],
    'message/disposition-notification': ['disposition-notification'],
    'message/global': ['u8msg'],
    'message/global-delivery-status': ['u8dsn'],
    'message/global-disposition-notification': ['u8mdn'],
    'message/global-headers': ['u8hdr'],
    'message/rfc822': ['eml', 'mime', 'mht', 'mhtml'],
    'model/3mf': ['3mf'],
    'model/gltf+json': ['gltf'],
    'model/gltf-binary': ['glb'],
    'model/iges': ['igs', 'iges'],
    'model/jt': ['jt'],
    'model/mesh': ['msh', 'mesh', 'silo'],
    'model/mtl': ['mtl'],
    'model/obj': ['obj'],
    'model/prc': ['prc'],
    'model/step': ['step', 'stp', 'stpnc', 'p21', '210'],
    'model/step+xml': ['stpx'],
    'model/step+zip': ['stpz'],
    'model/step-xml+zip': ['stpxz'],
    'model/stl': ['stl'],
    'model/u3d': ['u3d'],
    'model/vrml': ['wrl', 'vrml'],
    'model/x3d+binary': ['*x3db', 'x3dbz'],
    'model/x3d+fastinfoset': ['x3db'],
    'model/x3d+vrml': ['*x3dv', 'x3dvz'],
    'model/x3d+xml': ['x3d', 'x3dz'],
    'model/x3d-vrml': ['x3dv'],
    'text/cache-manifest': ['appcache', 'manifest'],
    'text/calendar': ['ics', 'ifb'],
    'text/coffeescript': ['coffee', 'litcoffee'],
    'text/css': ['css'],
    'text/csv': ['csv'],
    'text/html': ['html', 'htm', 'shtml'],
    'text/jade': ['jade'],
    'text/javascript': ['js', 'mjs'],
    'text/jsx': ['jsx'],
    'text/less': ['less'],
    'text/markdown': ['md', 'markdown'],
    'text/mathml': ['mml'],
    'text/mdx': ['mdx'],
    'text/n3': ['n3'],
    'text/plain': ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini'],
    'text/richtext': ['rtx'],
    'text/rtf': ['*rtf'],
    'text/sgml': ['sgml', 'sgm'],
    'text/shex': ['shex'],
    'text/slim': ['slim', 'slm'],
    'text/spdx': ['spdx'],
    'text/stylus': ['stylus', 'styl'],
    'text/tab-separated-values': ['tsv'],
    'text/troff': ['t', 'tr', 'roff', 'man', 'me', 'ms'],
    'text/turtle': ['ttl'],
    'text/uri-list': ['uri', 'uris', 'urls'],
    'text/vcard': ['vcard'],
    'text/vtt': ['vtt'],
    'text/wgsl': ['wgsl'],
    'text/xml': ['*xml'],
    'text/yaml': ['yaml', 'yml'],
    'video/3gpp': ['3gp', '3gpp'],
    'video/3gpp2': ['3g2'],
    'video/h261': ['h261'],
    'video/h263': ['h263'],
    'video/h264': ['h264'],
    'video/iso.segment': ['m4s'],
    'video/jpeg': ['jpgv'],
    'video/jpm': ['*jpm', '*jpgm'],
    'video/mj2': ['mj2', 'mjp2'],
    'video/mp2t': ['ts', 'm2t', 'm2ts', 'mts'],
    'video/mp4': ['mp4', 'mp4v', 'mpg4'],
    'video/mpeg': ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
    'video/ogg': ['ogv'],
    'video/quicktime': ['qt', 'mov'],
    'video/webm': ['webm'],
};
Object.freeze(types);

var __classPrivateFieldGet = ({} && {}.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mime_extensionToType, _Mime_typeToExtension, _Mime_typeToExtensions;
class Mime {
    constructor(...args) {
        _Mime_extensionToType.set(this, new Map());
        _Mime_typeToExtension.set(this, new Map());
        _Mime_typeToExtensions.set(this, new Map());
        for (const arg of args) {
            this.define(arg);
        }
    }
    define(typeMap, force = false) {
        for (let [type, extensions] of Object.entries(typeMap)) {
            type = type.toLowerCase();
            extensions = extensions.map((ext) => ext.toLowerCase());
            if (!__classPrivateFieldGet(this, _Mime_typeToExtensions, "f").has(type)) {
                __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").set(type, new Set());
            }
            const allExtensions = __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type);
            let first = true;
            for (let extension of extensions) {
                const starred = extension.startsWith('*');
                extension = starred ? extension.slice(1) : extension;
                allExtensions?.add(extension);
                if (first) {
                    __classPrivateFieldGet(this, _Mime_typeToExtension, "f").set(type, extension);
                }
                first = false;
                if (starred)
                    continue;
                const currentType = __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(extension);
                if (currentType && currentType != type && !force) {
                    throw new Error(`"${type} -> ${extension}" conflicts with "${currentType} -> ${extension}". Pass \`force=true\` to override this definition.`);
                }
                __classPrivateFieldGet(this, _Mime_extensionToType, "f").set(extension, type);
            }
        }
        return this;
    }
    getType(path) {
        if (typeof path !== 'string')
            return null;
        const last = path.replace(/^.*[/\\]/s, '').toLowerCase();
        const ext = last.replace(/^.*\./s, '').toLowerCase();
        const hasPath = last.length < path.length;
        const hasDot = ext.length < last.length - 1;
        if (!hasDot && hasPath)
            return null;
        return __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(ext) ?? null;
    }
    getExtension(type) {
        if (typeof type !== 'string')
            return null;
        type = type?.split?.(';')[0];
        return ((type && __classPrivateFieldGet(this, _Mime_typeToExtension, "f").get(type.trim().toLowerCase())) ?? null);
    }
    getAllExtensions(type) {
        if (typeof type !== 'string')
            return null;
        type = type.split(';')[0].trim().toLowerCase();
        return __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type) ?? null;
    }
    _freeze() {
        this.define = () => {
            throw new Error('define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances');
        };
        Object.freeze(this);
        for (const extensions of __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").values()) {
            Object.freeze(extensions);
        }
        return this;
    }
    _getTestState() {
        return {
            types: __classPrivateFieldGet(this, _Mime_extensionToType, "f"),
            extensions: __classPrivateFieldGet(this, _Mime_typeToExtension, "f"),
        };
    }
}
_Mime_extensionToType = new WeakMap(), _Mime_typeToExtension = new WeakMap(), _Mime_typeToExtensions = new WeakMap();

var mime = new Mime(types)._freeze();

class TestRun {
	vitest;
	constructor(vitest) {
		this.vitest = vitest;
	}
	async start(specifications) {
		const filepaths = specifications.map((spec) => spec.moduleId);
		this.vitest.state.collectPaths(filepaths);
		await this.vitest.report("onTestRunStart", [...specifications]);
	}
	async enqueued(project, file) {
		this.vitest.state.collectFiles(project, [file]);
		const testModule = this.vitest.state.getReportedEntity(file);
		await this.vitest.report("onTestModuleQueued", testModule);
	}
	async collected(project, files) {
		this.vitest.state.collectFiles(project, files);
		await Promise.all(files.map((file) => {
			const testModule = this.vitest.state.getReportedEntity(file);
			return this.vitest.report("onTestModuleCollected", testModule);
		}));
	}
	async log(log) {
		this.vitest.state.updateUserLog(log);
		await this.vitest.report("onUserConsoleLog", log);
	}
	async recordBenchmark(testId, benchmark) {
		const testCase = this.getTestCaseById(testId, "Benchmark");
		testCase.task.benchmarks.push(benchmark);
		await this.vitest.report("onTestCaseBenchmark", testCase, benchmark);
	}
	async recordArtifact(testId, artifact) {
		const testCase = this.getTestCaseById(testId, "Artifact");
		// annotations won't resolve as artifacts for backwards compatibility until next major
		if (artifact.type === "internal:annotation") {
			await this.resolveTestAttachment(testCase, artifact.annotation.attachment, artifact.annotation.message);
			testCase.task.annotations.push(artifact.annotation);
			await this.vitest.report("onTestCaseAnnotate", testCase, artifact.annotation);
			return artifact;
		}
		if (Array.isArray(artifact.attachments)) await Promise.all(artifact.attachments.map((attachment) => this.resolveTestAttachment(testCase, attachment)));
		// TODO: resolve browser trace locations here too, using `project.browser.parseStacktrace`
		// like `syncUpdateStacks`, and drop the mapping in `__vitest_recordBrowserTrace`
		if (artifact.type === "internal:browserTrace" && testCase.task.file.pool !== "browser") {
			const { entries } = artifact.data;
			for (const entry of entries) if (entry.stack && !entry.location) {
				const [stack] = parseStacktrace(entry.stack, {
					firstOnly: true,
					getSourceMap: (file) => getExternalSourceMap(testCase.project, file)
				});
				if (stack) entry.location = {
					file: stack.file,
					line: stack.line,
					column: stack.column
				};
			}
		}
		testCase.task.artifacts.push(artifact);
		await this.vitest.report("onTestCaseArtifactRecord", testCase, artifact);
		return artifact;
	}
	async updated(update, events) {
		this.syncUpdateStacks(update);
		this.vitest.state.updateTasks(update);
		for (const [id, event, data] of events) await this.reportEvent(id, event, data).catch((error) => {
			this.vitest.state.catchError(serializeValue(error), "Unhandled Reporter Error");
		});
		// TODO: what is the order or reports here?
		// "onTaskUpdate" in parallel with others or before all or after all?
		// TODO: error handling - what happens if custom reporter throws an error?
		await this.vitest.report("onTaskUpdate", update, events);
	}
	getTestCaseById(testId, recordType) {
		const task = this.vitest.state.idMap.get(testId);
		const entity = task && this.vitest.state.getReportedEntity(task);
		assert(task && entity, `Entity must be found for task ${task?.name || testId}`);
		assert(entity.type === "test", `${recordType} can only be recorded on a test, instead got ${entity.type}`);
		return entity;
	}
	async end(specifications, errors, coverage) {
		if (coverage) await this.vitest.report("onCoverage", coverage);
		// specification won't have the File task if they were filtered by the --shard command
		const modules = specifications.map((spec) => spec.testModule).filter((s) => s != null);
		const state = this.vitest.isCancelling ? "interrupted" : // by this point, the run will be marked as failed if there are any errors,
		// should it be done by testRun.end?
		this.hasFailed(modules) ? "failed" : "passed";
		if (state !== "passed") process.exitCode = 1;
		await this.vitest.report("onTestRunEnd", modules, [...errors], state);
		for (const project in this.vitest.state.metadata) {
			const meta = this.vitest.state.metadata[project];
			if (!meta?.dumpDir) continue;
			const path = resolve(meta.dumpDir, "vitest-metadata.json");
			meta.outline = {
				externalized: Object.keys(meta.externalized).length,
				inlined: Object.keys(meta.tmps).length
			};
			await writeFile(path, JSON.stringify(meta, null, 2), "utf-8");
			this.vitest.logger.log(`Metadata written to ${path}`);
		}
	}
	hasFailed(modules) {
		if (!modules.length) return !this.vitest.config.passWithNoTests;
		return modules.some((m) => !m.ok() || m.state() === "pending");
	}
	// make sure the error always has a "stacks" property
	syncUpdateStacks(update) {
		update.forEach(([taskId, result]) => {
			const task = this.vitest.state.idMap.get(taskId);
			const isBrowser = task && task.file.pool === "browser";
			result?.errors?.forEach((error) => {
				if (isPrimitive(error)) return;
				const project = this.vitest.getProjectByName(task.file.projectName || "");
				if (isBrowser) error.stacks = project.browser?.parseErrorStacktrace(error, { frameFilter: project.config.onStackTrace }) || [];
				else error.stacks = parseErrorStacktrace(error, {
					frameFilter: project.config.onStackTrace,
					getSourceMap: (file) => getExternalSourceMap(project, file)
				});
			});
		});
	}
	async reportEvent(id, event, data) {
		const task = this.vitest.state.idMap.get(id);
		const entity = task && this.vitest.state.getReportedEntity(task);
		assert(task && entity, `Entity must be found for task ${task?.name || id}`);
		if (event === "suite-failed-early" && entity.type === "module") {
			// the file failed during import
			await this.vitest.report("onTestModuleStart", entity);
			await this.vitest.report("onTestModuleEnd", entity);
			return;
		}
		if (event === "suite-prepare" && entity.type === "suite") return await this.vitest.report("onTestSuiteReady", entity);
		if (event === "suite-prepare" && entity.type === "module") return await this.vitest.report("onTestModuleStart", entity);
		if (event === "suite-finished") {
			assert(entity.type === "suite" || entity.type === "module", "Entity type must be suite or module");
			if (entity.state() === "skipped")
 // everything inside suite or a module is skipped,
			// so we won't get any children events
			// we need to report everything manually
			await this.reportChildren(entity.children);
			if (entity.type === "module") await this.vitest.report("onTestModuleEnd", entity);
			else await this.vitest.report("onTestSuiteResult", entity);
			return;
		}
		if (event === "test-cancel" && entity.type === "test")
 // This is used to just update state of the task
		return;
		if (event === "test-prepare" && entity.type === "test") return await this.vitest.report("onTestCaseReady", entity);
		if (event === "test-finished" && entity.type === "test") return await this.vitest.report("onTestCaseResult", entity);
		if (event.startsWith("before-hook") || event.startsWith("after-hook")) {
			const isBefore = event.startsWith("before-hook");
			const hook = entity.type === "test" ? {
				name: isBefore ? "beforeEach" : "afterEach",
				entity
			} : {
				name: isBefore ? "beforeAll" : "afterAll",
				entity
			};
			if (event.endsWith("-start")) await this.vitest.report("onHookStart", hook);
			else await this.vitest.report("onHookEnd", hook);
			// this can only happen in --merge-reports, and annotation is already resolved
			if (event === "test-annotation") {
				const annotation = data?.annotation;
				assert(annotation && entity.type === "test");
				await this.vitest.report("onTestCaseAnnotate", entity, annotation);
			}
		}
	}
	async resolveTestAttachment(test, attachment, filename) {
		const project = test.project;
		if (!attachment) return attachment;
		const path = attachment.path;
		if (path && !path.startsWith("http://") && !path.startsWith("https://")) {
			const currentPath = resolve(project.config.root, path);
			const hash = createHash("sha1").update(currentPath).digest("hex");
			const newPath = resolve(project.config.attachmentsDir, `${filename ? `${sanitizeFilePath(filename)}-` : ""}${hash}${extname(currentPath)}`);
			if (!existsSync(project.config.attachmentsDir)) await mkdir(project.config.attachmentsDir, { recursive: true });
			await copyFile(currentPath, newPath);
			attachment.path = newPath;
			attachment.contentType = (attachment.contentType ?? mime.getType(basename(currentPath))) || void 0;
		}
		return attachment;
	}
	async reportChildren(children) {
		for (const child of children) if (child.type === "test") {
			await this.vitest.report("onTestCaseReady", child);
			await this.vitest.report("onTestCaseResult", child);
		} else {
			await this.vitest.report("onTestSuiteReady", child);
			await this.reportChildren(child.children);
			await this.vitest.report("onTestSuiteResult", child);
		}
	}
}
function getExternalSourceMap(project, file) {
	if (!project.vite.moduleGraph.getModuleById(file)?.transformResult && existsSync(file)) {
		const code = readFileSync(file, "utf-8");
		return extractSourcemapFromFile(code, file)?.map;
	}
}

class GitVCSProvider {
	root;
	async resolveFilesWithGitCommand(args) {
		let result;
		try {
			result = await x("git", args, {
				nodeOptions: { cwd: this.root },
				throwOnError: true
			});
		} catch (error) {
			if (error instanceof NonZeroExitError) throw new GitCommandError(args, error.output?.stderr.trim() || error.message);
			throw error;
		}
		return result.stdout.split("\0").filter((s) => s !== "").map((changedPath) => resolve(this.root, changedPath));
	}
	async findChangedFiles(options) {
		const root = this.root || await this.getRoot(options.root);
		if (!root) throw new GitNotFoundError();
		this.root = root;
		const changedSince = options.changedSince;
		if (typeof changedSince === "string") {
			const [committed, staged, unstaged] = await Promise.all([
				this.getFilesSince(changedSince),
				this.getStagedFiles(),
				this.getUnstagedFiles()
			]);
			return [
				...committed,
				...staged,
				...unstaged
			];
		}
		const [staged, unstaged] = await Promise.all([this.getStagedFiles(), this.getUnstagedFiles()]);
		return [...staged, ...unstaged];
	}
	getFilesSince(hash) {
		return this.resolveFilesWithGitCommand([
			"diff",
			"--name-only",
			"-z",
			`${hash}...HEAD`
		]);
	}
	getStagedFiles() {
		return this.resolveFilesWithGitCommand([
			"diff",
			"--cached",
			"--name-only",
			"-z"
		]);
	}
	getUnstagedFiles() {
		return this.resolveFilesWithGitCommand([
			"ls-files",
			"-z",
			"--other",
			"--modified",
			"--exclude-standard"
		]);
	}
	async getRoot(cwd) {
		const args = ["rev-parse", "--show-cdup"];
		try {
			const result = await x("git", args, {
				nodeOptions: { cwd },
				throwOnError: true
			});
			return resolve(cwd, result.stdout.trim());
		} catch {
			return null;
		}
	}
}

async function loadVCSProvider(runner, vcsProvider) {
	if (typeof vcsProvider === "object" && vcsProvider != null) return wrapVCSProvider(vcsProvider);
	if (!vcsProvider || vcsProvider === "git") return new GitVCSProvider();
	if (vcsProvider === "mtime") return new MtimeVCSProvider();
	const module = await runner.import(vcsProvider);
	if (!module.default || typeof module.default !== "object" || typeof module.default.findChangedFiles !== "function") throw new Error(`The vcsProvider module '${vcsProvider}' doesn't have a default export with \`findChangedFiles\` method.`);
	return wrapVCSProvider(module.default);
}
function wrapVCSProvider(provider) {
	return { async findChangedFiles(options) {
		return (await provider.findChangedFiles(options)).map((file) => resolve(options.root, file));
	} };
}

class VitestWatcher {
	vitest;
	/**
	* Modules that will be invalidated on the next run.
	*/
	invalidates = /* @__PURE__ */ new Set();
	/**
	* Test files that have changed and need to be rerun.
	*/
	changedTests = /* @__PURE__ */ new Set();
	_onRerun = [];
	trackers = /* @__PURE__ */ new Map();
	constructor(vitest) {
		this.vitest = vitest;
	}
	/**
	* Register a handler that will be called when test files need to be rerun.
	* The callback can receive several files in case the changed file is imported by several test files.
	* Several invocations of this method will add multiple handlers.
	* @internal
	*/
	onWatcherRerun(cb) {
		this._onRerun.push(cb);
		return this;
	}
	close() {
		this.vitest.vite.watcher.close();
	}
	unregisterWatcher = noop;
	registerWatcher() {
		const watcher = this.vitest.vite.watcher;
		if (this.vitest.config.forceRerunTriggers.length) watcher.add(this.vitest.config.forceRerunTriggers);
		const projectFiles = this.vitest.projects.flatMap(getProjectWatchedFiles);
		if (projectFiles.length) watcher.add(projectFiles);
		watcher.on("change", this.onFileChange);
		watcher.on("unlink", this.onFileDelete);
		watcher.on("add", this.onFileCreate);
		this.unregisterWatcher = () => {
			watcher.off("change", this.onFileChange);
			watcher.off("unlink", this.onFileDelete);
			watcher.off("add", this.onFileCreate);
			this.unregisterWatcher = noop;
		};
		return this;
	}
	scheduleRerun(file) {
		this._onRerun.forEach((cb) => cb(file));
	}
	getTestFilesFromWatcherTrigger(id) {
		if (!this.vitest.config.watchTriggerPatterns) return false;
		let triggered = false;
		this.vitest.config.watchTriggerPatterns.forEach((definition) => {
			const exec = definition.pattern.exec(id);
			if (exec) {
				const files = definition.testsToRun(id, exec);
				if (Array.isArray(files)) {
					triggered = true;
					files.forEach((file) => this.changedTests.add(resolve(this.vitest.config.root, file)));
				} else if (typeof files === "string") {
					triggered = true;
					this.changedTests.add(resolve(this.vitest.config.root, files));
				}
			}
		});
		return triggered;
	}
	onFileChange = (id) => {
		id = slash(id);
		this.vitest.logger.clearHighlightCache(id);
		this.vitest.invalidateFile(id);
		if (this.getTestFilesFromWatcherTrigger(id)) this.scheduleRerun(id);
		else if (this.handleFileChanged(id)) this.scheduleRerun(id);
	};
	onFileDelete = (id) => {
		id = slash(id);
		this.vitest.logger.clearHighlightCache(id);
		this.invalidates.add(id);
		if (this.vitest.state.filesMap.has(id)) {
			this.vitest.projects.forEach((project) => project._removeCachedTestFile(id));
			this.vitest.state.filesMap.delete(id);
			this.changedTests.delete(id);
			this.vitest.report("onTestRemoved", id);
		}
	};
	onFileCreate = (id) => {
		id = slash(id);
		this.vitest.invalidateFile(id);
		if (this.getTestFilesFromWatcherTrigger(id)) {
			this.scheduleRerun(id);
			return;
		}
		let fileContent;
		const matchingProjects = [];
		this.vitest.projects.forEach((project) => {
			if (project.matchesTestGlob(id, () => fileContent ??= readFileSync(id, "utf-8"))) matchingProjects.push(project);
		});
		if (matchingProjects.length > 0) {
			this.changedTests.add(id);
			this.scheduleRerun(id);
		} else if (this.handleFileChanged(id)) this.scheduleRerun(id);
	};
	handleProjectFile(filepath) {
		let isProjectFile = false;
		this.vitest.projects.forEach((project) => {
			if (!getProjectWatchedFiles(project).includes(filepath)) return;
			this.vitest.state.filesMap.forEach((files) => {
				files.forEach((file) => {
					if (file.projectName === project.name) {
						isProjectFile = true;
						this.changedTests.add(file.filepath);
					}
				});
			});
		});
		return isProjectFile;
	}
	/**
	* @returns A value indicating whether rerun is needed (changedTests was mutated)
	*/
	handleFileChanged(filepath) {
		if (this.changedTests.has(filepath) || this.invalidates.has(filepath)) return false;
		if (pm.isMatch(filepath, this.vitest.config.forceRerunTriggers, { dot: true })) {
			this.vitest.state.getFilepaths().forEach((file) => this.changedTests.add(file));
			return true;
		}
		if (this.handleProjectFile(filepath)) return true;
		const projects = this.vitest.projects.filter((project) => {
			return project._getViteEnvironments().some(({ moduleGraph }) => {
				return moduleGraph.getModulesByFile(filepath)?.size;
			});
		});
		if (!projects.length) {
			// if there are no modules it's possible that server was restarted
			// we don't have information about importers anymore, so let's check if the file is a test file at least
			if (this.vitest.state.filesMap.has(filepath) || this.vitest.projects.some((project) => project._isCachedTestFile(filepath))) {
				this.changedTests.add(filepath);
				return true;
			}
			return false;
		}
		const files = [];
		for (const project of projects) {
			const environmentMods = project._getViteEnvironments().map(({ moduleGraph }) => moduleGraph.getModulesByFile(filepath));
			if (!environmentMods.length) continue;
			this.invalidates.add(filepath);
			// one of test files that we already run, or one of test files that we can run
			if (this.vitest.state.filesMap.has(filepath) || project._isCachedTestFile(filepath)) {
				this.changedTests.add(filepath);
				files.push(filepath);
				continue;
			}
			let rerun = false;
			for (const mods of environmentMods) for (const mod of mods || []) mod.importers.forEach((i) => {
				if (!i.file) return;
				if (this.handleFileChanged(i.file)) rerun = true;
			});
			if (rerun) files.push(filepath);
		}
		return !!files.length;
	}
	createTracker() {
		const watcher = this.vitest.vite.watcher;
		watcher.on("all", this.handleTrackEvent);
		const stop = () => {
			watcher.off("all", this.handleTrackEvent);
			this.trackers.clear();
		};
		return {
			track: this.track,
			// @todo: implement [Symbol.dispose] when dropping support for Node 22
			stop
		};
	}
	track = (filepath, { timeout, type = "any" } = {}) => {
		const eventTrackers = this.trackers.get(type) ?? /* @__PURE__ */ new Map();
		if (eventTrackers.size === 0) this.trackers.set(type, eventTrackers);
		const normalizedFilepath = normalize(filepath);
		const fileTrackers = eventTrackers.get(normalizedFilepath) ?? /* @__PURE__ */ new Set();
		if (fileTrackers.size === 0) eventTrackers.set(normalizedFilepath, fileTrackers);
		const resolvers = Promise.withResolvers();
		if (timeout) {
			const timeoutId = setTimeout(resolvers.reject, timeout);
			resolvers.promise = resolvers.promise.then(() => {
				clearTimeout(timeoutId);
			}).catch(() => {});
		}
		resolvers.promise = resolvers.promise.finally(() => {
			fileTrackers.delete(resolvers);
		});
		fileTrackers.add(resolvers);
		return resolvers.promise;
	};
	handleTrackEvent = (eventName, path) => {
		this.resolveTrackEvent("any", path);
		this.resolveTrackEvent(eventName, path);
	};
	resolveTrackEvent(eventName, path) {
		const fileTrackers = this.trackers.get(eventName)?.get(path);
		if (fileTrackers === void 0) return;
		for (const resolvers of fileTrackers) resolvers.resolve();
	}
}
// files loaded outside of the test module graph that affect every test in the project
function getProjectWatchedFiles(project) {
	const { setupFiles, snapshotSerializers, diff } = project.config;
	const files = [...setupFiles, ...snapshotSerializers];
	if (typeof diff === "string") files.push(diff);
	return files;
}

const WATCHER_DEBOUNCE = 100;
class Vitest {
	/**
	* Current Vitest version.
	* @example '2.0.0'
	*/
	version = version;
	static version = version;
	/**
	* The logger instance used to log messages. It's recommended to use this logger instead of `console`.
	* It's possible to override stdout and stderr streams when initiating Vitest.
	* @example
	* new Vitest({
	*   stdout: new Writable(),
	* })
	*/
	logger;
	/**
	* The package installer instance used to install Vitest packages.
	* @example
	* await vitest.packageInstaller.ensureInstalled('@vitest/browser', process.cwd())
	*/
	packageInstaller;
	/**
	* A path to the built Vitest directory. This is usually a folder in `node_modules`.
	*/
	distPath = distDir;
	/**
	* A list of projects that are currently running.
	* If projects were filtered with `--project` flag, they won't appear here.
	*/
	projects = [];
	/**
	* A watcher handler. This is not the file system watcher. The handler only
	* exposes methods to handle changed files.
	*
	* If you have your own watcher, you can use these methods to replicate
	* Vitest behaviour.
	*/
	watcher;
	/**
	* The version control system provider used to detect changed files.
	* This is used with the `--changed` flag to determine which test files to run.
	* By default, Vitest uses Git. You can provide a custom implementation via
	* `experimental.vcsProvider` in your config.
	*/
	vcs;
	// these values are set after the config is resolved,
	// but Vitest instance is not accessible anywhere before that
	/**
	* The global config.
	*/
	config;
	/**
	* Resolved global vite config.
	*/
	viteConfig;
	/**
	* Global Vite's dev server instance.
	*/
	vite;
	/**
	* The global test state manager.
	* @experimental The State API is experimental and not subject to semver.
	*/
	state;
	/**
	* The global snapshot manager. You can access the current state on `snapshot.summary`.
	*/
	snapshot;
	/**
	* The cache of the previous test runs. Primarily used by the sequencer to sort tests.
	*/
	cache;
	/** @internal */ configOverride = {};
	/** @internal */ filenamePattern;
	/** @internal */ _sourceFilterResult;
	/** @internal */ _failedFilterResult;
	/** @internal */ runningPromise;
	/** @internal */ closingPromise;
	/** @internal */ cancelPromise;
	/** @internal */ isCancelling = false;
	/** @internal */ coreWorkspaceProject;
	/**
	* When the root config is itself browser-enabled (no `projects`), the root
	* Vite server is the single browser server and this is its parent browser
	* project (assigned to `coreWorkspaceProject._parentBrowser`).
	* @internal
	*/
	_rootBrowserParent;
	/** @internal */ _browserSessions = new BrowserSessions();
	/** @internal */ reporters = [];
	/** @internal */ runner;
	/** @internal */ _testRun;
	/** @internal */ _resolver;
	/** @internal */ _transformService;
	/** @internal */ _tmpDir = join(tmpdir(), nanoid());
	/** @internal */ _traces;
	/** @internal */ _harness;
	/** @internal */ _exitTimeout;
	_warnedExperimentalCacheKeyGenerator = false;
	isFirstRun = true;
	restartsCount = 0;
	specifications;
	pool;
	_coverageProvider;
	/**
	* @deprecated Do not rely on this property, it's always `test`. Scheduled to be removed in the next major.
	*/
	mode = "test";
	constructor(harness, viteConfig) {
		this._harness = harness;
		this.viteConfig = viteConfig;
		this.config = viteConfig.test;
		this.logger = harness.logger.setVitest(this);
		this.packageInstaller = harness.packageInstaller;
		this.specifications = new VitestSpecifications(this);
		this.watcher = new VitestWatcher(this).onWatcherRerun((file) => this.scheduleRerun(file));
		harness.setVitest(this);
		this._testRun = new TestRun(this);
	}
	_onRestartListeners = [];
	_onClose = [];
	_onSetServer = [];
	_onCancelListeners = /* @__PURE__ */ new Set();
	_onUserTestsRerun = [];
	_onFilterWatchedSpecification = [];
	/**
	* @internal
	*/
	async _start(config) {
		this._setRootConfig(config);
		await this._attachRootServer();
		await this._attachProjectServers();
	}
	/**
	* @internal
	*/
	_setRootConfig(config) {
		this.watcher.unregisterWatcher();
		clearTimeout(this._rerunTimer);
		this.restartsCount += 1;
		this.pool?.close?.();
		this.pool = void 0;
		this.closingPromise = void 0;
		this.projects = [];
		this.runningPromise = void 0;
		this.coreWorkspaceProject = void 0;
		this._rootBrowserParent = void 0;
		this.specifications.clearCache();
		this._coverageProvider = void 0;
		this._onUserTestsRerun = [];
		this.viteConfig = config;
		this.config = config.test;
		const resolved = config.test;
		this.state = new StateManager({ onUnhandledError: resolved.onUnhandledError });
		this.cache = new VitestCache(this);
		const otelSdkPath = this.config.experimental.openTelemetry?.sdkPath;
		this._traces = new Traces({
			enabled: !!this.config.experimental.openTelemetry?.enabled,
			sdkPath: otelSdkPath,
			watchMode: this.config.watch
		});
		this.snapshot = new SnapshotManager({ ...resolved.snapshotOptions });
		this._resolver = new VitestResolver(this.viteConfig.cacheDir, resolved);
		// a closed run removes the temp dir, so a restart must allocate a new one
		const tmpDir = this._tmpDir ??= join(tmpdir(), nanoid());
		this._transformService = new ModuleTransformService(this._resolver, resolved, this.cache._modules, this._traces, tmpDir);
	}
	_restartPromise;
	_restartQueued = false;
	// Restarts must not overlap: chokidar regularly delivers several change
	// events for one edit, and a restart that starts while another is still
	// re-creating the servers reports `onServerRestart` to reporters that were
	// re-instantiated but not yet initialized.
	_restart(reason) {
		if (this._restartPromise) {
			this._restartQueued = true;
			return this._restartPromise;
		}
		this._restartPromise = (async () => {
			do {
				this._restartQueued = false;
				await this._restartNow(reason);
			} while (this._restartQueued);
		})().finally(() => {
			this._restartPromise = void 0;
		});
		return this._restartPromise;
	}
	async _restartNow(reason) {
		await Promise.all(this._onRestartListeners.map((fn) => fn(reason)));
		this.report("onServerRestart", reason);
		await this.close();
		// reuse the same browser ports as the previous run instead of letting the
		// reused harness keep incrementing them
		this._harness._browserLastPort = defaultBrowserPort;
		this._harness._prewarmedBrowsers = 0;
		// harness mimics `vitest` access like in `node/create.ts`
		this._harness.setVitest(void 0);
		const config = await resolveConfig$1(this.config.cliOptions, this.config.viteOverrides, this._harness, this.config._cliFilters);
		this._harness.setVitest(this);
		await this._start(config);
	}
	/**
	* @internal
	*/
	async _attachRootServer() {
		const resolved = this.config;
		const children = resolved.resolvedProjects.filter((entry) => entry.viteConfig === this.viteConfig);
		// For a root-level browser config (no `projects`) this builds the single
		// browser server; otherwise it just creates the Vite server.
		const { server, parent } = await createClusterServer(this, this.viteConfig, resolved, children);
		this.vite = server;
		this._rootBrowserParent = parent;
		const environment = server.environments.__vitest__;
		this.runner = resolved.experimental.viteModuleRunner === false ? new NativeModuleRunner(resolved.root) : new ServerModuleRunner(environment, this._transformService, resolved);
		this.vcs = await loadVCSProvider(this.runner, resolved.experimental.vcsProvider);
		if (resolved.watch) {
			this.watcher.registerWatcher();
			// hijack server restart — re-run the full pipeline rather than letting
			// Vite recreate the server in isolation, so Vitest's own resolution
			// re-runs too.
			server.restart = async () => {
				await this._restart();
			};
			// container configs have no Vite server (and might be outside the root),
			// so their files are watched explicitly
			if (resolved._containerConfigFiles?.length) server.watcher.add(resolved._containerConfigFiles);
			// since we set `server.hmr: false`, Vite does not auto restart itself
			server.watcher.on("change", async (file) => {
				file = normalize$1(file);
				if (file === server.config.configFile || this.projects.some((p) => p.vite.config.configFile === file) || this.config._containerConfigFiles?.includes(file))
 // a floating rejection in an event handler would crash the process
				await this._restart("config").catch((error) => {
					this.logger.printError(error, {
						fullStack: true,
						type: "Restart Error"
					});
				});
			});
		}
		// In run mode we don't need the watcher; closing it improves performance (#415).
		if (!resolved.watch) await server.watcher.close();
	}
	/** @internal */
	async _attachProjectServers() {
		const resolved = this.config;
		const entries = resolved.resolvedProjects || [];
		this.projects = await attachProjectsFromEntries(this, entries);
		// `--benchmark` (CLI `benchmarkOnly`) narrows `vitest.projects` to only
		// the benchmark variants produced by the benchmark expansion step.
		if (resolved.cliOptions.benchmarkOnly) this.projects = this.projects.filter((p) => p.config.benchmark.enabled);
		await Promise.all(this.projects.flatMap((project) => {
			return project.vite.config.getSortedPluginHooks("configureVitest").map((hook) => hook({
				project,
				vitest: this,
				injectTestProjects: this.injectTestProject,
				defineCacheKeyGenerator: (callback) => this.cache._modules.defineCacheKeyGenerator(project.config, callback),
				/**
				* @deprecated Use `defineCacheKeyGenerator` instead.
				*/
				experimental_defineCacheKeyGenerator: (callback) => {
					if (!this._warnedExperimentalCacheKeyGenerator) {
						this._warnedExperimentalCacheKeyGenerator = true;
						this.logger.deprecate("`experimental_defineCacheKeyGenerator` is deprecated. Use `defineCacheKeyGenerator` instead.");
					}
					this.cache._modules.defineCacheKeyGenerator(project.config, callback);
				}
			}));
		}));
		if (resolved.cliOptions.browser?.enabled) {
			if (!this.projects.filter((p) => p.config.browser.enabled).length) throw new Error(`Vitest received --browser flag, but no project had a browser configuration.`);
		}
		if (!this.projects.length) {
			const filter = toArray(resolved.project).join("\", \"");
			if (filter) throw new Error(`No projects matched the filter "${filter}".`);
			else {
				let error = `Vitest wasn't able to resolve any project.`;
				if (resolved.browser.enabled && !resolved.browser.instances?.length) error += ` Please, check that you specified the "browser.instances" option.`;
				throw new Error(error);
			}
		}
		if (!this.coreWorkspaceProject) this.coreWorkspaceProject = TestProject._createBasicProject(this);
		if (resolved.testNamePattern) this.configOverride.testNamePattern = resolved.testNamePattern;
		// populate will merge all configs into every project,
		// we don't want that when just listing tags
		if (!resolved.listTags) populateProjectsTags(this.coreWorkspaceProject, this.projects);
		this.reporters = await createReporters(resolved.reporters, this);
		// API setup (watch mode only). Must run after the reporters array is built
		// above, since `setup()` appends the UI/API WebSocket reporter to it. For a
		// root-level browser server the API lives on the same shared httpServer and
		// is only needed when a UI (Vitest dashboard or browser orchestrator) is served.
		const apiNeeded = !this._rootBrowserParent || resolved.ui || resolved.browser.ui;
		const rootApi = resolved.api && resolved.watch && apiNeeded;
		if (rootApi) setup(this);
		const attachedApiServers = /* @__PURE__ */ new Set([rootApi ? this.vite.httpServer : null]);
		for (const project of this.projects) {
			const browserServer = project.vite;
			if (project.config.browser.ui && browserServer?.httpServer && !attachedApiServers.has(browserServer.httpServer)) {
				attachedApiServers.add(browserServer.httpServer);
				setup(this, browserServer);
			}
		}
		await this.cache._load();
		await Promise.all([...this._onSetServer.map((fn) => fn()), this._traces.waitInit()]);
	}
	/** @internal */
	get coverageProvider() {
		if (this.configOverride.coverage?.enabled === false) return null;
		return this._coverageProvider;
	}
	async listTags() {
		const listTags = this.config.listTags;
		if (typeof listTags === "boolean") this.logger.printTags();
		else if (listTags === "json") {
			if (![this.getRootProject(), ...this.projects].some((p) => p.config.tags && p.config.tags.length > 0)) {
				process.exitCode = 1;
				this.logger.printNoTestTagsFound();
			} else {
				const manifest = {
					tags: this.config.tags,
					projects: this.projects.filter((p) => p !== this.coreWorkspaceProject).map((p) => ({
						name: p.name,
						tags: p.config.tags
					}))
				};
				this.logger.log(JSON.stringify(manifest, null, 2));
			}
		} else throw new Error(`Unknown value for "test.listTags": ${listTags}`);
	}
	async enableCoverage() {
		this.configOverride.coverage = {};
		this.configOverride.coverage.enabled = true;
		await this.createCoverageProvider();
		await this.coverageProvider?.onEnabled?.();
		// onFileTransform is the only thing that affects hash
		if (this.coverageProvider?.onFileTransform) this.clearAllCachePaths();
	}
	disableCoverage() {
		this.configOverride.coverage ??= {};
		this.configOverride.coverage.enabled = false;
		// onFileTransform is the only thing that affects hash
		if (this.coverageProvider?.onFileTransform) this.clearAllCachePaths();
	}
	clearAllCachePaths() {
		this.projects.forEach(({ vite }) => {
			Object.values(vite.environments).forEach((environment) => this.cache._modules.invalidateAllCachePaths(environment));
		});
	}
	_coverageOverrideCache = /* @__PURE__ */ new WeakMap();
	/** @internal */
	get _coverageOptions() {
		if (!this.configOverride.coverage) return this.config.coverage;
		if (!this._coverageOverrideCache.has(this.configOverride.coverage)) {
			const coverage = deepClone(this.config.coverage);
			const options = deepMerge(coverage, this.configOverride.coverage);
			this._coverageOverrideCache.set(this.configOverride.coverage, options);
		}
		return this._coverageOverrideCache.get(this.configOverride.coverage);
	}
	/**
	* Inject new test projects into the workspace.
	* @param config Glob, config path or a custom config options.
	* @returns An array of new test projects. Can be empty if the name was filtered out.
	*/
	injectTestProject = async (config) => {
		const projects = await resolveAndAttachProjects(this._harness, Array.isArray(config) ? config : [config]);
		this.projects.push(...projects);
		return projects;
	};
	/**
	* Provide a value to the test context. This value will be available to all tests with `inject`.
	*/
	provide = (key, value) => {
		this.getRootProject().provide(key, value);
	};
	/**
	* Get global provided context.
	*/
	getProvidedContext() {
		return this.getRootProject().getProvidedContext();
	}
	/** @internal */
	_ensureRootProject() {
		if (this.coreWorkspaceProject) return this.coreWorkspaceProject;
		this.coreWorkspaceProject = TestProject._createBasicProject(this);
		return this.coreWorkspaceProject;
	}
	/**
	* Return project that has the root (or "global") config.
	*/
	getRootProject() {
		if (!this.coreWorkspaceProject) throw new Error(`Root project is not initialized. This means that the Vite server was not established yet and the the workspace config is not resolved.`);
		return this.coreWorkspaceProject;
	}
	get serializedRootConfig() {
		return {
			...this.getRootProject().serializedConfig,
			projects: this.projects.map((project) => project.serializedConfig)
		};
	}
	getProjectByName(name) {
		const project = this.projects.find((p) => p.name === name) || this.coreWorkspaceProject || this.projects[0];
		if (!project) throw new Error(`Project "${name}" was not found.`);
		return project;
	}
	/**
	* Import a file using Vite module runner. The file will be transformed by Vite and executed in a separate context.
	* @param moduleId The ID of the module in Vite module graph
	*/
	import(moduleId) {
		return this.runner.import(moduleId);
	}
	/**
	* Creates a coverage provider if `coverage` is enabled in the config.
	*/
	async createCoverageProvider() {
		if (this._coverageProvider) return this._coverageProvider;
		const coverageProvider = await this.initCoverageProvider();
		if (coverageProvider) await coverageProvider.clean(this._coverageOptions.clean);
		return coverageProvider || null;
	}
	/**
	* Glob test files in every project and create a TestSpecification for each file and pool.
	* @param filters String filters to match the test files.
	*/
	async globTestSpecifications(filters = []) {
		return this.specifications.globTestSpecifications(filters);
	}
	async initCoverageProvider() {
		if (this._coverageProvider != null) return;
		const coverageConfig = this.configOverride.coverage ? this.getRootProject().serializedConfig.coverage : this.config.coverage;
		this._coverageProvider = await getCoverageProvider(coverageConfig, this.runner);
		if (this._coverageProvider) {
			await this._coverageProvider.initialize(this);
			this.config.coverage = this._coverageProvider.resolveOptions();
		}
		return this._coverageProvider;
	}
	/**
	* @deprecated Use `clearCache` instead.
	*/
	experimental_clearCache() {
		this.logger.deprecate(`The "experimental_clearCache" method is deprecated. Use "clearCache" instead.`);
		return this.clearCache();
	}
	/**
	* Deletes all Vitest caches, including the `fsModuleCache`.
	*/
	async clearCache() {
		await this.cache._clear();
	}
	/**
	* Merge reports from multiple runs located in the specified directory (value from `--merge-reports` if not specified).
	*/
	async mergeReports(directory) {
		return this._traces.$("vitest.merge_reports", async () => {
			if (this.reporters.some((r) => r instanceof BlobReporter)) throw new Error("Cannot merge reports when `--reporter=blob` is used. Remove blob reporter from the config first.");
			const { files, errors, coverages, executionTimes } = await readBlobs(this.version, directory || this.config.mergeReports, this.projects);
			this.state.blobs = {
				files,
				errors,
				coverages,
				executionTimes
			};
			await this.report("onInit", this);
			const specifications = [];
			for (const file of files) {
				const specification = this.getProjectByName(file.projectName || "").createSpecification(file.filepath, void 0, file.pool, file.id);
				specifications.push(specification);
			}
			await this._testRun.start(specifications);
			await this.coverageProvider?.onTestRunStart?.(specifications);
			for (const file of files) await this._reportFileTask(file);
			// append errors thrown during reporter event replay during merge reports
			const unhandledErrors = [...errors, ...this.state.getUnhandledErrors()];
			this._checkUnhandledErrors(unhandledErrors);
			await this._testRun.end(specifications, unhandledErrors);
			await this.initCoverageProvider();
			await this.coverageProvider?.mergeReports?.(coverages);
			return {
				testModules: this.state.getTestModules(),
				unhandledErrors: this.state.getUnhandledErrors()
			};
		});
	}
	/**
	* Returns the seed, if tests are running in a random order.
	*/
	getSeed() {
		return this.config.sequence.sequencer === RandomSequencer || !!this.config.sequence.shuffle || this.projects.some((p) => !!p.config.sequence.shuffle) ? this.config.sequence.seed : null;
	}
	/** @internal */
	async _reportFileTask(file) {
		const project = this.getProjectByName(file.projectName || "");
		await this._testRun.enqueued(project, file).catch((error) => {
			this.state.catchError(serializeValue(error), "Unhandled Reporter Error");
		});
		await this._testRun.collected(project, [file]).catch((error) => {
			this.state.catchError(serializeValue(error), "Unhandled Reporter Error");
		});
		const logs = [];
		const { packs, events } = convertTasksToEvents(file, (task) => {
			if (task.logs) logs.push(...task.logs);
		});
		logs.sort((log1, log2) => log1.time - log2.time);
		for (const log of logs) await this._testRun.log(log).catch((error) => {
			this.state.catchError(serializeValue(error), "Unhandled Reporter Error");
		});
		await this._testRun.updated(packs, events).catch((error) => {
			this.state.catchError(serializeValue(error), "Unhandled Reporter Error");
		});
	}
	async collect(filters, options = {}) {
		return this._traces.$("vitest.collect", async (collectSpan) => {
			const filenamePattern = filters && filters?.length > 0 ? filters : [];
			collectSpan.setAttribute("vitest.collect.filters", filenamePattern);
			const files = await this._traces.$("vitest.config.resolve_include_glob", async () => {
				const specifications = await this.specifications.getRelevantTestSpecifications(filters);
				collectSpan.setAttribute("vitest.collect.specifications", specifications.map((s) => {
					const relativeModuleId = relative(s.project.config.root, s.moduleId);
					if (s.project.name) return `|${s.project.name}| ${relativeModuleId}`;
					return relativeModuleId;
				}));
				return specifications;
			});
			// if run with --changed, don't exit if no tests are found
			if (!files.length) return {
				testModules: [],
				unhandledErrors: []
			};
			if (options.staticParse !== false) {
				const testModules = await this.parseSpecifications(files, { concurrency: options.staticParseConcurrency });
				if (hasFailed(testModules.map((testModule) => testModule.task))) process.exitCode = 1;
				return {
					testModules,
					unhandledErrors: []
				};
			}
			return this.collectTests(files);
		});
	}
	/**
	* Returns the list of test files that match the config and filters.
	* @param filters String filters to match the test files
	*/
	getRelevantTestSpecifications(filters) {
		return this.specifications.getRelevantTestSpecifications(filters);
	}
	/**
	* Initialize reporters, the coverage provider, and run tests.
	* This method can throw an error:
	*   - `FilesNotFoundError` if no tests are found
	*   - `GitNotFoundError` if `--related` flag is used, but git repository is not initialized
	*   - `Error` from the user reporters
	* @param filters String filters to match the test files
	*/
	async start(filters) {
		return this._traces.$("vitest.start", { context: this._traces.getContextFromEnv(process.env) }, async (startSpan) => {
			startSpan.setAttributes({ config: this.vite.config.configFile });
			try {
				await this._traces.$("vitest.coverage.init", async () => {
					await this.initCoverageProvider();
					await this.coverageProvider?.clean(this._coverageOptions.clean);
				});
			} finally {
				await this.report("onInit", this);
			}
			this.filenamePattern = filters && filters?.length > 0 ? filters : void 0;
			startSpan.setAttribute("vitest.start.filters", this.filenamePattern || []);
			let specifications = await this._traces.$("vitest.config.resolve_include_glob", async () => {
				const specifications = await this.specifications.getRelevantTestSpecifications(filters);
				startSpan.setAttribute("vitest.start.specifications", specifications.map((s) => {
					const relativeModuleId = relative(s.project.config.root, s.moduleId);
					if (s.project.name) return `|${s.project.name}| ${relativeModuleId}`;
					return relativeModuleId;
				}));
				return specifications;
			});
			if (this.config.experimental.preParse) {
				// This populates specification.testModule with parsed information
				await this.parseSpecifications(specifications);
				specifications = specifications.filter(({ testModule }) => {
					return !testModule || testModule.task.mode !== "skip";
				});
			}
			// if run with --changed or --last-failed, don't exit if no tests are found
			if (!specifications.length) {
				await this._traces.$("vitest.test_run", async () => {
					await this._testRun.start([]);
					await this.coverageProvider?.onTestRunStart?.([]);
					const coverage = await this.coverageProvider?.generateCoverage?.({ allTestsRun: true });
					await this._testRun.end([], [], coverage);
					// Report coverage for uncovered files
					await this.reportCoverage(coverage, true);
				});
				const narrowed = this.config.changed || this.config.related?.length || this.config.cliOptions.lastFailed;
				if (!this.config.watch || !narrowed) throw new FilesNotFoundError();
			}
			let testModules = {
				testModules: [],
				unhandledErrors: []
			};
			if (specifications.length) testModules = await this.runFiles(specifications, true);
			if (this.config.watch) await this.report("onWatcherStart");
			return testModules;
		});
	}
	/**
	* @deprecated use `standalone()` instead
	*/
	init() {
		this.logger.deprecate("`vitest.init()` is deprecated. Use `vitest.standalone()` instead.");
		return this.standalone();
	}
	/**
	* Initialize reporters and the coverage provider. This method doesn't run any tests.
	* If the `--watch` flag is provided, Vitest will still run changed tests even if this method was not called.
	*/
	async standalone() {
		await this._traces.$("vitest.init", async () => {
			try {
				await this.initCoverageProvider();
				await this.coverageProvider?.clean(this._coverageOptions.clean);
			} finally {
				await this.report("onInit", this);
			}
			// populate test files cache so watch mode can trigger a file rerun
			await this.globTestSpecifications();
			await Promise.all(this.projects.map((project) => project._standalone()));
			if (this.config.watch) await this.report("onWatcherStart");
		});
	}
	/**
	* If there is a test run happening, returns a promise that will
	* resolve when the test run is finished.
	*/
	async waitForTestRunEnd() {
		if (!this.runningPromise) return;
		await this.runningPromise;
	}
	/**
	* Get test specifications associated with the given module. If module is not a test file, an empty array is returned.
	*
	* **Note:** this method relies on a cache generated by `globTestSpecifications`. If the file was not processed yet, use `project.matchesGlobPattern` instead.
	* @param moduleId The module ID to get test specifications for.
	*/
	getModuleSpecifications(moduleId) {
		return this.specifications.getModuleSpecifications(moduleId);
	}
	/**
	* Vitest automatically caches test specifications for each file. This method clears the cache for the given file or the whole cache altogether.
	*/
	clearSpecificationsCache(moduleId) {
		this.specifications.clearCache(moduleId);
		if (!moduleId) this.projects.forEach((project) => {
			project.testFilesList = null;
		});
	}
	/**
	* Run tests for the given test specifications. This does not trigger `onWatcher*` events.
	* @param specifications A list of specifications to run.
	* @param allTestsRun Indicates whether all tests were run. This only matters for coverage.
	*/
	runTestSpecifications(specifications, allTestsRun = false) {
		specifications.forEach((spec) => this.specifications.ensureSpecificationCached(spec));
		return this.runFiles(specifications, allTestsRun);
	}
	/**
	* Runs tests for the given file paths. This does not trigger `onWatcher*` events.
	* @param filepaths A list of file paths to run tests for.
	* @param allTestsRun Indicates whether all tests were run. This only matters for coverage.
	*/
	async runTestFiles(filepaths, allTestsRun = false) {
		const specifications = await this.specifications.getRelevantTestSpecifications(filepaths);
		if (!specifications.length) return {
			testModules: [],
			unhandledErrors: []
		};
		return this.runFiles(specifications, allTestsRun);
	}
	/**
	* Rerun files and trigger `onWatcherRerun`, `onWatcherStart` and `onTestsRerun` events.
	* @param specifications A list of specifications to run.
	* @param allTestsRun Indicates whether all tests were run. This only matters for coverage.
	*/
	async rerunTestSpecifications(specifications, allTestsRun = false) {
		const files = specifications.map((spec) => spec.moduleId);
		await Promise.all([this.report("onWatcherRerun", files, "rerun test"), ...this._onUserTestsRerun.map((fn) => fn(specifications))]);
		const result = await this.runTestSpecifications(specifications, allTestsRun);
		await this.report("onWatcherStart", this.state.getFiles(files));
		return result;
	}
	async runFiles(specs, allTestsRun) {
		return this._traces.$("vitest.test_run", async () => {
			await this._testRun.start(specs);
			await this.coverageProvider?.onTestRunStart?.(specs);
			// previous run
			await this.cancelPromise;
			await this.runningPromise;
			this._onCancelListeners.clear();
			this.isCancelling = false;
			// schedule the new run
			this.runningPromise = (async () => {
				try {
					const startTime = Date.now();
					if (!this.pool) this.pool = createPool(this);
					const invalidates = Array.from(this.watcher.invalidates);
					this.watcher.invalidates.clear();
					this.snapshot.clear();
					this.state.clearErrors();
					if (!this.isFirstRun && this._coverageOptions.cleanOnRerun) await this.coverageProvider?.clean();
					await this.initializeGlobalSetup(specs);
					try {
						await this.pool.runTests(specs, invalidates);
					} catch (err) {
						this.state.catchError(err, "Unhandled Error");
					}
					await this.cache._update(specs, startTime);
					return {
						testModules: this.state.getTestModules(),
						unhandledErrors: this.state.getUnhandledErrors()
					};
				} finally {
					const coverage = await this.coverageProvider?.generateCoverage({ allTestsRun });
					const errors = this.state.getUnhandledErrors();
					this._checkUnhandledErrors(errors);
					await this._testRun.end(specs, errors, coverage);
					await this.reportCoverage(coverage, allTestsRun);
				}
			})().finally(() => {
				this.runningPromise = void 0;
				this.isFirstRun = false;
				// all subsequent runs will treat this as a fresh run
				this.config.changed = false;
				this.config.related = void 0;
				this._sourceFilterResult = void 0;
				this._failedFilterResult = void 0;
			});
			return await this.runningPromise;
		});
	}
	/**
	* Returns module's diagnostic. If `testModule` is not provided, `selfTime` and `totalTime` will be aggregated across all tests.
	*
	* If the module was not transformed or executed, the diagnostic will be empty.
	* @experimental
	* @see {@link https://vitest.dev/api/advanced/vitest#getsourcemodulediagnostic}
	*/
	async experimental_getSourceModuleDiagnostic(moduleId, testModule) {
		if (testModule) {
			const viteEnvironment = testModule.viteEnvironment;
			// if there is no viteEnvironment, it means the file did not run yet
			if (!viteEnvironment) return {
				modules: [],
				untrackedModules: []
			};
			const moduleLocations = await collectSourceModulesLocations(moduleId, viteEnvironment.moduleGraph);
			return collectModuleDurationsDiagnostic(moduleId, this.state, moduleLocations, testModule);
		}
		const environments = this.projects.flatMap((p) => {
			return Object.values(p.vite.environments);
		});
		const aggregatedLocationsResult = await Promise.all(environments.map((environment) => collectSourceModulesLocations(moduleId, environment.moduleGraph)));
		return collectModuleDurationsDiagnostic(moduleId, this.state, aggregatedLocationsResult.reduce((acc, locations) => {
			if (locations) {
				acc.modules.push(...locations.modules);
				acc.untracked.push(...locations.untracked);
			}
			return acc;
		}, {
			modules: [],
			untracked: []
		}));
	}
	/**
	* @deprecated Use `parseSpecifications` instead
	*/
	experimental_parseSpecifications(specifications, options) {
		this.logger.deprecate(`The "experimental_parseSpecifications" method is deprecated. Use "parseSpecifications" instead.`);
		return this.parseSpecifications(specifications, options);
	}
	async parseSpecifications(specifications, options) {
		const concurrency = options?.concurrency ?? (typeof os__default.availableParallelism === "function" ? os__default.availableParallelism() : os__default.cpus().length);
		const limit = limitConcurrency(concurrency);
		// Phase 1: parse all files in parallel (without mode interpretation)
		const results = await Promise.all(specifications.map((specification) => limit(async () => {
			return {
				file: await astCollectTests(specification.project, specification.moduleId).catch((error) => {
					return createFailedFileTask(specification.project, specification.moduleId, error);
				}),
				specification
			};
		})));
		const tagsFilter = this.config.tagsFilter ? createTagsFilter(this.config.tagsFilter, this.config.tags) : void 0;
		// Phase 2: cross-file .only resolution
		const globalHasOnly = results.some(({ file }) => !!file.containsOnly);
		for (const { file, specification } of results) {
			const config = specification.project.config;
			interpretTaskModes(file, config.testNamePattern, specification.testLines, specification.testIds, specification.testNames, tagsFilter, globalHasOnly, false, config.allowOnly);
			this.state.collectFiles(specification.project, [file]);
		}
		return results.map(({ file }) => this.state.getReportedEntity(file));
	}
	async experimental_parseSpecification(specification) {
		const file = await astCollectTests(specification.project, specification.moduleId).catch((error) => {
			return createFailedFileTask(specification.project, specification.moduleId, error);
		});
		const config = specification.project.config;
		const hasOnly = !!file.containsOnly;
		const tagsFilter = this.config.tagsFilter ? createTagsFilter(this.config.tagsFilter, this.config.tags) : void 0;
		interpretTaskModes(file, config.testNamePattern, specification.testLines, specification.testIds, specification.testNames, tagsFilter, hasOnly, false, config.allowOnly);
		// register in state, so it can be retrieved by "getReportedEntity"
		this.state.collectFiles(specification.project, [file]);
		return this.state.getReportedEntity(file);
	}
	/**
	* Collect tests in specified modules. Vitest will run the files to collect tests.
	* @param specifications A list of specifications to run.
	*/
	async collectTests(specifications) {
		const filepaths = specifications.map((spec) => spec.moduleId);
		this.state.collectPaths(filepaths);
		// previous run
		await this.cancelPromise;
		await this.runningPromise;
		this._onCancelListeners.clear();
		this.isCancelling = false;
		// schedule the new run
		this.runningPromise = (async () => {
			if (!this.pool) this.pool = createPool(this);
			const invalidates = Array.from(this.watcher.invalidates);
			this.watcher.invalidates.clear();
			this.snapshot.clear();
			this.state.clearErrors();
			await this.initializeGlobalSetup(specifications);
			try {
				await this.pool.collectTests(specifications, invalidates);
			} catch (err) {
				this.state.catchError(err, "Unhandled Error");
			}
			const files = this.state.getFiles();
			// can only happen if there was a syntax error in describe block
			// or there was an error importing a file
			if (hasFailed(files)) process.exitCode = 1;
			return {
				testModules: this.state.getTestModules(),
				unhandledErrors: this.state.getUnhandledErrors()
			};
		})().finally(() => {
			this.runningPromise = void 0;
			// all subsequent runs will treat this as a fresh run
			this.config.changed = false;
			this.config.related = void 0;
			this._sourceFilterResult = void 0;
			this._failedFilterResult = void 0;
		});
		return await this.runningPromise;
	}
	/**
	* Gracefully cancel the current test run. Vitest will wait until all running tests are finished before cancelling.
	*/
	async cancelCurrentRun(reason) {
		this.isCancelling = true;
		this.cancelPromise = Promise.all(Array.from(this._onCancelListeners, (listener) => listener(reason)));
		await this.cancelPromise.finally(() => this.cancelPromise = void 0);
		await this.runningPromise;
	}
	async initializeGlobalSetup(paths) {
		const projects = new Set(paths.map((spec) => spec.project));
		const coreProject = this.getRootProject();
		if (!projects.has(coreProject)) projects.add(coreProject);
		for (const project of projects) await project._initializeGlobalSetup();
	}
	/** @internal */
	async rerunFiles(files = this.state.getFilepaths(), trigger, allTestsRun = true, resetTestNamePattern = false) {
		if (resetTestNamePattern) this.configOverride.testNamePattern = void 0;
		if (this.filenamePattern) {
			const filteredFiles = await this.globTestSpecifications(this.filenamePattern);
			files = files.filter((file) => filteredFiles.some((f) => f.moduleId === file));
		}
		const specifications = files.flatMap((file) => this.getModuleSpecifications(file));
		await Promise.all([this.report("onWatcherRerun", files, trigger), ...this._onUserTestsRerun.map((fn) => fn(specifications))]);
		const testResult = await this.runFiles(specifications, allTestsRun);
		await this.report("onWatcherStart", this.state.getFiles(files));
		return testResult;
	}
	/** @internal */
	async rerunTask(id) {
		const task = this.state.idMap.get(id);
		if (!task) throw new Error(`Task ${id} was not found`);
		const reportedTask = this.state.getReportedEntityById(id);
		if (!reportedTask) throw new Error(`Test specification for task ${id} was not found`);
		const specifications = [reportedTask.toTestSpecification()];
		await Promise.all([this.report("onWatcherRerun", [task.file.filepath], "tasks" in task ? "rerun suite" : "rerun test"), ...this._onUserTestsRerun.map((fn) => fn(specifications))]);
		await this.runFiles(specifications, false);
		await this.report("onWatcherStart", ["module" in reportedTask ? reportedTask.module.task : reportedTask.task]);
	}
	/** @internal */
	async changeProjectName(pattern) {
		if (pattern === "") this.config.cliOptions.project = void 0;
		else this.config.cliOptions.project = [pattern];
		await this.vite.restart();
	}
	/** @internal */
	async changeNamePattern(pattern, files = this.state.getFilepaths(), trigger) {
		// Empty test name pattern should reset filename pattern as well
		if (pattern === "") this.filenamePattern = void 0;
		const testNamePattern = pattern ? new RegExp(pattern) : void 0;
		this.configOverride.testNamePattern = testNamePattern;
		// filter only test files that have tests matching the pattern
		if (testNamePattern) files = files.filter((filepath) => {
			const files = this.state.getFiles([filepath]);
			return !files.length || files.some((file) => {
				const tasks = getTasks(file);
				return !tasks.length || tasks.some((task) => testNamePattern.test(task.name));
			});
		});
		await this.rerunFiles(files, trigger, pattern === "");
	}
	/** @internal */
	async changeFilenamePattern(pattern, files = this.state.getFilepaths()) {
		this.filenamePattern = pattern ? [pattern] : [];
		const trigger = this.filenamePattern.length ? "change filename pattern" : "reset filename pattern";
		await this.rerunFiles(files, trigger, pattern === "");
	}
	/** @internal */
	async rerunFailed() {
		await this.rerunFiles(this.state.getFailedFilepaths(), "rerun failed", false);
	}
	/**
	* Update snapshots in specified files. If no files are provided, it will update files with failed tests and obsolete snapshots.
	* @param files The list of files on the file system
	*/
	async updateSnapshot(files) {
		// default to failed files
		files = files || [...this.state.getFailedFilepaths(), ...this.snapshot.summary.uncheckedKeysByFile.map((s) => s.filePath)];
		this.enableSnapshotUpdate();
		try {
			return await this.rerunFiles(files, "update snapshot", false);
		} finally {
			this.resetSnapshotUpdate();
		}
	}
	/**
	* Enable the mode that allows updating snapshots when running tests.
	* This method doesn't run any tests.
	*
	* Every test that runs after this method is called will update snapshots.
	* To disable the mode, call `resetSnapshotUpdate`.
	*/
	enableSnapshotUpdate() {
		this.configOverride.snapshotOptions = {
			updateSnapshot: "all",
			// environment is resolved inside a worker thread
			snapshotEnvironment: null
		};
		this.snapshot.options.updateSnapshot = "all";
	}
	/**
	* Disable the mode that allows updating snapshots when running tests.
	*/
	resetSnapshotUpdate() {
		delete this.configOverride.snapshotOptions;
		this.snapshot.options.updateSnapshot = this.config.snapshotOptions.updateSnapshot;
	}
	/**
	* Set the global test name pattern to a regexp.
	* This method doesn't run any tests.
	*/
	setGlobalTestNamePattern(pattern) {
		if (pattern instanceof RegExp) this.configOverride.testNamePattern = pattern;
		else this.configOverride.testNamePattern = pattern ? new RegExp(pattern) : void 0;
	}
	/**
	* Returns the regexp used for the global test name pattern.
	*/
	getGlobalTestNamePattern() {
		if (this.configOverride.testNamePattern != null) return this.configOverride.testNamePattern;
		return this.config.testNamePattern;
	}
	/**
	* Resets the global test name pattern. This method doesn't run any tests.
	*/
	resetGlobalTestNamePattern() {
		this.configOverride.testNamePattern = void 0;
	}
	_rerunTimer;
	async scheduleRerun(triggerId) {
		const currentCount = this.restartsCount;
		clearTimeout(this._rerunTimer);
		await this.cancelPromise;
		await this.runningPromise;
		clearTimeout(this._rerunTimer);
		// server restarted
		if (this.restartsCount !== currentCount) return;
		this._rerunTimer = setTimeout(async () => {
			if (this.closingPromise) return;
			if (this.watcher.changedTests.size === 0) {
				this.watcher.invalidates.clear();
				return;
			}
			// server restarted
			if (this.restartsCount !== currentCount) return;
			this.isFirstRun = false;
			this.snapshot.clear();
			let files = Array.from(this.watcher.changedTests);
			if (this.filenamePattern) {
				const filteredFiles = await this.globTestSpecifications(this.filenamePattern);
				files = files.filter((file) => filteredFiles.some((f) => f.moduleId === file));
				// A file that does not match the current filename pattern was changed
				if (files.length === 0) return;
			}
			this.watcher.changedTests.clear();
			const triggerLabel = relative(this.config.root, triggerId);
			// get file specifications and filter them if needed
			const specifications = files.flatMap((file) => this.getModuleSpecifications(file)).filter((specification) => {
				if (this._onFilterWatchedSpecification.length === 0) return true;
				return this._onFilterWatchedSpecification.every((fn) => fn(specification));
			});
			await Promise.all([this.report("onWatcherRerun", files, triggerLabel), ...this._onUserTestsRerun.map((fn) => fn(specifications))]);
			await this.runFiles(specifications, false);
			await this.report("onWatcherStart", this.state.getFiles(files));
		}, WATCHER_DEBOUNCE);
	}
	/**
	* Invalidate a file in all projects.
	*/
	invalidateFile(filepath) {
		this.specifications.invalidateDocblock(filepath);
		this.projects.forEach(({ vite }) => {
			Object.values(vite.environments).forEach((environment) => {
				const { moduleGraph } = environment;
				const modules = moduleGraph.getModulesByFile(filepath);
				if (!modules) return;
				modules.forEach((module) => {
					moduleGraph.invalidateModule(module);
					this.cache._modules.invalidateCachePath(environment, module.id);
				});
			});
		});
	}
	/** @internal */
	_checkUnhandledErrors(errors) {
		if (errors.length && !this.config.dangerouslyIgnoreUnhandledErrors) process.exitCode = 1;
	}
	async reportCoverage(coverage, allTestsRun) {
		if (this.state.getCountOfFailedTests() > 0) {
			await this.coverageProvider?.onTestFailure?.();
			if (!this._coverageOptions.reportOnFailure) return;
		}
		if (this.coverageProvider) {
			await this.coverageProvider.reportCoverage(coverage, { allTestsRun });
			// notify builtin ui and html reporter after coverage html is generated
			for (const reporter of this.reporters) if ("onFinishedReportCoverage" in reporter && typeof reporter.onFinishedReportCoverage === "function") await reporter.onFinishedReportCoverage();
		}
	}
	/**
	* Closes all projects and their associated resources.
	* This can only be called once; the closing promise is cached until the server restarts.
	*/
	async close() {
		if (!this.closingPromise) this.closingPromise = (async () => {
			// let an in-flight (re)run settle instead of tearing down under it:
			// its file stats and transforms would race the teardown and reject
			// after the caller already cleaned up the test files
			clearTimeout(this._rerunTimer);
			await this.runningPromise?.catch(noop);
			const teardownProjects = /* @__PURE__ */ new Set();
			for (const project of this.projects) {
				// the project that declares browser instances runs their global setup
				if (project._instanceParent) teardownProjects.add(project._instanceParent);
				teardownProjects.add(project);
			}
			if (this.coreWorkspaceProject) teardownProjects.add(this.coreWorkspaceProject);
			const teardownErrors = [];
			// do teardown before closing the server
			for (const project of [...teardownProjects].reverse()) await project._teardownGlobalSetup().catch((error) => {
				teardownErrors.push(error);
			});
			// close the pool (and the browser pages with it) BEFORE the Vite
			// servers: closing a server releases its port while automated pages may
			// still be alive — a page's websocket client would auto-reconnect onto
			// the next server that binds the same port and fail with "Unknown session id"
			if (this.pool) {
				try {
					await this.pool.close?.();
				} catch (error) {
					teardownErrors.push(error);
				}
				this.pool = void 0;
			}
			const closePromises = this.projects.map((w) => w.close());
			// close the core workspace server only once
			// it's possible that it's not initialized at all because it's not running any tests
			if (this.coreWorkspaceProject && !this.projects.includes(this.coreWorkspaceProject)) closePromises.push(this.coreWorkspaceProject.close().then(() => this.vite = void 0));
			closePromises.push(...this._onClose.map((fn) => fn()));
			await Promise.allSettled(closePromises).then((results) => {
				const errors = [...results.filter((r) => r.status === "rejected").map((r) => r.reason), ...teardownErrors];
				for (const error of errors) this.logger.error("error during close", error);
				this._checkUnhandledErrors(errors);
			});
			// the pool is down: forked workers read tmp module copies from disk
			await this._clearTmpDir();
			await this._traces?.finish();
		})();
		return this.closingPromise;
	}
	/**
	* Removes the root temp directory with the tmp module copies,
	* mirroring `TestProject.clearTmpDir()`. The reference is cleared before
	* the removal so a repeated close is a no-op.
	*/
	async _clearTmpDir() {
		if (!this._tmpDir) return;
		const tmpDir = this._tmpDir;
		this._tmpDir = void 0;
		try {
			await rm(tmpDir, {
				recursive: true,
				force: true
			});
		} catch {}
	}
	/**
	* Closes all projects and exit the process
	* @param force If true, the process will exit immediately after closing the projects.
	*/
	async exit(force = false) {
		clearTimeout(this._exitTimeout);
		this._exitTimeout = setTimeout(() => {
			this.report("onProcessTimeout").then(() => {
				console.warn(`close timed out after ${this.config.teardownTimeout}ms`);
				if (!this.pool) {
					const runningServers = [this.vite, ...this.projects.map((p) => p.vite)].filter(Boolean).length;
					if (runningServers === 1) console.warn("Tests closed successfully but something prevents Vite server from exiting");
					else if (runningServers > 1) console.warn(`Tests closed successfully but something prevents ${runningServers} Vite servers from exiting`);
					else console.warn("Tests closed successfully but something prevents the main process from exiting");
					if (!this.reporters.some((r) => r instanceof HangingProcessReporter)) console.warn("You can try to identify the cause by enabling \"hanging-process\" reporter. See https://vitest.dev/guide/reporters.html#hanging-process-reporter");
				}
				process.exit();
			});
		}, this.config.teardownTimeout);
		this._exitTimeout.unref();
		await this.close();
		if (force) process.exit();
	}
	/** @internal */
	async report(name, ...args) {
		await Promise.all(this.reporters.map((r) => r[name]?.(
			// @ts-expect-error let me go
			...args
		)));
	}
	/** @internal */
	async _globTestFilepaths() {
		const specifications = await this.globTestSpecifications();
		return Array.from(new Set(specifications.map((spec) => spec.moduleId)));
	}
	/**
	* Should the server be kept running after the tests are done.
	*/
	shouldKeepServer() {
		return !!this.config?.watch;
	}
	/**
	* Register a handler that will be called when the server is restarted due to a config change.
	*/
	onServerRestart(fn) {
		this._onRestartListeners.push(fn);
	}
	/**
	* Register a handler that will be called when the test run is cancelled with `vitest.cancelCurrentRun`.
	*/
	onCancel(fn) {
		this._onCancelListeners.add(fn);
		return () => {
			this._onCancelListeners.delete(fn);
		};
	}
	/**
	* Register a handler that will be called when the server is closed.
	*/
	onClose(fn) {
		this._onClose.push(fn);
	}
	/**
	* Register a handler that will be called when the tests are rerunning.
	*/
	onTestsRerun(fn) {
		this._onUserTestsRerun.push(fn);
	}
	/**
	* Register a handler that will be called when a file is changed.
	* This callback should return `true` of `false` indicating whether the test file needs to be rerun.
	* @example
	* const testsToRun = [resolve('./test.spec.ts')]
	* vitest.onFilterWatchedSpecification(specification => testsToRun.includes(specification.moduleId))
	*/
	onFilterWatchedSpecification(fn) {
		this._onFilterWatchedSpecification.push(fn);
	}
	/** @internal */
	onAfterSetServer(fn) {
		this._onSetServer.push(fn);
	}
	/**
	* Check if the project with a given name should be included.
	*/
	matchesProjectFilter(name) {
		const projects = this.config?.project || this.config.cliOptions?.project;
		return matchesProjectFilter(toArray(projects), name);
	}
	/**
	* Create a report that's scoped to a specific reporter directory.
	*/
	createReport(scope) {
		return createReport(this, scope);
	}
}

async function createVitest(modeOrOptions, optionsOrViteOverrides = {}, viteOverridesOrVitestOptions = {}, maybeVitestOptions = {}) {
	let options;
	let viteOverrides;
	let vitestOptions;
	if (typeof modeOrOptions === "string") {
		options = optionsOrViteOverrides;
		viteOverrides = viteOverridesOrVitestOptions;
		vitestOptions = maybeVitestOptions;
	} else {
		options = modeOrOptions;
		viteOverrides = optionsOrViteOverrides;
		vitestOptions = viteOverridesOrVitestOptions;
	}
	const logger = new Logger(vitestOptions.stdout, vitestOptions.stderr);
	const packageInstaller = vitestOptions.packageInstaller ?? new VitestPackageInstaller();
	const pluginHarness = new PluginHarness(logger, packageInstaller);
	const config = await resolveConfig$1(options, viteOverrides, pluginHarness, vitestOptions.cliFilters);
	const vitest = new Vitest(pluginHarness, config);
	try {
		await vitest._start(config);
		return vitest;
	} 
	// Vitest can fail at any point during setup or inside a custom plugin.
	// Make sure everything is properly closed (like the logger).
catch (error) {
		await vitest.close();
		throw error;
	}
}

function isCancelAction(str, key) {
	return str === "" || str === "\x1B" || !!key && key.ctrl === true && key.name === "c";
}

class SnapshotReviewer {
	ctx;
	snapshots;
	#updates = {
		approved: [],
		rejected: []
	};
	constructor(ctx) {
		this.ctx = ctx;
		this.snapshots = this.#collectSnapshots();
	}
	#collectSnapshots() {
		const failedSnapshots = [];
		for (const files of this.ctx.state.getFiles()) {
			const project = this.ctx.getProjectByName(files.projectName ?? "");
			if (project.config.snapshotEnvironment !== void 0) continue;
			for (const test of getTests(files)) {
				if (test.result?.errors === void 0) continue;
				for (const error of test.result.errors) {
					const reviewableSnapshot = getReviewableSnapshot(error);
					if (reviewableSnapshot === null) continue;
					failedSnapshots.push({
						...reviewableSnapshot,
						test,
						project
					});
				}
			}
		}
		return failedSnapshots;
	}
	#approve = (snapshot) => {
		this.#updates.approved.push(snapshot);
	};
	#reject = (snapshot) => {
		this.#updates.rejected.push(snapshot);
	};
	#review = async (render) => {
		for (const [index, snapshot] of this.snapshots.entries()) {
			const update = {
				...snapshot.errorMeta.update,
				meta: { test: snapshot.test }
			};
			await render({
				snapshot,
				stats: {
					index,
					length: this.snapshots.length
				}
			}, () => this.#approve(update), () => this.#reject(update));
		}
	};
	async #updateSnapshots() {
		const snapshotEnvironment = await this.getEnvironment();
		const snapshotUpdates = /* @__PURE__ */ new Map([[snapshotEnvironment, this.#updates.approved]]);
		return saveSnapshotUpdates(snapshotUpdates);
	}
	async startReview() {
		this.ctx.watcher.unregisterWatcher();
		const tracker = this.ctx.watcher.createTracker();
		try {
			await this.collectReviews(this.#review);
			const fileUpdates = new Set(this.#updates.approved.map(({ file }) => file));
			const fsEvents = Promise.all(Array.from(fileUpdates).map((file) => tracker.track(file, {
				type: "change",
				timeout: 500
			})));
			await this.#updateSnapshots();
			for (const file of fileUpdates) {
				this.ctx.logger.clearHighlightCache(file);
				this.ctx.invalidateFile(file);
			}
			// @todo what should happen when there's no approved updates?
			await this.ctx.rerunFiles(Array.from(new Set(this.#updates.approved.map(({ meta }) => meta.test.file.filepath))), "interactive review done");
			// wait for fs events before enabling the watcher to not cause another re-run
			// in case some have not been dispatched/consumed yet
			await fsEvents;
		} catch (error) {
			console.error(error);
		} finally {
			tracker.stop();
			this.ctx.watcher.registerWatcher();
		}
	}
	get hasReviewableSnapshots() {
		return this.snapshots.length > 0;
	}
}
function getReviewableSnapshot(error) {
	const errorMeta = error.__vitest_error_context__?.meta;
	if (typeof error.diff !== "string" || !isMatchMeta(errorMeta)) return null;
	return {
		error: { diff: error.diff },
		errorMeta,
		frame: error.stacks?.[0] ?? null
	};
}
function isMatchMeta(meta) {
	return meta !== void 0 && Reflect.get(meta, "type") === "snapshot" && "update" in meta;
}
const REVIEW_KEYS = [[
	"a",
	"green",
	"accept",
	"keep the new snapshot"
], [
	"r",
	"red",
	"reject",
	"retain the old snapshot"
]];
const REVIEW_DESCRIPTION_PADDING = Math.max(...REVIEW_KEYS.map((k) => k[2].length)) + 2;
const REVIEW_KEYS_HELP = `\n${REVIEW_KEYS.map(([key, color, meaning, description]) => `  ${$[color](key)} ${$.reset(meaning)}${" ".repeat(REVIEW_DESCRIPTION_PADDING - meaning.length)}${$.dim(description)}`).join("\n")}\n`;
class NodeSnapshotReviewer extends SnapshotReviewer {
	#stdin;
	#stdout;
	#snapshotEnvironment = void 0;
	constructor(ctx, stdin, stdout) {
		super(ctx);
		this.#stdin = stdin;
		this.#stdout = stdout;
	}
	async getEnvironment() {
		if (this.#snapshotEnvironment === void 0) this.#snapshotEnvironment = new (await (import('./node.B9mkVmLH.js'))).VitestNodeSnapshotEnvironment();
		return this.#snapshotEnvironment;
	}
	async collectReviews(review) {
		const controls = this.#handleKeypress();
		try {
			await review(async ({ snapshot: { error, errorMeta, frame, project, test }, stats }, approve, reject) => {
				const { update } = errorMeta;
				// undo `column--` from `SnapshotState` to match the error's stack frame
				const source = update.type === "inline" ? {
					...update,
					column: update.column + 1
				} : frame;
				this.ctx.logger.clearFullScreen();
				this.#stdout.write([
					$.bold(`Reviewing [${$.yellow(`${stats.index + 1}/${stats.length}`)}]`) + (project.name ? ` ${formatProjectName(project, ":")}` : ":"),
					source && `Source: ${$.cyan(`${relative(project.config.root, source.file)}${$.dim(`:${source.line}:${source.column}`)}`)} ${$.dim(`(${test.fullTestName})`)}`,
					`Snapshot: ${$.yellow(errorMeta.key)}`,
					update.type !== "inline" && `Snapshot file: ${$.cyan(relative(project.config.root, update.file))}`,
					formatDiff(error.diff),
					REVIEW_KEYS_HELP
				].filter(Boolean).join("\n"));
				switch (await controls.waitForAction()) {
					case "approved":
						approve();
						break;
					case "rejected": reject();
				}
			});
			this.ctx.logger.clearFullScreen();
		} catch (error) {
			controls.cleanup();
			// `waitForAction` can reject when pressing cancel keys, no need to log that
			if (error) console.error(error);
			await this.ctx.exit(true);
		}
		controls.cleanup();
	}
	#handleKeypress() {
		let resolvers;
		const rl = readline.createInterface({
			input: this.#stdin,
			escapeCodeTimeout: 50
		});
		readline.emitKeypressEvents(this.#stdin, rl);
		if (this.#stdin.isTTY) this.#stdin.setRawMode(true);
		this.#stdin.on("keypress", handler);
		const cleanup = () => {
			rl.close();
			this.#stdin.removeListener("keypress", handler);
			if (this.#stdin.isTTY) this.#stdin.setRawMode(false);
		};
		function handler(str, key) {
			if (resolvers === void 0) return;
			const currentResolvers = resolvers;
			// reset the resolvers so a cancel key string won't change the exit code without rejecting
			resolvers = void 0;
			if (isCancelAction(str, key)) {
				process.exitCode = 130;
				cleanup();
				return currentResolvers.reject();
			}
			switch (key.name) {
				// accept
				case "a":
					currentResolvers.resolve("approved");
					break;
				// reject
				case "r":
					currentResolvers.resolve("rejected");
					break;
				// ignore other keys
				default:
 // restore resolvers as we didn't resolve the promise
				resolvers = currentResolvers;
			}
		}
		return {
			waitForAction() {
				resolvers = Promise.withResolvers();
				return resolvers.promise;
			},
			cleanup
		};
	}
}
const DIFF_HEADER = `${$.green("- Expected")}\n${$.red("+ Received")}`;
const SEPARATOR_H = "─";
const SEPARATOR_V = "│";
const JUNCTION_T = "┬";
const JUNCTION_M = "┼";
const JUNCTION_B = "┴";
const DIFF_COL_WIDTH = 5;
const HUNK_RE = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;
function formatDiff(diff) {
	const width = getCols();
	let oldLine = 0;
	let newLine = 0;
	let inHunk = false;
	const separatorLeft = 12;
	const separatorRight = Math.max(0, width - separatorLeft - 1);
	const separator = `${SEPARATOR_H.repeat(separatorLeft)}${JUNCTION_M}${SEPARATOR_H.repeat(separatorRight)}`;
	const lines = normalizeDiff(diff);
	return [
		SEPARATOR_H.repeat(width),
		DIFF_HEADER,
		lines.map((line, index) => {
			const plain = stripVTControlCharacters(line);
			const hunk = HUNK_RE.exec(plain);
			if (hunk) {
				oldLine = Number(hunk[1]);
				newLine = Number(hunk[2]);
				inHunk = true;
				if (index === 0) return `${SEPARATOR_H.repeat(separatorLeft)}${JUNCTION_T}${SEPARATOR_H.repeat(separatorRight)}`;
				return separator;
			}
			if (!inHunk) return line;
			switch (plain[0]) {
				case "-": return `${padLineNumber(oldLine++, $.green)} ${padLineNumber()} ${SEPARATOR_V}${line}`;
				case "+": return `${padLineNumber()} ${padLineNumber(newLine++, $.red)} ${SEPARATOR_V}${line}`;
				default: return `${padLineNumber(oldLine++)} ${padLineNumber(newLine++)} ${SEPARATOR_V}${line}`;
			}
		}).join("\n"),
		`${SEPARATOR_H.repeat(separatorLeft)}${JUNCTION_B}${SEPARATOR_H.repeat(separatorRight)}`
	].join("\n");
}
const INLINE_RE = /(Expected|Received):\s/;
function inlineValue(raw) {
	return raw.replace(INLINE_RE, "");
}
const DIFF_START = 3;
const EXPECTED_SYMBOL = $.green("-");
const RECEIVED_SYMBOL = $.red("+");
function normalizeDiff(input) {
	const lines = input.split(/\r?\n/);
	const plain = lines.slice(0, 2).map(stripVTControlCharacters);
	// Inline `Expected: "..." / Received: "..."`
	if (plain[0]?.startsWith("Expected:") && plain[1]?.startsWith("Received:")) return [
		"@@ -1 +1 @@",
		`${EXPECTED_SYMBOL} ${inlineValue(lines[0])}`,
		`${RECEIVED_SYMBOL} ${inlineValue(lines[1])}`
	];
	// Diff without hunk headers
	if (!(typeof lines[DIFF_START] === "string" && HUNK_RE.test(stripVTControlCharacters(lines[DIFF_START]))) && plain[0] === "- Expected" && plain[1] === "+ Received") {
		lines.splice(0, DIFF_START, "@@ -1 +1 @@");
		return lines;
	}
	// Diff with hunk headers
	return lines.slice(DIFF_START);
}
function padLineNumber(line, color = $.white) {
	if (line === void 0) return " ".repeat(DIFF_COL_WIDTH);
	return $.dim(color(String(line).padStart(DIFF_COL_WIDTH)));
}

const MAX_RESULT_COUNT = 10;
const SELECTION_MAX_INDEX = 7;
const ESC = "\x1B[";
class WatchFilter {
	filterRL;
	currentKeyword = void 0;
	message;
	results = [];
	selectionIndex = -1;
	onKeyPress;
	stdin;
	stdout;
	constructor(message, stdin = process.stdin, stdout$1 = stdout()) {
		this.message = message;
		this.stdin = stdin;
		this.stdout = stdout$1;
		this.filterRL = readline.createInterface({
			input: this.stdin,
			escapeCodeTimeout: 50
		});
		readline.emitKeypressEvents(this.stdin, this.filterRL);
		if (this.stdin.isTTY) this.stdin.setRawMode(true);
	}
	async filter(filterFunc) {
		this.write(this.promptLine());
		const resultPromise = createDefer();
		this.onKeyPress = this.filterHandler(filterFunc, (result) => {
			resultPromise.resolve(result);
		});
		this.stdin.on("keypress", this.onKeyPress);
		try {
			return await resultPromise;
		} finally {
			this.close();
		}
	}
	filterHandler(filterFunc, onSubmit) {
		return async (str, key) => {
			switch (true) {
				case key.sequence === "":
					if (this.currentKeyword && this.currentKeyword?.length > 1) this.currentKeyword = this.currentKeyword?.slice(0, -1);
					else this.currentKeyword = void 0;
					break;
				case key?.ctrl && key?.name === "c":
				case key?.name === "escape":
					this.write(`${ESC}1G${ESC}0J`);
					onSubmit(void 0);
					return;
				case key?.name === "enter":
				case key?.name === "return": {
					const selection = this.results[this.selectionIndex];
					onSubmit((typeof selection === "string" ? selection : selection?.key) || this.currentKeyword || "");
					this.currentKeyword = void 0;
					break;
				}
				case key?.name === "up":
					if (this.selectionIndex && this.selectionIndex > 0) this.selectionIndex--;
					else this.selectionIndex = -1;
					break;
				case key?.name === "down":
					if (this.selectionIndex < this.results.length - 1) this.selectionIndex++;
					else if (this.selectionIndex >= this.results.length - 1) this.selectionIndex = this.results.length - 1;
					break;
				case !key?.ctrl && !key?.meta: if (this.currentKeyword === void 0) this.currentKeyword = str;
				else this.currentKeyword += str || "";
			}
			if (this.currentKeyword) this.results = await filterFunc(this.currentKeyword);
			this.render();
		};
	}
	render() {
		let printStr = this.promptLine();
		if (!this.currentKeyword) printStr += "\nPlease input filter pattern";
		else if (this.currentKeyword && this.results.length === 0) printStr += "\nPattern matches no results";
		else {
			const resultCountLine = this.results.length === 1 ? `Pattern matches ${this.results.length} result` : `Pattern matches ${this.results.length} results`;
			let resultBody = "";
			if (this.results.length > MAX_RESULT_COUNT) {
				const offset = this.selectionIndex > SELECTION_MAX_INDEX ? this.selectionIndex - SELECTION_MAX_INDEX : 0;
				const displayResults = this.results.slice(offset, MAX_RESULT_COUNT + offset);
				const remainingResultCount = this.results.length - offset - displayResults.length;
				resultBody = `${displayResults.map((result, index) => index + offset === this.selectionIndex ? $.green(` › ${result}`) : $.dim(` › ${result}`)).join("\n")}`;
				if (remainingResultCount > 0) resultBody += `
${$.dim(`   ...and ${remainingResultCount} more ${remainingResultCount === 1 ? "result" : "results"}`)}`;
			} else resultBody = this.results.map((result, index) => index === this.selectionIndex ? $.green(` › ${result}`) : $.dim(` › ${result}`)).join("\n");
			printStr += `\n${resultCountLine}\n${resultBody}`;
		}
		this.eraseAndPrint(printStr);
		this.restoreCursor();
	}
	keywordOffset() {
		return `? ${this.message} › `.length + 1;
	}
	promptLine() {
		return `${$.cyan("?")} ${$.bold(this.message)} › ${this.currentKeyword || ""}`;
	}
	eraseAndPrint(str) {
		let rows = 0;
		const lines = str.split(/\r?\n/);
		for (const line of lines) {
			const columns = "columns" in this.stdout ? this.stdout.columns : 80;
			// We have to take care of screen width in case of long lines
			rows += 1 + Math.floor(Math.max(stripVTControlCharacters(line).length - 1, 0) / columns);
		}
		this.write(`${ESC}1G`);
		this.write(`${ESC}J`);
		this.write(str);
		this.write(`${ESC}${rows - 1}A`);
	}
	close() {
		this.filterRL.close();
		if (this.onKeyPress) this.stdin.removeListener("keypress", this.onKeyPress);
		if (this.stdin.isTTY) this.stdin.setRawMode(false);
	}
	restoreCursor() {
		const cursorPos = this.keywordOffset() + (this.currentKeyword?.length || 0);
		this.write(`${ESC}${cursorPos}G`);
	}
	write(data) {
		this.stdout.write(data);
	}
	getLastResults() {
		return this.results.map((r) => typeof r === "string" ? r : r.toString());
	}
}

const keys = [
	[["a", "return"], "rerun all tests"],
	["r", "rerun current pattern tests"],
	["f", "rerun only failed tests"],
	["u", "update snapshot"],
	["i", "interactively review snapshot fails"],
	["p", "filter by a filename"],
	["t", "filter by a test name regex pattern"],
	["w", "filter by a project name"],
	["q", "quit"]
];
const cancelKeys = [
	"space",
	"c",
	"h",
	...keys.map((key) => key[0]).flat()
];
function printShortcutsHelp() {
	stdout().write(`
${$.bold("  Watch Usage")}
${keys.map((i) => $.dim("  press ") + $.reset([i[0]].flat().map($.bold).join(", ")) + $.dim(` to ${i[1]}`)).join("\n")}
`);
}
function* traverseFilteredTestNames(parentName, filter, t) {
	if (t.type === "test") {
		if (filter.test(t.name)) {
			const displayName = `${parentName} > ${t.name}`;
			yield {
				key: t.name,
				toString: () => displayName
			};
		}
	} else {
		parentName = parentName.length ? `${parentName} > ${t.name}` : t.name;
		for (const task of t.tasks) yield* traverseFilteredTestNames(parentName, filter, task);
	}
}
function* getFilteredTestNames(pattern, suite) {
	try {
		const reg = new RegExp(pattern);
		// TODO: we cannot run tests per workspace yet: filtering files
		const files = /* @__PURE__ */ new Set();
		for (const file of suite) if (!files.has(file.name)) {
			files.add(file.name);
			yield* traverseFilteredTestNames("", reg, file);
		}
	} catch {}
}
function registerConsoleShortcuts(ctx, stdin = process.stdin, stdout) {
	let latestFilename = "";
	async function _keypressHandler(str, key) {
		// Cancel run and exit when ctrl-c or esc is pressed.
		// If cancelling takes long and key is pressed multiple times, exit forcefully.
		if (isCancelAction(str, key)) {
			if (!ctx.isCancelling) {
				ctx.logger.log($.red("Cancelling test run. Press CTRL+c again to exit forcefully.\n"));
				process.exitCode = 130;
				// Unregister raw mode so that second CTRL+c is handled by Node.js as SIGINT
				off();
				await ctx.cancelCurrentRun("keyboard-input");
			}
			return ctx.exit(true);
		}
		// window not support suspend
		if (!isWindows && key && key.ctrl && key.name === "z") {
			process.kill(process.ppid, "SIGTSTP");
			process.kill(process.pid, "SIGTSTP");
			return;
		}
		const name = key?.name;
		if (ctx.runningPromise) {
			if (name && cancelKeys.includes(name)) await ctx.cancelCurrentRun("keyboard-input");
			return;
		}
		// quit
		if (name === "q") return ctx.exit(true);
		// help
		if (name === "h") return printShortcutsHelp();
		// update snapshot
		if (name === "u") return ctx.updateSnapshot();
		// interactive review
		if (name === "i") return reviewSnapshots();
		// rerun all tests
		if (name === "a" || name === "return") {
			const files = await ctx._globTestFilepaths();
			return ctx.changeNamePattern("", files, "rerun all tests");
		}
		// rerun current pattern tests
		if (name === "r") return ctx.rerunFiles();
		// rerun only failed tests
		if (name === "f") return ctx.rerunFailed();
		// change project filter
		if (name === "w") return inputProjectName();
		// change testNamePattern
		if (name === "t") return inputNamePattern();
		// change fileNamePattern
		if (name === "p") return inputFilePattern();
	}
	async function keypressHandler(str, key) {
		await _keypressHandler(str, key);
	}
	async function reviewSnapshots() {
		off();
		const snapshotReviewer = new NodeSnapshotReviewer(ctx, stdin, stdout);
		if (snapshotReviewer.hasReviewableSnapshots) await snapshotReviewer.startReview();
		else ctx.logger.log($.yellow(`No snapshots to review. ${$.dim("Press ") + $.bold("r") + $.dim(" to run tests again.")}\n`));
		on();
	}
	async function inputNamePattern() {
		off();
		const filter = await new WatchFilter("Input test name pattern (RegExp)", stdin, stdout).filter((str) => {
			return [...getFilteredTestNames(str, ctx.state.getFiles())];
		});
		on();
		if (typeof filter === "undefined") return;
		const files = ctx.state.getFilepaths();
		// if running in standalone mode, Vitest instance doesn't know about any test file
		const cliFiles = ctx.config.standalone && !files.length ? await ctx._globTestFilepaths() : void 0;
		await ctx.changeNamePattern(filter?.trim() || "", cliFiles, "change pattern");
	}
	async function inputProjectName() {
		off();
		const { filter = "" } = await prompt([{
			name: "filter",
			type: "text",
			message: "Input a single project name",
			initial: ctx.config.project[0] || ""
		}]);
		on();
		await ctx.changeProjectName(filter.trim());
	}
	async function inputFilePattern() {
		off();
		const watchFilter = new WatchFilter("Input filename pattern", stdin, stdout);
		const filter = await watchFilter.filter(async (str) => {
			return (await ctx.globTestSpecifications([str])).map((specification) => relative(ctx.config.root, specification.moduleId)).filter((file, index, all) => all.indexOf(file) === index);
		});
		on();
		if (typeof filter === "undefined") return;
		latestFilename = filter?.trim() || "";
		const lastResults = watchFilter.getLastResults();
		await ctx.changeFilenamePattern(latestFilename, filter && lastResults.length ? lastResults.map((i) => resolve(ctx.config.root, i)) : void 0);
	}
	let rl;
	function on() {
		off();
		rl = readline.createInterface({
			input: stdin,
			escapeCodeTimeout: 50
		});
		readline.emitKeypressEvents(stdin, rl);
		if (stdin.isTTY) stdin.setRawMode(true);
		stdin.on("keypress", keypressHandler);
	}
	function off() {
		rl?.close();
		rl = void 0;
		stdin.removeListener("keypress", keypressHandler);
		if (stdin.isTTY) stdin.setRawMode(false);
	}
	on();
	return function cleanup() {
		off();
	};
}

async function startVitest(modeOrCliFilters, cliFiltersOrOptions, optionsOrViteOverrides, viteOverridesOrVitestOptions, maybeVitestOptions) {
	let cliFilters;
	let options;
	let viteOverrides;
	let vitestOptions;
	if (typeof modeOrCliFilters === "string") {
		cliFilters = cliFiltersOrOptions ?? [];
		options = optionsOrViteOverrides ?? {};
		viteOverrides = viteOverridesOrVitestOptions;
		vitestOptions = maybeVitestOptions;
	} else {
		cliFilters = modeOrCliFilters ?? [];
		options = cliFiltersOrOptions ?? {};
		viteOverrides = optionsOrViteOverrides;
		vitestOptions = viteOverridesOrVitestOptions;
	}
	const root = resolve(options.root || process.cwd());
	const ctx = await prepareVitest(options, viteOverrides, vitestOptions, cliFilters);
	if (ctx._coverageOptions.enabled) {
		const provider = ctx._coverageOptions.provider || "v8";
		const requiredPackages = CoverageProviderMap[provider];
		if (requiredPackages) {
			if (!await ctx.packageInstaller.ensureInstalled(requiredPackages, root, ctx.version)) {
				process.exitCode = 1;
				return ctx;
			}
		}
	}
	const stdin = vitestOptions?.stdin || process.stdin;
	const stdout = vitestOptions?.stdout || process.stdout;
	let stdinCleanup;
	if (stdin.isTTY && ctx.config.watch) stdinCleanup = registerConsoleShortcuts(ctx, stdin, stdout);
	ctx.onAfterSetServer(async () => {
		if (ctx.closingPromise) return;
		try {
			if (ctx.config.standalone) await ctx.standalone();
			else await ctx.start(cliFilters);
		} catch (error) {
			reportStartError(ctx, error);
		}
	});
	try {
		if (ctx.config.listTags) await ctx.listTags();
		else if (ctx.config.clearCache) await ctx.clearCache();
		else if (ctx.config.mergeReports) await ctx.mergeReports();
		else if (ctx.config.standalone) await ctx.standalone();
		else await ctx.start(cliFilters);
		return ctx;
	} catch (e) {
		reportStartError(ctx, e);
		return ctx;
	} finally {
		if (!ctx?.shouldKeepServer()) {
			stdinCleanup?.();
			await ctx.close();
		}
	}
}
function reportStartError(ctx, error) {
	// the exit code is already set by the test run
	if (error instanceof FilesNotFoundError) return;
	process.exitCode = 1;
	if (error instanceof GitNotFoundError || error instanceof GitCommandError) {
		ctx.logger.error(error.message);
		return;
	}
	if (error instanceof IncludeTaskLocationDisabledError || error instanceof RangeLocationFilterProvidedError || error instanceof LocationFilterFileNotFoundError) {
		ctx.logger.printError(error, { verbose: false });
		return;
	}
	ctx.logger.printError(error, {
		fullStack: true,
		type: "Unhandled Error"
	});
	ctx.logger.error("\n\n");
}
async function prepareVitest(modeOrOptions, optionsOrViteOverrides, viteOverridesOrVitestOptions, vitestOptionsOrCliFilters, maybeCliFilters) {
	let options;
	let viteOverrides;
	let vitestOptions;
	let cliFilters;
	if (typeof modeOrOptions === "string") {
		options = optionsOrViteOverrides ?? {};
		viteOverrides = viteOverridesOrVitestOptions;
		vitestOptions = vitestOptionsOrCliFilters;
		cliFilters = maybeCliFilters;
	} else {
		options = modeOrOptions ?? {};
		viteOverrides = optionsOrViteOverrides;
		vitestOptions = viteOverridesOrVitestOptions;
		cliFilters = vitestOptionsOrCliFilters;
	}
	process.env.TEST = "true";
	process.env.VITEST = "true";
	process.env.NODE_ENV ??= "test";
	if (options.run) options.watch = false;
	if (options.standalone && (cliFilters?.length || 0) > 0) options.standalone = false;
	// this shouldn't affect _application root_ that can be changed inside config
	const root = resolve(options.root || process.cwd());
	const ctx = await createVitest(options, viteOverrides, {
		...vitestOptions,
		cliFilters
	});
	const environmentPackage = getEnvPackageName(ctx.config.environment);
	if (environmentPackage && !await ctx.packageInstaller.ensureInstalled(environmentPackage, root)) {
		process.exitCode = 1;
		return ctx;
	}
	return ctx;
}
function processCollected(ctx, files, options) {
	let errorsPrinted = false;
	forEachSuite(files, (suite) => {
		suite.errors().forEach((error) => {
			errorsPrinted = true;
			ctx.logger.printError(error, { project: suite.project });
		});
	});
	if (errorsPrinted) return;
	if (typeof options.json !== "undefined") return processJsonOutput(files, options);
	return formatCollectedAsString(files).forEach((test) => console.log(test));
}
function outputFileList(files, options) {
	if (typeof options.json !== "undefined") return outputJsonFileList(files, options);
	formatFilesAsString(files, options).map((file) => console.log(file));
}
function outputJsonFileList(files, options) {
	if (typeof options.json === "boolean") return console.log(JSON.stringify(formatFilesAsJSON(files), null, 2));
	if (typeof options.json === "string") {
		const jsonPath = resolve(options.root || process.cwd(), options.json);
		mkdirSync(dirname(jsonPath), { recursive: true });
		writeFileSync(jsonPath, JSON.stringify(formatFilesAsJSON(files), null, 2));
	}
}
function formatFilesAsJSON(files) {
	return files.map((file) => {
		const result = { file: file.moduleId };
		if (file.project.name) result.projectName = file.project.name;
		return result;
	});
}
function formatFilesAsString(files, options) {
	return files.map((file) => {
		let name = relative(options.root || process.cwd(), file.moduleId);
		if (file.project.name) name = `[${file.project.name}] ${name}`;
		return name;
	});
}
function processJsonOutput(files, options) {
	if (typeof options.json === "boolean") return console.log(JSON.stringify(formatCollectedAsJSON(files), null, 2));
	if (typeof options.json === "string") {
		const jsonPath = resolve(options.root || process.cwd(), options.json);
		mkdirSync(dirname(jsonPath), { recursive: true });
		writeFileSync(jsonPath, JSON.stringify(formatCollectedAsJSON(files), null, 2));
	}
}
function forEachSuite(modules, callback) {
	modules.forEach((testModule) => {
		callback(testModule);
		for (const suite of testModule.children.allSuites()) callback(suite);
	});
}
function formatCollectedAsJSON(files) {
	const results = [];
	files.forEach((file) => {
		for (const test of file.children.allTests()) {
			if (test.result().state === "skipped") continue;
			const result = {
				name: test.fullName,
				file: test.module.moduleId
			};
			if (test.project.name) result.projectName = test.project.name;
			if (test.location) result.location = test.location;
			results.push(result);
		}
	});
	return results;
}
function formatCollectedAsString(testModules) {
	const results = [];
	testModules.forEach((testModule) => {
		for (const test of testModule.children.allTests()) {
			if (test.result().state === "skipped") continue;
			const fullName = `${test.module.task.name} > ${test.fullName}`;
			results.push((test.project.name ? `[${test.project.name}] ` : "") + fullName);
		}
	});
	return results;
}
const envPackageNames = {
	jsdom: "jsdom",
	"happy-dom": "happy-dom",
	"edge-runtime": "@edge-runtime/vm"
};
function getEnvPackageName(env) {
	if (env === "node") return null;
	if (env in envPackageNames) return envPackageNames[env];
	if (env[0] === "." || isAbsolute(env)) return null;
	return `vitest-environment-${env}`;
}

var cliApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  outputFileList: outputFileList,
  prepareVitest: prepareVitest,
  processCollected: processCollected,
  startVitest: startVitest
});

export { BaseCoverageProvider as B, DefaultReporter as D, GitVCSProvider as G, HangingProcessReporter as H, JUnitReporter as J, MinimalReporter as M, ReportersMap as R, TapFlatReporter as T, Vitest as V, DotReporter as a, GithubActionsReporter as b, JsonReporter as c, MtimeVCSProvider as d, TapReporter as e, VerboseReporter as f, createVitest as g, experimental_getRunnerTask as h, isValidApiRequest as i, cliApi as j, registerConsoleShortcuts as r, startVitest as s };
