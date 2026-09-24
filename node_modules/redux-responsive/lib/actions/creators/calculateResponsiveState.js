// action type
import { CALCULATE_RESPONSIVE_STATE } from '../types';

/**
 * Action creator taking window-like object and returning action to calculate
 * responsive state.
 * @arg {object} window - Any window-like object (has keys `innerWidth` and
 * `matchMedia`).
 * @arg {number} window.innerWidth - The value for the browser width (to pass to
 * the responsive state reducer logic).  See browser global `window.innerWidth`.
 * @arg {function} window.matchMedia - The method with which to match media
 * queries (to pass to the responsive sate reducer logic).  See global
 * `window.matchMedia`.
 * @returns {object} The resulting action.  Action will have type
 * `CALCULATE_RESPONSIVE_STATE`, and will be directly given the two keys taken
 * from the `window` argument.
 */
export default (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      innerWidth = _ref.innerWidth,
      innerHeight = _ref.innerHeight,
      matchMedia = _ref.matchMedia;

  return {
    type: CALCULATE_RESPONSIVE_STATE,
    innerWidth: innerWidth,
    innerHeight: innerHeight,
    matchMedia: matchMedia
  };
});