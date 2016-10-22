import React from 'react';
import style from './HeroListItem.css';

export default ({ name, imageUrl }) => (
  <div className={style.HeroListCol}>
    <div className={style.HeroItem} style={{ backgroundImage: `url('${imageUrl}')` }}>
      <span>
        {name}
      </span>
    </div>
  </div>
);
