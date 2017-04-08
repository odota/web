import strings from 'lang';
// import fields from './fields';

const sqlfs = ['SELECT', 'WHERE', 'GROUP BY', 'ORDER BY'];
const sqlts = ['FROM', 'JOIN', 'LEFT JOIN'];
const tables = ['matches', 'player_matches', 'teams', 'match_logs', 'public_matches', 'public_player_matches'];
const sqlks = ['OFFSET', 'LIMIT', 'DISTINCT', 'IN'];
const sqlfuncs = ['to_timestamp()', 'count()', 'avg()', 'sum()', 'stddev()', 'min()', 'max()', 'using()'];

const autocomplete = cols => ({
  getCompletions(editor, session, pos, prefix, callback) {
    callback(null, []
    .concat(sqlfuncs.map(e => ({ value: e, meta: strings.explorer_postgresql_function })))
    .concat(sqlfs.map(e => ({ value: e, meta: strings.explorer_sql })))
    .concat(sqlts.map(e => ({ value: e, meta: strings.explorer_sql })))
    .concat(sqlks.map(e => ({ value: e, meta: strings.explorer_sql })))
    .concat(tables.map(e => ({ value: e, meta: strings.explorer_table })))
    .concat(cols.map(e => ({ value: `${e.column_name}`, meta: `${e.table_name} - ${e.data_type}` }))),
    );
  },
});

export default autocomplete;
