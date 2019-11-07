import { createSlice } from 'redux-starter-kit'
import { User, Garden, Planting, Entry } from '../types/entities'

import api from '../api/index'
import { AppState, AppThunk } from '.'
import { AuthUser } from './auth'
import { getPlants } from './plants';
import { toast } from 'react-toastify';

/* Initial State */
const initialState: EntitiesState = {
    users: {},
    gardens: {},
    plantings: {},
    entries: {},
    loading: false,
    error: undefined
}

const entitiesSlice = createSlice({
    name: 'entities',
    initialState,
    reducers: {
        entityLoading: state => ({
            ...state,
            loading: true,
            error: undefined
        }),
        entityFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload.error
        }),
        flushEntity: () => initialState,
        setEntities: (state, {payload}) => {
            const { entities } = payload
            return (
                {
                    ...state,
                    loading: false,
                    users: { ...state.users, ...entities.users },
                    gardens: { ...state.gardens, ...entities.gardens },
                    plantings: { ...state.plantings, ...entities.plantings },
                    entries: { ...state.entries, ...entities.entries },
                }
            )
        }
    }
})

export const { entityFailed, entityLoading, flushEntity, setEntities } = entitiesSlice.actions
export default entitiesSlice.reducer

/* Interfaces */
interface Phenophase {
    key: string
    value: string
    text: string
    description: string
}

export interface UserEntity { [userId: string]: User }
export interface GardenEntity { [gardenId: string]: Garden }
export interface PlantingEntity { [plantingId: string]: Planting }
export interface EntryEntity { [entryId: string]: Entry }
export interface PhenophaseEntity { [phenophaseId: string]: Phenophase }

export interface Entities {
    users: UserEntity
    gardens: GardenEntity
    plantings: PlantingEntity
    entries: EntryEntity
}

interface EntitiesState extends Entities {
    loading: boolean
    error?: Error
}

/* Async */
export const getEntities = (): AppThunk => async dispatch => {
    try {
        dispatch(entityLoading())
        const { entities } = await api.getEntities()
        dispatch(setEntities(entities))
    } catch (error) {
        dispatch(entityFailed({error}))
    }
}

export const getApiUser = (authUser: AuthUser): AppThunk => async dispatch => {
    try {
        const entities = await api.getApiUser(authUser)
        await dispatch(getPlants())
        dispatch(setEntities(entities))
    } catch (error) {
        toast.error('Get user failed')
        console.log({error1: error})
    }
}

/* Selectors */
export const selectUserEntity = (state: AppState) => state.entities.users
export const selectGardenEntity = (state: AppState) => state.entities.gardens
export const selectPlantingEntity = (state: AppState) => state.entities.plantings
export const selectEntryEntity = (state: AppState) => state.entities.entries
export const selectUser = (state: AppState, userName: string) => state.entities.users[userName]