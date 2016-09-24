import { REDUCER_KEY } from './../reducers';
import { rankingActions } from './../actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  hero_id: 0,
  rankings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case rankingActions.REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        rankings: null,
        hero_id: null,
      };
    case rankingActions.OK:
      return {
        ...state,
        error: false,
        loading: false,
        hero_id: action.payload.hero_id,
        rankings: action.payload.rankings,
      };
    case rankingActions.ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        rankings: null,
        hero_id: null,
      };
    default:
      return state;
  }
};

export const ranking = {
  getReducer: state => state[REDUCER_KEY].heroRanking,
  getHeroId: state => ranking.getReducer(state).hero_id,
  getRankings: state => ranking.getReducer(state).rankings,
  getError: state => ranking.getReducer(state).error,
  getLoading: state => ranking.getReducer(state).loading,
};
