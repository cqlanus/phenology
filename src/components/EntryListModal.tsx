import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Modal, Button, Table, Icon } from 'semantic-ui-react'
import { useModal } from '../hooks/mdoal'
import { Entry, Planting } from '../types/user'
import { PhenophaseEntity } from '../redux/entities'
import EditEntryForm from '../containers/EditEntryForm'
import HistoricalWeather from '../containers/HistoricalWeather'

const StyledIcon = styled(Icon)`
    cursor: pointer;
`

const Container = styled.div`
    height: 500px;
`

const StyledButton = styled(Button)`
    width: 100%;
`

interface Props {
    entries: Entry[]
    phenophases: PhenophaseEntity
    setEntry: (entryId?: string) => void
    setPlanting: (plantingId?: string) => void
    planting: Planting
}

const EntryListModal = ({ entries, phenophases, setEntry, planting, setPlanting }: Props) => {
    const { isOpen, closeModal, openModal } = useModal()

    const [isFormOpen, setFormOpen] = useState(false)

    const [ column, setColumn ] = useState()
    const [ isAscending, setDirection ] = useState(true)

    const closeForm = () => {
        setEntry(undefined)
        setFormOpen(false)
    }
    const handleOpen = (entryId: string) => () => {
        planting && setPlanting(planting.plantingId)
        setEntry(entryId)
        setFormOpen(true)
    }

    const handleSort = (clicked: string) => () => {
        if (column === clicked) {
            setColumn(clicked)
            setDirection(true)
        } else {
            setDirection(!isAscending)
        }
    }
    
    const renderEditEntry = (entryId: string) => (
        <Modal open={isFormOpen} onClose={closeForm} closeIcon trigger={
                <StyledIcon name="edit" onClick={handleOpen(entryId)} />
            }>
            <Modal.Content>
                <EditEntryForm closeModal={closeForm} />
            </Modal.Content>
        </Modal>
    )
    

    const renderTrigger = () => {
        return (
            <Button fluid onClick={openModal} basic primary>
                Show Entries
            </Button>
        )
    }

    // const getDirection = (colName: string) => colName === column ? isAscending

    const renderTable = () => {
        return (
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Phenophase</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                        <Table.HeaderCell>GDD</Table.HeaderCell>
                        <Table.HeaderCell>YTD GDD</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    {
                        entries.map(entry => (
                            <Table.Row key={entry.entryId}>
                                <Table.Cell>{entry.phenophase}</Table.Cell>
                                <Table.Cell>{entry.category}</Table.Cell>
                                <Table.Cell>{moment(entry.created).format('MM/DD')}</Table.Cell>
                                <Table.Cell>{entry.gdd}</Table.Cell>
                                <Table.Cell>{entry.ytdGdd}</Table.Cell>
                                <Table.Cell>{entry.note}</Table.Cell>
                                <Table.Cell>{renderEditEntry(entry.entryId)}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                    
                </Table.Body>
            </Table>
        )
    }

    return (
        <Modal open={isOpen} onClose={closeModal} trigger={renderTrigger()}>
            <Modal.Header>{`Entries: ${planting.plant.commonName}`}</Modal.Header>
            <Modal.Content scrolling >
                {renderTable()}
                <Container>
                    <HistoricalWeather plantings={[planting]} />
                </Container>
            </Modal.Content>
        </Modal>
    )
}

export default EntryListModal
