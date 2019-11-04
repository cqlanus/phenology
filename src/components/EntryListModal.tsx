import React from 'react'
import moment from 'moment'
import { Modal, Button, Table } from 'semantic-ui-react'
import { useModal } from '../hooks/mdoal'
import { Entry } from '../types/user'
import { PhenophaseEntity } from '../redux/entities'

interface Props {
    entries: Entry[]
    phenophases: PhenophaseEntity
}

const EntryListModal = ({ entries, phenophases }: Props) => {
    const { isOpen, closeModal, openModal } = useModal()

    const renderTrigger = () => {
        return (
            <Button onClick={openModal} basic primary>
                Show Entries
            </Button>
        )
    }

    const renderTable = () => {
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Phenophase</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                        <Table.HeaderCell>GDD</Table.HeaderCell>
                        <Table.HeaderCell>YTD GDD</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
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
                            </Table.Row>
                        ))
                    }
                    
                </Table.Body>
            </Table>
        )
    }

    return (
        <Modal open={isOpen} onClose={closeModal} trigger={renderTrigger()}>
            <Modal.Header>Entries</Modal.Header>
            <Modal.Content>
                {renderTable()}
            </Modal.Content>
        </Modal>
    )
}

export default EntryListModal
