/**
 * @file Graph Caption.
 * @description Builds localized lane and role result captions from end-of-laning stats and links to the level calculation source.
 */

import { formatTemplateToString } from "../../../utility";
import React from "react";
import { heroes } from "dotaconstants";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { IconRadiant, IconDire } from "../../Icons";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MuiTooltip from "@mui/material/Tooltip";
import useStrings from "../../../hooks/useStrings.hook";
import { getHeroLevel } from "../../Visualizations/Graph/data";
import { getRoleLabels, GraphMetric, GraphGrouping, RoleSelection } from "./laning.utils";
import { RoleCaption, LevelCaption, LevelSourceLink } from "./StyledGraph";


type GraphCaptionProps = {
  match: Match;
  metric: GraphMetric;
  groupBy: GraphGrouping;
  lane: string;
  role: RoleSelection;
  visiblePlayers: MatchPlayer[];
};

type HistoryField = "gold_t" | "xp_t";

/**
 * Adds a team's sampled values at a given minute, optionally transforming each value.
 *
 * Validate sample availability before calling: missing values must not count as zero.
 * @param players Players belonging to one side of the comparison.
 * @param field Gold or XP history to read.
 * @param minute Index of the minute sample, starting at minute zero.
 * @param transformValue Converts each sample before summing, such as XP to hero level.
 * @returns The combined value for the supplied players.
 */
const sumAtMinute = (
  players: MatchPlayer[],
  field: HistoryField,
  minute: number,
  transformValue: (value: number) => number = (value) => value,
) => players.reduce(
  (total, player) => total + transformValue(player[field][minute]),
  0,
);

/**
 * Describes the selected lane or role at the end of the first ten minutes.
 * Uses the last completed minute for shorter matches and localized fallback text
 * when a comparison lacks data. Level captions also link to the XP threshold source.
 * @returns A caption, or null for a net worth graph grouped by role.
 */
