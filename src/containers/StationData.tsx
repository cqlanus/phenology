import StationData from '../components/StationData'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { CLIMATE_NORMS, HISTORICAL_WEATHER } from '../redux/ui'
import { getHistoricalWeather } from '../redux/weather'
import { getClimateNorms } from '../redux/climate'
import { getSelectedStation, getStation } from '../redux/station'
import { selectUser } from '../redux/user'

const mapState = (state: AppState) => {
    const station = getStation(state)
    const stationName = station && station.name.split(',')[0]
    const user = selectUser(state)
    const gardens = user && user.gardens
    return {
        selectedStation: getSelectedStation(state),
        stationName,
        gardens,
        isClimateActive: state.ui.dataDisplay === CLIMATE_NORMS,
        isHistoricalWeatherActive: state.ui.dataDisplay === HISTORICAL_WEATHER,
    }
}

const mapDispatch = {
    getHistoricalWeather,
    getClimateNorms,
}

const mergeProps = (stateProps: any, dispatchProps: any) => {
    const { selectedStation } = stateProps
    const { getClimateNorms, getHistoricalWeather } = dispatchProps
    return {
        ...stateProps,
        handleNorms: () => selectedStation && getClimateNorms(selectedStation),
        handleYtdWeather: () => selectedStation && getHistoricalWeather(selectedStation)
    }
}

export default connect(mapState, mapDispatch, mergeProps)(StationData)