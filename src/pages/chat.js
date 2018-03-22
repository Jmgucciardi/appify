import React from 'react'
import withRedux from 'next-redux-wrapper'
import ChatContainer from '../containers/chatContainer'
import { initStore} from "../store"


class Chat extends React.Component {

    render() {
        return (
            <div>
                <div>
                   <ChatContainer />
                </div>
            </div>
        )
    }
}

export default withRedux(initStore)(Chat)