/// <reference types="node" />
import os from 'node:os';
export declare const MAC_RE: RegExp;
export declare const MAC_IP_RE: RegExp;
export interface Address {
    ip?: string;
    ipv6?: string;
    mac?: string;
}
export type AddressCallback = (err: Error | null, addr: Address) => void;
export type MacCallback = (err?: Error | null, addr?: string | null) => void;
export type DnsCallback = (err?: Error | null, servers?: string[]) => void;
export declare function getInterfaceAddress(family?: string, name?: string): os.NetworkInterfaceInfo | undefined;
/**
 * Get current machine IPv4
 *
 * interfaceName: interface name, default is 'eth' on linux, 'en' on mac os.
 */
export declare function ip(interfaceName?: string): string | undefined;
/**
 * Get current machine IPv6
 *
 * interfaceName: interface name, default is 'eth' on linux, 'en' on mac os.
 */
export declare function ipv6(interfaceName?: string): string | undefined;
/**
 * Get current machine MAC address
 *
 * interfaceName: name, default is 'eth' on linux, 'en' on mac os.
 */
export declare function mac(callback: MacCallback): void;
export declare function mac(interfaceName: string, callback: MacCallback): void;
/**
 * Get DNS servers.
 *
 * filepath: resolv config file path. default is '/etc/resolv.conf'.
 */
export declare function dns(callback: DnsCallback): void;
export declare function dns(filepath: string, callback: DnsCallback): void;
/**
 * Get all addresses.
 *
 * interfaceName: interface name, default is 'eth' on linux, 'en' on mac os.
 */
export declare function address(callback: AddressCallback): void;
export declare function address(interfaceName: string, callback: AddressCallback): void;
