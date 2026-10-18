"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegExp = exports.parseRegExpString = void 0;
const escapeRegExp_1 = __importDefault(require("lodash/escapeRegExp"));
const SPLIT_INPUT_AND_FLAGS_REG_EXP = /^\/(.*?)\/([gim]*)$/;
function parseRegExpString(regExp) {
    if (typeof regExp !== 'string')
        return regExp;
    const parsedRegExpWithFlags = regExp.match(SPLIT_INPUT_AND_FLAGS_REG_EXP);
    if (parsedRegExpWithFlags)
        return RegExp(parsedRegExpWithFlags[1], parsedRegExpWithFlags[2]);
    return makeRegExp(regExp);
}
exports.parseRegExpString = parseRegExpString;
function makeRegExp(str, flags) {
    return typeof str === 'string' ? new RegExp((0, escapeRegExp_1.default)(str), flags) : str;
}
exports.makeRegExp = makeRegExp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZS1yZWctZXhwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL21ha2UtcmVnLWV4cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1RUFBK0M7QUFFL0MsTUFBTSw2QkFBNkIsR0FBRyxxQkFBcUIsQ0FBQztBQUU1RCxTQUFnQixpQkFBaUIsQ0FBRSxNQUFNO0lBQ3JDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtRQUMxQixPQUFPLE1BQU0sQ0FBQztJQUVsQixNQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUUxRSxJQUFJLHFCQUFxQjtRQUNyQixPQUFPLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRFLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFWRCw4Q0FVQztBQUVELFNBQWdCLFVBQVUsQ0FBRSxHQUFHLEVBQUUsS0FBSztJQUNsQyxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBQSxzQkFBWSxFQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDaEYsQ0FBQztBQUZELGdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVzY2FwZVJlZ0V4cCBmcm9tICdsb2Rhc2gvZXNjYXBlUmVnRXhwJztcblxuY29uc3QgU1BMSVRfSU5QVVRfQU5EX0ZMQUdTX1JFR19FWFAgPSAvXlxcLyguKj8pXFwvKFtnaW1dKikkLztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmVnRXhwU3RyaW5nIChyZWdFeHApIHtcbiAgICBpZiAodHlwZW9mIHJlZ0V4cCAhPT0gJ3N0cmluZycpXG4gICAgICAgIHJldHVybiByZWdFeHA7XG5cbiAgICBjb25zdCBwYXJzZWRSZWdFeHBXaXRoRmxhZ3MgPSByZWdFeHAubWF0Y2goU1BMSVRfSU5QVVRfQU5EX0ZMQUdTX1JFR19FWFApO1xuXG4gICAgaWYgKHBhcnNlZFJlZ0V4cFdpdGhGbGFncylcbiAgICAgICAgcmV0dXJuIFJlZ0V4cChwYXJzZWRSZWdFeHBXaXRoRmxhZ3NbMV0sIHBhcnNlZFJlZ0V4cFdpdGhGbGFnc1syXSk7XG5cbiAgICByZXR1cm4gbWFrZVJlZ0V4cChyZWdFeHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVJlZ0V4cCAoc3RyLCBmbGFncykge1xuICAgIHJldHVybiB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHN0ciksIGZsYWdzKSA6IHN0cjtcbn1cbiJdfQ==