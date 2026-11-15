import React from "react";
import { heroes } from "dotaconstants";
import ReactTooltip from "react-tooltip";
import { abbreviateNumber } from "../../utility";
import { IconRadiant, IconDire } from "../Icons";
import constants from "../constants";
import HeroImage from "../Visualizations/HeroImage";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./CrossTable.module.css";

const CrossTable = ({
  match,
  field1,
  field2,
}: {
  match: Match;
  field1: keyof MatchPlayer;
  field2: keyof MatchPlayer;
}) => {
  const strings = useStrings();
  return (
    <div className={styles.styledDiv}>
      <table>
        <tbody>
          <tr>
            <td />
            {match.players
              .slice(match.players.length / 2, match.players.length)
              .map((player) => (
                <td key={player.hero_id}>
                  <div className={styles.hero}>
                    {heroes[player.hero_id] && (
                      <HeroImage
                        id={player.hero_id}
                        isIcon
                        data-tip={
                          heroes[player.hero_id] &&
                          heroes[player.hero_id].localized_name
                        }
                      />
                    )}
                  </div>
                </td>
              ))}
            <td>
              <div className={styles.team}>
                <IconDire data-tip={strings.general_dire} />
              </div>
            </td>
          </tr>
          {match.players.slice(0, match.players.length / 2).map((player) => (
            <tr key={player.hero_id}>
              <td>
                <div className={styles.hero}>
                  {heroes[player.hero_id] && (
                    <HeroImage
                      id={player.hero_id}
                      isIcon
                      data-tip={
                        heroes[player.hero_id] &&
                        heroes[player.hero_id].localized_name
                      }
                    />
                  )}
                </div>
              </td>
              {match.players
                .slice(match.players.length / 2, match.players.length)
                .map((player2) => {
                  const hero1 = heroes[player.hero_id] || {};
                  const hero2 = heroes[player2.hero_id] || {};
                  const pfield1 = player[field1] || {};
                  const pfield2 = player[field2] || {};
                  const pvalue1 = pfield1[hero2.name] || 0;
                  const pvalue2 = pfield2[hero2.name] || 0;
                  return (
                    <td key={player2.hero_id}>
                      <div
                        data-tip
                        data-for={`${field1}_${field2}_${player.player_slot}_${player2.player_slot}`}
                      >
                        <div
                          className={styles.value1}
                          style={{
                            color:
                              pvalue1 > pvalue2
                                ? constants.primaryTextColor
                                : "",
                          }}
                        >
                          <span>{abbreviateNumber(pvalue1)}</span>
                        </div>
                        <div
                          className={styles.value1}
                          style={{
                            color:
                              pvalue2 > pvalue1
                                ? constants.primaryTextColor
                                : "",
                          }}
                        >
                          <span>{abbreviateNumber(pvalue2)}</span>
                        </div>
                        <ReactTooltip
                          id={`${field1}_${field2}_${player.player_slot}_${player2.player_slot}`}
                          place="top"
                          effect="solid"
                        >
                          {`${hero1.localized_name} → ${hero2.localized_name}: ${pvalue1}`}
                          <br />
                          {`${hero2.localized_name} → ${hero1.localized_name}: ${pvalue2}`}
                        </ReactTooltip>
                      </div>
                    </td>
                  );
                })}
              {(() => {
                const hero1 = heroes[player.hero_id] || {};
                let ptotal1 = 0;
                let ptotal2 = 0;

                match.players
                  .slice(match.players.length / 2, match.players.length)
                  .forEach((player2) => {
                    const hero2 = heroes[player2.hero_id] || {};
                    ptotal1 +=
                      player[field1] && hero2.name in player[field1]
                        ? player[field1][hero2.name]
                        : 0;
                    ptotal2 +=
                      player[field2] && hero2.name in player[field2]
                        ? player[field2][hero2.name]
                        : 0;
                  });

                return (
                  <td key={`${player.hero_id}_totals`}>
                    <div
                      data-tip
                      data-for={`${field1}_${field2}_${player.player_slot}_radiant`}
                    >
                      <div
                        className={styles.value1}
                        style={{
                          color:
                            ptotal1 > ptotal2 ? constants.primaryTextColor : "",
                        }}
                      >
                        <span>{abbreviateNumber(ptotal1)}</span>
                      </div>
                      <div
                        className={styles.value1}
                        style={{
                          color:
                            ptotal2 > ptotal1 ? constants.primaryTextColor : "",
                        }}
                      >
                        <span>{abbreviateNumber(ptotal2)}</span>
                      </div>
                      <ReactTooltip
                        id={`${field1}_${field2}_${player.player_slot}_radiant`}
                        place="top"
                        effect="solid"
                      >
                        {`${hero1.localized_name} → ${strings.general_dire}: ${ptotal1}`}
                        <br />
                        {`${strings.general_dire} → ${hero1.localized_name}: ${ptotal2}`}
                      </ReactTooltip>
                    </div>
                  </td>
                );
              })()}
            </tr>
          ))}
          <tr>
            <td>
              <div className={styles.team}>
                <IconRadiant data-tip={strings.general_radiant} />
              </div>
            </td>
            {match.players
              .slice(match.players.length / 2, match.players.length)
              .map((player) => {
                const hero1 = heroes[player.hero_id] || {};
                let ptotal1 = 0;
                let ptotal2 = 0;

                match.players
                  .slice(0, match.players.length / 2)
                  .forEach((player2) => {
                    const hero2 = heroes[player2.hero_id] || {};
                    ptotal1 +=
                      player[field1] && hero2.name in player[field1]
                        ? player[field1][hero2.name]
                        : 0;
                    ptotal2 +=
                      player[field2] && hero2.name in player[field2]
                        ? player[field2][hero2.name]
                        : 0;
                  });

                return (
                  <td key={`${player.hero_id}_totals`}>
                    <div
                      data-tip
                      data-for={`${field1}_${field2}_${player.player_slot}_dire`}
                    >
                      <div
                        className={styles.value1}
                        style={{
                          color:
                            ptotal2 > ptotal1 ? constants.primaryTextColor : "",
                        }}
                      >
                        <span>{abbreviateNumber(ptotal2)}</span>
                      </div>
                      <div
                        className={styles.value1}
                        style={{
                          color:
                            ptotal1 > ptotal2 ? constants.primaryTextColor : "",
                        }}
                      >
                        <span>{abbreviateNumber(ptotal1)}</span>
                      </div>
                      <ReactTooltip
                        id={`${field1}_${field2}_${player.player_slot}_dire`}
                        place="top"
                        effect="solid"
                      >
                        {`${strings.general_radiant} → ${hero1.localized_name}: ${ptotal2}`}
                        <br />
                        {`${hero1.localized_name} → ${strings.general_radiant}: ${ptotal1}`}
                      </ReactTooltip>
                    </div>
                  </td>
                );
              })}
            {(() => {
              let radiantTotal = 0;
              let direTotal = 0;

              match.players
                .slice(match.players.length / 2, match.players.length)
                .forEach((player) => {
                  const hero = heroes[player.hero_id] || {};
                  match.players
                    .slice(0, match.players.length / 2)
                    .forEach((player2) => {
                      const hero2 = heroes[player2.hero_id] || {};
                      radiantTotal +=
                        player2[field1] && hero.name in player2[field1]
                          ? player2[field1][hero.name]
                          : 0;
                      direTotal +=
                        player[field1] && hero2.name in player[field1]
                          ? player[field1][hero2.name]
                          : 0;
                    });
                });

              return (
                <td>
                  <div data-tip data-for={`${field1}_${field2}_total`}>
                    <div
                      className={styles.value1}
                      style={{
                        color:
                          radiantTotal > direTotal
                            ? constants.primaryTextColor
                            : "",
                      }}
                    >
                      <span>{abbreviateNumber(radiantTotal)}</span>
                    </div>
                    <div
                      className={styles.value1}
                      style={{
                        color:
                          direTotal > radiantTotal
                            ? constants.primaryTextColor
                            : "",
                      }}
                    >
                      <span>{abbreviateNumber(direTotal)}</span>
                    </div>
                    <ReactTooltip
                      id={`${field1}_${field2}_total`}
                      place="top"
                      effect="solid"
                    >
                      {`${strings.general_radiant} → ${strings.general_dire}: ${radiantTotal}`}
                      <br />
                      {`${strings.general_dire} → ${strings.general_radiant}: ${direTotal}`}
                    </ReactTooltip>
                  </div>
                </td>
              );
            })()}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CrossTable;
