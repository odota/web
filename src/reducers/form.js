import { formActions } from 'actions';

const initialFormState = {
  show: false,
};

export default (state = initialFormState, action) => {
  switch (action.type) {
    case formActions.TOGGLE_SHOW_FORM:
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state;
  }
};

export const getForm = {
  getForm: state => state.app.form || initialFormState,
  getFormShow: (state, formName) => getForm.getForm(state, formName).show,
};
