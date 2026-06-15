import TESTCAFE_CORE from '../deps/testcafe-core';

import { RULE_TYPE } from '../rules/rule-type';

const { arrayUtils } = TESTCAFE_CORE;

const COMPOUNDABLE_ANCESTOR_RULE_TYPES = [
    RULE_TYPE.byTagName,
    RULE_TYPE.byId,
    RULE_TYPE.byClassAttr,
    RULE_TYPE.byAttr,
];

const COMPOUNDABLE_CHILD_RULE_TYPES = [
    RULE_TYPE.byText,
    RULE_TYPE.byClassAttr,
    RULE_TYPE.byAttr,
    RULE_TYPE.byTagTree,
];

export function isSelectorDescriptorCompoundable (selectorDescriptor) {
    return selectorDescriptor.isCustomRule ||
           arrayUtils.indexOf(COMPOUNDABLE_CHILD_RULE_TYPES, selectorDescriptor.ruleType) !== -1 &&
           selectorDescriptor.ruleType !== RULE_TYPE.byTagTree;
}

export function isChildRuleCompoundable (rule) {
    return rule.editable || arrayUtils.indexOf(COMPOUNDABLE_CHILD_RULE_TYPES, rule.type) !== -1;
}

export function isAncestorRuleCompoundable (rule) {
    return rule.editable || arrayUtils.indexOf(COMPOUNDABLE_ANCESTOR_RULE_TYPES, rule.type) !== -1;
}
