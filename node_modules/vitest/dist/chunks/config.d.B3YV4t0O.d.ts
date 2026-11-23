/// <reference types="chai" />
import { Disposable } from 'vitest/optional-runtime-types.js';
import { Fn, FnOptions, BenchOptions as BenchOptions$1, TaskResultCompleted, TaskResultRuntimeInfo, TaskResultTimestampProviderInfo, Statistics } from 'tinybench';

/**
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
interface Colors {
	comment: {
		close: string;
		open: string;
	};
	content: {
		close: string;
		open: string;
	};
	prop: {
		close: string;
		open: string;
	};
	tag: {
		close: string;
		open: string;
	};
	value: {
		close: string;
		open: string;
	};
}
type Indent = (arg0: string) => string;
type Refs = Array<unknown>;
type Print = (arg0: unknown) => string;
/**
* compare function used when sorting object keys, `null` can be used to skip over sorting.
*/
type CompareKeys = ((a: string, b: string) => number) | null | undefined;
interface PrettyFormatOptions {
	/**
	* Call `toJSON` on objects before formatting them.
	* Ignored after the formatter has already called `toJSON` once for a value.
	* @default true
	*/
	callToJSON?: boolean;
	/**
	* Whether to escape special characters in regular expressions.
	* @default false
	*/
	escapeRegex?: boolean;
	/**
	* Whether to escape special characters in strings.
	* @default true
	*/
	escapeString?: boolean;
	/**
	* Whether to highlight syntax using terminal colors.
	* @default false
	*/
	highlight?: boolean;
	/**
	* Number of spaces to use for each level of indentation.
	* @default 2
	*/
	indent?: number;
	/**
	* Maximum depth to recurse into nested values.
	* @default Infinity
	*/
	maxDepth?: number;
	/**
	* Maximum number of items to print in arrays, sets, maps, and similar collections.
	* @default Infinity
	*/
	maxWidth?: number;
	/**
	* Approximate per-depth-level budget for output length.
	* When the accumulated output at any single depth level exceeds this value,
	* further nesting is collapsed. This is a heuristic safety valve, not a hard
	* limit — total output can reach up to roughly `maxDepth × maxOutputLength`.
	* @default 1_000_000
	*/
	maxOutputLength?: number;
	/**
	* Whether to minimize added whitespace, including indentation and line breaks.
	*
	* When `true`, pretty-format defaults `spacingInner` to `' '`, `spacingOuter` to `''`,
	* and ignores indentation. It also changes the default for `printBasicPrototype`
	* from `true` to `false`, although an explicit `printBasicPrototype` still wins.
	* Explicit `spacingInner` / `spacingOuter` overrides still apply.
	* @default false
	*/
	min?: boolean;
	/**
	* Whether to print `Object` / `Array` prefixes for plain objects and arrays.
	*
	* Defaults to `true`, unless `min` is `true`, in which case it defaults to `false`.
	* An explicit `printBasicPrototype` value always overrides the `min` default.
	*/
	printBasicPrototype?: boolean;
	/**
	* Whether to include the function name when formatting functions.
	* @default true
	*/
	printFunctionName?: boolean;
	/**
	* Whether to include shadow-root contents when formatting DOM nodes.
	* @default true
	*/
	printShadowRoot?: boolean;
	/**
	* Compare function used when sorting object keys. Set to `null` to disable sorting.
	*/
	compareKeys?: CompareKeys;
	/**
	* Plugins used to serialize application-specific data types.
	* @default []
	*/
	plugins?: Plugins;
	/**
	* Whitespace inserted after commas between items or entries.
	*
	* For example, in `{a: 1, b: 2}` or `[1, 2]`, this controls the gap after each comma:
	* `{a: 1,${spacingInner}b: 2}`
	* `[1,${spacingInner}2]`
	*
	* Defaults to `'\n'` in regular mode and `' '` when `min` is `true`.
	* Can be overridden independently of `min`.
	*/
	spacingInner?: string;
	/**
	* Whitespace inserted immediately inside collection/object delimiters.
	*
	* For example, this controls the space or newline right after the opening delimiter
	* and right before the closing delimiter:
	* `{${spacingOuter}a: 1${spacingOuter}}`
	* `[${spacingOuter}1${spacingOuter}]`
	*
	* Defaults to `'\n'` in regular mode and `''` when `min` is `true`.
	* Can be overridden independently of `min`.
	*/
	spacingOuter?: string;
	/**
	* Whether to print strings using single quotes instead of double quotes.
	*
	* For example:
	* `"hello"` when `false`
	* `'hello'` when `true`
	*
	* @default false
	*/
	singleQuote?: boolean;
	/**
	* Whether to always quote object property keys.
	*
	* For example:
	* `{"a": 1}` when `true`
	* `{a: 1}` when `false` and the key is a valid identifier
	* `{"my-key": 1}` still stays quoted because it is not a valid identifier
	*
	* @default true
	*/
	quoteKeys?: boolean;
}
type OptionsReceived = PrettyFormatOptions;
interface Config$1 {
	callToJSON: boolean;
	compareKeys: CompareKeys;
	colors: Colors;
	escapeRegex: boolean;
	escapeString: boolean;
	indent: string;
	maxDepth: number;
	maxWidth: number;
	min: boolean;
	plugins: Plugins;
	printBasicPrototype: boolean;
	printFunctionName: boolean;
	printShadowRoot: boolean;
	spacingInner: string;
	spacingOuter: string;
	singleQuote: boolean;
	quoteKeys: boolean;
	maxOutputLength: number;
}
type Printer = (val: unknown, config: Config$1, indentation: string, depth: number, refs: Refs, hasCalledToJSON?: boolean) => string;
type Test$1 = (arg0: any) => boolean;
interface NewPlugin {
	serialize: (val: any, config: Config$1, indentation: string, depth: number, refs: Refs, printer: Printer) => string;
	test: Test$1;
}
interface PluginOptions {
	edgeSpacing: string;
	min: boolean;
	spacing: string;
}
interface OldPlugin {
	print: (val: unknown, print: Print, indent: Indent, options: PluginOptions, colors: Colors) => string;
	test: Test$1;
}
type Plugin = NewPlugin | OldPlugin;
type Plugins = Array<Plugin>;

interface StringifyOptions extends PrettyFormatOptions {
	maxLength?: number;
	filterNode?: string | ((node: any) => boolean);
}
declare function stringify(object: unknown, maxDepth?: number, { maxLength, filterNode, ...options }?: StringifyOptions): string;
declare function format(args: unknown[], options?: InspectOptions): string;
interface InspectOptions extends StringifyOptions {
	truncate?: number;
	multiline?: boolean;
}
declare function inspect(obj: unknown, options?: InspectOptions): string;

type Awaitable<T> = T | PromiseLike<T>;
type Arrayable<T> = T | Array<T>;
interface ParsedStack {
	method: string;
	file: string;
	line: number;
	column: number;
}
interface SerializedError {
	message: string;
	stacks?: ParsedStack[];
	stack?: string;
	name?: string;
	cause?: SerializedError;
	[key: string]: unknown;
}
interface TestError extends SerializedError {
	cause?: TestError;
	diff?: string;
	actual?: string;
	expected?: string;
}

interface DomainMatchResult {
	pass: boolean;
	message?: string;
	/**
	* The captured value viewed through the template's lens.
	*
	* Where the template uses patterns (e.g. regexes) or omits details,
	* the resolved string adopts those patterns. Where the template doesn't
	* match, the resolved string uses literal captured values instead.
	*
	* Used for two purposes:
	* - **Diff display** (actual side): compared against `expected`
	*   so the diff highlights only genuine mismatches, not pattern-vs-literal noise.
	* - **Snapshot update** (`--update`): written as the new snapshot content,
	*   preserving user-edited patterns from matched regions while incorporating
	*   actual values for mismatched regions.
	*
	* When omitted, falls back to `render(capture(received))` (the raw rendered value).
	*/
	resolved?: string;
	/**
	* The stored template re-rendered as a string, representing what the user
	* originally wrote or last saved.
	*
	* Used as the expected side in diff display.
	*
	* When omitted, falls back to the raw snapshot string from the snap file
	* or inline snapshot.
	*/
	expected?: string;
}
interface DomainSnapshotAdapter<
	Captured = unknown,
	Expected = unknown
> {
	name: string;
	capture: (received: unknown) => Captured;
	render: (captured: Captured) => string;
	parseExpected: (input: string) => Expected;
	match: (captured: Captured, expected: Expected) => DomainMatchResult;
}

interface RawSnapshotInfo {
	file: string;
	readonly?: boolean;
	content?: string;
}
interface RawSnapshot extends RawSnapshotInfo {
	snapshot: string;
}

interface InlineSnapshot {
	snapshot: string;
	testId: string;
	file: string;
	line: number;
	column: number;
	assertionName?: string;
}

interface InlineSnapshotUpdate extends InlineSnapshot {
	type: "inline";
}
interface FileSnapshotUpdate {
	type: "file";
	file: string;
	key: string;
	snapshot: string;
}
interface RawSnapshotUpdate extends RawSnapshot {
	type: "raw";
}
type SnapshotUpdate = InlineSnapshotUpdate | FileSnapshotUpdate | RawSnapshotUpdate;

interface SnapshotEnvironment {
	getVersion: () => string;
	getHeader: () => string;
	resolvePath: (filepath: string) => Promise<string>;
	resolveRawPath: (testPath: string, rawPath: string) => Promise<string>;
	saveSnapshotFile: (filepath: string, snapshot: string) => Promise<void>;
	readSnapshotFile: (filepath: string) => Promise<string | null>;
	readSnapshotFileData?: (filepath: string) => Promise<Record<string, string> | null>;
	removeSnapshotFile: (filepath: string) => Promise<void>;
	processStackTrace?: (stack: ParsedStack) => ParsedStack;
}
interface SnapshotEnvironmentOptions {
	snapshotsDirName?: string;
}
declare class DefaultMap<
	K,
	V
> extends Map<K, V> {
	private defaultFn;
	constructor(defaultFn: (key: K) => V, entries?: Iterable<readonly [K, V]>);
	override get(key: K): V;
}
declare class CounterMap<K> extends DefaultMap<K, number> {
	constructor();
	_total: number | undefined;
	valueOf(): number;
	increment(key: K): void;
	total(): number;
}

interface SnapshotReturnOptions {
	actual: string;
	count: number;
	expected?: string;
	key: string;
	pass: boolean;
	update?: SnapshotUpdate;
}
interface SaveStatus {
	deleted: boolean;
	saved: boolean;
}
interface ExpectedSnapshot {
	key: string;
	count: number;
	data?: string;
	markAsChecked: () => void;
}
declare class SnapshotState {
	testFilePath: string;
	snapshotPath: string;
	private _counters;
	private _dirty;
	private _updateSnapshot;
	private _snapshotData;
	private _initialData;
	private _inlineSnapshots;
	private _inlineSnapshotStacks;
	private _testIdToKeys;
	private _rawSnapshots;
	private _rawSnapshotFiles;
	private _uncheckedKeys;
	private _snapshotFormat;
	private _environment;
	private _fileExists;
	expand: boolean;
	private _added;
	private _matched;
	private _unmatched;
	private _updated;
	get added(): CounterMap<string>;
	set added(value: number);
	get matched(): CounterMap<string>;
	set matched(value: number);
	get unmatched(): CounterMap<string>;
	set unmatched(value: number);
	get updated(): CounterMap<string>;
	set updated(value: number);
	private constructor();
	static create(testFilePath: string, options: SnapshotStateOptions): Promise<SnapshotState>;
	get snapshotUpdateState(): SnapshotUpdateState;
	get environment(): SnapshotEnvironment;
	markSnapshotsAsCheckedForTest(testName: string): void;
	clearTest(testId: string): void;
	protected _inferInlineSnapshotStack(stacks: ParsedStack[]): ParsedStack | null;
	private _addSnapshot;
	private _resolveKey;
	private _resolveInlineStack;
	private _reconcile;
	private _createUpdate;
	save(): Promise<SaveStatus>;
	getUncheckedCount(): number;
	getUncheckedKeys(): Array<string>;
	removeUncheckedKeys(): void;
	probeExpectedSnapshot(options: Pick<SnapshotMatchOptions, "testName" | "testId" | "isInline" | "inlineSnapshot">): ExpectedSnapshot;
	match({ testId, testName, received, key, inlineSnapshot, isInline, error, rawSnapshot, assertionName }: SnapshotMatchOptions): SnapshotReturnOptions;
	processDomainSnapshot({ testId, received, expectedSnapshot, matchResult, isInline, error, assertionName }: ProcessDomainSnapshotOptions): SnapshotReturnOptions;
	/**
	* The snapshot file, if the test file stores snapshots in it, and every asserted file snapshot.
	*/
	getSnapshotFiles(): string[];
	pack(): Promise<SnapshotResult>;
}

type SnapshotData = Record<string, string>;
type SnapshotUpdateState = "all" | "new" | "none";
type SnapshotSerializer = Plugin;
interface SnapshotStateOptions {
	updateSnapshot: SnapshotUpdateState;
	snapshotEnvironment: SnapshotEnvironment;
	expand?: boolean;
	snapshotFormat?: OptionsReceived;
	resolveSnapshotPath?: (path: string, extension: string, context?: any) => string;
}
interface SnapshotMatchOptions {
	testId: string;
	testName: string;
	received: unknown;
	key?: string;
	inlineSnapshot?: string;
	isInline: boolean;
	error?: Error;
	rawSnapshot?: RawSnapshotInfo;
	assertionName?: string;
}
interface ProcessDomainSnapshotOptions {
	testId: string;
	received: string;
	expectedSnapshot: ExpectedSnapshot;
	matchResult?: DomainMatchResult;
	isInline?: boolean;
	assertionName?: string;
	error?: Error;
}
interface SnapshotResult {
	filepath: string;
	added: number;
	fileDeleted: boolean;
	matched: number;
	unchecked: number;
	uncheckedKeys: Array<string>;
	unmatched: number;
	updated: number;
}
interface UncheckedSnapshot {
	filePath: string;
	keys: Array<string>;
}
interface SnapshotSummary {
	added: number;
	didUpdate: boolean;
	failure: boolean;
	filesAdded: number;
	filesRemoved: number;
	filesRemovedList: Array<string>;
	filesUnmatched: number;
	filesUpdated: number;
	matched: number;
	total: number;
	unchecked: number;
	uncheckedKeysByFile: Array<UncheckedSnapshot>;
	unmatched: number;
	updated: number;
}

/**
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

type DiffOptionsColor = (arg: string) => string;
interface DiffOptions {
	aAnnotation?: string;
	aColor?: DiffOptionsColor;
	aIndicator?: string;
	bAnnotation?: string;
	bColor?: DiffOptionsColor;
	bIndicator?: string;
	changeColor?: DiffOptionsColor;
	changeLineTrailingSpaceColor?: DiffOptionsColor;
	commonColor?: DiffOptionsColor;
	commonIndicator?: string;
	commonLineTrailingSpaceColor?: DiffOptionsColor;
	contextLines?: number;
	emptyFirstOrLastLinePlaceholder?: string;
	expand?: boolean;
	includeChangeCounts?: boolean;
	omitAnnotationLines?: boolean;
	patchColor?: DiffOptionsColor;
	printBasicPrototype?: boolean;
	maxDepth?: number;
	compareKeys?: CompareKeys;
	truncateThreshold?: number;
	truncateAnnotation?: string;
	truncateAnnotationColor?: DiffOptionsColor;
}
interface SerializedDiffOptions {
	aAnnotation?: string;
	aIndicator?: string;
	bAnnotation?: string;
	bIndicator?: string;
	commonIndicator?: string;
	contextLines?: number;
	emptyFirstOrLastLinePlaceholder?: string;
	expand?: boolean;
	includeChangeCounts?: boolean;
	omitAnnotationLines?: boolean;
	printBasicPrototype?: boolean;
	maxDepth?: number;
	truncateThreshold?: number;
	truncateAnnotation?: string;
}

/**
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

interface StringifiedMemory {
	expected?: string;
	actual?: string;
}
interface Memorize {
	(pointer: "expected" | "actual", stringifiedValue: string): string;
}
/**
* @param a Expected value
* @param b Received value
* @param options Diff options
* @returns {string | null} a string diff
*/
declare function diff(a: any, b: any, options?: DiffOptions, memorize?: Memorize): string | undefined;
declare function printDiffOrStringify(received: unknown, expected: unknown, options?: DiffOptions, memory?: StringifiedMemory): string | undefined;

type VoidVarArgsFunc = (...args: unknown[]) => void;
type SetImmediate = (callback: VoidVarArgsFunc, ...args: unknown[]) => NodeImmediate;
type SetTimeout = (callback: VoidVarArgsFunc, delay?: number, ...args: unknown[]) => TimerId;
type ClearTimeout = (id?: TimerId) => void;
type SetInterval = (callback: VoidVarArgsFunc, delay?: number, ...args: unknown[]) => TimerId;
type ClearInterval = (id?: TimerId) => void;
type QueueMicrotask = (callback: VoidVarArgsFunc) => void;
type TimeRemaining = () => number;
type IdleDeadline = {
    didTimeout: boolean;
    timeRemaining: TimeRemaining;
};
type RequestIdleCallbackCallback = (deadline: IdleDeadline) => any;
type RequestIdleCallback = (callback: RequestIdleCallbackCallback, options?: {
    timeout?: number;
}) => number;
type AnimationFrameCallback = (timestamp: number) => any;
type RequestAnimationFrame = (callback: AnimationFrameCallback) => TimerId;
type CancelAnimationFrame = (id: TimerId) => void;
type CancelIdleCallback = (id: TimerId) => void;
type ClearImmediate = (id: NodeImmediate) => void;
type TemporalTimelike = {
    epochMilliseconds: number;
};
type FakeMethod = "setTimeout" | "clearTimeout" | "setImmediate" | "clearImmediate" | "setInterval" | "clearInterval" | "Date" | "nextTick" | "hrtime" | "requestAnimationFrame" | "cancelAnimationFrame" | "requestIdleCallback" | "cancelIdleCallback" | "performance" | "queueMicrotask" | "Intl" | "Temporal";
type TimerId = number | NodeImmediate | Timer;
type GlobalObject = Record<string, any> & {
    setTimeout?: SetTimeout;
    clearTimeout?: ClearTimeout;
    setInterval?: SetInterval;
    clearInterval?: ClearInterval;
    setImmediate?: SetImmediate;
    clearImmediate?: ClearImmediate;
    queueMicrotask?: QueueMicrotask;
    requestAnimationFrame?: RequestAnimationFrame;
    cancelAnimationFrame?: CancelAnimationFrame;
    requestIdleCallback?: RequestIdleCallback;
    cancelIdleCallback?: CancelIdleCallback;
    process?: any;
    performance?: any;
    Performance?: any;
    Intl?: any;
    Temporal?: any;
    Promise?: typeof Promise;
    Date: typeof Date & {
        isFake?: boolean;
        toSource?: () => string;
        clock?: any;
    };
};
type TimerInitialProps = {
    func: VoidVarArgsFunc;
    args?: unknown[];
    type?: 'Timeout' | 'Interval' | 'Immediate' | 'AnimationFrame' | 'IdleCallback';
    delay?: number;
    callAt?: number;
    createdAt?: number;
    immediate?: boolean;
    id?: number;
    error?: Error;
    interval?: number;
    animation?: boolean;
    requestIdleCallback?: boolean;
    order?: number;
    heapIndex?: number;
};
type Config = {
    now?: number | Date | TemporalTimelike;
    toFake?: FakeMethod[];
    toNotFake?: FakeMethod[];
    loopLimit?: number;
    shouldAdvanceTime?: boolean;
    advanceTimeDelta?: number;
    shouldClearNativeTimers?: boolean;
    ignoreMissingTimers?: boolean;
    target?: GlobalObject;
};
type Timer = TimerInitialProps;
type NodeImmediateHasRef = () => boolean;
type NodeImmediateRef = () => NodeImmediate;
type NodeImmediateUnref = () => NodeImmediate;
type NodeImmediate = {
    hasRef: NodeImmediateHasRef;
    ref: NodeImmediateRef;
    unref: NodeImmediateUnref;
};

