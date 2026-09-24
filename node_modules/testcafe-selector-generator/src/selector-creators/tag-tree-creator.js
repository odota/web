import TESTCAFE_CORE from '../deps/testcafe-core';
import { BaseCreator } from './base-creator';
import { RULE_TYPE } from '../rules/rule-type';
import { SelectorDescriptor } from '../selector-descriptor';
import {
    getTagTreeFilterOptions, isHtmlOrBodyElement, getParentsUntil,
} from './utils/tag-tree-utils';
import { FilterOption } from '../selector-descriptor/filter-option';
import * as FILTER_OPTION_TYPE from '../selector-descriptor/filter-option-type';

const { domUtils, arrayUtils } = TESTCAFE_CORE;

export class TagTreeSelectorCreator extends BaseCreator {
    constructor () {
        super(RULE_TYPE.byTagTree);

        this.parents = [];
    }

    _shouldCreate (ancestorSelectorDescriptor) {
        const ancestor = ancestorSelectorDescriptor ?
            ancestorSelectorDescriptor.element : domUtils.findDocument(this.element).body;

        this.parents = getParentsUntil(this.element, ancestor);

        this.parents.push(ancestor);

        // NOTE: in some cases 'parentElement' is undefined for 'svg' element in IE
        return this.parents.length;
    }

    _getDescriptor (ancestorSelectorDescriptor) {
        let cssSelector   = '';
        let filterOptions = [];

        if (isHtmlOrBodyElement(this.element))
            filterOptions.push(new FilterOption(FILTER_OPTION_TYPE.byTag, domUtils.getTagName(this.element)));
        else
            filterOptions = getTagTreeFilterOptions(this.element, this.parents);

        if (ancestorSelectorDescriptor) {
            return new SelectorDescriptor({
                ruleType:                   this.type,
                element:                    this.element,
                ancestorSelectorDescriptor: ancestorSelectorDescriptor,
                filterOptions:              filterOptions,
            });
        }

        if (filterOptions.length) {
            cssSelector = filterOptions[0].filter;

            arrayUtils.splice(filterOptions, 0, 1);
        }

        return new SelectorDescriptor({
            ruleType:      this.type,
            element:       this.element,
            cssSelector:   cssSelector,
            filterOptions: filterOptions,
        });
    }
}
