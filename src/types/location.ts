export interface Coords {
    latitude: number
    longitude: number
}

interface Geometry {
    coordinates: [ number, number ],
    type: string
}

export interface Place {
    bbox: number[][],
    center: number[],
    geometry: Geometry,
    coords: Coords,
    place_name: string,
    place_type: string[],
    type: string,
    text: string,
    id: string,
}

export interface ReverseGeocodeResponse {
    features: Array<Place>
}