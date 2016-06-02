import { createSelector } from 'reselect';

const playerMatchTransform = (match) => (heroes) => {
  const transformedMatch = { ...match };
  Object.keys(match).forEach((field) => {
    transformedMatch[`${field}Display`] = playerMatchTransformSwitch(match, field, heroes);
  });
  return transformedMatch;
};
