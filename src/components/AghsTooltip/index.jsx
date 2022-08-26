import React from 'react';
import propTypes, { string } from 'prop-types';
import styled from 'styled-components';
import constants from '../constants';
import AbilityTooltip from '../AbilityTooltip';

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  background: #131519;
  background: linear-gradient(135deg, #131519, #1f2228);
  overflow: hidden;
  border: 2px solid #27292b;

  & > div:nth-child(2) {
    position: relative;
    border-top: 1px solid #080D15;
  }
`;

const InnerWrapper = styled.div`
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(to right, #51565F , #303338);
  position: relative;
`;

const HeaderContent = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  padding: 13px;
  white-space: nowrap;

  & img {
      display: inline-block;
      height: 100%;
      border: 1px solid #080D15;
  }

  & .name {
      font-size: ${constants.fontSizeCommon};
      text-transform: uppercase;  
      color: ${constants.primaryTextColor};
      font-weight: bold;
      text-shadow: 1px 1px black;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      letter-spacing: 1px;
  }
`;

const UpgradeTypeWrapper = styled.div`

  display: flex;
  flex-direction: row;
  padding: 2px 0px;
  margin: 2px 0px;
  border-radius: 4px;

  & .upgrade_type_text {
    background-color: #1c2e50;
    color: #DDDDDD;
    font-size: ${constants.fontSizeTiny};
    display: inline-flex;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 2px 4px;
  }

  & .upgrade_type_filler {
    display: inline-flex;
  }

`;

const HeaderText = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;

`;


const HeaderBgImg = styled.div`
    position: absolute;
    left: -20px;
    height: 100%;
    width: 20%;
    background: ${({ img }) => `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${process.env.REACT_APP_IMAGE_CDN}${img}')`};
    background-color: transparent;
    background-repeat: no-repeat;
    transform: scale(4);
    filter: blur(15px);
`;

const Description = styled.div`
    position: relative;
    padding: 13px;
    color: #95a5a6;
    text-shadow: 1px 1px black;
`;


const Break = styled.div`
    margin-left: 13px;
    margin-right: 13px;
    height: 1px;
    background-color: #080D15;
`;


const AghsTooltip = (props) => {

  const aghs = props.aghs;

  const renderToolTip = (aghs) => {
    if(aghs.new_skill === true) {
      // display ability type TT
      return (
      <AbilityTooltip ability={aghs.skillObj} />
      )
    }
    else{
      return (
      // display minimal description
      <InnerWrapper>
        <Header>
          <HeaderBgImg img={aghs.skillObj.img} />
          <HeaderContent>
            <img id="ability-img" src={`${process.env.REACT_APP_IMAGE_CDN}${aghs.skillObj.img}`} alt="" />
            <HeaderText>
              <div className="name">{aghs.skill_name_loc}</div>
              <UpgradeTypeWrapper>
                <div className="upgrade_type_text">Ability Upgrade</div>
                <div className="upgrade_type_filler"/>
              </UpgradeTypeWrapper>
            </HeaderText>
          </HeaderContent>
        </Header>
        <Description>
          {aghs.desc}
        </Description>
      </InnerWrapper>
      )
    }
  }

  return (
    <Wrapper>
      {renderToolTip(aghs)}
    </Wrapper>
  );
}

AghsTooltip.propTypes = {
  aghs: propTypes.shape({}).isRequired,
};

export default AghsTooltip;
