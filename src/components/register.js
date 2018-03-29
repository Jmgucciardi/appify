import React , { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Input from 'material-ui/TextField'

class Register extends Component {
    constructor() {
        super()

        this.state = {
            error: false,
            username: '',
            password: ''
        }
    }

    _handleSubmit = (e) => {
        const newUser = this.props.createUser(e)
    }

    render() {
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        return (
            <div className="RegisterContainer">
                <p> Create An Account</p>
                <div className="RegisterForm">
                    <form onSubmit={e => {
                        e.preventDefault()
                        this.setState({
                            userNameInputValue: '',
                            passwordInputValue: ''
                        })

                       this.props.createUser(user)

                    }}>
                        <Input
                            id="username"
                            className="StandardInput"
                            placeholder="Username..."
                            value={this.state.username}
                               onChange={e => this.setState({
                                   username: e.target.value,
                               })}
                        />
                        <Input
                            id="password"
                            className="StandardInput"
                            type='password'
                            placeholder="Password..."
                            value={this.state.password}
                               onChange={e => this.setState({
                                   password: e.target.value,
                               })}
                        />

                        <RaisedButton type="submit"> Register </RaisedButton>
                    </form>
                </div>
            </div>

        )
    }
}

Register.propTypes = {
    createUser: PropTypes.func.isRequired
}


export default Register