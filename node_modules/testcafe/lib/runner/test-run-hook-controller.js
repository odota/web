"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_test_fn_error_1 = __importDefault(require("../errors/process-test-fn-error"));
const phase_1 = __importDefault(require("../test-run/phase"));
const type_assertions_1 = require("../errors/runtime/type-assertions");
class TestRunHookController {
    constructor(tests, hook) {
        this.beforeFn = hook === null || hook === void 0 ? void 0 : hook.before;
        this.afterFn = hook === null || hook === void 0 ? void 0 : hook.after;
        this.started = false;
        this.runningBeforeHook = false;
        this.beforeHookErr = null;
        this.pendingTestRunCount = tests.length;
        this.testRunCtx = Object.create(null);
        this._assertHooks();
    }
    _assertHooks() {
        if (this.beforeFn)
            (0, type_assertions_1.assertType)(type_assertions_1.is.function, 'globalBefore', 'The testRun.globalBefore hook', this.beforeFn);
        if (this.afterFn)
            (0, type_assertions_1.assertType)(type_assertions_1.is.function, 'globalAfter', 'The testRun.globalAfter hook', this.afterFn);
    }
    isTestBlocked() {
        return this.runningBeforeHook;
    }
    async runTestRunBeforeHookIfNecessary(testRun) {
        const shouldRunBeforeHook = !this.started && this.beforeFn;
        this.started = true;
        if (shouldRunBeforeHook) {
            this.runningBeforeHook = true;
            try {
                await this.beforeFn(this.testRunCtx);
            }
            catch (err) {
                this.beforeHookErr = (0, process_test_fn_error_1.default)(err);
            }
            this.runningBeforeHook = false;
        }
        // NOTE: fail all tests if testRun.before hook has error
        if (this.beforeHookErr) {
            testRun.phase = phase_1.default.inTestRunBeforeHook;
            testRun.addError(this.beforeHookErr);
            return false;
        }
        testRun.testRunCtx = this.testRunCtx;
        return true;
    }
    async runTestRunAfterHookIfNecessary(testRun) {
        this.pendingTestRunCount--;
        if (this.pendingTestRunCount === 0 && this.afterFn) {
            testRun.phase = phase_1.default.inTestRunAfterHook;
            try {
                await this.afterFn(this.testRunCtx);
            }
            catch (err) {
                testRun.addError((0, process_test_fn_error_1.default)(err));
            }
        }
    }
}
exports.default = TestRunHookController;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1ydW4taG9vay1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3J1bm5lci90ZXN0LXJ1bi1ob29rLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0RkFBaUU7QUFFakUsOERBQStDO0FBRS9DLHVFQUFtRTtBQUVuRSxNQUFxQixxQkFBcUI7SUFTdEMsWUFBb0IsS0FBYSxFQUFFLElBQXdCO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQWMsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFlLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBZSxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixHQUFLLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFTLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxHQUFZLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxZQUFZO1FBQ2hCLElBQUksSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFBLDRCQUFVLEVBQUMsb0JBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLCtCQUErQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1RixJQUFJLElBQUksQ0FBQyxPQUFPO1lBQ1osSUFBQSw0QkFBVSxFQUFDLG9CQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSw4QkFBOEIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVNLGFBQWE7UUFDaEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUVNLEtBQUssQ0FBQywrQkFBK0IsQ0FBRSxPQUFnQjtRQUMxRCxNQUFNLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRTNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksbUJBQW1CLEVBQUU7WUFDckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUU5QixJQUFJO2dCQUNBLE1BQU8sSUFBSSxDQUFDLFFBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsT0FBTyxHQUFHLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFBLCtCQUFrQixFQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztTQUNsQztRQUVELHdEQUF3RDtRQUN4RCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsT0FBTyxDQUFDLEtBQUssR0FBRyxlQUFjLENBQUMsbUJBQW1CLENBQUM7WUFFbkQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFckMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFckMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUssQ0FBQyw4QkFBOEIsQ0FBRSxPQUFnQjtRQUN6RCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoRCxPQUFPLENBQUMsS0FBSyxHQUFHLGVBQWMsQ0FBQyxrQkFBa0IsQ0FBQztZQUVsRCxJQUFJO2dCQUNBLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdkM7WUFDRCxPQUFPLEdBQUcsRUFBRTtnQkFDUixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUEsK0JBQWtCLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM3QztTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBL0VELHdDQStFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9jZXNzVGVzdEZuRXJyb3IgZnJvbSAnLi4vZXJyb3JzL3Byb2Nlc3MtdGVzdC1mbi1lcnJvcic7XG5pbXBvcnQgVGVzdCBmcm9tICcuLi9hcGkvc3RydWN0dXJlL3Rlc3QnO1xuaW1wb3J0IFRFU1RfUlVOX1BIQVNFIGZyb20gJy4uL3Rlc3QtcnVuL3BoYXNlJztcbmltcG9ydCBUZXN0UnVuIGZyb20gJy4uL3Rlc3QtcnVuJztcbmltcG9ydCB7IGFzc2VydFR5cGUsIGlzIH0gZnJvbSAnLi4vZXJyb3JzL3J1bnRpbWUvdHlwZS1hc3NlcnRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdFJ1bkhvb2tDb250cm9sbGVyIHtcbiAgICBwdWJsaWMgYmVmb3JlRm4/OiBGdW5jdGlvbjtcbiAgICBwdWJsaWMgYWZ0ZXJGbj86IEZ1bmN0aW9uO1xuICAgIHB1YmxpYyBzdGFydGVkOiBib29sZWFuO1xuICAgIHB1YmxpYyBydW5uaW5nQmVmb3JlSG9vazogYm9vbGVhbjtcbiAgICBwdWJsaWMgYmVmb3JlSG9va0VycjogbnVsbCB8IEVycm9yO1xuICAgIHB1YmxpYyBwZW5kaW5nVGVzdFJ1bkNvdW50OiBudW1iZXI7XG4gICAgcHVibGljIHRlc3RSdW5DdHg6IG9iamVjdDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAodGVzdHM6IFRlc3RbXSwgaG9vaz86IFRlc3RpbmdFbnRyeUhvb2tzKSB7XG4gICAgICAgIHRoaXMuYmVmb3JlRm4gICAgICAgICAgICA9IGhvb2s/LmJlZm9yZTtcbiAgICAgICAgdGhpcy5hZnRlckZuICAgICAgICAgICAgID0gaG9vaz8uYWZ0ZXI7XG4gICAgICAgIHRoaXMuc3RhcnRlZCAgICAgICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJ1bm5pbmdCZWZvcmVIb29rICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iZWZvcmVIb29rRXJyICAgICAgID0gbnVsbDtcbiAgICAgICAgdGhpcy5wZW5kaW5nVGVzdFJ1bkNvdW50ID0gdGVzdHMubGVuZ3RoO1xuICAgICAgICB0aGlzLnRlc3RSdW5DdHggICAgICAgICAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgICAgIHRoaXMuX2Fzc2VydEhvb2tzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYXNzZXJ0SG9va3MgKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5iZWZvcmVGbilcbiAgICAgICAgICAgIGFzc2VydFR5cGUoaXMuZnVuY3Rpb24sICdnbG9iYWxCZWZvcmUnLCAnVGhlIHRlc3RSdW4uZ2xvYmFsQmVmb3JlIGhvb2snLCB0aGlzLmJlZm9yZUZuKTtcblxuICAgICAgICBpZiAodGhpcy5hZnRlckZuKVxuICAgICAgICAgICAgYXNzZXJ0VHlwZShpcy5mdW5jdGlvbiwgJ2dsb2JhbEFmdGVyJywgJ1RoZSB0ZXN0UnVuLmdsb2JhbEFmdGVyIGhvb2snLCB0aGlzLmFmdGVyRm4pO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1Rlc3RCbG9ja2VkICgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVubmluZ0JlZm9yZUhvb2s7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJ1blRlc3RSdW5CZWZvcmVIb29rSWZOZWNlc3NhcnkgKHRlc3RSdW46IFRlc3RSdW4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3Qgc2hvdWxkUnVuQmVmb3JlSG9vayA9ICF0aGlzLnN0YXJ0ZWQgJiYgdGhpcy5iZWZvcmVGbjtcblxuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChzaG91bGRSdW5CZWZvcmVIb29rKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmdCZWZvcmVIb29rID0gdHJ1ZTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCAodGhpcy5iZWZvcmVGbiBhcyBGdW5jdGlvbikodGhpcy50ZXN0UnVuQ3R4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZUhvb2tFcnIgPSBwcm9jZXNzVGVzdEZuRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nQmVmb3JlSG9vayA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTk9URTogZmFpbCBhbGwgdGVzdHMgaWYgdGVzdFJ1bi5iZWZvcmUgaG9vayBoYXMgZXJyb3JcbiAgICAgICAgaWYgKHRoaXMuYmVmb3JlSG9va0Vycikge1xuICAgICAgICAgICAgdGVzdFJ1bi5waGFzZSA9IFRFU1RfUlVOX1BIQVNFLmluVGVzdFJ1bkJlZm9yZUhvb2s7XG5cbiAgICAgICAgICAgIHRlc3RSdW4uYWRkRXJyb3IodGhpcy5iZWZvcmVIb29rRXJyKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGVzdFJ1bi50ZXN0UnVuQ3R4ID0gdGhpcy50ZXN0UnVuQ3R4O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBydW5UZXN0UnVuQWZ0ZXJIb29rSWZOZWNlc3NhcnkgKHRlc3RSdW46IFRlc3RSdW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5wZW5kaW5nVGVzdFJ1bkNvdW50LS07XG5cbiAgICAgICAgaWYgKHRoaXMucGVuZGluZ1Rlc3RSdW5Db3VudCA9PT0gMCAmJiB0aGlzLmFmdGVyRm4pIHtcbiAgICAgICAgICAgIHRlc3RSdW4ucGhhc2UgPSBURVNUX1JVTl9QSEFTRS5pblRlc3RSdW5BZnRlckhvb2s7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hZnRlckZuKHRoaXMudGVzdFJ1bkN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGVzdFJ1bi5hZGRFcnJvcihwcm9jZXNzVGVzdEZuRXJyb3IoZXJyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=