import React from 'react';
import Helmet from 'react-helmet';
import Table from 'components/Table';
import Heading from 'components/Heading';
import Warning from 'components/Alerts';
// import RaisedButton from 'material-ui/RaisedButton';

const predictionArray = [
  {
    title: 'Hero most picked',
    link: '/explorer?group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=picks_bans',
    prediction: 'Sand King',
  },
  {
    title: 'Hero most banned',
    link: '/explorer?group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=picks_bans',
    prediction: 'Night Stalker',
  },
  {
    title: 'Hero with the highest winrate',
    link: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=&having=10',
    prediction: 'Zeus',
  },
  {
    title: 'Hero with the highest kill avg',
    link: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'Ember Spirit',
  },
  {
    title: 'Hero with the highest assist avg',
    link: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=assists&having=10',
    prediction: 'Spirit Breaker',
  },
  {
    title: 'Hero with the lowest death avg',
    link: '/explorer?group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=deaths&having=10&order=asc',
    prediction: 'Templar Assassin',
  },
  {
    title: 'Hero with the highest last hits avg',
    link: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=last_hits&having=10',
    prediction: 'Templar Assassin',
  },
  {
    title: 'Hero with the highest XPM avg',
    link: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=xp_per_min&having=10',
    prediction: 'Templar Assassin',
  },
  {
    title: 'Hero with the most kills',
    link: '/explorer?isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills',
    prediction: 'Weaver',
  },
  {
    title: 'Hero with the most last hits',
    link: '/explorer?isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=last_hits',
    prediction: 'Nature\'s Prophet',
  },
  {
    title: 'Team that wins',
    link: '/teams',
    prediction: 'Team Liquid',
    notes: 'Based on team Elo rankings',
  },
  {
    title: 'Team with the most kills in a game',
    link: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills',
    prediction: 'Fnatic',
  },
  {
    title: 'Team with the highest kill avg',
    link: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills',
    prediction: 'Fnatic',
  },
  {
    title: 'Team with the fewest deaths in a game',
    link: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=deaths&having=&order=asc',
    prediction: 'Cloud9',
  },
  {
    title: 'Team with the most assists in a game',
    link: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=assists',
    prediction: 'Fnatic',
  },
  {
    title: 'Team winning the longest game',
    link: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=duration',
    prediction: 'Cloud9',
  },
  {
    title: 'Team winning the shortest game',
    link: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=duration&order=asc',
    prediction: 'Evil Geniuses',
  },
  {
    title: 'Team with highest game duration avg',
    link: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=duration',
    prediction: 'Cloud9',
  },
  {
    title: 'Team with most distinct heroes',
    link: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'Virtus.pro',
  },
  {
    title: 'Team with fewest distinct heroes',
    link: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'Execration',
  },
  {
    title: 'Player with the highest kill avg',
    link: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'QO',
  },
  {
    title: 'Player with the most kills in a game',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills&having=&order=',
    prediction: 'Moogy',
  },
  {
    title: 'Player with the lowest death avg',
    link: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=deaths&having=10&order=asc',
    prediction: 'EternaLEnVy',
  },
  {
    title: 'Player with the highest assist avg',
    link: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=assists&having=10',
    prediction: 'Febby',
  },
  {
    title: 'Player with the most assists in a game',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=assists&having=&order=',
    prediction: 'Gh',
  },
  {
    title: 'Player with the highest last hits avg',
    link: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=last_hits&having=10',
    prediction: 'Fata',
  },
  {
    title: 'Player with the most last hits in a game',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=last_hits&having=&order=',
    prediction: 'Ghostik',
  },
  {
    title: 'Player with the highest GPM in a game',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=gold_per_min&having=&order=',
    prediction: 'SumaiL',
  },
  {
    title: 'Player with the highest GPM avg',
    link: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=gold_per_min&having=10',
    prediction: 'Fata',
  },
  {
    title: 'Player with the most distinct heroes',
    link: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'fn',
  },
  {
    title: 'Tournament number of games in Main Event',
    prediction: '51',
    notes: '4 Bo1, 17 Bo3, 1 Bo5. (4) + (2.5 * 17) + (4) = 50.5',
  },
  {
    title: 'Tournament heroes picked',
    prediction: '104',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-26T07%3A00%3A00.000Z&select=picks_bans&having=&order=&maxDate=2017-07-18T07%3A00%3A00.000Z',
    notes: 'Group Stage: (18 * 8 * 2) / 2 = 144\nTournament predictions based on ~200 recent matches',
  },
  {
    title: 'Tournament heroes banned',
    prediction: '96',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-26T07%3A00%3A00.000Z&maxDate=2017-07-18T07%3A00%3A00.000Z&select=picks_bans&having=&order=',
  },
  {
    title: 'Tournament most kills in a game',
    prediction: '88',
    link: '/explorer?group=match&isTi7Team=true&minDate=2017-06-26T07%3A00%3A00.000Z&maxDate=2017-07-18T07%3A00%3A00.000Z&select=kills&having=&order=',
  },
  {
    title: 'Tournament longest game',
    prediction: '110:16',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-26T07%3A00%3A00.000Z&maxDate=2017-07-18T07%3A00%3A00.000Z&select=duration&having=&limit=',
  },
  {
    title: 'Tournament shortest game',
    prediction: '15:19',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-26T07%3A00%3A00.000Z&maxDate=2017-07-18T07%3A00%3A00.000Z&select=duration&having=&order=asc',
  },
  {
    title: 'Tournament most kills by a hero in a game',
    prediction: '27',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-26T07%3A00%3A00.000Z&maxDate=2017-07-18T07%3A00%3A00.000Z&select=kills&having=&limit=',
  },
  {
    title: 'Tournament most deaths by a hero in a game',
    prediction: '16',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-26T07%3A00%3A00.000Z&maxDate=2017-07-18T07%3A00%3A00.000Z&select=deaths&having=&limit=',
  },
  {
    title: 'Tournament most assists by a hero in a game',
    prediction: '32',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-26T07%3A00%3A00.000Z&maxDate=2017-07-18T07%3A00%3A00.000Z&select=assists&having=&limit=',
  },
  {
    title: 'Tournament highest GPM by a hero in a game',
    prediction: '1037',
    link: '/explorer?group=&isTi7Team=true&minDate=2017-06-26T07%3A00%3A00.000Z&maxDate=2017-07-18T07%3A00%3A00.000Z&select=gold_per_min&having=&limit=',
  },
];

const predColumns = [
  { displayName: 'Title', field: 'title' },
  { displayName: 'Prediction', field: 'prediction' },
  { displayName: 'Explore', field: 'link', displayFn: (row, col, field) => (field ? (<a href={field} target="_blank">View in Explorer</a>) : null) },
  { displayName: 'Notes', field: 'notes', displayFn: (row, col, field) => (<pre>{field}</pre>) },
];

const Predictions = () => (<div>
  <Helmet title="TI7 Predictions" />
  <Heading title="TI7 Predictions" subtitle="Based on the games of the 18 participating teams since June 18, 2017" />
  <Warning className="">
    {'These predictions assume future play will be similar to past play, which is not guaranteed! Use the Explorer link for each prediction if you want to examine the data in more detail.'}
  </Warning>
  <br />
  <Table data={predictionArray} columns={predColumns} />
</div>);

export default Predictions;
