import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { transformations, isRadiant, sum } from 'utility';
import strings from 'lang';
import Spinner from 'components/Spinner';
import { IconRadiant, IconDire } from 'components/Icons';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionFingerprint from 'material-ui/svg-icons/action/fingerprint';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import styles from './MatchHeader.css';

export default ({ match, user, loading }) => {
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

        <Row className={styles.overviewHead}>
          <Col className={styles.matchButtons}>
            <div>
              <FlatButton
                label={match.version ? strings.match_button_reparse : strings.match_button_parse}
                icon={match.version ? <NavigationRefresh /> : <ActionFingerprint />}
                containerElement={<Link to={`/request#${match.match_id}`}>r</Link>}
              />
              {match.replay_url &&
              <FlatButton
                label={strings.match_button_replay}
                icon={<FileFileDownload />}
                href={match.replay_url}
                target="_blank"
                rel="noopener noreferrer"
              />}
              {match.replay_url &&
              <FlatButton
                label={strings.match_button_video}
                icon={<img src="/assets/images/jist-24x24.png" role="presentation" />}
                href={`//www.jist.tv/create.php?dota2-match-url=${match.replay_url}`}
                target="_blank"
                rel="noopener noreferrer"
              />}
              <FlatButton
                label={strings.app_dotacoach}
                icon={<img src="/assets/images/dotacoach-32x24.png" role="presentation" />}
                href={`//dotacoach.org/Hire/Yasp?matchID=${match.match_id}&userSteamId=${user.account_id}`} // &playerMmr=
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </Col>
        </Row>

      </header>
    );
  }

  return <Spinner />;
};
