"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.error = exports.warning = exports.info = void 0;
const chalk_1 = __importDefault(require("chalk"));
const symbols_1 = __importDefault(require("../reporter/symbols"));
function info(message) {
    console.log(`\n${message}`);
}
exports.info = info;
function warning(message) {
    console.log(`\n${chalk_1.default.yellowBright(message)}`);
}
exports.warning = warning;
function error(message) {
    console.log(chalk_1.default.redBright(`\n${symbols_1.default.err} ${message}`));
}
exports.error = error;
function success(message) {
    console.log(chalk_1.default.greenBright(`\n${symbols_1.default.ok} ${message}`));
}
exports.success = success;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXNoYm9hcmQvZm9ybWF0dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCOzs7Ozs7QUFFL0Isa0RBQTBCO0FBQzFCLGtFQUFvRDtBQUVwRCxTQUFnQixJQUFJLENBQUUsT0FBZTtJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsb0JBRUM7QUFFRCxTQUFnQixPQUFPLENBQUUsT0FBZTtJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssZUFBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUZELDBCQUVDO0FBRUQsU0FBZ0IsS0FBSyxDQUFFLE9BQWU7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssaUJBQWlCLENBQUMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBRkQsc0JBRUM7QUFFRCxTQUFnQixPQUFPLENBQUUsT0FBZTtJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNFLENBQUM7QUFGRCwwQkFFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBSRVBPUlRJTkdfU1lNQk9MUyBmcm9tICcuLi9yZXBvcnRlci9zeW1ib2xzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluZm8gKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKGBcXG4ke21lc3NhZ2V9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuaW5nIChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhgXFxuJHtjaGFsay55ZWxsb3dCcmlnaHQobWVzc2FnZSl9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvciAobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coY2hhbGsucmVkQnJpZ2h0KGBcXG4ke1JFUE9SVElOR19TWU1CT0xTLmVycn0gJHttZXNzYWdlfWApKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Y2Nlc3MgKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLmdyZWVuQnJpZ2h0KGBcXG4ke1JFUE9SVElOR19TWU1CT0xTLm9rfSAke21lc3NhZ2V9YCkpO1xufVxuXG4iXX0=