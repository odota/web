import { EvaluatedModules } from 'vite/module-runner';
import { F as FileSpecification, b as SerializedConfig, Y as Task, Z as CancelReason } from './config.d.B3YV4t0O.js';
import { a as RuntimeRPC, R as RunnerRPC, G as GetterTracker } from './rpc.d.3FOhdFx8.js';
import { E as Environment } from './environment.d.BFQtFKdZ.js';

//#region src/messages.d.ts
declare const TYPE_REQUEST: "q";
interface RpcRequest {
  /**
   * Type
   */
  t: typeof TYPE_REQUEST;
  /**
   * ID
   */
  i?: string;
  /**
   * Method
   */
  m: string;
  /**
   * Arguments
   */
  a: any[];
  /**
   * Optional
   */
  o?: boolean;
}
//#endregion
//#region src/utils.d.ts
type ArgumentsType<T> = T extends ((...args: infer A) => any) ? A : never;
type ReturnType<T> = T extends ((...args: any) => infer R) ? R : never;
type Thenable<T> = T | PromiseLike<T>;
//#endregion
//#region src/main.d.ts
type PromisifyFn<T> = ReturnType<T> extends Promise<any> ? T : (...args: ArgumentsType<T>) => Promise<Awaited<ReturnType<T>>>;
type BirpcResolver<This> = (this: This, name: string, resolved: (...args: unknown[]) => unknown) => Thenable<((...args: any[]) => any) | undefined>;
interface ChannelOptions {
  /**
   * Function to post raw message
   */
  post: (data: any, ...extras: any[]) => Thenable<any>;
  /**
   * Listener to receive raw message
   */
  on: (fn: (data: any, ...extras: any[]) => void) => Thenable<any>;
  /**
   * Clear the listener when `$close` is called
   */
  off?: (fn: (data: any, ...extras: any[]) => void) => Thenable<any>;
  /**
   * Custom function to serialize data
   *
   * by default it passes the data as-is
   */
  serialize?: (data: any) => any;
  /**
   * Custom function to deserialize data
   *
   * by default it passes the data as-is
   */
  deserialize?: (data: any) => any;
  /**
   * Call the methods with the RPC context or the original functions object
   */
  bind?: 'rpc' | 'functions';
  /**
   * Custom meta data to attached to the RPC instance's `$meta` property
   */
  meta?: any;
}
interface EventOptions<RemoteFunctions extends object = Record<string, unknown>, LocalFunctions extends object = Record<string, unknown>, Proxify extends boolean = true> {
  /**
   * Names of remote functions that do not need response.
   */
  eventNames?: (keyof RemoteFunctions)[];
  /**
   * Maximum timeout for waiting for response, in milliseconds.
   *
   * @default 60_000
   */
  timeout?: number;
  /**
   * Whether to proxy the remote functions.
   *
   * When `proxify` is false, calling the remote function
   * with `rpc.$call('method', ...args)` instead of `rpc.method(...args)`
   * explicitly is required.
   *
   * @default true
   */
  proxify?: Proxify;
  /**
   * Custom resolver to resolve function to be called
   *
   * For advanced use cases only
   */
  resolver?: BirpcResolver<BirpcReturn<RemoteFunctions, LocalFunctions, Proxify>>;
  /**
   * Hook triggered before an event is sent to the remote
   *
   * @param req - Request parameters
   * @param next - Function to continue the request
   * @param resolve - Function to resolve the response directly
   */
  onRequest?: (this: BirpcReturn<RemoteFunctions, LocalFunctions, Proxify>, req: RpcRequest, next: (req?: RpcRequest) => Promise<any>, resolve: (res: any) => void) => void | Promise<void>;
  /**
   * Custom error handler for errors occurred in local functions being called
   *
   * @returns `true` to prevent the error from being thrown
   */
  onFunctionError?: (this: BirpcReturn<RemoteFunctions, LocalFunctions, Proxify>, error: Error, functionName: string, args: any[]) => boolean | void;
  /**
   * Custom error handler for errors occurred during serialization or messsaging
   *
   * @returns `true` to prevent the error from being thrown
   */
  onGeneralError?: (this: BirpcReturn<RemoteFunctions, LocalFunctions, Proxify>, error: Error, functionName?: string, args?: any[]) => boolean | void;
  /**
   * Custom error handler for timeouts
   *
   * @returns `true` to prevent the error from being thrown
   */
  onTimeoutError?: (this: BirpcReturn<RemoteFunctions, LocalFunctions, Proxify>, functionName: string, args: any[]) => boolean | void;
}
type BirpcOptions<RemoteFunctions extends object = Record<string, unknown>, LocalFunctions extends object = Record<string, unknown>, Proxify extends boolean = true> = EventOptions<RemoteFunctions, LocalFunctions, Proxify> & ChannelOptions;
type BirpcFn<T> = PromisifyFn<T> & {
  /**
   * Send event without asking for response
   */
  asEvent: (...args: ArgumentsType<T>) => Promise<void>;
};
interface BirpcReturnBuiltin<RemoteFunctions, LocalFunctions = Record<string, unknown>> {
  /**
   * Raw functions object
   */
  $functions: LocalFunctions;
  /**
   * Whether the RPC is closed
   */
  readonly $closed: boolean;
  /**
   * Custom meta data attached to the RPC instance
   */
  readonly $meta: any;
  /**
   * Close the RPC connection
   */
  $close: (error?: Error) => void;
  /**
   * Reject pending calls
   */
  $rejectPendingCalls: (handler?: PendingCallHandler) => Promise<void>[];
  /**
   * Call the remote function and wait for the result.
   * An alternative to directly calling the function
   */
  $call: <K extends keyof RemoteFunctions>(method: K, ...args: ArgumentsType<RemoteFunctions[K]>) => Promise<Awaited<ReturnType<RemoteFunctions[K]>>>;
  /**
   * Same as `$call`, but returns `undefined` if the function is not defined on the remote side.
   */
  $callOptional: <K extends keyof RemoteFunctions>(method: K, ...args: ArgumentsType<RemoteFunctions[K]>) => Promise<Awaited<ReturnType<RemoteFunctions[K]> | undefined>>;
  /**
   * Send event without asking for response
   */
  $callEvent: <K extends keyof RemoteFunctions>(method: K, ...args: ArgumentsType<RemoteFunctions[K]>) => Promise<void>;
  /**
   * Call the remote function with the raw options.
   */
  $callRaw: (options: {
    method: string;
    args: unknown[];
    event?: boolean;
    optional?: boolean;
  }) => Promise<Awaited<ReturnType<any>>[]>;
}
type ProxifiedRemoteFunctions<RemoteFunctions extends object = Record<string, unknown>> = { [K in keyof RemoteFunctions]: BirpcFn<RemoteFunctions[K]>; };
type BirpcReturn<RemoteFunctions extends object = Record<string, unknown>, LocalFunctions extends object = Record<string, unknown>, Proxify extends boolean = true> = Proxify extends true ? ProxifiedRemoteFunctions<RemoteFunctions> & BirpcReturnBuiltin<RemoteFunctions, LocalFunctions> : BirpcReturnBuiltin<RemoteFunctions, LocalFunctions>;
type PendingCallHandler = (options: Pick<PromiseEntry, 'method' | 'reject'>) => void | Promise<void>;
interface PromiseEntry {
  resolve: (arg: any) => void;
  reject: (error: any) => void;
  method: string;
  timeoutId?: ReturnType<typeof setTimeout>;
}
declare const setTimeout: any;

