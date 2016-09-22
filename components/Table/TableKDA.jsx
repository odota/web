import React from 'react';
import uuid from 'node-uuid';
import ReactTooltip from 'react-tooltip';
import styles from './TableKDA.css';

const TableKDA = ({ kills, deaths, assists, matchId = uuid.v4() }) => {
  const kdaSum = kills + deaths + assists;

  return (
    <div className={styles.container}>
      <div>
        {kills}
      </div>
      <div>
        <div className={styles.percent} data-tip data-for={`kda-${matchId}`}>
          <div style={{ width: `${(kills * 100) / kdaSum}%`, backgroundColor: styles.red }} />
          <div style={{ width: `${(deaths * 100) / kdaSum}%`, backgroundColor: styles.neutral }} />
          <div style={{ width: `${(assists * 100) / kdaSum}%`, backgroundColor: styles.green }} />
        </div>
        <ReactTooltip id={`kda-${matchId}`} place="right" type="light" effect="float">
          {`KDA: ${Math.round((kdaSum / deaths) * 100) / 100}`}
        </ReactTooltip>
      </div>
    </div>
  );
};

const { string, number } = React.PropTypes;

TableKDA.propTypes = {
  kills: number,
  deaths: number,
  assists: number,
  matchId: string,
};

export default TableKDA;
