import hammerhead from '../../deps/hammerhead';
import TESTCAFE_CORE from '../../deps/testcafe-core';

const { domUtils } = TESTCAFE_CORE;

const trim          = hammerhead.utils.trim;
const nativeMethods = hammerhead.nativeMethods;


const ELEMENTS_WITH_TEXT_RE       = /^i$|^b$|^big$|^small$|^em$|^strong$|^dfn$|^code$|^samp$|^kbd$|^var$|^cite$|^abbr$|^acronym$|^sub$|^sup$|span$|^bdo$|^address$|^div$|^a$|^object$|^p$|^h\d$|^pre$|^q$|^ins$|^del$|^dt$|^dd$|^li$|^label$|^option$|^fieldset$|^legend$|^button$|^caption$|^td$|^th$|^title$/;
const MAX_TEXT_LENGTH_IN_SELECTOR = 50;
const SYMBOLS_TO_ESCAPE_RE        = /['"\\]/g;
const PROHIBITED_TEXT_SYMBOL_RE   = /\r?\n|\r/i;

function getTextPart (text) {
    text = text.trim().replace(SYMBOLS_TO_ESCAPE_RE, '\\$&');

    const endMatch = PROHIBITED_TEXT_SYMBOL_RE.exec(text);
    const endIndex = endMatch ? endMatch.index : text.length;

    return trim(text.substring(0, Math.min(endIndex, MAX_TEXT_LENGTH_IN_SELECTOR)));
}

export function hasOwnTextForSelector (el, elementText) {
    if (!ELEMENTS_WITH_TEXT_RE.test(domUtils.getTagName(el)))
        return '';

    elementText = trim(elementText.replace(/\s+/g, ' '));

    return /\S/.test(elementText);
}

export function getOwnTextForSelector (el) {
    /*eslint-disable-next-line no-restricted-properties*/
    const text = domUtils.isHtmlElement(el) ? nativeMethods.htmlElementInnerTextGetter.call(el) : el.innerText;

    if (text)
        return getTextPart(text);

    if (domUtils.isOptionElement(el)) {
        const optionText = nativeMethods.nodeTextContentGetter.call(el);

        return optionText ? getTextPart(optionText) : '';
    }

    return '';
}
