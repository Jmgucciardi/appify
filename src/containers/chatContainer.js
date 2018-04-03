import { connect } from 'react-redux'
import Chat from '../components/chat'
import {getUsers, _handleLocalStorage, _handleUsersById} from '../actions/chat'
import {logout} from '../actions/login'


function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => {
            const action = getUsers()
            dispatch(action)
        },
        _handleUsersById: (id) => {
            const action = _handleUsersById(id)
            dispatch(action)
        },
        _handleLocalStorage: () => {
            const action = _handleLocalStorage()
            dispatch(action)
        },
        logout: () => {
            const action = logout()
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)