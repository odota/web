import React from "react";
import { Tooltip } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import styled from "styled-components";
import { heroes } from "dotaconstants";
import { Link } from "react-router-dom";
import config from "../../../config";
import constants from "../../constants";
import useStrings from "../../../hooks/useStrings.hook";
import { getPlayerIdentity, getPlayerRoles, getRoleLabels, getStatAtMinute, getLevelAtMinute, formatStat } from "./laning.utils";
import TooltipMetricIcon from "../../Visualizations/Graph/TooltipMetricIcon";
import { SummaryTeam, laningBorderColor } from "./StyledLaning";

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

export const TeamTable = styled.section`
  margin-top: 12px;
  background: transparent;
  &.laning-phase-table table { font-family: ${constants.fontFamilyFuturistic}; font-size: 14px; }
  &.laning-phase-table th { font-size: 13px; }
  &.laning-phase-table .xp, &.laning-phase-table .xp svg { color: ${constants.colorLavenderMuted}; }
  &.laning-phase-table .role-name, &.laning-phase-table small { font-size: 13px; }
  h3 { margin: 0 0 6px; font-size: 14px; font-family: ${constants.fontFamilyFuturistic}; }
  .team-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 6px; }
  .team-heading h3 { margin-bottom: 0; }
  .last-hits-toggle {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 6px; border: 0; border-radius: 4px;
    background: transparent; color: ${constants.textColorSecondary};
    font: inherit; font-size: 12px; cursor: pointer;
  }
  .last-hits-toggle:hover { background: rgba(128, 128, 128, 0.12); }
  .last-hits-toggle svg { width: 16px; height: 16px; }
  h3 > span { font-weight: 400; }
  .table-scroll { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; line-height: 1.3; font-variant-numeric: tabular-nums; }
  th, td { padding: 6px 10px; text-align: left; white-space: nowrap; }
  thead, tfoot { background: rgba(128, 128, 128, 0.08); }
  th { font-size: 11px; font-weight: 600; }
  &.last-hits-table thead th { font-size: 14px; }
  &.replay-comparison-table table { font-family: ${constants.fontFamilyFuturistic}; }
  &.replay-comparison-table th, &.replay-comparison-table td { padding: 10px 14px; text-align: center; vertical-align: middle; }
  &.replay-comparison-table tbody td { font-size: 14px; }
  &.replay-comparison-table thead tr:first-child th { font-size: 14px; }
  &.replay-comparison-table .player-identity { font-size: 14px; justify-content: center; }
  &.replay-comparison-table tbody td:first-child { font-weight: 700; }
  &.replay-comparison-table th:nth-child(2), &.replay-comparison-table td:nth-child(2),
  &.replay-comparison-table th:nth-child(3), &.replay-comparison-table td:nth-child(3) { width: 38%; }
  &.replay-comparison-table.level-six-table table { table-layout: fixed; }
  &.replay-comparison-table.level-six-table th, &.replay-comparison-table.level-six-table td { width: 20%; }
  &.replay-comparison-table.level-six-table tbody td { font-weight: 400; }
  &.replay-comparison-table.lane-summary-table th, &.replay-comparison-table.lane-summary-table td { width: 25%; }
  &.replay-comparison-table .stat-comparison { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; column-gap: 4px; }
  &.replay-comparison-table .stat-original { grid-column: 2; justify-self: center; white-space: nowrap; }
  &.replay-comparison-table .stat-difference { grid-column: 3; justify-self: start; font-size: inherit; text-align: left; white-space: nowrap; }
  thead tr:first-child th[colspan] { text-align: left; padding: 8px 6px 6px; }
  .group-heading {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 12px;
    font-weight: 500;
  }
  .group-heading svg { width: 15px; height: 15px; flex-shrink: 0; }
  .last-hits-heading svg { color: ${constants.golden}; }
  tbody tr { background: transparent; }
  tbody tr:nth-child(even) { background: rgba(128, 128, 128, 0.04); }
  tbody tr:hover { background: rgba(128, 128, 128, 0.16); }
  th.player, td.player { width: 25%; min-width: 160px; }
  .player-identity { display: flex; align-items: center; gap: 6px; }
  .player-identity .portrait { flex-shrink: 0; }
  .role-cell { width: 1%; }
  .role-cell, .lane-cell { color: ${constants.lightGray}; }
  .role-label { display: inline-flex; align-items: center; gap: 5px; }
  .role-name { color: ${constants.lightGray}; font-size: 11px; line-height: 1.3; }
  .role-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    background-image: url("/assets/images/dota2/role-icons.png");
    background-size: 500% auto;
    background-repeat: no-repeat;
    border-radius: 4px;
    cursor: help;
    vertical-align: middle;
    &:hover { background-color: rgba(125, 200, 240, 0.1); }
    &:focus-visible { outline: 2px solid ${constants.primaryLinkColor}; outline-offset: 3px; }
  }
  .portrait { display: block; object-fit: cover; }
  small { display: block; color: ${constants.textColorSecondary}; font-size: 11px; margin-top: 2px; }
  .lane-won { color: ${constants.colorSuccess}; margin: 0 0 2px; font-size: 13px; }
  .heroes-cell { width: 1%; }
  .matchup { display: flex; align-items: center; gap: 2px; }
  .matchup span { display: inline-flex; align-items: center; align-self: center; height: 24px; margin: 0 2px; padding-bottom: 4px; line-height: 1; color: ${constants.textColorSecondary}; }
  .matchup img { box-sizing: content-box; object-fit: contain; flex-shrink: 0; border-bottom: 2px solid; padding-bottom: 2px; }
  .ally { border-color: ${constants.colorSuccess}; }
  .enemy { border-color: ${constants.colorDanger}; }
  .kda { font-variant-numeric: tabular-nums; color: ${constants.lightGray}; }
  .stat { min-width: 72px; font-weight: 600; }
  th.xp, td.xp, th.gold, td.gold { width: 12%; }
  .level-value { display: inline-flex; align-items: center; gap: 4px; }
  .ultimate-icon { width: 14px; height: 14px; color: ${constants.golden}; }
  .gold { color: ${constants.golden}; }
  .xp { color: ${constants.colorBlue}; }
  .level { color: ${constants.colorLavenderMuted}; }
  th.level, td.level { width: 64px; min-width: 64px; }
  .bar { display: block; height: 3px; margin-top: 3px; background: rgba(128, 128, 128, 0.2); }
  .bar > span { display: block; height: 100%; background: currentColor; }
  .minute-heading { display: inline-flex; align-items: center; gap: 3px; }
  .minute-heading svg { width: 12px; height: 12px; color: ${constants.colorBlue}; }
  .last-hits {
    text-align: center;
    border-left: 1px solid ${laningBorderColor};
    animation: last-hit-spacing 250ms ease-out;
  }
  .last-hit-content {
    display: block;
    width: 36px;
    overflow: hidden;
    animation: last-hit-reveal 250ms ease-out;
  }
  .last-hits-toggle svg { transition: transform 250ms ease; }
  @keyframes last-hit-reveal {
    from { width: 0; opacity: 0; transform: translateX(-8px); }
    to { width: 36px; opacity: 1; transform: translateX(0); }
  }
  @keyframes last-hit-spacing {
    from { padding-left: 0; padding-right: 0; }
    to { padding-left: 10px; padding-right: 10px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .last-hits, .last-hit-content { animation: none; }
    .last-hits-toggle svg { transition: none; }
  }
  @media (max-width: 680px) {
    th, td { padding-left: 6px; padding-right: 6px; }
    .last-hits { animation-name: none; }
  }
  tfoot td { border-top: 1px solid ${laningBorderColor}; font-weight: 600; }
`;

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
              return <td className={`stat ${metric.color}`} key={metric.label}>{metric.color === "gold" && <TooltipMetricIcon metric="gold" />}{metric.color === "xp" && <TooltipMetricIcon metric="xp" />}{metric.color === "level" ? <span className="level-value"><TooltipMetricIcon metric="xp" />{formatStat(value)}{value !== null && value >= 6 && <Tooltip title="Ultimate" arrow placement="top" slotProps={roleTooltipSlots}><span style={{ display: "inline-flex" }} tabIndex={0}><AutoAwesomeIcon className="ultimate-icon" titleAccess="Ultimate" /></span></Tooltip>}</span> : formatStat(value)}{value !== null && metric.color !== "level" && <span className="bar"><span style={{ width: `${Math.min(100, Math.max(0, value / maxValues[index] * 100))}%` }} /></span>}</td>;
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
        <tfoot><tr><td colSpan={4} /><td className="kda">{formatStat(total(players, (p) => Number.isFinite(p.kills) ? p.kills : null))} / {formatStat(total(players, (p) => Number.isFinite(p.deaths) ? p.deaths : null))} / {formatStat(total(players, (p) => Number.isFinite(p.assists) ? p.assists : null))}</td><td className="level"><TooltipMetricIcon metric="xp" />{formatStat(total(players, metrics[0].value))}</td>{metrics.slice(1).map((m) => <td className={m.color} key={m.label}>{m.color === "gold" && <TooltipMetricIcon metric="gold" />}{(m.color === "xp" || m.color === "level") && <TooltipMetricIcon metric="xp" />}{formatStat(total(players, m.value))}</td>)}</tr></tfoot>
      </table></div>
    </TeamTable>;
  })}</>;
};

export default LaningTable;
