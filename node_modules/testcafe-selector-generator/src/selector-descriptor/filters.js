import TESTCAFE_CORE from '../deps/testcafe-core';
import hammerhead from '../deps/hammerhead';

import { escapeRe } from './escape-regular-expression';

const { selectorAttributeFilter, arrayUtils } = TESTCAFE_CORE;

const nativeMethods = hammerhead.nativeMethods;

export function makeRegExp (str) {
    return typeof str === 'string' ? new RegExp(escapeRe(str)) : str;
}

export function getTextFilter (text) {
    return elements => {
        return arrayUtils.filter(elements, el => {
            const elementText = nativeMethods.htmlElementInnerTextGetter.call(el) ||
                                nativeMethods.nodeTextContentGetter.call(el);

            return elementText.indexOf(text) > -1;
        });
    };
}

export function getAttributeRegExpFilter ({ attrName, attrValueRe }) {
    return elements => {
        return arrayUtils.filter(elements, el => selectorAttributeFilter(el, 0, void 0, makeRegExp(attrName), makeRegExp(attrValueRe)));
    };
}
