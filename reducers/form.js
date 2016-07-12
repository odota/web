import { formActions } from '../actions';

const initialFieldState = {
  chipList: [],
  text: '',
};

const field = (state = initialFieldState, action) => {
  switch (action.type) {
    case formActions.ADD_CHIP:
      return {
        ...state,
        chipList: [
          ...state.chipList, {
            value: action.value,
          },
        ],
      };
    case formActions.DELETE_CHIP:
      return {
        ...state,
        chipList: [
          ...state.chipList.slice(0, action.index),
          ...state.chipList.slice(action.index + 1, state.chipList.length),
        ],
      };
    case formActions.SET_FIELD_TEXT:
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};

const form = (state = {}, action) => {
  switch (action.type) {
    case formActions.ADD_CHIP:
    case formActions.DELETE_CHIP:
    case formActions.SET_FIELD_TEXT:
      return {
        ...state,
        [action.fieldName]: field(state[action.fieldName], action),
      };
    default:
      return state;
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case formActions.ADD_CHIP:
    case formActions.DELETE_CHIP:
    case formActions.SET_FIELD_TEXT:
      return {
        ...state,
        [action.formName]: form(state[action.formName], action),
      };
    default:
      return state;
  }
};

export const getForm = {
  getForm: (state, formName) => state.yaspReducer.form[formName],
  getFormValue: (state, formName, valueName) => {
    if (getForm.getForm(state, formName) && getForm.getForm(state, formName)[valueName]) {
      return getForm.getForm(state, formName)[valueName];
    }
    return initialFieldState;
  },
  getChipList: (state, formName, valueName) =>
    getForm.getFormValue(state, formName, valueName).chipList,
  getFieldText: (state, formName, valueName) => getForm.getFormValue(state, formName, valueName).text,
};
