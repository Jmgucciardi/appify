import { combineReducers } from 'redux'

const initialState = {
    isAuthenticating: false,
    currentUser: null,
    errorMessage: null
}

const reducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
            isAuthenticating: true
            }
        case 'LOGIN_FAILURE' :
            return {
                ...state,
                isAuthenticating: false,
                errorMessage: action.errorMessage
            }
        case 'LOGIN_SUCCESS' :
            return {
                isAuthenticating: false,
                currentUser: action.user,
                errorMessage: null
            }
        case 'LOGOUT':
            return {
                isAuthenticating: false,
                currentUser: null,
                errorMessage: null
            }
        default:
            return state
    }



    if (action.type === 'USER_SUCCESSFULLY_CREATED') {
        return action.value
    }
    if (action.type === "USER_AUTH_SUCCESS") {
        return action.value
    }
    if (action.type === 'CONNECTION_SUCCESS') {
        return action.type
    }
    return state

}



const rootReducer = combineReducers({
    reducers
})

export default rootReducer