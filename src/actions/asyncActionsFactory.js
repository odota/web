/* global API_HOST */
// TODO - work in progress
// import fetch from 'isomorphic-fetch';
// import { player } from 'reducers';
//
// export default (url, name, selector) => {
//   const upperCaseName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
//   const REQUEST = `${name}/REQUEST`;
//   const OK = `${name}/OK`;
//   const ERROR = `${name}/ERROR`;
//
//   return {
//     [`${name}Actions`]: {
//       REQUEST,
//       OK,
//       ERROR,
//     },
//     [`get${upperCaseName}Request`]: (id) => ({ type: REQUEST, id }),
//     [`get${upperCaseName}Ok`]: (payload, id) => ({ type: OK, payload, id }),
//     [`get${upperCaseName}Error`]: (payload, id) => ({ type: ERROR, payload, id }),
//     [`get${upperCaseName}`]: (accountId, isUser, host = API_HOST) => (dispatch, getState) => {
//       if (selector.isLoaded(getState(), accountId)) {
//         dispatch()
//       }
//     }
//   };
//
//   const getPlayer = (accountId, isUser, host = API_HOST) => (dispatch, getState) => {
//     // we are checking to see if the player object exists here.
//     if (player.isLoaded(getState(), accountId)) {
//       dispatch(getPlayerOk(player.getPlayer(getState(), accountId), accountId));
//     } else {
//       dispatch(getPlayerRequest(accountId));
//     }
//     return fetch(`${host}${url}/${accountId}`)
//       .then(response => response.json(accountId))
//       .then(json => {
//         dispatch(getPlayerOk(json, accountId));
//       })
//       .catch(error => {
//         dispatch(getPlayerError(error, accountId));
//       });
//   };
// };
