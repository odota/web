import { b as printDiffOrStringify, d as diff, a as processError, g as getRunningTests, c as getCurrentTest, r as recordArtifact, T as TestSyntaxError, e as createTaskCollector, f as getCurrentSuite, h as createChainable, i as getHooks, j as getFn, m as matchesTags, k as afterAll, l as afterEach, n as aroundAll, o as aroundEach, q as beforeAll, t as beforeEach, u as describe, v as it, w as onTestFailed, x as onTestFinished, y as suite, z as test } from './run.CjdgFZiW.js';
import { i as isChildProcess, r as resetModules, g as getWorkerState } from './utils.DYj33du9.js';
import { e as parseErrorStacktrace, a as getSafeTimers, f as parseSingleStack, h as delay } from './source-map.DakdQc29.js';
import { i as isMockFunction, f as fn, a as spyOn, r as restoreAllMocks, b as resetAllMocks, c as clearAllMocks } from './spy.DDMXghXv.js';
import { g as getType, f as isObject, D as noop, y as assertTypes, x as ordinal, E as createSimpleStackTrace, i as isAbsolute, a as relative, n as normalize } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { a as commonjsGlobal } from './index.D0heQG4v.js';
import { s as stringify, i as inspect } from './display.BlTmubjj.js';
import { $ } from './tinyrainbow.Do8I1XRG.js';
import * as chai from 'chai';
import { use, util } from 'chai';
import { getNames, getTests, getTestName, createFileTask } from '../task-utils.js';
import { a as addSerializer } from './plugins.DPQHVT0p.js';
import { C as CounterMap, D as DefaultMap, e as evaluateSnapshotFile, k as keyToTestName, s as saveSnapshotFile, a as saveInlineSnapshots, b as saveRawSnapshots, t as testNameToKey, c as serialize, d as addExtraLineBreaks, n as normalizeNewlines, r as removeExtraLineBreaks, f as deepMergeSnapshot, g as stripSnapshotIndentation } from './rawSnapshot.DqSiqIEx.js';
import { r as rpc, V as VitestEvaluatedModules } from './rpc.Uhkwr2NM.js';
import { Bench } from 'tinybench';
import { expectTypeOf } from 'expect-type';

function isSameStackPosition(x, y) {
	return x.file === y.file && x.column === y.column && x.line === y.line;
}
class SnapshotState {
	testFilePath;
	snapshotPath;
	_counters = new CounterMap();
	_dirty;
	_updateSnapshot;
	_snapshotData;
	_initialData;
	_inlineSnapshots;
	_inlineSnapshotStacks;
	_testIdToKeys = new DefaultMap(() => []);
	_rawSnapshots;
	_rawSnapshotFiles = /* @__PURE__ */ new Set();
	_uncheckedKeys;
	_snapshotFormat;
	_environment;
	_fileExists;
	expand;
	// getter/setter for jest-image-snapshot compat
	// https://github.com/vitest-dev/vitest/issues/7322
	_added = new CounterMap();
	_matched = new CounterMap();
	_unmatched = new CounterMap();
	_updated = new CounterMap();
	get added() {
		return this._added;
	}
	set added(value) {
		this._added._total = value;
	}
	get matched() {
		return this._matched;
	}
	set matched(value) {
		this._matched._total = value;
	}
	get unmatched() {
		return this._unmatched;
	}
	set unmatched(value) {
		this._unmatched._total = value;
	}
	get updated() {
		return this._updated;
	}
	set updated(value) {
		this._updated._total = value;
	}
	constructor(testFilePath, snapshotPath, fileData, options) {
		this.testFilePath = testFilePath;
		this.snapshotPath = snapshotPath;
		const data = fileData ?? Object.create(null);
		this._fileExists = fileData != null;
		const update = options.updateSnapshot;
		const dirty = (update === "all" || update === "new") && fileData != null;
		this._initialData = { ...data };
		this._snapshotData = { ...data };
		this._dirty = dirty;
		this._inlineSnapshots = [];
		this._inlineSnapshotStacks = [];
		this._rawSnapshots = [];
		this._uncheckedKeys = new Set(Object.keys(this._snapshotData));
		this.expand = options.expand || false;
		this._updateSnapshot = options.updateSnapshot;
		this._snapshotFormat = {
			printBasicPrototype: false,
			escapeString: false,
			// more generous safety cap 128MB (same as Node's util.inspect)
			// instead of tighter pretty-format default 1MB
			// since users can purposely save large snapshot to a dedicated file.
			maxOutputLength: 2 ** 27,
			...options.snapshotFormat
		};
		this._environment = options.snapshotEnvironment;
	}
	static async create(testFilePath, options) {
		const environment = options.snapshotEnvironment;
		const snapshotPath = await environment.resolvePath(testFilePath);
		let fileData;
		if (environment.readSnapshotFileData) fileData = await environment.readSnapshotFileData(snapshotPath);
		else {
			const content = await environment.readSnapshotFile(snapshotPath);
			fileData = content != null ? evaluateSnapshotFile(snapshotPath, content) : null;
		}
		return new SnapshotState(testFilePath, snapshotPath, fileData, options);
	}
	get snapshotUpdateState() {
		return this._updateSnapshot;
	}
	get environment() {
		return this._environment;
	}
	markSnapshotsAsCheckedForTest(testName) {
		this._uncheckedKeys.forEach((uncheckedKey) => {
			// skip snapshots with following keys
			//   testName n
			//   testName > xxx n (this is for toMatchSnapshot("xxx") API)
			if (uncheckedKey.startsWith(testName) && /^ \d+$|^ > /.test(uncheckedKey.slice(testName.length))) this._uncheckedKeys.delete(uncheckedKey);
		});
	}
	clearTest(testId) {
		// clear inline
		this._inlineSnapshots = this._inlineSnapshots.filter((s) => s.testId !== testId);
		this._inlineSnapshotStacks = this._inlineSnapshotStacks.filter((s) => s.testId !== testId);
		// clear file
		for (const key of this._testIdToKeys.get(testId)) {
			const name = keyToTestName(key);
			const count = this._counters.get(name);
			if (count > 0) {
				if (key in this._snapshotData || key in this._initialData) this._snapshotData[key] = this._initialData[key];
				this._counters.set(name, count - 1);
			}
		}
		this._testIdToKeys.delete(testId);
		// clear stats
		this.added.delete(testId);
		this.updated.delete(testId);
		this.matched.delete(testId);
		this.unmatched.delete(testId);
	}
	_inferInlineSnapshotStack(stacks) {
		// if called inside resolves/rejects, stacktrace is different
		const promiseIndex = stacks.findIndex((i) => i.method.match(/__VITEST_(RESOLVES|REJECTS)__/));
		if (promiseIndex !== -1) return stacks[promiseIndex + 3];
		// support poll + inline snapshot
		const pollChainIndex = stacks.findIndex((i) => i.method.match(/__VITEST_POLL_CHAIN__/));
		if (pollChainIndex !== -1) return stacks[pollChainIndex + 1];
		// inline snapshot function can be named __INLINE_SNAPSHOT_OFFSET_<n>__
		// to specify a custom stack offset
		for (let i = 0; i < stacks.length; i++) {
			const match = stacks[i].method.match(/__INLINE_SNAPSHOT_OFFSET_(\d+)__/);
			if (match) return stacks[i + Number(match[1])] ?? null;
		}
		// custom matcher registered via expect.extend() — the wrapper function
		// in jest-extend.ts is named __VITEST_EXTEND_ASSERTION__
		const customMatcherIndex = stacks.findIndex((i) => i.method.includes("__VITEST_EXTEND_ASSERTION__"));
		if (customMatcherIndex !== -1) return stacks[customMatcherIndex + 3] ?? null;
		// inline snapshot function is called __INLINE_SNAPSHOT__
		// in integrations/snapshot/chai.ts
		const stackIndex = stacks.findIndex((i) => i.method.includes("__INLINE_SNAPSHOT__"));
		return stackIndex !== -1 ? stacks[stackIndex + 2] : null;
	}
	_addSnapshot(key, receivedSerialized, options) {
		this._dirty = true;
		if (options.stack) this._inlineSnapshots.push({
			...options.stack,
			snapshot: receivedSerialized,
			testId: options.testId,
			assertionName: options.assertionName
		});
		else if (options.rawSnapshot) this._rawSnapshots.push({
			...options.rawSnapshot,
			snapshot: receivedSerialized
		});
		else this._snapshotData[key] = receivedSerialized;
	}
	_resolveKey(testId, testName, key) {
		this._counters.increment(testName);
		const count = this._counters.get(testName);
		if (!key) key = testNameToKey(testName, count);
		this._testIdToKeys.get(testId).push(key);
		return {
			key,
			count
		};
	}
	_resolveInlineStack(options) {
		const { testId, snapshot, assertionName, error } = options;
		const stacks = parseErrorStacktrace(error, { ignoreStackEntries: [] });
		const _stack = this._inferInlineSnapshotStack(stacks);
		if (!_stack) {
			const message = stacks.map((s) => `  ${s.file}:${s.line}:${s.column}${s.method ? ` (${s.method})` : ""}`).join("\n");
			throw new Error(`@vitest/snapshot: Couldn't infer stack frame for inline snapshot.\n${message}`);
		}
		const stack = this.environment.processStackTrace?.(_stack) || _stack;
		// removing 1 column, because source map points to the wrong
		// location for js files, but `column-1` points to the same in both js/ts
		// https://github.com/vitejs/vite/issues/8657
		stack.column--;
		// reject multiple inline snapshots at the same location if snapshot is different
		const snapshotsWithSameStack = this._inlineSnapshotStacks.filter((s) => isSameStackPosition(s, stack));
		if (snapshotsWithSameStack.length > 0) {
			// ensure only one snapshot will be written at the same location
			this._inlineSnapshots = this._inlineSnapshots.filter((s) => !isSameStackPosition(s, stack));
			const differentSnapshot = snapshotsWithSameStack.find((s) => s.snapshot !== snapshot);
			if (differentSnapshot) throw Object.assign(/* @__PURE__ */ new Error(`${assertionName} with different snapshots cannot be called at the same location`), {
				actual: snapshot,
				expected: differentSnapshot.snapshot
			});
		}
		this._inlineSnapshotStacks.push({
			...stack,
			testId,
			snapshot
		});
		return stack;
	}
	_reconcile(opts) {
		// These are the conditions on when to write snapshots:
		//  * There's no snapshot file in a non-CI environment.
		//  * There is a snapshot file and we decided to update the snapshot.
		//  * There is a snapshot file, but it doesn't have this snapshot.
		// These are the conditions on when not to write snapshots:
		//  * The update flag is set to 'none'.
		//  * There's no snapshot file or a file without this snapshot on a CI environment.
		if (opts.hasSnapshot && this._updateSnapshot === "all" || (!opts.hasSnapshot || !opts.snapshotIsPersisted) && (this._updateSnapshot === "new" || this._updateSnapshot === "all")) {
			if (this._updateSnapshot === "all") {
				if (!opts.pass) {
					if (opts.hasSnapshot) this.updated.increment(opts.testId);
					else this.added.increment(opts.testId);
					this._addSnapshot(opts.key, opts.addValue, {
						stack: opts.stack,
						testId: opts.testId,
						rawSnapshot: opts.rawSnapshot,
						assertionName: opts.assertionName
					});
				} else this.matched.increment(opts.testId);
			} else {
				this._addSnapshot(opts.key, opts.addValue, {
					stack: opts.stack,
					testId: opts.testId,
					rawSnapshot: opts.rawSnapshot,
					assertionName: opts.assertionName
				});
				this.added.increment(opts.testId);
			}
			return {
				actual: "",
				count: opts.count,
				expected: "",
				key: opts.key,
				pass: true
			};
		} else if (!opts.pass) {
			this.unmatched.increment(opts.testId);
			return {
				actual: opts.actualDisplay,
				count: opts.count,
				expected: opts.expectedDisplay,
				key: opts.key,
				pass: false,
				update: this._createUpdate(opts)
			};
		} else {
			this.matched.increment(opts.testId);
			return {
				actual: "",
				count: opts.count,
				expected: "",
				key: opts.key,
				pass: true
			};
		}
	}
	_createUpdate(opts) {
		if (opts.stack) return {
			type: "inline",
			file: opts.stack.file,
			line: opts.stack.line,
			column: opts.stack.column,
			snapshot: opts.addValue,
			testId: opts.testId,
			assertionName: opts.assertionName
		};
		if (opts.rawSnapshot) return {
			type: "raw",
			file: opts.rawSnapshot.file,
			readonly: opts.rawSnapshot.readonly,
			snapshot: opts.addValue
		};
		return {
			type: "file",
			file: this.snapshotPath,
			key: opts.key,
			snapshot: opts.addValue
		};
	}
	async save() {
		const hasExternalSnapshots = Object.keys(this._snapshotData).length;
		const hasInlineSnapshots = this._inlineSnapshots.length;
		const hasRawSnapshots = this._rawSnapshots.length;
		const isEmpty = !hasExternalSnapshots && !hasInlineSnapshots && !hasRawSnapshots;
		const status = {
			deleted: false,
			saved: false
		};
		if ((this._dirty || this._uncheckedKeys.size) && !isEmpty) {
			if (hasExternalSnapshots) {
				await saveSnapshotFile(this._environment, this._snapshotData, this.snapshotPath);
				this._fileExists = true;
			}
			if (hasInlineSnapshots) await saveInlineSnapshots(this._environment, this._inlineSnapshots);
			if (hasRawSnapshots) await saveRawSnapshots(this._environment, this._rawSnapshots);
			status.saved = true;
		} else if (!hasExternalSnapshots && this._fileExists) {
			if (this._updateSnapshot === "all") {
				await this._environment.removeSnapshotFile(this.snapshotPath);
				this._fileExists = false;
			}
			status.deleted = true;
		}
		return status;
	}
	getUncheckedCount() {
		return this._uncheckedKeys.size || 0;
	}
	getUncheckedKeys() {
		return Array.from(this._uncheckedKeys);
	}
	removeUncheckedKeys() {
		if (this._updateSnapshot === "all" && this._uncheckedKeys.size) {
			this._dirty = true;
			this._uncheckedKeys.forEach((key) => delete this._snapshotData[key]);
			this._uncheckedKeys.clear();
		}
	}
	probeExpectedSnapshot(options) {
		const count = this._counters.get(options.testName) + 1;
		const key = testNameToKey(options.testName, count);
		return {
			key,
			count,
			data: options?.isInline ? options.inlineSnapshot : this._snapshotData[key],
			markAsChecked: () => {
				this._counters.increment(options.testName);
				this._testIdToKeys.get(options.testId).push(key);
				this._uncheckedKeys.delete(key);
			}
		};
	}
	match({ testId, testName, received, key, inlineSnapshot, isInline, error, rawSnapshot, assertionName }) {
		const resolved = this._resolveKey(testId, testName, key);
		key = resolved.key;
		const count = resolved.count;
		// Do not mark the snapshot as "checked" if the snapshot is inline and
		// there's an external snapshot. This way the external snapshot can be
		// removed with `--updateSnapshot`.
		if (!(isInline && this._snapshotData[key] !== void 0)) this._uncheckedKeys.delete(key);
		let receivedSerialized = rawSnapshot && typeof received === "string" ? received : serialize(received, void 0, this._snapshotFormat);
		if (!rawSnapshot) receivedSerialized = addExtraLineBreaks(receivedSerialized);
		if (rawSnapshot) {
			this._rawSnapshotFiles.add(rawSnapshot.file);
			// normalize EOL when snapshot contains CRLF but received is LF
			if (rawSnapshot.content && /\r\n/.test(rawSnapshot.content) && !/\r\n/.test(receivedSerialized)) rawSnapshot.content = normalizeNewlines(rawSnapshot.content);
		}
		const expected = isInline ? inlineSnapshot : rawSnapshot ? rawSnapshot.content : this._snapshotData[key];
		const expectedTrimmed = rawSnapshot ? expected : expected?.trim();
		const pass = expectedTrimmed === (rawSnapshot ? receivedSerialized : receivedSerialized.trim());
		const hasSnapshot = expected !== void 0;
		const snapshotIsPersisted = isInline || this._fileExists || rawSnapshot && rawSnapshot.content != null;
		if (pass && !isInline && !rawSnapshot)
 // When the file is re-saved (because other snapshots changed), the JS
		// round-trip can lose proper escaping. Refresh in-memory data with the
		// freshly serialized string so the file is written correctly.
		// _reconcile does not write _snapshotData on pass, so this is the only
		// place it gets refreshed. Domain snapshots skip this because the stored
		// value may contain match patterns that differ from the received output.
		this._snapshotData[key] = receivedSerialized;
		const stack = isInline ? this._resolveInlineStack({
			testId,
			snapshot: receivedSerialized,
			assertionName: assertionName || "toMatchInlineSnapshot",
			error: error || /* @__PURE__ */ new Error("snapshot")
		}) : void 0;
		return this._reconcile({
			testId,
			key,
			count,
			pass,
			hasSnapshot,
			snapshotIsPersisted: !!snapshotIsPersisted,
			addValue: receivedSerialized,
			actualDisplay: rawSnapshot ? receivedSerialized : removeExtraLineBreaks(receivedSerialized),
			expectedDisplay: expectedTrimmed !== void 0 ? rawSnapshot ? expectedTrimmed : removeExtraLineBreaks(expectedTrimmed) : void 0,
			stack,
			rawSnapshot,
			assertionName
		});
	}
	processDomainSnapshot({ testId, received, expectedSnapshot, matchResult, isInline, error, assertionName }) {
		const stack = isInline ? this._resolveInlineStack({
			testId,
			snapshot: received,
			assertionName,
			error: error || /* @__PURE__ */ new Error("STACK_TRACE_ERROR")
		}) : void 0;
		const actualResolved = matchResult?.resolved ?? received;
		const expectedResolved = matchResult?.expected ?? expectedSnapshot.data;
		return this._reconcile({
			testId,
			key: expectedSnapshot.key,
			count: expectedSnapshot.count,
			pass: matchResult?.pass ?? false,
			hasSnapshot: expectedSnapshot.data !== void 0,
			snapshotIsPersisted: isInline ? true : this._fileExists,
			addValue: actualResolved,
			actualDisplay: removeExtraLineBreaks(actualResolved),
			expectedDisplay: expectedResolved !== void 0 ? removeExtraLineBreaks(expectedResolved) : void 0,
			stack,
			assertionName
		});
	}
	/**
	* The snapshot file, if the test file stores snapshots in it, and every asserted file snapshot.
	*/
	getSnapshotFiles() {
		const files = Array.from(this._rawSnapshotFiles);
		if (this._fileExists || Object.keys(this._snapshotData).length) files.unshift(this.snapshotPath);
		return files;
	}
	async pack() {
		const snapshot = {
			filepath: this.testFilePath,
			added: 0,
			fileDeleted: false,
			matched: 0,
			unchecked: 0,
			uncheckedKeys: [],
			unmatched: 0,
			updated: 0
		};
		const uncheckedCount = this.getUncheckedCount();
		const uncheckedKeys = this.getUncheckedKeys();
		if (uncheckedCount) this.removeUncheckedKeys();
		const status = await this.save();
		snapshot.fileDeleted = status.deleted;
		snapshot.added = this.added.total();
		snapshot.matched = this.matched.total();
		snapshot.unmatched = this.unmatched.total();
		snapshot.updated = this.updated.total();
		snapshot.unchecked = !status.deleted ? uncheckedCount : 0;
		snapshot.uncheckedKeys = Array.from(uncheckedKeys);
		return snapshot;
	}
}

function createMismatchError(message, expand, actual, expected) {
	const error = new Error(message);
	Object.defineProperty(error, "actual", {
		value: actual,
		enumerable: true,
		configurable: true,
		writable: true
	});
	Object.defineProperty(error, "expected", {
		value: expected,
		enumerable: true,
		configurable: true,
		writable: true
	});
	Object.defineProperty(error, "diffOptions", { value: { expand } });
	return error;
}
class SnapshotClient {
	options;
	snapshotStateMap = /* @__PURE__ */ new Map();
	constructor(options = {}) {
		this.options = options;
	}
	async setup(filepath, options) {
		if (this.snapshotStateMap.has(filepath)) return;
		this.snapshotStateMap.set(filepath, await SnapshotState.create(filepath, options));
	}
	async finish(filepath) {
		const result = await this.getSnapshotState(filepath).pack();
		this.snapshotStateMap.delete(filepath);
		return result;
	}
	skipTest(filepath, testName) {
		this.getSnapshotState(filepath).markSnapshotsAsCheckedForTest(testName);
	}
	clearTest(filepath, testId) {
		this.getSnapshotState(filepath).clearTest(testId);
	}
	getSnapshotState(filepath) {
		const state = this.snapshotStateMap.get(filepath);
		if (!state) throw new Error(`The snapshot state for '${filepath}' is not found. Did you call 'SnapshotClient.setup()'?`);
		return state;
	}
	match(options) {
		const { filepath, name, testId = name, message, isInline = false, properties, inlineSnapshot, error, errorMessage, rawSnapshot, assertionName } = options;
		let { received } = options;
		if (!filepath) throw new Error("Snapshot cannot be used outside of test");
		const snapshotState = this.getSnapshotState(filepath);
		if (rawSnapshot?.file === snapshotState.snapshotPath)
 // note that this hard rejection is best-effort in a sense that,
		// if `toMatchFileSnapshot` is called with a different test file's snapshot path,
		// this check will not catch it.
		throw new Error(`File snapshot cannot use the same path as the test snapshot file: ${rawSnapshot.file}`);
		const testName = [name, ...message ? [message] : []].join(" > ");
		// Probe first so we can mark as checked even on early return
		const expectedSnapshot = snapshotState.probeExpectedSnapshot({
			testName,
			testId,
			isInline,
			inlineSnapshot
		});
		if (typeof properties === "object") {
			if (typeof received !== "object" || !received) {
				expectedSnapshot.markAsChecked();
				throw new Error("Received value must be an object when the matcher has properties");
			}
			let propertiesPass;
			try {
				propertiesPass = this.options.isEqual?.(received, properties) ?? false;
			} catch (err) {
				expectedSnapshot.markAsChecked();
				throw err;
			}
			if (!propertiesPass) {
				expectedSnapshot.markAsChecked();
				return {
					pass: false,
					message: () => errorMessage || "Snapshot properties mismatched",
					actual: received,
					expected: properties
				};
			}
			received = deepMergeSnapshot(received, properties);
		}
		const { actual, expected, key, pass, update } = snapshotState.match({
			testId,
			testName,
			received,
			isInline,
			error,
			inlineSnapshot,
			rawSnapshot,
			assertionName
		});
		return {
			pass,
			message: () => `Snapshot \`${key || "unknown"}\` mismatched`,
			actual: rawSnapshot ? actual : actual?.trim(),
			expected: rawSnapshot ? expected : expected?.trim(),
			meta: createMatchMeta(key, update)
		};
	}
	assert(options) {
		const result = this.match(options);
		if (!result.pass) {
			const snapshotState = this.getSnapshotState(options.filepath);
			throw createMismatchError(result.message(), snapshotState.expand, result.actual, result.expected);
		}
	}
	matchDomain(options) {
		const { received, filepath, name, testId = name, message, adapter, isInline = false, inlineSnapshot, error, assertionName } = options;
		if (!filepath) throw new Error("Snapshot cannot be used outside of test");
		const captured = adapter.capture(received);
		const rendered = adapter.render(captured);
		const snapshotState = this.getSnapshotState(filepath);
		const testName = [name, ...message ? [message] : []].join(" > ");
		const expectedSnapshot = snapshotState.probeExpectedSnapshot({
			testName,
			testId,
			isInline,
			inlineSnapshot
		});
		expectedSnapshot.markAsChecked();
		const matchResult = expectedSnapshot.data !== void 0 ? adapter.match(captured, adapter.parseExpected(expectedSnapshot.data)) : void 0;
		const { actual, expected, key, pass, update } = snapshotState.processDomainSnapshot({
			testId,
			received: rendered,
			expectedSnapshot,
			matchResult,
			isInline,
			error,
			assertionName
		});
		return {
			pass,
			message: () => `Snapshot \`${key}\` mismatched`,
			actual: actual?.trim(),
			expected: expected?.trim(),
			meta: createMatchMeta(key, update)
		};
	}
	async pollMatchDomain(options) {
		const { poll, filepath, name, testId = name, message, adapter, isInline = false, inlineSnapshot, error, timeout = 1e3, interval = 50, assertionName } = options;
		if (!filepath) throw new Error("Snapshot cannot be used outside of test");
		const snapshotState = this.getSnapshotState(filepath);
		const testName = [name, ...message ? [message] : []].join(" > ");
		const expectedSnapshot = snapshotState.probeExpectedSnapshot({
			testName,
			testId,
			isInline,
			inlineSnapshot
		});
		const reference = expectedSnapshot.data !== void 0 && snapshotState.snapshotUpdateState !== "all" ? adapter.parseExpected(expectedSnapshot.data) : void 0;
		const timeoutController = new AbortController();
		const stableResult = await getStableSnapshot({
			adapter,
			poll: () => poll({ signal: timeoutController.signal }),
			interval,
			timedOut: timeout > 0 ? new Promise((r) => setTimeout(() => {
				timeoutController.abort();
				r();
			}, timeout)) : void 0,
			match: reference ? (captured) => adapter.match(captured, reference).pass : void 0
		});
		expectedSnapshot.markAsChecked();
		if (stableResult?.rendered === void 0) {
			// the original caller `expect.poll` later manipulates error via `throwWithCause`,
			// so here we can directly throw `lastPollError` if exists.
			if (stableResult?.lastPollError) throw stableResult.lastPollError;
			return {
				pass: false,
				message: () => `poll() did not produce a stable snapshot within the timeout`
			};
		}
		// TODO: should `all` mode ignore parse error?
		// Silently hiding the error and creating snapshot full scratch isn't good either.
		// Users can fix or purge the broken snapshot manually and that decision affects how domain snapshot gets updated.
		const matchResult = expectedSnapshot.data !== void 0 ? adapter.match(stableResult.captured, adapter.parseExpected(expectedSnapshot.data)) : void 0;
		const { actual, expected, key, pass, update } = snapshotState.processDomainSnapshot({
			testId,
			received: stableResult.rendered,
			expectedSnapshot,
			matchResult,
			isInline,
			error,
			assertionName
		});
		return {
			pass,
			message: () => `Snapshot \`${key}\` mismatched`,
			actual: actual?.trim(),
			expected: expected?.trim(),
			meta: createMatchMeta(key, update)
		};
	}
	async assertRaw(options) {
		if (!options.rawSnapshot) throw new Error("Raw snapshot is required");
		const { filepath, rawSnapshot } = options;
		if (rawSnapshot.content == null) {
			if (!filepath) throw new Error("Snapshot cannot be used outside of test");
			const snapshotState = this.getSnapshotState(filepath);
			// save the filepath, so it don't lose even if the await make it out-of-context
			options.filepath ||= filepath;
			// resolve and read the raw snapshot file
			rawSnapshot.file = await snapshotState.environment.resolveRawPath(filepath, rawSnapshot.file);
			rawSnapshot.content = await snapshotState.environment.readSnapshotFile(rawSnapshot.file) ?? void 0;
		}
		return this.assert(options);
	}
	clear() {
		this.snapshotStateMap.clear();
	}
}
/**
* Polls repeatedly until the value reaches a stable state.
*
* Compares consecutive rendered outputs from the current session —
* when two consecutive polls produce the same rendered string,
* the value is considered stable.
*
* Every `await` (poll call, interval delay) races against `timedOut`
* so that hanging polls and delays are interrupted.
*/
async function getStableSnapshot({ adapter, poll, interval, timedOut, match }) {
	let lastRendered;
	let lastPollError;
	let lastStable;
	while (true) {
		try {
			const pollResult = await raceWith$1(Promise.resolve(poll()), timedOut);
			if (!pollResult.ok) break;
			const captured = adapter.capture(pollResult.value);
			const rendered = adapter.render(captured);
			if (lastRendered !== void 0 && rendered === lastRendered) {
				lastStable = {
					captured,
					rendered
				};
				if (!match || match(captured)) break;
			} else {
				lastRendered = rendered;
				lastStable = void 0;
			}
		} catch (pollError) {
			// poll() threw — reset stability baseline and retry
			lastRendered = void 0;
			lastStable = void 0;
			lastPollError = pollError;
		}
		if (!(await raceWith$1(new Promise((r) => setTimeout(r, interval)), timedOut)).ok) break;
	}
	return {
		...lastStable,
		lastPollError
	};
}
/** Type-safe `Promise.race` — tells you which promise won. */
function raceWith$1(promise, other) {
	const left = promise.then((value) => ({
		ok: true,
		value
	}));
	if (!other) return left;
	return Promise.race([left, other.then((value) => ({
		ok: false,
		value
	}))]);
}
function createMatchMeta(key, update) {
	return update && {
		type: "snapshot",
		key,
		update
	};
}

const ChaiStyleAssertions = (chai, utils) => {
	function defProperty(name, delegateTo) {
		utils.addProperty(chai.Assertion.prototype, name, function() {
			const jestMethod = chai.Assertion.prototype[delegateTo];
			if (!jestMethod) throw new Error(`Cannot delegate to ${String(delegateTo)}: method not found. Ensure JestChaiExpect plugin is loaded first.`);
			return jestMethod.call(this);
		});
	}
	function defPropertyWithArgs(name, delegateTo, ...args) {
		utils.addProperty(chai.Assertion.prototype, name, function() {
			const jestMethod = chai.Assertion.prototype[delegateTo];
			if (!jestMethod) throw new Error(`Cannot delegate to ${String(delegateTo)}: method not found. Ensure JestChaiExpect plugin is loaded first.`);
			return jestMethod.call(this, ...args);
		});
	}
	function defMethod(name, delegateTo) {
		utils.addMethod(chai.Assertion.prototype, name, function(...args) {
			const jestMethod = chai.Assertion.prototype[delegateTo];
			if (!jestMethod) throw new Error(`Cannot delegate to ${String(delegateTo)}: method not found. Ensure JestChaiExpect plugin is loaded first.`);
			return jestMethod.call(this, ...args);
		});
	}
	// API to (somewhat) mirror sinon-chai
	// https://github.com/chaijs/sinon-chai
	defProperty("called", "toHaveBeenCalled");
	defProperty("calledOnce", "toHaveBeenCalledOnce");
	defPropertyWithArgs("calledTwice", "toHaveBeenCalledTimes", 2);
	defPropertyWithArgs("calledThrice", "toHaveBeenCalledTimes", 3);
	defMethod("callCount", "toHaveBeenCalledTimes");
	defMethod("calledWith", "toHaveBeenCalledWith");
	defMethod("calledOnceWith", "toHaveBeenCalledExactlyOnceWith");
	defMethod("lastCalledWith", "toHaveBeenLastCalledWith");
	defMethod("nthCalledWith", "toHaveBeenNthCalledWith");
	defMethod("returned", "toHaveReturnedWith");
	defMethod("returnedWith", "toHaveReturnedWith");
	defMethod("returnedTimes", "toHaveReturnedTimes");
	defMethod("lastReturnedWith", "toHaveLastReturnedWith");
	defMethod("nthReturnedWith", "toHaveNthReturnedWith");
	defMethod("calledBefore", "toHaveBeenCalledBefore");
	defMethod("calledAfter", "toHaveBeenCalledAfter");
	// TODO: implement
	// defMethod('thrown', 'toHaveThrown')
};

const MATCHERS_OBJECT = Symbol.for("matchers-object");
const JEST_MATCHERS_OBJECT = Symbol.for("$$jest-matchers-object");
const GLOBAL_EXPECT = Symbol.for("expect-global");
const ASYMMETRIC_MATCHERS_OBJECT = Symbol.for("asymmetric-matchers-object");

// selectively ported from https://github.com/jest-community/jest-extended
const customMatchers = {
	toSatisfy(actual, expected, message) {
		const { printReceived, printExpected, matcherHint } = this.utils;
		const pass = expected(actual);
		return {
			pass,
			message: () => pass ? `\
${matcherHint(".not.toSatisfy", "received", "")}

Expected value to not satisfy:
${message || printExpected(expected)}
Received:
${printReceived(actual)}` : `\
${matcherHint(".toSatisfy", "received", "")}

Expected value to satisfy:
${message || printExpected(expected)}

Received:
${printReceived(actual)}`
		};
	},
	toBeOneOf(actual, expected) {
		const { equals, customTesters } = this;
		const { printReceived, printExpected, matcherHint, iterableEquality } = this.utils;
		const testers = [...customTesters, iterableEquality];
		let pass;
		if (Array.isArray(expected)) pass = expected.length === 0 || expected.some((item) => equals(item, actual, testers));
		else if (expected instanceof Set) pass = expected.size === 0 || expected.has(actual) || [...expected].some((item) => equals(item, actual, testers));
		else throw new TypeError(`You must provide an array or set to ${matcherHint(".toBeOneOf")}, not '${typeof expected}'.`);
		return {
			pass,
			message: () => pass ? `\
${matcherHint(".not.toBeOneOf", "received", "")}

Expected value to not be one of:
${printExpected(expected)}
Received:
${printReceived(actual)}` : `\
${matcherHint(".toBeOneOf", "received", "")}

Expected value to be one of:
${printExpected(expected)}

Received:
${printReceived(actual)}`
		};
	}
};

const EXPECTED_COLOR = $.green;
const RECEIVED_COLOR = $.red;
const INVERTED_COLOR = $.inverse;
const BOLD_WEIGHT = $.bold;
const DIM_COLOR = $.dim;
function matcherHint(matcherName, received = "received", expected = "expected", options = {}) {
	const { comment = "", isDirectExpectCall = false, isNot = false, promise = "", secondArgument = "", expectedColor = EXPECTED_COLOR, receivedColor = RECEIVED_COLOR, secondArgumentColor = EXPECTED_COLOR } = options;
	let hint = "";
	let dimString = "expect";
	if (!isDirectExpectCall && received !== "") {
		hint += DIM_COLOR(`${dimString}(`) + receivedColor(received);
		dimString = ")";
	}
	if (promise !== "") {
		hint += DIM_COLOR(`${dimString}.`) + promise;
		dimString = "";
	}
	if (isNot) {
		hint += `${DIM_COLOR(`${dimString}.`)}not`;
		dimString = "";
	}
	if (matcherName.includes("."))
 // Old format: for backward compatibility,
	// especially without promise or isNot options
	dimString += matcherName;
	else {
		// New format: omit period from matcherName arg
		hint += DIM_COLOR(`${dimString}.`) + matcherName;
		dimString = "";
	}
	if (expected === "") dimString += "()";
	else {
		hint += DIM_COLOR(`${dimString}(`) + expectedColor(expected);
		if (secondArgument) hint += DIM_COLOR(", ") + secondArgumentColor(secondArgument);
		dimString = ")";
	}
	if (comment !== "") dimString += ` // ${comment}`;
	if (dimString !== "") hint += DIM_COLOR(dimString);
	return hint;
}
const SPACE_SYMBOL = "·";
// Instead of inverse highlight which now implies a change,
// replace common spaces with middle dot at the end of any line.
function replaceTrailingSpaces(text) {
	return text.replace(/\s+$/gm, (spaces) => SPACE_SYMBOL.repeat(spaces.length));
}
function printReceived(object) {
	return RECEIVED_COLOR(replaceTrailingSpaces(stringify(object)));
}
function printExpected(value) {
	return EXPECTED_COLOR(replaceTrailingSpaces(stringify(value)));
}
function getMatcherUtils() {
	return {
		EXPECTED_COLOR,
		RECEIVED_COLOR,
		INVERTED_COLOR,
		BOLD_WEIGHT,
		DIM_COLOR,
		diff,
		matcherHint,
		printReceived,
		printExpected,
		printDiffOrStringify,
		printWithType
	};
}
function printWithType(name, value, print) {
	const type = getType(value);
	return (type !== "null" && type !== "undefined" ? `${name} has type:  ${type}\n` : "") + `${name} has value: ${print(value)}`;
}
function addCustomEqualityTesters(newTesters) {
	if (!Array.isArray(newTesters)) throw new TypeError(`expect.customEqualityTesters: Must be set to an array of Testers. Was given "${getType(newTesters)}"`);
	globalThis[JEST_MATCHERS_OBJECT].customEqualityTesters.push(...newTesters);
}
function getCustomEqualityTesters() {
	return globalThis[JEST_MATCHERS_OBJECT].customEqualityTesters;
}

