import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { transformations, isRadiant, sum } from 'utility';
import strings from 'lang';
import Spinner from 'components/Spinner';
import { IconRadiant, IconDire } from 'components/Icons';
import styles from './MatchHeader.css';

export default ({ match, loading }) => {
  if (!loading) {
    const mapPlayers = (key, radiant) =>
      player =>
        ((radiant === undefined || radiant === isRadiant(player.player_slot)) ? Number(player[key]) : null);

    const mmrPlayers = match.players.map(mapPlayers('solo_competitive_rank')).filter(Boolean);

    return (
      <header className={styles.header}>
        <Row between="xs">
          <Col xs={12} md={4} className={match.radiant_win ? styles.radiant : styles.dire}>
            <div className={styles.winner}>
              {/* If need to display team info just make condition (logo, name (side))*/}
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
                    .map(mapPlayers('kills', true))
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
                    .map(mapPlayers('kills', false))
                    .reduce(sum)
                }
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4} className={styles.additionalInfo}>
            <ul>
              <li>
                <span>{strings.match_id}</span>
                {match.match_id}
              </li>
              <li>
                <span>{strings.match_region}</span>
                {transformations.region(null, null, match.region)}
              </li>
              <li>
                <span>{strings.match_avg_mmr}</span>
                {(mmrPlayers.reduce(sum) / mmrPlayers.length).toFixed(0)}
              </li>
            </ul>
          </Col>
        </Row>
      </header>
    );
  }

  return <Spinner />;
};
