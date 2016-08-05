export default [{
  displayName: 'Record',
  field: 'name',
  width: 1,
  displayFn: ({ field }) => field.display.replace(/_(.)/g, ' $1').toUpperCase(),
}, {
  displayName: 'Value',
  field: 'value',
  width: 1,
}];
