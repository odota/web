import React from 'react';
import Table from 'components/Table';
import Avatar from 'material-ui/Avatar';
import {
  Link,
} from 'react-router';
import strings from 'lang';
import style from './Heroes.css';

const rankingColumns = [{
  displayName: '#',
  displayFn: (row, col, field, index) => index + 1,
}, {
  displayName: strings.th_name,
  displayFn: row => (<div className={style.RankingName}>
    <Avatar
      src={row.avatarfull}
      size={30}
      className={style.RankingAvatar}
    />
    <h3 className={style.RankingPersonaName}>
      <Link to={`/players/${row.account_id}`}>
        {row.personaname}
      </Link>
    </h3>
    {row.solo_competitive_rank ? <span>{row.solo_competitive_rank} MMR</span> : ''}
  </div>),
}, {
  displayName: strings.th_score,
  displayFn: row => parseFloat(row.score).toFixed(),
}];
export default ({
  rankings,
}) => (<Table data={rankings} columns={rankingColumns} />);
