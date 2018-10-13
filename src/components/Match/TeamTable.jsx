import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isRadiant, getTeamName } from '../../utility';
import Heading from '../Heading';
import { IconRadiant, IconDire } from '../Icons';
import Table from '../Table';
import PicksBans from './Overview/PicksBans'; // Displayed only on `Overview` page

const Styled = styled.div`
  ${props => (props.customWidth ?
    ` table {
    width: ${props.customWidth}px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 0px !important;
    table-layout: fixed !important;
  }`
    : '')}
`;

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
    buttonLabel: PropTypes.string,
    buttonTo: PropTypes.string,
    buttonIcon: PropTypes.string,
    customWidth: PropTypes.number,
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
    } = this.props;

    return (
      <Styled customWidth={customWidth} innerRef={this.setTeamTableRef}>
        <Heading
          title={`${getTeamName(radiantTeam, true)} - ${heading}`}
          icon={<IconRadiant />}
          buttonLabel={buttonLabel || ''}
          buttonTo={buttonTo || ''}
          buttonIcon={buttonIcon || ''}
        />
        <Table data={filterMatchPlayers(players, 'radiant')} columns={columns} summable={summable} hoverRowColumn={hoverRowColumn} highlightFn={getHighlightFn(loggedInId)} keyFn={keyFn} />
        {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 0)} /> /* team 0 - radiant */}
        <Heading
          title={`${getTeamName(direTeam, false)} - ${heading}`}
          icon={<IconDire />}
        />
        <Table data={filterMatchPlayers(players, 'dire')} columns={columns} summable={summable} hoverRowColumn={hoverRowColumn} highlightFn={getHighlightFn(loggedInId)} keyFn={keyFn} />
        {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 1)} /> /* team 1 - dire */}
      </Styled>
    );
  }
}


const mapStateToProps = state => ({
  loggedInId: state.app.metadata.data.user ? state.app.metadata.data.user.account_id : null,
});

export default connect(mapStateToProps)(TeamTable);
