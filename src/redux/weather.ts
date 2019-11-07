import { createSlice } from 'redux-starter-kit'
import { getHistoricalWeather as getWeather } from '../hooks/climate'
import { YtdWeather } from '../types/weather'
import { AppState } from '.';
import { selectStation } from './station';
import { toast } from 'react-toastify';

/* Initial State */
const initialState: HistoricalWeatherState = {
    loading: false,
    ytdWeather: [],
    error: undefined
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        weatherLoading: state => ({
            ...state,
            loading: true,
            error: undefined
        }),
        weatherFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload.error
        }),
        getWeatherComplete: (state, action) => ({
            ...state,
            loading: false,
            ytdWeather: action.payload.ytdWeather
        }),
        [selectStation.type]: () => initialState
    }
})

export const { weatherLoading, weatherFailed, getWeatherComplete } = weatherSlice.actions
export default weatherSlice.reducer

/* Interfaces */

export interface HistoricalWeatherState {
    loading: boolean
    ytdWeather: YtdWeather
    error?: Error
}

/* Async */
export const getHistoricalWeather = (stationId: string) => async (dispatch: any) => {
    try {
        dispatch(weatherLoading())
        const ytdWeather = await getWeather(stationId)
        dispatch(getWeatherComplete({ytdWeather}))
        
    } catch (error) {
        console.log({error})
        toast.error('Get weather failed')
        dispatch(weatherFailed({error}))
        
    }
}

/* Selectors */
export const selectWeather = (state: AppState) => state.weather.ytdWeather