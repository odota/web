import { HookHandler, UserConfig, ConfigEnv } from 'vite';
export { ConfigEnv, Plugin, UserConfig as ViteUserConfig, mergeConfig } from 'vite';
import { F as FieldsWithDefaultValues, U as UserWorkspaceConfig, a as UserProjectConfigFn, b as UserProjectConfigExport } from './chunks/plugin.d.LRFSN46m.js';
import { InlineConfig, ResolvedConfig, VitestPluginContext, CoverageOptions } from './node.js';
export { T as TestProjectConfiguration, c as TestProjectInlineConfiguration, d as TestUserConfig, W as WatcherTriggerPattern } from './chunks/plugin.d.LRFSN46m.js';
import { FakeTimersConfig } from './index.js';
export { g as TestTagDefinition } from './chunks/config.d.B3YV4t0O.js';
import 'node:stream';
import './chunks/browser.d.C7tWgUvw.js';
import './chunks/rpc.d.3FOhdFx8.js';
import 'vite/module-runner';
import './chunks/worker.d.CyJRpyfZ.js';
import './chunks/environment.d.BFQtFKdZ.js';
import 'chai';
import 'vitest/optional-types.js';
import '@vitest/mocker';
import './chunks/source-map.d.BkG8YK_3.js';
import 'vitest/browser';
import 'node:path';
import 'node:console';
import 'node:fs/promises';
import 'vitest/optional-runtime-types.js';
import 'tinybench';

type VitestInlineConfig = InlineConfig;
type VitestResolvedConfig = ResolvedConfig;
declare module "vite" {
	interface UserConfig {
		/**
		* Options for Vitest
		*/
		test?: VitestInlineConfig;
	}
	interface ResolvedConfig {
		/**
		* Options for Vitest
		*/
		test: VitestResolvedConfig;
	}
	interface Plugin<A = any> {
		configureVitest?: HookHandler<(context: VitestPluginContext) => void>;
	}
}

declare const defaultBrowserPort = 23315;

declare const defaultInclude: string[];
declare const defaultExclude: string[];
declare const coverageConfigDefaults: Required<Pick<CoverageOptions, FieldsWithDefaultValues>>;
declare const configDefaults: Readonly<{
	allowOnly: boolean;
	isolate: boolean;
	watch: boolean;
	globals: boolean;
	injectCjsGlobals: boolean;
	environment: "node";
	clearMocks: boolean;
	restoreMocks: boolean;
	mockReset: boolean;
	unstubGlobals: boolean;
	unstubEnvs: boolean;
	include: string[];
	exclude: string[];
	teardownTimeout: number;
	forceRerunTriggers: string[];
	update: boolean;
	reporters: string[];
	silent: boolean;
	hideSkippedTests: boolean;
	api: boolean;
	ui: boolean;
	uiBase: string;
	open: boolean;
	css: {
		include: never[];
	};
	coverage: CoverageOptions;
	fakeTimers: FakeTimersConfig;
	maxConcurrency: number;
	dangerouslyIgnoreUnhandledErrors: boolean;
	typecheck: {
		checker: "tsc";
		include: string[];
		exclude: string[];
	};
	slowTestThreshold: number;
	taskTitleValueFormatTruncate: number;
	disableConsoleIntercept: boolean;
	detectAsyncLeaks: boolean;
}>;

type ViteUserConfigFnObject = (env: ConfigEnv) => UserConfig;
type ViteUserConfigFnPromise = (env: ConfigEnv) => Promise<UserConfig>;
type ViteUserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>;
type ViteUserConfigExport = UserConfig | Promise<UserConfig> | ViteUserConfigFnObject | ViteUserConfigFnPromise | ViteUserConfigFn;
declare function defineConfig(config: UserConfig): UserConfig;
declare function defineConfig(config: Promise<UserConfig>): Promise<UserConfig>;
declare function defineConfig(config: ViteUserConfigFnObject): ViteUserConfigFnObject;
declare function defineConfig(config: ViteUserConfigFnPromise): ViteUserConfigFnPromise;
declare function defineConfig(config: ViteUserConfigExport): ViteUserConfigExport;
declare function defineProject(config: UserWorkspaceConfig): UserWorkspaceConfig;
declare function defineProject(config: Promise<UserWorkspaceConfig>): Promise<UserWorkspaceConfig>;
declare function defineProject(config: UserProjectConfigFn): UserProjectConfigFn;
declare function defineProject(config: UserProjectConfigExport): UserProjectConfigExport;

export { UserProjectConfigExport, UserProjectConfigFn, UserWorkspaceConfig, configDefaults, coverageConfigDefaults, defaultBrowserPort, defaultExclude, defaultInclude, defineConfig, defineProject };
export type { ViteUserConfigExport, ViteUserConfigFn, ViteUserConfigFnObject, ViteUserConfigFnPromise };
