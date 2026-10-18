import {
  Address, address as getAddress,
  mac as getMac,
  dns as getDns,
} from './address.js';

export function address(interfaceName?: string) {
  return new Promise<Address>((resolve, reject) => {
    getAddress(interfaceName || '', (err, address) => {
      if (err) return reject(err);
      resolve(address);
    });
  });
}

export function mac(interfaceName?: string) {
  return new Promise<string | null>((resolve, reject) => {
    getMac(interfaceName || '', (err, address) => {
      if (err) return reject(err);
      resolve(address || null);
    });
  });
}

export function dns(filepath?: string) {
  return new Promise<string[]>((resolve, reject) => {
    getDns(filepath || '', (err, servers) => {
      if (err) return reject(err);
      resolve(servers || []);
    });
  });
}
