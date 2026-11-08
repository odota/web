import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import BoltIcon from "@mui/icons-material/Bolt";
import LayersIcon from "@mui/icons-material/Layers";
import { player_colors as playerColors } from "dotaconstants";
import styled from "styled-components";
import config from "../../../config";
import constants from "../../constants";
import useStrings from "../../../hooks/useStrings.hook";
import { IconRadiant, IconDire } from "../../Icons";
import Heading from "../../Heading/Heading";
import { PageSection, TableCaption } from "./StyledLaning";
import { getPlayerIdentity, getPlayerRoles, getRoleLabels } from "./laning.utils";

const runeColors: Record<number, string> = {
  0: "#78b9ff", 1: "#f27676", 2: "#edc95c", 3: "#c694ed", 4: "#87d877",
  5: "#e8bb56", 6: "#b48be8", 7: "#79cee8", 8: "#c585e8", 9: "#f0a65f",
};

const Events = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 16px 0 0 6px;
  padding: 12px 16px 12px 30px;
  font-family: ${constants.fontFamilyFuturistic};
  border-left: 2px solid ${constants.colorBlue};
  > section { position: relative; min-width: 0; }
  > section::before {
    content: "";
    position: absolute;
    top: 4px;
    left: -36px;
    width: 10px;
    height: 10px;
    border: 2px solid ${constants.primarySurfaceColor};
    border-radius: 50%;
    background: #c084fc;
  }
  h3 { display: flex; align-items: center; gap: 6px; margin: 0 0 8px; font: 400 16px ${constants.fontFamilyFuturistic}; color: ${constants.textColorPrimary}; }
  h3 > svg { width: 20px; height: 20px; color: ${constants.golden}; }
  h3 > img { object-fit: contain; }
  h3 > .camp-stack-icon, .camp-stack-count { color: ${constants.colorLavenderMuted}; }
  ul { margin: 0; padding: 0; list-style: none; }
  li, section > p { margin: 10px 0 0; font-size: 16px; line-height: 1.6; }
  .event-player { display: inline-flex; align-items: center; gap: 5px; vertical-align: middle; }
  .event-rune, .rune-title { font-weight: 700; }
  .rune-title { color: inherit; }
  .event-rune { display: inline-flex; align-items: center; gap: 4px; vertical-align: middle; }
  .event-rune img { object-fit: contain; }
  .event-role { display: inline-block; width: 20px; height: 20px; flex-shrink: 0; background-image: url("/assets/images/dota2/role-icons.png"); background-size: 500% auto; background-repeat: no-repeat; }
  time { font-family: ${constants.fontFamilyFuturistic}; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle; color: ${constants.textColorSecondary}; margin-right: 6px; font-variant-numeric: tabular-nums; }
