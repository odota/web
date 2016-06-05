import React from 'react';
import { PlayerMatchesTable } from '../Table';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import { getPlayer } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styles from './PlayerHeader.css';

const Player = ({ params }) => {
  if (!params || !params.account_id) {
    return <Error />;
  }

  return (
    <div>
      <div className={styles.header}>
        <PlayerHeader />
      </div>
      <PlayerMatchesTable playerId={params.account_id} numMatches={20} />
    </div>
  );
};

const mapStateToProps = (state, { params }) => ({ playerId: params.account_id });

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (playerId) => dispatch(getPlayer(playerId)),
});

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getPlayer(this.props.playerId);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      this.props.getPlayer(nextProps.playerId);
    }
  }

  render() {
    return <Player {...this.props} />;
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestLayer));

// const mapStateToProps = (state) => ({
//   profile: player.getProfile(state),
//   win: player.getWin(state),
//   lose: player.getLose(state),
//   mmrEstimate: player.getMmrEstimate(state),
//   soloMmrEstimate: player.getSoloMmrEstimate(state),
//   competitiveRank: player.getCompetitiveRank(state),
//   loading: player.getLoading(state),
//   error: player.getError(state),
// });
