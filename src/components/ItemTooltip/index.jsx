import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import constants from '../constants';
import { styleValues } from '../../utility';
import config from '../../config';
import AbilityBehaviour from '../AbilityTooltip/AbilityBehaviour';

const items = (await import('dotaconstants/build/items.json')).default;
const patchnotes = (await import('dotaconstants/build/patchnotes.json')).default;

// Get patchnotes from up to two last letter patches
function getRecentChanges(item) {
  const patches = Object.keys(patchnotes);
  const latest = patches[patches.length - 1];
  const previous = patches[patches.length - 2];
  const changes = [];
  // Latest patch wasn't a major patch e.g. 7_35b, return more entries
  if (latest.length > 4) {
    patchnotes[previous].items[item]?.forEach(note => changes.push({ patch: previous, note }));
  }
  patchnotes[latest].items[item]?.forEach(note => changes.push({ patch: latest, note }));
  return changes;
}

const textHighlightColors = {
  use: '#95c07a',
  active: '#9f9fcf',
  passive: '#7e8c9d'
};

const Wrapper = styled.div`
  width: 300px;
  background: linear-gradient(#16232B, #10171D);
  color: #7a80a7;
  overflow: hidden;
  border: 2px solid #27292b;

  hr {
    border-color: #29353b;
    margin: 0 9px;
  }
`;

const Header = styled.div`
  font-size: ${constants.fontSizeCommon};
  text-transform: uppercase;
  color: ${constants.colorBlue};
  background-color: #222C35;

  .header-content {
    height: 50px;
    padding: 13px;
    white-space: nowrap;
    display: flex;
  }

  #item-img {
    display: inline-block;
    height: 100%;
    width: 100%;
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
    font-size: ${constants.fontSizeSmall};

    & img {
      height: 13px;
      margin-right: 5px;
      position: relative;
      top: 2px;
    }
  }

  & .neutral-header {
    font-weight: normal;
    text-transform: none;
    font-size: ${constants.fontSizeSmall};

    & .neutral_tier_2 {
      color: ${constants.colorNeutralTier2};
    }

    & .neutral_tier_3 {
      color: ${constants.colorNeutralTier3};
    }

    & .neutral_tier_4 {
      color: ${constants.colorNeutralTier4};
    }

    & .neutral_tier_5 {
      color: ${constants.colorNeutralTier5};
    }
  }

`;

const ResourceIcon = styled.img`
  max-width: 16px;
  max-height: 16px;
  vertical-align: sub;
  margin-right: 5px;
`;

const Attributes = styled.div`
  padding: 0 8px;
  margin: 9px 0;

  & #footer {
    color: #95a5a6;
  }

  & #value {
    font-weight: 500;
  }

  & #header {
    color: #95a5a6;
  }
`;

const GameplayChanges = styled.div`
  margin: 10px 9px;
  background-color: #18212a;
  padding: 6px;

  & .patch {
    color: #a09259;
    margin-right: 2px;
  }

  & .note {
    color: grey;
  }
`;

const GameplayChange = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 10px;
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
  margin: 10px 9px;
  padding: 6px;
  background-color: #51565F;
  color: #080D15;
`;

const Components = styled.div`
  font-family: Tahoma;
  margin: 6px 9px;

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

