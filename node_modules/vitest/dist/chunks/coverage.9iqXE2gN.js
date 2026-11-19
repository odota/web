import { r as resolveCoverageProviderModule } from './coverage.jGCktcGP.js';

async function startCoverageInsideWorker(options, loader, runtimeOptions) {
	const coverageModule = await resolveCoverageProviderModule(options, loader);
	if (coverageModule) return coverageModule.startCoverage?.({
		...runtimeOptions,
		autoAttachSubprocess: options.autoAttachSubprocess,
		reportsDirectory: options.reportsDirectory
	});
	return null;
}
async function takeCoverageInsideWorker(options, loader) {
	const coverageModule = await resolveCoverageProviderModule(options, loader);
	if (coverageModule) return coverageModule.takeCoverage?.({
		moduleExecutionInfo: loader.moduleExecutionInfo,
		coverageFilesDirectory: options.coverageFilesDirectory
	});
	return null;
}
async function stopCoverageInsideWorker(options, loader, runtimeOptions) {
	const coverageModule = await resolveCoverageProviderModule(options, loader);
	if (coverageModule) return coverageModule.stopCoverage?.(runtimeOptions);
	return null;
}

export { stopCoverageInsideWorker as a, startCoverageInsideWorker as s, takeCoverageInsideWorker as t };
