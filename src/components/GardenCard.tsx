import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Card, Image, Feed, Header } from 'semantic-ui-react'
import { Link as L } from 'react-router-dom'

import { Garden, Planting, Entry } from '../types/user'
import { StyledHeader } from './StyledHeader'
import leaf from '../assets/images/leaf.svg'

export interface Props {
    garden: Garden
    history: any,
    setGarden: (id: string) => void
}

const StyledCard = styled(Card)`
    &&& {
        padding: 1em;
    }
`

const StyledLink = styled(L)`
    &&&& > ${StyledCard} {
        margin-bottom: .75em;
    }
`

const Content = styled.div`
    display: flex;
    align-items: center;
`

const ImageContainer = styled.div`
    height: 3em;
    width: 3em;
    margin-right: 1em;
    /* float: left; */
`

const GardenCard = ({ garden, history, setGarden }: Props) => {
    const { plantings } = garden
    
    const distinctPlants = plantings.length
    const numPlantings = plantings.reduce((sum, p) => sum + p.qty, 0)
    const allEntries = plantings.reduce((acc: Entry[], planting: Planting): Entry[] => {
        const { entries } = planting
        return [ ...acc, ...entries ]
    }, [])

    const [ latestEntry ] = allEntries.map(e => new Date(e.created))
        .sort((dateA, dateB) => dateB.getTime() - dateA.getTime())
        .map(d => moment(d).format('ddd, MMM Do'))
        .filter(Boolean)

    const meta1 = `${numPlantings} plantings of ${distinctPlants} plants`
    const meta2 = `Last observation: ${latestEntry || 'Never'}`
    const meta3 = garden.station && `Station: ${garden.station.name.split(',')[0]}`

    const handleClick = () => {
        setGarden(garden.gardenId)
    }

    return (
        <StyledLink to={`/garden/${garden.gardenId}`} onClick={handleClick}>
            <StyledCard fluid >
                <Content>
                    <Card.Content>
                        <ImageContainer>
                            <Image src={leaf} size="tiny" />
                        </ImageContainer>
                    </Card.Content>
                    
                    <Card.Content>
                            <StyledHeader>{garden.name}</StyledHeader>
                            <Card.Meta>{meta1}</Card.Meta>
                            <Card.Meta>{meta2}</Card.Meta>
                            <Card.Meta>{meta3}</Card.Meta>
                        </Card.Content>
                </Content>
            </StyledCard>
        </StyledLink>
    )
}

export default GardenCard
