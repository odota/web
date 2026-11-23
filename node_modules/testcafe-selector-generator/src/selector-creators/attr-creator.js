import { BaseCreator } from './base-creator';
import { RULE_TYPE } from '../rules/rule-type';
import { getAttributesForSelector } from './utils/attributes-watcher';
import { getAttributesDescriptor } from './utils/attr-utils';

export class AttrSelectorCreator extends BaseCreator {
    constructor (customAttrNames = []) {
        super(RULE_TYPE.byAttr);

        this.customAttrNames   = customAttrNames;
        this.elementAttributes = [];
    }

    _init () {
        this.elementAttributes = getAttributesForSelector(this.element, this.customAttrNames);
    }

    _shouldCreate () {
        return !!this.elementAttributes.length;
    }

    _getDescriptor () {
        return getAttributesDescriptor(this.type, this.element, this.elementAttributes);
    }
}
