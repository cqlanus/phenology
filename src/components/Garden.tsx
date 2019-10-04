import React, { useState } from 'react'
import styled from 'styled-components'
import { Garden as GardenType } from '../types/user'
import CenterWrapper from './CenterWrapper'
import AddPlantForm from '../containers/AddPlantForm'
import { withNavBar } from './NavBar'
import AddEntryForm from '../containers/AddEntryForm'
import EntryList from '../containers/EntryList'
import {
    Card,
    Image,
    Icon,
    Button,
    Modal,
    Segment,
    Input,
} from 'semantic-ui-react'
import { useModal } from '../hooks/mdoal'

interface Props {
    garden?: GardenType
    setPlanting: (plantingId: string) => void
    removeGarden: (gardenId: string) => void
    removePlanting: (plantingId: string) => void
}

const ListContainer = styled.div`
    padding-left: 1rem;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const AddPlantModal = () => {
    const { isOpen, closeModal, openModal } = useModal()
    return (
        <Modal
            onClose={closeModal}
            open={isOpen}
            trigger={
                <Button onClick={openModal} primary fluid>
                    Add New Plant
                </Button>
            }>
            <Modal.Content scrolling>
                <AddPlantForm closeModal={closeModal} />
            </Modal.Content>
        </Modal>
    )
}

const GardenSettingsModal = ({ handleRemove, setEditing }: any) => {
    const { isOpen, closeModal, openModal } = useModal()

    const handleEdit = () => {
        setEditing(true)
        closeModal()
    }

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            trigger={<Icon onClick={openModal} name="setting" />}>
            <Segment>
                <Button fluid onClick={handleEdit}>
                    Edit Garden
                </Button>
                <Button fluid negative onClick={handleRemove}>
                    Delete Garden
                </Button>
            </Segment>
        </Modal>
    )
}

const AddEntryModal = ({ setPlanting, plantingId }: any) => {
    const { isOpen, closeModal, openModal } = useModal()

    const handleOpen = (plantingId: string) => () => {
        setPlanting(plantingId)
        openModal()
    }

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            trigger={
                <Button
                    onClick={handleOpen(plantingId)}
                    floated="right"
                    icon="plus"
                    primary
                    size="tiny"
                    circular
                />
            }>
            <Modal.Content>
                <AddEntryForm closeModal={closeModal} />
            </Modal.Content>
        </Modal>
    )
}

const InputContainer = styled.div`
    flex: 1;
`

const StyledInput = styled(Input)`
    &&& {
        display: flex;
    }
`

const EditGardenNameInput = ({ garden, setEditing }: any) => {
    const [name, setName] = useState(garden.name)

    const handleChange = (e: any, { value }: any) => setName(value)

    return (
        <InputContainer>
            <StyledInput
                type="text"
                action={{ content: 'Save', onClick: () => setEditing(false) }}
                label="Name"
                onChange={handleChange}
                value={name}
            />
        </InputContainer>
    )
}

const Garden = ({ garden, setPlanting, removeGarden, removePlanting }: Props) => {
    const [isEditing, setEditing] = useState(false)

    if (!garden) {
        return <div />
    }

    const handleRemove = () => removeGarden(garden.gardenId)
    const handleRemovePlanting = (plantingId: string) => () => removePlanting(plantingId)

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
                            <AddEntryModal
                                plantingId={p.plantingId}
                                setPlanting={setPlanting}
                            />
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
                        {isEditing && <Card.Content>
                            <Button onClick={handleRemovePlanting(p.plantingId)} fluid size="tiny" basic negative >Remove Plant</Button>
                        </Card.Content>}
                        <Card.Content>
                            <ListContainer>
                                <EntryList
                                    entries={p.entries}
                                    plantingId={p.plantingId}
                                />
                            </ListContainer>
                        </Card.Content>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <CenterWrapper>
            <Row>
                {isEditing ? (
                    <EditGardenNameInput
                        garden={garden}
                        setEditing={setEditing}
                    />
                ) : (
                    <h2>{garden.name}</h2>
                )}
                {!isEditing && (
                    <GardenSettingsModal
                        setEditing={setEditing}
                        handleRemove={handleRemove}
                    />
                )}
            </Row>
            <AddPlantModal />
            {renderPlantings()}
        </CenterWrapper>
    )
}

export default withNavBar(Garden)