// Extracted out of jasmine 2.5.2
function equals(a, b, customTesters, strictCheck) {
	customTesters = customTesters || [];
	return eq(a, b, [], [], customTesters, strictCheck ? hasKey : hasDefinedKey);
}
function isAsymmetric(obj) {
	return !!obj && typeof obj === "object" && "asymmetricMatch" in obj && isA("Function", obj.asymmetricMatch);
}
function asymmetricMatch(a, b, customTesters) {
	const asymmetricA = isAsymmetric(a);
	const asymmetricB = isAsymmetric(b);
	if (asymmetricA && asymmetricB) return;
	// Asymmetric matchers define their own subset semantics.
	const testers = customTesters.filter((tester) => !isSubsetEqualityTester(tester));
	if (asymmetricA) return a.asymmetricMatch(b, testers);
	if (asymmetricB) return b.asymmetricMatch(a, testers);
}
// https://github.com/jestjs/jest/blob/905bcbced3d40cdf7aadc4cdf6fb731c4bb3dbe3/packages/expect-utils/src/utils.ts#L509
function isError(value) {
	if (typeof Error.isError === "function") return Error.isError(value);
	switch (Object.prototype.toString.call(value)) {
		case "[object Error]":
		case "[object Exception]":
		case "[object DOMException]": return true;
		default: return value instanceof Error;
	}
}
// Equality function lovingly adapted from isEqual in
//   [Underscore](http://underscorejs.org)
function eq(a, b, aStack, bStack, customTesters, hasKey) {
	let result = true;
	const asymmetricResult = asymmetricMatch(a, b, customTesters);
	if (asymmetricResult !== void 0) return asymmetricResult;
	const testerContext = { equals };
	for (let i = 0; i < customTesters.length; i++) {
		const customTesterResult = customTesters[i].call(testerContext, a, b, customTesters);
		if (customTesterResult !== void 0) return customTesterResult;
	}
	if (typeof URL === "function" && a instanceof URL && b instanceof URL) return a.href === b.href;
	if (Object.is(a, b)) return true;
	// A strict comparison is necessary because `null == undefined`.
	if (a === null || b === null) return a === b;
	const className = Object.prototype.toString.call(a);
	if (className !== Object.prototype.toString.call(b)) return false;
	switch (className) {
		case "[object Boolean]":
		case "[object String]":
		case "[object Number]": if (typeof a !== typeof b)
 // One is a primitive, one a `new Primitive()`
		return false;
		else if (typeof a !== "object" && typeof b !== "object")
 // both are proper primitives
		return Object.is(a, b);
		else
 // both are `new Primitive()`s
		return Object.is(a.valueOf(), b.valueOf());
		case "[object Date]": {
			const numA = +a;
			const numB = +b;
			// Coerce dates to numeric primitive values. Dates are compared by their
			// millisecond representations. Note that invalid dates with millisecond representations
			// of `NaN` are equivalent.
			return numA === numB || Number.isNaN(numA) && Number.isNaN(numB);
		}
		// RegExps are compared by their source patterns and flags.
		case "[object RegExp]": return a.source === b.source && a.flags === b.flags;
		case "[object Temporal.Instant]":
		case "[object Temporal.ZonedDateTime]":
		case "[object Temporal.PlainDateTime]":
		case "[object Temporal.PlainDate]":
		case "[object Temporal.PlainTime]":
		case "[object Temporal.PlainYearMonth]":
		case "[object Temporal.PlainMonthDay]": return a.equals(b);
		case "[object Temporal.Duration]": return a.toString() === b.toString();
	}
	if (typeof a !== "object" || typeof b !== "object") return false;
	// Use DOM3 method isEqualNode (IE>=9)
	if (isDomNode(a) && isDomNode(b)) return a.isEqualNode(b);
	// Used to detect circular references.
	let length = aStack.length;
	while (length--)
 // Linear search. Performance is inversely proportional to the number of
	// unique nested structures.
	// circular references at same depth are equal
	// circular reference is not equal to non-circular one
	if (aStack[length] === a) return bStack[length] === b;
	else if (bStack[length] === b) return false;
	// Add the first object to the stack of traversed objects.
	aStack.push(a);
	bStack.push(b);
	// Recursively compare objects and arrays.
	// Compare array lengths to determine if a deep comparison is necessary.
	if (className === "[object Array]" && a.length !== b.length) return false;
	if (isError(a) && isError(b)) try {
		return isErrorEqual(a, b, aStack, bStack, customTesters, hasKey);
	} finally {
		aStack.pop();
		bStack.pop();
	}
	// Deep compare objects.
	const aKeys = keys(a, hasKey);
	let key;
	let size = aKeys.length;
	// Ensure that both objects contain the same number of properties before comparing deep equality.
	if (keys(b, hasKey).length !== size) return false;
	while (size--) {
		key = aKeys[size];
		// Deep compare each member
		result = hasKey(b, key) && eq(a[key], b[key], aStack, bStack, customTesters, hasKey);
		if (!result) return false;
	}
	// Remove the first object from the stack of traversed objects.
	aStack.pop();
	bStack.pop();
	return result;
}
function isErrorEqual(a, b, aStack, bStack, customTesters, hasKey) {
	// https://nodejs.org/docs/latest-v22.x/api/assert.html#comparison-details
	// - [[Prototype]] of objects are compared using the === operator.
	// - Only enumerable "own" properties are considered.
	// - Error names, messages, causes, and errors are always compared, even if these are not enumerable properties. errors is also compared.
	let result = Object.prototype.toString.call(a) === Object.prototype.toString.call(b) && a.name === b.name && a.message === b.message;
	// check Error.cause asymmetrically
	if (typeof b.cause !== "undefined") result &&= eq(a.cause, b.cause, aStack, bStack, customTesters, hasKey);
	// AggregateError.errors
	if (a instanceof AggregateError && b instanceof AggregateError) result &&= eq(a.errors, b.errors, aStack, bStack, customTesters, hasKey);
	// spread to compare enumerable properties
	result &&= eq({ ...a }, { ...b }, aStack, bStack, customTesters, hasKey);
	return result;
}
function keys(obj, hasKey) {
	const keys = [];
	for (const key in obj) if (hasKey(obj, key)) keys.push(key);
	return keys.concat(Object.getOwnPropertySymbols(obj).filter((symbol) => Object.getOwnPropertyDescriptor(obj, symbol).enumerable));
}
function hasDefinedKey(obj, key) {
	return hasKey(obj, key) && obj[key] !== void 0;
}
function hasKey(obj, key) {
	return Object.hasOwn(obj, key);
}
function isA(typeName, value) {
	return Object.prototype.toString.apply(value) === `[object ${typeName}]`;
}
function isDomNode(obj) {
	return obj !== null && typeof obj === "object" && "nodeType" in obj && typeof obj.nodeType === "number" && "nodeName" in obj && typeof obj.nodeName === "string" && "isEqualNode" in obj && typeof obj.isEqualNode === "function";
}
// SENTINEL constants are from https://github.com/immutable-js/immutable-js
const IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
const IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
const IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
const IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
const IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
function isImmutableUnorderedKeyed(maybeKeyed) {
	return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL] && !maybeKeyed[IS_ORDERED_SENTINEL]);
}
function isImmutableUnorderedSet(maybeSet) {
	return !!(maybeSet && maybeSet[IS_SET_SENTINEL] && !maybeSet[IS_ORDERED_SENTINEL]);
}
function isObjectLiteral(source) {
	return source != null && typeof source === "object" && !Array.isArray(source);
}
function isImmutableList(source) {
	return Boolean(source && isObjectLiteral(source) && source[IS_LIST_SENTINEL]);
}
function isImmutableOrderedKeyed(source) {
	return Boolean(source && isObjectLiteral(source) && source[IS_KEYED_SENTINEL] && source[IS_ORDERED_SENTINEL]);
}
function isImmutableOrderedSet(source) {
	return Boolean(source && isObjectLiteral(source) && source[IS_SET_SENTINEL] && source[IS_ORDERED_SENTINEL]);
}
function isImmutableRecord(source) {
	return Boolean(source && isObjectLiteral(source) && source[IS_RECORD_SYMBOL]);
}
/**
* Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
*/
const IteratorSymbol = Symbol.iterator;
function hasIterator(object) {
	return !!(object != null && object[IteratorSymbol]);
}
function isTypedArray(value) {
	return ArrayBuffer.isView(value);
}
function getNonIndexEntries(typedArray) {
	return Object.keys(typedArray).slice(typedArray.length).map((key) => [key, Reflect.get(typedArray, key)]);
}
function iterableEquality(a, b, customTesters = [], aStack = [], bStack = []) {
	if (typeof a !== "object" || typeof b !== "object" || Array.isArray(a) || Array.isArray(b) || !hasIterator(a) || !hasIterator(b)) return;
	if (a.constructor !== b.constructor) return false;
	let length = aStack.length;
	while (length--)
 // Linear search. Performance is inversely proportional to the number of
	// unique nested structures.
	// circular references at same depth are equal
	// circular reference is not equal to non-circular one
	if (aStack[length] === a) return bStack[length] === b;
	aStack.push(a);
	bStack.push(b);
	const filteredCustomTesters = [...customTesters.filter((t) => t !== iterableEquality), iterableEqualityWithStack];
	function iterableEqualityWithStack(a, b) {
		return iterableEquality(a, b, [...customTesters], [...aStack], [...bStack]);
	}
	if (a.size !== void 0) {
		if (a.size !== b.size) return false;
		else if (isA("Set", a) || isImmutableUnorderedSet(a)) {
			let allFound = true;
			for (const aValue of a) if (!b.has(aValue)) {
				let has = false;
				for (const bValue of b) if (equals(aValue, bValue, filteredCustomTesters) === true) has = true;
				if (has === false) {
					allFound = false;
					break;
				}
			}
			// Remove the first value from the stack of traversed values.
			aStack.pop();
			bStack.pop();
			return allFound;
		} else if (isA("Map", a) || isImmutableUnorderedKeyed(a)) {
			let allFound = true;
			for (const aEntry of a) if (!b.has(aEntry[0]) || !equals(aEntry[1], b.get(aEntry[0]), filteredCustomTesters)) {
				let has = false;
				for (const bEntry of b) {
					const matchedKey = equals(aEntry[0], bEntry[0], filteredCustomTesters);
					let matchedValue = false;
					if (matchedKey === true) matchedValue = equals(aEntry[1], bEntry[1], filteredCustomTesters);
					if (matchedValue === true) has = true;
				}
				if (has === false) {
					allFound = false;
					break;
				}
			}
			// Remove the first value from the stack of traversed values.
			aStack.pop();
			bStack.pop();
			return allFound;
		}
	}
	if (isTypedArray(a) && isTypedArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) if (!Object.is(a[i], b[i]) && !equals(a[i], b[i], filteredCustomTesters)) return false;
		if (!equals(getNonIndexEntries(a), getNonIndexEntries(b), filteredCustomTesters)) return false;
		aStack.pop();
		bStack.pop();
		return true;
	}
	const bIterator = b[IteratorSymbol]();
	for (const aValue of a) {
		const nextB = bIterator.next();
		if (nextB.done || !equals(aValue, nextB.value, filteredCustomTesters)) return false;
	}
	if (!bIterator.next().done) return false;
	if (!isImmutableList(a) && !isImmutableOrderedKeyed(a) && !isImmutableOrderedSet(a) && !isImmutableRecord(a)) {
		if (!equals(Object.entries(a), Object.entries(b), filteredCustomTesters)) return false;
	}
	// Remove the first value from the stack of traversed values.
	aStack.pop();
	bStack.pop();
	return true;
}
/**
* Checks if `hasOwnProperty(object, key)` up the prototype chain, stopping at `Object.prototype`.
*/
function hasPropertyInObject(object, key) {
	if (!object || typeof object !== "object" || object === Object.prototype) return false;
	return Object.hasOwn(object, key) || hasPropertyInObject(Object.getPrototypeOf(object), key);
}
function isObjectWithKeys(a) {
	return isObject(a) && !isError(a) && !Array.isArray(a) && !(a instanceof Date) && !(a instanceof Set) && !(a instanceof Map);
}
// Recursive subset testers are closures, so track them by identity.
const subsetEqualityTesters = /* @__PURE__ */ new WeakSet();
function registerSubsetEqualityTester(tester) {
	subsetEqualityTesters.add(tester);
	return tester;
}
function isSubsetEqualityTester(tester) {
	return tester === subsetEquality || subsetEqualityTesters.has(tester);
}
function subsetEquality(object, subset, customTesters = []) {
	const filteredCustomTesters = customTesters.filter((t) => t !== subsetEquality);
	// subsetEquality needs to keep track of the references
	// it has already visited to avoid infinite loops in case
	// there are circular references in the subset passed to it.
	const subsetEqualityWithContext = (seenReferences = /* @__PURE__ */ new WeakMap()) => registerSubsetEqualityTester((object, subset) => {
		if (!isObjectWithKeys(subset)) return;
		return Object.keys(subset).every((key) => {
			if (subset[key] != null && typeof subset[key] === "object") {
				if (seenReferences.has(subset[key])) return equals(object[key], subset[key], filteredCustomTesters);
				seenReferences.set(subset[key], true);
			}
			const result = object != null && hasPropertyInObject(object, key) && equals(object[key], subset[key], [...filteredCustomTesters, subsetEqualityWithContext(seenReferences)]);
			// The main goal of using seenReference is to avoid circular node on tree.
			// It will only happen within a parent and its child, not a node and nodes next to it (same level)
			// We should keep the reference for a parent and its child only
			// Thus we should delete the reference immediately so that it doesn't interfere
			// other nodes within the same level on tree.
			seenReferences.delete(subset[key]);
			return result;
		});
	});
	return subsetEqualityWithContext()(object, subset);
}
function typeEquality(a, b) {
	if (a == null || b == null || a.constructor === b.constructor) return;
	return false;
}
function arrayBufferEquality(a, b) {
	let dataViewA = a;
	let dataViewB = b;
	if (!(a instanceof DataView && b instanceof DataView)) {
		if (!(a instanceof ArrayBuffer) || !(b instanceof ArrayBuffer)) return;
		try {
			dataViewA = new DataView(a);
			dataViewB = new DataView(b);
		} catch {
			return;
		}
	}
	// Buffers are not equal when they do not have the same byte length
	if (dataViewA.byteLength !== dataViewB.byteLength) return false;
	// Check if every byte value is equal to each other
	for (let i = 0; i < dataViewA.byteLength; i++) if (dataViewA.getUint8(i) !== dataViewB.getUint8(i)) return false;
	return true;
}
function sparseArrayEquality(a, b, customTesters = []) {
	if (!Array.isArray(a) || !Array.isArray(b)) return;
	// A sparse array [, , 1] will have keys ["2"] whereas [undefined, undefined, 1] will have keys ["0", "1", "2"]
	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);
	return equals(a, b, customTesters.filter((t) => t !== sparseArrayEquality), true) && equals(aKeys, bKeys);
}
function generateToBeMessage(deepEqualityName, expected = "#{this}", actual = "#{exp}") {
	const toBeMessage = `expected ${expected} to be ${actual} // Object.is equality`;
	if (["toStrictEqual", "toEqual"].includes(deepEqualityName)) return `${toBeMessage}\n\nIf it should pass with deep equality, replace "toBe" with "${deepEqualityName}"\n\nExpected: ${expected}\nReceived: serializes to the same string\n`;
	return toBeMessage;
}
function pluralize(word, count) {
	return `${count} ${word}${count === 1 ? "" : "s"}`;
}
function getObjectKeys(object) {
	return [...Object.keys(object), ...Object.getOwnPropertySymbols(object).filter((s) => Object.getOwnPropertyDescriptor(object, s)?.enumerable)];
}
function getObjectSubset(object, subset, customTesters) {
	let stripped = 0;
	const getObjectSubsetWithContext = (seenReferences = /* @__PURE__ */ new WeakMap()) => (object, subset) => {
		if (Array.isArray(object)) {
			if (Array.isArray(subset) && subset.length === object.length)
 // The map method returns correct subclass of subset.
			return subset.map((sub, i) => getObjectSubsetWithContext(seenReferences)(object[i], sub));
		} else if (object instanceof Date) return object;
		else if (isObject(object) && isObject(subset)) {
			if (equals(object, subset, [
				...customTesters,
				iterableEquality,
				subsetEquality
			]))
 // return "expected" subset to avoid showing irrelevant toMatchObject diff
			return subset;
			const trimmed = {};
			seenReferences.set(object, trimmed);
			// preserve constructor for toMatchObject diff
			if (typeof object.constructor === "function" && typeof object.constructor.name === "string") Object.defineProperty(trimmed, "constructor", {
				enumerable: false,
				value: object.constructor
			});
			for (const key of getObjectKeys(object)) if (hasPropertyInObject(subset, key)) trimmed[key] = seenReferences.has(object[key]) ? seenReferences.get(object[key]) : getObjectSubsetWithContext(seenReferences)(object[key], subset[key]);
			else if (!seenReferences.has(object[key])) {
				stripped += 1;
				if (isObject(object[key])) stripped += getObjectKeys(object[key]).length;
				getObjectSubsetWithContext(seenReferences)(object[key], subset[key]);
			}
			if (getObjectKeys(trimmed).length > 0) return trimmed;
		}
		return object;
	};
	return {
		subset: getObjectSubsetWithContext()(object, subset),
		stripped
	};
}
/**
* Detects if an object is a Standard Schema V1 compatible schema
*/
function isStandardSchema(obj) {
	return !!obj && (typeof obj === "object" || typeof obj === "function") && obj["~standard"] && typeof obj["~standard"].validate === "function";
}

if (!Object.hasOwn(globalThis, MATCHERS_OBJECT)) {
	const globalState = /* @__PURE__ */ new WeakMap();
	const matchers = Object.create(null);
	const customEqualityTesters = [];
	const asymmetricMatchers = Object.create(null);
	// `configurable` so that vm pools can strip the accessors from a disposed
	// context: the getters capture the expect state, which would otherwise keep
	// the whole test-file world reachable from the leaked context shell
	Object.defineProperty(globalThis, MATCHERS_OBJECT, {
		configurable: true,
		get: () => globalState
	});
	Object.defineProperty(globalThis, JEST_MATCHERS_OBJECT, {
		configurable: true,
		get: () => ({
			state: globalState.get(globalThis[GLOBAL_EXPECT]),
			matchers,
			customEqualityTesters
		})
	});
	Object.defineProperty(globalThis, ASYMMETRIC_MATCHERS_OBJECT, {
		configurable: true,
		get: () => asymmetricMatchers
	});
}
function getState(expect) {
	return globalThis[MATCHERS_OBJECT].get(expect);
}
function setState(state, expect) {
	const map = globalThis[MATCHERS_OBJECT];
	const current = map.get(expect);
	// so it keeps getters from `testPath`
	const next = Object.defineProperties(current || {}, Object.getOwnPropertyDescriptors(state));
	if (!current) map.set(expect, next);
}

