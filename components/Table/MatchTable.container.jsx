import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';
import createConstantsWrapper from '../Constants';
import { getMatch } from '../../actions';
const mapStateToProps = (state) => {
  const { error, loading, match } = state[REDUCER_KEY].gotMatch;
  return {
    loading,
    error,
    data: match && match.players ? match.players : match,
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
    return <Table {...this.props} />;
  }
}

const TableWrapper = connect(mapStateToProps, mapDispatchToProps)(RequestLayer);

export default createConstantsWrapper(TableWrapper);
