import * as vite from 'vite';
import { UserConfig as UserConfig$1, ResolvedConfig as ResolvedConfig$1, TransformResult, ViteDevServer, LogLevel, LoggerOptions, Logger as Logger$1 } from 'vite';
export { vite as Vite };
export { esbuildVersion, isCSSRequest, isFileLoadingAllowed, parseAst, parseAstAsync, rollupVersion, version as viteVersion } from 'vite';
import { IncomingMessage } from 'node:http';
import { R as ResolvedConfig, e as CliOptions, d as UserConfig, L as Logger, A as ApiConfig, P as PluginHarness, f as Vitest, g as ResolvedCoverageOptions, h as CoverageMap, i as TestSpecification, j as ReportContext, k as TestProject, l as VitestOptions, m as VitestRunMode, n as VCSProvider, o as VCSProviderOptions, p as PoolWorker, q as PoolOptions, r as WorkerRequest, s as TestSequencer } from './chunks/plugin.d.LRFSN46m.js';
export { M as AgentReporter, B as BaseCoverageOptions, t as BaseReporter, u as BenchmarkUserOptions, v as BrowserBuiltinProvider, w as BrowserCommand, x as BrowserCommandContext, y as BrowserConfigOptions, z as BrowserInstanceOption, D as BrowserModuleMocker, E as BrowserOrchestrator, G as BrowserProvider, H as BrowserProviderCloseOptions, J as BrowserProviderOption, K as BrowserScript, N as BrowserServerContribution, O as BrowserServerFactory, Q as BrowserServerState, S as BrowserServerStateSession, X as BrowserTraceViewOptions, Y as BuiltinEnvironment, Z as BuiltinReporterOptions, _ as BuiltinReporters, $ as CSSModuleScopeStrategy, a0 as CacheKeyIdGenerator, a1 as CacheKeyIdGeneratorContext, a2 as CachedTestFileResult, a3 as CoverageInstrumenter, a4 as CoverageIstanbulOptions, C as CoverageOptions, a5 as CoverageProvider, a6 as CoverageProviderModule, a7 as CoverageReporter, a8 as CoverageV8Options, a9 as CustomProviderOptions, aa as DefaultReporter, ab as DepsOptimizationOptions, ac as DotReporter, ad as EnvironmentOptions, ae as GithubActionsReporter, af as HTMLOptions, ag as HangingProcessReporter, I as InlineConfig, ah as InstrumenterOptions, ai as JUnitOptions, aj as JUnitReporter, ak as JsonAssertionResult, al as JsonOptions, am as JsonReporter, an as JsonTestResult, ao as JsonTestResults, M as MinimalReporter, ap as ModuleDependency, aq as ModuleDiagnostic, ar as ModulesResolver, as as OnServerRestartHandler, at as OnTestsRerunHandler, au as ParentProjectBrowser, av as Pool, aw as PoolRunnerInitializer, ax as PoolTask, ay as ProjectBrowser, az as ProjectConfig, aA as Report, aB as ReportedHookContext, aC as Reporter, aD as ReportersMap, aE as ResolveSnapshotPathHandler, aF as ResolveSnapshotPathHandlerContext, aG as ResolvedBrowserOptions, aH as ResolvedProjectConfig, aI as SerializedTestProject, aJ as SuiteNameTemplateVariables, aK as TapFlatReporter, aL as TapReporter, aM as TaskOptions, aN as TestAttempt, aO as TestAttemptState, aP as TestCase, aQ as TestCollection, aR as TestDiagnostic, aS as TestModule, aT as TestModuleState, aU as TestResult, aV as TestResultFailed, aW as TestResultPassed, aX as TestResultPending, aY as TestResultSkipped, aZ as TestRunEndReason, a_ as TestRunResult, a$ as TestSequencerConstructor, b0 as TestSpecificationOptions, b1 as TestState, b2 as TestSuite, b3 as TestSuiteState, b4 as ToMatchScreenshotComparators, b5 as ToMatchScreenshotOptions, b6 as TypecheckConfig, b7 as UIOptions, U as UserWorkspaceConfig, b8 as VerboseReporter, b9 as VitestEnvironment, ba as VitestPackageInstaller, V as VitestPluginContext, W as WatcherTriggerPattern, bb as WorkerResponse, bc as _BrowserNames, bd as experimental_getRunnerTask, be as startVitest } from './chunks/plugin.d.LRFSN46m.js';
import { EventEmitter } from 'events';
import { A as Awaitable } from './chunks/config.d.B3YV4t0O.js';
import { AfterSuiteRunMeta } from './index.js';
export { Y as RunnerTask, aI as RunnerTaskResult, k as RunnerTaskResultPack, n as RunnerTestCase, a as RunnerTestFile, Q as RunnerTestSuite, aK as RuntimeConfig, bh as SequenceHooks, bi as SequenceSetupFiles, aL as SerializedError, bj as disableDefaultColors } from './chunks/config.d.B3YV4t0O.js';
import { RuntimeRPC } from './index.js';
import { Writable } from 'node:stream';
import { ContextRPC } from './index.js';
export { T as TestExecutionType } from './chunks/worker.d.CyJRpyfZ.js';
import { Debugger } from 'obug';
export { g as generateFileHash } from './chunks/task-utils.d.D-gFPNFi.js';
export { CDPSession } from 'vitest/browser';
import './chunks/browser.d.C7tWgUvw.js';
import 'chai';
import 'vitest/optional-types.js';
import '@vitest/mocker';
import './chunks/source-map.d.BkG8YK_3.js';
import 'node:path';
import 'node:console';
import 'node:fs/promises';
import 'vitest/optional-runtime-types.js';
import 'tinybench';
import 'vite/module-runner';
import './chunks/environment.d.BFQtFKdZ.js';

