import React from 'react';
import strings from 'lang';
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
  ItemsPage,
  WardmapPage,
  WordcloudPage,
} from './Pages';

const playerPages = [{
  name: strings.tab_overview,
  content: (playerId, routeParams, location) => (<OverviewPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_matches,
  content: (playerId, routeParams, location) => (<MatchesPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_heroes,
  content: (playerId, routeParams, location) => (<HeroesPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_peers,
  content: (playerId, routeParams, location) => (<PeersPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_pros,
  content: (playerId, routeParams, location) => (<ProsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_records,
  content: (playerId, routeParams, location) => (<RecordsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_counts,
  content: (playerId, routeParams, location) => (<CountsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_histograms,
  content: (playerId, routeParams, location) => (<HistogramsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_trends,
  content: (playerId, routeParams, location) => (<TrendsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_items,
  content: (playerId, routeParams, location) => (<ItemsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_wardmap,
  content: (playerId, routeParams, location) => (<WardmapPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_wordcloud,
  content: (playerId, routeParams, location) => (<WordcloudPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_mmr,
  content: (playerId, routeParams, location) => (<MMRPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_rankings,
  content: (playerId, routeParams, location) => (<RankingsPage playerId={playerId} routeParams={routeParams} location={location} />),
}];

export default playerId => playerPages.map(page => ({
  ...page,
  route: `/players/${playerId}/${page.name.toLowerCase()}`,
}));
