/**
 * @file Lane Matchups.
 * @description Alternative lane-based card layout with opposing players, minute-ten stats, and heatmap selection.
 */

import React from "react";
import { PhysicalLane } from "../../../types/matchResponse";
import { heroes } from "dotaconstants";
import config from "../../../config";
import {
  getPlayerIdentity,
  getLevelAtMinute,
  formatStat,
  getPlayerRoles,
  getRoleLabels,
} from "./laning.utils";
import useStrings from "../../../hooks/useStrings.hook";
import { IconRadiant, IconDire } from "../../Icons";
import { TableSparkline } from "../../Visualizations";
import { StyledLineWinnerSpan } from "../StyledMatch";
import {
  Matchup,
  Sides,
  Side,
  PlayerCard,
  PlayerHeader,
  Stats,
  Trend,
} from "./StyledLaneMatchups";

type LaningPlayer = MatchPlayer & {
  dn_t?: number[];
  lane_efficiency?: number;
  line_win?: boolean;
};

type LaneMatchupsProps = {
  match: Match;
  selectedPlayer: number;
  onSelectPlayer: (slot: number) => void;
};

/**
 * Alternative laning layout grouping players by recorded physical lane.
 * Displays opposing teams side by side with minute-ten stats and lane-win indicators.
 * @param props Match data, the selected player slot, and a heatmap selection callback.
 * @returns Lane cards, including jungle and undetermined groups when present.
 */
const LaneMatchups = ({
  match,
  selectedPlayer,
  onSelectPlayer,
}: LaneMatchupsProps) => {
  const strings = useStrings();
  const roles = getPlayerRoles(match.players);
  const roleLabels = getRoleLabels(strings);
  const groups = [
    { label: strings.laning_top, lanes: [PhysicalLane.Top] },
    { label: strings.laning_mid, lanes: [PhysicalLane.Middle] },
    { label: strings.laning_bottom, lanes: [PhysicalLane.Bottom] },
    { label: strings.laning_jungle, lanes: [PhysicalLane.Jungle] },
    { label: strings.laning_unknown_lane, lanes: [] },
  ];

  return (
    <>
      {groups.map(({ label, lanes }) => {
        const players = (match.players as LaningPlayer[]).filter((player) =>
          lanes.length
            ? lanes.includes(player.lane)
            : ![
                PhysicalLane.Bottom,
                PhysicalLane.Middle,
                PhysicalLane.Top,
                PhysicalLane.Jungle,
              ].includes(player.lane),
        );
        if (!players.length) return null;
        return (
          <Matchup key={label}>
            <h3>{label}</h3>
            <Sides>
              {[true, false].map((isRadiant) => {
                const side = players.filter(
                  (player) => player.isRadiant === isRadiant,
                );
                return (
                  <Side key={String(isRadiant)}>
                    <h4>
                      {isRadiant ? (
                        <IconRadiant width="20" height="20" />
                      ) : (
                        <IconDire width="20" height="20" />
                      )}
                      {isRadiant
                        ? strings.general_radiant
                        : strings.general_dire}
                    </h4>
                    {side.length === 0 && <p>{strings.laning_empty}</p>}
                    {side.map((player) => {
                      const hero = heroes[player.hero_id];
                      const role = roles.get(player.player_slot);
                      const wonLane = player.line_win;
                      return (
                        <PlayerCard
                          key={player.player_slot}
                          $selected={selectedPlayer === player.player_slot}
                        >
                          <PlayerHeader>
                            <input
                              type="radio"
                              name="laning-player"
                              checked={selectedPlayer === player.player_slot}
                              onChange={() =>
                                onSelectPlayer(player.player_slot)
                              }
                            />
                            {hero && (
                              <img
                                src={config.VITE_IMAGE_CDN + hero.icon}
                                alt=""
                                width={32}
                                height={32}
                              />
                            )}
                            <div>
                              <strong>
                                {getPlayerIdentity(player, strings).playerName}
                              </strong>
                              <small>
                                {hero?.localized_name ??
                                  strings.general_no_hero}{" "}
                                •{" "}
                                {role
                                  ? roleLabels[role]
                                  : strings.laning_unknown_role}
                              </small>
                            </div>
                            {wonLane && (
                              <StyledLineWinnerSpan title={strings.th_win_lane}>
                                {strings.laning_won}
                              </StyledLineWinnerSpan>
                            )}
                          </PlayerHeader>
                          <Stats>
                            <div>
                              <dt>{strings.th_level_ten}</dt>
                              <dd>{formatStat(getLevelAtMinute(player))}</dd>
                            </div>
                            <div>
                              <dt>{strings.th_net_worth_ten}</dt>
                              <dd>{formatStat(player.gold_t?.[10])}</dd>
                            </div>
                            <div>
                              <dt>{strings.th_lhten}</dt>
                              <dd>{formatStat(player.lh_t?.[10])}</dd>
                            </div>
                            <div>
                              <dt>{strings.th_dnten}</dt>
                              <dd>{formatStat(player.dn_t?.[10])}</dd>
                            </div>
                            <div>
                              <dt>{strings.th_lane_efficiency}</dt>
                              <dd>
                                {Number.isFinite(player.lane_efficiency)
                                  ? `${(player.lane_efficiency! * 100).toFixed(1)}%`
                                  : "—"}
                              </dd>
                            </div>
                          </Stats>
                          {player.cs_t?.length > 0 && (
                            <Trend>
                              {strings.cs_over_time}
                              <TableSparkline
                                values={player.cs_t}
                                altValues={[]}
                              />
                            </Trend>
                          )}
                        </PlayerCard>
                      );
                    })}
                  </Side>
                );
              })}
            </Sides>
          </Matchup>
        );
      })}
    </>
  );
};

export default LaneMatchups;
