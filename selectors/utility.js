import transform from '../transformations';

export const transformationFunction = (list, constants) => list.map(listItem => {
  const transformedList = {};
  Object.keys(listItem).forEach((field) => {
    transformedList[`${field}`] = {
      display: transform(listItem, field, constants),
      value: listItem[field],
    };
  });
  return transformedList;
});
