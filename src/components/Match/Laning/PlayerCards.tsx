/**
 * @file Player Cards.
 * @description Alternative responsive player-card layout grouped by team with laning stats and heatmap selection.
 */

import React from "react";
import { heroes } from "dotaconstants";
import config from "../../../config";
import { getPlayerIdentity, getLevelAtMinute, formatStat, getPlayerRoles, getRoleLabels } from "./laning.utils";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./PlayerCards.module.css";


import { StyledLineWinnerSpan } from "../StyledMatch";

import { PlayerCard, PlayerHeader, Stats } from "./StyledLaneMatchups";

type PlayerCardsProps = {
  match: Match;
  selectedPlayer: number;
  onSelectPlayer: (slot: number) => void;
};

/**
 * Alternative laning layout displaying a responsive player-card grid for each team.
 * @param props Match data, the selected player slot, and a heatmap selection callback.
 * @returns Team grids containing minute-ten player statistics and lane-win indicators.
 */
const PlayerCards = ({ match, selectedPlayer, onSelectPlayer }: PlayerCardsProps) => {
  const strings = useStrings();
  const labels = getRoleLabels(strings);
  const roles = getPlayerRoles(match.players);

  /**
   * Renders a selectable player card with minute-ten statistics.
   * @param player Player whose identity and stats are displayed.
   * @returns A card connected to the parent’s selection callback.
   */
  const renderPlayer = (player: MatchPlayer) => {
    const hero = heroes[player.hero_id];
    const role = roles.get(player.player_slot);
    const denies = (player as MatchPlayer & { dn_t?: number[] }).dn_t?.[10];
    return (
      <PlayerCard key={player.player_slot} $selected={selectedPlayer === player.player_slot}>
        <PlayerHeader>
          <input type="radio" name="laning-player" checked={selectedPlayer === player.player_slot} onChange={() => onSelectPlayer(player.player_slot)} />
          {hero && <img src={config.VITE_IMAGE_CDN + hero.icon} alt="" width={32} height={32} />}
          <div>
            <strong>{getPlayerIdentity(player, strings).playerName}</strong>
            <small>{hero?.localized_name ?? strings.general_no_hero} • {role ? labels[role] : strings.laning_unknown_role}</small>
          </div>
          {(player as MatchPlayer & { line_win?: boolean }).line_win && (
            <StyledLineWinnerSpan title={strings.th_win_lane}>{strings.laning_won}</StyledLineWinnerSpan>
          )}
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
    {[true, false].map((isRadiant) => (
      <section className={styles.teamSection} key={String(isRadiant)}>
        <h3>{isRadiant ? strings.general_radiant : strings.general_dire}</h3>
        <div className={styles.playerGrid}>
          {match.players.filter((player) => player.isRadiant === isRadiant).map(renderPlayer)}
        </div>
      </section>
    ))}
  </>;
};

export default PlayerCards;
