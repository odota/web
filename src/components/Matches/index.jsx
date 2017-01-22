import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getProMatches } from 'actions';
import strings from 'lang';
import Table, { TableLink } from 'components/Table';
// import Heading from 'components/Heading';
import { transformations } from 'utility';
import subTextStyle from 'components/Visualizations/Table/subText.css';
import { IconRadiant, IconDire } from 'components/Icons';
import matchStyles from 'components/Match/Match.css';
import Container from 'components/Container';

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
  displayName: <span className={matchStyles.teamIconContainer} ><IconRadiant className={matchStyles.iconRadiant} />{strings.general_radiant}</span>,
  field: 'radiant_name',
  color: matchStyles.green,
}, {
  displayName: <span className={matchStyles.teamIconContainer} ><IconDire className={matchStyles.iconDire} />{strings.general_dire}</span>,
  field: 'dire_name',
  color: matchStyles.red,
}];

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.dispatchProMatches();
  }
  render() {
    return (<div>
      <Helmet title={strings.title_matches} />
      <Container>
        <Table data={this.props.data} columns={matchesColumns} />
      </Container>
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
