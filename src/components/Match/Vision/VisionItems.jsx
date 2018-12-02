import React from 'react';
import PropTypes from 'prop-types';
import TeamTable from '../TeamTable';
import mcs from '../matchColumns';

const VisionItems = ({ match, strings }) => {
  const { visionColumns } = mcs(strings);
  return (
    <TeamTable
      players={match.players}
      heading={strings.heading_vision}
      columns={visionColumns(strings)}
      radiantTeam={match.radiant_team}
      direTeam={match.dire_team}
      radiantWin={match.radiant_win}
    />
  );
};

VisionItems.propTypes = {
  match: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

export default VisionItems;
