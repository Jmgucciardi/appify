import React from 'react'

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stateList: ''
        }
    }

    static async getInitialProps(context) {
        const { store, isServer, query, req } = context;
        if (isServer) {
            if (isServer) {
                console.log(req.cookies);
            }
        }
        return { isServer };
    }

    render() {
        return (
            <div>
                <div>
                    <p> Hello Testing! </p>
                </div>
            </div>
        )
    }
}

export default HomePage