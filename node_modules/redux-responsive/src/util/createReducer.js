// third party imports
import MediaQuery from 'mediaquery'
// local imports
import CALCULATE_RESPONSIVE_STATE from '../actions/types/CALCULATE_RESPONSIVE_STATE'

// default breakpoints
export const defaultBreakpoints = {
    extraSmall: 480,
    small: 768,
    medium: 992,
    large: 1200,
}
// media type to default to when no `window` present
const defaultMediaType = 'infinity'
// orientation to default to when no `window` present
const defaultOrientation = null

// a lightweight version of lodash.transform
const transform = (obj, f) => {
    // a place to mutate
    const internal = {}
    // basically we have to reduce the keys down to an object and pass the k/v pairs to each f
    Object.keys(obj).forEach(key => f(internal, obj[key], key))
    // return the object we've been building up
    return internal
}

/**
 * Compute a mapping of media type to its ordering where ordering is defined
 * such that large > medium > small.
 * @args (object) breakpoints - the breakpoint object
 */
export function getOrderMap(bps) {
    // grab the keys in the appropriate order
    const keys = Object.keys(bps).sort((a, b) => {
        // get the associated values
        const valueA = bps[a]
        const valueB = bps[b]

        // if a is a number and b is a string
        if (typeof valueA === 'number' && typeof valueB === 'string') {
            // put the number first
            return -1
        } else if (typeof valueB === 'number' && typeof valueA === 'string') {
            // return the number first
            return 1
        }

        // otherwise treat it like normal
        return valueA >= valueB ? 1 : -1
    })

    // map the original breakpoint object
    return transform(bps, (result, breakpoint, mediaType) => {
        // figure out the index of the mediatype
        const index = keys.indexOf(mediaType)

        // if there is an entry in the sort for this
        if (index !== -1) {
            // to its index in the sorted list
            result[mediaType] = index
        }
    })
}

/**
 * Compute the `lessThan` object based on the browser width.
 * @arg {number} browserWidth - Width of the browser.
 * @arg {object} breakpoints - The breakpoints object.
 * @arg {currentMediaType} breakpoints - The curent media type.
 * @returns {object} The `lessThan` object.  Its keys are the same as the
 * keys of the breakpoints object.  The value for each key indicates whether
 * or not the browser width is less than the breakpoint.
 */
export function getLessThan(currentMediaType, breakpointOrder) {
    // get the ordering of the current media type
    const currentOrder = breakpointOrder[currentMediaType]

    return transform(breakpointOrder, (result, breakpoint, mediaType) => {
        // if the breakpoint is a number
        if (typeof breakpoint === 'number' && breakpointOrder[mediaType]) {
            // store whether or not it is less than the breakpoint
            result[mediaType] = currentOrder < breakpointOrder[mediaType]
            // handle non numerical breakpoints specially
        } else {
            result[mediaType] = false
        }
    })
}

/**
 * Compute the `lessThan` object based on the browser width.
 * @arg {object} breakpoints - The breakpoints object.
 * @arg {currentMediaType} breakpoints - The curent media type.
 * @returns {object} The `lessThan` object.  Its keys are the same as the
 * keys of the breakpoints object.  The value for each key indicates whether
 * or not the browser width is less than the breakpoint.
 */
export function getIs(currentMediaType, breakpoints) {
    return transform(breakpoints, (result, breakpoint, mediaType) => {
        // store whether or not the current media type matches the breakpoint in the mapping
        result[mediaType] = mediaType === currentMediaType
    })
}

/**
 * Compute the `greaterThan` object based on the browser width.
 * @arg {number} browserWidth - Width of the browser.
 * @arg {object} breakpoints - The breakpoints object.
 * @returns {object} The `greaterThan` object.  Its keys are the same as the
 * keys of the breakpoints object.  The value for each key indicates whether
 * or not the browser width is greater than the breakpoint.
 */
export function getGreaterThan(currentMediaType, breakpointOrder) {
    // get the ordering of the current media type
    const currentOrder = breakpointOrder[currentMediaType]

    return transform(breakpointOrder, (result, breakpoint, mediaType) => {
        // if the breakpoint is a number
        if (typeof breakpoint === 'number') {
            // store whether or not it is less than the breakpoint
            result[mediaType] = currentOrder > breakpointOrder[mediaType]
            // handle non numerical breakpoints specially
        } else {
            result[mediaType] = false
        }
    })
}

/**
 * Gets the current media type from the global `window`.
 * @arg {object} mediaQueries - The media queries object.
 * @arg {string} infinityMediaType - The infinity media type.
 * @returns {string} The window's current media type.  This is the key of the
 * breakpoint that is the next breakpoint larger than the window.
 */
function getMediaType(matchMedia, mediaQueries, infinityMediaType) {
    // if there's no window
    if (typeof matchMedia === 'undefined') {
        // return the infinity media type
        return infinityMediaType
    }

    // there is a window, so compute the true media type
    return Object.keys(mediaQueries).reduce((result, query) => {
        // return the new type if the query matches otherwise the previous one
        return matchMedia(mediaQueries[query]).matches ? query : result
        // use the infinity media type
    }, infinityMediaType)
}

/**
 * Gets the current media type from the global `window`.
 * @arg {object} mediaQueries - The media queries object.
 * @returns {string} The window's current media type.  This is the key of the
 * breakpoint that is the next breakpoint larger than the window.
 */
function getOrientation(matchMedia) {
    // if there's no window
    if (typeof matchMedia === 'undefined') {
        // return the default
        return defaultOrientation
    }

    const mediaQueries = {
        portrait: '(orientation: portrait)',
        landscape: '(orientation: landscape)',
    }

    // there is a window, so compute the true orientation
    return Object.keys(mediaQueries).reduce((result, query) => {
        // return the new type if the query matches otherwise the previous one
        return matchMedia(mediaQueries[query]).matches ? query : result
        // use the default orientation
    }, defaultOrientation)
}

// export the reducer factory
export default (
    breakpoints,
    { initialMediaType, infinity = defaultMediaType, extraFields = () => ({}) } = {}
) => {
    // accept null values
    if (!breakpoints) {
        breakpoints = defaultBreakpoints // eslint-disable-line
    }

    // add `infinity` breakpoint for upper bound
    breakpoints[infinity] = Infinity
    // media queries associated with the breakpoints
    const mediaQueries = MediaQuery.asObject(breakpoints)
    // figure out the ordering
    const mediaOrdering = getOrderMap(breakpoints)

    // return reducer for handling the responsive state
    return (state, { type, matchMedia }) => {
        // if told to recalculate state or state has not yet been initialized
        if (type === CALCULATE_RESPONSIVE_STATE || typeof state === 'undefined') {
            // if the state has never been set before and we have an initial type
            const mediaType =
                !state && initialMediaType
                    ? // use it
                      initialMediaType
                    : // otherwise figure out the media type from the browser
                      getMediaType(matchMedia, mediaQueries, infinity)
            // the current orientation
            const orientation = getOrientation(matchMedia)
            // build the responsive state
            const responsiveState = {
                _responsiveState: true,
                lessThan: getLessThan(mediaType, mediaOrdering),
                greaterThan: getGreaterThan(mediaType, mediaOrdering),
                is: getIs(mediaType, breakpoints),
                mediaType,
                orientation,
                breakpoints,
            }

            // return calculated state
            return {
                ...responsiveState,
                ...extraFields(responsiveState),
            }
        }
        // otherwise return the previous state
        return state
    }
}
