"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusText = exports.getStatusCode = exports.getReasonPhrase = void 0;
var utils_1 = require("./utils");
/**
 * Returns the reason phrase for the given status code.
 * If the given status code does not exist, an error is thrown.
 *
 * @param {number|string} statusCode The HTTP status code
 * @returns {string} The associated reason phrase (e.g. "Bad Request", "OK")
 * */
function getReasonPhrase(statusCode) {
    var result = utils_1.statusCodeToReasonPhrase[statusCode.toString()];
    if (!result) {
        throw new Error("Status code does not exist: " + statusCode);
    }
    return result;
}
exports.getReasonPhrase = getReasonPhrase;
/**
 * Returns the status code for the given reason phrase.
 * If the given reason phrase does not exist, undefined is returned.
 *
 * @param {string} reasonPhrase The HTTP reason phrase (e.g. "Bad Request", "OK")
 * @returns {string} The associated status code
 * */
function getStatusCode(reasonPhrase) {
    var result = utils_1.reasonPhraseToStatusCode[reasonPhrase];
    if (!result) {
        throw new Error("Reason phrase does not exist: " + reasonPhrase);
    }
    return result;
}
exports.getStatusCode = getStatusCode;
/**
 * @deprecated
 *
 * Returns the reason phrase for the given status code.
 * If the given status code does not exist, undefined is returned.
 *
 * Deprecated in favor of getReasonPhrase
 *
 * @param {number|string} statusCode The HTTP status code
 * @returns {string|undefined} The associated reason phrase (e.g. "Bad Request", "OK")
 * */
exports.getStatusText = getReasonPhrase;
