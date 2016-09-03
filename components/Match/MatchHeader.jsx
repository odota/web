import React from 'react';
import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import { transformations } from './../../utility';

import matchStyle from './Match.css';

export default ({ match }) => (
  <div>
    {match.radiant_win ? <RadiantWinText /> : <DireWinText />}
    <div className={matchStyle.HeaderInfoWrapper}>
      <MatchActions match={match} />
      <MatchMetadata match={match} />
      <div className={matchStyle.Clear} />
    </div>
  </div>
);

const MatchActions = ({ match }) => (
  <div className={matchStyle.MatchActionWrapper}>
    <Link to={`/request/${match.match_id}`}> {/* TODO: Replace with true link */}
      <FlatButton label="Parse Replay" secondary />
    </Link>
    <Link to="/download"> {/* TODO: Replace with true link */}
      <FlatButton label="Download Replay" secondary />
    </Link>
    <Link to="/jist.tv"> {/* TODO: Replace with true link */}
      <FlatButton label="Jist TV" secondary />
    </Link>
    <Link to="/dotacoach"> {/* TODO: Replace with true link */}
      <FlatButton label="DotaCoach" secondary />
    </Link>
  </div>
);

const MatchMetadata = ({ match }) => (
  <table className={matchStyle.Table}>
    <thead>
      <tr>
        <th className={matchStyle.TableCell}>MatchID</th>
        <th className={matchStyle.TableCell}>Mode</th>
        <th className={matchStyle.TableCell}>Bracket</th>
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
