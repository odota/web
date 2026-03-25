/* eslint-disable no-useless-escape */
export function escapeAttrValue (text) {
    return text
        .replace(/\\/g, '\\\\\\$&')
        .replace(/'/g, '\\\\\\$&')
        .replace(/"/g, '\\\\$&');
}

export function escapeSpecifiedSymbols (text) {
    return text
        .replace(/\\/g, '\\\\\\$&')
        .replace(/'/g, '\\\\\\$&')
        .replace(/(\!|#|"|\$|%|&|\(|\||\)|\*|\+|,|\.|\/|:|;|<|=|>|\?|@|\[|\]|\^|`|{|\||}|~)/g, '\\\\$&');
}

export function escapeIdValue (idValue) {
    return escapeSpecifiedSymbols(idValue).replace(/\s/g, '\\\\ ');
}

export function escapeValueForSelectorWithRegExp (text) {
    return text
        .replace(/'|"|\\|\||\-|\*|\?|\+|\^|\$|\[|\]/g, '\\$&')
        .replace(/\(|\)/g, '\\S');
}
