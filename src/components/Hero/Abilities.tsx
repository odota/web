import React from "react";
import Ability from "./Ability";
import Talents from "./Talents";
import AghanimUpgrades from "./AghanimUpgrades";
import { useAbilities } from "../../hooks/useAbilities.hook";
import { useHeroAbilities } from "../../hooks/useHeroAbilities.hook";
import styles from "./Abilities.module.css";

const renderAbilities = (abilities: any[]) =>
  abilities.map((ability) => (
    <div className={styles.abilityItem} key={ability.key}>
      <Ability {...ability.data} abilityID={ability.key} />
    </div>
  ));

const Abilities = ({ hero }: any) => {
  const abilities = useAbilities();
  const heroAbilities = useHeroAbilities();
  if (!abilities) {
    return null;
  }
  const filterAbilities = (toFilterAbs: any[]) =>
    toFilterAbs.filter(
      (ability) =>
        ability !== "generic_hidden" &&
        abilities[ability]?.behavior !== "Hidden",
    );
  const mapAbilities = (toFilterAbs: any[]) =>
    toFilterAbs.map((ability, id) => ({ data: abilities[ability], key: id }));
  const mapTalents = (talents: any[]) =>
    talents.map((talent) => ({ ...abilities[talent.name], ...talent }));

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
    <div className={styles.wrapper}>
      <div className={styles.abilityItem}>
        <Talents talents={heroAbs.talents} />
      </div>
      {renderAbilities(heroAbs.skills)}
      <div className={styles.abilityItem}>
        <AghanimUpgrades heroName={hero.name} skills={heroAbs.skills} />
      </div>
    </div>
  );
};

export default Abilities;