declare function escapeTestName(label: string, dynamic: boolean): string;

type RawErrsMap = Map<string, TscErrorInfo[]>;
interface TscErrorInfo {
	filePath: string;
	errCode: number;
	errMsg: string;
	line: number;
	column: number;
}
interface CollectLineNumbers {
	target: number;
	next: number;
	prev?: number;
}
type CollectLines = { [key in keyof CollectLineNumbers]: string };
interface RootAndTarget {
	root: string;
	targetAbsPath: string;
}
type Context = RootAndTarget & {
	rawErrsMap: RawErrsMap;
	openedDirs: Set<string>;
	lastActivePath?: string;
};

declare function isValidApiRequest(config: ResolvedConfig, req: IncomingMessage): boolean;

interface OptionConfig {
    default?: any;
    type?: any;
}
declare class Option {
    rawName: string;
    description: string;
    /** Option name */
    name: string;
    /** Option name and aliases */
    names: string[];
    isBoolean?: boolean;
    required?: boolean;
    config: OptionConfig;
    negated: boolean;
    constructor(rawName: string, description: string, config?: OptionConfig);
}

interface CommandArg {
    required: boolean;
    value: string;
    variadic: boolean;
}
interface HelpSection {
    title?: string;
    body: string;
}
interface CommandConfig {
    allowUnknownOptions?: boolean;
    ignoreOptionDefaultValue?: boolean;
}
declare type HelpCallback = (sections: HelpSection[]) => void | HelpSection[];
declare type CommandExample = ((bin: string) => string) | string;
declare class Command {
    rawName: string;
    description: string;
    config: CommandConfig;
    cli: CAC;
    options: Option[];
    aliasNames: string[];
    name: string;
    args: CommandArg[];
    commandAction?: (...args: any[]) => any;
    usageText?: string;
    versionNumber?: string;
    examples: CommandExample[];
    helpCallback?: HelpCallback;
    globalCommand?: GlobalCommand;
    constructor(rawName: string, description: string, config: CommandConfig, cli: CAC);
    usage(text: string): this;
    allowUnknownOptions(): this;
    ignoreOptionDefaultValue(): this;
    version(version: string, customFlags?: string): this;
    example(example: CommandExample): this;
    /**
     * Add a option for this command
     * @param rawName Raw option name(s)
     * @param description Option description
     * @param config Option config
     */
    option(rawName: string, description: string, config?: OptionConfig): this;
    alias(name: string): this;
    action(callback: (...args: any[]) => any): this;
    /**
     * Check if a command name is matched by this command
     * @param name Command name
     */
    isMatched(name: string): boolean;
    get isDefaultCommand(): boolean;
    get isGlobalCommand(): boolean;
    /**
     * Check if an option is registered in this command
     * @param name Option name
     */
    hasOption(name: string): Option | undefined;
    outputHelp(): void;
    outputVersion(): void;
    checkRequiredArgs(): void;
    /**
     * Check if the parsed options contain any unknown options
     *
     * Exit and output error when true
     */
    checkUnknownOptions(): void;
    /**
     * Check if the required string-type options exist
     */
    checkOptionValue(): void;
}
declare class GlobalCommand extends Command {
    constructor(cli: CAC);
}

