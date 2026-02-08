import { hasSelectorConstructor } from './has-selector-constructor';
import { RULE_TYPE } from './rule-type';
import { getExpressionValue } from './get-expression-value';

/*eslint-disable no-restricted-properties*/
export function saveEditedSelector (currentSelector, selectors = [], options = {}) {
    //TODO: name?
    const {
        useConstructor = true,
        handlers = {},
    } = options;

    const selectorValue = getExpressionValue(currentSelector);

    const shouldSaveAsObject = !currentSelector.type && (useConstructor || hasSelectorConstructor(currentSelector));
    const selector           = shouldSaveAsObject ? { type: 'js-expr', value: selectorValue } : currentSelector;

    const findSelectorByPredicate = predicate => {
        if (handlers.find)
            return handlers.find(selectors, predicate);

        return selectors.find ? selectors.find(predicate) : null;
    };

    const editedSelector = findSelectorByPredicate(sel => sel && sel.ruleType === RULE_TYPE.edited);

    const existingSelector = findSelectorByPredicate(sel => {
        return sel.rawSelector && getExpressionValue(sel.rawSelector) === selectorValue;
    });

    const needRemoveEditedSelector = editedSelector && (existingSelector || !selectorValue);

    if (needRemoveEditedSelector) {
        if (handlers.remove)
            handlers.remove(selectors, editedSelector);
        else if (selectors.splice)
            selectors.splice(selectors.indexOf(editedSelector), 1);
        return;
    }

    if (editedSelector) {
        editedSelector.rawSelector = selector;
        return;
    }

    const newItem = {
        rawSelector: selector,
        ruleType:    RULE_TYPE.edited,
    };

    if (handlers.addFirst)
        handlers.addFirst(selectors, newItem);
    else if (selectors.splice)
        selectors.splice(0, 0, newItem);
}
