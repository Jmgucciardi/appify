import { combineReducers } from 'redux'
import login_Out_Reducers from './loginReducers'
import registerReducers from './registerReducers'
import userReducers from './userReducers'


/**
* Getting a local storage error: localStorage returns undefined when the token does not exist and thus can not
 * be verified . Need a logic gate of some kind to lock this problem up so it wont fire at all.
* */


const rootReducer = combineReducers({
    login_Out_Reducers,
    registerReducers,
    userReducers
})

export default rootReducer