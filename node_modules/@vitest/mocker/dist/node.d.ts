import { H as HoistMocksOptions } from './hoistMocks.d-D_olmqhK.js';
export { S as StaticMockCall, c as createManualModuleSource } from './hoistMocks.d-D_olmqhK.js';
import { AutomockOptions } from './automock.js';
export { automockModule } from './automock.js';
import { Plugin, Environment, Rollup, DevEnvironment, ViteDevServer } from 'vite';
import { SourceMap } from 'magic-string';
import { MockerRegistry, ServerMockResolution, ServerIdResolution } from './index.js';
export { findMockRedirect } from './redirect.js';

declare function automockPlugin(options?: AutomockOptions): Plugin;

interface DynamicImportPluginOptions {
	/**
	* @default `"__vitest_mocker__"`
	*/
	globalThisAccessor?: string;
	filter?: (id: string, environment: Environment) => boolean;
}
declare function dynamicImportPlugin(options?: DynamicImportPluginOptions): Plugin;

interface HoistMocksPluginOptions extends Omit<HoistMocksOptions, "regexpHoistable"> {
	include?: string | RegExp | (string | RegExp)[];
	exclude?: string | RegExp | (string | RegExp)[];
	/**
	* overrides include/exclude options
	*/
	filter?: (id: string) => boolean;
}
declare function hoistMocksPlugin(options?: HoistMocksPluginOptions): Plugin;
declare function hoistMockAndResolve(code: string, id: string, parse: Rollup.PluginContext["parse"], options?: HoistMocksOptions): HoistMocksResult | undefined;
interface HoistMocksResult {
	code: string;
	map: SourceMap;
}

interface InterceptorPluginOptions {
	/**
	* @default "__vitest_mocker__"
	*/
	globalThisAccessor?: string;
	registry?: MockerRegistry;
	/**
	* Register the `vitest:interceptor:*` WebSocket events in `configureServer`.
	* Disable this when mocks are registered through another authenticated
	* channel and the raw dev-server socket should not accept them.
	* @default true
	*/
	registerWebSocketEvents?: boolean;
}
declare function interceptorPlugin(options?: InterceptorPluginOptions): Plugin;

interface ManualMockPluginOptions {
	/**
	* @default "__vitest_mocker__"
	*/
	globalThisAccessor?: string;
	/**
	* Export names for a factory mock whose original module cannot be transformed,
	* read from the factory result of the last registered mock.
	*/
	resolveFactoryExports?: (url: string) => Promise<string[]>;
}
declare function getManualMockId(url: string, moduleId: string): string;
declare function getManualMockUrl(url: string, moduleId: string): string;
declare function manualMockPlugin(options?: ManualMockPluginOptions): Plugin;
declare function collectEnvironmentExports(environment: DevEnvironment, moduleId: string, seen?: Set<string>): Promise<string[]>;

interface MockerPluginOptions extends AutomockOptions {
	hoistMocks?: HoistMocksPluginOptions;
}
declare function mockerPlugin(options?: MockerPluginOptions): Plugin[];

interface ServerResolverOptions {
	/**
	* @default ['/node_modules/']
	*/
	moduleDirectories?: string[];
}
declare class ServerMockResolver {
	private server;
	private options;
	constructor(server: ViteDevServer, options?: ServerResolverOptions);
	resolveMock(rawId: string, importer: string, options: {
		mock: "spy" | "factory" | "auto";
	}): Promise<ServerMockResolution>;
	invalidate(ids: string[]): void;
	resolveId(id: string, importer?: string): Promise<ServerIdResolution | null>;
	private normalizeResolveIdToUrl;
	private resolveMockId;
	private resolveModule;
}

export { AutomockOptions as AutomockPluginOptions, HoistMocksOptions, ServerMockResolver, automockPlugin, collectEnvironmentExports, dynamicImportPlugin, getManualMockId, getManualMockUrl, hoistMockAndResolve as hoistMocks, hoistMocksPlugin, interceptorPlugin, manualMockPlugin, mockerPlugin };
export type { HoistMocksPluginOptions, HoistMocksResult, InterceptorPluginOptions, ManualMockPluginOptions, ServerResolverOptions };
