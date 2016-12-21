import React from 'react';
import TeamTable from 'components/Match/TeamTable';
import { visionColumns } from 'components/Match/matchColumns';
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

export default VisionItems;
