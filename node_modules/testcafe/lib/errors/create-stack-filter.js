"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_internal_stack_frame_1 = __importDefault(require("./is-internal-stack-frame"));
function createStackFilter(limit) {
    let passedFramesCount = 0;
    return function stackFilter(frame) {
        if (passedFramesCount >= limit)
            return false;
        const pass = !is_internal_stack_frame_1.default(frame);
        if (pass)
            passedFramesCount++;
        return pass;
    };
}
exports.default = createStackFilter;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXN0YWNrLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcnJvcnMvY3JlYXRlLXN0YWNrLWZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdGQUE2RDtBQUU3RCxTQUF3QixpQkFBaUIsQ0FBRSxLQUFLO0lBQzVDLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBRTFCLE9BQU8sU0FBUyxXQUFXLENBQUUsS0FBSztRQUM5QixJQUFJLGlCQUFpQixJQUFJLEtBQUs7WUFDMUIsT0FBTyxLQUFLLENBQUM7UUFFakIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxpQ0FBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQyxJQUFJLElBQUk7WUFDSixpQkFBaUIsRUFBRSxDQUFDO1FBRXhCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFkRCxvQ0FjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc0ludGVybmFsU3RhY2tGcmFtZSBmcm9tICcuL2lzLWludGVybmFsLXN0YWNrLWZyYW1lJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RhY2tGaWx0ZXIgKGxpbWl0KSB7XG4gICAgbGV0IHBhc3NlZEZyYW1lc0NvdW50ID0gMDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBzdGFja0ZpbHRlciAoZnJhbWUpIHtcbiAgICAgICAgaWYgKHBhc3NlZEZyYW1lc0NvdW50ID49IGxpbWl0KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IHBhc3MgPSAhaXNJbnRlcm5hbFN0YWNrRnJhbWUoZnJhbWUpO1xuXG4gICAgICAgIGlmIChwYXNzKVxuICAgICAgICAgICAgcGFzc2VkRnJhbWVzQ291bnQrKztcblxuICAgICAgICByZXR1cm4gcGFzcztcbiAgICB9O1xufVxuIl19