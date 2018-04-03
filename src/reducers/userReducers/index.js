import {FIND_USER_SUCCESS} from "../../actions/chat";


const initialState = { errorMessage: '', isFetching: false, user: {}, users: [], message: '', content: '', isAuthenticated: false}

const userReducers = (state = initialState, action) => {
    console.log('REDUCER_ACTION_TYPE: ', action.type)

    switch (action.type) {
        case FIND_USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: state.user
            })
        default:
            return state
    }
}

export default userReducers