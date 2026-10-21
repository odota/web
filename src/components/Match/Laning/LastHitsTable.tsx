import React from "react";
import { player_colors as playerColors } from "dotaconstants";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useStrings from "../../../hooks/useStrings.hook";
import config from "../../../config";
import { getPlayerIdentity, getStatAtMinute, formatStat, getPlayerRoles, getRoleLabels, LaneRole } from "./laning.utils";
import { IconRadiant, IconDire } from "../../Icons";
import Heading from "../../Heading/Heading";
import { PageSection, SummaryTeam } from "./StyledLaning";
import { TeamTable } from "./LaningTable";

const minutes = [2, 4, 6, 8, 10];


/** Last-hit histories grouped by role for opposing-player comparisons. */
const LastHitsTable = ({ match, roleFilter }: { match: Match; roleFilter?: LaneRole }) => {
  const strings = useStrings();
  const title = roleFilter ? `${strings.heading_last_hits} · ${getRoleLabels(strings)[roleFilter]}` : strings.heading_last_hits;
  const displayedRoles: (LaneRole | "unknown")[] = roleFilter ? [roleFilter] : ["carry", "midlane", "offlane", "softSupport", "hardSupport", "unknown"];
  const roles = getPlayerRoles(match.players);
  const roleLabels = getRoleLabels(strings);
  const rolePositions = { carry: 0, midlane: 25, offlane: 50, softSupport: 75, hardSupport: 100 };
  const renderPlayer = (player: MatchPlayer | undefined) => {
    if (!player) return strings.laning_unavailable;
    const identity = getPlayerIdentity(player, strings);
    const role = roles.get(player.player_slot);
    return <span className="player-identity"><span style={{ display: "inline-flex" }} title={player.isRadiant ? strings.general_radiant : strings.general_dire} aria-label={player.isRadiant ? strings.general_radiant : strings.general_dire}>{player.isRadiant ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}</span>{role && <span className="role-icon" role="img" aria-label={roleLabels[role]} title={roleLabels[role]} style={{ backgroundPosition: `${rolePositions[role]}% center` }} />}{identity.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt={identity.heroName} width={24} height={24} />}<span style={{ color: playerColors[player.player_slot as unknown as keyof typeof playerColors] }}>{identity.playerName}</span></span>;
  };
  return <PageSection aria-label={title}>
    <TeamTable style={{ marginTop: 0 }}>
      <Heading title={title} />
      {displayedRoles.map((role) => {
        const players = match.players.filter((player) => role === "unknown"
          ? !roles.has(player.player_slot) : roles.get(player.player_slot) === role)
          .sort((a, b) => Number(b.isRadiant) - Number(a.isRadiant) || a.player_slot - b.player_slot);
        if (!players.length) return null;
        return <section key={role} style={{ marginTop: 16 }}>
          <h3>{role === "unknown" ? strings.laning_unknown_role : roleLabels[role as LaneRole]}</h3>
          <div className="table-scroll"><table>
            <thead><tr><th>{strings.th_players}</th>{minutes.map((minute) => <th className="last-hits" key={minute}><span className="minute-heading"><AccessTimeIcon aria-hidden="true" />{minute}</span></th>)}</tr></thead>
            <tbody>{players.map((player) => <tr key={player.player_slot}><td><span className="player-identity">{renderPlayer(player)}</span></td>{minutes.map((minute) => {
              const value = getStatAtMinute(player, "lh_t", minute);
              const max = Math.max(1, ...match.players.map((p) => getStatAtMinute(p, "lh_t", minute) ?? 0));
              return <td className="last-hits" key={minute} style={{ background: value === null ? undefined : `rgba(110, 190, 120, ${value / max * 0.65})` }}>{formatStat(value)}</td>;
            })}</tr>)}</tbody>
            {role !== "unknown" && <tfoot><tr><td>{strings.laning_difference}</td>{minutes.map((minute) => {
              const radiant = players.filter((player) => player.isRadiant);
              const dire = players.filter((player) => !player.isRadiant);
              const radiantValue = radiant.length === 1 ? getStatAtMinute(radiant[0], "lh_t", minute) : null;
              const direValue = dire.length === 1 ? getStatAtMinute(dire[0], "lh_t", minute) : null;
              const difference = radiantValue !== null && direValue !== null ? radiantValue - direValue : null;
              return <td className="last-hits" key={minute}>{difference === null ? "—" : difference === 0 ? "0" : <SummaryTeam $radiant={difference > 0}>
                {difference > 0 ? <IconRadiant width="14" height="14" /> : <IconDire width="14" height="14" />}+{formatStat(Math.abs(difference))}
              </SummaryTeam>}</td>;
            })}</tr></tfoot>}
          </table></div>
        </section>;
      })}
    </TeamTable>
  </PageSection>;
};

export default LastHitsTable;
