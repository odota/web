import React from 'react';
import Table from 'components/Table';
import strings from 'lang';
import { transformations } from 'utility';
import { Mmr } from 'components/Visualizations/Table/HeroImage';

const rankingColumns = [{
  displayName: '#',
  displayFn: (row, col, field, index) => index + 1,
}, {
  displayName: strings.th_name,
  displayFn: (row, col, field) => {
    const subtitle = <Mmr number={row.solo_competitive_rank} />;
    return transformations.player({ ...row, subtitle }, col, field);
  },
}, {
  displayName: strings.th_score,
  field: 'score',
  displayFn: row => parseFloat(row.score).toFixed(),
  relativeBars: true,
}];
export default ({
  rankings,
}) => (<Table data={rankings} columns={rankingColumns} />);
