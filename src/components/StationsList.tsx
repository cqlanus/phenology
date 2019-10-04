import React from 'react'
import styled from 'styled-components'
import { Button, ButtonGroup, Card, Modal, Segment } from 'semantic-ui-react'

import { Station } from '../types/climate'
import { County } from '../types/location'
import { useModal } from '../hooks/mdoal'

const Container = styled.div`
    /* padding: 0.5em; */
`

const ButtonCoontainer = styled.div`
    padding-bottom: 0.5em;
`

interface Props {
    stations: Station[]
    handleNorms: () => void
    handleYtdWeather: () => void
    selectStation: (stationId: string) => void
    selectedStation: string | undefined
    county?: County | undefined
    isClimateActive: boolean
    isHistoricalWeatherActive: boolean
}

const StationsList = ({
    stations,
    selectStation,
    selectedStation,
    handleNorms,
    handleYtdWeather,
    isClimateActive,
    isHistoricalWeatherActive,
    county,
}: Props) => {
    const { isOpen, closeModal, openModal } = useModal()

    const handleClick = (id: string) => () => {
        openModal()
        selectStation(id)
    }

    const renderButtons = () => (
        <div>
            <ButtonCoontainer>
                <Button fluid active={isClimateActive} onClick={handleNorms}>
                    Get Climate Normals
                </Button>
            </ButtonCoontainer>
            <ButtonCoontainer>
                <Button
                    fluid
                    active={isHistoricalWeatherActive}
                    onClick={handleYtdWeather}>
                    Get YTD Weather
                </Button>
            </ButtonCoontainer>
        </div>
    )

    const renderCard = (station: Station) => {
        return (
            <Card onClick={handleClick(station.id)} fluid key={station.id}>
                <Card.Content>
                    <Card.Header>{station.name}</Card.Header>
                    <Card.Meta>{station.id}</Card.Meta>
                </Card.Content>
            </Card>
        )
    }

    const renderCardModal = (station: Station) => {
        const open = isOpen && station.id === selectedStation
        return (
            <Modal
                open={open}
                onClose={closeModal}
                trigger={renderCard(station)}
                key={station.id}>
                <Modal.Content>{renderButtons()}</Modal.Content>
            </Modal>
        )
    }

    return (
        <Container>
            {county && <h2>{`${county.name} County Stations`}</h2>}
            {stations.map(renderCardModal)}
        </Container>
    )
}

export default StationsList
