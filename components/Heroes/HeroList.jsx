import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GridList } from 'material-ui/GridList';
import HeroListItem from './HeroListItem';

import style from './heroes.css';

export default ({ heroes }) => (
  
    <Grid fluid className={style.HeroListWrapper}>
      <Row>
        {Object.keys(heroes).map((key) => {
          let hero = heroes[key]
          return (
            <Col className={style.HeroListCol} key={key} xs={12} sm={4} md={4} lg={3}>
              <HeroListItem
                id={hero.id}
                name={hero.localized_name}
                imageUrl={hero.img}
              />
            </Col>
          )
        })}
      </Row>
    </Grid>
)
