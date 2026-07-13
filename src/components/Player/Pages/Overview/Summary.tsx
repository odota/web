import React from "react";
import { Link } from "react-router-dom";
import { heroes } from "dotaconstants";
import styled from "styled-components";
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

const BulletList = styled.ul`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 0.5rem;
`;
const StyledBulletListItem = styled.li`
  margin: 0 !important;
  padding: 8px;
  font-family: ${constants.fontFamilyFuturistic};
`;
const Label = styled.span`
  font-size: 0.7rem;
`;
const StyledLink = styled(Link)<{ color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.color};
  &:hover {
    filter: brightness(1.6);
  }
`;
const StatList = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

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
          color = "lightGray";
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
      <BulletList>
        {winrate ? (
          <StyledBulletListItem>
            <Label>{strings.th_winrate}</Label>
            <p>{winrate}%</p>
          </StyledBulletListItem>
        ) : null}
        {Object.keys(computed).map((key) => {
          const c = computed[key];

          if (c.avg) {
            const hero = heroes[c.max.heroId as keyof Heroes] || {};
            return (
              <StyledBulletListItem key={key}>
                <Label>{strings[`heading_${key}` as keyof Strings]}</Label>
                <StyledLink
                  to={`/matches/${c.max.matchId}`}
                  color={constants[c.color as keyof typeof constants] as string}
                >
                  <StatList>
                    {key === "duration"
                      ? formatSeconds(c.avg)
                      : abbreviateNumber(c.avg)}
                    <span>
                      {key === "duration"
                        ? formatSeconds(c.max.value)
                        : abbreviateNumber(c.max.value)}
                    </span>
                  </StatList>
                  <HeroImage
                    id={String(hero.id)}
                    isIcon
                    alt={hero.localized_name}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </StyledLink>
              </StyledBulletListItem>
            );
          }
          return null;
        })}
      </BulletList>
    </div>
  );
};

export default SummOfRecMatches;
