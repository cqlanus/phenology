import { normalize, schema } from 'normalizr'
import { API as A, graphqlOperation } from 'aws-amplify'
import plants from '../data/plants.json'
import { Coords } from '../types/location'
import { Entities } from '../redux/entities'
import { QtyPlant, PlantEntity } from '../types/entities'
import { getUserByUserName } from '../gql/queries'
import { createUser } from '../graphql/mutations'
import { updateUser } from '../gql/mutations'
import { AuthUser } from '../redux/auth'

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

interface NceiQuery {
    dataset: string
    stations: string
    dataTypes: string
    startDate: string
    endDate: string
}

interface WeatherDataObject {
    TAVG: string
    TMIN: string
    TMAX: string
    DATE: string
    STATION: string
}


class API {
    BASE_URL = 'https://fierce-atoll-66412.herokuapp.com'
    NOAA_BASE = 'https://www.ncdc.noaa.gov/cdo-web/api/v2'
    NCEI_BASE = 'https://www.ncei.noaa.gov/access/services/data/v1'
    token = 'YRUCkKgIqSPdMLIrNezdyThISwcaBZyI'
    queryNcei = async ({ dataset, dataTypes, stations, startDate, endDate}: NceiQuery) => {
        const url = `${this.NCEI_BASE}?dataset=${dataset}&stations=${stations}&dataTypes=${dataTypes}&startDate=${startDate}&endDate=${endDate}&format=json`
        return await request(url)
    }
    
    queryNoaa = async ({ stationId, datasetId, datatypeId, startDate, endDate }: NoaaQuery) => {
        const params = { headers: { token: this.token } }
        const url = `${this.NOAA_BASE}/data?datasetid=${datasetId}&stationid=${stationId}&datatypeid=${datatypeId}&startdate=${startDate}&enddate=${endDate}&limit=1000`

        return await request(url, params)
    }
    
    getNormals = async (station: string, datatypes: string[]) => {
        const query: NceiQuery = {
            dataset: 'normals-daily',
            dataTypes: datatypes.join(),
            stations: station,
            startDate: '2010-01-01',
            endDate: '2010-12-31'
        }

        return await this.queryNcei(query)
    }
    
    getYtdWeather = async (station: string, datatypes: string[]): Promise<WeatherDataObject[]> => {
        const query: NceiQuery = {
            dataset: 'daily-summaries',
            dataTypes: datatypes.join(),
            stations: station,
            startDate: '2019-01-01',
            endDate: '2019-12-31'
        }

        return await this.queryNcei(query)

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
        const url = `${this.NOAA_BASE}/stations?locationid=FIPS:${countyId}&startdate=2010-01-01&enddate=2010-12-31&datasetid=NORMAL_DLY&datasetid=GHCND`

        const response = await request(url, params)

        return response.results
    }

    getPlants = (): Promise<PlantEntity> => {
        const plant = new schema.Entity('plants')
        const plantSchema = new schema.Array(plant)

        const normalizedPlants: { entities: { plants: PlantEntity} } = normalize(qtyPlants, plantSchema)
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
    
    getEntities = async (userName = "cqlanus"): Promise<{ entities: Entities }> => {

        const { data } = await A.graphql(graphqlOperation(getUserByUserName, { userName }))

        const entry = new schema.Entity('entries', {}, {idAttribute: 'entryId'})
        const plant = new schema.Entity('plant', {}, {idAttribute: 'plantId'})
        const planting = new schema.Entity('plantings', {
            entries: [entry],
            plant,
        }, {idAttribute: 'plantingId'})
        const garden = new schema.Entity('gardens', {
            plantings: [planting]
        }, {idAttribute: 'gardenId'})
        const user = new schema.Entity('users', {
            gardens: [garden]
        })

        const entitiesSchema = new schema.Array(user)

        const normalizedEntities: { entities: Entities } = normalize(data.getUserByUserName.items, entitiesSchema)

        return new Promise((res) => {
            setTimeout(() => res(normalizedEntities), 500)
        })
    }

    normalizeUser = (apiUser: any) => {
        const entry = new schema.Entity('entries', {}, {idAttribute: 'entryId'})
        const plant = new schema.Entity('plant', {}, {idAttribute: 'plantId'})
        const planting = new schema.Entity('plantings', {
            entries: [entry],
            plant,
        }, {idAttribute: 'plantingId'})
        const garden = new schema.Entity('gardens', {
            plantings: [planting]
        }, {idAttribute: 'gardenId'})
        const user = new schema.Entity('users', {
            gardens: [garden]
        })

        const normalizedEntities: { entities: Entities, result: any } = normalize(apiUser, user)
        return normalizedEntities
    }
    
    createApiUser = async ({username: userName, attributes}: AuthUser) => {
        const { given_name: firstName, family_name: lastName } = attributes
        const apiUserInput = { firstName, lastName, userName, id: userName, gardens: [] }
        const { data: { createUser: user }} = await A.graphql(graphqlOperation(createUser, {input: apiUserInput}))
        return user
    }
    
    getApiUser = async (authUser: AuthUser) => {
        const { username: userName } = authUser
        const { data: { getUserByUserName: { items } } } = await A.graphql(graphqlOperation(getUserByUserName, { userName }))

        const [ user ] = items
        if (user) {
            return this.normalizeUser(user)
        } else {
            const apiUser = await this.createApiUser(authUser)
            return this.normalizeUser(apiUser)
        }
    }

    updateUser = async (updatedUser: any) => {
        // console.log({updatedUser})
        const { data }: { data: { updateUser: any }} = await A.graphql(graphqlOperation(updateUser, {input: updatedUser}))
        const { updateUser: user } = data
        return this.normalizeUser(user)
    }
    
}

export default new API()