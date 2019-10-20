import {useState} from 'react'
import { NetworkPlant } from '../types/user'

export interface InitialPlants { [key: string]: NetworkPlant & {qty: number}}
export const usePlant = () => {
    const initialPlants: InitialPlants = {}
    const [checked, setChecked] = useState(initialPlants)

    const handleCheck = (plant: NetworkPlant) => {
        const { commonName } = plant
        let updatedChecked = {}

        if (checked[commonName]) {
            const { [commonName]: value, ...newChecked } = checked
            updatedChecked = newChecked
        } else {
            const newChecked = { ...checked, [commonName]: {...plant, qty: 1} }
            updatedChecked = newChecked
        }

        setChecked(updatedChecked)
        return updatedChecked
    }
    
    return { checked, handleCheck }
}