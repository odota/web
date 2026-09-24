// external imports
import { createStore, combineReducers } from 'redux'
import matchMediaMock from 'match-media-mock'
// local imports
import createReducer from './createReducer'
import createEnhancer from './createEnhancer'

// create default version of the store bits and pieces
const Reducer = createReducer()

describe('PerformanceMode handlers', function() {
    it('calculates the initial state by default', function() {
        // create a store with the default behavior
        const reducer = combineReducers({
            browser: Reducer,
        })

        // add a matchMedia mock for this test
        window.matchMedia = matchMediaMock.create()
        window.matchMedia.setConfig({ type: 'screen', width: 500 })
        // create an enhancer with the current value of the window
        const enhancer = createEnhancer()
        // create the enhanced store
        const store = createStore(reducer, enhancer)

        // get the current state of the browser
        const { browser } = store.getState()

        // make sure the browser is not in its biggest state (should be opened at 500 px)
        expect(browser.is.infinity).toBe(false)

        Reflect.deleteProperty(window, 'matchMedia')
    })

    it('does not calcuate the initial state when flagged', function() {
        // create a store with the default behavior
        const reducer = combineReducers({
            browser: Reducer,
        })
        // create the enhanced store
        const store = createStore(reducer, createEnhancer({ calculateInitialState: false }))
        // get the current state of the browser
        const { browser } = store.getState()

        // make sure the browser is not in its biggest state (should be opened at 500 px)
        expect(browser.is.infinity).toBe(true)
    })
})
