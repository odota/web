import React from 'react';
import styled from 'styled-components';
import Ability from './Ability';
import Talents from './Talents';
import AghanimUpgrades from './AghanimUpgrades';
import { useAbilities } from '../../hooks/useAbilities.hook';
import { useHeroAbilities } from '../../hooks/useHeroAbilities.hook';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: -4px;
  margin-right: -4px;
  margin-top: 16px;
`;

const AbilityItem = styled.div`
  flex: 1 1 100%;
  margin-bottom: 4px;
  margin-top: 4px;
  max-width: 64px;
  padding-left: 4px;
  padding-right: 4px;
`;

const renderAbilities = (abilities: any[]) => abilities.map(ability => (
  <AbilityItem key={ability.key}>
    <Ability {...ability.data} abilityID={ability.key} />
  </AbilityItem>
));

const Abilities = ({ hero }: any) => {
  const abilities = useAbilities();
  const heroAbilities = useHeroAbilities();
  if (!abilities) {
    return null;
  }
  const filterAbilities = (toFilterAbs: any[]) =>
    toFilterAbs.filter((ability) => ability !== 'generic_hidden' && abilities[ability].behavior !== 'Hidden');
  const mapAbilities = (toFilterAbs: any[]) => toFilterAbs.map((ability, id) => ({ data: abilities[ability], key: id }));
  const mapTalents = (talents: any[]) => talents.map(talent => ({ ...abilities[talent.name], ...talent }));

  const mapTalentsToLevel = (talents: any[]) => {
    const talentMap: any[] = [];

    talents.forEach((talent, i) => {
      if (!talentMap[Math.floor(i / 2)]) {
        talentMap[Math.floor(i / 2)] = [];
      }

      talentMap[Math.floor(i / 2)].push({
        name: talent.dname,
      });
    });

    return talentMap;
  };

  const mapAbilitiesAndTalents = (toMapHeroAbsTals: any) => {
    const talsMap = {
      skills: [] as any[],
      talents: [] as any[],
    };

    const heroNpcName = toMapHeroAbsTals.name as keyof typeof heroAbilities;
    const heroAbs = heroAbilities[heroNpcName];

    // Filter out generic_hidden skills from skill list
    heroAbs.abilities = filterAbilities(heroAbs.abilities);
    talsMap.skills = mapAbilities(heroAbs.abilities);

    // Map Talents and assign them to correct level in Object
    const heroTalents = mapTalents(heroAbs.talents);
    talsMap.talents = mapTalentsToLevel(heroTalents);
    return talsMap;
  };

  const heroAbs = mapAbilitiesAndTalents(hero);

  return (
    <Wrapper>
      <AbilityItem>
        <Talents talents={heroAbs.talents} />
      </AbilityItem>
      {renderAbilities(heroAbs.skills)}
      <AbilityItem>
        <AghanimUpgrades heroName={hero.name} skills={heroAbs.skills} />
      </AbilityItem>
    </Wrapper>
  );
};

export default Abilities;
