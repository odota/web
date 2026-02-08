"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const log_entry_1 = __importDefault(require("../utils/log-entry"));
class TestRunDebugLog {
    constructor(userAgent) {
        this.driverMessageLogger = (0, debug_1.default)(`testcafe:test-run:${userAgent}:driver-message`);
        this.commandLogger = (0, debug_1.default)(`testcafe:test-run:${userAgent}:command`);
    }
    static _addEntry(logger, data) {
        (0, log_entry_1.default)(logger, data);
    }
    driverMessage(msg) {
        TestRunDebugLog._addEntry(this.driverMessageLogger, msg);
    }
    command(cmd) {
        TestRunDebugLog._addEntry(this.commandLogger, cmd);
    }
}
exports.default = TestRunDebugLog;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3QtcnVuL2RlYnVnLWxvZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUFnQztBQUNoQyxtRUFBMEM7QUFFMUMsTUFBcUIsZUFBZTtJQUNoQyxZQUFhLFNBQVM7UUFDbEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUEsZUFBVyxFQUFDLHFCQUFxQixTQUFTLGlCQUFpQixDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLGFBQWEsR0FBUyxJQUFBLGVBQVcsRUFBQyxxQkFBcUIsU0FBUyxVQUFVLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBRSxNQUFNLEVBQUUsSUFBSTtRQUMxQixJQUFBLG1CQUFRLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxhQUFhLENBQUUsR0FBRztRQUNkLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxPQUFPLENBQUUsR0FBRztRQUNSLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0o7QUFqQkQsa0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlYnVnTG9nZ2VyIGZyb20gJ2RlYnVnJztcbmltcG9ydCBsb2dFbnRyeSBmcm9tICcuLi91dGlscy9sb2ctZW50cnknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0UnVuRGVidWdMb2cge1xuICAgIGNvbnN0cnVjdG9yICh1c2VyQWdlbnQpIHtcbiAgICAgICAgdGhpcy5kcml2ZXJNZXNzYWdlTG9nZ2VyID0gZGVidWdMb2dnZXIoYHRlc3RjYWZlOnRlc3QtcnVuOiR7dXNlckFnZW50fTpkcml2ZXItbWVzc2FnZWApO1xuICAgICAgICB0aGlzLmNvbW1hbmRMb2dnZXIgICAgICAgPSBkZWJ1Z0xvZ2dlcihgdGVzdGNhZmU6dGVzdC1ydW46JHt1c2VyQWdlbnR9OmNvbW1hbmRgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX2FkZEVudHJ5IChsb2dnZXIsIGRhdGEpIHtcbiAgICAgICAgbG9nRW50cnkobG9nZ2VyLCBkYXRhKTtcbiAgICB9XG5cbiAgICBkcml2ZXJNZXNzYWdlIChtc2cpIHtcbiAgICAgICAgVGVzdFJ1bkRlYnVnTG9nLl9hZGRFbnRyeSh0aGlzLmRyaXZlck1lc3NhZ2VMb2dnZXIsIG1zZyk7XG4gICAgfVxuXG4gICAgY29tbWFuZCAoY21kKSB7XG4gICAgICAgIFRlc3RSdW5EZWJ1Z0xvZy5fYWRkRW50cnkodGhpcy5jb21tYW5kTG9nZ2VyLCBjbWQpO1xuICAgIH1cbn1cbiJdfQ==