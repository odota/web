const navbarPages = [{
  name: 'Request',
  path: '/request',
}, {
  name: 'Distributions',
  path: '/distributions',
}, {
  name: 'Heroes',
  path: '/heroes',
}, {
  name: 'Ingame',
  sponsored: true,
  path: '/become-the-gamer',
}, {
  name: 'Blog',
  path: '//odota.github.io/blog',
  external: true,
}];

const playerPages = [{
  name: 'Overview',
}, {
  name: 'Matches',
}, {
  name: 'Heroes',
}, {
  name: 'Peers',
}, {
  name: 'Pros',
}, {
  name: 'Activity',
}, {
  name: 'Records',
}, {
  name: 'Counts',
}, {
  name: 'Histograms',
}, {
  name: 'Trends',
}, {
  name: 'Wardmap',
}, {
  name: 'Wordcloud',
}, {
  name: 'MMR',
}, {
  name: 'Rankings',
  'new-feature': true,
}];

const matchPages = [{
  name: 'Overview',
}, {
  name: 'Benchmarks',
}, {
  name: 'Performances',
  parsed: true,
}, {
  name: 'Damage',
  parsed: true,
}, {
  name: 'Purchases',
  parsed: true,
}, {
  name: 'Farm',
  parsed: true,
}, {
  name: 'Combat',
  parsed: true,
}, {
  name: 'Graphs',
  parsed: true,
}, {
  name: 'Vision',
  parsed: true,
}, {
  name: 'Objectives',
  parsed: true,
}, {
  name: 'Teamfights',
  parsed: true,
}, {
  name: 'Actions',
  parsed: true,
}, {
  name: 'Analysis',
  parsed: true,
}, {
  name: 'Chat',
  parsed: true,
}];

export {
  navbarPages,
  playerPages,
  matchPages,
};
