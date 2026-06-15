"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollCommandTransformer = void 0;
const type_1 = __importDefault(require("../../../../../test-run/commands/type"));
const selector_base_1 = require("./selector-base");
class ScrollCommandTransformer extends selector_base_1.SelectorCommandTransformerBase {
    constructor(step, callsite) {
        super(step, type_1.default.scroll, callsite);
        if (!this.selector)
            this.selector = 'html';
        if (step.x)
            this.x = Math.floor(step.x);
        if (step.y)
            this.y = Math.floor(step.y);
    }
    _getAssignableProperties() {
        return super._getAssignableProperties().concat(['x', 'y']);
    }
}
exports.ScrollCommandTransformer = ScrollCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGVyL3Rlc3QtZmlsZS9mb3JtYXRzL2Rldi10b29scy9jb21tYW5kcy9zY3JvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsaUZBQXlEO0FBQ3pELG1EQUFpRTtBQUVqRSxNQUFhLHdCQUF5QixTQUFRLDhDQUE4QjtJQUl4RSxZQUFhLElBQTBCLEVBQUUsUUFBZ0I7UUFDckQsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBRTNCLElBQUksSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhDLElBQUksSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx3QkFBd0I7UUFDcEIsT0FBTyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0o7QUFwQkQsNERBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV2VG9vbHNSZWNvcmRlclN0ZXAgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgVFlQRSBmcm9tICcuLi8uLi8uLi8uLi8uLi90ZXN0LXJ1bi9jb21tYW5kcy90eXBlJztcbmltcG9ydCB7IFNlbGVjdG9yQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSB9IGZyb20gJy4vc2VsZWN0b3ItYmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBTY3JvbGxDb21tYW5kVHJhbnNmb3JtZXIgZXh0ZW5kcyBTZWxlY3RvckNvbW1hbmRUcmFuc2Zvcm1lckJhc2Uge1xuICAgIHByaXZhdGUgeD86IG51bWJlcjtcbiAgICBwcml2YXRlIHk/OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvciAoc3RlcDogRGV2VG9vbHNSZWNvcmRlclN0ZXAsIGNhbGxzaXRlOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoc3RlcCwgVFlQRS5zY3JvbGwsIGNhbGxzaXRlKTtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0b3IpXG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yID0gJ2h0bWwnO1xuXG4gICAgICAgIGlmIChzdGVwLngpXG4gICAgICAgICAgICB0aGlzLnggPSBNYXRoLmZsb29yKHN0ZXAueCk7XG5cbiAgICAgICAgaWYgKHN0ZXAueSlcbiAgICAgICAgICAgIHRoaXMueSA9IE1hdGguZmxvb3Ioc3RlcC55KTtcbiAgICB9XG5cbiAgICBfZ2V0QXNzaWduYWJsZVByb3BlcnRpZXMgKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLl9nZXRBc3NpZ25hYmxlUHJvcGVydGllcygpLmNvbmNhdChbJ3gnLCAneSddKTtcbiAgICB9XG59XG4iXX0=