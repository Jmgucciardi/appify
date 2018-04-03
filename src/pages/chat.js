import React from 'react'
import withRedux from 'next-redux-wrapper'
import ChatContainer from '../containers/chatContainer'
import { initStore} from "../store"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

class Chat extends React.Component {

    render() {
        const { userAgent } = this.props

        return (
            <MuiThemeProvider muiTheme={getMuiTheme({userAgent, darkBaseTheme})}>
                <div>
                    <div>
                       <ChatContainer />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withRedux(initStore, null, null)(Chat)