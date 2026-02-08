"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const option_source_1 = __importDefault(require("./option-source"));
class Option {
    constructor(name, value, source = option_source_1.default.Configuration) {
        this.name = name;
        this.value = value;
        this.source = source;
    }
}
exports.default = Option;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3VyYXRpb24vb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTJDO0FBRTNDLE1BQXFCLE1BQU07SUFLdkIsWUFBb0IsSUFBWSxFQUFFLEtBQWtCLEVBQUUsTUFBTSxHQUFHLHVCQUFZLENBQUMsYUFBYTtRQUNyRixJQUFJLENBQUMsSUFBSSxHQUFLLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFJLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0NBQ0o7QUFWRCx5QkFVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcHRpb25Tb3VyY2UgZnJvbSAnLi9vcHRpb24tc291cmNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9uIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyB2YWx1ZTogT3B0aW9uVmFsdWU7XG4gICAgcHVibGljIHNvdXJjZTogT3B0aW9uU291cmNlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBPcHRpb25WYWx1ZSwgc291cmNlID0gT3B0aW9uU291cmNlLkNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgdGhpcy5uYW1lICAgPSBuYW1lO1xuICAgICAgICB0aGlzLnZhbHVlICA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG59XG4iXX0=