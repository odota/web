import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router';
import {
  getPlayer,
  getPlayerWinLoss,
} from 'actions';
import TabBar from 'components/TabBar';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import styles from './Player.css';
import playerPages from './playerPages';

const Player = ({
  params: {
    accountId,
    info = 'overview',
    subInfo,
  },
}) => {
  if (!accountId) {
    return <Error />;
  }
  // Need to pass in the action into filter form, need to put that filter form into each subroute as well
  const page = playerPages(accountId).find(page => page.name.toLowerCase() === info);
  return (
    <div>
      <div className={styles.header}>
        <PlayerHeader playerId={accountId} />
        <div style={{ marginTop: 25 }}>
          <TabBar
            info={info}
            subInfo={subInfo}
            tabs={playerPages(accountId)}
          />
        </div>
      </div>
      {page ? page.content(accountId, subInfo) : ''}
    </div>
  );
};
// need to fix this

const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
  getPlayerWinLoss: playerId => dispatch(getPlayerWinLoss(playerId)),
});

const getData = (props) => {
  props.getPlayer(props.params.accountId);
  props.getPlayerWinLoss(props.params.accountId);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.params.accountId !== nextProps.params.accountId) {
      getData(nextProps);
    }
  }

  render() {
    return <Player {...this.props} />;
  }
}

export default connect(null, mapDispatchToProps)(withRouter(RequestLayer));
