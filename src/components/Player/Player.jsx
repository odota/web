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

const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
  getPlayerWinLoss: (playerId, options) => dispatch(getPlayerWinLoss(playerId, options)),
});

const getData = (props) => {
  props.getPlayer(props.params.accountId);
  props.getPlayerWinLoss(props.params.accountId, props.location.query);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.params.accountId !== nextProps.params.accountId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    const accountId = this.props.params.accountId;
    const loading = this.props.loading;
    const location = this.props.location;
    const routeParams = this.props.routeParams;
    const info = this.props.routeParams.info || 'overview';
    const page = playerPages(accountId).find(page => page.name.toLowerCase() === info);
    return (
      <div>
        <div className={styles.header}>
          <PlayerHeader playerId={accountId} location={location} />
          <TabBar info={info} tabs={playerPages(accountId)} />
        </div>
        {!loading && page ? page.content(accountId, routeParams, location) : <Spinner />}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(RequestLayer);