const AbilityComponent = styled.div`
  margin: 10px 9px;

  & .ability-name {
    font-size: 13px;
    font-weight: bold;
    vertical-align: middle;
    padding-left: 4px;
    text-shadow: 1px 1px 0 #00000090;
  }

  & .header {
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;

    .entry {
      color: ${constants.textColorPrimary};
      margin-left: 10px;
    }
  }

  & .content {
    padding: 5px;
  }

  .active {
    color: #7a80a7;

    & .header {
      color: ${textHighlightColors.active};
      background: linear-gradient(to right, #373B7F, #181E30);
    }

    & .content {
      background-color: #181E30;
    }
  }

  .passive {
    color: #626d7b;

    & .header {
      color: ${textHighlightColors.passive};
      background: linear-gradient(to right, #263540, #1C2630);
    }

    & .content {
      background-color: #1C2630;
    }
  }

  .use {
    color: #7b8a72;

    & .header {
      color: ${textHighlightColors.use};
      background: linear-gradient(to right, #273F27, #17231F);
    }

    & .content {
      background-color: #17231F;
    }
  }
`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Ability = (item, type, title, description, hasNonPassive) => {
  const styleType = abilityType[type] || 'passive';
  const highlightStyle = `font-weight:500;color:${textHighlightColors[styleType]};text-shadow:2px 2px 0 #00000090;`;
  return (
    <AbilityComponent>
      <div className={styleType}>
        <div className='header'>
          <span className='ability-name'>{`${capitalizeFirstLetter(type)}: ${title}`}</span>
          <div>
            {item.mc && styleType !== 'passive' &&
              <span className='entry'>
                <ResourceIcon src='/assets/images/dota2/ability_manacost.png' alt='Mana icon' />
                <span className='values'>{item.mc}</span>
              </span>}
            {item.hc && styleType !== 'passive' &&
              <span className='entry'>
                <ResourceIcon src='/assets/images/dota2/ability_healthcost.png' alt='Health icon' />
                <span className='values'>{item.hc}</span>
              </span>}
            {item.cd && ((!hasNonPassive && styleType === 'passive') || styleType !== 'passive') &&
              <span className='entry'>
                <ResourceIcon src='/assets/images/dota2/ability_cooldown.png' alt='Cooldown icon' />
                <span className='values'>{item.cd}</span>
              </span>}
          </div>
        </div>
        <div className='content'>
          <div className='ability-text' ref={el => styleValues(el, highlightStyle)}>
            {description}
          </div>
        </div>
      </div>
    </AbilityComponent>
  );
};

const AttributeContainer = ({stats = []}) => (
    <Attributes>
      {stats?.map((attrib) => (
        <div key={attrib.key}>
          <div id='header' ref={el => styleValues(el)}>
            {attrib.display.replace('{value}', attrib.value)}
          </div>
        </div>
      ))}
    </Attributes>
  );

// How each type should be styled
const abilityType = {
  active: 'active',
  toggle: 'active',
  passive: 'passive',
  upgrade: 'passive',
  use: 'use'
};

const ItemTooltip = ({ item, inflictor }) => {
  const recentChanges = getRecentChanges(inflictor);
  const upperCaseStats = [];
  const stats = item.attrib.filter(a => a.hasOwnProperty('display')).filter(a => {
    if (!/[a-z]/.test(a.display.replace('{value}', ''))) {
      upperCaseStats.push(a);
      return false;
    }
    return true;
  });
  const abilities = item.abilities || [];
  const hasNonPassive = abilities.some((a) => ['active', 'use'].includes(a.type));
  return (
    <Wrapper>
      <Header>
        <div className='header-content'>
          <img id='item-img' src={`${config.VITE_IMAGE_CDN}${item.img}`} alt={item.dname} />
          <HeaderText>
            <div>{item.dname}</div>
            {item.tier ? <div className='neutral-header'><span
              className={`neutral_tier_${item.tier}`}
            >{`Tier ${item.tier} `}
                                                         </span><span>Neutral Item</span>
                         </div>
              : <div id='gold'><img
                  src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/gold.png`}
                  alt='Gold'
              />{item.cost}
                </div>}
          </HeaderText>
        </div>
      </Header>
      {(item.behavior || item.dmg_type || item.bkbpierce || item.dispellable) &&
        <div><AbilityBehaviour ability={item} />
          <hr />
        </div>}
      {(stats && stats.length > 0) &&
        <AttributeContainer stats={stats} />}
      {abilities.map(({ type, title, description }) => Ability(item, type, title, description, hasNonPassive))}
      {item.hint?.map((hint) => <Hint>{hint}</Hint>)}
      {upperCaseStats.length > 0 &&
        <AttributeContainer stats={upperCaseStats} />}
      {item.lore && <Lore>{item.lore}</Lore>}
      {recentChanges.length > 0 &&
        <GameplayChanges>
          {recentChanges.map(({ patch, note }) => (
            <GameplayChange>
              <span className='patch'>{`${patch.replace('_', '.')}:`}</span><span className='note'>{note}</span>
            </GameplayChange>
          ))}
        </GameplayChanges>}
      {item.components &&
        <Components>
          <div id='header'>Components:</div>
          {item.components.concat((items[`recipe_${inflictor}`] && [`recipe_${inflictor}`]) || []).filter(Boolean).map(component =>
            items[component] &&
            (
              <div className='component'>
                <img src={`${config.VITE_IMAGE_CDN}${items[component].img}`} alt='' />
                <div id='cost'>{items[component].cost}</div>
              </div>
            ))
          }
        </Components>
      }
    </Wrapper>
  );
};

ItemTooltip.propTypes = {
  item: propTypes.shape({}).isRequired,
  inflictor: propTypes.string.isRequired
};

export default ItemTooltip;
