import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import constants from '../constants';

function extractAbilities(text) {
  const types = {actives: [], passives: [], }
  const abilities = text && text.split("/n")
  console.log(abilities)
  return text
}

const Wrapper = styled.div`
  width: 300px;
  background: #131519;
  overflow: hidden;
`;

const Header = styled.div`
  font-size: ${constants.fontSizeCommon};
  text-transform: uppercase;
  color: ${constants.colorBlue};
  background: linear-gradient(to bottom, #51565F , #303338);
  
  .header-content {
    height: 50px;
    padding: 13px 13px 13px 13px;
    white-space: nowrap;
  }

  #item-img {
    display: inline-block;
    height: 100%;
    border: 1px solid #080D15;
    box-sizing: border-box;
  } 
`;

const HeaderText = styled.div`
  height: 100%;
  position: relative;
  bottom: 2px;
  display: inline-block;
  margin-left: 15px;
  color: ${constants.primaryTextColor};
  font-weight: bold;

  & div {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & #gold {
    color: ${constants.colorGolden};
    font-weight: normal;

    & img {
      height: 13px;
      margin-right: 5px;
      position: relative;
      top: 2px;
    }
  }
`

const HeaderContent = styled.div`
  font-size: ${constants.fontSizeSmall};
  text-transform: none;
  display: block;
  color: ${constants.colorMutedLight};
  margin-bottom: 5px;
`;

const Trim = styled.hr`
  border: 0;
  height: 1px;
  background: linear-gradient(to right, ${constants.colorMutedLight}, rgba(0, 0, 0, 0));
  margin: 12px 0;
`;

const Attribute = styled.div`
  padding: 2px 0;
`;

const Resources = styled.div`
  margin-top: 6px;
`;

const Resource = styled.span`
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
`;

const ResourceIcon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: sub;
  margin-right: 5px;
`;

const ContentBox = styled.div`
  padding: 13px;
`

const Lore = styled.div`
  background-color: #0D1118;
  margin: 20px 9px 10px 9px;
  font-size: ${constants.fontSizeSmall};
  font-style: italic;
  color: #51565F;
  padding: 6px;

`

const Ability = styled.div`
  margin: 20px 9px 10px 9px;

  .ability-header {
    background: linear-gradient(to right, #303338, #51565F);
    padding: 6px;
    color: #4183d7;
    font-weight: bold;

    & .resources {
      float: right;
      color: ${constants.primaryTextColor};
      font-weight: normal;

      & > span {
        margin-left: 10px;
      }
    }
  }

  .ability-text {
    padding: 6px;
    background-color: #303338;
    border-top: 2px solid #4183d7;
  }
`

const ThingTooltip = ({ thing }) => (
  <Wrapper>
      <Header>
        <div className="header-content">
          <img id="item-img" src={`${process.env.REACT_APP_API_HOST}${thing.img}`} alt=""/>
          <HeaderText>
            <div>{thing.dname}</div>
            <div id="gold">{<img src="https://api.opendota.com/apps/dota2/images/tooltips/gold.png" alt=""/>}{thing.cost}</div>
          </HeaderText>
        </div>
        {/*thing.lore &&
        <HeaderContent>{thing.lore}</HeaderContent>}
        {thing.desc &&
        <HeaderContent>{thing.desc}</HeaderContent>*/}
      </Header>
    <ContentBox>
    {(thing.attrib || []).map(attrib => <Attribute key={attrib.key}>{`${attrib.header} ${attrib.value} ${attrib.footer || ''}`}</Attribute>)}
    </ContentBox>
    <Ability>
      <div className="ability-header">
        <span>Active: Soul Burn</span>
        <div className="resources">
          {thing.mc && 
          <span>
            <ResourceIcon src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/mana.png`} alt="" />
            {thing.mc}
          </span>
          }
          {thing.cd && 
          <span>
            <ResourceIcon src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/cooldown.png`} alt="" />
            {thing.cd}
          </span>
          }
        </div>
      </div>
      <div className="ability-text">{extractAbilities(thing.desc)}</div>
    </Ability>

    <Lore>
      {thing.lore}
    </Lore>
  </Wrapper>
);

ThingTooltip.propTypes = {
  thing: propTypes.shape({}).isRequired,
};

export default ThingTooltip;
