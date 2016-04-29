/**
 * # authFormValidation.js
 * 
 * This class determines only if the form is valid 
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict';

/**
 * ## Imports
 * the actions being addressed
 */
const {
  LOGOUT,
  LOGIN,
} = require('../../lib/constants').default;

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation (state) {

  switch(state.form.state) {
    /**
     * ### Logout has no fields, so always valid
     */
  case LOGOUT:
    return state.setIn(['form','isValid'],true);
    /**
     * ### Registration has 4 fields
     */
  case LOGIN:
    if (state.form.fields.email !== ''
        &&
        state.form.fields.password !== ''
        &&
        !state.form.fields.emailHasError
        &&
        !state.form.fields.passwordHasError) {
      return state.setIn(['form','isValid'],true);
    } else {
      return state.setIn(['form','isValid'],false);
    }
    
  }
  /**
   * Default, return the state
   */
  return state;
}
