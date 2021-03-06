import { AppState } from "."
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
    console.log({truthyEntryInput})
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
) => async (dispatch: any, getState: () => AppState) => {
    try {
        const { ytdWeather } = getState().weather
        const entry = getEntryFromInput(addEntryInput, ytdWeather)

        console.log({entry}, {plantingId})

        await dispatch(changeEntries(entry, plantingId, appendEntry))
    } catch (error) {
        console.log({ error })
    }
}

const appendEntry = (planting: Planting, entry: Entry) => [
    ...planting.entries,
    entry,
]

type PlantingCallback = (garden: Garden, plantingId: string) => Planting[]
const changeGardenPlantings = (plantingId: string, cb: PlantingCallback) => async (dispatch: any, getState: any) => {
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
            console.log({updatedUser})
            const response = await api.updateUser(updatedUser)
            dispatch(setEntities(response))
        }
    }
}

type EntryCallback = (planting: Planting, entry: Entry) => Entry[]
export const changeEntries = (
    entry: Entry,
    plantingId: string,
    cb: EntryCallback,
) => async (dispatch: any, getState: any) => {
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
}


interface Observation {
    [phenophase: string]: AddEntryInput
}
export interface BulkEntries {
    [plantingId: string]: Observation
}

export const bulkAddEntry = (bulkEntries: BulkEntries) => async (dispatch: any, getState: any) => {
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
                console.log({updatedUser})
                const response = await api.updateUser(updatedUser)
                dispatch(setEntities(response))
            }
        }
    } catch (error) {
        console.log({error})
    }
}

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
const sortByCreated = (e1: Entry, e2: Entry) => moment(e1.created).isAfter(moment(e2.created)) ? 1 : -1
const getEntriesFromProps = (state: AppState, ownProps: any) => ownProps.entries
export const selectOrderedEntries = createSelector([getEntriesFromProps], 
    (entries) => entries.sort(sortByCreated))

