import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';

import style from './Heroes.css';

export default ({ hero, bestPlayer }) => {
  if (!hero) {
    return <div />;
  }

  return (
    <div style={{ height: '170px' }}>
      <Grid fluid style={{ padding: '0 0 20px 0' }}>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <img role="presentation" className={style.RankingHeroBadgeAvatar} src={hero.img} />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} style={{ textAlign: 'right' }}>
            <h2 className={style.RankingHeroBadge}>{hero.localized_name} Player Rankings</h2>
            {bestPlayer ?
              <table style={{ float: 'right' }}>
                <tr>
                  <td className={style.RankingHeroBadgeTd}><Link to={`/players/${bestPlayer.account_id}`}>{bestPlayer.personaname}</Link></td>
                  <td className={style.RankingHeroBadgeTd}><strong>{bestPlayer.solo_competitive_rank}</strong></td>
                  <td className={style.RankingHeroBadgeTd}><strong>{parseFloat(bestPlayer.score).toFixed()}</strong></td>
                </tr>
                <tr className={style.RankingHeroBadgeMeta}>
                  <td className={style.RankingHeroBadgeTd}>Best Player</td>
                  <td className={style.RankingHeroBadgeTd}>Solo MMR</td>
                  <td className={style.RankingHeroBadgeTd}>Score</td>
                </tr>
              </table>
            : <div />}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};
