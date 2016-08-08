import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import style from './Heroes.css';

export default ({ hero }) => (
  <div style={{ height: '170px' }}>
    <Grid fluid style={{ padding: '0 0 20px 0' }}>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <img role="presentation" className={style.RankingHeroBadgeAvatar} src={hero.img} />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} style={{ textAlign: 'right' }}>
          <h2 className={style.RankingHeroBadge}>{hero.localized_name} Benchmarks</h2>
        </Col>
      </Row>
    </Grid>
  </div>
);
