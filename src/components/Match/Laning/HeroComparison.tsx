/**
 * @file Hero Comparison.
 * @description Compares selected opposing heroes at minute ten using compact metric bars and an optional same-role selection lock.
 */

import {
  formatTemplate,
  formatTemplateToString,
  localStorageKeys,
} from "../../../utility";
import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import BlockIcon from "@mui/icons-material/Block";
import config from "../../../config";
import { Switch } from "@mui/material";
import { heroes, player_colors as playerColors } from "dotaconstants";
import useLocalStorageBoolean from "../../../hooks/useLocalStorageBoolean";
import useStrings from "../../../hooks/useStrings.hook";
import HeroSelect from "./HeroSelect";
import Heading from "../../Heading/Heading";
import {
  getStatAtMinute,
  getLevelAtMinute,
  formatStat,
  StatPlayer,
  HistoryField,
  rolePositions,
  getPlayerRoles,
} from "./laning.utils";
import { TableCaption } from "./StyledLaning";
import {
  HeroMenus,
  HeroMenu,
  SameRoleToggle,
  ComparisonLead,
  MetricBalance,
  MetricBalanceSide,
  MetricList,
  MetricRow,
  MetricHeading,
  MetricValues,
  MetricSummary,
} from "./StyledHeroComparison";

/**
 * Compares two selected opposing heroes using minute-ten levels, gold, last hits, and denies.
 * Same-role mode synchronizes selections and excludes roles without an opponent.
 * That mode is persisted in localStorage; hero selections remain local to the component.
 * @param props The match whose players can be selected.
 * @returns Hero menus and proportional metric bars, with unavailable values shown explicitly.
 */
