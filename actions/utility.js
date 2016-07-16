// import { camelToSnake } from '../utility';

export const getUrl = (playerId, options, url) =>
  `${url(playerId)}${options.reduce((previous, current) =>
    current.values.reduce((total, value) => `${previous}${current.queryParam}=${value}&`, ''), '?')}`;

export const addQueryString = options => Object.keys(options).map(key => ({
  ...options[key],
  queryParam: key,
}));

export const defaultOptions = {
  limit: {
    values: [
      20,
    ],
  },
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
