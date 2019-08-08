import { normalize, schema } from 'normalizr'
import plants from '../data/plants.json'
import { Coords } from '../types/location'
import entities from '../data/entities.json'
import { Entities } from '../redux/entities';
import { Plant, QtyPlant, PlantEntity } from '../types/entities';

const qtyPlants = plants.map((p: any) => ({ ...p, qty: 1 }))

const request = async (url: string, params?: any) => {
    const response = await fetch(url, params)
    return await response.json()
}

const GOOGLE_API_KEY = 'AIzaSyBDN03BFnHJ5UUyUCEqUsRylwLYuKijVH8'

interface NoaaQuery {
    stationId: string,
    datasetId: string,
    datatypeId: string,
    startDate: string,
    endDate: string
}

class API {
    BASE_URL = 'https://fierce-atoll-66412.herokuapp.com'
    NOAA_BASE = 'https://www.ncdc.noaa.gov/cdo-web/api/v2'
    token = 'YRUCkKgIqSPdMLIrNezdyThISwcaBZyI'
    queryNoaa = async ({ stationId, datasetId, datatypeId, startDate, endDate }: NoaaQuery) => {
        const params = { headers: { token: this.token } }
        const url = `${this.NOAA_BASE}/data?datasetid=${datasetId}&stationid=${stationId}&datatypeid=${datatypeId}&startdate=${startDate}&enddate=${endDate}&limit=1000`

        return await request(url, params)
    }
    
    getClimateNorms = async (stationId: string, datatypeId: string) => {
        const query = {
            datasetId: 'NORMAL_DLY',
            stationId,
            datatypeId,
            startDate: '2010-01-01',
            endDate: '2010-12-31'
        }
        
        return await this.queryNoaa(query)
    }

    getHistoricalWeather = async (stationId: string, datatypeId: string) => {
        const query = {
            datasetId: 'GHCND',
            stationId,
            datatypeId,
            startDate: '2019-01-01',
            endDate: '2019-12-31'
        }
        return await this.queryNoaa(query)
    }

    reverseGeocode = async (position: Coordinates | Coords): Promise<any> => {
        const { latitude, longitude } = position
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
        const response = await request(url)
        return response
    }

    getNearbyStations = async (countyId: string) => {
        const params = { headers: { token: this.token } }
        const url = `${this.NOAA_BASE}/stations?locationid=FIPS:${countyId}&datasetid=GHCND&datacategoryid=TEMP&startdate=2019-01-01&enddate=2019-12-31&datatypeid=TAVG`

        const response = await request(url, params)

        console.log({response})
        return response.results
    }

    getPlants = (): Promise<PlantEntity> => {
        const plant = new schema.Entity('plants')
        const plantSchema = new schema.Array(plant)

        const normalizedPlants: { entities: { plants: PlantEntity} } = normalize(qtyPlants, plantSchema)
        console.log({normalizedPlants})
        return new Promise((res) => {
            setTimeout(() => res(normalizedPlants.entities.plants), 500)
        })
    }

    addPlant = (plant: QtyPlant): Promise<QtyPlant[]> => {
        
        return new Promise((res) => {
            const plants = [ ...qtyPlants, plant]
            setTimeout(() => res(plants), 500)
        })
    }
    
    getEntities = (): Promise<{ entities: Entities }> => {

        const entry = new schema.Entity('entries')
        const planting = new schema.Entity('plantings', {
            entries: [entry]
        })
        const garden = new schema.Entity('gardens', {
            plantings: [planting]
        })
        const user = new schema.Entity('users', {
            gardens: [garden]
        })

        const entitiesSchema = new schema.Array(user)

        const normalizedEntities: { entities: Entities } = normalize(entities, entitiesSchema)

        return new Promise((res) => {
            setTimeout(() => res(normalizedEntities), 500)
        })
    }
    
}

export default new API()