interface ParsedArgv {
    args: ReadonlyArray<string>;
    options: {
        [k: string]: any;
    };
}
declare class CAC extends EventEmitter {
    /** The program name to display in help and version message */
    name: string;
    commands: Command[];
    globalCommand: GlobalCommand;
    matchedCommand?: Command;
    matchedCommandName?: string;
    /**
     * Raw CLI arguments
     */
    rawArgs: string[];
    /**
     * Parsed CLI arguments
     */
    args: ParsedArgv['args'];
    /**
     * Parsed CLI options, camelCased
     */
    options: ParsedArgv['options'];
    showHelpOnExit?: boolean;
    showVersionOnExit?: boolean;
    /**
     * @param name The program name to display in help and version message
     */
    constructor(name?: string);
    /**
     * Add a global usage text.
     *
     * This is not used by sub-commands.
     */
    usage(text: string): this;
    /**
     * Add a sub-command
     */
    command(rawName: string, description?: string, config?: CommandConfig): Command;
    /**
     * Add a global CLI option.
     *
     * Which is also applied to sub-commands.
     */
    option(rawName: string, description: string, config?: OptionConfig): this;
    /**
     * Show help message when `-h, --help` flags appear.
     *
     */
    help(callback?: HelpCallback): this;
    /**
     * Show version number when `-v, --version` flags appear.
     *
     */
    version(version: string, customFlags?: string): this;
    /**
     * Add a global example.
     *
     * This example added here will not be used by sub-commands.
     */
    example(example: CommandExample): this;
    /**
     * Output the corresponding help message
     * When a sub-command is matched, output the help message for the command
     * Otherwise output the global one.
     *
     */
    outputHelp(): void;
    /**
     * Output the version number.
     *
     */
    outputVersion(): void;
    private setParsedInfo;
    unsetMatchedCommand(): void;
    /**
     * Parse argv
     */
    parse(argv?: string[], {
    /** Whether to run the action for matched command */
    run, }?: {
        run?: boolean | undefined;
    }): ParsedArgv;
    private mri;
    runMatchedCommand(): any;
}

interface CliParseOptions {
	allowUnknownOptions?: boolean;
}
declare function createCLI(options?: CliParseOptions): CAC;
declare function parseCLI(argv: string | string[], config?: CliParseOptions): {
	filter: string[];
	options: CliOptions;
};

declare function resolveApiServerConfig(config: UserConfig, defaultPort: number, logger: Logger): ApiConfig;
declare function resolveConfig(options?: UserConfig, viteOverrides?: UserConfig$1, pluginsHarness?: PluginHarness, cliFilters?: string[]): Promise<ResolvedConfig$1>;

