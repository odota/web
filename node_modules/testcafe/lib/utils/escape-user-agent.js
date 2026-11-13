"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
function escapeUserAgent(userAgent) {
    return (0, sanitize_filename_1.default)(userAgent).replace(/\s+/g, '_');
}
exports.default = escapeUserAgent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNjYXBlLXVzZXItYWdlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZXNjYXBlLXVzZXItYWdlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwRUFBaUQ7QUFFakQsU0FBd0IsZUFBZSxDQUFFLFNBQVM7SUFDOUMsT0FBTyxJQUFBLDJCQUFnQixFQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUZELGtDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNhbml0aXplRmlsZW5hbWUgZnJvbSAnc2FuaXRpemUtZmlsZW5hbWUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVVc2VyQWdlbnQgKHVzZXJBZ2VudCkge1xuICAgIHJldHVybiBzYW5pdGl6ZUZpbGVuYW1lKHVzZXJBZ2VudCkucmVwbGFjZSgvXFxzKy9nLCAnXycpO1xufVxuIl19