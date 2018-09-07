import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import heroes from 'dotaconstants/build/heroes.json';
import {
  isRadiant,
  sum,
  formatSeconds,
  abbreviateNumber,
} from '../../../../utility';
import { MAX_MATCHES_ROWS } from './Overview';
import constants from '../../../constants';
import HeroImage from '../../../Visualizations/HeroImage';

const SummOfRecMatches = ({ matchesData, strings }) => {
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

  matchesData.forEach((match) => {
    dataKeys.forEach((key) => {
      if (key === 'wins') {
        data.wins.push(match.radiant_win === isRadiant(match.player_slot));
      } else {
        data[key].push(match[key]);
      }
    });
  });

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
          color = 'textColorPrimary';
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
          ?
            <li>
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
                <Link to={`/matches/${c.max.matchId}`}>
                  <p style={{ color: constants[c.color] }}>
                    {key === 'duration' ? formatSeconds(c.avg) : abbreviateNumber(c.avg)}
                  &nbsp;
                    <span>{key === 'duration' ? formatSeconds(c.max.value) : abbreviateNumber(c.max.value)}
                      <HeroImage id={hero.id} isIcon alt={hero.localized_name} />
                    </span>
                  </p>
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

const mapStateToProps = state => ({
  strings: state.app.strings,
});

SummOfRecMatches.propTypes = {
  matchesData: PropTypes.arrayOf(PropTypes.shape({})),
  strings: PropTypes.shape({}),
};

export default connect(mapStateToProps)(SummOfRecMatches);
