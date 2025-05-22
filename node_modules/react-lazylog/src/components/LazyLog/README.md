Normal log viewing using a `url`:

```js
const url = 'https://gist.githubusercontent.com/helfi92/96d4444aa0ed46c5f9060a789d316100/raw/ba0d30a9877ea5cc23c7afcd44505dbc2bab1538/typical-live_backing.log';

<div style={{ height: 500, width: 902 }}>
  <LazyLog extraLines={1} enableSearch url={url} caseInsensitive />
</div>
```

See [`ScrollFollow`](#scrollfollow) for an example of a streaming endpoint.

Log viewing using `text` from a string :

```js
const text = `
Sed ut perspiciatis unde omnis iste natus error sit voluptatem
accusantium doloremque laudantium, totam rem aperiam,
eaque ipsa quae ab illo inventore veritatis et quasi architecto
beatae vitae dicta sunt explicabo. Nemo enim ipsam
voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
quia consequuntur magni dolores eos qui ratione
voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
ipsum quia dolor sit amet, consectetur, adipisci
velit, sed quia non numquam eius modi tempora incidunt ut labore
et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
reprehenderit qui in ea voluptate velit esse quam nihil molestiae
consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
`;

<div style={{ height: 300, width: 902 }}>
  <LazyLog extraLines={1} enableSearch text={text} caseInsensitive />
</div>
```

Log viewing using a websocket

```jsx harmony
const url = 'wss://echo.websocket.org';
let socket = null;

<div>
  <button
    style={{ marginBottom: 8, background: '#eee' }}
    onClick={() => socket && socket.send(JSON.stringify({ message: '[taskcluster 2018-11-14 21:08:32.452Z] Worker Group: us-east-1' }))}>
    ping
  </button>
  <div style={{ height: 200, width: 902 }}>
  <LazyLog
    enableSearch
    url={url}
    websocket
    websocketOptions={{
      onOpen: (e, sock) => {
          socket = sock; sock.send(JSON.stringify({message: "Socket has been opened!"}))
        },
      formatMessage: e => JSON.parse(e).message,
    }}
  />
  </div>
</div>
```
