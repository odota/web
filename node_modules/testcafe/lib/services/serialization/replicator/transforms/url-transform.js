"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_transform_1 = __importDefault(require("./base-transform"));
class URLTransform extends base_transform_1.default {
    constructor() {
        super('URL');
    }
    shouldTransform(_, val) {
        return val instanceof URL;
    }
    toSerializable(value) {
        return value.toString();
    }
    fromSerializable(value) {
        return new URL(value);
    }
}
exports.default = URLTransform;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLXRyYW5zZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zZXJpYWxpemF0aW9uL3JlcGxpY2F0b3IvdHJhbnNmb3Jtcy91cmwtdHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQTZDO0FBRTdDLE1BQXFCLFlBQWEsU0FBUSx3QkFBYTtJQUNuRDtRQUNJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRU0sZUFBZSxDQUFFLENBQVUsRUFBRSxHQUFZO1FBQzVDLE9BQU8sR0FBRyxZQUFZLEdBQUcsQ0FBQztJQUM5QixDQUFDO0lBRU0sY0FBYyxDQUFFLEtBQVU7UUFDN0IsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLGdCQUFnQixDQUFFLEtBQWE7UUFDbEMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0o7QUFoQkQsK0JBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VUcmFuc2Zvcm0gZnJvbSAnLi9iYXNlLXRyYW5zZm9ybSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVSTFRyYW5zZm9ybSBleHRlbmRzIEJhc2VUcmFuc2Zvcm0ge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCdVUkwnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdWxkVHJhbnNmb3JtIChfOiB1bmtub3duLCB2YWw6IHVua25vd24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIFVSTDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TZXJpYWxpemFibGUgKHZhbHVlOiBVUkwpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZnJvbVNlcmlhbGl6YWJsZSAodmFsdWU6IHN0cmluZyk6IFVSTCB7XG4gICAgICAgIHJldHVybiBuZXcgVVJMKHZhbHVlKTtcbiAgICB9XG59XG4iXX0=