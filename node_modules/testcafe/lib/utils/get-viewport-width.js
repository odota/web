"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tty_1 = __importDefault(require("tty"));
const DEFAULT_VIEWPORT_WIDTH_TTY = 78;
function default_1(outStream) {
    if (outStream === process.stdout && tty_1.default.isatty(1)) {
        const detectedViewportWidth = process.stdout.getWindowSize ?
            process.stdout.getWindowSize()[0] :
            tty_1.default.getWindowSize()[1];
        return Math.max(detectedViewportWidth, DEFAULT_VIEWPORT_WIDTH_TTY);
    }
    return Infinity;
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXZpZXdwb3J0LXdpZHRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2dldC12aWV3cG9ydC13aWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUF1QztBQUd2QyxNQUFNLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztBQUV0QyxtQkFBeUIsU0FBaUI7SUFDdEMsSUFBSSxTQUFTLEtBQUssT0FBTyxDQUFDLE1BQU0sSUFBSSxhQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQy9DLE1BQU0scUJBQXFCLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsYUFBOEIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztLQUN0RTtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFWRCw0QkFVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0dHksIHsgV3JpdGVTdHJlYW0gfSBmcm9tICd0dHknO1xuaW1wb3J0IHsgU3RyZWFtIH0gZnJvbSAnc3RyZWFtJztcblxuY29uc3QgREVGQVVMVF9WSUVXUE9SVF9XSURUSF9UVFkgPSA3ODtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG91dFN0cmVhbTogU3RyZWFtKTogbnVtYmVyIHtcbiAgICBpZiAob3V0U3RyZWFtID09PSBwcm9jZXNzLnN0ZG91dCAmJiB0dHkuaXNhdHR5KDEpKSB7XG4gICAgICAgIGNvbnN0IGRldGVjdGVkVmlld3BvcnRXaWR0aCA9IHByb2Nlc3Muc3Rkb3V0LmdldFdpbmRvd1NpemUgP1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQuZ2V0V2luZG93U2l6ZSgpWzBdIDpcbiAgICAgICAgICAgICh0dHkgYXMgdW5rbm93biBhcyBXcml0ZVN0cmVhbSkuZ2V0V2luZG93U2l6ZSgpWzFdO1xuXG4gICAgICAgIHJldHVybiBNYXRoLm1heChkZXRlY3RlZFZpZXdwb3J0V2lkdGgsIERFRkFVTFRfVklFV1BPUlRfV0lEVEhfVFRZKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSW5maW5pdHk7XG59XG4iXX0=