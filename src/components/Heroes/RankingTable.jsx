import React from 'react';
import Table from 'components/Table';
import strings from 'lang';
import { transformations } from 'utility';

const rankingColumns = [{
  displayName: '#',
  displayFn: (row, col, field, index) => index + 1,
}, {
  displayName: strings.th_name,
  displayFn: (row, col, field) => {
    const subtitle = <span>{row.solo_competitive_rank ? `${row.solo_competitive_rank} MMR` : ''}</span>;
    return transformations.player({...row, subtitle: subtitle}, col, field);
  }
}, {
  displayName: strings.th_score,
  displayFn: row => parseFloat(row.score).toFixed(),
}];
export default ({
  rankings,
}) => (<Table data={rankings} columns={rankingColumns} />);
