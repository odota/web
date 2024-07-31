import React from 'react';
import Helmet from 'react-helmet';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { getOrdinal, getTeamLogoUrl, fromNow, subTextStyle } from '../../utility';
import { getTeams } from '../../actions';
import Heading from '../Heading';
import Team from '../Team';
import Table, { TableLink } from '../Table';
import { Logo } from '../Team/TeamStyled';
import config from '../../config';

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

interface Strings {
  th_rank: string;
  th_name: string;
  th_rating: string;
  th_wins: string;
  th_losses: string;
  header_teams: string;
  app_rivalry: string;
  heading_team_elo_rankings: string;
  subheading_team_elo_rankings: string;
}

interface RequestLayerProps {
  dispatchTeams: () => void;
  data: TeamRow[];
  loading: boolean;
  match: {
    params: {
      teamId?: string;
    };
  };
  strings: Strings;
}

const columns = (strings: Strings) => [
  {
    displayName: strings.th_rank,
    displayFn: (row: TeamRow, col: number, field: any, index: number) => getOrdinal(index + 1),
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
          <span style={{ display: "block", marginTop: 1 }}>
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
];

class RequestLayer extends React.Component<RequestLayerProps> {
  componentDidMount() {
    this.props.dispatchTeams();
  }

  render() {
    const { strings, match, data, loading } = this.props;
    const route = match.params.teamId;

    if (route && Number.isInteger(Number(route))) {
      return <Team {...this.props} />;
    }

    return (
      <div>
        <Helmet title={strings.header_teams} />
        <div style={{ textAlign: 'center' }}>
          {config.VITE_ENABLE_RIVALRY && (
            <Button
              variant="contained"
              color="primary"
              href="https://rivalry.com/opendota"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<img src="/assets/images/rivalry-icon.png" alt="" height="24px" />}
            >
              {strings.app_rivalry}
            </Button>
          )}
        </div>
        <Heading title={strings.heading_team_elo_rankings} subtitle={strings.subheading_team_elo_rankings} className="top-heading" />
        <Table columns={columns(strings)} data={data.slice(0, 100)} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.teams.data.filter((team: TeamRow) => team.last_match_time > ((new Date().getTime() / 1000) - (60 * 60 * 24 * 30 * 6))),
  loading: state.app.teams.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchTeams: () => dispatch(getTeams()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(RequestLayer);