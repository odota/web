/* eslint-disable sort-keys */
// TODO: users should be able to call a custom-attr 'text' for example
// and the name 'class-dom' should not be considered as default compound rule but as custom attr.
export const RULE_TYPE = {
    edited: '$edited$',

    byTagName:   '$tagName$',
    byId:        'id',
    byText:      '$text$',
    byClassAttr: 'class',
    byAttr:      '$attr$',
    byTagTree:   '$dom$',
};

