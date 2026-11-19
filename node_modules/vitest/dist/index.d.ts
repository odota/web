/// <reference types="chai" />
import { a as File, A as Awaitable, h as TestAnnotation, j as TestArtifact, k as TaskResultPack, l as TaskEventPack, U as UserConsoleLog, m as SerializedRootConfig, L as LabelColor, M as ModuleGraphData, n as Test, o as TaskPopulated, E as ExpectStatic, p as ProvidedContext, q as MatcherState, r as SyncExpectationResult, t as AsyncExpectationResult, u as DomainSnapshotAdapter, v as ExpectationResult, w as Procedure, x as Mock, e as FakeTimersConfig, y as TemporalTimelike, z as spyOn, B as fn, C as MaybeMockedDeep, G as MaybeMocked, H as MaybePartiallyMocked, I as MaybePartiallyMockedDeep, J as MockInstance, R as RuntimeOptions, K as TestAPI, N as SuiteCollector, O as SuiteAPI, Q as Suite, W as SuiteHooks, V as VitestRunner, b as SerializedConfig, X as VitestRunnerImportSource, Y as Task, Z as CancelReason, $ as TestTryOptions, a0 as TestContext, a1 as ImportDuration, a2 as createChainable } from './chunks/config.d.B3YV4t0O.js';
export { a3 as AfterSuiteRunMeta, a4 as Assertion, a5 as AsymmetricMatchersContaining, a6 as BaselineData, a7 as Bench, a8 as BenchFn, a9 as BenchFnOptions, aa as BenchFromSource, ab as BenchOptions, ac as BenchRegistration, ad as BenchRegistrationInput, ae as BenchResult, af as BenchRunOptions, ag as BenchStorage, ah as BenchmarkGroup, ai as BenchmarkProvider, aj as BrowserTraceArtifact, ak as DeeplyAllowMatchers, D as DiffOptions, al as DomainMatchResult, am as FailureScreenshotArtifact, an as JestAssertion, ao as Matcher, ap as Matchers, aq as MatchersObject, ar as MockContext, as as MockResult, at as MockResultIncomplete, au as MockResultReturn, av as MockResultThrow, aw as MockSettledResult, ax as MockSettledResultFulfilled, ay as MockSettledResultIncomplete, az as MockSettledResultRejected, aA as Mocked, aB as MockedClass, aC as MockedFunction, aD as MockedObject, aE as OnTestFailedHandler, aF as OnTestFinishedHandler, P as ParsedStack, aG as RunMode, aH as RunnerTaskBase, aI as RunnerTaskResult, aJ as RunnerTaskResultAttempt, aK as RuntimeConfig, S as SerializedCoverageConfig, aL as SerializedError, aM as SnapshotData, aN as SnapshotMatchOptions, aO as SnapshotResult, aP as SnapshotSerializer, aQ as SnapshotStateOptions, aR as SnapshotSummary, aS as SnapshotUpdateState, aT as SuiteFactory, aU as SuiteOptions, aV as TaskCustomOptions, aW as TaskMeta, aX as TaskState, aY as TestAnnotationArtifact, aZ as TestAnnotationLocation, a_ as TestArtifactBase, a$ as TestArtifactLocation, b0 as TestArtifactRegistry, b1 as TestAttachment, b2 as TestBenchmark, b3 as TestBenchmarkTask, T as TestError, b4 as TestFunction, b5 as TestOptions, g as TestTagDefinition, b6 as TestTags, b7 as UncheckedSnapshot, b8 as VisualRegressionArtifact, b9 as afterAll, ba as afterEach, bb as aroundAll, bc as aroundEach, bd as beforeAll, be as beforeEach, bf as onTestFailed, bg as onTestFinished } from './chunks/config.d.B3YV4t0O.js';
import { M as ModuleDefinitionDurationsDiagnostic, U as UntrackedModuleDefinitionDiagnostic, S as SerializedTestSpecification, a as ModuleDefinitionDiagnostic, b as ModuleDefinitionLocation, c as SourceModuleDiagnostic, d as SourceModuleLocations } from './chunks/browser.d.C7tWgUvw.js';
export { B as BrowserTesterOptions } from './chunks/browser.d.C7tWgUvw.js';
import { c as createFileTask } from './chunks/task-utils.d.D-gFPNFi.js';
import { B as BirpcReturn } from './chunks/worker.d.CyJRpyfZ.js';
export { C as ContextRPC, a as ContextTestEnvironment, T as TestExecutionMethod, W as WorkerGlobalState } from './chunks/worker.d.CyJRpyfZ.js';
import { Disposable } from 'vitest/optional-runtime-types.js';
import { ModuleMockFactoryWithHelper, ModuleMockOptions } from '@vitest/mocker';
export { V as EvaluatedModules } from './chunks/evaluatedModules.d.BxJ5omdx.js';
import { T as Traces } from './chunks/rpc.d.3FOhdFx8.js';
export { R as RunnerRPC, a as RuntimeRPC } from './chunks/rpc.d.3FOhdFx8.js';
export { ExpectTypeOf, expectTypeOf } from 'expect-type';
export { BenchOptions as BenchCompareOptions } from 'tinybench';
import * as chai from 'chai';
export { chai };
import 'vite/module-runner';
import './chunks/environment.d.BFQtFKdZ.js';

