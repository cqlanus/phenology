import API from '../api'
import { Station, StationArgs } from '../types/climate'
import { getCounty, selectCounty } from './county'
import { AppState } from '.'
import { createSelector } from 'reselect'
import { selectGarden, editUserGardens } from './garden'
import { selectUser } from './user'
import { Garden } from '../types/user'
import { setEntities } from './entities'
import api from '../api'

/* Action Types */
const GET_STATIONS_START: 'GET_STATIONS_START' = 'GET_STATIONS_START'
const GET_STATIONS_COMPLETE: 'GET_STATIONS_COMPLETE' = 'GET_STATIONS_COMPLETE'
const GET_STATIONS_FAILED: 'GET_STATIONS_FAILED' = 'GET_STATIONS_FAILED'
export const SELECT_STATION: 'SELECT_STATION' = 'SELECT_STATION'

/* Action Creators */
const getStationStart = () => {
    return {
        type: GET_STATIONS_START,
    }
}

const getStationsComplete = (stations: StationArgs[]) => {
    return {
        type: GET_STATIONS_COMPLETE,
        response: stations,
    }
}

const getStationsFailed = (error: Error) => {
    return {
        type: GET_STATIONS_FAILED,
        error,
    }
}

export const selectStation = (station: string) => {
    return {
        type: SELECT_STATION,
        station: station,
    }
}

/* Interfaces */
interface GetStationStartAction {
    type: typeof GET_STATIONS_START
}
interface GetStationCompleteAction {
    type: typeof GET_STATIONS_COMPLETE
    response: StationArgs[]
}
interface GetStationFailedAction {
    type: typeof GET_STATIONS_FAILED
    error: Error
}
export interface SelectStationAction {
    type: typeof SELECT_STATION
    station: string
}

export type StationActions =
    | GetStationStartAction
    | GetStationCompleteAction
    | GetStationFailedAction
    | SelectStationAction

export interface StationState {
    loading: boolean
    stations: StationArgs[]
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
        console.log({ error })
        dispatch(getStationsFailed(error))
    }
    // return {
    //     types: [ GET_STATIONS_START, GET_STATIONS_COMPLETE, GET_STATIONS_FAILED ],
    //     callAPI: () => API.getNearbyStations(countyId),
    //     station: { countyId }
    // }
}

export const markStationAsFavorite = (
    station: StationArgs,
    gardens: Garden[],
) => async (dispatch: any, getState: any) => {
    try {
        const builtUser = selectUser(getState())

        const favoriteGarden = (station: StationArgs) => async (garden: Garden) => {
            const newStation = Station.of(station)
            const updatedGarden = Garden.of({ ...garden, station: newStation })
            if (builtUser) {
                const updatedUser = editUserGardens(builtUser, updatedGarden)
                const response = await api.updateUser(updatedUser)
                dispatch(setEntities(response))
            }
        }

        await Promise.all(gardens.map(favoriteGarden(station)))
    } catch (error) {
        console.log({ error })
    }
}

/* Initial State */
const initialState: StationState = {
    loading: false,
    stations: [],
    selectedStation: undefined,
    error: undefined,
}

/* Reducer */
export default (state = initialState, action: StationActions): StationState => {
    switch (action.type) {
        case GET_STATIONS_START: {
            return {
                ...state,
                loading: true,
                error: undefined,
            }
        }

        case GET_STATIONS_COMPLETE: {
            return {
                ...state,
                loading: false,
                stations: action.response,
            }
        }

        case GET_STATIONS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        }

        case SELECT_STATION: {
            return {
                ...state,
                selectedStation: action.station,
            }
        }

        default:
            return state
    }
}

/* Selectors */
export const getSelectedStation = (state: AppState) =>
    state.station.selectedStation
const selectStations = (state: AppState) => state.station.stations
export const getStation = createSelector(
    [getSelectedStation, selectStations],
    (stationId, stations) => {
        return stations.find(s => s.id === stationId)
    },
)
