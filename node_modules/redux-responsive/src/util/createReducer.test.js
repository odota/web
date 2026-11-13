// third party imports
import { createStore } from 'redux'
import { combineReducers as immutableCombine } from 'redux-immutable'
import { Record } from 'immutable'
// local imports
import createReducer, {
    computeOrder,
    getLessThan,
    getGreaterThan,
    getIs,
    getOrderMap,
} from './createReducer'

const possibleChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789'
function randomString(length) {
    let result = ''
    for (var i = 0; i < length; i++) {
        result += possibleChars[Math.floor(possibleChars.length * Math.random())]
    }
    return result
}

describe('createReducer', function() {
    describe('with default breakpoints', function() {
        // assigned in `beforeEach`
        let reducer

        beforeEach(function() {
            reducer = createReducer()
        })

        it('returns a function', function() {
            expect(typeof reducer).toBe('function')
        })
    })

    describe('with custom breakpoints', function() {
        // number of breakpoints to randomly generate
        const numBreakpoints = Math.floor(10 * Math.random())
        // maximum length of randomly generated media type strings
        const mediaTypeMaxLength = 50
        // maximum value for randomly generated breakpoint values
        const breakpointMaxValue = 10000

        // assigned in `beforeEach`
        let reducer
        let breakpoints

        beforeEach(function() {
            // randomly generate breakpoints object
            breakpoints = {}
            for (var i = 0; i < numBreakpoints; i++) {
                const mediaType = randomString(Math.ceil(mediaTypeMaxLength * Math.random()))
                const breakpoint = Math.floor(breakpointMaxValue * Math.random())

                breakpoints[mediaType] = breakpoint
            }
            // create reducer based on random breakpoints
            reducer = createReducer(breakpoints)
        })

        describe('the reducer', function() {
            // maximum length of randomly generated action type strings
            const actionTypeMaxLength = 50

            it('is a function', function() {
                expect(typeof reducer).toBe('function')
            })

            it('returns the input state for unknown actions and state !== undefined', function() {
                // randomly generate an action
                const action = {
                    type: randomString(Math.ceil(actionTypeMaxLength * Math.random())),
                }
                // non-undefined input state
                const state = Math.random()

                // should return unaltered state
                expect(reducer(state, action)).toBe(state)
            })
        })
        it('correctly orders two breakpoints', function() {
            // the breakpoints to test against
            const breakpointOrdering = getOrderMap({
                small: 500,
                medium: 800,
                large: 1000,
                foo: 'bar',
            })

            // figure out the ordering for the smaller one
            const smallerOrder = breakpointOrdering['small']
            // figure out the ordering for the larger one
            const largerOrder = breakpointOrdering['large']

            // make sure the larger order is bigger than the smaller
            expect(breakpointOrdering).toEqual({
                small: 0,
                medium: 1,
                large: 2,
                foo: 3,
            })
        })
    })

    describe('reducer factory', function() {
        const breakpoints = {
            small: 500,
            medium: 1000,
            large: 15000,
        }

        it('correctly injects initial state', function() {
            // create a reducer with the initial state
            const reducer = createReducer(breakpoints, {
                initialMediaType: 'small',
            })

            // create a redux store with the reducer
            const store = createStore(reducer)

            // the expected value for the lessThan object
            const expectedLessThan = {
                small: false,
                medium: true,
                large: true,
                infinity: true,
            }

            // make sure we were able to correctly inject the initial state
            expect(store.getState().lessThan).toEqual(expectedLessThan)
        })

        it('correctly injects initialMediaType into immutable (Map) root state', function() {
            // create a reducer with the initial state
            const reducer = createReducer(breakpoints, {
                initialMediaType: 'small',
            })

            // create a redux store with the reducer
            const store = createStore(
                immutableCombine({
                    browser: reducer,
                })
            )

            // the expected value for the lessThan object
            const expectedLessThan = {
                small: false,
                medium: true,
                large: true,
                infinity: true,
            }

            // make sure we were able to correctly inject the initial state
            expect(store.getState().get('browser').lessThan).toEqual(expectedLessThan)
        })

        it('correctly injects initialMediaType into immutable (Record) root state', function() {
            // create a reducer with the initial state
            const reducer = createReducer(breakpoints, {
                initialMediaType: 'small',
            })

            const StateRecord = Record({
                browser: undefined,
            })

            // create a redux store with the reducer
            const store = createStore(
                immutableCombine(
                    {
                        browser: reducer,
                    },
                    StateRecord
                )
            )

            // the expected value for the lessThan object
            const expectedLessThan = {
                small: false,
                medium: true,
                large: true,
                infinity: true,
            }

            // make sure we were able to correctly inject the initial state
            expect(store.getState().get('browser').lessThan).toEqual(expectedLessThan)
        })
    })

    // the breakpoints to test against
    const breakpoints = {
        small: 0,
        medium: 1,
        large: 2,
        foo: 'bar',
    }
    // the current media type
    const currentType = 'medium'

    it('can compute the less than object', function() {
        // the expected lessThan
        const expected = {
            small: false,
            medium: false,
            large: true,
            foo: false,
        }
        // make sure the computed lessThan object matches exepctation
        expect(getLessThan(currentType, breakpoints)).toEqual(expected)
    })

    it('can compute the greater than object', function() {
        // the expected greaterThan
        const expected = {
            small: true,
            medium: false,
            large: false,
            foo: false,
        }
        // make sure the computed greaterThan object matches exepctation
        expect(getGreaterThan(currentType, breakpoints)).toEqual(expected)
    })

    it('can compute the is object', function() {
        // the expected is
        const expected = {
            small: false,
            medium: true,
            large: false,
            foo: false,
        }
        // make sure the computed is object matches exepctation
        expect(getIs(currentType, breakpoints)).toEqual(expected)
    })

    it('is object can refer to non-numerical values', function() {
        // the expected is
        const expected = {
            small: false,
            medium: false,
            large: false,
            foo: true,
        }
        // make sure the computed is object matches exepctation
        expect(getIs('foo', breakpoints)).toEqual(expected)
    })
})
