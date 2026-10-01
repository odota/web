"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("../../errors/runtime");
const types_1 = require("../../errors/types");
function default_1(optionName, value) {
    if (value === void 0)
        return value;
    try {
        return new RegExp(value);
    }
    catch (err) {
        throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.optionValueIsNotValidRegExp, optionName);
    }
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9nZXQtb3B0aW9ucy9ncmVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQW9EO0FBQ3BELDhDQUFvRDtBQUVwRCxtQkFBeUIsVUFBa0IsRUFBRSxLQUFhO0lBQ3RELElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQztRQUNoQixPQUFPLEtBQUssQ0FBQztJQUVqQixJQUFJO1FBQ0EsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sR0FBRyxFQUFFO1FBQ1IsTUFBTSxJQUFJLHNCQUFZLENBQUMsc0JBQWMsQ0FBQywyQkFBMkIsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNsRjtBQUNMLENBQUM7QUFWRCw0QkFVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdlbmVyYWxFcnJvciB9IGZyb20gJy4uLy4uL2Vycm9ycy9ydW50aW1lJztcbmltcG9ydCB7IFJVTlRJTUVfRVJST1JTIH0gZnJvbSAnLi4vLi4vZXJyb3JzL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbk5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFJlZ0V4cCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHZhbHVlID09PSB2b2lkIDApXG4gICAgICAgIHJldHVybiB2YWx1ZTtcblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICB0aHJvdyBuZXcgR2VuZXJhbEVycm9yKFJVTlRJTUVfRVJST1JTLm9wdGlvblZhbHVlSXNOb3RWYWxpZFJlZ0V4cCwgb3B0aW9uTmFtZSk7XG4gICAgfVxufVxuIl19