import React from "react";
import Layout from '../components/layout'
import withRedux from 'next-redux-wrapper'
import { initStore} from "../store";


class HomePage extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <div>
                    <Layout/>
                </div>
            </div>
        )
    }
}

export default withRedux(initStore)(HomePage)