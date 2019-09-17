import { createSelector } from "reselect";
import { selectGardenEntity, GardenEntity, PlantingEntity, selectPlantingEntity, EntryEntity, selectEntryEntity } from "./entities";
import { AppState } from ".";

/* Selectors */
const selectGardenId = (state: AppState, ownProps: {gardenId: string}) => ownProps.gardenId
export const selectGarden = createSelector(
    [selectGardenId, selectGardenEntity, selectPlantingEntity, selectEntryEntity, state => state.plants],
    (gardenId: string, allGardens: GardenEntity, allPlantings: PlantingEntity, allEntries: EntryEntity, allPlants: any) => {
        const garden = allGardens[gardenId] || {}
        const { plantings: plantingIds = [] } = garden
            const plantings = plantingIds.map((pId: string) => {
                const planting = allPlantings[pId] || {}
                const entries = (planting.entries || []).map((eId: string) => allEntries[eId])
                
                const plant = allPlants.plants[planting.plant]
                return { ...planting, entries, plant }
            })
            return { ...garden, plantings }
    }
)