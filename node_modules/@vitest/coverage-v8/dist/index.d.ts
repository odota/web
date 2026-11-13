import { CoverageProviderModule } from 'vitest/node';

declare const mod: CoverageProviderModule & {
	extendedContextCoverageDir?: string;
	session?: unknown | null;
};

export { mod as default };
