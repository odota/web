"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeCommandTransformer = void 0;
const execute_expression_base_1 = require("./execute-expression-base");
class ChangeCommandTransformer extends execute_expression_base_1.ExecuteExpressionCommandTransformerBase {
    constructor(step, callsite) {
        super(step, callsite);
        const value = this._escapeSpecialCharacters(step.value);
        this.expression = `
            const selector = ${this._getCorrectSelector(step)};
            const { tagName } = await selector();

            if (tagName === 'input' || tagName === 'textarea')
                await t.typeText(selector, '${value}', { replace: true });
            else if (tagName === 'select') {
                await t.click(selector.find('option').filter(option => {
                    return option.value === '${value}';
                }))
            }
        `;
    }
}
exports.ChangeCommandTransformer = ChangeCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGVyL3Rlc3QtZmlsZS9mb3JtYXRzL2Rldi10b29scy9jb21tYW5kcy9jaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUVBQW9GO0FBRXBGLE1BQWEsd0JBQXlCLFNBQVEsaUVBQXVDO0lBQ2pGLFlBQWEsSUFBMEIsRUFBRSxRQUFnQjtRQUNyRCxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXRCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLFVBQVUsR0FBRzsrQkFDSyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDOzs7OzhDQUlmLEtBQUs7OzsrQ0FHSixLQUFLOzs7U0FHM0MsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQW5CRCw0REFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXZUb29sc1JlY29yZGVyU3RlcCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEV4ZWN1dGVFeHByZXNzaW9uQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSB9IGZyb20gJy4vZXhlY3V0ZS1leHByZXNzaW9uLWJhc2UnO1xuXG5leHBvcnQgY2xhc3MgQ2hhbmdlQ29tbWFuZFRyYW5zZm9ybWVyIGV4dGVuZHMgRXhlY3V0ZUV4cHJlc3Npb25Db21tYW5kVHJhbnNmb3JtZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoc3RlcDogRGV2VG9vbHNSZWNvcmRlclN0ZXAsIGNhbGxzaXRlOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoc3RlcCwgY2FsbHNpdGUpO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZXNjYXBlU3BlY2lhbENoYXJhY3RlcnMoc3RlcC52YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gYFxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSAke3RoaXMuX2dldENvcnJlY3RTZWxlY3RvcihzdGVwKX07XG4gICAgICAgICAgICBjb25zdCB7IHRhZ05hbWUgfSA9IGF3YWl0IHNlbGVjdG9yKCk7XG5cbiAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnaW5wdXQnIHx8IHRhZ05hbWUgPT09ICd0ZXh0YXJlYScpXG4gICAgICAgICAgICAgICAgYXdhaXQgdC50eXBlVGV4dChzZWxlY3RvciwgJyR7dmFsdWV9JywgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgZWxzZSBpZiAodGFnTmFtZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0LmNsaWNrKHNlbGVjdG9yLmZpbmQoJ29wdGlvbicpLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlID09PSAnJHt2YWx1ZX0nO1xuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cbn1cbiJdfQ==