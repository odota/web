"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
function escapeUserAgent(userAgent) {
    return sanitize_filename_1.default(userAgent).replace(/\s+/g, '_');
}
exports.default = escapeUserAgent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNjYXBlLXVzZXItYWdlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZXNjYXBlLXVzZXItYWdlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwRUFBaUQ7QUFFakQsU0FBd0IsZUFBZSxDQUFFLFNBQVM7SUFDOUMsT0FBTywyQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFGRCxrQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzYW5pdGl6ZUZpbGVuYW1lIGZyb20gJ3Nhbml0aXplLWZpbGVuYW1lJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlVXNlckFnZW50ICh1c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gc2FuaXRpemVGaWxlbmFtZSh1c2VyQWdlbnQpLnJlcGxhY2UoL1xccysvZywgJ18nKTtcbn1cbiJdfQ==