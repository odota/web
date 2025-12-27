"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDownCommandTransformer = void 0;
const execute_expression_base_1 = require("./execute-expression-base");
class KeyDownCommandTransformer extends execute_expression_base_1.ExecuteExpressionCommandTransformerBase {
    constructor(step, callsite) {
        super(step, callsite);
        this.expression = `
            await t.dispatchEvent(Selector(() => document.activeElement), 'keydown', { key: '${step.key}'});
            await t.dispatchEvent(Selector(() => document.activeElement), 'keypress', { key: '${step.key}'});
        `;
    }
}
exports.KeyDownCommandTransformer = KeyDownCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LWRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcGlsZXIvdGVzdC1maWxlL2Zvcm1hdHMvZGV2LXRvb2xzL2NvbW1hbmRzL2tleS1kb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVFQUFvRjtBQUdwRixNQUFhLHlCQUEwQixTQUFRLGlFQUF1QztJQUNsRixZQUFhLElBQTBCLEVBQUUsUUFBZ0I7UUFDckQsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV0QixJQUFJLENBQUMsVUFBVSxHQUFHOytGQUNxRSxJQUFJLENBQUMsR0FBRztnR0FDUCxJQUFJLENBQUMsR0FBRztTQUMvRixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBVEQsOERBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeGVjdXRlRXhwcmVzc2lvbkNvbW1hbmRUcmFuc2Zvcm1lckJhc2UgfSBmcm9tICcuL2V4ZWN1dGUtZXhwcmVzc2lvbi1iYXNlJztcbmltcG9ydCB7IERldlRvb2xzUmVjb3JkZXJTdGVwIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgS2V5RG93bkNvbW1hbmRUcmFuc2Zvcm1lciBleHRlbmRzIEV4ZWN1dGVFeHByZXNzaW9uQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKHN0ZXA6IERldlRvb2xzUmVjb3JkZXJTdGVwLCBjYWxsc2l0ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKHN0ZXAsIGNhbGxzaXRlKTtcblxuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBgXG4gICAgICAgICAgICBhd2FpdCB0LmRpc3BhdGNoRXZlbnQoU2VsZWN0b3IoKCkgPT4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCksICdrZXlkb3duJywgeyBrZXk6ICcke3N0ZXAua2V5fSd9KTtcbiAgICAgICAgICAgIGF3YWl0IHQuZGlzcGF0Y2hFdmVudChTZWxlY3RvcigoKSA9PiBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSwgJ2tleXByZXNzJywgeyBrZXk6ICcke3N0ZXAua2V5fSd9KTtcbiAgICAgICAgYDtcbiAgICB9XG59XG4iXX0=