"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const types_1 = require("../../errors/types");
const runtime_1 = require("../../errors/runtime");
async function default_1(optionName, options) {
    const metaOptions = await (0, base_1.default)(options, {
        skipOptionValueTypeConversion: true,
        async onOptionParsed(key, value) {
            if (!key || !value)
                throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.optionValueIsNotValidKeyValue, optionName);
            return String(value);
        },
    });
    if (Object.keys(metaOptions).length === 0)
        throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.optionValueIsNotValidKeyValue, optionName);
    return metaOptions;
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9nZXQtb3B0aW9ucy9tZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQW9DO0FBQ3BDLDhDQUFvRDtBQUNwRCxrREFBb0Q7QUFHckMsS0FBSyxvQkFBVyxVQUFrQixFQUFFLE9BQWU7SUFDOUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLGNBQWMsRUFBQyxPQUFPLEVBQUU7UUFDOUMsNkJBQTZCLEVBQUUsSUFBSTtRQUVuQyxLQUFLLENBQUMsY0FBYyxDQUFFLEdBQVcsRUFBRSxLQUFhO1lBQzVDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLO2dCQUNkLE1BQU0sSUFBSSxzQkFBWSxDQUFDLHNCQUFjLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFckYsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQztLQUNKLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUNyQyxNQUFNLElBQUksc0JBQVksQ0FBQyxzQkFBYyxDQUFDLDZCQUE2QixFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXJGLE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFoQkQsNEJBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VHZXRPcHRpb25zIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBSVU5USU1FX0VSUk9SUyB9IGZyb20gJy4uLy4uL2Vycm9ycy90eXBlcyc7XG5pbXBvcnQgeyBHZW5lcmFsRXJyb3IgfSBmcm9tICcuLi8uLi9lcnJvcnMvcnVudGltZSc7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSAnLi4vLi4vY29uZmlndXJhdGlvbi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKG9wdGlvbk5hbWU6IHN0cmluZywgb3B0aW9uczogc3RyaW5nKTogUHJvbWlzZTxEaWN0aW9uYXJ5PHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4+PiB7XG4gICAgY29uc3QgbWV0YU9wdGlvbnMgPSBhd2FpdCBiYXNlR2V0T3B0aW9ucyhvcHRpb25zLCB7XG4gICAgICAgIHNraXBPcHRpb25WYWx1ZVR5cGVDb252ZXJzaW9uOiB0cnVlLFxuXG4gICAgICAgIGFzeW5jIG9uT3B0aW9uUGFyc2VkIChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgICAgICAgICAgaWYgKCFrZXkgfHwgIXZhbHVlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMub3B0aW9uVmFsdWVJc05vdFZhbGlkS2V5VmFsdWUsIG9wdGlvbk5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmIChPYmplY3Qua2V5cyhtZXRhT3B0aW9ucykubGVuZ3RoID09PSAwKVxuICAgICAgICB0aHJvdyBuZXcgR2VuZXJhbEVycm9yKFJVTlRJTUVfRVJST1JTLm9wdGlvblZhbHVlSXNOb3RWYWxpZEtleVZhbHVlLCBvcHRpb25OYW1lKTtcblxuICAgIHJldHVybiBtZXRhT3B0aW9ucztcbn1cbiJdfQ==