import { Coords, Place } from '../types/location'
import API from '../api'

const getLocation = (): Promise<Position>  => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos: Position) => resolve(pos), reject)
    })
}

export const getUserLocation = async (): Promise<any> => {
    // const { coords } = await getLocation()
    const coords = {
        latitude: 34.052235, 
        longitude: -118.243683
    }
    const place = await getCounty(coords)
    console.log({place})
    return place
}

const getCounty = async (position: Coords | Coordinates): Promise<any> => {
    const { results } = await API.reverseGeocode(position)
    console.log({results})


    const countyObject = results.find((result: any) => result.types.includes('administrative_area_level_2')) || {}

    const [ county, state ] = countyObject.address_components

    const countyName = county.long_name.replace(' County', '').toLowerCase()
    const stateAbbrev = state.short_name.toLowerCase()

    return { countyName, stateAbbrev}
    
}