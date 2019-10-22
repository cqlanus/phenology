import StationsList from '../components/StationsList'
import { AppState } from '../redux'
import { connect } from 'react-redux'

import { selectStation, markStationAsFavorite } from '../redux/station'
import { withRouter } from 'react-router'
import { selectGarden } from '../redux/garden'

const mapState = (state: AppState, ownProps: any) => {
    return {
        stations: state.station.stations,
        county: state.county.county,
        history: ownProps.history,
        garden: selectGarden(state),
        closeModal: ownProps.closeModal,
        shouldNavigate: ownProps.shouldNavigate
    }
}

const mapDispatch = {
    selectStation,
    markStationAsFavorite
}

const mergeProps = (stateProps: ReturnType<typeof mapState>, dispatchProps: typeof mapDispatch ) => {
    const { selectStation, markStationAsFavorite } = dispatchProps
    return {
        ...stateProps,
        selectStation,
        markStationAsFavorite
    }
}

export default withRouter(
    connect(mapState, mapDispatch, mergeProps)(StationsList)
)