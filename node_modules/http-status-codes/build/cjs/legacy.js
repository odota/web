"use strict";
// Exporting constants directly to maintain compatability with v1
// These are deprecated. Please don't add any new codes here.
Object.defineProperty(exports, "__esModule", { value: true });
exports.USE_PROXY = exports.UNSUPPORTED_MEDIA_TYPE = exports.UNPROCESSABLE_ENTITY = exports.UNAUTHORIZED = exports.TOO_MANY_REQUESTS = exports.TEMPORARY_REDIRECT = exports.SWITCHING_PROTOCOLS = exports.SERVICE_UNAVAILABLE = exports.SEE_OTHER = exports.RESET_CONTENT = exports.REQUESTED_RANGE_NOT_SATISFIABLE = exports.REQUEST_URI_TOO_LONG = exports.REQUEST_TOO_LONG = exports.REQUEST_TIMEOUT = exports.REQUEST_HEADER_FIELDS_TOO_LARGE = exports.PROXY_AUTHENTICATION_REQUIRED = exports.PROCESSING = exports.PRECONDITION_REQUIRED = exports.PRECONDITION_FAILED = exports.PERMANENT_REDIRECT = exports.PAYMENT_REQUIRED = exports.PARTIAL_CONTENT = exports.OK = exports.NOT_MODIFIED = exports.NOT_IMPLEMENTED = exports.NOT_FOUND = exports.NOT_ACCEPTABLE = exports.NON_AUTHORITATIVE_INFORMATION = exports.NO_CONTENT = exports.NETWORK_AUTHENTICATION_REQUIRED = exports.MULTIPLE_CHOICES = exports.MULTI_STATUS = exports.MOVED_TEMPORARILY = exports.MOVED_PERMANENTLY = exports.METHOD_NOT_ALLOWED = exports.METHOD_FAILURE = exports.LOCKED = exports.LENGTH_REQUIRED = exports.INTERNAL_SERVER_ERROR = exports.INSUFFICIENT_STORAGE = exports.INSUFFICIENT_SPACE_ON_RESOURCE = exports.IM_A_TEAPOT = exports.HTTP_VERSION_NOT_SUPPORTED = exports.GONE = exports.GATEWAY_TIMEOUT = exports.FORBIDDEN = exports.FAILED_DEPENDENCY = exports.EXPECTATION_FAILED = exports.CREATED = exports.CONTINUE = exports.CONFLICT = exports.BAD_REQUEST = exports.BAD_GATEWAY = exports.ACCEPTED = void 0;
/**
 * @deprecated Please use StatusCodes.ACCEPTED
 *
 * */
exports.ACCEPTED = 202;
/**
 * @deprecated Please use StatusCodes.BAD_GATEWAY
 *
 * */
exports.BAD_GATEWAY = 502;
/**
 * @deprecated Please use StatusCodes.BAD_REQUEST
 *
 * */
exports.BAD_REQUEST = 400;
/**
 * @deprecated Please use StatusCodes.CONFLICT
 *
 * */
exports.CONFLICT = 409;
/**
 * @deprecated Please use StatusCodes.CONTINUE
 *
 * */
exports.CONTINUE = 100;
/**
 * @deprecated Please use StatusCodes.CREATED
 *
 * */
exports.CREATED = 201;
/**
 * @deprecated Please use StatusCodes.EXPECTATION_FAILED
 *
 * */
exports.EXPECTATION_FAILED = 417;
/**
 * @deprecated Please use StatusCodes.FAILED_DEPENDENCY
 *
 * */
exports.FAILED_DEPENDENCY = 424;
/**
 * @deprecated Please use StatusCodes.FORBIDDEN
 *
 * */
exports.FORBIDDEN = 403;
/**
 * @deprecated Please use StatusCodes.GATEWAY_TIMEOUT
 *
 * */
exports.GATEWAY_TIMEOUT = 504;
/**
 * @deprecated Please use StatusCodes.GONE
 *
 * */
exports.GONE = 410;
/**
 * @deprecated Please use StatusCodes.HTTP_VERSION_NOT_SUPPORTED
 *
 * */
exports.HTTP_VERSION_NOT_SUPPORTED = 505;
/**
 * @deprecated Please use StatusCodes.IM_A_TEAPOT
 *
 * */
exports.IM_A_TEAPOT = 418;
/**
 * @deprecated Please use StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE
 *
 * */
exports.INSUFFICIENT_SPACE_ON_RESOURCE = 419;
/**
 * @deprecated Please use StatusCodes.INSUFFICIENT_STORAGE
 *
 * */
exports.INSUFFICIENT_STORAGE = 507;
/**
 * @deprecated Please use StatusCodes.INTERNAL_SERVER_ERROR
 *
 * */
exports.INTERNAL_SERVER_ERROR = 500;
/**
 * @deprecated Please use StatusCodes.LENGTH_REQUIRED
 *
 * */
