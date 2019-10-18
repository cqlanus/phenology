export interface StringObject { [key: string]: string }
interface ClimateNormDay {
    dailyMaxTemp: number,
    dailyMinTemp: number,
    dailyGdd40: number,
    dailyPrecip50: number,
}

export type ClimateNorms = ClimateNormDay[]

export interface StationArgs {
    id: string
    longitude: number
    latitude: number
    name: string
    elevation: number
    elevationUnit: string
}

export class Station {
    stationId: string
    longitude: number
    latitude: number
    name: string
    elevation: number
    elevationUnit: string

    constructor({id, longitude, latitude, name, elevation, elevationUnit}: StationArgs) {
        this.stationId = id
        this.longitude = longitude
        this.latitude = latitude
        this.name = name
        this.elevation = elevation
        this.elevationUnit = elevationUnit
    }

    static of (args: StationArgs) {
        return new Station(args)
    }
    
}