var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// third party imports
import sinon from 'sinon';
// local imports
import createEnhancer from './createEnhancer';
import { defaultBreakpoints } from './createReducer';

describe('createEnhancer', function () {
    it('returns a function when given an options object', function () {
        expect(_typeof(createEnhancer({}))).toBe('function');
    });

    it('returns a function when not given any options', function () {
        expect(_typeof(createEnhancer())).toBe('function');
    });

    describe('the returned store enhancer', function () {
        var enhancer = void 0;

        beforeEach(function () {
            enhancer = createEnhancer();
        });

        it('returns a function', function () {
            expect(_typeof(enhancer())).toBe('function');
        });

        describe('the returned (enhanced) `createStore`', function () {
            var createStoreSpy = void 0;
            var enhancedCreateStore = void 0;

            beforeEach(function () {
                function fakeCreateStore() {
                    return {
                        dispatch: function dispatch() {},
                        getState: function getState() {
                            return {
                                browser: {
                                    _: true,
                                    breakpoints: defaultBreakpoints
                                }
                            };
                        }
                    };
                }

                createStoreSpy = sinon.spy(fakeCreateStore);
                enhancedCreateStore = enhancer(createStoreSpy);
            });

            it('calls the `createStore` given to the enhancer', function () {
                enhancedCreateStore();
                sinon.assert.calledOnce(createStoreSpy);
            });
        });
    });

    it('could use some more tests');
});