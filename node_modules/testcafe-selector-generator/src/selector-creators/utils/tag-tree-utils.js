import TESTCAFE_CORE from '../../deps/testcafe-core';
import { FilterOption } from '../../selector-descriptor/filter-option';
import * as FILTER_OPTION_TYPE from '../../selector-descriptor/filter-option-type';

const { domUtils, arrayUtils } = TESTCAFE_CORE;

function getNthFilterOptions (el, parent) {
    const index = domUtils.getElementIndexInParent(parent, el);

    const tagFilterOption = new FilterOption(FILTER_OPTION_TYPE.byTag, domUtils.getTagName(el));

    if (index === 0)
        return [tagFilterOption];

    const indexFilterOption = new FilterOption(FILTER_OPTION_TYPE.byIndex, index);

    return [tagFilterOption, indexFilterOption];
}

export function getParentsUntil (el, boundElement) {
    let parent    = el.parentElement;
    const parents = [];

    while (parent) {
        if (parent === boundElement)
            return parents;

        parents.push(parent);

        parent = parent.parentElement;
    }

    return parents;
}

export function getTagTreeFilterOptions (element, parents) {
    const filterOptions = arrayUtils.reverse(getNthFilterOptions(element, parents[0]));
    const parentLength  = parents.length;

    for (let i = 0; i < parentLength - 1; i++) {
        const currentParent            = parents[i];
        const parent                   = parents[i + 1];
        const [tagOption, indexOption] = getNthFilterOptions(currentParent, parent);

        if (indexOption)
            filterOptions.push(indexOption);

        filterOptions.push(tagOption);
    }

    return arrayUtils.reverse(filterOptions);
}

export function isHtmlOrBodyElement (element) {
    return /html|body/.test(domUtils.getTagName(element).toLowerCase());
}
