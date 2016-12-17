import React from 'react';
import TeamTable from 'components/Match/TeamTable';
import { visionColumns } from 'components/Match/matchColumns';
import strings from 'lang';

const VisionItems = ({ match }) => {
  console.log(JSON.stringify(match.players[1], null, 2));
  return (
    <TeamTable
      players={match.players}
      heading={strings.heading_vision}
      columns={visionColumns}
      radiantTeam={match.radiant_team} direTeam={match.dire_team}
    />
  );
};

export default VisionItems;
