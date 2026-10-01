import os from 'node:os';
import fs from 'node:fs/promises';
import childProcess from 'node:child_process';

const DEFAULT_RESOLV_FILE = '/etc/resolv.conf';

// osx start line 'en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500'
// linux start line 'eth0      Link encap:Ethernet  HWaddr 00:16:3E:00:0A:29  '
const MAC_OSX_START_LINE = /^(\w+)\:\s+flags=/;
const MAC_LINUX_START_LINE = /^(\w+)\s{2,}link encap:\w+/i;

// ether 78:ca:39:b0:e6:7d
// HWaddr 00:16:3E:00:0A:29
export const MAC_RE = /(?:ether|HWaddr)\s+((?:[a-z0-9]{2}\:){5}[a-z0-9]{2})/i;

// osx: inet 192.168.2.104 netmask 0xffffff00 broadcast 192.168.2.255
// linux: inet addr:10.125.5.202  Bcast:10.125.15.255  Mask:255.255.240.0
export const MAC_IP_RE = /inet\s(?:addr\:)?(\d+\.\d+\.\d+\.\d+)/;

export interface Address {
  ip?: string;
  ipv6?: string;
  mac?: string;
}

export type AddressCallback = (err: Error | null, addr: Address) => void;
export type MacCallback = (err?: Error | null, addr?: string | null) => void;
export type DnsCallback = (err?: Error | null, servers?: string[]) => void;

function getDefaultInterfaceName() {
  let val: string | undefined = 'eth';
  const platform = os.platform();
  if (platform === 'darwin') {
    val = 'en';
  } else if (platform === 'win32') {
    val = undefined;
  }
  return val;
}

function getIfconfigCMD() {
  if (os.platform() === 'win32') {
    return 'ipconfig/all';
  }
  return '/sbin/ifconfig';
}

// typeof os.networkInterfaces family is a number (v18.0.0)
// types: 'IPv4' | 'IPv6' => 4 | 6
// @see https://github.com/nodejs/node/issues/42861
function matchName(actualFamily: string | number, expectedFamily: string | number) {
  if (expectedFamily === 'IPv4') {
    return actualFamily === 'IPv4' || actualFamily === 4;
  }
  if (expectedFamily === 'IPv6') {
    return actualFamily === 'IPv6' || actualFamily === 6;
  }
  return actualFamily === expectedFamily;
}

function findAddressFromInterface(items: os.NetworkInterfaceInfo[], expectedFamily: string | number,
  ignoreLoAddress = false) {
  let firstMatchItem;
  for (const item of items) {
    if (matchName(item.family, expectedFamily)) {
      if (ignoreLoAddress && item.address.startsWith('127.')) {
        continue;
      }
      if (expectedFamily === 'IPv6') {
        // find the scopeid = 0 item
        if (item.scopeid === 0) return item;
        if (!firstMatchItem) {
          firstMatchItem = item;
        }
      } else {
        return item;
      }
    }
  }
  return firstMatchItem;
}

export function getInterfaceAddress(family?: string, name?: string) {
  const interfaces = os.networkInterfaces();
  const noName = !name;
  name = name || getDefaultInterfaceName();
  family = family || 'IPv4';
  if (name) {
    for (let i = -1; i < 8; i++) {
      const interfaceName = name + (i >= 0 ? i : ''); // support 'lo' and 'lo0'
      const items = interfaces[interfaceName];
      if (items) {
        const item = findAddressFromInterface(items, family);
        if (item) {
          return item;
        }
      }
    }
  }

  if (noName) {
    // filter all loopback or local addresses
    for (const k in interfaces) {
      const items = interfaces[k];
      if (items) {
        // all 127 addresses are local and should be ignored
        const item = findAddressFromInterface(items, family, true);
        if (item) {
          return item;
        }
      }
    }
  }
  return;
}

/**
 * Get current machine IPv4
 *
 * interfaceName: interface name, default is 'eth' on linux, 'en' on mac os.
 */
export function ip(interfaceName?: string) {
  const item = getInterfaceAddress('IPv4', interfaceName);
  return item?.address;
}

/**
 * Get current machine IPv6
 *
 * interfaceName: interface name, default is 'eth' on linux, 'en' on mac os.
 */
export function ipv6(interfaceName?: string) {
  const item = getInterfaceAddress('IPv6', interfaceName);
  return item?.address;
}

