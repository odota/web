import React from 'react';
import style from './Heroes.css';

export default ({ name, imageUrl }) => (
  <div className={style.HeroItem} style={{ backgroundImage: `url('${imageUrl}')` }}>
    <span>
      {name}
    </span>
  </div>
);
