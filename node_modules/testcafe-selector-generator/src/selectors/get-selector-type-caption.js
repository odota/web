import { getSelectorType } from './get-selector-type';
import { RULE_TYPE } from './rule-type';

const DEFAULT_SELECTOR_TYPE_RE = /^\$([\s\S]+)\$$/;

function getTypeCaption (type) {
    const matchRes = type.match(DEFAULT_SELECTOR_TYPE_RE);

    // NOTE: e.g. '$text$' -> 'text'
    return matchRes ? matchRes[1] : type;
}

export function getSelectorTypeCaption (elementRuleType = '', ancestorRuleType = '') {
    if (elementRuleType === RULE_TYPE.edited)
        return `(${getTypeCaption(elementRuleType)})`;

    return getSelectorType(getTypeCaption(elementRuleType), getTypeCaption(ancestorRuleType));
}