type WorkerRPC = BirpcReturn<RuntimeRPC, RunnerRPC>;
interface ContextTestEnvironment {
	name: string;
	options: Record<string, any> | null;
}
interface WorkerTestEnvironment {
	name: string;
	options: Record<string, any> | null;
}
type TestExecutionMethod = "run" | "collect";
interface WorkerExecuteContext {
	files: FileSpecification[];
	providedContext: Record<string, any>;
	invalidates?: string[];
	environment: ContextTestEnvironment;
	/** Exposed to test runner as `VITEST_WORKER_ID`. Value is unique per each isolated worker. */
	workerId: number;
}
interface MetaEnv {
	[key: string]: any;
	BASE_URL: string;
	MODE: string;
	DEV: boolean;
	PROD: boolean;
	SSR: boolean;
}
interface ContextRPC {
	pool: string;
	config: SerializedConfig;
	projectName: string;
	environment: WorkerTestEnvironment;
	rpc: WorkerRPC;
	metaEnv: MetaEnv;
	files: FileSpecification[];
	providedContext: Record<string, any>;
	invalidates?: string[];
	/** Exposed to test runner as `VITEST_WORKER_ID`. Value is unique per each isolated worker. */
	workerId: number;
	concurrencyId: number;
}
interface WorkerSetupContext {
	environment: WorkerTestEnvironment;
	pool: string;
	config: SerializedConfig;
	projectName: string;
	rpc: WorkerRPC;
	metaEnv: MetaEnv;
}
interface WorkerGlobalState {
	ctx: ContextRPC;
	config: SerializedConfig;
	rpc: WorkerRPC;
	current?: Task;
	filepath?: string;
	metaEnv: MetaEnv;
	metaDefines?: Record<string, any>;
	environment: Environment;
	evaluatedModules: EvaluatedModules;
	resolvingModules: Set<string>;
	moduleExecutionInfo: Map<string, any>;
	/**
	* Module ids and file paths loaded by the current test file. Only set when
	* `experimental.recordDependencies` is enabled.
	*/
	dependencies?: Set<string>;
	getterTracker?: GetterTracker;
	onCancel: (listener: (reason: CancelReason) => unknown) => () => void;
	onCleanup: (listener: () => unknown) => void;
	providedContext: Record<string, any>;
	durations: {
		environment: number;
		prepare: number;
		/**
		* Wall time the worker spent blocked on module fetch requests to the
		* server, measured as the union of in-flight intervals.
		*/
		fetch: number;
	};
	onFilterStackTrace?: (trace: string) => string;
}

export type { BirpcReturn as B, ContextRPC as C, TestExecutionMethod as T, WorkerGlobalState as W, ContextTestEnvironment as a, WorkerExecuteContext as b, WorkerTestEnvironment as c, WorkerSetupContext as d, BirpcOptions as e };
