import React from 'react';
import strings from 'lang';
import { transformations } from 'utility';
import Table from 'components/Table';
import Heading from 'components/Heading';
// import { List } from 'material-ui/List';
// import SearchResultItem from './SearchResultItem';
// import style from './search.css';

const searchColumns = [{
  displayName: strings.th_name,
  field: 'personaname',
  displayFn: (row, col, field) =>
    // const subtitle = <span>{`${row.solo_competitive_rank || strings.general_unknown} ${strings.th_mmr}`}</span>;
     transformations.player({ ...row,
     }, col, field)
  ,
}];
export default ({
  players,
}) => (
  <div>
    <Heading title={`${players.length} ${strings.app_results}`} />
    <Table data={players} columns={searchColumns} />
  </div>
);
