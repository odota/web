import styled from "styled-components";
import constants from "../../constants";
import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { items, player_colors as playerColors } from "dotaconstants";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import { IconRadiant, IconDire } from "../../Icons";
import TooltipMetricIcon from "../../Visualizations/Graph/TooltipMetricIcon";
import Heading from "../../Heading/Heading";
import { PageSection, SummaryTeam, TableCaption } from "./StyledLaning";
import { TeamTable } from "./LaningTable";
import { getLaningRoles, getPlayerIdentity, getStatAtMinute, getLevelAtMinute, formatStat, getRoleLabels, LaneRole } from "./laning.utils";

const ComparisonToggles = styled(ToggleButtonGroup)`
  && { display: flex; width: 100%; }
  flex-wrap: wrap;
  gap: 0;
  margin-top: 16px;
  & .MuiToggleButtonGroup-grouped {
    flex: 1 1 auto;
    margin: 0;
    padding: 8px 12px;
    gap: 6px;
    border: 1px solid ${constants.dividerColor} !important;
    border-radius: 0 !important;
    &:not(:first-of-type) { border-left: 0 !important; }
    &:first-of-type { border-radius: 6px 0 0 6px !important; }
    &:last-of-type { border-radius: 0 6px 6px 0 !important; }
    &:only-of-type { border-radius: 6px !important; }
    background: ${constants.secondarySurfaceColor};
    color: ${constants.textColorSecondary};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 12px;
    line-height: 1.4;
    text-transform: none;
    transition: background-color 150ms ease, border-color 150ms ease;
    &:hover { background: rgba(125, 200, 240, 0.1); }
    &.Mui-selected, &.Mui-selected:hover {
      color: ${constants.colorBlue};
      background: rgba(125, 200, 240, 0.14);
      border-color: ${constants.colorBlue} !important;
    }
    &:focus-visible { outline: 2px solid ${constants.colorBlue}; outline-offset: 2px; }
  }
  .role-icon { width: 20px; height: 20px; flex-shrink: 0; background-image: url("/assets/images/dota2/role-icons.png"); background-size: 500% auto; background-repeat: no-repeat; }
  @media (prefers-reduced-motion: reduce) { & .MuiToggleButtonGroup-grouped { transition: none; } }
`;

type CarryPlayer = MatchPlayer & { networth_t?: number[] };

