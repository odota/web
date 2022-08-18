import React from 'react';
import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';
import constants from '../constants';


const Wrapper = styled.div`
  width: 300px;
  background: rgb(21, 27, 29);
  overflow: hidden;
  border: 2px solid #27292b;
`;

const Header = styled.div`
  font-size: ${constants.fontSizeCommon};
  color: ${constants.colorBlue};
  background-color: rgba(102, 187, 255, 0.2);
  
  .header-content {
    height: 25px;
    padding: 5px 13px 5px 13px;
    white-space: nowrap;
    display: flex;
  }

  #scepter-img {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 15%; 
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    width: auto;
  } 

  #shard-img {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 15%; 
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    width: auto;
  } 
`;

const HeaderText = styled.div`
  height: 100%;
  position: relative;
  display: inline-block;
  margin-left: 8px;
  color: ${constants.colorBlue};
  font-weight: bold;
  letter-spacing: 1px;

  & div {
    width: 200px;
    padding-bottom: 5px;
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

const NewAbility = styled.div`
  background-color: #335380;
  text-transform: uppercase;
  color: ${constants.textColorPrimary};
  text-align: center;
  font-size: 10px;
  padding: 0px 6px;
  width: 40%;
  margin: 4px 0px;
`;

const Attributes = styled.div`
  margin-top: 4px;
  line-height: 16px;
  
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

const Body = styled.div`
  display: flex;

  & .ability-icon {

  }

  & .ability-title {

  }

  margin: 10px 9px 10px 9px;
  padding: 6px;
  font-weight: bold;
  color: ${constants.colorBlueGray};
`;

const Ability = styled.div`
  margin-left: 8px;
  color: rgb(176, 198, 212);

  .ability-text {
    padding: 6px;
    font-weight: normal;
    color: rgb(169, 181, 193);
    text-shadow: 1px 1px black;
  }
`;

const AbilityIcon = styled.img`
  border-radius: 4px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 15%;
  opacity: .7;
  overflow: hidden;
  height: 35px;
  transition: opacity .2s, box-shadow .4s, transform .2s;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 150px rgba(255, 255, 255, .4);
    transform: scale(1.1);
  }
`;
const Break = styled.div`
    margin-left: 13px;
    margin-right: 13px;
    height: 1px;
    background-color: #080D15;
`;
const AbilityTitle = styled.span`
  color: ${constants.textColorPrimary};
  text-transform: uppercase;
  font-size: 1rem;
`;

const AbilityDescription = styled.p`
  line-height: 16px;
  color: #c8dade;  
  margin: 0px;
  padding: 0px;
  font-weight: normal;
`;

const CombinedWrapper = styled.div`
  display: flex;
  background-color: rgba(0,0,255,0.01);
  flex-direction: column;
  gap: 10px;
  margin: 0 -20px;
`
  ;

