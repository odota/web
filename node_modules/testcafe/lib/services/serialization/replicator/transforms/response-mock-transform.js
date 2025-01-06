"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_transform_1 = __importDefault(require("./base-transform"));
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
class ResponseMockTransform extends base_transform_1.default {
    constructor() {
        super('ResponseMock');
    }
    shouldTransform(_, val) {
        return val instanceof testcafe_hammerhead_1.ResponseMock;
    }
    fromSerializable(value) {
        const mock = testcafe_hammerhead_1.ResponseMock.from(value);
        mock.isPredicate = value.isPredicate;
        return mock;
    }
}
exports.default = ResponseMockTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UtbW9jay10cmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2VyaWFsaXphdGlvbi9yZXBsaWNhdG9yL3RyYW5zZm9ybXMvcmVzcG9uc2UtbW9jay10cmFuc2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBNkM7QUFDN0MsNkRBQW1EO0FBSW5ELE1BQXFCLHFCQUFzQixTQUFRLHdCQUFhO0lBQzVEO1FBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxlQUFlLENBQUUsQ0FBVSxFQUFFLEdBQVk7UUFDNUMsT0FBTyxHQUFHLFlBQVksa0NBQVksQ0FBQztJQUN2QyxDQUFDO0lBRU0sZ0JBQWdCLENBQUUsS0FBb0M7UUFDekQsTUFBTSxJQUFJLEdBQUcsa0NBQVksQ0FBQyxJQUFJLENBQUMsS0FBZSxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBRXJDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQWhCRCx3Q0FnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVRyYW5zZm9ybSBmcm9tICcuL2Jhc2UtdHJhbnNmb3JtJztcbmltcG9ydCB7IFJlc3BvbnNlTW9jayB9IGZyb20gJ3Rlc3RjYWZlLWhhbW1lcmhlYWQnO1xuaW1wb3J0IHsgU2VyaWFsaXplZEVudGl0eVdpdGhQcmVkaWNhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zZU1vY2tUcmFuc2Zvcm0gZXh0ZW5kcyBCYXNlVHJhbnNmb3JtIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcignUmVzcG9uc2VNb2NrJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3VsZFRyYW5zZm9ybSAoXzogdW5rbm93biwgdmFsOiB1bmtub3duKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBSZXNwb25zZU1vY2s7XG4gICAgfVxuXG4gICAgcHVibGljIGZyb21TZXJpYWxpemFibGUgKHZhbHVlOiBTZXJpYWxpemVkRW50aXR5V2l0aFByZWRpY2F0ZSk6IFJlc3BvbnNlTW9jayB7XG4gICAgICAgIGNvbnN0IG1vY2sgPSBSZXNwb25zZU1vY2suZnJvbSh2YWx1ZSBhcyBvYmplY3QpO1xuXG4gICAgICAgIG1vY2suaXNQcmVkaWNhdGUgPSB2YWx1ZS5pc1ByZWRpY2F0ZTtcblxuICAgICAgICByZXR1cm4gbW9jaztcbiAgICB9XG59XG4iXX0=