/**
* Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of https://github.com/jestjs/jest.
*/

interface FakeTimersConfig extends Config {
	/**
	* Mock timer APIs imported from `node:timers` and `node:timers/promises`.
	*
	* @default false
	*/
	fakeNodeBuiltins?: boolean;
}

interface AfterSuiteRunMeta {
	coverage?: unknown;
	testFiles: string[];
	environment: string;
	projectName?: string;
}
interface UserConsoleLog {
	content: string;
	origin?: string;
	browser?: boolean;
	type: "stdout" | "stderr";
	taskId?: string;
	time: number;
	size: number;
}
interface ModuleGraphModules {
	[id: string]: {
		external: boolean;
		imports: string[];
	};
}
interface ModuleGraphData {
	modules: ModuleGraphModules;
	roots: string[];
}
interface ProvidedContext {}
interface ResolveFunctionResult {
	id: string;
	file: string;
	url: string;
}
type ModuleType = "cjs" | "esm";
interface FetchCachedFileSystemResult {
	cached: true;
	tmp: string;
	id: string;
	file: string | null;
	url: string;
	invalidate: boolean;
	moduleType?: ModuleType;
}
type LabelColor = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";
interface AsyncLeak {
	filename: string;
	projectName: string;
	stack: string;
	type: string;
}

interface MockResultReturn<T> {
	type: "return";
	/**
	* The value that was returned from the function. If the function returned a Promise, then this will be the Promise, not its resolved value.
	*/
	value: T;
}
interface MockResultIncomplete {
	type: "incomplete";
	value: undefined;
}
interface MockResultThrow {
	type: "throw";
	/**
	* An error that was thrown during function execution.
	*/
	value: any;
}
interface MockSettledResultIncomplete {
	type: "incomplete";
	value: undefined;
}
interface MockSettledResultFulfilled<T> {
	type: "fulfilled";
	value: T;
}
interface MockSettledResultRejected {
	type: "rejected";
	value: any;
}
type MockResult<T> = MockResultReturn<T> | MockResultThrow | MockResultIncomplete;
type MockSettledResult<T> = MockSettledResultFulfilled<T> | MockSettledResultRejected | MockSettledResultIncomplete;
type MockParameters<T extends Procedure | Constructable> = T extends Constructable ? ConstructorParameters<T> : T extends Procedure ? Parameters<T> : never;
type MockReturnType<T extends Procedure | Constructable> = T extends Constructable ? InstanceType<T> : T extends Procedure ? ReturnType<T> : never;
type MockProcedureContext<T extends Procedure | Constructable> = T extends Constructable ? InstanceType<T> : ThisParameterType<T>;
interface MockContext<T extends Procedure | Constructable = Procedure> {
	/**
	* This is an array containing all arguments for each call. One item of the array is the arguments of that call.
	*
	* @see https://vitest.dev/api/mock#mock-calls
	* @example
	* const fn = vi.fn()
	*
	* fn('arg1', 'arg2')
	* fn('arg3')
	*
	* fn.mock.calls === [
	*   ['arg1', 'arg2'], // first call
	*   ['arg3'], // second call
	* ]
	*/
	calls: MockParameters<T>[];
	/**
	* An array with one value for each call: the object returned by `new`, or the context (`this`) of the call if the mock was called without `new`.
	* @see https://vitest.dev/api/mock#mock-instances
	*/
	instances: MockProcedureContext<T>[];
	/**
	* An array of `this` values that were used during each call to the mock function. If the mock was called with `new`, the value is the same as in `instances`.
	* @see https://vitest.dev/api/mock#mock-contexts
	*/
	contexts: MockProcedureContext<T>[];
	/**
	* The order of mock's execution. This returns an array of numbers which are shared between all defined mocks.
	*
	* @see https://vitest.dev/api/mock#mock-invocationcallorder
	* @example
	* const fn1 = vi.fn()
	* const fn2 = vi.fn()
	*
	* fn1()
	* fn2()
	* fn1()
	*
	* fn1.mock.invocationCallOrder === [1, 3]
	* fn2.mock.invocationCallOrder === [2]
	*/
	invocationCallOrder: number[];
	/**
	* This is an array containing all values that were `returned` from the function.
	*
	* The `value` property contains the returned value or thrown error. If the function returned a `Promise`, then `result` will always be `'return'` even if the promise was rejected.
	*
	* @see https://vitest.dev/api/mock#mock-results
	* @example
	* const fn = vi.fn()
	*   .mockReturnValueOnce('result')
	*   .mockImplementationOnce(() => { throw new Error('thrown error') })
	*
	* const result = fn()
	*
	* try {
	*   fn()
	* }
	* catch {}
	*
	* fn.mock.results === [
	*   {
	*     type: 'return',
	*     value: 'result',
	*   },
	*   {
	*     type: 'throw',
	*     value: Error,
	*   },
	* ]
	*/
	results: MockResult<MockReturnType<T>>[];
	/**
	* An array containing all values that were `resolved` or `rejected` from the function.
	*
	* Until the value is resolved or rejected, the type will be `incomplete`.
	*
	* @see https://vitest.dev/api/mock#mock-settledresults
	* @example
	* const fn = vi.fn().mockResolvedValueOnce('result')
	*
	* const result = fn()
	*
	* fn.mock.settledResults === [
	*   {
	*     type: 'incomplete',
	*     value: undefined,
	*   }
	* ]
	* fn.mock.results === [
	*   {
	*     type: 'return',
	*     value: Promise<'result'>,
	*   },
	* ]
	*
	* await result
	*
	* fn.mock.settledResults === [
	*   {
	*     type: 'fulfilled',
	*     value: 'result',
	*   },
	* ]
	*/
	settledResults: MockSettledResult<Awaited<MockReturnType<T>>>[];
	/**
	* This contains the arguments of the last call. If spy wasn't called, will return `undefined`.
	* @see https://vitest.dev/api/mock#mock-lastcall
	*/
	lastCall: MockParameters<T> | undefined;
}
type Procedure = (...args: any[]) => any;
type NormalizedProcedure<T extends Procedure | Constructable> = T extends Constructable ? {
	new (...args: ConstructorParameters<T>): InstanceType<T>;
} | {
	(this: InstanceType<T>, ...args: ConstructorParameters<T>): void;
} : T extends Procedure ? (...args: Parameters<T>) => ReturnType<T> : never;
type Methods<T> = keyof { [K in keyof T as T[K] extends Procedure ? K : never]: T[K] };
type Properties<T> = { [K in keyof T]: T[K] extends Procedure ? never : K }[keyof T] & (string | symbol);
type Classes<T> = { [K in keyof T]: T[K] extends new (...args: any[]) => any ? K : never }[keyof T] & (string | symbol);
interface MockInstance<T extends Procedure | Constructable = Procedure> extends Disposable {
	/**
	* Use it to return the name assigned to the mock with the `.mockName(name)` method. By default, it will return `vi.fn()`.
	* @see https://vitest.dev/api/mock#getmockname
	*/
	getMockName(): string;
	/**
	* Sets the internal mock name. This is useful for identifying the mock when an assertion fails.
	* @see https://vitest.dev/api/mock#mockname
	*/
	mockName(name: string): this;
	/**
	* Current context of the mock. It stores information about all invocation calls, instances, and results.
	*/
	mock: MockContext<T>;
	/**
	* Clears all information about every call. After calling it, all properties on `.mock` will return to their initial state. This method does not reset implementations. It is useful for cleaning up mocks between different assertions.
	*
	* To automatically call this method before each test, enable the [`clearMocks`](https://vitest.dev/config/clearmocks) setting in the configuration.
	* @see https://vitest.dev/api/mock#mockclear
	*/
	mockClear(): this;
	/**
	* Does what `mockClear` does and resets inner implementation to the original function. This also resets all "once" implementations.
	*
	* Note that resetting a mock from `vi.fn()` will set implementation to an empty function that returns `undefined`.
	* Resetting a mock from `vi.fn(impl)` will set implementation to `impl`. It is useful for completely resetting a mock to its default state.
	*
	* To automatically call this method before each test, enable the [`mockReset`](https://vitest.dev/config/mockreset) setting in the configuration.
	* @see https://vitest.dev/api/mock#mockreset
	*/
	mockReset(): this;
	/**
	* Does what `mockReset` does and restores original descriptors of spied-on objects.
	* @see https://vitest.dev/api/mock#mockrestore
	*/
	mockRestore(): void;
	/**
	* Returns current mock implementation if there is one. If an implementation was queued with `mockImplementationOnce`, it returns the first queued implementation instead.
	*
	* If mock was created with `vi.fn`, it will consider passed down method as a mock implementation.
	*
	* If mock was created with `vi.spyOn`, it will return `undefined` unless a custom implementation was provided.
	*/
	getMockImplementation(): NormalizedProcedure<T> | undefined;
	/**
	* Accepts a function to be used as the mock implementation. TypeScript expects the arguments and return type to match those of the original function.
	* @see https://vitest.dev/api/mock#mockimplementation
	* @example
	* const increment = vi.fn().mockImplementation(count => count + 1);
	* expect(increment(3)).toBe(4);
	*/
	mockImplementation(fn: NormalizedProcedure<T>): this;
	/**
	* Accepts a function to be used as the mock implementation. TypeScript expects the arguments and return type to match those of the original function. This method can be chained to produce different results for multiple function calls.
	*
	* When the mocked function runs out of implementations, it will invoke the default implementation set with `vi.fn(() => defaultValue)` or `.mockImplementation(() => defaultValue)` if they were called.
	* @see https://vitest.dev/api/mock#mockimplementationonce
	* @example
	* const fn = vi.fn(count => count).mockImplementationOnce(count => count + 1);
	* expect(fn(3)).toBe(4);
	* expect(fn(3)).toBe(3);
	*/
	mockImplementationOnce(fn: NormalizedProcedure<T>): this;
	/**
	* Overrides the original mock implementation temporarily while the callback is being executed.
	*
	* Note that this method takes precedence over the [`mockImplementationOnce`](https://vitest.dev/api/mock#mockimplementationonce).
	* @see https://vitest.dev/api/mock#withimplementation
	* @example
	* const myMockFn = vi.fn(() => 'original')
	*
	* myMockFn.withImplementation(() => 'temp', () => {
	*   myMockFn() // 'temp'
	* })
	*
	* myMockFn() // 'original'
	*/
	withImplementation(fn: NormalizedProcedure<T>, cb: () => Promise<unknown>): Promise<this>;
	withImplementation(fn: NormalizedProcedure<T>, cb: () => unknown): this;
	/**
	* Use this if you need to return the `this` context from the method without invoking the actual implementation.
	* @see https://vitest.dev/api/mock#mockreturnthis
	*/
	mockReturnThis(): this;
	/**
	* Accepts a value that will be returned whenever the mock function is called. TypeScript will only accept values that match the return type of the original function.
	* @see https://vitest.dev/api/mock#mockreturnvalue
	* @example
	* const mock = vi.fn()
	* mock.mockReturnValue(42)
	* mock() // 42
	* mock.mockReturnValue(43)
	* mock() // 43
	*/
	mockReturnValue(value: MockReturnType<T>): this;
	/**
	* Accepts a value that will be returned during the next function call. TypeScript will only accept values that match the return type of the original function. If chained, each consecutive call will return the specified value.
	*
	* When the mocked function runs out of implementations, it will invoke the default implementation set with `vi.fn(() => defaultValue)` or `.mockImplementation(() => defaultValue)` if they were called.
	* @example
	* const myMockFn = vi
	*   .fn()
	*   .mockReturnValue('default')
	*   .mockReturnValueOnce('first call')
	*   .mockReturnValueOnce('second call')
	*
	* // 'first call', 'second call', 'default'
	* console.log(myMockFn(), myMockFn(), myMockFn())
	*/
	mockReturnValueOnce(value: MockReturnType<T>): this;
	/**
	* Accepts a value that will be thrown whenever the mock function is called.
	* @see https://vitest.dev/api/mock#mockthrow
	* @example
	* const myMockFn = vi.fn().mockThrow(new Error('error'))
	* myMockFn() // throws 'error'
	*/
	mockThrow(value: unknown): this;
	/**
	* Accepts a value that will be thrown during the next function call. If chained, every consecutive call will throw the specified value.
	* @example
	* const myMockFn = vi
	*   .fn()
	*   .mockReturnValue('default')
	*   .mockThrowOnce(new Error('first call error'))
	*   .mockThrowOnce('second call error')
	*
	* expect(() => myMockFn()).toThrowError('first call error')
	* expect(() => myMockFn()).toThrowError('second call error')
	* expect(myMockFn()).toEqual('default')
	*/
	mockThrowOnce(value: unknown): this;
	/**
	* Accepts a value that will be resolved when the async function is called. TypeScript will only accept values that match the return type of the original function.
	* @example
	* const asyncMock = vi.fn().mockResolvedValue(42)
	* asyncMock() // Promise<42>
	*/
	mockResolvedValue(value: Awaited<MockReturnType<T>>): this;
	/**
	* Accepts a value that will be resolved during the next function call. TypeScript will only accept values that match the return type of the original function. If chained, each consecutive call will resolve the specified value.
	* @example
	* const myMockFn = vi
	*   .fn()
	*   .mockResolvedValue('default')
	*   .mockResolvedValueOnce('first call')
	*   .mockResolvedValueOnce('second call')
	*
	* // Promise<'first call'>, Promise<'second call'>, Promise<'default'>
	* console.log(myMockFn(), myMockFn(), myMockFn())
	*/
	mockResolvedValueOnce(value: Awaited<MockReturnType<T>>): this;
	/**
	* Accepts an error that will be rejected when async function is called.
	* @example
	* const asyncMock = vi.fn().mockRejectedValue(new Error('Async error'))
	* await asyncMock() // throws Error<'Async error'>
	*/
	mockRejectedValue(error: unknown): this;
	/**
	* Accepts a value that will be rejected during the next function call. If chained, each consecutive call will reject the specified value.
	* @example
	* const asyncMock = vi
	*   .fn()
	*   .mockResolvedValueOnce('first call')
	*   .mockRejectedValueOnce(new Error('Async error'))
	*
	* await asyncMock() // first call
	* await asyncMock() // throws Error<'Async error'>
	*/
	mockRejectedValueOnce(error: unknown): this;
}
type Mock<T extends Procedure | Constructable = Procedure> = MockInstance<T> & (T extends Constructable ? T extends Procedure ? {
	new (...args: ConstructorParameters<T>): InstanceType<T>;
	(...args: Parameters<T>): ReturnType<T>;
} : {
	new (...args: ConstructorParameters<T>): InstanceType<T>;
} : {
	new (...args: MockParameters<T>): MockReturnType<T>;
	(...args: MockParameters<T>): MockReturnType<T>;
}) & { [P in keyof T]: T[P] };
type PartialMaybePromise<T> = T extends Promise<Awaited<T>> ? Promise<Partial<Awaited<T>>> : Partial<T>;
type PartialResultFunction<T> = T extends Constructable ? {
	new (...args: ConstructorParameters<T>): InstanceType<T>;
} | {
	(this: InstanceType<T>, ...args: ConstructorParameters<T>): void;
} : T extends Procedure ? (...args: Parameters<T>) => PartialMaybePromise<ReturnType<T>> : T;
type PartialMock<T extends Procedure | Constructable = Procedure> = Mock<PartialResultFunction<T extends Mock ? NonNullable<ReturnType<T["getMockImplementation"]>> : T>>;
type DeepPartial<T> = T extends Procedure ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
type DeepPartialMaybePromise<T> = T extends Promise<Awaited<T>> ? Promise<DeepPartial<Awaited<T>>> : DeepPartial<T>;
type DeepPartialResultFunction<T> = T extends Constructable ? {
	new (...args: ConstructorParameters<T>): InstanceType<T>;
} | {
	(this: InstanceType<T>, ...args: ConstructorParameters<T>): void;
} : T extends Procedure ? (...args: Parameters<T>) => DeepPartialMaybePromise<ReturnType<T>> : T;
type DeepPartialMock<T extends Procedure | Constructable = Procedure> = Mock<DeepPartialResultFunction<T extends Mock ? NonNullable<ReturnType<T["getMockImplementation"]>> : T>>;
type MaybeMockedConstructor<T> = T extends Constructable ? Mock<T> : T;
type MockedFunction<T extends Procedure | Constructable> = Mock<T> & MockedObject<T>;
type PartiallyMockedFunction<T extends Procedure | Constructable> = PartialMock<T> & MockedObject<T>;
type MockedFunctionDeep<T extends Procedure | Constructable> = Mock<T> & MockedObjectDeep<T>;
type PartiallyMockedFunctionDeep<T extends Procedure | Constructable> = DeepPartialMock<T> & MockedObjectDeep<T>;
type MockedObject<T> = MaybeMockedConstructor<T> & { [K in Methods<T>]: T[K] extends Procedure ? MockedFunction<T[K]> : T[K] } & { [K in Properties<T>]: T[K] };
type MockedObjectDeep<T> = MaybeMockedConstructor<T> & { [K in Methods<T>]: T[K] extends Procedure ? MockedFunctionDeep<T[K]> : T[K] } & { [K in Properties<T>]: MaybeMockedDeep<T[K]> };
type MaybeMockedDeep<T> = T extends Procedure | Constructable ? MockedFunctionDeep<T> : T extends object ? MockedObjectDeep<T> : T;
type MaybePartiallyMockedDeep<T> = T extends Procedure | Constructable ? PartiallyMockedFunctionDeep<T> : T extends object ? MockedObjectDeep<T> : T;
type MaybeMocked<T> = T extends Procedure | Constructable ? MockedFunction<T> : T extends object ? MockedObject<T> : T;
type MaybePartiallyMocked<T> = T extends Procedure | Constructable ? PartiallyMockedFunction<T> : T extends object ? MockedObject<T> : T;
interface Constructable {
	new (...args: any[]): any;
}
type MockedClass<T extends Constructable> = MockInstance<T> & {
	prototype: T extends {
		prototype: any;
	} ? Mocked<T["prototype"]> : never;
} & T;
type Mocked<T> = { [P in keyof T]: T[P] extends Procedure ? MockInstance<T[P]> : T[P] extends Constructable ? MockedClass<T[P]> : T[P] } & T;
interface MockConfig {
	mockImplementation: Procedure | Constructable | undefined;
	mockOriginal: Procedure | Constructable | undefined;
	mockName: string;
	onceMockImplementations: Array<Procedure | Constructable>;
}
interface MockInstanceOption {
	originalImplementation?: Procedure | Constructable;
	mockImplementation?: Procedure | Constructable;
	resetToMockImplementation?: boolean;
	restore?: () => void;
	prototypeMembers?: (string | symbol)[];
	keepMembersImplementation?: boolean;
	prototypeState?: MockContext;
	prototypeConfig?: MockConfig;
	resetToMockName?: boolean;
	name?: string | symbol;
}

