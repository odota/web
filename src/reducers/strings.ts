const initialState = {} as Strings;

export default (state = initialState, action: { type: string, payload: Strings }) => {
  if (action?.type === 'strings') {
    return action.payload;
  } else {
    return state;
  }
};
