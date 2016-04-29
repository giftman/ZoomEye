/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('./zoomeyeInitialState').default;
const  _ = require('underscore');
/**
 * ## Auth actions
 */
const {
    QUERY_REQUEST,
    QUERY_SUCCESS,
    QUERY_FAILURE,
    QUERY,
    SET_ERROR_MESSAGE,
    SET_SEARCH_STRING,
    NEXT_PAGE,
    CLEAR_RESULT,
    PRE_PAGE
} = require('../../lib/constants').default;

var React = require('react-native');
var {
    ListView,
} = React;
const initialState = new InitialState;
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
var ds = new ListView.DataSource(
    {rowHasChanged:(r1,r2) => r1.ip !== r2.ip}
);
export default function zoomeyeReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    switch (action.type) {
        /**
         * ### Requests start
         * set the form to fetching and clear any errors
         */
        case QUERY_REQUEST:
            return state.setIn(['isFetching'], true);

       
        case QUERY_SUCCESS:
            let tmpResult;
            // if(!state.search.searchResult){
                tmpResult = ds.cloneWithRows(action.payload.matches);
            // }else{
            //     var arrayObj = [];
            //     arrayObj.push(state.search.searchResult);
            //     arrayObj.push(action.payload.matches);
            //     tmpResult = ds.cloneWithRows(arrayObj);
            // }
            return state.setIn(['isFetching'], false).
                setIn(['search','searchResult'],tmpResult);
        case QUERY_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload);
        case QUERY:
            return state.setIn(['isFetching'], false)
            


        case SET_SEARCH_STRING:
            return state.setIn(['search','keyword'], action.payload);

        case SET_ERROR_MESSAGE:
            return state.setIn(['error'], action.payload);

        case NEXT_PAGE:
            return state.setIn(['search','page'],state.search.page + 1);
        case CLEAR_RESULT:
            return state.setIn(['search','page'],1)
                .setIn(['search','searchResult'],null);
        case PRE_PAGE:
            var prePage = (state.search.page - 1) >= 1?state.search.page - 1:1;
            return state.setIn(['search','page'],prePage);

    }
    /**
     * ## Default
     */
    return state;
}
