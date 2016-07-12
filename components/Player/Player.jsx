import React from 'react';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import {
  getPlayer,
  getPlayerWinLoss,
} from '../../actions';
import { connect } from 'react-redux';
import styles from './Player.css';
import { PeersPage, OverviewPage, MatchesPage, HeroesPage } from './Pages';
import { TableFilterForm } from '../Form';

const getPlayerSubroute = (info, playerId) => {
  switch (info) {
    case 'overview':
      return <OverviewPage playerId={playerId} />;
    case 'matches':
      return <MatchesPage playerId={playerId} />;
    case 'heroes':
      return <HeroesPage playerId={playerId} />;
    case 'peers':
      return <PeersPage playerId={playerId} />;
    default:
      return <OverviewPage playerId={playerId} />;
  }
};

const Player = ({ playerId, info }) => {
  if (!playerId) {
    return <Error />;
  }

  return (
    <div>
      <div className={styles.header}>
        <PlayerHeader playerId={playerId} />
      </div>
      <div>
        <TableFilterForm />
      </div>
    </div>
  );
};
// {getPlayerSubroute(info, playerId)}

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
