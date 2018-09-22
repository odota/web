import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Ability from './Ability';
import Talents from './Talents';

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

const renderAbilities = (abilities) => {
  const mappedAbilities = abilities.map((ability, key) => {
    const mappedAbility = (
      <AbilityItem key={key}>
        <Ability {...ability} abilityID={key} />
      </AbilityItem>
    );

    return mappedAbility;
  });

  return mappedAbilities;
};

const Abilities = ({ hero, abilities, heroAbilities }) => {
  const filterAbilities = abilities => abilities.filter(ability => (ability !== 'generic_hidden'));
  const mapAbilities = heroAbilities => heroAbilities.map(ability => abilities[ability]);
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

  const mapAbilitiesAndTalents = (hero) => {
    const abilities = {
      skills: [],
      talents: [],
    };

    const heroNpcName = hero.name;
    const heroAbs = heroAbilities[heroNpcName];

    // Filter out generic_hidden skills from skill list
    heroAbs.abilities = filterAbilities(heroAbs.abilities);
    abilities.skills = mapAbilities(heroAbs.abilities);

    // Map Talents and assign them to correct level in Object
    const heroTalents = mapTalents(heroAbs.talents);
    abilities.talents = mapTalentsToLevel(heroTalents);

    return abilities;
  };

  const heroAbs = mapAbilitiesAndTalents(hero);

  return (
    <Wrapper>
      {renderAbilities(heroAbs.skills)}
      <AbilityItem>
        <Talents talents={heroAbs.talents} />
      </AbilityItem>
    </Wrapper>
  );
};

Abilities.propTypes = {
  hero: propTypes.shape({}).isRequired,
  abilities: propTypes.shape({}).isRequired,
  heroAbilities: propTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  abilities: state.app.abilities,
  heroAbilities: state.app.heroAbilities,
});

export default connect(mapStateToProps)(Abilities);
