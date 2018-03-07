import { connect } from 'react-redux'
import Login from '../components/login'
import { login } from '../actions/login'


function mapDispatchToProps(dispatch) {
    return {
        login: function(user) {
            dispatch(login(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)