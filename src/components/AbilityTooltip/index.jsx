import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import constants from '../constants';

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  background: #131519;
  background: linear-gradient(135deg, #131519, #1f2228);
  overflow: hidden;
  border: 2px solid #27292b;
`;

const Header = styled.div`
background: linear-gradient(to right, #51565F , #303338);
position: relative;
`;

const HeaderContent = styled.div`
    position: relative;
    height: 50px;
    padding: 13px;
    white-space: nowrap;
  
    & img {
        display: inline-block;
        height: 100%;
        border: 1px solid #080D15;
    }

    & .name {
        display: inline-block;
        position: relative;
        left: 15px;
        bottom: 20px;
        height: 100%;
        font-size: ${constants.fontSizeCommon};
        text-transform: uppercase;  
        color: ${constants.primaryTextColor};
        font-weight: bold;
        text-shadow: 1px 1px black;
    }
`;

const HeaderBgImg = styled.div`
    position: absolute;
    left: -20px;
    height: 100%;
    width: 20%;
    background: ${({ img }) => `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${process.env.REACT_APP_API_HOST}${img}')`};
    background-color: transparent;
    background-repeat: no-repeat;
    transform: scale(4);
    filter: blur(15px);
`;

const Description = styled.div`
    position: relative;
    padding: 13px;
    border-top: 1px solid #080D15;
    color: #95a5a6;
    text-shadow: 1px 1px black;
`;

const Attributes = styled.div`
    position: relative;
    padding: 13px;

    & .attribute {
    text-shadow: 1px 1px black;
    padding: 2px 0;
    color: #95a5a6;

        & #value {
        color: ${constants.primaryTextColor};
        }
    }
`;
const Resources = styled.div`
    padding: 6px 13px 13px 13px;

    & span {
        margin-right: 15px;
    }
`;
const ResourceIcon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: sub;
  margin-right: 5px;
`;

const Break = styled.div`
    margin-left: 13px;
    margin-right: 13px;
    height: 1px;
    background-color: #080D15;
`;

const AbilityTooltip = ({ ability, inflictor }) => (

  <Wrapper>
    <Header>
      <HeaderBgImg img={ability.img} />
      <HeaderContent>
        {inflictor && inflictor.startsWith('special_') ?
          <img id="ability-img" src="/assets/images/dota2/talent_tree.svg" alt="" /> :
          <img id="ability-img" src={`${process.env.REACT_APP_API_HOST}${ability.img}`} alt="" />
            }
        <div className="name">{ability.dname}</div>
      </HeaderContent>
    </Header>
    {ability.desc &&
    <Description>
        {ability.desc}
    </Description>
    }
    {ability.attrib && ability.attrib.length > 0 && <Break />}
    {ability.attrib && ability.attrib.length > 0 &&
    <Attributes>
      <div>
        {(ability.attrib || []).map(attrib => (
          <div className="attribute" key={attrib.key}>
            <span id="header">{attrib.header} </span>
            <span id="value">{`${attrib.value}`}</span>
            <span id="footer"> {attrib.footer || ''}</span>
          </div>))}
      </div>
    </Attributes>
    }
    {(ability.mc || ability.cd) &&
    <Resources>
        {ability.mc &&
        <span>
          <ResourceIcon src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/mana.png`} alt="" />
          {`${ability.mc}`}
        </span>
        }
        {ability.cd &&
        <span>
          <ResourceIcon src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/cooldown.png`} alt="" />
          {`${ability.cd}`}
        </span>
        }
    </Resources>
}
  </Wrapper>

);

AbilityTooltip.propTypes = {
  ability: propTypes.shape({}).isRequired,
  inflictor: propTypes.string,
};

export default AbilityTooltip;
