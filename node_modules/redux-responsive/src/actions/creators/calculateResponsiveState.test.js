// local imports
import calculateResponsiveState from 'actions/creators/calculateResponsiveState'
import CALCULATE_RESPONSIVE_STATE from 'actions/types/CALCULATE_RESPONSIVE_STATE'

describe('calculateResponsiveState', function() {
    it('returns action object with correct type when no arg passed', function() {
        const action = calculateResponsiveState()

        // action should be an object
        expect(typeof action).toBe('object')
        // action should have correct type
        expect(action.type).toBe(CALCULATE_RESPONSIVE_STATE)
    })

    it('returns action object with correct type when empty arg passed', function() {
        const action = calculateResponsiveState({})

        // action should be an object
        expect(typeof action).toBe('object')
        // action should have correct type
        expect(action.type).toBe(CALCULATE_RESPONSIVE_STATE)
    })

    it('returns action object with correct type when window-like arg passed', function() {
        const innerWidth = 100
        const innerHeight = 200
        const matchMedia = function() {}

        const action = calculateResponsiveState({ innerWidth, innerHeight, matchMedia })

        // action should be an object
        expect(typeof action).toBe('object')
        // action should have correct type
        expect(action.type).toBe(CALCULATE_RESPONSIVE_STATE)
    })

    it('puts the argument properties onto the returned action', function() {
        const innerWidth = Math.ceil(100 * Math.random())
        const innerHeight = Math.ceil(100 * Math.random())
        const matchMedia = function() {
            return Math.random() * Math.random()
        }

        const action = calculateResponsiveState({ innerWidth, innerHeight, matchMedia })

        // action should have same properties as passed to creator
        expect(action.innerWidth).toBe(innerWidth)
        expect(action.innerHeight).toBe(innerHeight)
        expect(action.matchMedia).toBe(matchMedia)
    })

    it('properly defaults when no arg passed', function() {
        const action = calculateResponsiveState()

        expect(action.innerWidth).toBeUndefined()
        expect(action.innerHeight).toBeUndefined()
        expect(action.matchMedia).toBeUndefined()
    })

    it('properly defaults when empty arg passed', function() {
        const action = calculateResponsiveState({})

        expect(action.innerWidth).toBeUndefined()
        expect(action.innerHeight).toBeUndefined()
        expect(action.matchMedia).toBeUndefined()
    })
})
