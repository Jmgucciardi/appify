import React , { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Input from 'material-ui/TextField'

class Register extends Component {
    constructor() {
        super()

        this.state = {
            dialogActive: false,
            registerError: false,
            formValue: {
                username: '',
                password: '',
                isAuthenticating: false
            },

            error: {
                validName: null,
                username: null,
                password: null,
            },
        }
    }

    validateForm = (body) => {
        const { error, formValue } = this.state
        const errors = this.state.error


        if (formValue.username.length === 0) {
            errors.username = 'Username is required'
        }

        else {
            errors.username = null
        }
        if (formValue.password.length === 0) {
            errors.password = 'Password is required'
        }

        else {
            errors.password = null
        }

        this.setState({ error: errors })

        return !error.username && !error.password
    }


    register = (data) => {
        if (this.validateForm(data)) {
            this.setState({ loading: true })
            return this.props.register(data)
        }
    }

    handleInput = ({ target: { name, value } }) => {
        const formValue = { ...this.state.formValue, [name]: value }
        this.setState({ formValue })
    }

    handlePost = (e) => {
        e.preventDefault()
        return this.register(this.state.formValue)
    }

    checkUsername = () => {
        fetch(`/api/username/${this.state.formValue.username}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ registerError: res.alreadyInUse })
            })
            .catch(() => {})
    }

    render({ handleInput, handlePost } = this) {
        return (
            <div className="RegisterContainer">
                <p> Create An Account</p>
                <div className="RegisterForm">
                    <form onSubmit={e => {
                        e.preventDefault()
                    }}>
                        <Input type="text" name="username" className="StandardInput" placeholder="Username..."
                               id='username'
                               onKeyUp={handleInput}
                               onChange={(e) => this.handleInput(e)}
                               onBlur={this.checkUsername}
                               errorText={
                                   this.state.error.username ? this.state.error.username : null || this.state.registerError ? 'Username already in use' : null
                               }
                        />

                        <Input type="password" name="password" className="StandardInput" placeholder="Password..."
                               id='password'
                               onKeyUp={handleInput}
                               onChange={(e) => this.handleInput(e)}
                               errorText={this.state.error.password}
                        />

                        <RaisedButton type="submit" onClick={handlePost}> Register </RaisedButton>
                    </form>
                </div>
            </div>

        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired
}


export default Register