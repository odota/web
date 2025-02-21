import { List } from 'immutable';
import mitt from 'mitt';
import { convertBufferToLines, bufferConcat } from './utils';

const fetcher = Promise.resolve().then(() =>
  'ReadableStream' in self && 'body' in self.Response.prototype
    ? self.fetch
    : import('@mattiasbuelens/web-streams-polyfill/ponyfill').then(
        ({ ReadableStream }) => {
          self.ReadableStream = ReadableStream;

          return import('fetch-readablestream');
        }
      )
);

export const recurseReaderAsEvent = async (reader, emitter) => {
  const result = await reader.read();

  if (result.value) {
    emitter.emit('data', result.value);
  }

  if (!result.done) {
    return recurseReaderAsEvent(reader, emitter);
  }

  emitter.emit('done');
};

export default (url, options) => {
  const emitter = mitt();
  let overage = null;
  let encodedLog = new Uint8Array();

  emitter.on('data', data => {
    encodedLog = bufferConcat(encodedLog, new Uint8Array(data));

    const { lines, remaining } = convertBufferToLines(data, overage);

    overage = remaining;
    emitter.emit('update', { lines, encodedLog });
  });

  emitter.on('done', () => {
    if (overage) {
      emitter.emit('update', { lines: List.of(overage), encodedLog });
    }

    emitter.emit('end', encodedLog);
  });

  emitter.on('start', async () => {
    try {
      const fetch = await fetcher;
      const response = await fetch(
        url,
        Object.assign({ credentials: 'omit' }, options)
      );

      if (!response.ok) {
        const error = new Error(response.statusText);

        error.status = response.status;
        emitter.emit('error', error);

        return;
      }

      const reader = response.body.getReader();

      emitter.on('abort', () => reader.cancel('ABORTED'));

      return recurseReaderAsEvent(reader, emitter);
    } catch (err) {
      emitter.emit('error', err);
    }
  });

  return emitter;
};
