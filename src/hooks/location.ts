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

const getCounty = async (position: Coords | Coordinates): Promise<any> => {
    const { results } = await API.reverseGeocode(position)
    const countyObject = results.find((result: any) => result.types.includes('administrative_area_level_2')) || {}

    const [ county, state ] = countyObject.address_components

    const countyName = county.long_name.replace(' County', '').toLowerCase()
    const stateAbbrev = state.short_name.toLowerCase()

    return { countyName, stateAbbrev}
    
}

export const getCountyCode = async (): Promise<County | undefined> => {
    const { countyName, stateAbbrev } = await getUserLocation()
    const key = `${countyName.split(' ').join('_')}_${stateAbbrev}`
    const codes: { [key: string]: any } = countyCodes
    const countyData = codes[key] || {}
    return countyData
}