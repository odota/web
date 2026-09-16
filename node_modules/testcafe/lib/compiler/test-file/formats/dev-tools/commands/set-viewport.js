"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetViewportCommandTransformer = void 0;
const base_1 = require("./base");
const type_1 = __importDefault(require("../../../../../test-run/commands/type"));
class SetViewportCommandTransformer extends base_1.CommandTransformerBase {
    constructor(step, callsite) {
        super(step, type_1.default.resizeWindow, callsite);
        this.width = step.width;
        this.height = step.height;
    }
    _getAssignableProperties() {
        return ['width', 'height'];
    }
}
exports.SetViewportCommandTransformer = SetViewportCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LXZpZXdwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGVyL3Rlc3QtZmlsZS9mb3JtYXRzL2Rldi10b29scy9jb21tYW5kcy9zZXQtdmlld3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQWdEO0FBRWhELGlGQUF5RDtBQUV6RCxNQUFhLDZCQUE4QixTQUFRLDZCQUFzQjtJQUlyRSxZQUFhLElBQTBCLEVBQUUsUUFBZ0I7UUFDckQsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUVELHdCQUF3QjtRQUNwQixPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQWRELHNFQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBEZXZUb29sc1JlY29yZGVyU3RlcCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBUWVBFIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Rlc3QtcnVuL2NvbW1hbmRzL3R5cGUnO1xuXG5leHBvcnQgY2xhc3MgU2V0Vmlld3BvcnRDb21tYW5kVHJhbnNmb3JtZXIgZXh0ZW5kcyBDb21tYW5kVHJhbnNmb3JtZXJCYXNlIHtcbiAgICBwcml2YXRlIHdpZHRoOiB1bmtub3duO1xuICAgIHByaXZhdGUgaGVpZ2h0OiB1bmtub3duO1xuXG4gICAgY29uc3RydWN0b3IgKHN0ZXA6IERldlRvb2xzUmVjb3JkZXJTdGVwLCBjYWxsc2l0ZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKHN0ZXAsIFRZUEUucmVzaXplV2luZG93LCBjYWxsc2l0ZSk7XG5cbiAgICAgICAgdGhpcy53aWR0aCAgPSBzdGVwLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHN0ZXAuaGVpZ2h0O1xuICAgIH1cblxuICAgIF9nZXRBc3NpZ25hYmxlUHJvcGVydGllcyAoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gWyd3aWR0aCcsICdoZWlnaHQnXTtcbiAgICB9XG59XG4iXX0=