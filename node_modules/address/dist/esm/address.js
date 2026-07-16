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
function getDefaultInterfaceName() {
    let val = 'eth';
    const platform = os.platform();
    if (platform === 'darwin') {
        val = 'en';
    }
    else if (platform === 'win32') {
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
function matchName(actualFamily, expectedFamily) {
    if (expectedFamily === 'IPv4') {
        return actualFamily === 'IPv4' || actualFamily === 4;
    }
    if (expectedFamily === 'IPv6') {
        return actualFamily === 'IPv6' || actualFamily === 6;
    }
    return actualFamily === expectedFamily;
}
function findAddressFromInterface(items, expectedFamily, ignoreLoAddress = false) {
    let firstMatchItem;
    for (const item of items) {
        if (matchName(item.family, expectedFamily)) {
            if (ignoreLoAddress && item.address.startsWith('127.')) {
                continue;
            }
            if (expectedFamily === 'IPv6') {
                // find the scopeid = 0 item
                if (item.scopeid === 0)
                    return item;
                if (!firstMatchItem) {
                    firstMatchItem = item;
                }
            }
            else {
                return item;
            }
        }
    }
    return firstMatchItem;
}
export function getInterfaceAddress(family, name) {
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
export function ip(interfaceName) {
    const item = getInterfaceAddress('IPv4', interfaceName);
    return item?.address;
}
/**
 * Get current machine IPv6
 *
 * interfaceName: interface name, default is 'eth' on linux, 'en' on mac os.
 */
export function ipv6(interfaceName) {
    const item = getInterfaceAddress('IPv6', interfaceName);
    return item?.address;
}
function getMAC(content, interfaceName, matchIP) {
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
        let ip = null;
        let mac = null;
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
export function mac(interfaceNameOrCallback, callback) {
    let interfaceName;
    if (typeof interfaceNameOrCallback === 'function') {
        callback = interfaceNameOrCallback;
    }
    else {
        interfaceName = interfaceNameOrCallback;
    }
    interfaceName = interfaceName || getDefaultInterfaceName();
    const item = getInterfaceAddress('IPv4', interfaceName);
    if (!item) {
        return callback();
    }
    // https://github.com/nodejs/node/issues/13581
    // bug in node 7.x and <= 8.4.0
    if (!process.env.CI && (item.mac === 'ff:00:00:00:00:00' || item.mac === '00:00:00:00:00:00')) {
        // wrong address, ignore it
        item.mac = '';
    }
    if (item.mac) {
        return callback(null, item.mac);
    }
    childProcess.exec(getIfconfigCMD(), { timeout: 5000 }, (err, stdout) => {
        if (err || !stdout) {
            return callback(err);
        }
        if (!interfaceName) {
            return callback();
        }
        const mac = getMAC(stdout || '', interfaceName, item.address);
        callback(null, mac);
    });
}
// nameserver 172.24.102.254
const DNS_SERVER_RE = /^nameserver\s+(\d+\.\d+\.\d+\.\d+)$/i;
export function dns(filepathOrCallback, callback) {
    let filepath;
    if (typeof filepathOrCallback === 'function') {
        callback = filepathOrCallback;
    }
    else {
        filepath = filepathOrCallback;
    }
    filepath = filepath || DEFAULT_RESOLV_FILE;
    fs.readFile(filepath, 'utf8')
        .then(content => {
        const servers = [];
        content = content || '';
        const lines = content.split('\n');
        for (const line of lines) {
            const m = DNS_SERVER_RE.exec(line.trim());
            if (m) {
                servers.push(m[1]);
            }
        }
        callback(null, servers);
    })
        .catch(err => {
        callback(err);
    });
}
export function address(interfaceNameOrCallback, callback) {
    let interfaceName;
    if (typeof interfaceNameOrCallback === 'function') {
        callback = interfaceNameOrCallback;
    }
    else {
        interfaceName = interfaceNameOrCallback;
    }
    const addr = {
        ip: ip(interfaceName),
        ipv6: ipv6(interfaceName),
        mac: undefined,
    };
    mac(interfaceName || '', (err, mac) => {
        if (mac) {
            addr.mac = mac;
        }
        callback(err || null, addr);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6QixPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxNQUFNLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO0FBRS9DLDBGQUEwRjtBQUMxRiwrRUFBK0U7QUFDL0UsTUFBTSxrQkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztBQUMvQyxNQUFNLG9CQUFvQixHQUFHLDZCQUE2QixDQUFDO0FBRTNELDBCQUEwQjtBQUMxQiwyQkFBMkI7QUFDM0IsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLHVEQUF1RCxDQUFDO0FBRTlFLHFFQUFxRTtBQUNyRSx5RUFBeUU7QUFDekUsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLHVDQUF1QyxDQUFDO0FBWWpFLFNBQVMsdUJBQXVCO0lBQzlCLElBQUksR0FBRyxHQUF1QixLQUFLLENBQUM7SUFDcEMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDYixDQUFDO1NBQU0sSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFLENBQUM7UUFDaEMsR0FBRyxHQUFHLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsU0FBUyxjQUFjO0lBQ3JCLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLE9BQU8sRUFBRSxDQUFDO1FBQzlCLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxPQUFPLGdCQUFnQixDQUFDO0FBQzFCLENBQUM7QUFFRCwyREFBMkQ7QUFDM0Qsa0NBQWtDO0FB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