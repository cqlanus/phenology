import StationsList from '../components/StationsList'
import { AppState } from '../redux'
import { connect } from 'react-redux'

import { selectStation } from '../redux/station'
import { getHistoricalWeather } from '../redux/weather'
import { getClimateNorms } from '../redux/climate'
import { CLIMATE_NORMS, HISTORICAL_WEATHER } from '../redux/ui';

const mapState = (state: AppState) => {
    return {
        stations: state.station.stations,
        county: state.county.county,
        selectedStation: state.station.selectedStation,
        isClimateActive: state.ui.dataDisplay === CLIMATE_NORMS,
        isHistoricalWeatherActive: state.ui.dataDisplay === HISTORICAL_WEATHER
    }
}

const mapDispatch = {
    selectStation,
    getHistoricalWeather,
    getClimateNorms,
}

const mergeProps = (stateProps: ReturnType<typeof mapState>, dispatchProps: typeof mapDispatch ) => {
    const { selectedStation } = stateProps
    const { getClimateNorms, getHistoricalWeather, selectStation } = dispatchProps
    return {
        ...stateProps,
        selectStation,
        handleNorms: () => selectedStation && getClimateNorms(selectedStation),
        handleYtdWeather: () => selectedStation && getHistoricalWeather(selectedStation)
    }
}

export default connect(mapState, mapDispatch, mergeProps)(StationsList)