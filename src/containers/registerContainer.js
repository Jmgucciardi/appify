import { connect } from 'react-redux'
import Register from '../components/register'
import { register, checkUsername } from '../actions/register'

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (user) => {
            dispatch(register(user))
        },
        checkUsername: (username) => {
            dispatch(checkUsername(username))
        }
    }
}

export default connect(null, mapDispatchToProps)(Register)