# http-status-codes

Constants enumerating the HTTP status codes. Based on the [Java Apache HttpStatus API](http://hc.apache.org/httpclient-3.x/apidocs/org/apache/commons/httpclient/HttpStatus.html).

All status codes defined in RFC1945 (HTTP/1.0), RFC2616 (HTTP/1.1), RFC2518 (WebDAV), RFC6585 (Additional HTTP Status Codes), and RFC7538 (Permanent Redirect) are supported.

TypeScript or JavaScript. Completely library agnostic. No dependencies.

## Installation

```console
npm install http-status-codes --save
```

## Usage (express 4.x)

```typescript
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

response
	.status(StatusCodes.OK)
	.send(ReasonPhrases.OK);

response
	.status(StatusCodes.INTERNAL_SERVER_ERROR)
	.send({
		error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
	});

response
	.status(getStatusCode('Internal Server Error'))
	.send({
		error: 'Internal Server Error'
	});
```

## Codes

| Code | Constant                        | Reason Phrase                   |
| ---- | ------------------------------- | ------------------------------- |
| 100  | CONTINUE                        | Continue                        |
| 101  | SWITCHING_PROTOCOLS             | Switching Protocols             |
| 102  | PROCESSING                      | Processing                      |
| 103  | EARLY_HINTS                     | Early Hints                     |
| 200  | OK                              | OK                              |
| 201  | CREATED                         | Created                         |
| 202  | ACCEPTED                        | Accepted                        |
| 203  | NON_AUTHORITATIVE_INFORMATION   | Non Authoritative Information   |
| 204  | NO_CONTENT                      | No Content                      |
| 205  | RESET_CONTENT                   | Reset Content                   |
| 206  | PARTIAL_CONTENT                 | Partial Content                 |
| 207  | MULTI_STATUS                    | Multi-Status                    |
| 300  | MULTIPLE_CHOICES                | Multiple Choices                |
| 301  | MOVED_PERMANENTLY               | Moved Permanently               |
| 302  | MOVED_TEMPORARILY               | Moved Temporarily               |
| 303  | SEE_OTHER                       | See Other                       |
| 304  | NOT_MODIFIED                    | Not Modified                    |
| 305  | USE_PROXY                       | Use Proxy                       |
| 307  | TEMPORARY_REDIRECT              | Temporary Redirect              |
| 308  | PERMANENT_REDIRECT              | Permanent Redirect              |
| 400  | BAD_REQUEST                     | Bad Request                     |
| 401  | UNAUTHORIZED                    | Unauthorized                    |
| 402  | PAYMENT_REQUIRED                | Payment Required                |
| 403  | FORBIDDEN                       | Forbidden                       |
| 404  | NOT_FOUND                       | Not Found                       |
| 405  | METHOD_NOT_ALLOWED              | Method Not Allowed              |
| 406  | NOT_ACCEPTABLE                  | Not Acceptable                  |
| 407  | PROXY_AUTHENTICATION_REQUIRED   | Proxy Authentication Required   |
| 408  | REQUEST_TIMEOUT                 | Request Timeout                 |
| 409  | CONFLICT                        | Conflict                        |
| 410  | GONE                            | Gone                            |
| 411  | LENGTH_REQUIRED                 | Length Required                 |
| 412  | PRECONDITION_FAILED             | Precondition Failed             |
| 413  | REQUEST_TOO_LONG                | Request Entity Too Large        |
| 414  | REQUEST_URI_TOO_LONG            | Request-URI Too Long            |
| 415  | UNSUPPORTED_MEDIA_TYPE          | Unsupported Media Type          |
| 416  | REQUESTED_RANGE_NOT_SATISFIABLE | Requested Range Not Satisfiable |
| 417  | EXPECTATION_FAILED              | Expectation Failed              |
| 418  | IM_A_TEAPOT                     | I'm a teapot                    |
| 419  | INSUFFICIENT_SPACE_ON_RESOURCE  | Insufficient Space on Resource  |
| 420  | METHOD_FAILURE                  | Method Failure                  |
| 421  | MISDIRECTED_REQUEST             | Misdirected Request             |
| 422  | UNPROCESSABLE_ENTITY            | Unprocessable Entity            |
| 423  | LOCKED                          | Locked                          |
| 424  | FAILED_DEPENDENCY               | Failed Dependency               |
| 426  | UPGRADE_REQUIRED                | Upgrade Required                |
| 428  | PRECONDITION_REQUIRED           | Precondition Required           |
| 429  | TOO_MANY_REQUESTS               | Too Many Requests               |
| 431  | REQUEST_HEADER_FIELDS_TOO_LARGE | Request Header Fields Too Large |
| 451  | UNAVAILABLE_FOR_LEGAL_REASONS   | Unavailable For Legal Reasons   |
| 500  | INTERNAL_SERVER_ERROR           | Internal Server Error           |
| 501  | NOT_IMPLEMENTED                 | Not Implemented                 |
| 502  | BAD_GATEWAY                     | Bad Gateway                     |
| 503  | SERVICE_UNAVAILABLE             | Service Unavailable             |
| 504  | GATEWAY_TIMEOUT                 | Gateway Timeout                 |
| 505  | HTTP_VERSION_NOT_SUPPORTED      | HTTP Version Not Supported      |
| 507  | INSUFFICIENT_STORAGE            | Insufficient Storage            |
| 511  | NETWORK_AUTHENTICATION_REQUIRED | Network Authentication Required |

## Migrating from v1.x.x

http-status-codes v2 is mostly backwards compatible with v1. There is a single breaking change and two recommended changes.

#### [Breaking Change] 'Server Error'

The reason phrase for the status code `500` has been changed from `"Server Error"` to `"Internal Server Error"`. This is the correct phrase according to RFC7231. If you are migrating from v1, and have code that relies on the result of `getStatusText(500)` or `getReasonPhrase('Server Error')`, then this could affect you.

#### [Non-breaking change] getStatusText renamed getReasonPhrase

The function `getStatusText` has been renamed to `getReasonPhrase`. The old function is still available, but may be deprecated in a future version. To fix this simply rename instances of `getStatusText()` to `getReasonPhrase()`. The function is otherwise the same as it was before.

#### [Non-breaking change] StatusCodes

In http-status-codes v1, Status Codes were exported directly from the top-level module. i.e. `HttpStatus.OK`. In v2 all Status Codes live under an object called `StatusCodes`. i.e. `HttpStatus.StatusCodes.OK`. We made this change to cater to TypeScript users who prefer a dedicated value with an enum type. The previous values are still exported, but we won't continue to update them. Please migrate if you're using the old-style imports.

## Proposing a new status code

If you'd like to propose a new status code, feel free to update "codes.json" with the necessary
information and open a pull request. There is no need to modify source code or even this README.
This is done automatically by `npm run update-codes`.

In general, we try to include only codes that have an official RFC and have been approved, however
exceptions can be made if the code is already in widespread use in the wild.

## Steps to build and publish

```shell
npm run update-codes
npm run test
npm run build
npm version [major | minor | patch]
npm publish
```

After releasing, please add release notes via GitHub Releases.
