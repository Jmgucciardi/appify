import React, { Component } from 'react'
import UserList from './userList'
import RaisedButton from 'material-ui/RaisedButton'

import events from '../../events'
import io from 'socket.io-client'


// webstorm auto-magically generated the import statement above, keeping it until I know props will handle the call

class ChatPage extends Component {


    render() {

        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                }}>
               <p> Chat Page</p>
                    <UserList/>

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