/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getProMatches, getPublicMatches } from 'actions';
import strings from 'lang';
import Table, { TableLink } from 'components/Table';
// import Heading from 'components/Heading';
import { transformations } from 'utility';
import subTextStyle from 'components/Visualizations/Table/subText.css';
import { IconRadiant, IconDire, IconTrophy } from 'components/Icons';
import matchStyles from 'components/Match/Match.css';
import Match from 'components/Match';
import TabBar from 'components/TabBar';
import heroes from 'dotaconstants/build/heroes.json';
import styles from './Matches.css';

const matchesColumns = [{
  displayName: strings.th_match_id,
  field: 'match_id',
  sortFn: true,
  displayFn: (row, col, field) => (<div>
    <TableLink to={`/matches/${field}`}>{field}</TableLink>
    <span className={subTextStyle.subText} style={{ display: 'block', marginTop: 1 }}>
      {row.league_name}
    </span>
  </div>),
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
  displayFn: (row, col, field) => <div>{row.radiant_win && <span className={styles.confirmed}><IconTrophy /></span>}{field}</div>,
}, {
  displayName: <span className={matchStyles.teamIconContainer} ><IconDire className={matchStyles.iconDire} />{strings.general_dire}</span>,
  field: 'dire_name',
  color: matchStyles.red,
  displayFn: (row, col, field) => <div>{!row.radiant_win && <span className={styles.confirmed}><IconTrophy /></span>}{field}</div>,
}];

const publicMatchesColumns = [
  {
    displayName: strings.th_match_id,
    field: 'match_id',
    sortFn: true,
    displayFn: (row, col, field) => (<div>
      <TableLink to={`/matches/${field}`}>{field}</TableLink>
      <span className={subTextStyle.subText} style={{ display: 'block', marginTop: 1 }}>
        {row.avg_mmr} {strings.th_mmr}
      </span>
    </div>),
  }, {
    displayName: strings.th_duration,
    tooltip: strings.tooltip_duration,
    field: 'duration',
    sortFn: true,
    displayFn: transformations.duration,
  },
  {
    displayName: <span className={matchStyles.teamIconContainer} ><IconRadiant className={matchStyles.iconRadiant} />{strings.general_radiant}</span>,
    field: 'radiant_team',
    displayFn: (row, col, field) => (field || '').split(',').map(heroId =>
      <img key={heroId} style={{ width: '50px' }} src={`${API_HOST}${heroes[heroId].img}`} role="presentation" />),
  },
  {
    displayName: <span className={matchStyles.teamIconContainer} ><IconDire className={matchStyles.iconDire} />{strings.general_dire}</span>,
    field: 'dire_team',
    displayFn: (row, col, field) => (field || '').split(',').map(heroId =>
      <img key={heroId} style={{ width: '50px' }} src={`${API_HOST}${heroes[heroId].img}`} role="presentation" />),
  },
];

const matchTabs = [{
  name: strings.hero_pro_tab,
  key: 'pro',
  content: props => (<div>
    <Table data={props.proData} columns={matchesColumns} />
  </div>),
  route: '/matches/pro',
}, {
  name: strings.matches_highest_mmr,
  key: 'highMmr',
  content: props => (<div>
    <Table data={props.publicData} columns={publicMatchesColumns} />
  </div>),
  route: '/matches/highMmr',
}, {
  name: strings.matches_lowest_mmr,
  key: 'lowMmr',
  content: props => (<div>
    <Table data={props.publicData} columns={publicMatchesColumns} />
  </div>),
  route: '/matches/lowMmr',
}];

const getData = (props) => {
  const route = props.match.params.matchId || 'pro';
  if (!Number.isInteger(Number(route))) {
    props.dispatchProMatches();
    props.dispatchPublicMatches({ [props.match.params.matchId === 'lowMmr' ? 'mmr_ascending' : 'mmr_descending']: 1 });
  }
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.match.params.matchId !== nextProps.match.params.matchId) {
      getData(nextProps);
    }
  }
  render() {
    const route = this.props.match.params.matchId || 'pro';

    if (Number.isInteger(Number(route))) {
      return <Match {...this.props} matchId={route} />;
    }

    const tab = matchTabs.find(tab => tab.key === route);
    return (<div>
      <Helmet title={strings.title_matches} />
      <div>
        <TabBar
          info={route}
          tabs={matchTabs}
        />
        {tab && tab.content(this.props)}
      </div>
    </div>);
  }
}

const mapStateToProps = state => ({
  proData: state.app.proMatches.data,
  publicData: state.app.publicMatches.data,
  loading: state.app.proMatches.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchProMatches: () => dispatch(getProMatches()),
  dispatchPublicMatches: options => dispatch(getPublicMatches(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
