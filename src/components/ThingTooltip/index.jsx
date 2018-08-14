import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import items from 'dotaconstants/build/items.json';
import constants from '../constants';

const itemAbilities = {
  'active': {
    color: '#4183d7',
    headerColor: 'rgba(65, 131, 215, 0.25)',
    text: 'Active'
  },
  'passive': {
    color: '#a9a9a9',
    headerColor: 'rgba(169, 169, 169, 0.25)',
    text: 'Passive'
  },
  'use': {
    color: '#65a665',
    headerColor: 'rgba(101, 166, 101, 0.25)',
    text: 'Use'
  },
  'toggle': {
    color: '#a74d9b',
    headerColor: 'rgba(167, 77, 155, 0.25)',
    text: 'Toggle'
  },
}

const Wrapper = styled.div`
  width: 300px;
  background: #131519;
  overflow: hidden;
  border: 2px solid #27292b;
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
  margin-top: 18px;
  padding: 0px 13px 0px 13px;

  & #footer {
    color: #95a5a6;
  }

  & #value {
    font-weight: 500;
  }

  & #header{
    color: #95a5a6; 
  }
`

const Lore = styled.div`
  background-color: #0D1118;
  margin: 20px 9px 10px 9px;
  font-size: ${constants.fontSizeSmall};
  font-style: italic;
  color: #51565F;
  padding: 6px;
`

const Hint = styled.div`
  margin: 20px 9px 10px 9px;
  padding: 6px;
  background-color: #51565F;
  color: #080D15;
`

const Ability = styled.div`
  margin: 20px 9px 0px 9px;
  .ability-header {
    background: ${props => `linear-gradient(to right, #303338 , ${props.headerColor})`};
    padding: 6px; };
    color: ${props => props.color };
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
    border-top: 1px solid ${props => props.color };
    font-weight: normal;
    color: #95a5a6;
  }
`
const Components = styled.div`
  font-family: Tahoma;
  margin: 16px 9px 0px 9px;

  #header {
    font-size: 10px;
    color: #51565F;
  }

  .component {
    display: inline-block;
    margin-right: 5px;

    & img {
      height: 25px;
      opacity: 0.75;
    }

    #cost {
      font-size: 10px;
      position: relative;
      bottom: 6px;
      text-align: center;
      color: ${constants.colorYelorMuted};
    }
  }
`

const ThingTooltip = ({ thing, inflictor }) => (
  <Wrapper>
      <Header>
        <div className="header-content">
          <img id="item-img" src={`${process.env.REACT_APP_API_HOST}${thing.img}`} alt=""/>
          <HeaderText>
            <div>{thing.dname}</div>
            <div id="gold">{<img src="https://api.opendota.com/apps/dota2/images/tooltips/gold.png" alt=""/>}{thing.cost}</div>
          </HeaderText>
        </div>
      </Header>
    {(thing.attrib && thing.attrib.length > 0) &&
    <ContentBox>
      {(thing.attrib).map(attrib => <Attribute key={attrib.key}>
      <span id="header">{attrib.header}</span>
      <span id="value">{attrib.value}</span>
      <span id="footer"> {attrib.footer || ''}</span></Attribute>)}
    </ContentBox>
    }
    {['active', 'toggle', 'use', 'passive'].map(type => {
      if (thing[type]) {
        return thing[type].map(ability => 
          <Ability color={itemAbilities[type].color} headerColor={itemAbilities[type].headerColor}>
            <div className="ability-header">
              {`${itemAbilities[type].text}: ${ability.name}`}
              <div className="resources">
                {type === 'active' && thing.mc && 
                <span>
                  <ResourceIcon src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/mana.png`} alt="" />
                  {thing.mc}
                </span>
                }
                {type === 'active' && thing.cd && 
                <span>
                  <ResourceIcon src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/cooldown.png`} alt="" />
                  {thing.cd}
                </span>
                }
              </div>
            </div>
            <div className="ability-text">
              {ability.desc}
            </div>
          </Ability>
        )
      }
    })}
    {thing.hint && <Hint>{thing.hint}</Hint>}
    {thing.lore && <Lore> {thing.lore} </Lore>}
    {thing.components &&
    <Components>
      <div id="header">Components:</div>
      {thing.components.concat((items[`recipe_${inflictor}`] && [`recipe_${inflictor}`]) || []).map(component =>
        <div className="component">
          <img src={`${process.env.REACT_APP_API_HOST}${items[component].img}`} alt=""/>
          <div id="cost">{items[component].cost}</div>
        </div>
      )}
    </Components>
    }
  </Wrapper>
);

ThingTooltip.propTypes = {
  thing: propTypes.shape({}).isRequired,
};

export default ThingTooltip;
