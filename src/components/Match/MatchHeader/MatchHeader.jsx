import React from 'react';
import { transformations, isRadiant, sum } from 'utility';
import strings from 'lang';
import Spinner from 'components/Spinner';
import { IconRadiant, IconDire } from 'components/Icons';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionFingerprint from 'material-ui/svg-icons/action/fingerprint';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import Warning from 'components/Alerts';
import styles from './MatchHeader.css';

const getWinnerStyle = (radiantWin) => {
  if (radiantWin === null || radiantWin === undefined) {
    return styles.textMuted;
  }
  return radiantWin ? styles.radiant : styles.dire;
};

export default ({ match, user, loading }) => {
  if (!loading) {
    const mapPlayers = (key, radiant) =>
      player =>
        ((radiant === undefined || radiant === isRadiant(player.player_slot)) ? Number(player[key]) : null);

    const mmrPlayers = match.players.map(mapPlayers('solo_competitive_rank')).filter(Boolean);

    const victorySection = match.radiant_win
      ? (<span>
        <IconRadiant />
        {match.radiant_team && match.radiant_team.name
          ? `${match.radiant_team.name} ${strings.match_team_win}`
          : strings.match_radiant_win
        }
      </span>)
      : (<span>
        <IconDire />
        {match.dire_team && match.dire_team.name
          ? `${match.dire_team.name} ${strings.match_team_win}`
          : strings.match_dire_win
        }
      </span>);
    return (
      <header className={styles.header}>
        <div className={styles.matchInfo}>
          <div className={getWinnerStyle(match.radiant_win)}>
            {match.radiant_win === null || match.radiant_win === undefined ? strings.td_no_result : victorySection}
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.killsRadiant}>
              {
                match.radiant_score || match.players
                  .map(mapPlayers('kills', true))
                  .reduce(sum, 0)
              }
            </div>
            <div className={styles.gmde}>
              <span className={styles.gameMode}>
                {transformations.game_mode(null, null, match.game_mode)}
              </span>
              <span className={styles.duration}>
                {transformations.duration(null, null, match.duration)}
              </span>
              <span className={styles.ended}>
                {strings.match_ended} {transformations.start_time(null, null, match.start_time + match.duration)}
              </span>
            </div>
            <div className={styles.killsDire}>
              {
                match.dire_score || match.players
                  .map(mapPlayers('kills', false))
                  .reduce(sum, 0)
              }
            </div>
          </div>
          <div className={styles.additionalInfo}>
            <ul>
              {match.league && <li>
                <span>league</span>
                {match.league.name}
              </li>}
              <li>
                <span>{strings.match_id}</span>
                {match.match_id}
              </li>
              <li>
                <span>{strings.match_region}</span>
                {strings[`region_${match.region}`]}
              </li>
              <li>
                <span>{strings.match_avg_mmr}</span>
                {(mmrPlayers.length) ? (mmrPlayers.reduce(sum, 0) / mmrPlayers.length).toFixed(0) : strings.general_unknown}
              </li>
            </ul>
          </div>
        </div>
        {!match.version &&
        <Warning className={styles.unparsed}>
          {strings.tooltip_unparsed}
        </Warning>}
        <div className={styles.matchButtons}>
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
            href={`//dotacoach.org/Hire/OpenDota?matchID=${match.match_id}&userSteamId=${user && user.account_id}`}
            target="_blank"
            rel="noopener noreferrer"
          />
          <FlatButton
            label={strings.app_pvgna}
            icon={<img src="/assets/images/pvgna-guide-icon.png" alt={strings.app_pvgna_alt} height="24px" role="presentation" />}
            href={`https://pvgna.com/?userSteamId=${user && user.account_id}&ref=yasp`}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </header>
    );
  }

  return <Spinner />;
};
