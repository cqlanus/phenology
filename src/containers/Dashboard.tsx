import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { AppState } from '../redux';

import { getEntities } from '../redux/entities'
import { selectUser } from '../redux/user'

const mapState = (state: AppState) => {
    return {
        user: selectUser(state)
    }
}

const mapDispatch = {
    getEntities
}

export default connect(mapState, mapDispatch)(Dashboard)