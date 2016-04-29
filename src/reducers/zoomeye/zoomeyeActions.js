/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict';

/**
 * ## Imports
 *
 * The actions supported
 */
const {
    QUERY_REQUEST,
    QUERY_SUCCESS,
    QUERY_FAILURE,
    QUERY,
    SET_SEARCH_STRING,
    NEXT_PAGE,
    CLEAR_RESULT,
    PRE_PAGE
} = require('../../lib/constants').default;

/**
 * Project requirements
 */
const ZoomEyeApi = require('../../lib/ZoomEyeApi').default;

import {Actions} from 'react-native-router-flux';

const  AppAuthToken = require('../../lib/AppAuthToken').default;


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */

export function queryState() {
    return {
        type: QUERY
    };

}
export function queryRequest() {
    return {
        type: QUERY_REQUEST
    };
}

export function querySuccess(json) {
    return {
        type: QUERY_SUCCESS,
        payload: json
    };
}
export function queryFailure(error) {
    return {
        type: QUERY_FAILURE,
        payload: error
    };
}

export function nextPage() {
    return {
        type: NEXT_PAGE
    };
}

export function prePage() {
    return {
        type: PRE_PAGE
    };
}

export  function clearResult(){
    return {
        type:CLEAR_RESULT
    };
}


export function query(key,page,facets) {
    return dispatch => {
        dispatch(queryRequest());
        return new AppAuthToken().getSessionToken()
            .then(function(token){
                return new ZoomEyeApi(token).query({
                        query: key,
                        page: page,
                        facets:facets
                    })

                    .then(function (json) {
                        if(json.message){
                            console.log("query fail :" + json.message);
                            dispatch(queryFailure(json.message));
                        }else{
                            console.log("query success");
                            dispatch(querySuccess(json));
                            dispatch(queryState());
                            Actions.searchResult({"title":"Page " + page});
                        }
                    })
                    .catch((error) => {
                        dispatch(queryFailure(error));
                    });
        })
    };
}



export function setMessage(message) {
    return {
        type: SET_MESSAGE,
        payload: message
    };
}

export function setSearchString(keyword) {
    return {
        type: SET_SEARCH_STRING,
        payload: keyword
    };
}


