import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { item_ids as itemIds } from 'dotaconstants';
import Table from '../Table/Table';
import inflictorWithValue from '../Visualizations/inflictorWithValue';
import { getHeroItemSuggestions } from '../../actions';
import TableSkeleton from '../Skeletons/TableSkeleton';

type ItemSuggestionProps = {
  match: {
    params: {
      heroId: string;
    };
  };
  isLoading: boolean;
  onGetHeroItemSuggestions: (heroId: string) => Promise<any>;
  data: any[];
};

function ItemSuggestion(props: ItemSuggestionProps) {
  const displayFn = (row: any, col: any, i: number) =>
    Object.keys(i).map((itemId) =>
      inflictorWithValue(itemIds[itemId as keyof typeof itemIds]),
    );

  const { onGetHeroItemSuggestions, match } = props;
  useEffect(() => {
    if (match.params && match.params.heroId) {
      onGetHeroItemSuggestions(match.params.heroId);
    }
  }, [onGetHeroItemSuggestions, match]);

  const itemSuggestionColumns = [
    {
      field: 'start_game_items',
      displayName: 'Start Game',
      displayFn,
    },
    {
      field: 'early_game_items',
      displayName: 'Early Game',
      displayFn,
    },
    {
      field: 'mid_game_items',
      displayName: 'Mid Game',
      displayFn,
    },
    {
      field: 'late_game_items',
      displayName: 'Late Game',
      displayFn,
    },
  ];
  const itemsPopularityData = props.data;
  return props.isLoading ? (
    <TableSkeleton />
  ) : (
    <Table data={itemsPopularityData} columns={itemSuggestionColumns} />
  );
}

const mapStateToProps = ({ app }: any) => ({
  isLoading: app.heroItemSuggestions.loading,
  data: Object.values(app.heroItemSuggestions.data),
});

const mapDispatchToProps = {
  onGetHeroItemSuggestions: getHeroItemSuggestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSuggestion);