declare function isMockFunction(fn: any): fn is Mock;
declare function createMockInstance(options?: MockInstanceOption): Mock<Procedure | Constructable>;
declare function fn<T extends Procedure | Constructable = Procedure>(originalImplementation?: T): Mock<T>;
type SpyOnValue<
	T extends object,
	K extends keyof any
> = K extends keyof Required<T> ? Required<T>[K] : (T & Record<K, unknown>)[K];
type SpyOnMethod<
	T extends object,
	K extends keyof any
> = SpyOnValue<T, K> extends Constructable | Procedure ? SpyOnValue<T, K> : never;
type SpyOnMethodKey<
	T extends object,
	K extends keyof any
> = SpyOnValue<T, K> extends Constructable | Procedure ? K : never;
declare function spyOn<
	T extends object,
	S extends Properties<Required<T>>
>(object: T, key: S, accessor: "get"): Mock<() => T[S]>;
declare function spyOn<
	T extends object,
	G extends Properties<Required<T>>
>(object: T, key: G, accessor: "set"): Mock<(arg: T[G]) => void>;
declare function spyOn<
	T extends object,
	M extends Classes<Required<T>> | Methods<Required<T>>
>(object: T, key: M): Required<T>[M] extends Constructable | Procedure ? Mock<Required<T>[M]> : never;
declare function spyOn<
	T extends object,
	K extends keyof any
>(object: T, key: SpyOnMethodKey<T, K>): Mock<SpyOnMethod<T, K>>;
declare function restoreAllMocks(): void;
declare function clearAllMocks(): void;
declare function resetAllMocks(): void;

type _vitest_spy_Constructable = Constructable;
type _vitest_spy_MaybeMocked<T> = MaybeMocked<T>;
type _vitest_spy_MaybeMockedConstructor<T> = MaybeMockedConstructor<T>;
type _vitest_spy_MaybeMockedDeep<T> = MaybeMockedDeep<T>;
type _vitest_spy_MaybePartiallyMocked<T> = MaybePartiallyMocked<T>;
type _vitest_spy_MaybePartiallyMockedDeep<T> = MaybePartiallyMockedDeep<T>;
type _vitest_spy_Mock<T extends Procedure | Constructable = Procedure> = Mock<T>;
type _vitest_spy_MockContext<T extends Procedure | Constructable = Procedure> = MockContext<T>;
type _vitest_spy_MockInstance<T extends Procedure | Constructable = Procedure> = MockInstance<T>;
type _vitest_spy_MockInstanceOption = MockInstanceOption;
type _vitest_spy_MockParameters<T extends Procedure | Constructable> = MockParameters<T>;
type _vitest_spy_MockProcedureContext<T extends Procedure | Constructable> = MockProcedureContext<T>;
type _vitest_spy_MockResult<T> = MockResult<T>;
type _vitest_spy_MockResultIncomplete = MockResultIncomplete;
type _vitest_spy_MockResultReturn<T> = MockResultReturn<T>;
type _vitest_spy_MockResultThrow = MockResultThrow;
type _vitest_spy_MockReturnType<T extends Procedure | Constructable> = MockReturnType<T>;
type _vitest_spy_MockSettledResult<T> = MockSettledResult<T>;
type _vitest_spy_MockSettledResultFulfilled<T> = MockSettledResultFulfilled<T>;
type _vitest_spy_MockSettledResultIncomplete = MockSettledResultIncomplete;
type _vitest_spy_MockSettledResultRejected = MockSettledResultRejected;
type _vitest_spy_Mocked<T> = Mocked<T>;
type _vitest_spy_MockedClass<T extends Constructable> = MockedClass<T>;
type _vitest_spy_MockedFunction<T extends Procedure | Constructable> = MockedFunction<T>;
type _vitest_spy_MockedFunctionDeep<T extends Procedure | Constructable> = MockedFunctionDeep<T>;
type _vitest_spy_MockedObject<T> = MockedObject<T>;
type _vitest_spy_MockedObjectDeep<T> = MockedObjectDeep<T>;
type _vitest_spy_PartialMock<T extends Procedure | Constructable = Procedure> = PartialMock<T>;
type _vitest_spy_PartiallyMockedFunction<T extends Procedure | Constructable> = PartiallyMockedFunction<T>;
type _vitest_spy_PartiallyMockedFunctionDeep<T extends Procedure | Constructable> = PartiallyMockedFunctionDeep<T>;
type _vitest_spy_Procedure = Procedure;
declare const _vitest_spy_clearAllMocks: typeof clearAllMocks;
declare const _vitest_spy_createMockInstance: typeof createMockInstance;
declare const _vitest_spy_fn: typeof fn;
declare const _vitest_spy_isMockFunction: typeof isMockFunction;
declare const _vitest_spy_resetAllMocks: typeof resetAllMocks;
declare const _vitest_spy_restoreAllMocks: typeof restoreAllMocks;
declare const _vitest_spy_spyOn: typeof spyOn;
declare namespace _vitest_spy {
  export { _vitest_spy_clearAllMocks as clearAllMocks, _vitest_spy_createMockInstance as createMockInstance, _vitest_spy_fn as fn, _vitest_spy_isMockFunction as isMockFunction, _vitest_spy_resetAllMocks as resetAllMocks, _vitest_spy_restoreAllMocks as restoreAllMocks, _vitest_spy_spyOn as spyOn };
  export type { _vitest_spy_Constructable as Constructable, _vitest_spy_MaybeMocked as MaybeMocked, _vitest_spy_MaybeMockedConstructor as MaybeMockedConstructor, _vitest_spy_MaybeMockedDeep as MaybeMockedDeep, _vitest_spy_MaybePartiallyMocked as MaybePartiallyMocked, _vitest_spy_MaybePartiallyMockedDeep as MaybePartiallyMockedDeep, _vitest_spy_Mock as Mock, _vitest_spy_MockContext as MockContext, _vitest_spy_MockInstance as MockInstance, _vitest_spy_MockInstanceOption as MockInstanceOption, _vitest_spy_MockParameters as MockParameters, _vitest_spy_MockProcedureContext as MockProcedureContext, _vitest_spy_MockResult as MockResult, _vitest_spy_MockResultIncomplete as MockResultIncomplete, _vitest_spy_MockResultReturn as MockResultReturn, _vitest_spy_MockResultThrow as MockResultThrow, _vitest_spy_MockReturnType as MockReturnType, _vitest_spy_MockSettledResult as MockSettledResult, _vitest_spy_MockSettledResultFulfilled as MockSettledResultFulfilled, _vitest_spy_MockSettledResultIncomplete as MockSettledResultIncomplete, _vitest_spy_MockSettledResultRejected as MockSettledResultRejected, _vitest_spy_Mocked as Mocked, _vitest_spy_MockedClass as MockedClass, _vitest_spy_MockedFunction as MockedFunction, _vitest_spy_MockedFunctionDeep as MockedFunctionDeep, _vitest_spy_MockedObject as MockedObject, _vitest_spy_MockedObjectDeep as MockedObjectDeep, _vitest_spy_PartialMock as PartialMock, _vitest_spy_PartiallyMockedFunction as PartiallyMockedFunction, _vitest_spy_PartiallyMockedFunctionDeep as PartiallyMockedFunctionDeep, _vitest_spy_Procedure as Procedure };
}

interface Formatter {
    (input?: unknown): string;
    open: string;
    close: string;
}
declare function disableDefaultColors(): void;

interface AsymmetricMatcherInterface {
	asymmetricMatch: (other: unknown, customTesters?: Array<Tester>) => boolean;
	toString: () => string;
	getExpectedType?: () => string;
	toAsymmetricMatcher?: () => string;
}
declare abstract class AsymmetricMatcher<
	T,
	State extends MatcherState = MatcherState
> implements AsymmetricMatcherInterface {
	protected sample: T;
	protected inverse: boolean;
	$$typeof: symbol;
	constructor(sample: T, inverse?: boolean);
	protected getMatcherContext(expect?: Chai.ExpectStatic): State;
	abstract asymmetricMatch(other: unknown, customTesters?: Array<Tester>): boolean;
	abstract toString(): string;
	getExpectedType?(): string;
	toAsymmetricMatcher?(): string;
}

declare function matcherHint(matcherName: string, received?: string, expected?: string, options?: MatcherHintOptions): string;
declare function printReceived(object: unknown): string;
declare function printExpected(value: unknown): string;
declare function getMatcherUtils(): {
	EXPECTED_COLOR: Formatter;
	RECEIVED_COLOR: Formatter;
	INVERTED_COLOR: Formatter;
	BOLD_WEIGHT: Formatter;
	DIM_COLOR: Formatter;
	diff: typeof diff;
	matcherHint: typeof matcherHint;
	printReceived: typeof printReceived;
	printExpected: typeof printExpected;
	printDiffOrStringify: typeof printDiffOrStringify;
	printWithType: typeof printWithType;
};
declare function printWithType<T>(name: string, value: T, print: (value: T) => string): string;
type Tester = (this: TesterContext, a: any, b: any, customTesters: Array<Tester>) => boolean | undefined;
interface TesterContext {
	equals: (a: unknown, b: unknown, customTesters?: Array<Tester>, strictCheck?: boolean) => boolean;
}

interface MatcherHintOptions {
	comment?: string;
	expectedColor?: Formatter;
	isDirectExpectCall?: boolean;
	isNot?: boolean;
	promise?: string;
	receivedColor?: Formatter;
	secondArgument?: string;
	secondArgumentColor?: Formatter;
}
interface MatcherState {
	customTesters: Array<Tester>;
	assertionCalls: number;
	currentTestName?: string;
	/**
	* @deprecated exists only in types
	*/
	dontThrow?: () => void;
	/**
	* @deprecated exists only in types
	*/
	error?: Error;
	equals: (a: unknown, b: unknown, customTesters?: Array<Tester>, strictCheck?: boolean) => boolean;
	/**
	* @deprecated exists only in types
	*/
	expand?: boolean;
	expectedAssertionsNumber?: number | null;
	expectedAssertionsNumberErrorGen?: (() => Error) | null;
	isExpectingAssertions?: boolean;
	isExpectingAssertionsError?: Error | null;
	isNot: boolean;
	promise: string;
	/**
	* @deprecated exists only in types
	*/
	suppressedErrors: Array<Error>;
	testPath?: string;
	utils: ReturnType<typeof getMatcherUtils> & {
		diff: typeof diff;
		stringify: typeof stringify;
		iterableEquality: Tester;
		subsetEquality: Tester;
	};
	soft?: boolean;
	poll?: boolean;
	/**
	* The same assertion instance that chai plugins receive.
	* @experimental
	* @see {@link https://www.chaijs.com/guide/plugins/} Core Plugin Concepts
	*/
	readonly assertion: Assertion;
}
interface SyncExpectationResult {
	pass: boolean;
	message: () => string;
	actual?: any;
	expected?: any;
	meta?: object;
}
type AsyncExpectationResult = Promise<SyncExpectationResult>;
type ExpectationResult = SyncExpectationResult | AsyncExpectationResult;
interface RawMatcherFn<
	T extends MatcherState = MatcherState,
	E extends Array<any> = Array<any>
> {
	(this: T, received: any, ...expected: E): ExpectationResult;
}
interface Matchers<
	R extends void | Promise<void> = void | Promise<void>,
	T = unknown
> {}
type MatchersObject<T extends MatcherState = MatcherState> = Record<string, RawMatcherFn<T>> & ThisType<T> & { [K in keyof Matchers]?: RawMatcherFn<T, Parameters<Matchers[K]>> };
interface ExpectStatic extends Chai.ExpectStatic, Matchers<any>, AsymmetricMatchersContaining {
	<T>(actual: T, message?: string): Assertion<void, T>;
	extend: (expects: MatchersObject) => void;
	anything: () => any;
	any: (constructor: unknown) => any;
	getState: () => MatcherState;
	setState: (state: Partial<MatcherState>) => void;
	not: AsymmetricMatchersContaining;
}
interface CustomMatcher<R = any> {
	/**
	* Checks that a value satisfies a custom matcher function.
	*
	* @param matcher - A function returning a boolean based on the custom condition
	* @param message - Optional custom error message on failure
	*
	* @example
	* expect(age).toSatisfy(val => val >= 18, 'Age must be at least 18');
	* expect(age).toEqual(expect.toSatisfy(val => val >= 18, 'Age must be at least 18'));
	*/
	toSatisfy: (matcher: (value: any) => boolean, message?: string) => R;
	/**
	* Matches if the received value is one of the values in the expected array or set.
	*
	* @example
	* expect(1).toBeOneOf([1, 2, 3])
	* expect('foo').toBeOneOf([expect.any(String)])
	* expect({ a: 1 }).toEqual({ a: expect.toBeOneOf(['1', '2', '3']) })
	*/
	toBeOneOf: <T>(sample: ReadonlyArray<T> | ReadonlySet<T>) => R;
}
interface AsymmetricMatchersContaining extends Matchers<any>, CustomMatcher {
	/**
	* Matches if the received string contains the expected substring.
	*
	* @example
	* expect('I have an apple').toEqual(expect.stringContaining('apple'));
	* expect({ a: 'test string' }).toEqual({ a: expect.stringContaining('test') });
	*/
	stringContaining: (expected: string) => any;
	/**
	* Matches if the received object contains all properties of the expected object.
	*
	* @example
	* expect({ a: '1', b: 2 }).toEqual(expect.objectContaining({ a: '1' }))
	*/
	objectContaining: <T = any>(expected: DeeplyAllowMatchers<T>) => any;
	/**
	* Matches if the received array contains all elements in the expected array.
	*
	* @example
	* expect(['a', 'b', 'c']).toEqual(expect.arrayContaining(['b', 'a']));
	*/
	arrayContaining: <T = unknown>(expected: Array<DeeplyAllowMatchers<T>>) => any;
	/**
	* Matches if the received string or regex matches the expected pattern.
	*
	* @example
	* expect('hello world').toEqual(expect.stringMatching(/^hello/));
	* expect('hello world').toEqual(expect.stringMatching('hello'));
	*/
	stringMatching: (expected: string | RegExp) => any;
	/**
	* Matches if the received number is within a certain precision of the expected number.
	*
	* @example
	* expect(10.45).toEqual(expect.closeTo(10.5, 1));
	* expect(5.11).toEqual(expect.closeTo(5.12)); // with default precision
	*/
	closeTo: (expected: number, precision?: number) => any;
	/**
	* Matches if the received value validates against a Standard Schema.
	*
	* @param schema - A Standard Schema V1 compatible schema object
	*
	* @example
	* expect(user).toEqual(expect.schemaMatching(z.object({ name: z.string() })))
	* expect(['hello', 'world']).toEqual([expect.schemaMatching(z.string()), expect.schemaMatching(z.string())])
	*/
	schemaMatching: (schema: unknown) => any;
}
type WithAsymmetricMatcher<T> = T | AsymmetricMatcher<unknown>;
type DeeplyAllowMatchers<T> = T extends Array<infer Element> ? WithAsymmetricMatcher<T> | DeeplyAllowMatchers<Element>[] : T extends object ? WithAsymmetricMatcher<T> | { [K in keyof T]: DeeplyAllowMatchers<T[K]> } : WithAsymmetricMatcher<T>;
interface JestAssertion<
	R extends void | Promise<void>,
	T = unknown
