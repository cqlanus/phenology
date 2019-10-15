import { AppState } from "."
import { createSelector } from "reselect"
import { selectEntryEntity } from "./entities"
import { Entry, Planting, AddEntryInput } from "../types/user"
import { selectPlanting, changeEntries } from "./planting"
import { getGddForEntry } from "../utils/weather"

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

/* Thunks */
const filterEntry = (planting: Planting, entry: Entry) => planting.entries.filter(e => entry.entryId !== e.entryId)
export const removeEntry = () => async (dispatch: any, getState: any) => {
    try {
        const entry = selectEntry(getState())
        const plantingId = selectPlanting(getState())
        if (entry && plantingId) {
            await dispatch(changeEntries(entry, plantingId, filterEntry))
        }
    } catch (error) {
        console.log({error})
    }
}

const replaceEntry = (planting: Planting, entry: Entry) => planting.entries.map(e => entry.entryId === e.entryId ? entry : e)
export const editEntry = (editEntryInput: AddEntryInput, plantingId: string) => async (dispatch: any, getState: any) => {
    try {
        const { ytdWeather } = getState().weather
        const { gdd, ytdGdd } = getGddForEntry(editEntryInput, ytdWeather)

        const entry = Entry.of({
            ...editEntryInput,
            gdd, 
            ytdGdd,
            entryId: getSelectedEntry(getState()) || ''
        })
        await dispatch(changeEntries(entry, plantingId, replaceEntry))
    } catch (error) {
        console.log({error})
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

