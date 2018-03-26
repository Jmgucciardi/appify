import 'whatwg-fetch'
import Router from 'next/router'

export const QUERY_FOR_USERS = 'QUERY_FOR_USERS'
export const FIND_USER_SUCCESS = 'USER_FOUND_SUCCESS'
export const FIND_USER_FAILURE = 'FIND_USER_FAILURE'
export const QUERY_FOR_USER_BY_ID = 'QUERY_FOR_USER_BY_ID'
export const HANDLE_LOCAL_STORAGE = 'HANDLE_LOCAL_STORAGE'

const queryUsers = () => {
    return {
        type: QUERY_FOR_USERS
    }
}

const findUserSuccess = (user) => {
    console.log('ACTION: GET_USER: ', user)
    return {
        type: FIND_USER_SUCCESS,
        value: user
    }
}

const findUserError = (message) => {
    return {
        type: FIND_USER_FAILURE,
        message
    }
}

export const _handleConnect = () => {
    return dispatch => {
        dispatch(queryUsers())
    return (dispatch) => {
        fetch('api/users',
            {
                credentials: 'include',
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then((users) =>
                dispatch(findUserSuccess(users)))
            .catch((err) => {
                dispatch(findUserError(err))
            })
        }
    }
}

const queryUser = () => {
    return {
        type: QUERY_FOR_USER_BY_ID
    }
}


export const _handleUsersById = (username) => {
    return dispatch => {
        dispatch(queryUser())
        return (dispatch) => {
            fetch(`api/users/${username}`)
                .then(res => res.json())
                .then(user => {
                    dispatch(findUserSuccess(user))
                })
                .catch((err) => {
                    dispatch(findUserError(err))
                })
        }
    }
}


export const _handleLocalStorage = () => {
    return {
        type: HANDLE_LOCAL_STORAGE
    }
}

