"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const debug_1 = __importDefault(require("debug"));
const base_1 = __importDefault(require("./base"));
const runtime_1 = require("../../errors/runtime");
const promisified_functions_1 = require("../promisified-functions");
const render_template_1 = __importDefault(require("../../utils/render-template"));
const types_1 = require("../../errors/types");
const warning_message_1 = __importDefault(require("../../notifications/warning-message"));
const DEBUG_LOGGER = (0, debug_1.default)('testcafe:utils:get-options:ssl');
const MAX_PATH_LENGTH = {
    'Linux': 4096,
    'Windows_NT': 260,
    'Darwin': 1024,
};
const OS_MAX_PATH_LENGTH = MAX_PATH_LENGTH[os_1.default.type()];
const OPTIONS_SEPARATOR = ';';
const FILE_OPTION_NAMES = ['cert', 'key', 'pfx'];
async function default_1(optionString) {
    return (0, base_1.default)(optionString, {
        optionsSeparator: OPTIONS_SEPARATOR,
        async onOptionParsed(key, value) {
            if (!FILE_OPTION_NAMES.includes(key) || value.length > OS_MAX_PATH_LENGTH)
                return value;
            try {
                await (0, promisified_functions_1.stat)(value);
            }
            catch (error) {
                DEBUG_LOGGER((0, render_template_1.default)(warning_message_1.default.cannotFindSSLCertFile, value, key, error.stack));
                return value;
            }
            try {
                return await (0, promisified_functions_1.readFile)(value);
            }
            catch (error) {
                throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotReadSSLCertFile, key, value, error.stack);
            }
        },
    });
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dldC1vcHRpb25zL3NzbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRDQUFvQjtBQUNwQixrREFBMEI7QUFDMUIsa0RBQW9DO0FBQ3BDLGtEQUFvRDtBQUNwRCxvRUFBMEQ7QUFDMUQsa0ZBQXlEO0FBQ3pELDhDQUFvRDtBQUNwRCwwRkFBbUU7QUFHbkUsTUFBTSxZQUFZLEdBQUcsSUFBQSxlQUFLLEVBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUU3RCxNQUFNLGVBQWUsR0FBdUI7SUFDeEMsT0FBTyxFQUFPLElBQUk7SUFDbEIsWUFBWSxFQUFFLEdBQUc7SUFDakIsUUFBUSxFQUFNLElBQUk7Q0FDckIsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEdBQUcsZUFBZSxDQUFDLFlBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXRELE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDO0FBQzlCLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRWxDLEtBQUssb0JBQVcsWUFBb0I7SUFDL0MsT0FBTyxJQUFBLGNBQWMsRUFBQyxZQUFZLEVBQUU7UUFDaEMsZ0JBQWdCLEVBQUUsaUJBQWlCO1FBRW5DLEtBQUssQ0FBQyxjQUFjLENBQUUsR0FBVyxFQUFFLEtBQWE7WUFDNUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLGtCQUFrQjtnQkFDckUsT0FBTyxLQUFLLENBQUM7WUFFakIsSUFBSTtnQkFDQSxNQUFNLElBQUEsNEJBQUksRUFBQyxLQUFLLENBQUMsQ0FBQzthQUNyQjtZQUNELE9BQU8sS0FBVSxFQUFFO2dCQUNmLFlBQVksQ0FBQyxJQUFBLHlCQUFjLEVBQUMseUJBQWdCLENBQUMscUJBQXFCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFOUYsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxJQUFJO2dCQUNBLE9BQU8sTUFBTSxJQUFBLGdDQUFRLEVBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEM7WUFDRCxPQUFPLEtBQVUsRUFBRTtnQkFDZixNQUFNLElBQUksc0JBQVksQ0FBQyxzQkFBYyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pGO1FBQ0wsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUF6QkQsNEJBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9zIGZyb20gJ29zJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgYmFzZUdldE9wdGlvbnMgZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IEdlbmVyYWxFcnJvciB9IGZyb20gJy4uLy4uL2Vycm9ycy9ydW50aW1lJztcbmltcG9ydCB7IHN0YXQsIHJlYWRGaWxlIH0gZnJvbSAnLi4vcHJvbWlzaWZpZWQtZnVuY3Rpb25zJztcbmltcG9ydCByZW5kZXJUZW1wbGF0ZSBmcm9tICcuLi8uLi91dGlscy9yZW5kZXItdGVtcGxhdGUnO1xuaW1wb3J0IHsgUlVOVElNRV9FUlJPUlMgfSBmcm9tICcuLi8uLi9lcnJvcnMvdHlwZXMnO1xuaW1wb3J0IFdBUk5JTkdfTUVTU0FHRVMgZnJvbSAnLi4vLi4vbm90aWZpY2F0aW9ucy93YXJuaW5nLW1lc3NhZ2UnO1xuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4uLy4uL2NvbmZpZ3VyYXRpb24vaW50ZXJmYWNlcyc7XG5cbmNvbnN0IERFQlVHX0xPR0dFUiA9IGRlYnVnKCd0ZXN0Y2FmZTp1dGlsczpnZXQtb3B0aW9uczpzc2wnKTtcblxuY29uc3QgTUFYX1BBVEhfTEVOR1RIOiBEaWN0aW9uYXJ5PG51bWJlcj4gPSB7XG4gICAgJ0xpbnV4JzogICAgICA0MDk2LFxuICAgICdXaW5kb3dzX05UJzogMjYwLFxuICAgICdEYXJ3aW4nOiAgICAgMTAyNCxcbn07XG5cbmNvbnN0IE9TX01BWF9QQVRIX0xFTkdUSCA9IE1BWF9QQVRIX0xFTkdUSFtvcy50eXBlKCldO1xuXG5jb25zdCBPUFRJT05TX1NFUEFSQVRPUiA9ICc7JztcbmNvbnN0IEZJTEVfT1BUSU9OX05BTUVTID0gWydjZXJ0JywgJ2tleScsICdwZngnXTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKG9wdGlvblN0cmluZzogc3RyaW5nKTogUHJvbWlzZTxEaWN0aW9uYXJ5PHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXI+PiB7XG4gICAgcmV0dXJuIGJhc2VHZXRPcHRpb25zKG9wdGlvblN0cmluZywge1xuICAgICAgICBvcHRpb25zU2VwYXJhdG9yOiBPUFRJT05TX1NFUEFSQVRPUixcblxuICAgICAgICBhc3luYyBvbk9wdGlvblBhcnNlZCAoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICghRklMRV9PUFRJT05fTkFNRVMuaW5jbHVkZXMoa2V5KSB8fCB2YWx1ZS5sZW5ndGggPiBPU19NQVhfUEFUSF9MRU5HVEgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHN0YXQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBERUJVR19MT0dHRVIocmVuZGVyVGVtcGxhdGUoV0FSTklOR19NRVNTQUdFUy5jYW5ub3RGaW5kU1NMQ2VydEZpbGUsIHZhbHVlLCBrZXksIGVycm9yLnN0YWNrKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlYWRGaWxlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdlbmVyYWxFcnJvcihSVU5USU1FX0VSUk9SUy5jYW5ub3RSZWFkU1NMQ2VydEZpbGUsIGtleSwgdmFsdWUsIGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuIl19