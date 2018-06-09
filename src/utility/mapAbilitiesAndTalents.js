import {abilities, hero_abilities } from 'dotaconstants'

const mapAbilitiesAndTalents = (hero)  => {
  let abilities = {
    skills: [],
    talents: []
  }

  const heroNpcName = hero.name
  const heroAbilities = hero_abilities[heroNpcName]

  // Filter out generic_hidden skills from skill list
  heroAbilities.abilities = filterAbilities(heroAbilities.abilities)
  abilities.skills = mapAbilities(heroAbilities.abilities)
  abilities.talents = mapTalents(heroAbilities.talents)

  return abilities
}

const filterAbilities = (abilities) => {
  return abilities.filter((ability) => {
    return (ability !== 'generic_hidden')
  })
}

const mapAbilities = (heroAbilities) => {
  return heroAbilities.map((ability) => {
    return abilities[ability]
  })
}

const mapTalents = (talents) => {
  return talents.map((talent) => {
    return {...abilities[talent.name], ...talent}
  })
}

export default mapAbilitiesAndTalents

export {
  mapAbilities,
  mapTalents
}
