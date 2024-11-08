"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_transform_1 = __importDefault(require("./base-transform"));
const role_1 = __importDefault(require("../../../../role/role"));
class RoleTransform extends base_transform_1.default {
    constructor() {
        super('Role');
    }
    shouldTransform(_, val) {
        return val instanceof role_1.default;
    }
    fromSerializable(value) {
        return role_1.default.from(value);
    }
}
exports.default = RoleTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS10cmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2VyaWFsaXphdGlvbi9yZXBsaWNhdG9yL3RyYW5zZm9ybXMvcm9sZS10cmFuc2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBNkM7QUFDN0MsaUVBQXlDO0FBRXpDLE1BQXFCLGFBQWMsU0FBUSx3QkFBYTtJQUNwRDtRQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRU0sZUFBZSxDQUFFLENBQVUsRUFBRSxHQUFZO1FBQzVDLE9BQU8sR0FBRyxZQUFZLGNBQUksQ0FBQztJQUMvQixDQUFDO0lBRU0sZ0JBQWdCLENBQUUsS0FBYztRQUNuQyxPQUFPLGNBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFTLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBWkQsZ0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVRyYW5zZm9ybSBmcm9tICcuL2Jhc2UtdHJhbnNmb3JtJztcbmltcG9ydCBSb2xlIGZyb20gJy4uLy4uLy4uLy4uL3JvbGUvcm9sZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVUcmFuc2Zvcm0gZXh0ZW5kcyBCYXNlVHJhbnNmb3JtIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcignUm9sZScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG91bGRUcmFuc2Zvcm0gKF86IHVua25vd24sIHZhbDogdW5rbm93bik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgUm9sZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZnJvbVNlcmlhbGl6YWJsZSAodmFsdWU6IHVua25vd24pOiBSb2xlIHtcbiAgICAgICAgcmV0dXJuIFJvbGUuZnJvbSh2YWx1ZSkgYXMgUm9sZTtcbiAgICB9XG59XG4iXX0=