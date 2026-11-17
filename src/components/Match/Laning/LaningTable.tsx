import React from "react";
import { Tooltip } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { heroes } from "dotaconstants";
import { Link } from "react-router-dom";
import config from "../../../config";
import constants from "../../constants";
import useStrings from "../../../hooks/useStrings.hook";
import { getPlayerIdentity, getPlayerRoles, getRoleLabels, getStatAtMinute, getLevelAtMinute, formatStat } from "./laning.utils";
import TooltipMetricIcon from "../../Visualizations/Graph/TooltipMetricIcon";
import { SummaryTeam, laningBorderColor } from "./StyledLaning";
import styles from "./LaningTable.module.css";

type LaningPlayer = MatchPlayer & { lane_role?: number; line_win?: boolean };

const roleIconPositions = { carry: 0, midlane: 25, offlane: 50, softSupport: 75, hardSupport: 100 };

const roleTooltipSlots = {
  tooltip: {
    sx: {
      backgroundColor: constants.primarySurfaceColor,
      color: constants.textColorPrimary,
      border: `1px solid ${laningBorderColor}`,
      borderRadius: "8px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      padding: "8px 12px",
      fontFamily: constants.fontFamilyFuturistic,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
  arrow: {
    sx: {
      color: constants.primarySurfaceColor,
      "&::before": { border: `1px solid ${laningBorderColor}` },
    },
  },
};

export const TeamTable: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => (
  <section className={`${styles.teamTable}${className ? ` ${className}` : ""}`} {...props} />
);

/** Team-separated laning scoreboards, using recorded minute-ten statistics. */
const LaningTable = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const roles = getPlayerRoles(match.players);
  const roleLabels = getRoleLabels(strings);
  const metrics = [
    { label: strings.heading_level, color: "level", value: (p: MatchPlayer) => getLevelAtMinute(p) },
    { label: "Experience (XP)", color: "xp", value: (p: MatchPlayer) => getStatAtMinute(p, "xp_t") },
    { label: "Net Worth (NW)", color: "gold", value: (p: MatchPlayer) => getStatAtMinute(p, "gold_t") },
  ];
  const maxValues = metrics.map(({ value }) => Math.max(1, ...match.players.map((p) => value(p) ?? 0)));
  const total = (players: MatchPlayer[], value: (p: MatchPlayer) => number | null) => {
    const values = players.map(value);
    return values.length && values.every((v) => v !== null) ? values.reduce<number>((sum, v) => sum + v!, 0) : null;
  };
  const heroIcon = (p: MatchPlayer, ally: boolean) => {
    const hero = heroes[p.hero_id];
    return hero && <img key={p.player_slot} className={ally ? "ally" : "enemy"} src={config.VITE_IMAGE_CDN + hero.icon} title={hero.localized_name} alt={hero.localized_name} width={24} height={24} />;
  };
  return <>{[true, false].map((radiant) => {
    const players = (match.players as LaningPlayer[]).filter((p) => p.isRadiant === radiant).sort((a, b) => b.lane - a.lane);
    return <TeamTable className="laning-phase-table" key={String(radiant)}>
      <div className="team-heading"><h3><SummaryTeam $radiant={radiant}>{radiant ? strings.general_radiant : strings.general_dire}</SummaryTeam></h3>
      </div>
      <div className="table-scroll"><table>
        <thead>
          <tr><th className="player">{strings.th_players}</th><th className="role-cell">{strings.laning_role}</th><th>{strings.th_lane}</th><th className="heroes-cell">{strings.th_heroes}</th><th><Tooltip title="Full-match kills / deaths / assists" arrow slotProps={roleTooltipSlots}><span>KDA</span></Tooltip></th><th className="level">{strings.heading_level}</th>{metrics.slice(1).map((m) => <th className={m.color} key={m.label}>{m.label}</th>)}</tr>
        </thead>
        <tbody>{players.map((player) => {
          const hero = heroes[player.hero_id];
          const identity = getPlayerIdentity(player, strings);
          const role = roles.get(player.player_slot);
          const lanePlayers = [1, 2, 3].includes(player.lane) ? match.players.filter((p) => p.lane === player.lane) : [];
          const renderMetric = (metric: typeof metrics[number], index: number) => {
              const value = metric.value(player);
              return <td className={`stat ${metric.color}`} key={metric.label}>{metric.color === "level" ? <span className="level-value">{formatStat(value)}<TooltipMetricIcon metric="xp" />{value !== null && value >= 6 && <Tooltip title="Ultimate" arrow placement="top" slotProps={roleTooltipSlots}><span style={{ display: "inline-flex" }} tabIndex={0}><AutoAwesomeIcon className="ultimate-icon" titleAccess="Ultimate" /></span></Tooltip>}</span> : <>{formatStat(value)}<TooltipMetricIcon metric={metric.color} /></>}{value !== null && metric.color !== "level" && <span className="bar"><span style={{ width: `${Math.min(100, Math.max(0, value / maxValues[index] * 100))}%` }} /></span>}</td>;
          };
          return <tr key={player.player_slot}>
            <td className="player"><span className="player-identity">{hero && <img className="portrait" src={config.VITE_IMAGE_CDN + hero.img} alt={identity.heroName} title={identity.heroName} width={48} height={27} />}{player.account_id ? <Link to={`/players/${player.account_id}`}>{identity.playerName}</Link> : identity.playerName}</span></td>
            <td className="role-cell">{role ? <span className="role-label"><Tooltip title={roleLabels[role]} arrow placement="top" enterDelay={150} slotProps={roleTooltipSlots}><span className="role-icon" role="img" aria-label={roleLabels[role]} tabIndex={0} style={{ backgroundPosition: `${roleIconPositions[role]}% center` }} /></Tooltip><span className="role-name">{roleLabels[role]}</span></span> : strings.laning_unknown_role}</td>
            <td className="lane-cell">{player.line_win && <small className="lane-won">{strings.laning_won}</small>}{strings[`lane_role_${player.lane_role}` as keyof Strings] ?? strings.laning_unknown_lane}{player.is_roaming && <small>{strings.roaming}</small>}</td>
            <td className="heroes-cell"><div className="matchup">{lanePlayers.filter((p) => p.isRadiant === radiant).map((p) => heroIcon(p, true))}{lanePlayers.length > 0 && <span>vs</span>}{lanePlayers.filter((p) => p.isRadiant !== radiant).map((p) => heroIcon(p, false))}</div></td>
            <td className="kda">{formatStat(player.kills)} / {formatStat(player.deaths)} / {formatStat(player.assists)}</td>
            {renderMetric(metrics[0], 0)}
            {metrics.slice(1).map((metric, index) => renderMetric(metric, index + 1))}

          </tr>;
        })}</tbody>
        <tfoot><tr><td colSpan={4} /><td className="kda">{formatStat(total(players, (p) => Number.isFinite(p.kills) ? p.kills : null))} / {formatStat(total(players, (p) => Number.isFinite(p.deaths) ? p.deaths : null))} / {formatStat(total(players, (p) => Number.isFinite(p.assists) ? p.assists : null))}</td><td className="level">{formatStat(total(players, metrics[0].value))}<TooltipMetricIcon metric="xp" /></td>{metrics.slice(1).map((m) => <td className={m.color} key={m.label}>{formatStat(total(players, m.value))}<TooltipMetricIcon metric={m.color} /></td>)}</tr></tfoot>
      </table></div>
    </TeamTable>;
  })}</>;
};

export default LaningTable;
