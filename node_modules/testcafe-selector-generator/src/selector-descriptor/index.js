import TESTCAFE_CORE from '../deps/testcafe-core';
import * as FILTER_OPTION_TYPE from './filter-option-type';
import { RULE_TYPE } from '../rules/rule-type';
import { FilterOption } from './filter-option';

const { domUtils, arrayUtils } = TESTCAFE_CORE;

function optionsToStringArray (options) {
    const strings = [];

    for (const option of options) {
        if (arrayUtils.indexOf(options, option) === 0)
            strings.push(`Selector('${option.filter}')`);
        else if (option.type === FILTER_OPTION_TYPE.byText)
            strings.push(`.withText('${option.filter}')`);
        else if (option.type === FILTER_OPTION_TYPE.byIndex)
            strings.push(`.nth(${option.filter})`);
        else if (option.type === FILTER_OPTION_TYPE.byTag)
            strings.push(`.find('${option.filter}')`);
        else if (option.type === FILTER_OPTION_TYPE.byAttr) {
            const attrValueString = option.filter.attrValueRe ? `, ${option.filter.attrValueRe}` : '';

            strings.push(`.withAttribute('${option.filter.attrName}'${attrValueString})`);
        }
    }

    return strings;
}

export class SelectorDescriptor {
    constructor (obj) {
        this.ruleType                   = obj.ruleType;
        this.isCustomRule               = obj.isCustomRule;
        this.element                    = obj.element;
        this.ancestorSelectorDescriptor = obj.ancestorSelectorDescriptor;
        this.cssSelector                = obj.cssSelector;
        this.filterOptions              = arrayUtils.concat([], obj.filterOptions || []);
        this.filter                     = obj.filter;

        this.stringArray = this._getStringArrayRepresentation();
    }

    get isCustom () {
        return this.ancestorSelectorDescriptor ?
            this.isCustomRule || this.ancestorSelectorDescriptor.isCustomRule :
            this.isCustomRule;
    }

    _getStringArrayRepresentation () {
        return optionsToStringArray(this._concatFilterOptions());
    }

    _addFilterByIndex (elements) {
        if (elements.length > 1) {
            const elementIndex = arrayUtils.indexOf(elements, this.element);

            if (elementIndex !== 0)
                this.filterOptions.push(new FilterOption(FILTER_OPTION_TYPE.byIndex, elementIndex));
        }
    }

    _concatFilterOptions () {
        const ancestorSelectorDescriptor = this.ancestorSelectorDescriptor;

        let initialOptions = [];

        if (ancestorSelectorDescriptor) {
            const ancestorOptions = ancestorSelectorDescriptor._concatFilterOptions();

            initialOptions = ancestorOptions;
        }

        if (this.cssSelector)
            initialOptions.push(new FilterOption(FILTER_OPTION_TYPE.byTag, this.cssSelector));

        const concatenatedOpts = arrayUtils.concat(initialOptions, this.filterOptions);

        return arrayUtils.reduce(concatenatedOpts, (options, option) => {
            if (option.type === FILTER_OPTION_TYPE.byTag && options.length) {
                const lastOption = options[options.length - 1];

                if (lastOption.type === FILTER_OPTION_TYPE.byTag) {
                    options[options.length - 1] = lastOption.concat(option);
                    return options;
                }
            }

            options.push(option);

            return options;
        }, []);
    }

    _getElements () {
        // NOTE: we should not check the receipt of an element for a selector
        // composed by tag tree because it cannot returns wrong result
        if (this.ruleType === RULE_TYPE.byTagTree)
            return [this.element];

        const ancestor = this.ancestorSelectorDescriptor ? this.ancestorSelectorDescriptor.element : domUtils.findDocument(this.element);
        let elements   = null;

        if (this.cssSelector) {
            // NOTE: querySelectorAll method can raise error in case of invalid markup
            // (e.g. id attribute starts with number)
            try {
                /* eslint-disable no-eval */
                const evaluatedString = window.eval(`(function(){return '${this.cssSelector}';})();`);
                /* eslint-enable no-eval */

                elements = arrayUtils.from(ancestor.querySelectorAll(evaluatedString));
            }

            catch (err) {
                return null;
            }
        }
        else
            elements = [ancestor];

        elements = elements.length && this.filter ? this.filter(elements) : elements;

        if (elements.length === 0 || arrayUtils.indexOf(elements, this.element) === -1)
            return [];

        return elements;
    }

    static createFromInstance (descriptor, ancestorSelectorDescriptor) {
        return new SelectorDescriptor({
            ancestorSelectorDescriptor: ancestorSelectorDescriptor,
            cssSelector:                descriptor.cssSelector,
            element:                    descriptor.element,
            filter:                     descriptor.filter,
            filterOptions:              [].concat(descriptor.filterOptions || []),
            isCustomRule:               descriptor.isCustomRule,
            ruleType:                   descriptor.ruleType,
        });
    }

    makeUnique () {
        const ancestorSelectorDescriptor = this.ancestorSelectorDescriptor;
        const ancestorElements           = ancestorSelectorDescriptor ? ancestorSelectorDescriptor._getElements() : [];
        const elements                   = !ancestorSelectorDescriptor || ancestorElements ? this._getElements() : null;

        if (elements) {
            if (ancestorSelectorDescriptor)
                ancestorSelectorDescriptor._addFilterByIndex(ancestorElements);

            this._addFilterByIndex(elements);

            this.stringArray = this._getStringArrayRepresentation();
        }
    }
}
