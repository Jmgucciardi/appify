import 'whatwg-fetch'
import Router from 'next/router'

export const login = (e) => {
    return (dispatch) => {
        fetch('/api/authenticate',
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: e.username,
                    password: e.password,
                }),
            })
            .then(() => dispatch(userAuthSuccess(e)))
            .then(() => {
                console.log('USER: ', e)
                Router.push({
                    pathname: '/chat',
                    query: {
                        username: e.username,
                    },
                })
            })
            .catch((err) => {
                dispatch(userAuthFailed(err))
            })
    }
}

const userAuthFailed = (message) => {
    return {
        type: 'USER_AUTH_FAILED',
        message
    }
}

const userAuthSuccess = (user) => {
    return {
        type: 'USER_AUTH_SUCCESS',
        value: user
    }
}