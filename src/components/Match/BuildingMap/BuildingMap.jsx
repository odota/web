import React from 'react';
import { pad } from 'utility';
import { API_HOST } from 'config';
import Heading from 'components/Heading';
import strings from 'lang';
import buildingData from './buildingData';
// import Spinner from '../Spinner';
import styles from './BuildingMap.css';

export default function BuildingMap({
  match,
}) {
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
      const d = {
        key: buildingData[i].id,
        src: `https://raw.githubusercontent.com/kronusme/dota2-api/master/images/map/${type}${side}`,
        style: {
          opacity: bits[i] === '1' ? '1' : '0.2',
          // TODO scale based on client width
          // d.style += 'zoom: ' + document.getElementById(map').clientWidth / 600 + ';';
          zoom: buildingData[i].id.slice(0, 1) === 'a' ? 0.8 : 0.5,
          position: 'absolute',
          top: buildingData[i].style.split(';')[1].split(':')[1],
          left: buildingData[i].style.split(';')[2].split(':')[1],
        },
      };
      icons.push(<img {...d} role="presentation" />);
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
