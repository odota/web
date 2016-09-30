import strings from 'lang/en';

const navbarPages = [{
  name: strings.request,
  path: '/request',
}, {
  name: strings.distributions,
  path: '/distributions',
}, {
  name: strings.heroes,
  path: '/heroes',
}, {
  name: strings.ingame,
  sponsored: true,
  path: '/become-the-gamer',
}, {
  name: strings.blog,
  path: '//odota.github.io/blog',
  external: true,
}];

const playerPages = [{
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

const matchPages = [{
  name: strings.tab_overview,
}, {
  name: strings.tab_benchmarks,
}, {
  name: strings.tab_performances,
  parsed: true,
}, {
  name: strings.tab_damage,
  parsed: true,
}, {
  name: strings.tab_purchases,
  parsed: true,
}, {
  name: strings.tab_farm,
  parsed: true,
}, {
  name: strings.tab_combat,
  parsed: true,
}, {
  name: strings.tab_graphs,
  parsed: true,
}, {
  name: strings.tab_vision,
  parsed: true,
}, {
  name: strings.tab_objectives,
  parsed: true,
}, {
  name: strings.tab_teamfights,
  parsed: true,
}, {
  name: strings.tab_actions,
  parsed: true,
}, {
  name: strings.tab_analysis,
  parsed: true,
}, {
  name: strings.tab_chat,
  parsed: true,
}];

export {
  navbarPages,
  playerPages,
  matchPages,
};
