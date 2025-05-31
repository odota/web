"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_transform_1 = __importDefault(require("../base-transform"));
const re_executable_promise_1 = __importDefault(require("../../../../../utils/re-executable-promise"));
const marker_1 = require("./marker");
class ReExecutablePromiseTransform extends base_transform_1.default {
    constructor() {
        super('ReExecutablePromise');
    }
    shouldTransform(_, val) {
        return val instanceof re_executable_promise_1.default;
    }
    fromSerializable() {
        return marker_1.reExecutablePromiseMarkerSymbol;
    }
}
exports.default = ReExecutablePromiseTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2VyaWFsaXphdGlvbi9yZXBsaWNhdG9yL3RyYW5zZm9ybXMvcmUtZXhlY3V0YWJsZS1wcm9taXNlLXRyYW5zZm9ybS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVFQUE4QztBQUM5Qyx1R0FBNkU7QUFDN0UscUNBQTJEO0FBRTNELE1BQXFCLDRCQUE2QixTQUFRLHdCQUFhO0lBQ25FO1FBQ0ksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLGVBQWUsQ0FBRSxDQUFVLEVBQUUsR0FBWTtRQUM1QyxPQUFPLEdBQUcsWUFBWSwrQkFBbUIsQ0FBQztJQUM5QyxDQUFDO0lBRU0sZ0JBQWdCO1FBQ25CLE9BQU8sd0NBQStCLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBWkQsK0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVRyYW5zZm9ybSBmcm9tICcuLi9iYXNlLXRyYW5zZm9ybSc7XG5pbXBvcnQgUmVFeGVjdXRhYmxlUHJvbWlzZSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9yZS1leGVjdXRhYmxlLXByb21pc2UnO1xuaW1wb3J0IHsgcmVFeGVjdXRhYmxlUHJvbWlzZU1hcmtlclN5bWJvbCB9IGZyb20gJy4vbWFya2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVFeGVjdXRhYmxlUHJvbWlzZVRyYW5zZm9ybSBleHRlbmRzIEJhc2VUcmFuc2Zvcm0ge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCdSZUV4ZWN1dGFibGVQcm9taXNlJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3VsZFRyYW5zZm9ybSAoXzogdW5rbm93biwgdmFsOiB1bmtub3duKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBSZUV4ZWN1dGFibGVQcm9taXNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBmcm9tU2VyaWFsaXphYmxlICgpOiB1bmtub3duIHtcbiAgICAgICAgcmV0dXJuIHJlRXhlY3V0YWJsZVByb21pc2VNYXJrZXJTeW1ib2w7XG4gICAgfVxufVxuIl19