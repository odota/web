import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import items from 'dotaconstants/build/items.json';
import constants from '../constants';
import { styleValues } from '../../utility';

const itemAbilities = {
  active: {
    text: 'Active',
  },
  passive: {
    text: 'Passive',
  },
  use: {
    text: 'Use',
  },
  toggle: {
    text: 'Toggle',
  },
};

const Wrapper = styled.div`
  width: 300px;
  background: rgb(21, 27, 29);
  overflow: hidden;
  border: 2px solid #27292b;
`;

const Header = styled.div`
  font-size: ${constants.fontSizeCommon};
  text-transform: uppercase;
  color: ${constants.colorBlue};
  background-color: rgba(0, 0, 0, 0.08);
  
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
  letter-spacing: 1px;

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
`;

const Attribute = styled.div`
  padding: 2px 0;
`;

const ResourceIcon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: sub;
  margin-right: 5px;
`;

const Attributes = styled.div`
  margin-top: 8px;
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
`;

const Lore = styled.div`
  background-color: #0D1118;
  margin: 10px 9px 10px 9px;
  font-size: ${constants.fontSizeSmall};
  font-style: italic;
  color: #51565F;
  padding: 6px;
`;

const Hint = styled.div`
  margin: 10px 9px 10px 9px;
  padding: 6px;
  background-color: #51565F;
  color: #080D15;
`;

const Ability = styled.div`
  margin: 10px 9px 0px 9px;
  background-color: rgba(30, 37, 43, 0.67); 
  color: rgb(176, 198, 212);

  .ability-header {
    padding: 6px; 
    text-shadow: 1px 1px 1px black;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.18);
    background: linear-gradient(to right,rgba(255, 255, 255, 0.13) ,transparent )  ;
    font-weight: bold;

    & .resources {
      float: right;
      color: ${constants.primaryTextColor};
      font-weight: normal;

      & > span {
        margin-left: 10px;
      }

      & .values {
        font-weight: 500;
      }
    }
  }

  .ability-text {
    padding: 6px;
    font-weight: normal;
    color: rgb(169, 181, 193);
    text-shadow: 1px 1px black;
  }
`;
const Components = styled.div`
  font-family: Tahoma;
  margin: 6px 9px 0px 9px;

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
`;

const ItemTooltip = ({ item, inflictor }) => (
  <Wrapper>
    <Header>
      <div className="header-content">
        <img id="item-img" src={`${process.env.REACT_APP_IMAGE_CDN}${item.img}`} alt="" />
        <HeaderText>
          <div>{item.dname}</div>
          <div id="gold">{<img src={`${process.env.REACT_APP_IMAGE_CDN}/apps/dota2/images/tooltips/gold.png`} alt="" />}{item.cost}</div>
        </HeaderText>
      </div>
    </Header>
    {(item.attrib && item.attrib.length > 0) &&
    <Attributes>
      {(item.attrib).map((attrib) => (
        <Attribute key={attrib.key}>
          <span id="header">{attrib.header} </span>
          <span id="value">{`${attrib.value}`}</span>
          <span id="footer"> {attrib.footer || ''}</span>
        </Attribute>
      ))}
    </Attributes>
    }
    {['active', 'toggle', 'use', 'passive'].map((type) => {
      if (item[type]) {
        return item[type].map(ability =>
          (
            <Ability>
              <div className="ability-header">
                {`${itemAbilities[type].text}: ${ability.name}`}
                <div className="resources">
                  {type === 'active' && item.mc &&
                  <span>
                    <ResourceIcon src={`${process.env.REACT_APP_IMAGE_CDN}/apps/dota2/images/tooltips/mana.png`} alt="" />
                    <span className="values">{item.mc}</span>
                  </span>
                }
                  {type === 'active' && item.cd &&
                  <span>
                    <ResourceIcon src={`${process.env.REACT_APP_IMAGE_CDN}/apps/dota2/images/tooltips/cooldown.png`} alt="" />
                    <span className="values">{item.cd}</span>
                  </span>
                }
                </div>
              </div>
              <div className="ability-text" ref={el => styleValues(el)}>
                {ability.desc}
              </div>
            </Ability>
          ));
      }
      return null;
    })}
    {item.hint && <Hint>{item.hint}</Hint>}
    {item.lore && <Lore>{item.lore}</Lore>}
    {item.components &&
    <Components>
      <div id="header">Components:</div>
      {item.components.concat((items[`recipe_${inflictor}`] && [`recipe_${inflictor}`]) || []).filter(Boolean).map(component =>
      items[component] &&
        (
          <div className="component">
            <img src={`${process.env.REACT_APP_IMAGE_CDN}${items[component].img}`} alt="" />
            <div id="cost">{items[component].cost}</div>
          </div>
        ))
      }
    </Components>
    }
  </Wrapper>
);

ItemTooltip.propTypes = {
  item: propTypes.shape({}).isRequired,
  inflictor: propTypes.string.isRequired,
};

export default ItemTooltip;
