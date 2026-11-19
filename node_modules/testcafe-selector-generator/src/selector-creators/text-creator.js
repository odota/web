import TESTCAFE_CORE from '../deps/testcafe-core';
import { BaseCreator } from './base-creator';
import { RULE_TYPE } from '../rules/rule-type';
import { hasOwnTextForSelector, getOwnTextForSelector } from './utils/text-utils';
import { SelectorDescriptor } from '../selector-descriptor';
import { FilterOption } from '../selector-descriptor/filter-option';
import * as FILTER_OPTION_TYPE from '../selector-descriptor/filter-option-type';
import { getTextFilter } from '../selector-descriptor/filters';

const { domUtils } = TESTCAFE_CORE;

export class TextSelectorCreator extends BaseCreator {
    constructor () {
        super(RULE_TYPE.byText);

        this.elementText = '';
    }

    _init () {
        this.elementText = getOwnTextForSelector(this.element);
    }

    _shouldCreate () {
        return hasOwnTextForSelector(this.element, this.elementText);
    }

    _getDescriptor () {
        return new SelectorDescriptor({
            ruleType:      this.type,
            element:       this.element,
            cssSelector:   domUtils.getTagName(this.element),
            filterOptions: new FilterOption(FILTER_OPTION_TYPE.byText, this.elementText),
            filter:        getTextFilter(this.elementText),
        });
    }
}
