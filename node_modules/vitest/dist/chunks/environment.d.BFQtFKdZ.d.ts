import { A as Awaitable } from './config.d.B3YV4t0O.js';

interface EnvironmentReturn {
	teardown: (global: any) => Awaitable<void>;
}
interface VmEnvironmentReturn {
	getVmContext: () => {
		[key: string]: any;
	};
	teardown: () => Awaitable<void>;
}
interface Environment {
	name: string;
	/**
	* @deprecated use `viteEnvironment` instead. Uses `name` by default
	*/
	transformMode?: "web" | "ssr";
	/**
	* Environment initiated by the Vite server. It is usually available
	* as `vite.server.environments.${name}`.
	*
	* By default, fallbacks to `name`.
	*/
	viteEnvironment?: "client" | "ssr" | ({} & string);
	/**
	* Let the server transform the test file's import graph while `setupVM`
	* runs. Only worth it when `setupVM` is slow (jsdom, happy-dom): otherwise
	* the transforms compete with the worker's own module requests.
	*
	* @default `true`
	*/
	prewarmModules?: boolean;
	setupVM?: (options: Record<string, any>) => Awaitable<VmEnvironmentReturn>;
	setup: (global: any, options: Record<string, any>) => Awaitable<EnvironmentReturn>;
}

export type { Environment as E, VmEnvironmentReturn as V, EnvironmentReturn as a };
