import { AppState } from ".";
import { getClimateComplete } from "./climate";
import { getWeatherComplete } from "./weather";
import { selectStation } from './station';

export const CLIMATE_NORMS = 'CLIMATE_NORMS'
export const HISTORICAL_WEATHER = 'HISTORICAL_WEATHER'

/* Initial State */
const initialState: UiState = {
    dataDisplay: undefined
}

/* Interfaces */
export interface DataDisplayType {
    CLIMATE_NORMS: string
    HISTORICAL_WEATHER: string
}

interface UiState {
    dataDisplay: keyof DataDisplayType | undefined
}

/* Reducer */
export default (state = initialState, action: any): UiState => {

    switch (action.type) {
        case getClimateComplete.type: {
            return {
                ...state,
                dataDisplay: CLIMATE_NORMS
            }
        }

        case getWeatherComplete.type: {
            return {
                ...state,
                dataDisplay: HISTORICAL_WEATHER
            }
        }

        case selectStation.type: {
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
