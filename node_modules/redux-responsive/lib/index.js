// local imports
import _createReducer from './util/createReducer';
import _createEnhancer from './util/createEnhancer';
export { CALCULATE_RESPONSIVE_STATE } from './actions/types';
export { calculateResponsiveState } from './actions/creators';

// external API
export var createResponsiveStateReducer = _createReducer;
export var createResponsiveStoreEnhancer = _createEnhancer;
// provide default responsive state reducer/enhancers
export var responsiveStateReducer = createResponsiveStateReducer();
export var responsiveStoreEnhancer = createResponsiveStoreEnhancer();