function getMAC(content: string, interfaceName: string, matchIP: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trimEnd();
    const m = MAC_OSX_START_LINE.exec(line) || MAC_LINUX_START_LINE.exec(line);
    if (!m) {
      continue;
    }

    // check interface name
    const name = m[1];
    if (name.indexOf(interfaceName) !== 0) {
      continue;
    }

    let ip: string | null = null;
    let mac: string | null = null;
    let match = MAC_RE.exec(line);
    if (match) {
      mac = match[1];
    }

    i++;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      line = lines[i];
      if (!line || MAC_OSX_START_LINE.exec(line) || MAC_LINUX_START_LINE.exec(line)) {
        i--;
        break; // hit next interface, handle next interface
      }
      if (!mac) {
        match = MAC_RE.exec(line);
        if (match) {
          mac = match[1];
        }
      }

      if (!ip) {
        match = MAC_IP_RE.exec(line);
        if (match) {
          ip = match[1];
        }
      }

      i++;
    }

    if (ip === matchIP) {
      return mac;
    }
  }
  return null;
}

/**
 * Get current machine MAC address
 *
 * interfaceName: name, default is 'eth' on linux, 'en' on mac os.
 */
export function mac(callback: MacCallback): void;
export function mac(interfaceName: string, callback: MacCallback): void;
export function mac(interfaceNameOrCallback: string | MacCallback, callback?: MacCallback) {
  let interfaceName: string | undefined;
  if (typeof interfaceNameOrCallback === 'function') {
    callback = interfaceNameOrCallback;
  } else {
    interfaceName = interfaceNameOrCallback;
  }
  interfaceName = interfaceName || getDefaultInterfaceName();
  const item = getInterfaceAddress('IPv4', interfaceName);
  if (!item) {
    return callback!();
  }

  // https://github.com/nodejs/node/issues/13581
  // bug in node 7.x and <= 8.4.0
  if (!process.env.CI && (item.mac === 'ff:00:00:00:00:00' || item.mac === '00:00:00:00:00:00')) {
    // wrong address, ignore it
    item.mac = '';
  }

  if (item.mac) {
    return callback!(null, item.mac);
  }

  childProcess.exec(getIfconfigCMD(), { timeout: 5000 }, (err, stdout) => {
    if (err || !stdout) {
      return callback!(err);
    }

    if (!interfaceName) {
      return callback!();
    }
    const mac = getMAC(stdout || '', interfaceName, item.address);
    callback!(null, mac);
  });
}

// nameserver 172.24.102.254
const DNS_SERVER_RE = /^nameserver\s+(\d+\.\d+\.\d+\.\d+)$/i;

/**
 * Get DNS servers.
 *
 * filepath: resolv config file path. default is '/etc/resolv.conf'.
 */
export function dns(callback: DnsCallback): void;
export function dns(filepath: string, callback: DnsCallback): void;
export function dns(filepathOrCallback: string | DnsCallback, callback?: DnsCallback) {
  let filepath: string | undefined;
  if (typeof filepathOrCallback === 'function') {
    callback = filepathOrCallback;
  } else {
    filepath = filepathOrCallback;
  }
  filepath = filepath || DEFAULT_RESOLV_FILE;
  fs.readFile(filepath, 'utf8')
    .then(content => {
      const servers: string[] = [];
      content = content || '';
      const lines = content.split('\n');
      for (const line of lines) {
        const m = DNS_SERVER_RE.exec(line.trim());
        if (m) {
          servers.push(m[1]);
        }
      }
      callback!(null, servers);
    })
    .catch(err => {
      callback!(err);
    });
}

/**
 * Get all addresses.
 *
 * interfaceName: interface name, default is 'eth' on linux, 'en' on mac os.
 */
export function address(callback: AddressCallback): void;
export function address(interfaceName: string, callback: AddressCallback): void;
export function address(interfaceNameOrCallback: string | AddressCallback, callback?: AddressCallback) {
  let interfaceName: string | undefined;
  if (typeof interfaceNameOrCallback === 'function') {
    callback = interfaceNameOrCallback;
  } else {
    interfaceName = interfaceNameOrCallback;
  }

  const addr: Address = {
    ip: ip(interfaceName),
    ipv6: ipv6(interfaceName),
    mac: undefined,
  };
  mac(interfaceName || '', (err?: Error | null, mac?: string | null) => {
    if (mac) {
      addr.mac = mac;
    }
    callback!(err || null, addr);
  });
}
