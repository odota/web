/**
 * Do mappings of IDs to strings/data
 **/
import transformation from './transformations';

const playerMatchTransform = (match, field, constants) => {
  if (transformation[field])
  {
    return transformation[field](match, match[field], constants);
  }
  else {
    return match[field];
  }
};

export default playerMatchTransform;
