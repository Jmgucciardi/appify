import React from "react"
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import { initStore} from "../store"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import Dialog from 'material-ui/Dialog'
import {deepOrange500} from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin'
import FingerPrint from 'material-ui/svg-icons/action/fingerprint'
import Add from 'material-ui/svg-icons/content/add'


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
                label='Ok'
                primary={Boolean(true)}
                onTouchTap={this.handleRequestClose}
            />
        )

        return (
            <MuiThemeProvider muiTheme={getMuiTheme({userAgent, darkBaseTheme})}>
                <div style={styles.container}>
                    <Dialog
                        open={this.state.open}
                        title='Super Secret Password'
                        actions={standardActions}
                        onRequestClose={this.handleRequestClose}
                    >
                        1-2-3-4-5
                    </Dialog>
                    <h1>Appify =></h1>
                    <h2>::Alpha::</h2>
                    <Link href = '/login' >
                        <RaisedButton style={{position: 'relative', right: '30px'}}>
                            <a><FingerPrint style={styles.fingerprint}/></a>
                        </RaisedButton>
                    </Link>
                    <Link href = '/register' >
                        <RaisedButton style={{position: 'relative', left: '30px'}}>
                            <a><Add style={styles.add}/></a>
                        </RaisedButton>
                    </Link>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default withRedux(initStore)(HomePage)