const ItemTooltip = ({ upgrades, skills }) => {
  let newScepterAbility = null;
  let newShardAbility = null;

  function getAbilityImage(skillName) {
    const ability = skills.find(skill =>
      skill.data.dname === skillName
    )
    return ability.data.img
  }

  if (upgrades.has_shard) {
    const newShardSkillName = upgrades.shard_skill_name;
    const newShardSkillObject = skills.find(skill =>
      skill.data.dname === newShardSkillName
    ).data;
    newShardAbility = (
      <Wrapper>
        <Header>
          <div className="header-content">    
            <img id="shard-img" src="/assets/images/dota2/shard_0.png" alt="" />
            <HeaderText>
              <div>Aghanim&lsquo;s Shard</div>
            </HeaderText>
          </div>
        </Header>
        <Body>
          <AbilityIcon src={`${process.env.REACT_APP_IMAGE_CDN}${getAbilityImage(upgrades.shard_skill_name)}`} />
          <Ability>
            <AbilityTitle>
              {upgrades.shard_skill_name}
            </AbilityTitle>
            <NewAbility>
              {upgrades.shard_new_skill ? (<span>New ability</span>) : (<span>Upgrade</span>)}
            </NewAbility>
            <AbilityDescription>
              {upgrades.shard_desc}
              {newShardSkillObject.attrib && newShardSkillObject.attrib.length > 0 &&
                <div>
                  <Break />
                  <Attributes>
                    <div>
                      {(newShardSkillObject.attrib || []).map(attrib => (
                        <div className="attribute" key={attrib.key}>
                          <span id="header">{attrib.header} </span>
                          <span id="value">{formatValues(attrib.value)}</span>
                          <span id="footer"> {attrib.footer || ''}</span>
                        </div>))}
                      {newShardSkillObject.dmg ? <div className="attribute">DAMAGE: <span id="value">{formatValues(newShardSkillObject.dmg)}</span></div> : ''}
                    </div>
                  </Attributes>
                </div>
              }
            </AbilityDescription>
          </Ability>
        </Body>
      </Wrapper>
    )
  } else {
    newShardAbility = (<div>There is no new ability for this hero :(</div>)
  }

  function formatValues(values) {
    if (Array.isArray(values)) {
      return values.filter(value => value).join(' / ');
    }
    return values;
  }

  if (upgrades.has_scepter) {
    const newScepterSkillName = upgrades.scepter_skill_name;
    const newScepterSkillObject = skills.find(skill =>
      skill.data.dname === newScepterSkillName
    ).data;
    newScepterAbility = (
      <Wrapper>
        <Header>
          <div className="header-content">
            <img id="scepter-img" src="/assets/images/dota2/scepter_0.png" alt="" />
            <HeaderText>
              <div>Aghanim&lsquo;s Scepter</div>
            </HeaderText>
          </div>
        </Header>
        <Body>
          <AbilityIcon src={`${process.env.REACT_APP_IMAGE_CDN}${getAbilityImage(upgrades.scepter_skill_name)}`} />
          <Ability>
            <AbilityTitle>
              {upgrades.scepter_skill_name}
            </AbilityTitle>
            <NewAbility>
              {upgrades.scepter_new_skill ? (<span>New ability</span>) : (<span>Upgrade</span>)}
            </NewAbility>
            <AbilityDescription>
              {upgrades.scepter_desc}
              {newScepterSkillObject.attrib && newScepterSkillObject.attrib.length > 0 &&
                <div>
                  <Break />
                  <Attributes>
                    <div>
                      {(newScepterSkillObject.attrib || []).map(attrib => (
                        <div className="attribute" key={attrib.key}>
                          <span id="header">{attrib.header} </span>
                          <span id="value">{formatValues(attrib.value)}</span>
                          <span id="footer"> {attrib.footer || ''}</span>
                        </div>))}
                      {newScepterSkillObject.dmg ? <div className="attribute">DAMAGE: <span id="value">{formatValues(newScepterSkillObject.dmg)}</span></div> : ''}
                    </div>
                  </Attributes>
                </div>
              }
            </AbilityDescription>
          </Ability>
        </Body>
      </Wrapper>
    )
  } else {
    newScepterAbility = (<div>No Aghanim&lsquo;s upgrade found</div>)
  }
  return (
    <CombinedWrapper>
      {newScepterAbility}
      {newShardAbility}
    </CombinedWrapper>
  )
}

const TtWrapper = styled.div`
  background: linear-gradient(to bottom, ${constants.colorBlueMuted}, ${constants.primarySurfaceColor});
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
  position: relative;
`;

export const StyledAghanimsBuffs = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

> img {
  width: 65%;
}

.__react_component_tooltip {
  opacity: 1 !important;
  padding: 0px !important;
}
`
const AghsTooltip = ({ upgrades, skills }) => (
  <TtWrapper>
    <StyledAghanimsBuffs>
      <ReactTooltip id="aghanim" effect="solid" place="bottom">
        <ItemTooltip type="scepter" upgrades={upgrades} skills={skills} />
      </ReactTooltip>
    </StyledAghanimsBuffs>
  </TtWrapper>
);

export default AghsTooltip;
