import { connect } from 'react-redux'
import Register from '../components/register'
import { register } from '../actions/register'

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (user) => {
            dispatch(register(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(Register)