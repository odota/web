const initialState = {
  loading: true,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type.split(' ')[0]) {
    case 'REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'OK':
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};