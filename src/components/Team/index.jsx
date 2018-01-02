import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import strings from 'lang';
import { getTeam, getTeamHeroes, getTeamMatches, getTeamPlayers } from 'actions';
import Container from 'components/Container';
import Table, { TableLink } from 'components/Table';
import { transformations, subTextStyle } from 'utility';
import heroes from 'dotaconstants/build/heroes.json';
import styled from 'styled-components';
import {
  CardTitle,
} from 'material-ui/Card';
import constants from '../constants';

const MAX_MATCHES_ROWS = 20;
const MAX_HEROES_ROWS = 10;

const TeamStatsCard = styled(CardTitle)`
  display: inline-block;
  padding: 0 !important;
  margin-right: 25px;
  margin-top: 15px;

  .textSuccess {
    color: ${constants.colorGreen}
  }
  
  .textDanger {
    color: ${constants.colorRed}
  }

  & span:last-child {
    font-size: 24px !important;
    color: rgba(255, 255, 255, 0.87) !important;
    line-height: 36px !important;
  }

  & span:first-child {
    font-size: 14px !important;
    color: rgba(255, 255, 255, 0.54) !important;
    line-height: 1 !important;
    text-transform: uppercase;
  }
`;

const Logo = styled.img`
  margin-left: 30px;
  margin-right: 30px;
  max-height: 124px;
  @media only screen and (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const TeamName = styled.span`
  color: rgba(245, 245, 245, 0.870588);
  font-size: 28px;
  @media only screen and (max-width: 768px) {
    text-align:center;
  }
`;

const HeaderContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const MatchesContainer = styled.div`
  width: calc(65% - 15px);
  margin-right: 15px;

  @media only screen and (max-width: 1080px) {
    width: 100%;
    margin-right: 0;
  }
`;

const MemberAndHeroContainer = styled.div`
  width: 35%;

  @media only screen and (max-width: 1080px) {
    width: 100%;
  }
