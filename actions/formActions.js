import { form } from '../reducers';

const ADD_CHIP = 'yasp/form/ADD_CHIP';
const DELETE_CHIP = 'yasp/form/DELETE_CHIP';
const SET_FIELD_TEXT = 'yasp/form/SET_FIELD_TEXT';

export const formActions = {
  ADD_CHIP,
  DELETE_CHIP,
  SET_FIELD_TEXT,
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
