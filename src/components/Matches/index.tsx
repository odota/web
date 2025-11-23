import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { heroes } from 'dotaconstants';
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
import Heading from '../Heading';

export const WinnerSpan = styled.span`
  display: inline-block;

  & svg {
    width: 10px !important;
    height: 10px !important;
    margin-right: 5px;
    fill: ${constants.colorGolden};
  }
`;

const matchesColumns = (strings: Strings) => [
  {
    field: 'version',
    displayFn: (row: any, col: any, field: any) => (
      <div>{field ? '☆' : ''}</div>
    ),
  },
  {
    displayName: strings.th_match_id,
    field: 'match_id',
    sortFn: true,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        <TableLink to={`/matches/${field}`}>{field}</TableLink>
        <div style={{ ...subTextStyle }}>
          <div style={{ float: 'left' }}>
            <FromNowTooltip timestamp={row.start_time + row.duration} />
          </div>
          <span style={{ marginLeft: 1, marginRight: 1 }}>/</span>
          {row.league_name}
        </div>
      </div>
    ),
  },
  {
    displayName: strings.th_duration,
    tooltip: strings.tooltip_duration,
    field: 'duration',
    sortFn: true,
    displayFn: transformations.duration,
  },
  {
    displayName: (
      <StyledTeamIconContainer>
        {strings.general_radiant}
      </StyledTeamIconContainer>
    ),
    field: 'radiant_name',
    color: constants.colorGreen,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        {row.radiant_win && (
          <WinnerSpan>
            <IconTrophy />
          </WinnerSpan>
        )}
        {field}
      </div>
    ),
  },
  {
    displayName: (
      <StyledTeamIconContainer>{strings.general_dire}</StyledTeamIconContainer>
    ),
    field: 'dire_name',
    color: constants.colorRed,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        {!row.radiant_win && (
          <WinnerSpan>
            <IconTrophy />
          </WinnerSpan>
        )}
        {field}
      </div>
    ),
  },
];

const publicMatchesColumns = (strings: Strings) => [
  {
    displayName: strings.th_match_id,
    field: 'match_id',
    sortFn: true,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        <TableLink to={`/matches/${field}`}>{field}</TableLink>
        <div style={{ ...subTextStyle }}>
          <div style={{ float: 'left' }}>
            <FromNowTooltip timestamp={row.start_time + row.duration} />
          </div>
          <span style={{ marginLeft: 1, marginRight: 1 }}>/</span>
          {rankTierToString(row.avg_rank_tier)}
        </div>
      </div>
    ),
  },
  {
    displayName: strings.th_duration,
    tooltip: strings.tooltip_duration,
    field: 'duration',
    sortFn: true,
    displayFn: transformations.duration,
  },
  {
    displayName: (
      <StyledTeamIconContainer>
        {strings.general_radiant}
      </StyledTeamIconContainer>
    ),
    field: 'radiant_team',
    displayFn: (row: any, col: any, field: any[]) =>
      field?.map((heroId: keyof Heroes) =>
        heroes[heroId] ? (
          <HeroImage
            id={heroId}
            key={heroId}
            style={{ width: '50px' }}
            alt={heroId}
          />
        ) : null,
      ),
  },
  {
    displayName: (
      <StyledTeamIconContainer>{strings.general_dire}</StyledTeamIconContainer>
    ),
    field: 'dire_team',
    displayFn: (row: any, col: any, field: any[]) =>
      field?.map((heroId: keyof Heroes) =>
        heroes[heroId] ? (
          <HeroImage
            id={heroId}
            key={heroId}
            style={{ width: '50px' }}
            alt={heroId}
          />
        ) : null,
      ),
  },
];

const matchTabs = (strings: Strings) => [
  {
    name: strings.hero_pro_tab,
    key: 'pro',
    content: (propsPar: MatchesProps) => (
      <div>
        <Table
          data={propsPar.proData}
          columns={matchesColumns(strings)}
          loading={propsPar.loading}
        />
      </div>
    ),
    route: '/matches/pro',
  },
  {
    name: strings.matches_highest_mmr,
    key: 'highMmr',
    content: (propsPar: MatchesProps) => (
      <div>
        <Table
          data={propsPar.publicData}
          columns={publicMatchesColumns(strings)}
          loading={propsPar.loading}
        />
      </div>
    ),
    route: '/matches/highMmr',
  },
];

const getData = (props: MatchesProps) => {
  const route = props.match.params.matchId || 'pro';
  if (!Number.isInteger(Number(route))) {
    props.dispatchProMatches();
    props.dispatchPublicMatches({ min_rank: 75 });
  }
};

type MatchesProps = {
  match: { params: { matchId: string; info?: string } };
  strings: Strings;
  dispatchProMatches: Function;
  dispatchPublicMatches: Function;
  proData: any[];
  publicData: any[];
  loading: boolean;
};

class RequestLayer extends React.Component<MatchesProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: MatchesProps) {
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

    const tab = matchTabs(strings).find((_tab) => _tab.key === route);
    return (
      <div>
        <Helmet title={strings.title_matches} />
        <Heading title={strings.th_matches} className="top-heading" />
        <TabBar tabs={matchTabs(strings)} />
        {tab && tab.content(this.props)}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  proData: state.app.proMatches.data,
  publicData: state.app.publicMatches.data,
  loading: state.app.proMatches.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchProMatches: () => dispatch(getProMatches()),
  dispatchPublicMatches: (options: any) => dispatch(getPublicMatches(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
