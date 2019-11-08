import React, { useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import {
    Header,
    Button,
    Accordion,
    Input,
    InputOnChangeData,
} from 'semantic-ui-react'
import phenophaseCategories from '../data/phenophase.json'
import CenterWrapper from './CenterWrapper'
import { Garden, Planting } from '../types/user.js'
import { BulkEntries } from '../redux/entry'
import { BREAKPOINTS } from '../data/breakpoints'

interface Phenophase {
    key: string
    value: string
    text: string
    description: string
}
type PhenophaseCategory = Phenophase[]
interface PhenophaseCategories {
    [key: string]: PhenophaseCategory
}

const CategoryContainer = styled.div`
    margin-top: 1em;
`

const PlantingContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 0.25em;
`

const StyledButton = styled(Button)`
    &&& {
        margin: 1em 0;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1em;

    @media (min-width: ${BREAKPOINTS.TABLET}px) {
        grid-template-columns: 1fr 1fr;
    }
`

interface BulkEntryCardProps {
    phase: Phenophase
    plantings: Planting[]
    handleBulkEntry: (
        categoory: string,
        phase: Phenophase,
    ) => (planting: Planting) => void
    bulkEntries: any
    date: string
    category: string
}
const BulkEntryCard = ({
    phase,
    plantings,
    handleBulkEntry,
    bulkEntries,
    date,
    category,
}: BulkEntryCardProps) => {
    const [isOpen, setOpen] = useState(false)

    const toggleOpen = () => setOpen(!isOpen)

    const handleClick = (planting: Planting) => () =>
        handleBulkEntry(category, phase)(planting)

    const isActive = (planting: Planting) => {
        const entriesForPlanting = bulkEntries[planting.plantingId]
        if (entriesForPlanting) {
            return !!entriesForPlanting[phase.value]
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
                        <Button
                            disabled={!date}
                            positive={isActive(pl)}
                            onClick={handleClick(pl)}
                            size="tiny"
                            key={pl.plantingId}>
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
    bulkAddEntry: (bulk: BulkEntries) => void
}

const initialBulkEntries: { [key: string]: any } = {}

const BulkAddEntry = ({
    garden,
    bulkAddEntry,
    history,
}: Props & RouteComponentProps) => {
    const [date, setDate] = useState()
    const [bulkEntries, setBulkEntries] = useState(initialBulkEntries)

    if (!garden) {
        return null
    }

    const { plantings } = garden
    const handleDate = (e: React.ChangeEvent, { value }: InputOnChangeData) => {
        setDate(value)
    }

    const handleSubmit = () => {
        bulkAddEntry(bulkEntries)
        history.push(`/garden/${garden.gardenId}`)
    }

    const handleBulkEntry = (category: string, phase: Phenophase) => (
        planting: Planting,
    ) => {
        const entryForPlanting = {
            category,
            created: date,
            phenophase: phase.value,
            note: 'asdf',
        }

        const { plantingId } = planting
        const bulkEntriesForPlanting = bulkEntries[plantingId]
        const previousEntry =
            bulkEntriesForPlanting && bulkEntriesForPlanting[phase.value]
        let updatedBulkEntriesForPlanting = {}
        if (previousEntry) {
            const { [phase.value]: removed, ...restOfPlanting } = previousEntry
            updatedBulkEntriesForPlanting = restOfPlanting
        } else {
            updatedBulkEntriesForPlanting = {
                ...bulkEntriesForPlanting,
                [phase.value]: entryForPlanting,
            }
        }

        const updatedBulkEntries = {
            ...bulkEntries,
            [plantingId]: updatedBulkEntriesForPlanting,
        }

        setBulkEntries(updatedBulkEntries)
    }

    const categories: PhenophaseCategories = phenophaseCategories

    return (
        <CenterWrapper>
            <Header>Bulk Add Entries</Header>
            <Input type="date" fluid label="Date" onChange={handleDate} />
            <Grid>
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
                                        category={category}
                                        handleBulkEntry={handleBulkEntry}
                                        bulkEntries={bulkEntries}
                                        date={date}
                                    />
                                ))}
                            </Accordion>
                        </CategoryContainer>
                    )
                })}
            </Grid>
            <StyledButton fluid primary onClick={handleSubmit}>
                Add All Entries
            </StyledButton>
        </CenterWrapper>
    )
}

export default BulkAddEntry
