import { F as FileSpecification } from './config.d.B3YV4t0O.js';
import { O as OTELCarrier } from './rpc.d.3FOhdFx8.js';
import { T as TestExecutionMethod } from './worker.d.CyJRpyfZ.js';

interface ModuleDefinitionLocation {
	line: number;
	column: number;
}
interface SourceModuleLocations {
	modules: ModuleDefinitionDiagnostic[];
	untracked: ModuleDefinitionDiagnostic[];
}
interface ModuleDefinitionDiagnostic {
	start: ModuleDefinitionLocation;
	end: ModuleDefinitionLocation;
	startIndex: number;
	endIndex: number;
	rawUrl: string;
	resolvedUrl: string;
	resolvedId: string;
}
interface ModuleDefinitionDurationsDiagnostic extends ModuleDefinitionDiagnostic {
	selfTime: number;
	totalTime: number;
	transformTime?: number;
	external?: boolean;
	importer?: string;
}
interface UntrackedModuleDefinitionDiagnostic {
	url: string;
	resolvedId: string;
	resolvedUrl: string;
	selfTime: number;
	totalTime: number;
	transformTime?: number;
	external?: boolean;
	importer?: string;
}
interface SourceModuleDiagnostic {
	modules: ModuleDefinitionDurationsDiagnostic[];
	untrackedModules: UntrackedModuleDefinitionDiagnostic[];
}

type SerializedTestSpecification = [project: {
	name: string | undefined;
	root: string;
}, file: string, options: {
	pool: string;
	testLines?: number[] | undefined;
	testIds?: string[] | undefined;
	testNames?: string[] | undefined;
	testNamePattern?: RegExp | undefined;
	testTagsFilter?: string[] | undefined;
}];

interface BrowserTesterOptions {
	method: TestExecutionMethod;
	files: FileSpecification[];
	providedContext: string;
	otelCarrier?: OTELCarrier;
	concurrencyId: number;
	workerId: number;
}

export type { BrowserTesterOptions as B, ModuleDefinitionDurationsDiagnostic as M, SerializedTestSpecification as S, UntrackedModuleDefinitionDiagnostic as U, ModuleDefinitionDiagnostic as a, ModuleDefinitionLocation as b, SourceModuleDiagnostic as c, SourceModuleLocations as d };
