import plants from '../data/plants.json'
import { AppState } from './index.js';

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
    plants: QtyPlant[]
}

interface AddPlantCompleteAction {
    type: typeof ADD_PLANTS_COMPLETE
    plants: QtyPlant[],
    plant: QtyPlant
}

interface GetPlantFailedAction {
    type: typeof PLANTS_FAILED
    error: Error
}

type GetPlantAction = GetPlantStartAction | GetPlantCompleteAction | GetPlantFailedAction | AddPlantCompleteAction

export interface Plant {
    commonName: string
    latinName: string
    isNative: boolean
    type: string,
}

export type QtyPlant = Plant & { qty: number }

export interface PlantState {
    loading: boolean
    plants: QtyPlant[]
    justAdded?: QtyPlant
    error?: Error
}

/* Async */
export const getPlants = () => async (dispatch: any) => {
    try {
        dispatch({ type: PLANTS_LOADING })
        const qtyPlants = plants.map((p: any) => ({ ...p, qty: 1 }))
        setTimeout(() => dispatch({ type: GET_PLANTS_COMPLETE, plants: qtyPlants }), 500)
    } catch (error) {
        dispatch({ type: PLANTS_FAILED, error })
    }
}

export const addPlant = (plant: QtyPlant) => async (dispatch: any) => {
    try {
        dispatch({ type: PLANTS_LOADING })
        const qtyPlants = [ ...plants, plant ]
        setTimeout(() => dispatch({ 
            type: ADD_PLANTS_COMPLETE, 
            plants: qtyPlants, 
            plant }), 500)
    } catch (error) {
        dispatch({ type: PLANTS_FAILED, error })
    }
}

/* Initial State */
const initialState: PlantState = {
    loading: false,
    plants: [],
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
export const selectPlants = (state: AppState) => state.plants.plants
export const selectIsPlantsLoading = (state: AppState) => state.plants.loading
export const selectJustAdded = (state: AppState) => state.plants.justAdded