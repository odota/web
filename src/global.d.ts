type Strings = typeof import('./lang/en-US.json');
type PatchNotes = Record<string, { general?: string[], items?: Record<string, string[]>, heroes?: Record<string, any>}> | undefined;