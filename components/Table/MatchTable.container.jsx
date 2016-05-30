import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';
import createConstantsWrapper from '../Constants';
import { getMatch } from '../../actions';
//TODO choose columns based on table being rendered
import playerMatchesColumns from './playerMatchesColumns';

const mapStateToProps = (state) => {
  const { error, loading, match } = state[REDUCER_KEY].gotMatch;
  return {
    loading,
    error,
    data: match
  };
};

const mapDispatchToProps = (dispatch) => ({
  sort: (column) => dispatch(getMatch(column)),
  getMatch: (matchId) => dispatch(getMatch(matchId)),
});

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getMatch(this.props.matchId);
  }

  render() {
    return <Table {...this.props} columns={playerMatchesColumns} />;
  }
}

const TableWrapper = connect(mapStateToProps, mapDispatchToProps)(RequestLayer);

export default createConstantsWrapper(TableWrapper);
