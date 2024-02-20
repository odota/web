import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import config from '../../../config';

const Styled = styled.div`
text-align: center;
padding-top: 5%;

.playerProfilePrivateTitle {
  font-size: 2rem;
  margin-bottom: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lockIcon {
  font-size: 1.8rem;
  margin-right: 2%;
}

.playerProfilePrivateDescription {
  margin-bottom: 2%;
}

.signInWithSteamButton {
  border: solid 1px #FFFFFF;
  color: #FFFFFF;
  padding: 1% 2%;
}
`

const PlayerProfilePrivate = ({ strings }) => {
  const handleButtonClick = () => {
    window.location.href = `${config.VITE_API_HOST}/login`;
  };
  const playerProfilePrivateTitle = (strings.player_profile_private_title || "").toUpperCase();

  return (
    <Styled>
      <div>
        <div className="playerProfilePrivateTitle">
          <LockIcon className="lockIcon" />
          <div>{playerProfilePrivateTitle}</div>
        </div>
        <div className="playerProfilePrivateDescription">{strings.player_profile_private_description}</div>
        <Button
          className="signInWithSteamButton"
          onClick={handleButtonClick}
        >
          {strings.sign_in_with_steam}
        </Button>
      </div>
    </Styled>
  );
}

PlayerProfilePrivate.propTypes = {
  strings: PropTypes.shape({}),
}

const mapStateToProps = state => ({
  strings: state.app.strings,
})

export default connect(mapStateToProps)(PlayerProfilePrivate);