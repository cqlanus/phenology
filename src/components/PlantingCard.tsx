import React from 'react'
import { useModal } from "../hooks/mdoal"
import { Planting } from "../types/user"
import { Card, Label, Button, Confirm, Image, Modal } from "semantic-ui-react"
import AddEntryForm from "../containers/AddEntryForm"
import EntryList from "../containers/EntryList"
import styled from "styled-components"

const LabelContainer = styled.div`
    padding-top: 1em;
`

const ListContainer = styled.div`
    padding-left: 1rem;
`

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

interface PlantingProps {
    planting: Planting
    isEditing: boolean
    setPlanting: (id: string) => void
    removePlanting: (id: string) => void
}
const PlantingCard = ({ planting, isEditing, setPlanting, removePlanting }: PlantingProps) => {
    const { isOpen, openModal, closeModal } = useModal()

    const handleRemovePlanting = (planting: Planting) => () => {
        console.log({ planting })
        removePlanting(planting.plantingId)
        closeModal()
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="left"
                    size="tiny"
                    src="http://lorempixel.com/200/200/food/"
                />
                <AddEntryModal
                    plantingId={planting.plantingId}
                    setPlanting={setPlanting}
                />
                <Card.Header>{planting.plant.commonName}</Card.Header>
                <Card.Meta>{planting.plant.latinName}</Card.Meta>
                <Card.Meta>{planting.plantingId}</Card.Meta>
                <LabelContainer>
                    <Label>
                        Qty
                        <Label.Detail>{planting.qty}</Label.Detail>
                    </Label>
                    {planting.plant.isNative && (
                        <Label color={'green'}>Native</Label>
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
                        onConfirm={handleRemovePlanting(planting)}
                    />
                </Card.Content>
            )}
            <Card.Content>
                <ListContainer>
                    <EntryList
                        entries={planting.entries}
                        plantingId={planting.plantingId}
                    />
                </ListContainer>
            </Card.Content>
        </Card>
    )
}

export default PlantingCard