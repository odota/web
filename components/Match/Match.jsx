import React from 'react';
import { Table } from '../Table';
// import Error from '../Error';
import { REDUCER_KEY } from '../../reducers';
import { getMatch } from '../../actions';
import { connect } from 'react-redux';
import createConstantsWrapper from '../Constants';
import { overviewColumns, abUpgradeColumns } from '../Table/columnDefinitions/matchColumns';
import { transformMatch } from '../../selectors';

const mapStateToProps = (state) => {
  const { error, loading } = state[REDUCER_KEY].gotMatch;
  return {
    loading,
    error,
    data: transformMatch(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  sort: (column) => dispatch(getMatch(column)),
  getMatch: (matchId) => dispatch(getMatch(matchId)),
});

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getMatch(this.props.routeParams.match_id);
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {<Table {...this.props} data={data && data.players ? data.players : data} columns={overviewColumns} />}
        {<Table {...this.props} data={data && data.players ? data.players : data} columns={abUpgradeColumns} />}
      </div>
    );
  }
}

const TableWrapper = connect(mapStateToProps, mapDispatchToProps)(RequestLayer);

export default createConstantsWrapper(TableWrapper);
