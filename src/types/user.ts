import { Station } from "./climate"

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
    station?: Station
}
export class Garden {
    gardenId: string
    name: string
    plantings: Planting[]
    station?: Station
    constructor({ gardenId, name, plantings, station }: GardenArgs) {
        this.gardenId = gardenId
        this.name = name
        this.plantings = plantings
        this.station = station
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

export interface NetworkPlant {
    id: string
    commonName: string
    isNative: boolean
    latinName: string
    type: string
}

export interface PlantArgs {
    id: string
    commonName: string
    isNative: boolean
    latinName: string
    type: string
    qty?: number
}

export class Plant {
    plantId: string
    commonName: string
    isNative: boolean
    latinName: string
    type: string
    qty?: number

    constructor({ id, commonName, isNative, latinName, type, qty }: PlantArgs) {
        this.plantId = id
        this.commonName = commonName
        this.latinName = latinName
        this.isNative = isNative
        this.type = type
        this.qty = qty
    }

    static of(plantArgs: PlantArgs) {
        return new Plant(plantArgs)
    }
}

export type PlantEntity = { [plantId: string]: NetworkPlant }

export interface AddEntryInput {
    category: string
    phenophase: string
    created: string
    note: string
}

export interface EntryArgs {
    entryId: string
    category: string
    created: string
    note: string
    phenophase: string
    gdd?: number
    ytdGdd?: number
}

export class Entry {
    entryId: string
    category: string
    created: string
    note: string
    phenophase: string
    gdd?: number
    ytdGdd?: number

    constructor({ entryId, category, created, note, phenophase, gdd, ytdGdd }: EntryArgs) {
        this.entryId = entryId
        this.category = category
        this.created = created
        this.note = note
        this.phenophase = phenophase
        this.gdd = gdd
        this.ytdGdd = ytdGdd
    }

    static of(entryArgs: EntryArgs) {
        return new Entry(entryArgs)
    }
}