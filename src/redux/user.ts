import { createSelector } from 'reselect'
import { ADD_ENTITY, AddEntityAction, selectUserEntity } from './entities'
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
    [selectUserId, selectUserEntity],
    (userId, users) => userId ? users[userId] : undefined
)