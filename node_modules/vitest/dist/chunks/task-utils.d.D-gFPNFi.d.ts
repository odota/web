/// <reference types="chai" />
import { bq as SnapshotState, n as Test, br as PromisifyAssertion, bs as Tester, bt as Plugin, ae as BenchResult, a as File } from './config.d.B3YV4t0O.js';

interface SnapshotMatcher<
	R extends void | Promise<void>,
	T = unknown
> {
	<U extends { [P in keyof T]: any }>(snapshot: Partial<U>, hint?: string): R;
	(hint?: string): R;
}
interface InlineSnapshotMatcher<
	R extends void | Promise<void>,
	T = unknown
> {
	<U extends { [P in keyof T]: any }>(properties: Partial<U>, snapshot?: string, hint?: string): R;
	(hint?: string): R;
}
declare module "vitest" {
	interface MatcherState {
		environment: string;
		snapshotState: SnapshotState;
		task?: Readonly<Test>;
	}
	interface ExpectPollOptions {
		interval?: number;
		timeout?: number;
		message?: string;
	}
	interface ExpectStatic {
		assert: Chai.AssertStatic;
		unreachable: (message?: string) => never;
		soft: <T>(actual: T, message?: string) => Assertion<void, T>;
		poll: <T>(actual: (options: {
			signal: AbortSignal;
		}) => T, options?: ExpectPollOptions) => PromisifyAssertion<Awaited<T>>;
		addEqualityTesters: (testers: Array<Tester>) => void;
		assertions: (expected: number) => void;
		hasAssertions: () => void;
		addSnapshotSerializer: (plugin: Plugin) => void;
	}
	interface Assertion<
		R,
		T
	> {
		matchSnapshot: SnapshotMatcher<R, T>;
		toMatchSnapshot: SnapshotMatcher<R, T>;
		toMatchInlineSnapshot: InlineSnapshotMatcher<R, T>;
		/**
		* Checks that an error thrown by a function matches a previously recorded snapshot.
		*
		* @param hint - Optional custom error message.
		*
		* @example
		* expect(functionWithError).toThrowErrorMatchingSnapshot();
		*/
		toThrowErrorMatchingSnapshot: (hint?: string) => R;
		/**
		* Checks that an error thrown by a function matches an inline snapshot within the test file.
		* Useful for keeping snapshots close to the test code.
		*
		* @param snapshot - Optional inline snapshot string to match.
		* @param hint - Optional custom error message.
		*
		* @example
		* const throwError = () => { throw new Error('Error occurred') };
		* expect(throwError).toThrowErrorMatchingInlineSnapshot(`"Error occurred"`);
		*/
		toThrowErrorMatchingInlineSnapshot: (snapshot?: string, hint?: string) => R;
		/**
		* Compares the received value to a snapshot saved in a specified file.
		* Useful for cases where snapshot content is large or needs to be shared across tests.
		*
		* @param filepath - Path to the snapshot file.
		* @param hint - Optional custom error message.
		*
		* @example
		* await expect(largeData).toMatchFileSnapshot('path/to/snapshot.json');
		*/
		toMatchFileSnapshot: (filepath: string, hint?: string) => Promise<void>;
		/**
		* Asserts that a benchmark result is faster than another benchmark result.
		* Compares mean latency — lower is faster.
		*
		* @example
		* const result = await bench.compare(
		*   bench('lib1', () => { lib1() }),
		*   bench('lib2', () => { lib2() }),
		* )
		* expect(result.get('lib1')).toBeFasterThan(result.get('lib2'))
		* expect(result.get('lib1')).toBeFasterThan(result.get('lib2'), { delta: 0.1 })
		*/
		toBeFasterThan: (expected: BenchResult, options?: {
			delta?: number;
		}) => R;
		/**
		* Asserts that a benchmark result is slower than another benchmark result.
		* Compares mean latency — higher is slower.
		*
		* @example
		* const result = await bench.compare(
		*   bench('lib1', () => { lib1() }),
		*   bench('lib2', () => { lib2() }),
		* )
		* expect(result.get('lib2')).toBeSlowerThan(result.get('lib1'))
		* expect(result.get('lib2')).toBeSlowerThan(result.get('lib1'), { delta: 0.2 })
		*/
		toBeSlowerThan: (expected: BenchResult, options?: {
			delta?: number;
		}) => R;
		/**
		* Ensures a `vi.when` chain has been exhausted.
		*
		* A chain is exhausted when at least one `calledWith` with an associated action (`then*`) has been registered
		* and every registered behavior has been fully consumed. A chain with no registered
		* behaviors, or with `calledWith` entries that have no associated `then*` actions, is never considered exhausted.
		*
		* @see {@link https://vitest.dev/api/expect#tohavebeenexhausted}
		*
		* @example
		* const w = vi.when(spy).calledWith('hello').thenReturnOnce('HELLO')
		*
		* expect(w).not.toHaveBeenExhausted()
		*
		* expect(spy('hello')).toBe('HELLO')
		*
		* expect(w).toHaveBeenExhausted()
		*/
		toHaveBeenExhausted: () => R;
	}
}

interface HashMeta {
	typecheck?: boolean;
	__vitest_label__?: string;
}
declare function createFileTask(filepath: string, root: string, projectName: string | undefined, pool?: string, viteEnvironment?: string, meta?: HashMeta): File;
/**
* Generate a unique ID for a file based on its path and project name
* @param file File relative to the root of the project to keep ID the same between different machines
* @param projectName The name of the test project
*/
declare function generateFileHash(file: string, projectName: string | undefined, meta?: HashMeta): string;

export { createFileTask as c, generateFileHash as g };
