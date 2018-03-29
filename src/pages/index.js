import React from "react"
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import { initStore} from "../store"
import LoginContainer from '../containers/loginContainer'
import RegisterContainer from '../containers/registerContainer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import Dialog from 'material-ui/Dialog'
import {deepOrange500} from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin'


if (!process.tapEventInjected) {
    injectTapEventPlugin()
    process.tapEventInjected = true
}

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 200
    },
    fingerprint: {
        width: 100,
        height: 100,
    },
    add: {
        width: 100,
        height: 100
    },
}

const muiTheme = {
    palette: {
        accent1Color: deepOrange500
    }
}


class HomePage extends React.Component {
    static getInitialProps ({ req }) {
        // Ensures material-ui renders the correct css prefixes server-side
        let userAgent
        if (process.browser) {
            userAgent = navigator.userAgent
        } else {
            userAgent = req.headers['user-agent']
        }

        return { userAgent }
    }
    constructor(props, context) {
        super(props, context)

        this.state = {
            open : false
        }

    }

    handleRequestClose = () => {
        this.setState({
            open: false
        })
    }

    handleTouchTap = () => {
        this.setState({
            open: true
        })
    }

    render() {

        const { userAgent } = this.props

        const standardActions = (
            <FlatButton
                label='Go Back'
                primary={Boolean(true)}
                onTouchTap={this.handleRequestClose}
            />

        )

        return (
            <MuiThemeProvider muiTheme={getMuiTheme({userAgent, darkBaseTheme})}>
                <div style={styles.container}>
                    <div>
                        <div>
                            <Dialog
                                open={this.state.open}
                                title='Register'
                                actions={standardActions}
                                onRequestClose={this.handleRequestClose}
                                 >

                                <RegisterContainer/>

                            </Dialog>
                        </div>
                        <h1> Appify => </h1>
                        <h2>::Alpha::</h2>
                        <RaisedButton
                            label="Register"
                            secondary
                            onTouchTap={this.handleTouchTap}>
                        </RaisedButton>
                    </div>
                    <p> or </p>
                    <LoginContainer/>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withRedux(initStore)(HomePage)
