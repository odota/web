const a  = {
    "blink": {
      "active": [
        {
          "name": "Blink",
          "desc": "Teleport to a target point up to 1200 units away. \n\nBlink Dagger cannot be used for 3 seconds after taking damage from an enemy hero or Roshan."
        }
      ],
      "id": 1,
      "img": "/apps/dota2/images/items/blink_lg.png?3",
      "dname": "Blink Dagger",
      "qual": "component",
      "cost": 2250,
      "notes": "Self-casting will cause you to teleport in the direction of your team's fountain.\nIf you used Blink to teleport to a distance over the maximum range, you'll be teleported 4/5 of the maximum range instead.",
      "attrib": [],
      "mc": false,
      "cd": 15,
      "lore": "The fabled dagger used by the fastest assassin ever to walk the lands.",
      "components": null,
      "created": false
    },
    "blades_of_attack": {
      "id": 2,
      "img": "/apps/dota2/images/items/blades_of_attack_lg.png?3",
      "dname": "Blades of Attack",
      "qual": "component",
      "cost": 430,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "9",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "The damage of these small, concealable blades should not be underestimated.",
      "components": null,
      "created": false
    },
    "broadsword": {
      "id": 3,
      "img": "/apps/dota2/images/items/broadsword_lg.png?3",
      "dname": "Broadsword",
      "qual": "component",
      "cost": 1200,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "18",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "The classic weapon of choice for knights, this blade is sturdy and reliable for slaying enemies.",
      "components": null,
      "created": false
    },
    "chainmail": {
      "id": 4,
      "img": "/apps/dota2/images/items/chainmail_lg.png?3",
      "dname": "Chainmail",
      "qual": "component",
      "cost": 550,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "5",
          "footer": "Armor"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A medium weave of metal chains.",
      "components": null,
      "created": false
    },
    "claymore": {
      "id": 5,
      "img": "/apps/dota2/images/items/claymore_lg.png?3",
      "dname": "Claymore",
      "qual": "component",
      "cost": 1400,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "21",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A sword that can cut through armor, it's a commonly chosen first weapon for budding swordsmen.",
      "components": null,
      "created": false
    },
    "helm_of_iron_will": {
      "id": 6,
      "img": "/apps/dota2/images/items/helm_of_iron_will_lg.png?3",
      "dname": "Helm of Iron Will",
      "qual": "component",
      "cost": 900,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "5",
          "footer": "Armor"
        },
        {
          "key": "bonus_regen",
          "header": "+",
          "value": "3",
          "footer": "HP Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "The helmet of a legendary warrior who fell in battle.",
      "components": null,
      "created": false
    },
    "javelin": {
      "passive": [
        {
          "name": "Pierce",
          "desc": "Grants each attack a 25% chance to pierce through evasion and deal 100 bonus magical damage."
        }
      ],
      "id": 7,
      "img": "/apps/dota2/images/items/javelin_lg.png?3",
      "dname": "Javelin",
      "qual": "component",
      "cost": 1100,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "A rather typical spear that can sometimes pierce through an enemy's armor when used to attack.",
      "components": null,
      "created": false
    },
    "mithril_hammer": {
      "id": 8,
      "img": "/apps/dota2/images/items/mithril_hammer_lg.png?3",
      "dname": "Mithril Hammer",
      "qual": "component",
      "cost": 1600,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "24",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A hammer forged of pure mithril.",
      "components": null,
      "created": false
    },
    "platemail": {
      "id": 9,
      "img": "/apps/dota2/images/items/platemail_lg.png?3",
      "dname": "Platemail",
      "qual": "secret_shop",
      "cost": 1400,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "10",
          "footer": "Armor"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Thick metal plates that protect the entire upper body. Avoid dropping on feet.",
      "components": null,
      "created": false
    },
    "quarterstaff": {
      "id": 10,
      "img": "/apps/dota2/images/items/quarterstaff_lg.png?3",
      "dname": "Quarterstaff",
      "qual": "component",
      "cost": 875,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "10",
          "footer": "Damage"
        },
        {
          "key": "bonus_speed",
          "header": "+",
          "value": "10",
          "footer": "Attack Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A basic staff that allows you to strike quickly.",
      "components": null,
      "created": false
    },
    "quelling_blade": {
      "active": [
        {
          "name": "Chop Tree/Ward",
          "desc": "Destroy a target tree or ward. Chop cast range is increased when targeting wards.\n\nTree Range: 350\nWard Range: 450"
        }
      ],
      "passive": [
        {
          "name": "Quell",
          "desc": "Increases attack damage against non-hero units by 24 for melee heroes, and 7 for ranged."
        }
      ],
      "id": 11,
      "img": "/apps/dota2/images/items/quelling_blade_lg.png?3",
      "dname": "Quelling Blade",
      "qual": "component",
      "cost": 200,
      "notes": "Effects of multiple quelling blades do not stack.\nChop can be used to destroy Techies' Remote Mines.",
      "attrib": [],
      "mc": false,
      "cd": 4,
      "lore": "The axe of a fallen gnome, it allows you to effectively maneuver the forest.",
      "components": null,
      "created": false
    },
    "faerie_fire": {
      "use": [
        {
          "name": "Imbue",
          "desc": "Instantly restores 85 health."
        }
      ],
      "id": 237,
      "img": "/apps/dota2/images/items/faerie_fire_lg.png?3",
      "dname": "Faerie Fire",
      "qual": "consumable",
      "cost": 70,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "2",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": 5,
      "lore": "The ethereal flames from the ever-burning ruins of Kindertree ignite across realities.",
      "components": null,
      "created": false
    },
    "infused_raindrop": {
      "passive": [
        {
          "name": "Magical Damage Block",
          "desc": "Consumes a charge to block 120 magic damage from damage instances over 50 damage. \n\nComes with 5 charges. When the charges are gone, the item disappears."
        }
      ],
      "id": 265,
      "img": "/apps/dota2/images/items/infused_raindrop_lg.png?3",
      "dname": "Infused Raindrops",
      "qual": "component",
      "cost": 225,
      "notes": "Uses at most one charge per damage instance.",
      "attrib": [
        {
          "key": "mana_regen",
          "header": "+",
          "value": "0.5",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": 7,
      "lore": "Elemental protection from magical assaults.",
      "components": null,
      "created": false
    },
    "wind_lace": {
      "hint": [
        "Bonuses from multiple Wind Laces do not stack."
      ],
      "id": 244,
      "img": "/apps/dota2/images/items/wind_lace_lg.png?3",
      "dname": "Wind Lace",
      "qual": "component",
      "cost": 250,
      "notes": "",
      "attrib": [
        {
          "key": "movement_speed",
          "header": "+",
          "value": "20",
          "footer": "Movement Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Hasten to battle on wind-touched heels.",
      "components": null,
      "created": false
    },
    "ring_of_protection": {
      "id": 12,
      "img": "/apps/dota2/images/items/ring_of_protection_lg.png?3",
      "dname": "Ring of Protection",
      "qual": "component",
      "cost": 175,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "2",
          "footer": "Armor"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A glimmering ring that defends its bearer.",
      "components": null,
      "created": false
    },
    "stout_shield": {
      "passive": [
        {
          "name": "Damage Block",
          "desc": "Grants a 50% chance to block 18 damage from incoming attacks on melee heroes, and 9 damage on ranged."
        }
      ],
      "id": 182,
      "img": "/apps/dota2/images/items/stout_shield_lg.png?3",
      "dname": "Stout Shield",
      "qual": "component",
      "cost": 200,
      "notes": "Multiple sources of damage block do not stack.",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "One man's wine barrel bottom is another man's shield.",
      "components": null,
      "created": false
    },
    "moon_shard": {
      "use": [
        {
          "name": "Consume",
          "desc": "Consume the Moon Shard to permanently gain 60 attack speed and 200 bonus night vision. Max 1 use."
        }
      ],
      "passive": [
        {
          "name": "Shade Sight",
          "desc": "Grants 400 bonus night vision."
        }
      ],
      "id": 247,
      "img": "/apps/dota2/images/items/moon_shard_lg.png?3",
      "dname": "Moon Shard",
      "qual": "consumable",
      "cost": 4000,
      "notes": "The bonus night vision works during Night Stalker's Darkness ability.",
      "attrib": [
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "140",
          "footer": "Attack Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Said to be a tear from the lunar goddess Selemene.",
      "components": [
        "hyperstone",
        "hyperstone"
      ],
      "created": true
    },
    "gauntlets": {
      "id": 13,
      "img": "/apps/dota2/images/items/gauntlets_lg.png?3",
      "dname": "Gauntlets of Strength",
      "qual": "component",
      "cost": 135,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "3",
          "footer": "Strength"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Studded leather gloves that add brute strength.",
      "components": null,
      "created": false
    },
    "slippers": {
      "id": 14,
      "img": "/apps/dota2/images/items/slippers_lg.png?3",
      "dname": "Slippers of Agility",
      "qual": "component",
      "cost": 135,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "3",
          "footer": "Agility"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Light boots made from spider skin that tingles your senses.",
      "components": null,
      "created": false
    },
    "mantle": {
      "id": 15,
      "img": "/apps/dota2/images/items/mantle_lg.png?3",
      "dname": "Mantle of Intelligence",
      "qual": "component",
      "cost": 135,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "3",
          "footer": "Intelligence"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A beautiful sapphire mantle worn by generations of queens.",
      "components": null,
      "created": false
    },
    "branches": {
      "use": [
        {
          "name": "Plant Tree",
          "desc": "Targets the ground to plant a happy little tree that lasts for 20 seconds.\n\nRange: 200"
        }
      ],
      "id": 16,
      "img": "/apps/dota2/images/items/branches_lg.png?3",
      "dname": "Iron Branch",
      "qual": "consumable",
      "cost": 50,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "1",
          "footer": "All Attributes"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A seemingly ordinary branch, its ironlike qualities are bestowed upon the bearer.",
      "components": null,
      "created": false
    },
    "belt_of_strength": {
      "id": 17,
      "img": "/apps/dota2/images/items/belt_of_strength_lg.png?3",
      "dname": "Belt of Strength",
      "qual": "component",
      "cost": 450,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "6",
          "footer": "Strength"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A valued accessory for improving vitality.",
      "components": null,
      "created": false
    },
    "boots_of_elves": {
      "id": 18,
      "img": "/apps/dota2/images/items/boots_of_elves_lg.png?3",
      "dname": "Band of Elvenskin",
      "qual": "component",
      "cost": 450,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "6",
          "footer": "Agility"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A tensile fabric often used for its light weight and ease of movement.",
      "components": null,
      "created": false
    },
    "robe": {
      "id": 19,
      "img": "/apps/dota2/images/items/robe_lg.png?3",
      "dname": "Robe of the Magi",
      "qual": "component",
      "cost": 450,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "6",
          "footer": "Intelligence"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "This robe corrupts the soul of the user, but provides wisdom in return.",
      "components": null,
      "created": false
    },
    "circlet": {
      "id": 20,
      "img": "/apps/dota2/images/items/circlet_lg.png?3",
      "dname": "Circlet",
      "qual": "component",
      "cost": 165,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "2",
          "footer": "All Attributes"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "An elegant circlet designed for human princesses.",
      "components": null,
      "created": false
    },
    "ogre_axe": {
      "id": 21,
      "img": "/apps/dota2/images/items/ogre_axe_lg.png?3",
      "dname": "Ogre Axe",
      "qual": "component",
      "cost": 1000,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "10",
          "footer": "Strength"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "You grow stronger just by holding it.",
      "components": null,
      "created": false
    },
    "blade_of_alacrity": {
      "id": 22,
      "img": "/apps/dota2/images/items/blade_of_alacrity_lg.png?3",
      "dname": "Blade of Alacrity",
      "qual": "component",
      "cost": 1000,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "10",
          "footer": "Agility"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A long blade imbued with time magic.",
      "components": null,
      "created": false
    },
    "staff_of_wizardry": {
      "id": 23,
      "img": "/apps/dota2/images/items/staff_of_wizardry_lg.png?3",
      "dname": "Staff of Wizardry",
      "qual": "component",
      "cost": 1000,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "10",
          "footer": "Intelligence"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A staff of magical powers passed down from the eldest mages.",
      "components": null,
      "created": false
    },
    "ultimate_orb": {
      "id": 24,
      "img": "/apps/dota2/images/items/ultimate_orb_lg.png?3",
      "dname": "Ultimate Orb",
      "qual": "secret_shop",
      "cost": 2150,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "10",
          "footer": "All Attributes"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A mystical orb containing the essence of life.",
      "components": null,
      "created": false
    },
    "gloves": {
      "id": 25,
      "img": "/apps/dota2/images/items/gloves_lg.png?3",
      "dname": "Gloves of Haste",
      "qual": "component",
      "cost": 500,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "20",
          "footer": "Attack Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A pair of magical gloves that seems to render weapons weightless.",
      "components": null,
      "created": false
    },
    "lifesteal": {
      "passive": [
        {
          "name": "Lifesteal",
          "desc": "Heals the attacker for 15% of attack damage dealt."
        }
      ],
      "id": 26,
      "img": "/apps/dota2/images/items/lifesteal_lg.png?3",
      "dname": "Morbid Mask",
      "qual": "component",
      "cost": 1100,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "10",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A mask that drains the energy of those caught in its gaze.",
      "components": null,
      "created": false
    },
    "ring_of_regen": {
      "id": 27,
      "img": "/apps/dota2/images/items/ring_of_regen_lg.png?3",
      "dname": "Ring of Regen",
      "qual": "component",
      "cost": 300,
      "notes": "Ring of Regen is shareable.",
      "attrib": [
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "1.5",
          "footer": "HP Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "This ring is considered a good luck charm among the Gnomes.",
      "components": null,
      "created": false
    },
    "sobi_mask": {
      "id": 28,
      "img": "/apps/dota2/images/items/sobi_mask_lg.png?3",
      "dname": "Sage's Mask",
      "qual": "component",
      "cost": 325,
      "notes": "Sage's Mask is shareable.",
      "attrib": [
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "0.5",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A mask commonly used by mages and warlocks for various rituals.",
      "components": null,
      "created": false
    },
    "boots": {
      "hint": [
        "Flat movement speed bonuses from multiple pairs of boots do not stack."
      ],
      "id": 29,
      "img": "/apps/dota2/images/items/boots_lg.png?3",
      "dname": "Boots of Speed",
      "qual": "component",
      "cost": 500,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_movement_speed",
          "header": "+",
          "value": "50",
          "footer": "Movement Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Fleet footwear, increasing movement.",
      "components": null,
      "created": false
    },
    "gem": {
      "passive": [
        {
          "name": "True Sight",
          "desc": "Grants the ability to see invisible units and wards to any allied vision within 900 range of its carrier. "
        },
        {
          "name": "Everlasting",
          "desc": "Dropped on death, and cannot be destroyed."
        }
      ],
      "id": 30,
      "img": "/apps/dota2/images/items/gem_lg.png?3",
      "dname": "Gem of True Sight",
      "qual": "component",
      "cost": 900,
      "notes": "Disabled while on a courier.",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "Not one thrall creature of the depths,\r\nNor spirit bound in drowning's keep,\r\nNor Maelrawn the Tentacular,\r\nShall rest till seas, gem comes to sleep.",
      "components": null,
      "created": false
    },
    "cloak": {
      "id": 31,
      "img": "/apps/dota2/images/items/cloak_lg.png?3",
      "dname": "Cloak",
      "qual": "component",
      "cost": 550,
      "notes": "Stacks multiplicatively with other sources of spell resistance.",
      "attrib": [
        {
          "key": "tooltip_resist",
          "header": "+",
          "value": "15%",
          "footer": "Magic Resistance"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A cloak made of a magical material that works to dispel any magic cast on it.",
      "components": null,
      "created": false
    },
    "talisman_of_evasion": {
      "id": 32,
      "img": "/apps/dota2/images/items/talisman_of_evasion_lg.png?3",
      "dname": "Talisman of Evasion",
      "qual": "secret_shop",
      "cost": 1400,
      "notes": "Stacks diminishingly with other sources of Evasion.",
      "attrib": [
        {
          "key": "bonus_evasion",
          "header": "+",
          "value": "15%",
          "footer": "Evasion"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A necklace that allows you to anticipate enemy attacks.",
      "components": null,
      "created": false
    },
    "cheese": {
      "use": [
        {
          "name": "Fondue",
          "desc": "Instantly restores 2500 health and 1500 mana."
        }
      ],
      "id": 33,
      "img": "/apps/dota2/images/items/cheese_lg.png?3",
      "dname": "Cheese",
      "qual": "consumable",
      "cost": 1000,
      "notes": "Cheese is shareable.",
      "attrib": [],
      "mc": false,
      "cd": 40,
      "lore": "Made from the milk of a long lost Furbolg vendor, it restores the vitality of those who taste it.",
      "components": null,
      "created": false
    },
    "magic_stick": {
      "active": [
        {
          "name": "Energy Charge",
          "desc": "Instantly restores 15 health and mana per charge stored.\n\n Max 10 charges. Gains a charge whenever a visible enemy within 1200 range uses an ability."
        }
      ],
      "id": 34,
      "img": "/apps/dota2/images/items/magic_stick_lg.png?3",
      "dname": "Magic Stick",
      "qual": "component",
      "cost": 200,
      "notes": "Gains charges for spells cast by visible enemies in 1200 range.\nCertain abilities and item abilities will not add charges.",
      "attrib": [],
      "mc": false,
      "cd": 13,
      "lore": "A simple wand used to channel magic energies, it is favored by apprentice wizards and great warlocks alike.",
      "components": null,
      "created": false
    },
    "recipe_magic_wand": {
      "id": 35,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Magic Wand Recipe",
      "cost": 150,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "magic_wand": {
      "active": [
        {
          "name": "Energy Charge",
          "desc": "Instantly restores 15 health and mana per charge stored. \n\nMax 20 charges. Gains a charge whenever a visible enemy within 1200 range uses an ability."
        }
      ],
      "id": 36,
      "img": "/apps/dota2/images/items/magic_wand_lg.png?3",
      "dname": "Magic Wand",
      "qual": "common",
      "cost": 450,
      "notes": "Gains charges for spells cast by visible enemies in 1200 range.\nCertain abilities and item abilities will not add charges.",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "3",
          "footer": "All Attributes"
        }
      ],
      "mc": false,
      "cd": 13,
      "lore": "A simple wand used to channel magic energies, it is favored by apprentice wizards and great warlocks alike.",
      "components": [
        "magic_stick",
        "branches",
        "branches"
      ],
      "created": true
    },
    "ghost": {
      "active": [
        {
          "name": "Ghost Form",
          "desc": "You enter ghost form for 4 seconds, becoming immune to physical damage, but are unable to attack and -40% more vulnerable to magic damage."
        }
      ],
      "id": 37,
      "img": "/apps/dota2/images/items/ghost_lg.png?3",
      "dname": "Ghost Scepter",
      "qual": "component",
      "cost": 1500,
      "notes": "Ends if you become Spell Immune, and will have no effect if you are already Spell Immune.\nShares cooldown with Ethereal Blade.",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "5",
          "footer": "All Attributes"
        }
      ],
      "mc": false,
      "cd": 20,
      "lore": "Imbues the wielder with a ghostly presence, allowing them to evade physical damage.",
      "components": null,
      "created": false
    },
    "clarity": {
      "use": [
        {
          "name": "Replenish",
          "desc": "Grants 3 mana regeneration to the target for 50 seconds.\n\nIf the unit is attacked by an enemy hero or Roshan, the effect is lost.\n\nRange: 250"
        }
      ],
      "id": 38,
      "img": "/apps/dota2/images/items/clarity_lg.png?3",
      "dname": "Clarity",
      "qual": "consumable",
      "cost": 50,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "Clear water that enhances the ability to meditate.",
      "components": null,
      "created": false
    },
    "enchanted_mango": {
      "use": [
        {
          "name": "Eat Mango",
          "desc": "Instantly restores 125 mana.\n\nRange: 400"
        }
      ],
      "id": 216,
      "img": "/apps/dota2/images/items/enchanted_mango_lg.png?3",
      "dname": "Enchanted Mango",
      "qual": "consumable",
      "cost": 70,
      "notes": "Hold Control to use on a nearby allied hero.",
      "attrib": [
        {
          "key": "hp_regen",
          "header": "+",
          "value": "0.5",
          "footer": "HP Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "The bittersweet flavors of Jidi Isle are irresistible to amphibians.",
      "components": null,
      "created": false
    },
    "flask": {
      "use": [
        {
          "name": "Salve",
          "desc": "Grants 50 health regeneration to the target for 8 seconds.\n\nIf the unit is attacked by an enemy hero or Roshan, the effect is lost.\n\nRange: 250"
        }
      ],
      "id": 39,
      "img": "/apps/dota2/images/items/flask_lg.png?3",
      "dname": "Healing Salve",
      "qual": "consumable",
      "cost": 110,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "A magical salve that can quickly mend even the deepest of wounds.",
      "components": null,
      "created": false
    },
    "dust": {
      "use": [
        {
          "name": "Reveal",
          "desc": "Reveals and slows invisible heroes by -20% in a 1050 radius around the caster for 12 seconds."
        }
      ],
      "id": 40,
      "img": "/apps/dota2/images/items/dust_lg.png?3",
      "dname": "Dust of Appearance",
      "qual": "consumable",
      "cost": 180,
      "notes": "Places a debuff on enemy units in the area that reveals them when they are invisible.",
      "attrib": [],
      "mc": false,
      "cd": 30,
      "lore": "One may hide visage, but never volume.",
      "components": null,
      "created": false
    },
    "bottle": {
      "active": [
        {
          "name": "Regenerate",
          "desc": "Consumes a charge to restore 100 health and 50 mana over 2.5 seconds. If the hero is attacked by an enemy hero or Roshan, the effect is lost.\n\nThe Bottle automatically refills at the fountain.\n\nHold Control to use on an allied hero.\n\nRange: 350"
        }
      ],
      "passive": [
        {
          "name": "Store Rune",
          "desc": "Runes can be stored in the bottle for later use by right-clicking them. Unused runes will automatically activate after 2 minutes.\n\nUsing a stored rune fully refills the Bottle. Stored Bounty Runes replenish 2/3 charges."
        }
      ],
      "id": 41,
      "img": "/apps/dota2/images/items/bottle_lg.png?3",
      "dname": "Bottle",
      "qual": "common",
      "cost": 650,
      "notes": "Bottle is shareable. Stored runes cannot be shared.\nIf Bottle does not have full charges and is placed on a courier, the courier's movespeed will be slowed by 30%.",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "An old bottle that survived the ages, the contents placed inside become enchanted.",
      "components": null,
      "created": false
    },
    "ward_observer": {
      "use": [
        {
          "name": "Plant",
          "desc": "Plants an Observer Ward, an invisible watcher that gives ground vision in a 1600 radius to your team. Lasts 6 minutes.\n\nHold Control to give one Observer Ward to an allied hero.\n\nRange: 500"
        }
      ],
      "id": 42,
      "img": "/apps/dota2/images/items/ward_observer_lg.png?3",
      "dname": "Observer Ward",
      "qual": "consumable",
      "cost": 75,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": 1,
      "lore": "A form of half-sentient plant, often cultivated by apprentice wizards.",
      "components": null,
      "created": false
    },
    "ward_sentry": {
      "use": [
        {
          "name": "Plant",
          "desc": "Plants a Sentry Ward, an invisible watcher that grants True Sight, the ability to see invisible enemy units and wards, to any existing allied vision within a 850 radius.\nLasts 6 minutes.\n\nDoes not grant ground vision.\nHold Control to give one Sentry Ward to an allied hero.\n\nRange: 500"
        }
      ],
      "id": 43,
      "img": "/apps/dota2/images/items/ward_sentry_lg.png?3",
      "dname": "Sentry Ward",
      "qual": "consumable",
      "cost": 100,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": 1,
      "lore": "A form of plant originally grown in the garden of a fearful king.",
      "components": null,
      "created": false
    },
    "ward_dispenser": {
      "use": [
        {
          "name": "Plant",
          "desc": "Plant the currently active ward.  Double-Click to switch the currently active ward.\n\nRange: 500"
        }
      ],
      "id": 218,
      "img": "/apps/dota2/images/items/ward_dispenser_lg.png?3",
      "dname": "Observer and Sentry Wards",
      "qual": "common",
      "cost": 175,
      "notes": "Hold Control to give one ward to an allied hero.",
      "attrib": [
        {
          "key": "observer_vision_range_tooltip",
          "header": "OBSERVER VISION RANGE:",
          "value": "1600"
        },
        {
          "key": "observer_duration_minutes_tooltip",
          "header": "OBSERVER DURATION (MINUTES):",
          "value": "6"
        },
        {
          "key": "true_sight_range",
          "header": "SENTRY TRUE SIGHT RANGE:",
          "value": "850"
        },
        {
          "key": "sentry_duration_minutes_tooltip",
          "header": "SENTRY DURATION (MINUTES):",
          "value": "6"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Advancements in stacking efficiency have made wards easier to carry than ever.",
      "components": [
        "ward_sentry",
        "ward_observer"
      ],
      "created": true
    },
    "tango": {
      "use": [
        {
          "name": "Devour",
          "desc": "Consumes a target tree to gain 7 health regeneration for 16 seconds. Consuming a ward or Ironwood Tree doubles the heal amount.\n\nComes with 3 charges.  Can be used on an allied hero to give them one Tango.\n\nRange: 165\nWard Range: 450"
        }
      ],
      "id": 44,
      "img": "/apps/dota2/images/items/tango_lg.png?3",
      "dname": "Tango",
      "qual": "consumable",
      "cost": 90,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "Forage to survive on the battlefield.",
      "components": null,
      "created": false
    },
    "tango_single": {
      "use": [
        {
          "name": "Devour",
          "desc": "Consumes a target tree to gain 7 health regeneration for 16 seconds. Consuming a ward or Ironwood Tree doubles the heal amount.\n\nRange: 165\nWard Range: 450"
        }
      ],
      "id": 241,
      "img": "/apps/dota2/images/items/tango_single_lg.png?3",
      "dname": "Tango (Shared)",
      "qual": "consumable",
      "cost": 30,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": 60,
      "lore": "Om nom nom.",
      "components": null,
      "created": false
    },
    "courier": {
      "use": [
        {
          "name": "Deploy Courier",
          "desc": "Deploys a creature to carry items to and from your team's base."
        }
      ],
      "id": 45,
      "img": "/apps/dota2/images/items/courier_lg.png?3",
      "dname": "Animal Courier",
      "qual": "consumable",
      "cost": 50,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "Losing the courier is punishable by death.",
      "components": null,
      "created": false
    },
    "tpscroll": {
      "use": [
        {
          "name": "Teleport",
          "desc": "After channeling for 3 seconds, teleports you to a target friendly building. \n\nDouble-click to teleport to your team's base fountain."
        }
      ],
      "id": 46,
      "img": "/apps/dota2/images/items/tpscroll_lg.png?3",
      "dname": "Town Portal Scroll",
      "qual": "consumable",
      "cost": 50,
      "notes": "If multiple heroes teleport to the same location in succession, the channeling time will be increased for each successive hero.",
      "attrib": [],
      "mc": 75,
      "cd": 80,
      "lore": "What a hero truly needs.",
      "components": null,
      "created": false
    },
    "recipe_travel_boots": {
      "id": 47,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Boots of Travel Recipe",
      "cost": 2000,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "travel_boots": {
      "active": [
        {
          "name": "Teleport",
          "desc": "Teleports you to an allied non-hero unit or structure. Teleporting to a unit is interrupted if the target unit dies.\n\nShares a cooldown with Town Portal Scroll."
        }
      ],
      "hint": [
        "Flat movement speed bonuses from multiple pairs of boots do not stack."
      ],
      "id": 48,
      "img": "/apps/dota2/images/items/travel_boots_lg.png?3",
      "dname": "Boots of Travel",
      "qual": "common",
      "cost": 2500,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_movement_speed",
          "header": "+",
          "value": "100",
          "footer": "Movement Speed"
        }
      ],
      "mc": 75,
      "cd": 45,
      "lore": "Winged boots that grant omnipresence.",
      "components": [
        "boots"
      ],
      "created": true
    },
    "travel_boots_2": {
      "active": [
        {
          "name": "Teleport",
          "desc": "Teleports you to any allied structure or unit, including heroes. Teleporting to a unit is interrupted if the target unit dies.\n\nShares a cooldown with Town Portal Scroll."
        }
      ],
      "hint": [
        "Flat movement speed bonuses from multiple pairs of boots do not stack."
      ],
      "id": 220,
      "img": "/apps/dota2/images/items/travel_boots_2_lg.png?3",
      "dname": "Boots of Travel",
      "qual": "common",
      "cost": 4500,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_movement_speed",
          "header": "+",
          "value": "100",
          "footer": "Movement Speed"
        }
      ],
      "mc": 75,
      "cd": 45,
      "lore": "Winged boots that grant omnipresence.",
      "components": [
        "travel_boots",
        "recipe_travel_boots"
      ],
      "created": true
    },
    "phase_boots": {
      "active": [
        {
          "name": "Phase",
          "desc": "Gives 20% increased movement speed on melee heroes, and 16% on ranged heroes, and lets you move through units and turn more quickly for 3 seconds."
        }
      ],
      "hint": [
        "Flat movement speed bonuses from multiple pairs of boots do not stack."
      ],
      "id": 50,
      "img": "/apps/dota2/images/items/phase_boots_lg.png?3",
      "dname": "Phase Boots",
      "qual": "common",
      "cost": 1360,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_movement_speed",
          "header": "+",
          "value": "50",
          "footer": "Movement Speed"
        },
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "24",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": 8,
      "lore": "Boots that allow the wearer to travel between the ether.",
      "components": [
        "boots",
        "blades_of_attack",
        "blades_of_attack"
      ],
      "created": true
    },
    "demon_edge": {
      "id": 51,
      "img": "/apps/dota2/images/items/demon_edge_lg.png?3",
      "dname": "Demon Edge",
      "qual": "secret_shop",
      "cost": 2200,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "42",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "One of the oldest weapons forged by the Demon-Smith Abzidian, it killed its maker when he tested its edge.",
      "components": null,
      "created": false
    },
    "eagle": {
      "id": 52,
      "img": "/apps/dota2/images/items/eagle_lg.png?3",
      "dname": "Eaglesong",
      "qual": "secret_shop",
      "cost": 3200,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "25",
          "footer": "Agility"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Capturing the majestic call of an eagle, this mystical horn brings limitless dexterity to those who hear it.",
      "components": null,
      "created": false
    },
    "reaver": {
      "id": 53,
      "img": "/apps/dota2/images/items/reaver_lg.png?3",
      "dname": "Reaver",
      "qual": "secret_shop",
      "cost": 3000,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "25",
          "footer": "Strength"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A massive axe capable of tearing whole mountains down.",
      "components": null,
      "created": false
    },
    "relic": {
      "id": 54,
      "img": "/apps/dota2/images/items/relic_lg.png?3",
      "dname": "Sacred Relic",
      "qual": "secret_shop",
      "cost": 3800,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "60",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "An ancient weapon that often turns the tides of war.",
      "components": null,
      "created": false
    },
    "hyperstone": {
      "id": 55,
      "img": "/apps/dota2/images/items/hyperstone_lg.png?3",
      "dname": "Hyperstone",
      "qual": "secret_shop",
      "cost": 2000,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "55",
          "footer": "Attack Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A mystical, carved stone that boosts the fervor of the holder.",
      "components": null,
      "created": false
    },
    "ring_of_health": {
      "id": 56,
      "img": "/apps/dota2/images/items/ring_of_health_lg.png?3",
      "dname": "Ring of Health",
      "qual": "component",
      "cost": 850,
      "notes": "Ring of Health is shareable.",
      "attrib": [
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "5",
          "footer": "HP Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A shiny ring found beneath a fat halfling's corpse.",
      "components": null,
      "created": false
    },
    "void_stone": {
      "id": 57,
      "img": "/apps/dota2/images/items/void_stone_lg.png?3",
      "dname": "Void Stone",
      "qual": "component",
      "cost": 850,
      "notes": "Void Stone is shareable.",
      "attrib": [
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "1",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Jewelry that was once used to channel nether realm magic, this ring pulses with energy.",
      "components": null,
      "created": false
    },
    "mystic_staff": {
      "id": 58,
      "img": "/apps/dota2/images/items/mystic_staff_lg.png?3",
      "dname": "Mystic Staff",
      "qual": "secret_shop",
      "cost": 2700,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "25",
          "footer": "Intelligence"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Enigmatic staff made of only the most expensive crystals.",
      "components": null,
      "created": false
    },
    "energy_booster": {
      "id": 59,
      "img": "/apps/dota2/images/items/energy_booster_lg.png?3",
      "dname": "Energy Booster",
      "qual": "secret_shop",
      "cost": 900,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "250",
          "footer": "Mana"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "This lapis gemstone is commonly added to the collection of wizards seeking to improve their presence in combat.",
      "components": null,
      "created": false
    },
    "point_booster": {
      "id": 60,
      "img": "/apps/dota2/images/items/point_booster_lg.png?3",
      "dname": "Point Booster",
      "qual": "secret_shop",
      "cost": 1200,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "175",
          "footer": "Mana"
        },
        {
          "key": "bonus_health",
          "header": "+",
          "value": "175",
          "footer": "Health"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A perfectly formed amethyst that nourishes body and mind when held.",
      "components": null,
      "created": false
    },
    "vitality_booster": {
      "id": 61,
      "img": "/apps/dota2/images/items/vitality_booster_lg.png?3",
      "dname": "Vitality Booster",
      "qual": "secret_shop",
      "cost": 1100,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_health",
          "header": "+",
          "value": "250",
          "footer": "Health"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A ruby gemstone that has been passed down through generations of warrior kin.",
      "components": null,
      "created": false
    },
    "power_treads": {
      "active": [
        {
          "name": "Switch Attribute",
          "desc": "Switches between +10 Strength, +10 Agility, or +10 Intelligence."
        }
      ],
      "hint": [
        "Flat movement speed bonuses from multiple pairs of boots do not stack."
      ],
      "id": 63,
      "img": "/apps/dota2/images/items/power_treads_lg.png?3",
      "dname": "Power Treads",
      "qual": "common",
      "cost": 1450,
      "notes": "Power Treads can be built using a Belt of Strength, Band of Elvenskin, or a Robe of the Magi.\nThe attack speed bonus from multiple Power Treads does not stack.",
      "attrib": [
        {
          "key": "bonus_movement_speed",
          "header": "+",
          "value": "50",
          "footer": "Movement Speed"
        },
        {
          "key": "bonus_stat",
          "header": "+",
          "value": "10",
          "footer": "Selected Attribute"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "25",
          "footer": "Attack Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A pair of tough-skinned boots that change to meet the demands of the wearer.",
      "components": [
        "boots",
        "gloves",
        "belt_of_strength"
      ],
      "created": true
    },
    "recipe_hand_of_midas": {
      "id": 64,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Hand of Midas Recipe",
      "cost": 1650,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "hand_of_midas": {
      "active": [
        {
          "name": "Transmute",
          "desc": "Kills a non-hero target for 200 gold and 1.85x experience. \n\n Cannot be used on Ancient Creeps.\n\nRange: 600"
        }
      ],
      "id": 65,
      "img": "/apps/dota2/images/items/hand_of_midas_lg.png?3",
      "dname": "Hand of Midas",
      "qual": "common",
      "cost": 2150,
      "notes": "The gold given is reliable gold (you do not get the normal creep bounty).\nExperience gained by using Transmute is not shared.",
      "attrib": [
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "30",
          "footer": "Attack Speed"
        }
      ],
      "mc": false,
      "cd": 90,
      "lore": "Preserved through unknown magical means, the Hand of Midas is a weapon of greed, sacrificing animals to line the owner's pockets.",
      "components": [
        "gloves"
      ],
      "created": true
    },
    "oblivion_staff": {
      "id": 67,
      "img": "/apps/dota2/images/items/oblivion_staff_lg.png?3",
      "dname": "Oblivion Staff",
      "qual": "common",
      "cost": 1650,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "10",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "10",
          "footer": "Attack Speed"
        },
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "10",
          "footer": "Damage"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "0.75",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Deceptively hidden as an ordinary quarterstaff, it is actually very powerful, much like the Eldritch who originally possessed it.",
      "components": [
        "quarterstaff",
        "sobi_mask",
        "robe"
      ],
      "created": true
    },
    "pers": {
      "id": 69,
      "img": "/apps/dota2/images/items/pers_lg.png?3",
      "dname": "Perseverance",
      "qual": "common",
      "cost": 1700,
      "notes": "Perseverance is shareable.",
      "attrib": [
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "5.5",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "1.5",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A gem that grants heart to the bearer.",
      "components": [
        "ring_of_health",
        "void_stone"
      ],
      "created": true
    },
    "poor_mans_shield": {
      "passive": [
        {
          "name": "Damage Block",
          "desc": "When cooldown is ready, blocks 30 damage on melee heroes and 15 on ranged heroes. Only triggers on attacks from heroes. \n\nGives a 50% chance to block 18 damage from incoming attacks on melee heroes, and 9 damage on ranged."
        }
      ],
      "id": 71,
      "img": "/apps/dota2/images/items/poor_mans_shield_lg.png?3",
      "dname": "Poor Man's Shield",
      "qual": "common",
      "cost": 0,
      "notes": "Multiple sources of damage block do not stack.",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "6",
          "footer": "Agility"
        }
      ],
      "mc": false,
      "cd": 25,
      "lore": "A busted old shield that seems to block more than it should.",
      "components": null,
      "created": false
    },
    "recipe_bracer": {
      "id": 72,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Bracer Recipe",
      "cost": 165,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "bracer": {
      "id": 73,
      "img": "/apps/dota2/images/items/bracer_lg.png?3",
      "dname": "Bracer",
      "qual": "common",
      "cost": 465,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "7",
          "footer": "Strength"
        },
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "3",
          "footer": "Agility"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "3",
          "footer": "Intelligence"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "The bracer is a common choice to toughen up defenses and increase longevity.",
      "components": [
        "circlet",
        "gauntlets"
      ],
      "created": true
    },
    "recipe_wraith_band": {
      "id": 74,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Wraith Band Recipe",
      "cost": 165,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "wraith_band": {
      "id": 75,
      "img": "/apps/dota2/images/items/wraith_band_lg.png?3",
      "dname": "Wraith Band",
      "qual": "common",
      "cost": 465,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "3",
          "footer": "Strength"
        },
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "7",
          "footer": "Agility"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "3",
          "footer": "Intelligence"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A circlet with faint whispers echoing about it.",
      "components": [
        "circlet",
        "slippers"
      ],
      "created": true
    },
    "recipe_null_talisman": {
      "id": 76,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Null Talisman Recipe",
      "cost": 165,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "null_talisman": {
      "id": 77,
      "img": "/apps/dota2/images/items/null_talisman_lg.png?3",
      "dname": "Null Talisman",
      "qual": "common",
      "cost": 465,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "3",
          "footer": "Strength"
        },
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "3",
          "footer": "Agility"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "7",
          "footer": "Intelligence"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A small gemstone attached to several chains.",
      "components": [
        "circlet",
        "mantle"
      ],
      "created": true
    },
    "recipe_mekansm": {
      "id": 78,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Mekansm Recipe",
      "cost": 900,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "mekansm": {
      "active": [
        {
          "name": "Restore",
          "desc": "Heals 250 health and gives +2 armor to allied units in a 900 radius."
        }
      ],
      "passive": [
        {
          "name": "Mekansm Aura",
          "desc": "Grants 3.5 health regeneration to allied units in a 900 radius."
        }
      ],
      "id": 79,
      "img": "/apps/dota2/images/items/mekansm_lg.png?3",
      "dname": "Mekansm",
      "qual": "rare",
      "cost": 2350,
      "notes": "Restore does not affect units that have been affected by Restore in the last 25 seconds.\nMultiple instances of Mekansm Aura do not stack.",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "5",
          "footer": "All Attributes"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "5",
          "footer": "Armor"
        }
      ],
      "mc": 225,
      "cd": 65,
      "lore": "A glowing jewel formed out of assorted parts that somehow fit together perfectly.",
      "components": [
        "headdress",
        "buckler"
      ],
      "created": true
    },
    "vladmir": {
      "passive": [
        {
          "name": "Vladmir's Aura",
          "desc": "Grants lifesteal (15% for melee heroes, 10% for ranged), 2.5 health regeneration, 1 mana regeneration, 15% bonus attack damage, and 4 armor to nearby allies. \n\nRadius: 900"
        }
      ],
      "id": 81,
      "img": "/apps/dota2/images/items/vladmir_lg.png?3",
      "dname": "Vladmir's Offering",
      "qual": "rare",
      "cost": 2250,
      "notes": "Multiple instances of Vladmir's Aura do not stack.",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "2",
          "footer": "All Attributes"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "An eerie mask that is haunted with the malice of a fallen vampire.",
      "components": [
        "headdress",
        "ring_of_basilius",
        "lifesteal"
      ],
      "created": true
    },
    "recipe_buckler": {
      "id": 85,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Buckler Recipe",
      "cost": 200,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "buckler": {
      "active": [
        {
          "name": "Armor Bonus",
          "desc": "Gives +2 armor to all allied units.  Lasts 25 seconds on heroes, 30 seconds on units.\n\nRadius: 900"
        }
      ],
      "id": 86,
      "img": "/apps/dota2/images/items/buckler_lg.png?3",
      "dname": "Buckler",
      "qual": "rare",
      "cost": 800,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "5",
          "footer": "Armor"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "2",
          "footer": "All Attributes"
        }
      ],
      "mc": 10,
      "cd": 25,
      "lore": "A powerful shield that imbues the bearer with the strength of heroes past, it is capable of protecting entire armies in battle.",
      "components": [
        "chainmail",
        "branches"
      ],
      "created": true
    },
    "ring_of_basilius": {
      "passive": [
        {
          "name": "Basilius Aura",
          "desc": "Grants 0.5 mana regeneration and 2 armor in a 900 radius."
        }
      ],
      "toggle": [
        {
          "name": "Aura",
          "desc": "Deactivate aura to stop affecting non-hero units."
        }
      ],
      "id": 88,
      "img": "/apps/dota2/images/items/ring_of_basilius_lg.png?3",
      "dname": "Ring of Basilius",
      "qual": "rare",
      "cost": 500,
      "notes": "Does not stack with armor auras from Ring of Basilius or Ring of Aquila.\nMultiple instances of Basilius Aura do not stack.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "7",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Ring given as a reward to the greatest mages.",
      "components": [
        "sobi_mask",
        "ring_of_protection"
      ],
      "created": true
    },
    "recipe_pipe": {
      "id": 89,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Pipe of Insight Recipe",
      "cost": 800,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "pipe": {
      "active": [
        {
          "name": "Barrier",
          "desc": "Gives a shield that blocks 400 magic damage to all nearby allies. Lasts 12 seconds.\n\nRadius: 900"
        }
      ],
      "passive": [
        {
          "name": "Insight Aura",
          "desc": "Gives allied units 2 health regeneration and 10% magic resistance.\n\nRadius: 900"
        }
      ],
      "id": 90,
      "img": "/apps/dota2/images/items/pipe_lg.png?3",
      "dname": "Pipe of Insight",
      "qual": "rare",
      "cost": 3150,
      "notes": "Multiple instances of Barrier do not stack.\nStacks multiplicatively with other sources of magic resistance.",
      "attrib": [
        {
          "key": "health_regen",
          "header": "+",
          "value": "6.5",
          "footer": "HP Regeneration"
        },
        {
          "key": "magic_resistance",
          "header": "+",
          "value": "30%",
          "footer": "Magic Resistance"
        }
      ],
      "mc": 100,
      "cd": 60,
      "lore": "A powerful artifact of mysterious origin, it creates barriers against magical forces.",
      "components": [
        "hood_of_defiance",
        "headdress"
      ],
      "created": true
    },
    "recipe_urn_of_shadows": {
      "id": 91,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Urn of Shadows Recipe",
      "cost": 310,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "urn_of_shadows": {
      "active": [
        {
          "name": "Soul Release",
          "desc": "Provides 35 health regeneration when cast on allies, and deals 25 damage per second when cast on enemies. \n\nLasts 8 seconds.  \n\nGains charges every time an enemy hero dies within 1400 units.  Only the closest Urn to the dying hero will gain a charge.\n\nCast Range: 950"
        }
      ],
      "id": 92,
      "img": "/apps/dota2/images/items/urn_of_shadows_lg.png?3",
      "dname": "Urn of Shadows",
      "qual": "rare",
      "cost": 875,
      "notes": "Empty urns gain 2 charges.\nIf used on a hero with Soul Release already active on them, it will refresh its duration.",
      "attrib": [
        {
          "key": "mana_regen",
          "header": "+",
          "value": "1",
          "footer": "Mana Regeneration"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "2",
          "footer": "All Attributes"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "2",
          "footer": "Armor"
        }
      ],
      "mc": false,
      "cd": 7,
      "lore": "Contains the ashes of powerful demons.",
      "components": [
        "infused_raindrop",
        "circlet",
        "ring_of_protection"
      ],
      "created": true
    },
    "recipe_headdress": {
      "id": 93,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Headdress Recipe",
      "cost": 300,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "headdress": {
      "passive": [
        {
          "name": "Regeneration Aura",
          "desc": "Grants 2 health regeneration to allies.\n\nRadius: 900"
        }
      ],
      "id": 94,
      "img": "/apps/dota2/images/items/headdress_lg.png?3",
      "dname": "Headdress",
      "qual": "rare",
      "cost": 650,
      "notes": "Multiple instances of Regeneration Aura do not stack.",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "2",
          "footer": "All Attributes"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Creates a soothing aura that restores allies in battle.",
      "components": [
        "ring_of_regen",
        "branches"
      ],
      "created": true
    },
    "sheepstick": {
      "active": [
        {
          "name": "Hex",
          "desc": "Turns a target unit into a harmless critter for 3.5 seconds. The target has a base movement speed of 140 and will be silenced, muted, and disarmed.\nInstantly destroys illusions.\n\nRange: 800"
        }
      ],
      "id": 96,
      "img": "/apps/dota2/images/items/sheepstick_lg.png?3",
      "dname": "Scythe of Vyse",
      "qual": "rare",
      "cost": 5700,
      "notes": "The target will have a base movement speed of 140, but buffs granting maximum movement speed won't be disabled.",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "10",
          "footer": "Strength"
        },
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "10",
          "footer": "Agility"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "35",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "2.25",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": 100,
      "cd": 22,
      "lore": "The most guarded relic among the cult of Vyse, it is the most coveted weapon among magi.",
      "components": [
        "mystic_staff",
        "ultimate_orb",
        "void_stone"
      ],
      "created": true
    },
    "recipe_orchid": {
      "id": 97,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Orchid Malevolence Recipe",
      "cost": 775,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "orchid": {
      "active": [
        {
          "name": "Soul Burn",
          "desc": "Silences the target unit for 5 seconds. At the end of the silence, 30% of the damage received while silenced is inflicted as bonus magical damage.\n\nRange: 900"
        }
      ],
      "id": 98,
      "img": "/apps/dota2/images/items/orchid_lg.png?3",
      "dname": "Orchid Malevolence",
      "qual": "rare",
      "cost": 4075,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "25",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "30",
          "footer": "Attack Speed"
        },
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "30",
          "footer": "Damage"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "2.25",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": 100,
      "cd": 18,
      "lore": "A garnet rod constructed from the essence of a fire demon.",
      "components": [
        "oblivion_staff",
        "oblivion_staff"
      ],
      "created": true
    },
    "recipe_bloodthorn": {
      "id": 245,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Bloodthorn Recipe",
      "cost": 1000,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "bloodthorn": {
      "active": [
        {
          "name": "Soul Rend",
          "desc": "Silences a target for 5 seconds. At the end of the silence, an additional 30% of all damage taken during the silence will be dealt to the target as magical damage.\n\nAll attacks on the silenced target will have True Strike and 100% chance to crit for 140% damage.\n\nRange: 900"
        }
      ],
      "passive": [
        {
          "name": "Critical Strike",
          "desc": "Grants a 20% chance for attacks to inflict 175% damage."
        }
      ],
      "id": 250,
      "img": "/apps/dota2/images/items/bloodthorn_lg.png?3",
      "dname": "Bloodthorn",
      "qual": "epic",
      "cost": 7205,
      "notes": "Critical Strike does not work against buildings.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "25",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "30",
          "footer": "Attack Speed"
        },
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "60",
          "footer": "Damage"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "2.25",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": 100,
      "cd": 18,
      "lore": "A reviled blade that bites deeper with each wriggle of its victim's final throes.",
      "components": [
        "orchid",
        "lesser_crit"
      ],
      "created": true
    },
    "echo_sabre": {
      "passive": [
        {
          "name": "Echo Strike",
          "desc": "Causes melee attacks to attack twice in quick succession. The double attacks apply a 100% movement slow for 0.8 seconds on each strike."
        }
      ],
      "id": 252,
      "img": "/apps/dota2/images/items/echo_sabre_lg.png?3",
      "dname": "Echo Sabre",
      "qual": "artifact",
      "cost": 2650,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "10",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "12",
          "footer": "Strength"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "10",
          "footer": "Attack Speed"
        },
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "12",
          "footer": "Damage"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "0.75",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": 5,
      "lore": "A deceptively swift blade imbued with resonant magic.",
      "components": [
        "ogre_axe",
        "oblivion_staff"
      ],
      "created": true
    },
    "recipe_cyclone": {
      "id": 99,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Eul's Scepter Recipe",
      "cost": 650,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "cyclone": {
      "active": [
        {
          "name": "Cyclone",
          "desc": "Sweeps a target unit up into a cyclone, making them invulnerable for 2.5 seconds. Cyclone can only be cast on enemy units or yourself.\n\nEnemy units take 50 magical damage upon landing.\n\nRange: 575\nDispel Type: Basic Dispel"
        }
      ],
      "id": 100,
      "img": "/apps/dota2/images/items/cyclone_lg.png?3",
      "dname": "Eul's Scepter of Divinity",
      "qual": "rare",
      "cost": 2750,
      "notes": "You cannot cyclone allies.\nCyclones cast on yourself go through spell immunity.\nCyclone can purge some buffs and debuffs.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "10",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "2.25",
          "footer": "Mana Regeneration"
        },
        {
          "key": "bonus_movement_speed",
          "header": "+",
          "value": "30",
          "footer": "Movement Speed"
        }
      ],
      "mc": 175,
      "cd": 23,
      "lore": "A mysterious scepter passed down through the ages, its disruptive winds can be used for good or evil.",
      "components": [
        "staff_of_wizardry",
        "void_stone",
        "wind_lace"
      ],
      "created": true
    },
    "recipe_aether_lens": {
      "id": 233,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Aether Lens Recipe",
      "cost": 600,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "aether_lens": {
      "passive": [
        {
          "name": "Aethereal Focus",
          "desc": "Increases targeted spell and item cast range by 250."
        }
      ],
      "id": 232,
      "img": "/apps/dota2/images/items/aether_lens_lg.png?3",
      "dname": "Aether Lens",
      "qual": "rare",
      "cost": 2350,
      "notes": "Passive does not stack.",
      "attrib": [
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "450",
          "footer": "Mana"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "1.25",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Polished with the incantation of his final breath, the gift of a dying mage to his sickly son.",
      "components": [
        "energy_booster",
        "void_stone"
      ],
      "created": true
    },
    "recipe_force_staff": {
      "id": 101,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Force Staff Recipe",
      "cost": 950,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "force_staff": {
      "active": [
        {
          "name": "Force",
          "desc": "Pushes any target unit 600 units in the direction it is facing.\n\nRange: 750"
        }
      ],
      "id": 102,
      "img": "/apps/dota2/images/items/force_staff_lg.png?3",
      "dname": "Force Staff",
      "qual": "rare",
      "cost": 2250,
      "notes": "Self-cast will cause you to use Force on yourself.\nForce Staff doesn't interrupt the target's actions.\nWill not work on a unit inside Chronosphere, Duel, or Black Hole.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "10",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "2",
          "footer": "HP Regeneration"
        }
      ],
      "mc": 100,
      "cd": 23,
      "lore": "Allows you to manipulate others, for good or evil.",
      "components": [
        "staff_of_wizardry",
        "ring_of_regen"
      ],
      "created": true
    },
    "hurricane_pike": {
      "active": [
        {
          "name": "Hurricane Thrust",
          "desc": "Pushes you and target enemy 450 units away from each other, and for 5 seconds, allows you to make 4 attacks against the target without range restrictions and with +100 attack speed.\n\nWorks like Force Staff when used on self or allies.\n\nAllied Range: 800\nEnemy Range: 400"
        }
      ],
      "passive": [
        {
          "name": "Dragon's Reach",
          "desc": "Increases attack range of ranged heroes by 140."
        }
      ],
      "id": 263,
      "img": "/apps/dota2/images/items/hurricane_pike_lg.png?3",
      "dname": "Hurricane Pike",
      "qual": "epic",
      "cost": 4615,
      "notes": "Self-cast will use Hurricane Pike on yourself.\nHurricane Pike doesn't interrupt the target's actions.\nWill not work on a unit inside Chronosphere, Duel, or Black Hole.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "13",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "2",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "20",
          "footer": "Agility"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "15",
          "footer": "Strength"
        }
      ],
      "mc": 100,
      "cd": 23,
      "lore": "A legendary pike once held as royal sigil of the ancient wyvern riders.",
      "components": [
        "wraith_band",
        "force_staff",
        "dragon_lance"
      ],
      "created": true
    },
    "recipe_dagon": {
      "id": 103,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Dagon Recipe",
      "cost": 1250,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "dagon": {
      "active": [
        {
          "name": "Energy Burst",
          "desc": "Emits a powerful burst of magical damage upon a targeted enemy unit. Upgradable.\n\nDamage: 400,500,600,700,800\nRange: 600,650,700,750,800\nMana Cost: 120"
        }
      ],
      "id": 104,
      "img": "/apps/dota2/images/items/dagon_lg.png?3",
      "dname": "Dagon",
      "qual": "rare",
      "cost": 2715,
      "notes": "Instantly kills illusions.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": [
            "15",
            "18",
            "21",
            "24",
            "27"
          ],
          "footer": "Intelligence"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "3",
          "footer": "All Attributes"
        }
      ],
      "mc": 120,
      "cd": 35,
      "lore": "A lesser wand that grows in power the longer it is used, it brings magic to the fingertips of the user.",
      "components": [
        "staff_of_wizardry",
        "null_talisman"
      ],
      "created": true
    },
    "dagon_2": {
      "active": [
        {
          "name": "Energy Burst",
          "desc": "Emits a powerful burst of magical damage upon a targeted enemy unit. Upgradable.\n\nDamage: 400,500,600,700,800\nRange: 600,650,700,750,800\nMana Cost: 140"
        }
      ],
      "id": 201,
      "img": "/apps/dota2/images/items/dagon_2_lg.png?3",
      "dname": "Dagon",
      "qual": "rare",
      "cost": 3965,
      "notes": "Instantly kills illusions.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": [
            "15",
            "18",
            "21",
            "24",
            "27"
          ],
          "footer": "Intelligence"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "3",
          "footer": "All Attributes"
        }
      ],
      "mc": 120,
      "cd": 35,
      "lore": "A lesser wand that grows in power the longer it is used, it brings magic to the fingertips of the user.",
      "components": [
        "dagon",
        "recipe_dagon"
      ],
      "created": true
    },
    "dagon_3": {
      "active": [
        {
          "name": "Energy Burst",
          "desc": "Emits a powerful burst of magical damage upon a targeted enemy unit. Upgradable.\n\nDamage: 400,500,600,700,800\nRange: 600,650,700,750,800\nMana Cost: 160"
        }
      ],
      "id": 202,
      "img": "/apps/dota2/images/items/dagon_3_lg.png?3",
      "dname": "Dagon",
      "qual": "rare",
      "cost": 5215,
      "notes": "Instantly kills illusions.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": [
            "15",
            "18",
            "21",
            "24",
            "27"
          ],
          "footer": "Intelligence"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "3",
          "footer": "All Attributes"
        }
      ],
      "mc": 120,
      "cd": 35,
      "lore": "A lesser wand that grows in power the longer it is used, it brings magic to the fingertips of the user.",
      "components": [
        "dagon_2",
        "recipe_dagon"
      ],
      "created": true
    },
    "dagon_4": {
      "active": [
        {
          "name": "Energy Burst",
          "desc": "Emits a powerful burst of magical damage upon a targeted enemy unit. Upgradable.\n\nDamage: 400,500,600,700,800\nRange: 600,650,700,750,800\nMana Cost: 180"
        }
      ],
      "id": 203,
      "img": "/apps/dota2/images/items/dagon_4_lg.png?3",
      "dname": "Dagon",
      "qual": "rare",
      "cost": 6465,
      "notes": "Instantly kills illusions.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": [
            "15",
            "18",
            "21",
            "24",
            "27"
          ],
          "footer": "Intelligence"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "3",
          "footer": "All Attributes"
        }
      ],
      "mc": 120,
      "cd": 35,
      "lore": "A lesser wand that grows in power the longer it is used, it brings magic to the fingertips of the user.",
      "components": [
        "dagon_3",
        "recipe_dagon"
      ],
      "created": true
    },
    "dagon_5": {
      "active": [
        {
          "name": "Energy Burst",
          "desc": "Emits a powerful burst of magical damage upon a targeted enemy unit.\n\nDamage: 400,500,600,700,800\nRange: 600,650,700,750,800\nMana Cost: 200"
        }
      ],
      "id": 204,
      "img": "/apps/dota2/images/items/dagon_5_lg.png?3",
      "dname": "Dagon",
      "qual": "rare",
      "cost": 7715,
      "notes": "Instantly kills illusions.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": [
            "15",
            "18",
            "21",
            "24",
            "27"
          ],
          "footer": "Intelligence"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "3",
          "footer": "All Attributes"
        }
      ],
      "mc": 120,
      "cd": 35,
      "lore": "A lesser wand that grows in power the longer it is used, it brings magic to the fingertips of the user.",
      "components": [
        "dagon_4",
        "recipe_dagon"
      ],
      "created": true
    },
    "recipe_necronomicon": {
      "id": 105,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Necronomicon Recipe",
      "cost": 1300,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "necronomicon": {
      "active": [
        {
          "name": "Demonic Summoning",
          "desc": "Summons a Warrior and an Archer to fight for you for 60 seconds.\n\n<h1>Warrior:</h1>Burns mana every hit, and deals magical damage to whoever kills it.  Gains True Sight at level 3.\nHealth: 700,800,900\nDamage: 75,100,125\nMana Break Damage: 30,40,50\nLast Will Damage: 550,675,800\n\n<h1>Archer:</h1>Has a passive movement and attack speed aura. Gains Purge at Level 3.\nHealth: 700,800,900\nDamage: 60,90,120\nAura Move Speed: 5,7,9\nAura Attack Speed: 5,7,9\nAura Radius: 900"
        }
      ],
      "id": 106,
      "img": "/apps/dota2/images/items/necronomicon_lg.png?3",
      "dname": "Necronomicon",
      "qual": "rare",
      "cost": 2400,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": [
            "10",
            "15",
            "20"
          ],
          "footer": "Strength"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": [
            "1",
            "1.25",
            "1.5"
          ],
          "footer": "Mana Regeneration"
        }
      ],
      "mc": 50,
      "cd": 90,
      "lore": "Considered the ultimate in necromancy and demonology, a powerful malefic force is locked within its pages.",
      "components": [
        "sobi_mask",
        "sobi_mask",
        "belt_of_strength"
      ],
      "created": true
    },
    "necronomicon_2": {
      "active": [
        {
          "name": "Demonic Summoning",
          "desc": "Summons a Warrior and an Archer to fight for you for 60 seconds.\n\n<h1>Warrior:</h1>Burns mana every hit, and deals magical damage to whoever kills it.  Gains True Sight at level 3.\nHealth: 700,800,900\nDamage: 75,100,125\nMana Break Damage: 30,40,50\nLast Will Damage: 550,675,800\n\n<h1>Archer:</h1>Has a passive movement and attack speed aura. Gains Purge at Level 3.\nHealth: 700,800,900\nDamage: 60,90,120\nAura Move Speed: 5,7,9\nAura Attack Speed: 5,10,15\nAura Radius: 900"
        }
      ],
      "id": 193,
      "img": "/apps/dota2/images/items/necronomicon_2_lg.png?3",
      "dname": "Necronomicon",
      "qual": "rare",
      "cost": 3700,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": [
            "10",
            "15",
            "20"
          ],
          "footer": "Strength"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": [
            "1",
            "1.25",
            "1.5"
          ],
          "footer": "Mana Regeneration"
        }
      ],
      "mc": 50,
      "cd": 90,
      "lore": "Considered the ultimate in necromancy and demonology, a powerful malefic force is locked within its pages.",
      "components": [
        "necronomicon",
        "recipe_necronomicon"
      ],
      "created": true
    },
    "necronomicon_3": {
      "active": [
        {
          "name": "Demonic Summoning",
          "desc": "Summons a Warrior and an Archer to fight for you for 60 seconds.\n\n<h1>Warrior:</h1>Burns mana every hit, and deals magical damage to whoever kills it.  Gains True Sight at level 3.\nHealth: 700,800,900\nDamage: 75,100,125\nMana Break Damage: 30,40,50\nLast Will Damage: 550,675,800\n\n<h1>Archer:</h1>Has a passive movement and attack speed aura. Gains Purge at Level 3.\nHealth: 700,800,900\nDamage: 60,90,120\nAura Move Speed: 5,7,9\nAura Attack Speed: 5,10,15\nAura Radius: 900"
        }
      ],
      "id": 194,
      "img": "/apps/dota2/images/items/necronomicon_3_lg.png?3",
      "dname": "Necronomicon",
      "qual": "rare",
      "cost": 5000,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": [
            "10",
            "15",
            "20"
          ],
          "footer": "Strength"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": [
            "1",
            "1.25",
            "1.5"
          ],
          "footer": "Mana Regeneration"
        }
      ],
      "mc": 50,
      "cd": 90,
      "lore": "Considered the ultimate in necromancy and demonology, a powerful malefic force is locked within its pages.",
      "components": [
        "necronomicon_2",
        "recipe_necronomicon"
      ],
      "created": true
    },
    "ultimate_scepter": {
      "passive": [
        {
          "name": "Ultimate Upgrade",
          "desc": "Upgrades the ultimate, and some abilities, of certain heroes."
        }
      ],
      "id": 108,
      "img": "/apps/dota2/images/items/ultimate_scepter_lg.png?3",
      "dname": "Aghanim's Scepter",
      "qual": "rare",
      "cost": 4200,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "10",
          "footer": "All Attributes"
        },
        {
          "key": "bonus_health",
          "header": "+",
          "value": "175",
          "footer": "Health"
        },
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "175",
          "footer": "Mana"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "The scepter of a wizard with demigod-like powers.",
      "components": [
        "point_booster",
        "staff_of_wizardry",
        "ogre_axe",
        "blade_of_alacrity"
      ],
      "created": true
    },
    "recipe_refresher": {
      "id": 109,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Refresher Orb Recipe",
      "cost": 1700,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "refresher": {
      "active": [
        {
          "name": "Reset Cooldowns",
          "desc": "Resets the cooldowns of all your items and abilities."
        }
      ],
      "id": 110,
      "img": "/apps/dota2/images/items/refresher_lg.png?3",
      "dname": "Refresher Orb",
      "qual": "rare",
      "cost": 5100,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "11",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "5",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": 375,
      "cd": 195,
      "lore": "A powerful artifact created for wizards.",
      "components": [
        "pers",
        "pers"
      ],
      "created": true
    },
    "recipe_assault": {
      "id": 111,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Assault Cuirass Recipe",
      "cost": 1300,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "assault": {
      "passive": [
        {
          "name": "Assault Aura",
          "desc": "Grants 25 attack speed and 5 armor to nearby allied units and structures, and decreases nearby enemy unit and structure armor by -5.\n\nRadius: 900"
        }
      ],
      "id": 112,
      "img": "/apps/dota2/images/items/assault_lg.png?3",
      "dname": "Assault Cuirass",
      "qual": "epic",
      "cost": 5250,
      "notes": "Multiple instances of Assault Aura do not stack.",
      "attrib": [
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "30",
          "footer": "Attack Speed"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "10",
          "footer": "Armor"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Forged in the depths of the nether reaches, this hellish mail provides an army with increased armor and attack speed.",
      "components": [
        "platemail",
        "hyperstone",
        "chainmail"
      ],
      "created": true
    },
    "heart": {
      "passive": [
        {
          "name": "Health Regeneration",
          "desc": "Restores 7% of max health per second. \n\nIf damage is taken from an enemy hero or Roshan, this ability is disabled for 5 seconds for melee heroes, or 7 seconds for ranged heroes."
        }
      ],
      "id": 114,
      "img": "/apps/dota2/images/items/heart_lg.png?3",
      "dname": "Heart of Tarrasque",
      "qual": "epic",
      "cost": 5200,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "45",
          "footer": "Strength"
        },
        {
          "key": "bonus_health",
          "header": "+",
          "value": "500",
          "footer": "Health"
        }
      ],
      "mc": false,
      "cd": 7,
      "lore": "Preserved heart of an extinct monster, it bolsters the bearer's fortitude.",
      "components": [
        "reaver",
        "vitality_booster",
        "vitality_booster"
      ],
      "created": true
    },
    "recipe_black_king_bar": {
      "id": 115,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Black King Bar Recipe",
      "cost": 1375,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "black_king_bar": {
      "active": [
        {
          "name": "Avatar",
          "desc": "Grants Spell Immunity and 100% Magic Damage Resistance.  Duration decreases with each use. \n\nDuration: 10,9,8,7,6,5 \nDispel Type: Basic Dispel"
        }
      ],
      "id": 116,
      "img": "/apps/dota2/images/items/black_king_bar_lg.png?3",
      "dname": "Black King Bar",
      "qual": "epic",
      "cost": 3975,
      "notes": "Purchasing another Black King Bar will not reset its immunity duration.\nUsing Black King Bar may remove some positive buffs.",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "10",
          "footer": "Strength"
        },
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "24",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": 70,
      "lore": "A powerful staff imbued with the strength of giants.",
      "components": [
        "ogre_axe",
        "mithril_hammer"
      ],
      "created": true
    },
    "aegis": {
      "passive": [
        {
          "name": "Reincarnation",
          "desc": "Brings you to life with full health and mana 5 seconds after you die, at the location where you died. \n\nReincarnation must be used within 5 minutes or Aegis of the Immortal disappears. If it expires, it will heal you over 5 seconds (dispels on damage)."
        }
      ],
      "id": 117,
      "img": "/apps/dota2/images/items/aegis_lg.png?3",
      "dname": "Aegis of the Immortal",
      "qual": "artifact",
      "cost": 0,
      "notes": "Pronounced as ayy jis.",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "The Immortal was said to own a shield that protected him from death itself.",
      "components": null,
      "created": false
    },
    "recipe_shivas_guard": {
      "id": 118,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Shiva's Guard Recipe",
      "cost": 650,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "shivas_guard": {
      "active": [
        {
          "name": "Arctic Blast",
          "desc": "Emits a freezing wave that deals 200 magical damage to enemies and slows their movement by -40% for 4 seconds.\n\nRadius: 900"
        }
      ],
      "passive": [
        {
          "name": "Freezing Aura",
          "desc": "Reduces the attack speed of all enemies by -45. \n\nRadius: 900"
        }
      ],
      "id": 119,
      "img": "/apps/dota2/images/items/shivas_guard_lg.png?3",
      "dname": "Shiva's Guard",
      "qual": "epic",
      "cost": 4750,
      "notes": "The wave extends at a speed of 350 to a max size of 900.\nThe Arctic Blast follows its caster.\nMultiple instances of Freezing Aura do not stack.",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "30",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "15",
          "footer": "Armor"
        }
      ],
      "mc": 100,
      "cd": 30,
      "lore": "Said to have belonged to a goddess, today it retains much of its former power.",
      "components": [
        "platemail",
        "mystic_staff"
      ],
      "created": true
    },
    "bloodstone": {
      "active": [
        {
          "name": "Pocket Deny",
          "desc": "Instantly causes you to die.\n\nMust ground target to cast.  Cannot self cast."
        }
      ],
      "passive": [
        {
          "name": "Bloodpact",
          "desc": "Begins with 14 charges, and gains a charge each time an enemy hero dies within 1600 range. \n\nEach charge grants 0.35 mana regeneration per second, and reduces respawn time by 3 seconds. \n\nIf the bearer dies, the Bloodstone loses a third of its charges."
        }
      ],
      "id": 121,
      "img": "/apps/dota2/images/items/bloodstone_lg.png?3",
      "dname": "Bloodstone",
      "qual": "epic",
      "cost": 4900,
      "notes": "Only the first Bloodstone will gain charges.",
      "attrib": [
        {
          "key": "bonus_health",
          "header": "+",
          "value": "475",
          "footer": "Health"
        },
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "425",
          "footer": "Mana"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "7",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "2",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": 300,
      "lore": "The Bloodstone's bright ruby color is unmistakable on the battlefield, as the owner seems to have infinite vitality and spirit.",
      "components": [
        "pers",
        "soul_booster"
      ],
      "created": true
    },
    "recipe_sphere": {
      "id": 122,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Linken's Sphere Recipe",
      "cost": 1200,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "sphere": {
      "passive": [
        {
          "name": "Spellblock",
          "desc": "Blocks most targeted spells once every 13 seconds."
        }
      ],
      "active": [
        {
          "name": "Transfer Spellblock",
          "desc": "Temporarily removes Spellblock from the item's owner and transfers it to an allied unit for 13 seconds.\n\nRange: 700"
        }
      ],
      "id": 123,
      "img": "/apps/dota2/images/items/sphere_lg.png?3",
      "dname": "Linken's Sphere",
      "qual": "epic",
      "cost": 5050,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "13",
          "footer": "All Attributes"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "5.5",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "2.25",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": 13,
      "lore": "This magical sphere once protected one of the most famous heroes in history.",
      "components": [
        "ultimate_orb",
        "pers"
      ],
      "created": true
    },
    "lotus_orb": {
      "active": [
        {
          "name": "Echo Shell",
          "desc": "Applies a shield to the target unit for 6 seconds which re-casts most targeted spells back to their caster.\n\nThe shielded unit will still take damage from the spell. \n\nRange: 900\nDispel Type: Basic Dispel"
        }
      ],
      "id": 226,
      "img": "/apps/dota2/images/items/lotus_orb_lg.png?3",
      "dname": "Lotus Orb",
      "qual": "epic",
      "cost": 4000,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "10",
          "footer": "Armor"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "5.5",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "1.75",
          "footer": "Mana Regeneration"
        },
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "250",
          "footer": "Mana"
        }
      ],
      "mc": 75,
      "cd": 15,
      "lore": "The jewel at its center still reflects a pale image of its creator.",
      "components": [
        "pers",
        "platemail",
        "energy_booster"
      ],
      "created": true
    },
    "meteor_hammer": {
      "active": [
        {
          "name": "Meteor Hammer",
          "desc": "CHANNELED - After a successful channel, summons a meteor that strikes a 300 AoE, stunning enemies for 2 seconds and dealing impact damage. Continues to deal damage over time to enemies units and buildings for 6 seconds.\n\nBuilding Impact Damage: 75 \nBuilding Over Time Damage: 50 \n\nNon-Building Impact Damage: 150 \nNon-Building Over Time Damage: 90 \n\nChannel Duration: 2.5 seconds.\nLanding Time: 0.5 seconds."
        }
      ],
      "id": 223,
      "img": "/apps/dota2/images/items/meteor_hammer_lg.png?3",
      "dname": "Meteor Hammer",
      "qual": "epic",
      "cost": 2625,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "12",
          "footer": "Strength"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "12",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "4",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "1.5",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": 125,
      "cd": 28,
      "lore": "",
      "components": [
        "ogre_axe",
        "staff_of_wizardry",
        "ring_of_regen",
        "sobi_mask"
      ],
      "created": true
    },
    "nullifier": {
      "active": [
        {
          "name": "Nullify",
          "desc": "Dispels the target and mutes them for 5 seconds. Anytime the muted target is attacked, it will be slowed by 100% for 0.4 seconds.\n\nDispel Type: Basic Dispel"
        }
      ],
      "id": 225,
      "img": "/apps/dota2/images/items/nullifier_lg.png?3",
      "dname": "Nullifier",
      "qual": "epic",
      "cost": 4700,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "65",
          "footer": "Damage"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "5",
          "footer": "Armor"
        },
        {
          "key": "bonus_regen",
          "header": "+",
          "value": "5",
          "footer": "HP Regeneration"
        }
      ],
      "mc": 75,
      "cd": 13,
      "lore": "",
      "components": [
        "relic",
        "helm_of_iron_will"
      ],
      "created": true
    },
    "recipe_aeon_disk": {
      "id": 255,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Aeon Disk Recipe",
      "cost": 1350,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "aeon_disk": {
      "passive": [
        {
          "name": "Combo Breaker",
          "desc": "When you take damage and your health falls below 70%, a strong dispel is applied and you gain a 2.5 second buff that causes all damage you deal and are dealt to be reduced to zero. Only triggers on player based damage."
        }
      ],
      "id": 256,
      "img": "/apps/dota2/images/items/aeon_disk_lg.png?3",
      "dname": "Aeon Disk",
      "qual": "epic",
      "cost": 3350,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_health",
          "header": "+",
          "value": "250",
          "footer": "Health"
        },
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "250",
          "footer": "Mana"
        },
        {
          "key": "status_resistance",
          "header": "+Status Resistance",
          "value": "25%"
        }
      ],
      "mc": false,
      "cd": 115,
      "lore": "",
      "components": [
        "vitality_booster",
        "energy_booster"
      ],
      "created": true
    },
    "recipe_kaya": {
      "id": 258,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "cost": 500,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "kaya": {
      "id": 259,
      "img": "/apps/dota2/images/items/kaya_lg.png?3",
      "dname": "Kaya",
      "qual": "epic",
      "cost": 1950,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "16",
          "footer": "Intelligence"
        },
        {
          "key": "spell_amp",
          "header": "+Spell Amplification",
          "value": "10%"
        },
        {
          "key": "manacost_reduction",
          "header": "+Manacost and Manaloss Reduction",
          "value": "10%"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": [
        "staff_of_wizardry",
        "robe"
      ],
      "created": true
    },
    "trident": {
      "id": 275,
      "img": "/apps/dota2/images/items/trident_lg.png?3",
      "cost": null,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "combo_breaker": {
      "id": 276,
      "img": "/apps/dota2/images/items/combo_breaker_lg.png?3",
      "cost": null,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "refresher_shard": {
      "use": [
        {
          "name": "Reset Cooldowns",
          "desc": "Resets the cooldowns of all your items and abilities."
        }
      ],
      "id": 260,
      "img": "/apps/dota2/images/items/refresher_shard_lg.png?3",
      "dname": "Refresher Shard",
      "qual": "consumable",
      "cost": 1000,
      "notes": "Refresher Shard is shareable.",
      "attrib": [],
      "mc": false,
      "cd": 200,
      "lore": "",
      "components": null,
      "created": false
    },
    "recipe_spirit_vessel": {
      "id": 266,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "cost": 750,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "spirit_vessel": {
      "active": [
        {
          "name": "Soul Release",
          "desc": "When used against enemies, it reduces health by 4.5% of current health per second, and reduces HP regeneration and healing by 70%. Deals 20 damage per second. \n\nWhen used on allies, it increases health by 1% of current health per second, and increases HP regeneration and healing by 20%. Provides 35 health regeneration per second. \n\nLasts 8 seconds.  \n\nGains charges every time an enemy hero dies within 1400 units.  Only the closest Spirit Vessel to the dying hero will gain a charge.\n\nCast Range: 950 "
        }
      ],
      "id": 267,
      "img": "/apps/dota2/images/items/spirit_vessel_lg.png?3",
      "dname": "Spirit Vessel",
      "qual": "rare",
      "cost": 2975,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_health",
          "header": "+",
          "value": "250",
          "footer": "Health"
        },
        {
          "key": "bonus_movement_speed",
          "header": "+",
          "value": "30",
          "footer": "Movement Speed"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "1",
          "footer": "Mana Regeneration"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "2",
          "footer": "All Attributes"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "2",
          "footer": "Armor"
        }
      ],
      "mc": false,
      "cd": 7,
      "lore": "",
      "components": [
        "urn_of_shadows",
        "vitality_booster",
        "wind_lace"
      ],
      "created": true
    },
    "vanguard": {
      "passive": [
        {
          "name": "Damage Block",
          "desc": "Grants a 50% chance to block 70 damage from incoming attacks on melee heroes, and 35 damage on ranged."
        }
      ],
      "id": 125,
      "img": "/apps/dota2/images/items/vanguard_lg.png?3",
      "dname": "Vanguard",
      "qual": "epic",
      "cost": 2150,
      "notes": "Multiple sources of damage block do not stack.",
      "attrib": [
        {
          "key": "bonus_health",
          "header": "+",
          "value": "250",
          "footer": "Health"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "5.5",
          "footer": "HP Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A powerful shield that defends its wielder from even the most vicious of attacks.",
      "components": [
        "ring_of_health",
        "vitality_booster",
        "stout_shield"
      ],
      "created": true
    },
    "recipe_crimson_guard": {
      "id": 243,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Crimson Guard Recipe",
      "cost": 600,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "crimson_guard": {
      "active": [
        {
          "name": "Guard",
          "desc": "For 12 seconds, grant nearby allied heroes and buildings +2 armor, and a 100% chance to block 60 damage from each incoming attack.\n\nUnits may only be affected by Guard once every 46 seconds.\n\nRadius: 900"
        }
      ],
      "passive": [
        {
          "name": "Damage Block",
          "desc": "Grants a 50% chance to block 70 damage from incoming attacks on melee heroes, and 35 damage on ranged."
        }
      ],
      "id": 242,
      "img": "/apps/dota2/images/items/crimson_guard_lg.png?3",
      "dname": "Crimson Guard",
      "qual": "epic",
      "cost": 3550,
      "notes": "Multiple sources of damage block do not stack.",
      "attrib": [
        {
          "key": "bonus_health",
          "header": "+",
          "value": "250",
          "footer": "Health"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "6",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "2",
          "footer": "All Attributes"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "5",
          "footer": "Armor"
        }
      ],
      "mc": false,
      "cd": 46,
      "lore": "A cuirass originally built to protect against the dreaded Year Beast.",
      "components": [
        "vanguard",
        "buckler"
      ],
      "created": true
    },
    "blade_mail": {
      "active": [
        {
          "name": "Damage Return",
          "desc": "For 4.5 seconds, duplicates any damage taken back to the unit that dealt the damage."
        }
      ],
      "id": 127,
      "img": "/apps/dota2/images/items/blade_mail_lg.png?3",
      "dname": "Blade Mail",
      "qual": "epic",
      "cost": 2200,
      "notes": "Damage Return is calculated before any kind of reduction.\nDamage Return doesn't reflect damage from other forms of Blade Mail.\nReturned damage type is the same as it was received.\nCan pierce Spell Immunity if the original damage type does.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "22",
          "footer": "Damage"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "6",
          "footer": "Armor"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "10",
          "footer": "Intelligence"
        }
      ],
      "mc": 25,
      "cd": 20,
      "lore": "A razor-sharp coat of mail, it is the choice of selfless martyrs in combat.",
      "components": [
        "broadsword",
        "chainmail",
        "robe"
      ],
      "created": true
    },
    "soul_booster": {
      "id": 129,
      "img": "/apps/dota2/images/items/soul_booster_lg.png?3",
      "dname": "Soul Booster",
      "qual": "epic",
      "cost": 3200,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_health",
          "header": "+",
          "value": "425",
          "footer": "Health"
        },
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "425",
          "footer": "Mana"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Regain lost courage.",
      "components": [
        "vitality_booster",
        "energy_booster",
        "point_booster"
      ],
      "created": true
    },
    "hood_of_defiance": {
      "active": [
        {
          "name": "Barrier",
          "desc": "Creates a spell shield that absorbs up to 325 magical damage.  Lasts 12 seconds."
        }
      ],
      "id": 131,
      "img": "/apps/dota2/images/items/hood_of_defiance_lg.png?3",
      "dname": "Hood of Defiance",
      "qual": "epic",
      "cost": 1700,
      "notes": "Stacks multiplicatively with other sources of spell resistance.",
      "attrib": [
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "6.5",
          "footer": "HP Regeneration"
        },
        {
          "key": "tooltip_resist",
          "header": "+",
          "value": "25%",
          "footer": "Magic Resistance"
        }
      ],
      "mc": 75,
      "cd": 60,
      "lore": "A furred, magic resistant headpiece that is feared by wizards.",
      "components": [
        "ring_of_health",
        "cloak",
        "ring_of_regen"
      ],
      "created": true
    },
    "rapier": {
      "passive": [
        {
          "name": "Everlasting",
          "desc": "Dropped on death, and cannot be destroyed. \n\nBecomes unusable if picked up by an ally of its owner until it is returned to its owner. It is immediately usable by anybody if an enemy of the owner picks it up and is killed. A dropped Rapier cannot be picked up by a courier."
        }
      ],
      "id": 133,
      "img": "/apps/dota2/images/items/rapier_lg.png?3",
      "dname": "Divine Rapier",
      "qual": "epic",
      "cost": 6000,
      "notes": "If Divine Rapier is dropped and picked up by an enemy of its original owner, it cannot be dropped again except by death.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "330",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "So powerful, it cannot have a single owner.",
      "components": [
        "relic",
        "demon_edge"
      ],
      "created": true
    },
    "monkey_king_bar": {
      "passive": [
        {
          "name": "Pierce",
          "desc": "Grants each attack a 75% chance to pierce through evasion and deal 100 bonus magical damage."
        }
      ],
      "id": 135,
      "img": "/apps/dota2/images/items/monkey_king_bar_lg.png?3",
      "dname": "Monkey King Bar",
      "qual": "epic",
      "cost": 4175,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "52",
          "footer": "Damage"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "10",
          "footer": "Attack Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A powerful staff used by a master warrior.",
      "components": [
        "demon_edge",
        "javelin",
        "quarterstaff"
      ],
      "created": true
    },
    "recipe_radiance": {
      "id": 136,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Radiance Recipe",
      "cost": 1350,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "radiance": {
      "toggle": [
        {
          "name": "Burn",
          "desc": "When active, scorches enemies for 60 magical damage per second, and causes them to miss 17% of their attacks. Illusions deal 35 magical damage per second.\n\nRadius: 700"
        }
      ],
      "id": 137,
      "img": "/apps/dota2/images/items/radiance_lg.png?3",
      "dname": "Radiance",
      "qual": "epic",
      "cost": 5150,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "65",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A divine weapon that causes damage and a bright burning effect that lays waste to nearby enemies.",
      "components": [
        "relic"
      ],
      "created": true
    },
    "butterfly": {
      "active": [
        {
          "name": "Flutter",
          "desc": "Grants 35% additional movement speed for 2 seconds."
        }
      ],
      "id": 139,
      "img": "/apps/dota2/images/items/butterfly_lg.png?3",
      "dname": "Butterfly",
      "qual": "epic",
      "cost": 5475,
      "notes": "Stacks diminishingly with other sources of Evasion.",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "35",
          "footer": "Agility"
        },
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "25",
          "footer": "Damage"
        },
        {
          "key": "bonus_evasion",
          "header": "+",
          "value": "35%",
          "footer": "Evasion"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "30",
          "footer": "Attack Speed"
        }
      ],
      "mc": false,
      "cd": 25,
      "lore": "Only the mightiest and most experienced of warriors can wield the Butterfly, but it provides incredible dexterity in combat.",
      "components": [
        "eagle",
        "talisman_of_evasion",
        "quarterstaff"
      ],
      "created": true
    },
    "recipe_greater_crit": {
      "id": 140,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Daedalus Recipe",
      "cost": 1000,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "greater_crit": {
      "passive": [
        {
          "name": "Critical Strike",
          "desc": "Grants each attack a 30% chance to deal 235% damage."
        }
      ],
      "id": 141,
      "img": "/apps/dota2/images/items/greater_crit_lg.png?3",
      "dname": "Daedalus",
      "qual": "epic",
      "cost": 5330,
      "notes": "Critical Strike does not work against buildings.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "80",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A weapon of incredible power that is difficult for even the strongest of warriors to control.",
      "components": [
        "lesser_crit",
        "demon_edge"
      ],
      "created": true
    },
    "recipe_basher": {
      "id": 142,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Skull Basher Recipe",
      "cost": 1000,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "basher": {
      "passive": [
        {
          "name": "Bash",
          "desc": "Grants melee heroes a 25% chance on hit to stun the target for 1.5 seconds and deal 100 bonus magical damage.  Bash chance for ranged heroes is 10%."
        }
      ],
      "id": 143,
      "img": "/apps/dota2/images/items/basher_lg.png?3",
      "dname": "Skull Basher",
      "qual": "epic",
      "cost": 3050,
      "notes": "Does not stack with other sources of Bash, however it will stack with Mini-Bash.\nThe following heroes cannot trigger Bash on this item: Spirit Breaker, Faceless Void, Slardar, and Troll Warlord.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "25",
          "footer": "Damage"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "10",
          "footer": "Strength"
        }
      ],
      "mc": false,
      "cd": 2,
      "lore": "A feared weapon in the right hands, this maul's ability to shatter the defenses of its opponents should not be underestimated.",
      "components": [
        "mithril_hammer",
        "belt_of_strength"
      ],
      "created": true
    },
    "recipe_bfury": {
      "id": 144,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Battle Fury Recipe",
      "cost": 300,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "bfury": {
      "active": [
        {
          "name": "Chop Tree/Ward",
          "desc": "Destroy a target tree or ward.\n\nTree Cast Range: 350\nWard Cast Range: 450 "
        }
      ],
      "passive": [
        {
          "name": "Quell",
          "desc": "Increases attack damage against non-hero units by 60% for melee heroes, and 25% for ranged. "
        },
        {
          "name": "Cleave",
          "desc": "Deals 40% of attack damage as physical damage in a cone up to 625 around the target. (Melee Only)"
        }
      ],
      "id": 145,
      "img": "/apps/dota2/images/items/bfury_lg.png?3",
      "dname": "Battle Fury",
      "qual": "epic",
      "cost": 4400,
      "notes": "Cleave damage is reduced by armor type but not by armor value.\nCleave damage goes through spell immunity.\nIf multiple sources of Cleave are present, each Cleave's damage is applied separately.\nChop can be used to destroy Techies' Remote Mines.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "45",
          "footer": "Damage"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "6",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "2.25",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": 4,
      "lore": "The bearer of this mighty axe gains the ability to cut down swaths of enemies at once.",
      "components": [
        "demon_edge",
        "pers",
        "quelling_blade"
      ],
      "created": true
    },
    "recipe_manta": {
      "id": 146,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Manta Style Recipe",
      "cost": 500,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "manta": {
      "active": [
        {
          "name": "Mirror Image",
          "desc": "Creates 2 images of your hero that last 20 seconds. \n\nMelee images deal 33% damage and take 350% damage, while Ranged images deal 28% and take 400% damage. \n\nCooldown increased by 15 seconds on ranged heroes.\n\nDispel Type: Basic Dispel"
        }
      ],
      "id": 147,
      "img": "/apps/dota2/images/items/manta_lg.png?3",
      "dname": "Manta Style",
      "qual": "epic",
      "cost": 4800,
      "notes": "Has a 0.1 second cast time during which you are invulnerable.\nMany effects are removed upon using Manta.\nYasha based movement speed bonuses from multiple items do not stack.",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "10",
          "footer": "Strength"
        },
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "26",
          "footer": "Agility"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "10",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "10",
          "footer": "Attack Speed"
        },
        {
          "key": "bonus_movement_speed",
          "header": "+",
          "value": "8%",
          "footer": "Movement Speed"
        }
      ],
      "mc": 125,
      "cd": 45,
      "lore": "An axe made of reflective materials that causes confusion amongst enemy ranks.",
      "components": [
        "yasha",
        "ultimate_orb"
      ],
      "created": true
    },
    "recipe_lesser_crit": {
      "id": 148,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Crystalys Recipe",
      "cost": 500,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "lesser_crit": {
      "passive": [
        {
          "name": "Critical Strike",
          "desc": "Grants each attack a 20% chance to deal 175% damage."
        }
      ],
      "id": 149,
      "img": "/apps/dota2/images/items/lesser_crit_lg.png?3",
      "dname": "Crystalys",
      "qual": "epic",
      "cost": 2130,
      "notes": "Critical Strike does not work against buildings.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "30",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A blade forged from rare crystals, it seeks weak points in enemy armor.",
      "components": [
        "broadsword",
        "blades_of_attack"
      ],
      "created": true
    },
    "dragon_lance": {
      "passive": [
        {
          "name": "Dragon's Reach",
          "desc": "Increases attack range of ranged heroes by 140."
        }
      ],
      "id": 236,
      "img": "/apps/dota2/images/items/dragon_lance_lg.png?3",
      "dname": "Dragon Lance",
      "qual": "artifact",
      "cost": 1900,
      "notes": "Passive does not stack.",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "12",
          "footer": "Agility"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "12",
          "footer": "Strength"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "The forward charge of the wyvern host grants no quarter.",
      "components": [
        "ogre_axe",
        "boots_of_elves",
        "boots_of_elves"
      ],
      "created": true
    },
    "recipe_armlet": {
      "id": 150,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Armlet of Mordiggian Recipe",
      "cost": 550,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "armlet": {
      "toggle": [
        {
          "name": "Unholy Strength",
          "desc": "When active, Unholy Strength grants +31 damage, +25 strength and +4 armor, but drains 54 health per second.\n\n You cannot die from the health drain when Unholy Strength is activated, nor from the strength loss when Unholy Strength is deactivated."
        }
      ],
      "id": 151,
      "img": "/apps/dota2/images/items/armlet_lg.png?3",
      "dname": "Armlet of Mordiggian",
      "qual": "epic",
      "cost": 2380,
      "notes": "The strength change will affect both maximum and current HP, but you cannot die from the change.\nThe strength change occurs over 0.6 seconds.\nActivating or deactivating Unholy Strength does not interrupt channeling.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "9",
          "footer": "Damage"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "25",
          "footer": "Attack Speed"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "5",
          "footer": "Armor"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "4",
          "footer": "HP Regeneration"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Weapon of choice among brutes, the bearer sacrifices his life energy to gain immense strength and power.",
      "components": [
        "helm_of_iron_will",
        "gloves",
        "blades_of_attack"
      ],
      "created": true
    },
    "invis_sword": {
      "active": [
        {
          "name": "Shadow Walk",
          "desc": "Makes you invisible for 14 seconds, or until you attack or cast a spell.  While Shadow Walk is active, you move 20% faster and can move through units.  \n\nIf attacking to end the invisibility, you gain 175 bonus physical damage on that attack."
        }
      ],
      "id": 152,
      "img": "/apps/dota2/images/items/invis_sword_lg.png?3",
      "dname": "Shadow Blade",
      "qual": "epic",
      "cost": 2800,
      "notes": "Has a 0.3 second fade time.\nIf the invisibility ends without attacking, the bonus damage is lost.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "22",
          "footer": "Damage"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "30",
          "footer": "Attack Speed"
        }
      ],
      "mc": 75,
      "cd": 28,
      "lore": "The blade of a fallen king, it allows you to move unseen and strike from the shadows.",
      "components": [
        "shadow_amulet",
        "claymore"
      ],
      "created": true
    },
    "recipe_silver_edge": {
      "id": 248,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Silver Edge Recipe",
      "cost": 600,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "silver_edge": {
      "active": [
        {
          "name": "Shadow Walk",
          "desc": "Makes you invisible for 14 seconds, or until you attack or cast a spell.  While invisible, you move 25% faster and can move through units.  \n\nAttacking to end the invisibility will deal 175 bonus physical damage to the target, and for 4 seconds, disable their passive abilities."
        }
      ],
      "id": 249,
      "img": "/apps/dota2/images/items/silver_edge_lg.png?3",
      "dname": "Silver Edge",
      "qual": "epic",
      "cost": 5550,
      "notes": "Backstab cannot miss.\nBackstab does not pierce spell immunity.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "30",
          "footer": "Damage"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "30",
          "footer": "Attack Speed"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "15",
          "footer": "All Attributes"
        }
      ],
      "mc": 75,
      "cd": 22,
      "lore": "Once used to slay an unjust king, only to have the kingdom erupt into civil war in the aftermath.",
      "components": [
        "invis_sword",
        "ultimate_orb"
      ],
      "created": true
    },
    "sange_and_yasha": {
      "passive": [
        {
          "name": "Maim",
          "desc": "Each attack has a 40% chance to reduce enemy hero movement speed by -26% and attack speed by -26 when used by a melee hero. Reduces enemy hero movement by -13% and attack speed by -13 when used by a ranged hero. Effect lasts 5 seconds."
        }
      ],
      "id": 154,
      "img": "/apps/dota2/images/items/sange_and_yasha_lg.png?3",
      "dname": "Sange and Yasha",
      "qual": "artifact",
      "cost": 4300,
      "notes": "Yasha-based movement speed bonuses from multiple items do not stack.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "16",
          "footer": "Damage"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "16",
          "footer": "Strength"
        },
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "16",
          "footer": "Agility"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "16",
          "footer": "Attack Speed"
        },
        {
          "key": "movement_speed_percent_bonus",
          "header": "+",
          "value": "16%",
          "footer": "Movement Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Sange and Yasha, when attuned by the moonlight and used together, become a very powerful combination.",
      "components": [
        "yasha",
        "sange"
      ],
      "created": true
    },
    "satanic": {
      "active": [
        {
          "name": "Unholy Rage",
          "desc": "Increases Lifesteal percentage to 200% for 5 seconds. "
        }
      ],
      "passive": [
        {
          "name": "Lifesteal",
          "desc": "Heals the attacker for 25% of attack damage dealt."
        }
      ],
      "id": 156,
      "img": "/apps/dota2/images/items/satanic_lg.png?3",
      "dname": "Satanic",
      "qual": "artifact",
      "cost": 5500,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "25",
          "footer": "Strength"
        },
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "50",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": 35,
      "lore": "Immense power at the cost of your soul.",
      "components": [
        "lifesteal",
        "claymore",
        "reaver"
      ],
      "created": true
    },
    "recipe_mjollnir": {
      "id": 157,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Mjollnir Recipe",
      "cost": 900,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "mjollnir": {
      "active": [
        {
          "name": "Static Charge",
          "desc": "Places a charged shield on a target unit for 15 seconds which has a 20% chance to release a 200 magical damage shocking bolt at a nearby attacker and 4 additional enemies.\n\nRange: 800"
        }
      ],
      "passive": [
        {
          "name": "Chain Lightning",
          "desc": "Grants a 25% chance on attack to release a bolt of electricity that leaps between 12 targets within a 900 radius, dealing 170 magical damage to each. Lightning proc pierces evasion."
        }
      ],
      "id": 158,
      "img": "/apps/dota2/images/items/mjollnir_lg.png?3",
      "dname": "Mjollnir",
      "qual": "artifact",
      "cost": 5600,
      "notes": "Static Charge cannot trigger more than once per second.\nStatic Charge's shock deals magical damage centered on hero with the Static Charge. Static Charge's targets cannot be more than 900 range away.\nStatic Charge procs will not bounce to heroes that are invisible or hidden by Fog of War.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "24",
          "footer": "Damage"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "75",
          "footer": "Attack Speed"
        }
      ],
      "mc": 50,
      "cd": 35,
      "lore": "Thor's magical hammer, made for him by the dwarves Brok and Eitri.",
      "components": [
        "maelstrom",
        "hyperstone"
      ],
      "created": true
    },
    "skadi": {
      "passive": [
        {
          "name": "Cold Attack",
          "desc": "Attacks lower enemy attack speed by -45 and movement speed by -35%. \n\nLasts 5 seconds when used by melee heroes, and 2.5 seconds when used by ranged."
        }
      ],
      "id": 160,
      "img": "/apps/dota2/images/items/skadi_lg.png?3",
      "dname": "Eye of Skadi",
      "qual": "artifact",
      "cost": 5500,
      "notes": "Lasts 5 seconds with melee Eye of Skadi, 2.5 seconds with ranged Eye of Skadi.",
      "attrib": [
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "25",
          "footer": "All Attributes"
        },
        {
          "key": "bonus_health",
          "header": "+",
          "value": "225",
          "footer": "Health"
        },
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "250",
          "footer": "Mana"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Extremely rare artifact, guarded by the azure dragons.",
      "components": [
        "ultimate_orb",
        "ultimate_orb",
        "point_booster"
      ],
      "created": true
    },
    "recipe_sange": {
      "id": 161,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Sange Recipe",
      "cost": 700,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "sange": {
      "passive": [
        {
          "name": "Maim",
          "desc": "Each attack has a 40% chance to reduce enemy hero movement speed by -26% and attack speed by -26 when used by a melee hero. Reduces enemy hero movement by -13% and attack speed by -13 when used by a ranged hero. Effect lasts 5 seconds."
        }
      ],
      "id": 162,
      "img": "/apps/dota2/images/items/sange_lg.png?3",
      "dname": "Sange",
      "qual": "artifact",
      "cost": 2150,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "10",
          "footer": "Damage"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "16",
          "footer": "Strength"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Sange is an unusually accurate weapon, seeking weak points automatically.",
      "components": [
        "ogre_axe",
        "belt_of_strength"
      ],
      "created": true
    },
    "helm_of_the_dominator": {
      "active": [
        {
          "name": "Dominate",
          "desc": "Takes control of one neutral, non-ancient target unit and sets its movement speed to 425 and max health to a minimum of 1500.\n\nDominated units with a max health of greater than 1500 retain their original max health.  Dominated unit's bounty is set to 200 gold.\n\nRange: 700"
        }
      ],
      "passive": [
        {
          "name": "Dominator Aura",
          "desc": "Increases nearby allies' attack speed by 20 and health regen by 7.\n\nRadius: 900"
        }
      ],
      "id": 164,
      "img": "/apps/dota2/images/items/helm_of_the_dominator_lg.png?3",
      "dname": "Helm of the Dominator",
      "qual": "artifact",
      "cost": 2000,
      "notes": "Cannot dominate more than one unit at a time.  If a new unit is dominated, the old one will die.\nCan also Dominate enemy lane creeps and summoned units.\nSelling Helm of the Dominator will cause dominated units to die.",
      "attrib": [
        {
          "key": "bonus_stats",
          "header": "+",
          "value": "2",
          "footer": "All Attributes"
        }
      ],
      "mc": false,
      "cd": 60,
      "lore": "The powerful headpiece of a dead necromancer.",
      "components": [
        "gloves",
        "headdress",
        "ring_of_health"
      ],
      "created": true
    },
    "maelstrom": {
      "passive": [
        {
          "name": "Chain Lightning",
          "desc": "Grants a 25% chance on attack to release a bolt of electricity that leaps between 4 targets within a 900 radius, dealing 160 magical damage to each. Lightning proc pierces evasion."
        }
      ],
      "id": 166,
      "img": "/apps/dota2/images/items/maelstrom_lg.png?3",
      "dname": "Maelstrom",
      "qual": "artifact",
      "cost": 2700,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "24",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A hammer forged for the gods themselves, Maelstrom allows its user to harness the power of lightning.",
      "components": [
        "mithril_hammer",
        "javelin"
      ],
      "created": true
    },
    "desolator": {
      "passive": [
        {
          "name": "Corruption",
          "desc": "Your attacks reduce the target's armor by -6 for 15 seconds."
        }
      ],
      "id": 168,
      "img": "/apps/dota2/images/items/desolator_lg.png?3",
      "dname": "Desolator",
      "qual": "artifact",
      "cost": 3500,
      "notes": "Armor reduction works on buildings.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "50",
          "footer": "Damage"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "A wicked weapon, used in torturing political criminals.",
      "components": [
        "mithril_hammer",
        "mithril_hammer",
        "blight_stone"
      ],
      "created": true
    },
    "recipe_yasha": {
      "id": 169,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Yasha Recipe",
      "cost": 700,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "yasha": {
      "id": 170,
      "img": "/apps/dota2/images/items/yasha_lg.png?3",
      "dname": "Yasha",
      "qual": "artifact",
      "cost": 2150,
      "notes": "Yasha-based movement speed bonuses from multiple items do not stack.",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "16",
          "footer": "Agility"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "10",
          "footer": "Attack Speed"
        },
        {
          "key": "movement_speed_percent_bonus",
          "header": "+",
          "value": "8%",
          "footer": "Movement Speed"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "Yasha is regarded as the swiftest weapon ever created.",
      "components": [
        "blade_of_alacrity",
        "boots_of_elves"
      ],
      "created": true
    },
    "mask_of_madness": {
      "active": [
        {
          "name": "Berserk",
          "desc": "Gives 110 attack speed and 12% movement speed, but reduces your armor by 8 and silences you.  Lasts 8 seconds."
        }
      ],
      "passive": [
        {
          "name": "Lifesteal",
          "desc": "Heals the attacker for 15% of attack damage dealt."
        }
      ],
      "id": 172,
      "img": "/apps/dota2/images/items/mask_of_madness_lg.png?3",
      "dname": "Mask of Madness",
      "qual": "artifact",
      "cost": 1975,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "20",
          "footer": "Damage"
        },
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "10",
          "footer": "Attack Speed"
        }
      ],
      "mc": 25,
      "cd": 22,
      "lore": "Once this mask is worn, its bearer becomes an uncontrollable aggressive force.",
      "components": [
        "lifesteal",
        "quarterstaff"
      ],
      "created": true
    },
    "recipe_diffusal_blade": {
      "id": 173,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Diffusal Blade Recipe",
      "cost": 700,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "diffusal_blade": {
      "active": [
        {
          "name": "Inhibit",
          "desc": "Targets an enemy, slowing it for 4 seconds.\n\nRange: 600"
        }
      ],
      "passive": [
        {
          "name": "Manabreak",
          "desc": "Each attack burns 50 mana from the target, and deals 0.8 physical damage per burned mana. \n\nBurns 16 mana per attack from melee illusions and 8 mana per attack from ranged illusions."
        }
      ],
      "id": 174,
      "img": "/apps/dota2/images/items/diffusal_blade_lg.png?3",
      "dname": "Diffusal Blade",
      "qual": "artifact",
      "cost": 3150,
      "notes": "Does not stack with other manabreak abilities.",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "20",
          "footer": "Agility"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "10",
          "footer": "Intelligence"
        }
      ],
      "mc": false,
      "cd": 15,
      "lore": "An enchanted blade that allows the user to cut straight into the enemy's soul.",
      "components": [
        "blade_of_alacrity",
        "blade_of_alacrity",
        "robe"
      ],
      "created": true
    },
    "ethereal_blade": {
      "active": [
        {
          "name": "Ether Blast",
          "desc": "Converts the target unit to ethereal form, rendering them immune to physical damage, but unable to attack and -40% more vulnerable to magic damage.  Lasts for 4 seconds on allies and 3 seconds on enemies.\n\n  Enemy targets are also slowed by -80%, and take 2x your primary attribute + 75 as magical damage.\n\nRange: 800"
        }
      ],
      "id": 176,
      "img": "/apps/dota2/images/items/ethereal_blade_lg.png?3",
      "dname": "Ethereal Blade",
      "qual": "epic",
      "cost": 4700,
      "notes": "Shares cooldown with Ghost Scepter.\nEthereal units take 40% bonus magic damage.\nLasts an extra second on Self or Allied cast.\nUsing a Town Portal Scroll or Boots of Travel will not dispel Ethereal Form.",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "40",
          "footer": "Agility"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "10",
          "footer": "Strength"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "10",
          "footer": "Intelligence"
        }
      ],
      "mc": 100,
      "cd": 20,
      "lore": "A flickering blade of a ghastly nature, it is capable of dealing damage in both magical and physical planes.",
      "components": [
        "eagle",
        "ghost"
      ],
      "created": true
    },
    "recipe_soul_ring": {
      "id": 177,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Soul Ring Recipe",
      "cost": 200,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "soul_ring": {
      "active": [
        {
          "name": "Sacrifice",
          "desc": "Consume 170 health to temporarily gain 150 mana.  Lasts 10 seconds.\n\nIf the mana gained cannot fit in your mana pool, it creates a buffer of mana that will be used before your mana pool."
        }
      ],
      "id": 178,
      "img": "/apps/dota2/images/items/soul_ring_lg.png?3",
      "dname": "Soul Ring",
      "qual": "common",
      "cost": 770,
      "notes": "If this mana is not used before the duration ends, the extra mana is lost.",
      "attrib": [
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "6",
          "footer": "Strength"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "2",
          "footer": "HP Regeneration"
        }
      ],
      "mc": false,
      "cd": 25,
      "lore": "A ring that feeds on the souls of those who wear it.",
      "components": [
        "ring_of_regen",
        "gauntlets",
        "gauntlets"
      ],
      "created": true
    },
    "arcane_boots": {
      "active": [
        {
          "name": "Replenish Mana",
          "desc": "Restores 135 mana to all nearby allies.\n\nRadius: 900"
        }
      ],
      "hint": [
        "Flat movement speed bonuses from multiple pairs of boots do not stack."
      ],
      "id": 180,
      "img": "/apps/dota2/images/items/arcane_boots_lg.png?3",
      "dname": "Arcane Boots",
      "qual": "rare",
      "cost": 1400,
      "notes": "Does not work on Meepo clones.",
      "attrib": [
        {
          "key": "bonus_movement",
          "header": "+",
          "value": "50",
          "footer": "Movement Speed"
        },
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "250",
          "footer": "Mana"
        }
      ],
      "mc": false,
      "cd": 55,
      "lore": "Magi equipped with these boots are valued in battle.",
      "components": [
        "boots",
        "energy_booster"
      ],
      "created": true
    },
    "octarine_core": {
      "passive": [
        {
          "name": "Cooldown Reduction",
          "desc": "Reduces the cooldown time of all spells and items by 25%."
        },
        {
          "name": "Spell Lifesteal",
          "desc": "25% of spell damage dealt to enemy heroes is returned to the caster as health, regardless of spell damage type.  \n\nLifesteal reduced to 5% against creeps."
        }
      ],
      "id": 235,
      "img": "/apps/dota2/images/items/octarine_core_lg.png?3",
      "dname": "Octarine Core",
      "qual": "rare",
      "cost": 5900,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intelligence",
          "header": "+",
          "value": "25",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_health",
          "header": "+",
          "value": "425",
          "footer": "Health"
        },
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "425",
          "footer": "Mana"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "At the core of spellcraft are spectrums only the very gifted can sense.",
      "components": [
        "mystic_staff",
        "soul_booster"
      ],
      "created": true
    },
    "orb_of_venom": {
      "passive": [
        {
          "name": "Poison Attack",
          "desc": "Poisons the target, dealing 5 magical damage per second and slowing movement by -12% if the equipped hero is melee, or 3 magical damage per second and slowing movement by -4% if they are ranged. Lasts for 3 seconds."
        }
      ],
      "id": 181,
      "img": "/apps/dota2/images/items/orb_of_venom_lg.png?3",
      "dname": "Orb of Venom",
      "qual": "component",
      "cost": 275,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "Envenoms your veapon with the venom of a venomous viper.",
      "components": null,
      "created": false
    },
    "blight_stone": {
      "passive": [
        {
          "name": "Lesser Corruption",
          "desc": "Your attacks reduce the target's armor by -2 for 8 seconds."
        }
      ],
      "id": 240,
      "img": "/apps/dota2/images/items/blight_stone_lg.png?3",
      "dname": "Blight Stone",
      "qual": "component",
      "cost": 300,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "An unnerving stone unearthed beneath the Fields of Endless Carnage.",
      "components": null,
      "created": false
    },
    "recipe_ancient_janggo": {
      "id": 184,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Drum of Endurance Recipe",
      "cost": 575,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "ancient_janggo": {
      "active": [
        {
          "name": "Endurance",
          "desc": "Gives +35 attack speed and +13% movement speed to nearby allies for 6 seconds. \n\nRadius: 900"
        }
      ],
      "passive": [
        {
          "name": "Swiftness Aura",
          "desc": "Gives 20 movement speed to nearby allies. \n\nRadius: 900"
        }
      ],
      "id": 185,
      "img": "/apps/dota2/images/items/ancient_janggo_lg.png?3",
      "dname": "Drum of Endurance",
      "qual": "rare",
      "cost": 1615,
      "notes": "Re-purchasing the Drum of Endurance recipe will refresh its charges.\nMultiple instances of Swiftness Aura do not stack.",
      "attrib": [
        {
          "key": "bonus_int",
          "header": "+",
          "value": "6",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_str",
          "header": "+",
          "value": "7",
          "footer": "Strength"
        },
        {
          "key": "bonus_agi",
          "header": "+",
          "value": "3",
          "footer": "Agility"
        },
        {
          "key": "bonus_mana_regen",
          "header": "+",
          "value": "0.75",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": 30,
      "lore": "A relic that enchants the bodies of those around it for swifter movement in times of crisis.",
      "components": [
        "sobi_mask",
        "bracer",
        "wind_lace"
      ],
      "created": true
    },
    "medallion_of_courage": {
      "active": [
        {
          "name": "Valor",
          "desc": "If cast on an ally, grants them the 7 armor, and removing it from the caster. \n\nIf cast on an enemy, reduces 7 armor on both the enemy and the caster. \n\nCannot target magic immune enemies.\n\nRange: 1000"
        }
      ],
      "id": 187,
      "img": "/apps/dota2/images/items/medallion_of_courage_lg.png?3",
      "dname": "Medallion of Courage",
      "qual": "rare",
      "cost": 1175,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "7",
          "footer": "Armor"
        },
        {
          "key": "bonus_mana_regen_pct",
          "header": "+",
          "value": "0.5",
          "footer": "Mana Regeneration"
        }
      ],
      "mc": false,
      "cd": 7,
      "lore": "The bearer has no fear of combat.",
      "components": [
        "chainmail",
        "sobi_mask",
        "blight_stone"
      ],
      "created": true
    },
    "solar_crest": {
      "active": [
        {
          "name": "Shine",
          "desc": "When cast on an ally, grants them 10 armor and 20% evasion. When cast on an enemy, removes 10 of their armor and grants your allies 40% Accuracy on the target. \n\nRemoves the armor and evasion from the caster when used. \n\n Cannot target magic immune enemies.\n\nRange: 1000"
        }
      ],
      "id": 229,
      "img": "/apps/dota2/images/items/solar_crest_lg.png?3",
      "dname": "Solar Crest",
      "qual": "rare",
      "cost": 2575,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "10",
          "footer": "Armor"
        },
        {
          "key": "bonus_mana_regen_pct",
          "header": "+",
          "value": "1",
          "footer": "Mana Regeneration"
        },
        {
          "key": "self_bonus_evasion",
          "header": "+",
          "value": "15%",
          "footer": "Evasion"
        }
      ],
      "mc": false,
      "cd": 7,
      "lore": "A talisman forged to honor the daytime sky.",
      "components": [
        "medallion_of_courage",
        "talisman_of_evasion"
      ],
      "created": true
    },
    "smoke_of_deceit": {
      "use": [
        {
          "name": "Disguise",
          "desc": "Turns the caster and all allied player-controlled units in a 1200 radius invisible, and grants 15% bonus movement speed for 35 seconds. \n\nAttacking, or moving within 1025 range of an enemy hero or tower, will break the invisibility. \n\nDisguise grants invisibility that is immune to True Sight."
        }
      ],
      "id": 188,
      "img": "/apps/dota2/images/items/smoke_of_deceit_lg.png?3",
      "dname": "Smoke of Deceit",
      "qual": "consumable",
      "cost": 80,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": 1,
      "lore": "The charlatan wizard Myrddin's only true contribution to the arcane arts.",
      "components": null,
      "created": false
    },
    "tome_of_knowledge": {
      "use": [
        {
          "name": "Enlighten",
          "desc": "Grants you 700 experience plus 135 per tome consumed by your team.\n\nTomes Used By Team: %customval_team_tomes_used%"
        }
      ],
      "id": 257,
      "img": "/apps/dota2/images/items/tome_of_knowledge_lg.png?3",
      "dname": "Tome of Knowledge",
      "qual": "consumable",
      "cost": 150,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "That which raises beast to man and man to god.",
      "components": null,
      "created": false
    },
    "recipe_veil_of_discord": {
      "id": 189,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Veil of Discord Recipe",
      "cost": 500,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "veil_of_discord": {
      "active": [
        {
          "name": "Magic Weakness",
          "desc": "Cast a 600 radius blast that decreases enemy magic resistance by -25%.\n\nRange: 1000\nDuration: 16 seconds."
        }
      ],
      "id": 190,
      "img": "/apps/dota2/images/items/veil_of_discord_lg.png?3",
      "dname": "Veil of Discord",
      "qual": "rare",
      "cost": 2330,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "5",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "6",
          "footer": "Armor"
        },
        {
          "key": "bonus_agi",
          "header": "+",
          "value": "6",
          "footer": "Agility"
        },
        {
          "key": "bonus_str",
          "header": "+",
          "value": "6",
          "footer": "Strength"
        },
        {
          "key": "bonus_int",
          "header": "+",
          "value": "14",
          "footer": "Intelligence"
        }
      ],
      "mc": 50,
      "cd": 20,
      "lore": "The headwear of corrupt magi.",
      "components": [
        "helm_of_iron_will",
        "null_talisman",
        "null_talisman"
      ],
      "created": true
    },
    "recipe_guardian_greaves": {
      "id": 230,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Guardian Greaves Recipe",
      "cost": 1700,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "guardian_greaves": {
      "active": [
        {
          "name": "Mend",
          "desc": "Restores 250 health and 160 mana to nearby allies, and removes most negative effects from the caster.\n\nRadius: 900\nDispel Type: Basic Dispel"
        }
      ],
      "passive": [
        {
          "name": "Guardian Aura",
          "desc": "Provides nearby allies with 3.5 health regeneration and 2 bonus armor. If an allied hero's health falls below 20%, they receive 12 health regeneration and 15 armor."
        }
      ],
      "hint": [
        "Flat movement speed bonuses from multiple pairs of boots do not stack."
      ],
      "id": 231,
      "img": "/apps/dota2/images/items/guardian_greaves_lg.png?3",
      "dname": "Guardian Greaves",
      "qual": "rare",
      "cost": 5450,
      "notes": "The aura boost only applies to heroes.",
      "attrib": [
        {
          "key": "bonus_movement",
          "header": "+",
          "value": "55",
          "footer": "Movement Speed"
        },
        {
          "key": "bonus_mana",
          "header": "+",
          "value": "250",
          "footer": "Mana"
        },
        {
          "key": "bonus_all_stats",
          "header": "+",
          "value": "5",
          "footer": "All Attributes"
        },
        {
          "key": "bonus_armor",
          "header": "+",
          "value": "5",
          "footer": "Armor"
        }
      ],
      "mc": false,
      "cd": 40,
      "lore": "One of many holy instruments constructed to honor the Omniscience.",
      "components": [
        "mekansm",
        "arcane_boots"
      ],
      "created": true
    },
    "recipe_rod_of_atos": {
      "id": 205,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Rod of Atos Recipe",
      "cost": 1000,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "rod_of_atos": {
      "active": [
        {
          "name": "Cripple",
          "desc": "Roots the target for 2 seconds.\n\nRange: 1150"
        }
      ],
      "id": 206,
      "img": "/apps/dota2/images/items/rod_of_atos_lg.png?3",
      "dname": "Rod of Atos",
      "qual": "rare",
      "cost": 2930,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "20",
          "footer": "Intelligence"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "15",
          "footer": "Strength"
        },
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "6",
          "footer": "Agility"
        }
      ],
      "mc": 50,
      "cd": 16,
      "lore": "Atos, the Lord of Blight, has his essence stored in this deceptively simple wand.",
      "components": [
        "staff_of_wizardry",
        "bracer",
        "bracer"
      ],
      "created": true
    },
    "iron_talon": {
      "active": [
        {
          "name": "Chop",
          "desc": "Targets a non-player enemy unit to remove 40% of its current HP.\n\nIf cast on a tree or ward, instantly destroys it.\n\nUnit Range: 350\nTree Range: 350\nWard Range: 450"
        }
      ],
      "passive": [
        {
          "name": "Quell",
          "desc": "Increases attack damage against non-hero units by 24 for melee heroes, and 7 for ranged."
        }
      ],
      "id": 239,
      "img": "/apps/dota2/images/items/iron_talon_lg.png?3",
      "dname": "Iron Talon",
      "qual": "common",
      "cost": 0,
      "notes": "Has a 4 second cooldown on Trees.\nCannot target ancients.",
      "attrib": [
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "2",
          "footer": "HP Regeneration"
        }
      ],
      "mc": false,
      "cd": 20,
      "lore": "A simple but effective weapon devised to quell a great Hellbear uprising.",
      "components": null,
      "created": false
    },
    "recipe_abyssal_blade": {
      "id": 207,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Abyssal Blade Recipe",
      "cost": 1550,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "abyssal_blade": {
      "active": [
        {
          "name": "Overwhelm",
          "desc": "Stuns a target enemy unit for 2 seconds. \n\nPierces Spell Immunity.\n\nRange: 140"
        }
      ],
      "passive": [
        {
          "name": "Bash",
          "desc": "Grants melee heroes a 25% chance on hit to stun the target for 1.5 seconds and deal 100 bonus magical damage.  Bash chance for ranged heroes is 10%."
        },
        {
          "name": "Damage Block",
          "desc": "Grants a 50% chance to block 70 damage from incoming attacks on melee heroes, and 35 damage on ranged."
        }
      ],
      "id": 208,
      "img": "/apps/dota2/images/items/abyssal_blade_lg.png?3",
      "dname": "Abyssal Blade",
      "qual": "epic",
      "cost": 6750,
      "notes": "The stun is melee range.\nDoes not stack with other bashes.\nThe following heroes cannot trigger Bash on this item: Spirit Breaker, Faceless Void, Slardar, and Troll Warlord.\nMultiple sources of damage block do not stack.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "25",
          "footer": "Damage"
        },
        {
          "key": "bonus_health",
          "header": "+",
          "value": "250",
          "footer": "Health"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "7",
          "footer": "HP Regeneration"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "10",
          "footer": "Strength"
        }
      ],
      "mc": 75,
      "cd": 35,
      "lore": "The lost blade of the Commander of the Abyss, this edge cuts into an enemy's soul.",
      "components": [
        "basher",
        "vanguard"
      ],
      "created": true
    },
    "heavens_halberd": {
      "active": [
        {
          "name": "Disarm",
          "desc": "Prevents a target from attacking for 3 seconds on melee targets, and 5 seconds on ranged targets.\n\nRange: 600 "
        }
      ],
      "passive": [
        {
          "name": "Maim",
          "desc": "Each attack has a 40% chance to reduce enemy hero movement speed by -26% and attack speed by -26 if the user is melee. Reduces enemy hero movement by -13% and attack speed by -13 if the user is ranged. Effect lasts 5 seconds."
        }
      ],
      "id": 210,
      "img": "/apps/dota2/images/items/heavens_halberd_lg.png?3",
      "dname": "Heaven's Halberd",
      "qual": "artifact",
      "cost": 3550,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_evasion",
          "header": "+",
          "value": "25%",
          "footer": "Evasion"
        },
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "25",
          "footer": "Damage"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "20",
          "footer": "Strength"
        }
      ],
      "mc": 100,
      "cd": 18,
      "lore": "This halberd moves with the speed of a smaller weapon, allowing the bearer to win duels that a heavy edge would not.",
      "components": [
        "sange",
        "talisman_of_evasion"
      ],
      "created": true
    },
    "ring_of_aquila": {
      "passive": [
        {
          "name": "Aquila Aura",
          "desc": "Grants 0.5 mana regeneration and 2 armor to nearby allies.\n\nRadius: 900"
        }
      ],
      "toggle": [
        {
          "name": "Aura",
          "desc": "Deactivate to stop affecting non-hero units."
        }
      ],
      "id": 212,
      "img": "/apps/dota2/images/items/ring_of_aquila_lg.png?3",
      "dname": "Ring of Aquila",
      "qual": "rare",
      "cost": 965,
      "notes": "Does not stack with armor auras from Ring of Basilius or Ring of Aquila.\nMultiple instances of Aquila Aura do not stack.",
      "attrib": [
        {
          "key": "bonus_damage",
          "header": "+",
          "value": "10",
          "footer": "Damage"
        },
        {
          "key": "bonus_strength",
          "header": "+",
          "value": "3",
          "footer": "Strength"
        },
        {
          "key": "bonus_agility",
          "header": "+",
          "value": "9",
          "footer": "Agility"
        },
        {
          "key": "bonus_intellect",
          "header": "+",
          "value": "3",
          "footer": "Intelligence"
        }
      ],
      "mc": false,
      "cd": false,
      "lore": "The ring of the fallen Warlord Aquila continues to support armies in battle.",
      "components": [
        "wraith_band",
        "ring_of_basilius"
      ],
      "created": true
    },
    "tranquil_boots": {
      "passive": [
        {
          "name": "Break",
          "desc": "Whenever you attack or are attacked, the bonus 13 HP regen is lost and the movement speed bonus is reduced to 65 for 13 seconds."
        }
      ],
      "hint": [
        "Flat movement speed bonuses from multiple pairs of boots do not stack."
      ],
      "id": 214,
      "img": "/apps/dota2/images/items/tranquil_boots_lg.png?3",
      "dname": "Tranquil Boots",
      "qual": "rare",
      "cost": 1050,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_movement_speed",
          "header": "+",
          "value": "90",
          "footer": "Movement Speed"
        },
        {
          "key": "bonus_health_regen",
          "header": "+",
          "value": "13",
          "footer": "HP Regeneration"
        }
      ],
      "mc": false,
      "cd": 13,
      "lore": "While they increase the longevity of the wearer, this boot is not particularly reliable.",
      "components": [
        "boots",
        "wind_lace",
        "ring_of_regen"
      ],
      "created": true
    },
    "shadow_amulet": {
      "active": [
        {
          "name": "Fade",
          "desc": "Grants invisibility to you or a target allied hero as long as the target unit remains still.  \n\nHas a 1.25 second fade time, and breaks instantly upon moving. \n\nThere is no cooldown when using this item on yourself.\n\nRange: 600"
        }
      ],
      "id": 215,
      "img": "/apps/dota2/images/items/shadow_amulet_lg.png?3",
      "dname": "Shadow Amulet",
      "cost": 1400,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "20",
          "footer": "Attack Speed"
        }
      ],
      "mc": false,
      "cd": 7,
      "lore": "A small talisman that clouds the senses of one's enemies when held perfectly still.",
      "components": null,
      "created": false
    },
    "glimmer_cape": {
      "active": [
        {
          "name": "Glimmer",
          "desc": "After a 0.6 second delay, grants invisibility and 45% magic resistance to you or a target allied unit for 5 seconds.\n\nRange: 800\n\nCan be cast while channelling."
        }
      ],
      "id": 254,
      "img": "/apps/dota2/images/items/glimmer_cape_lg.png?3",
      "dname": "Glimmer Cape",
      "qual": "rare",
      "cost": 1950,
      "notes": "",
      "attrib": [
        {
          "key": "bonus_attack_speed",
          "header": "+",
          "value": "20",
          "footer": "Attack Speed"
        },
        {
          "key": "bonus_magical_armor",
          "header": "+",
          "value": "15%",
          "footer": "Magic Resistance"
        }
      ],
      "mc": 90,
      "cd": 14,
      "lore": "The stolen cape of a master illusionist.",
      "components": [
        "shadow_amulet",
        "cloak"
      ],
      "created": true
    },
    "river_painter": {
      "hint": [
        "Pour this serum into the river to transform the water into liquid chrome for 15 minutes. <font color='#FF5555'>Using this item on the river will permanently consume one charge from your Armory supply upon expiration of the effect. Charges do not get consumed if the effect is replaced by a stronger vial before expiration.</font> Vials can only be used if at least one charge remains in your Armory. Charges will only be used by successfully enchanting the river, and will not be consumed if the item is sold, dropped, or destroyed during a game. You can only cast a vial on the river if there's not a stronger vial already in effect."
      ],
      "id": 1021,
      "img": "/apps/dota2/images/items/river_painter_lg.png?3",
      "dname": "River Vial: Chrome",
      "qual": "component",
      "cost": 0,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "river_painter2": {
      "hint": [
        "Pour this serum into the river to dry up the water for 15 minutes. <font color='#FF5555'>Using this item on the river will permanently consume one charge from your Armory supply upon expiration of the effect . Charges do not get consumed if the effect is replaced by a stronger vial before expiration.</font> Vials can only be used if at least one charge remains in your Armory. Charges will only be used by successfully enchanting the river, and will not be consumed if the item is sold, dropped, or destroyed during a game. You can only cast a vial on the river if there's not a stronger vial already in effect."
      ],
      "id": 1022,
      "img": "/apps/dota2/images/items/river_painter2_lg.png?3",
      "dname": "River Vial: Dry",
      "qual": "component",
      "cost": 0,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "river_painter3": {
      "hint": [
        "Pour this serum into the river to transform the water into a green slime for 15 minutes. <font color='#FF5555'>Using this item on the river will permanently consume one charge from your Armory supply upon expiration of the effect. Charges do not get consumed if the effect is replaced by a stronger vial before expiration.</font> Vials can only be used if at least one charge remains in your Armory. Charges will only be used by successfully enchanting the river, and will not be consumed if the item is sold, dropped, or destroyed during a game. You can only cast a vial on the river if there's not a stronger vial already in effect."
      ],
      "id": 1023,
      "img": "/apps/dota2/images/items/river_painter3_lg.png?3",
      "dname": "River Vial: Slime",
      "qual": "component",
      "cost": 0,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "river_painter4": {
      "hint": [
        "Pour this serum into the river to make the water oily for 15 minutes. <font color='#FF5555'>Using this item on the river will permanently consume one charge from your Armory supply upon expiration of the effect. Charges do not get consumed if the effect is replaced by a stronger vial before expiration.</font> Vials can only be used if at least one charge remains in your Armory. Charges will only be used by successfully enchanting the river, and will not be consumed if the item is sold, dropped, or destroyed during a game. You can only cast a vial on the river if there's not a stronger vial already in effect."
      ],
      "id": 1024,
      "img": "/apps/dota2/images/items/river_painter4_lg.png?3",
      "dname": "River Vial: Oil",
      "qual": "component",
      "cost": 0,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "river_painter5": {
      "hint": [
        "Pour this serum into the river to make the water electric for 15 minutes. <font color='#FF5555'>Using this item on the river will permanently consume one charge from your Armory supply upon expiration of the effect. Charges do not get consumed if the effect is replaced by a stronger vial before expiration.</font> Vials can only be used if at least one charge remains in your Armory. Charges will only be used by successfully enchanting the river, and will not be consumed if the item is sold, dropped, or destroyed during a game. You can only cast a vial on the river if there's not a stronger vial already in effect."
      ],
      "id": 1025,
      "img": "/apps/dota2/images/items/river_painter5_lg.png?3",
      "dname": "River Vial: Electrified",
      "qual": "component",
      "cost": 0,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "river_painter6": {
      "hint": [
        "Pour this serum into the river to transform the water into a purple bubbling potion for 15 minutes. <font color='#FF5555'>Using this item on the river will permanently consume one charge from your Armory supply upon expiration of the effect. Charges do not get consumed if the effect is replaced by a stronger vial before expiration.</font> Vials can only be used if at least one charge remains in your Armory. Charges will only be used by successfully enchanting the river, and will not be consumed if the item is sold, dropped, or destroyed during a game. You can only cast a vial on the river if there's not a stronger vial already in effect."
      ],
      "id": 1026,
      "img": "/apps/dota2/images/items/river_painter6_lg.png?3",
      "dname": "River Vial: Potion",
      "qual": "component",
      "cost": 0,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "river_painter7": {
      "hint": [
        "Pour this serum into the river to transform the water into blood for 15 minutes. <font color='#FF5555'>Using this item on the river will permanently consume one charge from your Armory supply upon expiration of the effect. Charges do not get consumed if the effect is replaced by a stronger vial before expiration.</font> Vials can only be used if at least one charge remains in your Armory. Charges will only be used by successfully enchanting the river, and will not be consumed if the item is sold, dropped, or destroyed during a game. You can only cast a vial on the river if there's not a stronger vial already in effect."
      ],
      "id": 1027,
      "img": "/apps/dota2/images/items/river_painter7_lg.png?3",
      "dname": "River Vial: Blood",
      "qual": "component",
      "cost": 0,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "mutation_tombstone": {
      "id": 1028,
      "img": "/apps/dota2/images/items/mutation_tombstone_lg.png?3",
      "dname": "Tombstone",
      "qual": "consumable",
      "cost": 0,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    },
    "super_blink": {
      "active": [
        {
          "name": "Blink",
          "desc": "Teleport to a target point up to 1200 units away."
        }
      ],
      "id": 1029,
      "img": "/apps/dota2/images/items/super_blink_lg.png?3",
      "dname": "Super Blink Dagger",
      "cost": null,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": 15,
      "lore": "The fabled dagger used by the fastest assassin ever to walk the lands.",
      "components": null,
      "created": false
    },
    "pocket_tower": {
      "id": 1030,
      "img": "/apps/dota2/images/items/pocket_tower_lg.png?3",
      "dname": "Pocket Tower",
      "cost": null,
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": 15,
      "lore": "",
      "components": null,
      "created": false
    },
    "diffusal_blade_2": {
      "id": 196,
      "img": "/apps/dota2/images/items/diffusal_blade_2_lg.png?3",
      "dname": "Diffusal Blade",
      "qual": "artifact",
      "cost": 3850,
      "desc": "Active: Purge Targets an enemy, removing buffs from the target and slowing it for 4 seconds.Range: 600\nPassive: ManabreakEach attack burns 50 mana from the target, and deals 0.8 physical damage per burned mana. Burns 16 mana per attack from melee illusions and 8 mana per attack from ranged illusions. Dispel Type: Basic Dispel",
      "notes": "Does not stack with other manabreak abilities.",
      "attrib": [
        {
          "key": "bonus_agility",
          "header": "",
          "value": [
            "25",
            "35"
          ],
          "footer": "Agility"
        },
        {
          "key": "bonus_intellect",
          "header": "",
          "value": [
            "10",
            "15"
          ],
          "footer": "Intelligence"
        },
        {
          "key": "initial_charges",
          "header": "INITIAL CHARGES:",
          "value": "8",
          "generated": true
        },
        {
          "key": "feedback_mana_burn",
          "header": "FEEDBACK MANA BURN:",
          "value": "50",
          "generated": true
        },
        {
          "key": "feedback_mana_burn_illusion_melee",
          "header": "FEEDBACK MANA BURN ILLUSION MELEE:",
          "value": "16",
          "generated": true
        },
        {
          "key": "feedback_mana_burn_illusion_ranged",
          "header": "FEEDBACK MANA BURN ILLUSION RANGED:",
          "value": "8",
          "generated": true
        },
        {
          "key": "purge_summoned_damage",
          "header": "PURGE SUMMONED DAMAGE:",
          "value": "99999",
          "generated": true
        },
        {
          "key": "purge_rate",
          "header": "PURGE RATE:",
          "value": "5",
          "generated": true
        },
        {
          "key": "purge_root_duration",
          "header": "PURGE ROOT DURATION:",
          "value": "3",
          "generated": true
        },
        {
          "key": "purge_slow_duration",
          "header": "PURGE SLOW DURATION:",
          "value": "4",
          "generated": true
        },
        {
          "key": "damage_per_burn",
          "header": "DAMAGE PER BURN:",
          "value": "0.8",
          "generated": true
        },
        {
          "key": "cast_range_tooltip",
          "header": "CAST RANGE TOOLTIP:",
          "value": "600",
          "generated": true
        }
      ],
      "mc": false,
      "cd": 4,
      "lore": "An enchanted blade that allows the user to cut straight into the enemy's soul.",
      "components": [
        "diffusal_blade",
        "recipe_diffusal_blade"
      ],
      "created": true
    },
    "recipe_iron_talon": {
      "id": 238,
      "img": "/apps/dota2/images/items/recipe_lg.png?3",
      "dname": "Iron Talon Recipe",
      "cost": 125,
      "desc": "",
      "notes": "",
      "attrib": [],
      "mc": false,
      "cd": false,
      "lore": "",
      "components": null,
      "created": false
    }
  }

  export default a;