type Threshold = "lines" | "functions" | "statements" | "branches";
interface ResolvedThreshold {
	coverageMap: CoverageMap;
	name: string;
	thresholds: Partial<Record<Threshold, number | undefined>>;
	/** When `true`, check `thresholds` against each file instead of the aggregate. */
	perFile: boolean;
	/** Additional per-file-only minimums (object form of `perFile`), or `null`. */
	perFileThresholds: Partial<Record<Threshold, number | undefined>> | null;
}
/**
* Holds info about raw coverage results that are stored on file system:
*
* ```json
* "project-a": {
*   "web": {
*     "tests/math.test.ts": "coverage-1.json",
*     "tests/utils.test.ts": "coverage-2.json",
* //                          ^^^^^^^^^^^^^^^ Raw coverage on file system
*   },
*   "ssr": { ... },
*   "browser": { ... },
* },
* "project-b": ...
* ```
*/
type CoverageFiles = Map<NonNullable<AfterSuiteRunMeta["projectName"]> | symbol, Record<AfterSuiteRunMeta["environment"], {
	[TestFilenames: string]: string;
}>>;
declare class BaseCoverageProvider {
	ctx: Vitest;
	readonly name: "v8" | "istanbul";
	version: string;
	options: ResolvedCoverageOptions;
	globCache: Map<string, boolean>;
	autoUpdateMarker: string;
	globMatchers?: {
		matchExclude: (file: string) => boolean;
		matchInclude: (file: string) => boolean;
	};
	coverageFiles: CoverageFiles;
	coverageFilesDirectory: string;
	reportsDirectoryLock: ReportsDirectoryLock;
	roots: string[];
	changedFiles?: string[];
	_initialize(ctx: Vitest): void;
	/**
	* Check if file matches `coverage.include` but not `coverage.exclude`
	*/
	isIncluded(_filename: string, root?: string): boolean;
	/**
	* Compile `coverage.include`/`coverage.exclude` into reusable matchers once.
	* `picomatch.isMatch(file, patterns, options)` recompiles the patterns on
	* every call, which dominates the filtering step on large test suites.
	*/
	private getGlobMatchers;
	private getUntestedFilesByRoot;
	getUntestedFiles(testedFiles: string[]): Promise<string[]>;
	createCoverageMap(): CoverageMap;
	generateReports(_: CoverageMap, __: boolean | undefined): Promise<void>;
	parseConfigModule(_: string): Promise<{
		generate: () => {
			code: string;
		};
	}>;
	resolveOptions(): ResolvedCoverageOptions;
	clean(clean?: boolean): Promise<void>;
	onAfterSuiteRun({ coverage, environment, projectName, testFiles }: AfterSuiteRunMeta): void;
	readCoverageFiles<CoverageType>({ onFileRead, onFinished, onDebug }: {
		/** Callback invoked with a single coverage result */
		onFileRead: (data: CoverageType) => void;
		/** Callback invoked once all results of a project for specific transform mode are read */
		onFinished: (project: Vitest["projects"][number], environment: string) => Promise<void>;
		onDebug: ((...logs: any[]) => void) & {
			enabled: boolean;
		};
	}): Promise<void>;
	cleanAfterRun(): Promise<void>;
	onTestRunStart(specifications: ReadonlyArray<TestSpecification>): Promise<void>;
	onTestFailure(): Promise<void>;
	reportCoverage(coverageMap: unknown, { allTestsRun }: ReportContext): Promise<void>;
	reportThresholds(coverageMap: CoverageMap, allTestsRun: boolean | undefined): Promise<void>;
	/**
	* Constructs collected coverage and users' threshold options into separate sets
	* where each threshold set holds their own coverage maps. Threshold set is either
	* for specific files defined by glob pattern or global for all other files.
	*/
	private resolveThresholds;
	/**
	* Check collected coverage against configured thresholds. Sets exit code to 1 when thresholds not reached.
	*/
	private checkThresholds;
	private reportThresholdViolations;
	/**
	* Check if current coverage is above configured thresholds and bump the thresholds if needed
	*/
	updateThresholds({ thresholds: allThresholds, onUpdate, configurationFile }: {
		thresholds: ResolvedThreshold[];
		configurationFile: unknown;
		onUpdate: () => void;
	}): Promise<void>;
	mergeReports(coverageMaps: unknown[]): Promise<void>;
	hasTerminalReporter(reporters: ResolvedCoverageOptions["reporter"]): boolean;
	toSlices<T>(array: T[], size: number): T[][];
	transformFile(url: string, project: TestProject, viteEnvironment: string, isTransformedByVite?: boolean): Promise<TransformResult | null | undefined>;
	createUncoveredFileTransformer(ctx: Vitest): (filename: string) => Promise<TransformResult | null | undefined>;
}
declare class ReportsDirectoryLock {
	private readonly reportsDirectory;
	readonly lockFile: string;
	constructor(reportsDirectory: string);
	acquire(): Promise<void>;
	release(): Promise<void>;
	private tryWrite;
	private readOwner;
	private inUseError;
}

