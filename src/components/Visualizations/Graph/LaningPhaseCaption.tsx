import React, { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
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

type LaneRole = "carry" | "hardSupport" | "midlane" | "offlane" | "softSupport";

/**
 * Infers roles from match-provided `player.lane` and minute-10 last hits.
 *
 * | Lane | Map    | Radiant                | Dire                   |
 * |------|--------|------------------------|------------------------|
 * | 1    | Bottom | Carry / Hard Support   | Offlane / Soft Support |
 * | 2    | Mid    | Midlane                | Midlane                |
 * | 3    | Top    | Offlane / Soft Support | Carry / Hard Support   |
 *
 * Excluding roamers: a single mid player becomes midlane; side-lane pairs
 * become core/support by higher/lower last hits. Solo side-lane players
 * become cores. One unassigned roamer can fill one missing support role.
 * Ties, missing data, or unusual lanes may leave roles undetermined.
 *
 * `lane_role` differs: 1 = Safe, 2 = Mid, 3 = Off for either team.
 * `player_slot` identifies players, not roles: Radiant 0–4, Dire 128–132.
 */
const getLaningRoles = (
  players: MatchPlayer[],
  isRadiant: boolean,
): Partial<Record<LaneRole, MatchPlayer>> => {
  const team = players.filter(
    (player) => player.isRadiant === isRadiant && !player.is_roaming,
  );
  const roles: Partial<Record<LaneRole, MatchPlayer>> = {};
  const midPlayers = team.filter((player) => player.lane === 2);
  if (midPlayers.length === 1) roles.midlane = midPlayers[0];

  // Physical lanes: Radiant's safe lane is bottom (1), Dire's is top (3).
  const safeLane = isRadiant ? 1 : 3;
  const offLane = isRadiant ? 3 : 1;
  const assignSideLane = (lane: number, core: LaneRole, support: LaneRole) => {
    const lanePlayers = team.filter((player) => player.lane === lane);
    if (lanePlayers.length === 1) {
      roles[core] = lanePlayers[0];
      return;
    }
    if (
      lanePlayers.length !== 2 ||
      lanePlayers.some((player) => !Number.isFinite(player.lh_t?.[10]))
    )
      return;

    lanePlayers.sort((a, b) => b.lh_t[10] - a.lh_t[10]);
    if (lanePlayers[0].lh_t[10] === lanePlayers[1].lh_t[10]) return;
    [roles[core], roles[support]] = lanePlayers;
  };
  assignSideLane(safeLane, "carry", "hardSupport");
  assignSideLane(offLane, "offlane", "softSupport");

  // A roaming support can leave a core alone in their recorded lane.
  // Infer the missing support only when there is exactly one candidate and vacancy.
  const missingSupports = (["hardSupport", "softSupport"] as const).filter(
    (role) => !roles[role],
  );
  const assignedPlayers = new Set(Object.values(roles));
  const roamers = players.filter(
    (player) =>
      player.isRadiant === isRadiant &&
      player.is_roaming &&
      !assignedPlayers.has(player),
  );
  if (missingSupports.length === 1 && roamers.length === 1) {
    roles[missingSupports[0]] = roamers[0];
  }
  return roles;
};

const laningMatchups: { role: LaneRole; enemyRole: LaneRole; label: string }[] =
  [
    { role: "carry", enemyRole: "offlane", label: "Carry : Offlane" },
    {
      role: "hardSupport",
      enemyRole: "softSupport",
      label: "Hard Support : Soft Support",
    },
    { role: "midlane", enemyRole: "midlane", label: "Midlane : Midlane" },
    { role: "offlane", enemyRole: "carry", label: "Offlane : Carry" },
    {
      role: "softSupport",
      enemyRole: "hardSupport",
      label: "Soft Support : Hard Support",
    },
  ];

const LaningPhaseCaption = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const [perspective, setPerspective] = useState<boolean | null>(null);
  const [expanded, setExpanded] = useState(true);
  const isRadiant = perspective ?? match.radiant_win;
  if (match.duration < 600 || typeof match.radiant_win !== "boolean")
    return null;

  const teamRoles = getLaningRoles(match.players, isRadiant);
  const enemyRoles = getLaningRoles(match.players, !isRadiant);
  const renderHero = (player: MatchPlayer | undefined, minute: number) => {
    const hero = player && heroes[player.hero_id];
    const xp = player?.xp_t?.[minute];
    const level = Number.isFinite(xp) ? getHeroLevel(xp!) : null;
    if (!player) return <PhaseHero>Role undetermined</PhaseHero>;
    if (!hero) return <PhaseHero>Unknown hero (ID {player.hero_id})</PhaseHero>;
    return (
      <PhaseHero>
        <img src={config.VITE_IMAGE_CDN + hero.icon} alt="" loading="lazy" />
        {hero.localized_name}
        {level !== null && (
          <HeroLevelBadge
            aria-label={`Level ${level}`}
            title={`Level ${level}`}
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
    { label: "Safe Lane", roles: ["carry", "hardSupport"] },
    { label: "Mid Lane", roles: ["midlane"] },
    { label: "Offlane", roles: ["offlane", "softSupport"] },
  ];
  const renderComparisons = (minute: number, roles: LaneRole[]) =>
    laningMatchups
      .filter(({ role }) => roles.includes(role))
      .map(({ role, enemyRole, label }) => {
        const player = teamRoles[role];
        const enemy = enemyRoles[enemyRole];
        const playerXp = player?.xp_t?.[minute];
        const enemyXp = enemy?.xp_t?.[minute];
        const hasXp = Number.isFinite(playerXp) && Number.isFinite(enemyXp);
        const xpDifference = hasXp ? playerXp! - enemyXp! : 0;
        const playerLevel = hasXp ? getHeroLevel(playerXp!) : 0;
        const enemyLevel = hasXp ? getHeroLevel(enemyXp!) : 0;
        const levelDifference = playerLevel - enemyLevel;
        const [teamRole, opponentRole] = label.split(" : ");
        return (
          <div key={role}>
            <dt>
              <span>
                {teamRole}
                {renderHero(player, minute)}
              </span>
              <span aria-hidden="true">vs</span>
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
                    {Math.abs(levelDifference) === 1 ? "level" : "levels"} (
                    {xpDifference > 0 ? "+" : ""}
                    {xpDifference.toLocaleString()}xp)
                  </LaningXpDifference>{" "}
                  {xpDifference === 0
                    ? "equal to"
                    : xpDifference > 0
                      ? "ahead of"
                      : "behind"}{" "}
                  the enemy
                </>
              ) : (
                "Phase data unavailable"
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
            aria-label={`${expanded ? "Collapse" : "Expand"} Levels Report`}
          >
            {expanded ? (
              <ExpandLessIcon fontSize="small" />
            ) : (
              <ExpandMoreIcon fontSize="small" />
            )}
            Levels Report
          </button>
        </h3>
        <button
          type="button"
          onClick={() => setPerspective(!isRadiant)}
          aria-label={`Switch to ${isRadiant ? strings.general_dire : strings.general_radiant} perspective`}
          title={`Switch to ${isRadiant ? strings.general_dire : strings.general_radiant} perspective`}
        >
          {isRadiant ? strings.general_radiant : strings.general_dire}
          <SwapHorizIcon fontSize="small" />
        </button>
      </PerspectiveHeader>
      {expanded && (
        <>
          <LaningCaptionCard $isRadiant={isRadiant}>
            <h4>
              <AccessTimeIcon fontSize="inherit" />
              Laning phase
            </h4>
            <p>XP and level comparison at minute 10.</p>
            {laneGroups.map((group) => (
              <section key={group.label}>
                <h5>{group.label}</h5>
                <dl>{renderComparisons(10, group.roles)}</dl>
              </section>
            ))}
          </LaningCaptionCard>
        </>
      )}
    </LaningCaptionGrid>
  );
};

export default LaningPhaseCaption;
