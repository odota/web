// see: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries

// external imports
import MediaQuery from 'mediaquery';
// local imports
import { calculateResponsiveState } from '../actions/creators';
import getBreakpoints from './getBreakpoints';

// this function adds event handlers to the window that only tirgger
// when the responsive state changes
export default (function (_ref) {
    var store = _ref.store,
        window = _ref.window,
        calculateInitialState = _ref.calculateInitialState;

    // the function to call when calculating the new responsive state
    var refreshResponsiveState = function refreshResponsiveState() {
        return store.dispatch(calculateResponsiveState(window));
    };

    // get the object of media queries corresponding to the breakpoints in the store
    var mediaQueries = MediaQuery.asObject(getBreakpoints(store));

    // for every breakpoint range
    Object.keys(mediaQueries).forEach(function (breakpoint) {
        // create a media query list for the breakpoint
        var mediaQueryList = window.matchMedia(mediaQueries[breakpoint]);

        /* eslint-disable no-loop-func */

        // whenever any of the media query lists status changes
        mediaQueryList.addListener(function (query) {
            // if a new query was matched
            if (query.matches) {
                // recaulate the state
                refreshResponsiveState();
            }
        });
    });

    // make sure we update the responsive state when the browser changes orientation
    window.addEventListener('orientationchange', refreshResponsiveState);

    // if we are supposed to calculate the initial state
    if (calculateInitialState) {
        // then do so
        refreshResponsiveState();
    }
});