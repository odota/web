/* global API_HOST */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ActionUpdate from 'material-ui/svg-icons/action/update';
import ReactTooltip from 'react-tooltip';
import strings from 'lang';
import fetch from 'isomorphic-fetch';
import styles from './PlayerButtons.css';

class PlayerButtons extends React.Component {
  componentWillMount() {
    this.setState({ disableRefresh: false });
  }

  render() {
    const { playerId,
            playerSoloCompetitiveRank,
          } = this.props;
    return (
      <div className={styles.container}>
        <div
          className={styles.refreshButton}
          data-hint={strings.app_refresh}
          data-hint-position="top"
        >
          <FlatButton
            icon={<ActionUpdate />}
            disabled={this.state.disableRefresh}
            onClick={() => {
              fetch(`${API_HOST}/api/players/${playerId}/refresh`, { method: 'POST' });
              this.setState({ disableRefresh: true });
            }}
          />
        </div>
        <FlatButton
        // not working until dotacoach supports passing player only data (no match data here)
          disabled
          label={strings.app_dotacoach}
          labelPosition="after"
          icon={<img src="/assets/images/dotacoach-32x24.png" alt="DotaCoach" />}
          style={{ marginLeft: 15 }}
          href={`https://dotacoach.org/Hire/Yasp?userSteamId=${playerId}&playerMmr=${playerSoloCompetitiveRank}`}
        />
      </div>);
  }
}

export default PlayerButtons;