> extends CustomMatcher<R> {
	/**
	* Used when you want to check that two objects have the same value.
	* This matcher recursively checks the equality of all fields, rather than checking for object identity.
	*
	* @example
	* expect(user).toEqual({ name: 'Alice', age: 30 });
	*/
	toEqual: <E>(expected: E) => R;
	/**
	* Use to test that objects have the same types as well as structure.
	*
	* @example
	* expect(user).toStrictEqual({ name: 'Alice', age: 30 });
	*/
	toStrictEqual: <E>(expected: E) => R;
	/**
	* Checks that a value is what you expect. It calls `Object.is` to compare values.
	* Don't use `toBe` with floating-point numbers.
	*
	* @example
	* expect(result).toBe(42);
	* expect(status).toBe(true);
	*/
	toBe: <E>(expected: E) => R;
	/**
	* Check that a string matches a regular expression.
	*
	* @example
	* expect(message).toMatch(/hello/);
	* expect(greeting).toMatch('world');
	*/
	toMatch: (expected: string | RegExp) => R;
	/**
	* Used to check that a JavaScript object matches a subset of the properties of an object
	*
	* @example
	* expect(user).toMatchObject({
	*   name: 'Alice',
	*   address: { city: 'Wonderland' }
	* });
	*/
	toMatchObject: <E extends object | any[]>(expected: E) => R;
	/**
	* Used when you want to check that an item is in a list.
	* For testing the items in the list, this uses `===`, a strict equality check.
	*
	* @example
	* expect(items).toContain('apple');
	* expect(numbers).toContain(5);
	*/
	toContain: <E>(item: E) => R;
	/**
	* Used when you want to check that an item is in a list.
	* For testing the items in the list, this matcher recursively checks the
	* equality of all fields, rather than checking for object identity.
	*
	* @example
	* expect(items).toContainEqual({ name: 'apple', quantity: 1 });
	*/
	toContainEqual: <E>(item: E) => R;
	/**
	* Use when you don't care what a value is, you just want to ensure a value
	* is true in a boolean context. In JavaScript, there are six falsy values:
	* `false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is truthy.
	*
	* @example
	* expect(user.isActive).toBeTruthy();
	*/
	toBeTruthy: () => R;
	/**
	* When you don't care what a value is, you just want to
	* ensure a value is false in a boolean context.
	*
	* @example
	* expect(user.isActive).toBeFalsy();
	*/
	toBeFalsy: () => R;
	/**
	* For comparing floating point numbers.
	*
	* @example
	* expect(score).toBeGreaterThan(10);
	*/
	toBeGreaterThan: (num: number | bigint) => R;
	/**
	* For comparing floating point numbers.
	*
	* @example
	* expect(score).toBeGreaterThanOrEqual(10);
	*/
	toBeGreaterThanOrEqual: (num: number | bigint) => R;
	/**
	* For comparing floating point numbers.
	*
	* @example
	* expect(score).toBeLessThan(10);
	*/
	toBeLessThan: (num: number | bigint) => R;
	/**
	* For comparing floating point numbers.
	*
	* @example
	* expect(score).toBeLessThanOrEqual(10);
	*/
	toBeLessThanOrEqual: (num: number | bigint) => R;
	/**
	* Used to check that a variable is NaN.
	*
	* @example
	* expect(value).toBeNaN();
	*/
	toBeNaN: () => R;
	/**
	* Used to check that a variable is undefined.
	*
	* @example
	* expect(value).toBeUndefined();
	*/
	toBeUndefined: () => R;
	/**
	* This is the same as `.toBe(null)` but the error messages are a bit nicer.
	* So use `.toBeNull()` when you want to check that something is null.
	*
	* @example
	* expect(value).toBeNull();
	*/
	toBeNull: () => R;
	/**
	* Used to check that a variable is nullable (null or undefined).
	*
	* @example
	* expect(value).toBeNullable();
	*/
	toBeNullable: () => R;
	/**
	* Ensure that a variable is not undefined.
	*
	* @example
	* expect(value).toBeDefined();
	*/
	toBeDefined: () => R;
	/**
	* Ensure that an object is an instance of a class.
	* This matcher uses `instanceof` underneath.
	*
	* @example
	* expect(new Date()).toBeInstanceOf(Date);
	*/
	toBeInstanceOf: <E>(expected: E) => R;
	/**
	* Used to check that an object has a `.length` property
	* and it is set to a certain numeric value.
	*
	* @example
	* expect([1, 2, 3]).toHaveLength(3);
	* expect('hello').toHaveLength(5);
	*/
	toHaveLength: (length: number) => R;
	/**
	* Use to check if a property at the specified path exists on an object.
	* For checking deeply nested properties, you may use dot notation or an array containing
	* the path segments for deep references.
	*
	* Optionally, you can provide a value to check if it matches the value present at the path
	* on the target object. This matcher uses 'deep equality' (like `toEqual()`) and recursively checks
	* the equality of all fields.
	*
	* @example
	* expect(user).toHaveProperty('address.city', 'New York');
	* expect(config).toHaveProperty(['settings', 'theme'], 'dark');
	*/
	toHaveProperty: <E>(property: string | (string | number)[], value?: E) => R;
	/**
	* Using exact equality with floating point numbers is a bad idea.
	* Rounding means that intuitive things fail.
	* The default for `numDigits` is 2.
	*
	* @example
	* expect(price).toBeCloseTo(9.99, 2);
	*/
	toBeCloseTo: (number: number, numDigits?: number) => R;
	/**
	* Ensures that a mock function is called an exact number of times.
	*
	* Also under the alias `expect.toBeCalledTimes`.
	*
	* @example
	* expect(mockFunc).toHaveBeenCalledTimes(2);
	*/
	toHaveBeenCalledTimes: (times: number) => R;
	/**
	* Ensures that a mock function is called an exact number of times.
	*
	* Alias for `expect.toHaveBeenCalledTimes`.
	*
	* @example
	* expect(mockFunc).toBeCalledTimes(2);
	* @deprecated Use `toHaveBeenCalledTimes` instead
	*/
	toBeCalledTimes: (times: number) => R;
	/**
	* Ensures that a mock function is called.
	*
	* Also under the alias `expect.toBeCalled`.
	*
	* @example
	* expect(mockFunc).toHaveBeenCalled();
	*/
	toHaveBeenCalled: () => R;
	/**
	* Ensures that a mock function is called.
	*
	* Alias for `expect.toHaveBeenCalled`.
	*
	* @example
	* expect(mockFunc).toBeCalled();
	* @deprecated Use `toHaveBeenCalled` instead
	*/
	toBeCalled: () => R;
	/**
	* Ensure that a mock function is called with specific arguments.
	*
	* Also under the alias `expect.toBeCalledWith`.
	*
	* @example
	* expect(mockFunc).toHaveBeenCalledWith('arg1', 42);
	*/
	toHaveBeenCalledWith: <E extends any[]>(...args: E) => R;
	/**
	* Ensure that a mock function is called with specific arguments.
	*
	* Alias for `expect.toHaveBeenCalledWith`.
	*
	* @example
	* expect(mockFunc).toBeCalledWith('arg1', 42);
	* @deprecated Use `toHaveBeenCalledWith` instead
	*/
	toBeCalledWith: <E extends any[]>(...args: E) => R;
	/**
	* Ensure that a mock function is called with specific arguments on an Nth call.
	*
	* Also under the alias `expect.nthCalledWith`.
	*
	* @example
	* expect(mockFunc).toHaveBeenNthCalledWith(2, 'secondArg');
	*/
	toHaveBeenNthCalledWith: <E extends any[]>(n: number, ...args: E) => R;
	/**
	* If you have a mock function, you can use `.toHaveBeenLastCalledWith`
	* to test what arguments it was last called with.
	*
	* Also under the alias `expect.lastCalledWith`.
	*
	* @example
	* expect(mockFunc).toHaveBeenLastCalledWith('lastArg');
	*/
	toHaveBeenLastCalledWith: <E extends any[]>(...args: E) => R;
	/**
	* Used to test that a function throws when it is called.
	*
	* Also under the alias `expect.toThrowError`.
	*
	* @example
	* expect(() => functionWithError()).toThrow('Error message');
	* expect(() => parseJSON('invalid')).toThrow(SyntaxError);
	* expect(() => { throw 42 }).toThrow(42);
	*/
	toThrow: (expected?: any) => R;
	/**
	* Used to test that a function throws when it is called.
	*
	* Alias for `expect.toThrow`.
	*
	* @example
	* expect(() => functionWithError()).toThrowError('Error message');
	* expect(() => parseJSON('invalid')).toThrowError(SyntaxError);
	* expect(() => { throw 42 }).toThrowError(42);
	* @deprecated Use `toThrow` instead
	*/
	toThrowError: (expected?: any) => R;
	/**
	* Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time
	*
	* Alias for `expect.toHaveReturned`.
	*
	* @example
	* expect(mockFunc).toReturn();
	* @deprecated Use `toHaveReturned` instead
	*/
	toReturn: () => R;
	/**
	* Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time
	*
	* Also under the alias `expect.toReturn`.
	*
	* @example
	* expect(mockFunc).toHaveReturned();
	*/
	toHaveReturned: () => R;
	/**
	* Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
	* Any calls to the mock function that throw an error are not counted toward the number of times the function returned.
	*
	* Alias for `expect.toHaveReturnedTimes`.
	*
	* @example
	* expect(mockFunc).toReturnTimes(3);
	* @deprecated Use `toHaveReturnedTimes` instead
	*/
	toReturnTimes: (times: number) => R;
	/**
	* Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
	* Any calls to the mock function that throw an error are not counted toward the number of times the function returned.
	*
	* Also under the alias `expect.toReturnTimes`.
	*
	* @example
	* expect(mockFunc).toHaveReturnedTimes(3);
	*/
	toHaveReturnedTimes: (times: number) => R;
	/**
	* Use to ensure that a mock function returned a specific value.
	*
	* Alias for `expect.toHaveReturnedWith`.
	*
	* @example
	* expect(mockFunc).toReturnWith('returnValue');
	* @deprecated Use `toHaveReturnedWith` instead
	*/
	toReturnWith: <E>(value: E) => R;
	/**
	* Use to ensure that a mock function returned a specific value.
	*
	* Also under the alias `expect.toReturnWith`.
	*
	* @example
	* expect(mockFunc).toHaveReturnedWith('returnValue');
	*/
	toHaveReturnedWith: <E>(value: E) => R;
	/**
	* Use to test the specific value that a mock function last returned.
	* If the last call to the mock function threw an error, then this matcher will fail
	* no matter what value you provided as the expected return value.
	*
	* Also under the alias `expect.lastReturnedWith`.
	*
	* @example
	* expect(mockFunc).toHaveLastReturnedWith('lastValue');
	*/
	toHaveLastReturnedWith: <E>(value: E) => R;
	/**
	* Use to test the specific value that a mock function returned for the nth call.
	* If the nth call to the mock function threw an error, then this matcher will fail
	* no matter what value you provided as the expected return value.
	*
	* Also under the alias `expect.nthReturnedWith`.
	*
	* @example
	* expect(mockFunc).toHaveNthReturnedWith(2, 'nthValue');
	*/
	toHaveNthReturnedWith: <E>(nthCall: number, value: E) => R;
}
type VitestAssertion<
	A,
	R extends void | Promise<void>,
	T = unknown
> = { [K in keyof A]: A[K] extends Chai.Assertion ? Assertion<R, T> : A[K] extends (...args: any[]) => any ? R extends Promise<void> ? PromisifyFunction<A[K]> : A[K] : VitestAssertion<A[K], R, T> } & ((type: string, message?: string) => Assertion<R, T>);
type Promisify<O> = { [K in keyof O]: PromisifyFunction<O[K]> };
type PromisifyFunction<T> = T extends (...args: infer A) => infer R ? Promisify<T> & ((...args: A) => R extends Promise<any> ? R : Promise<R>) : T;
type PromisifyAssertion<T> = Assertion<Promise<void>, Awaited<T>>;
interface Assertion<
	R extends void | Promise<void> = void,
	T = unknown
> extends VitestAssertion<Chai.Assertion, R, T>, JestAssertion<R, T>, ChaiMockAssertion<R, T>, Matchers<R, T> {
	/**
	* Ensures a value is of a specific type.
	*
	* @example
	* expect(value).toBeTypeOf('string');
	* expect(number).toBeTypeOf('number');
	*/
	toBeTypeOf: (expected: "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined") => R;
	/**
	* Asserts that a mock function was called exactly once.
	*
	* @example
	* expect(mockFunc).toHaveBeenCalledOnce();
	*/
	toHaveBeenCalledOnce: () => R;
	/**
	* Ensure that a mock function is called with specific arguments and called
	* exactly once.
	*
	* @example
	* expect(mockFunc).toHaveBeenCalledExactlyOnceWith('arg1', 42);
	*/
	toHaveBeenCalledExactlyOnceWith: <E extends any[]>(...args: E) => R;
	/**
	* This assertion checks if a `Mock` was called before another `Mock`.
	* @param mock - A mock function created by `vi.spyOn` or `vi.fn`
	* @param failIfNoFirstInvocation - Fail if the first mock was never called
	* @example
	* const mock1 = vi.fn()
	* const mock2 = vi.fn()
	*
	* mock1()
	* mock2()
	* mock1()
	*
	* expect(mock1).toHaveBeenCalledBefore(mock2)
	*/
	toHaveBeenCalledBefore: (mock: MockInstance, failIfNoFirstInvocation?: boolean) => R;
	/**
	* This assertion checks if a `Mock` was called after another `Mock`.
	* @param mock - A mock function created by `vi.spyOn` or `vi.fn`
	* @param failIfNoFirstInvocation - Fail if the first mock was never called
	* @example
	* const mock1 = vi.fn()
	* const mock2 = vi.fn()
	*
	* mock2()
	* mock1()
	* mock2()
	*
	* expect(mock1).toHaveBeenCalledAfter(mock2)
	*/
	toHaveBeenCalledAfter: (mock: MockInstance, failIfNoFirstInvocation?: boolean) => R;
	/**
	* Checks that at least one of the mock function's calls has resolved.
	*
	* @example
	* expect(mockAsyncFunc).toHaveResolved();
	*/
	toHaveResolved: () => R;
	/**
	* Checks that at least one of the mock function's calls has resolved to a specific value.
	*
	* @example
	* expect(mockAsyncFunc).toHaveResolvedWith('success');
	*/
	toHaveResolvedWith: <E>(value: E) => R;
	/**
	* Ensures a promise resolves a specific number of times.
	*
	* @example
	* expect(mockAsyncFunc).toHaveResolvedTimes(3);
	*/
	toHaveResolvedTimes: (times: number) => R;
	/**
	* Asserts that the last resolved value of a promise matches an expected value.
	*
	* @example
	* await expect(mockAsyncFunc).toHaveLastResolvedWith('finalResult');
	*/
	toHaveLastResolvedWith: <E>(value: E) => R;
	/**
	* Ensures a specific value was returned by a promise on the nth resolution.
	*
	* @example
	* await expect(mockAsyncFunc).toHaveNthResolvedWith(2, 'secondResult');
	*/
	toHaveNthResolvedWith: <E>(nthCall: number, value: E) => R;
	/**
	* Verifies that a promise resolves.
	*
	* @example
	* await expect(someAsyncFunc).resolves.toBe(42);
	*/
	resolves: PromisifyAssertion<T>;
	/**
	* Verifies that a promise rejects.
	*
	* @example
	* await expect(someAsyncFunc).rejects.toThrow('error');
	*/
	rejects: PromisifyAssertion<unknown>;
}
/**
* Chai-style assertions for spy/mock testing.
* These provide sinon-chai compatible assertion names that delegate to Jest-style implementations.
*/
interface ChaiMockAssertion<
	R extends void | Promise<void>,
	T = unknown
> {
	/**
	* Checks that a spy was called at least once.
	* Chai-style equivalent of `toHaveBeenCalled`.
	*
	* @example
	* expect(spy).to.have.been.called
	*/
	readonly called: Assertion<R, T>;
	/**
	* Checks that a spy was called a specific number of times.
	* Chai-style equivalent of `toHaveBeenCalledTimes`.
	*
	* @example
	* expect(spy).to.have.callCount(3)
	*/
	callCount: (count: number) => R;
	/**
	* Checks that a spy was called with specific arguments at least once.
	* Chai-style equivalent of `toHaveBeenCalledWith`.
	*
	* @example
	* expect(spy).to.have.been.calledWith('arg1', 'arg2')
	*/
	calledWith: <E extends any[]>(...args: E) => R;
	/**
	* Checks that a spy was called exactly once.
	* Chai-style equivalent of `toHaveBeenCalledOnce`.
	*
	* @example
	* expect(spy).to.have.been.calledOnce
	*/
	readonly calledOnce: Assertion<R, T>;
	/**
	* Checks that a spy was called exactly once with specific arguments.
	* Chai-style equivalent of `toHaveBeenCalledExactlyOnceWith`.
	*
	* @example
	* expect(spy).to.have.been.calledOnceWith('arg1', 'arg2')
	*/
	calledOnceWith: <E extends any[]>(...args: E) => R;
	/**
	* Checks that the last call to a spy was made with specific arguments.
	* Chai-style equivalent of `toHaveBeenLastCalledWith`.
	*
	* @example
	* expect(spy).to.have.been.lastCalledWith('arg1', 'arg2')
	*/
	lastCalledWith: <E extends any[]>(...args: E) => R;
	/**
	* Checks that the nth call to a spy was made with specific arguments.
	* Chai-style equivalent of `toHaveBeenNthCalledWith`.
	*
	* @example
	* expect(spy).to.have.been.nthCalledWith(2, 'arg1', 'arg2')
	*/
	nthCalledWith: <E extends any[]>(n: number, ...args: E) => R;
	/**
	* Checks that a spy returned a specific value at least once.
	* Chai-style equivalent of `toHaveReturnedWith`.
	*
	* @example
	* expect(spy).to.have.returned('value')
	*/
	returned: <E>(value: E) => R;
	/**
	* Checks that a spy returned a specific value at least once.
	* Chai-style equivalent of `toHaveReturnedWith`.
	*
	* @example
	* expect(spy).to.have.returnedWith('value')
	*/
	returnedWith: <E>(value: E) => R;
	/**
	* Checks that a spy returned successfully a specific number of times.
	* Chai-style equivalent of `toHaveReturnedTimes`.
	*
	* @example
	* expect(spy).to.have.returnedTimes(3)
	*/
	returnedTimes: (count: number) => R;
	/**
	* Checks that the last return value of a spy matches the expected value.
	* Chai-style equivalent of `toHaveLastReturnedWith`.
	*
	* @example
	* expect(spy).to.have.lastReturnedWith('value')
	*/
	lastReturnedWith: <E>(value: E) => R;
	/**
	* Checks that the nth return value of a spy matches the expected value.
	* Chai-style equivalent of `toHaveNthReturnedWith`.
	*
	* @example
	* expect(spy).to.have.nthReturnedWith(2, 'value')
	*/
	nthReturnedWith: <E>(n: number, value: E) => R;
	/**
	* Checks that a spy was called before another spy.
	* Chai-style equivalent of `toHaveBeenCalledBefore`.
	*
	* @example
	* expect(spy1).to.have.been.calledBefore(spy2)
	*/
	calledBefore: (mock: MockInstance, failIfNoFirstInvocation?: boolean) => R;
	/**
	* Checks that a spy was called after another spy.
	* Chai-style equivalent of `toHaveBeenCalledAfter`.
	*
	* @example
	* expect(spy1).to.have.been.calledAfter(spy2)
	*/
	calledAfter: (mock: MockInstance, failIfNoFirstInvocation?: boolean) => R;
	/**
	* Checks that a spy was called exactly twice.
	* Chai-style equivalent of `toHaveBeenCalledTimes(2)`.
	*
	* @example
	* expect(spy).to.have.been.calledTwice
	*/
	readonly calledTwice: Assertion<R, T>;
	/**
	* Checks that a spy was called exactly three times.
	* Chai-style equivalent of `toHaveBeenCalledTimes(3)`.
	*
	* @example
	* expect(spy).to.have.been.calledThrice
	*/
	readonly calledThrice: Assertion<R, T>;
}

