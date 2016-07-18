// import { camelToSnake } from '../utility';
const querystring = require('querystring');

export const getUrl = (playerId, options, url) => `${url(playerId)}?${querystring.stringify(options)}`;

export const defaultOptions = {
  limit: [
      20,
    ],
};

export const getModifiedOptions = (options, excludedOptions) => {
  const modifiedOptions = {};
  Object.keys(options).forEach(key => {
    if (!excludedOptions.includes(key)) {
      modifiedOptions[key] = options[key];
    }
  });
  return modifiedOptions;
};
