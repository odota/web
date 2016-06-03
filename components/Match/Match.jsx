import React from 'react';
import { Table } from '../Table';
// import Error from '../Error';
import { REDUCER_KEY } from '../../reducers';
import { getMatch } from '../../actions';
import { connect } from 'react-redux';
import createConstantsWrapper from '../Constants';

const columns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 2,
}, 
{
  displayName: 'Player',
  field: 'personaname',
  width: 2,
},
{
  displayName: 'Kills',
  field: 'kills',
  width: 2,
}, {
  displayName: 'Deaths',
  field: 'deaths',
  width: 2,
}, {
  displayName: 'Assists',
  field: 'assists',
  width: 2,
}];

const mapStateToProps = (state) => {
  const { error, loading, match } = state[REDUCER_KEY].gotMatch;
  return {
    loading,
    error,
    data: match,
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
        {<Table {...this.props} data={data && data.players ? data.players : data} columns={columns} />}
      </div>
    );
  }
}

const TableWrapper = connect(mapStateToProps, mapDispatchToProps)(RequestLayer);

export default createConstantsWrapper(TableWrapper);
