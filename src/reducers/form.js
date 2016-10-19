import { formActions } from 'actions';

// TODO Hydrate initial form state from query string
// Need to translate value (saved in URL) back to text so we can display the chips properly
const initialFormState = {
  show: false,
};

export default (state = initialFormState, action) => {
  switch (action.type) {
    case formActions.ADD_CHIP:
      return { 
        ...state,
        [action.fieldName]: [action.value, ...state[action.fieldName] || []].slice(0, action.limit),
      };
    case formActions.DELETE_CHIP:
      return {
        ...state,
        [action.fieldName]: [
          ...state[action.fieldName].slice(0, action.index),
          ...state[action.fieldName].slice(action.index + 1),
        ],
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

export const getForm = {
  getForm: (state, formName) => state.app.form || initialFormState,
  getFormShow: (state, formName) => getForm.getForm(state, formName).show,
  getFormField: (state, formName, valueName) => getForm.getForm(state, formName)[valueName] || [],
};
