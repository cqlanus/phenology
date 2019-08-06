import plants from '../data/plants.json'
import { AppState } from './index.js';

/* Action Types */
const GET_PLANTS_START: 'GET_PLANTS_START' = 'GET_PLANTS_START'
const GET_PLANTS_COMPLETE: 'GET_PLANTS_COMPLETE' = 'GET_PLANTS_COMPLETE'
const GET_PLANTS_FAILED: 'GET_PLANTS_FAILED' = 'GET_PLANTS_FAILED'

/* Interfaces */
interface GetPlantStartAction {
    type: typeof GET_PLANTS_START
}

interface GetPlantCompleteAction {
    type: typeof GET_PLANTS_COMPLETE
    plants: QtyPlant[]
}

interface GetPlantFailedAction {
    type: typeof GET_PLANTS_FAILED
    error: Error
}

type GetPlantAction = GetPlantStartAction | GetPlantCompleteAction | GetPlantFailedAction

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
    error?: Error
}

/* Async */
export const getPlants = () => async (dispatch: any) => {
    try {
        dispatch({ type: GET_PLANTS_START })
        const qtyPlants = plants.map((p: any) => ({ ...p, qty: 1 }))
        setTimeout(() => dispatch({ type: GET_PLANTS_COMPLETE, plants: qtyPlants }), 500)
    } catch (error) {
        dispatch({ type: GET_PLANTS_FAILED, error })
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

        case GET_PLANTS_START: {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        }

        case GET_PLANTS_COMPLETE: {
            return {
                ...state,
                loading: false,
                plants: action.plants
            }
        }

        case GET_PLANTS_FAILED: {
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