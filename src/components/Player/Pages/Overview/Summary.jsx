/* global API_HOST */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
  isRadiant,
  sum,
  formatSeconds,
  abbreviateNumber,
} from 'utility';
import heroes from 'dotaconstants/build/heroes.json';
import strings from 'lang';
import { MAX_MATCHES_ROWS } from './Overview';
import styles from './Summary.css';

const SummOfRecMatches = ({ matchesData }) => {
  // initial values
  const data = {
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
  const computed = {};

  let winrate = 0;

  const dataKeys = Object.keys(data);

  const numRows = Math.min(MAX_MATCHES_ROWS, matchesData.length);

  for (let i = 0; i < numRows; i += 1) {
    dataKeys.map((key) => {
      if (key === 'wins') {
        data.wins.push(matchesData[i].radiant_win === isRadiant(matchesData[i].player_slot));
      } else {
        data[key].push(matchesData[i][key]);
      }

      return null;
    });
  }

  dataKeys.map((key) => {
    if (key !== 'wins') {
      const avg = data[key].reduce(sum, 0) / numRows;
      const max = Math.max(...data[key]);
      const maxMatch = matchesData.find(match => match[key] === max) || {};

      let color;

      switch (key) {
        case 'kills':
          color = 'green';
          break;
        case 'deaths':
          color = 'red';
          break;
        case 'assists':
          color = 'lightGray';
          break;
        case 'gold_per_min':
          color = 'golden';
          break;
        default:
          color = false;
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

  winrate = Number((data.wins
  .filter(Boolean)
  .reduce(sum, 0) * 100 / numRows)
    .toFixed(2));

  return (
    <div>
      <ul>
        {winrate
          ? <li>
            <span>{strings.th_winrate}</span>
            <p>{winrate}%</p>
          </li>
          : null
        } {Object.keys(computed).map((key) => {
          const c = computed[key];

          if (c.avg) {
            const hero = heroes[c.max.heroId] || {};
            return (
              <li key={key}>
                <span>{strings[`heading_${key}`]}</span>
                <p style={{ color: styles[c.color] }}>
                  {key === 'duration' ? formatSeconds(c.avg) : abbreviateNumber(c.avg)}
                  &nbsp;
                  <span>{key === 'duration' ? formatSeconds(c.max.value) : abbreviateNumber(c.max.value)}
                    <Link to={`/matches/${c.max.matchId}`}>
                      <img src={`${API_HOST}${hero.icon}`} alt={hero.localized_name} />
                    </Link>
                  </span>
                </p>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </div>
  );
};

SummOfRecMatches.propTypes = {
  matchesData: PropTypes.object,
};

export default SummOfRecMatches;
