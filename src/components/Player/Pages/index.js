import strings from 'lang';

export { default as PeersPage } from './Peers/Peers';
export { default as OverviewPage } from './Overview/Overview';
export { default as MatchesPage } from './Matches/Matches';
export { default as HeroesPage } from './Heroes/Heroes';
export { default as ProsPage } from './Pros/Pros';
export { default as RankingsPage } from './Rankings/Rankings';
export { default as HistogramsPage } from './Histograms/Histograms';
export { default as RecordsPage } from './Records/Records';
export { default as CountsPage } from './Counts/Counts';
export { default as TrendsPage } from './Trends/Trends';

export const playerPages = [{
  name: strings.tab_overview,
}, {
  name: strings.tab_matches,
}, {
  name: strings.tab_heroes,
}, {
  name: strings.tab_peers,
}, {
  name: strings.tab_pros,
}, {
  name: strings.tab_activity,
}, {
  name: strings.tab_records,
}, {
  name: strings.tab_counts,
}, {
  name: strings.tab_histograms,
}, {
  name: strings.tab_trends,
}, {
  name: strings.tab_wardmap,
}, {
  name: strings.tab_wordcloud,
}, {
  name: strings.tab_mmr,
}, {
  name: strings.tab_rankings,
  'new-feature': true,
}];
