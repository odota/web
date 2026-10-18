// local imports
import addHandlers from './handlers'

/**
 * Creates a store enhancer based off an (optional) throttle time.
 * @arg {object} [options={calculateInitialState}] - Options object.
 * @arg {boolean} [options.calculateInitialState=true] - True if the responsive
 * state must be calculated initially, false otherwise.
 * @returns {function} - The store enhancer (which adds event listeners to
 * dispatch actions on window resize).
 */
export default ({ calculateInitialState = true } = {}) => {
    // return the store enhancer (an enhanced version of `createStore`)
    return createStore => (...args) => {
        // create the store
        const store = createStore(...args)
        // if there is a `window`
        if (typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined') {
            // add the handlers that only fire when the responsive state changes
            addHandlers({ store, window, calculateInitialState })
        }

        // return the store so that the call is transparent
        return store
    }
}
