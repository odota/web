import React from 'react';
import Helmet from 'react-helmet';
import Table from '../Table';
import Heading from '../Heading';
import Warning from '../Alerts';
// import RaisedButton from 'material-ui/RaisedButton';

const predictionArray = [
  {
    title: 'Hero most picked',
    link: '/explorer?group=hero&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=picks_bans',
    prediction: 'Grimstroke',
  },
  {
    title: 'Hero most banned',
    link: '/explorer?group=hero&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=picks_bans',
    prediction: 'Sven',
  },
  {
    title: 'Hero with the highest winrate',
    link: '/explorer?order=&group=hero&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'Beastmaster',
  },
  {
    title: 'Hero with the highest kill avg',
    link: '/explorer?order=&group=hero&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'Anti-Mage',
  },
  {
    title: 'Hero with the highest assist avg',
    link: '/explorer?order=&group=hero&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=assists&having=10',
    prediction: 'Tusk',
  },
  {
    title: 'Hero with the lowest death avg',
    link: '/explorer?group=hero&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=deaths&having=10&order=asc',
    prediction: 'Slark',
  },
  {
    title: 'Hero with the highest last hits avg',
    link: '/explorer?order=&group=hero&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=last_hits&having=10',
    prediction: 'Anti-Mage',
  },
  {
    title: 'Hero with the highest XPM avg',
    link: '/explorer?order=&group=hero&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=xp_per_min&having=10',
    prediction: 'Anti-Mage',
  },
  {
    title: 'Hero with the most kills',
    link: '/explorer?isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=kills',
    prediction: 'Ursa',
  },
  {
    title: 'Hero with the most last hits',
    link: '/explorer?isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=last_hits',
    prediction: 'Leshrac',
  },
  {
    title: 'Team that wins',
    link: '/teams',
    prediction: 'Team Secret',
    notes: 'Based on team Elo rankings',
  },
  {
    title: 'Team with the most kills in a game',
    link: '/explorer?group=team&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=kills',
    prediction: 'Alliance',
  },
  {
    title: 'Team with the highest kill avg',
    link: '/explorer?group=team&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=kills',
    prediction: 'Alliance',
  },
  {
    title: 'Team with the fewest deaths in a game',
    link: '/explorer?group=team&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=deaths&having=&order=asc',
    prediction: 'Newbee',
  },
  {
    title: 'Team with the most assists in a game',
    link: '/explorer?group=team&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=assists',
    prediction: 'TNC Predator',
  },
  {
    title: 'Team winning the longest game',
    link: '/explorer?group=team&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=duration',
    prediction: 'TNC Predator',
  },
  {
    title: 'Team winning the shortest game',
    link: '/explorer?group=team&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=duration&order=asc',
    prediction: 'Newbee',
  },
  {
    title: 'Team with highest game length avg',
    link: '/explorer?group=team&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=duration',
    prediction: 'TNC Predator',
  },
  {
    title: 'Team with most distinct heroes',
    link: '/explorer?group=team&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'Ninjas in Pyjamas',
  },
  {
    title: 'Team with fewest distinct heroes',
    link: '/explorer?group=team&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'OG',
  },
  {
    title: 'Player with the highest kill avg',
    link: '/explorer?group=player&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'ana',
  },
  {
    title: 'Player with the most kills in a game',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=kills&having=&order=',
    prediction: 'ana',
  },
  {
    title: 'Player with the lowest death avg',
    link: '/explorer?group=player&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=deaths&having=10&order=asc',
    prediction: 'Nikobaby竜の道',
  },
  {
    title: 'Player with the highest assist avg',
    link: '/explorer?group=player&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=assists&having=10',
    prediction: 'Tims',
  },
  {
    title: 'Player with the most assists in a game',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=assists&having=&order=',
    prediction: 'Puppey',
  },
  {
    title: 'Player with the highest last hits avg',
    link: '/explorer?group=player&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=last_hits&having=10',
    prediction: 'miCKe',
  },
  {
    title: 'Player with the most last hits in a game',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=last_hits&having=&order=',
    prediction: 'Monet',
  },
  {
    title: 'Player with the most GPM in a game',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=gold_per_min&having=&order=',
    prediction: '小可',
  },
  {
    title: 'Player with the highest GPM avg',
    link: '/explorer?group=player&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=gold_per_min&having=10',
    prediction: 'K1 Hector',
  },
  {
    title: 'Player with the most distinct heroes',
    link: '/explorer?group=player&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'stinger',
  },
  {
    title: 'Tournament number of games in Main Event',
    prediction: '51',
    notes:
      '4 Bo1, 17 Bo3, 1 Bo5. (4) + (2.5 * 17) + (4) = 50.5 Main Event\n(18 * 8 * 2) / 2 = 144 Group Stage\nFollowing are based on ~191 recent matches',
  },
  {
    title: 'Tournament heroes picked',
    prediction: '112',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&select=picks_bans&having=&order=&maxDate=2019-07-11T07%3A00%3A00.000Z',
    notes: 'Number of heroes in the table with at least one pick',
  },
  {
    title: 'Tournament heroes banned',
    prediction: '97',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&maxDate=2019-07-11T07%3A00%3A00.000Z&select=picks_bans&having=&order=',
    notes: 'Number of heroes in the table with at least one ban',
  },
  {
    title: 'Tournament most kills in a game',
    prediction: '101',
    link: '/explorer?group=match&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&maxDate=2019-07-11T07%3A00%3A00.000Z&select=kills&having=&order=',
    notes: 'See the SUM column',
  },
  {
    title: 'Tournament longest game',
    prediction: '76:08',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&maxDate=2019-07-11T07%3A00%3A00.000Z&select=duration',
  },
  {
    title: 'Tournament shortest game',
    prediction: '15:35',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&maxDate=2019-07-11T07%3A00%3A00.000Z&select=duration&having=&order=asc',
  },
  {
    title: 'Tournament most kills by a hero in a game',
    prediction: '22',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&maxDate=2019-07-11T07%3A00%3A00.000Z&select=kills',
  },
  {
    title: 'Tournament most deaths by a hero in a game',
    prediction: '21',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&maxDate=2019-07-11T07%3A00%3A00.000Z&select=deaths',
  },
  {
    title: 'Tournament most assists by a hero in a game',
    prediction: '39',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&maxDate=2019-07-11T07%3A00%3A00.000Z&select=assists',
  },
  {
    title: 'Tournament highest GPM by a hero in a game',
    prediction: '1104',
    link: '/explorer?group=&isTi9Team=true&minDate=2019-06-03T07%3A00%3A00.000Z&maxDate=2019-07-11T07%3A00%3A00.000Z&select=gold_per_min',
  },
];

const predColumns = [
  { displayName: 'Title', field: 'title' },
  { displayName: 'Prediction', field: 'prediction' },
  {
    displayName: 'Explore',
    field: 'link',
    displayFn: (row, col, field) =>
      field ? (
        <a href={field} target="_blank" rel="noopener noreferrer">
          View in Explorer
        </a>
      ) : null,
  },
  {
    displayName: 'Notes',
    field: 'notes',
    displayFn: (row, col, field) => <pre>{field}</pre>,
  },
];

const Predictions = () => (
  <div>
    <Helmet title="TI Predictions" />
    <Heading
      title="TI Predictions"
      subtitle="Based on the last 60 days of games of the 18 participating teams"
    />
    <Warning className="">
      These predictions assume future play will be similar to past play, which
      is not guaranteed! Use the Explorer link for each prediction if you want
      to examine the data in more detail.
    </Warning>
    <br />
    <Table data={predictionArray} columns={predColumns} />
  </div>
);

export default Predictions;
