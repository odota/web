import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import playerColors from 'dotaconstants/build/player_colors.json';
import heroes from 'dotaconstants/build/heroes.json';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import {
  pad,
  sum,
  isRadiant,
  patchDate
} from '../../../utility';
import Heading from '../../Heading';
import DotaMap from '../../DotaMap';
import HeroImage from '../../Visualizations/HeroImage';
import buildingDataOld from './buildingData';
import buildingData733 from './buildingData733';
import constants from '../../constants';
import config from '../../../config';

const buildingDataByPatch = [
  { patch: '7.33', data: buildingData733 },
  { patch: '6.70', data: buildingDataOld }
]

const getBuildingData = (startTime) => {
  if (!startTime) return buildingDataByPatch[0].data;

  const buildingData = buildingDataByPatch.find(buildingData => startTime >= patchDate[buildingData.patch]);

  return buildingData.data || buildingDataByPatch[0].data;
};

const StyledDiv = styled.div`
.map {
  @media only screen and (max-width: 370px) {
    max-height: 250px !important;
    max-width: 250px !important;
  }
}

.buildingMap {
  position: relative;
  width: 300px;
  height: 300px;
  border: 6px solid rgba(255, 255, 255, 0.1);
  margin: 0 auto;

  & .buildingMapImage {
    width: 300px;
    height: 300px;
    filter: grayscale(40%) brightness(180%) contrast(110%);
  }

  & > span {
    position: absolute;

    &:hover {
      z-index: 99;
    }

    & img {
      transition: ${constants.normalTransition};

      &:hover {
        filter: drop-shadow(0 0 8px ${constants.textColorPrimary});
      }
    }
  }

  @media only screen and (max-width: 370px) {
    width: 250px;
    height: 250px;

    & .buildingMapImage {
      width: 250px;
      height: 250px;
    }
  }
}

.buildingHealth {
  height: 10px;
  min-width: 150px;
  margin: 4px 0;
  display: flex;

  & > div {
    height: 100%;
    float: left;
  }
}

.damage {
  & > div > img {
    margin: 0 5px;
    width: 14px;
    height: 14px;
    vertical-align: sub;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.2));
  }

  & .damageValue {
    display: inline-block;
    width: 36px;
    text-align: center;
  }

  & .playerName {
    margin-right: 5px;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: bottom;
  }

  & .lasthit {
    font-size: ${constants.fontSizeSmall};
    color: ${constants.colorGolden};

    & img {
      height: 10px;
      margin-right: 3px;
    }
  }

  & .creeps {
    & .lasthit {
      color: ${constants.colorMutedLight};
    }

    & img {
      margin: 0;
      width: 24px;
      height: 14px;
      display: inline-block;
    }
  }

  & .deny {
    color: ${constants.colorMutedLight};
  }
}

.subtitle {
  margin-left: 4px;
  font-size: ${constants.fontSizeSmall};
  font-weight: ${constants.fontWeightLight};
  color: ${constants.colorMutedLight};
}

.hint {
  color: ${constants.colorMutedLight};
  font-weight: ${constants.fontWeightLight};
  font-size: ${constants.fontSizeMedium};
  text-align: center;
  margin-top: 12px;

  & svg {
    vertical-align: sub;
    fill: ${constants.colorMutedLight};
    height: 14px;
    margin-right: 5px;
  }
}

.hero-icons {
  display: flex;
  justify-content: center;
  position: absolute;

  & img {
    width: 26px;
  }

  & .radiant {
    color: ${constants.green};
  }

  & .dire {
    color: ${constants.red};
  }

  & .roaming {
    margin-right: 6px;
  }
}

.radiant-safe,
.radiant-mid,
.radiant-off,
.radiant-jungle {
  & img {
    filter: drop-shadow(0 0 5px ${constants.green});
  }
}

.dire-safe,
.dire-mid,
.dire-off,
.dire-jungle {
  & img {
    filter: drop-shadow(0 0 5px ${constants.red});
  }
}

.radiant-safe {
  bottom: 0;
  flex-direction: row-reverse;
  right: 30px;
}

.radiant-mid {
  left: 130px;
  top: 155px;
}

.radiant-off {
  flex-direction: column;
  flex-wrap: wrap;
  left: 0;
  top: 75px;
  width: 26px;
}

.radiant-jungle {
  flex-wrap: wrap;
  left: 130px;
  top: 200px;
  width: 78px;
}

.dire-safe {
  left: 20px;
  top: 0;
}

.dire-mid {
  flex-direction: row-reverse;
  right: 145px;
  top: 125px;
}

.dire-off {
  bottom: 70px;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  right: 0;
  width: 26px;
}

.dire-jungle {
  flex-direction: row-reverse;
  flex-wrap: wrap;
  right: 120px;
  top: 50px;
  width: 78px;
}
`;

const buildingsHealth = {
  tower1: 1300,
  tower2: 1600,
  tower3: 1600,
  tower4: 1600,
  melee_rax: 1500,
  range_rax: 1200,
  fort: 4200,
};


