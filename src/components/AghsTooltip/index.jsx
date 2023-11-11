import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import constants from '../constants';
import AghanimsTooltipHeader from './AghsTooltipHeader';
import AghsTooltipBody from './AghsTooltipBody';
import config from '../../config';

const Wrapper = styled.div`
  width: 340px;
  background: rgb(21, 27, 29);
  overflow: hidden;
  border: 2px solid #27292b;
`;

const CombinedWrapper = styled.div`
  display: flex;
  background-color: rgba(0,0,255,0.01);
  flex-direction: column;
  gap: 10px;
  margin: 0 -20px;
`;

const AghanimsToolTip = ({ upgrades, skills }) => {
  let newScepterAbility = null;
  let newShardAbility = null;

  const getAghsSkillObject = (skillName) => {
    if(!skillName || skillName === "") return null;
    const ability = skills.find(skill =>
      skill.data.dname === skillName
    )
    return ability.data;
  }

  if (skills && upgrades) {
    const newShardSkillName = upgrades.shard_skill_name;
    const newShardSkillObject = getAghsSkillObject(newShardSkillName)
    newShardAbility = (
      <Wrapper>
        <AghanimsTooltipHeader image="/assets/images/dota2/shard_0.png" type="shard">
          <span>Aghanim&lsquo;s Shard</span>
        </AghanimsTooltipHeader>
        <AghsTooltipBody
          icon={`${config.VITE_IMAGE_CDN}${newShardSkillObject ? newShardSkillObject.img : ""}`}
          skillName={upgrades.shard_skill_name}
          hasUpgrade={upgrades.has_shard}
          isNewSkill={upgrades.shard_new_skill}
          aghsDescription={upgrades.shard_desc}
          skillObject={newShardSkillObject}
        />
      </Wrapper>
    )

    const newScepterSkillName = upgrades.scepter_skill_name;
    const newScepterSkillObject = getAghsSkillObject(newScepterSkillName);
    newScepterAbility = (
      <Wrapper>
        <AghanimsTooltipHeader image="/assets/images/dota2/scepter_0.png" type="scepter">
          <span>Aghanim&lsquo;s Scepter</span>
        </AghanimsTooltipHeader>
        <AghsTooltipBody
          icon={`${config.VITE_IMAGE_CDN}${newScepterSkillObject ? newScepterSkillObject.img : ""}`}
          skillName={upgrades.scepter_skill_name}
          hasUpgrade={upgrades.has_scepter}
          isNewSkill={upgrades.scepter_new_skill}
          aghsDescription={upgrades.scepter_desc}
          skillObject={newScepterSkillObject}
        />
      </Wrapper>
    )
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
const AghsTooltipWrapper = ({ upgrades, skills }) => (
  <TtWrapper>
    <StyledAghanimsBuffs>
      <ReactTooltip id="aghanim" effect="solid" place="bottom" >
        <AghanimsToolTip type="scepter" upgrades={upgrades} skills={skills} />
      </ReactTooltip>
    </StyledAghanimsBuffs>
  </TtWrapper>
);

AghsTooltipWrapper.propTypes = {
  upgrades:  PropTypes.shape({}).isRequired,
  skills: PropTypes.array.isRequired,
}

export default AghsTooltipWrapper;
