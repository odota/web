// import { camelToSnake } from 'utility';
import querystring from 'querystring';

export const getUrl = (playerId, options, url) =>
  `${url(playerId)}?${querystring.stringify(options)}`;
