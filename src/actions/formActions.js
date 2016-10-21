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

export const toggleShowForm = formName => ({
  type: TOGGLE_SHOW_FORM,
  formName,
});

export const clearForm = formName => ({
  type: CLEAR_FORM,
  formName,
});
