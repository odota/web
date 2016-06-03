export const defaultSort = (array, field) => array.sort((a, b) => {
  if (a[field] < b[field]) return -1;
  if (a[field] > b[field]) return 1;
  return 0;
});

export const useOriginalValueSort = (array, field) => {
  const origField = field.slice(0, field.lastIndexOf('Display'));
  return defaultSort(array, origField);
};
