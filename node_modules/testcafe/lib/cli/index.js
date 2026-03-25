"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_cwd_1 = __importDefault(require("resolve-cwd"));
const log_1 = __importDefault(require("./log"));
function getLocalInstallation() {
    const local = (0, resolve_cwd_1.default)('testcafe/lib/cli');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBQ3JDLGdEQUF3QjtBQUd4QixTQUFTLG9CQUFvQjtJQUN6QixNQUFNLEtBQUssR0FBRyxJQUFBLHFCQUFVLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU3QyxJQUFJLEtBQUssSUFBSSxLQUFLLEtBQUssVUFBVSxFQUFFO1FBQy9CLGFBQUcsQ0FBQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztRQUMxRCxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUVELENBQUMsU0FBUyxNQUFNO0lBQ1osTUFBTSxPQUFPLEdBQUcsb0JBQW9CLEVBQUUsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRW5FLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc29sdmVDd2QgZnJvbSAncmVzb2x2ZS1jd2QnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XG5cblxuZnVuY3Rpb24gZ2V0TG9jYWxJbnN0YWxsYXRpb24gKCkge1xuICAgIGNvbnN0IGxvY2FsID0gcmVzb2x2ZUN3ZCgndGVzdGNhZmUvbGliL2NsaScpO1xuXG4gICAgaWYgKGxvY2FsICYmIGxvY2FsICE9PSBfX2ZpbGVuYW1lKSB7XG4gICAgICAgIGxvZy53cml0ZSgnVXNpbmcgbG9jYWxseSBpbnN0YWxsZWQgdmVyc2lvbiBvZiBUZXN0Q2FmZS4nKTtcbiAgICAgICAgcmV0dXJuIGxvY2FsO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbn1cblxuKGZ1bmN0aW9uIGxvYWRlciAoKSB7XG4gICAgY29uc3QgY2xpUGF0aCA9IGdldExvY2FsSW5zdGFsbGF0aW9uKCkgfHwgcmVxdWlyZS5yZXNvbHZlKCcuL2NsaScpO1xuXG4gICAgcmVxdWlyZShjbGlQYXRoKTtcbn0pKCk7XG4iXX0=