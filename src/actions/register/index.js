import 'whatwg-fetch'
import Router from 'next/router'

function createUserError(message) {
    return {
        type: 'FAILED_TO_CREATE_USER',
        message
    }
}

function createUserSuccess(users) {
    return {
        type: 'USER_SUCCESSFULLY_CREATED',
        value: users
    }
}

function usersLoaded(users) {
    return {
        type: 'USERS_LOADED_SUCCESS',
        value: users
    }
}

export function createUser(e) {
    return (dispatch) => {
        fetch('/api/register',
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
            .then(res => res.json())
            .then(() => dispatch(createUserSuccess(e)))
            .then(() => {
                console.log('REGISTER_USER: ', e)
                Router.push({
                    pathname: '/chat',
                    query: {
                        username: e.username,
                    },
                })
            })
            .catch((err) => {
                console.log('Register_Failed ', err)
                dispatch(createUserError(err))
            })
    }
}


export function loadUser() {
    return function (dispatch) {
        fetch("/api/users")
            .then( res => res.json()
            ).then(users => {
            dispatch(usersLoaded(users))
        })
            .catch(err => {
                dispatch(loadUserError(err))
            })
    }
}

export function getByUsername(username) {
    return function (dispatch) {
        fetch(`/api/username/${username}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then((user) => {
                dispatch(getUserComplete(user))
            })
            .catch((err) => {
                dispatch(loadUserError(err))
            });

    }
}

function getUserComplete(user) {
    return {
        type: 'GET_USERS_DONE',
        value: user
    };
}

function loadUserError(message) {
    return {
        type: 'USER_LOAD_ERROR',
        message
    }
}