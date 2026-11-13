import { RULE_TYPE } from './rule-type';
import { SelectorRule } from './selector-rule';

export const DEFAULT_SELECTOR_RULES = [
    new SelectorRule(RULE_TYPE.byTagName),
    new SelectorRule(RULE_TYPE.byId),
    new SelectorRule(RULE_TYPE.byText),
    new SelectorRule(RULE_TYPE.byClassAttr),
    new SelectorRule(RULE_TYPE.byAttr),
    new SelectorRule(RULE_TYPE.byTagTree),
];
