"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_cwd_1 = __importDefault(require("resolve-cwd"));
const log_1 = __importDefault(require("./log"));
function getLocalInstallation() {
    const local = resolve_cwd_1.default('testcafe/lib/cli');
    if (local && local !== __filename) {
        log_1.default.write('Using locally installed version of TestCafe.');
        return local;
    }
    return '';
}
(function loader() {
    const cliPath = getLocalInstallation() || require.resolve('./cli');
    require(cliPath);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBQ3JDLGdEQUF3QjtBQUd4QixTQUFTLG9CQUFvQjtJQUN6QixNQUFNLEtBQUssR0FBRyxxQkFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFN0MsSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLFVBQVUsRUFBRTtRQUMvQixhQUFHLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFDMUQsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFFRCxDQUFDLFNBQVMsTUFBTTtJQUNaLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixFQUFFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVuRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXNvbHZlQ3dkIGZyb20gJ3Jlc29sdmUtY3dkJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xuXG5cbmZ1bmN0aW9uIGdldExvY2FsSW5zdGFsbGF0aW9uICgpIHtcbiAgICBjb25zdCBsb2NhbCA9IHJlc29sdmVDd2QoJ3Rlc3RjYWZlL2xpYi9jbGknKTtcblxuICAgIGlmIChsb2NhbCAmJiBsb2NhbCAhPT0gX19maWxlbmFtZSkge1xuICAgICAgICBsb2cud3JpdGUoJ1VzaW5nIGxvY2FsbHkgaW5zdGFsbGVkIHZlcnNpb24gb2YgVGVzdENhZmUuJyk7XG4gICAgICAgIHJldHVybiBsb2NhbDtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG59XG5cbihmdW5jdGlvbiBsb2FkZXIgKCkge1xuICAgIGNvbnN0IGNsaVBhdGggPSBnZXRMb2NhbEluc3RhbGxhdGlvbigpIHx8IHJlcXVpcmUucmVzb2x2ZSgnLi9jbGknKTtcblxuICAgIHJlcXVpcmUoY2xpUGF0aCk7XG59KSgpO1xuIl19