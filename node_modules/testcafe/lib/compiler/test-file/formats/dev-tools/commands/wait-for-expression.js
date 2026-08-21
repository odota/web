"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitForExpressionCommandTransformer = void 0;
const execute_expression_base_1 = require("./execute-expression-base");
class WaitForExpressionCommandTransformer extends execute_expression_base_1.ExecuteExpressionCommandTransformerBase {
    constructor(step, callsite) {
        super(step, callsite);
        this.expression = `
            const fn = ClientFunction(() => {
                return ${step.expression}
            });

            await t.expect(fn()).eql(true);
        `;
    }
}
exports.WaitForExpressionCommandTransformer = WaitForExpressionCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdC1mb3ItZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21waWxlci90ZXN0LWZpbGUvZm9ybWF0cy9kZXYtdG9vbHMvY29tbWFuZHMvd2FpdC1mb3ItZXhwcmVzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1RUFBb0Y7QUFHcEYsTUFBYSxtQ0FBb0MsU0FBUSxpRUFBdUM7SUFDNUYsWUFBYSxJQUEwQixFQUFFLFFBQWdCO1FBQ3JELEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLFVBQVUsR0FBRzs7eUJBRUQsSUFBSSxDQUFDLFVBQVU7Ozs7U0FJL0IsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVpELGtGQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhlY3V0ZUV4cHJlc3Npb25Db21tYW5kVHJhbnNmb3JtZXJCYXNlIH0gZnJvbSAnLi9leGVjdXRlLWV4cHJlc3Npb24tYmFzZSc7XG5pbXBvcnQgeyBEZXZUb29sc1JlY29yZGVyU3RlcCB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIFdhaXRGb3JFeHByZXNzaW9uQ29tbWFuZFRyYW5zZm9ybWVyIGV4dGVuZHMgRXhlY3V0ZUV4cHJlc3Npb25Db21tYW5kVHJhbnNmb3JtZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoc3RlcDogRGV2VG9vbHNSZWNvcmRlclN0ZXAsIGNhbGxzaXRlOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoc3RlcCwgY2FsbHNpdGUpO1xuXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbiA9IGBcbiAgICAgICAgICAgIGNvbnN0IGZuID0gQ2xpZW50RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAke3N0ZXAuZXhwcmVzc2lvbn1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCB0LmV4cGVjdChmbigpKS5lcWwodHJ1ZSk7XG4gICAgICAgIGA7XG4gICAgfVxufVxuIl19