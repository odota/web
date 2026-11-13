import { EvaluatedModules } from 'vite/module-runner';
import { d as dirname, r as resolve } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { a as getSafeTimers } from './source-map.DakdQc29.js';
import { c as createBirpc } from './index.DmDMHCg8.js';
import { g as getWorkerState } from './utils.DYj33du9.js';

// TODO: this is not needed in Vite 7.2+
class VitestEvaluatedModules extends EvaluatedModules {
	getModuleSourceMapById(id) {
		/** the return type is not exposed by Vite */
		const map = super.getModuleSourceMapById(id);
		if (map != null && !("_patched" in map)) {
			map._patched = true;
			const dir = dirname(map.url);
			map.resolvedSources = (map.map.sources || []).map((s) => resolve(dir, s || ""));
		}
		return map;
	}
}

const { get } = Reflect;
const globalProcess = globalThis.process;
function withSafeTimers(fn) {
	const { setTimeout, clearTimeout, nextTick, setImmediate, clearImmediate } = getSafeTimers();
	const currentSetTimeout = globalThis.setTimeout;
	const currentClearTimeout = globalThis.clearTimeout;
	const currentSetImmediate = globalThis.setImmediate;
	const currentClearImmediate = globalThis.clearImmediate;
	const currentNextTick = globalProcess?.nextTick;
	try {
		globalThis.setTimeout = setTimeout;
		globalThis.clearTimeout = clearTimeout;
		if (setImmediate) globalThis.setImmediate = setImmediate;
		if (clearImmediate) globalThis.clearImmediate = clearImmediate;
		if (globalProcess && nextTick) globalProcess.nextTick = nextTick;
		return fn();
	} finally {
		globalThis.setTimeout = currentSetTimeout;
		globalThis.clearTimeout = currentClearTimeout;
		globalThis.setImmediate = currentSetImmediate;
		globalThis.clearImmediate = currentClearImmediate;
		if (globalProcess && nextTick) nextTick(() => {
			globalProcess.nextTick = currentNextTick;
		});
	}
}
const promises = /* @__PURE__ */ new Set();
async function rpcDone() {
	if (!promises.size) return;
	const awaitable = Array.from(promises);
	return Promise.all(awaitable);
}
const onCancelCallbacks = [];
function onCancel(callback) {
	onCancelCallbacks.push(callback);
	return () => {
		const index = onCancelCallbacks.indexOf(callback);
		if (index !== -1) onCancelCallbacks.splice(index, 1);
	};
}
function createRuntimeRpc(options) {
	return createSafeRpc(createBirpc({ async onCancel(reason) {
		await Promise.all(onCancelCallbacks.map((fn) => fn(reason)));
	} }, {
		eventNames: ["onCancel"],
		timeout: -1,
		...options
	}));
}
function createSafeRpc(rpc) {
	return new Proxy(rpc, { get(target, p, handler) {
		// keep $rejectPendingCalls as sync function
		if (p === "$rejectPendingCalls") return rpc.$rejectPendingCalls;
		const sendCall = get(target, p, handler);
		const safeSendCall = (...args) => withSafeTimers(async () => {
			const result = sendCall(...args);
			promises.add(result);
			try {
				return await result;
			} finally {
				promises.delete(result);
			}
		});
		safeSendCall.asEvent = sendCall.asEvent;
		return safeSendCall;
	} });
}
function rpc() {
	const { rpc } = getWorkerState();
	return rpc;
}

export { VitestEvaluatedModules as V, rpcDone as a, createRuntimeRpc as c, onCancel as o, rpc as r };
