import { Console } from 'node:console';
import { relative } from 'node:path';
import { Writable } from 'node:stream';
import { a as getSafeTimers } from './source-map.DakdQc29.js';
import { $ } from './tinyrainbow.Do8I1XRG.js';
import { g as getWorkerState, E as EnvironmentTeardownError } from './utils.DYj33du9.js';
import './index.D0heQG4v.js';
import './pathe.M-eThtNZ.zq3TM4NT.js';

const RealDate = globalThis.Date;
const UNKNOWN_TEST_ID = "__vitest__unknown_test__";
function getTaskIdByStack(root) {
	const stack = (/* @__PURE__ */ new Error("STACK_TRACE_ERROR")).stack?.split("\n");
	if (!stack) return UNKNOWN_TEST_ID;
	const index = stack.findIndex((line) => line.includes("at Console.value"));
	const line = index === -1 ? null : stack[index + 2];
	if (!line) return UNKNOWN_TEST_ID;
	const filepath = line.match(/at\s(.*)\s?/)?.[1];
	if (filepath) return relative(root, filepath);
	return UNKNOWN_TEST_ID;
}
function createCustomConsole(defaultState) {
	const stdoutBuffer = /* @__PURE__ */ new Map();
	const stderrBuffer = /* @__PURE__ */ new Map();
	const timers = /* @__PURE__ */ new Map();
	const { queueMicrotask } = getSafeTimers();
	function queueCancelableMicrotask(callback) {
		let canceled = false;
		queueMicrotask(() => {
			if (!canceled) callback();
		});
		return () => {
			canceled = true;
		};
	}
	const state = () => defaultState || getWorkerState();
	// group sync console.log calls with micro task
	function schedule(taskId) {
		const timer = timers.get(taskId);
		const { stdoutTime, stderrTime } = timer;
		timer.cancel?.();
		timer.cancel = queueCancelableMicrotask(() => {
			if (stderrTime < stdoutTime) {
				sendStderr(taskId);
				sendStdout(taskId);
			} else {
				sendStdout(taskId);
				sendStderr(taskId);
			}
		});
	}
	function sendStdout(taskId) {
		sendBuffer("stdout", taskId);
	}
	function sendStderr(taskId) {
		sendBuffer("stderr", taskId);
	}
	function sendBuffer(type, taskId) {
		const buffers = type === "stdout" ? stdoutBuffer : stderrBuffer;
		const buffer = buffers.get(taskId);
		if (!buffer) return;
		if (state().config.printConsoleTrace) buffer.forEach(([buffer, origin]) => {
			sendLog(type, taskId, String(buffer), buffer.length, origin);
		});
		else sendLog(type, taskId, buffer.map((i) => String(i[0])).join(""), buffer.length);
		const timer = timers.get(taskId);
		buffers.delete(taskId);
		if (type === "stderr") timer.stderrTime = 0;
		else timer.stdoutTime = 0;
	}
	function sendLog(type, taskId, content, size, origin) {
		const timer = timers.get(taskId);
		const time = type === "stderr" ? timer.stderrTime : timer.stdoutTime;
		state().rpc.onUserConsoleLog({
			type,
			content: content || "<empty line>",
			taskId,
			time: time || RealDate.now(),
			size,
			origin
		}).catch((error) => {
			// the log is already sent, the worker only closed before the reporter answered
			if (!(error instanceof EnvironmentTeardownError)) throw error;
		});
	}
	const stdout = new Writable({ write(data, encoding, callback) {
		const s = state();
		const id = s?.current?.id || s?.current?.suite?.id || s.current?.file.id || getTaskIdByStack(s.config.root);
		let timer = timers.get(id);
		if (timer) timer.stdoutTime = timer.stdoutTime || RealDate.now();
		else {
			timer = {
				stdoutTime: RealDate.now(),
				stderrTime: 0
			};
			timers.set(id, timer);
		}
		let buffer = stdoutBuffer.get(id);
		if (!buffer) {
			buffer = [];
			stdoutBuffer.set(id, buffer);
		}
		if (state().config.printConsoleTrace) {
			const limit = Error.stackTraceLimit;
			Error.stackTraceLimit = limit + 6;
			const trace = (/* @__PURE__ */ new Error("STACK_TRACE")).stack?.split("\n").slice(7).join("\n");
			Error.stackTraceLimit = limit;
			buffer.push([data, trace]);
		} else buffer.push([data, void 0]);
		schedule(id);
		callback();
	} });
	const stderr = new Writable({ write(data, encoding, callback) {
		const s = state();
		const id = s?.current?.id || s?.current?.suite?.id || s.current?.file.id || getTaskIdByStack(s.config.root);
		let timer = timers.get(id);
		if (timer) timer.stderrTime = timer.stderrTime || RealDate.now();
		else {
			timer = {
				stderrTime: RealDate.now(),
				stdoutTime: 0
			};
			timers.set(id, timer);
		}
		let buffer = stderrBuffer.get(id);
		if (!buffer) {
			buffer = [];
			stderrBuffer.set(id, buffer);
		}
		if (state().config.printConsoleTrace) {
			const limit = Error.stackTraceLimit;
			Error.stackTraceLimit = limit + 6;
			const stack = (/* @__PURE__ */ new Error("STACK_TRACE")).stack?.split("\n");
			Error.stackTraceLimit = limit;
			if (stack?.some((line) => line.includes("at Console.trace"))) buffer.push([data, void 0]);
			else {
				const trace = stack?.slice(7).join("\n");
				Error.stackTraceLimit = limit;
				buffer.push([data, trace]);
			}
		} else buffer.push([data, void 0]);
		schedule(id);
		callback();
	} });
	return new Console({
		stdout,
		stderr,
		colorMode: $.isColorSupported,
		groupIndentation: 2
	});
}

export { createCustomConsole };
