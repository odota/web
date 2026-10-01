var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import legacyCodes from './legacy';
import { getStatusCode, getStatusText, } from './utils-functions';
export { getStatusCode, getReasonPhrase, getStatusText, } from './utils-functions';
export { StatusCodes, } from './status-codes';
export { ReasonPhrases, } from './reason-phrases';
export * from './legacy';
export default __assign(__assign({}, legacyCodes), { getStatusCode: getStatusCode,
    getStatusText: getStatusText });
