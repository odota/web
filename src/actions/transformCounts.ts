import { patch } from "dotaconstants";
import { region } from "dotaconstants";
import { getPercentWin } from "../utility";
import store from "../store";

const patchLookup: Record<string, string> = {};
patch.forEach((patchElement, index) => {
  patchLookup[index] = patchElement.name;
});

export default function transformCounts(data: any) {
  const { strings } = store.getState().app;
  const countTypes = {
    patch: patchLookup,
    region,
    is_radiant: {
      0: strings.general_dire,
      1: strings.general_radiant,
    },
  };
  const result: Record<string, { name: string; list: any[] }> = {};
  Object.keys(data).forEach((key) => {
    // Translate each ID to a string
    result[key] = {
      name: key,
      list: Object.keys(data[key])
        .map((innerKey) => ({
          category:
            strings[`${key}_${innerKey}` as keyof Strings] ||
            (countTypes[key as keyof typeof countTypes] &&
              //@ts-expect-error
              countTypes[key as keyof typeof countTypes][innerKey]) ||
            innerKey,
          matches: data[key][innerKey].games,
          winPercent: getPercentWin(
            data[key][innerKey].win,
            data[key][innerKey].games,
          ),
        }))
        .sort((a, b) => b.category - a.category),
    };
  });
  return result;
}
