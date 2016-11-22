import React, { PropTypes } from 'react';
import heroes from 'dotaconstants/json/heroes.json';

import styles from './PicksBans.css';

// Team 0 - radiant, 1 - dire
const PicksBans = ({ data }) => {
  if (data) {
    return (
      <div className={styles.PicksBans}>
        {data.map(pb => (
          <section>
            <img
              src={`${API_HOST}${heroes[pb.hero_id].img}`}
              role="presentation"
              className={styles.image}
              data-isPick={pb.is_pick}
            />
            {!pb.is_pick && <div className={styles.ban} />}
            <aside>
              {pb.is_pick ? 'Pick' : 'Ban'} <b>{pb.order + 1}</b>
            </aside>
          </section>
        ))}
      </div>
    );
  }

  return null;
};

PicksBans.PropTypes = {
  match: PropTypes.object,
};

export default PicksBans;
