import { isChildRuleCompoundable, isAncestorRuleCompoundable } from './compound-utils';
import { getSelectorType } from '../selectors/get-selector-type';

const DEFAULT_PRIORITY = 1;

export function calculateRulesPriority (rules) {
    const priority   = {};
    let rulePriority = DEFAULT_PRIORITY;

    for (const ancestorRule of rules) {
        priority[ancestorRule.type] = rulePriority++;

        if (isAncestorRuleCompoundable(ancestorRule)) {
            for (const childRule of rules) {
                if (isChildRuleCompoundable(childRule)) {
                    const resultRuleType = getSelectorType(childRule.type, ancestorRule.type);

                    priority[resultRuleType] = rulePriority++;
                }
            }
        }
    }

    return priority;
}
