/* global API_HOST */
import React from 'react';
import {
  pad,
  sum,
  isRadiant,
} from 'utility';
import playerColors from 'dotaconstants/build/player_colors.json';
import heroes from 'dotaconstants/build/heroes.json';
import Heading from 'components/Heading';
import DotaMap from 'components/DotaMap';
import strings from 'lang';
import ReactTooltip from 'react-tooltip';
import { IconLightbulb } from 'components/Icons';
import buildingData from './buildingData';
import styles from './BuildingMap.css';

const buildingsHealth = {
  tower1: 1300,
  tower2: 1600,
  tower3: 1600,
  tower4: 1600,
  melee_rax: 1500,
  range_rax: 1200,
  fort: 4200,
};

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

      const destroyedBy = match.players
        .filter(player => player.killed && player.killed[key] > 0)
        .map(player => ({
          player_slot: player.player_slot,
        }))[0];
      const damage = match.players
        .filter(player => player.damage && player.damage[key] > 0)
        .map(player => ({
          name: player.name || player.personaname || strings.general_anonymous,
          player_slot: player.player_slot,
          hero_id: player.hero_id,
          damage: player.damage[key],
        }));
      let damageByCreeps = damage
        .map(player => player.damage)
        .reduce(sum, 0);
      damageByCreeps = buildingsHealth[type === 'tower' ? `tower${tier}` : type] - damageByCreeps;

      const props = {
        key: buildingData[i].id,
        src: `/assets/images/dota2/map/${side}guys_${type.includes('rax') ? 'rax' : type}${lane === 'mid' ? '_angle' : ''}.png`,
        style: {
          span: {
            ...buildingData[i].style,
            position: 'absolute',
            width: 0,
            height: 0,
          },
          img: {
            // TODO scale based on client width
            // d.style += 'zoom: ' + document.getElementById(map').clientWidth / 600 + ';';
            height:
              (type === 'fort' && 25) ||
              (type === 'tower' && 16) ||
              (type.includes('rax') && 12),
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
            {title}
            {damage && damage.length > 0 &&
              <span>
                <span className={styles.subtitle}> & {strings.building_damage}</span>
                <div>
                  <div
                    className={styles.buildingHealth}
                    style={{
                      backgroundColor: (bits[i] === '1' && styles.gray) || (side === 'good' ? styles.red : styles.green),
                    }}
                  >
                    {damage.map(player => (
                      <div
                        key={player.hero_id}
                        style={{
                          width: `${(Number(player.damage) * 100) / buildingsHealth[type === 'tower' ? `tower${tier}` : type]}%`,
                          backgroundColor: playerColors[player.player_slot],
                        }}
                      />
                    ))}
                  </div>
                  <div className={styles.damage}>
                    {damage.map(player => (
                      <div key={player.hero_id}>
                        <img
                          src={heroes[player.hero_id] && API_HOST + heroes[player.hero_id].icon}
                          role="presentation"
                        />
                        <span className={styles.damageValue}>
                          {player.damage}
                        </span>
                        <span
                          style={{ color: playerColors[player.player_slot] }}
                          className={styles.playerName}
                        >
                          {player.name}
                        </span>
                        {destroyedBy && destroyedBy.player_slot === player.player_slot &&
                          <span className={styles.lasthit}>
                            {
                              ((side === 'good' && isRadiant(destroyedBy.player_slot)) || (side === 'bad' && !isRadiant(destroyedBy.player_slot))) ?
                                <span className={styles.deny}>
                                  {strings.building_denied}
                                </span>
                              : <span>
                                {type !== 'fort' && <img src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`} role="presentation" />}
                                {strings.building_lasthit}
                              </span>
                            }
                          </span>
                        }
                      </div>
                    ))}
                    {(damageByCreeps > 0) && (bits[i] !== '1') &&
                      <div className={styles.creeps}>
                        <img
                          src="/assets/images/blank-1x1.gif"
                          role="presentation"
                          style={{
                            backgroundImage: `url(/assets/images/dota2/${side === 'good' ? 'bad' : 'good'}guys_creep.png)`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                          }}
                        />
                        <span className={styles.damageValue}>
                          {damageByCreeps}
                        </span>
                        <span
                          style={{ color: side === 'good' ? styles.red : styles.green }}
                          className={styles.playerName}
                        >creeps </span>
                        {!destroyedBy &&
                          <span className={styles.lasthit}>
                            {strings.building_lasthit}
                          </span>
                        }
                      </div>
                    }
                  </div>
                </div>
              </span>
            }
          </ReactTooltip>
        </span>,
      );
    }
    return (
      <div>
        <Heading title={strings.heading_buildings} />
        <DotaMap
          startTime={match.start_time}
          maxWidth={300}
          className={styles.map}
        >
          {icons}
        </DotaMap>
        {/* <div className={styles.buildingMap}>
          <img
            src="/assets/images/dota2/map/minimap.jpg"
            role="presentation"
            className={styles.buildingMapImage}
          />
          {icons}
        </div> */}
        {match.version &&
          <div className={styles.hint}>
            <IconLightbulb />
            {strings.building_hint}
          </div>
        }
      </div>
    );
  }
  return <div />;
}