class AsymmetricMatcher {
	sample;
	inverse;
	// should have "jest" to be compatible with its ecosystem
	$$typeof = Symbol.for("jest.asymmetricMatcher");
	constructor(sample, inverse = false) {
		this.sample = sample;
		this.inverse = inverse;
	}
	getMatcherContext(expect) {
		return {
			...getState(expect || globalThis[GLOBAL_EXPECT]),
			equals,
			isNot: this.inverse,
			customTesters: getCustomEqualityTesters(),
			utils: {
				...getMatcherUtils(),
				diff,
				stringify,
				iterableEquality,
				subsetEquality
			}
		};
	}
}
// implement custom chai/loupe inspect for better AssertionError.message formatting
// https://github.com/chaijs/loupe/blob/9b8a6deabcd50adc056a64fb705896194710c5c6/src/index.ts#L29
// @ts-expect-error computed properties is not supported when isolatedDeclarations is enabled
// FIXME: https://github.com/microsoft/TypeScript/issues/61068
AsymmetricMatcher.prototype[Symbol.for("chai/inspect")] = function(options) {
	// minimal pretty-format with simple manual truncation
	const result = stringify(this, options.depth, { min: true });
	if (result.length <= options.truncate) return result;
	return `${this.toString()}{…}`;
};
class StringContaining extends AsymmetricMatcher {
	constructor(sample, inverse = false) {
		if (!isA("String", sample)) throw new Error("Expected is not a string");
		super(sample, inverse);
	}
	asymmetricMatch(other) {
		const result = isA("String", other) && other.includes(this.sample);
		return this.inverse ? !result : result;
	}
	toString() {
		return `String${this.inverse ? "Not" : ""}Containing`;
	}
	getExpectedType() {
		return "string";
	}
}
class Anything extends AsymmetricMatcher {
	asymmetricMatch(other) {
		return other != null;
	}
	toString() {
		return "Anything";
	}
	toAsymmetricMatcher() {
		return "Anything";
	}
}
class ObjectContaining extends AsymmetricMatcher {
	constructor(sample, inverse = false) {
		super(sample, inverse);
	}
	getPrototype(obj) {
		if (Object.getPrototypeOf) return Object.getPrototypeOf(obj);
		if (obj.constructor.prototype === obj) return null;
		return obj.constructor.prototype;
	}
	hasProperty(obj, property) {
		if (!obj) return false;
		if (Object.hasOwn(obj, property)) return true;
		return this.hasProperty(this.getPrototype(obj), property);
	}
	getProperties(obj) {
		return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj).filter((s) => Object.getOwnPropertyDescriptor(obj, s)?.enumerable)];
	}
	asymmetricMatch(other, customTesters) {
		if (typeof this.sample !== "object") throw new TypeError(`You must provide an object to ${this.toString()}, not '${typeof this.sample}'.`);
		let result = true;
		const properties = this.getProperties(this.sample);
		for (const property of properties) {
			if (!this.hasProperty(other, property)) {
				result = false;
				break;
			}
			const value = this.sample[property];
			const otherValue = other[property];
			if (!equals(value, otherValue, customTesters)) {
				result = false;
				break;
			}
		}
		return this.inverse ? !result : result;
	}
	toString() {
		return `Object${this.inverse ? "Not" : ""}Containing`;
	}
	getExpectedType() {
		return "object";
	}
}
class ArrayContaining extends AsymmetricMatcher {
	constructor(sample, inverse = false) {
		super(sample, inverse);
	}
	asymmetricMatch(other, customTesters) {
		if (!Array.isArray(this.sample)) throw new TypeError(`You must provide an array to ${this.toString()}, not '${typeof this.sample}'.`);
		const result = this.sample.length === 0 || Array.isArray(other) && this.sample.every((item) => other.some((another) => equals(item, another, customTesters)));
		return this.inverse ? !result : result;
	}
	toString() {
		return `Array${this.inverse ? "Not" : ""}Containing`;
	}
	getExpectedType() {
		return "array";
	}
}
class Any extends AsymmetricMatcher {
	constructor(sample) {
		if (typeof sample === "undefined") throw new TypeError("any() expects to be passed a constructor function. Please pass one or use anything() to match any object.");
		super(sample);
	}
	fnNameFor(func) {
		if (func.name) return func.name;
		const matches = Function.prototype.toString.call(func).match(/^(?:async)?\s*function\s*(?:\*\s*)?([\w$]+)\s*\(/);
		return matches ? matches[1] : "<anonymous>";
	}
	asymmetricMatch(other) {
		if (this.sample === String) return typeof other == "string" || other instanceof String;
		if (this.sample === Number) return typeof other == "number" || other instanceof Number;
		if (this.sample === Function) return typeof other == "function" || typeof other === "function";
		if (this.sample === Boolean) return typeof other == "boolean" || other instanceof Boolean;
		if (this.sample === BigInt) return typeof other == "bigint" || other instanceof BigInt;
		if (this.sample === Symbol) return typeof other == "symbol" || other instanceof Symbol;
		if (this.sample === Object) return typeof other == "object";
		return other instanceof this.sample;
	}
	toString() {
		return "Any";
	}
	getExpectedType() {
		if (this.sample === String) return "string";
		if (this.sample === Number) return "number";
		if (this.sample === Function) return "function";
		if (this.sample === Object) return "object";
		if (this.sample === Boolean) return "boolean";
		return this.fnNameFor(this.sample);
	}
	toAsymmetricMatcher() {
		return `Any<${this.fnNameFor(this.sample)}>`;
	}
}
class StringMatching extends AsymmetricMatcher {
	constructor(sample, inverse = false) {
		if (!isA("String", sample) && !isA("RegExp", sample)) throw new Error("Expected is not a String or a RegExp");
		super(new RegExp(sample), inverse);
	}
	asymmetricMatch(other) {
		const result = isA("String", other) && this.sample.test(other);
		return this.inverse ? !result : result;
	}
	toString() {
		return `String${this.inverse ? "Not" : ""}Matching`;
	}
	getExpectedType() {
		return "string";
	}
}
class CloseTo extends AsymmetricMatcher {
	precision;
	constructor(sample, precision = 2, inverse = false) {
		if (!isA("Number", sample)) throw new Error("Expected is not a Number");
		if (!isA("Number", precision)) throw new Error("Precision is not a Number");
		super(sample);
		this.inverse = inverse;
		this.precision = precision;
	}
	asymmetricMatch(other) {
		if (!isA("Number", other)) return false;
		let result = false;
		if (other === Number.POSITIVE_INFINITY && this.sample === Number.POSITIVE_INFINITY) result = true;
		else if (other === Number.NEGATIVE_INFINITY && this.sample === Number.NEGATIVE_INFINITY) result = true;
		else result = Math.abs(this.sample - other) < 10 ** -this.precision / 2;
		return this.inverse ? !result : result;
	}
	toString() {
		return `Number${this.inverse ? "Not" : ""}CloseTo`;
	}
	getExpectedType() {
		return "number";
	}
	toAsymmetricMatcher() {
		return [
			this.toString(),
			this.sample,
			`(${pluralize("digit", this.precision)})`
		].join(" ");
	}
}
class SchemaMatching extends AsymmetricMatcher {
	result;
	constructor(sample, inverse = false) {
		if (!isStandardSchema(sample)) throw new TypeError("SchemaMatching expected to receive a Standard Schema.");
		super(sample, inverse);
	}
	asymmetricMatch(other) {
		const result = this.sample["~standard"].validate(other);
		// Check if the result is a Promise (async validation)
		if (result instanceof Promise) throw new TypeError("Async schema validation is not supported in asymmetric matchers.");
		this.result = result;
		const pass = !this.result.issues || this.result.issues.length === 0;
		return this.inverse ? !pass : pass;
	}
	toString() {
		return `Schema${this.inverse ? "Not" : ""}Matching`;
	}
	getExpectedType() {
		return "object";
	}
	toAsymmetricMatcher() {
		const { utils } = this.getMatcherContext();
		if ((this.result?.issues || []).length > 0) return `${this.toString()} ${utils.stringify(this.result, void 0, { printBasicPrototype: false })}`;
		return this.toString();
	}
}
const JestAsymmetricMatchers = (chai, utils) => {
	utils.addMethod(chai.expect, "anything", () => new Anything());
	utils.addMethod(chai.expect, "any", (expected) => new Any(expected));
	utils.addMethod(chai.expect, "stringContaining", (expected) => new StringContaining(expected));
	utils.addMethod(chai.expect, "objectContaining", (expected) => new ObjectContaining(expected));
	utils.addMethod(chai.expect, "arrayContaining", (expected) => new ArrayContaining(expected));
	utils.addMethod(chai.expect, "stringMatching", (expected) => new StringMatching(expected));
	utils.addMethod(chai.expect, "closeTo", (expected, precision) => new CloseTo(expected, precision));
	utils.addMethod(chai.expect, "schemaMatching", (expected) => new SchemaMatching(expected));
	chai.expect.not = {
		stringContaining: (expected) => new StringContaining(expected, true),
		objectContaining: (expected) => new ObjectContaining(expected, true),
		arrayContaining: (expected) => new ArrayContaining(expected, true),
		stringMatching: (expected) => new StringMatching(expected, true),
		closeTo: (expected, precision) => new CloseTo(expected, precision, true),
		schemaMatching: (expected) => new SchemaMatching(expected, true)
	};
};

function createAssertionMessage(util, assertion, hasArgs) {
	const soft = util.flag(assertion, "soft") ? ".soft" : "";
	const not = util.flag(assertion, "negate") ? "not." : "";
	const name = `${util.flag(assertion, "_name")}(${hasArgs ? "expected" : ""})`;
	const promiseName = util.flag(assertion, "promise");
	return `expect${soft}(actual)${promiseName ? `.${promiseName}` : ""}.${not}${name}`;
}
function recordAsyncExpect(_test, promise, assertion, error, isSoft) {
	const test = _test;
	// record promise for test, that resolves before test ends
	if (test && promise instanceof Promise) {
		// if promise is explicitly awaited, remove it from the list
		promise = promise.finally(() => {
			if (!test.promises) return;
			const index = test.promises.indexOf(promise);
			if (index !== -1) test.promises.splice(index, 1);
		});
		// record promise
		if (!test.promises) test.promises = [];
		// setup `expect.soft` handler here instead of `wrapAssertion`
		// to avoid double error tracking while keeping non-await promise detection.
		if (isSoft) promise = promise.then(noop, (err) => {
			handleTestError(test, err);
		});
		test.promises.push(promise);
		let resolved = false;
		test.onFinished ??= [];
		test.onFinished.push(() => {
			if (!resolved) {
				const awaitError = /* @__PURE__ */ new Error(`Promise returned by \`${assertion}\` was not awaited. This assertion is asynchronous and must be awaited; otherwise, it is not guaranteed to complete before the test finishes:\n\nawait ${assertion}\n`);
				if (error.stack) awaitError.stack = error.stack.replace(error.message, awaitError.message);
				throw awaitError;
			}
		});
		return {
			then(onFulfilled, onRejected) {
				resolved = true;
				return promise.then(onFulfilled, onRejected);
			},
			catch(onRejected) {
				resolved = true;
				return promise.catch(onRejected);
			},
			finally(onFinally) {
				resolved = true;
				return promise.finally(onFinally);
			},
			[Symbol.toStringTag]: "Promise"
		};
	}
	return promise;
}
function handleTestError(test, err) {
	test.result ||= { state: "fail" };
	test.result.state = "fail";
	test.result.errors ||= [];
	test.result.errors.push(processError(err));
}
/** wrap assertion function to support `expect.soft` and provide assertion name as `_name` */
function wrapAssertion(utils, name, fn) {
	return function(...args) {
		// private
		if (name !== "withTest") utils.flag(this, "_name", name);
		if (!(utils.flag(this, "soft") && !utils.flag(this, "promise")))
 // avoid WebKit's proper tail call to preserve stacktrace offset for inline snapshot
		// https://webkit.org/blog/6240/ecmascript-6-proper-tail-calls-in-webkit
		try {
			return fn.apply(this, args);
		} finally {}
		const test = utils.flag(this, "vitest-test");
		if (!test) throw new Error("expect.soft() can only be used inside a test");
		try {
			const result = fn.apply(this, args);
			if (result && typeof result === "object" && typeof result.then === "function") return result.then(noop, (err) => {
				handleTestError(test, err);
			});
			return result;
		} catch (err) {
			handleTestError(test, err);
		}
	};
}

// Jest Expect Compact
const JestChaiExpect = (chai, utils) => {
	const { AssertionError } = chai;
	const customTesters = getCustomEqualityTesters();
	function def(name, fn) {
		const addMethod = (n) => {
			const softWrapper = wrapAssertion(utils, n, fn);
			utils.addMethod(chai.Assertion.prototype, n, softWrapper);
			utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, n, softWrapper);
		};
		if (Array.isArray(name)) name.forEach((n) => addMethod(n));
		else addMethod(name);
	}
	[
		"throw",
		"throws",
		"Throw"
	].forEach((m) => {
		utils.overwriteMethod(chai.Assertion.prototype, m, (_super) => {
			return function(...args) {
				const promise = utils.flag(this, "promise");
				const object = utils.flag(this, "object");
				const isNot = utils.flag(this, "negate");
				if (promise === "rejects") utils.flag(this, "object", () => {
					throw object;
				});
				else if (promise === "resolves" && typeof object !== "function") {
					if (!isNot) {
						const message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't";
						throw new AssertionError(message, { showDiff: false }, utils.flag(this, "ssfi"));
					} else return;
				}
				_super.apply(this, args);
			};
		});
	});
	// @ts-expect-error @internal
	def("withTest", function(test) {
		utils.flag(this, "vitest-test", test);
		return this;
	});
	def("toEqual", function(expected) {
		const actual = utils.flag(this, "object");
		const equal = equals(actual, expected, [...customTesters, iterableEquality]);
		return this.assert(equal, "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", expected, actual);
	});
	def("toStrictEqual", function(expected) {
		const obj = utils.flag(this, "object");
		const equal = equals(obj, expected, [
			...customTesters,
			iterableEquality,
			typeEquality,
			sparseArrayEquality,
			arrayBufferEquality
		], true);
		return this.assert(equal, "expected #{this} to strictly equal #{exp}", "expected #{this} to not strictly equal #{exp}", expected, obj);
	});
	def("toBe", function(expected) {
		const actual = this._obj;
		const pass = Object.is(actual, expected);
		let deepEqualityName = "";
		if (!pass) {
			if (equals(actual, expected, [
				...customTesters,
				iterableEquality,
				typeEquality,
				sparseArrayEquality,
				arrayBufferEquality
			], true)) deepEqualityName = "toStrictEqual";
			else if (equals(actual, expected, [...customTesters, iterableEquality])) deepEqualityName = "toEqual";
		}
		return this.assert(pass, generateToBeMessage(deepEqualityName), "expected #{this} not to be #{exp} // Object.is equality", expected, actual);
	});
	def("toMatchObject", function(expected) {
		const actual = this._obj;
		const pass = equals(actual, expected, [
			...customTesters,
			iterableEquality,
			subsetEquality
		]);
		const isNot = utils.flag(this, "negate");
		const { subset: actualSubset, stripped } = getObjectSubset(actual, expected, customTesters);
		if (pass && isNot || !pass && !isNot) {
			const msg = utils.getMessage(this, [
				pass,
				"expected #{this} to match object #{exp}",
				"expected #{this} to not match object #{exp}",
				expected,
				actualSubset,
				false
			]);
			const message = stripped === 0 ? msg : `${msg}\n(${stripped} matching ${stripped === 1 ? "property" : "properties"} omitted from actual)`;
			throw new AssertionError(message, {
				showDiff: true,
				expected,
				actual: actualSubset
			});
		}
	});
	def("toMatch", function(expected) {
		const actual = this._obj;
		if (typeof actual !== "string") throw new TypeError(`.toMatch() expects to receive a string, but got ${typeof actual}`);
		return this.assert(typeof expected === "string" ? actual.includes(expected) : actual.match(expected), `expected #{this} to match #{exp}`, `expected #{this} not to match #{exp}`, expected, actual);
	});
	def("toContain", function(item) {
		const actual = this._obj;
		if (typeof Node !== "undefined" && actual instanceof Node) {
			if (!(item instanceof Node)) throw new TypeError(`toContain() expected a DOM node as the argument, but got ${typeof item}`);
			return this.assert(actual.contains(item), "expected #{this} to contain element #{exp}", "expected #{this} not to contain element #{exp}", item, actual);
		}
		if (typeof DOMTokenList !== "undefined" && actual instanceof DOMTokenList) {
			assertTypes(item, "class name", ["string"]);
			const expectedClassList = utils.flag(this, "negate") ? actual.value.replace(item, "").trim() : `${actual.value} ${item}`;
			return this.assert(actual.contains(item), `expected "${actual.value}" to contain "${item}"`, `expected "${actual.value}" not to contain "${item}"`, expectedClassList, actual.value);
		}
		// handle simple case on our own using `this.assert` to include diff in error message
		if (typeof actual === "string" && typeof item === "string") return this.assert(actual.includes(item), `expected #{this} to contain #{exp}`, `expected #{this} not to contain #{exp}`, item, actual);
		// make "actual" indexable to have compatibility with jest
		if (actual != null && typeof actual !== "string") utils.flag(this, "object", Array.from(actual));
		return this.contain(item);
	});
	def("toContainEqual", function(expected) {
		const obj = utils.flag(this, "object");
		const index = Array.from(obj).findIndex((item) => {
			return equals(item, expected, [...customTesters, iterableEquality]);
		});
		this.assert(index !== -1, "expected #{this} to deep equally contain #{exp}", "expected #{this} to not deep equally contain #{exp}", expected);
	});
	def("toBeTruthy", function() {
		const obj = utils.flag(this, "object");
		this.assert(Boolean(obj), "expected #{this} to be truthy", "expected #{this} to not be truthy", true, obj);
	});
	def("toBeFalsy", function() {
		const obj = utils.flag(this, "object");
		this.assert(!obj, "expected #{this} to be falsy", "expected #{this} to not be falsy", false, obj);
	});
	def("toBeGreaterThan", function(expected) {
		const actual = this._obj;
		assertTypes(actual, "actual", ["number", "bigint"]);
		assertTypes(expected, "expected", ["number", "bigint"]);
		return this.assert(actual > expected, `expected ${actual} to be greater than ${expected}`, `expected ${actual} to be not greater than ${expected}`, expected, actual, false);
	});
	def("toBeGreaterThanOrEqual", function(expected) {
		const actual = this._obj;
		assertTypes(actual, "actual", ["number", "bigint"]);
		assertTypes(expected, "expected", ["number", "bigint"]);
		return this.assert(actual >= expected, `expected ${actual} to be greater than or equal to ${expected}`, `expected ${actual} to be not greater than or equal to ${expected}`, expected, actual, false);
	});
	def("toBeLessThan", function(expected) {
		const actual = this._obj;
		assertTypes(actual, "actual", ["number", "bigint"]);
		assertTypes(expected, "expected", ["number", "bigint"]);
		return this.assert(actual < expected, `expected ${actual} to be less than ${expected}`, `expected ${actual} to be not less than ${expected}`, expected, actual, false);
	});
	def("toBeLessThanOrEqual", function(expected) {
		const actual = this._obj;
		assertTypes(actual, "actual", ["number", "bigint"]);
		assertTypes(expected, "expected", ["number", "bigint"]);
		return this.assert(actual <= expected, `expected ${actual} to be less than or equal to ${expected}`, `expected ${actual} to be not less than or equal to ${expected}`, expected, actual, false);
	});
	def("toBeNaN", function() {
		const obj = utils.flag(this, "object");
		this.assert(Number.isNaN(obj), "expected #{this} to be NaN", "expected #{this} not to be NaN", NaN, obj);
	});
	def("toBeUndefined", function() {
		const obj = utils.flag(this, "object");
		this.assert(void 0 === obj, "expected #{this} to be undefined", "expected #{this} not to be undefined", void 0, obj);
	});
	def("toBeNull", function() {
		const obj = utils.flag(this, "object");
		this.assert(obj === null, "expected #{this} to be null", "expected #{this} not to be null", null, obj);
	});
	def("toBeNullable", function() {
		const obj = utils.flag(this, "object");
		this.assert(obj == null, "expected #{this} to be nullish", "expected #{this} not to be nullish", null, obj);
	});
	def("toBeDefined", function() {
		const obj = utils.flag(this, "object");
		this.assert(typeof obj !== "undefined", "expected #{this} to be defined", "expected #{this} to be undefined", obj);
	});
	def("toBeTypeOf", function(expected) {
		const actual = typeof this._obj;
		const equal = expected === actual;
		return this.assert(equal, "expected #{this} to be type of #{exp}", "expected #{this} not to be type of #{exp}", expected, actual);
	});
	def("toBeInstanceOf", function(obj) {
		return this.instanceOf(obj);
	});
	def("toHaveLength", function(length) {
		return this.have.length(length);
	});
	// destructuring, because it checks `arguments` inside, and value is passing as `undefined`
	def("toHaveProperty", function(...args) {
		if (Array.isArray(args[0])) args[0] = args[0].map((key) => String(key).replace(/([.[\]])/g, "\\$1")).join(".");
		const actual = this._obj;
		if (actual == null) throw new TypeError(`.toHaveProperty() expects to receive a valid object, but got ${actual}`);
		const [propertyName, expected] = args;
		const getValue = () => {
			if (Object.hasOwn(actual, propertyName)) return {
				value: actual[propertyName],
				exists: true
			};
			return utils.getPathInfo(actual, propertyName);
		};
		const { value, exists } = getValue();
		const pass = exists && (args.length === 1 || equals(expected, value, [...customTesters, iterableEquality]));
		const valueString = args.length === 1 ? "" : ` with value ${inspect(expected, { truncate: 40 })}`;
		return this.assert(pass, `expected #{this} to have property "${propertyName}"${valueString}`, `expected #{this} to not have property "${propertyName}"${valueString}`, expected, exists ? value : void 0);
	});
	def("toBeCloseTo", function(received, precision = 2) {
		const expected = this._obj;
		let pass = false;
		let expectedDiff = 0;
		let receivedDiff = 0;
		if (received === Number.POSITIVE_INFINITY && expected === Number.POSITIVE_INFINITY) pass = true;
		else if (received === Number.NEGATIVE_INFINITY && expected === Number.NEGATIVE_INFINITY) pass = true;
		else {
			expectedDiff = 10 ** -precision / 2;
			receivedDiff = Math.abs(expected - received);
			pass = receivedDiff < expectedDiff;
		}
		return this.assert(pass, `expected #{this} to be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff}`, `expected #{this} to not be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff}`, received, expected, false);
	});
	function assertIsMock(assertion) {
		if (!isMockFunction(assertion._obj)) throw new TypeError(`${utils.inspect(assertion._obj)} is not a spy or a call to a spy!`);
	}
	function getSpy(assertion) {
		assertIsMock(assertion);
		return assertion._obj;
	}
	def(["toHaveBeenCalledTimes", "toBeCalledTimes"], function(number) {
		const spy = getSpy(this);
		const spyName = spy.getMockName();
		const callCount = spy.mock.calls.length;
		return this.assert(callCount === number, `expected "${spyName}" to be called #{exp} times, but got ${callCount} times`, `expected "${spyName}" to not be called #{exp} times`, number, callCount, false);
	});
	def("toHaveBeenCalledOnce", function() {
		const spy = getSpy(this);
		const spyName = spy.getMockName();
		const callCount = spy.mock.calls.length;
		return this.assert(callCount === 1, `expected "${spyName}" to be called once, but got ${callCount} times`, `expected "${spyName}" to not be called once`, 1, callCount, false);
	});
	def(["toHaveBeenCalled", "toBeCalled"], function() {
		const spy = getSpy(this);
		const spyName = spy.getMockName();
		const callCount = spy.mock.calls.length;
		const called = callCount > 0;
		const isNot = utils.flag(this, "negate");
		let msg = utils.getMessage(this, [
			called,
			`expected "${spyName}" to be called at least once`,
			`expected "${spyName}" to not be called at all, but actually been called ${callCount} times`,
			true,
			called
		]);
		if (called && isNot) msg = formatCalls(spy, msg);
		if (called && isNot || !called && !isNot) throw new AssertionError(msg);
	});
	// manually compare array elements since `jestEquals` cannot
	// apply asymmetric matcher to `undefined` array element.
	function equalsArgumentArray(a, b) {
		return a.length === b.length && a.every((aItem, i) => equals(aItem, b[i], [...customTesters, iterableEquality]));
	}
	def(["toHaveBeenCalledWith", "toBeCalledWith"], function(...args) {
		const spy = getSpy(this);
		const spyName = spy.getMockName();
		const pass = spy.mock.calls.some((callArg) => equalsArgumentArray(callArg, args));
		const isNot = utils.flag(this, "negate");
		if (pass && isNot || !pass && !isNot) {
			const msg = utils.getMessage(this, [
				pass,
				`expected "${spyName}" to be called with arguments: #{exp}`,
				`expected "${spyName}" to not be called with arguments: #{exp}`,
				args
			]);
			throw new AssertionError(formatCalls(spy, msg, args));
		}
	});
	def("toHaveBeenCalledExactlyOnceWith", function(...args) {
		const spy = getSpy(this);
		const spyName = spy.getMockName();
		const callCount = spy.mock.calls.length;
		const pass = spy.mock.calls.some((callArg) => equalsArgumentArray(callArg, args)) && callCount === 1;
		const isNot = utils.flag(this, "negate");
		if (pass && isNot || !pass && !isNot) {
			const msg = utils.getMessage(this, [
				pass,
				`expected "${spyName}" to be called once with arguments: #{exp}`,
				`expected "${spyName}" to not be called once with arguments: #{exp}`,
				args
			]);
			throw new AssertionError(formatCalls(spy, msg, args));
		}
	});
	def("toHaveBeenNthCalledWith", function(times, ...args) {
		const spy = getSpy(this);
		const spyName = spy.getMockName();
		const nthCall = spy.mock.calls[times - 1];
		const callCount = spy.mock.calls.length;
		const isCalled = times <= callCount;
		this.assert(nthCall && equalsArgumentArray(nthCall, args), `expected ${ordinal(times)} "${spyName}" call to have been called with #{exp}${isCalled ? `` : `, but called only ${callCount} times`}`, `expected ${ordinal(times)} "${spyName}" call to not have been called with #{exp}`, args, nthCall, isCalled);
	});
	def("toHaveBeenLastCalledWith", function(...args) {
		const spy = getSpy(this);
		const spyName = spy.getMockName();
		const lastCall = spy.mock.calls.at(-1);
		this.assert(lastCall && equalsArgumentArray(lastCall, args), `expected last "${spyName}" call to have been called with #{exp}`, `expected last "${spyName}" call to not have been called with #{exp}`, args, lastCall);
	});
	/**
	* Used for `toHaveBeenCalledBefore` and `toHaveBeenCalledAfter` to determine if the expected spy was called before the result spy.
	*/
	function isSpyCalledBeforeAnotherSpy(beforeSpy, afterSpy, failIfNoFirstInvocation) {
		const beforeInvocationCallOrder = beforeSpy.mock.invocationCallOrder;
		const afterInvocationCallOrder = afterSpy.mock.invocationCallOrder;
		if (beforeInvocationCallOrder.length === 0) return !failIfNoFirstInvocation;
		if (afterInvocationCallOrder.length === 0) return false;
		return beforeInvocationCallOrder[0] < afterInvocationCallOrder[0];
	}
	def(["toHaveBeenCalledBefore"], function(resultSpy, failIfNoFirstInvocation = true) {
		const expectSpy = getSpy(this);
		if (!isMockFunction(resultSpy)) throw new TypeError(`${utils.inspect(resultSpy)} is not a spy or a call to a spy`);
		this.assert(isSpyCalledBeforeAnotherSpy(expectSpy, resultSpy, failIfNoFirstInvocation), `expected "${expectSpy.getMockName()}" to have been called before "${resultSpy.getMockName()}"`, `expected "${expectSpy.getMockName()}" to not have been called before "${resultSpy.getMockName()}"`, resultSpy, expectSpy);
	});
	def(["toHaveBeenCalledAfter"], function(resultSpy, failIfNoFirstInvocation = true) {
		const expectSpy = getSpy(this);
		if (!isMockFunction(resultSpy)) throw new TypeError(`${utils.inspect(resultSpy)} is not a spy or a call to a spy`);
		this.assert(isSpyCalledBeforeAnotherSpy(resultSpy, expectSpy, failIfNoFirstInvocation), `expected "${expectSpy.getMockName()}" to have been called after "${resultSpy.getMockName()}"`, `expected "${expectSpy.getMockName()}" to not have been called after "${resultSpy.getMockName()}"`, resultSpy, expectSpy);
	});
	def(["toThrow", "toThrowError"], function(expected) {
		if (typeof expected === "string" || typeof expected === "undefined" || expected instanceof RegExp) return this.throws(expected);
		const obj = this._obj;
		const promise = utils.flag(this, "promise");
		const isNot = utils.flag(this, "negate");
		let thrown = null;
		if (promise === "rejects") thrown = obj;
		else if (promise === "resolves" && typeof obj !== "function") {
			if (!isNot) {
				const message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't";
				throw new AssertionError(message, { showDiff: false }, utils.flag(this, "ssfi"));
			} else return;
		} else {
			let isThrow = false;
			try {
				obj();
			} catch (err) {
				isThrow = true;
				thrown = err;
			}
			if (!isThrow && !isNot) {
				const message = utils.flag(this, "message") || "expected function to throw an error, but it didn't";
				throw new AssertionError(message, { showDiff: false }, utils.flag(this, "ssfi"));
			}
		}
		if (typeof expected === "function") {
			const name = expected.name || expected.prototype.constructor.name;
			return this.assert(thrown && thrown instanceof expected, `expected error to be instance of ${name}`, `expected error not to be instance of ${name}`, expected, thrown);
		}
		if (isError(expected)) {
			const equal = equals(thrown, expected, [...customTesters, iterableEquality]);
			return this.assert(equal, "expected a thrown error to be #{exp}", "expected a thrown error not to be #{exp}", expected, thrown);
		}
		if (typeof expected === "object" && "asymmetricMatch" in expected && typeof expected.asymmetricMatch === "function") {
			const matcher = expected;
			return this.assert(thrown && matcher.asymmetricMatch(thrown, [...customTesters, iterableEquality]), "expected error to match asymmetric matcher", "expected error not to match asymmetric matcher", matcher, thrown);
		}
		const equal = equals(thrown, expected, [...customTesters, iterableEquality]);
		return this.assert(equal, "expected a thrown value to equal #{exp}", "expected a thrown value not to equal #{exp}", expected, thrown);
	});
	[{
		name: "toHaveResolved",
		condition: (spy) => spy.mock.settledResults.length > 0 && spy.mock.settledResults.some(({ type }) => type === "fulfilled"),
		action: "resolved"
	}, {
		name: ["toHaveReturned", "toReturn"],
		condition: (spy) => spy.mock.calls.length > 0 && spy.mock.results.some(({ type }) => type !== "throw"),
		action: "called"
	}].forEach(({ name, condition, action }) => {
		def(name, function() {
			const spy = getSpy(this);
			const spyName = spy.getMockName();
			const pass = condition(spy);
			this.assert(pass, `expected "${spyName}" to be successfully ${action} at least once`, `expected "${spyName}" to not be successfully ${action}`, pass, !pass, false);
		});
	});
	[{
		name: "toHaveResolvedTimes",
		condition: (spy, times) => spy.mock.settledResults.reduce((s, { type }) => type === "fulfilled" ? ++s : s, 0) === times,
		action: "resolved"
	}, {
		name: ["toHaveReturnedTimes", "toReturnTimes"],
		condition: (spy, times) => spy.mock.results.reduce((s, { type }) => type === "throw" ? s : ++s, 0) === times,
		action: "called"
	}].forEach(({ name, condition, action }) => {
		def(name, function(times) {
			const spy = getSpy(this);
			const spyName = spy.getMockName();
			const pass = condition(spy, times);
			this.assert(pass, `expected "${spyName}" to be successfully ${action} ${times} times`, `expected "${spyName}" to not be successfully ${action} ${times} times`, `expected resolved times: ${times}`, `received resolved times: ${pass}`, false);
		});
	});
	[{
		name: "toHaveResolvedWith",
		condition: (spy, value) => spy.mock.settledResults.some(({ type, value: result }) => type === "fulfilled" && equals(value, result, [...customTesters, iterableEquality])),
		action: "resolve"
	}, {
		name: ["toHaveReturnedWith", "toReturnWith"],
		condition: (spy, value) => spy.mock.results.some(({ type, value: result }) => type === "return" && equals(value, result, [...customTesters, iterableEquality])),
		action: "return"
	}].forEach(({ name, condition, action }) => {
		def(name, function(value) {
			const spy = getSpy(this);
			const pass = condition(spy, value);
			const isNot = utils.flag(this, "negate");
			if (pass && isNot || !pass && !isNot) {
				const spyName = spy.getMockName();
				const msg = utils.getMessage(this, [
					pass,
					`expected "${spyName}" to ${action} with: #{exp} at least once`,
					`expected "${spyName}" to not ${action} with: #{exp}`,
					value
				]);
				const results = action === "return" ? spy.mock.results : spy.mock.settledResults;
				throw new AssertionError(formatReturns(spy, results, msg, value));
			}
		});
	});
	[{
		name: "toHaveLastResolvedWith",
		condition: (spy, value) => {
			const result = spy.mock.settledResults.at(-1);
			return Boolean(result && result.type === "fulfilled" && equals(result.value, value, [...customTesters, iterableEquality]));
		},
		action: "resolve"
	}, {
		name: "toHaveLastReturnedWith",
		condition: (spy, value) => {
			const result = spy.mock.results.at(-1);
			return Boolean(result && result.type === "return" && equals(result.value, value, [...customTesters, iterableEquality]));
		},
		action: "return"
	}].forEach(({ name, condition, action }) => {
		def(name, function(value) {
			const spy = getSpy(this);
			const result = (action === "return" ? spy.mock.results : spy.mock.settledResults).at(-1);
			const spyName = spy.getMockName();
			this.assert(condition(spy, value), `expected last "${spyName}" call to ${action} #{exp}`, `expected last "${spyName}" call to not ${action} #{exp}`, value, result?.value);
		});
	});
	[{
		name: "toHaveNthResolvedWith",
		condition: (spy, index, value) => {
			const result = spy.mock.settledResults[index - 1];
			return result && result.type === "fulfilled" && equals(result.value, value, [...customTesters, iterableEquality]);
		},
		action: "resolve"
	}, {
		name: "toHaveNthReturnedWith",
		condition: (spy, index, value) => {
			const result = spy.mock.results[index - 1];
			return result && result.type === "return" && equals(result.value, value, [...customTesters, iterableEquality]);
		},
		action: "return"
	}].forEach(({ name, condition, action }) => {
		def(name, function(nthCall, value) {
			const spy = getSpy(this);
			const spyName = spy.getMockName();
			const result = (action === "return" ? spy.mock.results : spy.mock.settledResults)[nthCall - 1];
			const ordinalCall = `${ordinal(nthCall)} call`;
			this.assert(condition(spy, nthCall, value), `expected ${ordinalCall} "${spyName}" call to ${action} #{exp}`, `expected ${ordinalCall} "${spyName}" call to not ${action} #{exp}`, value, result?.value);
		});
	});
	// @ts-expect-error @internal
	def("withContext", function(context) {
		for (const key in context) utils.flag(this, key, context[key]);
		return this;
	});
	utils.addProperty(chai.Assertion.prototype, "resolves", function __VITEST_RESOLVES__() {
		const error = /* @__PURE__ */ new Error("resolves");
		utils.flag(this, "promise", "resolves");
		utils.flag(this, "error", error);
		const test = utils.flag(this, "vitest-test");
		const obj = utils.flag(this, "object");
		if (utils.flag(this, "poll")) throw new SyntaxError(`expect.poll() is not supported in combination with .resolves`);
		if (typeof obj?.then !== "function") throw new TypeError(`You must provide a Promise to expect() when using .resolves, not '${typeof obj}'.`);
		const proxy = new Proxy(this, { get: (target, key, receiver) => {
			const result = Reflect.get(target, key, receiver);
			if (typeof result !== "function") return result instanceof chai.Assertion ? proxy : result;
			return (...args) => {
				utils.flag(this, "_name", key);
				const promise = Promise.resolve(obj).then((value) => {
					utils.flag(this, "object", value);
					return result.call(this, ...args);
				}, (err) => {
					const _error = new AssertionError(`promise rejected "${utils.inspect(err)}" instead of resolving`, { showDiff: false });
					_error.cause = err;
					throw _error;
				}).catch((err) => {
					if (isError(err) && error.stack) err.stack = error.stack.replace(error.message, err.message);
					throw err;
				});
				return recordAsyncExpect(test, promise, createAssertionMessage(utils, this, !!args.length), error, utils.flag(this, "soft"));
			};
		} });
		return proxy;
	});
	utils.addProperty(chai.Assertion.prototype, "rejects", function __VITEST_REJECTS__() {
		const error = /* @__PURE__ */ new Error("rejects");
		utils.flag(this, "promise", "rejects");
		utils.flag(this, "error", error);
		const test = utils.flag(this, "vitest-test");
		const obj = utils.flag(this, "object");
		const wrapper = typeof obj === "function" ? obj() : obj;
		if (utils.flag(this, "poll")) throw new SyntaxError(`expect.poll() is not supported in combination with .rejects`);
		if (typeof wrapper?.then !== "function") throw new TypeError(`You must provide a Promise to expect() when using .rejects, not '${typeof wrapper}'.`);
		const proxy = new Proxy(this, { get: (target, key, receiver) => {
			const result = Reflect.get(target, key, receiver);
			if (typeof result !== "function") return result instanceof chai.Assertion ? proxy : result;
			return (...args) => {
				utils.flag(this, "_name", key);
				const promise = Promise.resolve(wrapper).then((value) => {
					throw new AssertionError(`promise resolved "${utils.inspect(value)}" instead of rejecting`, {
						showDiff: true,
						expected: /* @__PURE__ */ new Error("rejected promise"),
						actual: value
					});
				}, (err) => {
					utils.flag(this, "object", err);
					return result.call(this, ...args);
				}).catch((err) => {
					if (isError(err) && error.stack) err.stack = error.stack.replace(error.message, err.message);
					throw err;
				});
				return recordAsyncExpect(test, promise, createAssertionMessage(utils, this, !!args.length), error, utils.flag(this, "soft"));
			};
		} });
		return proxy;
	});
};
function formatCalls(spy, msg, showActualCall) {
	if (spy.mock.calls.length) msg += $.gray(`\n\nReceived:\n\n${spy.mock.calls.map((callArg, i) => {
		let methodCall = $.bold(`  ${ordinal(i + 1)} ${spy.getMockName()} call:\n\n`);
		if (showActualCall) methodCall += diff(showActualCall, callArg, { omitAnnotationLines: true });
		else methodCall += stringify(callArg).split("\n").map((line) => `    ${line}`).join("\n");
		methodCall += "\n";
		return methodCall;
	}).join("\n")}`);
	msg += $.gray(`\n\nNumber of calls: ${$.bold(spy.mock.calls.length)}\n`);
	return msg;
}
function formatReturns(spy, results, msg, showActualReturn) {
	if (results.length) msg += $.gray(`\n\nReceived:\n\n${results.map((callReturn, i) => {
		let methodCall = $.bold(`  ${ordinal(i + 1)} ${spy.getMockName()} call return:\n\n`);
		if (showActualReturn) methodCall += diff(showActualReturn, callReturn.value, { omitAnnotationLines: true });
		else methodCall += stringify(callReturn).split("\n").map((line) => `    ${line}`).join("\n");
		methodCall += "\n";
		return methodCall;
	}).join("\n")}`);
	msg += $.gray(`\n\nNumber of calls: ${$.bold(spy.mock.calls.length)}\n`);
	return msg;
}

function getMatcherState(assertion, expect) {
	const obj = assertion._obj;
	const isNot = util.flag(assertion, "negate");
	const promise = util.flag(assertion, "promise") || "";
	const customMessage = util.flag(assertion, "message");
	const jestUtils = {
		...getMatcherUtils(),
		diff,
		stringify,
		iterableEquality,
		subsetEquality
	};
	let task = util.flag(assertion, "vitest-test");
	const currentTestName = task?.fullTestName ?? "";
	if (task?.type !== "test") task = void 0;
	const matcherState = {
		...getState(expect),
		currentTestName,
		customTesters: getCustomEqualityTesters(),
		isNot,
		utils: jestUtils,
		promise,
		equals,
		// needed for built-in jest-snapshots, but we don't use it
		suppressedErrors: [],
		soft: util.flag(assertion, "soft"),
		poll: util.flag(assertion, "poll"),
		assertion
	};
	Object.assign(matcherState, { task });
	return {
		state: matcherState,
		isNot,
		obj,
		customMessage
	};
}
class JestExtendError extends Error {
	actual;
	expected;
	__vitest_error_context__;
	constructor(message, actual, expected, __vitest_error_context__) {
		super(message);
		this.actual = actual;
		this.expected = expected;
		this.__vitest_error_context__ = __vitest_error_context__;
	}
}
function JestExtendPlugin(c, expect, matchers) {
	return (_, utils) => {
		Object.entries(matchers).forEach(([expectAssertionName, expectAssertion]) => {
			function __VITEST_EXTEND_ASSERTION__(...args) {
				const { state, isNot, obj, customMessage } = getMatcherState(this, expect);
				const result = expectAssertion.call(state, obj, ...args);
				if (result && typeof result === "object" && typeof result.then === "function") return result.then(({ pass, message, actual, expected, meta }) => {
					if (pass && isNot || !pass && !isNot) {
						const errorMessage = (customMessage ? `${customMessage}: ` : "") + message();
						throw new JestExtendError(errorMessage, actual, expected, {
							assertionName: expectAssertionName,
							meta
						});
					}
				});
				const { pass, message, actual, expected, meta } = result;
				if (pass && isNot || !pass && !isNot) {
					const errorMessage = (customMessage ? `${customMessage}: ` : "") + message();
					throw new JestExtendError(errorMessage, actual, expected, {
						assertionName: expectAssertionName,
						meta
					});
				}
			}
			const softWrapper = wrapAssertion(utils, expectAssertionName, __VITEST_EXTEND_ASSERTION__);
			utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, expectAssertionName, softWrapper);
			utils.addMethod(c.Assertion.prototype, expectAssertionName, softWrapper);
			// `expect.poll()` inspects the installed Chai assertion method,
			// so copy the internal marker from the original matcher function.
			// this is only for domain snapshot matchers for now.
			if (expectAssertion.__vitest_poll_takeover__) {
				const addedMethod = c.Assertion.prototype[expectAssertionName];
				Object.defineProperty(addedMethod, "__vitest_poll_takeover__", { value: true });
			}
			class CustomMatcher extends AsymmetricMatcher {
				constructor(inverse = false, ...sample) {
					super(sample, inverse);
				}
				asymmetricMatch(other, customTesters) {
					const context = this.getMatcherContext(expect);
					const { pass } = expectAssertion.call(customTesters ? {
						...context,
						customTesters
					} : context, other, ...this.sample);
					return this.inverse ? !pass : pass;
				}
				toString() {
					return `${this.inverse ? "not." : ""}${expectAssertionName}`;
				}
				getExpectedType() {
					return "any";
				}
				toAsymmetricMatcher() {
					return `${this.toString()}<${this.sample.map((item) => stringify(item)).join(", ")}>`;
				}
			}
			const customMatcher = (...sample) => new CustomMatcher(false, ...sample);
			Object.defineProperty(expect, expectAssertionName, {
				configurable: true,
				enumerable: true,
				value: customMatcher,
				writable: true
			});
			Object.defineProperty(expect.not, expectAssertionName, {
				configurable: true,
				enumerable: true,
				value: (...sample) => new CustomMatcher(true, ...sample),
				writable: true
			});
			// keep track of asymmetric matchers on global so that it can be copied over to local context's `expect`.
			// note that the negated variant is automatically shared since it's assigned on the single `expect.not` object.
			Object.defineProperty(globalThis[ASYMMETRIC_MATCHERS_OBJECT], expectAssertionName, {
				configurable: true,
				enumerable: true,
				value: customMatcher,
				writable: true
			});
		});
	};
}
const JestExtend = (chai, utils) => {
	utils.addMethod(chai.expect, "extend", (expect, expects) => {
		use(JestExtendPlugin(chai, expect, expects));
	});
};

