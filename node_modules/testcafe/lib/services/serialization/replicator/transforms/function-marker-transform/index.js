"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_transform_1 = __importDefault(require("../base-transform"));
const marker_1 = require("./marker");
class FunctionMarkerTransform extends base_transform_1.default {
    constructor() {
        super('FunctionMarker');
    }
    shouldTransform(_, val) {
        return val instanceof marker_1.FunctionMarker;
    }
    fromSerializable() {
        return marker_1.functionMarkerSymbol;
    }
}
exports.default = FunctionMarkerTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2VyaWFsaXphdGlvbi9yZXBsaWNhdG9yL3RyYW5zZm9ybXMvZnVuY3Rpb24tbWFya2VyLXRyYW5zZm9ybS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVFQUE4QztBQUM5QyxxQ0FBZ0U7QUFFaEUsTUFBcUIsdUJBQXdCLFNBQVEsd0JBQWE7SUFDOUQ7UUFDSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sZUFBZSxDQUFFLENBQVUsRUFBRSxHQUFZO1FBQzVDLE9BQU8sR0FBRyxZQUFZLHVCQUFjLENBQUM7SUFDekMsQ0FBQztJQUVNLGdCQUFnQjtRQUNuQixPQUFPLDZCQUFvQixDQUFDO0lBQ2hDLENBQUM7Q0FDSjtBQVpELDBDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VUcmFuc2Zvcm0gZnJvbSAnLi4vYmFzZS10cmFuc2Zvcm0nO1xuaW1wb3J0IHsgRnVuY3Rpb25NYXJrZXIsIGZ1bmN0aW9uTWFya2VyU3ltYm9sIH0gZnJvbSAnLi9tYXJrZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGdW5jdGlvbk1hcmtlclRyYW5zZm9ybSBleHRlbmRzIEJhc2VUcmFuc2Zvcm0ge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCdGdW5jdGlvbk1hcmtlcicpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG91bGRUcmFuc2Zvcm0gKF86IHVua25vd24sIHZhbDogdW5rbm93bik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgRnVuY3Rpb25NYXJrZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGZyb21TZXJpYWxpemFibGUgKCk6IHVua25vd24ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb25NYXJrZXJTeW1ib2w7XG4gICAgfVxufVxuIl19