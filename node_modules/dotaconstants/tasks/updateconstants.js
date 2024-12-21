const axios = require("axios");
const fs = require("fs");
const vdfparser = require("vdf-parser");
const { cleanupArray } = require("../utils");

// Get your token from https://stratz.com/api
const STRATZ_TOKEN = process.env.STRATZ_TOKEN || "";

const extraStrings = {
  DOTA_ABILITY_BEHAVIOR_NONE: "None",
  DOTA_ABILITY_BEHAVIOR_PASSIVE: "Passive",
  DOTA_ABILITY_BEHAVIOR_UNIT_TARGET: "Unit Target",
  DOTA_ABILITY_BEHAVIOR_CHANNELLED: "Channeled",
  DOTA_ABILITY_BEHAVIOR_POINT: "Point Target",
  DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES: "Root",
  DOTA_ABILITY_BEHAVIOR_AOE: "AOE",
  DOTA_ABILITY_BEHAVIOR_NO_TARGET: "No Target",
  DOTA_ABILITY_BEHAVIOR_AUTOCAST: "Autocast",
  DOTA_ABILITY_BEHAVIOR_ATTACK: "Attack Modifier",
  DOTA_ABILITY_BEHAVIOR_IMMEDIATE: "Instant Cast",
  DOTA_ABILITY_BEHAVIOR_HIDDEN: "Hidden",
  DAMAGE_TYPE_PHYSICAL: "Physical",
  DAMAGE_TYPE_MAGICAL: "Magical",
  DAMAGE_TYPE_PURE: "Pure",
  SPELL_IMMUNITY_ENEMIES_YES: "Yes",
  SPELL_IMMUNITY_ENEMIES_NO: "No",
  SPELL_IMMUNITY_ALLIES_YES: "Yes",
  SPELL_IMMUNITY_ALLIES_NO: "No",
  SPELL_DISPELLABLE_YES: "Yes",
  SPELL_DISPELLABLE_YES_STRONG: "Strong Dispels Only",
  SPELL_DISPELLABLE_NO: "No",
  DOTA_UNIT_TARGET_TEAM_BOTH: "Both",
  DOTA_UNIT_TARGET_TEAM_ENEMY: "Enemy",
  DOTA_UNIT_TARGET_TEAM_FRIENDLY: "Friendly",
  DOTA_UNIT_TARGET_HERO: "Hero",
  DOTA_UNIT_TARGET_BASIC: "Basic",
  DOTA_UNIT_TARGET_BUILDING: "Building",
  DOTA_UNIT_TARGET_TREE: "Tree",
};

const ignoreStrings = new Set([
  "DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES",
  "DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK",
  "DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT",
  "DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
  "DOTA_ABILITY_BEHAVIOR_TOGGLE",
  "DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE",
  "DOTA_ABILITY_BEHAVIOR_SHOW_IN_GUIDES",
]);

const badNames = new Set([
  "Version",
  "npc_dota_hero_base",
  "npc_dota_hero_target_dummy",
  "npc_dota_units_base",
  "npc_dota_thinker",
  "npc_dota_companion",
  "npc_dota_loadout_generic",
  "npc_dota_techies_remote_mine",
  "npc_dota_treant_life_bomb",
  "npc_dota_lich_ice_spire",
  "npc_dota_mutation_pocket_roshan",
  "npc_dota_scout_hawk",
  "npc_dota_greater_hawk",
]);

const extraAttribKeys = [
  "AbilityCastRange",
  "AbilityChargeRestoreTime",
  "AbilityDuration",
  "AbilityChannelTime",
  "AbilityCastPoint",
  "AbilityCharges",
  "AbilityManaCost",
  "AbilityCooldown",
];

// Use standardized names for base attributes
const generatedHeaders = {
  abilitycastrange: "CAST RANGE",
  abilitycastpoint: "CAST TIME",
  abilitycharges: "MAX CHARGES",
  max_charges: "MAX CHARGES",
  abilitychargerestoretime: "CHARGE RESTORE TIME",
  charge_restore_time: "CHARGE RESTORE TIME",
  abilityduration: "DURATION",
  abilitychanneltime: "CHANNEL TIME",
};

// Already formatted for mc and cd
const excludeAttributes = new Set(["abilitymanacost", "abilitycooldown"]);

// Some attributes we remap, so keep track of them if there's dupes
const remapAttributes = {
  abilitychargerestoretime: "charge_restore_time",
  abilitycharges: "max_charges",
};

const notAbilities = new Set([
  "Version",
  "version",
  "ability_base",
  "default_attack",
  "attribute_bonus",
  "ability_deward",
]);

const itemQualOverrides = {
  fluffy_hat: "component",
  overwhelming_blink: "artifact",
  swift_blink: "artifact",
  arcane_blink: "artifact",
  moon_shard: "common",
  aghanims_shard: "consumable",
  kaya: "artifact",
  helm_of_the_dominator: "common",
  helm_of_the_overlord: "common",
  desolator: "epic",
  mask_of_madness: "common",
  orb_of_corrosion: "common",
  falcon_blade: "common",
  mage_slayer: "artifact",
  revenants_brooch: "epic",
};

const idsUrl =
  "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_ability_ids.txt";
const heroesUrl =
  "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_heroes.txt";
const abilitiesLoc =
  "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/resource/localization/abilities_english.txt";
const npcAbilitiesUrl =
  "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_abilities.txt";
const npcUnitsUrl =
  "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_units.txt";
const localizationUrl =
  "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/resource/localization/dota_english.txt";

let aghsAbilityValues = {};
const heroDataUrls = [];
const heroDataIndex = [];
const abilitiesUrls = [abilitiesLoc, npcAbilitiesUrl];

