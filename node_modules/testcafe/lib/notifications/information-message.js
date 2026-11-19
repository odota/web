"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAILED_TO_GENERATE_DETAILED_DIFF = exports.SCREEN_RECORDING_PERMISSION_REQUEST = void 0;
const dedent_1 = __importDefault(require("dedent"));
exports.SCREEN_RECORDING_PERMISSION_REQUEST = (0, dedent_1.default) `
    TestCafe requires permission to record the screen. Open 'System Preferences > Security & Privacy > Privacy > Screen Recording' and check 'TestCafe Browser Tools' in the application list.

    Press any key to retry.
`;
const FAILED_TO_GENERATE_DETAILED_DIFF = (errorMessage) => (0, dedent_1.default) `
    Failed to generate diff due to an error:
    ${errorMessage}
`;
exports.FAILED_TO_GENERATE_DETAILED_DIFF = FAILED_TO_GENERATE_DETAILED_DIFF;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZmljYXRpb25zL2luZm9ybWF0aW9uLW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQTRCO0FBR2YsUUFBQSxtQ0FBbUMsR0FBRyxJQUFBLGdCQUFNLEVBQUM7Ozs7Q0FJekQsQ0FBQztBQUVLLE1BQU0sZ0NBQWdDLEdBQUcsQ0FBQyxZQUFvQixFQUFVLEVBQUUsQ0FBQyxJQUFBLGdCQUFNLEVBQUM7O01BRW5GLFlBQVk7Q0FDakIsQ0FBQztBQUhXLFFBQUEsZ0NBQWdDLG9DQUczQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWRlbnQgZnJvbSAnZGVkZW50JztcblxuXG5leHBvcnQgY29uc3QgU0NSRUVOX1JFQ09SRElOR19QRVJNSVNTSU9OX1JFUVVFU1QgPSBkZWRlbnQgYFxuICAgIFRlc3RDYWZlIHJlcXVpcmVzIHBlcm1pc3Npb24gdG8gcmVjb3JkIHRoZSBzY3JlZW4uIE9wZW4gJ1N5c3RlbSBQcmVmZXJlbmNlcyA+IFNlY3VyaXR5ICYgUHJpdmFjeSA+IFByaXZhY3kgPiBTY3JlZW4gUmVjb3JkaW5nJyBhbmQgY2hlY2sgJ1Rlc3RDYWZlIEJyb3dzZXIgVG9vbHMnIGluIHRoZSBhcHBsaWNhdGlvbiBsaXN0LlxuXG4gICAgUHJlc3MgYW55IGtleSB0byByZXRyeS5cbmA7XG5cbmV4cG9ydCBjb25zdCBGQUlMRURfVE9fR0VORVJBVEVfREVUQUlMRURfRElGRiA9IChlcnJvck1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBkZWRlbnQgYFxuICAgIEZhaWxlZCB0byBnZW5lcmF0ZSBkaWZmIGR1ZSB0byBhbiBlcnJvcjpcbiAgICAke2Vycm9yTWVzc2FnZX1cbmA7XG4iXX0=