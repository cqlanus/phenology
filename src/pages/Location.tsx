import React from 'react'
import styled from 'styled-components'

import StationsList from '../containers/StationsList'
import DataDisplay from '../containers/DataDisplay'
import { PopLink } from '../components/Link'

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1em;
`

const LocationPage = () => {
    return (
        <Container>
            <PopLink/>
            <StationsList />
            <DataDisplay />
        </Container>
    )
}

export default LocationPage