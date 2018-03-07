import { connect } from 'react-redux'
import Register from '../components/register'
import { createUser } from '../actions/register'

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: function(user) {
            dispatch(createUser(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(Register)