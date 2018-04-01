import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import events from '../../events'
import io from 'socket.io-client'


// webstorm auto-magically generated the import statement above, keeping it until I know props will handle the call

class ChatPage extends Component {

    componentDidMount() {
        if (this.props.match) {
            const id = this.props.match.params.username
            this.props._handleUsersById(id) // get api/username/:username
            this.props._handleConnect() // get api/users
            this.props._handleLocalStorage()
        }
    }

    render() {
        this.props._handleConnect()
        this.props._handleLocalStorage()

        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                }}>
               <p> Chat Page</p>

                </form>
            </div>
        )
    }
}

export default ChatPage

/**
 * Write simple map function => function should use the _getAllUsers method from actions/chat to call the
 * _getAllUsers method found in actions/chat. This will hit the /users api and retrieve all users in the DB
 */

// TODO: filter users by online status, that would make sense