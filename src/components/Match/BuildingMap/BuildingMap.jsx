import React from 'react';
import {
  pad,
  playerColors,
} from 'utility';
import { API_HOST } from 'config';
import heroes from 'dotaconstants/json/heroes.json';
import Heading from 'components/Heading';
import strings from 'lang';
import ReactTooltip from 'react-tooltip';
import buildingData from './buildingData';
import styles from './BuildingMap.css';

export default function BuildingMap({ match }) {
  if (match && match.tower_status_radiant !== undefined) {
    // see https://wiki.teamfortress.com/wiki/WebAPI/GetMatchDetails
    let bits = pad(match.tower_status_radiant.toString(2), 11);
    bits += pad(match.barracks_status_radiant.toString(2), 6);
    bits += pad(match.tower_status_dire.toString(2), 11);
    bits += pad(match.barracks_status_dire.toString(2), 6);
    bits += match.radiant_win ? '10' : '01';
    const icons = [];
    // concat, iterate through bits of all four status values
    // if 1, create image
    // building data in correct order
    // determine ancient display by match winner
    for (let i = 0; i < bits.length; i += 1) {
      let type = buildingData[i].id.slice(0, 1);
      type =
        (type === 't' && 'tower') ||
        (type === 'b' && (buildingData[i].id.slice(1, 2) === 'm' ? 'melee_rax' : 'range_rax')) ||
        (type === 'a' && 'fort');
      const side = buildingData[i].id.slice(-1) === 'r' ? 'good' : 'bad';
      const tier = Number(buildingData[i].id.slice(1, 2)) || '';
      let lane = buildingData[i].id.slice(2, 3);
      lane = (tier !== 4 && (
        (lane === 't' && 'top') ||
        (lane === 'm' && 'mid') ||
        (lane === 'b' && 'bot') || '')) || '';

      const key = `npc_dota_${side}guys_${type}${tier}${lane && `_${lane}`}`;
      const title =
        strings[`${type.includes('rax') ? 'building_' : 'objective_'}${type}${tier}${type.includes('rax') ? '' : lane && `_${lane}`}`];

      const destroyedBy = match.version && match.players
        .filter(player => player.killed[key] > 0)
        .map(player => ({
          name: player.name || player.personaname || strings.general_anonymous,
          player_slot: player.player_slot,
          hero_id: player.hero_id,
        }))[0];

      const props = {
        key: buildingData[i].id,
        src: `/assets/images/${side}guys_${type.includes('rax') ? 'rax' : type}.png`,
        style: {
          span: {
            top: buildingData[i].style.split(';')[1].split(':')[1],
            left: buildingData[i].style.split(';')[2].split(':')[1],
          },
          img: {
            // TODO scale based on client width
            // d.style += 'zoom: ' + document.getElementById(map').clientWidth / 600 + ';';
            zoom: buildingData[i].id.slice(0, 1) === 'a' ? 0.8 : 0.5,
            opacity: bits[i] === '1' || '0.4',
          },
        },
      };

      icons.push(
        <span
          key={props.key}
          data-tip
          data-for={props.key}
          style={props.style.span}
        >
          <img
            src={props.src}
            role="presentation"
            style={props.style.img}
          />
          <ReactTooltip id={props.key} effect="solid">
            <div>
              {title}
              {destroyedBy &&
                <div className={styles.destroyedBy}>
                  <span className={styles.text}>Destroyed by </span>
                  <span className={styles.player} style={{ color: playerColors[destroyedBy.player_slot] }}>
                    <img
                      src={heroes[destroyedBy.hero_id] && API_HOST + heroes[destroyedBy.hero_id].img}
                      role="presentation"
                    />
                    {destroyedBy.name}
                  </span>
                </div>
              }
              {match.version && !destroyedBy && bits[i] !== '1' &&
                <div className={styles.destroyedBy}>
                  <span className={styles.text}>Destroyed by </span>
                  <span style={{ color: side === 'good' ? styles.red : styles.green }}>
                    creeps
                  </span>
                </div>
              }
            </div>
          </ReactTooltip>
        </span>
      );
    }
    return (
      <div>
        <Heading title={strings.heading_buildings} />
        <div className={styles.buildingMap}>
          <img
            src={`${API_HOST}/apps/dota2/images/tv/minimap_686.jpg`}
            role="presentation"
            className={styles.buildingMapImage}
          />
          {icons}
        </div>
      </div>
    );
  }
  return <div />;
}
