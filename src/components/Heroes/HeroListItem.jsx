import React from 'react';
import { Link } from 'react-router';
import style from './HeroListItem.css';

export default ({ name, imageUrl, id }) => (
  <div className={style.HeroListCol}>
    <Link to={`/heroes/${id}`}>
      <div className={style.HeroItem} style={{ backgroundImage: `url('${imageUrl}')` }}>
        <span>
          {name}
        </span>
      </div>
    </Link>
  </div>
);
