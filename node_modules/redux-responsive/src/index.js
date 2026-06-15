// local imports
import _createReducer from './util/createReducer'
import _createEnhancer from './util/createEnhancer'
export { CALCULATE_RESPONSIVE_STATE } from './actions/types'
export { calculateResponsiveState } from './actions/creators'

// external API
export const createResponsiveStateReducer = _createReducer
export const createResponsiveStoreEnhancer = _createEnhancer
// provide default responsive state reducer/enhancers
export const responsiveStateReducer = createResponsiveStateReducer()
export const responsiveStoreEnhancer = createResponsiveStoreEnhancer()
