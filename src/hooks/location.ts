import { Coords, County } from '../types/location'
import API from '../api'
import countyCodes from '../data/countyCodes.json'

const getLocation = (): Promise<Position>  => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos: Position) => resolve(pos), reject)
    })
}

export const getUserLocation = async (): Promise<any> => {
    const { coords } = await getLocation()
    // const coords = {
    //     latitude: 34.052235, 
    //     longitude: -118.243683
    // }
    const place = await getCounty(coords)
    return place
}

export const getCountyFromZip = async (zip: string): Promise<any> => {
    const { results = [] } = await API.geocode(zip)
    const [ firstResult = {} ] = results
    const { geometry = {} } = firstResult
    const { location = {} } = geometry
    const { lat: latitude, lng: longitude } = location
    const coords = { latitude, longitude }
    const county = await getCounty(coords)
    console.log({county})
    return county
}

const processCountyName = (name: string) => name
    .replace(' County', '').toLowerCase()
    .replace(/\./g, '')

const getCounty = async (position: Coords | Coordinates): Promise<any> => {
    const { results } = await API.reverseGeocode(position)
    const countyObject = results.find((result: any) => result.types.includes('administrative_area_level_2')) || {}

    const [ county, state ] = countyObject.address_components
        .filter((result: any) => !result.types.includes('locality'))
        .filter((result: any) => !result.types.includes('sublocality'))

    const countyName = processCountyName(county.long_name)
    const stateAbbrev = state.short_name.toLowerCase()

    return { countyName, stateAbbrev}
    
}

const processPlace = (place: any) => {
    try {
        const { countyName, stateAbbrev } = place
        const key = `${countyName.split(' ').join('_')}_${stateAbbrev}`
        const codes: { [key: string]: any } = countyCodes
        const countyData = codes[key] || {}
        return countyData
    } catch (error) {
        console.log({error})
    }
}

export const getCountyCodeFromZip = async (zip: string): Promise<County | undefined> => {
    const place = await getCountyFromZip(zip)
    console.log({place})
    return processPlace(place)
}

export const getCountyCode = async (): Promise<County | undefined> => {
    const place = await getUserLocation()
    return processPlace(place)
}