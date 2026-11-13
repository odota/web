import { DevEnvironment, IndexHtmlTransformContext, IndexHtmlTransformResult, ViteDevServer, UserConfig as UserConfig$1, Plugin, ResolvedConfig as ResolvedConfig$1, ESTree, TransformResult as TransformResult$1, InlineConfig as InlineConfig$1, DepOptimizationConfig, ServerOptions, ConfigEnv, AliasOptions } from 'vite';
import { aW as TaskMeta, U as UserConsoleLog, Q as Suite, a as File, bk as SerializableRetry, T as TestError, h as TestAnnotation, j as TestArtifact, b2 as TestBenchmark, aL as SerializedError, a1 as ImportDuration, n as Test, A as Awaitable, Z as CancelReason, P as ParsedStack, bl as BrowserTraceViewMode, bm as BrowserTraceViewRecordingMode, a6 as BaselineData, p as ProvidedContext, b as SerializedConfig, bn as Arrayable, a3 as AfterSuiteRunMeta, aQ as SnapshotStateOptions, aR as SnapshotSummary, aO as SnapshotResult, Y as Task, bo as AsyncLeak, k as TaskResultPack, F as FileSpecification, m as SerializedRootConfig, L as LabelColor, c as SerializedDiffOptions, bi as SequenceSetupFiles, bh as SequenceHooks, bp as PrettyFormatOptions, e as FakeTimersConfig, g as TestTagDefinition } from './config.d.B3YV4t0O.js';
import { Writable } from 'node:stream';
import { S as SerializedTestSpecification, B as BrowserTesterOptions, c as SourceModuleDiagnostic } from './browser.d.C7tWgUvw.js';
import * as chai from 'chai';
import { happyDomTypes, jsdomTypes } from 'vitest/optional-types.js';
import { a as ContextTestEnvironment, b as WorkerExecuteContext, c as WorkerTestEnvironment } from './worker.d.CyJRpyfZ.js';
import { O as OTELCarrier } from './rpc.d.3FOhdFx8.js';
import { MockedModule } from '@vitest/mocker';
import { S as StackTraceParserOptions, a as RuntimeCoverageProviderModule } from './source-map.d.BkG8YK_3.js';
import { CDPSession, BrowserCommands, MarkOptions } from 'vitest/browser';
import path from 'node:path';
import { Console } from 'node:console';
import { writeFile } from 'node:fs/promises';

type ChaiConfig = Omit<Partial<typeof chai.config>, "useProxy" | "proxyExcludedKeys" | "deepEqual">;

type HappyDOMOptions = Omit<NonNullable<ConstructorParameters<typeof happyDomTypes.Window>[0]>, "console">;

type JSDOMOptions = ConstructorOptionsOverride & Omit<jsdomTypes.ConstructorOptions, keyof ConstructorOptionsOverride>;
interface ConstructorOptionsOverride {
	/**
	* The html content for the test.
	*
	* @default '<!DOCTYPE html>'
	*/
	html?: string | ArrayBufferLike;
	/**
	* userAgent affects the value read from navigator.userAgent, as well as the User-Agent header sent while fetching subresources.
	*
	* @default `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${jsdomVersion}`
	*/
	userAgent?: string;
	/**
	* url sets the value returned by window.location, document.URL, and document.documentURI,
	* and affects things like resolution of relative URLs within the document
	* and the same-origin restrictions and referrer used while fetching subresources.
	*
	* @default 'http://localhost:3000'.
	*/
	url?: string;
	/**
	* Enable console?
	*
	* @default false
	*/
	console?: boolean;
	/**
	* jsdom does not have the capability to render visual content, and will act like a headless browser by default.
	* It provides hints to web pages through APIs such as document.hidden that their content is not visible.
	*
	* When the `pretendToBeVisual` option is set to `true`, jsdom will pretend that it is rendering and displaying
	* content.
	*
	* @default true
	*/
	pretendToBeVisual?: boolean;
	/**
	* Enable CookieJar
	*
	* @default false
	*/
	cookieJar?: boolean;
	resources?: "usable";
}

declare class ReportedTaskImplementation {
	/**
	* The project associated with the test or suite.
	*/
	readonly project: TestProject;
	/**
	* Unique identifier.
	* This ID is deterministic and will be the same for the same test across multiple runs.
	* The ID is based on the project name, module url and test order.
	*/
	readonly id: string;
	/**
	* Location in the module where the test or suite is defined.
	*/
	readonly location: {
		line: number;
		column: number;
	} | undefined;
	/**
	* Checks if the test did not fail the suite.
	* If the test is not finished yet or was skipped, it will return `true`.
	*/
	ok(): boolean;
	/**
	* Custom metadata that was attached to the test during its execution.
	*/
	meta(): TaskMeta;
	/**
	* Console logs recorded during the test execution.
	*/
	logs(): ReadonlyArray<UserConsoleLog>;
}
declare class TestCase extends ReportedTaskImplementation {
	#private;
	readonly type = "test";
	/**
	* Direct reference to the test module where the test or suite is defined.
	*/
	readonly module: TestModule;
	/**
	* Name of the test.
	*/
	readonly name: string;
	/**
	* Options that the test was initiated with.
	*/
	readonly options: TaskOptions;
	/**
	* Parent suite. If the test was called directly inside the module, the parent will be the module itself.
	*/
	readonly parent: TestSuite | TestModule;
	/**
	* Tags associated with the test.
	*/
	readonly tags: string[];
	/**
	* Full name of the test including all parent suites separated with `>`.
	*/
	get fullName(): string;
	/**
	* Test results.
	* - **pending**: Test was collected, but didn't finish running yet.
	* - **passed**: Test passed successfully
	* - **failed**: Test failed to execute
	* - **skipped**: Test was skipped during collection or dynamically with `ctx.skip()`.
	*/
	result(): TestResult;
	/**
	* Individual results for every retry and repeat attempt.
	*/
	attempts(): ReadonlyArray<TestAttempt>;
	/**
	* Test annotations added via the `task.annotate` API during the test execution.
	*/
	annotations(): ReadonlyArray<TestAnnotation>;
	/**
	* @experimental
	*
	* Test artifacts recorded via the `recordArtifact` API during the test execution.
	*/
	artifacts(): ReadonlyArray<TestArtifact>;
	/**
	* @experimental
	*
	* A list of benchmarks performed during the test.
	*/
	benchmarks(): ReadonlyArray<TestBenchmark>;
	/**
	* Useful information about the test like duration, memory usage, etc.
	* Diagnostic is only available after the test has finished.
	*/
	diagnostic(): TestDiagnostic | undefined;
	/**
	* Returns a new test specification that can be used to filter or run this specific test case.
	*/
	toTestSpecification(): TestSpecification;
}
declare class TestCollection {
	#private;
	constructor(task: Suite | File, project: TestProject);
	/**
	* Returns the test or suite at a specific index.
	*/
	at(index: number): TestCase | TestSuite | undefined;
	/**
	* The number of tests and suites in the collection.
	*/
	get size(): number;
	/**
	* Returns the collection in array form for easier manipulation.
	*/
	array(): (TestCase | TestSuite)[];
	/**
	* Filters all tests that are part of this collection and its children.
	*/
	allTests(state?: TestState): Generator<TestCase, undefined, void>;
	/**
	* Filters only the tests that are part of this collection.
	*/
	tests(state?: TestState): Generator<TestCase, undefined, void>;
	/**
	* Filters only the suites that are part of this collection.
	*/
	suites(): Generator<TestSuite, undefined, void>;
	/**
	* Filters all suites that are part of this collection and its children.
	*/
	allSuites(): Generator<TestSuite, undefined, void>;
	[Symbol.iterator](): Generator<TestSuite | TestCase, undefined, void>;
}

type ReportedHookContext = {
	readonly name: "beforeAll" | "afterAll";
	readonly entity: TestSuite | TestModule;
} | {
	readonly name: "beforeEach" | "afterEach";
	readonly entity: TestCase;
};
declare abstract class SuiteImplementation extends ReportedTaskImplementation {
	/**
	* Collection of suites and tests that are part of this suite.
	*/
	readonly children: TestCollection;
	/**
	* Errors that happened outside of the test run during collection, like syntax errors.
	*/
	errors(): SerializedError[];
}
declare class TestSuite extends SuiteImplementation {
	#private;
	readonly type = "suite";
	/**
	* Name of the test or the suite.
	*/
	readonly name: string;
	/**
	* Direct reference to the test module where the test or suite is defined.
	*/
	readonly module: TestModule;
	/**
	* Parent suite. If suite was called directly inside the module, the parent will be the module itself.
	*/
	readonly parent: TestSuite | TestModule;
	/**
	* Options that suite was initiated with.
	*/
	readonly options: TaskOptions;
	/**
	* Checks if the suite has any failed tests.
	* This will also return `false` if suite failed during collection.
	*/
	ok: () => boolean;
	/**
	* The meta information attached to the suite during its collection or execution.
	*/
	meta: () => TaskMeta;
	/**
	* Checks the running state of the suite.
	*/
	state(): TestSuiteState;
	/**
	* Returns a new test specification that can be used to filter or run this specific test suite.
	*/
	toTestSpecification(): TestSpecification;
	/**
	* Full name of the suite including all parent suites separated with `>`.
	*/
	get fullName(): string;
}
declare class TestModule extends SuiteImplementation {
	readonly location: undefined;
	readonly type = "module";
	/**
	* The Vite environment that processes files on the server.
	*
	* Can be empty if test module did not run yet.
	*/
	readonly viteEnvironment: DevEnvironment | undefined;
	/**
	* This is usually an absolute UNIX file path.
	* It can be a virtual ID if the file is not on the disk.
	* This value corresponds to the ID in the Vite's module graph.
	*/
	readonly moduleId: string;
	/**
	* Module id relative to the project. This is the same as `task.name`.
	*/
	readonly relativeModuleId: string;
	/**
	* Returns a new test specification that can be used to filter or run this specific test module.
	*/
	toTestSpecification(testCases?: TestCase[]): TestSpecification;
	/**
	* Checks the running state of the test file.
	*/
	state(): TestModuleState;
	/**
	* Checks if the module has any failed tests.
	* This will also return `false` if module failed during collection.
	*/
	ok: () => boolean;
	/**
	* The meta information attached to the module during its collection or execution.
	*/
	meta: () => TaskMeta;
	/**
	* Useful information about the module like duration, memory usage, etc.
	* If the module was not executed yet, all diagnostic values will return `0`.
	*/
	diagnostic(): ModuleDiagnostic;
}
interface TaskOptions {
	readonly each: boolean | undefined;
	readonly fails: boolean | undefined;
	readonly concurrent: boolean | undefined;
	readonly shuffle: boolean | undefined;
	readonly retry: SerializableRetry | undefined;
	readonly repeats: number | undefined;
	readonly tags: string[] | undefined;
	/**
	* Only tests have a `timeout` option.
	*/
	readonly timeout: number | undefined;
	readonly mode: "run" | "only" | "skip" | "todo";
}
type TestAttemptState = "skipped" | "failed" | "passed";
type TestSuiteState = TestAttemptState | "pending";
type TestModuleState = TestSuiteState | "queued";
type TestState = TestResult["state"];
/**
* The result of an individual test attempt.
*/
interface TestAttempt {
	/** The state after applying the test's expected failure option. */
	readonly state: TestAttemptState;
	/** Errors produced by this attempt. */
	readonly errors: ReadonlyArray<TestError> | undefined;
	/** How long in milliseconds the attempt took to run. */
	readonly duration: number;
	/** Time in milliseconds when the attempt started running. */
	readonly startTime: number;
	/** The zero-based retry index within the repeat. */
	readonly retryIndex: number;
	/** The zero-based repeat index. */
	readonly repeatIndex: number;
}
type TestResult = TestResultPassed | TestResultFailed | TestResultSkipped | TestResultPending;
interface TestResultPending {
	/**
	* The test was collected, but didn't finish running yet.
	*/
	readonly state: "pending";
	/**
	* Pending tests have no errors.
	*/
	readonly errors: undefined;
}
interface TestResultPassed {
	/**
	* The test passed successfully.
	*/
	readonly state: "passed";
	/**
	* Errors that were thrown during the test execution.
	*
	* **Note**: If test was retried successfully, errors will still be reported.
	*/
	readonly errors: ReadonlyArray<TestError> | undefined;
}
interface TestResultFailed {
	/**
	* The test failed to execute.
	*/
	readonly state: "failed";
	/**
	* Errors that were thrown during the test execution.
	*/
	readonly errors: ReadonlyArray<TestError>;
}
interface TestResultSkipped {
	/**
	* The test was skipped with `only` (on another test), `skip` or `todo` flag.
	* You can see which one was used in the `options.mode` option.
	*/
	readonly state: "skipped";
	/**
	* Skipped tests have no errors.
	*/
	readonly errors: undefined;
	/**
	* A custom note passed down to `ctx.skip(note)`.
	*/
	readonly note: string | undefined;
}
interface TestDiagnostic {
	/**
	* If the duration of the test is above `slowTestThreshold`.
	*/
	readonly slow: boolean;
	/**
	* The amount of memory used by the test in bytes.
	* This value is only available if the test was executed with `logHeapUsage` flag.
	*/
	readonly heap: number | undefined;
	/**
	* The time it takes to execute the test in ms.
	*/
	readonly duration: number;
	/**
	* The time in ms when the test started.
	*/
	readonly startTime: number;
	/**
	* The amount of times the test was retried.
	*/
	readonly retryCount: number;
	/**
	* The amount of times the test was repeated as configured by `repeats` option.
	* This value can be lower if the test failed during the repeat and no `retry` is configured.
	*/
	readonly repeatCount: number;
	/**
	* If test passed on a second retry.
	*/
	readonly flaky: boolean;
}
interface ModuleDiagnostic {
	/**
	* The time it takes to import and initiate an environment.
	*/
	readonly environmentSetupDuration: number;
	/**
	* The time it takes Vitest to setup test harness (runner, mocks, etc.).
	*/
	readonly prepareDuration: number;
	/**
	* The time it takes to import the test module.
	* This includes importing everything in the module and executing suite callbacks.
	*/
	readonly collectDuration: number;
	/**
	* The time it takes to import the setup module.
	*/
	readonly setupDuration: number;
	/**
	* Accumulated duration of all tests and hooks in the module.
	*/
	readonly duration: number;
	/**
	* The amount of memory used by the test module in bytes.
	* This value is only available if the test was executed with `logHeapUsage` flag.
	*/
	readonly heap: number | undefined;
	/**
	* The time spent importing every non-externalized dependency that Vitest has processed.
	*/
	readonly importDurations: Record<string, ImportDuration>;
	/**
	* The id of the worker that ran this file. This value cannot be higher than `maxWorkers`.
	* If file did not run yet, this will be 0.
	*
	* **Warning**: Node.js tests and browser tests run in different pools and do not share `concurrencyId`.
	* It is possible to have multiple modules with the same `concurrencyId` because of that.
	* Use `project.isBrowserEnabled()` to distinguish the concurrency.
	* @since 5.0.0
	*/
	readonly concurrencyId: number;
	/**
	* Incremental number of the worker that ran this file. This number increases with each worker.
	* If file did not run yet, this will be 0.
	*
	* **Warning**: Node.js tests and browser tests run in different pools and do not share `workerId`.
	* It is possible to have multiple modules with the same `workerId` because of that.
	* Use `project.isBrowserEnabled()` to distinguish the concurrency.
	* @since 5.0.0
	*/
	readonly workerId: number;
}
declare function experimental_getRunnerTask(entity: TestCase): Test;
declare function experimental_getRunnerTask(entity: TestSuite): Suite;
declare function experimental_getRunnerTask(entity: TestModule): File;
declare function experimental_getRunnerTask(entity: TestCase | TestSuite | TestModule): Suite | File | Test;

interface TestSpecificationOptions {
	testNamePattern?: RegExp;
	testIds?: string[];
	testNames?: string[];
	testLines?: number[];
	testTagsFilter?: string[];
}
declare class TestSpecification {
	/**
	* The task id associated with the test module.
	*/
	readonly taskId: string;
	/**
	* The test project that the module belongs to.
	*/
	readonly project: TestProject;
	/**
	* The id of the module in the Vite module graph. It is usually an absolute file path.
	*/
	readonly moduleId: string;
	/**
	* The current test pool. It's possible to have multiple pools in a single test project with `typecheck.enabled`.
	*/
	readonly pool: Pool;
	/**
	* Line numbers of the test locations to run.
	*/
	testLines: number[] | undefined;
	/**
	* Regular expression pattern to filter test names.
	*/
	testNamePattern: RegExp | undefined;
	/**
	* The ids of tasks inside of this specification to run.
	*/
	testIds: string[] | undefined;
	/**
	* The full names of the tests inside of this specification to run, including the parent suites separated with `>`.
	*/
	testNames: string[] | undefined;
	/**
	* The tags of tests to run.
	*/
	testTagsFilter: string[] | undefined;
	/**
	* Test module associated with the specification. This will be `undefined` if tests have not been run yet.
	*/
	get testModule(): TestModule | undefined;
	toJSON(): SerializedTestSpecification;
}

