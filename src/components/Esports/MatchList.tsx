import React, { useState } from "react";
import { Button } from "@mui/material";
import useStrings from "../../hooks/useStrings.hook";
import { groupMatchesBySeries, ProfessionalMatch } from "../Matches/series";
import { SeriesTeam } from "../Matches/Matches";
import SeriesAccordion from "./SeriesAccordion";

/** A chronological series accordion with complete groups and incremental paging. */
export default function MatchList({ games, teams }: { games: ProfessionalMatch[]; teams: SeriesTeam[] }) {
  const strings = useStrings();
  const [visible, setVisible] = useState(20);
  const ordered = groupMatchesBySeries(games);
  return <>
    {ordered.slice(0, visible).map((series) => (
      <SeriesAccordion key={series.key} series={series} teams={teams} showMetadata />
    ))}
    {visible < ordered.length && <Button onClick={() => setVisible((count) => count + 20)}>{strings.general_show} {Math.min(20, ordered.length - visible)} {strings.matches_series}</Button>}
  </>;
}
