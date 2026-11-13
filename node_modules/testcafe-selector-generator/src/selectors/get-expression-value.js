/* eslint-disable no-restricted-properties */
export function getExpressionValue (expr) {
    return expr && expr.type === 'js-expr' ? expr.value : expr;
}
