import { AppState } from ".";
import { GET_CLIMATE_NORMS_COMPLETE } from "./climate";
import { GET_HISTORICAL_WEATHER_COMPLETE } from "./weather";
import { SELECT_STATION } from './station';

export const CLIMATE_NORMS = 'CLIMATE_NORMS'
export const HISTORICAL_WEATHER = 'HISTORICAL_WEATHER'

/* Interfaces */
export interface DataDisplayType {
    CLIMATE_NORMS: string
    HISTORICAL_WEATHER: string
}

interface UiState {
    dataDisplay: keyof DataDisplayType | undefined
}

/* Initial State */
const initialState: UiState = {
    dataDisplay: undefined
}

/* Reducer */
export default (state = initialState, action: any): UiState => {

    switch (action.type) {
        case GET_CLIMATE_NORMS_COMPLETE: {
            return {
                ...state,
                dataDisplay: CLIMATE_NORMS
            }
        }

        case GET_HISTORICAL_WEATHER_COMPLETE: {
            return {
                ...state,
                dataDisplay: HISTORICAL_WEATHER
            }
        }

        case SELECT_STATION: {
            return initialState
        }

        default:
            return state
    }

}

/* Selectors */
export const selectIsAppLoading = (state: AppState) => {
    const isClimateLoading = state.climate.loading
    const isWeatherLoading = state.weather.loading
    const isCountyLoading = state.county.loading
    const isStationLoading = state.station.loading

    return isClimateLoading || isWeatherLoading || isCountyLoading || isStationLoading
}
