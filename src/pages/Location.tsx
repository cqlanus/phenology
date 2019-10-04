import React from 'react'
import styled from 'styled-components'

import StationsList from '../containers/StationsList'
import DataDisplay from '../containers/DataDisplay'
import NavBar from '../containers/NavBar'
import CenterWrapper from '../components/CenterWrapper'

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1em;
`

const LocationPage = () => {
    return (
        <div>
            <NavBar />
            <CenterWrapper>
                <StationsList />
                {/* <DataDisplay /> */}
            </CenterWrapper>
        </div>
    )
}

export default LocationPage