const GraphCaption = ({
  match,
  metric,
  groupBy,
  lane,
  role,
  visiblePlayers,
}: GraphCaptionProps) => {
  const strings = useStrings();
  const captionParts: React.ReactNode[] = [];
  let hasXpValue = false;
  /**
   * Formats a translated caption and keeps styled time, team, and XP values inline.
   * @param template Message from the active language dictionary.
   * @param values Named placeholder replacements.
   * @returns Caption text with markers for the styled values rendered below.
   */
  const formatCaption = (template: string, values: Record<string, string | number> = {}) => {
    if (metric !== "levels") return formatTemplateToString(template, values);
    const formattedValues = { ...values };
    Object.entries(values).forEach(([name, value]) => {
      let content: React.ReactNode;
      if (name === "minute") {
        content = <span className="caption-minute"><AccessTimeIcon aria-hidden="true" />{value}</span>;
      } else if (["team", "radiant", "dire"].includes(name)) {
        content = <strong className={value === strings.general_radiant ? "caption-radiant" : "caption-dire"}>
          {value === strings.general_radiant ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}{value}
        </strong>;
      } else if (name === "xp") {
        hasXpValue = true;
        content = <strong className={`caption-xp ${values.team === strings.general_radiant ? "caption-radiant" : "caption-dire"}`}>
          <TrendingUpIcon aria-hidden="true" />+{value}
        </strong>;
      } else return;
      formattedValues[name] = `\uE000${captionParts.length}\uE001`;
      captionParts.push(content);
    });
    const text = formatTemplateToString(template, formattedValues);
    return values.xp === undefined ? text : text.replace(`+${formattedValues.xp}`, String(formattedValues.xp));
  };
  const roleLabels = getRoleLabels(strings);

  if (metric !== "levels" && groupBy !== "lane") return null;

  // Summarize the end of the laning window, or the final minute of a shorter match.
  const summaryMinute = Math.min(10, Math.floor(match.duration / 60));
  const radiantPlayers = visiblePlayers.filter((player) => player.isRadiant);
  const direPlayers = visiblePlayers.filter((player) => !player.isRadiant);

  /**
   * Checks that both sides have finite samples at the summary minute.
   * @param field History required by the comparison.
   * @param comparingAllPlayers Whether both teams must contain all five players.
   * @returns Whether totals can be calculated without treating missing data as zero.
   */
  const hasComparisonData = (field: HistoryField, comparingAllPlayers: boolean) => {
    if (radiantPlayers.length === 0 || direPlayers.length === 0) return false;

    // Whole-team totals require all five players; lane and role groups can be smaller.
    if (comparingAllPlayers && (radiantPlayers.length !== 5 || direPlayers.length !== 5)) {
      return false;
    }

    return visiblePlayers.every((player) =>
      Number.isFinite(player[field]?.[summaryMinute]),
    );
  };

  /**
   * Compares combined gold or combined hero levels for the selected physical lane.
   * Each hero's XP is converted to a level before calculating the lane's level total.
   * @returns Localized team totals and the lead margin, tie, or missing-data message.
   * @example
   * // English net worth caption for a selected lane:
   * // "At minute 10: Radiant 12,000 vs Dire 10,500 gold. Radiant +1,500 gold."
   * @example
   * // English levels caption for a selected lane:
   * // "At minute 10: Radiant 15 vs Dire 13 combined levels. Radiant +2 levels."
   */
  const getLaneCaption = () => {
    const isNetWorthGraph = metric === "networth";
    const historyField = isNetWorthGraph ? "gold_t" : "xp_t";
    if (!hasComparisonData(historyField, lane === "all")) {
      return formatCaption(strings.laning_insufficient, { minute: summaryMinute });
    }

    // Convert each hero's XP to a level before adding levels together.
    // Converting the lane's combined XP would describe a single imaginary hero.
    const valueToAdd = isNetWorthGraph ? (value: number) => value : getHeroLevel;
    const radiantTotal = sumAtMinute(radiantPlayers, historyField, summaryMinute, valueToAdd);
    const direTotal = sumAtMinute(direPlayers, historyField, summaryMinute, valueToAdd);
    const signedDifference = radiantTotal - direTotal;
    const advantage = Math.abs(signedDifference);
    const totalUnit = (isNetWorthGraph ? strings.laning_gold : strings.laning_combined);
    const advantageUnit = (isNetWorthGraph ? strings.laning_gold : advantage === 1 ? strings.laning_level : strings.laning_levels);

    const result = signedDifference === 0
      ? formatCaption(strings.laning_equal, { unit: totalUnit })
      : formatCaption(strings.laning_lead_margin, {
        team: signedDifference > 0 ? strings.general_radiant : strings.general_dire,
        value: advantage.toLocaleString(),
        unit: advantageUnit,
      });

    return formatCaption(strings.laning_lane_result, {
      minute: summaryMinute,
      radiant: strings.general_radiant,
      dire: strings.general_dire,
      r: radiantTotal.toLocaleString(),
      d: direTotal.toLocaleString(),
      unit: totalUnit,
      result,
    });
  };

  /**
   * Compares XP for matching roles, or total team XP when all roles are selected.
   * XP determines the leader; a role comparison also reports the hero level gap.
   * @returns A localized result, tie, or explanation of why comparison is unavailable.
   * @example
   * // English caption when filtering to carry:
   * // "At minute 10, Radiant — Carry (Sniper) led by +1,635 XP; level difference: 2."
   * @example
   * // English caption when all roles are selected:
   * // "At minute 10, Radiant led by +3,000 total XP."
   * @example
   * // Missing minute-10 samples:
   * // "Insufficient data to compare at minute 10."
   */
  const getLevelCaption = () => {
    // Unknown roles cannot be reliably paired with an opposing player.
    if (role === "unknown") return strings.laning_unknown_comparison;
    if (!hasComparisonData("xp_t", role === "all")) {
      return formatCaption(strings.laning_insufficient, { minute: summaryMinute });
    }

    const radiantXp = sumAtMinute(radiantPlayers, "xp_t", summaryMinute);
    const direXp = sumAtMinute(direPlayers, "xp_t", summaryMinute);
    const xpDifference = radiantXp - direXp;
    if (xpDifference === 0) return formatCaption(strings.laning_tie, { minute: summaryMinute });

    // XP determines the leader even when both heroes are still at the same level.
    const radiantAhead = xpDifference > 0;
    const leadingTeam = radiantAhead ? strings.general_radiant : strings.general_dire;
    const xpAdvantage = Math.abs(xpDifference).toLocaleString();
    if (role === "all") {
      return formatCaption(strings.laning_team_xp, { minute: summaryMinute, team: leadingTeam, xp: xpAdvantage });
    }

    // A determined role has one player per side, unlike a whole-team comparison.
    const leadingPlayer = radiantAhead ? radiantPlayers[0] : direPlayers[0];
    const radiantLevels = sumAtMinute(radiantPlayers, "xp_t", summaryMinute, getHeroLevel);
    const direLevels = sumAtMinute(direPlayers, "xp_t", summaryMinute, getHeroLevel);
    return formatCaption(strings.laning_role_result, {
      minute: summaryMinute,
      team: leadingTeam,
      role: roleLabels[role],
      hero: heroes[leadingPlayer.hero_id]?.localized_name ?? strings.general_no_hero,
      xp: xpAdvantage,
      levels: Math.abs(radiantLevels - direLevels),
    });
  };

  const Caption = metric === "levels" ? LevelCaption : RoleCaption;
  const caption = groupBy === "lane" ? getLaneCaption() : getLevelCaption();
  const captionContent = metric !== "levels" ? caption : caption.split(/(\uE000\d+\uE001|XP)/g).map((part, index) => (
    <React.Fragment key={index}>
      {part.startsWith("\uE000") ? captionParts[Number(part.slice(1, -1))]
        : part === "XP" ? <strong className="caption-xp">{!hasXpValue && <TrendingUpIcon aria-hidden="true" />}{part}</strong> : part}
    </React.Fragment>
  ));

  return (
    <Caption>
      <span>{captionContent}</span>
      {metric === "levels" && (
        <MuiTooltip title={strings.laning_source}>
          <LevelSourceLink
            href="https://liquipedia.net/dota2/Experience"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={strings.laning_source_link}
          >
            <InfoOutlinedIcon style={{ fontSize: 14 }} />
          </LevelSourceLink>
        </MuiTooltip>
      )}
    </Caption>
  );
};

export default GraphCaption;
