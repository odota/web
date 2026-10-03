"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_family_1 = __importDefault(require("os-family"));
const symbols = os_family_1.default.win ?
    { ok: '√', err: '×' } :
    { ok: '✓', err: '✖' };
exports.default = symbols;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBvcnRlci9zeW1ib2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQTJCO0FBRTNCLE1BQU0sT0FBTyxHQUFHLG1CQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFFMUIsa0JBQWUsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9TIGZyb20gJ29zLWZhbWlseSc7XG5cbmNvbnN0IHN5bWJvbHMgPSBPUy53aW4gP1xuICAgIHsgb2s6ICfiiJonLCBlcnI6ICfDlycgfSA6XG4gICAgeyBvazogJ+KckycsIGVycjogJ+KclicgfTtcblxuZXhwb3J0IGRlZmF1bHQgc3ltYm9scztcblxuIl19