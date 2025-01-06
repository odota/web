"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_console_messages_1 = __importDefault(require("../../../../test-run/browser-console-messages"));
class BrowserConsoleMessagesTransform {
    constructor() {
        this.type = 'BrowserConsoleMessages';
    }
    shouldTransform(_, val) {
        return val instanceof browser_console_messages_1.default;
    }
    toSerializable(value) {
        return value.getCopy();
    }
    fromSerializable(value) {
        return new browser_console_messages_1.default(value);
    }
}
exports.default = BrowserConsoleMessagesTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1jb25zb2xlLW1lc3NhZ2VzLXRyYW5zZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zZXJpYWxpemF0aW9uL3JlcGxpY2F0b3IvdHJhbnNmb3Jtcy9icm93c2VyLWNvbnNvbGUtbWVzc2FnZXMtdHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkdBQW1GO0FBRW5GLE1BQXFCLCtCQUErQjtJQUdoRDtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsd0JBQXdCLENBQUM7SUFDekMsQ0FBQztJQUVNLGVBQWUsQ0FBRSxDQUFVLEVBQUUsR0FBWTtRQUM1QyxPQUFPLEdBQUcsWUFBWSxrQ0FBc0IsQ0FBQztJQUNqRCxDQUFDO0lBRU0sY0FBYyxDQUFFLEtBQTZCO1FBQ2hELE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxnQkFBZ0IsQ0FBRSxLQUFjO1FBQ25DLE9BQU8sSUFBSSxrQ0FBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0o7QUFsQkQsa0RBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJyb3dzZXJDb25zb2xlTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vLi4vdGVzdC1ydW4vYnJvd3Nlci1jb25zb2xlLW1lc3NhZ2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJvd3NlckNvbnNvbGVNZXNzYWdlc1RyYW5zZm9ybSB7XG4gICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMudHlwZSA9ICdCcm93c2VyQ29uc29sZU1lc3NhZ2VzJztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdWxkVHJhbnNmb3JtIChfOiB1bmtub3duLCB2YWw6IHVua25vd24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIEJyb3dzZXJDb25zb2xlTWVzc2FnZXM7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU2VyaWFsaXphYmxlICh2YWx1ZTogQnJvd3NlckNvbnNvbGVNZXNzYWdlcyk6IHVua25vd24ge1xuICAgICAgICByZXR1cm4gdmFsdWUuZ2V0Q29weSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmcm9tU2VyaWFsaXphYmxlICh2YWx1ZTogdW5rbm93bik6IEJyb3dzZXJDb25zb2xlTWVzc2FnZXMge1xuICAgICAgICByZXR1cm4gbmV3IEJyb3dzZXJDb25zb2xlTWVzc2FnZXModmFsdWUpO1xuICAgIH1cbn1cbiJdfQ==