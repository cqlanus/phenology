import { AppState } from '.'
import { AddEntryInput, Entry, Planting, Garden, Plant } from '../types/user'
import uuid from 'uuid'
import { selectGarden, editUserGardens } from './garden'
import { selectUser } from './user'
import api from '../api'
import { setEntities } from './entities'
import { QtyPlant } from '../types/entities'

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
export const setPlanting = (
    plantingId: string | undefined,
): SetPlantingAction => {
    return {
        type: SET_PLANTING,
        plantingId,
    }
}

/* Thunks */
export const addEntryToPlanting = (
    addEntryInput: AddEntryInput,
    plantingId: string,
) => async (dispatch: any) => {
    try {
        const entry = Entry.of({
            ...addEntryInput,
            entryId: uuid(),
        })
        await dispatch(changeEntries(entry, plantingId, appendEntry))
    } catch (error) {
        console.log({ error })
    }
}

const appendEntry = (planting: Planting, entry: Entry) => [
    ...planting.entries,
    entry,
]

type EntryCallback = (planting: Planting, entry: Entry) => Entry[]
export const changeEntries = (
    entry: Entry,
    plantingId: string,
    cb: EntryCallback,
) => async (dispatch: any, getState: any) => {
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
        const updatedGarden = Garden.of({
            ...builtGarden,
            plantings: updatedPlantings,
        })
        if (builtUser) {
            const updatedUser = editUserGardens(builtUser, updatedGarden)
            const response = await api.updateUser(updatedUser)
            dispatch(setEntities(response))
        }
    }
}

interface Structure {
    [key: string]: Planting
}
const structurePlantings = (plantings: Planting[]): Structure => {
    return plantings.reduce((acc: Structure, planting: Planting) => {
        return {
            ...acc,
            [planting.plant.commonName]: planting,
        }
    }, {})
}

export interface PlantSelection {
    [key: string]: QtyPlant
}
export const addPlantings = (selection: PlantSelection) => async (
    dispatch: any,
    getState: any,
) => {

    const addSelection = (plantings: Planting[]) => {
        const structuredPlantings = structurePlantings(plantings)
        return Object.values(selection).reduce(
            (acc: Structure, qtyPlant: QtyPlant) => {
                const { qty, ...plant } = qtyPlant
                const { commonName } = plant
                let existingPlant = acc[commonName]
                let planting
                if (existingPlant) {
                    const newQty = existingPlant.qty + qty
                    planting = Planting.of({ ...existingPlant, qty: newQty })
                } else {
                    planting = Planting.of({
                        plantingId: uuid(),
                        plant: Plant.of(plant),
                        qty,
                        entries: [],
                    })
                }
                return {
                    ...acc,
                    [commonName]: planting,
                }
            },
            structuredPlantings,
        )
    }
    
    await dispatch(changePlanting(addSelection))
}

export const removePlanting = (plantingId: string) => async (dispatch: any, getState: any) => {
    console.log({plantingId})

    const filterPlanting = (plantings : Planting[]) => plantings.filter(p => p.plantingId !== plantingId)
    await dispatch(changePlanting(filterPlanting))
    
    // const builtGarden = selectGarden(getState())
    // const builtUser = selectUser(getState())
    // if (builtGarden) {
    //     const { plantings } = builtGarden
    //     const updatedPlantings = plantings.filter(p => p.plantingId !== plantingId)
    //     const updatedGarden = Garden.of({
    //         ...builtGarden,
    //         plantings: Object.values(updatedPlantings),
    //     })
    //     if (builtUser) {
    //         const updatedUser = editUserGardens(builtUser, updatedGarden)
    //         const response = await api.updateUser(updatedUser)
    //         dispatch(setEntities(response))
    //     }
    // }
}

const changePlanting = (cb: (t: any) => any) => async (dispatch: any, getState: any) => {
    const builtGarden = selectGarden(getState())
    const builtUser = selectUser(getState())
    if (builtGarden) {
        const { plantings } = builtGarden
        console.log({plantings})
        const updatedPlantings = cb(plantings)
        const updatedGarden = Garden.of({
            ...builtGarden,
            plantings: Object.values(updatedPlantings),
        })
        if (builtUser) {
            const updatedUser = editUserGardens(builtUser, updatedGarden)
            const response = await api.updateUser(updatedUser)
            dispatch(setEntities(response))
        }
    }
}


/* Initial State */
const initialState: PlantingState = {
    selected: undefined,
}

/* Reducer */
export default (
    state = initialState,
    action: PlantingAction,
): PlantingState => {
    switch (action.type) {
        case SET_PLANTING: {
            return {
                ...state,
                selected: action.plantingId,
            }
        }

        default:
            return state
    }
}

/* Selectors */
export const selectPlanting = (state: AppState) => state.planting.selected
