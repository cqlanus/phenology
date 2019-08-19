import { createSelector } from 'reselect'
import { ADD_ENTITY, AddEntityAction, selectUserEntity, selectGardenEntity, selectPlantingEntity, selectEntryEntity } from './entities'
import { AppState } from '.';

/* Interfaces */
interface UserState {
    selected?: string
}

type UserAction = AddEntityAction

/* Initial State */
const initialState: UserState = {
    selected: undefined
}

/* Reducer */
export default (state = initialState, action: UserAction): UserState => {

    switch (action.type) {

        case ADD_ENTITY: {
            return {
                ...state,
                selected: action.result
            }
        }
        
        default:
            return state
    }
}

/* Selectors */
export const selectUserId = (state: AppState) => state.user.selected
export const selectUser = createSelector(
    [selectUserId, selectUserEntity, selectGardenEntity, selectPlantingEntity, selectEntryEntity],
    (userId, users, allGardens, allPlantings, allEntries) => {
        const user = userId ? users[userId] : undefined
        const gardens = user ? user.gardens.map((id: string) => {
            const garden = allGardens[id]
            const { plantings: plantingIds } = garden
            const plantings = plantingIds.map((pId: string) => {
                const planting = allPlantings[pId]
                const entries = planting.entries.map((eId: string) => allEntries[eId])

                return { ...planting, entries }
            })

            return { ...garden, plantings }
            
        }) : []

        return { ...user, gardens }
        
    }
)