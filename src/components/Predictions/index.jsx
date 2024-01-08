import React from 'react';
import Helmet from 'react-helmet';
import Table from '../Table';
import Heading from '../Heading';
import Warning from '../Alerts';
// import RaisedButton from 'material-ui/RaisedButton';

// 60 days before
const dateCutoff = '2022-08-11T07%3A00%3A00.000Z';
// # of group stage matches: (10 teams * 9 other teams) / 2 (reciprocal plays) * 2 (2 groups) * 2 games each = 180 Group Stage
// Tournament predictions use a cutoff where there are around 231 matches played by TI teams (Group Stage + 51 Main Event)
const tournamentCutoff = '2022-08-27T07%3A00%3A00.000Z';
// Date at the time the predictions were made
const dateMax = '2022-10-12T07%3A00%3A00.000Z';
/*
SELECT
count(1)
FROM matches
JOIN team_match using(match_id)
JOIN teams using(team_id)
WHERE TRUE
AND matches.start_time >= extract(epoch from timestamp '2022-08-27T07:00:00.000Z')
AND matches.start_time <= extract(epoch from timestamp '2022-10-12T07:00:00.000Z')
AND teams.team_id IN (7119388,2586976,6209166,8254400,7391077,7732977,8260983,8291895,8599101,350190,39,7390454,8131728,8605863,8721219,6209804,8597976,2163,1838315,15)
*/

