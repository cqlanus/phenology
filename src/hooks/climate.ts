import API from '../api'
import { ClimateNorms, Station } from '../types/climate'

const CLIMATE_DATA_TYPES = {
    dailyMaxTemp: 'DLY-TMAX-NORMAL',
    dailyMinTemp: 'DLY-TMIN-NORMAL',
    dailyGdd40: 'DLY-GRDD-BASE40',
    dailyPrecip50: 'DLY-PRCP-50PCTL',
}

const HISTORICAL_DATA_TYPES = {
    avgTemp: 'TAVG',
}

const ALT_HISTORICAL_DATA_TYPES = {
    maxTemp: 'TMAX',
    minTemp: 'TMIN',
}

const arrayifyData = <T>(data: any[], keys: any[]): T[] => {
    console.log({ data })
    const object = data
        .map(n => n.results)
        .filter(Boolean)
        .reduce((acc: any, results: any, idx: number) => {
            const key = keys[idx]

            results.forEach((day: any) => {
                const { date } = day

                if (acc[date]) {
                    acc[date] = { ...acc[date], [key]: day }
                } else {
                    acc[date] = { [key]: day }
                }
            })

            return acc
        }, {})
    return Object.values(object)
}

export const getClimateNorms = async (
    stationId: string,
): Promise<ClimateNorms> => {
    const normsKeys = Object.keys(CLIMATE_DATA_TYPES)

    const processingNorms = Object.values(CLIMATE_DATA_TYPES).map(
        datatypeId => {
            return API.getClimateNorms(stationId, datatypeId)
        },
    )

    const norms = await Promise.all(processingNorms)

    return arrayifyData(norms, normsKeys)
}

const getWeatherForKeys = async (
    keys: { [key: string]: string },
    stationId: string,
) => {
    const weatherKeys = Object.keys(keys)
    const processingWeather = Object.values(keys).map(datatypeId => {
        return API.getHistoricalWeather(stationId, datatypeId)
    })

    const weather = await Promise.all(processingWeather)
    return { weather, weatherKeys }
}

const deriveAvgTemp = (weather: any[]) => {
    return weather
        .filter(({ minTemp, maxTemp }) => minTemp && maxTemp)
        .map(({ minTemp, maxTemp }) => {
            const { value: min } = minTemp
            const { value: max } = maxTemp
            const avgTemp = (max + min) / 2
            return {
                avgTemp: {
                    ...minTemp,
                    value: avgTemp,
                    datatype: 'TAVG',
                },
            }
        })
}

export const getHistoricalWeather = async (stationId: string): Promise<any> => {
    const { weather, weatherKeys } = await getWeatherForKeys(
        HISTORICAL_DATA_TYPES,
        stationId,
    )
    if (!weather[0].results) {
        const { weather, weatherKeys } = await getWeatherForKeys(
            ALT_HISTORICAL_DATA_TYPES,
            stationId,
        )
        const arrayified = arrayifyData(weather, weatherKeys)
        try {
            const derived = deriveAvgTemp(arrayified)
            return derived
        } catch (error) {
            console.log({ error })
        }
    }

    return arrayifyData(weather, weatherKeys)
}

export const getNearbyStations = async (
    countyId: string,
): Promise<Station[]> => {
    return await API.getNearbyStations(countyId)
}
