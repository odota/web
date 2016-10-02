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
import strings from 'lang';
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
  MMRPage,
} from './Pages';

const playerPages = [{
  name: strings.tab_overview,
  content: (playerId) => (<OverviewPage playerId={playerId} />),
}, {
  name: strings.tab_matches,
  content: (playerId) => (<MatchesPage playerId={playerId} />),
}, {
  name: strings.tab_heroes,
  content: (playerId) => (<HeroesPage playerId={playerId} />),
}, {
  name: strings.tab_peers,
  content: (playerId) => (<PeersPage playerId={playerId} />),
}, {
  name: strings.tab_pros,
  content: (playerId) => (<ProsPage playerId={playerId} />),
}, {
  name: strings.tab_activity,
  content: () => (<div />),
}, {
  name: strings.tab_records,
  content: (playerId) => (<RecordsPage playerId={playerId} />),
}, {
  name: strings.tab_counts,
  content: (playerId) => (<CountsPage playerId={playerId} />),
}, {
  name: strings.tab_histograms,
  content: (playerId, subInfo) => (<HistogramsPage playerId={playerId} histogramName={subInfo} />),
}, {
  name: strings.tab_trends,
  content: (playerId, subInfo) => (<TrendsPage playerId={playerId} trendName={subInfo} />),
}, {
  name: strings.tab_wardmap,
  content: () => (<div />),
}, {
  name: strings.tab_wordcloud,
  content: () => (<div />),
}, {
  name: strings.tab_mmr,
  content: (playerId) => (<MMRPage playerId={playerId} />),
}, {
  name: strings.tab_rankings,
  content: (playerId) => (<RankingsPage playerId={playerId} />),
}];

const playerPagesMapped = (playerId) => playerPages.map(page => ({
  ...page,
  route: `/players/${playerId}/${page.name.toLowerCase()}`,
}));

const Player = ({
  params: {
    accountId,
    info,
    subInfo,
  },
}) => {
  if (!accountId) {
    return <Error />;
  }
  const defInfo = info || 'overview';
  // Need to pass in the action into filter form, need to put that filter form into each subroute as well
  return (
    <div>
      <div className={styles.header}>
        <PlayerHeader playerId={accountId} />
        <div style={{ marginTop: 25 }}>
          <TabBar
            info={defInfo}
            subInfo={subInfo}
            tabs={playerPagesMapped(accountId)}
          />
        </div>
      </div>
      {playerPagesMapped(accountId).filter(page => page.name.toLowerCase() === defInfo).map(page => page.content(accountId, subInfo))}
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
