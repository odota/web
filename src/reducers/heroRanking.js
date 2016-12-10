import { rankingActions } from 'actions';

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

export const getHeroRanking = {
  getReducer: state => state.app.heroRanking,
  getHeroId: state => getHeroRanking.getReducer(state).hero_id,
  getRankings: state => getHeroRanking.getReducer(state).rankings,
  getError: state => getHeroRanking.getReducer(state).error,
  getLoading: state => getHeroRanking.getReducer(state).loading,
};
