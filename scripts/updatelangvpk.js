const request = require('request');
const fs = require('fs');
// For updating the opendota-ui lang files with data from the vpk


// links lang_tag to the language file in the vpk
// null indicates that dota does not support this language
const lang_tag_names = {
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
  'tr-TR': 'turkish',
  'uk-UA': 'ukrainian',
  'vi-VN': null,
  'zh-CN': 'schinese',
  'zh-TW': 'tchinese'
}

const lang_dir = "src/lang/";

try {
  var english_lang = JSON.parse(fs.readFileSync(`${lang_dir}en-US.json`, 'utf8'));
} catch(ex) {
  console.log("Couldn't find en-US.json in the specified directory")
  process.exit(1);
}


// Build Replacements
// game modes
var replacements = {
  rune_0: "DOTA_Tooltip_rune_doubledamage",
  rune_1: "DOTA_Tooltip_rune_haste",
  rune_2: "DOTA_Tooltip_rune_illusion",
  rune_3: "DOTA_Tooltip_rune_invisibility",
  rune_4: "DOTA_Tooltip_rune_regeneration",
  rune_5: "DOTA_Tooltip_rune_bounty",
  rune_6: "DOTA_Tooltip_rune_arcane"
};



console.log("Updating lang files...");

const updateLang = (lang_tag, lang_name) => {
  if(!lang_name){
    return; // Means dota doesn't have this lang file
  }
  var strings_url = `https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/resource/dota_${lang_name}.json`;
  var lang_filename = `${lang_dir}${lang_tag}.json`;

  request(strings_url, (err, resp, body) => {
    console.log(`${lang_tag} <= ${lang_name}`);
    if (err || resp.statusCode !== 200) {
      console.log(`Error ${resp.statusCode} when getting ${lang_name}: ${err}`)
      process.exit(1);
    }
    var strings = JSON.parse(body).lang.Tokens;

    try {
      var lang = JSON.parse(fs.readFileSync(lang_filename, 'utf8'));
    } catch(ex) {
      console.log(`${ex.name} when reading ${lang_tag}: ${ex.message}`)
      process.exit(1);
    }

    Object.keys(replacements).forEach(key => {
      if((!english_lang[key] || lang[key] === english_lang[key]) && (replacements[key] in strings)) {
        lang[key] = strings[replacements[key]];
      }
    });

    var outString = JSON.stringify(lang, null, 2)
    // Fix "key": "value" to "key":"value", because thats how it is currently
    outString = outString.replace(/": "/g, `":"`); 
    
    fs.writeFile(lang_filename, outString, 'utf8');
  });
};

Object.keys(lang_tag_names).forEach(tag => updateLang(tag, lang_tag_names[tag]));


