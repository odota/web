import { ModuleMockerInterceptor, ModuleMockerCompilerHints, ModuleMocker } from './browser.js';
import '@vitest/spy';
import './registry.d-xLx_FoyF.js';
import './index.d-D4wtotQw.js';

declare function registerModuleMocker(interceptor: (accessor: string) => ModuleMockerInterceptor): ModuleMockerCompilerHints;
declare function registerNativeFactoryResolver(mocker: ModuleMocker): void;

export { registerModuleMocker, registerNativeFactoryResolver };
