import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import { getOrdinal, getTeamLogoUrl, fromNow, subTextStyle } from '../../utility';
import { getTeams } from '../../actions';
import Heading from '../Heading';
import Team from '../Team';
import Table, { TableLink } from '../Table';
import { Logo } from '../Team/TeamStyled';

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

const columns = strings => [{
  displayName: strings.th_rank,
  displayFn: (row, col, field, index) => getOrdinal(index + 1),
},
{
  displayName: strings.th_name,
  field: 'name',
  displayFn: (row, col, field) => (
    <TeamImageContainer>
      <Logo
        src={getTeamLogoUrl(row.logo_url)}
        alt=""
      />
      <div>
        <TableLink to={`/teams/${row.team_id}`}>{field}</TableLink>
        <span style={{ ...subTextStyle, display: 'block', marginTop: 1 }}>
          {fromNow(row.last_match_time)}
        </span>
      </div>
    </TeamImageContainer>),
}, {
  displayName: strings.th_rating,
  field: 'rating',
  sortFn: true,
  relativeBars: true,
  displayFn: (row, col, field) => Math.floor(field),
}, {
  displayName: strings.th_wins,
  field: 'wins',
  sortFn: true,
  relativeBars: true,
}, {
  displayName: strings.th_losses,
  field: 'losses',
  sortFn: true,
  relativeBars: true,
}];

class RequestLayer extends React.Component {
  static propTypes = {
    dispatchTeams: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    match: PropTypes.shape({
      params: PropTypes.shape({
        teamId: PropTypes.string,
      }),
    }),
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    this.props.dispatchTeams();
  }
  render() {
    const { strings } = this.props;
    const route = this.props.match.params.teamId;

    if (Number.isInteger(Number(route))) {
      return <Team {...this.props} />;
    }
    const { loading } = this.props;
    return (
      <div>
        <Helmet title={strings.header_teams} />
        <div style={{ textAlign: 'center' }}>
          {process.env.REACT_APP_ENABLE_RIVALRY && <FlatButton
            label={strings.app_rivalry}
            icon={<img src="/assets/images/rivalry-icon.png" alt="" height="24px" />}
            href="https://rivalry.com/opendota"
            target="_blank"
            rel="noopener noreferrer"
          />}
        </div>
        <Heading title={strings.heading_team_elo_rankings} subtitle={strings.subheading_team_elo_rankings} />
        <Table columns={columns(strings)} data={this.props.data.slice(0, 100)} loading={loading} />
      </div>);
  }
}

const mapStateToProps = state => ({
  data: state.app.teams.data.filter(team => team.last_match_time > ((new Date() / 1000) - (60 * 60 * 24 * 30 * 6))),
  loading: state.app.teams.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  dispatchTeams: () => dispatch(getTeams()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
