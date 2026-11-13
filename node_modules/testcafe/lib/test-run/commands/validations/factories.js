"use strict";
// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFunctionValidator = exports.createObjectValidator = exports.createUrlSearchParamsValidator = exports.createUrlValidator = exports.createNumberValidator = exports.createDateValidator = exports.createStringOrRegexValidator = exports.createStringValidator = exports.createSpeedValidator = exports.createBooleanValidator = exports.createPositiveIntegerValidator = exports.createIntegerValidator = void 0;
function createIntegerValidator(ErrorCtor) {
    return (name, val) => {
        const valType = typeof val;
        if (valType !== 'number')
            throw new ErrorCtor(name, valType);
        const isInteger = !isNaN(val) &&
            isFinite(val) &&
            val === Math.floor(val);
        if (!isInteger)
            throw new ErrorCtor(name, val);
    };
}
exports.createIntegerValidator = createIntegerValidator;
function createPositiveIntegerValidator(ErrorCtor) {
    const integerValidator = createIntegerValidator(ErrorCtor);
    return (name, val) => {
        integerValidator(name, val);
        if (val < 0)
            throw new ErrorCtor(name, val);
    };
}
exports.createPositiveIntegerValidator = createPositiveIntegerValidator;
function createBooleanValidator(ErrorCtor) {
    return (name, val) => {
        const valType = typeof val;
        if (valType !== 'boolean')
            throw new ErrorCtor(name, valType);
    };
}
exports.createBooleanValidator = createBooleanValidator;
function createSpeedValidator(ErrorCtor) {
    return (name, val) => {
        const valType = typeof val;
        if (valType !== 'number')
            throw new ErrorCtor(name, valType);
        if (isNaN(val) || val < 0.01 || val > 1)
            throw new ErrorCtor(name, val);
    };
}
exports.createSpeedValidator = createSpeedValidator;
function createStringValidator(ErrorCtor) {
    return (name, val) => {
        const valType = typeof val;
        if (valType !== 'string')
            throw new ErrorCtor(name, valType);
    };
}
exports.createStringValidator = createStringValidator;
function createStringOrRegexValidator(ErrorCtor) {
    return (name, val) => {
        const valType = typeof val;
        if (valType !== 'string' && !(val instanceof RegExp))
            throw new ErrorCtor(name, valType);
    };
}
exports.createStringOrRegexValidator = createStringOrRegexValidator;
function createDateValidator(ErrorCtor) {
    return (name, val) => {
        if (!(val instanceof Date))
            throw new ErrorCtor(name, val);
    };
}
exports.createDateValidator = createDateValidator;
function createNumberValidator(ErrorCtor) {
    return (name, val) => {
        if (isNaN(Number(val)))
            throw new ErrorCtor(name, typeof val);
    };
}
exports.createNumberValidator = createNumberValidator;
function createUrlValidator(ErrorCtor) {
    return (name, val) => {
        const valType = typeof val;
        if (valType !== 'string' && !(val instanceof URL))
            throw new ErrorCtor(name, valType);
    };
}
exports.createUrlValidator = createUrlValidator;
function createUrlSearchParamsValidator(ErrorCtor) {
    return (name, val) => {
        const valType = typeof val;
        if (valType !== 'object' && !(val instanceof URLSearchParams))
            throw new ErrorCtor(name, valType);
    };
}
exports.createUrlSearchParamsValidator = createUrlSearchParamsValidator;
function createObjectValidator(ErrorCtor) {
    return (name, val) => {
        const valType = typeof val;
        if (valType !== 'object')
            throw new ErrorCtor(name, valType);
    };
}
exports.createObjectValidator = createObjectValidator;
function createFunctionValidator(ErrorCtor) {
    return (name, val) => {
        const valType = typeof val;
        if (valType !== 'function')
            throw new ErrorCtor(name, valType);
    };
}
exports.createFunctionValidator = createFunctionValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Rlc3QtcnVuL2NvbW1hbmRzL3ZhbGlkYXRpb25zL2ZhY3Rvcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0VBQWdFO0FBQ2hFLGdFQUFnRTtBQUNoRSwrQ0FBK0M7QUFDL0MsZ0VBQWdFOzs7QUFFaEUsU0FBZ0Isc0JBQXNCLENBQUUsU0FBUztJQUM3QyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2pCLE1BQU0sT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDO1FBRTNCLElBQUksT0FBTyxLQUFLLFFBQVE7WUFDcEIsTUFBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFdkMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ2IsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUNiLEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxTQUFTO1lBQ1YsTUFBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQWRELHdEQWNDO0FBRUQsU0FBZ0IsOEJBQThCLENBQUUsU0FBUztJQUNyRCxNQUFNLGdCQUFnQixHQUFHLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNELE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDakIsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLElBQUksR0FBRyxHQUFHLENBQUM7WUFDUCxNQUFNLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7QUFDTixDQUFDO0FBVEQsd0VBU0M7QUFFRCxTQUFnQixz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TyxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxZQUFZLGVBQWUsQ0FBQztZQUN6RCxNQUFNLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUM7QUFDTixDQUFDO0FBUEQsd0VBT0M7QUFFRCxTQUFnQixxQkFBcUIsQ0FBRSxTQUFTO0lBQzVDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDakIsTUFBTSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUM7UUFFM0IsSUFBSSxPQUFPLEtBQUssUUFBUTtZQUNwQixNQUFNLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUM7QUFDTixDQUFDO0FBUEQsc0RBT0M7QUFFRCxTQUFnQix1QkFBdUIsQ0FBRSxTQUFTO0lBQzlDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDakIsTUFBTSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUM7UUFFM0IsSUFBSSxPQUFPLEtBQUssVUFBVTtZQUN0QixNQUFNLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUM7QUFDTixDQUFDO0FBUEQsMERBT0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBXQVJOSU5HOiB0aGlzIGZpbGUgaXMgdXNlZCBieSBib3RoIHRoZSBjbGllbnQgYW5kIHRoZSBzZXJ2ZXIuXG4vLyBEbyBub3QgdXNlIGFueSBicm93c2VyIG9yIG5vZGUtc3BlY2lmaWMgQVBJIVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW50ZWdlclZhbGlkYXRvciAoRXJyb3JDdG9yKSB7XG4gICAgcmV0dXJuIChuYW1lLCB2YWwpID0+IHtcbiAgICAgICAgY29uc3QgdmFsVHlwZSA9IHR5cGVvZiB2YWw7XG5cbiAgICAgICAgaWYgKHZhbFR5cGUgIT09ICdudW1iZXInKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yQ3RvcihuYW1lLCB2YWxUeXBlKTtcblxuICAgICAgICBjb25zdCBpc0ludGVnZXIgPSAhaXNOYU4odmFsKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGaW5pdGUodmFsKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID09PSBNYXRoLmZsb29yKHZhbCk7XG5cbiAgICAgICAgaWYgKCFpc0ludGVnZXIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JDdG9yKG5hbWUsIHZhbCk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBvc2l0aXZlSW50ZWdlclZhbGlkYXRvciAoRXJyb3JDdG9yKSB7XG4gICAgY29uc3QgaW50ZWdlclZhbGlkYXRvciA9IGNyZWF0ZUludGVnZXJWYWxpZGF0b3IoRXJyb3JDdG9yKTtcblxuICAgIHJldHVybiAobmFtZSwgdmFsKSA9PiB7XG4gICAgICAgIGludGVnZXJWYWxpZGF0b3IobmFtZSwgdmFsKTtcblxuICAgICAgICBpZiAodmFsIDwgMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvckN0b3IobmFtZSwgdmFsKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9vbGVhblZhbGlkYXRvciAoRXJyb3JDdG9yKSB7XG4gICAgcmV0dXJuIChuYW1lLCB2YWwpID0+IHtcbiAgICAgICAgY29uc3QgdmFsVHlwZSA9IHR5cGVvZiB2YWw7XG5cbiAgICAgICAgaWYgKHZhbFR5cGUgIT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvckN0b3IobmFtZSwgdmFsVHlwZSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNwZWVkVmFsaWRhdG9yIChFcnJvckN0b3IpIHtcbiAgICByZXR1cm4gKG5hbWUsIHZhbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWxUeXBlID0gdHlwZW9mIHZhbDtcblxuICAgICAgICBpZiAodmFsVHlwZSAhPT0gJ251bWJlcicpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JDdG9yKG5hbWUsIHZhbFR5cGUpO1xuXG4gICAgICAgIGlmIChpc05hTih2YWwpIHx8IHZhbCA8IDAuMDEgfHwgdmFsID4gMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvckN0b3IobmFtZSwgdmFsKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaW5nVmFsaWRhdG9yIChFcnJvckN0b3IpIHtcbiAgICByZXR1cm4gKG5hbWUsIHZhbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWxUeXBlID0gdHlwZW9mIHZhbDtcblxuICAgICAgICBpZiAodmFsVHlwZSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JDdG9yKG5hbWUsIHZhbFR5cGUpO1xuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaW5nT3JSZWdleFZhbGlkYXRvciAoRXJyb3JDdG9yKSB7XG4gICAgcmV0dXJuIChuYW1lLCB2YWwpID0+IHtcbiAgICAgICAgY29uc3QgdmFsVHlwZSA9IHR5cGVvZiB2YWw7XG5cbiAgICAgICAgaWYgKHZhbFR5cGUgIT09ICdzdHJpbmcnICYmICEodmFsIGluc3RhbmNlb2YgUmVnRXhwKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvckN0b3IobmFtZSwgdmFsVHlwZSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURhdGVWYWxpZGF0b3IgKEVycm9yQ3Rvcikge1xuICAgIHJldHVybiAobmFtZSwgdmFsKSA9PiB7XG4gICAgICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yQ3RvcihuYW1lLCB2YWwpO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOdW1iZXJWYWxpZGF0b3IgKEVycm9yQ3Rvcikge1xuICAgIHJldHVybiAobmFtZSwgdmFsKSA9PiB7XG4gICAgICAgIGlmIChpc05hTihOdW1iZXIodmFsKSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JDdG9yKG5hbWUsIHR5cGVvZiB2YWwpO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVcmxWYWxpZGF0b3IgKEVycm9yQ3Rvcikge1xuICAgIHJldHVybiAobmFtZSwgdmFsKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbFR5cGUgPSB0eXBlb2YgdmFsO1xuXG4gICAgICAgIGlmICh2YWxUeXBlICE9PSAnc3RyaW5nJyAmJiAhKHZhbCBpbnN0YW5jZW9mIFVSTCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JDdG9yKG5hbWUsIHZhbFR5cGUpO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVcmxTZWFyY2hQYXJhbXNWYWxpZGF0b3IgKEVycm9yQ3Rvcikge1xuICAgIHJldHVybiAobmFtZSwgdmFsKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbFR5cGUgPSB0eXBlb2YgdmFsO1xuXG4gICAgICAgIGlmICh2YWxUeXBlICE9PSAnb2JqZWN0JyAmJiAhKHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcykpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JDdG9yKG5hbWUsIHZhbFR5cGUpO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPYmplY3RWYWxpZGF0b3IgKEVycm9yQ3Rvcikge1xuICAgIHJldHVybiAobmFtZSwgdmFsKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbFR5cGUgPSB0eXBlb2YgdmFsO1xuXG4gICAgICAgIGlmICh2YWxUeXBlICE9PSAnb2JqZWN0JylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvckN0b3IobmFtZSwgdmFsVHlwZSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uVmFsaWRhdG9yIChFcnJvckN0b3IpIHtcbiAgICByZXR1cm4gKG5hbWUsIHZhbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWxUeXBlID0gdHlwZW9mIHZhbDtcblxuICAgICAgICBpZiAodmFsVHlwZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvckN0b3IobmFtZSwgdmFsVHlwZSk7XG4gICAgfTtcbn1cbiJdfQ==