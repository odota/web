var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// local imports
import calculateResponsiveState from 'actions/creators/calculateResponsiveState';
import CALCULATE_RESPONSIVE_STATE from 'actions/types/CALCULATE_RESPONSIVE_STATE';

describe('calculateResponsiveState', function () {
    it('returns action object with correct type when no arg passed', function () {
        var action = calculateResponsiveState();

        // action should be an object
        expect(typeof action === 'undefined' ? 'undefined' : _typeof(action)).toBe('object');
        // action should have correct type
        expect(action.type).toBe(CALCULATE_RESPONSIVE_STATE);
    });

    it('returns action object with correct type when empty arg passed', function () {
        var action = calculateResponsiveState({});

        // action should be an object
        expect(typeof action === 'undefined' ? 'undefined' : _typeof(action)).toBe('object');
        // action should have correct type
        expect(action.type).toBe(CALCULATE_RESPONSIVE_STATE);
    });

    it('returns action object with correct type when window-like arg passed', function () {
        var innerWidth = 100;
        var innerHeight = 200;
        var matchMedia = function matchMedia() {};

        var action = calculateResponsiveState({ innerWidth: innerWidth, innerHeight: innerHeight, matchMedia: matchMedia });

        // action should be an object
        expect(typeof action === 'undefined' ? 'undefined' : _typeof(action)).toBe('object');
        // action should have correct type
        expect(action.type).toBe(CALCULATE_RESPONSIVE_STATE);
    });

    it('puts the argument properties onto the returned action', function () {
        var innerWidth = Math.ceil(100 * Math.random());
        var innerHeight = Math.ceil(100 * Math.random());
        var matchMedia = function matchMedia() {
            return Math.random() * Math.random();
        };

        var action = calculateResponsiveState({ innerWidth: innerWidth, innerHeight: innerHeight, matchMedia: matchMedia });

        // action should have same properties as passed to creator
        expect(action.innerWidth).toBe(innerWidth);
        expect(action.innerHeight).toBe(innerHeight);
        expect(action.matchMedia).toBe(matchMedia);
    });

    it('properly defaults when no arg passed', function () {
        var action = calculateResponsiveState();

        expect(action.innerWidth).toBeUndefined();
        expect(action.innerHeight).toBeUndefined();
        expect(action.matchMedia).toBeUndefined();
    });

    it('properly defaults when empty arg passed', function () {
        var action = calculateResponsiveState({});

        expect(action.innerWidth).toBeUndefined();
        expect(action.innerHeight).toBeUndefined();
        expect(action.matchMedia).toBeUndefined();
    });
});