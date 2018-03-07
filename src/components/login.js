import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            signInError: false,
            notificationBar: false,
            notificationText: ''
        }
    }


    render() {
        const { username, password } = this.state
        return (
            <div>
                <div className="DialogContainer">
                    <p>Gabby Gator</p>

                    <div className="Dialog">
                        <form onSubmit={e => {
                            e.preventDefault()
                            this.props.login(this.state)
                        }}>
                            <input className="StandardInput" placeholder="Username..." value={username}
                                   onChange={e => this.setState({ username: e.target.value })}
                            />

                            <input className="StandardInput" placeholder="Password..." value={password}
                                   onChange={e => this.setState({ password: e.target.value })}
                            />

                            <button type="submit"> Login </button>

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

export default Login