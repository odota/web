"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EVAL_STACK_FRAME = /^\s+at eval \(.*<anonymous>/m;
function default_1() {
    const error = new Error('');
    if (!error.stack)
        return false;
    return EVAL_STACK_FRAME.test(error.stack);
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmVwbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9pcy1yZXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxnQkFBZ0IsR0FBRyw4QkFBOEIsQ0FBQztBQUV4RDtJQUNJLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztRQUNaLE9BQU8sS0FBSyxDQUFDO0lBRWpCLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBUEQsNEJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFVkFMX1NUQUNLX0ZSQU1FID0gL15cXHMrYXQgZXZhbCBcXCguKjxhbm9ueW1vdXM+L207XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBib29sZWFuIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignJyk7XG5cbiAgICBpZiAoIWVycm9yLnN0YWNrKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gRVZBTF9TVEFDS19GUkFNRS50ZXN0KGVycm9yLnN0YWNrKTtcbn1cbiJdfQ==