import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import itemIds from 'dotaconstants/build/item_ids.json';
import PropTypes from 'prop-types';
import Table from '../Table';
import inflictorWithValue from '../Visualizations/inflictorWithValue';
import { getHeroItemSuggestions } from '../../actions';
import TableSkeleton from '../Skeletons/TableSkeleton';

function ItemsSuggestion(props) {
  const displayFn = (row, col, i) => Object.keys(i).map(itemId => inflictorWithValue(itemIds[itemId]));

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
  return props.isLoading ? <TableSkeleton /> : <Table data={itemsPopularityData} columns={itemSuggestionColumns} />;
}

ItemsSuggestion.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      heroId: PropTypes.string,
    }),
  }),
  isLoading: PropTypes.bool,
};

const mapStateToProps = ({ app }) => ({
    isLoading: app.heroItemSuggestions.loading,
    data: Object.values(app.heroItemSuggestions.data),
  }
);


const mapDispatchToProps = {
  onGetHeroItemSuggestions: getHeroItemSuggestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsSuggestion);
