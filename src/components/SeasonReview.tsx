import React from 'react'
import styled from 'styled-components'
import { Header } from 'semantic-ui-react'

import { Planting } from '../types/user'
import HistoricalWeather from '../containers/HistoricalWeather'

const Container = styled.div`
    height: calc(100vh - 50px - 1rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1em;
`

interface Props {
    plantings: Planting[]
}
const SeasonReview = ({ plantings }: Props) => {
    return (
        <Container>
            <Header>Season Review</Header>
            <HistoricalWeather plantings={plantings} />
        </Container>
    )
}

export default SeasonReview
