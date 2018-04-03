import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Input from 'material-ui/TextField'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            dialogActive: false,
            formValue: {
                username: '',
                password: '',
                isAuthenticating: false
            },

            error: {
                username: null,
                password: null,
            },
        }
    }
/**
*  For now, just testing to see if the user left the fields blank or not, next will be confirming a valid username
*  and password from the API call. Currently, if left blank, Validation is working and no call is made to to server
* */

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
        return this.login(this.state.formValue)
    }


    render({ handleInput, handlePost } = this) {
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