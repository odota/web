import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getPlayer,
  getPlayerWinLoss,
} from 'actions';
import TabBar from 'components/TabBar';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import styles from './Player.css';
import {
  PeersPage,
  OverviewPage,
  MatchesPage,
  HeroesPage,
  ProsPage,
  RankingsPage,
  HistogramsPage,
  RecordsPage,
  CountsPage,
  TrendsPage,
  playerPages,
} from './Pages';

const playerPagesMapped = (accountId) => playerPages.map(({ name, ...rest }) => ({
  ...rest,
  route: `/players/${accountId}/${name.toLowerCase()}`,
  label: name,
}));

const getPlayerSubroute = (info, playerId, subInfo) => {
  switch (info) {
    case 'overview':
      return <OverviewPage playerId={playerId} />;
    case 'matches':
      return <MatchesPage playerId={playerId} />;
    case 'heroes':
      return <HeroesPage playerId={playerId} />;
    case 'pros':
      return <ProsPage playerId={playerId} />;
    case 'rankings':
      return <RankingsPage playerId={playerId} />;
    case 'histograms':
      return <HistogramsPage playerId={playerId} histogramName={subInfo} />;
    case 'peers':
      return <PeersPage playerId={playerId} />;
    case 'records':
      return <RecordsPage playerId={playerId} />;
    case 'counts':
      return <CountsPage playerId={playerId} />;
    case 'trends':
      return <TrendsPage playerId={playerId} trendName={subInfo} />;
    default:
      return <OverviewPage playerId={playerId} />;
  }
};

const Player = ({ params: { accountId, info, subInfo } }) => {
  if (!accountId) {
    return <Error />;
  }
// Need to pass in the action into filter form, need to put that filter form into each subroute as well
  return (
    <div>
      <div className={styles.header}>
        <PlayerHeader playerId={accountId} />
        <div style={{ marginTop: 25 }}>
          <TabBar
            playerId={accountId}
            activeTab={info}
            subInfo={subInfo}
            tabs={playerPagesMapped(accountId)}
          />
        </div>
      </div>
      {getPlayerSubroute(info, accountId, subInfo)}
    </div>
  );
};
// need to fix this

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (playerId) => dispatch(getPlayer(playerId)),
  getPlayerWinLoss: (playerId) => dispatch(getPlayerWinLoss(playerId)),
});

const getData = props => {
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
