import {FAILED_TO_CREATE_USER , USER_SUCCESSFULLY_CREATED, REGISTER_USER_REQUEST} from '../../actions/register'

const initialState = { errorMessage: '', isFetching: false, user: {}, users: [], message: '', content: '', isAuthenticated: false}

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

export default registerReducers