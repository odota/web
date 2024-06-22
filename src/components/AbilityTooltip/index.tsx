import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import constants from '../constants';
import { styleValues, formatValues } from '../../utility';
import AbilityBehaviour from './AbilityBehaviour';
import config from '../../config';

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
    background: ${({ img }: any) => `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${config.VITE_IMAGE_CDN}${img}')`};
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

const AbilityTooltip = ({ ability, inflictor }: any) => (

  <Wrapper>
    <Header>
      {/*@ts-ignore*/}
      <HeaderBgImg img={ability.img} />
      <HeaderContent>
        {inflictor && inflictor.startsWith('special_') ?
          <img id="ability-img" src="/assets/images/dota2/talent_tree.svg" alt="Talent Tree" /> :
          <img id="ability-img" src={`${config.VITE_IMAGE_CDN}${ability.img}`} alt="Talent Tree" />
            }
        <div className="name">{ability.dname}</div>
      </HeaderContent>
    </Header>
    {(ability.behavior || ability.dmg_type || ability.bkbpierce) &&
    <div>
      <AbilityBehaviour ability={ability} />
      <Break />
    </div>
    }
    {ability.desc &&
    <Description
    //@ts-ignore
    ref={(el: any) => styleValues(el)}>
        {ability.desc}
    </Description>
    }
    {ability.attrib && ability.attrib.length > 0 &&
    <div>
      <Break />
      <Attributes>
        <div>
          {(ability.attrib || []).map((attrib: any) => (
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
          <ResourceIcon src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/mana.png`} alt="Mana" />
          <span className="values">{formatValues(ability.mc)}</span>
        </span>
        }
        {ability.cd &&
        <span>
          <ResourceIcon src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/cooldown.png`} alt="Cooldown" />
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
