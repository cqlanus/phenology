import { County } from '../types/location'
import { getCountyCode } from '../hooks/location'
import { AppState } from '.'

/* Action Types */
const GET_COUNTY_START: 'GET_COUNTY_START' = 'GET_COUNTY_START'
const GET_COUNTY_COMPLETE: 'GET_COUNTY_COMPLETE' = 'GET_COUNTY_COMPLETE'
const GET_COUNTY_FAILED: 'GET_COUNTY_FAILED' = 'GET_COUNTY_FAILED'

/* Action Creatoros */

/* Interfaces */
interface GetCountyStartAction {
    type: typeof GET_COUNTY_START,
}
interface GetCountyCompleteAction {
    type: typeof GET_COUNTY_COMPLETE,
    response: County
}
interface GetCountyFailedAction {
    type: typeof GET_COUNTY_FAILED,
    error: Error
}

export type CountyActions = GetCountyStartAction 
    | GetCountyCompleteAction
    | GetCountyFailedAction

export interface CountyState {
    loading: boolean
    county: County | undefined
    error?: Error
}

/* Async */
export const getCounty = () => async (dispatch: any) => {
    try {
        dispatch ({ type: GET_COUNTY_START })
        const county = await getCountyCode()
        dispatch ({ type: GET_COUNTY_COMPLETE, response: county })
    } catch (error) {
        dispatch({ type: GET_COUNTY_FAILED, error })        
    }
    
    // return {
    //     types: [ GET_COUNTY_START, GET_COUNTY_COMPLETE, GET_COUNTY_FAILED ],
    //     callAPI: () => getCountyCode(),
    //     payload: {}
    // }
}


/* Initial State */
const initialState: CountyState = {
    loading: false,
    county: undefined,
    error: undefined,
}

/* Reducer */
export default (state = initialState, action: CountyActions): CountyState => {

    switch (action.type) {

        case GET_COUNTY_START: {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        }

        case GET_COUNTY_COMPLETE: {
            return {
                ...state,
                loading: false,
                county: action.response,
            }
        }

        case GET_COUNTY_FAILED: {
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
export const selectCounty = (state: AppState) => state.county.county