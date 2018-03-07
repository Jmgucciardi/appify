import React from 'react'
import withRedux from 'next-redux-wrapper'
import LoginContainer from '../containers/loginContainer'
import { initStore} from "../store"

const loginPage = () => {
    return (
        <div>
            <LoginContainer />
        </div>
    )
}

export default withRedux(initStore, null, null)(loginPage)