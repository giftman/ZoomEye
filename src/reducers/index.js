/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict';
/**
 * ## Imports
 *
 * our 4 reducers
 */
import auth from './auth/authReducer';
import device from './device/deviceReducer';
import global from './global/globalReducer';
import zoomeye from './zoomeye/zoomeyeReducer';

import { combineReducers } from 'redux';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
    auth,
    device,
    global,
    zoomeye
});

export default rootReducer;
