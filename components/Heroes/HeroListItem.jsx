import React from 'react';
import { Link } from 'react-router';

import style from './Heroes.css';

const HeroActionButton = ({ heroId }) => (
  <div className={style.HeroItemAction}>
    <Link className={style.HeroItemActions} to={`heroes/benchmarks/${heroId}`}>
      Benchmarks
    </Link>
    <Link className={style.HeroItemActions} to={`heroes/rankings/${heroId}`}>
      Rankings
    </Link>
  </div>
);

export default ({ id, name, imageUrl }) => (
  <div className={style.HeroItem} style={{ backgroundImage: `url('${imageUrl}')` }}>
    <h4 className={style.HeroItemName}>{name}</h4>
    <HeroActionButton heroId={id} />
  </div>
);
