import mitt from 'mitt';
import { List } from 'immutable';
import { encode } from './encoding';
import { bufferConcat, convertBufferToLines } from './utils';

export default (url, options) => {
  const { onOpen, onClose, onError, formatMessage } = options;
  const emitter = mitt();
  let encodedLog = new Uint8Array();
  let overage = null;

  emitter.on('data', data => {
    encodedLog = bufferConcat(encodedLog, encode(data));

    const { lines, remaining } = convertBufferToLines(encode(data), overage);

    overage = remaining;

    emitter.emit('update', { lines, encodedLog });
  });

  emitter.on('done', () => {
    if (overage) {
      emitter.emit('update', { lines: List.of(overage), encodedLog });
    }

    emitter.emit('end', encodedLog);
  });

  emitter.on('start', () => {
    try {
      // try to connect to websocket
      const socket = new WebSocket(url);

      socket.addEventListener('open', e => {
        // relay on open events if a handler is registered
        onOpen && onOpen(e, socket);
      });
      socket.addEventListener('close', e => {
        onClose && onClose(e);
      });

      socket.addEventListener('error', err => {
        onError && onError(err);
      });

      socket.addEventListener('message', e => {
        let msg = formatMessage ? formatMessage(e.data) : e.data;

        if (typeof msg !== 'string') return;
        // add a new line character between each message if one doesn't exist.
        // this allows our search index to properly distinguish new lines.
        msg = msg.endsWith('\n') ? msg : `${msg}\n`;

        emitter.emit('data', msg);
      });

      emitter.on('abort', () => socket.close());
    } catch (err) {
      emitter.emit('error', err);
    }
  });

  return emitter;
};
