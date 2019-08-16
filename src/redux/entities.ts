import { API, graphqlOperation } from 'aws-amplify';

import { User, Garden, Planting, Entry } from '../types/entities'

import api from '../api/index'
import { AppState } from '.'
import { createUser } from '../graphql/mutations'

import {entities} from '../data/entities.js'
import { getUserByUserName } from '../graphql/queries';

/* Action Constants */
const ENTITY_START: 'ENTITY_START' = 'ENTITY_START'
const ENTITY_FAILED: 'ENTITY_FAILED' = 'ENTITY_FAILED'
const ADD_ENTITY: 'ADD_ENTITY' = 'ADD_ENTITY'
const FLUSH_ENTITY: 'FLUSH_ENTITY' = 'FLUSH_ENTITY' 

/* Interfaces */
interface UserEntity { [userId: string]: User }
interface GardenEntity { [gardenId: string]: Garden }
interface PlantingEntity { [plantingId: string]: Planting }
interface EntryEntity { [entryId: string]: Entry }

export interface Entities {
    users: UserEntity
    gardens: GardenEntity
    plantings: PlantingEntity
    entries: EntryEntity
}

interface EntitiesState extends Entities {
    loading: boolean
    error?: Error
}

interface EntityStartAction {
    type: typeof ENTITY_START
}

interface AddEntityAction {
    type: typeof ADD_ENTITY
    entities: Entities
}

interface FlushEntityAction {
    type: typeof FLUSH_ENTITY
}

interface EntityFailedAction {
    type: typeof ENTITY_FAILED
    error: Error
}

type EntityAction = EntityStartAction | AddEntityAction | FlushEntityAction | EntityFailedAction

/* Async */
export const getEntities = () => async (dispatch: any) => {
    try {
        dispatch({ type: ENTITY_START })

        const { entities } = await api.getEntities()
        dispatch({ type: ADD_ENTITY, entities })
        

    } catch (error) {
        dispatch({ type: ENTITY_FAILED, error })
    }
}

export const addUser = async () => {
    try {
        const [ input ] = entities
        const response = await API.graphql(graphqlOperation(createUser, {input}))
        console.log({response})
        
    } catch (error) {
        console.log({error})
    }
}

export const getUser = async (userName = "cqlanus") => {
    try {
        const input = userName 
        console.log({input}, {getUserByUserName})
        const response = await API.graphql(graphqlOperation(getUserByUserName, { userName }))

        console.log({response })

    } catch (error) {
        console.log({error})
    }
}

/* Initial State */
const initialState: EntitiesState = {
    users: {},
    gardens: {},
    plantings: {},
    entries: {},
    loading: false,
    error: undefined
}

/* Reducer */
export default (state = initialState, action: EntityAction): EntitiesState => {

    
    switch (action.type) {
        case ENTITY_START: {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        }
        
        case ADD_ENTITY: {
            const { entities } = action
            return {
                ...state,
                loading: false,
                users: { ...state.users, ...entities.users },
                gardens: { ...state.gardens, ...entities.gardens },
                plantings: { ...state.plantings, ...entities.plantings },
                entries: { ...state.entries, ...entities.entries },
            }
        }
        
        case FLUSH_ENTITY: {
            return initialState
        }

        case ENTITY_FAILED: {
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
export const selectUser = (state: AppState, userName: string) => state.entities.users[userName]