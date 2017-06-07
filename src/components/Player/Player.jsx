import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
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

class RequestLayer extends React.Component {
  componentDidMount() {
    const props = this.props;
    const playerId = props.match.params.playerId;
    props.getPlayer(playerId);
    props.getPlayerWinLoss(playerId, props.location.search);
  }

  componentWillUpdate(nextProps) {
    const props = nextProps;
    const playerId = props.match.params.playerId;
    if (this.props.match.params.playerId !== playerId) {
      props.getPlayer(playerId);
    }
    if (this.props.location.key !== props.location.key) {
      props.getPlayerWinLoss(playerId, props.location.search);
    }
  }

  render() {
    const { location, match } = this.props;
    const playerId = this.props.match.params.playerId;
    if (Long.fromString(playerId).greaterThan('76561197960265728')) {
      this.props.history.push(`/players/${Long.fromString(playerId).subtract('76561197960265728')}`);
    }
    const info = match.params.info || 'overview';
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
          {page ? page.content(playerId, match.params, location) : <Spinner />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playerName: (state.app.player.data.profile || {}).personaname,
  officialPlayerName: (state.app.player.data.profile || {}).name,
});

const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
  getPlayerWinLoss: (playerId, options) => dispatch(getPlayerWinLoss(playerId, options)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestLayer));
