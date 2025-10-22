import React from 'react';
import styled from 'styled-components';
import AghsTooltip from '../AghsTooltip/AghsTooltip';
import constants from '../constants';
import { aghs_desc as aghsDesc } from 'dotaconstants';

const Wrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${constants.colorBlueMuted},
    ${constants.primarySurfaceColor}
  );
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  width: 106%;
`;

export const StyledAghanimsBuffs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .__react_component_tooltip {
    opacity: 1 !important;
    padding: 0px !important;
  }
`;

export const Icon = styled.img`
  width: 60%;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const getAghsUpgrades = (heroName: string) => {
  const hero = aghsDesc.filter((a) => a.hero_name === heroName)[0];
  return hero || {};
};

const AghanimUpgrades = ({
  heroName,
  skills,
}: {
  heroName: string;
  skills: any[];
}) => (
  <Wrapper>
    <AghsTooltip
      heroName={heroName}
      upgrades={getAghsUpgrades(heroName)}
      skills={skills}
    />
    <StyledAghanimsBuffs data-for="aghanim" data-tip="aghanim">
      <Icon src="/assets/images/dota2/scepter_0.png" alt="Aghanim's scepter" />
      <Icon src="/assets/images/dota2/shard_0.png" alt="Aghanim's shard" />
    </StyledAghanimsBuffs>
  </Wrapper>
);

export default AghanimUpgrades;
