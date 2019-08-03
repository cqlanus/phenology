import API from '../api'
import { Station } from '../types/climate'
import { getCounty, selectCounty } from './county';

/* Action Types */
const GET_STATIONS_START: 'GET_STATIONS_START' = 'GET_STATIONS_START'
const GET_STATIONS_COMPLETE: 'GET_STATIONS_COMPLETE' = 'GET_STATIONS_COMPLETE'
const GET_STATIONS_FAILED: 'GET_STATIONS_FAILED' = 'GET_STATIONS_FAILED'
const SELECT_STATION: 'SELECT_STATION' = 'SELECT_STATION'

/* Action Creators */
const getStationStart = () => {
    return {
        type: GET_STATIONS_START
    }
}

const getStationsComplete = (stations: Station[]) => {
    return {
        type: GET_STATIONS_COMPLETE,
        response: stations
    }
}

const getStationsFailed = (error: Error) => {
    return {
        type: GET_STATIONS_FAILED,
        error
    }
}

export const selectStation = (station: string) => {
    return {
        type: SELECT_STATION,
        station: station
    }
}

/* Interfaces */
interface GetStationStartAction {
    type: typeof GET_STATIONS_START,
}
interface GetStationCompleteAction {
    type: typeof GET_STATIONS_COMPLETE,
    response: Station[]
}
interface GetStationFailedAction {
    type: typeof GET_STATIONS_FAILED,
    error: Error
}
interface SelectStationAction {
    type: typeof SELECT_STATION,
    station: string
}

export type StationActions = GetStationStartAction 
    | GetStationCompleteAction
    | GetStationFailedAction
    | SelectStationAction

export interface StationState {
    loading: boolean
    stations: Station[]
    selectedStation: string | undefined
    error?: Error
}

/* Async  */
export const getNearbyStations = () => async (dispatch: any, getState: any) => {
    
    try {
        dispatch(getStationStart())
        await dispatch(getCounty())
        const county = selectCounty(getState())
        if (county) {
            const stations = await API.getNearbyStations(county.countyId)
            dispatch(getStationsComplete(stations))
        } else {
            throw Error('No county id')
        }
        
    } catch (error) {
        console.log({error})
        dispatch(getStationsFailed(error))        
    }
    // return {
    //     types: [ GET_STATIONS_START, GET_STATIONS_COMPLETE, GET_STATIONS_FAILED ],
    //     callAPI: () => API.getNearbyStations(countyId),
    //     station: { countyId }
    // }
}

/* Initial State */
const initialState: StationState = {
    loading: false,
    stations: [],
    selectedStation: undefined,
    error: undefined
}
    
/* Reducer */
export default (state = initialState, action: StationActions): StationState => {

    switch (action.type) {
        case GET_STATIONS_START: {
            return { 
                ...state,
                loading: true,
                error: undefined
            }
        }

        case GET_STATIONS_COMPLETE: {
            return {
                ...state,
                loading: false,
                stations: action.response
            }
        }

        case GET_STATIONS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }

        case SELECT_STATION: {
            return {
                ...state,
                selectedStation: action.station
            }
        }

        default:
            return state
    }
    
}