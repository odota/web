// see: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries

// external imports
import MediaQuery from 'mediaquery'
// local imports
import { calculateResponsiveState } from '../actions/creators'
import getBreakpoints from './getBreakpoints'

// this function adds event handlers to the window that only tirgger
// when the responsive state changes
export default ({ store, window, calculateInitialState }) => {
    // the function to call when calculating the new responsive state
    const refreshResponsiveState = () => store.dispatch(calculateResponsiveState(window))

    // get the object of media queries corresponding to the breakpoints in the store
    const mediaQueries = MediaQuery.asObject(getBreakpoints(store))

    // for every breakpoint range
    Object.keys(mediaQueries).forEach(breakpoint => {
        // create a media query list for the breakpoint
        const mediaQueryList = window.matchMedia(mediaQueries[breakpoint])

        /* eslint-disable no-loop-func */

        // whenever any of the media query lists status changes
        mediaQueryList.addListener(query => {
            // if a new query was matched
            if (query.matches) {
                // recaulate the state
                refreshResponsiveState()
            }
        })
    })

    // make sure we update the responsive state when the browser changes orientation
    window.addEventListener('orientationchange', refreshResponsiveState)

    // if we are supposed to calculate the initial state
    if (calculateInitialState) {
        // then do so
        refreshResponsiveState()
    }
}
