import { AppState } from './index.js';
import api from '../api';

import { PlantEntity, PlantArgs, NetworkPlant } from '../types/user.js';
import { addPlantings } from './planting';

/* Action Types */
const PLANTS_LOADING: 'PLANTS_LOADING' = 'PLANTS_LOADING'
const GET_PLANTS_COMPLETE: 'GET_PLANTS_COMPLETE' = 'GET_PLANTS_COMPLETE'
const ADD_PLANTS_COMPLETE: 'ADD_PLANTS_COMPLETE' = 'ADD_PLANTS_COMPLETE'
const PLANTS_FAILED: 'PLANTS_FAILED' = 'PLANTS_FAILED'

/* Interfaces */
interface GetPlantStartAction {
    type: typeof PLANTS_LOADING
}

interface GetPlantCompleteAction {
    type: typeof GET_PLANTS_COMPLETE
    plants: PlantEntity
}

interface AddPlantCompleteAction {
    type: typeof ADD_PLANTS_COMPLETE
    plants: PlantEntity,
    plant: NetworkPlant
}

interface GetPlantFailedAction {
    type: typeof PLANTS_FAILED
    error: Error
}

type GetPlantAction = GetPlantStartAction | GetPlantCompleteAction | GetPlantFailedAction | AddPlantCompleteAction

export interface PlantState {
    loading: boolean
    plants: PlantEntity
    justAdded?: NetworkPlant
    error?: Error
}

/* Async */
export const getPlants = () => async (dispatch: any) => {
    try {
        dispatch({ type: PLANTS_LOADING })
        const plants = await api.getPlants()
        dispatch({ type: GET_PLANTS_COMPLETE, plants })
    } catch (error) {
        dispatch({ type: PLANTS_FAILED, error })
    }
}

export const addPlant = ({ qty, ...plant}: PlantArgs, shouldAddPlanting: boolean = false) => async (dispatch: any) => {
    try {
        dispatch({ type: PLANTS_LOADING })
        const plantModel = await api.addPlant(plant)
        const plants = await api.getPlants()
        console.log({plantModel}, {plants})
        dispatch({ 
            type: ADD_PLANTS_COMPLETE, 
            plants, 
            plant: plantModel })

        const selection = {
            [plantModel.id]: { ...plantModel, qty: 1 }
        }
        shouldAddPlanting && addPlantings(selection)
    } catch (error) {
        console.log({error})
        dispatch({ type: PLANTS_FAILED, error })
    }
}

/* Initial State */
const initialState: PlantState = {
    loading: false,
    plants: {},
    error: undefined
}

/* Reducer */
export default (state = initialState, action: GetPlantAction): PlantState => {

    switch (action.type) {

        case PLANTS_LOADING: {
            return {
                ...state,
                loading: true,
                error: undefined,
                justAdded: undefined
            }
        }

        case GET_PLANTS_COMPLETE: {
            return {
                ...state,
                loading: false,
                plants: action.plants
            }
        }

        case ADD_PLANTS_COMPLETE: {
            return {
                ...state,
                loading: false,
                plants: action.plants,
                justAdded: action.plant
            }
        }

        case PLANTS_FAILED: {
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
export const selectPlants = (state: AppState) => Object.values(state.plants.plants || [])
export const selectIsPlantsLoading = (state: AppState) => state.plants.loading
export const selectJustAdded = (state: AppState) => state.plants.justAdded