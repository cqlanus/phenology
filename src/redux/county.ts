import { createSlice } from 'redux-starter-kit'
import { County } from '../types/location'
import { getCountyCode, getCountyCodeFromZip } from '../hooks/location'
import { AppState, AppThunk } from '.'
import { toast } from 'react-toastify'

/* Initial State */
const initialState: CountyState = {
    loading: false,
    county: undefined,
    error: undefined,
}

const countySlice = createSlice({
    name: 'county',
    initialState,
    reducers: {
        countyLoading: (state) => ({
            ...state,
            loading: true,
            error: undefined
        }),
        getCountyComplete: (state, action) => ({
            ...state,
            loading: false,
            county: action.payload.county,
        }),
        countyFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload.error
        })
    }
})

export const { countyLoading, countyFailed, getCountyComplete } = countySlice.actions
export default countySlice.reducer

export interface CountyState {
    loading: boolean
    county: County | undefined
    error?: Error
}

/* Async */
export const getCounty = (): AppThunk => async dispatch => {
    try {
        dispatch(countyLoading())
        const county = await getCountyCode()
        dispatch(getCountyComplete({county}))
    } catch (error) {
        toast.error('Get county failed')
        dispatch(countyFailed({error}))
    }
}

export const getCountyByZip = (zip: string): AppThunk => async dispatch => {
    try {
        dispatch(countyLoading())
        const county = await getCountyCodeFromZip(zip)
        dispatch(getCountyComplete({county}))
    } catch (error) {
        toast.error('Get county by zip failed')
        dispatch(countyFailed({error}))
    }
}

/* Selectors */
export const selectCounty = (state: AppState) => state.county.county