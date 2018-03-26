import { combineReducers } from 'redux'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../actions/login'
import { HANDLE_LOCAL_STORAGE } from '../actions/chat'


/**
* Getting a local storage error: localStorage returns undefined when the token does not exist and thus can not
 * be verified . Need a logic gate of some kind to lock this problem up so it wont fire at all.
* */

console.log('STORAGE: ', localStorage.getItem("id_token"))


const reducers = (state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem("id_token")
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
        case HANDLE_LOCAL_STORAGE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
        })

        default:
            return state
    }
}


const rootReducer = combineReducers({
    reducers
})

export default rootReducer