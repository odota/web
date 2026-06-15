import { BaseCreator } from './base-creator';
import { RULE_TYPE } from '../rules/rule-type';
import { getAttributeValue } from './utils/attributes-watcher';
import { getAttributesDescriptor, CLASS_ATTRIBUTE_NAME } from './utils/attr-utils';

export class ClassSelectorCreator extends BaseCreator {
    constructor () {
        super(RULE_TYPE.byClassAttr);

        this.className = '';
    }

    _init () {
        this.className = getAttributeValue(this.element, CLASS_ATTRIBUTE_NAME);
    }

    _shouldCreate () {
        return !!this.className;
    }

    _getDescriptor () {
        return getAttributesDescriptor(this.type, this.element, [{
            name:  CLASS_ATTRIBUTE_NAME,
            value: this.className,
        }]);
    }
}