interface BrowserModuleMocker {
	register: (sessionId: string, module: MockedModule) => Promise<void>;
	delete: (sessionId: string, url: string) => Promise<void>;
	clear: (sessionId: string) => Promise<void>;
}
interface BrowserProviderOption<Options extends object = object> {
	name: string;
	supportedBrowser?: ReadonlyArray<string>;
	options: Options;
	/**
	* Called once for every resolved browser project right before its shared
	* Vite server is created, so the provider can start preparing the browser
	* (e.g. launching it) concurrently. Optional, fire-and-forget: errors must
	* surface through the normal provider flow.
	*/
	prewarm?: (ctx: {
		config: ResolvedConfig;
		vitest: Vitest;
	}) => void;
	providerFactory: (project: TestProject) => BrowserProvider;
	serverFactory: BrowserServerFactory;
}
interface BrowserServerFactory {
	(): Promise<BrowserServerContribution>;
}
interface BrowserProvider {
	name: string;
	mocker?: BrowserModuleMocker;
	readonly initScripts?: string[];
	/**
	* @experimental opt-in into file parallelisation
	*/
	supportsParallelism: boolean;
	getCommandsContext: (sessionId: string) => Record<string, unknown>;
	openPage: (sessionId: string, url: string, options: {
		parallel: boolean;
	}) => Promise<void>;
	getCDPSession?: (sessionId: string) => Promise<CDPSession>;
	close: (options?: BrowserProviderCloseOptions) => Awaitable<void>;
}
interface BrowserProviderCloseOptions {
	/**
	* The instance is closed to free a slot for another project and can be
	* opened again later, so the provider may keep the browser process alive
	* for the next instance instead of launching a new one.
	* @default false
	*/
	keepWarm?: boolean;
}
type BrowserBuiltinProvider = "webdriverio" | "playwright" | "preview";
interface _BrowserNames {}
interface BrowserTraceViewOptions {
	/**
	* @deprecated Use `mode` instead. `true` is the same as `mode: 'on'`.
	*/
	enabled?: boolean;
	/**
	* How trace view records tests.
	*
	* - `'on'`: every test gets a trace with a snapshot at every step, and Vitest UI shows steps live as tests run.
	* - `'failure-only'`: only failed tests get a trace, with the full step timeline and a snapshot at the end.
	* - `'off'`: no traces.
	*
	* Takes precedence over `enabled`.
	*
	* @default 'failure-only'
	* @experimental
	*/
	mode?: BrowserTraceViewRecordingMode;
	/**
	* Capture canvas pixels in trace view snapshots.
	*
	* This uses rrweb's canvas snapshot support and can increase trace artifact size.
	* In the trace viewer, this enables a weaker replay iframe sandbox because rrweb needs scripts to redraw canvas data.
	*
	* @default false
	*/
	recordCanvas?: boolean;
	/**
	* Inline loaded `<img>` element pixels in trace view snapshots.
	*
	* This uses rrweb's image inlining support. It improves offline replay for still images,
	* but can increase trace artifact size and does not preserve original image resource bytes.
	*
	* @default false
	*/
	inlineImages?: boolean;
	/**
	* Capture the accessibility tree alongside each trace view snapshot.
	*
	* The trace viewer's snapshot pane can then switch between "DOM" and "Aria" views.
	*
	* @default true
	* @experimental
	*/
	ariaSnapshot?: boolean;
}
type UnsupportedProperties = "browser" | "typecheck" | "alias" | "sequence" | "root" | "pool" | "runner" | "api" | "deps" | "environment" | "environmentOptions" | "server" | "benchmark" | "name";
interface BrowserInstanceOption extends Omit<ProjectConfig, UnsupportedProperties>, Pick<BrowserConfigOptions, "headless" | "locators" | "viewport" | "testerHtmlPath" | "screenshotDirectory" | "screenshotFailures"> {
	/**
	* Name of the browser
	*/
	browser: keyof _BrowserNames extends never ? string : _BrowserNames[keyof _BrowserNames];
	name?: string;
	provider?: BrowserProviderOption;
}
interface BrowserConfigOptions {
	/**
	* if running tests in the browser should be the default
	*
	* @default false
	*/
	enabled?: boolean;
	/**
	* Configurations for different browser setups
	*/
	instances?: BrowserInstanceOption[];
	/**
	* Browser provider
	* @example
	* ```ts
	* import { playwright } from '@vitest/browser-playwright'
	* export default defineConfig({
	*   test: {
	*     browser: {
	*       provider: playwright(),
	*     },
	*   },
	* })
	* ```
	*/
	provider?: BrowserProviderOption;
	/**
	* enable headless mode
	*
	* @default process.env.CI
	*/
	headless?: boolean;
	/**
	* Show Vitest UI
	*
	* @default !process.env.CI
	*/
	ui?: boolean;
	/**
	* Default position for the details panel in browser mode
	* 'right' shows the details panel on the right side (horizontal split)
	* 'bottom' shows the details panel at the bottom (vertical split)
	* @default 'right'
	*/
	detailsPanelPosition?: "right" | "bottom";
	/**
	* Default viewport size
	*/
	viewport?: {
		/**
		* Width of the viewport
		* @default 414
		*/
		width: number;
		/**
		* Height of the viewport
		* @default 896
		*/
		height: number;
	};
	/**
	* Locator options
	*/
	locators?: {
		/**
		* Attribute used to locate elements by test id
		* @default 'data-testid'
		*/
		testIdAttribute?: string;
		/**
		* Should locators match the text exactly by default
		* @default true
		*/
		exact?: boolean;
		/**
		* Format used for locator "Cannot find element" error details.
		*
		* @default 'all'
		*/
		errorFormat?: "html" | "aria" | "all";
	};
	/**
	* Generate traces that can be viewed on https://trace.playwright.dev/
	*
	* This option is supported only by **playwright** provider.
	*/
	trace?: BrowserTraceViewMode | {
		mode: BrowserTraceViewMode;
		/**
		* The directory where all traces will be stored. By default, Vitest
		* stores all traces in `__traces__` folder close to the test file.
		*/
		tracesDir?: string;
		/**
		* Whether to capture screenshots during tracing. Screenshots are used to build a timeline preview.
		* @default true
		*/
		screenshots?: boolean;
		/**
		* If this option is true tracing will
		* - capture DOM snapshot on every action
		* - record network activity
		* @default true
		*/
		snapshots?: boolean;
	};
	/**
	* Records the actions, assertions, and marks of browser tests with DOM snapshots for the trace viewer.
	*
	* - `'failure-only'`: records only failed tests.
	* - `true` or `'on'`: records every test.
	* - `false` or `'off'`: turns trace view off.
	*
	* @default 'failure-only'
	* @see {@link https://vitest.dev/guide/browser/trace-view}
	*/
	traceView?: boolean | BrowserTraceViewRecordingMode | BrowserTraceViewOptions;
	/**
	* Directory where screenshots will be saved when page.screenshot() is called
	* If not set, all screenshots are saved to __screenshots__ directory in the same folder as the test file.
	* If this is set, it will be resolved relative to the project root.
	* @default __screenshots__
	*/
	screenshotDirectory?: string;
	/**
	* Should Vitest take screenshots if the test fails
	* @default !browser.ui
	*/
	screenshotFailures?: boolean;
	/**
	* Serve sourcemaps of your dependencies (files in `node_modules`) to the
	* browser during headless test runs.
	*
	* These sourcemaps are used by browser devtools: when disabled, pausing
	* inside dependency code shows the compiled code the browser actually
	* runs instead of the dependency's original sources. If you don't debug
	* into your dependencies this way, disabling them makes test runs faster:
	* the server doesn't generate and inline the maps, and every browser tab
	* downloads several times fewer bytes.
	*
	* Reported test errors are not affected: stack frames pointing into a
	* pre-bundled dependency are mapped using the sourcemaps stored on disk
	* even when this option is disabled.
	*
	* Vitest never serves sourcemaps of its own pre-built modules in headless
	* runs (unless `--inspect` is used) — their frames are hidden from stack
	* traces anyway. Sourcemaps of your own source files are always served.
	* @default true
	*/
	dependencySourcemaps?: boolean;
	/**
	* Path to the index.html file that will be used to run tests.
	*/
	testerHtmlPath?: string;
	/**
	* Scripts injected into the main window.
	*/
	orchestratorScripts?: BrowserScript[];
	/**
	* Commands that will be executed on the server
	* via the browser `import("vitest/browser").commands` API.
	* @see {@link https://vitest.dev/api/browser/commands}
	*/
	commands?: Record<string, BrowserCommand<any>>;
	/**
	* Timeout for connecting to the browser
	* @default 60000
	*/
	connectTimeout?: number;
	expect?: {
		toMatchScreenshot?: { [ComparatorName in keyof ToMatchScreenshotComparators]: {
			/**
			* The name of the comparator to use for visual diffing.
			*
			* @defaultValue `'pixelmatch'`
			*/
			comparatorName?: ComparatorName;
			comparatorOptions?: ToMatchScreenshotComparators[ComparatorName];
		} }[keyof ToMatchScreenshotComparators] & ToMatchScreenshotOptions;
	};
	/**
	* Enables tracking uncaught errors and exceptions so they can be reported by Vitest.
	*
	* If you need to hide certain errors, it is recommended to use [`onUnhandledError`](https://vitest.dev/config/onunhandlederror) option instead.
	*
	* Disabling this will completely remove all Vitest error handlers, which can help debugging with the "Pause on exceptions" checkbox turned on.
	* @default true
	*/
	trackUnhandledErrors?: boolean;
	/**
	* Serve module mocks through an import map in the tester document instead of
	* intercepting network requests.
	*
	* By default, Vitest checks once per browser whether it accepts an import map
	* after a module has loaded (Chromium 133+, Safari 18.4+, Firefox 150+ with
	* `dom.multiple_import_maps.enabled`, which the Playwright provider sets) and
	* falls back to request interception otherwise. `true` fails in a browser that
	* cannot, `false` always intercepts.
	*
	* @experimental
	*/
	importMapMocks?: boolean;
}
interface BrowserCommandContext {
	testPath: string | undefined;
	provider: BrowserProvider;
	project: TestProject;
	sessionId: string;
	mark: (name: string, options?: MarkOptions) => Promise<void>;
	triggerCommand: <K extends keyof BrowserCommands>(name: K, ...args: Parameters<BrowserCommands[K]>) => ReturnType<BrowserCommands[K]>;
}
interface BrowserServerStateSession {
	project: TestProject;
	otelCarrier?: OTELCarrier;
	concurrencyId: number;
	connected: () => void;
	ready: () => void;
	fail: (v: Error) => void;
}
interface BrowserOrchestrator {
	cleanupTesters: () => Promise<void>;
	createTesters: (options: BrowserTesterOptions) => Promise<void>;
	onCancel: (reason: CancelReason) => Promise<void>;
	$close: () => void;
}
interface BrowserServerState {
	orchestrators: Map<string, BrowserOrchestrator>;
}
interface ParentProjectBrowser {
	spawn: (project: TestProject) => ProjectBrowser;
	vite: ViteDevServer;
	vitest: Vitest;
	config: ResolvedConfig;
}
interface BrowserServerContribution {
	transformIndexHtml: (ctx: IndexHtmlTransformContext) => Awaitable<IndexHtmlTransformResult | undefined>;
	configureServer: (server: ViteDevServer) => Awaitable<void>;
	/**
	* Browser-specific Vite config (`resolve.alias`, `define`, esbuild). Applied
	* by the core loader plugin's `config` hook during the single project
	* resolution, so other plugins observe it (e.g. alias must be baked at
	* resolution time). The loader always forces `server.middlewareMode = false`
	* on top. `harness` provides the package installer's `isPackageExists` (no
	* `Vitest` instance is available during resolution).
	*/
	config: (config: UserConfig$1, harness: PluginHarness) => Awaitable<UserConfig$1>;
	/**
	* Browser `optimizeDeps`, aggregated across every project that shares the
	* single browser Vite server (instance and benchmark variants). Called by core
	* after all projects are resolved and before the server is created; the result
	* is merged into the resolved Vite config's `client` environment
	* `optimizeDeps`. `testFiles` is the aggregated, already-globbed set of test
	* files for the server (globbing lives in the core package).
	*/
	resolveOptimizeDeps: (projectConfigs: ResolvedConfig[], testFiles: string[], harness: PluginHarness) => Awaitable<NonNullable<UserConfig$1["optimizeDeps"]>>;
	/**
	* Runtime plugins. Injected into the browser (`client`) environment by the
	* loader's `applyToEnvironment`; their `configureServer`/`transformIndexHtml`
	* are run by the loader. MUST NOT define `config`/`configResolved` hooks.
	*/
	plugins: Plugin[];
	/**
	* Constructs the `ParentBrowserProject`. Called by core at server creation,
	* when the `Vitest` instance exists.
	*/
	createParent: (ctx: {
		config: ResolvedConfig;
		vitest: Vitest;
	}) => ParentProjectBrowser;
	/** Called by core once the server exists to wire up the browser RPC (the port may be bound later). */
	setupRpc: (parent: ParentProjectBrowser) => void;
	/**
	* Mutable. Filled by core at server creation; the pushed `BrowserPlugin`
	* closes over this same object and reads `.parent` in `configureServer`.
	*/
	parent?: ParentProjectBrowser;
}
interface ProjectBrowser {
	vite: ViteDevServer;
	state: BrowserServerState;
	/**
	* The provider of the open browser instance. It is `undefined` until the instance
	* starts running tests and after the instance is closed to free a worker slot.
	*/
	provider: BrowserProvider | undefined;
	close: () => Promise<void>;
	initBrowserProvider: (project: TestProject) => Promise<void>;
	closeBrowserProvider: (options?: BrowserProviderCloseOptions) => Promise<void>;
	parseStacktrace: (stack: string, options?: StackTraceParserOptions) => ParsedStack[];
	parseErrorStacktrace: (error: TestError, options?: StackTraceParserOptions) => ParsedStack[];
	registerCommand: <K extends keyof BrowserCommands>(name: K, cb: BrowserCommand<Parameters<BrowserCommands[K]>, ReturnType<BrowserCommands[K]>>) => void;
	triggerCommand: <K extends keyof BrowserCommands>(name: K, context: BrowserCommandContext, ...args: Parameters<BrowserCommands[K]>) => ReturnType<BrowserCommands[K]>;
}
interface BrowserCommand<
	Payload extends unknown[] = [],
	ReturnValue = any
> {
	(context: BrowserCommandContext, ...payload: Payload): Awaitable<ReturnValue>;
}
interface BrowserScript {
	/**
	* If "content" is provided and type is "module", this will be its identifier.
	*
	* If you are using TypeScript, you can add `.ts` extension here for example.
	* @default `injected-${index}.js`
	*/
	id?: string;
	/**
	* JavaScript content to be injected. This string is processed by Vite plugins if type is "module".
	*
	* You can use `id` to give Vite a hint about the file extension.
	*/
	content?: string;
	/**
	* Path to the script. This value is resolved by Vite so it can be a node module or a file path.
	*/
	src?: string;
	/**
	* If the script should be loaded asynchronously.
	*/
	async?: boolean;
	/**
	* Script type.
	* @default 'module'
	*/
	type?: string;
}
interface ResolvedBrowserOptions extends BrowserConfigOptions {
	name: string;
	enabled: boolean;
	headless: boolean;
	ui: boolean;
	viewport: {
		width: number;
		height: number;
	};
	screenshotFailures: boolean;
	locators: {
		testIdAttribute: string;
		exact: boolean;
		errorFormat: "html" | "aria" | "all";
	};
	trace: {
		mode: BrowserTraceViewMode;
		tracesDir?: string;
		screenshots?: boolean;
		snapshots?: boolean;
		sources?: boolean;
	};
	traceView: Required<BrowserTraceViewOptions>;
}
type ToMatchScreenshotResolvePath = (data: {
	/**
	* Path **without** extension, sanitized and relative to the test file.
	*
	* This comes from the arguments passed to `toMatchScreenshot`; if called
	* without arguments this will be the auto-generated name.
	*
	* @example
	* test('calls `onClick`', () => {
	*   expect(locator).toMatchScreenshot()
	*   // arg = "calls-onclick-1"
	* })
	*
	* @example
	* expect(locator).toMatchScreenshot('foo/bar/baz.png')
	* // arg = "foo/bar/baz"
	*
	* @example
	* expect(locator).toMatchScreenshot('../foo/bar/baz.png')
	* // arg = "foo/bar/baz"
	*/
	arg: string;
	/**
	* Screenshot extension, with leading dot.
	*
	* This can be set through the arguments passed to `toMatchScreenshot`, but
	* the value will fall back to `'.png'` if an unsupported extension is used.
	*/
	ext: string;
	/**
	* The instance's browser name.
	*/
	browserName: string;
	/**
	* The value of {@linkcode process.platform}.
	*/
	platform: NodeJS.Platform;
	/**
	* The value provided to {@linkcode ToMatchScreenshotOptions.screenshotDirectory|browser.expect.toMatchScreenshot.screenshotDirectory}, if none is provided, its default value (`__screenshots__`).
	*/
	screenshotDirectory: string;
	/**
	* Absolute path to the project's
	* {@linkcode https://vitest.dev/config/root|root}.
	*/
	root: string;
	/**
	* Path to the test file, relative to the project's
	* {@linkcode https://vitest.dev/config/root|root}.
	*/
	testFileDirectory: string;
	/**
	* The test's filename.
	*/
	testFileName: string;
	/**
	* The {@linkcode https://vitest.dev/api/#test|test}'s name, including
	* parent {@linkcode https://vitest.dev/api/#describe|describe}, sanitized.
	*/
	testName: string;
	/**
	* The value provided to
	* {@linkcode https://vitest.dev/config/attachmentsdir|attachmentsDir},
	* if none is provided, its default value.
	*/
	attachmentsDir: string;
	/**
	* The {@linkcode https://vitest.dev/api/advanced/test-project|TestProject} the test belongs to.
	*
	* @experimental
	*/
	project: TestProject;
}) => string;
interface ToMatchScreenshotOptions {
	/**
	* The directory name used for storing reference screenshots.
	*
	* This value is passed as `screenshotDirectory` to {@linkcode resolveScreenshotPath|browser.expect.toMatchScreenshot.resolveScreenshotPath} and {@linkcode resolveDiffPath|browser.expect.toMatchScreenshot.resolveDiffPath}, and used in the default path resolution of `resolveScreenshotPath`.
	*
	* @default `__screenshots__`.
	*/
	screenshotDirectory?: string;
	/**
	* Overrides default reference screenshot path.
	*
	* @default path.resolve(root, testFileDirectory, screenshotDirectory, testFileName, `${arg}-${browserName}-${platform}${ext}`)
	*/
	resolveScreenshotPath?: ToMatchScreenshotResolvePath;
	/**
	* Overrides default screenshot path used for diffs.
	*
	* @default path.resolve(root, attachmentsDir, testFileDirectory, testFileName, `${arg}-${browserName}-${platform}${ext}`)
	*/
	resolveDiffPath?: ToMatchScreenshotResolvePath;
}
interface ToMatchScreenshotComparators {}

declare class BenchmarkManager {
	private project;
	constructor(project: TestProject);
	resolve(relativePath: string): string;
	readResult(relativePath: string): Promise<BaselineData | null>;
	writeResult(relativePath: string, data: BaselineData): Promise<void>;
}

declare class TestProject {
	/**
	* The global Vitest instance.
	*/
	readonly vitest: Vitest;
	/**
	* Resolved global configuration. If there are no workspace projects, this will be the same as `config`.
	*/
	readonly globalConfig: ResolvedConfig;
	/**
	* Browser instance if the browser is enabled. This is initialized when the tests run for the first time.
	*/
	browser?: ProjectBrowser;
	/**
	* Temporary directory for the project. This is unique for each project. Vitest stores transformed content here.
	*/
	readonly tmpDir: string;
	readonly benchmark: BenchmarkManager;
	config: ResolvedConfig;
	viteConfig: ResolvedConfig$1;
	vite: ViteDevServer;
	hash: string;
	private runner;
	private closingPromise;
	private typecheckFilesList;
	private _globalSetups?;
	private _provided;
	constructor(vitest: Vitest, server: ViteDevServer, viteConfig: ResolvedConfig$1, projectConfig: ResolvedConfig);
	/**
	* Provide a value to the test context. This value will be available to all tests with `inject`.
	*/
	provide: <T extends keyof ProvidedContext & string>(key: T, value: ProvidedContext[T]) => void;
	/**
	* Get the provided context. The project context is merged with the global context.
	*/
	getProvidedContext(): ProvidedContext;
	/**
	* Creates a new test specification. Specifications describe how to run tests.
	* @param moduleId The file path
	*/
	createSpecification(moduleId: string, locationsOrOptions?: number[] | TestSpecificationOptions | undefined, pool?: string, taskIdOverride?: string): TestSpecification;
	toJSON(): SerializedTestProject;
	/**
	* The name of the project or an empty string if not set.
	*/
	get name(): string;
	/**
	* The color used when reporting tasks of this project.
	*/
	get color(): ProjectName["color"];
	/**
	* Serialized project configuration. This is the config that tests receive.
	*/
	get serializedConfig(): SerializedConfig;
	/**
	* Check if this is the root project. The root project is the one that has the root config.
	*/
	isRootProject(): boolean;
	/**
	* Whether the project reuses the Vite server of the config that declared it
	* (see the `sharedViteServer` option). The project that owns the server
	* reports `false` even when other projects reuse it.
	*/
	get sharedViteServer(): boolean;
	onTestsRerun(cb: OnTestsRerunHandler): void;
	/**
	* Get all files in the project that match the globs in the config and the filters.
	* @param filters String filters to match the test files.
	*/
	globTestFiles(filters?: string[]): Promise<{
		/**
		* Test files that match the filters.
		*/
		testFiles: string[];
		/**
		* Typecheck test files that match the filters. This will be empty unless `typecheck.enabled` is `true`.
		*/
		typecheckTestFiles: string[];
	}>;
	private globAllTestFiles;
	isBrowserEnabled(): boolean;
	private markTestFile;
	/**
	* Test if a file matches the test globs. This does the actual glob matching if the test is not cached, unlike `isCachedTestFile`.
	*/
	matchesTestGlob(moduleId: string, source?: () => string): boolean;
	/**
	* Closes the project and all associated resources. This can only be called once; the closing promise is cached until the server restarts.
	* If the resources are needed again, create a new project.
	*/
	close(): Promise<void>;
	/**
	* Import a file using Vite module runner.
	* @param moduleId The ID of the module in Vite module graph
	*/
	import<T>(moduleId: string): Promise<T>;
	private _serializeOverriddenConfig;
	private clearTmpDir;
	private _provideObject;
}
interface SerializedTestProject {
	name: string;
	serializedConfig: SerializedConfig;
	context: ProvidedContext;
}

declare class TypeCheckError extends Error {
	message: string;
	stacks: ParsedStack[];
	name: string;
	constructor(message: string, stacks: ParsedStack[]);
}

