import { createSlice } from 'redux-starter-kit'
import { getClimateNorms as getNorms } from '../hooks/climate'
import { ClimateNorms } from '../types/climate'
import { AppState, AppThunk } from '.'
import { toast } from 'react-toastify'

/* Initial State */
const initialState: ClimateState = {
    loading: false,
    stationId: '',
    norms: [],
    error: undefined
}

const climateSlice = createSlice({
    name: 'climate',
    initialState,
    reducers: {
        climateLoading: state => ({ 
            ...state, 
            loading: true, 
            error: undefined 
        }),
        climateFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload.error
        }),
        getClimateComplete: (state, action) => ( { 
            ...state, 
            loading: false,
            norms: action.payload.norms
        })
    }
})

export const { climateLoading, climateFailed, getClimateComplete } = climateSlice.actions
export default climateSlice.reducer

/* Interfaces */
export interface ClimateState {
    loading: boolean
    stationId: string
    norms: ClimateNorms
    error?: Error
}

/* Async */
export const getClimateNorms = (stationId: string): AppThunk => async dispatch => {

    try {
        dispatch(climateLoading())
        const norms = await getNorms(stationId)
        dispatch(getClimateComplete({norms}))
    } catch (error) {
        toast.error('Get climate norms failed')
        dispatch(climateFailed({error}))
        
    }
}

/* Selectors */
export const selectNorms = (state: AppState) => state.climate.norms