import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isRadiant, getTeamName } from '../../utility';
import Heading from '../Heading';
import { IconRadiant, IconDire } from '../Icons';
import Table from '../Table';
import PicksBans from './Overview/PicksBans'; // Displayed only on `Overview` page

const StyledDiv = styled.div`
  table {
    &.teamtable-radiant thead tr {
      background: radial-gradient(150% 100% at -115% 20%, rgb(52, 95, 61) 2%, rgba(66, 6, 6, 0) 100%);
      background-repeat: no-repeat;
    }
    &.teamtable-dire thead tr {
      background: radial-gradient(150% 100% at -115% 20%, rgb(95,54,52) 2%, rgba(66, 6, 6, 0) 100%);
      background-repeat: no-repeat;
    }
  }
`;

const isBestValueInMatch = players => (field, row, underline) => {
  const values = players.map(player => player[field]);
  const bestValue = underline === 'max' ? Math.max(...values) : Math.min(...values);

  return bestValue === row[field];
};

const keyFn = row => row && row.player_slot + 1;

const getHighlightFn = loggedInId => (row) => {
  const s = { style: {} };
  if (loggedInId && row.account_id === loggedInId) {
    if (row.player_slot < 5) {
      s.style.backgroundColor = 'rgba(18, 156, 40, 0.09)';
    } else {
      s.style.backgroundColor = 'rgba(156, 18, 18, 0.09)';
    }
  }
  return s;
};

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
    buttonLabel: PropTypes.string,
    buttonTo: PropTypes.string,
    buttonIcon: PropTypes.string,
    customWidth: PropTypes.number,
    radiantWin: PropTypes.bool,
    overflowAuto: PropTypes.bool,
  };
  constructor() {
    super();
    this.teamTableRef = null;
  }

  componentDidMount() {
    this.addListeners();
  }

  componentDidUpdate() {
    this.addListeners();
  }

  setTeamTableRef = (node) => {
    this.teamTableRef = node;
  }

  addListeners() {
    const tableCells = this.teamTableRef.querySelectorAll('td:not(.no-col-hover), th:not(.no-col-hover)');

    for (let i = 0; i < tableCells.length; i += 1) {
      tableCells[i].onmouseenter = () => {
        const { cellIndex } = tableCells[i];
        const rowCells = this.teamTableRef.querySelectorAll(`td:nth-child(${cellIndex + 1}), th:nth-child(${cellIndex + 1})`);
        for (let j = 0; j < rowCells.length; j += 1) {
          rowCells[j].classList.add('col_highlight');
        }
      };

      tableCells[i].onmouseleave = () => {
        const { cellIndex } = tableCells[i];
        const rowCells = this.teamTableRef.querySelectorAll(`td:nth-child(${cellIndex + 1}), th:nth-child(${cellIndex + 1})`);
        for (let j = 0; j < rowCells.length; j += 1) {
          rowCells[j].classList.remove('col_highlight');
        }
      };
    }
  }

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
      buttonLabel,
      buttonTo,
      buttonIcon,
      customWidth,
      radiantWin,
      overflowAuto,
    } = this.props;

    const tableProps = {
      columns,
      summable,
      hoverRowColumn,
      highlightFn: getHighlightFn(loggedInId),
      keyFn,
      customWidth,
      isBestValueInMatch: isBestValueInMatch(players),
      overflowAuto,
    };

    return (
      <StyledDiv ref={this.setTeamTableRef} >
        <Heading
          title={`${getTeamName(radiantTeam, true)} - ${heading}`}
          icon={<IconRadiant />}
          buttonLabel={buttonLabel || ''}
          buttonTo={buttonTo || ''}
          buttonIcon={buttonIcon || ''}
          winner={radiantWin}
        />
        <Table data={filterMatchPlayers(players, 'radiant')} {...tableProps} className="teamtable-radiant" />
        {picksBans && picksBans.length > 0 && <PicksBans data={picksBans.filter(pb => pb.team === 0)} style={{ marginBottom: -25 }} /> /* team 0 - radiant */}
        <Heading
          title={`${getTeamName(direTeam, false)} - ${heading}`}
          icon={<IconDire />}
          winner={!radiantWin}
        />
        <Table data={filterMatchPlayers(players, 'dire')} {...tableProps} className="teamtable-dire" />
        {picksBans && picksBans.length > 0 && <PicksBans data={picksBans.filter(pb => pb.team === 1)} /> /* team 1 - dire */}
      </StyledDiv>
    );
  }
}


const mapStateToProps = state => ({
  loggedInId: state.app.metadata.data.user ? state.app.metadata.data.user.account_id : null,
});

export default connect(mapStateToProps)(TeamTable);