`;

const displayResult = (row) => {
  const won = row.radiant_win === row.radiant;
  const string = won ? strings.td_win : strings.td_loss;
  const textColor = won ? constants.colorGreen : constants.colorRed;
  return (
    <span style={{ color: textColor }}>{string}</span>
  );
};

const matchColumns = [{
  displayName: strings.th_match_id,
  field: 'match_id',
  sortFn: true,
  displayFn: (row, col, field) => (
    <div>
      <TableLink to={`/matches/${field}`}>{field}</TableLink>
      <span style={{ ...subTextStyle, display: 'block', marginTop: 1 }}>
        {row.league_name}
      </span>
    </div>
  ),
}, {
  displayName: strings.th_duration,
  tooltip: strings.tooltip_duration,
  field: 'duration',
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: strings.th_result,
  displayFn: displayResult,
}, {
  displayName: 'Opposing team',
  field: 'opposing_team_name',
  sortFn: true,
  displayFn: (row, col, field) => (
    <TableLink to={`./${row.opposing_team_id}`}>{field}</TableLink>
  ),
},
];

const memberColumns = [{
  displayName: strings.th_name,
  field: 'name',
  sortFn: true,
  displayFn: (row, col, field) => (
    <TableLink to={`../players/${row.account_id}`}>{field}</TableLink>
  ),
}, {
  displayName: strings.th_games_played,
  field: 'games_played',
  sortFn: true,
  relativeBars: true,
}, {
  displayName: strings.th_winrate,
  field: 'wins',
  sortFn: row => row.wins / row.games_played,
  percentBars: true,
},
];

const heroColumns = [{
  displayName: strings.th_hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
  sortFn: row => (heroes[row.hero_id] && heroes[row.hero_id].localized_name),
}, {
  displayName: strings.th_games_played,
  field: 'games_played',
  sortFn: true,
  relativeBars: true,
}, {
  displayName: strings.th_winrate,
  field: 'wins',
  sortFn: row => (row.wins / row.games_played),
  percentBars: true,
},
];

const getData = (props) => {
  const { teamId } = props.match.params;
  props.dispatchTeam(teamId);
  props.dispatchTeamMatches(teamId);
  props.dispatchTeamHeroes(teamId);
  props.dispatchTeamPlayers(teamId);
};

const getTeamHeader = (generalData, generalDataLoading, generalDataError) => (
  <HeaderContainer loading={generalDataLoading} error={generalDataError}>
    <Logo
      src={generalData.logo_url}
      alt="Team logo"
    />
    <Column>
      <TeamName>{generalData.name}</TeamName>
      <Row>
        <TeamStatsCard
          title={strings.th_wins}
          subtitle={<div className="textSuccess">{generalData.wins}</div>}
        />
        <TeamStatsCard
          title={strings.th_losses}
          subtitle={<div className="textDanger">{generalData.losses}</div>}
        />
        <TeamStatsCard
          title={strings.th_rating}
          subtitle={generalData.rating}
        />
      </Row>
    </Column>
  </HeaderContainer>
);

class Team extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.match.params.teamId !== nextProps.match.params.teamId) {
      getData(nextProps);
    }
  }

  render() {
    return (
      <div>
        <Helmet title={this.props.generalData.name} />
        <Column>
          {getTeamHeader(this.props.generalData, this.props.generalDataLoading, this.props.generalDataError)}
          <Row>
            <MatchesContainer>
              <Container
                title={strings.heading_matches}
                loading={this.props.matchDataLoading}
                error={this.props.matchDataError}
              >
                <Table
                  columns={matchColumns}
                  data={this.props.matchData}
                  maxRows={MAX_MATCHES_ROWS}
                />
              </Container>
            </MatchesContainer>
            <MemberAndHeroContainer>
              <Container
                title="Current members"
                loading={this.props.playerDataLoading}
                error={this.props.playerDataError}
              >
                <Table
                  columns={memberColumns}
                  data={this.props.currentPlayerData}
                />
              </Container>
              <Container
                title="Most played heroes"
                loading={this.props.heroDataLoading}
                error={this.props.heroDataError}
              >
                <Table
                  columns={heroColumns}
                  data={this.props.heroData}
                  maxRows={MAX_HEROES_ROWS}
                />
              </Container>
            </MemberAndHeroContainer>
          </Row>
        </Column>
      </div>
    );
  }
}

Team.propTypes = {
  generalData: PropTypes.shape({
    team_id: PropTypes.number,
    rating: PropTypes.number,
    wins: PropTypes.number,
    losses: PropTypes.number,
    last_match_time: PropTypes.number,
    name: PropTypes.string,
    tag: PropTypes.string,
    logo_url: PropTypes.string,
  }),
  generalDataLoading: PropTypes.bool,
  generalDataError: PropTypes.string,
  matchData: PropTypes.arrayOf(PropTypes.object),
  matchDataLoading: PropTypes.bool,
  matchDataError: PropTypes.string,
  heroData: PropTypes.arrayOf(PropTypes.object),
  heroDataLoading: PropTypes.bool,
  heroDataError: PropTypes.string,
  currentPlayerData: PropTypes.arrayOf(PropTypes.object),
  playerDataLoading: PropTypes.bool,
  playerDataError: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamId: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => ({
  generalData: state.app.team.data,
  generalDataLoading: state.app.team.loading,
  generalDataError: state.app.team.error,
  heroData: state.app.teamHeroes.data,
  heroDataLoading: state.app.teamHeroes.loading,
  heroDataError: state.app.teamHeroes.error,
  matchData: state.app.teamMatches.data,
  matchDataLoading: state.app.teamMatches.loading,
  matchDataError: state.app.teamMatches.error,
  currentPlayerData: state.app.teamPlayers.data.filter(player => player.is_current_team_member),
  playerDataLoading: state.app.teamPlayers.loading,
  playerDataError: state.app.teamPlayers.error,
});

const mapDispatchToProps = dispatch => ({
  dispatchTeam: teamId => dispatch(getTeam(teamId)),
  dispatchTeamHeroes: teamId => dispatch(getTeamHeroes(teamId)),
  dispatchTeamMatches: teamId => dispatch(getTeamMatches(teamId)),
  dispatchTeamPlayers: teamId => dispatch(getTeamPlayers(teamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
