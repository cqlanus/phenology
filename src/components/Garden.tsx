import React, { useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Garden as GardenType } from '../types/user'
import CenterWrapper from './CenterWrapper'
import AddPlantForm from '../containers/AddPlantForm'
import { withNavBar } from '../containers/NavBar'
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
    Confirm,
    Label
} from 'semantic-ui-react'
import { useModal } from '../hooks/mdoal'

interface Props {
    garden?: GardenType
    setPlanting: (plantingId: string) => void
    removeGarden: (gardenId: string) => void
    removePlanting: (plantingId: string) => void
}

const Container = styled.div`
    padding-bottom: 1em;
`

const LabelContainer = styled.div`
    padding-top: 1em;
`

const ListContainer = styled.div`
    padding-left: 1rem;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const AddPlantModal = ({ disabled }: any) => {
    const { isOpen, closeModal, openModal } = useModal()
    return (
        <Modal
            onClose={closeModal}
            open={isOpen}
            trigger={
                <Button disabled={disabled} onClick={openModal} primary fluid>
                    Add New Plant
                </Button>
            }>
            <Modal.Content scrolling>
                <AddPlantForm closeModal={closeModal} />
            </Modal.Content>
        </Modal>
    )
}

const GardenSettingsModal = withRouter(({ handleRemove, setEditing, history }: any & RouteComponentProps) => {
    const { isOpen, closeModal, openModal } = useModal()

    const handleEdit = () => {
        setEditing(true)
        closeModal()
    }

    const remove = () => {
        handleRemove()
        closeModal()
        history.goBack()
    }

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            trigger={<Icon onClick={openModal} name="setting" />}>
            <Segment>
                <Container>
                    <Button fluid onClick={handleEdit}>
                        Edit Garden
                    </Button>
                </Container>
                <Container>
                    <Button fluid negative onClick={remove}>
                        Delete Garden
                    </Button>
                </Container>
            </Segment>
        </Modal>
    )
})

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
    padding-bottom: 1em;
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

const Garden = ({
    garden,
    setPlanting,
    removeGarden,
    removePlanting,
}: Props) => {
    const [isEditing, setEditing] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()

    if (!garden) {
        return <div />
    }

    const handleRemove = () => removeGarden(garden.gardenId)
    const handleRemovePlanting = (plantingId: string) => () => {
        removePlanting(plantingId)
        closeModal()
    }

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
                            <LabelContainer>
                                <Label>
                                    Qty
                                    <Label.Detail>{p.qty}</Label.Detail>
                                </Label>
                                {p.plant.isNative && (
                                    <Label color={"green"}>Native</Label>
                                )}
                            </LabelContainer>
                        </Card.Content>
                        {isEditing && (
                            <Card.Content>
                                <Button
                                    onClick={openModal}
                                    fluid
                                    size="tiny"
                                    basic
                                    negative>
                                    Remove Plant
                                </Button>
                                <Confirm
                                    open={isOpen}
                                    onCancel={closeModal}
                                    onConfirm={handleRemovePlanting(
                                        p.plantingId,
                                    )}
                                />
                            </Card.Content>
                        )}
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
            <Container>
                <AddPlantModal disabled={isEditing} />
            </Container>
            {renderPlantings()}
        </CenterWrapper>
    )
}

export default withNavBar(Garden)
