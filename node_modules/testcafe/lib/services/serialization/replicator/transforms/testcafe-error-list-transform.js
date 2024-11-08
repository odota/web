"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_transform_1 = __importDefault(require("./base-transform"));
const error_list_1 = __importDefault(require("../../../../errors/error-list"));
class TestCafeErrorListTransform extends base_transform_1.default {
    constructor() {
        super('TestCafeErrorList');
    }
    shouldTransform(_, val) {
        return val instanceof error_list_1.default;
    }
    fromSerializable(value) {
        const errorList = new error_list_1.default();
        errorList.items = value.items;
        return errorList;
    }
}
exports.default = TestCafeErrorListTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGNhZmUtZXJyb3ItbGlzdC10cmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2VyaWFsaXphdGlvbi9yZXBsaWNhdG9yL3RyYW5zZm9ybXMvdGVzdGNhZmUtZXJyb3ItbGlzdC10cmFuc2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBNkM7QUFDN0MsK0VBQThEO0FBTTlELE1BQXFCLDBCQUEyQixTQUFRLHdCQUFhO0lBQ2pFO1FBQ0ksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVNLGVBQWUsQ0FBRSxDQUFVLEVBQUUsR0FBWTtRQUM1QyxPQUFPLEdBQUcsWUFBWSxvQkFBaUIsQ0FBQztJQUM1QyxDQUFDO0lBRU0sZ0JBQWdCLENBQUUsS0FBa0M7UUFDdkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBaUIsRUFBRSxDQUFDO1FBRTFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUU5QixPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUFoQkQsNkNBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VUcmFuc2Zvcm0gZnJvbSAnLi9iYXNlLXRyYW5zZm9ybSc7XG5pbXBvcnQgVGVzdENhZmVFcnJvckxpc3QgZnJvbSAnLi4vLi4vLi4vLi4vZXJyb3JzL2Vycm9yLWxpc3QnO1xuXG5pbnRlcmZhY2UgU2VyaWFsaXplZFRlc3RDYWZlRXJyb3JMaXN0IHtcbiAgICBpdGVtczogdW5rbm93bltdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0Q2FmZUVycm9yTGlzdFRyYW5zZm9ybSBleHRlbmRzIEJhc2VUcmFuc2Zvcm0ge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCdUZXN0Q2FmZUVycm9yTGlzdCcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG91bGRUcmFuc2Zvcm0gKF86IHVua25vd24sIHZhbDogdW5rbm93bik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgVGVzdENhZmVFcnJvckxpc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGZyb21TZXJpYWxpemFibGUgKHZhbHVlOiBTZXJpYWxpemVkVGVzdENhZmVFcnJvckxpc3QpOiBUZXN0Q2FmZUVycm9yTGlzdCB7XG4gICAgICAgIGNvbnN0IGVycm9yTGlzdCA9IG5ldyBUZXN0Q2FmZUVycm9yTGlzdCgpO1xuXG4gICAgICAgIGVycm9yTGlzdC5pdGVtcyA9IHZhbHVlLml0ZW1zO1xuXG4gICAgICAgIHJldHVybiBlcnJvckxpc3Q7XG4gICAgfVxufVxuIl19