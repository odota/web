import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import heroes from 'dotaconstants/build/heroes.json';
import {
  transformations,
  fromNow,
  subTextStyle,
} from '../../utility';
import Table, { TableLink } from '../Table';
import Container from '../Container';
// import { List } from 'material-ui/List';
import { StyledTeamIconContainer } from '../../components/Match/StyledMatch';
import HeroImage from '../Visualizations/HeroImage';

const searchColumns = strings => [{
  displayName: strings.th_name,
  field: 'personaname',
  displayFn: (row, col, field) => {
    const subtitle = row.last_match_time ? fromNow(new Date(row.last_match_time) / 1000) : '';
    return transformations.player({
      ...row,
      subtitle,
    }, col, field);
  },
}];

const proColumns = strings => [{
  displayName: strings.th_name,
  field: 'name',
  displayFn: (row, col, field) => transformations.player({
    ...row,
  }, col, field),
}, {
  displayName: strings.th_team_name,
  field: 'team_name',
  displayFn: (row, col, field) => (
    <TableLink to={`/teams/${row.team_id}`}>{field || strings.general_unknown}</TableLink>
  ),
}];

const matchColumns = strings => [
  {
    displayName: strings.th_match_id,
    field: 'match_id',
    sortFn: true,
    displayFn: (row, col, field) => (
      <div>
        <TableLink to={`/matches/${field}`}>{field}</TableLink>
        <span style={{ ...subTextStyle, display: 'block', marginTop: 1 }}>
          {row.skill && strings[`skill_${row.skill}`]}
        </span>
      </div>),
  },
  {
    displayName: strings.th_duration,
    tooltip: strings.tooltip_duration,
    field: 'duration',
    sortFn: true,
    displayFn: transformations.duration,
  },
  {
    displayName: <StyledTeamIconContainer>{strings.general_radiant}</StyledTeamIconContainer>,
    field: 'players',
    displayFn: (row, col, field) => [0, 1, 2, 3, 4].map(player =>
      (heroes[field[player].hero_id] ? <HeroImage id={field[player].hero_id} key={field[player].hero_id} style={{ width: '50px' }} alt="" /> : null)),
  },
  {
    displayName: <StyledTeamIconContainer >{strings.general_dire}</StyledTeamIconContainer>,
    field: 'players',
    displayFn: (row, col, field) => [5, 6, 7, 8, 9].map(player =>
      (heroes[field[player].hero_id] ? <HeroImage id={field[player].hero_id} key={field[player].hero_id} style={{ width: '50px' }} alt="" /> : null)),
  },
];

const Search = ({
  players,
  playersLoading,
  playersError,
  pros,
  prosLoading,
  prosError,
  matchData,
  matchLoading,
  matchError,
  strings,
}) => (
  <div>
    <Container
      loading={matchLoading}
      title={strings.explorer_match}
      hide={!matchData || matchData.length === 0 || matchError}
    >
      <Table
        data={[matchData]}
        columns={matchColumns(strings)}
      />
    </Container>
    <Container
      loading={prosLoading}
      error={prosError}
      title={strings.app_pro_players}
      hide={!pros || pros.length === 0}
    >
      <Table
        paginated
        pageLength={5}
        data={pros}
        columns={proColumns(strings)}
      />
    </Container>
    <Container
      loading={playersLoading}
      error={playersError}
      title={strings.app_public_players}
      subtitle={`${players.length} ${strings.app_results}`}
    >
      <Table
        paginated
        data={players}
        columns={searchColumns(strings)}
      />
    </Container>
  </div>
);

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({})),
  playersLoading: PropTypes.bool,
  playersError: PropTypes.string,
  pros: PropTypes.arrayOf(PropTypes.shape({})),
  prosLoading: PropTypes.bool,
  prosError: PropTypes.string,
  matchData: PropTypes.arrayOf({}),
  matchLoading: PropTypes.bool,
  matchError: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Search);
