import React from 'react'
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
    selectedStation: string | undefined
    stationName: string | undefined
    isClimateActive: boolean
    isHistoricalWeatherActive: boolean
    gardens?: Garden[]
}

const FavoriteStationModal = ({ gardens }: { gardens?: Garden[] }) => {
    const { isOpen, closeModal, openModal } = useModal()
    const handleClick = () => {
        openModal()
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
                                        <Checkbox />
                                    </Row>
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    ))}
            </Modal.Content>
            <Modal.Content>
                <Button fluid primary>Apply</Button>
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
            <FavoriteStationModal gardens={gardens} />
            {renderButtons()}
            <DataDisplay />
        </Container>
    )
}

export default withNavBar(StationData)