exports.LENGTH_REQUIRED = 411;
/**
 * @deprecated Please use StatusCodes.LOCKED
 *
 * */
exports.LOCKED = 423;
/**
 * @deprecated Please use StatusCodes.METHOD_FAILURE
 *
 * */
exports.METHOD_FAILURE = 420;
/**
 * @deprecated Please use StatusCodes.METHOD_NOT_ALLOWED
 *
 * */
exports.METHOD_NOT_ALLOWED = 405;
/**
 * @deprecated Please use StatusCodes.MOVED_PERMANENTLY
 *
 * */
exports.MOVED_PERMANENTLY = 301;
/**
 * @deprecated Please use StatusCodes.MOVED_TEMPORARILY
 *
 * */
exports.MOVED_TEMPORARILY = 302;
/**
 * @deprecated Please use StatusCodes.MULTI_STATUS
 *
 * */
exports.MULTI_STATUS = 207;
/**
 * @deprecated Please use StatusCodes.MULTIPLE_CHOICES
 *
 * */
exports.MULTIPLE_CHOICES = 300;
/**
 * @deprecated Please use StatusCodes.NETWORK_AUTHENTICATION_REQUIRED
 *
 * */
exports.NETWORK_AUTHENTICATION_REQUIRED = 511;
/**
 * @deprecated Please use StatusCodes.NO_CONTENT
 *
 * */
exports.NO_CONTENT = 204;
/**
 * @deprecated Please use StatusCodes.NON_AUTHORITATIVE_INFORMATION
 *
 * */
exports.NON_AUTHORITATIVE_INFORMATION = 203;
/**
 * @deprecated Please use StatusCodes.NOT_ACCEPTABLE
 *
 * */
exports.NOT_ACCEPTABLE = 406;
/**
 * @deprecated Please use StatusCodes.NOT_FOUND
 *
 * */
exports.NOT_FOUND = 404;
/**
 * @deprecated Please use StatusCodes.NOT_IMPLEMENTED
 *
 * */
exports.NOT_IMPLEMENTED = 501;
/**
 * @deprecated Please use StatusCodes.NOT_MODIFIED
 *
 * */
exports.NOT_MODIFIED = 304;
/**
 * @deprecated Please use StatusCodes.OK
 *
 * */
exports.OK = 200;
/**
 * @deprecated Please use StatusCodes.PARTIAL_CONTENT
 *
 * */
exports.PARTIAL_CONTENT = 206;
/**
 * @deprecated Please use StatusCodes.PAYMENT_REQUIRED
 *
 * */
exports.PAYMENT_REQUIRED = 402;
/**
 * @deprecated Please use StatusCodes.PERMANENT_REDIRECT
 *
 * */
exports.PERMANENT_REDIRECT = 308;
/**
 * @deprecated Please use StatusCodes.PRECONDITION_FAILED
 *
 * */
exports.PRECONDITION_FAILED = 412;
/**
 * @deprecated Please use StatusCodes.PRECONDITION_REQUIRED
 *
 * */
exports.PRECONDITION_REQUIRED = 428;
/**
 * @deprecated Please use StatusCodes.PROCESSING
 *
 * */
exports.PROCESSING = 102;
/**
 * @deprecated Please use StatusCodes.PROXY_AUTHENTICATION_REQUIRED
 *
 * */
exports.PROXY_AUTHENTICATION_REQUIRED = 407;
/**
 * @deprecated Please use StatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE
 *
 * */
exports.REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
/**
 * @deprecated Please use StatusCodes.REQUEST_TIMEOUT
 *
 * */
exports.REQUEST_TIMEOUT = 408;
/**
 * @deprecated Please use StatusCodes.REQUEST_TOO_LONG
 *
 * */
exports.REQUEST_TOO_LONG = 413;
/**
 * @deprecated Please use StatusCodes.REQUEST_URI_TOO_LONG
 *
 * */
exports.REQUEST_URI_TOO_LONG = 414;
/**
 * @deprecated Please use StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE
 *
 * */
exports.REQUESTED_RANGE_NOT_SATISFIABLE = 416;
/**
 * @deprecated Please use StatusCodes.RESET_CONTENT
 *
 * */
exports.RESET_CONTENT = 205;
/**
 * @deprecated Please use StatusCodes.SEE_OTHER
 *
 * */
exports.SEE_OTHER = 303;
/**
 * @deprecated Please use StatusCodes.SERVICE_UNAVAILABLE
 *
 * */
exports.SERVICE_UNAVAILABLE = 503;
/**
 * @deprecated Please use StatusCodes.SWITCHING_PROTOCOLS
 *
 * */
exports.SWITCHING_PROTOCOLS = 101;
/**
 * @deprecated Please use StatusCodes.TEMPORARY_REDIRECT
 *
 * */
exports.TEMPORARY_REDIRECT = 307;
/**
 * @deprecated Please use StatusCodes.TOO_MANY_REQUESTS
 *
 * */
