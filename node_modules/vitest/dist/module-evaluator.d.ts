import { ModuleEvaluator, ModuleRunnerImportMeta, ModuleRunnerContext, EvaluatedModuleNode } from 'vite/module-runner';
import { G as GetterTracker } from './chunks/rpc.d.3FOhdFx8.js';
import { RuntimeRPC } from './index.js';
import { EvaluatedModules as VitestEvaluatedModules } from './index.js';
import vm from 'node:vm';
import './chunks/config.d.B3YV4t0O.js';
import 'vitest/optional-runtime-types.js';
import 'tinybench';

type ModuleExecutionInfo = Map<string, ModuleExecutionInfoEntry>;
interface ModuleExecutionInfoEntry {
	startOffset: number;
	/** The duration that was spent executing the module. */
	duration: number;
	/** The time that was spent executing the module itself and externalized imports. */
	selfTime: number;
	external?: boolean;
	importer?: string;
}

/**
* Worker-wide cache of V8 code cache buffers for externalized modules.
*
* vm pools create a fresh executor per test file, so every externalized
* module is compiled and evaluated again in each fresh context. The compiled
* code has no per-context state — reusing its V8 code cache skips the
* re-parse/re-compile while the evaluation still happens per context.
*
* Entries are keyed by the module identifier and guarded by the exact source
* text, so an invalidated module that produces different code simply replaces
* its entry.
*/
declare class CodeCache {
	private entries;
	get(identifier: string, source: string): Buffer | undefined;
	/**
	* Stores the code cache produced by `produce` unless an entry for the same
	* source already exists. A `produce` failure is recorded as an empty entry,
	* so it is not retried on every fresh context.
	*/
	store(identifier: string, source: string, produce: () => Buffer): void;
	delete(identifier: string): void;
	clear(): void;
}

declare class FileMap {
	private fsCache;
	private fsBufferCache;
	readFileAsync(path: string): Promise<string>;
	readFile(path: string): string;
	readBuffer(path: string): Buffer<ArrayBuffer>;
}

interface ModuleEvaluateOptions {
	timeout?: vm.RunningScriptOptions["timeout"] | undefined;
	breakOnSigint?: vm.RunningScriptOptions["breakOnSigint"] | undefined;
}
type ModuleLinker = (specifier: string, referencingModule: VMModule, extra: {
	assert: object;
}) => VMModule | Promise<VMModule>;
type ModuleStatus = "unlinked" | "linking" | "linked" | "evaluating" | "evaluated" | "errored";
declare class VMModule {
	dependencySpecifiers: readonly string[];
	error: any;
	identifier: string;
	context: vm.Context;
	namespace: object;
	status: ModuleStatus;
	evaluate(options?: ModuleEvaluateOptions): Promise<void>;
	link(linker: ModuleLinker): Promise<void>;
}

interface ExternalModulesExecutorOptions {
	context: vm.Context;
	fileMap: FileMap;
	codeCache?: CodeCache;
	resolveCache?: Map<string, string>;
	moduleInfoCache?: Map<string, ModuleInformation>;
	packageCache: Map<string, any>;
	transform: RuntimeRPC["transform"];
	interopDefault?: boolean;
	viteClientModule: Record<string, unknown>;
}
interface ModuleInformation {
	type: "data" | "builtin" | "vite" | "wasm" | "module" | "commonjs" | "network";
	url: string;
	path: string;
	exists?: boolean;
}
type SyncModuleDisposition = {
	kind: "ready";
	module: VMModule;
} | {
	kind: "json";
	code: string;
} | {
	kind: "source";
	code: string;
};
declare class ExternalModulesExecutor {
	#private;
	private options;
	private cjs;
	private esm;
	private vite;
	private context;
	private fs;
	readonly codeCache: CodeCache | undefined;
	private resolvers;
	constructor(options: ExternalModulesExecutorOptions);
	syncBuiltinESMExports(): void;
	import(identifier: string): Promise<object>;
	require(identifier: string): any;
	createRequire(identifier: string): NodeJS.Require;
	private shouldRequireAsEsm;
	private requireEsm;
	resolveSyncSpecifier: (specifier: string, referencer: string) => string;
	materializeSyncModule: (identifier: string, forceEsmSource: boolean) => SyncModuleDisposition;
	importModuleDynamically: (specifier: string, referencer: VMModule) => Promise<VMModule>;
	resolveModule: (specifier: string, referencer: string) => Promise<VMModule>;
	resolve(specifier: string, parent: string): string;
	private getModuleInformation;
	private resolveModuleInformation;
	private assertModuleExists;
	private createModule;
	private get isNetworkSupported();
}

declare module "vite/module-runner" {
	interface EvaluatedModuleNode {
		/**
		* @internal
		*/
		mockedExports?: Record<string, any>;
	}
}

declare module "vite/module-runner" {
	interface EvaluatedModuleNode {
		/**
		* @internal
		*/
		mockedExports?: Record<string, any>;
	}
}

interface VitestVmOptions {
	context: vm.Context;
	externalModulesExecutor: ExternalModulesExecutor;
}

interface VitestModuleEvaluatorOptions {
	evaluatedModules?: VitestEvaluatedModules;
	metaEnv?: ModuleRunnerImportMeta["env"];
	interopDefault?: boolean | undefined;
	injectCjsGlobals?: boolean | undefined;
	moduleExecutionInfo?: ModuleExecutionInfo;
	getCurrentTestFilepath?: () => string | undefined;
	getEnvironmentName?: () => string;
	compiledFunctionArgumentsNames?: string[];
	compiledFunctionArgumentsValues?: unknown[];
	getterTracker?: GetterTracker;
}
declare class VitestModuleEvaluator implements ModuleEvaluator {
	private options;
	stubs: Record<string, any>;
	env: ModuleRunnerImportMeta["env"];
	private vm;
	private compiledFunctionArgumentsNames?;
	private compiledFunctionArgumentsValues;
	private getterTracker;
	static EXPORTS_MAX_INVOCATIONS: number;
	private primitives;
	private debug;
	private _otel;
	private _evaluatedModules?;
	constructor(vmOptions?: VitestVmOptions | undefined, options?: VitestModuleEvaluatorOptions);
	private convertIdToImportUrl;
	runExternalModule(id: string): Promise<any>;
	runInlinedModule(context: ModuleRunnerContext, code: string, module: Readonly<EvaluatedModuleNode>): Promise<any>;
	private _createCJSGlobals;
	private _runInlinedModule;
	private createRequire;
	private shouldInterop;
}
declare function createImportMetaEnvProxy(): ModuleRunnerImportMeta["env"];
declare function getDefaultRequestStubs(context?: vm.Context): Record<string, any>;
declare function isPrimitive(v: any): boolean;
declare function wrapId(id: string): string;
declare function unwrapId(id: string): string;

export { VitestModuleEvaluator, createImportMetaEnvProxy, getDefaultRequestStubs, isPrimitive, unwrapId, wrapId };
export type { VitestModuleEvaluatorOptions };