const HeroComparison = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const [sameRolesOnly, setSameRolesOnly] = useLocalStorageBoolean(
    localStorageKeys.heroComparisonSameRolesOnly,
    true,
  );
  const [radiantSlot, setRadiantSlot] = useState<number | null>(null);
  const [direSlot, setDireSlot] = useState<number | null>(null);
  const roles = getPlayerRoles(match.players);
  /**
   * Looks up a hero’s inferred position for menu sorting.
   * @returns Position 1–5, or 6 for an undetermined role.
   */
  const position = (player: MatchPlayer) => {
    const role = roles.get(player.player_slot);
    return role ? rolePositions[role] : 6;
  };
  /**
   * Orders players by inferred position, breaking ties by player slot.
   * @returns A comparator result without modifying either player.
   */
  const sortByPosition = (first: MatchPlayer, second: MatchPlayer) =>
    position(first) - position(second) ||
    first.player_slot - second.player_slot;
  const radiantPlayers = match.players
    .filter((player) => player.isRadiant)
    .sort(sortByPosition);
  const direPlayers = match.players
    .filter((player) => !player.isRadiant)
    .sort(sortByPosition);
  // Only include roles with an identified player on both teams in locked mode.
  /**
   * Checks whether the other team has an identified player with the same role.
   * @returns False for undetermined roles or roles without a matching opponent.
   */
  const hasOpponent = (player: MatchPlayer, opponents: MatchPlayer[]) => {
    const role = roles.get(player.player_slot);
    return (
      role !== undefined &&
      opponents.some((opponent) => roles.get(opponent.player_slot) === role)
    );
  };
  const matchingRadiant = radiantPlayers.filter((player) =>
    hasOpponent(player, direPlayers),
  );
  const matchingDire = direPlayers.filter((player) =>
    hasOpponent(player, radiantPlayers),
  );
  const radiantOptions = sameRolesOnly ? matchingRadiant : radiantPlayers;
  const direOptions = sameRolesOnly ? matchingDire : direPlayers;
  const radiant =
    radiantOptions.find((player) => player.player_slot === radiantSlot) ??
    radiantOptions[0];
  const dire = sameRolesOnly
    ? direOptions.find(
        (player) =>
          radiant &&
          roles.get(player.player_slot) === roles.get(radiant.player_slot),
      )
    : (direOptions.find((player) => player.player_slot === direSlot) ??
      direOptions[0]);
  /**
   * Selects a Radiant hero and, in same-role mode, synchronizes the Dire selection.
   * @param slot Selected Radiant player slot.
   */
  const selectRadiant = (slot: number) => {
    setRadiantSlot(slot);
    if (sameRolesOnly)
      setDireSlot(
        direOptions.find(
          (player) => roles.get(player.player_slot) === roles.get(slot),
        )?.player_slot ?? null,
      );
  };
  /**
   * Selects a Dire hero and, in same-role mode, synchronizes the Radiant selection.
   * @param slot Selected Dire player slot.
   */
  const selectDire = (slot: number) => {
    setDireSlot(slot);
    if (sameRolesOnly)
      setRadiantSlot(
        radiantOptions.find(
          (player) => roles.get(player.player_slot) === roles.get(slot),
        )?.player_slot ?? null,
      );
  };
  /** Reads minute-ten data only after the match reaches ten minutes. */
  const valueAtTen = (player: StatPlayer | undefined, field: HistoryField) =>
    match.duration >= 600 ? getStatAtMinute(player, field) : null;
  /** Returns the selected hero's level, preserving unavailable short-match data. */
  const level = (player: MatchPlayer | undefined) =>
    match.duration >= 600 ? getLevelAtMinute(player) : null;
  const metrics = [
    {
      icon: <TrendingUpIcon aria-hidden="true" />,
      summaryKey: "comparison_level",
      label: strings.heading_level,
      radiant: level(radiant),
      dire: level(dire),
    },
    ...(
      [
        [
          "gold_t",
          strings.heading_graph_networth,
          "comparison_gold",
          <img
            src="/assets/images/dota2/gold.png"
            alt=""
            width={16}
            height={16}
          />,
        ],
        [
          "lh_t",
          strings.heading_last_hits,
          "comparison_last_hits",
          <GpsFixedIcon aria-hidden="true" />,
        ],
        [
          "dn_t",
          strings.heading_denies,
          "comparison_denies",
          <BlockIcon aria-hidden="true" />,
        ],
      ] as const
    ).map(([field, label, summaryKey, icon]) => ({
      label,
      summaryKey,
      icon,
      radiant: valueAtTen(radiant, field),
      dire: valueAtTen(dire, field),
    })),
  ];

  const goldMetric = metrics[1];
  const goldDifference =
    goldMetric.radiant !== null && goldMetric.dire !== null
      ? goldMetric.radiant - goldMetric.dire
      : null;

  const renderHero = (player: MatchPlayer | undefined) => {
    const hero = player && heroes[player.hero_id];
    return (
      <span
        className="summary-hero"
        style={{
          color: player
            ? playerColors[
                player.player_slot as unknown as keyof typeof playerColors
              ]
            : undefined,
        }}
      >
        {hero && (
          <img
            src={config.VITE_IMAGE_CDN + hero.icon}
            alt=""
            width={20}
            height={20}
          />
        )}
        {hero?.localized_name ?? strings.general_no_hero}
      </span>
    );
  };

  return (
    <>
      <Heading title={strings.laning_hero_comparison} />
      <TableCaption>{strings.laning_hero_comparison_hint}</TableCaption>
      <SameRoleToggle>
        <Switch
          size="small"
          checked={sameRolesOnly}
          disabled={!matchingRadiant.length}
          onChange={(event) => {
            setSameRolesOnly(event.target.checked);
            setRadiantSlot(radiant?.player_slot ?? null);
            setDireSlot(dire?.player_slot ?? null);
          }}
        />
        {strings.laning_same_roles_only}
      </SameRoleToggle>
      {!matchingRadiant.length && (
        <TableCaption>{strings.laning_no_matching_roles}</TableCaption>
      )}
      <HeroMenus>
        {[
          {
            team: strings.general_radiant,
            players: radiantOptions,
            selected: radiant,
            setSlot: selectRadiant,
          },
          {
            team: strings.general_dire,
            players: direOptions,
            selected: dire,
            setSlot: selectDire,
          },
        ].map(({ team, players, selected, setSlot }) => {
          return (
            <HeroMenu key={team}>
              {team}
              <HeroSelect
                team={team}
                players={players}
                selected={selected}
                roles={roles}
                onChange={setSlot}
              />
            </HeroMenu>
          );
        })}
      </HeroMenus>
      <MetricList>
        {metrics.map((metric) => {
          const hasValues = metric.radiant !== null && metric.dire !== null;
          const difference = hasValues ? metric.radiant! - metric.dire! : null;
          const total = hasValues ? metric.radiant! + metric.dire! : 0;
          const radiantShare = total > 0 ? (metric.radiant! / total) * 100 : 50;
          return (
            <MetricRow key={metric.label}>
              <MetricHeading>
                <h3 className={metric.summaryKey}>
                  {metric.icon}
                  <span>{metric.label}</span>
                </h3>
              </MetricHeading>
              <MetricValues>
                <span>
                  <strong>{formatStat(metric.radiant)}</strong>
                </span>
                {difference === null ? (
                  <span>{strings.laning_unavailable}</span>
                ) : (
                  <ComparisonLead $difference={difference}>
                    {difference === 0 ? (
                      strings.laning_tied
                    ) : (
                      <>
                        <strong>
                          {Math.abs(difference).toLocaleString("en-US")}
                        </strong>
                      </>
                    )}
                  </ComparisonLead>
                )}
                <span>
                  <strong>{formatStat(metric.dire)}</strong>
                </span>
              </MetricValues>
              <MetricBalance
                role="img"
                aria-label={`${metric.label}: ${strings.general_radiant} ${formatStat(metric.radiant)}, ${strings.general_dire} ${formatStat(metric.dire)}`}
              >
                {hasValues && (
                  <>
                    <MetricBalanceSide $radiant $share={radiantShare} />
                    <MetricBalanceSide
                      $radiant={false}
                      $share={100 - radiantShare}
                    />
                  </>
                )}
              </MetricBalance>
            </MetricRow>
          );
        })}
        <MetricSummary>
          <div className="summary-intro">
            {formatTemplate(
              goldDifference
                ? strings.laning_comparison_winner_intro
                : strings.laning_comparison_intro,
              {
                hero: renderHero(
                  goldDifference !== null && goldDifference > 0
                    ? radiant
                    : dire,
                ),
                time: (
                  <span className="summary-time">
                    <AccessTimeIcon aria-hidden="true" />
                    <time>10:00</time>
                  </span>
                ),
              },
            )}
          </div>
          <ul>
            {metrics.map((metric) => {
              const difference =
                metric.radiant !== null && metric.dire !== null
                  ? metric.radiant - metric.dire
                  : null;
              return (
                <li key={metric.summaryKey}>
                  <div className="summary-item">
                    <span>
                      {formatTemplate(
                        difference === null
                          ? strings.laning_comparison_missing
                          : difference === 0
                            ? strings.laning_comparison_tied
                            : strings[
                                `laning_${metric.summaryKey}` as keyof Strings
                              ],
                        {
                          hero: renderHero(
                            difference !== null && difference > 0
                              ? radiant
                              : dire,
                          ),
                          opponent: renderHero(
                            difference !== null && difference > 0
                              ? dire
                              : radiant,
                          ),
                          metric: (
                            <span
                              className={`summary-keyword ${metric.summaryKey}`}
                            >
                              {metric.icon} {metric.label}
                            </span>
                          ),
                          advantage: (
                            <span
                              className={`summary-keyword ${metric.summaryKey}`}
                            >
                              {metric.icon}{" "}
                              {formatTemplateToString(
                                strings.laning_comparison_level_advantage,
                                {
                                  value:
                                    difference === null
                                      ? ""
                                      : formatStat(Math.abs(difference)),
                                },
                              )}
                            </span>
                          ),
                          value: (
                            <span
                              className={`summary-keyword ${metric.summaryKey}`}
                            >
                              {metric.icon}{" "}
                              {difference === null
                                ? ""
                                : formatStat(Math.abs(difference))}
                            </span>
                          ),
                        },
                      )}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </MetricSummary>
      </MetricList>
    </>
  );
};

export default HeroComparison;
