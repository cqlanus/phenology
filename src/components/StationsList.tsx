import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { Card } from 'semantic-ui-react'

import { StationArgs } from '../types/climate'
import { County } from '../types/location'

const Container = styled.div`
    /* padding: 0.5em; */
`

interface Props {
    stations: StationArgs[]
    selectStation: (stationId: string) => void
    selectedStation: string | undefined
    county?: County | undefined
}

const StationsList = ({
    stations,
    selectStation,
    county,
    history
}: Props & RouteComponentProps) => {

    const handleClick = (id: string) => () => {
        selectStation(id)
        history.push(`/station/${id}`)
    }

    const renderCard = (station: StationArgs) => {
        const name = station.name.split(',')[0]
        return (
            <Card link onClick={handleClick(station.id)} fluid key={station.id}>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>{station.id}</Card.Meta>
                </Card.Content>
            </Card>
        )
    }

    return (
        <Container>
            {county && <h2>{`${county.name} County Stations`}</h2>}
            {stations.map(renderCard)}
        </Container>
    )
}

export default StationsList
