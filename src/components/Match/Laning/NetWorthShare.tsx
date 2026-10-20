/**
 * @file Net Worth Share.
 * @description Shows sorted hero shares of team net worth with stacked bars, player lists, and segment tooltips.
 */

import { formatTemplateToString } from "../../../utility";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import Heading from "../../Heading/Heading";
import {
  getRoleLabels,
  getNetWorthShares,
  getPlayerIdentity,
  getPlayerRoles,
} from "./laning.utils";
import { IconRadiant, IconDire } from "../../Icons";
import {
  Teams,
  Team,
  TeamDifference,
  Note,
  HeroName,
  GoldValue,
  ColorMarker,
  TeamTotal,
  StackedBar,
  ShareSegment,
  HeroDetails,
  HeroRole,
  ShareTooltipContent,
  ShareTooltipHeader,
  ShareTooltipStats,
} from "./StyledNetWorthShare";

/**
 * Shows each hero's share of their team's net worth as a stacked bar and sorted list.
 * Uses minute ten, or the final completed minute of a shorter match. A team requires
 * five valid nonnegative values and a positive total before percentages are displayed.
 * @param props Match data containing gold histories and player identities.
 * @returns Radiant and Dire share cards with segment tooltips and translated role labels.
 */
const NetWorthShare = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const playerRoles = getPlayerRoles(match.players);
  const roleLabels = getRoleLabels(strings);
  const minute = Math.min(10, Math.floor(match.duration / 60));

  const radiant = getNetWorthShares(match.players, true, minute);
  const dire = getNetWorthShares(match.players, false, minute);
  const teamDifference =
    radiant.total !== null && dire.total !== null
      ? radiant.total - dire.total
      : null;

  return (
    <>
      <Heading title={strings.laning_team_share_heading} />
      <Note>
        {formatTemplateToString(strings.laning_share_minute, { minute })}
      </Note>
      <Teams>
        {[true, false].map((isRadiant) => {
          const distribution = isRadiant ? radiant : dire;
          const total = distribution.total ?? 0;
          const difference =
            teamDifference === null
              ? null
              : isRadiant
                ? teamDifference
                : -teamDifference;
          const data = distribution.shares.map((entry) => {
            const identity = getPlayerIdentity(entry.player, strings);
            const role = playerRoles.get(entry.slot);
            return {
              ...entry,
              ...identity,
              name: identity.heroName,
              roleLabel: role ? roleLabels[role] : strings.laning_unknown_role,
            };
          });
          return (
            <Team key={String(isRadiant)}>
              <h3>
                {isRadiant ? (
                  <IconRadiant width="22" height="22" />
                ) : (
                  <IconDire width="22" height="22" />
                )}
                {isRadiant ? strings.general_radiant : strings.general_dire}
                {difference !== null && difference > 0 && (
                  <TeamDifference $difference={difference}>
                    +{difference.toLocaleString("en-US")} {strings.laning_gold}
                  </TeamDifference>
                )}
              </h3>
              {total > 0 ? (
                <>
                  <TeamTotal>
                    <img
                      src="/assets/images/dota2/gold.png"
                      alt=""
                      width={16}
                      height={16}
                    />
                    {total.toLocaleString("en-US")} {strings.laning_gold}
                  </TeamTotal>
                  <StackedBar aria-label={strings.laning_team_share_heading}>
                    {data.map((entry) => (
                      <Tooltip
                        key={entry.slot}
                        arrow
                        describeChild
                        slotProps={{
                          tooltip: {
                            sx: {
                              p: 0,
                              bgcolor: "#111827",
                              color: "#f1f5f9",
                              border: "1px solid #374151",
                              borderRadius: "10px",
                              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                              maxWidth: 300,
                            },
                          },
                          arrow: { sx: { color: "#111827" } },
                        }}
                        title={
                          <ShareTooltipContent>
                            <ShareTooltipHeader>
                              {entry.icon && (
                                <img
                                  src={config.VITE_IMAGE_CDN + entry.icon}
                                  alt=""
                                  width={32}
                                  height={32}
                                />
                              )}
                              <div>
                                <strong>{entry.name}</strong>
                                <span>{entry.roleLabel}</span>
                              </div>
                            </ShareTooltipHeader>
                            <ShareTooltipStats>
                              <GoldValue>
                                <img
                                  src="/assets/images/dota2/gold.png"
                                  alt=""
                                  width={16}
                                  height={16}
                                />
                                {entry.value.toLocaleString("en-US")}{" "}
                                {strings.laning_gold}
                              </GoldValue>
                              <span>
                                {formatTemplateToString(
                                  strings.laning_team_share,
                                  { percent: entry.percentage.toFixed(1) },
                                )}
                              </span>
                            </ShareTooltipStats>
                          </ShareTooltipContent>
                        }
                      >
                        <ShareSegment
                          $color={entry.color}
                          $percentage={entry.percentage}
                          role="meter"
                          aria-label={entry.name}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={entry.percentage}
                          aria-valuetext={`${entry.percentage.toFixed(1)}%`}
                          tabIndex={0}
                        >
                          {entry.percentage >= 12 &&
                            `${entry.percentage.toFixed(1)}%`}
                        </ShareSegment>
                      </Tooltip>
                    ))}
                  </StackedBar>
                  <ul>
                    {data.map((entry) => {
                      return (
                        <li key={entry.slot}>
                          <ColorMarker $color={entry.color} />
                          {entry.icon && (
                            <img
                              src={config.VITE_IMAGE_CDN + entry.icon}
                              alt=""
                              width={24}
                              height={24}
                            />
                          )}
                          <HeroDetails>
                            <HeroName
                              title={entry.playerName}
                              style={{ color: entry.color }}
                            >
                              {entry.playerName}
                            </HeroName>
                            <HeroRole>
                              {entry.name} • {entry.roleLabel}
                            </HeroRole>
                          </HeroDetails>
                          <GoldValue>
                            {entry.value.toLocaleString("en-US")}
                          </GoldValue>
                          <strong>{entry.percentage.toFixed(1)}%</strong>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <Note>{strings.laning_unavailable}</Note>
              )}
            </Team>
          );
        })}
      </Teams>
    </>
  );
};

export default NetWorthShare;
