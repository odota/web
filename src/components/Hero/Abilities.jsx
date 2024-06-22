import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Ability from './Ability';
import Talents from './Talents';
import AghanimUpgrades from './AghanimUpgrades';

const abilities = (await import('dotaconstants/build/abilities.json')).default;
const heroAbilities = (await import('dotaconstants/build/hero_abilities.json')).default;

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

const renderAbilities = abilities => abilities.map(ability => (
  <AbilityItem key={ability.key}>
    <Ability {...ability.data} abilityID={ability.key} />
  </AbilityItem>
));

const Abilities = ({ hero }) => {
  const filterAbilities = (toFilterAbs) =>
    toFilterAbs.filter((ability) => ability !== 'generic_hidden' && abilities[ability].behavior !== 'Hidden');
  const mapAbilities = toFilterAbs => toFilterAbs.map((ability, id) => ({ data: abilities[ability], key: id }));
  const mapTalents = talents => talents.map(talent => ({ ...abilities[talent.name], ...talent }));

  const mapTalentsToLevel = (talents) => {
    const talentMap = [];

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

  const mapAbilitiesAndTalents = (toMapHeroAbsTals) => {
    const talsMap = {
      skills: [],
      talents: [],
    };

    const heroNpcName = toMapHeroAbsTals.name;
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

Abilities.propTypes = {
  hero: propTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Abilities);
