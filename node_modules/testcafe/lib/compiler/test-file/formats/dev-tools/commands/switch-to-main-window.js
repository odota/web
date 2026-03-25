"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchToMainWindowCommandTransformer = void 0;
const type_1 = __importDefault(require("../../../../../test-run/commands/type"));
const base_1 = require("./base");
class SwitchToMainWindowCommandTransformer extends base_1.CommandTransformerBase {
    constructor(step, callsite) {
        super(step, type_1.default.switchToMainWindow, callsite);
    }
}
exports.SwitchToMainWindowCommandTransformer = SwitchToMainWindowCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXRvLW1haW4td2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGVyL3Rlc3QtZmlsZS9mb3JtYXRzL2Rldi10b29scy9jb21tYW5kcy9zd2l0Y2gtdG8tbWFpbi13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQXlEO0FBRXpELGlDQUFnRDtBQUVoRCxNQUFhLG9DQUFxQyxTQUFRLDZCQUFzQjtJQUM1RSxZQUFhLElBQTBCLEVBQUUsUUFBZ0I7UUFDckQsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFJLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNKO0FBSkQsb0ZBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVFlQRSBmcm9tICcuLi8uLi8uLi8uLi8uLi90ZXN0LXJ1bi9jb21tYW5kcy90eXBlJztcbmltcG9ydCB7IERldlRvb2xzUmVjb3JkZXJTdGVwIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ29tbWFuZFRyYW5zZm9ybWVyQmFzZSB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBTd2l0Y2hUb01haW5XaW5kb3dDb21tYW5kVHJhbnNmb3JtZXIgZXh0ZW5kcyBDb21tYW5kVHJhbnNmb3JtZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoc3RlcDogRGV2VG9vbHNSZWNvcmRlclN0ZXAsIGNhbGxzaXRlOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoc3RlcCwgVFlQRS5zd2l0Y2hUb01haW5XaW5kb3csIGNhbGxzaXRlKTtcbiAgICB9XG59XG4iXX0=