import React from 'react';
import { connect } from 'react-redux';
import { shape, oneOfType, arrayOf } from 'prop-types';
import Table from '../Table';
import { transformations, getOrdinal, rankTierToString } from '../../utility';

const RankingTable = ({
  rankings,
  strings,
}) => {
  const rankingColumns = [{
    displayName: strings.th_rank,
    displayFn: (row, col, field, index) => getOrdinal(index + 1),
  }, {
    displayName: strings.th_name,
    displayFn: (row, col, field) => {
      const subtitle = rankTierToString(row.rank_tier);
      return transformations.player({ ...row, subtitle }, col, field);
    },
  }, {
    displayName: strings.th_score,
    field: 'score',
    displayFn: row => parseFloat(row.score).toFixed(),
    relativeBars: true,
  }];
  return (<Table data={rankings} columns={rankingColumns} />);
};

RankingTable.propTypes = {
  rankings: oneOfType([
    arrayOf(shape({})),
    shape({}),
  ]),
  strings: shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(RankingTable);
