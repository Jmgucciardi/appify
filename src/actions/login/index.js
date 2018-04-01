import 'whatwg-fetch'
import Router from 'next/router'


export const LOGIN_REQUEST  = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE  = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

function requestLogin(data) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        data
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}



export const login = (e) => {
    let config = {
        credentials: 'include',
        method: 'POST',
        headers: {
             Accept: 'application/json',
            'Content-Type':'application/json'
        },

        body: JSON.stringify({
            username: e.username,
            password: e.password,
        }),
    }

    return dispatch => {
        dispatch(requestLogin(e))  // check to make sure the login call is triggered
        return fetch('/api/authenticate', config)
            .then(res => res.json()
            .then(user => ({ user, res })))
            .then(({user, res}) => {
                if (!res.ok) {
                    dispatch(loginError(user.message))
                    return Promise.reject(user)
                } else {
                    localStorage.setItem('id_token', user.token)
                    localStorage.setItem('access_token', user.access_token)

                    console.log('USER_WITH_TOKEN: ', user)
                    // user.token logs the token value

                    dispatch(receiveLogin(user))

                }
            }).then(() => {
                Router.push({
                    pathname: '/chat',
                    query: {
                        username: e.username,
                    },
                })
            }).catch(err => { throw err })
    }
}

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: false,
    }
}

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export const logout = () => {
    let config = {
        credentials: 'include',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        }
    }

    return dispatch => {
        dispatch(requestLogout())
        return fetch('/api/logout', config )
            .then(res => res.json())
            .then(dispatch(logoutSuccess()))
            .catch(err => {
                throw err
            })
    }
}

// TODO: add React-Cookie
// TODO: Solve why API is called twice.
