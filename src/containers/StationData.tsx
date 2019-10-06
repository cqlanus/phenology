import StationData from '../components/StationData'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { CLIMATE_NORMS, HISTORICAL_WEATHER } from '../redux/ui'
import { getHistoricalWeather } from '../redux/weather'
import { getClimateNorms } from '../redux/climate'
import { getSelectedStation, getStation, markStationAsFavorite } from '../redux/station'
import { selectUser } from '../redux/user'
import { Garden } from '../types/entities'

const mapState = (state: AppState) => {
    const station = getStation(state)
    const stationName = station && station.name.split(',')[0]
    const user = selectUser(state)
    const gardens = user && user.gardens
    console.log({gardens})
    return {
        selectedStation: getSelectedStation(state),
        stationName,
        station,
        gardens,
        isClimateActive: state.ui.dataDisplay === CLIMATE_NORMS,
        isHistoricalWeatherActive: state.ui.dataDisplay === HISTORICAL_WEATHER,
    }
}

const mapDispatch = {
    getHistoricalWeather,
    getClimateNorms,
    markStationAsFavorite,
}

const mergeProps = (stateProps: any, dispatchProps: any) => {
    const { selectedStation, station } = stateProps
    const { getClimateNorms, getHistoricalWeather, markStationAsFavorite } = dispatchProps
    return {
        ...stateProps,
        handleApply: (gardens: Garden[]) => markStationAsFavorite(station, gardens),
        handleNorms: () => selectedStation && getClimateNorms(selectedStation),
        handleYtdWeather: () => selectedStation && getHistoricalWeather(selectedStation)
    }
}

export default connect(mapState, mapDispatch, mergeProps)(StationData)