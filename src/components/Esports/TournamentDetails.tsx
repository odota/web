/**
 * @file TournamentDetails.tsx
 * @description Displays tournament identity, available artwork, tier, recorded match dates, and participating teams.
 * @remarks Recorded match dates describe available history rather than the official tournament schedule.
 */

import React, { useState } from "react";
import styled from "styled-components";
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
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 24px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid color-mix(in srgb, ${constants.secondarySurfaceColor} 60%, #6299ba);
  border-radius: 6px;
  background: linear-gradient(120deg, color-mix(in srgb, ${constants.secondarySurfaceColor} 65%, #17395c), color-mix(in srgb, ${constants.secondarySurfaceColor} 80%, #17395c));
  font-family: ${constants.fontFamilyFuturistic};
  .tournament-art {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    min-height: 160px;
    padding: 16px;
    border: 1px solid color-mix(in srgb, ${constants.secondarySurfaceColor} 60%, #6299ba);
    border-radius: 4px;
    background: color-mix(in srgb, ${constants.primarySurfaceColor} 85%, #38596d);
    color: ${constants.textColorSecondary};
    font-size: 12px;
    text-align: center;
    img { width: 100%; max-height: 180px; object-fit: contain; }
    svg { width: 48px; height: 48px; color: ${constants.colorGolden}; }
  }
  .tournament-info { min-width: 0; }
  h2 { margin: 0 0 10px; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.2; overflow-wrap: anywhere; }
  dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 20px 0 0; padding-top: 18px; border-top: 0; }
  dl > div { min-width: 0; }
  dt { color: ${constants.textColorSecondary}; font-size: 11px; line-height: 1.5; margin-bottom: 6px; }
  dd { margin: 0; overflow-wrap: anywhere; color: ${constants.textColorPrimary}; font-size: 14px; font-variant-numeric: tabular-nums; }
  dd svg { width: 15px; height: 15px; vertical-align: middle; margin-right: 6px; color: ${constants.colorBlue}; }
  .league-id { color: ${constants.colorGolden}; }
  @media (max-width: ${constants.wrapMobile}) {
    padding: 18px;
    grid-template-columns: 88px minmax(0, 1fr);
    gap: 16px;
    .tournament-art { min-height: 100px; padding: 10px; align-self: start; }
    .tournament-art svg { width: 32px; height: 32px; }
    dl { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  }
  @media (max-width: 420px) { grid-template-columns: minmax(0, 1fr); .tournament-art { max-width: 140px; } }

`;

/**
 * Displays wrapping team profile links with logos.
 * @example
 * <Participants>{teamProfileLinks}</Participants>
 */
const Participants = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 190px), 1fr));
  gap: 10px;
  margin-bottom: 24px;
  font-family: ${constants.fontFamilyFuturistic};
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    min-width: 0;
    border: 1px solid color-mix(in srgb, ${constants.secondarySurfaceColor} 60%, #6299ba);
    border-radius: 4px;
    background: color-mix(in srgb, ${constants.secondarySurfaceColor} 75%, #17395c);
    color: ${constants.textColorPrimary};
    font-size: 13px;
    transition: background .15s, border-color .15s;
    &:hover { background: color-mix(in srgb, ${constants.secondarySurfaceColor} 65%, #244d75); border-color: ${constants.colorBlue}; }
    &:focus-visible { outline: 2px solid ${constants.colorBlue}; outline-offset: 3px; }
    span { overflow-wrap: anywhere; }
  }
  img, svg { width: 30px; height: 30px; flex-shrink: 0; object-fit: contain; }

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
          {image && failedImage !== image ? <img src={image} alt={league.name} onError={() => setFailedImage(image)} /> : <img src="/assets/tournament-placeholder.svg" alt={strings.esports_no_artwork} />}
        </div>
        <div className="tournament-info">
          <h2>{league.name}</h2>
          {tier}
          <dl>
            <div><dt>{strings.th_league}</dt><dd className="league-id">#{league.leagueid}</dd></div>
            {historyReady && dates.length > 0 && <>
              <div><dt>{strings.esports_first_recorded_match}</dt><dd><CalendarMonthIcon aria-hidden="true" />{date(Math.min(...dates))}</dd></div>
              <div><dt>{strings.esports_last_recorded_match}</dt><dd><CalendarMonthIcon aria-hidden="true" />{date(Math.max(...dates))}</dd></div>
            </>}
          </dl>
        </div>
      </Details>
      {historyReady && participants.size > 0 && <>
        <h2 style={{ marginBottom: 14, fontFamily: constants.fontFamilyFuturistic, fontSize: 16 }}>{strings.esports_participating_teams}</h2>
        <Participants>{Array.from(participants, ([id, team]) => <Link key={id} to={`/teams/${id}`}><TeamLogo teamId={id} src={team.logo_url} /><span>{team.name}</span></Link>)}</Participants>
      </>}
    </>
  );
}
