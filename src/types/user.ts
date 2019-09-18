export interface ApiUser {
    id: string
    firstName: string
    lastName: string
    userName: string
    gardens: Garden[]
}

interface GardenArgs {
    gardenId: string
    name: string
    plantings: Planting[]
}
export class Garden {
    gardenId: string
    name: string
    plantings: Planting[]
    constructor({ gardenId, name, plantings }: GardenArgs) {
        this.gardenId = gardenId
        this.name = name
        this.plantings = plantings
    }

    static of(gardenArgs: GardenArgs) {
        return new Garden(gardenArgs)
    }
    
}

export interface PlantingArgs {
    qty: number
    plantingId: string
    plant: Plant
    entries: Entry[]
}

export class Planting {
    qty: number
    plantingId: string
    plant: Plant
    entries: Entry[]
    constructor({plantingId, qty, plant, entries}: PlantingArgs) {
        this.plantingId = plantingId
        this.qty = qty
        this.plant = plant
        this.entries = entries
    }

    static of(plantingArgs: PlantingArgs) {
        return new Planting(plantingArgs)
    }
}

export interface PlantArgs {
    plantId: string
    commonName: string
    isNative: boolean
    latinName: string
}

export class Plant {
    plantId: string
    commonName: string
    isNative: boolean
    latinName: string

    constructor({ plantId, commonName, isNative, latinName }: PlantArgs) {
        this.plantId = plantId
        this.commonName = commonName
        this.latinName = latinName
        this.isNative = isNative
    }

    static of(plantArgs: PlantArgs) {
        return new Plant(plantArgs)
    }
}

export interface EntryArgs {
    entryId: string
    category: string
    created: string
    note: string
    phenophase: string
}

export class Entry {
    entryId: string
    category: string
    created: string
    note: string
    phenophase: string

    constructor({ entryId, category, created, note, phenophase }: EntryArgs) {
        this.entryId = entryId
        this.category = category
        this.created = created
        this.note = note
        this.phenophase = phenophase
    }

    static of(entryArgs: EntryArgs) {
        return new Entry(entryArgs)
    }
}