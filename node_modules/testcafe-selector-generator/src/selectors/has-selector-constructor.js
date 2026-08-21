export function hasSelectorConstructor (selector) {
    return selector.trim().indexOf('Selector(') === 0;
}
