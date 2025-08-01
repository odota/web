import { fileSync, dirSync, tmpNameSync, setGracefulCleanup } from 'tmp';
import { Options, SimpleOptions } from 'tmp';

export interface DirectoryResult {
    path: string;
    cleanup(): void;
}

export interface FileResult extends DirectoryResult {
    fd: number;
}

export function file(options?: Options): Promise<FileResult>;
export function withFile<T>(fn: (result: FileResult) => Promise<T>, options?: Options): Promise<T>;

export function dir(options?: Options): Promise<DirectoryResult>;
export function withDir<T>(fn: (results: DirectoryResult) => Promise<T>, options?: Options): Promise<T>;

export function tmpName(options?: SimpleOptions): Promise<string>; 

export { fileSync, dirSync, tmpNameSync, setGracefulCleanup }