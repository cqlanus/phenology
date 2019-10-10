import API from '../api'
import { Station } from '../types/climate'

const dailyMaxTemp: 'dailyMaxTemp' = 'dailyMaxTemp'
const dailyMinTemp: 'dailyMinTemp' = 'dailyMinTemp'
const dailyGdd40: 'dailyGdd40' = 'dailyGdd40'
const dailyPrecip50: 'dailyPrecip50' = 'dailyPrecip50'

const NORMS_DATA_TYPES = {
    'DLY-TMAX-NORMAL': dailyMaxTemp,
    'DLY-TMIN-NORMAL': dailyMinTemp,
    'DLY-GRDD-BASE40': dailyGdd40,
    'DLY-PRCP-50PCTL': dailyPrecip50,
}
interface StringObject { [key: string]: string }

const WEATHER_DATA_TYPES = {
    TAVG: 'avgTemp',
    TMAX: 'maxTemp',
    TMIN: 'minTemp'
}

const updateKeysWithMapping = (data: object[], mapping: StringObject): StringObject[] => {
    return data.map(obj => {
        return Object.entries(obj).reduce((acc, entry) => {
            const [ key, value ] = entry
            const newKey = mapping[key] || key.toLowerCase()
            return {
                ...acc,
                [newKey]: value
            }
        }, {})

    })
}

export const getClimateNorms = async (
    stationId: string,
): Promise<any> => {
    const climateKeys = Object.keys(NORMS_DATA_TYPES)
    const newNorms = await API.getNormals(stationId.split(':')[1], climateKeys)
    const norms = updateKeysWithMapping(newNorms, NORMS_DATA_TYPES)
    return norms
}

const trimToNumber = (stringNum: string) => {
    return +stringNum.trim()
}
export const getHistoricalWeather = async (stationId: string): Promise<any> => {
    const newKeys = Object.keys(WEATHER_DATA_TYPES)
    const newWeather = await API.getYtdWeather(stationId.split(':')[1], newKeys)
    const weather = updateKeysWithMapping(newWeather, WEATHER_DATA_TYPES)

    return weather.map((obj: any) => {
        const { maxTemp, minTemp, avgTemp } = obj
        if ([maxTemp, minTemp].includes(undefined)) {
            return undefined
        }
        const max = trimToNumber(maxTemp)
        const min = trimToNumber(minTemp)
        const avg = avgTemp ? trimToNumber(avgTemp) : ((max + min) / 2)
        return {
            ...obj,
            maxTemp: max,
            minTemp: min,
            avgTemp: avg,
        }
    }).filter(Boolean)
}

export const getNearbyStations = async (
    countyId: string,
): Promise<Station[]> => {
    return await API.getNearbyStations(countyId)
}
