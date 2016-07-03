import transform from '../transformations';

export const transformationFunction = (list = []) => list.map(listItem => {
  const transformedList = {};
  Object.keys(listItem).forEach((field) => {
    transformedList[`${field}`] = {
      display: transform(listItem, field),
      value: listItem[field],
    };
  });
  return transformedList;
});
