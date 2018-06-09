import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getTeam, getTeamHeroes, getTeamMatches, getTeamPlayers } from '../../actions';
import Spinner from '../Spinner';
import TabBar from '../TabBar';
import teamPages from './teamPages';
import getTeamHeader from './TeamHeader';
import { Column } from './TeamStyled';

const getData = (props) => {
  const { teamId } = props.match.params;
  props.dispatchTeam(teamId);
  props.dispatchTeamMatches(teamId);
  props.dispatchTeamHeroes(teamId);
  props.dispatchTeamPlayers(teamId);
};

class Team extends React.Component {
  static propTypes = {
    generalData: PropTypes.shape({
      data: PropTypes.shape({
        team_id: PropTypes.number,
        rating: PropTypes.number,
        wins: PropTypes.number,
        losses: PropTypes.number,
        last_match_time: PropTypes.number,
        name: PropTypes.string,
        tag: PropTypes.string,
        logo_url: PropTypes.string,
      }),
      loading: PropTypes.bool,
      error: PropTypes.string,
    }),
    matchData: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      loading: PropTypes.bool,
      error: PropTypes.string,
    }),
    heroData: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      loading: PropTypes.bool,
      error: PropTypes.string,
    }),
    playerData: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      loading: PropTypes.bool,
      error: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        teamId: PropTypes.string,
        info: PropTypes.string,
      }),
    }),
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.teamId !== prevProps.match.params.teamId) {
      getData(this.props);
    }
  }

  render() {
    const { strings } = this.props;
    const { teamId } = this.props.match.params;
    const info = this.props.match.params.info || 'overview';
    const page = teamPages(teamId, strings).find(_page => _page.key === info);
    const teamName = this.props.generalData.data.name;
    const title = page ? `${teamName} - ${page.name}` : teamName;
    return (
      <div>
        <Helmet title={title} />
        <Column>
          {getTeamHeader(this.props.generalData, strings)}
          <TabBar info={info} tabs={teamPages(teamId, strings)} />
          {page ? page.content(this.props.generalData, this.props.matchData, this.props.heroData, this.props.playerData) : <Spinner />}
        </Column>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  generalData: state.app.team,
  heroData: state.app.teamHeroes,
  matchData: state.app.teamMatches,
  playerData: state.app.teamPlayers,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  dispatchTeam: teamId => dispatch(getTeam(teamId)),
  dispatchTeamHeroes: teamId => dispatch(getTeamHeroes(teamId)),
  dispatchTeamMatches: teamId => dispatch(getTeamMatches(teamId)),
  dispatchTeamPlayers: teamId => dispatch(getTeamPlayers(teamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
