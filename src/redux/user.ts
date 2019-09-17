import { createSelector } from 'reselect'
import { ADD_ENTITY, AddEntityAction, selectUserEntity } from './entities'
import { AppState } from '.';
import { ApiUser } from '../types/user';
import { selectGarden } from './garden';

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
export const selectUserId = (state: AppState): string | undefined => state.user.selected
export const selectUser = createSelector<AppState, string | undefined, any, AppState, ApiUser>(
    [selectUserId, selectUserEntity, state => state],
    (userId: string | undefined, users: any, appState: AppState) => {
        const user = userId ? users[userId] : undefined
        const gardens = user ? user.gardens.map((id: string) => selectGarden(appState, { gardenId: id })) : []

        return { ...user, gardens }
        
    }
)