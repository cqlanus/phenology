import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import { format } from 'date-fns'
import { Garden, Planting, Entry } from '../types/user'

interface Props {
    garden: Garden
}

const GardenCard = ({ garden }: Props) => {
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
    
    return (
        <Link to={`/garden/${garden.gardenId}`}>
            <Card fluid >
                <Card.Content>
                    <Card.Header>{garden.name}</Card.Header>
                    <Card.Meta>{meta1}</Card.Meta>
                    <Card.Meta>{meta2}</Card.Meta>
                </Card.Content>
            </Card>
        </Link>
    )
}

export default GardenCard
