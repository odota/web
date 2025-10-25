import React from 'react';
import { connect } from 'react-redux';
import { heroes } from 'dotaconstants';
import { transformations, fromNow, subTextStyle } from '../../utility';
import Table, { TableLink } from '../Table';
import Container from '../Container';
import { StyledTeamIconContainer } from '../../components/Match/StyledMatch';
import HeroImage from '../Visualizations/HeroImage';
import useStrings from '../../hooks/useStrings.hook';

const searchColumns = (strings: Strings) => [
  {
    displayName: strings.th_name,
    field: 'personaname',
    displayFn: (row: any, col: any, field: any) => {
      const subtitle = row.last_match_time
        ? fromNow(Number(new Date(row.last_match_time)) / 1000)
        : '';
      return transformations.player({
        ...row,
        subtitle,
      });
    },
  },
];

const proColumns = (strings: Strings) => [
  {
    displayName: strings.th_name,
    field: 'name',
    displayFn: (row: any, col: any, field: any) =>
      transformations.player({
        ...row,
      }),
  },
  {
    displayName: strings.th_team_name,
    field: 'team_name',
    displayFn: (row: any, col: any, field: any) => (
      <TableLink to={`/teams/${row.team_id}`}>
        {field || strings.general_unknown}
      </TableLink>
    ),
  },
];

const matchColumns = (strings: Strings) => [
  {
    displayName: strings.th_match_id,
    field: 'match_id',
    sortFn: true,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        <TableLink to={`/matches/${field}`}>{field}</TableLink>
        <span style={{ ...subTextStyle, display: 'block', marginTop: 1 }}>
          {row.skill && strings[`skill_${row.skill}` as keyof Strings]}
        </span>
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
    field: 'players',
    displayFn: (row: any, col: any, field: any) =>
      [0, 1, 2, 3, 4].map((player) =>
        heroes[field[player].hero_id as keyof Heroes] ? (
          <HeroImage
            id={field[player].hero_id}
            key={field[player].hero_id}
            style={{ width: '50px' }}
            alt=""
          />
        ) : null,
      ),
  },
  {
    displayName: (
      <StyledTeamIconContainer>{strings.general_dire}</StyledTeamIconContainer>
    ),
    field: 'players',
    displayFn: (row: any, col: any, field: any) =>
      [5, 6, 7, 8, 9].map((player) =>
        heroes[field[player].hero_id as keyof Heroes] ? (
          <HeroImage
            id={field[player].hero_id}
            key={field[player].hero_id}
            style={{ width: '50px' }}
            alt=""
          />
        ) : null,
      ),
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
}: {
  players?: any[];
  playersLoading?: boolean;
  playersError?: string;
  pros?: any[];
  prosLoading?: boolean;
  prosError?: string;
  matchData?: any[];
  matchLoading?: boolean;
  matchError?: boolean;
}) => {
  const strings = useStrings();
  return (
    <div>
      <Container
        loading={matchLoading}
        title={strings.explorer_match}
        hide={!matchData || matchData.length === 0 || matchError}
      >
        <Table data={[matchData]} columns={matchColumns(strings)} />
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
          data={pros ?? []}
          columns={proColumns(strings)}
        />
      </Container>
      <Container
        loading={playersLoading}
        error={playersError}
        title={strings.app_public_players}
        subtitle={`${players?.length} ${strings.app_results}`}
      >
        <Table
          paginated
          data={players ?? []}
          columns={searchColumns(strings)}
        />
      </Container>
    </div>
  );
};

export default Search;
