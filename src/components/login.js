import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Button from '../shared/button'




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
            console.log('USERNAME NOT PROVIDED')
            errors.usermame = 'Username is blank'
        }  //else if (!re.test(formValue.username)) { errors.username = 'Invalid username' }

        else {
            errors.first_name = null
        }
        if (formValue.password.length === 0) {
            console.log('PASSWORD NOT PROVIDED')
            errors.password = 'Password is blank'
        } //else if (!re.test(formValue.last_name)) { errors.last_name = 'Invalid Last Name' }

        else {
            errors.password = null
        }

        this.setState({ error: errors })
       // this.props.formNLErrors({ type: this.props.type, error: errors })    // track event

        return !error.username && !error.password
    }


    subscribe = (data) => {
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
        return this.subscribe(this.state.formValue)
    }


    render({ handleInput, handlePost, props: { hasError } } = this) {
        return (
            <div>
                <div className="DialogContainer">
                    <p> Appify => </p>

                    <div className="Dialog">
                        <form onSubmit={e => {
                            e.preventDefault()
                        }}>
                            <input type="text" name="username" className="StandardInput" placeholder="Username..."
                               onKeyUp={handleInput}
                               onChange={(e) => this.handleInput(e)}
                               haserror={this.state.error.username}
                               errormessage={this.state.error.username}
                            />

                            <input type="password" name="password" className="StandardInput" placeholder="Password..."
                               onKeyUp={handleInput}
                               onChange={(e) => this.handleInput(e)}
                               haserror={this.state.error.password}
                               errormessage={this.state.error.password}
                            />

                            <button type="submit" onClick={handlePost}> Login </button>

                        </form>
                        <p><Link href = '/register' >
                            <a> Click to Register</a>
                        </Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

// TODO: Style the page with radium, make shareable input for every input in app

export default Login