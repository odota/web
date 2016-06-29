import { playerActions } from '../../actions';

const initialState = {
  loading: true,
  error: false,
  player: {
    profile: {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case playerActions.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case playerActions.OK:
      return {
        ...state,
        loading: false,
        player: action.payload,
      };
    case playerActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getPlayer = {
  getError: state => state.yaspReducer.gotPlayer.playerReducer.error,
  getLoading: state => state.yaspReducer.gotPlayer.playerReducer.loading,
  getPlayer: state => state.yaspReducer.gotPlayer.playerReducer.player,
  getProfile: state => getPlayer.getPlayer(state).profile,
  getPlayerName: state => getPlayer.getPlayer(state).profile.personaname,
  getLastLogin: state => getPlayer.getPlayer(state).profile.last_login,
  getMmrEstimate: state => getPlayer.getPlayer(state).mmr_estimate,
  getSoloMmrEstimate: state => getPlayer.getPlayer(state).solo_competitive_rank,
  getCompetitiveRank: state => getPlayer.getPlayer(state).competitive_rank,
  getPicture: state => getPlayer.getProfile(state).avatarmedium,
  getSteamLink: state => getPlayer.getProfile(state).profileurl,
  getCheese: state => getPlayer.getProfile(state).cheese,
};
