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

const initialPageState = {
  show: false,
};

const page = (state = initialPageState) => ({
  show: !state.show,
});

const initialFormState = {
  pages: {},
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
        pages: {
          ...state.pages,
          [action.page]: page(state.pages[action.page]),
        },
      };
    case formActions.CLEAR_FORM:
      return {
        pages: {
          ...state.pages,
        },
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
  getForm: (state, formName) => state.yaspReducer.form[formName] || initialFormState,
  getFormPages: (state, formName) => getForm.getForm(state, formName).pages,
  getFormPage: (state, formName, page) => getForm.getFormPages(state, formName)[page] || initialPageState,
  getFormPageShow: (state, formName, page) => getForm.getFormPage(state, formName, page).show,
  getFormValue: (state, formName, valueName) => getForm.getForm(state, formName)[valueName] || initialFieldState,
  getChipList: (state, formName, valueName) => getForm.getFormValue(state, formName, valueName).chipList,
  getFieldText: (state, formName, valueName) => getForm.getFormValue(state, formName, valueName).text,
};
