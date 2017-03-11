import strings from 'lang';
import fields from './fields';

strings.explorer_sql = 'SQL';
strings.explorer_postgresql_function = 'PostgreSQL Function';
strings.explorer_table = 'Table';
strings.explorer_column = 'Column';
const sqlfs = ['SELECT', 'WHERE', 'GROUP BY', 'ORDER BY', 'USING()'];
const cols = [...new Set(fields.select.map(e => e.value).filter(Boolean).filter(e => typeof e === 'string'))];
const sqlts = ['FROM', 'JOIN', 'LEFT JOIN'];
const tables = ['matches', 'player_matches', 'teams', 'match_logs', 'public_matches', 'public_player_matches'];
const sqlks = ['OFFSET', 'LIMIT', 'DISTINCT', 'IN'];

const autocomplete = {
  getCompletions(editor, session, pos, prefix, callback) {
    callback(null, [
          { value: 'to_timestamp()', meta: strings.explorer_postgresql_function },
    ]
          .concat(sqlfs.map(e => ({ value: e, meta: strings.explorer_sql })))
          .concat(sqlts.map(e => ({ value: e, meta: strings.explorer_sql })))
          .concat(sqlks.map(e => ({ value: e, meta: strings.explorer_sql })))
          .concat(tables.map(e => ({ value: e, meta: strings.explorer_table })))
          .concat(cols.map(e => ({ value: e, meta: strings.explorer_column }))),
          );
  },
};

export default autocomplete;