declare function createVitest(options: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;
/**
* @deprecated The `mode` argument is no longer used. Use `createVitest(options, viteOverrides?, vitestOptions?)` instead.
*/
declare function createVitest(mode: VitestRunMode, options: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;

declare class FilesNotFoundError extends Error {
	code: string;
	constructor();
}
declare class GitNotFoundError extends Error {
	code: string;
	constructor();
}
declare class BrowserConnectionError extends Error {
	code: string;
}

declare function resolveFsAllow(projectRoot: string, rootConfigFile: string | false | undefined): string[];

type RunWithFiles = (files: TestSpecification[], invalidates?: string[]) => Promise<void>;
interface ProcessPool {
	name: string;
	runTests: RunWithFiles;
	collectTests: RunWithFiles;
	close?: () => Awaitable<void>;
}
declare function getFilePoolName(project: TestProject): ResolvedConfig["pool"];

interface MethodsOptions {
	cacheFs?: boolean;
	collect?: boolean;
}
declare function createMethodsRPC(project: TestProject, methodsOptions?: MethodsOptions): RuntimeRPC;

declare class GitVCSProvider implements VCSProvider {
	private root;
	private resolveFilesWithGitCommand;
	findChangedFiles(options: VCSProviderOptions): Promise<string[]>;
	private getFilesSince;
	private getStagedFiles;
	private getUnstagedFiles;
	getRoot(cwd: string): Promise<string | null>;
}

/**
* Reports a dependency as changed when its modification time is newer than the run that recorded it.
* A dependency without a recorded time is always changed.
*/
declare class MtimeVCSProvider implements VCSProvider {
	findChangedFiles(options: VCSProviderOptions): Promise<string[]>;
}

/** @experimental */
declare class ForksPoolWorker implements PoolWorker {
	readonly name: string;
	readonly cacheFs: boolean;
	protected readonly entrypoint: string;
	protected execArgv: string[];
	protected env: Partial<NodeJS.ProcessEnv>;
	private _fork?;
	private stdout;
	private stderr;
	private _errorEmitter;
	private _pipeErrorTimer;
	constructor(options: PoolOptions);
	on(event: string, callback: (...args: any[]) => void): void;
	off(event: string, callback: (...args: any[]) => void): void;
	send(message: WorkerRequest): void;
	start(): Promise<void>;
	stop(): Promise<void>;
	deserialize(data: unknown): unknown;
	private emitError;
	private get fork();
}

/** @experimental */
declare class ThreadsPoolWorker implements PoolWorker {
	readonly name: string;
	protected readonly entrypoint: string;
	protected execArgv: string[];
	protected env: Partial<NodeJS.ProcessEnv>;
	private _thread?;
	private stdout;
	private stderr;
	constructor(options: PoolOptions);
	on(event: string, callback: (...args: any[]) => void): void;
	off(event: string, callback: (...args: any[]) => void): void;
	send(message: WorkerRequest): void;
	start(): Promise<void>;
	stop(): Promise<void>;
	deserialize(data: unknown): unknown;
	private get thread();
}

/** @experimental */
declare class TypecheckPoolWorker implements PoolWorker {
	readonly name: string;
	private readonly project;
	private _eventEmitter;
	constructor(options: PoolOptions);
	start(): Promise<void>;
	stop(): Promise<void>;
	canReuse(): boolean;
	send(message: WorkerRequest): void;
	on(event: string, callback: (arg: any) => any): void;
	off(event: string, callback: (arg: any) => any): void;
	deserialize(data: unknown): unknown;
}

/** @experimental */
declare class VmForksPoolWorker extends ForksPoolWorker {
	readonly name = "vmForks";
	readonly reportMemory = true;
	protected readonly entrypoint: string;
	constructor(options: PoolOptions);
	canReuse(): boolean;
}

/** @experimental */
declare class VmThreadsPoolWorker extends ThreadsPoolWorker {
	readonly name = "vmThreads";
	readonly reportMemory = true;
	protected readonly entrypoint: string;
	constructor(options: PoolOptions);
	canReuse(): boolean;
}

declare class BaseSequencer implements TestSequencer {
	protected ctx: Vitest;
	constructor(ctx: Vitest);
	shard(files: TestSpecification[]): Promise<TestSpecification[]>;
	sort(files: TestSpecification[]): Promise<TestSpecification[]>;
	private calculateShardRange;
}

declare function registerConsoleShortcuts(ctx: Vitest, stdin: NodeJS.ReadStream | undefined, stdout: NodeJS.WriteStream | Writable): () => void;

interface WorkerContext extends ContextRPC {}

/**
* Check if the url is allowed to be served, via the `server.fs` config.
* @deprecated Use the `isFileLoadingAllowed` function instead.
*/
declare function isFileServingAllowed(config: ResolvedConfig$1, url: string): boolean;
declare function isFileServingAllowed(url: string, server: ViteDevServer): boolean;

declare function createViteLogger(console: Logger, level?: LogLevel, options?: LoggerOptions): Logger$1;

declare const rootDir: string;
declare const distDir: string;

declare function createDebugger(namespace: `vitest:${string}`): Debugger | undefined;

declare const version: string;

declare const createViteServer: typeof vite.createServer;

declare const rolldownVersion: string | undefined;

export { ApiConfig, BaseCoverageProvider, BaseSequencer, BrowserConnectionError, CliOptions, ForksPoolWorker, GitNotFoundError, GitVCSProvider, Logger, MtimeVCSProvider, PluginHarness, PoolOptions, PoolWorker, ReportContext, ResolvedConfig, ResolvedCoverageOptions, TestProject, TestSequencer, TestSpecification, UserConfig as TestUserConfig, FilesNotFoundError as TestsNotFoundError, ThreadsPoolWorker, TypecheckPoolWorker, VCSProvider, VCSProviderOptions, Vitest, VitestOptions, VitestRunMode, VmForksPoolWorker, VmThreadsPoolWorker, WorkerRequest, createCLI, createDebugger, createMethodsRPC, createViteLogger, createViteServer, createVitest, distDir, escapeTestName, getFilePoolName, isFileServingAllowed, isValidApiRequest, parseCLI, registerConsoleShortcuts, resolveApiServerConfig, resolveConfig, resolveFsAllow, rolldownVersion, rootDir, version };
export type { CliParseOptions, ProcessPool, CollectLineNumbers as TypeCheckCollectLineNumbers, CollectLines as TypeCheckCollectLines, Context as TypeCheckContext, TscErrorInfo as TypeCheckErrorInfo, RawErrsMap as TypeCheckRawErrorsMap, RootAndTarget as TypeCheckRootAndTarget, WorkerContext };