type ExtractBenchNames<T extends BenchRegistration<any>[]> = Exclude<{ [K in keyof T]: T[K] extends BenchRegistration<infer N> ? N : never }[number], never>;
/**
* A benchmarked function. Vitest-owned and engine-agnostic.
*/
type BenchFn = Fn;
/**
* Per-benchmark initialization options passed to `bench(name, options, fn)`.
*/
type BenchOptions = FnOptions;
/**
* Engine-neutral run options forwarded to a {@link BenchmarkProvider}. These
* come from the optional trailing options argument of `bench.compare()` and
* `registration.run()`.
*/
type BenchRunOptions = BenchOptions$1;
/**
* The result of a single benchmark, produced by a {@link BenchmarkProvider}.
* Structurally compatible with tinybench's task statistics so it flows
* unchanged into the reporter, `bench.from()` baselines and comparison tables.
* The `name` matches the corresponding {@link BenchRegistration}.
*/
interface BenchResult extends TaskResultCompleted, TaskResultRuntimeInfo, TaskResultTimestampProviderInfo {
	/** The registered benchmark name this result belongs to. */
	name: string;
}
/**
* A benchmark defined by `bench()` (or `bench.from()`), as seen by a
* {@link BenchmarkProvider}. `fn`/`fnOpts` are absent for `bench.from()`
* registrations, which are resolved from a stored baseline instead of run.
*/
interface BenchRegistrationInput {
	name: string;
	fn: BenchFn;
	fnOpts?: BenchOptions;
}
/**
* The set of benchmarks registered by a single test, handed to
* {@link BenchmarkProvider.run}.
*/
interface BenchmarkGroup {
	/** The test that registered these benchmarks. */
	test: Test;
	/** The resolved benchmark configuration for the current project. */
	config: SerializedConfig["benchmark"];
	/** The runnable registrations, in registration order. */
	registrations: BenchRegistrationInput[];
	/** Engine-neutral run options, when provided by the caller. */
	options?: BenchRunOptions;
}
/**
* Executes the benchmarks of a single test and returns their results.
*
* A custom provider module must default-export an object of this shape.
*
* The returned array is the sole source of results: it's what `bench().run()`
* resolves to and what the reporter serializes. Results are matched to
* registrations by `name`; return one {@link BenchResult} per registration.
*
* @experimental
*/
interface BenchmarkProvider {
	run: (group: BenchmarkGroup) => Promise<BenchResult[]>;
}
interface BenchStorage<T extends string> {
	get: (name: T) => BenchResult;
}

/**
* Options accepted by `bench(name, options, fn)`. Extends the per-benchmark
* lifecycle hooks with Vitest-specific fields.
*/
interface BenchFnOptions extends BenchOptions {
	/**
	* Path (relative to the project root) where the benchmark result is written
	* after a successful run. The string `${projectName}` is substituted with
	* the current project name. Absolute paths are accepted as long as they
	* resolve inside the project root.
	*/
	writeResult?: string;
	/**
	* Mark this benchmark as a per-project entry. Per-project tasks still appear
	* in the inline comparison table for the current run, and Vitest additionally
	* collects them across projects and prints a single cross-project table at
	* the end of the run.
	*/
	perProject?: boolean;
}
interface BenchRegistration<Name extends string> {
	name: Name;
	/**
	* The benchmark function. Absent for registrations created via `bench.from()`.
	*/
	fn?: BenchFn;
	/**
	* Per-benchmark options (`beforeEach`, `beforeAll`, etc.). Absent for
	* registrations created via `bench.from()`.
	*/
	fnOpts?: BenchOptions;
	run: (options?: BenchRunOptions) => Promise<BenchResult>;
}
interface BenchCompare {
	<Args extends BenchRegistration<any>[]>(...args: Args): Promise<BenchStorage<ExtractBenchNames<Args>>>;
	<Args extends BenchRegistration<any>[]>(...args: [...Args, BenchRunOptions]): Promise<BenchStorage<ExtractBenchNames<Args>>>;
}
interface BenchFactory {
	<Name extends string>(name: Name | Function, fn: BenchFn): BenchRegistration<Name>;
	<Name extends string>(name: Name | Function, options: BenchFnOptions, fn: BenchFn): BenchRegistration<Name>;
}
interface BenchFromSource {
	(): BaselineData | Promise<BaselineData>;
}
interface BenchFrom {
	<Name extends string>(name: Name | Function, source: string | BenchFromSource): BenchRegistration<Name>;
}
interface Bench extends BenchFactory {
	compare: BenchCompare;
	from: BenchFrom;
}

interface TestFixtureItem extends FixtureOptions {
	name: string;
	value: unknown;
	scope: "test" | "file" | "worker";
	deps: Set<string>;
	parent?: TestFixtureItem;
}
type UserFixtures = Record<string, unknown>;
type FixtureRegistrations = Map<string, TestFixtureItem>;
declare class TestFixtures {
	private _suiteContexts;
	private _overrides;
	private _registrations;
	private static _definitions;
	private static _builtinFixtures;
	private static _fixtureOptionKeys;
	private static _fixtureScopes;
	private static _workerContextSuite;
	static clearDefinitions(): void;
	static getWorkerContexts(): Record<string, any>[];
	static getFileContexts(file: File): Record<string, any>[];
	static isFixtureOptions(obj: unknown): boolean;
	constructor(registrations?: FixtureRegistrations);
	extend(runner: VitestRunner, userFixtures: UserFixtures): TestFixtures;
	get(suite: Suite): FixtureRegistrations;
	override(runner: VitestRunner, userFixtures: UserFixtures): void;
	getFileContext(file: File): Record<string, any>;
	getWorkerContext(): Record<string, any>;
	private parseUserFixtures;
}

/**
* Registers a callback function to be executed once before all tests within the current suite.
* This hook is useful for scenarios where you need to perform setup operations that are common to all tests in a suite, such as initializing a database connection or setting up a test environment.
*
* **Note:** The `beforeAll` hooks are executed in the order they are defined one after another. You can configure this by changing the `sequence.hooks` option in the config file.
*
* @param {Function} fn - The callback function to be executed before all tests.
* @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
* @returns {void}
* @example
* ```ts
* // Example of using beforeAll to set up a database connection
* beforeAll(async () => {
*   await database.connect();
* });
* ```
*/
declare function beforeAll<ExtraContext = object>(this: unknown, fn: BeforeAllListener<ExtraContext>, timeout?: number): void;
/**
* Registers a callback function to be executed once after all tests within the current suite have completed.
* This hook is useful for scenarios where you need to perform cleanup operations after all tests in a suite have run, such as closing database connections or cleaning up temporary files.
*
* **Note:** The `afterAll` hooks are running in reverse order of their registration. You can configure this by changing the `sequence.hooks` option in the config file.
*
* @param {Function} fn - The callback function to be executed after all tests.
* @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
* @returns {void}
* @example
* ```ts
* // Example of using afterAll to close a database connection
* afterAll(async () => {
*   await database.disconnect();
* });
* ```
*/
declare function afterAll<ExtraContext = object>(this: unknown, fn: AfterAllListener<ExtraContext>, timeout?: number): void;
/**
* Registers a callback function to be executed before each test within the current suite.
* This hook is useful for scenarios where you need to reset or reinitialize the test environment before each test runs, such as resetting database states, clearing caches, or reinitializing variables.
*
* **Note:** The `beforeEach` hooks are executed in the order they are defined one after another. You can configure this by changing the `sequence.hooks` option in the config file.
*
* @param {Function} fn - The callback function to be executed before each test. This function receives an `TestContext` parameter if additional test context is needed.
* @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
* @returns {void}
* @example
* ```ts
* // Example of using beforeEach to reset a database state
* beforeEach(async () => {
*   await database.reset();
* });
* ```
*/
declare function beforeEach<ExtraContext = object>(fn: BeforeEachListener<ExtraContext>, timeout?: number): void;
/**
* Registers a callback function to be executed after each test within the current suite has completed.
* This hook is useful for scenarios where you need to clean up or reset the test environment after each test runs, such as deleting temporary files, clearing test-specific database entries, or resetting mocked functions.
*
* **Note:** The `afterEach` hooks are running in reverse order of their registration. You can configure this by changing the `sequence.hooks` option in the config file.
*
* @param {Function} fn - The callback function to be executed after each test. This function receives an `TestContext` parameter if additional test context is needed.
* @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
* @returns {void}
* @example
* ```ts
* // Example of using afterEach to delete temporary files created during a test
* afterEach(async () => {
*   await fileSystem.deleteTempFiles();
* });
* ```
*/
declare function afterEach<ExtraContext = object>(fn: AfterEachListener<ExtraContext>, timeout?: number): void;
/**
* Registers a callback function to be executed when a test fails within the current suite.
* This function allows for custom actions to be performed in response to test failures, such as logging, cleanup, or additional diagnostics.
*
* **Note:** The `onTestFailed` hooks are running in reverse order of their registration. You can configure this by changing the `sequence.hooks` option in the config file.
*
* @param {Function} fn - The callback function to be executed upon a test failure. The function receives the test result (including errors).
* @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
* @throws {Error} Throws an error if the function is not called within a test.
* @returns {void}
* @example
* ```ts
* // Example of using onTestFailed to log failure details
* onTestFailed(({ errors }) => {
*   console.log(`Test failed: ${test.name}`, errors);
* });
* ```
*/
declare const onTestFailed: TaskHook<OnTestFailedHandler>;
/**
* Registers a callback function to be executed when the current test finishes, regardless of the outcome (pass or fail).
* This function is ideal for performing actions that should occur after every test execution, such as cleanup, logging, or resetting shared resources.
*
* This hook is useful if you have access to a resource in the test itself and you want to clean it up after the test finishes. It is a more compact way to clean up resources than using the combination of `beforeEach` and `afterEach`.
*
* **Note:** The `onTestFinished` hooks are running in reverse order of their registration. You can configure this by changing the `sequence.hooks` option in the config file.
*
* **Note:** The `onTestFinished` hook is not called if the test is canceled with a dynamic `ctx.skip()` call.
*
* @param {Function} fn - The callback function to be executed after a test finishes. The function can receive parameters providing details about the completed test, including its success or failure status.
* @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
* @throws {Error} Throws an error if the function is not called within a test.
* @returns {void}
* @example
* ```ts
* // Example of using onTestFinished for cleanup
* const db = await connectToDatabase();
* onTestFinished(async () => {
*   await db.disconnect();
* });
* ```
*/
declare const onTestFinished: TaskHook<OnTestFinishedHandler>;
/**
* Registers a callback function that wraps around all tests within the current suite.
* The callback receives a `runSuite` function that must be called to run the suite's tests.
* This hook is useful for scenarios where you need to wrap an entire suite in a context
* (e.g., starting a server, opening a database connection that all tests share).
*
* **Note:** When multiple `aroundAll` hooks are registered, they are nested inside each other.
* The first registered hook is the outermost wrapper.
*
* @param {Function} fn - The callback function that wraps the suite. Must call `runSuite()` to run the tests.
* @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
* @returns {void}
* @example
* ```ts
* // Example of using aroundAll to wrap suite in a tracing span
* aroundAll(async (runSuite) => {
*   await tracer.trace('test-suite', runSuite);
* });
* ```
* @example
* ```ts
* // Example of using aroundAll with fixtures
* aroundAll(async (runSuite, { db }) => {
*   await db.transaction(() => runSuite());
* });
* ```
*/
declare function aroundAll<ExtraContext = object>(this: unknown, fn: AroundAllListener<ExtraContext>, timeout?: number): void;
/**
* Registers a callback function that wraps around each test within the current suite.
* The callback receives a `runTest` function that must be called to run the test.
* This hook is useful for scenarios where you need to wrap tests in a context (e.g., database transactions).
*
* **Note:** When multiple `aroundEach` hooks are registered, they are nested inside each other.
* The first registered hook is the outermost wrapper.
*
* @param {Function} fn - The callback function that wraps the test. Must call `runTest()` to run the test.
* @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
* @returns {void}
* @example
* ```ts
* // Example of using aroundEach to wrap tests in a database transaction
* aroundEach(async (runTest) => {
*   await database.transaction(() => runTest());
* });
* ```
* @example
* ```ts
* // Example of using aroundEach with fixtures
* aroundEach(async (runTest, { db }) => {
*   await db.transaction(() => runTest());
* });
* ```
*/
declare function aroundEach<ExtraContext = object>(fn: AroundEachListener<ExtraContext>, timeout?: number): void;

type ChainableFunction<
	T extends string,
	F extends (...args: any) => any,
	C = object
> = F & { [x in T]: ChainableFunction<T, F, C> } & {
	fn: (this: Record<T, any>, ...args: Parameters<F>) => ReturnType<F>;
} & C;
type TypedChainableFunction<
	T,
	F extends (...args: any) => any,
	C = object
> = F & { [x in keyof T]: TypedChainableFunction<T, F, C> } & {
	fn: (this: Record<keyof T, any>, ...args: Parameters<F>) => ReturnType<F>;
} & C;
declare function createChainable<
	T extends string,
	Args extends any[],
	R = any
>(keys: T[], fn: (this: Record<T, any>, ...args: Args) => R, context?: Record<string, any>): ChainableFunction<T, (...args: Args) => R>;

