Simple usage:

```js
<LinePart
  part={{ text: 'Hello world!' }}
/>
```

Format each line part

```js
<LinePart
  part={{ text: 'Hello world!' }}
  format={text => text.replace('world', 'galaxy')}
/>
```
