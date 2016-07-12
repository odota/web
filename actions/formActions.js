import { form } from '../reducers';

const ADD_CHIP = 'yasp/form/ADD_CHIP';
const DELETE_CHIP = 'yasp/form/DELETE_CHIP';
const SET_FIELD_TEXT = 'yasp/form/SET_FIELD_TEXT';
const CLEAR_FORM = 'yasp/form/CLEAR_FORM';

export const formActions = {
  ADD_CHIP,
  DELETE_CHIP,
  SET_FIELD_TEXT,
  CLEAR_FORM,
};


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
  Object.keys(form.getForm(getState(), formName)).forEach(key => {
    formFields[key] = {
      values: form.getChipList(getState(), formName, key).map(chip => chip.value.value),
    };
  });
  dispatch(submitAction(formFields));
  dispatch(clearForm(formName));
};
