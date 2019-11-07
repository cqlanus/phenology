import React, { useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { Card, Input, Form, Image } from 'semantic-ui-react'

import { StationArgs } from '../types/climate'
import { County } from '../types/location'
import { Garden } from '../types/user'
import { BREAKPOINTS } from '../data/breakpoints'
import stationImg from '../assets/images/wind-power.svg'

const Container = styled.div`
    /* padding: 0.5em; */
`
const StationContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1em;

    @media (min-width: ${BREAKPOINTS.TABLET}px) {
        grid-template-columns: 1fr 1fr;
    }
    
`

const ImageContainer = styled.div`
    height: 3.2em;
    width: 3.2em;
    margin-right: 1em;
    float: left;
`

interface Props {
    stations: StationArgs[]
    selectStation: (stationId: string) => void
    selectedStation: string | undefined
    county?: County | undefined
    shouldNavigate?: boolean
    garden?: Garden
    markStationAsFavorite: (station: StationArgs, gardens: Garden[]) => void
    closeModal?: () => void
    getStationsFromZip: (zip: string) => void
}

const StationsList = ({
    stations,
    selectStation,
    county,
    history,
    shouldNavigate,
    garden,
    markStationAsFavorite,
    closeModal,
    getStationsFromZip
}: Props & RouteComponentProps) => {

    const [zip, setZip] = useState('')

    const handleClick = (station: StationArgs) => () => {
        const { id } = station
        selectStation(id)
        if (shouldNavigate) {
            history.push(`/station/${id}`)
        } else {
            garden && markStationAsFavorite(station, [garden])
            closeModal && closeModal()
        }
    }

    const renderCard = (station: StationArgs) => {
        const name = station.name.split(',')[0]
        return (
            <div key={station.id}>
                <Card link onClick={handleClick(station)} fluid >
                    <Card.Content>
                        <ImageContainer>
                            <Image src={stationImg} size="tiny" />
                        </ImageContainer>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{station.id}</Card.Meta>
                    </Card.Content>
                </Card>
            </div>
        )
    }

    return (
        <Container>
            <Form  >
                <Input fluid onChange={(e, { value }) => setZip(value)} label={"Zip Code"} icon={{ name: 'search', circular: true, link: true, onClick: () => getStationsFromZip(zip) }} />
            </Form>
            {county && <h2>{`${county.name} County Stations`}</h2>}
            <StationContainer>
                {stations.map(renderCard)}
            </StationContainer>
        </Container>
    )
}

export default StationsList
