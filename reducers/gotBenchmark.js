import { benchmarkActions } from './../actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  hero_id: 0,
  result: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case benchmarkActions.START:
      return {
        ...state,
        done: false,
        error: false,
        loading: true,
        result: [],
        hero_id: [],
      };
    case benchmarkActions.DONE:
      return {
        ...state,
        done: true,
        error: false,
        loading: false,
        hero_id: action.payload.hero_id,
        result: action.payload.result,
      };
    case benchmarkActions.ERROR:
      return {
        ...state,
        done: false,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
