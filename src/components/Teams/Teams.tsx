import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getOrdinal, getTeamLogoUrl, fromNow } from '../../utility';
import { getTeams } from '../../actions';
import Heading from '../Heading/Heading';
import Team from '../Team/Team';
import Table from '../Table/Table';
import TableLink from '../Table/TableLink';
import { Logo } from '../Team/TeamStyled';
import useStrings from '../../hooks/useStrings.hook';
import { Link } from 'react-router-dom';

const TeamImageContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-top: 7px;
    margin-right: 7px;
    margin-bottom: 7px;
    margin-left: 0px;
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`;

interface TeamRow {
  team_id: string;
  name: string;
  logo_url: string;
  last_match_time: number;
  rating: number;
  wins: number;
  losses: number;
}

interface Props {
  dispatchTeams: () => void;
  data: TeamRow[];
  loading: boolean;
  match: {
    params: {
      teamId?: string;
    };
  };
}

const columns = (strings: Strings) => [
  {
    displayName: strings.th_rank,
    displayFn: (row: TeamRow, col: number, field: any, index: number) =>
      getOrdinal(index + 1),
  },
  {
    displayName: strings.th_name,
    field: 'name',
    displayFn: (row: TeamRow, col: number, field: any) => (
      <TeamImageContainer>
        <Logo
          src={getTeamLogoUrl(row.logo_url)}
          alt={`Official logo for ${field}`}
        />
        <div>
          <TableLink to={`/teams/${row.team_id}`}>{field}</TableLink>
          <span style={{ display: 'block', marginTop: 1 }}>
            {fromNow(row.last_match_time)}
          </span>
        </div>
      </TeamImageContainer>
    ),
  },
  {
    displayName: strings.th_rating,
    field: 'rating',
    sortFn: true,
    relativeBars: true,
    displayFn: (row: TeamRow, col: number, field: any) => Math.floor(field),
  },
  {
    displayName: strings.th_wins,
    field: 'wins',
    sortFn: true,
    relativeBars: true,
  },
  {
    displayName: strings.th_losses,
    field: 'losses',
    sortFn: true,
    relativeBars: true,
  },
  {
    displayName: strings.th_last_played,
    field: 'match_id',
    displayFn: (row: any, col: number, field: any) => (
      <>
        <Link to={'/matches/' + row.match_id}>{row.match_id}</Link>
        {row.delta && (
          <span
            style={{ color: row.delta > 0 ? 'green' : 'red' }}
          >{` (${row.delta > 0 ? '+' : ''}${row.delta.toFixed(1)})`}</span>
        )}
      </>
    ),
  },
];

const Teams = (props: Props) => {
  useEffect(() => {
    props.dispatchTeams();
  }, []);
  const strings = useStrings();
  const { match, data, loading } = props;
  const route = match.params.teamId;

  if (route && Number.isInteger(Number(route))) {
    return <Team {...props} />;
  }

  return (
    <div>
      <Helmet title={strings.header_teams} />
      <Heading
        title={strings.heading_team_elo_rankings}
        subtitle={strings.subheading_team_elo_rankings}
        className="top-heading"
      />
      <Table
        columns={columns(strings)}
        data={data.slice(0, 500)}
        loading={loading}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.app.teams.data.filter(
    (team: TeamRow) =>
      team.last_match_time >
      new Date().getTime() / 1000 - 60 * 60 * 24 * 30 * 6,
  ),
  loading: state.app.teams.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchTeams: () => dispatch(getTeams()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
