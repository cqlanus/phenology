import { AppState } from '.'
import { Planting, Garden, Plant, NetworkPlant } from '../types/user'
import uuid from 'uuid'
import { selectGarden, editUserGardens } from './garden'
import { selectUser } from './user'
import api from '../api'
import { setEntities } from './entities'
import { toast } from 'react-toastify'

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
    [key: string]: NetworkPlant & { qty: number }
}
export const addPlantings = (selection: PlantSelection) => async (
    dispatch: any,
) => {
    try {
        const addSelection = (plantings: Planting[]) => {
            const structuredPlantings = structurePlantings(plantings)
            return Object.values(selection).reduce(
                (acc: Structure, qtyPlant: NetworkPlant & { qty: number }) => {
                    const { qty, ...plant } = qtyPlant
                    const { commonName } = plant
                    let existingPlant = acc[commonName]
                    const quant = qty || 0
                    let planting
                    if (existingPlant) {
                        const newQty = existingPlant.qty + quant
                        planting = Planting.of({ ...existingPlant, qty: newQty })
                    } else {
                        planting = Planting.of({
                            plantingId: uuid(),
                            plant: Plant.of(plant),
                            qty: quant,
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
        
    } catch (error) {
        toast.error('Add plantings failed')
        console.log({error})
    }
}

export const removePlanting = (plantingId: string) => async (dispatch: any, getState: any) => {
    try {
        const filterPlanting = (plantings : Planting[]) => plantings.filter(p => p.plantingId !== plantingId)
        await dispatch(changePlanting(filterPlanting))
    } catch (error) {
        toast.error('Remove planting failed')
    }
}

const changePlanting = (cb: (t: any) => any) => async (dispatch: any, getState: any) => {
    const builtGarden = selectGarden(getState())
    const builtUser = selectUser(getState())
    if (builtGarden) {
        const { plantings } = builtGarden
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