`;

/** Recorded early-game pickups and camp stacks through minute ten. */
const LaningEvents = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const roles = getPlayerRoles(match.players);
  const roleLabels = getRoleLabels(strings);
  const rolePositions = { carry: 0, midlane: 25, offlane: 50, softSupport: 75, hardSupport: 100 };
  const end = Math.min(600, match.duration);
  const time = (seconds: number) => `${Math.floor(Math.max(0, seconds) / 60)}:${String(Math.floor(Math.max(0, seconds) % 60)).padStart(2, "0")}`;
  const playerLabel = (player: MatchPlayer | undefined) => {
    if (!player) return strings.laning_unavailable;
    const identity = getPlayerIdentity(player, strings);
    const role = roles.get(player.player_slot);
    return <span className="event-player"><span style={{ display: "inline-flex" }} title={player.isRadiant ? strings.general_radiant : strings.general_dire} aria-label={player.isRadiant ? strings.general_radiant : strings.general_dire}>{player.isRadiant ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}</span>{role && <span className="event-role" role="img" aria-label={roleLabels[role]} title={roleLabels[role]} style={{ backgroundPosition: `${rolePositions[role]}% center` }} />}{identity.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt={identity.heroName} width={20} height={20} />}<strong style={{ color: playerColors[player.player_slot as unknown as keyof typeof playerColors], fontWeight: 700 }}>{identity.playerName}</strong></span>;
  };
  const pickups = match.players.flatMap((player) => (player.runes_log ?? []).map((entry: { time: number; key: string | number }) => ({ player, time: entry.time, rune: Number(entry.key) })))
    .filter((entry) => Number.isFinite(entry.time) && entry.time >= 0 && entry.time <= end).sort((a, b) => a.time - b.time);
  const runeList = (entries: typeof pickups) => entries.length ? <ul>{entries.map((entry, index) => <li key={`${entry.player.player_slot}-${entry.time}-${index}`}><time>{time(entry.time)}</time>{playerLabel(entry.player)} · <span className="event-rune" style={{ color: runeColors[entry.rune] }}>{entry.rune >= 0 && entry.rune <= 9 && <img src={`/assets/images/dota2/runes/${entry.rune}.png`} alt="" width={20} height={20} />}{strings[`rune_${entry.rune}` as keyof Strings] ?? entry.rune}</span></li>)}</ul> : <TableCaption>No pickups recorded.</TableCaption>;
  const firstBlood = match.objectives?.find((event) => event.type === "CHAT_MESSAGE_FIRSTBLOOD");
  const firstBloodPlayer = firstBlood && match.players.find((player) => player.player_slot === firstBlood.player_slot);
  const firstBloodVictim = firstBlood && match.players.find((player) => player.player_slot === firstBlood.victim_player_slot);
  const runeIcon = (rune: number) => <img src={`/assets/images/dota2/runes/${rune}.png`} alt="" width={20} height={20} />;
  const stackEvents = match.players.flatMap((player) => {
    const samples = player.camps_stacked_t ?? [];
    return samples.slice(1, Math.floor(end / 60) + 1).flatMap((count, index) => {
      const previous = samples[index];
      return Number.isFinite(count) && Number.isFinite(previous) && count > previous
        ? [{ player, count: count - previous, minute: index + 1 }] : [];
    });
  });
  const timeline: { key: string; time: number; title: React.ReactNode; content: React.ReactNode }[] = [
    { key: "bounty", time: 0, title: <>{runeIcon(5)}<span className="rune-title">Bounty Rune</span></>, content: runeList(pickups.filter((entry) => entry.rune === 5 && entry.time < 180)) },
    ...[2, 4, 6, 8, 10].filter((minute) => minute * 60 <= end).map((minute) => ({
      key: `runes-${minute}`, time: minute * 60,
      title: <>{minute < 6 ? runeIcon(7) : <>{minute === 6 && <SvgIcon titleAccess="Day turning into night" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="7" cy="8" r="3" />
          <path d="M7 2v1M7 13v1M1 8h1M12 8h1M2.8 3.8l.7.7M10.5 11.5l.7.7M2.8 12.2l.7-.7M10.5 4.5l.7-.7" />
          <path d="M20.5 10.5a6 6 0 1 1-7 7 6 6 0 0 0 7-7Z" />
          <path d="M3 19h5m-2-2 2 2-2 2" />
        </g>
      </SvgIcon>}<BoltIcon aria-label="Power rune" /></>}<span className="rune-title">{minute < 6 ? "Water Rune" : "Power Rune"}</span></>,
      content: runeList(pickups.filter((entry) => entry.rune !== 5 && entry.rune !== 8 && entry.time >= minute * 60 && entry.time < (minute + 2) * 60)),
    })),
    ...pickups.filter((entry) => entry.rune === 8).map((entry, index) => ({
      key: `wisdom-${index}`, time: entry.time, title: <>{runeIcon(8)}<span className="rune-title">Wisdom Rune</span></>, content: runeList([entry]),
    })),
    ...Array.from(new Set(stackEvents.map((entry) => entry.minute))).map((minute) => ({
      key: `stacks-${minute}`, time: minute * 60,
      title: <><LayersIcon className="camp-stack-icon" aria-hidden="true" /><span className="rune-title">Camps Stacked</span></>,
      content: <ul>{stackEvents.filter((entry) => entry.minute === minute).map(({ player, count }) => <li key={player.player_slot}><time>{time((minute - 1) * 60)}–{time(minute * 60)}</time>{playerLabel(player)} · <strong className="camp-stack-count">{count}</strong></li>)}</ul>,
    })),
  ];
  return <PageSection aria-label="Laning events">
    <Heading title="Laning Events" />
    <Events>
      {[...timeline, { key: "first-blood", time: firstBlood?.time ?? 0,
        title: <><img src="/assets/images/dota2/bloodsplattersmall2.png" alt="" width={20} height={20} style={{ objectFit: "contain" }} /><span className="rune-title">First Blood</span></>,
        content: firstBlood ? <p><time>{time(firstBlood.time)}</time>{playerLabel(firstBloodPlayer)}{firstBloodVictim && <> · {playerLabel(firstBloodVictim)}</>}</p> : <TableCaption>No first blood recorded.</TableCaption>,
      }].sort((a, b) => a.time - b.time).map((event) => <section key={event.key}><h3>{event.title}</h3>{event.content}</section>)}
    </Events>
  </PageSection>;
};

export default LaningEvents;
