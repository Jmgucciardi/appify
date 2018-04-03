import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST} from "../../actions/login"

// console.log('STORAGE: ', localStorage.getItem("id_token"))

const initialState = { errorMessage: '', isFetching: false, user: {}, users: [], message: '', content: '', isAuthenticated: false}

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

export default login_Out_Reducers