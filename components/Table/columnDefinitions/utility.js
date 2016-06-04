export const defaultSort = (array, field, property = 'display') => array.sort((a, b) => {
  if (a[field][property] < b[field][property]) return -1;
  if (a[field][property] > b[field][property]) return 1;
  return 0;
});

export const useOriginalValueSort = (array, field) => defaultSort(array, field, 'value');