interface CapturePrintErrorResult {
	nearest: ParsedStack | undefined;
	output: string;
}

interface ErrorOptions {
	type?: string;
	fullStack?: boolean;
	project?: TestProject;
	verbose?: boolean;
	screenshotPaths?: string[];
	showCodeFrame?: boolean;
}
type Listener = () => void;
declare class Logger {
	outputStream: NodeJS.WriteStream | Writable;
	errorStream: NodeJS.WriteStream | Writable;
	private _clearScreenPending;
	private _highlights;
	private cleanupListeners;
	console: Console;
	private ctx;
	constructor(outputStream?: NodeJS.WriteStream | Writable, errorStream?: NodeJS.WriteStream | Writable);
	setVitest(vitest: Vitest): this;
	log(...args: any[]): void;
	error(...args: any[]): void;
	warn(...args: any[]): void;
	clearFullScreen(message?: string): void;
	clearScreen(message: string, force?: boolean): void;
	private _clearScreen;
	printError(err: unknown, options?: ErrorOptions): void;
	formatError(err: unknown, options?: ErrorOptions): CapturePrintErrorResult;
	deprecate(message: string): void;
	clearHighlightCache(filename?: string): void;
	highlight(filename: string, source: string): string;
	printNoTestTagsFound(): void;
	printTags(): void;
	printNoTestFound(filters?: string[]): void;
	printBanner(): void;
	printUnhandledErrors(errors: ReadonlyArray<unknown>): void;
	printSourceTypeErrors(errors: TypeCheckError[]): void;
	getColumns(): number;
	onTerminalCleanup(listener: Listener): void;
	private addCleanupListeners;
	private registerUnhandledRejection;
}

declare class VitestPackageInstaller {
	isPackageExists(name: string, options?: {
		paths?: string[];
	}): boolean;
	ensureInstalled(dependency: string, root: string, version?: string): Promise<boolean>;
}

declare class PluginHarness {
	logger: Logger;
	packageInstaller: VitestPackageInstaller;
	vitest?: Vitest;
	version: string;
	constructor(logger?: Logger, packageInstaller?: VitestPackageInstaller);
	setVitest(vitest: Vitest | undefined): this;
	getVitest(): Vitest;
}

interface Report {
	/**
	* The root directory for this scope.
	*
	* ```ts
	* const report = vitest.createReport('my-json-reporter');
	*
	* // Is <project-root>/.vitest/my-json-reporter
	* const root = report.root
	* ```
	*/
	root: string;
	/**
	* Clean up the report directory for this scope.
	*
	* By default, if `--merge-reports` is used, this method will not delete existing reports.
	* To force deletion of existing reports, pass `true` as an argument.
	*
	* ```ts
	* const report = vitest.createReport('my-json-reporter');
	*
	* // Removes everything inside <project-root>/.vitest/my-json-reporter/
	* await report.clean()
	* ```
	*/
	clean: (force?: boolean) => Promise<void>;
	/**
	* Write a file to the report directory for this scope.
	* By default the file will be written with UTF-8 encoding.
	* The filename is relative to the scope directory.
	*
	* ```ts
	* const report = vitest.createReport('my-json-reporter');
	*
	* // Writes file to .vitest/my-json-reporter/test-report.json
	* await report.writeFile('test-report.json', JSON.stringify(results))
	* ```
	*/
	writeFile: (filename: string, content: Parameters<typeof writeFile>[1], encoding?: BufferEncoding) => Promise<void>;
	/**
	* Read a file from the report directory for this scope.
	*
	* ```ts
	* const report = vitest.createReport('my-json-reporter');
	*
	* // Reads file from .vitest/my-json-reporter/test-report.json
	* const content: string = await report.readFile('test-report.json')
	* ```
	*/
	readFile: (filename: string, encoding?: BufferEncoding) => Promise<string>;
	/**
	* Read contents of the report directory for this scope.
	*
	* ```ts
	* const report = vitest.createReport('my-json-reporter');
	*
	* // Reads contents from .vitest/my-json-reporter
	* const filenames: string[] = await report.readdir()
	* ```
	*/
	readdir: () => Promise<string[]>;
	/**
	* Delete a file from the report directory for this scope.
	*
	* ```ts
	* const report = vitest.createReport('my-json-reporter');
	*
	* // Deletes file from .vitest/my-json-reporter/test-report.json
	* await report.delete('test-report.json')
	* ```
	*/
	delete: (filename: string) => Promise<void>;
}

//#region src/tree.d.ts
/**
 * A partial visitor only having the functions of interest to the caller.
 *
 *   * `onStart(root, state)` - called before traversal begins
 *   * `onSummary(node, state)` - called for every summary node
 *   * `onDetail(node, state)` - called for every detail node
 *   * `onSummaryEnd(node, state)` - called after all children have been visited for
 *      a summary node.
 *   * `onEnd(root, state)` - called after traversal ends
 */
interface PartialVisitor<N extends BaseNode = BaseNode> {
  onStart?(root: N, state?: any): void;
  onSummary?(node: N, state?: any): void;
  onDetail?(node: N, state?: any): void;
  onSummaryEnd?(node: N, state?: any): void;
  onEnd?(root: N, state?: any): void;
}
/**
 * An object with methods that are called during the traversal of the coverage tree.
 * A visitor has the following methods that are called during tree traversal.
 *
 *   * `onStart(root, state)` - called before traversal begins
 *   * `onSummary(node, state)` - called for every summary node
 *   * `onDetail(node, state)` - called for every detail node
 *   * `onSummaryEnd(node, state)` - called after all children have been visited for
 *      a summary node.
 *   * `onEnd(root, state)` - called after traversal ends
 *
 * @param delegate - a partial visitor that only implements the methods of interest
 *  The visitor object supplies the missing methods as noops. For example, reports
 *  that only need the final coverage summary need implement `onStart` and nothing
 *  else. Reports that use only detailed coverage information need implement `onDetail`
 *  and nothing else.
 * @constructor
 */
declare class Visitor<N extends BaseNode = BaseNode> {
  delegate: PartialVisitor<N> | Visitor<N> | undefined;
  onStart: (root: N, state?: any) => void;
  onSummary: (node: N, state?: any) => void;
  onDetail: (node: N, state?: any) => void;
  onSummaryEnd: (node: N, state?: any) => void;
  onEnd: (root: N, state?: any) => void;
  constructor(delegate?: PartialVisitor<N> | Visitor<N>);
}
declare abstract class BaseNode {
  abstract getParent(): BaseNode | null;
  abstract getChildren(): BaseNode[];
  abstract isSummary(): boolean;
  isRoot(): boolean;
  /**
   * visit all nodes depth-first from this node down. Note that `onStart`
   * and `onEnd` are never called on the visitor even if the current
   * node is the root of the tree.
   * @param visitor a full visitor that is called during tree traversal
   * @param state optional state that is passed around
   */
  visit(visitor: Visitor<any>, state?: any): void;
}

//#region src/path.d.ts
type PathParser = (path: string) => path.ParsedPath;
declare class Path {
  v: string[];
  readonly length: number;
  push: (...items: string[]) => number;
  pop: () => string | undefined;
  shift: () => string | undefined;
  unshift: (...items: string[]) => number;
  splice: (start: number, deleteCount?: number, ...items: string[]) => string[];
  constructor(strOrArray: string | string[]);
  toString(): string;
  hasParent(): boolean;
  parent(): Path;
  elements(): string[];
  name(): string;
  contains(other: Path): boolean;
  ancestorOf(other: Path): boolean;
  descendantOf(other: Path): boolean;
  commonPrefixPath(other: Path): Path;
  static compare(a: Path, b: Path): number;
  static tester: {
    setParserAndSep(p: PathParser, sep: string): void;
    reset(): void;
  };
}

//#region src/coverage-summary.d.ts
/**
 * Totals for a single coverage metric (statements, lines, functions, branches).
 * `pct` is a percentage number (0-100), or the string `"Unknown"` for a blank
 * summary that has not yet been merged with any data.
 */
interface Totals {
  total: number;
  covered: number;
  skipped: number;
  pct: number | "Unknown";
}
/**
 * Raw, JSON-serializable data underlying a `CoverageSummary`.
 */
interface CoverageSummaryData {
  lines: Totals;
  statements: Totals;
  functions: Totals;
  branches: Totals;
  branchesTrue?: Totals;
}
/**
 * CoverageSummary provides a summary of code coverage . It exposes 4 properties,
 * `lines`, `statements`, `branches`, and `functions`. Each of these properties
 * is an object that has 4 keys `total`, `covered`, `skipped` and `pct`.
 * `pct` is a percentage number (0-100).
 */
declare class CoverageSummary {
  data: CoverageSummaryData;
  readonly lines: Totals;
  readonly statements: Totals;
  readonly functions: Totals;
  readonly branches: Totals;
  readonly branchesTrue: Totals | undefined;
  /**
   * @constructor
   * @param obj an optional data object or
   * another coverage summary to initialize this object with.
   */
  constructor(obj?: CoverageSummary | CoverageSummaryData);
  /**
   * merges a second summary coverage object into this one
   * @param obj - another coverage summary object
   */
  merge(obj: CoverageSummary): this;
  /**
   * returns a POJO that is JSON serializable. May be used to get the raw
   * summary object.
   */
  toJSON(): CoverageSummaryData;
  /**
   * return true if summary has no lines of code
   */
  isEmpty(): boolean;
}
//#endregion
//#region src/file-coverage.d.ts
/** a single location in a source file: 1-based line, 0-based column */
interface Location {
  line: number;
  column: number;
}
/** a source range delimited by a start and end location */
interface Range {
  start: Location;
  end: Location;
}
/** metadata for a single function in the instrumented source */
interface FunctionMapping {
  name: string;
  decl: Range;
  loc: Range;
  line: number;
}
/** metadata for a single branch in the instrumented source */
interface BranchMapping {
  loc: Range;
  type: string;
  locations: Range[];
  line: number;
}
/**
 * Raw, JSON-serializable coverage data for a single file, as produced by the
 * istanbul instrumenter or coverage tooling.
 */
interface FileCoverageData {
  path: string;
  statementMap: Record<string, Range>;
  fnMap: Record<string, FunctionMapping>;
  branchMap: Record<string, BranchMapping>;
  s: Record<string, number>;
  f: Record<string, number>;
  b: Record<string, number[]>;
  /** hit counts for logical branch truthiness; only present when reportLogic is enabled */
  bT?: Record<string, number[]>;
  /** marks coverage produced by the `--all` option (empty placeholder coverage) */
  all?: boolean;
}
/** per-line branch coverage as returned by `FileCoverage#getBranchCoverageByLine` */
interface Coverage {
  covered: number;
  total: number;
  coverage: number;
}
/**
 * provides a read-only view of coverage for a single file.
 * The deep structure of this object is documented elsewhere. It has the following
 * properties:
 *
 * * `path` - the file path for which coverage is being tracked
 * * `statementMap` - map of statement locations keyed by statement index
 * * `fnMap` - map of function metadata keyed by function index
 * * `branchMap` - map of branch metadata keyed by branch index
 * * `s` - hit counts for statements
 * * `f` - hit count for functions
 * * `b` - hit count for branches
 */
declare class FileCoverage {
  data: FileCoverageData;
  readonly path: string;
  readonly statementMap: Record<string, Range>;
  readonly fnMap: Record<string, FunctionMapping>;
  readonly branchMap: Record<string, BranchMapping>;
  readonly s: Record<string, number>;
  readonly f: Record<string, number>;
  readonly b: Record<string, number[]>;
  readonly bT: Record<string, number[]> | undefined;
  readonly all: boolean | undefined;
  /**
   * @constructor
   * @param pathOrObj is a string that initializes
   * and empty coverage object with the specified file path or a data object that
   * has all the required properties for a file coverage object.
   */
  constructor(pathOrObj?: string | FileCoverage | FileCoverageData, reportLogic?: boolean);
  /**
   * returns computed line coverage from statement coverage.
   * This is a map of hits keyed by line number in the source.
   */
  getLineCoverage(): Record<string, number>;
  /**
   * returns an array of uncovered line numbers.
   * @returns an array of line numbers for which no hits have been
   *  collected.
   */
  getUncoveredLines(): string[];
  /**
   * returns a map of branch coverage by source line number.
   * @returns an object keyed by line number. Each object
   * has a `covered`, `total` and `coverage` (percentage) property.
   */
  getBranchCoverageByLine(): Record<string, Coverage>;
  /**
   * return a JSON-serializable POJO for this file coverage object
   */
  toJSON(): FileCoverageData;
  /**
   * merges a second coverage object into this one, updating hit counts
   * @param other - the coverage object to be merged into this one.
   *  Note that the other object should have the same structure as this one (same file).
   */
  merge(other: FileCoverage): void;
  computeSimpleTotals(property: "getLineCoverage" | "s" | "f"): Totals;
  computeBranchTotals(property: "b" | "bT"): Totals;
  /**
   * resets hit counts for all statements, functions and branches
   * in this coverage object resulting in zero coverage.
   */
  resetHits(): void;
  /**
   * returns a CoverageSummary for this file coverage object
   * @returns {CoverageSummary}
   */
  toSummary(): CoverageSummary;
}
//#endregion
//#region src/coverage-map.d.ts
/**
 * Raw, JSON-serializable data underlying a `CoverageMap`: `FileCoverage`
 * objects or their raw data keyed by file path. This can be the raw global
 * coverage object.
 */
interface CoverageMapData {
  [path: string]: FileCoverage | FileCoverageData;
}
/** CoverageMap is a map of `FileCoverage` objects keyed by file paths. */
declare class CoverageMap {
  data: Record<string, FileCoverage>;
  /**
   * @constructor
   * @param obj A coverage map from which to initialize this
   * map's contents. This can be the raw global coverage object.
   */
  constructor(obj?: CoverageMap | CoverageMapData);
  /**
   * merges a second coverage map into this one
   * @param obj - a CoverageMap or its raw data. Coverage is merged
   *  correctly for the same files and additional file coverage keys are created
   *  as needed.
   */
  merge(obj: CoverageMap | CoverageMapData): void;
  /**
   * filter the coveragemap based on the callback provided
   * @param callback - Returns true if the path
   *  should be included in the coveragemap. False if it should be
   *  removed.
   */
  filter(callback: (path: string) => boolean): void;
  /**
   * returns a JSON-serializable POJO for this coverage map
   */
  toJSON(): CoverageMapData;
  /**
   * returns an array for file paths for which this map has coverage
   * @returns array of files
   */
  files(): string[];
  /**
   * returns the file coverage for the specified file.
   * @param file
   */
  fileCoverageFor(file: string): FileCoverage;
  /**
   * adds a file coverage object to this map. If the path for the object,
   * already exists in the map, it is merged with the existing coverage
   * otherwise a new key is added to the map.
   * @param fc the file coverage to add
   */
  addFileCoverage(fc: string | FileCoverage | FileCoverageData): void;
  /**
   * returns the coverage summary for all the file coverage objects in this map.
   * @returns {CoverageSummary}
   */
  getCoverageSummary(): CoverageSummary;
}

//#region src/summarizer-factory.d.ts
/** names of the summarizer strategies supported by {@link SummarizerFactory} */
type Summarizers = "flat" | "nested" | "pkg" | "defaultSummarizer";
declare class ReportNode extends BaseNode {
  path: Path;
  parent: ReportNode | null;
  fileCoverage: FileCoverage | undefined;
  children: ReportNode[];
  c_files?: CoverageSummary | null;
  c_full?: CoverageSummary | null;
  constructor(path: Path, fileCoverage?: FileCoverage);
  static createRoot(children: ReportNode[]): ReportNode;
  addChild(child: ReportNode): void;
  asRelative(p: string): string;
  getQualifiedName(): string;
  getRelativeName(): string;
  getParent(): ReportNode | null;
  getChildren(): ReportNode[];
  isSummary(): boolean;
  getFileCoverage(): FileCoverage;
  getCoverageSummary(filesOnly?: boolean): CoverageSummary | null;
}

/** options accepted by {@link ReportBase} */
interface ReportBaseOptions {
  /** the summarizer strategy to use when executing the report */
  summarizer?: Summarizers;
}

//#region src/reports/clover/index.d.ts
/** options accepted by {@link CloverReport} */
interface CloverOptions {
  /** the file to write the report to, defaults to `clover.xml` */
  file?: string;
}

//#region src/reports/cobertura/index.d.ts
/** options accepted by {@link CoberturaReport} */
interface CoberturaOptions {
  /** the file to write the report to, defaults to `cobertura-coverage.xml` */
  file?: string;
  /** timestamp to embed in the report, defaults to `Date.now()` */
  timestamp?: string;
  /** the project root used to relativize file paths, defaults to `process.cwd()` */
  projectRoot?: string;
}

//#region src/reports/html/index.d.ts
/** maps report nodes to output paths, see the html report's `linkMapper` option */
interface LinkMapper {
  getPath(node: ReportNode | string): string;
  relativePath(source: ReportNode | string, target: ReportNode | string): string;
  assetPath(node: ReportNode, name: string): string;
}
/** color themes of the html report, `legacy` being the classic istanbul colors */
type HtmlTheme = "light" | "dark" | "legacy";
/** options accepted by {@link HtmlReport} */
interface HtmlOptions {
  /** show extra logging while the report is generated */
  verbose?: boolean;
  /** maps report nodes to output paths */
  linkMapper?: LinkMapper;
  /** subdirectory (under the report dir) to write the report to */
  subdir?: string;
  /** skip nodes with no coverage */
  skipEmpty?: boolean;
  /**
   * fixes the report's theme and hides the theme picker; when unset, viewers
   * pick a theme in the report, which otherwise follows their light/dark
   * preference, or the page embedding the report, like Vitest UI
   */
  theme?: HtmlTheme;
}

//#region src/reports/html-spa/index.d.ts
/** options accepted by {@link HtmlSpaReport} */
interface HtmlSpaOptions extends Omit<HtmlOptions, "theme"> {
  /** the metrics to show in the report UI, defaults to lines, branches and functions */
  metricsToShow?: ("lines" | "branches" | "functions" | "statements")[];
}

//#region src/reports/json-summary/index.d.ts
/** options accepted by {@link JsonSummaryReport} */
interface JsonSummaryOptions {
  /** the file to write the report to, defaults to `coverage-summary.json` */
  file?: string;
}

//#region src/reports/json/index.d.ts
/** options accepted by {@link JsonReport} */
interface JsonOptions$1 {
  /** the file to write the report to, defaults to `coverage-final.json` */
  file?: string;
}

//#region src/reports/lcovonly/index.d.ts
/** options accepted by {@link LcovOnlyReport} */
interface LcovOnlyOptions {
  /** the file to write the report to, defaults to `lcov.info` */
  file?: string;
  /** the project root used to relativize file paths, defaults to `process.cwd()` */
  projectRoot?: string;
}

//#region src/reports/lcov/index.d.ts
/** options accepted by {@link LcovReport}, passed through to the lcovonly report */
interface LcovOptions extends LcovOnlyOptions {}

//#region src/reports/teamcity/index.d.ts
/** options accepted by {@link TeamcityReport} */
interface TeamcityOptions {
  /** the file to write the report to, defaults to the console */
  file?: string | null;
  /** the teamcity block name to wrap the output in, defaults to `Code Coverage Summary` */
  blockName?: string;
}

//#region src/reports/text-lcov/index.d.ts
/** options accepted by {@link TextLcov}, `file` is always the console */
interface TextLcovOptions {
  /** the project root used to relativize file paths, defaults to `process.cwd()` */
  projectRoot?: string;
}

//#region src/reports/text-summary/index.d.ts
/** options accepted by {@link TextSummaryReport} */
interface TextSummaryOptions {
  /** the file to write the report to, defaults to the console */
  file?: string | null;
}

//#region src/reports/text/index.d.ts
/** options accepted by {@link TextReport} */
interface TextOptions extends ReportBaseOptions {
  /** the file to write the report to, defaults to the console */
  file?: string | null;
  /** maximum column width of the table, defaults to the terminal width */
  maxCols?: number;
  /** skip rows with no coverage */
  skipEmpty?: boolean;
  /** skip rows with full coverage */
  skipFull?: boolean;
}

