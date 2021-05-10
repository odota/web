/* eslint-disable import/no-extraneous-dependencies, no-console, import/no-unresolved */
const request = require('request');
const fs = require('fs');
const vdf = require('simple-vdf');
// For updating the opendota-ui lang files with data from the vpk

const dontReplace = [
  'npc_dota_brewmaster_earth_#',
  'npc_dota_brewmaster_fire_#',
  'npc_dota_brewmaster_storm_#',
  'game_mode_22',
];

// links langTag to the language file in the vpk
// null indicates that dota does not support this language
const langTagNames = {
  'bg-BG': 'bulgarian',
  'cs-CZ': 'czech',
  'da-DK': 'danish',
  'de-DE': 'german',
  'el-GR': 'greek',
  // 'en-US': 'english', // commented out because we don't want to mess up the spacing
  'es-ES': 'spanish',
  'es-PE': 'spanish',
  'es-US': 'spanish',
  'fi-FI': 'finnish',
  'fr-FR': 'french',
  'he-IL': null,
  'hu-HU': 'hungarian',
  'it-IT': 'italian',
  'ja-JP': 'japanese',
  'ko-KR': 'korean',
  'ms-MY': null,
  'nl-NL': 'dutch',
  'no-NO': 'norwegian',
  'pl-PL': 'polish',
  'pt-BR': 'portuguese',
  'pt-PT': 'portuguese',
  'ro-RO': 'romanian',
  'ru-RU': 'russian',
  'sk-SK': null,
  'sr-SP': null,
  'sv-SE': 'swedish',
  'th-TH': 'thai',
  'tr-TR': 'turkish',
  'uk-UA': 'ukrainian',
  'vi-VN': null,
  'zh-CN': 'schinese',
  'zh-TW': 'tchinese',
};

// The rest of these are build later on
const replacements = {
  rune_0: 'DOTA_Tooltip_rune_doubledamage',
  rune_1: 'DOTA_Tooltip_rune_haste',
  rune_2: 'DOTA_Tooltip_rune_illusion',
  rune_3: 'DOTA_Tooltip_rune_invisibility',
  rune_4: 'DOTA_Tooltip_rune_regeneration',
  rune_5: 'DOTA_Tooltip_rune_bounty',
  rune_6: 'DOTA_Tooltip_rune_arcane',
};

const langDir = 'src/lang/';

let englishLang = null;
try {
  englishLang = JSON.parse(fs.readFileSync(`${langDir}en-US.json`, 'utf8'));
} catch (ex) {
  console.log("Couldn't find en-US.json in the specified directory");
  process.exit(1);
}


const updateLang = (langTag, langName) => {
  if (!langName) {
    return; // Means dota doesn't have this lang file
  }
  const stringsUrl = `https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/resource/dota_${langName}.json`;
  const langFilename = `${langDir}${langTag}.json`;

  request(stringsUrl, (err, resp, body) => {
    console.log(`${langTag} <= ${langName}`);
    if (err || resp.statusCode !== 200) {
      console.log(`Error ${resp.statusCode} when getting ${langName}: ${err}`);
      process.exit(1);
    }
    const strings = JSON.parse(body).lang.Tokens;

    let lang = null;
    try {
      lang = JSON.parse(fs.readFileSync(langFilename, 'utf8'));
    } catch (ex) {
      console.log(`${ex.name} when reading ${langTag}: ${ex.message}`);
      process.exit(1);
    }

    Object.keys(replacements).forEach((key) => {
      if ((!lang[key] || lang[key] === englishLang[key]) && (replacements[key] in strings)) {
        let result = strings[replacements[key]];
        if (['chatwheel_71', 'chatwheel_72'].indexOf(key) >= 0) {
          result = result.replace(/%s1/, strings.DOTA_Shared_Unit_Control_Hero);
        }
        lang[key] = result;
      }
    });

    let outString = JSON.stringify(lang, null, 2);
    // Fix "key": "value" to "key":"value", because thats how it is currently
    outString = outString.replace(/": "/g, '":"');

    fs.writeFile(langFilename, outString, 'utf8');
  });
};

// Build the rest of replacements here
// game modes
for (let i = 0; `game_mode_${i}` in englishLang; i += 1) {
  replacements[`game_mode_${i}`] = `game_mode_lobby_name_${i}`;
}
// npc_dota_(unitstrings)
Object.keys(englishLang).filter(k => k.match(/^npc_dota_/)).forEach((key) => {
  replacements[key] = key.replace('#', '1');
});
replacements.npc_dota_phoenix_sun = 'DOTA_Tooltip_ability_phoenix_supernova';
replacements.npc_dota_weaver_swarm = 'DOTA_Tooltip_ability_weaver_the_swarm';
// regions, chat wheel, & call update
request('https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/regions.json', (err, resp, body) => {
  if (err || resp.statusCode !== 200) {
    console.log('Error getting regions info from d2vpkr');
    process.exit(1);
  }
  const { regions } = JSON.parse(body);

  Object.keys(regions).forEach((key) => {
    replacements[`region_${regions[key].region}`] = regions[key].display_name.replace(/^#/, '');
  });
  request('https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/chat_wheel.txt', (_err, _resp, _body) => {
    if (_err || _resp.statusCode !== 200) {
      console.log('Error getting chat wheel info from d2vpkr');
      process.exit(1);
    }
    const chatWheel = vdf.parse(_body).chat_wheel.messages;

    Object.keys(chatWheel).forEach((key) => {
      if (chatWheel[key].message[0] === '#') {
        replacements[`chatwheel_${chatWheel[key].message_id}`] = chatWheel[key].message.replace(/^#/, '');
      }
    });

    // Remove ones we don't want to replace
    dontReplace.forEach((key) => {
      delete replacements[key];
    });
    console.log('Updating lang files...');
    Object.keys(langTagNames).forEach(tag => updateLang(tag, langTagNames[tag]));
  });
});
