// external imports

/*
 styles are passed as objects with the following form:
    elementName: {
        ...normal styles,
        _lessThan_medium: {
            backgroundColor: 'blue'
        },
        _greaterThan_large: {
            color: 'red,'
        },
        _equal_medium: {
            border: '1px solid black',
        }
    },
    anotherElement: {...},

 */

// retrieve the data for the given pattern
export const parsePattern = pattern => {
    // separate out the various bits of data
    const [comparison, size] = pattern.split('_').slice(1)
    // return the results
    return { comparison, size }
}

// this function returns true if the browser state matches the one
// designated by the pattern.
//
// patterns are of the form _(comparison)_(size). ie: _lessThan_medium
export const browserMatches = (browser, pattern) => {
    const { comparison, size } = parsePattern(pattern)
    // return the value of the appropriate entry in the browser state
    try {
        return comparison === 'equal'
            ? browser.mediaType === size
            : browser[comparison][size] || false
        // if anything goes wrong
    } catch (e) {
        return false
    }
}

// this function sorts the style keys so they are applied in the correct order
// for less than criteria, the styles are sorted highest to lowest
// for greater than criteria, the styles are storted lowest to highest
export const sortKeys = (keys, breakpoints) => {
    // sort the keys
    const mapped = keys.map(key => {
        // if the key is a custom style
        if (key[0] !== '_') {
            // deal with it first
            return { key, sort: 0 }
        }
        // otherwise the key is a responsive style

        // grab the data for the style
        const { comparison, size } = parsePattern(key)
        // DRY
        const nBreakpoints = breakpoints.length
        // start off sorting by ascending order to match breakpoints
        let sortValue = breakpoints.indexOf(size) + nBreakpoints

        // make sure equals checks come last
        if (comparison === 'equal') {
            // offset it by a lot
            /* eslint-disable space-infix-ops, space-unary-ops */
            sortValue = +3 * nBreakpoints
            /* eslint-enable space-infix-ops space-unary-ops */
            // make sure lessThans come after greaterThans
        } else if (comparison === 'lessThan') {
            // by offsetting them all and inverting the placement
            sortValue = 2 * nBreakpoints - sortValue
        }

        // return the sort index
        return { key, sort: sortValue }
    })

    return mapped.sort(({ sort: sortA }, { sort: sortB }) => sortA - sortB).map(({ key }) => key)
}

// this function takes the current state of the browser and
// returns a function that creates a stylesheet to match
export const transformStyle = browser => style => {
    // the stylesheet
    const stylesheet = {}
    // sort the breakpoints
    const breakpoints = Object.keys(browser.breakpoints).sort(
        // in ascending order
        (a, b) => browser.breakpoints[a] - browser.breakpoints[b]
    )
    // sort the keys in reverse alphabetical order so we see modifiers last
    const keys = sortKeys(Object.keys(style), breakpoints)
    // go over every key in the provided sheet
    for (const key of keys) {
        // if the is not a special one
        if (key[0] !== '_') {
            // add the key to the one we're building up
            stylesheet[key] = style[key]
            // otherwise we have to process the stylesheet
            // check if the browser matches the state designated by the string
        } else if (browserMatches(browser, key)) {
            // merge the contents of the sub-style into the parent
            Object.assign(stylesheet, style[key])
        }
    }
    // return the stylesheet we've created
    return stylesheet
}

// this function calculates the current stylesheet based on the responsive
// state of the reducer
export const mapStateToPropsFactory = (stylesheet, { reducerName } = defaultOptions) => (
    state,
    props
) => {
    // find the relevant state in the reducer
    const browser = state[reducerName]

    // if we are passed a functional stylesheet, hand it the component props, otherwise just use the object
    const sheet = typeof stylesheet === 'function' ? stylesheet(browser, props) : stylesheet

    // the function to mutate values
    const transformValue = transformStyle(browser)

    // the stylesheet only differs by values of
    return {
        styles: Object.keys(sheet).reduce(
            (prev, key) => ({
                ...prev,
                [key]: transformValue(sheet[key]),
            }),
            {}
        ),
    }
}

// the default options
const defaultOptions = {
    reducerName: 'browser',
}

// export a higher order component
export default (stylesheet, opts) => component =>
    require('react-redux').connect(
        // eslint-disable-line no-undef
        mapStateToPropsFactory(stylesheet, { ...defaultOptions, ...opts })
    )(component)
