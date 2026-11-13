import { g as getWorkerState } from './utils.DYj33du9.js';
import { promises, existsSync } from 'node:fs';
import { i as isAbsolute, r as resolve, d as dirname, j as join, b as basename } from './pathe.M-eThtNZ.zq3TM4NT.js';

class NodeSnapshotEnvironment {
	options;
	constructor(options = {}) {
		this.options = options;
	}
	getVersion() {
		return "1";
	}
	getHeader() {
		return `// Snapshot v${this.getVersion()}`;
	}
	async resolveRawPath(testPath, rawPath) {
		return isAbsolute(rawPath) ? rawPath : resolve(dirname(testPath), rawPath);
	}
	async resolvePath(filepath) {
		return join(join(dirname(filepath), this.options.snapshotsDirName ?? "__snapshots__"), `${basename(filepath)}.snap`);
	}
	async prepareDirectory(dirPath) {
		await promises.mkdir(dirPath, { recursive: true });
	}
	async saveSnapshotFile(filepath, snapshot) {
		await promises.mkdir(dirname(filepath), { recursive: true });
		await promises.writeFile(filepath, snapshot, "utf-8");
	}
	async readSnapshotFile(filepath) {
		if (!existsSync(filepath)) return null;
		return promises.readFile(filepath, "utf-8");
	}
	async removeSnapshotFile(filepath) {
		if (existsSync(filepath)) await promises.unlink(filepath);
	}
}

class VitestNodeSnapshotEnvironment extends NodeSnapshotEnvironment {
	getHeader() {
		return `// Vitest Snapshot v${this.getVersion()}, https://vitest.dev/guide/snapshot.html`;
	}
	resolvePath(filepath) {
		return getWorkerState().rpc.resolveSnapshotPath(filepath);
	}
}

export { VitestNodeSnapshotEnvironment };
