import { Auth } from 'aws-amplify'
import { getApiUser } from './entities'
import { toast } from 'react-toastify'

/* Action Types */
const SIGN_IN_START: 'SIGN_IN_START' = 'SIGN_IN_START'
const SIGN_IN_COMPLETE: 'SIGN_IN_COMPLETE' = 'SIGN_IN_COMPLETE'
const SIGN_IN_FAILED: 'SIGN_IN_FAILED' = 'SIGN_IN_FAILED'
const SIGN_OUT_START: 'SIGN_OUT_START' = 'SIGN_OUT_START'
const SIGN_OUT_COMPLETE: 'SIGN_OUT_COMPLETE' = 'SIGN_OUT_COMPLETE'
const SIGN_OUT_FAILED: 'SIGN_OUT_FAILED' = 'SIGN_OUT_FAILED'
const GET_USER_START: 'GET_USER_START' = 'GET_USER_START'
const GET_USER_COMPLETE: 'GET_USER_COMPLETE' = 'GET_USER_COMPLETE'
const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED'

/* Interfaces */
interface AuthAttributes {
    email: string
    email_verified: boolean
    given_name: string
    family_name: string
    sub: string
}
export interface AuthUser {
    username: string
    attributes: AuthAttributes
}

export interface AuthState {
    loading: boolean
    user?: AuthUser
    error?: Error
}

interface AuthStartAction {
    type: typeof SIGN_IN_START | typeof SIGN_OUT_START | typeof GET_USER_START
}

interface AuthFailedAction {
    type: typeof SIGN_IN_FAILED | typeof SIGN_OUT_FAILED | typeof GET_USER_FAILED
    error: Error
}

interface AuthCompleteAction {
    type: typeof SIGN_IN_COMPLETE | typeof SIGN_OUT_COMPLETE
}

interface GetUserCompleteAction {
    type: typeof GET_USER_COMPLETE
    user: AuthUser
}

type AuthAction = AuthStartAction | AuthFailedAction | AuthCompleteAction | GetUserCompleteAction

/* Async */
export const signIn = () => async (dispatch: any) => {
    try {
        dispatch({ type: SIGN_IN_START })
        await Auth.federatedSignIn()
        dispatch({ type: SIGN_IN_COMPLETE })
    } catch (error) {
        toast.error('Sign in failed')
        dispatch({ type: SIGN_IN_FAILED, error })
    }
}

export const signOut = () => async (dispatch: any) => {
    try {
        dispatch({ type: SIGN_OUT_START })
        await Auth.signOut()
        dispatch({ type: SIGN_OUT_COMPLETE })
    } catch (error) {
        toast.error('Sign out failed')
        dispatch({ type: SIGN_OUT_FAILED, error })
    }
}

export const getUser = () => async (dispatch: any) => {
    try {
        dispatch({ type: GET_USER_START })
        const user = await Auth.currentAuthenticatedUser()
        await dispatch(getApiUser(user))
        dispatch({ type: GET_USER_COMPLETE, user })
    } catch (error) {
        toast.error('Get user failed')
        dispatch({ type: GET_USER_FAILED, error })
    }
}

export const getSignedInUser = () => async (dispatch: any) => {
    try {
        const user = await Auth.currentAuthenticatedUser()
        if (user) {
            dispatch(getUser())
        }
    } catch (error) {
        toast.error('Get signed in user failed')
        console.log({error})
    }

}

/* Initial State */
const initialState: AuthState = {
    loading: false,
    error: undefined,
    user: undefined
}

/* Reducer */
export default (state = initialState, action: AuthAction): AuthState => {

    switch (action.type) {

        case SIGN_IN_START:
        case SIGN_OUT_START: 
        case GET_USER_START: {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        }
        
        case SIGN_IN_FAILED: 
        case SIGN_OUT_FAILED: 
        case GET_USER_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        
        case SIGN_IN_COMPLETE: {
            return {
                ...state,
                loading: false,
            }
        }

        case SIGN_OUT_COMPLETE: {
            return {
                ...state,
                user: undefined,
                loading: false,
            }
        }

        case GET_USER_COMPLETE: {
            return {
                ...state,
                user: action.user,
                loading: false,
            }
        }

        default:
            return state
    }
    
}

/* Selectors */