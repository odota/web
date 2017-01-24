import { pvgnaActions } from 'actions';

const initialState = {
  pvgnaGuides: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case pvgnaActions.REQUEST:
      return {
        ...state,
        pvgnaGuides: {},
      };
    case pvgnaActions.OK:
      return {
        ...state,
        pvgnaGuides: action.payload,
      };
    case pvgnaActions.ERROR:
      return {
        ...state,
        pvgnaGuides: {},
      };
    default:
      return state;
  }
};
export const getPvgnaGuides = state => state.app.pvgnaGuides.pvgnaGuides;
