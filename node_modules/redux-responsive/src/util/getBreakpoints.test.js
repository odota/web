// third party imports
import { createStore, combineReducers } from 'redux'
import { combineReducers as immutableCombine } from 'redux-immutable'
import { Record } from 'immutable'
// local imports
import getBreakpoints from './getBreakpoints'
import createReducer, { defaultBreakpoints } from './createReducer'

const reducer = createReducer()

describe('Breakpoint discovery', function() {
    it('Can find reducer at root', function() {
        // create a redux store with the reducer at the root
        const store = createStore(
            combineReducers({
                browser: reducer,
            })
        )

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).toBe(defaultBreakpoints)
    })

    it('Can find responsive state in Immutable.js Map root state', function() {
        // create a redux store with the reducer at the root
        const store = createStore(
            immutableCombine({
                browser: reducer,
            })
        )

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).toBe(defaultBreakpoints)
    })

    it('Can find responsive state in Immutable.js Record root state', function() {
        const StateRecord = Record({
            browser: undefined,
        })
        // create a redux store with the reducer at the root
        const store = createStore(
            immutableCombine(
                {
                    browser: reducer,
                },
                StateRecord
            )
        )

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).toBe(defaultBreakpoints)
    })

    it('Can find responsive state anywhere in the state', function() {
        const store = createStore(
            combineReducers({
                foo: combineReducers({
                    bar: combineReducers({
                        baz: reducer,
                    }),
                    quux: () => true,
                }),
            })
        )
        expect(getBreakpoints(store)).toBe(defaultBreakpoints)
    })

    it('Can find responsive state anywhere in the ImmutableJS Map', function() {
        const store = createStore(
            immutableCombine({
                foo: immutableCombine({
                    bar: immutableCombine({
                        baz: reducer,
                    }),
                    quux: () => true,
                }),
            })
        )
        expect(getBreakpoints(store)).toBe(defaultBreakpoints)
    })

    it('Can find responsive state anywhere in the ImmutableJS Record', function() {
        const StateRecord = Record({
            foo: Record({
                bar: Record({
                    baz: undefined,
                })(),
                quux: true,
            })(),
        })
        const store = createStore(
            immutableCombine(
                {
                    foo: immutableCombine({
                        bar: immutableCombine({
                            baz: reducer,
                        }),
                        quux: () => true,
                    }),
                },
                StateRecord
            )
        )
        expect(getBreakpoints(store)).toBe(defaultBreakpoints)
    })

    it('Complains if it cannot find a reducer at root', function() {
        // create a store without the reducer at reducer
        const store = createStore(
            combineReducers({
                hello: () => true,
            })
        )

        // make sure this throws an error
        expect(() => getBreakpoints(store)).toThrowError(Error)
    })

    it("Does not break if state contains 'keys' or 'getIn' key somewhere", function() {
        const store = createStore(
            combineReducers({
                keys: () => true,
                getIn: () => true,
                browser: reducer,
            })
        )
        expect(() => getBreakpoints(store)).not.toThrowError()
    })
})
