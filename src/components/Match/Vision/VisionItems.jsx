import React from 'react';
import PropTypes from 'prop-types';
import TeamTable from '../TeamTable';
import { visionColumns } from '../matchColumns';

const VisionItems = ({ match, strings }) => (
  <TeamTable
    players={match.players}
    heading={strings.heading_vision}
    columns={visionColumns(strings)}
    radiantTeam={match.radiant_team}
    direTeam={match.dire_team}
  />
);

VisionItems.propTypes = {
  match: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

export default VisionItems;
