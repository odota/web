import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import config from '../../config';
import useStrings from '../../hooks/useStrings.hook';

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
    border: solid 1px #ffffff;
    color: #ffffff;
    padding: 1% 2%;
  }
`;

const PlayerProfilePrivate = () => {
  const strings = useStrings();
  const handleButtonClick = () => {
    window.location.href = `${config.VITE_API_HOST}/login`;
  };
  const playerProfilePrivateTitle = (
    strings.player_profile_private_title || ''
  ).toUpperCase();

  return (
    <Styled>
      <div>
        <div className="playerProfilePrivateTitle">
          <LockIcon className="lockIcon" />
          <div>{playerProfilePrivateTitle}</div>
        </div>
        <div className="playerProfilePrivateDescription">
          {strings.player_profile_private_description}
        </div>
        <Button className="signInWithSteamButton" onClick={handleButtonClick}>
          {strings.sign_in_with_steam}
        </Button>
      </div>
    </Styled>
  );
};

export default PlayerProfilePrivate;
