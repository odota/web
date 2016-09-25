import React from 'react';
import {
  Link,
} from 'react-router';
/*
import {
  CardTitle,
} from 'material-ui/Card';
*/
import {
  transformations,
} from 'utility';
import styles from './Match.css';

export default ({
  match,
  user,
}) => (
  <div>
    {match.radiant_win ? <RadiantWinText /> : <DireWinText />}
    <div className={styles.HeaderInfoWrapper}>
      <MatchActions match={match} user={user} />
      <MatchMetadata match={match} />
      <div className={styles.Clear} />
    </div>
  </div>
);

const JistTvButton = ({
  replayUrl,
}) => (
  <a
    className={styles.ActionButton}
    rel="noopener noreferrer"
    target="_blank"
    href={`https://www.jist.tv/create.php?dota2-match-url=${replayUrl}`}
  >
    <span className={styles.JistTvText}>Get Video with</span>
    <img
      className={styles.JistTvImg}
      src="/assets/jist-white-logo.png"
      alt="Jist.tv"
    />
  </a>
);

const DotaCoachButton = ({
  matchId,
  playerMmr,
  steamId,
}) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className={styles.ActionButton}
    href={`https://dotacoach.org/Hire/Yasp?matchID=${matchId}&userSteamId=${steamId}&playerMmr=${playerMmr}`}
  >
    <span className={styles.DotaCoachText}>Ask a coach</span>
    <img
      className={styles.DotaCoachImg}
      src="/assets/dotacoach-32x24.png"
      alt="Dotacoach.org"
    />
  </a>
);

const ParseReplayButton = ({
  matchId,
}) => (
  <Link
    className={styles.ActionButton}
    to={`/request#${matchId}`}
  >
    Parse
  </Link>
);

const DownloadReplayButton = ({
  replayUrl,
}) => (
  <a className={styles.ActionButton} href={replayUrl}>
    Download Replay
  </a>
);

const MatchActions = ({
  match,
  user,
}) => {
  let steamId = '';
  let playerMmr = '';

  if (user && user.steam_id) {
    steamId = user.steam_id;
  }

  if (user && user.player_mmr) {
    playerMmr = user.player_mmr;
  }

  return (
    <div className={styles.MatchActionWrapper}>
      <ParseReplayButton matchId={match.match_id} />
      {match.replay_url ? <DownloadReplayButton replayUrl={match.replay_url} /> : ''}
      {match.replay_url ? <JistTvButton replayUrl={match.replay_url} /> : ''}
      <DotaCoachButton matchId={match.match_id} steamId={steamId} playerMmr={playerMmr} />
    </div>
  );
};

const MatchMetadata = ({ match }) => (
  <table className={styles.Table}>
    <thead>
      <tr>
        <th className={styles.TableCell}>Match ID</th>
        <th className={styles.TableCell}>Mode</th>
        <th className={styles.TableCell}>Skill</th>
        <th className={styles.TableCell}>Region</th>
        <th className={styles.TableCell}>Duration</th>
        <th className={styles.TableCell}>Ended</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className={styles.TableCell}>{match.match_id}</td>
        <td className={styles.TableCell}>{transformations.game_mode(null, null, match.game_mode)}</td>
        <th className={styles.TableCell}>{transformations.skill(null, null, match.skill)}</th>
        <td className={styles.TableCell}>{transformations.region(null, null, match.region)}</td>
        <td className={styles.TableCell}>{transformations.duration(null, null, match.duration)}</td>
        <td className={styles.TableCell}>{transformations.start_time(null, null, match.start_time + match.duration)}</td>
      </tr>
    </tbody>
  </table>
);

/*
const MatchMetadata = ({
  match
}) => (
  <div>
    <CardTitle
      className={styles.playerStats}
      subtitle={match.match_id}
      title="Match ID"
    />
    <CardTitle
      className={styles.playerStats}
      subtitle={transformations.game_mode(null, null, match.game_mode)}
      title="Mode"
    />
    <CardTitle
      className={styles.playerStats}
      subtitle={transformations.skill(null, null, match.skill)}
      title="Skill"
    />
    <CardTitle
      className={styles.playerStats}
      subtitle={transformations.region(null, null, match.region)}
      title="Region"
    />
    <CardTitle
      className={styles.playerStats}
      subtitle={transformations.duration(null, null, match.duration)}
      title="Duration"
    />
    <CardTitle
      className={styles.playerStats}
      subtitle={transformations.start_time(null, null, match.start_time + match.duration)}
      title="Ended"
    />
  </div>
);
*/

const RadiantWinText = () => (
  <h1 className={styles.RadiantWin}>Radiant Victory</h1>
);

const DireWinText = () => (
  <h1 className={styles.DireWin}>Dire Victory</h1>
);