function isBenchResult(value) {
	return typeof value === "object" && value !== null && "latency" in value && typeof value.latency?.mean === "number";
}
function formatOps(ops) {
	return ops.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
const benchMatchers = {
	toBeFasterThan(actual, expected, options) {
		const { matcherHint, RECEIVED_COLOR, EXPECTED_COLOR } = this.utils;
		const delta = options?.delta ?? 0;
		if (!isBenchResult(actual)) throw new TypeError(`${matcherHint(".toBeFasterThan")} expects the actual value to be a benchmark result.`);
		if (!isBenchResult(expected)) throw new TypeError(`${matcherHint(".toBeFasterThan")} expects the expected value to be a benchmark result.`);
		const threshold = expected.latency.mean * (1 - delta);
		const pass = actual.latency.mean < threshold;
		return {
			pass,
			message: () => {
				const relation = ((actual.latency.mean - expected.latency.mean) / expected.latency.mean * 100).toFixed(2);
				return pass ? `${matcherHint(".not.toBeFasterThan")}\n\nExpected to not be faster, but was ${Math.abs(Number(relation))}% faster.\n\nReceived: ${RECEIVED_COLOR(formatOps(actual.throughput.mean))} ops/sec\nExpected: ${EXPECTED_COLOR(formatOps(expected.throughput.mean))} ops/sec\n` : `${matcherHint(".toBeFasterThan")}\n\nExpected to be faster${delta > 0 ? ` by at least ${(delta * 100).toFixed(0)}%` : ""}, but was ${Number(relation) > 0 ? `${relation}% slower` : `only ${Math.abs(Number(relation))}% faster`}.\n\nReceived: ${RECEIVED_COLOR(formatOps(actual.throughput.mean))} ops/sec\nExpected: ${EXPECTED_COLOR(formatOps(expected.throughput.mean))} ops/sec\n`;
			}
		};
	},
	toBeSlowerThan(actual, expected, options) {
		const { matcherHint, RECEIVED_COLOR, EXPECTED_COLOR } = this.utils;
		const delta = options?.delta ?? 0;
		if (!isBenchResult(actual)) throw new TypeError(`${matcherHint(".toBeSlowerThan")} expects the actual value to be a benchmark result.`);
		if (!isBenchResult(expected)) throw new TypeError(`${matcherHint(".toBeSlowerThan")} expects the expected value to be a benchmark result.`);
		const threshold = expected.latency.mean * (1 + delta);
		const pass = actual.latency.mean > threshold;
		return {
			pass,
			message: () => {
				const relation = ((actual.latency.mean - expected.latency.mean) / expected.latency.mean * 100).toFixed(2);
				return pass ? `${matcherHint(".not.toBeSlowerThan")}\n\nExpected to not be slower, but was ${relation}% slower.\n\nReceived: ${RECEIVED_COLOR(formatOps(actual.throughput.mean))} ops/sec\nExpected: ${EXPECTED_COLOR(formatOps(expected.throughput.mean))} ops/sec\n` : `${matcherHint(".toBeSlowerThan")}\n\nExpected to be slower${delta > 0 ? ` by at least ${(delta * 100).toFixed(0)}%` : ""}, but was ${Number(relation) < 0 ? `${Math.abs(Number(relation))}% faster` : `only ${relation}% slower`}.\n\nReceived: ${RECEIVED_COLOR(formatOps(actual.throughput.mean))} ops/sec\nExpected: ${EXPECTED_COLOR(formatOps(expected.throughput.mean))} ops/sec\n`;
			}
		};
	}
};

const attempts = /* @__PURE__ */ new WeakMap();
function startTraceAttempt(test, options) {
	attempts.set(test, {
		...options,
		startTime: performance.now(),
		entries: []
	});
}
function getTraceAttempt(test) {
	return attempts.get(test);
}
function createTraceRangeId() {
	return Math.random().toString(36).slice(2);
}
function recordTraceEntry(attempt, entry, source) {
	attempt.entries.push({
		entry: {
			...entry,
			startTime: performance.now() - attempt.startTime
		},
		source
	});
}
function startPromiseTraceRange(name, source) {
	const test = getCurrentTest();
	// the current test is a guess when several tests run concurrently
	const attempt = test && getRunningTests().size === 1 ? attempts.get(test) : void 0;
	if (!attempt) return (promise) => promise;
	const id = createTraceRangeId();
	recordTraceEntry(attempt, {
		name,
		kind: "expect",
		range: {
			id,
			phase: "start"
		}
	}, source);
	const end = (status) => recordTraceEntry(attempt, {
		name,
		kind: "expect",
		range: {
			id,
			phase: "end"
		},
		status
	}, source);
	return (promise) => {
		promise.then(() => end("pass"), () => end("fail"));
		return promise;
	};
}
async function finishTraceAttempt(test) {
	const attempt = attempts.get(test);
	attempts.delete(test);
	// record only failed attempts
	if (!attempt || test.result?.state !== "fail" || !attempt.entries.length) return;
	// locations are resolved in the main process, like error stacks
	const entries = attempt.entries.map(({ entry, source }) => ({
		...entry,
		stack: source.stack
	}));
	const data = {
		retry: attempt.retry,
		repeats: attempt.repeats,
		entries
	};
	await recordArtifact(test, {
		type: "internal:browserTrace",
		data
	});
}

/**
* Copies the stack trace from one error to another.
*
* If the source has no stack trace, the target is left unchanged.
*
* @param target - The error to copy the stack trace to.
* @param source - The error to copy the stack trace from.
* @returns The target error with the updated stack trace.
*/
function copyStackTrace(target, source) {
	if (source.stack !== void 0) target.stack = source.stack.replace(source.message, target.message);
	return target;
}

var fakeTimersSrc = {};

var global;
var hasRequiredGlobal;

function requireGlobal () {
	if (hasRequiredGlobal) return global;
	hasRequiredGlobal = 1;

	/**
	 * A reference to the global object
	 * @type {object} globalObject
	 */
	var globalObject;

	/* istanbul ignore else */
	if (typeof commonjsGlobal !== "undefined") {
	    // Node
	    globalObject = commonjsGlobal;
	} else if (typeof window !== "undefined") {
	    // Browser
	    globalObject = window;
	} else {
	    // WebWorker
	    globalObject = self;
	}

	global = globalObject;
	return global;
}

var throwsOnProto_1;
var hasRequiredThrowsOnProto;

function requireThrowsOnProto () {
	if (hasRequiredThrowsOnProto) return throwsOnProto_1;
	hasRequiredThrowsOnProto = 1;

	/**
	 * Is true when the environment causes an error to be thrown for accessing the
	 * __proto__ property.
	 * This is necessary in order to support `node --disable-proto=throw`.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
	 * @type {boolean}
	 */
	let throwsOnProto;
	try {
	    const object = {};
	    // eslint-disable-next-line no-proto, no-unused-expressions
	    object.__proto__;
	    throwsOnProto = false;
	} catch (_) {
	    // This branch is covered when tests are run with `--disable-proto=throw`,
	    // however we can test both branches at the same time, so this is ignored
	    /* istanbul ignore next */
	    throwsOnProto = true;
	}

	throwsOnProto_1 = throwsOnProto;
	return throwsOnProto_1;
}

var copyPrototypeMethods;
var hasRequiredCopyPrototypeMethods;

function requireCopyPrototypeMethods () {
	if (hasRequiredCopyPrototypeMethods) return copyPrototypeMethods;
	hasRequiredCopyPrototypeMethods = 1;

	var call = Function.call;
	var throwsOnProto = requireThrowsOnProto();

	var disallowedProperties = [
	    // ignore size because it throws from Map
	    "size",
	    "caller",
	    "callee",
	    "arguments",
	];

	// This branch is covered when tests are run with `--disable-proto=throw`,
	// however we can test both branches at the same time, so this is ignored
	/* istanbul ignore next */
	if (throwsOnProto) {
	    disallowedProperties.push("__proto__");
	}

	copyPrototypeMethods = function copyPrototypeMethods(prototype) {
	    // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
	    return Object.getOwnPropertyNames(prototype).reduce(function (
	        result,
	        name
	    ) {
	        if (disallowedProperties.includes(name)) {
	            return result;
	        }

	        if (typeof prototype[name] !== "function") {
	            return result;
	        }

	        result[name] = call.bind(prototype[name]);

	        return result;
	    },
	    Object.create(null));
	};
	return copyPrototypeMethods;
}

var array;
var hasRequiredArray;

function requireArray () {
	if (hasRequiredArray) return array;
	hasRequiredArray = 1;

	var copyPrototype = requireCopyPrototypeMethods();

	array = copyPrototype(Array.prototype);
	return array;
}

var calledInOrder_1;
var hasRequiredCalledInOrder;

function requireCalledInOrder () {
	if (hasRequiredCalledInOrder) return calledInOrder_1;
	hasRequiredCalledInOrder = 1;

	var every = requireArray().every;

	/**
	 * @private
	 */
	function hasCallsLeft(callMap, spy) {
	    if (callMap[spy.id] === undefined) {
	        callMap[spy.id] = 0;
	    }

	    return callMap[spy.id] < spy.callCount;
	}

	/**
	 * @private
	 */
	function checkAdjacentCalls(callMap, spy, index, spies) {
	    var calledBeforeNext = true;

	    if (index !== spies.length - 1) {
	        calledBeforeNext = spy.calledBefore(spies[index + 1]);
	    }

	    if (hasCallsLeft(callMap, spy) && calledBeforeNext) {
	        callMap[spy.id] += 1;
	        return true;
	    }

	    return false;
	}

	/**
	 * A Sinon proxy object (fake, spy, stub)
	 * @typedef {object} SinonProxy
	 * @property {Function} calledBefore - A method that determines if this proxy was called before another one
	 * @property {string} id - Some id
	 * @property {number} callCount - Number of times this proxy has been called
	 */

	/**
	 * Returns true when the spies have been called in the order they were supplied in
	 * @param  {SinonProxy[] | SinonProxy} spies An array of proxies, or several proxies as arguments
	 * @returns {boolean} true when spies are called in order, false otherwise
	 */
	function calledInOrder(spies) {
	    var callMap = {};
	    // eslint-disable-next-line no-underscore-dangle
	    var _spies = arguments.length > 1 ? arguments : spies;

	    return every(_spies, checkAdjacentCalls.bind(null, callMap));
	}

	calledInOrder_1 = calledInOrder;
	return calledInOrder_1;
}

var className_1;
var hasRequiredClassName;

function requireClassName () {
	if (hasRequiredClassName) return className_1;
	hasRequiredClassName = 1;

	/**
	 * Returns a display name for a value from a constructor
	 * @param  {object} value A value to examine
	 * @returns {(string|null)} A string or null
	 */
	function className(value) {
	    const name = value.constructor && value.constructor.name;
	    return name || null;
	}

	className_1 = className;
	return className_1;
}

var deprecated = {};

/* eslint-disable no-console */

var hasRequiredDeprecated;

function requireDeprecated () {
	if (hasRequiredDeprecated) return deprecated;
	hasRequiredDeprecated = 1;
	(function (exports) {

		/**
		 * Returns a function that will invoke the supplied function and print a
		 * deprecation warning to the console each time it is called.
		 * @param  {Function} func
		 * @param  {string} msg
		 * @returns {Function}
		 */
		exports.wrap = function (func, msg) {
		    var wrapped = function () {
		        exports.printWarning(msg);
		        return func.apply(this, arguments);
		    };
		    if (func.prototype) {
		        wrapped.prototype = func.prototype;
		    }
		    return wrapped;
		};

		/**
		 * Returns a string which can be supplied to `wrap()` to notify the user that a
		 * particular part of the sinon API has been deprecated.
		 * @param  {string} packageName
		 * @param  {string} funcName
		 * @returns {string}
		 */
		exports.defaultMsg = function (packageName, funcName) {
		    return `${packageName}.${funcName} is deprecated and will be removed from the public API in a future version of ${packageName}.`;
		};

		/**
		 * Prints a warning on the console, when it exists
		 * @param  {string} msg
		 * @returns {undefined}
		 */
		exports.printWarning = function (msg) {
		    /* istanbul ignore next */
		    if (typeof process === "object" && process.emitWarning) {
		        // Emit Warnings in Node
		        process.emitWarning(msg);
		    } else if (console.info) {
		        console.info(msg);
		    } else {
		        console.log(msg);
		    }
		}; 
	} (deprecated));
	return deprecated;
}

var every;
var hasRequiredEvery;

function requireEvery () {
	if (hasRequiredEvery) return every;
	hasRequiredEvery = 1;

	/**
	 * Returns true when fn returns true for all members of obj.
	 * This is an every implementation that works for all iterables
	 * @param  {object}   obj
	 * @param  {Function} fn
	 * @returns {boolean}
	 */
	every = function every(obj, fn) {
	    var pass = true;

	    try {
	        // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
	        obj.forEach(function () {
	            if (!fn.apply(this, arguments)) {
	                // Throwing an error is the only way to break `forEach`
	                throw new Error();
	            }
	        });
	    } catch (e) {
	        pass = false;
	    }

	    return pass;
	};
	return every;
}

var functionName;
var hasRequiredFunctionName;

function requireFunctionName () {
	if (hasRequiredFunctionName) return functionName;
	hasRequiredFunctionName = 1;

	/**
	 * Returns a display name for a function
	 * @param  {Function} func
	 * @returns {string}
	 */
	functionName = function functionName(func) {
	    if (!func) {
	        return "";
	    }

	    try {
	        return (
	            func.displayName ||
	            func.name ||
	            // Use function decomposition as a last resort to get function
	            // name. Does not rely on function decomposition to work - if it
	            // doesn't debugging will be slightly less informative
	            // (i.e. toString will say 'spy' rather than 'myFunc').
	            (String(func).match(/function ([^\s(]+)/) || [])[1]
	        );
	    } catch (e) {
	        // Stringify may fail and we might get an exception, as a last-last
	        // resort fall back to empty string.
	        return "";
	    }
	};
	return functionName;
}

var orderByFirstCall_1;
var hasRequiredOrderByFirstCall;

function requireOrderByFirstCall () {
	if (hasRequiredOrderByFirstCall) return orderByFirstCall_1;
	hasRequiredOrderByFirstCall = 1;

	var sort = requireArray().sort;
	var slice = requireArray().slice;

	/**
	 * @private
	 */
	function comparator(a, b) {
	    // uuid, won't ever be equal
	    var aCall = a.getCall(0);
	    var bCall = b.getCall(0);
	    var aId = (aCall && aCall.callId) || -1;
	    var bId = (bCall && bCall.callId) || -1;

	    return aId < bId ? -1 : 1;
	}

	/**
	 * A Sinon proxy object (fake, spy, stub)
	 * @typedef {object} SinonProxy
	 * @property {Function} getCall - A method that can return the first call
	 */

	/**
	 * Sorts an array of SinonProxy instances (fake, spy, stub) by their first call
	 * @param  {SinonProxy[] | SinonProxy} spies
	 * @returns {SinonProxy[]}
	 */
	function orderByFirstCall(spies) {
	    return sort(slice(spies), comparator);
	}

	orderByFirstCall_1 = orderByFirstCall;
	return orderByFirstCall_1;
}

var _function;
var hasRequired_function;

function require_function () {
	if (hasRequired_function) return _function;
	hasRequired_function = 1;

	var copyPrototype = requireCopyPrototypeMethods();

	_function = copyPrototype(Function.prototype);
	return _function;
}

var map;
var hasRequiredMap;

function requireMap () {
	if (hasRequiredMap) return map;
	hasRequiredMap = 1;

	var copyPrototype = requireCopyPrototypeMethods();

	map = copyPrototype(Map.prototype);
	return map;
}

var object;
var hasRequiredObject;

function requireObject () {
	if (hasRequiredObject) return object;
	hasRequiredObject = 1;

	var copyPrototype = requireCopyPrototypeMethods();

	object = copyPrototype(Object.prototype);
	return object;
}

var set;
var hasRequiredSet;

function requireSet () {
	if (hasRequiredSet) return set;
	hasRequiredSet = 1;

	var copyPrototype = requireCopyPrototypeMethods();

	set = copyPrototype(Set.prototype);
	return set;
}

var string;
var hasRequiredString;

function requireString () {
	if (hasRequiredString) return string;
	hasRequiredString = 1;

	var copyPrototype = requireCopyPrototypeMethods();

	string = copyPrototype(String.prototype);
	return string;
}

var prototypes;
var hasRequiredPrototypes;

function requirePrototypes () {
	if (hasRequiredPrototypes) return prototypes;
	hasRequiredPrototypes = 1;

	prototypes = {
	    array: requireArray(),
	    function: require_function(),
	    map: requireMap(),
	    object: requireObject(),
	    set: requireSet(),
	    string: requireString(),
	};
	return prototypes;
}

var typeDetect$1 = {exports: {}};

var typeDetect = typeDetect$1.exports;

var hasRequiredTypeDetect;

function requireTypeDetect () {
	if (hasRequiredTypeDetect) return typeDetect$1.exports;
	hasRequiredTypeDetect = 1;
	(function (module, exports) {
		(function (global, factory) {
			module.exports = factory() ;
		}(typeDetect, (function () {
		/* !
		 * type-detect
		 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
		 * MIT Licensed
		 */
		var promiseExists = typeof Promise === 'function';

		/* eslint-disable no-undef */
		var globalObject = typeof self === 'object' ? self : commonjsGlobal; // eslint-disable-line id-blacklist

		var symbolExists = typeof Symbol !== 'undefined';
		var mapExists = typeof Map !== 'undefined';
		var setExists = typeof Set !== 'undefined';
		var weakMapExists = typeof WeakMap !== 'undefined';
		var weakSetExists = typeof WeakSet !== 'undefined';
		var dataViewExists = typeof DataView !== 'undefined';
		var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
		var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
		var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
		var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
		var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
		var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
		var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
		var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
		var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
		var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
		var toStringLeftSliceLength = 8;
		var toStringRightSliceLength = -1;
		/**
		 * ### typeOf (obj)
		 *
		 * Uses `Object.prototype.toString` to determine the type of an object,
		 * normalising behaviour across engine versions & well optimised.
		 *
		 * @param {Mixed} object
		 * @return {String} object type
		 * @api public
		 */
		function typeDetect(obj) {
		  /* ! Speed optimisation
		   * Pre:
		   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
		   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
		   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
		   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
		   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
		   * Post:
		   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
		   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
		   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
		   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
		   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
		   */
		  var typeofObj = typeof obj;
		  if (typeofObj !== 'object') {
		    return typeofObj;
		  }

		  /* ! Speed optimisation
		   * Pre:
		   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
		   * Post:
		   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
		   */
		  if (obj === null) {
		    return 'null';
		  }

		  /* ! Spec Conformance
		   * Test: `Object.prototype.toString.call(window)``
		   *  - Node === "[object global]"
		   *  - Chrome === "[object global]"
		   *  - Firefox === "[object Window]"
		   *  - PhantomJS === "[object Window]"
		   *  - Safari === "[object Window]"
		   *  - IE 11 === "[object Window]"
		   *  - IE Edge === "[object Window]"
		   * Test: `Object.prototype.toString.call(this)``
		   *  - Chrome Worker === "[object global]"
		   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
		   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
		   *  - IE 11 Worker === "[object WorkerGlobalScope]"
		   *  - IE Edge Worker === "[object WorkerGlobalScope]"
		   */
		  if (obj === globalObject) {
		    return 'global';
		  }

		  /* ! Speed optimisation
		   * Pre:
		   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
		   * Post:
		   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
		   */
		  if (
		    Array.isArray(obj) &&
		    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
		  ) {
		    return 'Array';
		  }

		  // Not caching existence of `window` and related properties due to potential
		  // for `window` to be unset before tests in quasi-browser environments.
		  if (typeof window === 'object' && window !== null) {
		    /* ! Spec Conformance
		     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
		     * WhatWG HTML$7.7.3 - The `Location` interface
		     * Test: `Object.prototype.toString.call(window.location)``
		     *  - IE <=11 === "[object Object]"
		     *  - IE Edge <=13 === "[object Object]"
		     */
		    if (typeof window.location === 'object' && obj === window.location) {
		      return 'Location';
		    }

		    /* ! Spec Conformance
		     * (https://html.spec.whatwg.org/#document)
		     * WhatWG HTML$3.1.1 - The `Document` object
		     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
		     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
		     *       which suggests that browsers should use HTMLTableCellElement for
		     *       both TD and TH elements. WhatWG separates these.
		     *       WhatWG HTML states:
		     *         > For historical reasons, Window objects must also have a
		     *         > writable, configurable, non-enumerable property named
		     *         > HTMLDocument whose value is the Document interface object.
		     * Test: `Object.prototype.toString.call(document)``
		     *  - Chrome === "[object HTMLDocument]"
		     *  - Firefox === "[object HTMLDocument]"
		     *  - Safari === "[object HTMLDocument]"
		     *  - IE <=10 === "[object Document]"
		     *  - IE 11 === "[object HTMLDocument]"
		     *  - IE Edge <=13 === "[object HTMLDocument]"
		     */
		    if (typeof window.document === 'object' && obj === window.document) {
		      return 'Document';
		    }

		    if (typeof window.navigator === 'object') {
		      /* ! Spec Conformance
		       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
		       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
		       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
		       *  - IE <=10 === "[object MSMimeTypesCollection]"
		       */
		      if (typeof window.navigator.mimeTypes === 'object' &&
		          obj === window.navigator.mimeTypes) {
		        return 'MimeTypeArray';
		      }

		      /* ! Spec Conformance
		       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
		       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
		       * Test: `Object.prototype.toString.call(navigator.plugins)``
		       *  - IE <=10 === "[object MSPluginsCollection]"
		       */
		      if (typeof window.navigator.plugins === 'object' &&
		          obj === window.navigator.plugins) {
		        return 'PluginArray';
		      }
		    }

		    if ((typeof window.HTMLElement === 'function' ||
		        typeof window.HTMLElement === 'object') &&
		        obj instanceof window.HTMLElement) {
		      /* ! Spec Conformance
		      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
		      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
		      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
		      *  - IE <=10 === "[object HTMLBlockElement]"
		      */
		      if (obj.tagName === 'BLOCKQUOTE') {
		        return 'HTMLQuoteElement';
		      }

		      /* ! Spec Conformance
		       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
		       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
		       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
		       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
		       *       which suggests that browsers should use HTMLTableCellElement for
		       *       both TD and TH elements. WhatWG separates these.
		       * Test: Object.prototype.toString.call(document.createElement('td'))
		       *  - Chrome === "[object HTMLTableCellElement]"
		       *  - Firefox === "[object HTMLTableCellElement]"
		       *  - Safari === "[object HTMLTableCellElement]"
		       */
		      if (obj.tagName === 'TD') {
		        return 'HTMLTableDataCellElement';
		      }

		      /* ! Spec Conformance
		       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
		       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
		       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
		       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
		       *       which suggests that browsers should use HTMLTableCellElement for
		       *       both TD and TH elements. WhatWG separates these.
		       * Test: Object.prototype.toString.call(document.createElement('th'))
		       *  - Chrome === "[object HTMLTableCellElement]"
		       *  - Firefox === "[object HTMLTableCellElement]"
		       *  - Safari === "[object HTMLTableCellElement]"
		       */
		      if (obj.tagName === 'TH') {
		        return 'HTMLTableHeaderCellElement';
		      }
		    }
		  }

		  /* ! Speed optimisation
		  * Pre:
		  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
		  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
		  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
		  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
		  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
		  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
		  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
		  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
		  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
		  * Post:
		  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
		  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
		  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
		  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
		  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
		  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
		  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
		  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
		  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
		  */
		  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
		  if (typeof stringTag === 'string') {
		    return stringTag;
		  }

		  var objPrototype = Object.getPrototypeOf(obj);
		  /* ! Speed optimisation
		  * Pre:
		  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
		  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
		  * Post:
		  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
		  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
		  */
		  if (objPrototype === RegExp.prototype) {
		    return 'RegExp';
		  }

		  /* ! Speed optimisation
		  * Pre:
		  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
		  * Post:
		  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
		  */
		  if (objPrototype === Date.prototype) {
		    return 'Date';
		  }

		  /* ! Spec Conformance
		   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
		   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
		   * Test: `Object.prototype.toString.call(Promise.resolve())``
		   *  - Chrome <=47 === "[object Object]"
		   *  - Edge <=20 === "[object Object]"
		   *  - Firefox 29-Latest === "[object Promise]"
		   *  - Safari 7.1-Latest === "[object Promise]"
		   */
		  if (promiseExists && objPrototype === Promise.prototype) {
		    return 'Promise';
		  }

		  /* ! Speed optimisation
		  * Pre:
		  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
		  * Post:
		  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
		  */
		  if (setExists && objPrototype === Set.prototype) {
		    return 'Set';
		  }

		  /* ! Speed optimisation
		  * Pre:
		  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
		  * Post:
		  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
		  */
		  if (mapExists && objPrototype === Map.prototype) {
		    return 'Map';
		  }

		  /* ! Speed optimisation
		  * Pre:
		  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
		  * Post:
		  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
		  */
		  if (weakSetExists && objPrototype === WeakSet.prototype) {
		    return 'WeakSet';
		  }

		  /* ! Speed optimisation
		  * Pre:
		  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
		  * Post:
		  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
		  */
		  if (weakMapExists && objPrototype === WeakMap.prototype) {
		    return 'WeakMap';
		  }

		  /* ! Spec Conformance
		   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
		   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
		   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
		   *  - Edge <=13 === "[object Object]"
		   */
		  if (dataViewExists && objPrototype === DataView.prototype) {
		    return 'DataView';
		  }

		  /* ! Spec Conformance
		   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
		   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
		   * Test: `Object.prototype.toString.call(new Map().entries())``
		   *  - Edge <=13 === "[object Object]"
		   */
		  if (mapExists && objPrototype === mapIteratorPrototype) {
		    return 'Map Iterator';
		  }

		  /* ! Spec Conformance
		   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
		   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
		   * Test: `Object.prototype.toString.call(new Set().entries())``
		   *  - Edge <=13 === "[object Object]"
		   */
		  if (setExists && objPrototype === setIteratorPrototype) {
		    return 'Set Iterator';
		  }

		  /* ! Spec Conformance
		   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
		   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
		   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
		   *  - Edge <=13 === "[object Object]"
		   */
		  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
		    return 'Array Iterator';
		  }

		  /* ! Spec Conformance
		   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
		   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
		   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
		   *  - Edge <=13 === "[object Object]"
		   */
		  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
		    return 'String Iterator';
		  }

		  /* ! Speed optimisation
		  * Pre:
		  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
		  * Post:
		  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
		  */
		  if (objPrototype === null) {
		    return 'Object';
		  }

		  return Object
		    .prototype
		    .toString
		    .call(obj)
		    .slice(toStringLeftSliceLength, toStringRightSliceLength);
		}

		return typeDetect;

		}))); 
	} (typeDetect$1));
	return typeDetect$1.exports;
}

var typeOf;
var hasRequiredTypeOf;

function requireTypeOf () {
	if (hasRequiredTypeOf) return typeOf;
	hasRequiredTypeOf = 1;

	var type = requireTypeDetect();

	/**
	 * Returns the lower-case result of running type from type-detect on the value
	 * @param  {*} value
	 * @returns {string}
	 */
	typeOf = function typeOf(value) {
	    return type(value).toLowerCase();
	};
	return typeOf;
}

var valueToString_1;
var hasRequiredValueToString;

function requireValueToString () {
	if (hasRequiredValueToString) return valueToString_1;
	hasRequiredValueToString = 1;

	/**
	 * Returns a string representation of the value
	 * @param  {*} value
	 * @returns {string}
	 */
	function valueToString(value) {
	    if (value && value.toString) {
	        // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
	        return value.toString();
	    }
	    return String(value);
	}

	valueToString_1 = valueToString;
	return valueToString_1;
}

var lib;
var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;

	lib = {
	    global: requireGlobal(),
	    calledInOrder: requireCalledInOrder(),
	    className: requireClassName(),
	    deprecated: requireDeprecated(),
	    every: requireEvery(),
	    functionName: requireFunctionName(),
	    orderByFirstCall: requireOrderByFirstCall(),
	    prototypes: requirePrototypes(),
	    typeOf: requireTypeOf(),
	    valueToString: requireValueToString(),
	};
	return lib;
}

var hasRequiredFakeTimersSrc;

