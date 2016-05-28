import fetch from 'isomorphic-fetch';
import { HOST_URL } from '../actions';
const url = '/api/metadata';
const REQUEST = 'yasp/metadata/REQUEST';
const OK = 'yasp/metadata/OK';
const ERROR = 'yasp/metadata/ERROR';
export const metadataActions = {
  REQUEST,
  OK,
  ERROR
};
const getMetadataRequest = () => (
{
  type: REQUEST
});
const getMetadataOk = (payload) => (
{
  type: OK,
  payload
})
const getMetadataError = (payload) => (
{
  type: ERROR,
  payload
});
export const getMetadata = (userId, host = HOST_URL) =>
{
  return (dispatch) =>
  {
    return fetch(`${host}${url}`).then(response => response.json()).then(json =>
    {
      const links = Object.keys(json.navbar_pages).map((key, index) =>
      {
        return json.navbar_pages[key];
      });
      const transformedData = Object.assign({}, {links: links}, json);
      dispatch(getMetadataOk(transformedData));
    }).catch(error =>
    {
      console.error(error);
      dispatch(getMetadataError(error));
    });
  };
};
