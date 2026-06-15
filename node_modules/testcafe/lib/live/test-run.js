"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRunCtorFactory = void 0;
const test_run_1 = __importDefault(require("../test-run"));
const test_run_state_1 = __importDefault(require("./test-run-state"));
const type_1 = __importDefault(require("../test-run/commands/type"));
const service_1 = require("../test-run/commands/service");
const TEST_RUN_ABORTED_MESSAGE = 'The test run has been aborted.';
const TestRunCtorFactory = function (callbacks) {
    const { created, done, readyToNext } = callbacks;
    return class LiveModeTestRun extends test_run_1.default {
        constructor(test, browserConnection, screenshotCapturer, warningLog, opts) {
            super(test, browserConnection, screenshotCapturer, warningLog, opts);
            created(this, test);
            this.state = test_run_state_1.default.created;
            this.finish = null;
            this.stopping = false;
            this.isInRoleInitializing = false;
            this.stopped = false;
        }
        stop() {
            this.stopped = true;
        }
        _useRole(...args) {
            this.isInRoleInitializing = true;
            return super._useRole.apply(this, args)
                .then(res => {
                this.isInRoleInitializing = false;
                return res;
            })
                .catch(err => {
                this.isInRoleInitializing = false;
                throw err;
            });
        }
        _internalExecuteCommand(commandToExec, callsite, forced) {
            // NOTE: don't close the page and the session when the last test in the queue is done
            if (commandToExec.type === type_1.default.testDone && !forced) {
                done(this, this.stopped)
                    .then(() => this._internalExecuteCommand(commandToExec, callsite, true))
                    .then(() => readyToNext(this));
                this._internalExecuteCommand(new service_1.UnlockPageCommand(), null);
                return Promise.resolve();
            }
            if (this.stopped && !this.stopping &&
                !this.isInRoleInitializing) {
                this.stopping = true;
                return Promise.reject(new Error(TEST_RUN_ABORTED_MESSAGE));
            }
            return super._internalExecuteCommand(commandToExec, callsite);
        }
    };
};
exports.TestRunCtorFactory = TestRunCtorFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1ydW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGl2ZS90ZXN0LXJ1bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyREFBa0M7QUFDbEMsc0VBQThDO0FBQzlDLHFFQUFxRDtBQUNyRCwwREFBaUU7QUFFakUsTUFBTSx3QkFBd0IsR0FBRyxnQ0FBZ0MsQ0FBQztBQUUzRCxNQUFNLGtCQUFrQixHQUFHLFVBQVUsU0FBUztJQUNqRCxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFFakQsT0FBTyxNQUFNLGVBQWdCLFNBQVEsa0JBQU87UUFDeEMsWUFBYSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLElBQUk7WUFDdEUsS0FBSyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFckUsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVwQixJQUFJLENBQUMsS0FBSyxHQUFrQix3QkFBYyxDQUFDLE9BQU8sQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFpQixJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBZSxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFnQixLQUFLLENBQUM7UUFDdEMsQ0FBQztRQUVELElBQUk7WUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDO1FBRUQsUUFBUSxDQUFFLEdBQUcsSUFBSTtZQUNiLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFFakMsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2lCQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztnQkFFbEMsT0FBTyxHQUFHLENBQUM7WUFDZixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNULElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7Z0JBRWxDLE1BQU0sR0FBRyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsdUJBQXVCLENBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNO1lBQ3BELHFGQUFxRjtZQUNyRixJQUFJLGFBQWEsQ0FBQyxJQUFJLEtBQUssY0FBWSxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDekQsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO3FCQUNuQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3ZFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFbkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksMkJBQWlCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFNUQsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDNUI7WUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFDOUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUVyQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO2FBQzlEO1lBRUQsT0FBTyxLQUFLLENBQUMsdUJBQXVCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBMURXLFFBQUEsa0JBQWtCLHNCQTBEN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGVzdFJ1biBmcm9tICcuLi90ZXN0LXJ1bic7XG5pbXBvcnQgVEVTVF9SVU5fU1RBVEUgZnJvbSAnLi90ZXN0LXJ1bi1zdGF0ZSc7XG5pbXBvcnQgQ09NTUFORF9UWVBFIGZyb20gJy4uL3Rlc3QtcnVuL2NvbW1hbmRzL3R5cGUnO1xuaW1wb3J0IHsgVW5sb2NrUGFnZUNvbW1hbmQgfSBmcm9tICcuLi90ZXN0LXJ1bi9jb21tYW5kcy9zZXJ2aWNlJztcblxuY29uc3QgVEVTVF9SVU5fQUJPUlRFRF9NRVNTQUdFID0gJ1RoZSB0ZXN0IHJ1biBoYXMgYmVlbiBhYm9ydGVkLic7XG5cbmV4cG9ydCBjb25zdCBUZXN0UnVuQ3RvckZhY3RvcnkgPSBmdW5jdGlvbiAoY2FsbGJhY2tzKSB7XG4gICAgY29uc3QgeyBjcmVhdGVkLCBkb25lLCByZWFkeVRvTmV4dCB9ID0gY2FsbGJhY2tzO1xuXG4gICAgcmV0dXJuIGNsYXNzIExpdmVNb2RlVGVzdFJ1biBleHRlbmRzIFRlc3RSdW4ge1xuICAgICAgICBjb25zdHJ1Y3RvciAodGVzdCwgYnJvd3NlckNvbm5lY3Rpb24sIHNjcmVlbnNob3RDYXB0dXJlciwgd2FybmluZ0xvZywgb3B0cykge1xuICAgICAgICAgICAgc3VwZXIodGVzdCwgYnJvd3NlckNvbm5lY3Rpb24sIHNjcmVlbnNob3RDYXB0dXJlciwgd2FybmluZ0xvZywgb3B0cyk7XG5cbiAgICAgICAgICAgIGNyZWF0ZWQodGhpcywgdGVzdCk7XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGUgICAgICAgICAgICAgICAgPSBURVNUX1JVTl9TVEFURS5jcmVhdGVkO1xuICAgICAgICAgICAgdGhpcy5maW5pc2ggICAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnN0b3BwaW5nICAgICAgICAgICAgID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzSW5Sb2xlSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0b3BwZWQgICAgICAgICAgICAgID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9wICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBfdXNlUm9sZSAoLi4uYXJncykge1xuICAgICAgICAgICAgdGhpcy5pc0luUm9sZUluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHJldHVybiBzdXBlci5fdXNlUm9sZS5hcHBseSh0aGlzLCBhcmdzKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJblJvbGVJbml0aWFsaXppbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJblJvbGVJbml0aWFsaXppbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBfaW50ZXJuYWxFeGVjdXRlQ29tbWFuZCAoY29tbWFuZFRvRXhlYywgY2FsbHNpdGUsIGZvcmNlZCkge1xuICAgICAgICAgICAgLy8gTk9URTogZG9uJ3QgY2xvc2UgdGhlIHBhZ2UgYW5kIHRoZSBzZXNzaW9uIHdoZW4gdGhlIGxhc3QgdGVzdCBpbiB0aGUgcXVldWUgaXMgZG9uZVxuICAgICAgICAgICAgaWYgKGNvbW1hbmRUb0V4ZWMudHlwZSA9PT0gQ09NTUFORF9UWVBFLnRlc3REb25lICYmICFmb3JjZWQpIHtcbiAgICAgICAgICAgICAgICBkb25lKHRoaXMsIHRoaXMuc3RvcHBlZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5faW50ZXJuYWxFeGVjdXRlQ29tbWFuZChjb21tYW5kVG9FeGVjLCBjYWxsc2l0ZSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHJlYWR5VG9OZXh0KHRoaXMpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVybmFsRXhlY3V0ZUNvbW1hbmQobmV3IFVubG9ja1BhZ2VDb21tYW5kKCksIG51bGwpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wcGVkICYmICF0aGlzLnN0b3BwaW5nICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuaXNJblJvbGVJbml0aWFsaXppbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BwaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoVEVTVF9SVU5fQUJPUlRFRF9NRVNTQUdFKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdXBlci5faW50ZXJuYWxFeGVjdXRlQ29tbWFuZChjb21tYW5kVG9FeGVjLCBjYWxsc2l0ZSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiJdfQ==