import 'whatwg-fetch'
import Router from 'next/router'

export const FAILED_TO_CREATE_USER     = 'FAILED_TO_CREATE_USER'
export const USER_SUCCESSFULLY_CREATED = 'USER_SUCCESSFULLY_CREATED'
export const REGISTER_USER_REQUEST     = 'REGISTER_USER_REQUEST'

const registerError = (message) => {
    return {
        type: FAILED_TO_CREATE_USER,
        message
    }
}

export const registerSuccess = (users) =>{
    return {
        type: USER_SUCCESSFULLY_CREATED,
        value: users
    }
}

export const usersLoaded = (users) => {
    return {
        type: USER_LOADED_SUCCESS,
        value: users
    }
}

export const registerRequest = (data) => {
    return {
        type: REGISTER_USER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        data
    }
}

export const register = (e) => {
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
        dispatch(registerRequest(e))  // check to make sure the login call is triggered
        return fetch('/api/register', config)
            .then(res => res.json()
            .then(user => ({ user, res })))
            .then(({user, res}) => {
                if (!res.ok) {
                    dispatch(registerError(user.message))
                    return Promise.reject(user)
                } else {

                    console.log('REGISTER_USER: ', user)
                    dispatch(registerSuccess(user))
                }
            }).then(() => {
                Router.push({
                    pathname: '/',
                })
            }).catch(err =>{ throw err })
    }
}
