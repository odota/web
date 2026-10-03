"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_stream_1 = require("is-stream");
const runtime_1 = require("../errors/runtime");
const types_1 = require("../errors/types");
function isStreamMock(obj) {
    return obj &&
        typeof obj.write === 'function' &&
        typeof obj.end === 'function';
}
function validateReporterOutput(obj) {
    const isValidReporterOutput = obj === void 0 ||
        typeof obj === 'string' ||
        (0, is_stream_1.writable)(obj) ||
        isStreamMock(obj);
    if (!isValidReporterOutput)
        throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.invalidReporterOutput);
}
function default_1(name, output) {
    let reporters = [];
    if (name instanceof Array)
        reporters = name.map(r => typeof r === 'string' || typeof r === 'function' ? { name: r } : r);
    else {
        const reporter = { name, output };
        reporters.push(reporter);
    }
    reporters.forEach(r => validateReporterOutput(r.output));
    return reporters;
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZS1yZXBvcnRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcHJlcGFyZS1yZXBvcnRlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBeUQ7QUFDekQsK0NBQWlEO0FBQ2pELDJDQUFpRDtBQUVqRCxTQUFTLFlBQVksQ0FBRSxHQUFHO0lBQ3RCLE9BQU8sR0FBRztRQUNILE9BQU8sR0FBRyxDQUFDLEtBQUssS0FBSyxVQUFVO1FBQy9CLE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUM7QUFDekMsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQUUsR0FBRztJQUNoQyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUM7UUFDdEMsT0FBTyxHQUFHLEtBQUssUUFBUTtRQUN2QixJQUFBLG9CQUFnQixFQUFDLEdBQUcsQ0FBQztRQUNyQixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFeEIsSUFBSSxDQUFDLHFCQUFxQjtRQUN0QixNQUFNLElBQUksc0JBQVksQ0FBQyxzQkFBYyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDckUsQ0FBQztBQUVELG1CQUF5QixJQUFJLEVBQUUsTUFBTTtJQUNqQyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFbkIsSUFBSSxJQUFJLFlBQVksS0FBSztRQUNyQixTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RjtRQUNELE1BQU0sUUFBUSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBRWxDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDNUI7SUFFRCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFekQsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQWRELDRCQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd3JpdGFibGUgYXMgaXNXcml0YWJsZVN0cmVhbSB9IGZyb20gJ2lzLXN0cmVhbSc7XG5pbXBvcnQgeyBHZW5lcmFsRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvcnVudGltZSc7XG5pbXBvcnQgeyBSVU5USU1FX0VSUk9SUyB9IGZyb20gJy4uL2Vycm9ycy90eXBlcyc7XG5cbmZ1bmN0aW9uIGlzU3RyZWFtTW9jayAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJlxuICAgICAgICAgICB0eXBlb2Ygb2JqLndyaXRlID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgIHR5cGVvZiBvYmouZW5kID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVJlcG9ydGVyT3V0cHV0IChvYmopIHtcbiAgICBjb25zdCBpc1ZhbGlkUmVwb3J0ZXJPdXRwdXQgPSBvYmogPT09IHZvaWQgMCB8fFxuICAgICAgICAgIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgaXNXcml0YWJsZVN0cmVhbShvYmopIHx8XG4gICAgICAgICAgaXNTdHJlYW1Nb2NrKG9iaik7XG5cbiAgICBpZiAoIWlzVmFsaWRSZXBvcnRlck91dHB1dClcbiAgICAgICAgdGhyb3cgbmV3IEdlbmVyYWxFcnJvcihSVU5USU1FX0VSUk9SUy5pbnZhbGlkUmVwb3J0ZXJPdXRwdXQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobmFtZSwgb3V0cHV0KSB7XG4gICAgbGV0IHJlcG9ydGVycyA9IFtdO1xuXG4gICAgaWYgKG5hbWUgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmVwb3J0ZXJzID0gbmFtZS5tYXAociA9PiB0eXBlb2YgciA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHIgPT09ICdmdW5jdGlvbicgPyB7IG5hbWU6IHIgfSA6IHIpO1xuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCByZXBvcnRlciA9IHsgbmFtZSwgb3V0cHV0IH07XG5cbiAgICAgICAgcmVwb3J0ZXJzLnB1c2gocmVwb3J0ZXIpO1xuICAgIH1cblxuICAgIHJlcG9ydGVycy5mb3JFYWNoKHIgPT4gdmFsaWRhdGVSZXBvcnRlck91dHB1dChyLm91dHB1dCkpO1xuXG4gICAgcmV0dXJuIHJlcG9ydGVycztcbn1cbiJdfQ==