/** options accepted by each built-in report, keyed by report name */
interface ReportOptions {
  clover: CloverOptions;
  cobertura: CoberturaOptions;
  html: HtmlOptions;
  "html-spa": HtmlSpaOptions;
  json: JsonOptions$1;
  "json-summary": JsonSummaryOptions;
  lcov: LcovOptions;
  lcovonly: LcovOnlyOptions;
  none: never;
  teamcity: TeamcityOptions;
  text: TextOptions;
  "text-lcov": TextLcovOptions;
  "text-summary": TextSummaryOptions;
}

type TransformResult = string | Partial<TransformResult$1> | undefined | null | void;
type CoverageResults = unknown;
interface CoverageProvider {
	name: string;
	/** Called when provider is being initialized before tests run */
	initialize: (ctx: Vitest) => Promise<void> | void;
	/** Called when setting coverage options for Vitest context (`ctx.config.coverage`) */
	resolveOptions: () => ResolvedCoverageOptions;
	/** Callback to clean previous reports */
	clean: (clean?: boolean) => void | Promise<void>;
	/** Called with coverage results after a single test file has been run */
	onAfterSuiteRun: (meta: AfterSuiteRunMeta) => void | Promise<void>;
	/** Callback called when test run starts */
	onTestRunStart?: (specifications: ReadonlyArray<TestSpecification>) => void | Promise<void>;
	/** Callback called when test run fails due to test failures */
	onTestFailure?: () => void | Promise<void>;
	/** Callback to generate final coverage results */
	generateCoverage: (reportContext: ReportContext) => CoverageResults | Promise<CoverageResults>;
	/** Callback to convert coverage results to coverage reports. Called with results returned from `generateCoverage` */
	reportCoverage: (coverage: CoverageResults, reportContext: ReportContext) => void | Promise<void>;
	/** Callback for `--merge-reports` options. Called with multiple coverage results generated by `generateCoverage`. */
	mergeReports?: (coverages: CoverageResults[]) => void | Promise<void>;
	/** Callback called for instrumenting files with coverage counters. */
	onFileTransform?: (sourceCode: string, id: string, pluginCtx: any) => TransformResult | Promise<TransformResult>;
	/**
	* Return `true` if this file is transformed by the coverage provider.
	* This is used to generate the persistent file hash by `fsModuleCache`
	* @experimental
	*/
	requiresTransform?: (id: string) => boolean;
	/**
	* Version of the coverage provider. Can be used as cache key in various caching mechanisms.
	* @experimental
	*/
	version?: string;
	/**
	* Return data that should be stored with the transformed module in `fsModuleCache`,
	* e.g. data collected in `onFileTransform`. The data must be JSON serializable.
	* When the module is later loaded from `fsModuleCache`, `onFileTransform` is not called.
	* The data is passed to `restoreModuleCacheData` instead.
	* @experimental
	*/
	getModuleCacheData?: (environment: DevEnvironment, id: string) => unknown;
	/**
	* Called with the data returned by `getModuleCacheData` when the module is loaded from `fsModuleCache`.
	* @experimental
	*/
	restoreModuleCacheData?: (environment: DevEnvironment, id: string, data: unknown) => void;
	/** Callback that's called when the coverage is enabled via a programmatic `enableCoverage` API. */
	onEnabled?: () => void | Promise<void>;
}
interface ReportContext {
	/** Indicates whether all tests were run. False when only specific tests were run. */
	allTestsRun?: boolean;
}
interface CoverageProviderModule extends RuntimeCoverageProviderModule {
	/**
	* Factory for creating a new coverage provider
	*/
	getProvider: () => CoverageProvider | Promise<CoverageProvider>;
}
type CoverageReporter = keyof ReportOptions | (string & {});
type CoverageReporterWithOptions<ReporterName extends CoverageReporter = CoverageReporter> = ReporterName extends keyof ReportOptions ? ReportOptions[ReporterName] extends never ? [ReporterName, object] : [ReporterName, Partial<ReportOptions[ReporterName]>] : [ReporterName, Record<string, unknown>];
/** Fields that have default values. Internally these will always be defined. */
type FieldsWithDefaultValues = "provider" | "enabled" | "clean" | "cleanOnRerun" | "reportsDirectory" | "exclude" | "reportOnFailure" | "allowExternal" | "processingConcurrency" | "reporter" | "excludeAfterRemap" | "ignoreClassMethods" | "skipFull" | "watermarks" | "autoAttachSubprocess";
type ResolvedCoverageOptions = CoverageOptions & Required<Pick<CoverageOptions, FieldsWithDefaultValues>> & {
	reporter: CoverageReporterWithOptions[];
	htmlDir?: string;
};
interface CoverageOptions {
	/**
	* Coverage provider to use.
	*
	* @default 'v8'
	*/
	provider?: "v8" | "istanbul" | "custom";
	/**
	* Enables coverage collection. Can be overridden using `--coverage` CLI option.
	*
	* @default false
	*/
	enabled?: boolean;
	/**
	* List of files included in coverage as glob patterns.
	* By default only files covered by tests are included.
	*
	* See [Including and excluding files from coverage report](https://vitest.dev/guide/coverage.html#including-and-excluding-files-from-coverage-report) for examples.
	*/
	include?: string[];
	/**
	* List of files excluded from coverage as glob patterns.
	* Files are first checked against `coverage.include`.
	*
	* See [Including and excluding files from coverage report](https://vitest.dev/guide/coverage.html#including-and-excluding-files-from-coverage-report) for examples.
	*/
	exclude?: string[];
	/**
	* Clean coverage results before running tests
	*
	* @default true
	*/
	clean?: boolean;
	/**
	* Clean coverage report on watch rerun
	*
	* @default true
	*/
	cleanOnRerun?: boolean;
	/**
	* Directory to write coverage report to
	*
	* @default './coverage'
	*/
	reportsDirectory?: string;
	/**
	* Coverage reporters to use.
	* See [istanbul documentation](https://istanbul.js.org/docs/advanced/alternative-reporters/) for detailed list of all reporters.
	*
	* @default ['text', 'html', 'clover', 'json']
	*/
	reporter?: Arrayable<CoverageReporter> | (CoverageReporter | [CoverageReporter] | CoverageReporterWithOptions)[];
	/**
	* Do not show files with 100% statement, branch, and function coverage
	*
	* @default false
	*/
	skipFull?: boolean;
	/**
	* Configurations for thresholds
	*
	* @example
	*
	* ```ts
	* {
	*   // Thresholds for all files
	*   functions: 95,
	*   branches: 70,
	*   perFile: true,
	*   autoUpdate: true,
	*
	*   // Thresholds for utilities
	*   'src/utils/**.ts': {
	*     lines: 100,
	*     statements: 95,
	*   }
	* }
	* ```
	*/
	thresholds?: Thresholds | ({
		[glob: string]: Pick<Thresholds, 100 | "statements" | "functions" | "branches" | "lines" | "perFile">;
	} & Thresholds);
	/**
	* Watermarks for statements, lines, branches and functions.
	*
	* Default value is `[50,80]` for each property.
	*/
	watermarks?: {
		statements?: [number, number];
		functions?: [number, number];
		branches?: [number, number];
		lines?: [number, number];
	};
	/**
	* Generate coverage report even when tests fail.
	*
	* @default false
	*/
	reportOnFailure?: boolean;
	/**
	* Collect coverage of files outside the project `root`.
	*
	* @default false
	*/
	allowExternal?: boolean;
	/**
	* Apply exclusions again after coverage has been remapped to original sources.
	* This is useful when your source files are transpiled and may contain source maps
	* of non-source files.
	*
	* Use this option when you are seeing files that show up in report even if they
	* match your `coverage.exclude` patterns.
	*
	* @default false
	*/
	excludeAfterRemap?: boolean;
	/**
	* Concurrency limit used when processing the coverage results.
	* Defaults to `Math.min(20, os.availableParallelism())`
	*/
	processingConcurrency?: number;
	/**
	* Track coverage of the `node:child_process` and `node:worker_threads` spawned during test run.
	* Supported only by `v8` provider.
	*
	* @default false
	*/
	autoAttachSubprocess?: boolean;
	/**
	* Set to array of class method names to ignore for coverage
	*
	* @default []
	*/
	ignoreClassMethods?: string[];
	/**
	* Filter to ignore code from coverage based on its AST node.
	* Called only for nodes that Vitest's built-in filters don't already ignore.
	* Return `'ignore-this-and-nested-nodes'` to also ignore all nodes inside the given node.
	* Supported only by `v8` provider.
	*
	* @example
	* ```ts
	* ignoreNode: (node, type) => type === 'statement' && node.type === 'DebuggerStatement'
	* ```
	*/
	ignoreNode?: (node: ESTree.Node, type: "function" | "statement" | "branch") => boolean | "ignore-this-and-nested-nodes" | void;
	/**
	* Custom instrumenter factory to use instead of the default `@vitest/istanbul-lib-instrument`.
	*
	* The factory receives the same runtime coverage options Vitest passes to its
	* built-in Istanbul instrumenter and must return an object implementing the
	* `CoverageInstrumenter` interface.
	*
	* This allows using faster instrumenters (e.g., oxc-coverage-instrument, SWC) while
	* keeping the Istanbul coverage pipeline for collection, merging, and reporting.
	*
	* @example
	* ```ts
	* import { defineConfig } from 'vitest/config'
	* import { createOxcInstrumenter } from 'oxc-coverage-instrument/vitest'
	*
	* export default defineConfig({
	*   test: {
	*     coverage: {
	*       provider: 'istanbul',
	*       instrumenter: options => createOxcInstrumenter(options),
	*     }
	*   }
	* })
	*
	* @experimental
	*/
	instrumenter?: (options: InstrumenterOptions) => CoverageInstrumenter;
	/**
	* Directory of HTML coverage output to be served in UI mode and HTML reporter.
	* This is automatically configured for builtin reporter with html output (`html`, `html-spa`, and `lcov` reporters).
	* Use this option to override with custom coverage reporting location.
	*/
	htmlDir?: string;
	/**
	* Collect coverage only for files changed since a specified commit or branch.
	* Inherits the default value from `test.changed`.
	*/
	changed?: boolean | string;
	/**
	* Name of the module or path to a file to load the custom provider from
	*/
	customProviderModule?: string;
}
interface Thresholds {
	/** Set global thresholds to `100` */
	100?: boolean;
	/**
	* Check thresholds per file. When set to an object, the top-level thresholds
	* still apply to the aggregate and every file must additionally meet these
	* per-file minimums.
	*
	* Can also be set per glob pattern via `thresholds['<glob>'].perFile`. Glob
	* patterns do not inherit this top-level `perFile`; set it on each glob
	* explicitly.
	*
	* @default false
	*/
	perFile?: boolean | Pick<Thresholds, 100 | "statements" | "functions" | "branches" | "lines">;
	/**
	* Update threshold values automatically when current coverage is higher than earlier thresholds
	* Also can accept a function to format the new threshold values
	*
	* @default false
	*/
	autoUpdate?: boolean | ((newThreshold: number, previousThreshold: number) => number);
	/** Thresholds for statements */
	statements?: number;
	/** Thresholds for functions */
	functions?: number;
	/** Thresholds for branches */
	branches?: number;
	/** Thresholds for lines */
	lines?: number;
}
/**
* Options passed to the custom instrumenter factory.
*/
interface InstrumenterOptions {
	/** Global variable name that Vitest uses to store coverage data at runtime. */
	coverageVariable: string;
	/** Global scope where the coverage variable is attached at runtime. */
	coverageGlobalScope: string;
	/** Whether the coverage global scope should be resolved through an evaluated function. */
	coverageGlobalScopeFunc: boolean;
	/** Class method names to exclude from function coverage. */
	ignoreClassMethods: string[];
}
/**
* Interface for custom coverage instrumenters.
*
* Matches the subset of istanbul-lib-instrument's `Instrumenter` that Vitest
* actually uses. Implement this to plug in a faster instrumenter while keeping
* the Istanbul coverage pipeline for collection, merging, and reporting.
*/
interface CoverageInstrumenter {
	/** Instrument source code synchronously. Returns the instrumented code string. */
	instrumentSync: (code: string, filename: string, inputSourceMap?: any) => string;
	/** Get the source map of the last instrumented file. */
	lastSourceMap: () => any;
	/** Get the Istanbul-compatible file coverage object of the last instrumented file. */
	lastFileCoverage: () => any;
}
/** @deprecated Use `CoverageOptions` instead */
interface CoverageV8Options extends CoverageOptions {}
/** @deprecated Use `CoverageOptions` instead */
interface CoverageIstanbulOptions extends CoverageOptions {}
/** @deprecated Use `CoverageOptions` instead */
interface BaseCoverageOptions extends CoverageOptions {}
/** @deprecated Use `CoverageOptions` instead */
interface CustomProviderOptions extends CoverageOptions {}

interface TestRunResult {
	testModules: TestModule[];
	unhandledErrors: unknown[];
}

interface ModuleDependency {
	/**
	* Absolute path of the file.
	*/
	file: string;
	/**
	* Start time of the oldest run that recorded the file, in milliseconds since the epoch.
	* A change after this time was not seen by every test file that depends on the file.
	* It is not set when the dependency comes from the static module graph.
	*/
	recordedAt?: number;
}
interface ModulesResolver {
	/**
	* Every file whose change can affect the test files of the run.
	*/
	getDependencies(): Promise<ModuleDependency[]>;
}
interface VCSProviderOptions {
	root: string;
	changedSince?: string | boolean;
	/**
	* Resolves the dependencies of the test files of the run.
	*/
	resolver: ModulesResolver;
}
interface VCSProvider {
	findChangedFiles(options: VCSProviderOptions): Promise<string[]>;
}

declare class SnapshotManager {
	options: Omit<SnapshotStateOptions, "snapshotEnvironment">;
	summary: SnapshotSummary;
	extension: string;
	constructor(options: Omit<SnapshotStateOptions, "snapshotEnvironment">);
	clear(): void;
	add(result: SnapshotResult): void;
	resolvePath<T = any>(testPath: string, context?: T): string;
	resolveRawPath(testPath: string, rawPath: string): string;
}

interface CachedTestFileResult {
	/**
	* The file has a known failure.
	* A complete run of the file clears it, or a run in which every known failed test passes.
	*/
	failed: boolean;
	/**
	* Duration of the last complete run in milliseconds.
	* A file that never ran completely keeps the duration of its first recorded run.
	*/
	duration: number;
	/**
	* Unix timestamp in milliseconds of the start of the last complete run.
	* It is not set if the file never ran completely.
	*/
	lastRun?: number;
	/**
	* Full names of the tests that failed in the last run of the file. `--last-failed` runs only these tests.
	* It is not set if the failure happened outside of tests, for example in a hook or during collection.
	*/
	failedTests?: string[];
}

declare class VitestCache {
	private fileStats;
	private warnedMethods;
	/**
	* Returns the result of the test file from the previous test runs.
	*/
	getTestSpecificationResult(specification: TestSpecification): CachedTestFileResult | undefined;
	/**
	* @deprecated Use `getTestSpecificationResult(specification)` instead.
	*/
	getFileTestResults(key: string): CachedTestFileResult | undefined;
	/**
	* @deprecated Vitest does not cache file sizes anymore. Read the size from the file system instead.
	*/
	getFileStats(key: string): {
		size: number;
	} | undefined;
	private readFileStats;
	private deprecate;
}

type TestRunEndReason = "passed" | "interrupted" | "failed";
interface Reporter {
	onInit?: (vitest: Vitest) => void;
	/**
	* Called when the project initiated the browser instance.
	* project.browser will always be defined.
	*/
	onBrowserInit?: (project: TestProject) => Awaitable<void>;
	onTestRemoved?: (trigger?: string) => Awaitable<void>;
	onWatcherStart?: (files?: File[], errors?: unknown[]) => Awaitable<void>;
	onWatcherRerun?: (files: string[], trigger?: string) => Awaitable<void>;
	onServerRestart?: (reason?: string) => Awaitable<void>;
	onUserConsoleLog?: (log: UserConsoleLog) => Awaitable<void>;
	onProcessTimeout?: () => Awaitable<void>;
	/**
	* Called when the new test run starts.
	*/
	onTestRunStart?: (specifications: ReadonlyArray<TestSpecification>) => Awaitable<void>;
	/**
	* Called when the test run is finished.
	*/
	onTestRunEnd?: (testModules: ReadonlyArray<TestModule>, unhandledErrors: ReadonlyArray<SerializedError>, reason: TestRunEndReason) => Awaitable<void>;
	/**
	* Called when the module is enqueued for testing. The file itself is not loaded yet.
	*/
	onTestModuleQueued?: (testModule: TestModule) => Awaitable<void>;
	/**
	* Called when the test file is loaded and the module is ready to run tests.
	*/
	onTestModuleCollected?: (testModule: TestModule) => Awaitable<void>;
	/**
	* Called when starting to run tests of the test file
	*/
	onTestModuleStart?: (testModule: TestModule) => Awaitable<void>;
	/**
	* Called when all tests of the test file have finished running.
	*/
	onTestModuleEnd?: (testModule: TestModule) => Awaitable<void>;
	/**
	* Called when test case is ready to run.
	* Called before the `beforeEach` hooks for the test are run.
	*/
	onTestCaseReady?: (testCase: TestCase) => Awaitable<void>;
	/**
	* Called after the test and its hooks are finished running.
	* The `result()` cannot be `pending`.
	*/
	onTestCaseResult?: (testCase: TestCase) => Awaitable<void>;
	/**
	* Called when annotation is added via the `task.annotate` API.
	*/
	onTestCaseAnnotate?: (testCase: TestCase, annotation: TestAnnotation) => Awaitable<void>;
	/**
	* Called when artifacts are recorded on tests via the `recordArtifact` utility.
	*/
	onTestCaseArtifactRecord?: (testCase: TestCase, artifact: TestArtifact) => Awaitable<void>;
	/**
	* Called when test suite is ready to run.
	* Called before the `beforeAll` hooks for the test are run.
	*/
	onTestSuiteReady?: (testSuite: TestSuite) => Awaitable<void>;
	/**
	* Called after the test suite and its hooks are finished running.
	* The `state` cannot be `pending`.
	*/
	onTestSuiteResult?: (testSuite: TestSuite) => Awaitable<void>;
	/**
	* Called before the hook starts to run.
	*/
	onHookStart?: (hook: ReportedHookContext) => Awaitable<void>;
	/**
	* Called after the hook finished running.
	*/
	onHookEnd?: (hook: ReportedHookContext) => Awaitable<void>;
	onCoverage?: (coverage: unknown) => Awaitable<void>;
	/**
	* @experimental
	* Called after the benchmark is finished.
	*/
	onTestCaseBenchmark?: (testCase: TestCase, benchmark: TestBenchmark) => Awaitable<void>;
}

interface BlobOptions {
	outputFile?: string;
	label?: string;
}
declare class BlobReporter implements Reporter {
	start: number;
	ctx: Vitest;
	options: BlobOptions;
	coverage: unknown | undefined;
	constructor(options: BlobOptions);
	onInit(ctx: Vitest): void;
	onCoverage(coverage: unknown): void;
	onTestRunEnd(testModules: ReadonlyArray<TestModule>, unhandledErrors: ReadonlyArray<SerializedError>): Promise<void>;
}
interface MergedBlobs {
	files: File[];
	errors: unknown[];
	coverages: unknown[];
	executionTimes: number[];
}

