import React, { useState } from 'react'
import DataDisplay from '../containers/DataDisplay'
import { withNavBar } from '../containers/NavBar'
import styled from 'styled-components'
import { Menu, Button, Modal, Card, Checkbox } from 'semantic-ui-react'
import { useModal } from '../hooks/mdoal'
import { Garden } from '../types/user'

const Container = styled.div`
    height: calc(100vh - 50px - 1rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1em;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

interface Props {
    handleNorms: () => void
    handleYtdWeather: () => void
    handleApply: (garden: Garden[]) => void,
    selectedStation: string | undefined
    stationName: string | undefined
    isClimateActive: boolean
    isHistoricalWeatherActive: boolean
    gardens?: Garden[]
}

const FavoriteStationModal = ({ gardens, handleApply }: { gardens?: Garden[], handleApply: (garden: Garden[]) => void }) => {
    const initialChecked: { [key: string]: Garden } = {}
    const [checkedGardens, setChecked] = useState(initialChecked)
    const { isOpen, closeModal, openModal } = useModal()
    const handleClick = () => {
        openModal()
    }

    const handleCheck = (garden: Garden) => () => {
        let updatedChecked = {}

        if (checkedGardens[garden.gardenId]) {
            const { [garden.gardenId]: value, ...newChecked } = checkedGardens
            updatedChecked = newChecked
        } else {
            const newChecked = { ...checkedGardens, [garden.gardenId]: garden }
            updatedChecked = newChecked
        }

        setChecked(updatedChecked)
    }

    const applyStation = () => {
        const selectedGardens = Object.values(checkedGardens)
        handleApply(selectedGardens)
        closeModal()
    }

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            trigger={
                <Button onClick={handleClick} fluid color="teal">
                    Mark as Favorite
                </Button>
            }>
            <Modal.Header>Apply to which gardens?</Modal.Header>
            <Modal.Content>
                {gardens &&
                    gardens.map(g => (
                        <Card fluid key={g.gardenId}>
                            <Card.Content>
                                <Card.Header>
                                    <Row>
                                        {g.name}
                                        <Checkbox
                                            checked={
                                                !!checkedGardens[g.gardenId]
                                            }
                                            onChange={handleCheck(g)}
                                        />
                                    </Row>
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    ))}
            </Modal.Content>
            <Modal.Content>
                <Button onClick={applyStation} fluid primary>
                    Apply
                </Button>
            </Modal.Content>
        </Modal>
    )
}

const StationData = ({
    isClimateActive,
    handleNorms,
    isHistoricalWeatherActive,
    handleYtdWeather,
    stationName,
    gardens,
    handleApply,
}: Props) => {
    const renderButtons = () => (
        <Menu tabular>
            <Menu.Item active={isClimateActive} onClick={handleNorms}>
                Climate Normals
            </Menu.Item>
            <Menu.Item
                active={isHistoricalWeatherActive}
                onClick={handleYtdWeather}>
                YTD Weather
            </Menu.Item>
        </Menu>
    )
    return (
        <Container>
            {stationName && <h4>{stationName}</h4>}
            <FavoriteStationModal gardens={gardens} handleApply={handleApply} />
            {renderButtons()}
            <DataDisplay />
        </Container>
    )
}

export default withNavBar(StationData)
