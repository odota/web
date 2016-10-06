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
} from './Pages';

const playerPages = [{
  name: strings.tab_overview,
  content: playerId => (<OverviewPage playerId={playerId} />),
}, {
  name: strings.tab_matches,
  content: playerId => (<MatchesPage playerId={playerId} />),
}, {
  name: strings.tab_heroes,
  content: playerId => (<HeroesPage playerId={playerId} />),
}, {
  name: strings.tab_peers,
  content: playerId => (<PeersPage playerId={playerId} />),
}, {
  name: strings.tab_pros,
  content: playerId => (<ProsPage playerId={playerId} />),
}, {
  name: strings.tab_activity,
  content: () => (<div />),
}, {
  name: strings.tab_records,
  content: playerId => (<RecordsPage playerId={playerId} />),
}, {
  name: strings.tab_counts,
  content: playerId => (<CountsPage playerId={playerId} />),
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
  content: playerId => (<MMRPage playerId={playerId} />),
}, {
  name: strings.tab_rankings,
  content: playerId => (<RankingsPage playerId={playerId} />),
}];

export default playerId => playerPages.map(page => ({
  ...page,
  route: `/players/${playerId}/${page.name.toLowerCase()}`,
}));
