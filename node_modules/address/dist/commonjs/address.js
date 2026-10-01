"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.address = exports.dns = exports.mac = exports.ipv6 = exports.ip = exports.getInterfaceAddress = exports.MAC_IP_RE = exports.MAC_RE = void 0;
const node_os_1 = __importDefault(require("node:os"));
const promises_1 = __importDefault(require("node:fs/promises"));
const node_child_process_1 = __importDefault(require("node:child_process"));
const DEFAULT_RESOLV_FILE = '/etc/resolv.conf';
// osx start line 'en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500'
// linux start line 'eth0      Link encap:Ethernet  HWaddr 00:16:3E:00:0A:29  '
const MAC_OSX_START_LINE = /^(\w+)\:\s+flags=/;
const MAC_LINUX_START_LINE = /^(\w+)\s{2,}link encap:\w+/i;
// ether 78:ca:39:b0:e6:7d
// HWaddr 00:16:3E:00:0A:29
exports.MAC_RE = /(?:ether|HWaddr)\s+((?:[a-z0-9]{2}\:){5}[a-z0-9]{2})/i;
// osx: inet 192.168.2.104 netmask 0xffffff00 broadcast 192.168.2.255
// linux: inet addr:10.125.5.202  Bcast:10.125.15.255  Mask:255.255.240.0
exports.MAC_IP_RE = /inet\s(?:addr\:)?(\d+\.\d+\.\d+\.\d+)/;
function getDefaultInterfaceName() {
    let val = 'eth';
    const platform = node_os_1.default.platform();
    if (platform === 'darwin') {
        val = 'en';
    }
    else if (platform === 'win32') {
        val = undefined;
    }
    return val;
}
function getIfconfigCMD() {
    if (node_os_1.default.platform() === 'win32') {
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
function getInterfaceAddress(family, name) {
    const interfaces = node_os_1.default.networkInterfaces();
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
exports.getInterfaceAddress = getInterfaceAddress;
/**
 * Get current machine IPv4
 *
 * interfaceName: interface name, default is 'eth' on linux, 'en' on mac os.
 */
function ip(interfaceName) {
    const item = getInterfaceAddress('IPv4', interfaceName);
    return item?.address;
}
exports.ip = ip;
/**
 * Get current machine IPv6
 *
 * interfaceName: interface name, default is 'eth' on linux, 'en' on mac os.
 */
function ipv6(interfaceName) {
    const item = getInterfaceAddress('IPv6', interfaceName);
    return item?.address;
}
exports.ipv6 = ipv6;
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
        let match = exports.MAC_RE.exec(line);
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
                match = exports.MAC_RE.exec(line);
                if (match) {
                    mac = match[1];
                }
            }
            if (!ip) {
                match = exports.MAC_IP_RE.exec(line);
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
function mac(interfaceNameOrCallback, callback) {
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
    node_child_process_1.default.exec(getIfconfigCMD(), { timeout: 5000 }, (err, stdout) => {
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
exports.mac = mac;
// nameserver 172.24.102.254
const DNS_SERVER_RE = /^nameserver\s+(\d+\.\d+\.\d+\.\d+)$/i;
function dns(filepathOrCallback, callback) {
    let filepath;
    if (typeof filepathOrCallback === 'function') {
        callback = filepathOrCallback;
    }
    else {
        filepath = filepathOrCallback;
    }
    filepath = filepath || DEFAULT_RESOLV_FILE;
    promises_1.default.readFile(filepath, 'utf8')
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
exports.dns = dns;
function address(interfaceNameOrCallback, callback) {
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
exports.address = address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNEQUF5QjtBQUN6QixnRUFBa0M7QUFDbEMsNEVBQThDO0FBRTlDLE1BQU0sbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7QUFFL0MsMEZBQTBGO0FBQzFGLCtFQUErRTtBQUMvRSxNQUFNLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDO0FBQy9DLE1BQU0sb0JBQW9CLEdBQUcsNkJBQTZCLENBQUM7QUFFM0QsMEJBQTBCO0FBQzFCLDJCQUEyQjtBQUNkLFFBQUEsTUFBTSxHQUFHLHVEQUF1RCxDQUFDO0FBRTlFLHFFQUFxRTtBQUNyRSx5RUFBeUU7QUFDNUQsUUFBQSxTQUFTLEdBQUcsdUNBQXVDLENBQUM7QUFZakUsU0FBUyx1QkFBdUI7SUFDOUIsSUFBSSxHQUFHLEdBQXVCLEtBQUssQ0FBQztJQUNwQyxNQUFNLFFBQVEsR0FBRyxpQkFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDYixDQUFDO1NBQU0sSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFLENBQUM7UUFDaEMsR0FBRyxHQUFHLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsU0FBUyxjQUFjO0lBQ3JCLElBQUksaUJBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxPQUFPLEVBQUUsQ0FBQztRQUM5QixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztBQUMxQixDQUFDO0FBRUQsMkRBQTJEO0FBQzNELGtDQUFrQztBQUNsQyxtREFBbUQ7QUFDbkQsU0FBUyxTQUFTLENBQUMsWUFBNkIsRUFBRSxjQUErQjtJQUMvRSxJQUFJLGNBQWMsS0FBSyxN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