type RunMode = "run" | "skip" | "only" | "todo" | "queued";
type TaskState = RunMode | "pass" | "fail";
interface TaskBase {
	/**
	* Unique task identifier. Based on the file id and the position of the task.
	* The id of the file task is based on the file path relative to root and project name.
	* It will not change between runs.
	* @example `1201091390`, `1201091390_0`, `1201091390_0_1`
	*/
	id: string;
	/**
	* Task name provided by the user. If no name was provided, it will be an empty string.
	*/
	name: string;
	/**
	* Full name including the file path, any parent suites, and this task's name.
	*
	* Uses ` > ` as the separator between levels.
	*
	* @example
	* // file
	* 'test/task-names.test.ts'
	* @example
	* // suite
	* 'test/task-names.test.ts > meal planning'
	* 'test/task-names.test.ts > meal planning > grocery lists'
	* @example
	* // test
	* 'test/task-names.test.ts > meal planning > grocery lists > calculates ingredients'
	*/
	fullName: string;
	/**
	* Full name excluding the file path, including any parent suites and this task's name. `undefined` for file tasks.
	*
	* Uses ` > ` as the separator between levels.
	*
	* @example
	* // file
	* undefined
	* @example
	* // suite
	* 'meal planning'
	* 'meal planning > grocery lists'
	* @example
	* // test
	* 'meal planning > grocery lists > calculates ingredients'
	*/
	fullTestName?: string;
	/**
	* Task mode.
	* - **skip**: task is skipped
	* - **only**: only this task and other tasks with `only` mode will run
	* - **todo**: task is marked as a todo, alias for `skip`
	* - **run**: task will run or already ran
	* - **queued**: task will start running next. It can only exist on the File
	*/
	mode: RunMode;
	/**
	* Custom metadata for the task. JSON reporter will save this data.
	*/
	meta: TaskMeta;
	/**
	* Whether the task was produced with `.each()` method.
	*/
	each?: boolean;
	/**
	* Whether the task should run concurrently with other tasks.
	*/
	concurrent?: boolean;
	/**
	* Whether the tasks of the suite run in a random order.
	*/
	shuffle?: boolean;
	/**
	* Suite that this task is part of. File task or the global suite will have no parent.
	*/
	suite?: Suite;
	/**
	* Result of the task. Suite and file tasks will only have the result if there
	* was an error during collection or inside `afterAll`/`beforeAll`.
	*/
	result?: TaskResult;
	/**
	* Retry configuration for the task.
	* - If a number, specifies how many times to retry
	* - If an object, allows fine-grained retry control
	* @default 0
	*/
	retry?: Retry;
	/**
	* The amount of times the task should be repeated after the successful run.
	* If the task fails, it will not be retried unless `retry` is specified.
	* @default 0
	*/
	repeats?: number;
	/**
	* Location of the task in the file. This field is populated only if
	* `includeTaskLocation` option is set. It is generated by calling `new Error`
	* and parsing the stack trace, so the location might differ depending on the runtime.
	*/
	location?: Location;
	/**
	* If the test was collected by parsing the file AST, and the name
	* is not a static string, this property will be set to `true`.
	* @experimental
	*/
	dynamic?: boolean;
	/**
	* Custom tags of the task. Useful for filtering tasks.
	*/
	tags?: string[];
	logs?: UserConsoleLog[];
}
interface TaskPopulated extends TaskBase {
	/**
	* File task. It's the root task of the file.
	*/
	file: File;
	/**
	* Whether the task should succeed if it fails. If the task fails, it will be marked as passed.
	*/
	fails?: boolean;
	/**
	* Store promises (from async expects) to wait for them before finishing the test
	*/
	promises?: Promise<any>[];
}
/**
* Custom metadata that can be used in reporters.
*/
interface TaskMeta {
	typecheck?: boolean;
	benchmark?: boolean;
	__vitest_label__?: string;
}
/**
* The result of an individual test attempt.
*/
interface TaskResultAttempt {
	/** The state after applying the test's expected failure option. */
	state: "pass" | "fail" | "skip";
	/** Errors produced by this attempt. */
	errors?: TestError[];
	/** How long in milliseconds the attempt took to run. */
	duration: number;
	/** Time in milliseconds when the attempt started running. */
	startTime: number;
	/** The zero-based retry index within the repeat. */
	retryIndex: number;
	/** The zero-based repeat index. */
	repeatIndex: number;
}
/**
* The result of calling a task.
*/
interface TaskResult {
	/**
	* State of the task. Inherits the `task.mode` during collection.
	* When the task has finished, it will be changed to `pass` or `fail`.
	* - **pass**: task ran successfully
	* - **fail**: task failed
	*/
	state: TaskState;
	/**
	* Errors that occurred during the task execution. It is possible to have several errors
	* if `expect.soft()` failed multiple times or `retry` was triggered.
	*/
	errors?: TestError[];
	/**
	* Individual results for every retry and repeat attempt.
	*/
	attempts?: TaskResultAttempt[];
	/**
	* How long in milliseconds the task took to run.
	*/
	duration?: number;
	/**
	* Time in milliseconds when the task started running.
	*/
	startTime?: number;
	/**
	* Heap size in bytes after the task finished.
	* Only available if `logHeapUsage` option is set and `process.memoryUsage` is defined.
	*/
	heap?: number;
	/**
	* State of related to this task hooks. Useful during reporting.
	*/
	hooks?: Partial<Record<keyof SuiteHooks, TaskState>>;
	/**
	* The number of times the task has been retried across all repeats.
	*/
	retryCount?: number;
	/**
	* The zero-based index of the current repeat.
	*/
	repeatCount?: number;
}
/** The time spent importing & executing a non-externalized file. */
interface ImportDuration {
	/** The time spent importing & executing the file itself, not counting all non-externalized imports that the file does. */
	selfTime: number;
	/** The time spent importing & executing the file and all its imports. */
	totalTime: number;
	/** Will be set to `true`, if the module was externalized. In this case totalTime and selfTime are identical. */
	external?: boolean;
	/** Which module imported this module first. All subsequent imports are cached. */
	importer?: string;
}
/**
* The tuple representing a single task update.
* Usually reported after the task finishes.
*/
type TaskResultPack = [id: string, result: TaskResult | undefined, meta: TaskMeta];
interface TaskEventData {
	annotation?: TestAnnotation | undefined;
	artifact?: TestArtifact | undefined;
}
type TaskEventPack = [id: string, event: TaskUpdateEvent, data: TaskEventData | undefined];
type TaskUpdateEvent = "test-failed-early" | "suite-failed-early" | "test-prepare" | "test-finished" | "test-retried" | "test-cancel" | "suite-prepare" | "suite-finished" | "before-hook-start" | "before-hook-end" | "after-hook-start" | "after-hook-end" | "test-annotation" | "test-artifact";
interface Suite extends TaskBase {
	type: "suite";
	/**
	* File task. It's the root task of the file.
	*/
	file: File;
	/**
	* An array of tasks that are part of the suite.
	*/
	tasks: Task[];
}
interface File extends Suite {
	/**
	* The name of the pool that the file belongs to.
	* @default 'forks'
	*/
	pool?: string;
	/**
	* The environment that processes the file on the server.
	*/
	viteEnvironment?: string;
	/**
	* The path to the file in UNIX format.
	*/
	filepath: string;
	/**
	* The name of the workspace project the file belongs to.
	*/
	projectName: string | undefined;
	/**
	* The time it took to collect all tests in the file.
	* This time also includes importing all the file dependencies.
	*/
	collectDuration?: number;
	/**
	* The portion of `collectDuration` the worker spent waiting for the server
	* to resolve and transform modules.
	*/
	collectFetchDuration?: number;
	/**
	* The time it took to import the setup file.
	*/
	setupDuration?: number;
	/**
	* The portion of `setupDuration` the worker spent waiting for the server
	* to resolve and transform modules.
	*/
	setupFetchDuration?: number;
	/** The time spent importing every non-externalized dependency that Vitest has processed. */
	importDurations?: Record<string, ImportDuration>;
	prepareDuration?: number;
	environmentLoad?: number;
	concurrencyId: number;
	workerId: number;
}
interface Test<ExtraContext = object> extends TaskPopulated {
	type: "test";
	/**
	* Test context that will be passed to the test function.
	*/
	context: TestContext & ExtraContext;
	/**
	* The test timeout in milliseconds.
	*/
	timeout: number;
	/**
	* An array of custom annotations.
	*/
	annotations: TestAnnotation[];
	/**
	* An array of artifacts produced by the test.
	*
	* @experimental
	*/
	artifacts: TestArtifact[];
	fullTestName: string;
	/**
	* An array of benchmark results generated by `context.bench` function.
	* The benchmark is added only after `bench().run` or `bench.compare` is resolved.
	*
	* @experimental
	*/
	benchmarks: TestBenchmark[];
}
interface TestBenchmark {
	name: string;
	tasks: TestBenchmarkTask[];
}
type TestBenchmarkStatistics = Statistics;
interface BaselineData {
	latency: TestBenchmarkStatistics;
	throughput: TestBenchmarkStatistics;
	period: number;
	totalTime: number;
}
interface TestBenchmarkTask {
	name: string;
	latency: TestBenchmarkStatistics;
	throughput: TestBenchmarkStatistics;
	period: number;
	totalTime: number;
	rank: number;
	perProject?: boolean;
	/**
	* `true` when the task was produced by `bench.from()` rather than by
	* executing a function. Reporters can use this to render the row as a
	* static reference (no margin of error, no samples).
	*/
	fromStore?: boolean;
}
type Task = Test | Suite | File;
type TestFunction<ExtraContext = object> = (context: TestContext & ExtraContext) => Awaitable<any> | void;
type ExtractEachCallbackArgs<T extends ReadonlyArray<any>> = {
	1: [T[0]];
	2: [T[0], T[1]];
	3: [T[0], T[1], T[2]];
	4: [T[0], T[1], T[2], T[3]];
	5: [T[0], T[1], T[2], T[3], T[4]];
	6: [T[0], T[1], T[2], T[3], T[4], T[5]];
	7: [T[0], T[1], T[2], T[3], T[4], T[5], T[6]];
	8: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]];
	9: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]];
	10: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]];
	fallback: Array<T extends ReadonlyArray<infer U> ? U : any>;
}[T extends Readonly<[any]> ? 1 : T extends Readonly<[any, any]> ? 2 : T extends Readonly<[any, any, any]> ? 3 : T extends Readonly<[any, any, any, any]> ? 4 : T extends Readonly<[any, any, any, any, any]> ? 5 : T extends Readonly<[any, any, any, any, any, any]> ? 6 : T extends Readonly<[any, any, any, any, any, any, any]> ? 7 : T extends Readonly<[any, any, any, any, any, any, any, any]> ? 8 : T extends Readonly<[any, any, any, any, any, any, any, any, any]> ? 9 : T extends Readonly<[any, any, any, any, any, any, any, any, any, any]> ? 10 : "fallback"];
interface EachFunctionReturn<T extends any[]> {
	(name: string | Function, fn: (...args: T) => Awaitable<void>, options?: number): void;
	(name: string | Function, options: TestCollectorOptions, fn: (...args: T) => Awaitable<void>): void;
}
interface TestEachFunction {
	<T extends any[] | [any]>(cases: ReadonlyArray<T>): EachFunctionReturn<T>;
	<T extends ReadonlyArray<any>>(cases: ReadonlyArray<T>): EachFunctionReturn<ExtractEachCallbackArgs<T>>;
	<T>(cases: ReadonlyArray<T>): EachFunctionReturn<T[]>;
	(...args: [TemplateStringsArray, ...any]): EachFunctionReturn<any[]>;
}
interface TestForFunctionReturn<
	Arg,
	Context
> {
	(name: string | Function, fn: (arg: Arg, context: Context) => Awaitable<void>): void;
	(name: string | Function, options: TestCollectorOptions, fn: (args: Arg, context: Context) => Awaitable<void>): void;
}
interface TestForFunction<ExtraContext> {
	<T>(cases: ReadonlyArray<T>): TestForFunctionReturn<T, TestContext & ExtraContext>;
	(strings: TemplateStringsArray, ...values: any[]): TestForFunctionReturn<any, TestContext & ExtraContext>;
}
interface SuiteForFunction {
	<T>(cases: ReadonlyArray<T>): EachFunctionReturn<[T]>;
	(...args: [TemplateStringsArray, ...any]): EachFunctionReturn<any[]>;
}
interface TestCollectorCallable<C = object> {
	<ExtraContext extends C>(name: string | Function, fn?: TestFunction<ExtraContext>, options?: number): void;
	<ExtraContext extends C>(name: string | Function, options?: TestCollectorOptions, fn?: TestFunction<ExtraContext>): void;
}
type ChainableTestContextMap = Pick<Required<TestOptions>, "concurrent" | "only" | "skip" | "todo" | "fails">;
type ChainableTestAPI<ExtraContext = object> = TypedChainableFunction<ChainableTestContextMap, TestCollectorCallable<ExtraContext>, {
	each: TestEachFunction;
	for: TestForFunction<ExtraContext>;
}>;
type TestCollectorOptions = Omit<TestOptions, "shuffle">;
/**
* Retry configuration for tests.
* Can be a number for simple retry count, or an object for advanced retry control.
*/
type Retry = number | {
	/**
	* The number of times to retry the test if it fails.
	* @default 0
	*/
	count?: number;
	/**
	* Delay in milliseconds between retry attempts.
	* @default 0
	*/
	delay?: number;
	/**
	* Condition to determine if a test should be retried based on the error.
	* - If a RegExp, it is tested against the error message
	* - If a function, called with the TestError object; return true to retry
	*
	* NOTE: Functions can only be used in test files, not in vitest.config.ts,
	* because the configuration is serialized when passed to worker threads.
	*
	* @default undefined (retry on all errors)
	*/
	condition?: RegExp | ((error: TestError) => boolean);
};
/**
* Serializable retry configuration (used in config files).
* Functions cannot be serialized, so only string conditions are allowed.
*/
type SerializableRetry = number | {
	/**
	* The number of times to retry the test if it fails.
	* @default 0
	*/
	count?: number;
	/**
	* Delay in milliseconds between retry attempts.
	* @default 0
	*/
	delay?: number;
	/**
	* Condition to determine if a test should be retried based on the error.
	* Must be a RegExp tested against the error message.
	*
	* @default undefined (retry on all errors)
	*/
	condition?: RegExp;
};
interface TestOptions {
	/**
	* Test timeout.
	*/
	timeout?: number;
	/**
	* Retry configuration for the test.
	* - If a number, specifies how many times to retry
	* - If an object, allows fine-grained retry control
	* @default 0
	*/
	retry?: Retry;
	/**
	* How many times the test will run again.
	* Only inner tests will repeat if set on `describe()`, nested `describe()` will inherit parent's repeat by default.
	*
	* @default 0
	*/
	repeats?: number;
	/**
	* Whether suites and tests run concurrently.
	* Tests inherit `concurrent` from `describe()` and nested `describe()` will inherit from parent's `concurrent`.
	*/
	concurrent?: boolean;
	/**
	* Whether the test should be skipped.
	*/
	skip?: boolean;
	/**
	* Should this test be the only one running in a suite.
	*/
	only?: boolean;
	/**
	* Whether the test should be skipped and marked as a todo.
	*/
	todo?: boolean;
	/**
	* Whether the test is expected to fail. If it does, the test will pass, otherwise it will fail.
	*/
	fails?: boolean;
	/**
	* Custom tags of the test. Useful for filtering tests.
	*/
	tags?: keyof TestTags extends never ? string[] | string : TestTags[keyof TestTags] | TestTags[keyof TestTags][];
	/**
	* Custom test metadata available to reporters.
	*/
	meta?: Partial<TaskMeta>;
}
interface TestTags {}
interface TestTagDefinition extends Omit<TestOptions, "tags" | "shuffle"> {
	/**
	* The name of the tag. This is what you use in the `tags` array in tests.
	*/
	name: keyof TestTags extends never ? string : TestTags[keyof TestTags];
	/**
	* A description for the tag. This will be shown in the CLI help and UI.
	*/
	description?: string;
	/**
	* Priority for merging options when multiple tags with the same options are applied to a test.
	*
	* Lower number means higher priority. E.g., priority 1 takes precedence over priority 3.
	*/
	priority?: number;
}
interface SuiteOptions extends TestOptions {
	/**
	* Whether the tasks of the suite run in a random order.
	*/
	shuffle?: boolean;
}
interface ExtendedAPI<ExtraContext> {
	skipIf: (condition: any) => ChainableTestAPI<ExtraContext>;
	runIf: (condition: any) => ChainableTestAPI<ExtraContext>;
}
interface Hooks<ExtraContext> {
	/**
	* Suite-level hooks only receive file/worker scoped fixtures.
	* Test-scoped fixtures are NOT available in beforeAll/afterAll/aroundAll.
	*/
	beforeAll: typeof beforeAll<ExtractSuiteContext<ExtraContext>>;
	afterAll: typeof afterAll<ExtractSuiteContext<ExtraContext>>;
	aroundAll: typeof aroundAll<ExtractSuiteContext<ExtraContext>>;
	/**
	* Test-level hooks receive all fixtures including test-scoped ones.
	*/
	beforeEach: typeof beforeEach<ExtraContext>;
	afterEach: typeof afterEach<ExtraContext>;
	aroundEach: typeof aroundEach<ExtraContext>;
}
type TestAPI<ExtraContext = object> = ChainableTestAPI<ExtraContext> & ExtendedAPI<ExtraContext> & Hooks<ExtraContext> & {
	/**
	* Extend the test API with custom fixtures.
	*
	* @example
	* ```ts
	* // Simple test fixtures (backward compatible)
	* const myTest = test.extend<{ foo: string }>({
	*   foo: 'value',
	* })
	*
	* // With scoped fixtures - use $test/$file/$worker structure
	* const myTest = test.extend<{
	*   $test: { testData: string }
	*   $file: { fileDb: Database }
	*   $worker: { workerConfig: Config }
	* }>({
	*   testData: async ({ fileDb }, use) => {
	*     await use(await fileDb.getData())
	*   },
	*   fileDb: [async ({ workerConfig }, use) => {
	*     // File fixture can only access workerConfig, NOT testData
	*     const db = new Database(workerConfig)
	*     await use(db)
	*     await db.close()
	*   }, { scope: 'file' }],
	*   workerConfig: [async ({}, use) => {
	*     // Worker fixture can only access other worker fixtures
	*     await use(loadConfig())
	*   }, { scope: 'worker' }],
	* })
	*
	* // Builder pattern with automatic type inference
	* const myTest = test
	*   .extend('config', { scope: 'worker' }, async ({}) => {
	*     return { port: 3000 }  // Type inferred as { port: number }
	*   })
	*   .extend('db', { scope: 'file' }, async ({ config }, { onCleanup }) => {
	*     // TypeScript knows config is { port: number }
	*     const db = new Database(config.port)
	*     onCleanup(() => db.close())  // Register cleanup
	*     return db  // Type inferred as Database
	*   })
	*   .extend('data', async ({ db }) => {
	*     // TypeScript knows db is Database
	*     return await db.getData()  // Type inferred from return
	*   })
	* ```
	*/
	extend: {
		<
			K extends string,
			T extends (K extends keyof ExtraContext ? ExtraContext[K] : unknown)
		>(name: K, options: WorkerScopeFixtureOptions, fn: BuilderFixtureFn<T, WorkerScopeContext<ExtraContext>>): TestAPI<AddBuilderWorker<ExtraContext, K, T>>;
		<
			K extends string,
			T extends (K extends keyof ExtraContext ? ExtraContext[K] : unknown)
		>(name: K, options: FileScopeFixtureOptions, fn: BuilderFixtureFn<T, FileScopeContext<ExtraContext>>): TestAPI<AddBuilderFile<ExtraContext, K, T>>;
		<
			K extends string,
			T extends (K extends keyof ExtraContext ? ExtraContext[K] : unknown)
		>(name: K, options: TestScopeFixtureOptions, fn: BuilderFixtureFn<T, TestScopeContext<ExtraContext>>): TestAPI<AddBuilderTest<ExtraContext, K, T>>;
		<
			K extends string,
			T extends (K extends keyof ExtraContext ? ExtraContext[K] : unknown)
		>(name: K, fn: BuilderFixtureFn<T, TestScopeContext<ExtraContext>>): TestAPI<AddBuilderTest<ExtraContext, K, T>>;
		<
			K extends string,
			T extends (K extends keyof ExtraContext ? ExtraContext[K] : unknown)
		>(name: K, options: WorkerScopeFixtureOptions, value: T extends (...args: any[]) => any ? never : T): TestAPI<AddBuilderWorker<ExtraContext, K, T>>;
		<
			K extends string,
			T extends (K extends keyof ExtraContext ? ExtraContext[K] : unknown)
		>(name: K, options: FileScopeFixtureOptions, value: T extends (...args: any[]) => any ? never : T): TestAPI<AddBuilderFile<ExtraContext, K, T>>;
		<
			K extends string,
			T extends (K extends keyof ExtraContext ? ExtraContext[K] : unknown)
		>(name: K, options: TestScopeFixtureOptions, value: T extends (...args: any[]) => any ? never : T): TestAPI<AddBuilderTest<ExtraContext, K, T>>;
		<
			K extends string,
			T extends (K extends keyof ExtraContext ? ExtraContext[K] : unknown)
		>(name: K, value: T extends (...args: any[]) => any ? never : T): TestAPI<AddBuilderTest<ExtraContext, K, T>>;
		<T extends ScopedFixturesDef>(fixtures: ScopedFixturesObject<T, ExtraContext>): TestAPI<ExtractScopedFixtures<T> & ExtraContext>;
		<T extends Record<string, any> = object>(fixtures: Fixtures<T, ExtraContext>): TestAPI<{ [K in keyof T | keyof ExtraContext]: K extends keyof T ? T[K] : K extends keyof ExtraContext ? ExtraContext[K] : never }>;
	};
	/**
	* Overwrite fixture values for the current suite scope.
	* Supports both object syntax and builder pattern.
	*
	* @example
	* ```ts
	* describe('with custom config', () => {
	*   // Object syntax
	*   test.override({ config: { port: 4000 } })
	*
	*   // Builder pattern - value
	*   test.override('config', { port: 4000 })
	*
	*   // Builder pattern - function
	*   test.override('config', () => ({ port: 4000 }))
	*
	*   // Builder pattern - function with cleanup
	*   test.override('db', async ({ config }, { onCleanup }) => {
	*     const db = await createDb(config)
	*     onCleanup(() => db.close())
	*     return db
	*   })
	* })
	* ```
	*/
	override: {
		<K extends keyof ExtraContext>(name: K, options: FixtureOptions, fn: BuilderFixtureFn<ExtraContext[K], ExtraContext & TestContext>): TestAPI<ExtraContext>;
		<K extends keyof ExtraContext>(name: K, fn: BuilderFixtureFn<ExtraContext[K], ExtraContext & TestContext>): TestAPI<ExtraContext>;
		<K extends keyof ExtraContext>(name: K, options: FixtureOptions, value: ExtraContext[K] extends (...args: any[]) => any ? never : ExtraContext[K]): TestAPI<ExtraContext>;
		<K extends keyof ExtraContext>(name: K, value: ExtraContext[K] extends (...args: any[]) => any ? never : ExtraContext[K]): TestAPI<ExtraContext>;
		(fixtures: Partial<Fixtures<ExtraContext>>): TestAPI<ExtraContext>;
	};
	/**
	* @deprecated Use `test.override()` instead
	*/
	scoped: (fixtures: Partial<Fixtures<ExtraContext>>) => TestAPI<ExtraContext>;
	describe: SuiteAPI<ExtraContext>;
	suite: SuiteAPI<ExtraContext>;
};
interface FixtureOptions {
	/**
	* Whether to automatically set up current fixture, even though it's not being used.
	* Test-scoped auto fixtures are not initialized in suite-level hooks (`beforeAll`/`afterAll`/`aroundAll`).
	* @default false
	*/
	auto?: boolean;
	/**
	* Indicated if the injected value from the config should be preferred over the fixture value
	*/
	injected?: boolean;
	/**
	* When should the fixture be set up.
	* - **test**: fixture will be set up before every test
	* - **worker**: fixture will be set up once per worker
	* - **file**: fixture will be set up once per file
	*
	* **Warning:** The `vmThreads` and `vmForks` pools initiate worker fixtures once per test file.
	* @default 'test'
	*/
	scope?: "test" | "worker" | "file";
}
/**
* Options for test-scoped fixtures.
* Test fixtures are set up before each test and have access to all fixtures.
*/
interface TestScopeFixtureOptions extends Omit<FixtureOptions, "scope"> {
	/**
	* @default 'test'
	*/
	scope?: "test";
}
/**
* Options for file-scoped fixtures.
* File fixtures are set up once per file and can only access other file fixtures and worker fixtures.
*/
interface FileScopeFixtureOptions extends Omit<FixtureOptions, "scope"> {
	/**
	* Must be 'file' for file-scoped fixtures.
	*/
	scope: "file";
}
/**
* Options for worker-scoped fixtures.
* Worker fixtures are set up once per worker and can only access other worker fixtures.
*/
interface WorkerScopeFixtureOptions extends Omit<FixtureOptions, "scope"> {
	/**
	* Must be 'worker' for worker-scoped fixtures.
	*/
	scope: "worker";
}
type Use<T> = (value: T) => Promise<void>;
/**
* Cleanup registration function for builder pattern fixtures.
* Call this to register a cleanup function that runs after the test/file/worker completes.
*
* **Note:** This function can only be called once per fixture. If you need multiple
* cleanup operations, either combine them into a single cleanup function or split
* your fixture into multiple smaller fixtures.
*/
type OnCleanup = (cleanup: () => Awaitable<void>) => void;
/**
* Builder pattern fixture function with automatic type inference.
* Returns the fixture value directly (type is inferred from return).
* Use onCleanup to register teardown logic.
*
* Parameters can be omitted if not needed:
* - `async () => value` - no dependencies, no cleanup
* - `async ({ dep }) => value` - with dependencies, no cleanup
* - `async ({ dep }, { onCleanup }) => value` - with dependencies and cleanup
*/
type BuilderFixtureFn<
	T,
	Context
