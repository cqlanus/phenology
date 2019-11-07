import { createSlice } from 'redux-starter-kit'
import { AppState, AppThunk } from '.'
import { Planting, Garden, Plant, NetworkPlant } from '../types/user'
import uuid from 'uuid'
import { selectGarden, editUserGardens } from './garden'
import { selectUser } from './user'
import api from '../api'
import { setEntities } from './entities'
import { toast } from 'react-toastify'

/* Initial State */
const initialState: PlantingState = {
    selected: undefined,
}

const plantingSlice = createSlice({
    name: 'planting',
    initialState,
    reducers: {
        setPlanting: (state, action) => ({
            ...state,
            selected: action.payload.plantingId,
        })
    }
})

export const { setPlanting } = plantingSlice.actions
export default plantingSlice.reducer

/* Interfaces */
interface PlantingState {
    selected?: string
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
export const addPlantings = (selection: PlantSelection): AppThunk => async dispatch => {
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

export const removePlanting = (plantingId: string): AppThunk => async dispatch => {
    try {
        const filterPlanting = (plantings : Planting[]) => plantings.filter(p => p.plantingId !== plantingId)
        await dispatch(changePlanting(filterPlanting))
    } catch (error) {
        toast.error('Remove planting failed')
    }
}

const changePlanting = (cb: (t: any) => any): AppThunk => async (dispatch, getState) => {
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
            const entities = await api.updateUser(updatedUser)
            dispatch(setEntities(entities))
        }
    }
}

/* Selectors */
export const selectPlanting = (state: AppState) => state.planting.selected
