import { F as FileSpecification, c as SerializedDiffOptions } from './chunks/config.d.B3YV4t0O.js';
import { SerializedCoverageConfig, RunnerTestFile as File, SerializedConfig, DiffOptions, TestError } from './index.js';
import { VitestRunner } from './runtime.js';
export { P as ParsedStack, _ as SpyModule, d as StringifyOptions, f as format, i as inspect, s as stringify } from './chunks/config.d.B3YV4t0O.js';
import { R as RuntimeCoverageModuleLoader } from './chunks/source-map.d.BkG8YK_3.js';
export { D as DecodedMap, g as getOriginalPosition } from './chunks/source-map.d.BkG8YK_3.js';
import 'vitest/optional-runtime-types.js';
import 'tinybench';

type BrowserTraceEntryKind = "action" | "expect" | "mark" | "lifecycle";

declare function getType(value: unknown): string;

interface SafeTimers {
	nextTick?: (cb: () => void) => void;
	setImmediate?: {
		<TArgs extends any[]>(callback: (...args: TArgs) => void, ...args: TArgs): any;
		__promisify__: <T = void>(value?: T, options?: any) => Promise<T>;
	};
	clearImmediate?: (immediateId: any) => void;
	setTimeout: typeof setTimeout;
	setInterval: typeof setInterval;
	clearInterval: typeof clearInterval;
	clearTimeout: typeof clearTimeout;
	queueMicrotask: typeof queueMicrotask;
}
declare function getSafeTimers(): SafeTimers;
declare function setSafeTimers(): void;

declare function startCoverageInsideWorker(options: SerializedCoverageConfig, loader: RuntimeCoverageModuleLoader, runtimeOptions: {
	isolate: boolean;
}): Promise<unknown>;
declare function takeCoverageInsideWorker(options: SerializedCoverageConfig, loader: RuntimeCoverageModuleLoader): Promise<unknown>;
declare function stopCoverageInsideWorker(options: SerializedCoverageConfig, loader: RuntimeCoverageModuleLoader, runtimeOptions: {
	isolate: boolean;
}): Promise<unknown>;

declare function startTests(specs: string[] | FileSpecification[], runner: VitestRunner): Promise<File[]>;
declare function publicCollect(specs: string[] | FileSpecification[], runner: VitestRunner): Promise<File[]>;

interface PublicModuleRunner {
	import: (id: string) => Promise<any>;
}

declare function setupCommonEnv(config: SerializedConfig): Promise<void>;
declare function setupEnv(env: Record<string, any>, metaEnv: Record<string, any>): void;
declare function loadDiffConfig(config: SerializedConfig, moduleRunner: PublicModuleRunner): Promise<SerializedDiffOptions | undefined>;
declare function loadSnapshotSerializers(config: SerializedConfig, moduleRunner: PublicModuleRunner): Promise<void>;

declare function processError(_err: any, diffOptions?: DiffOptions, seen?: WeakSet<WeakKey>): TestError;

interface FsOptions {
	encoding?: BufferEncoding;
	flag?: string | number;
}
interface BrowserCommands {
	readFile: (path: string, options?: BufferEncoding | FsOptions) => Promise<string>;
	writeFile: (path: string, content: string, options?: BufferEncoding | (FsOptions & {
		mode?: number | string;
	})) => Promise<void>;
	removeFile: (path: string) => Promise<void>;
}
interface CDPSession {}
interface MarkOptions {
	/**
	* Optional stack string used to resolve marker location.
	* Useful for wrapper libraries that need to forward the end-user callsite.
	*/
	stack?: string;
	/**
	* Optional marker kind that's used to categorize the marker in the trace viewer.
	* @default 'mark'
	*/
	kind?: BrowserTraceEntryKind;
}

export { FileSpecification, publicCollect as collectTests, getSafeTimers, getType, loadDiffConfig, loadSnapshotSerializers, processError, setSafeTimers, setupCommonEnv, setupEnv, startCoverageInsideWorker, startTests, stopCoverageInsideWorker, takeCoverageInsideWorker };
export type { BrowserCommands, BrowserTraceEntryKind, CDPSession, FsOptions, MarkOptions };
