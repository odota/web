import React from "react";
import TeamTable from "../TeamTable";
import mcs from "../matchColumns";
import useStrings from "../../../hooks/useStrings.hook";

const VisionItems = ({ match }: { match: Match }) => {
  const strings = useStrings();
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

export default VisionItems;
