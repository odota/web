"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dns = exports.mac = exports.address = void 0;
const address_js_1 = require("./address.js");
function address(interfaceName) {
    return new Promise((resolve, reject) => {
        (0, address_js_1.address)(interfaceName || '', (err, address) => {
            if (err)
                return reject(err);
            resolve(address);
        });
    });
}
exports.address = address;
function mac(interfaceName) {
    return new Promise((resolve, reject) => {
        (0, address_js_1.mac)(interfaceName || '', (err, address) => {
            if (err)
                return reject(err);
            resolve(address || null);
        });
    });
}
exports.mac = mac;
function dns(filepath) {
    return new Promise((resolve, reject) => {
        (0, address_js_1.dns)(filepath || '', (err, servers) => {
            if (err)
                return reject(err);
            resolve(servers || []);
        });
    });
}
exports.dns = dns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvbWlzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBSXNCO0FBRXRCLFNBQWdCLE9BQU8sQ0FBQyxhQUFzQjtJQUM1QyxPQUFPLElBQUksT0FBTyxDQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzlDLElBQUEsb0JBQVUsRUFBQyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQy9DLElBQUksR0FBRztnQkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFQRCwwQkFPQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxhQUFzQjtJQUN4QyxPQUFPLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNwRCxJQUFBLGdCQUFNLEVBQUMsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUMzQyxJQUFJLEdBQUc7Z0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVBELGtCQU9DO0FBRUQsU0FBZ0IsR0FBRyxDQUFDLFFBQWlCO0lBQ25DLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDL0MsSUFBQSxnQkFBTSxFQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxHQUFHO2dCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFQRCxrQkFPQyJ9