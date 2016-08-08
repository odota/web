import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';

import style from './Heroes.css';

export default ({ rankings }) => {
  if (!rankings || rankings.length === 0) {
    return <div />;
  }

  return (
    <Table className={style.RankingTable}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn className={style.RankingColNo}>No</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Score</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {rankings.map((ranking, i) => (
          <TableRow selectable={false} key={ranking.account_id}>
            <TableRowColumn className={style.RankingColNo} style={{ textAlign: 'center' }}>{i + 1}</TableRowColumn>
            <TableRowColumn>
              <div className={style.RankingName}>
                <Avatar
                  src={ranking.avatarfull}
                  size={30}
                  className={style.RankingAvatar}
                />
                <h3 className={style.RankingPersonaName}>
                  <Link to={`/players/${ranking.account_id}`}>
                    {ranking.personaname}
                  </Link>
                </h3>
                {ranking.solo_competitive_rank ? <span>{ranking.solo_competitive_rank} MMR</span> : ''}
              </div>
            </TableRowColumn>
            <TableRowColumn>{parseFloat(ranking.score).toFixed()}</TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
