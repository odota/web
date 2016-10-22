import React from 'react';
import HeroListItem from './HeroListItem';

import style from './HeroList.css';

export default ({ heroes }) => (
  <div className={style.container}>
    {heroes.map((hero, i) => (
      <HeroListItem
        key={i}
        id={hero.id}
        name={hero.localized_name}
        imageUrl={hero.img}
      />
    ))}
  </div>
);
