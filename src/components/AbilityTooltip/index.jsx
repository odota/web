import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import constants from '../constants';
import { styleValues } from '../../utility';

function formatValues(values) {
  if (Array.isArray(values)) {
    return values.filter(value => value).join(' / ');
  }
  return values;
}

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
        bottom: 1px;
        height: 50px;
        width: 220px;
        font-size: ${constants.fontSizeCommon};
        text-transform: uppercase;  
        color: ${constants.primaryTextColor};
        font-weight: bold;
        text-shadow: 1px 1px black;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 50px;
        letter-spacing: 1px;
    }
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

const Attributes = styled.div`
    position: relative;
    padding: 13px;

    & .attribute {
    text-shadow: 1px 1px black;
    padding: 2px 0;
    color: #95a5a6;

        & #value {
        color: ${constants.primaryTextColor};
        font-weight: 500;
        }
    }
`;

const Behavior = styled.div`
    position: relative;
    padding: 13px;
    color: #95a5a6;

    span {  
        &:nth-child(2) {
          color: ${constants.primaryTextColor};
          font-weight: 500;
        }
        &[type="Yes"] {
            color: ${constants.colorGreen};
        }
        &[type="No"] {
            color: ${constants.colorRed};
        }
        &[type="Pure"] {
            color: #bc7bfc;
        }
        &[type="Physical"] {
            color: #7bb2fc;
        }
    }
`;

const Resources = styled.div`
    padding: 6px 13px 13px 13px;

    & span {
        margin-right: 7px;
    }

    .values {
      font-weight: 500;
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
          <img id="ability-img" src={`${process.env.REACT_APP_IMAGE_CDN}${ability.img}`} alt="" />
            }
        <div className="name">{ability.dname}</div>
      </HeaderContent>
    </Header>
    {(ability.behavior || ability.dmg_type || ability.bkbpierce) &&
    <div>
      <Behavior>
        {ability.behavior ? <div><span>TARGET: </span><span>{formatValues(ability.behavior)}</span></div> : ''}
        {ability.dmg_type ? <div><span>DAMAGE TYPE: </span><span type={ability.dmg_type}>{`${ability.dmg_type}`}</span></div> : ''}
        {ability.bkbpierce ? <div><span>PIERCES SPELL IMMUNITY: </span><span type={ability.bkbpierce}>{`${ability.bkbpierce}`}</span></div> : ''}
      </Behavior>
      <Break />
    </div>
    }
    {ability.desc &&
    <Description innerRef={el => styleValues(el)}>
        {ability.desc}
    </Description>
    }
    {ability.attrib && ability.attrib.length > 0 &&
    <div>
      <Break />
      <Attributes>
        <div>
          {(ability.attrib || []).map(attrib => (
            <div className="attribute" key={attrib.key}>
              <span id="header">{attrib.header} </span>
              <span id="value">{formatValues(attrib.value)}</span>
              <span id="footer"> {attrib.footer || ''}</span>
            </div>))}
          {ability.dmg ? <div className="attribute">DAMAGE: <span id="value">{formatValues(ability.dmg)}</span></div> : ''}
        </div>
      </Attributes>
    </div>
    }
    {(ability.mc || ability.cd) &&
    <Resources>
        {ability.mc &&
        <span>
          <ResourceIcon src={`${process.env.REACT_APP_IMAGE_CDN}/apps/dota2/images/tooltips/mana.png`} alt="" />
          <span className="values">{formatValues(ability.mc)}</span>
        </span>
        }
        {ability.cd &&
        <span>
          <ResourceIcon src={`${process.env.REACT_APP_IMAGE_CDN}/apps/dota2/images/tooltips/cooldown.png`} alt="" />
          <span className="values">{formatValues(ability.cd)}</span>
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
