import React from 'react';
import Table from '../Table';
import { transformations, getOrdinal, rankTierToString } from '../../utility';
import useStrings from '../../hooks/useStrings.hook';

const RankingTable = ({ rankings }: { rankings: any[] }) => {
  const strings = useStrings();
  const rankingColumns = [
    {
      displayName: strings.th_rank,
      displayFn: (row: any, col: any, field: string, index: number) => getOrdinal(index + 1),
    },
    {
      displayName: strings.th_name,
      displayFn: (row: any) => {
        const subtitle = rankTierToString(row.rank_tier);
        return transformations.player({ ...row, subtitle });
      },
    },
    {
      displayName: strings.th_score,
      field: 'score',
      displayFn: (row: any) => parseFloat(row.score).toFixed(),
      relativeBars: true,
    },
  ];
  return <Table data={rankings} columns={rankingColumns} />;
};

export default RankingTable;
