/**
 * # globalActions.js
 * 
 * Actions that are global in nature
 */
'use strict';

/**
 * ## Imports
 * 
 * The actions supported
 */
const {
  SET_STORE,
  GET_STATE
} = require('../../lib/constants').default;



/**
 * ## set the store 
 * 
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore(store) {
  return {
    type: SET_STORE,
    payload: store
  };
}
/**
 * ## getState
 *
 */
export function getState(toggle) {
  return {
    type: GET_STATE,
    payload: toggle
  };
}
