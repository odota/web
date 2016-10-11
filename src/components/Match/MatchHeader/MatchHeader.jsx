import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { transformations, isRadiant, sum } from 'utility';
import strings from 'lang';
import Spinner from 'components/Spinner';
import { IconRadiant, IconDire } from 'components/Icons';
import styles from './MatchHeader.css';

export default ({ match, loading }) => {
  if (!loading) {
    const mapPlayers = key =>
      (player) => {
        if (key === 'radiant' && isRadiant(player.player_slot)) {
          return player.kills;
        } else if (key === 'dire' && !isRadiant(player.player_slot)) {
          return player.kills;
        } else if (key === 'mmr') {
          return Number(player.solo_competitive_rank);
        }
        return null;
      };

    let averageMmr = match.players
      .map(mapPlayers('mmr'))
      .filter(Boolean);
    averageMmr = Number((averageMmr.reduce(sum) / averageMmr.length).toFixed(0));

    return (
      <header className={styles.header}>
        <Row between="xs">
          <Col xs={12} md={4} className={match.radiant_win ? styles.radiant : styles.dire}>
            <div className={styles.winner}>
              {match.radiant_win ?
                <span>
                  <IconRadiant />
                  {strings.match_radiant_win}
                </span>
              :
                <span>
                  <IconDire />
                  {strings.match_dire_win}
                </span>
              }
            </div>
          </Col>
          <Col xs={12} md={4}>
            <Row center="xs">
              <Col className={styles.killsRadiant}>
                {
                  match.players
                    .map(mapPlayers('radiant'))
                    .reduce(sum)
                }
              </Col>
              <Col className={styles.gmde}>
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
              <Col className={styles.killsDire}>
                {
                  match.players
                    .map(mapPlayers('dire'))
                    .reduce(sum)
                }
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4} className={styles.additionalInfo}>
            <ul>
              <li>
                <span>Match ID</span>
                {match.match_id}
              </li>
              <li>
                <span>Region</span>
                {transformations.region(null, null, match.region)}
              </li>

              <li>
                <span>Avg mmr</span>
                {averageMmr}
              </li>
            </ul>
          </Col>
        </Row>
      </header>
    );
  }

  return <Spinner />;
};
