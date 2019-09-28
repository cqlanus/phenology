import React, { useState } from 'react'
import styled from 'styled-components'
import { Garden as GardenType } from '../types/user'
import CenterWrapper from './CenterWrapper'
import AddEntryForm from './AddEntryForm'
import EntryList from './EntryList'
import { Card, Image, Icon, Button, Modal } from 'semantic-ui-react'

interface Props {
    garden?: GardenType,
}

const ListContainer = styled.div`
    padding-left: 1rem;
`

const Garden = ({ garden }: Props) => {
    
    const [ isOpen, setModal ] = useState(false)

    if (!garden) {
        return <div />
    }

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    const renderAddEntry = () => (
        <Modal open={isOpen} onClose={closeModal} trigger={<Button onClick={openModal} floated="right" icon="plus" primary size="tiny" circular />} >
            <Modal.Content>
                <AddEntryForm closeModal={closeModal} />
            </Modal.Content>
        </Modal>
    )

    const renderPlantings = () => {
        return (
            <div>
                {garden.plantings.map(p => (
                    <Card key={p.plantingId} fluid>
                        <Card.Content>
                            <Image
                                floated="left"
                                size="tiny"
                                src="http://lorempixel.com/200/200/food/"
                            />
                            {renderAddEntry()}
                            <Card.Header>{p.plant.commonName}</Card.Header>
                            <Card.Meta>{p.plant.latinName}</Card.Meta>
                            {p.plant.isNative && (
                                <Icon
                                    name={'check'}
                                    color={'green'}
                                    size={'large'}
                                />
                            )}
                        </Card.Content>
                        <ListContainer>
                            <EntryList entries={p.entries}/>
                        </ListContainer>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <CenterWrapper>
            <h2>{garden.name}</h2>
            {renderPlantings()}
        </CenterWrapper>
    )
}

export default Garden
