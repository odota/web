import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { transformations, isRadiant } from 'utility';
import strings from 'lang';
import Spinner from 'components/Spinner';
import { IconRadiant, IconDire } from 'components/Icons';
import styles from './MatchHeader.css';

export default ({ match, loading }) => {
  if (!loading) {
    const kills = match.players.reduce(
      (kills, player) => {
        if (isRadiant(player.player_slot)) {
          kills.radiant.push(player.kills);
        } else {
          kills.dire.push(player.kills);
        }
        return kills;
      },
      {
        radiant: [],
        dire: [],
      }
    );

    return (
      <header className={styles.header}>
        <Row between="xs">
          <Col xs={12} sm={5} className={styles.radiant}>
            <div className={styles.score}>
              {kills.radiant.reduce((a, b) => a + b, 0)}
            </div>
            <div className={styles.winner}>
              {match.radiant_win &&
              <span>
                <IconRadiant />
                {strings.match_radiant_win}
              </span>
              }
            </div>
          </Col>
          <Col xs={12} sm={2} className={styles.gme}>
            <span className={styles.gameMode}>
              {transformations.game_mode(null, null, match.game_mode)}
            </span>
            <span className={styles.duration}>
              {transformations.duration(null, null, match.duration)}
            </span>
            <span className={styles.ended}>
              {strings.match_ended} {transformations.start_time(null, null, match.start_time + match.duration)}
            </span>
          </Col>
          <Col xs={12} sm={5} className={styles.dire}>
            <div className={styles.score}>
              {kills.dire.reduce((a, b) => a + b, 0)}
            </div>
            <div className={styles.winner}>
              {!match.radiant_win &&
              <span>
                {strings.match_dire_win}
                <IconDire />
              </span>
              }
            </div>
          </Col>
        </Row>
      </header>
    );
  }

  return <Spinner />;
};
