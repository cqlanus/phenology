import { getHistoricalWeather as getWeather } from '../hooks/climate'
import { YtdWeather } from '../types/weather'
import { AppState } from '.';

/* Action Types */
const GET_HISTORICAL_WEATHER_START: 'GET_HISTORICAL_WEATHER_START' = 'GET_HISTORICAL_WEATHER_START'
export const GET_HISTORICAL_WEATHER_COMPLETE: 'GET_HISTORICAL_WEATHER_COMPLETE' = 'GET_HISTORICAL_WEATHER_COMPLETE'
const GET_HISTORICAL_WEATHER_FAILED: 'GET_HISTORICAL_WEATHER_FAILED' = 'GET_HISTORICAL_WEATHER_FAILED'

/* Action Creators */


/* Interfaces */
interface GetWeatherStartAction {
    type: typeof GET_HISTORICAL_WEATHER_START,
}
interface GetWeatherCompleteAction {
    type: typeof GET_HISTORICAL_WEATHER_COMPLETE,
    response: YtdWeather
}
interface GetWeatherFailedAction {
    type: typeof GET_HISTORICAL_WEATHER_FAILED,
    error: Error
}

export type HistoricalWeatherAction = GetWeatherStartAction | GetWeatherCompleteAction | GetWeatherFailedAction

export interface HistoricalWeatherState {
    loading: boolean
    ytdWeather: YtdWeather
    error?: Error
}

/* Async */
export const getHistoricalWeather = (stationId: string) => async (dispatch: any) => {
    try {
        dispatch({ type: GET_HISTORICAL_WEATHER_START })
        const ytdWeather = await getWeather(stationId)
        dispatch({ type: GET_HISTORICAL_WEATHER_COMPLETE, response: ytdWeather })
        
    } catch (error) {
        dispatch({ type: GET_HISTORICAL_WEATHER_FAILED, error })
        
    }
    // return {
    //     types: [ GET_HISTORICAL_WEATHER_START, GET_HISTORICAL_WEATHER_COMPLETE, GET_HISTORICAL_WEATHER_FAILED ],
    //     callAPI: () => getWeather(stationId),
    //     payload: { stationId }
    // }
}

/* Initial State */
const initialState: HistoricalWeatherState = {
    loading: false,
    ytdWeather: [],
    error: undefined
}

/* Reducer */
export default (state = initialState, action: HistoricalWeatherAction): HistoricalWeatherState => {

    switch (action.type) {
        case GET_HISTORICAL_WEATHER_START: {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        }

        case GET_HISTORICAL_WEATHER_COMPLETE: {
            return {
                ...state,
                loading: false,
                ytdWeather: action.response
            }
        }

        case GET_HISTORICAL_WEATHER_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        
        default:
            return state
    }

    
}

/* Selectors */
export const selectWeather = (state: AppState) => state.weather.ytdWeather