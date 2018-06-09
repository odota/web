import React from 'react'
import styled from 'styled-components'
import mapAbilitiesAndTalents from '../../utility/mapAbilitiesAndTalents'

const Abilities = ({ hero }) => {
  let heroAbilities = mapAbilitiesAndTalents(hero)
  console.log(heroAbilities)
  return (
    <p>Test</p>
  )
}

export default Abilities
