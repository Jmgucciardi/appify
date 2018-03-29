import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Input from 'material-ui/TextField'

import { withStyles } from 'material-ui/styles';

class Login extends Component {
    constructor() {
        super()

        this.state = {
            dialogActive: false,
            formValue: {
                username: '',
                password: '',
                isAuthenticating: false,
                signInError: false,
                errorMessage: false,
                notificationText: '',
            },

            error: {
                username: null,
                password: null,
            },
        }
    }

    validateForm = (body) => {
        const { error, formValue } = this.state
        const errors = this.state.error

        if (formValue.username.length === 0) {
            errors.username = 'Username is blank'
        }

        else {
            errors.username = null
        }
        if (formValue.password.length === 0) {
            errors.password = 'Password is blank'
        }

        else {
            errors.password = null
        }

        this.setState({ error: errors })
       // this.props.loginFormErrors({ type: this.props.type, error: errors })    // track event

        return !error.username && !error.password
    }


    login = (data) => {
        if (this.validateForm(data)) {
            this.setState({ loading: true })
            return this.props.login(data)
        }
    }

    handleInput = ({ target: { name, value } }) => {
        const formValue = { ...this.state.formValue, [name]: value }
        this.setState({ formValue })
    }

    handlePost = (e) => {
        e.preventDefault()
        return this.login(this.state.formValue)
    }


    render({ handleInput, handlePost, props: { hasError } } = this) {
        return (
            <div>
                <div className="DialogContainer">
                    <div className="Dialog">
                        <form onSubmit={e => {
                            e.preventDefault()
                        }}>
                            <Input type="text" name="username" className="StandardInput" placeholder="Username..."
                               id='username'
                               onKeyUp={handleInput}
                               onChange={(e) => this.handleInput(e)}
                               errorText={this.state.error.username}
                            /><br />

                            <Input type="password" name="password" className="StandardInput" placeholder="Password..."
                               id='password'
                               onKeyUp={handleInput}
                               onChange={(e) => this.handleInput(e)}
                               errorText={this.state.error.password}
                            /><br />

                            <RaisedButton variant="raised" color="secondary" type="submit" onClick={handlePost}> Login </RaisedButton> <br />

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default (Login)