import { createSelector } from 'reselect'
import { setEntities } from './entities'
import { AppState } from '.';
import { buildGarden } from './garden';

/* Initial State */
const initialState: UserState = {
    selected: undefined
}

/* Interfaces */
interface UserState {
    selected?: string
}

type UserAction = any

/* Reducer */
export default (state = initialState, action: UserAction): UserState => {

    switch (action.type) {

        case setEntities.type: {
            return {
                ...state,
                selected: action.payload.result
            }
        }
        
        default:
            return state
    }
}

/* Selectors */
export const selectUserEntity = (state: AppState) => state.entities.users
export const selectGardenEntity = (state: AppState) => state.entities.gardens
export const selectPlantingEntity = (state: AppState) => state.entities.plantings
export const selectEntryEntity = (state: AppState) => state.entities.entries
export const selectUserId = (state: AppState) => state.user.selected
export const selectUser = createSelector(
    [selectUserId, selectUserEntity, selectGardenEntity, selectPlantingEntity, selectEntryEntity, state => state.plants.plants],
    (userId, users, allGardens, allPlantings, allEntries, allPlants) => {
        if (userId) { 
            const user = users[userId]
            const gardens = user.gardens.map((gardenId: string) => buildGarden({
                gardenId,
                allEntries,
                allGardens,
                allPlantings,
                allPlants
            }))
    
            return { ...user, gardens }
         }
        
    }
)