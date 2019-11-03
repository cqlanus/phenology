import { getClimateNorms as getNorms } from '../hooks/climate'
import { ClimateNorms } from '../types/climate'
import { AppState } from '.';
import { SELECT_STATION, SelectStationAction } from './station';
import { toast } from 'react-toastify';

/* Action Types */
const GET_CLIMATE_NORMS_START: 'GET_CLIMATE_NORMS_START' = 'GET_CLIMATE_NORMS_START'
export const GET_CLIMATE_NORMS_COMPLETE: 'GET_CLIMATE_NORMS_COMPLETE' = 'GET_CLIMATE_NORMS_COMPLETE'
const GET_CLIMATE_NORMS_FAILED: 'GET_CLIMATE_NORMS_FAILED' = 'GET_CLIMATE_NORMS_FAILED'

/* Interfaces */
export interface ClimateState {
    loading: boolean
    stationId: string
    norms: ClimateNorms
    error?: Error
}

interface NormsStartAction {
    type: typeof GET_CLIMATE_NORMS_START,
}

interface NormsCompleteAction {
    type: typeof GET_CLIMATE_NORMS_COMPLETE
    response: ClimateNorms
}

interface NormsFailedAction {
    type: typeof GET_CLIMATE_NORMS_FAILED
    error: Error
}

export type NormsAction = NormsStartAction | NormsCompleteAction | NormsFailedAction | SelectStationAction

/* Async */
export const getClimateNorms = (stationId: string) => async (dispatch: any) => {

    try {
        dispatch({ type: GET_CLIMATE_NORMS_START })
        const norms = await getNorms(stationId)
        dispatch({ type: GET_CLIMATE_NORMS_COMPLETE, response: norms })
    } catch (error) {
        toast.error('Get climate norms failed')
        dispatch ({ type: GET_CLIMATE_NORMS_FAILED, error })
        
    }
}

/* Initial State */
const initialState: ClimateState = {
    loading: false,
    stationId: '',
    norms: [],
    error: undefined
}

/* Reducers */
export default (state = initialState, action: NormsAction): ClimateState => {
    
    switch (action.type) {
        case GET_CLIMATE_NORMS_START: {
            return { 
                ...state, 
                loading: true, 
                error: undefined 
            }
        }

        case GET_CLIMATE_NORMS_COMPLETE: {
            return { 
                ...state, 
                loading: false,
                norms: action.response
            }
        }
        
        case GET_CLIMATE_NORMS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }

        case SELECT_STATION: {
            return initialState
        }

        default: 
            return state
    }

}

/* Selectors */
export const selectNorms = (state: AppState) => state.climate.norms