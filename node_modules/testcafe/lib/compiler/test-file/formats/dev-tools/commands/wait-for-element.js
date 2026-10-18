"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitForElementCommandTransformer = void 0;
const execute_expression_base_1 = require("./execute-expression-base");
class WaitForElementCommandTransformer extends execute_expression_base_1.ExecuteExpressionCommandTransformerBase {
    constructor(step, callsite) {
        super(step, callsite);
        this.expression = `
            const selector = ${this._getCorrectSelector(step)};

            await t.expect(selector.count).${this._getOperatorMethodName(step.operator)}(${step.count || 1});
        `;
    }
    _getOperatorMethodName(operator) {
        switch (operator) {
            case '>=': return 'gte';
            case '<=': return 'lte';
            case '==': return 'eql';
        }
        return 'gte';
    }
}
exports.WaitForElementCommandTransformer = WaitForElementCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdC1mb3ItZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21waWxlci90ZXN0LWZpbGUvZm9ybWF0cy9kZXYtdG9vbHMvY29tbWFuZHMvd2FpdC1mb3ItZWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1RUFBb0Y7QUFFcEYsTUFBYSxnQ0FBaUMsU0FBUSxpRUFBdUM7SUFDekYsWUFBYSxJQUEwQixFQUFFLFFBQWdCO1FBQ3JELEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLFVBQVUsR0FBRzsrQkFDSyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDOzs2Q0FFaEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7U0FDakcsQ0FBQztJQUNOLENBQUM7SUFFRCxzQkFBc0IsQ0FBRSxRQUFpQjtRQUNyQyxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUM7WUFDeEIsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQztZQUN4QixLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDO1NBQzNCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKO0FBcEJELDRFQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERldlRvb2xzUmVjb3JkZXJTdGVwIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRXhlY3V0ZUV4cHJlc3Npb25Db21tYW5kVHJhbnNmb3JtZXJCYXNlIH0gZnJvbSAnLi9leGVjdXRlLWV4cHJlc3Npb24tYmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBXYWl0Rm9yRWxlbWVudENvbW1hbmRUcmFuc2Zvcm1lciBleHRlbmRzIEV4ZWN1dGVFeHByZXNzaW9uQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKHN0ZXA6IERldlRvb2xzUmVjb3JkZXJTdGVwLCBjYWxsc2l0ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKHN0ZXAsIGNhbGxzaXRlKTtcblxuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBgXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9ICR7dGhpcy5fZ2V0Q29ycmVjdFNlbGVjdG9yKHN0ZXApfTtcblxuICAgICAgICAgICAgYXdhaXQgdC5leHBlY3Qoc2VsZWN0b3IuY291bnQpLiR7dGhpcy5fZ2V0T3BlcmF0b3JNZXRob2ROYW1lKHN0ZXAub3BlcmF0b3IpfSgke3N0ZXAuY291bnQgfHwgMX0pO1xuICAgICAgICBgO1xuICAgIH1cblxuICAgIF9nZXRPcGVyYXRvck1ldGhvZE5hbWUgKG9wZXJhdG9yPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgICAgICAgICAgY2FzZSAnPj0nOiByZXR1cm4gJ2d0ZSc7XG4gICAgICAgICAgICBjYXNlICc8PSc6IHJldHVybiAnbHRlJztcbiAgICAgICAgICAgIGNhc2UgJz09JzogcmV0dXJuICdlcWwnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICdndGUnO1xuICAgIH1cbn1cbiJdfQ==