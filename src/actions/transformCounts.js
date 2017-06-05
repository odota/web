import patch from 'dotaconstants/build/patch.json';
import region from 'dotaconstants/build/region.json';
import {
  getPercentWin,
} from 'utility';
import strings from 'lang';

const patchLookup = {};
patch.forEach((patchElement, index) => {
  patchLookup[index] = patchElement.name;
});

const countTypes = {
  patch: patchLookup,
  region,
  is_radiant: {
    0: strings.general_dire,
    1: strings.general_radiant,
  },
};

export default function transformCounts(data) {
  const result = {};
  Object.keys(data).forEach((key) => {
    // Translate each ID to a string
    result[key] = {
      name: key,
      list: Object.keys(data[key])
        .map(innerKey => ({
          category: strings[`${key}_${innerKey}`] || (countTypes[key] && countTypes[key][innerKey]) || innerKey,
          matches: data[key][innerKey].games,
          winPercent: getPercentWin(data[key][innerKey].win, data[key][innerKey].games),
        })).sort((a, b) => b.category - a.category),
    };
  });
  return result;
}
