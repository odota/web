import React from 'react'
import styled from 'styled-components'

import Ability from './Ability'
import mapAbilitiesAndTalents from '../../utility/mapAbilitiesAndTalents'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -4px;
  margin-right: -4px;
  margin-top: 16px;
`

const AbilityItem = styled.div`
  flex: 1 1 100%;
  margin-bottom: 4px;
  margin-top: 4px;
  max-width: 15%;
  min-width: 32px;
  padding-left: 4px;
  padding-right: 4px;
`

const renderAbilities = (abilities) => {
  return abilities.map((ability, key) => {
    return (
      <AbilityItem key={key}>
        <Ability {...ability} abilityID={key} />
      </AbilityItem>
    )
  })
}

const Abilities = ({ hero }) => {
  let heroAbilities = mapAbilitiesAndTalents(hero)

  return (
    <Wrapper>
      {renderAbilities(heroAbilities.skills)}
      {/* <AbilityItem>
        Talents
      </AbilityItem> */}
    </Wrapper>
  )
}

export default Abilities
