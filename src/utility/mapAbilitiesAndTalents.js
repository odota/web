import { abilities, hero_abilities } from 'dotaconstants';

const filterAbilities = abilities => abilities.filter(ability => (ability !== 'generic_hidden'));
const mapAbilities = heroAbilities => heroAbilities.map(ability => abilities[ability]);
const mapTalents = talents => talents.map(talent => ({ ...abilities[talent.name], ...talent }));

const mapTalentsToLevel = (talents) => {
  const talentMap = [];

  talents.forEach((talent) => {
    if (!talentMap[talent.level - 1]) {
      talentMap[talent.level - 1] = [];
    }

    talentMap[talent.level - 1].push({
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
  const heroAbilities = hero_abilities[heroNpcName];

  // Filter out generic_hidden skills from skill list
  heroAbilities.abilities = filterAbilities(heroAbilities.abilities);
  abilities.skills = mapAbilities(heroAbilities.abilities);

  // Map Talents and assign them to correct level in Object
  const heroTalents = mapTalents(heroAbilities.talents);
  abilities.talents = mapTalentsToLevel(heroTalents, abilities);

  return abilities;
};

export default mapAbilitiesAndTalents;

export {
  mapAbilities,
  mapTalents,
};
