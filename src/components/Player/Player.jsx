import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getPlayer,
  getPlayerWinLoss,
} from 'actions';
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
} from './Pages';
import TabBar from '../TabBar';
import { playerPages } from '../Header/Pages';

const playerPagesMapped = (accountId) => playerPages.map(({ name, extra = '', ...rest }) => ({
  ...rest,
  route: `/players/${accountId}/${name.toLowerCase()}${extra ? `/${extra}` : ''}`,
  label: name,
  extra,
}));

const getPlayerSubroute = (info, playerId, histogramName) => {
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
      return <HistogramsPage playerId={playerId} histogramName={histogramName} />;
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

const Player = ({ playerId, info, histogramName }) => {
  if (!playerId) {
    return <Error />;
  }
// Need to pass in the action into filter form, need to put that filter form into each subroute as well
  return (
    <div>
      <div className={styles.header}>
        <PlayerHeader playerId={playerId} />
        <div style={{ marginTop: 25 }}>
          <TabBar tabs={playerPagesMapped(playerId)} />
        </div>
      </div>
      {getPlayerSubroute(info, playerId, histogramName)}
    </div>
  );
};
// need to fix this

const mapStateToProps = (state, { params }) => ({
  playerId: params.account_id,
  info: params.info,
  histogramName: params.histogramName,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RequestLayer));
