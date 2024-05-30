import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ButtonsDiv } from './Styled';
import config from '../../config';

import { HomePageProps } from './Home';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;

  & .headline {
    text-transform: uppercase;
    margin-bottom: 20px;
    font-size: 20px;
  }

  & img {
    height: 32px;
    margin: 10px 15px;
    transition: var(--normalTransition);
  }

  & a {
    background-color: transparent !important;
    padding: 0 !important;
    border-width: 1px !important;
    border-radius: 0 !important;
  }
`;

const Sponsors = ({ strings }: HomePageProps) => (
  <StyledDiv>
    <div className="headline">{strings.home_sponsored_by}</div>
    <div className="images">
      {config.VITE_ENABLE_DOTACOACH && (
        <a
          href="https://dota-coach.com?s=OpenDota&c=main"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/images/dotaCoachLogo.svg" alt="Logo for sponsor, Dota-Coach.com" />
        </a>
      )}
      <a
        href="https://www.openai.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/images/openai-logo.png" alt="Open AI home" />
      </a>
      {config.VITE_ENABLE_RIVALRY && (
        <a
          href="https://www.rivalry.com/opendota"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/images/rivalry-logo.png" alt="Logo for sponsor, Rivalry.com" />
        </a>
      )}
      {config.VITE_ENABLE_GOSUAI && (
        <a
          href="https://gosu.ai/dota/?utm_source=opendota&utm_medium=cpc&utm_campaign=Home"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/images/gosu-logo.png" alt="Logo for sponsor, Gosu.ai" />
        </a>
      )}
    </div>
    <ButtonsDiv>
      <FlatButton
        label={
          <span style={{ fontWeight: 300 }}>{strings.home_become_sponsor}</span>
        }
        href="mailto:sponsor@opendota.com"
      />
    </ButtonsDiv>
  </StyledDiv>
);

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Sponsors);
