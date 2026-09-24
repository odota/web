"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = __importDefault(require("semver"));
const INTERNAL_MODULES_PREFIX = semver_1.default.gte(process.version, '15.0.0') ? 'node:' : 'internal/';
exports.default = INTERNAL_MODULES_PREFIX;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWwtbW9kdWxlcy1wcmVmaXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXJyb3JzL2ludGVybmFsLW1vZHVsZXMtcHJlZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLE1BQU0sdUJBQXVCLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7QUFFOUYsa0JBQWUsdUJBQXVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG5cbmNvbnN0IElOVEVSTkFMX01PRFVMRVNfUFJFRklYID0gc2VtdmVyLmd0ZShwcm9jZXNzLnZlcnNpb24sICcxNS4wLjAnKSA/ICdub2RlOicgOiAnaW50ZXJuYWwvJztcblxuZXhwb3J0IGRlZmF1bHQgSU5URVJOQUxfTU9EVUxFU19QUkVGSVg7XG4iXX0=