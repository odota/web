"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const STRING_OPTION_NAMES = ['buildId', 'token'];
async function default_1(options) {
    return (0, base_1.default)(options, {
        async onOptionParsed(key, value) {
            if (key && STRING_OPTION_NAMES.includes(key))
                return String(value);
            return value;
        },
    });
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dldC1vcHRpb25zL2Rhc2hib2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUFvQztBQUdwQyxNQUFNLG1CQUFtQixHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRWxDLEtBQUssb0JBQVcsT0FBZTtJQUMxQyxPQUFPLElBQUEsY0FBYyxFQUFDLE9BQU8sRUFBRTtRQUMzQixLQUFLLENBQUMsY0FBYyxDQUFFLEdBQVcsRUFBRSxLQUFhO1lBQzVDLElBQUksR0FBRyxJQUFJLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXpCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBVEQsNEJBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZUdldE9wdGlvbnMgZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tICcuLi8uLi9jb25maWd1cmF0aW9uL2ludGVyZmFjZXMnO1xuXG5jb25zdCBTVFJJTkdfT1BUSU9OX05BTUVTID0gWydidWlsZElkJywgJ3Rva2VuJ107XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIChvcHRpb25zOiBzdHJpbmcpOiBQcm9taXNlPERpY3Rpb25hcnk8bnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbj4+IHtcbiAgICByZXR1cm4gYmFzZUdldE9wdGlvbnMob3B0aW9ucywge1xuICAgICAgICBhc3luYyBvbk9wdGlvblBhcnNlZCAoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIGlmIChrZXkgJiYgU1RSSU5HX09QVElPTl9OQU1FUy5pbmNsdWRlcyhrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4iXX0=