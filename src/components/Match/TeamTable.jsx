import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isRadiant, getTeamName } from '../../utility';
import Heading from '../Heading';
import { IconRadiant, IconDire } from '../Icons';
import Table from '../Table';
import PicksBans from './Overview/PicksBans'; // Displayed only on `Overview` page

const keyFn = row => row && row.player_slot + 1;

const getHighlightFn = loggedInId => row => loggedInId && row.account_id === loggedInId;

const filterMatchPlayers = (players, team = '') =>
  players.filter(player =>
    ((team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === '')).sort((a, b) => a.player_slot - b.player_slot);

class TeamTable extends React.Component {
  static propTypes = {
    players: PropTypes.arrayOf({}),
    columns: PropTypes.arrayOf({}),
    heading: PropTypes.string,
    picksBans: PropTypes.arrayOf({}),
    radiantTeam: PropTypes.shape({}),
    direTeam: PropTypes.shape({}),
    summable: PropTypes.bool,
    hoverRowColumn: PropTypes.bool,
    loggedInId: PropTypes.number,
  };
  constructor() {
    super();
    this.state = {
      highlightedCol: undefined,
    };
    this.setHighlightedCol = this.setHighlightedCol.bind(this);
  }

  setHighlightedCol = colIndex => ({
    onMouseEnter: () => this.setState({
      highlightedCol: colIndex,
    }),
    onMouseLeave: () => this.setState({
      highlightedCol: undefined,
    }),
    className: this.state.highlightedCol === colIndex ? 'col_highlight' : undefined,
  })

  render() {
    const {
      players = [],
      columns,
      heading = '',
      picksBans = [],
      radiantTeam = {},
      direTeam = {},
      summable = false,
      hoverRowColumn = false,
      loggedInId,
    } = this.props;

    return (
      <div>
        <Heading
          title={`${getTeamName(radiantTeam, true)} - ${heading}`}
          icon={<IconRadiant />}
        />
        <Table data={filterMatchPlayers(players, 'radiant')} columns={columns} summable={summable} hoverRowColumn={hoverRowColumn} highlightFn={getHighlightFn(loggedInId)} keyFn={keyFn} setHighlightedCol={this.setHighlightedCol} />
        {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 0)} /> /* team 0 - radiant */}
        <Heading
          title={`${getTeamName(direTeam, false)} - ${heading}`}
          icon={<IconDire />}
        />
        <Table data={filterMatchPlayers(players, 'dire')} columns={columns} summable={summable} hoverRowColumn={hoverRowColumn} highlightFn={getHighlightFn(loggedInId)} keyFn={keyFn} setHighlightedCol={this.setHighlightedCol} />
        {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 1)} /> /* team 1 - dire */}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  loggedInId: state.app.metadata.data.user ? state.app.metadata.data.user.account_id : null,
});

export default connect(mapStateToProps)(TeamTable);
