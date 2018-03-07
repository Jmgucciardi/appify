import React, { Component } from 'react'
import Sidebar from 'react-sidebar'
import Link from 'next/link'

/*
*  For documentation on react-sidebar: https://github.com/balloob/react-sidebar
*  most of this is boiler plate
*  toggles right now, although the logic is janky. Will clean up and place the toggle button on a header above
*  the sidebar
* */

class Layout extends Component {
    constructor() {
        super()

        this.state = {
            sidebarToggle: false
        }
    }

    toggleSideBar = (sidebarToggle) => {
        this.setState({ sidebarToggle })
    }

    render() {
        const sideBarContent = <div>
            <p><Link href = '/register'>
                <a>Click to Register</a>
            </Link></p>

            <p><Link href = '/login'>
                <a>Click to Login</a>
            </Link></p>

        </div>

        return (
            <div>
                <Sidebar sidebar={<div style={{backgroundColor: 'white', height: '100%',
                    paddingLeft: '10', paddingRight: '10',
                    cursor: 'hand'}}>
                    <button onClick={() => this.setState({ sidebarToggle: false})}> Remove Sidebar </button>
                    {sideBarContent}
                </div>}

                         open={this.state.sidebarToggle} docked={false} onSetOpen={this.toggleSideBar}>

                    <button onClick={() => this.setState({ sidebarToggle: !!this.toggleSideBar})}>
                        Show Sidebar
                    </button>
                </Sidebar>
            </div>
        )
    }
}

export default Layout