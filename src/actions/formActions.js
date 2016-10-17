import { form } from 'reducers';

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
  const chipList = form.getFormFieldChipList(getState(), formName, fieldName);
  // If we're at limit, remove the latest chip
  if (chipList.length >= limit) {
    dispatch(deleteChip(formName, fieldName, chipList.length - 1));
  }
  // Prevent duplicate inputs
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