/** Interval snapshots for opposing roles, with cumulative purchase and pickup logs. */
const RoleComparison = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const [selectedRole, setSelectedRole] = useState<LaneRole>("carry");
  const roleLabels = getRoleLabels(strings);
  const rolePositions = { carry: 0, midlane: 25, offlane: 50, softSupport: 75, hardSupport: 100 };
  const roleOptions: LaneRole[] = ["carry", "midlane", "offlane", "softSupport", "hardSupport"];
  const intervals = [2, 4, 6, 8, 10].filter((minute) => minute * 60 <= match.duration);
  const [selectedMinute, setSelectedMinute] = useState(10);
  const activeMinute = intervals.includes(selectedMinute) ? selectedMinute : intervals[intervals.length - 1];
  const pair: (CarryPlayer | undefined)[] = [getLaningRoles(match.players, true)[selectedRole], getLaningRoles(match.players, false)[selectedRole]];
  const playerName = (player: MatchPlayer | undefined) => {
    if (!player) return strings.laning_unavailable;
    const identity = getPlayerIdentity(player, strings);
    return <span className="player-identity">{identity.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt="" width={24} height={24} />}<span style={{ color: playerColors[player.player_slot as unknown as keyof typeof playerColors] }}>{identity.playerName}</span></span>;
  };
  const finite = (value: number | undefined) => typeof value === "number" && Number.isFinite(value) ? value : null;
  return <PageSection aria-label="Laning Phase Replay">
    <Heading title="Laning Phase Replay" />
    <TableCaption>Gold is cumulative gold earned. Items and runes show purchases and pickups recorded by each time, not current inventory or active buffs.</TableCaption>
    <ComparisonToggles exclusive value={selectedRole} onChange={(_, role: LaneRole | null) => { if (role) setSelectedRole(role); }} aria-label={strings.laning_role} size="small">
      {roleOptions.map((role) => <ToggleButton key={role} value={role}><span className="role-icon" aria-hidden="true" style={{ backgroundPosition: `${rolePositions[role]}% center` }} />{roleLabels[role]}</ToggleButton>)}
    </ComparisonToggles>
    <ComparisonToggles exclusive value={activeMinute ?? null} onChange={(_, minute: number | null) => { if (minute !== null) setSelectedMinute(minute); }} aria-label="Role comparison time" size="small">
      {intervals.map((minute) => <ToggleButton key={minute} value={minute} aria-label={`${minute} minutes`}><AccessTimeIcon aria-hidden="true" sx={{ fontSize: 14, color: constants.colorBlue }} />{minute}:00</ToggleButton>)}
    </ComparisonToggles>
    {!intervals.length && <TableCaption>{strings.laning_unavailable}</TableCaption>}
    <TeamTable>
      {(activeMinute === undefined ? [] : [activeMinute]).map((minute) => {
        const stats = [
          { label: strings.heading_last_hits, icon: "lh", values: pair.map((p) => getStatAtMinute(p, "lh_t", minute)) },
          { label: "Gold", icon: "gold", values: pair.map((p) => getStatAtMinute(p, "gold_t", minute)) },
          { label: strings.heading_graph_networth, icon: "gold", values: pair.map((p) => finite(p?.networth_t?.[minute])) },
          { label: strings.th_xp, icon: "xp", values: pair.map((p) => getStatAtMinute(p, "xp_t", minute)) },
          { label: strings.heading_level, icon: "levels", values: pair.map((p) => getLevelAtMinute(p, minute)) },
        ];
        return <section key={minute} style={{ marginTop: 20 }}>
          <h3>{minute}:00</h3>
          <div className="table-scroll"><table>
            <thead><tr><th /><th><SummaryTeam $radiant><IconRadiant width="16" height="16" />{strings.general_radiant}</SummaryTeam></th><th><SummaryTeam $radiant={false}><IconDire width="16" height="16" />{strings.general_dire}</SummaryTeam></th><th>{strings.laning_difference}</th></tr>
              <tr><th>{strings.th_players}</th>{pair.map((p, index) => <th key={index}>{playerName(p)}</th>)}<th /></tr>
            </thead>
            <tbody>
              {stats.map(({ label, icon, values }) => {
                const difference = values[0] !== null && values[1] !== null ? values[0] - values[1] : null;
                return <tr key={label}><td>{label}</td>{values.map((value, index) => <td key={index}>{icon && <TooltipMetricIcon metric={icon} />}{formatStat(value)}</td>)}<td>{difference === null ? "—" : difference === 0 ? "0" : <SummaryTeam $radiant={difference > 0}>{difference > 0 ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}+{formatStat(Math.abs(difference))}</SummaryTeam>}</td></tr>;
              })}
              <tr><td>Items purchased</td>{pair.map((p, side) => <td key={side} style={{ whiteSpace: "normal", maxWidth: 320 }}>{!p || !Array.isArray(p.purchase_log) ? "—" : <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{p.purchase_log.filter((entry) => entry.time <= minute * 60).map((entry, index) => {
                const item = items[entry.key as keyof typeof items];
                const name = item && "dname" in item ? item.dname : entry.key;
                return item ? <img key={index} src={config.VITE_IMAGE_CDN + item.img} title={`${name} (${Math.floor(entry.time / 60)}:${String(Math.abs(entry.time % 60)).padStart(2, "0")})`} alt={name} width={32} height={24} /> : <span key={index}>{entry.key}</span>;
              })}</div>}</td>)}<td /></tr>
              <tr><td>Runes picked up</td>{pair.map((p, side) => <td key={side} style={{ whiteSpace: "normal", maxWidth: 320 }}>{!p || !Array.isArray(p.runes_log) ? "—" : <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{p.runes_log.filter((entry) => entry.time >= 0 && entry.time <= minute * 60).map((entry, index) => <img key={index} src={`/assets/images/dota2/runes/${entry.key}.png`} title={strings[`rune_${entry.key}` as keyof Strings]} alt={strings[`rune_${entry.key}` as keyof Strings]} width={24} height={24} />)}</div>}</td>)}<td /></tr>
            </tbody>
          </table></div>
        </section>;
      })}
    </TeamTable>
  </PageSection>;
};

export default RoleComparison;