function requireFakeTimersSrc () {
	if (hasRequiredFakeTimersSrc) return fakeTimersSrc;
	hasRequiredFakeTimersSrc = 1;

	const globalObject = requireLib().global;

	/**
	 * @typedef {"nextAsync" | "manual" | "interval"} TickMode
	 */

	/**
	 * @typedef {object} NextAsyncTickMode
	 * @property {"nextAsync"} mode - runs timers one macrotask at a time
	 */

	/**
	 * @typedef {object} ManualTickMode
	 * @property {"manual"} mode - advances only when the caller explicitly ticks
	 */

	/**
	 * @typedef {object} IntervalTickMode
	 * @property {"interval"} mode - advances automatically on a native interval
	 * @property {number} [delta] - interval duration in milliseconds
	 */

	/**
	 * @typedef {IntervalTickMode | NextAsyncTickMode | ManualTickMode} TimerTickMode
	 */

	/**
	 * @callback FakeTimersFunction
	 * @param {...unknown[]} args
	 * @returns {unknown}
	 */

	/**
	 * @callback VoidVarArgsFunc
	 * @param {...unknown[]} args - optional arguments to call the callback with
	 * @returns {void}
	 */

	/**
	 * @callback NextTick
	 * @param {VoidVarArgsFunc} callback - the callback to run
	 * @param {...unknown[]} args - optional arguments to call the callback with
	 * @returns {void}
	 */

	/**
	 * @callback SetImmediate
	 * @param {VoidVarArgsFunc} callback - the callback to run
	 * @param {...unknown[]} args - optional arguments to call the callback with
	 * @returns {NodeImmediate}
	 */

	/**
	 * @callback SetTimeout
	 * @param {VoidVarArgsFunc} callback - the callback to run
	 * @param {number} [delay] - optional delay in milliseconds
	 * @param {...unknown[]} args - optional arguments to call the callback with
	 * @returns {TimerId} - the timeout identifier
	 */

	/**
	 * @callback ClearTimeout
	 * @param {TimerId} [id] - the timeout identifier to clear
	 * @returns {void}
	 */

	/**
	 * @callback SetInterval
	 * @param {VoidVarArgsFunc} callback - the callback to run
	 * @param {number} [delay] - optional delay in milliseconds
	 * @param {...unknown[]} args - optional arguments to call the callback with
	 * @returns {TimerId} - the interval identifier
	 */

	/**
	 * @callback ClearInterval
	 * @param {TimerId} [id] - the interval identifier to clear
	 * @returns {void}
	 */

	/**
	 * @callback QueueMicrotask
	 * @param {VoidVarArgsFunc} callback - the callback to run
	 * @returns {void}
	 */

	/**
	 * @callback TimeRemaining
	 * @returns {number}
	 */

	/**
	 * @typedef {object} IdleDeadline
	 * @property {boolean} didTimeout - whether or not the callback was called before reaching the optional timeout
	 * @property {TimeRemaining} timeRemaining - a floating-point value providing an estimate of the number of milliseconds remaining in the current idle period
	 */

	/**
	 * @callback RequestIdleCallbackCallback
	 * @param {IdleDeadline} deadline
	 */

	/**
	 * Queues a function to be called during a browser's idle periods
	 * @callback RequestIdleCallback
	 * @param {RequestIdleCallbackCallback} callback
	 * @param {{timeout?: number}} [options] - an options object
	 * @returns {number} the id
	 */

	/**
	 * @callback AnimationFrameCallback
	 * @param {number} timestamp
	 */

	/**
	 * @callback RequestAnimationFrame
	 * @param {AnimationFrameCallback} callback
	 * @returns {TimerId} - the request id
	 */

	/**
	 * @callback CancelAnimationFrame
	 * @param {TimerId} id - cancels a frame callback
	 * @returns {void}
	 */

	/**
	 * @callback CancelIdleCallback
	 * @param {TimerId} id - cancels a scheduled idle callback
	 * @returns {void}
	 */

	/**
	 * @callback ClearImmediate
	 * @param {NodeImmediate} id - faked `clearImmediate`
	 * @returns {void}
	 */

	/**
	 * @callback CountTimers
	 * @returns {number}
	 */

	/**
	 * @callback RunMicrotasks
	 * @returns {void}
	 */

	/**
	 * @typedef {object} TemporalDuration
	 * @property {number} years - years component
	 * @property {number} months - months component
	 * @property {number} weeks - weeks component
	 * @property {number} days - days component
	 * @property {number} hours - hours component
	 * @property {number} minutes - minutes component
	 * @property {number} seconds - seconds component
	 * @property {number} milliseconds - milliseconds component
	 * @property {number} microseconds - microseconds component
	 * @property {number} nanoseconds - nanoseconds component
	 * @property {(options: {unit: string, relativeTo?: unknown}) => number} total - converts to a single unit
	 */

	/**
	 * @typedef {object} TemporalTimelike
	 * @property {number} epochMilliseconds - milliseconds since the Unix epoch (present on Temporal.Instant and Temporal.ZonedDateTime)
	 */

	/**
	 * @callback Tick
	 * @param {number|string|TemporalDuration} tickValue milliseconds, a string parseable by parseTime, or a Temporal.Duration
	 * @returns {number} will return the new `now` value
	 */

	/**
	 * @callback TickAsync
	 * @param {number|string|TemporalDuration} tickValue milliseconds, a string parseable by parseTime, or a Temporal.Duration
	 * @returns {Promise<number>}
	 */

	/**
	 * @callback Next
	 * @returns {number}
	 */

	/**
	 * @callback NextAsync
	 * @returns {Promise<number>}
	 */

	/**
	 * @callback RunAll
	 * @returns {number}
	 */

	/**
	 * @callback RunToFrame
	 * @returns {number}
	 */

	/**
	 * @callback RunAllAsync
	 * @returns {Promise<number>}
	 */

	/**
	 * @callback RunToLast
	 * @returns {number}
	 */

	/**
	 * @callback RunToLastAsync
	 * @returns {Promise<number>}
	 */

	/**
	 * @callback Reset
	 * @returns {void}
	 */

	/**
	 * @callback SetSystemTime
	 * @param {number|Date|TemporalTimelike} [now] initial mocked time, as milliseconds since epoch, a Date, a Temporal.Instant, or a Temporal.ZonedDateTime
	 * @returns {void}
	 */

	/**
	 * @callback Jump
	 * @param {number|string|TemporalDuration} tickValue milliseconds, a human-readable value like "01:11:15", or a Temporal.Duration
	 * @returns {number}
	 */

	/**
	 * @callback Uninstall
	 * @returns {void}
	 */

	/**
	 * @callback SetTickMode
	 * @param {SetTickModeConfig} tickModeConfig - The new configuration for how the clock should tick.
	 * @returns {void}
	 */

	/**
	 * @callback Hrtime
	 * @param {Array<number>} [prev]
	 * @returns {Array<number>}
	 */

	/**
	 * @callback WithGlobal
	 * @param {object} _global Namespace to mock (e.g. `window`)
	 * @returns {FakeTimers}
	 */

	/**
	 * @typedef {"setTimeout" | "clearTimeout" | "setImmediate" | "clearImmediate" | "setInterval" | "clearInterval" | "Date" | "nextTick" | "hrtime" | "requestAnimationFrame" | "cancelAnimationFrame" | "requestIdleCallback" | "cancelIdleCallback" | "performance" | "queueMicrotask" | "Intl" | "Temporal"} FakeMethod
	 */

	/**
	 * @typedef {number | NodeImmediate | Timer} TimerId
	 */

	/* eslint-disable jsdoc/reject-any-type */
	/**
	 * @typedef {Record<string, any> & {
	 *   setTimeout?: SetTimeout,
	 *   clearTimeout?: ClearTimeout,
	 *   setInterval?: SetInterval,
	 *   clearInterval?: ClearInterval,
	 *   setImmediate?: SetImmediate,
	 *   clearImmediate?: ClearImmediate,
	 *   queueMicrotask?: QueueMicrotask,
	 *   requestAnimationFrame?: RequestAnimationFrame,
	 *   cancelAnimationFrame?: CancelAnimationFrame,
	 *   requestIdleCallback?: RequestIdleCallback,
	 *   cancelIdleCallback?: CancelIdleCallback,
	 *   process?: any,
	 *   performance?: any,
	 *   Performance?: any,
	 *   Intl?: any,
	 *   Temporal?: any,
	 *   Promise?: typeof Promise,
	 *   Date: typeof Date & { isFake?: boolean, toSource?: () => string, clock?: any }
	 * }} GlobalObject
	 */

	/**
	 * @typedef {object} TimerHeap
	 * @property {Timer[]} timers - the heap-ordered timers
	 * @property {() => Timer | undefined} peek - returns the next timer without removing it
	 * @property {(timer: Timer) => void} push - adds a timer to the heap
	 * @property {() => Timer | undefined} pop - removes and returns the next timer
	 * @property {(timer: Timer) => void} remove - removes a specific timer
	 */

	/**
	 * @typedef {object} ClockTickMode
	 * @property {TickMode} mode - active tick mode
	 * @property {number} counter - increments whenever the mode changes
	 * @property {number} [delta] - interval length in milliseconds
	 */

	/**
	 * @typedef {object} SetTickModeConfig
	 * @property {TickMode} mode - desired tick mode
	 * @property {number} [delta] - interval length in milliseconds
	 */

	/**
	 * @typedef {Record<string, any> & { clock: Clock }} IntlWithClock
	 */

	/**
	 * @typedef {Record<string, any> & { now: () => number }} PerformanceLike
	 */

	/**
	 * @typedef {object} Timers
	 * @property {SetTimeout} setTimeout - native `setTimeout`
	 * @property {ClearTimeout} clearTimeout - native `clearTimeout`
	 * @property {SetInterval} setInterval - native `setInterval`
	 * @property {ClearInterval} clearInterval - native `clearInterval`
	 * @property {typeof Date} Date - native `Date`
	 * @property {typeof Intl} [Intl] - native `Intl`
	 * @property {any} [Temporal] - native `Temporal`
	 * @property {SetImmediate} [setImmediate] - native `setImmediate`, if available
	 * @property {ClearImmediate} [clearImmediate] - native `clearImmediate`, if available
	 * @property {Hrtime} [hrtime] - native `process.hrtime`, if available
	 * @property {NextTick} [nextTick] - native `process.nextTick`, if available
	 * @property {PerformanceLike} [performance] - native `performance`, if available
	 * @property {RequestAnimationFrame} [requestAnimationFrame] - native `requestAnimationFrame`, if available
	 * @property {QueueMicrotask} [queueMicrotask] - whether `queueMicrotask` exists
	 * @property {CancelAnimationFrame} [cancelAnimationFrame] - native `cancelAnimationFrame`, if available
	 * @property {RequestIdleCallback} [requestIdleCallback] - native `requestIdleCallback`, if available
	 * @property {CancelIdleCallback} [cancelIdleCallback] - native `cancelIdleCallback`, if available
	 */

	/**
	 * @typedef {object} ClockState
	 * @property {number} tickFrom - lower bound of the current tick range
	 * @property {number} tickTo - upper bound of the current tick range
	 * @property {number} [previous] - previous timer time used during ticking
	 * @property {number | null} [oldNow] - previous value of `now`
	 * @property {Timer} [timer] - timer currently being processed
	 * @property {unknown} [firstException] - first exception raised while processing timers
	 * @property {number} [nanosTotal] - accumulated nanoseconds from fractional ticks
	 * @property {number} [msFloat] - accumulated fractional milliseconds
	 * @property {number} [ms] - accumulated whole milliseconds
	 */

	/**
	 * @typedef {object} TimerInitialProps
	 * @property {VoidVarArgsFunc} func - callback or string to execute
	 * @property {unknown[]} [args] - arguments passed to the callback
	 * @property {'Timeout' | 'Interval' | 'Immediate' | 'AnimationFrame' | 'IdleCallback'} [type] - timer kind
	 * @property {number} [delay] - requested delay in milliseconds
	 * @property {number} [callAt] - scheduled execution time
	 * @property {number} [createdAt] - time at which the timer was created
	 * @property {boolean} [immediate] - whether this timer should run before non-immediate timers at the same time
	 * @property {number} [id] - unique timer identifier
	 * @property {Error} [error] - captured stack for loop diagnostics
	 * @property {number} [interval] - interval for repeated timers
	 * @property {boolean} [animation] - whether this is an animation frame timer
	 * @property {boolean} [requestIdleCallback] - whether this is an idle callback timer
	 * @property {number} [order] - execution order for timers at the same time
	 * @property {number} [heapIndex] - index in the timer heap
	 */

	/**
	 * @callback CreateClockCallback
	 * @param {number|Date|TemporalTimelike} [start] initial mocked time, as milliseconds since epoch, a Date, a Temporal.Instant, or a Temporal.ZonedDateTime
	 * @param {number} [loopLimit] maximum number of timers run before aborting with an infinite-loop error
	 * @returns {Clock}
	 */

	/**
	 * @callback InstallCallback
	 * @param {Config} [config] Optional config
	 * @returns {Clock}
	 */

	/**
	 * @typedef {object} FakeTimers
	 * @property {Timers} timers - the native timer APIs saved for later restoration
	 * @property {CreateClockCallback} createClock - creates a new fake clock
	 * @property {InstallCallback} install - installs the fake timers onto the default global object
	 * @property {WithGlobal} withGlobal - creates a fake-timers instance for a provided global object
	 */

	/**
	 * @typedef {object} Clock
	 * @property {number} now - current mocked time in milliseconds
	 * @property {typeof Date & {clock?: Clock, isFake?: boolean, toSource?: () => string}} Date - fake Date constructor bound to this clock
	 * @property {number} loopLimit - maximum number of timers before assuming an infinite loop
	 * @property {RequestIdleCallback} requestIdleCallback - schedules an idle callback
	 * @property {CancelIdleCallback} cancelIdleCallback - cancels a scheduled idle callback
	 * @property {SetTimeout} setTimeout - faked `setTimeout`
	 * @property {ClearTimeout} clearTimeout - faked `clearTimeout`
	 * @property {NextTick} nextTick - faked `process.nextTick`
	 * @property {QueueMicrotask} queueMicrotask - faked `queueMicrotask`
	 * @property {SetInterval} setInterval - faked `setInterval`
	 * @property {ClearInterval} clearInterval - faked `clearInterval`
	 * @property {SetImmediate} setImmediate - faked `setImmediate`
	 * @property {ClearImmediate} clearImmediate - faked `clearImmediate`
	 * @property {CountTimers} countTimers - counts scheduled timers
	 * @property {RequestAnimationFrame} requestAnimationFrame - schedules a frame callback
	 * @property {CancelAnimationFrame} cancelAnimationFrame - cancels a frame callback
	 * @property {RunMicrotasks} runMicrotasks - drains microtasks
	 * @property {Tick} tick - advances fake time synchronously
	 * @property {TickAsync} tickAsync - advances fake time asynchronously
	 * @property {Next} next - runs the next scheduled timer
	 * @property {NextAsync} nextAsync - runs the next scheduled timer asynchronously
	 * @property {RunAll} runAll - runs all scheduled timers
	 * @property {RunToFrame} runToFrame - runs timers up to the next animation frame
	 * @property {RunAllAsync} runAllAsync - runs all scheduled timers asynchronously
	 * @property {RunToLast} runToLast - runs timers up to the last scheduled timer
	 * @property {RunToLastAsync} runToLastAsync - runs timers up to the last scheduled timer asynchronously
	 * @property {Reset} reset - clears all timers and resets the clock
	 * @property {SetSystemTime} setSystemTime - sets the clock to a specific wall-clock time
	 * @property {Jump} jump - advances time and returns the new `now`
	 * @property {any} performance - fake performance object
	 * @property {Hrtime} hrtime - faked `process.hrtime`
	 * @property {Uninstall} uninstall - restores native timers
	 * @property {string[]} methods - names of faked methods
	 * @property {boolean} [shouldClearNativeTimers] - inherited from config
	 * @property {{methodName:string, original:unknown}[] | undefined} timersModuleMethods - saved Node timers module methods
	 * @property {{methodName:string, original:unknown}[] | undefined} timersPromisesModuleMethods - saved Node timers/promises methods
	 * @property {Map<VoidVarArgsFunc, AbortSignal>} abortListenerMap - active abort listeners
	 * @property {SetTickMode} setTickMode - switches the auto-tick mode
	 * @property {Map<number, Timer>} [timers] - internal timer storage
	 * @property {TimerHeap} [timerHeap] - internal timer heap
	 * @property {boolean} [duringTick] - internal flag
	 * @property {boolean} isNearInfiniteLimit - internal flag indicating the loop limit is nearly reached
	 * @property {TimerId} [attachedInterval] - internal flag
	 * @property {ClockTickMode} [tickMode] - internal flag
	 * @property {Timer[]} [jobs] - internal flag
	 * @property {IntlWithClock} [Intl] - fake Intl object
	 * @property {any} [Temporal] - fake Temporal object
	 */
	/* eslint-enable jsdoc/reject-any-type */

	/**
	 * Configuration object for the `install` method.
	 * @typedef {object} Config
	 * @property {number|Date|TemporalTimelike} [now] initial mocked time, as milliseconds since epoch, a Date, a Temporal.Instant, or a Temporal.ZonedDateTime
	 * @property {FakeMethod[]} [toFake] method names that should be faked
	 * @property {FakeMethod[]} [toNotFake] method names that should remain native
	 * @property {number} [loopLimit] maximum number of timers run before aborting with an infinite-loop error
	 * @property {boolean} [shouldAdvanceTime] automatically increments mocked time while the clock is installed
	 * @property {number} [advanceTimeDelta] interval in milliseconds used when `shouldAdvanceTime` is enabled
	 * @property {boolean} [shouldClearNativeTimers] forwards clear calls to native methods when the timer is not fake
	 * @property {boolean} [ignoreMissingTimers] suppresses errors when a requested timer is missing from the global object
	 * @property {GlobalObject} [target] global object to install onto
	 */

	/**
	 * The internal structure to describe a scheduled fake timer
	 * @typedef {TimerInitialProps} Timer
	 * @property {unknown[]} args - arguments passed to the callback
	 * @property {number} callAt - scheduled execution time
	 * @property {number} createdAt - time at which the timer was created
	 * @property {number} id - unique timer identifier
	 * @property {'Timeout' | 'Interval' | 'Immediate' | 'AnimationFrame' | 'IdleCallback'} type - timer kind
	 */

	/**
	 * @callback NodeImmediateHasRef
	 * @returns {boolean}
	 */

	/**
	 * @callback NodeImmediateRef
	 * @returns {NodeImmediate}
	 */

	/**
	 * @callback NodeImmediateUnref
	 * @returns {NodeImmediate}
	 */

	/**
	 * A Node timer
	 * @typedef {object} NodeImmediate
	 * @property {NodeImmediateHasRef} hasRef - reports whether the timer keeps the event loop alive
	 * @property {NodeImmediateRef} ref - marks the timer as referenced
	 * @property {NodeImmediateUnref} unref - marks the timer as unreferenced
	 */

	/* eslint-disable complexity */

	/**
	 * Mocks available features in the specified global namespace.
	 * @param {GlobalObject} _global Namespace to mock (e.g. `window`)
	 * @returns {FakeTimers}
	 */
	function withGlobal(_global) {
	    const maxTimeout = Math.pow(2, 31) - 1; //see https://heycam.github.io/webidl/#abstract-opdef-converttoint
	    const idCounterStart = 1e12; // arbitrarily large number to avoid collisions with native timer IDs
	    const NOOP = function () {
	        return undefined;
	    };
	    const NOOP_ARRAY = function () {
	        return [];
	    };
	    const isPresent = {};
	    let timeoutResult,
	        addTimerReturnsObject = false;

	    if (_global.setTimeout) {
	        isPresent.setTimeout = true;
	        timeoutResult = _global.setTimeout(NOOP, 0);
	        addTimerReturnsObject = typeof timeoutResult === "object";
	    }
	    isPresent.clearTimeout = Boolean(_global.clearTimeout);
	    isPresent.setInterval = Boolean(_global.setInterval);
	    isPresent.clearInterval = Boolean(_global.clearInterval);
	    isPresent.hrtime =
	        _global.process && typeof _global.process.hrtime === "function";
	    isPresent.hrtimeBigint =
	        isPresent.hrtime && typeof _global.process.hrtime.bigint === "function";
	    isPresent.nextTick =
	        _global.process && typeof _global.process.nextTick === "function";
	    const utilPromisify =
	        _global.process && _global.__vitest_required__?.util.promisify;
	    isPresent.performance =
	        _global.performance && typeof _global.performance.now === "function";
	    const hasPerformancePrototype =
	        _global.Performance &&
	        (typeof _global.Performance).match(/^(function|object)$/);
	    const hasPerformanceConstructorPrototype =
	        _global.performance &&
	        _global.performance.constructor &&
	        _global.performance.constructor.prototype;
	    isPresent.queueMicrotask = Object.prototype.hasOwnProperty.call(
	        _global,
	        "queueMicrotask",
	    );
	    isPresent.requestAnimationFrame =
	        _global.requestAnimationFrame &&
	        typeof _global.requestAnimationFrame === "function";
	    isPresent.cancelAnimationFrame =
	        _global.cancelAnimationFrame &&
	        typeof _global.cancelAnimationFrame === "function";
	    isPresent.requestIdleCallback =
	        _global.requestIdleCallback &&
	        typeof _global.requestIdleCallback === "function";
	    isPresent.cancelIdleCallback =
	        _global.cancelIdleCallback &&
	        typeof _global.cancelIdleCallback === "function";
	    isPresent.setImmediate =
	        _global.setImmediate && typeof _global.setImmediate === "function";
	    isPresent.clearImmediate =
	        _global.clearImmediate && typeof _global.clearImmediate === "function";
	    isPresent.Intl = _global.Intl && typeof _global.Intl === "object";
	    isPresent.Temporal =
	        _global.Temporal !== null &&
	        typeof _global.Temporal === "object" &&
	        typeof _global.Temporal.Now !== "undefined" &&
	        typeof _global.Temporal.Instant !== "undefined";

	    if (_global.clearTimeout) {
	        _global.clearTimeout(timeoutResult);
	    }

	    const NativeDate = _global.Date;
	    const NativeIntl = isPresent.Intl
	        ? Object.defineProperties(
	              Object.create(null),
	              Object.getOwnPropertyDescriptors(_global.Intl),
	          )
	        : undefined;
	    const NativeTemporal = isPresent.Temporal ? _global.Temporal : undefined;
	    let uniqueTimerId = idCounterStart;
	    /** @type {number} */
	    let uniqueTimerOrder = 0;

	    if (NativeDate === undefined) {
	        throw new Error(
	            "The global scope doesn't have a `Date` object" +
	                " (see https://github.com/sinonjs/sinon/issues/1852#issuecomment-419622780)",
	        );
	    }
	    isPresent.Date = true;

	    /**
	     * The PerformanceEntry object encapsulates a single performance metric
	     * that is part of the browser's performance timeline.
	     *
	     * This is an object returned by the `mark` and `measure` methods on the Performance prototype
	     */
	    class FakePerformanceEntry {
	        constructor(name, entryType, startTime, duration) {
	            this.name = name;
	            this.entryType = entryType;
	            this.startTime = startTime;
	            this.duration = duration;
	        }

	        toJSON() {
	            return JSON.stringify({ ...this });
	        }
	    }

	    /**
	     * @param {number} num
	     * @returns {boolean}
	     */
	    function isNumberFinite(num) {
	        if (Number.isFinite) {
	            return Number.isFinite(num);
	        }

	        return isFinite(num);
	    }

	    /**
	     * @param {Clock} clock
	     * @param {number} i
	     */
	    function checkIsNearInfiniteLimit(clock, i) {
	        if (clock.loopLimit && i === clock.loopLimit - 1) {
	            clock.isNearInfiniteLimit = true;
	        }
	    }

	    /**
	     * @param {Clock} clock
	     */
	    function resetIsNearInfiniteLimit(clock) {
	        if (clock) {
	            clock.isNearInfiniteLimit = false;
	        }
	    }

	    /**
	     * Parse strings like "01:10:00" (meaning 1 hour, 10 minutes, 0 seconds) into
	     * number of milliseconds. This is used to support human-readable strings passed
	     * to clock.tick()
	     * @param {string} str
	     * @returns {number}
	     */
	    function parseTime(str) {
	        if (!str) {
	            return 0;
	        }

	        const strings = str.split(":");
	        const l = strings.length;
	        let i = l;
	        let ms = 0;
	        let parsed;

	        if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
	            throw new Error(
	                "tick only understands numbers, 'm:s' and 'h:m:s'. Each part must be two digits",
	            );
	        }

	        while (i--) {
	            parsed = parseInt(strings[i], 10);

	            if (parsed >= 60) {
	                throw new Error(`Invalid time ${str}`);
	            }

	            ms += parsed * Math.pow(60, l - i - 1);
	        }

	        return ms * 1000;
	    }

	    /**
	     * Get the decimal part of the millisecond value as nanoseconds
	     * @param {number} msFloat the number of milliseconds
	     * @returns {number} an integer number of nanoseconds in the range [0,1e6)
	     *
	     * Example: nanoRemainer(123.456789) -> 456789
	     */
	    function nanoRemainder(msFloat) {
	        const modulo = 1e6;
	        const remainder = (msFloat * 1e6) % modulo;
	        const positiveRemainder =
	            remainder < 0 ? remainder + modulo : remainder;

	        return Math.floor(positiveRemainder);
	    }

	    /**
	     * Used to grok the `now` parameter to createClock.
	     * @param {Date|number|TemporalTimelike} epoch the system time
	     * @returns {number}
	     */
	    function getEpoch(epoch) {
	        if (!epoch) {
	            return 0;
	        }
	        if (typeof epoch === "number") {
	            return epoch;
	        }
	        if (typeof (/** @type {Date} */ (epoch).getTime) === "function") {
	            return /** @type {Date} */ (epoch).getTime();
	        }
	        if (
	            typeof (
	                /** @type {TemporalTimelike} */ (epoch).epochMilliseconds
	            ) === "number"
	        ) {
	            // Temporal.Instant and Temporal.ZonedDateTime both have epochMilliseconds
	            return /** @type {TemporalTimelike} */ (epoch).epochMilliseconds;
	        }
	        throw new TypeError("now should be milliseconds since UNIX epoch");
	    }

	    /**
	     * @param {number} from
	     * @param {number} to
	     * @param {Timer} timer
	     * @returns {boolean}
	     */
	    function inRange(from, to, timer) {
	        return timer && timer.callAt >= from && timer.callAt <= to;
	    }

	    /**
	     * @param {Clock} clock
	     * @param {Timer} job
	     * @returns {Error}
	     */
	    function getInfiniteLoopError(clock, job) {
	        const infiniteLoopError = new Error(
	            `Aborting after running ${clock.loopLimit} timers, assuming an infinite loop!`,
	        );

	        if (!job.error) {
	            return infiniteLoopError;
	        }

	        // pattern never matched in Node
	        const computedTargetPattern = /target\.*[<|(|[].*?[>|\]|)]\s*/;
	        let clockMethodPattern = new RegExp(
	            String(Object.keys(clock).join("|")),
	        );

	        if (addTimerReturnsObject) {
	            // node.js environment
	            clockMethodPattern = new RegExp(
	                `\\s+at (Object\\.)?(?:${Object.keys(clock).join("|")})\\s+`,
	            );
	        }

	        let matchedLineIndex = -1;
	        job.error.stack.split("\n").some(function (line, i) {
	            // If we've matched a computed target line (e.g. setTimeout) then we
	            // don't need to look any further. Return true to stop iterating.
	            const matchedComputedTarget = line.match(computedTargetPattern);
	            /* istanbul ignore if */
	            if (matchedComputedTarget) {
	                matchedLineIndex = i;
	                return true;
	            }

	            // If we've matched a clock method line, then there may still be
	            // others further down the trace. Return false to keep iterating.
	            const matchedClockMethod = line.match(clockMethodPattern);
	            if (matchedClockMethod) {
	                matchedLineIndex = i;
	                return false;
	            }

	            // If we haven't matched anything on this line, but we matched
	            // previously and set the matched line index, then we can stop.
	            // If we haven't matched previously, then we should keep iterating.
	            return matchedLineIndex >= 0;
	        });

	        const stack = `${infiniteLoopError}\n${job.type || "Microtask"} - ${
	            job.func.name || "anonymous"
	        }\n${job.error.stack
	            .split("\n")
	            .slice(matchedLineIndex + 1)
	            .join("\n")}`;

	        try {
	            Object.defineProperty(infiniteLoopError, "stack", {
	                value: stack,
	            });
	        } catch {
	            // noop
	        }

	        return infiniteLoopError;
	    }

	    /**
	     * @returns {typeof Date & { clock: Clock }}
	     */
	    function createDate() {
	        class ClockDate extends NativeDate {
	            /** @type {Clock} */
	            static clock;

	            constructor(...args) {
	                // Preserve fake time when Date is called without arguments.
	                if (args.length === 0) {
	                    super(ClockDate.clock.now);
	                } else {
	                    // The subclass is intentionally thin for explicit args.
	                    // @ts-expect-error Date constructor overloads are intentionally dynamic.
	                    super(...args);
	                }

	                // ensures identity checks using the constructor prop still works
	                // this should have no other functional effect
	                Object.defineProperty(this, "constructor", {
	                    value: NativeDate,
	                    enumerable: false,
	                });
	            }

	            static [Symbol.hasInstance](instance) {
	                return instance instanceof NativeDate;
	            }
	        }

	        ClockDate.isFake = true;

	        if (NativeDate.now) {
	            ClockDate.now = function now() {
	                return ClockDate.clock.now;
	            };
	        }

	        const NativeDateWithToSource =
	            /** @type {typeof Date & { toSource?: () => string }} */ (
	                NativeDate
	            );

	        if (NativeDateWithToSource.toSource) {
	            ClockDate.toSource = function toSource() {
	                return NativeDateWithToSource.toSource();
	            };
	        }

	        ClockDate.toString = function toString() {
	            return NativeDateWithToSource.toString();
	        };

	        // noinspection UnnecessaryLocalVariableJS
	        /**
	         * A normal Class constructor cannot be called without `new`, but Date can, so we need
	         * to wrap it in a Proxy in order to ensure this functionality of Date is kept intact
	         * @type {typeof ClockDate}
	         */
	        const ClockDateProxy = new Proxy(ClockDate, {
	            // handler for [[Call]] invocations (i.e. not using `new`)
	            apply() {
	                // the Date constructor called as a function, ref Ecma-262 Edition 5.1, section 15.9.2.
	                // This remains so in the 10th edition of 2019 as well.
	                if (this instanceof ClockDate) {
	                    throw new TypeError(
	                        "A Proxy should only capture `new` calls with the `construct` handler. This is not supposed to be possible, so check the logic.",
	                    );
	                }

	                return new NativeDate(ClockDate.clock.now).toString();
	            },
	        });

	        return /** @type {typeof Date & { clock: Clock }} */ (
	            /** @type {unknown} */ (ClockDateProxy)
	        );
	    }

	    /**
	     * Mirror Intl by default on our fake implementation
	     *
	     * Most of the properties are the original native ones,
	     * but we need to take control of those that have a
	     * dependency on the current clock.
	     * @param {Clock} clock
	     * @returns {IntlWithClock} the partly fake Intl implementation
	     */
	    function createIntl(clock) {
	        /** @type {IntlWithClock} */
	        const IntlWithClock = { clock: clock };
	        /*
	         * All properties of Intl are non-enumerable, so we need
	         * to do a bit of work to get them out.
	         */
	        Object.getOwnPropertyNames(NativeIntl).forEach(
	            (property) => (IntlWithClock[property] = NativeIntl[property]),
	        );

	        IntlWithClock.DateTimeFormat = function (...args) {
	            const realFormatter = new NativeIntl.DateTimeFormat(...args);
	            const formatter = {};

	            ["formatRange", "formatRangeToParts", "resolvedOptions"].forEach(
	                (method) => {
	                    formatter[method] =
	                        realFormatter[method].bind(realFormatter);
	                },
	            );

	            ["format", "formatToParts"].forEach((method) => {
	                formatter[method] = function (date) {
	                    return realFormatter[method](
	                        date || IntlWithClock.clock.now,
	                    );
	                };
	            });

	            return formatter;
	        };

	        IntlWithClock.DateTimeFormat.prototype = Object.create(
	            NativeIntl.DateTimeFormat.prototype,
	        );

	        IntlWithClock.DateTimeFormat.supportedLocalesOf =
	            NativeIntl.DateTimeFormat.supportedLocalesOf;

	        return IntlWithClock;
	    }

	    //eslint-disable-next-line jsdoc/require-jsdoc
	    function createTemporal(clock, getNanos) {
	        const fakeNow = {
	            instant() {
	                return NativeTemporal.Instant.fromEpochNanoseconds(
	                    BigInt(clock.now) * 1_000_000n + BigInt(getNanos()),
	                );
	            },
	            timeZoneId() {
	                return NativeTemporal.Now.timeZoneId();
	            },
	            zonedDateTimeISO(timeZone) {
	                const tz = timeZone ?? NativeTemporal.Now.timeZoneId();
	                return fakeNow.instant().toZonedDateTimeISO(tz);
	            },
	            plainDateTimeISO(timeZone) {
	                return fakeNow.zonedDateTimeISO(timeZone).toPlainDateTime();
	            },
	            plainDateISO(timeZone) {
	                return fakeNow.zonedDateTimeISO(timeZone).toPlainDate();
	            },
	            plainTimeISO(timeZone) {
	                return fakeNow.zonedDateTimeISO(timeZone).toPlainTime();
	            },
	        };

	        const TemporalWithClock = Object.create(
	            Object.getPrototypeOf(NativeTemporal),
	        );
	        [
	            ...Object.getOwnPropertyNames(NativeTemporal),
	            ...Object.getOwnPropertySymbols(NativeTemporal),
	        ].forEach((prop) => {
	            Object.defineProperty(
	                TemporalWithClock,
	                prop,
	                Object.getOwnPropertyDescriptor(NativeTemporal, prop),
	            );
	        });
	        // Temporal.Now is writable:false in the spec so we must use defineProperty
	        Object.defineProperty(TemporalWithClock, "Now", {
	            value: fakeNow,
	            writable: true,
	            enumerable: false,
	            configurable: true,
	        });

	        return TemporalWithClock;
	    }

	    //eslint-disable-next-line jsdoc/require-jsdoc
	    function enqueueJob(clock, job) {
	        // enqueues a microtick-deferred task - ecma262/#sec-enqueuejob
	        if (!clock.jobs) {
	            clock.jobs = [];
	        }
	        clock.jobs.push(job);
	    }

	    //eslint-disable-next-line jsdoc/require-jsdoc
	    function runJobs(clock) {
	        // runs all microtick-deferred tasks - ecma262/#sec-runjobs
	        if (!clock.jobs) {
	            return;
	        }
	        const wasNearLimit = clock.isNearInfiniteLimit;
	        for (let i = 0; i < clock.jobs.length; i++) {
	            const job = clock.jobs[i];
	            job.func.apply(null, job.args);

	            checkIsNearInfiniteLimit(clock, i);
	            if (clock.loopLimit && i > clock.loopLimit) {
	                throw getInfiniteLoopError(clock, job);
	            }
	        }
	        if (!wasNearLimit) {
	            resetIsNearInfiniteLimit(clock);
	        }
	        clock.jobs = [];
	    }

	    /**
	     * A compact "soonest timer first" container.
	     *
	     * Think of this as a waiting room for scheduled callbacks where the next
	     * callback to run is always kept at the front of the list. The internal
	     * array is arranged so we can find, add, remove, and reorder timers
	     * efficiently without sorting the whole list every time something changes.
	     *
	     * The important idea is not the data structure name, but the behavior:
	     * the timer that should run next stays near the front, and when one timer
	     * moves, the rest are shifted just enough to keep that promise true.
	     */
	    class TimerHeap {
	        constructor() {
	            this.timers = [];
	        }

	        /**
	         * Look at the next timer without removing it.
	         * This is the timer the clock would run first if time advanced now.
	         * @returns {Timer}
	         */
	        peek() {
	            return this.timers[0];
	        }

	        /**
	         * Add a timer to the waiting room, then move it upward until it is in
	         * the right place relative to the timers it should run before and after.
	         * @param {Timer} timer
	         */
	        push(timer) {
	            this.timers.push(timer);
	            this.bubbleUp(this.timers.length - 1);
	        }

	        /**
	         * Remove and return the next timer to run.
	         *
	         * We pull the front timer out, move the last timer into the empty spot,
	         * and then shift that replacement down until the ordering is correct
	         * again. That avoids rebuilding the whole list from scratch.
	         * @returns {Timer|undefined}
	         */
	        pop() {
	            if (this.timers.length === 0) {
	                return undefined;
	            }
	            const first = this.timers[0];
	            const last = this.timers.pop();
	            if (this.timers.length > 0) {
	                this.timers[0] = last;
	                last.heapIndex = 0;
	                this.bubbleDown(0);
	            }
	            delete first.heapIndex;
	            return first;
	        }

	        /**
	         * Remove a specific timer from the waiting room.
	         *
	         * The heap stores timers in a shape that lets us jump directly to the
	         * timer's current position, replace it with the last timer, and then
	         * move that replacement up or down until the ordering is correct again.
	         * @param {Timer} timer
	         * @returns {boolean}
	         */
	        remove(timer) {
	            const index = timer.heapIndex;
	            if (index === undefined || this.timers[index] !== timer) {
	                return false;
	            }
	            const last = this.timers.pop();
	            if (timer !== last) {
	                this.timers[index] = last;
	                last.heapIndex = index;
	                if (compareTimers(last, timer) < 0) {
	                    this.bubbleUp(index);
	                } else {
	                    this.bubbleDown(index);
	                }
	            }
	            delete timer.heapIndex;
	            return true;
	        }

	        /**
	         * Move a timer toward the front until it is no longer "earlier" than
	         * the timer above it.
	         *
	         * Conceptually, this is what happens when something newly scheduled
	         * turns out to belong ahead of its parent in the waiting room. We keep
	         * swapping it upward until it is no longer out of place.
	         * @param {number} index
	         */
	        bubbleUp(index) {
	            const timer = this.timers[index];
	            let currentIndex = index;
	            while (currentIndex > 0) {
	                const parentIndex = Math.floor((currentIndex - 1) / 2);
	                const parent = this.timers[parentIndex];
	                if (compareTimers(timer, parent) < 0) {
	                    this.timers[currentIndex] = parent;
	                    parent.heapIndex = currentIndex;
	                    currentIndex = parentIndex;
	                } else {
	                    break;
	                }
	            }
	            this.timers[currentIndex] = timer;
	            timer.heapIndex = currentIndex;
	        }

	        /**
	         * Move a timer away from the front until the timer below it is no
	         * longer supposed to run after it.
	         *
	         * This is the opposite of `bubbleUp`: when a timer at the front is
	         * removed or moved, the replacement may be too far ahead, so we
	         * repeatedly swap it downward with the best child until the waiting
	         * room is ordered again.
	         * @param {number} index
	         */
	        bubbleDown(index) {
	            const timer = this.timers[index];
	            let currentIndex = index;
	            const halfLength = Math.floor(this.timers.length / 2);
	            while (currentIndex < halfLength) {
	                const leftIndex = currentIndex * 2 + 1;
	                const rightIndex = leftIndex + 1;
	                let bestChildIndex = leftIndex;
	                let bestChild = this.timers[leftIndex];

	                if (
	                    rightIndex < this.timers.length &&
	                    compareTimers(this.timers[rightIndex], bestChild) < 0
	                ) {
	                    bestChildIndex = rightIndex;
	                    bestChild = this.timers[rightIndex];
	                }

	                if (compareTimers(bestChild, timer) < 0) {
	                    this.timers[currentIndex] = bestChild;
	                    bestChild.heapIndex = currentIndex;
	                    currentIndex = bestChildIndex;
	                } else {
	                    break;
	                }
	            }
	            this.timers[currentIndex] = timer;
	            timer.heapIndex = currentIndex;
	        }
	    }

	    /**
	     * Ensure timer storage and heap stay in sync even if a clear path touches
	     * timer state before anything has been scheduled.
	     *
	     * Why do we need two data structures to keep tabs on timers?
	     * 1. Fast ID Lookup (clock.timers): This is a Map from timer IDs to their respective timer objects. It allows clearTimeout(id) and
	     * clearInterval(id) to be $O(1)$ operations. Without this map, finding a specific timer in the heap to remove it would require a linear
	     * $O(n)$ search, which would significantly degrade performance as the number of active timers grows.
	     * 2. Efficient Scheduling (clock.timerHeap): This is a priority queue (min-heap) that keeps timers ordered by their execution time (callAt). It
	     * allows the library to instantly find the next timer to run (peek() in $O(1)$) and efficiently update the schedule when timers are added or
	     * removed ($O(\log n)$).
	     *
	     * In short: clock.timers provides fast access by ID, while clock.timerHeap provides fast access by Time. Removing either one would make common
	     * operations (like clearing or finding the next timer) much slower.
	     * @param {Clock} clock
	     */
	    function ensureTimerState(clock) {
	        if (!clock.timers) {
	            clock.timers = new Map();
	            clock.timerHeap = new TimerHeap();
	        }
	    }

	    /**
	     * @param {Clock} clock
	     * @param {number} id
	     * @returns {boolean}
	     */
	    function hasTimer(clock, id) {
	        return clock.timers ? clock.timers.has(id) : false;
	    }

	    /**
	     * @param {Clock} clock
	     * @param {number} id
	     * @returns {Timer}
	     */
	    function getTimer(clock, id) {
	        return clock.timers ? clock.timers.get(id) : undefined;
	    }

	    /**
	     * @param {Clock} clock
	     * @param {Timer} timer
	     */
	    function setTimer(clock, timer) {
	        ensureTimerState(clock);
	        clock.timers.set(timer.id, timer);
	    }

	    /**
	     * @param {Clock} clock
	     * @param {number} id
	     * @returns {boolean}
	     */
	    function deleteTimer(clock, id) {
	        return clock.timers ? clock.timers.delete(id) : false;
	    }

	    /**
	     * @param {Clock} clock
	     * @param {(timer: Timer) => void} callback
	     */
	    function forEachActiveTimer(clock, callback) {
	        if (!clock.timers) {
	            return;
	        }

	        for (const timer of clock.timers.values()) {
	            callback(timer);
	        }
	    }

	    /**
	     * @param {Clock} clock
	     */
	    function rebuildTimerHeap(clock) {
	        clock.timerHeap = new TimerHeap();
	        forEachActiveTimer(clock, (timer) => {
	            clock.timerHeap.push(timer);
	        });
	    }

	    /**
	     * @param {Clock} clock
	     * @param {TimerInitialProps} timer
	     * @returns {TimerId} id of the created timer
	     */
	    function addTimer(clock, timer) {
	        if (timer.func === undefined) {
	            throw new Error("Callback must be provided to timer calls");
	        }

	        if (typeof timer.func !== "function") {
	            throw new TypeError(
	                `[ERR_INVALID_CALLBACK]: Callback must be a function. Received ${
	                    timer.func
	                } of type ${typeof timer.func}`,
	            );
	        }

	        if (clock.isNearInfiniteLimit) {
	            timer.error = new Error();
	        }

	        timer.type = timer.immediate ? "Immediate" : "Timeout";

	        if (Object.prototype.hasOwnProperty.call(timer, "delay")) {
	            if (typeof timer.delay !== "number") {
	                timer.delay = parseInt(timer.delay, 10);
	            }

	            if (!isNumberFinite(timer.delay)) {
	                timer.delay = 0;
	            }
	            timer.delay = timer.delay > maxTimeout ? 1 : timer.delay;
	            timer.delay = Math.max(0, timer.delay);
	        }

	        if (Object.prototype.hasOwnProperty.call(timer, "interval")) {
	            timer.type = "Interval";
	            timer.interval = timer.interval > maxTimeout ? 1 : timer.interval;
	        }

	        if (Object.prototype.hasOwnProperty.call(timer, "animation")) {
	            timer.type = "AnimationFrame";
	            timer.animation = true;
	        }

	        if (
	            Object.prototype.hasOwnProperty.call(timer, "requestIdleCallback")
	        ) {
	            // mark timer as IdleCallback type if it has no delay, otherwise it'd be of type timeout
	            // this way we are able to sort such that the timer only gets called when there's truly no pending task to run
	            if (!timer.delay) {
	                timer.type = "IdleCallback";
	            }
	            timer.requestIdleCallback = true;
	        }

	        ensureTimerState(clock);

	        while (hasTimer(clock, uniqueTimerId)) {
	            uniqueTimerId++;
	            if (uniqueTimerId >= Number.MAX_SAFE_INTEGER) {
	                uniqueTimerId = idCounterStart;
	            }
	        }

	        timer.id = uniqueTimerId++;
	        if (uniqueTimerId >= Number.MAX_SAFE_INTEGER) {
	            uniqueTimerId = idCounterStart;
	        }

	        timer.order = uniqueTimerOrder++;
	        timer.createdAt = clock.now;
	        timer.callAt =
	            clock.now +
	            (parseInt(String(timer.delay)) || (clock.duringTick ? 1 : 0));

	        setTimer(clock, timer);
	        clock.timerHeap.push(timer);

	        if (addTimerReturnsObject) {
	            const res = {
	                refed: true,
	                ref: function () {
	                    this.refed = true;
	                    return this;
	                },
	                unref: function () {
	                    this.refed = false;
	                    return this;
	                },
	                hasRef: function () {
	                    return this.refed;
	                },
	                refresh: function () {
	                    timer.callAt =
	                        clock.now +
	                        (parseInt(String(timer.delay)) ||
	                            (clock.duringTick ? 1 : 0));

	                    clock.timerHeap.remove(timer);
	                    timer.order = uniqueTimerOrder++;
	                    setTimer(clock, timer);
	                    clock.timerHeap.push(timer);

	                    return this;
	                },
	                [Symbol.toPrimitive]: function () {
	                    return timer.id;
	                },
	            };
	            return res;
	        }

	        return timer.id;
	    }

	    /* eslint consistent-return: "off" */
	    /**
	     * Timer comparator
	     * @param {Timer} a
	     * @param {Timer} b
	     * @returns {number}
	     */
	    function compareTimers(a, b) {
	        // Sort IdleCallback timers to the bottom when scheduled for the same time
	        if (a.type === "IdleCallback" && b.type !== "IdleCallback") {
	            return 1;
	        }
	        if (a.type !== "IdleCallback" && b.type === "IdleCallback") {
	            return -1;
	        }

	        // Sort first by absolute timing
	        if (a.callAt < b.callAt) {
	            return -1;
	        }
	        if (a.callAt > b.callAt) {
	            return 1;
	        }

	        // Sort next by immediate, immediate timers take precedence
	        if (a.immediate && !b.immediate) {
	            return -1;
	        }
	        if (!a.immediate && b.immediate) {
	            return 1;
	        }

	        if (a.order < b.order) {
	            return -1;
	        }
	        if (a.order > b.order) {
	            return 1;
	        }

	        // Sort next by creation time, earlier-created timers take precedence
	        if (a.createdAt < b.createdAt) {
	            return -1;
	        }
	        if (a.createdAt > b.createdAt) {
	            return 1;
	        }

	        // Sort next by id, lower-id timers take precedence
	        if (a.id < b.id) {
	            return -1;
	        }
	        if (a.id > b.id) {
	            return 1;
	        }

	        // As timer ids are unique, no fallback `0` is necessary
	        return 0;
	    }

	    /**
	     * @param {Clock} clock
	     * @param {number} from
	     * @param {number} to
	     * @returns {Timer}
	     */
	    function firstTimerInRange(clock, from, to) {
	        if (!clock.timerHeap) {
	            return null;
	        }

	        const timers = clock.timerHeap.timers;
	        if (timers.length === 1 && timers[0].requestIdleCallback) {
	            return timers[0];
	        }

	        const first = clock.timerHeap.peek();
	        if (first && inRange(from, to, first)) {
	            return first;
	        }

	        /**
	         * @type {?Timer}
	         */
	        let timer = null;

	        for (let i = 0; i < timers.length; i++) {
	            if (
	                inRange(from, to, timers[i]) &&
	                (!timer || compareTimers(timer, timers[i]) === 1)
	            ) {
	                timer = timers[i];
	            }
	        }

	        return timer;
	    }

	    /**
	     * @param {Clock} clock
	     * @returns {Timer}
	     */
	    function firstTimer(clock) {
	        if (!clock.timerHeap) {
	            return null;
	        }
	        return clock.timerHeap.peek() || null;
	    }

	    /**
	     * @param {Clock} clock
	     * @returns {Timer}
	     */
	    function lastTimer(clock) {
	        if (!clock.timerHeap) {
	            return null;
	        }
	        const timers = clock.timerHeap.timers;
	        let timer = null;

	        for (let i = 0; i < timers.length; i++) {
	            if (!timer || compareTimers(timer, timers[i]) === -1) {
	                timer = timers[i];
	            }
	        }

	        return timer;
	    }

	    /**
	     * @param {Clock} clock
	     * @param {Timer} timer
	     */
	    function callTimer(clock, timer) {
	        if (typeof timer.interval === "number") {
	            clock.timerHeap.remove(timer);
	            timer.callAt += timer.interval;
	            timer.order = uniqueTimerOrder++;
	            if (clock.isNearInfiniteLimit) {
	                timer.error = new Error();
	            }
	            clock.timerHeap.push(timer);
	        } else {
	            deleteTimer(clock, timer.id);
	            clock.timerHeap.remove(timer);
	        }

	        if (typeof timer.func === "function") {
	            timer.func.apply(null, timer.args);
	        }
	    }

	    /**
	     * Gets clear handler name for a given timer type
	     * @param {string} ttype
	     * @returns {string}
	     */
	    function getClearHandler(ttype) {
	        if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
	            return `cancel${ttype}`;
	        }
	        return `clear${ttype}`;
	    }

	    /**
	     * Gets schedule handler name for a given timer type
	     * @param {string} ttype
	     * @returns {string}
	     */
	    function getScheduleHandler(ttype) {
	        if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
	            return `request${ttype}`;
	        }
	        return `set${ttype}`;
	    }

	    /**
	     * Creates an anonymous function to warn only once
	     * @returns {(msg: string) => void}
	     */
	    function createWarnOnce() {
	        let calls = 0;
	        return function (msg) {
	            // eslint-disable-next-line
	            !calls++ && console.warn(msg);
	        };
	    }
	    const warnOnce = createWarnOnce();

	    /**
	     * @param {Clock} clock
	     * @param {TimerId} timerId
	     * @param {string} ttype
	     * @returns {void}
	     */
	    function clearTimer(clock, timerId, ttype) {
	        if (!timerId) {
	            // null appears to be allowed in most browsers, and appears to be
	            // relied upon by some libraries, like Bootstrap carousel
	            return;
	        }

	        // in Node, the ID is stored as the primitive value for `Timeout` objects
	        // for `Immediate` objects, no ID exists, so it gets coerced to NaN
	        const id = Number(timerId);

	        if (Number.isNaN(id) || id < idCounterStart) {
	            const handlerName = getClearHandler(ttype);

	            if (clock.shouldClearNativeTimers === true) {
	                const nativeHandler = clock[`_${handlerName}`];
	                return typeof nativeHandler === "function"
	                    ? nativeHandler(timerId)
	                    : undefined;
	            }

	            // Include the stacktrace, excluding the 'error' line
	            const stackTrace = new Error().stack
	                .split("\n")
	                .slice(1)
	                .join("\n");

	            warnOnce(
	                `FakeTimers: ${handlerName} was invoked to clear a native timer instead of one created by this library.` +
	                    "\nTo automatically clean-up native timers, use `shouldClearNativeTimers`." +
	                    `\n${stackTrace}`,
	            );
	        }

	        if (hasTimer(clock, id)) {
	            // check that the ID matches a timer of the correct type
	            const timer = getTimer(clock, id);
	            if (
	                timer.type === ttype ||
	                (timer.type === "Timeout" && ttype === "Interval") ||
	                (timer.type === "Interval" && ttype === "Timeout")
	            ) {
	                deleteTimer(clock, id);
	                clock.timerHeap.remove(timer);
	            } else {
	                const clear = getClearHandler(ttype);
	                const schedule = getScheduleHandler(timer.type);
	                throw new Error(
	                    `Cannot clear timer: timer created with ${schedule}() but cleared with ${clear}()`,
	                );
	            }
	        }
	    }

	    /**
	     * @param {object} target the target containing the method to replace
	     * @param {string} method the keyname of the method on the target
	     * @param {Clock} clock
	     */
	    function hijackMethod(target, method, clock) {
	        clock[method].hasOwnProperty = Object.prototype.hasOwnProperty.call(
	            target,
	            method,
	        );
	        clock[`_${method}`] = target[method];

	        if (method === "Date") {
	            target[method] = clock[method];
	        } else if (method === "Intl") {
	            target[method] = clock[method];
	        } else if (method === "Temporal") {
	            target[method] = clock[method];
	        } else if (method === "performance") {
	            const originalPerfDescriptor = Object.getOwnPropertyDescriptor(
	                target,
	                method,
	            );
	            // JSDOM has a read only performance field so we have to save/copy it differently
	            if (
	                originalPerfDescriptor &&
	                originalPerfDescriptor.get &&
	                !originalPerfDescriptor.set
	            ) {
	                Object.defineProperty(
	                    clock,
	                    `_${method}`,
	                    originalPerfDescriptor,
	                );

	                const perfDescriptor = Object.getOwnPropertyDescriptor(
	                    clock,
	                    method,
	                );
	                Object.defineProperty(target, method, perfDescriptor);
	            } else {
	                target[method] = clock[method];
	            }
	        } else {
	            target[method] = function () {
	                return clock[method].apply(clock, arguments);
	            };

	            Object.defineProperties(
	                target[method],
	                Object.getOwnPropertyDescriptors(clock[method]),
	            );
	        }

	        target[method].clock = clock;
	    }

	    /**
	     * @param {Clock} clock
	     * @param {number} advanceTimeDelta
	     */
	    function doIntervalTick(clock, advanceTimeDelta) {
	        clock.tick(advanceTimeDelta);
	    }

	    /** @type {Timers} */
	    const timers = {
	        setTimeout: _global.setTimeout,
	        clearTimeout: _global.clearTimeout,
	        setInterval: _global.setInterval,
	        clearInterval: _global.clearInterval,
	        Date: _global.Date,
	    };

	    if (isPresent.setImmediate) {
	        timers.setImmediate = _global.setImmediate;
	    }

	    if (isPresent.clearImmediate) {
	        timers.clearImmediate = _global.clearImmediate;
	    }

	    if (isPresent.hrtime) {
	        timers.hrtime = _global.process.hrtime;
	    }

	    if (isPresent.nextTick) {
	        timers.nextTick = _global.process.nextTick;
	    }

	    if (isPresent.performance) {
	        timers.performance = _global.performance;
	    }

	    if (isPresent.requestAnimationFrame) {
	        timers.requestAnimationFrame = _global.requestAnimationFrame;
	    }

	    if (isPresent.queueMicrotask) {
	        timers.queueMicrotask = _global.queueMicrotask;
	    }

	    if (isPresent.cancelAnimationFrame) {
	        timers.cancelAnimationFrame = _global.cancelAnimationFrame;
	    }

	    if (isPresent.requestIdleCallback) {
	        timers.requestIdleCallback = _global.requestIdleCallback;
	    }

	    if (isPresent.cancelIdleCallback) {
	        timers.cancelIdleCallback = _global.cancelIdleCallback;
	    }

	    if (isPresent.Intl) {
	        timers.Intl = NativeIntl;
	    }

	    if (isPresent.Temporal) {
	        timers.Temporal = NativeTemporal;
	    }

	    const originalSetTimeout = _global.setImmediate || _global.setTimeout;
	    const originalClearInterval = _global.clearInterval;
	    const originalSetInterval = _global.setInterval;

	    /**
	     * @param {Date|number|TemporalTimelike} [start] the system time - non-integer values are floored
	     * @param {number} [loopLimit] maximum number of timers that will be run when calling runAll()
	     * @returns {Clock}
	     */
	    function createClock(start, loopLimit) {
	        /** @type {number} */
	        // eslint-disable-next-line no-param-reassign
	        start = Math.floor(getEpoch(start));
	        const startTimestamp = start;
	        // eslint-disable-next-line no-param-reassign
	        loopLimit = loopLimit || 1000;
	        /** @type {number} */
	        let nanos = 0;
	        let uninstalled = false;
	        /** @type {number[]} */
	        const adjustedSystemTime = [0, 0]; // [millis, nanoremainder]

	        /** @type {Clock} */
	        const clock = /** @type {Clock} */ ({
	            now: start,
	            Date: createDate(),
	            loopLimit: loopLimit,
	            isNearInfiniteLimit: false,
	            tickMode: { mode: "manual", counter: 0, delta: undefined },
	        });

	        clock.Date.clock = clock;

	        //eslint-disable-next-line jsdoc/require-jsdoc
	        function getTimeToNextFrame() {
	            return 16 - ((clock.now - startTimestamp) % 16);
	        }

	        //eslint-disable-next-line jsdoc/require-jsdoc
	        function hrtime(prev) {
	            const millisSinceStart =
	                clock.now - adjustedSystemTime[0] - startTimestamp;
	            const secsSinceStart = Math.floor(millisSinceStart / 1000);
	            const remainderInNanos =
	                (millisSinceStart - secsSinceStart * 1e3) * 1e6 +
	                nanos -
	                adjustedSystemTime[1];

	            if (Array.isArray(prev)) {
	                if (prev[1] > 1e9) {
	                    throw new TypeError(
	                        "Number of nanoseconds can't exceed a billion",
	                    );
	                }

	                const oldSecs = prev[0];
	                let nanoDiff = remainderInNanos - prev[1];
	                let secDiff = secsSinceStart - oldSecs;

	                if (nanoDiff < 0) {
	                    nanoDiff += 1e9;
	                    secDiff -= 1;
	                }

	                return [secDiff, nanoDiff];
	            }
	            return [secsSinceStart, remainderInNanos];
	        }

	        /**
	         * A high resolution timestamp in milliseconds.
	         * @typedef {number} DOMHighResTimeStamp
	         */

	        /**
	         * performance.now()
	         * @returns {DOMHighResTimeStamp}
	         */
	        function fakePerformanceNow() {
	            const hrt = hrtime();
	            const millis = hrt[0] * 1000 + hrt[1] / 1e6;
	            return millis;
	        }

	        if (isPresent.hrtimeBigint) {
	            hrtime.bigint = function () {
	                const parts = hrtime();
	                return BigInt(parts[0]) * BigInt(1e9) + BigInt(parts[1]);
	            };
	        }

	        if (isPresent.Intl) {
	            clock.Intl = createIntl(clock);
	            clock.Intl.clock = clock;
	        }

	        if (isPresent.Temporal) {
	            clock.Temporal = createTemporal(clock, () => nanos);
	        }

	        /**
	         * @param {SetTickModeConfig} tickModeConfig - The new configuration for how the clock should tick.
	         */
	        clock.setTickMode = function (tickModeConfig) {
	            const { mode: newMode, delta: newDelta } =
	                /** @type {SetTickModeConfig} */ (tickModeConfig);
	            const { mode: oldMode, delta: oldDelta } = clock.tickMode;
	            if (newMode === oldMode && newDelta === oldDelta) {
	                return;
	            }

	            if (oldMode === "interval") {
	                originalClearInterval(clock.attachedInterval);
	            }

	            clock.tickMode = {
	                counter: clock.tickMode.counter + 1,
	                mode: newMode,
	                delta: newDelta,
	            };

	            if (newMode === "nextAsync") {
	                advanceUntilModeChanges();
	            } else if (newMode === "interval") {
	                createIntervalTick(clock, newDelta || 20);
	            }
	        };

	        /**
	         * Keeps advancing the native event loop until the tick mode changes.
	         * @returns {Promise<void>}
	         */
	        async function advanceUntilModeChanges() {
	            /**
	             * Waits for one native macrotask and then one microtask turn.
	             * @returns {Promise<void>}
	             */
	            async function newMacrotask() {
	                // MessageChannel ensures that setTimeout is not throttled to 4ms.
	                // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#reasons_for_delays_longer_than_specified
	                // https://stackblitz.com/edit/stackblitz-starters-qtlpcc
	                const channel = new MessageChannel();
	                await new Promise((resolve) => {
	                    channel.port1.onmessage = () => {
	                        resolve(undefined);
	                        channel.port1.close();
	                    };
	                    channel.port2.postMessage(undefined);
	                });
	                channel.port1.close();
	                channel.port2.close();
	                // setTimeout ensures microtask queue is emptied
	                await new Promise((resolve) => {
	                    originalSetTimeout(resolve);
	                });
	            }

	            const { counter } = clock.tickMode;
	            while (clock.tickMode.counter === counter) {
	                await newMacrotask();
	                if (clock.tickMode.counter !== counter) {
	                    return;
	                }
	                clock.next();
	            }
	        }

	        /**
	         * Temporarily pauses nextAsync auto-ticking while an async operation runs.
	         * @param {Promise<unknown>} promise
	         * @returns {Promise<unknown>}
	         */
	        function pauseAutoTickUntilFinished(promise) {
	            if (clock.tickMode.mode !== "nextAsync") {
	                return promise;
	            }
	            clock.setTickMode({ mode: "manual" });
	            return promise.finally(() => {
	                if (!uninstalled) {
	                    clock.setTickMode({ mode: "nextAsync" });
	                }
	            });
	        }

	        /**
	         * Returns the remaining time in the current idle window.
	         * @returns {number}
	         */
	        function getTimeToNextIdlePeriod() {
	            let timeToNextIdlePeriod = 0;

	            if (clock.countTimers() > 0) {
	                timeToNextIdlePeriod = 50; // const for now
	            }

	            return timeToNextIdlePeriod;
	        }

	        clock.requestIdleCallback = function requestIdleCallback(
	            func,
	            { timeout } = /** @type {{ timeout?: number }} */ ({}),
	        ) {
	            /**
	             * @type {IdleDeadline}
	             */
	            const idleDeadline = {
	                didTimeout: true,
	                timeRemaining: getTimeToNextIdlePeriod,
	            };

	            const result = addTimer(clock, {
	                func: func,
	                args: [idleDeadline],
	                delay: timeout,
	                requestIdleCallback: true,
	            });

	            return Number(result);
	        };

	        clock.cancelIdleCallback = function cancelIdleCallback(timerId) {
	            return clearTimer(clock, timerId, "IdleCallback");
	        };

	        clock.setTimeout = function setTimeout(func, timeout) {
	            return addTimer(clock, {
	                func: func,
	                args: Array.prototype.slice.call(arguments, 2),
	                delay: timeout,
	            });
	        };
	        if (typeof _global.Promise !== "undefined" && utilPromisify) {
	            clock.setTimeout[utilPromisify.custom] =
	                function promisifiedSetTimeout(timeout, arg) {
	                    return new _global.Promise(function setTimeoutExecutor(
	                        resolve,
	                    ) {
	                        addTimer(clock, {
	                            func: resolve,
	                            args: [arg],
	                            delay: timeout,
	                        });
	                    });
	                };
	        }

	        clock.clearTimeout = function clearTimeout(timerId) {
	            return clearTimer(clock, timerId, "Timeout");
	        };

	        clock.nextTick = function nextTick(func) {
	            return enqueueJob(clock, {
	                func: func,
	                args: Array.prototype.slice.call(arguments, 1),
	                error: clock.isNearInfiniteLimit ? new Error() : null,
	            });
	        };

	        clock.queueMicrotask = function queueMicrotask(func) {
	            return clock.nextTick(func); // explicitly drop additional arguments
	        };

	        clock.setInterval = function setInterval(func, timeout) {
	            // eslint-disable-next-line no-param-reassign
	            timeout = parseInt(String(timeout), 10);
	            return addTimer(clock, {
	                func: func,
	                args: Array.prototype.slice.call(arguments, 2),
	                delay: timeout,
	                interval: timeout,
	            });
	        };

	        clock.clearInterval = function clearInterval(timerId) {
	            return clearTimer(clock, timerId, "Interval");
	        };

	        if (isPresent.setImmediate) {
	            clock.setImmediate = /** @type {SetImmediate} */ (
	                function setImmediate(func) {
	                    return addTimer(clock, {
	                        func: func,
	                        args: Array.prototype.slice.call(arguments, 1),
	                        immediate: true,
	                    });
	                }
	            );

	            if (typeof _global.Promise !== "undefined" && utilPromisify) {
	                clock.setImmediate[utilPromisify.custom] =
	                    function promisifiedSetImmediate(arg) {
	                        return new _global.Promise(
	                            function setImmediateExecutor(resolve) {
	                                addTimer(clock, {
	                                    func: resolve,
	                                    args: [arg],
	                                    immediate: true,
	                                });
	                            },
	                        );
	                    };
	            }

	            clock.clearImmediate = function clearImmediate(timerId) {
	                return clearTimer(clock, timerId, "Immediate");
	            };
	        }

	        clock.countTimers = function countTimers() {
	            return (
	                (clock.timerHeap ? clock.timerHeap.timers.length : 0) +
	                (clock.jobs || []).length
	            );
	        };

	        clock.requestAnimationFrame = function requestAnimationFrame(func) {
	            const result = addTimer(clock, {
	                func: func,
	                delay: getTimeToNextFrame(),
	                get args() {
	                    return [fakePerformanceNow()];
	                },
	                animation: true,
	            });

	            return Number(result);
	        };

	        clock.cancelAnimationFrame = function cancelAnimationFrame(timerId) {
	            return clearTimer(clock, timerId, "AnimationFrame");
	        };

	        clock.runMicrotasks = function runMicrotasks() {
	            runJobs(clock);
	        };

	        //eslint-disable-next-line jsdoc/require-jsdoc
	        function durationToMs(duration) {
	            // relativeTo uses the real system timezone — fake-timers fakes time, not place.
	            // Calendar-unit durations (months, years) will resolve DST/length using the host tz.
	            const relativeTo = NativeTemporal.Instant.fromEpochMilliseconds(
	                clock.now,
	            ).toZonedDateTimeISO(NativeTemporal.Now.timeZoneId());
	            return duration.total({ unit: "millisecond", relativeTo });
	        }

	        /**
	         * @param {number|string|TemporalDuration} tickValue
	         * @returns {number} milliseconds as a float
	         */
	        function tickValueToMs(tickValue) {
	            if (typeof tickValue === "number") {
	                return tickValue;
	            }
	            if (
	                isPresent.Temporal &&
	                tickValue !== null &&
	                typeof tickValue === "object" &&
	                typeof (/** @type {TemporalDuration} */ (tickValue).total) ===
	                    "function"
	            ) {
	                return durationToMs(
	                    /** @type {TemporalDuration} */ (tickValue),
	                );
	            }
	            return parseTime(/** @type {string} */ (tickValue));
	        }

	        /**
	         * @param {number|string|TemporalDuration} tickValue milliseconds, a string parseable by parseTime, or a Temporal.Duration
	         * @returns {ClockState} a mutable state object for the tick execution
	         */
	        function createTickState(tickValue) {
	            const msFloat = tickValueToMs(tickValue);
	            const ms = Math.floor(msFloat);
	            const remainder = nanoRemainder(msFloat);
	            let nanosTotal = nanos + remainder;
	            let tickTo = clock.now + ms;

	            if (msFloat < 0) {
	                throw new TypeError("Negative ticks are not supported");
	            }

	            // adjust for positive overflow
	            if (nanosTotal >= 1e6) {
	                tickTo += 1;
	                nanosTotal -= 1e6;
	            }

	            return /** @type {ClockState} */ ({
	                msFloat: msFloat,
	                ms: ms,
	                nanosTotal: nanosTotal,
	                tickFrom: clock.now,
	                tickTo: tickTo,
	                previous: clock.now,
	                timer: null,
	                firstException: null,
	                oldNow: null,
	            });
	        }

	        /**
	         * @param {ClockState} state mutable tick state
	         * @param {number} oldNow the clock.now before some action
	         * @param {object} [options] compensation options
	         * @param {boolean} [options.includePrevious] whether to also update state.previous
	         */
	        function applyClockChangeCompensation(state, oldNow, options) {
	            if (oldNow !== clock.now) {
	                const difference = clock.now - oldNow;
	                state.tickFrom += difference;
	                state.tickTo += difference;
	                if (options && options.includePrevious) {
	                    state.previous += difference;
	                }
	            }
	        }

	        /**
	         * @param {ClockState} state mutable tick state
	         */
	        function runInitialJobs(state) {
	            state.oldNow = clock.now;
	            runJobs(clock);
	            applyClockChangeCompensation(state, state.oldNow);
	        }

	        /**
	         * @param {ClockState} state mutable tick state
	         */
	        function runPostLoopJobs(state) {
	            state.oldNow = clock.now;
	            runJobs(clock);
	            applyClockChangeCompensation(state, state.oldNow);
	        }

	        /**
	         * @param {ClockState} state mutable tick state
	         */
	        function selectNextTimerInRange(state) {
	            state.timer = firstTimerInRange(
	                clock,
	                state.previous,
	                state.tickTo,
	            );
	            state.previous = state.tickFrom;
	        }

	        /**
	         * @param {ClockState} state mutable tick state
	         * @param {boolean} isAsync whether this is an async tick
	         * @param {FakeTimersFunction} nextPromiseTick callback for async promise settlement
	         * @param {FakeTimersFunction} compensationCheck callback for clock change compensation
	         * @returns {boolean} whether an early return was triggered (async mode)
	         */
	        function runTimersInRange(
	            state,
	            isAsync,
	            nextPromiseTick,
	            compensationCheck,
	        ) {
	            state.timer = firstTimerInRange(
	                clock,
	                state.tickFrom,
	                state.tickTo,
	            );

	            while (state.timer && state.tickFrom <= state.tickTo) {
	                if (hasTimer(clock, state.timer.id)) {
	                    state.tickFrom = state.timer.callAt;
	                    clock.now = state.timer.callAt;
	                    state.oldNow = clock.now;
	                    try {
	                        runJobs(clock);
	                        callTimer(clock, state.timer);
	                    } catch (e) {
	                        state.firstException = state.firstException || e;
	                    }

	                    if (isAsync) {
	                        // finish up after native setImmediate callback to allow
	                        // all native es6 promises to process their callbacks after
	                        // each timer fires.
	                        originalSetTimeout(nextPromiseTick);
	                        return true;
	                    }

	                    compensationCheck();
	                }

	                selectNextTimerInRange(state);
	            }
	            return false;
	        }

	        /**
	         * @param {ClockState} state mutable tick state
	         * @param {boolean} isAsync whether this is an async tick
	         * @param {FakeTimersFunction} resolve promise resolve function
	         * @returns {number|undefined} the new clock.now or nothing for async
	         */
	        function finalizeTick(state, isAsync, resolve) {
	            // corner case: during runJobs new timers were scheduled which could be in the range [clock.now, tickTo]
	            state.timer = firstTimerInRange(
	                clock,
	                state.tickFrom,
	                state.tickTo,
	            );
	            if (state.timer) {
	                try {
	                    clock.tick(state.tickTo - clock.now); // do it all again - for the remainder of the requested range
	                } catch (e) {
	                    state.firstException = state.firstException || e;
	                }
	            } else {
	                // no timers remaining in the requested range: move the clock all the way to the end
	                clock.now = state.tickTo;

	                // update nanos
	                nanos = state.nanosTotal;
	            }
	            if (state.firstException) {
	                throw state.firstException;
	            }

	            if (isAsync) {
	                resolve(clock.now);
	            } else {
	                return clock.now;
	            }
	        }

	        /**
	         * @param {number|string|TemporalDuration} tickValue milliseconds or a string parseable by parseTime
	         * @param {boolean} isAsync whether this is an async tick
	         * @param {FakeTimersFunction} [resolve] promise resolve function
	         * @param {FakeTimersFunction} [reject] promise reject function
	         * @returns {number|undefined} the new clock.now or nothing for async
	         */
	        function doTick(tickValue, isAsync, resolve, reject) {
	            /** @type {ClockState} */
	            const state = createTickState(tickValue);

	            nanos = state.nanosTotal;
	            clock.duringTick = true;

	            runInitialJobs(state);

	            const compensationCheck = function () {
	                applyClockChangeCompensation(state, state.oldNow, {
	                    includePrevious: true,
	                });
	            };

	            const nextPromiseTick =
	                isAsync &&
	                function () {
	                    try {
	                        compensationCheck();
	                        selectNextTimerInRange(state);
	                        doTickInner();
	                    } catch (e) {
	                        reject(e);
	                    }
	                };

	            //eslint-disable-next-line jsdoc/require-jsdoc
	            function doTickInner() {
	                if (
	                    runTimersInRange(
	                        state,
	                        isAsync,
	                        nextPromiseTick,
	                        compensationCheck,
	                    )
	                ) {
	                    return;
	                }

	                runPostLoopJobs(state);
	                clock.duringTick = false;

	                return finalizeTick(state, isAsync, resolve);
	            }

	            return doTickInner();
	        }

	        /**
	         * @param {string|number|TemporalDuration} tickValue number of milliseconds, a human-readable value like "01:11:15", or a Temporal.Duration
	         * @returns {number} will return the new `now` value
	         */
	        clock.tick = function tick(tickValue) {
	            return doTick(tickValue, false);
	        };

	        clock.next = function next() {
	            runJobs(clock);
	            const timer = firstTimer(clock);
	            if (!timer) {
	                return clock.now;
	            }

	            clock.duringTick = true;
	            try {
	                clock.now = timer.callAt;
	                callTimer(clock, timer);
	                runJobs(clock);
	                return clock.now;
	            } finally {
	                clock.duringTick = false;
	            }
	        };

	        /**
	         * @param {(resolve: (value: unknown) => void, reject: (reason?: unknown) => void) => void} callback function to run inside native setTimeout
	         * @returns {Promise}
	         */
	        function runAsyncWithNativeTimeout(callback) {
	            return pauseAutoTickUntilFinished(
	                new _global.Promise(function (resolve, reject) {
	                    originalSetTimeout(function () {
	                        try {
	                            callback(resolve, reject);
	                        } catch (e) {
	                            reject(e);
	                        }
	                    });
	                }),
	            );
	        }

	        clock.runAll = function runAll() {
	            runJobs(clock);
	            for (let i = 0; i < clock.loopLimit; i++) {
	                if (!clock.timers) {
	                    resetIsNearInfiniteLimit(clock);
	                    return clock.now;
	                }

	                const numTimers = clock.timerHeap.timers.length;
	                if (numTimers === 0) {
	                    resetIsNearInfiniteLimit(clock);
	                    return clock.now;
	                }

	                checkIsNearInfiniteLimit(clock, i);
	                clock.next();
	            }

	            const excessJob = firstTimer(clock);
	            throw getInfiniteLoopError(clock, excessJob);
	        };

	        clock.runToFrame = function runToFrame() {
	            return clock.tick(getTimeToNextFrame());
	        };

	        clock.runToLast = function runToLast() {
	            const timer = lastTimer(clock);
	            if (!timer) {
	                runJobs(clock);
	                return clock.now;
	            }

	            return clock.tick(timer.callAt - clock.now);
	        };

	        if (typeof _global.Promise !== "undefined") {
	            /**
	             * @param {string|number|TemporalDuration} tickValue number of milliseconds, a human-readable value like "01:11:15", or a Temporal.Duration
	             * @returns {Promise}
	             */
	            clock.tickAsync = function tickAsync(tickValue) {
	                return runAsyncWithNativeTimeout(function (resolve, reject) {
	                    doTick(tickValue, true, resolve, reject);
	                });
	            };

	            clock.nextAsync = function nextAsync() {
	                return runAsyncWithNativeTimeout(function (resolve, reject) {
	                    const timer = firstTimer(clock);
	                    if (!timer) {
	                        resolve(clock.now);
	                        return;
	                    }

	                    let err;
	                    clock.duringTick = true;
	                    clock.now = timer.callAt;
	                    try {
	                        callTimer(clock, timer);
	                    } catch (e) {
	                        err = e;
	                    }
	                    clock.duringTick = false;

	                    originalSetTimeout(function () {
	                        if (err) {
	                            reject(err);
	                        } else {
	                            resolve(clock.now);
	                        }
	                    });
	                });
	            };

	            clock.runAllAsync = function runAllAsync() {
	                let i = 0;
	                /**
	                 * @param {(value: unknown) => void} resolve promise resolve function
	                 * @param {(reason?: unknown) => void} reject promise reject function
	                 */
	                function doRun(resolve, reject) {
	                    try {
	                        runJobs(clock);

	                        let numTimers;
	                        if (i < clock.loopLimit) {
	                            if (!clock.timerHeap) {
	                                resetIsNearInfiniteLimit(clock);
	                                resolve(clock.now);
	                                return;
	                            }

	                            numTimers = clock.timerHeap.timers.length;
	                            if (numTimers === 0) {
	                                resetIsNearInfiniteLimit(clock);
	                                resolve(clock.now);
	                                return;
	                            }

	                            checkIsNearInfiniteLimit(clock, i);
	                            clock.next();

	                            i++;

	                            originalSetTimeout(function () {
	                                doRun(resolve, reject);
	                            });
	                            return;
	                        }

	                        const excessJob = firstTimer(clock);
	                        reject(getInfiniteLoopError(clock, excessJob));
	                    } catch (e) {
	                        reject(e);
	                    }
	                }

	                return runAsyncWithNativeTimeout(function (resolve, reject) {
	                    doRun(resolve, reject);
	                });
	            };

	            clock.runToLastAsync = function runToLastAsync() {
	                return runAsyncWithNativeTimeout(function (resolve) {
	                    const timer = lastTimer(clock);
	                    if (!timer) {
	                        runJobs(clock);
	                        resolve(clock.now);
	                        return;
	                    }

	                    resolve(clock.tickAsync(timer.callAt - clock.now));
	                });
	            };
	        }

	        clock.reset = function reset() {
	            nanos = 0;
	            clock.timers = new Map();
	            clock.timerHeap = new TimerHeap();
	            clock.jobs = [];
	            clock.now = start;
	        };

	        clock.setSystemTime = function setSystemTime(systemTime) {
	            // determine time difference
	            const newNow = getEpoch(systemTime);
	            const difference = newNow - clock.now;

	            adjustedSystemTime[0] = adjustedSystemTime[0] + difference;
	            adjustedSystemTime[1] = adjustedSystemTime[1] + nanos;
	            // update 'system clock'
	            clock.now = newNow;
	            nanos = 0;

	            // update timers and intervals to keep them stable
	            forEachActiveTimer(clock, (timer) => {
	                timer.createdAt += difference;
	                timer.callAt += difference;
	            });
	        };

	        /**
	         * @param {string|number|TemporalDuration} tickValue number of milliseconds, a human-readable value like "01:11:15", or a Temporal.Duration
	         * @returns {number} the new `now` value
	         */
	        clock.jump = function jump(tickValue) {
	            const msFloat = tickValueToMs(tickValue);
	            const ms = Math.floor(msFloat);

	            forEachActiveTimer(clock, (timer) => {
	                if (clock.now + ms > timer.callAt) {
	                    timer.callAt = clock.now + ms;
	                }
	            });

	            // Rebuild heap as order might have changed
	            rebuildTimerHeap(clock);

	            clock.tick(ms);
	            return clock.now;
	        };

	        if (isPresent.performance) {
	            clock.performance = Object.create(null);
	            clock.performance.now = fakePerformanceNow;
	        }

	        if (isPresent.hrtime) {
	            clock.hrtime = hrtime;
	        }

	        /**
	         * @returns {Timer[]}
	         */
	        clock.uninstall = function () {
	            uninstalled = true;
	            clock.setTickMode({ mode: "manual" });
	            const { timersModule, timersPromisesModule } = clock;

	            if (clock.methods) {
	                const installedHrTime = "_hrtime";
	                const installedNextTick = "_nextTick";
	                let method, i, l;
	                for (i = 0, l = clock.methods.length; i < l; i++) {
	                    method = clock.methods[i];
	                    if (method === "hrtime" && _global.process) {
	                        _global.process.hrtime = clock[installedHrTime];
	                    } else if (method === "nextTick" && _global.process) {
	                        _global.process.nextTick = clock[installedNextTick];
	                    } else if (method === "performance") {
	                        const originalPerfDescriptor =
	                            Object.getOwnPropertyDescriptor(
	                                clock,
	                                `_${method}`,
	                            );
	                        if (
	                            originalPerfDescriptor &&
	                            originalPerfDescriptor.get &&
	                            !originalPerfDescriptor.set
	                        ) {
	                            Object.defineProperty(
	                                _global,
	                                method,
	                                originalPerfDescriptor,
	                            );
	                        } else if (originalPerfDescriptor.configurable) {
	                            _global[method] = clock[`_${method}`];
	                        }
	                    } else {
	                        if (clock[method] && clock[method].hasOwnProperty) {
	                            _global[method] = clock[`_${method}`];
	                        } else {
	                            try {
	                                delete _global[method];
	                            } catch {
	                                /* eslint no-empty: "off" */
	                            }
	                        }
	                    }
	                    if (clock.timersModuleMethods !== undefined) {
	                        for (
	                            let j = 0;
	                            j < clock.timersModuleMethods.length;
	                            j++
	                        ) {
	                            const entry = clock.timersModuleMethods[j];
	                            timersModule[entry.methodName] = entry.original;
	                        }
	                    }
	                    if (clock.timersPromisesModuleMethods !== undefined) {
	                        for (
	                            let j = 0;
	                            j < clock.timersPromisesModuleMethods.length;
	                            j++
	                        ) {
	                            const entry = clock.timersPromisesModuleMethods[j];
	                            timersPromisesModule[entry.methodName] =
	                                entry.original;
	                        }
	                    }
	                }

	                // Prevent multiple executions which will completely remove these props
	                clock.methods = [];
	            }

	            if (clock.abortListenerMap) {
	                for (const [
	                    listener,
	                    signal,
	                ] of clock.abortListenerMap.entries()) {
	                    signal.removeEventListener("abort", listener);
	                    clock.abortListenerMap.delete(listener);
	                }
	            }

	            // return pending timers, to enable checking what timers remained on uninstall
	            if (!clock.timerHeap) {
	                return [];
	            }
	            return clock.timerHeap.timers.slice();
	        };

	        return clock;
	    }

	    /**
	     * Starts the interval used to advance the clock automatically.
	     * @param {Clock} clock
	     * @param {number} delta
	     */
	    function createIntervalTick(clock, delta) {
	        const intervalTick = doIntervalTick.bind(null, clock, delta);
	        const intervalId = originalSetInterval(intervalTick, delta);
	        clock.attachedInterval = intervalId;
	    }

	    /* eslint-disable complexity */

	    /**
	     * @param {Config=} [config] Optional config
	     * @returns {Clock}
	     */
	    function install(config) {
	        if (
	            arguments.length > 1 ||
	            config instanceof Date ||
	            Array.isArray(config) ||
	            typeof config === "number"
	        ) {
	            throw new TypeError(
	                `FakeTimers.install called with ${String(
	                    config,
	                )} install requires an object parameter`,
	            );
	        }

	        if (_global.Date.isFake === true) {
	            // Timers are already faked; this is a problem.
	            // Make the user reset timers before continuing.
	            throw new TypeError(
	                "Can't install fake timers twice on the same global object.",
	            );
	        }

	        // eslint-disable-next-line no-param-reassign
	        config = typeof config !== "undefined" ? config : {};
	        config.shouldAdvanceTime = config.shouldAdvanceTime || false;
	        config.advanceTimeDelta = config.advanceTimeDelta || 20;
	        config.shouldClearNativeTimers =
	            config.shouldClearNativeTimers || false;

	        const hasToFake = Object.prototype.hasOwnProperty.call(
	            config,
	            "toFake",
	        );
	        const hasToNotFake = Object.prototype.hasOwnProperty.call(
	            config,
	            "toNotFake",
	        );

	        if (hasToFake && hasToNotFake) {
	            throw new TypeError(
	                "config.toFake and config.toNotFake cannot be used together",
	            );
	        }

	        if (config.target) {
	            throw new TypeError(
	                "config.target is no longer supported. Use `withGlobal(target)` instead.",
	            );
	        }

	        /**
	         * Handles a missing timer or API name during installation.
	         * @param {string} timer - the name of the missing timer or object
	         */
	        function handleMissingTimer(timer) {
	            if (config.ignoreMissingTimers) {
	                return;
	            }

	            throw new ReferenceError(
	                `non-existent timers and/or objects cannot be faked: '${timer}'`,
	            );
	        }

	        let i, l;
	        const clock = createClock(config.now, config.loopLimit);
	        clock.shouldClearNativeTimers = config.shouldClearNativeTimers;

	        // Vitest injects Node builtins because this file is bundled without require.
	        const vitestRequired =
	            config.fakeNodeBuiltins && _global.__vitest_required__;
	        const timersModule = vitestRequired?.timers;
	        const timersPromisesModule = vitestRequired?.timersPromises;
	        const syncBuiltinESMExports = vitestRequired?.syncBuiltinESMExports;
	        // Keep the modules on the clock so uninstall can restore their methods.
	        clock.timersModule = timersModule;
	        clock.timersPromisesModule = timersPromisesModule;

	        clock.abortListenerMap = new Map();

	        if (hasToFake) {
	            clock.methods = /** @type {FakeMethod[]} */ (config.toFake || []);
	            if (clock.methods.length === 0) {
	                clock.methods = /** @type {FakeMethod[]} */ (
	                    Object.keys(timers)
	                );
	            }
	        } else if (hasToNotFake) {
	            const methodsToNotFake = /** @type {string[]} */ (
	                config.toNotFake || []
	            );
	            clock.methods = /** @type {FakeMethod[]} */ (
	                Object.keys(timers).filter(
	                    (method) => !methodsToNotFake.includes(method),
	                )
	            );
	        } else {
	            clock.methods = /** @type {FakeMethod[]} */ (Object.keys(timers));
	        }

	        if (config.shouldAdvanceTime === true) {
	            clock.setTickMode({
	                mode: "interval",
	                delta: config.advanceTimeDelta,
	            });
	        }

	        if (clock.methods.includes("performance")) {
	            const proto = (() => {
	                if (hasPerformanceConstructorPrototype) {
	                    return _global.performance.constructor.prototype;
	                }
	                if (hasPerformancePrototype) {
	                    return _global.Performance.prototype;
	                }
	            })();
	            if (proto) {
	                Object.getOwnPropertyNames(proto).forEach(function (name) {
	                    if (name !== "now") {
	                        clock.performance[name] =
	                            name.indexOf("getEntries") === 0
	                                ? NOOP_ARRAY
	                                : NOOP;
	                    }
	                });
	                // ensure `mark` returns a value that is valid
	                clock.performance.mark = (name) =>
	                    new FakePerformanceEntry(name, "mark", 0, 0);
	                clock.performance.measure = (name) =>
	                    new FakePerformanceEntry(name, "measure", 0, 100);
	                // `timeOrigin` should return the time of when the Window session started
	                // (or the Worker was installed)
	                clock.performance.timeOrigin = getEpoch(config.now);
	            } else if ((config.toFake || []).includes("performance")) {
	                handleMissingTimer("performance");
	            }
	        }
	        if (_global === globalObject && timersModule) {
	            clock.timersModuleMethods = [];
	        }
	        if (_global === globalObject && timersPromisesModule) {
	            clock.timersPromisesModuleMethods = [];
	        }
	        for (i = 0, l = clock.methods.length; i < l; i++) {
	            const nameOfMethodToReplace = clock.methods[i];

	            if (!isPresent[nameOfMethodToReplace]) {
	                handleMissingTimer(nameOfMethodToReplace);
	                // eslint-disable-next-line
	                continue;
	            }

	            if (nameOfMethodToReplace === "hrtime") {
	                if (
	                    _global.process &&
	                    typeof _global.process.hrtime === "function"
	                ) {
	                    hijackMethod(_global.process, nameOfMethodToReplace, clock);
	                }
	            } else if (nameOfMethodToReplace === "nextTick") {
	                if (
	                    _global.process &&
	                    typeof _global.process.nextTick === "function"
	                ) {
	                    hijackMethod(_global.process, nameOfMethodToReplace, clock);
	                }
	            } else {
	                hijackMethod(_global, nameOfMethodToReplace, clock);
	            }
	            if (
	                clock.timersModuleMethods !== undefined &&
	                timersModule[nameOfMethodToReplace]
	            ) {
	                const original = timersModule[nameOfMethodToReplace];
	                clock.timersModuleMethods.push({
	                    methodName: nameOfMethodToReplace,
	                    original: original,
	                });
	                timersModule[nameOfMethodToReplace] =
	                    _global[nameOfMethodToReplace];
	            }
	            if (clock.timersPromisesModuleMethods !== undefined) {
	                if (nameOfMethodToReplace === "setTimeout") {
	                    clock.timersPromisesModuleMethods.push({
	                        methodName: "setTimeout",
	                        original: timersPromisesModule.setTimeout,
	                    });

	                    timersPromisesModule.setTimeout = (
	                        delay,
	                        value,
	                        options = {},
	                    ) =>
	                        new Promise((resolve, reject) => {
	                            const abort = () => {
	                                options.signal.removeEventListener(
	                                    "abort",
	                                    abort,
	                                );
	                                clock.abortListenerMap.delete(abort);

	                                // This is safe, there is no code path that leads to this function
	                                // being invoked before handle has been assigned.
	                                // eslint-disable-next-line no-use-before-define
	                                clock.clearTimeout(handle);
	                                reject(options.signal.reason);
	                            };

	                            const handle = clock.setTimeout(() => {
	                                if (options.signal) {
	                                    options.signal.removeEventListener(
	                                        "abort",
	                                        abort,
	                                    );
	                                    clock.abortListenerMap.delete(abort);
	                                }

	                                resolve(value);
	                            }, delay);

	                            if (options.signal) {
	                                if (options.signal.aborted) {
	                                    abort();
	                                } else {
	                                    options.signal.addEventListener(
	                                        "abort",
	                                        abort,
	                                    );
	                                    clock.abortListenerMap.set(
	                                        abort,
	                                        options.signal,
	                                    );
	                                }
	                            }
	                        });
	                } else if (nameOfMethodToReplace === "setImmediate") {
	                    clock.timersPromisesModuleMethods.push({
	                        methodName: "setImmediate",
	                        original: timersPromisesModule.setImmediate,
	                    });

	                    timersPromisesModule.setImmediate = (value, options = {}) =>
	                        new Promise((resolve, reject) => {
	                            const abort = () => {
	                                options.signal.removeEventListener(
	                                    "abort",
	                                    abort,
	                                );
	                                clock.abortListenerMap.delete(abort);

	                                // This is safe, there is no code path that leads to this function
	                                // being invoked before handle has been assigned.
	                                // eslint-disable-next-line no-use-before-define
	                                clock.clearImmediate(handle);
	                                reject(options.signal.reason);
	                            };

	                            const handle = clock.setImmediate(() => {
	                                if (options.signal) {
	                                    options.signal.removeEventListener(
	                                        "abort",
	                                        abort,
	                                    );
	                                    clock.abortListenerMap.delete(abort);
	                                }

	                                resolve(value);
	                            });

	                            if (options.signal) {
	                                if (options.signal.aborted) {
	                                    abort();
	                                } else {
	                                    options.signal.addEventListener(
	                                        "abort",
	                                        abort,
	                                    );
	                                    clock.abortListenerMap.set(
	                                        abort,
	                                        options.signal,
	                                    );
	                                }
	                            }
	                        });
	                } else if (nameOfMethodToReplace === "setInterval") {
	                    clock.timersPromisesModuleMethods.push({
	                        methodName: "setInterval",
	                        original: timersPromisesModule.setInterval,
	                    });

	                    timersPromisesModule.setInterval = (
	                        delay,
	                        value,
	                        options = {},
	                    ) => ({
	                        [Symbol.asyncIterator]: () => {
	                            const createResolvable = () => {
	                                let resolve, reject;
	                                const promise =
	                                    /** @type {Promise<unknown> & { resolve: (value: unknown) => void; reject: (reason: unknown) => void }} */ (
	                                        new Promise((res, rej) => {
	                                            resolve = res;
	                                            reject = rej;
	                                        })
	                                    );
	                                promise.resolve = resolve;
	                                promise.reject = reject;
	                                return promise;
	                            };

	                            let done = false;
	                            let hasThrown = false;
	                            let returnCall;
	                            let nextAvailable = 0;
	                            const nextQueue = [];

	                            const handle = clock.setInterval(() => {
	                                if (nextQueue.length > 0) {
	                                    nextQueue.shift().resolve();
	                                } else {
	                                    nextAvailable++;
	                                }
	                            }, delay);

	                            const abort = () => {
	                                options.signal.removeEventListener(
	                                    "abort",
	                                    abort,
	                                );
	                                clock.abortListenerMap.delete(abort);

	                                clock.clearInterval(handle);
	                                done = true;
	                                for (const resolvable of nextQueue) {
	                                    resolvable.resolve();
	                                }
	                            };

	                            if (options.signal) {
	                                if (options.signal.aborted) {
	                                    done = true;
	                                } else {
	                                    options.signal.addEventListener(
	                                        "abort",
	                                        abort,
	                                    );
	                                    clock.abortListenerMap.set(
	                                        abort,
	                                        options.signal,
	                                    );
	                                }
	                            }

	                            return {
	                                next: async () => {
	                                    if (options.signal?.aborted && !hasThrown) {
	                                        hasThrown = true;
	                                        throw options.signal.reason;
	                                    }

	                                    if (done) {
	                                        return { done: true, value: undefined };
	                                    }

	                                    if (nextAvailable > 0) {
	                                        nextAvailable--;
	                                        return { done: false, value: value };
	                                    }

	                                    const resolvable = createResolvable();
	                                    nextQueue.push(resolvable);

	                                    await resolvable;

	                                    if (returnCall && nextQueue.length === 0) {
	                                        returnCall.resolve();
	                                    }

	                                    if (options.signal?.aborted && !hasThrown) {
	                                        hasThrown = true;
	                                        throw options.signal.reason;
	                                    }

	                                    if (done) {
	                                        return { done: true, value: undefined };
	                                    }

	                                    return { done: false, value: value };
	                                },
	                                return: async () => {
	                                    if (done) {
	                                        return { done: true, value: undefined };
	                                    }

	                                    if (nextQueue.length > 0) {
	                                        returnCall = createResolvable();
	                                        await returnCall;
	                                    }

	                                    clock.clearInterval(handle);
	                                    done = true;

	                                    if (options.signal) {
	                                        options.signal.removeEventListener(
	                                            "abort",
	                                            abort,
	                                        );
	                                        clock.abortListenerMap.delete(abort);
	                                    }

	                                    return { done: true, value: undefined };
	                                },
	                            };
	                        },
	                    });
	                }
	            }
	        }

	        // Keep ESM named exports in sync with the patched CommonJS modules.
	        if (
	            syncBuiltinESMExports &&
	            (clock.timersModuleMethods?.length ||
	                clock.timersPromisesModuleMethods?.length)
	        ) {
	            const uninstall = clock.uninstall;
	            clock.uninstall = () => {
	                const result = uninstall();
	                syncBuiltinESMExports();
	                return result;
	            };
	            syncBuiltinESMExports();
	        }

	        return clock;
	    }

	    /* eslint-enable complexity */

	    return {
	        timers: timers,
	        createClock: createClock,
	        install: install,
	        withGlobal: withGlobal,
	    };
	}

	/** @type {FakeTimers} */
	const defaultImplementation = withGlobal(globalObject);

	fakeTimersSrc.timers = defaultImplementation.timers;
	fakeTimersSrc.createClock = defaultImplementation.createClock;
	fakeTimersSrc.install = defaultImplementation.install;
	/** @type {WithGlobal} */
	fakeTimersSrc.withGlobal = withGlobal;
	return fakeTimersSrc;
}

