import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import HeroListItem from './HeroListItem';

import style from './Heroes.css';

export default ({ heroes }) => (
  <Grid fluid className={style.HeroListWrapper}>
    <Row>
      {heroes.map((hero, i) => {
        return (
          <Col className={style.HeroListCol} key={i} xs={12} sm={4} md={4} lg={2}>
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
