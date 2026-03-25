"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteExpressionCommandTransformerBase = void 0;
const base_1 = require("./base");
const type_1 = __importDefault(require("../../../../../test-run/commands/type"));
class ExecuteExpressionCommandTransformerBase extends base_1.CommandTransformerBase {
    constructor(step, callsite) {
        super(step, type_1.default.executeAsyncExpression, callsite);
        this.expression = '';
    }
    _getAssignableProperties() {
        return ['expression'];
    }
}
exports.ExecuteExpressionCommandTransformerBase = ExecuteExpressionCommandTransformerBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZS1leHByZXNzaW9uLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcGlsZXIvdGVzdC1maWxlL2Zvcm1hdHMvZGV2LXRvb2xzL2NvbW1hbmRzL2V4ZWN1dGUtZXhwcmVzc2lvbi1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUFnRDtBQUVoRCxpRkFBeUQ7QUFFekQsTUFBYSx1Q0FBd0MsU0FBUSw2QkFBc0I7SUFHL0UsWUFBYSxJQUEwQixFQUFFLFFBQWdCO1FBQ3JELEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBSSxDQUFDLHNCQUFzQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBSDdDLGVBQVUsR0FBRyxFQUFFLENBQUM7SUFJMUIsQ0FBQztJQUVELHdCQUF3QjtRQUNwQixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNKO0FBVkQsMEZBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kVHJhbnNmb3JtZXJCYXNlIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IERldlRvb2xzUmVjb3JkZXJTdGVwIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFRZUEUgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdGVzdC1ydW4vY29tbWFuZHMvdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBFeGVjdXRlRXhwcmVzc2lvbkNvbW1hbmRUcmFuc2Zvcm1lckJhc2UgZXh0ZW5kcyBDb21tYW5kVHJhbnNmb3JtZXJCYXNlIHtcbiAgICBwcm90ZWN0ZWQgZXhwcmVzc2lvbiA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IgKHN0ZXA6IERldlRvb2xzUmVjb3JkZXJTdGVwLCBjYWxsc2l0ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKHN0ZXAsIFRZUEUuZXhlY3V0ZUFzeW5jRXhwcmVzc2lvbiwgY2FsbHNpdGUpO1xuICAgIH1cblxuICAgIF9nZXRBc3NpZ25hYmxlUHJvcGVydGllcyAoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gWydleHByZXNzaW9uJ107XG4gICAgfVxufVxuIl19