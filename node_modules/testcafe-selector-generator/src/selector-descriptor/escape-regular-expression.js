// NOTE: taken from hammerhead i.e. https://github.com/benjamingr/RegExp.escape
const SYMBOLS_TO_ESCAPE_RE = /[\\^$*+?.()|[\]{}]/g;

export function escapeRe (str) {
    return str.replace(SYMBOLS_TO_ESCAPE_RE, '\\$&');
}