declare class StateManager {
	filesMap: Map<string, File[]>;
	pathsSet: Set<string>;
	idMap: Map<string, Task>;
	taskFileMap: WeakMap<Task, File>;
	errorsSet: Set<unknown>;
	leakSet: Set<AsyncLeak>;
	reportedTasksMap: WeakMap<Task, TestModule | TestCase | TestSuite>;
	blobs?: MergedBlobs;
	/**
	* Total time spent starting test workers (spawning the process/thread, loading
	* the worker bundle and setting up the test environment). Used to surface the
	* cost of `isolate: true`, which spawns a fresh worker per test file.
	*/
	startupTime: number;
	/** Number of test workers that were started during the run. */
	workersSpawned: number;
	metadata: Record<string, {
		externalized: Record<string, string>;
		duration: Record<string, number[]>;
		tmps: Record<string, string>;
		dumpDir?: string;
		outline?: {
			externalized: number;
			inlined: number;
		};
	}>;
	onUnhandledError?: OnUnhandledErrorCallback;
	constructor(options: {
		onUnhandledError?: OnUnhandledErrorCallback;
	});
	catchError(error: unknown, type: string): void;
	catchLeaks(leaks: AsyncLeak[]): void;
	clearErrors(): void;
	getUnhandledErrors(): unknown[];
	getPaths(): string[];
	/**
	* Return files that were running or collected.
	*/
	getFiles(keys?: string[]): File[];
	getTestModules(keys?: string[]): TestModule[];
	getFilepaths(): string[];
	getFailedFilepaths(): string[];
	collectPaths(paths?: string[]): void;
	collectFiles(project: TestProject, files?: File[]): void;
	clearFiles(project: TestProject, paths?: string[]): void;
	updateId(task: Task, project: TestProject): void;
	getReportedEntity(task: Task): TestModule | TestCase | TestSuite | undefined;
	getReportedEntityById(taskId: string): TestModule | TestCase | TestSuite | undefined;
	updateTasks(packs: TaskResultPack[]): void;
	updateUserLog(log: UserConsoleLog): void;
	getCountOfFailedTests(): number;
	cancelFiles(files: FileSpecification[], project: TestProject): void;
}

type EventName = "add" | "addDir" | "change" | "unlink" | "unlinkDir";
type TrackEventName = EventName | "any";
type Track = (filepath: string, options?: {
	timeout?: number;
	type?: TrackEventName;
}) => Promise<void>;
declare class VitestWatcher {
	private vitest;
	/**
	* Modules that will be invalidated on the next run.
	*/
	readonly invalidates: Set<string>;
	/**
	* Test files that have changed and need to be rerun.
	*/
	readonly changedTests: Set<string>;
	private readonly _onRerun;
	private trackers;
	constructor(vitest: Vitest);
	close(): void;
	unregisterWatcher: () => void;
	registerWatcher(): this;
	private scheduleRerun;
	private getTestFilesFromWatcherTrigger;
	onFileChange: (id: string) => void;
	onFileDelete: (id: string) => void;
	onFileCreate: (id: string) => void;
	private handleProjectFile;
	/**
	* @returns A value indicating whether rerun is needed (changedTests was mutated)
	*/
	private handleFileChanged;
	createTracker(): {
		track: Track;
		stop: () => void;
	};
	private track;
	private handleTrackEvent;
	private resolveTrackEvent;
}
interface WatcherTriggerPattern {
	pattern: RegExp;
	testsToRun: (file: string, match: RegExpMatchArray) => string[] | string | null | undefined | void;
}

interface VitestOptions {
	packageInstaller?: VitestPackageInstaller;
	stdin?: NodeJS.ReadStream;
	stdout?: NodeJS.WriteStream | Writable;
	stderr?: NodeJS.WriteStream | Writable;
}
declare class Vitest {
	/**
	* Current Vitest version.
	* @example '2.0.0'
	*/
	readonly version: string;
	static readonly version: string;
	/**
	* The logger instance used to log messages. It's recommended to use this logger instead of `console`.
	* It's possible to override stdout and stderr streams when initiating Vitest.
	* @example
	* new Vitest({
	*   stdout: new Writable(),
	* })
	*/
	readonly logger: Logger;
	/**
	* The package installer instance used to install Vitest packages.
	* @example
	* await vitest.packageInstaller.ensureInstalled('@vitest/browser', process.cwd())
	*/
	readonly packageInstaller: VitestPackageInstaller;
	/**
	* A path to the built Vitest directory. This is usually a folder in `node_modules`.
	*/
	readonly distPath: string;
	/**
	* A list of projects that are currently running.
	* If projects were filtered with `--project` flag, they won't appear here.
	*/
	projects: TestProject[];
	/**
	* A watcher handler. This is not the file system watcher. The handler only
	* exposes methods to handle changed files.
	*
	* If you have your own watcher, you can use these methods to replicate
	* Vitest behaviour.
	*/
	readonly watcher: VitestWatcher;
	/**
	* The version control system provider used to detect changed files.
	* This is used with the `--changed` flag to determine which test files to run.
	* By default, Vitest uses Git. You can provide a custom implementation via
	* `experimental.vcsProvider` in your config.
	*/
	vcs: VCSProvider;
	/**
	* The global config.
	*/
	config: ResolvedConfig;
	/**
	* Resolved global vite config.
	*/
	viteConfig: ResolvedConfig$1;
	/**
	* Global Vite's dev server instance.
	*/
	vite: ViteDevServer;
	/**
	* The global test state manager.
	* @experimental The State API is experimental and not subject to semver.
	*/
	state: StateManager;
	/**
	* The global snapshot manager. You can access the current state on `snapshot.summary`.
	*/
	snapshot: SnapshotManager;
	/**
	* The cache of the previous test runs. Primarily used by the sequencer to sort tests.
	*/
	cache: VitestCache;
	private _warnedExperimentalCacheKeyGenerator;
	private isFirstRun;
	private restartsCount;
	private readonly specifications;
	private pool;
	private _coverageProvider?;
	/**
	* @deprecated Do not rely on this property, it's always `test`. Scheduled to be removed in the next major.
	*/
	readonly mode = "test";
	constructor(harness: PluginHarness, viteConfig: ResolvedConfig$1);
	private _onRestartListeners;
	private _onClose;
	private _onSetServer;
	private _onCancelListeners;
	private _onUserTestsRerun;
	private _onFilterWatchedSpecification;
	private _restartPromise?;
	private _restartQueued;
	private _restart;
	private _restartNow;
	listTags(): Promise<void>;
	enableCoverage(): Promise<void>;
	disableCoverage(): void;
	private clearAllCachePaths;
	private _coverageOverrideCache;
	/**
	* Inject new test projects into the workspace.
	* @param config Glob, config path or a custom config options.
	* @returns An array of new test projects. Can be empty if the name was filtered out.
	*/
	private injectTestProject;
	/**
	* Provide a value to the test context. This value will be available to all tests with `inject`.
	*/
	provide: <T extends keyof ProvidedContext & string>(key: T, value: ProvidedContext[T]) => void;
	/**
	* Get global provided context.
	*/
	getProvidedContext(): ProvidedContext;
	/**
	* Return project that has the root (or "global") config.
	*/
	getRootProject(): TestProject;
	get serializedRootConfig(): SerializedRootConfig;
	getProjectByName(name: string): TestProject;
	/**
	* Import a file using Vite module runner. The file will be transformed by Vite and executed in a separate context.
	* @param moduleId The ID of the module in Vite module graph
	*/
	import<T>(moduleId: string): Promise<T>;
	/**
	* Creates a coverage provider if `coverage` is enabled in the config.
	*/
	createCoverageProvider(): Promise<CoverageProvider | null>;
	/**
	* Glob test files in every project and create a TestSpecification for each file and pool.
	* @param filters String filters to match the test files.
	*/
	globTestSpecifications(filters?: string[]): Promise<TestSpecification[]>;
	private initCoverageProvider;
	/**
	* @deprecated Use `clearCache` instead.
	*/
	experimental_clearCache(): Promise<void>;
	/**
	* Deletes all Vitest caches, including the `fsModuleCache`.
	*/
	clearCache(): Promise<void>;
	/**
	* Merge reports from multiple runs located in the specified directory (value from `--merge-reports` if not specified).
	*/
	mergeReports(directory?: string): Promise<TestRunResult>;
	/**
	* Returns the seed, if tests are running in a random order.
	*/
	getSeed(): number | null;
	collect(filters?: string[], options?: {
		staticParse?: boolean;
		staticParseConcurrency?: number;
	}): Promise<TestRunResult>;
	/**
	* Returns the list of test files that match the config and filters.
	* @param filters String filters to match the test files
	*/
	getRelevantTestSpecifications(filters?: string[]): Promise<TestSpecification[]>;
	/**
	* Initialize reporters, the coverage provider, and run tests.
	* This method can throw an error:
	*   - `FilesNotFoundError` if no tests are found
	*   - `GitNotFoundError` if `--related` flag is used, but git repository is not initialized
	*   - `Error` from the user reporters
	* @param filters String filters to match the test files
	*/
	start(filters?: string[]): Promise<TestRunResult>;
	/**
	* @deprecated use `standalone()` instead
	*/
	init(): Promise<void>;
	/**
	* Initialize reporters and the coverage provider. This method doesn't run any tests.
	* If the `--watch` flag is provided, Vitest will still run changed tests even if this method was not called.
	*/
	standalone(): Promise<void>;
	/**
	* If there is a test run happening, returns a promise that will
	* resolve when the test run is finished.
	*/
	waitForTestRunEnd(): Promise<void>;
	/**
	* Get test specifications associated with the given module. If module is not a test file, an empty array is returned.
	*
	* **Note:** this method relies on a cache generated by `globTestSpecifications`. If the file was not processed yet, use `project.matchesGlobPattern` instead.
	* @param moduleId The module ID to get test specifications for.
	*/
	getModuleSpecifications(moduleId: string): TestSpecification[];
	/**
	* Vitest automatically caches test specifications for each file. This method clears the cache for the given file or the whole cache altogether.
	*/
	clearSpecificationsCache(moduleId?: string): void;
	/**
	* Run tests for the given test specifications. This does not trigger `onWatcher*` events.
	* @param specifications A list of specifications to run.
	* @param allTestsRun Indicates whether all tests were run. This only matters for coverage.
	*/
	runTestSpecifications(specifications: TestSpecification[], allTestsRun?: boolean): Promise<TestRunResult>;
	/**
	* Runs tests for the given file paths. This does not trigger `onWatcher*` events.
	* @param filepaths A list of file paths to run tests for.
	* @param allTestsRun Indicates whether all tests were run. This only matters for coverage.
	*/
	runTestFiles(filepaths: string[], allTestsRun?: boolean): Promise<TestRunResult>;
	/**
	* Rerun files and trigger `onWatcherRerun`, `onWatcherStart` and `onTestsRerun` events.
	* @param specifications A list of specifications to run.
	* @param allTestsRun Indicates whether all tests were run. This only matters for coverage.
	*/
	rerunTestSpecifications(specifications: TestSpecification[], allTestsRun?: boolean): Promise<TestRunResult>;
	private runFiles;
	/**
	* Returns module's diagnostic. If `testModule` is not provided, `selfTime` and `totalTime` will be aggregated across all tests.
	*
	* If the module was not transformed or executed, the diagnostic will be empty.
	* @experimental
	* @see {@link https://vitest.dev/api/advanced/vitest#getsourcemodulediagnostic}
	*/
	experimental_getSourceModuleDiagnostic(moduleId: string, testModule?: TestModule): Promise<SourceModuleDiagnostic>;
	/**
	* @deprecated Use `parseSpecifications` instead
	*/
	experimental_parseSpecifications(specifications: TestSpecification[], options?: {
		/** @default os.availableParallelism() */
		concurrency?: number;
	}): Promise<TestModule[]>;
	parseSpecifications(specifications: TestSpecification[], options?: {
		/** @default os.availableParallelism() */
		concurrency?: number;
	}): Promise<TestModule[]>;
	experimental_parseSpecification(specification: TestSpecification): Promise<TestModule>;
	/**
	* Collect tests in specified modules. Vitest will run the files to collect tests.
	* @param specifications A list of specifications to run.
	*/
	collectTests(specifications: TestSpecification[]): Promise<TestRunResult>;
	/**
	* Gracefully cancel the current test run. Vitest will wait until all running tests are finished before cancelling.
	*/
	cancelCurrentRun(reason: CancelReason): Promise<void>;
	private initializeGlobalSetup;
	/**
	* Update snapshots in specified files. If no files are provided, it will update files with failed tests and obsolete snapshots.
	* @param files The list of files on the file system
	*/
	updateSnapshot(files?: string[]): Promise<TestRunResult>;
	/**
	* Enable the mode that allows updating snapshots when running tests.
	* This method doesn't run any tests.
	*
	* Every test that runs after this method is called will update snapshots.
	* To disable the mode, call `resetSnapshotUpdate`.
	*/
	enableSnapshotUpdate(): void;
	/**
	* Disable the mode that allows updating snapshots when running tests.
	*/
	resetSnapshotUpdate(): void;
	/**
	* Set the global test name pattern to a regexp.
	* This method doesn't run any tests.
	*/
	setGlobalTestNamePattern(pattern: string | RegExp): void;
	/**
	* Returns the regexp used for the global test name pattern.
	*/
	getGlobalTestNamePattern(): RegExp | undefined;
	/**
	* Resets the global test name pattern. This method doesn't run any tests.
	*/
	resetGlobalTestNamePattern(): void;
	private _rerunTimer;
	private scheduleRerun;
	/**
	* Invalidate a file in all projects.
	*/
	invalidateFile(filepath: string): void;
	private reportCoverage;
	/**
	* Closes all projects and their associated resources.
	* This can only be called once; the closing promise is cached until the server restarts.
	*/
	close(): Promise<void>;
	/**
	* Removes the root temp directory with the tmp module copies,
	* mirroring `TestProject.clearTmpDir()`. The reference is cleared before
	* the removal so a repeated close is a no-op.
	*/
	private _clearTmpDir;
	/**
	* Closes all projects and exit the process
	* @param force If true, the process will exit immediately after closing the projects.
	*/
	exit(force?: boolean): Promise<void>;
	/**
	* Should the server be kept running after the tests are done.
	*/
	shouldKeepServer(): boolean;
	/**
	* Register a handler that will be called when the server is restarted due to a config change.
	*/
	onServerRestart(fn: OnServerRestartHandler): void;
	/**
	* Register a handler that will be called when the test run is cancelled with `vitest.cancelCurrentRun`.
	*/
	onCancel(fn: (reason: CancelReason) => Awaitable<void>): () => void;
	/**
	* Register a handler that will be called when the server is closed.
	*/
	onClose(fn: () => Awaitable<void>): void;
	/**
	* Register a handler that will be called when the tests are rerunning.
	*/
	onTestsRerun(fn: OnTestsRerunHandler): void;
	/**
	* Register a handler that will be called when a file is changed.
	* This callback should return `true` of `false` indicating whether the test file needs to be rerun.
	* @example
	* const testsToRun = [resolve('./test.spec.ts')]
	* vitest.onFilterWatchedSpecification(specification => testsToRun.includes(specification.moduleId))
	*/
	onFilterWatchedSpecification(fn: (specification: TestSpecification) => boolean): void;
	/**
	* Check if the project with a given name should be included.
	*/
	matchesProjectFilter(name: string): boolean;
	/**
	* Create a report that's scoped to a specific reporter directory.
	*/
	createReport(scope: string): Report;
}
type OnServerRestartHandler = (reason?: string) => Promise<void> | void;
type OnTestsRerunHandler = (testFiles: TestSpecification[]) => Promise<void> | void;

