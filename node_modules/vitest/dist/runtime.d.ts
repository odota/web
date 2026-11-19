import { E as Environment } from './chunks/environment.d.BFQtFKdZ.js';
export { a as EnvironmentReturn, V as VmEnvironmentReturn } from './chunks/environment.d.BFQtFKdZ.js';
import { bu as SnapshotEnvironment, bv as SnapshotEnvironmentOptions } from './chunks/config.d.B3YV4t0O.js';
export { b as SerializedConfig, V as VitestRunner } from './chunks/config.d.B3YV4t0O.js';
import 'vitest/optional-runtime-types.js';
import 'tinybench';

declare const environments: {
	node: Environment;
	jsdom: Environment;
	"happy-dom": Environment;
	"edge-runtime": Environment;
};

interface PopulateOptions {
	bindFunctions?: boolean;
	additionalKeys?: string[];
}
declare function populateGlobal(global: any, win: any, options?: PopulateOptions): {
	keys: Set<string>;
	skipKeys: string[];
	originals: Map<string | symbol, PropertyDescriptor>;
};

declare class NodeSnapshotEnvironment implements SnapshotEnvironment {
	private options;
	constructor(options?: SnapshotEnvironmentOptions);
	getVersion(): string;
	getHeader(): string;
	resolveRawPath(testPath: string, rawPath: string): Promise<string>;
	resolvePath(filepath: string): Promise<string>;
	prepareDirectory(dirPath: string): Promise<void>;
	saveSnapshotFile(filepath: string, snapshot: string): Promise<void>;
	readSnapshotFile(filepath: string): Promise<string | null>;
	removeSnapshotFile(filepath: string): Promise<void>;
}

declare class VitestNodeSnapshotEnvironment extends NodeSnapshotEnvironment {
	getHeader(): string;
	resolvePath(filepath: string): Promise<string>;
}

export { Environment, SnapshotEnvironment, VitestNodeSnapshotEnvironment as VitestSnapshotEnvironment, environments as builtinEnvironments, populateGlobal };
