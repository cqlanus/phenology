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

export interface Station {
    id: string,
    longitude: number,
    latitude: number,
    name: string
    elevation: number
    elevationUnit: string
}