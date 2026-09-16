"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indent_string_1 = __importDefault(require("indent-string"));
const util_1 = require("util");
const OPTIONS = {
    isTestCafeInspect: true,
    compact: false,
};
function default_1(logger, data) {
    try {
        const entry = data
            // @ts-ignore
            ? (0, indent_string_1.default)(`\n${(0, util_1.inspect)(data, OPTIONS)}\n`, ' ', 4)
            : '';
        logger(entry);
    }
    catch (e) {
        logger(e.stack ? e.stack : String(e));
    }
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLWVudHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZy1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtFQUF5QztBQUN6QywrQkFBK0I7QUFHL0IsTUFBTSxPQUFPLEdBQUc7SUFDWixpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLE9BQU8sRUFBWSxLQUFLO0NBQzNCLENBQUM7QUFFRixtQkFBeUIsTUFBZ0IsRUFBRSxJQUFhO0lBQ3BELElBQUk7UUFDQSxNQUFNLEtBQUssR0FBRyxJQUFJO1lBQ2QsYUFBYTtZQUNiLENBQUMsQ0FBQyxJQUFBLHVCQUFZLEVBQUMsS0FBSyxJQUFBLGNBQU8sRUFBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFVCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDakI7SUFDRCxPQUFPLENBQU0sRUFBRTtRQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6QztBQUNMLENBQUM7QUFaRCw0QkFZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpbmRlbnRTdHJpbmcgZnJvbSAnaW5kZW50LXN0cmluZyc7XG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBEZWJ1Z2dlciB9IGZyb20gJ2RlYnVnJztcblxuY29uc3QgT1BUSU9OUyA9IHtcbiAgICBpc1Rlc3RDYWZlSW5zcGVjdDogdHJ1ZSxcbiAgICBjb21wYWN0OiAgICAgICAgICAgZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobG9nZ2VyOiBEZWJ1Z2dlciwgZGF0YTogdW5rbm93bik6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZGF0YVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgPyBpbmRlbnRTdHJpbmcoYFxcbiR7aW5zcGVjdChkYXRhLCBPUFRJT05TKX1cXG5gLCAnICcsIDQpXG4gICAgICAgICAgICA6ICcnO1xuXG4gICAgICAgIGxvZ2dlcihlbnRyeSk7XG4gICAgfVxuICAgIGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgbG9nZ2VyKGUuc3RhY2sgPyBlLnN0YWNrIDogU3RyaW5nKGUpKTtcbiAgICB9XG59XG4iXX0=