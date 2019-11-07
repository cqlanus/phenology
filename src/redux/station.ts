import { createSlice } from 'redux-starter-kit'
import API from '../api'
import { Station, StationArgs } from '../types/climate'
import { getCounty, selectCounty, getCountyByZip } from './county'
import { AppState, AppThunk } from '.'
import { createSelector } from 'reselect'
import { editUserGardens } from './garden'
import { selectUser } from './user'
import { Garden } from '../types/user'
import { setEntities } from './entities'
import api from '../api'
import { toast } from 'react-toastify'

/* Initial State */
const initialState: StationState = {
    loading: false,
    stations: [],
    selectedStation: undefined,
    error: undefined,
}

const stationSlice = createSlice({
    name: 'station',
    initialState,
    reducers: {
        stationLoading: state => ({
            ...state,
            loading: true,
            error: undefined,
        }),
        stationFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload.error,
        }),
        getStationsComplete: (state, action) => ({
            ...state,
            loading: false,
            stations: action.payload.stations,
        }),
        selectStation: (state, action) => ({
            ...state,
            selectedStation: action.payload,
        })
    }
})

export const { stationLoading, stationFailed, getStationsComplete, selectStation } = stationSlice.actions
export default stationSlice.reducer

export interface StationState {
    loading: boolean
    stations: StationArgs[]
    selectedStation: string | undefined
    error?: Error
}

/* Async  */
export const getNearbyStations = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(stationLoading())
        await dispatch(getCounty())
        const county = selectCounty(getState())
        if (county) {
            const stations = await API.getNearbyStations(county.countyId)
            dispatch(getStationsComplete({stations}))
        } else {
            throw Error('No county id')
        }
    } catch (error) {
        console.log({ error })
        toast.error('Get nearby stations failed')
        dispatch(stationFailed({error}))
    }
}

export const getStationsFromZip = (zip: string): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(stationLoading())
        await dispatch(getCountyByZip(zip))
        const county = selectCounty(getState())
        if (county) {
            const stations = await API.getNearbyStations(county.countyId)
            dispatch(getStationsComplete({stations}))
        } else {
            throw Error('No county id')
        }
    } catch (error) {
        console.log({ error })
        toast.error('Get stations from zip failed')
        dispatch(stationFailed({error}))
    }
}

export const markStationAsFavorite = (
    station: StationArgs,
    gardens: Garden[],
): AppThunk => async (dispatch, getState) => {
    try {
        const builtUser = selectUser(getState())

        const favoriteGarden = (station: StationArgs) => async (garden: Garden) => {
            const newStation = Station.of(station)
            const updatedGarden = Garden.of({ ...garden, station: newStation })
            if (builtUser) {
                const updatedUser = editUserGardens(builtUser, updatedGarden)
                const entities = await api.updateUser(updatedUser)
                dispatch(setEntities(entities))
            }
        }

        await Promise.all(gardens.map(favoriteGarden(station)))
    } catch (error) {
        toast.error('Mark station as favorite failed')
        console.log({ error })
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
