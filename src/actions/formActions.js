/* global window */
import { form } from 'reducers';
import querystring from 'querystring';

const ADD_CHIP = 'form/ADD_CHIP';
const DELETE_CHIP = 'form/DELETE_CHIP';
const SET_FIELD_TEXT = 'form/SET_FIELD_TEXT';
const CLEAR_FORM = 'form/CLEAR_FORM';
const TOGGLE_SHOW_FORM = 'tabs/TOGGLE_SHOW_FORM';

export const formActions = {
  ADD_CHIP,
  DELETE_CHIP,
  SET_FIELD_TEXT,
  CLEAR_FORM,
  TOGGLE_SHOW_FORM,
};

export const toggleShowForm = (formName, page) => ({
  type: TOGGLE_SHOW_FORM,
  page,
  formName,
});

export const deleteChip = (formName, fieldName, index) => ({
  type: DELETE_CHIP,
  formName,
  fieldName,
  index,
});

export const setFieldText = (formName, fieldName, text) => ({
  type: SET_FIELD_TEXT,
  formName,
  fieldName,
  text,
});

export const addChip = (formName, fieldName, value, limit) => (dispatch, getState) => {
  const chipList = form.getChipList(getState(), formName, fieldName);
  if (chipList.length >= limit) {
    dispatch(deleteChip(formName, fieldName, chipList.length - 1));
  }
  const index = chipList.findIndex(chip => chip.value.value === value.value);
  if (index === -1) {
    return dispatch({
      type: ADD_CHIP,
      formName,
      fieldName,
      value,
    });
  }
  return null;
};

export const clearForm = formName => ({
  type: CLEAR_FORM,
  formName,
});

export const submitForm = (submitAction, formName) => (dispatch, getState) => {
  const formFields = {};
  Object.keys(form.getForm(getState(), formName)).forEach((key) => {
    // We have a pages object attached to the form for form showing state. We don't
    // want that to be submitted.
    if (key !== 'pages') {
      formFields[key] = form.getChipList(getState(), formName, key).map(chip => chip.value);
    }
  });
  window.history.pushState('', '', `?${querystring.stringify(formFields)}`);
  dispatch(submitAction(formFields));
};
