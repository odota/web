"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorCommandTransformerBase = void 0;
const base_1 = require("./base");
class SelectorCommandTransformerBase extends base_1.CommandTransformerBase {
    constructor(step, type, callsite) {
        super(step, type, callsite);
        const selector = this._getCorrectSelector(step);
        if (selector) {
            this.selector = {
                type: 'js-expr',
                value: selector,
            };
        }
    }
    _getAssignableProperties() {
        return ['selector'];
    }
}
exports.SelectorCommandTransformerBase = SelectorCommandTransformerBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3ItYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21waWxlci90ZXN0LWZpbGUvZm9ybWF0cy9kZXYtdG9vbHMvY29tbWFuZHMvc2VsZWN0b3ItYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBZ0Q7QUFHaEQsTUFBYSw4QkFBK0IsU0FBUSw2QkFBc0I7SUFHdEUsWUFBYSxJQUEwQixFQUFFLElBQVksRUFBRSxRQUFnQjtRQUNuRSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEQsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsUUFBUSxHQUFHO2dCQUNaLElBQUksRUFBRyxTQUFTO2dCQUNoQixLQUFLLEVBQUUsUUFBUTthQUNsQixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsd0JBQXdCO1FBQ3BCLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUFuQkQsd0VBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBEZXZUb29sc1JlY29yZGVyU3RlcCB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIFNlbGVjdG9yQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSBleHRlbmRzIENvbW1hbmRUcmFuc2Zvcm1lckJhc2Uge1xuICAgIHByb3RlY3RlZCBzZWxlY3Rvcj86IG9iamVjdCB8IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yIChzdGVwOiBEZXZUb29sc1JlY29yZGVyU3RlcCwgdHlwZTogc3RyaW5nLCBjYWxsc2l0ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKHN0ZXAsIHR5cGUsIGNhbGxzaXRlKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuX2dldENvcnJlY3RTZWxlY3RvcihzdGVwKTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogICdqcy1leHByJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogc2VsZWN0b3IsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBbJ3NlbGVjdG9yJ107XG4gICAgfVxufVxuIl19