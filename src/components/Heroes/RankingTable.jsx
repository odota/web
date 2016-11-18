import React from 'react';
import Table from 'components/Table';
import strings from 'lang';
import { transformations } from 'utility';
import SocialPerson from 'material-ui/svg-icons/social/person';

const rankingColumns = [{
  displayName: '#',
  displayFn: (row, col, field, index) => index + 1,
}, {
  displayName: strings.th_name,
  displayFn: (row, col, field) => {
    const subtitle = (
      <span>
        <section
          data-hint={strings.th_solo_mmr}
          data-hint-position="bottom"
        >
          <SocialPerson />
        </section>
        {row.solo_competitive_rank || strings.general_unknown}
      </span>
    );
    return transformations.player({ ...row, subtitle }, col, field);
  },
}, {
  displayName: strings.th_score,
  displayFn: row => parseFloat(row.score).toFixed(),
}];
export default ({
  rankings,
}) => (<Table data={rankings} columns={rankingColumns} />);
