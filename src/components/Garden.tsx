import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { Garden as GardenType } from '../types/user'
import CenterWrapper from './CenterWrapper'
import AddPlantForm from '../containers/AddPlantForm'
import { withNavBar } from '../containers/NavBar'
import { Icon, Button, Modal, Segment, Input } from 'semantic-ui-react'
import { useModal } from '../hooks/mdoal'
import PlantingCard from './PlantingCard'

interface Props {
    garden?: GardenType
    setPlanting: (plantingId: string) => void
    removeGarden: (gardenId: string) => void
    removePlanting: (plantingId: string) => void
    getHistoricalWeather: (stationId: string) => void
}

const Container = styled.div`
    padding-bottom: 1em;
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

const GardenSettingsModal = withRouter(
    ({ handleRemove, setEditing, history }: any & RouteComponentProps) => {
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
    },
)

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
    getHistoricalWeather
}: Props) => {
    const [isEditing, setEditing] = useState(false)

    useEffect(() => {
        if (garden && garden.station) {
            getHistoricalWeather(garden.station.stationId)    
        }
    })

    if (!garden) {
        return <div />
    }

    const handleRemove = () => removeGarden(garden.gardenId)

    const renderPlantings = () => {
        return (
            <div>
                {garden.plantings.map(p => (
                    <PlantingCard
                        key={p.plantingId}
                        planting={p}
                        isEditing={isEditing}
                        setPlanting={setPlanting}
                        removePlanting={removePlanting}
                    />
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
            <Link to={`/garden/${garden.gardenId}/entries`}>
                <Button primary fluid >Review Entries</Button>
            </Link>
        </CenterWrapper>
    )
}

export default withNavBar(Garden)
