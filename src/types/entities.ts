import { Plant, NetworkPlant } from "./user";

export interface User {
    id: string
    firstName: string
    lastName: string
    gardens: string[]
}
export interface Garden {
    id: string
    name: string
    plantings: string[]
}
export interface Planting {
    id: string
    plant: string
    qty: number
    entries: string[]
}
// export interface Plant {
//     id: string,
//     commonName: string,
//     latinName: string,
//     isNative: boolean,
//     type: string
// }
// export type QtyPlant = Plant & { qty: number }
export interface Entry {
    entryId: string
    category: string
    created: string
    note: string
    phenophase: string
}

export type PlantEntity = { [plantId: string]: NetworkPlant }