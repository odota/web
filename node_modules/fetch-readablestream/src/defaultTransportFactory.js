import fetchRequest from './fetch';
import { makeXhrTransport } from './xhr';

// selected is used to cache the detected transport.
let selected = null;

// defaultTransportFactory selects the most appropriate transport based on the
// capabilities of the current environment.
export default function defaultTransportFactory() {
  if (!selected) {
    selected = detectTransport();
  }
  return selected;
}

function detectTransport() {
  if (typeof Response !== 'undefined' && Response.prototype.hasOwnProperty("body")) {
    // fetch with ReadableStream support.
    return fetchRequest;
  }

  const mozChunked = 'moz-chunked-arraybuffer';
  if (supportsXhrResponseType(mozChunked)) {
    // Firefox, ArrayBuffer support.
    return makeXhrTransport({
      responseType: mozChunked,
      responseParserFactory: function () {
        return response => new Uint8Array(response);
      }
    });
  }

  // Bog-standard, expensive, text concatenation with byte encoding :(
  return makeXhrTransport({
    responseType: 'text',
    responseParserFactory: function () {
      const encoder = new TextEncoder();
      let offset = 0;
      return function (response) {
        const chunk = response.substr(offset);
        offset = response.length;
        return encoder.encode(chunk, { stream: true });
      }
    }
  });
}

function supportsXhrResponseType(type) {
  try {
    const tmpXhr = new XMLHttpRequest();
    tmpXhr.responseType = type;
    return tmpXhr.responseType === type;
  } catch (e) { /* IE throws on setting responseType to an unsupported value */ }
  return false;
}
