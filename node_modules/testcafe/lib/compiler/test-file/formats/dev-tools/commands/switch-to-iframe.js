"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchToIframeCommandTransformer = void 0;
const type_1 = __importDefault(require("../../../../../test-run/commands/type"));
const selector_base_1 = require("./selector-base");
class SwitchToIframeCommandTransformer extends selector_base_1.SelectorCommandTransformerBase {
    constructor(step, callsite) {
        super(step, type_1.default.switchToIframe, callsite);
    }
    _getCorrectSelector(step) {
        return `Selector(() => { return window.frames[${step.frame}].frameElement; })`;
    }
}
exports.SwitchToIframeCommandTransformer = SwitchToIframeCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXRvLWlmcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21waWxlci90ZXN0LWZpbGUvZm9ybWF0cy9kZXYtdG9vbHMvY29tbWFuZHMvc3dpdGNoLXRvLWlmcmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxpRkFBeUQ7QUFDekQsbURBQWlFO0FBRWpFLE1BQWEsZ0NBQWlDLFNBQVEsOENBQThCO0lBQ2hGLFlBQWEsSUFBMEIsRUFBRSxRQUFnQjtRQUNyRCxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELG1CQUFtQixDQUFFLElBQTBCO1FBQzNDLE9BQU8seUNBQXlDLElBQUksQ0FBQyxLQUFLLG9CQUFvQixDQUFDO0lBQ25GLENBQUM7Q0FDSjtBQVJELDRFQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV2VG9vbHNSZWNvcmRlclN0ZXAgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgVFlQRSBmcm9tICcuLi8uLi8uLi8uLi8uLi90ZXN0LXJ1bi9jb21tYW5kcy90eXBlJztcbmltcG9ydCB7IFNlbGVjdG9yQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSB9IGZyb20gJy4vc2VsZWN0b3ItYmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBTd2l0Y2hUb0lmcmFtZUNvbW1hbmRUcmFuc2Zvcm1lciBleHRlbmRzIFNlbGVjdG9yQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKHN0ZXA6IERldlRvb2xzUmVjb3JkZXJTdGVwLCBjYWxsc2l0ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKHN0ZXAsIFRZUEUuc3dpdGNoVG9JZnJhbWUsIGNhbGxzaXRlKTtcbiAgICB9XG5cbiAgICBfZ2V0Q29ycmVjdFNlbGVjdG9yIChzdGVwOiBEZXZUb29sc1JlY29yZGVyU3RlcCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgU2VsZWN0b3IoKCkgPT4geyByZXR1cm4gd2luZG93LmZyYW1lc1ske3N0ZXAuZnJhbWV9XS5mcmFtZUVsZW1lbnQ7IH0pYDtcbiAgICB9XG59XG4iXX0=