import { Address } from './address.js';
export declare function address(interfaceName?: string): Promise<Address>;
export declare function mac(interfaceName?: string): Promise<string | null>;
export declare function dns(filepath?: string): Promise<string[]>;