const BuildingMap = ({ match, strings }) => {
  if (!match || match.tower_status_radiant === undefined) {
    return <div />;
  }

  const buildingData = getBuildingData(match.startTime);

  // see https://wiki.teamfortress.com/wiki/WebAPI/GetMatchDetails
  let bits = pad(match.tower_status_radiant.toString(2), 16).slice(5);
  bits += pad(match.barracks_status_radiant.toString(2), 8).slice(2);
  bits += pad(match.tower_status_dire.toString(2), 16).slice(5);
  bits += pad(match.barracks_status_dire.toString(2), 8).slice(2);
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
          filter: bits[i] === '1' ? 'contrast(150%)' : 'grayscale(100%) brightness(70%)',
        },
      },
    };
    const icon = (
      <span
        key={props.key}
        data-tip
        data-for={props.key}
        style={props.style.span}
      >
        <img
          src={props.src}
          alt=""
          style={props.style.img}
        />
        <ReactTooltip id={props.key} effect="solid">
          {title}
          {damage && damage.length > 0 &&
            <span>
              <span className="subtitle"> {strings.building_damage}</span>
              <div>
                <div
                  className="buildingHealth"
                  style={{
                    backgroundColor: (bits[i] === '1' && constants.colorMuted) || (side === 'good' ? constants.colorRed : constants.colorGreen),
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
                <div className="damage">
                  {damage.map(player => (
                    <div key={player.hero_id}>
                      <img
                        src={heroes[player.hero_id] && config.VITE_IMAGE_CDN + heroes[player.hero_id].icon}
                        alt=""
                      />
                      <span className="damageValue">
                        {player.damage}
                      </span>
                      <span
                        style={{ color: playerColors[player.player_slot] }}
                        className="playerName"
                      >
                        {player.name}
                      </span>
                      {destroyedBy && destroyedBy.player_slot === player.player_slot &&
                        <span className="lasthit">
                          {
                            ((side === 'good' && isRadiant(destroyedBy.player_slot)) || (side === 'bad' && !isRadiant(destroyedBy.player_slot))) ?
                              <span className="deny">
                                {strings.building_denied}
                              </span>
                              :
                              <span>
                                {type !== 'fort' && <img src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/gold.png`} alt="" />}
                                {strings.building_lasthit}
                              </span>
                          }
                        </span>
                      }
                    </div>
                  ))}
                  {(damageByCreeps > 0) && (bits[i] !== '1')
                    && (
                      <div className="creeps">
                        <img
                          src="/assets/images/blank-1x1.gif"
                          alt=""
                          style={{
                            backgroundImage: `url(/assets/images/dota2/${side === 'good' ? 'bad' : 'good'}guys_creep.png)`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                          }}
                        />
                        <span className="damageValue">
                          {damageByCreeps}
                        </span>
                        <span
                          style={{ color: side === 'good' ? constants.colorRed : constants.colorGreen }}
                          className="playerName"
                        >creeps
                        </span>
                        {!destroyedBy &&
                          <span className="lasthit">
                            {strings.building_lasthit}
                          </span>
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            </span>
          }
        </ReactTooltip>
      </span>);
    icons.push(icon);
  }

  const radiantSafe = [];
  const radiantMid = [];
  const radiantOff = [];
  const radiantJungle = [];
  const direSafe = [];
  const direMid = [];
  const direOff = [];
  const direJungle = [];
  const roaming = (
    <span className="roaming">{strings.roaming}</span>
  );
  for (let i = 0; i < match.players.length; i += 1) {
    const player = (
      <div
        key={heroes[match.players[i].hero_id] && heroes[match.players[i].hero_id].name}
        data-for={heroes[match.players[i].hero_id] && heroes[match.players[i].hero_id].name}
        data-tip
      >
        <HeroImage
          id={match.players[i].hero_id}
          isIcon
        />
        <ReactTooltip id={heroes[match.players[i].hero_id] && heroes[match.players[i].hero_id].name} effect="solid">
          <span className={match.players[i].isRadiant ? 'radiant' : 'dire'}>{heroes[match.players[i].hero_id] && heroes[match.players[i].hero_id].localized_name}</span>
          <br />
          {match.players[i].is_roaming ? roaming : ''}
          {match.players[i].desc}
        </ReactTooltip>
      </div>
    );

    if (match.players[i].isRadiant) {
      switch (match.players[i].lane) {
        case 1:
          radiantSafe.push(player);
          break;
        case 2:
          radiantMid.push(player);
          break;
        case 3:
          radiantOff.push(player);
          break;
        case 4:
          radiantJungle.push(player);
          break;
        default:
          break;
      }
    } else {
      switch (match.players[i].lane) {
        case 1:
          direOff.push(player);
          break;
        case 2:
          direMid.push(player);
          break;
        case 3:
          direSafe.push(player);
          break;
        case 4:
          direJungle.push(player);
          break;
        default:
          break;
      }
    }
  }

  return (
    <StyledDiv>
      <Heading title={strings.heading_buildings} />
      <DotaMap
        startTime={match.start_time}
        maxWidth={300}
        className="map"
      >
        {icons}
        <div className="hero-icons radiant-safe">
          {radiantSafe}
        </div>
        <div className="hero-icons radiant-mid">
          {radiantMid}
        </div>
        <div className="hero-icons radiant-off">
          {radiantOff}
        </div>
        <div className="hero-icons radiant-jungle">
          {radiantJungle}
        </div>
        <div className="hero-icons dire-safe">
          {direSafe}
        </div>
        <div className="hero-icons dire-mid">
          {direMid}
        </div>
        <div className="hero-icons dire-off">
          {direOff}
        </div>
        <div className="hero-icons dire-jungle">
          {direJungle}
        </div>
      </DotaMap>
      {/* <div className={styles.buildingMap}>
          <img
            src="/assets/images/dota2/map/minimap.jpg"
            alt=""
            className={styles.buildingMapImage}
          />
          {icons}
        </div> */}
      {/* match.version &&
          <div className="hint">
            <IconLightbulb />
            {strings.building_hint}
          </div>
        */}
    </StyledDiv>
  );

};

BuildingMap.propTypes = {
  match: PropTypes.shape({}),
  key: PropTypes.string,
  style: PropTypes.shape({
    span: PropTypes.string,
    img: PropTypes.string,
  }),
  src: PropTypes.string,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(BuildingMap);
