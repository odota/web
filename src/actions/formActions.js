import querystring from 'querystring';

const ADD_CHIP = 'form/ADD_CHIP';
const DELETE_CHIP = 'form/DELETE_CHIP';
const CLEAR_FORM = 'form/CLEAR_FORM';
const TOGGLE_SHOW_FORM = 'form/TOGGLE_SHOW_FORM';

export const formActions = {
  ADD_CHIP,
  DELETE_CHIP,
  CLEAR_FORM,
  TOGGLE_SHOW_FORM,
};

export const addChip = (router, name, input, limit) => {
  const query = querystring.parse(window.location.search.substring(1));
  const field = [input.value].concat(query[name] || []).slice(0, limit);
  router.push({
    pathname: window.location.pathname,
    query: {
      ...query,
      [name]: field,
    },
  });
};

export const deleteChip = (router, name, index) => {
  const query = querystring.parse(window.location.search.substring(1));
  const field = [].concat(query[name] || []);
  router.push({
    pathname: window.location.pathname,
    query: {
      ...query,
      [name]: [
        ...field.slice(0, index),
        ...field.slice(index + 1),
      ],
    },
  });
};

export const toggleShowForm = formName => ({
  type: TOGGLE_SHOW_FORM,
  formName,
});

export const clearForm = formName => ({
  type: CLEAR_FORM,
  formName,
});
