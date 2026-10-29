/**
 * @file Hero Comparison.
 * @description Compares selected opposing heroes at minute ten using stacked bar charts and an optional same-role selection lock.
 */

import {
  formatTemplate,
  formatTemplateToString,
  localStorageKeys,
} from "../../../utility";
import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import constants from "../../constants";
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
import { getReplayKDA } from "./replay.utils";
import Heading from "../../Heading/Heading";
import {
  getStatAtMinute,
  getLevelAtMinute,
  formatStat,
  StatPlayer,
  HistoryField,
  rolePositions,
  getPlayerRoles,
  getPlayerIdentity,
  LaneRole,
} from "./laning.utils";
import { TableCaption, ReplaySummary } from "./StyledLaning";
import {
  HeroMenus,
  HeroComparisonTooltip,
  HeroMenu,
  SameRoleToggle,
  ComparisonLead,
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
  const [opposingRolesOnly, setOpposingRolesOnly] = useState(false);
  const rolesLocked = sameRolesOnly || opposingRolesOnly;
  const opposingRoles: Record<LaneRole, LaneRole> = {
    carry: "offlane", offlane: "carry", midlane: "midlane",
    hardSupport: "softSupport", softSupport: "hardSupport",
  };
  const opponentRole = (role: LaneRole | undefined) =>
    role && opposingRolesOnly ? opposingRoles[role] : role;
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
      opponents.some((opponent) => roles.get(opponent.player_slot) === opponentRole(role))
    );
  };
  const matchingRadiant = radiantPlayers.filter((player) =>
    hasOpponent(player, direPlayers),
  );
  const matchingDire = direPlayers.filter((player) =>
    hasOpponent(player, radiantPlayers),
  );
  const radiantOptions = rolesLocked ? matchingRadiant : radiantPlayers;
  const direOptions = rolesLocked ? matchingDire : direPlayers;
  const radiant =
    radiantOptions.find((player) => player.player_slot === radiantSlot) ??
    radiantOptions[0];
  const dire = rolesLocked
    ? direOptions.find(
        (player) =>
          radiant &&
          roles.get(player.player_slot) === opponentRole(roles.get(radiant.player_slot)),
      )
    : (direOptions.find((player) => player.player_slot === direSlot) ??
      direOptions[0]);
  /**
   * Selects a Radiant hero and, in same-role mode, synchronizes the Dire selection.
   * @param slot Selected Radiant player slot.
   */
  const selectRadiant = (slot: number) => {
    setRadiantSlot(slot);
    if (rolesLocked)
      setDireSlot(
        direOptions.find(
          (player) => roles.get(player.player_slot) === opponentRole(roles.get(slot)),
        )?.player_slot ?? null,
      );
  };
  /**
   * Selects a Dire hero and, in same-role mode, synchronizes the Radiant selection.
   * @param slot Selected Dire player slot.
   */
  const selectDire = (slot: number) => {
    setDireSlot(slot);
    if (rolesLocked)
      setRadiantSlot(
        radiantOptions.find(
          (player) => roles.get(player.player_slot) === opponentRole(roles.get(slot)),
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
            if (event.target.checked) setOpposingRolesOnly(false);
            setRadiantSlot(radiant?.player_slot ?? null);
            setDireSlot(dire?.player_slot ?? null);
          }}
        />
        {strings.laning_same_roles_only}
      </SameRoleToggle>
      <SameRoleToggle>
        <Switch
          size="small"
          checked={opposingRolesOnly}
          onChange={(event) => {
            setOpposingRolesOnly(event.target.checked);
            if (event.target.checked) setSameRolesOnly(false);
            setRadiantSlot(radiant?.player_slot ?? null);
            setDireSlot(dire?.player_slot ?? null);
          }}
        />
        Opposing lane roles only
      </SameRoleToggle>
      {opposingRolesOnly && <TableCaption>Carry vs Offlane, Hard Support vs Soft Support, and Midlane vs Midlane.</TableCaption>}
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
        <div className="comparison-charts">
        {metrics.map((metric) => {
          const hasValues = metric.radiant !== null && metric.dire !== null;
          const difference = hasValues ? metric.radiant! - metric.dire! : null;
          const averageMagnitude = hasValues
            ? (Math.abs(metric.radiant!) + Math.abs(metric.dire!)) / 2 : null;
          const percentageDifference = difference === null || averageMagnitude === null
            ? null : averageMagnitude === 0 ? 0 : Math.abs(difference) / averageMagnitude * 100;
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
                  <small>{strings.general_radiant}</small>
                  <strong>{formatStat(metric.radiant)}</strong>
                </span>
                {difference === null ? (
                  <span>{strings.laning_unavailable}</span>
                ) : (
                  <ComparisonLead className={metric.summaryKey} $difference={difference}>
                    {difference === 0 ? (
                      <>{strings.laning_tied} <small>(0%)</small></>
                    ) : (
                      <>
                        <strong>
                          {Math.abs(difference).toLocaleString("en-US")}
                        </strong>
                        <small title={strings.laning_percentage_difference_hint}>
                          ({percentageDifference === null ? "—" : `${percentageDifference.toFixed(1)}%`})
                        </small>
                      </>
                    )}
                  </ComparisonLead>
                )}
                <span>
                  <small>{strings.general_dire}</small>
                  <strong>{formatStat(metric.dire)}</strong>
                </span>
              </MetricValues>
              <div role="img" aria-label={`${metric.label}: ${strings.general_radiant} ${formatStat(metric.radiant)}, ${strings.general_dire} ${formatStat(metric.dire)}`}>
                <ResponsiveContainer width="100%" height={24}>
                  <BarChart layout="vertical" data={[{ radiant: metric.radiant, dire: metric.dire }]} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <XAxis type="number" hide domain={[0, "dataMax"]} />
                    <YAxis type="category" hide />
                    <Tooltip cursor={false} wrapperStyle={{ zIndex: 1500 }} content={({ active }) => active ? (
                      <HeroComparisonTooltip>
                        <div className="tooltip-heading"><span>{metric.label}</span><time>10:00</time></div>
                        {[radiant, dire].map((player, index) => {
                          const identity = player && getPlayerIdentity(player, strings);
                          return <div className="tooltip-player" key={index}>
                            {identity?.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt="" width={36} height={36} />}
                            <div className="tooltip-identity"><span>{identity?.heroName ?? strings.general_no_hero}</span><small>{index === 0 ? strings.general_radiant : strings.general_dire}{identity && ` · ${identity.playerName}`}</small></div>
                            <strong style={{ color: index === 0 ? constants.colorSuccess : constants.colorDanger }}>{formatStat(index === 0 ? metric.radiant : metric.dire)}</strong>
                          </div>;
                        })}
                        <div className="tooltip-lead">{difference === null ? strings.laning_unavailable : difference === 0 ? strings.laning_tied : <>{(difference > 0 ? radiant : dire) ? heroes[(difference > 0 ? radiant : dire)!.hero_id]?.localized_name : strings.general_no_hero} leads by <strong>{formatStat(Math.abs(difference))}</strong>{percentageDifference !== null && <> ({percentageDifference.toFixed(1)}%)</>}</>}</div>
                      </HeroComparisonTooltip>
                    ) : null} />
                    <Bar dataKey="radiant" name={strings.general_radiant} stackId="comparison" fill={constants.colorSuccess} barSize={5} radius={[3, 0, 0, 3]} isAnimationActive={false} />
                    <Bar dataKey="dire" name={strings.general_dire} stackId="comparison" fill={constants.colorDanger} barSize={5} radius={[0, 3, 3, 0]} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </MetricRow>
          );
        })}
        </div>
        <ReplaySummary><MetricSummary style={{ margin: 0, fontSize: "inherit", color: "inherit", width: "100%" }}>
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
            {(() => {
              const [radiantKills, radiantDeaths] = match.duration >= 600 ? getReplayKDA(radiant, 10) : [null, null];
              const [direKills, direDeaths] = match.duration >= 600 ? getReplayKDA(dire, 10) : [null, null];
              if (radiantKills === null || radiantDeaths === null || direKills === null || direDeaths === null) {
                return <li>Kills and deaths comparison unavailable.</li>;
              }
              const radiantWins = radiantKills > direKills || (radiantKills === direKills && radiantDeaths <= direDeaths);
              const killDifference = Math.abs(radiantKills - direKills);
              const deathDifference = radiantWins ? radiantDeaths - direDeaths : direDeaths - radiantDeaths;
          if (killDifference === 0 && deathDifference === 0) return null;
              return <li><div className="summary-item"><span>{renderHero(radiantWins ? radiant : dire)} has {killDifference !== 0 && <strong className="summary-keyword">{formatStat(killDifference)} more kills</strong>}{killDifference !== 0 && deathDifference !== 0 && " and "}{deathDifference !== 0 && <strong className="summary-keyword">{formatStat(Math.abs(deathDifference))} {deathDifference > 0 ? "more" : "less"} deaths</strong>}.</span></div></li>;
            })()}
          </ul>
        </MetricSummary></ReplaySummary>
      </MetricList>
    </>
  );
};

export default HeroComparison;
