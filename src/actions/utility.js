// import { camelToSnake } from 'utility';
import querystring from 'querystring';

export const getUrl = (playerId, options, url) =>
  `${url(playerId)}?${querystring.stringify(options)}`;

export const getModifiedOptions = (options, excludedOptions) => {
  const modifiedOptions = {};
  Object.keys(options).forEach(key => {
    if (!excludedOptions.includes(key)) {
      modifiedOptions[key] = options[key];
    }
  });
  return modifiedOptions;
};
