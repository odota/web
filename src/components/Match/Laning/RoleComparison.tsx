import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import BlockIcon from "@mui/icons-material/Block";
import { formatTemplate, formatTemplateToString } from "../../../utility";
import { MetricSummary } from "./StyledHeroComparison";
import styled from "styled-components";
import constants from "../../constants";
import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { abilities, ability_ids as abilityIds, heroes, items, player_colors as playerColors } from "dotaconstants";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import { IconRadiant, IconDire } from "../../Icons";
import TooltipMetricIcon from "../../Visualizations/Graph/TooltipMetricIcon";
import Heading from "../../Heading/Heading";
import { PageSection, SummaryTeam, TableCaption } from "./StyledLaning";
import { TeamTable } from "./LaningTable";
import { getLaningRoles, getPlayerIdentity, getStatAtMinute, getLevelAtMinute, formatStat, getRoleLabels, LaneRole } from "./laning.utils";

import { getReplayGain, getReplayCreeps, getReplaySkills, inReplayInterval, ReplayPlayer } from "./replay.utils";

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


const ReplayTable = styled(TeamTable)`
  th, td { vertical-align: top; }
`;

const PurchasedItem = styled.span`
  position: relative;
  display: inline-flex;
  width: 36px;
  height: 27px;
  flex-shrink: 0;
  img { width: 100%; height: 100%; object-fit: cover; }
  time {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.65);
    color: ${constants.colorWhite};
    text-align: center;
    font-size: 9px;
    line-height: 12px;
    font-variant-numeric: tabular-nums;
  }
`;

