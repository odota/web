import React from 'react';
import { connect } from 'react-redux';
import { getProMatches } from 'actions';
import strings from 'lang';
import Table, { TableLink } from 'components/Table';
// import Heading from 'components/Heading';
import Spinner from 'components/Spinner';
import { transformations } from 'utility';
import subTextStyle from 'components/Visualizations/Table/subText.css';

const matchesColumns = [{
  displayName: strings.th_match_id,
  field: 'match_id',
  sortFn: true,
  displayFn: (row, col, field) => <div>
    <TableLink to={`/matches/${field}`}>{field}</TableLink>
    <span className={subTextStyle.subText} style={{ display: 'block', marginTop: 1 }}>
      {row.league_name}
    </span>
  </div>,
}, {
  displayName: strings.th_duration,
  tooltip: strings.tooltip_duration,
  field: 'duration',
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: strings.general_radiant,
  field: 'radiant_name',
}, {
  displayName: strings.general_dire,
  field: 'dire_name',
}];

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.dispatchProMatches();
  }
  render() {
    const loading = this.props.loading;
    return loading
      ? <Spinner />
      : (<div>
        <Table data={this.props.data} columns={matchesColumns} />
      </div>);
  }
}

const mapStateToProps = state => ({
  data: state.app.proMatches.list,
  loading: state.app.proMatches.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchProMatches: () => dispatch(getProMatches()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
