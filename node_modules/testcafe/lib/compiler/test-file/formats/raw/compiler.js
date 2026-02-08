"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../../base"));
const runtime_1 = require("../../../../errors/runtime");
const types_1 = require("../../../../errors/types");
const test_file_1 = __importDefault(require("../../../../api/structure/test-file"));
const fixture_1 = __importDefault(require("../../../../api/structure/fixture"));
const test_1 = __importDefault(require("../../../../api/structure/test"));
const from_object_1 = __importDefault(require("../../../../test-run/commands/from-object"));
const raw_command_callsite_record_1 = require("../../../../utils/raw-command-callsite-record");
class RawTestFileCompiler extends base_1.default {
    static _createTestFn(commands) {
        return async (t) => {
            for (let i = 0; i < commands.length; i++) {
                const _a = commands[i], { callsite: initCallsite, actionId } = _a, commandObj = __rest(_a, ["callsite", "actionId"]);
                const callsite = actionId ? new raw_command_callsite_record_1.RawCommandCallsiteRecord(actionId, commands) : initCallsite || actionId;
                try {
                    const command = (0, from_object_1.default)(commandObj, t.testRun);
                    await t.testRun.executeCommand(command, callsite);
                }
                catch (err) {
                    err.callsite = callsite;
                    err.actionId = actionId;
                    throw err;
                }
            }
        };
    }
    static _assignCommonTestingUnitProperties(src, dest) {
        if (src.pageUrl)
            dest.page(src.pageUrl);
        if (src.authCredentials)
            dest.httpAuth(src.authCredentials);
        /* eslint-disable no-unused-expressions */
        if (src.only)
            dest.only;
        if (src.skip)
            dest.skip;
        if (src.disablePageReloads)
            dest.disablePageReloads;
        if (src.enablePageReloads)
            dest.enablePageReloads;
        /* eslint-enable no-unused-expressions */
    }
    static _addTest(testFile, src, baseUrl) {
        const test = new test_1.default(testFile, false, baseUrl);
        test(src.name, RawTestFileCompiler._createTestFn(src.commands));
        RawTestFileCompiler._assignCommonTestingUnitProperties(src, test);
        if (src.beforeCommands)
            test.before(RawTestFileCompiler._createTestFn(src.beforeCommands));
        if (src.afterCommands)
            test.after(RawTestFileCompiler._createTestFn(src.afterCommands));
        return test;
    }
    static _addFixture(testFile, src, baseUrl) {
        const fixture = new fixture_1.default(testFile, baseUrl);
        fixture(src.name);
        RawTestFileCompiler._assignCommonTestingUnitProperties(src, fixture);
        if (src.beforeEachCommands)
            fixture.beforeEach(RawTestFileCompiler._createTestFn(src.beforeEachCommands));
        if (src.afterEachCommands)
            fixture.afterEach(RawTestFileCompiler._createTestFn(src.afterEachCommands));
        src.tests.forEach(testSrc => RawTestFileCompiler._addTest(testFile, testSrc, baseUrl));
    }
    _hasTests() {
        return true;
    }
    getSupportedExtension() {
        return '.testcafe';
    }
    compile(code, filename) {
        const testFile = new test_file_1.default(filename);
        let data = null;
        try {
            data = JSON.parse(code);
            data.fixtures.forEach(fixtureSrc => RawTestFileCompiler._addFixture(testFile, fixtureSrc, this.baseUrl));
            return testFile.getTests();
        }
        catch (err) {
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotParseRawFile, filename, err.toString());
        }
    }
}
exports.default = RawTestFileCompiler;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcGlsZXIvdGVzdC1maWxlL2Zvcm1hdHMvcmF3L2NvbXBpbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEM7QUFDOUMsd0RBQTBEO0FBQzFELG9EQUEwRDtBQUMxRCxvRkFBMkQ7QUFDM0QsZ0ZBQXdEO0FBQ3hELDBFQUFrRDtBQUNsRCw0RkFBZ0Y7QUFDaEYsK0ZBQXlGO0FBRXpGLE1BQXFCLG1CQUFvQixTQUFRLGNBQW9CO0lBRWpFLE1BQU0sQ0FBQyxhQUFhLENBQUUsUUFBUTtRQUMxQixPQUFPLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtZQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLEtBSUYsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUpULEVBQ0YsUUFBUSxFQUFFLFlBQVksRUFDdEIsUUFBUSxPQUVHLEVBRFIsVUFBVSxjQUhYLHdCQUlMLENBQWMsQ0FBQztnQkFFaEIsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLHNEQUF3QixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQztnQkFFeEcsSUFBSTtvQkFDQSxNQUFNLE9BQU8sR0FBRyxJQUFBLHFCQUF1QixFQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRS9ELE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNyRDtnQkFDRCxPQUFPLEdBQUcsRUFBRTtvQkFDUixHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDeEIsR0FBRyxDQUFD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QUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUV6RyxPQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM5QjtRQUNELE9BQU8sR0FBRyxFQUFFO1lBQ1IsTUFBTSxJQUFJLHNCQUFZLENBQUMsc0JBQWMsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDdkY7SUFDTCxDQUFDO0NBQ0o7QUF6R0Qsc0NBeUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlc3RGaWxlQ29tcGlsZXJCYXNlIGZyb20gJy4uLy4uL2Jhc2UnO1xuaW1wb3J0IHsgR2VuZXJhbEVycm9yIH0gZnJvbSAnLi4vLi4vLi4vLi4vZXJyb3JzL3J1bnRpbWUnO1xuaW1wb3J0IHsgUlVOVElNRV9FUlJPUlMgfSBmcm9tICcuLi8uLi8uLi8uLi9lcnJvcnMvdHlwZXMnO1xuaW1wb3J0IFRlc3RGaWxlIGZyb20gJy4uLy4uLy4uLy4uL2FwaS9zdHJ1Y3R1cmUvdGVzdC1maWxlJztcbmltcG9ydCBGaXh0dXJlIGZyb20gJy4uLy4uLy4uLy4uL2FwaS9zdHJ1Y3R1cmUvZml4dHVyZSc7XG5pbXBvcnQgVGVzdCBmcm9tICcuLi8uLi8uLi8uLi9hcGkvc3RydWN0dXJlL3Rlc3QnO1xuaW1wb3J0IGNyZWF0ZUNvbW1hbmRGcm9tT2JqZWN0IGZyb20gJy4uLy4uLy4uLy4uL3Rlc3QtcnVuL2NvbW1hbmRzL2Zyb20tb2JqZWN0JztcbmltcG9ydCB7IFJhd0NvbW1hbmRDYWxsc2l0ZVJlY29yZCB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL3Jhdy1jb21tYW5kLWNhbGxzaXRlLXJlY29yZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhd1Rlc3RGaWxlQ29tcGlsZXIgZXh0ZW5kcyBUZXN0RmlsZUNvbXBpbGVyQmFzZSB7XG5cbiAgICBzdGF0aWMgX2NyZWF0ZVRlc3RGbiAoY29tbWFuZHMpIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jIHQgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbHNpdGU6IGluaXRDYWxsc2l0ZSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgIC4uLmNvbW1hbmRPYmpcbiAgICAgICAgICAgICAgICB9ID0gY29tbWFuZHNbaV07XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsc2l0ZSA9IGFjdGlvbklkID8gbmV3IFJhd0NvbW1hbmRDYWxsc2l0ZVJlY29yZChhY3Rpb25JZCwgY29tbWFuZHMpIDogaW5pdENhbGxzaXRlIHx8IGFjdGlvbklkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGNyZWF0ZUNvbW1hbmRGcm9tT2JqZWN0KGNvbW1hbmRPYmosIHQudGVzdFJ1bik7XG5cbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdC50ZXN0UnVuLmV4ZWN1dGVDb21tYW5kKGNvbW1hbmQsIGNhbGxzaXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBlcnIuY2FsbHNpdGUgPSBjYWxsc2l0ZTtcbiAgICAgICAgICAgICAgICAgICAgZXJyLmFjdGlvbklkID0gYWN0aW9uSWQ7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIF9hc3NpZ25Db21tb25UZXN0aW5nVW5pdFByb3BlcnRpZXMgKHNyYywgZGVzdCkge1xuICAgICAgICBpZiAoc3JjLnBhZ2VVcmwpXG4gICAgICAgICAgICBkZXN0LnBhZ2Uoc3JjLnBhZ2VVcmwpO1xuXG4gICAgICAgIGlmIChzcmMuYXV0aENyZWRlbnRpYWxzKVxuICAgICAgICAgICAgZGVzdC5odHRwQXV0aChzcmMuYXV0aENyZWRlbnRpYWxzKTtcblxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cbiAgICAgICAgaWYgKHNyYy5vbmx5KVxuICAgICAgICAgICAgZGVzdC5vbmx5O1xuXG4gICAgICAgIGlmIChzcmMuc2tpcClcbiAgICAgICAgICAgIGRlc3Quc2tpcDtcblxuICAgICAgICBpZiAoc3JjLmRpc2FibGVQYWdlUmVsb2FkcylcbiAgICAgICAgICAgIGRlc3QuZGlzYWJsZVBhZ2VSZWxvYWRzO1xuXG4gICAgICAgIGlmIChzcmMuZW5hYmxlUGFnZVJlbG9hZHMpXG4gICAgICAgICAgICBkZXN0LmVuYWJsZVBhZ2VSZWxvYWRzO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuICAgIH1cblxuICAgIHN0YXRpYyBfYWRkVGVzdCAodGVzdEZpbGUsIHNyYywgYmFzZVVybCkge1xuICAgICAgICBjb25zdCB0ZXN0ID0gbmV3IFRlc3QodGVzdEZpbGUsIGZhbHNlLCBiYXNlVXJsKTtcblxuICAgICAgICB0ZXN0KHNyYy5uYW1lLCBSYXdUZXN0RmlsZUNvbXBpbGVyLl9jcmVhdGVUZXN0Rm4oc3JjLmNvbW1hbmRzKSk7XG5cbiAgICAgICAgUmF3VGVzdEZpbGVDb21waWxlci5fYXNzaWduQ29tbW9uVGVzdGluZ1VuaXRQcm9wZXJ0aWVzKHNyYywgdGVzdCk7XG5cbiAgICAgICAgaWYgKHNyYy5iZWZvcmVDb21tYW5kcylcbiAgICAgICAgICAgIHRlc3QuYmVmb3JlKFJhd1Rlc3RGaWxlQ29tcGlsZXIuX2NyZWF0ZVRlc3RGbihzcmMuYmVmb3JlQ29tbWFuZHMpKTtcblxuICAgICAgICBpZiAoc3JjLmFmdGVyQ29tbWFuZHMpXG4gICAgICAgICAgICB0ZXN0LmFmdGVyKFJhd1Rlc3RGaWxlQ29tcGlsZXIuX2NyZWF0ZVRlc3RGbihzcmMuYWZ0ZXJDb21tYW5kcykpO1xuXG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgIH1cblxuICAgIHN0YXRpYyBfYWRkRml4dHVyZSAodGVzdEZpbGUsIHNyYywgYmFzZVVybCkge1xuICAgICAgICBjb25zdCBmaXh0dXJlID0gbmV3IEZpeHR1cmUodGVzdEZpbGUsIGJhc2VVcmwpO1xuXG4gICAgICAgIGZpeHR1cmUoc3JjLm5hbWUpO1xuXG4gICAgICAgIFJhd1Rlc3RGaWxlQ29tcGlsZXIuX2Fzc2lnbkNvbW1vblRlc3RpbmdVbml0UHJvcGVydGllcyhzcmMsIGZpeHR1cmUpO1xuXG4gICAgICAgIGlmIChzcmMuYmVmb3JlRWFjaENvbW1hbmRzKVxuICAgICAgICAgICAgZml4dHVyZS5iZWZvcmVFYWNoKFJhd1Rlc3RGaWxlQ29tcGlsZXIuX2NyZWF0ZVRlc3RGbihzcmMuYmVmb3JlRWFjaENvbW1hbmRzKSk7XG5cbiAgICAgICAgaWYgKHNyYy5hZnRlckVhY2hDb21tYW5kcylcbiAgICAgICAgICAgIGZpeHR1cmUuYWZ0ZXJFYWNoKFJhd1Rlc3RGaWxlQ29tcGlsZXIuX2NyZWF0ZVRlc3RGbihzcmMuYWZ0ZXJFYWNoQ29tbWFuZHMpKTtcblxuICAgICAgICBzcmMudGVzdHMuZm9yRWFjaCh0ZXN0U3JjID0+IFJhd1Rlc3RGaWxlQ29tcGlsZXIuX2FkZFRlc3QodGVzdEZpbGUsIHRlc3RTcmMsIGJhc2VVcmwpKTtcbiAgICB9XG5cbiAgICBfaGFzVGVzdHMgKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRTdXBwb3J0ZWRFeHRlbnNpb24gKCkge1xuICAgICAgICByZXR1cm4gJy50ZXN0Y2FmZSc7XG4gICAgfVxuXG4gICAgY29tcGlsZSAoY29kZSwgZmlsZW5hbWUpIHtcbiAgICAgICAgY29uc3QgdGVzdEZpbGUgPSBuZXcgVGVzdEZpbGUoZmlsZW5hbWUpO1xuXG4gICAgICAgIGxldCBkYXRhID0gbnVsbDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoY29kZSk7XG5cbiAgICAgICAgICAgIGRhdGEuZml4dHVyZXMuZm9yRWFjaChmaXh0dXJlU3JjID0+IFJhd1Rlc3RGaWxlQ29tcGlsZXIuX2FkZEZpeHR1cmUodGVzdEZpbGUsIGZpeHR1cmVTcmMsIHRoaXMuYmFzZVVybCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGVzdEZpbGUuZ2V0VGVzdHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR2VuZXJhbEVycm9yKFJVTlRJTUVfRVJST1JTLmNhbm5vdFBhcnNlUmF3RmlsZSwgZmlsZW5hbWUsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==