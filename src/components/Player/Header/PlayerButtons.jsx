import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ActionUpdate from 'material-ui/svg-icons/navigation/refresh';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import strings from '../../../lang';
import { toggleShowForm as toggleShowFormAction } from '../../../actions';
import ShowFormToggle from '../../Form/ShowFormToggle';

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 14px;

  @media only screen and (max-width: 660px) {
    justify-content: center;

    & a {
      min-width: 50px !important;
    }

    & button {
      min-width: 50px !important;
    }

    & * {
      font-size: 0 !important;
      padding: 0 !important;
      margin: auto !important;
    }

    & span {
      margin: 0 !important;
    }
  }
`;
class PlayerButtons extends React.Component {
  UNSAFE_componentWillMount() {
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
      <Styled>
        <div
          data-hint={strings.app_refresh}
          data-hint-position="top"
        >
          <FlatButton
            icon={<ActionUpdate />}
            disabled={this.state.disableRefresh}
            onClick={() => {
              fetch(`${process.env.REACT_APP_API_HOST}/api/players/${playerId}/refresh`, { method: 'POST' });
              this.setState({ disableRefresh: true });
            }}
            label={strings.app_refresh_label}
          />
        </div>
        <ShowFormToggle showForm={showForm} toggleShowForm={toggleShowForm} />
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
      </Styled>);
  }
}

PlayerButtons.propTypes = {
  playerId: PropTypes.string,
  playerSoloCompetitiveRank: PropTypes.number,
  showForm: PropTypes.bool,
  toggleShowForm: PropTypes.func,
};

const mapStateToProps = state => ({
  showForm: state.app.form.show,
});

const mapDispatchToProps = dispatch => ({
  toggleShowForm: () => dispatch(toggleShowFormAction('tableFilter')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerButtons);
