import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionUpdate from 'material-ui/svg-icons/action/update';
import ReactTooltip from 'react-tooltip';

export default () => (
  <CardActions style={{ width: '30%', boxSizing: 'border-box', padding: '15px 30px', textAlign: 'right' }}>
    <div style={{ display: 'inline-block' }}>
      <div data-tip data-for="update">
<<<<<<< HEAD:components/Player/PlayerButtons.jsx
        <FlatButton
          disabled={true}
=======
        <RaisedButton
          disabled
>>>>>>> refs/remotes/odota/master:components/Player/PlayerActions.jsx
          icon={<ActionUpdate />}
          style={{ minWidth: 50 }}
          backgroundColor="rgba(255, 255, 255, .08)"
          hoverColor="rgba(255, 255, 255, .12)"
        />
      </div>
      <ReactTooltip id="update" place="left" type="light" effect="float">
        <div style={{ textAlign: 'left' }}>
          Refresh Match History:
          If this player has recently changed their match privacy setting,
          this will queue a scan to find the missing matches.
        </div>
      </ReactTooltip>
    </div>
<<<<<<< HEAD:components/Player/PlayerButtons.jsx
    <FlatButton
      disabled={true}
=======
    <RaisedButton
      disabled
>>>>>>> refs/remotes/odota/master:components/Player/PlayerActions.jsx
      label="Ask a Coach"
      labelPosition="before"
      icon={<img src="/assets/dotacoach-32x24.png" alt="DotaCoach" />}
      style={{ marginLeft: 15 }}
      backgroundColor="rgba(255, 255, 255, .08)"
      hoverColor="rgba(255, 255, 255, .12)"
    />
  </CardActions>
);
