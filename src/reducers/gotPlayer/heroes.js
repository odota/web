import { playerHeroesActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
};

export default createReducer(initialState, playerHeroesActions);

export const getPlayerHeroes = {
  getPlayerHeroesById: (state, id) => {
    if (!state.app.gotPlayer.heroes.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.app.gotPlayer.heroes.byId[id];
  },
  getError: (state, id) => getPlayerHeroes.getPlayerHeroesById(state, id).error,
  getLoading: (state, id) => getPlayerHeroes.getPlayerHeroesById(state, id).loading,
  isLoaded: (state, id) => getPlayerHeroes.getPlayerHeroesById(state, id).loaded,
  getHeroList: (state, id) => getPlayerHeroes.getPlayerHeroesById(state, id).list,
};