interface CliOptions extends UserConfig {
	/**
	* Override the watch mode
	*/
	run?: boolean;
	/**
	* Run only the tests that failed in the last run
	*/
	lastFailed?: boolean;
	/**
	* Removes colors from the console output
	*/
	color?: boolean;
	/**
	* Output collected tests as JSON or to a file
	*/
	json?: string | boolean;
	/**
	* Output collected test files only
	*/
	filesOnly?: boolean;
	/**
	* Parse files statically instead of running them to collect tests
	* @default true
	*/
	staticParse?: boolean;
	/**
	* How many tests to process at the same time
	* @default os.availableParallelism()
	*/
	staticParseConcurrency?: number;
	/**
	* Override vite config's configLoader from CLI.
	* Use `bundle` to bundle the config with esbuild or `runner` (experimental) to process it on the fly (default: `bundle`).
	* This is only available with **vite version 6.1.0** and above.
	* @experimental
	*/
	configLoader?: InlineConfig$1 extends {
		configLoader?: infer T;
	} ? T : never;
	/**
	* Run only the tests whose recorded dependencies were modified since the last run of the test,
	* and the tests that failed in their last run. Requires `cache`.
	* @experimental
	*/
	sinceLastRun?: boolean;
}
/**
* Start Vitest programmatically
*
* Returns a Vitest instance if initialized successfully.
*/
declare function startVitest(cliFilters?: string[], options?: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;
/**
* @deprecated The `mode` argument is no longer used. Use `startVitest(cliFilters?, options?, viteOverrides?, vitestOptions?)` instead.
*/
declare function startVitest(mode: VitestRunMode, cliFilters?: string[], options?: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;

interface PoolRunnerInitializer {
	readonly name: string;
	createPoolWorker: (options: PoolOptions) => PoolWorker;
}
interface PoolOptions {
	distPath: string;
	project: TestProject;
	method: "run" | "collect";
	cacheFs?: boolean;
	environment: ContextTestEnvironment;
	execArgv: string[];
	env: Partial<NodeJS.ProcessEnv>;
}
interface PoolWorker {
	readonly name: string;
	readonly reportMemory?: boolean;
	readonly cacheFs?: boolean;
	on: (event: string, callback: (...args: any[]) => void) => void;
	off: (event: string, callback: (...args: any[]) => void) => void;
	send: (message: WorkerRequest) => void;
	deserialize: (data: unknown) => unknown;
	start: () => Promise<void>;
	stop: () => Promise<void>;
	/**
	* This is called on workers that already satisfy certain constraints:
	* - The task has the same worker name
	* - The task has the same project
	*/
	canReuse?: (task: PoolTask) => boolean;
}
interface PoolTask {
	worker: "forks" | "threads" | "vmForks" | "vmThreads" | (string & {});
	project: TestProject;
	isolate: boolean;
	/**
	* Custom `process.env`. All tasks in the same project will reference the same object,
	* so modifying it once will modify it for every task.
	*/
	env: Partial<NodeJS.ProcessEnv>;
	/**
	* Custom `execArgv`. All tasks in the same project will reference the same array,
	* so modifying it once will modify it for every task.
	*/
	execArgv: string[];
	context: WorkerExecuteContext;
	memoryLimit: number | null;
}
type WorkerRequest = {
	__vitest_worker_request__: true;
} & ({
	type: "start";
	poolId: number;
	workerId: WorkerExecuteContext["workerId"];
	options: {
		reportMemory: boolean;
	};
	context: {
		environment: WorkerTestEnvironment;
		config: SerializedConfig;
		pool: string;
	};
	traces: {
		enabled: boolean;
		sdkPath?: string;
		otelCarrier?: OTELCarrier;
	};
} | {
	type: "stop";
	otelCarrier?: OTELCarrier;
} | {
	type: "run";
	context: WorkerExecuteContext;
	otelCarrier?: OTELCarrier;
} | {
	type: "collect";
	context: WorkerExecuteContext;
	otelCarrier?: OTELCarrier;
} | {
	type: "cancel";
});
type WorkerResponse = {
	__vitest_worker_response__: true;
} & ({
	type: "started";
	error?: unknown;
} | {
	type: "stopped";
	error?: unknown;
} | {
	type: "testfileFinished";
	usedMemory?: number;
	error?: unknown;
});

interface BaseOptions {
	isTTY?: boolean;
	silent?: boolean | "passed-only";
}
declare abstract class BaseReporter implements Reporter {
	start: number;
	end: number;
	watchFilters?: string[];
	failedUnwatchedFiles: TestModule[];
	isTTY: boolean;
	ctx: Vitest;
	renderSucceed: boolean;
	protected verbose: boolean;
	protected silent?: boolean | "passed-only";
	private _filesInWatchMode;
	private _timeStart;
	private _perProjectBenchmarks;
	private _printedSuites;
	constructor(options?: BaseOptions);
	onInit(ctx: Vitest): void;
	log(...messages: any): void;
	error(...messages: any): void;
	relative(path: string): string;
	onTestRunStart(_specifications: ReadonlyArray<TestSpecification>): void;
	onTestRunEnd(testModules: ReadonlyArray<TestModule>, unhandledErrors: ReadonlyArray<SerializedError>, _reason: TestRunEndReason): void;
	onTestCaseResult(testCase: TestCase): void;
	onTestCaseBenchmark(testCase: TestCase, benchmark: TestBenchmark): void;
	onTestSuiteResult(testSuite: TestSuite): void;
	onTestModuleEnd(testModule: TestModule): void;
	protected logFailedTask(task: Task): void;
	protected printTestModule(testModule: TestModule): void;
	protected printTestCase(moduleState: TestModuleState, test: TestCase): void;
	private getModuleLog;
	protected printTestSuite(testSuite: TestSuite): void;
	private printSuiteEntry;
	private printAncestorSuites;
	protected getTestName(test: Task, _separator?: string): string;
	protected getFullName(test: Task, separator?: string): string;
	protected getTestIndentation(test: Task): string;
	protected printAnnotations(test: TestCase, console: "log" | "error", padding?: number): void;
	protected getEntityPrefix(entity: TestCase | TestModule | TestSuite): string;
	protected getTestCaseSuffix(testCase: TestCase): string;
	protected getStateSymbol(test: TestCase | TestModule | TestSuite): string;
	private getDurationPrefix;
	onWatcherStart(files?: File[], errors?: unknown[]): void;
	onWatcherRerun(files: string[], trigger?: string): void;
	onUserConsoleLog(log: UserConsoleLog, taskState?: TestResult["state"]): void;
	onTestRemoved(trigger?: string): void;
	shouldLog(log: UserConsoleLog, taskState?: TestResult["state"]): boolean;
	onServerRestart(reason?: string): void;
	reportSummary(files: File[], errors: unknown[]): void;
	private printSourceFilterSummary;
	private printLastFailedSummary;
	reportTestSummary(files: File[], errors: unknown[], leakCount: number): void;
	/**
	* Surfaces the cost of re-creating a DOM environment for every test file:
	* with an isolating pool, `jsdom`/`happy-dom` are imported and set up once
	* per file. When that repeated setup dominates the run, hint that a `vm`
	* pool sets the environment up once per worker while keeping per-file
	* isolation, and that `isolate: false` shares it across files.
	*/
	private reportEnvironmentDiagnostic;
	/**
	* Surfaces repeated evaluation of the same module graph: with `isolate: true`
	* every test file re-imports its whole graph, so suites where files share
	* most of their modules (typically through barrel files) pay the graph cost
	* once per file. The duplication is measured from server-side fetch counts,
	* so suites with disjoint per-file graphs stay quiet.
	*/
	private reportImportDiagnostic;
	/**
	* Surfaces transform-dominated runs: without the fs module cache every
	* `vitest run` transforms the whole module graph from scratch. Enabling
	* `fsModuleCache` persists the results so the next run skips them.
	*/
	private reportTransformDiagnostic;
	/**
	* Surfaces the cost of `isolate: true`: with isolation enabled Vitest spawns a
	* fresh worker (and re-creates the test environment) for every test file. When
	* that repeated startup cost is significant, hint that `isolate: false` would
	* reuse workers across files.
	*/
	private reportIsolateDiagnostic;
	private reportImportDurations;
	private importDurationTime;
	private ellipsisPath;
	private printErrorsSummary;
	private printLeaksSummary;
	protected printPerProjectBenchmarks(): void;
	protected printBenchmarkTable(benchmarks: readonly TestBenchmark[], basePadding: string, columnName?: string): void;
	private printTaskErrors;
}

interface DefaultReporterOptions extends BaseOptions {
	summary?: boolean;
}
declare class DefaultReporter extends BaseReporter {
	private options;
	private summary?;
	constructor(options?: DefaultReporterOptions);
	onTestRunStart(specifications: ReadonlyArray<TestSpecification>): void;
	onTestRunEnd(testModules: ReadonlyArray<TestModule>, unhandledErrors: ReadonlyArray<SerializedError>, reason: TestRunEndReason): void;
	onTestModuleQueued(file: TestModule): void;
	onTestModuleCollected(module: TestModule): void;
	onTestModuleEnd(module: TestModule): void;
	onTestCaseReady(test: TestCase): void;
	onTestCaseResult(test: TestCase): void;
	onHookStart(hook: ReportedHookContext): void;
	onHookEnd(hook: ReportedHookContext): void;
	onInit(ctx: Vitest): void;
}

interface GithubActionsReporterOptions {
	onWritePath?: (path: string) => string;
	/**
	* @default true
	*/
	displayAnnotations?: boolean;
	/**
	* Configuration for the GitHub Actions Job Summary.
	*
	* When enabled, a markdown summary of test results is written to the path specified by `outputPath`.
	*/
	jobSummary?: Partial<JobSummaryOptions>;
}
interface JobSummaryOptions {
	/**
	* Title of the summary.
	*
	* @default 'Vitest Test Report'
	*/
	title: string;
	/**
	* Whether to generate the summary.
	*
	* @default true
	*/
	enabled: boolean;
	/**
	* File path to write the summary to.
	*
	* @default process.env.GITHUB_STEP_SUMMARY
	*/
	outputPath: string | undefined;
	/**
	* Configuration for generating permalink URLs to source files in the GitHub repository.
	*
	* When all three values are available (either from this config or the defaults picked from environment variables), test names in the summary will link to the relevant source lines.
	*/
	fileLinks: {
		/**
		* The GitHub repository in `owner/repo` format.
		*
		* @default process.env.GITHUB_REPOSITORY
		*/
		repository?: string | undefined;
		/**
		* The commit SHA to use in permalink URLs.
		*
		* @default process.env.GITHUB_SHA
		*/
		commitHash?: string | undefined;
		/**
		* The absolute path to the root of the repository on disk.
		*
		* This value is used to compute relative file paths for the permalink URLs.
		*
		* @default process.env.GITHUB_WORKSPACE
		*/
		workspacePath?: string | undefined;
	};
}
type ResolvedOptions = Required<GithubActionsReporterOptions>;
declare class GithubActionsReporter implements Reporter {
	ctx: Vitest;
	options: ResolvedOptions;
	constructor(options?: GithubActionsReporterOptions);
	onInit(ctx: Vitest): void;
	onTestCaseAnnotate(testCase: TestCase, annotation: TestAnnotation): void;
	onTestRunEnd(testModules: ReadonlyArray<TestModule>, unhandledErrors: ReadonlyArray<SerializedError>): void;
}

interface HTMLOptions {
	/**
	* Directory used as the report artifact root.
	*
	* The report entry is written to `<outputDir>/index.html` and the UI
	* implementation files live under `<outputDir>/ui/`. By default this is the
	* shared `.vitest` artifact directory.
	*
	* @default '.vitest'
	*/
	outputDir?: string;
	/**
	* Inline report assets, metadata, and attachments into the generated HTML file.
	*
	* @default false
	*/
	singleFile?: boolean;
}

type Status = "passed" | "failed" | "skipped" | "pending" | "todo" | "disabled";
type Milliseconds = number;
interface Callsite {
	line: number;
	column: number;
}
interface JsonAssertionResult {
	ancestorTitles: Array<string>;
	fullName: string;
	status: Status;
	title: string;
	meta: TaskMeta;
	duration?: Milliseconds | null;
	failureMessages: Array<string> | null;
	location?: Callsite | null;
	tags: string[];
	benchmarks: TestBenchmark[];
}
interface JsonTestResult {
	message: string;
	name: string;
	status: "failed" | "passed";
	startTime: number;
	endTime: number;
	assertionResults: Array<JsonAssertionResult>;
}
interface JsonTestResults {
	numFailedTests: number;
	numFailedTestSuites: number;
	numPassedTests: number;
	numPassedTestSuites: number;
	numPendingTests: number;
	numPendingTestSuites: number;
	numTodoTests: number;
	numTotalTests: number;
	numTotalTestSuites: number;
	startTime: number;
	success: boolean;
	testResults: Array<JsonTestResult>;
	snapshot: SnapshotSummary;
	coverageMap?: CoverageMap | null | undefined;
}
interface JsonOptions {
	outputFile?: string;
	/**
	* Print the report to stdout instead of writing it to a file.
	* Ignored when {@link outputFile} is set.
	* @default false
	*/
	stdout?: boolean;
	/** @experimental */
	filterMeta?: (key: string, value: unknown) => unknown;
}
declare class JsonReporter implements Reporter {
	start: number;
	ctx: Vitest;
	options: JsonOptions;
	coverageMap?: CoverageMap;
	constructor(options: JsonOptions);
	onInit(ctx: Vitest): void;
	onCoverage(coverageMap: unknown): void;
	onTestRunEnd(testModules: ReadonlyArray<TestModule>): Promise<void>;
}

interface ClassnameTemplateVariables {
	/** Relative path from the root (e.g. `src/foo.test.ts`) */
	filename: string;
	/** Absolute file path */
	filepath: string;
	/** File basename without directory (e.g. `foo.test.ts`) */
	basename: string;
	/** Ancestor describe block names joined by {@link JUnitOptions.ancestorSeparator} */
	classname: string;
	/** Leaf test title (the string passed to `it`/`test`) */
	title: string;
	/** Top-level describe block name, or empty string when the test has no enclosing describe */
	suitename: string;
	/** Vitest project name */
	displayName: string;
}
interface SuiteNameTemplateVariables {
	/** Absolute file path */
	filepath: string;
	/** Relative path from the root (e.g. `src/foo.test.ts`) */
	filename: string;
	/** File basename without directory (e.g. `foo.test.ts`) */
	basename: string;
	/** Vitest project name */
	displayName: string;
	/**
	* The name of the first top-level `describe` block in the file.
	* Falls back to the file basename when the file has no top-level describe.
	*/
	title: string;
}
interface JUnitOptions {
	outputFile?: string;
	/**
	* Print the report to stdout instead of writing it to a file.
	* Ignored when {@link outputFile} is set.
	* @default false
	*/
	stdout?: boolean;
	/**
	* Template for the `classname` attribute of `<testcase>`.
	*
	* Can be a template string or a function.
	*
	* Supported placeholders:
	* - `{filename}` – relative path from root (e.g. `src/foo.test.ts`)
	* - `{filepath}` – absolute file path
	* - `{basename}` – file name without directory (e.g. `foo.test.ts`)
	* - `{classname}` – ancestor describe names joined by {@link ancestorSeparator}
	* - `{title}` – leaf test title
	* - `{suitename}` – top-level describe block name
	* - `{displayName}` – Vitest project name
	*
	* @default relative file path from root
	*/
	classnameTemplate?: string | ((classnameVariables: ClassnameTemplateVariables) => string);
	/**
	* Template for the `name` attribute of `<testcase>`.
	*
	* Can be a template string or a function. Supports the same placeholders as
	* {@link classnameTemplate}.
	*
	* When not set the full test title including ancestor describe hierarchy is used
	* (current default behaviour, e.g. `outer > inner > test name`).
	*/
	titleTemplate?: string | ((titleVariables: ClassnameTemplateVariables) => string);
	/**
	* Template for the `name` attribute of `<testsuite>`.
	*
	* Can be a template string or a function.
	*
	* Supported placeholders:
	* - `{title}` – first top-level describe name (falls back to file basename)
	* - `{filename}` – relative path from root
	* - `{filepath}` – absolute file path
	* - `{basename}` – file basename
	* - `{displayName}` – Vitest project name
	*
	* When not set the relative file path from root is used (current default behaviour).
	*/
	suiteNameTemplate?: string | ((suiteNameVariables: SuiteNameTemplateVariables) => string);
	/**
	* Separator used to join ancestor describe block names when building the
	* `{classname}` template variable (and the default testcase name when
	* {@link titleTemplate} is not set).
	*
	* @default ' > '
	*/
	ancestorSeparator?: string;
	suiteName?: string;
	/**
	* Write <system-out> and <system-err> for console output
	* @default true
	*/
	includeConsoleOutput?: boolean;
	/**
	* Add <testcase file="..."> attribute (validated on CIRCLE CI and GitLab CI)
	* @default false
	*/
	addFileAttribute?: boolean;
	/**
	* Hostname to use in the report. By default, it uses os.hostname()
	*/
	hostname?: string;
	/**
	* Include stack traces in test failure reports.
	* @default true
	*/
	stackTrace?: boolean;
}
/**
* Internal task type that carries pre-computed template metadata.
* The three underscore-prefixed fields are set by {@link flattenTasks} and
* consumed only within the reporter. They are deliberately not part of the
* public `Task` interface.
*/
type TaskWithMeta = Task & {
	/** Original leaf test title before hierarchy prefix was prepended */
	_leafName?: string;
	/** Ancestor describe names joined by the active separator */
	_classname?: string;
	/** Top-level describe block name */
	_suitename?: string;
};
/**
* Runtime additions on top of {@link SerializedError}: `type` is set by
* {@link state.catchError}, `VITEST_TEST_PATH` by the runtime error catcher.
*/
type UnhandledError = SerializedError & {
	type?: string;
	VITEST_TEST_PATH?: string;
};
declare class JUnitReporter implements Reporter {
	private ctx;
	private reportFile?;
	private baseLog;
	private logger;
	private _timeStart;
	private fileFd?;
	private options;
	constructor(options: JUnitOptions);
	onInit(ctx: Vitest): Promise<void>;
	writeElement(name: string, attrs: Record<string, any>, children: () => Promise<void>): Promise<void>;
	writeLogs(task: Task, type: "err" | "out"): Promise<void>;
	writeSystemOut(task: Task): Promise<void>;
	private applyTemplate;
	writeTasks(tasks: TaskWithMeta[], filename: string, fileAbsPath: string): Promise<void>;
	private resolveSuiteNameTemplate;
	private writeErrorElement;
	private writeUnhandledErrorsTestsuite;
	onTestRunEnd(testModules: ReadonlyArray<TestModule>, unhandledErrors?: ReadonlyArray<UnhandledError>): Promise<void>;
}

declare class DotReporter extends BaseReporter {
	private renderer?;
	private tests;
	private finishedTests;
	onInit(ctx: Vitest): void;
	printTestModule(): void;
	onTestRunStart(_specifications: ReadonlyArray<TestSpecification>): void;
	onWatcherRerun(files: string[], trigger?: string): void;
	onTestRunEnd(testModules: ReadonlyArray<TestModule>, unhandledErrors: ReadonlyArray<SerializedError>, reason: TestRunEndReason): void;
	onTestModuleCollected(module: TestModule): void;
	onTestCaseReady(test: TestCase): void;
	onTestCaseResult(test: TestCase): void;
	onTestModuleEnd(testModule: TestModule): void;
	private createSummary;
}

declare class HangingProcessReporter implements Reporter {
	whyRunning: (() => void) | undefined;
	onInit(): Promise<void>;
	onProcessTimeout(): void;
}

declare class MinimalReporter extends DefaultReporter {
	renderSucceed: boolean;
	constructor(options?: DefaultReporterOptions);
	onInit(ctx: Vitest): void;
	onTestRunStart(specifications: ReadonlyArray<TestSpecification>): void;
	protected printTestModule(testModule: TestModule): void;
	protected printTestCase(moduleState: TestModuleState, test: TestCase): void;
}

declare class TapReporter implements Reporter {
	protected ctx: Vitest;
	private logger;
	onInit(ctx: Vitest): void;
	static getComment(task: Task): string;
	private logErrorDetails;
	protected logTasks(tasks: Task[]): void;
	onTestRunEnd(testModules: ReadonlyArray<TestModule>): void;
}

declare class TapFlatReporter extends TapReporter {
	onInit(ctx: Vitest): void;
	onTestRunEnd(testModules: ReadonlyArray<TestModule>): void;
}

declare class TreeReporter extends DefaultReporter {
	protected verbose: boolean;
	renderSucceed: boolean;
}

declare class VerboseReporter extends DefaultReporter {
	protected verbose: boolean;
	renderSucceed: boolean;
	printTestModule(_module: TestModule): void;
	onTestCaseResult(test: TestCase): void;
}

declare const ReportersMap: {
	default: typeof DefaultReporter;
	agent: typeof MinimalReporter;
	minimal: typeof MinimalReporter;
	blob: typeof BlobReporter;
	verbose: typeof VerboseReporter;
	dot: typeof DotReporter;
	json: typeof JsonReporter;
	tap: typeof TapReporter;
	"tap-flat": typeof TapFlatReporter;
	junit: typeof JUnitReporter;
	tree: typeof TreeReporter;
	"hanging-process": typeof HangingProcessReporter;
	"github-actions": typeof GithubActionsReporter;
};
type BuiltinReporters = keyof typeof ReportersMap;
interface BuiltinReporterOptions {
	default: DefaultReporterOptions;
	minimal: DefaultReporterOptions;
	agent: DefaultReporterOptions;
	verbose: DefaultReporterOptions;
	dot: BaseOptions;
	tree: BaseOptions;
	json: JsonOptions;
	blob: BlobOptions;
	tap: never;
	"tap-flat": never;
	junit: JUnitOptions;
	"hanging-process": never;
	html: HTMLOptions;
	"github-actions": GithubActionsReporterOptions;
}

interface TestSequencer {
	/**
	* Slicing tests into shards. Will be run before `sort`.
	* Only run, if `shard` is defined.
	*/
	shard: (files: TestSpecification[]) => Awaitable<TestSpecification[]>;
	sort: (files: TestSpecification[]) => Awaitable<TestSpecification[]>;
}
interface TestSequencerConstructor {
	new (ctx: Vitest): TestSequencer;
}

interface BenchmarkUserOptions {
	enabled?: boolean;
	/**
	* Include globs for benchmark test files
	*
	* @default ['**\/*.{bench,benchmark}.?(c|m)[jt]s?(x)']
	*/
	include?: string[];
	/**
	* Exclude globs for benchmark test files
	*
	* @default ['**\/node_modules/**', '**\/.git/**']
	*/
	exclude?: string[];
	/**
	* Include globs for in-source benchmark test files
	*
	* @default []
	*/
	includeSource?: string[];
	/**
	* Include `samples` array of benchmark results for API or custom reporter usages.
	* This is disabled by default to reduce memory usage.
	* @default false
	*/
	retainSamples?: boolean;
	/**
	* The benchmark provider that executes registered benchmarks and produces
	* their results. Provide a path to a module whose default export implements
	* `BenchmarkProvider`. The path is resolved relative to the project
	* root. If not specified, the built-in provider is used.
	*
	* @experimental
	*/
	provider?: string;
	/**
	* Disable warnings when a benchmark accesses module export getters too many times.
	* @default false
	*/
	suppressExportGetterWarnings?: boolean;
}
type ResolvedBenchmarkOptions = Omit<Required<BenchmarkUserOptions>, "provider"> & {
	provider?: string;
};

type BuiltinEnvironment = "node" | "jsdom" | "happy-dom" | "edge-runtime";
type VitestEnvironment = BuiltinEnvironment | (string & Record<never, never>);
type CSSModuleScopeStrategy = "stable" | "scoped" | "non-scoped";
type ApiConfig = Pick<ServerOptions, "port" | "strictPort" | "host" | "middlewareMode"> & {
	/**
	* Allow any write operations from the API server.
	*
	* @default false if `api.host` is exposed to network, true otherwise
	*/
	allowWrite?: boolean;
	/**
	* Allow running test files via the API.
	* If `api.host` is exposed to network and `allowWrite` is true,
	* anyone connected to the API server can run arbitrary code on your machine.
	*
	* @default false if `api.host` is exposed to network, true otherwise
	*/
	allowExec?: boolean;
};
type ResolvedApiConfig = ApiConfig & {
	token: string;
	tokenCreated: boolean;
};
interface UIOptions {
	/**
	* Enable Vitest UI
	*
	* @default false
	*/
	enabled?: boolean;
	/**
	* Color theme of Vitest UI and the browser mode UI. `auto` follows the system preference
	* and remembers the theme toggled in the UI. `dark` and `light` are applied on every page load.
	*
	* @default 'auto'
	*/
	theme?: "dark" | "light" | "auto";
}
interface EnvironmentOptions {
	/**
	* jsdom options.
	*/
	jsdom?: JSDOMOptions;
	happyDOM?: HappyDOMOptions;
	[x: string]: unknown;
}
/**
* @deprecated
*/
type VitestRunMode = "test";
interface ProjectName {
	label: string;
	color?: LabelColor;
}
interface SequenceOptions {
	/**
	* Class that handles sorting and sharding algorithm.
	* If you only need to change sorting, you can extend
	* your custom sequencer from `BaseSequencer` from `vitest/node`.
	* @default BaseSequencer
	*/
	sequencer?: TestSequencerConstructor;
	/**
	* Controls the order in which this project runs its tests when using multiple [projects](/guide/projects).
	*
	* - Projects with the same group order number will run together, and groups are run from lowest to highest.
	* - If you don’t set this option, all projects run in parallel.
	* - If several projects use the same group order, they will run at the same time.
	* @default 0
	*/
	groupOrder?: number;
	/**
	* Should files and tests run in random order.
	* @default false
	*/
	shuffle?: boolean | {
		/**
		* Should files run in random order. Long running tests will not start
		* earlier if you enable this option.
		* @default false
		*/
		files?: boolean;
		/**
		* Should tests run in random order.
		* @default false
		*/
		tests?: boolean;
	};
	/**
	* Should tests run in parallel.
	* @default false
	*/
	concurrent?: boolean;
	/**
	* Defines how setup files should be ordered
	* - 'parallel' will run all setup files in parallel
	* - 'list' will run all setup files in the order they are defined in the config file
	* @default 'list'
	*/
	setupFiles?: SequenceSetupFiles;
	/**
	* Seed for the random number generator.
	* @default Date.now()
	*/
	seed?: number;
	/**
	* Defines how hooks should be ordered
	* - `stack` will order "after" hooks in reverse order, "before" hooks will run sequentially
	* - `list` will order hooks in the order they are defined
	* - `parallel` will run hooks in a single group in parallel
	* @default 'stack'
	*/
	hooks?: SequenceHooks;
}
type DepsOptimizationOptions = Omit<DepOptimizationConfig, "disabled" | "noDiscovery"> & {
	enabled?: boolean;
};
interface DepsOptions {
	/**
	* Enable dependency optimization. This can improve the performance of your tests.
	*/
	optimizer?: Partial<Record<"client" | "ssr" | ({} & string), DepsOptimizationOptions>>;
	web?: {
		/**
		* Should Vitest process assets (.png, .svg, .jpg, etc) files and resolve them like Vite does in the browser.
		*
		* These module will have a default export equal to the path to the asset, if no query is specified.
		*
		* **At the moment, this option only works with `{ pool: 'vmThreads' }`.**
		*
		* @default true
		*/
		transformAssets?: boolean;
		/**
		* Should Vitest process CSS (.css, .scss, .sass, etc) files and resolve them like Vite does in the browser.
		*
		* If CSS files are disabled with `css` options, this option will just silence UNKNOWN_EXTENSION errors.
		*
		* **At the moment, this option only works with `{ pool: 'vmThreads' }`.**
		*
		* @default true
		*/
		transformCss?: boolean;
		/**
		* Regexp pattern to match external files that should be transformed.
		*
		* By default, files inside `node_modules` are externalized and not transformed.
		*
		* **At the moment, this option only works with `{ pool: 'vmThreads' }`.**
		*
		* @default []
		*/
		transformGlobPattern?: RegExp | RegExp[];
	};
	/**
	* Interpret CJS module's default as named exports
	*
	* @default true
	*/
	interopDefault?: boolean;
	/**
	* A list of directories that contain dependencies. A file is a dependency if its path includes `/<directory>/`.
	* `node_modules` is always included.
	*
	* @default ['node_modules']
	*/
	moduleDirectories?: string[];
}
type InlineReporter = Reporter;
type ReporterName = BuiltinReporters | "html" | (string & {});
type ReporterWithOptions<Name extends ReporterName = ReporterName> = Name extends keyof BuiltinReporterOptions ? BuiltinReporterOptions[Name] extends never ? [Name, object] : [Name, Partial<BuiltinReporterOptions[Name]>] : [Name, Record<string, unknown>];
interface ResolveSnapshotPathHandlerContext {
	config: SerializedConfig;
}
type ResolveSnapshotPathHandler = (testPath: string, snapExtension: string, context: ResolveSnapshotPathHandlerContext) => string;
type BuiltinPool = "browser" | "threads" | "forks" | "vmThreads" | "vmForks" | "typescript";
type Pool = BuiltinPool | (string & {});
interface InlineConfig {
	/**
	* Name of the project. Will be used to display in the reporter.
	*/
	name?: string | ProjectName;
	/**
	* Benchmark options.
	*
	* @default {}
	*/
	benchmark?: BenchmarkUserOptions;
	/**
	* A list of [glob patterns](https://superchupu.dev/tinyglobby/comparison) that match your test files.
	*
	* @default ['**\/*.{test,spec}.?(c|m)[jt]s?(x)']
	* @see {@link https://vitest.dev/config/include}
	*/
	include?: string[];
	/**
	* Exclude globs for test files
	* @default ['**\/node_modules/**', '**\/.git/**']
	*/
	exclude?: string[];
	/**
	* Include globs for in-source test files
	*
	* @default []
	*/
	includeSource?: string[];
	/**
	* Handling for dependencies inlining or externalizing
	*
	*/
	deps?: DepsOptions;
	server?: {
		deps?: ServerDepsOptions;
		debug?: {
			/**
			* The folder where Vitest stores the contents of transformed
			* test files that can be inspected manually.
			*
			* If `true`, Vitest dumps the files in `.vitest-dump` folder relative to the root of the project.
			*
			* You can also use `VITEST_DEBUG_DUMP` env variable to enable this.
			*/
			dump?: string | true;
			/**
			* If dump is enabled, should Vitest load the files from there instead of transforming them.
			*
			* You can also use `VITEST_DEBUG_LOAD_DUMP` env variable to enable this.
			*/
			load?: boolean;
		};
	};
	/**
	* Base directory to scan for the test files
	*
	* @default `config.root`
	*/
	dir?: string;
	/**
	* Register apis globally
	*
	* @default false
	*/
	globals?: boolean;
	/**
	* Inject CommonJS module variables (`module`, `exports`, `require`,
	* `__filename`, `__dirname`) into every module processed by Vitest.
	*
	* When disabled, ES modules no longer have access to CommonJS variables,
	* matching how the code runs outside of Vitest. Modules detected to be
	* CommonJS keep these variables because they are part of the module scope.
	* The module type is detected the same way Node.js does it: the file
	* extension wins, then the `type` field in the nearest package.json,
	* then the presence of ESM syntax in the file.
	*
	* This option doesn't affect externalized modules which are always
	* executed by the native runtime.
	*
	* @default true
	*/
	injectCjsGlobals?: boolean;
	/**
	* Running environment
	*
	* Supports 'node', 'jsdom', 'happy-dom', 'edge-runtime'
	*
	* If used unsupported string, will try to load the package `vitest-environment-${env}`
	*
	* @default 'node'
	*/
	environment?: VitestEnvironment;
	/**
	* Environment options.
	*/
	environmentOptions?: EnvironmentOptions;
	/**
	* Run tests in an isolated environment. This option has no effect on vmThreads pool.
	*
	* Disabling this option improves performance if your code doesn't rely on side effects.
	*
	* @default true
	*/
	isolate?: boolean;
	/**
	* Pass additional arguments to `node` process when spawning the worker.
	*
	* See [Command-line API | Node.js](https://nodejs.org/docs/latest/api/cli.html) for more information.
	*
	* Set to `process.execArgv` to pass all arguments of the current process.
	*
	* Be careful when using, it as some options may crash worker, e.g. --prof, --title. See https://github.com/nodejs/node/issues/41103
	*
	* @default [] // no execution arguments are passed
	*/
	execArgv?: string[];
	/**
	* Specifies the memory limit for `worker_thread` or `child_process` before they are recycled.
	* If you see memory leaks, try to tinker this value.
	*/
	vmMemoryLimit?: string | number;
	/**
	* Pool used to run tests in.
	*
	* Supports 'threads', 'forks', 'vmThreads', 'vmForks'
	*
	* @default 'forks'
	*/
	pool?: Exclude<Pool, "browser"> | PoolRunnerInitializer;
	/**
	* Maximum number or percentage of workers to run tests in.
	*/
	maxWorkers?: number | string;
	/**
	* Should all test files run in parallel. Doesn't affect tests running in the same file.
	* Setting this to `false` will override `maxWorkers` option to `1`.
	*
	* @default true
	*/
	fileParallelism?: boolean;
	/**
	* Options for projects.
	*
	* When a project is referenced as a config file (or a directory with one) and
	* that config declares `projects` itself, it becomes a container: it doesn't
	* run tests, only provides the projects it declares. Inline configurations
	* cannot declare `projects`.
	*/
	projects?: TestProjectConfiguration[];
	/**
	* Let inline projects that don't modify the Vite config reuse the Vite
	* server of the config that declares them. Instead of resolving a new
	* Vite config and creating a new server per project, such projects share
	* the server and its transform cache.
	*
	* A project still gets its own server when it defines Vite-level options
	* (`plugins`, `resolve`, ...) or test options that affect the
	* Vite config: `alias`, `browser`, `css`, `deps.moduleDirectories`,
	* `deps.optimizer`, `mode`, `root`,
	* or when `extends` doesn't point to the declaring config.
	*
	* This option is only respected in the root configuration.
	* @default true
	*/
	sharedViteServer?: boolean;
	/**
	* Update snapshot
	*
	* @default false
	*/
	update?: boolean | "all" | "new" | "none";
	/**
	* Watch mode
	*
	* @default !process.env.CI && process.stdin.isTTY && !isAgent
	*/
	watch?: boolean;
	/**
	* Project root
	*
	* @default process.cwd()
	*/
	root?: string;
	/**
	* Custom reporter for output. Can contain one or more built-in reporter names, reporter instances,
	* and/or paths to custom reporters.
	*
	* @default ['default'] (or ['default', 'github-actions'] when `process.env.GITHUB_ACTIONS === 'true'`)
	*/
	reporters?: Arrayable<ReporterName | InlineReporter> | ((ReporterName | InlineReporter) | [ReporterName] | ReporterWithOptions)[];
	/**
	* Write test results to a file when the --reporter=json` or `--reporter=junit` option is also specified.
	* Also definable individually per reporter by using an object instead.
	*/
	outputFile?: string | (Partial<Record<BuiltinReporters, string>> & Record<string, string>);
	/**
	* Default timeout of a test in milliseconds
	*
	* @default 5000
	*/
	testTimeout?: number;
	/**
	* Default timeout of a hook in milliseconds
	*
	* @default 10000
	*/
	hookTimeout?: number;
	/**
	* Default timeout to wait for close when Vitest shuts down, in milliseconds
	*
	* @default 10000
	*/
	teardownTimeout?: number;
	/**
	* Silent mode
	*
	* Use `'passed-only'` to see logs from failing tests only.
	*
	* @default false
	*/
	silent?: boolean | "passed-only";
	/**
	* Hide logs for skipped tests
	*
	* @default false
	*/
	hideSkippedTests?: boolean;
	/**
	* Path to setup files
	*/
	setupFiles?: string | string[];
	/**
	* Path to global setup files
	*/
	globalSetup?: string | string[];
	/**
	* Glob pattern of file paths that will trigger the whole suite rerun
	*
	* Useful if you are testing calling CLI commands
	*
	* @default ['**\/package.json/**', '**\/{vitest,vite}.config.*\/**']
	*/
	forceRerunTriggers?: string[];
	/**
	* Pattern configuration to rerun only the tests that are affected
	* by the changes of specific files in the repository.
	*/
	watchTriggerPatterns?: WatcherTriggerPattern[];
	/**
	* Coverage options
	*/
	coverage?: CoverageOptions;
	/**
	* Run test names with the specified pattern
	*/
	testNamePattern?: string | RegExp;
	/**
	* Will call `.mockClear()` on all spies before each test
	* @default true
	*/
	clearMocks?: boolean;
	/**
	* Will call `.mockReset()` on all spies before each test
	* @default false
	*/
	mockReset?: boolean;
	/**
	* Will call `.mockRestore()` on all spies before each test
	* @default false
	*/
	restoreMocks?: boolean;
	/**
	* Will restore all global stubs to their original values before each test
	* @default false
	*/
	unstubGlobals?: boolean;
	/**
	* Will restore all env stubs to their original values before each test
	* @default false
	*/
	unstubEnvs?: boolean;
	/**
	* Serve API options.
	*
	* When set to true, the default port is 51204.
	*
	* @default false
	*/
	api?: boolean | number | ApiConfig;
	/**
	* Enable Vitest UI
	*
	* @default false
	*/
	ui?: boolean | UIOptions;
	/**
	* options for test in a browser environment
	*
	* @default false
	*/
	browser?: BrowserConfigOptions;
	/**
	* Open UI automatically.
	*
	* @default !process.env.CI
	*/
	open?: boolean;
	/**
	* Base url for the UI
	*
	* @default '/__vitest__/'
	*/
	uiBase?: string;
	/**
	* Format options for snapshot testing.
	*/
	snapshotFormat?: Omit<PrettyFormatOptions, "plugins" | "compareKeys"> & {
		compareKeys?: null | undefined;
	};
	/**
	* Path to a module which has a default export of diff config.
	*/
	diff?: string | SerializedDiffOptions;
	/**
	* Paths to snapshot serializer modules.
	*/
	snapshotSerializers?: string[];
	/**
	* Resolve custom snapshot path
	*/
	resolveSnapshotPath?: ResolveSnapshotPathHandler;
	/**
	* Path to a custom snapshot environment module that has a default export of `SnapshotEnvironment` object.
	*/
	snapshotEnvironment?: string;
	/**
	* Pass with no tests
	*/
	passWithNoTests?: boolean;
	/**
	* Allow tests and suites that are marked as only
	*
	* @default !process.env.CI
	*/
	allowOnly?: boolean;
	/**
	* Show heap usage after each test. Useful for debugging memory leaks.
	*/
	logHeapUsage?: boolean;
	/**
	* Detect asynchronous resources leaking from the test file.
	*
	* @default false
	*/
	detectAsyncLeaks?: boolean;
	/**
	* Custom environment variables assigned to `process.env` before running tests.
	*/
	env?: Partial<NodeJS.ProcessEnv>;
	/**
	* Options for @sinon/fake-timers
	*/
	fakeTimers?: FakeTimersConfig;
	/**
	* Custom handler for console.log in tests.
	*
	* Return `false` to ignore the log.
	*/
	onConsoleLog?: (log: string, type: "stdout" | "stderr", entity: TestModule | TestCase | TestSuite | undefined) => boolean | void;
	/**
	* Enable stack trace filtering. If absent, all stack trace frames
	* will be shown.
	*
	* Return `false` to omit the frame.
	*/
	onStackTrace?: (error: TestError, frame: ParsedStack) => boolean | void;
	/**
	* A callback that can return `false` to ignore an unhandled error
	*/
	onUnhandledError?: OnUnhandledErrorCallback;
	/**
	* Indicates if CSS files should be processed.
	*
	* When excluded, the CSS files will be replaced with empty strings to bypass the subsequent processing.
	*
	* @default { include: [], modules: { classNameStrategy: false } }
	*/
	css?: boolean | {
		include?: RegExp | RegExp[];
		exclude?: RegExp | RegExp[];
		modules?: {
			classNameStrategy?: CSSModuleScopeStrategy;
		};
	};
	/**
	* A number of tests that are allowed to run at the same time marked with `test.concurrent`.
	* @default 5
	*/
	maxConcurrency?: number;
	/**
	* Store the results of test runs on the file system to run failed
	* and longer test files first. The cache is stored in Vite's "cacheDir".
	* @default true
	*/
	cache?: boolean | {
		/**
		* @deprecated This option has no effect. Use Vite's "cacheDir" instead if you want to change the cache directory.
		*/
		dir: string;
	};
	/**
	* Cache transformed modules on the file system and reuse them between reruns
	* and separate Vitest processes, which can significantly speed up cold starts.
	*
	* @default true
	*/
	fsModuleCache?: boolean;
	/**
	* Directory where the {@link fsModuleCache} is stored. Can be set per project;
	* projects that don't override it fall back to the root's cache directory.
	*
	* By default the cache is stored inside `node_modules` at the workspace root, so
	* that it is naturally invalidated when dependencies are reinstalled.
	*
	* @default 'node_modules/.vitest-cache'
	*/
	fsModuleCachePath?: string;
	/**
	* Options for configuring the order of running tests.
	*/
	sequence?: SequenceOptions;
	/**
	* Overrides Vite mode
	* @default 'test'
	*/
	mode?: string;
	/**
	* Specifies an `Object`, or an `Array` of `Object`,
	* which defines aliases used to replace values in `import` or `require` statements.
	* Will be merged with the default aliases inside `resolve.alias`.
	*/
	alias?: AliasOptions;
	/**
	* Ignore any unhandled errors that occur
	*
	* @default false
	*/
	dangerouslyIgnoreUnhandledErrors?: boolean;
	/**
	* Options for configuring typechecking test environment.
	*/
	typecheck?: Partial<TypecheckConfig>;
	/**
	* The number of milliseconds after which a test is considered slow and reported as such in the results.
	*
	* @default 300
	*/
	slowTestThreshold?: number;
	/**
	* Path to a custom test runner.
	*/
	runner?: string;
	/**
	* Debug tests by opening `node:inspector` in worker / child process.
	* Provides similar experience as `--inspect` Node CLI argument.
	*
	* Requires `fileParallelism: false`.
	*/
	inspect?: boolean | string;
	/**
	* Debug tests by opening `node:inspector` in worker / child process and wait for debugger to connect.
	* Provides similar experience as `--inspect-brk` Node CLI argument.
	*
	* Requires `fileParallelism: false`.
	*/
	inspectBrk?: boolean | string;
	/**
	* Inspector options. If `--inspect` or `--inspect-brk` is enabled, these options will be passed to the inspector.
	*/
	inspector?: {
		/**
		* Enable inspector
		*/
		enabled?: boolean;
		/**
		* Port to run inspector on
		*/
		port?: number;
		/**
		* Host to run inspector on
		*/
		host?: string;
		/**
		* Wait for debugger to connect before running tests
		*/
		waitForDebugger?: boolean;
	};
	/**
	* Define variables that will be returned from `inject` in the test environment.
	* @example
	* ```ts
	* // vitest.config.ts
	* export default defineConfig({
	*   test: {
	*     provide: {
	*       someKey: 'someValue'
	*     }
	*   }
	* })
	* ```
	* ```ts
	* // test file
	* import { inject } from 'vitest'
	* const value = inject('someKey') // 'someValue'
	* ```
	*/
	provide?: Partial<ProvidedContext>;
	/**
	* Configuration options for expect() matches.
	*/
	expect?: {
		/**
		* Throw an error if tests don't have any expect() assertions.
		*/
		requireAssertions?: boolean;
		/**
		* Default options for expect.poll()
		*/
		poll?: {
			/**
			* Timeout in milliseconds
			* @default 1000
			*/
			timeout?: number;
			/**
			* Polling interval in milliseconds
			* @default 50
			*/
			interval?: number;
		};
	};
	/**
	* Modify default Chai config. Vitest uses Chai for `expect` and `assert` matches.
	* https://github.com/chaijs/chai/blob/4.x.x/lib/chai/config.js
	*/
	chaiConfig?: ChaiConfig;
	/**
	* Sets length limit for formatted values interpolated into generated task titles.
	*
	* This affects values inserted by APIs like `test.each` and `test.for`.
	*
	* @default 40
	*/
	taskTitleValueFormatTruncate?: number;
	/**
	* Stop test execution when given number of tests have failed.
	*/
	bail?: number;
	/**
	* Retry configuration for tests.
	* - If a number, specifies how many times to retry failed tests
	* - If an object, allows fine-grained retry control
	*
	* ⚠️ WARNING: Function form is NOT supported in a config file
	* because configurations are serialized when passed to worker threads.
	* Use the function form only in test files directly.
	*
	* @default 0 // Don't retry
	*/
	retry?: SerializableRetry;
	/**
	* Repeat every test a specific number of times regardless of the result.
	*
	* @default 0 // Don't repeat
	*/
	repeats?: number;
	/**
	* Show full diff when snapshot fails instead of a patch.
	*/
	expandSnapshotDiff?: boolean;
	/**
	* By default, Vitest intercepts console output during tests to add context such as the test file and test title.
	* In browser mode, this interception is required to forward logs from the browser DevTools to the terminal.
	* It is also required for console log previews in the Vitest UI.
	* Disabling console interception can be useful when you want to debug code with normal synchronous terminal logging.
	*
	* @default false
	*/
	disableConsoleIntercept?: boolean;
	/**
	* Always print console stack traces.
	*
	* @default false
	*/
	printConsoleTrace?: boolean;
	/**
	* Include "location" property inside the test definition
	*
	* @default false
	*/
	includeTaskLocation?: boolean;
	/**
	* Directory path for storing attachments created by `context.annotate`
	*
	* @default '.vitest/attachments'
	*/
	attachmentsDir?: string;
	/**
	* Experimental features
	*
	* @experimental
	*/
	experimental?: {
		/**
		* {@link https://vitest.dev/guide/open-telemetry}
		*/
		openTelemetry?: {
			enabled: boolean;
			sdkPath?: string;
			browserSdkPath?: string;
		};
		/**
		* Configure import duration collection and display.
		*
		* The `limit` option controls how many imports to collect and display.
		* The `print` option controls CLI terminal output.
		* UI can always toggle the breakdown display regardless of `print` setting.
		*/
		importDurations?: {
			/**
			* When to print import breakdown to CLI terminal after tests finish.
			* - `true`: Always print
			* - `false`: Never print (default)
			* - `'on-warn'`: Print only when any import exceeds the warn threshold
			* @default false
			*/
			print?: boolean | "on-warn";
			/**
			* Maximum number of imports to collect and display.
			* @default 0 (or 10 if `print` or UI is enabled)
			*/
			limit?: number;
			/**
			* Fail the test run if any import exceeds the danger threshold.
			* When failing, the breakdown is always printed regardless of `print` setting.
			* @default false
			*/
			failOnDanger?: boolean;
			/**
			* Duration thresholds in milliseconds for coloring and warnings.
			*/
			thresholds?: {
				/**
				* Warning threshold - imports exceeding this are shown in yellow/orange.
				* @default 100
				*/
				warn?: number;
				/**
				* Danger threshold - imports exceeding this are shown in red.
				* @default 500
				*/
				danger?: number;
			};
		};
		/**
		* Controls whether Vitest uses Vite's module runner to run the code or fallback to the native `import`.
		*
		* If Node.js cannot process the code, consider registering [module loader](https://nodejs.org/api/module.html#customization-hooks) via `execArgv`.
		* @default true
		*/
		viteModuleRunner?: boolean;
		/**
		* If module runner is disabled, Vitest uses a module loader to transform files to support
		* `import.meta.vitest` and `vi.mock`.
		*
		* If you don't use these features, you can disable this.
		*
		* This option only affects `loader.load` method, Vitest always defines a `loader.resolve` to populate the module graph.
		*/
		nodeLoader?: boolean;
		/**
		* Record `expect.poll`, `vi.waitFor`, and `vi.waitUntil` steps of each test and print them as a timeline when the test fails.
		* Steps of passing tests are dropped without being reported.
		*
		* This has no effect in browser mode, which records its steps with `browser.traceView`.
		* @default false
		*/
		traceTimeline?: boolean;
		/**
		* Provider for detecting changed files. Used with the `--changed` flag
		* to determine which files have been modified.
		*
		* - `'git'` (default) compares the working tree with the `--changed` reference.
		* - `'mtime'` compares the modification time of every recorded dependency with the run
		*   that recorded it. It requires `experimental.recordDependencies`. The test files that
		*   failed in their last run also run.
		*
		* You can also provide a custom implementation of the `VCSProvider` interface.
		*/
		vcsProvider?: "git" | "mtime" | VCSProvider | (string & {});
		/**
		* Record the modules that every test file loads in the cache and use the records
		* with `--changed` and `--related` instead of walking the module graph statically.
		*
		* A test file without a record always runs.
		* @default false
		*/
		recordDependencies?: boolean;
		/**
		* Parse test specifications before running them.
		* This will apply `.only` flag and test name pattern across all files without running them.
		*/
		preParse?: boolean;
		/**
		* Print performance hints after the run when the collected timings show
		* that a configuration change would make the run significantly faster.
		* Hints are never printed for options that were set explicitly.
		*
		* Set to `false` to disable all hints, or disable them individually:
		* - `isolate`: hint when `isolate: true` spends a significant amount of
		*   time spawning a fresh worker (and re-creating the environment) for
		*   every test file, estimating how much `isolate: false` could save.
		* - `environment`: hint when re-creating a DOM environment for every test
		*   file dominates the run and a `vm` pool would set it up once per worker.
		* - `import`: hint when test files repeatedly evaluate the same module
		*   graph (typical for barrel-file imports) and `isolate: false` would
		*   evaluate it once per worker.
		* - `transform`: hint when transforming modules dominates the run and
		*   `fsModuleCache` would persist the results across runs.
		* @default true
		*/
		diagnostics?: boolean | {
			/** @default true */
			isolate?: boolean;
			/** @default true */
			environment?: boolean;
			/** @default true */
			import?: boolean;
			/** @default true */
			transform?: boolean;
		};
	};
	/**
	* Define tags available in your test files.
	*
	* If test defines a tag that is not listed here, an error will be thrown.
	*/
	tags?: TestTagDefinition[];
	/**
	* Should Vitest throw an error if test has a tag that is not defined in the config.
	* @default true
	*/
	strictTags?: boolean;
	/**
	* Runs tests that are affected by the changes in the repository, or between specified branch or commit hash
	* Requires initialized git repository
	* @default false
	*/
	changed?: boolean | string;
}
interface TypecheckConfig {
	/**
	* Run typechecking tests alongside regular tests.
	*/
	enabled?: boolean;
	/**
	* When typechecking is enabled, only run typechecking tests.
	*/
	only?: boolean;
	/**
	* What tools to use for type checking.
	*
	* @default 'tsc'
	*/
	checker: "tsc" | "vue-tsc" | (string & Record<never, never>);
	/**
	* Pattern for files that should be treated as test files
	*
	* @default ['**\/*.{test,spec}-d.?(c|m)[jt]s?(x)']
	*/
	include: string[];
	/**
	* Pattern for files that should not be treated as test files
	*
	* @default ['**\/node_modules/**', '**\/.git/**']
	*/
	exclude: string[];
	/**
	* Check JS files that have `@ts-check` comment.
	* If you have it enabled in tsconfig, this will not overwrite it.
	*/
	allowJs?: boolean;
	/**
	* Do not fail, if Vitest found errors outside the test files.
	*/
	ignoreSourceErrors?: boolean;
	/**
	* Use TypeScript build mode.
	*/
	build?: boolean;
	/**
	* Path to tsconfig, relative to the project root.
	*/
	tsconfig?: string;
	/**
	* Minimum time in milliseconds it takes to spawn the typechecker.
	* @default 10_000
	*/
	spawnTimeout?: number;
}
interface UserConfig extends InlineConfig {
	/**
	* Path to the config file.
	*
	* Default resolving to `vitest.config.*`, `vite.config.*`
	*
	* Setting to `false` will disable config resolving.
	*/
	config?: string | false | undefined;
	/**
	* Do not run tests when Vitest starts.
	*
	* Vitest will only run tests if it's called programmatically or the test file changes.
	*
	* If CLI file filters are passed, standalone mode is ignored.
	*/
	standalone?: boolean;
	/**
	* Use happy-dom
	*/
	dom?: boolean;
	/**
	* Run tests that cover a list of source files
	*/
	related?: string[] | string;
	/**
	* Test suite shard to execute in a format of <index>/<count>.
	* Will divide tests into a `count` numbers, and run only the `indexed` part.
	* Cannot be used with enabled watch.
	* @example --shard=2/3
	*/
	shard?: string;
	/**
	* Name of the project or projects to run.
	*/
	project?: string | string[];
	/**
	* Additional exclude patterns
	*/
	cliExclude?: string[];
	/**
	* Override vite config's clearScreen from cli
	*/
	clearScreen?: boolean;
	/**
	* Directory of blob reports to merge
	* @default '.vitest/blob'
	*/
	mergeReports?: string;
	/**
	* Delete all Vitest caches, including the `fsModuleCache`.
	* @experimental
	*/
	clearCache?: boolean;
	/**
	* Tags expression to filter tests to run. Multiple filters will be applied using AND logic.
	* @see {@link https://vitest.dev/guide/test-tags#syntax}
	*/
	tagsFilter?: string[];
	/**
	* Log all available tags instead of running tests.
	*/
	listTags?: boolean | "json";
	configLoader?: "bundle" | "runner" | "native";
	/**
	* The `--reporter` argument from the CLI
	*/
	reporter?: string | string[];
}
type OnUnhandledErrorCallback = (error: (TestError | Error) & {
	type: string;
}) => boolean | void;
interface ResolvedConfig extends Omit<Required<UserConfig>, "project" | "config" | "filters" | "browser" | "coverage" | "testNamePattern" | "related" | "api" | "reporters" | "resolveSnapshotPath" | "benchmark" | "shard" | "cache" | "sequence" | "typecheck" | "runner" | "pool" | "cliExclude" | "diff" | "setupFiles" | "snapshotEnvironment" | "bail" | "name" | "vmMemoryLimit" | "fileParallelism" | "tagsFilter" | "reporter" | "ui"> {
	name: ProjectName["label"];
	color?: ProjectName["color"];
	base?: string;
	diff?: string | SerializedDiffOptions;
	bail?: number;
	setupFiles: string[];
	snapshotEnvironment?: string;
	config?: string;
	filters?: string[];
	testNamePattern?: RegExp;
	related?: string[];
	coverage: ResolvedCoverageOptions;
	snapshotOptions: SnapshotStateOptions;
	browser: ResolvedBrowserOptions;
	pool: Pool;
	poolRunner?: PoolRunnerInitializer;
	reporters: (InlineReporter | ReporterWithOptions)[];
	defines: Record<string, any>;
	api: ResolvedApiConfig;
	ui: boolean;
	uiOptions: Required<Omit<UIOptions, "enabled">>;
	cliExclude?: string[];
	project: string[];
	benchmark: ResolvedBenchmarkOptions;
	shard?: {
		index: number;
		count: number;
	};
	cache: {
		/**
		* @deprecated
		*/
		dir: string;
	} | false;
	sequence: {
		sequencer: TestSequencerConstructor;
		hooks: SequenceHooks;
		setupFiles: SequenceSetupFiles;
		shuffle?: boolean;
		concurrent?: boolean;
		seed: number;
		groupOrder: number;
	};
	typecheck: Omit<TypecheckConfig, "enabled"> & {
		enabled: boolean;
	};
	runner?: string;
	maxWorkers: number;
	vmMemoryLimit?: string | number;
	dumpDir?: string;
	tagsFilter?: string[];
	mergeReportsLabel?: string;
	experimental: Omit<Required<UserConfig>["experimental"], "importDurations" | "diagnostics"> & {
		importDurations: {
			print: boolean | "on-warn";
			limit: number;
			failOnDanger: boolean;
			thresholds: {
				warn: number;
				danger: number;
			};
		};
		diagnostics: {
			isolate: boolean;
			environment: boolean;
			import: boolean;
			transform: boolean;
		};
	};
	cliOptions: CliOptions;
	viteOverrides: UserConfig$1;
	resolvedProjects: ResolvedProjectEntry[];
}
/**
* A resolved project entry. `viteConfig` may be shared by reference across multiple
* entries (e.g. browser instances or benchmark variants of the same parent), while
* `projectConfig` is always a distinct object per entry.
*/
interface ResolvedProjectEntry {
	viteConfig: ResolvedConfig$1;
	projectConfig: ResolvedConfig;
	/**
	* When set, this entry exists only so browser-instance siblings can attach
	* to a parent that owns the Vite server and (later) the browser provider.
	* The resulting `TestProject` is created and kept alive (so siblings can
	* reference it via `_parent`) but is NOT pushed to `vitest.projects`.
	*/
	hidden?: boolean;
	/**
	* The project was declared as an inline configuration. Its
	* `viteConfig.configFile` is the config it extends (the root config file
	* by default), not a file of its own.
	*/
	inline?: boolean;
}
type NonProjectOptions = "shard" | "watch" | "run" | "cache" | "update" | "reporters" | "outputFile" | "teardownTimeout" | "silent" | "forceRerunTriggers" | "testNamePattern" | "ui" | "open" | "uiBase" | "snapshotFormat" | "resolveSnapshotPath" | "passWithNoTests" | "onConsoleLog" | "onStackTrace" | "dangerouslyIgnoreUnhandledErrors" | "slowTestThreshold" | "inspect" | "inspectBrk" | "coverage" | "watchTriggerPatterns" | "tagsFilter" | "sharedViteServer";
interface ServerDepsOptions {
	/**
	* Externalize means that Vite will bpass the package to native Node.
	*
	* Externalized dependencies will not be applied Vite's transformers and resolvers.
	* And does not support HMR on reload.
	*
	* Typically, packages under `node_modules` are externalized.
	*/
	external?: (string | RegExp)[];
	/**
	* Vite will process inlined modules.
	*
	* This could be helpful to handle packages that ship `.js` in ESM format (that Node can't handle).
	*
	* If `true`, every dependency will be inlined
	*/
	inline?: (string | RegExp)[] | true;
	/**
	* Try to guess the CJS version of a package when it's invalid ESM
	* @default false
	*/
	fallbackCJS?: boolean;
}
type ProjectConfig = Omit<InlineConfig, NonProjectOptions | "projects" | "sequence" | "deps"> & {
	mode?: string;
	sequence?: Omit<SequenceOptions, "sequencer" | "seed" | "shuffle"> & {
		shuffle?: boolean | {
			tests?: boolean;
		};
	};
	deps?: DepsOptions;
};
type ResolvedProjectConfig = Omit<ResolvedConfig, Exclude<NonProjectOptions, "coverage" | "watch">>;
interface UserWorkspaceConfig extends UserConfig$1 {
	test?: ProjectConfig & {
		projects?: TestProjectConfiguration[];
	};
}
type UserProjectConfigFn = (env: ConfigEnv) => UserWorkspaceConfig | Promise<UserWorkspaceConfig>;
type UserProjectConfigExport = UserWorkspaceConfig | Promise<UserWorkspaceConfig> | UserProjectConfigFn;
type TestProjectInlineConfiguration = UserWorkspaceConfig & {
	/**
	* Relative path to the extendable config. All other options will be merged with this config.
	* If `true`, the project will inherit all options from the root config.
	* Set to `false` to keep the project configuration completely separate from the root config.
	* @default true
	* @example '../vite.config.ts'
	*/
	extends?: string | boolean;
};
type TestProjectConfiguration = string | TestProjectInlineConfiguration | Promise<UserWorkspaceConfig> | UserProjectConfigFn;

/**
* Generate a unique cache identifier.
*
* Return `false` to disable caching of the file.
*/
interface CacheKeyIdGenerator {
	(context: CacheKeyIdGeneratorContext): string | undefined | null | false;
}
interface CacheKeyIdGeneratorContext {
	environment: DevEnvironment;
	id: string;
	sourceCode: string;
}

interface VitestPluginContext {
	vitest: Vitest;
	project: TestProject;
	injectTestProjects: (config: TestProjectConfiguration | TestProjectConfiguration[]) => Promise<TestProject[]>;
	/**
	* Define a generator that will be applied before hashing this project's cache key.
	*
	* Use this to make sure Vitest generates correct hash. It is a good idea
	* to define this function if your plugin can be registered with different options.
	*
	* This is called only if `fsModuleCache` is enabled.
	*/
	defineCacheKeyGenerator: (callback: CacheKeyIdGenerator) => void;
	/**
	* @deprecated Use {@link defineCacheKeyGenerator} instead.
	*/
	experimental_defineCacheKeyGenerator: (callback: CacheKeyIdGenerator) => void;
}

export { Logger as L, MinimalReporter as M, PluginHarness as P, ReportersMap as aD, TapFlatReporter as aK, TapReporter as aL, TestCase as aP, TestCollection as aQ, TestModule as aS, DefaultReporter as aa, DotReporter as ac, GithubActionsReporter as ae, HangingProcessReporter as ag, JUnitReporter as aj, JsonReporter as am, TestSuite as b2, VerboseReporter as b8, VitestPackageInstaller as ba, experimental_getRunnerTask as bd, startVitest as be, Vitest as f, CoverageMap as h, TestSpecification as i, TestProject as k, BaseReporter as t };
export type { CSSModuleScopeStrategy as $, ApiConfig as A, BaseCoverageOptions as B, CoverageOptions as C, BrowserModuleMocker as D, BrowserOrchestrator as E, FieldsWithDefaultValues as F, BrowserProvider as G, BrowserProviderCloseOptions as H, InlineConfig as I, BrowserProviderOption as J, BrowserScript as K, BrowserServerContribution as N, BrowserServerFactory as O, BrowserServerState as Q, ResolvedConfig as R, BrowserServerStateSession as S, TestProjectConfiguration as T, UserWorkspaceConfig as U, VitestPluginContext as V, WatcherTriggerPattern as W, BrowserTraceViewOptions as X, BuiltinEnvironment as Y, BuiltinReporterOptions as Z, BuiltinReporters as _, UserProjectConfigFn as a, TestSequencerConstructor as a$, CacheKeyIdGenerator as a0, CacheKeyIdGeneratorContext as a1, CachedTestFileResult as a2, CoverageInstrumenter as a3, CoverageIstanbulOptions as a4, CoverageProvider as a5, CoverageProviderModule as a6, CoverageReporter as a7, CoverageV8Options as a8, CustomProviderOptions as a9, Report as aA, ReportedHookContext as aB, Reporter as aC, ResolveSnapshotPathHandler as aE, ResolveSnapshotPathHandlerContext as aF, ResolvedBrowserOptions as aG, ResolvedProjectConfig as aH, SerializedTestProject as aI, SuiteNameTemplateVariables as aJ, TaskOptions as aM, TestAttempt as aN, TestAttemptState as aO, TestDiagnostic as aR, TestModuleState as aT, TestResult as aU, TestResultFailed as aV, TestResultPassed as aW, TestResultPending as aX, TestResultSkipped as aY, TestRunEndReason as aZ, TestRunResult as a_, DepsOptimizationOptions as ab, EnvironmentOptions as ad, HTMLOptions as af, InstrumenterOptions as ah, JUnitOptions as ai, JsonAssertionResult as ak, JsonOptions as al, JsonTestResult as an, JsonTestResults as ao, ModuleDependency as ap, ModuleDiagnostic as aq, ModulesResolver as ar, OnServerRestartHandler as as, OnTestsRerunHandler as at, ParentProjectBrowser as au, Pool as av, PoolRunnerInitializer as aw, PoolTask as ax, ProjectBrowser as ay, ProjectConfig as az, UserProjectConfigExport as b, TestSpecificationOptions as b0, TestState as b1, TestSuiteState as b3, ToMatchScreenshotComparators as b4, ToMatchScreenshotOptions as b5, TypecheckConfig as b6, UIOptions as b7, VitestEnvironment as b9, WorkerResponse as bb, _BrowserNames as bc, TestProjectInlineConfiguration as c, UserConfig as d, CliOptions as e, ResolvedCoverageOptions as g, ReportContext as j, VitestOptions as l, VitestRunMode as m, VCSProvider as n, VCSProviderOptions as o, PoolWorker as p, PoolOptions as q, WorkerRequest as r, TestSequencer as s, BenchmarkUserOptions as u, BrowserBuiltinProvider as v, BrowserCommand as w, BrowserCommandContext as x, BrowserConfigOptions as y, BrowserInstanceOption as z };
