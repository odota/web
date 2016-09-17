import React from 'react';
import { Link } from 'react-router';

import { transformations } from './../../utility';
import matchStyle from './Match.css';

export default ({ match, user }) => (
  <div>
    {match.radiant_win ? <RadiantWinText /> : <DireWinText />}
    <div className={matchStyle.HeaderInfoWrapper}>
      <MatchActions match={match} user={user} />
      <MatchMetadata match={match} />
      <div className={matchStyle.Clear} />
    </div>
  </div>
);

const JistTvButton = ({ replayUrl }) => (
  <a
    className={matchStyle.ActionButton}
    rel="noopener noreferrer"
    target="_blank"
    href={`https://www.jist.tv/create.php?dota2-match-url=${replayUrl}`}
  >
    <span className={matchStyle.JistTvText}>Get Video with</span>
    <img
      className={matchStyle.JistTvImg}
      src="/assets/jist-white-logo.png"
      alt="Jist.tv"
    />
  </a>
);

const DotaCoachButton = ({ matchId, playerMmr, steamId }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className={matchStyle.ActionButton}
    href={`https://dotacoach.org/Hire/Yasp?matchID=${matchId}&userSteamId=${steamId}&playerMmr=${playerMmr}`}
  >
    <span className={matchStyle.DotaCoachText}>Ask a coach</span>
    <img
      className={matchStyle.DotaCoachImg}
      src="/assets/dotacoach-32x24.png"
      alt="Dotacoach.org"
    />
  </a>
);

const ParseReplayButton = ({ matchId }) => (
  <Link
    className={matchStyle.ActionButton}
    to={`/request#${matchId}`}
  >
    Parse
  </Link>
);

const DownloadReplayButton = ({ replayUrl }) => (
  <a className={matchStyle.ActionButton} href={replayUrl}>
    Download Replay
  </a>
);

const MatchActions = ({ match, user }) => {
  let steamId = '';
  let playerMmr = '';

  if (user && user.steam_id) {
    steamId = user.steam_id;
  }

  if (user && user.player_mmr) {
    playerMmr = user.player_mmr;
  }

  return (
    <div className={matchStyle.MatchActionWrapper}>
      <ParseReplayButton matchId={match.match_id} />
      {match.replay_url ? <DownloadReplayButton replayUrl={match.replay_url} /> : ''}
      {match.replay_url ? <JistTvButton replayUrl={match.replay_url} /> : ''}
      <DotaCoachButton matchId={match.match_id} steamId={steamId} playerMmr={playerMmr} />
    </div>
  );
};

const MatchMetadata = ({ match }) => (
  <table className={matchStyle.Table}>
    <thead>
      <tr>
        <th className={matchStyle.TableCell}>Match ID</th>
        <th className={matchStyle.TableCell}>Mode</th>
        <th className={matchStyle.TableCell}>Skill</th>
        <th className={matchStyle.TableCell}>Region</th>
        <th className={matchStyle.TableCell}>Duration</th>
        <th className={matchStyle.TableCell}>Ended</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className={matchStyle.TableCell}>{match.match_id}</td>
        <td className={matchStyle.TableCell}>{transformations.game_mode(null, null, match.game_mode)}</td>
        <th className={matchStyle.TableCell}>{transformations.skill(null, null, match.skill)}</th>
        <td className={matchStyle.TableCell}>{transformations.region(null, null, match.region)}</td>
        <td className={matchStyle.TableCell}>{transformations.duration(null, null, match.duration)}</td>
        <td className={matchStyle.TableCell}>{transformations.start_time(null, null, match.start_time + match.duration)}</td>
      </tr>
    </tbody>
  </table>
);

const RadiantWinText = () => (
  <h1 className={matchStyle.RadiantWin}>Radiant Victory</h1>
);

const DireWinText = () => (
  <h1 className={matchStyle.DireWin}>Dire Victory</h1>
);