var fakeTimersSrcExports = requireFakeTimersSrc();

const RealDate = globalThis.Date;
class FakeTimers {
	_global;
	_clock;
	// | _fakingTime | _fakingDate |
	// +-------------+-------------+
	// | false       | falsy       | initial
	// | false       | truthy      | vi.setSystemTime called first (for mocking only Date without fake timers)
	// | true        | falsy       | vi.useFakeTimers called first
	// | true        | truthy      | unreachable
	_fakingTime;
	_fakingDate;
	_fakeTimers;
	_userConfig;
	_now = RealDate.now;
	constructor({ global, config }) {
		this._userConfig = config;
		this._fakingDate = null;
		this._fakingTime = false;
		this._fakeTimers = fakeTimersSrcExports.withGlobal(global);
		this._global = global;
	}
	clearAllTimers() {
		if (this._fakingTime) this._clock.reset();
	}
	dispose() {
		this.useRealTimers();
	}
	runAllTimers() {
		if (this._checkFakeTimers()) this._clock.runAll();
	}
	async runAllTimersAsync() {
		if (this._checkFakeTimers()) await this._clock.runAllAsync();
	}
	runOnlyPendingTimers() {
		if (this._checkFakeTimers()) this._clock.runToLast();
	}
	async runOnlyPendingTimersAsync() {
		if (this._checkFakeTimers()) await this._clock.runToLastAsync();
	}
	advanceTimersToNextTimer(steps = 1) {
		if (this._checkFakeTimers()) for (let i = steps; i > 0; i--) {
			this._clock.next();
			// Fire all timers at this point: https://github.com/sinonjs/fake-timers/issues/250
			this._clock.tick(0);
			if (this._clock.countTimers() === 0) break;
		}
	}
	async advanceTimersToNextTimerAsync(steps = 1) {
		if (this._checkFakeTimers()) for (let i = steps; i > 0; i--) {
			await this._clock.nextAsync();
			// Fire all timers at this point: https://github.com/sinonjs/fake-timers/issues/250
			this._clock.tick(0);
			if (this._clock.countTimers() === 0) break;
		}
	}
	advanceTimersByTime(msToRun) {
		if (this._checkFakeTimers()) this._clock.tick(msToRun);
	}
	async advanceTimersByTimeAsync(msToRun) {
		if (this._checkFakeTimers()) await this._clock.tickAsync(msToRun);
	}
	advanceTimersToNextFrame() {
		if (this._checkFakeTimers()) this._clock.runToFrame();
	}
	runAllTicks() {
		if (this._checkFakeTimers()) this._clock.runMicrotasks();
	}
	useRealTimers() {
		if (this._fakingDate) {
			this._clock.uninstall();
			this._fakingDate = null;
		}
		if (this._fakingTime) {
			this._clock.uninstall();
			this._fakingTime = false;
		}
	}
	useFakeTimers() {
		const fakeDate = this._fakingDate || Date.now();
		if (this._fakingDate) {
			this._clock.uninstall();
			this._fakingDate = null;
		}
		if (this._fakingTime) this._clock.uninstall();
		let toFake = this._userConfig?.toFake;
		if (isChildProcess() && toFake?.includes("nextTick")) throw new Error("process.nextTick cannot be mocked inside child_process");
		let toNotFake = this._userConfig?.toNotFake;
		if (toFake === void 0 && toNotFake === void 0)
 // Do not mock timers internally used by node by default. It can still be mocked through userConfig.
		toFake = Object.keys(this._fakeTimers.timers).filter((timer) => timer !== "nextTick" && timer !== "queueMicrotask");
		else if (toFake === void 0 && toNotFake !== void 0) {
			// Do not mock timers internally used by node via `toNotFake`
			for (const timer of ["nextTick", "queueMicrotask"]) if (!toNotFake.includes(timer)) toNotFake = [...toNotFake, timer];
		}
		if (isChildProcess() && toNotFake && !toNotFake.includes("nextTick")) toNotFake = [...toNotFake, "nextTick"];
		this._clock = this._fakeTimers.install({
			now: fakeDate,
			...this._userConfig,
			...toFake && { toFake },
			...toNotFake && { toNotFake },
			ignoreMissingTimers: true
		});
		this._fakingTime = true;
	}
	reset() {
		if (this._checkFakeTimers()) {
			const { now } = this._clock;
			this._clock.reset();
			this._clock.setSystemTime(now);
		}
	}
	setSystemTime(now) {
		const normalized = normalizeSystemTime(now);
		const date = typeof normalized === "undefined" || normalized instanceof Date ? normalized : new Date(normalized);
		if (this._fakingTime) this._clock.setSystemTime(date);
		else {
			const newFakingDate = date ?? new Date(this.getRealSystemTime());
			if (this._fakingDate) {
				this._fakingDate = newFakingDate;
				this._clock.setSystemTime(newFakingDate);
			} else {
				this._fakingDate = newFakingDate;
				this._clock = this._fakeTimers.install({
					now: newFakingDate,
					toFake: ["Date", "Temporal"],
					ignoreMissingTimers: true
				});
			}
		}
	}
	getMockedSystemTime() {
		return this._fakingTime ? new Date(this._clock.now) : this._fakingDate;
	}
	getRealSystemTime() {
		return this._now();
	}
	getTimerCount() {
		if (this._checkFakeTimers()) return this._clock.countTimers();
		return 0;
	}
	setTimerTickMode(mode, interval) {
		if (this._checkFakeTimers()) {
			if (mode === "manual") this._clock.setTickMode({ mode: "manual" });
			else if (mode === "nextTimerAsync") this._clock.setTickMode({ mode: "nextAsync" });
			else if (mode === "interval") this._clock.setTickMode({
				mode: "interval",
				delta: interval
			});
			else throw new Error(`Invalid tick mode: ${mode}`);
		}
	}
	configure(config) {
		this._userConfig = config;
	}
	isFakeTimers() {
		return this._fakingTime;
	}
	_checkFakeTimers() {
		if (!this._fakingTime) throw new Error("A function to advance timers was called but the timers APIs are not mocked. Call `vi.useFakeTimers()` in the test file first.");
		return this._fakingTime;
	}
}
// Like fake-timers, read epochMilliseconds from Instant or ZonedDateTime without requiring built-in Temporal types.
function normalizeSystemTime(time) {
	return time && typeof time === "object" && "epochMilliseconds" in time ? time.epochMilliseconds : time;
}

