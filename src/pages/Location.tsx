import React from 'react'

import StationsList from '../containers/StationsList'
import CenterWrapper from '../components/CenterWrapper'

const LocationPage = () => {
    return (
        <CenterWrapper>
            <StationsList shouldNavigate />
        </CenterWrapper>
    )
}

export default LocationPage
