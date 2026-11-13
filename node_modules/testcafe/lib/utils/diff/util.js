"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.cleanUpFilter = void 0;
const util_1 = require("util");
const lodash_1 = require("lodash");
function cleanUpFilter(line) {
    return !line.match(/\\ No newline/);
}
exports.cleanUpFilter = cleanUpFilter;
function stringify(value) {
    if ((0, lodash_1.isString)(value) && value !== '')
        return value;
    if ((0, lodash_1.isFunction)(value))
        return value.toString();
    let valueToStringify = value;
    if ((0, lodash_1.isBuffer)(value))
        valueToStringify = Buffer.prototype.toJSON.call(value).data;
    return (0, util_1.inspect)(valueToStringify, { compact: false, sorted: true, depth: null })
        .split('\n')
        .map(line => line.replace(/,\s*$/, ''))
        .join('\n') || valueToStringify.toString;
}
exports.stringify = stringify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9kaWZmL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLG1DQUlnQjtBQUVoQixTQUFnQixhQUFhLENBQUUsSUFBWTtJQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRkQsc0NBRUM7QUFFRCxTQUFnQixTQUFTLENBQUUsS0FBVTtJQUNqQyxJQUFJLElBQUEsaUJBQVEsRUFBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtRQUMvQixPQUFPLEtBQUssQ0FBQztJQUVqQixJQUFJLElBQUEsbUJBQVUsRUFBQyxLQUFLLENBQUM7UUFDakIsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFNUIsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFFN0IsSUFBSSxJQUFBLGlCQUFRLEVBQUMsS0FBSyxDQUFDO1FBQ2YsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztJQUVoRSxPQUFPLElBQUEsY0FBTyxFQUFDLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUMxRSxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztBQUNqRCxDQUFDO0FBaEJELDhCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluc3BlY3QgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7XG4gICAgaXNGdW5jdGlvbixcbiAgICBpc0J1ZmZlcixcbiAgICBpc1N0cmluZyxcbn0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuVXBGaWx0ZXIgKGxpbmU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhbGluZS5tYXRjaCgvXFxcXCBObyBuZXdsaW5lLyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkgKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUgIT09ICcnKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuXG4gICAgbGV0IHZhbHVlVG9TdHJpbmdpZnkgPSB2YWx1ZTtcblxuICAgIGlmIChpc0J1ZmZlcih2YWx1ZSkpXG4gICAgICAgIHZhbHVlVG9TdHJpbmdpZnkgPSBCdWZmZXIucHJvdG90eXBlLnRvSlNPTi5jYWxsKHZhbHVlKS5kYXRhO1xuXG4gICAgcmV0dXJuIGluc3BlY3QodmFsdWVUb1N0cmluZ2lmeSwgeyBjb21wYWN0OiBmYWxzZSwgc29ydGVkOiB0cnVlLCBkZXB0aDogbnVsbCB9KVxuICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgIC5tYXAobGluZSA9PiBsaW5lLnJlcGxhY2UoLyxcXHMqJC8sICcnKSlcbiAgICAgICAgLmpvaW4oJ1xcbicpIHx8IHZhbHVlVG9TdHJpbmdpZnkudG9TdHJpbmc7XG59XG4iXX0=