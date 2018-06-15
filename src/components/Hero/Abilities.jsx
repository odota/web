import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import Ability from './Ability';
import Talents from './Talents';
import mapAbilitiesAndTalents from '../../utility/mapAbilitiesAndTalents';

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

const Abilities = ({ hero }) => {
  const heroAbilities = mapAbilitiesAndTalents(hero);

  return (
    <Wrapper>
      {renderAbilities(heroAbilities.skills)}
      <AbilityItem>
        <Talents talents={heroAbilities.talents} />
      </AbilityItem>
    </Wrapper>
  );
};

Abilities.propTypes = {
  hero: propTypes.shape({}).isRequired,
};

export default Abilities;
