import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import heroes from 'dotaconstants/build/heroes.json';
import styled from 'styled-components';
import { transformations, subTextStyle, rankTierToString } from '../../utility';
import { getProMatches, getPublicMatches } from '../../actions';
import Table, { TableLink } from '../Table';
// import Heading from '../Heading';
import { IconTrophy } from '../Icons';
import Match from '../Match';
import TabBar from '../TabBar';
import { StyledTeamIconContainer } from '../Match/StyledMatch';
import constants from '../constants';
import { FromNowTooltip } from '../Visualizations';
import HeroImage from '../Visualizations/HeroImage';

export const WinnerSpan = styled.span`
  display: inline-block;

  & svg {
    width: 10px !important;
    height: 10px !important;
    margin-right: 5px;
    fill: ${constants.colorGolden};
  }
`;

const matchesColumns = strings => [
  {
    field: 'version',
    displayFn: (row, col, field) => <div>{field ? '☆' : ''}</div>
  },
  {
  displayName: strings.th_match_id,
  field: 'match_id',
  sortFn: true,
  displayFn: (row, col, field) => (
    <div>
      <TableLink to={`/matches/${field}`}>{field}</TableLink>
      <div style={{ ...subTextStyle }}>
        <div style={{ float: 'left' }}>
          <FromNowTooltip timestamp={row.start_time + row.duration} />
        </div>
        <span style={{ marginLeft: 1, marginRight: 1 }}>/</span>
        {row.league_name}
      </div>
    </div>),
}, {
  displayName: strings.th_duration,
  tooltip: strings.tooltip_duration,
  field: 'duration',
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: <StyledTeamIconContainer>{strings.general_radiant}</StyledTeamIconContainer>,
  field: 'radiant_name',
  color: constants.colorGreen,
  displayFn: (row, col, field) => <div>{row.radiant_win && <WinnerSpan><IconTrophy /></WinnerSpan>}{field}</div>,
}, {
  displayName: <StyledTeamIconContainer>{strings.general_dire}</StyledTeamIconContainer>,
  field: 'dire_name',
  color: constants.colorRed,
  displayFn: (row, col, field) => <div>{!row.radiant_win && <WinnerSpan><IconTrophy /></WinnerSpan>}{field}</div>,
}];

const publicMatchesColumns = strings => [
  {
    displayName: strings.th_match_id,
    field: 'match_id',
    sortFn: true,
    displayFn: (row, col, field) => (
      <div>
        <TableLink to={`/matches/${field}`}>{field}</TableLink>
        <div style={{ ...subTextStyle }}>
          <div style={{ float: 'left' }}>
            <FromNowTooltip timestamp={row.start_time + row.duration} />
          </div>
          <span style={{ marginLeft: 1, marginRight: 1 }}>/</span>
          {rankTierToString(row.avg_rank_tier)}
        </div>
      </div>),
  }, {
    displayName: strings.th_duration,
    tooltip: strings.tooltip_duration,
    field: 'duration',
    sortFn: true,
    displayFn: transformations.duration,
  },
  {
    displayName: <StyledTeamIconContainer>{strings.general_radiant}</StyledTeamIconContainer>,
    field: 'radiant_team',
    displayFn: (row, col, field) => field?.map(heroId =>
      (heroes[heroId] ? <HeroImage id={heroId} key={heroId} style={{ width: '50px' }} alt="" /> : null)),
  },
  {
    displayName: <StyledTeamIconContainer >{strings.general_dire}</StyledTeamIconContainer>,
    field: 'dire_team',
    displayFn: (row, col, field) => field?.map(heroId =>
      (heroes[heroId] ? <HeroImage id={heroId} key={heroId} style={{ width: '50px' }} alt="" /> : null)),
  },
];

const matchTabs = strings => [{
  name: strings.hero_pro_tab,
  key: 'pro',
  content: propsPar => (
    <div>
      <Table data={propsPar.proData} columns={matchesColumns(strings)} loading={propsPar.loading} />
    </div>),
  route: '/matches/pro',
}, {
  name: strings.matches_highest_mmr,
  key: 'highMmr',
  content: propsPar => (
    <div>
      <Table data={propsPar.publicData} columns={publicMatchesColumns(strings)} loading={propsPar.loading} />
    </div>),
  route: '/matches/highMmr',
}];

const getData = (props) => {
  const route = props.match.params.matchId || 'pro';
  if (!Number.isInteger(Number(route))) {
    props.dispatchProMatches();
    props.dispatchPublicMatches({ mmr_descending: 1 });
  }
};

class RequestLayer extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        matchId: PropTypes.number,
      }),
    }),
    strings: PropTypes.shape({}),
    // proData: PropTypes.array,
    // publicData: PropTypes.array,
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.matchId !== prevProps.match.params.matchId) {
      getData(this.props);
    }
  }
  render() {
    const { strings } = this.props;
    const route = this.props.match.params.matchId || 'pro';

    if (Number.isInteger(Number(route))) {
      return <Match {...this.props} matchId={route} />;
    }

    const tab = matchTabs(strings).find(_tab => _tab.key === route);
    return (
      <div>
        <Helmet title={strings.title_matches} />
        <div>
          <TabBar
            info={route}
            tabs={matchTabs(strings)}
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
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  dispatchProMatches: () => dispatch(getProMatches()),
  dispatchPublicMatches: options => dispatch(getPublicMatches(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
