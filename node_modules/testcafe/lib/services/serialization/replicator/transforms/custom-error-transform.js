"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_transform_1 = __importDefault(require("./base-transform"));
class CustomErrorTransform extends base_transform_1.default {
    constructor() {
        super('CustomError');
    }
    _isBuiltInError(type) {
        // @ts-ignore
        return !!global[type];
    }
    shouldTransform(_, val) {
        // @ts-ignore
        return val instanceof Error && (val.isTestCafeError || !this._isBuiltInError(val.name));
    }
    toSerializable(err) {
        const errorData = Object.assign({}, err);
        errorData.name = errorData.name || err.name;
        errorData.message = errorData.message || err.message;
        errorData.stack = errorData.stack || err.stack;
        return errorData;
    }
}
exports.default = CustomErrorTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWVycm9yLXRyYW5zZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zZXJpYWxpemF0aW9uL3JlcGxpY2F0b3IvdHJhbnNmb3Jtcy9jdXN0b20tZXJyb3ItdHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQTZDO0FBRTdDLE1BQXFCLG9CQUFxQixTQUFRLHdCQUFhO0lBQzNEO1FBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTyxlQUFlLENBQUUsSUFBWTtRQUNqQyxhQUFhO1FBQ2IsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxlQUFlLENBQUUsQ0FBVSxFQUFFLEdBQVk7UUFDNUMsYUFBYTtRQUNiLE9BQU8sR0FBRyxZQUFZLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFTSxjQUFjLENBQUUsR0FBVTtRQUM3QixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6QyxTQUFTLENBQUMsSUFBSSxHQUFNLFNBQVMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztRQUMvQyxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUNyRCxTQUFTLENBQUMsS0FBSyxHQUFLLFNBQVMsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQztRQUVqRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUF4QkQsdUNBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VUcmFuc2Zvcm0gZnJvbSAnLi9iYXNlLXRyYW5zZm9ybSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbUVycm9yVHJhbnNmb3JtIGV4dGVuZHMgQmFzZVRyYW5zZm9ybSB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoJ0N1c3RvbUVycm9yJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNCdWlsdEluRXJyb3IgKHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiAhIWdsb2JhbFt0eXBlXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdWxkVHJhbnNmb3JtIChfOiB1bmtub3duLCB2YWw6IHVua25vd24pOiBib29sZWFuIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgRXJyb3IgJiYgKHZhbC5pc1Rlc3RDYWZlRXJyb3IgfHwgIXRoaXMuX2lzQnVpbHRJbkVycm9yKHZhbC5uYW1lKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU2VyaWFsaXphYmxlIChlcnI6IEVycm9yKTogRXJyb3Ige1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBlcnIpO1xuXG4gICAgICAgIGVycm9yRGF0YS5uYW1lICAgID0gZXJyb3JEYXRhLm5hbWUgfHwgZXJyLm5hbWU7XG4gICAgICAgIGVycm9yRGF0YS5tZXNzYWdlID0gZXJyb3JEYXRhLm1lc3NhZ2UgfHwgZXJyLm1lc3NhZ2U7XG4gICAgICAgIGVycm9yRGF0YS5zdGFjayAgID0gZXJyb3JEYXRhLnN0YWNrIHx8IGVyci5zdGFjaztcblxuICAgICAgICByZXR1cm4gZXJyb3JEYXRhO1xuICAgIH1cbn1cbiJdfQ==