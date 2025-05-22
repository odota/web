import { Headers as HeadersPolyfill } from './polyfill/Headers';

function createAbortError() {
  // From https://github.com/mo/abortcontroller-polyfill/blob/master/src/abortableFetch.js#L56-L64

  try {
    return new DOMException('Aborted', 'AbortError');
  } catch (err) {
    // IE 11 does not support calling the DOMException constructor, use a
    // regular error object on it instead.
    const abortError = new Error('Aborted');
    abortError.name = 'AbortError';
    return abortError;
  }
}

export function makeXhrTransport({ responseType, responseParserFactory }) {
  return function xhrTransport(url, options) {
    const xhr = new XMLHttpRequest();
    const responseParser = responseParserFactory();

    let responseStreamController;
    let cancelled = false;

    const responseStream = new ReadableStream({
      start(c) {
        responseStreamController = c;
      },
      cancel() {
        cancelled = true;
        xhr.abort();
      }
    });

    const { method = 'GET', signal } = options;

    xhr.open(method, url);
    xhr.responseType = responseType;
    xhr.withCredentials = (options.credentials !== 'omit');
    if (options.headers) {
      for (const pair of options.headers.entries()) {
        xhr.setRequestHeader(pair[0], pair[1]);
      }
    }

    return new Promise((resolve, reject) => {
      if (options.body && (method === 'GET' || method === 'HEAD')) {
        reject(new TypeError("Failed to execute 'fetchStream' on 'Window': Request with GET/HEAD method cannot have body"))
      }

      if (signal) {
        if (signal.aborted) {
          // If already aborted, reject immediately & send nothing.
          reject(createAbortError());
          return;
        } else {
          signal.addEventListener('abort', () => {
            // If we abort later, kill the XHR & reject the promise if possible.
            xhr.abort();
            if (responseStreamController) {
              responseStreamController.error(createAbortError());
            }
            reject(createAbortError());
          }, { once: true });
        }
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.HEADERS_RECEIVED) {
          return resolve({
            body: responseStream,
            headers: parseResposneHeaders(xhr.getAllResponseHeaders()),
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            url: makeResponseUrl(xhr.responseURL, url)
          });
        }
      };

      xhr.onerror = function () {
        return reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      };

      xhr.onprogress = function () {
        if (!cancelled) {
          const bytes = responseParser(xhr.response);
          responseStreamController.enqueue(bytes);
        }
      };

      xhr.onload = function () {
        responseStreamController.close();
      };

      xhr.send(options.body);
    });
  }
}

function makeHeaders() {
  // Prefer the native method if provided by the browser.
  if (typeof Headers !== 'undefined') {
    return new Headers();
  }
  return new HeadersPolyfill();
}

function makeResponseUrl(responseUrl, requestUrl) {
  if (!responseUrl) {
    // best guess; note this will not correctly handle redirects.
    if (requestUrl.substring(0, 4) !== "http") {
      return location.origin + requestUrl;
    }
    return requestUrl;
  }
  return responseUrl;
}

export function parseResposneHeaders(str) {
  const hdrs = makeHeaders();
  if (str) {
    const pairs = str.split('\u000d\u000a');
    for (let i = 0; i < pairs.length; i++) {
      const p = pairs[i];
      const index = p.indexOf('\u003a\u0020');
      if (index > 0) {
        const key = p.substring(0, index);
        const value = p.substring(index + 2);
        hdrs.append(key, value);
      }
    }
  }
  return hdrs;
}