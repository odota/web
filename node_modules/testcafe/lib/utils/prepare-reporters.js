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
        is_stream_1.writable(obj) ||
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZS1yZXBvcnRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcHJlcGFyZS1yZXBvcnRlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBeUQ7QUFDekQsK0NBQWlEO0FBQ2pELDJDQUFpRDtBQUVqRCxTQUFTLFlBQVksQ0FBRSxHQUFHO0lBQ3RCLE9BQU8sR0FBRztRQUNILE9BQU8sR0FBRyxDQUFDLEtBQUssS0FBSyxVQUFVO1FBQy9CLE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUM7QUFDekMsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQUUsR0FBRztJQUNoQyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUM7UUFDdEMsT0FBTyxHQUFHLEtBQUssUUFBUTtRQUN2QixvQkFBZ0IsQ0FBQyxHQUFHLENBQUM7UUFDckIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXhCLElBQUksQ0FBQyxxQkFBcUI7UUFDdEIsTUFBTSxJQUFJLHNCQUFZLENBQUMsc0JBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFFRCxtQkFBeUIsSUFBSSxFQUFFLE1BQU07SUFDakMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRW5CLElBQUksSUFBSSxZQUFZLEtBQUs7UUFDckIsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0Y7UUFDRCxNQUFNLFFBQVEsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUVsQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzVCO0lBRUQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRXpELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFkRCw0QkFjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdyaXRhYmxlIGFzIGlzV3JpdGFibGVTdHJlYW0gfSBmcm9tICdpcy1zdHJlYW0nO1xuaW1wb3J0IHsgR2VuZXJhbEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL3J1bnRpbWUnO1xuaW1wb3J0IHsgUlVOVElNRV9FUlJPUlMgfSBmcm9tICcuLi9lcnJvcnMvdHlwZXMnO1xuXG5mdW5jdGlvbiBpc1N0cmVhbU1vY2sgKG9iaikge1xuICAgIHJldHVybiBvYmogJiZcbiAgICAgICAgICAgdHlwZW9mIG9iai53cml0ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICB0eXBlb2Ygb2JqLmVuZCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVSZXBvcnRlck91dHB1dCAob2JqKSB7XG4gICAgY29uc3QgaXNWYWxpZFJlcG9ydGVyT3V0cHV0ID0gb2JqID09PSB2b2lkIDAgfHxcbiAgICAgICAgICB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgIGlzV3JpdGFibGVTdHJlYW0ob2JqKSB8fFxuICAgICAgICAgIGlzU3RyZWFtTW9jayhvYmopO1xuXG4gICAgaWYgKCFpc1ZhbGlkUmVwb3J0ZXJPdXRwdXQpXG4gICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMuaW52YWxpZFJlcG9ydGVyT3V0cHV0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG5hbWUsIG91dHB1dCkge1xuICAgIGxldCByZXBvcnRlcnMgPSBbXTtcblxuICAgIGlmIChuYW1lIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJlcG9ydGVycyA9IG5hbWUubWFwKHIgPT4gdHlwZW9mIHIgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiByID09PSAnZnVuY3Rpb24nID8geyBuYW1lOiByIH0gOiByKTtcbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVwb3J0ZXIgPSB7IG5hbWUsIG91dHB1dCB9O1xuXG4gICAgICAgIHJlcG9ydGVycy5wdXNoKHJlcG9ydGVyKTtcbiAgICB9XG5cbiAgICByZXBvcnRlcnMuZm9yRWFjaChyID0+IHZhbGlkYXRlUmVwb3J0ZXJPdXRwdXQoci5vdXRwdXQpKTtcblxuICAgIHJldHVybiByZXBvcnRlcnM7XG59XG4iXX0=