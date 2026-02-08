"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverCommandTransformer = void 0;
const type_1 = __importDefault(require("../../../../../test-run/commands/type"));
const selector_base_1 = require("./selector-base");
class HoverCommandTransformer extends selector_base_1.SelectorCommandTransformerBase {
    constructor(step, callsite) {
        super(step, type_1.default.hover, callsite);
    }
}
exports.HoverCommandTransformer = HoverCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcGlsZXIvdGVzdC1maWxlL2Zvcm1hdHMvZGV2LXRvb2xzL2NvbW1hbmRzL2hvdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGlGQUF5RDtBQUN6RCxtREFBaUU7QUFFakUsTUFBYSx1QkFBd0IsU0FBUSw4Q0FBOEI7SUFDdkUsWUFBYSxJQUEwQixFQUFFLFFBQWdCO1FBQ3JELEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0o7QUFKRCwwREFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERldlRvb2xzUmVjb3JkZXJTdGVwIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFRZUEUgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdGVzdC1ydW4vY29tbWFuZHMvdHlwZSc7XG5pbXBvcnQgeyBTZWxlY3RvckNvbW1hbmRUcmFuc2Zvcm1lckJhc2UgfSBmcm9tICcuL3NlbGVjdG9yLWJhc2UnO1xuXG5leHBvcnQgY2xhc3MgSG92ZXJDb21tYW5kVHJhbnNmb3JtZXIgZXh0ZW5kcyBTZWxlY3RvckNvbW1hbmRUcmFuc2Zvcm1lckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yIChzdGVwOiBEZXZUb29sc1JlY29yZGVyU3RlcCwgY2FsbHNpdGU6IG51bWJlcikge1xuICAgICAgICBzdXBlcihzdGVwLCBUWVBFLmhvdmVyLCBjYWxsc2l0ZSk7XG4gICAgfVxufVxuIl19