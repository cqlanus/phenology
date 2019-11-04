import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { Garden as GardenType } from '../types/user'
import CenterWrapper from './CenterWrapper'
import StationModal from './StationModal'
import AddPlantForm from '../containers/AddPlantForm'
import { withNavBar } from '../containers/NavBar'
import { Icon, Button, Modal, Segment, Input } from 'semantic-ui-react'
import { useModal } from '../hooks/mdoal'
import PlantingCard from './PlantingCard'
import { BREAKPOINTS } from '../data/breakpoints'

interface Props {
    garden?: GardenType
    setPlanting: (plantingId: string) => void
    removeGarden: (gardenId: string) => void
    removePlanting: (plantingId: string) => void
    getHistoricalWeather: (stationId: string) => void
}

const Container = styled.div`
    padding-bottom: .5em;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const AddPlantModal = ({ disabled }: any) => {
    const { isOpen, closeModal, openModal } = useModal()
    const style = { flexShrink: 1 }
    return (
        <Modal
            onClose={closeModal}
            open={isOpen}
            trigger={
                <Button style={style} icon="leaf" disabled={disabled} onClick={openModal} primary />
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

const PlantingsContainer = styled.div`
    /* display: flex;
    flex-wrap: wrap; */

    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1em;

    @media (min-width: ${BREAKPOINTS.TABLET}px) {
        grid-template-columns: 1fr 1fr;
    }
    
`

const PlantingCardContainer = styled.div`
    /* flex-basis: 100%;
    margin-bottom: 1em;
    margin-right: 1em;

    @media (min-width: ${BREAKPOINTS.TABLET}px) {
        flex-basis: calc(50% - 1em);
    } */
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
    getHistoricalWeather,
    history
}: Props & RouteComponentProps) => {
    const [isEditing, setEditing] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()

    const handleClick = (path: string) => () => history.push(path)

    useEffect(() => {
        if (garden) {
            if (garden.station) {
                getHistoricalWeather(garden.station.stationId)
            } else {
                openModal()
                console.log("no station", { garden })
            }
        }
    }, [])

    if (!garden) {
        return <div />
    }

    const handleRemove = () => removeGarden(garden.gardenId)

    const renderPlantings = () => {
        return (
            <PlantingsContainer>
                {garden.plantings.map(p => (
                    <PlantingCardContainer key={p.plantingId} >

                        <PlantingCard
                            
                            planting={p}
                            isEditing={isEditing}
                            setPlanting={setPlanting}
                            removePlanting={removePlanting}
                        />
                    </PlantingCardContainer>
                ))}
            </PlantingsContainer>
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
                <Button.Group fluid compact>
                    <AddPlantModal disabled={isEditing} />
                    <Button onClick={handleClick(`/garden/${garden.gardenId}/bulkadd`)} primary icon="th list" />
                    <Button onClick={handleClick(`/garden/${garden.gardenId}/season`)} icon="calendar alternate" primary />
                </Button.Group>
            </Container>
            {renderPlantings()}
            <StationModal isOpen={isOpen} openModal={openModal} closeModal={closeModal} />

        </CenterWrapper>
    )
}

export default withNavBar(Garden)
