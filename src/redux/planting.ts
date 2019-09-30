import { AppState } from "."
import { AddEntryInput, Entry, EntryArgs, Planting, Garden } from "../types/user"
import uuid from "uuid"
import { selectGarden } from "./garden"
import { selectUser } from "./user"
import api from "../api"
import { setEntities } from "./entities"
import { getSelectedEntry } from "./entry"

/* Action creators */
const SET_PLANTING: 'SET_PLANTING' = 'SET_PLANTING'

/* Interfaces */
interface PlantingState {
    selected?: string
}

interface SetPlantingAction {
    type: typeof SET_PLANTING
    plantingId: string | undefined
}

type PlantingAction = SetPlantingAction

/* Action Creators */
export const setPlanting = (plantingId: string | undefined): SetPlantingAction => {
    return {
        type: SET_PLANTING,
        plantingId
    }
}

/* Thunks */
export const addEntryToPlanting = (addEntryInput: AddEntryInput, plantingId: string) => async (dispatch: any) => {
    try {
        const entry = Entry.of({
            ...addEntryInput,
            entryId: uuid()
        })
        await dispatch(changeEntries(entry, plantingId, appendEntry))
    } catch (error) {
        console.log({error})
    }
}

export const editEntry = (editEntryInput: AddEntryInput, plantingId: string) => async (dispatch: any, getState: any) => {
    try {
        const entry = Entry.of({
            ...editEntryInput,
            entryId: getSelectedEntry(getState()) || ''
        })
        await dispatch(changeEntries(entry, plantingId, replaceEntry))
    } catch (error) {
        console.log({error})
    }
}

const appendEntry = (planting: Planting, entry: Entry) => ([ ...planting.entries, entry ])
const replaceEntry = (planting: Planting, entry: Entry) => planting.entries.map(e => entry.entryId === e.entryId ? entry : e)
const editUserGardens = (user: any, garden: Garden) => {
    const updatedGardens = user.gardens.map((g: Garden) => 
        g && g.gardenId === garden.gardenId ? garden : g)
    return { ...user, gardens: updatedGardens}
}

type EntryCallback = (planting: Planting, entry: Entry) => Entry[]
const changeEntries = (entry: Entry, plantingId: string, cb: EntryCallback) => async (dispatch: any, getState: any) => {
    const builtGarden = selectGarden(getState())
    const builtUser = selectUser(getState())

    if (builtGarden) {
        const { plantings } = builtGarden
        const updatedPlantings = plantings.map(p => {
            if (p.plantingId === plantingId) {
                const entries = cb(p, entry)
                return Planting.of({ ...p, entries })
            } else {
                return p
            }
        })
        const updatedGarden = Garden.of({ ...builtGarden, plantings: updatedPlantings })
        if (builtUser) {
            const updatedUser = editUserGardens(builtUser, updatedGarden)
            const response = await api.updateUser(updatedUser)
            dispatch(setEntities(response))

        }
    }
}

/* Initial State */
const initialState: PlantingState = {
    selected: undefined
}

/* Reducer */
export default (state = initialState, action: PlantingAction): PlantingState => {
    switch (action.type) {

        case SET_PLANTING: {
            return {
                ...state,
                selected: action.plantingId
            }
        }

        default:
            return state
    }
}

/* Selectors */
export const selectPlanting = (state: AppState) => state.planting.selected