> = (context: Context, fixture: {
	onCleanup: OnCleanup;
}) => T | Promise<T>;
type ExtractSuiteContext<C> = C extends {
	$__worker?: any;
} | {
	$__file?: any;
} | {
	$__test?: any;
} ? ExtractBuilderWorker<C> & ExtractBuilderFile<C> : C;
/**
* Extracts worker-scoped fixtures from a context that includes scope info.
*/
type ExtractBuilderWorker<C> = C extends {
	$__worker?: infer W;
} ? W extends Record<string, any> ? W : object : object;
/**
* Extracts file-scoped fixtures from a context that includes scope info.
*/
type ExtractBuilderFile<C> = C extends {
	$__file?: infer F;
} ? F extends Record<string, any> ? F : object : object;
/**
* Extracts test-scoped fixtures from a context that includes scope info.
*/
type ExtractBuilderTest<C> = C extends {
	$__test?: infer T;
} ? T extends Record<string, any> ? T : object : object;
/**
* Adds a worker fixture to the context with proper scope tracking.
*/
type AddBuilderWorker<
	C,
	K extends string,
	V
> = Omit<C, "$__worker"> & Record<K, V> & {
	readonly $__worker?: ExtractBuilderWorker<C> & Record<K, V>;
	readonly $__file?: ExtractBuilderFile<C>;
	readonly $__test?: ExtractBuilderTest<C>;
};
/**
* Adds a file fixture to the context with proper scope tracking.
*/
type AddBuilderFile<
	C,
	K extends string,
	V
> = Omit<C, "$__file"> & Record<K, V> & {
	readonly $__worker?: ExtractBuilderWorker<C>;
	readonly $__file?: ExtractBuilderFile<C> & Record<K, V>;
	readonly $__test?: ExtractBuilderTest<C>;
};
/**
* Adds a test fixture to the context with proper scope tracking.
*/
type AddBuilderTest<
	C,
	K extends string,
	V
> = Omit<C, "$__test"> & Record<K, V> & {
	readonly $__worker?: ExtractBuilderWorker<C>;
	readonly $__file?: ExtractBuilderFile<C>;
	readonly $__test?: ExtractBuilderTest<C> & Record<K, V>;
};
/**
* Context available to worker-scoped fixtures.
* Worker fixtures can only access other worker fixtures.
* They do NOT have access to test context (task, expect, onTestFailed, etc.)
* since they run once per worker, outside of any specific test.
*/
type WorkerScopeContext<C> = ExtractBuilderWorker<C>;
/**
* Context available to file-scoped fixtures.
* File fixtures can access worker and other file fixtures.
* They do NOT have access to test context (task, expect, onTestFailed, etc.)
* since they run once per file, outside of any specific test.
*/
type FileScopeContext<C> = ExtractBuilderWorker<C> & ExtractBuilderFile<C>;
/**
* Context available to test-scoped fixtures (all fixtures + test context).
*/
type TestScopeContext<C> = C & TestContext;
type FixtureFn<
	T,
	K extends keyof T,
	ExtraContext
> = (context: Omit<T, K> & ExtraContext, use: Use<T[K]>) => Promise<void>;
type Fixture<
	T,
	K extends keyof T,
	ExtraContext = object
> = ((...args: any) => any) extends T[K] ? T[K] extends any ? FixtureFn<T, K, Omit<ExtraContext, Exclude<keyof T, K>>> : never : T[K] | (T[K] extends any ? FixtureFn<T, K, Omit<ExtraContext, Exclude<keyof T, K>>> : never);
/**
* Fixture function with explicit context type for scoped fixtures.
*/
type ScopedFixtureFn<
	Value,
	Context
> = (context: Context, use: Use<Value>) => Promise<void>;
/**
* Fixtures definition for backward compatibility.
* All fixtures are in T and any scope is allowed.
*/
type Fixtures<
	T,
	ExtraContext = object
> = { [K in keyof T]: Fixture<T, K, ExtraContext & TestContext> | [Fixture<T, K, ExtraContext & TestContext>, FixtureOptions?] };
/**
* Scoped fixtures definition using a single generic with optional scope keys.
* This provides better ergonomics than multiple generics.
* Uses $ prefix to avoid conflicts with fixture names.
*
* @example
* ```ts
* test.extend<{
*   $worker?: { config: Config }
*   $file?: { db: Database }
*   $test?: { data: string }
* }>({ ... })
* ```
*/
interface ScopedFixturesDef {
	$test?: Record<string, any>;
	$file?: Record<string, any>;
	$worker?: Record<string, any>;
}
/**
* Extracts fixture types from a ScopedFixturesDef.
* Handles optional properties by using Exclude to remove undefined.
*/
type ExtractScopedFixtures<T extends ScopedFixturesDef> = ([Exclude<T["$test"], undefined>] extends [never] ? object : Exclude<T["$test"], undefined>) & ([Exclude<T["$file"], undefined>] extends [never] ? object : Exclude<T["$file"], undefined>) & ([Exclude<T["$worker"], undefined>] extends [never] ? object : Exclude<T["$worker"], undefined>);
/**
* Creates the fixtures object type for ScopedFixturesDef with proper scope validation.
* - Test fixtures: can be defined as value, function, or tuple with optional scope
* - File fixtures: MUST have { scope: 'file' }
* - Worker fixtures: MUST have { scope: 'worker' }
*/
type ScopedFixturesObject<
	T extends ScopedFixturesDef,
	ExtraContext = object
> = { [K in keyof NonNullable<T["$test"]>]: NonNullable<T["$test"]>[K] | ScopedFixtureFn<NonNullable<T["$test"]>[K], ExtractScopedFixtures<T> & ExtraContext & TestContext> | [ScopedFixtureFn<NonNullable<T["$test"]>[K], ExtractScopedFixtures<T> & ExtraContext & TestContext>, TestScopeFixtureOptions?] } & { [K in keyof NonNullable<T["$file"]>]: [ScopedFixtureFn<NonNullable<T["$file"]>[K], (NonNullable<T["$file"]> & NonNullable<T["$worker"]>) & ExtraContext>, FileScopeFixtureOptions] } & { [K in keyof NonNullable<T["$worker"]>]: [ScopedFixtureFn<NonNullable<T["$worker"]>[K], NonNullable<T["$worker"]> & ExtraContext>, WorkerScopeFixtureOptions] };
interface SuiteCollectorCallable<ExtraContext = object> {
	<OverrideExtraContext extends ExtraContext = ExtraContext>(name: string | Function, fn?: SuiteFactory<OverrideExtraContext>, options?: number): SuiteCollector<OverrideExtraContext>;
	<OverrideExtraContext extends ExtraContext = ExtraContext>(name: string | Function, options: SuiteOptions, fn?: SuiteFactory<OverrideExtraContext>): SuiteCollector<OverrideExtraContext>;
}
type ChainableSuiteContextMap = Pick<Required<SuiteOptions>, "concurrent" | "only" | "skip" | "todo" | "shuffle">;
type ChainableSuiteAPI<ExtraContext = object> = TypedChainableFunction<ChainableSuiteContextMap, SuiteCollectorCallable<ExtraContext>, {
	each: TestEachFunction;
	for: SuiteForFunction;
}>;
type SuiteAPI<ExtraContext = object> = ChainableSuiteAPI<ExtraContext> & {
	skipIf: (condition: any) => ChainableSuiteAPI<ExtraContext>;
	runIf: (condition: any) => ChainableSuiteAPI<ExtraContext>;
};
interface BeforeAllListener<ExtraContext = object> {
	(context: ExtraContext, suite: Readonly<Suite | File>): Awaitable<unknown>;
}
interface AfterAllListener<ExtraContext = object> {
	(context: ExtraContext, suite: Readonly<Suite | File>): Awaitable<unknown>;
}
interface BeforeEachListener<ExtraContext = object> {
	(context: TestContext & ExtraContext, suite: Readonly<Suite>): Awaitable<unknown>;
}
interface AfterEachListener<ExtraContext = object> {
	(context: TestContext & ExtraContext, suite: Readonly<Suite>): Awaitable<unknown>;
}
interface AroundEachListener<ExtraContext = object> {
	(runTest: () => Promise<void>, context: TestContext & ExtraContext, suite: Readonly<Suite>): Awaitable<unknown>;
}
interface AroundAllListener<ExtraContext = object> {
	(runSuite: () => Promise<void>, context: ExtraContext, suite: Readonly<Suite | File>): Awaitable<unknown>;
}
interface RegisteredAllListener {
	(suite: Readonly<Suite | File>): Awaitable<unknown>;
}
interface RegisteredAroundAllListener {
	(runSuite: () => Promise<void>, suite: Readonly<Suite | File>): Awaitable<unknown>;
}
interface SuiteHooks<ExtraContext = object> {
	beforeAll: RegisteredAllListener[];
	afterAll: RegisteredAllListener[];
	aroundAll: RegisteredAroundAllListener[];
	beforeEach: BeforeEachListener<ExtraContext>[];
	afterEach: AfterEachListener<ExtraContext>[];
	aroundEach: AroundEachListener<ExtraContext>[];
}
interface TaskCustomOptions extends TestOptions {
	/**
	* Whether the task was produced with `.each()` method.
	*/
	each?: boolean;
	/**
	* Task fixtures.
	*/
	fixtures?: TestFixtures;
	/**
	* Function that will be called when the task is executed.
	* If nothing is provided, the runner will try to get the function using `getFn(task)`.
	* If the runner cannot find the function, the task will be marked as failed.
	*/
	handler?: (context: TestContext) => Awaitable<void>;
}
interface SuiteCollector<ExtraContext = object> {
	readonly name: string;
	readonly mode: RunMode;
	options?: SuiteOptions;
	type: "collector";
	test: TestAPI<ExtraContext>;
	tasks: (Suite | Test<ExtraContext> | SuiteCollector<ExtraContext>)[];
	file: File;
	suite?: Suite;
	task: (name: string, options?: TaskCustomOptions) => Test<ExtraContext>;
	collect: (file: File) => Promise<Suite>;
	clear: () => void;
	on: <T extends keyof SuiteHooks<ExtraContext>>(name: T, ...fn: SuiteHooks<ExtraContext>[T]) => void;
}
type SuiteFactory<ExtraContext = object> = (test: TestAPI<ExtraContext>) => Awaitable<void>;
/**
* User's custom test context.
*/
interface TestContext {
	/**
	* Metadata of the current test
	*/
	readonly task: Readonly<Test>;
	/**
	* An [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that will be aborted if the test times out or
	* the test run was cancelled.
	* @see {@link https://vitest.dev/guide/test-context#signal}
	*/
	readonly signal: AbortSignal;
	/**
	* Register a callback to run when this specific test fails.
	* Useful when tests run concurrently.
	* @see {@link https://vitest.dev/guide/test-context#ontestfailed}
	*/
	readonly onTestFailed: (fn: OnTestFailedHandler, timeout?: number) => void;
	/**
	* Register a callback to run when this specific test finishes.
	* Useful when tests run concurrently.
	* @see {@link https://vitest.dev/guide/test-context#ontestfinished}
	*/
	readonly onTestFinished: (fn: OnTestFinishedHandler, timeout?: number) => void;
	/**
	* Mark tests as skipped. All execution after this call will be skipped.
	* This function throws an error, so make sure you are not catching it accidentally.
	* @see {@link https://vitest.dev/guide/test-context#skip}
	*/
	readonly skip: {
		(note?: string): never;
		(condition: boolean, note?: string): void;
	};
	/**
	* Add a test annotation that will be displayed by your reporter.
	* @see {@link https://vitest.dev/guide/test-context#annotate}
	*/
	readonly annotate: {
		(message: string, type?: string, attachment?: TestAttachment): Promise<TestAnnotation>;
		(message: string, attachment?: TestAttachment): Promise<TestAnnotation>;
	};
	/**
	* `expect` instance bound to the current test.
	*
	* This API is useful for running snapshot tests concurrently because global expect cannot track them.
	*/
	readonly expect: ExpectStatic;
	/**
	* Create a benchmark to run. It will be reported after the test is finished.
	* @see {@link https://vitest.dev/guide/benchmarking}
	*/
	readonly bench: Bench;
}
type OnTestFailedHandler = (context: TestContext) => Awaitable<void>;
type OnTestFinishedHandler = (context: TestContext) => Awaitable<void>;
interface TaskHook<HookListener> {
	(fn: HookListener, timeout?: number): void;
}
type SequenceHooks = "stack" | "list" | "parallel";
type SequenceSetupFiles = "list" | "parallel";
/**
* Represents a file or data attachment associated with a test artifact.
*
* Attachments can be either path-based (via `path`) or inline content (via `body`).
* The `contentType` helps consumers understand how to interpret the attachment data.
*/
interface TestAttachment {
	/** MIME type of the attachment (e.g., 'image/png', 'text/plain') */
	contentType?: string;
	/** Local file path or external HTTP(S) URL to the attachment. Relative paths are resolved from the project root. */
	path?: string;
	/** Inline attachment content as a string or raw binary data */
	body?: string | Uint8Array | undefined;
	/**
	* @experimental
	* How the string `body` is encoded.
	* - `'base64'` (default): body is already base64-encoded
	* - `'utf-8'`: body is a utf8 string
	*
	* `body: Uint8Array` is always auto-encoded to string with `bodyEncoding: 'base64'`
	* regardless of this option.
	*/
	bodyEncoding?: "base64" | "utf-8";
}
interface Location {
	/** Line number in the source file (1-indexed) */
	line: number;
	/** Column number in the line (1-indexed) */
	column: number;
}
interface FileLocation extends Location {
	/** Line number in the source file (1-indexed) */
	line: number;
	/** Column number in the line (1-indexed) */
	column: number;
	/** Path to the source file */
	file: string;
}
/**
* Source code location information for a test artifact.
*
* Indicates where in the source code the artifact originated from.
*/
interface TestArtifactLocation extends FileLocation {}
/**
* @experimental
*
* Base interface for all test artifacts.
*
* Extend this interface when creating custom test artifacts. Vitest automatically manages the `attachments` array and injects the `location` property to indicate where the artifact was created in your test code.
*
* **Important**: when running with [`api.allowWrite`](https://vitest.dev/config/api#api-allowwrite) disabled, Vitest empties the `attachments` array on every artifact before reporting it.
*/
interface TestArtifactBase {
	/** File or data attachments associated with this artifact */
	attachments?: TestAttachment[];
	/** Source location where this artifact was created */
	location?: TestArtifactLocation;
}
/**
* @deprecated Use {@linkcode TestArtifactLocation} instead.
*
* Kept for backwards compatibility.
*/
type TestAnnotationLocation = TestArtifactLocation;
interface TestAnnotation {
	message: string;
	type: string;
	location?: TestArtifactLocation;
	attachment?: TestAttachment;
}
/**
* @experimental
*
* Artifact type for test annotations.
*/
interface TestAnnotationArtifact extends TestArtifactBase {
	type: "internal:annotation";
	annotation: TestAnnotation;
}
interface VisualRegressionArtifactAttachment extends TestAttachment {
	name: "reference" | "actual" | "diff";
	width: number;
	height: number;
}
/**
* @experimental
*
* Artifact type for visual regressions.
*/
interface VisualRegressionArtifact extends TestArtifactBase {
	type: "internal:toMatchScreenshot";
	kind: "visual-regression";
	message: string;
	attachments: VisualRegressionArtifactAttachment[];
}
/**
* @experimental
*/
interface BrowserTraceArtifact extends TestArtifactBase {
	type: "internal:browserTrace";
	data: unknown;
}
interface FailureScreenshotArtifactAttachment extends TestAttachment {
	path: string;
	/** Original file system path to the screenshot, before attachment resolution */
	originalPath: string;
	body?: undefined;
}
/**
* @experimental
*
* Artifact type for failure screenshots.
*/
interface FailureScreenshotArtifact extends TestArtifactBase {
	type: "internal:failureScreenshot";
	attachments: [FailureScreenshotArtifactAttachment] | [];
	/** The zero-based retry index of the attempt that took the screenshot. */
	retryIndex?: number;
	/** The zero-based repeat index of the attempt that took the screenshot. */
	repeatIndex?: number;
}
/**
* @experimental
* @advanced
*
* Registry for custom test artifact types.
*
* Augment this interface to register custom artifact types that your tests can produce.
*
* Each custom artifact should extend {@linkcode TestArtifactBase} and include a unique `type` discriminator property.
*
* @remarks
* - Use a `Symbol` as the **registry key** to guarantee uniqueness
* - The `type` property should follow the pattern `'package-name:artifact-name'`, `'internal:'` is a reserved prefix
* - Use `attachments` to include files or data; extend {@linkcode TestAttachment} for custom metadata
* - `location` property is automatically injected to indicate where the artifact was created
*
* @example
*  ```ts
* // Define custom attachment type for generated PDF
* interface PDFAttachment extends TestAttachment {
*   contentType: 'application/pdf'
*   body: Uint8Array
*   pageCount: number
*   fileSize: number
* }
*
* interface PDFGenerationArtifact extends TestArtifactBase {
*   type: 'my-plugin:pdf-generation'
*   templateName: string
*   isValid: boolean
*   attachments: [PDFAttachment]
* }
*
* // Use a symbol to guarantee key uniqueness
* const pdfKey = Symbol('pdf-generation')
*
* declare module 'vitest' {
*   interface TestArtifactRegistry {
*     [pdfKey]: PDFGenerationArtifact
*   }
* }
*
* // Custom assertion for PDF generation
* async function toGenerateValidPDF(
*   this: MatcherState,
*   actual: PDFTemplate,
*   data: Record<string, unknown>
* ): AsyncExpectationResult {
*   const pdfBuffer = await actual.render(data)
*   const validation = await validatePDF(pdfBuffer)
*
*   await recordArtifact(this.task, {
*     type: 'my-plugin:pdf-generation',
*     templateName: actual.name,
*     isValid: validation.success,
*     attachments: [{
*       contentType: 'application/pdf',
*       body: pdfBuffer,
*       pageCount: validation.pageCount,
*       fileSize: pdfBuffer.byteLength
*     }]
*   })
*
*   return {
*     pass: validation.success,
*     message: () => validation.success
*       ? `Generated valid PDF with ${validation.pageCount} pages`
*       : `Invalid PDF: ${validation.error}`
*   }
* }
* ```
*/
interface TestArtifactRegistry {}
/**
* @experimental
*
* Union type of all test artifacts, including built-in and custom registered artifacts.
*
* This type automatically includes all artifacts registered via {@link TestArtifactRegistry}.
*/
type TestArtifact = BrowserTraceArtifact | FailureScreenshotArtifact | TestAnnotationArtifact | VisualRegressionArtifact | TestArtifactRegistry[keyof TestArtifactRegistry];
/**
* Possible options to run a single file in a test.
*/
interface FileSpecification {
	filepath: string;
	fileTags?: string[];
	testLocations?: number[] | undefined;
	testNamePattern?: RegExp | undefined;
	testTagsFilter?: string[] | undefined;
	testIds?: string[] | undefined;
	testNames?: string[] | undefined;
}
type VitestRunnerImportSource = "collect" | "setup";
type CancelReason = "keyboard-input" | "test-failure" | (string & Record<string, never>);
interface TestTryOptions {
	retry: number;
	repeats: number;
}
interface VitestRunner {
	/**
	* First thing that's getting called before actually collecting and running tests.
	*/
	onBeforeCollect?: (paths: string[]) => unknown;
	/**
	* Called after the file task was created but not collected yet.
	*/
	onCollectStart?: (file: File) => unknown;
	/**
	* Called after collecting tests and before "onBeforeRun".
	*/
	onCollected?: (files: File[]) => unknown;
	/**
	* Called when test runner should cancel next test runs.
	* Runner should listen for this method and mark tests and suites as skipped in
	* "onBeforeRunSuite" and "onBeforeRunTask" when called.
	*/
	cancel?: (reason: CancelReason) => unknown;
	/**
	* Called before running a single test. Doesn't have "result" yet.
	*/
	onBeforeRunTask?: (test: Test) => unknown;
	/**
	* Called before actually running the test function. Already has "result" with "state" and "startTime".
	*/
	onBeforeTryTask?: (test: Test, options: TestTryOptions) => unknown;
	/**
	* When the task has finished running, but before cleanup hooks are called
	*/
	onTaskFinished?: (test: Test) => unknown;
	/**
	* Called after result and state are set.
	*/
	onAfterRunTask?: (test: Test) => unknown;
	/**
	* Called right after running the test function. Doesn't have new state yet. Will not be called, if the test function throws.
	*/
	onAfterTryTask?: (test: Test, options: TestTryOptions) => unknown;
	/**
	* Called after the retry resolution happened. Unlike `onAfterTryTask`, the test now has a new state.
	* All `after` hooks were also called by this point.
	*/
	onAfterRetryTask?: (test: Test, options: TestTryOptions) => unknown;
	/**
	* Called before running a single suite. Doesn't have "result" yet.
	*/
	onBeforeRunSuite?: (suite: Suite) => unknown;
	/**
	* Called after running a single suite. Has state and result.
	*/
	onAfterRunSuite?: (suite: Suite) => unknown;
	/**
	* If defined, will be called instead of usual Vitest suite partition and handling.
	* "before" and "after" hooks will not be ignored.
	*/
	runSuite?: (suite: Suite) => Promise<void>;
	/**
	* If defined, will be called instead of usual Vitest handling. Useful, if you have your custom test function.
	* "before" and "after" hooks will not be ignored.
	*/
	runTask?: (test: Test) => Promise<void>;
	/**
	* Called, when a task is updated. The same as "onTaskUpdate" in a reporter, but this is running in the same thread as tests.
	*/
	onTaskUpdate?: (task: TaskResultPack[], events: TaskEventPack[]) => Promise<void>;
	/**
	* Called when annotation is added via the `context.annotate` method.
	*/
	onTestAnnotate?: (test: Test, annotation: TestAnnotation) => Promise<TestAnnotation>;
	/**
	* @experimental
	*
	* Called when artifacts are recorded on tests via the `recordArtifact` utility.
	*/
	onTestArtifactRecord?: <Artifact extends TestArtifact>(test: Test, artifact: Artifact) => Promise<Artifact>;
	/**
	* Called before running all tests in collected paths.
	*/
	onBeforeRunFiles?: (files: File[]) => unknown;
	/**
	* Called right after running all tests in collected paths.
	*/
	onAfterRunFiles?: (files: File[]) => unknown;
	/**
	* Called when new context for a test is defined. Useful if you want to add custom properties to the context.
	* If you only want to define custom context, consider using "beforeAll" in "setupFiles" instead.
	*
	* @see https://vitest.dev/advanced/runner#your-task-function
	*/
	extendTaskContext?: (context: TestContext) => TestContext;
	/**
	* Called when test and setup files are imported. Can be called in two situations: when collecting tests and when importing setup files.
	*/
	importFile: (filepath: string, source: VitestRunnerImportSource) => unknown;
	/**
	* Function that is called when the runner attempts to get the value when `test.extend` is used with `{ injected: true }`
	*/
	injectValue?: (key: string) => unknown;
	/**
	* Gets the time spent importing each individual non-externalized file that Vitest collected.
	*/
	getImportDurations?: () => Record<string, ImportDuration>;
	/**
	* Gets the cumulative time the worker has spent waiting for the server to
	* resolve and transform modules. Used to attribute the transform wait to the
	* setup and collect phases.
	*/
	getModuleFetchDuration?: () => number;
	/**
	* Publicly available configuration.
	*/
	config: SerializedConfig;
	/**
	* The name of the current pool. Can affect how stack trace is inferred on the server side.
	*/
	pool?: string;
	/**
	* The current Vite environment that processes the files on the server.
	*/
	viteEnvironment?: string;
	onCleanupWorkerContext?: (cleanup: () => unknown) => void;
	trace?<T>(name: string, cb: () => T): T;
	trace?<T>(name: string, attributes: Record<string, any>, cb: () => T): T;
}

