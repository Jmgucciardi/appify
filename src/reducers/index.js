import { combineReducers } from 'redux'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from '../actions/login'
import { HANDLE_LOCAL_STORAGE } from '../actions/chat'
import {FAILED_TO_CREATE_USER , USER_SUCCESSFULLY_CREATED, REGISTER_USER_REQUEST} from '../actions/register'


/**
* Getting a local storage error: localStorage returns undefined when the token does not exist and thus can not
 * be verified . Need a logic gate of some kind to lock this problem up so it wont fire at all.
* */

// console.log('STORAGE: ', localStorage.getItem("id_token"))

const initialState = { errorMessage: '', isFetching: false, user: '', message: '', content: '', isAuthenticated: false}

const login_Out_Reducers = (state = initialState, action) => {
    console.log('REDUCER_ACTION_TYPE: ', action.type)

    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, ...state, {
                isFetching: true,
                isAuthenticated: false,
                errorMessage: '',
                user: action.payload
            })

        case LOGIN_SUCCESS:
            return Object.assign({}, ...state, {
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
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                errorMessage: ''
            })
        default:
            return state
    }
}

const registerReducers = (state = initialState, action) => {
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
                isAuthenticated: true,
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
    login_Out_Reducers,
    registerReducers
})

export default rootReducer