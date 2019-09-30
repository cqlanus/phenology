import { AppState } from "."
import { createSelector } from "reselect"
import { selectEntryEntity } from "./entities"
import { Entry } from "../types/user"

/* Action constants */
const SET_ENTRY: 'SET_ENTRY' = 'SET_ENTRY'

/* Interfaces */
interface EntryState {
    selected?: string
}

interface SetEntryAction {
    type: typeof SET_ENTRY
    entryId?: string
}

type EntryAction = SetEntryAction

/* Action Creators */
export const setEntry = (entryId: string | undefined) => {
    return {
        type: SET_ENTRY,
        entryId
    }
}

/* Initial State */
const initialState: EntryState = {
    selected: undefined
}

/* Reducer */
export default (state = initialState, action: EntryAction): EntryState => {

    switch (action.type) {

        case SET_ENTRY: {
            return {
                ...state,
                selected: action.entryId
            }
        }

        default:
            return state
    }
}

/* Selectors */
export const getSelectedEntry = (state: AppState) => state.entry.selected
export const selectEntry = createSelector(
    [getSelectedEntry, selectEntryEntity],
    (entryId, allEntities) => {
        return entryId ? Entry.of(allEntities[entryId]) : undefined
    }
)

