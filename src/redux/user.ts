import { createSelector } from 'reselect'
import { ADD_ENTITY, AddEntityAction, selectUserEntity, selectGardenEntity, selectPlantingEntity, selectEntryEntity } from './entities'
import { AppState } from '.';
import { buildGarden } from './garden';

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
    [selectUserId, selectUserEntity, selectGardenEntity, selectPlantingEntity, selectEntryEntity, state => state.plants],
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