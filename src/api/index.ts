import { normalize, schema } from 'normalizr'
import { API as A, graphqlOperation } from 'aws-amplify'
import { Coords } from '../types/location'
import { Entities } from '../redux/entities'
import { PlantEntity } from '../types/entities'
import { getUserByUserName } from '../gql/queries'
import { createUser, createPlantModel, updatePlantModel } from '../graphql/mutations'
import { listPlantModels } from '../graphql/queries'
import { updateUser } from '../gql/mutations'
import { AuthUser } from '../redux/auth'
import { PlantArgs, NetworkPlant } from '../types/user.js'
import uuid from 'uuid'

// const qtyPlants = plants.map((p: any) => ({ ...p, qty: 1 }))

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
    INATURALIST_BASE = `https://api.inaturalist.org/v1`
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

    geocode = async (zip: string) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLE_API_KEY}`
        const response = await request(url)
        return response
    }

    AIRPORT_PREFIX = "USW"
    getNearbyStations = async (countyId: string) => {
        const params = { headers: { token: this.token } }
        const url = `${this.NOAA_BASE}/stations?locationid=FIPS:${countyId}&startdate=2010-01-01&enddate=2010-12-31&datasetid=NORMAL_DLY&datasetid=GHCND&limit=100`

        const { results = []} = await request(url, params)

        return results.filter((r: any) => r.id.includes(this.AIRPORT_PREFIX))
    }

    getPlants = async (): Promise<PlantEntity> => {
        const plant = new schema.Entity('plants')
        const plantSchema = new schema.Array(plant)

        const limit = 500

        const { data: { listPlantModels: plantModels }}: { data: { listPlantModels: any }} = await A.graphql(graphqlOperation(listPlantModels, { limit }))

        const normalizedPlants: { entities: { plants: PlantEntity} } = normalize(plantModels.items, plantSchema)
        console.log({normalizedPlants})
        return normalizedPlants.entities.plants
    }

    getPlantImage = async (latinName: string): Promise<any> => {
        if (!latinName) {
            return null
        }
        
        const url = `${this.INATURALIST_BASE}/taxa?q=${latinName}`

        const { results } = await request(url)
        const [ firstResult = {} ] = results
        const { default_photo = {} } = firstResult
        const { square_url } = default_photo

        if (!square_url) {
            return this.getPlantImage(latinName.split(' ')[0])
        }
        
        return square_url
        
    }

    addPlant = async (plantArgs: PlantArgs): Promise<NetworkPlant> => {
        const image = await this.getPlantImage(plantArgs.latinName)
        const plant = {
            ...plantArgs,
            image,
            id: uuid()
        }
        const { data: { createPlantModel: plantModel } } = await A.graphql(graphqlOperation(createPlantModel, { input: plant }))
        return plantModel
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
        console.log({apiUserInput})
        const { data: { createUser: user }} = await A.graphql(graphqlOperation(createUser, {input: apiUserInput}))
        return user
    }
    
    getApiUser = async (authUser: AuthUser) => {
        console.log({authUser})
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
    
    addPlants = async (plantList: PlantArgs[]) => {
        const currentInventory = await this.getPlants()

        // if (!currentInventory) { return }

        const latinNameInventory: { [key: string]: NetworkPlant } = Object.values(currentInventory || {}).reduce((acc, plant) => {
            const { latinName } = plant
            return {
                ...acc,
                [latinName]: plant
            }
        }, {})
        
        const processingPlants = await plantList.map(async (plant) => {
            const existingPlant = currentInventory && latinNameInventory[plant.latinName]
            if (existingPlant) {
                const { id } = existingPlant
                const updatedPlant = { ...plant, id }
                return await updateOnePlant(updatedPlant)
            } else {
                return await this.addPlant(plant)
            }
        })
        await Promise.all(processingPlants)
    }
}

const updateOnePlant = async (plant: PlantArgs) => {
    const response = await A.graphql(graphqlOperation(updatePlantModel, { input: plant }))
    console.log({plant}, {response})
}

export default new API()