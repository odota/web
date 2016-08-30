import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import HeroListItem from './HeroListItem';

import style from './Heroes.css';

export default ({ heroes }) => (
  <Grid fluid className={style.HeroListWrapper}>
    <Row>
      {Object.keys(heroes).map((key) => {
        const hero = heroes[key];
        return (
          <Col className={style.HeroListCol} key={key} xs={12} sm={4} md={4} lg={3}>
            <HeroListItem
              id={hero.id}
              name={hero.localized_name}
              imageUrl={hero.img}
            />
          </Col>
        );
      })}
    </Row>
  </Grid>
);
