import React from 'react';
import { Link } from 'react-router';

import style from './Heroes.css';

export default ({ id, name, imageUrl }) => (
  <div className={style.HeroItem} style={{ backgroundImage: `url('${imageUrl}')` }}>
    <h4 className={style.HeroItemName}>
      <Link className={style.HeroItemActions} to={`/heroes/${id}`}>
        {name}
      </Link>
    </h4>
  </div>
);
