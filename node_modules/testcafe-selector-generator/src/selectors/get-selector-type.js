const PARENT_CHILD_RULES_SEPARATOR = ' > ';

// NOTE: prior to introducing the selector prioritization,
// selectors only were able to have ruleType (parent-child).
// Currently selector has ruleType and ancestorRuleType.
export function getSelectorType (elementRuleType, ancestorRuleType) {
    return ancestorRuleType ?
        ancestorRuleType + PARENT_CHILD_RULES_SEPARATOR + elementRuleType :
        elementRuleType;
}
