// third party imports
import sinon from 'sinon'
// local imports
import createEnhancer from './createEnhancer'
import { defaultBreakpoints } from './createReducer'

describe('createEnhancer', function() {
    it('returns a function when given an options object', function() {
        expect(typeof createEnhancer({})).toBe('function')
    })

    it('returns a function when not given any options', function() {
        expect(typeof createEnhancer()).toBe('function')
    })

    describe('the returned store enhancer', function() {
        let enhancer

        beforeEach(function() {
            enhancer = createEnhancer()
        })

        it('returns a function', function() {
            expect(typeof enhancer()).toBe('function')
        })

        describe('the returned (enhanced) `createStore`', function() {
            let createStoreSpy
            let enhancedCreateStore

            beforeEach(function() {
                function fakeCreateStore() {
                    return {
                        dispatch: () => {},
                        getState: () => ({
                            browser: {
                                _: true,
                                breakpoints: defaultBreakpoints,
                            },
                        }),
                    }
                }

                createStoreSpy = sinon.spy(fakeCreateStore)
                enhancedCreateStore = enhancer(createStoreSpy)
            })

            it('calls the `createStore` given to the enhancer', function() {
                enhancedCreateStore()
                sinon.assert.calledOnce(createStoreSpy)
            })
        })
    })

    it('could use some more tests')
})
