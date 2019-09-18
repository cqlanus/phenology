import React from 'react'
import { Card } from 'semantic-ui-react'
import { format } from 'date-fns'

import { ActionLink } from './Link'

import { Garden, Planting, Entry } from '../types/user'


export interface Props {
    garden: Garden
    history: any,
    setGarden: (id: string) => void
}

const GardenCard = ({ garden, history, setGarden }: Props) => {
    const { plantings } = garden
    
    const distinctPlants = plantings.length
    const numPlantings = plantings.reduce((sum, p) => sum + p.qty, 0)
    const allEntries = plantings.reduce((acc: Entry[], planting: Planting): Entry[] => {
        const { entries } = planting
        return [ ...acc, ...entries ]
    }, [])

    const [ latestEntry ] = allEntries.map(e => new Date(e.created))
        .sort((dateA, dateB) => dateA.getTime() - dateB.getTime())
        .map(d => format(d, 'ddd MMM do'))
        .filter(Boolean)

    const meta1 = `${numPlantings} plantings of ${distinctPlants} plants`
    const meta2 = `Last updated: ${latestEntry}`

    const handleClick = () => {
        setGarden(garden.gardenId)
        history.push(`/garden/${garden.gardenId}`)
    }

    return (
        <ActionLink onClick={handleClick}>
            <Card fluid >
                <Card.Content>
                    <Card.Header>{garden.name}</Card.Header>
                    <Card.Meta>{meta1}</Card.Meta>
                    <Card.Meta>{meta2}</Card.Meta>
                </Card.Content>
            </Card>
        </ActionLink>
    )
}

export default GardenCard