exports.TOO_MANY_REQUESTS = 429;
/**
 * @deprecated Please use StatusCodes.UNAUTHORIZED
 *
 * */
exports.UNAUTHORIZED = 401;
/**
 * @deprecated Please use StatusCodes.UNPROCESSABLE_ENTITY
 *
 * */
exports.UNPROCESSABLE_ENTITY = 422;
/**
 * @deprecated Please use StatusCodes.UNSUPPORTED_MEDIA_TYPE
 *
 * */
exports.UNSUPPORTED_MEDIA_TYPE = 415;
/**
 * @deprecated Please use StatusCodes.USE_PROXY
 *
 * */
exports.USE_PROXY = 305;
exports.default = {
    ACCEPTED: exports.ACCEPTED,
    BAD_GATEWAY: exports.BAD_GATEWAY,
    BAD_REQUEST: exports.BAD_REQUEST,
    CONFLICT: exports.CONFLICT,
    CONTINUE: exports.CONTINUE,
    CREATED: exports.CREATED,
    EXPECTATION_FAILED: exports.EXPECTATION_FAILED,
    FORBIDDEN: exports.FORBIDDEN,
    GATEWAY_TIMEOUT: exports.GATEWAY_TIMEOUT,
    GONE: exports.GONE,
    HTTP_VERSION_NOT_SUPPORTED: exports.HTTP_VERSION_NOT_SUPPORTED,
    IM_A_TEAPOT: exports.IM_A_TEAPOT,
    INSUFFICIENT_SPACE_ON_RESOURCE: exports.INSUFFICIENT_SPACE_ON_RESOURCE,
    INSUFFICIENT_STORAGE: exports.INSUFFICIENT_STORAGE,
    INTERNAL_SERVER_ERROR: exports.INTERNAL_SERVER_ERROR,
    LENGTH_REQUIRED: exports.LENGTH_REQUIRED,
    LOCKED: exports.LOCKED,
    METHOD_FAILURE: exports.METHOD_FAILURE,
    METHOD_NOT_ALLOWED: exports.METHOD_NOT_ALLOWED,
    MOVED_PERMANENTLY: exports.MOVED_PERMANENTLY,
    MOVED_TEMPORARILY: exports.MOVED_TEMPORARILY,
    MULTI_STATUS: exports.MULTI_STATUS,
    MULTIPLE_CHOICES: exports.MULTIPLE_CHOICES,
    NETWORK_AUTHENTICATION_REQUIRED: exports.NETWORK_AUTHENTICATION_REQUIRED,
    NO_CONTENT: exports.NO_CONTENT,
    NON_AUTHORITATIVE_INFORMATION: exports.NON_AUTHORITATIVE_INFORMATION,
    NOT_ACCEPTABLE: exports.NOT_ACCEPTABLE,
    NOT_FOUND: exports.NOT_FOUND,
    NOT_IMPLEMENTED: exports.NOT_IMPLEMENTED,
    NOT_MODIFIED: exports.NOT_MODIFIED,
    OK: exports.OK,
    PARTIAL_CONTENT: exports.PARTIAL_CONTENT,
    PAYMENT_REQUIRED: exports.PAYMENT_REQUIRED,
    PERMANENT_REDIRECT: exports.PERMANENT_REDIRECT,
    PRECONDITION_FAILED: exports.PRECONDITION_FAILED,
    PRECONDITION_REQUIRED: exports.PRECONDITION_REQUIRED,
    PROCESSING: exports.PROCESSING,
    PROXY_AUTHENTICATION_REQUIRED: exports.PROXY_AUTHENTICATION_REQUIRED,
    REQUEST_HEADER_FIELDS_TOO_LARGE: exports.REQUEST_HEADER_FIELDS_TOO_LARGE,
    REQUEST_TIMEOUT: exports.REQUEST_TIMEOUT,
    REQUEST_TOO_LONG: exports.REQUEST_TOO_LONG,
    REQUEST_URI_TOO_LONG: exports.REQUEST_URI_TOO_LONG,
    REQUESTED_RANGE_NOT_SATISFIABLE: exports.REQUESTED_RANGE_NOT_SATISFIABLE,
    RESET_CONTENT: exports.RESET_CONTENT,
    SEE_OTHER: exports.SEE_OTHER,
    SERVICE_UNAVAILABLE: exports.SERVICE_UNAVAILABLE,
    SWITCHING_PROTOCOLS: exports.SWITCHING_PROTOCOLS,
    TEMPORARY_REDIRECT: exports.TEMPORARY_REDIRECT,
    TOO_MANY_REQUESTS: exports.TOO_MANY_REQUESTS,
    UNAUTHORIZED: exports.UNAUTHORIZED,
    UNPROCESSABLE_ENTITY: exports.UNPROCESSABLE_ENTITY,
    UNSUPPORTED_MEDIA_TYPE: exports.UNSUPPORTED_MEDIA_TYPE,
    USE_PROXY: exports.USE_PROXY,
};
