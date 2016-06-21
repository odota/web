import React from 'react';
import { PlayerMatchesTable, PlayerHeroesTable } from '../Table';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import { getPlayer, getPlayerMatches } from '../../actions';
import { connect } from 'react-redux';
import styles from './PlayerHeader.css';

const getPlayerSubroute = (info, playerId) => {
  switch (info) {
    case 'overview':
      return <PlayerMatchesTable playerId={playerId} />;
    case 'matches':
      return <PlayerMatchesTable playerId={playerId} />;
    case 'heroes':
      return <PlayerHeroesTable playerId={playerId} />;
    default:
      return <PlayerMatchesTable playerId={playerId} />;
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
      {getPlayerSubroute(info, playerId)}
    </div>
  );
};

const mapStateToProps = (state, { params }) => ({ playerId: params.account_id, info: params.info });

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (playerId) => dispatch(getPlayer(playerId)),
  getPlayerMatches: (playerId, numMatches) => dispatch(getPlayerMatches(playerId, numMatches)),
});

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getPlayer(this.props.playerId);
    if (this.props.info === 'matches') {
      this.props.getPlayerMatches(this.props.playerId);
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      this.props.getPlayer(nextProps.playerId);
    }
    if (nextProps.info === 'matches' && this.props.playerId !== nextProps.playerId) {
      this.props.getPlayerMatches(nextProps.playerId);
    }
  }

  render() {
    return <Player {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
