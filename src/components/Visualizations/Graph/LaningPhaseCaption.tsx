/**
 * @file Laning Phase Caption.
 * @description Collapsible minute-ten Levels Report with team perspective switching and lane matchup comparisons.
 */

import { formatTemplateToString } from "../../../utility";
import React, { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { heroes } from "dotaconstants";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import { getHeroLevel } from "./data";
import {
  LaningCaptionGrid,
  PerspectiveHeader,
  LaningCaptionCard,
  LaningXpDifference,
  PhaseHero,
  HeroLevelBadge,
} from "./Styled";

import { getRoleLabels, getLaningRoles, LaneRole } from "../../Match/Laning/laning.utils";


const laningMatchups: { role: LaneRole; enemyRole: LaneRole }[] =
  [
    { role: "carry", enemyRole: "offlane" },
    {
      role: "hardSupport",
      enemyRole: "softSupport",
    },
    { role: "midlane", enemyRole: "midlane" },
    { role: "offlane", enemyRole: "carry" },
    {
      role: "softSupport",
      enemyRole: "hardSupport",
    },
  ];

/**
 * Renders the collapsible Levels Report with minute-ten lane and role matchups.
 * Defaults to the winning team's perspective and allows switching sides.
 * @param props The match containing player XP histories and the match result.
 * @returns The report, or null for short matches or an unknown match result.
 */
const LaningPhaseCaption = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const roleLabels = getRoleLabels(strings);
  const [perspective, setPerspective] = useState<boolean | null>(null);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isRadiant = perspective ?? match.radiant_win;
  if (match.duration < 600 || typeof match.radiant_win !== "boolean")
    return null;

  const teamRoles = getLaningRoles(match.players, isRadiant);
  const enemyRoles = getLaningRoles(match.players, !isRadiant);
  /**
   * Renders a hero and their level at the requested minute.
   * @param player Inferred role occupant, if known.
   * @param minute XP history index.
   * @returns Hero identity and level badge, or a localized fallback.
   */
  const renderHero = (player: MatchPlayer | undefined, minute: number) => {
    const hero = player && heroes[player.hero_id];
    const xp = player?.xp_t?.[minute];
    const level = Number.isFinite(xp) ? getHeroLevel(xp!) : null;
    if (!player) return <PhaseHero>{strings.laning_unknown_role}</PhaseHero>;
    if (!hero) return <PhaseHero>{strings.general_no_hero} (ID {player.hero_id})</PhaseHero>;
    return (
      <PhaseHero>
        <img src={config.VITE_IMAGE_CDN + hero.icon} alt="" loading="lazy" />
        {hero.localized_name}
        {level !== null && (
          <HeroLevelBadge
            aria-label={formatTemplateToString(strings.laning_level_label, { level })}
            title={formatTemplateToString(strings.laning_level_label, { level })}
          >
            {level}
            <span className="milestone-dots" aria-hidden="true">
              {Array.from(
                { length: Math.min(3, Math.floor(level / 6)) },
                (_, index) => (
                  <span key={index} />
                ),
              )}
            </span>
          </HeroLevelBadge>
        )}
      </PhaseHero>
    );
  };
  const laneGroups: { label: string; roles: LaneRole[] }[] = [
    { label: strings.laning_safe, roles: ["carry", "hardSupport"] },
    { label: strings.laning_mid, roles: ["midlane"] },
    { label: strings.laning_off, roles: ["offlane", "softSupport"] },
  ];
  /**
   * Builds role matchup rows from the selected team’s perspective.
   * @param minute Minute at which XP and hero levels are compared.
   * @param roles Roles to include in the lane group.
   * @returns Matchup rows with level and XP differences or unavailable-data text.
   */
  const renderComparisons = (minute: number, roles: LaneRole[]) =>
    laningMatchups
      .filter(({ role }) => roles.includes(role))
      .map(({ role, enemyRole }) => {
        const player = teamRoles[role];
        const enemy = enemyRoles[enemyRole];
        const playerXp = player?.xp_t?.[minute];
        const enemyXp = enemy?.xp_t?.[minute];
        const hasXp = Number.isFinite(playerXp) && Number.isFinite(enemyXp);
        const xpDifference = hasXp ? playerXp! - enemyXp! : 0;
        const playerLevel = hasXp ? getHeroLevel(playerXp!) : 0;
        const enemyLevel = hasXp ? getHeroLevel(enemyXp!) : 0;
        const levelDifference = playerLevel - enemyLevel;
        const teamRole = roleLabels[role];
        const opponentRole = roleLabels[enemyRole];
        return (
          <div key={role}>
            <dt>
              <span>
                {teamRole}
                {renderHero(player, minute)}
              </span>
              <span aria-hidden="true">{strings.laning_vs}</span>
              <span>
                {opponentRole}
                {renderHero(enemy, minute)}
              </span>
            </dt>
            <dd>
              {hasXp ? (
                <>
                  <LaningXpDifference $difference={xpDifference}>
                    {Math.abs(levelDifference)}{" "}
                    {(Math.abs(levelDifference) === 1 ? strings.laning_level : strings.laning_levels)} (
                    {xpDifference > 0 ? "+" : ""}
                    {xpDifference.toLocaleString()}xp)
                  </LaningXpDifference>{" "}
                  {(xpDifference === 0 ? strings.laning_enemy_equal : xpDifference > 0 ? strings.laning_enemy_ahead : strings.laning_enemy_behind)}
                </>
              ) : (
                strings.laning_unavailable
              )}
            </dd>
          </div>
        );
      });

  return (
    <LaningCaptionGrid>
      <PerspectiveHeader>
        <h3>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-label={(expanded ? strings.laning_collapse_report : strings.laning_expand_report)}
          >
            <ExpandMoreIcon fontSize="small" style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: reducedMotion ? "none" : "transform 400ms ease",
            }} />
            {strings.laning_report}
          </button>
        </h3>
        <button
          type="button"
          onClick={() => setPerspective(!isRadiant)}
          aria-label={formatTemplateToString(strings.laning_perspective, { team: isRadiant ? strings.general_dire : strings.general_radiant })}
          title={formatTemplateToString(strings.laning_perspective, { team: isRadiant ? strings.general_dire : strings.general_radiant })}
        >
          {isRadiant ? strings.general_radiant : strings.general_dire}
          <SwapHorizIcon fontSize="small" />
        </button>
      </PerspectiveHeader>
      <Collapse in={expanded} timeout={reducedMotion ? 0 : { enter: 500, exit: 400 }} unmountOnExit>
          <LaningCaptionCard $isRadiant={isRadiant}>
            <h4>
              <AccessTimeIcon fontSize="inherit" />
              {strings.laning_phase}
            </h4>
            <p>{strings.laning_phase_description}</p>
            {laneGroups.map((group) => (
              <section key={group.label}>
                <h5>{group.label}</h5>
                <dl>{renderComparisons(10, group.roles)}</dl>
              </section>
            ))}
          </LaningCaptionCard>
      </Collapse>
    </LaningCaptionGrid>
  );
};

export default LaningPhaseCaption;
