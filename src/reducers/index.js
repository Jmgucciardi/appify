import { combineReducers } from 'redux'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/login'
import { HANDLE_LOCAL_STORAGE } from '../actions/chat'
import {FAILED_TO_CREATE_USER , USER_SUCCESSFULLY_CREATED, REGISTER_USER_REQUEST} from '../actions/register'


/**
* Getting a local storage error: localStorage returns undefined when the token does not exist and thus can not
 * be verified . Need a logic gate of some kind to lock this problem up so it wont fire at all.
* */

// console.log('STORAGE: ', localStorage.getItem("id_token"))


const loginReducers = (state = {
    isFetching: false,
    isAuthenticated: false //!!localStorage.getItem("id_token")
}, action) => {
    console.log('REDUCER_ACTION_TYPE: ', action.type)

    switch (action.type) {

        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.data
            })

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })

        default:
            return state
    }
}

const registerReducers = (state = {
    isFetching: false,
    isAuthenticated: false
}, action) => {
    console.log('REDUCER_ACTION_TYPE: ', action.type)
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.data
            })

        case USER_SUCCESSFULLY_CREATED:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: ''
            })
        case FAILED_TO_CREATE_USER:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        default:
            return state
    }
}


const rootReducer = combineReducers({
    loginReducers,
    registerReducers
})

export default rootReducer