const predictionArray = [
  {
    title: 'Hero most picked',
    link: `/explorer?group=hero&isTiTeam=true&minDate=${  dateCutoff  }&select=picks_bans`,
    notes: 'Sort by picks',
    prediction: 'Tiny',
  },
  {
    title: 'Hero most banned',
    link: `/explorer?group=hero&isTiTeam=true&minDate=${  dateCutoff  }&select=picks_bans`,
    notes: 'Sort by bans',
    prediction: 'Faceless Void',
  },
  {
    title: 'Hero with the highest winrate',
    link: `/explorer?order=&group=hero&isTiTeam=true&minDate=${  dateCutoff  }&select=kills&having=10`,
    notes: 'Sort by winrate',
    prediction: 'Sniper',
  },
  {
    title: 'Hero with the highest kill avg',
    link: `/explorer?order=&group=hero&isTiTeam=true&minDate=${  dateCutoff  }&select=kills&having=10`,
    prediction: 'Sniper',
  },
  {
    title: 'Hero with the highest assist avg',
    link: `/explorer?order=&group=hero&isTiTeam=true&minDate=${  dateCutoff  }&select=assists&having=10`,
    prediction: 'Venomancer',
  },
  {
    title: 'Hero with the lowest death avg',
    link: `/explorer?group=hero&isTiTeam=true&minDate=${  dateCutoff  }&select=deaths&having=10&order=asc`,
    prediction: 'Lycan',
  },
  {
    title: 'Hero with the highest last hits avg',
    link: `/explorer?order=&group=hero&isTiTeam=true&minDate=${  dateCutoff  }&select=last_hits&having=10`,
    prediction: 'Terrorblade',
  },
  {
    title: 'Hero with the highest XPM avg',
    link: `/explorer?order=&group=hero&isTiTeam=true&minDate=${  dateCutoff  }&select=xp_per_min&having=10`,
    prediction: 'Phantom Assassin',
  },
  {
    title: 'Hero with the most kills',
    link: `/explorer?isTiTeam=true&minDate=${  dateCutoff  }&select=kills`,
    prediction: 'Phantom Assassin',
  },
  {
    title: 'Hero with the most last hits',
    link: `/explorer?isTiTeam=true&minDate=${  dateCutoff  }&select=last_hits`,
    prediction: 'Naga Siren',
  },
  {
    title: 'Team that wins',
    link: '/teams',
    prediction: 'PSG.LGD',
    notes: 'Based on team Elo rankings',
  },
  {
    title: 'Team with the most kills in a game',
    link: `/explorer?group=team&isTiTeam=true&minDate=${  dateCutoff  }&select=kills`,
    prediction: 'Soniqs',
  },
  {
    title: 'Team with the highest kill avg',
    link: `/explorer?group=team&isTiTeam=true&minDate=${  dateCutoff  }&select=kills`,
    prediction: 'Soniqs',
  },
  {
    title: 'Team with the fewest deaths in a game',
    link: `/explorer?group=team&isTiTeam=true&minDate=${  dateCutoff  }&select=deaths&having=&order=asc`,
    prediction: 'Soniqs',
  },
  {
    title: 'Team with the most assists in a game',
    link: `/explorer?group=team&isTiTeam=true&minDate=${  dateCutoff  }&select=assists`,
    prediction: 'Royal Never Give Up',
  },
  {
    title: 'Team winning the longest game',
    link: `/explorer?group=team&isTiTeam=true&minDate=${  dateCutoff  }&select=duration`,
    prediction: 'Team Spirit',
  },
  {
    title: 'Team winning the shortest game',
    link: `/explorer?group=team&isTiTeam=true&minDate=${  dateCutoff  }&select=duration&order=asc`,
    prediction: 'Thunder Awaken',
  },
  {
    title: 'Team with highest game length avg',
    link: `/explorer?group=team&isTiTeam=true&minDate=${  dateCutoff  }&select=duration`,
    prediction: 'Team Spirit',
  },
  {
    title: 'Team with most distinct heroes',
    link: `/explorer?group=team&isTiTeam=true&minDate=${  dateCutoff  }&select=distinct_heroes`,
    notes: 'Sort by distinct heroes',
    prediction: 'Hokori',
  },
  {
    title: 'Team with fewest distinct heroes',
    link: `/explorer?group=team&isTiTeam=true&minDate=${  dateCutoff  }&select=distinct_heroes`,
    notes: 'Sort by distinct heroes',
    prediction: 'Soniqs',
  },
  {
    title: 'Player with the highest kill avg',
    link: `/explorer?group=player&isTiTeam=true&minDate=${  dateCutoff  }&select=kills&having=10`,
    prediction: 'Somnus',
  },
  {
    title: 'Player with the most kills in a game',
    link: `/explorer?group=&isTiTeam=true&minDate=${  dateCutoff  }&select=kills&having=&order=`,
    prediction: 'Pakazs',
  },
  {
    title: 'Player with the lowest death avg',
    link: `/explorer?group=player&isTiTeam=true&minDate=${  dateCutoff  }&select=deaths&having=10&order=asc`,
    prediction: 'Somnus',
  },
  {
    title: 'Player with the highest assist avg',
    link: `/explorer?group=player&isTiTeam=true&minDate=${  dateCutoff  }&select=assists&having=10`,
    prediction: 'skem',
  },
  {
    title: 'Player with the most assists in a game',
    link: `/explorer?group=&isTiTeam=true&minDate=${  dateCutoff  }&select=assists&having=&order=`,
    prediction: '皮球',
  },
  {
    title: 'Player with the highest last hits avg',
    link: `/explorer?group=player&isTiTeam=true&minDate=${  dateCutoff  }&select=last_hits&having=10`,
    prediction: 'YATOROGOD',
  },
  {
    title: 'Player with the most last hits in a game',
    link: `/explorer?group=&isTiTeam=true&minDate=${  dateCutoff  }&select=last_hits&having=&order=`,
    prediction: '萧瑟',
  },
  {
    title: 'Player with the most GPM in a game',
    link: `/explorer?group=&isTiTeam=true&minDate=${  dateCutoff  }&select=gold_per_min&having=&order=`,
    prediction: 'Raven',
  },
  {
    title: 'Player with the highest GPM avg',
    link: `/explorer?group=player&isTiTeam=true&minDate=${  dateCutoff  }&select=gold_per_min&having=10`,
    prediction: 'Raven',
  },
  {
    title: 'Player with the most distinct heroes',
    link: `/explorer?group=player&isTiTeam=true&minDate=${  dateCutoff  }&select=distinct_heroes`,
    prediction: 'Lumière',
    notes: 'Sort by distinct heroes',
  },
  {
    title: 'Tournament number of games in Main Event',
    prediction: '51',
    notes:
      '4 Bo1, 17 Bo3, 1 Bo5. (4) + (2.5 * 17) + (4) = 50.5 Main Event',
  },
  {
    title: 'Tournament heroes picked',
    prediction: '111',
    link: `/explorer?group=&isTiTeam=true&minDate=${  tournamentCutoff  }&select=picks_bans&having=&order=&maxDate=${  dateMax}`,
    notes: 'Number of heroes in the table with at least one pick',
  },
  {
    title: 'Tournament heroes banned',
    prediction: '106',
    link: `/explorer?group=&isTiTeam=true&minDate=${  tournamentCutoff  }&maxDate=${  dateMax  }&select=picks_bans&having=&order=`,
    notes: 'Number of heroes in the table with at least one ban',
  },
  {
    title: 'Tournament most kills in a game',
    prediction: '76',
    link: `/explorer?group=match&isTiTeam=true&minDate=${  tournamentCutoff  }&maxDate=${  dateMax  }&select=kills&having=&order=`,
    notes: 'Sort by SUM',
  },
  {
    title: 'Tournament longest game',
    prediction: '69:29',
    link: `/explorer?group=&isTiTeam=true&minDate=${  tournamentCutoff  }&maxDate=${  dateMax  }&select=duration`,
  },
  {
    title: 'Tournament shortest game',
    prediction: '18:17',
    link: `/explorer?group=&isTiTeam=true&minDate=${  tournamentCutoff  }&maxDate=${  dateMax  }&select=duration&having=&order=asc`,
  },
  {
    title: 'Tournament most kills by a hero in a game',
    prediction: '28',
    link: `/explorer?group=&isTiTeam=true&minDate=${  tournamentCutoff  }&maxDate=${  dateMax  }&select=kills`,
  },
  {
    title: 'Tournament most deaths by a hero in a game',
    prediction: '19',
    link: `/explorer?group=&isTiTeam=true&minDate=${  tournamentCutoff  }&maxDate=${  dateMax  }&select=deaths`,
  },
  {
    title: 'Tournament most assists by a hero in a game',
    prediction: '34',
    link: `/explorer?group=&isTiTeam=true&minDate=${  tournamentCutoff  }&maxDate=${  dateMax  }&select=assists`,
  },
  {
    title: 'Tournament highest GPM by a hero in a game',
    prediction: '1076',
    link: `/explorer?group=&isTiTeam=true&minDate=${  tournamentCutoff  }&maxDate=${  dateMax  }&select=gold_per_min`,
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
      subtitle="Based on the last 60 days of games of the participating teams"
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
