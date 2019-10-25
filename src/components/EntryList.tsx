import React, { useState } from 'react'
import styled from 'styled-components'
import { Entry } from '../types/user'
import { Card, Icon, Feed, Accordion, Modal } from 'semantic-ui-react'
import moment from 'moment'
import { PhenophaseEntity } from '../redux/entities'
import EditEntryForm from '../containers/EditEntryForm'
import { YtdWeather } from '../types/weather'

interface Props {
    entries: Entry[]
    phenophases: PhenophaseEntity
    setEntry: (entryId?: string) => void
    setPlanting: (plantingId?: string) => void
    plantingId: string | undefined
    ytdWeather: YtdWeather
}

const Row = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Title = styled.h4`
    margin: 0;
`

const EntryList = ({ entries, phenophases, setEntry, plantingId, setPlanting, ytdWeather }: Props) => {
    const [isOpen, setOpen] = useState(false)
    const [isFormOpen, setFormOpen] = useState(false)

    const toggleOpen = () => setOpen(!isOpen)
    const closeModal = () => {
        setEntry(undefined)
        setFormOpen(false)
    }
    const handleOpen = (entryId: string) => () => {
        plantingId && setPlanting(plantingId)
        setEntry(entryId)
        setFormOpen(true)
    }

    const renderEditEntry = (entryId: string) => (
        <Modal open={isFormOpen} onClose={closeModal}  trigger={
                <Icon name="edit" onClick={handleOpen(entryId)} />
            }>
            <Modal.Content>
                <EditEntryForm closeModal={closeModal} />
            </Modal.Content>
        </Modal>
    )

    const renderEntry = (phenophases: PhenophaseEntity) => (entry: Entry) => {
        const phenophase = phenophases[entry.phenophase]
        const created = moment(entry.created)
        const formatted = created.format('ddd, MMM Do')
        return (
            <Feed.Event key={entry.entryId}>
                <Feed.Label>
                    <Icon name={'circle'} />
                </Feed.Label>
                <Feed.Content
                // format(d, 'ddd MMM do')
                    date={formatted}
                    summary={phenophase && phenophase.text}
                    extraText={`Notes: ${entry.note || ""}`}
                    meta={`GDD: ${entry.gdd}°C\nYTDGDD: ${entry.ytdGdd}°C`}
                />
                <Feed.Label>{renderEditEntry(entry.entryId)}</Feed.Label>
            </Feed.Event>
        )
    }

    const renderEntries = (entries: Entry[], phenophases: PhenophaseEntity) => {
        if (entries.length > 0) {
            return (
                <Card.Content>
                    <Feed>{entries.map(renderEntry(phenophases))}</Feed>
                </Card.Content>
            )
        }
    }

    const title = isOpen ? 'Hide Entries' : 'See Entries'

    return (
        <Accordion>
            <Accordion.Title active={isOpen} onClick={toggleOpen}>
            <Row>

                <Icon name='dropdown' />
                <Title>{title}</Title>
            </Row>
            </Accordion.Title>
            <Accordion.Content active={isOpen}>
                {renderEntries(entries, phenophases)}
            </Accordion.Content>
        </Accordion>
    )
}

export default EntryList
