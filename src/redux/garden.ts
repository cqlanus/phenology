import { createSlice } from 'redux-starter-kit'
import { createSelector } from "reselect"
import uuid from 'uuid'
import { selectGardenEntity, GardenEntity, PlantingEntity, selectPlantingEntity, EntryEntity, selectEntryEntity, setEntities } from "./entities"
import { AppState, AppThunk } from "."
import { Garden, Planting, Entry, Plant, NetworkPlant } from "../types/user"
import { selectUser } from "./user"
import api from "../api"
import { toast } from "react-toastify"

/* Initial State */
const initialState: GardenState = {
    selected: undefined
}

const gardenSlice = createSlice({
    name: 'garden',
    initialState,
    reducers: {
        setGarden: (state, action) => ({ 
            ...state,
            selected: action.payload
        })
    }
})

export const { setGarden } = gardenSlice.actions
export default gardenSlice.reducer

/* Interfaces */
interface GardenState { 
    selected?: string 
}

interface BuildGardenArgs {
    gardenId: string | undefined,
    allGardens: GardenEntity,
    allPlantings: PlantingEntity,
    allEntries: EntryEntity,
    allPlants: any
}

interface Plants { [key: string]: NetworkPlant & { qty: number } }
export interface AddGardenInput {
    name: string
    plants: Plants
}

/* Thunks */
export const editUserGardens = (user: any, garden: Garden) => {
    const updatedGardens = user.gardens.map((g: Garden) => 
        g && g.gardenId === garden.gardenId ? garden : g)
    return { ...user, gardens: updatedGardens}
}

const addUserGarden = (user: any, garden: Garden) => {
    const updatedGardens = [ ...user.gardens, garden ]
    return { ...user, gardens: updatedGardens}
}

export const addGardenToUser = ({ name, plants }: AddGardenInput): AppThunk => async (dispatch, getState) => {
    try {
        const plantings = Object.values(plants).map(({ qty, ...plant}) => {
            const quant = qty || 0
            return {
                plantingId: uuid(),
                plant: Plant.of(plant),
                entries: [],
                qty: quant,
            }
        })
        const garden = {
            name,
            gardenId: uuid(),
            plantings
        }

        const builtUser = selectUser(getState())

        if (builtUser) {
            const user = addUserGarden(builtUser, Garden.of(garden))
            const entities = await api.updateUser(user)
            dispatch(setEntities(entities))
        }
        
    } catch (error) {
        toast.error('Add garden failed')
        console.log({error})
    }
}

export const removeGarden = (gardenId: string): AppThunk => async (dispatch, getState) => {
    try {
        const builtUser = selectUser(getState())
        if (builtUser) {
            const updatedGardens = builtUser.gardens.filter(g => g && g.gardenId !== gardenId)
            const updatedUser = { ...builtUser, gardens: updatedGardens }
            const entities = await api.updateUser(updatedUser)
            dispatch(setEntities(entities))
    
        }
    } catch (error) {
        toast.error('Remove garden failed')
        console.log({error})
    }
}


/* Selectors */
export const selectGardenId = (state: AppState) => state.garden.selected
const selectPlants = (state: AppState) => state.plants.plants
export const selectGarden = createSelector(
    [selectGardenId, selectGardenEntity, selectPlantingEntity, selectEntryEntity, selectPlants],
    (gardenId, allGardens, allPlantings, allEntries, allPlants) => {
        const args = {
            gardenId,
            allGardens,
            allPlantings,
            allEntries,
            allPlants
        }
        return buildGarden(args)
    }
)

export const buildGarden = ({
    gardenId,
    allGardens,
    allPlantings,
    allEntries,
    allPlants
}: BuildGardenArgs) => {
    if (!gardenId) { return }
    const garden = allGardens[gardenId] || {}
    const { plantings: plantingIds = [] } = garden
        const plantings: Planting[] = plantingIds.map((plantingId: string) => {
            const planting = allPlantings[plantingId] || {}
            const entries = (planting.entries || []).map((eId: string) => Entry.of(allEntries[eId]))

            const plant = Plant.of(allPlants[planting.plant] || {})
            return Planting.of({ ...planting, entries, plant, plantingId })
        })
        return Garden.of({ ...garden, plantings, gardenId })
}