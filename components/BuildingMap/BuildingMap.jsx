import React from 'react';
import { HOST_URL } from '../../yasp.config';
import { pad } from '../../utility';
import buildingData from './BuildingData';
import Spinner from '../Spinner';
export default function BuildingMap({ match, loading }) {
  if (match && !loading) {
    // see https://wiki.teamfortress.com/wiki/WebAPI/GetMatchDetails
    let bits = pad(match.tower_status_radiant.toString(2), 11);
    bits += pad(match.barracks_status_radiant.toString(2), 6);
    bits += pad(match.tower_status_dire.toString(2), 11);
    bits += pad(match.barracks_status_dire.toString(2), 6);
    bits += match.radiant_win ? '10' : '01';
    let icons = [];
    // concat, iterate through bits of all four status values
    // if 1, create image
    // building data in correct order
    // determine ancient display by match winner
    for (let i = 0; i < bits.length; i++) {
      const d = buildingData[i];
      d.src = 'https://raw.githubusercontent.com/kronusme/dota2-api/master/images/map/';
      d.src += buildingData[i].id.slice(0, 1) === 't' ? 'tower' : 'racks';
      d.src += buildingData[i].id.slice(-1) === 'r' ? '_radiant.png' : '_dire.png';
      d.style = {
        opacity: bits[i] === '1' ? '1' : '0.2',
        // TODO scale icons based on client width
        // d.style += 'zoom: ' + document.getElementById(map').clientWidth / 600 + ';';
        zoom: buildingData[i].id.slice(0, 1) === 'a' ? 1 : 0.5,
        position: 'absolute',
        top: buildingData[i].style.split(';')[1].split(':')[1],
        left: buildingData[i].style.split(';')[2].split(':')[1],
      };
      icons.push(<img src={d.src} className={d.class} style={d.style} role={"presentation"} />);
    }
    return (
      <div
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: 600,
        }}
      >
        <img width={600} src={`/assets/map.png`} role={"presentation"} />
        {icons}
      </div>);
  }
  return <Spinner />;
}
