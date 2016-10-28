import React from 'react';
import { pad } from 'utility';
import { API_HOST } from 'config';
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
      const type = buildingData[i].id.slice(0, 1) === 't' ? 'tower' : 'racks';
      const side = buildingData[i].id.slice(-1) === 'r' ? '_radiant.png' : '_dire.png';

      let lane = buildingData[i].id.slice(2, 3);
      lane = (lane === 't' && 'Top') || (lane === 'm' && 'Middle') || (lane === 'b' && 'Bottom');
      const tier = buildingData[i].id.slice(1, 2);
      const title = buildingData[i].id.slice(0, 1) === 't' ?
        `${lane} Tier ${tier}` : (
          (buildingData[i].id === 'ar' && 'Radiant Ancient') ||
          (buildingData[i].id === 'ad' && 'Dire Ancient') ||
          (buildingData[i].id.slice(1, 2) === 'm' ? `${lane} Melee` : `${lane} Ranged`)
          );

      const props = {
        src: `https://raw.githubusercontent.com/kronusme/dota2-api/master/images/map/${type}${side}`,
        style: {
          opacity: bits[i] === '1' || '0.4',
          // TODO scale based on client width
          // d.style += 'zoom: ' + document.getElementById(map').clientWidth / 600 + ';';
          zoom: buildingData[i].id.slice(0, 1) === 'a' ? 0.8 : 0.5,
          position: 'absolute',
          top: buildingData[i].style.split(';')[1].split(':')[1],
          left: buildingData[i].style.split(';')[2].split(':')[1],
        },
      };
      icons.push(
        <span key={buildingData[i].id}>
          <img
            {...props}
            role="presentation"
            data-tip={title}
          />
          <ReactTooltip />
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
