import React from 'react';
import classNames from "classnames";
import RaisedButton from 'material-ui/RaisedButton';
import { transformations } from './../../utility';
import constants from 'dotaconstants';

import style from './../palette.css';
import matchStyle from './Match.css';
console.log(constants)

export default ({ match }) => (
  <div>
    {match.radiant_win ? <RadiantWinText /> : <DireWinText />}
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
          <td className={matchStyle.TableCell}>{transformations.game_mode(0, 0, match.game_mode)}</td>
          <th className={matchStyle.TableCell}>{transformations.skill(0, 0, match.skill)}</th>
          <td className={matchStyle.TableCell}>{transformations.region(0,0, match.region)}</td>
          <td className={matchStyle.TableCell}>{transformations.duration(0, 0, match.duration)}</td>
          <td className={matchStyle.TableCell}>{transformations.start_time(0, 0,match.start_time + match.duration)}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

const RadiantWinText = () => (
  <h1 className={matchStyle.RadiantWin}>Radiant Victory</h1>
)

const DireWinText = () => (
  <h1 className={matchStyle.DireWin}>Dire Victory</h1>
)
