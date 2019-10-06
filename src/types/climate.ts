interface DailyNorm {
    date: string,
    value: number,
    attributes: string,
    datatype: string,
    station: string
}


interface ClimateNormDay {
    dailyMaxTemp: DailyNorm,
    dailyMinTemp: DailyNorm,
    dailyGdd40: DailyNorm,
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