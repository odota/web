import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionUpdate from 'material-ui/svg-icons/action/update';
import ReactTooltip from 'react-tooltip';
import strings from 'lang';
import fetch from 'isomorphic-fetch';
import { API_HOST } from 'config';
import styles from './PlayerButtons.css';

class PlayerButtons extends React.Component {
  componentWillMount() {
    this.setState({ showRefresh: true });
  }

  render() {
    const { playerId,
            playerSoloCompetitiveRank,
          } = this.props;
    return (<CardActions>
      <div className={styles.container}>
        <div data-tip data-for="update">
          <FlatButton
            icon={<ActionUpdate />}
            style={{ minWidth: 50, display: this.state.showRefresh ? 'block' : 'none' }}
            onClick={() => {
              fetch(`${API_HOST}/api/players/${playerId}/refresh`, { method: 'POST' });
              this.setState({ showRefresh: false });
            }}
          />
        </div>
        <ReactTooltip id="update" place="left" type="light" effect="float">
          <div style={{ textAlign: 'left' }}>
            {strings.app_refresh}
          </div>
        </ReactTooltip>
        {
        // not working until dotacoach supports passing player only data (no match data here)
          <FlatButton
            disabled
            label={strings.app_dotacoach}
            labelPosition="after"
            icon={<img src="/assets/images/dotacoach-32x24.png" alt="DotaCoach" />}
            style={{ marginLeft: 15 }}
            href={`https://dotacoach.org/Hire/Yasp?userSteamId=${playerId}&playerMmr=${playerSoloCompetitiveRank}`}
          />
        }
      </div>
    </CardActions>);
  }
}

export default PlayerButtons;
