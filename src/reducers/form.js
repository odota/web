import { formActions } from 'actions';

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
            ...action.value,
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

// TODO Hydrate initial form state from query string
const initialFormState = {
  show: false,
};

const form = (state = initialFormState, action) => {
  switch (action.type) {
    case formActions.ADD_CHIP:
    case formActions.DELETE_CHIP:
    case formActions.SET_FIELD_TEXT:
      return {
        ...state,
        [action.fieldName]: field(state[action.fieldName], action),
      };
    case formActions.TOGGLE_SHOW_FORM:
      return {
        ...state,
        show: !state.show,
      };
    case formActions.CLEAR_FORM:
      return {
        ...initialFormState,
        show: state.show,
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
    case formActions.CLEAR_FORM:
    case formActions.TOGGLE_SHOW_FORM:
      return {
        ...state,
        [action.formName]: form(state[action.formName], action),
      };
    default:
      return state;
  }
};

export const getForm = {
  getForm: (state, formName) => state.app.form[formName] || initialFormState,
  getFormShow: (state, formName) => getForm.getForm(state, formName).show,
  getFormField: (state, formName, valueName) => getForm.getForm(state, formName)[valueName] || initialFieldState,
  getFormFieldChipList: (state, formName, valueName) => getForm.getFormField(state, formName, valueName).chipList,
  getFormFieldText: (state, formName, valueName) => getForm.getFormField(state, formName, valueName).text,
};
