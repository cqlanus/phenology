export interface ApiUser {
    id: string
    firstName: string
    lastName: string
    userName: string
    gardens: Garden[]
}

export interface Garden {
    gardenId: string
    name: string
    plantings: Planting[]
}

export interface Planting {
    qty: number
    plantingId: string
    plant: Plant
    entries: Entry[]
}

export interface Plant {
    plantId: string
    commonName: string
    isNative: boolean
    latinName: string
}

export interface Entry {
    entryId: string
    category: string
    created: string
    note: string
    phenophase: string
}