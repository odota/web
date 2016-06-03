import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';

const getLinks = (state) => state[REDUCER_KEY].gotConstants.links;

const getAlphabetizedLinks = createSelector(
  [getLinks],
  (links) => links.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  })
);

export default getAlphabetizedLinks;
