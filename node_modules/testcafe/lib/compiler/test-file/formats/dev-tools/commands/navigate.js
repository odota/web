"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigateCommandTransformer = void 0;
const base_1 = require("./base");
const type_1 = __importDefault(require("../../../../../test-run/commands/type"));
class NavigateCommandTransformer extends base_1.CommandTransformerBase {
    constructor(step, callsite) {
        super(step, type_1.default.navigateTo, callsite);
        this.url = step.url;
    }
    _getAssignableProperties() {
        return ['url'];
    }
}
exports.NavigateCommandTransformer = NavigateCommandTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcGlsZXIvdGVzdC1maWxlL2Zvcm1hdHMvZGV2LXRvb2xzL2NvbW1hbmRzL25hdmlnYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUFnRDtBQUVoRCxpRkFBeUQ7QUFFekQsTUFBYSwwQkFBMkIsU0FBUSw2QkFBc0I7SUFHbEUsWUFBYSxJQUEwQixFQUFFLFFBQWdCO1FBQ3JELEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFhLENBQUM7SUFDbEMsQ0FBQztJQUVELHdCQUF3QjtRQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBWkQsZ0VBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kVHJhbnNmb3JtZXJCYXNlIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IERldlRvb2xzUmVjb3JkZXJTdGVwIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFRZUEUgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdGVzdC1ydW4vY29tbWFuZHMvdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0ZUNvbW1hbmRUcmFuc2Zvcm1lciBleHRlbmRzIENvbW1hbmRUcmFuc2Zvcm1lckJhc2Uge1xuICAgIHByaXZhdGUgdXJsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvciAoc3RlcDogRGV2VG9vbHNSZWNvcmRlclN0ZXAsIGNhbGxzaXRlOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoc3RlcCwgVFlQRS5uYXZpZ2F0ZVRvLCBjYWxsc2l0ZSk7XG5cbiAgICAgICAgdGhpcy51cmwgPSBzdGVwLnVybCBhcyBzdHJpbmc7XG4gICAgfVxuXG4gICAgX2dldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBbJ3VybCddO1xuICAgIH1cbn1cbiJdfQ==