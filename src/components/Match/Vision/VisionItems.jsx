import React from 'react';
import PropTypes from 'prop-types';
import TeamTable from '../Match/TeamTable';
import { visionColumns } from '../Match/matchColumns';
import strings from 'lang';

const VisionItems = ({ match }) => (
  <TeamTable
    players={match.players}
    heading={strings.heading_vision}
    columns={visionColumns}
    radiantTeam={match.radiant_team}
    direTeam={match.dire_team}
  />
);

VisionItems.propTypes = {
  match: PropTypes.shape({}),
};

export default VisionItems;
