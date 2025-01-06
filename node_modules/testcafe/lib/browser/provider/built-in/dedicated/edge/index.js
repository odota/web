"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chrome_1 = __importDefault(require("../chrome"));
const runtime_info_1 = __importDefault(require("./runtime-info"));
exports.default = Object.assign(Object.assign({}, chrome_1.default), { async _createRunTimeInfo(hostName, configString, disableMultipleWindows) {
        return runtime_info_1.default.create(hostName, configString, disableMultipleWindows);
    } });
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYnJvd3Nlci9wcm92aWRlci9idWlsdC1pbi9kZWRpY2F0ZWQvZWRnZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVEQUFnRDtBQUNoRCxrRUFBNkM7QUFFN0Msa0RBQ08sZ0JBQXVCLEtBRTFCLEtBQUssQ0FBQyxrQkFBa0IsQ0FBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLHNCQUFzQjtRQUNwRSxPQUFPLHNCQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUNsRixDQUFDLElBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVkaWNhdGVkUHJvdmlkZXJDaHJvbWUgZnJvbSAnLi4vY2hyb21lJztcbmltcG9ydCBFZGdlUnVuVGltZUluZm8gZnJvbSAnLi9ydW50aW1lLWluZm8nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLi4uZGVkaWNhdGVkUHJvdmlkZXJDaHJvbWUsXG5cbiAgICBhc3luYyBfY3JlYXRlUnVuVGltZUluZm8gKGhvc3ROYW1lLCBjb25maWdTdHJpbmcsIGRpc2FibGVNdWx0aXBsZVdpbmRvd3MpIHtcbiAgICAgICAgcmV0dXJuIEVkZ2VSdW5UaW1lSW5mby5jcmVhdGUoaG9zdE5hbWUsIGNvbmZpZ1N0cmluZywgZGlzYWJsZU11bHRpcGxlV2luZG93cyk7XG4gICAgfSxcbn07XG4iXX0=