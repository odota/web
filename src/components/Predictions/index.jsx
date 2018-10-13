import React from 'react';
import Helmet from 'react-helmet';
import Table from '../Table';
import Heading from '../Heading';
import Warning from '../Alerts';
// import RaisedButton from 'material-ui/RaisedButton';

const predictionArray = [
  {
    title: 'Hero most picked',
    link: '/explorer?group=hero&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=picks_bans',
    prediction: 'Beastmaster',
  },
  {
    title: 'Hero most banned',
    link: '/explorer?group=hero&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=picks_bans',
    prediction: 'Io',
  },
  {
    title: 'Hero with the highest winrate',
    link: '/explorer?order=&group=hero&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'Chen',
  },
  {
    title: 'Hero with the highest kill avg',
    link: '/explorer?order=&group=hero&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'Storm Spirit',
  },
  {
    title: 'Hero with the highest assist avg',
    link: '/explorer?order=&group=hero&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=assists&having=10',
    prediction: 'Zeus',
  },
  {
    title: 'Hero with the lowest death avg',
    link: '/explorer?group=hero&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=deaths&having=10&order=asc',
    prediction: 'Drow Ranger',
  },
  {
    title: 'Hero with the highest last hits avg',
    link: '/explorer?order=&group=hero&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=last_hits&having=10',
    prediction: 'Phantom Lancer',
  },
  {
    title: 'Hero with the highest XPM avg',
    link: '/explorer?order=&group=hero&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=xp_per_min&having=10',
    prediction: 'Storm Spirit',
  },
  {
    title: 'Hero with the most kills',
    link: '/explorer?isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=kills',
    prediction: 'Storm Spirit',
  },
  {
    title: 'Hero with the most last hits',
    link: '/explorer?isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=last_hits',
    prediction: 'Phantom Lancer',
  },
  {
    title: 'Team that wins',
    link: '/teams',
    prediction: 'PSG.LGD',
    notes: 'Based on team Elo rankings',
  },
  {
    title: 'Team with the most kills in a game',
    link: '/explorer?group=team&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=kills',
    prediction: 'paiN Gaming',
  },
  {
    title: 'Team with the highest kill avg',
    link: '/explorer?group=team&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=kills',
    prediction: 'paiN Gaming',
  },
  {
    title: 'Team with the fewest deaths in a game',
    link: '/explorer?group=team&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=deaths&having=&order=asc',
    prediction: 'Fnatic',
  },
  {
    title: 'Team with the most assists in a game',
    link: '/explorer?group=team&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=assists',
    prediction: 'Winstrike',
  },
  {
    title: 'Team winning the longest game',
    link: '/explorer?group=team&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=duration',
    prediction: 'Vici Gaming',
  },
  {
    title: 'Team winning the shortest game',
    link: '/explorer?group=team&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=duration&order=asc',
    prediction: 'Team Liquid',
  },
  {
    title: 'Team with highest game length avg',
    link: '/explorer?group=team&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=duration',
    prediction: 'Vici Gaming',
  },
  {
    title: 'Team with most distinct heroes',
    link: '/explorer?group=team&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'OpTic Gaming',
  },
  {
    title: 'Team with fewest distinct heroes',
    link: '/explorer?group=team&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'Team Serenity',
  },
  {
    title: 'Player with the highest kill avg',
    link: '/explorer?group=player&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'Moon',
  },
  {
    title: 'Player with the most kills in a game',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=kills&having=&order=',
    prediction: 'Moon',
  },
  {
    title: 'Player with the lowest death avg',
    link: '/explorer?group=player&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=deaths&having=10&order=asc',
    prediction: 'Raven',
  },
  {
    title: 'Player with the highest assist avg',
    link: '/explorer?group=player&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=assists&having=10',
    prediction: 'LaNm',
  },
  {
    title: 'Player with the most assists in a game',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=assists&having=&order=',
    prediction: 'YapzOr',
  },
  {
    title: 'Player with the highest last hits avg',
    link: '/explorer?group=player&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=last_hits&having=10',
    prediction: 'Fata',
  },
  {
    title: 'Player with the most last hits in a game',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=last_hits&having=&order=',
    prediction: 'Paparazi',
  },
  {
    title: 'Player with the most GPM in a game',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=gold_per_min&having=&order=',
    prediction: 'SumaiL',
  },
  {
    title: 'Player with the highest GPM avg',
    link: '/explorer?group=player&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=gold_per_min&having=10',
    prediction: 'hFn',
  },
  {
    title: 'Player with the most distinct heroes',
    link: '/explorer?group=player&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'Pajkatt',
  },
  {
    title: 'Tournament number of games in Main Event',
    prediction: '51',
    notes: '4 Bo1, 17 Bo3, 1 Bo5. (4) + (2.5 * 17) + (4) = 50.5 Main Event\n(18 * 8 * 2) / 2 = 144 Group Stage\nFollowing are based on ~191 recent matches',
  },
  {
    title: 'Tournament heroes picked',
    prediction: '103',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&select=picks_bans&having=&order=&maxDate=2018-08-03T07%3A00%3A00.000Z',
    notes: '',
  },
  {
    title: 'Tournament heroes banned',
    prediction: '91',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&maxDate=2018-08-03T07%3A00%3A00.000Z&select=picks_bans&having=&order=',
  },
  {
    title: 'Tournament most kills in a game',
    prediction: '104',
    link: '/explorer?group=match&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&maxDate=2018-08-03T07%3A00%3A00.000Z&select=kills&having=&order=',
  },
  {
    title: 'Tournament longest game',
    prediction: '88:01',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&maxDate=2018-08-03T07%3A00%3A00.000Z&select=duration',
  },
  {
    title: 'Tournament shortest game',
    prediction: '14:33',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&maxDate=2018-08-03T07%3A00%3A00.000Z&select=duration&having=&order=asc',
  },
  {
    title: 'Tournament most kills by a hero in a game',
    prediction: '30',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&maxDate=2018-08-03T07%3A00%3A00.000Z&select=kills',
  },
  {
    title: 'Tournament most deaths by a hero in a game',
    prediction: '18',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&maxDate=2018-08-03T07%3A00%3A00.000Z&select=deaths',
  },
  {
    title: 'Tournament most assists by a hero in a game',
    prediction: '45',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&maxDate=2018-08-03T07%3A00%3A00.000Z&select=assists',
  },
  {
    title: 'Tournament highest GPM by a hero in a game',
    prediction: '1061',
    link: '/explorer?group=&isTi8Team=true&minDate=2018-06-03T07%3A00%3A00.000Z&maxDate=2018-08-03T07%3A00%3A00.000Z&select=gold_per_min',
  },
];

const predColumns = [
  { displayName: 'Title', field: 'title' },
  { displayName: 'Prediction', field: 'prediction' },
  { displayName: 'Explore', field: 'link', displayFn: (row, col, field) => (field ? (<a href={field} target="_blank" rel="noopener noreferrer">View in Explorer</a>) : null) },
  { displayName: 'Notes', field: 'notes', displayFn: (row, col, field) => (<pre>{field}</pre>) },
];

const Predictions = () => (
  <div>
    <Helmet title="TI Predictions" />
    <Heading title="TI8 Predictions" subtitle="Based on the recent games of the 18 participating teams" />
    <Warning className="">
      {'These predictions assume future play will be similar to past play, which is not guaranteed! Use the Explorer link for each prediction if you want to examine the data in more detail.'}
    </Warning>
    <br />
    <Table data={predictionArray} columns={predColumns} />
  </div>);

export default Predictions;
