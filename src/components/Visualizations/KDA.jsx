import React from 'react';
import uuid from 'node-uuid';
import ReactTooltip from 'react-tooltip';
import styles from './KDA.css';
import palette from '../palette.css';


const KDA = ({ kills, deaths, assists, matchId = uuid.v4() }) => {
  const kdaSum = kills + deaths + assists;

  return (
    <div className={styles.container}>
      <div>
        {kills}
      </div>
      <div>
        <div className={styles.percent} data-tip data-for={`kda-${matchId}`}>
          <div style={{ width: `${(kills * 100) / kdaSum}%`, backgroundColor: palette.red }} />
          <div style={{ width: `${(deaths * 100) / kdaSum}%`, backgroundColor: palette.gray }} />
          <div style={{ width: `${(assists * 100) / kdaSum}%`, backgroundColor: palette.green }} />
        </div>
        <ReactTooltip id={`kda-${matchId}`} place="right" type="light" effect="float">
          {`KDA: ${Number(((kills + assists) / (deaths + 1)).toFixed(2))}`}
        </ReactTooltip>
      </div>
    </div>
  );
};

const { string, number } = React.PropTypes;

KDA.propTypes = {
  kills: number,
  deaths: number,
  assists: number,
  matchId: string,
};

export default KDA;
