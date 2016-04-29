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

    DELETE_TOKEN_REQUEST,
    DELETE_TOKEN_SUCCESS,

    LOGOUT,
    LOGIN,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    ON_AUTH_FORM_FIELD_CHANGE

} = require('../../lib/constants').default;

/**
 * Project requirements
 */
const ZoomEyeApi = require('../../lib/ZoomEyeApi').default;

import {Actions} from 'react-native-router-flux';

const  AppAuthToken = require('../../lib/AppAuthToken').default;

const  _ = require('underscore');

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */

export function logoutState() {
    return {
        type: LOGOUT
    };

}

export function loginState() {
    return {
        type: LOGIN
    };
}


/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field,value) {
    return {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: field, value: value}
    };
}


/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
    return {
        type: DELETE_TOKEN_REQUEST
    };
}
export function deleteTokenRequestSuccess() {
    return {
        type: DELETE_TOKEN_SUCCESS
    };
}

/**
 * ## Delete session token
 *
 * Call the AppAuthToken deleteSessionToken
 */
export function deleteSessionToken() {
    return dispatch => {
        dispatch(deleteTokenRequest());
        return new  AppAuthToken().deleteSessionToken()
            .then(() => {
                dispatch(deleteTokenRequestSuccess());
            });
    };
}
/**
 * ## Token
 * If AppAuthToken has the sessionToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getSessionToken() {
    return dispatch => {
        // dispatch(deleteSessionToken());
        return new AppAuthToken().getSessionToken()

            .then((token) => {
                if (token) {
                    dispatch(logoutState());
                    Actions.Tabbar();
                } else {
                    Actions.Login();
                }
            })

            .catch((error) => {
                dispatch(loginState());
                Actions.Register();
            });
    };
}

export function getUser() {
    return dispatch => {
        // dispatch(deleteSessionToken());
        return new AppAuthToken().getUser()

            .then((user) => {
                if (user) {
                    login(user.name,user.pass);
                } else {
                    console.log("no user ,login please!")
                    Actions.Login();
                }
            })

            .catch((error) => {
                console.log(error);
            });
    };
}

/**
 login
 */
export function saveUser(json) {
    return new AppAuthToken().storeUser(json);
}
/**
 login
 */
export function saveSessionToken(json) {
    return new AppAuthToken().storeSessionToken(json);
}

/**
 * ## Login actions
 */
export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

export function loginSuccess(json) {
    return {
        type: LOGIN_SUCCESS,
        payload: json
    };
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        payload: error
    };
}
/**
 * ## Login
 * @param {string} username - user's name
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */

export function login(username,  password) {
    console.log("login");
    return dispatch => {
        saveUser({name:username,pass:password});
        dispatch(loginRequest());
        return new ZoomEyeApi().login({
                "username": username,
                "password": password
            })

            .then(function (json) {
                return saveSessionToken(json)
                    .then(function () {
                        dispatch(loginSuccess(json));
                        dispatch(logoutState());
                        console.log("login!");
                        console.log(json);
                        Actions.Tabbar();
                    });
            })
            .catch((error) => {
                dispatch(loginFailure(error));
            });
    };
}



