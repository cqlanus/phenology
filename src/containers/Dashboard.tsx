import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'

import { AppState } from '../redux';
import { selectUser } from '../redux/user'
import { selectStation } from '../redux/station';
import { getHistoricalWeather } from '../redux/weather';

const mapState = (state: AppState) => {
    const user = selectUser(state)
    return {
        user,
    }
}

const mapDispatch = {
    selectStation,
    getHistoricalWeather
}

export default connect(mapState, mapDispatch)(Dashboard)