/** Formats replay purchase times, including purchases before the horn. */
const purchaseTime = (seconds: number) => {
  const elapsed = Math.floor(Math.abs(seconds));
  return `${seconds < 0 ? "−" : ""}${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;
};

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
  const pair: (ReplayPlayer | undefined)[] = [getLaningRoles(match.players, true)[selectedRole], getLaningRoles(match.players, false)[selectedRole]];
  const playerName = (player: MatchPlayer | undefined) => {
    if (!player) return strings.laning_unavailable;
    const identity = getPlayerIdentity(player, strings);
    return <span className="player-identity">{identity.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt="" width={24} height={24} />}<span style={{ color: playerColors[player.player_slot as unknown as keyof typeof playerColors] }}>{identity.playerName}</span></span>;
  };
  const finite = (value: number | undefined) => typeof value === "number" && Number.isFinite(value) ? value : null;
  return <PageSection aria-label="Laning Phase Replay">
    <Heading title="Laning Phase Replay" />
    <TableCaption>Skills, heroes killed, and deaths retain all records by the selected time. Skills are grouped into two-minute intervals. Creep and gain rows cover the previous two minutes. Skill timing estimated from XP assumes points were spent on leveling; recorded upgrade times are used when available. Creep types require timed kill logs. Gold is cumulative gold earned. Items and runes show purchases and pickups recorded by each time, not current inventory or active buffs.</TableCaption>
    <ComparisonToggles exclusive value={selectedRole} onChange={(_, role: LaneRole | null) => { if (role) setSelectedRole(role); }} aria-label={strings.laning_role} size="small">
      {roleOptions.map((role) => <ToggleButton key={role} value={role}><span className="role-icon" aria-hidden="true" style={{ backgroundPosition: `${rolePositions[role]}% center` }} />{roleLabels[role]}</ToggleButton>)}
    </ComparisonToggles>
    <ComparisonToggles exclusive value={activeMinute ?? null} onChange={(_, minute: number | null) => { if (minute !== null) setSelectedMinute(minute); }} aria-label="Role comparison time" size="small">
      {intervals.map((minute) => <ToggleButton key={minute} value={minute} aria-label={`${minute} minutes`}><AccessTimeIcon aria-hidden="true" sx={{ fontSize: 14, color: constants.colorBlue }} />{minute}:00</ToggleButton>)}
    </ComparisonToggles>
    {!intervals.length && <TableCaption>{strings.laning_unavailable}</TableCaption>}
    <ReplayTable>
      {(activeMinute === undefined ? [] : [activeMinute]).map((minute) => {
        const stats = [
          { label: "Total Last Hits", icon: "lh", values: pair.map((p) => getStatAtMinute(p, "lh_t", minute)) },
          { label: "Gold", icon: "gold", values: pair.map((p) => getStatAtMinute(p, "gold_t", minute)) },
          { label: strings.heading_graph_networth, icon: "gold", values: pair.map((p) => finite(p?.networth_t?.[minute])) },
          { label: "Net worth gained", icon: "gold", values: pair.map((p) => getReplayGain(p?.networth_t, minute)) },
          { label: "Last hits", icon: "lh", values: pair.map((p) => getReplayGain(p?.lh_t, minute)) },
          { label: strings.th_xp, icon: "xp", values: pair.map((p) => getStatAtMinute(p, "xp_t", minute)) },
          { label: strings.heading_level, icon: "levels", values: pair.map((p) => getLevelAtMinute(p, minute)) },
        ];
        return <section key={minute} style={{ marginTop: 20 }}>
          <h3>{minute - 2}:00–{minute}:00</h3>
          <div className="table-scroll"><table>
            <thead><tr><th /><th><SummaryTeam $radiant><IconRadiant width="16" height="16" />{strings.general_radiant}</SummaryTeam></th><th><SummaryTeam $radiant={false}><IconDire width="16" height="16" />{strings.general_dire}</SummaryTeam></th><th>{strings.laning_difference}</th></tr>
              <tr><th>{strings.th_players}</th>{pair.map((p, index) => <th key={index}>{playerName(p)}</th>)}<th /></tr>
            </thead>
            <tbody>
              {stats.map(({ label, icon, values }) => {
                const difference = values[0] !== null && values[1] !== null ? values[0] - values[1] : null;
                return <tr key={label}><td>{label}</td>{values.map((value, index) => <td key={index}>{icon && <TooltipMetricIcon metric={icon} />}{formatStat(value)}</td>)}<td>{difference === null ? "—" : difference === 0 ? "0" : <SummaryTeam $radiant={difference > 0}>{difference > 0 ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}+{formatStat(Math.abs(difference))}</SummaryTeam>}</td></tr>;
              })}
              {([{ label: "Heroes killed", field: "kills_log" }, { label: "Deaths", field: "deaths_log" }] as const).map(({ label, field }) => <tr key={field}>
                <td>{label}</td>{pair.map((p, side) => {
                  const log = p?.[field];
                  if (!Array.isArray(log)) return <td key={side}>—</td>;
                  return <td key={side} style={{ whiteSpace: "normal", maxWidth: 320 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 8 }}>{intervals.filter((endMinute) => endMinute <= minute).map((endMinute) => {
                      const events = log.filter((entry) => inReplayInterval(entry.time, endMinute));
                      if (events.length === 0) return null;
                      return <div key={endMinute} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4, maxWidth: "100%", padding: "6px 4px", borderRadius: 4, background: endMinute === minute ? "rgba(125, 200, 240, 0.14)" : undefined, borderLeft: endMinute === minute ? `2px solid ${constants.colorBlue}` : "2px solid transparent" }}>
                        <div>{events.length === 0 ? "None" : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{events.map((entry, index) => {
                      const hero = Object.values(heroes).find((candidate) => candidate.name === entry.key);
                      const eventPlayer = hero && match.players.find((candidate) => Number(candidate.hero_id) === Number(hero.id));
                      const name = eventPlayer ? getPlayerIdentity(eventPlayer, strings).playerName
                        : hero?.localized_name ?? String(entry.key ?? "Unknown").replace(/^npc_dota_/, "").replace(/_/g, " ");
                      return <span key={index} title={`${field === "deaths_log" ? "Killed by " : ""}${name} at ${purchaseTime(entry.time)}`} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        {hero ? <img src={config.VITE_IMAGE_CDN + hero.icon} alt={hero.localized_name} width={20} height={20} /> : <span aria-label={name}>?</span>}
                        <time style={{ fontSize: 10, lineHeight: "20px", fontWeight: 400, color: constants.textColorSecondary }}>{purchaseTime(entry.time)}</time>
                      </span>;
                    })}</div>}</div>
                      </div>;
                    })}</div>
                  </td>;
                })}<td />
              </tr>)}
              <tr><td>Creeps killed by type</td>{pair.map((p, side) => {
                const creeps = getReplayCreeps(p, minute);
                return <td key={side} style={{ whiteSpace: "normal" }}>{creeps === null ? <span style={{ color: constants.textColorSecondary }}>Timed creep data unavailable</span> : creeps.length === 0 ? "None" : <ul>{creeps.map(([key, count]) => <li key={key}>{key.replace(/^npc_dota_/, "").replace(/_/g, " ")}: {count}</li>)}</ul>}</td>;
              })}<td /></tr>
              <tr><td>Skills added{pair.some((player) => getReplaySkills(player, minute)?.estimated) && <small style={{ display: "block", marginTop: 4, color: constants.textColorSecondary, fontWeight: 400 }}>Approximate · based on XP</small>}</td>{pair.map((p, side) => <td key={side} style={{ whiteSpace: "normal", maxWidth: 320 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 8 }}>{intervals.filter((endMinute) => endMinute <= minute).map((endMinute) => {
                  const skills = getReplaySkills(p, endMinute);
                  const previous = endMinute === 2 ? { upgrades: [] } : getReplaySkills(p, endMinute - 2);
                  const upgrades = skills && previous ? skills.upgrades.slice(previous.upgrades.length) : null;
                  return <div key={endMinute} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4, maxWidth: "100%", padding: "6px 4px", borderRadius: 4, background: endMinute === minute ? "rgba(125, 200, 240, 0.14)" : undefined, borderLeft: endMinute === minute ? `2px solid ${constants.colorBlue}` : "2px solid transparent" }}>
                    <time style={{ whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", fontSize: 10, fontWeight: 400, color: constants.textColorSecondary }}>{endMinute - 2}:00–{endMinute}:00</time>
                    <div>
                    {upgrades === null ? <div>—</div> : upgrades.length === 0 ? <div>None</div> : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{upgrades.map((upgrade, index) => {
                    const key = abilityIds[String(upgrade.ability) as keyof typeof abilityIds];
                    const ability = abilities[key as keyof typeof abilities];
                    const name = (ability && "dname" in ability ? ability.dname : undefined) || key || `Ability ${upgrade.ability}`;
                    return <span key={index} title={`${name} · Hero level ${upgrade.level}`} style={{ display: "inline-flex", position: "relative", width: 24, height: 24, background: constants.secondarySurfaceColor }}>
                      {ability && "img" in ability && ability.img && <img src={config.VITE_IMAGE_CDN + ability.img} alt={name} width={24} height={24} />}
                      <small style={{ position: "absolute", bottom: 0, right: 0, padding: "0 2px", background: "rgba(0, 0, 0, 0.75)", color: constants.colorWhite, fontSize: 9, lineHeight: "11px", fontWeight: 700 }}>{upgrade.level}</small>
                    </span>;
                    })}</div>}
                    </div>
                  </div>;
                })}</div>
              </td>)}<td /></tr>
              <tr><td>Items purchased</td>{pair.map((p, side) => <td key={side} style={{ whiteSpace: "normal", maxWidth: 320 }}>{!p || !Array.isArray(p.purchase_log) ? "—" : intervals.filter((endMinute) => endMinute <= minute).reverse().map((endMinute) => {
                // Include starting items in the first interval.
                const purchases = p.purchase_log.filter((entry) => Number.isFinite(entry.time) && entry.time <= endMinute * 60 && (endMinute === 2 || entry.time > (endMinute - 2) * 60));
                return <div key={endMinute} style={{ display: "grid", gridTemplateColumns: "65px minmax(0, 1fr)", alignItems: "start", gap: 8, marginBottom: 8, padding: "6px 4px", borderRadius: 4, background: endMinute === minute ? "rgba(125, 200, 240, 0.14)" : undefined, borderLeft: endMinute === minute ? `2px solid ${constants.colorBlue}` : "2px solid transparent" }}>
                  <time style={{ whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", fontSize: 10, fontWeight: 400, color: constants.textColorSecondary }}>{endMinute - 2}:00–{endMinute}:00</time>
                  {purchases.length === 0 ? <div>None</div> : <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{purchases.map((entry, index) => {
                const item = items[entry.key as keyof typeof items];
                const name = item && "dname" in item ? item.dname : entry.key;
                const boughtAt = Number.isFinite(entry.time) ? purchaseTime(entry.time) : "—";
                return item ? <PurchasedItem key={index} title={`${name} (${boughtAt})`}>
                  <img src={config.VITE_IMAGE_CDN + item.img} alt={name} width={36} height={27} />
                  <time aria-label={`Purchased at ${boughtAt}`}>{boughtAt}</time>
                </PurchasedItem> : <span key={index}>{entry.key} <time>{boughtAt}</time></span>;
                  })}</div>}
                </div>;
              })}</td>)}<td /></tr>
              <tr><td>Runes picked up</td>{pair.map((p, side) => <td key={side} style={{ whiteSpace: "normal", maxWidth: 320 }}>{!p || !Array.isArray(p.runes_log) ? "—" : <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{p.runes_log.filter((entry) => entry.time >= 0 && entry.time <= minute * 60).map((entry, index) => <span key={index} title={`${strings[`rune_${entry.key}` as keyof Strings]} (${purchaseTime(entry.time)})`} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2 }}><img src={`/assets/images/dota2/runes/${entry.key}.png`} alt={strings[`rune_${entry.key}` as keyof Strings]} width={24} height={24} /><time style={{ fontSize: 10, fontWeight: 400, color: constants.textColorSecondary }}>{purchaseTime(entry.time)}</time></span>)}</div>}</td>)}<td /></tr>
            </tbody>
          </table></div>
        </section>;
      })}
    </ReplayTable>
    {activeMinute !== undefined && (() => {
      const minute = activeMinute;
      const heroLabel = (player: MatchPlayer) => {
        const identity = getPlayerIdentity(player, strings);
        return <span className="summary-hero" style={{ color: playerColors[player.player_slot as unknown as keyof typeof playerColors] }}>{identity.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt="" width={20} height={20} />}<strong>{identity.playerName}</strong></span>;
      };
      const metrics = [
        { key: "level", label: "Level", values: pair.map((p) => getLevelAtMinute(p, minute)) },
        { key: "networth", label: "Net worth", values: pair.map((p) => finite(p?.networth_t?.[minute])) },
        { key: "lh", label: "Last hits", values: pair.map((p) => getStatAtMinute(p, "lh_t", minute)) },
        { key: "denies", label: "Denies", values: pair.map((p) => getStatAtMinute(p, "dn_t", minute)) },
      ];
      const summaryKeys = ["comparison_level", "comparison_gold", "comparison_last_hits", "comparison_denies"];
      const icons = [<TrendingUpIcon aria-hidden="true" />, <img src="/assets/images/dota2/gold.png" alt="" width={16} height={16} />, <GpsFixedIcon aria-hidden="true" />, <BlockIcon aria-hidden="true" />];
      const worth = metrics[1].values;
      const goldDifference = worth[0] !== null && worth[1] !== null ? worth[0] - worth[1] : null;
      const renderHero = (player: MatchPlayer | undefined) => player ? heroLabel(player) : strings.general_no_hero;
      return <MetricSummary aria-label="Replay summary" style={{ marginTop: 20 }}>
        <div className="summary-intro">{formatTemplate(goldDifference ? strings.laning_comparison_winner_intro : strings.laning_comparison_intro, {
          hero: renderHero(pair[goldDifference !== null && goldDifference > 0 ? 0 : 1]),
          time: <span className="summary-time"><AccessTimeIcon aria-hidden="true" /><time>{minute}:00</time></span>,
        })}</div>
        <ul>{metrics.map(({ label, values }, index) => {
          const [radiant, dire] = values;
          const difference = radiant !== null && dire !== null ? radiant - dire : null;
          const summaryKey = summaryKeys[index];
          const keyword = (content: React.ReactNode) => <span className={`summary-keyword ${summaryKey}`}>{icons[index]} {content}</span>;
          return <li key={summaryKey}><div className="summary-item"><span>{formatTemplate(
            difference === null ? strings.laning_comparison_missing : difference === 0 ? strings.laning_comparison_tied : strings[`laning_${summaryKey}` as keyof Strings], {
              hero: renderHero(pair[difference !== null && difference > 0 ? 0 : 1]),
              opponent: renderHero(pair[difference !== null && difference > 0 ? 1 : 0]),
              metric: keyword(label),
              advantage: keyword(formatTemplateToString(strings.laning_comparison_level_advantage, { value: difference === null ? "" : formatStat(Math.abs(difference)) })),
              value: keyword(difference === null ? "" : formatStat(Math.abs(difference))),
            },
          )}</span></div></li>;
        })}</ul>
      </MetricSummary>;
    })()}
  </PageSection>;
};

export default RoleComparison;
