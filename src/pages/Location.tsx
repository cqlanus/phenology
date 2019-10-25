import React from 'react'

import StationsList from '../containers/StationsList'
// import DataDisplay from '../containers/DataDisplay'
import { withNavBar } from '../containers/NavBar'
import CenterWrapper from '../components/CenterWrapper'

const LocationPage = () => {
    return (
        <CenterWrapper>
            <StationsList shouldNavigate />
        </CenterWrapper>
    )
}

export default withNavBar(LocationPage)
