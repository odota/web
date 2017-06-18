/* global API_HOST */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import strings from 'lang';
import { getTeams } from 'actions';
import Heading from 'components/Heading';
import Table from 'components/Table';
import { getOrdinal } from 'utility';

const columns = [{
  displayName: strings.th_rank,
  displayFn: (row, col, field, index) => getOrdinal(index + 1),
},
{
  displayName: strings.th_name,
  field: 'name',
}, {
  displayName: strings.th_rating,
  field: 'rating',
  sortFn: true,
  relativeBars: true,
  displayFn: (row, col, field) => Math.floor(field),
}, {
  displayName: strings.th_wins,
  field: 'wins',
  sortFn: true,
  relativeBars: true,
}, {
  displayName: strings.th_losses,
  field: 'losses',
  sortFn: true,
  relativeBars: true,
}];

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.dispatchTeams();
  }
  render() {
    return (<div>
      <Helmet title={strings.header_teams} />
      <Heading title={strings.heading_team_elo_rankings} subtitle={strings.subheading_team_elo_rankings} />
      <Table columns={columns} data={this.props.data.slice(0, 100)} />
    </div>);
  }
}

const mapStateToProps = state => ({
  data: state.app.teams.data,
  loading: state.app.teams.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchTeams: () => dispatch(getTeams()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
