/* global API_HOST */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getProMatches, getPublicMatches } from 'actions';
import strings from 'lang';
import Table, { TableLink } from 'components/Table';
// import Heading from 'components/Heading';
import { transformations } from 'utility';
import subTextStyle from 'components/Visualizations/Table/subText.css';
import { IconRadiant, IconDire, IconTrophy } from 'components/Icons';
import Match from 'components/Match';
import TabBar from 'components/TabBar';
import heroes from 'dotaconstants/build/heroes.json';
import styles from './Matches.css';
import { StyledTeamIconContainer } from '../Match/StyledMatch';
import colorPallete from '../constants';


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
  displayName: <StyledTeamIconContainer ><IconRadiant />{strings.general_radiant}</StyledTeamIconContainer>,
  field: 'radiant_name',
  color: colorPallete.colorGreen,
  displayFn: (row, col, field) => <div>{row.radiant_win && <span className={styles.confirmed}><IconTrophy /></span>}{field}</div>,
}, {
  displayName: <StyledTeamIconContainer ><IconDire />{strings.general_dire}</StyledTeamIconContainer>,
  field: 'dire_name',
  color: colorPallete.colorRed,
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
    displayName: <StyledTeamIconContainer><IconRadiant />{strings.general_radiant}</StyledTeamIconContainer>,
    field: 'radiant_team',
    displayFn: (row, col, field) => (field || '').split(',').map(heroId =>
      <img key={heroId} style={{ width: '50px' }} src={`${API_HOST}${heroes[heroId].img}`} alt="" />),
  },
  {
    displayName: <StyledTeamIconContainer ><IconDire />{strings.general_dire}</StyledTeamIconContainer>,
    field: 'dire_team',
    displayFn: (row, col, field) => (field || '').split(',').map(heroId =>
      <img key={heroId} style={{ width: '50px' }} src={`${API_HOST}${heroes[heroId].img}`} alt="" />),
  },
];

const matchTabs = [{
  name: strings.hero_pro_tab,
  key: 'pro',
  content: propsPar => (<div>
    <Table data={propsPar.proData} columns={matchesColumns} />
  </div>),
  route: '/matches/pro',
}, {
  name: strings.matches_highest_mmr,
  key: 'highMmr',
  content: propsPar => (<div>
    <Table data={propsPar.publicData} columns={publicMatchesColumns} />
  </div>),
  route: '/matches/highMmr',
}, {
  name: strings.matches_lowest_mmr,
  key: 'lowMmr',
  content: propsPar => (<div>
    <Table data={propsPar.publicData} columns={publicMatchesColumns} />
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

    const tab = matchTabs.find(_tab => _tab.key === route);
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

RequestLayer.propTypes = {
  match: PropTypes.object,
  // proData: PropTypes.array,
  // publicData: PropTypes.array,
};

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
