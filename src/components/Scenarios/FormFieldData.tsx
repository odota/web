import { heroes, items } from 'dotaconstants';
import { getTimeRange } from './ScenariosColumns';

export default function getFormFieldData(metadata: any, strings: Strings) {
  const { teamScenariosQueryParams, itemCost, gameDurationBucket, timings } =
    metadata;
  return {
    heroList: Object.keys(heroes)
      .map((id) => ({
        text:
          heroes[id as keyof Heroes] &&
          heroes[id as keyof Heroes].localized_name,
        value: Number(id),
      }))
      .sort((a: any, b: any) => a.text && a.text.localeCompare(b.text)),

    itemList: Object.keys(items)
      .filter(
        (item) =>
          (items[item as keyof Items]?.cost ?? 0) >= itemCost &&
          !item.startsWith('recipe_'),
      )
      .map((item) => ({
        //@ts-expect-error
        text: items[item as keyof Items]?.dname,
        value: item,
      }))
      .sort((a, b) => a.text && a.text.localeCompare(b.text)),

    laneRoleList: [1, 2, 3, 4].map((role) => ({
      text: strings[`lane_role_${role}` as keyof Strings],
      value: role.toString(),
    })),

    miscList: teamScenariosQueryParams.map((scenario: string) => ({
      text: strings[`scenarios_${scenario}` as keyof Strings],
      value: scenario,
    })),

    gameDurationList: gameDurationBucket.map((time: number) => ({
      text: getTimeRange(time, gameDurationBucket),
      value: time.toString(),
    })),

    timingList: timings.map((time: number) => ({
      text: getTimeRange(time, timings),
      value: time.toString(),
    })),
  };
}
