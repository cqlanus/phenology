import { PhenophaseEntity } from "./entities"
import { normalize, schema } from 'normalizr'
import phenophaseCategories from '../data/phenophase.json'

/* Interfaces */
type PhenophaseState = PhenophaseEntity

/* Initial State */
const initialState = (): PhenophaseState => {
    const phenophase = new schema.Entity('phenophase', {}, {idAttribute: 'value'})
    const phenophaseSchema = new schema.Array(phenophase)

    const phenophases = Object.values(phenophaseCategories).reduce((acc, arr) => ([...acc, ...arr]), [])
    console.log({phenophases})

    const normalizedPhenophase: { entities: { phenophase: PhenophaseEntity} } = normalize(phenophases, phenophaseSchema)
    return normalizedPhenophase.entities.phenophase
}

/* Reducer */
export default (state = initialState(), action: any): PhenophaseState => {

    return state
}