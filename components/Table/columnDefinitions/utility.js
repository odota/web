export const defaultSort = (array, field) => array.sort((a, b) => {
  if (a[field] < b[field]) return -1;
  if (a[field] > b[field]) return 1;
  return 0;
});

export const useOriginalValueSort = (array, field) => defaultSort(array, field);

export const transformedSort = (transformFn, ...args) => {
  const [array, field] = args;
  return array.sort((a, b) => {
    if (transformFn(a, field) < transformFn(b, field)) return -1;
    if (transformFn(a, field) > transformFn(b, field)) return 1;
    return 0;
  });
};

export const winPercentTransform = numGamesField => (list, field, property) =>
  (list[numGamesField][property] ? list[field][property] / list[numGamesField][property] : 0);
