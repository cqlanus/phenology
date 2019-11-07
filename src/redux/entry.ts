import { createSlice } from 'redux-starter-kit'
import { AppState, AppThunk } from "."
import { createSelector } from "reselect"
import { selectEntryEntity, setEntities } from "./entities"
import { Entry, Planting, AddEntryInput, Garden } from "../types/user"
import { selectPlanting } from "./planting"
import { getGddForEntry } from "../utils/weather"
import uuid from "uuid"
import { selectGarden, editUserGardens } from "./garden"
import { selectUser } from "./user"
import api from "../api"
import { YtdWeather } from "../types/weather"
import moment from "moment"
import { toast } from "react-toastify"


/* Initial State */
const initialState: EntryState = {
    selected: undefined
}

const entrySlice = createSlice({
    name: 'entry',
    initialState,
    reducers: {
        setEntry: (state, action) => ({
            ...state,
            selected: action.payload.entryId
        })
    }
})

export const { setEntry } = entrySlice.actions
export default entrySlice.reducer

/* Interfaces */
interface EntryState {
    selected?: string
}

/* Action Creators */
const removeFalsyValuesFromObject = (object: any): any => {
    return Object.entries(object).reduce((acc, entry) => {
        const [key, value] = entry
        return value
            ? {
                ...acc,
                [key]: value
            }
            : acc
    }, {})
}

const getEntryFromInput = (addEntryInput: AddEntryInput, ytdWeather: YtdWeather) => {
    const { gdd, ytdGdd } = getGddForEntry(addEntryInput, ytdWeather)
    const truthyEntryInput: AddEntryInput = removeFalsyValuesFromObject(addEntryInput)
    return Entry.of({
        ...truthyEntryInput,
        gdd, 
        ytdGdd,
        entryId: uuid(),
    })
}

/* Thunks */
export const addEntryToPlanting = (
    addEntryInput: AddEntryInput,
    plantingId: string,
): AppThunk => async (dispatch, getState) => {
    try {
        const { ytdWeather } = getState().weather
        const entry = getEntryFromInput(addEntryInput, ytdWeather)

        await dispatch(changeEntries(entry, plantingId, appendEntry))
    } catch (error) {
        toast.error('Add entry failed')
        console.log({ error })
    }
}

const appendEntry = (planting: Planting, entry: Entry) => [
    ...planting.entries,
    entry,
]

type PlantingCallback = (garden: Garden, plantingId: string) => Planting[]
const changeGardenPlantings = (plantingId: string, cb: PlantingCallback): AppThunk => async (dispatch, getState) => {
    const builtGarden = selectGarden(getState())
    const builtUser = selectUser(getState())
    if (builtGarden) {
        const plantings = cb(builtGarden, plantingId)
        const updatedGarden = Garden.of({
            ...builtGarden,
            plantings,
        })
        if (builtUser) {
            const updatedUser = editUserGardens(builtUser, updatedGarden)
            const entities = await api.updateUser(updatedUser)
            dispatch(setEntities(entities))
        }
    }
}

type EntryCallback = (planting: Planting, entry: Entry) => Entry[]
export const changeEntries = (
    entry: Entry,
    plantingId: string,
    cb: EntryCallback,
): AppThunk => async dispatch => {
    try {
        const amendPlantingEntries = (garden: Garden, plantingId: string) => {
            const { plantings } = garden
            const updatedPlantings = plantings.map(p => {
                if (p.plantingId === plantingId) {
                    const entries = cb(p, entry)
                    return Planting.of({ ...p, entries })
                } else {
                    return p
                }
            })
            return updatedPlantings
        }
        
        dispatch(changeGardenPlantings(plantingId, amendPlantingEntries))
    } catch (error) {
        toast.error('Change entries failed')   
    }
}


interface Observation {
    [phenophase: string]: AddEntryInput
}
export interface BulkEntries {
    [plantingId: string]: Observation
}

export const bulkAddEntry = (bulkEntries: BulkEntries): AppThunk => async (dispatch, getState) => {
    try {
        const builtGarden = selectGarden(getState())
        const builtUser = selectUser(getState())
        const { ytdWeather } = getState().weather
    
        if (builtGarden) {
            const { plantings } = builtGarden
            const updatedPlantings = plantings.map(p => {
                const { plantingId } = p
                const observationObject = bulkEntries[plantingId]
    
                if (observationObject) {
                    const entries = Object.values(observationObject).map(addEntryInput => getEntryFromInput(addEntryInput, ytdWeather))
                    return Planting.of({ ...p, entries: [ ...p.entries, ...entries ] })
                } else {
                    return p
                }
            })
            const updatedGarden = Garden.of({
                ...builtGarden,
                plantings: updatedPlantings,
            })
            if (builtUser) {
                const updatedUser = editUserGardens(builtUser, updatedGarden)
                const entities = await api.updateUser(updatedUser)
                dispatch(setEntities(entities))
            }
        }
    } catch (error) {
        toast.error('Bulk add entries failed')
        console.log({error})
    }
}

const filterEntry = (planting: Planting, entry: Entry) => planting.entries.filter(e => entry.entryId !== e.entryId)
export const removeEntry = (): AppThunk => async (dispatch, getState) => {
    try {
        const entry = selectEntry(getState())
        const plantingId = selectPlanting(getState())
        if (entry && plantingId) {
            await dispatch(changeEntries(entry, plantingId, filterEntry))
        }
    } catch (error) {
        toast.error('Remove entry failed')
        console.log({error})
    }
}

const replaceEntry = (planting: Planting, entry: Entry) => planting.entries.map(e => entry.entryId === e.entryId ? entry : e)
export const editEntry = (editEntryInput: AddEntryInput, plantingId: string): AppThunk => async (dispatch, getState) => {
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
        toast.error('Replace entry failed')
        console.log({error})
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
const sortByCreated = (e1: Entry, e2: Entry) => moment(e1.created).isAfter(moment(e2.created)) ? 1 : -1
const getEntriesFromProps = (state: AppState, ownProps: any) => ownProps.entries
export const selectOrderedEntries = createSelector([getEntriesFromProps], 
    (entries) => entries.sort(sortByCreated))