const whenSymbol = Symbol.for("$$vitest:when");
/**
* Returns `true` if the given value is a {@linkcode When} chain created by {@linkcode when|vi.when}.
*
* @param input - The value to check.
* @returns `true` if `input` is a {@linkcode When} instance, `false` otherwise.
*
* @example
* const spy = vi.fn()
* const w = vi.when(spy).calledWith(1).thenReturn(0)
*
* expect(isWhenChain(w)).toBe(true)
* expect(isWhenChain(spy)).toBe(false)
*/
function isWhenChain(input) {
	try {
		return Reflect.has(input, whenSymbol);
	} catch {
		return false;
	}
}
/**
* Defines conditional behaviors on a Vitest spy based on the arguments it is called with.
*
* Behaviors are matched using deep equality, last-registered first within each argument set.
*
* It automatically restores the spy's original implementation when the enclosing block exits if used with the `using` keyword.
*
* @param spy - A Vitest mock function to attach behaviors to.
* @param options - Optional configuration.
* @returns A {@linkcode When} instance for registering behaviors.
*
* @throws {TypeError} If `spy` is not a Vitest mock function.
* @throws {Error} If chaining a non-existent method after `calledWith`.
* @throws {RangeError} If setting the `times` option on a `then*` method as a negative value or `0`.
*
* @since 5.0.0
* @see {@link https://vitest.dev/api/vi#vi-when}
* @see {@link https://vitest.dev/guide/recipes/conditional-mocking}
*
* @example
* // Basic usage
* const spy = vi.fn(() => Number.NEGATIVE_INFINITY)
* vi.when(spy).calledWith(1).thenReturn(0)
*
* expect(spy(1)).toBe(0)
* expect(spy(2)).toBe(Number.NEGATIVE_INFINITY) // falls through to original implementation
*
* @example
* // Async
* const spy = vi.fn()
* vi.when(spy).calledWith('user').thenResolve({ id: 1 })
*
* await expect(spy('user')).resolves.toEqual({ id: 1 })
*
* @example
* // Scoped with `using`
* const spy = vi.fn()
*
* {
*   using w = vi.when(spy)
*     .calledWith('darkMode')
*     .thenReturn(true)
*
*   expect(spy('darkMode')).toBe(true)
* }
*
* // spy's original implementation is restored here
* expect(spy('darkMode')).toBe(undefined)
*
* @example
* // Throw on unmatched calls
* vi.when(spy, { onUnmatched: 'throw' })
*   .calledWith(1)
*   .thenReturn({ id: 1, name: 'Alice' })
*
* expect(spy(1)).toEqual({ id: 1, name: 'Alice' })
* expect(() => spy(2)).toThrow()
*/
function when(spy, options) {
	if (!isMockFunction(spy)) throw new TypeError("vi.when: the argument must be a mock function created with `vi.fn()` or `vi.spyOn()`");
	const behaviors = [];
	const originalImplementation = spy.getMockImplementation();
	function findAction(args) {
		const testers = [...getCustomEqualityTesters(), iterableEquality];
		for (const behavior of behaviors) if (equals(args, behavior.arguments, testers)) return behavior.actions.findLast((action) => !(action.remaining === 0 && action.called)) ?? null;
		return null;
	}
	spy.mockImplementation(
		// @ts-expect-error cannot resolve generic args
		(...args) => {
			const action = findAction(args);
			if (action === null) return (typeof options?.onUnmatched === "function" ? options.onUnmatched : options?.onUnmatched === "throw" ? () => {
				throw new Error(`vi.when: no behavior defined when called with [${args.map((arg) => stringify(arg)).join(", ")}]`);
			} : originalImplementation)?.(...args);
			action.remaining -= 1;
			action.called = true;
			switch (action.type) {
				case "return": return action.value;
				case "throw": throw action.value;
				case "resolve": return Promise.resolve(action.value);
				case "reject": return Promise.reject(action.value);
			}
		}
	);
	function getOrCreateBehavior(args) {
		const testers = [...getCustomEqualityTesters(), iterableEquality];
		let behavior = behaviors.find((behavior) => equals(args, behavior.arguments, testers));
		if (behavior === void 0) {
			behavior = {
				arguments: args,
				actions: []
			};
			behaviors.push(behavior);
		}
		return behavior;
	}
	// @ts-expect-error `Symbol.dispose` has to be assigned conditionally since it's only supported in Node >= 24
	const output = markWhenChain({
		calledWith: (...args) => {
			const behavior = getOrCreateBehavior(args);
			function appendAction(behavior, type, value, times) {
				behavior.actions.push({
					type,
					value,
					times,
					remaining: times,
					called: false
				});
			}
			const calledWithInstance = markWhenChain({
				...output,
				thenThrow: (value, options) => {
					validateOptions(options);
					appendAction(behavior, "throw", value, options?.times ?? Number.POSITIVE_INFINITY);
					return calledWithInstance;
				},
				thenThrowOnce: (value) => {
					appendAction(behavior, "throw", value, 1);
					return calledWithInstance;
				},
				thenReturn: (value, options) => {
					validateOptions(options);
					appendAction(behavior, "return", value, options?.times ?? Number.POSITIVE_INFINITY);
					return calledWithInstance;
				},
				thenReturnOnce: (value) => {
					appendAction(behavior, "return", value, 1);
					return calledWithInstance;
				},
				thenResolve: (value, options) => {
					validateOptions(options);
					appendAction(behavior, "resolve", value, options?.times ?? Number.POSITIVE_INFINITY);
					return calledWithInstance;
				},
				thenResolveOnce: (value) => {
					appendAction(behavior, "resolve", value, 1);
					return calledWithInstance;
				},
				thenReject: (value, options) => {
					validateOptions(options);
					appendAction(behavior, "reject", value, options?.times ?? Number.POSITIVE_INFINITY);
					return calledWithInstance;
				},
				thenRejectOnce: (value) => {
					appendAction(behavior, "reject", value, 1);
					return calledWithInstance;
				}
			});
			return calledWithInstance;
		},
		_getDiagnostics: () => {
			const pendingBehaviors = behaviors.filter((behavior) => behavior.actions.length === 0 || behavior.actions.some((action) => !hasBeenConsumed(action)));
			return {
				isExhausted: behaviors.length !== 0 && pendingBehaviors.length === 0,
				pendingBehaviors: pendingBehaviors.map((behavior) => `calledWith(${behavior.arguments.map((argument) => stringify(argument)).join(", ")})${behavior.actions.length === 0 ? "  → no actions" : `\n${formatActions(behavior.actions)}`}`).join("\n\n")
			};
		}
	});
	if (Symbol.dispose) output[Symbol.dispose] = () => {
		spy.mockImplementation(
			// @ts-expect-error without an original implementation we should fall back to an undefined-returning function as that's what the mocking functions do
			originalImplementation ?? noop
		);
	};
	return output;
}
const whenChainMarkerOptions = {};
function markWhenChain(input) {
	Reflect.defineProperty(input, whenSymbol, whenChainMarkerOptions);
	return input;
}
function formatActions(actions) {
	const lines = actions.map((action, index) => {
		const method = getMethodName(action.type);
		const left = `  ${getSymbol(action)} ${method}(${stringify(action.value)}${action.times === Number.POSITIVE_INFINITY ? "" : `, { times: ${action.times} }`})`;
		const unreachable = !hasBeenConsumed(action) && actions.slice(index + 1).some((later) => later.times === Number.POSITIVE_INFINITY);
		return {
			left,
			remaining: getRemainingLabel(action) + (unreachable ? "  → unreachable action" : "")
		};
	});
	const maxLeft = Math.max(...lines.map((line) => line.left.length));
	return lines.map(({ left, remaining }) => `${left.padEnd(maxLeft + 2)}${remaining}`).join("\n");
}
function getMethodName(type) {
	switch (type) {
		case "return": return "thenReturn";
		case "resolve": return "thenResolve";
		case "throw": return "thenThrow";
		case "reject": return "thenReject";
		default: throw new Error(`vi.when: "${type}" is not a known method`);
	}
}
function hasBeenConsumed(action) {
	return action.remaining === 0 || action.remaining === Number.POSITIVE_INFINITY && action.called;
}
function getRemainingLabel(action) {
	if (hasBeenConsumed(action)) return action.remaining === Number.POSITIVE_INFINITY ? "exhausted" : `exhausted (${action.times} of ${action.times})`;
	return action.remaining === Number.POSITIVE_INFINITY ? "never called" : `${action.remaining} remaining (out of ${action.times})`;
}
function getSymbol(action) {
	if (hasBeenConsumed(action)) return "✓";
	return "✗";
}
function validateOptions(options) {
	if (typeof options?.times === "number" && options.times <= 0) throw new RangeError("vi.when: `times` option must be greater than 0");
}

function prefixMessage(error, message) {
	if (message && error instanceof Error) {
		const original = error.message;
		try {
			error.message = `${message}: ${original}`;
		} catch {
			// message can be read-only, e.g. DOMException
			return error;
		}
		if (error.stack !== void 0) error.stack = error.stack.replace(original, error.message);
	}
	return error;
}
function getTraceName(name, message) {
	return message ? `${message} (${name})` : `${name}()`;
}
function waitFor(callback, options = {}) {
	const { setTimeout, setInterval, clearTimeout, clearInterval } = getSafeTimers();
	const { interval = 50, timeout = 1e3, message } = typeof options === "number" ? { timeout: options } : options;
	const STACK_TRACE_ERROR = /* @__PURE__ */ new Error("STACK_TRACE_ERROR");
	return startPromiseTraceRange(getTraceName("vi.waitFor", message), STACK_TRACE_ERROR)(new Promise((resolve, reject) => {
		let lastError;
		let promiseStatus = "idle";
		let timeoutId;
		let intervalId;
		const onResolve = (result) => {
			if (timeoutId) clearTimeout(timeoutId);
			if (intervalId) clearInterval(intervalId);
			resolve(result);
		};
		const handleTimeout = () => {
			if (intervalId) clearInterval(intervalId);
			let error = lastError;
			if (!error) error = copyStackTrace(/* @__PURE__ */ new Error("Timed out in waitFor!"), STACK_TRACE_ERROR);
			reject(prefixMessage(error, message));
		};
		const checkCallback = () => {
			if (vi.isFakeTimers()) vi.advanceTimersByTime(interval);
			if (promiseStatus === "pending") return;
			try {
				const result = callback();
				if (result !== null && typeof result === "object" && typeof result.then === "function") {
					const thenable = result;
					promiseStatus = "pending";
					thenable.then((resolvedValue) => {
						promiseStatus = "resolved";
						onResolve(resolvedValue);
					}, (rejectedValue) => {
						promiseStatus = "rejected";
						lastError = rejectedValue;
					});
				} else {
					onResolve(result);
					return true;
				}
			} catch (error) {
				lastError = error;
			}
		};
		if (checkCallback() === true) return;
		timeoutId = setTimeout(handleTimeout, timeout);
		intervalId = setInterval(checkCallback, interval);
	}));
}
function waitUntil(callback, options = {}) {
	const { setTimeout, setInterval, clearTimeout, clearInterval } = getSafeTimers();
	const { interval = 50, timeout = 1e3, message } = typeof options === "number" ? { timeout: options } : options;
	const STACK_TRACE_ERROR = /* @__PURE__ */ new Error("STACK_TRACE_ERROR");
	return startPromiseTraceRange(getTraceName("vi.waitUntil", message), STACK_TRACE_ERROR)(new Promise((resolve, reject) => {
		let promiseStatus = "idle";
		let timeoutId;
		let intervalId;
		const onReject = (error) => {
			if (intervalId) clearInterval(intervalId);
			if (!error) error = copyStackTrace(/* @__PURE__ */ new Error("Timed out in waitUntil!"), STACK_TRACE_ERROR);
			reject(prefixMessage(error, message));
		};
		const onResolve = (result) => {
			if (!result) return;
			if (timeoutId) clearTimeout(timeoutId);
			if (intervalId) clearInterval(intervalId);
			resolve(result);
			return true;
		};
		const checkCallback = () => {
			if (vi.isFakeTimers()) vi.advanceTimersByTime(interval);
			if (promiseStatus === "pending") return;
			try {
				const result = callback();
				if (result !== null && typeof result === "object" && typeof result.then === "function") {
					const thenable = result;
					promiseStatus = "pending";
					thenable.then((resolvedValue) => {
						promiseStatus = "resolved";
						onResolve(resolvedValue);
					}, (rejectedValue) => {
						promiseStatus = "rejected";
						onReject(rejectedValue);
					});
				} else return onResolve(result);
			} catch (error) {
				onReject(error);
			}
		};
		if (checkCallback() === true) return;
		timeoutId = setTimeout(onReject, timeout);
		intervalId = setInterval(checkCallback, interval);
	}));
}

function createVitest() {
	let _config = null;
	const state = () => getWorkerState();
	let _timers;
	const timers = () => _timers ||= new FakeTimers({
		global: globalThis,
		config: state().config.fakeTimers
	});
	const _stubsGlobal = /* @__PURE__ */ new Map();
	const _stubsEnv = /* @__PURE__ */ new Map();
	const _envBooleans = [
		"PROD",
		"DEV",
		"SSR"
	];
	const utils = {
		useFakeTimers(config) {
			if (isChildProcess()) {
				if (config?.toFake?.includes("nextTick") || state().config?.fakeTimers?.toFake?.includes("nextTick")) throw new Error("vi.useFakeTimers({ toFake: [\"nextTick\"] }) is not supported in node:child_process. Use --pool=threads if mocking nextTick is required.");
			}
			if (config) timers().configure({
				...state().config.fakeTimers,
				...config
			});
			else timers().configure(state().config.fakeTimers);
			timers().useFakeTimers();
			return utils;
		},
		isFakeTimers() {
			return timers().isFakeTimers();
		},
		useRealTimers() {
			timers().useRealTimers();
			return utils;
		},
		runOnlyPendingTimers() {
			timers().runOnlyPendingTimers();
			return utils;
		},
		async runOnlyPendingTimersAsync() {
			await timers().runOnlyPendingTimersAsync();
			return utils;
		},
		runAllTimers() {
			timers().runAllTimers();
			return utils;
		},
		async runAllTimersAsync() {
			await timers().runAllTimersAsync();
			return utils;
		},
		runAllTicks() {
			timers().runAllTicks();
			return utils;
		},
		advanceTimersByTime(ms) {
			timers().advanceTimersByTime(ms);
			return utils;
		},
		async advanceTimersByTimeAsync(ms) {
			await timers().advanceTimersByTimeAsync(ms);
			return utils;
		},
		advanceTimersToNextTimer() {
			timers().advanceTimersToNextTimer();
			return utils;
		},
		async advanceTimersToNextTimerAsync() {
			await timers().advanceTimersToNextTimerAsync();
			return utils;
		},
		advanceTimersToNextFrame() {
			timers().advanceTimersToNextFrame();
			return utils;
		},
		getTimerCount() {
			return timers().getTimerCount();
		},
		setSystemTime(time) {
			timers().setSystemTime(time);
			return utils;
		},
		getMockedSystemTime() {
			return timers().getMockedSystemTime();
		},
		getRealSystemTime() {
			return timers().getRealSystemTime();
		},
		clearAllTimers() {
			timers().clearAllTimers();
			return utils;
		},
		setTimerTickMode(mode, interval) {
			timers().setTimerTickMode(mode, interval);
			return utils;
		},
		// mocks
		spyOn,
		fn,
		when,
		isWhenChain,
		waitFor,
		waitUntil,
		defineHelper: (fn) => {
			return function __VITEST_HELPER__(...args) {
				const result = fn.apply(this, args);
				if (result && typeof result === "object" && typeof result.then === "function") {
					const stackTraceError = /* @__PURE__ */ new Error("STACK_TRACE_ERROR");
					return (async function __VITEST_HELPER__() {
						try {
							return await result;
						} catch (error) {
							if (error instanceof Error && !error.stack?.includes("__VITEST_HELPER__")) copyStackTrace(error, stackTraceError);
							throw error;
						}
					})();
				}
				return result;
			};
		},
		hoisted(factory) {
			assertTypes(factory, "\"vi.hoisted\" factory", ["function"]);
			return factory();
		},
		mock(path, factory) {
			if (typeof path !== "string") throw new TypeError(`vi.mock() expects a string path, but received a ${typeof path}`);
			const importer = getImporter("mock");
			_mocker().queueMock(path, importer, typeof factory === "function" ? () => factory(() => _mocker().importActual(path, importer, _mocker().getMockContext().callstack)) : factory);
		},
		unmock(path) {
			if (typeof path !== "string") throw new TypeError(`vi.unmock() expects a string path, but received a ${typeof path}`);
			_mocker().queueUnmock(path, getImporter("unmock"));
		},
		doMock(path, factory) {
			if (typeof path !== "string") throw new TypeError(`vi.doMock() expects a string path, but received a ${typeof path}`);
			const importer = getImporter("doMock");
			_mocker().queueMock(path, importer, typeof factory === "function" ? () => factory(() => _mocker().importActual(path, importer, _mocker().getMockContext().callstack)) : factory);
			const rv = {};
			if (Symbol.dispose) rv[Symbol.dispose] = () => {
				_mocker().queueUnmock(path, importer);
			};
			return rv;
		},
		doUnmock(path) {
			if (typeof path !== "string") throw new TypeError(`vi.doUnmock() expects a string path, but received a ${typeof path}`);
			const importer = getImporter("doUnmock");
			_mocker().queueUnmock(path, importer);
		},
		async importActual(path) {
			const importer = getImporter("importActual");
			return _mocker().importActual(path, importer, _mocker().getMockContext().callstack);
		},
		async importMock(path) {
			const importer = getImporter("importMock");
			return _mocker().importMock(path, importer);
		},
		mockObject(value, options) {
			return _mocker().mockObject({ value }, void 0, options?.spy ? "autospy" : "automock").value;
		},
		// this is typed in the interface so it's not necessary to type it here
		mocked(item, _options = {}) {
			return item;
		},
		isMockFunction(fn) {
			return isMockFunction(fn);
		},
		clearAllMocks() {
			clearAllMocks();
			return utils;
		},
		resetAllMocks() {
			resetAllMocks();
			return utils;
		},
		restoreAllMocks() {
			restoreAllMocks();
			return utils;
		},
		stubGlobal(name, value) {
			if (!_stubsGlobal.has(name)) _stubsGlobal.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
			Object.defineProperty(globalThis, name, {
				value,
				writable: true,
				configurable: true,
				enumerable: true
			});
			return utils;
		},
		stubEnv(name, value) {
			const env = state().metaEnv;
			if (!_stubsEnv.has(name)) _stubsEnv.set(name, env[name]);
			if (value === void 0) delete env[name];
			else if (_envBooleans.includes(name)) env[name] = value ? "1" : "";
			else env[name] = String(value);
			return utils;
		},
		unstubAllGlobals() {
			_stubsGlobal.forEach((original, name) => {
				if (!original) Reflect.deleteProperty(globalThis, name);
				else Object.defineProperty(globalThis, name, original);
			});
			_stubsGlobal.clear();
			return utils;
		},
		unstubAllEnvs() {
			const env = state().metaEnv;
			_stubsEnv.forEach((original, name) => {
				if (original === void 0) delete env[name];
				else env[name] = original;
			});
			_stubsEnv.clear();
			return utils;
		},
		resetModules() {
			resetModules(state().evaluatedModules);
			return utils;
		},
		async dynamicImportSettled() {
			return waitForImportsToResolve();
		},
		setConfig(config) {
			if (!_config) _config = { ...state().config };
			Object.assign(state().config, config);
		},
		resetConfig() {
			if (_config) Object.assign(state().config, _config);
		}
	};
	return utils;
}
const vitest = createVitest();
const vi = vitest;
function _mocker() {
	// @ts-expect-error injected by vite-nide
	return typeof __vitest_mocker__ !== "undefined" ? __vitest_mocker__ : new Proxy({}, { get(_, name) {
		throw new Error(`Vitest mocker was not initialized in this environment. vi.${String(name)}() is forbidden.`);
	} });
}
function getImporter(name) {
	const stackArray = createSimpleStackTrace({ stackTraceLimit: 5 }).split("\n");
	// if there is no message in a stack trace, use the item - 1
	const importerStackIndex = stackArray.findLastIndex((stack) => {
		return stack.includes(` at Object.${name}`) || stack.includes(`${name}@`) || stack.includes(` at ${name} (`);
	});
	return parseSingleStack(stackArray[importerStackIndex + 1])?.file || "";
}
function waitNextTick() {
	const { setTimeout } = getSafeTimers();
	return new Promise((resolve) => setTimeout(resolve, 0));
}
async function waitForImportsToResolve() {
	await waitNextTick();
	const state = getWorkerState();
	const promises = [];
	const resolvingCount = state.resolvingModules.size;
	for (const [_, mod] of state.evaluatedModules.idToModuleMap) if (mod.promise && !mod.evaluated) promises.push(mod.promise);
	if (!promises.length && !resolvingCount) return;
	await Promise.allSettled(promises);
	await waitForImportsToResolve();
}

// these matchers are not supported because they don't make sense with poll
const unsupported = [
	"matchSnapshot",
	"toMatchSnapshot",
	"toMatchInlineSnapshot",
	"toThrowErrorMatchingSnapshot",
	"toThrowErrorMatchingInlineSnapshot",
	"throws",
	"Throw",
	"throw",
	"toThrow",
	"toThrowError"
];
/**
* Attaches a `cause` property to the error if missing, prefixes the custom message, copies the stack trace from the source, and throws.
*
* @param error - The error to throw
* @param source - Error to copy the stack trace from
* @param message - Custom message passed to `expect.poll`
*
* @throws Always throws the provided error with an amended stack trace
*/
function throwWithCause(error, source, message) {
	error.cause ??= /* @__PURE__ */ new Error("Matcher did not succeed in time.");
	// matcher errors already start with the custom message
	if (message && typeof error.message === "string" && !error.message.startsWith(`${message}: `)) try {
		error.message = `${message}: ${error.message}`;
	} catch {}
	throw copyStackTrace(error, source);
}
function createExpectPoll(expect) {
	return function poll(fn, options = {}) {
		const defaults = getWorkerState().config.expect?.poll ?? {};
		const { interval = defaults.interval ?? 50, timeout = defaults.timeout ?? 1e3, message } = options;
		// @ts-expect-error private poll access
		const assertion = expect(null, message).withContext({ poll: true });
		fn = fn.bind(assertion);
		// injected so that domain snapshot can take over poll implementation.
		chai.util.flag(assertion, "_poll.fn", fn);
		chai.util.flag(assertion, "_poll.timeout", timeout);
		chai.util.flag(assertion, "_poll.interval", interval);
		const test = chai.util.flag(assertion, "vitest-test");
		if (!test) throw new Error("expect.poll() must be called inside a test");
		setTraceHandlers(assertion, test);
		const proxy = new Proxy(assertion, { get(target, key, receiver) {
			const assertionFunction = Reflect.get(target, key, receiver);
			if (typeof assertionFunction !== "function") return assertionFunction instanceof chai.Assertion ? proxy : assertionFunction;
			if (key === "assert") return assertionFunction;
			if (typeof key === "string" && unsupported.includes(key)) throw new SyntaxError(`expect.poll() is not supported in combination with .${key}(). Use vi.waitFor() if your assertion condition is unstable.`);
			// Core poll stack-trace trick:
			//   1. capture STACK_TRACE_ERROR here before entering the async poll loop
			//   2. when the matcher eventually fails, rethrow via throwWithCause()
			//      so the final error keeps this earlier stack
			//
			// For example, when user writes:
			//    await expect.poll(...).toBeSomething()
			// STACK_TRACE_ERROR.stack would look like
			//   at ...(more internal stacks)...
			//   at __VITEST_POLL_CHAIN__ .../packages/vitest/dist/...
			//   at .../my-file.test.ts:12:3   (this points to `toBeSomething()` callsite in user test file)
			// Vitest later filters out internal stacks from `vitest/dist`, so the reported errors correctly
			// points to the user callsite for poll assertion errors.
			//
			// Inline snapshots piggyback on the same idea. We pass
			// STACK_TRACE_ERROR through `chai.util.flag(assertion, 'error', ...)`.
			// Inline snapshot assertion access the same error stack for
			// extracting inline snapshot location to validate and update new snapshots.
			return function __VITEST_POLL_CHAIN__(...args) {
				const STACK_TRACE_ERROR = /* @__PURE__ */ new Error("STACK_TRACE_ERROR");
				const promise = async () => {
					chai.util.flag(assertion, "_name", key);
					chai.util.flag(assertion, "error", STACK_TRACE_ERROR);
					const onStart = chai.util.flag(assertion, "_poll.onStart");
					const onSettled = chai.util.flag(assertion, "_poll.onSettled");
					await onStart?.({ assertion });
					if (Object.getOwnPropertyDescriptor(assertionFunction, "__vitest_poll_takeover__")?.value) try {
						const output = await assertionFunction.call(assertion, ...args);
						await onSettled?.({
							assertion,
							status: "pass"
						});
						return output;
					} catch (err) {
						await onSettled?.({
							assertion,
							status: "fail"
						});
						throwWithCause(err, STACK_TRACE_ERROR, message);
					}
					const { setTimeout, clearTimeout } = getSafeTimers();
					let timerId;
					const timeoutController = new AbortController();
					const timeoutPromise = new Promise((resolve) => {
						timerId = setTimeout(() => {
							timeoutController.abort();
							resolve();
						}, timeout);
					});
					let lastError;
					try {
						while (true) try {
							const fnResult = await raceWith(Promise.resolve().then(() => fn({ signal: timeoutController.signal })), timeoutPromise);
							if (!fnResult.ok) {
								lastError ??= /* @__PURE__ */ new Error(`expect.poll() function didn't resolve in time.`);
								break;
							}
							const obj = fnResult.value;
							chai.util.flag(assertion, "object", obj);
							const assertionResult = await raceWith(Promise.resolve().then(() => assertionFunction.apply(assertion, args)), timeoutPromise);
							if (!assertionResult.ok) {
								lastError ??= /* @__PURE__ */ new Error(`expect.poll() assertion didn't resolve in time.`);
								break;
							}
							const output = assertionResult.value;
							await onSettled?.({
								assertion,
								status: "pass"
							});
							return output;
						} catch (err) {
							lastError = err;
							// no retry for toMatchScreenshot since
							// it owns retry/stability after the first element resolution
							if (key === "toMatchScreenshot") break;
							if (!(await raceWith(delay(interval, setTimeout), timeoutPromise)).ok) break;
							if (vi.isFakeTimers()) vi.advanceTimersByTime(interval);
						}
					} finally {
						clearTimeout(timerId);
					}
					if (lastError) {
						await onSettled?.({
							assertion,
							status: "fail"
						});
						throwWithCause(lastError, STACK_TRACE_ERROR, message);
					}
				};
				let awaited = false;
				test.onFinished ??= [];
				test.onFinished.push(() => {
					if (!awaited) {
						const negated = chai.util.flag(assertion, "negate") ? "not." : "";
						const assertionString = `expect.${chai.util.flag(assertion, "_poll.element") ? "element(locator)" : "poll(assertion)"}.${negated}${String(key)}()`;
						const error = /* @__PURE__ */ new Error(`${assertionString} was not awaited. This assertion is asynchronous and must be awaited; otherwise, it is not executed to avoid unhandled rejections:\n\nawait ${assertionString}\n`);
						throw copyStackTrace(error, STACK_TRACE_ERROR);
					}
				});
				let resultPromise;
				// lets `expect.element` register the poll with the task deadline
				const wrap = chai.util.flag(assertion, "_poll.wrap");
				const start = () => resultPromise ||= wrap ? wrap(promise(), STACK_TRACE_ERROR) : promise();
				// only .then is enough to check awaited, but we type this as `Promise<void>` in global types
				// so let's follow it
				return {
					then(onFulfilled, onRejected) {
						awaited = true;
						return start().then(onFulfilled, onRejected);
					},
					catch(onRejected) {
						awaited = true;
						return start().catch(onRejected);
					},
					finally(onFinally) {
						awaited = true;
						return start().finally(onFinally);
					},
					[Symbol.toStringTag]: "Promise"
				};
			};
		} });
		return proxy;
	};
}
function setTraceHandlers(assertion, test) {
	const attempt = getTraceAttempt(test);
	if (!attempt) return;
	const rangeId = createTraceRangeId();
	// TODO: compute the name once in `__VITEST_POLL_CHAIN__` and pass it to the hooks,
	// so this and `getTraceName` in packages/browser/src/client/tester/expect-element.ts can share it
	const getName = (assertion) => {
		const negated = chai.util.flag(assertion, "negate") ? "not." : "";
		const message = chai.util.flag(assertion, "message");
		const name = `expect.poll().${negated}${chai.util.flag(assertion, "_name")}`;
		return message ? `${message} (${name})` : `${name}()`;
	};
	const onStart = ({ assertion }) => {
		recordTraceEntry(attempt, {
			name: getName(assertion),
			kind: "expect",
			range: {
				id: rangeId,
				phase: "start"
			}
		}, chai.util.flag(assertion, "error"));
	};
	const onSettled = ({ assertion, status }) => {
		recordTraceEntry(attempt, {
			name: getName(assertion),
			kind: "expect",
			range: {
				id: rangeId,
				phase: "end"
			},
			status
		}, chai.util.flag(assertion, "error"));
	};
	chai.util.flag(assertion, "_poll.onStart", onStart);
	chai.util.flag(assertion, "_poll.onSettled", onSettled);
}
function raceWith(promise, other) {
	const left = promise.then((value) => ({
		ok: true,
		value
	}));
	if (!other) return left;
	return Promise.race([left, other.then((value) => ({
		ok: false,
		value
	}))]);
}

const MockPlugin = (chai, utils) => {
	utils.addMethod(chai.Assertion.prototype, "toHaveBeenExhausted", wrapAssertion(utils, "toHaveBeenExhausted", function() {
		const chain = utils.flag(this, "object");
		if (!isWhenChain(chain)) throw new TypeError(`${utils.inspect(chain)} is not a \`vi.when\` instance`);
		const diagnostics = chain._getDiagnostics();
		this.assert(diagnostics.isExhausted, `expected all behaviors to have been exhausted, but some remain:\n\n  ${diagnostics.pendingBehaviors.replaceAll(/\n(?!\n)/g, "\n  ")}`, "expected at least one behavior to remain un-exhausted, but all were");
	}));
};

