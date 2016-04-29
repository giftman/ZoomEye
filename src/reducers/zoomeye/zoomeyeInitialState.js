/**
 * # zoomeyeInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';
/**
 * ## Import
 */
import {Record} from 'immutable';
const {
    QUERY
} = require('../../lib/constants').default;
/**
 * ## InitialState
 *
 *
 */
var InitialState = Record({
    state: QUERY,
    isFetching:false,
    error: null,
    isValid: false,
    search: new (Record({
        keyword: null,
        keywordHasError:false,
        filter:null,
        facets:null,
        page:null,
        searchResult:null,
        sortResult:null
    }))
});
export default InitialState;
