import { connect } from 'react-redux'
import Chat from '../components/chat'
import {_handleConnect, _handleLocalStorage, _handleUsersById} from '../actions/chat'


function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        _handleConnect: () => {
            const action = _handleConnect()
            dispatch(action)
        },
        _handleUsersById: (id) => {
            const action = _handleUsersById(id)
            dispatch(action)
        },
        _handleLocalStorage: () => {
            const action = _handleLocalStorage()
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)