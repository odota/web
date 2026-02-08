// local imports
import addHandlers from './handlers';

/**
 * Creates a store enhancer based off an (optional) throttle time.
 * @arg {object} [options={calculateInitialState}] - Options object.
 * @arg {boolean} [options.calculateInitialState=true] - True if the responsive
 * state must be calculated initially, false otherwise.
 * @returns {function} - The store enhancer (which adds event listeners to
 * dispatch actions on window resize).
 */
export default (function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$calculateInitial = _ref.calculateInitialState,
        calculateInitialState = _ref$calculateInitial === undefined ? true : _ref$calculateInitial;

    // return the store enhancer (an enhanced version of `createStore`)
    return function (createStore) {
        return function () {
            // create the store
            var store = createStore.apply(undefined, arguments);
            // if there is a `window`
            if (typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined') {
                // add the handlers that only fire when the responsive state changes
                addHandlers({ store: store, window: window, calculateInitialState: calculateInitialState });
            }

            // return the store so that the call is transparent
            return store;
        };
    };
});