/**
 * @file Role Comparisons.
 * @description Alternative role-based comparison layout pairing opposing heroes and showing minute-ten advantages.
 */

import { formatTemplateToString } from "../../../utility";
import React from "react";
import { heroes } from "dotaconstants";
import config from "../../../config";
import { getPlayerIdentity, getLevelAtMinute, formatStat, getLaningRoles, LaneRole, getRoleLabels } from "./laning.utils";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./RoleComparisons.module.css";



import { Sides, PlayerCard, PlayerHeader, Stats } from "./StyledLaneMatchups";

type RoleComparisonsProps = {
  match: Match;
  selectedPlayer: number;
  onSelectPlayer: (slot: number) => void;
};

/**
 * Alternative laning layout pairing Radiant and Dire players by inferred role.
 * Shows minute-ten gold and level advantages, with unassigned players in a separate group.
 * @param props Match data, the selected player slot, and a selection callback.
 * @returns Role comparison rows with selectable player cards.
 */
const RoleComparisons = ({ match, selectedPlayer, onSelectPlayer }: RoleComparisonsProps) => {
  const strings = useStrings();
  const labels = getRoleLabels(strings);
  const radiant = getLaningRoles(match.players, true);
  const dire = getLaningRoles(match.players, false);
  const assigned = new Set([...Object.values(radiant), ...Object.values(dire)].map((player) => player.player_slot));

  /**
   * Renders a selectable player card with minute-ten statistics.
   * @param player Player whose identity and stats are displayed.
   * @returns A card connected to the parent’s selection callback.
   */
  const renderPlayer = (player: MatchPlayer) => {
    const hero = heroes[player.hero_id];
    const denies = (player as MatchPlayer & { dn_t?: number[] }).dn_t?.[10];
    return (
      <PlayerCard key={player.player_slot} $selected={selectedPlayer === player.player_slot}>
        <PlayerHeader>
          <input type="radio" name="laning-player" checked={selectedPlayer === player.player_slot} onChange={() => onSelectPlayer(player.player_slot)} />
          {hero && <img src={config.VITE_IMAGE_CDN + hero.icon} alt="" width={32} height={32} />}
          <div>
            <strong>{getPlayerIdentity(player, strings).playerName}</strong>
            <small>{hero?.localized_name ?? strings.general_no_hero} • {player.isRadiant ? strings.general_radiant : strings.general_dire}</small>
          </div>
        </PlayerHeader>
        <Stats>
          <div><dt>{strings.th_level_ten}</dt><dd>{formatStat(getLevelAtMinute(player))}</dd></div>
          <div><dt>{strings.th_net_worth_ten}</dt><dd>{formatStat(player.gold_t?.[10])}</dd></div>
          <div><dt>{strings.th_lhten}</dt><dd>{formatStat(player.lh_t?.[10])}</dd></div>
          <div><dt>{strings.th_dnten}</dt><dd>{formatStat(denies)}</dd></div>
        </Stats>
      </PlayerCard>
    );
  };

  return <>
    {(Object.keys(labels) as LaneRole[]).map((role) => {
      const radiantPlayer = radiant[role];
      const direPlayer = dire[role];
      const goldDifference = Number.isFinite(radiantPlayer?.gold_t?.[10]) && Number.isFinite(direPlayer?.gold_t?.[10])
        ? radiantPlayer!.gold_t[10] - direPlayer!.gold_t[10] : null;
      const radiantLevel = getLevelAtMinute(radiantPlayer);
      const direLevel = getLevelAtMinute(direPlayer);
      const levelDifference = radiantLevel !== null && direLevel !== null ? radiantLevel - direLevel : null;
      return (
        <section className={styles.comparison} key={role}>
          <h3>{labels[role]}</h3>
          <p className={styles.difference}>
            {[{ value: goldDifference, unit: strings.laning_gold }, { value: levelDifference, unit: strings.laning_levels }].map(({ value, unit }) => (
              <span key={unit}>
                {value === null ? `${unit}: ${strings.laning_unavailable}` : (
                  <span className={`${styles.lead} ${value === 0 ? styles.leadTied : value > 0 ? styles.leadPositive : ""}`}>
                    {value === 0 ? formatTemplateToString(strings.laning_equal, { unit }) : formatTemplateToString(strings.laning_lead_margin, {
                      team: value > 0 ? strings.general_radiant : strings.general_dire,
                      value: Math.abs(value).toLocaleString("en-US"), unit,
                    })}
                  </span>
                )}
              </span>
            ))}
          </p>
          <Sides>
            <div>{radiantPlayer ? renderPlayer(radiantPlayer) : strings.laning_unknown_role}</div>
            <div>{direPlayer ? renderPlayer(direPlayer) : strings.laning_unknown_role}</div>
          </Sides>
        </section>
      );
    })}
    {match.players.some((player) => !assigned.has(player.player_slot)) && (
      <section className={styles.comparison}>
        <h3>{strings.laning_unknown_role}</h3>
        <Sides>{match.players.filter((player) => !assigned.has(player.player_slot)).map(renderPlayer)}</Sides>
      </section>
    )}
  </>;
};

export default RoleComparisons;
