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

export const player = {
  getError: state => state.yaspReducer.gotPlayer.playerReducer.error,
  getLoading: state => state.yaspReducer.gotPlayer.playerReducer.loading,
  getPlayer: state => state.yaspReducer.gotPlayer.playerReducer.player,
  getProfile: state => player.getPlayer(state).profile,
  getPlayerName: state => player.getPlayer(state).profile.personaname,
  getLastLogin: state => player.getPlayer(state).profile.last_login,
  getWins: state => player.getPlayer(state).win,
  getLosses: state => player.getPlayer(state).lose,
  getMmrEstimate: state => player.getPlayer(state).mmr_estimate,
  getSoloMmrEstimate: state => player.getPlayer(state).solo_competitive_rank,
  getCompetitiveRank: state => player.getPlayer(state).competitive_rank,
  getPicture: state => player.getProfile(state).avatarmedium,
  getSteamLink: state => player.getProfile(state).profileurl,
  getCheese: state => player.getProfile(state).cheese,
};
