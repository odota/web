import React from 'react';
import { connect } from 'react-redux';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import {
  getPlayer,
  getPlayerWinLoss,
} from '../../actions';
import styles from './Player.css';
import {
  PeersPage,
  OverviewPage,
  MatchesPage,
  HeroesPage,
  RankingsPage,
  RecordsPage,
  CountsPage,
} from './Pages';

const getPlayerSubroute = (info, playerId) => {
  switch (info) {
    case 'overview':
      return <OverviewPage playerId={playerId} />;
    case 'matches':
      return <MatchesPage playerId={playerId} />;
    case 'heroes':
      return <HeroesPage playerId={playerId} />;
    case 'rankings':
      return <RankingsPage playerId={playerId} />;
    case 'peers':
      return <PeersPage playerId={playerId} />;
    case 'records':
      return <RecordsPage playerId={playerId} />;
    case 'counts':
      return <CountsPage playerId={playerId} />;
    default:
      return <OverviewPage playerId={playerId} />;
  }
};

const Player = ({ playerId, info }) => {
  if (!playerId) {
    return <Error />;
  }
// Need to pass in the action into filter form, need to put that filter form into each subroute as well
  return (
    <div>
      <div className={styles.header}>
        <PlayerHeader playerId={playerId} />
      </div>
      {getPlayerSubroute(info, playerId)}
    </div>
  );
};
// need to fix this

const mapStateToProps = (state, { params }) => ({ playerId: params.account_id, info: params.info });

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (playerId) => dispatch(getPlayer(playerId)),
  getPlayerWinLoss: (playerId) => dispatch(getPlayerWinLoss(playerId)),
});

const getData = props => {
  props.getPlayer(props.playerId);
  props.getPlayerWinLoss(props.playerId);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      getData(nextProps);
    }
  }

  render() {
    return <Player {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