let _client;
function getSnapshotClient() {
	if (!_client) _client = new SnapshotClient({ isEqual: (received, expected) => {
		return equals(received, expected, [iterableEquality, subsetEquality]);
	} });
	return _client;
}
function getError(expected, promise) {
	if (typeof expected !== "function") {
		if (!promise) throw new Error(`expected must be a function, received ${typeof expected}`);
		// when "promised", it receives thrown error
		return expected;
	}
	try {
		expected();
	} catch (e) {
		return e;
	}
	throw new Error("snapshot function didn't throw");
}
function getTestNames(test) {
	return {
		filepath: test.file.filepath,
		name: getNames(test).slice(1).join(" > "),
		testId: test.id
	};
}
function getAssertionName(assertion) {
	const name = chai.util.flag(assertion, "_name");
	if (!name) throw new Error("Assertion name is not set. This is a bug in Vitest. Please, open a new issue with reproduction.");
	return name;
}
function getTest(obj) {
	const test = chai.util.flag(obj, "vitest-test");
	if (!test) throw new Error(`'${getAssertionName(obj)}' cannot be used without test context`);
	if (test.fails) throw new TestSyntaxError(`'${getAssertionName(obj)}' cannot be used with 'test.fails'`);
	return test;
}
function validateAssertion(assertion) {
	if (chai.util.flag(assertion, "negate")) throw new Error(`${getAssertionName(assertion)} cannot be used with "not"`);
}
const SnapshotPlugin = (chai, utils) => {
	for (const key of ["matchSnapshot", "toMatchSnapshot"]) utils.addMethod(chai.Assertion.prototype, key, wrapAssertion(utils, key, function(propertiesOrHint, hint) {
		return assertMatchResult(toMatchSnapshotImpl({
			assertion: this,
			received: utils.flag(this, "object"),
			...normalizeArguments(propertiesOrHint, hint)
		}), chai.util.flag(this, "message"));
	}));
	utils.addMethod(chai.Assertion.prototype, "toMatchFileSnapshot", function(filepath, hint) {
		// set name manually since it's not wrapped by wrapAssertion
		utils.flag(this, "_name", "toMatchFileSnapshot");
		// validate early synchronously just not to break some existing tests
		validateAssertion(this);
		const assertPromise = toMatchFileSnapshotImpl({
			assertion: this,
			received: utils.flag(this, "object"),
			filepath,
			hint
		}).then((result) => assertMatchResult(result, chai.util.flag(this, "message")));
		// `.resolves/rejects` handle `expect.soft` through `recordAsyncExpect`
		const isSoft = utils.flag(this, "soft") && !utils.flag(this, "promise");
		return recordAsyncExpect(getTest(this), assertPromise, createAssertionMessage(utils, this, true), /* @__PURE__ */ new Error("resolves"), isSoft);
	});
	utils.addMethod(chai.Assertion.prototype, "toMatchInlineSnapshot", wrapAssertion(utils, "toMatchInlineSnapshot", function __INLINE_SNAPSHOT_OFFSET_3__(propertiesOrInlineSnapshot, inlineSnapshotOrHint, hint) {
		return assertMatchResult(toMatchSnapshotImpl({
			assertion: this,
			received: utils.flag(this, "object"),
			isInline: true,
			...normalizeInlineArguments(propertiesOrInlineSnapshot, inlineSnapshotOrHint, hint)
		}), chai.util.flag(this, "message"));
	}));
	utils.addMethod(chai.Assertion.prototype, "toThrowErrorMatchingSnapshot", wrapAssertion(utils, "toThrowErrorMatchingSnapshot", function(propertiesOrHint, hint) {
		validateAssertion(this);
		const received = utils.flag(this, "object");
		const promise = utils.flag(this, "promise");
		return assertMatchResult(toMatchSnapshotImpl({
			assertion: this,
			received: getError(received, promise),
			...normalizeArguments(propertiesOrHint, hint)
		}), chai.util.flag(this, "message"));
	}));
	utils.addMethod(chai.Assertion.prototype, "toThrowErrorMatchingInlineSnapshot", wrapAssertion(utils, "toThrowErrorMatchingInlineSnapshot", function __INLINE_SNAPSHOT_OFFSET_3__(inlineSnapshotOrHint, hint) {
		validateAssertion(this);
		const received = utils.flag(this, "object");
		const promise = utils.flag(this, "promise");
		return assertMatchResult(toMatchSnapshotImpl({
			assertion: this,
			received: getError(received, promise),
			isInline: true,
			...normalizeInlineArguments(void 0, inlineSnapshotOrHint, hint)
		}), chai.util.flag(this, "message"));
	}));
	utils.addMethod(chai.expect, "addSnapshotSerializer", addSerializer);
};
function toMatchDomainSnapshotImpl(opts) {
	const { assertion } = opts;
	validateAssertion(assertion);
	const assertionName = getAssertionName(assertion);
	const test = getTest(assertion);
	let { inlineSnapshot } = opts;
	if (inlineSnapshot !== void 0) inlineSnapshot = stripSnapshotIndentation(inlineSnapshot);
	const pollFn = chai.util.flag(assertion, "_poll.fn");
	if (pollFn) return getSnapshotClient().pollMatchDomain({
		poll: pollFn,
		adapter: opts.adapter,
		message: opts.hint,
		isInline: opts.isInline,
		errorMessage: chai.util.flag(assertion, "message"),
		timeout: chai.util.flag(assertion, "_poll.timeout"),
		interval: chai.util.flag(assertion, "_poll.interval"),
		assertionName,
		inlineSnapshot,
		error: chai.util.flag(assertion, "error"),
		...getTestNames(test)
	});
	return getSnapshotClient().matchDomain({
		received: opts.received,
		adapter: opts.adapter,
		message: opts.hint,
		isInline: opts.isInline,
		errorMessage: chai.util.flag(assertion, "message"),
		assertionName,
		inlineSnapshot,
		error: chai.util.flag(assertion, "error"),
		...getTestNames(test)
	});
}
// toMatchSnapshot(propertiesOrHint?, hint?)
function normalizeArguments(propertiesOrHint, hint) {
	if (typeof propertiesOrHint === "string") return { hint: propertiesOrHint };
	return {
		properties: propertiesOrHint,
		hint
	};
}
// toMatchInlineSnapshot(propertiesOrInlineSnapshot?, inlineSnapshotOrHint?, hint?)
function normalizeInlineArguments(propertiesOrInlineSnapshot, inlineSnapshotOrHint, hint) {
	let inlineSnapshot;
	if (typeof propertiesOrInlineSnapshot === "string") {
		inlineSnapshot = stripSnapshotIndentation(propertiesOrInlineSnapshot);
		return {
			inlineSnapshot,
			hint: inlineSnapshotOrHint
		};
	}
	if (inlineSnapshotOrHint) inlineSnapshot = stripSnapshotIndentation(inlineSnapshotOrHint);
	return {
		properties: propertiesOrInlineSnapshot,
		inlineSnapshot,
		hint
	};
}
function toMatchSnapshotImpl(options) {
	const { assertion } = options;
	validateAssertion(assertion);
	const assertionName = getAssertionName(assertion);
	const test = getTest(assertion);
	return getSnapshotClient().match({
		received: options.received,
		properties: options.properties,
		message: options.hint,
		isInline: options.isInline,
		inlineSnapshot: options.inlineSnapshot,
		// pass `assertionName` for inline snapshot stack probing
		assertionName,
		// set by async assertion (e.g. resolves/rejects) for inline snapshot stack probing
		error: chai.util.flag(assertion, "error"),
		...getTestNames(test)
	});
}
async function toMatchFileSnapshotImpl(options) {
	const { assertion } = options;
	validateAssertion(assertion);
	const testNames = getTestNames(getTest(assertion));
	const snapshotState = getSnapshotClient().getSnapshotState(testNames.filepath);
	const rawSnapshotFile = await snapshotState.environment.resolveRawPath(testNames.filepath, options.filepath);
	const rawSnapshotContent = await snapshotState.environment.readSnapshotFile(rawSnapshotFile);
	const assertionName = getAssertionName(assertion);
	return getSnapshotClient().match({
		received: options.received,
		message: options.hint,
		rawSnapshot: {
			file: rawSnapshotFile,
			content: rawSnapshotContent ?? void 0
		},
		assertionName,
		...testNames
	});
}
function assertMatchResult(result, customMessage) {
	if (!result.pass) {
		const errorMessage = (customMessage ? `${customMessage}: ` : "") + result.message();
		throw Object.assign(new Error(errorMessage), {
			actual: result.actual,
			expected: result.expected,
			diffOptions: { expand: getWorkerState().config.snapshotOptions.expand },
			__vitest_error_context__: { meta: result.meta }
		});
	}
}
/**
* Composable snapshot matcher helpers for building custom snapshot matchers
* with `expect.extend`.
*
* @experimental
* @see https://vitest.dev/guide/snapshot.html#custom-snapshot-matchers
*/
const Snapshots = {
	/**
	* Composable for building custom snapshot matchers via `expect.extend`.
	* Call with `this` bound to the matcher state. Returns `{ pass, message }`
	* compatible with the custom matcher return contract.
	*
	* @example
	* ```ts
	* import { Snapshots } from 'vitest/runtime'
	*
	* expect.extend({
	*   toMatchTrimmedSnapshot(received: string) {
	*     return Snapshots.toMatchSnapshot.call(this, received.slice(0, 10))
	*   },
	* })
	* ```
	*
	* @experimental
	* @see https://vitest.dev/guide/snapshot.html#custom-snapshot-matchers
	*/
	toMatchSnapshot(received, propertiesOrHint, hint) {
		return toMatchSnapshotImpl({
			assertion: this.assertion,
			received,
			...normalizeArguments(propertiesOrHint, hint)
		});
	},
	/**
	* Composable for building custom inline snapshot matchers via `expect.extend`.
	* Call with `this` bound to the matcher state. Returns `{ pass, message }`
	* compatible with the custom matcher return contract.
	*
	* @example
	* ```ts
	* import { Snapshots } from 'vitest/runtime'
	*
	* expect.extend({
	*   toMatchTrimmedInlineSnapshot(received: string, inlineSnapshot?: string) {
	*     return Snapshots.toMatchInlineSnapshot.call(this, received.slice(0, 10), inlineSnapshot)
	*   },
	* })
	* ```
	*
	* @experimental
	* @see https://vitest.dev/guide/snapshot.html#custom-snapshot-matchers
	*/
	toMatchInlineSnapshot(received, propertiesOrInlineSnapshot, inlineSnapshotOrHint, hint) {
		return toMatchSnapshotImpl({
			assertion: this.assertion,
			received,
			isInline: true,
			...normalizeInlineArguments(propertiesOrInlineSnapshot, inlineSnapshotOrHint, hint)
		});
	},
	/**
	* Composable for building custom file snapshot matchers via `expect.extend`.
	* Call with `this` bound to the matcher state. Returns a `Promise<{ pass, message }>`
	* compatible with the custom matcher return contract.
	*
	* @example
	* ```ts
	* import { Snapshots } from 'vitest/runtime'
	*
	* expect.extend({
	*   async toMatchTrimmedFileSnapshot(received: string, file: string) {
	*     return Snapshots.toMatchFileSnapshot.call(this, received.slice(0, 10), file)
	*   },
	* })
	* ```
	*
	* @experimental
	* @see https://vitest.dev/guide/snapshot.html#custom-snapshot-matchers
	*/
	toMatchFileSnapshot(received, filepath, hint) {
		return toMatchFileSnapshotImpl({
			assertion: this.assertion,
			received,
			filepath,
			hint
		});
	},
	/**
	* Composable for building custom domain-based snapshot matchers via `expect.extend`.
	*
	* Call this from a matcher and pass the domain adapter that defines capture,
	* rendering, parsing, and semantic matching behavior.
	*
	* @experimental
	*/
	toMatchDomainSnapshot(domain, received) {
		return toMatchDomainSnapshotImpl({
			assertion: this.assertion,
			adapter: domain,
			received
		});
	},
	/**
	* Composable for building custom domain-based inline snapshot matchers via `expect.extend`.
	*
	* Call this from a matcher and pass the domain adapter that defines capture,
	* rendering, parsing, and semantic matching behavior.
	*
	* @experimental
	*/
	toMatchDomainInlineSnapshot(domain, received, inlineSnapshot) {
		return toMatchDomainSnapshotImpl({
			assertion: this.assertion,
			adapter: domain,
			received,
			isInline: true,
			inlineSnapshot
		});
	}
};

chai.use(JestExtend);
chai.use(JestChaiExpect);
chai.use(ChaiStyleAssertions);
chai.use(SnapshotPlugin);
chai.use(JestAsymmetricMatchers);
chai.use(MockPlugin);

function createExpect(test) {
	const expect = ((value, message) => {
		const { assertionCalls } = getState(expect);
		setState({ assertionCalls: assertionCalls + 1 }, expect);
		const assert = chai.expect(value, message);
		const _test = test || getCurrentTest();
		if (_test)
 // @ts-expect-error internal
		return assert.withTest(_test);
		else return assert;
	});
	Object.assign(expect, chai.expect);
	Object.assign(expect, globalThis[ASYMMETRIC_MATCHERS_OBJECT]);
	expect.getState = () => getState(expect);
	expect.setState = (state) => setState(state, expect);
	// @ts-expect-error global is not typed
	const globalState = getState(globalThis[GLOBAL_EXPECT]) || {};
	setState({
		// this should also add "snapshotState" that is added conditionally
		...globalState,
		assertionCalls: 0,
		isExpectingAssertions: false,
		isExpectingAssertionsError: null,
		expectedAssertionsNumber: null,
		expectedAssertionsNumberErrorGen: null,
		get testPath() {
			return getWorkerState().filepath;
		},
		currentTestName: test ? test.fullTestName ?? "" : globalState.currentTestName
	}, expect);
	expect.assert = chai.assert;
	// @ts-expect-error untyped
	expect.extend = (matchers) => chai.expect.extend(expect, matchers);
	expect.addEqualityTesters = (customTesters) => addCustomEqualityTesters(customTesters);
	expect.soft = (...args) => {
		// @ts-expect-error private soft access
		return expect(...args).withContext({ soft: true });
	};
	expect.poll = createExpectPoll(expect);
	expect.unreachable = (message) => {
		chai.assert.fail(`expected${message ? ` "${message}" ` : " "}not to be reached`);
	};
	function assertions(expected) {
		const errorGen = () => /* @__PURE__ */ new Error(`expected number of assertions to be ${expected}, but got ${expect.getState().assertionCalls}`);
		if (Error.captureStackTrace) Error.captureStackTrace(errorGen(), assertions);
		expect.setState({
			expectedAssertionsNumber: expected,
			expectedAssertionsNumberErrorGen: errorGen
		});
	}
	function hasAssertions() {
		const error = /* @__PURE__ */ new Error("expected any number of assertion, but got none");
		if (Error.captureStackTrace) Error.captureStackTrace(error, hasAssertions);
		expect.setState({
			isExpectingAssertions: true,
			isExpectingAssertionsError: error
		});
	}
	chai.util.addMethod(expect, "assertions", assertions);
	chai.util.addMethod(expect, "hasAssertions", hasAssertions);
	expect.extend(customMatchers);
	expect.extend(benchMatchers);
	return expect;
}
const globalExpect = createExpect();
Object.defineProperty(globalThis, GLOBAL_EXPECT, {
	value: globalExpect,
	writable: true,
	configurable: true
});
const assert = chai.assert;
const should = chai.should;

/**
* Gives access to injected context provided from the main thread.
* This usually returns a value provided by `globalSetup` or an external library.
*/
function inject(key) {
	return getWorkerState().providedContext[key];
}

const now = globalThis.performance ? globalThis.performance.now.bind(globalThis.performance) : Date.now;
/**
* The built-in benchmark provider, backed by tinybench. Selected when
* `benchmark.provider` is not configured.
*/
function createDefaultBenchmarkProvider(config) {
	let benchIdx = 0;
	return { async run({ test, options, registrations }) {
		const currentIndex = ++benchIdx;
		const tinybench = new Bench({
			signal: test.context.signal,
			name: `${test.fullTestName} ${currentIndex}`,
			retainSamples: config.benchmark.retainSamples,
			...options,
			now
		});
		for (const { name, fn, fnOpts } of registrations) tinybench.add(name, fn, fnOpts);
		await tinybench.run();
		const errors = tinybench.tasks.filter((task) => task.result.state === "errored").map((task) => task.result.error);
		if (errors.length === 1) throw errors[0];
		if (errors.length > 1) throw new AggregateError(errors, "Some benchmarks failed");
		return tinybench.tasks.map(toBenchResult);
	} };
}
function toBenchResult(task) {
	const result = task.result;
	if (result.state !== "completed") throw new Error(`task "${task.name}" did not complete: received "${result.state}"`);
	return {
		...result,
		name: task.name
	};
}

const kRegistration = Symbol("registration");
const kFromSource = Symbol("fromSource");
const kPerProject = Symbol("perProject");
const kWriteResult = Symbol("writeResult");
const kFinalize = Symbol("finalize");
let cachedProvider;
async function loadProviderModule(provider, moduleRunner) {
	let mod;
	try {
		mod = await moduleRunner.import(provider);
	} catch (error) {
		throw new Error(`Failed to load benchmark provider from "${provider}".`, { cause: error });
	}
	if (mod.default == null) throw new Error(`Benchmark provider loaded from "${provider}" did not have a default export.`);
	return mod.default;
}
/**
* Resolves the benchmark provider for the current worker, importing a custom
* provider module on first use. The result is cached for the lifetime of the
* worker so a custom provider is imported at most once.
*/
function resolveBenchmarkProvider(config, moduleRunner) {
	if (!cachedProvider) {
		const provider = config.benchmark.provider;
		cachedProvider = !provider ? Promise.resolve(createDefaultBenchmarkProvider(config)) : loadProviderModule(provider, moduleRunner);
	}
	return cachedProvider;
}
function isFromRegistration(reg) {
	return kFromSource in reg;
}
function substitutePath(template, projectName) {
	return template.replace(/\$\{projectName\}/g, projectName ?? "");
}
function createBench(test, config, moduleRunner) {
	const pending = /* @__PURE__ */ new Set();
	const resolveTemplate = (template) => substitutePath(template, config.benchmark.projectName);
	const resolveFromSource = async (source) => {
		if (typeof source === "function") return source();
		const resolved = resolveTemplate(source);
		const data = await rpc().readBenchmarkResult(resolved);
		if (data == null) throw new Error(`\`bench.from()\` could not find a result file at "${resolved}". Run the source benchmark first to create it.`);
		return data;
	};
	const taskFromBaseline = (name, data) => ({
		name,
		latency: data.latency,
		throughput: data.throughput,
		period: data.period,
		totalTime: data.totalTime,
		rank: 0,
		fromStore: true
	});
	const createCompareStorage = (results, fromResults) => {
		return { get(name) {
			const stored = fromResults?.get(name);
			if (stored) return stored;
			const result = results.get(name);
			if (!result) throw new Error(`task "${name}" was not defined`);
			return result;
		} };
	};
	const serializeBenchmark = (results, name, taskMeta, fromTasks) => {
		const tasks = results.map((result) => ({
			name: result.name,
			latency: result.latency,
			throughput: result.throughput,
			period: result.period,
			totalTime: result.totalTime,
			rank: 0,
			...taskMeta?.get(result.name)
		}));
		if (fromTasks) tasks.push(...fromTasks);
		tasks.sort((a, b) => a.latency.mean - b.latency.mean);
		tasks.forEach((task, idx) => {
			task.rank = idx + 1;
		});
		return {
			name,
			tasks
		};
	};
	const recordBenchmark = async (results, name, taskMeta, fromTasks) => {
		const serializedBenchmark = serializeBenchmark(results, name, taskMeta, fromTasks);
		test.benchmarks.push(serializedBenchmark);
		await rpc().onTestBenchmark(test.id, serializedBenchmark);
	};
	const writeResultArtifact = async (template, result) => {
		const resolved = resolveTemplate(template);
		const data = {
			latency: result.latency,
			throughput: result.throughput,
			period: result.period,
			totalTime: result.totalTime
		};
		await rpc().writeBenchmarkResult(resolved, data);
	};
	const groupName = (options) => options?.name ?? test.fullTestName;
	const runGroup = async (registrations, options) => {
		const workerState = getWorkerState();
		const getterTracker = workerState.getterTracker;
		getterTracker?.resetInvocations();
		try {
			const results = await (await resolveBenchmarkProvider(config, moduleRunner)).run({
				test,
				config: config.benchmark,
				registrations,
				options
			});
			const byName = /* @__PURE__ */ new Map();
			for (const result of results) byName.set(result.name, result);
			return byName;
		} finally {
			const excessiveInvocations = config.benchmark.suppressExportGetterWarnings ? void 0 : getterTracker?.getExcessiveInvocations();
			if (excessiveInvocations?.length) {
				const entries = excessiveInvocations.map(({ moduleId, exportName }) => `  - ${formatModuleId(moduleId, workerState.config.root)} > ${exportName}`).join("\n");
				console.warn([
					$.yellow($.bold("Benchmark Warning")),
					`Benchmark ${$.bold(`"${groupName(options)}"`)} accessed module export getters too many times.`,
					"",
					"This can make results unreliable because export getters add overhead.",
					"See https://vitest.dev/guide/benchmarking#module-runner-overhead",
					"",
					"Tracked exports:",
					entries
				].join("\n"));
			}
		}
	};
	const runSingle = async (name, fn, fnOpts, options, meta, writeResult) => {
		const result = (await runGroup([{
			name,
			fn,
			fnOpts
		}], options)).get(name);
		if (!result) throw new Error(`benchmark provider did not return a result for "${name}"`);
		await recordBenchmark([result], groupName(options), meta ? /* @__PURE__ */ new Map([[name, meta]]) : void 0);
		if (writeResult) await writeResultArtifact(writeResult, result);
		return result;
	};
	const runFrom = async (name, source) => {
		const data = await resolveFromSource(source);
		const benchmark = {
			name: test.fullTestName,
			tasks: [{
				...taskFromBaseline(name, data),
				rank: 1
			}]
		};
		test.benchmarks.push(benchmark);
		await rpc().onTestBenchmark(test.id, benchmark);
		return data;
	};
	const bench = (nameOrFunction, a, b) => {
		validateBenchmarkProject(config);
		const { fn, fnOpts, writeResult, perProject } = normalizeBenchArgs(a, b);
		const name = typeof nameOrFunction === "function" ? nameOrFunction.name || "<anonymous>" : nameOrFunction;
		const meta = perProject ? { perProject: true } : void 0;
		const registration = {
			[kRegistration]: true,
			name,
			fn,
			fnOpts,
			run: (options) => {
				pending.delete(registration);
				return runSingle(name, fn, fnOpts, options, meta, writeResult);
			}
		};
		if (perProject) registration[kPerProject] = true;
		if (writeResult) registration[kWriteResult] = writeResult;
		pending.add(registration);
		return registration;
	};
	bench.from = (nameOrFunction, source) => {
		validateBenchmarkProject(config);
		if (typeof nameOrFunction !== "string" && typeof nameOrFunction !== "function") throw new TypeError("`bench.from()` requires a name (string or named function) as its first argument.");
		if (typeof source !== "string" && typeof source !== "function") throw new TypeError("`bench.from()` expects a string path or a function returning the result data as its second argument.");
		const name = typeof nameOrFunction === "function" ? nameOrFunction.name || "<anonymous>" : nameOrFunction;
		const registration = {
			[kRegistration]: true,
			[kFromSource]: source,
			name,
			run: () => {
				pending.delete(registration);
				return runFrom(name, source);
			}
		};
		pending.add(registration);
		return registration;
	};
	bench.compare = async (...args) => {
		validateBenchmarkProject(config);
		// extract optional trailing BenchRunOptions argument
		const lastArg = args.at(-1);
		const benchOptions = lastArg != null && typeof lastArg === "object" && !(kRegistration in lastArg) ? args.pop() : void 0;
		const registrations = args;
		// Mark every passed-in registration as consumed before validation so a
		// throwing `bench.compare()` (wrong arity, wrong shape) doesn't also
		// trigger the unrun-bench warning — the user's intent was to consume them.
		for (const reg of registrations) if (reg != null && typeof reg === "object" && kRegistration in reg) pending.delete(reg);
		if (registrations.length < 2) throw new SyntaxError(`\`bench.compare()\` requires at least 2 benchmarks, received ${registrations.length} instead. ${registrations.length === 1 ? "Consider calling `bench().run()`. " : "Define benchmarks by calling `bench()`. "}See https://vitest.dev/guide/benchmarking#comparing-benchmarks`);
		for (const reg of registrations) if (reg == null || typeof reg !== "object" || !(kRegistration in reg)) throw new SyntaxError("`bench.compare()` expects every argument to be the return value of `bench` or `bench.from`.");
		const runnable = [];
		const fromEntries = [];
		for (const reg of registrations) if (isFromRegistration(reg)) fromEntries.push(reg);
		else runnable.push(reg);
		const taskMeta = /* @__PURE__ */ new Map();
		for (const reg of runnable) if (reg[kPerProject]) taskMeta.set(reg.name, { perProject: true });
		const fromResults = /* @__PURE__ */ new Map();
		const fromTasks = [];
		if (fromEntries.length > 0) {
			const resolved = await Promise.all(fromEntries.map(async (reg) => {
				return {
					reg,
					data: await resolveFromSource(reg[kFromSource])
				};
			}));
			for (const { reg, data } of resolved) {
				fromResults.set(reg.name, data);
				fromTasks.push(taskFromBaseline(reg.name, data));
			}
		}
		let results = /* @__PURE__ */ new Map();
		if (runnable.length > 0) results = await runGroup(runnable.map((reg) => ({
			name: reg.name,
			fn: reg.fn,
			fnOpts: reg.fnOpts
		})), benchOptions);
		await recordBenchmark(Array.from(results.values()), groupName(benchOptions), taskMeta, fromTasks);
		// write artifacts for every runnable registration that requested it. We
		// do this after recording so a write failure can't be confused with a
		// benchmark failure in the reporter output.
		await Promise.all(runnable.filter((reg) => reg[kWriteResult] != null).map((reg) => {
			const result = results.get(reg.name);
			return writeResultArtifact(reg[kWriteResult], result);
		}));
		return createCompareStorage(results, fromResults);
	};
	bench[kFinalize] = () => {
		if (pending.size === 0) return;
		const names = Array.from(pending, (reg) => `"${reg.name}"`).join(", ");
		pending.clear();
		console.warn([
			$.yellow($.bold("Benchmark Warning")),
			`Test ${$.bold(`"${test.fullTestName}"`)} registered benchmarks that never ran: ${names}.`,
			"",
			"Call `.run()` on the registration, or pass it to `bench.compare()`.",
			"See https://vitest.dev/guide/benchmarking#defining-a-benchmark"
		].join("\n"));
	};
	return bench;
}
function formatModuleId(moduleId, root) {
	if (!root || !isAbsolute(moduleId)) return moduleId;
	return relative(root, moduleId);
}
function normalizeBenchArgs(a, b) {
	if (typeof a === "function") {
		if (b !== void 0) throw new TypeError("`bench()` does not accept options as the third argument. Pass options as the second argument instead: `bench(name, options, fn)`.");
		return {
			fn: a,
			fnOpts: void 0,
			writeResult: void 0,
			perProject: false
		};
	}
	if (typeof b !== "function") throw new TypeError("`bench()` expects a benchmark function. Call `bench(name, fn)` or `bench(name, options, fn)`.");
	// Strip vitest-specific fields only when present so we don't allocate a new
	// object — preserving referential identity matters: users inspect
	// `registration.fnOpts` and the provider sees the same object the caller
	// passed in.
	if (a.writeResult === void 0 && a.perProject === void 0) return {
		fn: b,
		fnOpts: a,
		writeResult: void 0,
		perProject: false
	};
	const { writeResult, perProject, ...fnOpts } = a;
	return {
		fn: b,
		fnOpts: Object.keys(fnOpts).length > 0 ? fnOpts : void 0,
		writeResult,
		perProject: perProject ?? false
	};
}
function validateBenchmarkProject(config) {
	if (!config.benchmark.enabled) throw new Error("Cannot use the `bench` test-context fixture within a regular test run. Benchmarks are inherently flaky, so Vitest runs them in a dedicated project based on the `benchmark.include` pattern (default `**/*.{bench,benchmark}.?(c|m)[jt]s?(x)`). Move this code to a file matched by `benchmark.include`, and make sure `bench` is destructured from the test context (`test('...', async ({ bench }) => { ... })`) — it is not a top-level export of `vitest`. See https://vitest.dev/guide/benchmarking#stability");
}

class TestRunner {
	config;
	snapshotClient = getSnapshotClient();
	workerState = getWorkerState();
	moduleRunner;
	cancelRun = false;
	assertionsErrors = /* @__PURE__ */ new WeakMap();
	benchInstances = /* @__PURE__ */ new WeakMap();
	pool = this.workerState.ctx.pool;
	/**
	* @internal
	*/
	_otel;
	viteEnvironment;
	viteModuleRunner;
	constructor(config) {
		this.config = config;
		const environment = this.workerState.environment;
		this.viteEnvironment = environment.viteEnvironment || environment.name;
		this.viteModuleRunner = config.experimental.viteModuleRunner;
		// vm pools downgrade worker-scoped fixtures to file scope, so the hook has
		// nothing to tear down there; registering it anyway would keep the
		// listener, an in-context closure, alive for the lifetime of the worker
		if (this.pool !== "vmThreads" && this.pool !== "vmForks") this.onCleanupWorkerContext = (listener) => this.workerState.onCleanup(listener);
	}
	importFile(filepath, source) {
		return this._otel.$(`vitest.module.import_${source === "setup" ? "setup" : "spec"}`, { attributes: { "code.file.path": filepath } }, () => {
			if (!this.viteModuleRunner) filepath = `${filepath}?vitest=${Date.now()}`;
			const options = this.viteModuleRunner ? { invalidate: true } : void 0;
			return this.moduleRunner.import(filepath, options);
		});
	}
	onCollectStart(file) {
		this.workerState.current = file;
	}
	onCleanupWorkerContext;
	onAfterRunFiles(_files) {
		this.snapshotClient.clear();
		this.workerState.current = void 0;
	}
	async onAfterRunSuite(suite) {
		if (this.config.logHeapUsage && typeof process !== "undefined") suite.result.heap = process.memoryUsage().heapUsed;
		if (suite.mode !== "skip" && "filepath" in suite) {
			// mark snapshots in skipped tests as not obsolete
			for (const test of getTests(suite)) if (test.mode === "skip") {
				const name = getNames(test).slice(1).join(" > ");
				this.snapshotClient.skipTest(suite.file.filepath, name);
			}
			this.snapshotClient.getSnapshotState(suite.file.filepath).getSnapshotFiles().forEach((file) => this.workerState.dependencies?.add(file));
			const result = await this.snapshotClient.finish(suite.file.filepath);
			if (this.workerState.config.snapshotOptions.updateSnapshot === "none" && result.unchecked) {
				let message = `Obsolete snapshots found when no snapshot update is expected.\n`;
				for (const key of result.uncheckedKeys) message += `· ${key}\n`;
				suite.result.errors ??= [];
				suite.result.errors.push(processError(new Error(message)));
				suite.result.state = "fail";
			}
			await rpc().snapshotSaved(result);
		}
		this.workerState.current = suite.suite || suite.file;
	}
	onAfterRunTask(test) {
		if (this.config.logHeapUsage && typeof process !== "undefined") test.result.heap = process.memoryUsage().heapUsed;
		this.workerState.current = test.suite || test.file;
	}
	cancel(_reason) {
		this.cancelRun = true;
	}
	injectValue(key) {
		// inject has a very limiting type controlled by ProvidedContext
		// some tests override it which causes the build to fail
		return inject(key);
	}
	async onBeforeRunTask(test) {
		if (this.cancelRun) test.mode = "skip";
		if (test.mode !== "run" && test.mode !== "queued") return;
		this.workerState.current = test;
	}
	async onBeforeRunSuite(suite) {
		if (this.cancelRun) suite.mode = "skip";
		// initialize snapshot state before running file suite
		if (suite.mode !== "skip" && "filepath" in suite) await this.snapshotClient.setup(suite.file.filepath, this.workerState.config.snapshotOptions);
		this.workerState.current = suite;
	}
	onBeforeTryTask(test, options) {
		if (this.config.experimental.traceTimeline && test.type === "test") startTraceAttempt(test, options);
		clearModuleMocks(this.config);
		this.snapshotClient.clearTest(test.file.filepath, test.id);
		setState({
			assertionCalls: 0,
			isExpectingAssertions: false,
			isExpectingAssertionsError: null,
			expectedAssertionsNumber: null,
			expectedAssertionsNumberErrorGen: null,
			currentTestName: getTestName(test),
			snapshotState: this.snapshotClient.getSnapshotState(test.file.filepath)
		}, globalThis[GLOBAL_EXPECT]);
	}
	async onAfterRetryTask(test, _options) {
		if (this.config.experimental.traceTimeline) await finishTraceAttempt(test);
	}
	onAfterTryTask(test) {
		this.benchInstances.get(test)?.[kFinalize]();
		const { assertionCalls, expectedAssertionsNumber, expectedAssertionsNumberErrorGen, isExpectingAssertions, isExpectingAssertionsError } = test.context._local ? test.context.expect.getState() : getState(globalThis[GLOBAL_EXPECT]);
		if (expectedAssertionsNumber !== null && assertionCalls !== expectedAssertionsNumber) throw expectedAssertionsNumberErrorGen();
		if (isExpectingAssertions === true && assertionCalls === 0) throw isExpectingAssertionsError;
		if (this.config.expect.requireAssertions && assertionCalls === 0) throw this.assertionsErrors.get(test);
	}
	extendTaskContext(context) {
		// create error during the test initialization so we have a nice stack trace
		if (this.config.expect.requireAssertions) this.assertionsErrors.set(context.task, /* @__PURE__ */ new Error("expected any number of assertion, but got none"));
		let _expect;
		Object.defineProperty(context, "expect", { get() {
			if (!_expect) _expect = createExpect(context.task);
			return _expect;
		} });
		Object.defineProperty(context, "_local", { get() {
			return _expect != null;
		} });
		let _bench;
		const runnerConfig = this.config;
		const benchInstances = this.benchInstances;
		const moduleRunner = this.moduleRunner;
		Object.defineProperty(context, "bench", { get() {
			if (!_bench) {
				_bench = createBench(context.task, runnerConfig, moduleRunner);
				benchInstances.set(context.task, _bench);
			}
			return _bench;
		} });
		return context;
	}
	getImportDurations() {
		const { limit } = this.config.experimental.importDurations;
		// skip sorting if limit is 0
		if (limit === 0) return {};
		// Sort by duration descending and keep top entries
		const sortedEntries = [...this.workerState.moduleExecutionInfo?.entries() || []].sort(([, a], [, b]) => b.duration - a.duration).slice(0, limit);
		const importDurations = {};
		for (const [filepath, { duration, selfTime, external, importer }] of sortedEntries) importDurations[normalize(filepath)] = {
			selfTime,
			totalTime: duration,
			external,
			importer
		};
		return importDurations;
	}
	getModuleFetchDuration() {
		return this.workerState.durations.fetch;
	}
	trace = (name, attributes, cb) => {
		const options = typeof attributes === "object" ? { attributes } : {};
		return this._otel.$(`vitest.test.runner.${name}`, options, cb || attributes);
	};
	__setTraces(traces) {
		this._otel = traces;
	}
	static createTaskCollector = createTaskCollector;
	static getCurrentSuite = getCurrentSuite;
	static getCurrentTest = getCurrentTest;
	static createChainable = createChainable;
	static getSuiteHooks = getHooks;
	static getTestFn = getFn;
	static setSuiteHooks = getHooks;
	static setTestFn = getFn;
	static matchesTags = matchesTags;
	static createFileTask = createFileTask;
}
function clearModuleMocks(config) {
	const { clearMocks, mockReset, restoreMocks, unstubEnvs, unstubGlobals } = config;
	if (restoreMocks) vi.restoreAllMocks();
	if (mockReset) vi.resetAllMocks();
	if (clearMocks) vi.clearAllMocks();
	if (unstubEnvs) vi.unstubAllEnvs();
	if (unstubGlobals) vi.unstubAllGlobals();
}

const assertType = function assertType() {};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  EvaluatedModules: VitestEvaluatedModules,
  Snapshots: Snapshots,
  TestRunner: TestRunner,
  afterAll: afterAll,
  afterEach: afterEach,
  aroundAll: aroundAll,
  aroundEach: aroundEach,
  assert: assert,
  assertType: assertType,
  beforeAll: beforeAll,
  beforeEach: beforeEach,
  chai: chai,
  createExpect: createExpect,
  describe: describe,
  expect: globalExpect,
  expectTypeOf: expectTypeOf,
  inject: inject,
  it: it,
  onTestFailed: onTestFailed,
  onTestFinished: onTestFinished,
  recordArtifact: recordArtifact,
  should: should,
  suite: suite,
  test: test,
  vi: vi,
  vitest: vitest
});

export { Snapshots as S, TestRunner as T, assert as a, assertType as b, createExpect as c, inject as d, vitest as e, globalExpect as g, index as i, should as s, vi as v };
