import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { GridTile } from 'material-ui/GridList';

import style from './Heroes.css';

const HeroActionButton = ({ heroId }) => (
  <div className={style.HeroItemAction}>
    <Link to={`heroes/benchmark/${heroId}`}>
      <RaisedButton className={style.HeroItemActionButton} label="Benchmark" />
    </Link>
    <Link to={`heroes/ranking/${heroId}`}>
      <RaisedButton label="Ranking" />
    </Link>
  </div>
);

export default ({ id, name, imageUrl }) => (
  <GridTile
    title={name}
    subtitle={<HeroActionButton heroId={id} />}
  >
    <img role="presentation" src={imageUrl} />
  </GridTile>
);
