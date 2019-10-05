import StationsList from '../components/StationsList'
import { AppState } from '../redux'
import { connect } from 'react-redux'

import { selectStation } from '../redux/station'
import { withRouter } from 'react-router'

const mapState = (state: AppState, ownProps: any) => {
    return {
        stations: state.station.stations,
        county: state.county.county,
        history: ownProps.history
    }
}

const mapDispatch = {
    selectStation,
}

const mergeProps = (stateProps: ReturnType<typeof mapState>, dispatchProps: typeof mapDispatch ) => {
    const { selectStation } = dispatchProps
    return {
        ...stateProps,
        selectStation,
    }
}

export default withRouter(
    connect(mapState, mapDispatch, mergeProps)(StationsList)
)