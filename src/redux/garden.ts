import { createSelector } from "reselect";
import { selectGardenEntity, GardenEntity, PlantingEntity, selectPlantingEntity, EntryEntity, selectEntryEntity } from "./entities";
import { AppState } from ".";
import { Garden, Planting, Entry, Plant } from "../types/user";

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

/* Action Creators */
export const setGarden = (gardenId: string): SelectGardenAction => {
    return {
        type: SET_GARDEN,
        gardenId
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
            
            const plant = Plant.of(allPlants[planting.plant] || {})
            return Planting.of({ ...planting, entries, plant, plantingId })
        })
        return Garden.of({ ...garden, plantings, gardenId })
}