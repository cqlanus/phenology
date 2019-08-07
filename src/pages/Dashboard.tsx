import React, { useCallback } from 'react'
import styled from 'styled-components'

import CreateGarden from '../containers/CreateGarden'
import { PopLink } from '../components/Link'

import { getPlants } from '../redux/plants'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormContainer = styled.div`
    flex-basis: 55%;

    @media (max-width: 700px) {
        flex-basis: 90%;
    }
`

const DashboardPage = () => {

    const memoGetPlants = useCallback(getPlants, [])
    return (
        <Container>
            <FormContainer>
                <PopLink />
                <CreateGarden getPlants={memoGetPlants} />
            </FormContainer>
        </Container>
    )
}

export default DashboardPage