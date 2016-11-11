import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  getPlayer,
  getPlayerWinLoss,
} from 'actions';
import TabBar from 'components/TabBar';
import Spinner from 'components/Spinner';
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
    const info = routeParams.info || 'overview';
    const page = playerPages(playerId).find(page => page.name.toLowerCase() === info);
    return (
      <div>
        <div>
          <PlayerHeader playerId={playerId} location={location} />
          <TabBar info={info} tabs={playerPages(playerId)} />
        </div>
        <div className={styles.page}>
          {page ? page.content(playerId, routeParams, location) : <Spinner />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // Passed from react-router
  playerId: ownProps.params.playerId,
});

const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
  getPlayerWinLoss: (playerId, options) => dispatch(getPlayerWinLoss(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
