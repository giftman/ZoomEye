/**
 * # globalReducer.js
 * 
 *
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const {
  SET_SESSION_TOKEN,

  GET_PROFILE_SUCCESS,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  SESSION_TOKEN_SUCCESS,
  
  LOGOUT_SUCCESS,

  GET_STATE,
  SET_STATE,
  SET_STORE
  
} = require('../../lib/constants').default;

import InitialState from './globalInitialState';

const initialState = new InitialState;
/**
 * ## globalReducer function
 * @param {Object} state - initialState 
 * @param {Object} action - type and payload
 */
export default function globalReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {
    /**
     * ### Save the sessionToken
     */
    
    /**
     * ### Save the payload in the store
     *
     * This payload is the ```currentUser``` object returned by
     * Parse.com.  It contains the ```sessionToken``` and the user's
     * ```objectId``` which will be needed for some calls to Parse
     */
    /**
     * ### sets the payload into the store
     *
     * *Note* this is for support of Hot Loading - the payload is the
     * ```store``` itself.
     *
     */
  case SET_STORE:
    return state.set('store',action.payload);

    /**
     * ### Get the current state from the store
     *
     * The Redux ```store``` provides the state object.
     * We convert each key to JSON and set it in the state
     *
     * *Note*: the global state removes the ```store```, otherwise,
     * when trying to convert to JSON, it will be recursive and fail
     */
  }
  
  return state;
}
