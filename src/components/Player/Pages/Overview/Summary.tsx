import React from "react";
import { Link } from "react-router-dom";
import { heroes } from "dotaconstants";
import {
  isRadiant,
  sum,
  formatSeconds,
  abbreviateNumber,
} from "../../../../utility";
import { MAX_MATCHES_ROWS } from "./Overview";
import constants from "../../../constants";
import HeroImage from "../../../Visualizations/HeroImage";
import useStrings from "../../../../hooks/useStrings.hook";
import styles from "./Summary.module.css";

const SummOfRecMatches = ({ matchesData }: { matchesData: any[] }) => {
  const strings = useStrings();
  // initial values
  const data: Record<string, any[]> = {
    kills: [],
    deaths: [],
    assists: [],
    gold_per_min: [],
    xp_per_min: [],
    last_hits: [],
    hero_damage: [],
    hero_healing: [],
    tower_damage: [],
    duration: [],
    wins: [],
  };
  const computed: Record<string, any> = {};

  let winrate = 0;

  const dataKeys = Object.keys(data);

  const numRows = Math.min(MAX_MATCHES_ROWS, matchesData.length);

  matchesData.forEach((match) => {
    dataKeys.forEach((key) => {
      if (key === "wins") {
        data.wins.push(match.radiant_win === isRadiant(match.player_slot));
      } else {
        data[key].push(match[key]);
      }
    });
  });

  dataKeys.map((key) => {
    if (key !== "wins") {
      const avg = data[key].reduce(sum, 0) / numRows;
      const max = Math.max(...data[key]);
      const maxMatch = matchesData.find((match) => match[key] === max) || {};

      let color;

      switch (key) {
        case "kills":
          color = "green";
          break;
        case "deaths":
          color = "red";
          break;
        case "assists":
          color = "colorNeutralTier3";
          break;
        case "gold_per_min":
          color = "golden";
          break;
        default:
          color = "textColorPrimary";
      }

      computed[key] = {
        avg,
        color,
        max: {
          value: max,
          matchId: maxMatch.match_id,
          heroId: maxMatch.hero_id,
        },
      };
    }

    return null;
  });

  winrate = Number(
    ((data.wins.filter(Boolean).reduce(sum, 0) * 100) / numRows).toFixed(2),
  );

  return (
    <div>
      <ul className={styles.bulletList}>
        {winrate ? (
          <li className={styles.styledBulletListItem}>
            <span className={styles.label}>{strings.th_winrate}</span>
            <p>{winrate}%</p>
          </li>
        ) : null}
        {Object.keys(computed).map((key) => {
          const c = computed[key];

          if (c.avg) {
            const hero = heroes[c.max.heroId as keyof Heroes] || {};
            return (
              <li className={styles.styledBulletListItem} key={key}>
                <span className={styles.label}>
                  {strings[`heading_${key}` as keyof Strings]}
                </span>
                <Link
                  className={styles.styledLink}
                  to={`/matches/${c.max.matchId}`}
                  style={{
                    color: constants[c.color as keyof typeof constants] as string,
                  }}
                >
                  <div className={styles.statList}>
                    {key === "duration"
                      ? formatSeconds(c.avg)
                      : abbreviateNumber(c.avg)}
                  </div>
                  <span>
                    {key === "duration"
                      ? formatSeconds(c.max.value)
                      : abbreviateNumber(c.max.value)}
                  </span>
                  <HeroImage
                    id={String(hero.id)}
                    isIcon
                    alt={hero.localized_name}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default SummOfRecMatches;
