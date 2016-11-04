import React from 'react';
import palette from 'components/palette.css';
import strings from 'lang';
import styles from './KDA.css';

const KDA = ({ kills, deaths, assists }) => {
  const kdaSum = kills + deaths + assists;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {kills}
      </div>
      <div
        className={styles.percent}
        data-hint={`${strings.th_kda}: ${Number(((kills + assists) / (deaths + 1)).toFixed(2))}`}
        data-hint-position="top"
      >
        <div style={{ width: `${(kills * 100) / kdaSum}%`, backgroundColor: palette.green }} />
        <div style={{ width: `${(deaths * 100) / kdaSum}%`, backgroundColor: palette.red }} />
      </div>
    </div>
  );
};

const { number } = React.PropTypes;

KDA.propTypes = {
  kills: number,
  deaths: number,
  assists: number,
};

export default KDA;