interface SourceMap {
	file: string;
	mappings: string;
	names: string[];
	sources: string[];
	sourcesContent?: string[];
	version: number;
	toString: () => string;
	toUrl: () => string;
}
interface ExternalResult {
	source?: string;
}
interface TransformResultWithSource {
	code: string;
	map: SourceMap | {
		mappings: "";
	} | null;
	etag?: string;
	deps?: string[];
	dynamicDeps?: string[];
	source?: string;
	transformTime?: number;
	modules?: ModuleDefinitionDurationsDiagnostic[];
	untrackedModules?: UntrackedModuleDefinitionDiagnostic[];
}
interface WebSocketHandlers {
	getFiles: () => File[];
	getTestFiles: () => Promise<SerializedTestSpecification[]>;
	getPaths: () => string[];
	getConfig: () => SerializedRootConfig;
	/**
	* @deprecated Use `getConfig().projects` instead.
	*/
	getResolvedProjectLabels: () => {
		name: string;
		color?: LabelColor;
	}[];
	getModuleGraph: (projectName: string, id: string, viteEnvironment?: string) => Promise<ModuleGraphData>;
	getTransformResult: (projectName: string, id: string, testFileId: string) => Promise<TransformResultWithSource | undefined>;
	getExternalResult: (id: string, testFileId: string) => Promise<ExternalResult | undefined>;
	readTestFile: (id: string) => Promise<string | null>;
	saveTestFile: (id: string, content: string) => Promise<void>;
	rerun: (files: string[], resetTestNamePattern?: boolean) => Promise<void>;
	rerunTask: (id: string) => Promise<void>;
	updateSnapshot: (file?: File) => Promise<void>;
	getUnhandledErrors: () => unknown[];
}
interface WebSocketEvents {
	onCollected?: (files?: File[]) => Awaitable<void>;
	onFinished?: (files: File[], errors: unknown[], coverage?: unknown, executionTime?: number) => Awaitable<void>;
	onTestAnnotate?: (testId: string, annotation: TestAnnotation) => Awaitable<void>;
	onTestArtifactRecord?: (testId: string, artifact: TestArtifact) => Awaitable<void>;
	onTaskUpdate?: (packs: TaskResultPack[], events: TaskEventPack[]) => Awaitable<void>;
	onTestRemoved?: (path?: string) => Awaitable<void>;
	onUserConsoleLog?: (log: UserConsoleLog) => Awaitable<void>;
	onPathsCollected?: (paths?: string[]) => Awaitable<void>;
	onSpecsCollected?: (specs?: SerializedTestSpecification[], startTime?: number) => Awaitable<void>;
	onFinishedReportCoverage: () => void;
}
type WebSocketRPC = BirpcReturn<WebSocketEvents, WebSocketHandlers>;

declare function createExpect(test?: Test | TaskPopulated): ExpectStatic;
declare const globalExpect: ExpectStatic;
declare const assert: Chai.Assert;
declare const should: () => Chai.Should;

/**
* Gives access to injected context provided from the main thread.
* This usually returns a value provided by `globalSetup` or an external library.
*/
declare function inject<T extends keyof ProvidedContext & string>(key: T): ProvidedContext[T];

/**
* Composable snapshot matcher helpers for building custom snapshot matchers
* with `expect.extend`.
*
* @experimental
* @see https://vitest.dev/guide/snapshot.html#custom-snapshot-matchers
*/
declare const Snapshots: {
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
	toMatchSnapshot(this: MatcherState, received: unknown, propertiesOrHint?: object | string, hint?: string): SyncExpectationResult;
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
	toMatchInlineSnapshot(this: MatcherState, received: unknown, propertiesOrInlineSnapshot?: object | string, inlineSnapshotOrHint?: string, hint?: string): SyncExpectationResult;
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
	toMatchFileSnapshot(this: MatcherState, received: unknown, filepath: string, hint?: string): AsyncExpectationResult;
	/**
	* Composable for building custom domain-based snapshot matchers via `expect.extend`.
	*
	* Call this from a matcher and pass the domain adapter that defines capture,
	* rendering, parsing, and semantic matching behavior.
	*
	* @experimental
	*/
	toMatchDomainSnapshot(this: MatcherState, domain: DomainSnapshotAdapter<any, any>, received: unknown): ExpectationResult;
	/**
	* Composable for building custom domain-based inline snapshot matchers via `expect.extend`.
	*
	* Call this from a matcher and pass the domain adapter that defines capture,
	* rendering, parsing, and semantic matching behavior.
	*
	* @experimental
	*/
	toMatchDomainInlineSnapshot(this: MatcherState, domain: DomainSnapshotAdapter<any, any>, received: unknown, inlineSnapshot?: string): ExpectationResult;
};

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
declare function isWhenChain(input: object): input is When<Procedure>;
interface BehaviorOptions {
	/**
	* How many times this behavior should apply before being exhausted.
	*
	* By default it applies indefinitely.
	*
	* @default Number.POSITIVE_INFINITY
	*/
	times?: number | undefined;
}
type OnceBehaviorOptions = Omit<BehaviorOptions, "times">;
/**
* Fluent interface returned by {@linkcode When.calledWith} for defining behaviors on a specific set of arguments.
*
* Each `then*` method appends an action and returns the same instance, allowing multiple behaviors to be chained for the same argument set.
*
* @example
* vi.when(spy)
*   .calledWith('darkMode')
*   .thenReturn(true)
*   .thenReturnOnce(false)
*/
type CalledWithInstance<
	ReturnType,
	Fn extends Procedure
