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
        const pass = !(0, is_internal_stack_frame_1.default)(frame);
        if (pass)
            passedFramesCount++;
        return pass;
    };
}
exports.default = createStackFilter;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXN0YWNrLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcnJvcnMvY3JlYXRlLXN0YWNrLWZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdGQUE2RDtBQUU3RCxTQUF3QixpQkFBaUIsQ0FBRSxLQUFLO0lBQzVDLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBRTFCLE9BQU8sU0FBUyxXQUFXLENBQUUsS0FBSztRQUM5QixJQUFJLGlCQUFpQixJQUFJLEtBQUs7WUFDMUIsT0FBTyxLQUFLLENBQUM7UUFFakIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFBLGlDQUFvQixFQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFDLElBQUksSUFBSTtZQUNKLGlCQUFpQixFQUFFLENBQUM7UUFFeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQWRELG9DQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzSW50ZXJuYWxTdGFja0ZyYW1lIGZyb20gJy4vaXMtaW50ZXJuYWwtc3RhY2stZnJhbWUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdGFja0ZpbHRlciAobGltaXQpIHtcbiAgICBsZXQgcGFzc2VkRnJhbWVzQ291bnQgPSAwO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN0YWNrRmlsdGVyIChmcmFtZSkge1xuICAgICAgICBpZiAocGFzc2VkRnJhbWVzQ291bnQgPj0gbGltaXQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgcGFzcyA9ICFpc0ludGVybmFsU3RhY2tGcmFtZShmcmFtZSk7XG5cbiAgICAgICAgaWYgKHBhc3MpXG4gICAgICAgICAgICBwYXNzZWRGcmFtZXNDb3VudCsrO1xuXG4gICAgICAgIHJldHVybiBwYXNzO1xuICAgIH07XG59XG4iXX0=