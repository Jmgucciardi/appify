import { combineReducers } from 'redux'

const users = (state = [], action) => {
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
    users
})

export default rootReducer