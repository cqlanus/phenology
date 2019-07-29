import { Coords, ReverseGeocodeResponse } from '../types/location'

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

    getHistoricalWeahter = async (stationId: string, datatypeId: string) => {
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
        // const url = `${this.BASE_URL}/reversegeocode?latitude=${latitude}&longitude=${longitude}`
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
        const response = await request(url)
        console.log({response})
        return response
    }

}

export default new API()