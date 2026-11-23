import { w as workerInit } from '../chunks/init-threads.ZX_Vov0z.js';
import { s as setupVmWorker, r as runVmTests } from '../chunks/vm.b4MbCAJQ.js';
import 'node:worker_threads';
import '../chunks/init.CO4AB7HZ.js';
import 'node:fs';
import 'node:module';
import 'node:url';
import 'vite/module-runner';
import '../chunks/index.Bi0NXYPf.js';
import '../chunks/pathe.M-eThtNZ.zq3TM4NT.js';
import '../chunks/modules.BJuCwlRJ.js';
import '../chunks/utils.DYj33du9.js';
import '../path.js';
import 'node:path';
import '../module-evaluator.js';
import 'node:vm';
import '../traces.js';
import 'node:async_hooks';
import '@vitest/mocker';
import '@vitest/mocker/redirect';
import 'node:console';
import '../chunks/source-map.DakdQc29.js';
import '../chunks/index.D0heQG4v.js';
import '../chunks/tinyrainbow.Do8I1XRG.js';
import '../chunks/rpc.Uhkwr2NM.js';
import '../chunks/index.DmDMHCg8.js';
import '../chunks/inspector.CvyFGlXm.js';
import 'node:v8';
import '../chunks/console.CQZ877Hi.js';
import 'node:stream';
import '../chunks/resolver.BzpmeQeT.js';
import 'es-module-lexer';
import '../chunks/setup-common.CqAQCXzx.js';
import '../chunks/plugins.DPQHVT0p.js';

workerInit({
	runTests: runVmTests,
	setup: setupVmWorker
});
