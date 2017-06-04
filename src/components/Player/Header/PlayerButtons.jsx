/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ActionUpdate from 'material-ui/svg-icons/action/update';
import strings from 'lang';
import fetch from 'isomorphic-fetch';
import { toggleShowForm } from 'actions';
import ShowFormToggle from 'components/Form/ShowFormToggle';
import { FORM_NAME } from '../TableFilterForm';
import styles from './PlayerButtons.css';

class PlayerButtons extends React.Component {
  componentWillMount() {
    this.setState({ disableRefresh: false });
  }

  render() {
    const {
      playerId,
      playerSoloCompetitiveRank,
      showForm,
      toggleShowForm,
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
            label={strings.app_refresh_label}
          />
        </div>
        <ShowFormToggle formName={FORM_NAME} showForm={showForm} toggleShowForm={toggleShowForm} />
        <FlatButton
          label={strings.app_dotacoach}
          labelPosition="after"
          icon={<img src="/assets/images/dotacoach-32x24.png" alt="DotaCoach" />}
          style={{ marginLeft: 15 }}
          href={`https://dotacoach.org/Hire/OpenDota?userSteamId=${playerId}&playerMmr=${playerSoloCompetitiveRank}`}
        />
        <FlatButton
          label={strings.app_pvgna}
          labelPosition="after"
          icon={<img src="/assets/images/pvgna-guide-icon.png" alt={strings.app_pvgna_alt} height="24px" />}
          style={{ marginLeft: 15 }}
          href={`https://pvgna.com/?userSteamId=${playerId}&playerMmr=${playerSoloCompetitiveRank}&ref=yasp`}
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  showForm: state.app.form.show,
});

const mapDispatchToProps = dispatch => ({
  toggleShowForm: () => dispatch(toggleShowForm('tableFilter')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerButtons);
