import api from '../api'
import { ClimateNorms } from '../types/climate'

const CLIMATE_DATA_TYPES = {
    dailyMaxTemp: 'DLY-TMAX-NORMAL',
    dailyMinTemp: 'DLY-TMIN-NORMAL',
    dailyGdd40: 'DLY-GRDD-BASE40',
    dailyPrecip50: 'DLY-PRCP-50PCTL',
}
export const getClimateNorms = async (stationId: string): Promise<ClimateNorms> => {
    const normsKeys = Object.keys(CLIMATE_DATA_TYPES)
    
    const processingNorms = Object.values(CLIMATE_DATA_TYPES).map(datatypeId => {
        return api.getClimateNorms(stationId, datatypeId)
    })

    const norms = await Promise.all(processingNorms)

    const object = norms.map(n => n.results).reduce((acc: any, results: any, idx: number) => {
        const key = normsKeys[idx]

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