import React from 'react'
import withRedux from 'next-redux-wrapper'
import RegisterContainer from '../containers/registerContainer'
import { initStore } from '../store'

const registerPage = () => {
    return (
        <div>
            <RegisterContainer />
        </div>
    )
}

export default withRedux(initStore)(registerPage)