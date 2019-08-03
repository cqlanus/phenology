import React from 'react'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'

import ClimateNorms from '../containers/ClimateNorms'
import HistoricalWeather from '../containers/HistoricalWeather'

import { DataDisplayType, CLIMATE_NORMS } from '../redux/ui'

const Container = styled.div`
    flex: 1;
`

interface Props {
    dataDisplay: keyof DataDisplayType | undefined
    loading: boolean
}

const DataDisplay = ({ dataDisplay, loading }: Props) => {

    const renderData = () => {
        return (
            dataDisplay === CLIMATE_NORMS
                ? <ClimateNorms/>
                : <HistoricalWeather/>
        )
    }
    
    return (
        <Container>
            { renderData() }
            <Loader active={loading} />
        </Container>
    )
}

export default DataDisplay