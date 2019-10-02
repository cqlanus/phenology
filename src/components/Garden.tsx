import React, { useState } from 'react'
import styled from 'styled-components'
import { Garden as GardenType } from '../types/user'
import CenterWrapper from './CenterWrapper'
import {withNavBar} from './NavBar'
import AddEntryForm from '../containers/AddEntryForm'
import EntryList from '../containers/EntryList'
import { Card, Image, Icon, Button, Modal, Segment } from 'semantic-ui-react'

interface Props {
    garden?: GardenType,
    setPlanting: (plantingId: string) => void,
    removeGarden: (gardenId: string) => void
}

const ListContainer = styled.div`
    padding-left: 1rem;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Garden = ({ garden, setPlanting, removeGarden }: Props) => {
    
    const [ isOpen, setModal ] = useState(false)

    if (!garden) {
        return <div />
    }

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    const handleOpen = (plantingId: string) => () => {
        setPlanting(plantingId)
        openModal()
    }

    const handleRemove = () => removeGarden(garden.gardenId)

    const renderGardenSettings = () => {
        return (
            <Modal trigger={<Icon name="setting" />} >
                <Segment>
                    <Button fluid negative onClick={handleRemove} >Delete Garden</Button>
                </Segment>
            </Modal>
        )
    }
    
    const renderAddEntry = (plantingId: string) => (
        <Modal open={isOpen} onClose={closeModal} trigger={<Button onClick={handleOpen(plantingId)} floated="right" icon="plus" primary size="tiny" circular />} >
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
                            {renderAddEntry(p.plantingId)}
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
                            <EntryList entries={p.entries} plantingId={p.plantingId} />
                        </ListContainer>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <CenterWrapper>
            <Row>
                <h2>{garden.name}</h2>
                {renderGardenSettings()}
            </Row>
            {renderPlantings()}
            <Button primary fluid>Add New Plant</Button>
        </CenterWrapper>
    )
}

export default withNavBar(Garden)