/**
* Config that tests have access to.
*/
interface SerializedConfig {
	root: string;
	setupFiles: string[];
	name: string | undefined;
	passWithNoTests: boolean;
	testNamePattern: RegExp | undefined;
	allowOnly: boolean;
	sequence: {
		shuffle?: boolean;
		concurrent?: boolean;
		seed: number;
		hooks: SequenceHooks;
		setupFiles: SequenceSetupFiles;
	};
	maxConcurrency: number;
	testTimeout: number;
	hookTimeout: number;
	retry: SerializableRetry;
	repeats?: number;
	includeTaskLocation: boolean | undefined;
	tags: TestTagDefinition[];
	tagsFilter: string[] | undefined;
	strictTags: boolean;
	color?: LabelColor;
	globals: boolean;
	injectCjsGlobals: boolean;
	base: string | undefined;
	snapshotEnvironment?: string;
	disableConsoleIntercept: boolean | undefined;
	runner: string | undefined;
	isolate: boolean;
	maxWorkers: number;
	bail: number | undefined;
	environmentOptions?: Record<string, any>;
	clearMocks: boolean;
	mockReset: boolean;
	restoreMocks: boolean;
	unstubGlobals: boolean;
	unstubEnvs: boolean;
	fakeTimers: FakeTimersConfig;
	defines: Record<string, any>;
	expect: {
		requireAssertions?: boolean;
		poll?: {
			timeout?: number;
			interval?: number;
		};
	};
	printConsoleTrace: boolean | undefined;
	deps: {
		web: {
			transformAssets?: boolean;
			transformCss?: boolean;
			transformGlobPattern?: RegExp | RegExp[];
		};
		optimizer: Record<string, {
			enabled: boolean;
		}>;
		interopDefault: boolean | undefined;
		moduleDirectories: string[] | undefined;
	};
	snapshotOptions: {
		updateSnapshot: SnapshotUpdateState;
		expand: boolean | undefined;
		snapshotFormat: PrettyFormatOptions | undefined;
		/**
		* only exists for tests, not available in the main process
		*/
		snapshotEnvironment: SnapshotEnvironment;
	};
	pool: string;
	snapshotSerializers: string[];
	chaiConfig: {
		includeStack?: boolean;
		showDiff?: boolean;
		truncateThreshold?: number;
	} | undefined;
	taskTitleValueFormatTruncate: number;
	api: {
		allowExec: boolean | undefined;
		allowWrite: boolean | undefined;
	};
	diff: string | SerializedDiffOptions | undefined;
	inspect: boolean | string | undefined;
	inspectBrk: boolean | string | undefined;
	inspector: {
		enabled?: boolean;
		port?: number;
		host?: string;
		waitForDebugger?: boolean;
	};
	watch: boolean;
	env: Record<string, any>;
	browser: {
		name: string;
		headless: boolean;
		ui: boolean;
		viewport: {
			width: number;
			height: number;
		};
		locators: {
			testIdAttribute: string;
			exact: boolean;
			errorFormat: "html" | "aria" | "all";
		};
		screenshotFailures: boolean;
		providerOptions: {
			actionTimeout?: number;
		};
		trace: BrowserTraceViewMode;
		traceView: {
			enabled: boolean;
			mode: BrowserTraceViewRecordingMode;
			recordCanvas: boolean;
			inlineImages: boolean;
			ariaSnapshot: boolean;
		};
		trackUnhandledErrors: boolean;
		importMapMocks: boolean | undefined;
		detailsPanelPosition: "right" | "bottom";
	};
	standalone: boolean;
	logHeapUsage: boolean | undefined;
	detectAsyncLeaks: boolean;
	coverage: SerializedCoverageConfig;
	benchmark: {
		enabled: boolean;
		retainSamples: boolean;
		provider: string | undefined;
		suppressExportGetterWarnings: boolean;
		projectName: string;
	};
	serializedDefines: string;
	fsModuleCache: boolean;
	experimental: {
		importDurations: {
			print: boolean | "on-warn";
			limit: number;
			failOnDanger: boolean;
			thresholds: {
				warn: number;
				danger: number;
			};
		};
		viteModuleRunner: boolean;
		nodeLoader: boolean;
		recordDependencies: boolean;
		traceTimeline: boolean;
		openTelemetry: {
			enabled: boolean;
			sdkPath?: string;
			browserSdkPath?: string;
		} | undefined;
	};
	mergeReportsLabel: string | undefined;
	slowTestThreshold: number | undefined;
	disableColors: boolean;
	attachmentsDir: string;
}
interface SerializedCoverageConfig {
	provider: "istanbul" | "v8" | "custom" | undefined;
	reportsDirectory: string;
	/** Directory where workers write raw coverage results, shard-aware */
	coverageFilesDirectory: string;
	htmlDir: string | undefined;
	enabled: boolean;
	customProviderModule: string | undefined;
	autoAttachSubprocess: boolean;
}
interface SerializedRootConfig extends SerializedConfig {
	projects: SerializedConfig[];
}
type RuntimeConfig = Pick<SerializedConfig, "allowOnly" | "testTimeout" | "hookTimeout" | "clearMocks" | "mockReset" | "restoreMocks" | "fakeTimers" | "maxConcurrency" | "expect" | "printConsoleTrace"> & {
	sequence?: {
		hooks?: SequenceHooks;
	};
};
type RuntimeOptions = Partial<RuntimeConfig>;
type BrowserTraceViewRecordingMode = "off" | "on" | "failure-only";
type BrowserTraceViewMode = "on" | "off" | "on-first-retry" | "on-all-retries" | "retain-on-failure";

export { fn as B, _vitest_spy as _, createChainable as a2, afterAll as b9, afterEach as ba, aroundAll as bb, aroundEach as bc, beforeAll as bd, beforeEach as be, onTestFailed as bf, onTestFinished as bg, disableDefaultColors as bj, SnapshotState as bq, format as f, inspect as i, stringify as s, spyOn as z };
export type { TestTryOptions as $, Awaitable as A, MaybeMockedDeep as C, DiffOptions as D, ExpectStatic as E, FileSpecification as F, MaybeMocked as G, MaybePartiallyMocked as H, MaybePartiallyMockedDeep as I, MockInstance as J, TestAPI as K, LabelColor as L, ModuleGraphData as M, SuiteCollector as N, SuiteAPI as O, ParsedStack as P, Suite as Q, RuntimeOptions as R, SerializedCoverageConfig as S, TestError as T, UserConsoleLog as U, VitestRunner as V, SuiteHooks as W, VitestRunnerImportSource as X, Task as Y, CancelReason as Z, File as a, TestArtifactLocation as a$, TestContext as a0, ImportDuration as a1, AfterSuiteRunMeta as a3, Assertion as a4, AsymmetricMatchersContaining as a5, BaselineData as a6, Bench as a7, BenchFn as a8, BenchFnOptions as a9, Mocked as aA, MockedClass as aB, MockedFunction as aC, MockedObject as aD, OnTestFailedHandler as aE, OnTestFinishedHandler as aF, RunMode as aG, TaskBase as aH, TaskResult as aI, TaskResultAttempt as aJ, RuntimeConfig as aK, SerializedError as aL, SnapshotData as aM, SnapshotMatchOptions as aN, SnapshotResult as aO, SnapshotSerializer as aP, SnapshotStateOptions as aQ, SnapshotSummary as aR, SnapshotUpdateState as aS, SuiteFactory as aT, SuiteOptions as aU, TaskCustomOptions as aV, TaskMeta as aW, TaskState as aX, TestAnnotationArtifact as aY, TestAnnotationLocation as aZ, TestArtifactBase as a_, BenchFromSource as aa, BenchOptions as ab, BenchRegistration as ac, BenchRegistrationInput as ad, BenchResult as ae, BenchRunOptions as af, BenchStorage as ag, BenchmarkGroup as ah, BenchmarkProvider as ai, BrowserTraceArtifact as aj, DeeplyAllowMatchers as ak, DomainMatchResult as al, FailureScreenshotArtifact as am, JestAssertion as an, RawMatcherFn as ao, Matchers as ap, MatchersObject as aq, MockContext as ar, MockResult as as, MockResultIncomplete as at, MockResultReturn as au, MockResultThrow as av, MockSettledResult as aw, MockSettledResultFulfilled as ax, MockSettledResultIncomplete as ay, MockSettledResultRejected as az, SerializedConfig as b, TestArtifactRegistry as b0, TestAttachment as b1, TestBenchmark as b2, TestBenchmarkTask as b3, TestFunction as b4, TestOptions as b5, TestTags as b6, UncheckedSnapshot as b7, VisualRegressionArtifact as b8, SequenceHooks as bh, SequenceSetupFiles as bi, SerializableRetry as bk, BrowserTraceViewMode as bl, BrowserTraceViewRecordingMode as bm, Arrayable as bn, AsyncLeak as bo, PrettyFormatOptions as bp, PromisifyAssertion as br, Tester as bs, Plugin as bt, SnapshotEnvironment as bu, SnapshotEnvironmentOptions as bv, FetchCachedFileSystemResult as bw, ResolveFunctionResult as bx, SerializedDiffOptions as c, StringifyOptions as d, FakeTimersConfig as e, TestTagDefinition as g, TestAnnotation as h, TestArtifact as j, TaskResultPack as k, TaskEventPack as l, SerializedRootConfig as m, Test as n, TaskPopulated as o, ProvidedContext as p, MatcherState as q, SyncExpectationResult as r, AsyncExpectationResult as t, DomainSnapshotAdapter as u, ExpectationResult as v, Procedure as w, Mock as x, TemporalTimelike as y };
