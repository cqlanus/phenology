import API from '../api'
import { ClimateNorms, Station } from '../types/climate'

const CLIMATE_DATA_TYPES = {
    dailyMaxTemp: 'DLY-TMAX-NORMAL',
    dailyMinTemp: 'DLY-TMIN-NORMAL',
    dailyGdd40: 'DLY-GRDD-BASE40',
    dailyPrecip50: 'DLY-PRCP-50PCTL',
}

const HISTORICAL_DATA_TYPES = {
    avgTemp: 'TAVG'
}

const normalizeData = <T>(data: any[], keys: any[]): T[] => {
    console.log({data})
    const object = data.map(n => n.results).filter(Boolean).reduce((acc: any, results: any, idx: number) => {
        const key = keys[idx]

        results.forEach((day: any) => {
            const { date } = day

            if (acc[date]) {
                acc[date] = { ...acc[date], [key]: day}
            } else {
                acc[date] = { [key]: day }
            }
            
            
        })
        
        return acc
    }, {})
    return Object.values(object)
}

export const getClimateNorms = async (stationId: string): Promise<ClimateNorms> => {
    const normsKeys = Object.keys(CLIMATE_DATA_TYPES)
    
    const processingNorms = Object.values(CLIMATE_DATA_TYPES).map(datatypeId => {
        return API.getClimateNorms(stationId, datatypeId)
    })

    const norms = await Promise.all(processingNorms)

    return normalizeData(norms, normsKeys)
}

export const getHistoricalWeather = async (stationId: string): Promise<any> => {
    const weatherKeys = Object.keys(HISTORICAL_DATA_TYPES)
    const processingWeather = Object.values(HISTORICAL_DATA_TYPES).map(datatypeId => {
        console.log({datatypeId})
        return API.getHistoricalWeather(stationId, datatypeId)
    })

    const weather = await Promise.all(processingWeather)
    console.log({weather})

    return normalizeData(weather, weatherKeys)
}

export const getNearbyStations = async (countyId: string): Promise<Station[]> => {
    return await API.getNearbyStations(countyId)
}