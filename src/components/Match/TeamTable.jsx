import React from 'react';
import PropTypes from 'prop-types';
import { isRadiant, getTeamName } from 'utility';
import Heading from 'components/Heading';
import { IconRadiant, IconDire } from 'components/Icons';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Table from 'components/Table';
import PicksBans from './Overview/PicksBans'; // Displayed only on `Overview` page

const StyledDiv = styled.div`
${props => (props.user !== undefined ? `
#${isRadiant(props.user.player_slot) ? 'radiant' : 'dire'} {
  table {
    & tbody {
      & tr {
        &:nth-child(${props.user.player_slot + 1 - (!isRadiant(props.user.player_slot) * 128)}) {
          background-color: rgba(0, 60, 180, 0.03);
        }
      }
    }
  }
}
` : '')}
`;

const filterMatchPlayers = (players, team = '') =>
  players.filter(player =>
    ((team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === '')).sort((a, b) => a.player_slot - b.player_slot);

const TeamTable = ({
  players = [],
  columns,
  heading = '',
  picksBans = [],
  radiantTeam = {},
  direTeam = {},
  summable = false,
  hoverRowColumn = false,
  loggedInId,
}) => {
  const user = players.find(player => player.account_id === loggedInId);

  console.log(user && user.player_slot);
  return (
    <StyledDiv user={user}>
      <Heading
        title={`${getTeamName(radiantTeam, true)} - ${heading}`}
        icon={<IconRadiant />}
      />
      <span id="radiant">
        <Table data={filterMatchPlayers(players, 'radiant')} columns={columns} summable={summable} hoverRowColumn={hoverRowColumn} />
      </span >
      {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 0)} /> /* team 0 - radiant */}
      <Heading
        title={`${getTeamName(direTeam, false)} - ${heading}`}
        icon={<IconDire />}
      />
      <span id="dire">
        <Table data={filterMatchPlayers(players, 'dire')} columns={columns} summable={summable} hoverRowColumn={hoverRowColumn} />
      </span>
      {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 1)} /> /* team 1 - dire */}
    </StyledDiv>
  );
};

TeamTable.propTypes = {
  players: PropTypes.arrayOf({}),
  columns: PropTypes.arrayOf({}),
  heading: PropTypes.string,
  picksBans: PropTypes.arrayOf({}),
  radiantTeam: PropTypes.shape({}),
  direTeam: PropTypes.shape({}),
  summable: PropTypes.bool,
  hoverRowColumn: PropTypes.bool,
};

const mapStateToProps = state => ({
  loggedInId: state.app.metadata.data.user ? state.app.metadata.data.user.account_id : null,
});

export default connect(mapStateToProps)(TeamTable);
