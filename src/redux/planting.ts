import { AppState } from "."
import { AddEntryInput, Entry, Planting, Garden } from "../types/user"
import uuid from "uuid"
import { selectGarden } from "./garden"
import { selectUser } from "./user"
import api from "../api"
import { setEntities } from "./entities"

/* Action creators */
const SET_PLANTING: 'SET_PLANTING' = 'SET_PLANTING'

/* Interfaces */
interface PlantingState {
    selected?: string
}

interface SetPlantingAction {
    type: typeof SET_PLANTING
    plantingId: string
}

type PlantingAction = SetPlantingAction

/* Action Creators */
export const setPlanting = (plantingId: string): SetPlantingAction => {
    return {
        type: SET_PLANTING,
        plantingId
    }
}

/* Thunks */
export const addEntryToPlanting = (addEntryInput: AddEntryInput, plantingId: string) => async (dispatch: any, getState: any) => {
    try {
        console.log({addEntryInput})
        const entry = Entry.of({
            ...addEntryInput,
            entryId: uuid()
        })
        const builtGarden = selectGarden(getState())
    
        if (builtGarden) {
            const { plantings } = builtGarden
            const updatedPlantings = plantings.map(p => {
                if (p.plantingId === plantingId) {
                    return Planting.of({ ...p, entries: [ ...p.entries, entry ]})
                } else {
                    return p
                }
            })
            const updatedGarden = Garden.of({ ...builtGarden, plantings: updatedPlantings })
            const builtUser = selectUser(getState())
            if (builtUser) {
                const updatedGardens = builtUser.gardens.map(g => 
                    g && g.gardenId === updatedGarden.gardenId ? updatedGarden : g)
                const updatedUser = { ...builtUser, gardens: updatedGardens}
                const response = await api.updateUser(updatedUser)
                dispatch(setEntities(response))
    
            }
        }
    } catch (error) {
        console.log({error})
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