"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_transform_1 = __importDefault(require("../base-transform"));
const marker_1 = require("./marker");
class PromiseMarkerTransform extends base_transform_1.default {
    constructor() {
        super('PromiseMarker');
    }
    shouldTransform(_, val) {
        return val instanceof marker_1.PromiseMarker;
    }
    fromSerializable() {
        return marker_1.promiseMarkerSymbol;
    }
}
exports.default = PromiseMarkerTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2VyaWFsaXphdGlvbi9yZXBsaWNhdG9yL3RyYW5zZm9ybXMvcHJvbWlzZS1tYXJrZXItdHJhbnNmb3JtL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUVBQThDO0FBQzlDLHFDQUE4RDtBQUU5RCxNQUFxQixzQkFBdUIsU0FBUSx3QkFBYTtJQUM3RDtRQUNJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sZUFBZSxDQUFFLENBQVUsRUFBRSxHQUFZO1FBQzVDLE9BQU8sR0FBRyxZQUFZLHNCQUFhLENBQUM7SUFDeEMsQ0FBQztJQUVNLGdCQUFnQjtRQUNuQixPQUFPLDRCQUFtQixDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQVpELHlDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VUcmFuc2Zvcm0gZnJvbSAnLi4vYmFzZS10cmFuc2Zvcm0nO1xuaW1wb3J0IHsgUHJvbWlzZU1hcmtlciwgcHJvbWlzZU1hcmtlclN5bWJvbCB9IGZyb20gJy4vbWFya2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvbWlzZU1hcmtlclRyYW5zZm9ybSBleHRlbmRzIEJhc2VUcmFuc2Zvcm0ge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCdQcm9taXNlTWFya2VyJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3VsZFRyYW5zZm9ybSAoXzogdW5rbm93biwgdmFsOiB1bmtub3duKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBQcm9taXNlTWFya2VyO1xuICAgIH1cblxuICAgIHB1YmxpYyBmcm9tU2VyaWFsaXphYmxlICgpOiB1bmtub3duIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VNYXJrZXJTeW1ib2w7XG4gICAgfVxufVxuIl19