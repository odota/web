"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
function prepareApiFnArgs(fnName, ...args) {
    args = args.map(arg => {
        if (typeof arg === 'string')
            return `'${arg}'`;
        if (typeof arg === 'function')
            return '[function]';
        if (typeof arg === 'object')
            return util_1.default.inspect(arg, { compact: true, breakLength: Infinity });
        return arg;
    });
    args = args.join(', ');
    return `.${fnName}(${args})`;
}
exports.default = prepareApiFnArgs;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZS1hcGktYXJncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnQtZnVuY3Rpb25zL3NlbGVjdG9ycy9wcmVwYXJlLWFwaS1hcmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBRXhCLFNBQXdCLGdCQUFnQixDQUFFLE1BQU0sRUFBRSxHQUFHLElBQUk7SUFDckQsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1lBQ3ZCLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVU7WUFDekIsT0FBTyxZQUFZLENBQUM7UUFDeEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1lBQ3ZCLE9BQU8sY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV2QixPQUFPLElBQUksTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDO0FBQ2pDLENBQUM7QUFiRCxtQ0FhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVwYXJlQXBpRm5BcmdzIChmbk5hbWUsIC4uLmFyZ3MpIHtcbiAgICBhcmdzID0gYXJncy5tYXAoYXJnID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgcmV0dXJuIGAnJHthcmd9J2A7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgcmV0dXJuICdbZnVuY3Rpb25dJztcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgcmV0dXJuIHV0aWwuaW5zcGVjdChhcmcsIHsgY29tcGFjdDogdHJ1ZSwgYnJlYWtMZW5ndGg6IEluZmluaXR5IH0pO1xuICAgICAgICByZXR1cm4gYXJnO1xuICAgIH0pO1xuICAgIGFyZ3MgPSBhcmdzLmpvaW4oJywgJyk7XG5cbiAgICByZXR1cm4gYC4ke2ZuTmFtZX0oJHthcmdzfSlgO1xufVxuIl19