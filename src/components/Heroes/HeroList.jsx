import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router';
import HeroListItem from './HeroListItem';

import style from './Heroes.css';

export default ({ heroes }) => (
  <Grid fluid className={style.HeroListWrapper}>
    <Row>
      {heroes.map((hero, i) => (
        <Col className={style.HeroListCol} key={i} xs={12} sm={4} md={4} lg={2}>
          <Link to={`/heroes/${hero.id}`}>
            <HeroListItem
              name={hero.localized_name}
              imageUrl={hero.img}
            />
          </Link>
        </Col>
      ))}
    </Row>
  </Grid>
);
