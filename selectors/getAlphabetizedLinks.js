import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';

const getLinks = (state) => state[REDUCER_KEY].gotConstants.links;

const getAlphabetizedLinks = createSelector(
  [getLinks],
  (links) => links.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name === b.name) return 0;
    if (a.name > b.name) return 1;
  })
);

export default getAlphabetizedLinks;