> = When<Fn> & {
	/**
	* Schedules a synchronous return value for when the spy is called with the registered arguments.
	*
	* @param value - The value to return.
	* @param options - Optional behavior configuration.
	* @returns The same {@linkcode when|vi.when} instance for chaining.
	*/
	thenReturn: (value: ReturnType, options?: BehaviorOptions | undefined) => CalledWithInstance<ReturnType, Fn>;
	/**
	* Schedules a resolved `Promise` return value for when the spy is called with the registered arguments.
	*
	* @param value - The value to resolve with.
	* @param options - Optional behavior configuration.
	* @returns The same {@linkcode when|vi.when} instance for chaining.
	*/
	thenResolve: (value: Awaited<ReturnType>, options?: BehaviorOptions | undefined) => CalledWithInstance<ReturnType, Fn>;
	/**
	* Schedules a synchronous return value for a single call with the registered arguments, then removes the behavior.
	*
	* @param value - The value to return.
	* @param options - Optional behavior configuration.
	* @returns The same {@linkcode when|vi.when} instance for chaining.
	*/
	thenReturnOnce: (value: ReturnType, options?: OnceBehaviorOptions | undefined) => CalledWithInstance<ReturnType, Fn>;
	/**
	* Schedules a resolved `Promise` return value for a single call with the registered arguments, then removes the behavior.
	*
	* @param value - The value to resolve with.
	* @param options - Optional behavior configuration.
	* @returns The same {@linkcode when|vi.when} instance for chaining.
	*/
	thenResolveOnce: (value: Awaited<ReturnType>, options?: OnceBehaviorOptions | undefined) => CalledWithInstance<ReturnType, Fn>;
	/**
	* Schedules a thrown error for when the spy is called with the registered arguments.
	*
	* @param value - The value to throw.
	* @param options - Optional behavior configuration.
	* @returns The same {@linkcode when|vi.when} instance for chaining.
	*/
	thenThrow: (value: unknown, options?: BehaviorOptions | undefined) => CalledWithInstance<ReturnType, Fn>;
	/**
	* Schedules a rejected `Promise` for when the spy is called with the registered arguments.
	*
	* @param value - The value to reject with.
	* @param options - Optional behavior configuration.
	* @returns The same {@linkcode when|vi.when} instance for chaining.
	*/
	thenReject: (value: unknown, options?: BehaviorOptions | undefined) => CalledWithInstance<ReturnType, Fn>;
	/**
	* Schedules a thrown error for a single call with the registered arguments, then removes the behavior.
	*
	* @param value - The value to throw.
	* @param options - Optional behavior configuration.
	* @returns The same {@linkcode when|vi.when} instance for chaining.
	*/
	thenThrowOnce: (value: unknown, options?: OnceBehaviorOptions | undefined) => CalledWithInstance<ReturnType, Fn>;
	/**
	* Schedules a rejected `Promise` for a single call with the registered arguments, then removes the behavior.
	*
	* @param value - The value to reject with.
	* @param options - Optional behavior configuration.
	* @returns The same {@linkcode when|vi.when} instance for chaining.
	*/
	thenRejectOnce: (value: unknown, options?: OnceBehaviorOptions | undefined) => CalledWithInstance<ReturnType, Fn>;
};
/**
* A handle returned by {@linkcode when|vi.when} that lets define per-argument behaviors on a spy and check whether all defined behaviors have been consumed.
*
* Implements `Symbol.dispose` so it can be used with the `using` keyword. When the block exits the spy's original implementation is automatically restored.
*
* @example
* using w = vi.when(spy)
*   .calledWith('hello')
*   .thenReturn('HELLO')
*/
interface When<Fn extends Procedure> extends Disposable {
	/**
	* Defines behavior for a specific set of arguments.
	*
	* Multiple behaviors can be stacked for the same arguments. They are matched last-registered first (LIFO stack, last in first out), so earlier entries act as fallbacks once later ones are exhausted.
	*
	* @param args - The arguments to match against.
	* @returns A {@linkcode CalledWithInstance} for chaining `then*` actions.
	*
	* @example
	* vi.when(spy)
	*   .calledWith(expect.any(Number))
	*   .thenReturn(0)
	*
	* @example
	* // Stack behaviors: first call returns `false`, subsequent calls return `true`
	* vi.when(spy)
	*   .calledWith('darkMode')
	*   .thenReturn(true)
	*   .thenReturnOnce(false)
	*/
	calledWith: (...args: Parameters<Fn>) => CalledWithInstance<ReturnType<Fn>, Fn>;
}
/**
* Options for {@linkcode when|vi.when}.
*/
interface WhenOptions<Fn extends Procedure = Procedure> {
	/**
	* Controls what happens when the spy is called with arguments that have no matching `calledWith` behavior.
	*
	* Valid configurations are:
	* - `'passthrough'`: delegates to the spy's original implementation (default)
	* - `'throw'`: throws an error
	* - a function: called with the unmatched arguments; its return value is used
	*
	* @default
	* 'passthrough'
	*
	* @example
	* vi.when(spy, { onUnmatched: 'throw' })
	*   .calledWith(1)
	*   .thenReturn({ id: 1, name: 'Alice' })
	*
	* expect(spy(1)).toEqual({ id: 1, name: 'Alice' })
	* expect(() => spy(2)).toThrow()
	*/
	onUnmatched?: "throw" | "passthrough" | Fn | undefined;
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
declare function when<Fn extends Procedure>(spy: Fn | Mock<Fn>, options?: WhenOptions<Fn>): When<Fn>;

type WaitForCallback<T> = () => T | Promise<T>;
interface WaitForOptions {
	/**
	* @description Time in ms between each check callback
	* @default 50ms
	*/
	interval?: number;
	/**
	* @description Time in ms after which the throw a timeout error
	* @default 1000ms
	*/
	timeout?: number;
	/**
	* @description Message that describes what is being waited for. It prefixes the error and names the trace step
	*/
	message?: string;
}
declare function waitFor<T>(callback: WaitForCallback<T>, options?: number | WaitForOptions): Promise<T>;
type WaitUntilCallback<T> = () => T | Promise<T>;
interface WaitUntilOptions extends Pick<WaitForOptions, "interval" | "timeout" | "message"> {}
type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;
declare function waitUntil<T>(callback: WaitUntilCallback<T>, options?: number | WaitUntilOptions): Promise<Truthy<T>>;

type ESModuleExports = Record<string, unknown>;
interface VitestUtils {
	/**
	* Checks if fake timers are enabled.
	*/
	isFakeTimers: () => boolean;
	/**
	* This method wraps all further calls to timers until [`vi.useRealTimers()`](https://vitest.dev/api/vi#vi-userealtimers) is called.
	*/
	useFakeTimers: (config?: FakeTimersConfig) => VitestUtils;
	/**
	* Restores mocked timers to their original implementations. All timers that were scheduled before will be discarded.
	*/
	useRealTimers: () => VitestUtils;
	/**
	* This method will call every timer that was initiated after [`vi.useFakeTimers`](https://vitest.dev/api/vi#vi-usefaketimers) call.
	* It will not fire any timer that was initiated during its call.
	*/
	runOnlyPendingTimers: () => VitestUtils;
	/**
	* This method will asynchronously call every timer that was initiated after [`vi.useFakeTimers`](https://vitest.dev/api/vi#vi-usefaketimers) call, even asynchronous ones.
	* It will not fire any timer that was initiated during its call.
	*/
	runOnlyPendingTimersAsync: () => Promise<VitestUtils>;
	/**
	* This method will invoke every initiated timer until the timer queue is empty. It means that every timer called during `runAllTimers` will be fired.
	* If you have an infinite interval, it will throw after 10,000 tries (can be configured with [`fakeTimers.loopLimit`](https://vitest.dev/config/faketimers#faketimers-looplimit)).
	*/
	runAllTimers: () => VitestUtils;
	/**
	* This method will asynchronously invoke every initiated timer until the timer queue is empty. It means that every timer called during `runAllTimersAsync` will be fired even asynchronous timers.
	* If you have an infinite interval, it will throw after 10 000 tries (can be configured with [`fakeTimers.loopLimit`](https://vitest.dev/config/faketimers#faketimers-looplimit)).
	*/
	runAllTimersAsync: () => Promise<VitestUtils>;
	/**
	* Calls every microtask that was queued by `process.nextTick`. This will also run all microtasks scheduled by themselves.
	*/
	runAllTicks: () => VitestUtils;
	/**
	* This method will invoke every initiated timer until the specified number of milliseconds is passed or the queue is empty - whatever comes first.
	*/
	advanceTimersByTime: (ms: number) => VitestUtils;
	/**
	* This method will invoke every initiated timer until the specified number of milliseconds is passed or the queue is empty - whatever comes first. This will include and await asynchronously set timers.
	*/
	advanceTimersByTimeAsync: (ms: number) => Promise<VitestUtils>;
	/**
	* Will call next available timer. Useful to make assertions between each timer call. You can chain call it to manage timers by yourself.
	*/
	advanceTimersToNextTimer: () => VitestUtils;
	/**
	* Will call next available timer and wait until it's resolved if it was set asynchronously. Useful to make assertions between each timer call.
	*/
	advanceTimersToNextTimerAsync: () => Promise<VitestUtils>;
	/**
	* Similar to [`vi.advanceTimersByTime`](https://vitest.dev/api/vi#vi-advancetimersbytime), but will advance timers by the milliseconds needed to execute callbacks currently scheduled with `requestAnimationFrame`.
	*/
	advanceTimersToNextFrame: () => VitestUtils;
	/**
	* Get the number of waiting timers.
	*/
	getTimerCount: () => number;
	/**
	* If fake timers are enabled, this method simulates a user changing the system clock (will affect date related API like `hrtime`, `performance.now` or `new Date()`) - however, it will not fire any timers.
	* If fake timers are not enabled, this method will only mock `Date.*` and `new Date()` calls.
	*/
	setSystemTime: (time: number | string | Date | TemporalTimelike) => VitestUtils;
	/**
	* Returns mocked current date. If date is not mocked the method will return `null`.
	*/
	getMockedSystemTime: () => Date | null;
	/**
	* When using `vi.useFakeTimers`, `Date.now` calls are mocked. If you need to get real time in milliseconds, you can call this function.
	*/
	getRealSystemTime: () => number;
	/**
	* Removes all timers that are scheduled to run. These timers will never run in the future.
	*/
	clearAllTimers: () => VitestUtils;
	/**
	* Controls how fake timers are advanced.
	* @param mode The mode to use for advancing timers.
	* - `manual`: The default behavior. Timers will only advance when you call one of `vi.advanceTimers...()` methods.
	* - `nextTimerAsync`: Timers will be advanced automatically to the next available timer after each macrotask.
	* - `interval`: Timers are advanced automatically by a specified interval.
	* @param interval The interval in milliseconds to use when `mode` is `'interval'`.
	*/
	setTimerTickMode: ((mode: "manual" | "nextTimerAsync") => VitestUtils) & ((mode: "interval", interval?: number) => VitestUtils);
	/**
	* Creates a spy on a method or getter/setter of an object similar to [`vi.fn()`](https://vitest.dev/api/vi#vi-fn). It returns a [mock function](https://vitest.dev/api/mock).
	* @example
	* ```ts
	* const cart = {
	*   getApples: () => 42
	* }
	*
	* const spy = vi.spyOn(cart, 'getApples').mockReturnValue(10)
	*
	* expect(cart.getApples()).toBe(10)
	* expect(spy).toHaveBeenCalled()
	* expect(spy).toHaveReturnedWith(10)
	* ```
	*/
	spyOn: typeof spyOn;
	/**
	* Creates a spy on a function, though can be initiated without one. Every time a function is invoked, it stores its call arguments, returns, and instances. Also, you can manipulate its behavior with [methods](https://vitest.dev/api/mock).
	*
	* If no function is given, mock will return `undefined`, when invoked.
	* @example
	* ```ts
	* const getApples = vi.fn(() => 0)
	*
	* getApples()
	*
	* expect(getApples).toHaveBeenCalled()
	* expect(getApples).toHaveReturnedWith(0)
	*
	* getApples.mockReturnValueOnce(5)
	*
	* expect(getApples()).toBe(5)
	* expect(getApples).toHaveNthReturnedWith(2, 5)
	* ```
	*/
	fn: typeof fn;
	when: typeof when;
	isWhenChain: typeof isWhenChain;
	/**
	* Wait for the callback to execute successfully. If the callback throws an error or returns a rejected promise it will continue to wait until it succeeds or times out.
	*
	* This is very useful when you need to wait for some asynchronous action to complete, for example, when you start a server and need to wait for it to start.
	* @example
	* ```ts
	* const server = createServer()
	*
	* await vi.waitFor(
	*   () => {
	*     if (!server.isReady)
	*       throw new Error('Server not started')
	*
	*     console.log('Server started')
	*   }, {
	*     timeout: 500, // default is 1000
	*     interval: 20, // default is 50
	*   }
	* )
	* ```
	*/
	waitFor: typeof waitFor;
	/**
	* Wraps a function to create an assertion helper. When an assertion fails inside the helper,
	* the error stack trace will point to where the helper was called, not inside the helper itself.
	* Works with both synchronous and asynchronous functions, and supports `expect.soft()`.
	*
	* @example
	* ```ts
	* const myEqual = vi.defineHelper((x, y) => {
	*   expect(x).toEqual(y)
	* })
	*
	* test('example', () => {
	*   myEqual('left', 'right') // Error points to this line
	* })
	* ```
	* Example output:
	* ```
	* FAIL  example.test.ts > example
	* AssertionError: expected 'left' to deeply equal 'right'
	*
	* Expected: "right"
	* Received: "left"
	*
	*  ❯ example.test.ts:6:3
	*       4| test('example', () => {
	*       5|   myEqual('left', 'right')
	*        |   ^
	*       6| })
	* ```
	* @param fn The assertion function to wrap
	* @returns A wrapped function with the same signature
	*/
	defineHelper: <F extends (...args: any) => any>(fn: F) => F;
	/**
	* This is similar to [`vi.waitFor`](https://vitest.dev/api/vi#vi-waitfor), but if the callback throws any errors, execution is immediately interrupted and an error message is received.
	*
	* If the callback returns a falsy value, the next check will continue until a truthy value is returned. This is useful when you need to wait for something to exist before taking the next step.
	* @example
	* ```ts
	* const element = await vi.waitUntil(
	*   () => document.querySelector('.element'),
	*   {
	*     timeout: 500, // default is 1000
	*     interval: 20, // default is 50
	*   }
	* )
	*
	* // do something with the element
	* expect(element.querySelector('.element-child')).toBeTruthy()
	* ```
	*/
	waitUntil: typeof waitUntil;
	/**
	* Run the factory before imports are evaluated. You can return a value from the factory
	* to reuse it inside your [`vi.mock`](https://vitest.dev/api/vi#vi-mock) factory and tests.
	*
	* If used with [`vi.mock`](https://vitest.dev/api/vi#vi-mock), both will be hoisted in the order they are defined in.
	*/
	hoisted: <T>(factory: () => T) => T;
	/**
	* Mocks every import call to the module even if it was already statically imported.
	*
	* The call to `vi.mock` is hoisted to the top of the file, so you don't have access to variables declared in the global file scope
	* unless they are defined with [`vi.hoisted`](https://vitest.dev/api/vi#vi-hoisted) before this call.
	*
	* Mocking algorithm is described in [documentation](https://vitest.dev/guide/mocking/modules).
	* @param path Path to the module. Can be aliased, if your Vitest config supports it
	* @param factory Mocked module factory. The result of this function will be an exports object
	*/
	mock(path: string, factory?: ModuleMockFactoryWithHelper | ModuleMockOptions): void;
	mock<T>(module: Promise<T>, factory?: ModuleMockFactoryWithHelper<T> | ModuleMockOptions): void;
	/**
	* Removes module from mocked registry. All calls to import will return the original module even if it was mocked before.
	*
	* This call is hoisted to the top of the file, so it will only unmock modules that were defined in `setupFiles`, for example.
	* @param path Path to the module. Can be aliased, if your Vitest config supports it
	*/
	unmock(path: string): void;
	unmock(module: Promise<unknown>): void;
	/**
	* Mocks every subsequent [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) call.
	*
	* Unlike [`vi.mock`](https://vitest.dev/api/vi#vi-mock), this method will not mock statically imported modules because it is not hoisted to the top of the file.
	*
	* Mocking algorithm is described in [documentation](https://vitest.dev/guide/mocking/modules).
	* @param path Path to the module. Can be aliased, if your Vitest config supports it
	* @param factory Mocked module factory. The result of this function will be an exports object
	*
	* @returns A disposable object that calls {@link doUnmock()} when disposed
	*/
	doMock(path: string, factory?: ModuleMockFactoryWithHelper | ModuleMockOptions): Disposable;
	doMock<T>(module: Promise<T>, factory?: ModuleMockFactoryWithHelper<T> | ModuleMockOptions): Disposable;
	/**
	* Removes module from mocked registry. All subsequent calls to import will return original module.
	*
	* Unlike [`vi.unmock`](https://vitest.dev/api/vi#vi-unmock), this method is not hoisted to the top of the file.
	* @param path Path to the module. Can be aliased, if your Vitest config supports it
	*/
	doUnmock(path: string): void;
	doUnmock(module: Promise<unknown>): void;
	/**
	* Imports module, bypassing all checks if it should be mocked.
	* Can be useful if you want to mock module partially.
	* @example
	* ```ts
	* vi.mock('./example.js', async () => {
	*  const original = await vi.importActual<typeof import('./example.js')>('./example.js')
	*
	*  return { ...original, get: vi.fn() }
	* })
	* ```
	* @param path Path to the module. Can be aliased, if your config supports it
	*/
	importActual: <T = ESModuleExports>(path: string) => Promise<T>;
	/**
	* Imports a module with all of its properties and nested properties mocked.
	*
	* Mocking algorithm is described in [documentation](https://vitest.dev/guide/mocking/modules).
	* @example
	* ```ts
	* const example = await vi.importMock<typeof import('./example.js')>('./example.js')
	* example.calc.mockReturnValue(10)
	* expect(example.calc()).toBe(10)
	* ```
	* @param path Path to the module. Can be aliased, if your config supports it
	* @returns Fully mocked module
	*/
	importMock: <T = ESModuleExports>(path: string) => Promise<MaybeMockedDeep<T>>;
	/**
	* Deeply mocks properties and methods of a given object
	* in the same way as `vi.mock()` mocks module exports.
	*
	* @example
	* ```ts
	* const original = {
	*   simple: () => 'value',
	*   nested: {
	*     method: () => 'real'
	*   },
	*   prop: 'foo',
	* }
	*
	* const mocked = vi.mockObject(original)
	* expect(mocked.simple()).toBe(undefined)
	* expect(mocked.nested.method()).toBe(undefined)
	* expect(mocked.prop).toBe('foo')
	*
	* mocked.simple.mockReturnValue('mocked')
	* mocked.nested.method.mockReturnValue('mocked nested')
	*
	* expect(mocked.simple()).toBe('mocked')
	* expect(mocked.nested.method()).toBe('mocked nested')
	*
	* const spied = vi.mockObject(original, { spy: true })
	* expect(spied.simple()).toBe('value')
	* expect(spied.simple).toHaveBeenCalled()
	* expect(spied.simple.mock.results[0]).toEqual({ type: 'return', value: 'value' })
	* ```
	*
	* @param value - The object to be mocked
	* @returns A deeply mocked version of the input object
	*/
	mockObject: <T>(value: T, options?: ModuleMockOptions) => MaybeMockedDeep<T>;
	/**
	* Type helper for TypeScript. Just returns the object that was passed.
	*
	* When `partial` is `true` it will expect a `Partial<T>` as a return value. By default, this will only make TypeScript believe that
	* the first level values are mocked. You can pass down `{ partial: true, deep: true }` to make nested objects also partial recursively.
	* @example
	* ```ts
	* import example from './example.js'
	* vi.mock('./example.js')
	*
	* test('1 + 1 equals 10' async () => {
	*  vi.mocked(example.calc).mockReturnValue(10)
	*  expect(example.calc(1, '+', 1)).toBe(10)
	* })
	* ```
	* @param item Anything that can be mocked
	* @param deep If the object is deeply mocked
	* @param options If the object is partially or deeply mocked
	*/
	mocked: (<T>(item: T, deep?: false) => MaybeMocked<T>) & (<T>(item: T, deep: true) => MaybeMockedDeep<T>) & (<T>(item: T, options: {
		partial?: false;
		deep?: false;
	}) => MaybeMocked<T>) & (<T>(item: T, options: {
		partial?: false;
		deep: true;
	}) => MaybeMockedDeep<T>) & (<T>(item: T, options: {
		partial: true;
		deep?: false;
	}) => MaybePartiallyMocked<T>) & (<T>(item: T, options: {
		partial: true;
		deep: true;
	}) => MaybePartiallyMockedDeep<T>) & (<T>(item: T) => MaybeMocked<T>);
	/**
	* Checks that a given parameter is a mock function. If you are using TypeScript, it will also narrow down its type.
	*/
	isMockFunction: (fn: any) => fn is MockInstance;
	/**
	* Calls [`.mockClear()`](https://vitest.dev/api/mock#mockclear) on every mocked function.
	*
	* This will only empty `.mock` state, it will not affect mock implementations.
	*
	* This is useful if you need to clean up mocks between different assertions within a test.
	*/
	clearAllMocks: () => VitestUtils;
	/**
	* Calls [`.mockReset()`](https://vitest.dev/api/mock#mockreset) on every mocked function.
	*
	* This will empty `.mock` state, reset "once" implementations, and reset each mock's base implementation to its original.
	*
	* This is useful when you want to reset all mocks to their original states.
	*/
	resetAllMocks: () => VitestUtils;
	/**
	* Calls [`.mockRestore()`](https://vitest.dev/api/mock#mockrestore) on every mocked function.
	*
	* This will empty `.mock` state, restore all original mock implementations, and restore original descriptors of spied-on objects.
	*
	* This is useful for inter-test cleanup and/or removing mocks created by [`vi.spyOn(...)`](https://vitest.dev/api/vi#vi-spyon).
	*/
	restoreAllMocks: () => VitestUtils;
	/**
	* Makes value available on global namespace.
	* Useful, if you want to have global variables available, like `IntersectionObserver`.
	* You can return it back to original value with `vi.unstubAllGlobals`, or by enabling `unstubGlobals` config option.
	*/
	stubGlobal: (name: string | symbol | number, value: unknown) => VitestUtils;
	/**
	* Changes the value of `import.meta.env` and `process.env`.
	* You can return it back to original value with `vi.unstubAllEnvs`, or by enabling `unstubEnvs` config option.
	*/
	stubEnv: <T extends string>(name: T, value: T extends "PROD" | "DEV" | "SSR" ? boolean | undefined : string | undefined) => VitestUtils;
	/**
	* Reset the value to original value that was available before first `vi.stubGlobal` was called.
	*/
	unstubAllGlobals: () => VitestUtils;
	/**
	* Reset environmental variables to the ones that were available before first `vi.stubEnv` was called.
	*/
	unstubAllEnvs: () => VitestUtils;
	/**
	* Resets modules registry by clearing the cache of all modules. This allows modules to be reevaluated when reimported.
	* Top-level imports cannot be re-evaluated. Might be useful to isolate modules where local state conflicts between tests.
	*
	* This method does not reset mocks registry. To clear mocks registry, use [`vi.unmock`](https://vitest.dev/api/vi#vi-unmock) or [`vi.doUnmock`](https://vitest.dev/api/vi#vi-dounmock).
	*/
	resetModules: () => VitestUtils;
	/**
	* Wait for all imports to load. Useful, if you have a synchronous call that starts
	* importing a module that you cannot await otherwise.
	* Will also wait for new imports, started during the wait.
	*/
	dynamicImportSettled: () => Promise<void>;
	/**
	* Updates runtime config. You can only change values that are used when executing tests.
	*/
	setConfig: (config: RuntimeOptions) => void;
	/**
	* If config was changed with `vi.setConfig`, this will reset it to the original state().
	*/
	resetConfig: () => void;
}
declare const vitest: VitestUtils;
declare const vi: VitestUtils;

/**
* @experimental
* @advanced
*
* Records a custom test artifact during test execution.
*
* This function allows you to attach structured data, files, or metadata to a test.
*
* Vitest automatically injects the source location where the artifact was created and manages any attachments you include.
*
* **Note:** artifacts must be recorded before the task is reported. Any artifacts recorded after that will not be included in the task.
*
* @param task - The test task context, typically accessed via `this.task` in custom matchers or `context.task` in tests
* @param artifact - The artifact to record. Must extend {@linkcode TestArtifactBase}
*
* @returns A promise that resolves to the recorded artifact with location injected
*
* @throws {Error} If the test runner doesn't support artifacts
*
* @example
* ```ts
* // In a custom assertion
* async function toHaveValidSchema(this: MatcherState, actual: unknown) {
*   const validation = validateSchema(actual)
*
*   await recordArtifact(this.task, {
*     type: 'my-plugin:schema-validation',
*     passed: validation.valid,
*     errors: validation.errors,
*   })
*
*   return { pass: validation.valid, message: () => '...' }
* }
* ```
*/
declare function recordArtifact<Artifact extends TestArtifact>(task: Test, artifact: Artifact): Promise<Artifact>;

/**
* Creates a suite of tests, allowing for grouping and hierarchical organization of tests.
* Suites can contain both tests and other suites, enabling complex test structures.
*
* @param {string} name - The name of the suite, used for identification and reporting.
* @param {Function} fn - A function that defines the tests and suites within this suite.
* @example
* ```ts
* // Define a suite with two tests
* suite('Math operations', () => {
*   test('should add two numbers', () => {
*     expect(add(1, 2)).toBe(3);
*   });
*
*   test('should subtract two numbers', () => {
*     expect(subtract(5, 2)).toBe(3);
*   });
* });
* ```
* @example
* ```ts
* // Define nested suites
* suite('String operations', () => {
*   suite('Trimming', () => {
*     test('should trim whitespace from start and end', () => {
*       expect('  hello  '.trim()).toBe('hello');
*     });
*   });
*
*   suite('Concatenation', () => {
*     test('should concatenate two strings', () => {
*       expect('hello' + ' ' + 'world').toBe('hello world');
*     });
*   });
* });
* ```
*/
declare const suite: SuiteAPI;
/**
* Defines a test case with a given name and test function. The test function can optionally be configured with test options.
*
* @param {string | Function} name - The name of the test or a function that will be used as a test name.
* @param {TestOptions | TestFunction} [optionsOrFn] - Optional. The test options or the test function if no explicit name is provided.
* @param {number | TestOptions | TestFunction} [optionsOrTest] - Optional. The test function or options, depending on the previous parameters.
* @throws {Error} If called inside another test function.
* @example
* ```ts
* // Define a simple test
* test('should add two numbers', () => {
*   expect(add(1, 2)).toBe(3);
* });
* ```
* @example
* ```ts
* // Define a test with options
* test('should subtract two numbers', { retry: 3 }, () => {
*   expect(subtract(5, 2)).toBe(3);
* });
* ```
*/
declare const test: TestAPI;
/**
* Creates a suite of tests, allowing for grouping and hierarchical organization of tests.
* Suites can contain both tests and other suites, enabling complex test structures.
*
* @param {string} name - The name of the suite, used for identification and reporting.
* @param {Function} fn - A function that defines the tests and suites within this suite.
* @example
* ```ts
* // Define a suite with two tests
* describe('Math operations', () => {
*   test('should add two numbers', () => {
*     expect(add(1, 2)).toBe(3);
*   });
*
*   test('should subtract two numbers', () => {
*     expect(subtract(5, 2)).toBe(3);
*   });
* });
* ```
* @example
* ```ts
* // Define nested suites
* describe('String operations', () => {
*   describe('Trimming', () => {
*     test('should trim whitespace from start and end', () => {
*       expect('  hello  '.trim()).toBe('hello');
*     });
*   });
*
*   describe('Concatenation', () => {
*     test('should concatenate two strings', () => {
*       expect('hello' + ' ' + 'world').toBe('hello world');
*     });
*   });
* });
* ```
*/
declare const describe: SuiteAPI;
/**
* Defines a test case with a given name and test function. The test function can optionally be configured with test options.
*
* @param {string | Function} name - The name of the test or a function that will be used as a test name.
* @param {TestOptions | TestFunction} [optionsOrFn] - Optional. The test options or the test function if no explicit name is provided.
* @param {number | TestOptions | TestFunction} [optionsOrTest] - Optional. The test function or options, depending on the previous parameters.
* @throws {Error} If called inside another test function.
* @example
* ```ts
* // Define a simple test
* it('adds two numbers', () => {
*   expect(add(1, 2)).toBe(3);
* });
* ```
* @example
* ```ts
* // Define a test with options
* it('subtracts two numbers', { retry: 3 }, () => {
*   expect(subtract(5, 2)).toBe(3);
* });
* ```
*/
declare const it: TestAPI;
declare function getCurrentSuite<ExtraContext = object>(): SuiteCollector<ExtraContext>;
declare function createTaskCollector(fn: (...args: any[]) => any): TestAPI;

declare function getFn<Task = Test>(key: Task): () => Awaitable<void>;
declare function getHooks(key: Suite): SuiteHooks;

declare function getCurrentTest<T extends Test | undefined>(): T;

/**
* @experimental
*/
declare function matchesTags(testTags: string[]): boolean;

declare class TestRunner implements VitestRunner {
	config: SerializedConfig;
	private snapshotClient;
	private workerState;
	private moduleRunner;
	private cancelRun;
	private assertionsErrors;
	private benchInstances;
	pool: string;
	viteEnvironment: string;
	private viteModuleRunner;
	constructor(config: SerializedConfig);
	importFile(filepath: string, source: VitestRunnerImportSource): unknown;
	onCollectStart(file: File): void;
	onCleanupWorkerContext?: (listener: () => unknown) => void;
	onAfterRunFiles(_files: File[]): void;
	onAfterRunSuite(suite: Suite): Promise<void>;
	onAfterRunTask(test: Task): void;
	cancel(_reason: CancelReason): void;
	injectValue(key: string): any;
	onBeforeRunTask(test: Task): Promise<void>;
	onBeforeRunSuite(suite: Suite): Promise<void>;
	onBeforeTryTask(test: Task, options: TestTryOptions): void;
	onAfterRetryTask(test: Test, _options: TestTryOptions): Promise<void>;
	onAfterTryTask(test: Test): void;
	extendTaskContext(context: TestContext): TestContext;
	getImportDurations(): Record<string, ImportDuration>;
	getModuleFetchDuration(): number;
	trace: <T>(name: string, attributes: Record<string, any> | (() => T), cb?: () => T) => T;
	__setTraces(traces: Traces): void;
	static createTaskCollector: typeof createTaskCollector;
	static getCurrentSuite: typeof getCurrentSuite;
	static getCurrentTest: typeof getCurrentTest;
	static createChainable: typeof createChainable;
	static getSuiteHooks: typeof getHooks;
	static getTestFn: typeof getFn;
	static setSuiteHooks: typeof getHooks;
	static setTestFn: typeof getFn;
	static matchesTags: typeof matchesTags;
	static createFileTask: typeof createFileTask;
}

interface AssertType {
	<T>(value: T): void;
}
declare const assertType: AssertType;

interface BrowserUI {
	setCurrentFileId: (fileId: string) => void;
	setIframeViewport: (width: number, height: number) => Promise<void>;
}

declare namespace Experimental {
	export { ModuleDefinitionDiagnostic, ModuleDefinitionDurationsDiagnostic, ModuleDefinitionLocation, SourceModuleDiagnostic, SourceModuleLocations, UntrackedModuleDefinitionDiagnostic };
}

/** @deprecated use `SerializedConfig` instead */
type TestRunnerConfig = SerializedConfig;

export { AsyncExpectationResult as AsyncMatcherResult, CancelReason, DomainSnapshotAdapter, ExpectStatic, Experimental, FakeTimersConfig, ImportDuration, LabelColor, ExpectationResult as MatcherResult, MatcherState, Mock, MockInstance, ModuleGraphData, ProvidedContext, Task as RunnerTask, TaskEventPack as RunnerTaskEventPack, TaskResultPack as RunnerTaskResultPack, Test as RunnerTestCase, File as RunnerTestFile, Suite as RunnerTestSuite, SerializedConfig, SerializedRootConfig, SerializedTestSpecification, Snapshots, SuiteAPI, SuiteCollector, SyncExpectationResult as SyncMatcherResult, TestAPI, TestAnnotation, TestArtifact, TestContext, TestRunner, TestTryOptions, UserConsoleLog, VitestRunner as VitestTestRunner, assert, assertType, createExpect, describe, globalExpect as expect, inject, it, recordArtifact, should, suite, test, vi, vitest };
export type { AssertType, BrowserUI, ExternalResult, TestRunnerConfig, TransformResultWithSource, VitestUtils, WebSocketEvents, WebSocketHandlers, WebSocketRPC };
