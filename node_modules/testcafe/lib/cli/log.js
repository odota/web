"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tty_1 = __importDefault(require("tty"));
const elegant_spinner_1 = __importDefault(require("elegant-spinner"));
const log_update_async_hook_1 = __importDefault(require("log-update-async-hook"));
const chalk_1 = __importDefault(require("chalk"));
const is_ci_1 = __importDefault(require("is-ci"));
// NOTE: To support piping, we use stderr as the log output
// stream, while stdout is used for the report output.
exports.default = {
    animation: null,
    isAnimated: tty_1.default.isatty(1) && !is_ci_1.default,
    showSpinner() {
        // NOTE: we can use the spinner only if stdout is a TTY and we are not in CI environment (e.g. TravisCI),
        // otherwise we can't repaint animation frames. Thanks https://github.com/sindresorhus/ora for insight.
        if (this.isAnimated) {
            const spinnerFrame = (0, elegant_spinner_1.default)();
            this.animation = setInterval(() => {
                const frame = chalk_1.default.cyan(spinnerFrame());
                (0, log_update_async_hook_1.default)(frame);
            }, 50);
        }
    },
    hideSpinner(isExit) {
        if (this.animation) {
            clearInterval(this.animation);
            log_update_async_hook_1.default.clear();
            if (isExit)
                log_update_async_hook_1.default.done();
            this.animation = null;
        }
    },
    write(text) {
        if (this.animation)
            this.hideSpinner();
        console.log(text);
        if (this.animation)
            this.showSpinner();
    },
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFDdEIsc0VBQTZDO0FBQzdDLGtGQUE4QztBQUM5QyxrREFBMEI7QUFDMUIsa0RBQXlCO0FBRXpCLDJEQUEyRDtBQUMzRCxzREFBc0Q7QUFDdEQsa0JBQWU7SUFDWCxTQUFTLEVBQUcsSUFBSTtJQUNoQixVQUFVLEVBQUUsYUFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUk7SUFFbEMsV0FBVztRQUNQLHlHQUF5RztRQUN6Ryx1R0FBdUc7UUFDdkcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE1BQU0sWUFBWSxHQUFHLElBQUEseUJBQWMsR0FBRSxDQUFDO1lBRXRDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDOUIsTUFBTSxLQUFLLEdBQUcsZUFBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2dCQUV6QyxJQUFBLCtCQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFFLE1BQU07UUFDZixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QiwrQkFBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWxCLElBQUksTUFBTTtnQkFDTiwrQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXJCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBRSxJQUFJO1FBQ1AsSUFBSSxJQUFJLENBQUMsU0FBUztZQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUksSUFBSSxDQUFDLFNBQVM7WUFDZCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHR5IGZyb20gJ3R0eSc7XG5pbXBvcnQgZWxlZ2FudFNwaW5uZXIgZnJvbSAnZWxlZ2FudC1zcGlubmVyJztcbmltcG9ydCBsb2dVcGRhdGUgZnJvbSAnbG9nLXVwZGF0ZS1hc3luYy1ob29rJztcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgaXNDSSBmcm9tICdpcy1jaSc7XG5cbi8vIE5PVEU6IFRvIHN1cHBvcnQgcGlwaW5nLCB3ZSB1c2Ugc3RkZXJyIGFzIHRoZSBsb2cgb3V0cHV0XG4vLyBzdHJlYW0sIHdoaWxlIHN0ZG91dCBpcyB1c2VkIGZvciB0aGUgcmVwb3J0IG91dHB1dC5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhbmltYXRpb246ICBudWxsLFxuICAgIGlzQW5pbWF0ZWQ6IHR0eS5pc2F0dHkoMSkgJiYgIWlzQ0ksXG5cbiAgICBzaG93U3Bpbm5lciAoKSB7XG4gICAgICAgIC8vIE5PVEU6IHdlIGNhbiB1c2UgdGhlIHNwaW5uZXIgb25seSBpZiBzdGRvdXQgaXMgYSBUVFkgYW5kIHdlIGFyZSBub3QgaW4gQ0kgZW52aXJvbm1lbnQgKGUuZy4gVHJhdmlzQ0kpLFxuICAgICAgICAvLyBvdGhlcndpc2Ugd2UgY2FuJ3QgcmVwYWludCBhbmltYXRpb24gZnJhbWVzLiBUaGFua3MgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9vcmEgZm9yIGluc2lnaHQuXG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNwaW5uZXJGcmFtZSA9IGVsZWdhbnRTcGlubmVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gY2hhbGsuY3lhbihzcGlubmVyRnJhbWUoKSk7XG5cbiAgICAgICAgICAgICAgICBsb2dVcGRhdGUoZnJhbWUpO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhpZGVTcGlubmVyIChpc0V4aXQpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuYW5pbWF0aW9uKTtcbiAgICAgICAgICAgIGxvZ1VwZGF0ZS5jbGVhcigpO1xuXG4gICAgICAgICAgICBpZiAoaXNFeGl0KVxuICAgICAgICAgICAgICAgIGxvZ1VwZGF0ZS5kb25lKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB3cml0ZSAodGV4dCkge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb24pXG4gICAgICAgICAgICB0aGlzLmhpZGVTcGlubmVyKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGV4dCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uKVxuICAgICAgICAgICAgdGhpcy5zaG93U3Bpbm5lcigpO1xuICAgIH0sXG59O1xuXG4iXX0=