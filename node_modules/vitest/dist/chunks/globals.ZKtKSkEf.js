import { g as globalApis } from './constants.DLYM6cZY.js';
import { i as index } from './index.CZzC1gGg.js';
import './run.CjdgFZiW.js';
import './index.D0heQG4v.js';
import './tinyrainbow.Do8I1XRG.js';
import './display.BlTmubjj.js';
import './pathe.M-eThtNZ.zq3TM4NT.js';
import './source-map.DakdQc29.js';
import '../task-utils.js';
import './utils.DYj33du9.js';
import './spy.DDMXghXv.js';
import 'chai';
import './plugins.DPQHVT0p.js';
import './rawSnapshot.DqSiqIEx.js';
import './offset.Dy-5Fdfn.js';
import './rpc.Uhkwr2NM.js';
import 'vite/module-runner';
import './index.DmDMHCg8.js';
import 'tinybench';
import 'expect-type';

function registerApiGlobally() {
	globalApis.forEach((api) => {
		// @ts-expect-error I know what I am doing :P
		globalThis[api] = index[api];
	});
}

export { registerApiGlobally };
