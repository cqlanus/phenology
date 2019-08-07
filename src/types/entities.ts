export interface User {
    id: string
    firstName: string
    lastName: string
    gardens: Garden[]
}
export interface Garden {
    id: string
    name: string
    plantings: Planting[]
}
export interface Planting {
    id: string
    plant: Plant
    qty: number
    entries: Entry[]
}
export interface Plant {
    id: string,
    commonName: string,
    latinName: string,
    isNative: boolean,
    type: string
}
export type QtyPlant = Plant & { qty: number }
export interface Entry {}