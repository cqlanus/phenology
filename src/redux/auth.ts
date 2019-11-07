import { createSlice } from 'redux-starter-kit'
import { Auth } from 'aws-amplify'
import { getApiUser } from './entities'
import { toast } from 'react-toastify'
import { AppThunk } from '.'

/* Initial State */
const initialState: AuthState = {
    loading: false,
    error: undefined,
    user: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLoading: state => ({
            ...state,
            loading: true,
            error: undefined
        }),
        authFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload.error
        }),
        signInComplete: state => ({
            ...state,
            loading: false,
        }),
        signOutComplete: state => ({
            ...state,
            user: undefined,
            loading: false,
        }),
        getUserComplete: (state, action) => ({
            ...state,
            user: action.payload.user,
            loading: false,
            
        })
    }
})

const { authLoading, authFailed, signInComplete, signOutComplete, getUserComplete } = authSlice.actions
export default authSlice.reducer

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

/* Async */
export const signIn = (): AppThunk => async dispatch => {
    try {
        dispatch(authLoading())
        await Auth.federatedSignIn()
        dispatch(signInComplete())
    } catch (error) {
        toast.error('Sign in failed')
        dispatch(authFailed({error}))
    }
}

export const signOut = (): AppThunk => async dispatch => {
    try {
        dispatch(authLoading())
        await Auth.signOut()
        dispatch(signOutComplete())
    } catch (error) {
        toast.error('Sign out failed')
        dispatch(authFailed({error}))
    }
}

export const getUser = (): AppThunk => async (dispatch,  getState) => {
    try {
        dispatch(authLoading())
        let user
        const authUser = getState().auth.user
        if (authUser) {
            user = authUser
        } else {
            const { username, attributes } = await Auth.currentAuthenticatedUser()
            user =  { username, attributes }
            
        }
        await dispatch(getApiUser(user))
        dispatch(getUserComplete({user}))
    } catch (error) {
        toast.error('Get user failed')
        dispatch(authFailed({error}))
    }
}

export const getSignedInUser = (): AppThunk => async dispatch => {
    try {
        const { username, attributes } = await Auth.currentAuthenticatedUser()
        const user = { username, attributes }
        if (user) {
            dispatch(getUserComplete({user}))
            await dispatch(getUser())
        }
    } catch (error) {
        console.log({error})
        dispatch(authFailed({error}))
    }

}

/* Selectors */