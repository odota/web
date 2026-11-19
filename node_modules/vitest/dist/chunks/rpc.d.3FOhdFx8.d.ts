import { bw as FetchCachedFileSystemResult, bx as ResolveFunctionResult, U as UserConsoleLog, bo as AsyncLeak, a as File, a3 as AfterSuiteRunMeta, b2 as TestBenchmark, j as TestArtifact, k as TaskResultPack, l as TaskEventPack, Z as CancelReason, aO as SnapshotResult, a6 as BaselineData } from './config.d.B3YV4t0O.js';
import { FetchFunctionOptions, FetchResult } from 'vite/module-runner';

interface OTELCarrier {
	traceparent?: string;
	tracestate?: string;
}
interface TracesOptions {
	enabled: boolean;
	watchMode?: boolean;
	sdkPath?: string;
	tracerName?: string;
}
declare class Traces {
	#private;
	constructor(options: TracesOptions);
	isEnabled(): boolean;
}

declare class GetterTracker {
	static EXPORTS_MAX_INVOCATIONS: number;
	private invocations;
	private excessiveInvocations;
	createTracker(moduleId: string, defineExport: (name: string, getter: () => unknown) => void): (name: string, getter: () => unknown) => void;
	resetInvocations(): void;
	getExcessiveInvocations(): GetterTrackerExport[];
}
interface GetterTrackerExport {
	moduleId: string;
	exportName: string;
}

interface RuntimeRPC {
	fetch: (id: string, importer: string | undefined, environment: string, options?: FetchFunctionOptions, otelCarrier?: OTELCarrier) => Promise<FetchResult | FetchCachedFileSystemResult>;
	resolve: (id: string, importer: string | undefined, environment: string) => Promise<ResolveFunctionResult | null>;
	/**
	* Returns the modules of the given test files' import graphs that the server
	* has already processed, so a fresh worker can load them from disk without
	* paying a `fetch` round-trip per module.
	*/
	fetchWarmModules: (environment: string, files: string[]) => Promise<Record<string, FetchResult | FetchCachedFileSystemResult>>;
	/**
	* Transforms the import graphs of the given test files ahead of the
	* worker's own fetches. Fired by vm pool workers before their environment
	* setup, so the server transforms modules while the worker is busy
	* importing its environment package.
	*/
	prewarmModuleGraph: (environment: string, files: string[]) => Promise<void>;
	transform: (id: string) => Promise<{
		code?: string;
	}>;
	onUserConsoleLog: (log: UserConsoleLog) => void;
	onUnhandledError: (err: unknown, type: string) => void;
	onAsyncLeaks: (leak: AsyncLeak[]) => void;
	onTestModuleDependencies: (filepath: string, dependencies: string[]) => void;
	onQueued: (file: File) => void;
	onCollected: (files: File[]) => Promise<void>;
	onAfterSuiteRun: (meta: AfterSuiteRunMeta) => void;
	onTestBenchmark: (testId: string, bench: TestBenchmark) => void;
	onTaskArtifactRecord: <Artifact extends TestArtifact>(testId: string, artifact: Artifact) => Promise<Artifact>;
	onTaskUpdate: (pack: TaskResultPack[], events: TaskEventPack[]) => Promise<void>;
	onCancel: (reason: CancelReason) => void;
	getCountOfFailedTests: () => number;
	snapshotSaved: (snapshot: SnapshotResult) => void;
	resolveSnapshotPath: (testPath: string) => string;
	readBenchmarkResult: (relativePath: string) => Promise<BaselineData | null>;
	writeBenchmarkResult: (relativePath: string, data: BaselineData) => Promise<void>;
	ensureModuleGraphEntry: (id: string, importer: string) => void;
}
interface RunnerRPC {
	onCancel: (reason: CancelReason) => void;
}

export { GetterTracker as G, Traces as T };
export type { OTELCarrier as O, RunnerRPC as R, RuntimeRPC as a };
