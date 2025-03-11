Simple usage:

```js
<LineContent
  number={10}
  data={[{ text: 'Hello' }, { text: ' world!' }]}
/>
```

Format each line part

```js
<LineContent
  number={10}
  data={[{ text: 'Hello' }, { text: ' world!' }]}
  formatPart={text => text.replace('world', 'galaxy')}
/>
```