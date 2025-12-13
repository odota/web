import { formActions } from "../actions/formActions";

const initialFormState = {
  show: false,
};

export default (state = initialFormState, action: { type: string }) => {
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
