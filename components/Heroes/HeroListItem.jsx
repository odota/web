import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { GridTile } from 'material-ui/GridList';

import style from './heroes.css';

const HeroActionButton = ({ hero_id }) => (
  <div className={style.HeroItemAction}>
    <Link to={`heroes/benchmark/${hero_id}`}>
      <RaisedButton className={style.HeroItemActionButton} label="Benchmark" />
    </Link>
    <Link to={`heroes/ranking/${hero_id}`}>
      <RaisedButton label="Ranking" />
    </Link>
  </div>
)


export default ({ id, name, imageUrl }) => (
  <GridTile 
    title={name}
    subtitle={<HeroActionButton hero_id={id} />}>
    <img src={imageUrl} />
  </GridTile>
)
