import React from "react";
import { Link } from "react-router-dom";
import BoltIcon from "@mui/icons-material/Bolt";
import StyleIcon from "@mui/icons-material/Style";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { displayHeroId, formatSeconds, isRadiant, rankTierToString } from "../../../../utility";
import playerMatchesColumns from "../Matches/playerMatchesColumns";

type RecentMatch = Match & Pick<MatchPlayer, "player_slot" | "kills" | "deaths" | "assists"> & { average_rank?: number };

export default (strings: Strings) => {
  const columns = playerMatchesColumns(strings, false);

  return [
    {
      ...columns[0],
      displayFn: (match: RecentMatch) => {
        const hero = displayHeroId(match, columns[0]);
        return React.cloneElement(hero, {
          subtitle: null,
        });
      },
    },
    {
      ...columns[1],
      displayFn: (match: RecentMatch) => {
        const rank = match.average_rank;
        const medal = rank && Number.isFinite(rank)
          ? Math.floor(rank / 10)
          : 0;
        const validMedal = medal >= 1 && medal <= 8 ? medal : 0;
        const hasResult = typeof match.radiant_win === "boolean";
        const won = match.radiant_win === isRadiant(match.player_slot);
        return (
          <div className="recent-result">
            <Link
              to={`/matches/${match.match_id}`}
              className={`result-badge ${hasResult ? (won ? "win" : "loss") : "unknown"}`}
            >
              {hasResult
                ? won ? strings.td_win : strings.td_loss
                : strings.td_no_result}
            </Link>
            <span className="rank-label">
              <img
                src={`/assets/images/dota2/rank_icons/rank_icon_${validMedal}.png`}
                alt=""
              />
              {validMedal ? (
                <span className="rank-description">
                  <span>{rankTierToString(rank!).replace(/\s*\[\d+\]$/, "")}</span>
                  {validMedal < 8 && rank! % 10 >= 1 && rank! % 10 <= 5 && (
                    <span className="rank-stars" aria-label={`${rank! % 10} stars`}>
                      {rank! % 10}
                    </span>
                  )}
                </span>
              ) : strings.general_unknown}
            </span>
          </div>
        );
      },
    },
    {
      ...columns[2],
      displayFn: (match: RecentMatch) => {
        const ModeIcon = match.game_mode === 23 ? BoltIcon
          : match.game_mode === 22 ? StyleIcon
          : match.game_mode === 2 ? EmojiEventsIcon
          : SportsEsportsIcon;

        return (
          <div className="recent-mode">
            <span className="mode-label">
              <ModeIcon aria-hidden="true" />
              {strings[`game_mode_${match.game_mode}` as keyof Strings] || strings.general_unknown}
            </span>

          </div>
        );
      },
    },
    {
      ...columns[3],
      displayFn: (match: RecentMatch) => (
        <div className="duration-details">
          <span className="duration-value">
            <AccessTimeIcon aria-hidden="true" />
            {formatSeconds(match.duration)}
          </span>

        </div>
      ),
    },
    {
      displayName: "K / D / A",
      tooltip: `${strings.th_kills} / ${strings.th_deaths} / ${strings.th_assists}`,
      field: "kills",
      sortFn: true,
      displayFn: (match: RecentMatch) => (
        <span
          className="recent-kda"
          aria-label={`${strings.th_kills}: ${match.kills ?? "—"}, ${strings.th_deaths}: ${match.deaths ?? "—"}, ${strings.th_assists}: ${match.assists ?? "—"}`}
        >
          <span className="kills">{match.kills ?? "—"}</span>
          <span className="separator">/</span>
          <span className="deaths">{match.deaths ?? "—"}</span>
          <span className="separator">/</span>
          <span className="assists">{match.assists ?? "—"}</span>
        </span>
      ),
    },
  ];
};
