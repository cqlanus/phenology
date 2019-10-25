import React, { useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { Card, Input, Form } from 'semantic-ui-react'

import { StationArgs } from '../types/climate'
import { County } from '../types/location'
import { Garden } from '../types/user'

const Container = styled.div`
    /* padding: 0.5em; */
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
            <Card link onClick={handleClick(station)} fluid key={station.id}>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>{station.id}</Card.Meta>
                </Card.Content>
            </Card>
        )
    }

    return (
        <Container>
            <Form  >
                <Input fluid onChange={(e, { value }) => setZip(value)} label={"Zip Code"} icon={{ name: 'search', circular: true, link: true, onClick: () => getStationsFromZip(zip) }} />
            </Form>
            {county && <h2>{`${county.name} County Stations`}</h2>}
            {stations.map(renderCard)}
        </Container>
    )
}

export default StationsList
