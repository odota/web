import { BaseCreator } from './base-creator';
import { getCustomAttributeForSelector } from './utils/attributes-watcher';
import { getAttributesDescriptor } from './utils/attr-utils';

export class CustomAttrSelectorCreator extends BaseCreator {
    constructor (attrName) {
        super(attrName);

        this.attrName          = attrName;
        this.elementAttributes = [];
    }

    _init () {
        const attr = getCustomAttributeForSelector(this.element, this.attrName);

        this.elementAttributes = attr ? [attr] : [];
    }

    _shouldCreate () {
        return !!this.elementAttributes.length;
    }

    _getDescriptor () {
        const descriptor = getAttributesDescriptor(this.type, this.element, this.elementAttributes);

        descriptor.isCustomRule = true;

        return descriptor;
    }
}
