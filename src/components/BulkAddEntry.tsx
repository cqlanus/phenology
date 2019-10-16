import React, { useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { Header, Button, Accordion, Input, InputOnChangeData } from 'semantic-ui-react'
import phenophaseCategories from '../data/phenophase.json'
import CenterWrapper from './CenterWrapper'
import { withNavBar } from '../containers/NavBar'
import { Garden, Planting } from '../types/user.js'

interface Phenophase {
    key: string
    value: string
    text: string
    description: string
}
type PhenophaseCategory = Phenophase[]
interface PhenophaseCategories { [key: string]: PhenophaseCategory }

const CategoryContainer = styled.div`
    margin-top: 1em;
`

const PlantingContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: .25em;
`

interface BulkEntryCardProps {
    phase: Phenophase
    plantings: Planting[]
    handleBulkEntry: (phase: Phenophase) => (planting: Planting) => void
    bulkEntries: any
    date: string
}
const BulkEntryCard = ({ phase, plantings, handleBulkEntry, bulkEntries, date }: BulkEntryCardProps) => {
    const [isOpen, setOpen] = useState(false)

    const toggleOpen = () => setOpen(!isOpen)

    const handleClick = (planting: Planting) => () => handleBulkEntry(phase)(planting)
    
    const isActive = (planting: Planting) => {
        const plantingsForPhase = bulkEntries[phase.value]

        if (plantingsForPhase) {
            return !!plantingsForPhase[planting.plantingId]
        }

        return false
        
    }
    
    return (
        <div>
            <Accordion.Title active={isOpen} onClick={toggleOpen}>
                <label>{phase.text}</label>
            </Accordion.Title>
            <Accordion.Content active={isOpen}>
                <PlantingContainer>
                        {plantings.map(pl => (
                            <Button disabled={!date} positive={isActive(pl)} onClick={handleClick(pl)} size="tiny" key={pl.plantingId}>
                                {pl.plant.commonName}
                            </Button>
                        ))}
                </PlantingContainer>
            </Accordion.Content>
        </div>
    )
}

interface Props {
    garden?: Garden
}

const initialBulkEntries: { [key: string]: any } = {}

const BulkAddEntry = ({ garden }: Props & RouteComponentProps) => {
    const [ date, setDate ] = useState()
    const [ bulkEntries, setBulkEntries ] = useState(initialBulkEntries)
    
    if (!garden) {
        return null
    }

    console.log({bulkEntries})
    
    const { plantings } = garden
    const handleDate = (e: React.ChangeEvent, {value}: InputOnChangeData) => {
         setDate(value)
    }

    const handleBulkEntry = (phase: Phenophase) => (planting: Planting) => {
        const plantingsForPhase = bulkEntries[phase.value]
        const { plantingId } = planting
        let updatedBulkEntries = {}
        if (plantingsForPhase) {
            const specificPlanting = plantingsForPhase[plantingId]
            let updatedPlantingsForPhase = {}
            if (specificPlanting) {
                const { [plantingId]: id, ...restOffPlantingsForPhase } = plantingsForPhase
                updatedPlantingsForPhase = restOffPlantingsForPhase
            } else {
                updatedPlantingsForPhase = { ...plantingsForPhase, [plantingId]: plantingId }
            }
            updatedBulkEntries = {
                ...bulkEntries,
                [phase.value]: updatedPlantingsForPhase
            }
            
        } else {
            updatedBulkEntries = {
                ...bulkEntries,
                [phase.value]: {
                   [plantingId]: plantingId 
                }
            }
        }
        setBulkEntries(updatedBulkEntries)
    }

    const categories: PhenophaseCategories = phenophaseCategories
    
    return (
        <CenterWrapper>
            <Header>Bulk Add Entries</Header>
            <Input type="date" fluid label="Date" onChange={handleDate} />
            {Object.entries(categories).map(entry => {
                const [category, phenophases] = entry
                return (
                    <CategoryContainer key={category}>
                        <Header>{category}</Header>
                        <Accordion styled fluid>
                            {phenophases.map(phase => (
                                <BulkEntryCard
                                    key={phase.key}
                                    phase={phase}
                                    plantings={plantings}
                                    handleBulkEntry={handleBulkEntry}
                                    bulkEntries={bulkEntries}
                                    date={date}
                                />
                            ))}
                        </Accordion>
                    </CategoryContainer>
                )
            })}
            <Button fluid primary>
                Add All Entries
            </Button>
        </CenterWrapper>
    )
}

export default withNavBar(BulkAddEntry)
