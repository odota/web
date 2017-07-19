import React from 'react';
import Helmet from 'react-helmet';
import Table from 'components/Table';
import Heading from 'components/Heading';
import Warning from 'components/Alerts';
import RaisedButton from 'material-ui/RaisedButton';

const predictionArray = [
  {
    title: 'Hero most picked',
    explorerLink: '/explorer?group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=picks_bans',
    prediction: 'Sand King',
  },
  {
    title: 'Hero most banned',
    explorerLink: '/explorer?group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=picks_bans',
    prediction: 'Nyx Assassin',
  },
  {
    title: 'Hero with the highest winrate',
    explorerLink: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=&having=10',
    prediction: 'Templar Assassin',
  },
  {
    title: 'Hero with the highest kill avg',
    explorerLink: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'Ember Spirit',
  },
  {
    title: 'Hero with the highest assist avg',
    explorerLink: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=assists&having=10',
    prediction: 'Spirit Breaker',
  },
  {
    title: 'Hero with the lowest death avg',
    explorerLink: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=deaths&having=10&order=asc',
    prediction: 'Templar Assassin',
  },
  {
    title: 'Hero with the highest last hits avg',
    explorerLink: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=last_hits&having=10',
    prediction: 'Templar Assassin',
  },
  {
    title: 'Hero with the highest XPM avg',
    explorerLink: '/explorer?order=&group=hero&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=xp_per_min&having=10',
    prediction: 'Templar Assassin',
  },
  {
    title: 'Hero with the most kills',
    explorerLink: '/explorer?isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills',
    prediction: 'Weaver',
  },
  {
    title: 'Hero with the most last hits',
    explorerLink: '/explorer?isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=last_hits',
    prediction: 'Nature\'s Prophet',
  },
  {
    title: 'Team that wins',
    explorerLink: '/teams',
    prediction: 'Team Liquid',
    notes: 'Based on team Elo rankings',
  },
  {
    title: 'Team with the most kills in a game',
    explorerLink: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills',
    prediction: 'Fnatic',
  },
  {
    title: 'Team with the highest kill avg',
    explorerLink: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills',
    prediction: 'Fnatic',
  },
  {
    title: 'Team with the fewest deaths in a game',
    explorerLink: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=deaths&having=&order=asc',
    prediction: 'Team NP',
  },
  {
    title: 'Team with the most assists in a game',
    explorerLink: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=assists',
    prediction: 'Fnatic',
  },
  {
    title: 'Team winning the longest game',
    explorerLink: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=duration',
    prediction: 'Team NP',
  },
  {
    title: 'Team winning the shortest game',
    explorerLink: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=duration&order=asc',
    prediction: 'Evil Geniuses',
  },
  {
    title: 'Team with highest game duration avg',
    explorerLink: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=duration',
    prediction: 'Team NP',
  },
  {
    title: 'Team with most distinct heroes',
    explorerLink: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'Virtus.pro',
  },
  {
    title: 'Team with fewest distinct heroes',
    explorerLink: '/explorer?group=team&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'Execration',
  },
  {
    title: 'Player with the highest kill avg',
    explorerLink: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills&having=10',
    prediction: 'QO',
  },
  {
    title: 'Player with the most kills in a game',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=kills&having=&order=',
    prediction: 'Moogy',
  },
  {
    title: 'Player with the lowest death avg',
    explorerLink: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=deaths&having=10&order=asc',
    prediction: 'EternaLEnVy',
  },
  {
    title: 'Player with the highest assist avg',
    explorerLink: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=assists&having=10',
    prediction: 'Febby',
  },
  {
    title: 'Player with the most assists in a game',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=assists&having=&order=',
    prediction: '33',
  },
  {
    title: 'Player with the highest last hits avg',
    explorerLink: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=last_hits&having=10',
    prediction: 'Fata',
  },
  {
    title: 'Player with the most last hits in a game',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=last_hits&having=&order=',
    prediction: 'Ghostik',
  },
  {
    title: 'Player with the highest GPM in a game',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=gold_per_min&having=&order=',
    prediction: 'SumaiL',
  },
  {
    title: 'Player with the highest GPM avg',
    explorerLink: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=gold_per_min&having=10',
    prediction: 'Fata',
  },
  {
    title: 'Player with the most distinct heroes',
    explorerLink: '/explorer?group=player&isTi7Team=true&minDate=2017-06-18T07%3A00%3A00.000Z&select=distinct_heroes',
    prediction: 'AME',
  },
  {
    title: 'Tournament total number of games',
    prediction: '339',
    notes: '18 teams play 8 matches of 2 games.\n4 Bo1, 17 Bo3, and 1 Bo5.\n(18 * 8 * 2) + (4) + (2.5 * 17) + (4) = 338.5',
  },
  {
    title: 'Tournament heroes picked',
    prediction: '112',
    explorerLink: '/explorer?group=&isTi7Team=&minDate=2017-06-18T07%3A00%3A00.000Z&select=picks_bans&having=&order=&maxDate=2017-06-30T07%3A00%3A00.000Z',
    notes: 'Tournament predictions based on date range with 338 games',
  },
  {
    title: 'Tournament heroes banned',
    prediction: '104',
    explorerLink: '/explorer?group=&isTi7Team=&minDate=2017-06-18T07%3A00%3A00.000Z&select=picks_bans&having=&order=&maxDate=2017-06-30T07%3A00%3A00.000Z',
  },
  {
    title: 'Tournament most kills in a game',
    prediction: '90',
    explorerLink: '/explorer?sql=SELECT%0Amatch_id%2C%0Asum(kills)%0AFROM%20matches%0AJOIN%20match_patch%20using(match_id)%0AJOIN%20leagues%20using(leagueid)%0AJOIN%20player_matches%20using(match_id)%0AJOIN%20heroes%20on%20heroes.id%20%3D%20player_matches.hero_id%0ALEFT%20JOIN%20notable_players%20ON%20notable_players.account_id%20%3D%20player_matches.account_id%20AND%20notable_players.locked_until%20%3D%20(SELECT%20MAX(locked_until)%20FROM%20notable_players)%0ALEFT%20JOIN%20teams%20using(team_id)%0AWHERE%20TRUE%0AAND%20kills%20IS%20NOT%20NULL%0AAND%20matches.start_time%20%3E%3D%20extract(epoch%20from%20timestamp%20%272017-06-08T07%3A00%3A00.000Z%27)%0AAND%20matches.start_time%20%3C%3D%20extract(epoch%20from%20timestamp%20%272017-07-18T07%3A00%3A00.000Z%27)%0AAND%20teams.team_id%20IN%20(5%2C%2015%2C%2039%2C%2046%2C%202163%2C%20350190%2C%201375614%2C%201838315%2C%201883502%2C%202108395%2C%202512249%2C%202581813%2C%202586976%2C%202640025%2C%202672298%2C%203214108%2C%203331948%2C%204593831)%0AGROUP%20BY%20match_id%0AORDER%20BY%20sum%20DESC%20NULLS%20LAST%0ALIMIT%20200&format=',
  },
  {
    title: 'Tournament longest game',
    prediction: '141',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-08T07%3A00%3A00.000Z&select=duration&having=&order=&maxDate=2017-07-18T07%3A00%3A00.000Z&limit=',
  },
  {
    title: 'Tournament shortest game',
    prediction: '16',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-08T07%3A00%3A00.000Z&select=duration&having=&order=asc&maxDate=2017-07-18T07%3A00%3A00.000Z&limit=',
  },
  {
    title: 'Tournament most kills by a hero in a game',
    prediction: '27',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-08T07%3A00%3A00.000Z&select=kills&having=&order=&maxDate=2017-07-18T07%3A00%3A00.000Z&limit=',
  },
  {
    title: 'Tournament most deaths by a hero in a game',
    prediction: '21',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-08T07%3A00%3A00.000Z&select=deaths&having=&order=&maxDate=2017-07-18T07%3A00%3A00.000Z&limit=',
  },
  {
    title: 'Tournament most assists by a hero in a game',
    prediction: '33',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-08T07%3A00%3A00.000Z&select=assists&having=&order=&maxDate=2017-07-18T07%3A00%3A00.000Z&limit=',
  },
  {
    title: 'Tournament highest GPM by a hero in a game',
    prediction: '1037',
    explorerLink: '/explorer?group=&isTi7Team=true&minDate=2017-06-08T07%3A00%3A00.000Z&select=gold_per_min&having=&order=&maxDate=2017-07-18T07%3A00%3A00.000Z&limit=',
  },
];

const predColumns = [
  { displayName: 'Title', field: 'title' },
  { displayName: 'Prediction', field: 'prediction' },
  { displayName: 'Explorer', field: 'explorerLink', displayFn: (row, col, field) => (<RaisedButton primary href={field} label="Explorer" target="_blank" />) },
  { displayName: 'Notes', field: 'notes', displayFn: (row, col, field) => (<pre>{field}</pre>) },
];

const Predictions = () => (<div>
  <Helmet title={'TI7 Predictions'} />
  <Heading title="TI7 Predictions" subtitle={'Based on the games of the 18 participating teams since June 18, 2017'} />
  <Warning className={''}>
    {'These predictions assume future play will be similar to past play, which is not guaranteed! Use the Explorer link for each prediction if you want to examine the data in more detail.'}
  </Warning>
  <br />
  <Table data={predictionArray} columns={predColumns} />
</div>);

export default Predictions;
