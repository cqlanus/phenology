import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Garden as GardenType } from '../types/user'
import CenterWrapper from './CenterWrapper'
import StationModal from './StationModal'
import AddPlantForm from '../containers/AddPlantForm'
import { withNavBar } from '../containers/NavBar'
import {
    Icon,
    Button,
    Modal,
    Input,
    Responsive,
} from 'semantic-ui-react'
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
    padding-bottom: 0.5em;
`

interface RowProps {
    center?: boolean
}
const Row = styled.div`
    display: flex;
    justify-content: ${(p: RowProps) => p.center ? 'center' : 'space-between'};
    align-items: center;
`

const AddPlantModal = ({ disabled }: any) => {
    const { isOpen, closeModal, openModal } = useModal()
    const style = { flexShrink: 1 }
    const renderTrigger = () => {
        return (
            <Button
                style={style}
                disabled={disabled}
                onClick={openModal}
                primary>
                <Row center>
                    <Icon name="leaf" />
                    <Responsive minWidth={BREAKPOINTS.TABLET}>Add Plant</Responsive>
                </Row>
            </Button>
        )
    }

    return (
        <Modal onClose={closeModal} open={isOpen} trigger={renderTrigger()}>
            <Modal.Content scrolling>
                <AddPlantForm closeModal={closeModal} />
            </Modal.Content>
        </Modal>
    )
}

const GardenSettingsModal = withRouter(
    ({ handleRemove, setEditing, history, garden, openModal: open }: any & RouteComponentProps) => {
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
                trigger={<Icon link onClick={openModal} name="setting" />}>
                <Modal.Header>
                    Settings
                </Modal.Header>
                <Modal.Content>
                    <Container>
                        <Button fluid onClick={handleEdit}>
                            Edit Garden
                        </Button>
                    </Container>
                    <Container>
                        <Button fluid secondary onClick={open}>
                            Update Station
                        </Button>
                    </Container>
                    <Container>
                        <Button fluid negative onClick={remove}>
                            Delete Garden
                        </Button>
                    </Container>
                </Modal.Content>
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

    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1em;

    @media (min-width: ${BREAKPOINTS.TABLET}px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: ${BREAKPOINTS.DESKTOP}px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`

const PlantingCardContainer = styled.div``

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
    history,
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
                console.log('no station', { garden })
            }
        }
    }, [garden, getHistoricalWeather, openModal])

    if (!garden) {
        return <div />
    }

    const handleRemove = () => removeGarden(garden.gardenId)

    const renderPlantings = () => {
        return (
            <PlantingsContainer>
                {garden.plantings.map(p => (
                    <PlantingCardContainer key={p.plantingId}>
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

    const renderButtons = () => {
        return (
            <Button.Group fluid compact>
                <AddPlantModal disabled={isEditing} />
                <Button
                    onClick={handleClick(
                        `/garden/${garden.gardenId}/bulkadd`,
                    )}
                    primary
                    icon="th list"
                >
                    <Row center>
                        <Icon name="th list" />
                        <Responsive minWidth={BREAKPOINTS.TABLET}>
                            Bulk Add Entry
                                </Responsive>
                    </Row>
                </Button>
                <Button
                    onClick={handleClick(
                        `/garden/${garden.gardenId}/season`,
                    )}
                    icon="calendar alternate"
                    primary
                >
                    <Row center>
                        <Icon name="calendar alternate" />
                        <Responsive minWidth={BREAKPOINTS.TABLET}>
                            Review Season
                                </Responsive>
                    </Row>
                </Button>
            </Button.Group>
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
                        openModal={openModal}
                        garden={garden}
                        setEditing={setEditing}
                        handleRemove={handleRemove}
                    />
                )}
            </Row>
            <Container>{renderButtons()}</Container>
            {renderPlantings()}
            <StationModal
                isOpen={isOpen}
                openModal={openModal}
                closeModal={closeModal}
            />
        </CenterWrapper>
    )
}

export default withNavBar(Garden)
