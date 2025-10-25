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
  // MMRPage,
  // ItemsPage,
  WardmapPage,
  WordcloudPage,
  TotalsPage,
  ActivityPage,
} from './Pages';

const playerPages = (strings: Strings) => [
  {
    name: strings.tab_overview,
    key: 'overview',
    content: (playerId: string, routeParams: any, location: any) => (
      <OverviewPage playerId={playerId} location={location} />
    ),
  },
  {
    name: strings.tab_matches,
    key: 'matches',
    content: (playerId: string, routeParams: any, location: any) => (
      <MatchesPage playerId={playerId} location={location} />
    ),
  },
  {
    name: strings.tab_heroes,
    key: 'heroes',
    content: (playerId: string, routeParams: any, location: any) => (
      <HeroesPage playerId={playerId} location={location} />
    ),
  },
  {
    name: strings.tab_peers,
    key: 'peers',
    content: (playerId: string, routeParams: any, location: any) => (
      <PeersPage playerId={playerId} location={location} />
    ),
  },
  {
    name: strings.tab_pros,
    key: 'pros',
    content: (playerId: string, routeParams: any, location: any) => (
      <ProsPage playerId={playerId} location={location} />
    ),
  },
  {
    name: strings.tab_records,
    key: 'records',
    content: (playerId: string, routeParams: any, location: any) => (
      <RecordsPage playerId={playerId} routeParams={routeParams} />
    ),
  },
  {
    name: strings.tab_totals,
    key: 'totals',
    content: (playerId: string, routeParams: any, location: any) => (
      <TotalsPage playerId={playerId} location={location} />
    ),
  },
  {
    name: strings.tab_counts,
    key: 'counts',
    content: (playerId: string, routeParams: any, location: any) => (
      <CountsPage playerId={playerId} location={location} />
    ),
  },
  {
    name: strings.tab_histograms,
    key: 'histograms',
    content: (playerId: string, routeParams: any, location: any) => (
      <HistogramsPage
        playerId={playerId}
        routeParams={routeParams}
        histogramName={routeParams.subInfo}
      />
    ),
  },
  {
    name: strings.tab_trends,
    key: 'trends',
    content: (playerId: string, routeParams: any, location: any) => (
      <TrendsPage
        playerId={playerId}
        routeParams={routeParams}
        trendName={routeParams.subInfo}
      />
    ),
  },
  {
    name: strings.tab_wardmap,
    key: 'wardmap',
    content: (playerId: string, routeParams: any, location: any) => (
      <WardmapPage playerId={playerId} location={location} />
    ),
  },
  {
    name: strings.tab_wordcloud,
    key: 'wordcloud',
    content: (playerId: string, routeParams: any, location: any) => (
      <WordcloudPage playerId={playerId} location={location} />
    ),
  },
  // {
  //   name: strings.tab_mmr,
  //   key: 'mmr',
  //   content: (playerId: string, routeParams: any, location: any) => (
  //     <MMRPage
  //       playerId={playerId}
  //       location={location}
  //     />
  //   ),
  // },
  {
    name: strings.tab_rankings,
    key: 'rankings',
    content: (playerId: string, routeParams: any, location: any) => (
      <RankingsPage playerId={playerId} location={location} />
    ),
  },
  {
    name: strings.tab_activity,
    key: 'activity',
    content: (playerId: string, routeParams: any, location: any) => (
      <ActivityPage playerId={playerId} location={location} />
    ),
  },
];

export default (
  playerId: string | undefined,
  strings: Strings,
  isPlayerProfilePublic?: boolean,
) =>
  playerPages(strings).map((page) => ({
    ...page,
    route: `/players/${playerId}/${page.key}`,
    disabled: !isPlayerProfilePublic,
  }));
