import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Long from 'long';
import {
  getPlayer,
  getPlayerWinLoss,
} from 'actions';
import strings from 'lang';
import TabBar from 'components/TabBar';
import Spinner from 'components/Spinner';
import TableFilterForm from './TableFilterForm';
import PlayerHeader from './Header/PlayerHeader';
// import Error from '../Error';
import styles from './Player.css';
import playerPages from './playerPages';

const getData = (props) => {
  props.getPlayer(props.playerId);
  props.getPlayerWinLoss(props.playerId, props.location.query);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    const { playerId, location, routeParams } = this.props;
    if (Long.fromString(playerId).greaterThan('76561197960265728')) {
      window.history.replaceState('', '', `/players/${Long.fromString(playerId).subtract('76561197960265728')}`);
    }
    const info = routeParams.info || 'overview';
    const page = playerPages(playerId).find(page => page.key === info);
    const playerName = this.props.officialPlayerName || this.props.playerName || strings.general_anonymous;
    const title = page ? `${playerName} - ${page.name}` : playerName;
    return (
      <div>
        <Helmet title={title} />
        <div>
          <PlayerHeader playerId={playerId} location={location} />
          <TabBar info={info} tabs={playerPages(playerId)} />
        </div>
        <div className={styles.page}>
          <TableFilterForm playerId={playerId} />
          {page ? page.content(playerId, routeParams, location) : <Spinner />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // Passed from react-router
  playerId: ownProps.params.playerId,
  playerName: (state.app.player.data.profile || {}).personaname,
  officialPlayerName: (state.app.player.data.profile || {}).name,
});

const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
  getPlayerWinLoss: (playerId, options) => dispatch(getPlayerWinLoss(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
