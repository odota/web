import { T as TestError, P as ParsedStack } from './config.d.B3YV4t0O.js';

interface RuntimeCoverageModuleLoader {
	import: (id: string) => Promise<{
		default: RuntimeCoverageProviderModule;
	}>;
	isBrowser?: boolean;
	moduleExecutionInfo?: Map<string, {
		startOffset: number;
	}>;
}
interface RuntimeCoverageProviderModule {
	/**
	* Factory for creating a new coverage provider
	*/
	getProvider: () => any;
	/**
	* Executed before tests are run in the worker thread.
	*/
	startCoverage?: (runtimeOptions: {
		isolate: boolean;
		/** @internal */
		autoAttachSubprocess: boolean;
		/** @internal */
		reportsDirectory: string;
	}) => unknown | Promise<unknown>;
	/**
	* Executed on after each run in the worker thread. Possible to return a payload passed to the provider
	*/
	takeCoverage?: (runtimeOptions?: {
		moduleExecutionInfo?: Map<string, {
			startOffset: number;
		}>;
		coverageFilesDirectory: string;
	}) => unknown | Promise<unknown>;
	/**
	* Executed after all tests have been run in the worker thread.
	*/
	stopCoverage?: (runtimeOptions: {
		isolate: boolean;
	}) => unknown | Promise<unknown>;
}

type OriginalMapping = {
    source: string | null;
    line: number;
    column: number;
    name: string | null;
};

interface StackTraceParserOptions {
	ignoreStackEntries?: (RegExp | string)[];
	getSourceMap?: (file: string) => unknown;
	getUrlId?: (id: string) => string;
	frameFilter?: (error: TestError, frame: ParsedStack) => boolean | void;
	firstOnly?: boolean;
}
interface SourceMapLike {
	version: number;
	mappings?: string;
	names?: string[];
	sources?: string[];
	sourcesContent?: string[];
	sourceRoot?: string;
}
interface Needle {
	line: number;
	column: number;
}
declare class DecodedMap {
	map: SourceMapLike;
	_encoded: string;
	_decoded: undefined | number[][][];
	_decodedMemo: Stats;
	url: string;
	version: number;
	names: string[];
	resolvedSources: string[];
	constructor(map: SourceMapLike, from: string);
}
interface Stats {
	lastKey: number;
	lastNeedle: number;
	lastIndex: number;
}
declare function getOriginalPosition(map: DecodedMap, needle: Needle): OriginalMapping | null;

export { DecodedMap as D, getOriginalPosition as g };
export type { RuntimeCoverageModuleLoader as R, StackTraceParserOptions as S, RuntimeCoverageProviderModule as a };
