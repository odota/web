/**
 * @file TournamentDetails.tsx
 * @description Displays tournament identity, available artwork, tier, recorded match dates, and participating teams.
 * @remarks Recorded match dates describe available history rather than the official tournament schedule.
 */

import React, { useState } from "react";
import styled from "styled-components";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import useStrings from "../../hooks/useStrings.hook";
import constants from "../constants";
import TeamLogo from "../TeamLogo/TeamLogo";
import { Link } from "react-router-dom";
import { ProfessionalMatch } from "../Matches/series";

/**
 * Arranges tournament artwork and metadata in a responsive identity panel.
 * @example
 * <Details><div className="tournament-art">{artwork}</div>{metadata}</Details>
 */
const Details = styled.div`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  .tournament-art {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    min-height: 140px;
    border: 1px solid rgba(100, 160, 210, 0.25);
    border-radius: 4px;
    background: rgba(100, 160, 210, 0.1);
    color: ${constants.textColorSecondary};
    text-align: center;
    img { width: 100%; max-height: 180px; object-fit: contain; }
    svg { width: 48px; height: 48px; color: ${constants.colorGolden}; }
  }
  h2 { margin-bottom: 12px; }
  dl { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 8px 16px; margin: 12px 0; }
  dt { color: ${constants.textColorSecondary}; }
  dd { margin: 0; overflow-wrap: anywhere; }
  dd svg { width: 14px; height: 14px; vertical-align: middle; margin-right: 6px; color: ${constants.colorBlue}; }
  @media (max-width: ${constants.wrapMobile}) { grid-template-columns: minmax(0, 1fr); }
`;

/**
 * Displays wrapping team profile links with logos.
 * @example
 * <Participants>{teamProfileLinks}</Participants>
 */
const Participants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  a { display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1px solid ${constants.dividerColor}; border-radius: 3px; }
  img, svg { width: 24px; height: 24px; object-fit: contain; }
`;

type Tournament = { leagueid: number; name: string; banner?: string | null; ticket?: string | null };
type Team = { team_id: number; name: string; logo_url: string };

/**
 * Tournament identity and match-history coverage shown in the details panel.
 * @example
 * const props: TournamentDetailsProps = {
 *   league: { leagueid: 19719, name: "The International 2026" },
 *   tier: "Professional", games: [], teams: [], historyReady: false,
 * };
 */
export type TournamentDetailsProps = {
  /** Tournament identity and optional artwork sources. */
  league: Tournament;
  /** Localized text or badge representing the tournament tier. */
  tier: React.ReactNode;
  /** Recorded matches used to derive dates and participants. */
  games: ProfessionalMatch[];
  /** Team metadata used to resolve participant names and logos. */
  teams: Team[];
  /** True after match history loads successfully. */
  historyReady: boolean;
};

/**
 * Displays tournament identity and the coverage available in its recorded history.
 * @param props Tournament metadata and match history.
 * @param props.league Tournament name, ID, and optional artwork sources.
 * @param props.tier Localized tier badge to display.
 * @param props.games Match history used to derive dates and participating teams.
 * @param props.teams Team metadata used to resolve names and logos.
 * @param props.historyReady Whether match history has loaded successfully.
 * @returns Tournament artwork, metadata, and available participant links.
 * @example
 * <TournamentDetails
 *   league={{ leagueid: 19719, name: "The International 2026" }}
 *   tier={<span>Professional</span>}
 *   games={leagueMatches}
 *   teams={teams}
 *   historyReady={true}
 * />
 */
export default function TournamentDetails({ league, tier, games, teams, historyReady }: TournamentDetailsProps) {
  const strings = useStrings();
  const [failedImage, setFailedImage] = useState("");
  // Historical banner values can be asset identifiers rather than public URLs.
  const image = [league.banner, league.ticket].find((value) => value && /^https?:\/\//.test(value)) || "";
  const dates = games.map((game) => game.start_time);
  /**
   * Formats a recorded match timestamp in the viewer’s locale.
   * @param value Unix timestamp in seconds.
   * @returns A localized calendar date including the year.
   * @example
   * date(new Date(2026, 9, 21, 12).getTime() / 1000);
   * // "Oct 21, 2026" in an en-US locale.
   */
  const date = (value: number) => new Date(value * 1000).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const participants = new Map<number, { name: string; logo_url: string }>();
  games.forEach((game) => {
    for (const [id, name] of [[game.radiant_team_id, game.radiant_name], [game.dire_team_id, game.dire_name]] as const) {
      if (!id || participants.has(id)) continue;
      const team = teams.find((item) => item.team_id === id);
      participants.set(id, { name: name || team?.name || strings.general_unknown, logo_url: team?.logo_url || "" });
    }
  });

  return (
    <>
      <Details>
        <div className="tournament-art">
          {image && failedImage !== image ? <img src={image} alt={league.name} onError={() => setFailedImage(image)} /> : <><EmojiEventsIcon aria-hidden="true" /><span>{strings.esports_no_artwork}</span></>}
        </div>
        <div>
          <h2>{league.name}</h2>
          {tier}
          <dl>
            <dt>{strings.th_league}</dt><dd>{league.leagueid}</dd>
            {historyReady && dates.length > 0 && <>
              <dt>{strings.esports_first_recorded_match}</dt><dd><CalendarMonthIcon aria-hidden="true" />{date(Math.min(...dates))}</dd>
              <dt>{strings.esports_last_recorded_match}</dt><dd><CalendarMonthIcon aria-hidden="true" />{date(Math.max(...dates))}</dd>
            </>}
          </dl>
        </div>
      </Details>
      {historyReady && participants.size > 0 && <>
        <h2 style={{ marginBottom: 12 }}>{strings.esports_participating_teams}</h2>
        <Participants>{Array.from(participants, ([id, team]) => <Link key={id} to={`/teams/${id}`}><TeamLogo teamId={id} src={team.logo_url} />{team.name}</Link>)}</Participants>
      </>}
    </>
  );
}
