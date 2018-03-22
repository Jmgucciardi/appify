import React, { Component } from 'react'

import events from '../../events'
import io from 'socket.io-client'


// webstorm auto-magically generated the import statement above, keeping it until I know props will handle the call

class ChatPage extends Component {
    constructor(props) {
        super(props)

        // this.client = io('http://localhost')
        //
        // const eventHandlers = [
        //     {event: events.connect, handler: this.props._handleConnect }
        // ]
        //
        // eventHandlers.map(({ event, handler }) => this.client.on(event, handler))
        //
        // //
        // // this.client = io.connect(`//${window.location.host}`)
        // //
        // // const eventHandlers = [
        // //     { event: events.connect, handler: this._handleConnect },
        // //     { event: events.disconnect, handler: this._handleDisconnect },
        // //     { event: events.error, handler: this._handleError },
        // //     { event: events.online, handler: this._handleOnline },
        // //     { event: events.offline, handler: this._handleOffline },
        // //     { event: events.join, handler: this._handleJoin },
        // //     { event: events.leave, handler: this._handleLeave },
        // //     { event: events.msg, handler: this._handleMsg },
        // //     { event: events.privateMsg, handler: this._handlePrivateMsg },
        // //     { event: events.ownPrivateMsg, handler: this._handleOwnPrivateMsg },
        // // ]
        // //
        // // eventHandlers.map(({ event, handler }) => this.client.on(event, handler))

    }

    render() {
        return (
            <div>
               <p> CHAT PAGE </p>
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