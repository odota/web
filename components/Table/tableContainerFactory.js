import { connect } from 'react-redux';
import Table from './Table';

const createTable = (getStateFn, getData, sortAction) => {
  const mapStateToProps = (state, ownProps) => {
    const { error, loading, sortState, sortField } = getStateFn(state, ownProps.id);
    return {
      loading,
      error,
      data: getData(state, sortState, ownProps.id),
      sortState,
      sortField,
      columns: ownProps.columns,
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => ({
    sortClick: (field, sortState, sortFn) => dispatch(sortAction(field, sortState, sortFn, ownProps.id)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Table);
};

export default createTable;
