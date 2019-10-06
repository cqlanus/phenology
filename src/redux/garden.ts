import { createSelector } from "reselect"
import uuid from 'uuid'
import { selectGardenEntity, GardenEntity, PlantingEntity, selectPlantingEntity, EntryEntity, selectEntryEntity, setEntities } from "./entities"
import { AppState } from "."
import { Garden, Planting, Entry, Plant } from "../types/user"
import { QtyPlant } from "../types/entities"
import { selectUser } from "./user"
import api from "../api"

/* Action Constants */
const SET_GARDEN: 'SET_GARDEN' = 'SET_GARDEN'

/* Interfaces */
interface GardenState { 
    selected?: string 
}

interface SelectGardenAction {
    type: typeof SET_GARDEN
    gardenId: string
}

type GardenAction = SelectGardenAction

interface BuildGardenArgs {
    gardenId: string | undefined,
    allGardens: GardenEntity,
    allPlantings: PlantingEntity,
    allEntries: EntryEntity,
    allPlants: any
}

interface Plants { [key: string]: QtyPlant }
export interface AddGardenInput {
    name: string
    plants: Plants
}

/* Action Creators */
export const setGarden = (gardenId: string): SelectGardenAction => {
    return {
        type: SET_GARDEN,
        gardenId
    }
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

export const addGardenToUser = ({ name, plants }: AddGardenInput) => async (dispatch: any, getState: any) => {
    try {
        const plantings = Object.values(plants).map(({ qty, ...plant}) => {
            return {
                plantingId: uuid(),
                plant: Plant.of(plant),
                entries: [],
                qty,
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
            const response = await api.updateUser(user)
            dispatch(setEntities(response))
        }
        
    } catch (error) {
        console.log({error})
    }
}

export const removeGarden = (gardenId: string) => async (dispatch: any, getState: any) => {
    try {
        const builtUser = selectUser(getState())
        if (builtUser) {
            const updatedGardens = builtUser.gardens.filter(g => g && g.gardenId !== gardenId)
            const updatedUser = { ...builtUser, gardens: updatedGardens }
            const response = await api.updateUser(updatedUser)
            dispatch(setEntities(response))
    
        }
    } catch (error) {
        console.log({error})
    }
}

/* Initial State */
const initialState: GardenState = {
    selected: undefined
}

export default (state = initialState, action: GardenAction): GardenState => {

    switch (action.type) {
     
        case SET_GARDEN: {
            return { 
                ...state,
                selected: action.gardenId
            }
        }
        
        default:
            return state
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

            const thing = allPlants[planting.plant]
            console.log({allPlants})
            
            const plant = Plant.of(allPlants[planting.plant] || {})
            return Planting.of({ ...planting, entries, plant, plantingId })
        })
        return Garden.of({ ...garden, plantings, gardenId })
}