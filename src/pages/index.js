import React from 'react'

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stateList: ''
        }
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