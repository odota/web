import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  getTeam,
  getTeamHeroes,
  getTeamMatches,
  getTeamPlayers,
} from '../../actions';
import Spinner from '../Spinner/Spinner';
import TabBar from '../TabBar';
import teamPages from './teamPages';
import getTeamHeader from './TeamHeader';
import { Column } from './TeamStyled';

const getData = (props: TeamProps) => {
  const { teamId } = props.match.params;
  props.dispatchTeam(teamId);
  props.dispatchTeamMatches(teamId);
  props.dispatchTeamHeroes(teamId);
  props.dispatchTeamPlayers(teamId);
};

type TeamProps = {
  dispatchTeam: Function;
  dispatchTeamMatches: Function;
  dispatchTeamHeroes: Function;
  dispatchTeamPlayers: Function;
  generalData: {
    data: {
      team_id: number;
      rating: number;
      wins: number;
      losses: number;
      last_match_time: number;
      name: string;
      tag: string;
      logo_url: string;
    };
    loading: boolean;
    error: string;
  };
  matchData: {
    data: any[];
    loading: boolean;
    error: string;
  };
  heroData: {
    data: any[];
    loading: boolean;
    error: string;
  };
  playerData: {
    data: any[];
    loading: boolean;
    error: string;
  };
  match: {
    params: {
      teamId?: string;
      info?: string;
    };
  };
  strings: Strings;
};

class Team extends React.Component<TeamProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: TeamProps) {
    if (this.props.match.params.teamId !== prevProps.match.params.teamId) {
      getData(this.props);
    }
  }

  render() {
    const { strings } = this.props;
    const { teamId } = this.props.match.params;
    const info = this.props.match.params.info || 'overview';
    const page = teamPages(teamId, strings).find((_page) => _page.key === info);
    const teamName = this.props.generalData.data.name;
    const title = page ? `${teamName} - ${page.name}` : teamName;
    return (
      <div>
        <Helmet title={title} />
        <Column>
          {getTeamHeader(this.props.generalData, strings)}
          <TabBar tabs={teamPages(teamId, strings)} />
          {page ? (
            page.content(
              this.props.generalData,
              this.props.matchData,
              this.props.heroData,
              this.props.playerData,
            )
          ) : (
            <Spinner />
          )}
        </Column>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  generalData: state.app.team,
  heroData: state.app.teamHeroes,
  matchData: state.app.teamMatches,
  playerData: state.app.teamPlayers,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchTeam: (teamId: string) => dispatch(getTeam(teamId)),
  dispatchTeamHeroes: (teamId: string) => dispatch(getTeamHeroes(teamId)),
  dispatchTeamMatches: (teamId: string) => dispatch(getTeamMatches(teamId)),
  dispatchTeamPlayers: (teamId: string) => dispatch(getTeamPlayers(teamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
