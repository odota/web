import { d as WorkerSetupContext, e as BirpcOptions } from './chunks/worker.d.CyJRpyfZ.js';
import { WorkerGlobalState } from './index.js';
import { T as Traces } from './chunks/rpc.d.3FOhdFx8.js';
import { RuntimeRPC } from './index.js';
import { A as Awaitable } from './chunks/config.d.B3YV4t0O.js';
import { ModuleRunner } from 'vite/module-runner';
import './chunks/environment.d.BFQtFKdZ.js';
import 'vitest/optional-runtime-types.js';
import 'tinybench';

/** @experimental */
declare function setupBaseEnvironment(context: WorkerSetupContext): Promise<() => Promise<void>>;
/** @experimental */
declare function runBaseTests(method: "run" | "collect", state: WorkerGlobalState, traces: Traces): Promise<void>;

type WorkerRpcOptions = Pick<BirpcOptions<RuntimeRPC>, "on" | "off" | "post" | "serialize" | "deserialize">;
interface VitestWorker extends WorkerRpcOptions {
	runTests: (state: WorkerGlobalState, traces: Traces) => Awaitable<unknown>;
	collectTests: (state: WorkerGlobalState, traces: Traces) => Awaitable<unknown>;
	onModuleRunner?: (moduleRunner: ModuleRunner) => Awaitable<unknown>;
	setup?: (context: WorkerSetupContext) => void | Promise<() => Promise<unknown>>;
}

interface Options extends VitestWorker {
	teardown?: () => void;
}
/** @experimental */
declare function init(worker: Options): void;

export { init, runBaseTests, setupBaseEnvironment as setupEnvironment };
