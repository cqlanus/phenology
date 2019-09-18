import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'

import { AppState } from '../redux';
import { selectUser } from '../redux/user'

const mapState = (state: AppState) => {
    const user = selectUser(state)
    return {
        user,
    }
}

const mapDispatch = {
}

export default connect(mapState, mapDispatch)(Dashboard)