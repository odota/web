import heroes from 'dotaconstants/build/heroes.json';
import items from 'dotaconstants/build/items.json';
import strings from '../../lang';
// import fields from './fields';

const sqlfs = ['SELECT', 'WHERE', 'GROUP BY', 'ORDER BY'];
const sqlts = ['FROM', 'JOIN', 'LEFT JOIN'];
const tables = ['matches', 'player_matches', 'teams', 'match_logs', 'public_matches', 'public_player_matches'];
const sqlks = ['OFFSET', 'LIMIT', 'DISTINCT', 'IN'];
const sqlfuncs = ['to_timestamp()', 'count()', 'avg()', 'sum()', 'stddev()', 'min()', 'max()', 'using()'];

const autocomplete = (cols, proPlayers = [], teams = [], leagues = []) => {
  const filteredPros = proPlayers.filter(p => p.name).slice(0).map(p => ({ value: p.name, snippet: p.account_id.toString(), meta: `${p.account_id.toString()} (${strings.explorer_player})` }));
  const filteredTeams = teams.filter(t => t.name).slice(0, 100).map(t => ({ value: t.name, snippet: t.team_id.toString(), meta: `${t.team_id.toString()} (${strings.explorer_organization})` }));
  const filteredLeagues = leagues.filter(l => l.tier === 'premium' || l.tier === 'professional').map(l => ({ value: l.name, snippet: l.leagueid.toString(), meta: `${l.leagueid.toString()} (${strings.explorer_league})` }));
  return {
    getCompletions(editor, session, pos, prefix, callback) {
      callback(null, []
        .concat(Object.keys(heroes).map(k => ({ value: heroes[k].localized_name, snippet: k, meta: `${k} (${strings.explorer_hero})` })))
        .concat(Object.keys(items).filter(k => k.indexOf('recipe_') !== 0).map(k => ({ value: items[k].dname, snippet: `'${k}'`, meta: `${k} (${strings.scenarios_item})` })))
        .concat(filteredPros)
        .concat(filteredTeams)
        .concat(filteredLeagues)
        .concat(sqlfuncs.map(e => ({ value: e, meta: strings.explorer_postgresql_function })))
        .concat(sqlfs.map(e => ({ value: e, meta: strings.explorer_sql })))
        .concat(sqlts.map(e => ({ value: e, meta: strings.explorer_sql })))
        .concat(sqlks.map(e => ({ value: e, meta: strings.explorer_sql })))
        .concat(tables.map(e => ({ value: e, meta: strings.explorer_table })))
        .concat(cols.map(e => ({ value: `${e.column_name}`, meta: `${e.table_name} - ${e.data_type}` }))));
    },
  };
};

export default autocomplete;