start();
async function start() {
  const resp = await axios.get(heroesUrl, { responseType: "text" });
  const heroesVdf = parseJsonOrVdf(resp.data);
  let ids = Object.keys(heroesVdf.DOTAHeroes)
    .filter((name) => !badNames.has(name))
    .map((key) => heroesVdf.DOTAHeroes[key].HeroID)
    .sort((a, b) => Number(a) - Number(b));
  ids.forEach((key) => {
    heroDataUrls.push(
      "http://www.dota2.com/datafeed/herodata?language=english&hero_id=" + key,
    );
  });
  let names = Object.keys(heroesVdf.DOTAHeroes).filter(
    (name) => !badNames.has(name),
  );
  names.forEach((name) => {
    // The hero abilities were moved to individual hero files, e.g. https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/heroes/npc_dota_hero_abaddon.txt
    abilitiesUrls.push(
      "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/heroes/" +
        name +
        ".txt",
    );
    heroDataIndex.push(name);
  });

  const sources = [
    {
      key: "items",
      url: [
        abilitiesLoc,
        "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/items.txt",
        "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/neutral_items.txt",
        idsUrl,
      ],
      transform: (respObj) => {
        const strings = respObj[0].lang.Tokens;
        const scripts = respObj[1].DOTAAbilities;
        const neutrals = respObj[2].neutral_items;
        const idLookup = respObj[3].DOTAAbilityIDs.ItemAbilities.Locked;
        // parse neutral items into name => tier map
        const neutralItemNameTierMap = getNeutralItemNameTierMap(neutrals);

        // Fix places where valve doesnt care about correct case
        Object.keys(strings).forEach((key) => {
          if (key.includes("DOTA_Tooltip_Ability_")) {
            strings[
              key.replace("DOTA_Tooltip_Ability_", "DOTA_Tooltip_ability_")
            ] = strings[key];
          }
        });

        let items = {};

        Object.keys(scripts)
          .filter((key) => {
            return (
              !(key.includes("item_recipe") && scripts[key].ItemCost === "0") &&
              key !== "Version"
            );
          })
          .forEach((key) => {
            const specialAttrs = getSpecialAttrs(scripts[key]);

            let item = {
              ...replaceSpecialAttribs(
                strings[`DOTA_Tooltip_ability_${key}_Description`],
                specialAttrs,
                true,
                scripts[key],
                key,
              ),
            };
            item.id = Number(idLookup[key]);
            item.img = `/apps/dota2/images/dota_react/items/${key.replace(
              /^item_/,
              "",
            )}.png?t=${1593393829403}`;
            if (key.includes("item_recipe")) {
              item.img = `/apps/dota2/images/dota_react/items/recipe.png?t=${1593393829403}`;
            }

            item.dname = strings[`DOTA_Tooltip_ability_${key}`];
            item.qual = itemQualOverrides[key] ?? scripts[key].ItemQuality;
            item.cost = parseInt(scripts[key].ItemCost);

            const behavior = formatBehavior(scripts[key].AbilityBehavior);

            item.behavior = behavior !== "Passive" ? behavior : undefined;
            item.dmg_type =
              formatBehavior(scripts[key].AbilityUnitDamageType) || undefined;
            item.bkbpierce =
              formatBehavior(scripts[key].SpellImmunityType) || undefined;
            item.dispellable =
              formatBehavior(scripts[key].SpellDispellableType) || undefined;
            item.target_team =
              formatBehavior(scripts[key].AbilityUnitTargetTeam) || undefined;
            item.target_type =
              formatBehavior(scripts[key].AbilityUnitTargetType) || undefined;

            let notes = [];
            for (
              let i = 0;
              strings[`DOTA_Tooltip_ability_${key}_Note${i}`];
              i++
            ) {
              notes.push(
                replaceSpecialAttribs(
                  strings[`DOTA_Tooltip_ability_${key}_Note${i}`],
                  specialAttrs,
                  false,
                  scripts[key],
                  key,
                ),
              );
            }

            item.notes = notes.join("\n");

            item.attrib = scripts[key].AbilityValues
              ? Object.entries(scripts[key].AbilityValues).map(
                  ([abilityKey, val]) => {
                    let display;
                    const tooltipKey = `DOTA_Tooltip_ability_${key}_${abilityKey}`;
                    const string = strings[tooltipKey];
                    if (tooltipKey in strings) {
                      if (string.includes("$") || /[a-z]/.test(string)) {
                        // Normal attributes, e.g. + 25 Movement Speed
                        display = string.replace(
                          /(%)?([+-])?(\$\w+)?/,
                          (str, pct = "", pm = "", variable) =>
                            `${pm} {value}${pct} ` +
                            (strings[
                              `dota_ability_variable_${variable?.replace(
                                "$",
                                "",
                              )}`
                            ] || ""),
                        );
                      }
                      if (!/[a-z]/.test(string)) {
                        // Upper case stats, where the number is displayed in the end
                        display = string.replace(
                          /^(%)?(.+)/,
                          (str, pct = "", rest) => {
                            return `${rest} {value}${pct}`;
                          },
                        );
                      }
                    }
                    return {
                      key: abilityKey,
                      display: display?.replace(/<[^>]*>/g, ""),
                      value: (val.value ?? val).split(" ").join(" / "),
                    };
                  },
                )
              : [];

            item.mc = parseInt(scripts[key].AbilityManaCost) || false;
            item.hc = parseInt(scripts[key].AbilityHealthCost) || false;
            item.cd = parseInt(scripts[key].AbilityCooldown) || false;

            item.lore = (
              strings[`DOTA_Tooltip_ability_${key}_Lore`] || ""
            ).replace(/\\n/g, "\r\n");

            item.components = null;
            item.created = false;
            item.charges = parseInt(scripts[key].ItemInitialCharges) || false;
            if (neutralItemNameTierMap[key]) {
              item.tier = neutralItemNameTierMap[key];
            }
            items[key.replace(/^item_/, "")] = item;
          });

        // Load recipes
        Object.keys(scripts)
          .filter(
            (key) => scripts[key].ItemRequirements && scripts[key].ItemResult,
          )
          .forEach((key) => {
            result_key = scripts[key].ItemResult.replace(/^item_/, "");
            items[result_key].components = scripts[key].ItemRequirements["01"]
              ?.split(";")
              .map((item) => item.replace(/^item_/, "").replace("*", ""));
            items[result_key].created = true;
          });

        //Manually Adding DiffBlade2 for match data prior to 7.07
        items["diffusal_blade_2"] = {
          id: 196,
          img: "/apps/dota2/images/dota_react/items/diffusal_blade_2.png?3",
          dname: "Diffusal Blade",
          qual: "artifact",
          cost: 3850,
          desc: "Active: Purge Targets an enemy, removing buffs from the target and slowing it for 4 seconds.Range: 600\nPassive: ManabreakEach attack burns 50 mana from the target, and deals 0.8 physical damage per burned mana. Burns 16 mana per attack from melee illusions and 8 mana per attack from ranged illusions. Dispel Type: Basic Dispel",
          notes: "Does not stack with other manabreak abilities.",
          attrib: [
            {
              key: "bonus_agility",
              header: "",
              value: "25 / 35",
              footer: "Agility",
            },
            {
              key: "bonus_intellect",
              header: "",
              value: "10 / 15",
              footer: "Intelligence",
            },
            {
              key: "initial_charges",
              header: "INITIAL CHARGES:",
              value: "8",
              generated: true,
            },
            {
              key: "feedback_mana_burn",
              header: "FEEDBACK MANA BURN:",
              value: "50",
              generated: true,
            },
            {
              key: "feedback_mana_burn_illusion_melee",
              header: "FEEDBACK MANA BURN ILLUSION MELEE:",
              value: "16",
              generated: true,
            },
            {
              key: "feedback_mana_burn_illusion_ranged",
              header: "FEEDBACK MANA BURN ILLUSION RANGED:",
              value: "8",
              generated: true,
            },
            {
              key: "purge_summoned_damage",
              header: "PURGE SUMMONED DAMAGE:",
              value: "99999",
              generated: true,
            },
            {
              key: "purge_rate",
              header: "PURGE RATE:",
              value: "5",
              generated: true,
            },
            {
              key: "purge_root_duration",
              header: "PURGE ROOT DURATION:",
              value: "3",
              generated: true,
            },
            {
              key: "purge_slow_duration",
              header: "PURGE SLOW DURATION:",
              value: "4",
              generated: true,
            },
            {
              key: "damage_per_burn",
              header: "DAMAGE PER BURN:",
              value: "0.8",
              generated: true,
            },
            {
              key: "cast_range_tooltip",
              header: "CAST RANGE TOOLTIP:",
              value: "600",
              generated: true,
            },
          ],
          mc: false,
          cd: 4,
          lore: "An enchanted blade that allows the user to cut straight into the enemy's soul.",
          components: ["diffusal_blade", "recipe_diffusal_blade"],
          created: true,
        };

        //Manually added for match data prior to 7.07
        items["recipe_iron_talon"] = {
          id: 238,
          img: "/apps/dota2/images/dota_react/items/recipe.png?3",
          dname: "Iron Talon Recipe",
          cost: 125,
          desc: "",
          notes: "",
          attrib: [],
          mc: false,
          cd: false,
          lore: "",
          components: null,
          created: false,
        };

        return items;
      },
    },
    {
      key: "item_ids",
      url: idsUrl,
      transform: (respObj) => {
        const data = respObj.DOTAAbilityIDs.ItemAbilities.Locked;
        // Flip the keys and values
        const itemIds = {};
        Object.entries(data).forEach(([key, val]) => {
          // Remove item_ prefix
          itemIds[val] = key.replace("item_", "");
        });
        //manually adding DiffBlade2
        itemIds[196] = "diffusal_blade_2";
        return itemIds;
      },
    },
    {
      key: "abilities",
      url: abilitiesUrls,
      transform: (respObj) => {
        const strings = respObj[0].lang.Tokens;
        let scripts = respObj[1].DOTAAbilities;
        // Merge into scripts all the hero abilities (the rest of the array)
        for (let i = 2; i < respObj.length; i++) {
          // console.log(respObj[i]);
          const heroAbs = respObj[i].DOTAAbilities;
          scripts = { ...scripts, ...heroAbs };
        }
        let abilities = {};

        Object.keys(scripts)
          .filter((key) => !notAbilities.has(key))
          .forEach((key) => {
            let ability = {};

            let specialAttr = getSpecialAttrs(scripts[key]);

            ability.dname = replaceSValues(
              strings[`DOTA_Tooltip_ability_${key}`] ??
                strings[`DOTA_Tooltip_Ability_${key}`],
              specialAttr,
              key,
            );

            // Check for unreplaced `s:bonus_<talent>`
            if (
              scripts[key].ad_linked_abilities &&
              scripts[scripts[key].ad_linked_abilities]
            ) {
              ability.dname = replaceBonusSValues(
                key,
                ability.dname,
                scripts[scripts[key].ad_linked_abilities].AbilityValues,
              );
            }

            if (scripts[key].Innate === "1") {
              ability.is_innate = true;
            }
            ability.behavior =
              formatBehavior(scripts[key].AbilityBehavior) || undefined;
            ability.dmg_type =
              formatBehavior(scripts[key].AbilityUnitDamageType) || undefined;
            ability.bkbpierce =
              formatBehavior(scripts[key].SpellImmunityType) || undefined;
            ability.dispellable =
              formatBehavior(scripts[key].SpellDispellableType) || undefined;
            ability.target_team =
              formatBehavior(scripts[key].AbilityUnitTargetTeam) || undefined;
            ability.target_type =
              formatBehavior(scripts[key].AbilityUnitTargetType) || undefined;

            ability.desc = replaceSpecialAttribs(
              strings[`DOTA_Tooltip_ability_${key}_Description`],
              specialAttr,
              false,
              scripts[key],
              key,
            );
            ability.dmg =
              scripts[key].AbilityDamage &&
              formatValues(scripts[key].AbilityDamage);

            // Clean up duplicate remapped values (we needed dupes for the tooltip)
            if (specialAttr) {
              Object.entries(remapAttributes).forEach(([oldAttr, newAttr]) => {
                const oldAttrIdx = specialAttr.findIndex(
                  (attr) => Object.keys(attr)[0] === oldAttr,
                );
                const newAttrIdx = specialAttr.findIndex(
                  (attr) => Object.keys(attr)[0] === newAttr,
                );
                if (oldAttrIdx !== -1 && newAttrIdx !== -1) {
                  specialAttr.splice(oldAttrIdx, 1);
                }
              });
            }

            ability.attrib = formatAttrib(
              specialAttr,
              strings,
              `DOTA_Tooltip_ability_${key}_`,
            );

            ability.lore = strings[`DOTA_Tooltip_ability_${key}_Lore`];

            const ManaCostKey =
              scripts[key].AbilityManaCost ??
              scripts[key].AbilityValues?.AbilityManaCost;
            const CooldownKey =
              scripts[key].AbilityCooldown ??
              scripts[key].AbilityValues?.AbilityCooldown;

            if (ManaCostKey) {
              const manaCost = isObj(ManaCostKey)
                ? ManaCostKey["value"]
                : ManaCostKey;
              ability.mc = formatValues(manaCost, false, "/");
            }
            if (CooldownKey) {
              const cooldown = isObj(CooldownKey)
                ? CooldownKey["value"]
                : CooldownKey;
              ability.cd = formatValues(cooldown, false, "/");
            }

            ability.img = `/apps/dota2/images/dota_react/abilities/${key}.png`;
            if (key.indexOf("special_bonus") === 0) {
              ability = { dname: ability.dname };
            }
            abilities[key] = ability;
            if (specialAttr) {
              let aghsObj = {};
              if (
                scripts[key].IsGrantedByScepter ||
                scripts[key].IsGrantedByShard
              ) {
                // simple straight copy to lookup
                for (const attrib of specialAttr) {
                  for (const key of Object.keys(attrib)) {
                    const val = attrib[key];
                    if (isObj(val)) {
                      aghsObj[key] = val["value"];
                    } else {
                      aghsObj[key] = val;
                    }
                  }
                }
              } else {
                for (const attrib of specialAttr) {
                  for (const key of Object.keys(attrib)) {
                    const val = attrib[key];
                    if (val === null) {
                      continue;
                    }
                    // handle bonus objects
                    if (isObj(val)) {
                      // first case: standard attribute with aghs bonus
                      for (const bonus of Object.keys(val)) {
                        if (
                          bonus.indexOf("scepter") !== -1 ||
                          bonus.indexOf("shard") !== -1
                        ) {
                          const rawBonus = val[bonus]
                            .replace("+", "")
                            .replace("-", "")
                            .replace("x", "")
                            .replace("%", "");
                          // bonus_bonus doesn't exist, it's shard_bonus or scepter_bonus at that point
                          const aghsPrefix =
                            bonus.indexOf("scepter") !== -1
                              ? "scepter"
                              : "shard";
                          const bonusKey = key.startsWith("bonus_")
                            ? `${aghsPrefix}_${key}`
                            : `bonus_${key}`;
                          aghsObj[bonusKey] = rawBonus;
                          aghsObj[`${key}`] = calculateValueFromBonus(
                            val["value"],
                            val[bonus],
                          );
                        }
                      }
                      // second case: aghs bonus attribute
                      if (
                        key.indexOf("scepter") !== -1 ||
                        key.indexOf("shard") !== -1
                      ) {
                        const bonus = Object.keys(val)
                          .filter((k) => k !== key)
                          .find(
                            (k) =>
                              k.indexOf("scepter") !== -1 ||
                              k.indexOf("shard") !== -1,
                          );
                        if (bonus) {
                          aghsObj[key] = calculateValueFromBonus(
                            val["value"] ?? val[key],
                            val[bonus],
                          );
                        } else {
                          aghsObj[key] = val["value"] ?? val[key];
                        }
                      }
                      // third case: value requires aghs
                      if (Object.keys(val).length == 2) {
                        // value and requires attr
                        if (
                          (val["value"] && val["RequiresScepter"]) ||
                          val["RequiresShard"]
                        ) {
                          aghsObj[key] = val["value"];
                        }
                      }
                    } else {
                      // simple key to value
                      aghsObj[key] = val;
                    }
                  }
                }
              }
              aghsAbilityValues[key] = aghsObj;
            }
          });
        return abilities;
      },
    },
    {
      key: "ability_ids",
      url: idsUrl,
      transform: (respObj) => {
        const data = respObj.DOTAAbilityIDs.UnitAbilities.Locked;
        // Flip the keys and values
        const abilityIds = {};
        Object.entries(data).forEach(([key, val]) => {
          abilityIds[val] = key;
        });
        return abilityIds;
      },
    },
    {
      key: "neutral_abilities",
      url: npcUnitsUrl,
      transform: (respObj) => {
        const abilitySlots = [
          "Ability1",
          "Ability2",
          "Ability3",
          "Ability4",
          "Ability5",
          "Ability6",
          "Ability7",
          "Ability8",
        ];
        // filter out placeholder abilities
        const badNeutralAbilities = new Set([
          "creep_piercing",
          "creep_irresolute",
          "flagbearer_creep_aura_effect",
          "creep_siege",
          "backdoor_protection",
          "backdoor_protection_in_base",
          "filler_ability",
          "neutral_upgrade",
        ]);
        // filter out attachable units, couriers, buildings and siege creeps
        const badUnitRelationships = new Set([
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_ATTACHED",
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_COURIER",
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_BUILDING",
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_BARRACKS",
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_SIEGE",
        ]);
        const units = respObj.DOTAUnits;
        const baseUnit = units["npc_dota_units_base"];
        function getUnitProp(unit, prop, name = "") {
          if (unit[prop] !== undefined) {
            return unit[prop];
          }
          // include from other unit
          if (unit.include_keys_from) {
            return getUnitProp(units[unit.include_keys_from], prop);
          }
          // check if BaseClass is defined non-natively, if so, read from that
          // also make sure we aren't reading from itself
          if (
            unit.BaseClass &&
            unit.BaseClass !== name &&
            units[unit.BaseClass]
          ) {
            return getUnitProp(units[unit.BaseClass], prop, unit.BaseClass);
          }
          // Fallback to the base unit
          return baseUnit[prop];
        }
        const keys = Object.keys(units).filter((name) => {
          if (badNames.has(name)) {
            return false;
          }
          const unit = units[name];
          // only special units have a minimap icon
          if (unit.MinimapIcon) {
            return false;
          }
          if (getUnitProp(unit, "BountyXP") === "0") {
            return false;
          }
          // if HasInventory=0 explicitly (derived from hero), then we can filter it out
          // if it has an inventory, it's not an neutral
          if (
            unit.HasInventory === "0" ||
            getUnitProp(unit, "HasInventory") === "1"
          ) {
            return false;
          }
          if (
            badUnitRelationships.has(getUnitProp(unit, "UnitRelationshipClass"))
          ) {
            return false;
          }
          let hasAbility = false;
          for (const slot of abilitySlots) {
            const ability = getUnitProp(unit, slot);
            if (ability && !badNeutralAbilities.has(ability)) {
              hasAbility = true;
              break;
            }
          }
          return hasAbility;
        });
        const neutralAbilities = {};
        keys.forEach((key) => {
          const unit = units[key];
          for (const slot of abilitySlots) {
            const ability = getUnitProp(unit, slot);
            if (
              ability &&
              !badNeutralAbilities.has(ability) &&
              !neutralAbilities[ability]
            ) {
              neutralAbilities[ability] = {
                img: `/assets/images/dota2/neutral_abilities/${ability}.png`,
              };
            }
          }
        });
        return neutralAbilities;
      },
    },
    {
      key: "ancients",
      url: npcUnitsUrl,
      transform: (respObj) => {
        // filter out attachable units, couriers, buildings and siege creeps
        const badUnitRelationships = new Set([
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_ATTACHED",
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_COURIER",
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_BUILDING",
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_BARRACKS",
          "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_SIEGE",
        ]);
        const units = respObj.DOTAUnits;
        const baseUnit = units["npc_dota_units_base"];
        function getUnitProp(unit, prop, name = "") {
          if (unit[prop] !== undefined) {
            return unit[prop];
          }
          // include from other unit
          if (unit.include_keys_from) {
            return getUnitProp(units[unit.include_keys_from], prop);
          }
          // check if BaseClass is defined non-natively, if so, read from that
          // also make sure we aren't reading from itself
          if (
            unit.BaseClass &&
            unit.BaseClass !== name &&
            units[unit.BaseClass]
          ) {
            return getUnitProp(units[unit.BaseClass], prop, unit.BaseClass);
          }
          // Fallback to the base unit
          return baseUnit[prop];
        }
        const keys = Object.keys(units).filter((name) => {
          if (badNames.has(name)) {
            return false;
          }
          const unit = units[name];
          // only special units have a minimap icon
          if (unit.MinimapIcon) {
            return false;
          }
          if (getUnitProp(unit, "BountyXP") === "0") {
            return false;
          }
          // if HasInventory=0 explicitly (derived from hero), then we can filter it out
          // if it has an inventory, it's not an neutral
          if (
            unit.HasInventory === "0" ||
            getUnitProp(unit, "HasInventory") === "1"
          ) {
            return false;
          }
          if (
            getUnitProp(unit, "UnitRelationshipClass") !==
            "DOTA_NPC_UNIT_RELATIONSHIP_TYPE_DEFAULT"
          ) {
            return false;
          }
          const level = getUnitProp(unit, "Level");
          if (level === "0" || level === "1") {
            return false;
          }
          if (getUnitProp(unit, "TeamName") !== "DOTA_TEAM_NEUTRALS") {
            return false;
          }
          if (getUnitProp(unit, "IsNeutralUnitType") === "0") {
            return false;
          }
          if (getUnitProp(unit, "IsRoshan") === "1") {
            return false;
          }
          return getUnitProp(unit, "IsAncient") === "1";
        });
        const ancients = {};
        keys.forEach((key) => {
          ancients[key] = 1;
        });
        return ancients;
      },
    },
    {
      key: "heroes",
      url: [localizationUrl, heroesUrl],
      transform: (respObj) => {
        let heroes = [];
        let keys = Object.keys(respObj[1].DOTAHeroes).filter(
          (name) => !badNames.has(name),
        );
        keys.forEach((name) => {
          let h = formatVpkHero(name, respObj[1]);
          h.localized_name =
            respObj[1].DOTAHeroes[name].workshop_guide_name ??
            respObj[0].lang.Tokens[name + ":n"];
          heroes.push(h);
        });
        heroes = heroes.sort((a, b) => a.id - b.id);
        let heroesObj = {};
        for (hero of heroes) {
          hero.id = Number(hero.id);
          heroesObj[hero.id] = hero;
        }
        return heroesObj;
      },
    },
    {
      key: "hero_lore",
      url: [
        "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/resource/localization/hero_lore_english.txt",
        heroesUrl,
      ],
      transform: (respObj) => {
        let keys = Object.keys(respObj[1].DOTAHeroes).filter(
          (name) => !badNames.has(name),
        );
        let sortedHeroes = [];
        keys.forEach((name) => {
          const hero = respObj[1].DOTAHeroes[name];
          sortedHeroes.push({ name, id: hero.HeroID });
        });
        sortedHeroes = sortedHeroes.sort((a, b) => a.id - b.id);
        const lore = respObj[0].lang.Tokens;
        const heroLore = {};
        sortedHeroes.forEach((hero) => {
          const heroKey = hero.name.replace("npc_dota_hero_", "");
          heroLore[heroKey] = lore[`${hero.name}_bio`]
            .replace(/\t+/g, " ")
            .replace(/\n+/g, " ")
            .replace(/<br>+/g, " ")
            .replace(/\s+/g, " ")
            .replace(/\\/g, "")
            .replace(/"/g, "'")
            .trim();
        });
        return heroLore;
      },
    },
    {
      key: "hero_abilities",
      url: [heroesUrl, ...abilitiesUrls],
      transform: (respObj) => {
        const [heroObj, abilityLoc, _, ...heroAbils] = respObj;

        const strings = abilityLoc.lang.Tokens;
        // Fix places where valve doesn't care about correct case
        Object.keys(strings).forEach((key) => {
          strings[key.toLowerCase()] = strings[key];
        });

        let scripts = {};
        for (let i = 0; i < heroAbils.length; i++) {
          scripts[heroDataIndex[i]] = heroAbils[i].DOTAAbilities;
        }

        let heroes = heroObj.DOTAHeroes;
        const heroAbilities = {};
        Object.keys(heroes).forEach(function (heroKey) {
          if (
            heroKey != "Version" &&
            heroKey != "npc_dota_hero_base" &&
            heroKey != "npc_dota_hero_target_dummy"
          ) {
            const newHero = { abilities: [], talents: [], facets: [] };
            let talentCounter = 2;
            Object.keys(heroes[heroKey]).forEach(function (key) {
              let talentIndexStart =
                heroes[heroKey]["AbilityTalentStart"] != undefined
                  ? heroes[heroKey]["AbilityTalentStart"]
                  : 10;
              let abilityRegexMatch = key.match(/Ability([0-9]+)/);
              if (abilityRegexMatch && heroes[heroKey][key] != "") {
                let abilityNum = parseInt(abilityRegexMatch[1]);
                if (abilityNum < talentIndexStart) {
                  newHero["abilities"].push(heroes[heroKey][key]);
                } else {
                  // -8 not -10 because going from 0-based index -> 1 and flooring divison result
                  newHero["talents"].push({
                    name: heroes[heroKey][key],
                    level: Math.floor(talentCounter / 2),
                  });
                  talentCounter++;
                }
              }
            });
            heroAbilities[heroKey] = newHero;
          }

          Object.entries(heroes[heroKey].Facets ?? []).forEach(
            ([key, value], i) => {
              const abilities = Object.values(value.Abilities || {}).map(
                (a) => a.AbilityName,
              );
              const [ability] = abilities;
              const title =
                strings[`dota_tooltip_facet_${key}`] ||
                strings[`dota_tooltip_ability_${ability}`] ||
                "";
              let description =
                strings[`dota_tooltip_facet_${key}_description`] ||
                strings[`dota_tooltip_ability_${ability}_description`] ||
                "";

              if (description.includes("{s:facet_ability_name}")) {
                description = description.replace(
                  "{s:facet_ability_name}",
                  title,
                );
              }

              const allAttribs = [];
              Object.values(scripts[heroKey]).forEach((ability) => {
                const specialAttribs = getSpecialAttrs(ability) || [];
                allAttribs.push(...specialAttribs);
              });

              if (abilities.length > 0) {
                description = replaceSpecialAttribs(
                  description,
                  getSpecialAttrs(scripts[heroKey][ability]) || [],
                  false,
                  scripts[heroKey][ability],
                  ability,
                );
              }

              const matches = description.matchAll(/{s:bonus_(\w+)}/g);
              for ([, bonusKey] of matches) {
                const obj =
                  allAttribs.find((obj) => bonusKey in obj)?.[bonusKey] ?? {};
                const facetKey = Object.keys(obj).find(
                  (k) => k.startsWith("special_bonus_facet") && k.includes(key),
                );
                if (facetKey) {
                  description = description.replace(
                    `{s:bonus_${bonusKey}}`,
                    removeSigns(obj[facetKey]),
                  );
                }
              }

              heroAbilities[heroKey].facets.push({
                id: i,
                name: key,
                deprecated: value.Deprecated,
                icon: value.Icon,
                color: value.Color,
                gradient_id: Number(value.GradientID),
                title,
                description,
                abilities: abilities.length > 0 ? abilities : undefined,
              });
            },
          );
        });

        return heroAbilities;
      },
    },
    {
      key: "region",
      url: "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/regions.txt",
      transform: (respObj) => {
        const region = {};
        const regions = respObj.regions;
        for (const key in regions) {
          if (Number(regions[key].region) > 0) {
            region[regions[key].region] = regions[key].display_name
              .slice("#dota_region_".length)
              .split("_")
              .map((s) => s.toUpperCase())
              .join(" ");
          }
        }
        return region;
      },
    },
    // {
    //   key: "cluster",
    //   url: "https://api.stratz.com/api/v1/Cluster",
    //   transform: (respObj) => {
    //     const cluster = {};
    //     respObj.forEach(({ id, regionId }) => {
    //       cluster[id] = regionId;
    //     });
    //     return cluster;
    //   },
    // },
    {
      key: "countries",
      url: "https://raw.githubusercontent.com/mledoze/countries/master/countries.json",
      transform: (respObj) => {
        const countries = {};
        respObj
          .map((c) => ({
            name: {
              common: c.name.common,
            },
            cca2: c.cca2,
          }))
          .forEach((c) => {
            countries[c.cca2] = c;
          });
        return countries;
      },
    },
    {
      key: "chat_wheel",
      url: [
        "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/chat_wheel.txt",
        localizationUrl,
        "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/resource/localization/hero_chat_wheel_english.txt",
      ],
      transform: (respObj) => {
        const chat_wheel = respObj[0].chat_wheel;
        const lang = respObj[1].lang.Tokens;
        const chat_wheel_lang = respObj[2].hero_chat_wheel;

        const result = {};

        function localize(input) {
          if (!/^#/.test(input)) {
            return input;
          }
          let key = input.replace(/^#/, "");
          return lang[key] || chat_wheel_lang[key] || key;
        }

        function addMessage(key, message) {
          let data = {
            id: parseInt(message.message_id),
            name: key,
            all_chat: message.all_chat == "1" ? true : undefined,
            label: localize(message.label),
            message: localize(message.message),
            image: message.image,
            badge_tier: message.unlock_hero_badge_tier,
          };
          if (message.sound) {
            if (/^soundboard\./.test(message.sound) || /^wisp_/.test(key)) {
              // All of the soundboard clips and the IO responses are wav files
              data.sound_ext = "wav";
            } else if (message.message_id / 1000 >= 121) {
              // Gets the hero id from the message id
              // If the hero is grimstroke or newer, the files are aac
              data.sound_ext = "aac";
            } else {
              // All other response clips used are mp3s
              data.sound_ext = "mp3";
            }
          }
          result[data.id] = data;
        }

        for (let key in chat_wheel.messages) {
          addMessage(key, chat_wheel.messages[key]);
        }
        for (let hero_id in chat_wheel.hero_messages) {
          for (let key in chat_wheel.hero_messages[hero_id]) {
            addMessage(key, chat_wheel.hero_messages[hero_id][key]);
          }
        }
        return result;
      },
    },
    // Requires items and hero names so needs to run after
    {
      key: "patchnotes",
      url: "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/resource/localization/patchnotes/patchnotes_english.txt",
      transform: (respObj) => {
        let items = Object.keys(require("../build/items.json"));
        let heroes = Object.keys(require("../build/hero_lore.json"));
        const data = respObj.patch;

        let result = {};
        let keys = Object.keys(data);
        for (let key of keys) {
          let keyArr = key.replace("DOTA_Patch_", "").split("_");
          let patch = keyArr.splice(0, 2).join("_");
          if (!result[patch])
            result[patch] = {
              general: [],
              items: {},
              heroes: {},
            };

          if (keyArr[0].toLowerCase() == "general") {
            result[patch].general.push(data[key]);
          } else if (keyArr[0] == "item") {
            let searchName = keyArr.slice(1);
            let itemName = parseNameFromArray(searchName, items);
            if (itemName) {
              if (!result[patch].items[itemName])
                result[patch].items[itemName] = [];
              const cleanEntry = data[key].replace(/<[^>]*>/g, "");
              if (cleanEntry !== "") {
                result[patch].items[itemName].push(cleanEntry);
              }
            } else {
              if (!result[patch].items.misc) result[patch].items.misc = [];
              result[patch].items.misc.push(data[key]);
            }
          } else {
            let heroName = parseNameFromArray(keyArr, heroes);

            // Extracting ability name
            let abilityName =
              keyArr.length > 1
                ? keyArr.join("_").replace(`${heroName}_`, "")
                : "general";
            abilityName =
              !abilityName || abilityName === heroName
                ? "general"
                : abilityName;

            if (heroName) {
              if (!result[patch].heroes[heroName])
                result[patch].heroes[heroName] = {};

              let isTalent = data[key].startsWith("Talent:");
              isTalent = isTalent || abilityName.startsWith("talent");
              if (isTalent) {
                if (!result[patch].heroes[heroName].talents)
                  result[patch].heroes[heroName].talents = [];
                result[patch].heroes[heroName].talents.push(
                  data[key].replace("Talent:", "").trim(),
                );
              } else {
                // DOTA_Patch_7_32_shredder_shredder_chakram_2_2
                // DOTA_Patch_7_32_tinker_tinker_rearm_3_info
                // remove everything to the right of the first _n that is found, where n is a number
                abilityName = abilityName.replace(/_[0-9]+.*/, "");
                // if abilityName is just an underscore and number like "_n" then set it to general
                abilityName = parseInt(abilityName.replace(/_/, ""))
                  ? "general"
                  : abilityName;
                if (!result[patch].heroes[heroName][abilityName])
                  result[patch].heroes[heroName][abilityName] = [];
                result[patch].heroes[heroName][abilityName].push(
                  data[key].trim(),
                );
              }
            } else {
              if (!result[patch].heroes.misc) result[patch].heroes.misc = [];
              result[patch].heroes.misc.push(data[key].trim());
            }
          }
        }

        return result;
      },
    },
    // NOTE: This needs to run after abilities since it depends on aghsAbilityValues
    {
      key: "aghs_desc",
      url: heroDataUrls,
      transform: (respObj) => {
        const herodata = respObj;
        const aghs_desc_arr = [];

        // for every hero
        herodata.forEach((hd_hero) => {
          if (!hd_hero) {
            return;
          }
          hd_hero = hd_hero.result.data.heroes[0];

          // object to store data about aghs scepter/shard for a hero
          let aghs_element = {
            hero_name: hd_hero.name,
            hero_id: hd_hero.id,

            has_scepter: false,
            scepter_desc: "",
            scepter_skill_name: "",
            scepter_new_skill: false,

            has_shard: false,
            shard_desc: "",
            shard_skill_name: "",
            shard_new_skill: false,
          };

          hd_hero.abilities.forEach((ability) => {
            // skip unused skills
            if (ability.name_loc == "" || ability.desc_loc == "") {
              return; // i guess this is continue in JS :|
            }

            let scepterName = null;
            let shardName = null;

            // ------------- Scepter  -------------
            if (ability.ability_is_granted_by_scepter) {
              // scepter grants new ability
              aghs_element.scepter_desc = ability.desc_loc;
              aghs_element.scepter_skill_name = ability.name_loc;
              scepterName = ability.name;
              aghs_element.scepter_new_skill = true;
              aghs_element.has_scepter = true;
            } else if (
              ability.ability_has_scepter &&
              !(ability.scepter_loc == "")
            ) {
              // scepter ugprades an ability
              aghs_element.scepter_desc = ability.scepter_loc;
              aghs_element.scepter_skill_name = ability.name_loc;
              scepterName = ability.name;
              aghs_element.scepter_new_skill = false;
              aghs_element.has_scepter = true;
            }
            // -------------- Shard  --------------
            if (ability.ability_is_granted_by_shard) {
              // scepter grants new ability
              aghs_element.shard_desc = ability.desc_loc;
              aghs_element.shard_skill_name = ability.name_loc;
              shardName = ability.name;
              aghs_element.shard_new_skill = true;
              aghs_element.has_shard = true;
            } else if (
              ability.ability_has_shard &&
              !(ability.shard_loc == "")
            ) {
              // scepter ugprades an ability
              aghs_element.shard_desc = ability.shard_loc;
              aghs_element.shard_skill_name = ability.name_loc;
              shardName = ability.name;
              aghs_element.shard_new_skill = false;
              aghs_element.has_shard = true;
            }
            if (scepterName) {
              const values = aghsAbilityValues[scepterName];
              aghs_element.scepter_desc = aghs_element.scepter_desc.replace(
                /%([^% ]*)%/g,
                findAghsAbilityValue(values),
              );
            }
            if (shardName) {
              const values = aghsAbilityValues[shardName];
              aghs_element.shard_desc = aghs_element.shard_desc.replace(
                /%([^% ]*)%/g,
                findAghsAbilityValue(values),
              );
            }
            // clean up <br> and double % signs
            aghs_element.scepter_desc = aghs_element.scepter_desc
              .replace(/<br>/gi, "\n")
              .replace("%%", "%");
            aghs_element.shard_desc = aghs_element.shard_desc
              .replace(/<br>/gi, "\n")
              .replace("%%", "%");
          });

          // Error handling
          if (!aghs_element.has_shard) {
            console.log(
              aghs_element.hero_name +
                "[" +
                aghs_element.hero_id +
                "]" +
                ": Didn't find a scepter...",
            );
          }
          if (!aghs_element.has_scepter) {
            console.log(
              aghs_element.hero_name +
                "[" +
                aghs_element.hero_id +
                "]" +
                ": Didn't find a shard...",
            );
          }
          // push the current hero"s element into the array
          aghs_desc_arr.push(aghs_element);
        });

        return aghs_desc_arr;
      },
    },
  ];

  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    const url = s.url;
    // Make all urls into array
    const arr = [].concat(url);
    // console.log(arr);
    const resps = await Promise.all(
      arr.map(async (url) => {
        console.log(url);
        const resp = await axios.get(url, { responseType: "text" });
        return parseJsonOrVdf(resp.data, url);
      }),
    );
    let final = resps;
    if (s.transform) {
      final = s.transform(resps.length === 1 ? resps[0] : resps);
    }
    fs.writeFileSync(
      "./build/" + s.key + ".json",
      JSON.stringify(final, null, 2),
    );
  }
  // Copy manual json files to build
  const jsons = fs.readdirSync("./json");
  jsons.forEach((filename) => {
    fs.writeFileSync(
      "./build/" + filename,
      fs.readFileSync("./json/" + filename, "utf-8"),
    );
  });
  // Reference built files in index.js
  const cfs = fs.readdirSync("./build");
  // Exports aren"t supported in Node yet, so use old export syntax for now
  // const code = cfs.map((filename) => `export const ${filename.split(".")[0]} = require(__dirname + "/json/${filename.split(".")[0]}.json");`).join("\n";
  const code = `module.exports = {
${cfs
  .map(
    (filename) =>
      `${filename.split(".")[0]}: require(__dirname + "/build/${
        filename.split(".")[0]
      }.json")`,
  )
  .join(",\n")}
};`;
  fs.writeFileSync("./index.js", code);
  process.exit(0);
}

function isObj(obj) {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === "object" &&
    !Array.isArray(obj)
  );
}

function parseJsonOrVdf(text, url) {
  try {
    return JSON.parse(text);
  } catch (err) {
    try {
      let fixed = text;
      // Remove empty values that break parser
      fixed = fixed.replace(/\t\t"ItemRequirements"\r\n\t\t""/g, "");
      fixed = fixed.replace(/\t\t\t"has_flying_movement"\t\r\n\t\t\t""/g, "");
      fixed = fixed.replace(/\t\t\t"damage_reduction"\t\r\n\t\t\t""/g, "");
      let vdf = vdfparser.parse(fixed, { types: false });
      return vdf;
    } catch (e) {
      console.error("Couldn't parse JSON or VDF", url);
      throw e;
    }
  }
}

function getSpecialAttrs(entity) {
  let specialAttr = entity.AbilitySpecial;
  if (!specialAttr) {
    specialAttr = entity.AbilityValues;
    if (specialAttr) {
      specialAttr = Object.keys(specialAttr).map((attr) => ({
        [attr]: specialAttr[attr],
      }));
    }
  } else {
    specialAttr = Object.entries(specialAttr).map(([key, val]) => {
      // val looks like the following, so just take the value of the second key
      /*
      {
				"var_type"				"FIELD_INTEGER"
				"bonus_movement"			"20"
      }
			*/
      return { [Object.keys(val)[1]]: val[Object.keys(val)[1]] };
    });
  }
  return specialAttr;
}

function calculateValueFromBonus(value, bonus) {
  const rawBonus = bonus
    .replace("+", "")
    .replace("-", "")
    .replace("x", "")
    .replace("%", "");
  if (value === undefined) {
    return rawBonus;
  }
  const baseValue = parseFloat(value);
  let ret = rawBonus;
  // if the base value is non-zero
  if (baseValue !== 0) {
    let bonusMultiplier = bonus;
    if (bonusMultiplier.indexOf("%") !== -1) {
      bonusMultiplier = bonusMultiplier.replace("%", "");
      if (bonusMultiplier[0] === "+") {
        bonusMultiplier = bonusMultiplier.replace("+", "");
        bonusMultiplier = 1 + parseFloat(bonusMultiplier) / 100.0;
      } else if (bonusMultiplier[0] === "-") {
        bonusMultiplier = bonusMultiplier.replace("-", "");
        bonusMultiplier = parseFloat(bonusMultiplier) / 100.0;
      }
      return baseValue * bonusMultiplier;
    } else if (bonusMultiplier[0] === "+" || bonusMultiplier[0] === "-") {
      let bonusTerm = parseFloat(rawBonus);
      if (bonusMultiplier[0] === "+") {
        return baseValue + bonusTerm;
      } else {
        return baseValue - bonusTerm;
      }
    } else {
      return baseValue + parseFloat(bonus);
    }
  }
  let int = Math.floor(ret);
  if (int == ret) {
    return int;
  }
  return ret;
}

function findAghsAbilityValue(values) {
  return function (str, name) {
    if (name == "") {
      return "%";
    }
    let orig = `%${name}%`;
    name = name.toLowerCase();
    return values?.[name] ?? orig;
  };
}

function expandItemGroup(key, items) {
  let base = [key];
  if (items[key] && items[key].components) {
    return [].concat.apply(
      base,
      items[key].components.map(function (c) {
        return expandItemGroup(c, items);
      }),
    );
  } else {
    return base;
  }
}

function replaceUselessDecimals(strToReplace) {
  return strToReplace.replace(/\.0+(\D)/, "$1");
}

// Formats something like "20 21 22" or [ 20, 21, 22 ] to be "20 / 21 / 22"
function formatValues(value, percent = false, separator = " / ") {
  let values = Array.isArray(value) ? value : String(value).split(" ");
  if (values.every((v) => v == values[0])) {
    values = [values[0]];
  }
  if (percent) {
    values = values.map((v) => v + "%");
  }
  let len = values.length;
  let res = values.join(separator).replace(/\.0+(\D|$)/g, "$1");
  return len > 1 ? res.split(separator) : res;
}

// Formats AbilitySpecial for the attrib value for abilities and items
function formatAttrib(attributes, strings, strings_prefix) {
  if (attributes && !Array.isArray(attributes))
    attributes = Object.values(attributes);
  return (attributes || [])
    .filter(
      (attr) => !excludeAttributes.has(Object.keys(attr)[0].toLowerCase()),
    )
    .map((attr) => {
      let key = Object.keys(attr).find(
        (key) => `${strings_prefix}${key.toLowerCase()}` in strings,
      );
      if (!key) {
        for (item in attr) {
          key = item;
          break;
        }
        if (attr[key] === null) {
          return null;
        }
        const headerName =
          generatedHeaders[key] ?? key.replace(/_/g, " ").toUpperCase();
        const values = isObj(attr[key]) ? attr[key].value : attr[key];
        if (values === undefined) {
          return null;
        }
        return {
          key: key,
          header: `${headerName}:`,
          value: formatValues(values),
          generated: true,
        };
      }

      let final = { key: key };
      let header = strings[`${strings_prefix}${key.toLowerCase()}`];
      let match = header.match(/(%)?(\+\$)?(.*)/);
      header = match[3];
      if (attr[key] === null) {
        return null;
      }
      const values = isObj(attr[key]) ? attr[key].value : attr[key];
      if (values === undefined) {
        return null;
      }

      if (match[2]) {
        final.header = "+";
        final.value = formatValues(values, match[1]);
        final.footer = strings[`dota_ability_variable_${header}`];
        if (header.includes("attack_range"))
          final.footer = final.footer.replace(/<[^>]*>/g, "");
      } else {
        final.header = header.replace(/<[^>]*>/g, "");
        final.value = formatValues(values, match[1]);
      }

      return final;
    })
    .filter((a) => a);
}

function removeSigns(template) {
  return template
    .replace("+", "")
    .replace("-", "")
    .replace("x", "")
    .replace("=", "");
}

let specialBonusLookup = {};

function replaceSValues(template, attribs, key) {
  let values = specialBonusLookup[key] ?? {};
  if (
    template &&
    ((attribs && Array.isArray(attribs)) || Object.keys(values).length)
  ) {
    (attribs || []).forEach((attrib) => {
      for (const key of Object.keys(attrib)) {
        let val = attrib[key];
        if (val === null) {
          continue;
        }
        if (isObj(val)) {
          values[key] = val["value"];
          const specialBonusKey = Object.keys(val).find((key) =>
            key.startsWith("special_bonus_"),
          );
          if (specialBonusKey) {
            const bonusKey = `bonus_${key}`;
            // remove redundant signs
            const specialBonusVal = val[specialBonusKey]
              .replace("+", "")
              .replace("-", "")
              .replace("x", "")
              .replace("%", "");
            if (specialBonusKey in specialBonusLookup) {
              specialBonusLookup[specialBonusKey][bonusKey] = specialBonusVal;
            } else {
              // sometimes special bonuses look up by the value key rather than the bonus name.
              specialBonusLookup[specialBonusKey] = {
                [bonusKey]: specialBonusVal,
                value: specialBonusVal,
              };
            }
          }
        } else {
          values[key] = val;
        }
      }
    });
    Object.keys(values).forEach((key) => {
      if (typeof values[key] != "object") {
        template = template.replace(`{s:${key}}`, values[key]);
      }
    });
  }
  return template;
}

function replaceBonusSValues(key, template, attribs) {
  if (template && attribs) {
    Object.keys(attribs).forEach((bonus) => {
      if (
        typeof attribs[bonus] == "object" &&
        attribs[bonus]?.hasOwnProperty(key)
      ) {
        // remove redundant signs
        let bonus_value = removeSigns(attribs[bonus][key]);

        template = template
          // Most of the time, the bonus value template is named bonus_<bonus_key>
          .replace(`{s:bonus_${bonus}}`, bonus_value)
          // But sometimes, it"s just value
          .replace(`{s:value}`, bonus_value);
      }
    });
  }
  return template;
}

// Formats templates like "Storm"s movement speed is %storm_move_speed%" with "Storm"s movement speed is 32"
// args are the template, and a list of attribute dictionaries, like the ones in AbilitySpecial for each ability in the npc_abilities from the vpk
function replaceSpecialAttribs(
  template,
  attribs,
  isItem = false,
  allData = {},
  key, // For error tracing
) {
  if (!template) {
    return template;
  }

  if (attribs) {
    attribs.forEach((attr) => {
      const keys = Object.entries(attr);
      for (const [key, val] of keys) {
        const name = key.toLowerCase();
        if (name !== key) {
          delete attr[key];
          attr[name] = val;
        }
      }
    });
    //additional special ability keys being catered
    extraAttribKeys.forEach((abilitykey) => {
      if (abilitykey in allData) {
        let abilityValue = isObj(allData[abilitykey])
          ? allData[abilitykey].value
          : allData[abilitykey];
        let value = abilityValue.split(" "); //can have multiple values
        value =
          value.length === 1 ? Number(value[0]) : value.map((v) => Number(v));
        abilitykey = abilitykey.toLowerCase();
        attribs.push({ [abilitykey]: value });
        // these are also present with another attrib name
        if (remapAttributes[abilitykey]) {
          attribs.push({ [remapAttributes[abilitykey]]: value });
        }
      }
    });

    if (template.includes("%customval_team_tomes_used%")) {
      //in-game line not required in tooltip
      template = template.replace(/[ a-zA-Z]+: %\w+%/g, "");
    }

    template = template.replace(/%([^% ]*)%/g, function (str, name) {
      if (name == "") {
        return "%";
      }
      let orig = `%${name}%`;
      name = name.toLowerCase();
      if (!Array.isArray(attribs)) attribs = Object.values(attribs);
      let attr = attribs.find((attr) => name in attr);
      if (!attr && name[0] === "d") {
        // Because someone at valve messed up in 4 places
        name = name.substr(1);
        attr = attribs.find((attr) => name in attr);
      }
      if (!attr) {
        if (name === "lifesteal") {
          //special cases, in terms of template context and dota2 gamepedia
          return attribs.find((obj) => "lifesteal_percent" in obj)
            .lifesteal_percent;
        } else if (name === "movement_slow") {
          return attribs.find((obj) => "damage_pct" in obj).damage_pct;
        } else if (name.startsWith("bonus_")) {
          // Some facets have an extra bonus_ at the start
          const newName = name.replace("bonus_", "");
          const obj = attribs.find((obj) => newName in obj) ?? {};
          const facetKey = Object.keys(obj).find((k) =>
            k.startsWith("special_bonus_facet"),
          );
          if (facetKey) {
            return obj[facetKey].replace("=", "");
          }
          if (newName in obj) {
            return obj[newName];
          }
        }

        console.log(
          `cant find attribute %${name}% in %${key}% with ${attribs.map(
            (o) => Object.keys(o)[0],
          )}`,
        );
        return `%${name}%`;
      }

      let ret;

      if (attr[name].value !== undefined) {
        ret = attr[name].value;
      } else {
        ret = attr[name];
      }

      const facetKey = Object.keys(attr[name]).find((k) =>
        k.startsWith("special_bonus_facet"),
      );

      if (facetKey) {
        ret = attr[name][facetKey].replace("=", "");
      }

      if (ret === undefined) {
        return orig;
      } else {
        let float = parseFloat(ret);
        if (float) {
          let int = Math.floor(float);
          if (ret == int) {
            return int;
          }
          return float;
        } else {
          return ret;
        }
      }
    });
  }
  template = template.replace(/<br>/gi, "\n").replace("%%", "%");

  // Remove html tags and double spaces from a string
  function formatTemplate(template = "") {
    // replace close tags with a space, but not open tags
    template = template
      .replace(/(<(\/[^>]+)>)/gi, " ")
      .replace(/(<([^>]+)>)/gi, "");
    // replace double spaces
    return template.replace(/  +/g, " ");
  }

  if (isItem) {
    const hint = [];
    const abilities = [];
    const desc = cleanupArray(template.split("\\n"));
    desc.forEach((line) => {
      const ability = line.match(
        /<h1>(Use|Active|Passive|Toggle|Upgrade): (.+)<\/h1>([\S\s]+)/,
      );
      if (ability) {
        const [str, type, name, description] = ability;
        abilities.push({
          type: type.toLowerCase(),
          title: name.trim(),
          description: formatTemplate(description).trim(),
        });
      } else {
        hint.push(formatTemplate(line));
      }
    });
    return {
      abilities,
      hint,
    };
  }

  template = formatTemplate(template);

  template = template.replace(/\\n/g, "\n");
  return template;
}

function formatBehavior(string) {
  if (!string) return false;
  if (Array.isArray(string)) {
    string = string.join(' | ');
  }
  let split = string
    .split(" | ")
    .filter(
      (item) =>
        !ignoreStrings.has(item.trim()) &&
        extraStrings.hasOwnProperty(item.trim()),
    )
    .map((item) => {
      return extraStrings[item.trim()];
    });

  if (split.length === 1) {
    return split[0];
  } else {
    return split;
  }
}

function formatVpkHero(key, vpkr) {
  let h = {};

  let vpkrh = vpkr.DOTAHeroes[key];
  let baseHero = vpkr.DOTAHeroes.npc_dota_hero_base;

  h.id = vpkrh.HeroID;
  h.name = key;

  h.primary_attr = vpkrh.AttributePrimary.replace("DOTA_ATTRIBUTE_", "")
    .slice(0, 3)
    .toLowerCase();
  h.attack_type =
    vpkrh.AttackCapabilities == "DOTA_UNIT_CAP_MELEE_ATTACK"
      ? "Melee"
      : "Ranged";
  h.roles = vpkrh.Role.split(",");

  h.img =
    "/apps/dota2/images/dota_react/heroes/" +
    key.replace("npc_dota_hero_", "") +
    ".png?";
  h.icon =
    "/apps/dota2/images/dota_react/heroes/icons/" +
    key.replace("npc_dota_hero_", "") +
    ".png?";
  h.url = vpkrh.url;

  h.base_health = Number(vpkrh.StatusHealth || baseHero.StatusHealth);
  h.base_health_regen = Number(
    vpkrh.StatusHealthRegen || baseHero.StatusHealthRegen,
  );
  h.base_mana = Number(vpkrh.StatusMana || baseHero.StatusMana);
  h.base_mana_regen = Number(vpkrh.StatusManaRegen || baseHero.StatusManaRegen);
  h.base_armor = Number(vpkrh.ArmorPhysical || baseHero.ArmorPhysical);
  h.base_mr = Number(vpkrh.MagicalResistance || baseHero.MagicalResistance);

  h.base_attack_min = Number(vpkrh.AttackDamageMin || baseHero.AttackDamageMin);
  h.base_attack_max = Number(vpkrh.AttackDamageMax || baseHero.AttackDamageMax);

  h.base_str = Number(vpkrh.AttributeBaseStrength);
  h.base_agi = Number(vpkrh.AttributeBaseAgility);
  h.base_int = Number(vpkrh.AttributeBaseIntelligence);

  h.str_gain = Number(vpkrh.AttributeStrengthGain);
  h.agi_gain = Number(vpkrh.AttributeAgilityGain);
  h.int_gain = Number(vpkrh.AttributeIntelligenceGain);

  h.attack_range = Number(vpkrh.AttackRange);
  h.projectile_speed = Number(
    vpkrh.ProjectileSpeed || baseHero.ProjectileSpeed,
  );
  h.attack_rate = Number(vpkrh.AttackRate || baseHero.AttackRate);
  h.base_attack_time = Number(
    vpkrh.BaseAttackSpeed || baseHero.BaseAttackSpeed,
  );
  h.attack_point = Number(
    vpkrh.AttackAnimationPoint || baseHero.AttackAnimationPoint,
  );

  h.move_speed = Number(vpkrh.MovementSpeed);
  h.turn_rate = Number(vpkrh.MovementTurnRate);

  h.cm_enabled = vpkrh.CMEnabled === "1" ? true : false;
  h.legs = Number(vpkrh.Adjectives?.Legs || baseHero.Adjectives?.Legs);

  h.day_vision = Number(
    vpkrh.VisionDaytimeRange || baseHero.VisionDaytimeRange,
  );
  h.night_vision = Number(
    vpkrh.VisionNighttimeRange || baseHero.VisionNighttimeRange,
  );

  return h;
}

function parseNameFromArray(array, names) {
  let final = [];
  for (let i = 1; i <= array.length; i++) {
    let name = array.slice(0, i).join("_");
    if (names.includes(name)) {
      final.push(name);
    }
  }
  return final.map((a) => a)[0];
}

const getNeutralItemNameTierMap = (neutrals) => {
  let ret = {};
  Object.keys(neutrals).forEach((tier) => {
    let items = neutrals[tier].items;
    Object.keys(items).forEach((itemName) => {
      ret[itemName] = ret[itemName.replace(/recipe_/gi, "")] = parseInt(tier);
    });
  });
  return ret;
};
