import { createSlice } from 'redux-starter-kit'
import { AppState, AppThunk } from './'
import api from '../api'

import { PlantEntity, PlantArgs, NetworkPlant } from '../types/user'
import { addPlantings } from './planting'

/* Initial State */
const initialState: PlantState = {
    loading: false,
    plants: {},
    error: undefined
}

const plantSlice = createSlice({
    name: 'plants',
    initialState,
    reducers: {
        addPlantsComplete: (state, action) => ({
            ...state,
            loading: false,
            plants: action.payload.plants,
            justAdded: action.payload.plant
        }),
        getPlantsComplete: (state, action) => {
            return {...state,
            loading: false,
            plants: action.payload.plants}
        },
        plantsLoading: (state) => ({
            ...state,
            loading: true,
            error: undefined,
            justAdded: undefined
        }),
        plantsFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload.error
        })
    }
})

export const { addPlantsComplete, getPlantsComplete, plantsLoading, plantsFailed } = plantSlice.actions
export default plantSlice.reducer

/* Interfaces */
export interface PlantState {
    loading: boolean
    plants: PlantEntity
    justAdded?: NetworkPlant
    error?: Error
}

/* Async */
export const getPlants = (): AppThunk => async dispatch => {
    try {
        dispatch(plantsLoading())
        const plants = await api.getPlants()
        dispatch(getPlantsComplete({plants}))
    } catch (error) {
        dispatch(plantsFailed({error}))
    }
}

export const addPlant = ({ qty, ...plant}: PlantArgs, shouldAddPlanting: boolean = false): AppThunk => async dispatch => {
    try {
        dispatch(plantsLoading())
        const plantModel = await api.addPlant(plant)
        const plants = await api.getPlants()
        dispatch(addPlantsComplete({ 
            plants, 
            plant: plantModel }))

        const selection = {
            [plantModel.id]: { ...plantModel, qty: 1 }
        }
        shouldAddPlanting && dispatch(addPlantings(selection))
    } catch (error) {
        dispatch(plantsFailed({error}))
    }
}


/* Selectors */
export const selectPlants = (state: AppState) => Object.values(state.plants.plants || [])
export const selectIsPlantsLoading = (state: AppState) => state.plants.loading
export const selectJustAdded = (state: AppState) => state.plants.justAdded