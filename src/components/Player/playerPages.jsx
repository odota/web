import React from 'react';
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
  // ItemsPage,
  WardmapPage,
  WordcloudPage,
  TotalsPage,
  ActivityPage,
} from './Pages';

const playerPages = strings => [{
  name: strings.tab_overview,
  key: 'overview',
  content: (playerId, routeParams, location) => (<OverviewPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_matches,
  key: 'matches',
  content: (playerId, routeParams, location) => (<MatchesPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_heroes,
  key: 'heroes',
  content: (playerId, routeParams, location) => (<HeroesPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_peers,
  key: 'peers',
  content: (playerId, routeParams, location) => (<PeersPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_pros,
  key: 'pros',
  content: (playerId, routeParams, location) => (<ProsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_records,
  key: 'records',
  content: (playerId, routeParams, location) => (<RecordsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_totals,
  key: 'totals',
  content: (playerId, routeParams, location) => (<TotalsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_counts,
  key: 'counts',
  content: (playerId, routeParams, location) => (<CountsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_histograms,
  key: 'histograms',
  content: (playerId, routeParams, location) => (<HistogramsPage
    playerId={playerId}
    routeParams={routeParams}
    location={location}
    histogramName={routeParams.subInfo}
  />),
}, {
  name: strings.tab_trends,
  key: 'trends',
  content: (playerId, routeParams, location) => (<TrendsPage
    playerId={playerId}
    routeParams={routeParams}
    location={location}
    trendName={routeParams.subInfo}
  />),
}, {
  name: strings.tab_wardmap,
  key: 'wardmap',
  content: (playerId, routeParams, location) => (<WardmapPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_wordcloud,
  key: 'wordcloud',
  content: (playerId, routeParams, location) => (<WordcloudPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_mmr,
  key: 'mmr',
  content: (playerId, routeParams, location) => (<MMRPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_rankings,
  key: 'rankings',
  content: (playerId, routeParams, location) => (<RankingsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_activity,
  key: 'activity',
  content: (playerId, routeParams, location) => (<ActivityPage playerId={playerId} routeParams={routeParams} location={location} />),
}];

export default (playerId, strings, isPlayerProfilePublic) => playerPages(strings).map(page => ({
  ...page,
  route: `/players/${playerId}/${page.key}`,
  disabled: !isPlayerProfilePublic,
}));
