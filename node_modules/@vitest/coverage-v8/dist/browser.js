import { l as loadProvider } from './load-provider-CdgAx3rL.js';

let enabled = false;
function triggerCommand(command, args = []) {
	return globalThis.__vitest_browser_runner__.commands.triggerCommand(command, args);
}
const mod = {
	async startCoverage() {
		if (enabled) {
			return;
		}
		enabled = true;
		await triggerCommand("__vitest_startV8Coverage");
	},
	async takeCoverage() {
		return triggerCommand("__vitest_takeV8Coverage", [window.location.href]);
	},
	async stopCoverage({ isolate }) {
		if (isolate === false) {
			return;
		}
		await triggerCommand("__vitest_stopV8Coverage");
	},
	async getProvider() {
		return loadProvider();
	}
};

export { mod as default };
