import {useState} from 'react'
import { QtyPlant } from '../types/entities'

export interface InitialPlants { [key: string]: QtyPlant }
export const usePlant = () => {
    const initialPlants: InitialPlants = {}
    const [checked, setChecked] = useState(initialPlants)

    const handleCheck = (plant: QtyPlant) => {
        const { commonName } = plant
        let updatedChecked = {}

        if (checked[commonName]) {
            const { [commonName]: value, ...newChecked } = checked
            updatedChecked = newChecked
        } else {
            const newChecked = { ...checked, [commonName]: plant }
            updatedChecked = newChecked
        }

        setChecked(updatedChecked)
        return updatedChecked
    }
    
    return { checked, handleCheck }
}